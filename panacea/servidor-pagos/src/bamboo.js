/* ============================================================
   PANACEA — llamadas a Bamboo Payment. Todo lo que depende de la
   API de Bamboo está acá, para ajustarlo en un solo lugar cuando se
   confirme con Bamboo lo que la documentación no aclara.

   Qué está CONFIRMADO en la documentación y qué NO, en el README
   ("Lo que hay que confirmar con Bamboo").
   ============================================================ */
import { aCentavos, partirNombre, telefono } from "./logica.js";

const URL_COMPRAS = {
  stage: "https://api.stage.bamboopayment.com/v3/api/Purchase",
  prod: "https://api.bamboopayment.com/v3/api/Purchase"
};
const URL_ENLACE = {
  stage: "https://h2h.stage.bamboopayment.com/api/v1/payments",
  prod: "https://h2h.bamboopayment.com/api/v1/payments"
};

function entorno(env) {
  return env.BAMBOO_ENTORNO === "prod" ? "prod" : "stage";
}

/* Encabezados: la documentación dice "Authorization: Basic {{Merchant Private Key}}" */
function encabezados(env) {
  return {
    "Content-Type": "application/json",
    "Authorization": "Basic " + env.BAMBOO_PRIVATE_KEY,
    "lang": "es"
  };
}

async function llamar(url, opciones) {
  const r = await fetch(url, opciones);
  let cuerpo = null;
  try { cuerpo = await r.json(); } catch (err) { cuerpo = null; }
  return { ok: r.ok, estado: r.status, cuerpo };
}

/* ---------- Transferencia bancaria (API de compras, documentada) ----------
   Devuelve { url, idTransaccion }: el cliente va a Action.URL a autorizar la
   transferencia en el home banking de su banco. */
export async function crearTransferencia(env, pedido, ctx) {
  const { nombre, apellido } = partirNombre(pedido.datos.nombre);
  const cuerpo = {
    PaymentMethod: pedido.codigo,
    Order: pedido.numero,
    UniqueID: pedido.numero,
    Amount: aCentavos(pedido.total),
    Description: "Pedido " + pedido.numero + " Panacea",
    Currency: "UYU",
    TargetCountryISO: "UY",
    Customer: {
      Email: pedido.datos.email,
      FirstName: nombre,
      LastName: apellido || undefined,
      PhoneNumber: telefono(pedido.datos.telefono)
    },
    MetaDataIn: { PaymentExpirationInMinutes: 60 },
    MerchantNotification: { Url_Webhook: ctx.urlWebhook },
    Redirection: {
      Url_Approved: ctx.urlVuelta + "&r=aprobado",
      Url_Rejected: ctx.urlVuelta + "&r=rechazado",
      Url_Canceled: ctx.urlVuelta + "&r=cancelado"
    }
  };
  const r = await llamar(URL_COMPRAS[entorno(env)], {
    method: "POST", headers: encabezados(env), body: JSON.stringify(cuerpo)
  });
  const url = r.cuerpo && r.cuerpo.Action && r.cuerpo.Action.URL;
  if (!r.ok || !url) {
    return { ok: false, detalle: { estado: r.estado, codigo: r.cuerpo && r.cuerpo.ErrorCode, descripcion: r.cuerpo && r.cuerpo.ErrorDescription } };
  }
  return { ok: true, url, idTransaccion: r.cuerpo.TransactionId || null };
}

/* ---------- Tarjetas: enlace de pago hospedado por Bamboo ("CheckoutPro") ----------
   La página de Bamboo pide los datos de la tarjeta (así Panacea nunca los toca).
   OJO: la documentación pública no muestra la respuesta ni la autenticación de este
   endpoint; se usa la misma que la API de compras y se busca la URL en la respuesta. */
export async function crearEnlaceDePago(env, pedido, ctx, buscarUrl) {
  const { nombre, apellido } = partirNombre(pedido.datos.nombre);
  const cuerpo = {
    amount: aCentavos(pedido.total),
    currencyCode: "UYU",
    paymentType: "CheckoutPro",
    orderNumber: pedido.numero,
    validForMinutes: 30,
    notificationUrl: ctx.urlWebhook,
    AllowUsePreregisteredCards: false,
    OnSuccessResultUrl: ctx.urlVuelta + "&r=aprobado",
    OnErrorResultUrl: ctx.urlVuelta + "&r=rechazado",
    OnCancelResultUrl: ctx.urlVuelta + "&r=cancelado",
    customer: {
      identifier: pedido.datos.email,
      Email: pedido.datos.email,
      firstName: nombre,
      lastName: apellido || undefined,
      phoneNumber: telefono(pedido.datos.telefono, true)
    }
  };
  const r = await llamar(URL_ENLACE[entorno(env)], {
    method: "POST", headers: encabezados(env), body: JSON.stringify(cuerpo)
  });
  const url = buscarUrl(r.cuerpo);
  if (!r.ok || !url) {
    return { ok: false, detalle: { estado: r.estado, claves: r.cuerpo ? Object.keys(r.cuerpo) : [] } };
  }
  return { ok: true, url, idTransaccion: null };
}

/* ---------- Consultar una compra (para no creerle ciegamente al aviso) ----------
   Se prueba la ruta de la API v3 y, si no existe, la que muestra la documentación
   en el campo "Url" de la respuesta. Devuelve el cuerpo o null. */
export async function consultarCompra(env, idTransaccion) {
  const base = URL_COMPRAS[entorno(env)];
  const alternativa = base.replace("/v3/api/Purchase", "/Purchase");
  for (const url of [base + "/" + idTransaccion, alternativa + "/" + idTransaccion]) {
    try {
      const r = await llamar(url, { method: "GET", headers: encabezados(env) });
      if (r.ok && r.cuerpo) { return r.cuerpo; }
    } catch (err) { /* se prueba la siguiente */ }
  }
  return null;
}
