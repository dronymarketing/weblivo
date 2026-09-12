# Catálogo de efectos — referencias medidas

Medido en vivo sobre tres sitios ajenos. Son **técnicas y parámetros**, no
código copiado.

**Las tres fuentes:**

| Sigla | Sitio | Rubro |
|---|---|---|
| **RE** | realevate.agency | inmobiliaria de lujo |
| **FU** | fundar.com.co | salud y bienestar |
| **HB** | hba.com | estudio de arquitectura e interiorismo |

**Cómo se usa:** cuando el movimiento elegido sea "sutil" o "protagonista",
ofrecé estos por letra. Santi responde con letras: *"quiero C y F"*.

Cada efecto dice de qué sitio salió y a qué web de Livo se parece.

---

# Paquetes de animación por sitio

La forma rápida de pedirlo. La estética la pone Livo (L, M, N o de cero);
el movimiento sale de uno de estos paquetes.

Se pide así: **"estética M con las animaciones de HBA"**.

El paquete define **cómo se mueve**, nunca cómo se ve. No toca color,
tipografía ni composición.

---

## Paquete RE — animaciones de realevate.agency

**Incluye:** A (preloader con marco) + G (texto por palabras) + transiciones
entre páginas.

**Cómo se siente:** cinematográfico y ceremonioso. La web se presenta antes de
mostrarse. El titular se arma solo delante tuyo.

**Va bien con:** inmobiliaria, lujo, marcas que venden algo caro y de decisión
lenta. Estética L o N.

**Cuesta:** el preloader agrega espera antes de ver nada. En una landing donde
la gente llega de un anuncio buscando el teléfono, ese segundo y medio te puede
costar la consulta.

**No usar en:** catálogos, negocios de barrio, nada donde la acción principal
sea escribir por WhatsApp rápido.

---

## Paquete FU — animaciones de fundar.com.co

**Incluye:** B (reveal por clase al entrar) + secuencia de entrada del hero +
microtransiciones de 0.3s.

**Cómo se siente:** discreto y prolijo. El movimiento acompaña, no protagoniza.

**Va bien con:** todo. Es el paquete por defecto y el que corresponde en la
mayoría de los casos. Estética L, M o N, cualquiera.

**Cuesta:** casi nada. No necesita GSAP — es `IntersectionObserver` más CSS.
Es el más liviano de los tres y el que menos se rompe.

**Si Santi no sabe cuál elegir, este.**

---

## Paquete HB — animaciones de hba.com

**Incluye:** C (reveal atado al scroll) + D (hero fijo) + E (galería anclada) +
F (secciones con nombre de color) + H (carrusel con fundido).

**Cómo se siente:** el más rico de los tres. Todo responde al dedo, la página
cambia de temperatura mientras bajás, las fotos se descubren con el scroll.

**Va bien con:** arquitectura, inmobiliaria, portfolios, estudios creativos,
gastronomía. Estética L sobre todo.

**Cuesta:** recorrido de scroll. HBA tiene 8 secciones ancladas y la home mide
19.500px de alto. Eso en el celular es mucho pulgar. Si se usa entero, la web
tiene que tener contenido que lo justifique.

**No usar entero en:** invitaciones ni landings cortas. Ahí sacá solo la F,
que es la que más aporta y no cuesta scroll.

---

## Combinaciones

| Estética | Paquete | Por qué |
|---|---|---|
| **L** Livo | **HB** | portfolio con material para sostener el recorrido |
| **M** Martina | **FU** | el registro ceremonial pide movimiento lento y simple |
| **N** Nexa | **FU** | en legal, cuanto menos movimiento, más confianza |
| **L** Livo | **RE** | si el foco es la marca y no la cantidad de trabajos |

**Lo que no va:** N con HB o con RE. Una galería anclada o texto animado letra
por letra en un estudio jurídico se lee frívolo.

Y si quiere mezclar, se piden letras sueltas: *"estética M con B y F"*.

---

# Los efectos, uno por uno

---

## A · Preloader con marco que se abre
**Sitio: RE — realevate.agency**
**Cerca de:** nada tuyo todavía

