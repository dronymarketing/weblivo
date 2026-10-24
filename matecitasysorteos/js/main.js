// Mate · Citas y Sorteos — nav, menú, revelado al scroll, barras del sistema.
(function () {
  'use strict';

  var nav = document.getElementById('nav-principal');
  var hamburguesa = nav.querySelector('.nav__hamburguesa');
  var menu = document.getElementById('menu');
  var cerrar = menu.querySelector('.menu__cerrar');
  var enlacesMenu = menu.querySelectorAll('a');

  // ---------- Nav: transparente → sólido a los 80px ----------
  function estadoNav() {
    nav.classList.toggle('nav--solido', window.scrollY > 80);
  }
  addEventListener('scroll', estadoNav, { passive: true });
  estadoNav();

  // ---------- Menú: círculo que se expande desde la hamburguesa ----------
  var abierto = false;
  function abrirMenu() {
    abierto = true;
    menu.hidden = false;
    requestAnimationFrame(function () { menu.classList.add('menu--abierto'); });
    hamburguesa.setAttribute('aria-expanded', 'true');
    document.body.classList.add('bloquear-scroll');
    cerrar.focus();
  }
  function cerrarMenu() {
    abierto = false;
    menu.classList.remove('menu--abierto');
    hamburguesa.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('bloquear-scroll');
    hamburguesa.focus();
    setTimeout(function () { if (!abierto) menu.hidden = true; }, 650);
  }
  hamburguesa.addEventListener('click', function () { abierto ? cerrarMenu() : abrirMenu(); });
  cerrar.addEventListener('click', cerrarMenu);
  enlacesMenu.forEach(function (a) { a.addEventListener('click', cerrarMenu); });
  document.addEventListener('keydown', function (ev) { if (ev.key === 'Escape' && abierto) cerrarMenu(); });

  // ---------- Revelado al scroll (paquete «Fundar»: liviano, sin GSAP) ----------
  var revelables = document.querySelectorAll('.revelar');
  var porGrupo = new Map();
  revelables.forEach(function (el) {
    var grupo = el.parentElement;
    var lista = porGrupo.get(grupo) || [];
    lista.push(el);
    porGrupo.set(grupo, lista);
  });
  porGrupo.forEach(function (lista) {
    lista.forEach(function (el, i) { el.style.transitionDelay = (i * 60) + 'ms'; });
  });
  var observador = new IntersectionObserver(function (entradas) {
    entradas.forEach(function (entrada) {
      if (entrada.isIntersecting) {
        entrada.target.classList.add('es-visible');
        observador.unobserve(entrada.target);
      }
    });
  }, { threshold: 0.15 });
  revelables.forEach(function (el) { observador.observe(el); });

  // ---------- Ítem de nav activo ----------
  var secciones = document.querySelectorAll('main section[id]');
  var links = nav.querySelectorAll('.nav__links a');
  var observadorNav = new IntersectionObserver(function (entradas) {
    entradas.forEach(function (entrada) {
      if (!entrada.isIntersecting) return;
      links.forEach(function (a) {
        var activo = a.getAttribute('href') === '#' + entrada.target.id;
        a.toggleAttribute('aria-current', activo);
      });
    });
  }, { rootMargin: '-40% 0px -55% 0px' });
  secciones.forEach(function (s) { observadorNav.observe(s); });

  // ---------- Barras del sistema: theme-color + franja inferior ----------
  var metaTheme = document.getElementById('theme-color-meta');
  var oscuras = document.querySelectorAll('.seccion--oscura, .hero');
  var COLOR_OSCURO = '#053726';
  var COLOR_CLARO = '#FFFFFF';
  var listaBarras = Array.prototype.slice.call(document.querySelectorAll('.hero, .seccion'));
  function colorDe(el) {
    return (el.classList.contains('seccion--oscura') || el.classList.contains('hero')) ? COLOR_OSCURO : COLOR_CLARO;
  }
  var cuadro = false;
  function actualizarBarras() {
    cuadro = false;
    var arriba = listaBarras.find(function (el) { var r = el.getBoundingClientRect(); return r.top <= 1 && r.bottom > 1; }) || listaBarras[0];
    var abajo = listaBarras.find(function (el) { var r = el.getBoundingClientRect(); return r.top < innerHeight - 1 && r.bottom >= innerHeight - 1; }) || arriba;
    var cArriba = colorDe(arriba), cAbajo = colorDe(abajo);
    metaTheme.setAttribute('content', cArriba);
    document.documentElement.style.setProperty('--barra-inferior', cAbajo);
  }
  addEventListener('scroll', function () { if (!cuadro) { cuadro = true; requestAnimationFrame(actualizarBarras); } }, { passive: true });
  actualizarBarras();
})();
