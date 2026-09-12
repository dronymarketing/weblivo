# Construcción — especificaciones técnicas

Abrí este archivo cuando vayas a construir. No antes.

---

## Arquitectura de archivos

El móvil y el escritorio se trabajan **por separado**. Nunca mezclados con
media queries salteadas por todo el archivo.

```
proyecto/
  index.html
  css/
    tokens.css            variables: medidas y paleta. Compartido.
    tokens-proyecto.css   la paleta de ESTE proyecto. Pisa a tokens.css.
    base.css              reset, tipografía base, utilidades. Compartido.
    movil.css             TODO el diseño móvil
    escritorio.css        SOLO lo que cambia de 768px para arriba
  js/
    app.js
  img/
  refs/
```

En el `<head>`:

```html
<link rel="stylesheet" href="css/tokens.css">
<link rel="stylesheet" href="css/tokens-proyecto.css">
<link rel="stylesheet" href="css/base.css">
<link rel="stylesheet" href="css/movil.css">
<link rel="stylesheet" href="css/escritorio.css" media="(min-width: 768px)">
```

**Reglas**

- `movil.css` no lleva **ni una** media query. Si lo abrís solo, es la web
  en el celular. Nada más.
- `escritorio.css` se carga por el atributo `media` del link. Adentro no hace
  falta envolver nada.
- `escritorio.css` solo escribe lo que **cambia**. Si un valor sirve igual en
  los dos, va en `movil.css` y no se repite.
- Colores, medidas y tipografías **siempre** desde tokens, nunca escritos a
  mano dentro de una regla.
- Si una sección se ve muy distinta en escritorio, se puede reescribir entera
  en `escritorio.css`. Está permitido: es el punto de separarlos.

**El HTML es uno solo.** Dos archivos HTML significa mantener los textos
duplicados, y el día que la clienta cambia un precio hay que acordarse de los
dos lados. Cuando la estructura difiere de verdad — el nav es el caso típico —
va el marcado de los dos en el mismo HTML y cada uno se muestra en su ancho.
Marcado duplicado es barato; contenido duplicado no.

**Al trabajar:** si un pedido no aclara para cuál es, preguntá
"¿esto lo cambio en móvil, en escritorio, o en los dos?".
Nunca toques `escritorio.css` si el pedido era de móvil.

---

## Hero a pantalla completa

En todas las webs. La primera pantalla ocupa el alto completo y no se ve nada
más. Abajo, una señal invita a bajar.

```css
.hero {
  min-height: calc(100vh - var(--nav-alto));   /* respaldo */
  min-height: calc(100svh - var(--nav-alto));  /* el que manda */
  display: flex;
  flex-direction: column;
  justify-content: center;
}
```

