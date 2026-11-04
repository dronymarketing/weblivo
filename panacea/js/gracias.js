/* ============================================================
   PANACEA — confirmación de la compra (gracias.html).

   Dos modos:
   · CON SERVIDOR (vuelta de Bamboo): la dirección trae ?pedido=…&t=… y se le
     pregunta al servidor el estado REAL del pago (no se confía en la dirección).
     Si el pago sigue pendiente, se vuelve a preguntar cada pocos segundos.
   · MODO PRUEBA (?prueba=1): muestra el pedido guardado en el navegador.
   Necesita productos.js, carrito.js y config.js cargados antes.
   ============================================================ */
(function () {
  "use strict";

  var P = window.PANACEA;
  var C = window.Carrito;
  var $ = function (s) { return document.getElementById(s); };
  var params = new URLSearchParams(window.location.search);
  var API = String(window.PANACEA_API || "").replace(/\/$/, "");

  function esc(t) {
    return String(t).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function lineas(items) {
    $("g-lineas").innerHTML = items.map(function (it) {
      return '<li><span class="mini__nombre">' + it.cantidad + " × " + esc(it.nombre) + "</span><span>" +
        P.dinero(it.precio * it.cantidad) + "</span></li>";
    }).join("");
  }
  function filasDatos(filas) {
    $("g-datos").innerHTML = filas.map(function (f) {
      return "<div><dt>" + esc(f[0]) + "</dt><dd>" + esc(f[1]) + "</dd></div>";
    }).join("");
  }

  /* ---------- Con servidor ---------- */
  var numero = params.get("pedido");
  var token = params.get("t");
  if (API && numero && token) {
    var intentos = 0;
    var MAX_INTENTOS = 24; /* 24 × 5 s = 2 minutos esperando que el banco confirme */

    var consultar = function () {
      fetch(API + "/api/pedido?numero=" + encodeURIComponent(numero) + "&t=" + encodeURIComponent(token))
        .then(function (r) { return r.ok ? r.json() : null; })
        .then(function (p) {
          if (!p) { $("g-vacio").hidden = false; return; }
          mostrar(p);
          if (p.estado === "PENDIENTE" || p.estado === "CREADO") {
            intentos++;
            if (intentos < MAX_INTENTOS) { setTimeout(consultar, 5000); }
          }
        })
        .catch(function () {
          if (++intentos < MAX_INTENTOS) { setTimeout(consultar, 5000); } else { $("g-vacio").hidden = false; }
        });
    };

    var mostrar = function (p) {
      $("g-numero").textContent = p.numero;
      lineas(p.items);
      $("g-total").textContent = P.dinero(p.total);
      filasDatos([["Medio de pago", p.medio]]);
      $("g-prueba").hidden = true;

      var estado = p.estado;
      var kicker = $("g-kicker"), titulo = $("g-titulo"), texto = $("g-texto"), icono = $("g-icono");
      $("g-reintentar").hidden = true;

      if (estado === "APROBADO") {
        kicker.textContent = "Compra confirmada";
        titulo.textContent = "Gracias";
        texto.textContent = "Recibimos tu pago. Guardá el número de pedido: Paola se va a comunicar con vos para coordinar la entrega.";
        icono.setAttribute("href", "#i-circle-check");
        C.vaciar(); /* la compra terminó */
      } else if (estado === "PENDIENTE" || estado === "CREADO") {
        kicker.textContent = "Pago en proceso";
        titulo.textContent = "Gracias";
        texto.textContent = "Estamos esperando que tu banco confirme el pago. Esta página se actualiza sola.";
        icono.setAttribute("href", "#i-clock");
      } else if (estado === "REVISAR") {
        kicker.textContent = "Estamos revisando tu pago";
        titulo.textContent = "Gracias";
        texto.textContent = "Recibimos tu pago y lo estamos revisando. Paola se va a comunicar con vos.";
        icono.setAttribute("href", "#i-clock");
        C.vaciar();
      } else {
        /* RECHAZADO, CANCELADO o ERROR: el carrito queda como estaba para reintentar */
        kicker.textContent = "No se completó el pago";
        titulo.textContent = "Sin cobrar";
        texto.textContent = "No se completó el pago y no se cobró nada. Podés volver a intentarlo.";
        icono.setAttribute("href", "#i-info");
        $("g-reintentar").hidden = false;
      }
      $("g-datos-bloque").hidden = false;
      $("gracias").hidden = false;
      $("g-vacio").hidden = true;
    };

    consultar();
    return;
  }

  /* ---------- Modo prueba ---------- */
  var ped = null;
  try { ped = JSON.parse(window.sessionStorage.getItem("panacea-ultimo-pedido") || "null"); } catch (err) { ped = null; }

  if (!ped || !ped.items || !ped.datos) {
    $("g-vacio").hidden = false;
    return;
  }

  var esPrueba = params.get("prueba") === "1";
  $("g-numero").textContent = ped.numero || "";
  $("g-prueba").hidden = !esPrueba;
  $("g-texto").textContent = esPrueba
    ? "Así se vería la confirmación después de pagar. En el sitio real vas a ver acá el estado de tu pago."
    : "Recibimos tu pedido.";
  lineas(ped.items);
  $("g-total").textContent = P.dinero(ped.total);

  var d = ped.datos;
  var filas = [["Nombre", d.nombre], ["Email", d.email], ["Teléfono", d.telefono], ["Entrega", d.entrega], ["Medio de pago", ped.medio]];
  if (d.notas) { filas.splice(4, 0, ["Notas", d.notas]); }
  filasDatos(filas);

  $("gracias").hidden = false;

  /* La compra de prueba terminó: el carrito se vacía */
  C.vaciar();
})();
