/* Prueba el servidor de punta a punta, sin Cloudflare ni Bamboo de verdad:
   un KV de mentira y un fetch de mentira que hace de Bamboo. */
import test from "node:test";
import assert from "node:assert/strict";
import worker from "../src/index.js";

function kvFalso() {
  const m = new Map();
  return {
    async get(k) { return m.has(k) ? m.get(k) : null; },
    async put(k, v) { m.set(k, v); },
    async list({ prefix }) { return { keys: [...m.keys()].filter((k) => k.startsWith(prefix)).map((name) => ({ name })) }; }
  };
}
const entorno = () => ({
  BAMBOO_PRIVATE_KEY: "clave-privada", WEBHOOK_CLAVE: "secreto-webhook", ADMIN_CLAVE: "admin",
  SITIO: "https://livo.com.uy/panacea", ORIGENES: "https://livo.com.uy", BAMBOO_ENTORNO: "stage",
  PEDIDOS: kvFalso()
});
const origenBueno = { "Origin": "https://livo.com.uy", "Content-Type": "application/json" };
const ctxFalso = () => { const tareas = []; return { waitUntil: (p) => tareas.push(p), tareas }; };

/* Bamboo de mentira: guarda las llamadas y contesta lo que le digamos */
function bambooFalso(respuestas) {
  const llamadas = [];
  globalThis.fetch = async (url, opciones) => {
    llamadas.push({ url: String(url), opciones });
    for (const [patron, resp] of respuestas) {
      if (String(url).includes(patron) && (!resp.metodo || resp.metodo === (opciones && opciones.method))) {
        return new Response(JSON.stringify(resp.cuerpo), { status: resp.estado || 200 });
      }
    }
    return new Response("{}", { status: 404 });
  };
  return llamadas;
}

const pedidoJson = (extra) => JSON.stringify(Object.assign({
  items: [{ id: "serum-rosas", cantidad: 1, precio: 1 }],
  datos: { nombre: "Ana Pérez", email: "ana@correo.com", telefono: "099 123 456", entrega: "Retiro en Pinamar, Canelones", notas: "" },
  medio: "Santander"
}, extra));

const pedir = (env, ruta, init, ctx) => worker.fetch(new Request("https://pagos.ejemplo.workers.dev" + ruta, init), env, ctx || ctxFalso());

test("crea una transferencia: monto del catálogo, clave en el encabezado, URLs de vuelta", async () => {
  const env = entorno();
  const llamadas = bambooFalso([["/v3/api/Purchase", { metodo: "POST", cuerpo: { Result: "ACTION_REQUIRED", Status: "PENDING", TransactionId: "135845766093616960", Action: { URL: "https://redirect.stage.bamboopayment.com/CA_1" } } }]]);
  const r = await pedir(env, "/api/crear-pago", { method: "POST", headers: origenBueno, body: pedidoJson() });
  assert.equal(r.status, 200);
  const sal = await r.json();
  assert.equal(sal.url, "https://redirect.stage.bamboopayment.com/CA_1");
  assert.match(sal.numero, /^PAN-/);

  const c = llamadas[0];
  assert.equal(c.url, "https://api.stage.bamboopayment.com/v3/api/Purchase");
  assert.equal(c.opciones.headers.Authorization, "Basic clave-privada");
  const cuerpo = JSON.parse(c.opciones.body);
  assert.equal(cuerpo.Amount, 78000, "780 pesos = 78000 centavos, aunque el navegador mandó precio 1");
  assert.equal(cuerpo.PaymentMethod, "SAN");
  assert.equal(cuerpo.Currency, "UYU");
  assert.equal(cuerpo.TargetCountryISO, "UY");
  assert.equal(cuerpo.Customer.Email, "ana@correo.com");
  assert.match(cuerpo.MerchantNotification.Url_Webhook, /\/api\/webhook\?clave=secreto-webhook$/);
  assert.match(cuerpo.Redirection.Url_Approved, /^https:\/\/livo\.com\.uy\/panacea\/gracias\.html\?pedido=PAN-.*&t=.*&r=aprobado$/);
});

