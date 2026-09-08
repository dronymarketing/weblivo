/* ============================================================
   HOTEL LOS PARAÍSOS — BORRADOR
   Scroll nativo. Sin librerías de scroll.
   ============================================================ */
import { createMorph } from './vendor/morphicons/dom.js';

(function () {
  'use strict';

  var nav       = document.querySelector('.nav');
  var menu      = document.querySelector('.menu');
  var velo      = document.querySelector('.menu__velo');
  var abrirBtn  = document.querySelector('.nav__hamburguesa');
  var cerrarBtn = document.querySelector('.menu__cerrar');

  /* ----------------------------------------------------------
     HAMBURGUESA → LLAMA — morph real del trazado (morphicons),
     resorte "bouncy" para que se note bien el gesto.
  ---------------------------------------------------------- */
  var MENU_D  = 'M4 5h16M4 12h16M4 19h16';
  var FLAME_D = 'M12 3q1 4 4 6.5t3 5.5a1 1 0 0 1-14 0 5 5 0 0 1 1-3 1 1 0 0 0 5 0c0-2-1.5-3-1.5-5q0-2 2.5-4';
  var hamPath  = document.getElementById('nav-hamburguesa-path');
  var hamMorph = hamPath ? createMorph(hamPath, MENU_D) : null;

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
     NAV — 3 estados: transparente en el tope, glass sin tono
     apenas arranca el scroll (todavía dentro del hero), verde
     sólido puro al llegar a Tarifas.
  ---------------------------------------------------------- */
  var tarifasEl = document.getElementById('tarifas');
  var umbralSolido = Infinity;
  function fijarUmbralSolido() {
    if (tarifasEl) umbralSolido = Math.max(0, tarifasEl.offsetTop - (nav ? nav.offsetHeight : 0));
  }
  fijarUmbralSolido();
  window.addEventListener('resize', fijarUmbralSolido);
  window.addEventListener('orientationchange', fijarUmbralSolido);

  function estadoNav() {
    if (!nav) return;
    var y = window.scrollY || window.pageYOffset;
    var tope   = y < 80;
    var solido = y >= umbralSolido;
    nav.classList.toggle('es-tope', tope);
    nav.classList.toggle('es-solido', solido);
    nav.classList.toggle('es-glass', !tope && !solido);
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
     HERO — carrusel de promos
     Arranca en el 3x1 (la más pedida), la foto de fondo cambia
     con cada promo. Con "Kit para dos" el hero se tiñe de
     violeta/rosado.
  ---------------------------------------------------------- */
  var hero       = document.querySelector('.hero');
  var heroFotos  = Array.prototype.slice.call(document.querySelectorAll('.hero__foto'));
  var nombreEl   = document.getElementById('hero-nombre-txt');
  var iconoUso   = document.getElementById('hero-icono');
  var detalleEl  = document.getElementById('hero-detalle');
  var precioEl   = document.getElementById('hero-precio');
  var lentoMov   = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var actual = 0, reloj = null;

  function pintarHero(i) {
    var foto = heroFotos[i];
    if (!foto) return;
    heroFotos.forEach(function (f, n) { f.classList.toggle('activa', n === i); });
    if (nombreEl)  nombreEl.textContent = foto.dataset.nombre;
    if (iconoUso)  iconoUso.setAttribute('href', '#' + foto.dataset.icono);
    if (detalleEl) detalleEl.textContent = foto.dataset.detalle;
    if (precioEl)  precioEl.textContent = foto.dataset.precio;

    var esVioleta = foto.dataset.violeta === 'true';
    hero.classList.toggle('hero--violeta', esVioleta);
    if (abrirBtn) abrirBtn.classList.toggle('nav__llama', esVioleta);
    if (hamMorph) hamMorph.morphTo(esVioleta ? FLAME_D : MENU_D, 'bouncy');
  }

  function irAHero(i) {
    if (!heroFotos.length) return;
    actual = (i + heroFotos.length) % heroFotos.length;
    if (hero) hero.classList.add('cambia');
    setTimeout(function () {
      pintarHero(actual);
      if (hero) hero.classList.remove('cambia');
    }, 260);
  }

  function arrancarHero() {
    if (lentoMov || heroFotos.length < 2) return;
    detenerHero();
    reloj = setInterval(function () { irAHero(actual + 1); }, 6000);
  }
  function detenerHero() { if (reloj) { clearInterval(reloj); reloj = null; } }

  document.addEventListener('visibilitychange', function () {
    document.hidden ? detenerHero() : arrancarHero();
  });

  if (hero && heroFotos.length) { pintarHero(0); arrancarHero(); }

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
