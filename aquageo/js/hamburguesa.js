/* ============================================================
   HAMBURGUESA → X — morph real del trazado, con morphicons.
   La misma librería y el mismo criterio que en fabianamartinez: el
   ícono no rota tres líneas sueltas, se deforma de un trazado al otro.

   Va en un módulo aparte de app.js a propósito. app.js se carga en el
   <head> sin defer porque la clase .js tiene que estar antes del primer
   pintado; esto, en cambio, es una librería de 48 KB que no hace falta
   hasta que alguien toca el menú. Si el módulo no carga, el menú sigue
   funcionando igual: sólo se pierde el morph.
   ============================================================ */
import { createMorph } from './vendor/morphicons/dom.js';

(function () {
  'use strict';

  var MENU_D = 'M4 6h16M4 12h16M4 18h16';
  var X_D    = 'M18 6 6 18M6 6 18 18';

  var trazo = document.getElementById('hamburguesa-trazo');
  if (!trazo) return;

  var morph = createMorph(trazo, MENU_D);

  /* La curva de la cortina (--ease-re, --dur-menu) llevada a JS, para que
     el ícono avance al mismo ritmo que el panel y no por su cuenta. */
  function bezier(p1x, p1y, p2x, p2y) {
    function a(x1, x2) { return 1 - 3 * x2 + 3 * x1; }
    function b(x1, x2) { return 3 * x2 - 6 * x1; }
    function c(x1) { return 3 * x1; }
    function calc(t, x1, x2) { return ((a(x1, x2) * t + b(x1, x2)) * t + c(x1)) * t; }
    function pend(t, x1, x2) { return 3 * a(x1, x2) * t * t + 2 * b(x1, x2) * t + c(x1); }
    return function (x) {
      if (x <= 0) return 0;
      if (x >= 1) return 1;
      var t = x;
      for (var i = 0; i < 8; i++) {
        var dx = calc(t, p1x, p2x) - x;
        if (Math.abs(dx) < 1e-6) break;
        var d = pend(t, p1x, p2x);
        if (Math.abs(d) < 1e-6) break;
        t -= dx / d;
      }
      return calc(t, p1y, p2y);
    };
  }

  var estilos = getComputedStyle(document.documentElement);
  var curva = bezier(.7, .6, 0, 1);                                  // --ease-re
  var DUR = parseFloat(estilos.getPropertyValue('--dur-menu')) || 550;

  var raf = 0;
  function animar(destino) {
    if (raf) cancelAnimationFrame(raf);
    var inicio = null;
    function paso(ts) {
      if (inicio === null) inicio = ts;
      var lineal = Math.min((ts - inicio) / DUR, 1);
      morph.seek(destino, curva(lineal));
      raf = lineal < 1 ? requestAnimationFrame(paso) : 0;
    }
    raf = requestAnimationFrame(paso);
  }

  document.addEventListener('menu:cambio', function (e) {
    animar(e.detail && e.detail.abierto ? X_D : MENU_D);
  });
})();