En el `<head>`:

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
```

**Por qué `svh` y no los otros**

- `100vh` — el alto como si las barras del navegador estuvieran ocultas.
  Mide de más: el hero se corta abajo y el scroll cue cae bajo el pliegue.
- `100dvh` — se recalcula **en vivo** mientras la barra aparece y desaparece.
  El hero se redimensiona mientras el usuario scrollea. Ese es el salto.
- `100svh` — el alto con las barras visibles. Nunca se corta, nunca salta.
  Queda un poco de aire cuando las barras se ocultan y ese es todo el costo.

**Reglas**

- `min-height`, **nunca** `height`. Si el contenido no entra en un teléfono
  chico, el hero crece. Preferimos que asome un poco la sección siguiente
  antes que cortar un botón o un título.
- Nada de `overflow: hidden` en el hero. Recorta sin avisar y en un teléfono
  chico se come el CTA.
- Nada de JS para medir el alto. `svh` ya da el alto seguro.
- `--nav-alto` sale de tokens. Si el nav no es fijo, es 0.
- Si el contenido no entra, el problema es el contenido: menos texto, menos
  botones, o el hero se diseña más compacto.
- Si asoma la sección siguiente, que lo primero que asome sea **padding**.
  20px de color de fondo se lee como intencional; media tarjeta se lee como error.

**Única excepción con JS:** si el nav cambia de alto al cargar la tipografía,
medir una vez con `document.fonts.ready`. Y si hay que escuchar `resize`,
remedir **únicamente** cuando cambió `window.innerWidth` — el resize que
dispara la barra del navegador al ocultarse no cambia el ancho, y remedir ahí
es exactamente lo que produce el salto.

### Scroll cue

- Abajo del todo, centrado, a unos 32px del borde inferior.
- Una palabra corta en mayúsculas con tracking amplio ("EXPLORÁ", "BAJÁ") y/o
  una flecha fina. Nunca un ícono pesado.
- Animación en bucle: `translateY` de 0 a 8px y vuelta, 2s, `ease-in-out`,
  infinite. Casi imperceptible. Nada de rebotes.
- Es un `<a href="#siguiente">` de verdad, no un div decorativo: se puede
  tocar, funciona sin JS y es accesible.
- La sección siguiente lleva `id="siguiente"`.
- Con `prefers-reduced-motion`, la animación se apaga pero el cue sigue visible.
- **El cue va también en móvil.** No se esconde.

### Sección a pantalla completa que no es el hero

Se pide así: *"esta sección a pantalla completa, como en fabianamartinez"*.

Validado en dispositivo real (Android/Chrome) sobre el proyecto Fabiana
Martínez. Es la receta a usar siempre que una sección deba ocupar la
pantalla completa **y no sea la primera de la página**: por ejemplo un
"Quiénes somos" que va después de un hero pinneado (efecto D).

```css
.seccion--completa{
  min-height:100vh;
  min-height:100svh;
  min-height:var(--vh100, 100svh);
  min-height:calc(100vh - var(--nav-alto));
  min-height:calc(100svh - var(--nav-alto));
  min-height:calc(var(--vh100, 100svh) - var(--nav-alto));
  display:flex; align-items:center;
}
```

A diferencia del hero (que arranca en `scrollY:0` y no resta nada), esta
sección sí resta `--nav-alto`: el nav ya está sólido cuando se llega acá, y
el contenido tiene que caber entre el nav y el borde de pantalla, no debajo
del nav.

**Cómo se llegó acá — dos formas de estar "seguro" que no alcanzan por sí
solas, para no repetir el ciclo:**
1. Restar `--nav-alto + Npx` pensando en compensar el `scroll-margin-top`
   de `[id]{...}` (el mismo que usan los links ancla) → sección demasiado
   corta, la sección de después asomaba antes de tiempo. El
   `scroll-margin-top` es un tema aparte, de cuándo se entra por link
   ancla — no tiene que ver con cuánto debe medir la sección para que el
   scroll normal (deslizar el dedo) se sienta bien. Mal.
2. **Restar solo `--nav-alto` (la fórmula de arriba) → confirmado por el
   cliente en su celular real.** Esta es la que vale.
3. **Trampa real, ya pisada una vez:** midiendo con Playwright (headless,
   sin celular real) esta misma fórmula puede parecer "corta" frente al
   spacer del hero, tentando a cambiarla a "sin restar nada, igual que el
   hero" — matemáticamente prolijo en Playwright, pero en un celular real
   NO es lo que se confirmó, y volver a esa variante reintroduce el bug
   original. **La medición de Playwright no reemplaza la confirmación en
   dispositivo real** — es el mismo tipo de bug (barra de direcciones de
   Chrome Android) que ya obliga a usar `visualViewport.resize` en vez de
   solo `resize`, y Playwright headless no lo reproduce fielmente. Si un
   cliente dice "sigue mal" después de este fix, sospechar caché (ver
   más abajo) antes que la fórmula.

Las primeras tres líneas son respaldo (nunca se aplican solas si `--vh100`
carga). `--vh100` es el alto real medido por JS — acá sí hace falta, a
diferencia de lo que dice más arriba la sección del hero: en la práctica,
`100svh` solo no resolvió el bug en Chrome Android real para esta sección,
y `--vh100` sí. Se define en `main.js` y hay que actualizarla con los tres
eventos, no solo los primeros dos — Chrome Android no siempre dispara
`resize` cuando la barra de direcciones se esconde o aparece al scrollear,
pero sí dispara `visualViewport.resize`:

```js
function fijarAltoReal() {
  var alto = window.visualViewport ? window.visualViewport.height : window.innerHeight;
  document.documentElement.style.setProperty('--vh100', alto + 'px');
}
fijarAltoReal();
window.addEventListener('resize', fijarAltoReal);
window.addEventListener('orientationchange', fijarAltoReal);
if (window.visualViewport) {
  window.visualViewport.addEventListener('resize', fijarAltoReal);
}
```

**Reglas**

- Clase reusable, no repetir la fórmula a mano cada vez: `.seccion--completa`.
- `min-height`, nunca `height` — mismo motivo que en el hero.
- Si esta sección va justo después de un hero con `position:fixed` (efecto D
  del paquete HB), también necesita el z-index más alto que ya pide ese
  efecto para taparlo, o el hero fijo pinta por encima igual.
- No confundir con el hero: si la sección en cuestión es la primera de la
  página, usar la fórmula del hero (sin restar `--nav-alto`) — restarlo ahí
  sí produce un hueco, porque el hero no tiene nada antes que le corra el
  punto de partida. Cualquier otra sección sí resta `--nav-alto`.
- **La más importante, y la más fácil de pisar sin darse cuenta:**
  `min-height` no avisa cuando el contenido no entra — la sección
  simplemente crece más allá de una pantalla, en silencio, y rompe la
  sincronía con el spacer del hero y con cualquier otra sección a pantalla
  completa. Cualquier contenido que se le agregue a esta sección DESPUÉS
  de armarla hay que revisarlo contra el presupuesto de altura en
  pantallas CHICAS (360×640 o menos), no solo en la que se usó para
  probar — en Fabiana Martínez, un bloque de más (un encabezado que se
  había puesto ahí por error, ver `CONTEXTO.md` sección 6) desbordaba el
  `min-height` en pantallas chicas pero no en las más grandes, y el
  síntoma se vivió como "no queda a pantalla completa" — llevó varias
  rondas de tocar CSS y JS antes de encontrar que el problema real era
  contenido de más, no la fórmula.

**Si el cliente dice "sigue igual" con esta fórmula ya pusheada, en este
orden:**
1. Primero descartar caché: pedir que pruebe en una pestaña de incógnito
   (evita el caché de disco entero) y confirmar que `?v=N` subió en el HTML
   que el navegador realmente cargó. En Fabiana Martínez esto fue la causa
   real una vez.
2. Si en incógnito se sigue viendo mal, **no** volver a cambiar la fórmula
   de `.seccion--completa` a "sin restar nada" basándose en una medición
   de Playwright/desktop — esa fue la causa real la otra vez (ver el
   punto 3 de la lista de arriba). Buscar la causa en otro lado: el spacer
   del hero fijo sin `visualViewport.resize` (sección de Hero fijo, más
   arriba), contenido de la sección que no entra en un teléfono chico y
   la estira más allá de `--vh100`, o el umbral de `estadoNav()` en
   `main.js` desalineado con el alto real del hero.

---

## Scroll

**Siempre nativo.** Nunca scroll virtual: Smooth Scrollbar (idiotWu),
Locomotive Scroll, Lenis, GSAP ScrollSmoother, ni implementaciones propias que
bloqueen el body y muevan un div con `transform`.

Rompe `position: sticky`, rompe `scroll-margin-top`, rompe la restauración de
scroll al volver atrás, rompe buscar en la página, y obliga a reconstruir a
mano el momentum en móvil y la navegación por teclado.

El salto de alto en móvil que suelen resolver con eso se resuelve con `svh`.

Para anclas: `scroll-behavior: smooth` en el `html`, y nada más.

---

## Navegación

### Modo

1. **Hamburguesa** (por defecto) — logo + botón. El estándar para clientes.
2. **Horizontal completo** — todos los ítems en línea, también en móvil.
   Da sensación de escritorio en el celular. Inmersivo y poco común: sirve
   para portfolios y marcas de diseño. Es lo que usa livo.com.uy, a propósito.
   Requiere 4 ítems como máximo y textos cortos.
3. **Sin nav** — invitaciones y eventos. Índice al final si hace falta.

### Medidas

Salen de tokens. Resumen:

- Alto móvil: 60px si el header es fijo, 68px si es absoluto.
- Alto escritorio: 76px fijo, 88px absoluto.
- Al achicarse por scroll: 68 → 60 móvil, 88 → 76 escritorio.
- Logo: 28px de alto con header de 60, 32px con header de 68.
- Margen lateral: el mismo que el contenido (24px móvil, 40px escritorio),
  para que el logo alinee con los títulos de abajo.
- Ítems: 11px en mayúsculas, tracking 0.12em.

El 60 no es arbitrario: es 44 del área táctil mínima + 8 de aire arriba y abajo.

### Posición

- **Fijo** (por defecto) — acompaña todo el scroll.
- **Absoluto** — se va con el hero.

**Con header fijo es obligatorio:**

```css
[id] { scroll-margin-top: calc(var(--nav-alto) + 16px); }
```

Sin eso, al tocar un link del menú o el scroll cue, el título de la sección
queda escondido detrás del header. Es el bug más común de los headers fijos.

### Logo

Posición: izquierda (por defecto) · centro · derecha.
Si va centrado, la hamburguesa va a la izquierda y el WhatsApp a la derecha.

### Hamburguesa

- Posición: derecha (por defecto) · izquierda.
- Área táctil 44 × 44px mínimo, aunque el ícono se vea más chico.
- Estilo: tres líneas de 1px (por defecto) · dos líneas · texto "MENÚ".
- El ícono se transforma en X: la línea de arriba rota 45° y baja, la del
  medio se desvanece, la de abajo rota −45° y sube. 300ms. Siempre, sea cual
  sea el modo del panel.

### Cómo se abre el menú — catálogo

Todos a 550ms con `cubic-bezier(.16, 1, .3, 1)` salvo que se indique.
Más corto que las animaciones de scroll: un menú de 800ms se siente lento.

1. **Cortina desde arriba** (por defecto) — `translateY(-100%)` → 0.
   Sobrio y prolijo. Va con casi todo.
2. **Panel desde la derecha** — `translateX(100%)` → 0, ocupa 82–88% del ancho,
   con velo oscuro sobre el resto. El más familiar. Bueno con muchos ítems.
3. **Panel desde la izquierda** — igual, solo si la hamburguesa está a la
   izquierda: que el panel entre del lado del botón.
4. **Círculo que se expande** — `clip-path: circle(0% at 92% 34px)` →
   `circle(150% at 92% 34px)`, 650ms. El más llamativo. Tech, innovación, moda.
5. **Fundido a pantalla completa** — `opacity` 0 → 1 con `scale(1.04)` → 1,
   450ms. El más discreto. Ceremonial y minimalista.
6. **Hoja desde abajo** — `translateY(100%)` → 0. Se siente app nativa y el
   pulgar llega cómodo. Gastronomía, salud, catálogos.
7. **Cortina partida** — dos mitades que se cierran hasta encontrarse.
   Dramático. Solo editorial o moda, y con pocos ítems.

**Sugerencia por registro:** cortina desde arriba en legal, institucional y
rural · círculo en tech y moda · fundido en ceremonial y minimalista · hoja
desde abajo en gastronomía y salud · panel desde la derecha cuando hay más de
seis ítems, sea cual sea el registro.

### Cómo entran los ítems — en todos los modos

Esto es lo que separa un menú caro de uno común:

- Los ítems **no** aparecen con el panel. Entran después, escalonados.
- Cada uno: `opacity` 0 + `translateY(12px)` → 0, 400ms, misma curva.
- Escalonado de 60ms, arrancando 180ms después de que abre el panel.
- **Al cerrar no se escalonan:** se van todos juntos con el panel, 350ms.
  Cerrar tiene que sentirse más rápido que abrir.

### Botón de WhatsApp

- ¿Va? Preguntar siempre.
- Posición: en el header junto a la hamburguesa (por defecto) · flotante abajo
  a la derecha · las dos.
- Forma: sigue la regla de botones del rubro. Círculo solo si es ícono sin texto.
- Tamaño: 44 × 44px si es solo ícono; alto 40px si lleva texto en el header.
- Si el negocio atiende por WhatsApp, el botón **no** se esconde adentro del
  menú. Es la acción principal y va visible.

### Comportamiento

- El header arranca transparente sobre el hero y toma fondo sólido después de
  80px de scroll, 300ms. *(PENDIENTE: confirmar con Santi.)*
- Nunca esconder el header al bajar y mostrarlo al subir.
- Los links son `<a>` con `href` real: si el JS falla, el menú no abre pero la
  navegación sigue desde el pie.
- Con el menú abierto: el foco entra al panel, `Escape` cierra, el body no
  scrollea por detrás, y al cerrar el foco vuelve a la hamburguesa.

### Chequeo según modo

- Hamburguesa: que el logo y el botón no se toquen ni se corten.
- Horizontal: que los ítems entren en una línea a 375px sin partirse.
  Si se parten, se acortan los textos o se pasa a hamburguesa.
- Sin nav: que haya alguna forma de llegar al contacto.

---

## Arquitectura de navegación

### Una sola página con anclas

- Cada sección lleva `id`, el nav apunta con `href="#id"`.
- `scroll-behavior: smooth` en el `html`.
- `scroll-margin-top` en cada sección con `id` (ver arriba).
- El menú se cierra **antes** de que arranque el scroll. Si no, el visitante
  ve el scroll a través del panel abierto.
- El ítem activo se marca solo con `IntersectionObserver`,
  `rootMargin: '-40% 0px -55% 0px'`, para que cambie cuando la sección está
  realmente al medio, no al asomar.

### Páginas separadas

- El header y el footer se repiten en cada archivo. **Es duplicación real:**
  si se agrega un ítem al nav hay que tocarlo en todos.
  Dejalos entre comentarios claros:
  `<!-- ===== HEADER — si cambia, cambiar en todas las páginas ===== -->`
  Y al terminar un cambio de nav, revisá archivo por archivo.
- El ítem de la página actual lleva la clase de activo, escrita a mano en cada
  archivo. No se detecta solo.
- Cada página necesita su propio `<title>` y su `meta description`.
  Nunca copiar el del inicio.
- Links relativos (`contacto.html`), nunca absolutos: el borrador se abre con
  doble clic desde el disco.
- El botón de volver al inicio es el logo del header. Siempre.

### Híbrido

- El inicio lleva un adelanto por sección, con `id` propio, y cada adelanto
  termina en un botón hacia su página completa.
- Los adelantos muestran 3 ítems como máximo. No son la página, son la vidriera.
- A dónde apunta el nav se pregunta: a las páginas (por defecto), a los
  adelantos, o mixto. En el mixto, los ítems que son ancla se marcan distinto
  en el menú para que se note que no cambian de página.

---

## Firma Livo — especificaciones

### Rebordes finos

- Siempre 1px. Nunca 2.
- Color `currentColor` a 12–18% de opacidad, no un gris fijo: así se adapta
  al fondo de cada sección.
- El reborde reemplaza a la sombra. Si hay reborde, no va `box-shadow`.
- El radio sigue la regla de botones: cápsula o recto según rubro.

### Animaciones al scroll

- `IntersectionObserver`, `threshold: 0.15`, una sola vez por elemento.
- Estado inicial: `opacity: 0` + `translateY(16px)`.
- Transición 800ms con `cubic-bezier(.16, 1, .3, 1)`. Nada de `ease-in-out`:
  el remate lento es lo que las hace suaves.
- Escalonado de 90ms entre hermanos. Más que eso se siente lento.
- Un solo eje por vez. Nada de `scale` ni `rotate`.

**Dos respaldos obligatorios:**

- `prefers-reduced-motion: reduce` → sin transform, contenido visible.
- El `opacity: 0` inicial se aplica **solo desde JS**, agregando una clase al
  `<html>` al cargar. Nunca en el CSS base. Si el JS no corre, no hay clase y
  el contenido se ve igual.

### Glassmorphism — condicional

Habilitado en: tech e innovación · minimalista · moda y belleza · salud y
bienestar · inmobiliaria (solo sobre foto).
No va en: legal · constructor · rural · editorial · artesanal · gastronomía.

Cuando el registro lo habilita, **preguntá** si lo quiere en ese proyecto.
Nunca lo pongas por tu cuenta.

Si va:

```css
backdrop-filter: blur(16px) saturate(140%);
background: /* el color de la sección a 8–14% de opacidad */;
border: 1px solid rgba(255, 255, 255, .18);
```

- No blanco puro por defecto: tomá el color base de la sección y bajale la
  opacidad.
- El borde es lo que lo hace leer como vidrio. Sin borde parece error de render.
- **Solo sobre foto, gradiente o textura.** Sobre color plano no hay nada que
  desenfocar y queda sucio: ahí va panel sólido.
- Respaldo obligatorio:
  `@supports not (backdrop-filter: blur(1px)) { /* fondo sólido opaco */ }`

---

## Íconos

Nunca dibujar SVG a mano ni inventar paths.

- **Interfaz:** Lucide — https://lucide.dev — ISC, 1600+ íconos, de trazo.
- **Marcas y redes:** Simple Icons — https://simpleicons.org — CC0, 3400+
  logos oficiales. CDN para copiar el SVG: `https://cdn.simpleicons.org/[marca]`

