/* ============================================================
   PANACEA — lo propio de la home: pestañas de productos, botón "+"
   (agrega al carrito) y fotos que rotan.
   Necesita productos.js y carrito.js cargados antes.
   ============================================================ */
(function () {
  "use strict";

  /* ---------- Pestañas de productos ---------- */
  var tabs = Array.prototype.slice.call(document.querySelectorAll(".tab"));
  var tarjetas = Array.prototype.slice.call(document.querySelectorAll(".producto"));
  var lista = document.getElementById("lista-productos");

  function mostrarCategoria(cat) {
    tabs.forEach(function (t) {
      t.setAttribute("aria-selected", String(t.getAttribute("data-cat") === cat));
    });
    var n = 0;
    tarjetas.forEach(function (p) {
      var coincide = p.getAttribute("data-cat") === cat;
      p.hidden = !coincide;
      if (coincide) {
        p.style.setProperty("--i", n++);
        p.classList.add("visto");
      }
    });
    if (lista) { lista.scrollLeft = 0; }
  }
  tabs.forEach(function (t) {
    t.addEventListener("click", function () { mostrarCategoria(t.getAttribute("data-cat")); });
  });
  if (tabs.length) { mostrarCategoria("piel"); }

  /* ---------- Botón "+": agrega o saca el producto del carrito ---------- */
  function pintarBoton(tarjeta) {
    var b = tarjeta.querySelector(".btn-mas");
    var activo = window.Carrito.cantidad(tarjeta.getAttribute("data-id")) > 0;
    b.setAttribute("aria-pressed", String(activo));
    b.querySelector("use").setAttribute("href", activo ? "#i-check" : "#i-plus");
  }
  function pintarTodos() { tarjetas.forEach(pintarBoton); }

  tarjetas.forEach(function (t) {
    t.querySelector(".btn-mas").addEventListener("click", function () {
      var id = t.getAttribute("data-id");
      if (window.Carrito.cantidad(id) > 0) { window.Carrito.quitar(id); } else { window.Carrito.agregar(id, 1); }
    });
  });
  window.Carrito.alCambiar(pintarTodos);
  pintarTodos();

  /* ---------- Fotos que rotan (producto con varias fotos) ----------
     Cambian solas cada data-rotar ms, con fundido. Se pausan si la tarjeta
     no está a la vista o la pestaña está en segundo plano. */
  var sinMovimiento = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.querySelectorAll(".producto__foto--rotativa").forEach(function (caja) {
    var fotos = Array.prototype.slice.call(caja.querySelectorAll("img"));
    if (fotos.length < 2 || sinMovimiento) { return; }

    var ms = parseInt(caja.getAttribute("data-rotar"), 10) || 3500;
    var actual = 0;
    var visible = true;
    var puntos = document.createElement("div");
    puntos.className = "producto__puntos";
    puntos.setAttribute("aria-hidden", "true");
    fotos.forEach(function () { puntos.appendChild(document.createElement("span")); });
    caja.appendChild(puntos);

    function mostrar(i) {
      actual = i;
      fotos.forEach(function (f, n) {
        f.classList.toggle("activa", n === i);
        f.setAttribute("aria-hidden", String(n !== i));
      });
      Array.prototype.forEach.call(puntos.children, function (p, n) {
        p.classList.toggle("activo", n === i);
      });
    }

    caja.classList.add("js-rot");
    mostrar(0);

    setInterval(function () {
      if (visible && !document.hidden) { mostrar((actual + 1) % fotos.length); }
    }, ms);

    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (entradas) {
        visible = entradas[0].isIntersecting;
      }).observe(caja);
    }
  });
})();
