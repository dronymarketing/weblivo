/* ============================================================
   LA ESTRELLA — frente de caja (POS)
   Pensado para la pantalla táctil de 8" de la terminal (y para verse
   bien en el celular). El lector USB escribe el código y manda Enter:
   el campo de escaneo siempre está listo para recibirlo.
   ============================================================ */
(function () {
  'use strict';
  var $ = UI.$, esc = UI.esc, F = LE.fmt, ico = UI.ico;
  var usuario = UI.exigirSesion(['caja', 'admin'], '../index.html'); if (!usuario) return;

  var KEY = 'laestrella_ticket_v1';
  var S = cargarEstado();
  var filtro = { cat: 'Todos', q: '' };
  var pos = $('#pos'), timerCliente = null;

  /* ---------- Estado del ticket (sobrevive a un corte de luz o a recargar) ---------- */
  function nuevoTicket() { return { id: LE.uid('v'), items: [] }; }
  function cargarEstado() {
    try {
      var s = JSON.parse(localStorage.getItem(KEY));
      if (s && s.actual) {
        /* Un ticket guardado antes de conectar con la base (o en la demo) trae un identificador de otro formato: se renueva */
        var uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
        if (LE.nubeActiva) { if (!uuid.test(String(s.actual.id))) s.actual.id = LE.uid('v'); (s.espera || []).forEach(function (t) { if (!uuid.test(String(t.id))) t.id = LE.uid('v'); }); }
        return s;
      }
    } catch (e) { }
    return { actual: nuevoTicket(), espera: [], cliente: false };
  }
  function guardarEstado() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { } }
  function subtotal(i) { var p = LE.producto(i.p); return Math.round(p.precio * i.c / 100) * 100; }
  function totalTicket(t) { return (t || S.actual).items.reduce(function (a, i) { return a + subtotal(i); }, 0); }
  function cantArticulos(t) { return (t || S.actual).items.reduce(function (a, i) { return a + (LE.producto(i.p).unidad === 'kg' ? 1 : i.c); }, 0); }

  /* ---------- Barra superior ---------- */
  function acciones() {
    var t = LE.turnoAbierto(), a = LE.asistenciaAbierta(usuario.id), l = [];
    if (t) { l.push({ id: 'retiro', i: 'banknote', t: 'Retiro de efectivo' }); l.push({ id: 'cerrar', i: 'lock', t: 'Cerrar caja' }); }
    l.push({ id: 'jornada', i: 'clock', t: a ? 'Terminar jornada' : 'Empezar jornada' });
    if (t) { l.push({ id: 'cliente', i: 'monitor', t: S.cliente ? 'Ocultar pantalla del cliente' : 'Pantalla del cliente' }); l.push({ id: 'reimprimir', i: 'printer', t: 'Reimprimir último ticket' }); }
    if (usuario.rol === 'admin') l.push({ id: 'panel', i: 'chart-column', t: 'Ir al panel' });
    l.push({ id: 'salir', i: 'log-out', t: 'Salir' });
    return l;
  }
  function pintarBarra() {
    var t = LE.turnoAbierto(), red = LE.red.offline, pend = LE.pendientes().length;
    $('#chip-caja').className = 'estado ' + (t ? 'estado--ok' : 'estado--alerta');
    $('#chip-caja').innerHTML = ico(t ? 'circle-check' : 'lock') + (t ? 'Caja abierta · ' + esc(t.turno) : 'Caja cerrada');
    var cr = $('#chip-red'); cr.className = 'estado ' + (red ? 'estado--alerta' : '');
    cr.innerHTML = ico(red ? 'wifi-off' : 'wifi') + '<span class="txt-red">' + (red ? 'Sin conexión' + (pend ? ' · ' + pend + ' sin enviar' : '') : 'En línea') + '</span>' + (red && pend ? '<b>' + pend + '</b>' : '');
    cr.setAttribute('aria-label', red ? 'Sin conexión, ' + pend + ' ventas sin enviar' : 'En línea');
    $('#menu-inline').innerHTML = acciones().map(function (a) { return '<button type="button" class="btn btn--chico" data-acc="' + a.id + '" title="' + esc(a.t) + '" aria-label="' + esc(a.t) + '">' + ico(a.i) + '<span class="txt">' + esc(a.t) + '</span></button>'; }).join('');
    var d = $('#demo-red'); if (d) { d.setAttribute('aria-pressed', red ? 'true' : 'false'); d.innerHTML = ico(red ? 'wifi-off' : 'wifi') + (red ? 'Volver a conectar' : 'Simular corte de internet'); }
  }
  function accion(id) {
    ({
      retiro: abrirRetiro, cerrar: abrirCierre, salir: function () { UI.hacer(function () { return LE.salir(); }).then(function (r) { if (r.ok) location.href = '../index.html'; }); },
      panel: function () { location.href = '../panel/'; },
      jornada: function () { UI.hacer(function () { return LE.marcarAsistencia(); }).then(function (r) { if (r.ok) { UI.toast(r.valor.estado === 'entrada' ? 'Empezaste tu jornada.' : 'Terminaste tu jornada. Trabajaste ' + F.dur(r.valor.a.salida - r.valor.a.entrada) + '.', 'ok'); pintarBarra(); } }); },
      cliente: function () { S.cliente = !S.cliente; guardarEstado(); pintarCliente(); pintarBarra(); },
      reimprimir: function () { var v = LE.ultimaVenta(); if (!v) return UI.toast('Todavía no hay ventas.', 'error'); mostrarTicket(v, true); }
    })[id]();
  }
  function abrirMenuMovil() {
    var ctl = UI.modal({ titulo: 'Menú', cuerpo: '<div style="display:grid;gap:8px">' + acciones().map(function (a) { return '<button type="button" class="btn btn--bloque" style="justify-content:flex-start;min-height:56px" data-acc="' + a.id + '">' + ico(a.i, 'icon--g') + esc(a.t) + '</button>'; }).join('') + '</div>' });
    ctl.cuerpo.addEventListener('click', function (e) { var b = e.target.closest('[data-acc]'); if (b) { ctl.cerrar(); accion(b.dataset.acc); } });
  }

  /* ---------- Montaje ---------- */
  var montadaAbierta = false;
  UI.iniciarReloj();
  function montar() {
    montadaAbierta = !!LE.turnoAbierto();
    pintarBarra();
    if (!LE.turnoAbierto()) return montarCerrada();
    pos.className = 'pos';
    pos.innerHTML =
      '<div class="scan"><div class="scan__campo">' + ico('scan-barcode', 'icon--g') + '<input id="scan" class="entrada" type="text" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="Escaneá o buscá un producto" aria-label="Código de barras o nombre del producto"></div>' +
      '<details class="demo demo--pop demo--lector" id="demo"><summary class="btn btn--linea" aria-label="Lector y conexión">' + ico('scan-barcode') + '<span class="txt-pos">Lector</span></summary><div class="demo__pop"><div class="demo__chips" id="demo-chips"></div>' +
      '<div class="demo__ajustes"><button type="button" class="chip" id="demo-red" aria-pressed="false"></button></div></div></details></div>' +
      '<div class="pos__cuerpo">' +
      '<section class="pos__catalogo" id="catalogo" aria-label="Productos"><div class="cat__cab"><h2>Productos</h2><button type="button" class="btn btn--chico btn--tinta" id="cat-cerrar">Listo</button></div><div class="cats" id="cats"></div><div class="grilla" id="grilla"></div></section>' +
      '<section class="pos__ticket" aria-label="Ticket"><div class="ticket__cab"><h3>Ticket actual</h3><span id="tk-espera"></span></div><div class="lineas" id="lineas" aria-live="polite"></div>' +
      '<div class="pos__pie"><div class="totales"><span class="totales__rotulo" id="tot-rotulo"></span><span class="totales__monto" id="tot">$ 0</span></div>' +
      '<div class="pos__botones"><button type="button" class="btn btn--icono btn--linea pos__catalogo-btn" id="btn-productos" aria-label="Elegir productos de la lista">' + ico('layers') + '</button>' +
      '<button type="button" class="btn btn--icono btn--linea" id="btn-espera" aria-label="Poner en espera o ver tickets en espera"></button>' +
      '<button type="button" class="btn btn--icono btn--peligro" id="btn-anular" aria-label="Anular ticket">' + ico('trash-2') + '<span class="txt-pos">Anular</span></button>' +
      '<button type="button" class="btn btn--acento btn--grande" id="btn-cobrar">Cobrar</button></div></div></section></div>';
    pintarDemo(); pintarCats(); pintarGrilla(); pintarTicket(); pintarBarra(); pintarCliente();
    $('#scan').focus({ preventScroll: true });
  }
  function montarCerrada() {
    pos.className = 'pos pos--cerrada';
    pos.innerHTML = '<div class="cerrada"><span class="cerrada__ic">' + ico('lock', 'icon--g') + '</span><h1>La caja está cerrada</h1>' +
      '<label class="campo"><span>Efectivo con el que se abre</span><input id="base" class="entrada" inputmode="decimal" autocomplete="off" value="2500"></label>' +
      '<button type="button" class="btn btn--acento btn--grande btn--bloque" id="btn-abrir">Abrir caja</button>' +
      '</div>';
    pintarCliente();
  }

  function pintarDemo() {
    var ps = LE.productos(true), pick = function (n) { return ps.filter(function (p) { return p.nombre === n; })[0]; };
    var chips = [];
    ['Arroz Blanco 1 kg', 'Leche Entera 1 L', 'Yerba Mate 1 kg', 'Pan Flauta', 'Refresco Cola 2,25 L', 'Cerveza Lata 473 ml'].forEach(function (n) { var p = pick(n); if (p) chips.push({ t: p.nombre, c: p.codigo }); });
    var j = pick('Jamón Cocido'), q = pick('Queso Muzzarella');
    if (j) chips.push({ t: 'Jamón 350 g (balanza)', c: LE.codigoBalanza(j, .35) });
    if (q) chips.push({ t: 'Muzzarella 480 g (balanza)', c: LE.codigoBalanza(q, .48) });
    chips.push({ t: 'Código inexistente', c: '7739999999991' });
    $('#demo-chips').innerHTML = chips.map(function (c) { return '<button type="button" class="chip" data-codigo="' + esc(c.c) + '" title="' + esc(c.c) + '">' + esc(c.t) + '</button>'; }).join('');
  }

  /* ---------- Catálogo táctil ---------- */
  function pintarCats() {
    var c = ['Todos'].concat(LE.categorias());
    $('#cats').innerHTML = c.map(function (x) { return '<button type="button" class="chip" data-cat="' + esc(x) + '" aria-pressed="' + (filtro.cat === x) + '">' + esc(x) + '</button>'; }).join('');
  }
  function pintarGrilla() {
    var ps = filtro.q ? LE.buscar(filtro.q) : LE.productos(true).filter(function (p) { return filtro.cat === 'Todos' || p.cat === filtro.cat; });
    $('#grilla').innerHTML = ps.length ? ps.map(function (p) {
      return '<button type="button" class="prod' + (p.stock <= 0 ? ' prod--sin-stock' : '') + '" data-p="' + p.id + '">' + UI.foto(p, 'foto--tile') + '<span class="prod__nombre">' + esc(p.nombre) + '</span>' +
        '<span class="prod__precio">' + F.din(p.precio) + (p.unidad === 'kg' ? '<small>por kg</small>' : '') + (p.stock <= 0 ? '<small>sin stock</small>' : '') + '</span></button>';
    }).join('') : '<p class="vacio" style="grid-column:1/-1">No hay productos con “' + esc(filtro.q) + '”.</p>';
  }

  /* ---------- Ticket en curso ---------- */
  function pintarTicket(nuevoId) {
    var t = S.actual, l = $('#lineas'); if (!l) return;
    if (!t.items.length) l.innerHTML = '<div class="ticket__vacio">' + ico('scan-barcode') + '<p><strong>Ticket vacío</strong></p><button type="button" class="btn btn--tinta pos__catalogo-btn" data-abrir-cat>' + ico('layers') + 'Elegir de la lista</button></div>';
    else l.innerHTML = t.items.map(function (i, k) {
      var p = LE.producto(i.p), kg = p.unidad === 'kg';
      var ctrl = kg ? '<button type="button" class="cant__kg" data-acc-linea="peso" data-k="' + k + '" aria-label="Cambiar peso">' + F.kg(i.c) + '</button>'
        : '<span class="cant"><button type="button" data-acc-linea="menos" data-k="' + k + '" aria-label="Uno menos">' + ico('minus') + '</button><span class="cant__n">' + i.c + '</span><button type="button" data-acc-linea="mas" data-k="' + k + '" aria-label="Uno más">' + ico('plus') + '</button></span>';
      return '<div class="linea' + (nuevoId === i.p ? ' is-nueva' : '') + '" data-p="' + p.id + '"><div class="linea__prod">' + UI.foto(p, 'foto--mini') + '<div><div class="linea__nombre">' + esc(p.nombre) + '</div><div class="linea__sub">' + (kg ? F.din(p.precio) + ' por kg' : F.din(p.precio) + ' c/u') + '</div></div></div>' +
        '<div class="linea__total">' + F.din(subtotal(i)) + '</div><div>' + ctrl + '</div>' +
        '<div style="text-align:right"><button type="button" class="btn btn--chico btn--linea linea__quitar" data-acc-linea="quitar" data-k="' + k + '" aria-label="Quitar ' + esc(p.nombre) + '">' + ico('trash-2') + 'Quitar</button></div></div>';
    }).join('');
    var n = cantArticulos(), tot = totalTicket();
    $('#tot').textContent = F.din(tot); $('#tot-rotulo').textContent = n ? (n % 1 ? Math.round(n) : n) + (n === 1 ? ' artículo' : ' artículos') : 'Total';
    $('#btn-cobrar').disabled = !t.items.length; $('#btn-cobrar').textContent = 'Cobrar';
    $('#btn-anular').disabled = !t.items.length;
    var e = $('#btn-espera'); e.innerHTML = ico('pause') + '<span class="txt-pos">En espera</span>' + (S.espera.length ? '<span class="badge badge--rosa">' + S.espera.length + '</span>' : ''); e.classList.toggle('btn--ancho', !!S.espera.length);
    $('#tk-espera').innerHTML = S.espera.length ? '<span class="badge badge--rosa">' + S.espera.length + (S.espera.length === 1 ? ' en espera' : ' en espera') + '</span>' : '';
    e.disabled = !t.items.length && !S.espera.length;
    if (nuevoId) { var el = l.querySelector('.is-nueva'); if (el && el.scrollIntoView) el.scrollIntoView({ block: 'nearest' }); setTimeout(function () { var x = l.querySelector('.is-nueva'); if (x) x.classList.remove('is-nueva'); }, 1200); }
    guardarEstado(); pintarCliente();
  }
  function agregar(p, cant) {
    var t = S.actual, i = t.items.filter(function (x) { return x.p === p.id; })[0];
    if (i) i.c = p.unidad === 'kg' ? Math.round((i.c + cant) * 1000) / 1000 : i.c + cant; else t.items.push({ p: p.id, c: cant });
    var en = t.items.filter(function (x) { return x.p === p.id; })[0];
    if (p.stock - en.c < 0) UI.toast('Ojo: en el sistema quedan ' + (p.stock > 0 ? (p.unidad === 'kg' ? F.kg(p.stock) : F.cant(p.stock)) : 'cero') + ' de ' + p.nombre + '.', 'error');
    UI.beep(true); pintarTicket(p.id);
  }

  /* ---------- Escaneo ---------- */
  function escanear(texto) {
    texto = String(texto || '').trim(); if (!texto) return;
    if (!/^\d+$/.test(texto)) { // texto: búsqueda por nombre
      var r = LE.buscar(texto);
      if (r.length === 1) { var p = r[0]; if (p.unidad === 'kg') pedirPeso(p); else agregar(p, 1); }
      else { filtro.q = texto; pintarGrilla(); if (!r.length) { UI.beep(false); UI.toast('No encontré “' + texto + '”.', 'error'); } else abrirCatalogo(true); }
      return;
    }
    var e = LE.escaneo(texto);
    if (e.tipo === 'producto') agregar(e.producto, 1);
    else if (e.tipo === 'balanza') agregar(e.producto, e.cant);
    else if (e.tipo === 'baja') { UI.beep(false); UI.toast(e.producto.nombre + ' está dado de baja.', 'error'); }
    else {
      var cand = LE.buscar(texto);
      if (cand.length === 1) { var q = cand[0]; if (q.unidad === 'kg') pedirPeso(q); else agregar(q, 1); }
      else if (/^\d{8,14}$/.test(texto) && e.tipo === 'desconocido' && !/^Código de balanza/.test(e.motivo || '')) {
        UI.beep(false); LE.registrarCodigo(texto);
        if (usuario.rol === 'admin') altaRapida(texto);
        else UI.toast('Ese producto todavía no está cargado. Quedó anotado para que Administración lo cargue.', 'error');
      }
      else { UI.beep(false); UI.toast((e.motivo || 'Código no encontrado') + ': ' + texto, 'error'); }
    }
  }
  /* Producto que no está en la base: Administración lo da de alta ahí mismo, escaneado. La próxima vez ya se sabe qué es y cuánto sale. */
  function altaRapida(codigo) {
    var cats = LE.categorias(), ctl = UI.modal({
      titulo: 'Producto nuevo', cuerpo: '<div class="escanear">' + ico('scan-barcode', 'icon--g') + '<div><strong>No está cargado</strong><small>Código <span class="mono">' + esc(codigo) + '</span></small></div></div>' +
        '<div id="ar-aviso" class="nota" hidden></div>' +
        '<label class="campo"><span>Nombre (máx. 28 letras)</span><input name="nombre" class="entrada" maxlength="28" autocomplete="off"></label>' +
        '<div class="fila-campos"><label class="campo"><span>Precio de venta</span><input name="precio" class="entrada" inputmode="decimal" autocomplete="off"></label><label class="campo"><span>Costo (opcional)</span><input name="costo" class="entrada" inputmode="decimal" autocomplete="off"></label></div>' +
        '<label class="campo"><span>Categoría</span><select name="cat" class="entrada">' + UI.opciones(cats, cats[0]) + '<option value="__nueva"' + (cats.length ? '' : ' selected') + '>Otra categoría…</option></select></label>' +
        '<label class="campo" id="ar-catnueva" hidden><span>Nombre de la categoría nueva</span><input name="catNueva" class="entrada" maxlength="40"></label>',
      acciones: [{ texto: 'Cancelar', clase: 'btn--linea' }, { texto: 'Guardar y agregar', clase: 'btn--tinta', id: 'ar-ok', cerrar: false, accion: function () {
        var v = UI.valores(ctl);
        UI.hacer(function () { return LE.guardarProducto({ nombre: v.nombre, cat: v.cat === '__nueva' ? String(v.catNueva || '').trim() : v.cat, unidad: 'u', codigo: codigo, plu: '', costo: UI.aCentavos(v.costo), precio: UI.aCentavos(v.precio), iva: 22, minimo: 0, prov: '', stockInicial: 0 }); }, 'Producto guardado.').then(function (r) {
          if (r.ok) { ctl.cerrar(); pintarGrilla(); agregar(r.valor, 1); var sc = $('#scan'); if (sc) sc.focus(); }
        }); return false; } }]
    });
    var aviso = ctl.$('#ar-aviso'); ctl.$('[name=cat]').addEventListener('change', function () { ctl.$('#ar-catnueva').hidden = this.value !== '__nueva'; }); ctl.$('#ar-catnueva').hidden = ctl.$('[name=cat]').value !== '__nueva';
    ctl.cuerpo.addEventListener('keydown', function (e) { if (e.key === 'Enter' && e.target.tagName === 'INPUT') { e.preventDefault(); var n = ctl.$('[name=nombre]'), pr = ctl.$('[name=precio]'); if (e.target === n && n.value.trim()) pr.focus(); else if (e.target === pr) ctl.$('#ar-ok').click(); else if (e.target.name === 'costo') ctl.$('#ar-ok').click(); } });
    aviso.hidden = false; aviso.innerHTML = ico('scan-barcode') + '<span>Buscando el producto en bases públicas…</span>'; ctl.$('[name=nombre]').focus();
    UI.consultarCodigo(codigo).then(function (r) {
      if (!ctl.cuerpo.isConnected) return;
      if (r) {
        var nom = ctl.$('[name=nombre]'), cat = ctl.$('[name=cat]'); if (!nom.value.trim()) nom.value = r.nombre;
        if (r.cat && [].some.call(cat.options, function (o) { return o.value === r.cat; })) cat.value = r.cat;
        aviso.className = 'nota nota--ok'; aviso.innerHTML = ico('circle-check') + '<span>Encontrado: <strong>' + esc(r.completo) + '</strong>. Revisá el nombre y poné el precio.</span>'; var ae = document.activeElement; if (!ae || ae === document.body || ae.name === 'nombre') ctl.$('[name=precio]').focus();
      } else { aviso.className = 'nota'; aviso.innerHTML = ico('info') + '<span>No está en las bases públicas (o no hay conexión). Escribí el nombre y el precio.</span>'; }
    });
  }
  function abrirCatalogo(si) { pos.classList.toggle('pos--cat', !!si); }

  /* ---------- Peso (balanza) ---------- */
  function pedirPeso(p, k) {
    var actual = k != null ? S.actual.items[k].c : 0;
    var ctl = UI.modal({
      titulo: p.nombre,
      cuerpo: '<p class="suave" style="margin-bottom:12px">' + F.din(p.precio) + ' por kg</p>' +
        '<label class="campo"><span>Peso en kilos</span><input id="peso" class="entrada" inputmode="decimal" autocomplete="off" value="' + (actual ? String(actual).replace('.', ',') : '') + '" placeholder="0,350"></label>' +
        '<div class="billetes">' + ['0,250', '0,500', '1', '1,5', '2'].map(function (x) { return '<button type="button" class="chip" data-kg="' + x + '">' + x + ' kg</button>'; }).join('') + '</div>' +
        '<p class="resumen-pago"><span>Importe</span><strong id="peso-imp">$ 0</strong></p>',
      acciones: [{ texto: 'Cancelar', clase: 'btn--linea' }, { texto: k != null ? 'Cambiar peso' : 'Agregar', clase: 'btn--tinta', id: 'peso-ok', cerrar: false, accion: function () {
        var kg = Math.round(UI.aNumero(ctl.$('#peso').value) * 1000) / 1000; if (!(kg > 0) || kg > 50) { UI.toast('Escribí un peso entre 0,001 y 50 kg.', 'error'); return false; }
        if (k != null) { S.actual.items[k].c = kg; UI.beep(true); pintarTicket(); } else agregar(p, kg); ctl.cerrar(); return false; } }]
    });
    function imp() { var kg = UI.aNumero(ctl.$('#peso').value); ctl.$('#peso-imp').textContent = F.din(Math.round(p.precio * kg / 100) * 100); }
    ctl.$('#peso').addEventListener('input', imp); imp();
    ctl.cuerpo.addEventListener('click', function (e) { var b = e.target.closest('[data-kg]'); if (b) { ctl.$('#peso').value = b.dataset.kg; imp(); } });
    ctl.$('#peso').addEventListener('keydown', function (e) { if (e.key === 'Enter') { e.preventDefault(); ctl.$('#peso-ok').click(); } });
  }

  /* ---------- Cobro ---------- */
  function abrirCobro() {
    var t = S.actual; if (!t.items.length) return;
    var total = totalTicket(t), pagos = [], recibido = 0, medio = 'efectivo';
    var n = LE.negocio(), medios = Object.keys(LE.MEDIOS).filter(function (m) { return n.medios[m]; });
    if (medios.indexOf('efectivo') < 0) medio = medios[0];
    var iconos = { efectivo: 'banknote', debito: 'credit-card', credito: 'credit-card', qr: 'qr-code' };
    var ctl = UI.modal({
      titulo: 'Cobrar', persistente: true,
      cuerpo: '<div class="pagar__total"><span class="suave">Total a cobrar</span><strong id="p-total"></strong></div>' +
        '<div class="medios" id="p-medios">' + medios.map(function (m) { return '<button type="button" class="medio" data-m="' + m + '" aria-pressed="false">' + ico(iconos[m]) + LE.MEDIOS[m] + '</button>'; }).join('') + '</div>' +
        '<div id="p-hechos" class="pagos-hechos"></div>' +
        '<label class="campo" style="margin-top:14px"><span id="p-etiqueta"></span><input id="p-monto" class="entrada" inputmode="decimal" autocomplete="off"></label>' +
        '<div class="billetes" id="p-billetes"></div><div id="p-info"></div>',
      acciones: [{ texto: 'Volver al ticket', clase: 'btn--linea' }, { texto: 'Confirmar cobro', clase: 'btn--acento', id: 'p-ok', cerrar: false, accion: confirmar }]
    });
    function falta() { return total - pagos.reduce(function (a, p) { return a + p.monto; }, 0); }
    function monto() { return UI.aCentavos(ctl.$('#p-monto').value); }
    function elegir(m, mantener) {
      medio = m; ctl.$$('.medio').forEach(function (b) { b.setAttribute('aria-pressed', b.dataset.m === m ? 'true' : 'false'); });
      if (!mantener) ctl.$('#p-monto').value = UI.deCentavos(falta());
      ctl.$('#p-etiqueta').textContent = m === 'efectivo' ? 'Efectivo recibido' : 'Importe cobrado con ' + LE.MEDIOS[m].toLowerCase();
      var b = ctl.$('#p-billetes'); b.innerHTML = m === 'efectivo' ? '<button type="button" class="chip" data-bi="justo">Justo</button>' + [100, 200, 500, 1000, 2000].map(function (x) { return '<button type="button" class="chip" data-bi="' + x + '">' + F.din(x * 100) + '</button>'; }).join('') : '';
      pintar();
    }
    function pintar() {
      var f = falta(), m = monto(), info = ctl.$('#p-info');
      ctl.$('#p-total').textContent = F.din(total);
      ctl.$('#p-hechos').innerHTML = pagos.map(function (p, i) { return '<div class="pago-hecho"><span>' + esc(LE.MEDIOS[p.m]) + '</span><span><strong class="num">' + F.din(p.monto) + '</strong> <button type="button" class="btn btn--chico btn--linea btn--icono" data-quitar-pago="' + i + '" aria-label="Quitar pago">' + ico('x') + '</button></span></div>'; }).join('');
      var ok = ctl.$('#p-ok'), aplic = Math.min(m, f);
      if (medio === 'efectivo' && m > f) { info.innerHTML = '<div class="vuelto">Vuelto<strong>' + F.din(m - f) + '</strong></div>'; }
      else if (pagos.length || m < f) { info.innerHTML = '<p class="resumen-pago"><span>' + (m < f ? 'Falta cobrar' : 'A cobrar') + '</span><strong>' + F.din(m < f ? f - Math.max(m, 0) : f) + '</strong></p>'; }
      else info.innerHTML = '';
      ok.disabled = m <= 0; ok.innerHTML = m >= f ? 'Confirmar cobro' : 'Agregar pago de ' + F.din(Math.max(aplic, 0));
    }
    function confirmar() {
      var f = falta(), m = monto(); if (m <= 0) return false;
      var aplic = Math.min(m, f); if (medio === 'efectivo') recibido += m;
      pagos.push({ m: medio, monto: aplic });
      if (falta() <= 0) { finalizar(); return false; }
      ctl.$('#p-monto').value = UI.deCentavos(falta()); pintar(); return false;
    }
    function finalizar() {
      var r = UI.intentar(function () { return LE.crearVenta({ id: t.id, items: t.items.map(function (i) { return { p: i.p, c: i.c }; }), pagos: pagos, recibido: recibido }); });
      if (!r.ok) return;
      ctl.cerrar(); S.actual = nuevoTicket(); guardarEstado(); pintarTicket(); pintarBarra(); pintarGrilla();
      pintarCliente('gracias'); mostrarTicket(r.valor, false);
    }
    ctl.cuerpo.addEventListener('click', function (e) {
      var m = e.target.closest('[data-m]'); if (m) return elegir(m.dataset.m);
      var b = e.target.closest('[data-bi]'); if (b) { ctl.$('#p-monto').value = b.dataset.bi === 'justo' ? UI.deCentavos(falta()) : b.dataset.bi; return pintar(); }
      var q = e.target.closest('[data-quitar-pago]'); if (q) { var p = pagos.splice(+q.dataset.quitarPago, 1)[0]; if (p && p.m === 'efectivo') recibido = Math.max(0, recibido - p.monto); elegir(medio); }
    });
    ctl.$('#p-monto').addEventListener('input', pintar);
    ctl.$('#p-monto').addEventListener('keydown', function (e) { if (e.key === 'Enter') { e.preventDefault(); ctl.$('#p-ok').click(); } });
    elegir(medio); ctl.$('#p-monto').select();
  }

  /* ---------- Ticket emitido ---------- */
  function mostrarTicket(v, copia) {
    var texto = LE.ticketTexto(v, { copia: copia }), bytes = LE.ticketEscpos(v, { copia: copia });
    var cabecera = copia ? '' : '<div class="vuelto" style="margin:0 0 14px;' + (v.vuelto ? '' : 'background:var(--velo);color:var(--tinta)') + '">' + (v.vuelto ? 'Vuelto<strong>' + F.din(v.vuelto) + '</strong>' : 'Venta cobrada<strong>' + F.din(v.total) + '</strong>') + '</div>';
    var ctl = UI.modal({
      titulo: copia ? 'Copia del último ticket' : 'Venta ' + F.num(v.num), persistente: true, ancha: true,
      cuerpo: cabecera + '<div class="papel-marco"><pre class="papel" id="papel">' + esc(texto) + '</pre></div>' +
        '<details class="demo" style="margin:14px 0 0"><summary>' + ico('info') + ' Detalle técnico: lo que recibe la impresora (ESC/POS)</summary>' +
        '<p class="suave" style="font-size:13px;margin:8px 0">' + bytes.length + ' bytes: inicializar (1B 40), página de códigos CP858 (1B 74 13), el texto, corte (1D 56 42 00)' + (v.pagos.some(function (p) { return p.m === 'efectivo'; }) ? ' y pulso al cajón de dinero (1B 70 00 19 FA)' : '') + '. En la terminal real se envía esto directo a la impresora, sin diálogo.</p>' +
        '<pre class="mono" style="font-size:12px;overflow-x:auto;background:var(--superficie);border:var(--borde);border-radius:10px;padding:10px;margin:0">' + esc(LE.hexdump(bytes, 80)) + '</pre></details>',
      acciones: [{ texto: 'Imprimir ticket', icono: 'printer', clase: 'btn--linea', cerrar: false, accion: function () { LE.imprimirTicket(texto); return false; } }, { texto: copia ? 'Cerrar' : 'Nueva venta', clase: 'btn--tinta' }],
      alCerrar: function () { var s = $('#scan'); if (s) s.focus({ preventScroll: true }); }
    });
  }

  /* ---------- En espera ---------- */
  function ponerEnEspera() {
    var t = S.actual;
    if (t.items.length) { if (S.espera.length >= 4) return UI.toast('Ya hay 4 tickets en espera.', 'error'); S.espera.push(t); S.actual = nuevoTicket(); guardarEstado(); pintarTicket(); return UI.toast('Ticket en espera. Atendé al siguiente cliente.', 'ok'); }
    var ctl = UI.modal({ titulo: 'Tickets en espera', cuerpo: '<div style="display:grid;gap:8px">' + S.espera.map(function (x, i) { return '<button type="button" class="btn btn--bloque" style="justify-content:space-between;min-height:60px" data-i="' + i + '"><span>' + cantArticulos(x) + ' artículos</span><strong class="num">' + F.din(totalTicket(x)) + '</strong></button>'; }).join('') + '</div>' });
    ctl.cuerpo.addEventListener('click', function (e) { var b = e.target.closest('[data-i]'); if (!b) return; S.actual = S.espera.splice(+b.dataset.i, 1)[0]; guardarEstado(); ctl.cerrar(); pintarTicket(); });
  }

  /* ---------- Caja: abrir, retiro, cierre ---------- */
  function abrirCaja() {
    var base = UI.aCentavos($('#base').value);
    UI.hacer(function () { return LE.abrirCaja(base); }, 'Caja abierta. ¡Buen turno!').then(function (r) { if (r.ok) montar(); });
  }
  function abrirRetiro() {
    var t = LE.turnoAbierto(); if (!t) return;
    var ctl = UI.modal({
      titulo: 'Retiro de efectivo',
      cuerpo: '<p class="suave" style="margin-bottom:12px">En el cajón hay ' + F.din(LE.efectivoEsperado(t)) + '</p>' +
        '<div class="billetes" style="margin:0 0 14px">' + ['Retiro para administración', 'Pago a proveedor', 'Pago de reparto', 'Compra urgente'].map(function (c) { return '<button type="button" class="chip" data-c="' + esc(c) + '">' + esc(c) + '</button>'; }).join('') + '</div>' +
        '<label class="campo"><span>Concepto</span><input name="c" class="entrada" maxlength="120" autocomplete="off"></label><label class="campo"><span>Monto</span><input name="m" class="entrada" inputmode="decimal" autocomplete="off"></label>',
      acciones: [{ texto: 'Cancelar', clase: 'btn--linea' }, { texto: 'Registrar retiro', clase: 'btn--tinta', cerrar: false, accion: function () { var v = UI.valores(ctl); var r = UI.intentar(function () { LE.egresoCaja(v.c, UI.aCentavos(v.m)); }, 'Retiro registrado.'); if (r.ok) { ctl.cerrar(); pintarBarra(); } return false; } }]
    });
    ctl.cuerpo.addEventListener('click', function (e) { var b = e.target.closest('[data-c]'); if (b) { ctl.$('[name=c]').value = b.dataset.c; ctl.$('[name=m]').focus(); } });
  }
  function abrirCierre() {
    var t = LE.turnoAbierto(); if (!t) return;
    if (S.actual.items.length) return UI.toast('Hay un ticket sin cobrar. Cobralo o anulalo antes de cerrar.', 'error');
    var r = LE.resumenTurno(t);
    var ctl = UI.modal({
      titulo: 'Cerrar caja',
      cuerpo: '<p class="suave" style="margin-bottom:10px">Turno ' + esc(t.turno) + ' · abrió ' + esc(t.abrio) + ' a las ' + F.hora(t.apertura) + '</p>' +
        '<div class="tarjeta" style="margin-bottom:14px"><div class="resumen-pago" style="padding-top:0"><span>' + r.tickets + ' ventas</span><strong>' + F.din(r.total) + '</strong></div><ul class="leyenda">' +
        Object.keys(LE.MEDIOS).map(function (m) { return '<li><span>' + LE.MEDIOS[m] + '</span><span class="lv">' + F.din(r.porMedio[m]) + '</span></li>'; }).join('') + '</ul></div>' +
        '<label class="campo"><span>Efectivo que hay en el cajón (contalo ahora)</span><input name="c" class="entrada" inputmode="decimal" autocomplete="off" placeholder="0"></label>',
      acciones: [{ texto: 'Cancelar', clase: 'btn--linea' }, { texto: 'Cerrar caja', clase: 'btn--tinta', cerrar: false, accion: function () {
        var v = UI.valores(ctl); if (v.c === '') { UI.toast('Escribí cuánto efectivo contaste.', 'error'); return false; }
        UI.hacer(function () { return LE.cerrarCaja(UI.aCentavos(v.c)); }).then(function (rr) { if (rr.ok) { ctl.cerrar(); mostrarCierre(rr.valor); } });
        return false; } }]
    });
  }
  function mostrarCierre(c) {
    var ok = c.diferencia === 0;
    UI.modal({
      titulo: 'Caja cerrada', persistente: true,
      cuerpo: '<div class="vuelto" style="margin:0 0 14px;' + (ok ? '' : 'background:var(--alerta-suave);color:var(--alerta)') + '">' + (ok ? 'La caja cierra justa' : (c.diferencia > 0 ? 'Sobran' : 'Faltan')) + '<strong>' + (ok ? F.din(c.contado) : F.din(Math.abs(c.diferencia))) + '</strong></div>' +
        '<ul class="leyenda"><li><span>Tendría que haber</span><span class="lv">' + F.din(c.esperado) + '</span></li><li><span>Contaste</span><span class="lv">' + F.din(c.contado) + '</span></li></ul>' +
        '',
      acciones: [{ texto: 'Listo', clase: 'btn--tinta' }], alCerrar: function () { montar(); }
    });
  }

  /* ---------- Pantalla del cliente (display chico de la terminal) ---------- */
  function pintarCliente(modo) {
    var c = $('#cliente'); if (!S.cliente || !LE.turnoAbierto()) { if (c) c.remove(); return; }
    if (!c) { c = document.createElement('aside'); c.id = 'cliente'; c.className = 'cliente'; c.setAttribute('aria-label', 'Pantalla del cliente'); document.body.appendChild(c); }
    clearTimeout(timerCliente);
    var items = S.actual.items, ult = items[items.length - 1];
    if (modo === 'gracias') { c.innerHTML = '<div class="cliente__rotulo">Pantalla del cliente</div><div class="cliente__gracias">¡Gracias por tu compra!</div><div class="cliente__total">&nbsp;</div>'; timerCliente = setTimeout(function () { pintarCliente(); }, 6000); return; }
    c.innerHTML = '<div class="cliente__rotulo">Pantalla del cliente</div><div class="cliente__item">' + (ult ? esc(LE.producto(ult.p).nombre) + '<br>' + F.din(subtotal(ult)) : 'Bienvenido/a a La Estrella') + '</div><div class="cliente__total">' + F.din(totalTicket()) + '</div>';
  }

  /* ---------- Conexión ---------- */
  function conexion(offline) {
    LE.red.offline = offline;
    if (!offline) { UI.hacer(function () { return LE.sincronizar(); }).then(function (r) { if (r.ok && r.valor) UI.toast('Volvió internet: se enviaron ' + r.valor + ' ventas guardadas.', 'ok'); else if (r.ok) UI.toast('Conectado.', 'ok'); pintarBarra(); }); }
    else UI.toast('Sin internet: seguís vendiendo, las ventas quedan guardadas en la caja.', 'ok');
    pintarBarra();
  }
  window.addEventListener('offline', function () { conexion(true); });
  window.addEventListener('online', function () { if (LE.red.offline) conexion(false); });

  /* ---------- Eventos ---------- */
  document.addEventListener('click', function (e) {
    var a = e.target.closest('[data-acc]'); if (a && !a.closest('.modal')) return accion(a.dataset.acc);
    var t = e.target;
    if (t.closest('#btn-menu')) return abrirMenuMovil();
    if (t.closest('#btn-abrir')) return abrirCaja();
    var cod = t.closest('[data-codigo]'); if (cod) { escanear(cod.dataset.codigo); return; }
    var cat = t.closest('[data-cat]'); if (cat) { filtro.cat = cat.dataset.cat; filtro.q = ''; var s = $('#scan'); if (s && !/^\d/.test(s.value)) s.value = ''; pintarCats(); pintarGrilla(); return; }
    var pr = t.closest('.prod'); if (pr) { var p = LE.producto(pr.dataset.p); if (p.unidad === 'kg') pedirPeso(p); else { agregar(p, 1); if (window.innerWidth < 768) { /* en el celular el catálogo se queda abierto para sumar varios */ } } return; }
    if (t.closest('#btn-productos') || t.closest('[data-abrir-cat]')) return abrirCatalogo(true);
    if (t.closest('#cat-cerrar')) { abrirCatalogo(false); var sc = $('#scan'); if (sc) sc.focus({ preventScroll: true }); return; }
    if (t.closest('#btn-cobrar')) return abrirCobro();
    if (t.closest('#btn-espera')) return ponerEnEspera();
    if (t.closest('#btn-anular')) { UI.confirmar('Anular el ticket', 'Se borran los ' + S.actual.items.length + ' productos del ticket actual.', { ok: 'Anular ticket', peligro: true }).then(function (si) { if (si) { S.actual = nuevoTicket(); pintarTicket(); } }); return; }
    if (t.closest('#demo-red')) return conexion(!LE.red.offline);
    var ln = t.closest('[data-acc-linea]');
    if (ln) {
      var k = +ln.dataset.k, it = S.actual.items[k], ac = ln.dataset.accLinea;
      if (ac === 'mas') { it.c++; pintarTicket(); } else if (ac === 'menos') { if (it.c > 1) it.c--; else S.actual.items.splice(k, 1); pintarTicket(); }
      else if (ac === 'quitar') { S.actual.items.splice(k, 1); pintarTicket(); } else if (ac === 'peso') pedirPeso(LE.producto(it.p), k);
    }
  });
  document.addEventListener('keydown', function (e) {
    if (UI.hayModal()) return;
    if (e.key === 'Enter' && e.target.id === 'scan') { e.preventDefault(); var v = e.target.value; e.target.value = ''; if (/^\d/.test(v) || v.length) { filtro.q = ''; } escanear(v); return; }
    if (e.key === 'F9') { e.preventDefault(); return abrirCobro(); }
    if (e.key === 'Escape' && pos.classList.contains('pos--cat')) return abrirCatalogo(false);
    // El lector escribe como teclado: si no hay un campo enfocado, mandamos los dígitos al campo de escaneo
    var tg = e.target, s = $('#scan');
    if (s && tg === document.body && e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) s.focus({ preventScroll: true });
  });
  document.addEventListener('input', function (e) {
    if (e.target.id !== 'scan') return;
    var v = e.target.value.trim(); filtro.q = /^\d*$/.test(v) ? '' : v; if ($('#grilla')) pintarGrilla();
  });

  /* ---------- Modo conectado: los datos nuevos del servidor refrescan la pantalla ---------- */
  document.addEventListener('le:datos', function () {
    if (UI.hayModal()) return;
    var ab = !!LE.turnoAbierto(); if (ab !== montadaAbierta) { montar(); return; }
    pintarBarra(); if ($('#grilla')) { pintarGrilla(); pintarTicket(); }
  });
  document.addEventListener('le:rechazo', function (e) { UI.toast('El servidor no aceptó una venta o retiro: ' + e.detail.error, 'error'); });

  /* ---------- Arranque ---------- */
  $('#nombre-usuario').textContent = usuario.nombre.split(' ')[0];
  montar();
})();
