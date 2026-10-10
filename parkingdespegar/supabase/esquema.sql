-- ============================================================
-- PARKING DESPEGAR — Base de datos (Supabase / Postgres)
--
-- Se pega UNA vez en Supabase → SQL Editor → Run. Arranca vacía:
-- sin clientes, sin reservas, sin usuarios.
--
-- Cómo queda protegida:
--  · Todas las tablas tienen RLS: nadie lee ni escribe sin permiso.
--  · Lo que mueve la operación (reservas, pagos, entrada, salida, caja,
--    facturas, traslados) pasa por funciones del servidor que controlan
--    el rol y calculan precios y saldos. Desde el navegador no se puede
--    inventar un precio ni marcar algo como pagado.
--  · La web pública solo puede: leer las tarifas, consultar cuántos
--    lugares hay libres, crear su reserva y pagarla con un código
--    secreto de un solo uso que recibe al crearla.
--  · El primer usuario que se registra es la dueña (administración).
--    Todos los demás quedan pendientes hasta que ella los aprueba.
--  · Cada acción queda en el registro de cambios con nombre y hora,
--    escrito por el servidor (no se puede falsear desde el navegador).
-- ============================================================

create extension if not exists pgcrypto;

-- ---------- Tablas ----------

create table if not exists public.perfiles (
  id      uuid primary key references auth.users (id) on delete cascade,
  nombre  text not null default '' check (char_length(nombre) <= 80),
  email   text not null default '',
  rol     text not null default 'personal' check (rol in ('admin', 'personal', 'chofer')),
  activo  boolean not null default false,
  creado  timestamptz not null default now()
);

create table if not exists public.tarifas (
  id           int primary key default 1 check (id = 1),
  techado      int not null default 490 check (techado between 0 and 1000000),
  aire         int not null default 390 check (aire between 0 and 1000000),
  valet        int not null default 450 check (valet between 0 and 1000000),
  gracia_horas int not null default 3 check (gracia_horas between 0 and 12),
  minimo_dias  int not null default 1 check (minimo_dias between 1 and 30),
  actualizado  timestamptz not null default now()
);
insert into public.tarifas (id) values (1) on conflict do nothing;

create table if not exists public.empresa (
  id        int primary key default 1 check (id = 1),
  razon     text not null default 'Parking Despegar' check (char_length(razon) <= 120),
  rut       text not null default '' check (rut ~ '^(\d{12})?$'),
  direccion text not null default 'Av. Wilson Ferreira Aldunate 5536, Paso de Carrasco' check (char_length(direccion) <= 160),
  iva       int not null default 22 check (iva between 0 and 30)
);
insert into public.empresa (id) values (1) on conflict do nothing;

create table if not exists public.lugares (
  id    text primary key,
  tipo  text not null check (tipo in ('techado', 'aire')),
  orden int not null
);
insert into public.lugares (id, tipo, orden)
  select 'A-' || lpad(n::text, 2, '0'), 'techado', n from generate_series(1, 24) n
  union all
  select 'B-' || lpad(n::text, 2, '0'), 'aire', 100 + n from generate_series(1, 36) n
on conflict do nothing;

create sequence if not exists public.reserva_numero start 1001;

create table if not exists public.reservas (
  id               uuid primary key default gen_random_uuid(),
  codigo           text not null unique default ('PD-' || nextval('public.reserva_numero')),
  creada           timestamptz not null default now(),
  origen           text not null check (origen in ('web', 'whatsapp', 'mostrador', 'telefono')),
  cliente_nombre   text not null check (char_length(cliente_nombre) between 2 and 80),
  cliente_telefono text not null check (char_length(cliente_telefono) between 6 and 30),
  cliente_email    text not null default '' check (char_length(cliente_email) <= 120),
  matricula        text not null check (char_length(matricula) between 3 and 12),
  modelo           text not null default '' check (char_length(modelo) <= 60),
  color            text not null default '' check (char_length(color) <= 30),
  lugar_tipo       text not null check (lugar_tipo in ('techado', 'aire')),
  servicio         text not null check (servicio in ('traslado', 'valet')),
  pasajeros        int not null default 1 check (pasajeros between 1 and 8),
  entrada          timestamptz not null,
  salida           timestamptz not null,
  vuelo_ida        text not null default '' check (char_length(vuelo_ida) <= 12),
  vuelo_vuelta     text not null default '' check (char_length(vuelo_vuelta) <= 12),
  lugar            text references public.lugares (id) on update cascade,
  checkin          timestamptz,
  checkout         timestamptz,
  traslado_ida     text not null default 'pendiente' check (traslado_ida in ('pendiente', 'en_camino', 'hecho')),
  traslado_vuelta  text not null default 'pendiente' check (traslado_vuelta in ('pendiente', 'en_camino', 'hecho')),
  notas            text not null default '' check (char_length(notas) <= 300),
  estado           text not null default 'confirmada' check (estado in ('confirmada', 'en_predio', 'finalizada', 'cancelada')),
  total            int not null check (total >= 0),
  pagado           int not null default 0 check (pagado >= 0),
  factura          uuid,
  check (salida > entrada)
);
-- Un lugar no puede tener dos autos adentro al mismo tiempo
create unique index if not exists reservas_un_auto_por_lugar on public.reservas (lugar) where estado = 'en_predio';
create index if not exists reservas_entrada on public.reservas (entrada);

