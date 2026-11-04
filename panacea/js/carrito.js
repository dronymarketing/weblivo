/* ============================================================
   PANACEA — carrito compartido por todas las páginas.
   Guarda { idProducto: cantidad } en localStorage ("panacea-carrito")
   y mantiene al día el número del carrito del nav.
   Necesita js/productos.js cargado antes.
   ============================================================ */
(function () {
  "use strict";

  var P = window.PANACEA;
  var CLAVE = "panacea-carrito";
  var CLAVE_VIEJA = "panacea-pedido"; /* versión anterior: lista de ids, 1 unidad cada uno */
  var MAX = 99;
  var estado = {};
  var oyentes = [];

  function limpiar() {
    Object.keys(estado).forEach(function (id) {
      var n = Math.floor(Number(estado[id]));
      if (!P.porId[id] || !(n > 0)) { delete estado[id]; } else { estado[id] = Math.min(n, MAX); }
    });
  }
  function cargar() {
    estado = {};
    try {
      var g = JSON.parse(window.localStorage.getItem(CLAVE) || "null");
      if (g && typeof g === "object" && !Array.isArray(g)) {
        estado = g;
      } else {
        var vieja = JSON.parse(window.localStorage.getItem(CLAVE_VIEJA) || "[]");
        if (Array.isArray(vieja)) { vieja.forEach(function (id) { estado[id] = 1; }); }
      }
    } catch (err) { estado = {}; }
    limpiar();
  }
  function guardar() {
    try { window.localStorage.setItem(CLAVE, JSON.stringify(estado)); } catch (err) { /* sigue en memoria */ }
  }
  function avisar() {
    oyentes.forEach(function (fn) { fn(); });
    pintarBoton();
  }

  var Carrito = {
    cantidad: function (id) { return estado[id] || 0; },
    items: function () {
      return Object.keys(estado).map(function (id) {
        return { id: id, cantidad: estado[id], producto: P.porId[id] };
      });
    },
    unidades: function () {
      return Object.keys(estado).reduce(function (s, id) { return s + estado[id]; }, 0);
    },
    lineas: function () { return Object.keys(estado).length; },
    total: function () {
      return Object.keys(estado).reduce(function (s, id) {
        return s + P.porId[id].precio * estado[id];
      }, 0);
    },
    fijar: function (id, n) {
      if (!P.porId[id]) { return; }
      n = Math.floor(Number(n));
      if (n > 0) { estado[id] = Math.min(n, MAX); } else { delete estado[id]; }
      guardar(); avisar();
    },
    agregar: function (id, n) { Carrito.fijar(id, Carrito.cantidad(id) + (n || 1)); },
    quitar: function (id) { Carrito.fijar(id, 0); },
    vaciar: function () { estado = {}; guardar(); avisar(); },
    alCambiar: function (fn) { oyentes.push(fn); }
  };
  /* Selector de cantidad  [−] [ 1 ] [+]
     caja: el contenedor con [data-menos], [data-mas] y un <input>. fn(n) se llama al cambiar. */
  Carrito.enlazarCantidad = function (caja, fn) {
    var input = caja.querySelector("input");
    function leer() {
      var n = Math.floor(Number(input.value));
      return n > 0 ? Math.min(n, MAX) : 1;
    }
    function poner(n) { input.value = String(n); fn(n); }
    caja.querySelector("[data-menos]").addEventListener("click", function () { poner(Math.max(1, leer() - 1)); });
    caja.querySelector("[data-mas]").addEventListener("click", function () { poner(Math.min(MAX, leer() + 1)); });
    input.addEventListener("change", function () { poner(leer()); });
    return { leer: leer };
  };
  window.Carrito = Carrito;

  /* ---------- Carrito del nav: el número de productos ----------
     Está en el header de todas las páginas ([data-carrito-n]). Se muestra solo si
     hay productos y da un saltito cuando se agrega uno. */
  var ultimo = null;
  function pintarBoton() {
    var n = Carrito.unidades();
    Array.prototype.forEach.call(document.querySelectorAll("[data-carrito-n]"), function (el) {
      el.textContent = String(n);
      el.hidden = n === 0;
      var enlace = el.closest("a");
      if (enlace) {
        enlace.setAttribute("aria-label", n === 0 ? "Carrito, vacío" : "Carrito, " + n + (n === 1 ? " producto" : " productos"));
      }
      if (ultimo !== null && n > ultimo) {
        el.classList.remove("salta");
        void el.offsetWidth; /* reinicia la animación */
        el.classList.add("salta");
      }
    });
    ultimo = n;
  }

  cargar();
  pintarBoton();

  /* Si el carrito cambia en otra pestaña, esta se actualiza */
  window.addEventListener("storage", function (e) {
    if (e.key === CLAVE) { cargar(); avisar(); }
  });
})();
