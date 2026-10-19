/* ============================================================
   PARKING DESPEGAR — Servicio en Cloudflare (un solo Worker)

   1) Reactivar la base si el plan gratis de Supabase la pausa
        GET  /estado     → si la base está activa, en pausa o despertando
        POST /reactivar  → si está en pausa, la despierta
   2) «Torre de Parking Despegar»: asistente de WhatsApp para la dueña («Torre»)
        GET  /whatsapp   → Meta comprueba que el servicio es nuestro
        POST /whatsapp   → llega un mensaje (texto o audio) y se responde
        POST /aviso      → la base avisa que entró un auto, una reserva nueva o que alguien
                           del equipo empezó o terminó de trabajar, y Torre se lo cuenta
                           por WhatsApp a los números habilitados
   3) Pago online de la reserva web (dLocal Go)
        POST /pago/crear   → crea el cobro en dLocal y devuelve la página de pago
        POST /pago/estado  → al volver de dLocal: cómo quedó el pago (y lo confirma si ya se pagó)
        POST /pago/aviso   → dLocal avisa (firmado) que cambió un pago; si está pagado, se confirma

   El asistente no usa IA paga: entiende las preguntas comunes por sus
   palabras clave, pasa los audios a texto con Whisper (Workers AI, gratis
   en este uso) y lee la base con asistente_consulta(), que solo responde
   a números habilitados en el panel y no puede cambiar nada.

   Secretos (Settings → Variables and Secrets), nunca en este archivo:
     SUPABASE_TOKEN         llave de la cuenta de Supabase (solo para reactivar)
     ASISTENTE_CLAVE        la que se genera en el panel → Ajustes → Asistente
     WHATSAPP_TOKEN         token de acceso de la app de Meta
     WHATSAPP_SECRETO_APP   «App secret» de la app de Meta (firma de los avisos)
     WHATSAPP_VERIFICACION  una palabra cualquiera, la misma que se pone en Meta
     DLOCAL_API_KEY         «API Key» de dLocal Go (Conexiones → API)
     DLOCAL_SECRET          «Secret key» de dLocal Go
   Variables comunes (no secretas):
     DLOCAL_ENTORNO         'real' para cobrar de verdad; si falta o dice 'prueba', usa el entorno de prueba
     DLOCAL_MONTO_PRUEBA    opcional: cobra este monto (en pesos) en vez del total, para probar con poca plata
     WHATSAPP_NUMERO_ID     «Phone number ID» del número de Torre (para los avisos)
     WHATSAPP_PLANTILLA     opcional: plantilla aprobada por Meta para avisar aunque
                            la dueña no le haya escrito a Torre en las últimas 24 h
   Enlace (Settings → Bindings): Workers AI, con el nombre AI.
   ============================================================ */
const PROYECTO = 'ixryfteknrcghmsxyowp';
const SUPABASE_URL = 'https://' + PROYECTO + '.supabase.co';
const CLAVE_PUBLICA = 'sb_publishable_FCAsYb80d6t-kyvQqIV9bA_p7Wrsm5o'; // pública por diseño (la misma de la web)
const ORIGENES = ['https://livo.com.uy'];
const API_SUPABASE = 'https://api.supabase.com/v1/projects/' + PROYECTO;
const GRAPH = 'https://graph.facebook.com/v23.0/';
const UY = 3 * 3600000; // Uruguay: UTC−3 todo el año

export default {
  async fetch(pedido, env, ctx) {
    const url = new URL(pedido.url);
    const ruta = url.pathname.replace(/\/+$/, '') || '/';
    if (ruta === '/whatsapp') return whatsapp(pedido, url, env, ctx);
    if (ruta === '/aviso') return recibirAviso(pedido, env, ctx);
    if (ruta.startsWith('/pago/')) return pagos(pedido, ruta, env);
    return reactivacion(pedido, ruta, env);
  }
};

/* ============================================================
   1) REACTIVAR LA BASE
   ============================================================ */
async function reactivacion(pedido, ruta, env) {
  const origen = pedido.headers.get('Origin') || '';
  const cabeceras = {
    'Access-Control-Allow-Origin': ORIGENES.concat(env.ORIGEN_EXTRA ? [env.ORIGEN_EXTRA] : []).includes(origen) ? origen : ORIGENES[0],
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Vary': 'Origin',
    'Cache-Control': 'no-store',
    'Content-Type': 'application/json; charset=utf-8'
  };
  const responder = (cuerpo, status = 200) => new Response(JSON.stringify(cuerpo), { status, headers: cabeceras });
  if (pedido.method === 'OPTIONS') return new Response(null, { status: 204, headers: cabeceras });
  if (ruta === '/') return responder({ servicio: 'Parking Despegar', reactivar: !!env.SUPABASE_TOKEN, whatsapp: !!(env.WHATSAPP_TOKEN && env.ASISTENTE_CLAVE), avisos: !!env.WHATSAPP_NUMERO_ID,
    pagos: !!(env.DLOCAL_API_KEY && env.DLOCAL_SECRET && env.ASISTENTE_CLAVE), pagos_entorno: env.DLOCAL_ENTORNO === 'real' ? 'real' : 'prueba' });
  if (!env.SUPABASE_TOKEN) return responder({ estado: 'error', detalle: 'Falta cargar SUPABASE_TOKEN en Cloudflare.' }, 500);
  try {
    if (ruta === '/estado' && pedido.method === 'GET') return responder(traducir(await estadoSupabase(env)));
    if (ruta === '/reactivar' && pedido.method === 'POST') return responder(traducir(await despertar(env)));
    return responder({ estado: 'error', detalle: 'No existe' }, 404);
  } catch (e) {
    return responder({ estado: 'error', detalle: String((e && e.message) || e) }, 502);
  }
}
function supabaseApi(env, metodo, extra = '') {
  return fetch(API_SUPABASE + extra, { method: metodo, headers: { Authorization: 'Bearer ' + env.SUPABASE_TOKEN } });
}
async function estadoSupabase(env) {
  const r = await supabaseApi(env, 'GET');
  if (!r.ok) throw new Error('Supabase respondió ' + r.status);
  return (await r.json()).status;
}
async function despertar(env) {
  let estado = await estadoSupabase(env);
  if (estado === 'INACTIVE') {
    const r = await supabaseApi(env, 'POST', '/restore');
    if (!r.ok) throw new Error('Supabase no aceptó reactivar (' + r.status + ')');
    estado = 'RESTORING';
  }
  return estado;
}
/* Estados de Supabase → los cuatro que entiende el panel */
function traducir(s) {
  const estado = s === 'ACTIVE_HEALTHY' ? 'activa'
    : s === 'INACTIVE' ? 'pausada'
    : s === 'PAUSING' || s === 'GOING_DOWN' ? 'pausando'
    : s === 'RESTORING' || s === 'COMING_UP' || s === 'RESTARTING' || s === 'UNKNOWN' ? 'despertando'
    : 'otro';
  return { estado, detalle: s };
}

/* ============================================================
   2) ASISTENTE DE WHATSAPP
   ============================================================ */
