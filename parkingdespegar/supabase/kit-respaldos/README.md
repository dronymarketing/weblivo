# Respaldos de Parking Despegar

> **Este repositorio es privado y tiene que seguir siéndolo.** Guarda datos personales de los clientes
> (nombres, teléfonos, emails, matrículas) y las cuentas del personal, con las contraseñas cifradas.
> No lo hagas público ni sumes personas que no tengan que ver con el sistema.

## Qué hace

Dos veces por día, **a las 12 del mediodía y a las 12 de la noche** (hora de Uruguay), GitHub copia
toda la base de datos del sistema y la guarda en una carpeta nueva dentro de `respaldos/`. Si algo se
rompe, se puede volver la base al estado de cualquiera de esas carpetas.

```
respaldos/
  2026-10-11_00h00/          ← fecha y hora de la copia
    datos.sql                ← reservas, pagos, caja, facturas, registro, precios, lugares, personal y cuentas
    esquema.sql              ← estructura del sistema en esa fecha (para armar una base nueva desde cero)
    estructura.sql           ← estructura exacta de la base en ese momento (para consulta)
    resumen.txt              ← cuántas filas tenía cada tabla: se lee sin saber nada técnico
  2026-10-11_12h00/
  …
sistema/                     ← copia del código y la documentación de la web y el panel
scripts/                     ← los programas que copian y restauran
```

- Se ven las carpetas de los **últimos 30 días**. Las más viejas salen de la vista, pero siguen guardadas
  en el historial del repositorio y se pueden recuperar.
- Una carpeta que termina en `_antes-de-restaurar` es la copia que se hace sola justo antes de una
  restauración (por si hay que deshacerla).
- Cada vez que corre, también hace una consulta a la base. Así el plan gratis de Supabase ve actividad
  y **no pausa el proyecto**, aunque el parking pase semanas sin abrir el sistema.
- Si una copia falla, aparece en rojo en **Actions** y GitHub avisa por email a la cuenta dueña del repositorio
  (si no se cambiaron las notificaciones).

## Puesta en marcha (una sola vez)

El respaldo necesita la dirección de conexión de la base, con su contraseña. **Esa contraseña no se
manda por chat ni por mail: se pega solo en GitHub, en un lugar cifrado que nadie puede volver a leer.**

1. En **Supabase**, entrá al proyecto y tocá **Connect** (arriba).
   En **Connection String**, elegí el método **Session pooler** y copiá la dirección que empieza con
   `postgresql://postgres.ixryfteknrcghmsxyowp:[YOUR-PASSWORD]@…`.
2. Reemplazá `[YOUR-PASSWORD]` (con los corchetes) por la contraseña de la base de datos, la que se
   eligió al crear el proyecto. Si no la tenés: **Project Settings → Database → Reset database password**,
   tocá **Generate a password** y copiala. Cambiar esta contraseña no afecta a la web ni al panel.
3. En **GitHub**, en este repositorio: **Settings → Secrets and variables → Actions → New repository secret**.
   - Name: `SUPABASE_DB_URL`
   - Secret: la dirección completa del paso 2
4. Probalo: **Actions → Respaldo diario → Run workflow**. A los dos o tres minutos tiene que aparecer
   con un tilde verde y una carpeta nueva en `respaldos/`.

## Si algo se rompe

### Se borraron o se cargaron mal datos

1. Mirá en `respaldos/` cuál es la última carpeta buena (el `resumen.txt` ayuda).
2. **Actions → Restaurar un respaldo → Run workflow**:
   - **carpeta:** el nombre tal cual, por ejemplo `2026-10-11_00h00`
   - **confirmar:** `RESTAURAR`
3. Antes de cambiar nada, guarda una copia de cómo está la base en ese momento. Después reemplaza
   todos los datos por los de la carpeta elegida. Si algo falla en el medio, se cancela todo y la base
   queda como estaba.

Lo que se cargó después de esa copia se pierde, y las personas tienen que volver a iniciar sesión
(con su misma clave de siempre).

### Se perdió el proyecto de Supabase entero

1. Crear un proyecto nuevo en Supabase (región São Paulo).
2. En **Authentication**, dejar la configuración como dice `sistema/CONTEXTO.md`:
   *Confirm email* apagado y *Site URL* y *Redirect URL* = `https://livo.com.uy/parkingdespegar/panel/`.
3. Cambiar el secreto `SUPABASE_DB_URL` por la dirección del proyecto nuevo (pasos 1 a 3 de arriba).
4. Correr **Restaurar un respaldo** con la última carpeta. Como la base está vacía, primero arma la
   estructura del sistema y después carga los datos.
5. Cambiar en la web (`parkingdespegar/js/config.js` del repositorio weblivo) la dirección y la
   *publishable key* del proyecto nuevo.

## Qué no se guarda

- **Las claves** de Supabase (a propósito).
- **La configuración del panel de Supabase** (Authentication, plan): está anotada en `sistema/CONTEXTO.md`.

## Para quien mantiene el sistema

- Actividad: `scripts/mantener-activa.sh` (GET a `tarifas` por la API pública con la publishable key
  que lee de `js/config.js`; si la base no responde, la tarea queda en rojo).
- Copia: `scripts/respaldar.sh` (Supabase CLI `db dump`: esquemas `public` y `auth`, solo datos).
- Restauración: `scripts/restaurar.sh` + `scripts/restaurar.sql`, en una sola transacción.
  Controla que el archivo esté completo antes de conectarse y que haya precios, empresa y lugares
  antes de confirmar. Recupera las tablas de `public` y, de `auth`, solo `users` e `identities`.
- Las dos tareas comparten un turno (`concurrency: base-de-datos`), así que nunca corren a la vez.
- Probado contra Supabase local: la base restaurada queda idéntica al respaldo (tabla por tabla),
  el personal ingresa con su clave, la numeración PD- sigue donde estaba, las cuentas nuevas quedan
  pendientes, y un respaldo cortado o incompleto se rechaza sin tocar la base.
