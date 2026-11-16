/* ============================================================
   LA ESTRELLA — panel de la dueña · núcleo
   Rutas, tablas, gráficos y las vistas Inicio, Ventas y Productos.
   Las vistas de gestión (stock, compras, caja, reportes, equipo,
   ajustes) están en panel-gestion.js y se registran acá.
   ============================================================ */
(function () {
  'use strict';
  var $ = UI.$, esc = UI.esc, F = LE.fmt, ico = UI.ico;
  var usuario = UI.exigirSesion(['duena'], '../index.html'); if (!usuario) return;

  var P = window.PANEL = { rutas: {}, estado: {}, actual: null };
  var DIA = 864e5, DIAS = ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'];

  P.diaCorto = function (ts) { var d = new Date(ts); return DIAS[d.getDay()] + ' ' + d.getDate(); };
  P.est = function (k, ini) { return P.estado[k] || (P.estado[k] = ini || {}); };
  P.rango = function (k) {
    var h0 = LE.inicioDia(Date.now()), d = new Date();
    return { hoy: [h0, h0 + DIA], ayer: [h0 - DIA, h0], '7': [h0 - 6 * DIA, h0 + DIA], '30': [h0 - 29 * DIA, h0 + DIA], mes: [new Date(d.getFullYear(), d.getMonth(), 1).getTime(), h0 + DIA] }[k];
  };
  P.chipsRango = function (sel, extra) {
    var o = [['hoy', 'Hoy'], ['ayer', 'Ayer'], ['7', '7 días'], ['30', '30 días'], ['mes', 'Este mes']];
    return o.map(function (x) { return '<button type="button" class="chip" data-rango="' + x[0] + '" aria-pressed="' + (sel === x[0]) + '">' + x[1] + '</button>'; }).join('');
  };
  P.pct = function (a, b) { return b ? Math.round(a * 100 / b) + ' %' : '—'; };

  /* ---------- Estructura de cada vista ---------- */
  P.cab = function (titulo, sub, acciones, filtros) {
    $('#vista').innerHTML = '<div class="pagina__cab"><div><h1>' + esc(titulo) + '</h1>' + (sub ? '<p>' + sub + '</p>' : '') + '</div>' + (acciones ? '<div class="pagina__acciones">' + acciones + '</div>' : '') + '</div>' +
      (filtros ? '<div class="filtros" id="filtros">' + filtros + '</div>' : '') + '<div id="zona"></div>';
  };
  P.zona = function (html) { $('#zona').innerHTML = html; if (P.alPintar) { var f = P.alPintar; P.alPintar = null; f(); } };

  /* Tabla que en el celular se vuelve una lista de tarjetas.
     cols: [{t: título, c: clase de celda, f: function(fila)→html, l: etiqueta móvil}] */
  P.tabla = function (cols, filas, o) {
    o = o || {};
    if (!filas.length) return '<div class="tarjeta"><p class="vacio">' + esc(o.vacio || 'No hay nada para mostrar con este filtro.') + '</p></div>';
    var th = cols.map(function (c) { return '<th scope="col"' + (c.c && /derecha/.test(c.c) ? ' class="t-derecha"' : '') + '>' + esc(c.t || '') + '</th>'; }).join('');
    var tr = filas.map(function (r) {
      var cls = o.clase ? o.clase(r) : '';
      return '<tr' + (cls ? ' class="' + cls + '"' : '') + (o.attrs ? ' ' + o.attrs(r) : '') + '>' + cols.map(function (c) {
        return '<td class="' + (c.c || '') + '"' + (c.l !== false && c.t && !/titulo|derecha|acciones/.test(c.c || '') ? ' data-label="' + esc(c.l || c.t) + '"' : '') + '>' + c.f(r) + '</td>';
      }).join('') + '</tr>';
    }).join('');
    return '<div class="tarjeta tarjeta--plana"><table class="tabla"><thead><tr>' + th + '</tr></thead><tbody>' + tr + '</tbody></table></div>';
  };

  /* ---------- Gráfico de barras (SVG real, medido al ancho disponible) ---------- */
  function ticksLindos(max) {
    if (max <= 0) return { paso: 1, tope: 1 };
    var exp = Math.pow(10, Math.floor(Math.log10(max / 3))), b = max / 3 / exp, m = b <= 1 ? 1 : b <= 2 ? 2 : b <= 5 ? 5 : 10, paso = m * exp;
    return { paso: paso, tope: Math.ceil(max / paso) * paso };
  }
  var compacto = new Intl.NumberFormat('es-UY', { notation: 'compact', maximumFractionDigits: 1 });
  function pesosCorto(v) { return '$ ' + (v >= 10000 ? compacto.format(v) : new Intl.NumberFormat('es-UY').format(v)); }
  var registroGraficos = [];
  P.barras = function (el, datos, o) {
    o = o || {}; registroGraficos = registroGraficos.filter(function (g) { return document.body.contains(g.el); }); registroGraficos.push({ el: el, datos: datos, o: o });
    dibujar(el, datos, o);
  };
  function dibujar(el, datos, o) {
    var W = Math.max(280, el.clientWidth || 320), H = o.alto || 220, mi = 46, md = 8, ms = 14, mb = 28;
    var max = Math.max.apply(null, datos.map(function (d) { return d.v; }).concat([0])) / 100; // pesos
    var tk = ticksLindos(max), n = datos.length, area = (W - mi - md) / n, ancho = Math.min(24, area * .62);
    var y = function (v) { return ms + (H - ms - mb) * (1 - v / tk.tope); };
    var s = '<svg viewBox="0 0 ' + W + ' ' + H + '" width="' + W + '" height="' + H + '" role="img" aria-label="' + esc(o.titulo || 'Gráfico de barras') + '">';
    for (var t = 0; t <= tk.tope + 1e-9; t += tk.paso) { s += '<line class="eje" x1="' + mi + '" x2="' + (W - md) + '" y1="' + y(t) + '" y2="' + y(t) + '"/><text x="' + (mi - 8) + '" y="' + (y(t) + 4) + '" text-anchor="end">' + pesosCorto(t) + '</text>'; }
    var cada = Math.ceil(n / Math.max(1, Math.floor((W - mi) / 44)));
    datos.forEach(function (d, i) {
      var cx = mi + area * i + area / 2, x = cx - ancho / 2, v = d.v / 100, yt = y(v), h = Math.max(0, y(0) - yt);
      if (h > 0) {
        var r = Math.min(4, h, ancho / 2);
        s += '<path class="barra-dato' + (d.hoy ? ' barra-dato--hoy' : '') + '" tabindex="0" data-i="' + i + '" d="M' + x + ' ' + y(0) + 'V' + (yt + r) + 'a' + r + ' ' + r + ' 0 0 1 ' + r + ' -' + r + 'h' + (ancho - 2 * r) + 'a' + r + ' ' + r + ' 0 0 1 ' + r + ' ' + r + 'V' + y(0) + 'Z"/>';
      }
      s += '<rect data-i="' + i + '" class="zona-hover" x="' + (cx - area / 2) + '" y="' + ms + '" width="' + area + '" height="' + (H - ms - mb) + '" fill="transparent"/>';
      if (i % cada === 0 || i === n - 1) s += '<text x="' + cx + '" y="' + (H - 8) + '" text-anchor="middle">' + esc(d.etq) + '</text>';
    });
    var ult = datos[n - 1]; if (ult && ult.v > 0 && o.valorFinal !== false) { var ux = mi + area * (n - 1) + area / 2; s += '<text class="valor-dato" x="' + Math.min(ux, W - 26) + '" y="' + (y(ult.v / 100) - 6) + '" text-anchor="middle">' + pesosCorto(Math.round(ult.v / 100)) + '</text>'; }
    s += '</svg><div class="tip" hidden></div>';
    el.innerHTML = s;
    var tip = el.querySelector('.tip');
    function mostrar(i, e) {
      var d = datos[i]; tip.hidden = false; tip.innerHTML = '<strong>' + F.din(d.v) + '</strong>' + esc(d.tip || d.etq);
      var cx = mi + area * i + area / 2, top = y(d.v / 100); tip.style.left = Math.max(60, Math.min(W - 60, cx)) + 'px'; tip.style.top = Math.max(40, top - 8) + 'px';
    }
    el.querySelectorAll('[data-i]').forEach(function (b) {
      b.addEventListener('pointermove', function (e) { mostrar(+b.dataset.i); });
      b.addEventListener('focus', function () { mostrar(+b.dataset.i); });
      b.addEventListener('pointerleave', function () { tip.hidden = true; });
      b.addEventListener('blur', function () { tip.hidden = true; });
    });
  }
  var temp; window.addEventListener('resize', function () { clearTimeout(temp); temp = setTimeout(function () { registroGraficos = registroGraficos.filter(function (g) { return document.body.contains(g.el); }); registroGraficos.forEach(function (g) { dibujar(g.el, g.datos, g.o); }); }, 150); });
  P.tablaDatos = function (datos, cab) {
    return '<details class="demo" style="margin:10px 0 0"><summary>Ver los números en una tabla</summary><div style="overflow-x:auto"><table class="tabla-simple" style="width:100%;font-size:14px;margin-top:6px"><tbody>' +
      datos.map(function (d) { return '<tr><td style="padding:4px 0">' + esc(d.tip || d.etq) + '</td><td class="derecha num" style="padding:4px 0"><strong>' + F.din(d.v) + '</strong></td></tr>'; }).join('') + '</tbody></table></div></details>';
  };
  P.COLOR_MEDIO = { efectivo: 'var(--serie-1)', debito: 'var(--serie-2)', credito: 'var(--serie-3)', qr: 'var(--serie-4)' };
  P.mediosHTML = function (porMedio) {
    var tot = 0, k; for (k in porMedio) tot += porMedio[k];
    if (!tot) return '<p class="vacio">Todavía no hay cobros en este período.</p>';
    return '<div class="segmentada" role="img" aria-label="Reparto de cobros por medio de pago">' + Object.keys(LE.MEDIOS).map(function (m) { return porMedio[m] ? '<i style="width:' + (porMedio[m] * 100 / tot) + '%;background:' + P.COLOR_MEDIO[m] + '"></i>' : ''; }).join('') + '</div>' +
      '<ul class="leyenda">' + Object.keys(LE.MEDIOS).map(function (m) { return '<li><span class="clave" style="background:' + P.COLOR_MEDIO[m] + '"></span><span>' + LE.MEDIOS[m] + '</span><span class="lv">' + F.din(porMedio[m]) + ' <span class="suave" style="font-weight:400">· ' + P.pct(porMedio[m], tot) + '</span></span></li>'; }).join('') + '</ul>';
  };
  P.ranking = function (items, fmtV) {
    var max = Math.max.apply(null, items.map(function (i) { return i.v; }).concat([1]));
    return '<ol class="ranking">' + items.map(function (i) { return '<li><span>' + esc(i.n) + '</span><strong class="num">' + fmtV(i) + '</strong><span class="barrita"><i style="width:' + Math.max(2, i.v * 100 / max) + '%"></i></span></li>'; }).join('') + '</ol>';
  };

  /* ============================ INICIO ============================ */
  P.rutas.inicio = {
    titulo: 'Inicio',
    entrar: function () {
      var h = new Date().getHours(), saludo = h < 12 ? 'Buen día' : h < 20 ? 'Buenas tardes' : 'Buenas noches';
      P.cab(saludo + ', ' + usuario.nombre.split(' ')[0], 'Así viene La Estrella · ' + new Date().toLocaleDateString('es-UY', { weekday: 'long', day: 'numeric', month: 'long' }), '<a class="btn btn--acento" href="../caja/">' + ico('store') + 'Ir a la caja</a>');
      P.rutas.inicio.pintar();
    },
    pintar: function () {
      var hoy = P.rango('hoy'), sem = P.rango('7'), R = LE.reporte(hoy[0], hoy[1]), S7 = LE.reporte(sem[0], sem[1]);
      var t = LE.turnoAbierto(), bajo = LE.stockBajo(), pend = LE.pendientes().length;
      var trab = LE.estado.asistencias.filter(function (a) { return !a.salida; });
      var dias = []; for (var i = 6; i >= 0; i--) { var d0 = hoy[0] - i * DIA, x = S7.porDia[d0] || { total: 0, tickets: 0 }; dias.push({ etq: P.diaCorto(d0), v: x.total, tip: P.diaCorto(d0) + ' · ' + x.tickets + ' ventas', hoy: i === 0 }); }
      var top = Object.keys(S7.porProd).map(function (k) { return S7.porProd[k]; }).sort(function (a, b) { return b.total - a.total; }).slice(0, 6);
      var dif = LE.turnos().filter(function (t) { return t.cierre && t.contado !== t.esperado; })[0];
      var avisos = [];
      if (t) avisos.push('<li>' + ico('circle-check') + '<span>Caja abierta por ' + esc(t.abrio) + ' desde las ' + F.hora(t.apertura) + '.</span></li>'); else avisos.push('<li>' + ico('lock') + '<span>La caja está cerrada ahora.</span></li>');
      if (pend) avisos.push('<li>' + ico('wifi-off') + '<span>' + pend + ' ventas esperan conexión para enviarse.</span></li>');
      var cp = LE.compras().filter(function (c) { return !c.recibida; }); if (cp.length) avisos.push('<li>' + ico('truck') + '<span>' + cp.length + (cp.length === 1 ? ' compra pedida' : ' compras pedidas') + ' esperando recibirse. <a href="#/compras">Ver</a></span></li>');
      if (dif) avisos.push('<li>' + ico('triangle-alert') + '<span>Última diferencia de caja: ' + F.din(dif.contado - dif.esperado, true) + ' (' + F.fecha(dif.cierre) + ', ' + esc(dif.cerro) + '). <a href="#/caja">Ver</a></span></li>');
      var anul = S7.anuladas; if (anul) avisos.push('<li>' + ico('ban') + '<span>' + anul + (anul === 1 ? ' venta anulada' : ' ventas anuladas') + ' en los últimos 7 días.</span></li>');
      P.zona(
        '<div class="kpis kpis--inicio"><div class="kpi kpi--grande"><div class="kpi__rotulo">Ventas de hoy</div><div class="kpi__valor">' + F.din(R.total) + '</div><div class="kpi__sub">' + R.tickets + (R.tickets === 1 ? ' venta' : ' ventas') + (R.tickets ? ' · ticket promedio ' + F.din(R.promedio) : ' · todavía no se abrió la caja de hoy') + '</div></div>' +
        '<div class="kpi"><div class="kpi__rotulo">Ganancia bruta de hoy</div><div class="kpi__valor">' + F.din(R.margen) + '</div><div class="kpi__sub">ventas menos costo de la mercadería</div></div>' +
        '<div class="kpi"><div class="kpi__rotulo">Efectivo en la caja</div><div class="kpi__valor">' + (t ? F.din(LE.efectivoEsperado(t)) : '—') + '</div><div class="kpi__sub">' + (t ? 'según las ventas del turno' : 'caja cerrada') + '</div></div>' +
        '<div class="kpi"><div class="kpi__rotulo">Productos por reponer</div><div class="kpi__valor">' + bajo.length + '</div><div class="kpi__sub">en el mínimo o por debajo</div></div>' +
        '<div class="kpi"><div class="kpi__rotulo">Trabajando ahora</div><div class="kpi__valor">' + trab.length + '</div><div class="kpi__sub">' + (trab.length ? trab.map(function (a) { return esc(a.nombre.split(' ')[0]); }).join(', ') : 'nadie marcó entrada') + '</div></div></div>' +
        '<div class="grid grid--3" style="margin-bottom:16px"><section class="tarjeta"><h3>Ventas de los últimos 7 días</h3><div class="grafico" id="g-dias"></div>' + P.tablaDatos(dias) + '</section>' +
        '<section class="tarjeta"><h3>Cómo se cobró · 7 días</h3>' + P.mediosHTML(S7.porMedio) + '</section></div>' +
        '<div class="grid grid--2"><section class="tarjeta"><h3>Lo más vendido · 7 días</h3>' + (top.length ? P.ranking(top.map(function (p) { return { n: p.nombre, v: p.total, t: p.total }; }), function (i) { return F.din(i.t); }) : '<p class="vacio">Sin ventas todavía.</p>') + '</section>' +
        '<section class="tarjeta"><h3>Para reponer</h3>' + (bajo.length ? '<ul class="permisos">' + bajo.slice(0, 6).map(function (p) { return '<li><span style="flex:1">' + esc(p.nombre) + '</span><span class="badge ' + (p.stock <= 0 ? 'badge--error' : 'badge--alerta') + '">' + (p.stock <= 0 ? 'Sin stock' : (p.unidad === 'kg' ? F.kg(p.stock) : p.stock + ' u') + ' · mín. ' + p.minimo) + '</span></li>'; }).join('') + '</ul><p style="margin-top:12px"><a class="btn btn--chico btn--linea" href="#/stock">Ver todo el stock</a></p>' : '<p class="vacio">Todo en orden.</p>') + '</section></div>' +
        '<section class="tarjeta" style="margin-top:16px"><h3>Avisos</h3><ul class="permisos">' + avisos.join('') + '</ul></section>');
      P.barras($('#g-dias'), dias, { titulo: 'Ventas por día, últimos 7 días' });
    }
  };

  /* ============================ VENTAS ============================ */
  P.rutas.ventas = {
    titulo: 'Ventas',
    entrar: function () {
      var S = P.est('ventas', { rango: 'hoy', cajero: '', estado: '', q: '' });
      P.cab('Ventas', 'Todos los tickets, con el detalle de cada cobro.', '<button type="button" class="btn btn--linea" data-acc="csv-ventas">' + ico('download') + 'Descargar CSV</button>',
        P.chipsRango(S.rango) + '<select class="entrada" data-filtro="cajero" aria-label="Cajera">' + UI.opciones(LE.usuarios().filter(function (u) { return u.rol === 'caja' || true; }).map(function (u) { return { id: u.nombre, nombre: u.nombre }; }), S.cajero, 'Todas las personas') + '</select>' +
        '<select class="entrada" data-filtro="estado" aria-label="Estado"><option value="">Todos los estados</option><option value="ok"' + (S.estado === 'ok' ? ' selected' : '') + '>Cobradas</option><option value="anulada"' + (S.estado === 'anulada' ? ' selected' : '') + '>Anuladas</option></select>' +
        '<input class="entrada" data-filtro="q" inputmode="numeric" placeholder="N.º de ticket" value="' + esc(S.q) + '" aria-label="Buscar por número de ticket">');
      P.rutas.ventas.pintar();
    },
    lista: function () {
      var S = P.est('ventas'), r = P.rango(S.rango), vs = LE.ventas(r[0], r[1]).slice().reverse();
      if (S.cajero) vs = vs.filter(function (v) { return v.cajero === S.cajero; });
      if (S.estado) vs = vs.filter(function (v) { return v.estado === S.estado; });
      if (S.q) vs = vs.filter(function (v) { return String(v.num).indexOf(S.q.replace(/^0+/, '')) >= 0; });
      return vs;
    },
    pintar: function () {
      var vs = P.rutas.ventas.lista(), tot = vs.reduce(function (a, v) { return a + (v.estado === 'ok' ? v.total : 0); }, 0), mostrar = vs.slice(0, 100);
      P.zona('<p class="suave" style="margin-bottom:12px">' + vs.length + (vs.length === 1 ? ' venta' : ' ventas') + ' · cobrado ' + F.din(tot) + (vs.length > 100 ? ' · se muestran las últimas 100' : '') + '</p>' +
        P.tabla([
          { t: 'Ticket', c: 't-titulo', f: function (v) { return 'N.º ' + F.num(v.num) + '<small>' + F.fecha(v.ts) + ' · ' + F.hora(v.ts) + '</small>'; } },
          { t: 'Total', c: 't-derecha', f: function (v) { return v.estado === 'ok' ? F.din(v.total) : '<s class="suave">' + F.din(v.total) + '</s>'; } },
          { t: 'Cajera', f: function (v) { return esc(v.cajero); } },
          { t: 'Cobro', f: function (v) { return v.pagos.map(function (p) { return LE.MEDIOS[p.m]; }).join(' + '); } },
          { t: 'Estado', f: function (v) { return v.estado === 'ok' ? (v.sync === false ? '<span class="badge badge--alerta">Sin enviar</span>' : '<span class="badge badge--ok">Cobrada</span>') : '<span class="badge badge--error">Anulada</span>'; } },
          { t: '', c: 't-acciones', f: function (v) { return '<button type="button" class="btn btn--chico btn--linea" data-acc="venta" data-id="' + v.id + '">' + ico('eye') + 'Ver</button>'; } }
        ], mostrar, { vacio: 'No hay ventas con este filtro.', clase: function (v) { return v.estado === 'ok' ? '' : 'is-baja'; } }));
    },
    ver: function (id) {
      var v = LE.venta(id); if (!v) return;
      var acc = [{ texto: 'Cerrar', clase: 'btn--linea' }];
      if (v.estado === 'ok') acc.unshift({ texto: 'Anular venta', clase: 'btn--peligro', icono: 'ban', cerrar: false, accion: function (ctl) { ctl.cerrar(); P.rutas.ventas.anular(v.id); return false; } });
      acc.unshift({ texto: 'Reimprimir', icono: 'printer', clase: 'btn--linea', cerrar: false, accion: function () { LE.imprimirTicket(LE.ticketTexto(v, { copia: true })); return false; } });
      UI.modal({
        titulo: 'Ticket ' + F.num(v.num), ancha: true,
        cuerpo: '<p class="suave" style="margin-bottom:12px">' + F.fechaHora(v.ts) + ' · atendió ' + esc(v.cajero) + (v.estado !== 'ok' ? ' · <strong>ANULADA</strong> por ' + esc(v.anuladaPor) + ' (' + esc(v.motivo) + ')' : '') + '</p>' +
          '<div class="papel-marco"><pre class="papel">' + esc(LE.ticketTexto(v, { copia: true })) + '</pre></div>', acciones: acc
      });
    },
    anular: function (id) {
      var v = LE.venta(id);
      var ctl = UI.modal({
        titulo: 'Anular ticket ' + F.num(v.num),
        cuerpo: '<div class="nota" style="margin-bottom:14px">' + ico('triangle-alert') + '<span>El stock vuelve a sumarse y el cobro deja de contar en los reportes. Queda anotado a tu nombre.</span></div>' +
          '<label class="campo"><span>Motivo</span><select name="m" class="entrada"><option>Error de cobro</option><option>Devolución del cliente</option><option>Producto equivocado</option><option>Otro</option></select></label><label class="campo"><span>Detalle (opcional)</span><input name="d" class="entrada" maxlength="80"></label>',
        acciones: [{ texto: 'Volver', clase: 'btn--linea' }, { texto: 'Anular venta', clase: 'btn--peligro', cerrar: false, accion: function () { var x = UI.valores(ctl); var r = UI.intentar(function () { LE.anularVenta(id, x.m + (x.d ? ': ' + x.d : '')); }, 'Venta anulada.'); if (r.ok) { ctl.cerrar(); P.refrescar(); } return false; } }]
      });
    },
    csv: function () {
      var vs = P.rutas.ventas.lista().slice().reverse(); var f = [['Ticket', 'Fecha', 'Hora', 'Cajera', 'Medios', 'Total', 'Estado']];
      vs.forEach(function (v) { f.push([F.num(v.num), F.fecha(v.ts), F.hora(v.ts), v.cajero, v.pagos.map(function (p) { return LE.MEDIOS[p.m]; }).join('+'), (v.total / 100).toFixed(2).replace('.', ','), v.estado === 'ok' ? 'Cobrada' : 'Anulada']); });
      UI.descargarCSV('ventas-la-estrella.csv', f);
    }
  };

  /* ============================ PRODUCTOS ============================ */
  P.rutas.productos = {
    titulo: 'Productos',
    entrar: function () {
      var S = P.est('productos', { q: '', cat: '', est: '' });
      P.cab('Productos', 'Precios, costos y códigos de barras. Los cambios de precio quedan en el registro.', '<button type="button" class="btn btn--acento" data-acc="producto-nuevo">' + ico('plus') + 'Nuevo producto</button>',
        '<input class="entrada" data-filtro="q" placeholder="Buscar por nombre o código" value="' + esc(S.q) + '" aria-label="Buscar producto">' +
        '<select class="entrada" data-filtro="cat" aria-label="Categoría">' + UI.opciones(LE.categorias(), S.cat, 'Todas las categorías') + '</select>' +
        '<select class="entrada" data-filtro="est" aria-label="Estado"><option value="">Todos</option><option value="baja"' + (S.est === 'baja' ? ' selected' : '') + '>Dados de baja</option><option value="bajo"' + (S.est === 'bajo' ? ' selected' : '') + '>Stock bajo</option></select>');
      P.rutas.productos.pintar();
    },
    pintar: function () {
      var S = P.est('productos'), q = S.q.trim().toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
      var ps = LE.productos().filter(function (p) {
        if (S.cat && p.cat !== S.cat) return false;
        if (S.est === 'baja' && p.activo) return false;
        if (S.est === 'bajo' && !(p.activo && p.stock <= p.minimo)) return false;
        if (q) { var n = p.nombre.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, ''); if (n.indexOf(q) < 0 && p.codigo.indexOf(q) < 0 && p.plu.indexOf(q) < 0) return false; }
        return true;
      });
      P.zona('<p class="suave" style="margin-bottom:12px">' + ps.length + ' productos</p>' + P.tabla([
        { t: 'Producto', c: 't-titulo', f: function (p) { return esc(p.nombre) + '<small>' + esc(p.cat) + ' · ' + (p.unidad === 'kg' ? 'por kg · PLU ' + p.plu : 'código ' + esc(p.codigo)) + '</small>'; } },
        { t: 'Precio', c: 't-derecha', f: function (p) { return F.din(p.precio) + (p.unidad === 'kg' ? '<small>por kg</small>' : ''); } },
        { t: 'Costo', f: function (p) { return F.din(p.costo); } },
        { t: 'Margen', f: function (p) { return p.precio ? Math.round((p.precio - p.costo) * 100 / p.precio) + ' %' : '—'; } },
        { t: 'Stock', f: function (p) { var s = p.unidad === 'kg' ? F.kg(p.stock) : p.stock + ' u'; return p.stock <= 0 ? '<span class="badge badge--error">Sin stock</span>' : p.stock <= p.minimo ? '<span class="badge badge--alerta">' + s + ' · bajo</span>' : s; } },
        { t: 'Estado', f: function (p) { return p.activo ? '<span class="badge badge--ok">Activo</span>' : '<span class="badge">De baja</span>'; } },
        { t: '', c: 't-acciones', f: function (p) { return '<button type="button" class="btn btn--chico btn--linea" data-acc="producto" data-id="' + p.id + '">' + ico('pencil') + 'Editar</button>'; } }
      ], ps.slice(0, 150), { clase: function (p) { return p.activo ? '' : 'is-baja'; } }) + (ps.length > 150 ? '<p class="suave" style="margin-top:10px">Se muestran 150: afiná la búsqueda para ver el resto.</p>' : ''));
    },
    form: function (id) {
      var nuevo = !id, p = id ? LE.producto(id) : { nombre: '', cat: LE.categorias()[0], unidad: 'u', codigo: '', plu: '', costo: 0, precio: 0, iva: 22, minimo: 0, prov: '', stock: 0, activo: true };
      var regimen = LE.negocio().regimen;
      var ctl = UI.modal({
        titulo: nuevo ? 'Nuevo producto' : 'Editar producto', ancha: true,
        cuerpo: '<label class="campo"><span>Nombre (máx. 28 letras, para que entre en el ticket)</span><input name="nombre" class="entrada" maxlength="28" value="' + esc(p.nombre) + '"></label>' +
          '<div class="fila-campos"><label class="campo"><span>Categoría</span><select name="cat" class="entrada">' + UI.opciones(LE.categorias(), p.cat) + '</select></label>' +
          '<label class="campo"><span>Se vende por</span><select name="unidad" class="entrada"><option value="u"' + (p.unidad === 'u' ? ' selected' : '') + '>Unidad</option><option value="kg"' + (p.unidad === 'kg' ? ' selected' : '') + '>Peso (kg)</option></select></label></div>' +
          '<div id="f-codigo"><label class="campo"><span>Código de barras</span><input name="codigo" class="entrada" inputmode="numeric" autocomplete="off" value="' + esc(p.codigo) + '" placeholder="Escaneálo con el lector"><small>Poné el cursor acá y pasá el producto por el lector: el código se escribe solo.</small></label></div>' +
          '<div id="f-plu" hidden><label class="campo"><span>Código de balanza (PLU, 5 números)</span><input name="plu" class="entrada" inputmode="numeric" maxlength="5" value="' + esc(p.plu) + '"><small id="f-ejemplo"></small></label></div>' +
          '<div class="fila-campos"><label class="campo"><span>Costo</span><input name="costo" class="entrada" inputmode="decimal" value="' + UI.deCentavos(p.costo) + '"></label><label class="campo"><span>Precio de venta</span><input name="precio" class="entrada" inputmode="decimal" value="' + UI.deCentavos(p.precio) + '"></label></div>' +
          '<p class="suave" id="f-margen" style="margin:-4px 0 14px"></p>' +
          '<div class="fila-campos"><label class="campo"><span>Avisar cuando quede menos de</span><input name="minimo" class="entrada" inputmode="decimal" value="' + p.minimo + '"></label>' +
          '<label class="campo"><span>' + (nuevo ? 'Stock inicial' : 'Stock actual') + '</span><input name="stockInicial" class="entrada" inputmode="decimal" value="' + p.stock + '"' + (nuevo ? '' : ' disabled') + '>' + (nuevo ? '' : '<small>Se cambia desde Stock → Ajustar.</small>') + '</label></div>' +
          '<div class="fila-campos"><label class="campo"><span>Proveedor</span><select name="prov" class="entrada">' + UI.opciones(LE.proveedores(), p.prov, 'Sin proveedor') + '</select></label>' +
          '<label class="campo"><span>IVA' + (regimen === 'monotributo' ? ' (hoy no se cobra: monotributo)' : '') + '</span><select name="iva" class="entrada">' + [22, 10, 0].map(function (x) { return '<option value="' + x + '"' + (p.iva === x ? ' selected' : '') + '>' + (x ? x + ' %' : 'Exento') + '</option>'; }).join('') + '</select></label></div>',
        acciones: [{ texto: 'Cancelar', clase: 'btn--linea' }].concat(nuevo ? [] : [{ texto: p.activo ? 'Dar de baja' : 'Reactivar', clase: 'btn--linea', cerrar: false, accion: function (c) { var r = UI.intentar(function () { LE.activarProducto(id, !p.activo); }, p.activo ? 'Producto dado de baja.' : 'Producto reactivado.'); if (r.ok) { c.cerrar(); P.refrescar(); } return false; } }]).concat([{ texto: 'Guardar', clase: 'btn--tinta', cerrar: false, accion: guardar }])
      });
      function guardar() {
        var v = UI.valores(ctl);
        var r = UI.intentar(function () { return LE.guardarProducto({ id: id, nombre: v.nombre, cat: v.cat, unidad: v.unidad, codigo: v.codigo, plu: v.plu, costo: UI.aCentavos(v.costo), precio: UI.aCentavos(v.precio), iva: v.iva, minimo: UI.aNumero(v.minimo), prov: v.prov, stockInicial: UI.aNumero(v.stockInicial) }); }, 'Producto guardado.');
        if (r.ok) { ctl.cerrar(); P.refrescar(); } return false;
      }
      function ver() {
        var v = UI.valores(ctl), kg = v.unidad === 'kg'; ctl.$('#f-codigo').hidden = kg; ctl.$('#f-plu').hidden = !kg;
        var c = UI.aCentavos(v.costo), pr = UI.aCentavos(v.precio);
        ctl.$('#f-margen').textContent = pr ? 'Ganancia por ' + (kg ? 'kilo' : 'unidad') + ': ' + F.din(pr - c) + ' (' + Math.round((pr - c) * 100 / pr) + ' % del precio)' : '';
        var pl = ctl.$('#f-ejemplo'); pl.textContent = kg && /^\d{5}$/.test(v.plu) ? 'Etiqueta de 350 g: ' + LE.ean13(LE.negocio().balanza.prefijo + v.plu + '00350') : 'La balanza imprime este PLU dentro del código de la etiqueta.';
      }
      ctl.cuerpo.addEventListener('input', ver); ctl.cuerpo.addEventListener('change', ver);
      ctl.cuerpo.addEventListener('keydown', function (e) { if (e.key === 'Enter' && e.target.name === 'codigo') { e.preventDefault(); ctl.$('[name=costo]').focus(); } });
      ver();
    }
  };

  /* ============================ Navegación ============================ */
  P.refrescar = function () { var r = P.rutas[P.actual]; if (r && r.pintar) r.pintar(); };
  function ir() {
    var k = (location.hash.replace(/^#\/?/, '') || 'inicio').split('?')[0]; if (!P.rutas[k]) k = 'inicio';
    P.actual = k; P.rutas[k].entrar();
    UI.$$('.menu__link[data-vista]').forEach(function (a) { if (a.dataset.vista === k) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current'); });
    cerrarMenu(); document.title = P.rutas[k].titulo + ' — La Estrella'; window.scrollTo(0, 0);
  }
  function cerrarMenu() { $('#menu').classList.remove('menu--abierto'); var b = $('#btn-menu'); if (b) b.setAttribute('aria-expanded', 'false'); }
  window.addEventListener('hashchange', ir);

  document.addEventListener('click', function (e) {
    var t = e.target;
    if (t.closest('#btn-menu')) { $('#menu').classList.add('menu--abierto'); $('#btn-menu').setAttribute('aria-expanded', 'true'); return; }
    if (t.closest('#menu-cerrar')) return cerrarMenu();
    if (t.closest('#salir')) { LE.salir(); location.href = '../index.html'; return; }
    var rg = t.closest('[data-rango]');
    if (rg) { var S = P.est(P.actual); S.rango = rg.dataset.rango; UI.$$('[data-rango]').forEach(function (c) { c.setAttribute('aria-pressed', c === rg ? 'true' : 'false'); }); P.refrescar(); return; }
    var fc = t.closest('button[data-filtro]');
    if (fc) { var S2 = P.est(P.actual); S2[fc.dataset.filtro] = fc.dataset.valor; UI.$$('[data-filtro="' + fc.dataset.filtro + '"]').forEach(function (c) { c.setAttribute('aria-pressed', c === fc ? 'true' : 'false'); }); P.refrescar(); return; }
    var a = t.closest('[data-acc]'); if (!a) return;
    var id = a.dataset.id, ac = a.dataset.acc;
    if (ac === 'venta') P.rutas.ventas.ver(id);
    else if (ac === 'csv-ventas') P.rutas.ventas.csv();
    else if (ac === 'producto') P.rutas.productos.form(id);
    else if (ac === 'producto-nuevo') P.rutas.productos.form();
    else if (P.acciones && P.acciones[ac]) P.acciones[ac](id, a);
  });
  document.addEventListener('input', function (e) {
    var f = e.target.closest('input[data-filtro], select[data-filtro]'); if (!f) return;
    P.est(P.actual)[f.dataset.filtro] = f.value; P.refrescar();
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && $('#menu').classList.contains('menu--abierto') && !UI.hayModal()) cerrarMenu(); });

  $('#pie-nombre').textContent = usuario.nombre; $('#pie-rol').textContent = 'Dueña · control total';
  P.acciones = {}; P.iniciar = ir;
  window.addEventListener('DOMContentLoaded', function () { if (!P.diferido) ir(); });
  if (document.readyState !== 'loading' && !P.diferido) setTimeout(function () { if (!P.actual) ir(); }, 0);
})();