Pantalla de marca con un marco que se abre desde el centro y descubre la web.
No es un cuadrado que crece: es una **máscara que se abre**.

```
clip-path: inset(50%)  →  inset(0%)
```

Realevate encadena varios marcos (`__frame`, `__frame--final`) con un contador
de porcentaje. GSAP timeline, no CSS.

Robustez obligatoria: tope duro con `setTimeout`, la cortina solo existe si el
JS la crea, una vez por sesión con `sessionStorage`.

---

## B · Reveal por clase al entrar en pantalla
**Sitio: FU — fundar.com.co**
**Cerca de:** las apariciones de martinaxv

El más barato y el más usado. **No usa GSAP**: es `IntersectionObserver` que
agrega una clase, y el CSS hace el resto.

Fundar lo marca así: clase base `wp-reveal`, y al entrar en pantalla le suman
`is-in`. El escalonado sale de un atributo `data-reveal-delay`.

Transición medida: `0.3s cubic-bezier(.4, 0, .2, 1)`.

**Cuándo elegirlo:** cuando el movimiento tiene que estar pero no ser el tema.
Es lo que corresponde en el 80% de los casos.

---

## C · Reveal atado al scroll (scrub)
**Sitio: HB — hba.com**
**Cerca de:** nada tuyo — es el salto de calidad

Acá sí GSAP ScrollTrigger. La diferencia con B: **avanza y retrocede con el
dedo** en vez de dispararse una vez.

Parámetro medido en HBA para imágenes: `start: 'top 90%'`.

Receta: máscara `clip-path: inset(0 0 100% 0)` → `inset(0)` y la foto saliendo
de `scale(1.15)` → `scale(1)`, las dos a la vez, `scrub: .5`.

En móvil el zoom va en 1.15, no 1.3: más se ve borroso en pantalla chica.

---

## D · Hero fijo con el contenido pasando por encima
**Sitio: HB — hba.com**
**Cerca de:** reemplaza al parallax de tu hero en livo.com.uy

El hero queda `position: fixed` y las secciones siguientes le pasan por arriba.
En HBA el hero es además un slider con fundido (`splide--fade`).

Se siente más caro que el parallax y cuesta menos: no hay cálculo por cuadro,
el hero simplemente no se mueve.

**Ojo:** el contenido que pasa por encima necesita fondo opaco, o se ve el hero
por detrás y queda sucio.

**Ojo 2 — bug real encontrado en Fabiana Martínez, en dispositivo Android
real (no se veía en Playwright/desktop):** la implementación típica de este
efecto agrega un spacer (`position:fixed` en el hero saca espacio del
documento, así que un div invisible reserva ese scroll) medido una sola vez
con JS (`hero.getBoundingClientRect().height`). Si ese spacer solo se
vuelve a medir con `resize`/`orientationchange`, queda desincronizado en
Chrome Android: apenas empezás a scrollear, la barra de direcciones se
esconde (la pantalla real se agranda) disparando `visualViewport.resize`
— casi nunca `resize` — y el hero (si su alto depende de una variable CSS
tipo `--vh100` medida en vivo) crece con la pantalla real, pero el spacer
se queda congelado en el alto viejo, más chico. Resultado: la sección
siguiente empieza a aparecer en el documento antes de tiempo, mientras el
hero todavía se ve parcialmente arriba de la pantalla — se ve como una
sección "que no llena la pantalla completa" aunque la fórmula CSS de esa
sección esté bien.

**Fix:** cualquier medición de alto por JS en este efecto (el spacer,
o cualquier otra) tiene que escuchar `visualViewport.resize` además de
`resize`/`orientationchange` — el mismo trato que ya requiere `--vh100`:

```js
function medir() {
  spacer.style.height = hero.getBoundingClientRect().height + 'px';
}
medir();
window.addEventListener('resize', medir);
window.addEventListener('orientationchange', medir);
if (window.visualViewport) {
  window.visualViewport.addEventListener('resize', medir);
}
```

---

## E · Galería anclada (sticky gallery)
**Sitio: HB — hba.com**
**Cerca de:** es el "Fullscreen Grow" del video de Elementor

