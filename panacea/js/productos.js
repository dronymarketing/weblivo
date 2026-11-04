/* ============================================================
   PANACEA — datos de los productos (lo usan la home, la página de
   producto, el carrito y el pago). Es la fuente única: para cambiar un
   precio o una descripción se cambia acá y en la tarjeta de index.html.

   Los precios, las fotos y las fichas de los productos con muestra: true
   son de muestra; el sérum tiene precioMuestra: true (su precio es
   provisorio). Todo se reemplaza por el catálogo real.
   ============================================================ */
(function () {
  "use strict";

  var productos = [
    {
      id: "serum-rosas",
      nombre: "Sérum de Rosas y Aloe Vera",
      cat: "piel",
      categoria: "Sérum · 50 ml",
      precio: 780,
      precioMuestra: true,
      muestra: false,
      desc: "Con rosas, aloe vera y vitamina F, en frasco con gotero.",
      fotos: [
        { src: "img/serum-1.jpg", alt: "Frasco de sérum Panacea con gotero sobre fondo claro" },
        { src: "img/serum-2.jpg", alt: "Frasco de sérum Panacea inclinado" },
        { src: "img/serum-3.jpg", alt: "Frasco de sérum Panacea apoyado en diagonal" },
        { src: "img/serum-4.jpg", alt: "Frasco de sérum Panacea acostado" },
        { src: "img/serum-5.jpg", alt: "Frasco de sérum Panacea visto desde arriba" }
      ],
      ficha: [
        ["flask", "Presentación", "Frasco con gotero, 50 ml"],
        ["leaf", "Ingredientes", "Rosas, aloe vera y vitamina F"],
        ["droplet", "Tipo", "Sérum"]
      ]
    },
    {
      id: "crema-calendula",
      nombre: "Crema de Caléndula y Rosa Mosqueta",
      cat: "piel",
      categoria: "Pomadas y cremas",
      precio: 620,
      muestra: true,
      desc: "Pomada artesanal para uso diario en piel.",
      fotos: [{ src: "img/producto-4.jpg", alt: "Crema artesanal de caléndula y rosa mosqueta" }],
      ficha: [
        ["leaf", "Ingredientes", "Caléndula y rosa mosqueta"],
        ["flask", "Tipo", "Pomada artesanal"],
        ["clock", "Uso", "Diario, en piel"]
      ]
    },
    {
      id: "protector-solar",
      nombre: "Protector Solar Natural",
      cat: "piel",
      categoria: "Protector solar",
      precio: 890,
      muestra: true,
      desc: "Fórmula con base de aloe para uso diario.",
      fotos: [{ src: "img/producto-5.jpg", alt: "Protector solar natural con base de aloe" }],
      ficha: [
        ["leaf", "Base", "Aloe"],
        ["sun", "Tipo", "Protector solar"],
        ["clock", "Uso", "Diario"]
      ]
    },
    {
      id: "gel-post-solar",
      nombre: "Gel Post-Solar de Aloe Vera",
      cat: "piel",
      categoria: "Gel post-solar",
      precio: 550,
      muestra: true,
      desc: "Para después de la exposición al sol.",
      fotos: [{ src: "img/producto-6.jpg", alt: "Gel post-solar de aloe vera en frasco spray" }],
      ficha: [
        ["leaf", "Base", "Aloe vera"],
        ["droplet", "Tipo", "Gel en frasco spray"],
        ["sun", "Uso", "Después de la exposición al sol"]
      ]
    },
    {
      id: "te-manzanilla",
      nombre: "Té Relax de Manzanilla y Melisa",
      cat: "tes",
      categoria: "Té orgánico",
      precio: 250,
      muestra: true,
      desc: "Mezcla de manzanilla y melisa para el final del día.",
      fotos: [{ src: "img/producto-1.jpg", alt: "Té orgánico de manzanilla y melisa" }],
      ficha: [
        ["leaf", "Mezcla", "Manzanilla y melisa"],
        ["clock", "Momento", "Final del día"],
        ["package", "Tipo", "Té orgánico"]
      ]
    },
    {
      id: "te-digestivo",
      nombre: "Té Digestivo de Boldo y Menta",
      cat: "tes",
      categoria: "Té orgánico",
      precio: 250,
      muestra: true,
      desc: "Hierbas secas seleccionadas para después de comer.",
      fotos: [{ src: "img/producto-2.jpg", alt: "Té orgánico digestivo de boldo y menta" }],
      ficha: [
        ["leaf", "Mezcla", "Boldo y menta"],
        ["clock", "Momento", "Después de comer"],
        ["package", "Tipo", "Té orgánico, hierbas secas"]
      ]
    },
    {
      id: "tintura-calendula",
      nombre: "Tintura Madre de Caléndula",
      cat: "tinturas",
      categoria: "Tintura madre",
      precio: 480,
      muestra: true,
      desc: "Extracto en base alcohólica, uso según indicación.",
      fotos: [{ src: "img/producto-3.jpg", alt: "Tintura madre de caléndula en frasco ámbar" }],
      ficha: [
        ["leaf", "Planta", "Caléndula"],
        ["flask", "Base", "Alcohólica"],
        ["clock", "Uso", "Según indicación"]
      ]
    }
  ];

  var porId = {};
  productos.forEach(function (p) { porId[p.id] = p; });

  window.PANACEA = {
    whatsapp: "59898611582",
    comercio: "Panacea Productos Herbales",
    productos: productos,
    porId: porId,
    /* "$1.240" — con punto de miles, como se escribe en Uruguay */
    dinero: function (n) { return "$" + Math.round(n).toLocaleString("es-UY"); },
    enlaceProducto: function (id) { return "producto.html?id=" + encodeURIComponent(id); }
  };
})();
