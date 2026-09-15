/* ============================================================
   FABIANA MARTÍNEZ — Paquete HB (hba.com), estándar Livo
   Efectos C, D, E, F, H — GSAP + ScrollTrigger + Splide.
   Solo define movimiento. Ni un color ni una tipografía acá:
   esos viven en movil.css/escritorio.css.

   Reglas obligatorias del paquete:
   1. Si GSAP no cargó, no se ejecuta nada de este archivo — el
      contenido ya es visible porque ningún estado "oculto" vive
      en el CSS base (ver efectos.css).
   2. prefers-reduced-motion:reduce apaga las animaciones sin
      esconder nada.
   3. Nunca ScrollSmoother ni Lenis.
   4. Las librerías salen de lib/, no de un CDN.
   ============================================================ */
(function () {
  'use strict';

  if (typeof window.gsap === 'undefined' || typeof window.ScrollTrigger === 'undefined') {
    return; // sin GSAP no se toca nada: el contenido queda en su estado final
  }

  gsap.registerPlugin(ScrollTrigger);

  var reducido = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Habilita cualquier estado inicial que un efecto necesite ocultar.
  // Nunca al revés: el CSS base no depende de esta clase para verse bien.
  document.documentElement.classList.add('js-efectos');

  if (reducido) {
    document.documentElement.classList.add('motion-reducido');
    // No se crea ningún ScrollTrigger: todo queda tal cual está en el HTML/CSS.
    initCarruselFundido(); // el carrusel H no es una animación de scroll, solo cambia de foto
    return;
  }

  initRevealScroll();     // C
  initHeroFijo();          // D
  initGaleriaAnclada();    // E (infraestructura genérica, sin uso en esta página por ahora)
  initPropiedadFija();     // D + C combinados, como en hba.com
  initSeccionesColor();    // F
  initCarruselFundido();   // H

  /* ============================================================
     C · REVEAL ATADO AL SCROLL
     clip-path inset(0 0 100% 0) → inset(0)
     imagen: scale(1.15 en móvil / 1.3 en escritorio) → scale(1)
     ============================================================ */
  function initRevealScroll() {
    var els = document.querySelectorAll('.reveal-scroll');
    if (!els.length) return;

    var esMovil = window.matchMedia('(max-width:899px)').matches;
    var zoomInicial = esMovil ? 1.15 : 1.3;

    els.forEach(function (el) {
      var img = el.querySelector('img, .reveal-scroll__img');
      if (!img) return;

      /* Los 4 valores en ambos extremos (nunca "inset(0)" solo): con
         conteos distintos GSAP no interpola de a poco, salta recién al
         final del scroll en vez de revelarse en el trayecto. */
      gsap.set(el, { clipPath: 'inset(0% 0% 100% 0%)' });
      gsap.set(img, { scale: zoomInicial, transformOrigin: 'center center' });

      gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: 'top 90%',
          end: 'top 38%',
          scrub: 0.5
        }
      })
        .to(el, { clipPath: 'inset(0% 0% 0% 0%)', ease: 'none' }, 0)
        .to(img, { scale: 1, ease: 'none' }, 0);
    });
  }

  /* ============================================================
     D · HERO FIJO
     El hero queda position:fixed; las secciones siguientes le
     pasan por encima. Se inyecta un spacer con el alto del hero
     para no perder ese tramo de scroll.

     Nota: en algún momento se agregó acá un listener de
     visualViewport.resize (para mantener el spacer sincronizado con
     --vh100 si la barra de direcciones de Chrome Android se esconde
     a mitad de scroll). Esa versión, aunque parecía más correcta en
     teoría, rompió en el celular real el efecto de "Quiénes somos"
     que sí estaba confirmado como correcto. Se revirtió a esta
     versión (solo resize/orientationchange) porque es la que el
     cliente confirmó que funciona. Si se vuelve a tocar este
     archivo, NO reagregar ese listener sin volver a confirmar en un
     celular real primero — ver CONTEXTO.md, sección 6.
     ============================================================ */
  function initHeroFijo() {
    var hero = document.querySelector('.hero--fijo');
    if (!hero) return;

    var spacer = document.createElement('div');
    spacer.className = 'hero--fijo-spacer';
    spacer.setAttribute('aria-hidden', 'true');
    hero.parentNode.insertBefore(spacer, hero.nextSibling);

    function medir() {
      var alto = hero.getBoundingClientRect().height;
      spacer.style.height = alto + 'px';
    }
    medir();

    hero.style.position = 'fixed';
    hero.style.top = '0';
    hero.style.left = '0';
    hero.style.right = '0';

    window.addEventListener('resize', medir);
    window.addEventListener('orientationchange', medir);
  }

  /* ============================================================
     E · GALERÍA ANCLADA (+ C combinado, así se mide en HBA: cada
     foto entra tapando a la anterior con el mismo reveal de
     máscara + zoom del efecto C, no un crossfade plano)
     pin:true, scrub:.4, recorrido +=90% (nunca 140%: en móvil
     con el pulgar se hace eterno).
     ============================================================ */
  function initGaleriaAnclada() {
    var galerias = document.querySelectorAll('.galeria-anclada');
    if (!galerias.length) return;

    var esMovil = window.matchMedia('(max-width:899px)').matches;
    var zoomInicial = esMovil ? 1.15 : 1.3;

    galerias.forEach(function (galeria) {
      var items = Array.prototype.slice.call(
        galeria.querySelectorAll('.galeria-anclada__item')
      );
      if (items.length < 2) return;

      gsap.set(galeria, { position: 'relative' });
      gsap.set(items, { position: 'absolute', inset: 0 });

      // el primero ya se ve entero; el resto arranca tapado y
      // acercado, como cualquier foto en reveal-scroll (efecto C)
      for (var i = 1; i < items.length; i++) {
        var contenido = items[i].querySelector('.galeria-anclada__foto') || items[i];
        gsap.set(items[i], { clipPath: 'inset(0% 0% 100% 0%)' });
        gsap.set(contenido, { scale: zoomInicial });
      }

      var tl = gsap.timeline({
        scrollTrigger: {
          trigger: galeria,
          pin: true,
          scrub: 0.4,
          end: '+=90%'
        }
      });

      for (var j = 1; j < items.length; j++) {
        var foto = items[j].querySelector('.galeria-anclada__foto') || items[j];
        tl.to(items[j], { clipPath: 'inset(0% 0% 0% 0%)', ease: 'none' }, j - 1)
          .to(foto, { scale: 1, ease: 'none' }, j - 1);
      }
    });
  }

  /* ============================================================
     Propiedad destacada con foto fija — fullscreen, como siempre
     estuvo: la foto base, el velo, las 2 fotos extra y el texto viven
     todos juntos en la misma pantalla fija (pin:true de ScrollTrigger,
     nunca position:sticky — con varios bloques fullscreen apilados,
     sticky lo resuelve el hilo de compositor del navegador por su
     cuenta, aparte del hilo que corre esta animación, y en un flick
     fuerte los dos hilos se desincronizan un instante y se ve un
     bloque montado sobre otro).
     El velo de marca y el panel con las 2 fotos (no 2 fotos sueltas,
     una sola pieza) arrancan juntos y con el mismo ritmo: el fondo se
     va oscureciendo GRADUALMENTE mientras las fotos suben, y ambos
     llegan a destino (velo a 0.8 de opacidad, no sólido del todo —
     se sigue viendo un poco la foto de fondo; panel en su lugar) al
     mismo tiempo. Recién ahí aparece el texto (zona, nombre, precio,
     botón).
     ============================================================ */
  function initPropiedadFija() {
    var bloques = document.querySelectorAll('.propiedad-fija');
    if (!bloques.length) return;

    var navAlto = parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue('--nav-alto')
    ) || 60;

    bloques.forEach(function (bloque) {
      var tinte = bloque.querySelector('.propiedad-fija__tinte');
      var pin = bloque.querySelector('.propiedad-fija__pin');
      var panel = bloque.querySelector('.propiedad-fija__extras');
      var info = bloque.querySelector('.propiedad-fija__info');
      if (!tinte || !pin) return;

      gsap.set(tinte, { force3D: true });

      /* El panel entero (las 2 fotos + su fondo sólido) arranca
         desplazado lo suficiente para quedar tapado por el
         overflow:hidden del pin (su borde superior por debajo del
         borde inferior del pin, con margen), así entra literalmente
         desde abajo de la pantalla, como una sola pieza — nunca cada
         foto por separado. Sin easing (ease:'none'): el movimiento
         sigue al scroll 1 a 1, sin acelerar ni desacelerar. */
      if (panel) {
        var pinRect = pin.getBoundingClientRect();
        var panelRect = panel.getBoundingClientRect();
        var desplazo = Math.round(pinRect.bottom - panelRect.top) + 40;
        gsap.set(panel, { y: desplazo, force3D: true });
      }
      if (info) gsap.set(info, { autoAlpha: 0, y: 24, force3D: true });

      /* scrub:0.3 (no scrub:true) — scrub:true ata la posición al
         evento de scroll en crudo, que en muchos celulares no dispara
         en cada frame: se traduce en saltos entre posiciones en vez
         de un movimiento continuo ("con lag, plástico"). Un scrub
         bajo interpola por rAF entre esos eventos, fluido en
         cualquier dispositivo, y sigue sin generar el "colazo" de
         movimiento propio al soltar el scroll (eso pasaba con
         valores de scrub altos, no con cualquier número distinto de
         true).
         start:'top top+='+navAlto — el pin queda fijo justo donde su
         borde superior toca esa línea (navAlto px debajo del tope de
         la pantalla), debajo del nav, no tapado por él.
         end:'+=160%' — recorrido de scroll extra mientras dura el
         pin fullscreen (ajustado de a poco: 180% → 150% → 160%). */
      var tl = gsap.timeline({
        scrollTrigger: {
          trigger: pin,
          start: 'top top+=' + navAlto,
          end: '+=160%',
          pin: true,
          anticipatePin: 1,
          scrub: 0.3
        }
      });

      /* El velo y el panel arrancan juntos (misma posición 0 en la
         timeline) y con la MISMA duration — antes el velo tenía mucha
         menos duration que el panel, así que se ponía sólido casi de
         entrada y se quedaba así, marrón, durante todo el resto de la
         subida de las fotos. Ahora se tiñen al mismo ritmo: el fondo
         se va oscureciendo gradualmente MIENTRAS suben, y llega a
         sólido recién cuando el panel también termina de llegar. El
         texto sigue apareciendo recién ahí (posición explícita =
         duration del panel, ya que panel y texto ya no quedan uno
         atrás del otro por default). */
      var duracionPanel = panel ? 2.2 : 0.3;
      tl.to(tinte, { opacity: 0.8, ease: 'none', duration: duracionPanel }, 0);
      if (panel) tl.to(panel, { y: 0, ease: 'none', duration: duracionPanel }, 0);
      if (info) tl.to(info, { autoAlpha: 1, y: 0, ease: 'none', duration: 0.3 }, duracionPanel);
    });
  }

  /* ============================================================
     F · SECCIONES CON NOMBRE DE COLOR
     El color vive en el nombre de la clase (.tema-crema,
     .tema-terracota, ...), definido en efectos.css — cada
     sección ya pinta su propio fondo opaco (necesario para que
     el efecto D la tape correctamente contra el hero fijo). Lo
     único que el CSS no puede resolver solo es el meta
     theme-color del navegador: acá se lee --tema-fondo de la
     sección centrada y se lo pasamos, sin hardcodear ningún
     color en este archivo.
     ============================================================ */
  function initSeccionesColor() {
    var secciones = Array.prototype.slice.call(
      document.querySelectorAll('[class*="tema-"]')
    );
    var metaTema = document.querySelector('meta[name="theme-color"]');
    if (!secciones.length || !metaTema) return;

    secciones.forEach(function (sec) {
      ScrollTrigger.create({
        trigger: sec,
        start: 'top 50%',
        end: 'bottom 50%',
        onEnter: function () { aplicar(sec); },
        onEnterBack: function () { aplicar(sec); }
      });
    });

    function aplicar(sec) {
      var fondo = getComputedStyle(sec).getPropertyValue('--tema-fondo').trim();
      if (fondo) metaTema.setAttribute('content', fondo);
    }
  }

  /* ============================================================
     H · CARRUSEL CON FUNDIDO
     Splide con type:'fade' (más sobrio que el coverflow 3D,
     mejor en móvil que un slide lateral).
     ============================================================ */
  function initCarruselFundido() {
    if (typeof window.Splide === 'undefined') return;

    var carruseles = document.querySelectorAll('.splide');
    carruseles.forEach(function (el) {
      new Splide(el, {
        type: 'fade',
        rewind: true,
        arrows: el.dataset.arrows !== 'false',
        pagination: el.dataset.pagination !== 'false',
        speed: reducido ? 0 : 600
      }).mount();
    });
  }
})();
