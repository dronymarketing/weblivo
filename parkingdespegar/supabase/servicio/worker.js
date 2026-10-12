/* ============================================================
   PARKING DESPEGAR — Servicio en Cloudflare (un solo Worker)

   1) Reactivar la base si el plan gratis de Supabase la pausa
        GET  /estado     → si la base está activa, en pausa o despertando
        POST /reactivar  → si está en pausa, la despierta
   2) «Torre de Parking Despegar»: asistente de WhatsApp para la dueña («Torre»)
        GET  /whatsapp   → Meta comprueba que el servicio es nuestro
        POST /whatsapp   → llega un mensaje (texto o audio) y se responde

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
    return reactivacion(pedido, ruta, env);
  }
};

/* ============================================================
   1) REACTIVAR LA BASE
   ============================================================ */
async function reactivacion(pedido, ruta, env) {
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
  if (ruta === '/') return responder({ servicio: 'Parking Despegar', reactivar: !!env.SUPABASE_TOKEN, whatsapp: !!(env.WHATSAPP_TOKEN && env.ASISTENTE_CLAVE) });
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
  let respuesta = responder(p, foto);
  if (msj.type === 'audio') respuesta = '_«' + texto.trim().slice(0, 200) + '»_\n\n' + respuesta;
  return enviar(env, numeroId, de, respuesta);
}

