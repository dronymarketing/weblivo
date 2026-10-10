// Calibra luz y color contra los renders de Blender: carga la página una vez, prueba ajustes en vivo y mide
// la diferencia de color (ΔE en Lab) en los 4 cuadros de referencia. Descenso por coordenadas.
import { chromium } from 'playwright';
import { PNG } from 'pngjs';
import fs from 'fs';
const URL = process.argv[2] || 'http://localhost:8765/?encuadre=blender&calidad=alta';
const PROG = [[0, 1], [0.37656, 90], [0.66527, 160], [0.95816, 230]];
const refs = PROG.map(([, f]) => PNG.sync.read(fs.readFileSync(`ref/b_${f}.png`)));
const lab = (r, g, b) => { const L = (c) => { c /= 255; return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; };
  r = L(r); g = L(g); b = L(b);
  let x = (r * 0.4124 + g * 0.3576 + b * 0.1805) / 0.95047, y = r * 0.2126 + g * 0.7152 + b * 0.0722, z = (r * 0.0193 + g * 0.1192 + b * 0.9505) / 1.08883;
  const f = (t) => (t > 0.008856 ? Math.cbrt(t) : 7.787 * t + 16 / 116); x = f(x); y = f(y); z = f(z);
  return [116 * y - 16, 500 * (x - y), 200 * (y - z)]; };
const sat = (d, i) => { const mx = Math.max(d[i], d[i + 1], d[i + 2]), mn = Math.min(d[i], d[i + 1], d[i + 2]); return mx ? (mx - mn) / mx : 0; };
function error(img, ref) {
  let e = 0, w = 0, ef = 0, wf = 0;
  for (let i = 0; i < ref.data.length; i += 8) {
    const a = lab(img.data[i], img.data[i + 1], img.data[i + 2]), b = lab(ref.data[i], ref.data[i + 1], ref.data[i + 2]);
    const d = Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
    const flor = sat(img.data, i) > 0.3 || sat(ref.data, i) > 0.3, p = flor ? 3 : 1;
    e += d * p; w += p; if (flor) { ef += d; wf++; }
  }
  return [e / w, ef / Math.max(wf, 1)];
}
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
const page = await browser.newPage({ viewport: { width: 800, height: 450 } });
await page.goto(URL, { waitUntil: 'load' });
await page.waitForFunction(() => document.documentElement.classList.contains('flor-lista'), null, { timeout: 180000 });
async function medir(aj, guardar) {
  await page.evaluate((aj) => window.__flor.ajustar(aj), aj);
  let tot = 0, totf = 0;
  for (let k = 0; k < PROG.length; k++) {
    await page.evaluate((p) => { const h = document.getElementById('hero'); scrollTo(0, (h.offsetHeight - innerHeight) * p); window.__flor.setProgreso(p); }, PROG[k][0]);
    await page.waitForTimeout(1800);
    const buf = await page.screenshot();
    if (guardar) fs.writeFileSync(`${guardar}_${k}.png`, buf);
    const [e, ef] = error(PNG.sync.read(buf), refs[k]); tot += e; totf += ef;
  }
  return [tot / PROG.length, totf / PROG.length];
}
const P = JSON.parse(process.argv[3] || '{}');
const PASOS = JSON.parse(process.argv[4] || '{}');
let actual = { ...(await page.evaluate(() => ({ ...window.__flor.AJUSTES }))), ...P };
delete actual.calidad;
let [mejor, mf] = await medir(actual);
console.log('INICIO', mejor.toFixed(3), 'flor', mf.toFixed(3), JSON.stringify(actual)); 
for (let vuelta = 0; vuelta < +(process.env.VUELTAS || 2); vuelta++) {
  for (const [k, paso] of Object.entries(PASOS)) {
    for (const dir of [1, -1]) {
      let mejoro = true;
      while (mejoro) {
        mejoro = false;
        const prueba = { ...actual, [k]: +(actual[k] + dir * paso / (vuelta + 1)).toFixed(4) };
        const [e, ef] = await medir(prueba);
        if (e < mejor - 0.01) { mejor = e; mf = ef; actual = prueba; mejoro = true; console.log('  ', k, prueba[k], '→', e.toFixed(3), 'flor', ef.toFixed(3)); }
      }
    }
  }
  console.log('VUELTA', vuelta + 1, mejor.toFixed(3), 'flor', mf.toFixed(3), JSON.stringify(actual));
}
await medir(actual, 'capturas/opt');
fs.writeFileSync('capturas/opt_mejor.json', JSON.stringify(actual));
await browser.close();
