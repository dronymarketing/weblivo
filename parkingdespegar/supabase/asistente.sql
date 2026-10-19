-- ============================================================
-- ASISTENTE DE WHATSAPP — consultas de la dueña
-- (Este bloque también está al final de esquema.sql. Para activarlo en
--  una base que ya tiene el sistema, alcanza con correr este archivo:
--  Supabase → SQL Editor → pegar → Run. Se puede volver a correr.)
--
-- El servicio de WhatsApp (supabase/servicio/worker.js) pregunta con
-- asistente_consulta(): necesita la clave del asistente (se genera en el
-- panel, acá solo queda su huella) y un número habilitado por la dueña.
-- Solo lee: no puede cobrar, borrar ni cambiar nada.
-- Necesita el esquema del sistema al día (usa las tablas de esquema.sql,
-- incluida la de horarios del equipo).
-- ============================================================

create table if not exists public.asistente_telefonos (
  telefono text primary key check (telefono ~ '^\d{8,15}$'),
  nombre   text not null default '' check (char_length(nombre) <= 60),
  creado   timestamptz not null default now()
);

create table if not exists public.asistente_config (
  id         int primary key default 1 check (id = 1),
  clave_hash text,
  creada     timestamptz
);
insert into public.asistente_config (id) values (1) on conflict do nothing;

-- Nadie las lee directo: todo pasa por las funciones de abajo
alter table public.asistente_telefonos enable row level security;
alter table public.asistente_config    enable row level security;
revoke all on public.asistente_telefonos, public.asistente_config from anon, authenticated;

-- Celular uruguayo «099 123 456» → «59899123456» (como lo manda WhatsApp)
create or replace function public.asistente_normalizar(p_telefono text) returns text
language sql immutable set search_path = public as $$
  select case
    when v ~ '^09\d{7}$' then '598' || substr(v, 2)
    when v ~ '^9\d{7}$'  then '598' || v
    when v ~ '^00\d+$'   then substr(v, 3)
    else v end
  from (select regexp_replace(coalesce(p_telefono, ''), '\D', '', 'g') as v) x
$$;

create or replace function public.asistente_estado() returns jsonb
language plpgsql stable security definer set search_path = public as $$
begin
  perform public.exigir_rol('admin');
  return jsonb_build_object(
    'clave', (select clave_hash is not null from public.asistente_config where id = 1),
    'creada', (select creada from public.asistente_config where id = 1),
    'telefonos', coalesce((select jsonb_agg(jsonb_build_object('telefono', telefono, 'nombre', nombre, 'creado', creado) order by creado)
                             from public.asistente_telefonos), '[]'::jsonb));
end $$;

create or replace function public.asistente_agregar(p_telefono text, p_nombre text) returns void
language plpgsql security definer set search_path = public as $$
declare v text := public.asistente_normalizar(p_telefono);
begin
  perform public.exigir_rol('admin');
  if v !~ '^\d{8,15}$' then
    raise exception 'Revisá el número: tiene que ser un celular con WhatsApp, por ejemplo 099 123 456.' using errcode = 'P0001';
  end if;
  if (select count(*) from public.asistente_telefonos) >= 10 and not exists (select 1 from public.asistente_telefonos where telefono = v) then
    raise exception 'Ya hay 10 números habilitados: quitá alguno antes de sumar otro.' using errcode = 'P0001';
  end if;
  insert into public.asistente_telefonos (telefono, nombre) values (v, left(trim(coalesce(p_nombre, '')), 60))
    on conflict (telefono) do update set nombre = excluded.nombre;
  perform public.anotar('Habilitó el WhatsApp +' || v || ' para consultar al asistente');
end $$;

create or replace function public.asistente_quitar(p_telefono text) returns void
language plpgsql security definer set search_path = public as $$
begin
  perform public.exigir_rol('admin');
  delete from public.asistente_telefonos where telefono = public.asistente_normalizar(p_telefono);
  if found then perform public.anotar('Quitó el WhatsApp +' || public.asistente_normalizar(p_telefono) || ' del asistente'); end if;
end $$;