-- Código secreto para pagar una reserva hecha en la web (nadie lo puede leer)
create table if not exists public.pagos_web (
  reserva_id uuid primary key references public.reservas (id) on delete cascade,
  token      uuid not null,
  vence      timestamptz not null,
  usado      timestamptz
);

create table if not exists public.pagos (
  id             uuid primary key default gen_random_uuid(),
  reserva_id     uuid not null references public.reservas (id) on delete cascade,
  monto          int not null check (monto between 1 and 10000000),
  medio          text not null check (medio in ('efectivo', 'tarjeta', 'transferencia', 'online')),
  ref            text not null default '' check (char_length(ref) <= 60),
  fecha          timestamptz not null default now(),
  usuario_id     uuid,
  usuario_nombre text not null default 'web'
);
create index if not exists pagos_reserva on public.pagos (reserva_id);

create table if not exists public.caja_turnos (
  id           uuid primary key default gen_random_uuid(),
  apertura     timestamptz not null default now(),
  base         int not null check (base between 0 and 10000000),
  abrio_nombre text not null,
  cierre       timestamptz,
  esperado     int,
  contado      int,
  cerro_nombre text
);
-- Una sola caja abierta a la vez
create unique index if not exists una_caja_abierta on public.caja_turnos ((true)) where cierre is null;

create table if not exists public.caja_movimientos (
  id             uuid primary key default gen_random_uuid(),
  turno_id       uuid not null references public.caja_turnos (id) on delete cascade,
  hora           timestamptz not null default now(),
  concepto       text not null check (char_length(concepto) <= 120),
  medio          text not null check (medio in ('efectivo', 'tarjeta', 'transferencia', 'online', 'egreso')),
  monto          int not null,
  usuario_nombre text not null
);

create sequence if not exists public.factura_numero start 1;

create table if not exists public.facturas (
  id             uuid primary key default gen_random_uuid(),
  serie          text not null default 'A',
  numero         int not null unique default nextval('public.factura_numero'),
  tipo           text not null check (tipo in ('eticket', 'efactura')),
  fecha          timestamptz not null default now(),
  reserva_id     uuid not null references public.reservas (id),
  codigo         text not null,
  cliente        jsonb not null,
  lineas         jsonb not null,
  total          int not null,
  iva            int not null,
  usuario_nombre text not null
);

create table if not exists public.auditoria (
  id             bigserial primary key,
  fecha          timestamptz not null default now(),
  usuario_id     uuid,
  usuario_nombre text not null,
  accion         text not null check (char_length(accion) <= 300)
);

-- ---------- Quién es quién ----------

create or replace function public.mi_rol() returns text
language sql stable security definer set search_path = public as $$
  select rol from public.perfiles where id = auth.uid() and activo
$$;

create or replace function public.tiene_rol(variadic roles text[]) returns boolean
language sql stable security definer set search_path = public as $$
  select coalesce(public.mi_rol() = any (roles), false)
$$;

create or replace function public.mi_nombre() returns text
language sql stable security definer set search_path = public as $$
  select coalesce((select nombre from public.perfiles where id = auth.uid()), 'web')
$$;

create or replace function public.exigir_rol(variadic roles text[]) returns void
language plpgsql stable security definer set search_path = public as $$
begin
  if not public.tiene_rol(variadic roles) then
    raise exception 'No tenés permiso para hacer esto.' using errcode = '42501';
  end if;
end $$;

create or replace function public.anotar(p_accion text) returns void
language sql security definer set search_path = public as $$
  insert into public.auditoria (usuario_id, usuario_nombre, accion)
  values (auth.uid(), public.mi_nombre(), left(p_accion, 300))
$$;

-- ---------- Cálculos ----------

-- Días cobrados y precio, con la tolerancia y el mínimo de las tarifas
create or replace function public.calcular_precio(p_entrada timestamptz, p_salida timestamptz, p_tipo text, p_servicio text)
returns table (dias int, base int, extra int, total int)
language sql stable security definer set search_path = public as $$
  with t as (select * from public.tarifas where id = 1),
  d as (
    select greatest(t.minimo_dias,
             ceil(greatest(0, extract(epoch from (p_salida - p_entrada)) / 3600 - t.gracia_horas) / 24)::int) as n,
           case when p_tipo = 'techado' then t.techado else t.aire end as por_dia,
           case when p_servicio = 'valet' then t.valet else 0 end as valet
    from t
  )
  select d.n, d.n * d.por_dia, d.valet, d.n * d.por_dia + d.valet from d
$$;

-- Lugares de un tipo que quedan libres entre dos fechas
create or replace function public.libres_entre(p_tipo text, p_entrada timestamptz, p_salida timestamptz) returns int
language sql stable security definer set search_path = public as $$
  select greatest(0,
    (select count(*) from public.lugares where tipo = p_tipo)::int -
    (select count(*) from public.reservas
      where lugar_tipo = p_tipo and estado in ('confirmada', 'en_predio')
        and entrada < p_salida and salida > p_entrada)::int)
