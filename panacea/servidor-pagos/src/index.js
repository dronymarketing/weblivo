/* ============================================================
   PANACEA — servidor de pagos (Cloudflare Worker).

   Rutas:
     GET  /api/salud               ¿está vivo y configurado?
     POST /api/crear-pago          crea el pedido y la compra en Bamboo → { url }
     POST /api/webhook?clave=…     aviso de Bamboo con el resultado del pago
     GET  /api/pedido?numero=&t=   estado de un pedido (lo usa gracias.html)
     GET  /api/admin/pedidos       lista de pedidos (con Authorization: Bearer ADMIN_CLAVE)

   Secretos (wrangler secret put): BAMBOO_PRIVATE_KEY, WEBHOOK_CLAVE, ADMIN_CLAVE,
   y opcionales RESEND_API_KEY. Variables: ver wrangler.toml. Guía completa en README.md.
   ============================================================ */
import { validarPedido, nuevoNumero, mapearEstado, buscarUrl, aCentavos } from "./logica.js";
import { crearTransferencia, crearEnlaceDePago, consultarCompra } from "./bamboo.js";
import { avisarCompra } from "./avisos.js";

const VIGENCIA = 60 * 60 * 24 * 60; /* los pedidos se guardan 60 días */
const MAX_CUERPO = 20000;

function origenes(env) {
  return String(env.ORIGENES || "").split(",").map((s) => s.trim()).filter(Boolean);
}
function cabecerasCors(request, env) {
  const origen = request.headers.get("Origin");
  if (origen && origenes(env).includes(origen)) {
    return {
      "Access-Control-Allow-Origin": origen,
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Vary": "Origin"
    };
  }
  return { "Vary": "Origin" };
}
function json(datos, estado, extra) {
  return new Response(JSON.stringify(datos), {
    status: estado || 200,
    headers: Object.assign({ "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" }, extra || {})
  });
}
async function leerJson(request) {
  const texto = await request.text();
  if (texto.length > MAX_CUERPO) { return null; }
  try { return JSON.parse(texto); } catch (err) { return null; }
}
function claveDe(numero) { return "pedido:" + numero; }
async function leerPedido(env, numero) {
  const t = await env.PEDIDOS.get(claveDe(numero));
  return t ? JSON.parse(t) : null;
}
async function guardarPedido(env, p) {
  await env.PEDIDOS.put(claveDe(p.numero), JSON.stringify(p), { expirationTtl: VIGENCIA });
}
/* Compara en tiempo constante para no filtrar la clave por el tiempo de respuesta */
function iguales(a, b) {
  a = String(a || ""); b = String(b || "");
  if (!a || a.length !== b.length) { return false; }
  let r = 0;
  for (let i = 0; i < a.length; i++) { r |= a.charCodeAt(i) ^ b.charCodeAt(i); }
  return r === 0;
}

/* ---------- POST /api/crear-pago ---------- */
async function crearPago(request, env, cors) {
  const origen = request.headers.get("Origin");
  if (!origen || !origenes(env).includes(origen)) { return json({ error: "Origen no permitido." }, 403, cors); }
  if (!env.BAMBOO_PRIVATE_KEY || !env.WEBHOOK_CLAVE) {
    return json({ error: "El pago online todavía no está configurado." }, 503, cors);
  }

  const entrada = await leerJson(request);
  const v = validarPedido(entrada);
  if (!v.ok) { return json({ error: v.error }, 400, cors); }

  const numero = nuevoNumero();
  const token = crypto.randomUUID();
  const pedido = Object.assign({}, v.pedido, {
    numero, token, estado: "CREADO", creado: new Date().toISOString(), idTransaccion: null
  });
  await guardarPedido(env, pedido);

  const origenServidor = new URL(request.url).origin;
  const ctx = {
    urlWebhook: origenServidor + "/api/webhook?clave=" + encodeURIComponent(env.WEBHOOK_CLAVE),
    urlVuelta: env.SITIO + "/gracias.html?pedido=" + numero + "&t=" + token
  };

  let r;
  try {
    r = pedido.grupo === "transferencia"
      ? await crearTransferencia(env, pedido, ctx)
      : await crearEnlaceDePago(env, pedido, ctx, buscarUrl);
  } catch (err) {
    r = { ok: false, detalle: { error: String(err && err.message) } };
  }

  if (!r.ok) {
    console.error("Bamboo no creó el pago", numero, JSON.stringify(r.detalle));
    pedido.estado = "ERROR";
    await guardarPedido(env, pedido);
    return json({ error: "No pudimos iniciar el pago. Probá de nuevo en unos minutos." }, 502, cors);
  }

  pedido.estado = "PENDIENTE";
  pedido.idTransaccion = r.idTransaccion;
  await guardarPedido(env, pedido);
  return json({ url: r.url, numero }, 200, cors);
}

