/* ============================================================
   PARKING DESPEGAR — Datos del negocio
   Una sola fuente para la web (reservar.html) y el dashboard (panel/).
   Hoy guarda todo en el navegador (localStorage) con datos DE MUESTRA:
   sirve para mostrar el sistema funcionando, no para operar.
   Cambiando solo este archivo se conecta a una base real (Supabase)
   y a la pasarela de pago: las pantallas no se tocan.
   Una reserva hecha en la web aparece al instante en el dashboard
   abierto en otra pestaña del mismo navegador (evento «storage»).
   ============================================================ */
(function () {
  'use strict';

  var CLAVE = 'pd-datos-v2';
  var DIA = 86400000;

  /* ---------- Lugares del predio (muestra: confirmar cantidades con la clienta) ---------- */
  var LUGARES = [];
  for (var i = 1; i <= 24; i++) LUGARES.push({ id: 'A-' + (i < 10 ? '0' : '') + i, tipo: 'techado', zona: 'A · Techado' });
  for (var j = 1; j <= 36; j++) LUGARES.push({ id: 'B-' + (j < 10 ? '0' : '') + j, tipo: 'aire', zona: 'B · Aire libre' });

  var TARIFAS_MUESTRA = {
    techado: 490,      // por día, en pesos uruguayos — DE MUESTRA
    aire: 390,         // por día — DE MUESTRA
    valet: 450,        // por servicio (entrega y retiro en la terminal) — DE MUESTRA
    minimoDias: 1,
    graciaHoras: 3,    // horas de tolerancia antes de contar un día más
    moneda: 'UYU'
  };

  /* ---------- Utilidades ---------- */
  function semilla(n) { return function () { n = (n * 16807) % 2147483647; return n / 2147483647; }; }
  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function iso(d) { return new Date(d).toISOString(); }
  function uid() { return Math.random().toString(36).slice(2, 10); }

  function dias(entrada, salida, t) {
    var horas = (new Date(salida) - new Date(entrada)) / 3600000;
    var gracia = (t || TARIFAS_MUESTRA).graciaHoras || 0;
    var d = Math.ceil(Math.max(0, horas - gracia) / 24);
    return Math.max((t || TARIFAS_MUESTRA).minimoDias || 1, d);
  }
  function precio(r, t) {
    t = t || leer().tarifas;
    var d = dias(r.entrada, r.salida, t);
    var base = d * (r.lugarTipo === 'techado' ? t.techado : t.aire);
    var extra = r.servicio === 'valet' ? t.valet : 0;
    return { dias: d, base: base, extra: extra, total: base + extra };
  }

  /* ---------- Datos de muestra ---------- */
  var NOMBRES = ['Lucía Fernández', 'Martín Rodríguez', 'Valentina Pérez', 'Santiago González', 'Camila Silva',
    'Joaquín Martínez', 'Florencia López', 'Nicolás Sosa', 'Sofía Díaz', 'Federico Castro', 'Agustina Núñez',
    'Matías Romero', 'Carolina Suárez', 'Diego Méndez', 'Paula Ramírez', 'Gonzalo Acosta', 'Julieta Torres',
    'Rodrigo Benítez', 'Micaela Vázquez', 'Andrés Cabrera', 'Natalia Ferreira', 'Emiliano Olivera', 'Victoria Pereira',
    'Bruno Rocha', 'Mariana Correa', 'Facundo Medina', 'Lorena Ríos', 'Pablo Alonso', 'Ximena Duarte', 'Gastón Viera'];
  var AUTOS = ['Volkswagen Gol', 'Chevrolet Onix', 'Fiat Cronos', 'Toyota Corolla', 'Hyundai HB20', 'Renault Kwid',
    'Peugeot 208', 'Suzuki Swift', 'Kia Rio', 'Nissan Kicks', 'Citroën C3', 'Toyota Hilux', 'BYD Dolphin', 'Ford Ranger'];
  var COLORES = ['Blanco', 'Gris plata', 'Negro', 'Rojo', 'Azul', 'Gris oscuro', 'Bordó'];
  var VUELOS = ['AR 1291', 'LA 7731', 'CM 207', 'G3 7600', 'AR 1305', 'UX 046', 'AA 909', 'H2 5302', 'LA 2413', 'CM 451'];
  var LETRAS = 'ABCDEFGHJKLMNPRSTUVXYZ';

  function muestra() {
    var r = semilla(20261006);
    var ahora = Date.now();
    var hoy0 = new Date(); hoy0.setHours(0, 0, 0, 0);
    var t = TARIFAS_MUESTRA;
    var reservas = [], movimientos = [], ocupados = {};
    var n = 0;
    for (var k = 0; k < 150; k++) {
      // entrada entre 46 días atrás y 16 adelante
      var entrada = hoy0.getTime() - 46 * DIA + Math.floor(r() * 62) * DIA + (4 + Math.floor(r() * 18)) * 3600000 + Math.floor(r() * 4) * 900000;
      var estadia = (1 + Math.floor(r() * 13)) * DIA + Math.floor(r() * 10) * 3600000;
      var salida = entrada + estadia;
      var tipo = r() < 0.55 ? 'techado' : 'aire';
      var servicio = r() < 0.18 ? 'valet' : 'traslado';
      var nombre = NOMBRES[Math.floor(r() * NOMBRES.length)];
      var matricula = (r() < 0.6 ? 'S' : 'A') + LETRAS[Math.floor(r() * LETRAS.length)] + LETRAS[Math.floor(r() * LETRAS.length)] + ' ' + (1000 + Math.floor(r() * 8999));
      var origen = r() < 0.55 ? 'web' : (r() < 0.75 ? 'whatsapp' : 'mostrador');
      var res = {
        id: uid(), codigo: 'PD-' + (2100 + (++n)),
        creada: iso(entrada - (1 + Math.floor(r() * 9)) * DIA),
        origen: origen,
        cliente: { nombre: nombre, telefono: '09' + (1 + Math.floor(r() * 9)) + ' ' + (100 + Math.floor(r() * 899)) + ' ' + (100 + Math.floor(r() * 899)), email: '' },
        vehiculo: { matricula: matricula, modelo: AUTOS[Math.floor(r() * AUTOS.length)], color: COLORES[Math.floor(r() * COLORES.length)] },
        lugarTipo: tipo, servicio: servicio, pasajeros: 1 + Math.floor(r() * 4),
        entrada: iso(entrada), salida: iso(salida),
        vuelo: { ida: VUELOS[Math.floor(r() * VUELOS.length)], vuelta: VUELOS[Math.floor(r() * VUELOS.length)] },
        lugar: null, checkin: null, checkout: null,
        traslado: { ida: 'pendiente', vuelta: 'pendiente' },
        notas: '', estado: 'confirmada', pago: { estado: 'pendiente', monto: 0, medio: null, ref: null, fecha: null }
      };
      var p = precio(res, t);
      res.total = p.total;
      var pagaOnline = origen === 'web' && r() < 0.85;
      if (pagaOnline) res.pago = { estado: 'pagado', monto: p.total, medio: 'online', ref: 'WEB-' + uid().toUpperCase().slice(0, 6), fecha: res.creada };
      if (r() < 0.04 && entrada > ahora) { res.estado = 'cancelada'; }
      else if (salida < ahora - 2 * 3600000) {
        res.estado = 'finalizada'; res.checkin = iso(entrada + 600000); res.checkout = iso(salida + 40 * 60000);
        res.traslado = { ida: 'hecho', vuelta: 'hecho' };
      } else if (entrada < ahora) {
        res.estado = 'en_predio'; res.checkin = iso(entrada + 600000); res.traslado.ida = 'hecho';
      }
      if ((res.estado === 'finalizada' || res.estado === 'en_predio')) {
        // lugar asignado: el primero libre del tipo
        var libre = LUGARES.filter(function (l) { return l.tipo === tipo && !ocupados[l.id + (res.estado === 'en_predio' ? '' : '-' + k)]; })[Math.floor(r() * 6)];
        res.lugar = libre ? libre.id : (tipo === 'techado' ? 'A-01' : 'B-01');
        if (res.estado === 'en_predio') ocupados[res.lugar] = true;
        if (res.pago.estado !== 'pagado' && res.estado === 'finalizada') {
          var medio = ['efectivo', 'tarjeta', 'transferencia', 'efectivo'][Math.floor(r() * 4)];
          res.pago = { estado: 'pagado', monto: p.total, medio: medio, ref: null, fecha: res.checkout };
        }
      }
      reservas.push(res);
    }
    // Evitar dos autos en el mismo lugar: reasignar los que están en el predio
    var usados = {};
    reservas.filter(function (x) { return x.estado === 'en_predio'; }).forEach(function (x) {
      var l = LUGARES.filter(function (y) { return y.tipo === x.lugarTipo && !usados[y.id]; })[0];
      x.lugar = l ? l.id : null; if (l) usados[l.id] = true;
    });
    reservas.sort(function (a, b) { return new Date(a.entrada) - new Date(b.entrada); });

    // Caja: turno abierto hoy, con los cobros del día
    var apertura = hoy0.getTime() + 6 * 3600000;
    reservas.forEach(function (x) {
      if (x.pago.estado === 'pagado' && x.pago.fecha && new Date(x.pago.fecha).getTime() >= apertura) {
        movimientos.push({ id: uid(), hora: x.pago.fecha, concepto: 'Reserva ' + x.codigo + ' · ' + x.vehiculo.matricula, medio: x.pago.medio, monto: x.pago.monto, usuario: 'web' });
      }
    });

    return {
      version: 1,
      muestra: true,
      creado: iso(ahora),
      tarifas: JSON.parse(JSON.stringify(TARIFAS_MUESTRA)),
      lugares: LUGARES,
      reservas: reservas,
      caja: { turnoActual: { id: uid(), apertura: iso(apertura), base: 3000, usuario: 'Personal de turno', movimientos: movimientos }, cerrados: [] },
      usuarios: [
        { id: 'u1', nombre: 'Dueña del parking', usuario: 'admin', clave: 'despegar', rol: 'admin', activo: true },
        { id: 'u2', nombre: 'Personal de turno', usuario: 'personal', clave: 'despegar', rol: 'personal', activo: true },
        { id: 'u3', nombre: 'Chofer de la camioneta', usuario: 'chofer', clave: 'despegar', rol: 'chofer', activo: true }
      ],
      auditoria: [{ fecha: iso(ahora), usuario: 'sistema', accion: 'Inicio del sistema' }]
    };
  }

  /* ---------- Lectura y escritura ---------- */
  var cache = null;
  function leer() {
    if (cache) return cache;
    try { cache = JSON.parse(localStorage.getItem(CLAVE)); } catch (e) { cache = null; }
    if (!cache || cache.version !== 1) { cache = muestra(); escribir(); }
    return cache;
  }
  function escribir() {
    try { localStorage.setItem(CLAVE, JSON.stringify(cache)); } catch (e) { /* sin almacenamiento: queda en memoria */ }
    oyentes.forEach(function (fn) { fn(cache); });
  }
  var oyentes = [];
  window.addEventListener('storage', function (e) {
    if (e.key !== CLAVE) return;
    cache = null; leer();
    oyentes.forEach(function (fn) { fn(cache, true); });
  });

  function auditar(usuario, accion) {
    var d = leer();
    d.auditoria.unshift({ fecha: iso(Date.now()), usuario: usuario || 'sistema', accion: accion });
    if (d.auditoria.length > 400) d.auditoria.length = 400;
  }

  function lugaresLibres(tipo) {
    var d = leer();
    var ocupados = {};
    d.reservas.forEach(function (r) { if (r.estado === 'en_predio' && r.lugar) ocupados[r.lugar] = r; });
    return d.lugares.filter(function (l) { return (!tipo || l.tipo === tipo) && !ocupados[l.id]; });
  }

  window.PD = {
    DIA: DIA,
    datos: leer,
    guardar: function (usuario, accion) { if (accion) auditar(usuario, accion); escribir(); },
    alCambiar: function (fn) { oyentes.push(fn); },
    precio: precio,
    dias: dias,
    lugaresLibres: lugaresLibres,
    uid: uid,
    pad: pad,
    nuevoCodigo: function () {
      var max = 2100;
      leer().reservas.forEach(function (r) { var n = parseInt(String(r.codigo).replace(/\D/g, ''), 10); if (n > max) max = n; });
      return 'PD-' + (max + 1);
    },
    /* Crea una reserva (web, WhatsApp o mostrador). Devuelve la reserva. */
    crearReserva: function (datos, usuario) {
      var d = leer();
      var r = Object.assign({
        id: uid(), codigo: PD.nuevoCodigo(), creada: iso(Date.now()), origen: 'web',
        lugar: null, checkin: null, checkout: null, traslado: { ida: 'pendiente', vuelta: 'pendiente' },
        notas: '', estado: 'confirmada', pago: { estado: 'pendiente', monto: 0, medio: null, ref: null, fecha: null }
      }, datos);
      r.total = precio(r, d.tarifas).total;
      d.reservas.push(r);
      auditar(usuario || 'web', 'Nueva reserva ' + r.codigo + ' (' + r.vehiculo.matricula + ')');
      escribir();
      return r;
    },
    /* Registra un pago: lo marca en la reserva y lo suma a la caja del turno */
    registrarPago: function (r, monto, medio, usuario, ref) {
      var d = leer();
      var pagado = (r.pago && r.pago.monto ? r.pago.monto : 0) + monto;
      r.pago = { estado: pagado >= r.total ? 'pagado' : 'parcial', monto: pagado, medio: medio, ref: ref || null, fecha: iso(Date.now()) };
      if (d.caja.turnoActual) d.caja.turnoActual.movimientos.unshift({ id: uid(), hora: iso(Date.now()), concepto: 'Reserva ' + r.codigo + ' · ' + r.vehiculo.matricula, medio: medio, monto: monto, usuario: usuario || 'web' });
      auditar(usuario || 'web', 'Pago de ' + r.codigo + ': $ ' + monto + ' (' + medio + ')');
      escribir();
    },
    restablecer: function () { cache = muestra(); escribir(); },
    exportar: function () { return JSON.stringify(leer(), null, 2); },
    importar: function (texto) { var x = JSON.parse(texto); if (!x || x.version !== 1 || !x.reservas) throw new Error('Archivo no válido'); cache = x; escribir(); }
  };
})();