$$;

-- Suma un movimiento a la caja abierta (si hay una)
create or replace function public.mover_caja(p_concepto text, p_medio text, p_monto int, p_nombre text) returns void
language sql security definer set search_path = public as $$
  insert into public.caja_movimientos (turno_id, concepto, medio, monto, usuario_nombre)
  select id, left(p_concepto, 120), p_medio, p_monto, p_nombre from public.caja_turnos where cierre is null
$$;

-- Valida los datos y crea la reserva (lo usan la web y el mostrador)
create or replace function public.insertar_reserva(p jsonb, p_origen text) returns public.reservas
language plpgsql security definer set search_path = public as $$
declare
  v_ent  timestamptz;
  v_sal  timestamptz;
  v_tipo text := coalesce(p ->> 'lugar_tipo', '');
  v_serv text := coalesce(p ->> 'servicio', 'traslado');
  v_nom  text := btrim(coalesce(p ->> 'nombre', ''));
  v_tel  text := btrim(coalesce(p ->> 'telefono', ''));
  v_mat  text := regexp_replace(upper(btrim(coalesce(p ->> 'matricula', ''))), '^([A-Z]{3})\s*(\d{3,4})$', '\1 \2');
  v_res  public.reservas;
begin
  begin
    v_ent := (p ->> 'entrada')::timestamptz;
    v_sal := (p ->> 'salida')::timestamptz;
  exception when others then
    raise exception 'Revisá las fechas de entrada y salida.' using errcode = 'P0001';
  end;
  if v_ent is null or v_sal is null then raise exception 'Completá la entrada y la salida.' using errcode = 'P0001'; end if;
  if v_sal <= v_ent then raise exception 'La salida tiene que ser después de la entrada.' using errcode = 'P0001'; end if;
  if v_sal - v_ent > interval '120 days' then raise exception 'La estadía no puede superar los 120 días.' using errcode = 'P0001'; end if;
  if v_ent > now() + interval '1 year' then raise exception 'Solo se puede reservar con hasta un año de anticipación.' using errcode = 'P0001'; end if;
  if v_tipo not in ('techado', 'aire') then raise exception 'Elegí techado o predio.' using errcode = 'P0001'; end if;
  if v_serv not in ('traslado', 'valet') then raise exception 'Elegí el servicio.' using errcode = 'P0001'; end if;
  if char_length(v_nom) < 2 then raise exception 'Falta el nombre.' using errcode = 'P0001'; end if;
  if char_length(regexp_replace(v_tel, '\D', '', 'g')) < 8 then raise exception 'Revisá el teléfono.' using errcode = 'P0001'; end if;
  if char_length(regexp_replace(v_mat, '\s', '', 'g')) < 3 then raise exception 'Revisá la matrícula.' using errcode = 'P0001'; end if;
  if public.libres_entre(v_tipo, v_ent, v_sal) <= 0 then
    raise exception 'No quedan lugares de ese tipo en esas fechas.' using errcode = 'P0001';
  end if;

  insert into public.reservas (origen, cliente_nombre, cliente_telefono, cliente_email, matricula, modelo, color,
                               lugar_tipo, servicio, pasajeros, entrada, salida, vuelo_ida, vuelo_vuelta, total)
  values (p_origen, left(v_nom, 80), left(v_tel, 30), left(btrim(coalesce(p ->> 'email', '')), 120), left(v_mat, 12),
          left(btrim(coalesce(p ->> 'modelo', '')), 60), left(btrim(coalesce(p ->> 'color', '')), 30),
          v_tipo, v_serv, least(8, greatest(1, coalesce((p ->> 'pasajeros')::int, 1))), v_ent, v_sal,
          left(upper(btrim(coalesce(p ->> 'vuelo_ida', ''))), 12), left(upper(btrim(coalesce(p ->> 'vuelo_vuelta', ''))), 12),
          (select total from public.calcular_precio(v_ent, v_sal, v_tipo, v_serv)))
  returning * into v_res;
  return v_res;
end $$;

-- Registra un pago dentro de una reserva ya bloqueada
create or replace function public.sumar_pago(p_res public.reservas, p_monto int, p_medio text, p_ref text) returns void
language plpgsql security definer set search_path = public as $$
begin
  insert into public.pagos (reserva_id, monto, medio, ref, usuario_id, usuario_nombre)
  values (p_res.id, p_monto, p_medio, left(coalesce(p_ref, ''), 60), auth.uid(), public.mi_nombre());
  update public.reservas set pagado = pagado + p_monto where id = p_res.id;
  perform public.mover_caja('Reserva ' || p_res.codigo || ' · ' || p_res.matricula, p_medio, p_monto, public.mi_nombre());
end $$;

-- ============================================================
-- WEB PÚBLICA (sin usuario)
-- ============================================================

