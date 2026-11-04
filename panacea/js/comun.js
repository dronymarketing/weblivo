/* ============================================================
   PANACEA — lo que comparten TODAS las páginas: header con tres
   estados, barras del celular, menú móvil, ítem activo y aparición
   al scroll. Lo propio de cada página va en su propio archivo.
   ============================================================ */
(function () {
  "use strict";

  var html = document.documentElement;
  window.__panaceaListo = true; /* avisa al head que el script cargó */

  var reducido = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Header con tres estados ----------
     es-tope:   arriba del todo, transparente sobre la foto.
     es-glass:  ya se scrolleó, pero el hero sigue debajo: vidrio sobre la foto.
     es-solido: el hero ya pasó por detrás del header, o la página no tiene hero. */
  var nav = document.getElementById("nav");
  var heroEl = document.querySelector(".hero");
  var ticking = false;
  function estadoNav() {
    ticking = false;
    var solido = heroEl ? heroEl.getBoundingClientRect().bottom <= nav.getBoundingClientRect().bottom : true;
    var tope = !solido && window.scrollY < 80;
    nav.classList.toggle("es-solido", solido);
    nav.classList.toggle("es-tope", tope);
    nav.classList.toggle("es-glass", !solido && !tope);
  }
  window.addEventListener("scroll", function () {
    if (!ticking) { ticking = true; window.requestAnimationFrame(estadoNav); }
  }, { passive: true });
  window.addEventListener("resize", estadoNav);
  window.addEventListener("load", estadoNav);
  estadoNav();

  /* ---------- Barras del celular ----------
     Arriba: <meta theme-color>. Abajo: la franja body::after (--barra-inferior).
     Cada una toma el color de lo que tiene pegado (hero, tarjeta o marco). */
  var tema = document.querySelector('meta[name="theme-color"]');
  /* Las barras toman el color de lo que tienen pegado: el fondo blanco que rodea a las tarjetas (marco),
     la franja crema que rodea al hero (franja), el hero, el pie y su tarjeta verde. */
  var colores = { marco: "#FAF3E7", franja: "#FAF3E7", hero: "#8F4327", bloque: "#FAF3E7", pie: "#687871", tarjeta: "#33473A" };

  function aHex(css, respaldo) {
    try {
      var c = document.createElement("canvas");
      c.width = c.height = 1;
      var x = c.getContext("2d");
      x.fillStyle = "#000000";
      x.fillStyle = css;
      x.fillRect(0, 0, 1, 1);
      var d = x.getImageData(0, 0, 1, 1).data;
      var hex = "#" + [d[0], d[1], d[2]].map(function (n) { return ("0" + n.toString(16)).slice(-2); }).join("");
      return hex === "#000000" && !/^rgba?\(0,\s*0,\s*0/.test(css) ? respaldo : hex;
    } catch (err) { return respaldo; }
  }
  function leerColores() {
    var sonda = document.createElement("div");
    sonda.style.display = "none";
    document.body.appendChild(sonda);
    function leer(variable, respaldo) {
      sonda.style.backgroundColor = "var(" + variable + ")";
      return aHex(getComputedStyle(sonda).backgroundColor, respaldo);
    }
    colores = {
      marco: leer("--marco", colores.marco),
      franja: leer("--marco-hero", colores.franja),
      hero: leer("--terracota", colores.hero),
      bloque: leer("--marco", colores.bloque),
      pie: leer("--verde-gris", colores.pie),
      tarjeta: leer("--verde", colores.tarjeta)
    };
    document.body.removeChild(sonda);
  }
  leerColores();

  var zonas = [];
  /* En orden de documento: .pie (el fondo gris verdoso) va antes que .pie__tarjeta
     (el verde oscuro de adentro); colorEn recorre al revés para que gane lo de adentro. */
  document.querySelectorAll(".hero, .bloque, .pie, .pie__tarjeta").forEach(function (el) {
    var tipo = el.classList.contains("hero") ? "hero"
      : el.classList.contains("bloque") ? "bloque"
      : el.classList.contains("pie__tarjeta") ? "tarjeta" : "pie";
    zonas.push({ el: el, color: tipo });
  });
  function colorEn(y) {
    for (var i = zonas.length - 1; i >= 0; i--) {
      var r = zonas[i].el.getBoundingClientRect();
      if (r.top <= y && y < r.bottom) { return colores[zonas[i].color]; }
    }
    /* la franja crema de la primera pantalla: arriba del hero y el margen de abajo */
    var hero = document.querySelector("main > .hero");
    if (hero && y < hero.getBoundingClientRect().bottom + 16) { return colores.franja; }
    return colores.marco;
  }
  var barrasPendiente = false;
  function pintarBarras() {
    barrasPendiente = false;
    if (tema) { tema.setAttribute("content", colorEn(0)); }
    html.style.setProperty("--barra-inferior", colorEn(window.innerHeight - 1));
  }
  window.addEventListener("scroll", function () {
    if (!barrasPendiente) { barrasPendiente = true; window.requestAnimationFrame(pintarBarras); }
  }, { passive: true });
  window.addEventListener("resize", pintarBarras);
  window.addEventListener("load", pintarBarras);
  pintarBarras();

  /* ¿El link apunta a esta misma página? (para anclas como index.html#servicios) */
  function sinIndex(ruta) { return ruta.replace(/index\.html$/, ""); }
  function esDeEstaPagina(a) { return sinIndex(a.pathname) === sinIndex(location.pathname); }

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
  /* Un ancla del menú: el menú se cierra ANTES de que arranque el scroll
     (si no, se ve el scroll a través del panel abierto). */
  var DUR_CIERRE = reducido ? 0 : 350;
  menu.addEventListener("click", function (e) {
    var a = e.target.closest("a");
    if (!a) { return; }
    var destino = a.hash && a.hash.length > 1 && esDeEstaPagina(a) ? document.querySelector(a.hash) : null;
    if (!destino) { cerrarMenu(false); return; }
    e.preventDefault();
    cerrarMenu(false);
    setTimeout(function () {
      destino.scrollIntoView({ behavior: reducido ? "auto" : "smooth" });
      history.pushState(null, "", a.hash);
    }, DUR_CIERRE);
  });
  document.addEventListener("keydown", function (e) {
    if (!menu.classList.contains("abierto")) { return; }
    if (e.key === "Escape") { cerrarMenu(true); return; }
    if (e.key !== "Tab") { return; }
    /* El foco no se sale del menú: Tab cicla entre el botón y los links */
    var lista = [btn].concat(Array.prototype.slice.call(menu.querySelectorAll("a[href], button")));
    var i = lista.indexOf(document.activeElement);
    if (e.shiftKey && i <= 0) { e.preventDefault(); lista[lista.length - 1].focus(); }
    else if (!e.shiftKey && i === lista.length - 1) { e.preventDefault(); lista[0].focus(); }
  });
  window.addEventListener("resize", function () {
    if (window.innerWidth >= 768 && menu.classList.contains("abierto")) { cerrarMenu(false); }
  });

  /* El ítem activo del nav y del menú (aria-current="page") va escrito a mano en cada página. */

  /* ---------- Aparición al scroll ----------
     La clase js-reveal (estado inicial opacity 0) la pone el <head>. */
  if (html.classList.contains("js-reveal")) {
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
