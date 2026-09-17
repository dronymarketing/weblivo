/* ============================================================
   ANANIKIAN — BORRADOR
   Scroll nativo. Sin librerías de scroll.
   ============================================================ */
(function () {
  'use strict';

  var nav        = document.querySelector('.nav');
  var hero       = document.querySelector('.hero');
  var destacadas = document.querySelector('#destacadas');
  var menu       = document.querySelector('.menu');
  var abrirBtn   = document.querySelector('.nav__hamburguesa');
  var cerrarBtn  = document.querySelector('.menu__cerrar');
  var WA_NUMERO_FABIANA = '59894236869';

  /* ----------------------------------------------------------
     ALTO REAL DE PANTALLA — Chrome Android no siempre aplica
     100svh en el primer pintado (la barra de direcciones tarda
     en asentarse). Se mide con innerHeight y se pisa por CSS
     var(--vh100, 100svh): sigue siendo min-height, nunca height.
  ---------------------------------------------------------- */
  function fijarAltoReal() {
    var alto = window.visualViewport ? window.visualViewport.height : window.innerHeight;
    document.documentElement.style.setProperty('--vh100', alto + 'px');
  }
  fijarAltoReal();
  window.addEventListener('resize', fijarAltoReal);
  window.addEventListener('orientationchange', fijarAltoReal);
  /* window.resize no siempre dispara cuando Chrome Android
     esconde/muestra la barra de direcciones al scrollear —
     visualViewport.resize sí, y es lo que de verdad cambia el
     alto visible en ese momento. */
  if (window.visualViewport) {
    window.visualViewport.addEventListener('resize', fijarAltoReal);
  }

  /* ----------------------------------------------------------
     NAV — tres estados
     tope   : arriba del todo, transparente, logo blanco
     glass  : scrolleando todavía dentro del hero
     solido : el hero ya quedó arriba

     #destacadas (las 3 propiedades con foto fija fullscreen) cuenta
     también como zona "tope": esas fotos ya no le restan su alto al
     nav (ver .propiedad-fija__pin en movil.css) — ocupan la pantalla
     de punta a punta, así que el nav tiene que flotar transparente
     encima, igual que sobre el hero, en vez de quedar sólido tapando
     un pedazo de la foto.
  ---------------------------------------------------------- */
  function estadoNav() {
    if (!nav) return;
    var y = window.scrollY || window.pageYOffset;
    var finHero = hero ? hero.offsetHeight - nav.offsetHeight : 0;
    var clase;

    var sobreDestacadas = destacadas &&
      y + nav.offsetHeight > destacadas.offsetTop &&
      y < destacadas.offsetTop + destacadas.offsetHeight;

    if (sobreDestacadas)  clase = 'es-tope';
    else if (!hero)       clase = 'es-solido';
    else if (y < 24)      clase = 'es-tope';
    else if (y < finHero) clase = 'es-glass';
    else                  clase = 'es-solido';

    nav.classList.remove('es-tope', 'es-glass', 'es-solido');
    nav.classList.add(clase);

    // el menú desplegado copia el glass mientras esté sobre el hero o Destacadas
    if (menu) menu.classList.toggle('sobre-hero', clase !== 'es-solido');
  }

  var pendiente = false;
  function alScrollear() {
    if (pendiente) return;
    pendiente = true;
    requestAnimationFrame(function () { estadoNav(); pendiente = false; });
  }
  window.addEventListener('scroll', alScrollear, { passive: true });
  window.addEventListener('resize', estadoNav);
  estadoNav();

  /* ----------------------------------------------------------
     MENÚ HAMBURGUESA
  ---------------------------------------------------------- */
  function abrirMenu(abrir) {
    if (!menu) return;
    menu.classList.toggle('abierto', abrir);
    if (abrirBtn) abrirBtn.setAttribute('aria-expanded', abrir ? 'true' : 'false');
    document.body.style.overflow = abrir ? 'hidden' : '';
    document.body.classList.toggle('menu-abierto', abrir);
  }
  if (abrirBtn)  abrirBtn.addEventListener('click', function () { abrirMenu(true); });
  if (cerrarBtn) cerrarBtn.addEventListener('click', function () { abrirMenu(false); });
  if (menu) {
    menu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { abrirMenu(false); });
    });
  }
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') abrirMenu(false);
  });

  /* ----------------------------------------------------------
     BUSCADOR DEL NAV
     Solo diseño por ahora: abre/cierra y se puede escribir, pero
     no busca nada todavía — se conecta cuando exista la página de
     listados de propiedades.
  ---------------------------------------------------------- */
  var buscarBtn  = document.querySelector('.nav__buscar');
  var buscador   = document.querySelector('.nav__buscador');
  var buscadorIn = buscador ? buscador.querySelector('input') : null;

  function abrirBuscador(abrir) {
    if (!buscador) return;
    buscador.classList.toggle('abierto', abrir);
    buscador.setAttribute('aria-hidden', abrir ? 'false' : 'true');
    if (buscarBtn) buscarBtn.setAttribute('aria-expanded', abrir ? 'true' : 'false');
    if (abrir && buscadorIn) buscadorIn.focus();
  }
  if (buscarBtn) {
    buscarBtn.addEventListener('click', function () {
      abrirBuscador(!buscador.classList.contains('abierto'));
    });
  }
  if (buscador) {
    buscador.addEventListener('submit', function (e) { e.preventDefault(); });
  }
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') abrirBuscador(false);
  });

  /* submenú Proyectos dentro del menú */
  var desplegable = document.querySelector('.menu__desplegable');
  if (desplegable) {
    desplegable.addEventListener('click', function () {
      var abierto = desplegable.getAttribute('aria-expanded') === 'true';
      desplegable.setAttribute('aria-expanded', abierto ? 'false' : 'true');
      var sub = document.getElementById(desplegable.getAttribute('aria-controls'));
      if (sub) sub.classList.toggle('abierto', !abierto);
    });
  }

  /* ----------------------------------------------------------
     BUSCADOR — más filtros
  ---------------------------------------------------------- */
  var masBtn = document.querySelector('.buscador__mas');
  if (masBtn) {
    masBtn.addEventListener('click', function () {
      var abierto = masBtn.getAttribute('aria-expanded') === 'true';
      masBtn.setAttribute('aria-expanded', abierto ? 'false' : 'true');
      var panel = document.getElementById(masBtn.getAttribute('aria-controls'));
      if (panel) panel.classList.toggle('abierto', !abierto);
    });
  }

  /* el borrador no busca de verdad */
  var form = document.querySelector('.buscador');
  if (form && form.tagName === 'FORM') {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      window.location.href = 'venta.html';
    });
  }

  /* ----------------------------------------------------------
     CARRUSEL DEL HERO — 6 localidades
  ---------------------------------------------------------- */
  var fotos  = Array.prototype.slice.call(document.querySelectorAll('.hero__foto'));
  var puntos = Array.prototype.slice.call(document.querySelectorAll('.hero__punto'));
  var zonaEl = document.querySelector('.hero__zona');
  var bajaEl = document.querySelector('.hero__bajada');
  var chipWa = document.getElementById('hero-chip-wa');
  var actual = 0, reloj = null;

  var lento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function irA(i) {
    if (!fotos.length) return;
    actual = (i + fotos.length) % fotos.length;
    if (hero) hero.classList.add('cambia');
    setTimeout(function () {
      fotos.forEach(function (f, n) { f.classList.toggle('activa', n === actual); });
      puntos.forEach(function (p, n) {
        p.classList.toggle('activo', n === actual);
        p.setAttribute('aria-current', n === actual ? 'true' : 'false');
      });
      var f = fotos[actual];
      if (zonaEl && f.dataset.zona) zonaEl.textContent = f.dataset.zona;
      if (bajaEl && f.dataset.bajada) bajaEl.textContent = f.dataset.bajada;
      if (chipWa && f.dataset.zona) {
        var mensaje = 'Hola Fabiana, quiero consultarte sobre la propiedad ' + f.dataset.zona;
        chipWa.href = 'https://wa.me/' + WA_NUMERO_FABIANA + '?text=' + encodeURIComponent(mensaje);
      }
      if (hero) hero.classList.remove('cambia');
    }, 260);
  }

  function arrancar() {
    if (lento || fotos.length < 2) return;
    detener();
    reloj = setInterval(function () { irA(actual + 1); }, 6000);
  }
  function detener() { if (reloj) { clearInterval(reloj); reloj = null; } }

  puntos.forEach(function (p, n) {
    p.addEventListener('click', function () { irA(n); arrancar(); });
  });
  document.addEventListener('visibilitychange', function () {
    document.hidden ? detener() : arrancar();
  });

  if (fotos.length) { irA(0); arrancar(); }

  /* ----------------------------------------------------------
     FOTOS QUE NO CARGAN → queda el bloque de color con rótulo
  ---------------------------------------------------------- */
  document.querySelectorAll('img[data-fallback]').forEach(function (img) {
    img.addEventListener('error', function () {
      img.style.display = 'none';
      var cont = img.closest('[data-rotulo]');
      if (cont) cont.classList.add('sin-foto');
    });
  });

  /* ----------------------------------------------------------
     APARICIONES AL SCROLL
     El opacity 0 lo pone acá: si este archivo no carga, se ve todo.
  ---------------------------------------------------------- */
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

  /* ----------------------------------------------------------
     CONTADORES QUE SUBEN AL ENTRAR EN PANTALLA (cifras de Quiénes somos)
  ---------------------------------------------------------- */
  var contadores = document.querySelectorAll('.cifra__num[data-target]');
  function pintarContador(el) {
    el.textContent = (el.dataset.prefix || '') + el.dataset.target + (el.dataset.suffix || '');
  }
  if (contadores.length) {
    if ('IntersectionObserver' in window && !lento) {
      var obsContadores = new IntersectionObserver(function (entradas) {
        entradas.forEach(function (e) {
          if (!e.isIntersecting) return;
          animarContador(e.target);
          obsContadores.unobserve(e.target);
        });
      }, { threshold: 0.4 });
      contadores.forEach(function (el) { obsContadores.observe(el); });
    } else {
      contadores.forEach(pintarContador);
    }
  }
  function animarContador(el) {
    var meta = parseInt(el.dataset.target, 10);
    var prefijo = el.dataset.prefix || '';
    var sufijo = el.dataset.suffix || '';
    var dur = 1200;
    var inicio = null;
    function paso(marca) {
      if (!inicio) inicio = marca;
      var progreso = Math.min((marca - inicio) / dur, 1);
      el.textContent = prefijo + Math.round(meta * progreso) + sufijo;
      if (progreso < 1) requestAnimationFrame(paso);
    }
    requestAnimationFrame(paso);
  }

  /* ----------------------------------------------------------
     FAVORITOS — de muestra, solo el estado visual
  ---------------------------------------------------------- */
  document.querySelectorAll('.tarjeta__fav').forEach(function (b) {
    b.addEventListener('click', function () {
      var on = b.getAttribute('aria-pressed') === 'true';
      b.setAttribute('aria-pressed', on ? 'false' : 'true');
      b.style.color = on ? '' : '#DA3B30';
    });
  });

  /* ----------------------------------------------------------
     GALERÍA DE LA FICHA — clic en miniatura cambia la foto grande
  ---------------------------------------------------------- */
  var fotoGrande = document.querySelector('.ficha__foto-principal img');
  var miniaturas  = document.querySelectorAll('.ficha__miniatura');
  if (fotoGrande && miniaturas.length) {
    miniaturas.forEach(function (mini) {
      mini.addEventListener('click', function () {
        var grande = mini.dataset.grande;
        if (!grande) return;
        fotoGrande.src = grande;
        miniaturas.forEach(function (m) { m.classList.toggle('activa', m === mini); });
      });
    });
  }

  /* ----------------------------------------------------------
     FORMULARIOS SIN BACKEND — contacto, login de área clientes
     Cualquier <form class="mock-form"> muestra el .form-ok que
     le sigue en el DOM en lugar de enviar de verdad.
  ---------------------------------------------------------- */
  document.querySelectorAll('.mock-form').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var ok = form.nextElementSibling;
      form.hidden = true;
      if (ok && ok.classList.contains('form-ok')) ok.hidden = false;
    });
  });

  /* ----------------------------------------------------------
     MODAL "AGENDAR VISITA" — arma el mensaje y abre WhatsApp
  ---------------------------------------------------------- */
  var modalVelo   = document.querySelector('.modal-velo');
  var modal       = document.querySelector('.modal');
  var abrirModal  = document.querySelectorAll('.js-agendar');
  var cerrarModal = document.querySelectorAll('.js-cerrar-modal');
  var formAgendar = document.getElementById('form-agendar');

  function toggleModal(abrir) {
    if (!modal || !modalVelo) return;
    modal.classList.toggle('abierto', abrir);
    modalVelo.classList.toggle('abierto', abrir);
    document.body.style.overflow = abrir ? 'hidden' : '';
  }
  abrirModal.forEach(function (b) { b.addEventListener('click', function () { toggleModal(true); }); });
  cerrarModal.forEach(function (b) { b.addEventListener('click', function () { toggleModal(false); }); });
  if (modalVelo) modalVelo.addEventListener('click', function () { toggleModal(false); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') toggleModal(false);
  });

  if (formAgendar) {
    formAgendar.addEventListener('submit', function (e) {
      e.preventDefault();
      var propiedad = formAgendar.dataset.propiedad || 'la propiedad';
      var nombre    = formAgendar.querySelector('[name="nombre"]');
      var telefono  = formAgendar.querySelector('[name="telefono"]');
      var dia       = formAgendar.querySelector('[name="dia"]');
      var texto = 'Hola, soy ' + (nombre ? nombre.value : '') +
        '. Quiero agendar una visita para ' + propiedad +
        (dia && dia.value ? ' (día preferido: ' + dia.value + ')' : '') +
        '. Mi teléfono de contacto es ' + (telefono ? telefono.value : '') + '.';
      window.open('https://wa.me/' + WA_NUMERO_FABIANA + '?text=' + encodeURIComponent(texto), '_blank', 'noopener');
      toggleModal(false);
      formAgendar.reset();
    });
  }

  /* ----------------------------------------------------------
     DESTACADAS — la fila de specs (precio/zona/dorm/baños/m²)
     SIEMPRE tiene que entrar en un solo renglón, centrada, sin
     salirse del margen lateral del sitio — nunca puede pasar a un
     segundo renglón, sea cual sea el largo del texto de cada
     propiedad (varía: "Cordón" no es lo mismo que "Chacra Jacinta en
     José Ignacio") o el ancho de la pantalla. Una regla de CSS fija
     no alcanza para garantizar eso con contenido variable, así que
     se mide el ancho real contra el disponible y, si no entra, se va
     achicando en cascada — letra, espacio entre ítems, tamaño del
     ícono y espacio ícono-texto, en ese orden — hasta que entra todo.
     Nunca al revés, nunca más grande que los valores base del CSS.
  ---------------------------------------------------------- */
  function ajustarSpecsDestacadas() {
    var pasos = [
      { prop: '--specs-font',    base: 13, min: 9,   paso: 0.5, unidad: 'px' },
      { prop: '--specs-gap',     base: 6,  min: 0,   paso: 1,   unidad: 'px' },
      { prop: '--specs-ico',     base: 14, min: 10,  paso: 1,   unidad: 'px' },
      { prop: '--specs-ico-gap', base: 4,  min: 2,   paso: 1,   unidad: 'px' }
    ];

    document.querySelectorAll('.propiedad-fija__specs').forEach(function (ul) {
      /* flex-wrap:wrap (el de base en el CSS) evita que scrollWidth
         supere a clientWidth — en vez de desbordar, manda los ítems
         que sobran a un segundo renglón. Eso hace que la comparación
         de más abajo nunca detecte el problema. Por eso acá se
         fuerza nowrap primero: así scrollWidth sí refleja el ancho
         real que ocupa el contenido sin cortarlo en renglones, y se
         puede medir de verdad si entra o no. Se deja en nowrap
         siempre — para eso está todo este ajuste, para garantizar
         que jamás pase a un segundo renglón. */
      ul.style.flexWrap = 'nowrap';
      pasos.forEach(function (p) { ul.style.setProperty(p.prop, p.base + p.unidad); });

      pasos.forEach(function (p) {
        var valor = p.base;
        while (ul.scrollWidth > ul.clientWidth && valor > p.min) {
          valor -= p.paso;
          ul.style.setProperty(p.prop, valor + p.unidad);
        }
      });
    });
  }
  ajustarSpecsDestacadas();
  window.addEventListener('load', ajustarSpecsDestacadas);
  window.addEventListener('resize', ajustarSpecsDestacadas);
  window.addEventListener('orientationchange', ajustarSpecsDestacadas);
  if (window.document.fonts && document.fonts.ready) {
    // Sin esto, si las tipografías propias tardan en cargar, la
    // primera medición puede usar el ancho de una fuente de
    // reemplazo y quedar mal calculada.
    document.fonts.ready.then(ajustarSpecsDestacadas);
  }

})();
