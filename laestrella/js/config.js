/* ============================================================
   LA ESTRELLA — conexión con la base de datos (Supabase)
   Se completa UNA vez, con los dos datos del proyecto de Supabase:
     Project Settings → API → «Project URL» y «Publishable key».
   Esa clave es PÚBLICA por diseño (la seguridad la dan las reglas de la base
   y las cuentas de cada persona). NUNCA pegues acá la «secret key» ni la
   contraseña de la base de datos.
   Con estos dos datos vacíos, el sistema funciona con datos de ejemplo.
   ============================================================ */
window.LE_CONFIG = {
  url: '',     // ej.: 'https://abcdefghijklmnop.supabase.co'
  clave: ''    // ej.: 'sb_publishable_...'
};
// Solo si hay conexión configurada se carga la librería de Supabase (del propio proyecto, sin depender de internet)
(function () {
  var c = window.LE_CONFIG;
  if (c.url && c.clave) { var b = /\/(caja|panel)(\/|$)/.test(location.pathname) ? '../' : ''; document.write('<script src="' + b + 'lib/supabase.min.js?v=1"><\/script>'); }
})();
