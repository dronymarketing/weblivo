/* ============================================================
   PARKING DESPEGAR — Gestión
   Operación del parking en línea: reservas, entrada (con cobro y
   factura), salida, traslados, lugares, caja, clientes, reportes,
   precios, equipo y registro de cambios.
   Lee de ../js/datos.js (Supabase). Cada acción se hace en el
   servidor y todas las pantallas abiertas se actualizan en vivo.
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
  var dosCifras = function (n) { return (n < 10 ? '0' : '') + n; };
  var fechaCorta = function (d) { d = new Date(d); return dosCifras(d.getDate()) + '/' + dosCifras(d.getMonth() + 1); };
  /* «06/10 | 16:30 Hrs.» */
  var fechaHora = function (d) { return d ? fechaCorta(d) + ' | ' + hora(d) + ' Hrs.' : '—'; };
  var diaLargo = function (d) { return new Date(d).toLocaleDateString('es-UY', { weekday: 'long', day: 'numeric', month: 'long' }); };
  var inicioDia = function (d) { var x = new Date(d || Date.now()); x.setHours(0, 0, 0, 0); return x.getTime(); };
  var mismoDia = function (a, b) { return inicioDia(a) === inicioDia(b); };

  /* ---------- Sesión ---------- */
  var usuario = null;
  function leerSesion() { var p = PD.perfil(); usuario = p && p.activo ? p : null; }
  function nombreUsuario() { return usuario ? usuario.nombre : 'sistema'; }

  /* Corre una acción del servidor: bloquea el botón y muestra el error si falla */
  var FALLO = {};
  async function ejecutar(boton, fn, errEl) {
    if (boton) { boton.disabled = true; boton.classList.add('es-cargando'); }
    if (errEl) errEl.hidden = true;
    try { return await fn(); }
    catch (e) {
      if (errEl) { errEl.textContent = e.message; errEl.hidden = false; } else avisar(e.message, 'alerta');
      return FALLO;
    } finally {
      if (boton) { boton.disabled = false; boton.classList.remove('es-cargando'); }
    }
  }

  var ROLES = { admin: 'Administración', personal: 'Personal de turno', chofer: 'Chofer' };
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
    { id: 'llegada', sector: 'autos', color: 'entrada', nombre: 'Entrada', ico: 'car-front', roles: ['admin', 'personal'],
      desc: 'Cuando llega un cliente: buscás su reserva, cobrás lo que falte, emitís la factura y le das un lugar. Si pagó por transferencia antes, se registra acá.',
      cuenta: function () { return D().reservas.filter(function (r) { return r.estado === 'confirmada' && mismoDia(r.entrada, Date.now()); }).length; } },
    { id: 'retiros', sector: 'autos', color: 'salida', nombre: 'Salida', ico: 'car-front', roles: ['admin', 'personal'],
      desc: 'Cuando vuelve un cliente: buscás su auto, entregás las llaves y el lugar queda libre. No se cobra: ya pagó al entrar.',
      cuenta: function () { return D().reservas.filter(function (r) { return r.estado === 'en_predio' && mismoDia(r.salida, Date.now()); }).length; } },
    { id: 'traslados', sector: 'autos', nombre: 'Traslados', ico: 'bus', roles: ['admin', 'personal', 'chofer'],
      desc: 'A quién hay que llevar al aeropuerto y a quién ir a buscar. Tocá el botón de cada viaje cuando salís y cuando terminás.',
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
      desc: 'Lo que se cobra por día y los datos que salen en la factura. Si cambiás un precio acá, cambia también en la web.' },
    { id: 'usuarios', sector: 'ajustes', nombre: 'Equipo', ico: 'user-cog', roles: ['admin'],
      desc: 'Quién entra al sistema y qué puede hacer cada uno.' },
    { id: 'sistema', sector: 'ajustes', nombre: 'Respaldos', ico: 'settings', roles: ['admin'],
      desc: 'Descargá una copia de todo y mirá quién hizo cada cambio.' }
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
    if (r.pago.estado === 'parcial') return '<span class="estado estado--alerta">' + ico('triangle-alert') + 'Falta ' + plata(r.total - r.pago.monto) + '</span>';
    return '<span class="estado estado--error">' + ico('circle-x') + 'No pagado</span>';
  }
  var TIPO = { techado: 'Techado', aire: 'Predio' };
  var ORIGEN = { web: 'Web', whatsapp: 'WhatsApp', mostrador: 'Mostrador', telefono: 'Teléfono' };
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
  var repintar = false;
  function cerrarVentana() {
    ventana.hidden = true;
    document.documentElement.classList.remove('ventana-abierta');
    if (focoPrevio && focoPrevio.isConnected) focoPrevio.focus();
    if (repintar) { repintar = false; pintar(); }
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
        atajo('#/llegada', 'entrada', 'car-front', 'Entrada', porLlegar ? (porLlegar === 1 ? 'Falta 1 entrada hoy' : 'Faltan ' + porLlegar + ' entradas hoy') : 'No hay más entradas hoy') +
        atajo('#/retiros', 'salida', 'car-front', 'Salida', porSalir ? (porSalir === 1 ? 'Falta 1 salida hoy' : 'Faltan ' + porSalir + ' salidas hoy') : 'No hay más salidas hoy') +
        atajo(null, 'reservas', 'plus', 'Nueva reserva', 'Por WhatsApp o en el mostrador') +
      '</div>' +
      (sinPago ? '<a class="alerta" href="#/reservas?f=pago">' + ico('circle-x') + '<span><strong>' + sinPago + ' reserva' + (sinPago > 1 ? 's' : '') + ' sin pagar</strong> llega' + (sinPago > 1 ? 'n' : '') + ' en las próximas 48 h. Se cobran al entrar: conviene avisarles por WhatsApp.</span>' + ico('chevron-right') + '</a>' : '') +
      '<div class="kpis">' +
        kpi('car', 'Autos totales en el Parking', dentro.length + '<span class="de-total">/' + d.lugares.length + '</span>',
          porTipo(dTech, dentro.length - dTech, capT, capA), 'autos', '#/retiros', 'Ver las salidas') +
        kpi('circle-parking', 'Lugares disponibles', '<span class="kpi__num">' + (libresT + libresA) + '</span><span class="de-total">/' + d.lugares.length + '</span>',
          porTipo(libresT, libresA, capT, capA), 'libre', '#/lugares', 'Ver el mapa') +
        kpi('bus', 'Traslados pendientes', trasPend.length,
          trasPend.length ? '<span class="por-tipo"><span class="por-tipo__nombre">Llevar</span><strong>' + trasPend.filter(function (t) { return t.tipo === 'ida'; }).length + '</strong></span>' +
            '<span class="por-tipo"><span class="por-tipo__nombre">Buscar</span><strong>' + trasPend.filter(function (t) { return t.tipo === 'vuelta'; }).length + '</strong></span>'
            : tras.length ? 'No queda ninguno: ya se hicieron los de hoy' : 'Hoy no hay traslados', 'autos', '#/traslados', 'Ver los traslados') +
        kpi('banknote', 'Cobrado en el turno', plata(cobrado),
          d.caja.turnoActual ? 'Desde las ' + hora(d.caja.turnoActual.apertura) + ' · ' + plata(online) + ' se pagó online' : 'La caja está cerrada', 'plata', '#/caja', 'Ver la caja') +
      '</div>' +
      bloque('Agenda de hoy', agenda.length, listaAgenda(agenda), null, 'hoy') +
      '<div class="columnas">' +
        bloque('Cómo está el parking', null, ocupacion('Techado', dTech, capT) + ocupacion('Predio', dentro.length - dTech, capA), '#/lugares', 'autos') +
        bloque('Próximos traslados', trasPend.length, listaTraslados(trasPend.slice(0, 4)), '#/traslados', 'autos') +
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
    if (!lista.length) return '<p class="vacio">Hoy no hay entradas ni salidas.</p>';
    return '<ul class="agenda">' + lista.map(function (x) {
      var r = x.r, llega = x.tipo === 'llega', accion;
      if (llega) accion = r.estado === 'confirmada' ? '<a class="btn btn--chico btn--primario" href="#/llegada?c=' + r.codigo + '">Registrar entrada</a>' : '<span class="estado estado--bien">' + ico('circle-check') + 'Ya entró</span>';
      else accion = r.estado === 'en_predio' ? '<a class="btn btn--chico btn--primario" href="#/retiros?c=' + r.codigo + '">Registrar salida</a>' : '<span class="estado estado--neutro">' + ico('circle-check') + 'Ya se fue</span>';
      var debe = llega && r.estado === 'confirmada' && r.pago.estado !== 'pagado';
      return '<li class="agenda__fila" data-abrir-reserva="' + r.id + '">' +
        '<span class="agenda__hora">' + hora(x.hora) + '</span>' +
        '<span class="agenda__texto"><span class="tag tag--' + x.tipo + '">' + ico('car-front') + (llega ? 'Entrada' : 'Salida') + '</span>' +
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
  var FILTROS = [['proximas', 'Próximas'], ['hoy', 'Entradas hoy'], ['predio', 'En el parking'], ['pago', 'Sin pagar'], ['finalizadas', 'Finalizadas'], ['canceladas', 'Canceladas'], ['todas', 'Todas']];
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
    return '<div class="tabla-caja"><table class="tabla"><thead><tr><th>Código</th><th>Cliente</th><th>Matrícula</th><th>Entrada</th><th>Salida</th><th>Lugar</th><th>Total</th><th>Pago</th><th>Estado</th></tr></thead><tbody>' +
      lista.map(function (r) {
        return '<tr data-abrir-reserva="' + r.id + '" tabindex="0">' +
          '<td data-et="Código"><strong>' + r.codigo + '</strong><small>' + ORIGEN[r.origen] + '</small></td>' +
          '<td data-et="Cliente">' + esc(r.cliente.nombre) + '<small>' + esc(r.cliente.telefono) + '</small></td>' +
          '<td data-et="Matrícula"><span class="matricula">' + esc(r.vehiculo.matricula) + '</span></td>' +
          '<td data-et="Entrada">' + fechaHora(r.entrada) + '</td>' +
          '<td data-et="Salida">' + fechaHora(r.salida) + '</td>' +
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
    if (r.estado === 'confirmada' && puede('llegada')) acciones += '<a class="btn btn--primario" href="#/llegada?c=' + r.codigo + '" data-cerrar-ventana>' + ico('car-front') + 'Registrar entrada</a>';
    if (r.estado === 'en_predio' && puede('retiros')) acciones += '<a class="btn btn--primario" href="#/retiros?c=' + r.codigo + '" data-cerrar-ventana>' + ico('car-front') + 'Registrar salida</a>';
    if (r.factura) acciones += '<button class="btn btn--linea" type="button" data-ver-factura="' + r.factura + '">' + ico('file-text') + 'Ver factura</button>';
    acciones += '<a class="btn btn--linea" href="' + wa + '" target="_blank" rel="noopener"><svg class="ico-marca" aria-hidden="true"><use href="#i-whatsapp"/></svg>WhatsApp</a>';
    if (r.estado === 'confirmada' && puede('reservas')) acciones += '<button class="btn btn--linea btn--peligro" type="button" data-cancelar="' + r.id + '">' + ico('x') + 'Cancelar reserva</button>';
    abrirVentana(
      '<p class="antetitulo">' + ORIGEN[r.origen] + ' · creada ' + fechaHora(r.creada) + '</p>' +
      '<h2 class="ventana__titulo">' + r.codigo + ' <span class="matricula">' + esc(r.vehiculo.matricula) + '</span></h2>' +
      '<p class="ventana__estados">' + badgeEstado(r) + badgePago(r) + '</p>' +
      '<dl class="ficha">' +
        fila('Cliente', esc(r.cliente.nombre) + ' · ' + esc(r.cliente.telefono) + (r.cliente.email ? ' · ' + esc(r.cliente.email) : '')) +
        fila('Auto', esc(r.vehiculo.modelo) + (r.vehiculo.color ? ' · ' + esc(r.vehiculo.color) : '')) +
        fila('Entrada', fechaHora(r.entrada) + (r.vuelo.ida ? ' · vuelo ' + esc(r.vuelo.ida) : '') + (r.checkin ? '<small>Entró el ' + fechaHora(r.checkin) + '</small>' : '')) +
        fila('Salida', fechaHora(r.salida) + (r.vuelo.vuelta ? ' · vuelo ' + esc(r.vuelo.vuelta) : '') + (r.checkout ? '<small>Salió el ' + fechaHora(r.checkout) + '</small>' : '')) +
        fila('Lugar', TIPO[r.lugarTipo] + (r.lugar ? ' · ' + r.lugar : ' · se asigna en la entrada') + ' · ' + (r.servicio === 'valet' ? 'Valet Parking' : 'Con traslado (' + r.pasajeros + ' pasajeros)')) +
        fila('Importe', plata(r.total) + ' · ' + p.dias + ' días' + (r.pago.monto > 0 ? '<small>Pagó ' + plata(r.pago.monto) + ' ' + medioTexto(r) + (r.pago.monto < r.total ? ' · falta ' + plata(r.total - r.pago.monto) : '') + '</small>' : '<small>Todavía no pagó</small>')) +
      '</dl><div class="ventana__acciones">' + acciones + '</div>', 'ancha');
  }
  function fila(k, v) { return '<div><dt>' + k + '</dt><dd>' + v + '</dd></div>'; }

  /* Nueva reserva desde el mostrador o por WhatsApp */
  function formReserva() {
    var t = D().tarifas;
    var man = new Date(Date.now() + PD.DIA);
    var caja = abrirVentana(
      '<h2 class="ventana__titulo">Nueva reserva</h2><form class="formulario" data-form-nueva novalidate>' +
      '<div class="formulario__fila"><label class="campo"><span>Origen</span><select name="origen"><option value="whatsapp">WhatsApp</option><option value="mostrador">Mostrador</option><option value="telefono">Teléfono</option></select></label>' +
      '<label class="campo"><span>Lugar</span><select name="lugarTipo"><option value="techado">Techado · ' + plata(t.techado) + '/día</option><option value="aire">Predio · ' + plata(t.aire) + '/día</option></select></label></div>' +
      '<div class="formulario__fila"><label class="campo"><span>Entrada</span><input type="datetime-local" name="entrada" value="' + local(man.setHours(6, 0, 0, 0)) + '" required></label>' +
      '<label class="campo"><span>Salida</span><input type="datetime-local" name="salida" value="' + local(new Date(man.getTime() + 7 * PD.DIA).setHours(18, 0, 0, 0)) + '" required></label></div>' +
      '<div class="formulario__fila"><label class="campo"><span>Matrícula</span><input name="matricula" required></label><label class="campo"><span>Marca y modelo</span><input name="modelo"></label></div>' +
      '<div class="formulario__fila"><label class="campo"><span>Nombre</span><input name="nombre" required></label><label class="campo"><span>Teléfono</span><input name="telefono" type="tel" required></label></div>' +
      '<div class="formulario__fila"><label class="campo"><span>Servicio</span><select name="servicio"><option value="traslado">Con traslado</option><option value="valet">Valet (+' + plata(t.valet) + ')</option></select></label><label class="campo"><span>Pasajeros</span><input name="pasajeros" type="number" min="1" max="8" value="2"></label></div>' +
      '<p class="total-linea">Total <strong data-total-nueva></strong><small data-dias-nueva></small></p>' +
      '<fieldset class="factura-campos"><legend>' + ico('landmark') + 'Pago</legend>' +
        '<div class="eleccion"><label><input type="radio" name="pagoNueva" value="no" checked><span>Todavía no pagó<small>Paga al entrar</small></span></label>' +
        '<label><input type="radio" name="pagoNueva" value="transferencia"><span>Ya pagó por transferencia<small>Queda listo para la entrada</small></span></label></div>' +
        '<div class="formulario__fila" data-campos-transf hidden><label class="campo"><span>Monto transferido</span><input name="montoTransf" type="number" min="1" data-monto-nueva></label>' +
        '<label class="campo"><span>Nº de operación <em>(opcional)</em></span><input name="refTransf" autocomplete="off"></label></div>' +
      '</fieldset>' +
      '<p class="campo-error" data-error-nueva hidden></p>' +
      '<div class="ventana__acciones"><button class="btn btn--primario" type="submit">' + ico('check') + 'Guardar reserva</button></div></form>', 'ancha');
    var fn = $('[data-form-nueva]', caja), montoTocado = false;
    function totalNueva() {
      var p = PD.precio({ entrada: fn.entrada.value, salida: fn.salida.value, lugarTipo: fn.lugarTipo.value, servicio: fn.servicio.value });
      $('[data-total-nueva]', caja).textContent = plata(p.total);
      $('[data-dias-nueva]', caja).textContent = p.dias + (p.dias === 1 ? ' día' : ' días');
      if (!montoTocado) fn.montoTransf.value = p.total;
    }
    fn.addEventListener('input', function (e) { if (e.target === fn.montoTransf) montoTocado = true; totalNueva(); });
    fn.addEventListener('change', function (e) {
      if (e.target.name === 'pagoNueva') $('[data-campos-transf]', caja).hidden = e.target.value !== 'transferencia';
      totalNueva();
    });
    totalNueva();
    $('[data-form-nueva]', caja).addEventListener('submit', async function (e) {
      e.preventDefault();
      var f = e.target, err = $('[data-error-nueva]', caja);
      var ent = new Date(f.entrada.value), sal = new Date(f.salida.value);
      err.hidden = true;
      if (!f.matricula.value.trim() || !f.nombre.value.trim() || !f.telefono.value.trim()) { err.textContent = 'Completá matrícula, nombre y teléfono.'; err.hidden = false; return; }
      if (!(sal > ent)) { err.textContent = 'La salida tiene que ser después de la entrada.'; err.hidden = false; return; }
      var transf = f.pagoNueva.value === 'transferencia' ? (+f.montoTransf.value || 0) : 0;
      if (f.pagoNueva.value === 'transferencia' && !(transf > 0)) { err.textContent = 'Escribí cuánto transfirió.'; err.hidden = false; return; }
      var res = await ejecutar(f.querySelector('[type=submit]'), async function () {
        var r = await PD.crearReserva({
          origen: f.origen.value, lugar_tipo: f.lugarTipo.value, servicio: f.servicio.value, pasajeros: +f.pasajeros.value || 1,
          entrada: ent.toISOString(), salida: sal.toISOString(),
          nombre: f.nombre.value.trim(), telefono: f.telefono.value.trim(), matricula: f.matricula.value.trim(), modelo: f.modelo.value.trim()
        });
        var monto = transf > 0 ? Math.min(transf, r.total) : 0;
        if (monto > 0) await PD.registrarPago(r.id, monto, 'transferencia', f.refTransf.value.trim());
        return { r: r, monto: monto };
      }, err);
      if (res === FALLO) return;
      cerrarVentana(); avisar('Reserva ' + res.r.codigo + ' guardada' + (res.monto > 0 ? ' con ' + plata(res.monto) + ' por transferencia' : '')); pintar();
    });
  }
  function local(ms) { var d = new Date(ms); return d.getFullYear() + '-' + PD.pad(d.getMonth() + 1) + '-' + PD.pad(d.getDate()) + 'T' + PD.pad(d.getHours()) + ':' + PD.pad(d.getMinutes()); }

  /* ---------- REGISTRAR LLEGADA ---------- */
  V.llegada = function (q) {
    var ahora = Date.now();
    var pendientes = D().reservas.filter(function (r) { return r.estado === 'confirmada' && new Date(r.entrada) - ahora < 1.5 * PD.DIA; }).sort(porFecha('entrada'));
    var elegida = q.c ? D().reservas.filter(function (r) { return r.codigo === q.c && r.estado === 'confirmada'; })[0] : null;
    var ficha = '<section class="bloque bloque--ficha" data-panel-llegada>' + (elegida ? panelLlegada(elegida) : '<p class="vacio vacio--grande">' + ico('log-in') + 'Elegí una reserva para registrar la entrada.</p>') + '</section>';
    /* Con una reserva elegida, en celular la ficha va primero (en escritorio queda a la derecha) */
    return '<div class="columnas columnas--llegada">' + (elegida ? ficha : '') +
      '<section class="bloque"><header class="bloque__cabeza"><h2>Buscar la reserva</h2></header>' +
        '<label class="buscador buscador--grande">' + ico('scan-line') + '<input type="search" placeholder="Código o matrícula" data-buscar-llegada autofocus></label>' +
        '<p class="ayuda">Escaneá el código del comprobante o escribí parte de la matrícula.</p>' +
        '<ul class="mini" data-lista-llegada>' + listaLlegada(pendientes) + '</ul>' +
        '<button class="btn btn--linea" type="button" data-sin-reserva>' + ico('plus') + 'Entra sin reserva</button>' +
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
  /* El pago es siempre al entrar. Si pagó por transferencia antes de llegar, se registra acá
     («¿Ya pagó por transferencia?») y al llegar solo se cobra lo que falte. Al registrar la entrada se emite la factura. */
  function panelLlegada(r) {
    var libres = PD.lugaresLibres(r.lugarTipo);
    var saldo = Math.max(0, r.total - (r.pago.monto || 0));
    var E = D().empresa;
    var pagado = r.pago.monto > 0 ? '<p class="ok">' + ico('circle-check') + '<span>' + (saldo > 0 ? 'Ya pagó ' : 'Pagó ') + plata(r.pago.monto) + ' ' + medioTexto(r) +
      (saldo > 0 ? '. Falta cobrar <strong>' + plata(saldo) + '</strong>.' : '. No hay nada que cobrar.') + '</span></p>' : '';
    return '<header class="bloque__cabeza"><h2>Entrada · <span class="matricula">' + esc(r.vehiculo.matricula) + '</span></h2><span class="estado estado--info">' + r.codigo + '</span></header>' +
      '<dl class="ficha">' + fila('Cliente', esc(r.cliente.nombre) + ' · ' + esc(r.cliente.telefono)) + fila('Auto', esc(r.vehiculo.modelo) + ' ' + esc(r.vehiculo.color)) +
        fila('Salida', fechaHora(r.salida) + (r.vuelo.vuelta ? ' · vuelo ' + esc(r.vuelo.vuelta) : '')) + fila('Servicio', r.servicio === 'valet' ? 'Valet Parking' : 'Con traslado · ' + r.pasajeros + ' pasajeros') +
        fila('Total de la reserva', plata(r.total) + ' · ' + PD.precio(r).dias + ' días') + '</dl>' +
      pagado +
      (saldo > 0 ? '<details class="transferencia"><summary>' + ico('landmark') + '<span><strong>¿Ya pagó por transferencia?</strong><small>Registralo antes de que llegue: queda listo para la entrada.</small></span></summary>' +
        '<div class="transferencia__cuerpo"><div class="formulario__fila"><label class="campo"><span>Monto transferido</span><input name="montoTransf" type="number" min="1" value="' + saldo + '" data-monto-transf></label>' +
        '<label class="campo"><span>Nº de operación <em>(opcional)</em></span><input name="refTransf" autocomplete="off" data-ref-transf></label></div>' +
        '<button type="button" class="btn btn--linea" data-guardar-transferencia="' + r.id + '">' + ico('check') + 'Guardar transferencia</button></div></details>' : '') +
      '<form class="formulario" data-form-llegada data-id="' + r.id + '" data-saldo="' + saldo + '">' +
        (saldo > 0 ? '<div class="total-grande"><p>A cobrar ahora</p><strong>' + plata(saldo) + '</strong><small>Se paga al entrar</small></div>' +
          '<div class="formulario__fila"><label class="campo"><span>Medio de pago</span><select name="medio" required><option value="efectivo">Efectivo</option><option value="tarjeta">Tarjeta (POS)</option><option value="transferencia">Transferencia</option></select></label>' +
          '<label class="campo"><span>Recibido <em>(efectivo)</em></span><input name="recibido" type="number" min="0" placeholder="' + saldo + '" data-recibido></label></div>' +
          '<p class="vuelto" data-vuelto hidden></p>' : '') +
        '<fieldset class="factura-campos"><legend>' + ico('file-text') + 'Factura</legend>' +
          '<div class="eleccion"><label><input type="radio" name="tipoFactura" value="eticket" checked><span>e-Ticket<small>Consumidor final</small></span></label>' +
          '<label><input type="radio" name="tipoFactura" value="efactura"><span>e-Factura<small>Empresa, con RUT</small></span></label></div>' +
          '<div class="formulario__fila" data-campos-rut hidden><label class="campo"><span>RUT del cliente</span><input name="rut" inputmode="numeric" maxlength="12" placeholder="12 dígitos"></label>' +
          '<label class="campo"><span>Razón social</span><input name="razon"></label></div>' +
          (E.rut ? '' : '<p class="ayuda">Falta cargar el RUT del parking en Precios → Datos para la factura.</p>') +
        '</fieldset>' +
        '<label class="campo"><span>Lugar (' + TIPO[r.lugarTipo] + ' · ' + libres.length + ' libres)</span><select name="lugar">' + libres.map(function (l, i) { return '<option' + (i === 0 ? ' selected' : '') + '>' + l.id + '</option>'; }).join('') + '</select></label>' +
        '<label class="campo"><span>Notas del auto <em>(rayones, objetos, llaves)</em></span><input name="notas" placeholder="Opcional"></label>' +
        '<p class="campo-error" data-error-llegada hidden></p>' +
        '<div class="ventana__acciones"><button class="btn btn--primario" type="submit">' + ico('check') + (saldo > 0 ? 'Cobrar ' + plata(saldo) + ', facturar y registrar entrada' : 'Facturar y registrar entrada') + '</button></div>' +
      '</form>';
  }
  /* «por transferencia el 06/10 · op. 1234» o «online» */
  function medioTexto(r) {
    var ps = r.pagos && r.pagos.length ? r.pagos : [{ medio: r.pago.medio, fecha: r.pago.fecha, ref: r.pago.ref }];
    return ps.map(function (x) {
      return (x.medio === 'online' ? 'online' : x.medio === 'transferencia' ? 'por transferencia' : x.medio === 'tarjeta' ? 'con tarjeta' : 'en efectivo') +
        (x.fecha ? ' el ' + fechaCorta(x.fecha) : '') + (x.ref && x.medio === 'transferencia' ? ' · op. ' + esc(x.ref) : '');
    }).join(' y ');
  }
  async function registrarLlegada(id, f) {
    var r = D().reservas.filter(function (x) { return x.id === id; })[0];
    var err = $('[data-error-llegada]');
    if (!r || !f.lugar.value) { avisar('No quedan lugares libres de ese tipo', 'alerta'); return; }
    var tipo = f.tipoFactura.value, rut = f.rut.value.replace(/\D/g, ''), razon = f.razon.value.trim();
    if (tipo === 'efactura' && (rut.length !== 12 || !razon)) { err.textContent = 'Para la e-Factura completá el RUT (12 dígitos) y la razón social.'; err.hidden = false; return; }
    var res = await ejecutar(f.querySelector('[type=submit]'), function () {
      return PD.registrarEntrada(id, { lugar: f.lugar.value, notas: f.notas.value.trim(), medio: f.medio ? f.medio.value : null, tipoFactura: tipo, rut: rut, razon: razon });
    }, err);
    if (res === FALLO) return;
    var rr = D().reservas.filter(function (x) { return x.id === id; })[0];
    var fac = D().facturas.filter(function (x) { return x.id === res.factura; })[0];
    avisar('Entrada registrada y ' + (res.tipo === 'efactura' ? 'e-Factura' : 'e-Ticket') + ' A-' + PD.pad4(res.numero) + ' emitido');
    location.hash = '#/llegada';
    pintar();
    if (rr) ticket(rr, 'entrada', fac);
  }
  async function guardarTransferencia(id, boton) {
    var caja = boton.closest('.transferencia');
    var monto = +$('[data-monto-transf]', caja).value, ref = $('[data-ref-transf]', caja).value.trim();
    if (!(monto > 0)) { avisar('Escribí cuánto transfirió', 'alerta'); return; }
    var r = D().reservas.filter(function (x) { return x.id === id; })[0];
    var res = await ejecutar(boton, function () { return PD.registrarPago(id, monto, 'transferencia', ref); });
    if (res === FALLO) return;
    avisar('Transferencia de ' + plata(monto) + ' registrada en ' + (r ? r.codigo : 'la reserva'));
    pintar();
  }

  /* Factura: e-Ticket o e-Factura. Los importes incluyen IVA. */
  function verFactura(f) {
    var E = D().empresa;
    var neto = Math.round(f.total / (1 + f.iva / 100)), iva = f.total - neto;
    var r = D().reservas.filter(function (x) { return x.id === f.reservaId; })[0];
    var caja = abrirVentana(
      '<div class="factura">' +
        '<header class="factura__cabeza"><svg class="factura__logo" viewBox="0 0 954.77 130.0" aria-hidden="true"><use href="#logo-h"/></svg>' +
          '<div class="factura__id"><p class="factura__tipo">' + (f.tipo === 'efactura' ? 'e-Factura' : 'e-Ticket') + '</p><p>Serie ' + f.serie + ' · Nº ' + PD.pad4(f.numero) + '</p><p>' + fechaHora(f.fecha) + '</p></div></header>' +
        '<div class="factura__partes"><div><p class="factura__rotulo">Emisor</p><p><strong>' + esc(E.razon) + '</strong></p><p>RUT ' + (E.rut ? esc(E.rut) : '—') + '</p><p>' + esc(E.direccion) + '</p></div>' +
          '<div><p class="factura__rotulo">Cliente</p>' + (f.tipo === 'efactura' ? '<p><strong>' + esc(f.cliente.razon) + '</strong></p><p>RUT ' + esc(f.cliente.rut) + '</p>' : '<p><strong>' + esc(f.cliente.nombre) + '</strong></p><p>Consumidor final</p>') + '</div></div>' +
        '<table class="factura__detalle"><thead><tr><th>Detalle</th><th class="num">Importe</th></tr></thead><tbody>' +
          f.lineas.map(function (l) { return '<tr><td>' + esc(l.concepto) + '</td><td class="num">' + plata(l.monto) + '</td></tr>'; }).join('') + '</tbody></table>' +
        '<dl class="factura__totales"><div><dt>Subtotal sin IVA</dt><dd>' + plata(neto) + '</dd></div><div><dt>IVA ' + f.iva + '%</dt><dd>' + plata(iva) + '</dd></div><div class="factura__total"><dt>Total</dt><dd>' + plata(f.total) + '</dd></div></dl>' +
        '<p class="factura__pie">Reserva ' + f.codigo + (r ? ' · ' + esc(r.vehiculo.matricula) + ' · pagado ' + medioTexto(r) : '') + '</p>' +
      '</div>' +
      '<div class="ventana__acciones"><button class="btn btn--primario" type="button" data-imprimir>' + ico('printer') + 'Imprimir factura</button>' +
        (r && r.estado === 'en_predio' ? '<button class="btn btn--linea" type="button" data-ver-ticket="' + r.id + '">' + ico('receipt') + 'Comprobante del auto</button>' : '') +
        '<button class="btn btn--linea" type="button" data-cerrar-ventana>Listo</button></div>', 'ancha');
    $('[data-imprimir]', caja).addEventListener('click', function () { window.print(); });
  }
  function sinReserva() {
    formReserva();
    $('[name="origen"]').value = 'mostrador';
    var e = $('[name="entrada"]'); e.value = local(Date.now());
  }

  /* Comprobante imprimible con código de barras */
  function ticket(r, tipo, fac) {
    fac = fac || (r.factura && D().facturas.filter(function (x) { return x.id === r.factura; })[0]);
    var p = PD.precio(r);
    var caja = abrirVentana(
      '<div class="ticket" id="ticket"><svg class="ticket__logo" viewBox="0 0 822.78 263.63" aria-hidden="true"><use href="#logo-v"/></svg>' +
      '<p class="ticket__dir">Av. Wilson Ferreira Aldunate 5536 · Paso de Carrasco<br>WhatsApp 099 114 144 · abierto 24 h</p>' +
      '<p class="ticket__tipo">' + (tipo === 'salida' ? 'Comprobante de salida' : 'Comprobante de entrada') + '</p>' +
      '<p class="ticket__matricula">' + esc(r.vehiculo.matricula) + '</p>' +
      '<dl>' + fila('Reserva', r.codigo) + fila('Lugar', r.lugar + ' · ' + TIPO[r.lugarTipo]) + fila('Entrada', fechaHora(r.checkin)) +
        (tipo === 'salida' ? fila('Salida', fechaHora(r.checkout)) : fila('Salida prevista', fechaHora(r.salida)) + fila('Estadía', p.dias + ' días')) +
        fila('Pagado', plata(r.pago.monto) + (r.pago.medio ? ' · ' + MEDIOS[r.pago.medio] : '')) + '</dl>' +
      '<svg class="ticket__barras" data-barras></svg>' +
      '<p class="ticket__pie">Presentá este comprobante para retirar el auto.<br>Atendió: ' + esc(nombreUsuario()) + '</p></div>' +
      '<div class="ventana__acciones"><button class="btn btn--primario" type="button" data-imprimir>' + ico('printer') + 'Imprimir</button>' +
        (fac ? '<button class="btn btn--linea" type="button" data-ver-factura="' + fac.id + '">' + ico('file-text') + 'Ver factura</button>' : '') +
        '<button class="btn btn--linea" type="button" data-cerrar-ventana>Listo</button></div>', 'ticket');
    try { JsBarcode($('[data-barras]', caja), r.codigo.replace('-', ''), { format: 'CODE128', height: 56, displayValue: true, fontSize: 14, margin: 0, lineColor: '#053f5c' }); } catch (e) { /* sin librería: queda el código en texto */ }
    $('[data-imprimir]', caja).addEventListener('click', function () { window.print(); });
  }

  /* ---------- RETIROS Y COBRO ---------- */
  V.retiros = function (q) {
    var dentro = D().reservas.filter(function (r) { return r.estado === 'en_predio'; }).sort(porFecha('salida'));
    var busca = (q.b || '').toLowerCase();
    if (busca) dentro = dentro.filter(function (r) { return (r.codigo + r.vehiculo.matricula + r.cliente.nombre).toLowerCase().indexOf(busca) >= 0; });
    var elegida = q.c ? D().reservas.filter(function (r) { return r.codigo === q.c && r.estado === 'en_predio'; })[0] : null;
    var ficha = '<section class="bloque bloque--ficha" data-panel-retiro>' + (elegida ? panelRetiro(elegida) : '<p class="vacio vacio--grande">' + ico('receipt') + 'Elegí un auto para registrar la salida.</p>') + '</section>';
    return '<div class="columnas columnas--llegada">' + (elegida ? ficha : '') +
      '<section class="bloque"><header class="bloque__cabeza"><h2>Autos en el parking <span class="cuenta">' + dentro.length + '</span></h2></header>' +
        '<label class="buscador">' + ico('scan-line') + '<input type="search" placeholder="Código o matrícula" value="' + esc(q.b || '') + '" data-buscar="retiros"></label>' +
        '<ul class="mini">' + (dentro.length ? dentro.slice(0, 40).map(function (r) {
          var hoy = mismoDia(r.salida, Date.now());
          return '<li class="mini__fila' + (elegida && elegida.id === r.id ? ' es-elegida' : '') + '" data-elegir-retiro="' + r.codigo + '"><span class="mini__hora' + (hoy ? ' es-hoy' : '') + '">' + (hoy ? hora(r.salida) : fechaCorta(r.salida)) + '<small>' + (hoy ? 'hoy' : hora(r.salida)) + '</small></span>' +
            '<span class="mini__texto"><strong>' + esc(r.vehiculo.matricula) + '</strong> · ' + esc(r.cliente.nombre) + '<small>' + r.lugar + ' · ' + TIPO[r.lugarTipo] + (r.vuelo.vuelta ? ' · vuelo ' + esc(r.vuelo.vuelta) : '') + '</small></span>' +
            '</li>';
        }).join('') : '<li class="vacio">No hay autos con ese dato.</li>') + '</ul>' +
      '</section>' +
      (elegida ? '' : ficha) +
    '</div>';
  };
  /* La salida no tiene cobro (se pagó al entrar). Solo si se quedó más días de lo reservado aparece la diferencia, opcional. */
  function panelRetiro(r) {
    var ahora = new Date();
    var real = PD.precio({ entrada: r.checkin || r.entrada, salida: ahora, lugarTipo: r.lugarTipo, servicio: r.servicio });
    var dif = Math.max(0, real.total - r.total);
    return '<header class="bloque__cabeza"><h2>Salida · <span class="matricula">' + esc(r.vehiculo.matricula) + '</span></h2><span class="estado estado--info">Lugar ' + r.lugar + '</span></header>' +
      '<p class="ok">' + ico('circle-check') + 'Pagó ' + plata(r.pago.monto) + (r.pago.medio ? ' (' + MEDIOS[r.pago.medio] + ')' : '') + ' al entrar. No hay nada que cobrar.</p>' +
      '<dl class="ficha">' + fila('Cliente', esc(r.cliente.nombre) + ' · ' + esc(r.cliente.telefono)) + fila('Entrada', fechaHora(r.checkin)) + fila('Salida', fechaHora(ahora) + ' · ' + real.dias + (real.dias === 1 ? ' día' : ' días')) +
        (r.notas ? fila('Notas de la entrada', esc(r.notas)) : '') + '</dl>' +
      '<form class="formulario" data-form-retiro data-id="' + r.id + '" data-dif="' + dif + '">' +
        (dif > 0 ? '<div class="cobro-breve"><p>' + ico('triangle-alert') + '<span>Se quedó más de lo reservado: <strong>' + plata(dif) + '</strong> de diferencia.</span></p>' +
          '<label class="campo"><span>¿Cobrar la diferencia?</span><select name="medio"><option value="">No cobrar</option><option value="efectivo">Efectivo</option><option value="tarjeta">Tarjeta (POS)</option><option value="transferencia">Transferencia</option></select></label></div>' : '') +
        '<label class="check"><input type="checkbox" name="llaves" required> Entregué las llaves y el cliente revisó el auto</label>' +
        '<div class="ventana__acciones"><button class="btn btn--primario" type="submit">' + ico('check') + 'Registrar salida y liberar lugar</button></div>' +
      '</form>';
  }
  async function registrarRetiro(id, f) {
    if (!f.llaves.checked) { avisar('Confirmá la entrega de llaves', 'alerta'); return; }
    var res = await ejecutar(f.querySelector('[type=submit]'), function () { return PD.registrarSalida(id, f.medio ? f.medio.value : ''); });
    if (res === FALLO) return;
    var rr = D().reservas.filter(function (x) { return x.id === id; })[0];
    avisar('Salida registrada: ' + (res.lugar || 'el lugar') + ' quedó libre' + (res.diferencia ? ' · cobró ' + plata(res.diferencia) + ' de diferencia' : ''));
    location.hash = '#/retiros';
    pintar();
    if (rr) ticket(rr, 'salida');
  }

  /* ---------- TRASLADOS ---------- */
  /* Dos listas con el mismo color que Entrada y Salida:
     Llevar al aeropuerto (menta) — sale ~15 min después de que el cliente deja el auto.
     Buscar en el aeropuerto (ámbar) — ~25 min después del aterrizaje, en Arribos. */
  V.traslados = function (q) {
    q = q || {};
    var dia = q.d === 'manana' ? Date.now() + PD.DIA : Date.now();
    var lista = trasladosDe(dia);
    var llevar = lista.filter(function (t) { return t.tipo === 'ida'; }), buscar = lista.filter(function (t) { return t.tipo === 'vuelta'; });
    var pend = function (l) { return l.filter(function (t) { return t.estado !== 'hecho'; }); };
    /* Primero el que está en curso; si no hay, el próximo pendiente */
    var proximo = lista.filter(function (t) { return t.estado === 'en_camino'; })[0] || pend(lista).filter(function (t) { return t.hora >= Date.now() - 30 * 60000; })[0];
    return '<div class="herramientas"><div class="chips"><a class="chip' + (q.d !== 'manana' ? ' es-activo' : '') + '" href="#/traslados">Hoy</a><a class="chip' + (q.d === 'manana' ? ' es-activo' : '') + '" href="#/traslados?d=manana">Mañana</a></div></div>' +
      (proximo ? '<div class="proximo" data-sector="' + (proximo.tipo === 'ida' ? 'entrada' : 'salida') + '"><p class="proximo__rotulo">' + (proximo.estado === 'en_camino' ? 'En curso' : 'Próximo traslado') + '</p>' +
        '<p class="proximo__texto"><strong>' + hora(proximo.hora) + '</strong> · ' + (proximo.tipo === 'ida' ? 'Llevar a ' : 'Buscar a ') + esc(proximo.r.cliente.nombre) +
        ' · ' + proximo.r.pasajeros + (proximo.r.pasajeros === 1 ? ' pasajero' : ' pasajeros') + (proximo.tipo === 'vuelta' && proximo.r.vuelo.vuelta ? ' · vuelo ' + esc(proximo.r.vuelo.vuelta) : '') + '</p></div>' : '') +
      '<div class="columnas">' +
        bloque(ico('plane-takeoff') + 'Llevar al aeropuerto', pend(llevar).length + ' de ' + llevar.length, listaViajes(llevar), null, 'entrada') +
        bloque(ico('plane-landing') + 'Buscar en el aeropuerto', pend(buscar).length + ' de ' + buscar.length, listaViajes(buscar), null, 'salida') +
      '</div>';
  };
  var PASOS_TRASLADO = { pendiente: 'en_camino', en_camino: 'hecho', hecho: 'pendiente' };
  var TXT_TRASLADO = { pendiente: 'Pendiente', en_camino: 'En camino', hecho: 'Hecho' };
  var BOTON_TRASLADO = {
    ida: { pendiente: 'Salimos al aeropuerto', en_camino: 'Ya lo dejé en la terminal' },
    vuelta: { pendiente: 'Voy a buscarlo', en_camino: 'Ya está en el parking' }
  };
  function telefono(r) { return r.cliente.telefono.replace(/\D/g, '').replace(/^0/, ''); }
  /* Cada viaje con lo que el chofer necesita: hora, quién, cuántos, vuelo, dónde, auto y cómo contactarlo */
  function listaViajes(lista) {
    if (!lista.length) return '<p class="vacio">No hay traslados.</p>';
    return '<ul class="viajes">' + lista.map(function (t) {
      var r = t.r, ida = t.tipo === 'ida';
      var mensaje = ida ? 'Hola ' + r.cliente.nombre.split(' ')[0] + ', soy el chofer de Parking Despegar. En un momento salimos hacia la terminal.'
        : 'Hola ' + r.cliente.nombre.split(' ')[0] + ', soy el chofer de Parking Despegar. Te espero en Arribos' + (r.vuelo.vuelta ? ' cuando aterrice el vuelo ' + r.vuelo.vuelta : '') + '.';
      var datos = ida ? [
          [r.estado === 'confirmada' ? 'clock' : 'circle-check', r.estado === 'confirmada' ? 'Llega al parking a las ' + hora(r.entrada) : 'Ya dejó el auto' + (r.lugar ? ' en ' + r.lugar : '')],
          ['plane-takeoff', r.vuelo.ida ? 'Vuelo ' + esc(r.vuelo.ida) : 'Sin número de vuelo'],
          ['map-pin', 'Dejarlo en Partidas'],
          ['phone', esc(r.cliente.telefono)]
        ] : [
          ['plane-landing', (r.vuelo.vuelta ? 'Vuelo ' + esc(r.vuelo.vuelta) + ' · ' : '') + 'aterriza ' + hora(r.salida)],
          ['map-pin', 'Esperarlo en Arribos'],
          ['car-front', esc(r.vehiculo.matricula) + (r.lugar ? ' · lugar ' + r.lugar : '') + ' · tenerlo a mano'],
          ['phone', esc(r.cliente.telefono)]
        ];
      return '<li class="viaje viaje--' + t.estado + '">' +
        '<div class="viaje__hora"><strong>' + hora(t.hora) + '</strong><small>' + (ida ? 'sale del parking' : 'salir a buscarlo') + '</small></div>' +
        '<div class="viaje__cuerpo">' +
          '<p class="viaje__nombre"><strong>' + esc(r.cliente.nombre) + '</strong><span class="viaje__pax">' + ico('users') + r.pasajeros + (r.pasajeros === 1 ? ' pasajero' : ' pasajeros') + '</span></p>' +
          '<ul class="viaje__datos">' + datos.map(function (x) { return '<li>' + ico(x[0]) + '<span>' + x[1] + '</span></li>'; }).join('') + '</ul>' +
          '<div class="viaje__contacto"><a class="btn btn--chico btn--linea" href="tel:+598' + telefono(r) + '">' + ico('phone') + 'Llamar</a>' +
            '<a class="btn btn--chico btn--linea" href="https://wa.me/598' + telefono(r) + '?text=' + encodeURIComponent(mensaje) + '" target="_blank" rel="noopener"><svg class="ico-marca" aria-hidden="true"><use href="#i-whatsapp"/></svg>WhatsApp</a></div>' +
        '</div>' +
        '<div class="viaje__accion">' + (t.estado === 'hecho'
          ? '<span class="estado estado--bien">' + ico('circle-check') + 'Hecho</span><button type="button" class="enlace-chico" data-traslado="' + r.id + '|' + t.tipo + '">Deshacer</button>'
          : (t.estado === 'en_camino' ? '<span class="estado estado--info">' + ico('bus') + 'En camino</span>' : '') +
            '<button type="button" class="btn btn--primario" data-traslado="' + r.id + '|' + t.tipo + '">' + ico('check') + BOTON_TRASLADO[t.tipo][t.estado] + '</button>') +
        '</div></li>';
    }).join('') + '</ul>';
  }
  /* Versión corta para Hoy */
  function listaTraslados(lista) {
    if (!lista.length) return '<p class="vacio">No hay traslados pendientes.</p>';
    return '<ul class="mini">' + lista.map(function (t) {
      var r = t.r, ida = t.tipo === 'ida';
      return '<li class="mini__fila"><span class="mini__hora">' + hora(t.hora) + '</span>' +
        '<span class="mini__texto"><span class="tag tag--' + (ida ? 'llega' : 'sale') + '">' + ico(ida ? 'plane-takeoff' : 'plane-landing') + (ida ? 'Llevar' : 'Buscar') + '</span>' +
        '<strong>' + esc(r.cliente.nombre) + '</strong> · ' + r.pasajeros + ' pas.' + (!ida && r.vuelo.vuelta ? '<small>Vuelo ' + esc(r.vuelo.vuelta) + ' · aterriza ' + hora(r.salida) + '</small>' : '') + '</span>' +
        (t.estado === 'en_camino' ? '<span class="mini__accion"><span class="estado estado--info">' + ico('bus') + 'En camino</span></span>' : '') + '</li>';
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
        (porLlegar ? '<span class="tag tag--llega">' + ico('car-front') + porLlegar + (porLlegar === 1 ? ' entrada' : ' entradas') + ' hoy</span>' : '') + '</header>' +
        '<div class="mapa-lugares">' + ls.map(function (l) {
          var r = ocup[l.id];
          if (!r) return '<div class="cajon cajon--libre"><strong>' + l.id + '</strong><small>Libre</small></div>';
          var dias = Math.max(1, Math.ceil((Date.now() - new Date(r.checkin)) / PD.DIA));
          var sale = mismoDia(r.salida, Date.now());
          return '<button type="button" class="cajon cajon--ocupado' + (sale ? ' cajon--sale' : '') + '" data-abrir-reserva="' + r.id + '"><strong>' + l.id + '</strong><span>' + esc(r.vehiculo.matricula) + '</span><small>' + (sale ? 'Salida ' + hora(r.salida) : dias + (dias === 1 ? ' día' : ' días')) + '</small></button>';
        }).join('') + '</div></section>';
    }
    return '<div class="leyenda"><span><i class="cajon-mini cajon--libre"></i>Libre</span><span><i class="cajon-mini cajon--ocupado"></i>Ocupado</span><span><i class="cajon-mini cajon--sale"></i>Salida hoy</span></div>' +
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
      '<div class="kpis">' + kpi('wallet', 'Base inicial', plata(t.base), 'efectivo al abrir') + kpi('circle-dollar-sign', 'Cobrado', plata(cobrado), (function (n) { return n + (n === 1 ? ' cobro' : ' cobros'); })(t.movimientos.filter(function (m) { return m.monto > 0; }).length)) +
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
    var porId = {}; d.reservas.forEach(function (r) { porId[r.id] = r; });
    var pagos = d.pagos.filter(function (p) { var f = new Date(p.fecha); return f >= R[0] && f < R[1]; });
    var hechas = d.reservas.filter(function (r) { return r.estado !== 'cancelada' && new Date(r.entrada) >= R[0] && new Date(r.entrada) < R[1]; });
    var total = pagos.reduce(function (s, p) { return s + p.monto; }, 0);
    var cobradas = {}; pagos.forEach(function (p) { cobradas[p.reserva_id] = 1; });
    var nCobradas = Object.keys(cobradas).length;
    var porDia = [], dias = Math.round((R[1] - R[0]) / PD.DIA);
    for (var i = 0; i < dias; i++) porDia.push({ dia: R[0] + i * PD.DIA, monto: 0, n: 0 });
    pagos.forEach(function (p) { var k = Math.floor((inicioDia(p.fecha) - R[0]) / PD.DIA); if (porDia[k]) { porDia[k].monto += p.monto; porDia[k].n++; } });
    var medios = {}, tipos = { techado: 0, aire: 0 }, origenes = { web: 0, whatsapp: 0, mostrador: 0, telefono: 0 };
    pagos.forEach(function (p) { medios[p.medio] = (medios[p.medio] || 0) + p.monto; var r = porId[p.reserva_id]; if (r) tipos[r.lugarTipo] += p.monto; });
    hechas.forEach(function (r) { origenes[r.origen] = (origenes[r.origen] || 0) + 1; });
    var estadia = hechas.length ? hechas.reduce(function (s, r) { return s + PD.dias(r.entrada, r.salida); }, 0) / hechas.length : 0;
    return '<div class="herramientas"><div class="chips">' + PERIODOS.map(function (x) { return '<a class="chip' + (x[0] === per ? ' es-activo' : '') + '" href="#/reportes?p=' + x[0] + '">' + x[1] + '</a>'; }).join('') + '</div>' +
        '<button class="btn btn--linea" type="button" data-exportar="' + per + '">' + ico('file-spreadsheet') + 'Exportar a Excel (CSV)</button>' +
        '<button class="btn btn--linea" type="button" data-imprimir-pagina>' + ico('printer') + 'Imprimir</button></div>' +
      '<p class="ayuda">Del ' + new Date(R[0]).toLocaleDateString('es-UY') + ' al ' + new Date(R[1] - 1).toLocaleDateString('es-UY') + '</p>' +
      '<div class="kpis">' + kpi('circle-dollar-sign', 'Recaudado', plata(total), pagos.length + (pagos.length === 1 ? ' cobro' : ' cobros'), true) + kpi('calendar-check', 'Reservas', hechas.length, 'que entran en el período') +
        kpi('timer', 'Estadía promedio', estadia.toFixed(1).replace('.', ',') + ' días', 'por reserva') + kpi('receipt', 'Ticket promedio', plata(nCobradas ? total / nCobradas : 0), 'por reserva cobrada') + '</div>' +
      bloque('Recaudado por día', null, graficoDias(porDia)) +
      '<div class="columnas">' +
        bloque('Por medio de pago', null, barrasH(Object.keys(medios).map(function (k) { return [MEDIOS[k], medios[k]]; }), true)) +
        bloque('Por tipo de lugar', null, barrasH([['Techado', tipos.techado], ['Predio', tipos.aire]], true)) +
      '</div>' +
      bloque('Cómo reservan', null, barrasH([['Web', origenes.web], ['WhatsApp', origenes.whatsapp], ['Mostrador', origenes.mostrador], ['Teléfono', origenes.telefono]], false));
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
    var filas = [['Código', 'Origen', 'Cliente', 'Teléfono', 'Matrícula', 'Modelo', 'Lugar', 'Tipo', 'Servicio', 'Entrada', 'Salida', 'Días', 'Total', 'Pagado', 'Medio', 'Estado']];
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
        '<div class="formulario__fila"><label class="campo"><span>Entrada</span><input type="datetime-local" name="entrada" value="' + local(Date.now()) + '"></label><label class="campo"><span>Salida</span><input type="datetime-local" name="salida" value="' + local(Date.now() + 3 * PD.DIA + 5 * 3600000) + '"></label></div>' +
        '</form><div class="total-grande" data-simulado></div>') +
    '</div>' +
      bloque('Datos para la factura', null, (D().empresa.rut ? '' : '<p class="aviso-tabla">' + ico('info') + 'Cargá el RUT del parking: sale en cada e-Ticket y e-Factura.</p>') +
        '<form class="formulario" data-form-empresa>' +
        '<div class="formulario__fila"><label class="campo"><span>Razón social</span><input name="razon" value="' + esc(D().empresa.razon) + '"></label><label class="campo"><span>RUT del parking</span><input name="rut" inputmode="numeric" maxlength="12" value="' + esc(D().empresa.rut) + '"></label></div>' +
        '<div class="formulario__fila"><label class="campo"><span>Dirección</span><input name="direccion" value="' + esc(D().empresa.direccion) + '"></label><label class="campo"><span>IVA (%)</span><input name="iva" type="number" min="0" max="30" value="' + D().empresa.iva + '"></label></div>' +
        '<div class="ventana__acciones"><button class="btn btn--primario" type="submit">' + ico('check') + 'Guardar datos</button></div></form>') +
      bloque('Lugares del parking', null, '<p class="aviso-tabla">' + ico('info') + 'Si sacás lugares, se sacan los últimos y tienen que estar vacíos.</p>' +
        '<form class="formulario" data-form-lugares>' +
        '<div class="formulario__fila"><label class="campo"><span>Lugares techados (zona A)</span><input name="techado" type="number" min="0" max="500" value="' + D().lugares.filter(function (l) { return l.tipo === 'techado'; }).length + '"></label>' +
        '<label class="campo"><span>Lugares en predio (zona B)</span><input name="aire" type="number" min="0" max="500" value="' + D().lugares.filter(function (l) { return l.tipo === 'aire'; }).length + '"></label></div>' +
        '<p class="campo-error" data-error-lugares hidden></p>' +
        '<div class="ventana__acciones"><button class="btn btn--primario" type="submit">' + ico('check') + 'Guardar lugares</button></div></form>');
  };
  function simular() {
    var f = $('[data-form-simulador]'); if (!f) return;
    var p = PD.precio({ entrada: f.entrada.value, salida: f.salida.value, lugarTipo: f.lugarTipo.value, servicio: f.servicio.value });
    var t = D().tarifas;
    $('[data-simulado]').innerHTML = '<p>Se cobraría</p><strong>' + plata(p.total) + '</strong><small>' + p.dias + ' días × ' + plata(f.lugarTipo.value === 'techado' ? t.techado : t.aire) + (p.extra ? ' + valet ' + plata(p.extra) : '') + ' · tolerancia de ' + t.graciaHoras + ' h</small>';
  }

  /* ---------- USUARIOS ---------- */
  var PUEDE_ROL = { admin: 'Todo, incluidos reportes, precios y equipo', personal: 'Reservas, entradas, salidas, traslados, caja y clientes', chofer: 'Solo traslados' };
  function selectorRol(u) {
    return '<select class="selector-rol" data-rol-usuario="' + u.id + '" aria-label="Rol de ' + esc(u.nombre) + '">' +
      ['personal', 'chofer', 'admin'].map(function (k) { return '<option value="' + k + '"' + (u.rol === k ? ' selected' : '') + '>' + ROLES[k] + '</option>'; }).join('') + '</select>';
  }
  V.usuarios = function () {
    var us = D().usuarios;
    var esperan = us.filter(function (u) { return !u.activo; });
    var link = location.origin + location.pathname;
    return '<div class="invitar"><p><strong>Para sumar a alguien:</strong> que entre a este link, toque «Crear cuenta» y elija su contraseña. Aparece acá abajo y vos le das acceso.</p>' +
        '<div class="invitar__link"><code>' + esc(link) + '</code><button type="button" class="btn btn--chico btn--linea" data-copiar="' + esc(link) + '">' + ico('copy') + 'Copiar link</button></div></div>' +
      (esperan.length ? bloque('Sin acceso', esperan.length, '<ul class="esperan">' + esperan.map(function (u) {
        return '<li class="espera-fila"><span class="espera-fila__quien"><strong>' + esc(u.nombre || '—') + '</strong><small>' + esc(u.email) + ' · se registró el ' + fechaHora(u.creado) + '</small></span>' +
          '<span class="espera-fila__accion">' + selectorRol(u) + '<button type="button" class="btn btn--chico btn--primario" data-dar-acceso="' + u.id + '">' + ico('check') + 'Dar acceso</button></span></li>';
      }).join('') + '</ul>', null, 'salida') : '') +
      bloque('Con acceso', us.length - esperan.length, '<div class="tabla-caja"><table class="tabla"><thead><tr><th>Nombre</th><th>Email</th><th>Rol</th><th>Puede</th><th></th></tr></thead><tbody>' +
        us.filter(function (u) { return u.activo; }).map(function (u) {
          var yo = u.id === usuario.id;
          return '<tr><td data-et="Nombre"><strong>' + esc(u.nombre) + '</strong>' + (yo ? '<small>Sos vos</small>' : '') + '</td><td data-et="Email">' + esc(u.email) + '</td>' +
            '<td data-et="Rol">' + (yo ? ROLES[u.rol] : selectorRol(u)) + '</td><td data-et="Puede">' + PUEDE_ROL[u.rol] + '</td>' +
            '<td>' + (yo ? '' : '<button type="button" class="btn btn--chico btn--linea btn--peligro" data-quitar-acceso="' + u.id + '">Quitar acceso</button>') + '</td></tr>';
        }).join('') + '</tbody></table></div>');
  };

  /* ---------- SISTEMA ---------- */
  V.sistema = function () {
    var d = D();
    return bloque('Respaldos', null, '<p class="texto">Los datos están en la base en línea, que guarda su propia copia. Además podés descargar una copia de todo (reservas, pagos, caja, facturas, precios y equipo) para tenerla en la computadora.</p>' +
        '<div class="ventana__acciones"><button class="btn btn--primario" type="button" data-respaldar>' + ico('download') + 'Descargar respaldo</button></div>') +
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
          return '<a class="lateral__link' + (s.id === actual ? ' es-activo' : '') + '" href="#/' + s.id + '"' + (s.color ? ' data-sector="' + s.color + '"' : '') + (s.id === actual ? ' aria-current="page"' : '') + '>' + ico(s.ico) + '<span>' + s.nombre + '</span>' + (n ? '<span class="lateral__cuenta">' + n + '</span>' : '') + '</a>';
        }).join('') + '</div>';
    }).join('');
  }
  /* Encabezado de cada pantalla: sector, título y para qué sirve */
  function cabecera(sec) {
    var nombreSector = SECTORES.filter(function (x) { return x.id === sec.sector; })[0].nombre;
    if (sec.id === 'panel') {
      var h = new Date().getHours();
      return '<header class="cabecera"><p class="cabecera__sector">' + esc(diaLargo(Date.now())) + '</p>' +
        '<h1 class="cabecera__titulo">' + (h < 6 ? 'Buenas noches' : h < 13 ? 'Buen día' : h < 20 ? 'Buenas tardes' : 'Buenas noches') + '</h1>' +
        '<p class="cabecera__desc">' + sec.desc + '</p></header>';
    }
    return '<header class="cabecera"><p class="cabecera__sector">' + nombreSector + '</p>' +
      '<h1 class="cabecera__titulo"><span class="cabecera__ico">' + ico(sec.ico) + '</span>' + sec.nombre + '</h1>' +
      '<p class="cabecera__desc">' + sec.desc + '</p></header>';
  }
  /* Pantallas de ingreso: ingresar, registro, recuperar, nueva clave, confirmar, espera, sin base */
  var pantalla = 'cargando';
  function mostrarIngreso(cual) {
    pantalla = cual;
    $('[data-app]').hidden = true; $('[data-ingreso]').hidden = false;
    $$('[data-pantalla]').forEach(function (el) { el.hidden = el.getAttribute('data-pantalla') !== cual; });
    var f = $('[data-pantalla="' + cual + '"]');
    $$('[data-error], [data-ok]', f).forEach(function (el) { el.hidden = true; });
    var inp = f && f.querySelector('input'); if (inp) inp.focus();
  }
  function pintar() {
    if (!PD.configurado) return mostrarIngreso('sin-base');
    if (PD.enRecuperacion()) { if (pantalla !== 'nueva-clave') mostrarIngreso('nueva-clave'); return; }
    var p = PD.perfil();
    leerSesion();
    if (!p) { if (['ingresar', 'registro', 'recuperar', 'confirmar'].indexOf(pantalla) < 0) mostrarIngreso('ingresar'); return; }
    if (!usuario) { $('[data-espera-nombre]').textContent = p.nombre || p.email; if (pantalla !== 'espera') mostrarIngreso('espera'); return; }
    pantalla = 'app';
    $('[data-ingreso]').hidden = true; $('[data-app]').hidden = false;
    var r = ruta();
    if (!puede(r.id)) { location.hash = '#/' + (usuario.rol === 'chofer' ? 'traslados' : 'panel'); return; }
    var sec = SECCIONES.filter(function (s) { return s.id === r.id; })[0];
    $('.principal').setAttribute('data-sector', sec.color || sec.sector);
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
  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-ir]');
    if (b) mostrarIngreso(b.getAttribute('data-ir'));
  });
  function formIngreso(nombre, fn) {
    var f = $('[data-pantalla="' + nombre + '"]');
    f.addEventListener('submit', async function (e) {
      e.preventDefault();
      var err = $('[data-error]', f);
      await ejecutar(f.querySelector('[type=submit]'), function () { return fn(f); }, err);
    });
  }
  var emailValido = function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); };
  formIngreso('ingresar', async function (f) {
    if (!emailValido(f.email.value.trim()) || !f.clave.value) throw new Error('Escribí tu email y tu contraseña.');
    var p = await PD.ingresar(f.email.value.trim(), f.clave.value);
    f.clave.value = '';
    if (p && p.activo) location.hash = '#/' + (p.rol === 'chofer' ? 'traslados' : 'panel');
    pintar();
  });
  formIngreso('registro', async function (f) {
    var nombre = f.nombre.value.trim(), email = f.email.value.trim();
    if (nombre.length < 2) throw new Error('Escribí tu nombre y apellido.');
    if (!emailValido(email)) throw new Error('Revisá el email.');
    if (f.clave.value.length < 8) throw new Error('La contraseña tiene que tener al menos 8 caracteres.');
    var r = await PD.registrarse(nombre, email, f.clave.value);
    f.clave.value = '';
    if (r.confirmar) return mostrarIngreso('confirmar');
    location.hash = '#/panel';
    pintar();
  });
  formIngreso('recuperar', async function (f) {
    if (!emailValido(f.email.value.trim())) throw new Error('Revisá el email.');
    await PD.recuperar(f.email.value.trim());
    var ok = $('[data-ok]', f); ok.textContent = 'Listo: si ese email tiene cuenta, te llega un link en unos minutos.'; ok.hidden = false;
  });
  formIngreso('nueva-clave', async function (f) {
    if (f.clave.value.length < 8) throw new Error('La contraseña tiene que tener al menos 8 caracteres.');
    await PD.nuevaClave(f.clave.value);
    f.clave.value = '';
    avisar('Contraseña cambiada');
    pantalla = 'cargando';
    pintar();
  });
  async function cerrarSesion() { await PD.salir(); usuario = null; location.hash = ''; mostrarIngreso('ingresar'); }
  $('[data-salir]').addEventListener('click', cerrarSesion);
  $('[data-salir-espera]').addEventListener('click', cerrarSesion);
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
    if ((el = t.closest('[data-guardar-transferencia]'))) return guardarTransferencia(el.getAttribute('data-guardar-transferencia'), el);
    if ((el = t.closest('[data-ver-factura]'))) { var fc = D().facturas.filter(function (x) { return x.id === el.getAttribute('data-ver-factura'); })[0]; if (fc) verFactura(fc); return; }
    if ((el = t.closest('[data-ver-ticket]'))) { var rt = D().reservas.filter(function (x) { return x.id === el.getAttribute('data-ver-ticket'); })[0]; if (rt) ticket(rt, 'entrada'); return; }
    if (t.closest('[data-sin-reserva]')) return sinReserva();
    if ((el = t.closest('[data-cancelar]'))) {
      var rc = D().reservas.filter(function (x) { return x.id === el.getAttribute('data-cancelar'); })[0];
      if (rc && confirm('¿Cancelar la reserva ' + rc.codigo + '?' + (rc.pago.monto > 0 ? ' Ya pagó ' + plata(rc.pago.monto) + ': la devolución se hace aparte.' : ''))) {
        ejecutar(el, function () { return PD.cancelar(rc.id); }).then(function (res) { if (res !== FALLO) { cerrarVentana(); avisar('Reserva ' + rc.codigo + ' cancelada', 'info'); pintar(); } });
      }
      return;
    }
    if ((el = t.closest('[data-traslado]'))) {
      var partes = el.getAttribute('data-traslado').split('|');
      var rr = D().reservas.filter(function (x) { return x.id === partes[0]; })[0];
      if (!rr) return;
      ejecutar(el, function () { return PD.traslado(rr.id, partes[1], PASOS_TRASLADO[rr.traslado[partes[1]]]); }).then(function (res) { if (res !== FALLO) pintar(); });
      return;
    }
    if ((el = t.closest('[data-buscar-cliente]'))) { location.hash = '#/reservas?f=todas&b=' + encodeURIComponent(el.getAttribute('data-buscar-cliente')); return; }
    if ((el = t.closest('[data-exportar]'))) return exportarCSV(el.getAttribute('data-exportar'));
    if (t.closest('[data-imprimir-pagina]')) return window.print();
    if (t.closest('[data-abrir-caja]')) {
      var ca = abrirVentana('<h2 class="ventana__titulo">Abrir caja</h2><form class="formulario" data-form-abrir-caja><label class="campo campo--corto"><span>Efectivo con el que se abre</span><input name="base" type="number" min="0" required></label><p class="campo-error" data-error-caja hidden></p><div class="ventana__acciones"><button class="btn btn--primario" type="submit">' + ico('check') + 'Abrir turno</button></div></form>');
      $('[data-form-abrir-caja]', ca).addEventListener('submit', async function (ev) {
        ev.preventDefault(); var f = ev.target;
        if (f.base.value === '' || +f.base.value < 0) return;
        var res = await ejecutar(f.querySelector('[type=submit]'), function () { return PD.abrirCaja(Math.round(+f.base.value)); }, $('[data-error-caja]', ca));
        if (res !== FALLO) { cerrarVentana(); avisar('Caja abierta'); pintar(); }
      });
      return;
    }
    if (t.closest('[data-egreso]')) {
      var c = abrirVentana('<h2 class="ventana__titulo">Registrar egreso</h2><form class="formulario" data-form-egreso><label class="campo"><span>Concepto</span><input name="concepto" required maxlength="100" placeholder="Ej.: nafta de la camioneta"></label><label class="campo campo--corto"><span>Monto</span><input name="monto" type="number" min="1" required></label><p class="campo-error" data-error-egreso hidden></p><div class="ventana__acciones"><button class="btn btn--primario" type="submit">' + ico('check') + 'Guardar</button></div></form>');
      $('[data-form-egreso]', c).addEventListener('submit', async function (ev) {
        ev.preventDefault(); var f = ev.target; if (!f.concepto.value.trim() || !(+f.monto.value > 0)) return;
        var res = await ejecutar(f.querySelector('[type=submit]'), function () { return PD.egreso(f.concepto.value.trim(), Math.round(+f.monto.value)); }, $('[data-error-egreso]', c));
        if (res !== FALLO) { cerrarVentana(); pintar(); }
      });
      return;
    }
    if ((el = t.closest('[data-cerrar-caja]'))) {
      var esperado = +el.getAttribute('data-esperado');
      var cj = abrirVentana('<h2 class="ventana__titulo">Cerrar caja</h2><p class="texto">Contá el efectivo y escribí cuánto hay. El sistema te dice si cuadra. Un cierre no se puede modificar después.</p><form class="formulario" data-form-cierre><label class="campo campo--corto"><span>Efectivo contado</span><input name="contado" type="number" min="0" required></label><p class="vuelto" data-dif hidden></p><p class="campo-error" data-error-cierre hidden></p><div class="ventana__acciones"><button class="btn btn--primario" type="submit">' + ico('lock') + 'Cerrar turno</button></div></form>');
      var fc = $('[data-form-cierre]', cj);
      fc.contado.addEventListener('input', function () { var dif = +fc.contado.value - esperado, p = $('[data-dif]', cj); p.hidden = fc.contado.value === ''; p.textContent = dif === 0 ? 'Cuadra justo.' : (dif > 0 ? 'Sobran ' : 'Faltan ') + plata(Math.abs(dif)) + ' (esperado ' + plata(esperado) + ').'; p.className = 'vuelto' + (dif === 0 ? '' : ' vuelto--alerta'); });
      fc.addEventListener('submit', async function (ev) {
        ev.preventDefault(); if (fc.contado.value === '') return;
        var res = await ejecutar(fc.querySelector('[type=submit]'), function () { return PD.cerrarCaja(Math.round(+fc.contado.value)); }, $('[data-error-cierre]', cj));
        if (res !== FALLO) { cerrarVentana(); avisar('Caja cerrada'); pintar(); }
      });
      return;
    }
    if ((el = t.closest('[data-copiar]'))) {
      var texto = el.getAttribute('data-copiar');
      (navigator.clipboard ? navigator.clipboard.writeText(texto) : Promise.reject()).then(function () { avisar('Link copiado'); }, function () { prompt('Copiá el link:', texto); });
      return;
    }
    if ((el = t.closest('[data-dar-acceso]'))) {
      var idU = el.getAttribute('data-dar-acceso');
      var rol = ($('[data-rol-usuario="' + idU + '"]') || {}).value || 'personal';
      var uA = D().usuarios.filter(function (x) { return x.id === idU; })[0];
      ejecutar(el, function () { return PD.actualizarPerfil(idU, { activo: true, rol: rol }); }).then(function (res) { if (res !== FALLO) { avisar((uA ? uA.nombre : 'La persona') + ' ya tiene acceso como ' + ROLES[rol].toLowerCase()); pintar(); } });
      return;
    }
    if ((el = t.closest('[data-quitar-acceso]'))) {
      var idQ = el.getAttribute('data-quitar-acceso');
      var uQ = D().usuarios.filter(function (x) { return x.id === idQ; })[0];
      if (uQ && confirm('¿Quitarle el acceso a ' + uQ.nombre + '? No va a poder entrar hasta que se lo vuelvas a dar.')) {
        ejecutar(el, function () { return PD.actualizarPerfil(idQ, { activo: false }); }).then(function (res) { if (res !== FALLO) { avisar('Acceso quitado a ' + uQ.nombre, 'info'); pintar(); } });
      }
      return;
    }
    if (t.closest('[data-respaldar]')) {
      descargar('respaldo-parking-despegar-' + new Date().toISOString().slice(0, 10) + '.json', JSON.stringify(D(), null, 2), 'application/json');
      PD.auditar('Descargó un respaldo');
      return;
    }
  });
  document.addEventListener('keydown', function (e) {
    var el = e.target.closest && e.target.closest('tr[data-abrir-reserva], tr[data-buscar-cliente]');
    if (el && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); el.click(); }
  });
  document.addEventListener('change', function (e) {
    if (e.target.matches('[name="tipoFactura"]')) { var cr = $('[data-campos-rut]'); if (cr) cr.hidden = e.target.value !== 'efactura'; }
    var sel = e.target.closest('[data-rol-usuario]');
    if (sel && sel.closest('.tabla')) {
      var u = D().usuarios.filter(function (x) { return x.id === sel.getAttribute('data-rol-usuario'); })[0];
      ejecutar(sel, function () { return PD.actualizarPerfil(u.id, { rol: sel.value }); }).then(function (res) {
        if (res !== FALLO) avisar(u.nombre + ' ahora es ' + ROLES[sel.value].toLowerCase()); pintar();
      });
    }
  });
  document.addEventListener('submit', function (e) {
    var f = e.target;
    if (f.matches('[data-form-llegada]')) { e.preventDefault(); return registrarLlegada(f.getAttribute('data-id'), f); }
    if (f.matches('[data-form-retiro]')) { e.preventDefault(); return registrarRetiro(f.getAttribute('data-id'), f); }
    if (f.matches('[data-form-empresa]')) {
      e.preventDefault();
      var rut = f.rut.value.replace(/\D/g, '');
      if (rut && rut.length !== 12) { avisar('El RUT tiene que tener 12 dígitos', 'alerta'); return; }
      ejecutar(f.querySelector('[type=submit]'), function () {
        return PD.guardarEmpresa({ razon: f.razon.value.trim() || 'Parking Despegar', rut: rut, direccion: f.direccion.value.trim(), iva: Math.max(0, Math.min(30, Math.round(+f.iva.value || 0))) });
      }).then(function (res) { if (res !== FALLO) { avisar('Datos para la factura guardados'); pintar(); } });
      return;
    }
    if (f.matches('[data-form-tarifas]')) {
      e.preventDefault();
      var nt = {};
      ['techado', 'aire', 'valet', 'graciaHoras', 'minimoDias'].forEach(function (k) { nt[k] = Math.max(0, Math.round(+f[k].value || 0)); });
      nt.minimoDias = Math.max(1, nt.minimoDias); nt.graciaHoras = Math.min(12, nt.graciaHoras);
      ejecutar(f.querySelector('[type=submit]'), function () { return PD.guardarTarifas(nt); })
        .then(function (res) { if (res !== FALLO) { avisar('Precios guardados: ya se aplican en la web'); simular(); } });
      return;
    }
    if (f.matches('[data-form-lugares]')) {
      e.preventDefault();
      ejecutar(f.querySelector('[type=submit]'), function () { return PD.configurarLugares(Math.round(+f.techado.value || 0), Math.round(+f.aire.value || 0)); }, $('[data-error-lugares]', f))
        .then(function (res) { if (res !== FALLO) { avisar('Lugares guardados'); pintar(); } });
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

  /* En vivo: cualquier cambio en la base (desde la web, otro mostrador o el chofer) llega solo */
  PD.alCambiar(function (d, cambios) {
    if (cambios.some(function (c) { return c.tabla === 'sesion'; })) return pintar();
    cambios.forEach(function (c) {
      if (c.tabla === 'reservas' && c.tipo === 'INSERT' && c.nuevo.origen === 'web' && usuario && usuario.rol !== 'chofer') {
        /* El pago llega un instante después: esperar y avisar con el estado final */
        setTimeout(function () {
          var n = D().reservas.filter(function (x) { return x.id === c.nuevo.id; })[0];
          if (n) avisar('Nueva reserva ' + n.codigo + ' desde la web · ' + n.vehiculo.matricula + (n.pago.estado === 'pagado' ? ' · pagada' : ' · a cobrar'), 'info');
        }, 1800);
      }
    });
    if (!cambios.length) return;
    if (pantalla !== 'app') return pintar();
    if (ventana.hidden && !(document.activeElement && document.activeElement.matches('input, select, textarea'))) pintar();
    else repintar = true;
  });

  /* Reloj */
  function reloj() { var el = $('[data-reloj]'); if (el) el.textContent = new Date().toLocaleString('es-UY', { weekday: 'short', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }); }
  reloj(); setInterval(reloj, 15000);

  window.addEventListener('hashchange', function () { if (pantalla === 'app') pintar(); });
  PD.iniciar().then(function () { pantalla = 'cargando'; pintar(); })
    .catch(function (e) { mostrarIngreso('ingresar'); avisar(e.message, 'alerta'); });
})();