-- Clave nueva: se muestra una sola vez en el panel y se carga en Cloudflare.
-- La anterior deja de servir en el momento.
create or replace function public.asistente_nueva_clave() returns text
language plpgsql security definer set search_path = public as $$
declare v_clave text := replace(gen_random_uuid()::text, '-', '') || replace(gen_random_uuid()::text, '-', '');
begin
  perform public.exigir_rol('admin');
  update public.asistente_config set clave_hash = encode(sha256(convert_to(v_clave, 'UTF8')), 'hex'), creada = now() where id = 1;
  perform public.anotar('Generó una clave nueva para el asistente de WhatsApp');
  return v_clave;
end $$;

-- Lo que el asistente puede contar: foto del momento + números del período pedido
create or replace function public.asistente_consulta(p_clave text, p_telefono text,
                                                     p_desde timestamptz default null, p_hasta timestamptz default null)
returns jsonb
language plpgsql stable security definer set search_path = public as $$
declare
  v_hoy   timestamptz := date_trunc('day', now() at time zone 'America/Montevideo') at time zone 'America/Montevideo';
  v_man   timestamptz := v_hoy + interval '1 day';
  v_desde timestamptz := coalesce(p_desde, v_hoy);
  v_hasta timestamptz := coalesce(p_hasta, v_man);
  v_caja  public.caja_turnos;
