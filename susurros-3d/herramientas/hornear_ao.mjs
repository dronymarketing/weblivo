// Oclusión ambiental (sombras suaves entre pétalos) horneada por vértice, para cada pose de la apertura.
// Salida: assets/ao_raw.bin  →  [pétalo][muestra][vértice][lado (+normal, -normal)] en bytes 0..255
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js';
import { MeshBVH } from 'three-mesh-bvh';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import fs from 'fs';
const RAYOS = +(process.env.RAYOS || 32), DIST = +(process.env.DIST || 0.3), PASO = 2;
const buf = fs.readFileSync('assets/flor.glb');
const loader = new GLTFLoader(); loader.setMeshoptDecoder(MeshoptDecoder);
const gltf = await new Promise((res, rej) => loader.parse(buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength), '', res, rej));
gltf.scene.updateMatrixWorld(true);
const datos = JSON.parse(fs.readFileSync('assets/escena.json'));
const petalos = datos.petals.map((info) => { let m = null; gltf.scene.traverse((o) => { if (o.isMesh && (o.parent.name === info.name || o.parent.name === 'Petalo_' + info.name)) m = o; }); return m; });
const fijos = []; gltf.scene.traverse((o) => { if (o.isMesh && !o.parent.name.startsWith('Petalo_')) fijos.push(o); });
const aMundo = (m, pos) => { const g = new THREE.BufferGeometry(); g.setAttribute('position', pos); g.setIndex(m.geometry.index); g.applyMatrix4(m.matrixWorld); return g; };
const aFloat = (a) => { const r = new Float32Array(a.count * 3); for (let i = 0; i < a.count; i++) { r[i * 3] = a.getX(i); r[i * 3 + 1] = a.getY(i); r[i * 3 + 2] = a.getZ(i); } return new THREE.BufferAttribute(r, 3); };
const fijosMundo = fijos.map((m) => { const g = new THREE.BufferGeometry(); g.setAttribute('position', aFloat(m.geometry.attributes.position)); if (m.geometry.index) g.setIndex(m.geometry.index.clone()); g.applyMatrix4(m.matrixWorld); return g.index ? g : g; });
// direcciones del hemisferio con peso coseno (espiral de Fibonacci), z = arriba
const dirs = []; for (let i = 0; i < RAYOS; i++) { const u = (i + 0.5) / RAYOS, r = Math.sqrt(u), a = i * 2.39996323; dirs.push(new THREE.Vector3(r * Math.cos(a), r * Math.sin(a), Math.sqrt(1 - u))); }
const NV = petalos[0].geometry.attributes.position.count;
const muestras = []; for (let s = 0; s < datos.samples.length; s += PASO) muestras.push(s);
if (process.env.SOLO) muestras.splice(0, muestras.length, +process.env.SOLO);
const out = new Uint8Array(petalos.length * muestras.length * NV * 2);
const ray = new THREE.Ray(), q = new THREE.Quaternion(), Z = new THREE.Vector3(0, 0, 1), d = new THREE.Vector3(), n = new THREE.Vector3(), p = new THREE.Vector3(), rot = new THREE.Quaternion();
let t0 = Date.now();
muestras.forEach((s, si) => {
  const posados = petalos.map((m) => {
    const base = m.geometry.attributes.position, mor = m.geometry.morphAttributes.position[s];
    const arr = new Float32Array(base.count * 3);
    for (let i = 0; i < base.count; i++) { arr[i * 3] = base.getX(i) + mor.getX(i); arr[i * 3 + 1] = base.getY(i) + mor.getY(i); arr[i * 3 + 2] = base.getZ(i) + mor.getZ(i); }
    const g = aMundo(m, new THREE.BufferAttribute(arr, 3)); g.setIndex(new THREE.BufferAttribute(new Uint32Array(m.geometry.index.array), 1)); g.computeVertexNormals(); return g;
  });
  const todo = mergeGeometries([...posados.map((g) => { const c = new THREE.BufferGeometry(); c.setAttribute('position', g.attributes.position); c.setIndex(g.index); return c; }), ...fijosMundo.map((g) => { const c = new THREE.BufferGeometry(); c.setAttribute('position', g.attributes.position); if (g.index) c.setIndex(new THREE.BufferAttribute(new Uint32Array(g.index.array), 1)); else c.setIndex([...Array(g.attributes.position.count).keys()]); return c; })]);
  const bvh = new MeshBVH(todo);
  const mat = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide });
  posados.forEach((g, k) => {
    const P = g.attributes.position, N = g.attributes.normal;
    for (let v = 0; v < NV; v++) {
      p.fromBufferAttribute(P, v); n.fromBufferAttribute(N, v);
      if (n.lengthSq() < 1e-8) n.set(0, 1, 0);
      rot.setFromAxisAngle(Z, ((v * 0.618034) % 1) * Math.PI * 2);   // giro distinto por vértice: ruido en vez de bandas
      for (let lado = 0; lado < 2; lado++) {
        const nl = lado ? n.clone().negate() : n; q.setFromUnitVectors(Z, nl);
        let occ = 0;
        for (const dir of dirs) {
          d.copy(dir).applyQuaternion(rot).applyQuaternion(q);
          ray.origin.copy(p).addScaledVector(nl, 0.004); ray.direction.copy(d);
          const hit = bvh.raycastFirst(ray, THREE.DoubleSide, +(process.env.CERCA || 0.012), DIST);
          if (hit) { const x = hit.distance / DIST; occ += 1 - x * x; }
        }
        out[((k * muestras.length + si) * NV + v) * 2 + lado] = Math.round(255 * (1 - occ / RAYOS));
      }
    }
  });
  if (si % 5 === 0) console.log('muestra', si + 1, '/', muestras.length, ((Date.now() - t0) / 1000).toFixed(0) + 's');
});
// suavizado: promedio con los vecinos de la malla (saca el ruido de los rayos)
{
  const idx = petalos[0].geometry.index.array, vec = Array.from({ length: NV }, () => new Set());
  for (let i = 0; i < idx.length; i += 3) for (let j = 0; j < 3; j++) { vec[idx[i + j]].add(idx[i + (j + 1) % 3]); vec[idx[i + j]].add(idx[i + (j + 2) % 3]); }
  const vecA = vec.map((st) => [...st]), tmp = new Float32Array(NV);
  for (let fila = 0; fila < petalos.length * muestras.length; fila++) for (let lado = 0; lado < 2; lado++) {
    for (let it = 0; it < +(process.env.SUAVE || 3); it++) {
      for (let v = 0; v < NV; v++) { let a = out[(fila * NV + v) * 2 + lado], c = 1; for (const w of vecA[v]) { a += out[(fila * NV + w) * 2 + lado]; c++; } tmp[v] = a / c; }
      for (let v = 0; v < NV; v++) out[(fila * NV + v) * 2 + lado] = Math.round(tmp[v]);
    }
  }
}
fs.writeFileSync('assets/ao_raw.bin', out);
console.log('LISTO', petalos.length, muestras.length, NV, ((Date.now() - t0) / 1000).toFixed(0) + 's');
