/* ============================================================
   ANCAP SANTA MARÍA — datos y reglas (tienda y panel)
   Borrador: todo vive en el navegador (localStorage). Tienda y panel comparten
   los datos, así que un pedido hecho en la tienda aparece en el panel abierto
   en otra pestaña del mismo navegador. Para que funcione entre aparatos hace falta
   la base real (Supabase), igual que en Parking Despegar y La Estrella.
   Importes en pesos enteros. Cantidades por peso en kg (pasos de 0,5).
   ============================================================ */
(function () {
  'use strict';
  var KEY = 'ag_v3', KCART = 'ag_carrito_v1', KSES = 'ag_sesion_v1';
  var TZ = 'America/Montevideo';
  var CAT = window.AG_CATALOGO || { cats: [], prov: [], prods: [] };

  var ESTADOS = ['nuevo', 'preparando', 'en_camino', 'entregado', 'cancelado'];
  var ESTADO_TXT = { nuevo: 'Nuevo', preparando: 'Preparando', en_camino: 'En camino', entregado: 'Entregado', cancelado: 'Cancelado' };
  var CONSULTA_TXT = { nueva: 'Nueva', respondida: 'Respondida', cerrada: 'Cerrada' };
  var SERVICIOS = [
    { id: 'cubiertas', nombre: 'Venta de cubiertas', icono: 'disc-3', texto: 'Cubiertas para tu auto o camioneta. Consultá medidas y disponibilidad.', confirmado: true },
    { id: 'alineacion', nombre: 'Alineación y balanceo', icono: 'gauge', texto: 'Para que el auto no tire para un lado ni vibre en la ruta.', confirmado: true },
    { id: 'taller', nombre: 'Taller mecánico', icono: 'wrench', texto: 'Revisión y reparación. Contanos qué le pasa y lo vemos con calma.', confirmado: true },
    { id: 'gomeria', nombre: 'Gomería', icono: 'circle-dot', texto: 'Arreglo de pinchaduras, cambio de rueda y venta de neumáticos.', confirmado: false },   // PENDIENTE confirmar con la clienta
    { id: 'lavadero', nombre: 'Lavadero', icono: 'droplets', texto: 'Lavado del auto, por fuera y por dentro, para dejarlo prolijo.', confirmado: false },                                   // PENDIENTE confirmar con la clienta
    { id: 'lubricentro', nombre: 'Lubricentro', icono: 'fuel', texto: 'Cambio de aceite y de filtros, lubricantes y líquidos del auto.', confirmado: false }                      // PENDIENTE confirmar con la clienta
  ];
  var PERMISOS = {
    admin: ['inicio', 'pedidos', 'consultas', 'productos', 'zonas', 'ofertas', 'clientes', 'reportes', 'compras', 'equipo', 'registro', 'ajustes'],
    mostrador: ['inicio', 'pedidos', 'productos', 'clientes'],
    taller: ['inicio', 'consultas']
  };
  var ROL_TXT = { admin: 'Acceso total', mostrador: 'Pedidos y stock', taller: 'Consultas de vehículos' };

  /* ---------- utilidades ---------- */
  function pad(n, l) { n = String(n); while (n.length < (l || 2)) n = '0' + n; return n; }
  function mulberry32(a) { return function () { a |= 0; a = a + 0x6D2B79F5 | 0; var t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
  function uid(p) { return p + Date.now().toString(36) + Math.random().toString(36).slice(2, 6); }
  function clon(o) { return JSON.parse(JSON.stringify(o)); }
  function redondeo(n) { return Math.round(n); }
  function pesos(n) { n = Math.round(Number(n) || 0); var s = String(Math.abs(n)).replace(/\B(?=(\d{3})+(?!\d))/g, '.'); return (n < 0 ? '-$ ' : '$ ') + s; }
  function cant(n, u) { return u === 'kg' ? (Math.round(n * 1000) / 1000).toString().replace('.', ',') + ' kg' : String(n); }
  var fDia = new Intl.DateTimeFormat('en-CA', { timeZone: TZ, year: 'numeric', month: '2-digit', day: '2-digit' });
  var fHora = new Intl.DateTimeFormat('es-UY', { timeZone: TZ, hour: '2-digit', minute: '2-digit', hour12: false });
  var fCorta = new Intl.DateTimeFormat('es-UY', { timeZone: TZ, day: 'numeric', month: 'short' });
  var fDiaSem = new Intl.DateTimeFormat('es-UY', { timeZone: TZ, weekday: 'short', day: 'numeric' });
  function dia(ts) { return fDia.format(new Date(ts)); }
  function hora(ts) { return fHora.format(new Date(ts)); }
  function fecha(ts) { return fCorta.format(new Date(ts)).replace('.', '') + ', ' + hora(ts); }
  function diaCorto(ts) { return fDiaSem.format(new Date(ts)).replace('.', ''); }
  function hace(ts) {
    var m = Math.max(0, Math.round((Date.now() - ts) / 60000));
    if (m < 1) return 'recién'; if (m < 60) return 'hace ' + m + ' min';
    var h = Math.round(m / 60); if (h < 24) return 'hace ' + h + ' h';
    var d = Math.round(h / 24); return 'hace ' + d + (d === 1 ? ' día' : ' días');
  }
  function soloDigitos(s) { return String(s || '').replace(/\D/g, ''); }
  function celularUY(s) {
    var d = soloDigitos(s);
    if (d.indexOf('598') === 0) d = '0' + d.slice(3);
    return /^09\d{7}$/.test(d) ? d : '';
  }
  function fmtCel(d) { d = celularUY(d); return d ? d.slice(0, 3) + ' ' + d.slice(3, 6) + ' ' + d.slice(6) : ''; }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }

  /* ---------- siembra ---------- */
  var ZONAS = [
    ['Goes', 90, 500, 1200], ['Reducto', 110, 500, 1200], ['Aguada', 120, 600, 1400], ['Villa Muñoz', 120, 600, 1400],
    ['Jacinto Vera', 140, 700, 1500], ['La Comercial', 140, 700, 1500], ['Cordón', 160, 800, 1600], ['Centro', 170, 800, 1600],
    ['Larrañaga', 170, 800, 1600], ['Unión', 220, 900, 1800]
  ];
  var NOMBRES = ['Lucía', 'Martín', 'Camila', 'Santiago', 'Valentina', 'Joaquín', 'Florencia', 'Matías', 'Sofía', 'Agustín', 'Carolina', 'Diego', 'Natalia', 'Gonzalo', 'Paula', 'Federico'];
  var APELLIDOS = ['Rodríguez', 'Pereira', 'González', 'Techera', 'Silva', 'Martínez', 'Cabrera', 'Fernández', 'Núñez', 'Píriz', 'Acosta', 'Olivera'];
  var CALLES = ['Garibaldi', 'José L. Terra', 'Av. Italia', 'Gral. Flores', 'Yaguarón', 'Br. Artigas', 'Carlos Roxlo', 'Cerro Largo', 'San José', 'Agraciada'];
  var AUTOS = [['Volkswagen', 'Gol', 2014], ['Chevrolet', 'Onix', 2019], ['Fiat', 'Uno', 2012], ['Renault', 'Kangoo', 2016], ['Toyota', 'Hilux', 2018], ['Peugeot', '208', 2020], ['Ford', 'Fiesta', 2013], ['Suzuki', 'Swift', 2017]];

  function sembrar() {
    var rnd = mulberry32(26112026);
    var ahora = Date.now(), H = 3600000, D = 24 * H;
    var E = {
      version: 3, sembrado: ahora,
      negocio: {
        nombre: 'Ancap Santa María', direccion: 'Av. Gral. José Garibaldi 1902, esq. José L. Terra', barrio: 'Goes, Montevideo',
        horario: 'Abierto las 24 horas, todos los días', telefono: '2203 4196', telefonoLink: '+59822034196',
        whatsapp: '',   // PENDIENTE: celular de WhatsApp de la estación (9 dígitos, 09X XXX XXX)
        instagram: '',  // PENDIENTE
        mapa: 'https://www.google.com/maps/search/?api=1&query=Av.+Gral.+Garibaldi+1902+Montevideo'
      },
      categorias: CAT.cats.slice(),
      proveedores: CAT.prov.map(function (v) { v.activo = true; return v; }),
      productos: CAT.prods.map(function (p, i) {
        var kg = p.u === 'kg', f = 1.2 + rnd() * 3.2;
        return { id: p.id, cat: p.cat, nombre: p.n, unidad: p.u, costo: p.c, precio: p.p, oferta: p.o || 0, minimo: p.m, prov: p.v,
          stock: kg ? Math.round(p.m * f * 2) / 2 : Math.round(p.m * f), activo: true, destacado: !!p.d, alcohol: !!p.a, foto: 'img/productos/' + p.id + '.png' };
      }),
      zonas: ZONAS.map(function (z, i) { return { id: 'z' + (i + 1), nombre: z[0], costo: z[1], minimo: z[2], gratisDesde: z[3], activa: true }; }),
      banners: [
        { id: 'b1', titulo: 'Pedí el súper y te lo llevamos', texto: 'Envío a tu barrio. Pagás online y seguís el pedido.', boton: 'Hacer mi pedido', href: 'tienda.html', activo: true, tono: 'azul' },
        { id: 'b2', titulo: 'Cerveza y refrescos', texto: 'Para el fin de semana, sin salir de casa.', boton: 'Ver bebidas', cat: 'Bebidas', activo: true, tono: 'amarillo' },
        { id: 'b6', titulo: 'Vinos, whisky y gin', texto: 'Para regalar o para la mesa del finde.', boton: 'Ver vinos y whisky', cat: 'Vinos y licores', activo: true, tono: 'amarillo' },
        { id: 'b3', titulo: 'Cubiertas, alineación y taller', texto: 'Contanos qué necesita tu vehículo.', boton: 'Ver servicios', href: 'servicios.html', activo: true, tono: 'oscuro' },
        { id: 'b4', titulo: 'Abiertos las 24 horas', texto: 'Estación, súper y taller en Garibaldi y José L. Terra.', boton: 'Cómo llegar', href: 'index.html#donde', activo: true, tono: 'estacion' },
        { id: 'b5', titulo: 'Para la heladera', texto: 'Lácteos y fiambres con envío a tu barrio.', boton: 'Ver lácteos', cat: 'Lácteos', activo: true, tono: 'amarillo' }
      ],
      pedidos: [], consultas: [], compras: [], movStock: [], registro: [], avisos: [],
      usuarios: [
        { id: 'u1', nombre: 'Administración', rol: 'admin', pin: '1234', activo: true },   // PENDIENTE: nombres reales
        { id: 'u2', nombre: 'Mostrador', rol: 'mostrador', pin: '1111', activo: true },
        { id: 'u3', nombre: 'Taller', rol: 'taller', pin: '2222', activo: true }
      ],
      config: { dueno: { celulares: [], eventos: { pedido: true, consulta: true, stock: true, cancelado: true } }, sonido: true },
      contador: { pedido: 1000, consulta: 200, compra: 0 }
    };
    // algunos productos por debajo del mínimo, para que el panel muestre qué reponer
    [6, 12, 25, 33, 40, 55, 61].forEach(function (i) { E.productos[i].stock = E.productos[i].unidad === 'kg' ? Math.max(0.5, Math.floor(E.productos[i].minimo / 2)) : Math.max(1, Math.floor(E.productos[i].minimo / 2)); });
    [20, 70].forEach(function (i) { E.productos[i].stock = 0; });
    // historial de pedidos (14 días) — todo de ejemplo
    var prods = E.productos, zonas = E.zonas, n = 0;
    var hm = hora(ahora).split(':'), medianoche = ahora - (parseInt(hm[0], 10) * 60 + parseInt(hm[1], 10)) * 60000;   // 00:00 de hoy, hora de Montevideo
    function cliente(i) {
      var nom = NOMBRES[i % NOMBRES.length] + ' ' + APELLIDOS[(i * 5) % APELLIDOS.length];
      return { nombre: nom, tel: '099' + pad(100000 + i * 137, 6).slice(0, 6), direccion: CALLES[i % CALLES.length] + ' ' + (100 + (i * 37) % 1900) };
    }
    for (var d = 13; d >= 0; d--) {
      var cuantos = 3 + Math.floor(rnd() * 5) + (d % 7 === 5 || d % 7 === 6 ? 2 : 0);
      if (d === 0) cuantos = Math.max(cuantos, 9);
      for (var k = 0; k < cuantos; k++) {
        var cl = cliente(Math.floor(rnd() * 24)), z = zonas[Math.floor(rnd() * rnd() * zonas.length)];
        var ts = medianoche - d * D + Math.floor(rnd() * D);   // repartido por día calendario
        if (d === 0) { var tope = ahora - 125 * 60000; ts = k < 5 ? ahora - [9, 24, 52, 83, 101][k] * 60000 : (tope > medianoche ? medianoche + Math.floor(rnd() * (tope - medianoche)) : tope - Math.floor(rnd() * H)); }
        var items = [], usados = {}, c = 2 + Math.floor(rnd() * 6);
        for (var j = 0; j < c; j++) {
          var p = prods[Math.floor(rnd() * prods.length)]; if (usados[p.id]) continue; usados[p.id] = 1;
          var q = p.unidad === 'kg' ? (1 + Math.floor(rnd() * 4)) / 2 : 1 + Math.floor(rnd() * 3);
          var pu = p.oferta || p.precio;
          items.push({ id: p.id, nombre: p.nombre, unidad: p.unidad, cant: q, precio: pu, subtotal: redondeo(pu * q) });
        }
        var sub = items.reduce(function (a, b) { return a + b.subtotal; }, 0);
        if (sub < z.minimo) { var p0 = prods[0]; items.push({ id: p0.id, nombre: p0.nombre, unidad: p0.unidad, cant: 4, precio: p0.precio, subtotal: p0.precio * 4 }); sub += p0.precio * 4; }
        var env = sub >= z.gratisDesde ? 0 : z.costo;
        n++;
        var ped = { id: 'ped' + n, num: 1000 + n, ts: ts, cliente: { nombre: cl.nombre, tel: cl.tel, direccion: cl.direccion, referencia: '', zona: z.id, zonaNombre: z.nombre },
          items: items, subtotal: sub, envio: env, total: sub + env, pago: { medio: 'muestra', estado: 'pagado' }, estado: 'entregado', nota: '', historial: [] };
        var edad = ahora - ts;
        if (d > 0 && rnd() < 0.05) ped.estado = 'cancelado';
        else if (edad < 40 * 60000) ped.estado = 'nuevo';
        else if (edad < 75 * 60000) ped.estado = 'preparando';
        else if (edad < 110 * 60000) ped.estado = 'en_camino';
        ped.historial = [{ estado: 'nuevo', ts: ts, quien: 'Cliente' }];
        if (ped.estado !== 'nuevo' && ped.estado !== 'cancelado') ped.historial.push({ estado: 'preparando', ts: ts + 9 * 60000, quien: 'Mostrador' });
        if (ped.estado === 'en_camino' || ped.estado === 'entregado') ped.historial.push({ estado: 'en_camino', ts: ts + 28 * 60000, quien: 'Mostrador' });
        if (ped.estado === 'entregado') ped.historial.push({ estado: 'entregado', ts: ts + 52 * 60000, quien: 'Mostrador' });
        if (ped.estado === 'cancelado') ped.historial.push({ estado: 'cancelado', ts: ts + 6 * 60000, quien: 'Administración' });
        E.pedidos.push(ped);
      }
    }
    E.pedidos.sort(function (a, b) { return a.ts - b.ts; });
    E.pedidos.forEach(function (p, i) { p.num = 1001 + i; });
    E.contador.pedido = 1000 + E.pedidos.length;
    // consultas de vehículo (ejemplo)
    var NEC = [['cubiertas'], ['alineacion', 'cubiertas'], ['taller'], ['lubricentro'], ['gomeria'], ['alineacion']];
    var MSG = ['Quiero cambiar las cuatro cubiertas, ¿qué medidas manejan?', 'Se me va para la derecha en la ruta.', 'Hace un ruido al frenar, ¿pueden verlo hoy?', 'Service completo y cambio de filtros.', 'Pinchadura en la rueda trasera.', 'Después de cambiar los amortiguadores quiero alinear.'];
    NEC.forEach(function (nec, i) {
      var a = AUTOS[i], c = cliente(i + 30), ts = ahora - (i * 7 + 1) * H * (i < 2 ? 0.5 : 3);
      E.contador.consulta++;
      E.consultas.push({ id: 'con' + (i + 1), num: E.contador.consulta, ts: ts, nombre: c.nombre, tel: c.tel, marca: a[0], modelo: a[1], anio: a[2], servicios: nec, mensaje: MSG[i],
        estado: i < 2 ? 'nueva' : (i < 4 ? 'respondida' : 'cerrada'), notas: i >= 2 ? 'Se le respondió por teléfono.' : '' });
    });
    E.consultas.sort(function (a, b) { return b.ts - a.ts; });
    // compras a proveedores (ejemplo)
    [['v5', 'recibida', 'si', 9], ['v1', 'recibida', 'no', 5], ['v2', 'pedida', 'no', 1]].forEach(function (c, i) {
      var pv = prods.filter(function (p) { return p.prov === c[0]; }).slice(0, 4);
      E.contador.compra++;
      E.compras.push({ id: 'com' + (i + 1), num: E.contador.compra, ts: ahora - c[3] * D, prov: c[0], estado: c[1], pagada: c[2] === 'si',
        items: pv.map(function (p) { return { id: p.id, nombre: p.nombre, cant: p.minimo * 2, costo: p.costo }; }) });
    });
    E.registro.push({ ts: ahora - 3 * D, quien: 'Administración', accion: 'Precio de «Yerba Mate 1 kg» actualizado' });
    E.registro.push({ ts: ahora - 2 * D, quien: 'Mostrador', accion: 'Stock de «Leche Entera 1 L» ajustado a 30 (conteo)' });
    E.registro.push({ ts: ahora - 1 * D, quien: 'Administración', accion: 'Zona «Unión» agregada' });
    return E;
  }

  /* ---------- estado ---------- */
  var E = null, subs = [], canal = null, emitiendo = false;
  function cargar() {
    try { E = JSON.parse(localStorage.getItem(KEY)); } catch (e) { E = null; }
    if (!E || E.version !== 3) { E = sembrar(); guardar(true); }
  }
  function guardar(silencioso) {
    try { localStorage.setItem(KEY, JSON.stringify(E)); } catch (e) { /* sin espacio o bloqueado: sigue en memoria */ }
    if (!silencioso) { try { if (canal) canal.postMessage({ t: 'cambio' }); } catch (e2) { } avisar('local'); }
  }
  function avisar(origen) { subs.forEach(function (f) { try { f(origen); } catch (e) { } }); }
  function recargar() { try { var n = JSON.parse(localStorage.getItem(KEY)); if (n && n.version === 3) E = n; } catch (e) { } }
  try { canal = new BroadcastChannel('ag-cambios'); canal.onmessage = function () { recargar(); avisar('otra'); }; } catch (e) { canal = null; }
  window.addEventListener('storage', function (ev) { if (ev.key === KEY) { recargar(); avisar('otra'); } else if (ev.key === KCART) avisar('carrito'); });

  function reg(quien, accion) { E.registro.unshift({ ts: Date.now(), quien: quien || 'Sistema', accion: accion }); if (E.registro.length > 300) E.registro.length = 300; }
  function aviso(tipo, texto) {
    var d = E.config.dueno; if (!d.eventos[tipo]) return;
    E.avisos.unshift({ id: uid('av'), ts: Date.now(), tipo: tipo, texto: texto, leido: false });
    if (E.avisos.length > 100) E.avisos.length = 100;
  }
  function prod(id) { for (var i = 0; i < E.productos.length; i++) if (E.productos[i].id === id) return E.productos[i]; return null; }
  function precioDe(p) { return p.oferta && p.oferta < p.precio ? p.oferta : p.precio; }
  function nivelStock(p) { return p.stock <= 0 ? 'no' : (p.stock < p.minimo ? 'alerta' : 'bien'); }

  /* ---------- carrito (del visitante) ---------- */
  function leerCarrito() { try { var c = JSON.parse(localStorage.getItem(KCART)); return c && typeof c === 'object' ? c : {}; } catch (e) { return {}; } }
  function escribirCarrito(c) { try { localStorage.setItem(KCART, JSON.stringify(c)); } catch (e) { } avisar('carrito'); }
  function paso(p) { return p.unidad === 'kg' ? 0.5 : 1; }
  var carrito = {
    get: function () { return leerCarrito(); },
    cantidad: function (id) { return leerCarrito()[id] || 0; },
    total: function () { var c = leerCarrito(), s = 0; Object.keys(c).forEach(function (id) { var p = prod(id); if (p) s += redondeo(precioDe(p) * c[id]); }); return s; },
    unidades: function () { var c = leerCarrito(), n = 0; Object.keys(c).forEach(function (id) { if (prod(id)) n++; }); return n; },
    lineas: function () { var c = leerCarrito(), out = []; Object.keys(c).forEach(function (id) { var p = prod(id); if (p && c[id] > 0) out.push({ p: p, cant: c[id], precio: precioDe(p), subtotal: redondeo(precioDe(p) * c[id]) }); }); return out; },
    sumar: function (id, delta) {
      var p = prod(id); if (!p || !p.activo) return 0;
      var c = leerCarrito(), n = Math.round(((c[id] || 0) + delta * paso(p)) * 1000) / 1000;
      if (n > p.stock) n = p.stock;
      if (n <= 0) delete c[id]; else c[id] = n;
      escribirCarrito(c); return c[id] || 0;
    },
    fijar: function (id, n) { var c = leerCarrito(); if (n > 0) c[id] = n; else delete c[id]; escribirCarrito(c); },
    quitar: function (id) { var c = leerCarrito(); delete c[id]; escribirCarrito(c); },
    vaciar: function () { escribirCarrito({}); }
  };

  /* ---------- tienda: pedidos y consultas ---------- */
  function crearPedido(d) {
    recargar();
    var lineas = carrito.lineas();
    if (!lineas.length) return { ok: false, error: 'El carrito está vacío.' };
    var nombre = String(d.nombre || '').trim(), tel = celularUY(d.tel), dir = String(d.direccion || '').trim();
    var z = null; E.zonas.forEach(function (x) { if (x.id === d.zona) z = x; });
    var err = {};
    if (nombre.length < 2) err.nombre = 'Escribí tu nombre.';
    if (!tel) err.tel = 'Escribí un celular uruguayo, por ejemplo 099 123 456.';
    if (dir.length < 4) err.direccion = 'Escribí la calle y el número.';
    if (!z || !z.activa) err.zona = 'Elegí tu zona.';
    var hayAlcohol = lineas.some(function (l) { return l.p.alcohol; });
    if (hayAlcohol && !d.mayor) err.mayor = 'Para llevar bebidas alcohólicas tenés que ser mayor de 18 años.';
    if (Object.keys(err).length) return { ok: false, campos: err, error: 'Revisá los datos marcados.' };
    for (var i = 0; i < lineas.length; i++) {
      var l = lineas[i];
      if (!l.p.activo || l.p.stock < l.cant) return { ok: false, error: '«' + l.p.nombre + '» ya no tiene stock suficiente. Ajustá el carrito.' };
    }
    var sub = lineas.reduce(function (a, l) { return a + l.subtotal; }, 0);
    if (sub < z.minimo) return { ok: false, error: 'El pedido mínimo para ' + z.nombre + ' es ' + pesos(z.minimo) + '.' };
    var env = z.gratisDesde > 0 && sub >= z.gratisDesde ? 0 : z.costo;
    var ahora = Date.now();
    E.contador.pedido++;
    var ped = { id: uid('ped'), num: E.contador.pedido, ts: ahora,
      cliente: { nombre: nombre, tel: tel, direccion: dir, referencia: String(d.referencia || '').trim(), zona: z.id, zonaNombre: z.nombre },
      items: lineas.map(function (l) { return { id: l.p.id, nombre: l.p.nombre, unidad: l.p.unidad, cant: l.cant, precio: l.precio, subtotal: l.subtotal }; }),
      subtotal: sub, envio: env, total: sub + env, pago: { medio: 'muestra', estado: 'pagado' }, estado: 'nuevo', nota: '', mayor18: hayAlcohol,
      historial: [{ estado: 'nuevo', ts: ahora, quien: 'Cliente' }] };
    lineas.forEach(function (l) {
      var antes = nivelStock(l.p); l.p.stock = Math.round((l.p.stock - l.cant) * 1000) / 1000;
      E.movStock.unshift({ ts: ahora, prod: l.p.id, delta: -l.cant, motivo: 'Pedido ' + ped.num, quien: 'Cliente' });
      if (antes === 'bien' && nivelStock(l.p) !== 'bien') aviso('stock', 'Stock bajo: «' + l.p.nombre + '» quedó en ' + cant(l.p.stock, l.p.unidad) + ' (mínimo ' + cant(l.p.minimo, l.p.unidad) + ').');
    });
    if (E.movStock.length > 400) E.movStock.length = 400;
    E.pedidos.push(ped);
    aviso('pedido', 'Pedido nuevo #' + ped.num + ' de ' + nombre + ' (' + z.nombre + '): ' + pesos(ped.total) + ', ' + ped.items.length + ' productos.');
    reg('Cliente', 'Pedido #' + ped.num + ' recibido (' + pesos(ped.total) + ')');
    guardar();
    carrito.vaciar();
    return { ok: true, pedido: ped };
  }
  function buscarPedido(num, tel) {
    recargar(); var t = celularUY(tel), n = parseInt(String(num).replace(/\D/g, ''), 10);
    for (var i = 0; i < E.pedidos.length; i++) if (E.pedidos[i].num === n && (!t || E.pedidos[i].cliente.tel === t)) return t ? E.pedidos[i] : null;
    return null;
  }
  function crearConsulta(d) {
    recargar();
    var nombre = String(d.nombre || '').trim(), tel = celularUY(d.tel), err = {};
    if (nombre.length < 2) err.nombre = 'Escribí tu nombre.';
    if (!tel) err.tel = 'Escribí un celular uruguayo, por ejemplo 099 123 456.';
    if (!String(d.marca || '').trim()) err.marca = 'Escribí la marca.';
    if (!String(d.modelo || '').trim()) err.modelo = 'Escribí el modelo.';
    if (!d.servicios || !d.servicios.length) err.servicios = 'Elegí al menos un servicio.';
    if (Object.keys(err).length) return { ok: false, campos: err, error: 'Revisá los datos marcados.' };
    E.contador.consulta++;
    var c = { id: uid('con'), num: E.contador.consulta, ts: Date.now(), nombre: nombre, tel: tel, marca: String(d.marca).trim(), modelo: String(d.modelo).trim(),
      anio: d.anio ? parseInt(d.anio, 10) : '', servicios: d.servicios, mensaje: String(d.mensaje || '').trim(), estado: 'nueva', notas: '' };
    E.consultas.unshift(c);
    aviso('consulta', 'Consulta nueva #' + c.num + ': ' + c.marca + ' ' + c.modelo + ' (' + nombre + ').');
    reg('Cliente', 'Consulta de vehículo #' + c.num + ' recibida');
    guardar();
    return { ok: true, consulta: c };
  }

  /* ---------- panel ---------- */
  function sesion() { try { var s = JSON.parse(sessionStorage.getItem(KSES)); return s && E.usuarios.filter(function (u) { return u.id === s.id && u.activo; })[0] || null; } catch (e) { return null; } }
  function ingresar(id, pin) {
    var u = E.usuarios.filter(function (x) { return x.id === id; })[0];
    if (!u || !u.activo || u.pin !== String(pin)) return null;
    try { sessionStorage.setItem(KSES, JSON.stringify({ id: id })); } catch (e) { }
    reg(u.nombre, 'Ingresó al panel'); guardar(true); return u;
  }
  function salir() { try { sessionStorage.removeItem(KSES); } catch (e) { } }
  function puede(rol, seccion) { return (PERMISOS[rol] || []).indexOf(seccion) >= 0; }

  function cambiarEstado(id, estado, quien) {
    var p = E.pedidos.filter(function (x) { return x.id === id; })[0]; if (!p || ESTADOS.indexOf(estado) < 0 || p.estado === estado) return p;
    if (estado === 'cancelado' && p.estado !== 'cancelado') p.items.forEach(function (it) { var pr = prod(it.id); if (pr) pr.stock = Math.round((pr.stock + it.cant) * 1000) / 1000; });
    if (p.estado === 'cancelado' && estado !== 'cancelado') p.items.forEach(function (it) { var pr = prod(it.id); if (pr) pr.stock = Math.max(0, Math.round((pr.stock - it.cant) * 1000) / 1000); });
    p.estado = estado; p.historial.push({ estado: estado, ts: Date.now(), quien: quien });
    if (estado === 'cancelado') aviso('cancelado', 'Pedido #' + p.num + ' cancelado por ' + quien + '.');
    reg(quien, 'Pedido #' + p.num + ' pasó a «' + ESTADO_TXT[estado] + '»'); guardar(); return p;
  }
  function guardarProducto(d, quien) {
    var p = d.id ? prod(d.id) : null, nuevo = !p;
    if (nuevo) { var n = E.productos.length + 1; while (prod('p' + pad(n, 3))) n++; p = { id: 'p' + pad(n, 3), foto: '', activo: true, destacado: false, stock: 0 }; E.productos.push(p); }
    ['nombre', 'cat', 'unidad', 'prov'].forEach(function (k) { if (d[k] != null) p[k] = String(d[k]).trim(); });
    ['costo', 'precio', 'oferta', 'minimo'].forEach(function (k) { if (d[k] != null) p[k] = Math.max(0, Number(d[k]) || 0); });
    if (d.stock != null) p.stock = Math.max(0, Number(d.stock) || 0);
    if (d.activo != null) p.activo = !!d.activo; if (d.destacado != null) p.destacado = !!d.destacado; if (d.alcohol != null) p.alcohol = !!d.alcohol;
    reg(quien, (nuevo ? 'Producto agregado: «' : 'Producto actualizado: «') + p.nombre + '»'); guardar(); return p;
  }
  function ajustarStock(id, nuevo, motivo, quien) {
    var p = prod(id); if (!p) return; var antes = p.stock; nuevo = Math.max(0, Number(nuevo) || 0);
    p.stock = nuevo; E.movStock.unshift({ ts: Date.now(), prod: id, delta: nuevo - antes, motivo: motivo || 'Ajuste', quien: quien });
    reg(quien, 'Stock de «' + p.nombre + '» ajustado a ' + cant(nuevo, p.unidad) + ' (' + (motivo || 'ajuste') + ')'); guardar();
  }
  function guardarZona(d, quien) {
    var z = d.id ? E.zonas.filter(function (x) { return x.id === d.id; })[0] : null, nueva = !z;
    if (nueva) { z = { id: uid('z'), activa: true }; E.zonas.push(z); }
    z.nombre = String(d.nombre).trim(); z.costo = Math.max(0, Number(d.costo) || 0); z.minimo = Math.max(0, Number(d.minimo) || 0); z.gratisDesde = Math.max(0, Number(d.gratisDesde) || 0);
    if (d.activa != null) z.activa = !!d.activa;
    reg(quien, 'Zona «' + z.nombre + '» ' + (nueva ? 'agregada' : 'actualizada')); guardar(); return z;
  }
  function borrarZona(id, quien) { var z = E.zonas.filter(function (x) { return x.id === id; })[0]; if (!z) return; E.zonas = E.zonas.filter(function (x) { return x.id !== id; }); reg(quien, 'Zona «' + z.nombre + '» eliminada'); guardar(); }
  function guardarBanner(d, quien) {
    var b = d.id ? E.banners.filter(function (x) { return x.id === d.id; })[0] : null, nuevo = !b;
    if (nuevo) { b = { id: uid('b'), activo: true }; E.banners.push(b); }
    ['titulo', 'texto', 'boton', 'cat', 'href', 'tono'].forEach(function (k) { if (d[k] != null) b[k] = String(d[k]).trim(); });
    if (d.activo != null) b.activo = !!d.activo;
    reg(quien, 'Banner «' + b.titulo + '» ' + (nuevo ? 'agregado' : 'actualizado')); guardar(); return b;
  }
  function borrarBanner(id, quien) { var b = E.banners.filter(function (x) { return x.id === id; })[0]; if (!b) return; E.banners = E.banners.filter(function (x) { return x.id !== id; }); reg(quien, 'Banner «' + b.titulo + '» eliminado'); guardar(); }
  function actualizarConsulta(id, cambios, quien) {
    var c = E.consultas.filter(function (x) { return x.id === id; })[0]; if (!c) return;
    if (cambios.estado) c.estado = cambios.estado; if (cambios.notas != null) c.notas = String(cambios.notas);
    reg(quien, 'Consulta #' + c.num + (cambios.estado ? ' pasó a «' + CONSULTA_TXT[cambios.estado] + '»' : ' actualizada')); guardar();
  }
  function crearCompra(d, quien) {
    var items = (d.items || []).filter(function (i) { return i.cant > 0; }); if (!items.length) return null;
    E.contador.compra++;
    var c = { id: uid('com'), num: E.contador.compra, ts: Date.now(), prov: d.prov, estado: 'pedida', pagada: false,
      items: items.map(function (i) { var p = prod(i.id); return { id: i.id, nombre: p ? p.nombre : i.id, cant: Number(i.cant), costo: p ? p.costo : 0 }; }) };
    E.compras.unshift(c); reg(quien, 'Compra #' + c.num + ' pedida a proveedor'); guardar(); return c;
  }
  function recibirCompra(id, quien) {
    var c = E.compras.filter(function (x) { return x.id === id; })[0]; if (!c || c.estado === 'recibida') return;
    c.estado = 'recibida'; c.recibida = Date.now();
    c.items.forEach(function (i) { var p = prod(i.id); if (p) { p.stock = Math.round((p.stock + i.cant) * 1000) / 1000; E.movStock.unshift({ ts: Date.now(), prod: p.id, delta: i.cant, motivo: 'Compra #' + c.num, quien: quien }); } });
    reg(quien, 'Compra #' + c.num + ' recibida: stock actualizado'); guardar();
  }
  function pagarCompra(id, quien) { var c = E.compras.filter(function (x) { return x.id === id; })[0]; if (!c) return; c.pagada = true; reg(quien, 'Compra #' + c.num + ' marcada como paga'); guardar(); }
  function guardarUsuario(d, quien) {
    var u = d.id ? E.usuarios.filter(function (x) { return x.id === d.id; })[0] : null, nuevo = !u;
    if (nuevo) { u = { id: uid('u'), activo: true }; E.usuarios.push(u); }
    u.nombre = String(d.nombre).trim(); u.rol = d.rol; if (d.pin) u.pin = String(d.pin); if (d.activo != null) u.activo = !!d.activo;
    if (E.usuarios.filter(function (x) { return x.rol === 'admin' && x.activo; }).length === 0) { u.rol = 'admin'; u.activo = true; }
    reg(quien, 'Usuario «' + u.nombre + '» ' + (nuevo ? 'agregado' : 'actualizado')); guardar(); return u;
  }
  function guardarAjustes(d, quien) {
    if (d.negocio) Object.keys(d.negocio).forEach(function (k) { E.negocio[k] = d.negocio[k]; });
    if (d.dueno) { E.config.dueno.celulares = d.dueno.celulares; Object.keys(d.dueno.eventos).forEach(function (k) { E.config.dueno.eventos[k] = d.dueno.eventos[k]; }); }
    if (d.sonido != null) E.config.sonido = !!d.sonido;
    reg(quien, 'Ajustes guardados'); guardar();
  }
  function marcarAvisos() { E.avisos.forEach(function (a) { a.leido = true; }); guardar(true); }
  function reiniciar() { try { localStorage.removeItem(KEY); localStorage.removeItem(KCART); } catch (e) { } E = sembrar(); guardar(); }

  /* ---------- cálculos para reportes ---------- */
  function validos() { return E.pedidos.filter(function (p) { return p.estado !== 'cancelado'; }); }
  function ventasPorDia(n) {
    var out = [], ahora = Date.now(), mapa = {};
    validos().forEach(function (p) { var k = dia(p.ts); (mapa[k] = mapa[k] || { total: 0, pedidos: 0 }); mapa[k].total += p.total; mapa[k].pedidos++; });
    for (var i = n - 1; i >= 0; i--) { var ts = ahora - i * 86400000, k = dia(ts); out.push({ dia: k, ts: ts, etiqueta: diaCorto(ts), total: (mapa[k] || {}).total || 0, pedidos: (mapa[k] || {}).pedidos || 0 }); }
    return out;
  }
  function topProductos(desdeTs, n) {
    var m = {}; validos().forEach(function (p) { if (p.ts < desdeTs) return; p.items.forEach(function (it) { var x = (m[it.id] = m[it.id] || { id: it.id, nombre: it.nombre, unidad: it.unidad, cant: 0, total: 0 }); x.cant += it.cant; x.total += it.subtotal; }); });
    return Object.keys(m).map(function (k) { return m[k]; }).sort(function (a, b) { return b.total - a.total; }).slice(0, n || 10);
  }
  function porZona(desdeTs) {
    var m = {}; validos().forEach(function (p) { if (p.ts < desdeTs) return; var z = p.cliente.zonaNombre; (m[z] = m[z] || { zona: z, pedidos: 0, total: 0 }); m[z].pedidos++; m[z].total += p.total; });
    return Object.keys(m).map(function (k) { return m[k]; }).sort(function (a, b) { return b.total - a.total; });
  }
  function clientes() {
    var m = {}; E.pedidos.forEach(function (p) {
      var c = (m[p.cliente.tel] = m[p.cliente.tel] || { tel: p.cliente.tel, nombre: p.cliente.nombre, direccion: p.cliente.direccion, zona: p.cliente.zonaNombre, pedidos: 0, total: 0, ultimo: 0, lista: [] });
      c.lista.push(p); if (p.estado !== 'cancelado') { c.pedidos++; c.total += p.total; } if (p.ts > c.ultimo) { c.ultimo = p.ts; c.nombre = p.cliente.nombre; c.direccion = p.cliente.direccion; c.zona = p.cliente.zonaNombre; }
    });
    return Object.keys(m).map(function (k) { return m[k]; }).sort(function (a, b) { return b.ultimo - a.ultimo; });
  }
  function waLink(tel, texto) { var d = celularUY(tel); return d ? 'https://wa.me/598' + d.slice(1) + '?text=' + encodeURIComponent(texto || '') : '#'; }

  cargar();

  window.AG = {
    ESTADOS: ESTADOS, ESTADO_TXT: ESTADO_TXT, CONSULTA_TXT: CONSULTA_TXT, SERVICIOS: SERVICIOS, PERMISOS: PERMISOS, ROL_TXT: ROL_TXT,
    pesos: pesos, cant: cant, esc: esc, dia: dia, hora: hora, fecha: fecha, hace: hace, celularUY: celularUY, fmtCel: fmtCel, uid: uid, clon: clon, waLink: waLink,
    get: function () { return E; }, recargar: recargar, suscribir: function (f) { subs.push(f); },
    negocio: function () { return E.negocio; }, categorias: function () { return E.categorias; }, productos: function () { return E.productos; },
    producto: prod, precioDe: precioDe, nivelStock: nivelStock, zonas: function () { return E.zonas; }, banners: function () { return E.banners; },
    carrito: carrito, paso: paso, crearPedido: crearPedido, buscarPedido: buscarPedido, crearConsulta: crearConsulta,
    sesion: sesion, ingresar: ingresar, salir: salir, puede: puede,
    cambiarEstado: cambiarEstado, guardarProducto: guardarProducto, ajustarStock: ajustarStock, guardarZona: guardarZona, borrarZona: borrarZona,
    guardarBanner: guardarBanner, borrarBanner: borrarBanner, actualizarConsulta: actualizarConsulta, crearCompra: crearCompra, recibirCompra: recibirCompra,
    pagarCompra: pagarCompra, guardarUsuario: guardarUsuario, guardarAjustes: guardarAjustes, marcarAvisos: marcarAvisos, reiniciar: reiniciar,
    ventasPorDia: ventasPorDia, topProductos: topProductos, porZona: porZona, clientes: clientes
  };
})();
