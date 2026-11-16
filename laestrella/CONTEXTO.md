# La Estrella — sistema de caja y gestión

Sistema para un almacén (estilo supermercado) en Uruguay: **frente de caja (POS)** para quien cobra y
**panel de administración**, sobre la misma base. Hoy los datos son de ejemplo y viven solo en el navegador
(`localStorage`). Después se traslada a una carpeta/repo propio (privado) y se conecta una base real, como se
hizo con Parking Despegar. **Sin marcas de "borrador" en pantalla** (pedido de Santi): no se agregan.

## Decisiones (Santi)

- **Tipo:** software, no una web de cliente. Se usa el estándar de Livo en lo que aplica (móvil primero,
  `movil.css` sin media queries, `escritorio.css` solo desde 768px, tokens, íconos Lucide en sprite,
  scroll nativo, rebordes de 1px, `noindex`, tarjeta de WhatsApp en cada página).
- **Roles:** dos. **Administración** (control total; `admin` en la base) y **Caja** (cobra y maneja su turno).
- **Una sola caja.** Internet se corta poco, pero el POS tiene que seguir vendiendo sin conexión.
- **Facturación:** el almacén es **monotributo** y todavía no tiene proveedor de facturación electrónica.
  Por ahora el ticket sale como **comprobante interno** y lo dice en el papel. Queda preparado (IVA por
  producto, numeración propia, cobro separado de la emisión) para conectar un proveedor autorizado por la
  DGI si hace falta. **PENDIENTE confirmar con el contador** si el monotributo del almacén lo obliga a emitir
  e-Ticket (las fuentes consultadas se contradicen y son blogs de proveedores, no la DGI).
- **Equipo previsto (a confirmar):** terminal Android 14 con pantalla dual de 8" + display de cliente,
  impresora térmica de **58 mm** integrada y lector. Por eso el ticket es de **32 columnas**.