async function whatsapp(pedido, url, env, ctx) {
  // Meta comprueba el servicio una vez, al conectarlo
  if (pedido.method === 'GET') {
    const ok = url.searchParams.get('hub.mode') === 'subscribe' && env.WHATSAPP_VERIFICACION &&
               url.searchParams.get('hub.verify_token') === env.WHATSAPP_VERIFICACION;
    return ok ? new Response(url.searchParams.get('hub.challenge') || '', { status: 200 }) : new Response('No', { status: 403 });
  }
  if (pedido.method !== 'POST') return new Response('No', { status: 405 });

  // Solo se acepta lo que viene firmado por Meta con el secreto de la app
  const cuerpo = await pedido.text();
  if (!(await firmaValida(cuerpo, pedido.headers.get('X-Hub-Signature-256'), env.WHATSAPP_SECRETO_APP))) {
    return new Response('Firma inválida', { status: 401 });
  }
  let aviso;
  try { aviso = JSON.parse(cuerpo); } catch (e) { return new Response('ok', { status: 200 }); }
  for (const entrada of aviso.entry || []) {
    for (const cambio of entrada.changes || []) {
      const v = cambio.value || {};
      for (const msj of v.messages || []) {
        const tarea = atender(msj, (v.metadata || {}).phone_number_id, env).catch((e) => console.error('asistente:', e));
        if (ctx && ctx.waitUntil) ctx.waitUntil(tarea); else await tarea;
      }
    }
  }
  return new Response('ok', { status: 200 }); // Meta necesita el «recibido» enseguida
}

