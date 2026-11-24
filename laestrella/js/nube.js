/* ============================================================
   LA ESTRELLA — conexión con Supabase (modo conectado)
   Solo se activa si js/config.js tiene la dirección y la clave del proyecto.
   Sin eso, el sistema sigue funcionando con los datos de ejemplo del navegador.

   Cómo funciona:
   · LEER: la pantalla lee de una copia local (rápida y disponible sin internet).
     La copia se refresca desde el servidor al entrar, después de cada cambio
     y cada 45 segundos.
   · VENDER y RETIRAR EFECTIVO: se anotan al instante en la caja y se mandan al
     servidor en cola. Si se corta internet, se siguen haciendo y se envían solos
     cuando vuelve (cada venta lleva un identificador único: reenviar no duplica).
   · TODO LO DEMÁS (precios, stock, compras, equipo…): se hace en el servidor y
     necesita conexión. El servidor controla el rol y calcula los importes.
   ============================================================ */
(function () {
  'use strict';
  if (!window.LE || !LE.nubeActiva) return;
  if (!window.supabase) { console.error('Falta lib/supabase.min.js'); return; }

  var C = window.LE_CONFIG, E = LE.estado;
  var sb = window.supabase.createClient(C.url, C.clave, { auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: false } });
  var orig = {}; ['crearVenta', 'egresoCaja', 'cobrarDeuda'].forEach(function (k) { orig[k] = LE[k]; });

  /* ---------- Llamadas al servidor ---------- */
  function esRed(err) { return !err.code && /fetch|network|load failed|conexi/i.test(err.message || ''); }
  function rpc(nombre, args) {
    return sb.rpc(nombre, args || {}).then(function (r) {
      if (r.error) {
        var e = new Error(esRed(r.error) ? 'Sin conexión con el servidor.' : (/JWT|token/i.test(r.error.message) ? 'La sesión venció. Volvé a ingresar.' : r.error.message));
        e.red = esRed(r.error); e.sesion = /JWT|token/i.test(r.error.message); e.codigo = r.error.code; throw e;
      }
      return r.data;
    }, function () { var e = new Error('Sin conexión con el servidor.'); e.red = true; throw e; });
  }
  function enLinea() { return navigator.onLine !== false && !E.offline; }
  function esUuid(s) { return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(String(s || '')); }
  function avisar() { try { document.dispatchEvent(new CustomEvent('le:datos')); } catch (e) { } }

  /* ---------- Copia local ← servidor ---------- */
  var cargando = null;
  function aplicarVentas(vs, completo) {
    var pend = (E.ventas || []).filter(function (v) { return v.sync === false; });
    var porId = {};
    (completo ? [] : (E.ventas || [])).forEach(function (v) { porId[v.id] = v; });
    vs.forEach(function (v) { porId[v.id] = v; E.ultAct = Math.max(E.ultAct || 0, v.act || 0); });
    pend.forEach(function (v) { if (!porId[v.id] || porId[v.id].sync === false) porId[v.id] = v; });   // lo todavía no enviado se conserva
    E.ventas = Object.keys(porId).map(function (k) { return porId[k]; }).sort(function (a, b) { return a.ts - b.ts; });
  }
  function cargar() {
    if (cargando) return cargando;
    var completo = !E.ultAct;
    var cola0 = (E.outbox || []).map(function (o) { return o.id; });   // lo que estaba en la cola al pedir los datos
    cargando = Promise.all([rpc('snap_base'), rpc('snap_ventas', { p_desde: completo ? null : E.ultAct, p_dias: 35 })]).then(function (r) {
      var b = r[0];
      ['negocio', 'categorias', 'productos', 'usuarios', 'proveedores', 'compras', 'turnos', 'movCaja', 'asistencias', 'movStock', 'auditoria', 'mensual', 'sinCargar', 'deudores', 'pagosDeuda', 'avisosDeuda'].forEach(function (k) { if (b[k] != null) E[k] = b[k]; });
      var local = (E.ventas || []).reduce(function (a, v) { return Math.max(a, v.num || 0); }, 0);
      E.contador = { venta: Math.max(b.contador.venta, local), compra: b.contador.compra };
      aplicarVentas(r[1], completo);
      // Lo hecho acá y todavía sin enviar (ventas a cuenta y cobros de deudas) se suma otra vez a los saldos del servidor
      (E.ventas || []).forEach(function (v) { if (v.sync === false && v.fiado) { var dd = E.deudores.filter(function (x) { return x.id === v.deudor; })[0]; if (dd) dd.saldo = (dd.saldo || 0) + v.total; } });
      (E.outbox || []).filter(function (o) { return o.tipo === 'cobro_deuda'; }).forEach(function (o) {
        var dd = E.deudores.filter(function (x) { return x.id === o.payload.deudor; })[0]; if (dd) dd.saldo = (dd.saldo || 0) - o.payload.monto;
        if (!E.pagosDeuda.some(function (g) { return g.id === o.id; })) E.pagosDeuda.push({ id: o.id, deudor: o.payload.deudor, turno: (LE.turnoAbierto() || {}).id, ts: o.payload.ts, monto: o.payload.monto, medio: o.payload.medio, usuario: (LE.usuario() || {}).nombre });
      });
      // Retiros hechos acá y todavía sin enviar: no se pierden al refrescar
      (E.outbox || []).filter(function (o) { return o.tipo === 'egreso'; }).forEach(function (o) { if (!E.movCaja.some(function (m) { return m.id === o.id; })) E.movCaja.push({ id: o.id, turno: (LE.turnoAbierto() || {}).id, ts: o.payload.ts, concepto: o.payload.concepto, monto: -o.payload.monto, usuario: (LE.usuario() || {}).nombre }); });
      LE.guardar(); avisar();
    }).then(function () {
      cargando = null;
      // Si mientras tanto salió algo de la cola, la foto del servidor puede haber quedado vieja: se vuelve a pedir
      if (cola0.some(function (id) { return !(E.outbox || []).some(function (o) { return o.id === id; }); })) setTimeout(function () { cargar().then(avisar, function () { }); }, 60);
    }, function (e) { cargando = null; throw e; });
    return cargando;
  }

  /* ---------- Cola de envío (ventas y retiros hechos en la caja) ---------- */
  var vaciando = null;
  function vaciarCola() {
    if (vaciando) return vaciando;
    if (!enLinea() || !(E.outbox || []).length) return Promise.resolve(0);
    vaciando = (function paso(n) {
      var it = (E.outbox || [])[0]; if (!it) return Promise.resolve(n);
      var q = it.tipo === 'venta' ? rpc('crear_venta', { p: it.payload }) : it.tipo === 'cobro_deuda' ? rpc('cobrar_deuda', { p: it.payload }) : rpc('egreso_caja', { p_concepto: it.payload.concepto, p_monto: it.payload.monto, p_id: it.payload.id, p_ts: it.payload.ts });
      return q.then(function (srv) {
        E.outbox.shift(); avisarCambio();
        if (it.tipo === 'venta' && it.payload.deudor) dispararWhatsApp();
        if (it.tipo === 'venta') { var i = E.ventas.map(function (v) { return v.id; }).indexOf(it.id); if (i >= 0 && srv && srv.id) E.ventas[i] = srv; }
        LE.guardar(); return paso(n + (it.tipo === 'venta' ? 1 : 0));
      }, function (e) {
        if (e.red || e.sesion) throw e;                         // sin internet o sin sesión: queda en cola
        E.outbox.shift(); (E.rechazadas = E.rechazadas || []).push({ tipo: it.tipo, id: it.id, error: e.message, ts: Date.now() }); // el servidor lo rechazó por una regla
        if (it.tipo === 'venta') { var v = E.ventas.filter(function (x) { return x.id === it.id; })[0]; if (v) v.sync = 'rechazada'; }
        LE.guardar(); try { document.dispatchEvent(new CustomEvent('le:rechazo', { detail: { tipo: it.tipo, error: e.message } })); } catch (x) { }
        return paso(n);
      });
    })(0).then(function (n) { vaciando = null; return n; }, function (e) { vaciando = null; if (e.red) return 0; throw e; });
    return vaciando;
  }
  LE.sincronizar = function () {
    if (E.offline) return Promise.reject(new Error('Sin conexión: no se puede enviar todavía.'));
    return vaciarCola().then(function (n) { return cargar().then(function () { return n; }, function () { return n; }); });
  };

  /* ---------- Venta y retiro: al instante, con envío en cola ---------- */
  LE.crearVenta = function (d) {
    if (!esUuid(d.id)) d = Object.assign({}, d, { id: LE.uid('v') });   // por si llegara un identificador de otro formato
    var antes = (E.outbox || []).some(function (o) { return o.id === d.id; }) || E.ventas.some(function (v) { return v.id === d.id; });
    var v = orig.crearVenta(d);
    if (antes) return v;
    v.sync = false;
    E.outbox.push({ tipo: 'venta', id: v.id, payload: { id: v.id, num: v.num, ts: v.ts, turno: v.turno, items: v.items.map(function (i) { return { p: i.p, c: i.c }; }), pagos: v.pagos.map(function (p) { return { m: p.m, monto: p.monto }; }), recibido: v.recibido, deudor: v.deudor || null } });
    LE.guardar(); setTimeout(function () { vaciarCola().then(function (n) { if (n) { avisar(); } }, function () { }); }, 0);
    return v;
  };
  /* ---------- Deudores ---------- */
  LE.guardarDeudor = function (d) {
    var p = { id: esUuid(d.id) ? d.id : null, nombre: d.nombre, telefono: d.telefono || '', limite: d.limite || 0, activo: d.activo == null ? true : !!d.activo };
    return hacer('guardar_deudor', { p: p }, function (r) { return LE.deudor(r.id); });
  };
  LE.cobrarDeuda = function (d) {
    var g = orig.cobrarDeuda(Object.assign({}, d, { id: esUuid(d.id) ? d.id : LE.uid('g') }));
    E.outbox.push({ tipo: 'cobro_deuda', id: g.id, payload: { id: g.id, deudor: g.deudor, monto: g.monto, medio: g.medio, ts: g.ts } });
    LE.guardar(); setTimeout(function () { vaciarCola().then(function () { }, function () { }); }, 0);
    return g;
  };
  LE.marcarAviso = function (id, estado, detalle) { return hacer('marcar_aviso', { p_id: id, p_estado: estado, p_detalle: detalle || '' }); };
  /* Envío automático por WhatsApp: lo hace el servicio de Cloudflare (supabase/servicio) apenas la base crea el aviso.
     Acá solo se vuelve a leer la base unos segundos después, para ver el aviso como «Enviado». */
  function dispararWhatsApp() {
    if (!C.whatsapp) return;
    [4000, 12000].forEach(function (ms) { setTimeout(function () { cargar().then(avisar, function () { }); }, ms); });
  }
  LE.enviarAvisosWhatsApp = function () { dispararWhatsApp(); };
  LE.egresoCaja = function (concepto, monto) {
    orig.egresoCaja(concepto, monto);
    var mv = E.movCaja[E.movCaja.length - 1];
    E.outbox.push({ tipo: 'egreso', id: mv.id, payload: { id: mv.id, concepto: mv.concepto, monto: -mv.monto, ts: mv.ts } });
    LE.guardar(); setTimeout(function () { vaciarCola().then(function () { }, function () { }); }, 0);
  };
  /* ---------- Códigos sin cargar: se anotan en la terminal y se envían cuando hay internet (sin trabar el cierre de caja) ---------- */
  function enviarCodigos() {
    var it = (E.codigosCola || [])[0]; if (!it || !enLinea()) return Promise.resolve();
    return rpc('registrar_codigo', { p_codigo: it.codigo, p_ts: it.ts }).then(function () { E.codigosCola.shift(); LE.guardar(); return enviarCodigos(); },
      function (e) { if (e && (e.red || e.sesion)) return; E.codigosCola.shift(); LE.guardar(); return enviarCodigos(); });
  }
  LE.registrarCodigo = function (codigo, ts) {
    var c = String(codigo || '').trim(); if (!/^\d{8,14}$/.test(c) || E.productos.some(function (x) { return x.codigo === c; })) return null;
    (E.codigosCola = E.codigosCola || []).push({ codigo: c, ts: ts || Date.now() }); LE.guardar(); setTimeout(function () { enviarCodigos().then(function () { }, function () { }); }, 0); return { codigo: c };
  };
  LE.codigosSinCargar = function () { return (E.sinCargar || []).slice().sort(function (a, b) { return b.ultima - a.ultima; }); };
  LE.descartarCodigo = function (codigo) { return hacer('descartar_codigo', { p_codigo: codigo }); };
  LE.pendientes = function () { return (E.ventas || []).filter(function (v) { return v.sync === false; }); };

  /* ---------- Todo lo demás: en el servidor, y se refresca la copia ---------- */
  /* Después de guardar algo hay que pedir datos NUEVOS: si ya había una actualización en curso, es una foto anterior al cambio, así que se espera y se vuelve a pedir */
  function cargarFresco() { var previo = cargando; return (previo ? previo.then(function () { }, function () { }) : Promise.resolve()).then(function () { return cargar(); }); }
  function hacer(nombre, args, despues) {
    return rpc(nombre, args).then(function (r) { avisarCambio(); return cargarFresco().then(function () { return despues ? despues(r) : r; }, function () { return despues ? despues(r) : r; }); });
  }
  LE.abrirCaja = function (base) { return hacer('abrir_caja', { p_base: Math.round(base) }, function () { return LE.turnoAbierto(); }); };
  LE.cerrarCaja = function (contado) {
    return vaciarCola().then(function () {
      if ((E.outbox || []).length) throw new Error('Hay ventas sin enviar. Esperá a tener internet para cerrar la caja.');
      return hacer('cerrar_caja', { p_contado: Math.round(contado) });
    });
  };
  LE.anularVenta = function (id, motivo) { return hacer('anular_venta', { p_id: id, p_motivo: motivo }); };
  LE.guardarProducto = function (d) {
    var p = { id: esUuid(d.id) ? d.id : null, nombre: d.nombre, cat: d.cat, unidad: d.unidad, codigo: d.codigo || '', plu: d.plu || '', costo: d.costo, precio: d.precio, iva: +d.iva, minimo: d.minimo || 0, prov: d.prov || null, stockInicial: d.stockInicial || 0 };
    return hacer('guardar_producto', { p: p }, function (r) { return LE.producto(r.id); });
  };
  LE.ajustarMinimo = function (id, minimo) {
    var q = LE.producto(id), m = Math.round((+minimo || 0) * 1000) / 1000; if (!(m >= 0)) return Promise.reject(new Error('El mínimo no puede ser negativo.'));
    return LE.guardarProducto({ id: q.id, nombre: q.nombre, cat: q.cat, unidad: q.unidad, codigo: q.codigo, plu: q.plu, costo: q.costo, precio: q.precio, iva: q.iva, minimo: m, prov: q.prov });
  };
  LE.activarProducto = function (id, activo) { return hacer('activar_producto', { p_id: id, p_activo: !!activo }); };
  LE.ajustarStock = function (id, delta, motivo) { return hacer('ajustar_stock', { p_id: id, p_delta: delta, p_motivo: motivo }); };
  LE.guardarProveedor = function (d) { return hacer('guardar_proveedor', { p: { id: esUuid(d.id) ? d.id : null, nombre: d.nombre, contacto: d.contacto, telefono: d.telefono, email: d.email, rubro: d.rubro } }); };
  LE.guardarCompra = function (d) { return hacer('guardar_compra', { p: { prov: d.prov, nota: d.nota || '', items: d.items } }); };
  LE.recibirCompra = function (id) { return hacer('recibir_compra', { p_id: id }); };
  LE.pagarCompra = function (id) { return hacer('pagar_compra', { p_id: id }); };
  LE.guardarUsuario = function (d) {
    if (!esUuid(d.id)) return Promise.reject(new Error('Cada persona crea su cuenta desde «Crear cuenta» en la pantalla de ingreso; después la aprobás acá.'));
    return hacer('guardar_usuario', { p: { id: d.id, nombre: d.nombre, rol: d.rol, activo: !!d.activo } });
  };
  LE.marcarAsistencia = function () { return hacer('marcar_asistencia', {}, function (r) { return { estado: r.estado, a: { entrada: r.entrada, salida: r.salida } }; }); };
  LE.guardarNegocio = function (d) { return hacer('guardar_negocio', { p: d }); };

  /* ---------- Ingreso, registro y salida ---------- */
  function guardarPerfil(p) { try { localStorage.setItem(LE.KEY_PERFIL, JSON.stringify(p)); } catch (e) { } }
  function limpiarPerfil() { try { localStorage.removeItem(LE.KEY_PERFIL); } catch (e) { } }
  function conPerfil() {
    return rpc('mi_perfil').then(function (p) {
      if (!p) throw new Error('No se encontró tu cuenta.');
      if (!p.activo) { guardarPerfil(null); limpiarPerfil(); return sb.auth.signOut().then(function () { var e = new Error('Tu cuenta todavía no tiene acceso. Pedile a administración que la apruebe.'); e.pendiente = true; throw e; }); }
      guardarPerfil(p); return p;
    });
  }
  LE.nube = {
    sb: sb,
    configurada: true,
    entrar: function (email, clave) {
      return sb.auth.signInWithPassword({ email: String(email).trim(), password: clave }).then(function (r) {
        if (r.error) throw new Error(/invalid/i.test(r.error.message) ? 'Email o contraseña incorrectos.' : (esRed(r.error) ? 'Sin conexión con el servidor.' : r.error.message));
        E.ultAct = null; return conPerfil();
      }).then(function (p) { return cargar().then(function () { return p; }); });
    },
    registrar: function (nombre, email, clave) {
      if (String(clave).length < 6) return Promise.reject(new Error('La contraseña tiene que tener al menos 6 caracteres.'));
      return sb.auth.signUp({ email: String(email).trim(), password: clave, options: { data: { nombre: String(nombre).trim() } } }).then(function (r) {
        if (r.error) throw new Error(/registered|exists/i.test(r.error.message) ? 'Ese email ya tiene una cuenta.' : r.error.message);
        if (!r.data.session) { var e = new Error('Te mandamos un email para confirmar la cuenta. Después ingresá.'); e.aviso = true; throw e; }
        return conPerfil().then(function (p) { return cargar().then(function () { return p; }); }).catch(function (e) {
          if (e.pendiente) { var x = new Error('Cuenta creada. Ahora administración tiene que aprobarla para que puedas entrar.'); x.aviso = true; throw x; } throw e; });
      });
    },
    perfil: function () { try { return JSON.parse(localStorage.getItem(LE.KEY_PERFIL)); } catch (e) { return null; } },
    cargar: cargar, vaciarCola: vaciarCola
  };
  LE.usuarios = function () { return E.usuarios; };
  LE.entrar = function () { return { ok: false, error: 'Ingresá con tu email y contraseña.' }; };
  LE.salir = function () {
    if ((E.outbox || []).length) return Promise.reject(new Error('Hay ventas sin enviar. Conectate a internet para enviarlas antes de salir.'));
    return sb.auth.signOut().then(function () {
      limpiarPerfil(); try { localStorage.removeItem('laestrella_nube_v1'); localStorage.removeItem('laestrella_ticket_v1'); } catch (e) { }
    });
  };

  /* ---------- Verificar la sesión y mantener la copia al día ---------- */
  var enLogin = !/\/(caja|panel)(\/|$)/.test(location.pathname);
  if (!enLogin) {
    sb.auth.getSession().then(function (r) {
      if (!r.data.session) { limpiarPerfil(); location.replace('../index.html'); }
    });
    sb.auth.onAuthStateChange(function (ev) { if (ev === 'SIGNED_OUT') { limpiarPerfil(); location.replace('../index.html'); } });
  }
  /* ---------- En vivo: cuando alguien cobra o cambia algo, avisa por el canal de Supabase (Realtime Broadcast) y las demás pantallas
     se ponen al día en el acto. Solo viaja un aviso vacío, nunca datos. Si el canal no anda, queda la consulta cada 8 segundos. ---------- */
  var canal = null, canalListo = false, tCambio = null;
  function alCambio() {
    clearTimeout(tCambio);
    tCambio = setTimeout(function () {
      if (enLogin || !LE.usuario() || !enLinea()) return;
      vaciarCola().then(function () { if (!(E.outbox || []).length) return cargar(); }).catch(function () { });
    }, 120);
  }
  function avisarCambio() { try { if (canal && canalListo) canal.send({ type: 'broadcast', event: 'cambio', payload: {} }); } catch (e) { } }
  function iniciarVivo() {
    if (!C.vivo || enLogin || !sb.channel) return;
    try {
      canal = sb.channel('la-estrella-cambios', { config: { broadcast: { self: false } } });
      canal.on('broadcast', { event: 'cambio' }, alCambio).subscribe(function (estado) { canalListo = estado === 'SUBSCRIBED'; if (canalListo) alCambio(); });
    } catch (e) { canal = null; }
  }
  function ciclo() {
    if (enLogin || document.hidden || !enLinea() || !LE.usuario()) return;
    enviarCodigos().then(function () { }, function () { });
    vaciarCola().then(function () { if (!(E.outbox || []).length) return cargar(); }).catch(function (e) { if (e && e.sesion) { limpiarPerfil(); location.replace('../index.html'); } });
  }
  setInterval(ciclo, 8000);   // el panel y la caja se ponen al día solos, cada pocos segundos
  window.addEventListener('online', ciclo);
  document.addEventListener('visibilitychange', ciclo);
  if (!enLogin) { setTimeout(ciclo, 30); setTimeout(iniciarVivo, 400); }
})();