test("en producción usa la URL de producción", async () => {
  const env = Object.assign(entorno(), { BAMBOO_ENTORNO: "prod" });
  const llamadas = bambooFalso([["/v3/api/Purchase", { cuerpo: { Action: { URL: "https://x.bamboopayment.com/a" } } }]]);
  await pedir(env, "/api/crear-pago", { method: "POST", headers: origenBueno, body: pedidoJson() });
  assert.equal(llamadas[0].url, "https://api.bamboopayment.com/v3/api/Purchase");
});

test("tarjeta: crea un enlace de pago hospedado", async () => {
  const env = entorno();
  const llamadas = bambooFalso([["h2h.stage.bamboopayment.com/api/v1/payments", { metodo: "POST", cuerpo: { id: "1", paymentUrl: "https://pay.stage.bamboopayment.com/abc" } }]]);
  const r = await pedir(env, "/api/crear-pago", { method: "POST", headers: origenBueno, body: pedidoJson({ medio: "Visa" }) });
  assert.equal(r.status, 200);
  assert.equal((await r.json()).url, "https://pay.stage.bamboopayment.com/abc");
  const cuerpo = JSON.parse(llamadas[0].opciones.body);
  assert.equal(cuerpo.amount, 78000);
  assert.equal(cuerpo.paymentType, "CheckoutPro");
  assert.equal(cuerpo.customer.phoneNumber, "59899123456");
});

test("si Bamboo falla, el cliente ve un error claro y el pedido queda en ERROR", async () => {
  const env = entorno();
  bambooFalso([["/v3/api/Purchase", { cuerpo: { ErrorCode: "PR001" }, estado: 400 }]]);
  const r = await pedir(env, "/api/crear-pago", { method: "POST", headers: origenBueno, body: pedidoJson() });
  assert.equal(r.status, 502);
  assert.match((await r.json()).error, /No pudimos iniciar el pago/);
  const guardados = [...(await env.PEDIDOS.list({ prefix: "pedido:" })).keys];
  assert.equal(JSON.parse(await env.PEDIDOS.get(guardados[0].name)).estado, "ERROR");
});

test("rechaza otros orígenes, medios no disponibles y servidor sin configurar", async () => {
  const env = entorno();
  bambooFalso([]);
  let r = await pedir(env, "/api/crear-pago", { method: "POST", headers: { "Origin": "https://malo.com" }, body: pedidoJson() });
  assert.equal(r.status, 403);
  r = await pedir(env, "/api/crear-pago", { method: "POST", headers: origenBueno, body: pedidoJson({ medio: "Prex" }) });
  assert.equal(r.status, 400);
  r = await pedir(Object.assign(entorno(), { BAMBOO_PRIVATE_KEY: "" }), "/api/crear-pago", { method: "POST", headers: origenBueno, body: pedidoJson() });
  assert.equal(r.status, 503);
});

test("CORS: responde solo al origen autorizado", async () => {
  const env = entorno();
  const bueno = await pedir(env, "/api/salud", { headers: { "Origin": "https://livo.com.uy" } });
  assert.equal(bueno.headers.get("Access-Control-Allow-Origin"), "https://livo.com.uy");
  const malo = await pedir(env, "/api/salud", { headers: { "Origin": "https://malo.com" } });
  assert.equal(malo.headers.get("Access-Control-Allow-Origin"), null);
  const previo = await pedir(env, "/api/crear-pago", { method: "OPTIONS", headers: { "Origin": "https://livo.com.uy" } });
  assert.equal(previo.status, 204);
});

