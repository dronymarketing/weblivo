# FABIANA MARTÍNEZ INMOBILIARIA — contexto del borrador

Reciclado de la base de Ananikian (mismo estándar Livo, misma arquitectura:
zonas, tipos de propiedad, proyectos) para una clienta nueva. Rubro: asesora
inmobiliaria individual (no agencia con oficina ni desarrolladora), Montevideo
y Costa de Oro.

---

## 1. Estado actual

Solo `index.html` está construido. Falta el resto de las páginas (venta,
alquiler, nosotros, contacto, propiedad, a-estrenar, en-construccion,
lanzamiento, area-clientes, favoritos). El logo todavía no existe — nav, menú
y pie usan un wordmark de texto en Hello Branch como provisorio.

---

## 2. Datos reales (fuente: Instagram @fabiana.martinez.propiedades)

- Nombre completo: Fabiana Martínez Abin — Asesora Inmobiliaria
- Marca/título del sitio: "Fabiana Martínez Inmobiliaria"
- WhatsApp real: +598 94 236 869
- Email: fabianamartinez@gmail.com (**borrador**, aclarado explícitamente por
  el cliente — no verificar como dato final)
- Zona: Montevideo & Costa de Oro
- Zonas de trabajo reales: Pocitos, Punta Carretas, Carrasco Norte, Nuevo
  París, Cordón, Cerrito de la Victoria
- Perfil urbano (aptos/casas), no rural — esto reemplazó el contenido de
  ejemplo del PDF de branding original (que traía zonas rurales tipo
  "Campo en Minas", ya descartadas)

---

## 3. Paleta

Muestreada a nivel de píxel de un PDF de branding (nunca a ojo). Simplificada
a **dos tonos que alternan por sección** (efecto F del paquete HB) tras
feedback del cliente sobre "falla en la combinación de colores" — el error
original fue usar 4 fondos saturados distintos (crema/terracota/oliva/
terracota) en vez de solo 2.

```css
--azul:       #5D2510;   /* terracota — 12.09:1 sobre blanco. Acento/CTA */
--azul-900:   #412F26;   /* marrón oscuro — 12.66:1 sobre blanco */
--fondo-alt:  #EDE1D2;   /* crema */
--oliva-900:  #424530;   /* paleta secundaria, solo detalles/acentos */
--oliva:      #6A6F4C;
--mostaza:    #EBC383;
--bronce:     #987145;
```

`.tema-crema` y `.tema-marron` son las ÚNICAS clases de tema usadas como
fondo de sección completa. `.tema-terracota`/`.tema-oliva`/etc. existen en
`efectos.css` pero se reservan para acentos chicos (tags, botones), nunca
fondo de sección — eso fue justamente el error a corregir.

