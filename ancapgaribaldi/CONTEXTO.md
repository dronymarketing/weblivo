# Ancap Santa María — tienda online + panel de atrás

Estación de servicio en **Av. Gral. José Garibaldi 1902, esquina José L. Terra (Goes, Montevideo)**, abierta las 24 horas.
Es un **sistema**, no una web de presentación: una **tienda** de súper donde la gente compra y paga online con envío a domicilio,
una sección de **servicios del vehículo** con formulario de consulta, y un **panel de atrás** donde el negocio recibe y gestiona todo.
Referencia de estructura (no copia): Parking Despegar, dos paneles sobre la misma base. La carpeta se llama `ancapgaribaldi/`
(así se bautizó el proyecto); el nombre en pantalla es **Ancap Santa María**, que es como figura en directorios.

## Decisiones (Santi)

- **Compra:** pedido dentro de la web, **pago online**. El medio de pago todavía no está definido: hoy es un **pago de muestra**
  (no hay campos de tarjeta; el botón confirma el pedido). Queda preparado para Mercado Pago.
- **Entrega:** solo **envío a domicilio**, **por zona o barrio**: cada zona tiene costo, pedido mínimo y monto desde el cual el envío es gratis.
- **Panel «completo»:** pedidos (aviso en vivo), consultas de vehículos, productos y stock, zonas, ofertas y banners, clientes, reportes,
  compras a proveedores, equipo con roles, registro de movimientos, ajustes y avisos al dueño por WhatsApp.
- **Servicios del vehículo:** confirmados por la clienta: venta de **cubiertas**, **alineación y balanceo**, **taller mecánico**, abiertos 24 h.
  Salieron de directorios y están **sin confirmar** (marcados `PENDIENTE` en `js/datos.js`): **gomería, lavadero, lubricentro**.
  Piden por **formulario de consulta** (marca, modelo, año, qué necesita) que entra al panel.
- **Marca:** se usa el **logo oficial de ANCAP** (bajado de ancap.com.uy, con autorización de Santi/la clienta) junto a «Santa María». Colores: **azul `#00457C`** y
  **amarillo `#F8B810`** (el amarillo del logo; solo como fondo con texto `#1A1A1A`, 10,6:1), celeste `#0077A2`, grises de ancap.com.uy. El naranja `#FE7903` del CSS de ANCAP
  quedó solo para avisos. Tipografía: **Archivo** (ancho variable, pesada como el logo) para títulos y precios + **Inter Tight** para el texto; las dos libres y autoalojadas
  (Ancap usa Helvetica Neue LT Std, de pago). Franja de marca amarillo/azul en tramos desparejos, cinta amarilla con la flecha de ANCAP, sellos de descuento azul con letra amarilla.
- **Primera pantalla = la tienda** (pedido de Santi, sin hero fotográfico): **móvil** como la imagen de referencia (encabezado azul con buscador y carrito, categorías en círculos
  sobre el azul, hoja blanca con esquinas redondeadas, banner de ofertas con carrusel, tarjetas de producto asomando, barra inferior con botón central de ofertas);
  **escritorio** como Tienda Inglesa (franja superior, logo + MENÚ + buscador ancho + carrito + «Mi pedido», píldoras de accesos, banner a todo el ancho con flechas, puntos y marco de
  franjas, categorías en círculos celestes con flecha). Tienda Inglesa bloquea la lectura automática (403): se tomó la estructura y los colores de la captura que pasó Santi.
  El hero a pantalla completa con scroll cue se mantiene solo en `servicios.html`.
- **Bebidas de Ancap Puntos (26/11):** Santi pasó capturas de `ancapuntos.com.uy/bebidas.html` y se cargaron **8 productos** en la categoría «Vinos y licores» (gin, whiskies, vinos y un set de copas) con su
  **título, foto y precio de VENTA**; los puntos se ignoran a pedido suyo. Son datos reales de ese catálogo (stock y mínimo de ejemplo). Como llevan alcohol, los productos tienen marca **+18** y,
  si el carrito incluye alguno, el checkout exige confirmar que es mayor de 18 (el pedido queda con `mayor18` y el panel avisa que hay que pedir la cédula al entregar).
  **PENDIENTE:** confirmar con la clienta/contador el texto legal de venta de alcohol y si el envío de alcohol a domicilio tiene horarios o restricciones. Faltan el resto de las categorías de Ancap Puntos (se cargan igual que estas, con capturas).
- **Ancap Puntos:** `ancapuntos.com.uy/estaciones-ancap` muestra una verificación anti-robots y no se pudo leer. Es el programa de canje de la tarjeta BROU ANCAP (catálogo de 200+ productos y
  canje por combustible). **PENDIENTE:** que Santi pegue o capture esa página (productos, estaciones) y, si la estación participa, sumar «Sumá ANCAPuntos» a la tienda.
- Paquete de movimiento **«Fundar»** (apariciones al entrar en pantalla, microtransiciones de 0,3 s). Sin glassmorphism. Íconos Lucide; WhatsApp e Instagram de Simple Icons.
- Pedido de Santi: **que no parezca hecho por IA** → sin degradés decorativos, sin emojis, sin tarjetas de tres íconos, texto concreto y en rioplatense, sin adjetivos de relleno, y datos reales donde los hay.

## Estructura

