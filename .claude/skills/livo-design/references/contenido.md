# Contenido — textos y fotos

El borrador existe para que la clienta **vea** cómo va a quedar su web, no para
que la lea. El texto es relleno que tiene que caber bien. Un texto largo que
rompe una tarjeta arruina la presentación aunque esté bien escrito.

---

## Límites de texto

En caracteres, con espacios. Contalos **antes** de escribir el HTML.

| Elemento | Máximo |
|---|---|
| Antetítulo de sección | 24 |
| Título de sección (h2) | 24 |
| Título del hero | 40 |
| Subtítulo del hero | 140 |
| Nombre de producto | 28 |
| Descripción de tarjeta | 90 |
| Nombre de servicio | 32 |
| Descripción de servicio | 110 |
| Texto de botón | 18 |
| Ítem de nav | 12 |
| Testimonio | 120 |

**Excepción:** si un nombre real del negocio pasa el límite, se usa igual.
Un dato real nunca se acorta. Lo que se acorta es lo que inventás.

### Paridad entre hermanos

Todas las tarjetas de un mismo grupo llevan textos de largo parecido: entre la
más corta y la más larga no más de 30% de diferencia.

Una grilla con un título de 12 caracteres al lado de uno de 40 se ve rota
aunque las dos entren. La parejura es lo que hace que se lea como diseño.

Lo mismo con las descripciones: si una ocupa dos líneas, todas dos líneas.

### Nunca

- Puntos suspensivos por recorte. En un borrador se leen como error, no como
  estilo. Si aparecen, el texto era largo: se reescribe, no se corta.
- `text-overflow: ellipsis` ni `-webkit-line-clamp` como solución.
  Son parches sobre un problema de escritura.
- Descripciones de dos oraciones donde entra una.
- Adjetivos de relleno: "innovador", "de alta calidad", "pensado para vos".
  Ocupan espacio y no dicen nada.

### Verificación

Antes de terminar, revisá cada grupo de tarjetas a 375px: ¿alguna tiene el
texto en más líneas que sus hermanas? Si sí, acortá esa. No agrandes la tarjeta.

---

## Fotos

Los borradores se ilustran con fotos de banco gratuitas. Nunca se dejan
recuadros vacíos ni bloques de color: una web sin fotos no se puede presentar.

### De dónde

- Pexels — https://pexels.com
- Unsplash — https://unsplash.com

Ambos permiten uso comercial sin atribución. No hace falta cuenta.

### Cómo

- **Descargar** los archivos a `img/`. Nunca enlazar por URL: el link se rompe
  o cambia y el borrador queda con fotos rotas justo cuando lo estás mostrando.
- Nombres predecibles y en orden: `producto-1.jpg`, `equipo-1.jpg`, `hero.jpg`.
  La clienta las va a reemplazar y tiene que ser obvio cuál es cuál.
- Después de descargar, verificar que cada archivo exista y pese más de 20 KB.
  Si alguna falló, buscar otra. Nunca dejar una imagen rota.
- Máximo 1600px de ancho y 300 KB por archivo. Un borrador que tarda en cargar
  en el celular de la clienta se presenta solo.
- Recortar todas las de un mismo grupo al mismo formato, para que la grilla
  quede pareja.

### Coherencia

Las fotos de un mismo grupo tienen que parecer de la misma marca: luz,
temperatura de color y distancia similares. Seis fotos buenas pero dispares se
ven peor que seis fotos correctas y parejas.

Buscar en inglés, que es donde está el material.

### Nunca

- Fotos con marca de agua visible.
- **Fotos de personas identificables presentadas como el equipo, la dueña o
  clientes reales del negocio.** Una foto de banco no puede ir con el nombre de
  una persona de verdad ni firmar un testimonio: es hacer pasar a un desconocido
  por alguien que no es, y la clienta lo puede publicar sin darse cuenta.
  Si hace falta un retrato, va un espacio marcado como `PENDIENTE` con la
  indicación de que la clienta mande su foto.
- Fotos generadas por IA para productos que existen de verdad.

### En el código

Cada imagen de muestra lleva un comentario:

```html
<!-- FOTO DE MUESTRA — reemplazar por foto real del producto -->
```

Y el `alt` describe lo que se ve de verdad, no "imagen de producto".

---

## Datos y contenido de muestra

- Los datos reales — nombres, teléfonos, direcciones, Instagram — se piden y
  se usan tal cual. **No se inventan.**
- Lo que falte va marcado como `PENDIENTE` en el código y se avisa al final,
  en una lista.
- Todo lo que sea de muestra se declara **en pantalla**, no solo en un
  comentario del código: la clienta no lee el código.
  Ejemplo: *"productos y precios de muestra, a reemplazar por el catálogo real"*.
- Nunca inventar propiedades curativas, promesas de resultados ni reseñas
  atribuidas a personas.
