# Compara el color de los pétalos por tono (Blender vs web) en las 4 capturas de comparar.sh
import sys, colorsys
from PIL import Image
nombre = sys.argv[1]
R = '../susurros/renders/'
pares = [('v13s_hq_1', '000'), ('v13s_hq_90', '038'), ('v13s_hq_160', '067'), ('v13s_hq_230', '096')]
grupos = {'naranja': (0, 45), 'verde': (80, 160), 'celeste': (170, 205), 'azul': (205, 240), 'violeta': (240, 290)}
def medir(path):
    im = Image.open(path).convert('RGB').resize((400, 225))
    acc = {g: [0, 0, 0, 0] for g in grupos}
    for (r, g, b) in im.getdata():
        h, s, v = colorsys.rgb_to_hsv(r / 255, g / 255, b / 255)
        if s < 0.3 or v < 0.15: continue
        hd = h * 360
        for k, (a, c) in grupos.items():
            if a <= hd < c or (k == 'naranja' and hd >= 345):
                x = acc[k]; x[0] += r; x[1] += g; x[2] += b; x[3] += 1
    return {k: (tuple(round(c / x[3]) for c in x[:3]), x[3]) for k, x in acc.items() if x[3] > 30}
tot = {}
for b, w in pares:
    mb, mw = medir(R + b + '.png'), medir('capturas/w_%s_%s.png' % (nombre, w))
    for k in grupos:
        if k in mb and k in mw:
            tot.setdefault(k, []).append((mb[k][0], mw[k][0]))
for k, l in tot.items():
    bb = [round(sum(x[0][i] for x in l) / len(l)) for i in range(3)]; ww = [round(sum(x[1][i] for x in l) / len(l)) for i in range(3)]
    print('%-8s blender %-16s web %-16s dif %s' % (k, bb, ww, [w - b for b, w in zip(bb, ww)]))
