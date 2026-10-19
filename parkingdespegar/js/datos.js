/* ============================================================
   PARKING DESPEGAR — Datos del negocio, en línea (Supabase)
   Todo vive en la base de datos: reservas, pagos, caja, facturas,
   usuarios y registro de cambios. Cada pantalla abierta (mostrador,
   celular del chofer, casa de la dueña) recibe los cambios en vivo.
   Las escrituras pasan por funciones del servidor que controlan el
   rol y calculan precios y saldos (ver supabase/esquema.sql).
   ============================================================ */
(function () {
  'use strict';

  var C = window.PD_CONFIG || {};
  var DIA = 86400000;
  var configurado = !!(C.url && C.clave && window.supabase && window.supabase.createClient);
  var sb = configurado ? window.supabase.createClient(C.url, C.clave, {
    auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true }
  }) : null;

  function vacio() {
    return {
      tarifas: { techado: 0, aire: 0, valet: 0, graciaHoras: 0, minimoDias: 1 },
      empresa: { razon: '', rut: '', direccion: '', iva: 22 },
      lugares: [], reservas: [], pagos: [], facturas: [], usuarios: [], auditoria: [], asistencias: [], extras: [], promociones: [],
      caja: { turnoActual: null, cerrados: [] }
    };
  }
  var cache = vacio();
  var perfil = null;
  var oyentes = [];
  var canal = null;

  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function pad4(n) { return ('000' + n).slice(-4); }

  /* ---------- Precio (estimado en pantalla; el que vale lo calcula el servidor) ---------- */
  function dias(entrada, salida, t) {
    t = t || cache.tarifas;
    var horas = (new Date(salida) - new Date(entrada)) / 3600000;
    var d = Math.ceil(Math.max(0, horas - (t.graciaHoras || 0)) / 24);
    return Math.max(t.minimoDias || 1, d);
  }
  /* r.descuentoPct (promoción, sobre el estacionamiento) y r.extrasTotal (lavado, service…) son opcionales */
  function precio(r, t) {
    t = t || cache.tarifas;
    var d = dias(r.entrada, r.salida, t);
    var base = d * (r.lugarTipo === 'techado' ? t.techado : t.aire);
    var extra = r.servicio === 'valet' ? t.valet : 0;
    var descuento = Math.round((base + extra) * (r.descuentoPct || 0) / 100);
    var extras = r.extrasTotal || 0;
    return { dias: d, base: base, extra: extra, descuento: descuento, extras: extras, total: base + extra - descuento + extras };
  }

  /* ---------- Errores en castellano ---------- */
  function amigable(e) {
    var m = (e && (e.message || e.error_description)) || 'No se pudo completar.';
    if (/Failed to fetch|NetworkError|network/i.test(m)) m = 'No hay conexión con el servidor. Revisá internet y probá de nuevo.';
    else if (/Invalid login credentials/i.test(m)) m = 'Email o contraseña incorrectos.';
    else if (/Email not confirmed/i.test(m)) m = 'Falta confirmar el email: revisá tu casilla.';
    else if (/User already registered/i.test(m)) m = 'Ya hay una cuenta con ese email. Probá ingresar.';
    else if (/Password should be at least/i.test(m)) m = 'La contraseña tiene que tener al menos 8 caracteres.';
    else if (/rate limit|too many/i.test(m)) m = 'Demasiados intentos seguidos. Esperá un minuto y probá de nuevo.';
    else if (/permission denied|row-level security|42501/i.test(m) || (e && e.code === '42501')) m = 'No tenés permiso para hacer esto.';
    else if (e && e.code === 'PGRST202') m = 'Esta función todavía no está activada en la base de datos. Avisale a Livo.';
    var err = new Error(m); err.original = e; return err;
  }
  async function rpc(nombre, args) {
    if (!sb) throw new Error('La base de datos todavía no está conectada.');
    var r = await sb.rpc(nombre, args || {});
    if (r.error) throw amigable(r.error);
    return r.data;
  }

  /* ---------- De la base a la forma que usan las pantallas ---------- */
  function aReserva(x, pagos) {
    var ps = (pagos[x.id] || []).map(function (p) { return { monto: p.monto, medio: p.medio, ref: p.ref, fecha: p.fecha, usuario: p.usuario_nombre }; });
    var ult = ps[ps.length - 1] || {};
    return {
      id: x.id, codigo: x.codigo, creada: x.creada, origen: x.origen,
      cliente: { nombre: x.cliente_nombre, telefono: x.cliente_telefono, email: x.cliente_email },
      vehiculo: { matricula: x.matricula, modelo: x.modelo, color: x.color, tipo: x.vehiculo_tipo || '' },
      extras: x.extras || [], extrasTotal: x.extras_total || 0, descuentoPct: x.descuento_pct || 0,
      promo: x.promo_codigo ? { codigo: x.promo_codigo, pct: x.descuento_pct, descuento: x.descuento } : null,
      facturaDatos: x.factura_rut ? { rut: x.factura_rut, razon: x.factura_razon } : null,
      comentarios: x.comentarios || '',
      lugarTipo: x.lugar_tipo, servicio: x.servicio, pasajeros: x.pasajeros,
      entrada: x.entrada, salida: x.salida, vuelo: { ida: x.vuelo_ida, vuelta: x.vuelo_vuelta },
      lugar: x.lugar, checkin: x.checkin, checkout: x.checkout,
      traslado: { ida: x.traslado_ida, vuelta: x.traslado_vuelta },
      notas: x.notas, estado: x.estado, total: x.total, factura: x.factura,
      pago: {
        estado: x.pagado >= x.total && x.total > 0 ? 'pagado' : x.pagado > 0 ? 'parcial' : 'pendiente',
        monto: x.pagado, medio: ult.medio || null, ref: ult.ref || null, fecha: ult.fecha || null
      },
      pagos: ps
    };
  }
  function datosDe(r) { return r.error ? [] : (r.data || []); }

  async function cargar() {
    if (!sb || !perfil || !perfil.activo) return cache;
    var q = await Promise.all([
      sb.from('tarifas').select('*').eq('id', 1).maybeSingle(),
      sb.from('empresa').select('*').eq('id', 1).maybeSingle(),
      sb.from('lugares').select('id,tipo,orden').order('orden'),
      sb.from('reservas').select('*').order('entrada'),
      sb.from('pagos').select('*').order('fecha'),
      sb.from('caja_turnos').select('*').order('apertura', { ascending: false }).limit(40),
      sb.from('caja_movimientos').select('*').order('hora', { ascending: false }).limit(1000),
      sb.from('facturas').select('*').order('numero', { ascending: false }),
      sb.from('perfiles').select('*').order('creado'),
      sb.from('auditoria').select('*').order('id', { ascending: false }).limit(300),
      sb.from('asistencias').select('id,usuario_id,usuario_nombre,entrada,salida').gte('entrada', new Date(Date.now() - 62 * DIA).toISOString()).order('entrada', { ascending: false }),
      sb.from('extras').select('*').order('orden'),
      sb.from('promociones').select('*').order('creada', { ascending: false })
    ]);
    /* Si la base todavía no tiene las tablas de horarios, extras o promociones, el resto anda igual */
    [10, 11, 12].forEach(function (i) { if (q[i].error) q[i] = { data: [] }; });
    var falla = q.filter(function (r) { return r.error; })[0];
    if (falla) throw amigable(falla.error);
    var d = vacio(), t = q[0].data, e = q[1].data;
    if (t) d.tarifas = { techado: t.techado, aire: t.aire, valet: t.valet, graciaHoras: t.gracia_horas, minimoDias: t.minimo_dias };
    if (e) d.empresa = { razon: e.razon, rut: e.rut, direccion: e.direccion, iva: e.iva };
    d.lugares = datosDe(q[2]);
    d.pagos = datosDe(q[4]);
    var porReserva = {};
    d.pagos.forEach(function (p) { (porReserva[p.reserva_id] = porReserva[p.reserva_id] || []).push(p); });
    d.reservas = datosDe(q[3]).map(function (x) { return aReserva(x, porReserva); });
    var movs = datosDe(q[6]);
    var cobradoDe = function (id) { return movs.filter(function (m) { return m.turno_id === id && m.monto > 0; }).reduce(function (s, m) { return s + m.monto; }, 0); };
    datosDe(q[5]).forEach(function (x) {
      if (!x.cierre) {
        d.caja.turnoActual = {
          id: x.id, apertura: x.apertura, base: x.base, usuario: x.abrio_nombre, turno: x.turno,
          movimientos: movs.filter(function (m) { return m.turno_id === x.id; })
            .map(function (m) { return { id: m.id, hora: m.hora, concepto: m.concepto, medio: m.medio, monto: m.monto, usuario: m.usuario_nombre }; })
        };
      } else {
        d.caja.cerrados.push({ id: x.id, apertura: x.apertura, cierre: x.cierre, turno: x.turno, abrio: x.abrio_nombre, cerro: x.cerro_nombre,
          base: x.base, esperado: x.esperado, contado: x.contado, cobrado: cobradoDe(x.id) });
      }
    });
    d.facturas = datosDe(q[7]).map(function (f) {
      return { id: f.id, serie: f.serie, numero: f.numero, tipo: f.tipo, fecha: f.fecha, reservaId: f.reserva_id, codigo: f.codigo, cliente: f.cliente, lineas: f.lineas, total: f.total, iva: f.iva };
    });
    d.usuarios = datosDe(q[8]);
    d.auditoria = datosDe(q[9]).map(function (a) { return { fecha: a.fecha, usuario: a.usuario_nombre, accion: a.accion }; });
    d.extras = datosDe(q[11]);
    d.promociones = datosDe(q[12]);
    d.asistencias = datosDe(q[10]).map(function (a) { return { id: a.id, usuarioId: a.usuario_id, nombre: a.usuario_nombre, entrada: a.entrada, salida: a.salida }; });
    cache = d;
    return cache;
  }

  async function leerPerfil() {
    perfil = null;
    var s = await sb.auth.getUser();
    if (!s.data || !s.data.user) return null;
    var r = await sb.from('perfiles').select('*').eq('id', s.data.user.id).maybeSingle();
    perfil = r.data || { id: s.data.user.id, nombre: '', email: s.data.user.email, rol: 'personal', activo: false };
    return perfil;
  }

  function avisar(cambios) { oyentes.forEach(function (fn) { try { fn(cache, cambios || []); } catch (e) { console.error(e); } }); }

  /* ---------- En vivo: cualquier cambio en la base recarga y avisa a la pantalla ---------- */
  var pendientes = [], tempo = null;
  function escuchar() {
    if (!sb) return;
    if (canal) sb.removeChannel(canal);
    canal = sb.channel('pd-' + Math.random().toString(36).slice(2))
      .on('postgres_changes', { event: '*', schema: 'public' }, function (p) {
        pendientes.push({ tabla: p.table, tipo: p.eventType, nuevo: p.new || {}, viejo: p.old || {} });
        clearTimeout(tempo);
        tempo = setTimeout(refrescar, 350);
      })
      .subscribe();
  }
  async function refrescar() {
    var cambios = pendientes; pendientes = [];
    try {
      var antes = perfil && perfil.activo;
      if (cambios.some(function (c) { return c.tabla === 'perfiles'; })) await leerPerfil();
      if (perfil && perfil.activo) await cargar();
      if (antes && !(perfil && perfil.activo)) cache = vacio();
    } catch (e) { console.error(e); }
    avisar(cambios);
  }

  /* ---------- Sesión ---------- */
  var enRecuperacion = false;
  if (sb) sb.auth.onAuthStateChange(function (ev) { if (ev === 'PASSWORD_RECOVERY') { enRecuperacion = true; avisar([{ tabla: 'sesion', tipo: 'recuperar' }]); } });

  async function iniciar() {
    if (!sb) return null;
    var s = await sb.auth.getSession();
    if (s.data && s.data.session) {
      await leerPerfil();
      if (perfil && perfil.activo) await cargar();
      escuchar();
    }
    return perfil;
  }
  async function ingresar(email, clave) {
    if (!sb) throw new Error('La base de datos todavía no está conectada.');
    var r = await sb.auth.signInWithPassword({ email: email, password: clave });
    if (r.error) throw amigable(r.error);
    await leerPerfil();
    if (perfil && perfil.activo) { await cargar(); try { await rpc('auditar', { p_accion: 'Ingresó al sistema' }); } catch (e) { /* no frena el ingreso */ } }
    escuchar();
    return perfil;
  }
  async function registrarse(nombre, email, clave) {
    if (!sb) throw new Error('La base de datos todavía no está conectada.');
    var r = await sb.auth.signUp({ email: email, password: clave, options: { data: { nombre: nombre }, emailRedirectTo: location.origin + location.pathname } });
    if (r.error) throw amigable(r.error);
    if (!r.data.session) return { confirmar: true };
    await leerPerfil();
    if (perfil && perfil.activo) await cargar();
    escuchar();
    return { confirmar: false, perfil: perfil };
  }
  async function salir() {
    if (!sb) return;
    try { await rpc('auditar', { p_accion: 'Salió del sistema' }); } catch (e) { /* igual sale */ }
    if (canal) { sb.removeChannel(canal); canal = null; }
    await sb.auth.signOut();
    perfil = null; cache = vacio();
  }
  async function recuperar(email) {
    var r = await sb.auth.resetPasswordForEmail(email, { redirectTo: location.origin + location.pathname });
    if (r.error) throw amigable(r.error);
  }
  async function nuevaClave(clave) {
    var r = await sb.auth.updateUser({ password: clave });
    if (r.error) throw amigable(r.error);
    enRecuperacion = false;
    await leerPerfil();
    if (perfil && perfil.activo) await cargar();
    escuchar();
  }

  /* ---------- Salud de la base ----------
     El plan gratis de Supabase pausa el proyecto tras una semana sin uso.
     salud() dice si la base responde y, si no, por qué: sin internet, en pausa,
     despertando o caída. despertar() le pide al servicio «reactivar»
     (supabase/servicio/worker.js, dirección en js/config.js) que la despierte:
     la llave de Supabase vive en ese servicio, nunca en la página. */
  function conTiempo(promesa, ms) {
    var t;
    var limite = new Promise(function (_, no) { t = setTimeout(function () { no(new Error('tiempo')); }, ms); });
    return Promise.race([promesa, limite]).finally(function () { clearTimeout(t); });
  }
  async function servicio(ruta, metodo) {
    if (!C.reactivar) return null;
    try {
      var r = await conTiempo(fetch(C.reactivar.replace(/\/+$/, '') + ruta, { method: metodo || 'GET', cache: 'no-store' }), 10000);
      var j = await r.json();
      return (j && j.estado) || null;
    } catch (e) { return null; }
  }
  async function hayInternet() {
    try { await conTiempo(fetch(location.pathname + '?vivo=' + Date.now(), { method: 'HEAD', cache: 'no-store' }), 6000); return true; }
    catch (e) { return false; }
  }
  async function salud() {
    if (!sb) return 'ok';
    try {
      var r = await conTiempo(sb.from('tarifas').select('id').limit(1), 8000);
      if (!r.error || (r.status >= 400 && r.status < 500)) return 'ok';
    } catch (e) { /* no respondió a tiempo */ }
    if (!(await hayInternet())) return 'sin-internet';
    var s = await servicio('/estado');
    if (s === 'activa') return 'caida';
    if (s === 'pausando' || s === 'despertando') return s;
    return 'pausada';
  }
  function despertar() { return servicio('/reactivar', 'POST'); }

  /* ---------- Escrituras: siempre por el servidor, después se recarga ---------- */
  async function hacer(nombre, args) { var res = await rpc(nombre, args); await cargar(); avisar([]); return res; }
  async function actualizar(tabla, cambios, filtro) {
    var r = await sb.from(tabla).update(cambios).match(filtro).select();
    if (r.error) throw amigable(r.error);
    if (!r.data || !r.data.length) throw new Error('No tenés permiso para hacer esto.');
    await cargar(); avisar([]);
    return r.data[0];
  }

  window.PD = {
    DIA: DIA, pad: pad, pad4: pad4,
    configurado: configurado,
    datos: function () { return cache; },
    perfil: function () { return perfil; },
    enRecuperacion: function () { return enRecuperacion; },
    precio: precio, dias: dias,
    lugaresLibres: function (tipo) {
      var ocupados = {};
      cache.reservas.forEach(function (r) { if (r.estado === 'en_predio' && r.lugar) ocupados[r.lugar] = true; });
      return cache.lugares.filter(function (l) { return (!tipo || l.tipo === tipo) && !ocupados[l.id]; });
    },
    alCambiar: function (fn) { oyentes.push(fn); },
    salud: salud, despertar: despertar,
    iniciar: iniciar, ingresar: ingresar, registrarse: registrarse, salir: salir,
    recuperar: recuperar, nuevaClave: nuevaClave, cargar: cargar,

    /* Operación */
    crearReserva: function (p) { return hacer('crear_reserva', { p: p }); },
    registrarPago: function (id, monto, medio, ref) { return hacer('registrar_pago', { p_reserva: id, p_monto: monto, p_medio: medio, p_ref: ref || '' }); },
    registrarEntrada: function (id, o) {
      return hacer('registrar_entrada', { p_reserva: id, p_lugar: o.lugar, p_notas: o.notas || '', p_medio: o.medio || null,
        p_tipo_factura: o.tipoFactura, p_rut: o.rut || '', p_razon: o.razon || '' });
    },
    registrarSalida: function (id, medioDif) { return hacer('registrar_salida', { p_reserva: id, p_medio_dif: medioDif || '' }); },
    cancelar: function (id) { return hacer('cancelar_reserva', { p_reserva: id }); },
    traslado: function (id, tipo, estado) { return hacer('marcar_traslado', { p_reserva: id, p_tipo: tipo, p_estado: estado }); },
    abrirCaja: async function (base, turno) {
      /* Si la base todavía no tiene los turnos, abre la caja como antes */
      try { return await hacer('abrir_caja', { p_base: base, p_turno: turno || null }); }
      catch (e) { if (e.original && e.original.code === 'PGRST202') return hacer('abrir_caja', { p_base: base }); throw e; }
    },
    cambiarFechas: function (id, entrada, salida) { return hacer('cambiar_fechas', { p_reserva: id, p_entrada: entrada, p_salida: salida }); },
    marcarJornada: function () { return hacer('marcar_asistencia'); },
    egreso: function (concepto, monto) { return hacer('egreso_caja', { p_concepto: concepto, p_monto: monto }); },
    cerrarCaja: function (contado) { return hacer('cerrar_caja', { p_contado: contado }); },
    configurarLugares: function (techado, aire) { return hacer('configurar_lugares', { p_techado: techado, p_aire: aire }); },
    auditar: function (accion) { return rpc('auditar', { p_accion: accion }).catch(function () {}); },
    guardarTarifas: function (t) {
      return actualizar('tarifas', { techado: t.techado, aire: t.aire, valet: t.valet, gracia_horas: t.graciaHoras, minimo_dias: t.minimoDias }, { id: 1 });
    },
    guardarEmpresa: function (e) { return actualizar('empresa', { razon: e.razon, rut: e.rut, direccion: e.direccion, iva: e.iva }, { id: 1 }); },
    actualizarPerfil: function (id, cambios) { return actualizar('perfiles', cambios, { id: id }); },
    guardarPromocion: function (p) { return hacer('guardar_promocion', { p: p }); },
    borrarPromocion: function (id) { return hacer('borrar_promocion', { p_id: id }); },
    guardarExtra: function (p) { return hacer('guardar_extra', { p: p }); },
    borrarExtra: function (id) { return hacer('borrar_extra', { p_id: id }); },

    /* Asistente de WhatsApp: se lee solo en su sección (si falta correr asistente.sql, el resto sigue andando) */
    asistenteEstado: function () { return rpc('asistente_estado'); },
    asistenteAgregar: function (tel, nombre) { return rpc('asistente_agregar', { p_telefono: tel, p_nombre: nombre || '' }); },
    asistenteQuitar: function (tel) { return rpc('asistente_quitar', { p_telefono: tel }); },
    asistenteNuevaClave: function () { return rpc('asistente_nueva_clave'); },
    servicioInfo: async function () {
      if (!C.reactivar) return null;
      try { var r = await conTiempo(fetch(C.reactivar.replace(/\/+$/, '') + '/', { cache: 'no-store' }), 8000); return await r.json(); }
      catch (e) { return null; }
    },

    /* Web pública */
    tarifasPublicas: async function () {
      if (!sb) throw new Error('La reserva online no está disponible en este momento.');
      var r = await sb.from('tarifas').select('*').eq('id', 1).maybeSingle();
      if (r.error || !r.data) throw amigable(r.error || {});
      cache.tarifas = { techado: r.data.techado, aire: r.data.aire, valet: r.data.valet, graciaHoras: r.data.gracia_horas, minimoDias: r.data.minimo_dias };
      return cache.tarifas;
    },
    /* Servicios extra y promociones: si la base todavía no los tiene, la web sigue sin ellos */
    extrasWeb: async function () {
      if (!sb) return [];
      var r = await sb.from('extras').select('id,nombre,detalle,precio').eq('activo', true).order('orden');
      return r.error ? [] : r.data || [];
    },
    promocionesWeb: function () { return rpc('promociones_web').catch(function () { return []; }); },
    promoWeb: function (codigo) { return rpc('promo_web', { p_codigo: codigo }); },
    disponibilidad: function (entrada, salida) { return rpc('disponibilidad_web', { p_entrada: entrada, p_salida: salida }); },
    reservarWeb: function (p) { return rpc('crear_reserva_web', { p: p }); },
    pagarWeb: function (id, token) { return rpc('pagar_reserva_web', { p_id: id, p_token: token }); },
    verReservaWeb: function (codigo, telefono) { return rpc('reserva_web_ver', { p_codigo: codigo, p_telefono: telefono }); },
    cambiarReservaWeb: function (codigo, telefono, entrada, salida) {
      return rpc('reserva_web_cambiar', { p_codigo: codigo, p_telefono: telefono, p_entrada: entrada, p_salida: salida });
    }
  };
})();