La sección se ancla y las imágenes se suceden mientras scrolleás.
HBA tiene **8 secciones con pin** en la home (se ven como `pin-spacer`).

El más caro en recorrido de scroll. En celular bajarlo a 90% de una pantalla;
140% se hace eterno con el pulgar.

---

## F · Secciones con nombre de color y cambio de tema
**Sitio: HB — hba.com**
**Cerca de:** tu script de `theme-color` en livo.com.uy

**El hallazgo más útil de los tres sitios.** HBA le pone a cada sección una
clase con el nombre del color: `linen`, `forest`, `eucalyptus`. Un ScrollTrigger
con `start: 'top 50%'` / `end: 'bottom 50%'` detecta qué sección está al medio
y cambia el tema de toda la página.

Es lo que vos hacés a mano con el `theme-color`, pero ordenado: el color vive en
el nombre de la clase de cada sección, no enterrado en el JavaScript.

Paleta HBA medida: `#F3EEEA` linen · `#091D1E` forest · `#B0B6B4` salvia ·
`#2A2A2A` grafito.

**Adoptalo aunque no adoptes ningún otro.**

---

## G · Animación de texto por palabras o letras
**Sitio: RE — realevate.agency**
**Cerca de:** nada tuyo

Realevate carga **SplitText** de GSAP: parte el titular en líneas, palabras o
letras y las hace entrar escalonadas.

Desde que GSAP es gratis, SplitText también. Antes era plugin pago.

Solo en el titular del hero. En más de un lugar por página, cansa.

---

## H · Carrusel con fundido en vez de deslizamiento
**Sitio: HB — hba.com**
**Cerca de:** el carrusel de productos de Panacea

HBA usa **Splide** con `splide--fade`: las imágenes se funden una sobre otra en
vez de deslizarse. Más sobrio que el coverflow 3D y mucho mejor en móvil.

Splide y Swiper hacen lo mismo; Swiper tiene más efectos, Splide es más liviano.

---

## Lo que NO copiarles

**Los tres usan Lenis** (scroll virtual). Fundar y HBA lo cargan.
Nosotros no: rompe `position: sticky`, `scroll-margin-top` y la restauración de
scroll al volver atrás. El salto que resuelven con Lenis se resuelve con `svh`.

**Realevate se cuelga.** En mi panel quedó en blanco, trabado en su preloader.
Es el riesgo de esa arquitectura: si el JS no termina, no hay web. Fundar y HBA
cargaron bien — la diferencia es que tienen HTML de verdad detrás y Realevate
arma todo por JavaScript.

---

## Lo que confirman los tres

- `min-height: 100svh` en secciones de pantalla completa. Fundar lo escribe
  textual: `min-h-[100svh]`.
- Un ancho de canaleta como variable (`--gutter` en Fundar), igual que nuestro
  `--margen-lateral`.
- Display en **peso liviano (300)** y tamaños grandes.
  HBA: Beausite Slick 300. Fundar: Neue Montreal 500 a 76px.
- Microtransiciones de 0.3s. Nada de 800ms para un hover.

---

## Ficha técnica de cada sitio

**RE · realevate.agency** — GSAP + ScrollTrigger + SplitText, alojados en su
propio dominio (no CDN). Navy `#1F2B5E`. SPA con transiciones entre páginas.
*No pude verlo andando: se traba en su preloader.*

**FU · fundar.com.co** — WordPress con tema propio, no Elementor.
GSAP + ScrollTrigger + Lenis + Tailwind. Neue Montreal (display, 76px, peso 500)
+ Urbanist (cuerpo, 20.5px / 1.55). Crema `#F4F4F1`, verde oscuro `#0E2417`,
lima `#ECF5AE`, verde `#16351F`.

**HB · hba.com** — WordPress + jQuery + GSAP + ScrollTrigger + Lenis + Splide
+ Plyr. Beausite Slick 300 (display, 45px) + Beausite Classic (cuerpo, 14px /
1.36). 27 ScrollTriggers, 8 con pin. Linen `#F3EEEA`, forest `#091D1E`,
salvia `#B0B6B4`, grafito `#2A2A2A`.
