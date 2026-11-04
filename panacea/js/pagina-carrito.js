/* ============================================================
   PANACEA — página del carrito (carrito.html).
   Necesita productos.js y carrito.js cargados antes.
   ============================================================ */
(function () {
  "use strict";

  var P = window.PANACEA;
  var C = window.Carrito;
  var $ = function (s) { return document.getElementById(s); };

  var lista = $("lineas");
  var dibujados = ""; /* ids que están dibujados, para saber si hay que redibujar */

  function esc(t) {
    return String(t).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function textoPrecio(prod, n) {
    return prod.precio ? P.dinero(prod.precio * n) : "Consultar";
  }

  function dibujarLineas() {
    lista.innerHTML = "";
    C.items().forEach(function (it) {
      var p = it.producto;
      var href = P.enlaceProducto(p.id);
      var li = document.createElement("li");
      li.className = "linea";
      li.setAttribute("data-id", p.id);
      li.innerHTML =
        '<a class="linea__foto" href="' + href + '" tabindex="-1" aria-hidden="true"><img src="' + p.fotos[0].src + '" alt="" loading="lazy"></a>' +
        '<div class="linea__datos">' +
          '<p class="linea__cat">' + esc(p.categoria) + "</p>" +
          '<h3><a href="' + href + '">' + esc(p.nombre) + "</a></h3>" +
          '<p class="linea__unit">' + (p.precio ? P.dinero(p.precio) + " c/u" : "Precio a consultar") + "</p>" +
        "</div>" +
        '<div class="cantidad" data-cantidad>' +
          '<button class="cantidad__btn" type="button" data-menos aria-label="Quitar una unidad de ' + esc(p.nombre) + '"><svg class="icon" aria-hidden="true"><use href="#i-minus"/></svg></button>' +
          '<input class="cantidad__valor" type="number" inputmode="numeric" min="1" max="99" value="' + it.cantidad + '" aria-label="Cantidad de ' + esc(p.nombre) + '">' +
          '<button class="cantidad__btn" type="button" data-mas aria-label="Sumar una unidad de ' + esc(p.nombre) + '"><svg class="icon" aria-hidden="true"><use href="#i-plus"/></svg></button>' +
        "</div>" +
        '<p class="linea__subtotal" data-subtotal>' + textoPrecio(p, it.cantidad) + "</p>" +
        '<button class="linea__quitar" type="button" aria-label="Quitar ' + esc(p.nombre) + ' del pedido"><svg class="icon" aria-hidden="true"><use href="#i-trash"/></svg></button>';

      C.enlazarCantidad(li.querySelector("[data-cantidad]"), function (n) { C.fijar(p.id, n); });
      li.querySelector(".linea__quitar").addEventListener("click", function () { C.quitar(p.id); });
      lista.appendChild(li);
    });
    dibujados = C.items().map(function (it) { return it.id; }).join(",");
  }

  function actualizarTotales() {
    var items = C.items();
    $("r-unidades").textContent = String(C.unidades());
    $("r-subtotal").textContent = P.dinero(C.total());
    $("r-total").textContent = P.dinero(C.total());

    var aviso = $("r-aviso");
    var consultar = C.aConsultar();
    if (consultar) {
      aviso.querySelector("span").textContent =
        (consultar === 1 ? "1 producto es a consultar" : consultar + " productos son a consultar") +
        ": no suma al total y se confirma por WhatsApp. El pago online queda para cuando el pedido tenga solo productos con precio.";
      aviso.hidden = false;
    } else {
      aviso.hidden = true;
    }

    var pagar = $("r-pagar");
    var bloqueado = consultar > 0 || C.total() === 0;
    pagar.setAttribute("aria-disabled", String(bloqueado));
    pagar.classList.toggle("boton--apagado", bloqueado);
    pagar.tabIndex = bloqueado ? -1 : 0;

    $("r-wsp").href = C.enlaceWhatsApp();

    /* Subtotales de cada línea, sin redibujar (así no se pierde el foco) */
    items.forEach(function (it) {
      var li = lista.querySelector('[data-id="' + it.id + '"]');
      if (!li) { return; }
      li.querySelector("[data-subtotal]").textContent = textoPrecio(it.producto, it.cantidad);
      var input = li.querySelector("input");
      if (Number(input.value) !== it.cantidad) { input.value = String(it.cantidad); }
    });
  }

  function pintar() {
    var ids = C.items().map(function (it) { return it.id; }).join(",");
    var hayItems = C.lineas() > 0;
    $("vacio").hidden = hayItems;
    $("resumen").hidden = !hayItems;
    lista.hidden = !hayItems;
    if (ids !== dibujados) { dibujarLineas(); }
    if (hayItems) { actualizarTotales(); }
  }

  /* El botón de pago apagado no debe navegar */
  $("r-pagar").addEventListener("click", function (e) {
    if ($("r-pagar").getAttribute("aria-disabled") === "true") { e.preventDefault(); }
  });

  C.alCambiar(pintar);
  pintar();
})();