begin
  if coalesce(p_clave, '') = '' or not exists (
       select 1 from public.asistente_config
        where id = 1 and clave_hash = encode(sha256(convert_to(p_clave, 'UTF8')), 'hex')) then
    raise exception 'Clave del asistente incorrecta.' using errcode = '42501';
  end if;
  if not exists (select 1 from public.asistente_telefonos where telefono = p_telefono) then
    raise exception 'Este número no está habilitado.' using errcode = '42501';
  end if;
  if v_hasta <= v_desde or v_hasta - v_desde > interval '400 days' then
    raise exception 'Período no válido.' using errcode = 'P0001';
  end if;
  select * into v_caja from public.caja_turnos where cierre is null;

  return jsonb_build_object(
    'ahora', now(),
    'quien', (select nombre from public.asistente_telefonos where telefono = p_telefono),
    'autos', (select jsonb_build_object('total', count(*),
                                        'techado', count(*) filter (where lugar_tipo = 'techado'),
                                        'aire', count(*) filter (where lugar_tipo = 'aire'),
                                        'atrasados', count(*) filter (where salida < now()))
                from public.reservas where estado = 'en_predio'),
    'capacidad', (select jsonb_build_object('techado', count(*) filter (where tipo = 'techado'),
                                            'aire', count(*) filter (where tipo = 'aire'))
                    from public.lugares),
    'hoy', jsonb_build_object(
      'entradas', (select count(*) from public.reservas where checkin >= v_hoy and checkin < v_man),
      'salidas',  (select count(*) from public.reservas where checkout >= v_hoy and checkout < v_man),
      'por_llegar_total', (select count(*) from public.reservas where estado = 'confirmada' and entrada >= v_hoy and entrada < v_man),
      'por_llegar', coalesce((select jsonb_agg(jsonb_build_object('hora', r.entrada, 'matricula', r.matricula, 'cliente', r.cliente_nombre) order by r.entrada)
                                from (select * from public.reservas where estado = 'confirmada' and entrada >= v_hoy and entrada < v_man
                                       order by entrada limit 12) r), '[]'::jsonb),
      'por_salir_total', (select count(*) from public.reservas where estado = 'en_predio' and salida >= v_hoy and salida < v_man),
      'por_salir', coalesce((select jsonb_agg(jsonb_build_object('hora', r.salida, 'matricula', r.matricula, 'cliente', r.cliente_nombre, 'lugar', r.lugar) order by r.salida)
                               from (select * from public.reservas where estado = 'en_predio' and salida >= v_hoy and salida < v_man
                                      order by salida limit 12) r), '[]'::jsonb),
      'manana', (select count(*) from public.reservas where estado = 'confirmada' and entrada >= v_man and entrada < v_man + interval '1 day')),
    'periodo', jsonb_build_object(
      'desde', v_desde, 'hasta', v_hasta,
      'cobrado', (select coalesce(sum(monto), 0) from public.pagos where fecha >= v_desde and fecha < v_hasta),
      'pagos', (select count(*) from public.pagos where fecha >= v_desde and fecha < v_hasta),
      'por_medio', coalesce((select jsonb_object_agg(medio, s) from (select medio, sum(monto) as s from public.pagos
                                                                       where fecha >= v_desde and fecha < v_hasta group by medio) m), '{}'::jsonb),
      'facturas', (select count(*) from public.facturas where fecha >= v_desde and fecha < v_hasta),
      'facturado', (select coalesce(sum(total), 0) from public.facturas where fecha >= v_desde and fecha < v_hasta),
      'reservas', (select count(*) from public.reservas where creada >= v_desde and creada < v_hasta and estado <> 'cancelada'),
      'por_origen', coalesce((select jsonb_object_agg(origen, n) from (select origen, count(*) as n from public.reservas
                                                                         where creada >= v_desde and creada < v_hasta and estado <> 'cancelada' group by origen) o), '{}'::jsonb),
      'web_pagadas', (select count(*) from public.reservas where origen = 'web' and creada >= v_desde and creada < v_hasta
                                                               and estado <> 'cancelada' and total > 0 and pagado >= total),
      'entradas', (select count(*) from public.reservas where checkin >= v_desde and checkin < v_hasta),
      'salidas', (select count(*) from public.reservas where checkout >= v_desde and checkout < v_hasta)),
    'web_sin_pagar', (select count(*) from public.reservas where origen = 'web' and estado = 'confirmada' and pagado < total and entrada >= v_hoy),
    'caja', case when v_caja.id is null then jsonb_build_object('abierta', false)
            else jsonb_build_object('abierta', true, 'apertura', v_caja.apertura, 'abrio', v_caja.abrio_nombre, 'base', v_caja.base,
                   'efectivo', v_caja.base + coalesce((select sum(monto) from public.caja_movimientos
                                                        where turno_id = v_caja.id and medio in ('efectivo', 'egreso')), 0),
                   'otros', coalesce((select sum(monto) from public.caja_movimientos
                                       where turno_id = v_caja.id and medio in ('tarjeta', 'transferencia', 'online')), 0)) end,
    'traslados', coalesce((select jsonb_agg(t.v order by t.hora) from (
        select entrada as hora, jsonb_build_object('tipo', 'llevar', 'hora', entrada, 'cliente', cliente_nombre, 'pasajeros', pasajeros, 'estado', traslado_ida) as v
          from public.reservas where servicio = 'traslado' and estado in ('confirmada', 'en_predio')
                                 and entrada >= v_hoy and entrada < v_man and traslado_ida <> 'hecho'
        union all
        select salida, jsonb_build_object('tipo', 'buscar', 'hora', salida, 'cliente', cliente_nombre, 'pasajeros', pasajeros, 'estado', traslado_vuelta)
          from public.reservas where servicio = 'traslado' and estado = 'en_predio'
                                 and salida >= v_hoy and salida < v_man and traslado_vuelta <> 'hecho') t), '[]'::jsonb),
    'equipo', coalesce((select jsonb_agg(jsonb_build_object('nombre', nombre, 'rol', rol) order by nombre) from public.perfiles where activo), '[]'::jsonb),
    'ingresaron_hoy', coalesce((select jsonb_agg(distinct usuario_nombre) from public.auditoria
                                 where accion = 'Ingresó al sistema' and fecha >= v_hoy), '[]'::jsonb),
    'sin_acceso', (select count(*) from public.perfiles where not activo),
    'trabajando', coalesce((select jsonb_agg(jsonb_build_object('nombre', usuario_nombre, 'desde', entrada) order by entrada)
                              from public.asistencias where salida is null), '[]'::jsonb),
    'en_predio', coalesce((select jsonb_agg(public.asistente_ficha(r) order by r.lugar_tipo desc, r.lugar)
                             from public.reservas r where r.estado = 'en_predio'), '[]'::jsonb)
  );
end $$;

-- ---------- Torre: detalle de cada auto, «¿querés su teléfono?» y avisos ----------

alter table public.asistente_config add column if not exists aviso_url text;
-- Último mensaje de cada número: WhatsApp deja escribirle gratis solo dentro de las 24 h siguientes
alter table public.asistente_telefonos add column if not exists ultimo_mensaje timestamptz;

