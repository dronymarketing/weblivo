# Asistente de WhatsApp para sistemas (con Supabase + Cloudflare + Meta)

Receta probada en **La Estrella** (noviembre de 2026), copiada del esquema de
**Parking Despegar** («Torre»). Sirve para cualquier sistema de Livo que tenga
base en Supabase y quiera que la dueña o el dueño le **pregunte por WhatsApp**
(texto o audio) y/o que el sistema **avise por WhatsApp** a clientes.

Código de referencia, listo para copiar y adaptar:

- `laestrella/supabase/servicio/worker.js` — el Worker (asistente + avisos)
- `laestrella/supabase/servicio/LEEME.md` — instalación paso a paso
- `laestrella/supabase/esquema.sql` — funciones `asistente_*`, `servicio_*` y el disparador `pg_net`
- `parkingdespegar/sistema/supabase/servicio/worker.js` — la versión original (Torre)

## Cómo funciona

```
Dueña ─WhatsApp→ Meta ─POST /whatsapp→ Worker (Cloudflare) ─rpc→ Supabase (solo lectura)
                                           │
                                           └─respuesta→ API de WhatsApp → Dueña

Venta/evento en el sistema → disparador pg_net → POST /aviso → Worker
  → servicio_aviso() → plantilla aprobada → cliente → servicio_resultado()
```

- **Sin IA paga:** entiende por palabras clave (`TEMAS` en el Worker); los audios
  pasan a texto con Whisper de Workers AI (binding `AI`, gratis en este uso).
- **Solo lee:** el asistente nunca cambia datos. A los números no habilitados no
  les contesta. Los celulares se habilitan en el panel (Ajustes → Asistente).
- La clave del servicio vive solo como huella en la base (`crear_clave_servicio()`).
- Los montos de la base van en centavos: el Worker divide por 100 al mostrarlos.

## Cómo guiar a Santi (cómo le gusta)

- **De a un paso por vez**, con capturas. Santi manda captura y se le dice el
  siguiente paso. Hace tiempo no toca Meta: no asumir que recuerda nada.
- Decir **siempre si va como Secret o como Text** en Cloudflare.
- **Nunca** pedir ni aceptar tokens o claves por el chat: se copian directo de
  Meta a Cloudflare. Pedir que tape el token en las capturas.
- Los SQL se entregan **como archivo adjunto** (no como página ni texto largo en el chat).
  Si el archivo no abre, mandar una versión corta con solo lo nuevo.
- El asistente vive en **WhatsApp**, no en el panel del sistema (se probó un
  chat dentro del panel y Santi lo rechazó).

## Pasos, en orden

### 1 · Base (Supabase)
1. Correr `esquema.sql` (idempotente) en el SQL Editor.
2. `select public.crear_clave_servicio();` → copiar el resultado (se ve **una vez**).
3. Más adelante: `update public.config_servicio set aviso_url = 'https://<worker>.workers.dev/aviso';`

### 2 · Worker (Cloudflare)
1. Workers & Pages → Create → Hello World → nombre del cliente → Deploy.
2. Edit code → pegar `worker.js` → Deploy. (Si no deja editar: recargar con Ctrl+F5,
   probar en incógnito, o crear otro Worker.)
3. Settings → Variables and secrets:

| Nombre | Tipo | Valor |
|---|---|---|
| `SERVICIO_CLAVE` | Secret | la de `crear_clave_servicio()` |
| `WHATSAPP_TOKEN` | Secret | token del usuario del sistema |
| `WHATSAPP_SECRETO_APP` | Secret | «Clave secreta de la aplicación» de Meta |
| `WHATSAPP_VERIFICACION` | Secret | una palabra inventada |
| `WHATSAPP_NUMERO_ID` | Texto | *Phone number ID* |
| `WHATSAPP_PLANTILLA` | Texto | nombre de la plantilla de avisos |
| `WHATSAPP_PLANTILLA_IDIOMA` | Texto | `es_UY` si la plantilla es «Spanish (URY)» |

4. Settings → Bindings → Add → **Workers AI**, nombre `AI`.
5. Abrir la dirección del Worker: tiene que decir `{"avisos":true,"asistente":true}`.

