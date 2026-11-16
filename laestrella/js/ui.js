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

  /* ---------- Fotos de productos ---------- */
  UI.base = /\/(caja|panel)(\/|$)/.test(location.pathname) ? '../' : '';
  UI.foto = function (p, extra) {
    var c = 'foto ' + (extra || '');
    return p && p.foto ? '<img class="' + c + '" src="' + UI.base + UI.esc(p.foto) + '" alt="" loading="lazy" width="128" height="128">' : '<span class="' + c + ' foto--vacia" aria-hidden="true"></span>';
  };
  document.addEventListener('error', function (e) {
    var t = e.target; if (t && t.tagName === 'IMG' && t.classList.contains('foto')) { var s = document.createElement('span'); s.className = t.className + ' foto--vacia'; s.setAttribute('aria-hidden', 'true'); t.replaceWith(s); }
  }, true);

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

  /* Ejecuta una acción que puede ser inmediata (modo de ejemplo) o ir al servidor (modo conectado).
     Siempre devuelve una promesa {ok, valor|error}. Mientras espera, no deja mandar la orden dos veces. */
  var enCurso = false;
  UI.hacer = function (fn, okMsg) {
    if (enCurso) return Promise.resolve({ ok: false, ignorado: true });
    enCurso = true; document.body.classList.add('ocupado');
    var fin = function () { enCurso = false; document.body.classList.remove('ocupado'); };
    return new Promise(function (res) {
      var bien = function (v) { fin(); if (okMsg) UI.toast(okMsg, 'ok'); res({ ok: true, valor: v }); };
      var mal = function (e) { fin(); if (!(e && e.aviso)) { UI.toast((e && e.message) || 'No se pudo hacer.', 'error'); UI.beep(false); } res({ ok: false, error: e }); };
      try { var r = fn(); if (r && typeof r.then === 'function') r.then(bien, mal); else bien(r); } catch (e) { mal(e); }
    });
  };

  /* ---------- Consulta de códigos de barras en bases públicas (Open Food Facts y hermanas) ----------
     Solo se envía el número del código. Devuelve {nombre, completo, marca, cat} o null (sin internet, no existe o tardó demasiado). */
  var CAT_PALABRAS = [['lacteo', /dair|milk|cheese|yogurt|butter|cream/], ['fiambre', /charcuter|ham|sausage|salami|cold-cut/], ['carne', /meat|beef|poultry|chicken|pork/], ['fruta', /fruit|vegetable/], ['panader', /bread|bakery|cake|pastr/], ['bebida', /beverage|water|soda|juice|beer|wine/], ['limpieza', /clean|detergent|laundry|bleach/], ['perfumer', /hygiene|soap|toothpaste|shampoo|cosmetic|beauty|deodorant|diaper/], ['almac', /grocer|biscuit|cookie|cracker|pasta|rice|flour|oil|sugar|salt|cereal|coffee|tea|yerba|canned|sauce|snack|legume|spice/]];
  function normalizar(t) { return String(t || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ''); }
  UI.nombreCorto = function (t, max) {
    t = String(t || '').replace(/\s+/g, ' ').trim(); if (t.length <= max) return t;
    var c = t.slice(0, max + 1), i = c.lastIndexOf(' '); return (i > 12 ? c.slice(0, i) : t.slice(0, max)).trim();
  };
  function sugerirCategoria(tags) {
    var tx = (tags || []).join(' ').toLowerCase(), mias = (window.LE && LE.categorias) ? LE.categorias() : [];
    for (var i = 0; i < CAT_PALABRAS.length; i++) if (CAT_PALABRAS[i][1].test(tx)) { var m = mias.filter(function (c) { return normalizar(c).indexOf(CAT_PALABRAS[i][0]) === 0; })[0]; if (m) return m; }
    return '';
  }
  UI.consultarCodigo = function (codigo) {
    if (!window.fetch || (window.LE && LE.red && LE.red.offline) || (navigator.onLine === false)) return Promise.resolve(null);
    var hosts = ['world.openfoodfacts.org', 'world.openproductsfacts.org', 'world.openbeautyfacts.org'], limite = Date.now() + 6000;
    function probar(k) {
      if (k >= hosts.length || Date.now() > limite) return Promise.resolve(null);
      var ac = window.AbortController ? new AbortController() : null, t = setTimeout(function () { if (ac) ac.abort(); }, 3500);
      return fetch('https://' + hosts[k] + '/api/v2/product/' + encodeURIComponent(codigo) + '.json?fields=product_name,product_name_es,brands,quantity,categories_tags', { signal: ac && ac.signal })
        .then(function (r) { clearTimeout(t); return r.ok ? r.json() : null; })
        .then(function (j) {
          var p = j && j.status === 1 && j.product; if (!p) return probar(k + 1);
          var base = String(p.product_name_es || p.product_name || '').trim(); if (!base) return probar(k + 1);
          var marca = String(p.brands || '').split(',')[0].trim(), cant = String(p.quantity || '').trim();
          var completo = base; if (marca && normalizar(base).indexOf(normalizar(marca)) < 0) completo += ' ' + marca; if (cant && normalizar(completo).indexOf(normalizar(cant.replace(/\s/g, ''))) < 0) completo += ' ' + cant;
          return { nombre: UI.nombreCorto(completo, 28), completo: completo, marca: marca, cat: sugerirCategoria(p.categories_tags), fuente: hosts[k].replace('world.', '') };
        })
        .catch(function () { clearTimeout(t); return probar(k + 1); });
    }
    return probar(0);
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
  UI.exigirSesion = function (roles, destino) {
    var u = window.LE && LE.usuario();
    if (!u || (roles && roles.indexOf(u.rol) < 0)) { location.replace(destino || '../index.html'); return null; }
    return u;
  };
  UI.rolNombre = function (r) { return r === 'admin' ? 'Administración' : 'Caja'; };

  window.UI = UI;
})();
