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
  function registrar(el, redibujar) { registroGraficos = registroGraficos.filter(function (g) { return document.body.contains(g.el); }); registroGraficos.push({ el: el, redibujar: redibujar }); redibujar(); }
  P.barras = function (el, datos, o) { o = o || {}; registrar(el, function () { dibujar(el, datos, o); }); };
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
  var temp; window.addEventListener('resize', function () { clearTimeout(temp); temp = setTimeout(function () { registroGraficos = registroGraficos.filter(function (g) { return document.body.contains(g.el); }); registroGraficos.forEach(function (g) { g.redibujar(); }); }, 150); });
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

  /* ---------- Gráficos del Inicio: áreas suaves, dona y minigráficos ---------- */
  var gid = 0, MESES = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
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
    var W = Math.max(280, el.clientWidth || 320), H = o.alto || 240, mi = 46, md = 12, ms = 14, mb = 28, n = labels.length, id = 'ga' + (++gid);
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
  P.dona = function (el, items, centro) {
    var total = items.reduce(function (a, i) { return a + i.v; }, 0), S = 200, R = 74, C = 2 * Math.PI * R, ini = 0;
    if (!total) { el.innerHTML = '<p class="vacio">Todavía no hay cobros en este período.</p>'; return; }
    var s = '<div class="donut-wrap"><svg viewBox="0 0 ' + S + ' ' + S + '" width="200" height="200" role="img" aria-label="Reparto de cobros por medio de pago"><circle cx="100" cy="100" r="' + R + '" fill="none" stroke="var(--velo)" stroke-width="28"/>';
    items.forEach(function (it, k) { if (!it.v) return; var len = it.v / total * C, gap = items.filter(function (x) { return x.v; }).length > 1 ? 2 : 0; s += '<circle class="seg" tabindex="0" data-k="' + k + '" cx="100" cy="100" r="' + R + '" fill="none" stroke="' + it.c + '" stroke-width="28" stroke-dasharray="' + f1(Math.max(0, len - gap)) + ' ' + f1(C - Math.max(0, len - gap)) + '" stroke-dashoffset="' + f1(-(ini + gap / 2)) + '" transform="rotate(-90 100 100)"/>'; ini += len; });
    s += '</svg><div class="donut-centro"><strong>' + esc(centro[0]) + '</strong><small>' + esc(centro[1]) + '</small></div><div class="tip" hidden></div></div>' +
      '<div class="donut-leyenda">' + items.map(function (it) { return '<div><b>' + Math.round(it.v * 100 / total) + '<sup>%</sup></b><span><i style="background:' + it.c + '"></i>' + esc(it.n) + '</span><small>' + F.din(it.v) + '</small></div>'; }).join('') + '</div>';
    el.innerHTML = s; var tip = el.querySelector('.tip');
    el.querySelectorAll('.seg').forEach(function (g) {
      function ver(e) { var it = items[+g.dataset.k], r = el.querySelector('.donut-wrap').getBoundingClientRect(); tip.hidden = false; tip.innerHTML = '<strong>' + F.din(it.v) + '</strong>' + esc(it.n) + ' · ' + Math.round(it.v * 100 / total) + ' %'; tip.style.left = (e && e.clientX ? e.clientX - r.left : r.width / 2) + 'px'; tip.style.top = (e && e.clientY ? e.clientY - r.top - 8 : 30) + 'px'; }
      g.addEventListener('pointermove', ver); g.addEventListener('focus', function () { ver(); });
      g.addEventListener('pointerleave', function () { tip.hidden = true; }); g.addEventListener('blur', function () { tip.hidden = true; });
    });
  };
  P.spark = function (vals, tipo) {
    var n = vals.length, mx = Math.max.apply(null, vals.concat([1])), W = 120, H = 44, s = '<svg class="spark" viewBox="0 0 ' + W + ' ' + H + '" preserveAspectRatio="none" aria-hidden="true" focusable="false">';
    if (tipo === 'barras') { var bw = W / n; vals.forEach(function (v, i) { var h = Math.max(2, v / mx * (H - 4)); s += '<rect x="' + f1(i * bw + bw * .2) + '" y="' + f1(H - h) + '" width="' + f1(bw * .6) + '" height="' + f1(h) + '" rx="1.5" fill="currentColor" opacity="' + (i === n - 1 ? .95 : .55) + '"/>'; }); }
    else { var pts = vals.map(function (v, i) { return [W * i / (n - 1), H - 4 - v / mx * (H - 10)]; }), d = trazo(pts); if (tipo === 'area') s += '<path d="' + d + 'L' + W + ' ' + H + 'L0 ' + H + 'Z" fill="currentColor" opacity=".28"/>'; s += '<path d="' + d + '" fill="none" stroke="currentColor" stroke-width="2" vector-effect="non-scaling-stroke" stroke-linecap="round"/>'; }
    return s + '</svg>';
  };
  function hace(ts) { var m = Math.round((Date.now() - ts) / 60000); if (m < 1) return 'ahora'; if (m < 60) return 'hace ' + m + ' min'; var h = Math.round(m / 60); if (h < 24) return 'hace ' + h + (h === 1 ? ' hora' : ' horas'); var d = Math.round(h / 24); return d === 1 ? 'ayer' : 'hace ' + d + ' días'; }
  function iconoAccion(a) {
    var t = a.toLowerCase();
    if (/abri[óo] la caja/.test(t)) return ['wallet', 'var(--grad-rosa)']; if (/cerr[óo] la caja/.test(t)) return ['lock', 'var(--grad-violeta)'];
    if (/anul/.test(t)) return ['ban', 'var(--error)']; if (/precio|producto/.test(t)) return ['tag', 'var(--grad-azul)']; if (/compra/.test(t)) return ['truck', 'var(--naranja)'];
    if (/jornada/.test(t)) return ['clock', 'var(--grad-violeta)']; if (/stock/.test(t)) return ['boxes', 'var(--grad-azul)']; if (/cuenta|aprob|desactiv|rol|activ|persona/.test(t)) return ['user-check', 'var(--ok)'];
    return ['circle-check', 'var(--grad-rosa)'];
  }

  /* ============================ INICIO ============================ */
  P.rutas.inicio = {
    titulo: 'Inicio',
    entrar: function () {
      var h = new Date().getHours(), saludo = h < 12 ? 'Buen día' : h < 20 ? 'Buenas tardes' : 'Buenas noches';
      P.cab(saludo + ', ' + usuario.nombre.split(' ')[0], 'Así viene La Estrella · ' + new Date().toLocaleDateString('es-UY', { weekday: 'long', day: 'numeric', month: 'long' }), '<a class="btn btn--acento solo-movil" href="../caja/">' + ico('store') + 'Ir a la caja</a>');
      P.rutas.inicio.pintar();
    },
    pintar: function () {
      var S = P.est('inicio', { tab: '7' }), hoy = P.rango('hoy'), r7 = P.rango('7'), h0 = hoy[0];
      var RH = LE.reporte(hoy[0], hoy[1]), R7 = LE.reporte(r7[0], r7[1]), t = LE.turnoAbierto(), bajo = LE.stockBajo();
      // Serie del gráfico según la pestaña
      var etq = [], tips = [], v = [], g = [], Rm, perNota, tot = 0, mar = 0, tk = 0, k;
      if (S.tab === 'hoy') { Rm = RH; perNota = 'hoy'; for (k = 7; k <= 22; k++) { etq.push(k + 'h'); tips.push(k + ':00 a ' + k + ':59'); v.push(RH.porHora[k].total); g.push(RH.porHora[k].margen); } }
      else if (S.tab === 'anio') { var m = LE.mensual(); Rm = LE.reporte(P.rango('30')[0], P.rango('30')[1]); perNota = 'últimos 30 días'; m.forEach(function (x) { etq.push(MESES[new Date(x.ts).getMonth()]); tips.push(MESES[new Date(x.ts).getMonth()] + ' ' + new Date(x.ts).getFullYear() + ('')); v.push(x.total); g.push(x.margen); }); }
      else { var rr = P.rango(S.tab); Rm = LE.reporte(rr[0], rr[1]); perNota = S.tab === '30' ? 'últimos 30 días' : 'últimos 7 días'; for (var d0 = rr[0]; d0 < rr[1]; d0 += DIA) { var x = Rm.porDia[d0] || { total: 0, margen: 0 }; etq.push(P.diaCorto(d0)); tips.push(P.diaCorto(d0)); v.push(x.total); g.push(x.margen || 0); } }
      v.forEach(function (n) { tot += n; }); g.forEach(function (n) { mar += n; });
      tk = S.tab === 'anio' ? LE.mensual().reduce(function (a, x) { return a + x.tickets; }, 0) : Rm.tickets;
      var datosTabla = etq.map(function (e, i) { return { etq: e, tip: tips[i], v: v[i] }; });
      var med = Rm.porMedio, tarjetas = med.debito + med.credito;
      // Tarjetas de color (hoy y últimos 7 días)
      var dias7 = [], marg7 = [], prom7 = []; for (k = 6; k >= 0; k--) { var dd = R7.porDia[h0 - k * DIA] || { total: 0, tickets: 0, margen: 0 }; dias7.push(dd.total); marg7.push(dd.margen || 0); prom7.push(dd.tickets ? dd.total / dd.tickets : 0); }
      var usarHoy = RH.tickets > 0, prom = usarHoy ? RH.promedio : R7.promedio;
      var horasHoy = []; for (k = 7; k <= 22; k++) horasHoy.push(RH.porHora[k].total);
      // Actividad y últimas ventas
      var actividad = LE.auditoria(40).filter(function (a) { return a.usuario !== 'Sistema' || true; }).slice(0, 6);
      var ult = LE.estado.ventas.slice(-6).reverse();
      var top = Object.keys(R7.porProd).map(function (q) { return R7.porProd[q]; }).sort(function (a, b) { return b.total - a.total; }).slice(0, 6);
      var cp = LE.compras().filter(function (c) { return !c.recibida; }), pend = LE.pendientes().length, dif = LE.turnos().filter(function (q) { return q.cierre && q.contado !== q.esperado; })[0], avisos = [];
      avisos.push(t ? '<li>' + ico('circle-check') + '<span>Caja abierta por ' + esc(t.abrio) + ' desde las ' + F.hora(t.apertura) + '.</span></li>' : '<li>' + ico('lock') + '<span>La caja está cerrada ahora.</span></li>');
      if (pend) avisos.push('<li>' + ico('wifi-off') + '<span>' + pend + ' ventas esperan conexión para enviarse.</span></li>');
      if (cp.length) avisos.push('<li>' + ico('truck') + '<span>' + cp.length + (cp.length === 1 ? ' compra pedida' : ' compras pedidas') + ' esperando recibirse. <a href="#/compras">Ver</a></span></li>');
      if (dif) avisos.push('<li>' + ico('triangle-alert') + '<span>Última diferencia de caja: ' + F.din(dif.contado - dif.esperado, true) + ' (' + F.fecha(dif.cierre) + ', ' + esc(dif.cerro) + '). <a href="#/caja">Ver</a></span></li>');
      if (R7.anuladas) avisos.push('<li>' + ico('ban') + '<span>' + R7.anuladas + (R7.anuladas === 1 ? ' venta anulada' : ' ventas anuladas') + ' en los últimos 7 días.</span></li>');

      P.zona(
        '<div class="inicio-grid"><section class="tarjeta"><div class="tc-cab"><div><h3>Ventas</h3><p>Resumen de ' + (S.tab === 'hoy' ? 'hoy' : S.tab === '7' ? 'los últimos 7 días' : S.tab === '30' ? 'los últimos 30 días' : 'los últimos 12 meses completos') + '</p></div>' +
        '<div class="tabs-inline" role="tablist" aria-label="Período">' + [['hoy', 'Hoy'], ['7', '7 días'], ['30', '30 días'], ['anio', 'Año']].map(function (x) { return '<button type="button" role="tab" data-acc="inicio-tab" data-id="' + x[0] + '" aria-selected="' + (S.tab === x[0]) + '">' + x[1] + '</button>'; }).join('') + '</div>' +
        '<div class="leyenda-linea"><span><i style="background:var(--serie-1)"></i>Ventas</span><span><i style="background:var(--serie-2)"></i>Ganancia bruta</span></div></div>' +
        '<div class="tc-cifras"><div><span class="cifra">' + F.din(tot) + '</span><span class="cifra-sub">vendido en el período</span></div><div><span class="cifra">' + tk + '</span><span class="cifra-sub">ventas</span></div><a class="btn btn--acento btn--chico" href="#/reportes">Ver reportes</a></div>' +
        '<div class="grafico" id="g-ventas"></div>' + P.tablaDatos(datosTabla) +
        '<div class="mini-kpis"><div class="mini-kpi"><span class="mini-kpi__ic" style="background:var(--grad-rosa)">' + ico('banknote') + '</span><div><small>Efectivo</small><strong>' + F.din(med.efectivo) + '</strong></div></div>' +
        '<div class="mini-kpi"><span class="mini-kpi__ic" style="background:var(--grad-violeta)">' + ico('credit-card') + '</span><div><small>Tarjetas</small><strong>' + F.din(tarjetas) + '</strong></div></div>' +
        '<div class="mini-kpi"><span class="mini-kpi__ic" style="background:var(--grad-azul)">' + ico('qr-code') + '</span><div><small>QR</small><strong>' + F.din(med.qr) + '</strong></div></div>' +
        '<div class="mini-kpi"><span class="mini-kpi__ic" style="background:var(--naranja)">' + ico('receipt') + '</span><div><small>Ticket promedio</small><strong>' + F.din(Rm.promedio) + '</strong></div></div></div></section>' +
        '<section class="tarjeta"><h3>Cómo se cobró</h3><p class="cifra-sub" style="margin:-8px 0 8px">' + (S.tab === 'anio' ? 'últimos 30 días' : perNota) + '</p><div id="g-dona"></div></section></div>' +

        '<div class="cards-color">' +
        '<section class="card-color card-color--rosa" aria-label="Ventas de hoy"><div class="card-color__rotulo">Ventas de hoy</div><div class="card-color__valor">' + F.din(RH.total) + '</div><div class="card-color__sub">' + RH.tickets + (RH.tickets === 1 ? ' venta' : ' ventas') + '</div>' + P.spark(dias7, 'barras') + '</section>' +
        '<section class="card-color card-color--violeta" aria-label="Ganancia bruta de hoy"><div class="card-color__rotulo">Ganancia bruta de hoy</div><div class="card-color__valor">' + F.din(RH.margen) + '</div><div class="card-color__sub">' + P.pct(RH.margen, RH.total) + ' de lo vendido</div>' + P.spark(marg7, 'area') + '</section>' +
        '<section class="card-color card-color--azul" aria-label="Ticket promedio"><div class="card-color__rotulo">Ticket promedio</div><div class="card-color__valor">' + F.din(prom) + '</div><div class="card-color__sub">' + (usarHoy ? 'hoy' : 'últimos 7 días') + '</div>' + P.spark(prom7, 'linea') + '</section>' +
        '<section class="card-color card-color--ambar" aria-label="Efectivo en la caja"><div class="card-color__rotulo">Efectivo en la caja</div><div class="card-color__valor">' + (t ? F.din(LE.efectivoEsperado(t)) : 'Cerrada') + '</div><div class="card-color__sub">' + (t ? 'turno ' + esc(t.turno) + ' · ' + esc(t.abrio.split(' ')[0]) : 'nadie atiende ahora') + '</div>' + P.spark(horasHoy, 'barras') + '</section></div>' +

        '<div class="inicio-grid inicio-grid--actividad"><section class="tarjeta"><h3>Actividad reciente</h3><ul class="timeline">' + actividad.map(function (a) { var ic = iconoAccion(a.accion); return '<li><span class="tl-ic" style="background:' + ic[1] + '">' + ico(ic[0]) + '</span><div class="tl-txt"><strong>' + esc(a.accion) + '</strong><small>' + esc(a.usuario) + ' · ' + hace(a.ts) + '</small></div></li>'; }).join('') + '</ul><a class="btn btn--chico btn--linea" href="#/equipo" data-acc="registro">Ver todo el registro</a></section>' +
        '<section class="tarjeta tarjeta--plana"><div style="padding:16px 16px 0;display:flex;align-items:center;justify-content:space-between;gap:12px"><div><h3 style="margin:0">Últimas ventas</h3><p class="cifra-sub">Los últimos tickets cobrados</p></div><a class="btn btn--chico btn--acento" href="#/ventas">Ver todas</a></div><div style="margin-top:12px">' + P.tabla([
          { t: 'Ticket', c: 't-titulo', f: function (q) { return 'N.º ' + F.num(q.num) + '<small>' + F.fechaCorta(q.ts) + ' · ' + F.hora(q.ts) + '</small>'; } },
          { t: 'Total', c: 't-derecha', f: function (q) { return F.din(q.total); } }, { t: 'Cajera', f: function (q) { return esc(q.cajero); } },
          { t: 'Cobro', f: function (q) { return q.pagos.map(function (x) { return LE.MEDIOS[x.m]; }).join(' + '); } },
          { t: 'Estado', f: function (q) { return q.estado === 'ok' ? '<span class="badge badge--ok">Cobrada</span>' : '<span class="badge badge--error">Anulada</span>'; } }], ult) + '</div></section></div>' +

        '<div class="grid grid--2" style="margin-top:16px"><section class="tarjeta"><h3>Lo más vendido · 7 días</h3>' + (top.length ? P.ranking(top.map(function (p) { return { n: p.nombre, v: p.total, t: p.total }; }), function (i) { return F.din(i.t); }) : '<p class="vacio">Sin ventas todavía.</p>') + '</section>' +
        '<section class="tarjeta"><h3>Para reponer</h3>' + (bajo.length ? '<ul class="permisos">' + bajo.slice(0, 6).map(function (p) { return '<li><span style="flex:1">' + esc(p.nombre) + '</span><span class="badge ' + (p.stock <= 0 ? 'badge--error' : 'badge--alerta') + '">' + (p.stock <= 0 ? 'Sin stock' : (p.unidad === 'kg' ? F.kg(p.stock) : p.stock + ' u') + ' · mín. ' + p.minimo) + '</span></li>'; }).join('') + '</ul><p style="margin-top:12px"><a class="btn btn--chico btn--linea" href="#/stock">Ver todo el stock</a></p>' : '<p class="vacio">Todo en orden.</p>') + '</section></div>' +
        '<section class="tarjeta" style="margin-top:16px"><h3>Avisos</h3><ul class="permisos">' + avisos.join('') + '</ul></section>');
      P.area($('#g-ventas'), etq, [{ nombre: 'Ventas', color: 'var(--serie-1)', v: v }, { nombre: 'Ganancia bruta', color: 'var(--serie-2)', v: g }], { titulo: 'Ventas y ganancia bruta', tips: tips });
      P.dona($('#g-dona'), Object.keys(LE.MEDIOS).map(function (q) { return { n: LE.MEDIOS[q], v: med[q], c: P.COLOR_MEDIO[q] }; }), [pesosCorto(Math.round(Rm.total / 100)), 'cobrado']);
    }
  };
  P.acciones = P.acciones || {};

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
        acciones: [{ texto: 'Volver', clase: 'btn--linea' }, { texto: 'Anular venta', clase: 'btn--peligro', cerrar: false, accion: function () { var x = UI.valores(ctl); UI.hacer(function () { return LE.anularVenta(id, x.m + (x.d ? ': ' + x.d : '')); }, 'Venta anulada.').then(function (r) { if (r.ok) { ctl.cerrar(); P.refrescar(); } }); return false; } }]
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
        { t: 'Producto', c: 't-titulo', f: function (p) { return P.celdaProd(p, esc(p.cat) + ' · ' + (p.unidad === 'kg' ? 'por kg · PLU ' + p.plu : 'código ' + esc(p.codigo))); } },
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
        cuerpo: (p.foto ? '<div class="foto-form">' + UI.foto(p, 'foto--grande') + '<small class="suave">Foto de ejemplo del producto</small></div>' : '') + '<label class="campo"><span>Nombre (máx. 28 letras, para que entre en el ticket)</span><input name="nombre" class="entrada" maxlength="28" value="' + esc(p.nombre) + '"></label>' +
          '<div class="fila-campos"><label class="campo"><span>Categoría</span><select name="cat" class="entrada">' + UI.opciones(LE.categorias(), p.cat) + '<option value="__nueva"' + (LE.categorias().length ? '' : ' selected') + '>Otra categoría…</option></select></label>' +
          '<label class="campo"><span>Se vende por</span><select name="unidad" class="entrada"><option value="u"' + (p.unidad === 'u' ? ' selected' : '') + '>Unidad</option><option value="kg"' + (p.unidad === 'kg' ? ' selected' : '') + '>Peso (kg)</option></select></label></div>' +
          '<label class="campo" id="f-catnueva" hidden><span>Nombre de la categoría nueva</span><input name="catNueva" class="entrada" maxlength="40" placeholder="Ej.: Almacén"></label>' +
          '<div id="f-codigo"><label class="campo"><span>Código de barras</span><input name="codigo" class="entrada" inputmode="numeric" autocomplete="off" value="' + esc(p.codigo) + '" placeholder="Escaneálo con el lector"><small>Poné el cursor acá y pasá el producto por el lector: el código se escribe solo.</small></label></div>' +
          '<div id="f-plu" hidden><label class="campo"><span>Código de balanza (PLU, 5 números)</span><input name="plu" class="entrada" inputmode="numeric" maxlength="5" value="' + esc(p.plu) + '"><small id="f-ejemplo"></small></label></div>' +
          '<div class="fila-campos"><label class="campo"><span>Costo</span><input name="costo" class="entrada" inputmode="decimal" value="' + UI.deCentavos(p.costo) + '"></label><label class="campo"><span>Precio de venta</span><input name="precio" class="entrada" inputmode="decimal" value="' + UI.deCentavos(p.precio) + '"></label></div>' +
          '<p class="suave" id="f-margen" style="margin:-4px 0 14px"></p>' +
          '<div class="fila-campos"><label class="campo"><span>Avisar cuando quede menos de</span><input name="minimo" class="entrada" inputmode="decimal" value="' + p.minimo + '"></label>' +
          '<label class="campo"><span>' + (nuevo ? 'Stock inicial' : 'Stock actual') + '</span><input name="stockInicial" class="entrada" inputmode="decimal" value="' + p.stock + '"' + (nuevo ? '' : ' disabled') + '>' + (nuevo ? '' : '<small>Se cambia desde Stock → Ajustar.</small>') + '</label></div>' +
          '<div class="fila-campos"><label class="campo"><span>Proveedor</span><select name="prov" class="entrada">' + UI.opciones(LE.proveedores(), p.prov, 'Sin proveedor') + '</select></label>' +
          '<label class="campo"><span>IVA' + (regimen === 'monotributo' ? ' (hoy no se cobra: monotributo)' : '') + '</span><select name="iva" class="entrada">' + [22, 10, 0].map(function (x) { return '<option value="' + x + '"' + (p.iva === x ? ' selected' : '') + '>' + (x ? x + ' %' : 'Exento') + '</option>'; }).join('') + '</select></label></div>',
        acciones: [{ texto: 'Cancelar', clase: 'btn--linea' }].concat(nuevo ? [] : [{ texto: p.activo ? 'Dar de baja' : 'Reactivar', clase: 'btn--linea', cerrar: false, accion: function (c) { UI.hacer(function () { return LE.activarProducto(id, !p.activo); }, p.activo ? 'Producto dado de baja.' : 'Producto reactivado.').then(function (r) { if (r.ok) { c.cerrar(); P.refrescar(); } }); return false; } }]).concat([{ texto: 'Guardar', clase: 'btn--tinta', cerrar: false, accion: guardar }])
      });
      function guardar() {
        var v = UI.valores(ctl);
        UI.hacer(function () { return LE.guardarProducto({ id: id, nombre: v.nombre, cat: v.cat === '__nueva' ? String(v.catNueva || '').trim() : v.cat, unidad: v.unidad, codigo: v.codigo, plu: v.plu, costo: UI.aCentavos(v.costo), precio: UI.aCentavos(v.precio), iva: v.iva, minimo: UI.aNumero(v.minimo), prov: v.prov, stockInicial: UI.aNumero(v.stockInicial) }); }, 'Producto guardado.').then(function (r) { if (r.ok) { ctl.cerrar(); P.refrescar(); } });
        return false;
      }
      function ver() {
        var v = UI.valores(ctl), kg = v.unidad === 'kg'; ctl.$('#f-codigo').hidden = kg; ctl.$('#f-plu').hidden = !kg; ctl.$('#f-catnueva').hidden = v.cat !== '__nueva';
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
    P.actual = k; P.rutas[k].entrar(); $('#miga').textContent = P.rutas[k].titulo;
    if (LE.nubeActiva && LE.nube) LE.nube.cargar().catch(function () { });   // datos frescos del servidor al cambiar de sección
    UI.$$('.menu__link[data-vista]').forEach(function (a) { if (a.dataset.vista === k) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current'); });
    cerrarMenu(); document.title = P.rutas[k].titulo + ' — La Estrella'; window.scrollTo(0, 0);
  }
  function cerrarMenu() { $('#menu').classList.remove('menu--abierto'); var b = $('#btn-menu'); if (b) b.setAttribute('aria-expanded', 'false'); }
  window.addEventListener('hashchange', ir);

  document.addEventListener('click', function (e) {
    var t = e.target;
    if (t.closest('#btn-menu')) { $('#menu').classList.add('menu--abierto'); $('#btn-menu').setAttribute('aria-expanded', 'true'); return; }
    if (t.closest('#menu-cerrar')) return cerrarMenu();
    if (t.closest('#salir')) { UI.hacer(function () { return LE.salir(); }).then(function (r) { if (r.ok) location.href = '../index.html'; }); return; }
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

  document.addEventListener('le:datos', function () { if (!UI.hayModal() && P.actual) P.refrescar(); });
  $('#bar-avatar').textContent = UI.iniciales(usuario.nombre); $('#bar-nombre').textContent = usuario.nombre; $('#pie-nombre').textContent = usuario.nombre; $('#pie-rol').textContent = 'Administración · control total';
  P.acciones = P.acciones || {}; P.iniciar = ir;
  P.acciones.registro = function () { P.est('equipo', { tab: 'personas', rango: '7', q: '' }).tab = 'registro'; };
  P.acciones['inicio-tab'] = function (id) { P.est('inicio').tab = id; P.rutas.inicio.pintar(); };
  window.addEventListener('DOMContentLoaded', function () { if (!P.diferido) ir(); });
  if (document.readyState !== 'loading' && !P.diferido) setTimeout(function () { if (!P.actual) ir(); }, 0);
})();
