# Estéticas base — clonar una web de Livo entera

Cuando Santi diga *"quiero la estética de Martina"* o *"como Livo"*, **no
inventes nada**: usá los valores de acá tal cual. Son medidos de sus webs
en producción, no aproximados.

Se piden por letra: **L**, **M**, **N**.

| Letra | Estética | De dónde | Para qué sirve |
|---|---|---|---|
| **L** | Livo | livo.com.uy | portfolios, marcas de diseño, estudios creativos |
| **M** | Martina | livo.com.uy/martinaxv | invitaciones, XV, casamientos, eventos |
| **N** | Nexa | nexalegales.com | legal, institucional, servicios profesionales |

Cuando se elige una estética base, **se saltean las preguntas de color,
registro, tipografía y composición**: ya están respondidas. Solo se pregunta
el contenido.

Si Santi quiere una variante ("como Martina pero en verde"), tomá la estética
completa y cambiá solo lo que pidió. Todo lo demás queda igual.

---

## L · Estética Livo
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

Cada sección toma un color distinto de la paleta, en este orden:
hero marrón → crema → oliva → beige → stone.

### Tipografía

- **Display:** Catavalo, peso 300. h1 40px móvil, h2 32px. Tracking −0.02em.
- **Cuerpo:** Montserrat, peso 300.
- **Micro:** mayúsculas 10–11px, tracking 0.12em a 0.22em.

> **Ojo:** el cuerpo de livo.com.uy está en **13px**, por debajo del piso de
> 16px del estándar. Es la única web de Livo que lo incumple. Preguntá si lo
> mantiene o lo sube.

### Detalles que la definen

- Título del hero en tres niveles: peso normal, peso 600 en beige, y una línea
  en contorno con `-webkit-text-stroke: 1px rgba(229,225,224,.35)`.
- Nav con vidrio: `rgba(255,255,255,.05)` + `backdrop-filter: blur(20px)`,
  borde inferior de 0.5px.
- **Nav horizontal completo también en móvil**, a propósito, para que se sienta
  escritorio en el celular. Es su firma, no un error.
- Botones cápsula (999px), texto 10–11px en mayúsculas con tracking 1.2px.
- Hover de botón: `translateY(-2px)` + sombra ancha y suave.
- Hero con dos gradientes radiales encima del marrón, uno arriba a la derecha
  en beige y otro abajo a la izquierda en oliva, los dos muy sutiles.
- Punto verde pulsante de "Disponible para proyectos".
- Rebordes de 0.5px, no de 1px.
- `theme-color` interpolado por sección al hacer scroll.

### Medidas

Contenedor 1100px · secciones 80px arriba / 40px abajo · nav 60px móvil,
72px escritorio · botones 38–41px de alto.

---

## M · Estética Martina
**Fuente: livo.com.uy/martinaxv — invitación de XV**

Ceremonial, nocturna, dorada. Todo centrado, mucho aire, ritmo lento.

### Paleta

```css
--navy:      #0A1A3D;              /* fondo principal */
--violeta:   #2D1B4E;              /* fondo secundario */
--dorado:    #F0BD5C;              /* acento */
--dorado-cl: #F5D28E;              /* acento claro */
--velo:      rgba(240,189,92,.06); /* capa sobre fondos */
```

### Tipografía

- **Display:** Marcellus, peso 400. h2 28.8px, h3 22.4px.
- **Cuerpo:** Cormorant Garamond, 16px, interlineado 1.8.
- **Lo que la define:** el cuerpo lleva `letter-spacing: 0.2em` y va
  **centrado**. Ese tracking amplio en texto corrido es lo que le da el aire
  ceremonial. Sin eso, la estética se cae.

### Detalles que la definen

- **Sin nav.** Es una página inmersiva. Si hay muchas secciones, índice al pie.
- Primera pantalla completa, oscura, con una frase centrada y un
  "EXPLORÁ" con flecha abajo.
- Columna de lectura muy angosta: 340–420px. Las líneas cortas son parte del
  efecto, no una limitación.
- Botones cápsula de 52px de alto, texto 16.8px.
- Apariciones al hacer scroll, lentas.

> **Corregir al reusarla:** en martinaxv, con scroll rápido quedan bloques en
> `opacity: 0`. Al clonar la estética, el estado inicial se aplica **solo desde
> JS**: si el JS no corre, todo se ve.

### Medidas

Columna 340–420px · secciones 72px arriba y abajo · botones 52px.

### Bloques típicos

Quién invita · fecha y hora grandes · lugar con link a Maps · cuenta regresiva ·
código de vestimenta · confirmación · datos de regalo · subida de fotos.

---

## N · Estética Nexa
**Fuente: nexalegales.com — estudio jurídico**

Sobria, institucional, densa. Contraste alto, cero decoración.

### Paleta

```css
--navy:   #0F193A;   /* dominante */
--blanco: #FFFFFF;   /* fondo */
```

Dos colores y nada más. Esa austeridad es la estética.

### Tipografía

- **Display:** serif o sans institucional, peso 500, tracking ligeramente
  negativo.
- **Cuerpo:** 16px, interlineado 1.5.
- **Justificado.** Es decisión del cliente y Santi la comparte: en registro
  formal el justificado funciona.

> **Corregir al reusarla:** Nexa tiene `hyphens: manual`, y por eso el
> justificado abre ríos de espacio en móvil. Al clonar la estética va
> `hyphens: auto` con `lang="es-UY"`. Mismo efecto formal, sin los agujeros.

### Detalles que la definen

- Header de 69px, **absoluto**: se va con el scroll, no queda fijo.
- Logo a la izquierda, hamburguesa a la derecha, fondo sólido navy.
- Botones **rectos**, radio 0, alto 53–56px.
- Texto sobre foto con capa oscura y desenfoque por detrás.
- Link de "Saltar al contenido" al principio. Es el único de los tres que lo
  tiene y va al estándar.
- Títulos de sección en mayúsculas, grandes, centrados.

### Medidas

Contenedor 1400px · columna de lectura 500px · header 69px · botones 53–56px.

---

## Cómo combinarlas con el catálogo de efectos

La estética define **cómo se ve**; el catálogo define **cómo se mueve**.
Se piden juntas: *"estética M con los efectos B y G"*.

Combinaciones que funcionan:

- **L** + D (hero fijo) + F (secciones con color) + G (texto por palabras)
- **M** + B (reveal por clase) + A (preloader) — nada atado al scroll: el
  registro ceremonial pide movimiento lento y simple
- **N** + B y nada más. En legal, cuanto menos movimiento, más confianza.

Lo que no va: **N con E o con G**. Una galería anclada o texto animado letra
por letra en un estudio jurídico se lee frívolo.
