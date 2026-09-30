# Parking Despegar — borrador

Parking a metros del aeropuerto de Carrasco (Av. Wilson Ferreira Aldunate 5536, Paso de Carrasco,
frente al aeropuerto viejo). Branding hecho por Livo (`refs/branding.jpg`). Instagram de la clienta:
@parkingamtsaeropuerto (de ahí salen los datos, las reseñas y el flyer de `refs/`).

## Decisiones de la entrevista

- **Tipo:** landing de negocio con **páginas independientes y adelantos en el inicio, como Rhodium**
  (Santi, 30/9). Menú: 01 Servicio · 02 Valet · 03 Opiniones · 04 Contacto, cada uno su archivo.
  El inicio numera sus secciones en ese orden y cada una termina en un botón hacia su página.
- **Web en 3D:** la escena cuenta el servicio mientras se scrollea (ver «Escena 3D»). Santi pidió
  algo simple: llega el cliente, deja el auto y **un vehículo del parking, en naranja para distinguirlo**,
  lo lleva al aeropuerto. Estilo de la referencia `refs/ref-3d.png`: maqueta blanca con el lugar
  reservado en holograma azul.
- **Color:** la paleta del PDF (`css/tokens-proyecto.css`). Base clara #F1F6F4, navy #053F5C para
  texto y bandas oscuras, naranja #FF6712 de acento. El naranja nunca en texto chico (2,9:1):
  filetes, íconos, números grandes, la palabra «despegar» del hero y la camioneta 3D.
- **Registro:** tech (3D, cápsulas). Botones cápsula; tarjetas con radio 20/24px como las piezas del branding.
- **Glass:** sí, solo sobre la escena 3D, las fotos y el video (Santi eligió la opción 1).
- **Tipografía:** IT Inktura (títulos en mayúscula) + Neue Haas Grotesk Display Pro 400/500
  (cuerpo y titulares con tilde), reutilizada de fabianamartinez como en Rhodium.
  **La Inktura que mandó la clienta es la DEMO:** trae solo A–Z y a–z (sin tildes, ñ, ¿ ni números).
  Por eso los títulos en Inktura están escritos sin tildes (LLEGADA, EL SERVICIO, LO QUE DICEN,
  TU LUGAR TE ESPERA…) y el titular del hero, que lleva tilde, va en Neue. `fuentes.css` limita la
  Inktura con `unicode-range`: lo que no trae lo dibuja Neue.
- **Nav:** como Rhodium: logo · «Reservar» (WhatsApp) · hamburguesa, panel desde la derecha.
  El logo y la palabra «Reservar» del botón del nav van en naranja (Santi, 30/9); el botón sigue con reborde fino, sin relleno.
  El nav sólido es blanco, para que no se pierda sobre las pantallas claras (Santi, 30/9).
- **Menú en el celular (Santi, 30/9):** pantalla completa, fondo blanco y sin scroll. Con el menú
  abierto se esconde «Reservar» del nav. Debajo de los ítems: botón «Reservar lugar», mapa chico
  (130px, cede alto en pantallas bajas), Instagram y debajo, a la izquierda, el reloj con «Abierto las
  24 horas». Un solo aire entre todo (`--menu-aire`: 24px, 18px ≤740 de alto, 12px ≤620).
  Títulos del menú en naranja; números y flechas en navy. Primer ítem «00 Inicio».
  La barra inferior de Android va en blanco puro: el `html` tiene fondo #FFFFFF (Chrome la pinta con
  el fondo de la raíz) y la franja `body::after` también; la de arriba, con el menú abierto.
- **Nav de escritorio (Santi, 30/9, ahora regla de livo-design):** sin hamburguesa ni menú; los
  links a la vista en naranja (Inicio, Servicio, Valet, Opiniones, Contacto), con más aire entre ellos, con filete bajo la página actual. Entre 768 y 959px el botón
  de WhatsApp queda solo con el ícono para que todo entre en una línea.
  En el inicio: transparente → vidrio sobre la escena → sólido cuando el contenido la tapa.
  En las internas arranca en blanco sobre la foto (`nav--sobre-foto`).
- **Acción principal:** WhatsApp 099 114 144 (+598 99 114 144) con mensaje precargado.
  El de Valet dice «Hola, quiero reservar el servicio de Valet Parking.».

## Escena 3D (index.html)

- Three.js empaquetado en `js/escena.js` (fuentes y cómo empaquetar en `src/LEEME.md`).
  Autos de Kenney Car Kit (CC0), pintados en blanco arcilla; el del cliente con vidrios oscuros;
  la camioneta del parking en naranja con el isotipo en los costados; cartel naranja con el logo
  junto al portón; terminal con el techo en arco de Carrasco, torre, pista y avión con cola naranja.
- `.escena` es `sticky` detrás del hero y de los cuatro pasos (`100lvh`, margen negativo: no se
  redimensiona cuando aparece la barra del navegador). Lo que sigue (`.sobre-hero`) la tapa y
  ahí deja de dibujarse.
