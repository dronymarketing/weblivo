/* ============================================================
   PANACEA — página de producto (producto.html?id=...).
   Arma la página con los datos de productos.js.
   Necesita productos.js y carrito.js cargados antes.
   ============================================================ */
(function () {
  "use strict";

  var P = window.PANACEA;
  var C = window.Carrito;
  var id = new URLSearchParams(window.location.search).get("id");
  var p = P.porId[id];
  var $ = function (s) { return document.getElementById(s); };

  /* Producto que no existe: mensaje y vuelta a los productos */
  if (!p) {
    var main = document.querySelector("main");
    main.innerHTML =
      '<section class="bloque vacio">' +
      '<p class="vacio__titulo">No encontramos ese producto</p>' +
      '<p>Puede que el link esté viejo. Mirá todos los productos:</p>' +
      '<a class="boton boton--oscuro" href="index.html#productos">Ver productos</a></section>';
    return;
  }

  document.title = p.nombre + " — Panacea, terapias y herbolaria";

  /* ---------- Fotos ---------- */
  var foto = $("pp-foto");
  function mostrarFoto(i) {
    foto.src = p.fotos[i].src;
    foto.alt = p.fotos[i].alt;
    Array.prototype.forEach.call($("pp-minis").children, function (li, n) {
      var b = li.firstChild;
      if (n === i) { b.setAttribute("aria-current", "true"); } else { b.removeAttribute("aria-current"); }
    });
  }
  if (p.fotos.length > 1) {
    p.fotos.forEach(function (f, i) {
      var li = document.createElement("li");
      var b = document.createElement("button");
      b.type = "button";
      b.setAttribute("aria-label", "Ver foto " + (i + 1) + " de " + p.fotos.length);
      var im = document.createElement("img");
      im.src = f.src; im.alt = ""; im.loading = "lazy";
      b.appendChild(im);
      b.addEventListener("click", function () { mostrarFoto(i); });
      li.appendChild(b);
      $("pp-minis").appendChild(li);
    });
  } else {
    $("pp-minis").hidden = true;
  }
  mostrarFoto(0);
  $("pp-insignia").textContent = p.categoria;

  /* ---------- Textos ---------- */
  $("pp-cat").textContent = p.categoria;
  $("pp-nombre").textContent = p.nombre;
  $("pp-desc").textContent = p.desc;
  $("pp-precio").textContent = p.precio ? P.dinero(p.precio) : "Consultar";

  /* ---------- Características ---------- */
  var ficha = $("pp-ficha");
  p.ficha.forEach(function (f) {
    var fila = document.createElement("div");
    fila.className = "ficha__item";
    fila.innerHTML =
      '<svg class="icon" aria-hidden="true"><use href="#i-' + f[0] + '"/></svg>' +
      "<dt></dt><dd></dd>";
    fila.querySelector("dt").textContent = f[1];
    fila.querySelector("dd").textContent = f[2];
    ficha.appendChild(fila);
  });

  /* ---------- Nota (lo que es de muestra se dice en pantalla) ---------- */
  var nota = $("pp-nota");
  if (p.muestra) {
    nota.querySelector("span").textContent = "Producto de muestra: el precio, la foto y las características se reemplazan por los del catálogo real.";
    nota.hidden = false;
  } else if (!p.precio) {
    nota.querySelector("span").textContent = "El precio de este producto se consulta por WhatsApp.";
    nota.hidden = false;
  }

  /* ---------- Compra ---------- */
  var cantidad = C.enlazarCantidad(document.querySelector("[data-cantidad]"), function () {});
  var estado = $("pp-estado");

  function pintarEstado() {
    var n = C.cantidad(id);
    if (n > 0) {
      estado.innerHTML = 'En tu pedido: <strong>' + n + '</strong>. <a href="carrito.html">Ver mi pedido</a>';
    } else {
      estado.textContent = "";
    }
  }
  $("pp-agregar").addEventListener("click", function () {
    C.agregar(id, cantidad.leer());
  });
  C.alCambiar(pintarEstado);
  pintarEstado();

  if (p.precio) {
    /* "Comprar ahora": suma lo elegido y sigue al pago */
    $("pp-comprar").addEventListener("click", function () { C.agregar(id, cantidad.leer()); });
  } else {
    /* Sin precio: no se paga online, se consulta por WhatsApp */
    $("pp-comprar").hidden = true;
    var wsp = $("pp-consultar");
    wsp.hidden = false;
    wsp.href = "https://wa.me/" + P.whatsapp + "?text=" +
      encodeURIComponent("Hola Paola, quiero consultar por: " + p.nombre);
  }

  $("pp").hidden = false;
})();
