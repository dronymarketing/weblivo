/* ============================================================
   LA ESTRELLA — datos del sistema
   Los datos de ejemplo viven solo en este navegador (localStorage).
   Las funciones de LE.* hacen lo que después harán las funciones del
   servidor en Supabase (como crear_reserva / cerrar_caja en Parking):
   controlan el rol, calculan los importes y anotan en la auditoría.
   Cuando se conecte la base real, la pantalla no cambia: se cambia esto.
   Montos en CENTAVOS (enteros). Cantidades por peso en kg (3 decimales).
   ============================================================ */
(function () {
  'use strict';

  // Modo conectado: si js/config.js tiene la dirección y la clave de Supabase, los datos viven en la nube
  var NUBE = !!(window.LE_CONFIG && window.LE_CONFIG.url && window.LE_CONFIG.clave);
  var KEY = NUBE ? 'laestrella_nube_v1' : 'laestrella_v4';
  var KEY_SESION = 'laestrella_sesion_v4';
  var KEY_PERFIL = 'laestrella_perfil_v1';
  var DIA = 86400000, HORA = 3600000;

  /* ---------- utilidades ---------- */
  function mulberry32(a) { return function () { a |= 0; a = a + 0x6D2B79F5 | 0; var t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
  function uid(p) {
    if (NUBE && window.crypto && crypto.randomUUID) return crypto.randomUUID(); // la base exige identificadores únicos universales
    return (p || 'id') + '_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
  }
  function inicioDia(ts) { var d = new Date(ts); d.setHours(0, 0, 0, 0); return d.getTime(); }
  function r2(n) { return Math.round(n); }
  function aPesos(c) { return Math.round(c / 100) * 100; }   // todo importe se redondea a pesos enteros (no se usan centavos)
  function ean13Digito(d12) { var s = 0; for (var i = 0; i < 12; i++) s += (+d12[i]) * (i % 2 ? 3 : 1); return String((10 - s % 10) % 10); }
  function ean13(d12) { return d12 + ean13Digito(d12); }
  function eanValido(c) { return /^\d{13}$/.test(c) && ean13Digito(c.slice(0, 12)) === c[12]; }
  function pad(n, l) { n = String(n); while (n.length < l) n = '0' + n; return n; }

  /* ---------- formatos ---------- */
  var nf0 = new Intl.NumberFormat('es-UY', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
  var nf2 = new Intl.NumberFormat('es-UY', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  var nf3 = new Intl.NumberFormat('es-UY', { minimumFractionDigits: 3, maximumFractionDigits: 3 });
  var fmt = {
    /* Sin centavos: los importes se muestran siempre en pesos enteros */
    din: function (c, signo) { c = c || 0; var a = Math.round(Math.abs(c) / 100); var s = a === 0 ? '' : (c < 0 ? '-' : (signo ? '+' : '')); return s + '$ ' + nf0.format(a); },
    kg: function (n) { return nf3.format(n) + ' kg'; },
    cant: function (n) { return Math.round(n) === n ? String(n) : nf3.format(n); },
    fecha: function (ts) { return new Date(ts).toLocaleDateString('es-UY', { day: '2-digit', month: '2-digit', year: 'numeric' }); },
    fechaCorta: function (ts) { return new Date(ts).toLocaleDateString('es-UY', { day: '2-digit', month: '2-digit' }); },
    dia: function (ts) { return new Date(ts).toLocaleDateString('es-UY', { weekday: 'short', day: 'numeric' }).replace('.', ''); },
    hora: function (ts) { return new Date(ts).toLocaleTimeString('es-UY', { hour: '2-digit', minute: '2-digit', hour12: false }); },
    fechaHora: function (ts) { return fmt.fecha(ts) + ' ' + fmt.hora(ts); },
    num: function (n) { return pad(n, 6); },
    dur: function (ms) { var m = Math.round(ms / 60000); return Math.floor(m / 60) + ' h ' + pad(m % 60, 2) + ' min'; }
  };
  var MEDIOS = { efectivo: 'Efectivo', debito: 'Débito', credito: 'Crédito', qr: 'QR' };

  /* ---------- catálogo de muestra ---------- */
  var CATEGORIAS = ['Almacén', 'Lácteos', 'Fiambres y quesos', 'Carnes', 'Frutas y verduras', 'Panadería', 'Bebidas', 'Limpieza', 'Perfumería', 'Kiosco y golosinas', 'Congelados'];
  var PROVEEDORES = [
    ['v1', 'Mayorista El Faro', 'Gabriela Núñez', '099 111 201', 'pedidos@elfaro.example', 'Almacén, kiosco y limpieza'],
    ['v2', 'Distribuidora Oriental', 'Ramiro Cabrera', '099 111 202', 'ventas@oriental.example', 'Lácteos y congelados'],
    ['v3', 'Frigorífico Las Tres Marías', 'Hugo Techera', '099 111 203', 'hugo@tresmarias.example', 'Carnes y fiambres'],
    ['v4', 'Abasto Verde', 'Silvia Píriz', '099 111 204', 'silvia@abastoverde.example', 'Frutas y verduras'],
    ['v5', 'Bebidas del Sur', 'Martín Olivera', '099 111 205', 'martin@bebidassur.example', 'Bebidas'],
    ['v6', 'Panificadora La Espiga', 'Nelly Ferreira', '099 111 206', 'laespiga@example.com', 'Pan y bizcochos'],
    ['v7', 'Higiene Total S.A.', 'Pablo Rocha', '099 111 207', 'pablo@higienetotal.example', 'Limpieza y perfumería']
  ];
  // [categoría, nombre, unidad, costo $, precio $, IVA %, mínimo, proveedor, PLU balanza]
  var CATALOGO = [
    ['Almacén', 'Arroz Blanco 1 kg', 'u', 48, 66, 10, 12, 'v1'], ['Almacén', 'Arroz Parboil 1 kg', 'u', 52, 72, 10, 10, 'v1'],
    ['Almacén', 'Fideos Tallarín 500 g', 'u', 38, 54, 10, 12, 'v1'], ['Almacén', 'Fideos Tirabuzón 500 g', 'u', 38, 54, 10, 12, 'v1'],
    ['Almacén', 'Harina 0000 1 kg', 'u', 29, 42, 10, 10, 'v1'], ['Almacén', 'Azúcar 1 kg', 'u', 41, 57, 10, 12, 'v1'],
    ['Almacén', 'Sal Fina 500 g', 'u', 22, 34, 22, 6, 'v1'], ['Almacén', 'Aceite de Girasol 900 ml', 'u', 98, 135, 22, 10, 'v1'],
    ['Almacén', 'Aceite de Oliva 250 ml', 'u', 210, 289, 22, 4, 'v1'], ['Almacén', 'Yerba Mate 1 kg', 'u', 205, 279, 22, 10, 'v1'],
    ['Almacén', 'Yerba Mate 500 g', 'u', 108, 148, 22, 8, 'v1'], ['Almacén', 'Café Molido 250 g', 'u', 130, 179, 22, 6, 'v1'],
    ['Almacén', 'Té en Saquitos x25', 'u', 54, 79, 22, 6, 'v1'], ['Almacén', 'Salsa de Tomate 520 g', 'u', 36, 54, 22, 8, 'v1'],
    ['Almacén', 'Puré de Tomate 520 g', 'u', 29, 44, 22, 8, 'v1'], ['Almacén', 'Atún en Lata 170 g', 'u', 74, 109, 22, 8, 'v1'],
    ['Almacén', 'Arvejas en Lata 300 g', 'u', 33, 49, 22, 6, 'v1'], ['Almacén', 'Lentejas 400 g', 'u', 40, 59, 10, 6, 'v1'],
    ['Almacén', 'Galletitas de Agua x3', 'u', 36, 56, 22, 10, 'v1'], ['Almacén', 'Galletitas Dulces 300 g', 'u', 42, 64, 22, 8, 'v1'],
    ['Almacén', 'Mayonesa 475 g', 'u', 66, 94, 22, 6, 'v1'], ['Almacén', 'Vinagre de Vino 500 ml', 'u', 28, 42, 22, 4, 'v1'],
    ['Almacén', 'Cacao en Polvo 360 g', 'u', 88, 129, 22, 4, 'v1'], ['Almacén', 'Polenta Instantánea 500 g', 'u', 28, 42, 10, 6, 'v1'],
    ['Lácteos', 'Leche Entera 1 L', 'u', 40, 56, 10, 24, 'v2'], ['Lácteos', 'Leche Descremada 1 L', 'u', 42, 58, 10, 12, 'v2'],
    ['Lácteos', 'Leche en Polvo 400 g', 'u', 190, 259, 22, 4, 'v2'], ['Lácteos', 'Manteca 200 g', 'u', 88, 124, 22, 10, 'v2'],
    ['Lácteos', 'Dulce de Leche 400 g', 'u', 82, 119, 22, 8, 'v2'], ['Lácteos', 'Yogur Natural 1 L', 'u', 72, 105, 22, 8, 'v2'],
    ['Lácteos', 'Yogur Frutilla 1 L', 'u', 76, 109, 22, 8, 'v2'], ['Lácteos', 'Crema de Leche 200 ml', 'u', 41, 62, 22, 6, 'v2'],
    ['Lácteos', 'Queso Untable 200 g', 'u', 78, 119, 22, 6, 'v2'],
    ['Fiambres y quesos', 'Jamón Cocido', 'kg', 520, 749, 22, 4, 'v3', '00101'], ['Fiambres y quesos', 'Queso Muzzarella', 'kg', 470, 679, 22, 4, 'v3', '00102'],
    ['Fiambres y quesos', 'Queso Colonia', 'kg', 520, 749, 22, 3, 'v3', '00103'], ['Fiambres y quesos', 'Salame Milán', 'kg', 690, 949, 22, 2, 'v3', '00104'],
    ['Fiambres y quesos', 'Paleta Cocida', 'kg', 380, 549, 22, 3, 'v3', '00105'], ['Fiambres y quesos', 'Mortadela', 'kg', 260, 389, 22, 2, 'v3', '00106'],
    ['Carnes', 'Carne Picada Común', 'kg', 290, 399, 0, 6, 'v3', '00201'], ['Carnes', 'Asado de Tira', 'kg', 330, 459, 0, 6, 'v3', '00202'],
    ['Carnes', 'Milanesas de Nalga', 'kg', 480, 659, 0, 4, 'v3', '00203'], ['Carnes', 'Pollo Entero', 'kg', 135, 199, 0, 8, 'v3', '00204'],
    ['Carnes', 'Chorizo Parrillero', 'kg', 270, 389, 0, 4, 'v3', '00205'],
    ['Frutas y verduras', 'Banana', 'kg', 55, 89, 0, 8, 'v4', '00301'], ['Frutas y verduras', 'Manzana Roja', 'kg', 70, 119, 0, 6, 'v4', '00302'],
    ['Frutas y verduras', 'Naranja', 'kg', 40, 69, 0, 8, 'v4', '00303'], ['Frutas y verduras', 'Tomate', 'kg', 60, 99, 0, 6, 'v4', '00304'],
    ['Frutas y verduras', 'Papa', 'kg', 28, 49, 0, 10, 'v4', '00305'], ['Frutas y verduras', 'Cebolla', 'kg', 26, 45, 0, 8, 'v4', '00306'],
    ['Frutas y verduras', 'Zanahoria', 'kg', 24, 42, 0, 6, 'v4', '00307'], ['Frutas y verduras', 'Zapallo Cabutia', 'kg', 22, 39, 0, 6, 'v4', '00308'],
    ['Frutas y verduras', 'Limón', 'kg', 50, 89, 0, 4, 'v4', '00309'], ['Frutas y verduras', 'Lechuga Crespa', 'u', 25, 45, 0, 6, 'v4'],
    ['Panadería', 'Pan Flauta', 'u', 18, 30, 10, 20, 'v6'], ['Panadería', 'Pan de Molde 500 g', 'u', 49, 75, 10, 8, 'v6'],
    ['Panadería', 'Bizcochos Surtidos x6', 'u', 28, 45, 10, 12, 'v6'],
    ['Bebidas', 'Agua Sin Gas 2 L', 'u', 28, 49, 22, 18, 'v5'], ['Bebidas', 'Agua Con Gas 500 ml', 'u', 20, 35, 22, 12, 'v5'],
    ['Bebidas', 'Refresco Cola 2,25 L', 'u', 82, 119, 22, 18, 'v5'], ['Bebidas', 'Refresco Naranja 2,25 L', 'u', 70, 105, 22, 12, 'v5'],
    ['Bebidas', 'Refresco Cola 600 ml', 'u', 38, 59, 22, 18, 'v5'], ['Bebidas', 'Jugo de Naranja 1 L', 'u', 62, 89, 22, 8, 'v5'],
    ['Bebidas', 'Cerveza Lata 473 ml', 'u', 55, 79, 22, 24, 'v5'], ['Bebidas', 'Cerveza Retornable 1 L', 'u', 68, 99, 22, 12, 'v5'],
    ['Bebidas', 'Vino Tinto 750 ml', 'u', 120, 179, 22, 8, 'v5'], ['Bebidas', 'Vino Tinto Cartón 1 L', 'u', 62, 95, 22, 8, 'v5'],
    ['Limpieza', 'Detergente 750 ml', 'u', 62, 89, 22, 8, 'v7'], ['Limpieza', 'Lavandina 1 L', 'u', 28, 45, 22, 8, 'v7'],
    ['Limpieza', 'Jabón en Polvo 800 g', 'u', 135, 189, 22, 6, 'v7'], ['Limpieza', 'Limpiador de Pisos 900 ml', 'u', 52, 79, 22, 6, 'v7'],
    ['Limpieza', 'Papel Higiénico x4', 'u', 82, 119, 22, 12, 'v7'], ['Limpieza', 'Esponja x3', 'u', 36, 59, 22, 6, 'v7'],
    ['Limpieza', 'Bolsas de Residuos x10', 'u', 36, 59, 22, 8, 'v7'], ['Limpieza', 'Rollo de Cocina x2', 'u', 54, 79, 22, 6, 'v7'],
    ['Perfumería', 'Jabón de Tocador x3', 'u', 66, 99, 22, 6, 'v7'], ['Perfumería', 'Shampoo 400 ml', 'u', 118, 169, 22, 4, 'v7'],
    ['Perfumería', 'Pasta Dental 90 g', 'u', 54, 84, 22, 6, 'v7'], ['Perfumería', 'Desodorante Aerosol 150 ml', 'u', 104, 149, 22, 4, 'v7'],
    ['Kiosco y golosinas', 'Chocolate con Leche 100 g', 'u', 52, 79, 22, 10, 'v1'], ['Kiosco y golosinas', 'Alfajor Triple 70 g', 'u', 36, 55, 22, 16, 'v1'],
    ['Kiosco y golosinas', 'Caramelos Surtidos 150 g', 'u', 28, 45, 22, 8, 'v1'], ['Kiosco y golosinas', 'Papas Fritas 100 g', 'u', 54, 79, 22, 10, 'v1'],
    ['Kiosco y golosinas', 'Chupetín', 'u', 5, 10, 22, 30, 'v1'],
    ['Congelados', 'Hamburguesas x4', 'u', 98, 145, 22, 6, 'v2'], ['Congelados', 'Pizza Muzzarella', 'u', 120, 179, 22, 4, 'v2'],
    ['Congelados', 'Helado de Vainilla 1 L', 'u', 120, 175, 22, 4, 'v2']
  ];

  function nuevoEstado() {
    return {
      version: 2,
      negocio: {
        nombre: 'La Estrella', rubro: 'Almacén y autoservicio',
        direccion: '', telefono: '',
        rut: '', regimen: 'monotributo', pie: '¡Gracias por tu compra!',
        medios: { efectivo: true, debito: true, credito: true, qr: true },
        balanza: { prefijo: '20', modo: 'peso' },
        facturaElectronica: false
      },
      usuarios: [
        { id: 'u_luana', nombre: 'Luana', rol: 'admin', pin: '1234', activo: true, email: 'luana@laestrella.example' },
        { id: 'u_noelia', nombre: 'Noelia', rol: 'caja', pin: '1111', activo: true, email: 'noelia@laestrella.example' },
        { id: 'u_ignacio', nombre: 'Ignacio', rol: 'caja', pin: '2222', activo: true, email: 'ignacio@laestrella.example' }
      ],
      categorias: CATEGORIAS.slice(),
      proveedores: PROVEEDORES.map(function (v) { return { id: v[0], nombre: v[1], contacto: v[2], telefono: v[3], email: v[4], rubro: v[5], activo: true }; }),
      productos: [], ventas: [], turnos: [], movCaja: [], movStock: [], compras: [], asistencias: [], auditoria: [],
      contador: { venta: 0, compra: 0 }
    };
  }

  // Modo conectado: arranca sin nada; todo lo trae el servidor
  function estadoVacio() {
    var e = nuevoEstado();
    e.usuarios = []; e.categorias = []; e.proveedores = []; e.outbox = []; e.rechazadas = []; e.mensual = []; e.sinCargar = []; e.codigosCola = []; e.ultAct = null; e.offline = false;
    return e;
  }

  /* ---------- siembra de datos de muestra ---------- */
  function sembrar() {
    var rnd = mulberry32(20261116);
    var E = nuevoEstado();
    var ahora = Date.now(), hoy0 = inicioDia(ahora);

    // Productos
    CATALOGO.forEach(function (c, i) {
      var kg = c[2] === 'kg';
      var ft = (window.LE_FOTOS || {})[c[1]] || {};
      var p = {
        id: 'p' + pad(i + 1, 3), codigo: kg ? '' : (ft.c && ft.c.charAt(0) !== '2' ? ft.c : ean13('773' + pad(100000000 + i * 7919, 9))), plu: c[8] || '',
        nombre: c[1], cat: c[0], unidad: c[2], costo: c[3] * 100, precio: c[4] * 100, iva: c[5],
        minimo: c[6], prov: c[7], activo: true, stock: 0, foto: 'img/productos/p' + pad(i + 1, 3) + '.png'
      };
      var f = 1.2 + rnd() * 3.2; p.stock = kg ? Math.round(c[6] * f * 1000) / 1000 : Math.round(c[6] * f);
      E.productos.push(p);
    });
    // Algunos productos por debajo del mínimo, para mostrar las alertas
    ['Leche Entera 1 L', 'Yerba Mate 1 kg', 'Pan Flauta', 'Cerveza Lata 473 ml', 'Queso Colonia', 'Papel Higiénico x4', 'Aceite de Girasol 900 ml'].forEach(function (n, i) {
      var p = E.productos.filter(function (x) { return x.nombre === n; })[0];
      if (p) p.stock = p.unidad === 'kg' ? Math.round(p.minimo * (0.3 + i * 0.1) * 1000) / 1000 : Math.max(0, Math.round(p.minimo * (0.25 + i * 0.08)));
    });
    var sinStock = E.productos.filter(function (x) { return x.nombre === 'Pasta Dental 90 g'; })[0]; if (sinStock) sinStock.stock = 0;

    var pesos = E.productos.map(function (_, i) { return Math.pow(1 - i / E.productos.length, 1.4) + .08; });
    var sumaPesos = pesos.reduce(function (a, b) { return a + b; }, 0);
    function elegirProducto() { var r = rnd() * sumaPesos, i = 0; while (i < pesos.length - 1 && r > pesos[i]) { r -= pesos[i]; i++; } return E.productos[i]; }

    var cajeros = { par: E.usuarios[1], impar: E.usuarios[2] };
    var duena = E.usuarios[0];
    var factorDia = [1.25, .8, .85, .9, 1, 1.15, 1.3]; // dom, lun, mar, mié, jue, vie, sáb

    for (var d = 29; d >= 0; d--) {
      var dia0 = hoy0 - d * DIA, dow = new Date(dia0).getDay();
      var turnos = [{ n: 'mañana', h0: 8, h1: 14.5 }, { n: 'tarde', h0: 14.5, h1: 21 }];
      turnos.forEach(function (tn, ti) {
        var apertura = dia0 + tn.h0 * HORA - r2(rnd() * 8) * 60000;
        var cierre = dia0 + tn.h1 * HORA + r2(rnd() * 12) * 60000;
        if (d === 0) { if (apertura > ahora - HORA) return; cierre = Math.min(cierre, ahora - 15 * 60000); }
        var cajero = ((dow + ti) % 2) ? cajeros.impar : cajeros.par;
        var base = 200000 + r2(rnd() * 6) * 10000; // $ 2.000 a $ 2.500
        var turno = { id: uid('t'), apertura: apertura, base: base, turno: tn.n, abrioId: cajero.id, abrio: cajero.nombre, cierre: cierre, esperado: 0, contado: 0, cerroId: cajero.id, cerro: cajero.nombre };
        var cant = r2((tn.h1 - tn.h0) * 5.2 * factorDia[dow] * (.8 + rnd() * .4));
        var tiempos = []; for (var k = 0; k < cant; k++) tiempos.push(apertura + 6 * 60000 + rnd() * (cierre - apertura - 12 * 60000));
        tiempos.sort(function (a, b) { return a - b; });
        var efectivo = 0;
        tiempos.forEach(function (ts) {
          var n = 1 + Math.floor(rnd() * rnd() * 9), items = [], vistos = {}, total = 0;
          for (var j = 0; j < n; j++) {
            var p = elegirProducto(); if (vistos[p.id]) continue; vistos[p.id] = 1;
            var c = p.unidad === 'kg' ? Math.max(.1, Math.round((0.15 + rnd() * 1.2) * 200) / 200) : (rnd() < .76 ? 1 : (rnd() < .75 ? 2 : 3));
            var s = aPesos(p.precio * c); total += s;
            items.push({ p: p.id, n: p.nombre, c: c, u: p.precio, s: s, iva: p.iva, k: p.costo });
          }
          if (!items.length) return;
          E.contador.venta++;
          var rr = rnd(), pagos, recibido = 0, vuelto = 0;
          if (rr < .46) { var paso = total > 150000 ? 50000 : total > 50000 ? 10000 : 5000; recibido = Math.ceil(total / paso) * paso + (rnd() < .3 ? paso : 0); if (rnd() < .3) recibido = total; vuelto = recibido - total; pagos = [{ m: 'efectivo', monto: total }]; }
          else if (rr < .76) pagos = [{ m: 'debito', monto: total }];
          else if (rr < .87) pagos = [{ m: 'credito', monto: total }];
          else pagos = [{ m: 'qr', monto: total }];
          var v = { id: uid('v'), num: E.contador.venta, ts: ts, turno: turno.id, cajeroId: cajero.id, cajero: cajero.nombre, items: items, total: total, pagos: pagos, recibido: recibido, vuelto: vuelto, estado: 'ok', sync: true };
          if (rnd() < .012 && d > 0) { v.estado = 'anulada'; v.anuladaPor = duena.nombre; v.motivo = 'Error de cobro'; }
          E.ventas.push(v);
          if (v.estado === 'ok') pagos.forEach(function (pg) { if (pg.m === 'efectivo') efectivo += pg.monto; });
        });
        // Retiros de la jornada
        var egresos = 0;
        if (rnd() < .6) { var m = (3 + r2(rnd() * 6)) * 100000; egresos += m; E.movCaja.push({ id: uid('m'), turno: turno.id, ts: apertura + (cierre - apertura) * .7, concepto: 'Retiro para administración', monto: -m, usuario: cajero.nombre }); }
        if (rnd() < .3) { var m2 = (4 + r2(rnd() * 8)) * 5000; egresos += m2; E.movCaja.push({ id: uid('m'), turno: turno.id, ts: apertura + (cierre - apertura) * .4, concepto: 'Pago de reparto', monto: -m2, usuario: cajero.nombre }); }
        turno.esperado = base + efectivo - egresos;
        var dif = rnd() < .68 ? 0 : r2((rnd() * 70 - 45) / 5) * 500;
        turno.contado = turno.esperado + dif;
        if (d === 0 && false) turno.cierre = null;
        E.turnos.push(turno);
        // Asistencia del turno
        E.asistencias.push({ id: uid('a'), usuarioId: cajero.id, nombre: cajero.nombre, entrada: apertura - r2(rnd() * 9) * 60000, salida: cierre + r2(rnd() * 14) * 60000 });
      });
      if (dow !== 0 && (d > 0 || ahora - (hoy0 + 8 * HORA) > 4 * HORA)) {
        var salida = d === 0 ? (ahora < dia0 + 15 * HORA ? null : dia0 + 14 * HORA + r2(rnd() * 30) * 60000) : dia0 + (13.5 + rnd() * 5) * HORA;
        E.asistencias.push({ id: uid('a'), usuarioId: duena.id, nombre: duena.nombre, entrada: dia0 + (7.6 + rnd() * .5) * HORA, salida: salida });
      }
    }
    E.ventas.sort(function (a, b) { return a.ts - b.ts; });
    var tot30 = E.ventas.reduce(function (a, v) { return a + (v.estado === 'ok' ? v.total : 0); }, 0), tk30 = E.ventas.filter(function (v) { return v.estado === 'ok'; }).length || 1;
    E.mensual = []; // últimos 12 meses completos, resumidos
    for (var mm = 12; mm >= 1; mm--) {
      var fm = new Date(); fm.setDate(1); fm.setHours(0, 0, 0, 0); fm.setMonth(fm.getMonth() - mm);
      var crec = .72 + .28 * ((12 - mm) / 11), est = [1.04, .9, .95, .97, 1, .96, .94, .97, 1, 1.02, 1.05, 1.18][fm.getMonth()];
      var tm = Math.round(tot30 * crec * est * (.94 + rnd() * .12));
      E.mensual.push({ ts: fm.getTime(), total: tm, margen: Math.round(tm * (.27 + rnd() * .04)), tickets: Math.round(tk30 * crec * est) });
    }
    E.contador.venta = E.ventas.length; E.ventas.forEach(function (v, i) { v.num = i + 1; });

    // Compras de muestra
    function compra(dias, prov, items, recibida, pagada) {
      E.contador.compra++;
      var its = items.map(function (it) { var p = E.productos.filter(function (x) { return x.nombre === it[0]; })[0]; return { p: p.id, n: p.nombre, c: it[1], k: p.costo }; });
      var total = its.reduce(function (a, i) { return a + r2(i.c * i.k); }, 0);
      var ts = hoy0 - dias * DIA + 10 * HORA;
      var c = { id: uid('c'), num: E.contador.compra, ts: ts, prov: prov, items: its, total: total, recibida: recibida, recibidaTs: recibida ? ts + DIA : null, pagada: pagada, nota: '' };
      E.compras.push(c);
      if (recibida) its.forEach(function (i) { E.movStock.push({ id: uid('s'), ts: c.recibidaTs, p: i.p, n: i.n, cant: i.c, tipo: 'compra', ref: 'Compra C-' + pad(c.num, 4), usuario: 'Luana' }); });
    }
    compra(12, 'v1', [['Arroz Blanco 1 kg', 60], ['Azúcar 1 kg', 48], ['Fideos Tallarín 500 g', 48], ['Aceite de Girasol 900 ml', 24]], true, true);
    compra(10, 'v5', [['Refresco Cola 2,25 L', 36], ['Agua Sin Gas 2 L', 48], ['Cerveza Lata 473 ml', 72]], true, true);
    compra(8, 'v3', [['Jamón Cocido', 6], ['Queso Muzzarella', 8], ['Carne Picada Común', 20]], true, true);
    compra(6, 'v2', [['Leche Entera 1 L', 72], ['Manteca 200 g', 24], ['Yogur Natural 1 L', 18]], true, true);
    compra(3, 'v7', [['Papel Higiénico x4', 36], ['Detergente 750 ml', 24], ['Lavandina 1 L', 24]], true, false);
    compra(1, 'v1', [['Yerba Mate 1 kg', 30], ['Café Molido 250 g', 12], ['Aceite de Girasol 900 ml', 24]], false, false);
    // Ajustes
    [['Queso Colonia', -0.35, 'Merma por corte'], ['Pan Flauta', -6, 'Pan del día anterior'], ['Pasta Dental 90 g', -2, 'Envase roto']].forEach(function (a, i) {
      var p = E.productos.filter(function (x) { return x.nombre === a[0]; })[0];
      E.movStock.push({ id: uid('s'), ts: hoy0 - (5 - i) * DIA + 17 * HORA, p: p.id, n: p.nombre, cant: a[1], tipo: 'ajuste', ref: a[2], usuario: 'Luana' });
    });
    E.movStock.sort(function (a, b) { return a.ts - b.ts; });

    // Auditoría de muestra
    [[28, 'Luana', 'Creó la cuenta de administración'], [28, 'Luana', 'Aprobó a Noelia (caja)'], [28, 'Luana', 'Aprobó a Ignacio (caja)'],
     [9, 'Luana', 'Cambió el precio de Yerba Mate 1 kg: $ 265 → $ 279'], [4, 'Luana', 'Cambió el precio de Aceite de Girasol 900 ml: $ 129 → $ 135'], [1, 'Noelia', 'Abrió la caja del turno mañana con $ 2.500'], [2, 'Luana', 'Registró la compra C-0005 a Higiene Total S.A.']
    ].forEach(function (a) { E.auditoria.push({ id: uid('x'), ts: hoy0 - a[0] * DIA + 9 * HORA, usuario: a[1], accion: a[2] }); });
    return E;
  }

  /* ---------- estado ---------- */
  var E = null;
  function guardar() { try { localStorage.setItem(KEY, JSON.stringify(E)); } catch (e) { /* sin almacenamiento: sigue en memoria */ } }
  function cargar() {
    try {
      var s = localStorage.getItem(KEY);
      if (s) {
        var o = JSON.parse(s);
        if (o && o.version === 2) {
          // Datos guardados antes de las fotos: se les asigna foto y código real sin perder lo cargado
          if (o.productos && o.productos.length && o.productos[0].foto === undefined) {
            o.productos.forEach(function (p) { if (/^p\d{3}$/.test(p.id)) { p.foto = 'img/productos/' + p.id + '.png'; var ft = (window.LE_FOTOS || {})[p.nombre]; if (ft && p.unidad !== 'kg' && ft.c.charAt(0) !== '2' && !o.productos.some(function (x) { return x !== p && x.codigo === ft.c; })) p.codigo = ft.c; } else p.foto = ''; });
            try { localStorage.setItem(KEY, JSON.stringify(o)); } catch (e) { }
          }
          return o;
        }
      }
    } catch (e) { }
    return null;
  }
  function iniciar() {
    E = cargar();
    if (!E) { E = NUBE ? estadoVacio() : sembrar(); guardar(); }
    E.sinCargar = E.sinCargar || []; E.codigosCola = E.codigosCola || [];
    if (NUBE) { E.offline = false; E.outbox = E.outbox || []; E.rechazadas = E.rechazadas || []; }
    LE.estado = E; return E;
  }

  function yo() {
    if (NUBE) { try { var pf = JSON.parse(localStorage.getItem(KEY_PERFIL)); return pf && pf.activo ? pf : null; } catch (e) { return null; } }
    try { var id = localStorage.getItem(KEY_SESION); if (!id) return null; var u = E.usuarios.filter(function (x) { return x.id === id && x.activo; })[0]; return u || null; } catch (e) { return null; } }
  function exigir() { var roles = [].slice.call(arguments), u = yo(); if (!u || roles.indexOf(u.rol) < 0) throw new Error('No tenés permiso para hacer esto.'); return u; }
  function anotar(accion, nombre) { var u = yo(); E.auditoria.push({ id: uid('x'), ts: Date.now(), usuario: nombre || (u ? u.nombre : 'Sistema'), accion: String(accion).slice(0, 300) }); }
  function porId(lista, id) { for (var i = 0; i < lista.length; i++) if (lista[i].id === id) return lista[i]; return null; }
  function turnoAbierto() { for (var i = E.turnos.length - 1; i >= 0; i--) if (!E.turnos[i].cierre) return E.turnos[i]; return null; }
  function turnoNombre() { var d = new Date(); return d.getHours() + d.getMinutes() / 60 < 14.5 ? 'mañana' : 'tarde'; }
  function movStock(p, cant, tipo, ref) { p.stock = Math.round((p.stock + cant) * 1000) / 1000; var u = yo(); E.movStock.push({ id: uid('s'), ts: Date.now(), p: p.id, n: p.nombre, cant: cant, tipo: tipo, ref: ref || '', usuario: u ? u.nombre : 'Sistema' }); }

  /* ---------- API ---------- */
  var LE = {
    estado: null, nubeActiva: NUBE, KEY_PERFIL: KEY_PERFIL, fmt: fmt, MEDIOS: MEDIOS, ean13: ean13, eanValido: eanValido, uid: uid, inicioDia: inicioDia, pad: pad,
    init: iniciar,
    reset: function () { if (NUBE) return; E = sembrar(); LE.estado = E; guardar(); try { localStorage.removeItem(KEY_SESION); } catch (e) { } },
    guardar: guardar,
    red: { get offline() { return !!E.offline; }, set offline(v) { E.offline = !!v; guardar(); } },

    /* Sesión */
    usuario: function () { return yo(); },
    usuarios: function () { return E.usuarios; },
    entrar: function (id, pin) {
      var u = porId(E.usuarios, id);
      if (!u || !u.activo) return { ok: false, error: 'Esta cuenta no está activa.' };
      if (String(pin) !== u.pin) return { ok: false, error: 'PIN incorrecto.' };
      try { localStorage.setItem(KEY_SESION, id); } catch (e) { }
      return { ok: true, usuario: u };
    },
    salir: function () { try { localStorage.removeItem(KEY_SESION); } catch (e) { } },
    exigir: exigir,
    anotar: function (a) { anotar(a); guardar(); },
    negocio: function () { return E.negocio; },
    guardarNegocio: function (d) {
      exigir('admin'); var n = E.negocio;
      ['nombre', 'rubro', 'direccion', 'telefono', 'rut', 'pie', 'regimen'].forEach(function (k) { if (d[k] != null) n[k] = String(d[k]).slice(0, 120); });
      if (d.medios) n.medios = d.medios; if (d.balanza) n.balanza = d.balanza;
      anotar('Cambió los ajustes del negocio'); guardar();
    },

    /* Productos */
    categorias: function () { return E.categorias; },
    productos: function (soloActivos) { return soloActivos ? E.productos.filter(function (p) { return p.activo; }) : E.productos; },
    producto: function (id) { return porId(E.productos, id); },
    proveedor: function (id) { return porId(E.proveedores, id); },
    buscar: function (q) {
      q = String(q || '').trim().toLowerCase(); if (!q) return [];
      var sin = function (s) { return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, ''); };
      var qq = sin(q);
      return E.productos.filter(function (p) { return p.activo && (sin(p.nombre).indexOf(qq) >= 0 || p.codigo.indexOf(q) === 0 || (p.plu && p.plu.indexOf(q) === 0)); });
    },
    /* Lo que "escribe" el lector: EAN-13, código de balanza o PLU */
    escaneo: function (texto) {
      var t = String(texto || '').trim(); if (!t) return { tipo: 'vacio' };
      var b = E.negocio.balanza, pre = b.prefijo;
      if (/^\d{13}$/.test(t) && t.indexOf(pre) === 0 && eanValido(t)) {
        var plu = t.slice(2, 7), valor = parseInt(t.slice(7, 12), 10);
        var p = E.productos.filter(function (x) { return x.plu === plu; })[0];
        if (!p) return { tipo: 'desconocido', texto: t, motivo: 'Código de balanza sin producto (PLU ' + plu + ')' };
        if (!p.activo) return { tipo: 'baja', producto: p };
        var cant = b.modo === 'peso' ? valor / 1000 : (valor / p.precio);
        return { tipo: 'balanza', producto: p, cant: Math.round(cant * 1000) / 1000, total: b.modo === 'precio' ? valor : null };
      }
      var q = E.productos.filter(function (x) { return x.codigo && x.codigo === t; })[0];
      if (q) return q.activo ? { tipo: 'producto', producto: q } : { tipo: 'baja', producto: q };
      return { tipo: 'desconocido', texto: t, motivo: 'Código no encontrado' };
    },
    codigoBalanza: function (p, kg) { var b = E.negocio.balanza; return ean13(b.prefijo + p.plu + pad(Math.round(kg * 1000), 5)); },
    guardarProducto: function (d) {
      exigir('admin');
      var nombre = String(d.nombre || '').trim(); if (nombre.length < 2) throw new Error('Escribí el nombre del producto.');
      if (nombre.length > 28) throw new Error('El nombre no puede pasar de 28 letras (para que entre en el ticket).');
      var precio = aPesos(+d.precio), costo = aPesos(+d.costo || 0);
      if (!(precio > 0)) throw new Error('El precio tiene que ser mayor que cero.');
      var cod = String(d.codigo || '').trim();
      if (d.unidad === 'u' && cod && !/^\d{8,14}$/.test(cod)) throw new Error('El código de barras tiene que tener entre 8 y 14 números.');
      if (cod) { var dup = E.productos.filter(function (x) { return x.codigo === cod && x.id !== d.id; })[0]; if (dup) throw new Error('Ese código ya lo tiene "' + dup.nombre + '".'); }
      var plu = String(d.plu || '').trim();
      if (d.unidad === 'kg') { if (!/^\d{5}$/.test(plu)) throw new Error('El PLU de balanza son 5 números.'); var d2 = E.productos.filter(function (x) { return x.plu === plu && x.id !== d.id; })[0]; if (d2) throw new Error('Ese PLU ya lo tiene "' + d2.nombre + '".'); }
      var p = d.id ? porId(E.productos, d.id) : null;
      if (p) {
        if (p.precio !== precio) anotar('Cambió el precio de ' + p.nombre + ': ' + fmt.din(p.precio) + ' → ' + fmt.din(precio));
        else anotar('Editó el producto ' + p.nombre);
      } else { p = { id: 'p' + pad(E.productos.length + 1, 3) + Date.now().toString(36).slice(-3), stock: 0, activo: true, foto: '' }; E.productos.push(p); anotar('Creó el producto ' + nombre); }
      p.nombre = nombre; p.cat = d.cat; p.unidad = d.unidad; p.codigo = d.unidad === 'kg' ? '' : cod; p.plu = d.unidad === 'kg' ? plu : '';
      p.precio = precio; p.costo = costo; p.iva = +d.iva; p.minimo = +d.minimo || 0; p.prov = d.prov || '';
      if (d.stockInicial != null && !d.id) p.stock = +d.stockInicial || 0;
      if (p.codigo) E.sinCargar = (E.sinCargar || []).filter(function (x) { return x.codigo !== p.codigo; });
      guardar(); return p;
    },
    /* Códigos escaneados en la caja que no están cargados: se anotan para que Administración los cargue. */
    registrarCodigo: function (codigo, ts) {
      var c = String(codigo || '').trim(); if (!/^\d{8,14}$/.test(c)) return null;
      if (E.productos.some(function (x) { return x.codigo === c; })) return null;
      var t = ts || Date.now(), u = (LE.usuario() || {}).nombre || '', f = E.sinCargar.filter(function (x) { return x.codigo === c; })[0];
      if (f) { f.veces++; f.ultima = Math.max(f.ultima, t); f.por = u; }
      else if (E.sinCargar.length < 500) { f = { codigo: c, veces: 1, primera: t, ultima: t, por: u }; E.sinCargar.push(f); }
      guardar(); return f || null;
    },
    codigosSinCargar: function () { exigir('admin'); return E.sinCargar.slice().sort(function (a, b) { return b.ultima - a.ultima; }); },
    descartarCodigo: function (codigo) { exigir('admin'); E.sinCargar = E.sinCargar.filter(function (x) { return x.codigo !== codigo; }); guardar(); },
    ajustarMinimo: function (id, minimo) {
      exigir('admin'); var p = porId(E.productos, id), m = Math.round((+minimo || 0) * 1000) / 1000;
      if (!(m >= 0)) throw new Error('El mínimo no puede ser negativo.');
      if (m !== p.minimo) anotar('Cambió el mínimo de ' + p.nombre + ': ' + p.minimo + ' → ' + m);
      p.minimo = m; guardar(); return p;
    },
    activarProducto: function (id, activo) { exigir('admin'); var p = porId(E.productos, id); p.activo = !!activo; anotar((activo ? 'Reactivó ' : 'Dio de baja ') + p.nombre); guardar(); },

    /* Stock */
    ajustarStock: function (id, delta, motivo) {
      exigir('admin'); var p = porId(E.productos, id); if (!p) throw new Error('Producto no encontrado.');
      delta = +delta; if (!delta) throw new Error('Escribí cuánto sumar o restar.'); if (!String(motivo || '').trim()) throw new Error('Escribí el motivo.');
      movStock(p, delta, 'ajuste', motivo); anotar('Ajustó el stock de ' + p.nombre + ' (' + (delta > 0 ? '+' : '') + fmt.cant(delta) + '): ' + motivo); guardar();
    },
    movimientosStock: function (limite) { return E.movStock.slice().sort(function (a, b) { return b.ts - a.ts; }).slice(0, limite || 200); },
    /* Nivel de stock: 'cero' (no hay) · 'alerta' (menos que el mínimo) · 'ok' (el mínimo o más). Tener justo el mínimo está bien. */
    nivelStock: function (p) { return p.stock <= 0 ? 'cero' : p.stock < p.minimo ? 'alerta' : 'ok'; },
    stockBajo: function () { return E.productos.filter(function (p) { return p.activo && LE.nivelStock(p) !== 'ok'; }).sort(function (a, b) { return (a.stock / (a.minimo || 1)) - (b.stock / (b.minimo || 1)); }); },

    /* Proveedores y compras */
    proveedores: function () { return E.proveedores; },
    guardarProveedor: function (d) {
      exigir('admin'); var n = String(d.nombre || '').trim(); if (n.length < 2) throw new Error('Escribí el nombre del proveedor.');
      var v = d.id ? porId(E.proveedores, d.id) : null;
      if (!v) { v = { id: 'v' + (E.proveedores.length + 1) + Date.now().toString(36).slice(-3), activo: true }; E.proveedores.push(v); anotar('Creó el proveedor ' + n); } else anotar('Editó el proveedor ' + n);
      v.nombre = n; v.contacto = d.contacto || ''; v.telefono = d.telefono || ''; v.email = d.email || ''; v.rubro = d.rubro || ''; guardar(); return v;
    },
    compras: function () { return E.compras.slice().sort(function (a, b) { return b.ts - a.ts; }); },
    guardarCompra: function (d) {
      exigir('admin'); if (!d.prov) throw new Error('Elegí el proveedor.');
      var its = (d.items || []).filter(function (i) { return i.p && +i.c > 0; }).map(function (i) { var p = porId(E.productos, i.p); return { p: p.id, n: p.nombre, c: +i.c, k: Math.round(+i.k) }; });
      if (!its.length) throw new Error('Agregá al menos un producto.');
      E.contador.compra++; var total = its.reduce(function (a, i) { return a + r2(i.c * i.k); }, 0);
      var c = { id: uid('c'), num: E.contador.compra, ts: Date.now(), prov: d.prov, items: its, total: total, recibida: false, recibidaTs: null, pagada: false, nota: d.nota || '' };
      E.compras.push(c); anotar('Registró la compra C-' + pad(c.num, 4) + ' a ' + porId(E.proveedores, d.prov).nombre + ' por ' + fmt.din(total)); guardar(); return c;
    },
    recibirCompra: function (id) {
      exigir('admin'); var c = porId(E.compras, id); if (!c || c.recibida) throw new Error('Esta compra ya fue recibida.');
      c.items.forEach(function (i) { var p = porId(E.productos, i.p); if (p) { movStock(p, i.c, 'compra', 'Compra C-' + pad(c.num, 4)); if (i.k > 0 && p.costo !== i.k) p.costo = i.k; } });
      c.recibida = true; c.recibidaTs = Date.now(); anotar('Recibió la compra C-' + pad(c.num, 4) + ' (el stock subió)'); guardar();
    },
    pagarCompra: function (id) { exigir('admin'); var c = porId(E.compras, id); c.pagada = true; anotar('Marcó como paga la compra C-' + pad(c.num, 4)); guardar(); },

    /* Caja */
    turnoAbierto: turnoAbierto,
    turnos: function () { return E.turnos.slice().sort(function (a, b) { return b.apertura - a.apertura; }); },
    movimientosCaja: function (turnoId) { return E.movCaja.filter(function (m) { return m.turno === turnoId; }); },
    abrirCaja: function (base) {
      var u = exigir('admin', 'caja'); if (turnoAbierto()) throw new Error('Ya hay una caja abierta: primero cerrá la del turno anterior.');
      base = Math.round(+base); if (!(base >= 0)) throw new Error('Escribí con cuánto efectivo se abre.');
      var t = { id: uid('t'), apertura: Date.now(), base: base, turno: turnoNombre(), abrioId: u.id, abrio: u.nombre, cierre: null, esperado: null, contado: null, cerroId: null, cerro: null };
      E.turnos.push(t); anotar('Abrió la caja del turno ' + t.turno + ' con ' + fmt.din(base)); guardar(); return t;
    },
    egresoCaja: function (concepto, monto) {
      var u = exigir('admin', 'caja'), t = turnoAbierto(); if (!t) throw new Error('No hay una caja abierta.');
      monto = Math.round(+monto); concepto = String(concepto || '').trim();
      if (concepto.length < 2 || !(monto > 0)) throw new Error('Completá el concepto y el monto.');
      var disp = LE.efectivoEsperado(t); if (monto > disp) throw new Error('No hay tanto efectivo en la caja (hay ' + fmt.din(disp) + ').');
      E.movCaja.push({ id: uid('m'), turno: t.id, ts: Date.now(), concepto: concepto, monto: -monto, usuario: u.nombre });
      anotar('Retiró ' + fmt.din(monto) + ' de la caja: ' + concepto); guardar();
    },
    efectivoEsperado: function (t) {
      var ef = 0; E.ventas.forEach(function (v) { if (v.turno === t.id && v.estado === 'ok') v.pagos.forEach(function (p) { if (p.m === 'efectivo') ef += p.monto; }); });
      var eg = 0; E.movCaja.forEach(function (m) { if (m.turno === t.id) eg += m.monto; });
      return t.base + ef + eg;
    },
    resumenTurno: function (t) {
      var porMedio = { efectivo: 0, debito: 0, credito: 0, qr: 0 }, n = 0, total = 0;
      E.ventas.forEach(function (v) { if (v.turno === t.id && v.estado === 'ok') { n++; total += v.total; v.pagos.forEach(function (p) { porMedio[p.m] += p.monto; }); } });
      var retiros = 0; E.movCaja.forEach(function (m) { if (m.turno === t.id) retiros += -m.monto; });
      return { tickets: n, total: total, porMedio: porMedio, retiros: retiros };
    },
    cerrarCaja: function (contado) {
      var u = exigir('admin', 'caja'), t = turnoAbierto(); if (!t) throw new Error('No hay una caja abierta.');
      contado = Math.round(+contado); if (!(contado >= 0)) throw new Error('Escribí cuánto efectivo contaste.');
      t.esperado = LE.efectivoEsperado(t); t.contado = contado; t.cierre = Date.now(); t.cerroId = u.id; t.cerro = u.nombre;
      var dif = contado - t.esperado;
      anotar('Cerró la caja del turno ' + t.turno + ': esperado ' + fmt.din(t.esperado) + ', contado ' + fmt.din(contado) + (dif ? ' (diferencia ' + fmt.din(dif, true) + ')' : ''));
      guardar(); return { esperado: t.esperado, contado: contado, diferencia: dif };
    },

    /* Ventas */
    pendientes: function () { return E.ventas.filter(function (v) { return v.sync === false; }); },
    sincronizar: function () {
      if (E.offline) throw new Error('Sin conexión: no se puede enviar todavía.');
      var p = LE.pendientes(); p.forEach(function (v) { v.sync = true; });
      if (p.length) { anotar('Se enviaron ' + p.length + ' ventas guardadas en la caja', 'Sistema'); guardar(); } return p.length;
    },
    crearVenta: function (d) {
      var u = exigir('admin', 'caja'), t = turnoAbierto(); if (!t) throw new Error('Abrí la caja antes de vender.');
      var ya = porId(E.ventas, d.id); if (ya) return ya; // idempotente: si se reintenta, no duplica
      if (!d.items || !d.items.length) throw new Error('El ticket está vacío.');
      var items = d.items.map(function (i) {
        var p = porId(E.productos, i.p); if (!p || !p.activo) throw new Error('El producto "' + (i.n || '') + '" ya no está disponible.');
        var c = p.unidad === 'kg' ? Math.round(+i.c * 1000) / 1000 : Math.round(+i.c); if (!(c > 0)) throw new Error('Cantidad inválida en ' + p.nombre + '.');
        return { p: p.id, n: p.nombre, c: c, u: p.precio, s: aPesos(p.precio * c), iva: p.iva, k: p.costo }; // el precio sale del servidor, no de la pantalla
      });
      var total = items.reduce(function (a, i) { return a + i.s; }, 0);
      var pagos = (d.pagos || []).map(function (p) { return { m: p.m, monto: Math.round(+p.monto) }; }).filter(function (p) { return p.monto > 0; });
      var pagado = pagos.reduce(function (a, p) { return a + p.monto; }, 0);
      pagos.forEach(function (p) { if (!MEDIOS[p.m] || !E.negocio.medios[p.m]) throw new Error('Medio de pago no habilitado.'); });
      var ef = pagos.filter(function (p) { return p.m === 'efectivo'; }).reduce(function (a, p) { return a + p.monto; }, 0);
      if (pagado < total) throw new Error('Falta cobrar ' + fmt.din(total - pagado) + '.');
      if (pagado > total) throw new Error('El cobro no coincide con el total.');
      // El efectivo recibido puede ser más que lo cobrado en efectivo: la diferencia es el vuelto
      var recibido = ef ? Math.round(+d.recibido || ef) : 0;
      if (ef && recibido < ef) throw new Error('El efectivo recibido es menor al cobrado.');
      var vuelto = ef ? recibido - ef : 0;
      E.contador.venta++;
      var v = { id: d.id || uid('v'), num: E.contador.venta, ts: Date.now(), turno: t.id, cajeroId: u.id, cajero: u.nombre, items: items, total: total, pagos: pagos, recibido: recibido, vuelto: vuelto, estado: 'ok', sync: !E.offline };
      E.ventas.push(v);
      items.forEach(function (i) { movStock(porId(E.productos, i.p), -i.c, 'venta', 'Ticket ' + fmt.num(v.num)); });
      guardar(); return v;
    },
    anularVenta: function (id, motivo) {
      exigir('admin'); var v = porId(E.ventas, id); if (!v || v.estado !== 'ok') throw new Error('Esta venta ya está anulada.');
      if (!String(motivo || '').trim()) throw new Error('Escribí el motivo de la anulación.');
      var t = porId(E.turnos, v.turno); if (t && t.cierre) { /* se anula igual: queda marcada para el próximo cierre */ }
      v.estado = 'anulada'; v.anuladaPor = yo().nombre; v.motivo = motivo;
      v.items.forEach(function (i) { var p = porId(E.productos, i.p); if (p) movStock(p, i.c, 'anulacion', 'Anuló ticket ' + fmt.num(v.num)); });
      anotar('Anuló el ticket ' + fmt.num(v.num) + ' (' + fmt.din(v.total) + '): ' + motivo); guardar();
    },
    venta: function (id) { return porId(E.ventas, id); },
    ventas: function (desde, hasta) { return E.ventas.filter(function (v) { return v.ts >= desde && v.ts < hasta; }); },
    ultimaVenta: function () { return E.ventas[E.ventas.length - 1] || null; },

    /* Equipo */
    guardarUsuario: function (d) {
      var yo_ = exigir('admin'); var n = String(d.nombre || '').trim(); if (n.length < 2) throw new Error('Escribí el nombre.');
      if (!/^\d{4}$/.test(String(d.pin || ''))) throw new Error('El PIN son 4 números.');
      if (E.usuarios.some(function (x) { return x.pin === String(d.pin) && x.id !== d.id && x.activo; })) throw new Error('Ese PIN ya lo usa otra persona.');
      var u = d.id ? porId(E.usuarios, d.id) : null;
      if (u) {
        if (u.id === yo_.id && (u.rol !== d.rol || u.activo !== !!d.activo)) throw new Error('No podés cambiar tu propio rol ni desactivarte.');
        if (u.rol === 'admin' && (d.rol !== 'admin' || !d.activo) && E.usuarios.filter(function (x) { return x.rol === 'admin' && x.activo; }).length < 2) throw new Error('Tiene que quedar al menos una cuenta de administración activa.');
        if (u.rol !== d.rol || u.activo !== !!d.activo) anotar((d.activo && !u.activo ? 'Activó a ' : !d.activo && u.activo ? 'Desactivó a ' : 'Cambió el rol de ') + u.nombre + ' (' + d.rol + ')'); else anotar('Editó a ' + u.nombre);
      } else { u = { id: 'u_' + Date.now().toString(36) }; E.usuarios.push(u); anotar('Creó la cuenta de ' + n + ' (' + d.rol + ')'); }
      u.nombre = n; u.rol = d.rol; u.pin = String(d.pin); u.activo = !!d.activo; u.email = d.email || ''; guardar(); return u;
    },
    asistenciaAbierta: function (uid_) { for (var i = E.asistencias.length - 1; i >= 0; i--) { var a = E.asistencias[i]; if (a.usuarioId === uid_ && !a.salida) return a; } return null; },
    marcarAsistencia: function () {
      var u = exigir('admin', 'caja'), a = LE.asistenciaAbierta(u.id);
      if (a) { a.salida = Date.now(); anotar('Terminó la jornada'); guardar(); return { estado: 'salida', a: a }; }
      a = { id: uid('a'), usuarioId: u.id, nombre: u.nombre, entrada: Date.now(), salida: null }; E.asistencias.push(a); anotar('Empezó la jornada'); guardar(); return { estado: 'entrada', a: a };
    },
    asistencias: function (desde, hasta) { return E.asistencias.filter(function (a) { return a.entrada >= desde && a.entrada < hasta; }).sort(function (a, b) { return b.entrada - a.entrada; }); },
    auditoria: function (limite) { return E.auditoria.slice().sort(function (a, b) { return b.ts - a.ts; }).slice(0, limite || 200); },

    mensual: function () { return E.mensual || []; },

    /* Reportes */
    reporte: function (desde, hasta) {
      var vs = LE.ventas(desde, hasta), R = { desde: desde, hasta: hasta, total: 0, tickets: 0, costo: 0, iva: 0, anuladas: 0, anuladasTotal: 0, porMedio: { efectivo: 0, debito: 0, credito: 0, qr: 0 }, porCat: {}, porProd: {}, porCajero: {}, porDia: {}, porHora: [] };
      for (var h = 0; h < 24; h++) R.porHora.push({ total: 0, tickets: 0, margen: 0 });
      vs.forEach(function (v) {
        if (v.estado !== 'ok') { R.anuladas++; R.anuladasTotal += v.total; return; }
        R.total += v.total; R.tickets++;
        var costoV = v.items.reduce(function (a, i) { return a + r2(i.k * i.c); }, 0), margenV = v.total - costoV;
        v.pagos.forEach(function (p) { R.porMedio[p.m] += p.monto; });
        var d0 = inicioDia(v.ts); (R.porDia[d0] = R.porDia[d0] || { dia: d0, total: 0, tickets: 0, margen: 0 }); R.porDia[d0].total += v.total; R.porDia[d0].tickets++; R.porDia[d0].margen += margenV;
        var hh = new Date(v.ts).getHours(); R.porHora[hh].total += v.total; R.porHora[hh].tickets++; R.porHora[hh].margen += margenV;
        var c = R.porCajero[v.cajero] = R.porCajero[v.cajero] || { nombre: v.cajero, total: 0, tickets: 0 }; c.total += v.total; c.tickets++;
        v.items.forEach(function (i) {
          var p = porId(E.productos, i.p), cat = p ? p.cat : 'Otros';
          R.costo += r2(i.k * i.c); R.iva += i.s - r2(i.s * 100 / (100 + i.iva));
          var pc = R.porCat[cat] = R.porCat[cat] || { nombre: cat, total: 0, costo: 0 }; pc.total += i.s; pc.costo += r2(i.k * i.c);
          var pp = R.porProd[i.p] = R.porProd[i.p] || { id: i.p, nombre: i.n, cat: cat, cant: 0, total: 0, costo: 0, unidad: p ? p.unidad : 'u' }; pp.cant += i.c; pp.total += i.s; pp.costo += r2(i.k * i.c);
        });
      });
      R.promedio = R.tickets ? Math.round(R.total / R.tickets) : 0; R.margen = R.total - R.costo; R.ventas = vs;
      return R;
    }
  };

  window.LE = LE;
  iniciar();
})();
