# Estéticas base — clonar una web entera

Cuando Santi diga *"quiero la estética de Fabiana"* o *"como Livo"*, **no
inventes nada**: usá los valores de acá tal cual. Todos están **medidos** de
sitios en producción, no aproximados.

Se piden por letra.

| Letra | Estética | De dónde | Para qué sirve |
|---|---|---|---|
| **L** | Livo | livo.com.uy | portfolios, marcas de diseño, estudios creativos |
| **M** | Martina | livo.com.uy/martinaxv | invitaciones, XV, casamientos, eventos |
| **N** | Nexa | nexalegales.com | legal, institucional, servicios profesionales |
| **FM** | Fabiana Martínez | livo.com.uy/fabianamartinez | inmobiliaria, propiedades, lujo cálido |
| **FU** | Fundar | fundar.com.co | salud, bienestar, terapias, ONG |
| **RE** | Realevate | realevate.agency | inmobiliaria internacional, lujo editorial |

**L, M, N y FM son de Santi.** Se clonan enteras sin problema.

**FU y RE son ajenas.** Se usan como **dirección**, no como copia: la lógica de
la paleta, el carácter tipográfico, las decisiones estructurales. Sus
tipografías son comerciales y con licencia paga — abajo va el reemplazo libre
de cada una. Nunca uses el logo, el nombre ni los textos de esos sitios.

Cuando se elige una estética base, **se saltean los pasos 4, 5, 6 y 7**
—color, registro, tipografía y composición—: ya están respondidas.
**Se sigue igual** con el paso 8 (movimiento), el 9 (navegación), el 10
(acción principal) y el 11 (datos reales). La estética no elige el movimiento:
eso se pide aparte, con un paquete del catálogo.

Si Santi pide una variante ("como Fabiana pero en verde"), tomá la estética
completa y cambiá solo eso.

---

# L · Estética Livo
**Fuente: livo.com.uy — su web personal**

Terrosa, cálida, tipografía protagonista. Portfolio de diseño.

### Paleta

```css
--cream: #E5E1E0;   /* fondo claro */
--brown: #513D36;   /* dominante, hero */
--beige: #DBC7B8;   /* acento claro */
--olive: #6B7161;   /* acento frío */
--stone: #AEA596;   /* neutro, contacto y pie */
--dark:  #0F0D0C;   /* texto */
```

Cada sección toma un color distinto, en este orden:
hero marrón → crema → oliva → beige → stone.

### Tipografía

- **Display:** Catavalo, peso 300. h1 40px móvil, h2 32px. Tracking −0.02em.
- **Cuerpo:** Montserrat, peso 300.
- **Micro:** mayúsculas 10–11px, tracking 0.12em a 0.22em.

> **Ojo:** el cuerpo está en **13px**, por debajo del piso de 16px del estándar.
> Preguntá si lo mantiene o lo sube.

### Detalles que la definen

- Título del hero en tres niveles: peso normal, peso 600 en beige, y una línea
  en contorno con `-webkit-text-stroke: 1px rgba(229,225,224,.35)`.
- Nav con vidrio: `rgba(255,255,255,.05)` + `backdrop-filter: blur(20px)`,
  borde inferior de 0.5px.
- **Nav horizontal completo también en móvil**, a propósito. Es su firma.
- Botones cápsula, texto 10–11px mayúsculas con tracking 1.2px.
- Hover de botón: `translateY(-2px)` + sombra ancha y suave.
- Hero con dos gradientes radiales sobre el marrón, uno beige arriba a la
  derecha y otro oliva abajo a la izquierda, muy sutiles.
- Punto verde pulsante de "Disponible para proyectos".
- Rebordes de 0.5px, no de 1px.
- `theme-color` interpolado por sección al scrollear.

### Medidas

Contenedor 1100px · secciones 80px arriba / 40px abajo (asimétrico, a
propósito) · nav 60px móvil, 72px escritorio (el token dice 76) · botones 38–41px.

