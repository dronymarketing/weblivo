# Servidor de pagos de Panacea

Un servidor chico (Cloudflare Worker, plan gratuito) que conecta la web con **Bamboo Payment**.
La web de Panacea es estática (no tiene servidor), y para cobrar hace falta uno: guarda la clave
secreta de Bamboo, calcula el total y recibe el aviso de que el pago se hizo.

## Cómo funciona

```
Cliente en panacea/pago.html
   │  1. "Pagar $1.560"  →  POST /api/crear-pago  (productos, datos, medio)
   ▼
Servidor de pagos
   │  2. Recalcula el total con SUS precios (nunca los del navegador)
   │  3. Crea el pago en Bamboo y guarda el pedido
   ▼
Bamboo  ←  el cliente paga en la página segura de Bamboo / su banco
   │  4. Avisa al servidor (webhook) con el resultado
   ▼
Servidor: verifica con Bamboo, marca el pedido APROBADO, (opcional) manda emails
   │
Cliente vuelve a panacea/gracias.html  →  GET /api/pedido  →  ve el estado real
```

- **Transferencia bancaria** (BROU, Santander, Itaú, BBVA, Scotiabank): API de compras de Bamboo; el
  cliente va a su home banking.
- **Tarjetas** (Visa, Mastercard, OCA, Passcard, CABAL): enlace de pago hospedado por Bamboo. Los datos de
  la tarjeta los escribe el cliente en la página de Bamboo: **Panacea nunca los toca**.
- Los pedidos se guardan 60 días en Cloudflare KV.

## Lo que necesitás

1. **Credenciales de Bamboo** (ambiente `stage` para probar). Se piden a Bamboo (la documentación dice
   que están en su "Getting Started"). Hace falta la **clave privada del comercio**. Pedir también:
   que habiliten transferencias bancarias y el enlace de pago con tarjetas para Uruguay.
2. Cuenta gratuita en **Cloudflare**.
3. **Node.js 20 o más** instalado en tu PC.

## Puesta en marcha

Desde la carpeta `servidor-pagos/`:

```bash
npm install
npx wrangler login
```

**1. Crear el lugar donde se guardan los pedidos**

```bash
npx wrangler kv namespace create PEDIDOS
```

Copiá el `id` que muestra y pegalo en `wrangler.toml` (reemplaza `REEMPLAZAR_POR_EL_ID_DEL_KV`).

**2. Cargar los secretos** (te los va a pedir uno por uno; no se guardan en ningún archivo):

```bash
npx wrangler secret put BAMBOO_PRIVATE_KEY   # la clave privada de stage que te dio Bamboo
npx wrangler secret put WEBHOOK_CLAVE        # inventá una clave larga al azar (30+ caracteres)
npx wrangler secret put ADMIN_CLAVE          # otra clave larga, para ver los pedidos
```

**3. Desplegar**

```bash
npx wrangler deploy
```

Te muestra la dirección, algo como `https://panacea-pagos.TU-USUARIO.workers.dev`.
Comprobá que anda abriendo `…/api/salud`: tiene que decir `"configurado": true`.

**4. Conectar la web**: en `js/config.js` (en la raíz de `panacea/`) poné esa dirección:

```js
window.PANACEA_API = "https://panacea-pagos.TU-USUARIO.workers.dev";
```

Al subirlo, el aviso de "Modo prueba" desaparece solo y el botón "Pagar" va a Bamboo.

**5. Si usás otro dominio** (por ejemplo, otra dirección para la web), agregalo a `ORIGENES` y
`SITIO` en `wrangler.toml` y volvé a desplegar.

## Probar

- `npm test`: 24 pruebas automáticas del servidor (no necesitan Bamboo ni internet).
- Probar en tu PC con el servidor real: copiá `.dev.vars.example` como `.dev.vars`, completalo y corré
  `npx wrangler dev`. Para que la web local lo use, poné `http://localhost:8787` en `js/config.js`
  (y no lo subas así).
- En **stage** probar: una transferencia (por ejemplo "Banco República") y una tarjeta de prueba. Las
  tarjetas de prueba de Uruguay están en la documentación de Bamboo
  ("Uruguay Credit and Debit Cards"). También se puede usar la colección de Postman de Bamboo.
- Fijate que después de pagar, `gracias.html` pase de "Pago en proceso" a "Compra confirmada".