async function firmaValida(cuerpo, firma, secreto) {
  if (!secreto || !firma || !firma.startsWith('sha256=')) return false;
  const clave = await crypto.subtle.importKey('raw', new TextEncoder().encode(secreto), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const mac = new Uint8Array(await crypto.subtle.sign('HMAC', clave, new TextEncoder().encode(cuerpo)));
  const esperado = 'sha256=' + [...mac].map((b) => b.toString(16).padStart(2, '0')).join('');
  if (esperado.length !== firma.length) return false;
  let dif = 0;
  for (let i = 0; i < esperado.length; i++) dif |= esperado.charCodeAt(i) ^ firma.charCodeAt(i);
  return dif === 0;
}

async function atender(msj, numeroId, env) {
  const de = String(msj.from || '').replace(/\D/g, '');
  if (!de || !numeroId) return;

  // 1) ¿Está habilitado? (la misma consulta lo comprueba; a desconocidos no se les contesta)
  let foto;
  try { foto = await consultar(env, de); }
  catch (e) {
    if (e.noHabilitado) return;
    if (e.claveMala) return enviar(env, numeroId, de, 'El asistente no está bien configurado (la clave no coincide). Avisale a Livo.');
    if (e.sinBase) {
      let txt = 'No pude conectarme con la base de datos.';
      if (env.SUPABASE_TOKEN) {
        try { const s = traducir(await despertar(env)).estado; if (s !== 'activa') txt = 'La base de datos estaba en pausa: ya la estoy despertando. Preguntame de nuevo en unos 5 minutos.'; }
        catch (x) { /* queda el mensaje general */ }
      }
      return enviar(env, numeroId, de, txt + (txt.startsWith('No pude') ? ' Probá de nuevo en un rato.' : ''));
    }
    throw e;
  }
  marcarLeido(env, numeroId, msj.id);
  const visto = rpc(env, 'asistente_visto', { p_clave: env.ASISTENTE_CLAVE || '', p_telefono: de }).catch(() => {});

  // 2) El texto de la pregunta (los audios se pasan a texto)
  let texto = '';
  if (msj.type === 'text') texto = (msj.text && msj.text.body) || '';
  else if (msj.type === 'audio') {
    try { texto = await transcribir(env, msj.audio && msj.audio.id); }
    catch (e) { console.error('audio:', e); return enviar(env, numeroId, de, 'No pude escuchar el audio. ¿Me lo escribís?'); }
    if (!texto.trim()) return enviar(env, numeroId, de, 'No se escuchó nada en el audio. ¿Me lo repetís?');
  } else return enviar(env, numeroId, de, 'Por ahora entiendo mensajes escritos y audios.');

  // 3) Qué pregunta y de qué período; si no es «hoy», se pide ese período
  const p = interpretar(texto, Date.now());
  if (p.periodo.clave !== 'hoy' && p.temas.some((t) => ['plata', 'web', 'reservas', 'entradas', 'salidas'].includes(t))) {
    foto = await consultar(env, de, p.periodo.desde, p.periodo.hasta);
  }
  // Autos puntuales: se buscan (y quedan como tema de conversación para el «sí»)
  const args = { p_clave: env.ASISTENTE_CLAVE || '', p_telefono: de, p_texto: p.buscar };
  try {
    if (p.temas.includes('telefono')) p.contacto = await rpc(env, 'asistente_telefono', args);
    else if (p.temas.includes('detalle')) p.busqueda = await rpc(env, 'asistente_buscar', args);
  } catch (e) { console.error('buscar:', e); p.fallo = true; }
  let respuesta = responder(p, foto, Date.now());
  if (msj.type === 'audio') respuesta = '_«' + texto.trim().slice(0, 200) + '»_\n\n' + respuesta;
  await enviar(env, numeroId, de, respuesta);
  await visto;
}

function consultar(env, telefono, desde, hasta) {
  return rpc(env, 'asistente_consulta', { p_clave: env.ASISTENTE_CLAVE || '', p_telefono: telefono, p_desde: desde || null, p_hasta: hasta || null });
}
async function rpc(env, funcion, args) {
  let r;
  try {
    r = await fetch((env.SUPABASE_URL || SUPABASE_URL) + '/rest/v1/rpc/' + funcion, {
      method: 'POST',
      headers: { apikey: env.SUPABASE_CLAVE_PUBLICA || CLAVE_PUBLICA, 'Content-Type': 'application/json' },
      body: JSON.stringify(args)
    });
  } catch (e) { throw Object.assign(new Error('sin base'), { sinBase: true }); }
  if (r.status >= 500 || r.status === 0) throw Object.assign(new Error('sin base ' + r.status), { sinBase: true });
  const j = await r.json().catch(() => null);
  if (!r.ok) {
    const m = (j && j.message) || '';
    if (/no está habilitado/.test(m)) throw Object.assign(new Error(m), { noHabilitado: true });
    if (/Clave del asistente/.test(m)) throw Object.assign(new Error(m), { claveMala: true });
    throw new Error(funcion + ': ' + r.status + ' ' + m);
  }
  return j;
}

async function transcribir(env, mediaId) {
  if (!env.AI) throw new Error('Falta el enlace Workers AI (AI)');
  const h = { Authorization: 'Bearer ' + env.WHATSAPP_TOKEN };
  const info = await (await fetch(GRAPH + mediaId, { headers: h })).json();
  if (!info || !info.url) throw new Error('Meta no dio el audio');
  const bytes = new Uint8Array(await (await fetch(info.url, { headers: h })).arrayBuffer());
  if (bytes.length > 8 * 1024 * 1024) throw new Error('Audio demasiado largo');
  let bin = '';
  for (let i = 0; i < bytes.length; i += 0x8000) bin += String.fromCharCode.apply(null, bytes.subarray(i, i + 0x8000));
  const r = await env.AI.run('@cf/openai/whisper-large-v3-turbo', { audio: btoa(bin), language: 'es' });
  return (r && r.text) || '';
}

function enviar(env, numeroId, a, texto) {
  return mandar(env, numeroId, { to: a, type: 'text', text: { preview_url: false, body: texto.slice(0, 4000) } });
}
async function mandar(env, numeroId, mensaje) {
  const r = await fetch(GRAPH + numeroId + '/messages', {
    method: 'POST',
    headers: { Authorization: 'Bearer ' + env.WHATSAPP_TOKEN, 'Content-Type': 'application/json' },
    body: JSON.stringify(Object.assign({ messaging_product: 'whatsapp' }, mensaje))
  });
  if (!r.ok) console.error('WhatsApp no envió:', r.status, await r.text());
  return r.ok;
}
function marcarLeido(env, numeroId, id) {
  if (!id) return;
  fetch(GRAPH + numeroId + '/messages', {
    method: 'POST',
    headers: { Authorization: 'Bearer ' + env.WHATSAPP_TOKEN, 'Content-Type': 'application/json' },
    body: JSON.stringify({ messaging_product: 'whatsapp', status: 'read', message_id: id })
  }).catch(() => {});
}

/* ---------- Entender la pregunta (palabras clave, sin IA) ---------- */
const TEMAS = [
  ['ayuda', /\b(ayuda|menu|opciones|que (me )?(podes|puedo|sabes)|como (te )?(uso|funciona)s?|comandos)\b/],
  ['resumen', /\b(resumen|como (viene|va|vamos|venimos|estamos|anda|andamos)|novedades|todo el dia|en general)\b/],
  ['caja', /\bcaja\b/],
  ['traslados', /traslad|camioneta|chofer|\bllevar\b|\bbuscar\b|aeropuerto/],
  ['equipo', /emplead|\bequipo\b|\bpersonal\b|trabaj|quien(es)? (esta|estan|vino|vinieron)\b|(entro|entraron|ingreso|ingresaron) al sistema|acceso/],
  ['plata', /factur|\bcobr|recaud|\bplata\b|vend|gananci|\bgane\b|ganamos|\bingresos\b|dinero|\bpesos\b|tarjeta|transferencia|efectivo|cuanto (hice|hicimos|saque|sacamos)/],
  ['web', /\b(web|online|internet|pagina|en linea)\b/],
  ['lugares', /libre|\blugar(es)?\b|espacio|disponib|lleno|capacidad|ocupacion|\bcaben?\b/],
  ['salidas', /\bsal(e|en|ida|idas|ieron|io|iendo|gan)\b|retir|se (van|fue|fueron|llevan)|devolv|entreg/],
  ['entradas', /\bentr(a|an|ada|adas|aron|o|ando)\b|\blleg(a|an|ada|adas|aron|o|ando|uen)\b|vien(e|en)\b/],
  ['autos', /\bautos?\b|vehicul|coches?\b|\bcarros?\b|cuantos hay|ocupad|adentro|en el (parking|predio)/],
  ['reservas', /reserv/],
  ['mapa', /\bmapa\b|\b(que|cuales) (autos|coches|vehiculos|carros) (hay|tengo|tenemos|estan|quedan)\b|\bque hay en el (parking|predio|techado)\b|\bcomo esta (el parking|el predio|el techado)\b|\blista(do)? de (los )?(autos|coches|vehiculos)\b|\bque lugares (estan|hay) ocupados\b|\bdonde esta cada\b/],
  ['detalle', /\b(que|cual) (auto|coche|vehiculo|carro|camioneta|modelo)s? (es|era|fue|tiene|trajo|entro|llego|ingreso)\b|\bde quien (es|era)\b|\bmodelo\b|\bcolor\b|\bultimo (auto |coche |vehiculo )?(que )?(entro|llego|ingreso)\b|\b(acaba de|recien) (entrar|llegar|entro|llego)\b|\b(entro|llego) recien\b|\bmas (info|datos|detalles?)\b|\bdatos del (auto|coche|vehiculo|cliente)\b/],
  ['telefono', /\btelefono|\bcelular|\bcel\b|\bcontacto\b|\bsu numero\b|\bnumero (de|del) (?!reservas?\b|autos?\b|lugar)/]
];
const MESES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
// Respuesta a «¿querés que te pase el teléfono?»
const SI = /^(si+|sip|si dale|dale si|si por favor|si porfa|si gracias|por favor|pasamelo|mandamelo|si pasamelo|si mandamelo|si pasame|dale pasamelo|de una|obvio|claro|claro que si|si claro|si quiero)( torre)?$/;
const GRACIAS = /^(muchas |mil )?(gracias|genial|perfecto|buenisimo|joya|barbaro|excelente|ok|okey|oka|listo|dale|bien|impecable|crack|bueno|ta|vale)( (gracias|torre|crack|joya|genial))*$/;
const SALUDO = /^(hola|holis|buenas|buen dia|buenos dias|buenas tardes|buenas noches|que tal|hey|torre)\b/;

function normalizar(t) {
  return String(t || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/setiembre/g, 'septiembre')
    .replace(/[^a-z0-9ñ ]+/g, ' ').replace(/\s+/g, ' ').trim();
}

/* Lugar (A-05), código (PD-1001), matrícula (SBA 1234) o nombre del cliente que aparezca en la pregunta */
const NO_MATRICULA = new Set(['son', 'las', 'los', 'del', 'con', 'por', 'una', 'que', 'hay', 'mas', 'fue', 'era', 'dia', 'mes', 'ano', 'hoy', 'sus', 'mis', 'tus', 'uno', 'dos', 'mil', 'fin', 'sin', 'tan', 'muy', 'les', 'nos', 'van', 'ver', 'cada']);
const RELLENO = new Set(['el', 'la', 'los', 'las', 'un', 'una', 'cliente', 'senor', 'senora', 'sr', 'sra', 'don', 'dona']);
const NO_NOMBRE = /^(ese|esa|este|esta|eso|esto|ultimo|ultima|recien|hoy|ayer|manana|quien|que|cual|nuevo|nueva|lugar|auto|coche|vehiculo|reserva|todos|todo|cada|mi|su|tu|nadie|alguien|alla|aca|ahi)$/;
const ANTES_DEL_NOMBRE = /\b(?:telefono|celular|cel|numero|contacto|whatsapp|auto|coche|vehiculo|camioneta|carro|reserva|cliente|datos|esta|hay)\s+(?:de|del)\s+/g;

function buscado(texto, t) {
  const s = String(texto || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  let m = s.match(/\b(?:lugar|en el|el|del)\s+([ab])[\s-]?(\d{1,3})\b/) || s.match(/\b([ab])-?(\d{1,3})\b/);
  if (m) return { tipo: 'lugar', texto: m[1].toUpperCase() + '-' + m[2].padStart(2, '0') };
  m = s.match(/\b(?:pd|codigo|reserva)[\s#-]*(\d{4})\b/);
  if (m) return { tipo: 'codigo', texto: 'PD-' + m[1] };
  for (const x of s.matchAll(/\b([a-z]{3})[\s-]?(\d{3,4})\b/g)) {
    if (!NO_MATRICULA.has(x[1])) return { tipo: 'matricula', texto: (x[1] + ' ' + x[2]).toUpperCase() };
  }
  let desde = -1, x;
  ANTES_DEL_NOMBRE.lastIndex = 0;
  while ((x = ANTES_DEL_NOMBRE.exec(t))) desde = ANTES_DEL_NOMBRE.lastIndex;
  if (desde < 0) return null;
  let w = t.slice(desde).split(' ');
  while (w.length && RELLENO.has(w[0])) w.shift();
  const corte = w.findIndex((p) => /^(por|porfa|gracias|que|para|en|hoy|ayer|torre|y|si|dale|ahora)$/.test(p));
  if (corte >= 0) w = w.slice(0, corte);
  w = w.slice(0, 3);
  if (!w.length || NO_NOMBRE.test(w[0]) || w.join(' ').length < 3) return null;
  return { tipo: 'nombre', texto: w.join(' ') };
}

function interpretar(texto, ahora) {
  const t = normalizar(texto);
  const r = (temas, extra) => Object.assign({ texto: t, temas, manana: /\bmanana\b/.test(t), periodo: periodo(t, ahora), buscar: null, buscarTipo: null }, extra);
  if (SI.test(t)) return r(['telefono'], { si: true });
  if (GRACIAS.test(t)) return r(['gracias']);
  // Se responde en el orden en que aparece cada cosa en la pregunta
  let temas = TEMAS.map(([n, re]) => [n, t.search(re)]).filter(([, i]) => i >= 0).sort((a, b) => a[1] - b[1]).map(([n]) => n);
  const manana = /\bmanana\b/.test(t);
  const b = buscado(texto, t);
  // Un auto puntual (por lugar, código, matrícula o nombre): se da su ficha o su teléfono
  if (b || temas.includes('detalle') || temas.includes('telefono')) {
    temas = [temas.includes('telefono') ? 'telefono' : 'detalle'];
  } else {
    // «reservas que entraron por la web» son reservas nuevas, no autos que entraron
    if (temas.includes('web')) temas = temas.filter((x) => x !== 'reservas' && x !== 'entradas');
    if (temas.includes('reservas') && temas.includes('entradas')) {
      temas = temas.filter((x) => x !== (manana || /\blleg/.test(t) ? 'reservas' : 'entradas'));
    }
    if (temas.includes('caja')) temas = temas.filter((x) => x !== 'plata' || /factur|cobr|recaud/.test(t));
    if (temas.includes('mapa')) temas = temas.filter((x) => x !== 'autos' && x !== 'lugares');
    if (temas.includes('ayuda') && temas.length > 1) temas = temas.filter((x) => x !== 'ayuda');
    if (temas.includes('resumen') && temas.length > 1) temas = temas.filter((x) => x !== 'resumen');
    if (temas.includes('entradas') || temas.includes('salidas')) temas = temas.filter((x) => x !== 'autos');
  }
  if (!temas.length && SALUDO.test(t)) temas = ['ayuda'];
  // Una o dos palabras sueltas («Pérez», «Juan Pérez»): se prueba como nombre de cliente
  if (!temas.length && /^[a-zñ]{3,}( [a-zñ]+){0,2}$/.test(t)) return r(['detalle'], { buscar: t, buscarTipo: 'nombre', adivina: true });
  return r(temas, { buscar: b ? b.texto : null, buscarTipo: b ? b.tipo : null });
}

/* «ayer», «esta semana», «el mes pasado», «septiembre»… → desde/hasta (hora de Uruguay) */
function periodo(t, ahora) {
  const loc = new Date(ahora - UY);
  const y = loc.getUTCFullYear(), m = loc.getUTCMonth(), d = loc.getUTCDate();
  const dia = (yy, mm, dd) => new Date(Date.UTC(yy, mm, dd) + UY).toISOString();
  const lunes = d - ((loc.getUTCDay() + 6) % 7);
  const r = (clave, nombre, desde, hasta) => ({ clave, nombre, desde, hasta });
  if (/antes de ayer|anteayer/.test(t)) return r('anteayer', 'Anteayer', dia(y, m, d - 2), dia(y, m, d - 1));
  if (/\bayer\b/.test(t)) return r('ayer', 'Ayer', dia(y, m, d - 1), dia(y, m, d));
  if (/semana pasada/.test(t)) return r('semana-pasada', 'La semana pasada', dia(y, m, lunes - 7), dia(y, m, lunes));
  if (/\bsemana\b/.test(t)) return r('semana', 'Esta semana', dia(y, m, lunes), dia(y, m, d + 1));
  if (/mes pasado/.test(t)) return r('mes-pasado', 'El mes pasado', dia(y, m - 1, 1), dia(y, m, 1));
  const mes = MESES.findIndex((n) => new RegExp('\\b' + n + '\\b').test(t));
  if (mes >= 0) {
    const ano = mes > m ? y - 1 : y;
    return r('mes-' + mes, 'En ' + MESES[mes] + (ano !== y ? ' de ' + ano : ''), dia(ano, mes, 1), dia(ano, mes + 1, 1));
  }
  if (/\bmes\b/.test(t)) return r('mes', 'Este mes', dia(y, m, 1), dia(y, m, d + 1));
  if (/\bano\b|\banual\b/.test(t)) return r('ano', 'Este año', dia(y, 0, 1), dia(y, m, d + 1));
  return r('hoy', 'Hoy', dia(y, m, d), dia(y, m, d + 1));
}

/* ---------- Armar la respuesta ---------- */
const MEDIOS = { efectivo: 'efectivo', tarjeta: 'tarjeta', transferencia: 'transferencia', online: 'online' };
const ORIGEN = { web: 'web', whatsapp: 'WhatsApp', mostrador: 'mostrador', telefono: 'teléfono' };
const POR_ORIGEN = { web: 'por la web, ya pagada online', whatsapp: 'por WhatsApp', mostrador: 'en el mostrador', telefono: 'por teléfono' };
const ROL = { admin: 'administración', personal: 'personal de turno', chofer: 'chofer' };
const TIPO = { techado: 'techado', aire: 'predio al aire libre' };
const DIAS = ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'];
function plata(n) { return '$ ' + String(Math.round(n || 0)).replace(/\B(?=(\d{3})+(?!\d))/g, '.'); }
function hora(iso) { const x = new Date(new Date(iso).getTime() - UY); return String(x.getUTCHours()).padStart(2, '0') + ':' + String(x.getUTCMinutes()).padStart(2, '0'); }
function n(c, uno, varios) { return c + ' ' + (c === 1 ? uno : varios); }
function lista(items, fn, max = 6) {
  const l = items.slice(0, max).map((x) => '• ' + fn(x));
  if (items.length > max) l.push('• y ' + (items.length - max) + ' más');
  return l.join('\n');
}
function primero(nombre) { return String(nombre || '').trim().split(/\s+/)[0] || ''; }
/* «hoy a las 15:40», «mañana a las 08:00», «lun 20/10 a las 18:00» (hora de Uruguay) */
function cuando(iso, ahora = Date.now()) {
  const x = new Date(new Date(iso).getTime() - UY), h = new Date(ahora - UY);
  const dif = Math.round((Date.UTC(x.getUTCFullYear(), x.getUTCMonth(), x.getUTCDate()) - Date.UTC(h.getUTCFullYear(), h.getUTCMonth(), h.getUTCDate())) / 864e5);
  const dia = dif === 0 ? 'hoy' : dif === 1 ? 'mañana' : dif === -1 ? 'ayer' : DIAS[x.getUTCDay()] + ' ' + x.getUTCDate() + '/' + (x.getUTCMonth() + 1);
  return dia + ' a las ' + hora(iso);
}
function saludo(ahora = Date.now()) {
  const h = new Date(ahora - UY).getUTCHours();
  return h < 6 ? 'Buenas noches' : h < 13 ? 'Buen día' : h < 20 ? 'Buenas tardes' : 'Buenas noches';
}
function auto(f) { return [f.modelo, f.color].filter(Boolean).join(' ') || 'Vehículo'; }
function waMe(tel) {
  let d = String(tel || '').replace(/\D/g, '');
  if (/^09\d{7}$/.test(d)) d = '598' + d.slice(1);
  else if (/^9\d{7}$/.test(d)) d = '598' + d;
  return d.length >= 10 ? 'https://wa.me/' + d : '';
}

/* Ficha de un auto: qué es, de quién, dónde está, cuándo sale y cómo viene el pago */
function ficha(f, ahora = Date.now()) {
  const l = ['*' + auto(f) + '* · ' + f.matricula, '👤 ' + f.cliente + ' · reserva ' + f.codigo];
  if (f.estado === 'en_predio') l.push('📍 Lugar *' + (f.lugar || 'sin asignar') + '* (' + TIPO[f.tipo] + ') · entró ' + cuando(f.checkin, ahora));
  else if (f.estado === 'confirmada') l.push('📅 Llega ' + cuando(f.entrada, ahora) + ' · ' + TIPO[f.tipo]);
  else if (f.estado === 'finalizada') l.push('✅ Ya se lo llevó (' + cuando(f.checkout || f.salida, ahora) + ')');
  else l.push('❌ Reserva cancelada');
  if (f.estado === 'en_predio' || f.estado === 'confirmada') {
    const atrasado = f.estado === 'en_predio' && new Date(f.salida).getTime() < ahora;
    l.push((atrasado ? '⚠️ Tenía que salir ' : '🛫 Sale ') + cuando(f.salida, ahora) + (f.vuelo ? ' · vuelo ' + f.vuelo : ''));
  }
  l.push(f.servicio === 'traslado' ? '🚐 Traslado al aeropuerto · ' + n(f.pasajeros, 'pasajero', 'pasajeros') : '🔑 Valet');
  if (f.extras && f.extras.length) l.push('🧽 Pidió ' + f.extras.join(' y '));
  if (f.promo) l.push('🏷️ Promoción ' + f.promo + ' (' + f.descuento_pct + '% de descuento)');
  if (f.comentarios) l.push('💬 «' + f.comentarios + '»');
  const falta = f.total - f.pagado;
  l.push('💵 ' + (falta <= 0 ? 'Pagó todo (' + plata(f.total) + ')' : f.pagado > 0 ? 'Pagó ' + plata(f.pagado) + ', falta ' + plata(falta) : plata(f.total) + ', todavía sin pagar'));
  return l.join('\n');
}
function oferta(f) { return '¿Querés que te pase el teléfono de ' + (primero(f.cliente) || 'el cliente') + '? Respondé *sí*.'; }

/* El parking por zonas, lugar por lugar */
function mapa(f) {
  const out = ['🗺️ *Así está el parking ahora*'];
  for (const [k, nombre] of [['techado', 'Techado'], ['aire', 'Predio al aire libre']]) {
    const autos = (f.en_predio || []).filter((x) => x.tipo === k);
    out.push('*' + nombre + '* · ' + autos.length + ' de ' + f.capacidad[k] + ' ocupados' +
      (autos.length ? '\n' + lista(autos, (x) => (x.lugar || '—') + ' · ' + auto(x) + ' · ' + x.matricula + ' · ' + x.cliente, 15) : '\n• Vacío'));
  }
  out.push('Libres: *' + Math.max(0, f.capacidad.techado - f.autos.techado) + ' en techado* y *' + Math.max(0, f.capacidad.aire - f.autos.aire) + ' en el predio*.\n' +
    'Preguntame por un lugar (ej. *A-05*) o una matrícula y te doy el detalle.');
  return out.join('\n\n');
}

function responder(p, f, ahora = Date.now()) {
  const partes = [];
  const per = p.periodo, hoy = per.clave === 'hoy';
  for (const tema of p.temas) {
    if (tema === 'autos') {
      let s = '🚗 *' + n(f.autos.total, 'auto', 'autos') + '* en el parking ahora: ' + f.autos.techado + ' en techado y ' + f.autos.aire + ' en el predio.';
      if (f.autos.atrasados) s += '\nOjo: ' + n(f.autos.atrasados, 'ya tendría que haber salido', 'ya tendrían que haber salido') + '.';
      if (!p.temas.includes('lugares')) s += '\nLibres: ' + Math.max(0, f.capacidad.techado - f.autos.techado) + ' en techado y ' + Math.max(0, f.capacidad.aire - f.autos.aire) + ' en el predio.';
      partes.push(s);
    } else if (tema === 'lugares') {
      partes.push('Lugares libres: *' + Math.max(0, f.capacidad.techado - f.autos.techado) + ' en techado* (de ' + f.capacidad.techado + ') y *' +
        Math.max(0, f.capacidad.aire - f.autos.aire) + ' en el predio* (de ' + f.capacidad.aire + ').');
    } else if (tema === 'entradas') {
      if (p.manana) partes.push('Mañana llegan *' + n(f.hoy.manana, 'reserva', 'reservas') + '*.');
      else if (!hoy) partes.push(per.nombre + ' entraron *' + n(f.periodo.entradas, 'auto', 'autos') + '*.');
      else {
        const llegaron = (f.en_predio || []).filter((x) => x.checkin && x.checkin >= per.desde).sort((a, b) => (a.checkin < b.checkin ? 1 : -1));
        let s = 'Hoy entraron *' + n(f.hoy.entradas, 'auto', 'autos') + '*' + (llegaron.length ? ':\n' + lista(llegaron, (x) => hora(x.checkin) + ' · ' + auto(x) + ' · ' + x.matricula + ' · ' + x.cliente + (x.lugar ? ' (' + x.lugar + ')' : '')) + '\n' : '. ');
        s += f.hoy.por_llegar_total ? 'Faltan llegar *' + f.hoy.por_llegar_total + '*:\n' + lista(f.hoy.por_llegar, (x) => hora(x.hora) + ' · ' + x.matricula + ' · ' + x.cliente) : 'No queda nadie por llegar hoy.';
        partes.push(s);
      }
    } else if (tema === 'salidas') {
      if (!hoy) partes.push(per.nombre + ' salieron *' + n(f.periodo.salidas, 'auto', 'autos') + '*.');
      else {
        let s = 'Hoy salieron *' + n(f.hoy.salidas, 'auto', 'autos') + '*. ';
        s += f.hoy.por_salir_total ? 'Faltan salir *' + f.hoy.por_salir_total + '*:\n' + lista(f.hoy.por_salir, (x) => hora(x.hora) + ' · ' + x.matricula + (x.lugar ? ' (' + x.lugar + ')' : '') + ' · ' + x.cliente) : 'No queda nadie por salir hoy.';
        partes.push(s);
      }
    } else if (tema === 'plata') {
      const q = f.periodo;
      if (!q.cobrado) partes.push(per.nombre + ' no se cobró nada todavía.');
      else {
        const medios = Object.keys(MEDIOS).filter((k) => q.por_medio[k]).map((k) => MEDIOS[k] + ' ' + plata(q.por_medio[k])).join(' · ');
        partes.push('💵 ' + per.nombre + ' se cobraron *' + plata(q.cobrado) + '* en ' + n(q.pagos, 'pago', 'pagos') + ':\n' + medios +
          (q.facturas ? '\nFacturas emitidas: ' + q.facturas + ' (' + plata(q.facturado) + ').' : ''));
      }
    } else if (tema === 'caja') {
      const c = f.caja;
      partes.push(!c.abierta ? 'La caja está *cerrada*.' :
        'La caja está *abierta* desde las ' + hora(c.apertura) + ' (la abrió ' + c.abrio + ').\nEfectivo que tendría que haber: *' + plata(c.efectivo) + '* (base ' + plata(c.base) + ').' +
        (c.otros ? '\nAdemás entraron ' + plata(c.otros) + ' por tarjeta, transferencia u online.' : ''));
    } else if (tema === 'web') {
      const q = f.periodo, web = q.por_origen.web || 0;
      partes.push(per.nombre + ': *' + n(web, 'reserva por la web', 'reservas por la web') + '*' + (web ? ', ' + q.web_pagadas + ' ya ' + (q.web_pagadas === 1 ? 'pagada' : 'pagadas') : '') + '.' +
        (f.web_sin_pagar ? '\nReservas web próximas que todavía no pagaron: ' + f.web_sin_pagar + '.' : ''));
    } else if (tema === 'reservas') {
      const q = f.periodo, orig = Object.keys(q.por_origen).map((k) => (ORIGEN[k] || k) + ' ' + q.por_origen[k]).join(' · ');
      partes.push('📋 ' + per.nombre + ': *' + n(q.reservas, 'reserva nueva', 'reservas nuevas') + '*' + (orig ? ' (' + orig + ')' : '') + '.' +
        '\nHoy llegan ' + f.hoy.por_llegar_total + ' más y mañana ' + f.hoy.manana + '.');
    } else if (tema === 'traslados') {
      const pend = f.traslados;
      partes.push(!pend.length ? 'No quedan traslados pendientes hoy. 🚐' :
        '🚐 Traslados pendientes de hoy: *' + pend.length + '*\n' + lista(pend, (x) => hora(x.hora) + ' · ' + (x.tipo === 'llevar' ? 'Llevar a ' : 'Buscar a ') + x.cliente +
          ' (' + n(x.pasajeros, 'pasajero', 'pasajeros') + ')' + (x.estado === 'en_camino' ? ' · en camino' : ''), 8));
    } else if (tema === 'equipo') {
      const trab = f.trabajando || [];
      partes.push((trab.length ? '👷 Trabajando ahora: ' + trab.map((x) => x.nombre + ' (desde las ' + hora(x.desde) + ')').join(', ') + '.' : '👷 Ahora no hay nadie trabajando (nadie marcó entrada).') + '\n' +
        'Con acceso al sistema: ' + (f.equipo.map((x) => x.nombre + ' (' + (ROL[x.rol] || x.rol) + ')').join(', ') || 'nadie') + '.' +
        (f.ingresaron_hoy.length ? '\nHoy entraron al sistema: ' + f.ingresaron_hoy.join(', ') + '.' : '\nHoy todavía no entró nadie al sistema.') +
        (f.sin_acceso ? '\n' + n(f.sin_acceso, 'persona espera', 'personas esperan') + ' que le des acceso en Equipo.' : ''));
    } else if (tema === 'mapa') {
      partes.push(mapa(f));
    } else if (tema === 'detalle') {
      const r = (p.busqueda && p.busqueda.resultados) || [];
      if (p.fallo) partes.push('No pude buscar eso ahora. Probá de nuevo en un ratito.');
      else if (!r.length && p.adivina) continue;
      else if (!r.length) {
        partes.push(p.buscar ? 'No encontré nada con «' + p.buscar + '». Probá con la matrícula, el lugar (ej. *A-05*) o el nombre del cliente.'
          : 'Todavía no hay autos para mostrarte.');
      } else if (r.length === 1) partes.push('🚗 ' + ficha(r[0], ahora) + '\n\n' + oferta(r[0]));
      else {
        partes.push('Encontré ' + r.length + ' con «' + p.buscar + '»:\n' +
          lista(r, (x) => auto(x) + ' · ' + x.matricula + ' · ' + x.cliente + (x.estado === 'en_predio' ? ' · ' + (x.lugar || 'adentro') : ' · llega ' + cuando(x.entrada, ahora))) +
          '\n\nDecime la matrícula o el lugar y te doy el detalle.');
      }
    } else if (tema === 'telefono') {
      const c = p.contacto, wa = c && waMe(c.telefono);
      if (p.fallo) partes.push('No pude buscar el teléfono ahora. Probá de nuevo en un ratito.');
      else if (!c) partes.push(p.buscar ? 'No encontré a nadie con «' + p.buscar + '». Probá con la matrícula, el lugar (ej. *A-05*) o el nombre.'
        : '¿De quién? Decime la matrícula, el lugar (ej. *A-05*) o el nombre del cliente.');
      else partes.push('📱 *' + c.cliente + '* (' + c.matricula + ')\n' + c.telefono + (wa ? '\n' + wa : ''));
    } else if (tema === 'gracias') {
      partes.push(['¡De nada! Acá estoy, mirando la pista. 🛫', '¡Un placer! Cualquier cosa, me escribís.', '¡Joya! Sigo atento al parking. 👀'][Math.floor(ahora / 60000) % 3]);
    } else if (tema === 'resumen') {
      partes.push(saludo(ahora) + (f.quien ? ', ' + primero(f.quien) : '') + '. Así viene el día:\n\n' +
        '*Resumen de ahora*\n' +
        '• Autos en el parking: ' + f.autos.total + ' (' + f.autos.techado + ' techado · ' + f.autos.aire + ' predio)\n' +
        '• Hoy: ' + f.hoy.entradas + ' entradas y ' + f.hoy.salidas + ' salidas; faltan llegar ' + f.hoy.por_llegar_total + ' y salir ' + f.hoy.por_salir_total + '\n' +
        '• Cobrado hoy: ' + plata(f.periodo.cobrado) + '\n' +
        '• Caja: ' + (f.caja.abierta ? 'abierta, ' + plata(f.caja.efectivo) + ' en efectivo' : 'cerrada') + '\n' +
        '• Traslados pendientes: ' + f.traslados.length);
    } else if (tema === 'ayuda') {
      partes.push(AYUDA(f.quien, false, ahora));
    }
  }
  if (!partes.length) return 'Uy, esa no la agarré 😅 ' + AYUDA(f.quien, true, ahora);
  return partes.join('\n\n');
}
function AYUDA(quien, corto, ahora = Date.now()) {
  return (corto ? '' : saludo(ahora) + (quien ? ', ' + primero(quien) : '') + ' 👋 Habla *Torre*, la torre de control de Parking Despegar. ' +
    'Te aviso cuando entra un auto o llega una reserva nueva, y te cuento lo que quieras del parking.\n\n') +
    'Preguntame escribiendo o con un audio, por ejemplo:\n' +
    '• ¿Cuántos autos hay? · ¿Qué autos hay? (el mapa)\n• ¿Qué auto es? · ¿De quién es el A-05?\n• Teléfono de Juan Pérez\n' +
    '• ¿Cuántos lugares libres quedan?\n• ¿Quién llega hoy? · ¿Quién sale hoy?\n' +
    '• ¿Cuánto cobré hoy? (o ayer, esta semana, este mes, septiembre)\n• ¿Cómo está la caja?\n' +
    '• ¿Cuántas reservas entraron por la web?\n• ¿Qué traslados quedan?\n• ¿Quién está trabajando?\n• Resumen';
}

/* ============================================================
   3) AVISOS: entró un auto o llegó una reserva nueva
   La base (disparador con pg_net) avisa acá; asistente_aviso() confirma que
   es real y reciente, que no se avisó antes, y dice a quién mandarlo.
   ============================================================ */
async function recibirAviso(pedido, env, ctx) {
  if (pedido.method !== 'POST') return new Response('No', { status: 405 });
  let b;
  try { b = await pedido.json(); } catch (e) { b = null; }
  if (!b || !['entrada', 'reserva', 'ingreso', 'egreso'].includes(b.tipo) || !/^[0-9a-f-]{36}$/i.test(String(b.reserva || ''))) return new Response('No', { status: 400 });
  const tarea = avisar(env, b.tipo, b.reserva).catch((e) => console.error('aviso:', e));
  if (ctx && ctx.waitUntil) ctx.waitUntil(tarea); else await tarea;
  return new Response('ok', { status: 200 });
}

async function avisar(env, tipo, reserva) {
  if (!env.WHATSAPP_NUMERO_ID || !env.WHATSAPP_TOKEN) return console.error('aviso: falta WHATSAPP_NUMERO_ID en Cloudflare');
  const a = await rpc(env, 'asistente_aviso', { p_clave: env.ASISTENTE_CLAVE || '', p_reserva: reserva, p_tipo: tipo });
  if (!a) return;
  const ahora = Date.now();
  for (const d of a.destinatarios || []) {
    // WhatsApp deja escribir libre solo si esa persona le habló a Torre en las últimas 24 h;
    // si no, hace falta una plantilla aprobada por Meta (opcional).
    if (d.ventana || !env.WHATSAPP_PLANTILLA) await enviar(env, env.WHATSAPP_NUMERO_ID, d.telefono, textoAviso(a, d.nombre, ahora));
    else {
      await mandar(env, env.WHATSAPP_NUMERO_ID, { to: d.telefono, type: 'template', template: {
        name: env.WHATSAPP_PLANTILLA, language: { code: env.WHATSAPP_PLANTILLA_IDIOMA || 'es' },
        components: [{ type: 'body', parameters: [{ type: 'text', text: lineaAviso(a, ahora) }] }] } });
    }
  }
}

function textoAviso(a, nombre, ahora = Date.now()) {
  const hola = 'Hola' + (nombre ? ' ' + primero(nombre) : '');
  if (a.tipo === 'ingreso' || a.tipo === 'egreso') return textoJornada(a, hola);
  const f = a.ficha;
  const titulo = a.tipo === 'entrada' ? '🚗 *' + hola + ', acaba de entrar un vehículo nuevo*'
    : '📋 *' + hola + ', entró una reserva nueva*' + (POR_ORIGEN[f.origen] ? ' (' + POR_ORIGEN[f.origen] + ')' : '');
  const libres = a.tipo === 'entrada' && a.libres ? '\n\nQuedan libres ' + a.libres.techado + ' en techado y ' + a.libres.aire + ' en el predio.' : '';
  return titulo + '\n\n' + ficha(f, ahora) + libres + '\n\n' + oferta(f);
}
/* Alguien del equipo empieza o termina de trabajar */
function duracion(desde, hasta) {
  const min = Math.max(0, Math.round((new Date(hasta) - new Date(desde)) / 60000));
  return Math.floor(min / 60) + ' h ' + String(min % 60).padStart(2, '0') + ' min';
}
function textoJornada(a, hola) {
  const p = a.persona, quien = '*' + p.nombre + '*' + (ROL[p.rol] ? ' (' + ROL[p.rol] + ')' : '');
  const otros = (a.trabajando || []).filter((x) => x !== p.nombre);
  if (a.tipo === 'ingreso') {
    return '👷 ' + (hola ? hola + ', ' : '') + quien + ' empezó a trabajar a las ' + hora(p.entrada) + '.' +
      (otros.length ? '\nTambién están trabajando: ' + otros.join(', ') + '.' : '');
  }
  return '🏁 ' + (hola ? hola + ', ' : '') + quien + ' terminó de trabajar a las ' + hora(p.salida) + '. Trabajó ' + duracion(p.entrada, p.salida) + '.' +
    (otros.length ? '\nSiguen trabajando: ' + otros.join(', ') + '.' : '\nAhora no queda nadie trabajando.');
}

/* Una sola línea (las plantillas de Meta no aceptan saltos de línea en los datos) */
function lineaAviso(a, ahora = Date.now()) {
  if (a.tipo === 'ingreso' || a.tipo === 'egreso') return textoJornada(a, '').replace(/[*_]/g, '').replace(/\s+/g, ' ').trim();
  const f = a.ficha;
  return (a.tipo === 'entrada'
    ? 'Acaba de entrar ' + auto(f) + ' (' + f.matricula + ') de ' + f.cliente + (f.lugar ? ', lugar ' + f.lugar : '')
    : 'Reserva nueva ' + f.codigo + ' de ' + f.cliente + ' (' + auto(f) + ', ' + f.matricula + '), llega ' + cuando(f.entrada, ahora)).replace(/\s+/g, ' ');
}

/* ============================================================
   4) PAGO ONLINE (dLocal Go)
   El navegador nunca toca las llaves: este servicio crea el cobro con la reserva y su código
   secreto de un solo uso, y la reserva se marca pagada solo cuando dLocal confirma.
   ============================================================ */
const DLOCAL = { prueba: 'https://api-sbx.dlocalgo.com', real: 'https://api.dlocalgo.com' };
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

async function dlocal(env, metodo, ruta, cuerpo) {
  const r = await fetch((env.DLOCAL_ENTORNO === 'real' ? DLOCAL.real : DLOCAL.prueba) + ruta, {
    method: metodo,
    headers: { Authorization: 'Bearer ' + env.DLOCAL_API_KEY + ':' + env.DLOCAL_SECRET, 'Content-Type': 'application/json' },
    body: cuerpo ? JSON.stringify(cuerpo) : undefined
  });
  const j = await r.json().catch(() => null);
  if (!r.ok) throw new Error('dLocal respondió ' + r.status + (j && j.message ? ': ' + j.message : ''));
  return j;
}
function montoPrueba(env) { const m = +env.DLOCAL_MONTO_PRUEBA; return m > 0 ? m : 0; }
function confirmarPago(env, p) {
  return rpc(env, 'pago_web_confirmar', { p_clave: env.ASISTENTE_CLAVE || '', p_pasarela_id: p.id, p_cobrado: p.amount, p_prueba: montoPrueba(env) > 0 });
}

async function pagos(pedido, ruta, env) {
  if (ruta === '/pago/aviso') return avisoPago(pedido, env);
  const origen = pedido.headers.get('Origin') || '';
  const permitidos = ORIGENES.concat(env.ORIGEN_EXTRA ? [env.ORIGEN_EXTRA] : []);
  const cabeceras = {
    'Access-Control-Allow-Origin': permitidos.includes(origen) ? origen : ORIGENES[0],
    'Access-Control-Allow-Methods': 'POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type',
    'Vary': 'Origin', 'Cache-Control': 'no-store', 'Content-Type': 'application/json; charset=utf-8'
  };
  const responder = (cuerpo, status = 200) => new Response(JSON.stringify(cuerpo), { status, headers: cabeceras });
  if (pedido.method === 'OPTIONS') return new Response(null, { status: 204, headers: cabeceras });
  if (pedido.method !== 'POST') return responder({ error: 'No existe' }, 405);
  if (!env.DLOCAL_API_KEY || !env.DLOCAL_SECRET || !env.ASISTENTE_CLAVE) return responder({ error: 'sin-pasarela' }, 503);
  let b;
  try { b = await pedido.json(); } catch (e) { b = null; }
  if (!b || !UUID.test(String(b.reserva || '')) || !UUID.test(String(b.token || ''))) return responder({ error: 'Datos no válidos.' }, 400);
  const args = { p_clave: env.ASISTENTE_CLAVE, p_reserva: b.reserva, p_token: b.token };
  try {
    if (ruta === '/pago/crear') {
      const d = await rpc(env, 'pago_web_preparar', args);
      const sitio = (env.SITIO || 'https://livo.com.uy/parkingdespegar/').replace(/\/?$/, '/');
      const prueba = montoPrueba(env);
      const p = await dlocal(env, 'POST', '/v1/payments', {
        currency: 'UYU', amount: prueba || d.saldo, country: 'UY', order_id: b.reserva,
        description: ('Reserva ' + d.codigo + ' · Parking Despegar').slice(0, 100),
        payer: Object.assign({ name: String(d.nombre || '').slice(0, 100), phone: String(d.telefono || '').slice(0, 100) }, d.email ? { email: String(d.email).slice(0, 100) } : {}),
        success_url: sitio + 'reservar.html?pago=ok&r=' + b.reserva,
        back_url: sitio + 'reservar.html?pago=volver&r=' + b.reserva,
        notification_url: new URL(pedido.url).origin + '/pago/aviso'
      });
      if (!p || !p.id || !p.redirect_url) throw new Error('dLocal no devolvió la página de pago');
      await rpc(env, 'pago_web_guardar', { p_clave: env.ASISTENTE_CLAVE, p_reserva: b.reserva, p_pasarela_id: p.id });
      return responder({ url: p.redirect_url, codigo: d.codigo });
    }
    if (ruta === '/pago/estado') {
      let e = await rpc(env, 'pago_web_estado', args);
      if (!e.pagada && e.pasarela_id) {
        const p = await dlocal(env, 'GET', '/v1/payments/' + encodeURIComponent(e.pasarela_id));
        if (p && p.status === 'PAID') { await confirmarPago(env, p); e = await rpc(env, 'pago_web_estado', args); }
        else e.estado_pago = p && p.status;
      }
      delete e.pasarela_id;
      return responder(e);
    }
    return responder({ error: 'No existe' }, 404);
  } catch (x) {
    console.error('pago:', x);
    return responder({ error: x.sinBase ? 'No pudimos conectarnos. Probá de nuevo en un momento.' : x.message.replace(/^[a-z_]+: \d+ /, '') }, x.sinBase ? 503 : 400);
  }
}

/* dLocal avisa con POST {"payment_id": "DP-…"} firmado: HMAC-SHA256(secret, apiKey + cuerpo) */
async function firmaDlocal(cuerpo, cabecera, env) {
  const m = /Signature:\s*([0-9a-f]{64})/i.exec(cabecera || '');
  if (!m || !env.DLOCAL_API_KEY || !env.DLOCAL_SECRET) return false;
  const clave = await crypto.subtle.importKey('raw', new TextEncoder().encode(env.DLOCAL_SECRET), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const mac = new Uint8Array(await crypto.subtle.sign('HMAC', clave, new TextEncoder().encode(env.DLOCAL_API_KEY + cuerpo)));
  const esperado = [...mac].map((x) => x.toString(16).padStart(2, '0')).join(''), firma = m[1].toLowerCase();
  let dif = 0;
  for (let i = 0; i < esperado.length; i++) dif |= esperado.charCodeAt(i) ^ firma.charCodeAt(i);
  return dif === 0;
}
async function avisoPago(pedido, env) {
  if (pedido.method !== 'POST') return new Response('No', { status: 405 });
  const cuerpo = await pedido.text();
  if (!(await firmaDlocal(cuerpo, pedido.headers.get('Authorization'), env))) return new Response('Firma inválida', { status: 401 });
  let id;
  try { id = JSON.parse(cuerpo).payment_id; } catch (e) { id = null; }
  if (!id) return new Response('ok', { status: 200 });
  try {
    const p = await dlocal(env, 'GET', '/v1/payments/' + encodeURIComponent(id));
    if (p && p.status === 'PAID') await confirmarPago(env, p);
    return new Response('ok', { status: 200 });
  } catch (e) {
    if (/Pago desconocido/.test(e.message)) return new Response('ok', { status: 200 });   // un pago que no es de una reserva
    console.error('aviso de pago:', e);
    return new Response('reintentar', { status: 500 });   // dLocal reintenta cada 10 minutos
  }
}

// Para las pruebas (Cloudflare ignora estas exportaciones)
export { interpretar, responder, periodo, normalizar, firmaValida, traducir, buscado, textoAviso, lineaAviso, ficha, cuando, waMe };
