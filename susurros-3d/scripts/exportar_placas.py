"""Agrega a escena.json las placas de vidrio (Card_1..4) y los paneles negros del estudio (en espacio cámara)."""
import bpy, json, math
from mathutils import Matrix, Vector
OUT = bpy.path.abspath("//../web3d/assets/escena.json")
D, S = bpy.data, bpy.context.scene
C = Matrix.Rotation(-math.pi / 2, 4, "X")
d = json.load(open(OUT))
r = lambda v, n=5: [round(x, n) for x in v]
placas = []
for i in (1, 2, 3, 4):
    o = D.objects["Card_%d" % i]
    bb = [Vector(c) for c in o.bound_box]
    lo = Vector((min(v.x for v in bb), min(v.y for v in bb), min(v.z for v in bb))); hi = Vector((max(v.x for v in bb), max(v.y for v in bb), max(v.z for v in bb)))
    placas.append(dict(name=o.name, size=r(hi - lo), center=r((hi + lo) / 2), frames=[]))
for f in range(1, d["frames"] + 1):
    S.frame_set(f)
    for i, p in enumerate(placas):
        M = C @ D.objects[p["name"]].matrix_world
        t, q, s = M.decompose()
        p["frames"].append(r(t) + r((q.x, q.y, q.z, q.w), 6) + r(s, 4))
S.frame_set(1)
cam = D.objects["Cam_Hero"]; ci = cam.matrix_world.inverted()
paneles = []
for n in ("Panel_Atras", "Panel_Der", "Panel_Izq"):
    o = D.objects[n]; M = ci @ o.matrix_world
    t, q, s = M.decompose()
    bb = [Vector(c) for c in o.bound_box]
    paneles.append(dict(name=n, size=r((max(v.x for v in bb) - min(v.x for v in bb), max(v.y for v in bb) - min(v.y for v in bb))), pos=r(t), quat=r((q.x, q.y, q.z, q.w), 6), scale=r(s, 4), color=r(D.materials["Panel_Negro"].node_tree.nodes["Principled BSDF"].inputs["Base Color"].default_value[:3], 4)))
d["placas"] = placas; d["paneles"] = paneles
json.dump(d, open(OUT, "w"))
print("PLACAS", [p["size"] for p in placas], "PANELES", [(p["name"], p["size"], p["pos"]) for p in paneles])
