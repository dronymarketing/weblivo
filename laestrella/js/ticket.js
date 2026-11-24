/* ============================================================
   LA ESTRELLA — ticket de 58 mm (32 columnas) y bytes ESC/POS
   El mismo texto sirve para la vista en pantalla, para imprimir desde el
   navegador y para armar lo que recibe una impresora térmica real.
   ============================================================ */
(function () {
  'use strict';
  var W = 32, F = LE.fmt;

  function der(izq, d) { d = String(d); var esp = W - izq.length - d.length; if (esp < 1) { izq = izq.slice(0, Math.max(0, W - d.length - 1)); esp = 1; } return izq + new Array(esp + 1).join(' ') + d; }
  function centro(t) { t = String(t); if (t.length >= W) return t; var s = Math.floor((W - t.length) / 2); return new Array(s + 1).join(' ') + t; }
  function envolver(t, ancho) { var out = [], l = ''; String(t).split(' ').forEach(function (p) { if ((l + ' ' + p).trim().length > ancho) { out.push(l); l = p; } else l = (l + ' ' + p).trim(); }); if (l) out.push(l); return out; }
  var RAYA = new Array(W + 1).join('-');

  /* Texto del ticket. opts.copia = reimpresión */
  LE.ticketTexto = function (v, opts) {
    opts = opts || {}; var n = LE.negocio(), L = [], u;
    L.push(centro(n.nombre.toUpperCase())); L.push(centro(n.rubro));
    if (n.direccion) envolver(n.direccion, W).forEach(function (x) { L.push(centro(x)); });
    if (n.telefono) L.push(centro('Tel. ' + n.telefono));
    if (n.rut) L.push(centro('RUT ' + n.rut));
    L.push(RAYA);
    L.push('Ticket N.º ' + F.num(v.num) + (opts.copia ? '  (COPIA)' : ''));
    L.push(der(F.fecha(v.ts) + ' ' + F.hora(v.ts), 'Caja: ' + v.cajero.split(' ')[0]));
    L.push(RAYA);
    var cantArt = 0;
    v.items.forEach(function (i) {
      var kg = i.c % 1 !== 0 || (LE.producto(i.p) && LE.producto(i.p).unidad === 'kg');
      envolver(i.n, W).forEach(function (x) { L.push(x); });
      L.push(der('  ' + (kg ? F.kg(i.c) + ' x ' + F.din(i.u) : F.cant(i.c) + ' x ' + F.din(i.u)), F.din(i.s)));
      cantArt += kg ? 1 : i.c;
    });
    L.push(RAYA);
    L.push(der('ARTÍCULOS', String(cantArt % 1 ? Math.round(cantArt) : cantArt)));
    L.push(der('TOTAL', F.din(v.total)));
    L.push(RAYA);
    if (v.fiado) {
      envolver('A CUENTA DE ' + String(v.deudorNombre || '').toUpperCase(), W).forEach(function (x) { L.push(x); });
      L.push('NO ABONADO: queda pendiente'); var dd = LE.deudor && LE.deudor(v.deudor); if (dd && dd.saldo != null) L.push(der('Saldo a la fecha', F.din(dd.saldo)));
    } else {
    v.pagos.forEach(function (p) { L.push(der(LE.MEDIOS[p.m], F.din(p.m === 'efectivo' && v.recibido ? v.recibido : p.monto))); });
    if (v.vuelto > 0) L.push(der('Vuelto', F.din(v.vuelto)));
    }
    L.push(RAYA);
    if (n.facturaElectronica) { /* el e-Ticket de verdad lleva CAE, QR y firma: lo agrega el proveedor de facturación */ }
    else { L.push(centro('COMPROBANTE INTERNO')); L.push(centro('NO ES FACTURA ELECTRÓNICA')); }
    if (n.pie) envolver(n.pie, W).forEach(function (x) { L.push(centro(x)); });
    return L.join('\n');
  };

  /* Bytes ESC/POS (lo que recibe una impresora térmica): página de códigos CP858 para los acentos */
  var CP858 = { 'á': 0xA0, 'é': 0x82, 'í': 0xA1, 'ó': 0xA2, 'ú': 0xA3, 'ñ': 0xA4, 'Ñ': 0xA5, 'ª': 0xA6, 'º': 0xA7, '¿': 0xA8, '¡': 0xAD, 'ü': 0x81, 'Ü': 0x9A, 'Á': 0xB5, 'É': 0x90, 'Í': 0xD6, 'Ó': 0xE0, 'Ú': 0xE9, '·': 0xFA };
  LE.ticketEscpos = function (v, opts) {
    var b = [0x1B, 0x40, 0x1B, 0x74, 19]; // ESC @ (inicializar) · ESC t 19 (CP858)
    var texto = LE.ticketTexto(v, opts);
    for (var i = 0; i < texto.length; i++) { var c = texto[i]; if (c === '\n') b.push(0x0A); else if (CP858[c] != null) b.push(CP858[c]); else { var k = c.charCodeAt(0); b.push(k < 128 ? k : 0x3F); } }
    b.push(0x0A, 0x0A, 0x0A, 0x1D, 0x56, 66, 0); // avance + GS V 66 0 (corte parcial)
    if (v.pagos.some(function (p) { return p.m === 'efectivo'; })) b.push(0x1B, 0x70, 0, 25, 250); // ESC p 0 25 250: pulso al cajón de dinero
    return b;
  };
  LE.hexdump = function (bytes, max) {
    var out = [], n = Math.min(bytes.length, max || 96);
    for (var i = 0; i < n; i += 16) { var fila = bytes.slice(i, i + 16); out.push(LE.pad(i.toString(16), 4) + '  ' + fila.map(function (x) { return LE.pad(x.toString(16).toUpperCase(), 2).replace(/^0(.)$/, '0$1'); }).join(' ')); }
    if (bytes.length > n) out.push('… ' + (bytes.length - n) + ' bytes más');
    return out.join('\n');
  };

  /* Imprimir: en el navegador usa el diálogo de impresión con papel de 58 mm.
     En el equipo real se manda ESC/POS directo a la impresora, sin diálogo. */
  LE.imprimirTicket = function (texto) {
    var viejo = document.getElementById('papel-imprimible'); if (viejo) viejo.remove();
    var pre = document.createElement('pre'); pre.id = 'papel-imprimible'; pre.textContent = texto; pre.style.cssText = 'position:fixed;left:-9999px;top:0;margin:0';
    document.body.appendChild(pre);
    var limpiar = function () { pre.remove(); window.removeEventListener('afterprint', limpiar); };
    window.addEventListener('afterprint', limpiar);
    setTimeout(function () { window.print(); }, 50);
  };
})();
