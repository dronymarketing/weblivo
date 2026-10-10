# Reactivar la base (Cloudflare Worker)

El plan gratis de Supabase pausa el proyecto después de una semana sin uso. Los respaldos de
GitHub consultan la base dos veces por día para que eso no pase. Si igual pasa, el panel muestra
un cartel que bloquea todo con un único botón, **Confirmar**, y la reserva web ofrece WhatsApp.
Las dos piden la reactivación a este servicio y se vuelven a abrir solas cuando la base responde.

**Por qué un servicio aparte:** despertar la base requiere la llave de la cuenta de Supabase, que
no puede estar en la página (cualquiera la vería). Vive acá, cifrada, y el servicio solo sabe
hacer dos cosas con un único proyecto: decir su estado (`GET /estado`) y despertarlo si está en
pausa (`POST /reactivar`). Con eso nadie puede leer datos ni borrar nada.

## Instalación (una sola vez)

1. **Llave de Supabase:** supabase.com → foto de perfil → **Account preferences → Access Tokens**
   (o supabase.com/dashboard/account/tokens) → **Generate new token**. Nombre: `reactivar-parking`.
   Copiala (empieza con `sbp_`). **No se manda por chat**: va directo al paso 4.
2. **Cloudflare** (gratis): crear cuenta en dash.cloudflare.com → **Workers & Pages → Create →
   Create Worker** (Hello World). Nombre: `reactivar-parking` → **Deploy**.
3. **Edit code** → borrar todo → pegar `worker.js` → **Deploy**.
4. **Settings → Variables and Secrets → Add**: tipo **Secret**, nombre `SUPABASE_TOKEN`, valor la
   llave del paso 1 → **Deploy**.
5. Abrir la dirección del Worker (`https://reactivar-parking.…workers.dev`): tiene que decir
   `"ok": true`. Esa dirección **no es secreta**: va en `js/config.js` → `reactivar`, y en el
   `connect-src` de la CSP de `panel/index.html`.

## Si cambia algo

- **Otro proyecto o dominio:** cambiar `PROYECTO` y `ORIGENES` arriba de `worker.js` y volver a pegarlo.
- **Llave vencida o cambiada:** generar otra y reemplazar el secreto `SUPABASE_TOKEN` en Cloudflare.
- **Probarlo de verdad:** Supabase → Project Settings → General → **Pause project**. Al abrir el
  panel aparece el cartel; con **Confirmar** vuelve en unos minutos.
