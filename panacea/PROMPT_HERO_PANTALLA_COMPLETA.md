# Prompt: Hero que ocupa el 100% de la pantalla sin recortes

Pegá esto cuando necesites que un bloque (hero, sección de bienvenida, etc.)
ocupe exactamente la primera pantalla al entrar al sitio, sin que asome nada
de la sección siguiente, en cualquier navegador y dispositivo.

---

Quiero que la sección `[NOMBRE_SECCION]` ocupe el 100% de la altura de
pantalla visible al cargar la página (descontando el nav si es sticky/fixed),
de forma que no se vea nada de la sección siguiente hasta que el usuario
haga scroll. Tiene que funcionar igual de bien en Chrome Android, Firefox
Android y Safari iOS, sin depender de un solo tamaño de pantalla.

**No uses únicamente esto, porque falla de formas distintas en cada navegador:**
- `height: 100vh` solo → en mobile antiguo asume la barra del navegador
  escondida (mide de más), corta contenido o deja asomar la siguiente sección.
- `height: 100dvh` solo → se recalcula EN VIVO mientras la barra del
  navegador aparece/desaparece durante el scroll, así que el contenido
  "salta" de tamaño mientras el usuario scrollea. No usar dvh como si fuera
  estático.
- Confiar en que el cálculo de alto (`vh`/`svh`/`dvh`/JS) va a dar
  perfectamente exacto en todos los dispositivos. En la práctica, algún
  dispositivo real (fuente del sistema más grande, versión de navegador
  rara, lo que sea) va a desviarse, y vas a terminar con una línea de la
  sección de abajo asomando por unos pocos píxeles — muy difícil de
  reproducir y depurar a ciegas.

**Hacé esto en su lugar — la garantía va en dos capas:**

1. **CSS, con fallback en cascada (de menos a más preciso):**
   ```css
   .seccion-full {
     display: flex;
     flex-direction: column;
     overflow: hidden;              /* <- la garantía dura */
     height: calc(100vh - var(--nav-h));
     height: calc(100svh - var(--nav-h));
     height: calc(var(--vh-real, 100svh) - var(--nav-h));
   }
   ```
   - Usá `height`, **no** `min-height`. Con `min-height` el contenido puede
     necesitar más espacio del calculado y empujar la sección siguiente a
     asomar. Con `height` + `overflow: hidden`, lo que no entra se recorta
     — nunca se ve la sección de abajo, pase lo que pase.
   - El orden importa: `vh` primero (fallback más viejo), `svh` después
     (asume la barra del navegador siempre visible = alto mínimo seguro),
     y al final la variable medida por JS si existe. La última declaración
     válida gana.
   - Nunca pongas `dvh` como ganador si el contenido no puede tolerar
     redimensionarse durante el scroll.

2. **JS, para medir el alto real UNA SOLA VEZ (nunca durante el scroll):**
   ```js
   var navEl = document.querySelector('.nav'); // o el header sticky
   var anchoAnterior = window.innerWidth;
   function medirAlto() {
     document.documentElement.style.setProperty('--vh-real', window.innerHeight + 'px');
     if (navEl) {
       document.documentElement.style.setProperty('--nav-h', navEl.offsetHeight + 'px');
     }
   }
   medirAlto();
   window.addEventListener('resize', function () {
     // Solo remedir si cambió el ANCHO real (rotación / resize de ventana).
     // El resize que dispara el navegador al esconder/mostrar su barra
     // durante el scroll NO cambia el ancho — si remedís ahí, el contenido
     // "salta" de tamaño mientras se scrollea. Ese es el bug a evitar.
     if (window.innerWidth !== anchoAnterior) {
       anchoAnterior = window.innerWidth;
       medirAlto();
     }
   });
   window.addEventListener('orientationchange', medirAlto);
   if (document.fonts && document.fonts.ready) {
     document.fonts.ready.then(medirAlto); // el nav puede cambiar de alto al cargar la tipografía
   }
   ```

3. **Diseñá el contenido interno para que tolere recorte sin romperse:**
   - Textos largos con `-webkit-line-clamp` (2-3 líneas máx) en vez de
     dejarlos crecer libres.
   - Tarjetas/cards con `min-height` razonable pero no exagerado.
   - Si hay poco espacio, que se recorte un pelín de aire vacío del mismo
     color de fondo — nunca que corte texto a la mitad ni un botón.

**Verificación antes de dar por terminado:**
- Medí con JS (`getBoundingClientRect().top` de la sección siguiente vs
  `window.innerHeight`) en mobile, tablet y desktop — tiene que dar
  `top >= innerHeight` siempre.
- Probá con la barra de direcciones visible Y con scroll (barra escondida)
  — el contenido no debe saltar de tamaño en ningún momento.
- Probá en modo incógnito para descartar caché al validar cambios.
