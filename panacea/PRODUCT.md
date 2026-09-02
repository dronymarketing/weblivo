# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Astro (decisión de largo plazo, sin confirmar todavía como definitiva). El borrador de landing hecho para la reunión con la clienta (`index.html` / `css/` / `js/`) es HTML, CSS y JS estático sin build, a pedido explícito para poder abrirlo con doble clic y presentarlo sin instalar nada; no reemplaza la decisión de stack de producción.

## Users

Consumidores que buscan salud y bienestar: compran productos físicos (tés orgánicos, tinturas madres, pomadas y cremas, protector solar y gel post-solar) y/o reservan servicios o sesiones de naturopatía bajo la marca Panacea Productos Herbales, a cargo de la naturópata Paola Areosa.

## Product Purpose

Sitio de la marca Panacea (rubro salud y bienestar) que permite vender productos físicos online y que se reserven/paguen servicios o sesiones. Combina ambos caminos de conversión bajo un mismo sitio.

## Positioning

No confirmado todavía: qué distingue a Panacea de otras marcas de salud y bienestar (ingredientes, método, credenciales de quien da las sesiones, etc.) queda como decisión abierta para una futura ronda, no inventar.

## Operating Context

Panacea es un proyecto nuevo dentro del workspace de agencia "weblivo" (repo `dronymarketing/weblivo`), que aloja varios sitios de clientes (raíz "LIVO", `lacucha/`, `martinaxv/`), todos HTML/CSS estático simple. Panacea es la excepción: se construye con Astro porque el sitio necesita lógica de compra (carrito/checkout) y de reserva (agenda/pago de sesiones) que el enfoque estático de los sitios hermanos no cubre bien.

## Capabilities and Constraints

- Debe soportar dos flujos de conversión distintos en el mismo sitio: compra de producto físico (carrito, checkout, envío o retiro) y reserva de servicio/sesión (calendario, pago, confirmación).
- No decidido todavía: procesador de pago, logística de envío, sistema de agenda/booking a integrar.
- No hay backend/API existente; se define durante el build.

## Brand Commitments

- Nombre confirmado: "Panacea Productos Herbales".
- Naturópata a cargo: Paola Areosa.
- Ubicación confirmada: Pinamar, Canelones, Uruguay.
- Instagram real y activo: [@panacea_productosherbales](https://www.instagram.com/panacea_productosherbales) (95 publicaciones, 535 seguidores al momento de revisar). Tiene un logo circular con ilustración botánica en línea, usado como foto de perfil.
- Bio real de Instagram: "Medicina Natural y Cosmética herbal", "Conectando bienestar y naturaleza", "Fórmulas artesanales".
- Categorías de producto confirmadas (destacadas de Instagram): té orgánico, tinturas madres, pomadas y cremas, protector solar y gel post-solar.
- Paleta, tipografía y sistema visual todavía no definidos como marca oficial; lo usado en el borrador de landing (verde profundo, crema, terracota, textura de papel rasgado) es una propuesta de dirección, no una decisión de marca cerrada.

## Evidence on Hand

Hay cuenta de Instagram real con contenido (fotos y videos de Paola elaborando productos), pero no hay fotos de producto en alta calidad listas para web, ni testimonios reales, ni precios reales todavía. El borrador de landing usa 6 fotos de banco (Pexels) y 6 productos con nombre/descripción/precio inventados, marcados explícitamente como muestra en el código, más 3 opiniones de clientas inventadas y marcadas como ejemplo. Nada de esto debe tratarse como contenido definitivo: hay que reemplazarlo por fotos, precios y testimonios reales de Paola antes de publicar el sitio.

## Product Principles

- Separar con claridad, en cada página y componente, si el visitante está ante un producto que se compra o un servicio que se agenda — no mezclar ambos flujos de forma ambigua.
- No fabricar contenido de marca (testimonios, precios, certificaciones, fotos de producto) mientras no exista evidencia real; usar placeholders visibles.
- Tratándose de salud y bienestar, priorizar claridad y confianza sobre la marca antes que efectos visuales que puedan sentirse poco serios.
- Mantener el sitio liviano y rápido incluso usando Astro, en línea con el resto del workspace.

## Accessibility & Inclusion

No se estableció ningún requisito específico todavía.
