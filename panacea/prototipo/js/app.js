(function () {
  "use strict";

  var NUMERO = "59898611582";
  var html = document.documentElement;

  /* ---------- Header: sólido a partir de 80px de scroll ---------- */
  var nav = document.getElementById("nav");
  var ticking = false;
  function estadoNav() {
    nav.classList.toggle("solido", window.scrollY > 80);
    ticking = false;
  }
  window.addEventListener("scroll", function () {
    if (!ticking) { ticking = true; window.requestAnimationFrame(estadoNav); }
  }, { passive: true });
  estadoNav();

  /* ---------- Menú móvil ---------- */
  var btn = document.getElementById("btn-menu");
  var menu = document.getElementById("menu");

  function abrirMenu() {
    menu.classList.add("abierto");
    menu.setAttribute("aria-hidden", "false");
    btn.setAttribute("aria-expanded", "true");
    btn.setAttribute("aria-label", "Cerrar menú");
    html.classList.add("menu-abierto");
    var primero = menu.querySelector("a");
    if (primero) { primero.focus({ preventScroll: true }); }
  }
  function cerrarMenu(devolverFoco) {
    menu.classList.remove("abierto");
    menu.setAttribute("aria-hidden", "true");
    btn.setAttribute("aria-expanded", "false");
    btn.setAttribute("aria-label", "Abrir menú");
    html.classList.remove("menu-abierto");
    if (devolverFoco) { btn.focus(); }
  }
  btn.addEventListener("click", function () {
    if (menu.classList.contains("abierto")) { cerrarMenu(true); } else { abrirMenu(); }
  });
  menu.addEventListener("click", function (e) {
    if (e.target.closest("a")) { cerrarMenu(false); }
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && menu.classList.contains("abierto")) { cerrarMenu(true); }
  });
  window.addEventListener("resize", function () {
    if (window.innerWidth >= 768 && menu.classList.contains("abierto")) { cerrarMenu(false); }
  });

  /* ---------- Pestañas de productos ---------- */
  var tabs = Array.prototype.slice.call(document.querySelectorAll(".tab"));
  var productos = Array.prototype.slice.call(document.querySelectorAll(".producto"));
  var lista = document.getElementById("lista-productos");

  function mostrarCategoria(cat) {
    tabs.forEach(function (t) {
      t.setAttribute("aria-selected", String(t.getAttribute("data-cat") === cat));
    });
    var n = 0;
    productos.forEach(function (p) {
      var coincide = p.getAttribute("data-cat") === cat;
      p.hidden = !coincide;
      if (coincide) {
        p.style.setProperty("--i", n++);
        p.classList.add("visto");
      }
    });
    lista.scrollLeft = 0;
  }
  tabs.forEach(function (t) {
    t.addEventListener("click", function () { mostrarCategoria(t.getAttribute("data-cat")); });
  });
  if (tabs.length) { mostrarCategoria("piel"); }

  /* ---------- Pedido por WhatsApp ---------- */
  var pedido = document.getElementById("pedido");
  var pedidoN = document.getElementById("pedido-n");
  var pedidoTxt = document.getElementById("pedido-txt");
  var elegidos = [];

  function actualizarPedido() {
    pedido.hidden = elegidos.length === 0;
    pedidoN.textContent = String(elegidos.length);
    pedidoTxt.textContent = elegidos.length === 1 ? "producto" : "productos";
    var texto = "Hola Paola, quiero consultar por: " + elegidos.join(", ");
    pedido.href = "https://wa.me/" + NUMERO + "?text=" + encodeURIComponent(texto);
  }
  document.querySelectorAll(".btn-mas").forEach(function (b) {
    b.addEventListener("click", function () {
      var nombre = b.closest(".producto").getAttribute("data-nombre");
      var i = elegidos.indexOf(nombre);
      var activo = i === -1;
      if (activo) { elegidos.push(nombre); } else { elegidos.splice(i, 1); }
      b.setAttribute("aria-pressed", String(activo));
      b.querySelector("use").setAttribute("href", activo ? "#i-check" : "#i-plus");
      actualizarPedido();
    });
  });

  /* ---------- Aparición al scroll ----------
     El estado inicial (opacity 0) solo existe si este JS corre. */
  var reducido = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if ("IntersectionObserver" in window && !reducido) {
    html.classList.add("js-reveal");
    var io = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add("visto");
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.15 });
    document.querySelectorAll(".reveal").forEach(function (el) {
      if (!el.classList.contains("visto")) { io.observe(el); }
    });
  }
})();
