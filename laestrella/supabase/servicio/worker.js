/* ============================================================
   LA ESTRELLA — Servicio de WhatsApp (un Worker de Cloudflare, gratis)

   Manda solo, sin que nadie toque nada, los avisos a deudores (al llegar al 80 % de su límite
   y al pasarlo). Es el mismo esquema que Parking Despegar:

     La base (disparador con pg_net) → POST /aviso {aviso: id} → este Worker
       → servicio_aviso()      la base entrega el mensaje y el teléfono (solo si sigue pendiente)
       → API de WhatsApp (Meta) con la plantilla aprobada
       → servicio_resultado()  la base anota «enviado» o «error» (se ve en Deudores → Avisos)

   Si algo falla el aviso queda «Pendiente» o «Error» y se manda a mano desde el panel.

   Secretos (Cloudflare → Worker → Settings → Variables and Secrets), nunca en este archivo:
     WHATSAPP_TOKEN            token permanente del usuario del sistema de Meta
     SERVICIO_CLAVE            la que devuelve select public.crear_clave_servicio();
   Variables de texto:
     WHATSAPP_NUMERO_ID        «Phone number ID» del número de WhatsApp Business
     WHATSAPP_PLANTILLA        nombre de la plantilla aprobada (categoría Utilidad, UNA variable en el cuerpo)
     WHATSAPP_PLANTILLA_IDIOMA opcional, por defecto «es»
   ============================================================ */
const SUPABASE_URL = 'https://gbezzoutnaxvdzfjytlr.supabase.co';
const CLAVE_PUBLICA = 'sb_publishable_0vHo4Yucf_1wRD4N95W-jw__urGt__r'; // pública por diseño (la misma de config.js)
const GRAPH = 'https://graph.facebook.com/v23.0/';

export default {
  async fetch(pedido, env, ctx) {
    const ruta = new URL(pedido.url).pathname.replace(/\/+$/, '') || '/';
    if (ruta === '/aviso') return recibirAviso(pedido, env, ctx);
    return new Response(JSON.stringify({ whatsapp: !!(env.WHATSAPP_TOKEN && env.WHATSAPP_NUMERO_ID && env.WHATSAPP_PLANTILLA && env.SERVICIO_CLAVE) }),
      { headers: { 'Content-Type': 'application/json' } });
  }
};

async function recibirAviso(pedido, env, ctx) {
  if (pedido.method !== 'POST') return new Response('No', { status: 405 });
  let b; try { b = await pedido.json(); } catch (e) { b = null; }
  const id = b && Number(b.aviso);
  if (!Number.isInteger(id) || id <= 0) return new Response('No', { status: 400 });
  const tarea = enviarAviso(env, id).catch((e) => console.error('aviso:', e));
  if (ctx && ctx.waitUntil) ctx.waitUntil(tarea); else await tarea;
  return new Response('ok');
}

// Uruguay: 099 123 456 → 59899123456
function telefono(t) {
  let d = String(t || '').replace(/\D/g, '');
  if (!d) return '';
  if (d.startsWith('598')) return d;
  if (d.startsWith('0')) d = d.slice(1);
  return '598' + d;
}

async function rpc(env, funcion, args) {
  const r = await fetch(SUPABASE_URL + '/rest/v1/rpc/' + funcion, {
    method: 'POST',
    headers: { apikey: CLAVE_PUBLICA, 'Content-Type': 'application/json' },
    body: JSON.stringify(args)
  });
  const j = await r.json().catch(() => null);
  if (!r.ok) throw new Error(funcion + ': ' + r.status + ' ' + ((j && j.message) || ''));
  return j;
}
const resultado = (env, id, estado, detalle) =>
  rpc(env, 'servicio_resultado', { p_clave: env.SERVICIO_CLAVE, p_id: id, p_estado: estado, p_detalle: detalle });

async function enviarAviso(env, id) {
  if (!env.WHATSAPP_TOKEN || !env.WHATSAPP_NUMERO_ID || !env.WHATSAPP_PLANTILLA || !env.SERVICIO_CLAVE) {
    return console.error('aviso: falta configurar WhatsApp en Cloudflare (WHATSAPP_TOKEN, WHATSAPP_NUMERO_ID, WHATSAPP_PLANTILLA, SERVICIO_CLAVE)');
  }
  const a = await rpc(env, 'servicio_aviso', { p_clave: env.SERVICIO_CLAVE, p_id: id });
  if (!a) return; // ya enviado, ya tomado o no existe
  const para = telefono(a.telefono);
  if (!para) return resultado(env, id, 'error', 'El deudor no tiene teléfono cargado');
  try {
    const r = await fetch(GRAPH + env.WHATSAPP_NUMERO_ID + '/messages', {
      method: 'POST',
      headers: { Authorization: 'Bearer ' + env.WHATSAPP_TOKEN, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messaging_product: 'whatsapp', to: para, type: 'template',
        template: { name: env.WHATSAPP_PLANTILLA, language: { code: env.WHATSAPP_PLANTILLA_IDIOMA || 'es' },
          components: [{ type: 'body', parameters: [{ type: 'text', text: String(a.mensaje).replace(/\s+/g, ' ').trim() }] }] }
      })
    });
    const j = await r.json().catch(() => ({}));
    if (r.ok) return resultado(env, id, 'enviado', 'Enviado por WhatsApp');
    return resultado(env, id, 'error', String((j && j.error && j.error.message) || r.status));
  } catch (e) {
    return resultado(env, id, 'error', String(e.message || e));
  }
}
