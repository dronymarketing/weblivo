---
name: livo-design
description: Estándar y flujo de trabajo de Livo para webs de clientes. Usar SIEMPRE al empezar una web nueva, y al revisar, corregir o continuar una existente.
---

# Livo — Estándar de trabajo

Livo hace webs y branding para clientes en Uruguay. Casi siempre se arranca por
un **borrador** que se le muestra a la clienta para cerrar el trabajo.

Respondé siempre en español rioplatense.

## Antes de escribir una línea de código

Hacé la entrevista completa. Reglas:

- **Una pregunta por vez**, con opciones numeradas. Esperá la respuesta.
- Santi contesta desde el celular: que pueda responder con un número.
- Si un dato ya lo dio, no lo vuelvas a preguntar.
- Si algo choca con otra cosa que ya eligió, decilo **antes** de construir.

---

## La entrevista

### 1 — ¿Qué tipo de sitio es?

1. Invitación a evento personal (una página, inmersiva, sin nav)
2. Landing de negocio o servicio
3. Sitio institucional (varias secciones)
4. Catálogo con pedidos por WhatsApp
5. Portfolio personal
6. Otro — describímelo

### 2 — Rubro o evento

Si eligió **1**, preguntá qué evento:

1. XV años  2. Casamiento  3. Cumpleaños  4. Baby shower o nacimiento
5. Bautismo, comunión o confirmación  6. Despedida  7. Aniversario
8. Graduación  9. Fiesta privada o temática  10. Evento corporativo
11. Otro

Si eligió **2, 3, 4 o 5**, preguntá el rubro del cliente en una línea.

### 3 — Arquitectura de navegación

1. **Una sola página con anclas** — todo en el inicio, el nav scrollea.
   Para landings, invitaciones, negocios chicos, catálogos.
2. **Páginas separadas** — cada ítem del nav es un archivo propio.
   Para estudios con áreas extensas, portfolios con muchos proyectos.
3. **Híbrido** — páginas separadas, y el inicio muestra un adelanto de cada una
   con un botón para entrar. Es el que usa livo.com.uy.

Si eligió híbrido, preguntá a dónde apunta el nav:
1. A las páginas completas (por defecto)
2. A los adelantos del inicio
3. Mixto — algunos ítems a páginas, otros anclas del inicio

Detalles de cada modo en `references/construccion.md`.

### 3.5 — ¿Estética base?

Antes de preguntar color y registro, preguntá:

"¿Arrancamos de una estética que ya tenés, o la definimos de cero?"

1. **L — estética Livo** (livo.com.uy): terrosa, cálida, tipografía protagonista
2. **M — estética Martina** (martinaxv): ceremonial, nocturna, dorada
3. **N — estética Nexa** (nexalegales): sobria, institucional, dos colores
4. **De cero** — seguimos con las preguntas de color y registro

Si elige L, M o N: abrí `references/esteticas-livo.md` y usá esos valores
**tal cual**. Se saltean los pasos 4, 5, 6 y 7 — ya están respondidos.
Si pide una variante ("como Martina pero en verde"), cambiá solo eso.

### 4 — Color

"¿De dónde sacamos la paleta?"

1. **Tengo una referencia visual**
2. **Te digo los colores yo**
3. **Proponeme vos según el rubro**
4. **Usá una paleta del sistema**

**Si eligió 1:** listá numerados los archivos de imagen que haya en `refs/`.
Si `refs/` no existe o está vacío, decilo y ofrecé las otras tres opciones.

Para extraer los colores **no los estimes mirando la imagen**. Corré un script
que cuantice: Python con Pillow, redimensionar a 200px de ancho, convertir a
paleta adaptativa de 8 colores, devolver los hex ordenados por frecuencia.
Si Pillow no está, instalalo.

Mostrá el resultado con hex y porcentaje de área, y proponé qué es fondo,
qué dominante y qué acento. Santi corrige.

**Los colores extraídos se ajustan, no se usan crudos:** subí contraste hasta
que el texto sobre el fondo pase 4.5:1, manteniendo el matiz de la foto.
Las fotos dan combinaciones lindas y sin contraste suficiente para leer.

