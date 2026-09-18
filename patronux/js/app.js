/* ============================================================
   PATRONUX S.A.
   Paquete de animación «Realevate», implementado sin librerías:
   A preloader con marco · G texto por palabras · I marquee ·
   J color por categoría · K hero que crece.

   Este archivo se carga en el <head> SIN defer, a propósito: la clase
   .js tiene que estar puesta antes del primer pintado, o los bloques
   con reveal se ven un instante y recién después desaparecen.
   Todo lo que toca el DOM espera a DOMContentLoaded.
   ============================================================ */
(function () {
  'use strict';

  var raiz = document.documentElement;
  raiz.classList.add('js');

  var quieto = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  document.addEventListener('DOMContentLoaded', function () {

    /* ----------------------------------------------------------
       Alto real de la ventana.
       Chrome Android no siempre dispara resize cuando la barra de
       direcciones aparece o se esconde, pero sí visualViewport.resize.
       ---------------------------------------------------------- */
    function fijarAltoReal() {
      var alto = window.visualViewport ? window.visualViewport.height : window.innerHeight;
      raiz.style.setProperty('--vh100', alto + 'px');
    }
    fijarAltoReal();
    window.addEventListener('resize', fijarAltoReal);
    window.addEventListener('orientationchange', fijarAltoReal);
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', fijarAltoReal);
    }

    /* ----------------------------------------------------------
       A · Preloader con marco que se abre
       Solo existe si este JS lo crea. Una vez por sesión.
       Tope duro por setTimeout: si algo falla, igual se va.
       ---------------------------------------------------------- */
    (function preloader() {
      if (quieto) return;
      try {
        if (sessionStorage.getItem('patronux-visto')) return;
        sessionStorage.setItem('patronux-visto', '1');
      } catch (e) { /* modo privado: se muestra igual, una sola vez */ }

      var capa = document.createElement('div');
      capa.className = 'preloader';
      capa.setAttribute('aria-hidden', 'true');
      capa.innerHTML =
        '<div class="preloader__caja">' +
          '<img class="preloader__foto" src="img/marquee.jpg" alt="">' +
          '<p class="preloader__marca">Patronux S.A.</p>' +
          '<p class="preloader__n">0</p>' +
        '</div>';
      document.body.appendChild(capa);

      // Contador de 0 a 100 mientras dura la cortina
      var num = capa.querySelector('.preloader__n');
      var arranque = performance.now();
      (function contar(ahora) {
        var t = Math.min(1, ((ahora || arranque) - arranque) / 1300);
        num.textContent = Math.round(t * 100);
        if (t < 1) requestAnimationFrame(contar);
      })();

      var fuera = false;
      function sacar() {
        if (fuera) return;
        fuera = true;
        capa.classList.add('es-fuera');
        setTimeout(function () {
          if (capa.parentNode) capa.parentNode.removeChild(capa);
          arrancarTitular();
        }, 950);
      }

      requestAnimationFrame(function () { capa.classList.add('es-listo'); });
      setTimeout(sacar, 1400);
      setTimeout(sacar, 3500);   // tope duro
    })();

    /* ----------------------------------------------------------
       HEADER — fondo sólido a los 80px
       ---------------------------------------------------------- */
    var header = document.querySelector('.header');
    var menu = document.querySelector('.menu');
    var boton = document.querySelector('.hamburguesa');

    function estadoHeader() {
      if (!header) return;
      header.classList.toggle('es-solido', window.scrollY > 80);
    }
    estadoHeader();

    /* ----------------------------------------------------------
       MENÚ — cortina desde arriba.
       Los ítems entran después del panel, escalonados de a 60ms,
       arrancando 180ms más tarde. Al cerrar se van todos juntos.
       ---------------------------------------------------------- */
    if (menu && boton) {
      var items = menu.querySelectorAll('.menu__item');
      Array.prototype.forEach.call(items, function (el, i) {
        el.style.setProperty('--retraso', (180 + i * 60) + 'ms');
      });

      var abierto = false;

      function abrir() {
        abierto = true;
        menu.classList.add('es-abierto');
        raiz.classList.add('menu-abierto');
        boton.setAttribute('aria-expanded', 'true');
        boton.setAttribute('aria-label', 'Cerrar menú');
        document.body.style.overflow = 'hidden';
        var primero = menu.querySelector('a');
        if (primero) setTimeout(function () { primero.focus(); }, 200);
        pintarBarras();
      }

      function cerrar(devolverFoco) {
        abierto = false;
        menu.classList.remove('es-abierto');
        raiz.classList.remove('menu-abierto');
        boton.setAttribute('aria-expanded', 'false');
        boton.setAttribute('aria-label', 'Abrir menú');
        document.body.style.overflow = '';
        Array.prototype.forEach.call(items, function (el) {
          el.style.setProperty('--retraso', '0ms');
        });
        setTimeout(function () {
          Array.prototype.forEach.call(items, function (el, i) {
            el.style.setProperty('--retraso', (180 + i * 60) + 'ms');
          });
        }, 400);
        if (devolverFoco) boton.focus();
        pintarBarras();
      }

      boton.addEventListener('click', function () {
        abierto ? cerrar(false) : abrir();
      });

      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && abierto) cerrar(true);
      });

      // El menú se cierra ANTES de que arranque el scroll: si no, se ve
      // el scroll a través del panel abierto.
      Array.prototype.forEach.call(menu.querySelectorAll('a'), function (a) {
        a.addEventListener('click', function () { cerrar(false); });
      });
    }

    /* ----------------------------------------------------------
       G · El titular del hero se arma por palabras
       ---------------------------------------------------------- */
    var titular = document.querySelector('[data-palabras]');
    if (titular) {
      var texto = titular.textContent.trim();
      titular.textContent = '';
      texto.split(/\s+/).forEach(function (p, i) {
        var env = document.createElement('span');
        env.className = 'palabra';
        var en = document.createElement('i');
        en.textContent = p;
        en.style.setProperty('--retraso', (i * 90) + 'ms');
        env.appendChild(en);
        titular.appendChild(env);
        titular.appendChild(document.createTextNode(' '));
      });
    }

    function arrancarTitular() {
      if (titular) titular.classList.add('es-dentro');
    }
    // Si no hubo preloader (segunda visita en la sesión, o reduced motion),
    // el titular entra igual.
    var hayPreloader = document.querySelector('.preloader');
    if (!hayPreloader) setTimeout(arrancarTitular, 120);

    /* ----------------------------------------------------------
       Reveals al entrar en pantalla
       ---------------------------------------------------------- */
    var porRevelar = document.querySelectorAll('[data-reveal]');
    if ('IntersectionObserver' in window && porRevelar.length) {
      var obs = new IntersectionObserver(function (entradas) {
        entradas.forEach(function (e) {
          if (!e.isIntersecting) return;
          e.target.classList.add('visible');
          obs.unobserve(e.target);
        });
      }, { threshold: 0.15 });

      Array.prototype.forEach.call(porRevelar, function (el) {
        var grupo = el.parentElement ? el.parentElement.querySelectorAll(':scope > [data-reveal]') : [el];
        var i = Array.prototype.indexOf.call(grupo, el);
        el.style.setProperty('--retraso', (Math.max(i, 0) * 90) + 'ms');
        obs.observe(el);
      });
    } else {
      Array.prototype.forEach.call(porRevelar, function (el) { el.classList.add('visible'); });
    }

    /* ----------------------------------------------------------
       J · Color por categoría
       Cada sección con data-cat tiñe la página entera cuando pasa
       por el medio de la pantalla.
       ---------------------------------------------------------- */
    var estilos = getComputedStyle(raiz);
    var base = {
      color: estilos.getPropertyValue('--texto').trim(),
      suave: estilos.getPropertyValue('--texto-suave').trim()
    };

    function colorDe(nombre) {
      if (!nombre) return base;
      var c = estilos.getPropertyValue('--cat-' + nombre).trim();
      var s = estilos.getPropertyValue('--cat-' + nombre + '-suave').trim();
      return c ? { color: c, suave: s || base.suave } : base;
    }

    function aplicarCategoria(nombre) {
      var c = colorDe(nombre);
      raiz.style.setProperty('--cat', c.color);
      raiz.style.setProperty('--cat-suave', c.suave);
    }
    aplicarCategoria(null);

    var conCat = document.querySelectorAll('[data-cat]');
    if ('IntersectionObserver' in window && conCat.length) {
      var activas = [];
      var obsCat = new IntersectionObserver(function (entradas) {
        entradas.forEach(function (e) {
          var n = e.target.getAttribute('data-cat');
          var i = activas.indexOf(e.target);
          if (e.isIntersecting && i === -1) activas.push(e.target);
          if (!e.isIntersecting && i !== -1) activas.splice(i, 1);
        });
        // La última que entró manda
        var ultima = activas[activas.length - 1];
        aplicarCategoria(ultima ? ultima.getAttribute('data-cat') : null);
        pintarBarras();
      }, { rootMargin: '-45% 0px -45% 0px' });

      Array.prototype.forEach.call(conCat, function (el) { obsCat.observe(el); });
    }

    /* ----------------------------------------------------------
       K · Hero que crece con el scroll
       Escala 2 sobre 110svh, con 5svh de pausa al final: sin la pausa
       el efecto termina de golpe y se siente cortado.
       ---------------------------------------------------------- */
    var crece = document.querySelector('.crece');
    var marco = crece ? crece.querySelector('.crece__marco') : null;
    var pie = crece ? crece.querySelector('.crece__pie') : null;

    function actualizarCrece() {
      if (!crece || !marco) return;
      if (quieto) { marco.style.setProperty('--escala', 1); return; }

      var caja = crece.getBoundingClientRect();
      var alto = window.innerHeight;
      var recorrido = caja.height - alto;
      if (recorrido <= 0) return;

      var avance = (0 - caja.top) / recorrido;
      avance = Math.min(1, Math.max(0, avance));

      // La pausa del final: el crecimiento termina antes que el recorrido.
      // Sin ella el efecto termina de golpe y se siente cortado.
      var svhRec = parseFloat(estilos.getPropertyValue('--hero-crece-recorrido')) || 70;
      var svhPau = parseFloat(estilos.getPropertyValue('--hero-crece-pausa')) || 5;
      var pausa = svhPau / (svhRec + svhPau);
      var t = Math.min(1, avance / (1 - pausa));

      // La escala que hace que la foto termine a sangre, cubriendo la
      // pantalla exacta. offsetWidth/Height no los afecta el transform.
      var escalaMax = Math.max(
        window.innerWidth / marco.offsetWidth,
        window.innerHeight / marco.offsetHeight
      ) * 1.02;
      marco.style.setProperty('--escala', (1 + (escalaMax - 1) * t).toFixed(4));
      if (pie) pie.style.setProperty('--pie-op', (1 - t * 0.8).toFixed(3));
    }

    /* ----------------------------------------------------------
       Barras del sistema
       Arriba: la sección que cruza y = 0. Abajo: la que cruza y = alto - 1.
       ---------------------------------------------------------- */
    var metaTema = document.querySelector('meta[name="theme-color"]');
    var conFondo = document.querySelectorAll('[data-bg]');

    function fondoEn(y) {
      var elegido = null;
      Array.prototype.forEach.call(conFondo, function (el) {
        var c = el.getBoundingClientRect();
        if (c.top <= y && c.bottom > y) elegido = el;
      });
      if (!elegido) return null;
      var n = elegido.getAttribute('data-bg');
      if (n === 'tinta') return estilos.getPropertyValue('--texto').trim();
      if (n === 'alt')   return estilos.getPropertyValue('--fondo-alt').trim();
      if (n === 'cat')   return colorDe(elegido.getAttribute('data-cat')).color;
      return estilos.getPropertyValue('--fondo').trim();
    }

    // Un color es oscuro si su luminancia relativa es baja. Se usa para
    // decidir si el header va en blanco o en navy.
    function esOscuro(color) {
      if (!color) return false;
      var m = color.match(/^#([0-9a-f]{6})$/i);
      var r, g, b;
      if (m) {
        var v = parseInt(m[1], 16);
        r = (v >> 16) & 255; g = (v >> 8) & 255; b = v & 255;
      } else {
        m = color.match(/(\d+)[,\s]+(\d+)[,\s]+(\d+)/);
        if (!m) return false;
        r = +m[1]; g = +m[2]; b = +m[3];
      }
      return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255 < 0.5;
    }

    function pintarBarras() {
      var abiertoMenu = menu && menu.classList.contains('es-abierto');
      var arriba = abiertoMenu ? estilos.getPropertyValue('--texto').trim() : fondoEn(0);
      var abajo  = abiertoMenu ? estilos.getPropertyValue('--texto').trim()
                               : fondoEn(window.innerHeight - 1);
      if (metaTema && arriba) metaTema.setAttribute('content', arriba);
      if (abajo) raiz.style.setProperty('--barra-inferior', abajo);

      // Sobre un bloque de color oscuro, el logo navy no se lee.
      if (header && !abiertoMenu) {
        header.classList.toggle('sobre-oscuro', esOscuro(fondoEn(header.offsetHeight / 2)));
      }
    }

    /* ----------------------------------------------------------
       Un solo listener de scroll, con rAF y passive
       ---------------------------------------------------------- */
    var pendiente = false;
    function alScrollear() {
      if (pendiente) return;
      pendiente = true;
      requestAnimationFrame(function () {
        pendiente = false;
        estadoHeader();
        actualizarCrece();
        pintarBarras();
      });
    }

    window.addEventListener('scroll', alScrollear, { passive: true });
    window.addEventListener('resize', alScrollear);
    actualizarCrece();
    pintarBarras();
  });
})();
