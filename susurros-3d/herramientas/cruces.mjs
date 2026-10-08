// Cuenta, para cada pose de la apertura, qué pares de pétalos se atraviesan (triángulos que se cortan)
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js';
import { MeshBVH } from 'three-mesh-bvh';
import fs from 'fs';
const buf = fs.readFileSync(process.argv[2] || 'assets/flor.glb');
const loader = new GLTFLoader(); loader.setMeshoptDecoder(MeshoptDecoder);
const gltf = await new Promise((res, rej) => loader.parse(buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength), '', res, rej));
gltf.scene.updateMatrixWorld(true);
const datos = JSON.parse(fs.readFileSync('assets/escena.json'));
const pet = datos.petals.map((info) => { let m = null; gltf.scene.traverse((o) => { if (o.isMesh && (o.parent.name === info.name || o.parent.name === 'Petalo_' + info.name)) m = o; }); return m; });
const I = new THREE.Matrix4(), cuenta = {}, MINV = +(process.env.MINV || 0.25);
// V (0 base, 1 punta) por triángulo, como en flor.js
const vTri = pet.map((m) => { const uv = m.geometry.attributes.uv; let mn = Infinity, mx = -Infinity; for (let i = 0; i < uv.count; i++) { mn = Math.min(mn, uv.getY(i)); mx = Math.max(mx, uv.getY(i)); }
  const ix = m.geometry.index.array, r = new Float32Array(ix.length / 3); for (let t = 0; t < r.length; t++) { let v = 0; for (let k = 0; k < 3; k++) v += 1 - (uv.getY(ix[t * 3 + k]) - mn) / (mx - mn); r[t] = v / 3; } return r; });
let total = 0;
for (let s = 0; s < datos.samples.length; s++) {
  const geos = pet.map((m) => {
    const b = m.geometry.attributes.position, mo = m.geometry.morphAttributes.position[s], a = new Float32Array(b.count * 3);
    for (let i = 0; i < b.count; i++) { a[i * 3] = b.getX(i) + mo.getX(i); a[i * 3 + 1] = b.getY(i) + mo.getY(i); a[i * 3 + 2] = b.getZ(i) + mo.getZ(i); }
    const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.BufferAttribute(a, 3)); g.setIndex(new THREE.BufferAttribute(new Uint32Array(m.geometry.index.array), 1)); g.applyMatrix4(m.matrixWorld);
    g.boundsTree = new MeshBVH(g); return g;
  });
  const pares = [];
  for (let i = 0; i < 15; i++) for (let j = i + 1; j < 15; j++) {
    // triángulos que se cortan fuera de la base (V > MINV en los dos pétalos): los de la base quedan tapados por el cáliz
    let n = 0;
    geos[i].boundsTree.bvhcast(geos[j].boundsTree, I, { intersectsTriangles(t1, t2, i1, i2) {
      if (vTri[i][i1] > MINV && vTri[j][i2] > MINV && t1.intersectsTriangle(t2)) n++; return false; } });
    if (n) { const k = datos.petals[i].name + '/' + datos.petals[j].name; pares.push(k); (cuenta[k] = cuenta[k] || []).push([datos.samples[s], n]); }
  }
  total += pares.length;
}
console.log('poses con cruce, por par (cuadros):');
for (const [k, v] of Object.entries(cuenta).sort((a, b) => b[1].length - a[1].length)) console.log(' ', k, v.length, 'poses', v[0][0] + '–' + v[v.length - 1][0], 'máx triángulos', Math.max(...v.map((x) => x[1])));
console.log('TOTAL pares cruzados sumando poses:', total);