**Si eligió 3:** ofrecé **tres** paletas distintas, cada una con su lógica en
una línea. Nunca una sola: que pueda comparar.

**Si eligió 4:** ofrecé los tonos de `references/tokens.css`.

Cuando la paleta esté cerrada, escribila en el proyecto como
`css/tokens-proyecto.css` con la misma estructura de variables.
Esa paleta manda por encima del registro.

### 5 — Registro visual (atajo)

Elegí uno y precarga tipografía, composición y movimiento. Después se ajusta
cada eje por separado. **Nada de esto define color:** el color ya se decidió.

1. Legal e institucional — simetría, densidad alta, cero decoración
2. Minimalista — el aire hace el trabajo, sin bordes ni sombras
3. Constructor e industrial — bloques macizos, cortes diagonales, números grandes
4. Inmobiliaria y arquitectura — la foto ocupa todo, interfaz discreta
5. Rural y agro — texturas, nada pulido, fotografía de campo
6. Editorial — grilla marcada, filetes, versalitas
7. Ceremonial y celebración — mucho aire, entradas lentas, ritmo pausado
8. Artesanal — bordes orgánicos, textura de papel, ilustración
9. Tech e innovación — cápsulas, microinteracciones, gradientes sutiles
10. Salud y bienestar — formas redondeadas, aire generoso
11. Gastronomía — foto grande, apetito primero
12. Moda y belleza — foto a sangre, interfaz casi invisible
13. Otro — describímelo

El rubro **sugiere** un registro habitual pero no lo impone. Nunca lo asumas
a partir del rubro: mencioná lo típico y dejá elegir.

### 6 — Tipografía

Mostrá el par que precargó el registro y ofrecé cambiarlo.

1. Serif clásica — Marcellus, Cormorant Garamond
2. Serif display de alto contraste — Catavalo, Yeseva One
3. Sans neutra — Montserrat, Karla
4. Sans condensada en mayúsculas
5. Mono
6. Proponeme tres pares y elijo
7. Ya las tengo — te las digo

Siempre se define un **par**: display para títulos, otra para cuerpo.
Se puede repetir familia en dos pesos si el registro es minimalista.

### 7 — Composición y densidad

1. Aireada — poco por pantalla
2. Densa — información compacta y ordenada
3. Foto protagonista — la imagen manda
4. Tipografía protagonista — grilla editorial

### 8 — Movimiento

1. Nada
2. Sutil — apariciones al scroll, transiciones cortas
3. Protagonista — secuencias, entradas coreografiadas

Si elige 2 o 3, abrí `references/catalogo-efectos.md` y ofrecé primero los
**paquetes por sitio**, que es la forma rápida:

- **RE** — animaciones de realevate.agency: preloader de marco, texto por
  palabras. Cinematográfico, para lujo y decisión lenta.
- **FU** — animaciones de fundar.com.co: apariciones al entrar en pantalla,
  microtransiciones. Discreto, liviano, sin GSAP. **El que corresponde
  en la mayoría de los casos.**
- **HB** — animaciones de hba.com: reveal atado al scroll, hero fijo, galería
  anclada, secciones que cambian de color. El más rico y el que más scroll cuesta.

El paquete define cómo se MUEVE, nunca cómo se ve: no toca color, tipografía
ni composición. Se combina con la estética: *"estética M con las animaciones
de HBA"*.

Si quiere afinar, se piden letras sueltas de la A a la H.
Avisá si la combinación no cierra (por ejemplo N con HB: en legal se lee frívolo).

### 9 — Navegación

"¿Nav por defecto o lo configuramos?"
Si dice por defecto, usá los valores de `references/construccion.md` y seguí.
Si dice configurar, andá parámetro por parámetro: modo, alto, posición del
logo, posición y estilo de la hamburguesa, cómo se abre el menú, botón de
WhatsApp (si va, forma y posición).

### 10 — Acción principal

Qué tiene que hacer quien entra: confirmar asistencia, escribir por WhatsApp,
agendar, comprar, o solo enterarse.

### 11 — Datos reales

Nombres, fechas, direcciones, teléfono, Instagram, ubicación.
**No inventes ninguno.** Lo que falte va marcado como `PENDIENTE` en el código
y se avisa al final.

