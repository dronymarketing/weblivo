/* ============================================================
   PARKING DESPEGAR — Promociones del inicio
   Trae de la base las promociones vigentes que la dueña marcó para
   la web (panel → Promociones) y las muestra en un carrusel.
   Si no hay ninguna, o la base no responde, la sección no aparece.
   ============================================================ */
(function () {
  'use strict';
  var seccion = document.querySelector('[data-promos]');
  var C = window.PD_CONFIG || {};
  if (!seccion || !C.url || !C.clave || !window.fetch) return;

  var pista = seccion.querySelector('[data-promos-pista]');
  var puntos = seccion.querySelector('[data-promos-puntos]');
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function ico(n) { return '<svg class="ico" aria-hidden="true"><use href="#i-' + n + '"/></svg>'; }
  function fechaCorta(ymd) { var p = String(ymd).split('-'); return p.length === 3 ? +p[2] + '/' + +p[1] : ''; }
  function seguro(url) { return /^https:\/\//.test(url || '') ? url : ''; }

  function tarjeta(p, i) {
    var acciones = '';
    if (p.codigo) {
      acciones += '<span class="promo__codigo"><span>Código</span><strong>' + esc(p.codigo) + '</strong>' +
        '<button type="button" class="promo__copiar" data-copiar="' + esc(p.codigo) + '" aria-label="Copiar el código ' + esc(p.codigo) + '">' + ico('copy') + '</button></span>' +
        '<a class="btn btn--primario" href="reservar.html?promo=' + encodeURIComponent(p.codigo) + '">Usar el código' + ico('arrow-right') + '</a>';
    }
    if (seguro(p.enlace)) acciones += '<a class="btn btn--linea" href="' + esc(seguro(p.enlace)) + '" target="_blank" rel="noopener">' + (p.empresa ? esc(p.empresa) : 'Ver más') + ico('arrow-up-right') + '</a>';
    return '<article class="promo promo--' + (i % 3) + '">' +
      '<div class="promo__cifra"><strong>' + p.porcentaje + '<small>%</small></strong><span>de descuento</span></div>' +
      '<div class="promo__cuerpo">' +
        (p.empresa ? '<p class="antetitulo">' + ico('tag') + esc(p.empresa) + '</p>' : '') +
        '<h3 class="promo__titulo">' + esc(p.titulo) + '</h3>' +
        (p.detalle ? '<p class="promo__detalle">' + esc(p.detalle) + '</p>' : '') +
        (p.hasta ? '<p class="promo__vence">Válida hasta el ' + fechaCorta(p.hasta) + '</p>' : '') +
        (acciones ? '<div class="promo__acciones">' + acciones + '</div>' : '') +
      '</div></article>';
  }

  function actual() {
    var w = pista.firstElementChild ? pista.firstElementChild.getBoundingClientRect().width : 1;
    return Math.round(pista.scrollLeft / (w + 16));
  }
  function marcarPunto() {
    var n = actual();
    Array.prototype.forEach.call(puntos.children, function (b, i) { b.classList.toggle('es-activo', i === n); });
  }

  fetch(C.url.replace(/\/+$/, '') + '/rest/v1/rpc/promociones_web', {
    method: 'POST', headers: { apikey: C.clave, 'Content-Type': 'application/json' }, body: '{}'
  }).then(function (r) { return r.ok ? r.json() : []; }).then(function (lista) {
    if (!Array.isArray(lista) || !lista.length) return;
    pista.innerHTML = lista.map(tarjeta).join('');
    if (lista.length > 1) {
      seccion.querySelector('[data-promos-flechas]').hidden = false;
      puntos.innerHTML = lista.map(function () { return '<span></span>'; }).join('');
      marcarPunto();
    }
    seccion.hidden = false;
    if (window.ScrollTrigger) window.ScrollTrigger.refresh();
  }).catch(function () { /* sin promociones: la sección queda oculta */ });

  pista.addEventListener('scroll', function () { window.requestAnimationFrame(marcarPunto); }, { passive: true });
  seccion.addEventListener('click', function (e) {
    var m = e.target.closest('[data-promos-mover]');
    if (m) {
      var w = pista.firstElementChild.getBoundingClientRect().width + 16;
      pista.scrollBy({ left: +m.getAttribute('data-promos-mover') * w, behavior: 'smooth' });
      return;
    }
    var c = e.target.closest('[data-copiar]');
    if (c && navigator.clipboard) {
      navigator.clipboard.writeText(c.getAttribute('data-copiar')).then(function () {
        c.classList.add('es-copiado'); c.innerHTML = ico('check');
        setTimeout(function () { c.classList.remove('es-copiado'); c.innerHTML = ico('copy'); }, 1600);
      }).catch(function () {});
    }
  });
})();
