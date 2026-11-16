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
  - **Capas de blanco** (misma familia fría): `--marco #F3F4F8` (fondo de página), `--superficie-2 #F9FAFC` (bandas,
    cabeceras de tabla, modales) y `--superficie #FFFFFF` (piezas: tarjetas, campos). La jerarquía se ve por capa, no por rayas.
  - **Sombras teñidas** con la tinta (`--sombra`, `--sombra-alta`): halo difuso de dos capas, nunca gris ni negro.
  - **Texto en 4 escalones** de la misma tinta `#1E2842`: t1 títulos y cifras · t2 `#474F64` cuerpo · t3 `#5F6679` rótulos
    y apoyo · t4 `#818795` solo íconos y adornos (no pasa 4.5:1, no se usa para texto).
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
  Cualquier color nuevo se define como token con su función; si no tiene una función clara, no se agrega.

## Estructura

```
laestrella/
  index.html            ingreso: se toca el nombre y se escribe el PIN de 4 números
  caja/index.html       frente de caja (POS)
  panel/index.html      panel de administración (Inicio, Ventas, Productos, Stock, Compras, Caja,
                        Reportes, Equipo, Ajustes)
  fonts/                Inter Tight (licencia OFL), autoalojada
  css/                  tokens.css (Livo) · tokens-proyecto.css · base.css · movil.css ·
                        escritorio.css · impresion.css (ticket de 58 mm)
  js/datos.js           la "base": datos de muestra + todas las reglas (LE.*)
  js/ticket.js          ticket de 32 columnas + bytes ESC/POS + impresión desde el navegador
  js/ui.js              modales, avisos, teclado, CSV
  js/caja.js            POS
  js/panel.js           panel: núcleo, Inicio, Ventas, Productos, gráficos
  js/panel-gestion.js   panel: Stock, Compras, Caja, Reportes, Equipo, Ajustes
  js/iconos.js          sprite Lucide generado desde lucide-static (no hay paths a mano)
  js/config.js          dirección y clave pública del proyecto de Supabase (vacío = datos de ejemplo)
  js/nube.js            modo conectado: ingreso, copia local, cola de ventas sin internet
  lib/supabase.min.js   cliente oficial de Supabase (v2.119), guardado en el proyecto
  supabase/esquema.sql  la base real (tablas, reglas, funciones)  ·  LEEME.md: cómo conectar
  supabase/kit-respaldos/  copias de seguridad automáticas (va en un repositorio privado aparte)
  supabase/semilla-ejemplo.sql  87 productos de ejemplo (opcional, solo para probar)
```

## Conexión con Supabase

**Estado:** el código y el esquema están hechos y probados, pero **no hay un proyecto de Supabase conectado todavía**.
`js/config.js` está vacío, así que el sistema sigue en modo de ejemplo. Para conectar: `supabase/LEEME.md`.

- **Mismo criterio que Parking Despegar:** RLS en todas las tablas y **ninguna política**; toda lectura y escritura pasa
  por funciones del servidor (`security definer`) que controlan el rol, calculan los importes y anotan en `auditoria`.
  La primera cuenta es administración (`admin`); las demás quedan «sin acceso» hasta que se aprueban.
- **Login:** email y contraseña de Supabase Auth. **No hay PIN en el modo conectado** (la contraseña mínima de Supabase
  es de 6 caracteres). Un PIN rápido para cambiar de cajera queda para después.
- **Lectura:** `snap_base()` y `snap_ventas()` devuelven los datos según el rol (caja no recibe costos, compras,
  proveedores ni auditoría). El navegador guarda una copia local y la refresca al entrar, al cambiar de sección,
  después de cada cambio y cada 45 s.
- **Venta y retiro de efectivo:** se registran al instante en la terminal y viajan en cola (`E.outbox`). Cada venta lleva
  un UUID que genera la caja: `crear_venta` es idempotente. Sin internet se sigue vendiendo; no se puede cerrar la caja
  ni salir con ventas sin enviar. Si el servidor rechaza una venta por una regla (p. ej. producto dado de baja mientras
  la caja estaba sin conexión), queda en `E.rechazadas` y se avisa; no traba la cola.
- **El precio lo pone el servidor** a partir de la tabla `productos`; el número de ticket lo propone la caja (una sola caja).
- **Pruebas hechas** contra un Postgres 16 local (con un reemplazo mínimo de `auth` y de la API): 63 del esquema,
  46 del módulo de conexión y 25 recorriendo la pantalla real en un navegador (alta de cuentas, aprobación, venta,
  corte y vuelta de internet). **Sin probar contra un Supabase real**: puede haber diferencias menores.
- **Copias de seguridad:** kit en `supabase/kit-respaldos/` (mismo mecanismo que Parking Despegar: repositorio privado,
  copia a las 12:00 y 21:30, resumen legible, restauración con confirmación, aviso que evita la pausa del plan gratis).
  Probado contra Postgres local con los scripts reales (29 pruebas). **Falta instalarlo**: crear el repositorio privado
  y pegar el secreto `SUPABASE_DB_URL` (lo hace Santi; la contraseña no pasa por el chat).
