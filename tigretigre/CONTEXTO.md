# TigreTigre Producciones — borrador

Productora de shows y eventos en Montevideo. Instagram: @tigretigreproducciones.
Mail: TigreTigreproducciones@gmail.com. Su show fijo es **Stand Up Vieja Chela** (miércoles 22 h en
Vieja Chela Comedia & Cerveza, Alejo Rosell y Rius 1700), que comunican como una serie: temporada 4,
episodio 12. También hacen un **Open Mic** los martes 21:30 en el mismo lugar.
Web: https://livo.com.uy/tigretigre/

## Pedido (Santi, 6/10)

- **Dark con naranja** y temática **de app de streaming (tipo Netflix)**, sin copiarla: nunca su logo,
  la N, el nombre, su tipografía ni su rojo.
- Estructura como **Rhodium** (páginas separadas, el inicio con un adelanto de cada una) y lo
  aprendido en **Parking Despegar**.
- **Hero como el inicio de la app:** rotan los comunicadores con foto, nombre, descripción y etiqueta.
- **Comunicadores especializados** (humor negro, adultos mayores, cumpleaños, despedidas, stand up…).
- **Lupa arriba** que busca por las etiquetas.
- **Shows como series:** «nombre del show en tal lugar», con sus **personajes** (elenco) debajo, y en vez
  de temporadas y episodios, **clips cortos** que se van subiendo.
- «Es un borrador: hacé con lo que tengas a mano» (Santi, 6/10).

## Decisiones

- **Paleta «Clownfish»** (elegida por Santi de Pinterest, `refs/paleta-clownfish.jpg`): #000000 ·
  #F2F0E4 · #F28705 · #F25C05 · #F24405. Antes se descartaron dos propuestas (la primera «de plástico»;
  tres en OKLCH, maquetas en `refs/paletas/`). Roles en `css/tokens-proyecto.css`.
- **Texto en blanco, como Netflix** (Santi), también sobre los botones. El blanco sobre los naranjas de
  la paleta no llega a 4,5:1, así que los botones llevan **#D63E04** (4,6:1). Los naranjas vivos van en
  el tigre, la marca, los puntos de las etiquetas, las barritas y las insignias «Nuevo» / «Hoy».
  Botón claro («Ver clips») en crema #F2F0E4 con texto negro.
- **Logo del cliente** (lo pasó Santi el 6/10, `refs/logo-cliente.jpg`): vectorizado con potrace, fiel al
  original (contorno), en el degradé #F28705 → #F25C05 → #F24405. Archivos: `img/logo.svg` (completo:
  tigre + TigreTigre + PRODUCCIONES), `img/tigre.svg` (cabeza; también en el sprite como `#tigre`),
  `img/logo-texto.svg` (palabra + lema, para la entrada) y `img/logo-palabra.svg` (solo la palabra).
  Va en la entrada, el pie, la tarjeta de WhatsApp (`og-blanco.jpg?v=2`), el favicon y el ícono.
- **Barra de arriba:** tigre + **TIGRETIGRE** en **Bebas Neue** (Google Fonts, OFL, en `fonts/`),
  condensada como la de Netflix (pedido de Santi), sin la curva de su logo. PENDIENTE: Santi elige si
  queda así o con la letra de su logo (`refs/maquetas/nav-opciones.png`). Cuerpo en Neue Haas Grotesk
  Display Pro (de fabianamartinez, como Rhodium).
- **Navegación:** en el celular, **barra de pestañas abajo** como la app (pedido de Santi, en lugar de
  la hamburguesa): Inicio · Comunicadores · Shows · Clips · Contratar. En escritorio, los links arriba
  (regla de Livo). La barra de arriba **nunca se esconde** (regla de Livo): toma fondo negro al bajar.
- **Vidrio en las barras** (Santi eligió la opción 1): la de arriba al bajar y la de abajo siempre.
  `rgba(8, 8, 8, .62–.66)` + `blur(20px) saturate(160%)` y filete de 1px blanco al 14 %. Más opaco que el
  8–14 % del estándar porque son barras de navegación sobre contenido que se mueve: los textos tienen que
  leerse. Sin `backdrop-filter`, negras sólidas (`@supports`).
- **Acción principal:** «Contratar» = formulario corto que termina en WhatsApp (Santi eligió la opción 2).

## Páginas