Nunca mezclar sets en una misma web: los grosores y las esquinas no coinciden
y se nota. Lucide para todo, Simple Icons **solo** para logos de marcas.

### Arquitectura obligatoria

Todos los íconos en un **sprite inline** al principio del `<body>`, definidos
una vez como `<symbol>` y usados con `<use>`:

```html
<svg width="0" height="0" style="position:absolute" aria-hidden="true">
  <symbol id="i-whatsapp" viewBox="0 0 24 24"><path d="…"/></symbol>
</svg>

<svg class="icon-brand"><use href="#i-whatsapp"/></svg>
```

Nunca pegar el mismo SVG completo en varios lugares: cambiar un ícono después
obliga a editarlo en todos y siempre queda alguno viejo.

El sprite va **inline, nunca en un `.svg` externo**: los borradores se abren
con doble clic desde el disco y un sprite externo no carga por CORS.

```css
.icon {
  width: 20px; height: 20px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.5;        /* Lucide viene en 2 */
  stroke-linecap: round;
  stroke-linejoin: round;
  flex-shrink: 0;
}

.icon-brand {
  width: 20px; height: 20px;
  fill: currentColor;        /* Simple Icons son de relleno */
  flex-shrink: 0;
}
```

`currentColor` hace que el mismo ícono se vea claro sobre fondo oscuro y
oscuro sobre fondo claro, sin una regla por sección.

