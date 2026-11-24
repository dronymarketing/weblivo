# Avisos de WhatsApp a deudores (Cloudflare Worker)

Misma idea que en Parking Despegar. Cuando un deudor llega al **80 %** de su límite y cuando lo **pasa**, la base crea el aviso
y le avisa sola al Worker (`worker.js`), que lo manda por la API de WhatsApp de Meta con una plantilla aprobada y anota
«Enviado» o «Error» en **Deudores → Avisos**. Nadie toca nada. Si falla, el aviso queda en el panel y se manda a mano con
**Abrir en WhatsApp**.

Ninguna llave vive en la página: son secretos cifrados de Cloudflare.

## Instalación (una sola vez)

1. **Base:** correr `supabase/esquema.sql` completo en Supabase → SQL Editor (agrega las funciones del servicio).
2. **Clave del servicio:** en el SQL Editor correr `select public.crear_clave_servicio();` → copiar el resultado (se ve una sola vez).
3. **Worker:** dash.cloudflare.com → Workers & Pages → Create → Create Worker, nombre `la-estrella` → Deploy → **Edit code** →
   pegar `worker.js` → Deploy. Su dirección es `https://la-estrella.….workers.dev`.
4. **Secretos** (Worker → Settings → Variables and Secrets), tipo *Secret*: `SERVICIO_CLAVE` (la del paso 2) y `WHATSAPP_TOKEN`.
5. **Meta** (developers.facebook.com): app con el producto WhatsApp, un **número** que no tenga WhatsApp instalado y un
   **usuario del sistema** (Business Settings → System users) con token permanente (`whatsapp_business_messaging`).
6. **Plantilla** (WhatsApp Manager → Message templates → Create): categoría **Utilidad**, idioma español, nombre `aviso_cuenta`,
   cuerpo con **una sola variable**: `Aviso de tu cuenta en La Estrella: {{1}}`. Meta la aprueba en minutos o pocos días.
   Para escribirle a un cliente que nunca le escribió al negocio **la plantilla es obligatoria**.
7. **Variables de texto** del Worker: `WHATSAPP_NUMERO_ID` (el *Phone number ID*), `WHATSAPP_PLANTILLA` = `aviso_cuenta`
   y, si el idioma no es `es`, `WHATSAPP_PLANTILLA_IDIOMA`.
8. **Conectar la base con el Worker:** en el SQL Editor,
   `update public.config_servicio set aviso_url = 'https://la-estrella.….workers.dev/aviso';`
9. En `js/config.js` poner `whatsapp: true` (solo hace que la pantalla se actualice sola cuando sale el aviso).
10. Probar: abrir la dirección del Worker → tiene que decir `{"whatsapp":true}`. Después, una venta a cuenta que cruce el 80 %.

Diagnóstico: Cloudflare → Worker → Observability → Live. Si dice «falta configurar WhatsApp», revisá los pasos 4 y 7.

## Costos y límites

- Cloudflare Workers: gratis en este uso.
- Meta cobra un precio chico por mensaje de plantilla de utilidad (revisar su tabla antes de prender el envío).
- El teléfono se guarda como se escriba (`099 123 456`); el Worker lo pasa a `59899123456`. Sin teléfono, el aviso queda en Error.
- **No probado contra Meta real** (necesita las credenciales). Sí probado: la base, el disparador y el Worker con un Meta simulado.
