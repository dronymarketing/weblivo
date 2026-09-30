// Convierte autos de Kenney Car Kit (CC0) a un JSON compacto:
// posiciones Int16 cuantizadas, normales Int8, color original del colormap (RGB8) e índices Uint16.
import { NodeIO } from '@gltf-transform/core';
import { PNG } from 'pngjs'; import fs from 'fs';
const png = PNG.sync.read(fs.readFileSync(process.argv[3] + '/Textures/colormap.png'));
function sample(u,v){ u=((u%1)+1)%1; v=((v%1)+1)%1; const x=Math.min(png.width-1,Math.floor(u*png.width)), y=Math.min(png.height-1,Math.floor(v*png.height)); const i=(y*png.width+x)*4; return [png.data[i],png.data[i+1],png.data[i+2]]; }
const io = new NodeIO();
const b64 = (ta) => Buffer.from(ta.buffer, ta.byteOffset, ta.byteLength).toString('base64');
function pack(prims){ // prims: [{pos:[], nor:[], col:[], idx:[]}]
  const pos=[], nor=[], col=[], idx=[]; let base=0;
  for (const p of prims){ pos.push(...p.pos); nor.push(...p.nor); col.push(...p.col); for (const i of p.idx) idx.push(i+base); base += p.pos.length/3; }
  const min=[Infinity,Infinity,Infinity], max=[-Infinity,-Infinity,-Infinity];
  for (let i=0;i<pos.length;i+=3) for (let k=0;k<3;k++){ min[k]=Math.min(min[k],pos[i+k]); max[k]=Math.max(max[k],pos[i+k]); }
  const q=new Int16Array(pos.length);
  for (let i=0;i<pos.length;i+=3) for (let k=0;k<3;k++){ const r=(max[k]-min[k])||1; q[i+k]=Math.round(((pos[i+k]-min[k])/r)*65534-32767); }
  const n=new Int8Array(nor.map(v=>Math.round(v*127)));
  const c=new Uint8Array(col);
  const ix=new Uint16Array(idx);
  return { min: min.map(v=>+v.toFixed(5)), max: max.map(v=>+v.toFixed(5)), pos:b64(q), nor:b64(n), col:b64(c), idx:b64(ix), verts: pos.length/3, tris: idx.length/3 };
}
function readPrim(p, offset){
  const P=p.getAttribute('POSITION'), N=p.getAttribute('NORMAL'), UV=p.getAttribute('TEXCOORD_0'), I=p.getIndices();
  const pos=[], nor=[], col=[], idx=[]; const t3=[0,0,0], t2=[0,0];
  for (let i=0;i<P.getCount();i++){ P.getElement(i,t3); pos.push(t3[0]+offset[0], t3[1]+offset[1], t3[2]+offset[2]); N.getElement(i,t3); nor.push(t3[0],t3[1],t3[2]); UV.getElement(i,t2); col.push(...sample(t2[0],t2[1])); }
  for (let i=0;i<I.getCount();i++) idx.push(I.getScalar(i));
  return {pos,nor,col,idx};
}
const out = { licencia: 'Kenney Car Kit — CC0 (kenney.nl)', modelos: {} };
let rueda=null;
for (const name of ['sedan','sedan-sports','hatchback-sports','suv','suv-luxury','van']) {
  const doc = await io.read(`${process.argv[3]}/${name}.glb`);
  const body=[], ruedas=[];
  for (const node of doc.getRoot().listNodes()) {
    const m=node.getMesh(); if(!m) continue;
    const nm=node.getName();
    if (nm==='wheel-back') continue; // rueda de auxilio del SUV: va con la carrocería? se descarta
    const t=node.getTranslation();
    if (nm.startsWith('wheel')) {
      ruedas.push(t.map(v=>+v.toFixed(4)));
      if (!rueda) rueda = pack(m.listPrimitives().map(p=>readPrim(p,[0,0,0])));
    } else {
      for (const p of m.listPrimitives()) body.push(readPrim(p, t));
    }
  }
  out.modelos[name] = { cuerpo: pack(body), ruedas };
  console.log(name, out.modelos[name].cuerpo.verts, out.modelos[name].cuerpo.min, out.modelos[name].cuerpo.max, ruedas);
}
out.rueda = rueda;
console.log('rueda', rueda.verts, rueda.min, rueda.max);
fs.writeFileSync(process.argv[2], JSON.stringify(out));
console.log('bytes', fs.statSync(process.argv[2]).size);
