/* ============================================================
   LA ESTRELLA — Servicio de WhatsApp (un Worker de Cloudflare, gratis)

   1) Asistente: la dueña le escribe (o le manda un audio) al número del negocio y contesta con los datos
      del momento: «¿cuánto vendí hoy?», «¿cómo está la caja?», «¿qué falta reponer?», «¿quién debe?».
        GET  /whatsapp  → Meta comprueba que el servicio es nuestro
        POST /whatsapp  → llega un mensaje (texto o audio) y se responde
      No usa IA paga: entiende las preguntas comunes por palabras clave y pasa los audios a texto con Whisper
      (Workers AI, gratis en este uso). Lee la base con asistente_consulta(), que solo responde a celulares
      habilitados en el panel (Ajustes → Asistente) y no puede cambiar nada.

   2) Avisos a deudores: al llegar al 80 % de su límite y al pasarlo, la base (disparador con pg_net) avisa acá.
        POST /aviso {aviso: id} → servicio_aviso() entrega el mensaje → API de WhatsApp (plantilla aprobada)
                                → servicio_resultado() anota «enviado» o «error» (se ve en Deudores → Avisos)

   Secretos (Cloudflare → Worker → Settings → Variables and Secrets), nunca en este archivo:
     SERVICIO_CLAVE         la que devuelve select public.crear_clave_servicio();
     WHATSAPP_TOKEN         token permanente del usuario del sistema de Meta
     WHATSAPP_SECRETO_APP   «App secret» de la app de Meta (firma de los mensajes que llegan)
     WHATSAPP_VERIFICACION  una palabra cualquiera, la misma que se pone en Meta al conectar el webhook
   Variables de texto:
     WHATSAPP_NUMERO_ID        «Phone number ID» del número de WhatsApp Business
     WHATSAPP_PLANTILLA        plantilla aprobada (categoría Utilidad, UNA variable en el cuerpo) para avisar a deudores
     WHATSAPP_PLANTILLA_IDIOMA opcional, por defecto «es»
   Enlace (Settings → Bindings → Add → Workers AI), con el nombre AI: para entender los audios.
   ============================================================ */
const SUPABASE_URL = 'https://gbezzoutnaxvdzfjytlr.supabase.co';
const CLAVE_PUBLICA = 'sb_publishable_0vHo4Yucf_1wRD4N95W-jw__urGt__r'; // pública por diseño (la misma de config.js)
const GRAPH = 'https://graph.facebook.com/v23.0/';
const UY = 3 * 3600000; // Uruguay: UTC−3 todo el año

export default {
  async fetch(pedido, env, ctx) {
    const url = new URL(pedido.url);
    const ruta = url.pathname.replace(/\/+$/, '') || '/';
    if (ruta === '/whatsapp') return whatsapp(pedido, url, env, ctx);
    if (ruta === '/aviso') return recibirAviso(pedido, env, ctx);
    return new Response(JSON.stringify({
      avisos: !!(env.WHATSAPP_TOKEN && env.WHATSAPP_NUMERO_ID && env.WHATSAPP_PLANTILLA && env.SERVICIO_CLAVE),
      asistente: !!(env.WHATSAPP_TOKEN && env.WHATSAPP_NUMERO_ID && env.SERVICIO_CLAVE && env.WHATSAPP_SECRETO_APP && env.WHATSAPP_VERIFICACION)
    }), { headers: { 'Content-Type': 'application/json' } });
  }
};

/* ============================================================
   Comunicación con la base y con WhatsApp
   ============================================================ */
