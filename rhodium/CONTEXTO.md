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

## PENDIENTE

- Logo en SVG o PNG más grande: el original que hay (img/logo.png) mide 186×49 y se ablanda si se agranda.
- Retratos reales del Dr. Mantrana y la Dra. Grundinger.
- Foto real del consultorio para el hero.
- Biografía de la Dra. Grundinger (la web vieja solo trae el título).

## Cómo se generó

Los tres HTML salieron de un script que repite header, menú y pie idénticos.
De ahora en más se editan a mano: si cambia el header o el pie, cambiarlo en los tres archivos.