-- Último auto del que Torre le habló a cada número (para responder «sí» a «¿querés su teléfono?»)
create table if not exists public.asistente_contexto (
  telefono    text primary key,
  reserva_id  uuid references public.reservas (id) on delete cascade,
  actualizado timestamptz not null default now()
);
-- Avisos ya mandados: cada entrada y cada reserva se avisa una sola vez
create table if not exists public.asistente_avisos (
  reserva_id uuid not null references public.reservas (id) on delete cascade,
  tipo       text not null check (tipo in ('entrada', 'reserva')),
  enviado    timestamptz not null default now(),
  primary key (reserva_id, tipo)
);
alter table public.asistente_contexto enable row level security;
alter table public.asistente_avisos   enable row level security;
revoke all on public.asistente_contexto, public.asistente_avisos from anon, authenticated;

-- La clave del asistente y (si se pasa) un número habilitado
create or replace function public.asistente_validar(p_clave text, p_telefono text) returns void
language plpgsql stable security definer set search_path = public as $$
begin
  if coalesce(p_clave, '') = '' or not exists (
       select 1 from public.asistente_config
        where id = 1 and clave_hash = encode(sha256(convert_to(p_clave, 'UTF8')), 'hex')) then
    raise exception 'Clave del asistente incorrecta.' using errcode = '42501';
  end if;
  if p_telefono is not null and not exists (select 1 from public.asistente_telefonos where telefono = p_telefono) then
    raise exception 'Este número no está habilitado.' using errcode = '42501';
  end if;
end $$;

-- Torre anota que ese número le escribió (abre la ventana de 24 h para los avisos)
create or replace function public.asistente_visto(p_clave text, p_telefono text) returns void
language plpgsql security definer set search_path = public as $$
begin
  perform public.asistente_validar(p_clave, p_telefono);
  update public.asistente_telefonos set ultimo_mensaje = now() where telefono = p_telefono;
end $$;

-- Ficha de un auto/reserva para contarla por WhatsApp (sin el teléfono del cliente)
create or replace function public.asistente_ficha(r public.reservas) returns jsonb
language sql stable set search_path = public as $$
  select jsonb_build_object('id', r.id, 'codigo', r.codigo, 'cliente', r.cliente_nombre, 'matricula', r.matricula,
    'modelo', r.modelo, 'color', r.color, 'lugar', r.lugar, 'tipo', r.lugar_tipo, 'servicio', r.servicio,
    'pasajeros', r.pasajeros, 'entrada', r.entrada, 'salida', r.salida, 'checkin', r.checkin, 'checkout', r.checkout,
    'estado', r.estado, 'origen', r.origen, 'total', r.total, 'pagado', r.pagado, 'vuelo', r.vuelo_vuelta,
    'extras', (select coalesce(jsonb_agg(x ->> 'nombre'), '[]'::jsonb) from jsonb_array_elements(r.extras) x),
    'promo', r.promo_codigo, 'descuento_pct', r.descuento_pct, 'comentarios', r.comentarios)
$$;

-- Busca autos por lugar (A-05), código (PD-1234), matrícula (SBA 1234) o nombre del cliente.
-- Sin texto: el auto del que se venía hablando (últimos 30 min) o el último que entró.
-- El primero encontrado queda como «tema de conversación» para el «sí».
create or replace function public.asistente_buscar(p_clave text, p_telefono text, p_texto text default null) returns jsonb
language plpgsql security definer set search_path = public as $$
declare
  t    text := upper(trim(coalesce(p_texto, '')));
  tn   text := regexp_replace(upper(coalesce(p_texto, '')), '[^A-Z0-9]', '', 'g');
  ids  uuid[];
  m    text[];
