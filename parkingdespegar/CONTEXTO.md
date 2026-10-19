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

- **En línea desde el 10/10 (Supabase).** La versión con datos de muestra en el navegador quedó en el
  historial de git. Ahora todo vive en una base en la nube y arranca **vacía**:
  - `supabase/esquema.sql` — se pega una vez en Supabase → SQL Editor → Run (se puede volver a correr
    sin romper nada). Tablas: perfiles, tarifas, empresa, lugares (A-01…A-24 techado, B-01…B-36 predio:
    cantidades a confirmar, se cambian en Precios), reservas, pagos, pagos_web, caja_turnos,
    caja_movimientos, facturas, auditoria.
  - **Seguridad:** RLS en todas las tablas; toda la operación pasa por funciones del servidor que
    controlan el rol y calculan precio y saldo (`crear_reserva`, `registrar_pago`, `registrar_entrada`
    —cobra, asigna lugar y factura en una sola transacción—, `registrar_salida`, `cancelar_reserva`,
    `marcar_traslado`, `abrir_caja`, `egreso_caja`, `cerrar_caja`, `configurar_lugares`). La web anónima
    solo lee tarifas, consulta disponibilidad (`disponibilidad_web`), crea su reserva
    (`crear_reserva_web`) y la paga con un código secreto de un solo uso (`pagar_reserva_web`, la
    pasarela de prueba). Un lugar no puede tener dos autos (índice único). El registro de cambios lo
    escribe el servidor. La dueña no puede quitarse su propio acceso.
  - **Usuarios:** email y contraseña (Supabase Auth). La **primera cuenta que se crea es la dueña**
    (admin). Las demás quedan «Sin acceso» hasta que ella elige el rol (personal / chofer / admin) en
    Equipo; la persona que espera entra sola cuando la aprueban. El chofer solo ve Traslados.
  - `js/config.js` — `url` y `clave` (publishable key, pública por diseño). Vacío = el panel muestra
    «Falta conectar la base de datos» y la reserva web manda a WhatsApp. Nunca poner la secret key.
  - **Proyecto conectado (10/10):** organización «Parking Despegar» en la cuenta de Supabase de Santi,
    proyecto `parking-despegar` (ref `ixryfteknrcghmsxyowp`, São Paulo, plan Free). Confirm email
    apagado, Site URL y Redirect URL = `https://livo.com.uy/parkingdespegar/panel/`.
  - `supabase/vaciar-datos.sql` — borra reservas, pagos, caja, facturas y registro (no usuarios ni
    precios) y reinicia la numeración. Para empezar de cero después de probar.
  - `supabase/de-fabrica.sql` — borra TODO, incluidas las cuentas, y vuelve precios, datos de factura y
    lugares a los de fábrica. Después, la primera cuenta que se crea queda como Administración.
  - **Respaldos (Santi, 10/10):** repositorio privado `dronymarketing/parkingdespegar` (los datos
    nunca van a weblivo, que es público). GitHub Actions copia la base a las 12:00 y a las 00:00 de
    Uruguay en `respaldos/AAAA-MM-DD_HHhMM/` (datos.sql, esquema.sql, estructura.sql, resumen.txt) y
    actualiza `sistema/` con esta carpeta. Se ven 30 días; lo anterior queda en el historial.
    «Restaurar un respaldo» (a mano, escribiendo RESTAURAR) guarda primero cómo está la base y
    restaura todo en una transacción; sirve también para un proyecto nuevo y vacío. Usa el secreto
    `SUPABASE_DB_URL` (Session pooler con la contraseña de la base), que carga Santi en GitHub y
    nunca pasa por el chat. Kit: `supabase/kit-respaldos/` (copia exacta de lo que va en el
    repo privado).
  - **Base en pausa (Santi, 10/10):** el plan gratis pausa tras una semana sin uso. Prevención: el
    respaldo consulta la base dos veces por día (`kit-respaldos/scripts/mantener-activa.sh`). Red de
    seguridad: `PD.salud()` (arranque, cada 5 min, al volver a la pestaña y cuando falla una acción)
    → cartel `data-pantalla="pausa"` que tapa todo, sin cancelar, único botón **Confirmar** →
    `PD.despertar()` → Worker de Cloudflare `supabase/servicio/worker.js` (guarda la llave de
    Supabase; solo `GET /estado` y `POST /reactivar` del proyecto). Se reabre solo al volver la base.
    Sin internet / caída: otro texto, sin botón. La reserva web ofrece WhatsApp, despierta la base y
    reintenta cada 30 s. Dirección del Worker en `js/config.js` → `reactivar` + CSP del panel.
  - **Nombre (Santi, 12/10): «Torre de Parking Despegar», y se la llama «Torre»** (saludo del Worker y
    sección del panel Ajustes → Torre). Nombre visible del número definitivo en Meta: «Torre de Parking Despegar».
  - **Asistente de WhatsApp (Santi, 12/10):** gratis y sin IA, en el mismo Worker (`POST /whatsapp`).
    La dueña escribe o manda audio al número del asistente → firma de Meta verificada → audio a texto
    con Whisper (Workers AI) → temas por palabras clave y período («ayer», «esta semana», «septiembre»)
    → `asistente_consulta(clave, teléfono, desde, hasta)` (anon, solo lectura, exige la clave del
    asistente —en la base solo su huella— y un número habilitado) → respuesta por WhatsApp. A números
    no habilitados no contesta; si la base está en pausa, la despierta. Panel → Ajustes → Asistente
    (solo admin): números habilitados (máx. 10) y «Crear clave» (se muestra una vez). Se carga aparte
    de `cargar()`: si falta correr `supabase/asistente.sql`, la sección lo avisa y el resto anda.
    El bloque SQL está también al final de `esquema.sql` (mantener los dos iguales). Instalación paso
    a paso en `supabase/servicio/LEEME.md`. Si más adelante quieren IA (preguntas libres), se agrega
    en el mismo Worker con Claude y herramientas de solo lectura.
  - **Torre más completa (Santi, 13/10):** saluda según la hora; ficha de cada auto («¿Qué auto es?»,
    lugar A-05, matrícula, código, nombre) con `asistente_buscar()`, que deja ese auto como tema de
    conversación (`asistente_contexto`, 30 min) para que «sí» devuelva su teléfono
    (`asistente_telefono()`, anotado en auditoría como «Torre»); mapa por zonas («¿Qué autos hay?»).
    **Avisos:** disparador `al_cambiar_reserva_avisar` (pg_net) → `POST /aviso` del Worker →
    `asistente_aviso()` (reciente, una sola vez: `asistente_avisos`) → «Hola Mariana, acaba de entrar
    un vehículo nuevo» / «entró una reserva nueva» a cada número habilitado. Se avisa la entrada
    (check-in) y las reservas nuevas: del panel al crearlas, las web recién cuando se pagan. Gratis
    dentro de las 24 h del último mensaje de la dueña (`asistente_telefonos.ultimo_mensaje`); fuera,
    plantilla opcional `WHATSAPP_PLANTILLA` (paga). Variable `WHATSAPP_NUMERO_ID` en Cloudflare.
  - **Ajustes de la clienta (Santi, 19/10)** — el cobro sigue por bloques de 24 h con 3 h de tolerancia
    (decidido: no se cambia).
    · **Cambio de fechas:** `aplicar_fechas()` (controla lugar libre, recalcula el total si todavía no
      entró; si ya está adentro solo cambia la salida y la diferencia se cobra al salir). Panel:
      detalle de la reserva → «Cambiar fechas» (±1 día). Web: `mi-reserva.html` con código + WhatsApp
      (`reserva_web_ver/cambiar`, anon), enlazada en el pie y en la confirmación de la reserva.
    · **Calendario** (Reservas → Calendario): semana con entradas (menta) y salidas (ámbar).
    · **Agenda por hora** (dentro de Entrada, debajo de la búsqueda): 24 h en vertical; colores por categoría (reserva web,
      WhatsApp, mostrador, teléfono, entrada, salida, traslado) con leyenda y cantidades arriba.
    · **Traslados:** se navega por días (◀ fecha ▶).
    · **Caja por turno:** `caja_turnos.turno` diurno (8–20, ámbar) / nocturno (20–8, navy); se abre en
      $ 0 por defecto; historial con quién abrió y cerró; «Cobrado por día» separado por turno (el
      turno cuenta para el día en que abrió).
    · **Horarios:** tabla `asistencias`, `marcar_asistencia()` (botón «Empezar/Terminar jornada» en la
      barra superior y sección Hoy → Horarios; la dueña ve a todos, cada uno lo suyo). Torre avisa
      «empezó / terminó de trabajar» (`al_marcar_asistencia_avisar` → `/aviso` tipos ingreso/egreso) y
      responde «¿quién está trabajando?» con quién marcó entrada.
    · Para aplicarlo en una base que ya funciona: correr `esquema.sql` completo (se puede re-correr).
    · La primera pantalla del menú se llama «Inicio» (antes «Hoy»).
  - **Pago online con dLocal Go (Santi, 19/10):** Checkout estándar (redirección). `reservar.js`: si el
    Worker dice `pagos: true`, «Pagar» crea la reserva, pide `POST /pago/crear` (reserva + token de un
    solo uso) y redirige a dLocal; vuelve a `reservar.html?pago=ok|volver&r=<id>` (token en
    sessionStorage) y `POST /pago/estado` confirma. Aviso firmado HMAC-SHA256(secret, apiKey+cuerpo) en
    `/pago/aviso`. Base: `pago_web_preparar/guardar/estado/confirmar` (clave del servicio = la de Torre),
    `pagos_web.pasarela_id`, `asistente_config.pasarela` ('prueba'→'dlocal' con el primer pago real; ahí
    `pagar_reserva_web` deja de andar). Secretos `DLOCAL_API_KEY`, `DLOCAL_SECRET`; `DLOCAL_ENTORNO`
    (real/prueba) y `DLOCAL_MONTO_PRUEBA` opcional. Cuenta de dLocal hoy a nombre de Santi (unipersonal),
    Paso 1 verificado (hasta USD 3.000); pasar a la dueña para producción.
    · **Entrada rehecha (Santi, 19/10):** arriba un buscador (código o matrícula; los resultados
      aparecen al escribir, Enter abre el primero) y el botón «Agregar reserva» (mostrador). Abajo el
      día hora por hora: cada cosa muestra la reserva completa (auto, cliente, lugar, servicio, vuelo,
      código, estado y pago, cada dato con su ícono; sin traslados, que van en su pestaña); las llegadas pendientes tienen «Registrar entrada» y se abren en una
      ventana (cobro, factura y lugar). Hoy también muestra arriba las llegadas atrasadas.
      Tarjeta horizontal de dos filas con el pago en un recuadro grande de color (verde pagado,
      rojo «No pagado · Cobrar $», ámbar «Falta $»). El origen de cada reserva va en una etiqueta de color
      (Reserva web, por WhatsApp, en mostrador, por teléfono) en la agenda y en Reservas; sin barra de leyenda.
    · **Reserva en el mostrador = se cobra en el momento** (Santi, 19/10): el formulario de nueva
      reserva con origen Mostrador pide el medio (efectivo, tarjeta o transferencia) y registra el
      pago del total; «Agregar reserva» de Entrada abre así. WhatsApp/teléfono: paga al entrar o ya
      pagó por transferencia, como antes.
  - El rol de la dueña se llama «Administración» (Santi, 10/10). Logo centrado en el ingreso.
  - **Etapa actual: muestra (Santi, 10/10).** Lo del lunes 12/10 es una presentación desde cero, no la
    instalación definitiva: van a venir cambios y adaptaciones para el equipo. Los datos y cuentas de
    la muestra se pueden borrar cuantas veces haga falta (`de-fabrica.sql` o `vaciar-datos.sql`).
    Los cambios futuros a la base se aplican con SQL sin perder datos. **Al instalarlo definitivamente,
    correr otra vez `de-fabrica.sql`** y que la dueña cree la primera cuenta (Administración).
    Ese día también: contraseña nueva de la base (Reset database password) y actualizar el secreto
    `SUPABASE_DB_URL` del repo de respaldos.
  - `js/supabase.js` — supabase-js 2.117.3 (UMD) copiado en el proyecto.
  - `js/datos.js` — `window.PD`: sesión, carga, escrituras por RPC y **en vivo** (Realtime): cualquier
    cambio recarga y avisa a las pantallas abiertas («Nueva reserva PD-1001 desde la web · pagada»).
  - `panel/index.html` tiene Content-Security-Policy: solo scripts propios y conexión a `*.supabase.co`.
  - Probado de punta a punta con Supabase corriendo en Docker (registro, aprobación, reserva y pago
    web en vivo, traslados, entrada con factura, caja, permisos por rol).
