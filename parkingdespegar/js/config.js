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
  /* Servicio de Cloudflare (supabase/servicio/): despierta la base si el plan gratis la pausa
     y atiende el asistente de WhatsApp. Es su dirección pública; las llaves quedan allá. */
  reactivar: 'https://parking-despegar.dronymarketing.workers.dev'
};
