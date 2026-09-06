# ANANIKIAN — contexto del borrador

Rediseño de **ananikian.com** siguiendo el estándar de trabajo Livo.
La entrevista completa ya está hecha: **no volver a preguntar nada de acá abajo**.
El inicio está construido y verificado. Falta el resto de las páginas.

---

## 1. Decisiones cerradas en la entrevista

| Punto | Decisión |
|---|---|
| Tipo de sitio | Institucional, páginas separadas (arrancó como landing, se corrigió) |
| Rubro | Inmobiliaria — ANANIKIAN Negocios Inmobiliarios, Montevideo, desde 1992 |
| Arquitectura | **Híbrido**: páginas separadas + el inicio muestra un adelanto de cada una |
| Nav apunta a | Las páginas (no a los adelantos) |
| Alcance | Todo el mapa del sitio maquetado. Área Clientes y Favoritos son pantallas de muestra, sin backend |
| Registro visual | Inmobiliaria y arquitectura — foto a sangre, interfaz discreta |
| Tipografía | **Bodoni Moda** (títulos) + **Karla** (cuerpo) |
| Composición | Aireada |
| Movimiento | Sutil (excepción acordada: el carrusel del hero rota solo cada 6 s) |
| Botones | Rectos, radio 6px. El buscador es la excepción: 14px |
| Glassmorphism | Sí, condicionado: nav y menú desplegado **solo mientras estén sobre el hero** |
| Acción principal | Buscar con filtros → "Agendar visita" en la ficha → WhatsApp al pie del menú |
| Fotos | Enlazadas por URL de banco de imágenes. Decisión explícita de Santi: es un borrador ficticio, no hace falta descargarlas ni verificar peso |
| Menú móvil | Hamburguesa arriba. Sin barra inferior |

---

## 2. Paleta

Extraída del SVG oficial del logo, no estimada a ojo.

```css
--azul:     #1C3E93;  /* 9.72:1 sobre blanco — dominante */
--azul-900: #112659;
--azul-800: #163173;
--azul-600: #224CB2;
--rojo:     #EE4034;  /* 3.88:1 — SOLO superficies, nunca texto */
--rojo-txt: #DA3B30;  /* 4.52:1 — texto y links en rojo */
--wa:       #128C7E;  /* teal WhatsApp, elegido por Santi */
--tinta:    #0F1422;
--gris:     #4A5366;
--fondo-alt:#F6F7FA;
```

El verde `#25D366` de WhatsApp **no se usa**: con texto blanco da 1.98:1.
El teal `#128C7E` da 4.14:1 y pasa porque el botón lleva texto de 18px semibold (mínimo 3:1).

---

## 3. Logo

- `img/logo.svg` — original, azul `#1C3E93` + rojo `#EE4034`
- `img/logo-blanco.svg` — negativo blanco, generado reemplazando los `fill`, no rasterizado

El nav intercambia uno por otro según el estado.

---

## 4. Nav — tres estados (así lo pidió Santi)

| Estado | Cuándo | Fondo | Logo | Hamburguesa |
|---|---|---|---|---|
| `.es-tope` | Arriba del todo | Transparente | Blanco | Blanca |
| `.es-glass` | Scrolleando dentro del hero | Glass apenas blanco `rgba(255,255,255,.14)` + blur 16px | Original | Blanca |
| `.es-solido` | Pasado el hero | Blanco puro | Original | Azul |

La hamburguesa blanca lleva `drop-shadow(0 1px 2px rgba(0,0,0,.25))` como resguardo sobre fotos claras.
Con el menú abierto, el nav se retira (`body.menu-abierto`) y el menú muestra su propio logo blanco.

---

## 5. Buscador

Rectángulo horizontal, radio 14px, alineado al ancho del nav, en el cuarto inferior del hero.

**Móvil** — grid de 2 columnas:
```
fila 1:  Operación  |  Tipo
fila 2:  Zona (fila entera, para que nunca se recorte "Punta Carretas")
fila 3:  Más filtros | Buscar
```
**Escritorio** — una sola fila; los filtros secundarios se despliegan debajo.

Los seis campos del sitio viejo que no entran a la vista (moneda, precio mín/máx, dormitorios, baños, N.º de referencia) viven detrás de **"Más filtros"**.

---

## 6. Datos reales — confirmados, no inventar ni cambiar

