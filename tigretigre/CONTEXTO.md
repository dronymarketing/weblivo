# TigreTigre Producciones — borrador

Productora de shows y eventos en Montevideo. Instagram: @tigretigreproducciones.
Mail: TigreTigreproducciones@gmail.com. Su show fijo es **Stand Up Vieja Chela** (miércoles 22 h en
Vieja Chela Comedia & Cerveza, Alejo Rosell y Rius 1700), que comunican como una serie: temporada 4,
episodio 12. También hacen un Open Mic los martes en el mismo lugar.

## Pedido del cliente (Santi, 6/10)

- Colores de las referencias: **dark con naranja**.
- Temática **estilo app de streaming (tipo Netflix)**, sin copiarla: nunca su logo, la N, el nombre,
  su tipografía ni su rojo.
- Estructura como **Rhodium** (páginas separadas, el inicio con un adelanto de cada una y botón a su
  página) y lo aprendido en **Parking Despegar**.
- **Hero como el inicio de la app:** rotan los comunicadores, cada uno con foto, nombre, descripción
  y etiqueta de lo que hace.
- **Comunicadores especializados** en áreas de la comunicación en vivo: humor negro, humor para
  adultos mayores, cumpleaños, despedidas de soltero, stand up, etc.
- **Lupa arriba (buscador)** que filtra por las etiquetas de los comunicadores.
- **Shows entre comunicadores:** cada show es como una serie («nombre del show en tal lugar») y abajo
  se muestran sus personajes (el elenco), como la ficha de una serie.
- En vez de temporadas y episodios, **chistes cortos (clips de 1–2 min)** que se van subiendo.

## Referencias (`refs/`)

- `instagram-perfil.jpg` — perfil de Instagram (bio, mail, grilla de flyers).
- `flyer-t4e12.jpg` — Stand Up Vieja Chela T4 E12 (Maxi Montanari, Gabo9d, Lucho Díaz).
- `flyer-t4e7.jpg` — Stand Up Vieja Chela T4 E7 (Pablo Oyhenart, Gabo9d, Ponetepillo).
- `ref-app-streaming.jpg` — capturas de la app de Netflix: solo como referencia de estructura.

## Paleta (cuantizada de los dos flyers, sin la interfaz del teléfono)

Área: #010000 20.7% · #A36241 14.1% · #432B1B 13.0% · #0D0705 11.8% · #833721 11.6% ·
#291107 11.5% · #D3AC8C 10.4% (T4E12) — #020003 34.5% · #50332F 13.7% · #AC968B 11.2% · #2D0C0C 9.6% (T4E7).
Vivos (S y V > 0.55): naranja #CB6230 (VIEJA CHELA) · ámbar #E19945 (pastilla de fecha) · rojo #A52823 (Reservá gratis).

