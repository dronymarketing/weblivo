/* ============================================================
   RHODIUM — BORRADOR
   Scroll nativo. GSAP solo para el reveal atado al scroll (C).
   ============================================================ */
(function () {
  'use strict';

  var raiz = document.documentElement;
  var reducido = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ----------------------------------------------------------
     ALTO REAL DE PANTALLA (como fabianamartinez) — Chrome Android
     no siempre aplica 100svh en el primer pintado. Se mide y se
     pisa por CSS en var(--vh100, 100svh): sigue siendo min-height.
     visualViewport.resize es el que dispara cuando la barra de
     direcciones se esconde o aparece al scrollear.
  ---------------------------------------------------------- */
  function fijarAltoReal() {
    var alto = window.visualViewport ? window.visualViewport.height : window.innerHeight;
    raiz.style.setProperty('--vh100', alto + 'px');
  }
  fijarAltoReal();
  window.addEventListener('resize', fijarAltoReal);
  window.addEventListener('orientationchange', fijarAltoReal);
  if (window.visualViewport) window.visualViewport.addEventListener('resize', fijarAltoReal);

  /* ----------------------------------------------------------
     NAV — transparente en el tope, glass sobre el hero,
     sólido cuando el contenido ya tapó el hero.
  ---------------------------------------------------------- */
  var nav  = document.querySelector('.nav');
  var hero = document.querySelector('.hero');
  var umbralSolido = Infinity;

  function medirUmbral() {
    if (hero && nav) umbralSolido = Math.max(80, hero.offsetHeight - nav.offsetHeight);
  }

  function estadoNav() {
    if (!nav) return;
    var y = window.scrollY || window.pageYOffset;
    var tope = y < 80;
    var solido = y >= umbralSolido;
    nav.classList.toggle('es-tope', tope);
    nav.classList.toggle('es-solido', solido);
    nav.classList.toggle('es-glass', !tope && !solido);
  }

  var anchoPrevio = window.innerWidth;
  medirUmbral();
  estadoNav();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { medirUmbral(); estadoNav(); });
  window.addEventListener('resize', function () {
    // Solo si cambió el ancho: el resize de la barra del navegador no cuenta
    if (window.innerWidth === anchoPrevio) return;
    anchoPrevio = window.innerWidth;
    medirUmbral();
    estadoNav();
  });

  var pendiente = false;
  window.addEventListener('scroll', function () {
    if (pendiente) return;
    pendiente = true;
    requestAnimationFrame(function () { estadoNav(); pendiente = false; });
  }, { passive: true });

  /* ----------------------------------------------------------
     MENÚ — panel desde la derecha
  ---------------------------------------------------------- */
  var boton = document.querySelector('.nav__hamburguesa');
  var menu  = document.getElementById('menu');
  var velo  = document.querySelector('.menu__velo');
  var DUR_CIERRE = reducido ? 0 : 350;

  function enfocables() {
    return [boton].concat(Array.prototype.slice.call(menu.querySelectorAll('a[href], button')));
  }

  function abrir() {
    raiz.classList.add('menu-abierto');
    boton.setAttribute('aria-expanded', 'true');
    boton.setAttribute('aria-label', 'Cerrar menú');
    var primero = menu.querySelector('a');
    if (primero) setTimeout(function () { primero.focus({ preventScroll: true }); }, 60);
  }

  function cerrar(devolverFoco) {
    raiz.classList.remove('menu-abierto');
    boton.setAttribute('aria-expanded', 'false');
    boton.setAttribute('aria-label', 'Abrir menú');
    if (devolverFoco) boton.focus({ preventScroll: true });
  }

  function abierto() { return raiz.classList.contains('menu-abierto'); }

  if (boton && menu) {
    boton.addEventListener('click', function () { abierto() ? cerrar(true) : abrir(); });
    if (velo) velo.addEventListener('click', function () { cerrar(true); });

    document.addEventListener('keydown', function (e) {
      if (!abierto()) return;
      if (e.key === 'Escape') { cerrar(true); return; }
      if (e.key !== 'Tab') return;
      var lista = enfocables();
      var i = lista.indexOf(document.activeElement);
      if (e.shiftKey && i <= 0) { e.preventDefault(); lista[lista.length - 1].focus(); }
      else if (!e.shiftKey && i === lista.length - 1) { e.preventDefault(); lista[0].focus(); }
    });

    // Anclas de esta misma página: el menú se cierra antes de que arranque el scroll
    menu.addEventListener('click', function (e) {
      var a = e.target.closest('a');
      if (!a) return;
      var url = new URL(a.href, location.href);
      var mismaPagina = url.pathname === location.pathname && url.hash;
      if (!mismaPagina) { cerrar(false); return; }
      var destino = document.querySelector(url.hash);
      if (!destino) return;
      e.preventDefault();
      cerrar(false);
      setTimeout(function () {
        destino.scrollIntoView({ behavior: reducido ? 'auto' : 'smooth' });
        history.pushState(null, '', url.hash);
      }, DUR_CIERRE);
    });
  }

  /* Ítem activo en el menú para las anclas del inicio */
  var anclas = menu ? menu.querySelectorAll('a[data-tipo="ancla"]') : [];
  if ('IntersectionObserver' in window && anclas.length) {
    var porId = {};
    anclas.forEach(function (a) {
      var h = a.getAttribute('href');
      if (h.charAt(0) === '#') porId[h.slice(1)] = a;
    });
    var ioActivo = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (en) {
        var a = porId[en.target.id];
        if (!a) return;
        if (en.isIntersecting) a.setAttribute('aria-current', 'location');
        else a.removeAttribute('aria-current');
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    Object.keys(porId).forEach(function (id) {
      var s = document.getElementById(id);
      if (s) ioActivo.observe(s);
    });
  }

  /* ----------------------------------------------------------
     TÍTULO POR PALABRAS (G) — parte el texto en spans
  ---------------------------------------------------------- */
  document.querySelectorAll('[data-palabras]').forEach(function (el) {
    var palabras = el.textContent.trim().split(/\s+/);
    el.setAttribute('aria-label', el.textContent.trim());
    el.innerHTML = palabras.map(function (p, i) {
      return '<span class="palabra" aria-hidden="true"><span style="--i:' + i + '">' + p + '</span></span>';
    }).join(' ');
  });

  /* ----------------------------------------------------------
     APARICIONES (B) — una sola vez, escalonadas entre hermanos
  ---------------------------------------------------------- */
  var aparecen = document.querySelectorAll('[data-reveal], [data-palabras]');
  aparecen.forEach(function (el) {
    if (!el.hasAttribute('data-reveal') || !el.parentElement) return;
    var hermanos = Array.prototype.filter.call(el.parentElement.children, function (h) {
      return h.hasAttribute('data-reveal');
    });
    el.style.setProperty('--i', hermanos.indexOf(el));
  });

  if ('IntersectionObserver' in window && !reducido) {
    var io = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (en) {
        if (!en.isIntersecting) return;
        en.target.classList.add('is-in');
        io.unobserve(en.target);
      });
    }, { threshold: 0.15 });
    aparecen.forEach(function (el) { io.observe(el); });
  } else {
    aparecen.forEach(function (el) { el.classList.add('is-in'); });
  }

  /* ----------------------------------------------------------
     BANDAS DE FOTO (C) — máscara + zoom atados al dedo
  ---------------------------------------------------------- */
  if (window.gsap && window.ScrollTrigger && !reducido) {
    gsap.registerPlugin(ScrollTrigger);
    var zoom = window.innerWidth < 768 ? 1.15 : 1.3;
    document.querySelectorAll('[data-banda]').forEach(function (banda) {
      var marco = banda.querySelector('.banda__marco');
      var img = marco.querySelector('img');
      function st() { return { trigger: banda, start: 'top 90%', end: 'top 15%', scrub: 0.5 }; }
      gsap.fromTo(marco, { clipPath: 'inset(0% 0% 100% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', ease: 'none', scrollTrigger: st() });
      gsap.fromTo(img, { scale: zoom }, { scale: 1, ease: 'none', scrollTrigger: st() });
    });
  }

  /* ----------------------------------------------------------
     PROCEDIMIENTOS (E) — pila anclada. La pantalla queda fija
     mientras cada foto sube y tapa entera a la anterior; el
     scroll sigue recién cuando llegó la última. Scroll nativo:
     el pin de ScrollTrigger solo reserva el recorrido.
  ---------------------------------------------------------- */
  var pila = document.querySelector('[data-pila]');
  if (pila && window.gsap && window.ScrollTrigger && !reducido) {
    var tarjetas = pila.querySelectorAll('.proc');
    if (tarjetas.length > 1) {
      pila.classList.add('pila-activa');
      var altoNav = function () { return nav ? nav.offsetHeight : 0; };
      /* recorrido por foto: 80% de pantalla en celular (más se hace eterno
         con el pulgar), 100% en escritorio */
      var tramo = function () { return window.innerHeight * (window.innerWidth < 768 ? 0.8 : 1); };
      var tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: pila,
          start: function () { return 'top ' + altoNav() + 'px'; },
          end: function () { return '+=' + tramo() * (tarjetas.length - 1 + 0.35); },
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
          invalidateOnRefresh: true
        }
      });
      for (var i = 1; i < tarjetas.length; i++) {
        tl.fromTo(tarjetas[i], { yPercent: 105 }, { yPercent: 0, duration: 1 }, i - 1);
        /* la de atrás se achica y se apaga con un velo negro opaco —
           nunca con opacity: se vería a través de la que sube */
        tl.to(tarjetas[i - 1].querySelector('.proc__tarjeta'), { scale: 0.94, '--apagado': 0.6, duration: 1 }, i - 1);
      }
      tl.to({}, { duration: 0.35 });   /* un respiro con la última foto arriba antes de soltar */
    }
  }
})();
