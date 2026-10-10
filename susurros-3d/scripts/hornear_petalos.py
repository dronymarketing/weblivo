"""Hornea la superficie de los pétalos (color con venas y degradés + relieve) a un atlas 4x4 de 2048 px.
Celda k = (k % 4, k // 4), con margen. En la web el UV del atlas se calcula desde el UV del pétalo."""
import bpy, numpy as np
D, S = bpy.data, bpy.context.scene
S.frame_set(240)
tela = D.objects["Petalos_Tela"]; me = tela.data
for m in tela.modifiers:
    if m.type in ("SUBSURF", "SOLIDIFY"): m.show_render = m.show_viewport = False
pid = np.zeros(len(me.polygons), int); me.attributes["petalo"].data.foreach_get("value", pid)
src = me.uv_layers["PetaloUV"]; at = me.uv_layers.get("Atlas") or me.uv_layers.new(name="Atlas")
M, CEL = 0.03, 0.25
for p in me.polygons:
    k = pid[p.index]; cx, cy = k % 4, k // 4
    for li in p.loop_indices:
        u, v = src.data[li].uv
        at.data[li].uv = ((cx + M + u * (1 - 2 * M)) * CEL, (cy + M + v * (1 - 2 * M)) * CEL)
me.uv_layers.active = at
mat = tela.material_slots[0].material; nt = mat.node_tree
for n in nt.nodes:
    if n.bl_idname == "ShaderNodeUVMap": n.uv_map = "PetaloUV"
out = nt.nodes["Material Output"]; viejo = out.inputs["Surface"].links[0].from_socket
em = nt.nodes.new("ShaderNodeEmission")
S.render.engine = "CYCLES"; S.cycles.device = "CPU"; S.cycles.samples = 4
S.render.bake.margin = 6
def hornear(fuente, nombre, color_space):
    img = D.images.new(nombre, 2048, 2048, alpha=False, float_buffer=False)
    img.colorspace_settings.name = color_space
    tex = nt.nodes.new("ShaderNodeTexImage"); tex.image = img
    for n in nt.nodes: n.select = False
    tex.select = True; nt.nodes.active = tex
    nt.links.new(fuente, em.inputs["Color"]); nt.links.new(em.outputs[0], out.inputs["Surface"])
    with bpy.context.temp_override(object=tela, active_object=tela, selected_objects=[tela]):
        bpy.ops.object.bake(type="EMIT")
    img.filepath_raw = bpy.path.abspath(f"//../web3d/assets/{nombre}.png"); img.file_format = "PNG"; img.save()
    print("HORNEADO", nombre)
for o in S.objects: o.select_set(False)
tela.select_set(True); bpy.context.view_layer.objects.active = tela
hornear(nt.nodes["Mix.001"].outputs[0] if "Result" not in nt.nodes["Mix.001"].outputs else nt.nodes["Mix.001"].outputs["Result"], "petalos_color", "sRGB")
hornear(nt.nodes["Math.005"].outputs[0], "petalos_relieve", "Non-Color")
nt.links.new(viejo, out.inputs["Surface"])