create or replace function public.disponibilidad_web(p_entrada timestamptz, p_salida timestamptz) returns json
language plpgsql stable security definer set search_path = public as $$
begin
  if p_entrada is null or p_salida is null or p_salida <= p_entrada or p_salida - p_entrada > interval '120 days' then
    return json_build_object('techado', 0, 'aire', 0);
  end if;
  return json_build_object('techado', public.libres_entre('techado', p_entrada, p_salida),
                           'aire', public.libres_entre('aire', p_entrada, p_salida));
end $$;

create or replace function public.crear_reserva_web(p jsonb) returns json
language plpgsql security definer set search_path = public as $$
declare
  v_res   public.reservas;
  v_token uuid := gen_random_uuid();
begin
  if (p ->> 'entrada')::timestamptz < now() - interval '1 hour' then
    raise exception 'La fecha de entrada ya pasó.' using errcode = 'P0001';
  end if;
  v_res := public.insertar_reserva(p, 'web');
  insert into public.pagos_web (reserva_id, token, vence) values (v_res.id, v_token, now() + interval '2 hours');
  insert into public.auditoria (usuario_nombre, accion)
  values ('web', 'Nueva reserva ' || v_res.codigo || ' desde la web (' || v_res.matricula || ')');
  return json_build_object('id', v_res.id, 'codigo', v_res.codigo, 'total', v_res.total, 'token', v_token,
                           'entrada', v_res.entrada, 'salida', v_res.salida);
end $$;

-- PASARELA DE PRUEBA: el botón «Pagar» marca la reserva como pagada online.
-- Con la pasarela real, esto lo hace el aviso (webhook) de la pasarela.
create or replace function public.pagar_reserva_web(p_id uuid, p_token uuid) returns json
language plpgsql security definer set search_path = public as $$
declare
  v_pw  public.pagos_web;
  v_res public.reservas;
  v_monto int;
begin
  select * into v_pw from public.pagos_web where reserva_id = p_id and token = p_token for update;
  if not found or v_pw.usado is not null or v_pw.vence < now() then
    raise exception 'No se pudo confirmar el pago. Volvé a intentar la reserva.' using errcode = 'P0001';
  end if;
  select * into v_res from public.reservas where id = p_id for update;
  v_monto := v_res.total - v_res.pagado;
  if v_res.estado = 'cancelada' or v_monto <= 0 then
    raise exception 'Esta reserva no tiene nada para pagar.' using errcode = 'P0001';
  end if;
  insert into public.pagos (reserva_id, monto, medio, ref, usuario_nombre)
  values (v_res.id, v_monto, 'online', 'WEB-' || upper(substr(md5(random()::text), 1, 6)), 'web');
  update public.reservas set pagado = pagado + v_monto where id = v_res.id;
  update public.pagos_web set usado = now() where reserva_id = v_res.id;
  perform public.mover_caja('Reserva ' || v_res.codigo || ' · ' || v_res.matricula, 'online', v_monto, 'web');
  insert into public.auditoria (usuario_nombre, accion)
  values ('web', 'Pago online de ' || v_res.codigo || ': $ ' || v_monto);
  return json_build_object('codigo', v_res.codigo, 'pagado', v_monto);
end $$;

-- ============================================================
-- OPERACIÓN (personal con usuario)
-- ============================================================

create or replace function public.crear_reserva(p jsonb) returns json
language plpgsql security definer set search_path = public as $$
declare
  v_origen text := coalesce(p ->> 'origen', 'mostrador');
  v_res public.reservas;
begin
  perform public.exigir_rol('admin', 'personal');
  if v_origen not in ('whatsapp', 'mostrador', 'telefono') then v_origen := 'mostrador'; end if;
  if (p ->> 'entrada')::timestamptz < now() - interval '1 day' then
    raise exception 'La entrada no puede ser de hace más de un día.' using errcode = 'P0001';
  end if;
  v_res := public.insertar_reserva(p, v_origen);
  perform public.anotar('Nueva reserva ' || v_res.codigo || ' (' || v_res.matricula || ') por ' || v_origen);
  return json_build_object('id', v_res.id, 'codigo', v_res.codigo, 'total', v_res.total);
end $$;

create or replace function public.registrar_pago(p_reserva uuid, p_monto int, p_medio text, p_ref text default '') returns json
language plpgsql security definer set search_path = public as $$
declare v_res public.reservas;
begin
  perform public.exigir_rol('admin', 'personal');
  if coalesce(p_medio, '') not in ('efectivo', 'tarjeta', 'transferencia') then raise exception 'Medio de pago no válido.' using errcode = 'P0001'; end if;
  select * into v_res from public.reservas where id = p_reserva for update;
  if not found or v_res.estado = 'cancelada' then raise exception 'La reserva no existe o está cancelada.' using errcode = 'P0001'; end if;
  if p_monto is null or p_monto < 1 or p_monto > v_res.total - v_res.pagado then
    raise exception 'El monto tiene que ser entre $ 1 y lo que falta pagar ($ %).', v_res.total - v_res.pagado using errcode = 'P0001';
  end if;
  perform public.sumar_pago(v_res, p_monto, p_medio, p_ref);
  perform public.anotar('Pago de ' || v_res.codigo || ': $ ' || p_monto || ' (' || p_medio || ')');
  return json_build_object('pagado', v_res.pagado + p_monto, 'total', v_res.total);
