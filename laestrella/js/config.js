/* ============================================================
   LA ESTRELLA — conexión con la base de datos (Supabase)
   Proyecto: la-estrella (South America, São Paulo).
   La clave «publishable» es PÚBLICA por diseño (la seguridad la dan las reglas
   de la base y las cuentas de cada persona). NUNCA pegues acá la «secret key»
   ni la contraseña de la base de datos.
   Con estos dos datos vacíos, el sistema funciona con datos de ejemplo.
   ============================================================ */
window.LE_CONFIG = {
  url: 'https://gbezzoutnaxvdzfjytlr.supabase.co',
  clave: 'sb_publishable_0vHo4Yucf_1wRD4N95W-jw__urGt__r',
  vivo: true,        // avisos en tiempo real entre la caja y el panel
  whatsapp: false    // poner true cuando el servicio de WhatsApp esté conectado (supabase/servicio/LEEME.md)
};
// Solo si hay conexión configurada se carga la librería de Supabase (del propio proyecto, sin depender de internet)
(function () {
  var c = window.LE_CONFIG;
  if (c.url && c.clave) { var b = /\/(caja|panel)(\/|$)/.test(location.pathname) ? '../' : ''; document.write('<script src="' + b + 'lib/supabase.min.js?v=1"><\/script>'); }
})();