async function rpc(env, funcion, args) {
  let r;
  try {
    r = await fetch(SUPABASE_URL + '/rest/v1/rpc/' + funcion, {
      method: 'POST',
      headers: { apikey: CLAVE_PUBLICA, 'Content-Type': 'application/json' },
      body: JSON.stringify(args)
    });
  } catch (e) { throw Object.assign(new Error('sin base'), { sinBase: true }); }
  if (r.status >= 500 || r.status === 0) throw Object.assign(new Error('sin base ' + r.status), { sinBase: true });
  const j = await r.json().catch(() => null);
  if (!r.ok) {
    const m = (j && j.message) || '';
    if (/no está habilitado/.test(m)) throw Object.assign(new Error(m), { noHabilitado: true });
    if (/Clave del servicio/.test(m)) throw Object.assign(new Error(m), { claveMala: true });
    throw new Error(funcion + ': ' + r.status + ' ' + m);
  }
  return j;
}
const consultar = (env, tel, desde, hasta) => rpc(env, 'asistente_consulta', { p_clave: env.SERVICIO_CLAVE || '', p_telefono: tel, p_desde: desde || null, p_hasta: hasta || null });
const resultado = (env, id, estado, detalle) => rpc(env, 'servicio_resultado', { p_clave: env.SERVICIO_CLAVE, p_id: id, p_estado: estado, p_detalle: detalle });

// Uruguay: 099 123 456 → 59899123456
function telefono(t) {
  let d = String(t || '').replace(/\D/g, '');
  if (!d) return '';
  if (d.startsWith('598')) return d;
  if (d.startsWith('0')) d = d.slice(1);
  return '598' + d;
}