> **Tres cosas a corregir al clonarla**, porque incumplen el estándar:
> los botones de 38–41px están por debajo del piso táctil de 44px, y los
> rebordes son de 0.5px donde la firma pide 1px. Además L combina reborde
> **y** sombra en el hover, y la firma dice que el reborde reemplaza a la
> sombra. Si clonás L tal cual, reprobás tres puntos del checklist.

---

# M · Estética Martina
**Fuente: livo.com.uy/martinaxv — invitación de XV**

Ceremonial, nocturna, dorada. Todo centrado, mucho aire, ritmo lento.

### Paleta

```css
--navy:      #0A1A3D;
--violeta:   #2D1B4E;
--dorado:    #F0BD5C;
--dorado-cl: #F5D28E;
--velo:      rgba(240,189,92,.06);
```

### Tipografía

- **Display:** Marcellus, peso 400. h2 28.8px, h3 22.4px.
- **Cuerpo:** Cormorant Garamond, 16px, interlineado 1.8.
- **Lo que la define:** el cuerpo lleva `letter-spacing: 0.2em` y va
  **centrado**. Ese tracking amplio en texto corrido es lo que da el aire
  ceremonial. Sin eso la estética se cae.

### Detalles que la definen

- **Sin nav.** Página inmersiva. Índice al pie si hace falta.
- Primera pantalla completa, oscura, frase centrada, "EXPLORÁ" con flecha.
- Columna de lectura muy angosta: 340–420px. Las líneas cortas son parte del
  efecto.
- Botones cápsula de 52px, texto 16.8px.
- Apariciones al scroll, lentas.

> **Corregir al reusarla:** con scroll rápido quedan bloques en `opacity: 0`.
> El estado inicial se aplica **solo desde JS**.

### Medidas

Columna 340–420px · secciones 72/72 · botones 52px.

---

# N · Estética Nexa
**Fuente: nexalegales.com — estudio jurídico**

Sobria, institucional, densa. Contraste alto, cero decoración.

### Paleta

```css
--navy:   #0F193A;
--blanco: #FFFFFF;
```

Dos colores y nada más. Esa austeridad es la estética.

### Tipografía

- **Display:** no pude medir la familia — el sitio la sirve con un nombre
  interno (`encabezado`). Es una sans institucional de peso 500 con tracking
  apenas negativo. Al clonar, usá **Inter** o **Libre Franklin** en 500.
- **Cuerpo:** 16px, interlineado 1.5.
- **Justificado**, decisión del cliente que Santi comparte.

> **Corregir al reusarla:** Nexa tiene `hyphens: manual` y por eso el
> justificado abre ríos en móvil. Va `hyphens: auto` con `lang="es-UY"`.

### Detalles que la definen

- Header de 69px, **absoluto**: se va con el scroll. (El token lo redondea a 68.)
- Logo izquierda, hamburguesa derecha, fondo sólido navy.
- Botones **rectos**, radio 0, alto 53–56px.
- Texto sobre foto con capa oscura y desenfoque.
- Link de "Saltar al contenido" al principio.
- Títulos de sección en mayúsculas, grandes, centrados.

### Medidas

Contenedor 1400px · lectura 500px · header 69px · botones 53–56px.

> **Excede el estándar en dos medidas** y hay que decidirlo a conciencia:
> el contenedor va a 1400 donde el token dice 1200, y la columna de lectura a
> 500 donde el token dice 460 como máximo. En N pesa más porque su texto va
> **justificado**: líneas más largas y justificadas es la peor combinación
> para leer. Al clonar, bajá la lectura a 460.

---

# FM · Estética Fabiana Martínez
**Fuente: livo.com.uy/fabianamartinez — inmobiliaria**

Cálida y señorial. Marrón tabaco, arena, bronce. Foto a sangre.
**Es la más avanzada técnicamente de las cuatro de Livo** y la que mejor
implementa el estándar: ya usa los tokens del sistema.

