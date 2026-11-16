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
  var orig = {}; ['crearVenta', 'egresoCaja'].forEach(function (k) { orig[k] = LE[k]; });

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
    cargando = Promise.all([rpc('snap_base'), rpc('snap_ventas', { p_desde: completo ? null : E.ultAct, p_dias: 35 })]).then(function (r) {
      var b = r[0];
      ['negocio', 'categorias', 'productos', 'usuarios', 'proveedores', 'compras', 'turnos', 'movCaja', 'asistencias', 'movStock', 'auditoria', 'mensual'].forEach(function (k) { if (b[k] != null) E[k] = b[k]; });
      var local = (E.ventas || []).reduce(function (a, v) { return Math.max(a, v.num || 0); }, 0);
      E.contador = { venta: Math.max(b.contador.venta, local), compra: b.contador.compra };
      aplicarVentas(r[1], completo);
      // Retiros hechos acá y todavía sin enviar: no se pierden al refrescar
      (E.outbox || []).filter(function (o) { return o.tipo === 'egreso'; }).forEach(function (o) { if (!E.movCaja.some(function (m) { return m.id === o.id; })) E.movCaja.push({ id: o.id, turno: (LE.turnoAbierto() || {}).id, ts: o.payload.ts, concepto: o.payload.concepto, monto: -o.payload.monto, usuario: (LE.usuario() || {}).nombre }); });
      LE.guardar(); avisar();
    }).then(function () { cargando = null; }, function (e) { cargando = null; throw e; });
    return cargando;
  }

  /* ---------- Cola de envío (ventas y retiros hechos en la caja) ---------- */
  var vaciando = null;
  function vaciarCola() {
    if (vaciando) return vaciando;
    if (!enLinea() || !(E.outbox || []).length) return Promise.resolve(0);
    vaciando = (function paso(n) {
      var it = (E.outbox || [])[0]; if (!it) return Promise.resolve(n);
      var q = it.tipo === 'venta' ? rpc('crear_venta', { p: it.payload }) : rpc('egreso_caja', { p_concepto: it.payload.concepto, p_monto: it.payload.monto, p_id: it.payload.id, p_ts: it.payload.ts });
      return q.then(function (srv) {
        E.outbox.shift();
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
    var antes = (E.outbox || []).some(function (o) { return o.id === d.id; }) || E.ventas.some(function (v) { return v.id === d.id; });
    var v = orig.crearVenta(d);
    if (antes) return v;
    v.sync = false;
    E.outbox.push({ tipo: 'venta', id: v.id, payload: { id: v.id, num: v.num, ts: v.ts, turno: v.turno, items: v.items.map(function (i) { return { p: i.p, c: i.c }; }), pagos: v.pagos.map(function (p) { return { m: p.m, monto: p.monto }; }), recibido: v.recibido } });
    LE.guardar(); setTimeout(function () { vaciarCola().then(function (n) { if (n) { avisar(); } }, function () { }); }, 0);
    return v;
  };
  LE.egresoCaja = function (concepto, monto) {
    orig.egresoCaja(concepto, monto);
    var mv = E.movCaja[E.movCaja.length - 1];
    E.outbox.push({ tipo: 'egreso', id: mv.id, payload: { id: mv.id, concepto: mv.concepto, monto: -mv.monto, ts: mv.ts } });
    LE.guardar(); setTimeout(function () { vaciarCola().then(function () { }, function () { }); }, 0);
  };
  LE.pendientes = function () { return (E.ventas || []).filter(function (v) { return v.sync === false; }); };

  /* ---------- Todo lo demás: en el servidor, y se refresca la copia ---------- */
  function hacer(nombre, args, despues) {
    return rpc(nombre, args).then(function (r) { return cargar().then(function () { return despues ? despues(r) : r; }, function () { return despues ? despues(r) : r; }); });
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
  function ciclo() {
    if (enLogin || document.hidden || !enLinea() || !LE.usuario()) return;
    vaciarCola().then(function () { if (!(E.outbox || []).length) return cargar(); }).catch(function (e) { if (e && e.sesion) { limpiarPerfil(); location.replace('../index.html'); } });
  }
  setInterval(ciclo, 45000);
  window.addEventListener('online', ciclo);
  document.addEventListener('visibilitychange', ciclo);
  if (!enLogin) setTimeout(ciclo, 30);
})();
