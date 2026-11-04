/* ============================================================
   PANACEA — carrito compartido por todas las páginas.
   Guarda { idProducto: cantidad } en localStorage ("panacea-carrito")
   y dibuja el botón flotante "N productos · Ver mi pedido".
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

  /* ---------- Botón flotante del pedido ---------- */
  var boton = null;
  function crearBoton() {
    if (document.body.hasAttribute("data-sin-pedido")) { return; }
    boton = document.createElement("a");
    boton.className = "pedido";
    boton.id = "pedido";
    boton.href = "carrito.html";
    boton.hidden = true;
    boton.innerHTML =
      '<svg class="icon" aria-hidden="true"><use href="#i-bag"/></svg>' +
      '<span><strong data-n>0</strong> <span data-txt>producto</span> · Ver mi pedido</span>';
    document.body.appendChild(boton);
  }
  function pintarBoton() {
    if (!boton) { return; }
    var n = Carrito.unidades();
    boton.hidden = n === 0;
    boton.querySelector("[data-n]").textContent = String(n);
    boton.querySelector("[data-txt]").textContent = n === 1 ? "producto" : "productos";
  }

  cargar();
  crearBoton();
  pintarBoton();

  /* Si el carrito cambia en otra pestaña, esta se actualiza */
  window.addEventListener("storage", function (e) {
    if (e.key === CLAVE) { cargar(); avisar(); }
  });
})();
