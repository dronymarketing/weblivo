// Envía por WhatsApp los avisos de deudores que están «pendiente» (cerca del límite / límite superado).
// Se llama desde la caja y el panel cuando una venta a cuenta crea un aviso (config.js → whatsapp: true).
// Usa la API de WhatsApp Business (Cloud API de Meta). Pasos y costos: supabase/funciones/LEEME.md
//
// Secretos que necesita (supabase secrets set …):
//   WHATSAPP_TOKEN     token permanente de la app de Meta
//   WHATSAPP_PHONE_ID  identificador del número de WhatsApp Business
//   WHATSAPP_TEMPLATE  (opcional) nombre de la plantilla aprobada con UNA variable en el cuerpo, que recibe el mensaje.
//                      Sin plantilla solo se puede escribir a quien ya le escribió al negocio en las últimas 24 h.
//   WHATSAPP_IDIOMA    (opcional) código de idioma de la plantilla, por defecto es_UY... ver LEEME.md
import { createClient } from 'jsr:@supabase/supabase-js@2';

const cors = { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type' };
const json = (o: unknown, status = 200) => new Response(JSON.stringify(o), { status, headers: { ...cors, 'Content-Type': 'application/json' } });

// Uruguay: 099123456 → 59899123456
function telefono(t: string): string {
  let d = (t || '').replace(/\D/g, '');
  if (!d) return '';
  if (d.startsWith('598')) return d;
  if (d.startsWith('0')) d = d.slice(1);
  return '598' + d;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: cors });
  const url = Deno.env.get('SUPABASE_URL')!;
  const auth = req.headers.get('Authorization') ?? '';

  // Solo personas del sistema con sesión y cuenta activa
  const quien = createClient(url, Deno.env.get('SUPABASE_ANON_KEY')!, { global: { headers: { Authorization: auth } } });
  const { data: { user } } = await quien.auth.getUser();
  if (!user) return json({ error: 'Sin sesión' }, 401);
  const db = createClient(url, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!);
  const { data: perfil } = await db.from('perfiles').select('activo').eq('id', user.id).maybeSingle();
  if (!perfil?.activo) return json({ error: 'Sin permiso' }, 403);

  const token = Deno.env.get('WHATSAPP_TOKEN'), phoneId = Deno.env.get('WHATSAPP_PHONE_ID');
  if (!token || !phoneId) return json({ enviados: 0, motivo: 'WhatsApp todavía no está configurado' });
  const plantilla = Deno.env.get('WHATSAPP_TEMPLATE'), idioma = Deno.env.get('WHATSAPP_IDIOMA') ?? 'es';

  const { data: avisos, error } = await db.from('avisos_deudor').select('*').eq('estado', 'pendiente').order('ts').limit(20);
  if (error) return json({ error: error.message }, 500);

  let enviados = 0, fallidos = 0;
  for (const a of avisos ?? []) {
    const para = telefono(a.telefono);
    if (!para) { await db.from('avisos_deudor').update({ estado: 'error', detalle: 'El deudor no tiene teléfono cargado' }).eq('id', a.id); fallidos++; continue; }
    const cuerpo = plantilla
      ? { messaging_product: 'whatsapp', to: para, type: 'template', template: { name: plantilla, language: { code: idioma }, components: [{ type: 'body', parameters: [{ type: 'text', text: a.mensaje }] }] } }
      : { messaging_product: 'whatsapp', to: para, type: 'text', text: { body: a.mensaje } };
    try {
      const r = await fetch(`https://graph.facebook.com/v21.0/${phoneId}/messages`, { method: 'POST', headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }, body: JSON.stringify(cuerpo) });
      const j = await r.json().catch(() => ({}));
      if (r.ok) { await db.from('avisos_deudor').update({ estado: 'enviado', detalle: 'Enviado por WhatsApp' }).eq('id', a.id); enviados++; }
      else { await db.from('avisos_deudor').update({ estado: 'error', detalle: String(j?.error?.message ?? r.status).slice(0, 180) }).eq('id', a.id); fallidos++; }
    } catch (e) {
      await db.from('avisos_deudor').update({ estado: 'error', detalle: String((e as Error).message).slice(0, 180) }).eq('id', a.id); fallidos++;
    }
  }
  return json({ enviados, fallidos });
});
