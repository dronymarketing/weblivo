(function () {
  "use strict";

  var NUMERO = "59898611582";
  var html = document.documentElement;
  window.__panaceaListo = true; /* avisa al head que el script cargó */

  var reducido = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Header con tres estados ----------
     es-tope:   arriba del todo, transparente sobre la foto.
     es-glass:  ya se scrolleó, pero el hero sigue debajo: vidrio sobre la foto.
     es-solido: el hero ya pasó por detrás del header: sólido sobre las tarjetas. */
  var nav = document.getElementById("nav");
  var heroEl = document.querySelector(".hero");
  var ticking = false;
  function estadoNav() {
    ticking = false;
    var solido = heroEl ? heroEl.getBoundingClientRect().bottom <= nav.getBoundingClientRect().bottom : window.scrollY > 80;
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
  var colores = { marco: "#E2D8C3", hero: "#8F4327", bloque: "#FAF3E7", pie: "#33473A" };

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
      hero: leer("--terracota", colores.hero),
      bloque: leer("--crema", colores.bloque),
      pie: leer("--verde", colores.pie)
    };
    document.body.removeChild(sonda);
  }
  leerColores();

  var zonas = [];
  document.querySelectorAll(".hero, .bloque, .pie__tarjeta").forEach(function (el) {
    zonas.push({ el: el, color: el.classList.contains("hero") ? "hero" : el.classList.contains("bloque") ? "bloque" : "pie" });
  });
  function colorEn(y) {
    for (var i = 0; i < zonas.length; i++) {
      var r = zonas[i].el.getBoundingClientRect();
      if (r.top <= y && y < r.bottom) { return colores[zonas[i].color]; }
    }
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
    var hash = a.getAttribute("href");
    var destino = hash && hash.charAt(0) === "#" && hash.length > 1 ? document.querySelector(hash) : null;
    if (!destino) { cerrarMenu(false); return; }
    e.preventDefault();
    cerrarMenu(false);
    setTimeout(function () {
      destino.scrollIntoView({ behavior: reducido ? "auto" : "smooth" });
      history.pushState(null, "", hash);
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

  /* ---------- Ítem activo del nav y del menú ----------
     Se marca el de la sección que está realmente al medio de la pantalla. */
  var linksNav = Array.prototype.slice.call(document.querySelectorAll(".nav__links a, .menu__items a"));
  var enNav = {};
  linksNav.forEach(function (a) { enNav[a.getAttribute("href").slice(1)] = true; });
  function marcarActivo(id) {
    linksNav.forEach(function (a) {
      if (a.getAttribute("href") === "#" + id) { a.setAttribute("aria-current", "location"); }
      else { a.removeAttribute("aria-current"); }
    });
  }
  if ("IntersectionObserver" in window) {
    var ioNav = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (en) {
        if (!en.isIntersecting) { return; }
        var id = en.target.id === "pie" ? "contacto" : en.target.id;
        marcarActivo(enNav[id] ? id : "");
      });
    }, { rootMargin: "-40% 0px -55% 0px" });
    document.querySelectorAll("main > section[id], footer[id]").forEach(function (s) { ioNav.observe(s); });
  }
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
  var CLAVE = "panacea-pedido";
  var elegidos = []; /* ids de producto, en el orden en que se agregaron */

  var porId = {};
  productos.forEach(function (p) { porId[p.getAttribute("data-id")] = p; });

  function leerGuardado() {
    try {
      var g = JSON.parse(window.localStorage.getItem(CLAVE) || "[]");
      return Array.isArray(g) ? g.filter(function (id) { return porId[id]; }) : [];
    } catch (err) { return []; }
  }
  function guardar() {
    try { window.localStorage.setItem(CLAVE, JSON.stringify(elegidos)); } catch (err) { /* sigue en memoria */ }
  }

  function pintarBoton(id) {
    var b = porId[id].querySelector(".btn-mas");
    var activo = elegidos.indexOf(id) !== -1;
    b.setAttribute("aria-pressed", String(activo));
    b.querySelector("use").setAttribute("href", activo ? "#i-check" : "#i-plus");
  }

  function actualizarPedido() {
    pedido.hidden = elegidos.length === 0;
    pedidoN.textContent = String(elegidos.length);
    pedidoTxt.textContent = elegidos.length === 1 ? "producto" : "productos";
    var nombres = elegidos.map(function (id) { return porId[id].getAttribute("data-nombre"); });
    var texto = "Hola Paola, quiero comprar los productos " + nombres.join(", ");
    pedido.href = "https://wa.me/" + NUMERO + "?text=" + encodeURIComponent(texto);
  }

  document.querySelectorAll(".btn-mas").forEach(function (b) {
    b.addEventListener("click", function () {
      var id = b.closest(".producto").getAttribute("data-id");
      var i = elegidos.indexOf(id);
      if (i === -1) { elegidos.push(id); } else { elegidos.splice(i, 1); }
      pintarBoton(id);
      guardar();
      actualizarPedido();
    });
  });

  elegidos = leerGuardado();
  elegidos.forEach(pintarBoton);
  actualizarPedido();

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
