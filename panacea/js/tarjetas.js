/* ============================================================
   PANACEA — tarjetas de producto reutilizables (la tienda, los
   productos relacionados y las sugerencias del carrito).
   Tarjetas.html(p) devuelve el marcado; Tarjetas.enlazar(caja) hace
   funcionar el botón "+" (agrega o saca del pedido).
   Necesita productos.js y carrito.js cargados antes.
   ============================================================ */
(function () {
  "use strict";

  var P = window.PANACEA;
  var C = window.Carrito;

  function esc(t) {
    return String(t).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function html(p) {
    var href = P.enlaceProducto(p.id);
    return (
      '<article class="producto" data-id="' + p.id + '" data-cat="' + p.cat + '">' +
        '<a class="producto__enlace" href="' + href + '" tabindex="-1" aria-hidden="true">' +
          '<div class="producto__foto"><img src="' + p.fotos[0].src + '" alt="' + esc(p.fotos[0].alt) + '" loading="lazy"></div>' +
        "</a>" +
        '<div class="producto__datos">' +
          '<p class="producto__cat">' + esc(p.categoria) + "</p>" +
          '<h3><a href="' + href + '">' + esc(p.nombre) + "</a></h3>" +
          '<p class="producto__desc">' + esc(p.desc) + "</p>" +
        "</div>" +
        '<div class="producto__pie">' +
          '<span class="producto__precio">' + P.dinero(p.precio) + "</span>" +
          '<button class="btn-mas" type="button" aria-label="Agregar ' + esc(p.nombre) + ' al pedido"><svg class="icon" aria-hidden="true"><use href="#i-plus"/></svg></button>' +
        "</div>" +
      "</article>"
    );
  }

  /* Los botones "+" de una caja: agregan o sacan del pedido y se mantienen al día.
     Se puede llamar de nuevo después de volver a dibujar la caja. */
  function pintar(caja) {
    Array.prototype.forEach.call(caja.querySelectorAll(".producto"), function (t) {
      var b = t.querySelector(".btn-mas");
      var activo = C.cantidad(t.getAttribute("data-id")) > 0;
      b.setAttribute("aria-pressed", String(activo));
      b.querySelector("use").setAttribute("href", activo ? "#i-check" : "#i-plus");
    });
  }
  var cajas = [];
  function enlazar(caja) {
    if (cajas.indexOf(caja) === -1) {
      cajas.push(caja);
      caja.addEventListener("click", function (e) {
        var b = e.target.closest(".btn-mas");
        if (!b || !caja.contains(b)) { return; }
        var id = b.closest(".producto").getAttribute("data-id");
        if (C.cantidad(id) > 0) { C.quitar(id); } else { C.agregar(id, 1); }
      });
    }
    pintar(caja);
  }
  C.alCambiar(function () { cajas.forEach(pintar); });

  window.Tarjetas = { html: html, enlazar: enlazar };
})();
