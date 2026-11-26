/* ============================================================
   ANCAP SANTA MARÍA — panel de atrás · gestión
   Productos y stock, zonas, ofertas, clientes, reportes, compras, equipo, registro, ajustes.
   Al final arranca el panel.
   ============================================================ */
(function () {
  'use strict';
  var A = window.AG, P = window.PAN, esc = A.esc, pesos = A.pesos, ic = P.ic, ib = P.ib, $ = P.$, $$ = P.$$;
  function norm(s) { return String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, ''); }
  function num(v) { return Number(String(v).replace(',', '.')) || 0; }
  function opt(lista, sel, vacio) { return (vacio ? '<option value="">' + vacio + '</option>' : '') + lista.map(function (x) { var v = x.v != null ? x.v : x, t = x.t != null ? x.t : x; return '<option value="' + esc(v) + '"' + (String(v) === String(sel) ? ' selected' : '') + '>' + esc(t) + '</option>'; }).join(''); }
  function campoErr(f, k, msg) { var c = f[k] && f[k].closest('.campo'); if (c) { c.classList.add('campo--error'); c.insertAdjacentHTML('beforeend', '<span class="error">' + esc(msg) + '</span>'); } }
  function limpiarErr(f) { $$('.campo--error', f).forEach(function (c) { c.classList.remove('campo--error'); var e = $('.error', c); if (e) e.remove(); }); }
  function quien() { return P.U.nombre; }

  /* ============================================================
     PRODUCTOS Y STOCK
     ============================================================ */
  function nivelTxt(p) { var n = A.nivelStock(p); return n === 'no' ? 'Sin stock' : (n === 'alerta' ? 'Reponer' : 'Bien'); }
  function filaProd(p) {
    var of = p.oferta && p.oferta < p.precio, n = A.nivelStock(p), pct = Math.min(100, p.stock / Math.max(p.minimo * 2, 1) * 100);
    return '<article class="prow' + (p.activo ? '' : ' prow--off') + '">' + (p.foto ? '<img src="../' + esc(p.foto) + '" alt="" width="48" height="48" loading="lazy">' : '<span class="prow__sf">' + ic('image') + '</span>') +
      '<div class="prow__n"><strong>' + esc(p.nombre) + '</strong><small>' + esc(p.cat) + ' · ' + (p.unidad === 'kg' ? 'por kg' : 'por unidad') + (p.destacado ? ' · en inicio' : '') + (p.alcohol ? ' · +18' : '') + '</small></div>' +
      '<div class="prow__p num"><strong>' + pesos(of ? p.oferta : p.precio) + '</strong>' + (of ? '<s>' + pesos(p.precio) + '</s>' : '') + '</div>' +
      '<div class="prow__s"><div class="stk stk--' + n + '"><span class="stk__t"><i style="width:' + pct + '%"></i></span><span class="stk__v num">' + A.cant(p.stock, p.unidad) + (p.unidad === 'kg' ? '' : ' u') + ' · mín ' + A.cant(p.minimo, p.unidad) + '</span></div></div>' +
      '<div class="prow__e">' + (p.activo ? (n === 'bien' ? '<span class="pill pill--ok">En tienda</span>' : '<span class="pill ' + (n === 'no' ? 'pill--error' : 'pill--aviso') + '">' + nivelTxt(p) + '</span>') : '<span class="pill pill--gris">Oculto</span>') + '</div>' +
      '<button class="btn btn--borde btn--chico" data-acc="editar-prod" data-id="' + p.id + '">Editar</button></article>';
  }
  function listaProductos() {
    var F = P.F.productos, q = norm(F.q);
    var l = A.productos().filter(function (p) {
      if (F.cat && p.cat !== F.cat) return false; var n = A.nivelStock(p);
      if (F.ver === 'reponer' && !(p.activo && n !== 'bien')) return false; if (F.ver === 'sin' && !(p.activo && p.stock <= 0)) return false;
      if (F.ver === 'oferta' && !(p.oferta && p.oferta < p.precio)) return false; if (F.ver === 'ocultos' && p.activo) return false;
      return !q || norm(p.nombre + ' ' + p.cat).indexOf(q) >= 0;
    });
    return '<p class="cuenta-l suave num">' + l.length + (l.length === 1 ? ' producto' : ' productos') + '</p>' + (l.length ? '<div class="prows">' + l.map(filaProd).join('') + '</div>' : P.vacio('No hay productos con ese filtro.', 'boxes'));
  }
  P.registrar('productos', {
    t: 'Productos', i: 'boxes',
    pintar: function () {
      var F = P.F.productos, E = A.get();
      var rep = E.productos.filter(function (p) { return p.activo && A.nivelStock(p) !== 'bien'; }).length;
      return P.cab('Productos y stock', A.puede(P.U.rol, 'productos') && P.U.rol === 'admin' ? '<button class="btn btn--chico" data-acc="nuevo-prod">' + ic('plus') + 'Nuevo producto</button>' : '') +
        '<div class="barra-f"><label class="campo campo--buscar"><span class="sr-only">Buscar</span>' + ic('search') + '<input type="search" data-inp="q-prod" value="' + esc(F.q) + '" placeholder="Buscar producto"></label>' +
        '<label class="campo"><span class="sr-only">Categoría</span><select data-chg="cat-prod">' + opt(A.categorias(), F.cat, 'Todas las categorías') + '</select></label>' +
        '<label class="campo"><span class="sr-only">Mostrar</span><select data-chg="ver-prod">' + opt([{ v: 'reponer', t: 'Por reponer (' + rep + ')' }, { v: 'sin', t: 'Sin stock' }, { v: 'oferta', t: 'En oferta' }, { v: 'ocultos', t: 'Ocultos de la tienda' }], F.ver, 'Todos') + '</select></label></div>' +
        '<div id="lista-prod">' + listaProductos() + '</div>';
    }
  });
  P.chg['q-prod'] = function (el) { P.F.productos.q = el.value; $('#lista-prod').innerHTML = listaProductos(); };
  P.chg['cat-prod'] = function (el) { P.F.productos.cat = el.value; $('#lista-prod').innerHTML = listaProductos(); };
  P.chg['ver-prod'] = function (el) { P.F.productos.ver = el.value; $('#lista-prod').innerHTML = listaProductos(); };
  function formProd(p) {
    var E = A.get(), nuevo = !p; p = p || { nombre: '', cat: A.categorias()[0], unidad: 'u', precio: '', oferta: 0, costo: '', minimo: 5, stock: 0, prov: E.proveedores[0].id, activo: true, destacado: false };
    var admin = P.U.rol === 'admin', ro = admin ? '' : ' disabled';
    return '<form data-frm="prod" data-id="' + (p.id || '') + '" novalidate><div class="form-g">' +
      '<label class="campo campo--2"><span>Nombre</span><input name="nombre" value="' + esc(p.nombre) + '" maxlength="40"' + ro + ' required></label>' +
      '<label class="campo"><span>Categoría</span><select name="cat"' + ro + '>' + opt(A.categorias(), p.cat) + '</select></label>' +
      '<label class="campo"><span>Se vende por</span><select name="unidad"' + (nuevo && admin ? '' : ' disabled') + '>' + opt([{ v: 'u', t: 'Unidad' }, { v: 'kg', t: 'Kilo' }], p.unidad) + '</select></label>' +
      '<label class="campo"><span>Precio ($)</span><input name="precio" inputmode="decimal" value="' + esc(p.precio) + '" required></label>' +
      '<label class="campo"><span>Precio de oferta ($)</span><input name="oferta" inputmode="decimal" value="' + (p.oferta || '') + '" placeholder="Sin oferta"><small>Tiene que ser menor al precio.</small></label>' +
      (admin ? '<label class="campo"><span>Costo ($)</span><input name="costo" inputmode="decimal" value="' + esc(p.costo) + '"></label>' : '') +
      '<label class="campo"><span>Stock contado' + (p.unidad === 'kg' ? ' (kg)' : '') + '</span><input name="stock" inputmode="decimal" value="' + esc(p.stock) + '"><small>Si lo cambiás, queda anotado como ajuste.</small></label>' +
      '<label class="campo"><span>Stock mínimo</span><input name="minimo" inputmode="decimal" value="' + esc(p.minimo) + '"' + ro + '></label>' +
      (admin ? '<label class="campo"><span>Proveedor</span><select name="prov">' + opt(E.proveedores.map(function (v) { return { v: v.id, t: v.nombre }; }), p.prov) + '</select></label>' : '') + '</div>' +
      '<div class="checks-l"><label class="check"><input type="checkbox" name="activo"' + (p.activo ? ' checked' : '') + '><span>Se muestra en la tienda</span></label>' + (admin ? '<label class="check"><input type="checkbox" name="destacado"' + (p.destacado ? ' checked' : '') + '><span>Destacado en el inicio</span></label><label class="check"><input type="checkbox" name="alcohol"' + (p.alcohol ? ' checked' : '') + '><span>Bebida alcohólica (solo mayores de 18)</span></label>' : '') + '</div>' +
      '<p class="aviso-caja aviso-caja--error" data-err hidden role="alert"></p><div class="acc-fila acc-fila--fin"><button type="button" class="btn btn--borde" data-acc="cerrar-modal">Cancelar</button><button class="btn" type="submit">Guardar</button></div></form>';
  }
  P.acc['editar-prod'] = function (el) { var p = A.producto(el.getAttribute('data-id')); P.modal({ titulo: p.nombre, cuerpo: formProd(p), ancho: 'medio' }); };
  P.acc['nuevo-prod'] = function () { P.modal({ titulo: 'Nuevo producto', cuerpo: formProd(null), ancho: 'medio' }); };
  P.frm.prod = function (f) {
    limpiarErr(f); var id = f.getAttribute('data-id'), p = id ? A.producto(id) : null, err = false, admin = P.U.rol === 'admin';
    var precio = num(f.precio.value), oferta = num(f.oferta.value);
    if (admin && f.nombre.value.trim().length < 2) { campoErr(f, 'nombre', 'Escribí el nombre.'); err = true; }
    if (precio <= 0) { campoErr(f, 'precio', 'Escribí el precio.'); err = true; }
    if (oferta && oferta >= precio) { campoErr(f, 'oferta', 'La oferta tiene que ser menor al precio.'); err = true; }
    if (num(f.stock.value) < 0) { campoErr(f, 'stock', 'No puede ser negativo.'); err = true; }
    if (err) return;
    var d = { id: id || undefined, precio: precio, oferta: oferta, activo: f.activo.checked };
    if (admin) { d.nombre = f.nombre.value; d.cat = f.cat.value; d.costo = num(f.costo.value); d.minimo = num(f.minimo.value); d.prov = f.prov.value; d.destacado = f.destacado.checked; d.alcohol = f.alcohol.checked; if (!id) { d.unidad = f.unidad.value; } }
    var r = A.guardarProducto(d, quien()), s = num(f.stock.value);
    if (!id) { r.foto = ''; A.ajustarStock(r.id, s, 'Stock inicial', quien()); } else if (s !== p.stock) A.ajustarStock(r.id, s, 'Conteo', quien());
    P.cerrarModal(f.closest('.modal')); P.toast('«' + r.nombre + '» guardado'); P.repintar();
  };

  /* ============================================================
     ZONAS DE ENVÍO
     ============================================================ */
  P.registrar('zonas', {
    t: 'Zonas de envío', i: 'truck',
    pintar: function () {
      var zs = A.zonas();
      return P.cab('Zonas de envío', '<button class="btn btn--chico" data-acc="nueva-zona">' + ic('plus') + 'Nueva zona</button>') +
        '<p class="suave nota-s">Cada zona tiene su costo de envío, su pedido mínimo y, si querés, un monto desde el cual el envío es gratis.</p>' +
        '<div class="tabla-c"><table class="tabla"><thead><tr><th>Zona</th><th class="d">Envío</th><th class="d">Mínimo</th><th class="d">Gratis desde</th><th>Estado</th><th></th></tr></thead><tbody>' +
        zs.map(function (z) { return '<tr><th scope="row">' + esc(z.nombre) + '<small class="m num">Envío ' + pesos(z.costo) + ' · mín. ' + pesos(z.minimo) + (z.gratisDesde ? ' · gratis desde ' + pesos(z.gratisDesde) : '') + '</small></th><td class="d num" data-l="Envío">' + pesos(z.costo) + '</td><td class="d num" data-l="Mínimo">' + pesos(z.minimo) + '</td><td class="d num" data-l="Gratis desde">' + (z.gratisDesde ? pesos(z.gratisDesde) : '—') + '</td><td>' + (z.activa ? '<span class="pill pill--ok">Activa</span>' : '<span class="pill pill--gris">Pausada</span>') + '</td><td class="acc"><button class="btn btn--borde btn--chico" data-acc="editar-zona" data-id="' + z.id + '">Editar</button></td></tr>'; }).join('') + '</tbody></table></div>';
    }
  });
  function formZona(z) {
    z = z || { nombre: '', costo: '', minimo: '', gratisDesde: '', activa: true };
    return '<form data-frm="zona" data-id="' + (z.id || '') + '" novalidate><div class="form-g"><label class="campo campo--2"><span>Nombre de la zona</span><input name="nombre" value="' + esc(z.nombre) + '" required></label>' +
      '<label class="campo"><span>Costo del envío ($)</span><input name="costo" inputmode="numeric" value="' + esc(z.costo) + '" required></label><label class="campo"><span>Pedido mínimo ($)</span><input name="minimo" inputmode="numeric" value="' + esc(z.minimo) + '" required></label>' +
      '<label class="campo campo--2"><span>Envío gratis desde ($)</span><input name="gratisDesde" inputmode="numeric" value="' + (z.gratisDesde || '') + '" placeholder="Sin envío gratis"></label></div>' +
      '<div class="checks-l"><label class="check"><input type="checkbox" name="activa"' + (z.activa ? ' checked' : '') + '><span>Zona activa (la tienda la ofrece)</span></label></div>' +
      '<div class="acc-fila acc-fila--fin">' + (z.id ? '<button type="button" class="btn btn--borde btn--peligro-b" data-acc="borrar-zona" data-id="' + z.id + '">Eliminar</button>' : '') + '<button type="button" class="btn btn--borde" data-acc="cerrar-modal">Cancelar</button><button class="btn" type="submit">Guardar</button></div></form>';
  }
  P.acc['nueva-zona'] = function () { P.modal({ titulo: 'Nueva zona', cuerpo: formZona(null), ancho: 'chico' }); };
  P.acc['editar-zona'] = function (el) { var z = A.zonas().filter(function (x) { return x.id === el.getAttribute('data-id'); })[0]; P.modal({ titulo: z.nombre, cuerpo: formZona(z), ancho: 'chico' }); };
  P.acc['borrar-zona'] = function (el) { var id = el.getAttribute('data-id'); P.confirmar('¿Eliminar esta zona? Los pedidos anteriores no cambian.', 'Eliminar', true).then(function (ok) { if (!ok) return; A.borrarZona(id, quien()); P.cerrarModal($$('.modal')[0]); P.toast('Zona eliminada'); P.repintar(); }); };
  P.frm.zona = function (f) {
    limpiarErr(f); var err = false;
    if (f.nombre.value.trim().length < 2) { campoErr(f, 'nombre', 'Escribí el nombre.'); err = true; }
    if (f.costo.value === '' || num(f.costo.value) < 0) { campoErr(f, 'costo', 'Escribí el costo.'); err = true; }
    if (f.minimo.value === '' || num(f.minimo.value) < 0) { campoErr(f, 'minimo', 'Escribí el mínimo.'); err = true; }
    if (err) return;
    A.guardarZona({ id: f.getAttribute('data-id') || undefined, nombre: f.nombre.value, costo: num(f.costo.value), minimo: num(f.minimo.value), gratisDesde: num(f.gratisDesde.value), activa: f.activa.checked }, quien());
    P.cerrarModal(f.closest('.modal')); P.toast('Zona guardada'); P.repintar();
  };

  /* ============================================================
     OFERTAS Y BANNERS
     ============================================================ */
  P.registrar('ofertas', {
    t: 'Ofertas y banners', i: 'badge-percent',
    pintar: function () {
      var E = A.get(), of = E.productos.filter(function (p) { return p.oferta && p.oferta < p.precio; });
      return P.cab('Ofertas y banners', '<button class="btn btn--chico" data-acc="nuevo-banner">' + ic('plus') + 'Nuevo banner</button>') +
        '<section class="panel-c"><div class="panel-c__cab"><h3>Banners del inicio</h3></div><ul class="lista">' + E.banners.map(function (b) {
          return '<li class="banrow"><span class="banmuestra banmuestra--' + esc(b.tono || 'azul') + '" aria-hidden="true"></span><div class="banrow__t"><strong>' + esc(b.titulo) + '</strong><small>' + esc(b.texto) + ' · botón «' + esc(b.boton || '') + '»</small></div>' + (b.activo ? '<span class="pill pill--ok">Visible</span>' : '<span class="pill pill--gris">Oculto</span>') + '<button class="btn btn--borde btn--chico" data-acc="editar-banner" data-id="' + b.id + '">Editar</button></li>'; }).join('') + '</ul></section>' +
        '<section class="panel-c"><div class="panel-c__cab"><h3>Productos en oferta</h3><span class="suave num">' + of.length + '</span></div><p class="suave nota-s">El precio de oferta se carga en cada producto. Estos aparecen en «Ofertas de la semana».</p><ul class="lista">' + (of.length ? of.map(function (p) { return '<li class="banrow"><img src="../' + esc(p.foto) + '" alt="" width="40" height="40"><div class="banrow__t"><strong>' + esc(p.nombre) + '</strong><small class="num">' + pesos(p.oferta) + ' <s>' + pesos(p.precio) + '</s> · -' + Math.round((1 - p.oferta / p.precio) * 100) + '%</small></div><button class="btn btn--borde btn--chico" data-acc="quitar-oferta" data-id="' + p.id + '">Quitar oferta</button></li>'; }).join('') : '<li class="suave">No hay productos en oferta.</li>') + '</ul></section>';
    }
  });
  function formBanner(b) {
    b = b || { titulo: '', texto: '', boton: 'Ver más', cat: '', href: '', tono: 'azul', activo: true };
    var dest = b.href ? 'servicios' : (b.cat || '');
    return '<form data-frm="banner" data-id="' + (b.id || '') + '" novalidate><div class="form-g"><label class="campo campo--2"><span>Título</span><input name="titulo" value="' + esc(b.titulo) + '" maxlength="34" required></label>' +
      '<label class="campo campo--2"><span>Texto</span><input name="texto" value="' + esc(b.texto) + '" maxlength="60"></label><label class="campo"><span>Texto del botón</span><input name="boton" value="' + esc(b.boton) + '" maxlength="18"></label>' +
      '<label class="campo"><span>Lleva a</span><select name="dest">' + opt([{ v: 'servicios', t: 'Servicios del auto' }].concat(A.categorias().map(function (c) { return { v: c, t: 'Categoría: ' + c }; })), dest, 'Toda la tienda') + '</select></label>' +
      '<label class="campo campo--2"><span>Color</span><select name="tono">' + opt([{ v: 'azul', t: 'Azul con foto de la tienda' }, { v: 'amarillo', t: 'Amarillo con productos de la categoría' }, { v: 'oscuro', t: 'Oscuro con foto del taller' }, { v: 'estacion', t: 'Azul con foto de la estación' }], b.tono) + '</select></label></div>' +
      '<div class="checks-l"><label class="check"><input type="checkbox" name="activo"' + (b.activo ? ' checked' : '') + '><span>Se muestra en el inicio</span></label></div><div class="acc-fila acc-fila--fin">' + (b.id ? '<button type="button" class="btn btn--borde btn--peligro-b" data-acc="borrar-banner" data-id="' + b.id + '">Eliminar</button>' : '') + '<button type="button" class="btn btn--borde" data-acc="cerrar-modal">Cancelar</button><button class="btn" type="submit">Guardar</button></div></form>';
  }
  P.acc['nuevo-banner'] = function () { P.modal({ titulo: 'Nuevo banner', cuerpo: formBanner(null), ancho: 'chico' }); };
  P.acc['editar-banner'] = function (el) { var b = A.banners().filter(function (x) { return x.id === el.getAttribute('data-id'); })[0]; P.modal({ titulo: b.titulo, cuerpo: formBanner(b), ancho: 'chico' }); };
  P.acc['borrar-banner'] = function (el) { var id = el.getAttribute('data-id'); P.confirmar('¿Eliminar este banner?', 'Eliminar', true).then(function (ok) { if (!ok) return; A.borrarBanner(id, quien()); P.cerrarModal($$('.modal')[0]); P.toast('Banner eliminado'); P.repintar(); }); };
  P.acc['quitar-oferta'] = function (el) { A.guardarProducto({ id: el.getAttribute('data-id'), oferta: 0 }, quien()); P.toast('Oferta quitada'); P.repintar(); };
  P.frm.banner = function (f) {
    limpiarErr(f); if (f.titulo.value.trim().length < 2) { campoErr(f, 'titulo', 'Escribí el título.'); return; }
    var d = f.dest.value; A.guardarBanner({ id: f.getAttribute('data-id') || undefined, titulo: f.titulo.value, texto: f.texto.value, boton: f.boton.value || 'Ver más', tono: f.tono.value, cat: d === 'servicios' ? '' : d, href: d === 'servicios' ? 'servicios.html' : '', activo: f.activo.checked }, quien());
    P.cerrarModal(f.closest('.modal')); P.toast('Banner guardado'); P.repintar();
  };

  /* ============================================================
     CLIENTES
     ============================================================ */
  function listaClientes() {
    var q = norm(P.F.clientes.q), l = A.clientes().filter(function (c) { return !q || norm(c.nombre + ' ' + c.tel + ' ' + c.zona).indexOf(q) >= 0; });
    return '<p class="cuenta-l suave num">' + l.length + ' clientes</p>' + (l.length ? '<div class="tabla-c"><table class="tabla"><thead><tr><th>Cliente</th><th class="d">Celular</th><th class="d">Zona</th><th>Pedidos</th><th>Total</th><th class="d">Último</th></tr></thead><tbody>' + l.map(function (c) {
      return '<tr class="clic" data-acc="ver-cliente" data-id="' + c.tel + '" tabindex="0"><th scope="row">' + esc(c.nombre) + '</th><td class="d num">' + esc(A.fmtCel(c.tel)) + '</td><td class="d">' + esc(c.zona) + '</td><td class="num" data-l="Pedidos">' + c.pedidos + '</td><td class="num" data-l="Total">' + pesos(c.total) + '</td><td class="d">' + A.hace(c.ultimo) + '</td></tr>'; }).join('') + '</tbody></table></div>' : P.vacio('No hay clientes con ese nombre.', 'users'));
  }
  P.registrar('clientes', { t: 'Clientes', i: 'users', pintar: function () {
    return P.cab('Clientes') + '<div class="barra-f"><label class="campo campo--buscar"><span class="sr-only">Buscar</span>' + ic('search') + '<input type="search" data-inp="q-cli" value="' + esc(P.F.clientes.q) + '" placeholder="Buscar por nombre, celular o zona"></label></div><div id="lista-cli">' + listaClientes() + '</div>'; } });
  P.chg['q-cli'] = function (el) { P.F.clientes.q = el.value; $('#lista-cli').innerHTML = listaClientes(); };
  P.acc['ver-cliente'] = function (el) {
    var c = A.clientes().filter(function (x) { return x.tel === el.getAttribute('data-id'); })[0]; if (!c) return;
    P.modal({ titulo: c.nombre, ancho: 'medio', cuerpo: '<div class="det"><div class="det__cab"><div><p>' + esc(A.fmtCel(c.tel)) + '</p><p class="suave">' + esc(c.direccion) + ' · ' + esc(c.zona) + '</p></div><div class="acc-fila"><a class="btn btn--borde btn--chico" href="tel:' + c.tel + '">' + ic('phone') + 'Llamar</a><a class="btn btn--borde btn--chico" href="' + A.waLink(c.tel, 'Hola ' + c.nombre.split(' ')[0] + ', te escribimos de Ancap Santa María.') + '" target="_blank" rel="noopener">' + ib('whatsapp') + 'WhatsApp</a></div></div>' +
      '<div class="kpis kpis--s">' + P.kpi('Pedidos', c.pedidos) + P.kpi('Total comprado', pesos(c.total)) + P.kpi('Ticket promedio', pesos(c.pedidos ? c.total / c.pedidos : 0)) + '</div><section><h3>Pedidos</h3><ul class="lista">' + c.lista.slice().sort(function (a, b) { return b.ts - a.ts; }).slice(0, 12).map(function (p) { return '<li><button class="fila-b" data-acc="ver-pedido" data-id="' + p.id + '"><span class="fila-b__t"><strong>#' + p.num + '</strong><small>' + A.fecha(p.ts) + '</small></span><span class="fila-b__d num">' + pesos(p.total) + '</span>' + P.pill(p.estado) + '</button></li>'; }).join('') + '</ul></section></div>' });
  };

  /* ============================================================
     REPORTES
     ============================================================ */
  P.registrar('reportes', {
    t: 'Reportes', i: 'chart-column',
    pintar: function () {
      var dias = P.F.reportes.dias, datos = A.ventasPorDia(dias), desde = Date.now() - dias * 86400000;
      var tot = datos.reduce(function (a, d) { return a + d.total; }, 0), ped = datos.reduce(function (a, d) { return a + d.pedidos; }, 0);
      var canc = A.get().pedidos.filter(function (p) { return p.estado === 'cancelado' && p.ts >= desde; }).length;
      var top = A.topProductos(desde, 8), zon = A.porZona(desde).slice(0, 8);
      return P.cab('Reportes') + '<div class="chips chips--p" role="group" aria-label="Período">' + [7, 14].map(function (d) { return '<button class="chip" data-acc="dias" data-id="' + d + '" aria-pressed="' + (d === dias) + '">Últimos ' + d + ' días</button>'; }).join('') + '</div>' +
        '<div class="kpis">' + P.kpi('Ventas', pesos(tot), 'Sin contar cancelados') + P.kpi('Pedidos', ped) + P.kpi('Ticket promedio', pesos(ped ? tot / ped : 0)) + P.kpi('Cancelados', canc) + '</div>' +
        '<section class="panel-c"><div class="panel-c__cab"><h3>Ventas por día</h3></div>' + P.barrasDias(datos, 'Ventas por día, últimos ' + dias + ' días', dias > 7 ? 2 : 1) + '</section>' +
        '<div class="dos"><section class="panel-c"><div class="panel-c__cab"><h3>Lo más vendido</h3></div>' + P.barrasH(top.map(function (t) { return { n: t.nombre, v: t.total, txt: pesos(t.total), tip: t.nombre + ' · ' + pesos(t.total) + ' · ' + (t.unidad === 'kg' ? A.cant(t.cant, 'kg') : t.cant + ' u') }; })) + '</section>' +
        '<section class="panel-c"><div class="panel-c__cab"><h3>Ventas por zona</h3></div>' + P.barrasH(zon.map(function (z) { return { n: z.zona, v: z.total, txt: pesos(z.total), tip: z.zona + ' · ' + pesos(z.total) + ' · ' + z.pedidos + ' pedidos' }; })) + '</section></div>';
    }
  });
  P.acc.dias = function (el) { P.F.reportes.dias = +el.getAttribute('data-id'); P.repintar(); };

  /* ============================================================
     COMPRAS A PROVEEDORES
     ============================================================ */
  function nomProv(id) { var v = A.get().proveedores.filter(function (x) { return x.id === id; })[0]; return v ? v.nombre : id; }
  P.registrar('compras', {
    t: 'Compras', i: 'clipboard-list',
    pintar: function () {
      var E = A.get();
      return P.cab('Compras a proveedores', '<button class="btn btn--chico" data-acc="nueva-compra">' + ic('plus') + 'Nueva compra</button>') + '<div class="pedidos">' + E.compras.map(function (c) {
        var tot = c.items.reduce(function (a, i) { return a + i.cant * i.costo; }, 0);
        return '<article class="ped"><header><strong class="ped__n num">#' + c.num + '</strong>' + P.pill(c.estado === 'recibida' ? 'ok' : 'aviso', c.estado === 'recibida' ? 'Recibida' : 'Pedida') + (c.pagada ? P.pill('ok', 'Paga') : P.pill('gris', 'Sin pagar')) + '<time>' + A.hace(c.ts) + '</time></header>' +
          '<p class="ped__cli"><strong>' + esc(nomProv(c.prov)) + '</strong><span>' + c.items.length + ' productos</span></p><p class="ped__res"><span>Costo</span><strong class="num">' + pesos(tot) + '</strong></p>' +
          '<footer>' + (c.estado !== 'recibida' ? '<button class="btn btn--chico" data-acc="recibir-compra" data-id="' + c.id + '">Recibir mercadería</button>' : '') + (!c.pagada ? '<button class="btn btn--borde btn--chico" data-acc="pagar-compra" data-id="' + c.id + '">Marcar paga</button>' : '') + '<button class="btn btn--borde btn--chico" data-acc="ver-compra" data-id="' + c.id + '">Ver</button></footer></article>'; }).join('') + '</div>';
    }
  });
  P.acc['recibir-compra'] = function (el) { A.recibirCompra(el.getAttribute('data-id'), quien()); P.toast('Mercadería recibida: el stock se actualizó'); P.repintar(); };
  P.acc['pagar-compra'] = function (el) { A.pagarCompra(el.getAttribute('data-id'), quien()); P.toast('Compra marcada como paga'); P.repintar(); };
  P.acc['ver-compra'] = function (el) {
    var c = A.get().compras.filter(function (x) { return x.id === el.getAttribute('data-id'); })[0];
    P.modal({ titulo: 'Compra #' + c.num, ancho: 'chico', cuerpo: '<p><strong>' + esc(nomProv(c.prov)) + '</strong> · ' + A.fecha(c.ts) + '</p><ul class="res__items">' + c.items.map(function (i) { return '<li><span>' + esc(i.nombre) + ' <small class="num">× ' + i.cant + '</small></span><span class="num">' + pesos(i.cant * i.costo) + '</span></li>'; }).join('') + '</ul>' });
  };
  function itemsCompra(prov) {
    var l = A.productos().filter(function (p) { return p.prov === prov; });
    return l.map(function (p) { var sug = A.nivelStock(p) !== 'bien' ? Math.max(0, Math.ceil(p.minimo * 2 - p.stock)) : 0; return '<label class="crow"><span><strong>' + esc(p.nombre) + '</strong><small class="num">Stock ' + A.cant(p.stock, p.unidad) + ' · mín ' + A.cant(p.minimo, p.unidad) + ' · costo ' + pesos(p.costo) + '</small></span><input name="q_' + p.id + '" inputmode="decimal" value="' + (sug || '') + '" placeholder="0" aria-label="Cantidad de ' + esc(p.nombre) + '"></label>'; }).join('');
  }
  P.acc['nueva-compra'] = function () {
    var E = A.get(), p0 = E.proveedores[0].id;
    P.modal({ titulo: 'Nueva compra', ancho: 'medio', cuerpo: '<form data-frm="compra" novalidate><label class="campo"><span>Proveedor</span><select name="prov" data-chg="prov-compra">' + opt(E.proveedores.map(function (v) { return { v: v.id, t: v.nombre + ' · ' + v.rubro }; }), p0) + '</select></label><p class="suave nota-s">Ya está cargado lo que falta para llegar al doble del mínimo. Cambiá las cantidades como quieras.</p><div class="crows" id="crows">' + itemsCompra(p0) + '</div><p class="aviso-caja aviso-caja--error" data-err hidden role="alert"></p><div class="acc-fila acc-fila--fin"><button type="button" class="btn btn--borde" data-acc="cerrar-modal">Cancelar</button><button class="btn" type="submit">Pedir al proveedor</button></div></form>' });
  };
  P.chg['prov-compra'] = function (el) { $('#crows').innerHTML = itemsCompra(el.value); };
  P.frm.compra = function (f) {
    var items = A.productos().filter(function (p) { return p.prov === f.prov.value; }).map(function (p) { return { id: p.id, cant: num(f['q_' + p.id] && f['q_' + p.id].value) }; }).filter(function (i) { return i.cant > 0; });
    if (!items.length) { var e = $('[data-err]', f); e.textContent = 'Poné la cantidad de al menos un producto.'; e.hidden = false; return; }
    var c = A.crearCompra({ prov: f.prov.value, items: items }, quien()); P.cerrarModal(f.closest('.modal')); P.toast('Compra #' + c.num + ' pedida'); P.repintar();
  };

  /* ============================================================
     EQUIPO
     ============================================================ */
  var PERM_TXT = { inicio: 'Inicio', pedidos: 'Pedidos', consultas: 'Consultas', productos: 'Productos y stock', zonas: 'Zonas de envío', ofertas: 'Ofertas y banners', clientes: 'Clientes', reportes: 'Reportes', compras: 'Compras', equipo: 'Equipo', registro: 'Registro', ajustes: 'Ajustes' };
  P.registrar('equipo', {
    t: 'Equipo', i: 'shield-check',
    pintar: function () {
      var E = A.get();
      return P.cab('Equipo y permisos', '<button class="btn btn--chico" data-acc="nuevo-usuario">' + ic('plus') + 'Nueva persona</button>') +
        '<div class="tabla-c"><table class="tabla"><thead><tr><th>Nombre</th><th class="d">Rol</th><th>Estado</th><th></th></tr></thead><tbody>' + E.usuarios.map(function (u) { return '<tr><th scope="row">' + esc(u.nombre) + '<small class="m">' + A.ROL_TXT[u.rol] + '</small></th><td class="d">' + A.ROL_TXT[u.rol] + '</td><td>' + (u.activo ? '<span class="pill pill--ok">Con acceso</span>' : '<span class="pill pill--gris">Sin acceso</span>') + '</td><td class="acc"><button class="btn btn--borde btn--chico" data-acc="editar-usuario" data-id="' + u.id + '">Editar</button></td></tr>'; }).join('') + '</tbody></table></div>' +
        '<section class="panel-c"><div class="panel-c__cab"><h3>Qué puede hacer cada rol</h3></div><div class="tabla-c"><table class="tabla tabla--perm"><thead><tr><th>Sección</th><th>Admin</th><th>Mostrador</th><th>Taller</th></tr></thead><tbody>' + Object.keys(PERM_TXT).map(function (k) { return '<tr><th scope="row">' + PERM_TXT[k] + '</th>' + ['admin', 'mostrador', 'taller'].map(function (r) { return '<td class="c">' + (A.puede(r, k) ? '<span class="si" aria-label="Sí">' + ic('check') + '</span>' : '<span class="no" aria-label="No">—</span>') + '</td>'; }).join('') + '</tr>'; }).join('') + '</tbody></table></div></section>';
    }
  });
  function formUsuario(u) {
    u = u || { nombre: '', rol: 'mostrador', activo: true };
    return '<form data-frm="usuario" data-id="' + (u.id || '') + '" novalidate><div class="form-g"><label class="campo campo--2"><span>Nombre</span><input name="nombre" value="' + esc(u.nombre) + '" required></label>' +
      '<label class="campo"><span>Rol</span><select name="rol">' + opt([{ v: 'admin', t: 'Acceso total' }, { v: 'mostrador', t: 'Pedidos y stock' }, { v: 'taller', t: 'Consultas de vehículos' }], u.rol) + '</select></label>' +
      '<label class="campo"><span>PIN de 4 números</span><input name="pin" inputmode="numeric" maxlength="4" placeholder="' + (u.id ? 'Dejalo vacío para no cambiarlo' : '0000') + '"></label></div>' +
      '<div class="checks-l"><label class="check"><input type="checkbox" name="activo"' + (u.activo ? ' checked' : '') + '><span>Tiene acceso al panel</span></label></div><div class="acc-fila acc-fila--fin"><button type="button" class="btn btn--borde" data-acc="cerrar-modal">Cancelar</button><button class="btn" type="submit">Guardar</button></div></form>';
  }
  P.acc['nuevo-usuario'] = function () { P.modal({ titulo: 'Nueva persona', cuerpo: formUsuario(null), ancho: 'chico' }); };
  P.acc['editar-usuario'] = function (el) { var u = A.get().usuarios.filter(function (x) { return x.id === el.getAttribute('data-id'); })[0]; P.modal({ titulo: u.nombre, cuerpo: formUsuario(u), ancho: 'chico' }); };
  P.frm.usuario = function (f) {
    limpiarErr(f); var id = f.getAttribute('data-id'), err = false;
    if (f.nombre.value.trim().length < 2) { campoErr(f, 'nombre', 'Escribí el nombre.'); err = true; }
    if ((!id || f.pin.value) && !/^\d{4}$/.test(f.pin.value)) { campoErr(f, 'pin', 'El PIN son 4 números.'); err = true; }
    if (err) return;
    A.guardarUsuario({ id: id || undefined, nombre: f.nombre.value, rol: f.rol.value, pin: f.pin.value, activo: f.activo.checked }, quien()); P.cerrarModal(f.closest('.modal')); P.toast('Guardado'); P.repintar();
  };

  /* ============================================================
     REGISTRO
     ============================================================ */
  function listaRegistro() {
    var q = norm(P.F.registro.q), l = A.get().registro.filter(function (r) { return !q || norm(r.quien + ' ' + r.accion).indexOf(q) >= 0; }).slice(0, 150);
    return l.length ? '<ul class="reg">' + l.map(function (r) { return '<li><time class="num">' + A.fecha(r.ts) + '</time><strong>' + esc(r.quien) + '</strong><span>' + esc(r.accion) + '</span></li>'; }).join('') + '</ul>' : P.vacio('No hay movimientos con ese texto.', 'scroll-text');
  }
  P.registrar('registro', { t: 'Registro', i: 'scroll-text', pintar: function () {
    return P.cab('Registro de movimientos') + '<div class="barra-f"><label class="campo campo--buscar"><span class="sr-only">Buscar</span>' + ic('search') + '<input type="search" data-inp="q-reg" value="' + esc(P.F.registro.q) + '" placeholder="Buscar por persona o acción"></label></div><div id="lista-reg">' + listaRegistro() + '</div>'; } });
  P.chg['q-reg'] = function (el) { P.F.registro.q = el.value; $('#lista-reg').innerHTML = listaRegistro(); };

  /* ============================================================
     AJUSTES
     ============================================================ */
  P.registrar('ajustes', {
    t: 'Ajustes', i: 'settings',
    pintar: function () {
      var E = A.get(), N = E.negocio, D = E.config.dueno, ev = D.eventos;
      var evs = [['pedido', 'Entra un pedido nuevo'], ['consulta', 'Entra una consulta de vehículo'], ['stock', 'Un producto baja del mínimo'], ['cancelado', 'Se cancela un pedido']];
      return P.cab('Ajustes') + '<form data-frm="ajustes" novalidate><section class="panel-c"><div class="panel-c__cab"><h3>Datos del local</h3></div><div class="form-g">' +
        '<label class="campo campo--2"><span>Dirección</span><input name="direccion" value="' + esc(N.direccion) + '"></label><label class="campo"><span>Teléfono fijo</span><input name="telefono" value="' + esc(N.telefono) + '"></label>' +
        '<label class="campo"><span>WhatsApp (celular)</span><input name="whatsapp" inputmode="tel" value="' + esc(N.whatsapp) + '" placeholder="PENDIENTE: 099 123 456"><small>Cuando se cargue, aparece el botón de WhatsApp en la tienda.</small></label>' +
        '<label class="campo"><span>Instagram (sin @)</span><input name="instagram" value="' + esc(N.instagram) + '" placeholder="PENDIENTE"></label><label class="campo campo--2"><span>Horario</span><input name="horario" value="' + esc(N.horario) + '"></label></div></section>' +
        '<section class="panel-c"><div class="panel-c__cab"><h3>Avisos al dueño por WhatsApp</h3></div><p class="suave nota-s">Los celulares de esta lista reciben un mensaje cuando pasa algo importante. Nunca por cada venta. En este borrador el envío es simulado: los avisos quedan en la campana. El envío real se conecta con un Worker de Cloudflare y WhatsApp Business de Meta, como en Parking Despegar.</p>' +
        '<label class="campo"><span>Celulares (uno por línea)</span><textarea name="celulares" placeholder="099 123 456">' + esc(D.celulares.map(A.fmtCel).join('\n')) + '</textarea></label><div class="checks-l">' + evs.map(function (e) { return '<label class="check"><input type="checkbox" name="ev_' + e[0] + '"' + (ev[e[0]] ? ' checked' : '') + '><span>' + e[1] + '</span></label>'; }).join('') + '<label class="check"><input type="checkbox" name="sonido"' + (E.config.sonido ? ' checked' : '') + '><span>Sonar en el panel cuando entra un pedido o una consulta</span></label></div></section>' +
        '<p class="aviso-caja aviso-caja--error" data-err hidden role="alert"></p><div class="acc-fila acc-fila--fin"><button class="btn" type="submit">Guardar ajustes</button></div></form>' +
        '<section class="panel-c"><div class="panel-c__cab"><h3>Datos de ejemplo</h3></div><p class="suave nota-s">Productos, pedidos, clientes y consultas son de ejemplo y viven solo en este navegador. Podés volver al estado inicial.</p><button class="btn btn--borde btn--peligro-b" data-acc="reiniciar">Volver a los datos de ejemplo</button></section>';
    }
  });
  P.frm.ajustes = function (f) {
    var cels = f.celulares.value.split(/\n|,/).map(function (s) { return s.trim(); }).filter(Boolean), malos = cels.filter(function (c) { return !A.celularUY(c); });
    var e = $('[data-err]', f), wa = f.whatsapp.value.trim();
    if (malos.length || (wa && !A.celularUY(wa))) { e.textContent = 'Revisá los celulares: tienen que ser uruguayos de 9 dígitos, por ejemplo 099 123 456.'; e.hidden = false; return; }
    e.hidden = true;
    A.guardarAjustes({ negocio: { direccion: f.direccion.value.trim(), telefono: f.telefono.value.trim(), whatsapp: wa ? A.celularUY(wa) : '', instagram: f.instagram.value.trim().replace(/^@/, ''), horario: f.horario.value.trim() },
      dueno: { celulares: cels.map(A.celularUY), eventos: { pedido: f.ev_pedido.checked, consulta: f.ev_consulta.checked, stock: f.ev_stock.checked, cancelado: f.ev_cancelado.checked } }, sonido: f.sonido.checked }, quien());
    P.toast('Ajustes guardados'); P.repintar();
  };
  P.acc.reiniciar = function () { P.confirmar('Se borran los cambios y vuelven los datos de ejemplo. ¿Seguimos?', 'Volver al ejemplo', true).then(function (ok) { if (!ok) return; A.reiniciar(); P.toast('Datos de ejemplo restaurados'); P.repintar(true); }); };

  P.iniciar();
})();
