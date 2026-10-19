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
3. **Avisos de Torre**: cuando entra un auto (check-in) o llega una reserva nueva (las de la web, al
   pagarse), la base llama a `POST /aviso` (disparador con `pg_net`) y Torre les escribe a los números
   habilitados: «Hola Mariana, acaba de entrar un vehículo nuevo» con la ficha del auto, y ofrece el
   teléfono del cliente (se responde «sí»). `asistente_aviso()` confirma que el aviso es real y
   reciente, y que no se mandó antes.
   También avisa cuando alguien del equipo marca que **empieza o termina de trabajar**
   (Horarios del panel): «👷 Juan empezó a trabajar a las 08:02» / «🏁 terminó… trabajó 12 h 03 min».

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
15. Pasar la app a modo **Live** (Meta pide la dirección de una política de privacidad:
    `https://livo.com.uy/parkingdespegar/privacidad.html`, también para «eliminación de datos»).
16. **Enganchar la cuenta de WhatsApp a la app** (Meta no siempre lo hace solo; sin esto no llega
    nada a Cloudflare): developers.facebook.com/tools/explorer → app «Asistente Parking Despegar»,
    permisos `whatsapp_business_management` y `whatsapp_business_messaging` → Generate Access Token →
    **POST** `<ID de la cuenta de WhatsApp Business>/subscribed_apps` → `{"success": true}`.
17. Probar: desde el celular habilitado, escribirle «hola» al número del asistente.
18. **Avisos:** Worker → **Settings → Variables and Secrets → Add** → tipo **Text**:
    `WHATSAPP_NUMERO_ID` = el *Phone number ID* del número (WhatsApp → API Setup).
19. *(Opcional, pago)* **Avisos aunque la dueña no le haya escrito en las últimas 24 h:** WhatsApp solo
    deja escribir libre dentro de las 24 h siguientes al último mensaje de esa persona. Para avisar
    fuera de ese plazo: Meta → **WhatsApp Manager → Message templates → Create**, categoría
    **Utility**, idioma español, nombre `aviso_torre`, cuerpo:
    `{{1}}` + salto de línea + `Respondeme este mensaje y te paso el detalle.` → cuando la aprueben,
    variable **Text** `WHATSAPP_PLANTILLA` = `aviso_torre` (y `WHATSAPP_PLANTILLA_IDIOMA` si no es `es`).
    Cada aviso con plantilla cuesta unos USD 0,01 y Meta pide una tarjeta cargada.
    Sin plantilla, Torre igual avisa siempre que la dueña le haya escrito en las últimas 24 h
    (alcanza con mandarle «Torre» a la mañana).

**Cómo se instaló la prueba (12/10/2026):** número de prueba de Meta +1 555-654-1926 (cuenta de
WhatsApp Business 1427428212193072, Phone Number ID 1324018230800909), app «Asistente Parking
Despegar» (1075117355134631) publicada, porfolio «Parking Despegar», usuario del sistema «asistente»
con token sin vencimiento. El token temporal de la pantalla de prueba deja de valer al publicar:
usar siempre el del usuario del sistema. Diagnóstico: Cloudflare → Observability → Live.

Abrir la dirección del Worker muestra `{"reactivar": true, "whatsapp": true}` cuando está todo cargado,
y el panel (Ajustes → Asistente) indica «Servicio de WhatsApp conectado».

### D. Pago online (dLocal Go)
La reserva web cobra con **dLocal Go**: el cliente toca «Pagar», va a la página segura de dLocal
(tarjeta de crédito o débito, no necesita cuenta) y vuelve a la web con la reserva confirmada.
dLocal avisa al servicio con un aviso firmado (`POST /pago/aviso`) y recién ahí la reserva queda
pagada online (también se confirma al volver, por si el aviso tarda). Sin las llaves, la web sigue
con el botón de pago de prueba.

20. **Base:** correr `esquema.sql` completo una vez (agrega las funciones del pago).
21. **dLocal Go → Conexiones → API → Claves de integración:** copiar la **API Key** y la **Secret key**
    → Cloudflare, tipo **Secret**: `DLOCAL_API_KEY` y `DLOCAL_SECRET`.
22. Variables **Text**:
    - `DLOCAL_ENTORNO` = `real` para cobrar de verdad. Si falta, usa el **entorno de prueba** (claves
      de prueba aparte, tarjeta de prueba 4111 1111 1111 1111, cualquier vencimiento futuro y CVV).
    - *(Opcional)* `DLOCAL_MONTO_PRUEBA` = por ejemplo `50`: cobra $ 50 en vez del total y la reserva queda
      saldada (se anota «prueba»). **Borrarla** después de probar.
23. Abrir la dirección del Worker: tiene que decir `"pagos": true`.

Importante: dLocal asocia las claves al sitio declarado en la cuenta (livo.com.uy); usarlas en otro
sitio puede bloquear la cuenta. Con el primer pago real confirmado, el botón de prueba se apaga solo.
Para retirar la plata y pasar de USD 3.000, completar el Paso 2 de dLocal (documentos y cuenta
bancaria, idealmente a nombre del parking).

## Costos

- Cloudflare Workers y Workers AI: gratis en este uso (los audios usan una fracción mínima de la cuota diaria).
- WhatsApp: las respuestas y los avisos dentro de las 24 h desde el último mensaje de la dueña son
  gratis. Solo la plantilla opcional (avisos fuera de ese plazo) se cobra, unos USD 0,01 cada una.

## Qué entiende

Autos en el parking, lugares libres, quién llega y quién sale hoy (y cuántos llegan mañana), lo cobrado
(hoy, ayer, esta semana, la semana pasada, este mes, el mes pasado, un mes por nombre, este año) con el
detalle por medio de pago y facturas, la caja abierta, reservas web y reservas nuevas por origen,
traslados pendientes, el equipo y quién entró hoy, y un resumen. Además:

- **Cada auto:** «¿Qué auto es?» (el último del que se habló o el último que entró), «¿De quién es el
  A-05?», una matrícula («SBA 1234»), un código («PD-1001») o un nombre («Pérez») → ficha con modelo,
  color, cliente, lugar, salida y vuelo, servicio y pago, y «¿Querés el teléfono? Respondé *sí*».
- **Teléfono:** «sí», o «teléfono de Juan Pérez» → número y enlace a su WhatsApp (queda anotado en
  el registro de cambios del panel).
- **Mapa:** «¿Qué autos hay?» → lugar por lugar, techado y predio, con los libres.
- **Equipo:** «¿Quién está trabajando?» → quién marcó entrada y desde qué hora.
- Saluda según la hora y responde «gracias». Si no entiende, contesta con ejemplos.
Si la base está en pausa, la despierta y avisa. A números no habilitados no les contesta.

## Si cambia algo

- **Otro proyecto o dominio:** cambiar `PROYECTO`, `CLAVE_PUBLICA` y `ORIGENES` arriba de `worker.js` y volver a pegarlo.
- **Clave del asistente nueva** (panel → Crear clave nueva): reemplazar `ASISTENTE_CLAVE` en Cloudflare.
- **Probar la reactivación de verdad:** Supabase → Project Settings → General → **Pause project**,
  abrir el panel y tocar **Confirmar**.
