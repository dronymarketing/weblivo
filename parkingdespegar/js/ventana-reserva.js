/* ============================================================
   PARKING DESPEGAR — La reserva en una ventana
   Cualquier link a reservar.html (botón Reservar, menú, promociones)
   abre la reserva encima de la página, sin salir de donde estaba.
   Adentro va la misma reservar.html (en un marco); al pagar, la
   pasarela se abre en la ventana entera. Sin JS, el link lleva a la página.
   ============================================================ */
(function () {
  'use strict';
  if (/\/reservar\.html$/.test(location.pathname)) return;
  var raiz = document.documentElement;
  var capa = null, foco = null;

  function abrir(destino) {
    if (capa) return;
    foco = document.activeElement;
    capa = document.createElement('div');
    capa.className = 'vr-capa';
    capa.innerHTML = '<div class="vr-marco" role="dialog" aria-modal="true" aria-label="Reservá tu lugar">' +
      '<p class="vr-marco__cargando">Abriendo la reserva…</p>' +
      '<iframe title="Reserva online de Parking Despegar" src="' + destino + '"></iframe></div>';
    document.body.appendChild(capa);
    raiz.classList.add('reserva-abierta');
    var marco = capa.querySelector('iframe');
    marco.addEventListener('load', function () {
      capa && capa.classList.add('es-lista');
      try { marco.contentWindow.focus(); } catch (e) { /* nada */ }
    });
    requestAnimationFrame(function () { capa && capa.classList.add('es-visible'); });
    capa.addEventListener('click', function (e) { if (e.target === capa) cerrar(); });
  }
  function cerrar() {
    if (!capa) return;
    var c = capa; capa = null;
    c.classList.remove('es-visible');
    raiz.classList.remove('reserva-abierta');
    setTimeout(function () { c.remove(); }, 250);
    if (foco && foco.focus) foco.focus({ preventScroll: true });
  }

  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href]');
    if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    var u = new URL(a.href, location.href);
    if (u.origin !== location.origin || !/\/reservar\.html$/.test(u.pathname)) return;
    e.preventDefault();
    abrir(u.pathname + u.search);
  });
  window.addEventListener('message', function (e) {
    if (e.origin !== location.origin || !e.data) return;
    if (e.data.pd === 'cerrar-reserva') cerrar();
    /* La ventana mide lo justo para su contenido (en la computadora; en el celular es pantalla completa) */
    if (e.data.pd === 'alto-reserva' && capa && e.data.alto > 200) capa.querySelector('.vr-marco').style.setProperty('--alto-reserva', e.data.alto + 'px');
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') cerrar(); });
})();