- `reservar.html` + `js/reservar.js` — 4 pasos (fechas y vuelo · lugar y servicio · auto y datos ·
  resumen y pago), precio y lugares libres en vivo, pasarela de prueba (no pide datos de tarjeta),
  confirmación con código `PD-xxxx` y envío por WhatsApp. El nav «Reservar», el botón del menú y el
  del hero del inicio llevan acá; los demás botones de WhatsApp siguen como estaban.
- `panel/` — gestión (`noindex`). Secciones: Panel del día, Reservas (filtros, búsqueda, detalle, nueva reserva por
  WhatsApp o mostrador), Registrar llegada (buscador apto para lector de código, lugar sugerido,
  cobro opcional, comprobante con código de barras Code128 vía `panel/lib/JsBarcode`, MIT), Retiros y
  cobro (días reales, vuelto, libera el lugar), Traslados (camioneta: salida +15 min de la llegada,
  búsqueda +25 min del aterrizaje), Lugares (mapa por zona), Caja (base, movimientos, egresos,
  cierre con conteo: cuadra / sobra / falta; lo online va aparte), Clientes; y solo para la dueña:
  Reportes (recaudado por día, por medio, por tipo de lugar, por origen; CSV e impresión), Tarifas
  (con calculadora, datos para la factura y cantidad de lugares; se aplican en la web al instante),
  Equipo (dar y quitar acceso) y Respaldos (descarga JSON y registro de cambios). El chofer solo ve Traslados.
