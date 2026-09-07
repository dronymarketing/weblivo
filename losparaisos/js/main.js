/* ============================================================
   HOTEL LOS PARAÍSOS — BORRADOR
   Scroll nativo. Sin librerías de scroll.
   ============================================================ */
(function () {
  'use strict';

  var nav       = document.querySelector('.nav');
  var menu      = document.querySelector('.menu');
  var velo      = document.querySelector('.menu__velo');
  var abrirBtn  = document.querySelector('.nav__hamburguesa');
  var cerrarBtn = document.querySelector('.menu__cerrar');

  /* ----------------------------------------------------------
     ALTO REAL DE PANTALLA — Chrome Android no siempre aplica
     100svh en el primer pintado.
  ---------------------------------------------------------- */
  function fijarAltoReal() {
    document.documentElement.style.setProperty('--vh100', window.innerHeight + 'px');
  }
  fijarAltoReal();
  window.addEventListener('resize', fijarAltoReal);
  window.addEventListener('orientationchange', fijarAltoReal);

  /* ----------------------------------------------------------
     NAV — transparente sobre el hero, sólido al bajar
  ---------------------------------------------------------- */
  function estadoNav() {
    if (!nav) return;
    var y = window.scrollY || window.pageYOffset;
    nav.classList.toggle('es-solido', y >= 80);
    nav.classList.toggle('es-tope', y < 80);
  }
  var pendiente = false;
  function alScrollear() {
    if (pendiente) return;
    pendiente = true;
    requestAnimationFrame(function () { estadoNav(); pendiente = false; });
  }
  window.addEventListener('scroll', alScrollear, { passive: true });
  estadoNav();

  /* ----------------------------------------------------------
     MENÚ — drawer lateral desde la derecha
  ---------------------------------------------------------- */
  function abrirMenu(abrir) {
    if (!menu) return;
    menu.classList.toggle('abierto', abrir);
    if (velo) velo.classList.toggle('abierto', abrir);
    if (abrirBtn) abrirBtn.setAttribute('aria-expanded', abrir ? 'true' : 'false');
    document.body.style.overflow = abrir ? 'hidden' : '';
  }
  if (abrirBtn)  abrirBtn.addEventListener('click', function () { abrirMenu(true); });
  if (cerrarBtn) cerrarBtn.addEventListener('click', function () { abrirMenu(false); });
  if (velo)      velo.addEventListener('click', function () { abrirMenu(false); });
  if (menu) {
    menu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { abrirMenu(false); });
    });
  }
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') abrirMenu(false);
  });

  /* ----------------------------------------------------------
     ROTADOR DE PROMOS DEL HERO
     Arranca en el 3x1 (la más pedida) y va rotando. Con el
     "Kit para dos" el hero se tiñe de violeta/rosado.
  ---------------------------------------------------------- */
  var hero      = document.querySelector('.hero');
  var heroPromo = document.getElementById('hero-promo');
  var lentoMov  = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var promos = [
    { icono:'i-percent', etiqueta:'Promo 3x1',    detalle:'3 horas por el precio de 1 · de 12:00 a 21:00hs',           precio:'$1590', violeta:false },
    { icono:'i-gift',    etiqueta:'Frigobar Free', detalle:'3 horas + todo el frigobar, en habitación 27',              precio:'$2400', violeta:false },
    { icono:'i-flame',   etiqueta:'Kit para dos',  detalle:'3 horas + vibrador, disfraz, gel íntimo y anillo vibrador', precio:'$2400', violeta:true  }
  ];

  if (hero && heroPromo) {
    var usoIco    = heroPromo.querySelector('.hero__promo-ico use');
    var nombreEl  = heroPromo.querySelector('.hero__promo-nombre');
    var detalleEl = heroPromo.querySelector('.hero__promo-detalle');
    var precioEl  = heroPromo.querySelector('.hero__promo-precio');
    var actual    = 0;

    function pintarPromo(p) {
      if (usoIco)    usoIco.setAttribute('href', '#' + p.icono);
      if (nombreEl)  nombreEl.textContent = p.etiqueta;
      if (detalleEl) detalleEl.textContent = p.detalle;
      if (precioEl)  precioEl.textContent = p.precio;
      hero.classList.toggle('hero--violeta', !!p.violeta);
    }

    function irAPromo(i) {
      actual = (i + promos.length) % promos.length;
      heroPromo.classList.add('cambia');
      setTimeout(function () {
        pintarPromo(promos[actual]);
        heroPromo.classList.remove('cambia');
      }, 260);
    }

    pintarPromo(promos[0]);
    if (!lentoMov && promos.length > 1) {
      setInterval(function () { irAPromo(actual + 1); }, 4800);
    }
  }

  /* ----------------------------------------------------------
     APARICIONES AL SCROLL
     El opacity 0 lo pone acá: si este archivo no carga, se ve todo.
  ---------------------------------------------------------- */
  var lento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if ('IntersectionObserver' in window && !lento) {
    var objetivos = document.querySelectorAll('.aparece');
    objetivos.forEach(function (el) { el.classList.add('oculto'); });

    var obs = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (e) {
        if (!e.isIntersecting) return;
        var i = parseInt(e.target.dataset.orden || 0, 10);
        setTimeout(function () { e.target.classList.remove('oculto'); }, i * 90);
        obs.unobserve(e.target);
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.08 });

    objetivos.forEach(function (el) { obs.observe(el); });
  }

})();
