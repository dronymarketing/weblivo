/* ============================================================
   DEBUG TEMPORAL — medidor de distancias en vivo
   Pedido por el cliente para confirmar en el celular real la
   distancia (px) entre antetítulo / título / párrafo / botón de
   "Quiénes somos" y "Proyectos". Dibuja etiquetas rojas con el
   número de píxeles, recalculadas en cada frame.
   SACAR este archivo y su <script> en index.html una vez confirmado.
   ============================================================ */
(function () {
  'use strict';

  var ESTILO_ID = 'debug-medidas-estilo';
  if (!document.getElementById(ESTILO_ID)) {
    var estilo = document.createElement('style');
    estilo.id = ESTILO_ID;
    estilo.textContent =
      '.debug-medida{position:absolute;z-index:99999;background:#ff2d55;' +
      'color:#fff;font:700 11px/1.4 monospace;padding:1px 6px;' +
      'border-radius:3px;pointer-events:none;white-space:nowrap;' +
      'box-shadow:0 1px 3px rgba(0,0,0,.4);}' +
      '.debug-medida__linea{position:absolute;z-index:99998;left:0;' +
      'right:0;border-top:1px dashed #ff2d55;pointer-events:none;}';
    document.head.appendChild(estilo);
  }

  var BLOQUES = [
    { seccion: '#nosotros .nosotros__intro', nombre: 'nosotros' },
    { seccion: '#proyectos .encabezado', nombre: 'proyectos' }
  ];
  var FILAS = ['.antetitulo', 'h2', 'p:not(.antetitulo)', '.btn'];

  function etiqueta(id) {
    var el = document.getElementById(id);
    if (!el) {
      el = document.createElement('div');
      el.id = id;
      el.className = 'debug-medida';
      document.body.appendChild(el);
    }
    return el;
  }
  function linea(id) {
    var el = document.getElementById(id);
    if (!el) {
      el = document.createElement('div');
      el.id = id;
      el.className = 'debug-medida__linea';
      document.body.appendChild(el);
    }
    return el;
  }

  function medirBloque(bloque) {
    var sec = document.querySelector(bloque.seccion);
    if (!sec) return;
    var secRect = sec.getBoundingClientRect();
    var prevBottom = secRect.top;

    FILAS.forEach(function (sel, i) {
      var el = sec.querySelector(sel);
      if (!el) return;
      var rect = el.getBoundingClientRect();
      var gap = Math.round(rect.top - prevBottom);

      var id = 'debug-medida-' + bloque.nombre + '-' + i;
      var lbl = etiqueta(id);
      lbl.textContent = gap + 'px';
      lbl.style.top = (window.scrollY + prevBottom + gap / 2 - 9) + 'px';
      lbl.style.left = Math.max(4, rect.left - 60) + 'px';

      var idLinea = 'debug-linea-' + bloque.nombre + '-' + i;
      var ln = linea(idLinea);
      ln.style.top = (window.scrollY + prevBottom) + 'px';

      prevBottom = rect.bottom;
    });
  }

  function medirTodo() {
    BLOQUES.forEach(medirBloque);
    requestAnimationFrame(medirTodo);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { requestAnimationFrame(medirTodo); });
  } else {
    requestAnimationFrame(medirTodo);
  }
})();
