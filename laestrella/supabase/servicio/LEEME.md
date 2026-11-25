# Asistente y avisos de WhatsApp (Cloudflare Worker)

Mismo esquema que Parking Despegar. Un Worker gratis (`worker.js`) hace dos cosas:

1. **Asistente:** la dueña le escribe (o manda un audio) al número del negocio y contesta con los datos del momento:
   «¿cuánto vendí hoy?», «¿cómo está la caja?», «¿qué falta reponer?», «¿cuánto stock hay de arroz?», «¿quién debe?»,
   «¿cuánto debe Ana?», «¿qué se vendió más?», «¿cómo vamos?». Sin IA paga: entiende por palabras clave y pasa los audios
   a texto con Whisper (Workers AI, gratis en este uso). Solo lee, no puede cambiar nada, y solo contesta a los celulares
   que se habilitan en **panel → Ajustes → Asistente**.
2. **Avisos a deudores:** al llegar al 80 % de su límite y al pasarlo, la base crea el aviso y le avisa sola al Worker, que lo
   manda con una plantilla aprobada y anota «Enviado» o «Error» en **Deudores → Avisos**. Si falla, se manda a mano con
   **Abrir en WhatsApp**.

Ninguna llave vive en la página: son secretos cifrados de Cloudflare.

## Instalación (una sola vez)

### A. Base y Worker
1. **Base:** correr `supabase/esquema.sql` completo en Supabase → SQL Editor.
2. **Clave del servicio:** en el SQL Editor, `select public.crear_clave_servicio();` → copiar el resultado (se ve una sola vez).
3. **Worker:** dash.cloudflare.com → Workers & Pages → Create → Create Worker, nombre `la-estrella` → Deploy → **Edit code** →
   pegar `worker.js` → Deploy. Dirección: `https://la-estrella.….workers.dev`.
4. **Conectar la base con el Worker:** en el SQL Editor,
   `update public.config_servicio set aviso_url = 'https://la-estrella.….workers.dev/aviso';`
5. En `js/config.js` poner `whatsapp: true` (solo hace que la pantalla se actualice sola cuando sale un aviso).

### B. Meta (developers.facebook.com)
6. App con el caso de uso **Conectar con los clientes a través de WhatsApp**.
7. **Número:** para probar, el número de prueba de Meta (manda solo a celulares verificados, hasta 5, y NO recibe
   mensajes en esta app). Para el uso real, un chip que **no** tenga WhatsApp instalado, agregado en **WhatsApp →
   Configuración de producción** (conviene en una cuenta de WhatsApp Business propia de La Estrella, así los mensajes
   que llegan van al webhook de esta app y no al de otro negocio). Nombre visible «La Estrella».
8. **Token permanente:** Business Settings → Usuarios del sistema → Agregar (Admin) → asignarle esta app y la cuenta de
   WhatsApp → **Generar token** con `whatsapp_business_messaging` y `whatsapp_business_management` → secreto `WHATSAPP_TOKEN`.
9. **App secret:** en la app, Configuración → Básica → Clave secreta → secreto `WHATSAPP_SECRETO_APP`.
10. **Palabra de verificación:** inventar una (por ejemplo `estrella-` + algo al azar) → secreto `WHATSAPP_VERIFICACION`.
11. **Plantilla** (WhatsApp Manager → Plantillas de mensajes → Crear): categoría **Utilidad**, español, nombre `aviso_cuenta`,
    cuerpo con **una sola variable**: `Aviso de tu cuenta en La Estrella: {{1}}`. Hace falta para escribirle a un deudor que
    nunca le escribió al negocio.
12. **Webhook** (WhatsApp → Configuración → Webhook): URL `https://la-estrella.….workers.dev/whatsapp`, Verify token = la
    palabra del paso 10 → **Verificar y guardar** → suscribir el campo **messages**.
13. La cuenta de WhatsApp tiene que estar enganchada a la app (si no llega nada al Worker): en el Explorador de la API de
    Graph, **POST** `<ID de la cuenta de WhatsApp Business>/subscribed_apps` → `{"success": true}`.

### C. Cloudflare: secretos y variables (Worker → Settings → Variables and Secrets)