end $$;

-- Entrada: cobra lo que falte, asigna el lugar y emite la factura, todo junto
create or replace function public.registrar_entrada(p_reserva uuid, p_lugar text, p_notas text, p_medio text,
                                                    p_tipo_factura text, p_rut text, p_razon text) returns json
language plpgsql security definer set search_path = public as $$
declare
  v_res   public.reservas;
  v_lugar public.lugares;
  v_saldo int;
  v_p     record;
  v_lin   jsonb;
  v_fac   public.facturas;
  v_rut   text := regexp_replace(coalesce(p_rut, ''), '\D', '', 'g');
begin
  perform public.exigir_rol('admin', 'personal');
  select * into v_res from public.reservas where id = p_reserva for update;
  if not found or v_res.estado <> 'confirmada' then raise exception 'Esta reserva ya entró o no está confirmada.' using errcode = 'P0001'; end if;
  select * into v_lugar from public.lugares where id = p_lugar;
  if not found or v_lugar.tipo <> v_res.lugar_tipo then raise exception 'Elegí un lugar del tipo reservado.' using errcode = 'P0001'; end if;
  if exists (select 1 from public.reservas where lugar = p_lugar and estado = 'en_predio') then
    raise exception 'El lugar % ya está ocupado.', p_lugar using errcode = 'P0001';
  end if;
  if p_tipo_factura = 'efactura' and (v_rut !~ '^\d{12}$' or char_length(btrim(coalesce(p_razon, ''))) < 2) then
    raise exception 'Para la e-Factura completá el RUT (12 dígitos) y la razón social.' using errcode = 'P0001';
  end if;

  v_saldo := v_res.total - v_res.pagado;
  if v_saldo > 0 then
    if coalesce(p_medio, '') not in ('efectivo', 'tarjeta', 'transferencia') then
      raise exception 'Falta cobrar $ %: elegí el medio de pago.', v_saldo using errcode = 'P0001';
    end if;
    perform public.sumar_pago(v_res, v_saldo, p_medio, '');
  end if;

  update public.reservas
     set estado = 'en_predio', lugar = p_lugar, checkin = now(), notas = left(btrim(coalesce(p_notas, '')), 300)
   where id = v_res.id;

  select * into v_p from public.calcular_precio(v_res.entrada, v_res.salida, v_res.lugar_tipo, v_res.servicio);
  v_lin := jsonb_build_array(jsonb_build_object('concepto',
             'Estacionamiento ' || case when v_res.lugar_tipo = 'techado' then 'techado' else 'en predio' end ||
             ' · ' || v_p.dias || case when v_p.dias = 1 then ' día' else ' días' end, 'monto', v_p.base));
  if v_p.extra > 0 then v_lin := v_lin || jsonb_build_object('concepto', 'Valet Parking', 'monto', v_p.extra); end if;
  if v_res.total <> v_p.total then v_lin := v_lin || jsonb_build_object('concepto', 'Ajuste', 'monto', v_res.total - v_p.total); end if;

  insert into public.facturas (tipo, reserva_id, codigo, cliente, lineas, total, iva, usuario_nombre)
  values (case when p_tipo_factura = 'efactura' then 'efactura' else 'eticket' end, v_res.id, v_res.codigo,
          case when p_tipo_factura = 'efactura'
               then jsonb_build_object('razon', left(btrim(p_razon), 120), 'rut', v_rut)
               else jsonb_build_object('nombre', v_res.cliente_nombre) end,
          v_lin, v_res.total, (select iva from public.empresa where id = 1), public.mi_nombre())
  returning * into v_fac;
  update public.reservas set factura = v_fac.id where id = v_res.id;

  perform public.anotar('Entrada de ' || v_res.codigo || ' (' || v_res.matricula || ') al lugar ' || p_lugar ||
                        ' · ' || case when v_fac.tipo = 'efactura' then 'e-Factura' else 'e-Ticket' end ||
                        ' A-' || lpad(v_fac.numero::text, 4, '0'));
  return json_build_object('factura', v_fac.id, 'numero', v_fac.numero, 'tipo', v_fac.tipo);
end $$;

-- Salida: no se cobra (se pagó al entrar). Si se quedó más días, la diferencia se puede cobrar o no.
create or replace function public.registrar_salida(p_reserva uuid, p_medio_dif text default '') returns json
language plpgsql security definer set search_path = public as $$
declare
  v_res  public.reservas;
  v_real int;
  v_dif  int;
