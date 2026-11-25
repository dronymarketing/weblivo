/* ============================================================
   LA ESTRELLA — panel de administración · núcleo
   Rutas, tablas, gráficos y las vistas Inicio, Ventas y Productos.
   Las vistas de gestión (stock, compras, caja, reportes, equipo,
   ajustes) están en panel-gestion.js y se registran acá.
   ============================================================ */
(function () {
  'use strict';
  var $ = UI.$, esc = UI.esc, F = LE.fmt, ico = UI.ico;
  var usuario = UI.exigirSesion(['admin'], '../index.html'); if (!usuario) return;

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
  P.celdaProd = function (p, sub) { return '<span class="celda-prod">' + UI.foto(p, 'foto--mini') + '<span>' + esc(p.nombre) + (sub ? '<small>' + sub + '</small>' : '') + '</span></span>'; };
  P.pct = function (a, b) { return b ? Math.round(a * 100 / b) + ' %' : '—'; };

  /* ---------- Estructura de cada vista ---------- */
  P.cab = function (titulo, sub, acciones, filtros) {
    $('#vista').classList.remove('cuerpo--lista');
    $('#vista').innerHTML = '<div class="pagina__cab"><div><h1>' + esc(titulo) + '</h1>' + (sub ? '<p>' + sub + '</p>' : '') + '</div>' + (acciones ? '<div class="pagina__acciones">' + acciones + '</div>' : '') + '</div>' +
      (filtros ? '<div class="filtros" id="filtros">' + filtros + '</div>' : '') + '<div id="zona"></div>';
  };
  P.zona = function (html) {
    var z = $('#zona');
    /* Cuando la pantalla se actualiza sola (datos nuevos), se queda donde estaba: no vuelve al principio de la lista */
    var yo = P.alActualizar ? [].map.call(z.querySelectorAll('*'), function (e, i) { return e.scrollTop > 0 ? [i, e.tagName, e.scrollTop] : null; }).filter(Boolean) : null;
    z.innerHTML = html;
    /* Pantallas de lista: indicadores + una tabla. En escritorio la tabla ocupa el resto de la pantalla y se desplaza por dentro. */
    var k = [].slice.call(z.children), ult = k[k.length - 1];
    $('#vista').classList.toggle('cuerpo--lista', !!(ult && (ult.classList.contains('paneles') || (ult.classList.contains('tarjeta') && ult.querySelector('.tabla'))) && k.slice(0, -1).every(function (c) { return c.classList.contains('kpis') || c.classList.contains('resumen'); })));
    if (yo && yo.length) { var todos = z.querySelectorAll('*'); yo.forEach(function (g) { var e = todos[g[0]]; if (e && e.tagName === g[1]) e.scrollTop = g[2]; }); }
    if (P.alPintar) { var f = P.alPintar; P.alPintar = null; f(); } };

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
  function registrar(el, redibujar) { registroGraficos = registroGraficos.filter(function (g) { return document.body.contains(g.el); }); registroGraficos.push({ el: el, redibujar: redibujar }); redibujar(); }
  P.barras = function (el, datos, o) { o = o || {}; registrar(el, function () { dibujar(el, datos, o); }); };
  function dibujar(el, datos, o) {
    var W = Math.max(280, el.clientWidth || 320), H = o.llenar ? Math.max(180, el.clientHeight || 0) : (o.alto || 220), mi = 46, md = 8, ms = 14, mb = 28;
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
  var temp; window.addEventListener('resize', function () { clearTimeout(temp); temp = setTimeout(function () { registroGraficos = registroGraficos.filter(function (g) { return document.body.contains(g.el); }); registroGraficos.forEach(function (g) { g.redibujar(); }); }, 150); });
  P.tablaDatos = function (datos, pop) {
    return '<details class="demo' + (pop ? ' demo--pop' : '') + '"' + (pop ? '' : ' style="margin:10px 0 0"') + '><summary>' + (pop ? 'Ver como tabla' : 'Ver los números en una tabla') + '</summary><div style="overflow-x:auto"><table class="tabla-simple" style="width:100%;font-size:14px;margin-top:6px"><tbody>' +
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

  /* ---------- Gráficos del Inicio: áreas suaves, dona y minigráficos ---------- */
  var gid = 0;
  function f1(n) { return Math.round(n * 10) / 10; }
  function trazo(pts) {
    var d = 'M' + f1(pts[0][0]) + ' ' + f1(pts[0][1]);
    for (var i = 0; i < pts.length - 1; i++) {
      var p0 = pts[i - 1] || pts[i], p1 = pts[i], p2 = pts[i + 1], p3 = pts[i + 2] || p2;
      var lo = Math.min(p1[1], p2[1]), hi = Math.max(p1[1], p2[1]);
      var c1y = Math.max(lo, Math.min(hi, p1[1] + (p2[1] - p0[1]) / 6)), c2y = Math.max(lo, Math.min(hi, p2[1] - (p3[1] - p1[1]) / 6));
      d += 'C' + f1(p1[0] + (p2[0] - p0[0]) / 6) + ' ' + f1(c1y) + ' ' + f1(p2[0] - (p3[0] - p1[0]) / 6) + ' ' + f1(c2y) + ' ' + f1(p2[0]) + ' ' + f1(p2[1]);
    }
    return d;
  }
  P.area = function (el, labels, series, o) { o = o || {}; registrar(el, function () { dibujarArea(el, labels, series, o); }); };
  function dibujarArea(el, labels, series, o) {
    var W = Math.max(280, el.clientWidth || 320), H = o.llenar ? Math.max(180, el.clientHeight || 0) : (o.alto || 240), mi = 46, md = 12, ms = 14, mb = 28, n = labels.length, id = 'ga' + (++gid);
    var vmax = 0; series.forEach(function (se) { se.v.forEach(function (v) { if (v > vmax) vmax = v; }); }); vmax /= 100;
    var tk = ticksLindos(vmax), pw = W - mi - md;
    var x = function (i) { return mi + (n === 1 ? pw / 2 : pw * i / (n - 1)); }, y = function (v) { return ms + (H - ms - mb) * (1 - v / tk.tope); };
    var s = '<svg viewBox="0 0 ' + W + ' ' + H + '" width="' + W + '" height="' + H + '" role="img" aria-label="' + esc(o.titulo || 'Gráfico') + '"><defs>' + series.map(function (se, k) { return '<linearGradient id="' + id + k + '" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="' + se.color + '" stop-opacity=".18"/><stop offset="1" stop-color="' + se.color + '" stop-opacity="0"/></linearGradient>'; }).join('') + '</defs>';
    for (var t = 0; t <= tk.tope + 1e-9; t += tk.paso) s += '<line class="eje" x1="' + mi + '" x2="' + (W - md) + '" y1="' + y(t) + '" y2="' + y(t) + '"/><text x="' + (mi - 8) + '" y="' + (y(t) + 4) + '" text-anchor="end">' + pesosCorto(t) + '</text>';
    var cada = Math.ceil(n / Math.max(1, Math.floor(pw / 52)));
    labels.forEach(function (l, i) { if (i % cada === 0 || i === n - 1 && (n - 1) % cada >= cada / 2) s += '<text x="' + x(i) + '" y="' + (H - 8) + '" text-anchor="middle">' + esc(l) + '</text>'; });
    series.slice().reverse().forEach(function (se, rk) {
      var k = series.length - 1 - rk, pts = se.v.map(function (v, i) { return [x(i), y(v / 100)]; }), d = trazo(pts);
      s += '<path d="' + d + 'L' + f1(x(n - 1)) + ' ' + y(0) + 'L' + f1(x(0)) + ' ' + y(0) + 'Z" fill="url(#' + id + k + ')" stroke="none"/><path class="serie" d="' + d + '" stroke="' + se.color + '"/>';
    });
    series.forEach(function (se) { var v = se.v[n - 1]; s += '<circle class="punto" cx="' + x(n - 1) + '" cy="' + y(v / 100) + '" r="4" fill="' + se.color + '"/>'; });
    s += '<line class="cruz" hidden y1="' + ms + '" y2="' + y(0) + '"/>' + series.map(function (se) { return '<circle class="punto punto-hover" hidden r="4.5" fill="' + se.color + '"/>'; }).join('');
    s += '<rect class="plot" x="' + mi + '" y="' + ms + '" width="' + pw + '" height="' + (H - ms - mb) + '" fill="transparent" tabindex="0" aria-label="Recorré el gráfico con las flechas"/></svg><div class="tip" hidden></div>';
    el.innerHTML = s;
    var tip = el.querySelector('.tip'), cruz = el.querySelector('.cruz'), puntos = el.querySelectorAll('.punto-hover'), plot = el.querySelector('.plot'), act = -1;
    function ver(i) {
      i = Math.max(0, Math.min(n - 1, i)); act = i; var cx = x(i);
      cruz.removeAttribute('hidden'); cruz.setAttribute('x1', cx); cruz.setAttribute('x2', cx);
      var ymin = H; series.forEach(function (se, k) { var yy = y(se.v[i] / 100); ymin = Math.min(ymin, yy); puntos[k].removeAttribute('hidden'); puntos[k].setAttribute('cx', cx); puntos[k].setAttribute('cy', yy); });
      tip.hidden = false; tip.innerHTML = '<span class="tip__fecha">' + esc((o.tips && o.tips[i]) || labels[i]) + '</span>' + series.map(function (se) { return '<span class="tip__fila"><i class="tip__clave" style="background:' + se.color + '"></i>' + esc(se.nombre) + '<strong>' + F.din(se.v[i]) + '</strong></span>'; }).join('');
      tip.style.left = Math.max(80, Math.min(W - 80, cx)) + 'px'; tip.style.top = Math.max(76, ymin - 12) + 'px';
    }
    function ocultar() { act = -1; tip.hidden = true; cruz.setAttribute('hidden', ''); puntos.forEach(function (p) { p.setAttribute('hidden', ''); }); }
    plot.addEventListener('pointermove', function (e) { var r = plot.getBoundingClientRect(); ver(Math.round((e.clientX - r.left) / r.width * (n - 1))); });
    plot.addEventListener('pointerdown', function (e) { var r = plot.getBoundingClientRect(); ver(Math.round((e.clientX - r.left) / r.width * (n - 1))); });
    plot.addEventListener('pointerleave', ocultar); plot.addEventListener('blur', ocultar);
    plot.addEventListener('focus', function () { ver(n - 1); });
    plot.addEventListener('keydown', function (e) { if (e.key === 'ArrowLeft') { e.preventDefault(); ver((act < 0 ? n - 1 : act) - 1); } else if (e.key === 'ArrowRight') { e.preventDefault(); ver((act < 0 ? n - 1 : act) + 1); } });
  }
  /* ============================ INICIO ============================
     Una sola pantalla con lo que más se usa. Cada tarjeta lleva a su sección. */
  function hora5(d) { return String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0'); }
  /* ---------- Avisos: salen en el menú de arriba (campana con número) y en el globito de Stock ---------- */
  P.avisos = function () {
    var t = LE.turnoAbierto(), bajo = LE.stockBajo(), cero = bajo.filter(function (p) { return p.stock <= 0; }).length, pend = LE.pendientes().length, sinc = LE.codigosSinCargar().length;
    var cp = LE.compras().filter(function (c) { return !c.recibida; }), dif = LE.turnos().filter(function (q) { return q.cierre && q.contado !== q.esperado; })[0];
    var h = LE.inicioDia(Date.now()), anul = LE.reporte(h - 6 * DIA, h + DIA).anuladas, L = [];
    if (bajo.length) L.push({ nivel: cero ? 'error' : 'alerta', ic: 'boxes', txt: bajo.length + (bajo.length === 1 ? ' producto para reponer' : ' productos para reponer') + (cero ? ' · ' + cero + ' sin stock' : ''), href: '#/stock' });
    if (cp.length) L.push({ nivel: 'alerta', ic: 'truck', txt: cp.length + (cp.length === 1 ? ' compra por recibir' : ' compras por recibir'), href: '#/compras' });
    if (dif) L.push({ nivel: 'alerta', ic: 'triangle-alert', txt: 'Última caja con diferencia: ' + F.din(dif.contado - dif.esperado, true), href: '#/caja' });
    if (sinc) L.push({ nivel: 'alerta', ic: 'scan-barcode', txt: sinc + (sinc === 1 ? ' código sin cargar' : ' códigos sin cargar'), href: '#/productos', acc: 'ver-sin-cargar' });
    if (pend) L.push({ nivel: 'alerta', ic: 'wifi-off', txt: pend + (pend === 1 ? ' venta sin enviar' : ' ventas sin enviar') });
    var dCerca = LE.deudores().filter(function (d) { return LE.nivelDeudor(d) !== 'ok'; }), dLim = dCerca.filter(function (d) { return LE.nivelDeudor(d) === 'limite'; }).length;
    var wa = LE.avisosDeuda().filter(function (a) { return a.estado !== 'enviado'; }).length;
    if (dCerca.length) L.push({ nivel: dLim ? 'error' : 'alerta', ic: 'hand-coins', txt: dCerca.length + (dCerca.length === 1 ? ' deudor cerca o sobre su límite' : ' deudores cerca o sobre su límite') + (dLim ? ' · ' + dLim + ' sobre el límite' : ''), href: '#/deudores' });
    if (wa) L.push({ nivel: 'alerta', ic: 'message-circle', txt: wa + (wa === 1 ? ' aviso de WhatsApp sin enviar' : ' avisos de WhatsApp sin enviar'), href: '#/deudores' });
    if (anul) L.push({ nivel: 'info', ic: 'ban', txt: anul + (anul === 1 ? ' venta anulada' : ' ventas anuladas') + ' en 7 días', href: '#/ventas' });
    return { caja: t, items: L, cuenta: L.filter(function (x) { return x.nivel !== 'info'; }).length, hayRojo: L.some(function (x) { return x.nivel === 'error'; }), bajo: bajo.length, cero: cero, deudores: dCerca.length, deudoresRojo: dLim > 0 };
  };
  P.pintarNav = function () {
    var A = P.avisos(), t = A.caja, c = $('#nav-caja'), n = $('#campana-n'), ns = $('#n-stock'), pop = $('#pop-avisos'); if (!c || !n || !pop) return;
    c.className = 'estado app__estado ' + (t ? 'estado--ok' : 'estado--alerta'); c.innerHTML = ico(t ? 'circle-check' : 'lock') + (t ? 'Caja abierta · ' + esc(t.abrio.split(' ')[0]) : 'Caja cerrada');
    n.hidden = !A.cuenta; n.textContent = A.cuenta; n.className = 'campana__n' + (A.hayRojo ? ' campana__n--rojo' : ''); $('#btn-avisos').setAttribute('aria-label', A.cuenta ? 'Avisos: ' + A.cuenta + ' pendientes' : 'Avisos: todo en orden');
    var nd = $('#n-deudores'); if (nd) { nd.hidden = !A.deudores; nd.textContent = A.deudores; nd.className = 'menu__n' + (A.deudoresRojo ? ' menu__n--rojo' : ''); }
    ns.hidden = !A.bajo; ns.textContent = A.bajo; ns.className = 'menu__n' + (A.cero ? ' menu__n--rojo' : ''); ns.setAttribute('aria-label', A.bajo + (A.bajo === 1 ? ' producto para reponer' : ' productos para reponer'));
    pop.innerHTML = '<div class="pop-avisos__cab"><strong>Avisos</strong><small>actualizado a las ' + hora5(new Date()) + '</small></div>' +
      '<a class="pop-aviso pop-aviso--' + (t ? 'ok' : 'info') + '" href="#/caja"><span class="pop-aviso__ic">' + ico(t ? 'circle-check' : 'lock') + '</span><span>' + (t ? 'Caja abierta por ' + esc(t.abrio) + ' desde las ' + F.hora(t.apertura) : 'La caja está cerrada') + '</span></a>' +
      (A.items.length ? A.items.map(function (x) { return '<' + (x.href ? 'a href="' + x.href + '"' + (x.acc ? ' data-acc="' + x.acc + '"' : '') : 'div') + ' class="pop-aviso pop-aviso--' + x.nivel + '"><span class="pop-aviso__ic">' + ico(x.ic) + '</span><span>' + esc(x.txt) + '</span>' + (x.href ? ico('chevron-right', 'pop-aviso__ir') : '') + '</' + (x.href ? 'a' : 'div') + '>'; }).join('') : '<p class="pop-aviso__vacio">Todo en orden: no hay nada pendiente.</p>');
  };
  function tile(href, ic, rotulo, valor, sub, ir, primero) {
    return '<a class="tile' + (primero ? ' tile--primero' : '') + '" href="' + href + '"><span class="tile__rotulo">' + ico(ic) + rotulo + '</span>' +
      '<strong class="tile__valor">' + valor + '</strong><span class="tile__sub">' + sub + '</span><span class="tile__ir">' + ir + ico('chevron-right') + '</span></a>';
  }
  function cabPanel(titulo, href, ir) {
    return '<div class="panel__cab"><h3>' + titulo + '</h3><a class="ver" href="' + href + '">' + ir + ico('chevron-right') + '</a></div>';
  }
  P.rutas.inicio = {
    titulo: 'Inicio',
    entrar: function () { P.rutas.inicio.pintar(); },
    pintar: function () {
      var ahora = new Date(), h = ahora.getHours(), saludo = h < 12 ? 'Buen día' : h < 20 ? 'Buenas tardes' : 'Buenas noches';
      var hoy = P.rango('hoy'), r7 = P.rango('7'), RH = LE.reporte(hoy[0], hoy[1]), R7 = LE.reporte(r7[0], r7[1]);
      var t = LE.turnoAbierto(), bajo = LE.stockBajo(), pend = LE.pendientes().length, fiHoy = LE.fiadoDelDia();
      var cp = LE.compras().filter(function (c) { return !c.recibida; });
      var dif = LE.turnos().filter(function (q) { return q.cierre && q.contado !== q.esperado; })[0];
      var etq = [], tips = [], v = [], g = [], tot = 0;
      for (var d0 = r7[0]; d0 < r7[1]; d0 += DIA) { var x = R7.porDia[d0] || { total: 0, margen: 0 }; etq.push(P.diaCorto(d0)); tips.push(P.diaCorto(d0)); v.push(x.total); g.push(x.margen || 0); tot += x.total; }
      var med = R7.porMedio, tarjetas = med.debito + med.credito;
      var ult = LE.estado.ventas.slice(-6).reverse();
      var prom = RH.tickets ? RH.promedio : R7.promedio;

      $('#vista').innerHTML =
        '<div class="inicio" id="zona">' +
        '<header class="inicio__cab"><h1>' + saludo + ', ' + esc(usuario.nombre.split(' ')[0]) + '</h1></header>' +
        '<div class="tiles">' +
          tile('#/ventas', 'receipt', 'Ventas de hoy', F.din(RH.total), RH.tickets + (RH.tickets === 1 ? ' venta' : ' ventas') + ' · promedio ' + F.din(prom) + (fiHoy.total ? '<span class="tile__fiado">A cuenta hoy ' + F.din(fiHoy.total) + ' · sin cobrar</span>' : ''), 'Ver ventas', true) +
          tile('#/caja', 'wallet', 'Caja', t ? F.din(LE.efectivoEsperado(t)) : 'Cerrada', t ? 'efectivo esperado · turno ' + esc(t.turno) : 'nadie atiende ahora', 'Ver cajas', false) +
          tile('#/stock', 'boxes', 'Stock', (function () { var ce = bajo.filter(function (p) { return p.stock <= 0; }).length, re = bajo.length - ce; return bajo.length ? '<span class="tile__estados">' + (re ? '<span class="est est--alerta"><strong>' + re + '</strong><small>Reponer</small></span>' : '') + (ce ? '<span class="est est--error"><strong>' + ce + '</strong><small>Sin stock</small></span>' : '') + '</span>' : '<span class="tile__ok">Todo en orden</span>'; })(), '', 'Ver stock', false) +
          tile('#/reportes', 'trending-up', 'Ganancia bruta de hoy', F.din(RH.margen), P.pct(RH.margen, RH.total) + ' de lo vendido', 'Ver reportes', false) +
        '</div>' +
        '<div class="paneles">' +
          '<section class="panel panel--grafico">' + cabPanel('Últimos 7 días', '#/reportes', 'Ver reportes') +
            '<div class="panel__cifras"><div><span class="cifra">' + F.din(tot) + '</span><span class="cifra-sub">vendido · ' + R7.tickets + ' ventas</span></div>' +
            '<div class="panel__ref"><div class="leyenda-linea"><span><i style="background:var(--serie-1)"></i>Ventas</span><span><i style="background:var(--serie-2)"></i>Ganancia bruta</span></div>' + P.tablaDatos(etq.map(function (e, i) { return { etq: e, tip: tips[i], v: v[i] }; }), true) + '</div></div>' +
            '<div class="grafico grafico--llenar" id="g-ventas"></div>' +
            '<div class="mini-kpis"><div class="mini-kpi"><span class="mini-kpi__ic" style="--c:var(--serie-1)">' + ico('banknote') + '</span><div><small>Efectivo</small><strong>' + F.din(med.efectivo) + '</strong></div></div>' +
            '<div class="mini-kpi"><span class="mini-kpi__ic" style="--c:var(--serie-2)">' + ico('credit-card') + '</span><div><small>Tarjetas</small><strong>' + F.din(tarjetas) + '</strong></div></div>' +
            '<div class="mini-kpi"><span class="mini-kpi__ic" style="--c:var(--serie-4)">' + ico('qr-code') + '</span><div><small>QR</small><strong>' + F.din(med.qr) + '</strong></div></div>' +
            '<div class="mini-kpi"><span class="mini-kpi__ic" style="--c:var(--apagado)">' + ico('receipt') + '</span><div><small>Ticket promedio</small><strong>' + F.din(R7.promedio) + '</strong></div></div></div></section>' +
          '<section class="panel panel--ventas">' + cabPanel('Últimas ventas', '#/ventas', 'Ver todas') +
            (ult.length ? '<ul class="ult">' + ult.map(function (q) { return '<li><a href="#/ventas"><span class="ult__n"><strong>N.º ' + F.num(q.num) + '</strong><small>' + F.fechaCorta(q.ts) + ' · ' + F.hora(q.ts) + ' · ' + esc(q.pagos.map(function (y) { return LE.MEDIOS[y.m]; }).join(' + ')) + '</small></span>' +
              (q.estado === 'ok' ? '' : '<span class="badge badge--error">Anulada</span>') + '<span class="ult__t">' + F.din(q.total) + '</span></a></li>'; }).join('') + '</ul>' : '<p class="vacio">Todavía no hay ventas.</p>') +
          '</section>' +
        '</div></div>';
      P.area($('#g-ventas'), etq, [{ nombre: 'Ventas', color: 'var(--serie-1)', v: v }, { nombre: 'Ganancia bruta', color: 'var(--serie-2)', v: g }], { titulo: 'Ventas y ganancia bruta de los últimos 7 días', tips: tips, llenar: true });
    }
  };
  P.acciones = P.acciones || {};
  P.acciones['cargar-codigo'] = function (codigo) { P.rutas.productos.form(null, { codigo: codigo }); };
  P.acciones['descartar-codigo'] = function (codigo) {
    UI.confirmar('Descartar el código', 'Se saca de la lista. Si la caja lo vuelve a escanear, vuelve a aparecer.', { ok: 'Descartar', peligro: true }).then(function (si) { if (si) UI.hacer(function () { return LE.descartarCodigo(codigo); }, 'Código descartado.').then(function (r) { if (r.ok) P.rutas.productos.entrar(); }); });
  };
  P.acciones['ver-sin-cargar'] = function () { P.est('productos', { q: '', cat: '', est: '', tab: 'productos' }).tab = 'sin'; };

  /* ============================ VENTAS ============================ */
  P.rutas.ventas = {
    titulo: 'Ventas',
    entrar: function () {
      var S = P.est('ventas', { rango: 'hoy', cajero: '', estado: '', q: '' });
      P.cab('Ventas', null, '<button type="button" class="btn btn--linea" data-acc="csv-ventas">' + ico('download') + 'Descargar CSV</button>',
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
      var vs = P.rutas.ventas.lista(), tot = vs.reduce(function (a, v) { return a + (v.estado === 'ok' && !v.fiado ? v.total : 0); }, 0), cta = vs.reduce(function (a, v) { return a + (v.estado === 'ok' && v.fiado ? v.total : 0); }, 0), mostrar = vs.slice(0, 100);
      P.zona('<p class="resumen"><strong>' + vs.length + (vs.length === 1 ? ' venta' : ' ventas') + '</strong> · cobrado <strong>' + F.din(tot) + '</strong>' + (cta ? ' · a cuenta <strong>' + F.din(cta) + '</strong> (sin cobrar)' : '') + (vs.length > 100 ? ' · se muestran las últimas 100' : '') + '</p>' +
        P.tabla([
          { t: 'Ticket', c: 't-titulo', f: function (v) { return 'N.º ' + F.num(v.num) + '<small>' + F.fecha(v.ts) + ' · ' + F.hora(v.ts) + '</small>'; } },
          { t: 'Total', c: 't-derecha', f: function (v) { return v.estado === 'ok' ? F.din(v.total) : '<s class="suave">' + F.din(v.total) + '</s>'; } },
          { t: 'Cajera', f: function (v) { return esc(v.cajero); } },
          { t: 'Cobro', f: function (v) { return v.fiado ? 'A cuenta de ' + esc(v.deudorNombre || '') : v.pagos.map(function (p) { return LE.MEDIOS[p.m]; }).join(' + '); } },
          { t: 'Estado', f: function (v) { return v.estado === 'ok' ? (v.sync === false ? '<span class="badge badge--alerta">Sin enviar</span>' : v.fiado ? '<span class="badge badge--acento">A cuenta</span>' : '<span class="badge badge--ok">Cobrada</span>') : '<span class="badge badge--error">Anulada</span>'; } },
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
        acciones: [{ texto: 'Volver', clase: 'btn--linea' }, { texto: 'Anular venta', clase: 'btn--peligro', cerrar: false, accion: function () { var x = UI.valores(ctl); UI.hacer(function () { return LE.anularVenta(id, x.m + (x.d ? ': ' + x.d : '')); }, 'Venta anulada.').then(function (r) { if (r.ok) { ctl.cerrar(); P.refrescar(); } }); return false; } }]
      });
    },
    csv: function () {
      var vs = P.rutas.ventas.lista().slice().reverse(); var f = [['Ticket', 'Fecha', 'Hora', 'Cajera', 'Medios', 'Total', 'Estado']];
      vs.forEach(function (v) { f.push([F.num(v.num), F.fecha(v.ts), F.hora(v.ts), v.cajero, v.pagos.map(function (p) { return LE.MEDIOS[p.m]; }).join('+'), (v.total / 100).toFixed(0), v.estado === 'ok' ? 'Cobrada' : 'Anulada']); });
      UI.descargarCSV('ventas-la-estrella.csv', f);
    }
  };

  /* ============================ PRODUCTOS ============================ */
  function CODIGO_HTML(p, destacado) {
    return '<div id="f-codigo"><label class="campo' + (destacado ? ' campo--escaneo' : '') + '"><span>Código de barras</span><input name="codigo" class="entrada" inputmode="numeric" autocomplete="off" value="' + esc(p.codigo) + '" placeholder="' + (destacado ? 'Escaneá acá' : 'Escaneálo con el lector') + '">' + (destacado ? '' : '<small>Poné el cursor acá y pasá el producto por el lector: el código se escribe solo.</small>') + '</label></div>';
  }
  P.rutas.productos = {
    titulo: 'Productos',
    entrar: function () {
      var S = P.est('productos', { q: '', cat: '', est: '', tab: 'productos' }), pend = LE.codigosSinCargar().length;
      P.cab('Productos', null, '<button type="button" class="btn btn--acento" data-acc="producto-nuevo">' + ico('plus') + 'Nuevo producto</button>',
        P.tabs([['productos', 'Productos'], ['sin', 'Sin cargar' + (pend ? ' · ' + pend : '')]], S.tab) + (S.tab === 'sin' ? '' :
        '<input class="entrada" data-filtro="q" placeholder="Buscar por nombre o código" value="' + esc(S.q) + '" aria-label="Buscar producto">' +
        '<select class="entrada" data-filtro="cat" aria-label="Categoría">' + UI.opciones(LE.categorias(), S.cat, 'Todas las categorías') + '</select>' +
        '<select class="entrada" data-filtro="est" aria-label="Estado"><option value="">Todos</option><option value="baja"' + (S.est === 'baja' ? ' selected' : '') + '>Dados de baja</option><option value="bajo"' + (S.est === 'bajo' ? ' selected' : '') + '>Stock bajo</option></select>'));
      P.rutas.productos.pintar();
    },
    /* Códigos que la caja escaneó y todavía no están cargados */
    pintarSinCargar: function () {
      var lista = LE.codigosSinCargar().sort(function (a, b) { return (b.veces - a.veces) || (b.ultima - a.ultima); });
      if (!lista.length) return P.zona('<div class="tarjeta"><p class="vacio">No hay códigos pendientes.<br>Cuando la caja escanee un producto que no está cargado, aparece acá con las veces que se pidió.</p></div>');
      P.zona('<p class="resumen"><strong>' + lista.length + (lista.length === 1 ? ' código' : ' códigos') + '</strong> por cargar</p>' + P.tabla([
        { t: 'Código', c: 't-titulo', f: function (c) { return '<span class="mono">' + esc(c.codigo) + '</span><small>primera vez ' + F.fechaCorta(c.primera) + '</small>'; } },
        { t: 'Escaneos', f: function (c) { return '<strong>' + c.veces + '</strong> ' + (c.veces === 1 ? 'vez' : 'veces'); } },
        { t: 'Último', f: function (c) { return F.fechaCorta(c.ultima) + ' · ' + F.hora(c.ultima) + '<small>' + esc(c.por || '') + '</small>'; } },
        { t: '', c: 't-acciones', f: function (c) { return '<button type="button" class="btn btn--chico btn--acento" data-acc="cargar-codigo" data-id="' + esc(c.codigo) + '">' + ico('plus') + 'Cargar</button><button type="button" class="btn btn--chico btn--linea" data-acc="descartar-codigo" data-id="' + esc(c.codigo) + '">Descartar</button>'; } }
      ], lista));
    },
    pintar: function () {
      var tsc = document.querySelector('.pestana[data-id="sin"]'), nsc = LE.codigosSinCargar().length; if (tsc) tsc.textContent = 'Sin cargar' + (nsc ? ' · ' + nsc : '');
      if (P.est('productos').tab === 'sin') return P.rutas.productos.pintarSinCargar();
      var S = P.est('productos'), q = S.q.trim().toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
      var ps = LE.productos().filter(function (p) {
        if (S.cat && p.cat !== S.cat) return false;
        if (S.est === 'baja' && p.activo) return false;
        if (S.est === 'bajo' && !(p.activo && LE.nivelStock(p) !== 'ok')) return false;
        if (q) { var n = p.nombre.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, ''); if (n.indexOf(q) < 0 && p.codigo.indexOf(q) < 0 && p.plu.indexOf(q) < 0) return false; }
        return true;
      });
      P.zona('<p class="resumen"><strong>' + ps.length + ' productos</strong></p>' + P.tabla([
        { t: 'Producto', c: 't-titulo', f: function (p) { return P.celdaProd(p, esc(p.cat) + ' · ' + (p.unidad === 'kg' ? 'por kg · PLU ' + p.plu : 'código ' + esc(p.codigo))); } },
        { t: 'Precio', c: 't-derecha', f: function (p) { return F.din(p.precio) + (p.unidad === 'kg' ? '<small>por kg</small>' : ''); } },
        { t: 'Costo', f: function (p) { return F.din(p.costo); } },
        { t: 'Margen', f: function (p) { return p.precio ? Math.round((p.precio - p.costo) * 100 / p.precio) + ' %' : '—'; } },
        { t: 'Stock', f: function (p) { var s = p.unidad === 'kg' ? F.kg(p.stock) : p.stock + ' u'; return p.stock <= 0 ? '<span class="badge badge--error">Sin stock</span>' : LE.nivelStock(p) === 'alerta' ? '<span class="badge badge--alerta">' + s + ' · bajo</span>' : s; } },
        { t: 'Estado', f: function (p) { return p.activo ? '<span class="badge badge--ok">Activo</span>' : '<span class="badge">De baja</span>'; } },
        { t: '', c: 't-acciones', f: function (p) { return '<button type="button" class="btn btn--chico btn--linea" data-acc="producto" data-id="' + p.id + '">' + ico('pencil') + 'Editar</button>'; } }
      ], ps.slice(0, 150), { clase: function (p) { return p.activo ? '' : 'is-baja'; } }) + (ps.length > 150 ? '<p class="suave" style="margin-top:10px">Se muestran 150: afiná la búsqueda para ver el resto.</p>' : ''));
    },
    form: function (id, pre) {
      var nuevo = !id, p = id ? LE.producto(id) : { nombre: '', cat: LE.categorias()[0], unidad: 'u', codigo: (pre && pre.codigo) || '', plu: '', costo: 0, precio: 0, iva: 22, minimo: 0, prov: '', stock: 0, activo: true };
      var regimen = LE.negocio().regimen;
      var ctl = UI.modal({
        titulo: nuevo ? 'Nuevo producto' : 'Editar producto', ancha: true,
        cuerpo: (nuevo ? '<div class="escanear">' + ico('scan-barcode', 'icon--g') + '<div><strong>Escaneá el producto</strong><small>Pasalo por el lector: si ya está cargado te lo muestro y, si no, completo lo que se pueda. Después solo falta el precio.</small></div></div>' + CODIGO_HTML(p, true) + '<div id="f-aviso" class="nota" hidden></div>' : '') +
          (p.foto ? '<div class="foto-form">' + UI.foto(p, 'foto--grande') + '<small class="suave">Foto de ejemplo del producto</small></div>' : '') + '<label class="campo"><span>Nombre (máx. 28 letras, para que entre en el ticket)</span><input name="nombre" class="entrada" maxlength="28" value="' + esc(p.nombre) + '"></label>' +
          '<div class="fila-campos"><label class="campo"><span>Categoría</span><select name="cat" class="entrada">' + UI.opciones(LE.categorias(), p.cat) + '<option value="__nueva"' + (LE.categorias().length ? '' : ' selected') + '>Otra categoría…</option></select></label>' +
          '<label class="campo"><span>Se vende por</span><select name="unidad" class="entrada"><option value="u"' + (p.unidad === 'u' ? ' selected' : '') + '>Unidad</option><option value="kg"' + (p.unidad === 'kg' ? ' selected' : '') + '>Peso (kg)</option></select></label></div>' +
          '<label class="campo" id="f-catnueva" hidden><span>Nombre de la categoría nueva</span><input name="catNueva" class="entrada" maxlength="40" placeholder="Ej.: Almacén"></label>' +
          (nuevo ? '' : CODIGO_HTML(p, false)) +
          '<div id="f-plu" hidden><label class="campo"><span>Código de balanza (PLU, 5 números)</span><input name="plu" class="entrada" inputmode="numeric" maxlength="5" value="' + esc(p.plu) + '"><small id="f-ejemplo"></small></label></div>' +
          '<div class="fila-campos"><label class="campo"><span>Costo</span><input name="costo" class="entrada" inputmode="decimal" value="' + UI.deCentavos(p.costo) + '"></label><label class="campo"><span>Precio de venta</span><input name="precio" class="entrada" inputmode="decimal" value="' + UI.deCentavos(p.precio) + '"></label></div>' +
          '<p class="suave" id="f-margen" style="margin:-4px 0 14px"></p>' +
          '<div class="fila-campos"><label class="campo"><span>Avisar cuando quede menos de</span><input name="minimo" class="entrada" inputmode="decimal" value="' + p.minimo + '"></label>' +
          '<label class="campo"><span>' + (nuevo ? 'Stock inicial' : 'Stock actual') + '</span><input name="stockInicial" class="entrada" inputmode="decimal" value="' + p.stock + '"' + (nuevo ? '' : ' disabled') + '>' + (nuevo ? '' : '<small>Se cuenta desde Stock → Ajustar → Contar stock.</small>') + '</label></div>' +
          '<div class="fila-campos"><label class="campo"><span>Proveedor</span><select name="prov" class="entrada">' + UI.opciones(LE.proveedores(), p.prov, 'Sin proveedor') + '</select></label>' +
          '<label class="campo"><span>IVA' + (regimen === 'monotributo' ? ' (hoy no se cobra: monotributo)' : '') + '</span><select name="iva" class="entrada">' + [22, 10, 0].map(function (x) { return '<option value="' + x + '"' + (p.iva === x ? ' selected' : '') + '>' + (x ? x + ' %' : 'Exento') + '</option>'; }).join('') + '</select></label></div>',
        acciones: [{ texto: 'Cancelar', clase: 'btn--linea' }].concat(nuevo ? [] : [{ texto: p.activo ? 'Dar de baja' : 'Reactivar', clase: 'btn--linea', cerrar: false, accion: function (c) { UI.hacer(function () { return LE.activarProducto(id, !p.activo); }, p.activo ? 'Producto dado de baja.' : 'Producto reactivado.').then(function (r) { if (r.ok) { c.cerrar(); P.refrescar(); } }); return false; } }]).concat(nuevo ? [{ texto: 'Guardar y escanear otro', clase: 'btn--linea', cerrar: false, accion: function () { return guardar(true); } }] : []).concat([{ texto: 'Guardar', clase: 'btn--tinta', cerrar: false, accion: function () { return guardar(false); } }])
      });
      function guardar(otro) {
        var v = UI.valores(ctl);
        UI.hacer(function () { return LE.guardarProducto({ id: id, nombre: v.nombre, cat: v.cat === '__nueva' ? String(v.catNueva || '').trim() : v.cat, unidad: v.unidad, codigo: v.codigo, plu: v.plu, costo: UI.aCentavos(v.costo), precio: UI.aCentavos(v.precio), iva: v.iva, minimo: UI.aNumero(v.minimo), prov: v.prov, stockInicial: UI.aNumero(v.stockInicial) }); }, 'Producto guardado.').then(function (r) { if (r.ok) { ctl.cerrar(); P.refrescar(); if (otro) P.rutas.productos.form(); } });
        return false;
      }
      /* Código escaneado: ¿ya está cargado? Si no, se buscan nombre y categoría en bases públicas. */
      var ultimo = '', aviso = ctl.$('#f-aviso');
      function nota(tipo, html) { if (!aviso) return; aviso.hidden = !html; aviso.className = 'nota' + (tipo === 'ya' ? ' nota--alerta' : tipo === 'ok' ? ' nota--ok' : ''); aviso.innerHTML = html || ''; }
      function revisar() {
        var cod = ctl.$('[name=codigo]').value.trim(); if (!nuevo || ctl.$('[name=unidad]').value === 'kg' || !/^\d{8,14}$/.test(cod) || cod === ultimo) return; ultimo = cod;
        var ya = LE.productos(true).filter(function (x) { return x.codigo === cod; })[0];
        if (ya) { nota('ya', ico('triangle-alert') + '<span>Ese código ya está cargado: <strong>' + esc(ya.nombre) + '</strong> (' + F.din(ya.precio) + (ya.activo ? '' : ', dado de baja') + '). <button type="button" class="btn btn--chico btn--linea" id="f-abrir">Abrir</button></span>'); ctl.$('#f-abrir').onclick = function () { ctl.cerrar(); P.rutas.productos.form(ya.id); }; return; }
        nota('info', ico('scan-barcode') + '<span>Buscando el producto en bases públicas…</span>'); ctl.$('[name=nombre]').focus();
        UI.consultarCodigo(cod).then(function (r) {
          if (ctl.$('[name=codigo]').value.trim() !== cod) return;
          if (r) {
            var nom = ctl.$('[name=nombre]'), cat = ctl.$('[name=cat]');
            if (!nom.value.trim()) nom.value = r.nombre;
            if (r.cat && [].some.call(cat.options, function (o) { return o.value === r.cat; })) cat.value = r.cat;
            nota('ok', ico('circle-check') + '<span>Encontrado: <strong>' + esc(r.completo) + '</strong> (' + esc(r.fuente) + '). Revisá el nombre, poné el precio y listo.</span>');
          } else nota('info', ico('info') + '<span>No está en las bases públicas (o no hay conexión). Escribí el nombre y el precio: queda guardado para la próxima vez.</span>');
          ver(); var ae = document.activeElement; if (!ae || ae === document.body || ae.name === 'codigo' || ae.name === 'nombre') (ctl.$('[name=nombre]').value.trim() ? ctl.$('[name=precio]') : ctl.$('[name=nombre]')).focus();
        });
      }
      var tdeb; ctl.cuerpo.addEventListener('input', function (e) { if (e.target.name === 'codigo') { clearTimeout(tdeb); tdeb = setTimeout(revisar, 700); } });
      ctl.cuerpo.addEventListener('change', function (e) { if (e.target.name === 'codigo') revisar(); });
      if (nuevo && p.codigo) setTimeout(revisar, 80);   // el cursor ya arranca en el código: lo pone la ventana al abrirse
      function ver() {
        var v = UI.valores(ctl), kg = v.unidad === 'kg'; ctl.$('#f-codigo').hidden = kg; ctl.$('#f-plu').hidden = !kg; ctl.$('#f-catnueva').hidden = v.cat !== '__nueva';
        var c = UI.aCentavos(v.costo), pr = UI.aCentavos(v.precio);
        ctl.$('#f-margen').textContent = pr ? 'Ganancia por ' + (kg ? 'kilo' : 'unidad') + ': ' + F.din(pr - c) + ' (' + Math.round((pr - c) * 100 / pr) + ' % del precio)' : '';
        var pl = ctl.$('#f-ejemplo'); pl.textContent = kg && /^\d{5}$/.test(v.plu) ? 'Etiqueta de 350 g: ' + LE.ean13(LE.negocio().balanza.prefijo + v.plu + '00350') : 'La balanza imprime este PLU dentro del código de la etiqueta.';
      }
      ctl.cuerpo.addEventListener('input', ver); ctl.cuerpo.addEventListener('change', ver);
      ctl.cuerpo.addEventListener('keydown', function (e) { if (e.key === 'Enter' && e.target.name === 'codigo') { e.preventDefault(); clearTimeout(tdeb); if (nuevo && /^\d{8,14}$/.test(e.target.value.trim()) && e.target.value.trim() !== ultimo) revisar(); else (ctl.$('[name=nombre]').value.trim() ? ctl.$('[name=precio]') : ctl.$('[name=nombre]')).focus(); } });
      ver();
    }
  };

  /* ============================ Navegación ============================ */
  P.refrescar = function () { var r = P.rutas[P.actual]; if (r && r.pintar) r.pintar(); if (P.pintarNav) P.pintarNav(); };
  function ir() {
    var k = (location.hash.replace(/^#\/?/, '') || 'inicio').split('?')[0]; if (!P.rutas[k]) k = 'inicio';
    P.actual = k; P.rutas[k].entrar(); $('#miga').textContent = P.rutas[k].titulo;
    if (LE.nubeActiva && LE.nube) LE.nube.cargar().catch(function () { });   // datos frescos del servidor al cambiar de sección
    UI.$$('.menu__link[data-vista]').forEach(function (a) { if (a.dataset.vista === k) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current'); });
    cerrarMenu(); cerrarAvisos(); P.pintarNav(); document.title = P.rutas[k].titulo + ' — La Estrella'; window.scrollTo(0, 0);
  }
  function cerrarMenu() { $('#menu').classList.remove('menu--abierto'); var b = $('#btn-menu'); if (b) b.setAttribute('aria-expanded', 'false'); }
  window.addEventListener('hashchange', ir);
  /* Campana de avisos: se abre y se cierra sola al tocar afuera, con Escape o al elegir un aviso */
  function cerrarAvisos() { var p = $('#pop-avisos'), b = $('#btn-avisos'); if (p) p.hidden = true; if (b) b.setAttribute('aria-expanded', 'false'); }
  document.addEventListener('click', function (e) {
    var b = e.target.closest('#btn-avisos'), p = $('#pop-avisos'); if (!p) return;
    if (b) { var abrir = p.hidden; if (abrir) P.pintarNav(); p.hidden = !abrir; b.setAttribute('aria-expanded', abrir ? 'true' : 'false'); return; }
    if (!e.target.closest('#pop-avisos') || e.target.closest('#pop-avisos a')) cerrarAvisos();
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') cerrarAvisos(); });
  document.addEventListener('le:datos', function () { if (P.pintarNav) P.pintarNav(); });
  setInterval(function () { if (!document.hidden && P.pintarNav) P.pintarNav(); }, 30000);

  document.addEventListener('click', function (e) {
    var t = e.target;
    if (t.closest('#btn-menu')) { $('#menu').classList.add('menu--abierto'); $('#btn-menu').setAttribute('aria-expanded', 'true'); return; }
    if (t.closest('#menu-cerrar')) return cerrarMenu();
    if (t.closest('#salir')) { UI.hacer(function () { return LE.salir(); }).then(function (r) { if (r.ok) location.href = '../index.html'; }); return; }
    var rg = t.closest('[data-rango]');
    if (rg) { var S = P.est(P.actual); S.rango = rg.dataset.rango; UI.$$('[data-rango]').forEach(function (c) { c.setAttribute('aria-pressed', c === rg ? 'true' : 'false'); }); P.refrescar(); return; }
    var fc = t.closest('button[data-filtro]');
    if (fc) { var S2 = P.est(P.actual); S2[fc.dataset.filtro] = fc.dataset.valor; UI.$$('.chip[data-filtro="' + fc.dataset.filtro + '"]').forEach(function (c) { c.setAttribute('aria-pressed', c.dataset.valor === fc.dataset.valor ? 'true' : 'false'); }); P.refrescar(); return; }
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

  /* Cada pocos segundos llegan datos nuevos y la pantalla se redibuja. Si hay un formulario a medio completar (o el cursor está
     escribiendo en uno), NO se redibuja: se perdería lo escrito. Al guardar, cambiar de sección o recargar se pone al día. */
  function escribiendo() {
    var z = $('#zona'); if (!z) return false;
    var a = document.activeElement; if (a && z.contains(a) && /^(INPUT|SELECT|TEXTAREA)$/.test(a.tagName)) return true;
    return UI.$$('input, select, textarea', z).some(function (c) {
      if (c.type === 'checkbox' || c.type === 'radio') return c.checked !== c.defaultChecked;
      if (c.tagName === 'SELECT') { var d = 0; for (var i = 0; i < c.options.length; i++) if (c.options[i].defaultSelected) { d = i; break; } return c.selectedIndex !== d; }
      return c.value !== c.defaultValue;
    });
  }
  document.addEventListener('le:datos', function () { if (!UI.hayModal() && P.actual && !escribiendo()) { P.alActualizar = true; try { P.refrescar(); } finally { P.alActualizar = false; } } });
  $('#bar-avatar').textContent = UI.iniciales(usuario.nombre); $('#bar-nombre').textContent = usuario.nombre; $('#pie-nombre').textContent = usuario.nombre; $('#pie-rol').textContent = 'Administración · control total';
  P.acciones = P.acciones || {}; P.iniciar = ir; UI.iniciarReloj();
  P.acciones.registro = function () { P.est('equipo', { tab: 'personas', rango: '7', q: '' }).tab = 'registro'; };
  window.addEventListener('DOMContentLoaded', function () { if (!P.diferido) ir(); });
  if (document.readyState !== 'loading' && !P.diferido) setTimeout(function () { if (!P.actual) ir(); }, 0);
})();