| Nombre | Tipo | Valor |
|---|---|---|
| `SERVICIO_CLAVE` | Secret | la del paso 2 |
| `WHATSAPP_TOKEN` | Secret | el token del paso 8 |
| `WHATSAPP_SECRETO_APP` | Secret | el del paso 9 |
| `WHATSAPP_VERIFICACION` | Secret | la palabra del paso 10 |
| `WHATSAPP_NUMERO_ID` | Texto | el *Phone number ID* |
| `WHATSAPP_PLANTILLA` | Texto | `aviso_cuenta` |
| `WHATSAPP_PLANTILLA_IDIOMA` | Texto | solo si el idioma no es `es` |

Audios: Worker → Settings → **Bindings → Add → Workers AI**, con el nombre `AI`.

### D. Habilitar a la dueña
14. Panel → **Ajustes → Asistente** → nombre y celular → **Habilitar**.
15. Probar: desde ese celular, escribirle «hola» al número del negocio.

Abrir la dirección del Worker muestra `{"avisos":true,"asistente":true}` cuando está todo cargado.

## Notas
- Las respuestas dentro de las 24 h desde el último mensaje de la dueña son gratis. Los avisos a deudores van con plantilla:
  Meta cobra un precio chico por mensaje de utilidad (revisar su tabla antes de prender el envío).
- El teléfono del deudor se guarda como se escriba (`099 123 456`); el Worker lo pasa a `59899123456`. Sin teléfono, el aviso queda en Error.
- **Clave nueva:** correr de nuevo `select public.crear_clave_servicio();` y reemplazar `SERVICIO_CLAVE` en Cloudflare.
- Diagnóstico: Cloudflare → Worker → Observability → Live.
- **No probado contra Meta real** (necesita las credenciales). Sí probado: la base, el disparador, el panel y el Worker con un Meta simulado.

## Avisos al dueño (como Torre en Parking)

Además de contestar preguntas, el sistema le **avisa solo** a los celulares habilitados (Ajustes → Asistente):

| Aviso | Cuándo |
|---|---|
| 👷 Empezó / 🏁 terminó de trabajar | Cuando una cajera marca su jornada (la administración no se avisa a sí misma) |
| 🟢 Caja abierta | Al abrir el turno (quién, a qué hora, con cuánto) |
| 🔒 Caja cerrada | Al cerrar, con el detalle: vendido y por medio de pago, deudores (no suma), cobros de deudas, retiros, cuánto debía haber, cuánto se contó y la diferencia |
| 💸 Retiro de caja | Cada retiro (monto, motivo, quién, cuánto queda en el cajón) |
| 🚚 Llegó mercadería | Al recibir una compra (proveedor, productos, total) |
| 🟡 Stock bajo / 🔴 Se acabó | Solo cuando un producto **cruza** su mínimo o llega a cero, no en cada venta |
| 🟡 / 🔴 Deudor al 80 % o en su límite | La primera vez que lo cruza |
| ✅ Cobro de deuda | Cada pago de un deudor |
| 🚫 Venta anulada | Cada anulación (ticket, motivo, quién) |

**Nunca se avisa de cada venta.**

**Ventana de 24 horas:** WhatsApp solo deja escribirle libre a quien le escribió al negocio en las últimas 24 horas. Alcanza con
mandarle un `hola` al asistente cada mañana. Si querés que avise siempre, aunque no le hayas escrito, hace falta una plantilla
(opcional, Meta cobra unos USD 0,011 por aviso): categoría Utilidad, español, cuerpo con una variable y texto antes y después, por ejemplo
`Aviso de La Estrella: {{1}}` seguido de `Respondé este mensaje para ver más.` Cuando la aprueben, en Cloudflare:
`WHATSAPP_PLANTILLA_DUENO` = su nombre (y `WHATSAPP_PLANTILLA_DUENO_IDIOMA` si no usa el de `WHATSAPP_PLANTILLA_IDIOMA`).

Instalación: correr `esquema.sql` (o el archivo corto de avisos) y pegar el `worker.js` nuevo. No hace falta otra variable ni otro webhook:
usa la misma dirección que los avisos a deudores (`/aviso` → `/evento`).