Primera propuesta (fondo #0D0705 · naranja #E8702F · ámbar #F0A548): Santi la descartó, pidió una paleta
**profesional, que no parezca de plástico ni de IA genérica**. Ahí se sacó el ámbar (dos acentos hacen
golosina) y se armaron tres en OKLCH: una escala de neutros con el mismo matiz cálido, texto crema (nunca
blanco puro) y un solo naranja en poca superficie (botón principal, antetítulo, barras de avance).
Maquetas en `refs/paletas/` (pendiente de elegir):

| | Fondo | Superficie | Sup. 2 | Hondo | Naranja | Suave | Texto |
|---|---|---|---|---|---|---|---|
| 1 Brasa | #120D0A | #1E1814 | #2D241F | #77391F | #DC723A (6,0:1) | #B0A198 | #F1E7E1 |
| 2 Tabaco | #160F0A | #231A12 | #33271E | #693923 | #C87549 (5,5:1) | #B4A093 | #F2E3D8 |
| 3 Grafito | #0D0C0B | #191715 | #262322 | #843312 | #ED6D2D (6,4:1) | #A4A19E | #F1EEEB |

Texto sobre los botones naranjas: el color de fondo (5,5–6,4:1). El blanco no pasa.

**Santi eligió otra: «Clownfish»** (`refs/paleta-clownfish.jpg`, de Pinterest): #F2F0E4 · #F28705 ·
#F25C05 · #F24405 · #000000. Maqueta en `refs/paletas/4-clownfish.png`. Roles propuestos (a confirmar):
fondo #000000 · superficie #111110 y #1D1D1B (crema al 7 y 12 % sobre negro) · texto #F2F0E4 (18,4:1) ·
texto suave #A09E96 (7,8:1) · naranja principal #F25C05 (6,3:1: botón, antetítulos, barras) · naranja
claro #F28705 (8,2:1: etiquetas «Nuevo», fechas) · naranja hondo #F24405 (5,6:1: botón presionado).
Sobre los naranjas, texto negro: el crema da 2,2–3,3:1 y no pasa.

**Ajustes de Santi sobre la Clownfish (6/10):**
- **Texto en blanco, como Netflix**, también sobre los botones naranjas. El blanco sobre #F25C05 da 3,3:1
  y sobre #F24405 3,75:1, así que los botones llevan un tono propio, **#D63E04** (blanco a 4,6:1).
  Los naranjas vivos quedan para el tigre, la marca, los puntos de las etiquetas y la barra que rota.
- El botón claro («Ver clips») va en crema #F2F0E4 con texto negro.
- Fondo con tinte: arriba toma el color de la foto del comunicador del hero (#2A1A10 con Gabo9d) y baja
  a negro, como la app nueva. Cambia con cada comunicador.

## Inicio como la app (maqueta `refs/maquetas/inicio-v1.png`)

Referencias: `refs/ref-inicio-app.jpg` (Santi eligió la versión nueva, la de la derecha) y
`refs/ref-ficha-app.jpg` (ficha de una serie).
- Arriba a la izquierda, **el tigre del logo del cliente** vectorizado de su foto de perfil
  (`img/tigre.svg`, potrace) con degradé #F28705 → #F25C05 → #F24405, y al lado **TIGRETIGRE** en
  Bebas Neue (Google Fonts, OFL, local en `fonts/`) con el mismo degradé: condensada como la de
  Netflix, pero sin la curva de su logo. A la derecha, la lupa.
- Debajo, cápsulas: Comunicadores · Shows · Etiquetas ⌄.
- Tarjeta del hero con reborde fino: tigre chico + «COMUNICADOR» espaciado (como «N SERIE»), nombre
  en Bebas, etiquetas separadas por puntos naranjas, «Ver clips» y «Contratar». Debajo, la barra que
  marca la rotación.
- Fila de pósters con el tigre chico arriba a la izquierda y «Nuevo clip» en #F28705 con texto negro.
- **Barra de navegación abajo en el celular** (pedido de Santi, en lugar de la hamburguesa):
  Inicio · Comunicadores · Shows · Clips · Contratar, íconos Lucide. En escritorio, los links arriba.
- Cuerpo en Neue Haas Grotesk Display Pro (reutilizada de fabianamartinez, como Rhodium).

## Movimiento: como la app (Santi, 6/10: «lo más similar, la idea es sentir eso»)

Ningún paquete del catálogo: se imita cómo se mueve la app, con scroll nativo y sin librerías de scroll.
- **Entrada:** la primera vez de la sesión, pantalla negra con el tigre que se dibuja con brillo
  naranja, aparece TIGRETIGRE y todo se acerca y se funde (en el espíritu de la intro de la N, sin
  copiarla). Dura ~1,5 s, se saltea con un toque, no va con movimiento reducido. Sin sonido.
- **Hero:** rota cada ~7 s. La foto se funde con un acercamiento lento, el texto sale y entra
  escalonado, el tinte del fondo cambia con el comunicador y la barrita de abajo se llena.
  Se pasa con el dedo; se pausa fuera de pantalla o con la pestaña oculta.
- **Barra de arriba:** al bajar se esconde, al subir vuelve, con fondo negro desenfocado una vez que
  hay contenido debajo. Las cápsulas quedan pegadas.
- **Pósters:** en el celular, un toque abre la ficha como hoja desde abajo (fondo oscurecido).
  En escritorio, con el mouse encima ~300 ms, el póster crece y muestra botones, etiquetas y datos.
- **Filas:** deslizan con el dedo y se acomodan solas (scroll-snap). En escritorio, flechas a los costados
  e indicador de página arriba a la derecha.
- **Entre páginas:** fundido con View Transitions (Chrome y Safari nuevos; el resto, navegación normal).
- **Clips:** al terminar uno, «Siguiente clip en 5» con cuenta regresiva en círculo.
- **Detalles:** botones que se hunden al tocarlos, ícono lleno en la pestaña activa, rectángulos oscuros
  mientras cargan las fotos. Sin apariciones al scroll: la app no las tiene.

## Entrevista

- Tipo: sitio con páginas separadas y adelantos en el inicio (como Rhodium).
- Rubro: productora de comunicadores y shows de humor.
- Estética: de cero, con las referencias.
- Color: de las referencias — **en curso**.
