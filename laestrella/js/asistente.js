/* GENERADO desde supabase/servicio/worker.js con generar-asistente-web.py. No se edita a mano.
   Es la misma lógica que usa el asistente de WhatsApp: entiende la pregunta y arma la respuesta. */
(function () {
  'use strict';
  var UY = 3 * 3600000;
  /* ---------- Entender la pregunta (palabras clave, sin IA) ---------- */
  const TEMAS = [
    ['ayuda', /\b(ayuda|menu|opciones|que (me )?(podes|puedo|sabes)|como (te )?(uso|funciona)s?|comandos)\b/],
    ['resumen', /\b(resumen|como (viene|va|vamos|venimos|estamos|anda|andamos)|novedades|todo el dia|en general)\b/],
    ['deudores', /deud|fiad|fio\b|fiaron|a cuenta|cuenta corriente|\bdeb(e|en)\b|moros|cobrar a/],
    ['top', /mas vendid|vende mas|se vende mas|vendio mas|mas se vendio|mas se vende|mejor(es)? (producto|venta)|\btop\b|lo que mas/],
    ['caja', /\bcaja\b|arqueo|turno/],
    ['stock', /\bstock\b|falt(a|an|ando)|repon|reposicion|agotad|se acab|sin stock|quedan?\b|minimo|\bpedir\b/],
    ['compras', /\bcompras?\b|proveedor|mercaderia|pedidos? a/],
    ['equipo', /emplead|\bequipo\b|\bpersonal\b|trabaj|cajer[ao]s?|quien(es)? (esta|estan|vino|vinieron)/],
    ['ventas', /\bvend|factur|\bcobr|recaud|\bplata\b|ingres|gananci|\bgane\b|ganamos|dinero|\bpesos\b|tarjeta|transferencia|efectivo|\bqr\b|debito|credito|cuanto (hice|hicimos|saque|sacamos|entro|entraron)|tickets?|ventas?/]
  ];
  const MESES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
  const GRACIAS = /^(muchas |mil )?(gracias|genial|perfecto|buenisimo|joya|barbaro|excelente|ok|okey|oka|listo|dale|bien|impecable|crack|bueno|ta|vale)( (gracias|crack|joya|genial))*$/;
  const SALUDO = /^(hola|holis|buenas|buen dia|buenos dias|buenas tardes|buenas noches|que tal|hey)\b/;

  function normalizar(t) {
    return String(t || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/setiembre/g, 'septiembre')
      .replace(/[^a-z0-9ñ ]+/g, ' ').replace(/\s+/g, ' ').trim();
  }

  // «stock de arroz», «a cuánto está la yerba», «cuánto cuesta el aceite» → el producto que se nombra
  const PRODUCTO = [
    /\b(?:stock|precio|cuesta|sale|vale|hay|quedan?|queda)\s+(?:de|del|de la|de los|de las)\s+([a-z0-9ñ ]{2,30})/,
    /\ba cuanto (?:esta|estan|sale|salen|vale|valen|cuesta|cuestan)\s+(?:el|la|los|las)?\s*([a-z0-9ñ ]{2,30})/,
    /\bcuanto (?:cuesta|cuestan|sale|salen|vale|valen)\s+(?:el|la|los|las|un|una)?\s*([a-z0-9ñ ]{2,30})/,
    /\bcuant[oa]s?\s+([a-z0-9ñ ]{2,30}?)\s+(?:hay|quedan?|tengo|tenemos)\b/
  ];
  const CORTE = /\b(hoy|ayer|ahora|por favor|porfa|gracias|en stock|que|y|esta semana|este mes)\b.*$/;
  function buscarProducto(t) {
    for (const re of PRODUCTO) {
      const m = t.match(re);
      if (!m) continue;
      const v = m[1].replace(CORTE, '').replace(/^(el|la|los|las|un|una)\s+/, '').trim();
      if (v.length >= 3 && !/^(stock|ventas?|caja|deudas?|falta|dinero|plata)$/.test(v)) return v;
    }
    return null;
  }

  function interpretar(texto, ahora) {
    const t = normalizar(texto);
    const r = (temas, extra) => Object.assign({ texto: t, temas, periodo: periodo(t, ahora), producto: null, deudor: null }, extra);
    if (GRACIAS.test(t)) return r(['gracias']);
    const producto = buscarProducto(t);
    if (producto) return r(['producto'], { producto });
    let temas = TEMAS.map(([n, re]) => [n, t.search(re)]).filter(([, i]) => i >= 0).sort((a, b) => a[1] - b[1]).map(([n]) => n);
    if (temas.includes('top')) temas = temas.filter((x) => x !== 'ventas');
    if (temas.includes('caja') && temas.includes('ventas') && !/factur|cobr|recaud|vend/.test(t)) temas = temas.filter((x) => x !== 'ventas');
    if (temas.includes('resumen') && temas.length > 1) temas = temas.filter((x) => x !== 'resumen');
    if (temas.includes('ayuda') && temas.length > 1) temas = temas.filter((x) => x !== 'ayuda');
    if (temas.includes('compras') && temas.includes('stock')) temas = temas.filter((x) => x !== 'compras');
    let deudor = null;
    if (temas.includes('deudores')) {
      const m = t.match(/\b(?:debe|deben|deuda de|le debe|cuenta de|fiado a|fio a|fiaron a|cuanto debe)\s+(?:el |la |don |dona )?([a-zñ]{3,}(?: [a-zñ]{3,})?)/);
      if (m && !/^(hoy|ayer|plata|total|todos|todo|semana|mes|ano)$/.test(m[1])) deudor = m[1];
    }
    if (!temas.length && SALUDO.test(t)) temas = ['ayuda'];
    // «¿y ayer?», «esta semana»: solo el período, se entiende que sigue hablando de lo vendido
    if (!temas.length && periodo(t, ahora).clave !== 'hoy') temas = ['ventas'];
    return r(temas, { deudor });
  }

  /* «ayer», «esta semana», «el mes pasado», «septiembre»… → desde/hasta (hora de Uruguay) */
  function periodo(t, ahora) {
    const loc = new Date(ahora - UY);
    const y = loc.getUTCFullYear(), m = loc.getUTCMonth(), d = loc.getUTCDate();
    const dia = (yy, mm, dd) => new Date(Date.UTC(yy, mm, dd) + UY).toISOString();
    const lunes = d - ((loc.getUTCDay() + 6) % 7);
    const r = (clave, nombre, desde, hasta) => ({ clave, nombre, desde, hasta });
    if (/antes de ayer|anteayer/.test(t)) return r('anteayer', 'Anteayer', dia(y, m, d - 2), dia(y, m, d - 1));
    if (/\bayer\b/.test(t)) return r('ayer', 'Ayer', dia(y, m, d - 1), dia(y, m, d));
    if (/semana pasada/.test(t)) return r('semana-pasada', 'La semana pasada', dia(y, m, lunes - 7), dia(y, m, lunes));
    if (/\bsemana\b/.test(t)) return r('semana', 'Esta semana', dia(y, m, lunes), dia(y, m, d + 1));
    if (/mes pasado/.test(t)) return r('mes-pasado', 'El mes pasado', dia(y, m - 1, 1), dia(y, m, 1));
    const mes = MESES.findIndex((n) => new RegExp('\\b' + n + '\\b').test(t));
    if (mes >= 0) {
      const ano = mes > m ? y - 1 : y;
      return r('mes-' + mes, 'En ' + MESES[mes] + (ano !== y ? ' de ' + ano : ''), dia(ano, mes, 1), dia(ano, mes + 1, 1));
    }
    if (/\bmes\b/.test(t)) return r('mes', 'Este mes', dia(y, m, 1), dia(y, m, d + 1));
    if (/\bano\b|\banual\b/.test(t)) return r('ano', 'Este año', dia(y, 0, 1), dia(y, m, d + 1));
    return r('hoy', 'Hoy', dia(y, m, d), dia(y, m, d + 1));
  }

  /* ---------- Armar la respuesta ---------- */
  const MEDIOS = { efectivo: 'Efectivo', debito: 'Débito', credito: 'Crédito', qr: 'QR' };
  // Los montos de la base van en centavos
  function plata(c) { return '$ ' + String(Math.round((c || 0) / 100)).replace(/\B(?=(\d{3})+(?!\d))/g, '.'); }
  function hora(iso) { const x = new Date(new Date(iso).getTime() - UY); return String(x.getUTCHours()).padStart(2, '0') + ':' + String(x.getUTCMinutes()).padStart(2, '0'); }
  function n(c, uno, varios) { return c + ' ' + (c === 1 ? uno : varios); }
  function primero(nombre) { return String(nombre || '').trim().split(/\s+/)[0] || ''; }
  function cant(x, unidad) { const v = Math.round(Number(x) * 1000) / 1000; return String(v).replace('.', ',') + (unidad === 'kg' ? ' kg' : ''); }
  function lista(items, fn, max = 8) {
    const v = items.slice(0, max).map(fn);
    if (items.length > max) v.push('…y ' + (items.length - max) + ' más');
    return v.join('\n');
  }
  function saludo(ahora = Date.now()) {
    const h = new Date(ahora - UY).getUTCHours();
    return h < 6 ? 'Buenas noches' : h < 13 ? 'Buen día' : h < 20 ? 'Buenas tardes' : 'Buenas noches';
  }

  function responder(p, f, ahora = Date.now()) {
    const quien = primero(f.quien);
    if (p.temas.includes('gracias')) return 'De nada' + (quien ? ', ' + quien : '') + '. Cualquier cosa me preguntás.';
    if (p.producto) return respProducto(p);
    if (!p.temas.length) return 'No te entendí' + (quien ? ', ' + quien : '') + '. ' + ayuda(ahora, true);
    const partes = [];
    for (const t of p.temas) {
      const x = t === 'ayuda' ? ayuda(ahora, false, quien) : t === 'resumen' ? resumen(p, f) : t === 'ventas' ? ventas(p, f)
        : t === 'top' ? top(p, f) : t === 'caja' ? caja(f) : t === 'stock' ? stock(f) : t === 'deudores' ? deudores(p, f)
        : t === 'compras' ? compras(f) : t === 'equipo' ? equipo(f) : '';
      if (x) partes.push(x);
    }
    return partes.join('\n\n');
  }

  function ayuda(ahora, corto, quien) {
    const ej = '• «¿Cuánto vendí hoy?» (también ayer, esta semana, este mes, un mes por nombre)\n• «¿Cómo está la caja?»\n• «¿Qué falta reponer?»\n• «¿Cuánto stock hay de arroz?»\n• «¿Quién debe?» o «¿Cuánto debe Ana?»\n• «¿Qué se vendió más?»\n• «¿Cómo vamos?» para un resumen';
    if (corto) return 'Probá con algo como:\n' + ej;
    return saludo(ahora) + (quien ? ' ' + quien : '') + '. Soy el asistente de La Estrella. Me podés preguntar, por escrito o con un audio:\n' + ej;
  }

  function ventas(p, f) {
    const x = f.periodo, nom = p.periodo.nombre;
    if (!x.tickets && !x.tickets_fiado && !x.cobros_deuda_n) return '*' + nom + '* todavía no hay ventas.';
    const l = ['*' + nom + ' se vendió ' + plata(x.ventas) + '* en ' + n(x.tickets, 'ticket', 'tickets') + '.'];
    const medios = Object.entries(x.por_medio || {}).sort((a, b) => b[1] - a[1]);
    if (medios.length) l.push(medios.map(([m, v]) => '• ' + (MEDIOS[m] || m) + ': ' + plata(v)).join('\n'));
    if (x.tickets_fiado) l.push('A cuenta (sin cobrar): ' + plata(x.fiado) + ' en ' + n(x.tickets_fiado, 'ticket', 'tickets') + '.');
    if (x.cobros_deuda_n) l.push('Cobros de deudas: ' + plata(x.cobros_deuda) + ' (' + n(x.cobros_deuda_n, 'pago', 'pagos') + ').');
    if (x.anuladas) l.push('Tickets anulados: ' + x.anuladas + '.');
    return l.join('\n');
  }
  function top(p, f) {
    const t = f.periodo.top || [];
    if (!t.length) return '*' + p.periodo.nombre + '* todavía no se vendió nada.';
    return '*Lo más vendido (' + p.periodo.nombre.toLowerCase() + '):*\n' + t.map((x, i) => (i + 1) + '. ' + x.nombre + ' — ' + cant(x.cant, x.unidad) + ' (' + plata(x.monto) + ')').join('\n');
  }
  function caja(f) {
    const c = f.caja;
    if (!c.abierta) {
      const u = c.ultimo;
      return '*La caja está cerrada.*' + (u ? '\nÚltimo cierre: ' + hora(u.cierre) + ' por ' + u.cerro + '. Esperado ' + plata(u.esperado) + ', contado ' + plata(u.contado) + (u.contado === u.esperado ? ' (justo).' : ' (diferencia ' + (u.contado > u.esperado ? '+' : '-') + plata(Math.abs(u.contado - u.esperado)) + ').') : '');
    }
    return '*Caja abierta* por ' + c.abrio + ' desde las ' + hora(c.apertura) + ' (turno ' + c.turno + ').\nEfectivo que tiene que haber: ' + plata(c.efectivo) + '.\nVendido en el turno: ' + plata(c.ventas) + '.';
  }
  function stock(f) {
    const s = f.stock;
    if (!s.sin_stock_n && !s.bajo_n) return '*Stock:* todo en orden, nada por debajo del mínimo.';
    const l = [];
    if (s.sin_stock_n) l.push('*Sin stock (' + s.sin_stock_n + '):*\n' + lista(s.sin_stock, (x) => '• ' + x, 10) + (s.sin_stock_n > s.sin_stock.length ? '\n…y ' + (s.sin_stock_n - s.sin_stock.length) + ' más' : ''));
    if (s.bajo_n) l.push('*Para reponer (' + s.bajo_n + '):*\n' + lista(s.bajo, (x) => '• ' + x.nombre + ': quedan ' + cant(x.stock, x.unidad) + ' (mínimo ' + cant(x.minimo, x.unidad) + ')', 10) + (s.bajo_n > s.bajo.length ? '\n…y ' + (s.bajo_n - s.bajo.length) + ' más' : ''));
    return l.join('\n\n');
  }
  function deudores(p, f) {
    const d = f.deudores;
    if (p.deudor) {
      const hallados = d.lista.filter((x) => normalizar(x.nombre).includes(p.deudor));
      if (!hallados.length) return 'No encontré a nadie llamado «' + p.deudor + '» con deuda.';
      return hallados.slice(0, 5).map((x) => '*' + x.nombre + '* debe ' + plata(x.saldo) + (x.limite ? ' (límite ' + plata(x.limite) + ', usa el ' + Math.round(x.saldo * 100 / x.limite) + ' %)' : ' (sin límite)') + '.').join('\n');
    }
    if (!d.n) return '*Deudores:* nadie debe nada.';
    const cerca = d.lista.filter((x) => x.limite > 0 && x.saldo * 10 >= x.limite * 8);
    return '*Deudores:* ' + n(d.n, 'persona debe', 'personas deben') + ' en total ' + plata(d.total) + '.\n' +
      lista(d.lista, (x) => '• ' + x.nombre + ': ' + plata(x.saldo) + (x.limite > 0 && x.saldo >= x.limite ? ' (pasó su límite)' : x.limite > 0 && x.saldo * 10 >= x.limite * 8 ? ' (cerca del límite)' : '')) +
      (cerca.length ? '\n\nCerca o por encima del límite: ' + cerca.length + '.' : '');
  }
  function compras(f) {
    const c = f.compras;
    if (!c.sin_recibir && !c.sin_pagar) return '*Compras:* no hay nada pendiente.';
    return '*Compras:* ' + n(c.sin_recibir, 'pedido sin recibir', 'pedidos sin recibir') + ' y ' + n(c.sin_pagar, 'compra sin pagar', 'compras sin pagar') + (c.sin_pagar ? ' (' + plata(c.sin_pagar_total) + ')' : '') + '.';
  }
  function equipo(f) {
    const t = f.trabajando || [];
    return t.length ? '*Trabajando ahora:*\n' + t.map((x) => '• ' + x.nombre + ' (desde las ' + hora(x.desde) + ')').join('\n') : 'Ahora no hay nadie con la jornada abierta.';
  }
  function respProducto(p) {
    if (p.fallo) return 'No pude buscar el producto. Probá de nuevo en un rato.';
    const e = p.encontrados || [];
    if (!e.length) return 'No encontré ningún producto que se parezca a «' + p.producto + '».';
    return e.map((x) => '*' + x.nombre + '*: ' + plata(x.precio) + (x.unidad === 'kg' ? ' el kg' : '') + ', hay ' + cant(x.stock, x.unidad) + (x.stock <= 0 ? ' (sin stock)' : x.stock < x.minimo ? ' (por debajo del mínimo)' : '') + '.').join('\n');
  }
  function resumen(p, f) {
    const x = f.periodo, c = f.caja, s = f.stock, d = f.deudores;
    const l = ['*Resumen: ' + p.periodo.nombre.toLowerCase() + '*', 'Vendido: ' + plata(x.ventas) + ' en ' + n(x.tickets, 'ticket', 'tickets') + (x.tickets_fiado ? ' (más ' + plata(x.fiado) + ' a cuenta)' : '') + '.'];
    l.push(c.abierta ? 'Caja abierta: efectivo ' + plata(c.efectivo) + '.' : 'Caja cerrada.');
    l.push(s.sin_stock_n || s.bajo_n ? 'Stock: ' + n(s.sin_stock_n, 'producto sin stock', 'productos sin stock') + ' y ' + n(s.bajo_n, 'por reponer', 'por reponer') + '.' : 'Stock en orden.');
    l.push(d.n ? 'Deudores: ' + plata(d.total) + ' entre ' + n(d.n, 'persona', 'personas') + '.' : 'Nadie debe nada.');
    return l.join('\n');
  }
  window.ASISTENTE = { interpretar: interpretar, responder: responder, normalizar: normalizar };
})();
