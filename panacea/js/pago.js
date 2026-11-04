/* ============================================================
   PANACEA — pantalla de pago (pago.html), en 4 pasos:
   1 Resumen · 2 Tus datos · 3 Medio de pago · 4 Confirmar y pagar.

   Funciona como cualquier tienda: el último paso tiene el botón
   "Pagar", que lleva a la pasarela del proveedor de pagos y vuelve a
   gracias.html con la confirmación.

   PUNTO DE CONEXIÓN DEL PROVEEDOR DE PAGOS (Bamboo u otro):
   definir window.PANACEA.pagoOnline = function (pedido) { ... }
   que devuelva una promesa con { url } (la página segura del proveedor).
   El pedido trae: datos del cliente, medio elegido, total e items.
   MIENTRAS NO ESTÉ DEFINIDA, la página corre en MODO PRUEBA: muestra el
   aviso, no cobra nada y lleva igual a gracias.html?prueba=1.
   Necesita productos.js y carrito.js cargados antes.
   ============================================================ */
(function () {
  "use strict";

  var P = window.PANACEA;
  var C = window.Carrito;
  var $ = function (s) { return document.getElementById(s); };
  var CLAVE_DATOS = "panacea-datos";
  var CLAVE_PEDIDO = "panacea-ultimo-pedido";

  function esc(t) {
    return String(t).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  /* El aviso de modo prueba solo se ve mientras no haya pasarela conectada */
  $("aviso-prueba").hidden = typeof P.pagoOnline === "function";

  /* ---------- Carrito vacío ---------- */
  if (C.lineas() === 0) {
    $("pago-vacio").hidden = false;
    $("pago-grid").hidden = true;
    $("pasos").hidden = true;
    return;
  }

  /* ---------- Resumen (pasos 1 y 4, y la columna de al lado) ---------- */
  function lineasHTML() {
    return C.items().map(function (it) {
      return '<li><span class="mini__nombre">' + it.cantidad + " × " + esc(it.producto.nombre) + "</span><span>" +
        P.dinero(it.producto.precio * it.cantidad) + "</span></li>";
    }).join("");
  }
  function pintarResumen() {
    var unidades = C.unidades();
    $("p-descripcion").textContent = "Pedido de " + unidades + (unidades === 1 ? " producto" : " productos");
    ["p-lineas", "l-lineas"].forEach(function (i) { $(i).innerHTML = lineasHTML(); });
    ["p-total", "l-total", "c-total"].forEach(function (i) { $(i).textContent = P.dinero(C.total()); });
    $("c-pagar-txt").textContent = "Pagar " + P.dinero(C.total());
  }
  pintarResumen();

  /* ---------- Datos guardados (para no volver a escribirlos) ---------- */
  var form = $("form-datos");
  function leerDatos() {
    return {
      nombre: form.nombre.value.trim(),
      email: form.email.value.trim(),
      telefono: form.telefono.value.trim(),
      entrega: form.entrega.value,
      notas: form.notas.value.trim()
    };
  }
  try {
    var g = JSON.parse(window.sessionStorage.getItem(CLAVE_DATOS) || "null");
    if (g) {
      form.nombre.value = g.nombre || "";
      form.email.value = g.email || "";
      form.telefono.value = g.telefono || "";
      form.notas.value = g.notas || "";
      Array.prototype.forEach.call(form.querySelectorAll('input[name="entrega"]'), function (r) { r.checked = r.value === g.entrega; });
      if (!form.entrega.value) { form.querySelector('input[name="entrega"]').checked = true; }
    }
  } catch (err) { /* sin datos guardados */ }
  function guardarDatos() {
    try { window.sessionStorage.setItem(CLAVE_DATOS, JSON.stringify(leerDatos())); } catch (err) { /* sigue en memoria */ }
  }

  /* ---------- Pasos ---------- */
  var secciones = Array.prototype.slice.call(document.querySelectorAll(".paso"));
  var indicador = Array.prototype.slice.call(document.querySelectorAll(".pasos__item"));

  function irA(n, inicial) {
    secciones.forEach(function (s) { s.hidden = Number(s.getAttribute("data-paso")) !== n; });
    indicador.forEach(function (li) {
      var k = Number(li.getAttribute("data-paso"));
      li.classList.toggle("es-actual", k === n);
      li.classList.toggle("es-hecho", k < n);
      if (k === n) { li.setAttribute("aria-current", "step"); } else { li.removeAttribute("aria-current"); }
    });
    if (n === 4) { pintarConfirmacion(); }
    if (inicial) { return; }
    var titulo = document.querySelector('.paso[data-paso="' + n + '"] .paso__titulo');
    if (titulo) { titulo.setAttribute("tabindex", "-1"); titulo.focus({ preventScroll: true }); }
    $("pasos").scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function mostrarError(clave, hay) {
    var el = document.querySelector('[data-error="' + clave + '"]');
    if (el) { el.hidden = !hay; }
  }
  function validar(paso) {
    if (paso === 2) {
      var d = leerDatos();
      var okNombre = d.nombre.length >= 2;
      var okEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(d.email);
      var okTel = d.telefono.replace(/\D/g, "").length >= 8;
      mostrarError("nombre", !okNombre);
      mostrarError("email", !okEmail);
      mostrarError("telefono", !okTel);
      if (!okNombre) { form.nombre.focus(); } else if (!okEmail) { form.email.focus(); } else if (!okTel) { form.telefono.focus(); }
      if (okNombre && okEmail && okTel) { guardarDatos(); }
      return okNombre && okEmail && okTel;
    }
    if (paso === 3) {
      var elegido = document.querySelector('input[name="medio"]:checked');
      mostrarError("medio", !elegido);
      return !!elegido;
    }
    return true;
  }

  document.querySelectorAll("[data-ir]").forEach(function (b) {
    b.addEventListener("click", function () {
      var validarPaso = Number(b.getAttribute("data-validar"));
      if (validarPaso && !validar(validarPaso)) { return; }
      irA(Number(b.getAttribute("data-ir")));
    });
  });
  document.querySelectorAll('input[name="medio"]').forEach(function (r) {
    r.addEventListener("change", function () { mostrarError("medio", false); });
  });

  /* ---------- Paso 4: confirmar y pagar ---------- */
  function pedido() {
    var medio = document.querySelector('input[name="medio"]:checked');
    return {
      datos: leerDatos(),
      medio: medio ? medio.value : "",
      total: C.total(),
      items: C.items().map(function (it) {
        return { id: it.id, nombre: it.producto.nombre, cantidad: it.cantidad, precio: it.producto.precio };
      })
    };
  }
  function pintarConfirmacion() {
    var ped = pedido();
    var d = ped.datos;
    var filas = [["Nombre", d.nombre], ["Email", d.email], ["Teléfono", d.telefono], ["Entrega", d.entrega]];
    if (d.notas) { filas.push(["Notas", d.notas]); }
    filas.push(["Medio de pago", ped.medio]);
    $("c-datos").innerHTML = filas.map(function (f) {
      return "<div><dt>" + esc(f[0]) + "</dt><dd>" + esc(f[1]) + "</dd></div>";
    }).join("");
    $("c-error").hidden = true;
  }

  var pagar = $("c-pagar");
  function liberarBoton() {
    pagar.disabled = false;
    $("c-pagar-txt").textContent = "Pagar " + P.dinero(C.total());
  }
  pagar.addEventListener("click", function () {
    var ped = pedido();
    pagar.disabled = true;
    $("c-pagar-txt").textContent = "Procesando…";
    $("c-error").hidden = true;

    if (typeof P.pagoOnline === "function") {
      /* Con pasarela: se crea la compra en el proveedor y se va a su página segura */
      P.pagoOnline(ped).then(function (r) {
        if (r && r.url) { window.location.href = r.url; } else { throw new Error("El proveedor no devolvió la URL de pago"); }
      }).catch(function () {
        $("c-error").hidden = false;
        liberarBoton();
      });
      return;
    }

    /* MODO PRUEBA: no se cobra nada; se guarda el pedido para mostrarlo en gracias.html */
    try {
      ped.numero = "PRUEBA-" + Date.now().toString(36).toUpperCase();
      window.sessionStorage.setItem(CLAVE_PEDIDO, JSON.stringify(ped));
    } catch (err) { /* sigue sin guardar */ }
    window.location.href = "gracias.html?prueba=1";
  });

  irA(1, true);
})();
