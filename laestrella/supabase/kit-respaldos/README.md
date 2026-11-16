# Respaldos de La Estrella

> **Este repositorio es privado y tiene que seguir siéndolo.** Guarda las ventas, los costos, los datos de
> los proveedores y las cuentas del personal (nombres, emails y contraseñas cifradas).
> No lo hagas público ni sumes personas que no tengan que ver con el sistema.

## Qué hace

Dos veces por día, **a las 12 del mediodía y a las 21:30** (después de cerrar, hora de Uruguay), GitHub copia
toda la base de datos del sistema y la guarda en una carpeta nueva dentro de `respaldos/`. Si algo se
rompe, se puede volver la base al estado de cualquiera de esas carpetas.

```
respaldos/
  2026-11-16_21h30/          ← fecha y hora de la copia
    datos.sql                ← productos, ventas, caja, stock, compras, proveedores, ajustes, personal, cuentas y registro
    esquema.sql              ← estructura del sistema en esa fecha (para armar una base nueva desde cero)
    estructura.sql           ← estructura exacta de la base en ese momento (para consulta)
    resumen.txt              ← cuántas filas tenía cada tabla: se lee sin saber nada técnico
  2026-11-16_12h00/
  …
sistema/                     ← copia del código y la documentación de la web
scripts/                     ← los programas que copian y restauran
```

- Se ven las carpetas de los **últimos 30 días**. Las más viejas salen de la vista, pero siguen guardadas
  en el historial del repositorio y se pueden recuperar.
- Una carpeta que termina en `_antes-de-restaurar` es la copia que se hace sola justo antes de una
  restauración (por si hay que deshacerla).
- Si dos copias caen en el mismo minuto, la segunda lleva `_r2` al final: nunca se pisan.
- Cada vez que corre, también hace una consulta mínima a la base (la función `latido`, que solo devuelve la hora).
  Así el plan gratis de Supabase ve actividad y **no pausa el proyecto**, aunque el almacén pase días sin abrir el sistema.
- Si una copia falla, aparece en rojo en **Actions** y GitHub avisa por email a la cuenta dueña del repositorio
  (si no se cambiaron las notificaciones).
- Esto **complementa** las copias propias de Supabase (plan Pro); no las reemplaza.

## Puesta en marcha (una sola vez)

Primero tiene que estar conectado el sistema (ver `supabase/LEEME.md` del proyecto), con su `js/config.js` completo.

1. En GitHub, creá un repositorio **privado** (por ejemplo `dronymarketing/laestrella-respaldos`) y copiale
   **todo el contenido de esta carpeta** (los archivos `.github/`, `scripts/`, `.gitignore` y este `README.md`).
2. En **Supabase**, entrá al proyecto y tocá **Connect** (arriba). En **Connection String**, elegí el método
   **Session pooler** y copiá la dirección que empieza con `postgresql://postgres.…:[YOUR-PASSWORD]@…`.
3. Reemplazá `[YOUR-PASSWORD]` (con los corchetes) por la contraseña de la base de datos, la que se eligió al crear
   el proyecto. Si no la tenés: **Project Settings → Database → Reset database password**, tocá **Generate a password**
   y copiala. Cambiarla no afecta al sistema.
4. En **GitHub**, en este repositorio: **Settings → Secrets and variables → Actions → New repository secret**.
   - Name: `SUPABASE_DB_URL`
   - Secret: la dirección completa del paso 3

   **Esa contraseña no se manda por chat ni por mail: se pega solo en GitHub, en un lugar cifrado que nadie puede volver a leer.**
5. Probalo: **Actions → Respaldo diario → Run workflow**. A los dos o tres minutos tiene que aparecer
   con un tilde verde y una carpeta nueva en `respaldos/`.

## Si algo se rompe

### Se borraron o se cargaron mal datos

1. Mirá en `respaldos/` cuál es la última carpeta buena (el `resumen.txt` ayuda).
2. **Actions → Restaurar un respaldo → Run workflow**:
   - **carpeta:** el nombre tal cual, por ejemplo `2026-11-16_21h30`
   - **confirmar:** `RESTAURAR`
3. Antes de cambiar nada, guarda una copia de cómo está la base en ese momento. Después reemplaza
   todos los datos por los de la carpeta elegida. Si algo falla en el medio, se cancela todo y la base
   queda como estaba.

Lo que se vendió o cargó **después** de esa copia se pierde, y las personas tienen que volver a iniciar sesión
(con su misma contraseña de siempre). Las ventas que una caja hizo sin internet y todavía no envió **no están en la
base**: la terminal las conserva y las manda cuando vuelve a conectarse.

### Se perdió el proyecto de Supabase entero

1. Crear un proyecto nuevo en Supabase (región São Paulo).
2. En **Authentication**, dejar la configuración como dice `supabase/LEEME.md`:
   *Confirm email* apagado y *Site URL* = `https://livo.com.uy/laestrella/`.
3. Cambiar el secreto `SUPABASE_DB_URL` por la dirección del proyecto nuevo (pasos 2 a 4 de arriba).
4. Correr **Restaurar un respaldo** con la última carpeta. Como la base está vacía, primero arma la
   estructura del sistema y después carga los datos.
5. Cambiar en la web (`laestrella/js/config.js` del repositorio weblivo) la dirección y la
   *publishable key* del proyecto nuevo.

## Qué no se guarda

- **Las claves** de Supabase (a propósito).
- **La configuración del panel de Supabase** (Authentication, plan): está anotada en `supabase/LEEME.md`.
- **Las fotos de los productos**: están en la web (`laestrella/img/productos`); acá queda una copia dentro de `sistema/`.

## Para quien mantiene el sistema

- Actividad: `scripts/mantener-activa.sh` (POST a `rpc/latido` por la API pública con la publishable key
  que lee de `js/config.js`; si la base no responde, la tarea queda en rojo).
- Copia: `scripts/respaldar.sh` (Supabase CLI `db dump`: esquemas `public` y `auth`, solo datos). Trabaja en una
  carpeta temporal y recién al terminar bien le pone su nombre, así una copia que falla no deja nada a medias
  ni pisa otra.
- Restauración: `scripts/restaurar.sh` + `scripts/restaurar.sql`, en una sola transacción.
  Controla que el archivo esté completo antes de conectarse y que haya datos del negocio, al menos una cuenta de
  administración activa y un usuario de ingreso por cada persona antes de confirmar.
  Recupera las tablas de `public` y, de `auth`, solo `users` e `identities`.
- Las dos tareas comparten un turno (`concurrency: base-de-datos`), así que nunca corren a la vez.
- Probado contra un Postgres 16 local (con un reemplazo de `supabase db dump` por `pg_dump`): copia, rotura
  deliberada y restauración con las mismas filas tabla por tabla; restauración en una base nueva y vacía;
  rechazo de copias cortadas o sin administración; dos copias en el mismo minuto; limpieza de copias viejas.
  **Sin probar en GitHub Actions ni con el Supabase CLI real** (el mismo mecanismo ya funciona en Parking Despegar).