## Pasar a producción

1. Pedirle a Bamboo la clave de producción.
2. `npx wrangler secret put BAMBOO_PRIVATE_KEY` (la de producción).
3. En `wrangler.toml` cambiar `BAMBOO_ENTORNO = "prod"` y `npx wrangler deploy`.
4. Hacer una compra real chica y confirmar que llega a Bamboo y a `gracias.html`.

## Ver los pedidos

Hasta que haya otra forma, los pedidos se ven con:

```bash
curl -H "Authorization: Bearer TU_ADMIN_CLAVE" https://panacea-pagos.TU-USUARIO.workers.dev/api/admin/pedidos
```

Cada pedido tiene sus productos, los datos del cliente (nombre, email, teléfono, cómo recibe el pedido),
el medio de pago y el estado: `PENDIENTE`, `APROBADO`, `RECHAZADO`, `CANCELADO`, `ERROR` o `REVISAR`
(`REVISAR` = Bamboo aprobó un monto distinto al del pedido: no se da por pagado, hay que mirarlo).
Los pagos también se ven en la consola de Bamboo.

## Emails (opcional)

Para que Paola y el cliente reciban un mail cuando se aprueba un pago, usar [Resend](https://resend.com)
(plan gratuito): verificar un dominio, y cargar `npx wrangler secret put RESEND_API_KEY`, más
`EMAIL_DESDE` (ej. `Panacea <pedidos@tudominio.com>`) y `EMAIL_PAOLA` en `wrangler.toml`.
Sin esto, no se manda nada y los pedidos se consultan como arriba.

## Cambiar precios o productos

El servidor tiene **su propio catálogo** en `src/logica.js` (así nadie puede cambiar un precio desde el
navegador). Tiene que coincidir con `js/productos.js`: si cambiás uno, cambiá el otro. `npm test` falla
si no coinciden. Después `npx wrangler deploy`.

## Lo que hay que confirmar con Bamboo

Armé esto con la documentación pública. Hay cosas que ahí **no** están claras, y se deben confirmar al
probar en `stage` (todo lo que depende de Bamboo está aislado en `src/bamboo.js`):

1. **Enlace de pago con tarjetas** (`h2h…/api/v1/payments`): la documentación no muestra la respuesta ni
   cómo se autentica. Usé la misma autenticación que la API de compras y busco la URL en la respuesta.
   Si falla, el servidor lo anota en sus registros (`npx wrangler tail`) y el cliente ve un error.
   Además, ese endpoint figura como disponible **solo para el modelo Gateway**: confirmar si la cuenta de
   Panacea es Gateway o Payfac.
2. **Ruta de consulta de una compra** (`GET …/Purchase/{id}`): se usa para no creerle ciegamente al aviso.
   Si no existe, el servidor usa el estado del aviso (que solo conoce quien tenga `WEBHOOK_CLAVE`).
3. **Firma del webhook**: no encontré cómo la documenta Bamboo. Por eso la URL del aviso lleva una clave
   (`WEBHOOK_CLAVE`). Si Bamboo ofrece firma, conviene sumarla.
4. **Prex**: no figura entre los medios del modelo Gateway; en la web queda deshabilitado ("pronto").
5. **Qué medios habilita Bamboo para este comercio** (cuotas, débito, Abitab/RedPagos, etc.): hoy se
   ofrecen los de `MEDIOS` en `src/logica.js`.
6. **Campos opcionales que Bamboo recomienda** (documento de identidad, dirección, IP del cliente para
   antifraude): hoy no se mandan. Si Bamboo los exige, hay que pedirlos en el formulario.
7. **Facturación y envíos**: lo define Paola con su contador (RUT, facturas). El servidor solo cobra.

## Seguridad, en corto

- La clave privada de Bamboo vive solo como secreto de Cloudflare; **nunca** está en el repositorio ni en la web.
- El total se calcula en el servidor con su catálogo; el navegador no puede cambiar precios.
- Solo `ORIGENES` puede pedir pagos (CORS) y se validan todos los datos.
- Un pago solo se aprueba si el monto es exactamente el del pedido.
- `/api/pedido` solo responde con el número y el token del link de vuelta y no muestra datos personales.
- Conviene sumar en Cloudflare una regla de límite de pedidos por IP (Security → WAF → Rate limiting).