async function consultar(env, telefono, desde, hasta) {
  let r;
  try {
    r = await fetch((env.SUPABASE_URL || SUPABASE_URL) + '/rest/v1/rpc/asistente_consulta', {
      method: 'POST',
      headers: { apikey: env.SUPABASE_CLAVE_PUBLICA || CLAVE_PUBLICA, 'Content-Type': 'application/json' },
      body: JSON.stringify({ p_clave: env.ASISTENTE_CLAVE || '', p_telefono: telefono, p_desde: desde || null, p_hasta: hasta || null })
    });
  } catch (e) { throw Object.assign(new Error('sin base'), { sinBase: true }); }
  if (r.status >= 500 || r.status === 0) throw Object.assign(new Error('sin base ' + r.status), { sinBase: true });
  const j = await r.json().catch(() => null);
  if (!r.ok) {
    const m = (j && j.message) || '';
    if (/no está habilitado/.test(m)) throw Object.assign(new Error(m), { noHabilitado: true });
    if (/Clave del asistente/.test(m)) throw Object.assign(new Error(m), { claveMala: true });
    throw new Error('consulta: ' + r.status + ' ' + m);
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

async function enviar(env, numeroId, a, texto) {
  const r = await fetch(GRAPH + numeroId + '/messages', {
    method: 'POST',
    headers: { Authorization: 'Bearer ' + env.WHATSAPP_TOKEN, 'Content-Type': 'application/json' },
    body: JSON.stringify({ messaging_product: 'whatsapp', to: a, type: 'text', text: { preview_url: false, body: texto.slice(0, 4000) } })
  });
  if (!r.ok) console.error('WhatsApp no envió:', r.status, await r.text());
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
  ['equipo', /emplead|\bequipo\b|\bpersonal\b|trabaj|quien(es)? (esta|estan|vino|vinieron|entro|entraron|ingreso)|acceso/],
  ['plata', /factur|\bcobr|recaud|\bplata\b|vend|gananci|\bgane\b|ganamos|\bingresos\b|dinero|\bpesos\b|tarjeta|transferencia|efectivo|cuanto (hice|hicimos|saque|sacamos)/],
  ['web', /\b(web|online|internet|pagina|en linea)\b/],
  ['lugares', /libre|\blugar(es)?\b|espacio|disponib|lleno|capacidad|ocupacion|\bcaben?\b/],
  ['salidas', /\bsal(e|en|ida|idas|ieron|io|iendo|gan)\b|retir|se (van|fue|fueron|llevan)|devolv|entreg/],
  ['entradas', /\bentr(a|an|ada|adas|aron|o|ando)\b|\blleg(a|an|ada|adas|aron|o|ando|uen)\b|vien(e|en)\b/],
  ['autos', /\bautos?\b|vehicul|coches?\b|\bcarros?\b|cuantos hay|ocupad|adentro|en el (parking|predio)/],
  ['reservas', /reserv/]
];
const MESES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

function normalizar(t) {
  return String(t || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/setiembre/g, 'septiembre')
    .replace(/[^a-z0-9ñ ]+/g, ' ').replace(/\s+/g, ' ').trim();
}

function interpretar(texto, ahora) {
  const t = normalizar(texto);
  // Se responde en el orden en que aparece cada cosa en la pregunta
  let temas = TEMAS.map(([n, re]) => [n, t.search(re)]).filter(([, i]) => i >= 0).sort((a, b) => a[1] - b[1]).map(([n]) => n);
  const manana = /\bmanana\b/.test(t);
  // «reservas que entraron por la web» son reservas nuevas, no autos que entraron
  if (temas.includes('web')) temas = temas.filter((x) => x !== 'reservas' && x !== 'entradas');
  if (temas.includes('reservas') && temas.includes('entradas')) {
    temas = temas.filter((x) => x !== (manana || /\blleg/.test(t) ? 'reservas' : 'entradas'));
  }
  if (temas.includes('caja')) temas = temas.filter((x) => x !== 'plata' || /factur|cobr|recaud/.test(t));
  if (temas.includes('ayuda') && temas.length > 1) temas = temas.filter((x) => x !== 'ayuda');
  if (temas.includes('resumen') && temas.length > 1) temas = temas.filter((x) => x !== 'resumen');
  if (temas.includes('entradas') || temas.includes('salidas')) temas = temas.filter((x) => x !== 'autos');
  if (!temas.length && /^(hola|buenas|buen dia|buenos dias|buenas tardes|buenas noches|que tal|torre)\b/.test(t)) temas = ['ayuda'];
  return { texto: t, temas, manana, periodo: periodo(t, ahora) };
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
const ROL = { admin: 'administración', personal: 'personal de turno', chofer: 'chofer' };
function plata(n) { return '$ ' + String(Math.round(n || 0)).replace(/\B(?=(\d{3})+(?!\d))/g, '.'); }
function hora(iso) { const x = new Date(new Date(iso).getTime() - UY); return String(x.getUTCHours()).padStart(2, '0') + ':' + String(x.getUTCMinutes()).padStart(2, '0'); }
function n(c, uno, varios) { return c + ' ' + (c === 1 ? uno : varios); }
function lista(items, fn, max = 6) {
  const l = items.slice(0, max).map((x) => '• ' + fn(x));
  if (items.length > max) l.push('• y ' + (items.length - max) + ' más');
  return l.join('\n');
}

function responder(p, f) {
  const partes = [];
  const per = p.periodo, hoy = per.clave === 'hoy';
  for (const tema of p.temas) {
    if (tema === 'autos') {
      let s = '*' + n(f.autos.total, 'auto', 'autos') + '* en el parking ahora: ' + f.autos.techado + ' en techado y ' + f.autos.aire + ' en el predio.';
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
        let s = 'Hoy entraron *' + n(f.hoy.entradas, 'auto', 'autos') + '*. ';
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
        partes.push(per.nombre + ' se cobraron *' + plata(q.cobrado) + '* en ' + n(q.pagos, 'pago', 'pagos') + ':\n' + medios +
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
      partes.push(per.nombre + ': *' + n(q.reservas, 'reserva nueva', 'reservas nuevas') + '*' + (orig ? ' (' + orig + ')' : '') + '.' +
        '\nHoy llegan ' + f.hoy.por_llegar_total + ' más y mañana ' + f.hoy.manana + '.');
    } else if (tema === 'traslados') {
      const pend = f.traslados;
      partes.push(!pend.length ? 'No quedan traslados pendientes hoy.' :
        'Traslados pendientes de hoy: *' + pend.length + '*\n' + lista(pend, (x) => hora(x.hora) + ' · ' + (x.tipo === 'llevar' ? 'Llevar a ' : 'Buscar a ') + x.cliente +
          ' (' + n(x.pasajeros, 'pasajero', 'pasajeros') + ')' + (x.estado === 'en_camino' ? ' · en camino' : ''), 8));
    } else if (tema === 'equipo') {
      partes.push('Con acceso al sistema: ' + (f.equipo.map((x) => x.nombre + ' (' + (ROL[x.rol] || x.rol) + ')').join(', ') || 'nadie') + '.' +
        (f.ingresaron_hoy.length ? '\nHoy entraron al sistema: ' + f.ingresaron_hoy.join(', ') + '.' : '\nHoy todavía no entró nadie al sistema.') +
        (f.sin_acceso ? '\n' + n(f.sin_acceso, 'persona espera', 'personas esperan') + ' que le des acceso en Equipo.' : ''));
    } else if (tema === 'resumen') {
      partes.push('*Resumen de ahora*\n' +
        '• Autos en el parking: ' + f.autos.total + ' (' + f.autos.techado + ' techado · ' + f.autos.aire + ' predio)\n' +
        '• Hoy: ' + f.hoy.entradas + ' entradas y ' + f.hoy.salidas + ' salidas; faltan llegar ' + f.hoy.por_llegar_total + ' y salir ' + f.hoy.por_salir_total + '\n' +
        '• Cobrado hoy: ' + plata(f.periodo.cobrado) + '\n' +
        '• Caja: ' + (f.caja.abierta ? 'abierta, ' + plata(f.caja.efectivo) + ' en efectivo' : 'cerrada') + '\n' +
        '• Traslados pendientes: ' + f.traslados.length);
    } else if (tema === 'ayuda') {
      partes.push(AYUDA(f.quien));
    }
  }
  if (!partes.length) return 'No te entendí. ' + AYUDA(f.quien, true);
  return partes.join('\n\n');
}
function AYUDA(quien, corto) {
  return (corto ? '' : 'Hola' + (quien ? ' ' + quien.split(' ')[0] : '') + ', habla *Torre*, el asistente de Parking Despegar. ') +
    'Preguntame escribiendo o con un audio, por ejemplo:\n' +
    '• ¿Cuántos autos hay?\n• ¿Cuántos lugares libres quedan?\n• ¿Quién llega hoy? · ¿Quién sale hoy?\n' +
    '• ¿Cuánto cobré hoy? (o ayer, esta semana, este mes, septiembre)\n• ¿Cómo está la caja?\n' +
    '• ¿Cuántas reservas entraron por la web?\n• ¿Qué traslados quedan?\n• ¿Quién está trabajando?\n• Resumen';
}

// Para las pruebas (Cloudflare ignora estas exportaciones)
export { interpretar, responder, periodo, normalizar, firmaValida, traducir };
