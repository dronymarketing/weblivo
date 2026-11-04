/* ============================================================
   PANACEA — pantalla de pago (pago.html), en 4 pasos:
   1 Resumen · 2 Tus datos · 3 Medio de pago · 4 Confirmar.

   HOY es estática: al final arma el pedido y lo manda por WhatsApp.
   PUNTO DE CONEXIÓN DEL PROVEEDOR DE PAGOS (Bamboo u otro):
   definir window.PANACEA.pagoOnline = function (pedido) { ... }
   que devuelva una promesa. Si la promesa trae { url }, se redirige
   ahí (página segura del proveedor). Mientras no esté definida, o
   si el medio es "Coordinar con Paola", sigue por WhatsApp.
   Necesita productos.js y carrito.js cargados antes.
   ============================================================ */
(function () {
  "use strict";

  var P = window.PANACEA;
  var C = window.Carrito;
  var $ = function (s) { return document.getElementById(s); };
  var CLAVE_DATOS = "panacea-datos";

  function esc(t) {
    return String(t).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

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
      var precio = it.producto.precio ? P.dinero(it.producto.precio * it.cantidad) : "Consultar";
      return '<li><span class="mini__nombre">' + it.cantidad + " × " + esc(it.producto.nombre) + "</span><span>" + precio + "</span></li>";
    }).join("");
  }
  function avisoConsultar() {
    var n = C.aConsultar();
    if (!n) { return ""; }
    return (n === 1 ? "1 producto es a consultar" : n + " productos son a consultar") +
      ": no suma al total y se confirma por WhatsApp.";
  }
  function pintarResumen() {
    var unidades = C.unidades();
    $("p-descripcion").textContent = "Pedido de " + unidades + (unidades === 1 ? " producto" : " productos");
    ["p-lineas", "l-lineas"].forEach(function (i) { $(i).innerHTML = lineasHTML(); });
    ["p-total", "l-total", "c-total"].forEach(function (i) { $(i).textContent = P.dinero(C.total()); });
    ["p-aviso", "c-aviso"].forEach(function (i) {
      var el = $(i);
      var t = avisoConsultar();
      el.hidden = !t;
      el.querySelector("span").textContent = t;
    });
  }
  pintarResumen();

  /* ---------- Datos guardados (para no volver a escribirlos) ---------- */
  var form = $("form-datos");
  function leerDatos() {
    return {
      nombre: form.nombre.value.trim(),
      telefono: form.telefono.value.trim(),
      email: form.email.value.trim(),
      entrega: form.entrega.value,
      notas: form.notas.value.trim()
    };
  }
  try {
    var g = JSON.parse(window.sessionStorage.getItem(CLAVE_DATOS) || "null");
    if (g) {
      form.nombre.value = g.nombre || "";
      form.telefono.value = g.telefono || "";
      form.email.value = g.email || "";
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
  var actual = 1;

  function irA(n, inicial) {
    actual = n;
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
    document.getElementById("pasos").scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function mostrarError(clave, hay) {
    var el = document.querySelector('[data-error="' + clave + '"]');
    if (el) { el.hidden = !hay; }
  }
  function validar(paso) {
    if (paso === 2) {
      var d = leerDatos();
      var okNombre = d.nombre.length >= 2;
      var okTel = d.telefono.replace(/\D/g, "").length >= 8;
      mostrarError("nombre", !okNombre);
      mostrarError("telefono", !okTel);
      if (!okNombre) { form.nombre.focus(); } else if (!okTel) { form.telefono.focus(); }
      if (okNombre && okTel) { guardarDatos(); }
      return okNombre && okTel;
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

  /* ---------- Medio de pago ---------- */
  var nota = $("medios-nota");
  document.querySelectorAll('input[name="medio"]').forEach(function (r) {
    r.addEventListener("change", function () {
      mostrarError("medio", false);
      var grupo = r.getAttribute("data-grupo");
      nota.querySelector("span").textContent = grupo === "coordinar"
        ? "Vas a coordinar el pago directamente con Paola por WhatsApp."
        : "El pago online todavía no está activo: tu pedido se confirma por WhatsApp con el medio que elegiste (" + r.value + ").";
    });
  });

  /* ---------- Paso 4: confirmación ---------- */
  function pedido() {
    var d = leerDatos();
    var medio = document.querySelector('input[name="medio"]:checked');
    return {
      datos: d,
      medio: medio ? medio.value : "",
      grupo: medio ? medio.getAttribute("data-grupo") : "",
      total: C.total(),
      items: C.items().map(function (it) { return { id: it.id, cantidad: it.cantidad }; })
    };
  }
  function pintarConfirmacion() {
    var ped = pedido();
    var d = ped.datos;
    var filas = [
      ["Nombre", d.nombre],
      ["Teléfono", d.telefono]
    ];
    if (d.email) { filas.push(["Email", d.email]); }
    filas.push(["Entrega", d.entrega]);
    if (d.notas) { filas.push(["Notas", d.notas]); }
    filas.push(["Medio de pago", ped.medio]);
    $("c-datos").innerHTML = filas.map(function (f) {
      return "<div><dt>" + esc(f[0]) + "</dt><dd>" + esc(f[1]) + "</dd></div>";
    }).join("");
    $("c-gracias").hidden = true;
    $("c-enviar").href = C.enlaceWhatsApp(extraWhatsApp(ped));
  }
  function extraWhatsApp(ped) {
    var d = ped.datos;
    var lineas = ["Mis datos:", "Nombre: " + d.nombre, "Teléfono: " + d.telefono];
    if (d.email) { lineas.push("Email: " + d.email); }
    lineas.push("Entrega: " + d.entrega);
    lineas.push("Medio de pago elegido: " + ped.medio + (ped.grupo === "coordinar" ? "" : " (pago online pendiente de activar)"));
    if (d.notas) { lineas.push("Notas: " + d.notas); }
    return lineas;
  }

  $("c-enviar").addEventListener("click", function (e) {
    var ped = pedido();
    /* Cuando el proveedor de pagos esté conectado, los medios online van por acá */
    if (typeof P.pagoOnline === "function" && ped.grupo !== "coordinar" && C.aConsultar() === 0) {
      e.preventDefault();
      P.pagoOnline(ped).then(function (r) {
        if (r && r.url) { window.location.href = r.url; } else { window.open(C.enlaceWhatsApp(extraWhatsApp(ped)), "_blank", "noopener"); }
      }).catch(function () {
        window.open(C.enlaceWhatsApp(extraWhatsApp(ped)), "_blank", "noopener");
      });
    }
    $("c-gracias").hidden = false;
  });

  irA(1, true);
})();