begin
  perform public.asistente_validar(p_clave, p_telefono);
  if t = '' then
    select array[c.reserva_id] into ids from public.asistente_contexto c
     where c.telefono = p_telefono and c.reserva_id is not null and c.actualizado > now() - interval '30 minutes';
    if ids is null then
      select array_agg(id) into ids from (select id from public.reservas where checkin is not null
                                           order by (estado = 'en_predio') desc, checkin desc limit 1) x;
    end if;
  else
    m := regexp_match(t, '^([AB])\s*-?\s*(\d{1,3})$');
    if m is not null then
      select array_agg(id) into ids from (select id from public.reservas
        where lugar = m[1] || '-' || lpad(m[2], 2, '0') and estado = 'en_predio' limit 1) x;
    end if;
    if ids is null and tn ~ '^(PD)?\d{4}$' then
      select array_agg(id) into ids from (select id from public.reservas
        where codigo = 'PD-' || right(tn, 4) limit 1) x;
    end if;
    if ids is null and tn ~ '^[A-Z]{3}\d{3,4}$' then
      select array_agg(id) into ids from (select id from public.reservas
        where regexp_replace(upper(matricula), '[^A-Z0-9]', '', 'g') = tn
        order by (estado = 'en_predio') desc, (estado = 'confirmada') desc, entrada desc limit 3) x;
    end if;
    if ids is null and char_length(t) >= 3 then
      select array_agg(id) into ids from (select id from public.reservas
        where unaccent_simple(cliente_nombre) ilike '%' || unaccent_simple(p_texto) || '%' and estado in ('en_predio', 'confirmada')
        order by (estado = 'en_predio') desc, entrada limit 5) x;
    end if;
  end if;
  if ids is null or cardinality(ids) = 0 then return jsonb_build_object('resultados', '[]'::jsonb); end if;
  insert into public.asistente_contexto (telefono, reserva_id, actualizado) values (p_telefono, ids[1], now())
    on conflict (telefono) do update set reserva_id = excluded.reserva_id, actualizado = now();
  return jsonb_build_object('resultados', (select jsonb_agg(public.asistente_ficha(r) order by array_position(ids, r.id))
                                             from public.reservas r where r.id = any (ids)));
end $$;

-- Sin tildes, para buscar «Perez» y encontrar «Pérez»
create or replace function public.unaccent_simple(p text) returns text
language sql immutable set search_path = public as $$
  select translate(lower(coalesce(p, '')), 'áéíóúüñàèìòù', 'aeiouunaeiou')
$$;

-- Teléfono del cliente: del texto (lugar, matrícula, nombre) o del auto del que se venía hablando
create or replace function public.asistente_telefono(p_clave text, p_telefono text, p_texto text default null) returns jsonb
language plpgsql security definer set search_path = public as $$
declare v jsonb; r public.reservas;
begin
  v := public.asistente_buscar(p_clave, p_telefono, p_texto);
  if jsonb_array_length(v->'resultados') = 0 then return null; end if;
  select * into r from public.reservas where id = (v->'resultados'->0->>'id')::uuid;
  perform public.anotar_sistema('Torre le pasó a +' || p_telefono || ' el teléfono de ' || r.cliente_nombre || ' (' || r.codigo || ')');
  return jsonb_build_object('cliente', r.cliente_nombre, 'telefono', r.cliente_telefono, 'matricula', r.matricula, 'codigo', r.codigo);
end $$;

create or replace function public.anotar_sistema(p_accion text) returns void
language sql security definer set search_path = public as $$
  insert into public.auditoria (usuario_id, usuario_nombre, accion) values (null, 'Torre', left(p_accion, 300))
$$;

-- Aviso de una entrada o de una reserva nueva: una sola vez, solo si es reciente,
-- y deja ese auto como tema de conversación de cada número habilitado.
create or replace function public.asistente_aviso(p_clave text, p_reserva uuid, p_tipo text) returns jsonb
language plpgsql security definer set search_path = public as $$
declare r public.reservas;
begin
  perform public.asistente_validar(p_clave, null);
  if p_tipo in ('ingreso', 'egreso') then return public.asistente_aviso_personal(p_reserva, p_tipo); end if;
  select * into r from public.reservas where id = p_reserva;
  if not found then return null; end if;
  if p_tipo not in ('entrada', 'reserva') then return null; end if;
  if p_tipo = 'entrada' and not (r.estado = 'en_predio' and r.checkin > now() - interval '15 minutes') then return null; end if;
  if p_tipo = 'reserva' and not (r.estado = 'confirmada' and r.creada > now() - interval '2 hours') then return null; end if;
  insert into public.asistente_avisos (reserva_id, tipo) values (r.id, p_tipo) on conflict do nothing;
  if not found then return null; end if;
  insert into public.asistente_contexto (telefono, reserva_id, actualizado)
    select telefono, r.id, now() from public.asistente_telefonos
    on conflict (telefono) do update set reserva_id = excluded.reserva_id, actualizado = now();
  return jsonb_build_object('tipo', p_tipo, 'ficha', public.asistente_ficha(r),
    'destinatarios', coalesce((select jsonb_agg(jsonb_build_object('telefono', telefono, 'nombre', nombre,
                                 'ventana', coalesce(ultimo_mensaje > now() - interval '23 hours 50 minutes', false)))
                                from public.asistente_telefonos), '[]'::jsonb),
    'libres', (select jsonb_build_object(
                 'techado', (select count(*) from public.lugares where tipo = 'techado') - (select count(*) from public.reservas where estado = 'en_predio' and lugar_tipo = 'techado'),
                 'aire', (select count(*) from public.lugares where tipo = 'aire') - (select count(*) from public.reservas where estado = 'en_predio' and lugar_tipo = 'aire'))));
