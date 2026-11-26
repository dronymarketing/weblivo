/* ============================================================
   ANCAP SANTA MARÍA — tienda (inicio, catálogo, checkout, pedido, servicios)
   El encabezado, la barra inferior del celular, el carrito lateral y el pie se
   arman acá, una sola vez, para no repetirlos en cada HTML.
   ============================================================ */
(function () {
  'use strict';
  var A = window.AG; if (!A) return;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var esc = A.esc, pesos = A.pesos;
  var pagina = document.body.getAttribute('data-pagina') || '';
  var N = A.negocio();

  function ic(id, cls) { return '<svg class="icon ' + (cls || '') + '" aria-hidden="true"><use href="#i-' + id + '"/></svg>'; }
  function ib(id) { return '<svg class="icon-brand" aria-hidden="true"><use href="#b-' + id + '"/></svg>'; }
  function qs() { var o = {}; new URLSearchParams(location.search).forEach(function (v, k) { o[k] = v; }); return o; }
  function url(cat) { return 'tienda.html?cat=' + encodeURIComponent(cat); }
  function cantTxt(p, n) { return p.unidad === 'kg' ? A.cant(n, 'kg') : String(n); }
  function precioTxt(p) { return pesos(A.precioDe(p)) + (p.unidad === 'kg' ? ' / kg' : ''); }
  function foco(el) { try { el.focus({ preventScroll: true }); } catch (e) { el.focus(); } }

  /* ---------- tarjeta de producto ---------- */
  function tarjeta(p) {
    var of = p.oferta && p.oferta < p.precio, pct = of ? Math.round((1 - p.oferta / p.precio) * 100) : 0;
    return '<article class="prod" data-id="' + p.id + '">' +
      '<div class="prod__foto">' + (p.foto ? '<img src="' + p.foto + '" alt="' + esc(p.nombre) + '" loading="lazy" width="256" height="256">' : '<span class="prod__sinfoto">' + ic('image', 'icon--xl') + '<small>Foto pendiente</small></span>') + (of ? '<span class="prod__tag">-' + pct + '%</span>' : '') + '</div>' +
      '<div class="prod__cuerpo"><h3 class="prod__nombre">' + esc(p.nombre) + '</h3>' +
      '<p class="prod__precio num"><strong>' + precioTxt(p) + '</strong>' + (of ? '<s>' + pesos(p.precio) + '</s>' : '') + '</p></div>' +
      '<div class="prod__accion" data-accion></div></article>';
  }
  function accionHTML(p) {
    var n = A.carrito.cantidad(p.id);
    if (!p.activo || p.stock <= 0) return '<button class="btn btn--borde btn--chico btn--ancho" disabled>Sin stock</button>';
    if (n <= 0) return '<button class="btn btn--borde btn--chico btn--ancho" data-mas="' + p.id + '">' + ic('plus') + 'Agregar</button>';
    return '<div class="paso"><button class="paso__b" data-menos="' + p.id + '" aria-label="Quitar uno">' + ic('minus') + '</button>' +
      '<span class="paso__n num" aria-live="polite">' + cantTxt(p, n) + '</span>' +
      '<button class="paso__b" data-mas="' + p.id + '" aria-label="Agregar uno"' + (n >= p.stock ? ' disabled' : '') + '>' + ic('plus') + '</button></div>';
  }
  function pintarAcciones(raiz) {
    $$('.prod', raiz).forEach(function (el) { var p = A.producto(el.getAttribute('data-id')); var a = $('[data-accion]', el); if (p && a) a.innerHTML = accionHTML(p); });
  }

  /* ---------- encabezado, barra inferior, carrito, pie ---------- */
  function chrome() {
    var lnk = function (h, t, k) { return '<a href="' + h + '"' + (pagina === k ? ' aria-current="page"' : '') + '>' + t + '</a>'; };
    var cab = document.createElement('header'); cab.className = 'cab'; cab.id = 'cab';
    cab.innerHTML =
      '<div class="cab__franja"><div class="cont cab__franja-i"><span>' + ic('clock') + N.horario + ' · ' + esc(N.direccion) + '</span>' +
      '<span class="cab__franja-d"><a href="tel:' + N.telefonoLink + '">' + ic('phone') + 'Llamar al ' + esc(N.telefono) + '</a></span></div></div>' +
      '<div class="cont cab__fila">' +
      '<a class="logo" href="index.html" aria-label="Ancap Santa María, ir al inicio"><span class="logo__a">Ancap</span><span class="logo__b">Santa María</span></a>' +
      '<a class="cab__llamar" href="tel:' + N.telefonoLink + '" aria-label="Llamar al local">' + ic('phone', 'icon--g') + '</a>' +
      '<button class="cab__menu" id="btn-menu" aria-label="Categorías y menú" aria-expanded="false" aria-controls="hoja-menu">' + ic('menu', 'icon--g') + '</button>' +
      '<form class="busca" role="search" action="tienda.html" id="form-busca">' + ic('search') + '<label class="sr-only" for="q">Buscar productos</label><input id="q" name="q" type="search" placeholder="Buscar productos" autocomplete="off"></form>' +
      '<nav class="cab__links" aria-label="Principal">' + lnk('tienda.html', 'Tienda', 'tienda') + lnk('servicios.html', 'Servicios', 'servicios') + lnk('pedido.html', 'Mi pedido', 'pedido') + '</nav>' +
      '<button class="cab__carrito" id="btn-carrito" aria-label="Abrir el carrito">' + ic('shopping-cart', 'icon--g') + '<span class="cab__carrito-t num" data-total></span><span class="badge num" data-badge hidden></span></button>' +
      '</div>';
    document.body.insertBefore(cab, document.body.firstChild.nextSibling || null);

    var tabs = document.createElement('nav'); tabs.className = 'tabs'; tabs.setAttribute('aria-label', 'Secciones');
    var tab = function (h, i, t, k) { return '<a href="' + h + '"' + (pagina === k ? ' aria-current="page"' : '') + '>' + ic(i, 'icon--g') + '<span>' + t + '</span></a>'; };
    tabs.innerHTML = tab('index.html', 'house', 'Inicio', 'inicio') + tab('tienda.html', 'store', 'Tienda', 'tienda') +
      '<button class="tabs__carrito" id="btn-carrito-2" aria-label="Abrir el carrito">' + ic('shopping-cart', 'icon--g') + '<span class="badge num" data-badge hidden></span></button>' +
      tab('servicios.html', 'wrench', 'Servicios', 'servicios') + tab('pedido.html', 'package', 'Pedido', 'pedido');
    document.body.appendChild(tabs);

    var hoja = document.createElement('div'); hoja.className = 'hoja'; hoja.id = 'hoja-menu'; hoja.hidden = true; hoja.setAttribute('role', 'dialog'); hoja.setAttribute('aria-label', 'Menú'); hoja.setAttribute('aria-modal', 'true');
    hoja.innerHTML = '<div class="hoja__velo" data-cerrar></div><div class="hoja__panel"><div class="hoja__cab"><h2>Categorías</h2><button class="hoja__x" data-cerrar aria-label="Cerrar">' + ic('x', 'icon--g') + '</button></div>' +
      '<ul class="hoja__lista">' + A.categorias().map(function (c, i) { return '<li style="--k:' + i + '"><a href="' + url(c) + '">' + esc(c) + ic('chevron-right') + '</a></li>'; }).join('') + '</ul>' +
      '<ul class="hoja__lista hoja__lista--sec"><li style="--k:11"><a href="tienda.html?oferta=1">Ofertas' + ic('chevron-right') + '</a></li><li style="--k:12"><a href="servicios.html">Servicios del auto' + ic('chevron-right') + '</a></li><li style="--k:13"><a href="pedido.html">Seguir mi pedido' + ic('chevron-right') + '</a></li></ul></div>';
    document.body.appendChild(hoja);

    var car = document.createElement('div'); car.className = 'cart'; car.id = 'cart'; car.hidden = true; car.setAttribute('role', 'dialog'); car.setAttribute('aria-modal', 'true'); car.setAttribute('aria-label', 'Carrito');
    car.innerHTML = '<div class="cart__velo" data-cerrar></div><aside class="cart__panel"><div class="cart__cab"><h2>Tu carrito</h2><button class="hoja__x" data-cerrar aria-label="Cerrar el carrito">' + ic('x', 'icon--g') + '</button></div><div class="cart__cuerpo" id="cart-cuerpo"></div><div class="cart__pie" id="cart-pie"></div></aside>';
    document.body.appendChild(car);

    var pie = document.createElement('footer'); pie.className = 'pie';
    pie.innerHTML = '<div class="cont pie__i"><div class="pie__marca"><span class="logo"><span class="logo__a">Ancap</span><span class="logo__b">Santa María</span></span>' +
      '<p>' + esc(N.direccion) + '<br>' + esc(N.barrio) + '</p><p>' + N.horario + '</p></div>' +
      '<nav class="pie__col" aria-label="Pie"><h3>Comprar</h3><a href="tienda.html">Toda la tienda</a><a href="tienda.html?oferta=1">Ofertas</a><a href="pedido.html">Seguir mi pedido</a></nav>' +
      '<nav class="pie__col" aria-label="Servicios"><h3>El auto</h3><a href="servicios.html">Servicios</a><a href="servicios.html#consulta">Consultar por mi vehículo</a></nav>' +
      '<div class="pie__col"><h3>Contacto</h3><a href="tel:' + N.telefonoLink + '">' + ic('phone') + esc(N.telefono) + '</a>' +
      (N.whatsapp ? '<a href="' + A.waLink(N.whatsapp, 'Hola, quiero consultar algo.') + '">' + ib('whatsapp') + 'WhatsApp</a>' : '') +
      (N.instagram ? '<a href="https://instagram.com/' + esc(N.instagram) + '">' + ib('instagram') + '@' + esc(N.instagram) + '</a>' : '') +
      '<a href="' + N.mapa + '" target="_blank" rel="noopener">' + ic('map-pin') + 'Cómo llegar</a></div></div>' +
      '<div class="cont pie__nota"><p>Productos, precios y zonas de envío de ejemplo, a reemplazar por los reales. Fotos de muestra: <a href="img/CREDITOS.md">créditos</a>.</p></div>';
    document.body.appendChild(pie);

    var meta = $('meta[name="theme-color"]'); if (meta) meta.setAttribute('content', '#00457C');
  }

  /* ---------- hojas (menú) y carrito lateral ---------- */
  var ultimoFoco = null;
  function abrir(el, disparador) {
    ultimoFoco = disparador || document.activeElement; el.hidden = false; document.documentElement.classList.add('bloqueado');
    requestAnimationFrame(function () { el.classList.add('abierto'); var f = $('button, a', el.querySelector('.hoja__panel, .cart__panel')); if (f) foco(f); });
  }
  function cerrar(el) {
    el.classList.remove('abierto'); document.documentElement.classList.remove('bloqueado');
    setTimeout(function () { el.hidden = true; }, 350);
    if (ultimoFoco) foco(ultimoFoco);
  }
  function abiertas() { return $$('.hoja.abierto, .cart.abierto'); }

  function pintarCarrito() {
    var l = A.carrito.lineas(), sub = A.carrito.total(), n = l.length;
    $$('[data-badge]').forEach(function (b) { b.textContent = n; b.hidden = n === 0; });
    $$('[data-total]').forEach(function (t) { t.textContent = n ? pesos(sub) : ''; });
    var cuerpo = $('#cart-cuerpo'), pie = $('#cart-pie'); if (!cuerpo) return;
    if (!n) {
      cuerpo.innerHTML = '<div class="vacio">' + ic('shopping-bag', 'icon--xl') + '<p><strong>Todavía no hay nada.</strong></p><p>Elegí productos en la tienda y quedan acá.</p><a class="btn btn--borde" href="tienda.html">Ir a la tienda</a></div>';
      pie.innerHTML = ''; return;
    }
    cuerpo.innerHTML = '<ul class="lineas">' + l.map(function (x) {
      return '<li class="linea" data-id="' + x.p.id + '">' + (x.p.foto ? '<img src="' + x.p.foto + '" alt="" width="56" height="56">' : '<span class="linea__sf">' + ic('image') + '</span>') + '<div class="linea__t"><p class="linea__n">' + esc(x.p.nombre) + '</p><p class="linea__p num">' + precioTxt(x.p) + '</p></div>' +
        '<div class="paso paso--chico"><button class="paso__b" data-menos="' + x.p.id + '" aria-label="Quitar uno de ' + esc(x.p.nombre) + '">' + ic('minus') + '</button><span class="paso__n num">' + cantTxt(x.p, x.cant) + '</span><button class="paso__b" data-mas="' + x.p.id + '" aria-label="Agregar uno de ' + esc(x.p.nombre) + '"' + (x.cant >= x.p.stock ? ' disabled' : '') + '>' + ic('plus') + '</button></div>' +
        '<p class="linea__s num">' + pesos(x.subtotal) + '</p><button class="linea__x" data-quitar="' + x.p.id + '" aria-label="Sacar ' + esc(x.p.nombre) + ' del carrito">' + ic('trash-2') + '</button></li>';
    }).join('') + '</ul>';
    pie.innerHTML = '<div class="cart__sub"><span>Subtotal</span><strong class="num">' + pesos(sub) + '</strong></div><p class="cart__nota">El envío se calcula al elegir tu zona.</p><a class="btn btn--naranja btn--ancho" href="checkout.html">Seguir al pago</a>';
  }

  function eventos() {
    document.addEventListener('click', function (e) {
      var t = e.target.closest('[data-mas],[data-menos],[data-quitar],[data-cerrar],#btn-menu,#btn-carrito,#btn-carrito-2'); if (!t) return;
      if (t.hasAttribute('data-mas')) { A.carrito.sumar(t.getAttribute('data-mas'), 1); rebote(); }
      else if (t.hasAttribute('data-menos')) A.carrito.sumar(t.getAttribute('data-menos'), -1);
      else if (t.hasAttribute('data-quitar')) A.carrito.quitar(t.getAttribute('data-quitar'));
      else if (t.hasAttribute('data-cerrar')) { var h = t.closest('.hoja, .cart'); if (h) cerrar(h); }
      else if (t.id === 'btn-menu') { abrir($('#hoja-menu'), t); t.setAttribute('aria-expanded', 'true'); }
      else abrir($('#cart'), t);
    });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { abiertas().forEach(cerrar); var b = $('#btn-menu'); if (b) b.setAttribute('aria-expanded', 'false'); } });
    $$('.hoja a').forEach(function (a) { a.addEventListener('click', function () { var h = a.closest('.hoja'); if (h) cerrar(h); }); });
    A.suscribir(function () { pintarCarrito(); pintarAcciones(document); if (window.__refrescar) window.__refrescar(); });
  }
  function rebote() { $$('[data-badge]').forEach(function (b) { b.classList.remove('rebote'); void b.offsetWidth; b.classList.add('rebote'); }); }

  /* ---------- apariciones al entrar en pantalla ---------- */
  function reveal() {
    if (!('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    var els = $$('.rev'); if (!els.length) return;
    document.documentElement.classList.add('js-reveal');
    var io = new IntersectionObserver(function (es) { es.forEach(function (x) { if (x.isIntersecting) { x.target.classList.add('visto'); io.unobserve(x.target); } }); }, { threshold: .15 });
    els.forEach(function (el, i) { el.style.setProperty('--i', el.getAttribute('data-i') || 0); io.observe(el); });
  }

  /* ---------- INICIO ---------- */
  function inicio() {
    var cats = A.categorias(), prods = A.productos().filter(function (p) { return p.activo; });
    $('#cats').innerHTML = cats.map(function (c) {
      var p = prods.filter(function (x) { return x.cat === c && x.foto; })[0];
      return '<a class="cat" href="' + url(c) + '"><span class="cat__o">' + (p ? '<img src="' + p.foto + '" alt="" width="64" height="64" loading="lazy">' : '') + '</span><span class="cat__n">' + esc(c) + '</span></a>';
    }).join('');
    $('#banners').innerHTML = A.banners().filter(function (b) { return b.activo; }).map(function (b) {
      var h = b.href || (b.cat ? url(b.cat) : 'tienda.html');
      return '<a class="banner banner--' + esc(b.tono || 'azul') + '" href="' + esc(h) + '"><div class="banner__t"><h3>' + esc(b.titulo) + '</h3><p>' + esc(b.texto) + '</p><span class="btn btn--claro btn--chico">' + esc(b.boton || 'Ver más') + '</span></div></a>';
    }).join('');
    var ofs = prods.filter(function (p) { return p.oferta && p.oferta < p.precio && p.stock > 0; });
    $('#ofertas').innerHTML = ofs.map(tarjeta).join(''); pintarAcciones($('#ofertas'));
    var des = prods.filter(function (p) { return p.destacado && p.stock > 0; }).slice(0, 8);
    $('#destacados').innerHTML = des.map(tarjeta).join(''); pintarAcciones($('#destacados'));
    $('#serv-mini').innerHTML = A.SERVICIOS.map(function (s) { return '<li>' + ic(s.icono) + esc(s.nombre) + '</li>'; }).join('');
    $('#tabla-zonas').innerHTML = A.zonas().filter(function (z) { return z.activa; }).map(function (z) {
      return '<tr><th scope="row">' + esc(z.nombre) + '</th><td class="num">' + pesos(z.costo) + '</td><td class="num">' + pesos(z.minimo) + '</td><td class="num">' + (z.gratisDesde ? pesos(z.gratisDesde) : '—') + '</td></tr>';
    }).join('');
  }

  /* ---------- CATÁLOGO ---------- */
  function catalogo() {
    var P = qs(), estado = { q: P.q || '', cat: P.cat || '', oferta: P.oferta === '1', orden: P.orden || 'rel' };
    var lista = $('#lista'), cuenta = $('#cuenta'), titulo = $('#titulo-cat');
    var chips = $('#chips');
    chips.innerHTML = '<button class="chip" data-cat="">Todo</button>' + A.categorias().map(function (c) { return '<button class="chip" data-cat="' + esc(c) + '">' + esc(c) + '</button>'; }).join('');
    $('#orden').value = estado.orden; $('#solo-ofertas').checked = estado.oferta; $('#q').value = estado.q;
    function norm(s) { return String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, ''); }
    function pintar() {
      var q = norm(estado.q.trim());
      var r = A.productos().filter(function (p) {
        if (!p.activo) return false; if (estado.cat && p.cat !== estado.cat) return false; if (estado.oferta && !(p.oferta && p.oferta < p.precio)) return false;
        return !q || norm(p.nombre + ' ' + p.cat).indexOf(q) >= 0;
      });
      if (estado.orden === 'menor') r.sort(function (a, b) { return A.precioDe(a) - A.precioDe(b); });
      else if (estado.orden === 'mayor') r.sort(function (a, b) { return A.precioDe(b) - A.precioDe(a); });
      else if (estado.orden === 'az') r.sort(function (a, b) { return a.nombre.localeCompare(b.nombre, 'es'); });
      titulo.textContent = estado.oferta ? 'Ofertas' : (estado.cat || (q ? 'Resultados' : 'Toda la tienda'));
      cuenta.textContent = r.length + (r.length === 1 ? ' producto' : ' productos');
      $$('.chip', chips).forEach(function (c) { c.setAttribute('aria-pressed', c.getAttribute('data-cat') === estado.cat ? 'true' : 'false'); });
      lista.innerHTML = r.length ? r.map(tarjeta).join('') : '<div class="vacio vacio--ancho">' + ic('search', 'icon--xl') + '<p><strong>No encontramos' + (estado.q ? ' «' + esc(estado.q) + '»' : ' productos') + '.</strong></p><p>Probá con otra palabra o mirá todas las categorías.</p><button class="btn btn--borde" id="ver-todo">Ver todo</button></div>';
      pintarAcciones(lista);
      var u = new URLSearchParams(); if (estado.q) u.set('q', estado.q); if (estado.cat) u.set('cat', estado.cat); if (estado.oferta) u.set('oferta', '1'); if (estado.orden !== 'rel') u.set('orden', estado.orden);
      history.replaceState(null, '', 'tienda.html' + (u.toString() ? '?' + u.toString() : ''));
    }
    chips.addEventListener('click', function (e) { var c = e.target.closest('.chip'); if (!c) return; estado.cat = c.getAttribute('data-cat'); pintar(); });
    $('#orden').addEventListener('change', function (e) { estado.orden = e.target.value; pintar(); });
    $('#solo-ofertas').addEventListener('change', function (e) { estado.oferta = e.target.checked; pintar(); });
    document.addEventListener('click', function (e) { if (e.target.closest('#ver-todo')) { estado.q = ''; estado.cat = ''; estado.oferta = false; $('#q').value = ''; $('#solo-ofertas').checked = false; pintar(); } });
    $('#form-busca').addEventListener('submit', function (e) { e.preventDefault(); estado.q = $('#q').value; pintar(); });
    var busc = $('#q'); busc.addEventListener('input', function () { estado.q = busc.value; pintar(); });
    window.__refrescar = function () { pintarAcciones(lista); };
    pintar();
  }

  /* ---------- CHECKOUT ---------- */
  function checkout() {
    var cont = $('#checkout'), form = $('#form-pedido');
    function resumen() {
      var l = A.carrito.lineas(), sub = A.carrito.total(), zid = $('#zona').value, z = A.zonas().filter(function (x) { return x.id === zid; })[0];
      var env = z ? (z.gratisDesde > 0 && sub >= z.gratisDesde ? 0 : z.costo) : 0, falta = z && sub < z.minimo ? z.minimo - sub : 0;
      $('#res-items').innerHTML = l.map(function (x) { return '<li><span>' + esc(x.p.nombre) + ' <small class="num">× ' + cantTxt(x.p, x.cant) + '</small></span><span class="num">' + pesos(x.subtotal) + '</span></li>'; }).join('');
      $('#res-sub').textContent = pesos(sub);
      $('#res-env').textContent = z ? (env === 0 ? 'Gratis' : pesos(env)) : 'Elegí tu zona';
      $('#res-total').textContent = pesos(sub + env);
      $('#res-aviso').innerHTML = z && falta ? ic('circle-alert') + 'Para ' + esc(z.nombre) + ' el pedido mínimo es ' + pesos(z.minimo) + '. Te faltan ' + pesos(falta) + '.' : (z && z.gratisDesde && sub < z.gratisDesde ? ic('truck') + 'Te faltan ' + pesos(z.gratisDesde - sub) + ' para el envío gratis.' : '');
      $('#res-aviso').hidden = !$('#res-aviso').innerHTML;
      $('#btn-pagar').textContent = 'Pagar ' + pesos(sub + env);
    }
    function pintar() {
      if (!A.carrito.lineas().length) { cont.hidden = true; $('#vacio').hidden = false; return; }
      cont.hidden = false; $('#vacio').hidden = true; resumen();
    }
    $('#zona').innerHTML = '<option value="">Elegí tu zona</option>' + A.zonas().filter(function (z) { return z.activa; }).map(function (z) { return '<option value="' + z.id + '">' + esc(z.nombre) + ' · envío ' + pesos(z.costo) + '</option>'; }).join('');
    $('#zona').addEventListener('change', resumen);
    window.__refrescar = pintar;
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      $$('.campo--error', form).forEach(function (c) { c.classList.remove('campo--error'); var er = $('.error', c); if (er) er.remove(); });
      var d = { nombre: form.nombre.value, tel: form.tel.value, direccion: form.direccion.value, referencia: form.referencia.value, zona: form.zona.value };
      var r = A.crearPedido(d);
      if (!r.ok) {
        $('#form-error').textContent = r.error; $('#form-error').hidden = false;
        Object.keys(r.campos || {}).forEach(function (k) { var campo = form[k] && form[k].closest('.campo'); if (campo) { campo.classList.add('campo--error'); campo.insertAdjacentHTML('beforeend', '<span class="error">' + esc(r.campos[k]) + '</span>'); } });
        var primero = $('.campo--error input, .campo--error select', form); if (primero) foco(primero); else $('#form-error').scrollIntoView({ block: 'center' });
        return;
      }
      try { sessionStorage.setItem('ag_ultimo', JSON.stringify({ n: r.pedido.num, t: r.pedido.cliente.tel })); } catch (x) { }
      location.href = 'pedido.html?n=' + r.pedido.num;
    });
    pintar();
  }

  /* ---------- SEGUIMIENTO ---------- */
  var PASOS = [['nuevo', 'Recibido'], ['preparando', 'Preparando'], ['en_camino', 'En camino'], ['entregado', 'Entregado']];
  function pedido() {
    var form = $('#form-seguir'), caja = $('#seguimiento'), actual = null;
    function mostrar(p) {
      actual = p;
      var idx = PASOS.map(function (x) { return x[0]; }).indexOf(p.estado), cancel = p.estado === 'cancelado';
      var tiempo = function (est) { var h = p.historial.filter(function (x) { return x.estado === est; })[0]; return h ? A.hora(h.ts) : ''; };
      caja.hidden = false; form.hidden = true;
      caja.innerHTML = '<div class="seg__cab"><div><p class="micro">Pedido</p><h1 class="seg__num num">#' + p.num + '</h1><p class="seg__sub">' + A.fecha(p.ts) + ' · ' + esc(p.cliente.nombre) + '</p></div><span class="pill pill--' + p.estado + '">' + A.ESTADO_TXT[p.estado] + '</span></div>' +
        (cancel ? '<div class="aviso-caja aviso-caja--error">' + ic('circle-x') + 'Este pedido se canceló. Si pagaste, te devolvemos el importe. Llamanos al ' + esc(N.telefono) + '.</div>' :
          '<ol class="pasos">' + PASOS.map(function (s, i) { return '<li class="' + (i < idx ? 'hecho' : (i === idx ? 'actual' : '')) + '"><span class="pasos__p">' + (i < idx ? ic('check') : (i + 1)) + '</span><span class="pasos__t">' + s[1] + '</span><span class="pasos__h num">' + (i <= idx ? tiempo(s[0]) : '') + '</span></li>'; }).join('') + '</ol>') +
        '<div class="seg__cols"><section><h2>Qué pediste</h2><ul class="res__items">' + p.items.map(function (i) { return '<li><span>' + esc(i.nombre) + ' <small class="num">× ' + (i.unidad === 'kg' ? A.cant(i.cant, 'kg') : i.cant) + '</small></span><span class="num">' + pesos(i.subtotal) + '</span></li>'; }).join('') + '</ul>' +
        '<dl class="res__tot"><div><dt>Subtotal</dt><dd class="num">' + pesos(p.subtotal) + '</dd></div><div><dt>Envío</dt><dd class="num">' + (p.envio ? pesos(p.envio) : 'Gratis') + '</dd></div><div class="res__total"><dt>Total</dt><dd class="num">' + pesos(p.total) + '</dd></div></dl></section>' +
        '<section><h2>Dónde lo llevamos</h2><p>' + esc(p.cliente.direccion) + '<br>' + esc(p.cliente.zonaNombre) + (p.cliente.referencia ? '<br><span class="suave">' + esc(p.cliente.referencia) + '</span>' : '') + '</p><p class="suave">Pago de muestra: no se cobró nada.</p>' +
        '<a class="btn btn--borde btn--ancho" href="tel:' + N.telefonoLink + '">' + ic('phone') + 'Llamar al local</a><button class="btn btn--borde btn--ancho" id="otro-pedido">Buscar otro pedido</button></section></div>';
      var o = $('#otro-pedido'); if (o) o.addEventListener('click', function () { actual = null; caja.hidden = true; form.hidden = false; history.replaceState(null, '', 'pedido.html'); });
    }
    function buscar(n, t) {
      var p = A.buscarPedido(n, t);
      if (!p) { $('#seg-error').textContent = 'No encontramos ese pedido. Revisá el número y el celular con el que lo hiciste.'; $('#seg-error').hidden = false; return; }
      $('#seg-error').hidden = true; mostrar(p);
    }
    form.addEventListener('submit', function (e) { e.preventDefault(); buscar(form.num.value, form.tel.value); });
    window.__refrescar = function () { if (actual) { var p = A.buscarPedido(actual.num, actual.cliente.tel); if (p) mostrar(p); } };
    var P = qs(), ult = null; try { ult = JSON.parse(sessionStorage.getItem('ag_ultimo')); } catch (e) { }
    if (P.n) { form.num.value = P.n; if (ult && String(ult.n) === P.n) buscar(ult.n, ult.t); }
  }

  /* ---------- SERVICIOS ---------- */
  function servicios() {
    $('#lista-servicios').innerHTML = A.SERVICIOS.map(function (s) {
      return '<li class="serv rev"><span class="serv__i">' + ic(s.icono, 'icon--g') + '</span><div><h3>' + esc(s.nombre) + '</h3><p>' + esc(s.texto) + '</p></div></li>';
    }).join('');
    $('#necesita').innerHTML = A.SERVICIOS.map(function (s) {
      return '<label class="check"><input type="checkbox" name="servicios" value="' + s.id + '"><span>' + esc(s.nombre) + '</span></label>';
    }).join('');
    var anio = $('#anio'), y = new Date().getFullYear() + 1; anio.innerHTML = '<option value="">Año</option>';
    for (var i = y; i >= 1985; i--) anio.insertAdjacentHTML('beforeend', '<option>' + i + '</option>');
    var pre = qs().s; if (pre) { var c = $('input[value="' + pre + '"]'); if (c) c.checked = true; }
    var form = $('#form-consulta');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      $$('.campo--error', form).forEach(function (c) { c.classList.remove('campo--error'); var er = $('.error', c); if (er) er.remove(); });
      var sel = $$('input[name="servicios"]:checked', form).map(function (x) { return x.value; });
      var r = A.crearConsulta({ nombre: form.nombre.value, tel: form.tel.value, marca: form.marca.value, modelo: form.modelo.value, anio: form.anio.value, servicios: sel, mensaje: form.mensaje.value });
      if (!r.ok) {
        $('#form-error').textContent = r.error; $('#form-error').hidden = false;
        Object.keys(r.campos).forEach(function (k) { var el = k === 'servicios' ? $('#necesita') : form[k]; var campo = el && el.closest('.campo'); if (campo) { campo.classList.add('campo--error'); campo.insertAdjacentHTML('beforeend', '<span class="error">' + esc(r.campos[k]) + '</span>'); } });
        var pr = $('.campo--error input', form); if (pr) foco(pr); return;
      }
      form.hidden = true; var ok = $('#consulta-ok'); ok.hidden = false;
      $('#ok-num').textContent = '#' + r.consulta.num; $('#ok-tel').textContent = A.fmtCel(r.consulta.tel); ok.scrollIntoView({ block: 'center' });
    });
  }

  /* ---------- arranque ---------- */
  chrome(); eventos(); pintarCarrito();
  ({ inicio: inicio, tienda: catalogo, checkout: checkout, pedido: pedido, servicios: servicios }[pagina] || function () { })();
  reveal();
})();
