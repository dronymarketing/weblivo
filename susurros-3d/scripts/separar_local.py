"""Corrige solo donde dos pétalos se cortan de verdad (BVHTree.overlap), en las poses que usa la web.
Para cada par que se corta, el lado correcto de cada pétalo se decide por su zona vecina que NO se corta
(mayoría), y se empujan los vértices de los triángulos cortados (y su primer anillo) hasta dejar GAP.
Entrada cache/v13_suave.pc2 → salida cache/v13_web.pc2."""
import bpy, struct, os, time, sys
import numpy as np
from mathutils import Vector
from mathutils.bvhtree import BVHTree
GAP = float(os.environ.get('GAP', 0.003)); NEAR = 0.04; ITER = int(os.environ.get('ITER', 10))
D = bpy.data
src = bpy.path.abspath("//cache/v13_suave.pc2"); dst = bpy.path.abspath("//cache/v13_web.pc2")
b = open(src, "rb").read(); head = b[:32]
_, _, nv, s_, r_, nf = struct.unpack("<12siiffi", head); G = np.frombuffer(b[32:], "<f4").reshape(nf, nv, 3).copy()
me = D.objects["Petalos_Tela"].data
pid = np.zeros(len(me.polygons), int); me.attributes["petalo"].data.foreach_get("value", pid)
uvl = me.uv_layers["PetaloUV"].data; vv = np.zeros(nv)
for p in me.polygons:
    for li in p.loop_indices: vv[me.loops[li].vertex_index] = uvl[li].uv[1]
peso = np.clip((vv - 0.08) / 0.14, 0, 1); peso = peso * peso * (3 - 2 * peso)
pet = []
for k in range(15):
    polys = [p for p in me.polygons if pid[p.index] == k]
    vi = np.array(sorted({v for p in polys for v in p.vertices})); remap = {v: i for i, v in enumerate(vi)}
    pl = [[remap[v] for v in p.vertices] for p in polys]
    tri = np.array([[q[0], q[a], q[a + 1]] for q in pl for a in range(1, len(q) - 1)])
    vec = [set() for _ in vi]
    for q in pl:
        for a in range(len(q)): vec[q[a]].add(q[a - 1]); vec[q[a]].add(q[(a + 1) % len(q)])
    pet.append(dict(vi=vi, tri=tri, vec=[np.array(sorted(x)) for x in vec], vtri=vv[vi][tri].mean(1)))
F0, F1, STEP = 1, 240, 4
SAMPLES = list(range(F0, F1 + 1, STEP)) + ([F1] if (F1 - F0) % STEP else [])
if os.environ.get('SOLO'): SAMPLES = [int(x) for x in os.environ['SOLO'].split(',')]
MINV = 0.2

def lado(PA, idx, tree, minimo=0.95):
    """distancias con signo (respecto de la normal de la cara más cercana del otro pétalo), solo proyecciones interiores"""
    out = {}
    for i in idx:
        r = tree.find_nearest(Vector(PA[i]), NEAR)
        if r[0] is None: continue
        loc, n, fi, dist = r; d = Vector(PA[i]) - loc; s = d.dot(n)
        if dist > 1e-7 and abs(s) < minimo * dist: continue
        out[i] = (s, np.array(n))
    return out

def anillo(k, idx, veces):
    st = set(idx)
    for _ in range(veces):
        st |= {w for i in list(st) for w in pet[k]["vec"][i]}
    return st

memoria = {}
def resolver(P):
    """devuelve (cortes al empezar, cortes al final); P queda en la pose con menos cortes de todas las vueltas"""
    total = 0; mejor = (None, None)
    for it in range(ITER):
        L = [P[q["vi"]] for q in pet]
        trees = [BVHTree.FromPolygons(L[k].tolist(), pet[k]["tri"].tolist()) for k in range(15)]
        E = [np.zeros((len(q["vi"]), 3)) for q in pet]; cortes = 0
        for A in range(15):
            for B in range(A + 1, 15):
                ov = [(fa, fb) for fa, fb in trees[A].overlap(trees[B]) if pet[A]["vtri"][fa] > MINV and pet[B]["vtri"][fb] > MINV]
                if not ov: continue
                cortes += len(ov)
                for X, Y, fx in ((A, B, {fa for fa, _ in ov}), (B, A, {fb for _, fb in ov})):
                    malos = {v for f in fx for v in pet[X]["tri"][f]}
                    zona = anillo(X, malos, 2)
                    vecinos = anillo(X, zona, 4) - zona          # zona sana alrededor del corte
                    ref = lado(L[X], vecinos, trees[Y])
                    votos = sum(np.sign(s) for s, _ in ref.values())
                    key = (X, Y)
                    sg = np.sign(votos) if abs(votos) >= 3 else memoria.get(key, 0)
                    if sg == 0: continue
                    memoria[key] = sg
                    for i, (s, n) in lado(L[X], zona, trees[Y], 0.5).items():
                        if sg * s < GAP:
                            e = (GAP - sg * s) * 0.6 * sg * n * peso[pet[X]["vi"][i]]
                            if e @ e > E[X][i] @ E[X][i]: E[X][i] = e
        if it == 0: total = cortes
        if mejor[0] is None or cortes < mejor[0]: mejor = (cortes, P.copy())
        if cortes == 0: break
        for k in range(15):
            if not np.any(E[k]): continue
            X = E[k]
            for _ in range(2):
                M = np.array([(X[i] + X[pet[k]["vec"][i]].sum(0)) / (1 + len(pet[k]["vec"][i])) for i in range(len(X))])
                X = np.where((np.linalg.norm(M, axis=1) > np.linalg.norm(X, axis=1))[:, None], M, X)
            P[pet[k]["vi"]] += X
    if mejor[0] is not None: P[:] = mejor[1]
    return total, mejor[0] if mejor[0] is not None else 0

t0 = time.time()
# --- 2) roces chicos: empuje local
sum0 = sum1 = 0
for f in SAMPLES:
    P = G[f - 1].copy(); a, c = resolver(P); G[f - 1] = P; sum0 += a; sum1 += c
    print("cuadro", f, "cortes", a, "→", c, "%.0fs" % (time.time() - t0)); sys.stdout.flush()
print("TOTAL cortes", sum0, "→", sum1)
open(dst, "wb").write(head + G.astype("<f4").tobytes())
print("LISTO %.0fs" % (time.time() - t0))