begin
  perform public.exigir_rol('admin', 'personal');
  select * into v_res from public.reservas where id = p_reserva for update;
  if not found or v_res.estado <> 'en_predio' then raise exception 'Este auto no está en el parking.' using errcode = 'P0001'; end if;
  select total into v_real from public.calcular_precio(coalesce(v_res.checkin, v_res.entrada), now(), v_res.lugar_tipo, v_res.servicio);
  v_dif := greatest(0, v_real - v_res.total);
  if v_dif > 0 and coalesce(p_medio_dif, '') in ('efectivo', 'tarjeta', 'transferencia') then
    update public.reservas set total = total + v_dif where id = v_res.id returning * into v_res;
    perform public.sumar_pago(v_res, v_dif, p_medio_dif, 'Días adicionales');
  else
    v_dif := 0;
  end if;
  update public.reservas set estado = 'finalizada', checkout = now(), traslado_vuelta = 'hecho' where id = v_res.id;
  perform public.anotar('Salida de ' || v_res.codigo || ' (' || v_res.matricula || '), libera ' || coalesce(v_res.lugar, '—') ||
                        case when v_dif > 0 then ' · cobró $ ' || v_dif || ' de diferencia' else '' end);
  return json_build_object('lugar', v_res.lugar, 'diferencia', v_dif);
end $$;

create or replace function public.cancelar_reserva(p_reserva uuid) returns void
language plpgsql security definer set search_path = public as $$
declare v_res public.reservas;
begin
  perform public.exigir_rol('admin', 'personal');
  select * into v_res from public.reservas where id = p_reserva for update;
  if not found or v_res.estado <> 'confirmada' then raise exception 'Solo se pueden cancelar reservas que todavía no entraron.' using errcode = 'P0001'; end if;
  update public.reservas set estado = 'cancelada' where id = v_res.id;
  perform public.anotar('Canceló ' || v_res.codigo || case when v_res.pagado > 0 then ' (había pagado $ ' || v_res.pagado || ')' else '' end);
end $$;

create or replace function public.marcar_traslado(p_reserva uuid, p_tipo text, p_estado text) returns void
language plpgsql security definer set search_path = public as $$
declare v_res public.reservas;
begin
  perform public.exigir_rol('admin', 'personal', 'chofer');
  if p_tipo not in ('ida', 'vuelta') or p_estado not in ('pendiente', 'en_camino', 'hecho') then
    raise exception 'Datos del traslado no válidos.' using errcode = 'P0001';
  end if;
  if p_tipo = 'ida' then
    update public.reservas set traslado_ida = p_estado where id = p_reserva returning * into v_res;
  else
    update public.reservas set traslado_vuelta = p_estado where id = p_reserva returning * into v_res;
  end if;
  if not found then raise exception 'La reserva no existe.' using errcode = 'P0001'; end if;
  perform public.anotar(case when p_tipo = 'ida' then 'Llevar al aeropuerto' else 'Buscar en el aeropuerto' end ||
                        ' a ' || v_res.cliente_nombre || ' (' || v_res.codigo || '): ' ||
                        case p_estado when 'en_camino' then 'en camino' when 'hecho' then 'hecho' else 'pendiente' end);
end $$;

-- ---------- Caja ----------

create or replace function public.abrir_caja(p_base int) returns void
language plpgsql security definer set search_path = public as $$
begin
  perform public.exigir_rol('admin', 'personal');
  if exists (select 1 from public.caja_turnos where cierre is null) then raise exception 'Ya hay una caja abierta.' using errcode = 'P0001'; end if;
  if p_base is null or p_base < 0 then raise exception 'Escribí con cuánto efectivo se abre.' using errcode = 'P0001'; end if;
  insert into public.caja_turnos (base, abrio_nombre) values (p_base, public.mi_nombre());
  perform public.anotar('Abrió caja con $ ' || p_base);
end $$;

create or replace function public.egreso_caja(p_concepto text, p_monto int) returns void
language plpgsql security definer set search_path = public as $$
begin
  perform public.exigir_rol('admin', 'personal');
  if not exists (select 1 from public.caja_turnos where cierre is null) then raise exception 'No hay una caja abierta.' using errcode = 'P0001'; end if;
  if char_length(btrim(coalesce(p_concepto, ''))) < 2 or p_monto is null or p_monto < 1 then
    raise exception 'Completá el concepto y el monto.' using errcode = 'P0001';
  end if;
  perform public.mover_caja(btrim(p_concepto), 'egreso', -p_monto, public.mi_nombre());
  perform public.anotar('Egreso: ' || btrim(p_concepto) || ' $ ' || p_monto);
end $$;

create or replace function public.cerrar_caja(p_contado int) returns json
language plpgsql security definer set search_path = public as $$
declare
  v_t public.caja_turnos;
  v_esperado int;
begin
  perform public.exigir_rol('admin', 'personal');
  select * into v_t from public.caja_turnos where cierre is null for update;
  if not found then raise exception 'No hay una caja abierta.' using errcode = 'P0001'; end if;
  if p_contado is null or p_contado < 0 then raise exception 'Escribí cuánto efectivo contaste.' using errcode = 'P0001'; end if;
  select v_t.base + coalesce(sum(monto), 0) into v_esperado
    from public.caja_movimientos where turno_id = v_t.id and medio in ('efectivo', 'egreso');
  update public.caja_turnos set cierre = now(), esperado = v_esperado, contado = p_contado, cerro_nombre = public.mi_nombre()
   where id = v_t.id;
  perform public.anotar('Cerró caja: esperado $ ' || v_esperado || ', contado $ ' || p_contado);
  return json_build_object('esperado', v_esperado, 'contado', p_contado);
