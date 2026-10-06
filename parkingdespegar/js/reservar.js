/* ============================================================
   PARKING DESPEGAR — Reserva online
   Cuatro pasos: fechas · lugar y servicio · datos · pago.
   El precio se calcula en vivo con las tarifas del dashboard
   (js/datos.js). El pago es SIMULADO: en producción se abre la
   pasarela real y la reserva se confirma cuando la pasarela avisa.
   ============================================================ */
(function () {
  'use strict';
  var form = document.getElementById('form-reserva');
  if (!form || !window.PD) return;

  var paso = 1;
  var TOTAL_PASOS = 4;
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var plata = function (n) { return '$ ' + Math.round(n).toLocaleString('es-UY'); };

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

  /* ---------- Disponibilidad: autos que se superponen con las fechas ---------- */
  function libres(tipo, entrada, salida) {
    var d = PD.datos();
    var capacidad = d.lugares.filter(function (l) { return l.tipo === tipo; }).length;
    var usados = d.reservas.filter(function (r) {
      if (r.lugarTipo !== tipo || r.estado === 'cancelada' || r.estado === 'finalizada') return false;
      return new Date(r.entrada) < salida && new Date(r.salida) > entrada;
    }).length;
    return Math.max(0, capacidad - usados);
  }

  /* ---------- Resumen en vivo ---------- */
  function etiquetaTipo(t) { return t === 'techado' ? 'Techado' : 'Predio'; }
  function etiquetaServicio(s) { return s === 'valet' ? 'Valet Parking' : 'Con traslado'; }
  function fechaLarga(d) {
    return d.toLocaleDateString('es-UY', { weekday: 'short', day: 'numeric', month: 'short' }) + ' · ' + d.toLocaleTimeString('es-UY', { hour: '2-digit', minute: '2-digit' });
  }

  function pintarResumen() {
    var t = PD.datos().tarifas;
    $$('[data-precio]').forEach(function (el) {
      var k = el.getAttribute('data-precio');
      el.textContent = k === 'valet' ? 'Te esperamos en la terminal. + ' + plata(t.valet) : plata(t[k]) + ' por día';
    });
    var b = borrador();
    var ok = b.entrada && b.salida && b.salida > b.entrada;
    ['techado', 'aire'].forEach(function (tipo) {
      var el = $('[data-libres="' + tipo + '"]');
      var input = $('input[name="lugarTipo"][value="' + tipo + '"]');
      if (!ok) { el.textContent = ''; input.disabled = false; return; }
      var n = libres(tipo, b.entrada, b.salida);
      el.textContent = n > 0 ? n + ' lugares libres en esas fechas' : 'Sin lugar en esas fechas';
      el.classList.toggle('es-agotado', n === 0);
      input.disabled = n === 0;
      if (n === 0 && input.checked) {
        var otro = $('input[name="lugarTipo"]:not(:checked):not(:disabled)');
        if (otro) otro.checked = true;
      }
    });
    var lineas = $('[data-lineas]');
    if (!ok) {
      $('[data-total]').textContent = '$ —';
      $('[data-dias]').textContent = 'Elegí las fechas';
      lineas.innerHTML = '';
      return null;
    }
    var p = PD.precio({ entrada: b.entrada, salida: b.salida, lugarTipo: form.lugarTipo.value, servicio: form.servicio.value }, t);
    $('[data-total]').textContent = plata(p.total);
    $('[data-dias]').textContent = p.dias + (p.dias === 1 ? ' día' : ' días');
    lineas.innerHTML =
      '<li><span>' + etiquetaTipo(form.lugarTipo.value) + ' · ' + p.dias + ' × ' + plata(form.lugarTipo.value === 'techado' ? t.techado : t.aire) + '</span><span>' + plata(p.base) + '</span></li>' +
      (p.extra ? '<li><span>Valet Parking</span><span>' + plata(p.extra) + '</span></li>' : '<li><span>Traslado a la terminal</span><span>Incluido</span></li>');
    return p;
  }

  /* ---------- Validación por paso ---------- */
  function error(n, msj) {
    var el = $('[data-error="' + n + '"]');
    if (!el) return;
    el.textContent = msj || '';
    el.hidden = !msj;
  }
  function validar(n) {
    error(n, '');
    if (n === 1) {
      var b = borrador();
      if (!b.entrada || !b.salida) return error(1, 'Completá el día y la hora de entrada y de salida.'), false;
      if (b.entrada < new Date(Date.now() - 3600000)) return error(1, 'La fecha de entrada ya pasó.'), false;
      if (b.salida <= b.entrada) return error(1, 'La salida tiene que ser después de la entrada.'), false;
    }
    if (n === 2) {
      if (!$('input[name="lugarTipo"]:checked')) return error(2, 'No quedan lugares en esas fechas. Probá con otras.'), false;
    }
    if (n === 3) {
      var mat = form.matricula.value.trim();
      if (mat.replace(/\s/g, '').length < 5) return error(3, 'Revisá la matrícula.'), false;
      if (!form.modelo.value.trim()) return error(3, 'Contanos la marca y el modelo del auto.'), false;
      if (form.nombre.value.trim().length < 3) return error(3, 'Escribí tu nombre y apellido.'), false;
      if (form.telefono.value.replace(/\D/g, '').length < 8) return error(3, 'Revisá el WhatsApp: lo usamos para confirmarte.'), false;
    }
    return true;
  }

  /* ---------- Pasos ---------- */
  function mostrar(n) {
    paso = n;
    $$('[data-paso-reserva]').forEach(function (f) { f.hidden = +f.getAttribute('data-paso-reserva') !== n; });
    $$('[data-indicador]').forEach(function (li) {
      var k = +li.getAttribute('data-indicador');
      li.classList.toggle('es-actual', k === n);
      li.classList.toggle('es-hecho', k < n);
    });
    $('[data-atras]').hidden = n === 1;
    $('[data-siguiente]').hidden = n === TOTAL_PASOS;
    $('[data-pagar]').hidden = n !== TOTAL_PASOS;
    if (n === TOTAL_PASOS) pintarDetalle($('[data-detalle]'));
    var p = pintarResumen();
    if (p) $('[data-pagar-texto]').textContent = 'Pagar ' + plata(p.total);
    var titulo = $('[data-paso-reserva="' + n + '"] .paso-reserva__titulo');
    var y = form.getBoundingClientRect().top + window.scrollY - 120;
    if (window.scrollY > y) window.scrollTo({ top: y, behavior: 'smooth' });
    if (titulo) { titulo.setAttribute('tabindex', '-1'); titulo.focus({ preventScroll: true }); }
  }

  function pintarDetalle(dl, r) {
    var b = r ? { entrada: new Date(r.entrada), salida: new Date(r.salida) } : borrador();
    var datos = r || {
      lugarTipo: form.lugarTipo.value, servicio: form.servicio.value,
      vehiculo: { matricula: form.matricula.value.trim().toUpperCase(), modelo: form.modelo.value.trim(), color: form.color.value.trim() },
      cliente: { nombre: form.nombre.value.trim(), telefono: form.telefono.value.trim() },
      pasajeros: form.pasajeros.value
    };
    var p = PD.precio({ entrada: b.entrada, salida: b.salida, lugarTipo: datos.lugarTipo, servicio: datos.servicio });
    var filas = [
      ['Entrada', fechaLarga(b.entrada)],
      ['Salida', fechaLarga(b.salida)],
      ['Lugar', etiquetaTipo(datos.lugarTipo) + ' · ' + etiquetaServicio(datos.servicio)],
      ['Auto', datos.vehiculo.matricula + ' · ' + datos.vehiculo.modelo + (datos.vehiculo.color ? ' · ' + datos.vehiculo.color : '')],
      ['A nombre de', datos.cliente.nombre + ' · ' + datos.cliente.telefono],
      ['Total', plata(p.total) + ' (' + p.dias + (p.dias === 1 ? ' día)' : ' días)')]
    ];
    dl.innerHTML = filas.map(function (f) { return '<div><dt>' + f[0] + '</dt><dd>' + escapar(f[1]) + '</dd></div>'; }).join('');
  }
  function escapar(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  $('[data-siguiente]').addEventListener('click', function () { if (validar(paso)) mostrar(paso + 1); });
  $('[data-atras]').addEventListener('click', function () { mostrar(paso - 1); });
  form.addEventListener('input', pintarResumen);
  form.addEventListener('change', pintarResumen);
  form.addEventListener('submit', function (e) { e.preventDefault(); });
  form.matricula.addEventListener('blur', function () {
    var v = form.matricula.value.toUpperCase().replace(/\s+/g, '');
    var m = v.match(/^([A-Z]{3})(\d{3,4})$/);
    form.matricula.value = m ? m[1] + ' ' + m[2] : form.matricula.value.toUpperCase();
  });

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

  $('[data-pasarela-confirmar]').addEventListener('click', function () {
    var btn = this;
    btn.disabled = true;
    btn.lastChild.textContent = 'Procesando…';
    setTimeout(function () {
      var b = borrador();
      var r = PD.crearReserva({
        origen: 'web',
        cliente: { nombre: form.nombre.value.trim(), telefono: form.telefono.value.trim(), email: form.email.value.trim() },
        vehiculo: { matricula: form.matricula.value.trim().toUpperCase(), modelo: form.modelo.value.trim(), color: form.color.value.trim() },
        lugarTipo: form.lugarTipo.value, servicio: form.servicio.value, pasajeros: +form.pasajeros.value,
        entrada: b.entrada.toISOString(), salida: b.salida.toISOString(),
        vuelo: { ida: form.vueloIda.value.trim().toUpperCase(), vuelta: form.vueloVuelta.value.trim().toUpperCase() }
      }, 'web');
      var medio = (form.ownerDocument.querySelector('input[name="medio"]:checked') || {}).value || 'online';
      PD.registrarPago(r, r.total, 'online', 'web', 'WEB-' + PD.uid().toUpperCase().slice(0, 6) + ' · ' + medio);
      btn.disabled = false;
      btn.lastChild.textContent = 'Confirmar pago';
      cerrarPasarela();
      confirmar(r);
    }, 1400);
  });

  function confirmar(r) {
    form.hidden = true;
    $('.pasos-reserva').hidden = true;
    $('.reserva__resumen').hidden = true;
    var c = $('[data-confirmacion]');
    $('[data-codigo]').textContent = r.codigo;
    pintarDetalle($('[data-detalle-final]'), r);
    var texto = 'Hola, hice la reserva ' + r.codigo + ' en Parking Despegar (' + r.vehiculo.matricula + ', ' +
      new Date(r.entrada).toLocaleDateString('es-UY') + ' al ' + new Date(r.salida).toLocaleDateString('es-UY') + ').';
    $('[data-wa-confirmacion]').href = 'https://wa.me/59899114144?text=' + encodeURIComponent(texto);
    c.hidden = false;
    window.scrollTo({ top: c.getBoundingClientRect().top + window.scrollY - 100, behavior: 'smooth' });
    c.focus({ preventScroll: true });
  }

  PD.alCambiar(pintarResumen);
  mostrar(1);
})();