- Cuatro pasos (`[data-paso]`), cada uno de 175svh con su tarjeta de vidrio pegada abajo (sticky):
  01 Llegada (el auto entra y el holograma marca su lugar) · 02 Entrega (estaciona, baja con la
  valija y camina a la camioneta) · 03 Traslado (la camioneta va por la avenida hasta la terminal)
  · 04 Despegue (la cámara pasa sobre la terminal y acompaña al avión).
  La escena mapea el scroll a una etapa `s` de 0 a 4; `?s=2.5` en la URL la fija (para revisar).
- Scroll nativo: la escena solo lee la posición. Sin WebGL o sin JS queda la imagen de respaldo
  (`img/escena-movil.jpg` / `img/escena-escritorio.jpg`, cuadros de la misma escena) y las tarjetas
  se leen igual.
- En celular la cámara se aleja (el cuadro vertical es angosto) y la imagen se corre hacia arriba
  para la tarjeta; en escritorio la tarjeta va a la izquierda y la escena se corre a la derecha.

## Pantalla completa (metodología de Rhodium)

- `.pantalla`: `min-height: calc(var(--vh100, 100svh) - var(--nav-alto))`, 40px arriba y abajo fijos.
  Lo que sobra lo absorbe el video, el mapa o la grilla; en pantallas bajas se comprime el aire y
  se esconden bajadas y descripciones con `@media (max-height: …)`, nunca el margen.
- Verificado exacto con Playwright: celular de 320 a 414 de ancho y 568 a 932 de alto; escritorio
  1024×768, 1440×900 y 1920×1080. Todas las `.pantalla` de las cinco páginas.
  Si se agrega contenido, volver a medir en pantallas chicas.
- La primera sección de contacto.html (`.pantalla--primera`) mide como el hero: 100svh.

## Páginas internas

- Hero partido en escritorio: texto sobre navy a la izquierda y la foto o el video reales (verticales,
  del celular de la clienta) a la derecha, al 44%: no se agrandan más de lo que dan.
  En celular la foto va a sangre con velo navy.
- servicio.html: cinco pasos · todo incluido · fotos reales del predio.
- valet.html: el video de fondo en el hero (con pausa) · cuatro pasos · el video completo con sonido
  opcional · fotos.
- opiniones.html: +400 y el resumen de Google · las dos reseñas · lo que destacan (los cuatro valores
  de su publicación «Lo que dicen nuestros clientes»).
- contacto.html: datos en vidrio sobre la foto del frente · cómo llegar con el mapa.

## Fotos y video

- **Todas las fotos son reales:** cuadros del video de Valet Parking que mandó la clienta
  (`img/foto-*.jpg`, 720×1180, recortadas arriba para sacar la marca de CapCut).
- `img/valet-loop.mp4`: 22 s del video, sin sonido (inicio y hero de valet). `img/valet.mp4`: el
  completo, 540×960 con sonido (valet.html, `preload="none"`).
- En opiniones el hero es la salida de la terminal y no la foto de la entrega, para no dar a
  entender que la persona de la foto escribió una reseña.

## Contenido real y de dónde sale

- Pasos del servicio, «traslado inmediato», «a 5 minutos», «te recordamos tu reserva y te enviamos
  la ubicación 24 h antes», «parking cerrado (techado y no techado)», «monitoreado y cercado»,
  «24 horas»: del flyer `refs/flyer-verano.jpg` y del perfil de Instagram.
- Reseñas de Da ni y Natalia Liscano, +400 reseñas y el resumen de Google: de su publicación
  «Lo que dicen nuestros clientes» (`refs/instagram-publicaciones.webp`). Textos tal cual (sin el emoji).

## PENDIENTE

- **Licencia de IT Inktura:** la versión demo es de uso personal y no trae tildes ni números. Hace
  falta la licencia web (Indotype). Con la completa se pueden poner tildes en los títulos.
- **Valet — devolución del auto:** el paso 04 dice «Coordinamos cómo te lo devolvemos». Confirmar con
  la clienta si se entrega en la terminal o en el parking.
- Más reseñas reales de Google, si la clienta quiere sumar.
- Mail de contacto (no aparece en ningún lado).
- Precios o tarifas: no se muestran.
- Barras del sistema: `theme-color` fijo por página (claro en el inicio, navy en las internas).

## Cómo se generó

Las cinco páginas repiten sprite, header, menú y pie idénticos (el ítem de la página actual lleva
`aria-current="page"`). Si cambia el header o el pie, cambiarlo en los cinco archivos.
Caché: CSS y JS con `?v=1` (movil.css `?v=8`, escritorio.css `?v=4`, tokens-proyecto.css `?v=2`, main.js `?v=2`, base.css `?v=2`); subirlo en los cinco HTML cada vez que se tocan.
