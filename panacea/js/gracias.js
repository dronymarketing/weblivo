/* ============================================================
   PANACEA — confirmación de la compra (gracias.html).
   Lee el último pedido que guardó pago.js, lo muestra y vacía el carrito.
   Con pasarela real, al volver del proveedor se consulta el pedido
   a tu servidor; mientras tanto se usa el guardado en el navegador.
   Necesita productos.js y carrito.js cargados antes.
   ============================================================ */
(function () {
  "use strict";

  var P = window.PANACEA;
  var C = window.Carrito;
  var $ = function (s) { return document.getElementById(s); };
  var CLAVE_PEDIDO = "panacea-ultimo-pedido";
  var esPrueba = new URLSearchParams(window.location.search).get("prueba") === "1";

  function esc(t) {
    return String(t).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  var ped = null;
  try { ped = JSON.parse(window.sessionStorage.getItem(CLAVE_PEDIDO) || "null"); } catch (err) { ped = null; }

  if (!ped || !ped.items || !ped.datos) {
    $("g-vacio").hidden = false;
    return;
  }

  $("g-numero").textContent = ped.numero || "";
  $("g-prueba").hidden = !esPrueba;
  $("g-texto").textContent = esPrueba
    ? "Así se vería la confirmación después de pagar. En el sitio real vas a recibir el detalle en " + ped.datos.email + "."
    : "Te enviamos la confirmación de tu compra a " + ped.datos.email + ".";

  $("g-lineas").innerHTML = ped.items.map(function (it) {
    return '<li><span class="mini__nombre">' + it.cantidad + " × " + esc(it.nombre) + "</span><span>" +
      P.dinero(it.precio * it.cantidad) + "</span></li>";
  }).join("");
  $("g-total").textContent = P.dinero(ped.total);

  var d = ped.datos;
  var filas = [["Nombre", d.nombre], ["Email", d.email], ["Teléfono", d.telefono], ["Entrega", d.entrega], ["Medio de pago", ped.medio]];
  if (d.notas) { filas.splice(4, 0, ["Notas", d.notas]); }
  $("g-datos").innerHTML = filas.map(function (f) {
    return "<div><dt>" + esc(f[0]) + "</dt><dd>" + esc(f[1]) + "</dd></div>";
  }).join("");

  $("gracias").hidden = false;

  /* La compra terminó: el carrito se vacía */
  C.vaciar();
})();