end $$;

-- ---------- Configuración (solo la dueña) ----------

-- Cantidad de lugares: agrega los que falten o saca los últimos si están libres
create or replace function public.configurar_lugares(p_techado int, p_aire int) returns void
language plpgsql security definer set search_path = public as $$
declare v_tipo text; v_cant int; v_pref text; v_base int;
begin
  perform public.exigir_rol('admin');
  if p_techado is null or p_aire is null or p_techado not between 0 and 500 or p_aire not between 0 and 500 then raise exception 'Cantidad no válida.' using errcode = 'P0001'; end if;
  foreach v_tipo in array array['techado', 'aire'] loop
    v_cant := case when v_tipo = 'techado' then p_techado else p_aire end;
    v_pref := case when v_tipo = 'techado' then 'A-' else 'B-' end;
    v_base := case when v_tipo = 'techado' then 0 else 100 end;
    if exists (select 1 from public.lugares l where l.tipo = v_tipo and l.orden - v_base > v_cant
               and exists (select 1 from public.reservas r where r.lugar = l.id and r.estado = 'en_predio')) then
      raise exception 'Hay autos en lugares que se sacarían. Primero registrá su salida.' using errcode = 'P0001';
    end if;
    delete from public.lugares l where l.tipo = v_tipo and l.orden - v_base > v_cant
      and not exists (select 1 from public.reservas r where r.lugar = l.id);
    insert into public.lugares (id, tipo, orden)
      select v_pref || lpad(n::text, 2, '0'), v_tipo, v_base + n from generate_series(1, v_cant) n
    on conflict do nothing;
  end loop;
  perform public.anotar('Cambió la cantidad de lugares: ' || p_techado || ' techados y ' || p_aire || ' en predio');
end $$;

create or replace function public.auditar(p_accion text) returns void
language plpgsql security definer set search_path = public as $$
begin
  if public.mi_rol() is null then return; end if;
  perform public.anotar(p_accion);
end $$;

-- ---------- Usuarios ----------

-- Cada cuenta nueva crea su perfil. La primera es la dueña; las demás esperan aprobación.
create or replace function public.al_crear_usuario() returns trigger
language plpgsql security definer set search_path = public as $$
declare
  v_hay_admin boolean;
  v_nombre text := left(coalesce(nullif(btrim(new.raw_user_meta_data ->> 'nombre'), ''), split_part(coalesce(new.email, ''), '@', 1)), 80);
begin
  perform pg_advisory_xact_lock(4210);
  select exists (select 1 from public.perfiles where rol = 'admin' and activo) into v_hay_admin;
  insert into public.perfiles (id, nombre, email, rol, activo)
  values (new.id, v_nombre, coalesce(new.email, ''), case when v_hay_admin then 'personal' else 'admin' end, not v_hay_admin)
  on conflict (id) do nothing;
  insert into public.auditoria (usuario_id, usuario_nombre, accion)
  values (new.id, v_nombre, case when v_hay_admin then 'Pidió acceso al sistema' else 'Creó la cuenta de administración' end);
  return new;
end $$;
drop trigger if exists al_crear_usuario on auth.users;
create trigger al_crear_usuario after insert on auth.users for each row execute function public.al_crear_usuario();

-- Nadie puede cambiarse su propio rol ni desactivarse; los cambios quedan anotados
create or replace function public.al_cambiar_perfil() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  if new.id = auth.uid() and (new.rol <> old.rol or new.activo <> old.activo) then
    raise exception 'No podés cambiar tu propio rol ni desactivarte.' using errcode = '42501';
  end if;
  new.email := old.email;
  if new.rol <> old.rol or new.activo <> old.activo then
    perform public.anotar(case when new.activo and not old.activo then 'Aprobó a ' when not new.activo and old.activo then 'Desactivó a ' else 'Cambió el rol de ' end ||
                          new.nombre || ' (' || new.rol || ')');
  end if;
  return new;
end $$;
drop trigger if exists al_cambiar_perfil on public.perfiles;
create trigger al_cambiar_perfil before update on public.perfiles for each row execute function public.al_cambiar_perfil();

create or replace function public.al_cambiar_config() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  if tg_table_name = 'tarifas' then
    new.actualizado := now();
    perform public.anotar('Cambió las tarifas: techado $ ' || new.techado || ', predio $ ' || new.aire || ', valet $ ' || new.valet);
  else
    perform public.anotar('Cambió los datos para la factura');
  end if;
  return new;
end $$;
drop trigger if exists al_cambiar_tarifas on public.tarifas;
create trigger al_cambiar_tarifas before update on public.tarifas for each row execute function public.al_cambiar_config();
drop trigger if exists al_cambiar_empresa on public.empresa;
create trigger al_cambiar_empresa before update on public.empresa for each row execute function public.al_cambiar_config();

-- ============================================================
-- PERMISOS (RLS)
-- ============================================================

