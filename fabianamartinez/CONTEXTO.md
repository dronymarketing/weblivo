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

---

## 11. "Propiedades destacadas" duplicado — sacado el encabezado de #destacadas

Al agregar el aviso compacto `.nosotros__destacadas` dentro de
"Quiénes somos" (sección 8: teaser con el mismo texto "Propiedades
destacadas"), quedó duplicado con el encabezado completo que ya vive
al principio de `#destacadas` (título + párrafo + botón "Ver todas") —
el mismo mensaje se leía dos veces seguidas, apenas un scroll de
diferencia. El cliente lo marcó y pidió sacar el bloque de
`#destacadas` (el marrón, con el título grande).

Se elimina por completo el `<div class="encabezado aparece">` de
`#destacadas` en `index.html` — la sección ahora pasa directo de la
foto fija del pin (`propiedad-fija`) sin encabezado propio, ya que el
aviso de "Quiénes somos" cumple esa función de introducirla. Verificado
sin errores de consola ni huecos visuales de por medio.

---

## 12. Párrafo reescrito, botón "Conocer más" como cápsula, cifras con ícono y contador animado

El cliente pidió: reescribir el párrafo de "Fabiana Martínez" (más
profesional y personal, corto, sin que quede largo), que el botón
"Conocer más" tenga el mismo tamaño y forma que el chip "Consultar" del
hero, y rehacer las cifras: efecto de contador que sube al hacer scroll,
sumando "Propiedades vendidas" y "Propiedades en construcción" a las 2
que ya había, cada una con ícono + número (con un "+" a la izquierda) +
título abajo.

**Datos ficticios, marcados como borrador — el cliente confirmó
explícitamente crear cifras de ejemplo** ("+35" propiedades vendidas,
"+8" en construcción) porque no tiene los números reales todavía.
**No usar estos valores como reales en ningún otro lado del sitio ni
en comunicación con el cliente — reemplazar en cuanto haya datos
reales.** "Propiedades en construcción" sí aplica al negocio real (ya
existe `en-construccion.html` como categoría de listado — no es que
ella construya, es una categoría de propiedades que vende).

**Párrafo:** sin años ni certificaciones específicas (el cliente pidió
"genérico por ahora") — tono profesional y cercano a la vez, sin
alargarlo.

**Botón "Conocer más":** `.nosotros__btn{ min-height:38px; padding:0
20px; border-radius:999px; }` — mismo alto y forma de cápsula que
`.hero__precio-chip` (38px, `border-radius:999px`), conservando el
color/borde de `.btn--linea` de siempre (acá el botón vive sobre fondo
claro, no tiene sentido copiarle el vidrio oscuro que el chip del hero
necesita para leerse sobre una foto).

**Contador animado:** `animarContador()` en `main.js`, disparado por
`IntersectionObserver` cuando cada `.cifra__num[data-target]` entra en
pantalla (mismo patrón que ya usa `.aparece` para las apariciones, pero
independiente — dispara la cuenta, no una opacidad). Cada número anima
de 0 al valor de `data-target` en 1.2s con `requestAnimationFrame`,
con `data-prefix`/`data-suffix` opcionales (`+` a la izquierda, `%` a
la derecha para el de acompañamiento). Respeta `prefers-reduced-motion`
(la variable `lento` que ya existía): sin animación, muestra el valor
final directo.

**El verdadero desafío fue el espacio, otra vez.** 4 tarjetas con
ícono en 2x2 (el layout "natural" copiando la grilla de 2 columnas que
ya había) medían ~330px de alto — no entraba en el presupuesto de una
pantalla completa en la mayoría de los altos reales, ni comprimiendo
paddings al mínimo. **Se cambió a una sola fila de 4 columnas**
(`#nosotros .cifras{ grid-template-columns:repeat(4,1fr); }`), mucho
más baja en total aunque cada tarjeta sea más angosta — para que el
texto entre en columnas más angostas, los títulos se acortaron a una
palabra ("Zonas", "Directo", "Vendidas", "En obra") y se redujo el
tamaño de número (20px) y texto (11px) puntual para #nosotros. La
clase base `.cifras`/`.cifra` sigue en 2 columnas con los tamaños
originales, sin esta compresión, por si se reusa en otro lado sin la
restricción de pantalla completa. Revalidado sin desborde en el mismo
barrido de alturas de siempre (480px a 960px).

---

## 13. Terracota sólido en tres piezas puntuales de "Quiénes somos"

Después de revertir el esquema de degradé (ver historial de commits:
se probó y se revirtió por completo), el cliente pidió `#5D2510` sólo
en tres piezas puntuales: el párrafo de bio, las etiquetas de las
cifras y el párrafo del aviso a Destacadas. `#5D2510` ya es el valor
de `--azul` (alias histórico, ver definición de variables arriba), así
que se usó `var(--azul)` en vez de hardcodear el hex:

```css
#nosotros .nosotros__intro p,
#nosotros .cifra__txt,
.nosotros__destacadas p{ color:var(--azul); }
```

**Bug de cascada encontrado y corregido en el momento:** el selector
`.nosotros__destacadas p` ya tenía un `color:var(--gris)` en su regla
base (la que define `font-size`/`margin`), ubicada MÁS ABAJO en el
archivo. Con la misma especificidad, gana la regla que aparece último
en el orden de origen — así que el `--gris` viejo pisaba el nuevo
`--azul` sin importar el orden en que se leyera la cascada mentalmente.
Se detectó verificando el color computado real con
`getComputedStyle().color` en vez de confiar solo en la captura visual
(la diferencia entre `--gris` `#6A6F4C` y `--azul` `#5D2510` no se nota
a simple vista en una captura chica). Se corrigió sacando el
`color:var(--gris)` de esa regla base — no se necesita ahí porque
`.nosotros__destacadas` sólo se usa en esta pantalla, no hay otro lugar
que dependa de ese gris por defecto.

**Lección para la próxima vez que se pida un cambio de color puntual:**
verificar con `getComputedStyle` (no sólo con captura) cuando el nuevo
color y el viejo son tonos parecidos (ambos oscuros, ambos tierra) —
la cascada puede estar pisando el cambio en silencio.

---

## 14. Degradé marrón (--azul-900) a arena en 4 piezas más — contraste bajo aceptado a propósito

Pedido nuevo del cliente: degradé de `#412F26` (`--azul-900`, marrón,
izquierda) a `#EDE1D2` (`--arena`, derecha) en el antetítulo "QUIÉNES
SOMOS", el botón "Conocer más", los íconos+números de las cifras y el
título "Propiedades destacadas" — **no** en el párrafo de bio, las
etiquetas de las cifras ni el párrafo de Destacadas (esos quedan en el
terracota sólido de la sección 13).

**Texto (antetítulo, botón, título):** mismo truco de siempre,
`background:linear-gradient(...); background-clip:text; color:transparent`.

**Íconos y números de las cifras:** al no ser texto, `background-clip:text`
no aplica sobre el SVG. En vez de eso, cada una de las 4 tarjetas toma
un color sólido intermedio del degradé según su posición en la fila
(interpolación lineal en RGB entre `#412F26` y `#EDE1D2` en t=0, 1/3,
2/3, 1 → `#412F26`, `#7A6A5F`, `#B4A699`, `#EDE1D2`), dando el efecto
de degradé a lo largo de la fila completa sin necesitar máscaras SVG.

**Contraste:** como ya se documentó en la sección 13 (y antes, con el
primer intento de este mismo degradé), `--arena` sobre el fondo casi
blanco de `#nosotros` da ~1.21:1 de contraste — muy por debajo del
mínimo de 4.5:1 de WCAG. Se sacó una captura de verificación antes de
deployar (como siempre) y se confirmó que el extremo derecho del
degradé (fin de "QUIÉNES SOMOS", fin de "Conocer más", "destacadas" en
el título, y la 4ª cifra "+8 En obra") se ve muy pálido/casi invisible.

**Se avisó al cliente con la captura antes de deployar y eligió
dejarlo así a propósito** ("Dejarlo así igual") — el bajo contraste en
el extremo del degradé es una decisión estética aceptada, no un bug.
Si en el futuro se pide "arreglar" la legibilidad de este degradé
específico, la solución ya evaluada es achicar el rango (no llegar al
arena puro) o cambiar el extremo derecho por otro tono de la paleta.

**Instrucción del cliente para el resto de esta sesión:** no frenar a
evaluar contraste/legibilidad antes de deployar cambios de color — "si
queda ilegible te lo diré yo, no tomes decisiones visuales por mi".
De acá en adelante, este tipo de cambios se implementan y deployan
directo, sin captura de verificación previa salvo pedido explícito.

---

## 15. Degradé independiente por elemento (no compartido) — íconos con máscara SVG

Pedido de seguimiento: el degradé de la sección 14 tenía que aplicarse
**a cada elemento por separado** — cada uno con su propio degradé
completo dentro de su propia caja — en vez del truco de color sólido
escalonado que se había usado para las 4 tarjetas de cifras (una
aproximación, no un degradé real por elemento).

**Números de las cifras (`.cifra__num`):** se sumaron a la misma regla
de `background-clip:text` que ya usaban el antetítulo, el botón y el
título de Destacadas. Como cada elemento pinta su degradé dentro de su
propio bounding box, esto ya da un degradé independiente por número
sin ningún truco extra.

**Íconos de las cifras (`.cifra__ico`):** un SVG con `stroke` no admite
`background-clip:text` (es solo para texto). Para lograr un degradé
real (no una aproximación) se cambió la estructura de cada ícono: en
vez de `<svg><use href="#i-X"/></svg>` con color vía `currentColor`,
ahora es `<svg viewBox="0 0 24 24"><rect width="24" height="24"
fill="url(#grad-marron-arena)" mask="url(#mask-cifra-X)"/></svg>`. El
degradé (`#grad-marron-arena`, definido una sola vez) y una máscara por
ícono (`#mask-cifra-map-pin`, `-user`, `-key`, `-ruler`) viven en el
`<defs>` del sprite de símbolos, al principio del `<body>`.

**Dos bugs de SVG encontrados armando la máscara (verificados con una
página de prueba aislada antes de tocar el sitio real):**
1. El `<use>` dentro de la máscara necesita `style="color:#fff"`, no
   `stroke="#fff"` — los símbolos definen `stroke="currentColor"` como
   atributo de presentación directamente en cada `<path>`, así que solo
   cambia si se cambia la propiedad `color` (de la que depende
   `currentColor`), no el atributo `stroke` puesto en un ancestro.
2. El `<use>` necesita `width="24" height="24"` explícitos. Sin eso, al
   referenciar un `<symbol>` sin ancho/alto propios, dentro de un
   `<mask>` el `<use>` no pinta nada (probado: fuera de una máscara sí
   pinta sin problema, así que es un comportamiento específico del
   contexto de máscara) — con las dimensiones explícitas, pinta bien.

Sin estos dos ajustes los íconos desaparecían por completo (rect
totalmente enmascarado/oculto), detectado con captura antes de asumir
que estaba bien.

---

## 16. Fondo sólido de las cifras — error propio al sacarlo, corregido

El cliente marcó un fondo sólido detrás de la fila de cifras que no le
gustaba. Primer intento (equivocado): poner `.cifra{ background:
transparent }` sin tocar `.cifras{ background:rgba(65,47,38,.14) }` —
ese rgba del contenedor sólo se veía antes en las líneas de 1px entre
columnas (el `gap:1px` del grid dejaba asomar ese fondo únicamente en
los huecos, tapado en el resto por el fondo opaco de cada `.cifra`).
Al sacarle el fondo a `.cifra`, ese mismo rgba quedó expuesto en TODA
la fila de manera uniforme — el cliente lo vio como el mismo problema
sin resolver, y de paso, sin querer, desaparecieron las líneas
divisorias (ya no había contraste entre "hueco" y "tarjeta", todo el
área tenía el mismo tinte).

**Corrección:** sacar también el fondo del contenedor
(`#nosotros .cifras{ background:transparent; gap:0; }`) y rehacer las
líneas divisorias con `border-right:1px solid rgba(65,47,38,.14)` en
cada `.cifra` (sin borde en la última). Resultado: sin ningún fondo
sólido/tinte en toda la sección, con las líneas divisorias intactas.

---

## 17. Sacar el degradé de íconos y números de las cifras

El cliente pidió sacarle el degradé (sección 15) a los íconos y
números de las cifras y dejarlos "como estaba antes" — no tocaba el
antetítulo, el botón ni el título de Destacadas, que siguen en
degradé. Revertido a color sólido `var(--azul)` (las clases base
`.cifra__ico`/`.cifra__num` ya lo tenían así desde siempre, alcanzó
con sacar las reglas que lo pisaban). Los íconos volvieron a la marca
simple `<svg><use href="#i-X"/></svg>` con color vía `currentColor`, y
se borraron del sprite de símbolos el `<linearGradient
id="grad-marron-arena">` y las 4 `<mask>` de la sección 15, que ya no
los usa nadie.

---

## 18. Misma fórmula de altura real en el pin de Destacadas (#destacadas)

Pedido: aplicar en la siguiente sección (#destacadas, donde van las
propiedades destacadas con el efecto de imagen fija/pin al scrollear)
la misma "lógica" de #nosotros — aclarado por el cliente: se refería
puntualmente a la altura, que sea pantalla completa real.

`.propiedad-fija__pin` (la imagen que queda fija mientras el cuerpo de
texto pasa por encima) usaba `height:100vh` a secas — el mismo bug de
siempre en navegadores móviles con barra de direcciones dinámica (ver
sección de `.seccion--completa`/hero). Se le aplicó la misma cascada
de fallbacks que ya usa `.seccion--completa`:

```css
.propiedad-fija__pin{
  position:sticky; top:var(--nav-alto);
  height:100vh;
  height:100svh;
  height:var(--vh100, 100svh);
  height:calc(100vh - var(--nav-alto));
  height:calc(100svh - var(--nav-alto));
  height:calc(var(--vh100, 100svh) - var(--nav-alto));
  overflow:hidden;
}
```

También se cambió `top:0` por `top:var(--nav-alto)`: como el nav es
`position:fixed` y esta sección no arranca en scrollY:0 (mismo caso que
#nosotros), el pin tiene que engancharse debajo del nav, no en el
borde superior real del viewport — si no, la altura descontada por
`--nav-alto` dejaba un hueco sin pinear al final de la pantalla en vez
de arrancar debajo del nav. Verificado con captura: la imagen fija
ahora ocupa exactamente el espacio visible debajo del nav, sin hueco
ni superposición, y el efecto de scroll-pin sigue funcionando igual.
`.propiedad-fija{ height:220vh; }` (que solo define la distancia total
de scroll del efecto, no un alto "de pantalla") se dejó con vh normal
a propósito, no le aplica el mismo bug.

---

## 19. El "rectángulo marrón" debajo de Quiénes somos — hueco vacío, no un elemento

El cliente mandó una grabación de pantalla preguntando qué función
cumplía un rectángulo marrón sólido, sin nada adentro, que aparecía
justo debajo de "Quiénes somos" antes de la foto de la primera
propiedad. Diagnóstico: no era ningún elemento nuevo ni un bug de la
sección 18 — era el padding-top de `.seccion` (72px, clase que trae
`#destacadas`) sumado al `margin-top:32px` que tenía
`.propiedad-fija:first-of-type`, ambos sobre el fondo sólido oscuro de
`tema-marron`, sin texto ni imagen adentro todavía (la foto recién
aparece cuando el `.propiedad-fija__pin` entra en escena). Antes de
que "Quiénes somos" fuera realmente fullscreen (sección 6 en
adelante), este hueco quedaba más abajo, fuera de la vista inmediata,
así que no llamaba la atención — al ajustar la altura real de
"Quiénes somos" quedó justo pegado al borde de la pantalla y se hizo
visible.

**Corrección:** `#destacadas{ padding-top:0; }` y se sacó el
`margin-top:32px` de `.propiedad-fija:first-of-type`. Ahora la foto de
la primera propiedad arranca inmediatamente después del contenido de
"Quiénes somos", sin ninguna franja de color sin función en el medio.
Verificado con captura en el punto exacto de la transición.

**Nota para más adelante:** el mismo padding-block de `.seccion` (72px)
también deja una franja de fondo marrón sólido al final de
`#destacadas`, después del texto de la tercera propiedad y antes de
"Zonas" — ahí sí hay contenido inmediatamente antes (el cuerpo de la
3ª propiedad, mismo fondo oscuro), así que se ve como espaciado normal
y no como un bloque aislado sin función, pero si en algún momento se
pide revisar eso también, la causa sería la misma.

---

## 20. Foto premium para la primera propiedad de Destacadas

El cliente pidió una foto vertical 1080x1920 "aesthetic" de una
propiedad premium para la foto fullscreen de la primera propiedad de
Destacadas (la más destacada de la inmobiliaria). Se probaron varias
opciones de bancos de fotos libres (Pexels, con búsquedas de living
rooms modernos/de lujo) y se le mostraron un par de candidatas — el
cliente eligió directamente su propia opción, una foto de piscina
infinita con vista al mar Mediterráneo:
https://www.pexels.com/es-es/foto/vista-serena-a-la-piscina-infinita-mediterranea-38796254/
(licencia Pexels, libre de uso comercial). Descargada a 1080x1920
exacto vía los parámetros de resize de Pexels (`?w=1080&h=1920&fit=crop`)
y guardada en `img/propiedades/premium-piscina-vista-mar.jpg`,
reemplazando `pocitos-living.jpg` como imagen base de la primera
`.propiedad-fija`.

**Inconsistencia de contenido a tener en cuenta:** el texto debajo de
esta foto (`.proyecto-destacado__cuerpo`) sigue diciendo "Apartamento
en Cordón · U$S 138.000 · 2 dorm. · 1 baño · 65 m²" — una descripción
de apartamento chico bajo una foto de piscina infinita con vista al
mar de una villa. Es la misma naturaleza de "dato de muestra" que el
resto del sitio (fotos y textos placeholder, ver secciones anteriores),
pero vale la pena que el cliente lo tenga presente: cuando haya una
propiedad real "premium" para destacar acá, conviene que la foto y el
texto (zona, precio, m²) sean coherentes entre sí.

---

## 21. Fotos extra de Destacadas — sin radio, mismo tamaño, con espacio real

El cliente pidió sacarle el radio de esquina a las 2 fotos extra que
aparecen sobre la foto fija de cada propiedad, que fueran de igual
tamaño y que tuvieran espacio vertical entre sí — en la captura se
veían prácticamente pegadas una a la otra.

Antes cada `.propiedad-fija__extra` se ubicaba por separado con
`position:absolute` + un `bottom:%` distinto (36% y 6%) calculado a
ojo. Como el ancho de la caja es un % del ancho del contenedor pero el
`bottom` es un % del ALTO, el espacio real entre ambas dependía del
aspect-ratio del contenedor (ancho vs alto de cada pantalla) — en
altos de pantalla más bajos, ese cálculo las dejaba prácticamente
tocándose (menos de 2px de separación en el peor caso).

Se reemplazó por un contenedor `.propiedad-fija__extras` (nuevo, envuelve
a las 2 fotos en el HTML) con `display:flex; flex-direction:column;
gap:16px`. Así el ancho, el aspect-ratio (16:10) y el espacio entre
ambas quedan garantizados por el propio flex, sin depender de cálculos
de position:absolute — y de paso queda más simple de mantener. También
se sacó el `border-radius:var(--radio)` de `.propiedad-fija__extra`
(ahora `border-radius:0`). El JS de `initPropiedadFija()`
(`efectos.js`) no necesitó cambios: sigue buscando
`.propiedad-fija__extra` con `querySelectorAll`, que encuentra el
elemento sin importar en qué nivel de anidamiento esté.

---

## 22. Dirección del reveal de las fotos extra — de arriba a abajo

El cliente pidió que las 2 fotos extra "aparezcan de abajo" al hacer
scroll, tipo animación premium de revista. `initPropiedadFija()` en
`efectos.js` ya usaba un reveal con `clip-path` (el mismo "efecto C"
que el resto del sitio), pero con
`clipPath:'inset(0% 0% 100% 0%)'` como estado inicial — un inset de
100% en el lado de ABAJO hace que la ventana visible tenga alto cero
pegada arriba, y al animar ese inset a 0% la ventana crece hacia
abajo: la foto se revela de arriba hacia abajo, no al revés.

Se cambió el inset inicial a `inset(100% 0% 0% 0%)` (100% arriba en
vez de abajo): ahora la ventana visible arranca con alto cero pegada
abajo, y crece hacia arriba a medida que ese inset baja a 0% — la foto
se revela de abajo hacia arriba. El zoom de entrada (`scale`) no
cambió. Verificado con capturas en varios puntos del scroll: la mitad
inferior de la foto aparece primero, después la superior.

---

## 23. Info de la propiedad (zona/nombre/precio/botón) pasa a vivir dentro del fullscreen

Cambio de rumbo del cliente respecto a la sección 18/19: ya no quiere
que el nombre/precio/botón vivan debajo, en flujo normal, sobre su
propio fondo marrón sólido (`.proyecto-destacado__cuerpo`) — los
quiere DENTRO de la misma pantalla fullscreen de la propiedad,
superpuestos a la foto ya teñida, apareciendo con una animación justo
cuando termina de revelarse la última foto extra. Marcó en una
captura "Apartamento en Cordón", el precio y el botón "Ver propiedad".

**HTML:** se eliminaron los 3 bloques `.contenedor.proyecto-destacado__cuerpo`
(uno por propiedad) que vivían fuera de `.propiedad-fija`. Su
contenido (`.proyecto-destacado__zona/__nombre/__precio` + el botón)
pasa a un nuevo `.propiedad-fija__info` dentro de `.propiedad-fija__pin`,
junto a `.propiedad-fija__extras` — ambos ahora comparten un
contenedor `.propiedad-fija__contenido` (flex-column, gap 28px)
centrado verticalmente en la pantalla (el mismo `top:50%` +
`translateY(-50%)` que antes tenía solo `.propiedad-fija__extras`).

**Con esto desaparece del todo la franja de fondo marrón sólido
"sin función"** de las secciones 19-20 — ya no existe ese bloque
aparte, cada propiedad es una sola pantalla fullscreen de principio a
fin, sin nada intermedio entre una propiedad y la siguiente.

**Botón:** mismo alto y radio que `.nosotros__btn` ("Conocer más" —
cápsula, `min-height:38px`, `border-radius:999px`), nueva clase
`.propiedad-fija__btn`. El ancho queda libre (el `.btn` base ya es
`display:inline-flex`, se ajusta solo al texto). Texto actualizado a
"Ver Propiedad" (antes "Ver propiedad", pedido puntual del cliente).

**Animación (`initPropiedadFija` en `efectos.js`):** `.propiedad-fija__info`
arranca oculto con `gsap.set(info, { autoAlpha:0, y:24 })` (mismo
patrón que la sección 22: "premium", entra desde abajo) y se agrega a
la timeline con `tl.to(info, { autoAlpha:1, y:0, ease:'none' })` SIN
posición explícita — en GSAP eso la encadena automáticamente justo al
final del tween anterior (el scale de la última foto extra), así que
"cuándo aparece" queda amarrado a la lógica existente en vez de un
número de tiempo hardcodeado que se pudiera desincronizar si se
cambian los tiempos de las fotos más adelante.

Sigue respetando `prefers-reduced-motion`: `initPropiedadFija()`
completa (con el `gsap.set` que oculta `info`) ni se ejecuta si el
sistema pide reducir movimiento, así que ahí `info` quede visible
directo, sin animación ni estado oculto — mismo comportamiento que ya
tenían el tinte y las fotos extra.

---

## 24. Foto de fondo distinta para escritorio en la 1ª propiedad de Destacadas

El cliente pasó una segunda foto de Pexels (misma serie que la
sección 20 — piscina infinita con vista a la costa turca, mismo
fotógrafo/locación, pero en formato horizontal 1920x1280) para usarla
puntualmente como fondo en la versión escritorio.

Como `.propiedad-fija__base` hasta ahora tenía un único `<img>` (la
foto vertical 1080x1920 pensada para mobile), se cambió a un
`<picture>` con `<source media="(min-width:900px)">` apuntando a la
nueva foto horizontal, y el `<img>` de siempre como fallback para
mobile — mismo breakpoint que ya usa `escritorio.css`
(`@media (min-width:900px)`), así que queda consistente con el resto
del sitio en vez de inventar un breakpoint nuevo. `data-fallback`
sigue funcionando igual: el listener en `main.js` engancha por
`img[data-fallback]`, sin importar si el `<img>` está envuelto en un
`<picture>`.

Guardada en `img/propiedades/premium-piscina-vista-mar-escritorio.jpg`.
Verificado con Playwright en 1440px (carga la horizontal) y 390px
(sigue cargando la vertical) — `.propiedad-fija__base img{ object-fit:cover }`
sigue aplicando igual sobre el `<img>` real dentro del `<picture>`, sin
necesitar tocar el CSS.

---

## 25. Fotos extra: además del mask, movimiento real de abajo hacia arriba

La sección 22 solo invirtió la dirección del `clip-path` (un wipe/mask
que revela la foto de abajo hacia arriba, pero la caja en sí no se
mueve). El cliente pidió explícitamente que las 2 fotos tengan "la
animación de venir de abajo" — se sumó un desplazamiento real con
`y` de GSAP: cada `.propiedad-fija__extra` arranca en `y:48` (48px más
abajo de su posición final) y anima a `y:0` en simultáneo con el
mask y el zoom. Verificado con capturas intermedias del scroll: a
mitad de camino la foto está físicamente más abajo Y parcialmente
enmascarada, combinando ambos efectos en vez de solo un wipe estático.

---

## 26. Fotos extra: sacar el mask/zoom, dejar solo el movimiento literal

El cliente pidió sacar "la animación de aparición" y que el efecto sea
literalmente que las fotos vienen de abajo — no el mask+zoom tipo
reveal (efecto C) combinado con el movimiento de la sección 25, sino
solo el desplazamiento. Se sacaron `clipPath` y el `scale` de la
imagen de `initPropiedadFija()`: ahora `.propiedad-fija__extra` solo
tiene `gsap.set(extra, { y: 48 })` inicial, animando a `y: 0` — la
foto está completamente visible (sin máscara, sin zoom) desde el
principio, solo desplazada 48px hacia abajo, y sube a su lugar con el
scroll. Se sacó también la variable `zoomInicial`/`esMovil` de esta
función, que ya no se usa. Verificado con `getComputedStyle` en varios
puntos del scroll: `clip-path:none` y `opacity:1` todo el tiempo,
solo cambia el `transform` (translateY).

---

## 27. Corrección: sí quería el zoom de antes, solo cambiar cómo se ocultan

La sección 26 se pasó de rosca: el cliente nunca pidió que las fotos
fueran visibles desde el arranque, ni sacar el zoom — pidió específica
y únicamente reemplazar la MÁSCARA (clip-path) por un desplazamiento
real como mecanismo para ocultarlas al principio, mantenimiento el
resto de la animación que ya le gustaba (el zoom `scale` de
`zoomInicial` a 1).

**El problema de los 48px de la sección 25/26:** ese desplazamiento
era demasiado chico para tapar una foto de ~214px de alto — por eso,
sin la máscara, quedaban visibles desde el arranque (motivo del
reclamo). Para que el desplazamiento por sí solo alcance a esconderlas
de verdad ("vengan desde abajo de la página", no desde un ligero
corrimiento en el mismo lugar), hace falta bastante más que 48px, y la
distancia necesaria depende de en qué altura de la pantalla arranca
cada foto (con el contenido centrado, la 2ª foto ya arranca más abajo
que la 1ª).

**Solución:** en vez de un número fijo, se calcula por foto —
`pinRect.bottom - extraRect.top + 40` — la distancia justa para que el
borde superior de la foto quede por debajo del borde inferior del pin
(que tiene `overflow:hidden`), con 40px de margen extra. Así cada
foto, sin importar en qué punto de la pantalla centrada le toque
arrancar, queda genuinamente tapada por el recorte del pin — no solo
corrida — y al animar a `y:0` entra literalmente desde abajo de la
pantalla. Se restauró también `gsap.set(..., {scale: zoomInicial})` y
su animación a `scale:1`, exactamente como estaba antes de la sección
26. Verificado con capturas: la foto no asoma para nada al arrancar,
y al llegar a destino ya tiene el mismo zoom-out sutil de siempre.

---

## 28. Efecto simple, sin ninguna animación sobre las fotos

Corrección sobre la sección 27: el cliente aclaró que no quiere NINGÚN
efecto sobre las fotos en sí — nada de zoom, un efecto simple. Solo
que al scrollear vengan de abajo, "normal, sin aceleración". Se sacó
por completo el `scale`/`zoomInicial` de `initPropiedadFija()` (el
`gsap.set` inicial y el `.to(..., {scale:1})`). Queda un único
movimiento por foto: el `y` calculado (sección 27) de la posición
oculta a `y:0`, con `ease:'none'` (ya estaba así — sin curva de
easing, sigue al scroll de forma lineal, que es lo que pide "sin
aceleración"). Verificado con `getComputedStyle` en las imágenes:
`transform:none` en todo el recorrido del scroll, ningún scale.

---

## 29. Fotos extra a ancho completo, como en hba.com

El cliente mandó una grabación de hba.com mostrando el efecto de
referencia: las fotos que suben desde abajo son de ancho completo
(sin margen a los costados) y sin sombra, a diferencia de como las
teníamos (con 6% de margen a cada lado y `box-shadow`, como una
tarjeta flotante). Confirmado que quería igualar también eso, no solo
el tipo de movimiento (que ya estaba resuelto en las secciones 27-28).

Se movió el margen lateral de `.propiedad-fija__contenido` (que hasta
ahora tenía `left:6%; right:6%`, aplicado por igual a las fotos y al
texto) a `left:0; right:0` — ancho completo — y se agregó el margen
solo a `.propiedad-fija__info` (`padding:0 6%`), para que el texto
(zona/nombre/precio/botón) siga con el mismo margen de siempre y solo
las fotos vayan de punta a punta. Se sacó el `box-shadow` de
`.propiedad-fija__extra`. El cálculo de `initPropiedadFija()` en
`efectos.js` no necesitó cambios: mide el `getBoundingClientRect()`
real de cada foto, así que se ajusta solo al nuevo ancho.

---

## 30. Deslizamiento muy rápido — solo se toca la duración, no el tamaño

El cliente mandó una captura mostrando el botón "Ver Propiedad"
cortado abajo de la pantalla — señal de que, con las fotos a ancho
completo (más altas que antes, sección 29), el grupo centrado con
`translateY(-50%)` a veces se pasaba del alto real disponible. Se
probó una solución (contenido con flex:1 en vez de aspect-ratio, para
que nunca se desborde), pero el cliente frenó: el tamaño de las fotos
estaba bien como estaba, **no tocar eso** — el único problema real era
que el deslizamiento se sentía "super rápido". Se revirtió el cambio
de tamaño/layout (`.propiedad-fija__contenido`/`__extras`/`__extra`
vuelven exactamente a como estaban en la sección 29, verificado con
`git diff` sin diferencias).

**La causa real de la velocidad:** al agrandar la distancia que cada
foto recorre para salir del todo de la pantalla (sección 27, hasta
~700px en vez de 48px), la duración del tween se dejó en el default
de GSAP (pensado para el desplazamiento chico de antes) — misma
duración, mucha más distancia, se veía brusco. Se le puso una
duración explícita más larga (`duration:1.1`, antes ~0.5 por default)
y se separó más el arranque de cada foto (`0.15 + i*0.85`, antes
`0.15 + i*0.32`) para que el movimiento se reparta en más scroll y se
sienta gradual, sin tocar tamaños ni márgenes.

---

## 31. El "tamaño original" era el de ANTES del ancho completo (sección 29)

Malentendido propio en la sección 30: cuando el cliente dijo "el
tamaño de las imágenes estaban bien, como estaban anteriormente", yo
lo interpreté como "como estaban antes de mi intento de layout con
flex" — es decir, la versión a ancho completo de la sección 29. El
cliente aclaró que en realidad se refería a más atrás: el tamaño de
ANTES de la sección 29, con margen del 6% a los costados y
`box-shadow` (la versión "tarjeta", no la de ancho completo tipo
hba.com).

Se revirtió `.propiedad-fija__contenido`/`__extra` exactamente al
estado previo al commit de la sección 29 (`git diff` contra ese commit
sin diferencias): `left:6%; right:6%` en el contenedor (aplica por
igual a fotos y texto, ya no hace falta el padding aparte en
`.propiedad-fija__info`) y `box-shadow:0 24px 48px rgba(0,0,0,.35)` de
vuelta en `.propiedad-fija__extra`. La duración/velocidad más lenta de
la sección 30 se mantiene sin cambios — ese ajuste sí era correcto.

---

## 32. Sacar la sombra y sacar el "colazo" de movimiento propio (scrub)

El cliente pidió sacar la sombra de las fotos extra (ya no debería
estar — se volvió a sacar). Y aclaró algo más de fondo sobre el
deslizamiento: no quiere que tenga "velocidad" propia, quiere que
funcione como un elemento que simplemente viene de abajo, pegado al
scroll.

**Causa real:** `initPropiedadFija()` usaba `scrub:0.5` en el
ScrollTrigger — ese `0.5` no es la duración de nada, es un retraso de
suavizado (en segundos) entre la posición real del scroll y la
posición de la animación. Con eso, al dejar de scrollear de golpe, la
foto seguía moviéndose sola durante un instante hasta alcanzar la
posición correcta — eso es lo que se sentía como "velocidad de
deslizamiento" (la foto pareciendo tener su propio impulso). Se
cambió a `scrub:true`: sin número, sin suavizado — la posición sigue
al scroll cuadro a cuadro, sin ningún retraso ni colazo. También se
revirtió la duración/separación explícitas de la sección 30
(`duration:1.1`, `arranca:0.15+i*0.85`) a los valores simples de antes
(`0.15+i*0.32`, sin duración explícita) — con `scrub:true` ya no hace
falta estirar la duración para disimular un salto, el propio scroll
1 a 1 alcanza para que se sienta gradual.

---

## 33. Rehecho por completo: mecánica real de hba.com (sticky_gallery)

El cliente insistió en calcar la sección de propiedades de hba.com y
esta vez trajo el código real: usando `copy($0.outerHTML)` en la
consola de Chrome DevTools sobre `hba.com/projects/surfside-miami/`,
fue copiando y pegando (en dos videos) el HTML del componente
`sticky_gallery`. No se pudo acceder a hba.com desde este entorno
(dominio bloqueado por la política de red de la sesión — confirmado
con curl vía el proxy y con la herramienta WebFetch, ambos devuelven
bloqueo), así que **no se tocó nada hasta tener el código real**, tal
como pidió el cliente ("si no ves la web no trabajes sobre lo que te
mande").

**Estructura real descubierta (extraída del HTML pegado):**
```html
<section class="sticky_gallery forest" data-colour-scheme="#091D1E">
  <div class="pin-spacer" style="position:absolute; z-index:3; ...">
    <div class="sticky_gallery--content-wrapper">
      <div class="sticky_gallery--content">
        <h2 class="h1">The St. Regis Longboat Key</h2>
        <a class="btn" href="...">
          <span class="btn__text">View Project</span>
          <span class="btn__bg"></span>
        </a>
      </div>
      <div class="sticky_gallery--content-details d-none d-lg-flex">...</div>
      <div class="sticky_gallery--content-bg"></div>
    </div>
  </div>
  <div class="pin-spacer" style="position:relative; ...">
    <div class="sticky_gallery--main-media" style="position:fixed; ...">
      <figure><img ...></figure>
    </div>
  </div>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12 col-lg-10 offset-lg-1">
        <div class="sticky_gallery--slide"><figure><img></figure></div>
        <div class="sticky_gallery--slide"><figure><img></figure></div>
      </div>
    </div>
  </div>
</section>
```

**La mecánica real es distinta a la que habíamos armado hasta acá:**
el título + botón quedan pegados (pin) JUNTO con la foto base, uno
arriba de la otra (el `z-index:3` del pin de texto lo pone por
encima) — visibles desde el arranque, no al final. Las 2 fotos extra
NO están pineadas: viven en flujo normal, así que al scrollear son
ELLAS las que suben y tapan a la foto+texto fijos. No hay ningún velo
que se va tiñendo ni animación de GSAP para "revelar" nada — todo el
efecto de "tapar" lo hace el scroll nativo del navegador.

**Se reescribió `#destacadas` para calcar esto:**
- HTML: `.propiedad-fija__info` (zona/nombre/precio/botón) pasa a vivir
  DENTRO de `.propiedad-fija__pin`, como hermano de `.propiedad-fija__base`
  (ya no dentro de un `.propiedad-fija__contenido` con las fotos).
  `.propiedad-fija__extras` sale del pin, ahora es hermano DIRECTO de
  `.propiedad-fija__pin` dentro de `.propiedad-fija`, en flujo normal.
- CSS: se sacó `.propiedad-fija__tinte` (ya no hace falta, nada que
  teñir). `.propiedad-fija__info` queda `position:absolute` sobre la
  foto (abajo, con un degradé suave detrás — equivalente a su
  `content-bg` — solo para que el texto se lea, no un velo de pantalla
  completa). Cada `.propiedad-fija__extra` mide una pantalla completa
  (misma fórmula de `--vh100`/`--nav-alto` que el pin, para que cubran
  exacto sin dejar ver el pin entre medio) y NO llevan ya margen del 6%
  ni sombra — edge-to-edge, porque ahora SON las que tapan, no una
  tarjeta flotante. `.propiedad-fija{ height:300vh }` = 1 pantalla del
  pin + 1 pantalla por cada una de las 2 fotos extra.
- JS: **se borró `initPropiedadFija()` de `efectos.js` por completo** y
  su llamado — ya no hace falta nada de GSAP/ScrollTrigger para este
  efecto, es 100% CSS (`position:sticky`) + scroll nativo. Coincide
  con cómo lo resuelve hba.com (ellos sí usan el pin de GSAP, pero
  nosotros lo logramos con `position:sticky` puro, sin librería).

**Bug real encontrado al verificar (no relacionado con el rediseño en
sí, pero lo exponía):** `body{ overflow-x:hidden; }` hace que
`overflow-y` compute a `auto` automáticamente (regla de CSS: si un eje
no es `visible` y el otro sí, el que es `visible` pasa a `auto`) — eso
convertía a `<body>` en su propio contenedor de scroll independiente,
lo cual rompe `position:sticky` para todo lo que esté adentro (el
`sticky` calculaba mal su límite de "pegado" contra ese scroll interno
en vez de contra el viewport real). Se movió el `overflow-x:hidden` de
`body` a `html` (el causante original de las franjas blancas
laterales, sigue evitado, pero sin el efecto secundario). Verificado
con Playwright: antes del fix, el pin de `.propiedad-fija__pin`
"scrolleaba" en vez de quedarse pegado (posición lineal con el
scroll); después del fix, queda fijo en `top:60` durante el scroll de
las 2 fotos extra y se despega limpio al final, exactamente como se
esperaba. También se confirmó que no reaparece scroll horizontal.

---

## 34. Título minimalista sobre la foto — el resto de la info, aparte con aire

El cliente comparó dos grabaciones (livo.com.uy vs hba.com real) y
marcó una diferencia real: en hba.com el texto sobre la foto es SOLO
el nombre del proyecto, grande y suelto — nada de zona/precio/botón
amontonados en la misma esquina como quedaron en la sección 33.

**Cambio:** `.propiedad-fija__info` (superpuesta a la foto, pineada)
ahora tiene ÚNICAMENTE el `<h3>` con el nombre (subido a 40px). Zona,
precio y botón "Ver Propiedad" se movieron a un bloque nuevo,
`.propiedad-fija__detalle`, que vive DESPUÉS de `.propiedad-fija__extras`
en flujo normal (aparece una vez que las fotos extra ya taparon del
todo la foto+título fijos), con su propio padding generoso
(`40px 6% 64px`) — igual que como estaba antes de la sección 33, pero
ahora es solo el complemento secundario, no la única forma de ver el
precio.

`.propiedad-fija` deja de tener una altura fija en vh (`height:300vh`)
y pasa a `height:auto` — ya no hace falta calcularla a mano, el
pin (sticky, reserva su propia pantalla en el flujo) + las 2 fotos
extra (una pantalla cada una) + el detalle (lo que mida su contenido)
suman solos la altura real del bloque.

**Nota de verificación:** al confirmar este cambio con Playwright en
este entorno, la herramienta de captura automática mostró resultados
inconsistentes (a veces no se veía el título pese a que
`getBoundingClientRect`/`getComputedStyle` confirmaban posición,
tamaño y color correctos — se probó con repros aislados, con JS
desactivado, forzando repaint, y el patrón CSS en sí funciona bien en
aislamiento). No se pudo aislar la causa exacta dentro del tiempo
disponible; puede ser un artefacto específico de Chromium headless en
este entorno. Se deployó igual (el código verifica correcto por DOM) y
se le pidió al cliente confirmar en su celular, que es como viene
verificando todo el resto de esta sesión.

---

## 35. Marcha atrás completa: las secciones 33 y 34 sobraban

El cliente aclaró que el texto (zona/nombre/precio/botón, con velo y
tarjetas con margen) ya estaba resuelto y funcionando bien — lo único
que faltaba ajustar era el movimiento de las 2 fotos que suben. Los
dos videos de código de hba.com (`copy($0.outerHTML)` en DevTools) los
mandó para ese propósito puntual, no para pedir que se reescribiera
toda la sección. Las secciones 33 (mecánica completa de hba.com: texto
pineado con la foto, fotos extra tapando por scroll nativo, sin JS) y
34 (título minimalista + bloque de detalle aparte) fueron **un
malentendido propio, no lo que se pidió**.

**Revertido por completo** `index.html`, `movil.css` (el bloque de
`#destacadas`) y `efectos.js` al estado exacto de antes de la sección
33 (commit `6d210e6` — "Sacar sombra y el retraso de suavizado del
scroll (scrub:true)"), verificado con `diff` contra ese commit sin
ninguna diferencia. Eso restaura: el velo (`--tinte`) que se tiñe con
el scroll, las tarjetas con 6% de margen, el texto completo
(zona+nombre+precio+botón) apilado y centrado en la pantalla, y
`initPropiedadFija()` de vuelta en `efectos.js` con el movimiento
simple por GSAP (`scrub:true`, sin easing, sin zoom, sin máscara) que
ya estaba resuelto y confirmado.

El fix real de la sección 33 (mover `overflow-x:hidden` de `body` a
`html` porque rompía `position:sticky` en toda la página) se mantiene
— es un bug de verdad, independiente del resto del rediseño que se
revirtió.

**Lección para no repetir:** cuando el cliente manda código/capturas
de un sitio de referencia, preguntar primero para qué puntualmente lo
quiere usar en vez de asumir "reemplazar todo el mecanismo" — en este
caso el pedido real era mucho más acotado (solo el movimiento) que lo
que se interpretó.

---

## 36. Tinte a sólido total (opacity:1) antes de que aparezcan las 2 fotos

Sobre la base ya restaurada en la sección 35, el cliente propuso una
combinación puntual: en vez de que el velo se quede en un tinte oscuro
que todavía deja ver la foto de fondo, que llegue a ser un marrón
sólido de verdad, y recién con ese fondo sólido aparezcan las 2 fotos
extra — el texto (zona/nombre/precio/botón) sigue apareciendo solo
después de esas 2 fotos, como ya estaba.

Revisando `initPropiedadFija()` en `efectos.js`, la secuencia por
timeline ya hacía casi todo esto: el tinte empieza a oscurecer en el
segundo 0, las 2 fotos entran escalonadas (arrancan en 0.15 y 0.47) y
la info se encadena automáticamente después del tween de la segunda
foto (sin posición explícita, GSAP la pone a continuación). Lo único
que faltaba era literal: el tinte solo llegaba a `opacity:0.82`, así
que la foto de base seguía viéndose (más oscura, pero no un sólido).

**Cambio único:** `tl.to(tinte, { opacity: 0.82, ... })` →
`{ opacity: 1, ... }` en `initPropiedadFija()`. Con la duración por
defecto de GSAP (0.5) arrancando en el segundo 0, el tinte llega a
sólido antes de que la segunda foto (arranca en 0.47) termine de
entrar — así las 2 fotos quedan sobre un fondo ya sólido marrón
(`--azul-900`, el mismo sólido que usa el nav/footer), no sobre la
foto de la propiedad transparentándose. No se tocó nada de texto,
tamaños, márgenes ni la mecánica de entrada de las fotos — solo el
valor final del tinte, que es puntualmente lo que pidió el cliente.

Cache-bust: `movil.css?v=76` (solo comentario actualizado, sin cambio
visual en el CSS), `efectos.js?v=67`.

---

## 37. Sacar el movimiento de las 2 fotos extra — ya están puestas en el sólido

El cliente aclaró más la sensación que buscaba: en su web se sentía
que el scroll "mueve" las 2 fotos (porque literalmente las hacía
entrar deslizando desde abajo), mientras que en la referencia las 2
fotos ya están puestas, fijas, en el bloque — lo único que cambia con
el scroll es el fondo sólido detrás, que va de transparente a opaco.
Esa es la diferencia entre sentirse "inestable" (algo en movimiento) y
sentirse natural (una foto fija sobre un fondo que se tiñe).

**Cambio en `initPropiedadFija()` (efectos.js):** se sacó por completo
el cálculo de desplazamiento (`desplazos`, `gsap.set(extra, {y:...})`)
y el tween que las hacía subir (`tl.to(extra, {y:0,...})`). Las 2
fotos extra ya no tienen ningún estado inicial ni animación de
posición — quedan en su lugar final desde que se ve el bloque, tal
como están en el HTML/CSS. Lo único que sigue animado por scroll es el
velo (`tl.to(tinte, {opacity:1,...})`), y el texto (`info`) se sigue
encadenando para aparecer recién cuando ese velo termina de quedar
sólido.

No se tocó ninguna medida, margen ni la estructura del HTML — el
cambio fue puramente sacar el tween de posición de las 2 fotos.

Cache-bust: `movil.css?v=77` (solo comentarios), `efectos.js?v=68`.

---

## 38. Las 2 fotos vuelven a aparecer desde abajo, pero recién sobre el sólido ya hecho

El cliente confirmó que el velo (sección 37) ya funciona como quería,
y pidió volver a sumarle a las 2 fotos la entrada desde abajo — pero
esta vez sobre el sólido marrón ya puesto, no mientras todavía se ve
la foto de fondo (que era lo que se sentía "inestable" antes de la
sección 37).

**Cambio en `initPropiedadFija()` (efectos.js):** se reincorpora el
cálculo de desplazamiento por foto (`pinRect.bottom - r.top + 40`) y
el tween que las hace subir (`tl.to(extra, {y:0,...})`), igual que
antes de la sección 37 — pero esta vez **sin posiciones explícitas en
la timeline** (antes arrancaban en 0, 0.15 y 0.47, todas superpuestas
entre sí). Sin ese tercer argumento, GSAP encadena cada tween justo
después de que termina el anterior: primero termina de teñirse el
velo hasta sólido, recién ahí sube la primera foto, después la
segunda, y por último aparece el texto. Así las fotos nunca se mueven
mientras la foto de base todavía es visible — solo se mueven ya sobre
el marrón sólido.

No se tocó ninguna medida, margen ni la estructura del HTML.

Cache-bust: `movil.css?v=78` (solo comentarios), `efectos.js?v=69`.

---

## 39. Las 2 fotos pasan a ser un solo panel sólido, no 2 fotos sueltas

El cliente notó que las 2 fotos se veían "individuales" en vez de
estar asentadas en un sólido, y que el hecho de que cada una se
moviera por su lado (con su propio desplazamiento y arranque, ver
sección 38) desestabilizaba el scroll.

**Cambio en CSS (`movil.css`):** `.propiedad-fija__extras` (el
contenedor de las 2 fotos) pasa a tener `background:var(--azul-900)`
(el mismo sólido del velo) y `padding:16px` — ahora el espacio entre
las 2 fotos y alrededor de ellas es ese sólido, no transparente, así
se leen como 2 fotos puestas en un mismo panel/marco sólido, no 2
piezas sueltas.

**Cambio en JS (`initPropiedadFija`, `efectos.js`):** en vez de
calcular un desplazamiento por foto y animar cada `.propiedad-fija__extra`
por separado, ahora se toma el panel completo
(`.propiedad-fija__extras`) como una sola pieza: un único
`gsap.set`/`tl.to` con un solo desplazamiento, calculado sobre el
panel entero. Las 2 fotos suben siempre juntas, como un solo bloque,
nunca una foto por su lado.

No se tocó la secuencia general (velo → panel → texto) ni ninguna
medida del HTML.

Cache-bust: `movil.css?v=79`, `efectos.js?v=70`.

---

## 40. "Se ve con lag, artificial, tipo plástico" vs. la referencia — scrub:true era la causa

El cliente comparó de nuevo contra la web de referencia: la de él se
sentía "con lag, artificial, tipo plástico", sin poder señalar una
causa puntual. Repasando `initPropiedadFija()`, esta era la única
animación de scroll de todo el archivo que usaba `scrub:true` — el
resto (`initRevealScroll`, `initGaleriaAnclada`) ya usa un número bajo
(0.4-0.5).

**La causa técnica:** `scrub:true` ata la posición directamente al
evento de scroll "crudo" del navegador. En muchos celulares esos
eventos no se disparan en cada frame (llegan en tandas), así que el
movimiento se ve a saltos entre esos eventos en vez de continuo — eso
es exactamente lo que se percibe como "con lag" o "plástico". Un
`scrub` con un número bajo (en vez de `true`) hace que GSAP interpole
la posición con `requestAnimationFrame` entre esos eventos de scroll,
así el movimiento queda fluido en cualquier dispositivo, típicamente
sin que se note ningún retraso al ojo.

**Importante — esto NO es lo mismo que el problema anterior:** el
`scrub:true` se había puesto para sacar el "colazo" (que la foto
siguiera moviéndose sola después de soltar el scroll, sección de más
atrás en este documento). Ese colazo aparece con valores de `scrub`
*altos* (tipo 1 o más), no con cualquier número. Un valor bajo como
`0.3` sigue sin generar colazo perceptible (se resuelve en ~300ms,
imperceptible) pero sí suaviza el movimiento entre eventos de scroll.
Por eso se cambió a `scrub: 0.3`, no de vuelta a un valor alto.

**Cambios en `initPropiedadFija()` (efectos.js):**
- `scrub: true` → `scrub: 0.3`.
- Se agregó `force3D: true` a los `gsap.set()` del panel, el velo y la
  info, para forzar que el navegador los trate como su propia capa
  compuesta (GPU) desde el arranque, en vez de crearla recién a mitad
  de la animación (eso también puede sentirse como un salto/lag en el
  primer frame de movimiento).

**Cambios en CSS (`movil.css`):** `will-change:opacity` en
`.propiedad-fija__tinte` y `will-change:transform` en
`.propiedad-fija__extras` — mismo objetivo, que el navegador prepare
la capa de composición de antemano en vez de sobre la marcha.

No se tocó ninguna medida, margen, secuencia (velo → panel → texto) ni
la mecánica de "sin aceleración" de las fotos (`ease:'none'` se
mantiene en los tweens) — el cambio es puramente de rendimiento/fluidez
del scroll, no de la forma del movimiento.

Cache-bust: `movil.css?v=80`, `efectos.js?v=71`.

---

## 41. "Sigue rápido/artificial" — position:sticky vs. pin:true de GSAP

El cliente mandó 2 videos (parado en el mismo lugar de cada web,
un solo deslizamiento de dedo en cada una) para comparar. Se sacaron
frames (ffmpeg, cada 33-50ms) de los dos videos para poder comparar
cuadro a cuadro en vez de a simple vista.

**Lo que se vio en los frames de nuestra web:** en varios cuadros,
durante el mismo scroll rápido, aparecía contenido de un bloque de
propiedad montado sobre el de otro — por ejemplo el botón "Ver
Propiedad" de una tarjeta asomando por arriba mientras la foto de
otro bloque todavía ocupaba el resto de la pantalla. Eso es un glitch
de renderizado (2 estados de scroll distintos pintados en la misma
pantalla), no un problema de easing ni de velocidad de la animación.

**Causa probable:** los 3 bloques de `#destacadas` usaban
`position:sticky` (nativo del navegador) para fijar la foto, mientras
que la animación de tinte/fotos/texto corre por GSAP. `position:sticky`
lo resuelve el navegador en su **hilo de compositor**, aparte del hilo
donde corre GSAP — en un scroll lento van sincronizados, pero en un
flick fuerte (como el del video) pueden desincronizarse un instante y
mostrar contenido de dos scrolls distintos pisándose. Se confirmó
además que la referencia (hba.com) arma su `sticky_gallery` con
`pin:true` de GSAP ScrollTrigger, no con `position:sticky` — se ve en
los `<div class="pin-spacer">` que GSAP inserta solo, presentes en el
código que el cliente había copiado de hba.com en su momento (sección
33 de este documento).

**Cambio: `position:sticky` → `pin:true` de ScrollTrigger.**
- `movil.css`: `.propiedad-fija` pierde el `height:220vh` fijo (ya no
  hace falta, GSAP arma su propio spacer). `.propiedad-fija__pin`
  pasa de `position:sticky; top:var(--nav-alto)` a `position:relative`
  simple — sigue siendo el contexto de posicionamiento para la foto,
  el velo y el contenido de adentro (que son `position:absolute`), pero
  ya no es el navegador el que lo fija.
- `efectos.js` (`initPropiedadFija`): la misma timeline que ya tenía
  el `scrollTrigger` para el tinte/panel/texto ahora también pinea:
  `trigger: pin, start:'top top+='+navAlto, end:'+=120%', pin:true,
  anticipatePin:1, scrub:0.3`. El `+=navAlto` hace que quede pegado
  justo debajo del nav (mismo lugar que antes con sticky); `+=120%`
  repite el mismo recorrido de scroll que daba el alto de 220vh
  manual; `anticipatePin:1` es la recomendación de GSAP para evitar un
  salto visual justo al arrancar el pin en un scroll rápido.

No se tocó la secuencia (velo → panel → texto), ni las medidas, ni el
`ease:'none'` de las fotos — el cambio es de mecánica de pin, no de
diseño ni de timing.

Cache-bust: `movil.css?v=81`, `efectos.js?v=72`.

---

## 42. La mecánica real era mucho más simple de lo que se venía armando

El cliente frenó en seco: "Algo te estás pasando. Lo que te estoy
pidiendo es super simple, veo en la web de referencia como 2 imágenes
suben con el scroll, pero super sencillo" — y a continuación pasó el
`outerHTML` completo de hba.com (no solo el fragmento del
`sticky_gallery`, la página entera), dando la posibilidad de ver la
estructura real tal cual la arma su tema.

**Lo que reveló el código:** en el `sticky_gallery` de hba.com, las 2
fotos chicas (`.sticky_gallery--slide`) **no están adentro de ningún
`pin-spacer`** — viven sueltas en un `.container-fluid > .row`,
contenido normal de la página, sin ningún JS ni animación propia. Lo
único que GSAP pinea son el título+botón
(`.sticky_gallery--content-wrapper`) y la foto principal
(`.sticky_gallery--main-media`), cada uno en su propio `pin-spacer`.
Como esos 2 pin-spacers no ocupan toda la pantalla (miden bastante
menos que el viewport en el ejemplo capturado), queda un tramo visible
de pantalla por donde las 2 fotos sueltas pasan scrolleando con total
normalidad — el efecto de "las 2 fotos suben con el scroll" no es una
animación: es scroll nativo de toda la vida, se ve así porque arriba
hay algo fijo y abajo no.

Todo lo que se venía armando en las secciones 36 a 41 (velo con
secuencia propia sobre las 2 fotos, panel único con `gsap.set`/`tl.to`
moviéndolas como una pieza, cálculos de desplazamiento, `pin:true` de
la sección completa) sumaba complejidad sobre una premisa equivocada:
tratar a las 2 fotos como parte de la coreografía pineada, cuando en
la referencia ni siquiera están adentro del pin.

**Reestructuración (HTML + CSS + JS), quitando en vez de agregando:**
- `index.html`: `.propiedad-fija__extras` sale de adentro de
  `.propiedad-fija__pin` / `.propiedad-fija__contenido` y pasa a ser
  hermano directo del pin, después en el HTML — contenido plano, sin
  ningún wrapper con animación.
- `movil.css`: `.propiedad-fija__pin` deja de medir pantalla completa
  (antes `calc(100vh - nav-alto)`) y pasa a `58vh` — a propósito
  bastante menos que la pantalla, para que quede un tramo visible
  abajo por donde pasan las 2 fotos. `.propiedad-fija__info` (zona,
  nombre, precio, botón) queda directo adentro del pin, superpuesto a
  la foto. `.propiedad-fija__extras` pierde todo lo que tenía de
  "panel animado" (`will-change`, cálculos) — es un bloque común con
  fondo sólido (mismo `--azul-900`) y padding, nada más.
- `efectos.js` (`initPropiedadFija`): se borra por completo cualquier
  `gsap.set`/`gsap.to` sobre las fotos extra — no se las toca. El pin
  (`pin:true`, `scrub:0.3`, igual que en la sección 41) ahora se aplica
  solo a la foto+texto, y el velo sigue tiñéndose de 0 a 1 de opacidad
  durante ese pin, con el texto apareciendo recién cuando termina de
  quedar sólido. El `end` del pin se calcula con el alto real del
  bloque de fotos (`extras.getBoundingClientRect().height`), así el
  pin dura scrolleado exactamente lo que tardan las 2 fotos en pasar
  — ni se corta antes ni se queda fijo de más una vez que ya pasaron.

**Lección:** cuando algo no sale bien después de varias vueltas, antes
de seguir ajustando parámetros sobre la misma estructura, conviene
revisar si la estructura de base es la correcta — acá la respuesta
real era sacar código, no afinarlo.

Cache-bust: `movil.css?v=82`, `efectos.js?v=73`.

---

## 43. Volver al fullscreen sin perder la simplificación de la sección 42

El cliente avisó que con la sección 42 se perdió el fullscreen: "usa
lo que resolviste, pero sin romper lo que ya teníamos". La sección 42
había achicado el pin a `58vh` a propósito, para que quedara un tramo
de pantalla visible por donde ver pasar las 2 fotos *mientras* el pin
seguía activo — pero eso no hacía falta para nada: las 2 fotos, al ser
contenido normal sin JS que sigue después del pin en el HTML, entran
solas apenas el pin fullscreen suelta (al terminar su recorrido de
scroll), sin necesidad de que ambos convivan en pantalla al mismo
tiempo. El pin puede volver a ser pantalla completa sin perder nada
de lo simplificado.

**Cambios:**
- `movil.css`: `.propiedad-fija__pin` vuelve a la fórmula de siempre
  (`calc(var(--vh100, 100svh) - var(--nav-alto))`, la misma de
  `.seccion--completa`) en vez de `58vh`.
- `efectos.js`: como las 2 fotos ya no conviven en pantalla con el
  pin, el `end` del `scrollTrigger` deja de calcularse con el alto de
  `.propiedad-fija__extras` (eso era solo para que el pin chico
  soltara justo a tiempo) y vuelve a `'+=120%'`, el mismo recorrido
  fijo que tenía el pin fullscreen antes de la sección 42.
- Lo de la sección 42 que sí se mantiene, intacto: `.propiedad-fija__extras`
  sigue siendo contenido plano después del pin, sin ningún
  `gsap.set`/`gsap.to` — sigue sin haber ninguna animación programada
  sobre esas 2 fotos, que es lo que el cliente pidió resolver ahí.

Cache-bust: `movil.css?v=83`, `efectos.js?v=74`.

---

## 44. La sección 42 sacó demasiado: las 2 fotos no pueden vivir fuera del fullscreen

El cliente avisó: "Quedó peor, no está como estaba antes. Revisa
frame por frame." Se sacaron frames del video con ffmpeg cada 0.5s
para reconstruir la secuencia real.

**Lo que mostraron los frames:** con la reestructuración de la
sección 42 (extras movidas fuera del pin, a flujo normal después),
la pantalla fullscreen quedaba con SOLO la foto + el texto — las 2
fotos ya no aparecían en esa misma pantalla. Recién se veían
varios cientos de píxeles de scroll después, como un bloque plano y
desconectado, con el texto ya reducido y pegado arriba del todo antes
de que empezaran. Es decir: lo que antes (secciones 36-41) era **una
sola pantalla fullscreen con todo junto** (foto oscureciéndose + 2
fotos + texto, superpuestos) pasó a ser **dos momentos separados**
(pantalla fullscreen con foto+texto, y después, aparte, un bloque
plano con las 2 fotos) — una regresión real en la composición, no
una percepción.

**La confusión:** la sección 42 tomó el código de hba.com al pie de
la letra (ahí las 2 fotos chicas viven fuera de cualquier pin-spacer,
sueltas en el grid), pero en el layout de una sola columna de este
sitio (mobile-first, sin el grid de 2 columnas del desktop de hba.com)
eso significaba que las 2 fotos quedaran completamente ocultas
detrás del pin fullscreen mientras dura, y solo aparecieran bien
después, ya en flujo — perdiendo la composición de una sola pantalla
que el cliente ya tenía aprobada.

**La corrección, sin volver a atrás:** lo único que realmente hacía
falta "resolver" (sección 42) era que las 2 fotos no tuvieran ninguna
animación — no que vivieran fuera del pin. Se las devuelve adentro de
`.propiedad-fija__contenido` (adentro del pin fullscreen, superpuestas
a la foto, como en las secciones 36-41), pero sin ningún
`gsap.set`/`gsap.to` encima: quedan quietas, visibles desde que arranca
el bloque, sin deslizarse ni aparecer con un tween. El velo y el texto
siguen animados exactamente igual que antes (tinte 0→1, texto después).

**Cambios:**
- `index.html`: `.propiedad-fija__extras` vuelve a estar adentro de
  `.propiedad-fija__contenido`, junto con `.propiedad-fija__info`,
  dentro del pin — en los 3 bloques.
- `movil.css`: se recupera `.propiedad-fija__contenido` (position
  absolute, centrado, flex column) como wrapper de extras + info.
  `.propiedad-fija__info` deja de tener su propio position:absolute
  (vuelve a ser un simple hijo flex de contenido, como antes).
- `efectos.js`: sin cambios funcionales — ya no tenía ningún
  `gsap.set`/`gsap.to` sobre extras desde la sección 43; solo se
  corrigió el comentario, que describía la versión de la sección 42
  (extras afuera del pin) en vez de esta.

**Lección:** al adaptar un patrón de referencia (hba.com, grid de 2
columnas en desktop) a un layout distinto (una sola columna en
mobile), hay que separar qué parte del patrón es la mecánica pedida
(acá: "sin animación") de qué parte es meramente cómo esa referencia
lo implementa en SU propio layout (acá: "fuera del pin") — no todo lo
segundo aplica igual en un layout distinto.

Cache-bust: `movil.css?v=84`, `efectos.js?v=75`.

---

## 45. El panel de fotos vuelve a subir desde abajo

Con la sección 44 las 2 fotos quedaron quietas, fijas en su lugar
desde el arranque, adentro del fullscreen. El cliente lo vio y fue
tajante: no le gusta así, quiere que el panel de fotos suba desde
abajo hasta esa posición — el mismo pedido de las secciones 37-39,
ahora sobre la base fullscreen ya corregida en la sección 44.

**Cambio en `initPropiedadFija()` (efectos.js):** se reincorpora el
cálculo de desplazamiento del panel completo
(`pinRect.bottom - panelRect.top + 40`) y su `gsap.set`/`tl.to` — el
panel (las 2 fotos + su fondo sólido, como una sola pieza, nunca cada
foto por separado) arranca tapado por el `overflow:hidden` del pin y
sube hasta su lugar. Se mantiene la secuencia ya encadenada (sin
posiciones explícitas en la timeline): primero el velo se tiñe a
sólido, recién ahí sube el panel, y al final aparece el texto.

No se tocó el fullscreen ni la estructura de la sección 44 (las 2
fotos siguen viviendo adentro de `.propiedad-fija__contenido`, dentro
del pin) — solo se le devolvió el movimiento de entrada que ya tenía
antes de la simplificación de la sección 42.

Cache-bust: `movil.css?v=85`, `efectos.js?v=76`.

---

## 46. El panel subía más rápido de lo que el dedo scrolleaba

El cliente: "las fotos suben como super rápidas con el scroll, mientras
que en la web de referencia se notan más natural, suaves, despacio."

**La causa:** `initPropiedadFija()` arma un solo `gsap.timeline()` con
3 tweens (velo, panel, texto) y los encadena sin posición explícita —
por default GSAP le da a cada uno un tercio del recorrido total de
scroll (`end`). El problema es que el panel viaja una distancia en
píxeles bastante más grande (arranca tapado por completo debajo del
pin) que lo que se mueve el velo (solo `opacity`) o el texto (un fade
chico) — con un tercio del scroll nada más, el panel tenía que
recorrer muchos más píxeles por cada píxel de scroll real que el
velo o el texto, y esa diferencia de "velocidad relativa" es
justamente lo que se siente como "super rápido"/no natural: el ojo
compara la velocidad del panel contra el resto y contra el propio
gesto de scroll, y no coinciden.

**Cambio en `initPropiedadFija()` (efectos.js):** se le da a cada
tween una `duration` explícita en vez de dejarlas por default iguales
— el panel pasa a tener bastante más recorrido de scroll asignado
(`duration:1.3`) que el velo y el texto (`duration:0.35` cada uno).
Sigue siendo scroll 1 a 1 (`scrub:0.3`, `ease:'none'`, nada de tiempo
ni easing de por medio) — lo único que cambia es CUÁNTO scroll le
toca a cada tramo. También se estiró un poco el recorrido total del
pin (`end:'+=160%'`, antes `120%`) para darle más aire a todo el
conjunto.

No se tocó la mecánica (sigue siendo pin:true + scrub, sin
`position:sticky`), ni el orden de aparición (velo → panel → texto).

Cache-bust: `efectos.js?v=77` (sin cambios en `movil.css` esta vez).

---

## 47. Todavía más suave y despacio

El cliente pidió profundizar el ajuste de la sección 46: "¿Podés
hacerlo más suave? ¿Despacio?"

**Cambio en `initPropiedadFija()` (efectos.js):** se aumenta todavía
más la porción de scroll que le toca al panel frente al velo y el
texto (`duration:2.2` para el panel vs `duration:0.3` para velo y
texto, antes 1.3 y 0.35) y se estira el recorrido total del pin
(`end:'+=220%'`, antes `160%`). Mismo mecanismo que la sección 46
—scroll 1 a 1 vía `scrub:0.3`, sin easing— solo que ahora el panel
tiene bastante más recorrido de scroll para la misma distancia en
píxeles, así se mueve más despacio por cada píxel que se scrollea.

Cache-bust: `efectos.js?v=78`.

---

## 48. Un poco menos de recorrido, para acercarlo a la referencia

El cliente pidió afinar un poco para abajo lo de la sección 47: "un
poquito menos de recorrido de scroll, quiero asimilarlo a la web de
referencia."

**Cambio en `initPropiedadFija()` (efectos.js):** `end:'+=180%'`, bajado
desde `220%`. Se mantienen las mismas `duration` de la sección 47
(panel `2.2` vs velo/texto `0.3` cada uno) — el panel sigue teniendo
la gran mayoría del recorrido asignado, solo que el recorrido total
del pin es un poco más corto.

Cache-bust: `efectos.js?v=79`.

---

## 49. El velo y el panel arrancan juntos, no uno después del otro

El cliente notó: "primero se tiñe el marrón y después aparecen las
fotos. Sincronicemos para que cuando suban las fotos, el marrón
oscuro empiece a aparecer."

**Causa:** en `initPropiedadFija()`, `tl.to(tinte,...)` y
`tl.to(panel,...)` se agregaban sin posición explícita, así que GSAP
los encadenaba uno atrás del otro (el panel arrancaba recién cuando
el velo terminaba su tween).

**Cambio:** se le da a los dos tweens la misma posición explícita
(`0`) en la timeline, así arrancan juntos apenas empieza el scroll del
pin. El texto se mantiene chained pero ahora con posición explícita
igual a la duration del panel (ya no puede quedar implícito, porque
al ponerle posición a los otros dos se rompe el auto-encadenado). El
velo, al tener mucha menos duration que el panel, termina de teñirse
bastante antes de que el panel llegue a destino — quedan
sincronizados en el arranque, que es lo que se pidió, no
necesariamente en el final.

No se tocó el reparto de duration entre velo/panel/texto (sección 47)
ni el `end` del pin (sección 48).

Cache-bust: `movil.css?v=86`, `efectos.js?v=80`.

---

## 50. El fondo se ponía marrón casi de entrada, y las fotos no debían tener marco marrón

El cliente, tajante: "Se vuelve marrón el fondo muy enseguida, las 2
fotos tienen un sólido marrón de fondo, cosa que no quiero. No se
porque se te está complicando esto tan simple."

**Dos causas puntuales, las dos en lo tocado por la sección 49:**

1. Al sincronizar el arranque del velo y el panel (sección 49), el
   velo se quedó con su `duration` chica (`0.3`) mientras el panel
   tiene una `duration` grande (`2.2`) — ambos arrancan juntos, pero
   el velo llegaba a sólido casi de inmediato y se quedaba así,
   marrón, durante el resto larguísimo tramo en que el panel todavía
   estaba subiendo. Se ve "el fondo se pone marrón muy rápido".
2. `.propiedad-fija__extras` tenía `background:var(--azul-900)` +
   `padding:16px` (de la sección 39, cuando las 2 fotos eran un panel
   flotante sobre la foto ya oscurecida) — eso le pone un marco/fondo
   marrón sólido pegado a las 2 fotos, que el cliente no quiere.

**Cambios:**
- `efectos.js`: el `tinte` pasa a tener la MISMA `duration` que el
  panel (`duracionPanel`, antes `0.3` fijo) — ahora se van tiñendo
  gradualmente durante toda la subida, y llegan a destino juntos
  (velo sólido justo cuando el panel termina de subir), no el velo
  mucho antes.
- `movil.css`: se saca `background:var(--azul-900)` y `padding:16px`
  de `.propiedad-fija__extras` — las 2 fotos ya no tienen ningún
  fondo/marco marrón propio, solo el `gap:16px` entre ellas.

Cache-bust: `movil.css?v=87`, `efectos.js?v=81`.

---

## 51. Acortar el recorrido total — hacía falta scrollear casi 2 pantallas

El cliente preguntó por qué tardaba tanto en subir el panel de fotos.
Explicación: entre las secciones 46-47 el `end` del pin se fue
estirando (`120%` → `160%` → `180%` → `220%` → `180%`) para darle
"aire" al panel y que no se sintiera rápido — pero eso significa que,
con el panel ocupando la gran mayoría de ese recorrido (`duration`
mucho más alta que el velo/texto), hacía falta scrollear casi 2
pantallas completas para verlo llegar a destino.

Pidió acortar de a poco. **Cambio:** `end:'+=150%'` (antes `180%`).
Mismas `duration` relativas entre velo/panel/texto — el reparto no
cambia, solo el total de scroll que hace falta para completarlo.

Cache-bust: `efectos.js?v=82`.