### 3 · Meta (developers.facebook.com + business.facebook.com)
1. **App** con el caso de uso «Conectar con los clientes a través de WhatsApp».
2. **Portafolio:** si Meta dice «límite de empresas alcanzado», usar el portafolio
   existente (conviene uno por cliente; se puede migrar después) o crearlo con el Facebook del cliente.
3. **Número:** el de prueba de Meta sirve para empezar (manda solo a hasta 5
   celulares verificados). Es **compartido por portafolio**: dos apps ven el mismo
   número y el mismo *Phone number ID*. Para uso real hace falta un chip propio
   (sin WhatsApp instalado), idealmente en una cuenta de WhatsApp Business propia
   del cliente.
4. **Plantilla** (WhatsApp Manager → Plantillas → Crear), categoría **Servicio/Utilidad**:
   - Si el formulario de Meta falla con *«al componente HEADER le faltan campos (text)»*,
     **ponerle un título** (por ejemplo «Aviso de cuenta»).
   - La variable `{{1}}` **no puede estar al principio ni al final** del texto:
     agregar una línea después («Este es un mensaje automático.»).
   - Idioma «Spanish (URY)» = código `es_UY` (**no** `es`): cargarlo en `WHATSAPP_PLANTILLA_IDIOMA`.
   - Aprobación: de minutos a pocos días. Sin plantilla aprobada no se puede avisar a
     quien nunca le escribió al negocio.
5. **Usuario del sistema** (Configuración del negocio → Usuarios del sistema):
   - Meta permite **un solo usuario Admin** por portafolio sin verificar → crear el
     nuevo con rol **Employee**.
   - Asignarle **tres** activos con **Acceso total**: la **app**, la **cuenta de
     WhatsApp** (*WhatsApp accounts*) y la **cuenta de mensajería** (*Messaging
     accounts*). **Este último es el que se olvida** (ver errores abajo). Si el botón
     «Asignar activos» no aparece, se hace desde Cuentas de mensajes → la cuenta →
     **Asignar personas** → usuario del sistema → Acceso total.
   - Generar identificador: app del cliente, vencimiento **Nunca**, permisos
     `whatsapp_business_management` y `whatsapp_business_messaging`. Va directo a
     Cloudflare como `WHATSAPP_TOKEN`.
6. **Publicar la app**: mientras diga «Sin publicar», Meta **no entrega mensajes
   reales al webhook** (ni de administradores). Para publicar piden, en
   Configuración de la aplicación → Información básica:
   - URL de la política de privacidad (`/privacidad.html` del sitio del cliente;
     modelo: `laestrella/privacidad.html`),
   - URL de eliminación de datos (`/privacidad.html#borrar-datos`),
   - Categoría. Guardar cambios y después **Publicar**.
7. **Webhook**: Casos de uso → Personalizar → Paso 2. Configuración de producción →
   Configurar Webhooks. URL `https://<worker>.workers.dev/whatsapp` + la palabra de
   verificación → Verificar y guardar. Suscribir el campo **messages**.
8. **Conectar la cuenta de WhatsApp a la app** (si no, Meta nunca manda nada al Worker):
   Explorador de la API Graph (`developers.facebook.com/tools/explorer`):
   - Elegir **la app del cliente** (¡no la de otro negocio!), token de usuario con los dos permisos de WhatsApp.
   - `GET <ID de la cuenta de WhatsApp>/subscribed_apps` → ver quién está.
   - `POST` a la misma dirección → `{"success": true}`. Volver a `GET` para confirmar.
   - El *ID de la cuenta de WhatsApp* sale de Paso 1. Probar («Identificador de la cuenta de mensajes»).
9. **Habilitar al dueño**: panel → Ajustes → Asistente → nombre y celular. Probar
   escribiéndole `hola` al número. Ojo: el celular **no** debe estar habilitado en el
   asistente de otro cliente que comparta el número de prueba (Torre le contestaría).

## Avisos al dueño (eventos), como Torre

Además de contestar preguntas, el asistente puede **avisar solo** al dueño. En La Estrella:
entra o sale alguien a trabajar, se abre y se cierra la caja (el cierre con el detalle completo: vendido por medio,
deudores, cobros de deudas, retiros, debería haber / se contó / diferencia), retiros, llegó mercadería, stock que
**cruza** el mínimo o se acaba, deudores al 80 % o en su límite, cobros de deuda y ventas anuladas.

