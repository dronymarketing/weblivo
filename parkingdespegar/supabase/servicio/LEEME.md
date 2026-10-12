# Servicio en Cloudflare (`worker.js`)

Un solo Worker de Cloudflare (gratis) que hace dos cosas:

1. **Reactivar la base** si el plan gratis de Supabase la pausa tras una semana sin uso. El panel
   muestra un cartel con un único botón, **Confirmar**, que llama a `POST /reactivar`; la reserva web
   también la despierta sola. (Los respaldos de GitHub ya consultan la base dos veces por día para que
   la pausa no pase.)
2. **Asistente de WhatsApp** para la dueña: le escribe o le manda un audio («¿cuántos autos hay?»,
   «¿cuánto cobré esta semana?», «¿cómo está la caja?») y contesta con los datos del momento.
   Sin IA paga: entiende las preguntas comunes por palabras clave y pasa los audios a texto con
   Whisper de Workers AI (gratis en este uso). Lee la base con `asistente_consulta()`, que solo
   responde con la clave del asistente y a números habilitados en el panel, y no puede cambiar nada.

Ninguna llave vive en la página: todas son **secretos cifrados de Cloudflare**.

## Instalación (una sola vez)

### A. El Worker
1. Crear cuenta gratis en dash.cloudflare.com → **Workers & Pages → Create → Create Worker**.
   Nombre: `parking-despegar` → **Deploy**.
2. **Edit code** → borrar todo → pegar `worker.js` → **Deploy**.
3. Su dirección (`https://parking-despegar.….workers.dev`) va en `js/config.js` → `reactivar`
   (no es secreta).

### B. Reactivar la base
4. supabase.com/dashboard/account/tokens → **Generate new token** (`parking-despegar`) → copiar.
5. Worker → **Settings → Variables and Secrets → Add** → tipo **Secret**: `SUPABASE_TOKEN` = la llave.

### C. Asistente de WhatsApp
6. **Base:** Supabase → SQL Editor → pegar `supabase/asistente.sql` → **Run** (una vez; ya viene
   incluido al final de `esquema.sql` para instalaciones nuevas).
7. **Panel → Ajustes → Asistente:** habilitar el celular de la dueña y tocar **Crear clave** →
   copiarla a Cloudflare como secreto `ASISTENTE_CLAVE`.
8. **Número del asistente:** un chip que **no** tenga WhatsApp instalado (si lo tuvo, borrar esa
   cuenta antes).
9. **Meta** (developers.facebook.com): **Create App** → caso de uso de WhatsApp → crear o elegir el
   portafolio de Meta Business. En **WhatsApp → API Setup**: **Add phone number**, nombre visible
   «Parking Despegar» (tiene que corresponder al negocio) y el código que llega por SMS.
   No hace falta verificar la empresa: sin verificar, Meta permite 2 números y 250 personas por día.
10. **Token permanente:** Meta Business → **Settings → System users → Add** (Admin) → asignarle la
    app y la cuenta de WhatsApp → **Generate token** con `whatsapp_business_messaging` y
    `whatsapp_business_management` → secreto `WHATSAPP_TOKEN`.
11. **App secret:** en la app, **App settings → Basic → App secret** → secreto `WHATSAPP_SECRETO_APP`.
12. **Palabra de verificación:** inventar una (por ejemplo `despegar-` + algo al azar) → secreto
    `WHATSAPP_VERIFICACION`.
13. **Audios:** Worker → **Settings → Bindings → Add → Workers AI**, nombre `AI`.
14. **Webhook:** en Meta, **WhatsApp → Configuration → Webhook**: Callback URL
    `https://parking-despegar.….workers.dev/whatsapp`, Verify token = la palabra del paso 12 →
    **Verify and save** → en *Webhook fields*, suscribir **messages**.
15. Pasar la app a modo **Live** (Meta pide la dirección de una política de privacidad).
16. Probar: desde el celular habilitado, escribirle «hola» al número del asistente.

Abrir la dirección del Worker muestra `{"reactivar": true, "whatsapp": true}` cuando está todo cargado,
y el panel (Ajustes → Asistente) indica «Servicio de WhatsApp conectado».

## Costos

- Cloudflare Workers y Workers AI: gratis en este uso (los audios usan una fracción mínima de la cuota diaria).
- WhatsApp: desde el 1/10/2026 Meta cobra las respuestas, pero las primeras 1.000 por mes por número
  son gratis. Con la dueña consultando, no se llega.

## Qué entiende

Autos en el parking, lugares libres, quién llega y quién sale hoy (y cuántos llegan mañana), lo cobrado
(hoy, ayer, esta semana, la semana pasada, este mes, el mes pasado, un mes por nombre, este año) con el
detalle por medio de pago y facturas, la caja abierta, reservas web y reservas nuevas por origen,
traslados pendientes, el equipo y quién entró hoy, y un resumen. Si no entiende, contesta con ejemplos.
Si la base está en pausa, la despierta y avisa. A números no habilitados no les contesta.

## Si cambia algo

- **Otro proyecto o dominio:** cambiar `PROYECTO`, `CLAVE_PUBLICA` y `ORIGENES` arriba de `worker.js` y volver a pegarlo.
- **Clave del asistente nueva** (panel → Crear clave nueva): reemplazar `ASISTENTE_CLAVE` en Cloudflare.
- **Probar la reactivación de verdad:** Supabase → Project Settings → General → **Pause project**,
  abrir el panel y tocar **Confirmar**.
