/* ============================================================
   PARKING DESPEGAR — Conexión a la base de datos (Supabase)
   url: la «Project URL» del proyecto · clave: la «publishable key».
   La clave publicable es pública por diseño (va en el navegador):
   lo que protege los datos son los permisos de la base,
   definidos en supabase/esquema.sql. Nunca poner acá la «secret key».
   ============================================================ */
window.PD_CONFIG = {
  url: 'https://ixryfteknrcghmsxyowp.supabase.co',
  clave: 'sb_publishable_FCAsYb80d6t-kyvQqIV9bA_p7Wrsm5o',
  /* Servicio que despierta la base si el plan gratis la pausa (supabase/reactivar/).
     Es la dirección pública del Worker de Cloudflare; la llave queda allá. */
  reactivar: ''
};
