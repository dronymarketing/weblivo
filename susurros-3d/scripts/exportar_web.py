"""Exporta la flor v13 para la web en tiempo real:
 - flor.glb: 15 pétalos (cada uno su objeto, origen en la base) con 61 morph targets (1 de cada 4 cuadros)
   + colores por vértice (degradé base/medio/punta) + roca facetada + cáliz
 - escena.json: cámara por cuadro (240), pivote/eje de cada pétalo por muestra, luces en espacio cámara
 - estudio.hdr: HDRI del estudio achicado
"""
import bpy, struct, json, math, os
import numpy as np
from mathutils import Matrix, Quaternion, Vector
OUT = bpy.path.abspath("//../web3d/assets/")
D, S = bpy.data, bpy.context.scene
F0, F1, STEP = 1, 240, 4
SAMPLES = list(range(F0, F1 + 1, STEP)) + ([F1] if (F1 - F0) % STEP else [])
b = open(bpy.path.abspath("//cache/v13_suave.pc2"), "rb").read()
_, _, nv, s_, r_, nf = struct.unpack("<12siiffi", b[:32]); G = np.frombuffer(b[32:], "<f4").reshape(nf, nv, 3)
tela = D.objects["Petalos_Tela"]; me = tela.data
pid = np.zeros(len(me.polygons), int); me.attributes["petalo"].data.foreach_get("value", pid)
uvl = me.uv_layers["PetaloUV"].data
vv = np.zeros(nv)
for p in me.polygons:
    for li in p.loop_indices: vv[me.loops[li].vertex_index] = uvl[li].uv[1]
def lin(c): return np.array(c[:3])
cols = {}
for nm in ("color_base", "color_medio", "color_punta"):
    a = me.attributes[nm]; arr = np.zeros(len(me.polygons) * 4); a.data.foreach_get("color", arr); cols[nm] = arr.reshape(-1, 4)[:, :3]
NAMES = ['Capa_AtrasDer','Capa_AtrasIzq','Capa_FrenteDer','Capa_FrenteIzq','Central','Der_BajoFrente','Der_Caido','Der_Grande','Der_Medio','Der_Sube','Frente_Izq','Izq_Alto','Izq_Bajo','Izq_Grande','Izq_Medio']
col = D.collections.new("Web"); S.collection.children.link(col)
def smooth(x, a, b): t = np.clip((x - a) / (b - a), 0, 1); return t * t * (3 - 2 * t)
petal_info = []
for k in range(15):
    polys = [p for p in me.polygons if pid[p.index] == k]
    vidx = sorted({v for p in polys for v in p.vertices}); remap = {v: i for i, v in enumerate(vidx)}
    vi = np.array(vidx)
    base_m = vv[vi] < 0.04; tip_m = vv[vi] > 0.8
    piv0 = G[0][vi][base_m].mean(0)
    m = D.meshes.new("Petalo_" + NAMES[k])
    m.from_pydata([tuple(c) for c in (G[0][vi] - piv0)], [], [[remap[v] for v in p.vertices] for p in polys])
    uv = m.uv_layers.new(name="UV")
    ca = m.color_attributes.new("Col", "BYTE_COLOR", "CORNER")
    cb, cm, cp = cols["color_base"][polys[0].index], cols["color_medio"][polys[0].index], cols["color_punta"][polys[0].index]
    for np_, p in zip(m.polygons, polys):
        np_.use_smooth = True
        for li_new, li_old in zip(np_.loop_indices, p.loop_indices):
            u = uvl[li_old].uv; uv.data[li_new].uv = (u[0], u[1])
            t = u[1]
            c = cb + (cm - cb) * smooth(t, 0.0, 0.42); c = c + (cp - c) * smooth(t, 0.55, 1.0)
            ca.data[li_new].color = (*c, 1.0)       # BYTE_COLOR: Blender lo guarda en sRGB al exportar
    ob = D.objects.new("Petalo_" + NAMES[k], m); col.objects.link(ob); ob.location = piv0
    ob.shape_key_add(name="Basis")
    piv, tip = [], []
    for f in SAMPLES:
        P = G[f - 1][vi]; sk = ob.shape_key_add(name=f"f{f:03d}"); sk.value = 0.0
        sk.data.foreach_set("co", (P - piv0).astype(np.float32).ravel())
        piv.append(P[base_m].mean(0).tolist()); tip.append(P[tip_m].mean(0).tolist())
    petal_info.append(dict(name=ob.name, origin=piv0.tolist(), pivot=piv, tip=tip))
    print("PETALO", ob.name, len(vidx), "vertices")
# roca (con modificadores aplicados, facetada) y cáliz
dg = bpy.context.evaluated_depsgraph_get()
for src, flat in (("Roca_Cristal", True), ("Caliz", False)):
    o = D.objects[src]; ev = o.evaluated_get(dg)
    m = bpy.data.meshes.new_from_object(ev, depsgraph=dg); m.transform(o.matrix_world)
    for p in m.polygons: p.use_smooth = not flat
    nob = D.objects.new(src, m); col.objects.link(nob)
# selección y exportación
for o in S.objects: o.select_set(False)
for o in col.objects: o.select_set(True)
bpy.context.view_layer.objects.active = col.objects[0]
bpy.ops.export_scene.gltf(filepath=OUT + "flor_raw.glb", use_selection=True, export_format="GLB", export_yup=True,
                          export_morph=True, export_morph_normal=True, export_animations=False, export_materials="NONE",
                          export_vertex_color="ACTIVE", export_apply=False)
print("GLB", os.path.getsize(OUT + "flor_raw.glb") // 1024, "KB")
# cámara y luces: Blender (Z arriba) → three (Y arriba): (x, y, z) → (x, z, -y)
C = Matrix.Rotation(-math.pi / 2, 4, "X")
def v3(v): w = C @ Vector(v); return [round(w.x, 5), round(w.y, 5), round(w.z, 5)]
cam = D.objects["Cam_Hero"]; cd = cam.data
hfov = 2 * math.atan(cd.sensor_width / 2 / cd.lens)
frames = []
for f in range(F0, F1 + 1):
    S.frame_set(f); M = C @ cam.matrix_world
    q = M.to_quaternion(); t = M.translation
    frames.append([round(t.x, 5), round(t.y, 5), round(t.z, 5), round(q.x, 6), round(q.y, 6), round(q.z, 6), round(q.w, 6)])
S.frame_set(1)
cam_inv = cam.matrix_world.inverted()
luces = []
for o in S.objects:
    if o.type == "LIGHT":
        p = cam_inv @ o.matrix_world.translation; L = o.data
        luces.append(dict(name=o.name, type=L.type, energy=L.energy, color=list(L.color), size=getattr(L, "size", 0.1),
                          cam_local=[round(p.x, 4), round(p.y, 4), round(p.z, 4)]))
pinfo = [dict(name=p["name"], origin=v3(p["origin"]), pivot=[v3(x) for x in p["pivot"]], tip=[v3(x) for x in p["tip"]]) for p in petal_info]
json.dump(dict(frames=F1, samples=SAMPLES, hfov=hfov, camera=frames, lights=luces, petals=pinfo), open(OUT + "escena.json", "w"))
print("JSON", os.path.getsize(OUT + "escena.json") // 1024, "KB", "hfov", round(math.degrees(hfov), 1))
# HDRI del estudio, achicado
img = next(i for i in D.images if i.name.endswith(".hdr"))
img.scale(1024, 512); img.filepath_raw = OUT + "estudio.hdr"; img.file_format = "HDR"; img.save()
print("HDR", os.path.getsize(OUT + "estudio.hdr") // 1024, "KB")
