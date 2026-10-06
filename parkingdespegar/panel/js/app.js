/* ============================================================
   PARKING DESPEGAR — Gestión
   Sistema propio para la operación del parking: reservas, llegadas,
   retiros con cobro, traslados de la camioneta, lugares, caja,
   clientes, reportes, tarifas, usuarios y respaldos.
   Lee y escribe en ../js/datos.js; con una base real, todo el equipo
   ve lo mismo en vivo desde cualquier dispositivo.
   ============================================================ */
(function () {
  'use strict';

  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var D = function () { return PD.datos(); };
  var esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };
  var plata = function (n) { return '$\u00a0' + Math.round(n || 0).toLocaleString('es-UY'); };
  var ico = function (n, c) { return '<svg class="' + (c || 'ico') + '" aria-hidden="true"><use href="#i-' + n + '"/></svg>'; };
  var hora = function (d) { return new Date(d).toLocaleTimeString('es-UY', { hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }); };
  var fechaCorta = function (d) { return new Date(d).toLocaleDateString('es-UY', { day: '2-digit', month: '2-digit' }); };
  var fechaHora = function (d) { return d ? fechaCorta(d) + ' ' + hora(d) : '—'; };
  var diaLargo = function (d) { return new Date(d).toLocaleDateString('es-UY', { weekday: 'long', day: 'numeric', month: 'long' }); };
  var inicioDia = function (d) { var x = new Date(d || Date.now()); x.setHours(0, 0, 0, 0); return x.getTime(); };
  var mismoDia = function (a, b) { return inicioDia(a) === inicioDia(b); };

  /* ---------- Sesión ---------- */
  var CLAVE_SESION = 'pd-sesion';
  var usuario = null;
  function leerSesion() {
    try { var id = sessionStorage.getItem(CLAVE_SESION); usuario = D().usuarios.filter(function (u) { return u.id === id && u.activo; })[0] || null; } catch (e) { usuario = null; }
  }
  function nombreUsuario() { return usuario ? usuario.nombre : 'sistema'; }

  var ROLES = { admin: 'Dueña · administración', personal: 'Personal de turno', chofer: 'Chofer' };
  /* Cinco sectores, cada uno con su color (variantes del azul y del naranja de marca):
     Hoy (navy) · Autos en el parking (azul) · Reservas (celeste) · Plata (naranja) · Ajustes (ámbar) */
  var SECTORES = [
    { id: 'hoy', nombre: 'Hoy' },
    { id: 'autos', nombre: 'Autos en el parking' },
    { id: 'reservas', nombre: 'Reservas' },
    { id: 'plata', nombre: 'Plata' },
    { id: 'ajustes', nombre: 'Ajustes' }
  ];
  var SECCIONES = [
    { id: 'panel', sector: 'hoy', nombre: 'Hoy', ico: 'sun', roles: ['admin', 'personal'],
      desc: 'Lo que pasa hoy en el parking, de un vistazo.' },
    { id: 'llegada', sector: 'autos', nombre: 'Entra un auto', ico: 'log-in', roles: ['admin', 'personal'],
      desc: 'Cuando llega un cliente: buscás su reserva, le das un lugar e imprimís el comprobante.',
      cuenta: function () { return D().reservas.filter(function (r) { return r.estado === 'confirmada' && mismoDia(r.entrada, Date.now()); }).length; } },
    { id: 'retiros', sector: 'autos', nombre: 'Sale un auto', ico: 'log-out', roles: ['admin', 'personal'],
      desc: 'Cuando vuelve un cliente: cobrás lo que falta, entregás las llaves y el lugar queda libre.',
      cuenta: function () { return D().reservas.filter(function (r) { return r.estado === 'en_predio' && mismoDia(r.salida, Date.now()); }).length; } },
    { id: 'traslados', sector: 'autos', nombre: 'Camioneta', ico: 'bus', roles: ['admin', 'personal', 'chofer'],
      desc: 'Los viajes del día: llevar clientes a la terminal y buscarlos cuando aterrizan.',
      cuenta: function () { return trasladosDe(Date.now()).filter(function (t) { return t.estado !== 'hecho'; }).length; } },
    { id: 'lugares', sector: 'autos', nombre: 'Lugares', ico: 'square-parking', roles: ['admin', 'personal'],
      desc: 'El mapa del parking: qué lugares están ocupados, cuáles libres y cuáles se liberan hoy.' },
    { id: 'reservas', sector: 'reservas', nombre: 'Reservas', ico: 'calendar-check', roles: ['admin', 'personal'],
      desc: 'Todas las reservas: de la web, de WhatsApp o del mostrador. Tocá una para ver el detalle.' },
    { id: 'clientes', sector: 'reservas', nombre: 'Clientes', ico: 'users', roles: ['admin', 'personal'],
      desc: 'Quién viene, cuántas veces y con qué auto.' },
    { id: 'caja', sector: 'plata', nombre: 'Caja', ico: 'banknote', roles: ['admin', 'personal'],
      desc: 'La plata del turno: lo que entra, lo que sale y el cierre al final del día.' },
    { id: 'reportes', sector: 'plata', nombre: 'Reportes', ico: 'chart-column', roles: ['admin'],
      desc: 'Cuánto se recaudó, cómo pagan los clientes y por dónde reservan.' },
    { id: 'tarifas', sector: 'plata', nombre: 'Precios', ico: 'calculator', roles: ['admin'],
      desc: 'Lo que se cobra por día. Si lo cambiás acá, cambia también en la web.' },
    { id: 'usuarios', sector: 'ajustes', nombre: 'Equipo', ico: 'user-cog', roles: ['admin'],
      desc: 'Quién entra al sistema y qué puede hacer cada uno.' },
    { id: 'sistema', sector: 'ajustes', nombre: 'Respaldos', ico: 'settings', roles: ['admin'],
      desc: 'Guardá una copia de todo y mirá quién hizo cada cambio.' }
  ];
  function puede(id) { var s = SECCIONES.filter(function (x) { return x.id === id; })[0]; return s && usuario && s.roles.indexOf(usuario.rol) >= 0; }

  /* ---------- Estados ---------- */
  var ESTADOS = {
    confirmada: { txt: 'Confirmada', cls: 'info', ico: 'calendar-check' },
    en_predio: { txt: 'En el parking', cls: 'bien', ico: 'square-parking' },
    finalizada: { txt: 'Finalizada', cls: 'neutro', ico: 'circle-check' },
    cancelada: { txt: 'Cancelada', cls: 'neutro', ico: 'x' }
  };
  function badgeEstado(r) { var e = ESTADOS[r.estado] || ESTADOS.confirmada; return '<span class="estado estado--' + e.cls + '">' + ico(e.ico) + e.txt + '</span>'; }
  function badgePago(r) {
    if (r.estado === 'cancelada') return '<span class="estado estado--neutro">—</span>';
    if (r.pago.estado === 'pagado') return '<span class="estado estado--bien">' + ico('circle-check') + 'Pagado' + (r.pago.medio === 'online' ? ' online' : '') + '</span>';
    if (r.pago.estado === 'parcial') return '<span class="estado estado--alerta">' + ico('triangle-alert') + 'Seña ' + plata(r.pago.monto) + '</span>';
    return '<span class="estado estado--error">' + ico('circle-x') + 'No pagado</span>';
  }
  var TIPO = { techado: 'Techado', aire: 'Predio' };
  var ORIGEN = { web: 'Web', whatsapp: 'WhatsApp', mostrador: 'Mostrador' };
  var MEDIOS = { efectivo: 'Efectivo', tarjeta: 'Tarjeta (POS)', transferencia: 'Transferencia', online: 'Online', egreso: 'Egreso' };

  /* ---------- Traslados derivados de las reservas ---------- */
  function trasladosDe(dia) {
    var lista = [];
    D().reservas.forEach(function (r) {
      if (r.estado === 'cancelada' || r.servicio === 'valet') return;
      var ida = new Date(r.entrada).getTime() + 15 * 60000;
      var vuelta = new Date(r.salida).getTime() + 25 * 60000;
      if (mismoDia(ida, dia)) lista.push({ r: r, tipo: 'ida', hora: ida, estado: r.traslado.ida });
      if (mismoDia(vuelta, dia)) lista.push({ r: r, tipo: 'vuelta', hora: vuelta, estado: r.traslado.vuelta });
    });
    return lista.sort(function (a, b) { return a.hora - b.hora; });
  }

  /* ---------- Avisos ---------- */
  function avisar(txt, tipo) {
    var el = document.createElement('div');
    el.className = 'aviso aviso--' + (tipo || 'bien');
    el.innerHTML = ico(tipo === 'alerta' ? 'triangle-alert' : tipo === 'info' ? 'bell-ring' : 'circle-check') + '<span>' + esc(txt) + '</span>';
    $('[data-avisos]').appendChild(el);
    setTimeout(function () { el.classList.add('es-saliendo'); }, 4200);
    setTimeout(function () { el.remove(); }, 4700);
  }

  /* ---------- Ventana ---------- */
  var ventana = $('[data-ventana]');
  var focoPrevio = null;
  function abrirVentana(html, ancho) {
    focoPrevio = document.activeElement;
    var caja = $('[data-ventana-caja]');
    caja.className = 'ventana__caja' + (ancho ? ' ventana__caja--' + ancho : '');
    caja.innerHTML = '<button class="boton-ico ventana__cerrar" type="button" data-cerrar-ventana aria-label="Cerrar">' + ico('x') + '</button>' + html;
    ventana.hidden = false;
    document.documentElement.classList.add('ventana-abierta');
    var f = caja.querySelector('input, select, button:not(.ventana__cerrar)');
    (f || caja.querySelector('button')).focus();
    return caja;
  }
  function cerrarVentana() {
    ventana.hidden = true;
    document.documentElement.classList.remove('ventana-abierta');
    if (focoPrevio) focoPrevio.focus();
  }
  ventana.addEventListener('click', function (e) { if (e.target === ventana || e.target.closest('[data-cerrar-ventana]')) cerrarVentana(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !ventana.hidden) cerrarVentana(); });

  /* ============================================================
     VISTAS
     ============================================================ */
  var V = {};

  /* ---------- PANEL DEL DÍA ---------- */
  V.panel = function () {
    var d = D(), ahora = Date.now();
    var dentro = d.reservas.filter(function (r) { return r.estado === 'en_predio'; });
    var dTech = dentro.filter(function (r) { return r.lugarTipo === 'techado'; }).length;
    var capT = d.lugares.filter(function (l) { return l.tipo === 'techado'; }).length, capA = d.lugares.length - capT;
    var llegan = d.reservas.filter(function (r) { return r.estado !== 'cancelada' && mismoDia(r.entrada, ahora); });
    var vuelven = d.reservas.filter(function (r) { return (r.estado === 'en_predio' || r.estado === 'finalizada') && mismoDia(r.salida, ahora); });
    var porLlegar = llegan.filter(function (r) { return r.estado === 'confirmada'; }).length;
    var porSalir = vuelven.filter(function (r) { return r.estado === 'en_predio'; }).length;
    var cobrado = d.caja.turnoActual ? d.caja.turnoActual.movimientos.filter(function (m) { return m.monto > 0; }).reduce(function (s, m) { return s + m.monto; }, 0) : 0;
    var tras = trasladosDe(ahora), trasPend = tras.filter(function (t) { return t.estado !== 'hecho'; });
    var libresT = capT - dTech, libresA = capA - (dentro.length - dTech);
    var online = d.caja.turnoActual ? d.caja.turnoActual.movimientos.filter(function (m) { return m.medio === 'online'; }).reduce(function (s, m) { return s + m.monto; }, 0) : 0;
    var sinPago = d.reservas.filter(function (r) { return r.estado === 'confirmada' && r.pago.estado !== 'pagado' && new Date(r.entrada) - ahora < 2 * PD.DIA && new Date(r.entrada) > ahora - PD.DIA; }).length;
    var agenda = llegan.map(function (r) { return { r: r, tipo: 'llega', hora: r.entrada }; })
      .concat(vuelven.map(function (r) { return { r: r, tipo: 'sale', hora: r.salida }; }))
      .sort(function (a, b) { return new Date(a.hora) - new Date(b.hora); });

    return '<div class="atajos">' +
        atajo('#/llegada', 'autos', 'log-in', 'Entra un auto', porLlegar ? porLlegar + (porLlegar === 1 ? ' llega' : ' llegan') + ' todavía hoy' : 'No hay más llegadas hoy') +
        atajo('#/retiros', 'autos', 'log-out', 'Sale un auto', porSalir ? porSalir + (porSalir === 1 ? ' se va' : ' se van') + ' todavía hoy' : 'Nadie más se va hoy') +
        atajo(null, 'reservas', 'plus', 'Nueva reserva', 'Por WhatsApp o en el mostrador') +
      '</div>' +
      (sinPago ? '<a class="alerta" href="#/reservas?f=pago">' + ico('circle-x') + '<span><strong>' + sinPago + ' reserva' + (sinPago > 1 ? 's' : '') + ' sin pagar</strong> llega' + (sinPago > 1 ? 'n' : '') + ' en las próximas 48 h. Conviene escribirles por WhatsApp.</span>' + ico('chevron-right') + '</a>' : '') +
      '<div class="kpis">' +
        kpi('car', 'Autos totales en el Parking', dentro.length + '<span class="de-total">/' + d.lugares.length + '</span>',
          porTipo(dTech, dentro.length - dTech, capT, capA), 'autos', '#/retiros', 'Ver cuándo se van') +
        kpi('circle-parking', 'Lugares disponibles', (libresT + libresA) + '<span class="de-total">/' + d.lugares.length + '</span>',
          porTipo(libresT, libresA, capT, capA), 'libre', '#/lugares', 'Ver el mapa') +
        kpi('bus', 'Viajes de la camioneta', trasPend.length,
          trasPend.length ? 'por hacer hoy' + (tras.length - trasPend.length ? ' · ya se hicieron ' + (tras.length - trasPend.length) : '')
            : tras.length ? 'No queda ninguno: se hicieron los ' + tras.length + ' de hoy' : 'Hoy no hay viajes', 'autos', '#/traslados', 'Ver los viajes') +
        kpi('banknote', 'Cobrado en el turno', plata(cobrado),
          d.caja.turnoActual ? 'Desde las ' + hora(d.caja.turnoActual.apertura) + ' · ' + plata(online) + ' se pagó online' : 'La caja está cerrada', 'plata', '#/caja', 'Ver la caja') +
      '</div>' +
      bloque('Agenda de hoy', agenda.length, listaAgenda(agenda), null, 'hoy') +
      '<div class="columnas">' +
        bloque('Cómo está el parking', null, ocupacion('Techado', dTech, capT) + ocupacion('Predio', dentro.length - dTech, capA), '#/lugares', 'autos') +
        bloque('Próximos viajes de la camioneta', trasPend.length, listaTraslados(trasPend.slice(0, 4), true), '#/traslados', 'autos') +
      '</div>';
  };
  /* Techado y predio (aire libre): «Techado 12/24» — el total va en el azul apagado */
  function porTipo(techado, aire, capT, capA) {
    var de = function (n) { return '<span class="de-total">/' + n + '</span>'; };
    return '<span class="por-tipo"><span class="por-tipo__nombre">Techado</span><strong>' + techado + de(capT) + '</strong></span>' +
      '<span class="por-tipo"><span class="por-tipo__nombre">Predio</span><strong>' + aire + de(capA) + '</strong></span>';
  }
  function atajo(href, sector, i, titulo, sub) {
    var dentro = '<span class="atajo__ico">' + ico(i) + '</span><span class="atajo__texto"><strong>' + titulo + '</strong><small>' + sub + '</small></span>' + ico('chevron-right', 'ico atajo__flecha');
    return href ? '<a class="atajo" data-sector="' + sector + '" href="' + href + '">' + dentro + '</a>'
      : '<button type="button" class="atajo" data-sector="' + sector + '" data-nueva-reserva>' + dentro + '</button>';
  }
  function listaAgenda(lista) {
    if (!lista.length) return '<p class="vacio">Hoy no llega ni se va nadie.</p>';
    return '<ul class="agenda">' + lista.map(function (x) {
      var r = x.r, llega = x.tipo === 'llega', accion;
      if (llega) accion = r.estado === 'confirmada' ? '<a class="btn btn--chico btn--primario" href="#/llegada?c=' + r.codigo + '">Registrar entrada</a>' : '<span class="estado estado--bien">' + ico('circle-check') + 'Ya entró</span>';
      else accion = r.estado === 'en_predio' ? '<a class="btn btn--chico btn--primario" href="#/retiros?c=' + r.codigo + '">Cobrar y entregar</a>' : '<span class="estado estado--neutro">' + ico('circle-check') + 'Ya se fue</span>';
      var debe = r.estado !== 'finalizada' && r.pago.estado !== 'pagado';
      return '<li class="agenda__fila" data-abrir-reserva="' + r.id + '">' +
        '<span class="agenda__hora">' + hora(x.hora) + '</span>' +
        '<span class="agenda__texto"><span class="tag tag--' + x.tipo + '">' + ico(llega ? 'log-in' : 'log-out') + (llega ? 'Llega' : 'Se va') + '</span>' +
          '<strong>' + esc(r.vehiculo.matricula) + '</strong> · ' + esc(r.cliente.nombre) +
          '<small>' + TIPO[r.lugarTipo] + (r.lugar ? ' · lugar ' + r.lugar : '') + (!llega && r.vuelo.vuelta ? ' · vuelo ' + esc(r.vuelo.vuelta) : '') + '</small></span>' +
        '<span class="agenda__accion">' + (debe ? badgePago(r) : '') + accion + '</span></li>';
    }).join('') + '</ul>';
  }
  /* opc: true = número principal (fondo navy) · 'autos', 'plata'… = color de ese sector */
  function kpi(i, rotulo, valor, sub, opc, link, linkTxt) {
    var attrs = 'class="kpi' + (opc === true ? ' kpi--destacado' : '') + (link ? ' kpi--link' : '') + '"' + (typeof opc === 'string' ? ' data-sector="' + opc + '"' : '');
    var dentro = '<span class="kpi__ico">' + ico(i) + '</span><p class="kpi__rotulo">' + rotulo + '</p><p class="kpi__valor">' + valor + '</p><div class="kpi__sub">' + sub + '</div>' +
      (link ? '<span class="kpi__ver">' + linkTxt + ico('arrow-right') + '</span>' : '');
    return link ? '<a ' + attrs + ' href="' + link + '">' + dentro + '</a>' : '<div ' + attrs + '>' + dentro + '</div>';
  }
  function bloque(titulo, cuenta, cuerpo, link, sector) {
    return '<section class="bloque"' + (sector ? ' data-sector="' + sector + '"' : '') + '><header class="bloque__cabeza"><h2>' + titulo + (cuenta != null ? ' <span class="cuenta">' + cuenta + '</span>' : '') + '</h2>' +
      (link ? '<a class="enlace" href="' + link + '">Ver todo' + ico('arrow-right') + '</a>' : '') + '</header>' + cuerpo + '</section>';
  }
  function porFecha(k) { return function (a, b) { return new Date(a[k]) - new Date(b[k]); }; }
  function tablaMini(lista, campo, accion) {
    if (!lista.length) return '<p class="vacio">Nada por ahora.</p>';
    return '<ul class="mini">' + lista.slice(0, 7).map(function (r) {
      return '<li class="mini__fila" data-abrir-reserva="' + r.id + '"><span class="mini__hora">' + hora(r[campo]) + '</span>' +
        '<span class="mini__texto"><strong>' + esc(r.vehiculo.matricula) + '</strong> · ' + esc(r.cliente.nombre) + '<small>' + TIPO[r.lugarTipo] + (r.lugar ? ' · ' + r.lugar : '') + (campo === 'salida' && r.vuelo.vuelta ? ' · vuelo ' + esc(r.vuelo.vuelta) : '') + '</small></span>' +
        '<span class="mini__accion">' + accion(r) + '</span></li>';
    }).join('') + '</ul>' + (lista.length > 7 ? '<p class="mas">y ' + (lista.length - 7) + ' más</p>' : '');
  }
  function ocupacion(nombre, n, cap) {
    var pct = cap ? Math.round(n / cap * 100) : 0;
    return '<div class="medidor"><p class="medidor__rotulo"><span>' + nombre + '</span><strong>' + n + ' / ' + cap + '</strong></p>' +
      '<div class="medidor__barra" role="img" aria-label="' + nombre + ': ' + pct + '% ocupado"><span style="width:' + pct + '%"></span></div><p class="medidor__pct">' + pct + '% ocupado · ' + (cap - n) + ' libres</p></div>';
  }

  /* ---------- RESERVAS ---------- */
  var FILTROS = [['proximas', 'Próximas'], ['hoy', 'Llegan hoy'], ['predio', 'En el parking'], ['pago', 'Sin pagar'], ['finalizadas', 'Finalizadas'], ['canceladas', 'Canceladas'], ['todas', 'Todas']];
  V.reservas = function (q) {
    var f = q.f || 'proximas', busca = (q.b || '').toLowerCase(), ahora = Date.now();
    var lista = D().reservas.filter(function (r) {
      if (f === 'proximas' && !(r.estado === 'confirmada')) return false;
      if (f === 'hoy' && !(r.estado !== 'cancelada' && mismoDia(r.entrada, ahora))) return false;
      if (f === 'predio' && r.estado !== 'en_predio') return false;
      if (f === 'pago' && !(r.estado === 'confirmada' && r.pago.estado !== 'pagado')) return false;
      if (f === 'finalizadas' && r.estado !== 'finalizada') return false;
      if (f === 'canceladas' && r.estado !== 'cancelada') return false;
      if (busca && (r.codigo + ' ' + r.vehiculo.matricula + ' ' + r.cliente.nombre + ' ' + r.cliente.telefono).toLowerCase().indexOf(busca) < 0) return false;
      return true;
    });
    lista.sort(f === 'finalizadas' || f === 'todas' || f === 'canceladas' ? function (a, b) { return new Date(b.entrada) - new Date(a.entrada); } : porFecha('entrada'));
    return '<div class="herramientas">' +
        '<div class="chips" role="tablist">' + FILTROS.map(function (x) { return '<a class="chip' + (x[0] === f ? ' es-activo' : '') + '" href="#/reservas?f=' + x[0] + (busca ? '&b=' + encodeURIComponent(busca) : '') + '">' + x[1] + '</a>'; }).join('') + '</div>' +
        '<label class="buscador">' + ico('search') + '<input type="search" placeholder="Código, matrícula, nombre o teléfono" value="' + esc(q.b || '') + '" data-buscar="reservas" data-filtro="' + f + '"></label>' +
        '<button class="btn btn--primario" type="button" data-nueva-reserva>' + ico('plus') + 'Nueva reserva</button>' +
      '</div>' +
      '<p class="resultado">' + lista.length + ' reserva' + (lista.length === 1 ? '' : 's') + '</p>' +
      tablaReservas(lista.slice(0, 120)) + (lista.length > 120 ? '<p class="mas">Se muestran las primeras 120. Usá el buscador.</p>' : '');
  };
  function tablaReservas(lista) {
    if (!lista.length) return '<p class="vacio">No hay reservas con ese filtro.</p>';
    return '<div class="tabla-caja"><table class="tabla"><thead><tr><th>Código</th><th>Cliente</th><th>Matrícula</th><th>Deja</th><th>Vuelve</th><th>Lugar</th><th>Total</th><th>Pago</th><th>Estado</th></tr></thead><tbody>' +
      lista.map(function (r) {
        return '<tr data-abrir-reserva="' + r.id + '" tabindex="0">' +
          '<td data-et="Código"><strong>' + r.codigo + '</strong><small>' + ORIGEN[r.origen] + '</small></td>' +
          '<td data-et="Cliente">' + esc(r.cliente.nombre) + '<small>' + esc(r.cliente.telefono) + '</small></td>' +
          '<td data-et="Matrícula"><span class="matricula">' + esc(r.vehiculo.matricula) + '</span></td>' +
          '<td data-et="Deja">' + fechaHora(r.entrada) + '</td>' +
          '<td data-et="Vuelve">' + fechaHora(r.salida) + '</td>' +
          '<td data-et="Lugar">' + TIPO[r.lugarTipo] + (r.lugar ? ' · <strong>' + r.lugar + '</strong>' : '') + '<small>' + (r.servicio === 'valet' ? 'Valet' : 'Con traslado') + '</small></td>' +
          '<td data-et="Total" class="num">' + plata(r.total) + '</td>' +
          '<td data-et="Pago">' + badgePago(r) + '</td>' +
          '<td data-et="Estado">' + badgeEstado(r) + '</td></tr>';
      }).join('') + '</tbody></table></div>';
  }

  /* Detalle de una reserva */
  function abrirReserva(id) {
    var r = D().reservas.filter(function (x) { return x.id === id; })[0];
    if (!r) return;
    var p = PD.precio(r);
    var wa = 'https://wa.me/598' + r.cliente.telefono.replace(/\D/g, '').replace(/^0/, '') + '?text=' + encodeURIComponent('Hola ' + r.cliente.nombre.split(' ')[0] + ', te escribimos de Parking Despegar por tu reserva ' + r.codigo + ' del ' + new Date(r.entrada).toLocaleDateString('es-UY') + '. Te esperamos en Av. Wilson Ferreira Aldunate 5536, frente al aeropuerto viejo: https://maps.app.goo.gl/uS7X1yYPPpoTixBLA');
    var acciones = '';
    if (r.estado === 'confirmada' && puede('llegada')) acciones += '<a class="btn btn--primario" href="#/llegada?c=' + r.codigo + '" data-cerrar-ventana>' + ico('log-in') + 'Registrar llegada</a>';
    if (r.estado === 'en_predio' && puede('retiros')) acciones += '<a class="btn btn--primario" href="#/retiros?c=' + r.codigo + '" data-cerrar-ventana>' + ico('receipt') + 'Retiro y cobro</a>';
    acciones += '<a class="btn btn--linea" href="' + wa + '" target="_blank" rel="noopener"><svg class="ico-marca" aria-hidden="true"><use href="#i-whatsapp"/></svg>WhatsApp</a>';
    if (r.estado === 'confirmada' && puede('reservas')) acciones += '<button class="btn btn--linea btn--peligro" type="button" data-cancelar="' + r.id + '">' + ico('x') + 'Cancelar reserva</button>';
    abrirVentana(
      '<p class="antetitulo">' + ORIGEN[r.origen] + ' · creada ' + fechaHora(r.creada) + '</p>' +
      '<h2 class="ventana__titulo">' + r.codigo + ' <span class="matricula">' + esc(r.vehiculo.matricula) + '</span></h2>' +
      '<p class="ventana__estados">' + badgeEstado(r) + badgePago(r) + '</p>' +
      '<dl class="ficha">' +
        fila('Cliente', esc(r.cliente.nombre) + ' · ' + esc(r.cliente.telefono) + (r.cliente.email ? ' · ' + esc(r.cliente.email) : '')) +
        fila('Auto', esc(r.vehiculo.modelo) + (r.vehiculo.color ? ' · ' + esc(r.vehiculo.color) : '')) +
        fila('Deja el auto', fechaHora(r.entrada) + (r.vuelo.ida ? ' · vuelo ' + esc(r.vuelo.ida) : '')) +
        fila('Vuelve', fechaHora(r.salida) + (r.vuelo.vuelta ? ' · vuelo ' + esc(r.vuelo.vuelta) : '')) +
        fila('Lugar', TIPO[r.lugarTipo] + (r.lugar ? ' · ' + r.lugar : ' · se asigna al llegar') + ' · ' + (r.servicio === 'valet' ? 'Valet Parking' : 'Con traslado (' + r.pasajeros + ' pasajeros)')) +
        fila('Ingreso / retiro', fechaHora(r.checkin) + ' → ' + fechaHora(r.checkout)) +
        fila('Importe', plata(r.total) + ' · ' + p.dias + ' días · pagado ' + plata(r.pago.monto) + (r.pago.medio ? ' (' + MEDIOS[r.pago.medio] + ')' : '') + (r.pago.ref ? '<small>Ref. ' + esc(r.pago.ref) + '</small>' : '')) +
      '</dl><div class="ventana__acciones">' + acciones + '</div>', 'ancha');
  }
  function fila(k, v) { return '<div><dt>' + k + '</dt><dd>' + v + '</dd></div>'; }

  /* Nueva reserva desde el mostrador o por WhatsApp */
  function formReserva() {
    var t = D().tarifas;
    var man = new Date(Date.now() + PD.DIA);
    var caja = abrirVentana(
      '<h2 class="ventana__titulo">Nueva reserva</h2><form class="formulario" data-form-nueva novalidate>' +
      '<div class="formulario__fila"><label class="campo"><span>Origen</span><select name="origen"><option value="whatsapp">WhatsApp</option><option value="mostrador">Mostrador</option><option value="web">Teléfono / otra</option></select></label>' +
      '<label class="campo"><span>Lugar</span><select name="lugarTipo"><option value="techado">Techado · ' + plata(t.techado) + '/día</option><option value="aire">Predio · ' + plata(t.aire) + '/día</option></select></label></div>' +
      '<div class="formulario__fila"><label class="campo"><span>Deja el auto</span><input type="datetime-local" name="entrada" value="' + local(man.setHours(6, 0, 0, 0)) + '" required></label>' +
      '<label class="campo"><span>Vuelve (aterrizaje)</span><input type="datetime-local" name="salida" value="' + local(new Date(man.getTime() + 7 * PD.DIA).setHours(18, 0, 0, 0)) + '" required></label></div>' +
      '<div class="formulario__fila"><label class="campo"><span>Matrícula</span><input name="matricula" required></label><label class="campo"><span>Marca y modelo</span><input name="modelo"></label></div>' +
      '<div class="formulario__fila"><label class="campo"><span>Nombre</span><input name="nombre" required></label><label class="campo"><span>Teléfono</span><input name="telefono" type="tel" required></label></div>' +
      '<div class="formulario__fila"><label class="campo"><span>Servicio</span><select name="servicio"><option value="traslado">Con traslado</option><option value="valet">Valet (+' + plata(t.valet) + ')</option></select></label><label class="campo"><span>Pasajeros</span><input name="pasajeros" type="number" min="1" max="8" value="2"></label></div>' +
      '<p class="campo-error" data-error-nueva hidden></p>' +
      '<div class="ventana__acciones"><button class="btn btn--primario" type="submit">' + ico('check') + 'Guardar reserva</button></div></form>', 'ancha');
    $('[data-form-nueva]', caja).addEventListener('submit', function (e) {
      e.preventDefault();
      var f = e.target, err = $('[data-error-nueva]', caja);
      var ent = new Date(f.entrada.value), sal = new Date(f.salida.value);
      if (!f.matricula.value.trim() || !f.nombre.value.trim() || !f.telefono.value.trim()) { err.textContent = 'Completá matrícula, nombre y teléfono.'; err.hidden = false; return; }
      if (!(sal > ent)) { err.textContent = 'La vuelta tiene que ser después de la ida.'; err.hidden = false; return; }
      var r = PD.crearReserva({
        origen: f.origen.value, lugarTipo: f.lugarTipo.value, servicio: f.servicio.value, pasajeros: +f.pasajeros.value || 1,
        entrada: ent.toISOString(), salida: sal.toISOString(), vuelo: { ida: '', vuelta: '' },
        cliente: { nombre: f.nombre.value.trim(), telefono: f.telefono.value.trim(), email: '' },
        vehiculo: { matricula: f.matricula.value.trim().toUpperCase(), modelo: f.modelo.value.trim(), color: '' }
      }, nombreUsuario());
      cerrarVentana(); avisar('Reserva ' + r.codigo + ' guardada'); pintar();
    });
  }
  function local(ms) { var d = new Date(ms); return d.getFullYear() + '-' + PD.pad(d.getMonth() + 1) + '-' + PD.pad(d.getDate()) + 'T' + PD.pad(d.getHours()) + ':' + PD.pad(d.getMinutes()); }

  /* ---------- REGISTRAR LLEGADA ---------- */
  V.llegada = function (q) {
    var ahora = Date.now();
    var pendientes = D().reservas.filter(function (r) { return r.estado === 'confirmada' && new Date(r.entrada) - ahora < 1.5 * PD.DIA; }).sort(porFecha('entrada'));
    var elegida = q.c ? D().reservas.filter(function (r) { return r.codigo === q.c && r.estado === 'confirmada'; })[0] : null;
    var ficha = '<section class="bloque bloque--ficha" data-panel-llegada>' + (elegida ? panelLlegada(elegida) : '<p class="vacio vacio--grande">' + ico('log-in') + 'Elegí una reserva para registrar la llegada.</p>') + '</section>';
    /* Con una reserva elegida, en celular la ficha va primero (en escritorio queda a la derecha) */
    return '<div class="columnas columnas--llegada">' + (elegida ? ficha : '') +
      '<section class="bloque"><header class="bloque__cabeza"><h2>Buscar la reserva</h2></header>' +
        '<label class="buscador buscador--grande">' + ico('scan-line') + '<input type="search" placeholder="Código o matrícula" data-buscar-llegada autofocus></label>' +
        '<p class="ayuda">Escaneá el código del comprobante o escribí parte de la matrícula.</p>' +
        '<ul class="mini" data-lista-llegada>' + listaLlegada(pendientes) + '</ul>' +
        '<button class="btn btn--linea" type="button" data-sin-reserva>' + ico('plus') + 'Llega sin reserva</button>' +
      '</section>' +
      (elegida ? '' : ficha) +
    '</div>';
  };
  function listaLlegada(lista) {
    if (!lista.length) return '<li class="vacio">No hay llegadas pendientes.</li>';
    return lista.slice(0, 12).map(function (r) {
      return '<li class="mini__fila" data-elegir-llegada="' + r.codigo + '"><span class="mini__hora">' + hora(r.entrada) + '<small>' + fechaCorta(r.entrada) + '</small></span>' +
        '<span class="mini__texto"><strong>' + esc(r.vehiculo.matricula) + '</strong> · ' + esc(r.cliente.nombre) + '<small>' + r.codigo + ' · ' + TIPO[r.lugarTipo] + '</small></span>' +
        '<span class="mini__accion">' + badgePago(r) + '</span></li>';
    }).join('');
  }
  function panelLlegada(r) {
    var libres = PD.lugaresLibres(r.lugarTipo);
    var saldo = r.total - (r.pago.monto || 0);
    return '<header class="bloque__cabeza"><h2>' + r.codigo + ' · <span class="matricula">' + esc(r.vehiculo.matricula) + '</span></h2></header>' +
      '<dl class="ficha">' + fila('Cliente', esc(r.cliente.nombre) + ' · ' + esc(r.cliente.telefono)) + fila('Auto', esc(r.vehiculo.modelo) + ' ' + esc(r.vehiculo.color)) +
        fila('Vuelve', fechaHora(r.salida) + (r.vuelo.vuelta ? ' · vuelo ' + esc(r.vuelo.vuelta) : '')) + fila('Servicio', r.servicio === 'valet' ? 'Valet Parking' : 'Con traslado · ' + r.pasajeros + ' pasajeros') + '</dl>' +
      '<form class="formulario" data-form-llegada data-id="' + r.id + '">' +
        '<label class="campo"><span>Lugar (' + TIPO[r.lugarTipo] + ' · ' + libres.length + ' libres)</span><select name="lugar">' + libres.map(function (l, i) { return '<option' + (i === 0 ? ' selected' : '') + '>' + l.id + '</option>'; }).join('') + '</select></label>' +
        (saldo > 0 ? '<div class="cobro-breve"><p>' + ico('triangle-alert') + 'Tiene <strong>' + plata(saldo) + '</strong> sin pagar. Podés cobrarlo ahora o al retirar.</p>' +
          '<div class="formulario__fila"><label class="campo"><span>Cobrar ahora</span><select name="medio"><option value="">Al retirar</option><option value="efectivo">Efectivo</option><option value="tarjeta">Tarjeta (POS)</option><option value="transferencia">Transferencia</option></select></label>' +
          '<label class="campo"><span>Monto</span><input name="monto" type="number" min="0" value="' + saldo + '"></label></div></div>' : '<p class="ok">' + ico('circle-check') + 'Pagada ' + (r.pago.medio === 'online' ? 'online' : '') + '. No hay nada que cobrar.</p>') +
        '<label class="campo"><span>Notas del auto <em>(rayones, objetos, llaves)</em></span><input name="notas" placeholder="Opcional"></label>' +
        '<div class="ventana__acciones"><button class="btn btn--primario" type="submit">' + ico('check') + 'Registrar llegada e imprimir</button></div>' +
      '</form>';
  }
  function registrarLlegada(id, f) {
    var d = D(), r = d.reservas.filter(function (x) { return x.id === id; })[0];
    if (!r || !f.lugar.value) { avisar('No quedan lugares libres de ese tipo', 'alerta'); return; }
    r.estado = 'en_predio'; r.lugar = f.lugar.value; r.checkin = new Date().toISOString(); r.notas = f.notas.value.trim();
    if (f.medio && f.medio.value && +f.monto.value > 0) PD.registrarPago(r, +f.monto.value, f.medio.value, nombreUsuario());
    PD.guardar(nombreUsuario(), 'Llegada de ' + r.codigo + ' (' + r.vehiculo.matricula + ') al lugar ' + r.lugar);
    ticket(r, 'llegada');
    location.hash = '#/llegada';
  }
  function sinReserva() {
    formReserva();
    $('[name="origen"]').value = 'mostrador';
    var e = $('[name="entrada"]'); e.value = local(Date.now());
  }

  /* Comprobante imprimible con código de barras */
  function ticket(r, tipo) {
    var p = PD.precio(r);
    var caja = abrirVentana(
      '<div class="ticket" id="ticket"><svg class="ticket__logo" viewBox="0 0 822.78 263.63" aria-hidden="true"><use href="#logo-v"/></svg>' +
      '<p class="ticket__dir">Av. Wilson Ferreira Aldunate 5536 · Paso de Carrasco<br>WhatsApp 099 114 144 · abierto 24 h</p>' +
      '<p class="ticket__tipo">' + (tipo === 'retiro' ? 'Comprobante de retiro' : 'Comprobante de ingreso') + '</p>' +
      '<p class="ticket__matricula">' + esc(r.vehiculo.matricula) + '</p>' +
      '<dl>' + fila('Reserva', r.codigo) + fila('Lugar', r.lugar + ' · ' + TIPO[r.lugarTipo]) + fila('Ingreso', fechaHora(r.checkin)) +
        (tipo === 'retiro' ? fila('Retiro', fechaHora(r.checkout)) + fila('Total', plata(r.total)) : fila('Vuelve', fechaHora(r.salida)) + fila('Estimado', plata(p.total) + ' · ' + p.dias + ' días')) +
        fila('Pago', r.pago.estado === 'pagado' ? 'Pagado' : 'Saldo ' + plata(r.total - r.pago.monto)) + '</dl>' +
      '<svg class="ticket__barras" data-barras></svg>' +
      '<p class="ticket__pie">Presentá este comprobante para retirar el auto.<br>Atendió: ' + esc(nombreUsuario()) + '</p></div>' +
      '<div class="ventana__acciones"><button class="btn btn--primario" type="button" data-imprimir>' + ico('printer') + 'Imprimir</button><button class="btn btn--linea" type="button" data-cerrar-ventana>Listo</button></div>', 'ticket');
    try { JsBarcode($('[data-barras]', caja), r.codigo.replace('-', ''), { format: 'CODE128', height: 56, displayValue: true, fontSize: 14, margin: 0, lineColor: '#053f5c' }); } catch (e) { /* sin librería: queda el código en texto */ }
    $('[data-imprimir]', caja).addEventListener('click', function () { window.print(); });
  }

  /* ---------- RETIROS Y COBRO ---------- */
  V.retiros = function (q) {
    var dentro = D().reservas.filter(function (r) { return r.estado === 'en_predio'; }).sort(porFecha('salida'));
    var busca = (q.b || '').toLowerCase();
    if (busca) dentro = dentro.filter(function (r) { return (r.codigo + r.vehiculo.matricula + r.cliente.nombre).toLowerCase().indexOf(busca) >= 0; });
    var elegida = q.c ? D().reservas.filter(function (r) { return r.codigo === q.c && r.estado === 'en_predio'; })[0] : null;
    var ficha = '<section class="bloque bloque--ficha" data-panel-retiro>' + (elegida ? panelRetiro(elegida) : '<p class="vacio vacio--grande">' + ico('receipt') + 'Elegí un auto para calcular el cobro y registrar el retiro.</p>') + '</section>';
    return '<div class="columnas columnas--llegada">' + (elegida ? ficha : '') +
      '<section class="bloque"><header class="bloque__cabeza"><h2>Autos en el parking <span class="cuenta">' + dentro.length + '</span></h2></header>' +
        '<label class="buscador">' + ico('scan-line') + '<input type="search" placeholder="Código o matrícula" value="' + esc(q.b || '') + '" data-buscar="retiros"></label>' +
        '<ul class="mini">' + (dentro.length ? dentro.slice(0, 40).map(function (r) {
          var hoy = mismoDia(r.salida, Date.now());
          return '<li class="mini__fila' + (elegida && elegida.id === r.id ? ' es-elegida' : '') + '" data-elegir-retiro="' + r.codigo + '"><span class="mini__hora' + (hoy ? ' es-hoy' : '') + '">' + (hoy ? hora(r.salida) : fechaCorta(r.salida)) + '<small>' + (hoy ? 'hoy' : hora(r.salida)) + '</small></span>' +
            '<span class="mini__texto"><strong>' + esc(r.vehiculo.matricula) + '</strong> · ' + esc(r.cliente.nombre) + '<small>' + r.lugar + ' · ' + TIPO[r.lugarTipo] + (r.vuelo.vuelta ? ' · vuelo ' + esc(r.vuelo.vuelta) : '') + '</small></span>' +
            '<span class="mini__accion">' + badgePago(r) + '</span></li>';
        }).join('') : '<li class="vacio">No hay autos con ese dato.</li>') + '</ul>' +
      '</section>' +
      (elegida ? '' : ficha) +
    '</div>';
  };
  function panelRetiro(r) {
    var ahora = new Date();
    var real = PD.precio({ entrada: r.checkin || r.entrada, salida: ahora, lugarTipo: r.lugarTipo, servicio: r.servicio });
    var total = Math.max(r.total, real.total);
    var pagado = r.pago.monto || 0, saldo = Math.max(0, total - pagado);
    var t = D().tarifas;
    return '<header class="bloque__cabeza"><h2>Retiro · <span class="matricula">' + esc(r.vehiculo.matricula) + '</span></h2><span class="estado estado--info">' + r.lugar + '</span></header>' +
      '<div class="total-grande"><p>' + (saldo > 0 ? 'A cobrar' : 'Nada para cobrar') + '</p><strong>' + plata(saldo) + '</strong><small>' + real.dias + (real.dias === 1 ? ' día' : ' días') + ' en el parking</small></div>' +
      '<dl class="ficha">' + fila('Ingreso', fechaHora(r.checkin)) + fila('Retiro', fechaHora(ahora)) +
        fila('Cálculo', real.dias + ' × ' + plata(r.lugarTipo === 'techado' ? t.techado : t.aire) + (real.extra ? ' + valet ' + plata(real.extra) : '') + ' = ' + plata(real.total) + (total > real.total ? '<small>Se mantiene lo reservado: ' + plata(r.total) + '</small>' : '')) +
        fila('Ya pagado', plata(pagado) + (r.pago.medio ? ' (' + MEDIOS[r.pago.medio] + ')' : '')) + (r.notas ? fila('Notas', esc(r.notas)) : '') + '</dl>' +
      '<form class="formulario" data-form-retiro data-id="' + r.id + '" data-total="' + total + '" data-saldo="' + saldo + '">' +
        (saldo > 0 ? '<div class="formulario__fila"><label class="campo"><span>Medio de pago</span><select name="medio"><option value="efectivo">Efectivo</option><option value="tarjeta">Tarjeta (POS)</option><option value="transferencia">Transferencia</option></select></label>' +
          '<label class="campo"><span>Recibido <em>(efectivo)</em></span><input name="recibido" type="number" min="0" placeholder="' + saldo + '" data-recibido></label></div>' +
          '<p class="vuelto" data-vuelto hidden></p>' : '') +
        '<label class="check"><input type="checkbox" name="llaves" required> Entregué las llaves y el cliente revisó el auto</label>' +
        '<div class="ventana__acciones"><button class="btn btn--primario" type="submit">' + ico('check') + (saldo > 0 ? 'Cobrar ' + plata(saldo) + ' y liberar lugar' : 'Registrar retiro y liberar lugar') + '</button></div>' +
      '</form>';
  }
  function registrarRetiro(id, f) {
    var d = D(), r = d.reservas.filter(function (x) { return x.id === id; })[0];
    if (!f.llaves.checked) { avisar('Confirmá la entrega de llaves', 'alerta'); return; }
    var total = +f.getAttribute('data-total'), saldo = +f.getAttribute('data-saldo');
    r.total = total;
    if (saldo > 0) PD.registrarPago(r, saldo, f.medio.value, nombreUsuario());
    r.estado = 'finalizada'; r.checkout = new Date().toISOString(); r.traslado.vuelta = 'hecho';
    PD.guardar(nombreUsuario(), 'Retiro de ' + r.codigo + ' (' + r.vehiculo.matricula + '), libera ' + r.lugar);
    avisar('Retiro registrado: ' + r.lugar + ' quedó libre');
    ticket(r, 'retiro');
    location.hash = '#/retiros';
  }

  /* ---------- TRASLADOS ---------- */
  V.traslados = function (q) {
    q = q || {};
    var dia = q.d === 'manana' ? Date.now() + PD.DIA : Date.now();
    var lista = trasladosDe(dia);
    var idas = lista.filter(function (t) { return t.tipo === 'ida'; }), vueltas = lista.filter(function (t) { return t.tipo === 'vuelta'; });
    return '<div class="herramientas"><div class="chips"><a class="chip' + (q.d !== 'manana' ? ' es-activo' : '') + '" href="#/traslados">Hoy</a><a class="chip' + (q.d === 'manana' ? ' es-activo' : '') + '" href="#/traslados?d=manana">Mañana</a></div>' +
      '<p class="ayuda">La camioneta sale ~15 min después de cada llegada y busca a los que vuelven ~25 min después del aterrizaje.</p></div>' +
      '<div class="columnas">' +
        bloque(ico('plane-takeoff') + 'Al aeropuerto', idas.length, listaTraslados(idas)) +
        bloque(ico('plane-landing') + 'De vuelta al parking', vueltas.length, listaTraslados(vueltas)) +
      '</div>';
  };
  var PASOS_TRASLADO = { pendiente: 'en_camino', en_camino: 'hecho', hecho: 'pendiente' };
  var TXT_TRASLADO = { pendiente: 'Pendiente', en_camino: 'En camino', hecho: 'Hecho' };
  function listaTraslados(lista, corto) {
    if (!lista.length) return '<p class="vacio">Sin traslados.</p>';
    return '<ul class="mini">' + lista.map(function (t) {
      var r = t.r;
      return '<li class="mini__fila traslado traslado--' + t.estado + '"><span class="mini__hora">' + hora(t.hora) + '</span>' +
        '<span class="mini__texto"><strong>' + esc(r.cliente.nombre) + '</strong> · ' + r.pasajeros + ' pas.' +
        '<small>' + (t.tipo === 'ida' ? 'Sale del parking' : 'Buscar en la terminal') + (t.tipo === 'vuelta' && r.vuelo.vuelta ? ' · vuelo ' + esc(r.vuelo.vuelta) : '') + ' · ' + esc(r.vehiculo.matricula) + '</small></span>' +
        (corto ? '<span class="mini__accion"><span class="estado estado--' + (t.estado === 'en_camino' ? 'info' : 'alerta') + '">' + TXT_TRASLADO[t.estado] + '</span></span>' :
        '<span class="mini__accion"><button type="button" class="btn btn--chico ' + (t.estado === 'hecho' ? 'btn--linea' : 'btn--primario') + '" data-traslado="' + r.id + '|' + t.tipo + '">' +
          (t.estado === 'pendiente' ? 'Salir' : t.estado === 'en_camino' ? 'Llegamos' : ico('check') + 'Hecho') + '</button></span>') + '</li>';
    }).join('') + '</ul>';
  }

  /* ---------- LUGARES ---------- */
  V.lugares = function () {
    var d = D(), ocup = {}, llegan = {};
    d.reservas.forEach(function (r) { if (r.estado === 'en_predio' && r.lugar) ocup[r.lugar] = r; });
    var hoyLlegan = d.reservas.filter(function (r) { return r.estado === 'confirmada' && mismoDia(r.entrada, Date.now()); });
    function zona(tipo, titulo) {
      var ls = d.lugares.filter(function (l) { return l.tipo === tipo; });
      var n = ls.filter(function (l) { return ocup[l.id]; }).length;
      var porLlegar = hoyLlegan.filter(function (r) { return r.lugarTipo === tipo; }).length;
      return '<section class="bloque"><header class="bloque__cabeza"><h2>' + titulo + ' <span class="cuenta">' + (ls.length - n) + ' libres de ' + ls.length + '</span></h2>' +
        (porLlegar ? '<span class="estado estado--alerta">' + ico('plane-takeoff') + porLlegar + ' llegan hoy</span>' : '') + '</header>' +
        '<div class="mapa-lugares">' + ls.map(function (l) {
          var r = ocup[l.id];
          if (!r) return '<div class="cajon cajon--libre"><strong>' + l.id + '</strong><small>Libre</small></div>';
          var dias = Math.max(1, Math.ceil((Date.now() - new Date(r.checkin)) / PD.DIA));
          var sale = mismoDia(r.salida, Date.now());
          return '<button type="button" class="cajon cajon--ocupado' + (sale ? ' cajon--sale' : '') + '" data-abrir-reserva="' + r.id + '"><strong>' + l.id + '</strong><span>' + esc(r.vehiculo.matricula) + '</span><small>' + (sale ? 'Sale hoy ' + hora(r.salida) : dias + (dias === 1 ? ' día' : ' días')) + '</small></button>';
        }).join('') + '</div></section>';
    }
    return '<div class="leyenda"><span><i class="cajon-mini cajon--libre"></i>Libre</span><span><i class="cajon-mini cajon--ocupado"></i>Ocupado</span><span><i class="cajon-mini cajon--sale"></i>Sale hoy</span></div>' +
      zona('techado', 'Zona A · Techado') + zona('aire', 'Zona B · Predio');
  };

  /* ---------- CAJA ---------- */
  V.caja = function () {
    var c = D().caja, t = c.turnoActual;
    if (!t) return '<section class="bloque"><p class="vacio vacio--grande">' + ico('banknote') + 'No hay un turno abierto.</p><div class="ventana__acciones"><button class="btn btn--primario" type="button" data-abrir-caja>' + ico('plus') + 'Abrir turno</button></div></section>' + historialCajas(c);
    var por = {}; t.movimientos.forEach(function (m) { por[m.medio] = (por[m.medio] || 0) + m.monto; });
    var cobrado = t.movimientos.filter(function (m) { return m.monto > 0; }).reduce(function (s, m) { return s + m.monto; }, 0);
    var egresos = t.movimientos.filter(function (m) { return m.monto < 0; }).reduce(function (s, m) { return s + m.monto; }, 0);
    var esperado = t.base + (por.efectivo || 0) + egresos;
    return '<div class="herramientas"><p class="ayuda">Turno abierto el ' + fechaHora(t.apertura) + ' por ' + esc(t.usuario) + '.</p>' +
        '<button class="btn btn--linea" type="button" data-egreso>' + ico('arrow-down') + 'Registrar egreso</button>' +
        '<button class="btn btn--primario" type="button" data-cerrar-caja data-esperado="' + esperado + '">' + ico('lock') + 'Cerrar caja</button></div>' +
      '<div class="kpis">' + kpi('wallet', 'Base inicial', plata(t.base), 'efectivo al abrir') + kpi('circle-dollar-sign', 'Cobrado', plata(cobrado), t.movimientos.filter(function (m) { return m.monto > 0; }).length + ' cobros') +
        kpi('arrow-down', 'Egresos', plata(-egresos), 'gastos del turno') + kpi('banknote', 'Efectivo esperado', plata(esperado), 'base + efectivo − egresos', true) + '</div>' +
      '<div class="columnas columnas--caja">' +
        bloque('Movimientos del turno', t.movimientos.length, t.movimientos.length ? '<div class="tabla-caja"><table class="tabla tabla--compacta"><thead><tr><th>Hora</th><th>Concepto</th><th>Medio</th><th class="num">Monto</th></tr></thead><tbody>' +
          t.movimientos.slice().sort(function (a, b) { return new Date(b.hora) - new Date(a.hora); }).map(function (m) { return '<tr><td data-et="Hora">' + hora(m.hora) + '</td><td data-et="Concepto">' + esc(m.concepto) + '<small>' + esc(m.usuario) + '</small></td><td data-et="Medio">' + MEDIOS[m.medio] + '</td><td data-et="Monto" class="num' + (m.monto < 0 ? ' negativo' : '') + '">' + plata(m.monto) + '</td></tr>'; }).join('') + '</tbody></table></div>' : '<p class="vacio">Todavía no hay movimientos.</p>') +
        bloque('Por medio de pago', null, '<ul class="por-medio">' + ['online', 'efectivo', 'tarjeta', 'transferencia', 'egreso'].map(function (k) {
          return '<li><span>' + MEDIOS[k] + (k === 'online' ? '<small>no entra a la caja física</small>' : '') + '</span><strong>' + plata(por[k] || 0) + '</strong></li>';
        }).join('') + '<li class="por-medio__total"><span>Total del turno</span><strong>' + plata(cobrado + egresos) + '</strong></li></ul>') +
      '</div>' + historialCajas(c);
  };
  function historialCajas(c) {
    if (!c.cerrados.length) return '';
    return bloque('Cierres anteriores', c.cerrados.length, '<div class="tabla-caja"><table class="tabla tabla--compacta"><thead><tr><th>Turno</th><th>Cerró</th><th class="num">Esperado</th><th class="num">Contado</th><th>Resultado</th></tr></thead><tbody>' +
      c.cerrados.slice(0, 10).map(function (x) {
        var dif = x.contado - x.esperado;
        return '<tr><td data-et="Turno">' + fechaHora(x.apertura) + ' → ' + hora(x.cierre) + '</td><td data-et="Cerró">' + esc(x.cerro) + '</td><td data-et="Esperado" class="num">' + plata(x.esperado) + '</td><td data-et="Contado" class="num">' + plata(x.contado) + '</td><td data-et="Resultado">' +
          (dif === 0 ? '<span class="estado estado--bien">' + ico('circle-check') + 'Cuadra</span>' : '<span class="estado estado--alerta">' + ico('triangle-alert') + (dif > 0 ? 'Sobran ' : 'Faltan ') + plata(Math.abs(dif)) + '</span>') + '</td></tr>';
      }).join('') + '</tbody></table></div>');
  }

  /* ---------- CLIENTES ---------- */
  V.clientes = function (q) {
    var mapa = {};
    D().reservas.forEach(function (r) {
      var k = r.cliente.telefono.replace(/\D/g, '') || r.cliente.nombre;
      var c = mapa[k] || (mapa[k] = { nombre: r.cliente.nombre, telefono: r.cliente.telefono, n: 0, gastado: 0, ultima: 0, autos: {} });
      if (r.estado !== 'cancelada') { c.n++; c.gastado += r.pago.monto || 0; }
      c.ultima = Math.max(c.ultima, new Date(r.entrada).getTime()); c.autos[r.vehiculo.matricula] = 1;
    });
    var busca = (q.b || '').toLowerCase();
    var lista = Object.keys(mapa).map(function (k) { return mapa[k]; }).filter(function (c) { return !busca || (c.nombre + c.telefono + Object.keys(c.autos).join(' ')).toLowerCase().indexOf(busca) >= 0; })
      .sort(function (a, b) { return b.n - a.n || b.ultima - a.ultima; });
    return '<div class="herramientas"><label class="buscador">' + ico('search') + '<input type="search" placeholder="Nombre, teléfono o matrícula" value="' + esc(q.b || '') + '" data-buscar="clientes"></label></div>' +
      '<p class="resultado">' + lista.length + ' clientes</p>' +
      '<div class="tabla-caja"><table class="tabla"><thead><tr><th>Cliente</th><th>Teléfono</th><th>Autos</th><th class="num">Reservas</th><th>Última</th><th class="num">Pagado</th></tr></thead><tbody>' +
      lista.slice(0, 100).map(function (c) {
        return '<tr data-buscar-cliente="' + esc(c.nombre) + '" tabindex="0"><td data-et="Cliente"><strong>' + esc(c.nombre) + '</strong>' + (c.n >= 3 ? '<small>Cliente frecuente</small>' : '') + '</td><td data-et="Teléfono">' + esc(c.telefono) + '</td><td data-et="Autos">' + Object.keys(c.autos).map(function (m) { return '<span class="matricula">' + esc(m) + '</span>'; }).join(' ') + '</td>' +
          '<td data-et="Reservas" class="num">' + c.n + '</td><td data-et="Última">' + fechaCorta(c.ultima) + '</td><td data-et="Pagado" class="num">' + plata(c.gastado) + '</td></tr>';
      }).join('') + '</tbody></table></div>';
  };

  /* ---------- REPORTES ---------- */
  var PERIODOS = [['7', 'Últimos 7 días'], ['30', 'Últimos 30 días'], ['mes', 'Este mes'], ['pasado', 'Mes pasado']];
  function rango(p) {
    var h = new Date(); h.setHours(0, 0, 0, 0);
    if (p === 'mes') return [new Date(h.getFullYear(), h.getMonth(), 1).getTime(), h.getTime() + PD.DIA];
    if (p === 'pasado') return [new Date(h.getFullYear(), h.getMonth() - 1, 1).getTime(), new Date(h.getFullYear(), h.getMonth(), 1).getTime()];
    var n = +p || 30; return [h.getTime() - (n - 1) * PD.DIA, h.getTime() + PD.DIA];
  }
  V.reportes = function (q) {
    var per = q.p || '30', R = rango(per), d = D();
    var pagadas = d.reservas.filter(function (r) { return r.pago.estado !== 'pendiente' && r.pago.fecha && new Date(r.pago.fecha) >= R[0] && new Date(r.pago.fecha) < R[1]; });
    var hechas = d.reservas.filter(function (r) { return r.estado !== 'cancelada' && new Date(r.entrada) >= R[0] && new Date(r.entrada) < R[1]; });
    var total = pagadas.reduce(function (s, r) { return s + r.pago.monto; }, 0);
    var porDia = [], dias = Math.round((R[1] - R[0]) / PD.DIA);
    for (var i = 0; i < dias; i++) porDia.push({ dia: R[0] + i * PD.DIA, monto: 0, n: 0 });
    pagadas.forEach(function (r) { var k = Math.floor((inicioDia(r.pago.fecha) - R[0]) / PD.DIA); if (porDia[k]) { porDia[k].monto += r.pago.monto; porDia[k].n++; } });
    var medios = {}, tipos = { techado: 0, aire: 0 }, origenes = { web: 0, whatsapp: 0, mostrador: 0 };
    pagadas.forEach(function (r) { medios[r.pago.medio] = (medios[r.pago.medio] || 0) + r.pago.monto; tipos[r.lugarTipo] += r.pago.monto; });
    hechas.forEach(function (r) { origenes[r.origen]++; });
    var estadia = hechas.length ? hechas.reduce(function (s, r) { return s + PD.dias(r.entrada, r.salida); }, 0) / hechas.length : 0;
    return '<div class="herramientas"><div class="chips">' + PERIODOS.map(function (x) { return '<a class="chip' + (x[0] === per ? ' es-activo' : '') + '" href="#/reportes?p=' + x[0] + '">' + x[1] + '</a>'; }).join('') + '</div>' +
        '<button class="btn btn--linea" type="button" data-exportar="' + per + '">' + ico('file-spreadsheet') + 'Exportar a Excel (CSV)</button>' +
        '<button class="btn btn--linea" type="button" data-imprimir-pagina>' + ico('printer') + 'Imprimir</button></div>' +
      '<p class="ayuda">Del ' + new Date(R[0]).toLocaleDateString('es-UY') + ' al ' + new Date(R[1] - 1).toLocaleDateString('es-UY') + '</p>' +
      '<div class="kpis">' + kpi('circle-dollar-sign', 'Recaudado', plata(total), pagadas.length + ' cobros', true) + kpi('calendar-check', 'Reservas', hechas.length, 'que llegaron en el período') +
        kpi('timer', 'Estadía promedio', estadia.toFixed(1).replace('.', ',') + ' días', 'por reserva') + kpi('receipt', 'Ticket promedio', plata(pagadas.length ? total / pagadas.length : 0), 'por reserva cobrada') + '</div>' +
      bloque('Recaudado por día', null, graficoDias(porDia)) +
      '<div class="columnas">' +
        bloque('Por medio de pago', null, barrasH(Object.keys(medios).map(function (k) { return [MEDIOS[k], medios[k]]; }), true)) +
        bloque('Por tipo de lugar', null, barrasH([['Techado', tipos.techado], ['Predio', tipos.aire]], true)) +
      '</div>' +
      bloque('Cómo reservan', null, barrasH([['Web', origenes.web], ['WhatsApp', origenes.whatsapp], ['Mostrador', origenes.mostrador]], false));
  };
  /* Barras verticales de una serie: navy; hoy en naranja. Tooltip al pasar o tocar. */
  function graficoDias(datos) {
    var max = Math.max.apply(null, datos.map(function (x) { return x.monto; }).concat([1]));
    var tope = Math.ceil(max / 5000) * 5000 || 5000;
    var lineas = [0, .5, 1].map(function (f) { return '<div class="grafico__linea" style="bottom:' + (f * 100) + '%"><span>' + plata(tope * f) + '</span></div>'; }).join('');
    var cada = Math.ceil(datos.length / 8);
    return '<div class="grafico" role="img" aria-label="Recaudado por día, máximo ' + plata(max) + '"><div class="grafico__area">' + lineas +
      '<div class="grafico__barras" style="grid-template-columns:repeat(' + datos.length + ',1fr)">' + datos.map(function (x, i) {
        var h = (x.monto / tope * 100), esHoy = mismoDia(x.dia, Date.now());
        return '<div class="grafico__col" tabindex="0" data-tip="' + new Date(x.dia).toLocaleDateString('es-UY', { weekday: 'short', day: 'numeric', month: 'short' }) + ' · ' + plata(x.monto) + ' · ' + x.n + ' cobros">' +
          '<span class="grafico__barra' + (esHoy ? ' es-hoy' : '') + '" style="height:' + h + '%"></span></div>';
      }).join('') + '</div></div>' +
      '<div class="grafico__ejes" style="grid-template-columns:repeat(' + datos.length + ',1fr)">' + datos.map(function (x, i) { return '<span>' + (i % cada === 0 ? fechaCorta(x.dia) : '') + '</span>'; }).join('') + '</div>' +
      '<p class="grafico__tip" data-tip-salida aria-live="polite">Pasá el mouse o tocá una barra para ver el día.</p></div>' +
      '<details class="tabla-datos"><summary>Ver como tabla</summary><table class="tabla tabla--compacta"><thead><tr><th>Día</th><th class="num">Cobros</th><th class="num">Recaudado</th></tr></thead><tbody>' +
      datos.map(function (x) { return '<tr><td>' + fechaCorta(x.dia) + '</td><td class="num">' + x.n + '</td><td class="num">' + plata(x.monto) + '</td></tr>'; }).join('') + '</tbody></table></details>';
  }
  function barrasH(pares, esPlata) {
    pares = pares.filter(function (x) { return x[1] > 0; }).sort(function (a, b) { return b[1] - a[1]; });
    if (!pares.length) return '<p class="vacio">Sin datos en el período.</p>';
    var total = pares.reduce(function (s, x) { return s + x[1]; }, 0), max = pares[0][1];
    return '<ul class="barras-h">' + pares.map(function (x) {
      return '<li><p><span>' + x[0] + '</span><strong>' + (esPlata ? plata(x[1]) : x[1]) + '</strong><small>' + Math.round(x[1] / total * 100) + '%</small></p><span class="barras-h__pista"><span style="width:' + (x[1] / max * 100) + '%"></span></span></li>';
    }).join('') + '</ul>';
  }
  function exportarCSV(per) {
    var R = rango(per);
    var filas = [['Código', 'Origen', 'Cliente', 'Teléfono', 'Matrícula', 'Modelo', 'Lugar', 'Tipo', 'Servicio', 'Deja', 'Vuelve', 'Días', 'Total', 'Pagado', 'Medio', 'Estado']];
    D().reservas.filter(function (r) { return new Date(r.entrada) >= R[0] && new Date(r.entrada) < R[1]; }).forEach(function (r) {
      filas.push([r.codigo, ORIGEN[r.origen], r.cliente.nombre, r.cliente.telefono, r.vehiculo.matricula, r.vehiculo.modelo, r.lugar || '', TIPO[r.lugarTipo], r.servicio, fechaHora(r.entrada), fechaHora(r.salida), PD.dias(r.entrada, r.salida), r.total, r.pago.monto, r.pago.medio ? MEDIOS[r.pago.medio] : '', ESTADOS[r.estado].txt]);
    });
    var csv = '﻿' + filas.map(function (f) { return f.map(function (v) { return '"' + String(v).replace(/"/g, '""') + '"'; }).join(';'); }).join('\r\n');
    descargar('parking-despegar-reservas-' + per + '.csv', csv, 'text/csv;charset=utf-8');
  }
  function descargar(nombre, texto, tipo) {
    var a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([texto], { type: tipo }));
    a.download = nombre; document.body.appendChild(a); a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 500);
  }

  /* ---------- TARIFAS ---------- */
  V.tarifas = function () {
    var t = D().tarifas;
    return '<div class="columnas">' +
      bloque('Tarifas vigentes', null, '<p class="aviso-tabla">' + ico('info') + 'Los cambios se aplican en la web al instante.</p>' +
        '<form class="formulario" data-form-tarifas>' +
        '<div class="formulario__fila"><label class="campo"><span>Techado, por día</span><input name="techado" type="number" min="0" value="' + t.techado + '"></label><label class="campo"><span>Predio, por día</span><input name="aire" type="number" min="0" value="' + t.aire + '"></label></div>' +
        '<div class="formulario__fila"><label class="campo"><span>Valet Parking, por servicio</span><input name="valet" type="number" min="0" value="' + t.valet + '"></label><label class="campo"><span>Tolerancia antes de cobrar otro día (horas)</span><input name="graciaHoras" type="number" min="0" max="12" value="' + t.graciaHoras + '"></label></div>' +
        '<label class="campo campo--corto"><span>Mínimo de días</span><input name="minimoDias" type="number" min="1" max="7" value="' + t.minimoDias + '"></label>' +
        '<div class="ventana__acciones"><button class="btn btn--primario" type="submit">' + ico('check') + 'Guardar tarifas</button></div></form>') +
      bloque('Calculadora de cobro', null, '<form class="formulario" data-form-simulador>' +
        '<div class="formulario__fila"><label class="campo"><span>Lugar</span><select name="lugarTipo"><option value="techado">Techado</option><option value="aire">Predio</option></select></label><label class="campo"><span>Servicio</span><select name="servicio"><option value="traslado">Con traslado</option><option value="valet">Valet</option></select></label></div>' +
        '<div class="formulario__fila"><label class="campo"><span>Deja el auto</span><input type="datetime-local" name="entrada" value="' + local(Date.now()) + '"></label><label class="campo"><span>Retira</span><input type="datetime-local" name="salida" value="' + local(Date.now() + 3 * PD.DIA + 5 * 3600000) + '"></label></div>' +
        '</form><div class="total-grande" data-simulado></div>') +
    '</div>';
  };
  function simular() {
    var f = $('[data-form-simulador]'); if (!f) return;
    var p = PD.precio({ entrada: f.entrada.value, salida: f.salida.value, lugarTipo: f.lugarTipo.value, servicio: f.servicio.value });
    var t = D().tarifas;
    $('[data-simulado]').innerHTML = '<p>Se cobraría</p><strong>' + plata(p.total) + '</strong><small>' + p.dias + ' días × ' + plata(f.lugarTipo.value === 'techado' ? t.techado : t.aire) + (p.extra ? ' + valet ' + plata(p.extra) : '') + ' · tolerancia de ' + t.graciaHoras + ' h</small>';
  }

  /* ---------- USUARIOS ---------- */
  V.usuarios = function () {
    var us = D().usuarios;
    return '<div class="herramientas"><p class="ayuda">Cada persona entra con su usuario y todo lo que hace queda registrado a su nombre.</p><button class="btn btn--primario" type="button" data-nuevo-usuario>' + ico('plus') + 'Nuevo usuario</button></div>' +
      '<div class="tabla-caja"><table class="tabla"><thead><tr><th>Nombre</th><th>Usuario</th><th>Rol</th><th>Puede</th><th>Estado</th><th></th></tr></thead><tbody>' +
      us.map(function (u) {
        var puedeTxt = { admin: 'Todo, incluidos reportes, tarifas y respaldos', personal: 'Reservas, llegadas, retiros, caja y clientes', chofer: 'Solo traslados' }[u.rol];
        return '<tr><td data-et="Nombre"><strong>' + esc(u.nombre) + '</strong></td><td data-et="Usuario"><code>' + esc(u.usuario) + '</code></td><td data-et="Rol">' + ROLES[u.rol] + '</td><td data-et="Puede">' + puedeTxt + '</td>' +
          '<td data-et="Estado">' + (u.activo ? '<span class="estado estado--bien">' + ico('circle-check') + 'Activo</span>' : '<span class="estado estado--neutro">Inactivo</span>') + '</td>' +
          '<td>' + (u.id !== usuario.id ? '<button type="button" class="btn btn--chico btn--linea" data-alternar-usuario="' + u.id + '">' + (u.activo ? 'Desactivar' : 'Activar') + '</button>' : '<small>Sos vos</small>') + '</td></tr>';
      }).join('') + '</tbody></table></div>';
  };

  /* ---------- SISTEMA ---------- */
  V.sistema = function () {
    var d = D();
    return bloque('Respaldos', null, '<p class="texto">Descargá una copia de todo (reservas, caja, tarifas y usuarios) o restaurá una anterior.</p>' +
        '<div class="ventana__acciones"><button class="btn btn--primario" type="button" data-respaldar>' + ico('download') + 'Descargar respaldo</button>' +
        '<label class="btn btn--linea">' + ico('upload') + 'Restaurar<input type="file" accept="application/json" data-restaurar hidden></label>' +
        '<button class="btn btn--linea btn--peligro" type="button" data-restablecer>' + ico('rotate-ccw') + 'Reiniciar datos</button></div>') +
      bloque('Registro de cambios', d.auditoria.length, '<div class="tabla-caja"><table class="tabla tabla--compacta"><thead><tr><th>Fecha</th><th>Usuario</th><th>Qué pasó</th></tr></thead><tbody>' +
        d.auditoria.slice(0, 60).map(function (a) { return '<tr><td data-et="Fecha">' + fechaHora(a.fecha) + '</td><td data-et="Usuario">' + esc(a.usuario) + '</td><td data-et="Qué pasó">' + esc(a.accion) + '</td></tr>'; }).join('') + '</tbody></table></div>');
  };

  /* ============================================================
     NAVEGACIÓN, PINTADO Y EVENTOS
     ============================================================ */
  function ruta() {
    var h = location.hash.replace(/^#\/?/, '') || 'panel';
    var partes = h.split('?'), q = {};
    (partes[1] || '').split('&').forEach(function (p) { if (!p) return; var kv = p.split('='); q[kv[0]] = decodeURIComponent(kv[1] || ''); });
    return { id: partes[0], q: q };
  }
  function pintarNav(actual) {
    $('[data-nav]').innerHTML = SECTORES.map(function (sec) {
      var items = SECCIONES.filter(function (s) { return s.sector === sec.id && s.roles.indexOf(usuario.rol) >= 0; });
      if (!items.length) return '';
      return '<div class="lateral__sector" data-sector="' + sec.id + '">' + (sec.id !== 'hoy' ? '<p class="lateral__grupo">' + sec.nombre + '</p>' : '') +
        items.map(function (s) {
          var n = s.cuenta ? s.cuenta() : 0;
          return '<a class="lateral__link' + (s.id === actual ? ' es-activo' : '') + '" href="#/' + s.id + '"' + (s.id === actual ? ' aria-current="page"' : '') + '>' + ico(s.ico) + '<span>' + s.nombre + '</span>' + (n ? '<span class="lateral__cuenta">' + n + '</span>' : '') + '</a>';
        }).join('') + '</div>';
    }).join('');
  }
  /* Encabezado de cada pantalla: sector, título y para qué sirve */
  function cabecera(sec) {
    var nombreSector = SECTORES.filter(function (x) { return x.id === sec.sector; })[0].nombre;
    if (sec.id === 'panel') {
      var h = new Date().getHours();
      return '<header class="cabecera"><p class="cabecera__sector">' + esc(diaLargo(Date.now())) + '</p>' +
        '<h1 class="cabecera__titulo">' + (h < 13 ? 'Buen día' : h < 20 ? 'Buenas tardes' : 'Buenas noches') + '</h1>' +
        '<p class="cabecera__desc">' + sec.desc + '</p></header>';
    }
    return '<header class="cabecera"><p class="cabecera__sector">' + nombreSector + '</p>' +
      '<h1 class="cabecera__titulo"><span class="cabecera__ico">' + ico(sec.ico) + '</span>' + sec.nombre + '</h1>' +
      '<p class="cabecera__desc">' + sec.desc + '</p></header>';
  }
  var editando = false;
  function pintar() {
    leerSesion();
    if (!usuario) { $('[data-app]').hidden = true; $('[data-ingreso]').hidden = false; return; }
    $('[data-ingreso]').hidden = true; $('[data-app]').hidden = false;
    var r = ruta();
    if (!puede(r.id)) { location.hash = '#/' + (usuario.rol === 'chofer' ? 'traslados' : 'panel'); return; }
    var sec = SECCIONES.filter(function (s) { return s.id === r.id; })[0];
    $('.principal').setAttribute('data-sector', sec.sector);
    document.title = sec.nombre + ' — Gestión · Parking Despegar';
    $('[data-usuario-nombre]').textContent = usuario.nombre;
    $('[data-usuario-rol]').textContent = ROLES[usuario.rol];
    $('[data-avatar]').textContent = usuario.nombre.split(' ').map(function (p) { return p[0]; }).slice(0, 2).join('').toUpperCase();
    pintarNav(r.id);
    $('[data-vista]').innerHTML = cabecera(sec) + V[r.id](r.q);
    if (r.id === 'tarifas') simular();
    /* En celular, la ficha elegida queda debajo de la lista: llevarla a la vista */
    if (r.q.c && innerWidth < 1024) { var fichaEl = $('[data-panel-llegada], [data-panel-retiro]'); if (fichaEl) fichaEl.scrollIntoView({ block: 'start', behavior: 'instant' }); }
    document.documentElement.classList.remove('lateral-abierto');
  }

  /* Ingreso */
  $('[data-form-ingreso]').addEventListener('submit', function (e) {
    e.preventDefault();
    var f = e.target, err = $('[data-error-ingreso]');
    var u = D().usuarios.filter(function (x) { return x.usuario === f.usuario.value.trim().toLowerCase() && x.clave === f.clave.value; })[0];
    if (!u || !u.activo) { err.textContent = u ? 'Ese usuario está desactivado.' : 'Usuario o contraseña incorrectos.'; err.hidden = false; return; }
    sessionStorage.setItem(CLAVE_SESION, u.id);
    PD.guardar(u.nombre, 'Ingresó al sistema');
    location.hash = '#/' + (u.rol === 'chofer' ? 'traslados' : 'panel');
    pintar();
  });
  $$('[data-demo]').forEach(function (b) { b.addEventListener('click', function () { var f = $('[data-form-ingreso]'); f.usuario.value = b.getAttribute('data-demo'); f.clave.value = 'despegar'; f.requestSubmit ? f.requestSubmit() : f.dispatchEvent(new Event('submit')); }); });
  $('[data-salir]').addEventListener('click', function () { PD.guardar(nombreUsuario(), 'Salió del sistema'); sessionStorage.removeItem(CLAVE_SESION); location.hash = ''; pintar(); });
  $('[data-abrir-lateral]').addEventListener('click', function () { document.documentElement.classList.add('lateral-abierto'); });
  $('[data-cerrar-lateral]').addEventListener('click', function () { document.documentElement.classList.remove('lateral-abierto'); });

  /* Delegación de eventos de las vistas */
  document.addEventListener('click', function (e) {
    var t = e.target;
    var el;
    if ((el = t.closest('[data-abrir-reserva]')) && !t.closest('a, button:not([data-abrir-reserva])')) return abrirReserva(el.getAttribute('data-abrir-reserva'));
    if ((el = t.closest('[data-elegir-llegada]'))) { location.hash = '#/llegada?c=' + el.getAttribute('data-elegir-llegada'); return; }
    if ((el = t.closest('[data-elegir-retiro]'))) { location.hash = '#/retiros?c=' + el.getAttribute('data-elegir-retiro'); return; }
    if (t.closest('[data-nueva-reserva]')) return formReserva();
    if (t.closest('[data-sin-reserva]')) return sinReserva();
    if ((el = t.closest('[data-cancelar]'))) {
      var r = D().reservas.filter(function (x) { return x.id === el.getAttribute('data-cancelar'); })[0];
      if (r && confirm('¿Cancelar la reserva ' + r.codigo + '?')) { r.estado = 'cancelada'; PD.guardar(nombreUsuario(), 'Canceló ' + r.codigo); cerrarVentana(); avisar('Reserva ' + r.codigo + ' cancelada', 'info'); pintar(); }
      return;
    }
    if ((el = t.closest('[data-traslado]'))) {
      var partes = el.getAttribute('data-traslado').split('|');
      var rr = D().reservas.filter(function (x) { return x.id === partes[0]; })[0];
      rr.traslado[partes[1]] = PASOS_TRASLADO[rr.traslado[partes[1]]];
      PD.guardar(nombreUsuario(), 'Traslado ' + (partes[1] === 'ida' ? 'al aeropuerto' : 'de vuelta') + ' de ' + rr.codigo + ': ' + TXT_TRASLADO[rr.traslado[partes[1]]]);
      return pintar();
    }
    if ((el = t.closest('[data-buscar-cliente]'))) { location.hash = '#/reservas?f=todas&b=' + encodeURIComponent(el.getAttribute('data-buscar-cliente')); return; }
    if ((el = t.closest('[data-exportar]'))) return exportarCSV(el.getAttribute('data-exportar'));
    if (t.closest('[data-imprimir-pagina]')) return window.print();
    if (t.closest('[data-abrir-caja]')) {
      var base = +prompt('Efectivo con el que se abre la caja', '3000');
      if (isNaN(base)) return;
      D().caja.turnoActual = { id: PD.uid(), apertura: new Date().toISOString(), base: base, usuario: nombreUsuario(), movimientos: [] };
      PD.guardar(nombreUsuario(), 'Abrió caja con ' + plata(base)); return pintar();
    }
    if (t.closest('[data-egreso]')) {
      var c = abrirVentana('<h2 class="ventana__titulo">Registrar egreso</h2><form class="formulario" data-form-egreso><label class="campo"><span>Concepto</span><input name="concepto" required placeholder="Ej.: nafta de la camioneta"></label><label class="campo campo--corto"><span>Monto</span><input name="monto" type="number" min="1" required></label><div class="ventana__acciones"><button class="btn btn--primario" type="submit">' + ico('check') + 'Guardar</button></div></form>');
      $('[data-form-egreso]', c).addEventListener('submit', function (ev) {
        ev.preventDefault(); var f = ev.target; if (!f.concepto.value.trim() || !(+f.monto.value > 0)) return;
        D().caja.turnoActual.movimientos.unshift({ id: PD.uid(), hora: new Date().toISOString(), concepto: f.concepto.value.trim(), medio: 'egreso', monto: -Math.abs(+f.monto.value), usuario: nombreUsuario() });
        PD.guardar(nombreUsuario(), 'Egreso: ' + f.concepto.value.trim() + ' ' + plata(+f.monto.value)); cerrarVentana(); pintar();
      });
      return;
    }
    if ((el = t.closest('[data-cerrar-caja]'))) {
      var esperado = +el.getAttribute('data-esperado');
      var cj = abrirVentana('<h2 class="ventana__titulo">Cerrar caja</h2><p class="texto">Contá el efectivo y escribí cuánto hay. El sistema te dice si cuadra. Un cierre no se puede modificar después.</p><form class="formulario" data-form-cierre><label class="campo campo--corto"><span>Efectivo contado</span><input name="contado" type="number" min="0" required></label><p class="vuelto" data-dif hidden></p><div class="ventana__acciones"><button class="btn btn--primario" type="submit">' + ico('lock') + 'Cerrar turno</button></div></form>');
      var fc = $('[data-form-cierre]', cj);
      fc.contado.addEventListener('input', function () { var dif = +fc.contado.value - esperado, p = $('[data-dif]', cj); p.hidden = fc.contado.value === ''; p.textContent = dif === 0 ? 'Cuadra justo.' : (dif > 0 ? 'Sobran ' : 'Faltan ') + plata(Math.abs(dif)) + ' (esperado ' + plata(esperado) + ').'; p.className = 'vuelto' + (dif === 0 ? '' : ' vuelto--alerta'); });
      fc.addEventListener('submit', function (ev) {
        ev.preventDefault(); if (fc.contado.value === '') return;
        var caja = D().caja, tu = caja.turnoActual;
        caja.cerrados.unshift({ apertura: tu.apertura, cierre: new Date().toISOString(), cerro: nombreUsuario(), esperado: esperado, contado: +fc.contado.value, movimientos: tu.movimientos.length });
        caja.turnoActual = null;
        PD.guardar(nombreUsuario(), 'Cerró caja: esperado ' + plata(esperado) + ', contado ' + plata(+fc.contado.value)); cerrarVentana(); avisar('Caja cerrada'); pintar();
      });
      return;
    }
    if (t.closest('[data-nuevo-usuario]')) {
      var cu = abrirVentana('<h2 class="ventana__titulo">Nuevo usuario</h2><form class="formulario" data-form-usuario><label class="campo"><span>Nombre</span><input name="nombre" required></label><div class="formulario__fila"><label class="campo"><span>Usuario</span><input name="usuario" required></label><label class="campo"><span>Contraseña</span><input name="clave" required></label></div><label class="campo"><span>Rol</span><select name="rol"><option value="personal">Personal de turno</option><option value="chofer">Chofer</option><option value="admin">Administración</option></select></label><div class="ventana__acciones"><button class="btn btn--primario" type="submit">' + ico('check') + 'Crear</button></div></form>');
      $('[data-form-usuario]', cu).addEventListener('submit', function (ev) {
        ev.preventDefault(); var f = ev.target; if (!f.nombre.value.trim() || !f.usuario.value.trim() || !f.clave.value) return;
        D().usuarios.push({ id: PD.uid(), nombre: f.nombre.value.trim(), usuario: f.usuario.value.trim().toLowerCase(), clave: f.clave.value, rol: f.rol.value, activo: true });
        PD.guardar(nombreUsuario(), 'Creó el usuario ' + f.usuario.value.trim()); cerrarVentana(); pintar();
      });
      return;
    }
    if ((el = t.closest('[data-alternar-usuario]'))) { var u = D().usuarios.filter(function (x) { return x.id === el.getAttribute('data-alternar-usuario'); })[0]; u.activo = !u.activo; PD.guardar(nombreUsuario(), (u.activo ? 'Activó' : 'Desactivó') + ' a ' + u.usuario); return pintar(); }
    if (t.closest('[data-respaldar]')) { descargar('respaldo-parking-despegar-' + new Date().toISOString().slice(0, 10) + '.json', PD.exportar(), 'application/json'); PD.guardar(nombreUsuario(), 'Descargó un respaldo'); return; }
    if (t.closest('[data-restablecer]')) { if (confirm('¿Borrar todo y reiniciar los datos?')) { PD.restablecer(); avisar('Datos reiniciados', 'info'); pintar(); } return; }
  });
  document.addEventListener('keydown', function (e) {
    var el = e.target.closest && e.target.closest('tr[data-abrir-reserva], tr[data-buscar-cliente]');
    if (el && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); el.click(); }
  });
  document.addEventListener('change', function (e) {
    if (e.target.matches('[data-restaurar]')) {
      var f = e.target.files[0]; if (!f) return;
      f.text().then(function (txt) { try { PD.importar(txt); avisar('Respaldo restaurado'); pintar(); } catch (err) { avisar('Ese archivo no es un respaldo válido', 'alerta'); } });
    }
  });
  document.addEventListener('submit', function (e) {
    var f = e.target;
    if (f.matches('[data-form-llegada]')) { e.preventDefault(); return registrarLlegada(f.getAttribute('data-id'), f); }
    if (f.matches('[data-form-retiro]')) { e.preventDefault(); return registrarRetiro(f.getAttribute('data-id'), f); }
    if (f.matches('[data-form-tarifas]')) {
      e.preventDefault(); var t = D().tarifas;
      ['techado', 'aire', 'valet', 'graciaHoras', 'minimoDias'].forEach(function (k) { t[k] = Math.max(0, +f[k].value || 0); });
      PD.guardar(nombreUsuario(), 'Cambió las tarifas: techado ' + plata(t.techado) + ', predio ' + plata(t.aire) + ', valet ' + plata(t.valet));
      avisar('Tarifas guardadas: ya se aplican en la web'); simular();
    }
  });
  var temporizador;
  document.addEventListener('input', function (e) {
    var el = e.target;
    if (el.matches('[data-buscar]')) {
      clearTimeout(temporizador);
      temporizador = setTimeout(function () {
        var v = el.getAttribute('data-buscar'), f = el.getAttribute('data-filtro');
        history.replaceState(null, '', '#/' + v + '?' + (f ? 'f=' + f + '&' : '') + 'b=' + encodeURIComponent(el.value));
        pintar(); var n = $('[data-buscar="' + v + '"]'); if (n) { n.focus(); n.setSelectionRange(n.value.length, n.value.length); }
      }, 250);
    }
    if (el.matches('[data-buscar-llegada]')) {
      var b = el.value.toLowerCase().replace(/\s/g, '');
      var lista = D().reservas.filter(function (r) { return r.estado === 'confirmada' && (!b || (r.codigo + r.vehiculo.matricula).toLowerCase().replace(/[\s-]/g, '').indexOf(b.replace('-', '')) >= 0); }).sort(porFecha('entrada'));
      $('[data-lista-llegada]').innerHTML = listaLlegada(b ? lista : lista.filter(function (r) { return new Date(r.entrada) - Date.now() < 1.5 * PD.DIA; }));
    }
    if (el.matches('[data-recibido]')) {
      var f2 = el.form, saldo = +f2.getAttribute('data-saldo'), v2 = $('[data-vuelto]');
      v2.hidden = !el.value; var dif = +el.value - saldo;
      v2.textContent = dif >= 0 ? 'Vuelto: ' + plata(dif) : 'Faltan ' + plata(-dif);
      v2.className = 'vuelto' + (dif < 0 ? ' vuelto--alerta' : '');
    }
    if (el.closest('[data-form-simulador]')) simular();
  });
  /* Escáner: Enter en el buscador de llegada elige la primera */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && e.target.matches('[data-buscar-llegada]')) { var p = $('[data-elegir-llegada]'); if (p) p.click(); }
  });
  /* Tooltip del gráfico */
  ['mouseover', 'focusin'].forEach(function (ev) {
    document.addEventListener(ev, function (e) { var c = e.target.closest && e.target.closest('[data-tip]'); if (c) { var s = $('[data-tip-salida]'); if (s) s.textContent = c.getAttribute('data-tip'); } });
  });

  /* En vivo: si llega una reserva desde la web (otra pestaña), avisar y repintar */
  var conocidas = D().reservas.length;
  PD.alCambiar(function (d, deAfuera) {
    if (!deAfuera) return;
    if (d.reservas.length > conocidas) {
      /* El pago online llega un instante después de la reserva: esperar y avisar con el estado final */
      var id = d.reservas[d.reservas.length - 1].id;
      setTimeout(function () {
        var nueva = D().reservas.filter(function (x) { return x.id === id; })[0];
        if (usuario && nueva) avisar('Nueva reserva ' + nueva.codigo + ' desde la ' + ORIGEN[nueva.origen].toLowerCase() + ' · ' + nueva.vehiculo.matricula + (nueva.pago.estado === 'pagado' ? ' · pagada' : ' · a cobrar'), 'info');
      }, 800);
    }
    conocidas = d.reservas.length;
    if (ventana.hidden && !(document.activeElement && document.activeElement.matches('input, select, textarea'))) pintar();
  });

  /* Reloj */
  function reloj() { var el = $('[data-reloj]'); if (el) el.textContent = new Date().toLocaleString('es-UY', { weekday: 'short', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }); }
  reloj(); setInterval(reloj, 15000);

  window.addEventListener('hashchange', pintar);
  pintar();
})();