```
ancapgaribaldi/
  index.html        inicio: hero 100svh con scroll cue, categorías, ofertas, destacados, taller y gomería, envíos, cómo llegar
  tienda.html       catálogo: filtros por categoría, ofertas, orden, búsqueda
  checkout.html     datos, zona (calcula envío y mínimo), pago de muestra
  pedido.html       seguimiento: número + celular → recibido / preparando / en camino / entregado (se actualiza en vivo)
  servicios.html    servicios del vehículo + formulario de consulta
  panel/index.html  panel de atrás (PIN por usuario)
  css/              tokens.css (Livo) · tokens-proyecto.css (paleta Ancap) · base.css · movil.css (sin media queries) · escritorio.css (≥768px)
                    · alturas.css (solo pantallas bajas, ≤660px de alto) · panel-movil.css · panel-escritorio.css
  js/               datos.js (datos y reglas, localStorage) · catalogo.js (87 productos) · tienda.js (tienda: arma encabezado, barra inferior, carrito y pie)
                    · panel.js (núcleo + Inicio, Pedidos, Consultas) · panel-gestion.js (resto de secciones; arranca el panel) · iconos.js (sprite)
  img/              estacion.jpg, tienda.jpg, servicios/, productos/ (fotos de La Estrella), og-blanco.jpg, favicon.png · CREDITOS.md
```

El encabezado, la barra inferior, el carrito lateral y el pie **se arman por JS** (`tienda.js`) para no repetirlos en cada HTML. Si algún día hay que
verlos sin JS, pasan a marcado fijo en cada archivo.

## Cómo funciona el borrador

- **Todo vive en el navegador** (`localStorage`, clave `ag_v1`). Tienda y panel comparten datos: un pedido hecho en la tienda **aparece en el panel**
  abierto en otra pestaña **del mismo navegador** (BroadcastChannel + evento `storage`) con aviso y sonido, y el cambio de estado se ve en el seguimiento.
  Entre aparatos distintos no se comparte nada: para eso hace falta la base real.
- **Datos de ejemplo** (declarados en pantalla, en el pie): 87 productos de La Estrella con foto (precios, costos y stock inventados), 10 zonas de envío con costos
  inventados, ~14 días de pedidos y clientes de ejemplo, consultas, compras a proveedores. Los pedidos se generan **relativos a cuando se abre** por primera vez,
  así siempre hay nuevos, en preparación y en camino. «Ajustes → Volver a los datos de ejemplo» los restaura.
- **Roles** (PIN de ejemplo, visibles en el ingreso del borrador): Administración `1234` (todo), Mostrador `1111` (pedidos, productos con precio/oferta/stock, clientes),
  Taller `2222` (solo consultas). **Los permisos hoy solo los aplica la pantalla**; con Supabase pasan al servidor (funciones `security definer` + RLS, como en La Estrella).
- **Avisos al dueño por WhatsApp:** simulados (campana del panel). Eventos: pedido nuevo, consulta nueva, stock bajo, pedido cancelado; nunca cada venta.
  El envío real se arma como en La Estrella / Parking Despegar (Worker de Cloudflare + WhatsApp Business de Meta). Ver `.claude/skills/livo-design/references/asistente-whatsapp.md`.
- Stock: baja al confirmar el pedido, vuelve si se cancela, sube al recibir una compra. «Para reponer» = por debajo del mínimo.

## PENDIENTES (para cerrar con la clienta)

- **WhatsApp** (celular de 9 dígitos) e **Instagram**: se cargan en Panel → Ajustes y aparecen solos. Los celulares que aparecen en directorios vienen con 8 dígitos: no se usaron.
- **Servicios sin confirmar:** gomería, lavadero, lubricentro.
- **Zonas de envío reales** con costo, mínimo y monto de envío gratis (las 10 actuales son de ejemplo).
- **Productos reales** de la estación (bebidas, snacks, lubricantes, accesorios) y sus fotos; los 87 actuales son de un almacén. Los productos nuevos sin foto muestran «Foto pendiente».
- **Fotos reales** de la estación y del taller (las de muestra son de banco; la de la estación está recortada para que no se vea la marca de otra petrolera).
- **Medio de pago:** definir (Mercado Pago es lo más usado) y conectar. No hay formulario de tarjeta en el borrador a propósito.
- **Nombres reales del equipo** (hoy «Administración», «Mostrador», «Taller») y PINs.
- Factura / comprobante: confirmar con el contador qué corresponde emitir en ventas online.

## Para pasar a producción

1. Base real (Supabase) con el mismo criterio que La Estrella: RLS sin políticas y toda lectura/escritura por funciones del servidor.
2. Pago real + confirmación por webhook (el pedido entra al panel recién cuando el pago está acreditado).
3. Worker de WhatsApp para los avisos al dueño y, si se quiere, el asistente que contesta consultas.
4. Fotos y catálogo reales; borrar los datos de ejemplo.
5. Quitar `noindex` cuando se publique, y subir el `?v=` de cada CSS/JS que se toque (cache).

## Verificado (Playwright, 26/11/2026)

375 px y 1280 px sin scroll horizontal ni errores de consola; barrido de alturas del hero (560–900 px de alto, 360 y 375 de ancho, y 1280×600–900): el hero mide
exactamente una pantalla y el scroll cue no queda tapado; flujo de compra completo (carrito → checkout con validaciones → pedido → seguimiento); consulta de vehículo;
aviso en vivo en el panel; permisos por rol; sin JavaScript y con «reducir movimiento» el contenido se ve igual; sin imágenes rotas ni ids duplicados.
**Sin probar en un celular real** (la barra de direcciones de Chrome Android no se reproduce en el navegador de pruebas).