- Estilos propios en `panel/css/movil.css` y `panel/css/escritorio.css` (≥ 1024px: lateral fijo y
  tablas; en celular las tablas pasan a tarjetas y el lateral es un cajón).

**Sin avisos de borrador en pantalla (Santi, 6/10):** se sacaron «Borrador», «de muestra», «de prueba» y
las notas internas de la reserva y del panel.
Ojo: la pasarela sigue siendo de prueba (botón «Pagar») aunque no lo diga — no compartir `reservar.html`
con clientes reales hasta conectar la pasarela real.

**Rediseño para que se entienda (Santi, 6/10):** el panel se ordena en cinco sectores, cada uno con su
color (variantes del azul y el naranja de marca): **Hoy** (navy), **Autos en el predio** (azul: Entra un
auto, Sale un auto, Camioneta, Lugares), **Reservas** (celeste: Reservas, Clientes), **Plata** (naranja:
Caja, Reportes, Precios) y **Ajustes** (ámbar: Equipo, Respaldos). Cada pantalla abre con sector, título
grande y una línea que dice para qué sirve. «Hoy» arranca con tres atajos (Entra un auto, Sale un auto,
Nueva reserva) y una sola agenda del día con llegadas y salidas por hora. Colores en `panel/css/movil.css`
(`[data-sector=…]`: `--s`, `--s-fondo`, `--s-texto`, `--s-claro`).
«Lugares disponibles» va en verde (`[data-sector="libre"]`). **Azul apagado** = `#47728a`
(`--azul-apagado`, el mismo que `--texto-suave`): para totales y datos secundarios, por ejemplo
el stock en «19/60», «41/60» y «Techado 12/24 · Predio 7/36» (Santi, 6/10). Esas tarjetas van con
texto, sin íconos.
**«Predio» = lugar al aire libre, en todos lados** (web, reserva y panel). Para hablar del lugar
entero se dice «parking» (estado «En el parking», sector «Autos en el parking») para no confundir.

