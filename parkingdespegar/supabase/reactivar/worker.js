/* ============================================================
   PARKING DESPEGAR — Reactivar la base de datos (Cloudflare Worker)
   El plan gratis de Supabase pausa el proyecto tras una semana sin uso.
   Este servicio guarda la llave de la cuenta de Supabase lejos de la
   página (como secreto cifrado de Cloudflare: SUPABASE_TOKEN) y solo
   sabe hacer dos cosas con UN proyecto:
     GET  /estado     → si la base está activa, en pausa o despertando
     POST /reactivar  → si está en pausa, la despierta
   Nadie puede usarlo para leer datos, borrar ni tocar otra cosa.
   ============================================================ */
const PROYECTO = 'ixryfteknrcghmsxyowp';
const ORIGENES = ['https://livo.com.uy'];
const API = 'https://api.supabase.com/v1/projects/' + PROYECTO;

export default {
  async fetch(pedido, env) {
    const origen = pedido.headers.get('Origin') || '';
    const cabeceras = {
      'Access-Control-Allow-Origin': ORIGENES.includes(origen) ? origen : ORIGENES[0],
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Vary': 'Origin',
      'Cache-Control': 'no-store',
      'Content-Type': 'application/json; charset=utf-8'
    };
    const responder = (cuerpo, status = 200) => new Response(JSON.stringify(cuerpo), { status, headers: cabeceras });
    if (pedido.method === 'OPTIONS') return new Response(null, { status: 204, headers: cabeceras });

    const ruta = new URL(pedido.url).pathname.replace(/\/+$/, '') || '/';
    if (ruta === '/') return responder({ servicio: 'Parking Despegar · reactivar base', ok: !!env.SUPABASE_TOKEN });
    if (!env.SUPABASE_TOKEN) return responder({ estado: 'error', detalle: 'Falta cargar SUPABASE_TOKEN en Cloudflare.' }, 500);

    const supabase = (metodo, extra = '') =>
      fetch(API + extra, { method: metodo, headers: { Authorization: 'Bearer ' + env.SUPABASE_TOKEN } });
    const leerEstado = async () => {
      const r = await supabase('GET');
      if (!r.ok) throw new Error('Supabase respondió ' + r.status);
      return (await r.json()).status;
    };

    try {
      if (ruta === '/estado' && pedido.method === 'GET') return responder(traducir(await leerEstado()));
      if (ruta === '/reactivar' && pedido.method === 'POST') {
        let estado = await leerEstado();
        if (estado === 'INACTIVE') {
          const r = await supabase('POST', '/restore');
          if (!r.ok) throw new Error('Supabase no aceptó reactivar (' + r.status + ')');
          estado = 'RESTORING';
        }
        return responder(traducir(estado));
      }
      return responder({ estado: 'error', detalle: 'No existe' }, 404);
    } catch (e) {
      return responder({ estado: 'error', detalle: String((e && e.message) || e) }, 502);
    }
  }
};

/* Estados de Supabase → los cuatro que entiende el panel */
function traducir(s) {
  const estado = s === 'ACTIVE_HEALTHY' ? 'activa'
    : s === 'INACTIVE' ? 'pausada'
    : s === 'PAUSING' || s === 'GOING_DOWN' ? 'pausando'
    : s === 'RESTORING' || s === 'COMING_UP' || s === 'RESTARTING' || s === 'UNKNOWN' ? 'despertando'
    : 'otro';
  return { estado, detalle: s };
}
