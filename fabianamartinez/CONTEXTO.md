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

- **D (hero fijo) — descartado en el hero de esta página, por pedido del
  cliente**: la infraestructura sigue en `efectos.js`/`efectos.css`
  (`.hero--fijo`, `initHeroFijo()`) para reusar en futuros proyectos, pero
  el `<section class="hero">` del home ya NO lleva la clase `hero--fijo`.
  Con el hero fijo, la foto quedaba 100% congelada detrás del nav mientras
  la sección siguiente la tapaba como una cortina desde abajo — el cliente
  lo sintió como "una imagen quieta" y pidió que el hero scrollee como el
  resto del sitio. Ahora `.hero` es `position:relative` normal: al scrollear,
  la foto se mueve hacia arriba con el flujo normal de la página mientras el
  nav (fixed) se queda quieto arriba — el efecto visual resultante es que el
  nav "va bajando" sobre la imagen a medida que esta se desplaza debajo, que
  es justo lo que se pidió. No reintroducir `hero--fijo` en este hero sin que
  el cliente lo pida de nuevo explícitamente.
- **C (reveal atado al scroll)**: clip-path `inset(0 0 100% 0)` →
  `inset(0)` + `scale(1.15 móvil / 1.3 escritorio)` → `scale(1)`, junto.
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

**Síntoma:** una sección después del hero (ej. "Quiénes somos") con
`min-height:100vh`-y-derivados no llenaba la pantalla en Chrome Android real
(aunque sí en desktop/Brave/Playwright headless) — quedaba un resto de la
sección siguiente visible abajo, o al revés, una sobra de scroll del tamaño
del nav.

**Causa:** el `.hero`/`.hero-interna` usa la fórmula sin restar `--nav-alto`
porque arranca en `scrollY:0` — el nav flota transparente encima sin restarle
nada. Pero cualquier OTRA sección "a pantalla completa" que no sea lo primero
de la página sí necesita restar `--nav-alto`, porque `[id]{ scroll-margin-top:
calc(var(--nav-alto) + 12px); }` (ya global en el sitio) le corre el punto de
scroll-destino esa distancia — sin restar esa misma distancia del alto de la
sección, sobra exactamente lo que mide el nav, en un extremo o el otro.

**Fórmula ya resuelta y confirmada en dispositivo real**, clase `.seccion--completa`
en `movil.css` — **reusar esta clase tal cual para cualquier sección nueva
que deba ocupar la pantalla completa**, no reinventar la fórmula:

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

`--vh100` (en `js/main.js`) se actualiza con `resize`, `orientationchange` Y
`visualViewport.resize` — este último es el que de verdad dispara cuando
Chrome Android esconde/muestra la barra de direcciones al scrollear (`resize`
solo no alcanza).

**Lección aparte, no relacionada con CSS:** varias veces el cliente reportó
"sigue igual" después de un fix real porque los `<link>`/`<script>` no tenían
cache-busting. Todo `css/*.css` y `js/*.js` de este proyecto se referencia con
`?v=N` en `index.html` — **subir el número cada vez que se toque un CSS/JS y
se necesite que el cambio se vea sí o sí**, no asumir que alcanza con pushear.