Trae puestos los efectos **D** (hero fijo), **E** (galería anclada), **F**
(secciones con nombre de tema) y **H** (carrusel con fundido, Splide). Es casi
el paquete «HBA» completo: lo único que le falta es la **C**, el reveal atado
al scroll.

### Paleta — medida de sus variables

```css
--tinta:      #412F26;   /* dominante: hero, secciones oscuras, theme-color */
--arena:      #EDE1D2;   /* claro cálido */
--fondo:      #FFFFFF;
--fondo-alt:  #FAF8F4;   /* crema casi blanco */
--bronce:     #987145;   /* acento */
--mostaza:    #EBC383;   /* acento claro */
--oliva:      #6A6F4C;   /* acento frío */
--oliva-900:  #424530;
--gris-suave: #8C8471;
--wa:         #128C7E;   /* teal oscuro de la paleta oficial de WhatsApp */
```

Tonos del marrón: `#5D2510` · `#7A3216` · `#4C2C1A` · `#412F26`

> **Cuidado al clonar.** El bloque de arriba está con los nombres ya
> corregidos. En el sitio real conviven además `--azul` (que es marrón),
> `--azul-600/800/900`, `--rojo` y `--rojo-txt` (que son bronce y marrón),
> restos de una paleta anterior. Usá los nombres de arriba, no los del sitio.

### Tipografía

- **Display:** `Hello Branch`, peso 400. No pude verificar la clasificación de
  la familia; en pantalla rinde como una serif de contraste alto y remates
  finos. h3 **60px en móvil**, 56px en escritorio. Tracking −0.56px.
  Si hay que reemplazarla por una libre, probá **Bodoni Moda** o
  **Playfair Display** y comprobá visualmente antes de dar por buena la
  sustitución.
- **Cuerpo y UI:** `Neue Haas Grotesk Display Pro`, pesos 300 / 400 / 500.
- Las dos van **embebidas en el CSS como woff2 base64**. Son comerciales.

Escala medida:

| Elemento | Móvil | Escritorio |
|---|---|---|
| Display (h3) | 60px / 51px | 56px / −0.56px |
| | ↑ más grande en móvil que en escritorio, a propósito | |
| h2 | 28px / 30.8px, peso 500 | 40px / −0.4px, peso 500 |
| Cuerpo | 16px / 24.8px (1.55) | 17px |
| Destacado | 20px, peso 500 | 20px, peso 500 |
| Micro mayúsculas | 11px, peso 500, tracking 1.76px | 11px / 1.54px |
| Micro fino | — | 8px, peso 300, tracking 3.04px |
| Nav | 14px | 14px |
| Link grande | 26px, peso 300 | 34px, peso 300, tracking 0.68px, mayúsculas |

### Medidas — mismos valores que el estándar, otros nombres

```css
--contenedor: 1200px;
--lectura:    460px;
--margen:     24px;
--seccion:    72px;
--nav-alto:   60px;
--radio:      6px;      /* tarjetas */
--radio-busc: 14px;     /* buscador */
--dur:        800ms;
--curva:      cubic-bezier(.16, 1, .3, 1);
--borde:      1px solid rgba(65,47,38,.14);
--borde-claro:1px solid rgba(255,255,255,.18);
```

Nav real: 60px móvil con padding lateral 24px, **76px escritorio** con padding
40px. Fijo, transparente arriba (clase `es-tope`), z-index 95.

> **Los valores coinciden con `tokens.css`, los nombres no.** FM usa
> `--contenedor`, `--lectura`, `--margen`, `--seccion`, `--dur`, `--curva`;
> el estándar usa `--max-contenedor`, `--max-lectura`, `--margen-lateral`,
> `--sp-seccion`, `--dur-scroll`, `--ease`. Al clonar, **usá los nombres del
> estándar**: si no, cada proyecto inventa los suyos y se pierde el sistema.
>
> Y su `--borde: 1px solid rgba(65,47,38,.14)` es un color fijo. La firma pide
> `currentColor` a 12–18% de opacidad, para que el reborde se adapte al fondo
> de cada sección. Corregilo al clonar.