/* ---------- POST /api/webhook ---------- */
async function webhook(request, env, ctx) {
  const url = new URL(request.url);
  if (!env.WEBHOOK_CLAVE || !iguales(url.searchParams.get("clave"), env.WEBHOOK_CLAVE)) {
    return new Response("clave inválida", { status: 401 });
  }
  const aviso = await leerJson(request);
  if (!aviso || !aviso.Order) { return new Response("sin datos", { status: 400 }); }
  if (/refund/i.test(String(aviso.TransactionType || ""))) { return new Response("ok", { status: 200 }); }

  const pedido = await leerPedido(env, String(aviso.Order));
  if (!pedido) { console.error("Aviso de un pedido que no existe", aviso.Order); return new Response("ok", { status: 200 }); }
  if (pedido.estado === "APROBADO") { return new Response("ok", { status: 200 }); }

  /* Se le pregunta a Bamboo el estado real; si no se puede, se usa el del aviso (la clave
     del enlace de este webhook solo la conoce Bamboo). */
  let estado = mapearEstado(aviso.Status);
  let monto = aviso.Amount;
  if (aviso.TransactionId) {
    const real = await consultarCompra(env, aviso.TransactionId);
    if (real && real.Status) {
      estado = mapearEstado(real.Status) || estado;
      if (real.Amount != null) { monto = real.Amount; }
    } else {
      console.error("No se pudo verificar con Bamboo; se usa el aviso", aviso.TransactionId);
    }
  }
  if (!estado) { return new Response("ok", { status: 200 }); }

  /* Un pago aprobado tiene que ser por el monto del pedido */
  if (estado === "APROBADO" && Number(monto) !== aCentavos(pedido.total)) {
    console.error("Monto distinto al del pedido", pedido.numero, monto, aCentavos(pedido.total));
    estado = "REVISAR";
  }

  pedido.estado = estado;
  pedido.idTransaccion = String(aviso.TransactionId || pedido.idTransaccion || "");
  pedido.actualizado = new Date().toISOString();
  await guardarPedido(env, pedido);

  if (estado === "APROBADO") { ctx.waitUntil(avisarCompra(env, pedido)); }
  return new Response("ok", { status: 200 });
}

/* ---------- GET /api/pedido ---------- */
async function verPedido(request, env, cors) {
  const url = new URL(request.url);
  const numero = String(url.searchParams.get("numero") || "");
  const pedido = numero ? await leerPedido(env, numero) : null;
  if (!pedido || !iguales(pedido.token, url.searchParams.get("t"))) {
    return json({ error: "No encontramos ese pedido." }, 404, cors);
  }
  /* Sin datos personales: lo ve quien tiene el link de vuelta */
  return json({
    numero: pedido.numero,
    estado: pedido.estado,
    total: pedido.total,
    medio: pedido.medio,
    items: pedido.lineas.map((l) => ({ nombre: l.nombre, cantidad: l.cantidad, precio: l.precio }))
  }, 200, cors);
}

/* ---------- GET /api/admin/pedidos ---------- */
async function listarPedidos(request, env) {
  const auth = request.headers.get("Authorization") || "";
  if (!env.ADMIN_CLAVE || !iguales(auth, "Bearer " + env.ADMIN_CLAVE)) {
    return new Response("no autorizado", { status: 401 });
  }
  const lista = await env.PEDIDOS.list({ prefix: "pedido:", limit: 100 });
  const pedidos = [];
  for (const k of lista.keys) {
    const t = await env.PEDIDOS.get(k.name);
    if (t) { pedidos.push(JSON.parse(t)); }
  }
  pedidos.sort((a, b) => String(b.creado).localeCompare(String(a.creado)));
  return json({ pedidos });
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const cors = cabecerasCors(request, env);

    if (request.method === "OPTIONS") { return new Response(null, { status: 204, headers: cors }); }

    if (url.pathname === "/api/salud" && request.method === "GET") {
      return json({ ok: true, entorno: env.BAMBOO_ENTORNO === "prod" ? "prod" : "stage", configurado: !!env.BAMBOO_PRIVATE_KEY }, 200, cors);
    }
    if (url.pathname === "/api/crear-pago" && request.method === "POST") { return crearPago(request, env, cors); }
    if (url.pathname === "/api/webhook" && request.method === "POST") { return webhook(request, env, ctx); }
    if (url.pathname === "/api/pedido" && request.method === "GET") { return verPedido(request, env, cors); }
    if (url.pathname === "/api/admin/pedidos" && request.method === "GET") { return listarPedidos(request, env); }

    return json({ error: "No existe." }, 404, cors);
  }
};
