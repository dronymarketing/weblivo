/* ============================================================
   PANACEA — conexión con el servidor de pagos.
   Si config.js tiene PANACEA_API, define window.PANACEA.pagoOnline, que
   pago.js usa en el último paso. Si no, no hace nada y el pago queda en
   modo prueba.
   Se carga DESPUÉS de config.js y ANTES de pago.js.
   ============================================================ */
(function () {
  "use strict";

  var P = window.PANACEA;
  var API = String(window.PANACEA_API || "").replace(/\/$/, "");
  if (!API) { return; }

  var ERROR_GENERAL = "No pudimos iniciar el pago. Probá de nuevo en unos minutos.";

  /* Le manda el pedido al servidor, que recalcula los precios y crea el pago en Bamboo.
     Devuelve { url, numero }: la página segura a la que hay que llevar al cliente. */
  P.pagoOnline = function (pedido) {
    var cuerpo = {
      items: pedido.items.map(function (i) { return { id: i.id, cantidad: i.cantidad }; }),
      datos: pedido.datos,
      medio: pedido.medio
    };
    return fetch(API + "/api/crear-pago", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cuerpo)
    }).then(function (r) {
      return r.json().catch(function () { return {}; }).then(function (d) {
        if (!r.ok || !d.url) { throw new Error(d.error || ERROR_GENERAL); }
        return { url: d.url, numero: d.numero };
      });
    }, function () {
      throw new Error("No pudimos conectarnos. Revisá tu internet e intentá de nuevo.");
    });
  };

  /* Prex todavía no está disponible en el proveedor de pagos */
  var prex = document.getElementById("medio-prex");
  if (prex) {
    prex.disabled = true;
    var etiqueta = document.querySelector('label[for="medio-prex"] .medio__nombre');
    if (etiqueta) { etiqueta.textContent = "Prex (pronto)"; }
  }
})();