end $$;

-- Disparador: cuando entra un auto o llega una reserva nueva (las de la web, al pagarse),
-- le avisa al servicio de Cloudflare. Nunca frena la operación: si algo falla, sigue igual.
create extension if not exists pg_net with schema extensions;
create or replace function public.al_cambiar_reserva_avisar() returns trigger
language plpgsql security definer set search_path = public as $$
declare v_url text; v_tipo text;
begin
  select aviso_url into v_url from public.asistente_config where id = 1;
  if v_url is null then return new; end if;
  if tg_op = 'INSERT' and new.origen <> 'web' then v_tipo := 'reserva';
  elsif tg_op = 'UPDATE' and new.origen = 'web' and old.pagado < old.total and new.pagado >= new.total and new.estado = 'confirmada' then v_tipo := 'reserva';
  elsif tg_op = 'UPDATE' and old.estado <> 'en_predio' and new.estado = 'en_predio' then v_tipo := 'entrada';
  end if;
  if v_tipo is not null then
    begin
      perform net.http_post(url := v_url, body := jsonb_build_object('tipo', v_tipo, 'reserva', new.id),
                            headers := '{"Content-Type": "application/json"}'::jsonb);
    exception when others then null;
    end;
  end if;
  return new;
end $$;
drop trigger if exists al_cambiar_reserva_avisar on public.reservas;
create trigger al_cambiar_reserva_avisar after insert or update on public.reservas
  for each row execute function public.al_cambiar_reserva_avisar();

-- Dirección del servicio de Cloudflare que manda los avisos (vacía = sin avisos)
update public.asistente_config set aviso_url = 'https://parking-despegar.dronymarketing.workers.dev/aviso' where id = 1 and aviso_url is null;

-- ---------- Torre avisa quién empieza y quién termina de trabajar ----------
alter table public.asistencias add column if not exists aviso_entrada timestamptz;
alter table public.asistencias add column if not exists aviso_salida timestamptz;

-- Aviso de jornada (ya validada la clave en asistente_aviso): una sola vez y solo si es reciente
create or replace function public.asistente_aviso_personal(p_id uuid, p_tipo text) returns jsonb
language plpgsql security definer set search_path = public as $$
declare a public.asistencias;
begin
  if p_tipo = 'ingreso' then
    update public.asistencias set aviso_entrada = now()
     where id = p_id and aviso_entrada is null and entrada > now() - interval '15 minutes' returning * into a;
  else
    update public.asistencias set aviso_salida = now()
     where id = p_id and aviso_salida is null and salida > now() - interval '15 minutes' returning * into a;
  end if;
  if not found then return null; end if;
  return jsonb_build_object('tipo', p_tipo,
    'persona', jsonb_build_object('nombre', a.usuario_nombre, 'entrada', a.entrada, 'salida', a.salida,
                                  'rol', (select rol from public.perfiles where id = a.usuario_id)),
    'trabajando', coalesce((select jsonb_agg(usuario_nombre order by entrada) from public.asistencias where salida is null), '[]'::jsonb),
    'destinatarios', coalesce((select jsonb_agg(jsonb_build_object('telefono', telefono, 'nombre', nombre,
                                 'ventana', coalesce(ultimo_mensaje > now() - interval '23 hours 50 minutes', false)))
                                from public.asistente_telefonos), '[]'::jsonb));
end $$;

