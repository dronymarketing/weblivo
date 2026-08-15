# Servidor de fotos de Martina — cómo levantarlo en la PC nueva

Buena noticia primero: la web YA funciona para recibir fotos aunque no hagas nada de esto,
porque tiene un respaldo automático a Cloudinary. Esto es para que además te queden
guardadas directo en tu disco, como tenías antes.

## 1. Instalar Node.js (si no lo tenés)

Abrí una terminal (CMD o PowerShell) y escribí:

    node -v

Si te tira un número de versión, ya lo tenés y podés saltar a la parte 2.
Si dice que no reconoce el comando, bajalo de https://nodejs.org (la versión LTS)
e instalalo. Después cerrá y volvé a abrir la terminal.

## 2. Instalar las dependencias del servidor

En la terminal, andá a esta carpeta (donde están `server.js` y `package.json`) y corré:

    npm install

## 3. Levantar el servidor

    node server.js

Si todo salió bien vas a ver un mensaje que dice "Servidor escuchando en http://localhost:3000".
Dejá esa ventana de terminal ABIERTA todo el evento — si la cerrás, el servidor se apaga
(pero la web sigue funcionando igual gracias al respaldo a Cloudinary).

Las fotos van a ir apareciendo en la carpeta `fotos-recibidas` que se crea al lado de `server.js`.

## 4. Exponerlo a internet con Tailscale (para que la web de afuera le pueda hablar)

Esto es lo que le daba la URL pública `https://desktop-i8e4crg.taile69d98.ts.net/...` en la
PC vieja. Como cambiaste de PC, hay que repetirlo:

1. Si no tenés Tailscale instalado: bajalo de https://tailscale.com/download/windows
   e instalalo.
2. Abrilo e iniciá sesión con LA MISMA CUENTA que usabas antes (Google/Microsoft/GitHub,
   la que sea que hayas usado). Así esta PC entra a la misma red ("tailnet") que la vieja,
   y el dominio va a seguir siendo `...taile69d98.ts.net`.
3. En otra terminal, corré:

       tailscale funnel 3000

   La primera vez puede pedirte habilitar HTTPS y Funnel desde el panel de administración
   (te va a dar un link, https://login.tailscale.com/admin/...). Seguí ese link y aceptá.
4. Cuando funcione, Tailscale te va a mostrar la URL pública nueva, algo como:

       https://NOMBRE-DE-ESTA-PC.taile69d98.ts.net/

   (el NOMBRE-DE-ESTA-PC ahora va a ser distinto a "desktop-i8e4crg", porque ese era el
   nombre de Windows de la PC vieja).

## 5. Actualizar la web con la URL nueva

Copiame esa URL nueva y yo actualizo la línea `UPLOAD_URL` en
`weblivo/martinaxv/index.html` por vos. Después solo falta que subas el cambio con
git (`git add -A`, `git commit -m "actualizar servidor de fotos"`, `git push`) para
que se refleje en livo.com.uy.

Si en el momento no llegás a hacer el paso de Tailscale, no pasa nada: dejá el
servidor corriendo o no, la web va a seguir recibiendo fotos igual por Cloudinary.
