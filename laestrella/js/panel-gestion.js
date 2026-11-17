/* ============================================================
   LA ESTRELLA — panel de administración · gestión
   Stock, compras y proveedores, caja, reportes, equipo y ajustes.
   ============================================================ */
(function () {
  'use strict';
  if (!window.PANEL) return;
  var P = window.PANEL, $ = UI.$, esc = UI.esc, F = LE.fmt, ico = UI.ico, DIA = 864e5;
  var usuario = LE.usuario();

  function tabs(lista, sel) {
    return '<div class="pestanas" role="tablist">' + lista.map(function (t) { return '<button type="button" class="pestana" role="tab" data-acc="tab" data-id="' + t[0] + '" aria-selected="' + (sel === t[0]) + '">' + esc(t[1]) + '</button>'; }).join('') + '</div>';
  }
  P.tabs = tabs;
  P.acciones.tab = function (id) { P.est(P.actual).tab = id; P.rutas[P.actual].entrar(); };
  function cant(p, n) { return p.unidad === 'kg' ? F.kg(n) : F.cant(n) + ' u'; }
  /* Barra de nivel: tres zonas sobre el recorrido (rojo = no hay, amarillo = alerta, hasta el mínimo; verde = por encima del mínimo).
     El recorrido llega al doble del mínimo; la parte llena muestra cuánto hay y toma el color de su zona. */
  function barraNivel(p) {
    var min = Math.max(p.minimo || 0, 0), q = Math.max(p.stock, 0), tope = Math.max(min * 2, 1), cap = 7;
    var x = function (v) { return cap + (100 - cap) * v / tope; };
    var zona = LE.nivelStock(p), lleno = q <= 0 ? cap : x(Math.min(q, tope));
    var txt = zona === 'cero' ? 'No hay' : zona === 'alerta' ? 'Alerta: hay ' + cant(p, p.stock) + ', el mínimo es ' + cant(p, p.minimo) : 'Bien: hay ' + cant(p, p.stock) + ', el mínimo es ' + cant(p, p.minimo);
    return '<span class="nivel nivel--' + zona + '" role="img" aria-label="' + esc(txt) + '" title="Mínimo: ' + esc(cant(p, p.minimo)) + '">' +
      '<i class="nivel__z nivel__z--r" style="left:0;width:' + cap + '%"></i><i class="nivel__z nivel__z--a" style="left:' + cap + '%;width:' + (x(min) - cap) + '%"></i><i class="nivel__z nivel__z--v" style="left:' + x(min) + '%;right:0"></i>' +
      '<b class="nivel__lleno" style="width:' + lleno + '%"></b></span>';
  }

  /* ============================ STOCK ============================ */
  P.rutas.stock = {
    titulo: 'Stock',
    entrar: function () {
      var S = P.est('stock', { tab: 'existencias', f: '', q: '' });
      P.cab('Stock', null, null,
        tabs([['existencias', 'Existencias'], ['movimientos', 'Movimientos']], S.tab) +
        (S.tab === 'existencias' ? '<button type="button" class="chip" data-filtro="f" data-valor="" aria-pressed="' + (S.f === '') + '">Todos</button><button type="button" class="chip chip--alerta" data-filtro="f" data-valor="bajo" aria-pressed="' + (S.f === 'bajo') + '">Por reponer</button><button type="button" class="chip chip--error" data-filtro="f" data-valor="cero" aria-pressed="' + (S.f === 'cero') + '">Sin stock</button><input class="entrada" data-filtro="q" placeholder="Buscar producto" value="' + esc(S.q) + '" aria-label="Buscar producto">' : ''));
      P.rutas.stock.pintar();
    },
    pintar: function () {
      var S = P.est('stock');
      if (S.tab === 'movimientos') {
        var tipo = { venta: ['Venta', ''], compra: ['Compra', 'badge--ok'], ajuste: ['Ajuste', 'badge--alerta'], anulacion: ['Anulación', 'badge--acento'] };
        return P.zona(P.tabla([
          { t: 'Producto', c: 't-titulo', f: function (m) { return esc(m.n) + '<small>' + F.fechaHora(m.ts) + ' · ' + esc(m.usuario) + '</small>'; } },
          { t: 'Cantidad', c: 't-derecha', f: function (m) { var p = LE.producto(m.p); return '<span style="color:' + (m.cant < 0 ? 'var(--error)' : 'var(--ok)') + '">' + (m.cant > 0 ? '+' : '−') + (p && p.unidad === 'kg' ? F.kg(Math.abs(m.cant)) : F.cant(Math.abs(m.cant))) + '</span>'; } },
          { t: 'Tipo', f: function (m) { var t = tipo[m.tipo] || [m.tipo, '']; return '<span class="badge ' + t[1] + '">' + t[0] + '</span>'; } },
          { t: 'Detalle', f: function (m) { return esc(m.ref); } }
        ], LE.movimientosStock(150), { vacio: 'Todavía no hay movimientos.' }));
      }
      var q = S.q.trim().toLowerCase(), ps = LE.productos(true).filter(function (p) {
        if (S.f === 'bajo' && LE.nivelStock(p) === 'ok') return false; if (S.f === 'cero' && p.stock > 0) return false;
        return !q || p.nombre.toLowerCase().indexOf(q) >= 0;
      }).sort(function (a, b) { return (a.stock / (a.minimo || 1)) - (b.stock / (b.minimo || 1)); });
      var all = LE.productos(true), valor = all.reduce(function (a, p) { return a + Math.round(Math.max(0, p.stock) * p.costo); }, 0), bajo = all.filter(function (p) { return LE.nivelStock(p) !== 'ok'; }).length, cero = all.filter(function (p) { return p.stock <= 0; }).length;
      P.zona('<div class="kpis"><div class="kpi"><div class="kpi__rotulo">Valor del stock (a costo)</div><div class="kpi__valor">' + F.din(valor) + '</div></div><button type="button" class="kpi kpi--link' + (bajo ? ' kpi--alerta' : '') + '" data-filtro="f" data-valor="bajo"><span class="kpi__rotulo">Por reponer</span><span class="kpi__valor">' + bajo + '</span><span class="kpi__ir">Ver cuáles ›</span></button><button type="button" class="kpi kpi--link' + (cero ? ' kpi--error' : '') + '" data-filtro="f" data-valor="cero"><span class="kpi__rotulo">Sin stock</span><span class="kpi__valor">' + cero + '</span><span class="kpi__ir">Ver cuáles ›</span></button><div class="kpi"><div class="kpi__rotulo">Productos activos</div><div class="kpi__valor">' + all.length + '</div></div></div>' +
        P.tabla([
          { t: 'Producto', c: 't-titulo', f: function (p) { return P.celdaProd(p, esc(p.cat)); } },
          { t: 'Disponible', f: function (p) { return '<span class="disp"><strong>' + cant(p, p.stock) + '</strong>' + barraNivel(p) + '</span>'; } },
          { t: 'Estado', f: function (p) { return p.stock <= 0 ? '<span class="badge badge--error">Sin stock</span>' : LE.nivelStock(p) === 'alerta' ? '<span class="badge badge--alerta">Reponer</span>' : '<span class="badge badge--ok">Bien</span>'; } },
          { t: 'Valor', f: function (p) { return F.din(Math.round(Math.max(0, p.stock) * p.costo)); } },
          { t: '', c: 't-acciones', f: function (p) { return '<button type="button" class="btn btn--chico btn--linea" data-acc="ajustar" data-id="' + p.id + '">' + ico('square-pen') + 'Ajustar</button>'; } }
        ], ps.slice(0, 150)));
    }
  };
  /* Ajustar = poner el mínimo de cada producto (cuándo avisar que hay que reponer). El conteo de lo que hay se hace desde acá mismo. */
  P.acciones.ajustar = function (id) {
    var p = LE.producto(id), kg = p.unidad === 'kg';
    var ctl = UI.modal({
      titulo: 'Ajustar mínimo', cuerpo: '<div class="ajuste-prod">' + UI.foto(p, 'foto--mini') + '<div><strong>' + esc(p.nombre) + '</strong><small class="suave">' + esc(p.cat) + ' · hay ' + cant(p, p.stock) + '</small></div></div>' +
        '<label class="campo"><span>Avisar que hay que reponer cuando quede menos de' + (kg ? ' (kg)' : ' (unidades)') + '</span><input name="minimo" class="entrada" inputmode="decimal" autocomplete="off" value="' + String(p.minimo).replace('.', ',') + '"></label>' +
        '<div id="aj-nivel" class="ajuste-nivel"></div><p id="aj-txt" class="suave" style="margin:8px 0 4px"></p>',
      acciones: [{ texto: 'Cancelar', clase: 'btn--linea' }, { texto: 'Contar stock', clase: 'btn--linea', cerrar: false, accion: function (c) { c.cerrar(); P.acciones.contar(id); return false; } },
        { texto: 'Guardar', clase: 'btn--tinta', cerrar: false, accion: function () {
          var v = UI.valores(ctl), m = UI.aNumero(v.minimo);
          UI.hacer(function () { return LE.ajustarMinimo(id, m); }, 'Mínimo guardado.').then(function (r) { if (r.ok) { ctl.cerrar(); P.refrescar(); } }); return false; } }]
    });
    function ver() {
      var m = Math.max(0, UI.aNumero(ctl.$('[name=minimo]').value) || 0), q = { stock: p.stock, minimo: m, unidad: p.unidad }, z = LE.nivelStock(q);
      ctl.$('#aj-nivel').innerHTML = barraNivel(q);
      ctl.$('#aj-txt').textContent = z === 'cero' ? 'Hoy no hay stock.' : z === 'alerta' ? 'Con este mínimo, hoy sale en alerta: hay ' + cant(p, p.stock) + ' y el mínimo es ' + cant(p, m) + '.' : 'Con este mínimo, hoy está bien: hay ' + cant(p, p.stock) + '.';
    }
    ctl.$('[name=minimo]').addEventListener('input', ver); ver(); ctl.$('[name=minimo]').select();
  };
  P.acciones.contar = function (id) {
    var p = LE.producto(id), kg = p.unidad === 'kg';
    var ctl = UI.modal({
      titulo: 'Contar stock', cuerpo: '<p><strong>' + esc(p.nombre) + '</strong></p><p class="suave" style="margin:4px 0 14px">En el sistema hay ' + cant(p, p.stock) + '</p>' +
        '<label class="campo"><span>Cuánto hay realmente (contado en el estante)</span><input name="real" class="entrada" inputmode="decimal" value="' + String(p.stock).replace('.', ',') + '"></label><p id="aj-dif" class="suave" style="margin:-6px 0 14px"></p>' +
        '<label class="campo"><span>Motivo</span><select name="motivo" class="entrada"><option>Conteo de inventario</option><option>Vencido o en mal estado</option><option>Rotura</option><option>Merma</option><option>Faltante sin explicar</option><option>Error de carga</option></select></label>',
      acciones: [{ texto: 'Cancelar', clase: 'btn--linea' }, { texto: 'Guardar ajuste', clase: 'btn--tinta', cerrar: false, accion: function () {
        var v = UI.valores(ctl), delta = Math.round((UI.aNumero(v.real) - p.stock) * 1000) / 1000;
        UI.hacer(function () { return LE.ajustarStock(id, delta, v.motivo); }, 'Stock ajustado.').then(function (r) { if (r.ok) { ctl.cerrar(); P.refrescar(); } }); return false; } }]
    });
    function dif() { var d = Math.round((UI.aNumero(ctl.$('[name=real]').value) - p.stock) * 1000) / 1000; ctl.$('#aj-dif').textContent = d ? 'Diferencia: ' + (d > 0 ? '+' : '−') + (kg ? F.kg(Math.abs(d)) : F.cant(Math.abs(d))) : 'Sin diferencia'; }
    ctl.$('[name=real]').addEventListener('input', dif); dif(); ctl.$('[name=real]').select();
  };

  /* ============================ COMPRAS Y PROVEEDORES ============================ */
  /* Estado de una compra en tres pasos: pedida → recibida → paga. Los pasos hechos se llenan; con los tres, todo en verde. */
  function pasosCompra(c) {
    var hechos = [true, !!c.recibida, !!c.pagada], todo = hechos[1] && hechos[2];
    var txt = todo ? '<strong>Completa</strong> · recibida ' + F.fechaCorta(c.recibidaTs) : !c.recibida ? '<strong>Pedida</strong>' + (c.pagada ? ' · ya paga' : ' · a pagar') : '<strong>Recibida</strong> ' + F.fechaCorta(c.recibidaTs) + ' · a pagar';
    return '<span class="pasos' + (todo ? ' pasos--ok' : '') + '" role="img" aria-label="' + esc((todo ? 'Completa' : !c.recibida ? 'Pedida, sin recibir' : 'Recibida, falta pagar')) + '"><span class="pasos__barra"><i class="' + (hechos[0] ? 'on' : '') + '" title="Pedida"></i><i class="' + (hechos[1] ? 'on' : '') + '" title="Recibida"></i><i class="' + (hechos[2] ? 'on' : '') + '" title="Paga"></i></span><small>' + txt + '</small></span>';
  }
  P.rutas.compras = {
    titulo: 'Compras',
    entrar: function () {
      var S = P.est('compras', { tab: 'compras', f: '' });
      P.cab('Compras', null,
        S.tab === 'compras' ? '<button type="button" class="btn btn--acento" data-acc="compra-nueva">' + ico('plus') + 'Nueva compra</button>' : '<button type="button" class="btn btn--acento" data-acc="prov-nuevo">' + ico('plus') + 'Nuevo proveedor</button>',
        tabs([['compras', 'Compras'], ['proveedores', 'Proveedores']], S.tab) + (S.tab === 'compras' ? [['', 'Todas'], ['recibir', 'Por recibir'], ['pagar', 'Por pagar']].map(function (x) { return '<button type="button" class="chip" data-filtro="f" data-valor="' + x[0] + '" aria-pressed="' + (S.f === x[0]) + '">' + x[1] + '</button>'; }).join('') : ''));
      P.rutas.compras.pintar();
    },
    pintar: function () {
      var S = P.est('compras');
      if (S.tab === 'proveedores') {
        return P.zona(P.tabla([
          { t: 'Proveedor', c: 't-titulo', f: function (v) { return esc(v.nombre) + '<small>' + esc(v.rubro) + '</small>'; } },
          { t: 'Contacto', f: function (v) { return esc(v.contacto); } }, { t: 'Teléfono', f: function (v) { return esc(v.telefono); } },
          { t: 'Compras', f: function (v) { return LE.compras().filter(function (c) { return c.prov === v.id; }).length; } },
          { t: '', c: 't-acciones', f: function (v) { return '<button type="button" class="btn btn--chico btn--linea" data-acc="prov" data-id="' + v.id + '">' + ico('pencil') + 'Editar</button>'; } }
        ], LE.proveedores()));
      }
      var cs = LE.compras(), pend = cs.filter(function (c) { return !c.recibida; }), porPagar = cs.filter(function (c) { return c.recibida && !c.pagada; }), debe = porPagar.reduce(function (a, c) { return a + c.total; }, 0);
      var m30 = cs.filter(function (c) { return c.ts > Date.now() - 30 * DIA; }).reduce(function (a, c) { return a + c.total; }, 0);
      var lista = S.f === 'recibir' ? pend : S.f === 'pagar' ? porPagar : cs;
      var link = function (v, rot, val, sub) { return '<button type="button" class="kpi kpi--link" data-filtro="f" data-valor="' + v + '"><span class="kpi__rotulo">' + rot + '</span><span class="kpi__valor">' + val + '</span><span class="kpi__ir">' + sub + ' ›</span></button>'; };
      P.zona('<div class="kpis">' + link('recibir', 'Pedidas sin recibir', pend.length, 'Ver cuáles') + link('pagar', 'Para pagar a proveedores', F.din(debe), porPagar.length + (porPagar.length === 1 ? ' compra' : ' compras')) + '<div class="kpi"><div class="kpi__rotulo">Comprado en 30 días</div><div class="kpi__valor">' + F.din(m30) + '</div></div></div>' +
        P.tabla([
          { t: 'Compra', c: 't-titulo', f: function (c) { return 'C-' + LE.pad(c.num, 4) + ' · ' + esc(LE.proveedor(c.prov).nombre) + '<small>' + F.fecha(c.ts) + ' · ' + c.items.length + (c.items.length === 1 ? ' producto' : ' productos') + '</small>'; } },
          { t: 'Total', c: 't-derecha', f: function (c) { return F.din(c.total); } },
          { t: 'Estado', f: function (c) { return pasosCompra(c); } },
          { t: '', c: 't-acciones', f: function (c) { return '<button type="button" class="btn btn--chico btn--linea" data-acc="compra" data-id="' + c.id + '">' + ico('eye') + 'Ver</button>' + (c.recibida ? '' : ' <button type="button" class="btn btn--chico btn--tinta" data-acc="recibir" data-id="' + c.id + '">' + ico('package-plus') + 'Recibir</button>') + (c.pagada ? '' : ' <button type="button" class="btn btn--chico btn--linea" data-acc="pagar" data-id="' + c.id + '">' + ico('hand-coins') + 'Marcar paga</button>'); } }
        ], lista, { vacio: cs.length ? 'No hay compras con este filtro.' : 'Todavía no registraste compras.' }));
    }
  };
  P.acciones.compra = function (id) {
    var c = LE.compras().filter(function (x) { return x.id === id; })[0];
    UI.modal({ titulo: 'Compra C-' + LE.pad(c.num, 4), cuerpo: '<p class="suave" style="margin-bottom:12px">' + esc(LE.proveedor(c.prov).nombre) + ' · ' + F.fecha(c.ts) + '</p><ul class="permisos">' + c.items.map(function (i) { var p = LE.producto(i.p); return '<li><span style="flex:1">' + esc(i.n) + '</span><span class="num">' + (p && p.unidad === 'kg' ? F.kg(i.c) : F.cant(i.c)) + ' × ' + F.din(i.k) + '</span></li>'; }).join('') + '<li><strong style="flex:1">Total</strong><strong class="num">' + F.din(c.total) + '</strong></li></ul>', acciones: [{ texto: 'Cerrar', clase: 'btn--tinta' }] });
  };
  P.acciones.recibir = function (id) {
    var c = LE.compras().filter(function (x) { return x.id === id; })[0];
    UI.confirmar('Recibir la compra', 'Llegaron los ' + c.items.length + ' productos de C-' + LE.pad(c.num, 4) + '. El stock sube y el costo de cada producto se actualiza.', { ok: 'Sí, recibir' }).then(function (si) { if (si) { UI.hacer(function () { return LE.recibirCompra(id); }, 'Compra recibida: el stock subió.').then(function (r) { if (r.ok) P.refrescar(); }); } });
  };
  P.acciones.pagar = function (id) { UI.hacer(function () { return LE.pagarCompra(id); }, 'Compra marcada como paga.').then(function (r) { if (r.ok) P.refrescar(); }); };
  P.acciones['compra-nueva'] = function () {
    var ps = LE.productos(true).slice().sort(function (a, b) { return a.nombre.localeCompare(b.nombre, 'es'); });
    var lineas = [{ p: '', c: '', k: '' }];
    var ctl = UI.modal({
      titulo: 'Nueva compra', ancha: true,
      cuerpo: '<label class="campo"><span>Proveedor</span><select name="prov" class="entrada">' + UI.opciones(LE.proveedores(), '', 'Elegí el proveedor') + '</select></label><div class="lineas-compra" id="lc"></div>' +
        '<button type="button" class="btn btn--chico btn--linea" id="lc-mas">' + ico('plus') + 'Agregar producto</button><p class="resumen-pago"><span>Total</span><strong id="lc-tot">$ 0</strong></p>',
      acciones: [{ texto: 'Cancelar', clase: 'btn--linea' }, { texto: 'Registrar pedido', clase: 'btn--tinta', cerrar: false, accion: function () {
        var prov = ctl.$('[name=prov]').value;
        UI.hacer(function () { return LE.guardarCompra({ prov: prov, items: lineas.map(function (l) { return { p: l.p, c: UI.aNumero(l.c), k: UI.aCentavos(l.k) }; }) }); }, 'Pedido registrado. Cuando llegue, tocá “Recibir”.').then(function (r) { if (r.ok) { ctl.cerrar(); P.refrescar(); } }); return false; } }]
    });
    function pintar() {
      ctl.$('#lc').innerHTML = lineas.map(function (l, i) {
        return '<div class="linea-compra"><label class="campo"><span>Producto</span><select data-i="' + i + '" data-c="p" class="entrada">' + UI.opciones(ps, l.p, 'Elegí…') + '</select></label><label class="campo"><span>Cant.</span><input data-i="' + i + '" data-c="c" class="entrada" inputmode="decimal" value="' + esc(l.c) + '"></label><label class="campo"><span>Costo</span><input data-i="' + i + '" data-c="k" class="entrada" inputmode="decimal" value="' + esc(l.k) + '"></label><button type="button" class="btn btn--icono btn--chico btn--linea" data-q="' + i + '" aria-label="Quitar">' + ico('x') + '</button></div>';
      }).join(''); total();
    }
    function total() { ctl.$('#lc-tot').textContent = F.din(lineas.reduce(function (a, l) { return a + Math.round(UI.aNumero(l.c) * UI.aCentavos(l.k)); }, 0)); }
    ctl.cuerpo.addEventListener('change', function (e) { var d = e.target.dataset; if (d.c === 'p') { lineas[+d.i].p = e.target.value; var p = LE.producto(e.target.value); if (p) { lineas[+d.i].k = UI.deCentavos(p.costo); } pintar(); } });
    ctl.cuerpo.addEventListener('input', function (e) { var d = e.target.dataset; if (d.c === 'c' || d.c === 'k') { lineas[+d.i][d.c] = e.target.value; total(); } });
    ctl.cuerpo.addEventListener('click', function (e) { if (e.target.closest('#lc-mas')) { lineas.push({ p: '', c: '', k: '' }); pintar(); } var q = e.target.closest('[data-q]'); if (q && lineas.length > 1) { lineas.splice(+q.dataset.q, 1); pintar(); } });
    pintar();
  };
  function formProv(id) {
    var v = id ? LE.proveedor(id) : { nombre: '', contacto: '', telefono: '', email: '', rubro: '' };
    var ctl = UI.modal({
      titulo: id ? 'Editar proveedor' : 'Nuevo proveedor',
      cuerpo: ['nombre|Nombre', 'contacto|Persona de contacto', 'telefono|Teléfono', 'email|Email', 'rubro|Qué nos vende'].map(function (x) { var k = x.split('|'); return '<label class="campo"><span>' + k[1] + '</span><input name="' + k[0] + '" class="entrada" value="' + esc(v[k[0]]) + '"></label>'; }).join(''),
      acciones: [{ texto: 'Cancelar', clase: 'btn--linea' }, { texto: 'Guardar', clase: 'btn--tinta', cerrar: false, accion: function () { var d = UI.valores(ctl); d.id = id; UI.hacer(function () { return LE.guardarProveedor(d); }, 'Proveedor guardado.').then(function (r) { if (r.ok) { ctl.cerrar(); P.refrescar(); } }); return false; } }]
    });
  }
  P.acciones['prov-nuevo'] = function () { formProv(); }; P.acciones.prov = function (id) { formProv(id); };

  /* ============================ CAJA ============================ */
  P.rutas.caja = {
    titulo: 'Caja',
    entrar: function () { P.cab('Caja', null, '<a class="btn btn--acento" href="../caja/">' + ico('store') + 'Ir a la caja</a>'); P.rutas.caja.pintar(); },
    pintar: function () {
      var ts = LE.turnos(), ab = LE.turnoAbierto(), cerr = ts.filter(function (t) { return t.cierre; }).slice(0, 40);
      var d30 = ts.filter(function (t) { return t.cierre && t.cierre > Date.now() - 30 * DIA; }), dif = d30.reduce(function (a, t) { return a + (t.contado - t.esperado); }, 0), conDif = d30.filter(function (t) { return t.contado !== t.esperado; }).length;
      P.zona('<div class="kpis"><div class="kpi"><div class="kpi__rotulo">Ahora</div><div class="kpi__valor" style="font-size:20px">' + (ab ? 'Abierta' : 'Cerrada') + '</div><div class="kpi__sub">' + (ab ? esc(ab.abrio) + ' · turno ' + esc(ab.turno) : 'nadie atiende') + '</div></div>' +
        '<div class="kpi"><div class="kpi__rotulo">Efectivo en el cajón</div><div class="kpi__valor">' + (ab ? F.din(LE.efectivoEsperado(ab)) : '—') + '</div></div>' +
        '<div class="kpi"><div class="kpi__rotulo">Diferencia acumulada · 30 días</div><div class="kpi__valor" style="color:' + (dif < 0 ? 'var(--error)' : dif > 0 ? 'var(--alerta)' : 'inherit') + '">' + F.din(dif, true) + '</div></div>' +
        '<div class="kpi"><div class="kpi__rotulo">Turnos con diferencia</div><div class="kpi__valor">' + conDif + ' de ' + d30.length + '</div></div></div>' +
        P.tabla([
          { t: 'Turno', c: 't-titulo', f: function (t) { return F.fecha(t.apertura) + ' · ' + esc(t.turno) + '<small>' + F.hora(t.apertura) + ' a ' + (t.cierre ? F.hora(t.cierre) : 'ahora') + ' · ' + esc(t.abrio) + (t.cerro && t.cerro !== t.abrio ? ' / ' + esc(t.cerro) : '') + '</small>'; } },
          { t: 'Ventas', c: 't-derecha', f: function (t) { return F.din(LE.resumenTurno(t).total); } },
          { t: 'Debería haber', f: function (t) { return F.din(t.cierre ? t.esperado : LE.efectivoEsperado(t)); } },
          { t: 'Se contó', f: function (t) { return t.cierre ? F.din(t.contado) : '—'; } },
          { t: 'Diferencia', f: function (t) { if (!t.cierre) return '<span class="badge badge--acento">Abierta</span>'; var d = t.contado - t.esperado; return d === 0 ? '<span class="badge badge--ok">Justa</span>' : '<span class="badge ' + (d < 0 ? 'badge--error' : 'badge--alerta') + '">' + F.din(d, true) + '</span>'; } },
          { t: '', c: 't-acciones', f: function (t) { return '<button type="button" class="btn btn--chico btn--linea" data-acc="turno" data-id="' + t.id + '">' + ico('eye') + 'Detalle</button>'; } }
        ], (ab ? [ab] : []).concat(cerr)));
    }
  };
  P.acciones.turno = function (id) {
    var t = LE.turnos().filter(function (x) { return x.id === id; })[0], r = LE.resumenTurno(t), movs = LE.movimientosCaja(t.id);
    UI.modal({
      titulo: 'Turno ' + t.turno + ' · ' + F.fecha(t.apertura), ancha: true,
      cuerpo: '<p class="suave" style="margin-bottom:14px">Abrió ' + esc(t.abrio) + ' (' + F.hora(t.apertura) + ') con ' + F.din(t.base) + (t.cierre ? ' · cerró ' + esc(t.cerro) + ' (' + F.hora(t.cierre) + ')' : '') + '</p>' +
        '<div class="grid grid--2"><div class="tarjeta"><h3>' + r.tickets + ' ventas · ' + F.din(r.total) + '</h3><ul class="leyenda">' + Object.keys(LE.MEDIOS).map(function (m) { return '<li><span class="clave" style="background:' + P.COLOR_MEDIO[m] + '"></span><span>' + LE.MEDIOS[m] + '</span><span class="lv">' + F.din(r.porMedio[m]) + '</span></li>'; }).join('') + '</ul></div>' +
        '<div class="tarjeta"><h3>Efectivo del cajón</h3><ul class="leyenda"><li><span>Apertura</span><span class="lv">' + F.din(t.base) + '</span></li><li><span>Cobrado en efectivo</span><span class="lv">' + F.din(r.porMedio.efectivo) + '</span></li><li><span>Retiros</span><span class="lv">−' + F.din(r.retiros) + '</span></li>' + (t.cierre ? '<li><span>Debería haber</span><span class="lv">' + F.din(t.esperado) + '</span></li><li><span>Se contó</span><span class="lv">' + F.din(t.contado) + '</span></li>' : '') + '</ul></div></div>' +
        (movs.length ? '<h3 style="margin:16px 0 8px">Retiros</h3><ul class="permisos">' + movs.map(function (m) { return '<li><span style="flex:1">' + F.hora(m.ts) + ' · ' + esc(m.concepto) + ' <span class="suave">(' + esc(m.usuario) + ')</span></span><span class="num">' + F.din(m.monto) + '</span></li>'; }).join('') + '</ul>' : ''),
      acciones: [{ texto: 'Cerrar', clase: 'btn--tinta' }]
    });
  };

  /* ============================ REPORTES ============================ */
  P.rutas.reportes = {
    titulo: 'Reportes',
    entrar: function () {
      var S = P.est('reportes', { rango: '7', tab: 'productos' });
      P.cab('Reportes', null, '<button type="button" class="btn btn--linea" data-acc="csv-productos">' + ico('download') + 'Descargar productos (CSV)</button>', P.chipsRango(S.rango));
      P.rutas.reportes.pintar();
    },
    pintar: function () {
      var S = P.est('reportes'), r = P.rango(S.rango), R = LE.reporte(r[0], r[1]), len = r[1] - r[0], Rp = LE.reporte(r[0] - len, r[0]);
      var delta = Rp.total ? Math.round((R.total - Rp.total) * 100 / Rp.total) : null;
      var porHora = S.rango === 'hoy' || S.rango === 'ayer', datos = [];
      if (porHora) { for (var h = 7; h <= 22; h++) datos.push({ etq: h + 'h', v: R.porHora[h].total, tip: h + ':00 a ' + h + ':59 · ' + R.porHora[h].tickets + ' ventas' }); }
      else { var d0 = r[0]; while (d0 < r[1]) { var x = R.porDia[d0] || { total: 0, tickets: 0 }; datos.push({ etq: P.diaCorto(d0), v: x.total, tip: P.diaCorto(d0) + ' · ' + x.tickets + ' ventas', hoy: d0 === LE.inicioDia(Date.now()) }); d0 += DIA; } }
      var cats = Object.keys(R.porCat).map(function (k) { return R.porCat[k]; }).sort(function (a, b) { return b.total - a.total; });
      var prods = Object.keys(R.porProd).map(function (k) { return R.porProd[k]; }).sort(function (a, b) { return b.total - a.total; });
      var cajeros = Object.keys(R.porCajero).map(function (k) { return R.porCajero[k]; }).sort(function (a, b) { return b.total - a.total; });
      var iva = LE.negocio().regimen === 'iva', tab = S.tab || 'productos', totM = 0, m;
      for (m in R.porMedio) totM += R.porMedio[m];
      P.rutas.reportes.ult = prods;
      var contenido = tab === 'categorias' ? P.tabla([
          { t: 'Categoría', c: 't-titulo', f: function (c) { return esc(c.nombre); } }, { t: 'Vendido', c: 't-derecha', f: function (c) { return F.din(c.total); } },
          { t: 'Parte', f: function (c) { return P.pct(c.total, R.total); } }, { t: 'Margen', f: function (c) { return P.pct(c.total - c.costo, c.total); } }], cats)
        : tab === 'personas' ? (cajeros.length ? '<div class="panel__pad">' + P.ranking(cajeros.map(function (c) { return { n: c.nombre + ' · ' + c.tickets + ' ventas', v: c.total, t: c.total }; }), function (i) { return F.din(i.t); }) + '</div>' : '<p class="vacio">Sin ventas en este período.</p>')
        : P.tabla([
          { t: 'Producto', c: 't-titulo', f: function (p) { return esc(p.nombre) + '<small>' + esc(p.cat) + '</small>'; } }, { t: 'Vendido', c: 't-derecha', f: function (p) { return F.din(p.total); } },
          { t: 'Cantidad', f: function (p) { return p.unidad === 'kg' ? F.kg(p.cant) : F.cant(p.cant); } }, { t: 'Ganancia', f: function (p) { return F.din(p.total - p.costo); } }], prods.slice(0, 15));
      var ICM = { efectivo: 'banknote', debito: 'credit-card', credito: 'credit-card', qr: 'qr-code' };
      P.zona('<div class="kpis kpis--rep"><div class="kpi kpi--grande"><div class="kpi__rotulo">Ventas del período</div><div class="kpi__valor">' + F.din(R.total) + '</div><div class="kpi__sub">' + R.tickets + ' ventas' + (delta !== null ? ' · ' + (delta >= 0 ? '+' : '−') + Math.abs(delta) + ' % frente al período anterior' : '') + '</div></div>' +
        '<div class="kpi"><div class="kpi__rotulo">Ticket promedio</div><div class="kpi__valor">' + F.din(R.promedio) + '</div></div>' +
        '<div class="kpi"><div class="kpi__rotulo">Ganancia bruta</div><div class="kpi__valor">' + F.din(R.margen) + '</div><div class="kpi__sub">' + P.pct(R.margen, R.total) + ' de lo vendido</div></div>' +
        '<div class="kpi"><div class="kpi__rotulo">' + (iva ? 'IVA incluido (estimado)' : 'Ventas anuladas') + '</div><div class="kpi__valor">' + (iva ? F.din(R.iva) : R.anuladas) + '</div><div class="kpi__sub">' + (iva ? '' : F.din(R.anuladasTotal)) + '</div></div></div>' +
        '<div class="paneles paneles--rep"><section class="panel panel--grafico"><div class="panel__cab"><h3>' + (porHora ? 'Ventas por hora' : 'Ventas por día') + '</h3>' + P.tablaDatos(datos, true) + '</div>' +
        '<div class="grafico grafico--llenar" id="g-rep"></div>' +
        '<div class="mini-kpis">' + Object.keys(LE.MEDIOS).map(function (k) { return '<div class="mini-kpi"><span class="mini-kpi__ic" style="--c:' + P.COLOR_MEDIO[k] + '">' + ico(ICM[k]) + '</span><div><small>' + LE.MEDIOS[k] + ' · ' + P.pct(R.porMedio[k] || 0, totM) + '</small><strong>' + F.din(R.porMedio[k] || 0) + '</strong></div></div>'; }).join('') + '</div></section>' +
        '<section class="panel"><div class="panel__cab panel__cab--tabs">' + tabs([['productos', 'Más vendidos'], ['categorias', 'Categorías'], ['personas', 'Personas']], tab) + '</div><div class="panel__lista">' + contenido + '</div></section></div>');
      P.barras($('#g-rep'), datos, { titulo: porHora ? 'Ventas por hora' : 'Ventas por día', llenar: true });
    },
    csv: function () {
      var f = [['Producto', 'Categoría', 'Cantidad', 'Vendido', 'Costo', 'Ganancia']];
      (P.rutas.reportes.ult || []).forEach(function (p) { f.push([p.nombre, p.cat, String(p.cant).replace('.', ','), (p.total / 100).toFixed(2).replace('.', ','), (p.costo / 100).toFixed(2).replace('.', ','), ((p.total - p.costo) / 100).toFixed(2).replace('.', ',')]); });
      UI.descargarCSV('productos-la-estrella.csv', f);
    }
  };
  P.acciones['csv-productos'] = function () { P.rutas.reportes.csv(); };

  /* ============================ EQUIPO ============================ */
  P.rutas.equipo = {
    titulo: 'Equipo',
    entrar: function () {
      var S = P.est('equipo', { tab: 'personas', rango: '7', q: '', f: '' }), a = LE.asistenciaAbierta(usuario.id);
      P.cab('Equipo', null,
        '<button type="button" class="btn btn--linea" data-acc="mi-jornada">' + ico('clock') + (a ? 'Terminar mi jornada' : 'Empezar mi jornada') + '</button>' + (S.tab === 'personas' ? '<button type="button" class="btn btn--acento" data-acc="persona-nueva">' + ico('plus') + 'Nueva persona</button>' : ''),
        tabs([['personas', 'Personas'], ['horarios', 'Horarios'], ['registro', 'Registro']], S.tab) + (S.tab === 'personas' ? [['', 'Todas'], ['con', 'Con acceso'], ['sin', 'Sin acceso']].map(function (x) { return '<button type="button" class="chip" data-filtro="f" data-valor="' + x[0] + '" aria-pressed="' + (S.f === x[0]) + '">' + x[1] + '</button>'; }).join('') : '') + (S.tab === 'horarios' ? P.chipsRango(S.rango) : '') + (S.tab === 'registro' ? '<input class="entrada" data-filtro="q" placeholder="Buscar en el registro" value="' + esc(S.q) + '" aria-label="Buscar en el registro">' : ''));
      P.rutas.equipo.pintar();
    },
    pintar: function () {
      var S = P.est('equipo');
      if (S.tab === 'horarios') {
        var r = P.rango(S.rango), as = LE.asistencias(r[0], r[1]), horas = {};
        as.forEach(function (a) { horas[a.nombre] = (horas[a.nombre] || 0) + ((a.salida || Date.now()) - a.entrada); });
        return P.zona('<div class="kpis">' + Object.keys(horas).map(function (n) { return '<div class="kpi"><div class="kpi__rotulo">' + esc(n) + '</div><div class="kpi__valor" style="font-size:22px">' + F.dur(horas[n]) + '</div><div class="kpi__sub">trabajadas en el período</div></div>'; }).join('') + '</div>' +
          P.tabla([
            { t: 'Persona', c: 't-titulo', f: function (a) { return esc(a.nombre) + '<small>' + F.fecha(a.entrada) + '</small>'; } },
            { t: 'Entró', f: function (a) { return F.hora(a.entrada); } }, { t: 'Salió', f: function (a) { return a.salida ? F.hora(a.salida) : '<span class="badge badge--ok">Trabajando</span>'; } },
            { t: 'Tiempo', c: 't-derecha', f: function (a) { return F.dur((a.salida || Date.now()) - a.entrada); } }], as, { vacio: 'Nadie marcó jornada en este período.' }));
      }
      if (S.tab === 'registro') {
        var q = S.q.trim().toLowerCase(), lg = LE.auditoria(400).filter(function (a) { return !q || (a.accion + ' ' + a.usuario).toLowerCase().indexOf(q) >= 0; }).slice(0, 150);
        return P.zona(P.tabla([
          { t: 'Cuándo', c: 't-titulo', f: function (a) { return F.fecha(a.ts) + ' · ' + F.hora(a.ts) + '<small>' + esc(a.usuario) + '</small>'; } }, { t: 'Qué hizo', f: function (a) { return esc(a.accion); } }], lg));
      }
      var todos = LE.usuarios(), us = todos.filter(function (u) { return S.f === 'con' ? u.activo : S.f === 'sin' ? !u.activo : true; });
      var conAcceso = todos.filter(function (u) { return u.activo; }).length, sinAcceso = todos.length - conAcceso, trabajando = todos.filter(function (u) { return LE.asistenciaAbierta(u.id); });
      var permiso = function (si, t) { return '<li><span class="' + (si ? 'si' : 'no') + '">' + ico(si ? 'circle-check' : 'ban') + '</span><span>' + t + '</span></li>'; };
      P.zona('<div class="kpis"><div class="kpi"><div class="kpi__rotulo">Personas con acceso</div><div class="kpi__valor">' + conAcceso + '</div></div>' +
        '<div class="kpi"><div class="kpi__rotulo">Trabajando ahora</div><div class="kpi__valor">' + trabajando.length + '</div>' + (trabajando.length ? '<div class="kpi__sub">' + esc(trabajando.map(function (u) { return u.nombre.split(' ')[0]; }).join(', ')) + '</div>' : '') + '</div>' +
        (sinAcceso ? '<button type="button" class="kpi kpi--link" data-filtro="f" data-valor="sin"><span class="kpi__rotulo">Sin acceso</span><span class="kpi__valor">' + sinAcceso + '</span><span class="kpi__ir">Ver cuáles ›</span></button>' : '<div class="kpi"><div class="kpi__rotulo">Sin acceso</div><div class="kpi__valor">0</div></div>') + '</div>' +
        '<div class="paneles paneles--equipo"><section class="panel"><div class="panel__cab"><h3>Personas</h3></div><div class="panel__lista">' + P.tabla([
          { t: 'Persona', c: 't-titulo', f: function (u) { return '<span class="celda-prod"><span class="avatar avatar--chico' + (u.rol === 'admin' ? ' avatar--acento' : '') + '">' + esc(UI.iniciales(u.nombre)) + '</span><span>' + esc(u.nombre) + '<small>' + esc(u.email) + '</small></span></span>'; } },
          { t: 'Rol', f: function (u) { return '<span class="badge ' + (u.rol === 'admin' ? 'badge--acento' : 'badge--rosa') + '">' + UI.rolNombre(u.rol) + '</span>'; } },
          { t: 'Acceso', f: function (u) { return u.activo ? '<span class="badge badge--ok">Activa</span>' : '<span class="badge badge--error">Sin acceso</span>'; } },
          { t: 'Jornada', f: function (u) { var a = LE.asistenciaAbierta(u.id); return a ? '<span class="en-vivo">Desde ' + F.hora(a.entrada) + '</span>' : '<span class="suave">—</span>'; } },
          { t: '', c: 't-acciones', f: function (u) { return '<button type="button" class="btn btn--icono btn--chico btn--linea" data-acc="persona" data-id="' + u.id + '" aria-label="Editar a ' + esc(u.nombre) + '" title="Editar">' + ico('pencil') + '</button>'; } }
        ], us, { clase: function (u) { return u.activo ? '' : 'is-baja'; }, vacio: 'No hay personas con este filtro.' }) + '</div></section>' +
        '<section class="panel"><div class="panel__cab"><h3>Qué puede hacer cada rol</h3></div><div class="panel__lista panel__pad">' +
          '<h4 class="rol-tit">' + ico('shield-check') + 'Administración · control total</h4><ul class="permisos">' + [
            'Ve y cambia productos, precios y costos', 'Maneja stock, compras y proveedores', 'Ve todas las ventas y puede anularlas', 'Ve caja, diferencias y reportes con ganancias', 'Crea personas y cambia roles', 'Ve el registro de todo lo que se hizo'].map(function (x) { return permiso(true, x); }).join('') + '</ul>' +
          '<h4 class="rol-tit">' + ico('user') + 'Caja · lo justo para cobrar</h4><ul class="permisos">' + [
            [1, 'Abre y cierra su turno de caja'], [1, 'Escanea, cobra e imprime tickets'], [1, 'Hace retiros de efectivo (quedan anotados)'], [1, 'Marca su entrada y salida'], [0, 'No ve costos ni ganancias'], [0, 'No cambia precios ni stock'], [0, 'No anula ventas ya cobradas'], [0, 'No ve los reportes ni al resto del equipo']].map(function (x) { return permiso(x[0], x[1]); }).join('') + '</ul></div></section></div>');
    }
  };
  P.acciones['mi-jornada'] = function () { UI.hacer(function () { return LE.marcarAsistencia(); }).then(function (r) { if (r.ok) { UI.toast(r.valor.estado === 'entrada' ? 'Empezaste tu jornada.' : 'Terminaste tu jornada.', 'ok'); P.rutas.equipo.entrar(); } }); };
  function formPersona(id) {
    var u = id ? LE.usuarios().filter(function (x) { return x.id === id; })[0] : { nombre: '', email: '', rol: 'caja', pin: '', activo: true }, yo = id === usuario.id;
    var ctl = UI.modal({
      titulo: id ? 'Editar persona' : 'Nueva persona',
      cuerpo: '<label class="campo"><span>Nombre y apellido</span><input name="nombre" class="entrada" maxlength="60" value="' + esc(u.nombre) + '"></label><label class="campo"><span>Email</span><input name="email" class="entrada" type="email" value="' + esc(u.email) + '"' + (LE.nubeActiva ? ' readonly' : '') + '></label>' +
        '<div class="fila-campos"><label class="campo"><span>Rol</span><select name="rol" class="entrada"' + (yo ? ' disabled' : '') + '><option value="caja"' + (u.rol === 'caja' ? ' selected' : '') + '>Caja</option><option value="admin"' + (u.rol === 'admin' ? ' selected' : '') + '>Administración</option></select>' + (yo ? '<small>No podés cambiar tu propio rol.</small>' : '') + '</label>' +
        (LE.nubeActiva ? '' : '<label class="campo"><span>PIN (4 números)</span><input name="pin" class="entrada" inputmode="numeric" maxlength="4" autocomplete="off" value="' + esc(u.pin) + '"></label>') + '</div>' +
        '<label class="interruptor"><span>Tiene acceso al sistema' + (yo ? ' (no podés desactivarte)' : '') + '</span><input type="checkbox" name="activo"' + (u.activo ? ' checked' : '') + (yo ? ' disabled' : '') + '></label>',
      acciones: [{ texto: 'Cancelar', clase: 'btn--linea' }, { texto: 'Guardar', clase: 'btn--tinta', cerrar: false, accion: function () {
        var v = UI.valores(ctl); if (yo) { v.rol = u.rol; v.activo = u.activo; } v.id = id;
        UI.hacer(function () { return LE.guardarUsuario(v); }, 'Cambios guardados.').then(function (r) { if (r.ok) { ctl.cerrar(); P.refrescar(); } }); return false; } }]
    });
  }
  P.acciones['persona-nueva'] = function () {
    if (!LE.nubeActiva) return formPersona();
    UI.modal({ titulo: 'Sumar a una persona', cuerpo: '<p>Cada persona crea su propia cuenta desde la pantalla de ingreso, tocando <strong>Crear cuenta nueva</strong> (con su email y una contraseña).</p><p style="margin-top:10px">Después aparece acá como <strong>Sin acceso</strong>: la editás, le elegís el rol (Caja o Administración) y la activás.</p>', acciones: [{ texto: 'Entendido', clase: 'btn--tinta' }] });
  }; P.acciones.persona = function (id) { formPersona(id); };

  /* ============================ AJUSTES ============================ */
  function previaTicket(v) {
    var W = 32, c = function (t) { t = String(t || ''); if (t.length >= W) return t.slice(0, W); return new Array(Math.floor((W - t.length) / 2) + 1).join(' ') + t; };
    var der = function (a, b) { var e = Math.max(1, W - a.length - b.length); return a + new Array(e + 1).join(' ') + b; }, raya = new Array(W + 1).join('-'), L = [];
    L.push(c(String(v.nombre || '').toUpperCase())); L.push(c(v.rubro));
    String(v.direccion || '').split(' ').reduce(function (ls, w) { var u = ls[ls.length - 1]; if ((u + ' ' + w).trim().length <= W) ls[ls.length - 1] = (u + ' ' + w).trim(); else ls.push(w); return ls; }, ['']).forEach(function (t) { if (t) L.push(c(t)); });
    if (v.telefono) L.push(c('Tel. ' + v.telefono)); if (v.rut) L.push(c('RUT ' + v.rut));
    L.push(raya, 'Ticket N.º 002082', raya, 'Yerba Mate 1 kg', der('  1 x $ 279', '$ 279'), 'Pan Flauta', der('  2 x $ 30', '$ 60'), raya, der('TOTAL', '$ 339'), raya, c(v.pie));
    return L.join('\n');
  }
  P.rutas.ajustes = {
    titulo: 'Ajustes',
    entrar: function () {
      var S = P.est('ajustes', { tab: 'negocio' });
      P.cab('Ajustes', null, null, tabs([['negocio', 'El negocio'], ['cobro', 'Cobro y balanza'], ['sistema', 'Sistema']], S.tab));
      P.rutas.ajustes.pintar();
    },
    pintar: function () {
      var S = P.est('ajustes'), n = LE.negocio(), b = n.balanza, ejemplo = LE.ean13(b.prefijo + '00101' + '00350');
      var cab = function (t) { return '<div class="panel__cab"><h3>' + t + '</h3></div>'; };
      if (S.tab === 'cobro') {
        P.zona('<div class="paneles paneles--form paneles--iguales"><section class="panel panel--form">' + cab('Medios de pago habilitados') + '<form id="f-med">' + Object.keys(LE.MEDIOS).map(function (m) { return '<label class="interruptor"><span>' + LE.MEDIOS[m] + '</span><input type="checkbox" name="' + m + '"' + (n.medios[m] ? ' checked' : '') + '></label>'; }).join('') +
          '<p class="suave" style="font-size:14px;margin:12px 0">Débito, crédito y QR se cobran en el datáfono o con el QR del banco y acá se anota que se cobró.</p><button type="button" class="btn btn--tinta" data-acc="guardar-medios">Guardar</button></form></section>' +
          '<section class="panel panel--form">' + cab('Balanza') + '<form id="f-bal"><div class="fila-campos"><label class="campo"><span>Código inicial</span><select name="prefijo" class="entrada">' + ['20', '21', '22', '23', '24', '25', '26', '27', '28', '29'].map(function (x) { return '<option' + (b.prefijo === x ? ' selected' : '') + '>' + x + '</option>'; }).join('') + '</select></label>' +
          '<label class="campo"><span>La etiqueta trae</span><select name="modo" class="entrada"><option value="peso"' + (b.modo === 'peso' ? ' selected' : '') + '>El peso</option><option value="precio"' + (b.modo === 'precio' ? ' selected' : '') + '>El precio</option></select></label></div>' +
          '<p class="suave" style="font-size:14px;margin-bottom:14px;line-height:1.5">Ejemplo con el Jamón Cocido (PLU 00101): <span class="mono">' + ejemplo + '</span>. Se lee así: <span class="mono">' + b.prefijo + '</span> inicio · <span class="mono">00101</span> producto · <span class="mono">00350</span> ' + (b.modo === 'peso' ? '350 gramos' : '$ 3,50') + ' · último dígito de control. <strong>Hay que confirmar el formato de la balanza real.</strong></p><button type="button" class="btn btn--tinta" data-acc="guardar-balanza">Guardar</button></form></section></div>');
      } else if (S.tab === 'sistema') {
        P.zona('<div class="paneles paneles--form paneles--iguales"><div class="panel-col"><section class="panel panel--form">' + cab('Factura electrónica') + '<p class="nota" style="margin-bottom:12px">' + ico('info') + '<span>Hoy el ticket sale como <strong>comprobante interno</strong>, no como factura. Si el almacén pasa a emitir e-Ticket, se conecta un proveedor autorizado por la DGI y el ticket pasa a llevar CAE y código QR. El sistema ya guarda IVA por producto y numeración propia para ese día.</span></p><label class="interruptor"><span>Emitir e-Ticket (DGI)</span><input type="checkbox" disabled></label></section>' +
          (LE.nubeActiva ? '<section class="panel panel--form">' + cab('Base de datos') + '<p class="suave">Conectada a Supabase. Los cambios se guardan en la nube y los ven todas las terminales. Las ventas hechas sin internet se envían solas cuando vuelve la conexión.</p></section>' : '<section class="panel panel--form">' + cab('Datos del sistema') + '<p class="suave" style="margin-bottom:12px">Volvé a los datos iniciales: se borra todo lo que cargaste desde que empezaste.</p><button type="button" class="btn btn--peligro" data-acc="reset">' + ico('rotate-ccw') + 'Restablecer datos</button></section>') + '</div>' +
          '<section class="panel panel--form">' + cab('Créditos de las fotos') + '<p class="suave" style="font-size:14px;line-height:1.55">Las fotos de los envases vienen de <a href="https://world.openfoodfacts.org" target="_blank" rel="noopener">Open Food Facts</a>, Open Products Facts y Open Beauty Facts (licencia <a href="https://creativecommons.org/licenses/by-sa/3.0/deed.es" target="_blank" rel="noopener">CC BY-SA 3.0</a>), y las de productos frescos de <a href="https://commons.wikimedia.org" target="_blank" rel="noopener">Wikimedia Commons</a>, cada una con su autor y licencia. La lista completa está en <span class="mono">img/productos/CREDITOS.md</span>.</p></section></div>');
      } else {
        P.zona('<div class="paneles paneles--form"><section class="panel panel--form">' + cab('El negocio y el ticket') + '<form id="f-neg"><div class="campos-2">' + [['nombre', 'Nombre'], ['rubro', 'A qué se dedica'], ['direccion', 'Dirección'], ['telefono', 'Teléfono'], ['rut', 'RUT']].map(function (c) { return '<label class="campo"><span>' + c[1] + '</span><input name="' + c[0] + '" class="entrada" maxlength="120" value="' + esc(n[c[0]]) + '"></label>'; }).join('') +
          '<label class="campo"><span>Régimen</span><select name="regimen" class="entrada"><option value="monotributo"' + (n.regimen === 'monotributo' ? ' selected' : '') + '>Monotributo</option><option value="iva"' + (n.regimen === 'iva' ? ' selected' : '') + '>IVA</option></select></label>' +
          '<label class="campo campo--ancho"><span>Mensaje al pie del ticket</span><input name="pie" class="entrada" maxlength="60" value="' + esc(n.pie) + '"></label></div><button type="button" class="btn btn--tinta" data-acc="guardar-negocio">Guardar</button></form></section>' +
          '<section class="panel panel--form">' + cab('Así sale en el ticket') + '<div class="papel-marco"><pre class="papel" id="tk-previa" aria-label="Vista previa del ticket"></pre></div></section></div>');
        var f = $('#f-neg'), pre = function () { $('#tk-previa').textContent = previaTicket({ nombre: f.nombre.value, rubro: f.rubro.value, direccion: f.direccion.value, telefono: f.telefono.value, rut: f.rut.value, pie: f.pie.value }); };
        f.addEventListener('input', pre); pre();
      }
    }
  };
  P.acciones['guardar-negocio'] = function () { var v = UI.valores({ $$: function (s) { return UI.$$(s, $('#f-neg')); } }); UI.hacer(function () { return LE.guardarNegocio(v); }, 'Datos guardados.').then(function (r) { if (r.ok) P.refrescar(); }); };
  P.acciones['guardar-medios'] = function () { var v = UI.valores({ $$: function (s) { return UI.$$(s, $('#f-med')); } }); if (!Object.keys(v).some(function (k) { return v[k]; })) return UI.toast('Dejá al menos un medio de pago.', 'error'); UI.hacer(function () { return LE.guardarNegocio({ medios: v }); }, 'Medios de pago guardados.').then(function (r) { if (r.ok) P.refrescar(); }); };
  P.acciones['guardar-balanza'] = function () { var v = UI.valores({ $$: function (s) { return UI.$$(s, $('#f-bal')); } }); UI.hacer(function () { return LE.guardarNegocio({ balanza: { prefijo: v.prefijo, modo: v.modo } }); }, 'Balanza guardada.').then(function (r) { if (r.ok) P.refrescar(); }); };
  P.acciones.reset = function () { UI.confirmar('Restablecer los datos', 'Se borra todo lo que cargaste y se vuelven a generar los datos iniciales.', { ok: 'Restablecer', peligro: true }).then(function (si) { if (si) { LE.reset(); location.href = '../index.html'; } }); };
})();