create or replace function public.al_marcar_asistencia_avisar() returns trigger
language plpgsql security definer set search_path = public as $$
declare v_url text; v_tipo text;
begin
  select aviso_url into v_url from public.asistente_config where id = 1;
  if v_url is null then return new; end if;
  if tg_op = 'INSERT' then v_tipo := 'ingreso';
  elsif old.salida is null and new.salida is not null then v_tipo := 'egreso';
  end if;
  if v_tipo is not null then
    begin
      perform net.http_post(url := v_url, body := jsonb_build_object('tipo', v_tipo, 'reserva', new.id),
                            headers := '{"Content-Type": "application/json"}'::jsonb);
    exception when others then null;
    end;
  end if;
  return new;
end $$;
drop trigger if exists al_marcar_asistencia_avisar on public.asistencias;
create trigger al_marcar_asistencia_avisar after insert or update of salida on public.asistencias
  for each row execute function public.al_marcar_asistencia_avisar();

-- ---------- Pago online (dLocal Go) ----------
-- El servicio de Cloudflare crea el pago en dLocal Go, el cliente paga en la página de dLocal y
-- vuelve; dLocal le avisa al servicio (aviso firmado) y el servicio confirma acá. Todo con la
-- clave del servicio (la misma de Torre): desde el navegador no se puede marcar nada como pagado.
alter table public.pagos_web add column if not exists pasarela_id text;
create unique index if not exists pagos_web_pasarela on public.pagos_web (pasarela_id) where pasarela_id is not null;
-- 'prueba' = botón «Pagar» simulado; al confirmarse el primer pago real pasa a 'dlocal' y el simulado se apaga
alter table public.asistente_config add column if not exists pasarela text not null default 'prueba';

-- Datos para crear el cobro de una reserva web (solo con su código secreto de un solo uso)
create or replace function public.pago_web_preparar(p_clave text, p_reserva uuid, p_token uuid) returns json
language plpgsql security definer set search_path = public as $$
declare v_pw public.pagos_web; r public.reservas;
begin
  perform public.asistente_validar(p_clave, null);
  select * into v_pw from public.pagos_web where reserva_id = p_reserva and token = p_token;
  if not found or v_pw.usado is not null or v_pw.vence < now() then
    raise exception 'El pago de esta reserva venció o ya se hizo. Volvé a hacer la reserva.' using errcode = 'P0001';
  end if;
  select * into r from public.reservas where id = p_reserva;
  if r.estado = 'cancelada' or r.total - r.pagado <= 0 then raise exception 'Esta reserva no tiene nada para pagar.' using errcode = 'P0001'; end if;
  return json_build_object('codigo', r.codigo, 'saldo', r.total - r.pagado, 'total', r.total, 'nombre', r.cliente_nombre,
    'email', r.cliente_email, 'telefono', r.cliente_telefono, 'matricula', r.matricula, 'entrada', r.entrada, 'salida', r.salida,
    'lugar_tipo', r.lugar_tipo, 'servicio', r.servicio, 'pasarela_id', v_pw.pasarela_id);
end $$;

-- Guarda el identificador del pago en dLocal (para confirmarlo cuando avise)
create or replace function public.pago_web_guardar(p_clave text, p_reserva uuid, p_pasarela_id text) returns void
language plpgsql security definer set search_path = public as $$
begin
  perform public.asistente_validar(p_clave, null);
  update public.pagos_web set pasarela_id = left(p_pasarela_id, 60) where reserva_id = p_reserva and usado is null;
end $$;

-- Cómo quedó el pago de una reserva (para la pantalla de vuelta de dLocal)
create or replace function public.pago_web_estado(p_clave text, p_reserva uuid, p_token uuid) returns json
language plpgsql security definer set search_path = public as $$
declare v_pw public.pagos_web; r public.reservas;
begin
  perform public.asistente_validar(p_clave, null);
  select * into v_pw from public.pagos_web where reserva_id = p_reserva and token = p_token;
  if not found then raise exception 'No encontramos esa reserva.' using errcode = 'P0001'; end if;
  select * into r from public.reservas where id = p_reserva;
  return json_build_object('pasarela_id', v_pw.pasarela_id, 'pagada', r.pagado >= r.total and r.total > 0,
    'codigo', r.codigo, 'total', r.total, 'pagado', r.pagado, 'entrada', r.entrada, 'salida', r.salida,
    'lugar_tipo', r.lugar_tipo, 'servicio', r.servicio, 'matricula', r.matricula, 'modelo', r.modelo, 'color', r.color,
    'nombre', r.cliente_nombre, 'telefono', r.cliente_telefono, 'estado', r.estado,
    'extras', (select coalesce(json_agg(x ->> 'nombre'), '[]'::json) from jsonb_array_elements(r.extras) x), 'promo', r.promo_codigo);