- **ANANIKIAN Negocios Inmobiliarios**, fundada en 1992 por Wilder Ananikian Bakerdjian
- José Ellauri 453, Montevideo (Punta Carretas)
- +598 94 189402 · +598 2711 7266 · Punta del Este +598 4243 7317
- info@ananikian.com
- Instagram @ananikian_propiedades · Facebook Ananikian-Negocios-Inmobiliarios · Twitter @InmoAnanikian
- Socios de CIU · ANRTCI · Uruguay XXI · AHK
- Proyectos con nombre real: City Homes, Deco Maggiolo, Alzira, Green Concept Carrasco, Icon 26, Montevideo Harbour, Noir Vista, Nostrum Plaza 3, Nostrum Uruguay
- Zonas: Pocitos, Punta Carretas, Carrasco, Centro, Cordón, Malvín

Las propiedades, precios y fotos son **de muestra**. Decisión de Santi (revisada tras ver el sitio publicado): un borrador no debe decirle al cliente "esto es falso" en pantalla — el bloque `.aviso` bajo el hero se sacó de todas las páginas. La aclaración de muestra queda solo en este documento, para uso interno de Livo.

---

## 7. Archivos

```
ananikian/
├── index.html          ← listo y verificado
├── css/
│   ├── fuentes.css     ← Bodoni Moda + Karla en base64 (111 KB)
│   ├── movil.css       ← base 375px, SIN una sola media query
│   └── escritorio.css  ← todo dentro de @media (min-width:900px)
├── js/main.js          ← nav, carrusel, menú, filtros, apariciones
├── fuentes/            ← los .woff2 sueltos, por si se prefieren enlazados
└── img/                ← logo.svg, logo-blanco.svg
```

Las fuentes van **incrustadas en base64** a propósito: así el archivo se ve igual
abierto con doble clic o servido por HTTP, sin depender de Google Fonts.

---

## 8. Innegociables aplicados

- Móvil primero, 375px. `movil.css` no tiene ni una media query
- Scroll nativo. Ninguna librería de scroll
- Hero: `min-height: calc(100vh - var(--nav-alto))` y `calc(100svh - ...)`. Nunca `height`, nunca `dvh`
- Scroll cue presente también en móvil, es un `<a href="#destacadas">` real
- `scroll-margin-top` en toda sección con id
- Íconos Lucide + Simple Icons en sprite inline, con `<symbol viewBox="0 0 24 24">` y `<use>`
- Rebordes de 1px a 14% de opacidad, sin sombras
- Apariciones al scroll: 800ms, `cubic-bezier(.16,1,.3,1)`, escalonado 90ms, un solo eje.
  El `opacity:0` lo aplica el JS: si el JS falla, el contenido se ve igual
- `hyphens: auto` y `lang="es-UY"`
- Sin puntos suspensivos por recorte, sin `line-clamp`

---

## 9. Falta construir

Replicando el nav, el menú, el sprite y el pie del `index.html`:

1. `venta.html` — grilla de propiedades + buscador arriba
2. `alquiler.html` — igual
3. `a-estrenar.html`, `en-construccion.html`, `lanzamiento.html`
4. `nosotros.html` — historia desde 1992, equipo, cámaras
5. `contacto.html` — formulario, mapa, las tres oficinas
6. `propiedad.html` — ficha con galería, datos y el botón **Agendar visita**
7. `area-clientes.html` — pantalla de muestra, sin backend: login + beneficios de la cuenta
8. `favoritos.html` — pantalla de muestra, sin backend: grilla de propiedades guardadas

En las internas el hero es más bajo y el nav puede arrancar directamente en `.es-solido`.

Los íconos de corazón (favoritos) y usuario (área clientes) del nav ya apuntan
a `favoritos.html` y `area-clientes.html`. Ambos formularios se resuelven con
la misma clase genérica `.mock-form` de `js/main.js`: al enviar, esconden el
`<form>` y muestran el `.form-ok` que le sigue en el HTML — no hay backend.

---

## 10. Pendientes y advertencias

- **Las URLs de las fotos no están verificadas.** El entorno donde se construyó no tenía salida a Unsplash. Cada `<img>` lleva `data-fallback` y su contenedor `data-rotulo`: si una no carga, queda un bloque con degradado azul y el nombre de la zona en vez de un hueco roto. Revisar al abrir y reemplazar las que fallen
- **El buscador ocupa del 67% al 87% del alto en móvil**, no exactamente el último cuarto. Con tres filas de campos no da para menos sin recortar texto. Si se quiere que entre justo, hay que sacar un campo de la vista principal
- El buscador no filtra de verdad: el submit lleva a `venta.html`
