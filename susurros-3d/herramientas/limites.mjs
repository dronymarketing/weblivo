// Cuánto puede girar cada pétalo (hacia arriba +, hacia abajo −) en cada pose de la apertura antes de chocar
// con otro pétalo, la roca o el cáliz. Misma deformación que flor.js: giro en la bisagra (35 %) + doblez hacia
// la punta (65 % · V^1.6), alrededor del pivote y el eje del pétalo. Salida: assets/limites.json
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js';
import { MeshBVH } from 'three-mesh-bvh';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import fs from 'fs';
const PASO = 0.025, MAX = 0.8, MINV = +(process.env.MINV || 0.3);
const buf = fs.readFileSync('assets/flor.glb');
const loader = new GLTFLoader(); loader.setMeshoptDecoder(MeshoptDecoder);
const gltf = await new Promise((res, rej) => loader.parse(buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength), '', res, rej));
gltf.scene.updateMatrixWorld(true);
const datos = JSON.parse(fs.readFileSync('assets/escena.json'));
const pet = datos.petals.map((info) => { let m = null; gltf.scene.traverse((o) => { if (o.isMesh && (o.parent.name === info.name || o.parent.name === 'Petalo_' + info.name)) m = o; }); return m; });
const fijos = []; gltf.scene.traverse((o) => { if (o.isMesh && !o.parent.name.startsWith('Petalo_')) fijos.push(o); });
const aFloat = (a) => { const r = new Float32Array(a.count * 3); for (let i = 0; i < a.count; i++) { r[i * 3] = a.getX(i); r[i * 3 + 1] = a.getY(i); r[i * 3 + 2] = a.getZ(i); } return r; };
const fijosG = fijos.map((m) => { const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.BufferAttribute(aFloat(m.geometry.attributes.position), 3)); g.setIndex(m.geometry.index ? new THREE.BufferAttribute(new Uint32Array(m.geometry.index.array), 1) : [...Array(m.geometry.attributes.position.count).keys()]); g.applyMatrix4(m.matrixWorld); return g; });
// V por vértice (0 base, 1 punta), igual que flor.js
const aV = pet.map((m) => { const uv = m.geometry.attributes.uv; let mn = Infinity, mx = -Infinity; for (let i = 0; i < uv.count; i++) { mn = Math.min(mn, uv.getY(i)); mx = Math.max(mx, uv.getY(i)); } const r = new Float32Array(uv.count); for (let i = 0; i < uv.count; i++) r[i] = 1 - (uv.getY(i) - mn) / (mx - mn); return r; });
const idx = pet.map((m) => new THREE.BufferAttribute(new Uint32Array(m.geometry.index.array), 1));
const vTri = pet.map((m, k) => { const ix = m.geometry.index.array, r = new Float32Array(ix.length / 3); for (let t = 0; t < r.length; t++) r[t] = (aV[k][ix[t * 3]] + aV[k][ix[t * 3 + 1]] + aV[k][ix[t * 3 + 2]]) / 3; return r; });
const UP = new THREE.Vector3(0, 1, 0), I = new THREE.Matrix4();
function posar(k, s) {
  const m = pet[k], b = m.geometry.attributes.position, mo = m.geometry.morphAttributes.position[s], a = new Float32Array(b.count * 3);
  for (let i = 0; i < b.count; i++) { a[i * 3] = b.getX(i) + mo.getX(i); a[i * 3 + 1] = b.getY(i) + mo.getY(i); a[i * 3 + 2] = b.getZ(i) + mo.getZ(i); }
  const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.BufferAttribute(a, 3)); g.setIndex(idx[k]); g.applyMatrix4(m.matrixWorld); return g;
}
const v = new THREE.Vector3(), q = new THREE.Quaternion();
function girar(g, k, s, th) {
  const info = datos.petals[k], piv = new THREE.Vector3(...info.pivot[s]), tip = new THREE.Vector3(...info.tip[s]);
  const rad = tip.sub(piv); rad.y = 0; rad.normalize(); const eje = new THREE.Vector3().crossVectors(UP, rad).normalize();
  const src = g.attributes.position, a = new Float32Array(src.count * 3);
  for (let i = 0; i < src.count; i++) {
    v.fromBufferAttribute(src, i).sub(piv); q.setFromAxisAngle(eje, th * (0.35 + 0.65 * Math.pow(Math.max(aV[k][i], 0), 1.6)));
    v.applyQuaternion(q).add(piv); a[i * 3] = v.x; a[i * 3 + 1] = v.y; a[i * 3 + 2] = v.z;
  }
  const r = new THREE.BufferGeometry(); r.setAttribute('position', new THREE.BufferAttribute(a, 3)); r.setIndex(idx[k]); return r;
}
function cortes(gk, k, bvhOtros) {
  const bk = new MeshBVH(gk); let n = 0;
  bk.bvhcast(bvhOtros, I, { intersectsTriangles(t1, t2, i1) { if (vTri[k][i1] > MINV && t1.intersectsTriangle(t2)) n++; return false; } });
  return n;
}
const lim = [], t0 = Date.now();
for (let s = 0; s < datos.samples.length; s++) {
  const pos = pet.map((_, k) => posar(k, s)); const fila = [];
  for (let k = 0; k < pet.length; k++) {
    const otros = mergeGeometries([...pos.filter((_, j) => j !== k).map((g) => { const c = new THREE.BufferGeometry(); c.setAttribute('position', g.attributes.position); c.setIndex(g.index); return c; }), ...fijosG.map((g) => { const c = new THREE.BufferGeometry(); c.setAttribute('position', g.attributes.position); c.setIndex(g.index); return c; })]);
    const bo = new MeshBVH(otros); const n0 = cortes(pos[k], k, bo); const r = [];
    for (const sg of [-1, 1]) {
      let th = 0;
      while (th < MAX) { const n = cortes(girar(pos[k], k, s, sg * (th + PASO)), k, bo); if (n > n0 + 3) break; th += PASO; }
      r.push(+(sg * th).toFixed(3));
    }
    fila.push(r);
  }
  lim.push(fila);
  if (s % 10 === 0) console.log('muestra', s, ((Date.now() - t0) / 1000).toFixed(0) + 's', JSON.stringify(fila.slice(0, 4)));
}
// --- Contactos: si k gira más allá de su límite, a quién toca y cuánto (y para qué lado) tiene que girar ese otro
function cortesPar(ga, ka, gb, kb) {
  const ba = new MeshBVH(ga), bb = new MeshBVH(gb); let n = 0;
  ba.bvhcast(bb, I, { intersectsTriangles(t1, t2, i1, i2) { if (vTri[ka][i1] > MINV && vTri[kb][i2] > MINV && t1.intersectsTriangle(t2)) n++; return false; } });
  return n;
}
const EXTRA = 0.1, contactos = [];
for (let s = 0; s < datos.samples.length; s++) {
  const pos = pet.map((_, k) => posar(k, s)); const fila = [];
  for (let k = 0; k < pet.length; k++) {
    const porDir = [];
    for (const [di, sg] of [[0, -1], [1, 1]]) {
      const thk = lim[s][k][di] + sg * EXTRA, gk = girar(pos[k], k, s, thk), lista = [];
      for (let j = 0; j < pet.length; j++) {
        if (j === k) continue;
        const base = cortesPar(pos[k], k, pos[j], j), n = cortesPar(gk, k, pos[j], j);
        if (n <= base + 3) continue;
        let mejor = null;
        for (let th = PASO; th <= 0.4 + 1e-6 && !mejor; th += PASO) for (const sj of [sg, -sg]) {
          if (mejor) break;
          if (cortesPar(gk, k, girar(pos[j], j, s, sj * th), j) <= base + 3) mejor = [j, +(sj * th / EXTRA).toFixed(2)];
        }
        lista.push(mejor || [j, +(sg * 4).toFixed(2)]);
      }
      porDir.push(lista);
    }
    fila.push(porDir);
  }
  contactos.push(fila);
  if (s % 10 === 0) console.log('contactos', s, ((Date.now() - t0) / 1000).toFixed(0) + 's', JSON.stringify(fila.slice(0, 3)));
}
fs.writeFileSync('assets/limites.json', JSON.stringify({ paso: PASO, max: MAX, lim, contactos }));
console.log('LISTO', ((Date.now() - t0) / 1000).toFixed(0) + 's');
