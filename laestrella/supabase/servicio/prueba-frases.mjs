// Prueba de frases del asistente: node supabase/servicio/prueba-frases.mjs (usa un Meta y una base simulados)
import w from './worker.js';
const H=(h,m)=>{const d=new Date();d.setHours(h,m,0,0);return d.getTime();};
const FOTO={quien:'Santiago',periodo:{ventas:1480000,tickets:52,fiado:84000,tickets_fiado:3,anuladas:0,por_medio:{efectivo:645000,debito:610000},cobros_deuda:0,cobros_deuda_n:0,top:[{nombre:'Arroz',cant:12,monto:79200,unidad:'u'}]},caja:{abierta:true,abrio:'Luana',apertura:H(8,5),turno:'mañana',efectivo:645000,ventas:1480000},stock:{sin_stock_n:1,sin_stock:['Yerba 1 kg'],bajo_n:1,bajo:[{nombre:'Arroz',stock:4,minimo:12,unidad:'u'}]},deudores:{n:3,total:1800000,lista:[{nombre:'Ana Pérez',saldo:1000000,limite:1000000},{nombre:'Juan Gómez',saldo:500000,limite:0},{nombre:'María Rodríguez',saldo:300000,limite:900000}]},compras:{sin_recibir:1,sin_pagar:2,sin_pagar_total:500000},trabajando:[{nombre:'Luana',desde:H(8,2)}]};
const calls=[]; globalThis.fetch=async(u,o)=>{const b=o&&o.body?JSON.parse(o.body):null;calls.push([u,b]);
 if(u.includes('asistente_consulta'))return new Response(JSON.stringify(FOTO));
 if(u.includes('asistente_producto'))return new Response(JSON.stringify([{nombre:'Yerba Mate 1 kg',precio:30000,stock:3,minimo:10,unidad:'u'}]));
 return new Response('{}');};
const env={WHATSAPP_TOKEN:'t',WHATSAPP_NUMERO_ID:'123',SERVICIO_CLAVE:'k',WHATSAPP_SECRETO_APP:'s',WHATSAPP_VERIFICACION:'v'};
async function preg(t){calls.length=0;const cuerpo=JSON.stringify({entry:[{changes:[{value:{metadata:{phone_number_id:'123'},messages:[{from:'59893392720',id:'m',type:'text',text:{body:t}}]}}]}]});
 const k=await crypto.subtle.importKey('raw',new TextEncoder().encode('s'),{name:'HMAC',hash:'SHA-256'},false,['sign']);const mac=[...new Uint8Array(await crypto.subtle.sign('HMAC',k,new TextEncoder().encode(cuerpo)))].map(b=>b.toString(16).padStart(2,'0')).join('');
 await w.fetch(new Request('https://x/whatsapp',{method:'POST',body:cuerpo,headers:{'X-Hub-Signature-256':'sha256='+mac}}),env,{waitUntil:p=>p});await new Promise(r=>setTimeout(r,25));
 const e=calls.find(c=>c[1]&&c[1].type==='text'); return e?e[1].text.body:'(sin respuesta)';}
const casos=[
 ['Cuanto deben los deudores?', /Deudores[\s\S]*3 personas|3 personas deben/],
 ['cuanto deben todos los clientes', /3 personas/],
 ['quien me debe plata', /3 personas/],
 ['quienes estan debiendo', /3 personas/],
 ['cuanto debe ana', /Ana Pérez.*debe/],
 ['cuanto debe anaa', /Ana Pérez/],
 ['cuánto me debe Juan?', /Juan Gómez/],
 ['cuanto debe maria rodriguez', /María Rodríguez/],
 ['cuanto debe pedro', /No encontré a nadie llamado «pedro»/],
 ['deudoes', /Deudores/],
 ['cuanto bendi oy', /Hoy se vendió/],
 ['kuanto vendimos ayer', /Ayer|todavía no hay/],
 ['cuanto vendi ahora q cerro', /se vendió|hay ventas/],
 ['q falta reponer', /Para reponer|Sin stock/],
 ['stok bajo?', /Para reponer|Sin stock/],
 ['que se esta acabando', /Para reponer|Sin stock/],
 ['que tengo que comprar', /Para reponer|Sin stock/],
 ['hay que pedir algo?', /Para reponer|Sin stock/],
 ['cuanto hay en la caja', /Caja abierta/],
 ['cómo anda el cajón', /Caja abierta/],
 ['q se vendio mas esta semana', /Lo más vendido/],
 ['como anda el dia', /Resumen/],
 ['como nos fue hoy', /Resumen/],
 ['quien esta laburando', /Trabajando ahora/],
 ['quienes estan trabajando?', /Trabajando ahora/],
 ['hola!!!', /Soy el asistente/],
 ['holaaa', /Soy el asistente/],
 ['buenas', /Soy el asistente/],
 ['gracias!!', /De nada/],
 ['preico de la yerba', /Yerba Mate/],
 ['cuanto stock queda de yerba', /Yerba Mate/],
 ['cuanta guita hay en la caja', /Caja abierta/],
 ['cuanto facturamos hoy', /Hoy se vendió/],
 ['asdfgh', /No te entendí/],
];
let ok=0,mal=0; for(const [q,re] of casos){const r=await preg(q); if(re.test(r)){ok++;console.log('  ✓',q);}else{mal++;console.log('  ✗',q,'→',r.split('\n').slice(0,3).join(' | '));}}
console.log(`\n${ok} bien, ${mal} mal`);
