/* ============================================================
   ANCAP SANTA MARÍA — panel de atrás · núcleo + Inicio, Pedidos y Consultas
   Las demás secciones están en panel-gestion.js, que también arranca el panel.
   ============================================================ */
(function () {
  'use strict';
  var A = window.AG, esc = A.esc, pesos = A.pesos;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  function ic(id, cls) { return '<svg class="icon ' + (cls || '') + '" aria-hidden="true"><use href="#i-' + id + '"/></svg>'; }
  function ib(id) { return '<svg class="icon-brand" aria-hidden="true"><use href="#b-' + id + '"/></svg>'; }

  var PAN = { secs: {}, orden: [], acc: {}, chg: {}, frm: {}, F: { pedidos: { est: 'nuevo' }, consultas: { est: 'nueva' }, productos: { q: '', cat: '', ver: '' }, reportes: { dias: 7 }, registro: { q: '' }, clientes: { q: '' } }, U: null, sec: 'inicio' };
  window.PAN = PAN; PAN.$ = $; PAN.$$ = $$; PAN.ic = ic; PAN.ib = ib; PAN.esc = esc; PAN.pesos = pesos;
  PAN.registrar = function (id, def) { def.id = id; PAN.secs[id] = def; PAN.orden.push(id); };

  /* ---------- utilidades de interfaz ---------- */
  PAN.pill = function (estado, txt) { return '<span class="pill pill--' + estado + '">' + esc(txt || A.ESTADO_TXT[estado] || estado) + '</span>'; };
  PAN.kpi = function (l, v, s, href, tono) {
    var cuerpo = '<p class="kpi__l">' + esc(l) + '</p><p class="kpi__v num">' + v + '</p>' + (s ? '<p class="kpi__s">' + s + '</p>' : '');
    return href ? '<a class="kpi kpi--link ' + (tono || '') + '" href="' + href + '">' + cuerpo + '</a>' : '<div class="kpi ' + (tono || '') + '">' + cuerpo + '</div>';
  };
  PAN.cab = function (titulo, extra) { return '<div class="cab-sec"><h2>' + esc(titulo) + '</h2>' + (extra ? '<div class="cab-sec__a">' + extra + '</div>' : '') + '</div>'; };
  PAN.vacio = function (txt, icono) { return '<div class="vacio">' + ic(icono || 'info', 'icon--xl') + '<p>' + esc(txt) + '</p></div>'; };

  var modalCount = 0;
  PAN.modal = function (o) {
    var m = document.createElement('div'); m.className = 'modal'; m.setAttribute('role', 'dialog'); m.setAttribute('aria-modal', 'true'); m.setAttribute('aria-label', o.titulo);
    m.innerHTML = '<div class="modal__velo" data-acc="cerrar-modal"></div><div class="modal__caja' + (o.ancho ? ' modal__caja--' + o.ancho : '') + '"><div class="modal__cab"><h2>' + esc(o.titulo) + '</h2><button class="icono-b" data-acc="cerrar-modal" aria-label="Cerrar">' + ic('x', 'icon--g') + '</button></div><div class="modal__cuerpo">' + o.cuerpo + '</div>' + (o.pie ? '<div class="modal__pie">' + o.pie + '</div>' : '') + '</div>';
    m._previo = document.activeElement;
    $('#modales').appendChild(m); document.documentElement.classList.add('bloqueado');
    requestAnimationFrame(function () { m.classList.add('abierto'); var f = $('input:not([type=hidden]), select, textarea, button.btn', m.querySelector('.modal__cuerpo')) || $('.icono-b', m); if (f) try { f.focus({ preventScroll: true }); } catch (e) { } });
    return m;
  };
  PAN.cerrarModal = function (m) {
    m = m || $$('.modal').pop(); if (!m) return;
    m.classList.remove('abierto'); setTimeout(function () { if (m.parentNode) m.parentNode.removeChild(m); if (!$$('.modal').length) document.documentElement.classList.remove('bloqueado'); }, 240);
    if (m._previo && document.body.contains(m._previo)) try { m._previo.focus(); } catch (e) { }
  };
  PAN.confirmar = function (txt, botonTxt, peligro) {
    return new Promise(function (res) {
      var m = PAN.modal({ titulo: 'Confirmar', cuerpo: '<p>' + esc(txt) + '</p>', ancho: 'chico', pie: '<button class="btn btn--borde" data-conf="0">Cancelar</button><button class="btn ' + (peligro ? 'btn--peligro' : '') + '" data-conf="1">' + esc(botonTxt || 'Confirmar') + '</button>' });
      m.addEventListener('click', function (e) { var b = e.target.closest('[data-conf]'); if (!b) return; PAN.cerrarModal(m); res(b.getAttribute('data-conf') === '1'); });
      m.querySelector('[data-acc="cerrar-modal"]').addEventListener('click', function () { res(false); });
    });
  };
  PAN.toast = function (txt, tipo) {
    var t = document.createElement('div'); t.className = 'toast toast--' + (tipo || 'ok'); t.setAttribute('role', 'status');
    t.innerHTML = ic(tipo === 'nuevo' ? 'bell' : (tipo === 'error' ? 'circle-alert' : 'circle-check')) + '<span>' + esc(txt) + '</span>';
    $('#toasts').appendChild(t); requestAnimationFrame(function () { t.classList.add('abierto'); });
    setTimeout(function () { t.classList.remove('abierto'); setTimeout(function () { if (t.parentNode) t.parentNode.removeChild(t); }, 300); }, tipo === 'nuevo' ? 7000 : 3200);
  };
  var audio = null;
  PAN.beep = function () {
    if (!A.get().config.sonido) return;
    try { audio = audio || new (window.AudioContext || window.webkitAudioContext)(); [660, 880].forEach(function (f, i) { var o = audio.createOscillator(), g = audio.createGain(); o.frequency.value = f; o.type = 'sine'; g.gain.setValueAtTime(.0001, audio.currentTime + i * .16); g.gain.exponentialRampToValueAtTime(.18, audio.currentTime + i * .16 + .02); g.gain.exponentialRampToValueAtTime(.0001, audio.currentTime + i * .16 + .22); o.connect(g); g.connect(audio.destination); o.start(audio.currentTime + i * .16); o.stop(audio.currentTime + i * .16 + .25); }); } catch (e) { }
  };

  /* ---------- gráficos (HTML/CSS: el texto no se achica con la pantalla) ---------- */
  function tickTxt(v) { return v >= 10000 ? '$ ' + (v / 1000).toLocaleString('es-UY') + ' mil' : pesos(v); }
  function techo(max) { if (max <= 0) return 1000; var p = Math.pow(10, Math.floor(Math.log10(max))), n = max / p; return (n <= 1 ? 1 : n <= 2 ? 2 : n <= 5 ? 5 : 10) * p; }
  PAN.barrasDias = function (datos, titulo, paso) {
    var max = Math.max.apply(null, datos.map(function (d) { return d.total; })), top = techo(max), iMax = datos.map(function (d) { return d.total; }).indexOf(max);
    paso = paso || 1;
    return '<figure class="graf" aria-label="' + esc(titulo) + '"><div class="graf__y" aria-hidden="true"><span>' + tickTxt(top) + '</span><span>' + tickTxt(top / 2) + '</span><span>$ 0</span></div>' +
      '<div class="graf__cols" style="--n:' + datos.length + '">' + datos.map(function (d, i) {
        var h = Math.max(d.total / top * 100, d.total ? 1.5 : 0);
        return '<button type="button" class="col" data-tip="' + esc(d.etiqueta + ' · ' + pesos(d.total) + ' · ' + d.pedidos + (d.pedidos === 1 ? ' pedido' : ' pedidos')) + '" style="--h:' + h + '%"><span class="col__b"></span>' +
          ((i === iMax && d.total) || i === datos.length - 1 ? '<b class="col__v num">' + pesos(d.total) + '</b>' : '') + '<span class="col__e' + (i % paso ? ' col__e--oculta' : '') + '"><span>' + esc(d.etiqueta.split(' ')[0]) + '</span><span>' + esc(d.etiqueta.split(' ')[1] || '') + '</span></span></button>';
      }).join('') + '</div>' +
      '<details class="graf__tabla"><summary>Ver como tabla</summary><table><thead><tr><th>Día</th><th>Pedidos</th><th>Ventas</th></tr></thead><tbody>' + datos.map(function (d) { return '<tr><td>' + esc(d.etiqueta) + '</td><td class="num">' + d.pedidos + '</td><td class="num">' + pesos(d.total) + '</td></tr>'; }).join('') + '</tbody></table></details></figure>';
  };
  PAN.barrasH = function (filas) {
    var max = Math.max.apply(null, filas.map(function (f) { return f.v; })) || 1;
    return '<ul class="hb">' + filas.map(function (f) { return '<li data-tip="' + esc(f.tip || '') + '" tabindex="0"><span class="hb__n">' + esc(f.n) + '</span><span class="hb__t"><i style="width:' + Math.max(f.v / max * 100, 1.5) + '%"></i></span><span class="hb__v num">' + esc(f.txt) + '</span></li>'; }).join('') + '</ul>';
  };
  function tip() {
    var t = document.createElement('div'); t.id = 'tip'; t.className = 'tip'; t.setAttribute('role', 'tooltip'); t.hidden = true; document.body.appendChild(t);
    function mostrar(el) {
      var txt = el.getAttribute('data-tip'); if (!txt) return; t.textContent = txt; t.hidden = false;
      var r = el.getBoundingClientRect(), w = t.offsetWidth, x = Math.min(Math.max(8, r.left + r.width / 2 - w / 2), window.innerWidth - w - 8);
      t.style.left = x + 'px'; t.style.top = Math.max(8, r.top - t.offsetHeight - 8) + 'px';
    }
    document.addEventListener('pointerover', function (e) { var el = e.target.closest('[data-tip]'); if (el) mostrar(el); });
    document.addEventListener('pointerout', function (e) { if (e.target.closest('[data-tip]')) t.hidden = true; });
    document.addEventListener('focusin', function (e) { var el = e.target.closest('[data-tip]'); if (el) mostrar(el); });
    document.addEventListener('focusout', function () { t.hidden = true; });
    window.addEventListener('scroll', function () { t.hidden = true; }, true);
  }

  /* ---------- ingreso ---------- */
  function ingreso() {
    var us = A.get().usuarios.filter(function (u) { return u.activo; });
    document.body.className = 'panel panel--ingreso';
    $('#app').innerHTML = '<div class="ing"><div class="ing__izq"><span class="logo"><img class="logo__img" src="../img/ancap-logo.png" alt="ANCAP" width="500" height="78"><span class="logo__b">Santa María</span></span>' +
      '<div class="ing__t"><p class="micro">Panel</p><h1>Pedidos, consultas y stock</h1><p>Entrá con tu usuario y tu PIN de 4 números.</p></div>' +
      '<p class="ing__nota">Borrador con datos de ejemplo. PIN de prueba: Administración 1234 · Mostrador 1111 · Taller 2222.</p></div>' +
      '<div class="ing__der"><form id="form-ingreso" novalidate><h2>Ingresar</h2><div class="ing__us" role="radiogroup" aria-label="Usuario">' +
      us.map(function (u, i) { return '<label class="ing__u"><input type="radio" name="u" value="' + u.id + '"' + (i === 0 ? ' checked' : '') + '><span class="ing__ua">' + esc(u.nombre.charAt(0)) + '</span><span><strong>' + esc(u.nombre) + '</strong><small>' + A.ROL_TXT[u.rol] + '</small></span></label>'; }).join('') + '</div>' +
      '<label class="campo"><span>PIN</span><input name="pin" type="password" inputmode="numeric" maxlength="4" autocomplete="off" placeholder="••••"></label><p class="aviso-caja aviso-caja--error" id="ing-error" role="alert" hidden></p>' +
      '<button class="btn btn--ancho btn--grande" type="submit">Entrar</button><a class="ing__volver" href="../index.html">' + ic('arrow-right') + 'Ver la tienda</a></form></div></div>';
    $('#form-ingreso').addEventListener('submit', function (e) {
      e.preventDefault(); var f = e.target, u = A.ingresar(f.u.value, f.pin.value);
      if (!u) { $('#ing-error').textContent = 'El PIN no es correcto.'; $('#ing-error').hidden = false; f.pin.value = ''; f.pin.focus(); return; }
      iniciarSesion(u);
    });
    var p = $('input[name=pin]'); if (p) p.focus();
  }

  /* ---------- estructura ---------- */
  var vistos = { pedidos: {}, consultas: {} };
  function marcarVistos() { var E = A.get(); E.pedidos.forEach(function (p) { vistos.pedidos[p.id] = 1; }); E.consultas.forEach(function (c) { vistos.consultas[c.id] = 1; }); }
  function iniciarSesion(u) {
    PAN.U = u; marcarVistos(); document.body.className = 'panel';
    var permitidas = PAN.orden.filter(function (id) { return A.puede(u.rol, id); });
    $('#app').innerHTML = '<div class="app"><aside class="lado" id="lado" aria-label="Secciones"><div class="lado__cab"><span class="logo"><img class="logo__img" src="../img/ancap-logo.png" alt="ANCAP" width="500" height="78"><span class="logo__b">Santa María</span></span><button class="icono-b lado__x" data-acc="menu" aria-label="Cerrar el menú">' + ic('x', 'icon--g') + '</button></div>' +
      '<nav class="lado__nav">' + permitidas.map(function (id) { var s = PAN.secs[id]; return '<a href="#' + id + '" data-sec="' + id + '">' + ic(s.i) + '<span>' + esc(s.t) + '</span><b class="nbadge num" data-nb="' + id + '" hidden></b></a>'; }).join('') + '</nav>' +
      '<div class="lado__pie"><a href="../index.html" target="_blank" rel="noopener">' + ic('arrow-up-right') + 'Ver la tienda</a><div class="lado__u"><span class="ing__ua">' + esc(u.nombre.charAt(0)) + '</span><span><strong>' + esc(u.nombre) + '</strong><small>' + A.ROL_TXT[u.rol] + '</small></span><button class="icono-b" data-acc="salir" aria-label="Salir">' + ic('log-out') + '</button></div></div></aside>' +
      '<div class="velo-lado" data-acc="menu"></div>' +
      '<div class="principal"><header class="barra"><button class="icono-b barra__menu" data-acc="menu" aria-label="Abrir el menú">' + ic('menu', 'icon--g') + '</button><h1 id="titulo-sec"></h1><div class="barra__d"><span class="reloj num" id="reloj"></span><button class="icono-b campana" data-acc="avisos" aria-label="Avisos">' + ic('bell', 'icon--g') + '<b class="nbadge nbadge--c num" id="nb-avisos" hidden></b></button></div></header><main class="cuerpo" id="cuerpo" tabindex="-1"></main></div></div>';
    reloj(); setInterval(reloj, 30000);
    ir(location.hash.slice(1));
  }
  function reloj() { var e = $('#reloj'); if (e) e.textContent = new Intl.DateTimeFormat('es-UY', { timeZone: 'America/Montevideo', weekday: 'short', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }).format(new Date()).replace('.', ''); }
  function ir(id) {
    if (!PAN.secs[id] || !A.puede(PAN.U.rol, id)) id = 'inicio';
    PAN.sec = id; if (location.hash.slice(1) !== id) history.replaceState(null, '', '#' + id);
    $$('.lado__nav a').forEach(function (a) { a.classList.toggle('activa', a.getAttribute('data-sec') === id); if (a.getAttribute('data-sec') === id) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current'); });
    $('#titulo-sec').textContent = PAN.secs[id].t; document.title = PAN.secs[id].t + ' · Panel · Ancap Santa María';
    $('#lado').classList.remove('abierto'); document.documentElement.classList.remove('bloqueado-lado');
    PAN.repintar(true);
  }
  PAN.ir = ir;
  PAN.repintar = function (arriba) {
    if (!PAN.U) return; var s = PAN.secs[PAN.sec], c = $('#cuerpo'), y = c.scrollTop, py = window.scrollY; var tp = $('#tip'); if (tp) tp.hidden = true;
    c.innerHTML = s.pintar(); c.setAttribute('data-sec', PAN.sec);
    if (!arriba) { c.scrollTop = y; window.scrollTo(0, py); } else window.scrollTo(0, 0);
    $$('.lista-scroll', c).forEach(function (l) { var k = l.getAttribute('data-k'); if (!arriba && PAN._sc && PAN._sc[k]) l.scrollTop = PAN._sc[k]; });
    pintarNav();
  };
  function pintarNav() {
    var E = A.get(), n = {
      pedidos: [E.pedidos.filter(function (p) { return p.estado === 'nuevo'; }).length, 'amarillo'],
      consultas: [E.consultas.filter(function (c) { return c.estado === 'nueva'; }).length, 'amarillo'],
      productos: [E.productos.filter(function (p) { return p.activo && A.nivelStock(p) !== 'bien'; }).length, E.productos.some(function (p) { return p.activo && p.stock <= 0; }) ? 'rojo' : 'ambar']
    };
    Object.keys(n).forEach(function (k) { var b = $('[data-nb="' + k + '"]'); if (b) { b.hidden = !n[k][0]; b.textContent = n[k][0]; b.className = 'nbadge num nbadge--' + n[k][1]; } });
    var sin = E.avisos.filter(function (a) { return !a.leido; }).length, c = $('#nb-avisos'); if (c) { c.hidden = !sin; c.textContent = sin; }
  }
  function escribiendo() { var a = document.activeElement, c = $('#cuerpo'); return $$('.modal').length > 0 || (a && /^(INPUT|TEXTAREA|SELECT)$/.test(a.tagName) && c && c.contains(a)); }

  /* ---------- eventos en vivo (pedido o consulta desde la tienda en otra pestaña) ---------- */
  function nuevos() {
    var E = A.get(), hay = false;
    E.pedidos.forEach(function (p) { if (!vistos.pedidos[p.id]) { vistos.pedidos[p.id] = 1; if (A.puede(PAN.U.rol, 'pedidos')) { hay = true; PAN.toast('Pedido nuevo #' + p.num + ' · ' + p.cliente.nombre + ' · ' + pesos(p.total), 'nuevo'); } } });
    E.consultas.forEach(function (c) { if (!vistos.consultas[c.id]) { vistos.consultas[c.id] = 1; if (A.puede(PAN.U.rol, 'consultas')) { hay = true; PAN.toast('Consulta nueva #' + c.num + ' · ' + c.marca + ' ' + c.modelo, 'nuevo'); } } });
    if (hay) PAN.beep();
  }

  /* ---------- acciones globales ---------- */
  PAN.acc['cerrar-modal'] = function (el) { PAN.cerrarModal(el.closest('.modal')); };
  PAN.acc.menu = function () { var l = $('#lado'); l.classList.toggle('abierto'); document.documentElement.classList.toggle('bloqueado-lado', l.classList.contains('abierto')); };
  PAN.acc.salir = function () { A.salir(); PAN.U = null; ingreso(); };
  PAN.acc.avisos = function () {
    var E = A.get(), lista = E.avisos;
    var m = PAN.modal({ titulo: 'Avisos al dueño', cuerpo: '<p class="suave">Así le llegarían por WhatsApp a los celulares habilitados. En este borrador el envío es simulado.</p>' +
      (lista.length ? '<ul class="avisos">' + lista.slice(0, 30).map(function (a) { return '<li class="' + (a.leido ? '' : 'nuevo') + '"><span class="av__ic">' + ic(a.tipo === 'pedido' ? 'package' : a.tipo === 'consulta' ? 'wrench' : a.tipo === 'stock' ? 'boxes' : 'circle-x') + '</span><div><p>' + esc(a.texto) + '</p><small>' + A.hace(a.ts) + '</small></div></li>'; }).join('') + '</ul>' : PAN.vacio('Todavía no hay avisos.', 'bell')) });
    A.marcarAvisos(); pintarNav(); return m;
  };
  document.addEventListener('click', function (e) {
    var el = e.target.closest('[data-acc]'); if (!el) return; var f = PAN.acc[el.getAttribute('data-acc')]; if (f) { e.preventDefault(); f(el, e); }
  });
  document.addEventListener('change', function (e) { var el = e.target.closest('[data-chg]'); if (el && PAN.chg[el.getAttribute('data-chg')]) PAN.chg[el.getAttribute('data-chg')](el, e); });
  document.addEventListener('input', function (e) { var el = e.target.closest('[data-inp]'); if (el && PAN.chg[el.getAttribute('data-inp')]) PAN.chg[el.getAttribute('data-inp')](el, e); });
  document.addEventListener('submit', function (e) { var f = e.target.closest('[data-frm]'); if (f && PAN.frm[f.getAttribute('data-frm')]) { e.preventDefault(); PAN.frm[f.getAttribute('data-frm')](f, e); } });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { if ($$('.modal').length) PAN.cerrarModal(); else if ($('#lado') && $('#lado').classList.contains('abierto')) PAN.acc.menu(); } });
  window.addEventListener('hashchange', function () { if (PAN.U) ir(location.hash.slice(1)); });

  PAN.iniciar = function () {
    tip();
    A.suscribir(function (origen) { if (!PAN.U) return; if (origen === 'otra') nuevos(); if (!escribiendo()) PAN.repintar(); else pintarNav(); });
    setInterval(function () { if (PAN.U && !escribiendo() && PAN.sec === 'inicio') PAN.repintar(); }, 60000);
    var u = A.sesion(); if (u) iniciarSesion(u); else ingreso();
  };

  /* ============================================================
     INICIO
     ============================================================ */
  PAN.registrar('inicio', {
    t: 'Inicio', i: 'layout-dashboard',
    pintar: function () {
      var E = A.get(), rol = PAN.U.rol, hoy = A.dia(Date.now());
      var pedHoy = E.pedidos.filter(function (p) { return A.dia(p.ts) === hoy && p.estado !== 'cancelado'; });
      var venHoy = pedHoy.reduce(function (a, p) { return a + p.total; }, 0);
      var nuevos = E.pedidos.filter(function (p) { return p.estado === 'nuevo'; }).length;
      var curso = E.pedidos.filter(function (p) { return p.estado === 'preparando' || p.estado === 'en_camino'; }).length;
      var cons = E.consultas.filter(function (c) { return c.estado === 'nueva'; }).length;
      var rep = E.productos.filter(function (p) { return p.activo && A.nivelStock(p) !== 'bien'; }).length;
      var h = '<div class="saludo"><h2>Hola, ' + esc(PAN.U.nombre) + '</h2><p class="suave">' + (rol === 'taller' ? 'Estas son las consultas de vehículos.' : 'Esto es lo que hay para atender ahora.') + '</p></div>';
      var kp = [];
      if (A.puede(rol, 'pedidos')) kp.push(PAN.kpi('Pedidos nuevos', nuevos, nuevos ? 'Esperando que los prepares' : 'Nada pendiente', '#pedidos', nuevos ? 'kpi--amarillo' : ''), PAN.kpi('En curso', curso, 'Preparando o en camino', '#pedidos'), PAN.kpi('Ventas de hoy', pesos(venHoy), pedHoy.length + (pedHoy.length === 1 ? ' pedido' : ' pedidos'), A.puede(rol, 'reportes') ? '#reportes' : ''));
      if (A.puede(rol, 'consultas')) kp.push(PAN.kpi('Consultas nuevas', cons, cons ? 'Sin responder' : 'Todo respondido', '#consultas', cons ? 'kpi--amarillo' : ''));
      if (A.puede(rol, 'productos')) kp.push(PAN.kpi('Para reponer', rep, E.productos.some(function (p) { return p.activo && p.stock <= 0; }) ? 'Hay productos sin stock' : 'Por debajo del mínimo', '#productos', rep ? 'kpi--aviso' : ''));
      h += '<div class="kpis">' + kp.join('') + '</div>';
      if (A.puede(rol, 'reportes')) h += '<section class="panel-c"><div class="panel-c__cab"><h3>Ventas de los últimos 7 días</h3><a class="ver" href="#reportes">Ver reportes</a></div>' + PAN.barrasDias(A.ventasPorDia(7), 'Ventas por día, últimos 7 días') + '</section>';
      h += '<div class="dos">';
      if (A.puede(rol, 'pedidos')) {
        var ult = E.pedidos.slice().sort(function (a, b) { return b.ts - a.ts; }).slice(0, 6);
        h += '<section class="panel-c"><div class="panel-c__cab"><h3>Últimos pedidos</h3><a class="ver" href="#pedidos">Ver todos</a></div><ul class="lista">' + ult.map(function (p) { return '<li><button class="fila-b" data-acc="ver-pedido" data-id="' + p.id + '"><span class="fila-b__t"><strong>#' + p.num + '</strong> ' + esc(p.cliente.nombre) + '<small>' + esc(p.cliente.zonaNombre) + ' · ' + A.hace(p.ts) + '</small></span><span class="fila-b__d num">' + pesos(p.total) + '</span>' + PAN.pill(p.estado) + '</button></li>'; }).join('') + '</ul></section>';
      }
      if (A.puede(rol, 'consultas')) {
        var uc = E.consultas.slice(0, 5);
        h += '<section class="panel-c"><div class="panel-c__cab"><h3>Consultas de vehículos</h3><a class="ver" href="#consultas">Ver todas</a></div><ul class="lista">' + uc.map(function (c) { return '<li><button class="fila-b" data-acc="ver-consulta" data-id="' + c.id + '"><span class="fila-b__t"><strong>' + esc(c.marca + ' ' + c.modelo) + '</strong>' + (c.anio ? ' ' + c.anio : '') + '<small>' + esc(c.nombre) + ' · ' + A.hace(c.ts) + '</small></span>' + PAN.pill(c.estado === 'nueva' ? 'nuevo' : c.estado, A.CONSULTA_TXT[c.estado]) + '</button></li>'; }).join('') + '</ul></section>';
      }
      return h + '</div>';
    }
  });

  /* ============================================================
     PEDIDOS
     ============================================================ */
  var SIGUIENTE = { nuevo: ['preparando', 'Empezar a preparar'], preparando: ['en_camino', 'Sale a reparto'], en_camino: ['entregado', 'Marcar entregado'] };
  function itemsTxt(p) { return p.items.length + (p.items.length === 1 ? ' producto' : ' productos'); }
  PAN.registrar('pedidos', {
    t: 'Pedidos', i: 'package',
    pintar: function () {
      var E = A.get(), F = PAN.F.pedidos, est = F.est;
      var cuenta = {}; A.ESTADOS.forEach(function (s) { cuenta[s] = E.pedidos.filter(function (p) { return p.estado === s; }).length; });
      var hoy = A.dia(Date.now());
      var lista = E.pedidos.filter(function (p) { return p.estado === est; }).sort(function (a, b) { return est === 'nuevo' || est === 'preparando' || est === 'en_camino' ? a.ts - b.ts : b.ts - a.ts; });
      if (est === 'entregado' || est === 'cancelado') lista = lista.slice(0, 40);
      var chips = A.ESTADOS.map(function (s) { return '<button class="chip" data-acc="est-pedido" data-id="' + s + '" aria-pressed="' + (s === est) + '">' + A.ESTADO_TXT[s] + '<b class="num">' + (s === 'entregado' ? E.pedidos.filter(function (p) { return p.estado === s && A.dia(p.ts) === hoy; }).length + ' hoy' : cuenta[s]) + '</b></button>'; }).join('');
      var h = PAN.cab('Pedidos') + '<div class="chips chips--p" role="group" aria-label="Estado">' + chips + '</div>';
      if (!lista.length) return h + PAN.vacio(est === 'nuevo' ? 'No hay pedidos nuevos. Cuando entre uno desde la tienda, suena un aviso acá.' : 'No hay pedidos en este estado.', 'package-check');
      return h + '<div class="pedidos">' + lista.map(function (p) {
        var sig = SIGUIENTE[p.estado];
        return '<article class="ped ped--' + p.estado + '"><header><strong class="ped__n num">#' + p.num + '</strong>' + PAN.pill(p.estado) + '<time>' + A.hace(p.ts) + '</time></header>' +
          '<p class="ped__cli"><strong>' + esc(p.cliente.nombre) + '</strong><span>' + esc(p.cliente.zonaNombre) + ' · ' + esc(p.cliente.direccion) + '</span></p>' +
          '<p class="ped__res"><span>' + itemsTxt(p) + '</span><strong class="num">' + pesos(p.total) + '</strong></p>' +
          '<footer><button class="btn btn--borde btn--chico" data-acc="ver-pedido" data-id="' + p.id + '">Ver detalle</button>' + (sig ? '<button class="btn btn--chico ' + (p.estado === 'nuevo' ? 'btn--amarillo' : '') + '" data-acc="avanzar" data-id="' + p.id + '">' + sig[1] + '</button>' : '') + '</footer></article>';
      }).join('') + '</div>';
    }
  });
  PAN.acc['est-pedido'] = function (el) { PAN.F.pedidos.est = el.getAttribute('data-id'); PAN.repintar(); };
  PAN.acc.avanzar = function (el) { var id = el.getAttribute('data-id'), p = A.get().pedidos.filter(function (x) { return x.id === id; })[0]; var s = SIGUIENTE[p.estado]; if (!s) return; A.cambiarEstado(id, s[0], PAN.U.nombre); PAN.toast('Pedido #' + p.num + ': ' + A.ESTADO_TXT[s[0]]); var m = el.closest('.modal'); if (m) PAN.cerrarModal(m); PAN.repintar(); };
  PAN.acc.cancelar = function (el) {
    var id = el.getAttribute('data-id'), p = A.get().pedidos.filter(function (x) { return x.id === id; })[0];
    PAN.confirmar('¿Cancelar el pedido #' + p.num + '? El stock de sus productos vuelve a la tienda.', 'Cancelar pedido', true).then(function (ok) { if (!ok) return; A.cambiarEstado(id, 'cancelado', PAN.U.nombre); var m = $$('.modal')[0]; if (m) PAN.cerrarModal(m); PAN.toast('Pedido #' + p.num + ' cancelado'); PAN.repintar(); });
  };
  PAN.acc['ver-pedido'] = function (el) {
    var p = A.get().pedidos.filter(function (x) { return x.id === el.getAttribute('data-id'); })[0]; if (!p) return;
    var sig = SIGUIENTE[p.estado], msg = 'Hola ' + p.cliente.nombre.split(' ')[0] + ', te escribimos de Ancap Santa María por tu pedido #' + p.num + '.';
    var cuerpo = '<div class="det"><div class="det__cab"><div>' + PAN.pill(p.estado) + '<p class="suave">' + A.fecha(p.ts) + '</p></div><strong class="det__tot num">' + pesos(p.total) + '</strong></div>' +
      '<section><h3>Cliente</h3><p><strong>' + esc(p.cliente.nombre) + '</strong></p><p>' + esc(A.fmtCel(p.cliente.tel)) + '</p><p>' + esc(p.cliente.direccion) + ' · ' + esc(p.cliente.zonaNombre) + (p.cliente.referencia ? '<br><span class="suave">' + esc(p.cliente.referencia) + '</span>' : '') + '</p>' +
      '<div class="acc-fila"><a class="btn btn--borde btn--chico" href="tel:' + p.cliente.tel + '">' + ic('phone') + 'Llamar</a><a class="btn btn--borde btn--chico" href="' + A.waLink(p.cliente.tel, msg) + '" target="_blank" rel="noopener">' + ib('whatsapp') + 'WhatsApp</a></div></section>' +
      '<section><h3>Productos</h3><ul class="res__items">' + p.items.map(function (i) { return '<li><span>' + esc(i.nombre) + ' <small class="num">× ' + (i.unidad === 'kg' ? A.cant(i.cant, 'kg') : i.cant) + '</small></span><span class="num">' + pesos(i.subtotal) + '</span></li>'; }).join('') + '</ul>' +
      '<dl class="res__tot"><div><dt>Subtotal</dt><dd class="num">' + pesos(p.subtotal) + '</dd></div><div><dt>Envío</dt><dd class="num">' + (p.envio ? pesos(p.envio) : 'Gratis') + '</dd></div><div class="res__total"><dt>Total</dt><dd class="num">' + pesos(p.total) + '</dd></div></dl><p class="suave">Pago de muestra, sin cobro real.</p>' + (p.mayor18 ? '<p class="aviso-caja">' + ic('circle-alert') + 'Lleva bebidas alcohólicas: la clienta confirmó que es mayor de 18. Pedile la cédula al entregar.</p>' : '') + '</section>' +
      '<section><h3>Historial</h3><ul class="hist">' + p.historial.map(function (h) { return '<li><span>' + A.ESTADO_TXT[h.estado] + '</span><small>' + A.fecha(h.ts) + ' · ' + esc(h.quien) + '</small></li>'; }).join('') + '</ul></section></div>';
    var pie = (p.estado !== 'cancelado' && p.estado !== 'entregado' ? '<button class="btn btn--borde btn--peligro-b" data-acc="cancelar" data-id="' + p.id + '">Cancelar pedido</button>' : '') + (sig ? '<button class="btn ' + (p.estado === 'nuevo' ? 'btn--amarillo' : '') + '" data-acc="avanzar" data-id="' + p.id + '">' + sig[1] + '</button>' : '');
    PAN.modal({ titulo: 'Pedido #' + p.num, cuerpo: cuerpo, pie: pie, ancho: 'medio' });
  };

  /* ============================================================
     CONSULTAS DE VEHÍCULO
     ============================================================ */
  function servNombre(id) { var s = A.SERVICIOS.filter(function (x) { return x.id === id; })[0]; return s ? s.nombre : id; }
  PAN.registrar('consultas', {
    t: 'Consultas', i: 'wrench',
    pintar: function () {
      var E = A.get(), est = PAN.F.consultas.est, lista = E.consultas.filter(function (c) { return c.estado === est; });
      var chips = ['nueva', 'respondida', 'cerrada'].map(function (s) { return '<button class="chip" data-acc="est-consulta" data-id="' + s + '" aria-pressed="' + (s === est) + '">' + A.CONSULTA_TXT[s] + 's<b class="num">' + E.consultas.filter(function (c) { return c.estado === s; }).length + '</b></button>'; }).join('').replace('Nuevas', 'Nuevas').replace('Respondidas', 'Respondidas');
      var h = PAN.cab('Consultas de vehículos') + '<div class="chips chips--p" role="group" aria-label="Estado">' + chips + '</div>';
      if (!lista.length) return h + PAN.vacio('No hay consultas en este estado.', 'wrench');
      return h + '<div class="pedidos">' + lista.map(function (c) {
        return '<article class="ped"><header><strong class="ped__n">' + esc(c.marca + ' ' + c.modelo) + '</strong>' + (c.anio ? '<span class="suave num">' + c.anio + '</span>' : '') + '<time>' + A.hace(c.ts) + '</time></header>' +
          '<p class="ped__cli"><strong>' + esc(c.nombre) + '</strong><span>' + esc(A.fmtCel(c.tel)) + '</span></p><p class="etiquetas">' + c.servicios.map(function (s) { return '<span class="etq">' + esc(servNombre(s)) + '</span>'; }).join('') + '</p>' +
          '<footer><button class="btn btn--chico ' + (c.estado === 'nueva' ? 'btn--amarillo' : 'btn--borde') + '" data-acc="ver-consulta" data-id="' + c.id + '">' + (c.estado === 'nueva' ? 'Responder' : 'Ver consulta') + '</button></footer></article>';
      }).join('') + '</div>';
    }
  });
  PAN.acc['est-consulta'] = function (el) { PAN.F.consultas.est = el.getAttribute('data-id'); PAN.repintar(); };
  PAN.acc['ver-consulta'] = function (el) {
    var c = A.get().consultas.filter(function (x) { return x.id === el.getAttribute('data-id'); })[0]; if (!c) return;
    var msg = 'Hola ' + c.nombre.split(' ')[0] + ', te escribimos de Ancap Santa María por tu consulta del ' + c.marca + ' ' + c.modelo + '.';
    var cuerpo = '<form data-frm="consulta-notas" data-id="' + c.id + '" class="det"><div class="det__cab"><div>' + PAN.pill(c.estado === 'nueva' ? 'nuevo' : c.estado, A.CONSULTA_TXT[c.estado]) + '<p class="suave">' + A.fecha(c.ts) + ' · consulta #' + c.num + '</p></div></div>' +
      '<section><h3>Vehículo</h3><p><strong>' + esc(c.marca + ' ' + c.modelo) + '</strong>' + (c.anio ? ' · ' + c.anio : '') + '</p><p class="etiquetas">' + c.servicios.map(function (s) { return '<span class="etq">' + esc(servNombre(s)) + '</span>'; }).join('') + '</p>' + (c.mensaje ? '<blockquote>' + esc(c.mensaje) + '</blockquote>' : '') + '</section>' +
      '<section><h3>Cliente</h3><p><strong>' + esc(c.nombre) + '</strong> · ' + esc(A.fmtCel(c.tel)) + '</p><div class="acc-fila"><a class="btn btn--borde btn--chico" href="tel:' + c.tel + '">' + ic('phone') + 'Llamar</a><a class="btn btn--borde btn--chico" href="' + A.waLink(c.tel, msg) + '" target="_blank" rel="noopener">' + ib('whatsapp') + 'WhatsApp</a></div></section>' +
      '<label class="campo"><span>Notas internas</span><textarea name="notas" placeholder="Qué se le respondió, presupuesto, turno…">' + esc(c.notas) + '</textarea></label>' +
      '<div class="acc-fila acc-fila--fin">' + (c.estado !== 'nueva' ? '<button type="button" class="btn btn--borde" data-acc="est-c-set" data-id="' + c.id + '" data-v="nueva">Reabrir</button>' : '') + (c.estado !== 'respondida' ? '<button type="button" class="btn btn--borde" data-acc="est-c-set" data-id="' + c.id + '" data-v="respondida">Marcar respondida</button>' : '') + (c.estado !== 'cerrada' ? '<button type="button" class="btn btn--borde" data-acc="est-c-set" data-id="' + c.id + '" data-v="cerrada">Cerrar</button>' : '') + '<button class="btn" type="submit">Guardar notas</button></div></form>';
    PAN.modal({ titulo: 'Consulta #' + c.num, cuerpo: cuerpo, ancho: 'medio' });
  };
  PAN.acc['est-c-set'] = function (el) { var f = el.closest('form'); A.actualizarConsulta(el.getAttribute('data-id'), { estado: el.getAttribute('data-v'), notas: f ? f.notas.value : undefined }, PAN.U.nombre); PAN.cerrarModal(el.closest('.modal')); PAN.toast('Consulta actualizada'); PAN.repintar(); };
  PAN.frm['consulta-notas'] = function (f) { A.actualizarConsulta(f.getAttribute('data-id'), { notas: f.notas.value }, PAN.U.nombre); PAN.cerrarModal(f.closest('.modal')); PAN.toast('Notas guardadas'); PAN.repintar(); };
})();