async function crearYAvisar({ monto, estadoAviso, estadoReal }) {
  const env = entorno();
  const respuestas = [["/v3/api/Purchase", { metodo: "POST", cuerpo: { TransactionId: "999", Action: { URL: "https://redirect.stage.bamboopayment.com/z" } } }]];
  if (estadoReal) { respuestas.push(["/v3/api/Purchase/999", { metodo: "GET", cuerpo: { Status: estadoReal, Amount: monto } }]); }
  bambooFalso(respuestas);
  const creado = await (await pedir(env, "/api/crear-pago", { method: "POST", headers: origenBueno, body: pedidoJson() })).json();
  const clave = [...(await env.PEDIDOS.list({ prefix: "pedido:" })).keys][0].name;
  const token = JSON.parse(await env.PEDIDOS.get(clave)).token;
  const ctx = ctxFalso();
  const aviso = JSON.stringify({ Order: creado.numero, TransactionId: 999, TransactionType: "Purchase", Status: estadoAviso, Amount: monto });
  const r = await pedir(env, "/api/webhook?clave=secreto-webhook", { method: "POST", body: aviso }, ctx);
  await Promise.all(ctx.tareas);
  return { env, creado, token, r };
}

test("webhook: un pago aprobado por el monto justo deja el pedido APROBADO", async () => {
  const { env, creado, token, r } = await crearYAvisar({ monto: 78000, estadoAviso: "Approved", estadoReal: "APPROVED" });
  assert.equal(r.status, 200);
  const ver = await pedir(env, "/api/pedido?numero=" + creado.numero + "&t=" + token, {});
  const p = await ver.json();
  assert.equal(p.estado, "APROBADO");
  assert.equal(p.total, 780);
  assert.equal(p.items[0].nombre, "Sérum de Rosas y Aloe Vera");
  assert.equal(p.email, undefined, "no se expone el email");
});

test("webhook: se le cree a Bamboo y no al aviso (aviso 'Approved', real 'Rejected')", async () => {
  const { env, creado, token } = await crearYAvisar({ monto: 78000, estadoAviso: "Approved", estadoReal: "REJECTED" });
  const p = await (await pedir(env, "/api/pedido?numero=" + creado.numero + "&t=" + token, {})).json();
  assert.equal(p.estado, "RECHAZADO");
});

test("webhook: si el monto no coincide, queda REVISAR y no se aprueba", async () => {
  const { env, creado, token } = await crearYAvisar({ monto: 100, estadoAviso: "Approved", estadoReal: "APPROVED" });
  const p = await (await pedir(env, "/api/pedido?numero=" + creado.numero + "&t=" + token, {})).json();
  assert.equal(p.estado, "REVISAR");
});

test("webhook: sin poder verificar con Bamboo, usa el aviso", async () => {
  const { env, creado, token } = await crearYAvisar({ monto: 78000, estadoAviso: "Approved", estadoReal: null });
  const p = await (await pedir(env, "/api/pedido?numero=" + creado.numero + "&t=" + token, {})).json();
  assert.equal(p.estado, "APROBADO");
});

test("webhook: sin la clave correcta no pasa", async () => {
  const env = entorno();
  bambooFalso([]);
  let r = await pedir(env, "/api/webhook?clave=otra", { method: "POST", body: JSON.stringify({ Order: "PAN-1" }) });
  assert.equal(r.status, 401);
  r = await pedir(env, "/api/webhook", { method: "POST", body: JSON.stringify({ Order: "PAN-1" }) });
  assert.equal(r.status, 401);
});

test("el estado de un pedido solo se ve con el token del link de vuelta", async () => {
  const { env, creado } = await crearYAvisar({ monto: 78000, estadoAviso: "Approved", estadoReal: "APPROVED" });
  assert.equal((await pedir(env, "/api/pedido?numero=" + creado.numero, {})).status, 404);
  assert.equal((await pedir(env, "/api/pedido?numero=" + creado.numero + "&t=adivinando", {})).status, 404);
});

test("la lista de pedidos pide la clave de administración", async () => {
  const { env } = await crearYAvisar({ monto: 78000, estadoAviso: "Approved", estadoReal: "APPROVED" });
  assert.equal((await pedir(env, "/api/admin/pedidos", {})).status, 401);
  assert.equal((await pedir(env, "/api/admin/pedidos", { headers: { Authorization: "Bearer mala" } })).status, 401);
  const ok = await pedir(env, "/api/admin/pedidos", { headers: { Authorization: "Bearer admin" } });
  assert.equal(ok.status, 200);
  const lista = (await ok.json()).pedidos;
  assert.equal(lista.length, 1);
  assert.equal(lista[0].datos.email, "ana@correo.com");
});
