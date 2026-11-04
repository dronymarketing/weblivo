/* ============================================================
   PANACEA — configuración pública de la web.

   PANACEA_API: la dirección del servidor de pagos (servidor-pagos/).
   Mientras esté vacía, el pago funciona en MODO PRUEBA: no cobra nada.
   Cuando se despliegue el servidor (ver servidor-pagos/README.md), se pone acá
   su dirección, por ejemplo:
     window.PANACEA_API = "https://panacea-pagos.TU-USUARIO.workers.dev";
   No va ninguna clave secreta acá: este archivo lo ve cualquiera.
   ============================================================ */
window.PANACEA_API = "";
