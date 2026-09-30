/* ============================================================
   PARKING DESPEGAR — BORRADOR
   Scroll nativo. La escena 3D vive en js/escena.js; acá va el
   alto real, el nav, el menú, las apariciones y los videos.
   ============================================================ */
(function () {
  'use strict';

  var raiz = document.documentElement;
  var reducido = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ----------------------------------------------------------
     ALTO REAL DE PANTALLA (como fabianamartinez y Rhodium) —
     Chrome Android no siempre aplica 100svh en el primer pintado.
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
     NAV — transparente en el tope, vidrio sobre la escena (o la
     foto del hero), sólido cuando el contenido ya la tapó.
  ---------------------------------------------------------- */
  var nav  = document.querySelector('.nav');
  var hero = document.querySelector('.hero, [data-hero]');
  var tapa = document.querySelector('.sobre-hero');
  var umbralSolido = Infinity;

  function medirUmbral() {
    if (!nav) return;
    var y0 = window.scrollY || window.pageYOffset;
    if (document.body.classList.contains('inicio') && tapa) {
      umbralSolido = tapa.getBoundingClientRect().top + y0 - nav.offsetHeight;
    } else if (hero) {
      umbralSolido = Math.max(80, hero.offsetHeight - nav.offsetHeight);
    }
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
  window.addEventListener('load', function () { medirUmbral(); estadoNav(); });
  window.addEventListener('resize', function () {
    if (window.innerWidth === anchoPrevio) return;
    anchoPrevio = window.innerWidth;
    medirUmbral();
    estadoNav();
  });

  /* ----------------------------------------------------------
     BARRAS DEL TELÉFONO (Santi, 30/9) — la de arriba (theme-color)
     y la de abajo arrancan con el color del hero (#F1F6F4 en el
     inicio, navy en las internas) y pasan al navy cuando el pie
     entra en pantalla. Chrome en Android pinta la de abajo con el
     fondo de la raíz: por eso se cambia el fondo del <html>.
     Con el menú abierto van en blanco, como el menú.
  ---------------------------------------------------------- */
  var tema = document.querySelector('meta[name="theme-color"]');
  var pie = document.querySelector('.pie');
  var COLOR_INICIO = tema ? tema.getAttribute('content') : '#f1f6f4';
  var COLOR_PIE = '#053f5c';
  function pintarBarras(color) {
    if (tema) tema.setAttribute('content', color);
    raiz.style.backgroundColor = color;
    raiz.style.setProperty('--barra-inferior', color);
  }
  function barrasSegunScroll() {
    if (raiz.classList.contains('menu-abierto')) return;
    var enPie = pie && pie.getBoundingClientRect().top < window.innerHeight;
    pintarBarras(enPie ? COLOR_PIE : COLOR_INICIO);
  }
  barrasSegunScroll();

  var pendiente = false;
  window.addEventListener('scroll', function () {
    if (pendiente) return;
    pendiente = true;
    requestAnimationFrame(function () { estadoNav(); barrasSegunScroll(); pendiente = false; });
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
    pintarBarras('#ffffff');
    boton.setAttribute('aria-expanded', 'true');
    boton.setAttribute('aria-label', 'Cerrar menú');
    var primero = menu.querySelector('a');
    if (primero) setTimeout(function () { primero.focus({ preventScroll: true }); }, 60);
  }
  function cerrar(devolverFoco) {
    raiz.classList.remove('menu-abierto');
    barrasSegunScroll();
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

  /* ----------------------------------------------------------
     VIDEOS — el del inicio corre en silencio y en bucle, y se
     pausa fuera de pantalla. Botón de pausa siempre a mano;
     con movimiento reducido arranca quieto.
  ---------------------------------------------------------- */
  document.querySelectorAll('[data-video]').forEach(function (caja) {
    var v = caja.querySelector('video');
    var btn = caja.querySelector('[data-video-pausa]');
    var son = caja.querySelector('[data-video-sonido]');
    var pausadoAMano = reducido;
    function marcar() { caja.classList.toggle('es-pausa', v.paused); if (btn) btn.setAttribute('aria-label', v.paused ? 'Reproducir video' : 'Pausar video'); }
    v.addEventListener('play', marcar);
    v.addEventListener('pause', marcar);
    if (reducido) { v.removeAttribute('autoplay'); v.pause(); }
    marcar();
    if (btn) btn.addEventListener('click', function () {
      if (v.paused) { pausadoAMano = false; v.play(); } else { pausadoAMano = true; v.pause(); }
    });
    if (son) son.addEventListener('click', function () {
      v.muted = !v.muted;
      caja.classList.toggle('con-sonido', !v.muted);
      son.setAttribute('aria-label', v.muted ? 'Activar sonido' : 'Silenciar');
      if (!v.muted && v.paused) { pausadoAMano = false; v.play(); }
    });
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (en) {
        en.forEach(function (x) {
          if (x.isIntersecting) { if (!pausadoAMano) { var p = v.play(); if (p && p.catch) p.catch(function () {}); } }
          else v.pause();
        });
      }, { threshold: 0.2 }).observe(caja);
    }
  });

  /* ----------------------------------------------------------
     CONTADOR — «+600» sube desde 0 la primera vez que se ve
  ---------------------------------------------------------- */
  document.querySelectorAll('[data-contador]').forEach(function (el) {
    var meta = parseInt(el.getAttribute('data-contador'), 10);
    if (reducido || !('IntersectionObserver' in window)) return;
    el.textContent = '0';
    var io = new IntersectionObserver(function (en) {
      if (!en[0].isIntersecting) return;
      io.disconnect();
      var t0 = performance.now(), dur = 1800;
      (function paso(ahora) {
        var t = Math.min(1, (ahora - t0) / dur);
        el.textContent = Math.round(meta * (1 - Math.pow(1 - t, 3)));
        if (t < 1) requestAnimationFrame(paso);
      })(t0);
    }, { threshold: 0.6 });
    io.observe(el);
  });

  /* ----------------------------------------------------------
     RESEÑAS QUE SE INTERCALAN — fundido cada 6 s; se pausa con el
     dedo o el mouse encima y fuera de pantalla. Los puntos cambian
     a mano. Con movimiento reducido no rota sola.
  ---------------------------------------------------------- */
  document.querySelectorAll('[data-rota]').forEach(function (caja) {
    var items = Array.prototype.slice.call(caja.querySelectorAll('.resena'));
    if (items.length < 2) return;
    var actual = 0, quieto = false, visible = false;
    var puntos = document.createElement('div');
    puntos.className = 'rota__puntos';
    items.forEach(function (it, i) {
      var b = document.createElement('button');
      b.type = 'button';
      b.setAttribute('aria-label', 'Ver reseña ' + (i + 1) + ' de ' + items.length);
      b.addEventListener('click', function () { mostrar(i); });
      puntos.appendChild(b);
    });
    caja.appendChild(puntos);
    function mostrar(i) {
      actual = (i + items.length) % items.length;
      items.forEach(function (it, k) { it.classList.toggle('es-activa', k === actual); it.setAttribute('aria-hidden', k === actual ? 'false' : 'true'); });
      Array.prototype.forEach.call(puntos.children, function (b, k) { b.classList.toggle('es-activo', k === actual); });
    }
    mostrar(0);
    caja.classList.add('rota--activa');
    caja.addEventListener('pointerenter', function () { quieto = true; });
    caja.addEventListener('pointerleave', function () { quieto = false; });
    caja.addEventListener('focusin', function () { quieto = true; });
    caja.addEventListener('focusout', function () { quieto = false; });
    if ('IntersectionObserver' in window) new IntersectionObserver(function (en) { visible = en[0].isIntersecting; }).observe(caja);
    if (!reducido) setInterval(function () { if (visible && !quieto && !document.hidden) mostrar(actual + 1); }, 6000);
  });

  /* ----------------------------------------------------------
     APARICIONES (B) — escalonadas entre hermanos
  ---------------------------------------------------------- */
  var aparecen = document.querySelectorAll('[data-reveal]');
  aparecen.forEach(function (el) {
    if (!el.parentElement) return;
    var hermanos = Array.prototype.filter.call(el.parentElement.children, function (h) {
      return h.hasAttribute('data-reveal');
    });
    el.style.setProperty('--i', hermanos.indexOf(el));
  });

  /* Con GSAP las apariciones van atadas al scroll (avanzan con el dedo y
     retroceden al subir, como en Rhodium). Sin GSAP: una sola vez. */
  var scrub = !!(window.gsap && window.ScrollTrigger) && !reducido;
  if (scrub) {
    raiz.classList.add('reveal-scrub');
    gsap.registerPlugin(ScrollTrigger);
    /* En las pantallas completas, cada elemento aparece mientras entra por abajo del
       celular y termina justo cuando la pantalla llega bajo el nav (Santi, 30/9):
       el botón «Ver…», que es lo último, se completa al llegar al fondo de la pantalla. */
    var altoNav = function () { return nav ? nav.offsetHeight : 60; };
    aparecen.forEach(function (el) {
      var pan = el.closest('.pantalla');
      var st;
      if (pan) {
        st = { trigger: el, start: 'top bottom',
               endTrigger: pan, end: function () { return 'top ' + altoNav() + 'px'; },
               scrub: 0.3, invalidateOnRefresh: true };
      } else {
        var i = parseInt(el.style.getPropertyValue('--i'), 10) || 0;
        var corrimiento = Math.min(i, 4) * 4;
        st = { trigger: el, start: 'top ' + (96 - corrimiento) + '%', end: 'top ' + (72 - corrimiento) + '%', scrub: 0.6 };
      }
      gsap.fromTo(el, { opacity: 0, y: 24 }, { opacity: 1, y: 0, ease: 'none', scrollTrigger: st });
    });
    /* Fotos: se acercan de 1.12 a 1 mientras cruzan la pantalla */
    document.querySelectorAll('.foto img').forEach(function (img) {
      gsap.fromTo(img, { scale: 1.12 }, { scale: 1, ease: 'none',
        scrollTrigger: { trigger: img.parentElement, start: 'top bottom', end: 'center 45%', scrub: 0.6 } });
    });
    window.addEventListener('load', function () { ScrollTrigger.refresh(); });
  } else if ('IntersectionObserver' in window && !reducido) {
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
})();
