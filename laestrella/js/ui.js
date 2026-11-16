/* ============================================================
   LA ESTRELLA — piezas de interfaz compartidas
   (modales, avisos, teclado de PIN, descargas, sonido)
   Los textos que vienen de datos se insertan siempre con esc().
   ============================================================ */
(function () {
  'use strict';
  var UI = {};
  var abiertos = [];

  UI.$ = function (s, r) { return (r || document).querySelector(s); };
  UI.$$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  UI.esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };
  UI.ico = function (n, extra) { return '<svg class="icon ' + (extra || '') + '" aria-hidden="true" focusable="false"><use href="#i-' + n + '"/></svg>'; };
  UI.iniciales = function (n) { var p = String(n).trim().split(/\s+/); return (p[0][0] + (p[1] ? p[1][0] : '')).toUpperCase(); };
  UI.hayModal = function () { return abiertos.length > 0; };

  /* ---------- Modal ---------- */
  UI.modal = function (o) {
    var previo = document.activeElement;
    var el = document.createElement('div'); el.className = 'modal'; el.setAttribute('role', 'dialog'); el.setAttribute('aria-modal', 'true');
    var caja = document.createElement('div'); caja.className = 'modal__caja' + (o.ancha ? ' modal__caja--ancha' : '');
    var cab = '<div class="modal__cab"><h2>' + UI.esc(o.titulo || '') + '</h2>' + (o.sinCerrar ? '' : '<button class="btn btn--icono btn--linea btn--chico" data-cerrar aria-label="Cerrar">' + UI.ico('x') + '</button>') + '</div>';
    caja.innerHTML = cab + '<div class="modal__cuerpo"></div>' + (o.acciones ? '<div class="modal__acciones"></div>' : '');
    el.appendChild(caja);
    var cuerpo = caja.querySelector('.modal__cuerpo');
    if (typeof o.cuerpo === 'string') cuerpo.innerHTML = o.cuerpo; else if (o.cuerpo) cuerpo.appendChild(o.cuerpo);
    var ctl = { el: el, cuerpo: cuerpo, cerrar: cerrar, $: function (s) { return cuerpo.querySelector(s) || caja.querySelector(s); }, $$: function (s) { return UI.$$(s, caja); } };
    function cerrar(v) {
      var i = abiertos.indexOf(ctl); if (i < 0) return; abiertos.splice(i, 1);
      el.remove(); document.removeEventListener('keydown', tecla, true);
      if (previo && previo.focus && document.contains(previo)) { try { previo.focus({ preventScroll: true }); } catch (e) { } }
      if (o.alCerrar) o.alCerrar(v);
    }
    function tecla(e) { if (e.key === 'Escape' && abiertos[abiertos.length - 1] === ctl && !o.sinCerrar) { e.stopPropagation(); cerrar(); } }
    if (o.acciones) {
      var cont = caja.querySelector('.modal__acciones');
      o.acciones.forEach(function (a) {
        var b = document.createElement('button'); b.type = 'button'; b.className = 'btn ' + (a.clase || ''); b.innerHTML = (a.icono ? UI.ico(a.icono) : '') + UI.esc(a.texto);
        if (a.id) b.id = a.id;
        b.addEventListener('click', function () { if (a.accion) { var r = a.accion(ctl, b); if (r === false) return; } if (a.cerrar !== false) cerrar(a.valor); });
        cont.appendChild(b);
      });
    }
    el.addEventListener('click', function (e) { if (e.target === el && !o.sinCerrar && !o.persistente) cerrar(); });
    caja.addEventListener('click', function (e) { if (e.target.closest('[data-cerrar]')) cerrar(); });
    document.body.appendChild(el); abiertos.push(ctl); document.addEventListener('keydown', tecla, true);
    var foco = (o.foco && ctl.$(o.foco)) || caja.querySelector('input:not([type=hidden]), select, textarea'); if (foco) { try { foco.focus({ preventScroll: true }); if (foco.select && o.seleccionar) foco.select(); } catch (e) { } }
    if (o.alAbrir) o.alAbrir(ctl);
    return ctl;
  };

  UI.confirmar = function (titulo, texto, o) {
    o = o || {};
    return new Promise(function (res) {
      UI.modal({
        titulo: titulo, cuerpo: '<p>' + UI.esc(texto) + '</p>', alCerrar: function (v) { res(v === true); },
        acciones: [{ texto: o.cancelar || 'Cancelar', clase: 'btn--linea', valor: false }, { texto: o.ok || 'Confirmar', clase: o.peligro ? 'btn--peligro' : 'btn--tinta', valor: true }]
      });
    });
  };

  UI.toast = function (msg, tipo) {
    var c = UI.$('.toasts'); if (!c) { c = document.createElement('div'); c.className = 'toasts'; c.setAttribute('role', 'status'); c.setAttribute('aria-live', 'polite'); document.body.appendChild(c); }
    var t = document.createElement('div'); t.className = 'toast' + (tipo ? ' toast--' + tipo : ''); t.textContent = msg; c.appendChild(t);
    setTimeout(function () { t.style.transition = 'opacity .3s'; t.style.opacity = '0'; setTimeout(function () { t.remove(); }, 320); }, tipo === 'error' ? 3800 : 2200);
  };

  /* Ejecuta una acción de datos y muestra el error si la regla la rechaza */
  UI.intentar = function (fn, okMsg) {
    try { var r = fn(); if (okMsg) UI.toast(okMsg, 'ok'); return { ok: true, valor: r }; }
    catch (e) { UI.toast(e.message || 'No se pudo hacer.', 'error'); UI.beep(false); return { ok: false, error: e }; }
  };

  /* ---------- Sonido del lector ---------- */
  var audio;
  UI.beep = function (ok) {
    try {
      audio = audio || new (window.AudioContext || window.webkitAudioContext)();
      var o = audio.createOscillator(), g = audio.createGain(); o.connect(g); g.connect(audio.destination);
      o.type = 'sine'; o.frequency.value = ok === false ? 220 : 1040; g.gain.value = .06;
      o.start(); o.stop(audio.currentTime + (ok === false ? .2 : .07));
    } catch (e) { }
  };

  /* ---------- Teclado numérico ---------- */
  UI.teclado = function (alTocar) {
    var d = document.createElement('div'); d.className = 'teclado';
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', 'borrar'].forEach(function (k) {
      var b = document.createElement('button'); b.type = 'button';
      if (k === '') { b.style.visibility = 'hidden'; b.tabIndex = -1; }
      else if (k === 'borrar') { b.innerHTML = UI.ico('delete', 'icon--g'); b.setAttribute('aria-label', 'Borrar'); b.dataset.k = 'borrar'; }
      else { b.textContent = k; b.dataset.k = k; }
      b.addEventListener('click', function () { if (k) alTocar(k); });
      d.appendChild(b);
    });
    return d;
  };

  /* ---------- Formularios ---------- */
  UI.valores = function (ctl) {
    var o = {}; ctl.$$('[name]').forEach(function (i) { o[i.name] = i.type === 'checkbox' ? i.checked : i.value; }); return o;
  };
  UI.opciones = function (lista, sel, conVacio) {
    return (conVacio ? '<option value="">' + UI.esc(conVacio) + '</option>' : '') + lista.map(function (x) {
      var v = typeof x === 'string' ? x : x.id, t = typeof x === 'string' ? x : x.nombre;
      return '<option value="' + UI.esc(v) + '"' + (v === sel ? ' selected' : '') + '>' + UI.esc(t) + '</option>';
    }).join('');
  };
  /* "129,90" o "129.90" → centavos */
  UI.aCentavos = function (s) { s = String(s || '').trim().replace(/\./g, function (m, i, t) { return t.indexOf(',') >= 0 ? '' : '.'; }).replace(',', '.'); var n = parseFloat(s); return isNaN(n) ? 0 : Math.round(n * 100); };
  UI.aNumero = function (s) { var n = parseFloat(String(s || '').trim().replace(',', '.')); return isNaN(n) ? 0 : n; };
  UI.deCentavos = function (c) { return (c / 100).toFixed(2).replace('.', ',').replace(/,00$/, ''); };

  /* ---------- Descargas ---------- */
  UI.descargarCSV = function (nombre, filas) {
    var txt = filas.map(function (f) { return f.map(function (c) { c = String(c == null ? '' : c); return /[;"\n]/.test(c) ? '"' + c.replace(/"/g, '""') + '"' : c; }).join(';'); }).join('\r\n');
    var blob = new Blob(['﻿' + txt], { type: 'text/csv;charset=utf-8' });
    var a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = nombre; document.body.appendChild(a); a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 500);
  };

  /* ---------- Entradas comunes de página ---------- */
  UI.franjaBorrador = function () {
    return '<div class="borrador">BORRADOR · Datos de muestra, solo en este navegador</div>';
  };
  UI.exigirSesion = function (roles, destino) {
    var u = window.LE && LE.usuario();
    if (!u || (roles && roles.indexOf(u.rol) < 0)) { location.replace(destino || '../index.html'); return null; }
    return u;
  };
  UI.rolNombre = function (r) { return r === 'duena' ? 'Dueña' : 'Caja'; };

  window.UI = UI;
})();