### Detalles que la definen

- **Secciones con nombre de tema:** `tema-crema` y `tema-marron`. Es el patrón
  F del catálogo, ya implementado.
- **Hero fijo** (`hero--fijo`) con foto a sangre y velo marrón. El contenido
  pasa por encima.
- **Galería anclada:** 3 secciones con pin (`propiedad-fija__pin`),
  `start: 'top top'`, `end: '+=150%'`, `scrub: 0.3`.
  > Ese `+=150%` está por encima del umbral que el catálogo marca como
  > "se hace eterno con el pulgar" (140%). En móvil bajalo a 90%.
- Botones **cápsula sin excepción** (999px). Altos 38, 48, 52.
  El de WhatsApp es sólido `#128C7E` con texto blanco, 52px.
- **Cero sombras en toda la web.** El reborde reemplaza a la sombra.
- Radios: 999px para botones, 6px para tarjetas. Nada más.
- Fotos **sin border-radius**, a sangre, `object-fit: cover`. Todas jpg.
- Scroll cue: "Ver propiedades" + flecha dentro de un círculo con reborde.
- Botón de búsqueda de 44×44 con `aria-label="Buscar"` al lado de la hamburguesa.
- `viewport-fit=cover`, `theme-color: #412F26`, `lang="es-UY"`.
- Contador animado con `data-target` / `data-prefix` / `data-suffix`.
- Atributos de datos propios: `data-zona`, `data-orden`, `data-bajada`,
  `data-rotulo`, `data-fallback`.

### Librerías

GSAP + ScrollTrigger + Splide, **descargadas a `lib/`**, no por CDN.
Más `js/main.js` y `js/efectos.js`. Cero scripts inline.

### Bloques típicos

Hero con propiedad destacada · quiénes somos · propiedades con filtro por
zona · proyectos · CTA de contacto por WhatsApp.

> **Corregir al reusarla:** hay botones de 38px de alto, por debajo del piso
> táctil de 44. Subilos.

---

# FU · Dirección Fundar
**Fuente: fundar.com.co — centro de salud y bienestar (AJENA)**

Verde profundo con lima eléctrico. Aireada, optimista, muy respirada.

### Paleta — medida

```css
--verde:      #16351F;   /* dominante */
--verde-osc:  #0E2417;   /* franjas */
--lima:       #CDE84A;   /* acento fuerte: botones, destacados */
--lima-pal:   #ECF5AE;   /* fondo de sección */
--lima-txt:   #EEF3CF;   /* texto sobre foto */
--hueso:      #F4F4F1;   /* fondo neutro */
--verde-cl:   #E2E9DA;
--tinta:      #1A1A1A;
--gris:       #6B6F6A;   /* texto secundario */
```

Los fondos de sección alternan: hueso → lima pálido → hueso → foto a sangre.

### Tipografía

- **Display y UI:** Neue Montreal (400 / 500 / 700) — **comercial, paga**.
  Reemplazo libre más cercano: **General Sans** (Fontshare) o
  **Schibsted Grotesk** (Google Fonts).
- **Cuerpo:** Urbanist variable 100–900 — **gratis en Google Fonts**, usala tal cual.
- Tercera familia cargada: Playfair Display (400–900), para acentos editoriales.

Escala medida:

| Elemento | Valor |
|---|---|
| h1 móvil | 40px / 40.8px (1.02), peso 500, Neue Montreal |
| h1 escritorio | 76.8px, peso 500 |
| Cuerpo | Urbanist 17–20.5px, interlineado **1.55–1.6** |
| Micro | Neue Montreal 13px, peso 500 |
| Números grandes | Neue Montreal 48px, peso 700, interlineado 0.7 |

### Medidas

```css
--gutter: clamp(1.25rem, 5vw, 5rem);   /* 20px a 80px */
```