- `index.html` — **como la maqueta que eligió Santi** (`refs/ref-inicio-v2.jpg`): tarjeta corta (3:3,95)
  que rota con las fotos del mural de Vieja Chela (`TT.heroInicio`, `fotoMural`), sin descripción, solo
  etiquetas; debajo asoma la fila **Stand Up Vieja Chela** (el elenco, con «Nuevo clip» en los que tienen
  un clip nuevo). **Excepción pedida por Santi** a «hero a pantalla completa con flecha»: en el celular la
  primera fila asoma en lugar de la flecha. En escritorio el hero sí ocupa toda la pantalla y la fila se
  monta encima (como la app en la tele). Después: **Clips nuevos**, **Próximas funciones** (como «Próximamente» de la app: fecha grande, foto, «Hoy» / «Mañana»
  calculado con la fecha real, elenco y botones) y **¿Qué estás buscando?** (mosaicos de color por
  etiqueta que llevan a comunicadores filtrados). Cada fila tiene su «Ver todos».
- `comunicadores.html` — **abre con el hero a pantalla completa que rota** (`refs/ref-comunicadores.jpg`:
  el que antes estaba en el inicio), con descripción y fotos de estudio (`TT.heroComunicadores`). La cápsula
  «Comunicadores» va marcada y baja a `#elenco`. Debajo, **Todos los comunicadores**: grilla con filtro por
  etiqueta (`?etiqueta=…` filtra y baja a la grilla); `?c=id` abre la ficha.
- `shows.html` — cada show como la ficha de una serie: portada, tipo «Show en Vieja Chela», título,
  «Entrada gratis · 2026 · Temporada 4 · Miércoles 22 h», «Reservá gratis» / «Anotate» (WhatsApp),
  «Ver clips», descripción, lugar con «Cómo llegar», **Personajes** (fotos redondas que abren la ficha) y
  pestañas **Clips · Funciones** (la barra naranja arriba de la activa, como la app). El Open Mic suma
  «Anotados este martes» (los 6 del flyer).
- `clips.html` — en el celular, **un clip por pantalla** como los clips cortos de la app (deslizar, botón
  de play, Contratar · Compartir · Ficha a la derecha); en escritorio, grilla de verticales.
- `contratar.html` — 4 pasos: tipo de evento (cápsulas) · **«¿Quién te hace reír?»** (como elegir perfil
  en la app, con «Que me recomienden») · fecha y personas · lugar y nombre → «Pedir por WhatsApp».
  `?c=id` preselecciona al comunicador; `?e=Cumpleaños`, el evento.
- En todas: **búsqueda** (lupa: texto + etiquetas), **ficha** (hoja desde abajo en el celular, ventana al
  centro en escritorio, se cierra deslizando hacia abajo) y **reproductor** (barra de avance y, al
  terminar, «Siguiente clip en 5» con anillo de cuenta regresiva, «Ver ahora» y «Cancelar»).

## Movimiento: como la app (Santi: «lo más similar, la idea es sentir eso»)

- **Entrada:** la primera vez de la sesión (`sessionStorage` `tt-intro`, la pone el `<head>`): negro, el
  tigre aparece de abajo hacia arriba con brillo naranja, TIGRETIGRE se abre, y todo se acerca y se funde.
  ~1,9 s, solo CSS (si el JS falla, igual termina). Un toque la saltea. No va con movimiento reducido.
- **Hero:** cada 7 s; foto que se funde con acercamiento lento, texto escalonado, el tinte del fondo y la
  barra del teléfono (`theme-color`) toman el color de cada comunicador (`tinte` en los datos), barritas
  que se llenan. Se pasa con el dedo o tocando una barrita. Se frena fuera de pantalla, con la pestaña
  oculta, con una capa abierta, con el mouse encima o con el foco del teclado. Con movimiento reducido no
  rota sola.
- **Pósters:** se hunden al tocarlos; en escritorio crecen con el mouse encima (con demora) y muestran
  íconos y etiquetas. Flechas a los costados de cada fila en escritorio.
- **Entre páginas:** fundido con View Transitions (Chrome y Safari nuevos).
- Fotos con rectángulo oscuro hasta que cargan y fundido al llegar. Sin apariciones al scroll.

## Datos (`js/datos.js` → `window.TT`)

