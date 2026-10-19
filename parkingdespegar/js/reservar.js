/* ============================================================
   PARKING DESPEGAR — Reserva online
   Cinco pasos: fechas y lugar · precio (servicio, extras y código de
   descuento) · tus datos · revisar y pagar · listo.
   Tarifas, extras y lugares libres vienen de la base en línea (js/datos.js).
   El total que vale lo calcula el servidor (también el descuento: un
   código inventado no pasa). El pago se hace en la pasarela.
   ============================================================ */
(function () {
  'use strict';
  var form = document.getElementById('form-reserva');
  if (!form || !window.PD) return;

  var paso = 1;
  var TOTAL_PASOS = 4;   // el 5 («Listo») es la confirmación
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var plata = function (n) { return '$ ' + Math.round(n).toLocaleString('es-UY'); };
  function escapar(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function ico(n) { return '<svg class="ico" aria-hidden="true"><use href="#i-' + n + '"/></svg>'; }

  /* ---------- En ventana (abierta desde otra página) o como página ---------- */
  var enVentana = window.self !== window.top;
  function arriba() {
    var c = $('[data-cuerpo]');
    if (c) c.scrollTop = 0;
    var v = $('.vr'), y = v.getBoundingClientRect().top + window.scrollY - 90;
    if (!enVentana && window.scrollY > y) window.scrollTo({ top: y, behavior: 'smooth' });
  }
  /* La pasarela de pago se abre en la ventana entera del navegador, no dentro del marco */
  function irA(url) { try { window.top.location.href = url; } catch (e) { location.href = url; } }
  document.addEventListener('click', function (e) {
    var c = e.target.closest('[data-cerrar-reserva]');
    if (!c) return;
    if (enVentana) { e.preventDefault(); window.parent.postMessage({ pd: 'cerrar-reserva' }, location.origin); return; }
    var vino = document.referrer && new URL(document.referrer).origin === location.origin && !/reservar\.html/.test(document.referrer);
    if (vino && history.length > 1) { e.preventDefault(); history.back(); }
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && enVentana && $('[data-pasarela]').hidden) window.parent.postMessage({ pd: 'cerrar-reserva' }, location.origin);
  });

  if (enVentana && window.ResizeObserver) {
    var medir = function () {
      var alto = ['.vr__cabeza', '.vr__pasos', '[data-pie]'].reduce(function (t, sel) { var el = $(sel); return t + (el && !el.hidden ? el.offsetHeight : 0); }, 0);
      var c = $('[data-cuerpo]'), cs = getComputedStyle(c);
      alto += Array.prototype.reduce.call(c.children, function (t, el) { return t + (el.hidden ? 0 : el.offsetHeight); }, 0) + parseFloat(cs.paddingTop) + parseFloat(cs.paddingBottom);
      window.parent.postMessage({ pd: 'alto-reserva', alto: Math.ceil(alto) }, location.origin);
    };
    var ro = new ResizeObserver(medir);
    Array.prototype.forEach.call($('[data-cuerpo]').children, function (el) { ro.observe(el); });
    ['.vr__cabeza', '[data-pie]'].forEach(function (sel) { ro.observe($(sel)); });
  }

  /* ---------- Fechas por defecto: mañana a la madrugada, vuelta en 7 días ---------- */
  function ymd(d) { return d.getFullYear() + '-' + PD.pad(d.getMonth() + 1) + '-' + PD.pad(d.getDate()); }
  var hoy = new Date();
  var manana = new Date(hoy.getTime() + PD.DIA);
  var vuelta = new Date(hoy.getTime() + 8 * PD.DIA);
  form.entradaDia.min = ymd(hoy);
  form.salidaDia.min = ymd(hoy);
  if (!form.entradaDia.value) form.entradaDia.value = ymd(manana);
  if (!form.salidaDia.value) form.salidaDia.value = ymd(vuelta);

  function fecha(dia, hora) { return dia && hora ? new Date(dia + 'T' + hora) : null; }
  function borrador() {
    return {
      entrada: fecha(form.entradaDia.value, form.entradaHora.value),
      salida: fecha(form.salidaDia.value, form.salidaHora.value),
      lugarTipo: form.lugarTipo.value,
      servicio: form.servicio.value
    };
  }
  function fechasOk(b) { return b.entrada && b.salida && b.salida > b.entrada; }

  /* ---------- Servicios extra (lavado, service…) y código de descuento ---------- */
  var extras = [], elegidos = {}, promo = null;
  function extrasElegidos() { return extras.filter(function (x) { return elegidos[x.id]; }); }
  function totalExtras() { return extrasElegidos().reduce(function (a, x) { return a + (x.precio || 0); }, 0); }
  function icoExtra(nombre) { return /lava/i.test(nombre) ? 'sparkles' : /service|mec[aá]n/i.test(nombre) ? 'wrench' : 'plus'; }
  function pintarExtras() {
    var caja = $('[data-extras]');
    $('[data-bloque-extras]').hidden = !extras.length;
    caja.innerHTML = extras.map(function (x) {
      return '<label class="extra"><input type="checkbox" value="' + escapar(x.id) + '"' + (elegidos[x.id] ? ' checked' : '') + '>' +
        '<span class="extra__caja">' + ico(icoExtra(x.nombre)) + '<strong>' + escapar(x.nombre) + '</strong>' +
        '<span class="extra__precio">' + (x.precio == null ? 'A cotizar' : '+ ' + plata(x.precio)) + '</span>' +
        (x.detalle ? '<small>' + escapar(x.detalle) + '</small>' : '') +
        '<span class="extra__marca" aria-hidden="true">' + ico('check') + '</span></span></label>';
    }).join('');
  }
  $('[data-extras]').addEventListener('change', function (e) {
    if (e.target.type === 'checkbox') { elegidos[e.target.value] = e.target.checked; pintarResumen(); }
  });

  function mensajePromo(txt, ok) {
    var el = $('[data-promo-ok]');
    el.innerHTML = txt; el.hidden = !txt;
    el.classList.toggle('es-error', !ok);
  }
  async function aplicarPromo() {
    var cod = form.promo.value.trim().toUpperCase().replace(/\s+/g, '');
    form.promo.value = cod;
    if (!cod) { promo = null; mensajePromo(''); error(2, ''); pintarResumen(); return true; }
    if (promo && promo.codigo === cod) return true;
    var btn = $('[data-aplicar-promo]');
    btn.disabled = true;
    try {
      promo = await PD.promoWeb(cod);
      error(2, '');
      mensajePromo(ico('circle-check') + '<span><strong>' + escapar(promo.codigo) + '</strong> aplicado: ' + promo.porcentaje + '% de descuento en el estacionamiento' + (promo.empresa ? ' · ' + escapar(promo.empresa) : '') + '.</span>', true);
      return true;
    } catch (e) {
      promo = null;
      mensajePromo(escapar(e.message), false);
      return false;
    } finally { btn.disabled = false; pintarResumen(); }
  }
  $('[data-aplicar-promo]').addEventListener('click', aplicarPromo);
  form.promo.addEventListener('keydown', function (e) { if (e.key === 'Enter') { e.preventDefault(); aplicarPromo(); } });
  form.promo.addEventListener('input', function () { if (promo && form.promo.value.trim().toUpperCase() !== promo.codigo) { promo = null; mensajePromo(''); } });

  /* ---------- Disponibilidad: la consulta el servidor (sin ver datos de otros clientes) ---------- */
  var disp = null, dispClave = '', dispTempo = null, listo = false;
  function libres(tipo) { return disp ? disp[tipo] : null; }
  function actualizarDisponibilidad() {
    var b = borrador();
    if (!listo || !fechasOk(b)) return;
    var clave = b.entrada.toISOString() + b.salida.toISOString();
    if (clave === dispClave) return;
    dispClave = clave;
    clearTimeout(dispTempo);
    dispTempo = setTimeout(function () {
      PD.disponibilidad(b.entrada.toISOString(), b.salida.toISOString())
        .then(function (d) { if (clave === dispClave) { disp = d; pintarResumen(); } })
        .catch(function () { disp = null; pintarResumen(); });
    }, 250);
  }
  function noDisponible() {
    error(1, 'La reserva online no está disponible en este momento. Escribinos por WhatsApp al 099 114 144 y te reservamos el lugar.');
    $('[data-siguiente]').disabled = true;
  }

  /* ---------- Precio y resumen en vivo ---------- */
  function etiquetaTipo(t) { return t === 'techado' ? 'Techado' : 'Predio'; }
  function etiquetaServicio(s) { return s === 'valet' ? 'Valet Parking' : 'Con traslado'; }
  var VEHICULOS = { auto: 'Auto', suv: 'SUV o camioneta', pickup: 'Pick-up', utilitario: 'Utilitario', moto: 'Moto' };
  function fechaLarga(d) {
    return d.toLocaleDateString('es-UY', { weekday: 'short', day: 'numeric', month: 'short' }) + ' · ' + d.toLocaleTimeString('es-UY', { hour: '2-digit', minute: '2-digit', hourCycle: 'h23' });
  }
  function fechaChip(d) { return d.toLocaleDateString('es-UY', { day: 'numeric', month: 'short' }).replace('.', ''); }
  function calcular(b, tipo) {
    return PD.precio({ entrada: b.entrada, salida: b.salida, lugarTipo: tipo || form.lugarTipo.value, servicio: form.servicio.value,
      descuentoPct: promo ? promo.porcentaje : 0, extrasTotal: totalExtras() });
  }
  /* Las líneas de la cotización: estacionamiento, valet o traslado, descuento y extras */
  function lineas(p, tipo, servicio) {
    var t = PD.datos().tarifas, l = [];
    l.push([etiquetaTipo(tipo) + ' · ' + p.dias + (p.dias === 1 ? ' día' : ' días') + ' × ' + plata(tipo === 'techado' ? t.techado : t.aire), plata(p.base)]);
    l.push(servicio === 'valet' ? ['Valet Parking', plata(p.extra)] : ['Traslado ida y vuelta', 'Incluido']);
    if (p.descuento) l.push(['Descuento ' + promo.codigo + ' (' + promo.porcentaje + '%)', '− ' + plata(p.descuento), 'descuento']);
    extrasElegidos().forEach(function (x) { l.push([x.nombre, x.precio == null ? 'A cotizar' : plata(x.precio)]); });
    return l;
  }
  function htmlLineas(l) {
    return l.map(function (x) { return '<li' + (x[2] ? ' class="es-' + x[2] + '"' : '') + '><span>' + escapar(x[0]) + '</span><span>' + x[1] + '</span></li>'; }).join('');
  }

  function pintarResumen() {
    var t = PD.datos().tarifas;
    if (!listo) return null;
    actualizarDisponibilidad();
    var b = borrador();
    var ok = fechasOk(b);
    $('[data-precio="valet"]').textContent = 'Te esperamos en la terminal y nosotros llevamos tu auto. + ' + plata(t.valet);
    ['techado', 'aire'].forEach(function (tipo) {
      var el = $('[data-libres="' + tipo + '"]');
      var input = $('input[name="lugarTipo"][value="' + tipo + '"]');
      var pt = ok ? PD.precio({ entrada: b.entrada, salida: b.salida, lugarTipo: tipo, servicio: 'traslado' }) : null;
      $('[data-total-lugar="' + tipo + '"]').textContent = pt ? plata(pt.total) : '';
      $('[data-precio="' + tipo + '"]').textContent = plata(t[tipo]) + ' por día' + (pt ? ' · ' + pt.dias + (pt.dias === 1 ? ' día' : ' días') : '');
      if (!ok) { el.textContent = ''; input.disabled = false; return; }
      var n = libres(tipo);
      if (n === null) { el.textContent = ''; input.disabled = false; return; }
      el.textContent = n > 0 ? (n === 1 ? 'Queda 1 lugar en esas fechas' : n + ' lugares libres en esas fechas') : 'Sin lugar en esas fechas';
      el.classList.toggle('es-agotado', n === 0);
      input.disabled = n === 0;
      if (n === 0 && input.checked) {
        var otro = $('input[name="lugarTipo"]:not(:checked):not(:disabled)');
        if (otro) otro.checked = true;
      }
    });
    $('[data-campo-pasajeros]').hidden = form.servicio.value === 'valet';
    var chip = $('[data-chip-fechas]');
    chip.hidden = !ok || form.hidden;
    var cot = $('[data-cotizacion]');
    if (!ok) {
      $('[data-total]').textContent = '$ —';
      $('[data-dias]').textContent = '';
      $('[data-cotizacion-total]').textContent = '$ —';
      cot.innerHTML = '';
      return null;
    }
    var p = calcular(b);
    $('[data-chip-texto]').textContent = fechaChip(b.entrada) + ' → ' + fechaChip(b.salida);
    $('[data-chip-dias]').textContent = p.dias + (p.dias === 1 ? ' día' : ' días');
    $('[data-total]').textContent = plata(p.total);
    $('[data-dias]').textContent = '· ' + p.dias + (p.dias === 1 ? ' día' : ' días');
    var l = htmlLineas(lineas(p, form.lugarTipo.value, form.servicio.value));
    cot.innerHTML = l;
    $('[data-cotizacion-total]').textContent = plata(p.total);
    $('[data-pagar-texto]').textContent = 'Pagar ' + plata(p.total);
    return p;
  }

  /* ---------- Validación por paso ---------- */
  function error(n, msj) {
    var el = $('[data-error="' + n + '"]');
    if (!el) return;
    el.textContent = msj || '';
    el.hidden = !msj;
  }
  async function validar(n) {
    error(n, '');
    if (n === 1) {
      var b = borrador();
      if (!b.entrada || !b.salida) return error(1, 'Completá el día y la hora de entrada y de salida.'), false;
      if (b.entrada < new Date(Date.now() - 3600000)) return error(1, 'La fecha de entrada ya pasó.'), false;
      if (b.salida <= b.entrada) return error(1, 'La salida tiene que ser después de la entrada.'), false;
      if (!$('input[name="lugarTipo"]:checked:not(:disabled)')) return error(1, 'No quedan lugares en esas fechas. Probá con otras.'), false;
    }
    if (n === 2) {
      if (form.promo.value.trim() && !(await aplicarPromo())) return error(2, 'El código de descuento no es válido: corregilo o borralo para seguir.'), false;
    }
    if (n === 3) {
      if (form.nombre.value.trim().length < 3) return error(3, 'Escribí tu nombre y apellido.'), false;
      if (form.telefono.value.replace(/\D/g, '').length < 8) return error(3, 'Revisá el WhatsApp: lo usamos para confirmarte.'), false;
      if (form.email.value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.value.trim())) return error(3, 'Revisá el email.'), false;
      if (form.matricula.value.replace(/\s/g, '').length < 5) return error(3, 'Revisá la matrícula.'), false;
      if (!form.modelo.value.trim()) return error(3, 'Contanos la marca y el modelo del auto.'), false;
      if (form.factura.checked) {
        if (form.facturaRut.value.replace(/\D/g, '').length !== 12) return error(3, 'El RUT tiene 12 dígitos.'), false;
        if (form.facturaRazon.value.trim().length < 2) return error(3, 'Escribí la razón social para la factura.'), false;
      }
    }
    return true;
  }

  /* ---------- Pasos ---------- */
  function marcarPasos(n) {
    $$('[data-indicador]').forEach(function (li) {
      var k = +li.getAttribute('data-indicador');
      li.classList.toggle('es-actual', k === n);
      li.classList.toggle('es-hecho', k < n);
    });
  }
  function mostrar(n) {
    paso = n;
    $$('[data-paso-reserva]').forEach(function (f) { f.hidden = +f.getAttribute('data-paso-reserva') !== n; });
    marcarPasos(n);
    $('[data-atras]').hidden = n === 1;
    $('[data-siguiente]').hidden = n === TOTAL_PASOS;
    $('[data-pagar]').hidden = n !== TOTAL_PASOS;
    $('[data-siguiente-texto]').textContent = n === 1 ? 'Ver precio' : n === 2 ? 'Mis datos' : 'Revisar';
    pintarResumen();
    if (n === TOTAL_PASOS) pintarRevisar();
    var titulo = $('[data-paso-reserva="' + n + '"] .paso-reserva__titulo');
    arriba();
    if (titulo) { titulo.setAttribute('tabindex', '-1'); titulo.focus({ preventScroll: true }); }
  }

  /* Paso 4: todo junto, con «Cambiar» para volver a cada parte */
  function pintarRevisar() {
    var b = borrador(), p = calcular(b), ex = extrasElegidos();
    function parte(titulo, n, filas) {
      return '<section class="revisar__parte"><header><h3>' + titulo + '</h3><button type="button" class="enlace-cambiar" data-ir-paso="' + n + '">' + ico('pencil') + 'Cambiar</button></header>' +
        '<dl class="detalle">' + filas.filter(Boolean).map(function (f) { return '<div><dt>' + f[0] + '</dt><dd>' + f[1] + '</dd></div>'; }).join('') + '</dl></section>';
    }
    var tel = escapar(form.telefono.value.trim()), mail = escapar(form.email.value.trim());
    $('[data-revisar]').innerHTML =
      parte('Fechas y lugar', 1, [['Entrada', fechaLarga(b.entrada)], ['Salida', fechaLarga(b.salida)], ['Lugar', etiquetaTipo(b.lugarTipo) + ' · ' + p.dias + (p.dias === 1 ? ' día' : ' días')]]) +
      parte('Servicio', 2, [['Llegada', etiquetaServicio(b.servicio) + (b.servicio === 'traslado' ? ' · ' + form.pasajeros.value + ' pasajeros' : '')],
        ex.length ? ['Extras', ex.map(function (x) { return escapar(x.nombre); }).join(', ')] : null,
        promo ? ['Descuento', escapar(promo.codigo) + ' · ' + promo.porcentaje + '%'] : null]) +
      parte('Tus datos', 3, [['A nombre de', escapar(form.nombre.value.trim()) + '<small>' + tel + (mail ? ' · ' + mail : '') + '</small>'],
        ['Auto', escapar(normalizarMatricula(form.matricula.value)) + ' · ' + escapar(form.modelo.value.trim()) + (form.color.value.trim() ? ' · ' + escapar(form.color.value.trim()) : '') + '<small>' + VEHICULOS[form.vehiculoTipo.value] + '</small>'],
        form.vueloIda.value.trim() || form.vueloVuelta.value.trim() ? ['Vuelos', escapar([form.vueloIda.value.trim() && 'ida ' + form.vueloIda.value.trim(), form.vueloVuelta.value.trim() && 'vuelta ' + form.vueloVuelta.value.trim()].filter(Boolean).join(' · ').toUpperCase())] : null,
        form.factura.checked ? ['Factura', 'e-Factura a ' + escapar(form.facturaRazon.value.trim()) + '<small>RUT ' + escapar(form.facturaRut.value.replace(/\D/g, '')) + '</small>'] : null,
        form.comentarios.value.trim() ? ['Comentarios', escapar(form.comentarios.value.trim())] : null]);
    $('[data-cotizacion-final]').innerHTML = '<p class="cotizacion__titulo">Total a pagar</p><ul class="cotizacion__lineas">' + htmlLineas(lineas(p, b.lugarTipo, b.servicio)) + '</ul>' +
      '<p class="cotizacion__total"><span>Total</span><strong>' + plata(p.total) + '</strong></p><p class="cotizacion__nota">IVA incluido' +
      (ex.some(function (x) { return x.precio == null; }) ? ' · Lo que dice «a cotizar» se coordina y se paga aparte.' : '') + '</p>';
  }
  form.addEventListener('click', function (e) {
    var b = e.target.closest('[data-ir-paso]');
    if (b) mostrar(+b.getAttribute('data-ir-paso'));
  });

  function normalizarMatricula(v) {
    var x = String(v || '').toUpperCase().replace(/\s+/g, '');
    var m = x.match(/^([A-Z]{3})(\d{3,4})$/);
    return m ? m[1] + ' ' + m[2] : String(v || '').toUpperCase().trim();
  }

  $('[data-siguiente]').addEventListener('click', async function () {
    var btn = this; btn.disabled = true;
    var ok = await validar(paso);
    btn.disabled = false;
    if (ok) { if (paso === 3) recordarDatos(); mostrar(paso + 1); }
  });
  $('[data-atras]').addEventListener('click', function () { mostrar(paso - 1); });
  form.addEventListener('input', pintarResumen);
  form.addEventListener('change', function (e) {
    if (e.target.matches('[data-pide-factura]')) $('[data-campos-factura]').hidden = !e.target.checked;
    pintarResumen();
  });
  form.addEventListener('submit', function (e) { e.preventDefault(); });
  form.matricula.addEventListener('blur', function () { form.matricula.value = normalizarMatricula(form.matricula.value); });

  /* ---------- Recordar los datos en este dispositivo (solo en este navegador, nunca en el servidor) ---------- */
  var CAMPOS_RECORDAR = ['nombre', 'telefono', 'email', 'matricula', 'vehiculoTipo', 'modelo', 'color', 'facturaRut', 'facturaRazon'];
  function recordarDatos() {
    try {
      if (!form.recordar.checked) { localStorage.removeItem('pd-mis-datos'); return; }
      var d = { factura: form.factura.checked };
      CAMPOS_RECORDAR.forEach(function (k) { d[k] = form[k].value.trim(); });
      localStorage.setItem('pd-mis-datos', JSON.stringify(d));
    } catch (e) { /* sin almacenamiento: no pasa nada */ }
  }
  (function cargarDatos() {
    try {
      var d = JSON.parse(localStorage.getItem('pd-mis-datos') || 'null');
      if (!d) return;
      CAMPOS_RECORDAR.forEach(function (k) { if (d[k] && !form[k].value) form[k].value = d[k]; });
      if (d.factura) { form.factura.checked = true; $('[data-campos-factura]').hidden = false; }
    } catch (e) { /* nada */ }
  })();

  /* Un link puede traer el código de una promoción: reservar.html?promo=EMPRESA15 */
  var qInicial = new URLSearchParams(location.search);
  if (qInicial.get('promo')) form.promo.value = qInicial.get('promo').toUpperCase().slice(0, 20);

  /* ---------- Pago ----------
     Con dLocal Go conectado (servicio de Cloudflare), «Pagar» crea la reserva, pide el cobro y lleva
     al cliente a la página segura de dLocal; a la vuelta (?pago=ok) se confirma y se muestra la reserva.
     Sin dLocal, el botón confirma el pago de prueba como hasta ahora. */
  var SERVICIO = ((window.PD_CONFIG || {}).reactivar || '').replace(/\/+$/, '');
  var conDlocal = false;
  if (SERVICIO) fetch(SERVICIO + '/', { cache: 'no-store' }).then(function (r) { return r.json(); }).then(function (j) {
    conDlocal = !!(j && j.pagos);
    if (conDlocal) {
      var n = $('.pasarela__nota'); if (n) n.textContent = 'Te llevamos a la página segura de dLocal Go para pagar con tarjeta de crédito o débito. Al terminar volvés acá.';
      if (j.pagos_entorno !== 'real') { var m = $('.pasarela__marca'); if (m) m.insertAdjacentHTML('beforeend', ' <small>· modo de prueba</small>'); }
    }
  }).catch(function () {});
  function servicio(ruta, cuerpo) {
    return fetch(SERVICIO + ruta, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(cuerpo) })
      .then(function (r) { return r.json().then(function (j) { if (!r.ok) { var e = new Error((j && j.error) || 'No se pudo conectar con el pago.'); e.codigo = j && j.error; throw e; } return j; }); });
  }
  function guardarPendiente(id, token, codigo) { try { sessionStorage.setItem('pd-pago-' + id, JSON.stringify({ token: token, codigo: codigo })); } catch (e) { /* sin almacenamiento: igual se paga */ } }
  function pendiente(id) { try { return JSON.parse(sessionStorage.getItem('pd-pago-' + id) || 'null'); } catch (e) { return null; } }

  /* ---------- Pasarela simulada ---------- */
  var pasarela = $('[data-pasarela]');
  var botonPagar = $('[data-pagar]');
  function abrirPasarela() {
    var p = pintarResumen();
    if (!p) return;
    $('[data-pasarela-monto]').textContent = plata(p.total);
    pasarela.hidden = false;
    document.documentElement.classList.add('pasarela-abierta');
    $('[data-pasarela-confirmar]').focus();
  }
  function cerrarPasarela() {
    pasarela.hidden = true;
    document.documentElement.classList.remove('pasarela-abierta');
    botonPagar.focus();
  }
  botonPagar.addEventListener('click', abrirPasarela);
  $('[data-pasarela-cancelar]').addEventListener('click', cerrarPasarela);
  pasarela.addEventListener('click', function (e) { if (e.target === pasarela) cerrarPasarela(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !pasarela.hidden) cerrarPasarela(); });

  $('[data-pasarela-confirmar]').addEventListener('click', async function () {
    var btn = this, err = $('[data-pasarela-error]'), texto = btn.querySelector('span');
    var b = borrador();
    btn.disabled = true; err.hidden = true;
    texto.textContent = 'Procesando…';
    try {
      var datos = {
        nombre: form.nombre.value.trim(), telefono: form.telefono.value.trim(), email: form.email.value.trim(),
        matricula: form.matricula.value.trim(), modelo: form.modelo.value.trim(), color: form.color.value.trim(),
        vehiculo_tipo: form.vehiculoTipo.value,
        lugar_tipo: form.lugarTipo.value, servicio: form.servicio.value, pasajeros: form.servicio.value === 'valet' ? 1 : +form.pasajeros.value,
        entrada: b.entrada.toISOString(), salida: b.salida.toISOString(),
        vuelo_ida: form.vueloIda.value.trim(), vuelo_vuelta: form.vueloVuelta.value.trim(),
        extras: extrasElegidos().map(function (x) { return x.id; }), promo: promo ? promo.codigo : '',
        factura_rut: form.factura.checked ? form.facturaRut.value.replace(/\D/g, '') : '',
        factura_razon: form.factura.checked ? form.facturaRazon.value.trim() : '',
        comentarios: form.comentarios.value.trim()
      };
      var r = await PD.reservarWeb(datos);
      if (conDlocal) {
        guardarPendiente(r.id, r.token, r.codigo);
        texto.textContent = 'Te llevamos a pagar…';
        try {
          var cobro = await servicio('/pago/crear', { reserva: r.id, token: r.token });
          irA(cobro.url);
          return;
        } catch (x) {
          if (x.codigo !== 'sin-pasarela') throw new Error('Tu reserva ' + r.codigo + ' quedó guardada, pero no pudimos abrir el pago: ' + x.message + ' Podés pagar al llegar o escribirnos por WhatsApp.');
        }
      }
      await PD.pagarWeb(r.id, r.token);
      cerrarPasarela();
      confirmar({
        codigo: r.codigo, entrada: r.entrada, salida: r.salida, total: r.total,
        lugarTipo: datos.lugar_tipo, servicio: datos.servicio,
        vehiculo: { matricula: normalizarMatricula(datos.matricula), modelo: datos.modelo, color: datos.color },
        cliente: { nombre: datos.nombre, telefono: datos.telefono },
        extras: (r.extras || []).map(function (x) { return x.nombre; }), promo: r.promo || ''
      });
    } catch (e) {
      err.textContent = e.message; err.hidden = false;
      dispClave = ''; actualizarDisponibilidad();
    } finally {
      btn.disabled = false; texto.textContent = 'Pagar';
    }
  });

  /* Detalle de la reserva ya hecha (lo que devolvió el servidor) */
  function pintarDetalle(dl, r) {
    var ent = new Date(r.entrada), sal = new Date(r.salida);
    var filas = [
      ['Entrada', fechaLarga(ent)],
      ['Salida', fechaLarga(sal)],
      ['Lugar', etiquetaTipo(r.lugarTipo) + ' · ' + etiquetaServicio(r.servicio)],
      ['Auto', r.vehiculo.matricula + ' · ' + r.vehiculo.modelo + (r.vehiculo.color ? ' · ' + r.vehiculo.color : '')],
      ['A nombre de', r.cliente.nombre + ' · ' + r.cliente.telefono],
      r.extras && r.extras.length ? ['Extras', r.extras.join(', ')] : null,
      r.promo ? ['Descuento', r.promo] : null,
      ['Total', plata(r.total) + ' · IVA incluido']
    ].filter(Boolean);
    dl.innerHTML = filas.map(function (f) { return '<div><dt>' + f[0] + '</dt><dd>' + escapar(f[1]) + '</dd></div>'; }).join('');
  }

  function confirmar(r) {
    form.hidden = true;
    marcarPasos(5);
    $('[data-chip-fechas]').hidden = true;
    $('[data-pie]').hidden = true;
    var c = $('[data-confirmacion]');
    $('[data-codigo]').textContent = r.codigo;
    var cl = $('[data-cambiar-link]'); if (cl) cl.href = 'mi-reserva.html?codigo=' + encodeURIComponent(r.codigo);
    pintarDetalle($('[data-detalle-final]'), r);
    var texto = 'Hola, hice la reserva ' + r.codigo + ' en Parking Despegar (' + r.vehiculo.matricula + ', ' +
      new Date(r.entrada).toLocaleDateString('es-UY') + ' al ' + new Date(r.salida).toLocaleDateString('es-UY') + ').';
    $('[data-wa-confirmacion]').href = 'https://wa.me/59899114144?text=' + encodeURIComponent(texto);
    c.hidden = false;
    arriba();
    c.focus({ preventScroll: true });
  }

  /* Si la base no responde (por ejemplo, en pausa por falta de uso), se ofrece WhatsApp,
     se le pide al servicio que la despierte y se vuelve a probar cada 30 segundos. */
  function arrancar() {
    Promise.all([PD.tarifasPublicas(), PD.extrasWeb()]).then(function (res) {
      extras = res[1] || [];
      pintarExtras();
      if (!listo) { listo = true; error(1, ''); $('[data-siguiente]').disabled = false; }
      if (form.promo.value) aplicarPromo();
      pintarResumen();
    }).catch(function () {
      noDisponible();
      PD.despertar();
      setTimeout(arrancar, 30000);
    });
  }
  /* ---------- Vuelta de dLocal: ?pago=ok (pagó) o ?pago=volver (no terminó) ---------- */
  function vueltaDelPago() {
    var q = new URLSearchParams(location.search), id = q.get('r'), estado = q.get('pago');
    if (!estado || !id) return false;
    var p = pendiente(id);
    history.replaceState(null, '', location.pathname);
    form.hidden = true; $('.vr__pasos').hidden = true; $('[data-pie]').hidden = true;
    var aviso = document.createElement('div');
    aviso.className = 'confirmacion pago-vuelta';
    aviso.setAttribute('tabindex', '-1');
    $('[data-confirmacion]').before(aviso);
    function mensaje(titulo, texto, botones) {
      aviso.innerHTML = '<p class="antetitulo">' + titulo + '</p><p class="bajada">' + texto + '</p>' + (botones ? '<div class="seccion__pie">' + botones + '</div>' : '');
      aviso.hidden = false;
    }
    var wa = '<a class="btn btn--linea" href="https://wa.me/59899114144?text=' + encodeURIComponent('Hola, tengo una consulta por el pago de mi reserva' + (p ? ' ' + p.codigo : '') + '.') + '" target="_blank" rel="noopener"><svg class="ico-marca" aria-hidden="true"><use href="#i-whatsapp"/></svg>Escribinos</a>';
    if (!p) { mensaje('Tu pago', 'No encontramos los datos del pago en este navegador. Si pagaste, te confirmamos por WhatsApp; si tenés dudas, escribinos.', wa); return true; }
    if (estado === 'volver') {
      mensaje('Pago sin terminar', 'Tu reserva <strong>' + p.codigo + '</strong> quedó guardada, pero el pago no se completó. Podés intentarlo de nuevo o pagar al llegar al parking.',
        '<button type="button" class="btn btn--primario" data-reintentar><svg class="ico" aria-hidden="true"><use href="#i-lock"/></svg>Intentar el pago de nuevo</button>' + wa);
      aviso.querySelector('[data-reintentar]').addEventListener('click', function () {
        var btn = this; btn.disabled = true;
        servicio('/pago/crear', { reserva: id, token: p.token }).then(function (c) { irA(c.url); })
          .catch(function (e) { btn.disabled = false; mensaje('Pago sin terminar', e.message, wa); });
      });
      return true;
    }
    mensaje('Confirmando tu pago…', 'Un momento: estamos esperando la confirmación de dLocal Go.');
    var intentos = 0;
    (function revisar() {
      Promise.all([servicio('/pago/estado', { reserva: id, token: p.token }), PD.tarifasPublicas()]).then(function (res) {
        var e = res[0];
        if (e.pagada) {
          aviso.remove();
          $('.vr__pasos').hidden = false;
          confirmar({ codigo: e.codigo, entrada: e.entrada, salida: e.salida, total: e.total, lugarTipo: e.lugar_tipo, servicio: e.servicio,
            vehiculo: { matricula: e.matricula, modelo: e.modelo, color: e.color }, cliente: { nombre: e.nombre, telefono: e.telefono },
            extras: e.extras || [], promo: e.promo || '' });
          try { sessionStorage.removeItem('pd-pago-' + id); } catch (x) { /* nada */ }
          return;
        }
        if (++intentos < 10) return setTimeout(revisar, 3000);
        mensaje('Pago en proceso', 'Tu reserva <strong>' + e.codigo + '</strong> está guardada y el pago todavía se está procesando. Apenas se acredite queda confirmada; si en un rato no te llega la confirmación, escribinos.', wa);
      }).catch(function (x) {
        if (++intentos < 10) return setTimeout(revisar, 3000);
        mensaje('No pudimos confirmar el pago', x.message + ' Si te cobraron, tu reserva queda confirmada igual: escribinos y lo revisamos.', wa);
      });
    })();
    return true;
  }

  mostrar(1);
  if (!PD.configurado) noDisponible();
  else { vueltaDelPago(); arrancar(); }
})();