**Cómo cobra el parking (Santi, 6/10): se paga siempre al inicio.** El que no pagó online paga en
**Entrada** (cobro obligatorio, con vuelto) antes de que se le asigne el lugar. **Salida** no cobra: solo
entrega llaves y libera el lugar; si se quedó más días de lo reservado aparece la diferencia, y cobrarla
es opcional. Entrada y Salida usan el mismo ícono de auto: Entrada en menta, Salida en ámbar.
**Paleta del panel = solo la del branding (PDF):** #053F5C · #FF6712 · #FFFFFF · #FFA726 · #A0EACF ·
#F1F6F4, más el azul apagado #47728A. Hoy navy · Autos en el parking y Entrada menta · Salida ámbar ·
Reservas azul apagado · Plata naranja · Ajustes gris. Los íconos van en chips llenos del color del sector
(ícono navy sobre menta y ámbar, blanco sobre navy, naranja y azul apagado); la menta y el ámbar no se
usan como texto sobre blanco. «Lugares disponibles»: el número va sobre la menta. Los estados (pagado,
no pagado, falta) mantienen verde, rojo y ámbar de sistema, siempre con ícono y texto.

**Transferencia anticipada y factura (Santi, 6/10):** en Entrada, «¿Ya pagó por transferencia?» guarda
monto y nº de operación antes de que llegue el cliente (pago parcial o total; queda en la caja como
transferencia). Al registrar la entrada se cobra lo que falte y se **emite la factura**: e-Ticket
(consumidor final) o e-Factura (RUT de 12 dígitos y razón social). Numeración serie A correlativa, IVA
incluido (22 %, editable). Los datos del emisor (razón social, **RUT del parking: falta**, dirección) se
cargan en Precios → Datos para la factura. Para que sea legal hay que conectarla a un proveedor de
facturación electrónica habilitado por DGI (agrega CAE, QR y envío a DGI).
La misma opción está en **Nueva reserva** (Pago: «Todavía no pagó» / «Ya pagó por transferencia», con
el total calculado en vivo). En todo el panel las fechas se llaman **Entrada** y **Salida** (no «Deja el
auto» / «Vuelve»); en la ficha, debajo, «Entró el…» / «Salió el…» con la hora real. La web de reserva
también dice **Entrada** / **Salida** en el paso de fechas y en el resumen (Santi, 6/10). Las frases que
cuentan el servicio («Dejás el auto y te llevamos…») siguen igual.