---

## Bloques según tipo de sitio

**Invitación** — quién invita · fecha y hora grandes · lugar con link a Maps ·
cuenta regresiva · código de vestimenta · confirmación · datos de regalo ·
galería o subida de fotos si aplica.

**Landing de negocio** — quién es y qué hace · servicios · prueba social ·
ubicación · WhatsApp.

**Catálogo** — productos en tarjetas · lista acumulable · botón que abre
WhatsApp con el pedido escrito · aclaración de qué es muestra.

**Institucional** — hero · quiénes somos · áreas · equipo · contacto.

**Portfolio** — hero con declaración · trabajos · sobre mí · contacto.

---

## Innegociables

Estas no se preguntan. Aplican siempre.

**Móvil manda.** Se diseña a 375px primero. Si se rompe ahí, está roto.
La clienta aprueba desde el celular.

**El código va separado por dispositivo.** `movil.css` y `escritorio.css`
son archivos distintos y se trabajan por separado. Ver `construccion.md`.

**Scroll siempre nativo.** Nunca Smooth Scrollbar, Locomotive, Lenis,
ScrollSmoother ni implementaciones propias que bloqueen el body.

**Hero a pantalla completa con scroll cue** en todas las webs.
`min-height` con `svh`, nunca `height`, nunca `dvh`.

**Textos de borrador con límites duros.** Ver `contenido.md`.
El borrador es para que la clienta VEA, no para que lea.

**Íconos de librería, nunca dibujados a mano.** Lucide para interfaz,
Simple Icons para marcas. Siempre en sprite inline.

**Fotos de banco descargadas al proyecto.** Nunca enlazadas por URL.
Nunca una foto de persona presentada como alguien real del negocio.

**Nada de contenido inventado que se confunda con real.** Si un producto,
precio o reseña es de muestra, se dice en pantalla.

**Nada de promesas de salud ni de resultados.**

---

## Firma Livo

**Rebordes finos.** 1px, nunca 2. Color `currentColor` a 12–18% de opacidad,
no un gris fijo. El reborde reemplaza a la sombra: si hay reborde, no va
`box-shadow`.

**Animaciones al scroll, suaves.** 800ms, `cubic-bezier(.16, 1, .3, 1)`,
escalonado de 90ms. Un solo eje por vez.

**Glassmorphism condicional.** Livo lo usa, pero no en todo. Habilitado en
tech, minimalista, moda, salud e inmobiliaria (solo sobre foto). No va en
legal, constructor, rural, editorial, artesanal ni gastronomía.
Cuando el registro lo habilita, **preguntá** si lo quiere en ese proyecto.

Especificaciones en `references/construccion.md`.

---

## Nunca

- Texto justificado **sin** `hyphens: auto` y `lang="es-UY"`.
  Justificar está permitido en registro formal, pero sin partición de palabras
  abre ríos de espacio en columna angosta.
- Gradiente violeta a azul, tarjetas dentro de tarjetas.
- Glassmorphism sobre fondo de color plano.
- Emoji como iconos de sección.
- `overflow: hidden` en el hero.
- Puntos suspensivos por recorte de texto.

---

## Archivos de referencia

- `references/tokens.css` — medidas, escala tipográfica y paletas
- `references/construccion.md` — hero, nav, animaciones, glass, íconos,
  barras del sistema, arquitectura de archivos, navegación
- `references/contenido.md` — límites de texto y fotos
- `references/checklist.md` — verificación antes de entregar
- `references/esteticas-livo.md` — estéticas L, M y N para clonar enteras
- `references/catalogo-efectos.md` — efectos A a H medidos de sitios reales

Abrilos cuando los necesites, no antes.

---

## Decisiones pendientes de Santi

Marcadas para resolver. Preguntá si el proyecto las toca:

- Header sobre el hero: ¿transparente que toma fondo a los 80px, o sólido
  desde el principio?
- `--fs-h2`: 28px o 32px (Livo usa 32, martinaxv 28.8)
- Tonos `fresco` y `romantico` de `tokens.css`: propuestos, sin validar
