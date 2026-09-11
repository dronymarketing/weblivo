# Checklist antes de entregar

Se revisa **a 375px de ancho**, una por una, antes de decir que está listo.

## Estructura y nav

1. ¿El nav se comporta según el modo elegido?
   - Hamburguesa: el logo y el botón no se tocan ni se cortan.
   - Horizontal: los ítems entran en una línea sin partirse.
   - Sin nav: hay alguna forma de llegar al contacto.
2. ¿Hay scroll horizontal en alguna sección? **No puede haber.**
3. Con header fijo, ¿las secciones con `id` tienen `scroll-margin-top`?
   Tocá un link del menú y mirá si el título queda tapado.
4. ¿El menú se cierra antes de que arranque el scroll?
5. Si son páginas separadas, ¿el nav está igual en **todos** los archivos?
   ¿Cada página tiene su propio `<title>`?

## Hero

6. ¿Usa `min-height` con `svh`, y no `height` ni `dvh`?
7. ¿El scroll cue se ve también en móvil?
8. Con la barra del navegador visible **y** oculta, ¿el hero cambia de tamaño?
   No debe saltar en ningún momento.
9. Si asoma la sección siguiente, ¿lo que asoma es padding y no contenido cortado?

## Táctil y legibilidad

10. ¿Los botones llegan a 44px de alto? (52 es el objetivo)
11. ¿El cuerpo de texto está en 16px o más?
12. Si hay texto justificado, ¿tiene `hyphens: auto` y `lang="es-UY"`?
13. ¿El texto sobre foto se lee sin esfuerzo?
14. ¿Las tarjetas en carrusel tienen margen contra el borde de la pantalla?

## Contenido

15. ¿Alguna tarjeta tiene el texto en más líneas que sus hermanas?
16. ¿Aparecen puntos suspensivos por recorte en algún lado?
17. ¿Hay alguna imagen rota o que pese menos de 20 KB?
18. ¿Lo que es de muestra está declarado **en pantalla**, no solo en el código?
19. ¿Quedó algún `PENDIENTE` sin avisar en la lista final?
20. ¿Hay alguna foto de banco de una persona presentada como alguien real
    del negocio?

## Robustez

21. Si hay animaciones al scroll, **desactivá el JavaScript**: ¿el contenido
    se sigue viendo? Nunca `opacity: 0` en el CSS base.
22. ¿`prefers-reduced-motion` apaga las animaciones sin esconder nada?
23. ¿El glass tiene su respaldo `@supports`?
24. ¿Los links del menú son `<a>` con `href` real?
25. ¿`Escape` cierra el menú y el foco vuelve a la hamburguesa?

## Íconos

26. ¿Están todos en el sprite inline, definidos una sola vez?
27. ¿Hay algún SVG pegado más de una vez en el HTML?
28. ¿Se mezclaron sets de íconos? Lucide para interfaz, Simple Icons solo marcas.

## Contacto

29. ¿Los links de WhatsApp abren con el mensaje precargado correcto?
30. ¿El Instagram, la ubicación y el teléfono son los reales?

---

## Al entregar

Decile a Santi, en una lista corta:

- Qué quedó como `PENDIENTE` y qué hace falta para cerrarlo.
- Qué contenido es de muestra.
- Qué decisiones tomaste vos porque no estaban definidas.