alter table public.perfiles         enable row level security;
alter table public.tarifas          enable row level security;
alter table public.empresa          enable row level security;
alter table public.lugares          enable row level security;
alter table public.reservas         enable row level security;
alter table public.pagos_web        enable row level security;
alter table public.pagos            enable row level security;
alter table public.caja_turnos      enable row level security;
alter table public.caja_movimientos enable row level security;
alter table public.facturas         enable row level security;
alter table public.auditoria        enable row level security;

drop policy if exists perfiles_ver on public.perfiles;
create policy perfiles_ver on public.perfiles for select to authenticated
  using (id = auth.uid() or (select public.tiene_rol('admin')));
drop policy if exists perfiles_editar on public.perfiles;
create policy perfiles_editar on public.perfiles for update to authenticated
  using ((select public.tiene_rol('admin'))) with check ((select public.tiene_rol('admin')));

drop policy if exists tarifas_ver on public.tarifas;
create policy tarifas_ver on public.tarifas for select to anon, authenticated using (true);
drop policy if exists tarifas_editar on public.tarifas;
create policy tarifas_editar on public.tarifas for update to authenticated
  using ((select public.tiene_rol('admin'))) with check ((select public.tiene_rol('admin')));

drop policy if exists empresa_ver on public.empresa;
create policy empresa_ver on public.empresa for select to authenticated using ((select public.tiene_rol('admin', 'personal', 'chofer')));
drop policy if exists empresa_editar on public.empresa;
create policy empresa_editar on public.empresa for update to authenticated
  using ((select public.tiene_rol('admin'))) with check ((select public.tiene_rol('admin')));

drop policy if exists lugares_ver on public.lugares;
create policy lugares_ver on public.lugares for select to authenticated using ((select public.tiene_rol('admin', 'personal', 'chofer')));

drop policy if exists reservas_ver on public.reservas;
create policy reservas_ver on public.reservas for select to authenticated using ((select public.tiene_rol('admin', 'personal', 'chofer')));

drop policy if exists pagos_ver on public.pagos;
create policy pagos_ver on public.pagos for select to authenticated using ((select public.tiene_rol('admin', 'personal')));

drop policy if exists caja_turnos_ver on public.caja_turnos;
create policy caja_turnos_ver on public.caja_turnos for select to authenticated using ((select public.tiene_rol('admin', 'personal')));
drop policy if exists caja_mov_ver on public.caja_movimientos;
create policy caja_mov_ver on public.caja_movimientos for select to authenticated using ((select public.tiene_rol('admin', 'personal')));

drop policy if exists facturas_ver on public.facturas;
create policy facturas_ver on public.facturas for select to authenticated using ((select public.tiene_rol('admin', 'personal')));

drop policy if exists auditoria_ver on public.auditoria;
create policy auditoria_ver on public.auditoria for select to authenticated using ((select public.tiene_rol('admin')));

-- Privilegios: la web anónima solo ve tarifas; el personal solo escribe por las funciones
-- (No depende de «Automatically expose new tables»: todo se otorga a mano acá abajo.)
grant usage on schema public to anon, authenticated;
revoke all on all tables in schema public from anon, authenticated;
revoke all on all sequences in schema public from anon, authenticated;
grant select on public.tarifas to anon;
grant select on public.perfiles, public.tarifas, public.empresa, public.lugares, public.reservas, public.pagos,
                public.caja_turnos, public.caja_movimientos, public.facturas, public.auditoria to authenticated;
grant update (techado, aire, valet, gracia_horas, minimo_dias) on public.tarifas to authenticated;
grant update (razon, rut, direccion, iva) on public.empresa to authenticated;
grant update (nombre, rol, activo) on public.perfiles to authenticated;

revoke execute on all functions in schema public from public, anon, authenticated;
grant execute on function public.disponibilidad_web(timestamptz, timestamptz),
                          public.crear_reserva_web(jsonb),
                          public.pagar_reserva_web(uuid, uuid) to anon, authenticated;
grant execute on function public.mi_rol(), public.tiene_rol(text[]), public.mi_nombre(),
                          public.crear_reserva(jsonb), public.registrar_pago(uuid, int, text, text),
                          public.registrar_entrada(uuid, text, text, text, text, text, text),
                          public.registrar_salida(uuid, text), public.cancelar_reserva(uuid),
                          public.marcar_traslado(uuid, text, text),
                          public.abrir_caja(int), public.egreso_caja(text, int), public.cerrar_caja(int),
                          public.configurar_lugares(int, int), public.auditar(text) to authenticated;

-- ---------- En vivo (Realtime) ----------
do $$
declare t text;
begin
  if exists (select 1 from pg_publication where pubname = 'supabase_realtime') then
    foreach t in array array['perfiles', 'tarifas', 'empresa', 'lugares', 'reservas', 'pagos',
                             'caja_turnos', 'caja_movimientos', 'facturas', 'auditoria'] loop
      if not exists (select 1 from pg_publication_tables where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = t) then
        execute format('alter publication supabase_realtime add table public.%I', t);
      end if;
    end loop;
  end if;
end $$;
