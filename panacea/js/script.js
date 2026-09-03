(function () {
  "use strict";

  var NUMERO_WHATSAPP = "59898611582";
  var CLAVE_STORAGE = "panacea-carrito";

  /* ---------- Alto real del nav (para que el hero de pantalla completa
     se ajuste exacto a cada dispositivo, sin valores fijos adivinados) ---------- */
  var navEl = document.querySelector(".nav");
  function medirAltoNav() {
    if (navEl) {
      document.documentElement.style.setProperty("--nav-h", navEl.offsetHeight + "px");
    }
  }
  medirAltoNav();
  window.addEventListener("resize", medirAltoNav);
  window.addEventListener("orientationchange", medirAltoNav);
  if (window.visualViewport) {
    window.visualViewport.addEventListener("resize", medirAltoNav);
  }
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(medirAltoNav);
  }

  /* ---------- Menú móvil ---------- */
  var btnMenu = document.getElementById("btn-menu");
  var menu = document.getElementById("menu-movil");

  btnMenu.addEventListener("click", function () {
    var abierto = btnMenu.getAttribute("aria-expanded") === "true";
    btnMenu.setAttribute("aria-expanded", String(!abierto));
    menu.hidden = abierto;
  });

  menu.addEventListener("click", function (e) {
    if (e.target.tagName === "A") {
      menu.hidden = true;
      btnMenu.setAttribute("aria-expanded", "false");
    }
  });

  /* ---------- Carrito (lista para WhatsApp) ---------- */
  var carritoEl = document.getElementById("carrito");
  var toggleEl = document.getElementById("carrito-toggle");
  var panelEl = document.getElementById("carrito-panel");
  var listaEl = document.getElementById("carrito-lista");
  var cantidadEl = document.getElementById("carrito-cantidad");
  var btnComprar = document.getElementById("btn-comprar");

  var items = cargarCarrito();

  function cargarCarrito() {
    try {
      var guardado = window.localStorage.getItem(CLAVE_STORAGE);
      return guardado ? JSON.parse(guardado) : [];
    } catch (err) {
      return [];
    }
  }

  function guardarCarrito() {
    try {
      window.localStorage.setItem(CLAVE_STORAGE, JSON.stringify(items));
    } catch (err) {
      /* almacenamiento no disponible: el carrito sigue funcionando en memoria */
    }
  }

  function sincronizarBotones() {
    document.querySelectorAll(".btn-agregar").forEach(function (btn) {
      var tarjeta = btn.closest(".tarjeta");
      var id = tarjeta.dataset.id;
      var enCarrito = items.some(function (item) { return item.id === id; });
      btn.textContent = enCarrito ? "Agregado ✓" : "Agregar";
      btn.classList.toggle("activo", enCarrito);
    });
  }

  function renderizarCarrito() {
    cantidadEl.textContent = String(items.length);
    carritoEl.hidden = items.length === 0;

    listaEl.innerHTML = "";
    items.forEach(function (item) {
      var li = document.createElement("li");
      li.className = "carrito__item";

      var texto = document.createElement("span");
      texto.textContent = item.nombre + " — $" + item.precio;

      var quitar = document.createElement("button");
      quitar.type = "button";
      quitar.className = "carrito__quitar";
      quitar.setAttribute("aria-label", "Quitar " + item.nombre);
      quitar.textContent = "×";
      quitar.addEventListener("click", function () {
        quitarDelCarrito(item.id);
      });

      li.appendChild(texto);
      li.appendChild(quitar);
      listaEl.appendChild(li);
    });

    sincronizarBotones();
  }

  function agregarAlCarrito(id, nombre, precio) {
    items.push({ id: id, nombre: nombre, precio: precio });
    guardarCarrito();
    renderizarCarrito();
  }

  function quitarDelCarrito(id) {
    items = items.filter(function (item) { return item.id !== id; });
    guardarCarrito();
    renderizarCarrito();
    if (items.length === 0) {
      cerrarPanel();
    }
  }

  function abrirPanel() {
    panelEl.hidden = false;
    toggleEl.setAttribute("aria-expanded", "true");
    carritoEl.setAttribute("data-abierto", "true");
  }

  function cerrarPanel() {
    panelEl.hidden = true;
    toggleEl.setAttribute("aria-expanded", "false");
    carritoEl.setAttribute("data-abierto", "false");
  }

  toggleEl.addEventListener("click", function () {
    if (panelEl.hidden) { abrirPanel(); } else { cerrarPanel(); }
  });

  document.querySelectorAll(".btn-agregar").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var tarjeta = btn.closest(".tarjeta");
      var id = tarjeta.dataset.id;
      var enCarrito = items.some(function (item) { return item.id === id; });

      if (enCarrito) {
        quitarDelCarrito(id);
      } else {
        agregarAlCarrito(id, tarjeta.dataset.nombre, tarjeta.dataset.precio);
      }
    });
  });

  btnComprar.addEventListener("click", function () {
    if (items.length === 0) { return; }
    var nombres = items.map(function (item) { return item.nombre; }).join(", ");
    var mensaje = "Hola Paola, quiero comprar los productos " + nombres;
    var url = "https://wa.me/" + NUMERO_WHATSAPP + "?text=" + encodeURIComponent(mensaje);
    window.open(url, "_blank", "noopener");
  });

  renderizarCarrito();
})();