**Traslados (Santi, 6/10):** antes «Camioneta». Solo dice a quién llevar y a quién ir a buscar, en dos
listas con los colores de Entrada y Salida: **Llevar al aeropuerto** (menta; sale ~15 min después de la
entrada, se lo deja en Partidas) y **Buscar en el aeropuerto** (ámbar; ~25 min después del aterrizaje, en
Arribos). Cada viaje: hora, nombre, pasajeros, vuelo, si ya dejó el auto, matrícula y lugar, teléfono,
botones Llamar y WhatsApp (con mensaje armado) y un botón grande por paso (Salimos → Ya lo dejé / Voy a
buscarlo → Ya está en el parking), con «Deshacer». Arriba, el traslado en curso o el próximo. La muestra
genera traslados en las próximas horas para que la pantalla tenga contenido.

**Fechas en el panel:** «06/10 | 16:30 Hrs.» (Santi, 6/10).

**Para ponerlo en producción:** crear el proyecto Supabase a nombre de la clienta (plan pago para
respaldos diarios), cuenta en una pasarela uruguaya (Mercado Pago, dLocal Go, Plexo o la de su banco)
con webhook que confirme el pago en lugar de `pagar_reserva_web`, proveedor de facturación electrónica
habilitado por DGI, SMTP propio para los mails de cuenta, tarifas y cantidad de lugares reales,
recordatorio por WhatsApp un día antes. Registrar la base de datos personales (Ley 18.331).

## Ideas tomadas de Ezypark (19/10)

La clienta pasó ezypark.cl (Chile, hecha con ParkAlto) como ejemplo. Se tomaron **solo las ideas**, con el
diseño, los colores y la tipografía de Parking Despegar:

- **Reserva en 5 pasos** (`reservar.html`): Fechas (entrada, salida y lugar con el total de esas fechas y
  los lugares libres) · Precio (traslado o valet, servicios extra, código de descuento y la cotización
  con «IVA incluido») · Tus datos (quién reserva, auto con tipo de vehículo, viaje, «Necesito factura con
  RUT» y comentarios) · Revisar (todo junto, con «Cambiar» en cada parte) · Listo. Arriba, las fechas
  elegidas («20 oct → 27 oct · 8 días»). Los datos del cliente se pueden recordar en ese navegador
  (localStorage, nunca en el servidor). `reservar.html?promo=CODIGO` trae el código cargado.
- **La reserva es una ventana** (19/10, pedido de Santi): cualquier link a `reservar.html` de las otras
  páginas la abre encima (`js/ventana-reserva.js` carga la misma página en un marco; adentro lleva la clase
  `en-ventana` y solo se ve la ventana, que avisa su alto para no dejar espacio de más). Entrando directo,
  la ventana se ve sobre una banda navy. Arriba: logo, «Reservá tu lugar», fechas elegidas y la X; abajo,
  siempre a mano, el total y el botón para seguir. La pasarela de pago se abre en la página entera.
  Ajustes de Santi (19/10): la ventana tiene medida fija (720 × 720 en la computadora, con borde también en
  el celular) y el contenido se desplaza adentro; botones de tamaño fijo; el calendario se abre tocando
  cualquier parte del día; la hora es una lista cada 15 min con flechita; sin tipo de vehículo ni color;
  **email obligatorio** (también lo exige el servidor): ahí va a llegar el ticket.
