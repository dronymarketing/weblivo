/* ============================================================
   LA ESTRELLA — chat de prueba del asistente (panel → Ajustes → Asistente)
   Contesta con los datos de este sistema y con la misma lógica que el asistente de WhatsApp (js/asistente.js).
   ============================================================ */
(function () {
  'use strict';
  if (!window.LE || !window.ASISTENTE) return;
  var A = window.ASISTENTE, DIA = 864e5;

  /* Lo mismo que le devuelve la base al Worker (asistente_consulta), armado con los datos de la pantalla */
  function foto(periodo) {
    var desde = Date.parse(periodo.desde), hasta = Date.parse(periodo.hasta), R = LE.reporte(desde, hasta);
    var porMedio = {}; Object.keys(R.porMedio).forEach(function (m) { if (R.porMedio[m] > 0) porMedio[m] = R.porMedio[m]; });
    var cobros = 0, cobrosN = 0;
    LE.deudores(true).forEach(function (d) { LE.pagosDeudor(d.id).forEach(function (g) { if (g.ts >= desde && g.ts < hasta) { cobros += g.monto; cobrosN++; } }); });
    var top = Object.keys(R.porProd).map(function (k) { var x = R.porProd[k]; return { nombre: x.nombre, cant: x.cant, monto: x.total, unidad: x.unidad }; })
      .sort(function (a, b) { return b.monto - a.monto; }).slice(0, 5);
    var t = LE.turnoAbierto(), caja;
    if (t) caja = { abierta: true, apertura: t.apertura, turno: t.turno, abrio: t.abrio, efectivo: LE.efectivoEsperado(t), ventas: LE.resumenTurno(t).total };
    else {
      var u = LE.turnos().filter(function (x) { return x.cierre; })[0];
      caja = { abierta: false, ultimo: u ? { cierre: u.cierre, esperado: u.esperado, contado: u.contado, cerro: u.cerro } : null };
    }
    var prods = LE.productos(true);
    var sin = prods.filter(function (p) { return p.stock <= 0; }), bajo = prods.filter(function (p) { return p.stock > 0 && p.stock < p.minimo; });
    var deu = LE.deudores().filter(function (d) { return (d.saldo || 0) > 0; }).sort(function (a, b) { return b.saldo - a.saldo; });
    var cs = LE.compras();
    var hoy = new Date(); hoy.setHours(0, 0, 0, 0);
    return {
      quien: (LE.usuario() || {}).nombre || '',
      periodo: { ventas: R.total, tickets: R.tickets, fiado: R.fiado.total, tickets_fiado: R.fiado.tickets, anuladas: R.anuladas, por_medio: porMedio, cobros_deuda: cobros, cobros_deuda_n: cobrosN, top: top },
      caja: caja,
      stock: { sin_stock_n: sin.length, sin_stock: sin.slice(0, 15).map(function (p) { return p.nombre; }), bajo_n: bajo.length, bajo: bajo.slice(0, 15).map(function (p) { return { nombre: p.nombre, stock: p.stock, minimo: p.minimo, unidad: p.unidad }; }) },
      deudores: { n: deu.length, total: deu.reduce(function (a, d) { return a + d.saldo; }, 0), lista: deu.map(function (d) { return { nombre: d.nombre, saldo: d.saldo, limite: d.limite }; }) },
      compras: { sin_recibir: cs.filter(function (c) { return !c.recibida; }).length, sin_pagar: cs.filter(function (c) { return !c.pagada; }).length, sin_pagar_total: cs.filter(function (c) { return !c.pagada; }).reduce(function (a, c) { return a + c.total; }, 0) },
      trabajando: LE.asistencias(hoy.getTime() - DIA, Date.now() + DIA).filter(function (a) { return !a.salida; }).map(function (a) { return { nombre: a.nombre, desde: a.entrada }; })
    };
  }

  function buscar(texto) {
    var q = A.normalizar(texto);
    return LE.productos(true).filter(function (p) { return A.normalizar(p.nombre).indexOf(q) >= 0; }).slice(0, 6)
      .map(function (p) { return { nombre: p.nombre, precio: p.precio, stock: p.stock, minimo: p.minimo, unidad: p.unidad, cat: p.cat }; });
  }

  function contestar(texto) {
    var p = A.interpretar(texto, Date.now());
    if (p.producto) p.encontrados = buscar(p.producto);
    return A.responder(p, foto(p.periodo), Date.now());
  }

  /* *negrita* y _cursiva_ como en WhatsApp */
  function formato(t) {
    return UI.esc(t).replace(/\*([^*\n]+)\*/g, '<strong>$1</strong>').replace(/(^|[\s(])_([^_\n]+)_(?=[\s).,;:!?]|$)/g, '$1<em>$2</em>').replace(/\n/g, '<br>');
  }
  function hora() { var d = new Date(); return ('0' + d.getHours()).slice(-2) + ':' + ('0' + d.getMinutes()).slice(-2); }

  var SUGERENCIAS = ['¿Cuánto vendí hoy?', '¿Cómo está la caja?', '¿Qué falta reponer?', '¿Quién debe?', '¿Qué se vendió más?', '¿Cómo vamos?'];

  /* Dibuja el chat dentro de `el` */
  window.ASISTENTE_CHAT = {
    html: function () {
      return '<div class="wa" id="wa"><div class="wa__cab"><span class="wa__av"><svg class="icon" aria-hidden="true"><use href="#i-star"/></svg></span><div><strong>La Estrella</strong><small>Asistente</small></div></div>' +
        '<div class="wa__msgs" id="wa-msgs" role="log" aria-live="polite"></div>' +
        '<div class="wa__sug" id="wa-sug">' + SUGERENCIAS.map(function (s) { return '<button type="button" class="wa__chip" data-q="' + UI.esc(s) + '">' + UI.esc(s) + '</button>'; }).join('') + '</div>' +
        '<form class="wa__form" id="wa-form" autocomplete="off"><input class="entrada" id="wa-q" name="q" maxlength="200" placeholder="Escribí tu pregunta" aria-label="Pregunta al asistente"><button type="submit" class="btn btn--acento btn--icono" aria-label="Enviar"><svg class="icon" aria-hidden="true"><use href="#i-arrow-up"/></svg></button></form></div>';
    },
    montar: function () {
      var cont = UI.$('#wa-msgs'), form = UI.$('#wa-form'), q = UI.$('#wa-q'), sug = UI.$('#wa-sug');
      if (!cont || cont.dataset.listo) return; cont.dataset.listo = '1';
      function burbuja(texto, mio) {
        var d = document.createElement('div'); d.className = 'wa__m ' + (mio ? 'wa__m--yo' : 'wa__m--ellos');
        d.innerHTML = '<span class="wa__txt">' + formato(texto) + '</span><time>' + hora() + '</time>';
        cont.appendChild(d); cont.scrollTop = cont.scrollHeight; return d;
      }
      function preguntar(texto) {
        texto = String(texto || '').trim(); if (!texto) return;
        burbuja(texto, true); q.value = '';
        var esc = document.createElement('div'); esc.className = 'wa__m wa__m--ellos wa__m--escribe'; esc.innerHTML = '<span class="wa__pts"><i></i><i></i><i></i></span>';
        cont.appendChild(esc); cont.scrollTop = cont.scrollHeight;
        setTimeout(function () {
          cont.removeChild(esc);
          var r; try { r = contestar(texto); } catch (e) { r = 'No pude leer los datos en este momento.'; }
          burbuja(r, false);
        }, 550);
      }
      var h = new Date().getHours(), quien = ((LE.usuario() || {}).nombre || '').split(' ')[0];
      burbuja((h < 6 ? 'Buenas noches' : h < 13 ? 'Buen día' : h < 20 ? 'Buenas tardes' : 'Buenas noches') + (quien ? ' ' + quien : '') + '. Soy el asistente de La Estrella. ¿Qué querés saber? Tocá una de las preguntas de abajo o escribime la tuya.', false);
      form.addEventListener('submit', function (e) { e.preventDefault(); preguntar(q.value); });
      sug.addEventListener('click', function (e) { var b = e.target.closest('[data-q]'); if (b) preguntar(b.getAttribute('data-q')); });
    }
  };
})();
