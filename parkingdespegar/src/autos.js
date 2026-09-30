/* ============================================================
   AUTOS — Kenney Car Kit (CC0, kenney.nl), convertidos a
   src/autos.json por el script de conversión (ver LEEME.md).
   Cada vértice guarda el color original de la paleta de Kenney;
   acá se traduce a colores de maqueta (blanco arcilla) o a la
   pintura que se pida (la camioneta del parking, en naranja).
   ============================================================ */
import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import datos from './autos.json';

function decodificar(b64, Tipo) {
  const bin = atob(b64);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return new Tipo(bytes.buffer);
}

function geometriaDe(parte) {
  const q = decodificar(parte.pos, Int16Array);
  const n = decodificar(parte.nor, Int8Array);
  const rgb = decodificar(parte.col, Uint8Array);
  const idx = decodificar(parte.idx, Uint16Array);
  const pos = new Float32Array(q.length);
  for (let i = 0; i < q.length; i += 3) {
    for (let k = 0; k < 3; k++) {
      pos[i + k] = parte.min[k] + ((q[i + k] + 32767) / 65534) * (parte.max[k] - parte.min[k]);
    }
  }
  const nor = new Float32Array(n.length);
  for (let i = 0; i < n.length; i++) nor[i] = n[i] / 127;
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  g.setAttribute('normal', new THREE.BufferAttribute(nor, 3));
  g.setAttribute('rgb', new THREE.BufferAttribute(rgb, 3));
  g.setIndex(new THREE.BufferAttribute(idx, 1));
  return g;
}

/* Clase de cada vértice según el color original de Kenney */
function clasificar(r, g, b, pintura, esRueda) {
  const luma = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
  if (esRueda) return luma < 0.32 ? 'goma' : 'llanta';
  const dp = Math.hypot(r - pintura[0], g - pintura[1], b - pintura[2]);
  if (dp < 42) return 'pintura';
  if (r > 200 && g > 150 && b < 130) return 'faro';
  if (r > 180 && g < 120 && b < 110) return 'stop';
  if (b >= 250 && b - r >= 4) return 'vidrio';     // celeste claro de Kenney
  if (luma > 0.72) return 'blanco';                 // chapas y detalles
  if (luma < 0.32) return 'oscuro';                 // parrilla, pasaruedas, bajos
  return 'moldura';                                 // paragolpes y zócalos gris azulado
}

/* El color de pintura de cada modelo: el más frecuente entre los saturados */
function pinturaDe(rgb) {
  const cuenta = new Map();
  for (let i = 0; i < rgb.length; i += 3) {
    const r = rgb[i], g = rgb[i + 1], b = rgb[i + 2];
    if (Math.max(r, g, b) - Math.min(r, g, b) < 60) continue;
    if (r > 200 && g > 150 && b < 130 && g > 190) continue; // faros amarillos
    const k = (r >> 3) + ',' + (g >> 3) + ',' + (b >> 3);
    const v = cuenta.get(k) || { n: 0, c: [r, g, b] };
    v.n++; cuenta.set(k, v);
  }
  let mejor = null;
  cuenta.forEach(v => { if (!mejor || v.n > mejor.n) mejor = v; });
  return mejor ? mejor.c : [255, 255, 255];
}

export const PALETA_MAQUETA = {
  pintura: '#f7f8f8',
  vidrio:  '#c6d2d8',
  moldura: '#e3e7e8',
  oscuro:  '#ccd3d6',
  blanco:  '#ffffff',
  faro:    '#fff6e0',
  stop:    '#e9b9ae',
  goma:    '#c9cfd1',
  llanta:  '#eef1f2'
};

function pintar(geo, paleta, pintura, esRueda) {
  const rgb = geo.getAttribute('rgb').array;
  const col = new Float32Array(rgb.length);
  const cache = {};
  const c = new THREE.Color();
  for (let i = 0; i < rgb.length; i += 3) {
    const clase = clasificar(rgb[i], rgb[i + 1], rgb[i + 2], pintura, esRueda);
    const hex = paleta[clase] || paleta.moldura;
    if (!cache[hex]) { c.set(hex); cache[hex] = [c.r, c.g, c.b]; }
    const v = cache[hex];
    col[i] = v[0]; col[i + 1] = v[1]; col[i + 2] = v[2];
  }
  geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
}

const cacheBase = {};
function base(nombre) {
  if (!cacheBase[nombre]) {
    const m = datos.modelos[nombre];
    const cuerpo = geometriaDe(m.cuerpo);
    const rueda = geometriaDe(datos.rueda);
    cacheBase[nombre] = { cuerpo, rueda, ruedas: m.ruedas, pintura: pinturaDe(cuerpo.getAttribute('rgb').array) };
  }
  return cacheBase[nombre];
}

/* Proporciones más estilizadas que las de juguete de Kenney:
   más largo y un poco más bajo. Las ruedas no se deforman. */
const LARGO = 1.22, ALTO = 0.92;

export const MODELOS = Object.keys(datos.modelos);

/**
 * Geometría de un auto completo (carrocería + 4 ruedas), con color por vértice.
 * Mira hacia +z, apoyado en y = 0.
 */
export function geometriaAuto(nombre, paleta) {
  const b = base(nombre);
  const pal = Object.assign({}, PALETA_MAQUETA, paleta || {});
  const cuerpo = b.cuerpo.clone();
  pintar(cuerpo, pal, b.pintura, false);
  cuerpo.scale(1, ALTO, LARGO);
  const partes = [cuerpo];
  b.ruedas.forEach(p => {
    const r = b.rueda.clone();
    pintar(r, pal, b.pintura, true);
    // La rueda guardada es la derecha (x < 0): la izquierda es la misma girada
    if (p[0] > 0) r.rotateY(Math.PI);
    r.scale(0.94, 0.94, 0.94);
    r.translate(p[0], p[1] * 0.94, p[2] * LARGO);
    partes.push(r);
  });
  partes.forEach(g => { g.deleteAttribute('rgb'); });
  const geo = mergeGeometries(partes, false);
  geo.computeBoundingBox();
  const minY = geo.boundingBox.min.y;
  geo.translate(0, -minY, 0);
  geo.computeBoundingSphere();
  return geo;
}