- **Secciones: 120px arriba y abajo, también en móvil.** No lo reducen.
  Es mucho más aire que nuestro estándar de 72px, y es lo que da la sensación
  de calma. Si clonás esta estética, clonás eso.
- Heroes con `min-height: 100svh`.
- Nav fijo: 86px escritorio con padding 20px 64px, 84px móvil con padding 20px.
- Botones cápsula (999px), altos 46 / 54 / 62px, peso 500.
  Lima con texto verde, o verde con texto blanco.

### Detalles que la definen

- El nav contenedor lleva `pointer-events: none` y solo los hijos lo activan:
  así la barra no bloquea clics sobre el hero.
- Hamburguesa de 44×44 con clases `glass pill` — vidrio sobre la foto.
- **Casi sin sombras.** Solo dos, y tintadas del verde de marca, nunca negras:
  `rgba(14,36,23,.3) 0 30px 64px -30px`.
- Radios mezclados: 999px (botones), 16px, 15px, 12px, 6px. Menos disciplinado
  que FM.
- Fotos sin border-radius, `object-fit: cover`, todas jpg.
- Tailwind por debajo. `lang="es-CO"`.

> **Lo que NO copiarle:** no tiene `viewport-fit=cover`, y carga Lenis
> (scroll virtual, prohibido por el estándar).

---

# RE · Dirección Realevate
**Fuente: realevate.agency — inmobiliaria internacional (AJENA)**

Navy sobre blanco. Editorial, tipográfica, casi sin color. La más sofisticada
de las seis en sistema, y la más frágil en ejecución.

### Paleta — medida de sus variables

```css
--brand-navy: #1F2B5E;   /* dominante y texto */
--muted:      #626C95;   /* texto secundario */
--white:      #FFFFFF;   /* fondo */
```

Tres colores para todo el sitio. Y después **un color por categoría de
producto**, cada uno con su tono apagado:

```css
--category-by-the-sea-color:    #222A4C;  muted #5D668D
--category-evergreen-color:     #36614D;  muted #80988E
--category-rare-gems-color:     #1C181D;  muted #5C585D
--category-urban-living-color:  #2D1C2D;  muted #6B5A6B
```

**Eso es el patrón F, pero por categoría en vez de por sección.** Cada tipo de
propiedad tiñe la página cuando entrás. Es el mejor uso del recurso de los tres
sitios ajenos.

### Tipografía

- **Display:** Roslindale Display, peso 300, serif — **comercial, paga**.
  Reemplazo libre: **Playfair Display** o **Bodoni Moda** (Google Fonts).
- **Sans:** Google Sans, peso 500. Reemplazo libre: **Inter** o
  **Plus Jakarta Sans**.
- **Micro:** Monument Extended, mayúsculas con tracking positivo —
  **comercial**. Reemplazo: **Archivo Expanded**.

### El sistema de escala — lo más valioso de este sitio

**Todo en `vw`, nada en px**, con un multiplicador por dispositivo:

```css
--desktop-size-scale: 1;
--tablet-size-scale:  1.54;
--mobile-size-scale:  2.25;

--desktop-h1-size: 16vw;     line-height 1;     letter-spacing -.02em
--desktop-h2-size: 5.2vw;    line-height .94;   letter-spacing -.03em
--desktop-h3-size: 3.646vw;  line-height .92;   letter-spacing -.05em
--desktop-h4-size: 1.5vw;    line-height 1.3;   letter-spacing -.01em
--desktop-h5-size: 1.736vw;
--desktop-h6-size: 1.447vw;
--desktop-text-size: 1.2vw;  line-height 1.35;  letter-spacing -.01em
```

El tracking se cierra a medida que el texto crece: −.01em en cuerpo, −.05em en
h3. Es lo que hace que los títulos grandes se vean compactos y caros.

