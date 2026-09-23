# Rhodium Plastic Surgery — borrador

Cirugía plástica en Montevideo. Web vieja: rhodiumplasticsurgery.com (de ahí salen los datos reales).

## Decisiones de la entrevista

- **Tipo:** sitio institucional, **páginas separadas** (Santi cambió del híbrido mixto el 23/9).
  Cada ítem del menú abre su página: nosotros, procedimientos, filosofia, proceso y contacto (.html).
  El inicio conserva todas sus secciones, y cada una termina en un botón con flecha hacia su página
  Ya no hay leyenda ↗/↓ en el menú.
- **Numeración del inicio = orden del menú:** 01 Nosotros · 02 Procedimientos · 03 Filosofía ·
  04 Proceso · 05 Contacto, y las secciones van en ese orden (las bandas de foto no llevan número).
  Nada en el inicio que no pertenezca a una página del menú: Materiales se mudó a procedimientos.html
  (sección 02, a pantalla completa).
- **Contacto del inicio:** sencillo, con dirección, horario, WhatsApp y un mapa de Google
  (iframe `maps/embed`, oscurecido con filtros CSS). Es una `.pantalla` (40px arriba y abajo): el mapa
  absorbe lo que sobra; bajo 600px de alto se esconde el horario. El completo está en contacto.html.
- **Contacto sobre foto** (título, WhatsApp y datos en vidrio) va **solo en contacto.html**.
  Santi pidió sacarlo del final de las demás páginas: para eso está la página de contacto.
- **Estética:** de cero, con dos referencias en `refs/`.
- **Color:** monocromo y bien dark, sacado de cuantizar las refs (`css/tokens-proyecto.css`).
  Sin acento de color; todas las fotos van en blanco y negro.
- **Registro:** moda y belleza. Composición mezclada: foto a sangre + secciones de revista.
- **Tipografía:** Italiana (títulos, local en `fonts/`) + Neue Haas Grotesk Display Pro 300
  (cuerpo, reutilizada de fabianamartinez).
- **Movimiento, por sección:** D hero fijo (sticky, sin spacer) · G título por palabras en Filosofía ·
  E tarjetas apiladas con sticky en Procedimientos · C reveal atado al scroll en las bandas de foto (GSAP) ·
  I marquee con foto en Materiales · B apariciones en el resto. Sin preloader.
- **Nav:** como Los Paraísos: logo + botón WhatsApp + hamburguesa, panel desde la derecha.
  Transparente → glass sobre el hero → sólido.
- **Glass:** sí, solo sobre foto (nav sobre el hero, botón del hero, rótulos de bandas, datos de contacto).
- **Acción principal:** WhatsApp +598 93 873 857.
- **Instagram de la clínica:** @rhodiumsurgery (confirmado por Santi; el @rhodium_ps de la web vieja no va).
- Santi pidió **no** mostrar en pantalla avisos de "foto de muestra": el cliente sabe que es borrador.
  Las fotos de muestra están marcadas solo en comentarios del HTML.
- Sin antes/después (promesa de resultados): en su lugar va la sección Proceso.
- Los cirujanos van con sus fotos reales (las pasó el cliente, en blanco y negro): img/mantrana.jpg e img/grundinger.jpg. María Verónica Sánchez (atención al paciente) también, en su recuadro de nosotros.html: img/sanchez.jpg.

## Pantalla completa (metodología de fabianamartinez)

- `.pantalla` en `movil.css`: `min-height: calc(var(--vh100, 100svh) - var(--nav-alto))`, con `--vh100`
  medido en `js/main.js` (resize, orientationchange y visualViewport.resize). Nunca `height`.
- Nosotros (adelanto del inicio) son dos `.pantalla`: encabezado + Dr. Mantrana, y Dra. Grundinger + botón.
  La foto es `flex: 1` y absorbe lo que sobra: la pantalla mide exacto sin aire suelto.
  En pantallas bajas (`max-height: 740px`) se saca la descripción; en `max-height: 600px` también la bajada.
- Verificado exacto de 320×568 a 1920×1080. Si se le agrega contenido, volver a medir en pantallas chicas.
- Materiales (hoy en procedimientos.html) y Proceso también son una `.pantalla` (sección con `.seccion--pantalla`, sin padding propio).
  Materiales: el marquee absorbe lo que sobra. Proceso: los cuatro pasos se reparten el alto; en escritorio,
  número grande arriba y texto abajo. Compresiones por `max-height` (860 / 740 / 680 / 660 / 600px).
- Margen de cada pantalla: **40px arriba y abajo, fijo en todos los tamaños** (como #nosotros de Fabiana).
  Las compresiones por altura achican solo el aire de adentro, nunca ese margen. Medido con el borde
  visible del contenido (texto, foto, filete): 40px ±3 de interlineado en todas.
- El resto de las secciones (Filosofía, Procedimientos, Contacto y las de nosotros.html y procedimientos.html)
  también van con 40px arriba y abajo: `--sp-seccion: 40px` en `tokens-proyecto.css`, celular y escritorio.
- Filosofía y Contacto quedan como estaban (Santi eligió solo Materiales y Proceso).
- Foto de Materiales: jeringa sobre negro (Pexels 5857416, `img/materiales.jpg`), en lugar del retrato.

## Procedimientos del inicio — pila anclada (E)

- La sección es una `.pantalla` que se fija con el pin de ScrollTrigger (`[data-pila]`, `js/main.js`).
  Cada tarjeta sube desde abajo y tapa entera a la anterior, que se achica (0.94) y se apaga con
  un velo negro opaco (`--apagado` en `::after`). Nunca con `opacity`: se ve a través.
- Recorrido: 80% de pantalla por foto en celular, 100% en escritorio, más un respiro con la última.
- Sin JS o con movimiento reducido no se agrega `.pila-activa` y queda la lista de tarjetas normal.

## Hero del inicio

- Foto real de la recepción (la pasó el cliente), en blanco y negro como el resto: `img/hero.jpg`.
- Trae el ícono de Gemini abajo a la derecha (a ~90% del alto de la imagen). Lo tapa el degradé de
  `.hero--inicio::before`, que llega a negro pleno al 85%. La foto se ancla arriba en celular
  (`object-position: 50% 0%`) y al 46% en escritorio. Verificado en 13 tamaños: el ícono queda
  siempre bajo negro pleno o fuera de cuadro. Si se cambia el encuadre o el degradé, volver a verificar.

## PENDIENTE

- Logo: el original en alta (img/logo.png?v=2, 858×164, fondo transparente). En el nav: clamp(17px, 5.8vw, 26px) en celular para que entre el botón «Consultar» con texto, 48px en escritorio. Si el cliente tiene SVG, mejor todavía.
- Caché: la web manda CSS y JS con 4 h de caché. Cada vez que cambian, subir el ?v= en los tres HTML.
- Foto del hero en horizontal o en más resolución: la que hay (img/hero.jpg) es vertical de 720×1452; en escritorio se amplía al doble y se ve blanda.
- Biografía de la Dra. Grundinger (la web vieja solo trae el título).

## Pie

- Columnas: Páginas · Contacto, con íconos: Instagram, WhatsApp, mail, horario y un mapa chico de Google
  (el iframe no recibe toques para no atrapar el scroll; tocarlo abre Maps). Sin teléfono: ya está en el nav.
- Logo centrado con 48px arriba y abajo; debajo, solo «© 2026 Rhodium Plastic Surgery» centrado.

## Cómo se generó

Los seis HTML repiten header, menú y pie idénticos (el ítem de la página actual lleva `aria-current="page"`).
Si cambia el header o el pie, cambiarlo en los seis archivos.