- **Nunca avisar cada venta**: se vuelve fastidioso (pedido de Santi). Los de stock avisan solo al cruzar el mínimo.
- Arquitectura: la función de la base que hace la acción anota el evento con `aviso_dueno(tipo, datos)` (tabla
  `avisos_dueno`, nunca frena la operación) → disparador `pg_net` → `POST /evento` del Worker → `servicio_evento()`
  entrega el evento una sola vez con los celulares habilitados → el Worker arma el texto con íconos
  (`textoEvento` en `worker.js`) y lo manda.
- **Ventana de 24 h:** WhatsApp solo deja escribir libre a quien le escribió al negocio en las últimas 24 h
  (`asistente_telefonos.ultimo_mensaje`, se actualiza con `asistente_visto()` cada vez que escribe). Alcanza con un
  `hola` cada mañana. Para avisar siempre: plantilla opcional `WHATSAPP_PLANTILLA_DUENO` (una variable, texto antes y
  después, sin saltos de línea en el dato; Meta cobra cada aviso con plantilla).
- Cada rubro tiene sus eventos: preguntarle al cliente **qué quiere que le avise** y qué le resultaría molesto.
- Mensajes: íconos al comienzo de cada bloque, `*negrita*` para lo importante, listas con `•`, y el detalle
  numérico en líneas cortas. Ejemplo completo en `textoCierre()` de `laestrella/supabase/servicio/worker.js`.

## Cuando no contesta: cómo diagnosticar

Cloudflare → Worker → **Observability → Live** (subir al inicio de la página y tocar
**Live**), mandar el mensaje y mirar:

| Qué se ve | Causa | Arreglo |
|---|---|---|
| Nada, ni `POST /whatsapp` | La cuenta de WhatsApp no está conectada a la app, o la app no está publicada | Paso 8 y paso 6 |
| `POST /whatsapp` con 401 | `WHATSAPP_SECRETO_APP` es de otra app | Copiar la clave de la app correcta |
| `POST` y después `Authorization Error`, code 100 | El usuario del sistema no tiene la cuenta de WhatsApp asignada | Asignarla (paso 5) |
| `(#10) Viewer cannot access the provided Paid Message Account <id>` | Falta el activo **Messaging accounts** en el usuario del sistema | Asignarlo con Acceso total (paso 5) |
| `POST` sin errores y sin respuesta | El celular no está habilitado en Ajustes → Asistente | Habilitarlo |
| Aviso en «Error» con plantilla | Plantilla sin aprobar, o idioma distinto (`es` vs `es_UY`) | Revisar estado e idioma |
| El Worker dice `{"whatsapp":true}` | Código viejo | Pegar el `worker.js` nuevo y Deploy |

## Costos (revisar siempre la tabla vigente de Meta)

- Cloudflare Workers y Workers AI: gratis en este uso. Supabase: plan gratis.
- Respuestas del asistente a la dueña dentro de las 24 h desde su mensaje: texto libre, sin costo.
- **Avisos con plantilla** (a deudores, clientes): cuentan como mensaje de utilidad, unos USD 0,011 c/u
  (Uruguay entra en «Resto de Latinoamérica»). Desde el 1/10/2026 se cobran aunque haya
  ventana abierta. Meta puede pedir tarjeta cargada.

## Lección general para los paneles con datos en vivo

El panel se actualiza solo cada ~8 s. **No redibujar la sección si el usuario está
escribiendo** o tiene un formulario con cambios sin guardar (se borraba lo escrito en
los formularios que no están en una ventana), y **conservar el scroll** al redibujar.
Implementación en `laestrella/js/panel.js` (`escribiendo()` y `P.alActualizar`).

- **Entender a la gente:** el cliente escribe como habla: jerga, abreviaturas, faltas de ortografía, audios. El Worker corrige palabras cercanas al vocabulario (distancia de edición, con letras cambiadas de lugar) y NO toca palabras cortas ni nombres. Cuidado con vocabulario que se parece a otro significado («comprar» ≠ «compras», «cuenta» ≠ «cuesta»). Siempre dejar un archivo de pruebas de frases (`laestrella/supabase/servicio/prueba-frases.mjs`).