async function mandar(env, numeroId, mensaje) {
  const r = await fetch(GRAPH + numeroId + '/messages', {
    method: 'POST',
    headers: { Authorization: 'Bearer ' + env.WHATSAPP_TOKEN, 'Content-Type': 'application/json' },
    body: JSON.stringify(Object.assign({ messaging_product: 'whatsapp' }, mensaje))
  });
  if (!r.ok) console.error('WhatsApp no envió:', r.status, await r.text());
  return r;
}
const enviar = (env, numeroId, a, texto) => mandar(env, numeroId, { to: a, type: 'text', text: { preview_url: false, body: texto.slice(0, 4000) } });
function marcarLeido(env, numeroId, id) {
  if (!id) return;
  fetch(GRAPH + numeroId + '/messages', {
    method: 'POST',
    headers: { Authorization: 'Bearer ' + env.WHATSAPP_TOKEN, 'Content-Type': 'application/json' },
    body: JSON.stringify({ messaging_product: 'whatsapp', status: 'read', message_id: id })
  }).catch(() => {});
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

/* ============================================================
   1) ASISTENTE
   ============================================================ */
async function whatsapp(pedido, url, env, ctx) {
  if (pedido.method === 'GET') { // Meta comprueba el servicio una vez, al conectarlo
    const ok = url.searchParams.get('hub.mode') === 'subscribe' && env.WHATSAPP_VERIFICACION &&
               url.searchParams.get('hub.verify_token') === env.WHATSAPP_VERIFICACION;
    return ok ? new Response(url.searchParams.get('hub.challenge') || '', { status: 200 }) : new Response('No', { status: 403 });
  }
  if (pedido.method !== 'POST') return new Response('No', { status: 405 });
  const cuerpo = await pedido.text();
  if (!(await firmaValida(cuerpo, pedido.headers.get('X-Hub-Signature-256'), env.WHATSAPP_SECRETO_APP))) return new Response('Firma inválida', { status: 401 });
  let aviso;
  try { aviso = JSON.parse(cuerpo); } catch (e) { return new Response('ok', { status: 200 }); }
  for (const entrada of aviso.entry || []) {
    for (const cambio of entrada.changes || []) {
      const v = cambio.value || {};
      // Solo los mensajes que llegan al número de La Estrella
      if (env.WHATSAPP_NUMERO_ID && (v.metadata || {}).phone_number_id !== env.WHATSAPP_NUMERO_ID) continue;
      for (const msj of v.messages || []) {
        const tarea = atender(msj, (v.metadata || {}).phone_number_id, env).catch((e) => console.error('asistente:', e));
        if (ctx && ctx.waitUntil) ctx.waitUntil(tarea); else await tarea;
      }
    }
  }
  return new Response('ok', { status: 200 });
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
  // 1) ¿Está habilitado? A desconocidos no se les contesta.
  let foto;
  try { foto = await consultar(env, de); }
  catch (e) {
    if (e.noHabilitado) return;
    if (e.claveMala) return enviar(env, numeroId, de, 'El asistente no está bien configurado (la clave no coincide). Avisale a quien lo instaló.');
    if (e.sinBase) return enviar(env, numeroId, de, 'No pude conectarme con la base de datos. Probá de nuevo en un rato.');
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
  // 3) Qué pregunta y de qué período
  const p = interpretar(texto, Date.now());
  if (p.periodo.clave !== 'hoy' && p.temas.some((t) => ['ventas', 'top', 'resumen'].includes(t))) {
    foto = await consultar(env, de, p.periodo.desde, p.periodo.hasta);
  }
  if (p.producto) {
    try { p.encontrados = await rpc(env, 'asistente_producto', { p_clave: env.SERVICIO_CLAVE || '', p_telefono: de, p_texto: p.producto }); }
    catch (e) { console.error('producto:', e); p.fallo = true; }
  }
  let respuesta = responder(p, foto, Date.now());
  if (msj.type === 'audio') respuesta = '_«' + texto.trim().slice(0, 200) + '»_\n\n' + respuesta;
  await enviar(env, numeroId, de, respuesta);
}

/* ---------- Entender la pregunta (palabras clave, sin IA) ---------- */
const TEMAS = [
  ['ayuda', /\b(ayuda|menu|opciones|que (me )?(podes|puedo|sabes)|como (te )?(uso|funciona)s?|comandos)\b/],
  ['resumen', /\b(resumen|como (viene|va|vamos|venimos|estamos|anda|andamos)|novedades|todo el dia|en general)\b/],
  ['deudores', /deud|fiad|fio\b|fiaron|a cuenta|cuenta corriente|\bdeb(e|en)\b|moros|cobrar a/],
  ['top', /mas vendid|vende mas|se vende mas|vendio mas|mas se vendio|mas se vende|mejor(es)? (producto|venta)|\btop\b|lo que mas/],
  ['caja', /\bcaja\b|arqueo|turno/],
  ['stock', /\bstock\b|falt(a|an|ando)|repon|reposicion|agotad|se acab|sin stock|quedan?\b|minimo|\bpedir\b/],
  ['compras', /\bcompras?\b|proveedor|mercaderia|pedidos? a/],
  ['equipo', /emplead|\bequipo\b|\bpersonal\b|trabaj|cajer[ao]s?|quien(es)? (esta|estan|vino|vinieron)/],
  ['ventas', /\bvend|factur|\bcobr|recaud|\bplata\b|ingres|gananci|\bgane\b|ganamos|dinero|\bpesos\b|tarjeta|transferencia|efectivo|\bqr\b|debito|credito|cuanto (hice|hicimos|saque|sacamos|entro|entraron)|tickets?|ventas?/]
];
const MESES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
const GRACIAS = /^(muchas |mil )?(gracias|genial|perfecto|buenisimo|joya|barbaro|excelente|ok|okey|oka|listo|dale|bien|impecable|crack|bueno|ta|vale)( (gracias|crack|joya|genial))*$/;
const SALUDO = /^(hola|holis|buenas|buen dia|buenos dias|buenas tardes|buenas noches|que tal|hey)\b/;

function normalizar(t) {
  return String(t || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/setiembre/g, 'septiembre')
    .replace(/[^a-z0-9ñ ]+/g, ' ').replace(/\s+/g, ' ').trim();
}

// «stock de arroz», «a cuánto está la yerba», «cuánto cuesta el aceite» → el producto que se nombra
const PRODUCTO = [
  /\b(?:stock|precio|cuesta|sale|vale|hay|quedan?|queda)\s+(?:de|del|de la|de los|de las)\s+([a-z0-9ñ ]{2,30})/,
  /\ba cuanto (?:esta|estan|sale|salen|vale|valen|cuesta|cuestan)\s+(?:el|la|los|las)?\s*([a-z0-9ñ ]{2,30})/,
  /\bcuanto (?:cuesta|cuestan|sale|salen|vale|valen)\s+(?:el|la|los|las|un|una)?\s*([a-z0-9ñ ]{2,30})/,
  /\bcuant[oa]s?\s+([a-z0-9ñ ]{2,30}?)\s+(?:hay|quedan?|tengo|tenemos)\b/
];
const CORTE = /\b(hoy|ayer|ahora|por favor|porfa|gracias|en stock|que|y|esta semana|este mes)\b.*$/;
function buscarProducto(t) {
  for (const re of PRODUCTO) {
    const m = t.match(re);
    if (!m) continue;
    const v = m[1].replace(CORTE, '').replace(/^(el|la|los|las|un|una)\s+/, '').trim();
    if (v.length >= 3 && !/^(stock|ventas?|caja|deudas?|falta|dinero|plata)$/.test(v)) return v;
  }
  return null;
}

function interpretar(texto, ahora) {
  const t = normalizar(texto);
  const r = (temas, extra) => Object.assign({ texto: t, temas, periodo: periodo(t, ahora), producto: null, deudor: null }, extra);
  if (GRACIAS.test(t)) return r(['gracias']);
  const producto = buscarProducto(t);
  if (producto) return r(['producto'], { producto });
  let temas = TEMAS.map(([n, re]) => [n, t.search(re)]).filter(([, i]) => i >= 0).sort((a, b) => a[1] - b[1]).map(([n]) => n);
  if (temas.includes('top')) temas = temas.filter((x) => x !== 'ventas');
  if (temas.includes('caja') && temas.includes('ventas') && !/factur|cobr|recaud|vend/.test(t)) temas = temas.filter((x) => x !== 'ventas');
  if (temas.includes('resumen') && temas.length > 1) temas = temas.filter((x) => x !== 'resumen');
  if (temas.includes('ayuda') && temas.length > 1) temas = temas.filter((x) => x !== 'ayuda');
  if (temas.includes('compras') && temas.includes('stock')) temas = temas.filter((x) => x !== 'compras');
  let deudor = null;
  if (temas.includes('deudores')) {
    const m = t.match(/\b(?:debe|deben|deuda de|le debe|cuenta de|fiado a|fio a|fiaron a|cuanto debe)\s+(?:el |la |don |dona )?([a-zñ]{3,}(?: [a-zñ]{3,})?)/);
    if (m && !/^(hoy|ayer|plata|total|todos|todo|semana|mes|ano)$/.test(m[1])) deudor = m[1];
  }
  if (!temas.length && SALUDO.test(t)) temas = ['ayuda'];
  // «¿y ayer?», «esta semana»: solo el período, se entiende que sigue hablando de lo vendido
  if (!temas.length && periodo(t, ahora).clave !== 'hoy') temas = ['ventas'];
  return r(temas, { deudor });
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
const MEDIOS = { efectivo: 'Efectivo', debito: 'Débito', credito: 'Crédito', qr: 'QR' };
// Los montos de la base van en centavos
function plata(c) { return '$ ' + String(Math.round((c || 0) / 100)).replace(/\B(?=(\d{3})+(?!\d))/g, '.'); }
function hora(iso) { const x = new Date(new Date(iso).getTime() - UY); return String(x.getUTCHours()).padStart(2, '0') + ':' + String(x.getUTCMinutes()).padStart(2, '0'); }
function n(c, uno, varios) { return c + ' ' + (c === 1 ? uno : varios); }
function primero(nombre) { return String(nombre || '').trim().split(/\s+/)[0] || ''; }
function cant(x, unidad) { const v = Math.round(Number(x) * 1000) / 1000; return String(v).replace('.', ',') + (unidad === 'kg' ? ' kg' : ''); }
function lista(items, fn, max = 8) {
  const v = items.slice(0, max).map(fn);
  if (items.length > max) v.push('…y ' + (items.length - max) + ' más');
  return v.join('\n');
}
function saludo(ahora = Date.now()) {
  const h = new Date(ahora - UY).getUTCHours();
  return h < 6 ? 'Buenas noches' : h < 13 ? 'Buen día' : h < 20 ? 'Buenas tardes' : 'Buenas noches';
}

function responder(p, f, ahora = Date.now()) {
  const quien = primero(f.quien);
  if (p.temas.includes('gracias')) return 'De nada' + (quien ? ', ' + quien : '') + '. Cualquier cosa me preguntás.';
  if (p.producto) return respProducto(p);
  if (!p.temas.length) return 'No te entendí' + (quien ? ', ' + quien : '') + '. ' + ayuda(ahora, true);
  const partes = [];
  for (const t of p.temas) {
    const x = t === 'ayuda' ? ayuda(ahora, false, quien) : t === 'resumen' ? resumen(p, f) : t === 'ventas' ? ventas(p, f)
      : t === 'top' ? top(p, f) : t === 'caja' ? caja(f) : t === 'stock' ? stock(f) : t === 'deudores' ? deudores(p, f)
      : t === 'compras' ? compras(f) : t === 'equipo' ? equipo(f) : '';
    if (x) partes.push(x);
  }
  return partes.join('\n\n');
}

function ayuda(ahora, corto, quien) {
  const ej = '• «¿Cuánto vendí hoy?» (también ayer, esta semana, este mes, un mes por nombre)\n• «¿Cómo está la caja?»\n• «¿Qué falta reponer?»\n• «¿Cuánto stock hay de arroz?»\n• «¿Quién debe?» o «¿Cuánto debe Ana?»\n• «¿Qué se vendió más?»\n• «¿Cómo vamos?» para un resumen';
  if (corto) return 'Probá con algo como:\n' + ej;
  return saludo(ahora) + (quien ? ' ' + quien : '') + '. Soy el asistente de La Estrella. Me podés preguntar, por escrito o con un audio:\n' + ej;
}

function ventas(p, f) {
  const x = f.periodo, nom = p.periodo.nombre;
  if (!x.tickets && !x.tickets_fiado && !x.cobros_deuda_n) return '*' + nom + '* todavía no hay ventas.';
  const l = ['*' + nom + ' se vendió ' + plata(x.ventas) + '* en ' + n(x.tickets, 'ticket', 'tickets') + '.'];
  const medios = Object.entries(x.por_medio || {}).sort((a, b) => b[1] - a[1]);
  if (medios.length) l.push(medios.map(([m, v]) => '• ' + (MEDIOS[m] || m) + ': ' + plata(v)).join('\n'));
  if (x.tickets_fiado) l.push('A cuenta (sin cobrar): ' + plata(x.fiado) + ' en ' + n(x.tickets_fiado, 'ticket', 'tickets') + '.');
  if (x.cobros_deuda_n) l.push('Cobros de deudas: ' + plata(x.cobros_deuda) + ' (' + n(x.cobros_deuda_n, 'pago', 'pagos') + ').');
  if (x.anuladas) l.push('Tickets anulados: ' + x.anuladas + '.');
  return l.join('\n');
}
function top(p, f) {
  const t = f.periodo.top || [];
  if (!t.length) return '*' + p.periodo.nombre + '* todavía no se vendió nada.';
  return '*Lo más vendido (' + p.periodo.nombre.toLowerCase() + '):*\n' + t.map((x, i) => (i + 1) + '. ' + x.nombre + ' — ' + cant(x.cant, x.unidad) + ' (' + plata(x.monto) + ')').join('\n');
}
function caja(f) {
  const c = f.caja;
  if (!c.abierta) {
    const u = c.ultimo;
    return '*La caja está cerrada.*' + (u ? '\nÚltimo cierre: ' + hora(u.cierre) + ' por ' + u.cerro + '. Esperado ' + plata(u.esperado) + ', contado ' + plata(u.contado) + (u.contado === u.esperado ? ' (justo).' : ' (diferencia ' + (u.contado > u.esperado ? '+' : '-') + plata(Math.abs(u.contado - u.esperado)) + ').') : '');
  }
  return '*Caja abierta* por ' + c.abrio + ' desde las ' + hora(c.apertura) + ' (turno ' + c.turno + ').\nEfectivo que tiene que haber: ' + plata(c.efectivo) + '.\nVendido en el turno: ' + plata(c.ventas) + '.';
}
function stock(f) {
  const s = f.stock;
  if (!s.sin_stock_n && !s.bajo_n) return '*Stock:* todo en orden, nada por debajo del mínimo.';
  const l = [];
  if (s.sin_stock_n) l.push('*Sin stock (' + s.sin_stock_n + '):*\n' + lista(s.sin_stock, (x) => '• ' + x, 10) + (s.sin_stock_n > s.sin_stock.length ? '\n…y ' + (s.sin_stock_n - s.sin_stock.length) + ' más' : ''));
  if (s.bajo_n) l.push('*Para reponer (' + s.bajo_n + '):*\n' + lista(s.bajo, (x) => '• ' + x.nombre + ': quedan ' + cant(x.stock, x.unidad) + ' (mínimo ' + cant(x.minimo, x.unidad) + ')', 10) + (s.bajo_n > s.bajo.length ? '\n…y ' + (s.bajo_n - s.bajo.length) + ' más' : ''));
  return l.join('\n\n');
}
function deudores(p, f) {
  const d = f.deudores;
  if (p.deudor) {
    const hallados = d.lista.filter((x) => normalizar(x.nombre).includes(p.deudor));
    if (!hallados.length) return 'No encontré a nadie llamado «' + p.deudor + '» con deuda.';
    return hallados.slice(0, 5).map((x) => '*' + x.nombre + '* debe ' + plata(x.saldo) + (x.limite ? ' (límite ' + plata(x.limite) + ', usa el ' + Math.round(x.saldo * 100 / x.limite) + ' %)' : ' (sin límite)') + '.').join('\n');
  }
  if (!d.n) return '*Deudores:* nadie debe nada.';
  const cerca = d.lista.filter((x) => x.limite > 0 && x.saldo * 10 >= x.limite * 8);
  return '*Deudores:* ' + n(d.n, 'persona debe', 'personas deben') + ' en total ' + plata(d.total) + '.\n' +
    lista(d.lista, (x) => '• ' + x.nombre + ': ' + plata(x.saldo) + (x.limite > 0 && x.saldo >= x.limite ? ' (pasó su límite)' : x.limite > 0 && x.saldo * 10 >= x.limite * 8 ? ' (cerca del límite)' : '')) +
    (cerca.length ? '\n\nCerca o por encima del límite: ' + cerca.length + '.' : '');
}
function compras(f) {
  const c = f.compras;
  if (!c.sin_recibir && !c.sin_pagar) return '*Compras:* no hay nada pendiente.';
  return '*Compras:* ' + n(c.sin_recibir, 'pedido sin recibir', 'pedidos sin recibir') + ' y ' + n(c.sin_pagar, 'compra sin pagar', 'compras sin pagar') + (c.sin_pagar ? ' (' + plata(c.sin_pagar_total) + ')' : '') + '.';
}
function equipo(f) {
  const t = f.trabajando || [];
  return t.length ? '*Trabajando ahora:*\n' + t.map((x) => '• ' + x.nombre + ' (desde las ' + hora(x.desde) + ')').join('\n') : 'Ahora no hay nadie con la jornada abierta.';
}
function respProducto(p) {
  if (p.fallo) return 'No pude buscar el producto. Probá de nuevo en un rato.';
  const e = p.encontrados || [];
  if (!e.length) return 'No encontré ningún producto que se parezca a «' + p.producto + '».';
  return e.map((x) => '*' + x.nombre + '*: ' + plata(x.precio) + (x.unidad === 'kg' ? ' el kg' : '') + ', hay ' + cant(x.stock, x.unidad) + (x.stock <= 0 ? ' (sin stock)' : x.stock < x.minimo ? ' (por debajo del mínimo)' : '') + '.').join('\n');
}
function resumen(p, f) {
  const x = f.periodo, c = f.caja, s = f.stock, d = f.deudores;
  const l = ['*Resumen: ' + p.periodo.nombre.toLowerCase() + '*', 'Vendido: ' + plata(x.ventas) + ' en ' + n(x.tickets, 'ticket', 'tickets') + (x.tickets_fiado ? ' (más ' + plata(x.fiado) + ' a cuenta)' : '') + '.'];
  l.push(c.abierta ? 'Caja abierta: efectivo ' + plata(c.efectivo) + '.' : 'Caja cerrada.');
  l.push(s.sin_stock_n || s.bajo_n ? 'Stock: ' + n(s.sin_stock_n, 'producto sin stock', 'productos sin stock') + ' y ' + n(s.bajo_n, 'por reponer', 'por reponer') + '.' : 'Stock en orden.');
  l.push(d.n ? 'Deudores: ' + plata(d.total) + ' entre ' + n(d.n, 'persona', 'personas') + '.' : 'Nadie debe nada.');
  return l.join('\n');
}

/* ============================================================
   2) AVISOS A DEUDORES
   ============================================================ */
async function recibirAviso(pedido, env, ctx) {
  if (pedido.method !== 'POST') return new Response('No', { status: 405 });
  let b; try { b = await pedido.json(); } catch (e) { b = null; }
  const id = b && Number(b.aviso);
  if (!Number.isInteger(id) || id <= 0) return new Response('No', { status: 400 });
  const tarea = enviarAviso(env, id).catch((e) => console.error('aviso:', e));
  if (ctx && ctx.waitUntil) ctx.waitUntil(tarea); else await tarea;
  return new Response('ok');
}

async function enviarAviso(env, id) {
  if (!env.WHATSAPP_TOKEN || !env.WHATSAPP_NUMERO_ID || !env.WHATSAPP_PLANTILLA || !env.SERVICIO_CLAVE) {
    return console.error('aviso: falta configurar WhatsApp en Cloudflare (WHATSAPP_TOKEN, WHATSAPP_NUMERO_ID, WHATSAPP_PLANTILLA, SERVICIO_CLAVE)');
  }
  const a = await rpc(env, 'servicio_aviso', { p_clave: env.SERVICIO_CLAVE, p_id: id });
  if (!a) return; // ya enviado, ya tomado o no existe
  const para = telefono(a.telefono);
  if (!para) return resultado(env, id, 'error', 'El deudor no tiene teléfono cargado');
  try {
    const r = await mandar(env, env.WHATSAPP_NUMERO_ID, {
      to: para, type: 'template',
      template: { name: env.WHATSAPP_PLANTILLA, language: { code: env.WHATSAPP_PLANTILLA_IDIOMA || 'es' },
        components: [{ type: 'body', parameters: [{ type: 'text', text: String(a.mensaje).replace(/\s+/g, ' ').trim() }] }] }
    });
    if (r.ok) return resultado(env, id, 'enviado', 'Enviado por WhatsApp');
    const j = await r.json().catch(() => ({}));
    return resultado(env, id, 'error', String((j && j.error && j.error.message) || r.status));
  } catch (e) {
    return resultado(env, id, 'error', String(e.message || e));
  }
}
