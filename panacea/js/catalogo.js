/* ============================================================
   PANACEA — la tienda (productos.html): destacados, búsqueda,
   categorías y orden. Todo sale de productos.js.
   Necesita productos.js, carrito.js y tarjetas.js cargados antes.
   ============================================================ */
(function () {
  "use strict";

  var P = window.PANACEA;
  var $ = function (s) { return document.getElementById(s); };

  var CATEGORIAS = [
    ["todos", "Todos"],
    ["piel", "Piel"],
    ["tes", "Tisanas"],
    ["tinturas", "Tinturas"]
  ];
  var estado = { cat: "todos", orden: "destacados", texto: "" };

  /* Texto sin tildes ni mayúsculas, para buscar "serum" y encontrar "Sérum" */
  function limpio(t) {
    return String(t).normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
  }

  /* ---------- Destacados ---------- */
  var destacados = P.productos.filter(function (p) { return p.destacado; });
  $("dest-lista").innerHTML = destacados.map(window.Tarjetas.html).join("");
  window.Tarjetas.enlazar($("dest-lista"));

  /* ---------- Categorías (con cantidad) ---------- */
  function cantidadDe(cat) {
    return cat === "todos" ? P.productos.length : P.productos.filter(function (p) { return p.cat === cat; }).length;
  }
  var chips = $("chips");
  chips.innerHTML = CATEGORIAS.map(function (c) {
    return '<button class="chip" type="button" data-cat="' + c[0] + '" aria-pressed="false">' +
      c[1] + "<sup>" + cantidadDe(c[0]) + "</sup></button>";
  }).join("");
  chips.addEventListener("click", function (e) {
    var b = e.target.closest(".chip");
    if (!b) { return; }
    estado.cat = b.getAttribute("data-cat");
    dibujar();
  });

  $("buscar").addEventListener("input", function (e) {
    estado.texto = limpio(e.target.value.trim());
    dibujar();
  });
  $("ordenar").addEventListener("change", function (e) {
    estado.orden = e.target.value;
    dibujar();
  });
  $("limpiar").addEventListener("click", function () {
    estado = { cat: "todos", orden: "destacados", texto: "" };
    $("buscar").value = "";
    $("ordenar").value = "destacados";
    dibujar();
  });

  /* Si llega con ?cat=tes, arranca en esa categoría */
  var pedida = new URLSearchParams(window.location.search).get("cat");
  if (pedida && CATEGORIAS.some(function (c) { return c[0] === pedida; })) { estado.cat = pedida; }

  function ordenar(lista) {
    var copia = lista.slice();
    if (estado.orden === "menor") { copia.sort(function (a, b) { return a.precio - b.precio; }); }
    else if (estado.orden === "mayor") { copia.sort(function (a, b) { return b.precio - a.precio; }); }
    else if (estado.orden === "nombre") { copia.sort(function (a, b) { return limpio(a.nombre).localeCompare(limpio(b.nombre), "es"); }); }
    else { copia.sort(function (a, b) { return (b.destacado ? 1 : 0) - (a.destacado ? 1 : 0); }); } /* destacados primero; el resto en el orden original */
    return copia;
  }

  function dibujar() {
    Array.prototype.forEach.call(chips.children, function (b) {
      b.setAttribute("aria-pressed", String(b.getAttribute("data-cat") === estado.cat));
    });

    var lista = P.productos.filter(function (p) {
      var okCat = estado.cat === "todos" || p.cat === estado.cat;
      var okTexto = !estado.texto || limpio(p.nombre + " " + p.categoria + " " + p.desc).indexOf(estado.texto) !== -1;
      return okCat && okTexto;
    });
    lista = ordenar(lista);

    $("grilla").innerHTML = lista.map(window.Tarjetas.html).join("");
    window.Tarjetas.enlazar($("grilla"));

    $("cuenta").textContent = lista.length === 1 ? "1 producto" : lista.length + " productos";
    $("sin-resultados").hidden = lista.length > 0;
    $("grilla").hidden = lista.length === 0;

    /* Los destacados se ven solo cuando no se filtró nada */
    $("destacados").hidden = estado.cat !== "todos" || !!estado.texto;
    $("limpiar").hidden = estado.cat === "todos" && !estado.texto && estado.orden === "destacados";
  }

  dibujar();
})();
