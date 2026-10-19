/* ============================================================
   PARKING DESPEGAR — Cambiar mi reserva
   El cliente se identifica con el código de la reserva y su WhatsApp,
   y mueve la entrada o la salida (vuelo atrasado, se queda más días).
   El servidor controla que haya lugar y recalcula el precio; la
   diferencia se paga (o se devuelve) en el parking.
   ============================================================ */
(function () {
  'use strict';
  var fb = document.getElementById('form-buscar'), fc = document.getElementById('form-cambiar');
  if (!fb || !fc || !window.PD) return;

  var $ = function (s, c) { return (c || document).querySelector(s); };
  var plata = function (n) { return '$ ' + Math.round(n).toLocaleString('es-UY'); };
  var esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };
  function ymd(d) { return d.getFullYear() + '-' + PD.pad(d.getMonth() + 1) + '-' + PD.pad(d.getDate()); }
  function hm(d) { return PD.pad(d.getHours()) + ':' + PD.pad(d.getMinutes()); }
  function fecha(dia, hora) { return dia && hora ? new Date(dia + 'T' + hora) : null; }
  function fechaLarga(d) {
    d = new Date(d);
    return d.toLocaleDateString('es-UY', { weekday: 'short', day: 'numeric', month: 'short' }) + ' · ' + d.toLocaleTimeString('es-UY', { hour: '2-digit', minute: '2-digit', hourCycle: 'h23' });
  }
  function fila(k, v) { return '<div><dt>' + k + '</dt><dd>' + v + '</dd></div>'; }
  function error(el, txt) { el.textContent = txt; el.hidden = !txt; }

  var res = null, codigo = '', telefono = '', tarifasListas = false;
  PD.tarifasPublicas().then(function () { tarifasListas = true; precio(); }).catch(function () {});

  /* Un link puede traer el código: mi-reserva.html?codigo=PD-1024 */
  var q = new URLSearchParams(location.search);
  if (q.get('codigo')) fb.codigo.value = q.get('codigo');

  /* ---------- Paso 1: buscar ---------- */
  fb.addEventListener('submit', async function (e) {
    e.preventDefault();
    var err = $('[data-error-buscar]'), btn = fb.querySelector('[type=submit]');
    error(err, '');
    codigo = fb.codigo.value.trim(); telefono = fb.telefono.value.trim();
    if (!/\d{3,}/.test(codigo)) return error(err, 'Escribí el código de tu reserva, por ejemplo PD-1024.');
    if (telefono.replace(/\D/g, '').length < 8) return error(err, 'Escribí el WhatsApp que dejaste al reservar.');
    btn.disabled = true;
    try { res = await PD.verReservaWeb(codigo, telefono); }
    catch (x) { res = null; error(err, x.message); }
    btn.disabled = false;
    if (res) mostrar();
  });

  function mostrar() {
    var adentro = res.estado === 'en_predio';
    $('[data-saludo]').textContent = 'Hola ' + res.nombre + ', esta es tu reserva';
    $('[data-actual]').innerHTML = fila('Código', '<strong>' + esc(res.codigo) + '</strong>') + fila('Auto', esc(res.matricula)) +
      fila('Entrada', fechaLarga(res.entrada)) + fila('Salida', fechaLarga(res.salida)) +
      fila('Lugar', (res.lugar_tipo === 'techado' ? 'Techado' : 'Predio') + ' · ' + (res.servicio === 'valet' ? 'Valet Parking' : 'Con traslado'));
    var cerrada = res.estado !== 'confirmada' && !adentro;
    $('[data-explica]').textContent = cerrada ? 'Esta reserva ya terminó o está cancelada. Si necesitás algo, escribinos por WhatsApp.'
      : adentro ? 'Tu auto ya está en el parking: podés cambiar el día y la hora en que lo retirás. Si te quedás más días, la diferencia se paga al retirarlo.'
      : 'Elegí las fechas nuevas. Te mostramos el precio actualizado antes de guardar.';
    $('[data-grupo-entrada]').hidden = adentro || cerrada;
    fc.salidaDia.closest('.campo-grupo').hidden = cerrada;
    $('[data-guardar]').hidden = cerrada;
    var ent = new Date(res.entrada), sal = new Date(res.salida), hoy = new Date();
    fc.entradaDia.value = ymd(ent); fc.entradaHora.value = hm(ent); fc.entradaDia.min = ymd(hoy);
    fc.salidaDia.value = ymd(sal); fc.salidaHora.value = hm(sal); fc.salidaDia.min = ymd(hoy);
    fb.hidden = true; fc.hidden = false; $('[data-listo]').hidden = true;
    error($('[data-error-cambiar]'), '');
    precio();
    fc.scrollIntoView({ block: 'start', behavior: 'smooth' });
  }

  /* ---------- Paso 2: fechas nuevas y precio ---------- */
  function nuevas() {
    var adentro = res.estado === 'en_predio';
    return { entrada: adentro ? new Date(res.entrada) : fecha(fc.entradaDia.value, fc.entradaHora.value), salida: fecha(fc.salidaDia.value, fc.salidaHora.value) };
  }
  function precio() {
    var el = $('[data-precio-nuevo]');
    if (!res || !el) return;
    var n = nuevas();
    if (!n.entrada || !n.salida || n.salida <= n.entrada) { el.textContent = 'La salida tiene que ser después de la entrada.'; return; }
    if (!tarifasListas) { el.textContent = ''; return; }
    if (res.estado === 'en_predio') {
      var real = PD.precio({ entrada: n.entrada, salida: n.salida, lugarTipo: res.lugar_tipo, servicio: res.servicio, descuentoPct: res.descuento_pct, extrasTotal: res.extras_total });
      var dif = real.total - res.total;
      el.innerHTML = 'Retirás el <strong>' + fechaLarga(n.salida) + '</strong>' + (dif > 0 ? '<small>Son ' + real.dias + ' días: al retirarlo se pagan ' + plata(dif) + ' de diferencia.</small>' : '');
      return;
    }
    var p = PD.precio({ entrada: n.entrada, salida: n.salida, lugarTipo: res.lugar_tipo, servicio: res.servicio, descuentoPct: res.descuento_pct, extrasTotal: res.extras_total }), saldo = p.total - res.pagado;
    el.innerHTML = 'Nuevo total <strong>' + plata(p.total) + '</strong><small>' + p.dias + (p.dias === 1 ? ' día' : ' días') +
      (p.total !== res.total ? ' · antes ' + plata(res.total) : ' · el precio no cambia') +
      (res.pagado > 0 ? (saldo > 0 ? ' · ya pagaste ' + plata(res.pagado) + ': la diferencia de ' + plata(saldo) + ' se paga al llegar' : saldo < 0 ? ' · ya pagaste ' + plata(res.pagado) + ': te devolvemos ' + plata(-saldo) + ' en el parking' : ' · ya está pago') : ' · se paga al llegar') + '</small>';
  }
  fc.addEventListener('input', precio);
  fc.addEventListener('change', precio);
  $('[data-otra]').addEventListener('click', function () { fc.hidden = true; fb.hidden = false; res = null; fb.codigo.focus(); });

  fc.addEventListener('submit', async function (e) {
    e.preventDefault();
    var err = $('[data-error-cambiar]'), btn = $('[data-guardar]'), n = nuevas();
    error(err, '');
    if (!n.entrada || !n.salida) return error(err, 'Completá el día y la hora.');
    if (n.salida <= n.entrada) return error(err, 'La salida tiene que ser después de la entrada.');
    btn.disabled = true;
    var r;
    try { r = await PD.cambiarReservaWeb(codigo, telefono, n.entrada.toISOString(), n.salida.toISOString()); }
    catch (x) { error(err, x.message); btn.disabled = false; return; }
    btn.disabled = false;
    listo(n, r);
  });

  function listo(n, r) {
    var adentro = res.estado === 'en_predio', saldo = r.total - r.pagado;
    $('[data-codigo-listo]').textContent = res.codigo;
    $('[data-texto-listo]').textContent = r.sin_cambios ? 'Las fechas quedaron igual que antes.'
      : adentro ? 'Te esperamos el ' + fechaLarga(n.salida) + '. Si te quedás más días, la diferencia se paga al retirar el auto.'
      : 'Listo, ya está actualizada. ' + (saldo > 0 ? 'Al llegar se pagan ' + plata(saldo) + '.' : saldo < 0 ? 'Te devolvemos ' + plata(-saldo) + ' en el parking.' : 'No hay nada más para pagar.');
    $('[data-detalle-listo]').innerHTML = fila('Entrada', fechaLarga(n.entrada)) + fila('Salida', fechaLarga(n.salida)) + (adentro ? '' : fila('Total', plata(r.total)));
    $('[data-wa-listo]').href = 'https://wa.me/59899114144?text=' + encodeURIComponent('Hola, cambié las fechas de mi reserva ' + res.codigo + ' (' + res.matricula + '): entrada ' + fechaLarga(n.entrada) + ', salida ' + fechaLarga(n.salida) + '.');
    fc.hidden = true;
    var l = $('[data-listo]'); l.hidden = false; l.focus();
  }

  /* Si la base estaba en pausa, la despierta (igual que la reserva) */
  PD.salud().then(function (s) { if (s === 'pausada') PD.despertar(); }).catch(function () {});
})();
