# Ajusta una matriz de color 3x3 (en lineal) que lleva los pétalos de la web a los de Blender, píxel a píxel.
# Solo usa píxeles donde ambos son pétalo (saturados) y del mismo grupo de tono (alineación buena).
import sys, numpy as np
from PIL import Image
nombre = sys.argv[1]
R = '../susurros/renders/'
pares = [('v13s_hq_1', '000'), ('v13s_hq_90', '038'), ('v13s_hq_160', '067'), ('v13s_hq_230', '096')]
lin = lambda c: np.where(c <= 0.04045, c / 12.92, ((c + 0.055) / 1.055) ** 2.4)
def hsv(a):
    mx, mn = a.max(-1), a.min(-1); s = (mx - mn) / np.maximum(mx, 1e-6)
    return s, mx
X, Y = [], []
for b, w in pares:
    B = np.asarray(Image.open(R + b + '.png').convert('RGB').resize((800, 450)), float) / 255
    W = np.asarray(Image.open('capturas/w_%s_%s.png' % (nombre, w)).convert('RGB').resize((800, 450)), float) / 255
    sb, vb = hsv(B); sw, vw = hsv(W)
    ok = (sb > .35) & (sw > .35) & (vb > .2) & (vw > .2)
    # mismo canal dominante (evita bordes desalineados)
    ok &= (B.argmax(-1) == W.argmax(-1)) & (np.abs(B - W).sum(-1) < 0.6)
    X.append(lin(W[ok])); Y.append(lin(B[ok]))
X, Y = np.concatenate(X), np.concatenate(Y)
M, *_ = np.linalg.lstsq(X, Y, rcond=None)
err0 = np.abs(X - Y).mean(); err1 = np.abs(X @ M - Y).mean()
print('pixeles', len(X), 'error medio lineal antes %.4f después %.4f' % (err0, err1))
print('MATRIZ (fila = canal de salida):'); print(np.round(M.T, 3).tolist())
