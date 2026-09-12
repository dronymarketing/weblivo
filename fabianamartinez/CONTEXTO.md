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

**La causa real (encontrada recién, analizando un video del celular real del
cliente frame por frame):** el intento 3 (fórmulas de CSS) estaba bien, pero
el **spacer del hero fijo** (`initHeroFijo()` en `efectos.js`, el div que
reserva el scroll del hero mientras éste es `position:fixed`) se mide UNA
sola vez con `hero.getBoundingClientRect().height` y solo se vuelve a medir
con `resize`/`orientationchange` — nunca con `visualViewport.resize`. Es el
MISMO bug de Chrome Android que ya se había resuelto para `--vh100` en
`main.js`, pero nunca se aplicó acá, en un lugar distinto del código que
también depende del alto real de la pantalla.

En la práctica: apenas empezás a scrollear, la barra de direcciones de
Chrome Android se esconde (dispara `visualViewport.resize`, casi nunca
`resize`), la pantalla real se hace más alta, `--vh100` sube — y como
`.hero` y `.seccion--completa` usan `--vh100` en vivo por CSS, los dos
crecen igual, en sincronía. Pero el spacer del hero, medido por JS y
congelado en un valor fijo en píxeles, se queda con el alto VIEJO (barra
de direcciones todavía visible) — más chico que el `--vh100` nuevo. Esa
diferencia hace que "Quiénes somos" arranque en el documento ANTES de lo
que debería (el spacer es más corto de lo que el hero mide de verdad), así
que la sección empieza a asomar mientras el hero todavía se ve
parcialmente arriba — exactamente lo que se ve en el video: contenido de
"Quiénes somos" ya bien avanzado (hasta el botón "Ver todas") con la foto
del hero todavía visible detrás, arriba de la pantalla.

**Fix:** agregar el mismo listener que le faltaba, en `efectos.js`:

```js
if (window.visualViewport) {
  window.visualViewport.addEventListener('resize', medir);
}
```

Verificado con Playwright simulando el crecimiento real de viewport (700px
→ 844px, como pasa cuando se esconde la barra de direcciones): antes del
fix el spacer quedaba congelado en 700px mientras `--vh100` y el hero ya
medían 844px; después del fix, los tres valores quedan sincronizados
siempre. **Lección para el futuro:** cualquier medición de alto hecha con
JS (no solo `--vh100`) en un sitio con nav fijo tiene que escuchar
`visualViewport.resize`, no solo `resize`/`orientationchange` — Chrome
Android dispara el primero mucho más seguido que los otros dos.

**Lección aparte, no relacionada con CSS:** varias veces el cliente reportó
"sigue igual" después de un fix real porque los `<link>`/`<script>` no tenían
cache-busting. Todo `css/*.css` y `js/*.js` de este proyecto se referencia con
`?v=N` en `index.html` — **subir el número cada vez que se toque un CSS/JS y
se necesite que el cambio se vea sí o sí**, no asumir que alcanza con pushear.

**Repaso post-fix (12/set):** después de dos capturas del cliente mostrando
que "no se resolvió", se llegó a sospechar caché y se probó también
`scroll-snap` como red de seguridad — **descartado**: en las pruebas entra
en conflicto con los `ScrollTrigger` de GSAP que ya usa la página (el pin de
Destacadas), produciendo saltos de scroll impredecibles. Nunca se llegó a
subir a producción.

La causa real del "no se resolvió" era mucho más simple: en esta misma
sesión se había reemplazado el fix real (restar `--nav-alto`, paso 2 de la
lista de arriba) por "sin restar nada" (paso 3), basado en medición con
Playwright — que no reproduce un celular real. El cliente mandó la captura
de la sesión original donde se resolvió y se documentó en el skill (con la
fórmula de restar `--nav-alto`), confirmando que el paso 3 fue un
retroceso. Se restauró la fórmula del paso 2. El meta `Cache-Control` y el
bump de versión (`?v=33`) agregados en el camino se mantienen — no está de
más, pero no era la causa de este síntoma puntual.

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
