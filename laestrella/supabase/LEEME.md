# Conectar La Estrella con Supabase

Hasta que hagas esto, el sistema funciona con **datos de ejemplo** que viven solo en el navegador.
Con la conexión, los productos, las ventas, el stock y las cuentas pasan a una **base de datos real** en la nube,
y todas las terminales (la caja, el celular de la dueña) ven lo mismo.

Son 5 pasos y toman unos 20 minutos. **Nada de esto se manda por chat**: las contraseñas se escriben solo en Supabase.

## 1. Crear el proyecto

1. Entrá a [supabase.com](https://supabase.com) y creá una cuenta (o usá la que ya tengas).
2. **New project**. Nombre: `la-estrella`. Región: **South America (São Paulo)**, la más cercana a Uruguay.
3. Elegí una **contraseña de la base de datos** y guardala en un lugar seguro (un gestor de contraseñas). No se pega en ningún lado.
4. **Plan:** el gratuito **se pausa tras una semana sin uso** y no sirve para un comercio que vende todos los días.
   Para el almacén real conviene el plan **Pro** (incluye copias de seguridad diarias). Para probar, el gratuito alcanza.

## 2. Configurar el ingreso de las personas

En el proyecto: **Authentication → Sign In / Providers → Email**:

- **Confirm email: apagado.** (Si queda prendido, las personas no pueden crear su cuenta sin recibir un email.)
- **Allow new users to sign up: prendido** (después de que todos tengan su cuenta podés apagarlo).

En **Authentication → URL Configuration**:

- **Site URL:** `https://livo.com.uy/laestrella/`
- **Redirect URLs:** agregá `https://livo.com.uy/laestrella/**`

## 3. Crear las tablas (una sola vez)

1. En el proyecto: **SQL Editor → New query**.
2. Abrí el archivo `supabase/esquema.sql`, copiá **todo** el contenido, pegalo y tocá **Run**.
   Tiene que decir *Success. No rows returned*. Se puede volver a correr sin romper nada.
3. *(Solo para probar)* Si querés ver el sistema lleno de productos, corré también `supabase/semilla-ejemplo.sql`
   (87 productos de ejemplo con fotos). **No lo corras en la base real del almacén.**

## 4. Pasarle los dos datos al sistema

En el proyecto: **Project Settings → API**. Copiá:

- **Project URL** (algo como `https://abcdefghijklmnop.supabase.co`)
- **Publishable key** (empieza con `sb_publishable_…`; en proyectos más viejos se llama *anon public*)

Pegalos en `js/config.js`:

```js
window.LE_CONFIG = {
  url: 'https://abcdefghijklmnop.supabase.co',
  clave: 'sb_publishable_...'
};
```

> La *publishable key* es **pública por diseño**: la seguridad la dan las reglas de la base y las cuentas de cada persona.
> **Nunca** pegues la *secret key* ni la contraseña de la base de datos.

## 5. Crear las cuentas

1. Abrí el sistema → **Crear cuenta nueva** con el email de la dueña.
   **La primera cuenta que se crea queda como Administración.** Hacelo vos antes de pasarle el link a nadie.
2. Cada persona del equipo crea su cuenta de la misma forma. Queda como **«Sin acceso»**.
3. En el panel → **Equipo**, la administración la edita, le elige el rol (**Caja** o **Administración**) y la activa.

## 6. Copias de seguridad (hacelo apenas esté conectado)

El plan de Supabase puede tener sus propias copias, pero conviene tener las **propias**, en un lugar aparte.
El kit está en `supabase/kit-respaldos/`: copia la base **dos veces por día** (12:00 y 21:30) a un repositorio **privado**
de GitHub, deja un resumen legible de cada copia y permite **volver atrás** con un botón (pide escribir RESTAURAR).
También mantiene viva la base del plan gratis. Las instrucciones están en `supabase/kit-respaldos/README.md`
(crear el repositorio privado, copiar el kit y pegar la dirección de la base como secreto de GitHub).

## Cómo se comporta

- **La caja sigue vendiendo sin internet.** Las ventas y los retiros de efectivo se guardan en la terminal y se envían solos cuando vuelve la conexión.
  Cada venta lleva un identificador único: reenviarla no la duplica. Para **cerrar la caja** o **salir** hace falta haber enviado todo.
- **Todo lo demás** (cambiar precios, stock, compras, equipo, ajustes) necesita conexión: lo hace el servidor.
- **La caja nunca recibe los costos** de los productos ni los datos de compras: el servidor no se los manda.
- **Los precios los pone el servidor.** La pantalla manda «este producto, esta cantidad» y la base calcula el total.
- **Una sola caja abierta a la vez** (lo garantiza la base).

## Qué falta (a propósito)

- **Cargar los productos reales:** hoy se cargan de a uno desde el panel. Una importación desde Excel/CSV sería lo siguiente.
- **PIN rápido** para cambiar de cajera sin escribir email y contraseña.
- **Factura electrónica (e-Ticket):** sigue pendiente de confirmar con el contador.