end $$;

-- dLocal confirmó el pago: se registra (una sola vez) y la reserva queda pagada online.
-- p_cobrado es lo que cobró dLocal; con p_prueba (monto de prueba) igual se salda la reserva.
create or replace function public.pago_web_confirmar(p_clave text, p_pasarela_id text, p_cobrado numeric, p_prueba boolean default false) returns json
language plpgsql security definer set search_path = public as $$
declare v_pw public.pagos_web; r public.reservas; v_monto int;
begin
  perform public.asistente_validar(p_clave, null);
  select * into v_pw from public.pagos_web where pasarela_id = p_pasarela_id for update;
  if not found then raise exception 'Pago desconocido.' using errcode = 'P0001'; end if;
  select * into r from public.reservas where id = v_pw.reserva_id for update;
  if v_pw.usado is not null or r.pagado >= r.total then return json_build_object('codigo', r.codigo, 'ya', true); end if;
  v_monto := case when p_prueba then r.total - r.pagado else least(r.total - r.pagado, floor(coalesce(p_cobrado, 0))::int) end;
  if v_monto <= 0 then raise exception 'Monto cobrado no válido.' using errcode = 'P0001'; end if;
  insert into public.pagos (reserva_id, monto, medio, ref, usuario_nombre)
  values (r.id, v_monto, 'online', left('dLocal ' || p_pasarela_id || case when p_prueba then ' (prueba: $ ' || p_cobrado || ')' else '' end, 60), 'web');
  update public.reservas set pagado = pagado + v_monto where id = r.id;
  update public.pagos_web set usado = now() where reserva_id = r.id;
  perform public.mover_caja('Reserva ' || r.codigo || ' · ' || r.matricula, 'online', v_monto, 'web');
  insert into public.auditoria (usuario_nombre, accion)
  values ('web', 'Pago online (dLocal ' || p_pasarela_id || ') de ' || r.codigo || ': $ ' || v_monto || case when p_prueba then ' · prueba, cobró $ ' || p_cobrado else '' end);
  update public.asistente_config set pasarela = 'dlocal' where id = 1 and pasarela = 'prueba';
  return json_build_object('codigo', r.codigo, 'monto', v_monto);
end $$;

revoke execute on function public.asistente_normalizar(text), public.asistente_estado(), public.asistente_agregar(text, text),
                           public.asistente_quitar(text), public.asistente_nueva_clave(),
                           public.asistente_consulta(text, text, timestamptz, timestamptz),
                           public.asistente_validar(text, text), public.asistente_visto(text, text), public.asistente_ficha(public.reservas), public.unaccent_simple(text),
                           public.asistente_buscar(text, text, text), public.asistente_telefono(text, text, text),
                           public.anotar_sistema(text), public.asistente_aviso(text, uuid, text),
                           public.asistente_aviso_personal(uuid, text), public.al_marcar_asistencia_avisar(),
                           public.pago_web_preparar(text, uuid, uuid), public.pago_web_guardar(text, uuid, text),
                           public.pago_web_estado(text, uuid, uuid), public.pago_web_confirmar(text, text, numeric, boolean),
                           public.al_cambiar_reserva_avisar() from public, anon, authenticated;
grant execute on function public.asistente_estado(), public.asistente_agregar(text, text), public.asistente_quitar(text),
                          public.asistente_nueva_clave() to authenticated;
grant execute on function public.asistente_consulta(text, text, timestamptz, timestamptz),
                          public.asistente_visto(text, text), public.asistente_buscar(text, text, text),
                          public.pago_web_preparar(text, uuid, uuid), public.pago_web_guardar(text, uuid, text),
                          public.pago_web_estado(text, uuid, uuid), public.pago_web_confirmar(text, text, numeric, boolean),
                          public.asistente_telefono(text, text, text), public.asistente_aviso(text, uuid, text) to anon, authenticated;

notify pgrst, 'reload schema';