- **Pendiente:** importar productos desde CSV, PIN rápido, múltiples cajas (hoy el número de ticket asume una sola).

## Cómo mapea cada función (modo de ejemplo → servidor)

| Modo de ejemplo (`datos.js`) | Servidor (`esquema.sql`) |
|---|---|
| `crearVenta` | `crear_venta(p)`, idempotente por `id`; precios de la base |
| `abrirCaja` / `egresoCaja` / `cerrarCaja` | `abrir_caja` / `egreso_caja` / `cerrar_caja`; una sola caja abierta (índice único) |
| `anularVenta`, `guardarProducto`, `ajustarStock`, compras | solo `admin` |
| `guardarUsuario` | `guardar_usuario`: nadie cambia su propio rol; siempre queda una administración activa |
| `marcarAsistencia` | `marcar_asistencia` |
| `auditoria` | tabla `auditoria` escrita solo por el servidor |

Montos en **centavos** (enteros); cantidades por peso en kg con 3 decimales.

## Lector y balanza

- Lector USB = teclado: escribe el código y manda Enter. El campo de escaneo siempre está enfocado.
- **EAN-13** normal: se busca por `codigo`.
- **Balanza** (productos pesados): `20` + PLU (5) + peso en gramos (5) + dígito de control. **Es un supuesto:**
  hay que confirmar el formato de la balanza real (prefijo, si trae peso o precio). Se cambia en Ajustes.
- Los códigos de barras de muestra son inventados (prefijo 773 con dígito de control válido), no son los reales.

## Impresión

- En el borrador: diálogo de impresión del navegador con papel de 58 mm (`impresion.css`).
- En el equipo real: se manda ESC/POS directo, sin diálogo, y se abre el cajón (pulso `1B 70`). La ventana del
  ticket muestra los bytes que recibiría la impresora ("Para técnicos").
- **RIESGO a validar antes de comprar:** en terminales Android con impresora integrada, el navegador no
  imprime directo; hace falta el SDK del fabricante o una app puente. Confirmar con el vendedor, y comprar
  una unidad de prueba.

## Sin conexión (simulado)

El botón "Simular corte de internet" (en la caja) hace que las ventas queden marcadas "sin enviar"; al volver
la conexión se envían. En la versión real: cola local (IndexedDB) + envío con el mismo `id` de venta.
El POS ya guarda el ticket en curso al recargar (`laestrella_ticket_v1`).

## Fotos de productos

- **Los 87 productos tienen foto en PNG** (`img/productos/pXXX.png`, 256 px, ~25 KB cada una).
- Envases: **Open Food Facts**, **Open Products Facts** y **Open Beauty Facts** (CC BY-SA 3.0). Productos frescos
  (frutas, verduras, carnes, algunos quesos): **Wikimedia Commons**, solo con licencias CC BY, CC BY-SA, CC0 o
  dominio público. Autor, licencia y enlace de cada una: `img/productos/CREDITOS.md` (también se menciona en Ajustes).
- Cada foto se eligió a mano mirando una hoja de contacto con las candidatas. Hay algunas aproximaciones: el
  detergente es de ropa, la cerveza retornable es una botella cualquiera, las milanesas son un plato servido.
- Los productos con foto de envase usan el **código de barras real** (`js/catalogo-fotos.js`), así que se pueden
  escanear envases reales. Los de peso (frutas, carnes, fiambres) usan PLU de balanza. Precios, costos y stock
  siguen siendo de ejemplo.
- No se descargaron fotos de ningún supermercado: son de la tienda y de las marcas.
- Para sumar o cambiar una foto: buscarla en esas bases, convertirla a PNG de 256 px y anotarla en `CREDITOS.md`.
  Los productos nuevos cargados desde el panel quedan sin foto (se muestra un recuadro vacío).
- Las fuentes limitan la cantidad de consultas: se pidió con pausas, un nombre de cliente genérico y sin repetir.

## Datos de muestra

Productos, proveedores, personas y ventas de 14 días son inventados. Los productos son típicos de un almacén
uruguayo con precios de muestra. **IVA de muestra:** confirmar tasas con el contador.
PINs de ejemplo: Marta (administración) 1234 · Lucía (caja) 1111 · Diego (caja) 2222 (no se muestran en pantalla).

## PENDIENTES

- Confirmar con el contador si hace falta e-Ticket (monotributo) y, si sí, elegir proveedor.
- Confirmar formato de etiqueta de la balanza y marca/modelo.
- Confirmar con el vendedor cómo imprime la terminal desde una web.
- RUT, dirección y teléfono reales del almacén (hoy vacíos: el ticket los omite hasta que se carguen en Ajustes).
- Logo definitivo (el actual es una estrella de Lucide con el nombre, provisorio).
- Offline real, base real (Supabase), respaldos y traslado a su propio repo privado.
