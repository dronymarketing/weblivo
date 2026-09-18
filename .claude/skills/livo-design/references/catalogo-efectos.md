# Catálogo de efectos — referencias medidas

Medido en vivo sobre tres sitios ajenos en **septiembre de 2026**. Son sitios
en producción: si cambian, estos números envejecen. Volvé a medir antes de
citarlos como dato. Son **técnicas y parámetros**, no
código copiado.

**Las tres fuentes.** Acá las siglas nombran el **sitio de donde salió cada
efecto**, nada más. RE y FU coinciden con dos estéticas porque son los mismos
sitios; HB no tiene estética asociada (de hba.com sacamos movimiento, no
identidad).

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

La forma rápida de pedirlo. La estética la pone Livo (L, M, N, FM, FU, RE o de cero);
el movimiento sale de uno de estos paquetes.

Se pide así: **"estética M con las animaciones de HBA"**.

**Los paquetes se nombran por el sitio, no por sigla.** Las siglas de dos letras
(FM, FU, RE) son SIEMPRE estéticas. Si Santi dice "RE" sin más, es la estética.

El paquete define **cómo se mueve**, nunca cómo se ve. No toca color,
tipografía ni composición.

---

## Paquete «Realevate» — animaciones de realevate.agency

**Incluye:** A (preloader con marco) + G (texto por palabras) + I (marquee con
foto encima) + J (color por categoría) + su hero que crece + transiciones
entre páginas.

**Curva propia:** `cubic-bezier(.7, .6, 0, 1)`, no la nuestra. Arranca más
rápido y frena más seco: se siente decidido, no suave. Duración 0.8s.

**Cómo se siente:** cinematográfico y editorial. La web se presenta antes de
mostrarse, el titular se arma solo, y cada categoría tiñe la página entera.

**Va bien con:** inmobiliaria, lujo, marcas que venden algo caro y de decisión
lenta. Estética L o RE. **Con N no** — ver "Lo que no va" más abajo.

**Cuesta:** el preloader agrega espera antes de ver nada. En una landing donde
la gente llega de un anuncio buscando el teléfono, ese segundo y medio te puede
costar la consulta. Y es el paquete que más depende del JavaScript.

**No usar en:** catálogos, negocios de barrio, nada donde la acción principal
sea escribir por WhatsApp rápido.

---

## Paquete «Fundar» — animaciones de fundar.com.co

**Incluye:** B (reveal por clase al entrar) + secuencia de entrada del hero +
microtransiciones de 0.3s.

**Cómo se siente:** discreto y prolijo. El movimiento acompaña, no protagoniza.

**Va bien con:** todo. Es el paquete por defecto y el que corresponde en la
mayoría de los casos. Estética L, M o N, cualquiera.

**Cuesta:** casi nada. **Los reveals no necesitan GSAP** — son
`IntersectionObserver` más CSS. (Fundar igual carga GSAP para la secuencia del
hero, pero el paquete se puede implementar sin él.) Es el más liviano de los
tres y el que menos se rompe.

**Si Santi no sabe cuál elegir, este.**

---

## Paquete «HBA» — animaciones de hba.com

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

**Esta tabla es la única. `esteticas-livo.md` no repite otra.**

| Estética | Paquete | Por qué |
|---|---|---|
| **L** Livo | HBA | portfolio con material para sostener el recorrido |
| **L** Livo | Realevate | alternativa: si el foco es la marca y no la cantidad de trabajos |
| **M** Martina | Fundar | el registro ceremonial pide movimiento lento y simple |
| **N** Nexa | Fundar | en legal, cuanto menos movimiento, más confianza |
| **FM** Fabiana | HBA | ya tiene D, E, F y H puestos; solo falta la C |
| **FU** Fundar | Fundar | la estética y el paquete son del mismo sitio |
| **RE** Realevate | Realevate | ídem |

**Lo que no va:**

- **N con HBA o con Realevate.** Una galería anclada o texto animado letra por
  letra en un estudio jurídico se lee frívolo.
- **FU con Realevate.** La estética de Fundar es optimista y aireada; el
  movimiento de Realevate es solemne y lento. Se pelean.

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
de `scale(1.3)` → `scale(1)` en escritorio, las dos a la vez, `scrub: .5`.

**En móvil el zoom baja a 1.15.** Más que eso y la foto se ve borrosa en
pantalla chica mientras dura el recorrido.

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
**Cerca de:** el carrusel de Panacea (`carrusel--servicios`), que está hecho a
mano sin librería. Y el de propiedades de fabianamartinez, que ya usa Splide

HBA usa **Splide** con `splide--fade`: las imágenes se funden una sobre otra en
vez de deslizarse. Más sobrio que el coverflow 3D y mucho mejor en móvil.

Splide y Swiper hacen lo mismo; Swiper tiene más efectos, Splide es más liviano.

