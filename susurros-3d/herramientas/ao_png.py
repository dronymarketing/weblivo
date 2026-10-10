# ao_raw.bin → assets/petalos_ao.png (ancho = vértices, alto = pétalo × muestra; R = lado +normal, G = lado −normal)
import sys
from PIL import Image
NV, S, K = 1305, 31, 15
b = open('assets/ao_raw.bin', 'rb').read()
assert len(b) == K * S * NV * 2
img = Image.new('RGB', (NV, K * S))
px = [(b[i * 2], b[i * 2 + 1], 0) for i in range(K * S * NV)]
img.putdata(px); img.save('assets/petalos_ao.png', optimize=True)
print('png', len(open('assets/petalos_ao.png', 'rb').read()) // 1024, 'KB')