- **Estilo (pulido a pedido de Santi):** misma estructura de panel (barra lateral, gráfico de áreas, dona, actividad,
  tablas) pero sin degradés ni tarjetas de color. Un solo sistema en `css/tokens-proyecto.css`, con un trabajo por cosa:
  - **Capas de blanco** (blancos con un matiz violeta): `--marco #F4F3F9` (fondo de página), `--superficie-2 #FAF9FD` (bandas,
    cabeceras de tabla, modales) y `--superficie #FFFFFF` (piezas: tarjetas, campos). La jerarquía se ve por capa, no por rayas.
  - **Sombras teñidas** con la tinta (`--sombra`, `--sombra-alta`): halo difuso de dos capas, nunca gris ni negro.
  - **Texto en 4 escalones, todo en violeta**: t1 `#7A53C9` (el violeta del sistema: títulos, nombres y cifras; 5,4:1 sobre blanco) · t2 `#4B4470`
    cuerpo (8,9:1) · t3 `#665F85` rótulos y apoyo (5,9:1) · t4 `#8A83A8` solo íconos y adornos. El orden de importancia lo marcan el tamaño y el
    peso (títulos 700, cifras grandes, apoyo liviano), no un color distinto.
  - **Color principal violeta `#7A53C9`** (mismo tono de luminosidad e intensidad que el rosa original), en gotas: botón
    principal («Cobrar»), medio de pago elegido, ícono del menú activo, pestaña activa, foco, enlaces «Ver …».
    **El rosa `#B93573`** es el segundo color: tiñe UNA tarjeta (Ventas de hoy) y es la segunda línea de los gráficos (ventas en violeta, ganancia en rosa; nunca otro color de por medio).
    No hay verde de marca (el verde solo significa «bien» en los estados).
  - **Estados** verde/ámbar/rojo apagados en píldoras de fondo tintado (≥4.6:1).
  - **Datos**: paleta categórica validada `--serie-1..4` (violeta, rosa, ocre, verde azulado); cada medio de pago tiene su
    color en el gráfico, la dona, los mini indicadores y la barra segmentada.
  - **Jerarquía**: lo importante es oscuro, firme y grande (títulos 700, nombres 600–650, cifras 700 con tracking
    cerrado); lo secundario es más chico, de peso 450 y en t2/t3 (subtítulos, rótulos, fechas, unidades).
  - **Tipografía**: todo en una sola familia, «Haas». Neue Haas Grotesk (Monotype) es de pago y no está incluida:
    `@font-face "Haas"` usa la Neue Haas si está instalada en el equipo y, si no, **Inter Tight** (OFL, autoalojada en
    `fonts/`). Con licencia web, se suma el archivo a `fonts/` y una línea `url(...)` en `tokens-proyecto.css`.
  - **Inicio** (arquitectura tomada de otro panel de Santi, no su estilo): una sola pantalla que entra completa en 100 % del
    alto, con lo que más se usa y todo clickeable. Encabezado con saludo y avisos (links) · 4 tarjetas (Ventas de hoy, Caja,
    Para reponer, Ganancia bruta) que llevan a su sección · gráfico de 7 días y últimas ventas, cada uno con su «Ver …».
    En el celular se apila y se desplaza. Lo demás (actividad, lo más vendido, cómo se cobró) vive en Reportes y Equipo.
  - **Caja (POS)**, mismo método: una pantalla sin scroll. A la izquierda el escaneo (con el panel «Lector» para probar el
    lector y cortar internet), las categorías y los productos; a la derecha el ticket como tarjeta («Ticket actual», líneas
    con separadores finos, total grande, «En espera», «Anular» y «Cobrar» con nombre; Cobrar en violeta es lo único que
    llama). La última línea escaneada destella en rosa suave (el rosa solo marca lo recién pasado y los tickets en espera).
    La categoría elegida va en violeta suave. En el celular el ticket ocupa todo y los productos se eligen en una hoja.
  - **Ingreso**, mismo método: en escritorio son dos zonas sin scroll (a la izquierda marca, título grande y qué hace cada rol
    en dos tarjetas; a la derecha el panel blanco con los usuarios o con email/contraseña). En el celular se apila: título,
    usuarios y, al final, los roles. Cada usuario es una fila clickeable con flecha; al pasar el mouse se marca en violeta.
  - **Resto del panel**, mismo método: las pantallas de lista (Ventas, Productos, Stock, Compras, Caja, Equipo → horarios y
    registro) ocupan el 100 % del alto en escritorio: título, filtros e indicadores arriba y la tabla ocupa el resto con
    scroll por dentro y cabecera fija (`.cuerpo--lista`, que `P.zona` activa solo cuando la pantalla es «indicadores + una
    tabla»). Reportes y Ajustes siguen con scroll de página. Los indicadores de Stock «Por reponer» y «Sin stock» filtran la lista.
    Los botones principales de cada pantalla y de cada ventana son violeta; el rol Caja usa el rosa en sus insignias.
  - **Stock · Disponible**: una columna con la cantidad y debajo una barra de tres zonas (rojo = no hay · amarillo = alerta,
    hasta el mínimo · verde = por encima del mínimo). El recorrido llega al doble del mínimo; la parte llena toma el color de su
    zona. La regla es una sola, `LE.nivelStock(p)`: «no hay» si stock ≤ 0, «alerta / Reponer» si stock < mínimo, «bien» si es el mínimo o más (tener justo el mínimo está bien). La usan la barra, la insignia, «Para reponer» del Inicio, los filtros y el listado de productos; el servidor solo guarda el mínimo.
  - **Stock · Ajustar** pone el **mínimo** de cada producto (con vista previa de la barra); desde esa misma ventana, «Contar stock»
    corrige la cantidad (conteo, rotura, merma…). API: `LE.ajustarMinimo(id, minimo)`.
  - **Alta de productos escaneando** (la idea es ir automatizando la carga): Productos → «Nuevo producto» arranca con el cursor en el
    código de barras. Si el código ya está cargado, avisa y ofrece abrirlo; si no, `UI.consultarCodigo` busca nombre, marca, cantidad y
    categoría en Open Food Facts / Open Products Facts / Open Beauty Facts (solo se envía el número del código; si no hay internet o no
    existe, se sigue a mano). Después solo falta el precio; «Guardar y escanear otro» deja listo el siguiente. En la **caja**, si
    Administración escanea un código que no está cargado se abre el alta rápida (nombre sugerido, precio, costo, categoría) y el
    producto se agrega al ticket; la próxima vez se escanea y ya se sabe qué es y cuánto sale. Si el que escanea es Caja, ve el
    aviso. Todo código desconocido que se escanea en la caja (por Caja o por Administración) se anota en la **lista de códigos sin cargar**
    (`LE.registrarCodigo`; en modo conectado va en una cola propia que no traba el cierre de caja y se envía sola con internet, a la tabla
    `codigos_sin_cargar` por la función `registrar_codigo`). Administración la ve en Productos → solapa «Sin cargar · N» (más pedidos primero,
    con cuántas veces y quién escaneó), y en el Inicio como aviso. «Cargar» abre el alta con el código y el nombre ya sugeridos; al guardar el
    producto el código sale solo de la lista; «Descartar» lo saca (si se vuelve a escanear, reaparece). Máximo 500 códigos pendientes.
  - **Compras**: los indicadores «Pedidas sin recibir» y «Para pagar a proveedores» filtran la lista (también hay fichas Todas / Por recibir /
    Por pagar). Cada compra muestra su avance en tres pasos (pedida → recibida → paga): los pasos hechos se llenan en violeta y, con los
    tres, todo pasa a verde («Completa»). La acción principal de cada fila es «Recibir» en violeta.
  - **Equipo · Personas**: indicadores (con acceso, trabajando ahora, sin acceso → filtra) y dos paneles que entran en la pantalla: la tabla
    de personas (avatar, rol, acceso, jornada «en vivo», editar) y «Qué puede hacer cada rol» con los permisos de Administración y de Caja.
    Horarios y Registro siguen como listas a pantalla completa.
  - **Avisos en el menú de arriba** (antes eran una franja de fichas en el Inicio): a la derecha de la barra del panel van el estado de la caja
    («Caja abierta · Marta», solo en escritorio) y una **campana con número** (`#btn-avisos`) que abre la lista de avisos pendientes:
    productos para reponer, compras por recibir, diferencia de caja, códigos sin cargar, ventas sin enviar (cuentan en el número) y
    ventas anuladas (solo informativo). Se cierra con Escape, tocando afuera o eligiendo un aviso. El número es rojo si hay algo sin stock.
    En el menú lateral, **Stock lleva un globito redondo** con los productos para reponer (amarillo; rojo si alguno está en cero) y desaparece
    cuando no hay ninguno. Todo sale de `PANEL.avisos()` y se actualiza solo con cada cambio y cada 30 segundos (`PANEL.pintarNav()`).
  - **Sin azul**: `--tinta` y `--texto` son el violeta; los grises, líneas y sombras tienen matiz violeta (`rgba(62, 36, 112, …)`). El único oscuro
    fijo es el de los globitos de los gráficos (`#2E2150`), porque la serie de ventas es violeta y su clave se perdería sobre violeta. **Violeta
    apagado** (`--apagado` `#6A6388`, `--apagado-icono`, `--apagado-borde`, `--apagado-velo`) para todo lo que NO está seleccionado: menú, pestañas,
    fichas, medios de pago sin elegir, bordes de campos, pasos de cantidad. Lo seleccionado sube a violeta pleno. **El hover (y el toque en el
    celular) es el secundario** (`--hover` = rosa, `--hover-suave`, `--hover-velo`): botones, fichas, menú, campos, filas de tablas, tarjetas del
    Inicio, productos de la caja y usuarios del ingreso. Favicon e imagen para compartir en violeta.