- 20px en línea con texto, 24px en botones e ítems de nav.
- Los decorativos llevan `aria-hidden="true"`. Si el ícono **es** el botón,
  el botón lleva `aria-label`.
- Los logos de marca se usan tal cual: no se recolorean fuera de su paleta
  oficial, no se deforman, no se redibujan. Son marcas registradas aunque el
  SVG sea de dominio público.

---

## Barras del sistema

Las barras del teléfono toman el color de la sección que tienen pegada.
Es lo que hace que la web se sienta app y no página dentro de un marco.

- **Barra superior:** `<meta name="theme-color">`, actualizado al scrollear con
  el color de la sección que toca el borde superior.
- **Barra inferior:** no existe meta. Se pinta con una franja fija:

```css
body::after {
  content: '';
  position: fixed;
  left: 0; right: 0; bottom: 0;
  height: env(safe-area-inset-bottom);
  background: var(--barra-inferior);
  z-index: 9999;
  pointer-events: none;
  transition: background .25s;
}
```

Y en JS, el color de cada borde se calcula por separado: el de arriba con la
sección que cruza `y = 0`, el de abajo con la que cruza `y = innerHeight - 1`.

- Requiere `viewport-fit=cover` en el meta viewport.
- La transición se interpola en una zona de 120px antes del límite entre
  secciones: el cambio se siente como degradé, no como salto.
