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
    'sin_acceso', (select count(*) from public.perfiles where not activo)
  );
end $$;

revoke execute on function public.asistente_normalizar(text), public.asistente_estado(), public.asistente_agregar(text, text),
                           public.asistente_quitar(text), public.asistente_nueva_clave(),
                           public.asistente_consulta(text, text, timestamptz, timestamptz) from public, anon, authenticated;
grant execute on function public.asistente_estado(), public.asistente_agregar(text, text), public.asistente_quitar(text),
                          public.asistente_nueva_clave() to authenticated;
grant execute on function public.asistente_consulta(text, text, timestamptz, timestamptz) to anon, authenticated;

notify pgrst, 'reload schema';
