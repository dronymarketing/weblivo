# Parking Despegar — borrador

Parking a metros del aeropuerto de Carrasco (Av. Wilson Ferreira Aldunate 5536, Paso de Carrasco,
frente al aeropuerto viejo). Branding hecho por Livo (`refs/branding.jpg`). Instagram de la clienta:
@parkingamtsaeropuerto (de ahí salen los datos, las reseñas y el flyer de `refs/`).

## Decisiones de la entrevista

- **Tipo:** landing de negocio con **páginas independientes y adelantos en el inicio, como Rhodium**
  (Santi, 30/9). Menú: 01 Inicio · 02 Servicio · 03 Valet · 04 Opiniones · 05 Contacto, cada uno su archivo.
  Las secciones del inicio y el rótulo del hero de cada página interna llevan ese mismo número
  (02 a 05); cada sección del inicio termina en un botón hacia su página. Adentro de cada página
  interna, sus secciones se numeran solas desde 01.
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
  (130px, cede alto en pantallas bajas), Instagram y debajo, a la izquierda, el rótulo del hero (punto naranja
  y «A metros del aeropuerto · 24 h»). Un solo aire entre todo (`--menu-aire`: 24px, 18px ≤740 de alto, 12px ≤620).
  Títulos del menú en naranja; números y flechas en navy. Numerado 01 Inicio a 05 Contacto.
  Barras del teléfono (Santi, 30/9): la de arriba (`theme-color`) y la de abajo arrancan con el color
  del hero (#F1F6F4 en el inicio, navy en las internas) y pasan al navy #053F5C cuando el pie entra en
  pantalla; al subir vuelven. Con el menú abierto, blancas. Lo hace `barrasSegunScroll()` en
  `js/main.js`: cambia el meta, el fondo del `<html>` (Chrome en Android pinta la de abajo con el
  fondo de la raíz) y `--barra-inferior`.
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

## Cambios del 30/9 (tarde)

- **Ubicación:** todos los links a Maps usan el de la clienta (https://maps.app.goo.gl/uS7X1yYPPpoTixBLA,
  ficha «Parking techado a metros del Aeropuerto») y los mapas embebidos marcan el punto exacto
  (-34.8468707, -56.0265147).
- **+600 reseñas** con contador que sube de 0 a 600 la primera vez que se ve (`[data-contador]`).
- **Reseñas que se intercalan** en el adelanto del inicio (`[data-rota]`): fundido cada 6 s, se pausa
  con el dedo encima y fuera de pantalla, puntos para pasarlas a mano. Hoy son las dos reales que
  tenemos. Las reseñas de Google no se pueden sacar automáticamente (no vienen en la página y
  scrapearlas va contra sus condiciones): **PENDIENTE que la clienta mande más** (capturas o textos).
- **Apariciones en las pantallas completas:** cada elemento aparece mientras entra por abajo del
  celular (ScrollTrigger: `trigger` el elemento, `start: 'top bottom'`) y termina justo cuando la
  pantalla llega bajo el nav (`endTrigger` la pantalla). El botón «Ver…», que es lo último, se completa
  al llegar al fondo de la pantalla y no antes (Santi, 30/9).
- La escena 3D deja de dibujar en cuanto el contenido la tapa hasta el nav.

- **Nav de las páginas internas (30/9):** logo, «Reservar», su reborde, la hamburguesa y los links de
  escritorio en blanco; cuando se pone sólido va en navy (el blanco sobre blanco no se leería). Con el
  menú abierto vuelve a naranja/navy sobre el menú blanco. El inicio sigue con el nav naranja.
- **Hero de contacto.html:** el botón «Reservar lugar» va con el título y la bajada; la tarjeta de datos
  queda aparte (abajo en celular, a la derecha sobre la foto en escritorio). Antes el botón quedaba
  pegado debajo de la tarjeta.

- **Vista previa al compartir (WhatsApp, redes):** `img/og-blanco.jpg`, 1200×1200, fondo blanco con el logo
  vertical en naranja (Santi, 30/9). Si se cambia, usar otro nombre de archivo: WhatsApp guarda la anterior.

## Reserva online y gestión (6/10)

Pedido de la clienta: que el cliente reserve y pague desde la web, y un dashboard para ella y el
personal. Santi mandó de referencia un video de ParkSoft (software comercial colombiano): **no se
copió** (producto y marca de terceros); se hizo un sistema propio con la lógica de un parking de
aeropuerto y la estética del branding. Alcance elegido: **borrador funcional** con datos de muestra,
pasarela de pago **simulada** y **tarifas de muestra** editables.

- `js/datos.js` — capa de datos `window.PD` (reservas, lugares A-01…A-24 techado y B-01…B-36 aire
  libre, caja, usuarios, auditoría). Hoy vive en `localStorage` (`pd-datos-v1`) y se sincroniza entre
  pestañas con el evento `storage`: si en una pestaña se reserva desde la web, el dashboard abierto en
  otra avisa al instante. Todas las pantallas usan solo esa API, así que pasar a producción es
  cambiar ese archivo por una base real.
- `reservar.html` + `js/reservar.js` — 4 pasos (fechas y vuelo · lugar y servicio · auto y datos ·
  resumen y pago), precio y lugares libres en vivo, pasarela de prueba (no pide datos de tarjeta),
  confirmación con código `PD-xxxx` y envío por WhatsApp. El nav «Reservar», el botón del menú y el
  del hero del inicio llevan acá; los demás botones de WhatsApp siguen como estaban.
- `panel/` — gestión (`noindex`). Usuarios de prueba `admin` / `personal` / `chofer`, contraseña
  `despegar`. Secciones: Panel del día, Reservas (filtros, búsqueda, detalle, nueva reserva por
  WhatsApp o mostrador), Registrar llegada (buscador apto para lector de código, lugar sugerido,
  cobro opcional, comprobante con código de barras Code128 vía `panel/lib/JsBarcode`, MIT), Retiros y
  cobro (días reales, vuelto, libera el lugar), Traslados (camioneta: salida +15 min de la llegada,
  búsqueda +25 min del aterrizaje), Lugares (mapa por zona), Caja (base, movimientos, egresos,
  cierre con conteo: cuadra / sobra / falta; lo online va aparte), Clientes; y solo para la dueña:
  Reportes (recaudado por día, por medio, por tipo de lugar, por origen; CSV e impresión), Tarifas
  (con simulador; se aplican en la web al instante), Usuarios y Sistema (respaldo JSON, restaurar,
  volver a la muestra, registro de cambios). El chofer solo ve Traslados.
- Estilos propios en `panel/css/movil.css` y `panel/css/escritorio.css` (≥ 1024px: lateral fijo y
  tablas; en celular las tablas pasan a tarjetas y el lateral es un cajón).

**Sin avisos de borrador en pantalla (Santi, 6/10):** se sacaron «Borrador», «de muestra», «de prueba» y
las notas internas de la reserva y del panel; la clave de `localStorage` pasó a `pd-datos-v2`.
Ojo: la pasarela sigue siendo simulada aunque ya no lo diga — no compartir `reservar.html` con clientes reales.

**Rediseño para que se entienda (Santi, 6/10):** el panel se ordena en cinco sectores, cada uno con su
color (variantes del azul y el naranja de marca): **Hoy** (navy), **Autos en el predio** (azul: Entra un
auto, Sale un auto, Camioneta, Lugares), **Reservas** (celeste: Reservas, Clientes), **Plata** (naranja:
Caja, Reportes, Precios) y **Ajustes** (ámbar: Equipo, Respaldos). Cada pantalla abre con sector, título
grande y una línea que dice para qué sirve. «Hoy» arranca con tres atajos (Entra un auto, Sale un auto,
Nueva reserva) y una sola agenda del día con llegadas y salidas por hora. Colores en `panel/css/movil.css`
(`[data-sector=…]`: `--s`, `--s-fondo`, `--s-texto`, `--s-claro`).

**Para ponerlo en producción:** base de datos en la nube con usuarios reales (por ejemplo Supabase),
cuenta de la clienta en una pasarela uruguaya (Mercado Pago, dLocal Go, Plexo o la de su banco) con
webhook que confirme el pago, tarifas reales, recordatorio por WhatsApp un día antes.

## PENDIENTE

- **Licencia de IT Inktura:** la versión demo es de uso personal y no trae tildes ni números. Hace
  falta la licencia web (Indotype). Con la completa se pueden poner tildes en los títulos.
- **Valet — devolución del auto:** el paso 04 dice «Coordinamos cómo te lo devolvemos». Confirmar con
  la clienta si se entrega en la terminal o en el parking.
- Más reseñas reales de Google para el carrusel (hoy rotan dos).
- Mail de contacto (no aparece en ningún lado).
- **Tarifas reales** (hoy de muestra: techado $ 490/día, aire libre $ 390/día, valet $ 450).
- **Backend real y pasarela de pago:** cuentas a nombre de la clienta (ver «Reserva online y gestión»).

## Cómo se generó

Las seis páginas repiten sprite, header, menú y pie idénticos (el ítem de la página actual lleva
`aria-current="page"`). Si cambia el header o el pie, cambiarlo en los seis archivos.
Caché: CSS y JS con `?v=1` (movil.css `?v=15`, escritorio.css `?v=9`, main.js `?v=5`, escena.js `?v=2`, base.css `?v=4`, tokens-proyecto.css `?v=3`, datos.js `?v=3`, reservar.js `?v=2`; en `panel/`: movil.css `?v=5`, escritorio.css `?v=2`, app.js `?v=4`); subirlo en los seis HTML (y en `panel/index.html` si cambia `datos.js`) cada vez que se tocan.
`reservar.html` se armó tomando cabeza y pie de `contacto.html`.
