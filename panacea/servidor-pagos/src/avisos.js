/* ============================================================
   PANACEA — avisos por email cuando se aprueba un pago (opcional).
   Usa Resend (https://resend.com). Si no están RESEND_API_KEY y EMAIL_DESDE,
   no manda nada y el pedido igual queda guardado (ver /api/admin/pedidos).
   ============================================================ */
import { dinero } from "./logica.js";

async function enviar(env, para, asunto, texto) {
  if (!env.RESEND_API_KEY || !env.EMAIL_DESDE || !para) { return false; }
  const r = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { "Authorization": "Bearer " + env.RESEND_API_KEY, "Content-Type": "application/json" },
    body: JSON.stringify({ from: env.EMAIL_DESDE, to: [para], subject: asunto, text: texto })
  });
  return r.ok;
}

function detalle(p) {
  return p.lineas.map((l) => "• " + l.cantidad + " × " + l.nombre + " (" + dinero(l.precio * l.cantidad) + ")").join("\n");
}

export async function avisarCompra(env, p) {
  const resumen =
    "Pedido " + p.numero + "\n\n" + detalle(p) + "\nTotal: " + dinero(p.total) + "\n\n" +
    "Cliente: " + p.datos.nombre + "\nEmail: " + p.datos.email + "\nTeléfono: " + p.datos.telefono + "\n" +
    "Entrega: " + p.datos.entrega + (p.datos.notas ? "\nNotas: " + p.datos.notas : "") + "\n" +
    "Medio de pago: " + p.medio + "\n";

  /* A Paola: hay una compra nueva */
  await enviar(env, env.EMAIL_PAOLA, "Compra nueva en Panacea — " + p.numero, "Se aprobó un pago.\n\n" + resumen);
  /* Al cliente: la confirmación */
  await enviar(env, p.datos.email, "Tu compra en Panacea — " + p.numero,
    "Gracias por tu compra en Panacea. Recibimos tu pago.\n\n" + resumen +
    "\nPaola se va a comunicar con vos para coordinar la entrega.\n");
}
