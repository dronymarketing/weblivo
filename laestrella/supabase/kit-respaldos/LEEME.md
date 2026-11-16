# Kit de respaldos (copia de referencia)

Esto es lo que va en un repositorio **privado** de GitHub (por ejemplo `dronymarketing/laestrella-respaldos`),
que guarda las copias de la base dos veces por día. Acá **no hay datos**: solo los programas y las instrucciones
(ver `README.md`, que es el que se lee en el repositorio privado).

Si se cambia algo, se cambia acá y se copia igual al repositorio privado.

**Cómo instalarlo:** copiar todo el contenido de esta carpeta (incluida `.github/` y `.gitignore`) a la raíz del repositorio
privado y seguir la sección «Puesta en marcha» del `README.md`. Hace falta que el sistema ya esté conectado a Supabase
(`../LEEME.md`) y que el esquema (`../esquema.sql`) incluya la función `latido`, que usa la tarea que mantiene viva la base.
