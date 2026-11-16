# La Estrella — borrador del sistema de caja y gestión

Sistema para un almacén (estilo supermercado) en Uruguay: **frente de caja (POS)** para quien cobra y
**panel** para la dueña, sobre la misma base. Este borrador es para mostrar cómo funciona: **todo es de
muestra y vive solo en el navegador** (`localStorage`). Después se traslada a una carpeta/repo propio
(privado) y se conecta una base real, como se hizo con Parking Despegar.

## Decisiones (Santi)

- **Tipo:** software, no una web de cliente. Se usa el estándar de Livo en lo que aplica (móvil primero,
  `movil.css` sin media queries, `escritorio.css` solo desde 768px, tokens, íconos Lucide en sprite,
  scroll nativo, rebordes de 1px, `noindex`, tarjeta de WhatsApp en cada página).
- **Roles:** dos. **Dueña** (control total) y **Caja** (cobra y maneja su turno).
- **Una sola caja.** Internet se corta poco, pero el POS tiene que seguir vendiendo sin conexión.
- **Facturación:** el almacén es **monotributo** y todavía no tiene proveedor de facturación electrónica.
  Por ahora el ticket sale como **comprobante interno** y lo dice en el papel. Queda preparado (IVA por
  producto, numeración propia, cobro separado de la emisión) para conectar un proveedor autorizado por la
  DGI si hace falta. **PENDIENTE confirmar con el contador** si el monotributo del almacén lo obliga a emitir
  e-Ticket (las fuentes consultadas se contradicen y son blogs de proveedores, no la DGI).
- **Equipo previsto (a confirmar):** terminal Android 14 con pantalla dual de 8" + display de cliente,
  impresora térmica de **58 mm** integrada y lector. Por eso el ticket es de **32 columnas**.
- **Paleta:** azul noche `#14213D` (dominante), crema `#F6F3EC` (fondo), amarillo estrella `#F2B51B`
  (acento, nunca en texto). Tipografía del sistema (sin descargas: tiene que andar sin internet).

## Estructura

```
laestrella/
  index.html            ingreso: se toca el nombre y se escribe el PIN de 4 números
  caja/index.html       frente de caja (POS)
  panel/index.html      panel de la dueña (Inicio, Ventas, Productos, Stock, Compras, Caja,
                        Reportes, Equipo, Ajustes)
  css/                  tokens.css (Livo) · tokens-proyecto.css · base.css · movil.css ·
                        escritorio.css · impresion.css (ticket de 58 mm)
  js/datos.js           la "base": datos de muestra + todas las reglas (LE.*)
  js/ticket.js          ticket de 32 columnas + bytes ESC/POS + impresión desde el navegador
  js/ui.js              modales, avisos, teclado, CSV
  js/caja.js            POS
  js/panel.js           panel: núcleo, Inicio, Ventas, Productos, gráficos
  js/panel-gestion.js   panel: Stock, Compras, Caja, Reportes, Equipo, Ajustes
  js/iconos.js          sprite Lucide generado desde lucide-static (no hay paths a mano)
```

## Cómo está pensada la "base" (para pasarla a Supabase)

`js/datos.js` hace lo que después harán funciones del servidor, igual que `crear_reserva` o `cerrar_caja`
en Parking: **controlan el rol, calculan los importes y anotan en la auditoría**. La pantalla nunca manda
un precio: manda producto y cantidad, y el servidor pone el precio.

| Función de datos.js | Equivalente en Supabase |
|---|---|
| `crearVenta` (idempotente por `id`) | `crear_venta()`; el `id` lo genera la caja para no duplicar al reenviar |
| `abrirCaja` / `egresoCaja` / `cerrarCaja` | funciones con `exigir_rol('duena','caja')`; una sola caja abierta (índice único) |
| `anularVenta`, `guardarProducto`, `guardarUsuario`, `ajustarStock`, compras | solo `duena` |
| `guardarUsuario` | nadie cambia su propio rol ni se desactiva; siempre queda una dueña activa |
| `marcarAsistencia` | igual que Parking (`asistencias`) |
| `auditoria` | tabla `auditoria` escrita solo por el servidor |

Montos en **centavos** (enteros); cantidades por peso en kg con 3 decimales. Tablas previstas: `perfiles`,
`productos`, `categorias`, `proveedores`, `compras`, `compra_items`, `ventas`, `venta_items`, `venta_pagos`,
`caja_turnos`, `caja_movimientos`, `stock_movimientos`, `asistencias`, `auditoria`, `negocio`. RLS en todas.

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

## Datos de muestra

Productos, proveedores, personas y ventas de 14 días son inventados. Los productos son típicos de un almacén
uruguayo con precios de muestra. **IVA de muestra:** confirmar tasas con el contador.
PINs de muestra: Marta (dueña) 1234 · Lucía (caja) 1111 · Diego (caja) 2222.

## PENDIENTES

- Confirmar con el contador si hace falta e-Ticket (monotributo) y, si sí, elegir proveedor.
- Confirmar formato de etiqueta de la balanza y marca/modelo.
- Confirmar con el vendedor cómo imprime la terminal desde una web.
- RUT, dirección y teléfono reales del almacén (hoy `PENDIENTE` / de muestra).
- Logo definitivo (el actual es una estrella de Lucide con el nombre, solo para el borrador).
- Offline real, base real (Supabase), respaldos y traslado a su propio repo privado.