- **Servicios extra** (tabla `extras`, se editan en Precios): de ejemplo Lavado ($ 900) y Service (a
  cotizar: precio vacío, no suma al total). La reserva guarda nombre y precio del momento.
- **Promociones y convenios** (tabla `promociones`, sección Promociones del panel): código, % de
  descuento sobre el estacionamiento (los extras se cobran enteros), vigencia, si se muestra en el inicio
  y si el código se ve en la web. El servidor valida el código (`promo_vigente`) y calcula el total
  (`total_reserva`); el cambio de fechas y la salida con días de más respetan el descuento y los extras;
  la factura sale con líneas de descuento y de cada extra.
- **Inicio:** sección 04 «Ofertas para tu viaje» (`js/promociones.js`, sin supabase-js: llama a
  `promociones_web` por REST). Si no hay promociones vigentes para la web, no aparece.
- **Opiniones:** cada reseña con la inicial, las estrellas y la marca de Google; en Opiniones, en
  tarjetas. Faltan más reseñas reales: no se inventan.
- **Torre** muestra en la ficha del auto los extras, la promoción y los comentarios.

## Dominio propio (20/10)

`parkingdespegar.com` (Cloudflare Registrar, titular la dueña). La web se publica con **Cloudflare Pages**
conectado a este repositorio (rama `main`, carpeta de salida `parkingdespegar`, sin build): cada push a
`main` la actualiza sola. `livo.com.uy/parkingdespegar/` (GitHub Pages) queda redirigiendo al dominio nuevo.
Metadatos (og:url, og:image) y el servicio de Cloudflare (CORS, `SITIO` para la vuelta de dLocal) ya
apuntan a `https://parkingdespegar.com/`. Supabase → Authentication → URL Configuration: Site URL y
Redirect URLs con el dominio nuevo. dLocal: la web declarada tiene que ser el dominio nuevo.

## PENDIENTE

- **Licencia de IT Inktura:** la versión demo es de uso personal y no trae tildes ni números. Hace
  falta la licencia web (Indotype). Con la completa se pueden poner tildes en los títulos.
- **Valet — devolución del auto:** el paso 04 dice «Coordinamos cómo te lo devolvemos». Confirmar con
  la clienta si se entrega en la terminal o en el parking.
- Más reseñas reales de Google para el carrusel y la página de Opiniones (hoy hay dos).
- **Precios reales de los servicios extra** (Lavado está en $ 900 de ejemplo; Service, a cotizar).
- Mail de contacto (no aparece en ningún lado).
- **Tarifas reales** (la base arranca con techado $ 490/día, predio $ 390/día, valet $ 450; se cambian en Precios).
- **Conectar Supabase:** crear el proyecto, correr `supabase/esquema.sql` y cargar URL y publishable key
  en `js/config.js`. Recién ahí la dueña crea su cuenta (la primera es la de administración).
- **Pasarela de pago real y facturación electrónica:** cuentas a nombre de la clienta.
- **Cantidad real de lugares** techados y en predio (hoy 24 y 36, se cambian en Precios).

## Cómo se generó

Las seis páginas repiten sprite, header, menú y pie idénticos (el ítem de la página actual lleva
`aria-current="page"`). Si cambia el header o el pie, cambiarlo en los seis archivos.
Caché: CSS y JS con `?v=1` (movil.css `?v=15`, escritorio.css `?v=9`, main.js `?v=5`, escena.js `?v=2`, base.css `?v=4`, tokens-proyecto.css `?v=3`, datos.js `?v=8`, reservar.js `?v=5`, config.js `?v=2`, supabase.js `?v=2.117.3`; en `panel/`: movil.css `?v=17`, escritorio.css `?v=5`, app.js `?v=19`); subirlo en los seis HTML (y en `panel/index.html` si cambia `datos.js`) cada vez que se tocan.
`reservar.html` se armó tomando cabeza y pie de `contacto.html`.
