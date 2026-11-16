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
  - **Acento rosa apagado `#B93573` en gotas**: botón principal («Cobrar»), el medio de pago elegido, el ítem activo del
    menú (solo el ícono), la pestaña activa, el foco. Nunca como fondo grande.
  - **Estados** verde/ámbar/rojo apagados en píldoras de fondo tintado (≥4.6:1).
  - **Datos**: paleta categórica validada `--serie-1..4` (rosa, azul, ocre, verde azulado); cada medio de pago tiene su
    color en el gráfico, la dona, los mini indicadores y la barra segmentada.
  - **Tipografía**: Hanken Grotesk (interfaz) y Fraunces (títulos y cifras grandes), autoalojadas en `fonts/` con
    `font-display: swap` (tiene que andar sin internet). Cifras con `tabular-nums` donde se alinean columnas.
  Cualquier color nuevo se define como token con su función; si no tiene una función clara, no se agrega.

## Estructura

```
laestrella/
  index.html            ingreso: se toca el nombre y se escribe el PIN de 4 números
  caja/index.html       frente de caja (POS)
  panel/index.html      panel de administración (Inicio, Ventas, Productos, Stock, Compras, Caja,
                        Reportes, Equipo, Ajustes)
  fonts/                Hanken Grotesk y Fraunces (licencia OFL), autoalojadas
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
