# Envío automático de avisos por WhatsApp

Cuando un deudor llega al **80 %** de su límite, y cuando lo **supera**, el sistema crea un aviso con el mensaje ya escrito
(se ve en **Deudores → Avisos de WhatsApp** del panel). Mientras esto no esté conectado, cada aviso queda «Pendiente» y se
manda a mano con el botón **Abrir en WhatsApp** (se abre el chat del cliente con el texto listo).

Para que salgan **solos, sin tocar nada**, hace falta una cuenta de **WhatsApp Business (API oficial de Meta)**. Es un trámite
de tu lado: yo no puedo crear esas cuentas. Lo que ya está hecho es la función del servidor (`enviar-whatsapp/index.ts`) y el
sistema que la llama. **No está probada contra WhatsApp real** (no hay forma de probarla sin tus credenciales).

## Qué tenés que conseguir

1. Una cuenta en **Meta for Developers** y una app de tipo *Business* con el producto **WhatsApp**.
2. Un **número de teléfono** para el negocio (no puede estar ya usado en la app común de WhatsApp).
3. El **identificador del número** (*Phone number ID*) y un **token permanente** (se crea con un *System User* en Meta Business).
4. Una **plantilla de mensaje** aprobada por Meta (categoría *Utilidad*), con **una sola variable** en el cuerpo. Texto sugerido:
   `Aviso de tu cuenta: {{1}}`. El sistema manda ahí el mensaje completo. Sin plantilla solo se puede escribir a quien le
   escribió al negocio en las últimas 24 horas, así que **para avisar a deudores hace falta la plantilla**.

> **Costo:** Meta cobra por conversación (los mensajes de utilidad tienen un precio chico por mensaje, según el país). Revisalo
> en su tabla de precios antes de prender el envío. La aprobación de la plantilla puede tardar de minutos a unos días.

## Cómo se conecta (una sola vez)

Con el [CLI de Supabase](https://supabase.com/docs/guides/cli) instalado y el proyecto vinculado (`supabase link`):

```bash
supabase secrets set WHATSAPP_TOKEN=el_token_permanente
supabase secrets set WHATSAPP_PHONE_ID=el_phone_number_id
supabase secrets set WHATSAPP_TEMPLATE=nombre_de_la_plantilla
supabase secrets set WHATSAPP_IDIOMA=es
supabase functions deploy enviar-whatsapp
```

Después, en `js/config.js` cambiá `whatsapp: false` por `whatsapp: true`. A partir de ahí, cada venta a cuenta que cruce un
umbral dispara el envío en el momento. Si algo falla, el aviso queda en **Error** con el motivo y se puede mandar a mano.

**Los secretos (token) se guardan solo en Supabase.** Nunca se pegan en `config.js` ni se mandan por chat.

## Notas

- El teléfono del deudor se guarda como lo escribas (`099 123 456`); la función lo pasa a formato internacional de Uruguay (`59899123456`).
- Si un deudor no tiene teléfono cargado, el aviso queda en **Error: no tiene teléfono** y se ve en el panel.
- Alternativa más simple si no querés usar Meta directo: un proveedor como Twilio. La función se adapta cambiando el `fetch`.
