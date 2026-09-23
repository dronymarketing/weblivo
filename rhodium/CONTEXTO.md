# Rhodium Plastic Surgery — borrador

Cirugía plástica en Montevideo. Web vieja: rhodiumplasticsurgery.com (de ahí salen los datos reales).

## Decisiones de la entrevista

- **Tipo:** sitio institucional, **híbrido mixto**. Nosotros y Procedimientos son páginas propias
  con adelanto en el inicio; Filosofía, Proceso y Contacto son anclas del inicio.
  En el menú, ↗ = página, ↓ = ancla del inicio.
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
- Santi pidió **no** mostrar en pantalla avisos de "foto de muestra": el cliente sabe que es borrador.
  Las fotos de muestra están marcadas solo en comentarios del HTML.
- Sin antes/después (promesa de resultados): en su lugar va la sección Proceso.
- Los cirujanos van con fotos de banco no identificables (con tapaboca).

## Pantalla completa (metodología de fabianamartinez)

- `.pantalla` en `movil.css`: `min-height: calc(var(--vh100, 100svh) - var(--nav-alto))`, con `--vh100`
  medido en `js/main.js` (resize, orientationchange y visualViewport.resize). Nunca `height`.
- Nosotros (adelanto del inicio) son dos `.pantalla`: encabezado + Dr. Mantrana, y Dra. Grundinger + botón.
  La foto es `flex: 1` y absorbe lo que sobra: la pantalla mide exacto sin aire suelto.
  En pantallas bajas (`max-height: 740px`) se saca la descripción; en `max-height: 600px` también la bajada.
- Verificado exacto de 320×568 a 1920×1080. Si se le agrega contenido, volver a medir en pantallas chicas.
- Materiales y Proceso también son una `.pantalla` (sección con `.seccion--pantalla`, sin padding propio).
  Materiales: el marquee absorbe lo que sobra. Proceso: los cuatro pasos se reparten el alto; en escritorio,
  número grande arriba y texto abajo. Compresiones por `max-height` (860 / 740 / 680 / 660 / 600px).
- Margen de cada pantalla: **40px arriba y abajo, fijo en todos los tamaños** (como #nosotros de Fabiana).
  Las compresiones por altura achican solo el aire de adentro, nunca ese margen. Medido con el borde
  visible del contenido (texto, foto, filete): 40px ±3 de interlineado en todas.
- Filosofía y Contacto quedan como estaban (Santi eligió solo Materiales y Proceso).
- Foto de Materiales: jeringa sobre negro (Pexels 5857416, `img/materiales.jpg`), en lugar del retrato.

## PENDIENTE

- Logo: el original en alta (img/logo.png?v=2, 858×164, fondo transparente). En el nav: clamp(17px, 5.8vw, 26px) en celular para que entre el botón «Consultar» con texto, 48px en escritorio. Si el cliente tiene SVG, mejor todavía.
- Caché: la web manda CSS y JS con 4 h de caché. Cada vez que cambian, subir el ?v= en los tres HTML.
- Retratos reales del Dr. Mantrana y la Dra. Grundinger.
- Foto real del consultorio para el hero.
- Biografía de la Dra. Grundinger (la web vieja solo trae el título).

## Cómo se generó

Los tres HTML salieron de un script que repite header, menú y pie idénticos.
De ahora en más se editan a mano: si cambia el header o el pie, cambiarlo en los tres archivos.
