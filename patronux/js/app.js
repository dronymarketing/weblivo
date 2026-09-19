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

  // Se decide acá, antes del primer pintado, si va la cortina: el <style>
  // crítico del head pinta el fondo navy en cuanto aparece la clase.
  var vaPreloader = false;
  if (!quieto && /(^|\/)(index\.html)?$/.test(location.pathname)) {
    try {
      vaPreloader = !sessionStorage.getItem('patronux-visto');
      if (vaPreloader) sessionStorage.setItem('patronux-visto', '1');
    } catch (e) {
      vaPreloader = true;   // modo privado: se muestra igual
    }
  }
  if (vaPreloader) raiz.classList.add('preloader-pendiente');

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
       A · Preloader — mecánica y tiempos del site-preloader de RE.
       Pasan cinco fotos, cada una abriéndose con clip-path desde el
       centro mientras baja de scale 1.5, y el contador salta a los
       valores medidos en vez de correr parejo: así la espera se lee
       como una carga real y no como un relleno.
       Curvas de GSAP pasadas a cubic-bezier:
         power4.out (.22,1,.36,1) · expo.out (.16,1,.3,1)
       ---------------------------------------------------------- */
    (function preloader() {
      if (!vaPreloader) { setTimeout(abrirHero, 60); return; }

      // Los tiempos de RE dejaban la cortina 4,2s en pantalla. Se conserva
      // la mecánica y se acorta el paso: la entrada cierra en ~3s.
      var T = {
        imageDelay:    300,   // antes de la primera foto
        paso:          420,   // counterTickDuration
        counterEnter:  600,
        exitRevealDelay: 400,
        bgWipe:       1200,
        morphDelay:    100,
        morph:        1100   // el viaje del centro al hueco del hero
      };
      var PASOS = [27, 42, 68, 92, 99];   // counterSteps de RE
      var FOTOS = ['img/pre-1.jpg?v=13', 'img/pre-2.jpg?v=13', 'img/pre-3.jpg?v=13',
                   'img/pre-4.jpg?v=13', 'img/marquee.jpg?v=13'];

      var capa = document.createElement('div');
      capa.className = 'preloader';
      capa.setAttribute('aria-hidden', 'true');

      var frames = FOTOS.map(function (src) {
        return '<div class="preloader__frame"><img src="' + src + '" alt="" decoding="async"></div>';
      }).join('');

      var digito = '<span class="preloader__digito"><i>' +
        '0123456789'.split('').map(function (d) { return '<b>' + d + '</b>'; }).join('') +
        '</i></span>';

      capa.innerHTML =
        '<div class="preloader__fondo"></div>' +
        '<p class="preloader__marca">Patronux S.A.</p>' +
        '<div class="preloader__frames">' + frames + '</div>' +
        '<div class="preloader__contador">' + digito + digito + '</div>';
      // La foto de la cortina espera CENTRADA en la pantalla, y al salir
      // viaja hasta el hueco que le toca en el hero. Es un solo plano que
      // se acomoda: por eso el relevo no se nota.
      var marco = capa.querySelector('.preloader__frames');
      var slot  = document.querySelector('.hero__hueco');

      function poner(r) {
        if (!marco || !r || !r.width) return;
        marco.style.setProperty('--pre-top',   r.top.toFixed(1) + 'px');
        marco.style.setProperty('--pre-left',  r.left.toFixed(1) + 'px');
        marco.style.setProperty('--pre-ancho', r.width.toFixed(1) + 'px');
        marco.style.setProperty('--pre-alto',  r.height.toFixed(1) + 'px');
      }
      // Partida: centrada, con el tamaño que va a tener en el hero.
      function centro() {
        var d = slot ? slot.getBoundingClientRect() : null;
        var lado = d && d.width ? d.width : Math.min(window.innerWidth, window.innerHeight) * 0.45;
        return { top: (window.innerHeight - lado) / 2,
                 left: (window.innerWidth - lado) / 2,
                 width: lado, height: lado };
      }
      // Llegada: el hueco del hero, tal cual está en pantalla.
      function destino() { return slot ? slot.getBoundingClientRect() : null; }

      function centrar() { poner(centro()); }
      centrar();
      window.addEventListener('resize', centrar);

      document.body.appendChild(capa);
      centrar();
      // La barra de Android va navy mientras dura la cortina. Se pinta acá
      // y no con pintarBarras() porque esto corre antes de que el resto del
      // archivo declare sus variables.
      raiz.classList.add('cortina');
      var metaAhora = document.querySelector('meta[name="theme-color"]');
      if (metaAhora) {
        metaAhora.setAttribute('content',
          getComputedStyle(raiz).getPropertyValue('--texto').trim() || '#1F2B5E');
      }

      var cajas = capa.querySelectorAll('.preloader__frame');
      var rodillos = capa.querySelectorAll('.preloader__digito i');

      function marcar(n) {
        rodillos[0].style.setProperty('--n', Math.floor(n / 10));
        rodillos[1].style.setProperty('--n', n % 10);
      }
      marcar(0);

      // Cada foto que entra empuja el contador a su escalón
      PASOS.forEach(function (valor, i) {
        setTimeout(function () {
          if (cajas[i]) cajas[i].classList.add('es-visible');
          marcar(valor);
        }, T.imageDelay + i * T.paso);
      });

      var finPasos = T.imageDelay + (PASOS.length - 1) * T.paso + T.counterEnter;

      var fuera = false;
      function sacar() {
        if (fuera) return;
        fuera = true;
        window.removeEventListener('resize', centrar);

        // Mientras dura el morph la foto del hero sigue tapada: si se
        // abriera ya, se verían dos — la que viaja y la que espera.
        raiz.classList.add('hubo-preloader');
        // El fondo navy del <html> se saca ACÁ, con la cortina todavía
        // cubriendo todo: si se saca al final, la cortina sube sobre una
        // página igual de navy y no revela nada — el sitio aparecía de
        // golpe recién al terminar el barrido.
        raiz.classList.remove('preloader-pendiente');
        capa.classList.add('es-fuera');

        // El destino se fija en el cuadro siguiente: en el mismo, el
        // navegador recalcula una sola vez y no habría transición.
        requestAnimationFrame(function () {
          requestAnimationFrame(function () { poner(destino()); });
        });

        // El hero abre mientras la cortina todavía se está yendo.
        setTimeout(abrirHero, T.morphDelay);

        // Relevo: cuando la foto aterriza en el hueco, la del hero se
        // descubre ahí mismo, sin animación. Las dos quedan superpuestas e
        // idénticas hasta que la capa se va, al terminar el barrido: si se
        // sacara con el relevo, el fondo se cortaría al 92% del recorrido.
        setTimeout(function () { raiz.classList.add('foto-entregada'); }, T.morph);
        setTimeout(function () {
          if (capa.parentNode) capa.parentNode.removeChild(capa);
          raiz.classList.remove('cortina');
          pintarBarras();
        }, T.bgWipe);
      }

      setTimeout(sacar, finPasos + T.exitRevealDelay);
      setTimeout(sacar, 7000);   // tope duro
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

      // El morph del ícono vive en js/hamburguesa.js, que carga aparte
      // porque arrastra una librería. Se le avisa con un evento: si no
      // llegó a cargar, el menú funciona igual.
      function avisar() {
        document.dispatchEvent(new CustomEvent('menu:cambio', {
          detail: { abierto: abierto }
        }));
      }

      function abrir() {
        abierto = true;
        menu.classList.add('es-abierto');
        raiz.classList.add('menu-abierto');
        boton.setAttribute('aria-expanded', 'true');
        boton.setAttribute('aria-label', 'Cerrar menú');
        document.body.style.overflow = 'hidden';
        var primero = menu.querySelector('a');
        if (primero) setTimeout(function () { primero.focus(); }, 200);
        avisar();
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
        avisar();
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

    // Abre el hero: la foto se descubre con clip-path, el marquee se
    // revela desde abajo y el resto entra escalonado detrás.
    function abrirHero() {
      raiz.classList.add('listo');
      if (titular) titular.classList.add('es-dentro');
    }
    // Si no hubo preloader (segunda visita en la sesión, o reduced motion),
    // el titular entra igual.

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
       CONTADORES — los números suben al entrar en pantalla.
       El valor final ya está escrito en el HTML: sin JS, o con el
       movimiento reducido, se ve igual pero quieto.
       ---------------------------------------------------------- */
    var contadores = document.querySelectorAll('[data-contador]');
    if (contadores.length && !quieto && 'IntersectionObserver' in window) {
      var CUENTA_MS = 1600;
      var suave = function (x) { return 1 - Math.pow(1 - x, 4); };   // power4.out

      function contar(el) {
        var destino = parseFloat(el.getAttribute('data-contador'));
        if (isNaN(destino)) return;
        var pre = el.getAttribute('data-prefijo') || '';
        var suf = el.getAttribute('data-sufijo') || '';
        var inicio = null;
        function paso(ts) {
          if (inicio === null) inicio = ts;
          var avance = Math.min((ts - inicio) / CUENTA_MS, 1);
          var valor = Math.round(destino * suave(avance));
          el.textContent = pre + valor.toLocaleString('es-UY') + suf;
          if (avance < 1) requestAnimationFrame(paso);
        }
        requestAnimationFrame(paso);
      }

      var obsCuenta = new IntersectionObserver(function (entradas) {
        entradas.forEach(function (e) {
          if (!e.isIntersecting) return;
          obsCuenta.unobserve(e.target);
          contar(e.target);
        });
      }, { threshold: 0.6 });

      Array.prototype.forEach.call(contadores, function (el) {
        // Se pone en cero recién acá: si el JS no corre, el número queda
        // en su valor final en vez de quedar en cero para siempre.
        var pre = el.getAttribute('data-prefijo') || '';
        el.textContent = pre + '0' + (el.getAttribute('data-sufijo') || '');
        obsCuenta.observe(el);
      });
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
       K · La foto del hero crece hasta la pantalla entera.
       Es UNA sola foto: la misma que descansa sobre el marquee. RE anima
       width y height de la caja (no un scale), así el object-fit
       reencuadra y el final es el viewport exacto en cualquier pantalla.
       ---------------------------------------------------------- */
    var stage  = document.querySelector('.hero-stage');
    var visual = document.querySelector('.hero__visual');
    var hueco  = document.querySelector('.hero__hueco');

    // La caja de partida se mide UNA vez, con el hero en su posición
    // inicial. El hueco viaja con el scroll, así que leerlo en cada
    // cuadro haría interpolar contra una base que se mueve.
    var heroEl = document.querySelector('.hero-stage .hero');
    var base = null, baseAncho = 0;
    function medirBase() {
      var r = hueco.getBoundingClientRect();
      var hr = heroEl.getBoundingClientRect();
      // Coordenadas relativas al hero, que es el padre posicionado.
      base = {
        w: r.width, h: r.height,
        x: r.left - hr.left, y: r.top - hr.top,
        heroX: hr.left, heroY: hr.top
      };
      baseAncho = window.innerWidth;
    }

    function colocarVisual() {
      if (!visual || !hueco || !stage) return;
      if (quieto) return;

      var alto = window.innerHeight;

      // Avance del crecimiento dentro del scroll que reservó el stage
      var caja = stage.getBoundingClientRect();
      var recorrido = caja.height - alto;
      var avance = recorrido > 0 ? (0 - caja.top) / recorrido : 0;
      avance = Math.min(1, Math.max(0, avance));

      if (!base || baseAncho !== window.innerWidth) {
        if (avance > 0) return;   // esperamos a estar arriba para medir
        medirBase();
      }
      var h = base;

      // La pausa del final: el crecimiento termina antes que el recorrido,
      // así el efecto no corta de golpe.
      var svhRec = parseFloat(estilos.getPropertyValue('--hero-crece-recorrido')) || 70;
      var svhPau = parseFloat(estilos.getPropertyValue('--hero-crece-pausa')) || 5;
      var t = Math.min(1, avance / (1 - svhPau / (svhRec + svhPau)));

      // Al avance 0 la foto calza en su hueco sobre el marquee; al 1
      // ocupa la ventana completa. Todo relativo al hero: cuando el stage
      // termina y el hero se despega, la foto sube con él y deja pasar la
      // sección siguiente en vez de quedar clavada encima.
      var x1 = -h.heroX, y1 = -h.heroY;
      visual.style.width  = (h.w + (window.innerWidth - h.w) * t).toFixed(1) + 'px';
      visual.style.height = (h.h + (alto - h.h) * t).toFixed(1) + 'px';
      visual.style.left   = (h.x + (x1 - h.x) * t).toFixed(1) + 'px';
      visual.style.top    = (h.y + (y1 - h.y) * t).toFixed(1) + 'px';

      // El texto se retira mientras la foto toma la pantalla
      raiz.style.setProperty('--hero-op', (1 - Math.min(1, t * 1.6)).toFixed(3));

      // El velo navy NO acompaña al crecimiento: la foto crece limpia, se
      // sostiene a pantalla completa y recién se tiñe cuando empieza a
      // irse. Mientras el stage dura, el hero está pegado arriba y esto da
      // 0; después sube y la foto se va oscureciendo al salir.
      var heroTop = heroEl.getBoundingClientRect().top;
      var salida = heroEl.offsetHeight > 0 ? -heroTop / heroEl.offsetHeight : 0;
      salida = Math.min(1, Math.max(0, salida * 1.8));
      raiz.style.setProperty('--hero-velo', salida.toFixed(3));
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
      var navy = estilos.getPropertyValue('--texto').trim();
      // Con la cortina puesta la pantalla es navy de arriba abajo: la barra
      // del navegador la acompaña, y al terminar vuelve a seguir la página.
      var cortina = raiz.classList.contains('cortina');

      var arriba = (abiertoMenu || cortina) ? navy : fondoEn(0);
      var abajo  = (abiertoMenu || cortina) ? navy : fondoEn(window.innerHeight - 1);
      if (metaTema && arriba) metaTema.setAttribute('content', arriba);
      if (abajo) raiz.style.setProperty('--barra-inferior', abajo);

      // El nav toma el color de la sección que tiene debajo — el mismo que
      // va a la barra del navegador, así las dos se mueven juntas. Y si
      // ese color es oscuro, el logo pasa a blanco para poder leerse.
      if (header && !abiertoMenu) {
        var bajoNav = cortina ? navy : fondoEn(header.offsetHeight / 2);
        if (bajoNav) header.style.setProperty('--header-fondo', bajoNav);
        header.classList.toggle('sobre-oscuro', esOscuro(bajoNav));
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
        colocarVisual();
        pintarBarras();
      });
    }

    window.addEventListener('scroll', alScrollear, { passive: true });
    window.addEventListener('resize', alScrollear);
    colocarVisual();
    pintarBarras();
  });
})();
