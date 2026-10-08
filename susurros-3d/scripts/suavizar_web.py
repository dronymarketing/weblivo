"""Suaviza en el tiempo y limita el empuje de separar_local.py (v13_web.pc2) → v13_web2.pc2, y cuenta cruces."""
import bpy, os, sys, numpy as np
from mathutils.bvhtree import BVHTree
exec(open(bpy.path.abspath("//separar_local.py")).read().split("t0 = time.time()")[0])
TOPE = float(os.environ.get('TOPE', 0.02)); PASADAS = int(os.environ.get('PASADAS', 3))
W = np.frombuffer(open(bpy.path.abspath("//cache/v13_web.pc2"), "rb").read()[32:], "<f4").reshape(nf, nv, 3)
S = [f - 1 for f in SAMPLES]
Dp = (W[S] - G[S]).astype(np.float64)
n = np.linalg.norm(Dp, axis=2, keepdims=True); Dp *= np.minimum(1, TOPE / np.maximum(n, 1e-12))
for _ in range(PASADAS):
    M = Dp.copy(); M[1:-1] = 0.25 * Dp[:-2] + 0.5 * Dp[1:-1] + 0.25 * Dp[2:]; Dp = M
def cortes(P):
    trees = [BVHTree.FromPolygons(P[q["vi"]].tolist(), q["tri"].tolist()) for q in pet]; t = 0
    for A in range(15):
        for B in range(A + 1, 15):
            t += len([1 for fa, fb in trees[A].overlap(trees[B]) if pet[A]["vtri"][fa] > MINV and pet[B]["vtri"][fb] > MINV])
    return t
c0 = sum(cortes(G[s]) for s in S)
for vuelta in range(int(os.environ.get('VUELTAS', 4))):
    # corregir de nuevo partiendo de la pose suavizada, y volver a limitar y suavizar
    Dn = Dp.copy()
    for j, s in enumerate(S):
        P = G[s] + Dp[j]; resolver(P); Dn[j] = P - G[s]
    n = np.linalg.norm(Dn, axis=2, keepdims=True); Dn *= np.minimum(1, TOPE / np.maximum(n, 1e-12))
    for _ in range(PASADAS):
        M = Dn.copy(); M[1:-1] = 0.25 * Dn[:-2] + 0.5 * Dn[1:-1] + 0.25 * Dn[2:]; Dn = M
    Dp = Dn
    c1 = sum(cortes(G[s] + Dp[j]) for j, s in enumerate(S))
    dd = np.linalg.norm(np.diff(Dp, axis=0), axis=2)
    print("VUELTA", vuelta + 1, "CORTES", c0, "→", c1, "| empuje máx %.1f mm | salto máx %.1f mm" % (np.linalg.norm(Dp, axis=2).max() * 1000, dd.max() * 1000)); sys.stdout.flush()
out = G.copy()
for j, s in enumerate(S): out[s] = G[s] + Dp[j]
open(bpy.path.abspath("//cache/v13_web2.pc2"), "wb").write(head + out.astype("<f4").tobytes())