**Es la mejora directa del carrusel hecho a mano.** Panacea lo tiene armado con
JavaScript propio, y fabianamartinez ya pasó a Splide. Cuando aparezca un
carrusel nuevo, va con librería: el de a mano se rompe con el dedo, no maneja
bien el arrastre ni el teclado, y hay que mantenerlo a cada rato.

---

## I · Marquee con foto encima
**Sitio: RE — realevate.agency**
**Cerca de:** nada tuyo

Una palabra gigante que se repite en horizontal y se desplaza sola, con una
foto por encima que tapa parte del texto. La palabra se lee entrecortada y eso
es justamente el efecto: obliga a completar mentalmente.

En Realevate la palabra va a `16vw`, que con su multiplicador móvil de 2.25
queda en ~135px a 375px de ancho. La foto encima ocupa cerca de un cuarto del
ancho de pantalla.

Un solo marquee por sitio, y siempre en el hero. Repetido pierde toda la gracia.

**Excepción declarada al checklist:** el marquee necesita `overflow: hidden` en
su contenedor, que el estándar prohíbe en el hero. La forma correcta: el
`overflow: hidden` va en el contenedor del marquee, **nunca en la sección hero**.
Así no hay scroll horizontal y el hero sigue pudiendo crecer.

---

## J · Color por categoría de producto
**Sitio: RE — realevate.agency**
**Cerca de:** es la F, pero por categoría en vez de por sección

Variante superior de la F. En vez de que el color lo defina la posición en la
página, lo define **el tipo de producto**. Cada categoría tiene su color y su
tono apagado, declarados como variables:

```css
--category-by-the-sea-color:   #222A4C;  --category-by-the-sea-muted:   #5D668D;
--category-evergreen-color:    #36614D;  --category-evergreen-muted:    #80988E;
--category-rare-gems-color:    #1C181D;  --category-rare-gems-muted:    #5C585D;
--category-urban-living-color: #2D1C2D;  --category-urban-living-muted: #6B5A6B;
```

Cuando el visitante entra a una categoría, la página entera se tiñe.

**Para qué te sirve:** inmobiliaria por zona (Pocitos, Carrasco, Punta),
catálogo por línea de producto, estudio por área de práctica. Cada una con su
color, y el sitio se siente hecho a medida de lo que estás mirando.

**Es el mejor recurso de los tres sitios ajenos.** Mejor que la F.

---

## K · Hero que crece con el scroll — versión Realevate
**Sitio: RE — realevate.agency**
**Cerca de:** es la E, con parámetros distintos

Mismo mecanismo que la galería anclada, pero con números que vale la pena robar:

```css
--category-hero-scroll-end-height: 110svh;   /* recorrido */
--category-hero-scroll-end-hold:     5svh;   /* pausa al final */
--category-hero-scroll-grow-scale:      2;   /* cuánto crece */
--category-hero-scroll-gap:        5.236vw;
```

Escala 2 sobre 110svh, con 5svh de pausa al final antes de soltar. Esa pausa
es el detalle: sin ella el efecto termina de golpe y se siente cortado.

Mucho más corto que las 8 secciones ancladas de HBA. Para móvil, mejor.

---

## Lo que NO copiarles

**Fundar y HBA usan Lenis** (scroll virtual); Realevate usa una barra de scroll
propia. Los tres reemplazan el scroll del navegador de alguna forma.
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
- Display en **peso contenido** y tamaños grandes: nunca bold.
  HBA usa 300, Fundar 500, Realevate 300. El tamaño hace la jerarquía,
  no el grosor.
- Microtransiciones de 0.3s. Nada de 800ms para un hover.

---

## Ficha técnica de cada sitio

**RE · realevate.agency** — GSAP + ScrollTrigger + SplitText, alojados en su
propio dominio (no CDN). Navy `#1F2B5E`, muted `#626C95`, blanco. Roslindale
Display 300 + Google Sans 500 + Monument Extended. Tipografía **toda en vw**
con multiplicador 1 / 1.54 / 2.25 por dispositivo. Grilla de 12 columnas
declarada. Curva `cubic-bezier(.7, .6, 0, 1)`. Fotos en avif.
*Cargó recién al tercer intento: es un SPA y si el JS falla, no hay web.*

**FU · fundar.com.co** — WordPress con tema propio, no Elementor.
GSAP + ScrollTrigger + Lenis + Tailwind. Neue Montreal (display, 76px, peso 500)
+ Urbanist (cuerpo, 20.5px / 1.55). Crema `#F4F4F1`, verde oscuro `#0E2417`,
lima `#ECF5AE`, verde `#16351F`.

**HB · hba.com** — WordPress + jQuery + GSAP + ScrollTrigger + Lenis + Splide
+ Plyr. Beausite Slick 300 (display, 45px) + Beausite Classic (cuerpo, 14px /
1.36). 27 ScrollTriggers, 8 con pin. Linen `#F3EEEA`, forest `#091D1E`,
salvia `#B0B6B4`, grafito `#2A2A2A`.
