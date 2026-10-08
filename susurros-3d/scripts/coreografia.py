"""Corrige la coreografía: cuando un pétalo pasa A TRAVÉS de otro (cambia de lado), en esos cuadros se lo gira
en su bisagra (inclinación hacia afuera/adentro y giro hacia el costado) para que pase por al lado.
El lado correcto de cada par es el que tienen la mayoría de los cuadros. Los ángulos se suavizan en el tiempo.
SRC (v13_suave) → cache/v13_coreo.pc2"""
import bpy, os, sys, math, time
exec(open(bpy.path.abspath("//separar_local.py")).read().split("memoria = {}")[0])
UP = np.array([0., 0., 1.])
S = SAMPLES
def nout(P, k):
    c = P[pet[k]["vi"]]; f = pet[k]["tri"]; n = np.cross(c[f[:, 1]] - c[f[:, 0]], c[f[:, 2]] - c[f[:, 0]]); n /= np.maximum(np.linalg.norm(n, axis=1, keepdims=True), 1e-12)
    cen = c.mean(0); rad = np.array([cen[0], cen[1], 0.]); rad /= max(np.linalg.norm(rad), 1e-6)
    return n if n.mean(0) @ (rad - 0.6 * UP) >= 0 else -n
def votos(P, A, B, tree=None, no=None):
    vb = pet[B]["vi"]; t = tree or BVHTree.FromPolygons(P[pet[A]["vi"]].tolist(), pet[A]["tri"].tolist()); no = nout(P, A) if no is None else no
    pos = neg = 0
    for i in np.nonzero(vv[vb] > 0.25)[0]:
        r = t.find_nearest(Vector(P[vb[i]]), 0.08)
        if r[0] is None: continue
        s = (P[vb[i]] - np.array(r[0])) @ no[r[2]]
        if abs(s) >= 0.9 * r[3]: pos += s > 0; neg += s < 0
    return pos, neg
def girar(Pk, vk, tilt, swing):
    piv = Pk[vv[vk] < 0.04].mean(0); tip = Pk[vv[vk] > 0.8].mean(0)
    rad = tip - piv; rad[2] = 0; rad /= max(np.linalg.norm(rad), 1e-9); ax = np.cross(UP, rad)
    d = Pk - piv
    def rot(d, k, a):
        c, s_ = math.cos(a), math.sin(a); return d * c + np.cross(k, d) * s_ + np.outer(d @ k, k) * (1 - c)
    r = rot(rot(d, ax, tilt), UP, swing)
    w = np.clip((vv[vk] - 0.02) / 0.1, 0, 1)[:, None]
    return Pk + (r - d) * w
def solapes(P, k, trees):
    tk = BVHTree.FromPolygons(P[pet[k]["vi"]].tolist(), pet[k]["tri"].tolist()); n = 0
    for j in range(15):
        if j == k: continue
        n += len([1 for fa, fb in tk.overlap(trees[j]) if pet[k]["vtri"][fa] > MINV and pet[j]["vtri"][fb] > MINV])
    return n
UMBRAL = 8; UMBRAL_EP = int(os.environ.get('UMBRAL_EP', 40))
t0 = time.time()
# 1) cortes reales por par y cuadro (zona visible)
cortes = {}
for si, f in enumerate(S):
    P = G[f - 1]; trees = [BVHTree.FromPolygons(P[q["vi"]].tolist(), q["tri"].tolist()) for q in pet]
    for A in range(15):
        for B in range(A + 1, 15):
            n = len([1 for fa, fb in trees[A].overlap(trees[B]) if pet[A]["vtri"][fa] > MINV and pet[B]["vtri"][fb] > MINV])
            if n >= UMBRAL: cortes.setdefault((A, B), {})[si] = n
print("cortes medidos %.0fs" % (time.time() - t0)); sys.stdout.flush()
# 2) episodios: cuadros seguidos donde un par se corta fuerte (los roces chicos los arregla separar_local.py)
episodios = []
for (A, B), d in cortes.items():
    sis = sorted(d); grupo = [sis[0]]
    for x in sis[1:] + [None]:
        if x is not None and x - grupo[-1] <= 2: grupo.append(x); continue
        if max(d[i] for i in grupo) >= UMBRAL_EP: episodios.append(((A, B), grupo)); print("EPISODIO", A, B, [S[i] for i in grupo], "máx", max(d[i] for i in grupo))
        if x is not None: grupo = [x]
# 3) en cada episodio se elige UN pétalo (el que con menos giro saca los cortes en el cuadro peor) y se busca,
#    cuadro por cuadro, la inclinación/giro más chico que deja ese pétalo sin cortes con nadie
ANG = np.zeros((len(S), 15, 2))
def costo_giro(si, k, ta, wa):
    P = G[S[si] - 1].copy()
    for j in range(15):
        if j != k and np.any(ANG[si, j]): P[pet[j]["vi"]] = girar(P[pet[j]["vi"]], pet[j]["vi"], *ANG[si, j])
    vk = pet[k]["vi"]; P[vk] = girar(P[vk], vk, ta, wa)
    trees = [BVHTree.FromPolygons(P[q["vi"]].tolist(), q["tri"].tolist()) for q in pet]
    return solapes(P, k, trees)
def busca(si, k):
    mejor = None
    for tdeg in range(-24, 25, 2):
        for wdeg in range(-18, 19, 2):
            n = costo_giro(si, k, math.radians(tdeg), math.radians(wdeg))
            c = n * 4 + abs(tdeg) + abs(wdeg)
            if mejor is None or c < mejor[0]: mejor = (c, n, math.radians(tdeg), math.radians(wdeg))
    return mejor
for (A, B), grupo in episodios:
    peor = max(grupo, key=lambda i: cortes[(A, B)][i])
    opciones = [(busca(peor, k), k) for k in (A, B)]
    (c, n, ta, wa), mover = min(opciones, key=lambda o: o[0][0])
    print("par", A, B, "mueve", mover, "en el peor cuadro", S[peor], "cortes→", n, "incl %.0f° giro %.0f°" % (math.degrees(ta), math.degrees(wa))); sys.stdout.flush()
    for si in grupo:
        c, n, ta, wa = busca(si, mover)
        ANG[si, mover] = (ta, wa)
        print("  cuadro", S[si], "cortes", cortes[(A, B)][si], "→", n, "incl %.0f° giro %.0f°" % (math.degrees(ta), math.degrees(wa)), "%.0fs" % (time.time() - t0)); sys.stdout.flush()
# 4) suavizado temporal de los ángulos (gaussiana, sin achicar los picos necesarios más de un 15 %)
k_ = np.exp(-0.5 * (np.arange(-3, 4) / 1.3) ** 2); k_ /= k_.sum()
A2 = ANG.copy()
for k in range(15):
    for c in range(2):
        x = ANG[:, k, c]; pad = np.concatenate([np.zeros(3), x, np.zeros(3)]); sm = np.convolve(pad, k_, "valid")
        A2[:, k, c] = np.where(np.abs(sm) >= 0.85 * np.abs(x), sm, 0.85 * x + 0.15 * sm)
for si, f in enumerate(S):
    for k in range(15):
        if np.any(A2[si, k]): G[f - 1][pet[k]["vi"]] = girar(G[f - 1][pet[k]["vi"]], pet[k]["vi"], *A2[si, k])
open(bpy.path.abspath("//cache/v13_coreo.pc2"), "wb").write(head + G.astype("<f4").tobytes())
print("LISTO coreografía %.0fs" % (time.time() - t0))
