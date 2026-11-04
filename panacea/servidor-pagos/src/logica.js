/* ============================================================
   PANACEA — lógica pura del servidor de pagos (sin Cloudflare ni red),
   para poder probarla con `npm test`.

   IMPORTANTE: los precios SALEN DE ACÁ, nunca del navegador. Un cliente
   podría mandar cualquier precio, así que el servidor recalcula el total.
   Este catálogo tiene que coincidir con js/productos.js: el test
   test/catalogo.test.mjs avisa si se desfasan.
   ============================================================ */

export const CATALOGO = {
  "serum-rosas":       { nombre: "Sérum de Rosas y Aloe Vera",         precio: 780 },
  "crema-calendula":   { nombre: "Crema de Caléndula y Rosa Mosqueta", precio: 620 },
  "protector-solar":   { nombre: "Protector Solar Natural",            precio: 890 },
  "gel-post-solar":    { nombre: "Gel Post-Solar de Aloe Vera",        precio: 550 },
  "te-manzanilla":     { nombre: "Té Relax de Manzanilla y Melisa",    precio: 250 },
  "te-digestivo":      { nombre: "Té Digestivo de Boldo y Menta",      precio: 250 },
  "tintura-calendula": { nombre: "Tintura Madre de Caléndula",         precio: 480 }
};

/* Medios que ofrece pago.html → cómo se pagan.
   grupo "transferencia": se paga con la API de compras de Bamboo (PaymentMethod = codigo).
   grupo "tarjeta": se paga en la página de pago hospedada por Bamboo (enlace de pago).
   Prex NO está: la documentación de Bamboo no lo confirma como medio del modelo Gateway. */
export const MEDIOS = {
  "Banco República": { grupo: "transferencia", codigo: "BRO" },
  "Santander":       { grupo: "transferencia", codigo: "SAN" },
  "Itaú":            { grupo: "transferencia", codigo: "ITA" },
  "BBVA":            { grupo: "transferencia", codigo: "BBV" },
  "Scotiabank":      { grupo: "transferencia", codigo: "SCO" },
  "Visa":            { grupo: "tarjeta" },
  "Mastercard":      { grupo: "tarjeta" },
  "OCA":             { grupo: "tarjeta" },
  "Passcard":        { grupo: "tarjeta" },
  "CABAL":           { grupo: "tarjeta" }
};

export const ENTREGAS = ["Retiro en Pinamar, Canelones", "Envío (a coordinar)"];

/* Texto sin caracteres de control y con largo máximo */
export function limpiar(t, max) {
  return String(t == null ? "" : t).replace(/[\u0000-\u001f\u007f]/g, " ").replace(/\s+/g, " ").trim().slice(0, max);
}

/* Pesos → minor units (centavos): 780 → 78000. Bamboo pide "dos decimales, sin separadores". */
export function aCentavos(pesos) {
  return Math.round(pesos * 100);
}

/* "Ana María Pérez" → { nombre: "Ana", apellido: "María Pérez" } */
export function partirNombre(completo) {
  const partes = limpiar(completo, 80).split(" ");
  return { nombre: partes[0] || "", apellido: partes.slice(1).join(" ") };
}

/* Teléfono uruguayo → solo dígitos. conPais: agrega 598 y saca el 0 inicial (099… → 59899…) */
export function telefono(t, conPais) {
  let d = String(t || "").replace(/\D/g, "");
  if (conPais && !d.startsWith("598")) { d = "598" + d.replace(/^0/, ""); }
  return d;
}

/* Valida lo que manda el navegador y arma el pedido con los PRECIOS DEL CATÁLOGO */
export function validarPedido(entrada) {
  const e = entrada && typeof entrada === "object" ? entrada : {};

  if (!Array.isArray(e.items) || e.items.length < 1 || e.items.length > 20) {
    return { ok: false, error: "El pedido no tiene productos." };
  }
  const vistos = new Set();
  const lineas = [];
  for (const it of e.items) {
    const id = it && it.id;
    const cantidad = Number(it && it.cantidad);
    if (!Object.prototype.hasOwnProperty.call(CATALOGO, id) || vistos.has(id)) {
      return { ok: false, error: "Hay un producto que no existe." };
    }
    if (!Number.isInteger(cantidad) || cantidad < 1 || cantidad > 99) {
      return { ok: false, error: "Hay una cantidad que no es válida." };
    }
    vistos.add(id);
    lineas.push({ id, nombre: CATALOGO[id].nombre, precio: CATALOGO[id].precio, cantidad });
  }

  const d = e.datos && typeof e.datos === "object" ? e.datos : {};
  const datos = {
    nombre: limpiar(d.nombre, 80),
    email: limpiar(d.email, 120).toLowerCase(),
    telefono: limpiar(d.telefono, 30),
    entrega: limpiar(d.entrega, 60),
    notas: limpiar(d.notas, 500)
  };
  if (datos.nombre.length < 2) { return { ok: false, error: "Falta el nombre." }; }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(datos.email)) { return { ok: false, error: "El email no es válido." }; }
  if (telefono(datos.telefono).length < 8 || telefono(datos.telefono).length > 15) { return { ok: false, error: "El teléfono no es válido." }; }
  if (!ENTREGAS.includes(datos.entrega)) { return { ok: false, error: "Falta elegir cómo recibís el pedido." }; }

  const medio = limpiar(e.medio, 40);
  if (!Object.prototype.hasOwnProperty.call(MEDIOS, medio)) {
    return { ok: false, error: "Ese medio de pago todavía no está disponible." };
  }

  const total = lineas.reduce((s, l) => s + l.precio * l.cantidad, 0);
  return { ok: true, pedido: { lineas, total, datos, medio, grupo: MEDIOS[medio].grupo, codigo: MEDIOS[medio].codigo || null } };
}

/* Estado de Bamboo (texto libre, con distintas mayúsculas) → estado de Panacea */
export function mapearEstado(texto) {
  const t = String(texto || "").toLowerCase();
  if (/approved|aprobad|completed/.test(t)) { return "APROBADO"; }
  if (/reject|rechaz|declin|denied/.test(t)) { return "RECHAZADO"; }
  if (/cancel|expir/.test(t)) { return "CANCELADO"; }
  if (/pending|pendiente|action_required/.test(t)) { return "PENDIENTE"; }
  return null;
}

/* La respuesta del enlace de pago de Bamboo no tiene la URL documentada:
   se busca la primera URL https cuyo campo se llame url/link (sin tocar las de notificación). */
export function buscarUrl(obj, profundidad = 0) {
  if (!obj || typeof obj !== "object" || profundidad > 4) { return null; }
  for (const [k, v] of Object.entries(obj)) {
    if (typeof v === "string" && /^https:\/\//i.test(v) && /url|link/i.test(k) && !/notif|webhook|result|redirect/i.test(k)) { return v; }
  }
  for (const v of Object.values(obj)) {
    if (v && typeof v === "object") {
      const r = buscarUrl(v, profundidad + 1);
      if (r) { return r; }
    }
  }
  return null;
}

/* Número de pedido legible, ej. "PAN-M3K9Z2A" (hora en base 36 + 3 caracteres al azar) */
export function nuevoNumero() {
  const azar = Array.from(crypto.getRandomValues(new Uint8Array(3)), (b) => (b % 36).toString(36)).join("");
  return ("PAN-" + Date.now().toString(36) + azar).toUpperCase();
}

/* Pesos con punto de miles: 1560 → "$1.560" */
export function dinero(n) {
  return "$" + Math.round(n).toLocaleString("es-UY");
}