- El listener de scroll con `requestAnimationFrame` y `{ passive: true }`.
- Sin JavaScript, el `theme-color` del HTML queda con el color del hero.

*Nota: de dónde saca Chrome Android exactamente el color de la barra de gestos
no está documentado. Probar en un teléfono real antes de darlo por bueno.*

---

## Tipografía — reglas

- Display serif en peso liviano (300–400), tracking negativo en títulos grandes.
  Repertorio Livo: Catavalo, Marcellus, Cormorant Garamond, Yeseva One.
- Cuerpo en sans neutra (Montserrat, Karla) o serif de lectura si el registro
  es ceremonial.
- Antetítulos y microtextos en mayúsculas con tracking 0.12em o más.
- **Justificado:** permitido solo en registro formal o institucional.
  Si se justifica, es obligatorio `hyphens: auto` y `lang="es-UY"` en el HTML.
  Sin partición, el justificado abre ríos de espacio en columna angosta.
- Convertir las fuentes a `.woff2` y cargar solo los pesos que se usan.
  Catorce archivos `.ttf` se notan en un celular con datos antes que cualquier
  animación.

## Color — reglas

- Una dominante, un fondo, un acento. Nada más.
- Texto sobre foto: siempre con capa de contraste por detrás.
- Los colores extraídos de una foto se ajustan hasta 4.5:1 de contraste,
  manteniendo el matiz.

## Botones — regla de forma

La forma la define el rubro, no el capricho. Confirmado en tres sitios de Livo:

- **Cápsula completa (999px):** diseño, celebración, juvenil, innovador,
  UI trabajada. (livo.com.uy y martinaxv)
- **Recto o radio bajo (0–10px):** legal, institucional, tradicional,
  servicios básicos. (nexalegales.com)

## Efectos por técnica, no por adjetivo

Si el registro pide materialidad, usá esto y no aproximaciones:

- **Borde rasgado:** path SVG irregular con picos y valles de altura y ancho
  variables, `preserveAspectRatio="none"`. Nunca `border-radius` ni festón:
  el festón parece toldo de circo, no papel arrancado.
- **Textura de papel:** filtro SVG `feTurbulence`, `baseFrequency` ~0.8,
  `numOctaves` 4, como capa con `opacity` 0.06–0.12 y `mix-blend-mode: multiply`.
  Se tiene que sentir, no ver.
- **Dorado:** `linear-gradient(135deg, #8a6b2f, #d9b667, #f5e6b8, #b8923f)`
  con `background-clip: text` en títulos y en filetes de 1px.
  Nunca un dorado plano.
- **Envejecido:** viñeta con `radial-gradient` oscureciendo los bordes.
