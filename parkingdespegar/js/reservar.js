/* ============================================================
   PARKING DESPEGAR — Reserva online
   Cuatro pasos: fechas · lugar y servicio · datos · pago.
   Tarifas y lugares libres vienen de la base en línea (js/datos.js).
   El total que vale lo calcula el servidor. La pasarela es de prueba:
   el botón «Pagar» crea la reserva y la marca pagada en la base, y el
   panel de gestión la ve al instante.
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

  /* ---------- Disponibilidad: la consulta el servidor (sin ver datos de otros clientes) ---------- */
  var disp = null, dispClave = '', dispTempo = null, listo = false;
  function libres(tipo) { return disp ? disp[tipo] : null; }
  function actualizarDisponibilidad() {
    var b = borrador();
    if (!listo || !b.entrada || !b.salida || b.salida <= b.entrada) return;
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

  /* ---------- Resumen en vivo ---------- */
  function etiquetaTipo(t) { return t === 'techado' ? 'Techado' : 'Predio'; }
  function etiquetaServicio(s) { return s === 'valet' ? 'Valet Parking' : 'Con traslado'; }
  function fechaLarga(d) {
    return d.toLocaleDateString('es-UY', { weekday: 'short', day: 'numeric', month: 'short' }) + ' · ' + d.toLocaleTimeString('es-UY', { hour: '2-digit', minute: '2-digit' });
  }

  function pintarResumen() {
    var t = PD.datos().tarifas;
    if (!listo) return null;
    actualizarDisponibilidad();
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
    if (r && r.total) p.total = r.total;
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
        lugar_tipo: form.lugarTipo.value, servicio: form.servicio.value, pasajeros: +form.pasajeros.value,
        entrada: b.entrada.toISOString(), salida: b.salida.toISOString(),
        vuelo_ida: form.vueloIda.value.trim(), vuelo_vuelta: form.vueloVuelta.value.trim()
      };
      var r = await PD.reservarWeb(datos);
      if (conDlocal) {
        guardarPendiente(r.id, r.token, r.codigo);
        texto.textContent = 'Te llevamos a pagar…';
        try {
          var cobro = await servicio('/pago/crear', { reserva: r.id, token: r.token });
          location.href = cobro.url;
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
        vehiculo: { matricula: datos.matricula.toUpperCase(), modelo: datos.modelo, color: datos.color },
        cliente: { nombre: datos.nombre, telefono: datos.telefono }
      });
    } catch (e) {
      err.textContent = e.message; err.hidden = false;
      dispClave = ''; actualizarDisponibilidad();
    } finally {
      btn.disabled = false; texto.textContent = 'Pagar';
    }
  });

  function confirmar(r) {
    form.hidden = true;
    $('.pasos-reserva').hidden = true;
    $('.reserva__resumen').hidden = true;
    var c = $('[data-confirmacion]');
    $('[data-codigo]').textContent = r.codigo;
    var cl = $('[data-cambiar-link]'); if (cl) cl.href = 'mi-reserva.html?codigo=' + encodeURIComponent(r.codigo);
    pintarDetalle($('[data-detalle-final]'), r);
    var texto = 'Hola, hice la reserva ' + r.codigo + ' en Parking Despegar (' + r.vehiculo.matricula + ', ' +
      new Date(r.entrada).toLocaleDateString('es-UY') + ' al ' + new Date(r.salida).toLocaleDateString('es-UY') + ').';
    $('[data-wa-confirmacion]').href = 'https://wa.me/59899114144?text=' + encodeURIComponent(texto);
    c.hidden = false;
    window.scrollTo({ top: c.getBoundingClientRect().top + window.scrollY - 100, behavior: 'smooth' });
    c.focus({ preventScroll: true });
  }

  /* Si la base no responde (por ejemplo, en pausa por falta de uso), se ofrece WhatsApp,
     se le pide al servicio que la despierte y se vuelve a probar cada 30 segundos. */
  function arrancar() {
    PD.tarifasPublicas().then(function () {
      if (!listo) { listo = true; error(1, ''); $('[data-siguiente]').disabled = false; }
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
    form.hidden = true; $('.pasos-reserva').hidden = true; $('.reserva__resumen').hidden = true;
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
        servicio('/pago/crear', { reserva: id, token: p.token }).then(function (c) { location.href = c.url; })
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
          confirmar({ codigo: e.codigo, entrada: e.entrada, salida: e.salida, total: e.total, lugarTipo: e.lugar_tipo, servicio: e.servicio,
            vehiculo: { matricula: e.matricula, modelo: e.modelo, color: e.color }, cliente: { nombre: e.nombre, telefono: e.telefono } });
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