Texto de contraste sobre `.tema-marron`: beige claro (`--fondo-alt`), no
blanco — pedido explícito del cliente ("la letra contraste qué sea del
beige clarito qué está en el branding").

---

## 4. Tipografías

- **Hello Branch** (script/serif, peso único 400) — SOLO títulos más
  llamativos: hero, nombre de zona, nombre de proyecto/propiedad. No cubre
  `¡` (falta ese glifo, cae a la fuente de respaldo — evitar en headlines).
- **Neue Haas Grotesk Display Pro** (Light 300 / Roman 400 / Medium 500,
  sin Bold real) — todo el resto: cuerpo, botones, nav, precios, números.
  Nunca usar `font-weight:700` en ningún lado del sitio — sin peso Bold
  real el navegador lo simula (negrita falsa), así que el énfasis fuerte
  usa Medium (500) como techo.

Ambas embebidas en base64 en `css/fuentes.css`.

---

## 5. Paquete de animaciones HB (hba.com)

Efectos C, D, E, F, H — infraestructura en `js/efectos.js` + `css/efectos.css`,
GSAP + ScrollTrigger + Splide descargados a `lib/` (nunca CDN). Reglas
obligatorias del paquete (nunca romperlas): si GSAP no carga, el contenido
queda visible igual; `prefers-reduced-motion` apaga animaciones sin esconder
nada; nunca ScrollSmoother ni Lenis.

- **D (hero fijo) — ES la versión final, `hero--fijo` se usa tal cual en
  el hero de esta página.** Historial de idas y vueltas, para no
  repetirlas: se probó sacar el pin (hero en flujo normal, nav "bajando"
  sobre la foto), combinarlo con un zoom lento, lograr la cortina con un
  clip-path en `#nosotros` en vez de con el pin, y un parallax clásico en
  la foto — el cliente rechazó cada una de esas variantes ("quedó como
  estaba antes, con un zoom que no aporta nada"; "no sé qué hiciste que
  quedó espantoso") y pidió explícitamente volver a como estaba desde el
  principio. **La versión original — `hero--fijo` con `initHeroFijo()`,
  sin zoom, sin parallax, sin cortina aparte — es la que el cliente
  quiere.** No volver a tocar el hero (pin, parallax, cortina, zoom) salvo
  pedido explícito y específico del cliente; si se pide "que la foto no se
  sienta quieta" o similar, preguntar primero qué mecanismo concreto tiene
  en mente antes de implementar una variante nueva — ya se probaron cuatro
  y todas fueron rechazadas.
- **Bug real encontrado en el camino, corregido en las 3 animaciones de
  clip-path del sitio que quedan** (`.reveal-scroll`, galería anclada,
  `.propiedad-fija`): GSAP necesita la MISMA cantidad de valores en el
  `inset()` de arranque y de llegada para interpolar de a poco — con
  `inset(0 0 100% 0)` → `inset(0)` (4 valores vs. 1), no anima en el
  trayecto: salta recién al final del scroll, aunque el `scrollTrigger`
  reporte `progress` avanzando bien. Se corrigió escribiendo los 4 valores
  siempre (`inset(0% 0% 100% 0%)` → `inset(0% 0% 0% 0%)`) en
  `initRevealScroll` (C), `initGaleriaAnclada` (E) y `initPropiedadFija`
  (D+C, Destacadas) — verificado con Playwright que el porcentaje de
  `clip-path` ahora interpola progresivo, no solo el `scrollTrigger.
  progress`. Si se agrega un nuevo reveal con clip-path, escribir siempre
  los 4 valores en ambos extremos.
- **C (reveal atado al scroll)**: clip-path `inset(0% 0% 100% 0%)` →
  `inset(0% 0% 0% 0%)` + `scale(1.15 móvil / 1.3 escritorio)` → `scale(1)`,
  junto.
- **D+C combinado** (`.propiedad-fija`, sección Destacadas): la foto base
  queda `position:sticky` (funciona sin JS), un velo `--azul-900` se tiñe
  de 0 a .82 de opacidad atado al scroll, y 2 fotos más de la misma
  propiedad entran encima con el reveal de C. Al soltarse el sticky, en
  flujo normal, aparecen nombre + precio + botón "Ver propiedad".
- **E (galería anclada)**: infraestructura genérica en efectos.js
  (`initGaleriaAnclada`, pin real + reveal C combinado), sin uso actual en
  esta página — quedó de un intento anterior de Destacadas, disponible para
  reusar en la galería de `propiedad.html` cuando se construya.
- **F (secciones con nombre de color)**: el color vive en el nombre de la
  clase (`.tema-crema`, `.tema-marron`), nunca hardcodeado en JS — solo se
  usa para actualizar el `meta theme-color` del navegador al scrollear.

---

## 6. Bug resuelto: secciones "a pantalla completa" que no son el hero

**Síntoma:** con el hero pinneado (`hero--fijo`, efecto D — el hero mide
exactamente `--vh100` sin restar nada y reserva ese mismo scroll con un
spacer), "Quiénes somos" no se sentía realmente a pantalla completa: antes
de terminar de scrollear esa sección entera, ya empezaba a asomar la
siguiente sección (Destacadas) por abajo. El objetivo pedido por el
cliente: *"Fullscreen en quienes somos, cosa que ni bien se complete la
pantalla, el siguiente scroll ya muestre una propiedad"* — o sea, cero
sobra, cero asomo anticipado, una pantalla exacta de scroll por sección.

**Fórmula confirmada en dispositivo real** — clase `.seccion--completa` en
`movil.css`, la del hero pero restando `--nav-alto` (a diferencia del hero,
esta sección no arranca en `scrollY:0`: el nav ya está sólido cuando se
llega acá, y el contenido tiene que caber entre el nav y el borde de la
pantalla):

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

**Historial de intentos, incluyendo uno propio que retrocedió el fix real —
para no repetirlo:**
1. Restar `--nav-alto + 12px` (pensando en compensar el `scroll-margin-top`
   de los links ancla) → sección demasiado corta, Destacadas asomaba antes
   de tiempo. Mal.
2. Restar solo `--nav-alto` → **la fórmula correcta**, confirmada por el
   cliente en su celular real. Documentada en el skill Livo apenas se
   confirmó.
3. **Error propio, en esta misma sesión:** midiendo con Playwright (que no
   corre en un celular real) pareció que "restar `--nav-alto`" dejaba la
   sección 60-72px corta frente al spacer del hero, así que se cambió a
   "sin restar nada, igual que el hero" — matemáticamente prolijo en
   Playwright, pero el cliente lo siguió viendo mal en su celular. Fue un
   paso atrás: se había pisado el fix real (paso 2) con una "corrección"
   basada solo en medición de escritorio/headless. Se revirtió a restar
   `--nav-alto` (paso 2) después de que el cliente mostrara la captura de
   la sesión original donde esto se resolvió y se documentó en el skill.
   **Lección: en este proyecto, la confirmación del cliente en el celular
   real pesa más que cualquier medición con Playwright** — Playwright no
   reproduce el comportamiento real de la barra de direcciones de Chrome
   Android, que es la causa raíz de fondo en casi todos estos bugs.

`--vh100` (en `js/main.js`) se actualiza con `resize`, `orientationchange` Y
`visualViewport.resize` — este último es el que de verdad dispara cuando
Chrome Android esconde/muestra la barra de direcciones al scrollear (`resize`
solo no alcanza).

**Una hipótesis que se probó y se revirtió — analizando un video del
celular real del cliente frame por frame, en un momento se sospechó del
**spacer del hero fijo** (`initHeroFijo()` en `efectos.js`, el div que
reserva el scroll del hero mientras éste es `position:fixed`): se mide UNA
sola vez con `hero.getBoundingClientRect().height` y solo se vuelve a medir
con `resize`/`orientationchange` — nunca con `visualViewport.resize`, que
es el evento que de verdad dispara Chrome Android cuando la barra de
direcciones se esconde al scrollear. Se agregó ese listener pensando que
sincronizaba el spacer con `--vh100` (que sí escucha ese evento en
`main.js`) y se verificó con Playwright que los tres valores quedaban
sincronizados en cualquier punto del scroll.

**Pero el cliente confirmó que, con ese listener agregado, el efecto de
"Quiénes somos" — que ya estaba resuelto y confirmado ANTES de agregarlo —
dejó de funcionar en su celular real.** Se revirtió: `initHeroFijo()`
volvió a la versión con solo `resize`/`orientationchange` (la que el
cliente había confirmado como correcta originalmente). No se terminó de
entender el mecanismo exacto de por qué agregar una sincronización
"más correcta" empeoró el resultado — la hipótesis es que el bug del
spacer desincronizado y la fórmula de `.seccion--completa` (que resta
`--nav-alto`) se compensaban parcialmente entre sí en la práctica, y
sincronizar una punta sin la otra rompió ese equilibrio. Documentado en el
skill Livo (`catalogo-efectos.md`, Efecto D, "Ojo 2") como un fix que NO
hay que reaplicar sin confirmar antes en un celular real.

**Lección para el futuro:** un razonamiento técnicamente correcto
(sincronizar con `visualViewport.resize`) no garantiza una mejora — en
este proyecto puntual, la confirmación del cliente en su celular real
pesa más que cualquier verificación con Playwright, headless o de
escritorio.

**Lección aparte, no relacionada con CSS:** varias veces el cliente reportó
"sigue igual" después de un fix real porque los `<link>`/`<script>` no tenían
cache-busting. Todo `css/*.css` y `js/*.js` de este proyecto se referencia con
`?v=N` en `index.html` — **subir el número cada vez que se toque un CSS/JS y
se necesite que el cambio se vea sí o sí**, no asumir que alcanza con pushear.

**Repaso post-fix (12/set) — cronología de esta vuelta, para no repetirla:**
1. Se sospechó caché y se probó `scroll-snap` como red de seguridad —
   **descartado**: entra en conflicto con los `ScrollTrigger` de GSAP que
   ya usa la página (el pin de Destacadas), produce saltos de scroll
   impredecibles. Nunca se subió a producción.
2. Se encontró que esta sesión había reemplazado el fix real (restar
   `--nav-alto`) por "sin restar nada", basado en medición con Playwright.
   Se restauró la fórmula de restar `--nav-alto` — el cliente mandó la
   captura de la sesión original donde se confirmó y documentó, señalando
   justamente ese cambio como el error.
3. El cliente igual reportó que seguía sin funcionar. Comparando archivo
   por archivo contra el commit de esa sesión (`f387c4f`), la fórmula de
   `.seccion--completa` ya coincidía exacto — la diferencia real estaba en
   `efectos.js`: el listener de `visualViewport.resize` agregado en el
   spacer del hero (ver más arriba, "una hipótesis que se probó y se
   revirtió"), que no existía en el momento confirmado. Se revirtió
   también ese listener.

El meta `Cache-Control` y el bump de versión agregados en el camino se
mantienen — no está de más, pero no era la causa de este síntoma puntual.

4. El cliente reportó, con la MISMA captura de antes, que seguía sin
   funcionar. En vez de seguir mirando CSS/JS, se comparó el `index.html`
   completo contra `f387c4f` y apareció la causa real: en algún punto de
   esta sesión (probablemente al reordenar Destacadas con foto fija) el
   bloque "Propiedades destacadas" + botón "Ver todas" — que originalmente
   era el encabezado de **`#destacadas`** — había quedado adentro de
   **`#nosotros`**, como un tercer bloque de contenido. `.seccion--completa`
   usa `min-height`, no `height`: si el contenido no entra en una pantalla,
   la sección simplemente crece más allá de una pantalla — y ese bloque de
   más (título + párrafo + botón) es justo lo que la hacía no entrar en
   pantallas chicas. Medido con Playwright en varios tamaños: a 412×844 no
   se notaba (entraba justo), pero a 375×667 y 360×640 el contenido real
   desbordaba el `min-height` por 85-112px — la sección real medía más que
   una pantalla, sin importar qué tan afinada estuviera la fórmula de
   `.seccion--completa` o el spacer del hero. Ese desborde, dependiente del
   tamaño de pantalla, es probablemente lo que el cliente venía viendo
   todo este tiempo en SU celular puntual, mientras cualquier verificación
   con Playwright en un viewport más grande (o en un celular con pantalla
   más alta) no lo mostraba.

   **Fix real:** se devolvió el bloque "Propiedades destacadas" a
   `#destacadas` (su lugar original, como encabezado de esa sección — de
   ahí también tiene más sentido semánticamente: describe Destacadas, no
   Quiénes somos). `#nosotros` volvió a tener solo su contenido original
   (antetítulo + título + texto + botón + cifras). Verificado sin desborde
   hasta 360×640; solo queda un desborde chico (~23px) en 320×568, un
   tamaño de pantalla prácticamente en desuso hoy.

   **Lección para el futuro, la más importante de todo este bloque:**
   cuando una sección usa `.seccion--completa` (pantalla completa exacta),
   **cualquier contenido que se le agregue después hay que revisarlo
   contra el presupuesto de altura en pantallas CHICAS**, no solo en la
   que se usó para probar. `min-height` no avisa que algo no entra: sólo
   hace que la sección crezca en silencio, rompiendo la sincronía con el
   spacer del hero y con cualquier otra sección a pantalla completa —
   exactamente el síntoma de "queda un pedazo" que se venía persiguiendo
   con fórmulas de CSS y fixes de JS, cuando la causa real era contenido
   de más.

5. **El cliente confirmó que esto lo resolvió**, y pidió agregar de nuevo
   un aviso de "Propiedades destacadas" en la pantalla de "Quiénes somos"
   — pero sin volver a romper la lógica del punto 4. La solución no fue
   copiar el mismo bloque grande (título h2 + párrafo + botón aparte, el
   que desbordaba) sino agregar una versión chica, pensada desde el
   principio para caber en el presupuesto de una pantalla:
   - **`.nosotros__destacadas`**: un teaser de una sola fila (`h3` en vez
     de `h2`, un párrafo corto, una flecha en vez de un botón aparte),
     con un separador (`border-top`) arriba. Bastante más chico que un
     segundo bloque completo compitiendo por el mismo espacio que el
     bloque de "Quiénes somos" y las cifras.
   - **`@media (max-height:760px)`**: en pantallas bajas (celular con la
     barra de direcciones visible, o un teléfono chico) se comprimen los
     márgenes/paddings de los tres bloques (intro, cifras, teaser) a la
     mitad o menos — nada de `clamp()` con `svh` (se probó primero y no
     alcanzaba: los porcentajes elegidos casi siempre tocaban el techo
     del `clamp`, sin comprimir de verdad en el rango de alturas que
     importa — un breakpoint fijo fue más simple y más predecible).
   - **`@media (max-height:655px)`**: si ni comprimiendo alcanza, las
     cifras (2 zonas / 100% acompañamiento) son lo menos esencial de los
     tres bloques y se esconden — mejor que dejar que la sección se
     estire más allá de una pantalla otra vez.

   Verificado con Playwright sin desborde en un barrido denso de alturas
   de 480px a 915px (el único resto es un desborde chico en un tamaño ya
   extinto, 320×480). Capturas de pantalla a 412×844 y 360×640 confirman
   que se ve bien en ambos extremos, cifras incluidas o escondidas.

6. El cliente mandó una captura de su celular real mostrando mucho más
   espacio vacío arriba de "QUIÉNES SOMOS" que abajo de "Propiedades
   destacadas", y pidió subir el contenido para que el margen quede
   igual arriba y abajo. Medido con Playwright: `.seccion--completa`
   centra con `display:flex;align-items:center`, que matemáticamente
   reparte el espacio sobrante en dos mitades EXACTAS (verificado:
   125px arriba, 125px abajo, a 412×844) — no hay una asimetría real en
   la fórmula.

   **Lo que sí es real, y vale la pena tener en cuenta a futuro:** el
   punto de scroll donde "ni se ve nada del hero por arriba, ni asoma
   nada de Destacadas por abajo" es matemáticamente un solo pixel exacto
   (`scrollY` = altura del spacer del hero menos `--nav-alto`), no un
   rango. Como esta página no usa scroll-snap (se probó y entra en
   conflicto con los ScrollTrigger de GSAP — ver más abajo, sección de
   scroll-snap descartado), el dedo del usuario puede soltar el scroll
   en cualquier punto cercano a ese pixel, no justo en él — eso solo
   puede correr esa franja de separación por muy pocos píxeles hacia un
   lado u otro, nunca decenas ni cientos de píxeles como para explicar
   una asimetría grande y visible.

   **Fix aplicado:** el contenido de #nosotros tenía espacios reducidos
   a propósito (18px/14px en vez de los 32px/20px por defecto de
   `.cifras`/`.cifra`) para entrar con margen en pantallas chicas — pero
   esos valores reducidos también se aplicaban en pantallas altas, donde
   sobraba espacio de más. Se sacaron esas reducciones "siempre activas"
   y se dejaron SOLO dentro de los `@media (max-height:...)` que ya
   protegen las pantallas chicas — en pantallas altas ahora usa los
   valores por defecto (más grandes), lo que reduce el espacio sobrante
   total de ~300px a ~250px (125px por lado, medido a 412×844) sin
   arriesgar el desborde en ningún tamaño (revalidado con Playwright).

   Si después de este ajuste la asimetría se sigue viendo grande en el
   celular real, no es la fórmula de centrado (ya verificada matemática
   y visualmente simétrica) — pedir una captura fresca y medir el punto
   de scroll exacto antes de tocar CSS de nuevo.

7. El cliente marcó con un círculo el bloque de arriba (desde "QUIÉNES
   SOMOS" hasta el párrafo) y pidió subirlo más — "queda muy apretado en
   el medio, no hay buena composición". El centrado vertical (paso 6) sí
   dejaba los dos márgenes iguales, pero el resultado en sí no se veía
   bien: contenido flotando en el medio de la pantalla en vez de fluir
   como cualquier otra sección del sitio.

   **Fix real:** dejar de centrar #nosotros. `#nosotros.seccion--completa{
   align-items:flex-start; }` — arranca pegado arriba con el mismo
   `padding-block:var(--seccion)` (72px) que ya tiene cualquier `.seccion`
   del sitio, ni un caso especial. Lo que sobra de una pantalla completa
   queda todo abajo, de colchón antes de Destacadas. La clase base
   `.seccion--completa` (en `construccion.md`) se deja centrada por
   defecto, para el caso general donde SÍ tenga sentido centrar (una
   sección de una sola frase, por ejemplo); este override puntual es
   solo para #nosotros, donde centrar no daba buena composición al tener
   varios bloques de contenido con alturas dispares. Revalidado sin
   desborde en el mismo barrido de alturas de siempre.

8. El cliente pidió bajar el `padding-top` a 40px ("subí un poquito más
   la parte que marqué en azul") — hecho, sin tocar el `padding-bottom`.
   Después pidió que el `padding-bottom` tuviera el mismo valor. Se probó
   `padding-bottom:40px` directo y NO alcanzaba: con `align-items:
   flex-start` el padding-bottom del contenedor solo define dónde termina
   la CAJA, no dónde termina el CONTENIDO — el sobrante seguía
   acumulándose todo junto arriba de ese padding (40px de padding real +
   ~170px de sobrante sin repartir = ~210px visibles antes de Destacadas,
   contra 40px arriba). El cliente aclaró que no quería tocar el alto de
   la sección (sigue siendo una pantalla completa), solo que el padding
   del CONTENIDO fuera parejo.

   **Fix real:** en vez de `align-items:flex-start` + padding fijo,
   `#nosotros .nosotros__todo` (el `.contenedor` de adentro) pasa a ser
   `display:flex;flex-direction:column;justify-content:space-between`,
   y `#nosotros.seccion--completa` vuelve a `align-items:stretch` (el
   default) para que ese contenedor ocupe el alto completo de la
   sección. Con esto: `padding-top`/`padding-bottom` de la sección
   quedan fijos en 40px cada uno (de verdad iguales, medido: 40px y
   40px), y lo que sobra de una pantalla completa se reparte SOLO, en
   partes iguales, entre los tres bloques (intro, cifras, aviso de
   Destacadas) — nunca se acumula como un bloque de aire suelto al
   final. Se sacaron los `margin-top` fijos entre bloques (ya no hacen
   falta, `justify-content:space-between` los reemplaza) y se dejó un
   `gap:24px` como mínimo, para que nunca queden pegados si hay poco
   sobrante. Revalidado sin desborde en el mismo barrido de alturas de
   siempre (480px a 915px).

   **Lección:** cuando una `.seccion--completa` tiene que repartir
   espacio sobrante de forma pareja SIN tocar el alto total ni dejarlo
   todo junto en un extremo, `flex-column + justify-content:space-between
   + gap` en el contenedor interno reparte automáticamente entre los
   bloques de contenido — mucho más prolijo que intentar calcular
   paddings/márgenes fijos a mano para cada tamaño de pantalla.

---

## 7. Hero como catálogo — chip de precio (copiado de losparaisos)

El cliente pidió que el hero funcione "como un catálogo": cada zona del
carrusel (ya rotaba foto + nombre + bajada) ahora también muestra una placa
de precio (`.hero__precio-chip`), copiada visualmente del chip de promos de
`losparaisos/index.html` (`.hero__precio-chip`) — vidrio esmerilado, un glow
del color de marca respirando detrás (`::before`, `chip-aura`) y un filo de
luz recorriendo el borde en loop (`::after`, `chip-filo`), adaptado a
`var(--azul)` (terracota) en vez del verde/rosado de losparaisos.

**Resuelto — decisión final del cliente:** en vez de un precio numérico
(no hay precios fijos por zona — es asesora individual, no desarrolladora
con lista de precios), el chip es un **CTA de WhatsApp**: ícono
`i-whatsapp` + texto fijo "Consultar" (`id="hero-chip-wa"` en `index.html`).
Al tocarlo abre WhatsApp con un mensaje que ya incluye la zona activa:
"Hola Fabiana, quiero consultarte sobre la propiedad {zona}". `js/main.js`
recalcula el `href` del chip en cada rotación del carrusel (usa
`f.dataset.zona`, ya existía — no hizo falta agregar un `data-precio`),
sincronizado con el mismo fade de 260ms que usa losparaisos (clase
`.cambia` en `.hero`). Número real: `WA_NUMERO_FABIANA = '59894236869'`,
declarado una sola vez arriba del todo en `main.js` y reusado tanto acá
como en el modal de "agendar visita".

**Bug real encontrado de paso, corregido:** el modal de "agendar visita"
(`formAgendar` en `main.js`) mandaba el WhatsApp a `59894189402` —
un número que no es el de Fabiana (quedó de la base de Ananikian, nunca se
reemplazó). Ahora usa la misma constante `WA_NUMERO_FABIANA` que el resto
del sitio. Si se agrega un WhatsApp nuevo en cualquier lado del sitio,
usar esa constante — nunca un número hardcodeado de nuevo.

---

## 8. Nav: buscador en vez de "área clientes", sin sombras

Pedido del cliente: sacar el ícono de usuario/"área clientes" del nav y
poner una lupa que abra un buscador. Se sacó el link a
`area-clientes.html` (esa página todavía no existe, no quedó ningún link
roto) y en su lugar hay un botón `.nav__buscar` que abre `.nav__buscador`
— un panel blanco fijo debajo del nav con un input de texto
(`js/main.js`: `abrirBuscador()`). **Solo diseño por ahora**: abre, cierra,
se puede escribir, pero el `submit` hace `preventDefault()` y no busca
nada — se conecta cuando exista una página de listados de propiedades
(filtrar por zona lo más probable, ya que el `data-zona` del carrusel del
hero ya existe para eso).

También se sacó toda sombra de texto/ícono del nav superior (no del menú
hamburguesa completo, que es un componente aparte): `.nav__logo--texto`
tenía `text-shadow` y `.nav__btn` tenía `filter:drop-shadow(...)` como
resguardo de contraste sobre foto clara — el cliente los quiere sin
sombra en las tres fases del nav (tope/glass/sólido).

Después se sacó también el ícono de favoritos/`i-bookmark` del nav (el
link a `favoritos.html`, esa página tampoco existe todavía — no quedó
ningún link roto) y se afinó el trazo de los íconos que quedaron
(`i-menu`, `i-search`): `stroke-width` de `2` a `1.5` directo en el
`<symbol>` del sprite, para un look más minimalista. Si se necesita
un trazo todavía más fino, `1.25` es el siguiente paso razonable antes
de que el ícono empiece a perder peso visual sobre foto.

---

## 9. Degradé en "Quiénes somos" — blanco en la punta superior derecha

El cliente pidió un degradé: el beige de la sección se funde con blanco,
con el blanco concentrado en la esquina superior derecha.

`#nosotros` (efecto F, `tema-crema`) normalmente pinta un fondo plano vía
`[class*="tema-"]{ background:var(--tema-fondo); }`. Se sobreescribe con
un radial-gradient, apoyado en que el selector por ID (`#nosotros`) le
gana en especificidad al selector de atributo (`[class*="tema-"]`) sin
tocar la regla general de F:

```css
#nosotros{ background:radial-gradient(circle 550px at top right, var(--blanco), var(--fondo-alt) 100%); }
```

**Error de esta sesión, ya corregido:** al ver que el degradé contra
`--fondo-alt` (`#FAF8F4`, ya casi blanco — 75% blanco/25% beige) se notaba
poco (verificado muestreando píxeles: 250,248,244 vs 254,254,253, una
diferencia de 2-4 por canal), se cambió el extremo "beige" a `--arena`
(`#EDE1D2`) — pero `--arena` es el beige VIEJO del branding original, el
que se reemplazó a propósito por `--fondo-alt` porque el cliente lo pidió
más claro (ver Paleta, sección 3). El cliente notó el cambio de tono
("pusiste un beige viejo") y se revirtió a `--fondo-alt`. **`--arena`
sigue existiendo en el código para otros usos, pero no hay que usarlo
como reemplazo de `--fondo-alt` pensando que es "más beige" — es
literalmente el tono que ya se descartó.** El degradé contra
`--fondo-alt` es sutil a propósito: ese es el beige actual, y es
naturalmente muy claro.

Radio del círculo (550px) elegido para que la transición se note en todo
el ancho de un celular sin que queden dos franjas como "bloques" —
probado visualmente con Playwright en 412×844, ajustar si se ve muy
abrupto o muy sutil en otros tamaños.

---

## 10. Chip del hero — de placa de vidrio a botón línea (referencia hba.com)

El cliente mandó una captura de `hba.com` ("NUESTRA PRÁCTICA": cápsula
con borde fino, sin relleno, texto mayúscula con tracking) y pidió que el
chip de WhatsApp del hero (`.hero__precio-chip`) se vea así.

Se sacó por completo la placa de vidrio con glow animado (`::before`,
`chip-aura`) y filo de luz recorriendo el borde (`::after`, `chip-filo`)
que tenía desde que se copió de losparaisos — no era el lenguaje que se
pidió acá. Nueva versión, más simple:

```css
.hero__precio-chip{
  display:inline-flex; align-items:center; gap:10px;
  padding:14px 26px;
  border-radius:999px;
  border:var(--borde-claro);
  background:transparent;
}
.hero__precio{
  font-family:"Neue Haas Grotesk Display Pro",sans-serif; font-weight:500;
  font-size:12px; letter-spacing:.16em; text-transform:uppercase;
}
```

`--borde-claro` (`1px solid rgba(255,255,255,.18)`) ya existía en el
sitio para bordes sobre fondo oscuro — no hizo falta un color nuevo. El
texto pasó de "Hello Branch" cursivo y grande (24px, pensado para mostrar
un precio) a la misma tipografía y tratamiento micro-mayúscula que
`.antetitulo` — el chip dejó de ser una placa de "precio" y ahora lee
como un botón de línea, coherente con el resto del sitio. Se mantiene el
ícono de WhatsApp (no estaba en la referencia, pero sin él el CTA pierde
claridad de qué acción hace).

**Corrección:** el cliente aclaró que quería el look de la referencia
(borde fino, cápsula) PERO sin perder el glow y el filo de luz animado
que ya tenía (`::before`/`::after`, `chip-aura`/`chip-filo`) — se habían
sacado por completo en el cambio anterior. Se reincorporaron ambos,
ajustados a la forma de cápsula (el glow un poco más grande y sutil, el
filo de luz sigue el `border-radius:999px` con la misma técnica de
`mask-composite:exclude` de siempre). Verificado visualmente con
Playwright. **Lección: "hacé este botón como la referencia" pide el
lenguaje visual (forma, borde, tipografía) — no autoriza a sacar
animaciones/efectos existentes que el cliente no mencionó.**

**Revertido por completo.** Después de la corrección de arriba, el
cliente pidió directamente volver al chip tal como estaba antes de
pedir el cambio de estilo hba.com — no quería la cápsula de borde fino
en absoluto, solo había pedido en su momento algo puntual (nunca llegó
a especificarse qué) y el resultado terminó siendo un rediseño completo
del componente. Se restauró `.hero__precio-chip` línea por línea al
estado del commit `a322813` (placa de vidrio oscura, `border-radius:14px`,
`background:rgba(0,0,0,.34)` + blur, texto en "Hello Branch" cursivo
24px) — verificado con `git diff a322813` que no queda ninguna
diferencia. **Lección para el futuro: un pedido puntual sobre un
detalle de un componente (ej. "el radio de este botón") no es luz verde
para rediseñarlo entero contra una referencia — si hace falta más
alcance que el pedido literal, preguntar antes de tocar todo el
componente.**

**El pedido real, aplicado por fin:** era literal — solo el
`border-radius` del chip, de `14px` a `999px` (cápsula completa), sin
tocar ninguna otra propiedad (fondo, blur, glow, filo de luz,
tipografía siguen exactamente como en `a322813`). Un solo valor
cambiado.