Todo se arma desde ahí: para sumar un comunicador, un show, una función o un clip se agrega una entrada.
- **Comunicadores (10)** con foto de los flyers (Gabo9d y Lucho Díaz tienen además `fotoMural`, del flyer del E12): Gabo9d, Lucho Díaz, Augusto D’Angelo, Willy, Mati Morales,
  Andrés Bazzano, Maxi Montanari, Pablo Oyhenart, Ponetepillo y Chivi. Descripciones = hechos de los
  flyers (quién abrió o cerró qué episodio). **Etiquetas:** «Stand up» y «Conducción» son reales; el resto
  (humor negro, adultos mayores, cumpleaños, despedidas, eventos privados) es **MUESTRA**.
  Ojo: a Willy no se le pone «Humor negro» (se le sacó) y los mosaicos de etiquetas no llevan fotos, para
  no asociar a nadie con una etiqueta de muestra.
- **Funciones de la T4:** E1 (3/6), E5 (15/7), E6 (22/7), E7 (5/8, «La noche de la risa»), 2/9 (sin número),
  E11 (30/9) y E12 (7/10, foto propia `img/shows/t4e12.jpg`). Los roles (apertura, presentador, cierre) solo
  donde el flyer los dice.
- **Clips (9):** los tres de la T4 E1 con su nombre y arte del flyer («Me falta un dáctil», «Soy indeciso»,
  «¿Se tomaron el G?»); el resto con la foto del comunicador y un título descriptivo («Apertura del
  episodio 6»…). **Todos reproducen `img/clips/muestra.mp4`** (micrófono, 12 s, hecho con ffmpeg de la foto
  de banco; `muestra.webm` para navegadores sin H.264).

## Fotos

- Comunicadores: recortes de los flyers del cliente (`refs/`), en `img/comunicadores/<id>.jpg`. Son de
  capturas de pantalla: en escritorio se ven blandas. Las de Maxi, Pablo, Ponetepillo y Chivi son las más
  chicas.
- `img/shows/stand-up-vieja-chela.jpg` y `t4e12.jpg`: bandas de los flyers. `vieja-chela-logo.jpg`: logo del
  bar (de los flyers, sin usar todavía).
- `img/shows/open-mic.jpg`: **foto de banco** (Unsplash, micrófono, sin personas).
- `img/og-blanco.jpg`: tarjeta de WhatsApp (tigre + TIGRETIGRE + PRODUCCIONES en blanco). `img/icono-180.png`.
- Sin avisos de «muestra» en pantalla (como pidió Santi en Rhodium y Parking): están en el código.

## Verificado

Playwright en 320×568, 360×640, 375×812, 390×844, 412×915, 1024×768, 1440×900 y 1920×1080: sin scroll
horizontal ni errores de consola. Probados: ficha, búsqueda con etiqueta, reproductor con la cuenta
regresiva (pasa solo al siguiente), rotación del hero y la entrada (solo la primera carga).

## PENDIENTE

- **WhatsApp de la productora** (`TT.whatsapp` en `js/datos.js`). Mientras esté vacío, los botones abren
  WhatsApp para elegir contacto, con el mensaje armado.
- **Por dónde se reserva** Stand Up Vieja Chela (los flyers dicen «Reservá gratis» sin canal): hoy va al
  mismo WhatsApp.
- **Especialidades reales** de cada comunicador y una línea de descripción de cada uno.
- **Fotos de cada comunicador** en buena resolución (vertical, fondo oscuro, parecidas entre sí).
- **Los clips reales** (videos verticales de 1–2 min): dónde están (Reels, archivos) y quién los sube.
- **Archivo original del logo** (si lo tienen): el vector salió de una captura de 940px.
- **Barra de arriba:** ¿letra tipo Netflix (como está) o la de su logo? (`refs/maquetas/nav-opciones.png`).
- Funciones que faltan (E2, E3, E4, E8, E9, E10) y el tercero del E11 («Diego Ma…», cortado en la captura).

## Cómo se generó

Los cinco HTML repiten sprite, entrada, header, pie, barra de abajo y capas idénticos (el ítem de la
página actual lleva `aria-current="page"`). Si cambia alguno, cambiarlo en los cinco. Íconos: Lucide
(interfaz) y Simple Icons (Instagram y WhatsApp), en sprite inline.
Caché: `movil.css`, `escritorio.css`, `datos.js` y `main.js` en `?v=2`; el resto en `?v=1`. Subirlo en los
cinco HTML cada vez que se tocan.