> **Peligro al clonar la escala.** `--desktop-text-size: 1.2vw` con el
> multiplicador móvil de 2.25 da **2.7vw ≈ 10px a 375px de ancho**. Eso está
> muy por debajo del piso de 16px del estándar y es ilegible en la calle.
> Si adoptás el sistema en vw, poné un piso:
> `font-size: max(16px, calc(var(--text) * var(--scale)))`.
> Lo que vale la pena robar es la **idea** —escala fluida con multiplicador por
> dispositivo, tracking que se cierra al crecer— no los números crudos.

Interlineados por debajo de 1 en los títulos (0.92, 0.94) — las líneas casi se
tocan. Esa es la firma editorial.

### Grilla y medidas

```css
--grid-columns: 12;
--desktop-grid-gap: 2.601vw;
--desktop-grid-padding: 4.5vw;
```

Y posiciones de columna nombradas por bloque: `--cat-row-copy-start: 7`,
`--cat-row-figure-end: 6`. La grilla está declarada, no improvisada.

> **Lo que RE no tiene, y vos sí necesitás.** No declara ancho máximo de
> contenedor ni ancho de lectura: todo escala con la ventana, así que en un
> monitor ancho las líneas se estiran sin tope. Tampoco pude medirle un padding
> de sección fijo, porque sus secciones son heroes anclados de alto variable en
> `svh`, no bloques con padding.
>
> Al clonar RE, completá con los valores del estándar:
> `--max-contenedor: 1200px`, `--max-lectura: 460px`,
> `--sp-seccion: 72px` móvil / 96px escritorio.
> Y el margen lateral: su `4.5vw` da **17px a 375px de ancho**, por debajo de
> nuestros 24px. Usá `--margen-lateral` del estándar.

### Movimiento

```css
--standard-easing: cubic-bezier(.7, .6, 0, 1);
--overlay-duration: .8s;
--category-hero-scroll-end-height: 110svh;
--category-hero-scroll-end-hold:   5svh;
--category-hero-scroll-grow-scale: 2;
--category-hero-scroll-gap: 5.236vw;
```

Su curva `(.7, .6, 0, 1)` arranca más rápido y frena más seco que la nuestra
`(.16, 1, .3, 1)`. Y el "grow" del hero es escala 2 sobre 110svh con 5svh de
pausa al final.

Librerías: GSAP + ScrollTrigger + **SplitText**, alojadas en su propio dominio.

### Detalles que la definen

- Preloader con marcos que se abren: `clip-path: inset(50%)` → `inset(0%)`.
- Marquee: una palabra gigante que se repite en horizontal con una foto
  encima, tapando parte del texto.
- Botones **rectos** (radio 0), 41px, borde de 0.8px navy, texto 17.5px peso
  500 con tracking negativo.
  > Al clonar: subí el alto a 44px como mínimo y el borde a 1px. Sus valores
  > reprueban el checklist propio.
- Fotos en **avif**, logos en svg. Sin border-radius.
- `--underline-offset: -.3em` para los subrayados de link.
- Tiene un `rotate-phone-overlay`: le pide al visitante girar el teléfono.
  **No copies eso** — es hostil.
- Barra de scroll personalizada.
- `lang="en"`.

> **Lo que NO copiarle:** es un SPA que arma todo por JavaScript. En mis dos
> primeros intentos quedó la pantalla en blanco, trabado en su propio
> preloader. Recién al tercero cargó. Si el JS falla, no hay web.
> Nuestro estándar hace lo contrario: HTML real primero.

---

# Cómo combinarlas con el catálogo de efectos

La estética define **cómo se ve**; el catálogo define **cómo se mueve**.
Se piden juntas: *"estética FM con las animaciones de HBA"*.

**Los paquetes de animación se nombran por el sitio** —«Realevate», «Fundar»,
«HBA»— y las siglas de dos letras (FM, FU, RE) son **siempre** estéticas.
Si Santi dice "RE" a secas, es la estética.

**La tabla de qué estética va con qué paquete está en
`catalogo-efectos.md`, en la sección "Combinaciones". Está solo ahí, para que
no haya dos versiones que se contradigan.**
