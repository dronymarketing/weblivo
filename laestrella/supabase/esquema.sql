-- ============================================================
-- LA ESTRELLA — Base de datos (Supabase / Postgres)
--
-- Se pega UNA vez en Supabase → SQL Editor → Run. Se puede volver a correr
-- sin romper nada. Arranca vacía: sin productos, sin ventas, sin usuarios.
--
-- Cómo queda protegida (mismo criterio que Parking Despegar):
--  · Todas las tablas tienen RLS y NINGUNA política: desde el navegador no se
--    lee ni se escribe ninguna tabla directamente.
--  · Todo pasa por funciones del servidor que controlan el rol, calculan los
--    precios y los saldos y anotan en la auditoría. Desde el navegador no se
--    puede inventar un precio ni marcar algo como pagado.
--  · La primera cuenta que se crea es la de administración. Las demás quedan
--    «sin acceso» hasta que administración las aprueba y les da un rol.
--  · Roles: admin (control total) y caja (cobra y maneja su turno).
--  · Cada acción importante queda en `auditoria`, escrita por el servidor.
--  · Montos en CENTAVOS (enteros). Cantidades por peso en kg (3 decimales).
-- ============================================================

create extension if not exists pgcrypto;

-- ---------- Tablas ----------

create table if not exists public.perfiles (
  id      uuid primary key references auth.users (id) on delete cascade,
  nombre  text not null default '' check (char_length(nombre) <= 80),
  email   text not null default '',
  rol     text not null default 'caja' check (rol in ('admin', 'caja')),
  activo  boolean not null default false,
  creado  timestamptz not null default now()
);

create table if not exists public.negocio (
  id        int primary key default 1 check (id = 1),
  nombre    text not null default 'La Estrella',
  rubro     text not null default 'Almacén y autoservicio',
  direccion text not null default '',
  telefono  text not null default '',
  rut       text not null default '',
  regimen   text not null default 'monotributo' check (regimen in ('monotributo', 'iva')),
  pie       text not null default '¡Gracias por tu compra!',
  medios    jsonb not null default '{"efectivo":true,"debito":true,"credito":true,"qr":true}',
  balanza   jsonb not null default '{"prefijo":"20","modo":"peso"}'
);
insert into public.negocio (id) values (1) on conflict (id) do nothing;

create table if not exists public.categorias (
  nombre text primary key check (char_length(nombre) between 2 and 40),
  orden  int not null default 0
);

create table if not exists public.proveedores (
  id       uuid primary key default gen_random_uuid(),
  nombre   text not null check (char_length(nombre) between 2 and 80),
  contacto text not null default '',
  telefono text not null default '',
  email    text not null default '',
  rubro    text not null default '',
  activo   boolean not null default true
);

create table if not exists public.productos (
  id      uuid primary key default gen_random_uuid(),
  codigo  text not null default '' check (codigo = '' or codigo ~ '^[0-9]{8,14}$'),
  plu     text not null default '' check (plu = '' or plu ~ '^[0-9]{5}$'),
  nombre  text not null check (char_length(nombre) between 2 and 28),
  cat     text not null references public.categorias (nombre) on update cascade,
  unidad  text not null default 'u' check (unidad in ('u', 'kg')),
  costo   int  not null default 0 check (costo >= 0),
  precio  int  not null check (precio > 0),
  iva     int  not null default 22 check (iva in (0, 10, 22)),
  minimo  numeric(12, 3) not null default 0 check (minimo >= 0),
  prov    uuid references public.proveedores (id) on delete set null,
  activo  boolean not null default true,
  stock   numeric(12, 3) not null default 0,
  foto    text not null default ''
);
create unique index if not exists productos_codigo on public.productos (codigo) where codigo <> '';
create unique index if not exists productos_plu    on public.productos (plu)    where plu <> '';

create sequence if not exists public.compra_numero start 1;
create table if not exists public.compras (
  id          uuid primary key default gen_random_uuid(),
  num         int not null unique default nextval('public.compra_numero'),
  ts          timestamptz not null default now(),
  prov        uuid not null references public.proveedores (id),
  total       int not null default 0,
  recibida    boolean not null default false,
  recibida_ts timestamptz,
  pagada      boolean not null default false,
  nota        text not null default ''
);
create table if not exists public.compra_items (
  compra   uuid not null references public.compras (id) on delete cascade,
  producto uuid not null references public.productos (id),
  nombre   text not null,
  cant     numeric(12, 3) not null check (cant > 0),
  costo    int not null check (costo >= 0)
);
create index if not exists compra_items_compra on public.compra_items (compra);

create table if not exists public.caja_turnos (
  id        uuid primary key default gen_random_uuid(),
  apertura  timestamptz not null default now(),
  base      int not null check (base between 0 and 100000000),
  turno     text not null check (turno in ('mañana', 'tarde')),
  abrio_id  uuid not null,
  abrio     text not null,
  cierre    timestamptz,
  esperado  int,
  contado   int,
  cerro_id  uuid,
  cerro     text
);
-- Una sola caja abierta a la vez
create unique index if not exists una_caja_abierta on public.caja_turnos ((true)) where cierre is null;

create table if not exists public.caja_movimientos (
  id       uuid primary key default gen_random_uuid(),
  turno    uuid not null references public.caja_turnos (id) on delete cascade,
  ts       timestamptz not null default now(),
  concepto text not null check (char_length(concepto) between 2 and 120),
  monto    int not null,
  usuario  text not null
);

create sequence if not exists public.venta_numero start 1;
create table if not exists public.ventas (
  id          uuid primary key,                       -- lo genera la caja: reenviar no duplica
  num         int not null unique,
  ts          timestamptz not null default now(),
  turno       uuid not null references public.caja_turnos (id),
  cajero_id   uuid not null,
  cajero      text not null,
  total       int not null check (total > 0),
  recibido    int not null default 0,
  vuelto      int not null default 0,
  estado      text not null default 'ok' check (estado in ('ok', 'anulada')),
  anulada_por text,
  motivo      text,
  actualizado timestamptz not null default now()
);
create index if not exists ventas_ts on public.ventas (ts);
create index if not exists ventas_actualizado on public.ventas (actualizado);
create index if not exists ventas_turno on public.ventas (turno);

create table if not exists public.venta_items (
  venta    uuid not null references public.ventas (id) on delete cascade,
  producto uuid not null references public.productos (id),
  nombre   text not null,
  cant     numeric(12, 3) not null check (cant > 0),
  precio   int not null,
  subtotal int not null,
  iva      int not null,
  costo    int not null default 0
);
create index if not exists venta_items_venta on public.venta_items (venta);

create table if not exists public.venta_pagos (
  venta uuid not null references public.ventas (id) on delete cascade,
  medio text not null check (medio in ('efectivo', 'debito', 'credito', 'qr')),
  monto int not null check (monto > 0)
);
create index if not exists venta_pagos_venta on public.venta_pagos (venta);

create table if not exists public.stock_movimientos (
  id       uuid primary key default gen_random_uuid(),
  ts       timestamptz not null default now(),
  producto uuid not null references public.productos (id),
  nombre   text not null,
  cant     numeric(12, 3) not null,
  tipo     text not null check (tipo in ('venta', 'compra', 'ajuste', 'anulacion')),
  ref      text not null default '',
  usuario  text not null
);
create index if not exists stock_mov_ts on public.stock_movimientos (ts desc);

create table if not exists public.asistencias (
  id         uuid primary key default gen_random_uuid(),
  usuario_id uuid not null,
  nombre     text not null,
  entrada    timestamptz not null default now(),
  salida     timestamptz
);
create index if not exists asistencias_usuario on public.asistencias (usuario_id, entrada desc);

create table if not exists public.auditoria (
  id      bigserial primary key,
  ts      timestamptz not null default now(),
  usuario text not null,
  accion  text not null check (char_length(accion) <= 300)
);
create index if not exists auditoria_ts on public.auditoria (ts desc);

-- Códigos de barras que se escanearon en la caja y todavía no están cargados como producto.
-- Administración los ve en una lista y los carga; al cargar el producto, el código sale de la lista.
create table if not exists public.codigos_sin_cargar (
  codigo  text primary key check (codigo ~ '^[0-9]{8,14}$'),
  veces   int not null default 1 check (veces > 0),
  primera timestamptz not null default now(),
  ultima  timestamptz not null default now(),
  por     text not null default ''
);

-- ---------- Seguridad: RLS sin políticas = nadie toca las tablas directo ----------

alter table public.perfiles          enable row level security;
alter table public.negocio           enable row level security;
alter table public.categorias        enable row level security;
alter table public.proveedores       enable row level security;
alter table public.productos         enable row level security;
alter table public.compras           enable row level security;
alter table public.compra_items      enable row level security;
alter table public.caja_turnos       enable row level security;
alter table public.caja_movimientos  enable row level security;
alter table public.ventas            enable row level security;
alter table public.venta_items       enable row level security;
alter table public.venta_pagos       enable row level security;
alter table public.stock_movimientos enable row level security;
alter table public.asistencias       enable row level security;
alter table public.auditoria         enable row level security;
alter table public.codigos_sin_cargar enable row level security;

revoke all on all tables    in schema public from anon, authenticated;
revoke all on all sequences in schema public from anon, authenticated;

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
  select coalesce((select nombre from public.perfiles where id = auth.uid()), 'Sistema')
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
  insert into public.auditoria (usuario, accion) values (public.mi_nombre(), left(p_accion, 300))
$$;

create or replace function public.ms(p_ts timestamptz) returns bigint
language sql immutable as $$ select (extract(epoch from p_ts) * 1000)::bigint $$;

create or replace function public.din(p_c bigint) returns text
language sql immutable as $$
  select '$ ' || case when p_c % 100 = 0 then to_char(p_c / 100, 'FM999G999G999') else to_char(p_c / 100.0, 'FM999G999G990D00') end
$$;

-- ---------- Alta de personas ----------

-- La primera cuenta es la de administración; las demás esperan aprobación
create or replace function public.al_crear_usuario() returns trigger
language plpgsql security definer set search_path = public as $$
declare
  v_hay_admin boolean;
  v_nombre text := left(coalesce(nullif(btrim(new.raw_user_meta_data ->> 'nombre'), ''), split_part(coalesce(new.email, ''), '@', 1)), 80);
begin
  perform pg_advisory_xact_lock(4310);
  select exists (select 1 from public.perfiles where rol = 'admin' and activo) into v_hay_admin;
  insert into public.perfiles (id, nombre, email, rol, activo)
  values (new.id, v_nombre, coalesce(new.email, ''), case when v_hay_admin then 'caja' else 'admin' end, not v_hay_admin)
  on conflict (id) do nothing;
  insert into public.auditoria (usuario, accion)
  values (v_nombre, case when v_hay_admin then 'Pidió acceso al sistema' else 'Creó la cuenta de administración' end);
  return new;
end $$;
drop trigger if exists al_crear_usuario on auth.users;
create trigger al_crear_usuario after insert on auth.users for each row execute function public.al_crear_usuario();

-- ---------- Funciones internas ----------

create or replace function public.turno_nombre(p_ts timestamptz default now()) returns text
language sql stable as $$
  select case when extract(hour from p_ts at time zone 'America/Montevideo') + extract(minute from p_ts at time zone 'America/Montevideo') / 60.0 < 14.5 then 'mañana' else 'tarde' end
$$;

create or replace function public.efectivo_esperado(p_turno uuid) returns int
language sql stable security definer set search_path = public as $$
  select t.base
       + coalesce((select sum(p.monto) from public.ventas v join public.venta_pagos p on p.venta = v.id
                    where v.turno = t.id and v.estado = 'ok' and p.medio = 'efectivo'), 0)::int
       + coalesce((select sum(m.monto) from public.caja_movimientos m where m.turno = t.id), 0)::int
    from public.caja_turnos t where t.id = p_turno
$$;

create or replace function public.mover_stock(p_prod uuid, p_cant numeric, p_tipo text, p_ref text, p_ts timestamptz default now()) returns void
language plpgsql security definer set search_path = public as $$
declare v_nombre text;
begin
  update public.productos set stock = round(stock + p_cant, 3) where id = p_prod returning nombre into v_nombre;
  insert into public.stock_movimientos (ts, producto, nombre, cant, tipo, ref, usuario) values (p_ts, p_prod, v_nombre, p_cant, p_tipo, p_ref, public.mi_nombre());
end $$;

-- Una venta con la forma que usa la pantalla
create or replace function public.venta_json(p_id uuid, p_con_costo boolean default true) returns jsonb
language sql stable security definer set search_path = public as $$
  select jsonb_build_object(
    'id', v.id, 'num', v.num, 'ts', public.ms(v.ts), 'turno', v.turno, 'cajeroId', v.cajero_id, 'cajero', v.cajero,
    'total', v.total, 'recibido', v.recibido, 'vuelto', v.vuelto, 'estado', v.estado, 'anuladaPor', v.anulada_por, 'motivo', v.motivo, 'sync', true, 'act', public.ms(v.actualizado),
    'items', coalesce((select jsonb_agg(jsonb_build_object('p', i.producto, 'n', i.nombre, 'c', i.cant, 'u', i.precio, 's', i.subtotal, 'iva', i.iva, 'k', case when p_con_costo then i.costo else 0 end) order by i.nombre)
                         from public.venta_items i where i.venta = v.id), '[]'::jsonb),
    'pagos', coalesce((select jsonb_agg(jsonb_build_object('m', g.medio, 'monto', g.monto)) from public.venta_pagos g where g.venta = v.id), '[]'::jsonb))
  from public.ventas v where v.id = p_id
$$;

-- ============================================================
-- LECTURA (todo por funciones: según el rol, cada uno ve lo suyo)
-- ============================================================

create or replace function public.mi_perfil() returns jsonb
language sql stable security definer set search_path = public as $$
  select jsonb_build_object('id', id, 'nombre', nombre, 'email', email, 'rol', rol, 'activo', activo) from public.perfiles where id = auth.uid()
$$;

-- Catálogo, equipo, compras, caja… (liviano). La caja nunca recibe los costos.
create or replace function public.snap_base() returns jsonb
language plpgsql stable security definer set search_path = public as $$
declare
  v_rol text := public.mi_rol();
  v_admin boolean := coalesce(v_rol = 'admin', false);
  v_desde timestamptz := now() - interval '35 days';
  v_abierto uuid;
  r jsonb;
begin
  if v_rol is null then raise exception 'Tu cuenta todavía no tiene acceso. Pedile a administración que la apruebe.' using errcode = '42501'; end if;
  select id into v_abierto from public.caja_turnos where cierre is null;
  r := jsonb_build_object(
    'rol', v_rol,
    'negocio', (select to_jsonb(n) - 'id' || jsonb_build_object('facturaElectronica', false) from public.negocio n where id = 1),
    'categorias', coalesce((select jsonb_agg(nombre order by orden, nombre) from public.categorias), '[]'::jsonb),
    'productos', coalesce((select jsonb_agg(jsonb_build_object('id', id, 'codigo', codigo, 'plu', plu, 'nombre', nombre, 'cat', cat, 'unidad', unidad,
                    'costo', case when v_admin then costo else 0 end, 'precio', precio, 'iva', iva, 'minimo', minimo, 'prov', prov, 'activo', activo, 'stock', stock, 'foto', foto) order by cat, nombre)
                  from public.productos), '[]'::jsonb),
    'contador', jsonb_build_object('venta', coalesce((select max(num) from public.ventas), 0), 'compra', coalesce((select max(num) from public.compras), 0)),
    'abierto', v_abierto);
  -- Personas: administración ve a todos; caja, solo su propia cuenta
  r := r || jsonb_build_object('usuarios', coalesce((select jsonb_agg(jsonb_build_object('id', id, 'nombre', nombre, 'email', email, 'rol', rol, 'activo', activo) order by creado)
                  from public.perfiles where v_admin or id = auth.uid()), '[]'::jsonb));
  -- Turnos y retiros: administración, los últimos 35 días; caja, solo el turno abierto
  r := r || jsonb_build_object('turnos', coalesce((select jsonb_agg(jsonb_build_object('id', id, 'apertura', public.ms(apertura), 'base', base, 'turno', turno, 'abrioId', abrio_id, 'abrio', abrio,
                    'cierre', public.ms(cierre), 'esperado', esperado, 'contado', contado, 'cerroId', cerro_id, 'cerro', cerro) order by apertura)
                  from public.caja_turnos where (v_admin and apertura >= v_desde) or id = v_abierto), '[]'::jsonb));
  r := r || jsonb_build_object('movCaja', coalesce((select jsonb_agg(jsonb_build_object('id', m.id, 'turno', m.turno, 'ts', public.ms(m.ts), 'concepto', m.concepto, 'monto', m.monto, 'usuario', m.usuario) order by m.ts)
                  from public.caja_movimientos m join public.caja_turnos t on t.id = m.turno where (v_admin and t.apertura >= v_desde) or t.id = v_abierto), '[]'::jsonb));
  -- Horarios: administración, todos; caja, los suyos
  r := r || jsonb_build_object('asistencias', coalesce((select jsonb_agg(jsonb_build_object('id', id, 'usuarioId', usuario_id, 'nombre', nombre, 'entrada', public.ms(entrada), 'salida', public.ms(salida)) order by entrada)
                  from public.asistencias where entrada >= v_desde and (v_admin or usuario_id = auth.uid())), '[]'::jsonb));
  if v_admin then
    r := r || jsonb_build_object(
      'proveedores', coalesce((select jsonb_agg(to_jsonb(p) order by nombre) from public.proveedores p), '[]'::jsonb),
      'compras', coalesce((select jsonb_agg(jsonb_build_object('id', c.id, 'num', c.num, 'ts', public.ms(c.ts), 'prov', c.prov, 'total', c.total, 'recibida', c.recibida, 'recibidaTs', public.ms(c.recibida_ts), 'pagada', c.pagada, 'nota', c.nota,
                    'items', coalesce((select jsonb_agg(jsonb_build_object('p', i.producto, 'n', i.nombre, 'c', i.cant, 'k', i.costo)) from public.compra_items i where i.compra = c.id), '[]'::jsonb)) order by c.ts)
                  from public.compras c where c.ts >= now() - interval '120 days' or not c.recibida or not c.pagada), '[]'::jsonb),
      'movStock', coalesce((select jsonb_agg(jsonb_build_object('id', id, 'ts', public.ms(ts), 'p', producto, 'n', nombre, 'cant', cant, 'tipo', tipo, 'ref', ref, 'usuario', usuario) order by ts)
                  from (select * from public.stock_movimientos order by ts desc limit 400) s), '[]'::jsonb),
      'auditoria', coalesce((select jsonb_agg(jsonb_build_object('id', id, 'ts', public.ms(ts), 'usuario', usuario, 'accion', accion) order by ts)
                  from (select * from public.auditoria order by ts desc limit 400) a), '[]'::jsonb),
      'mensual', coalesce((select jsonb_agg(jsonb_build_object('ts', public.ms(m.mes), 'total', m.total, 'margen', m.margen, 'tickets', m.tickets) order by m.mes) from (
                    select date_trunc('month', v.ts at time zone 'America/Montevideo') at time zone 'America/Montevideo' as mes, sum(v.total)::bigint as total, count(*) as tickets,
                           sum(v.total - coalesce((select sum(round(i.costo * i.cant)) from public.venta_items i where i.venta = v.id), 0))::bigint as margen
                      from public.ventas v where v.estado = 'ok'
                       and v.ts >= date_trunc('month', now() at time zone 'America/Montevideo') at time zone 'America/Montevideo' - interval '12 months'
                       and v.ts <  date_trunc('month', now() at time zone 'America/Montevideo') at time zone 'America/Montevideo'
                     group by 1) m), '[]'::jsonb),
      'sinCargar', coalesce((select jsonb_agg(jsonb_build_object('codigo', codigo, 'veces', veces, 'primera', public.ms(primera), 'ultima', public.ms(ultima), 'por', por) order by ultima desc)
                  from public.codigos_sin_cargar), '[]'::jsonb));
  else
    r := r || jsonb_build_object('proveedores', '[]'::jsonb, 'compras', '[]'::jsonb, 'movStock', '[]'::jsonb, 'auditoria', '[]'::jsonb, 'mensual', '[]'::jsonb, 'sinCargar', '[]'::jsonb);
  end if;
  return r;
end $$;

-- Ventas: administración, los últimos días (o solo lo que cambió desde la última vez);
-- caja, solo las del turno abierto, sin costos
create or replace function public.snap_ventas(p_desde bigint default null, p_dias int default 35) returns jsonb
language plpgsql stable security definer set search_path = public as $$
declare
  v_rol text := public.mi_rol();
  v_admin boolean := coalesce(v_rol = 'admin', false);
  v_ini timestamptz := now() - make_interval(days => least(greatest(p_dias, 1), 120));
  v_abierto uuid;
begin
  if v_rol is null then raise exception 'No tenés permiso para hacer esto.' using errcode = '42501'; end if;
  select id into v_abierto from public.caja_turnos where cierre is null;
  return coalesce((select jsonb_agg(public.venta_json(v.id, v_admin) order by v.num)
                     from public.ventas v
                    where (case when p_desde is null then true else public.ms(v.actualizado) > p_desde end)
                      and ((v_admin and v.ts >= v_ini) or (not v_admin and v.turno = v_abierto))), '[]'::jsonb);
end $$;

-- ============================================================
-- ESCRITURA (cada función controla el rol y anota en la auditoría)
-- ============================================================

-- ---------- Caja ----------

create or replace function public.abrir_caja(p_base int) returns jsonb
language plpgsql security definer set search_path = public as $$
declare v_t public.caja_turnos; v_u public.perfiles;
begin
  perform public.exigir_rol('admin', 'caja');
  if exists (select 1 from public.caja_turnos where cierre is null) then raise exception 'Ya hay una caja abierta: primero cerrá la del turno anterior.' using errcode = 'P0001'; end if;
  if p_base is null or p_base < 0 then raise exception 'Escribí con cuánto efectivo se abre.' using errcode = 'P0001'; end if;
  select * into v_u from public.perfiles where id = auth.uid();
  insert into public.caja_turnos (base, turno, abrio_id, abrio) values (p_base, public.turno_nombre(), v_u.id, v_u.nombre) returning * into v_t;
  perform public.anotar('Abrió la caja del turno ' || v_t.turno || ' con ' || public.din(p_base));
  return jsonb_build_object('id', v_t.id, 'apertura', public.ms(v_t.apertura), 'base', v_t.base, 'turno', v_t.turno, 'abrioId', v_t.abrio_id, 'abrio', v_t.abrio, 'cierre', null);
end $$;

-- p_id y p_ts permiten reenviar un retiro hecho sin conexión sin duplicarlo
create or replace function public.egreso_caja(p_concepto text, p_monto int, p_id uuid default null, p_ts bigint default null) returns jsonb
language plpgsql security definer set search_path = public as $$
declare v_t public.caja_turnos; v_id uuid := coalesce(p_id, gen_random_uuid()); v_disp int;
begin
  perform public.exigir_rol('admin', 'caja');
  if exists (select 1 from public.caja_movimientos where id = v_id) then return jsonb_build_object('id', v_id, 'repetido', true); end if;
  select * into v_t from public.caja_turnos where cierre is null;
  if not found then raise exception 'No hay una caja abierta.' using errcode = 'P0001'; end if;
  if char_length(btrim(coalesce(p_concepto, ''))) < 2 or p_monto is null or p_monto < 1 then raise exception 'Completá el concepto y el monto.' using errcode = 'P0001'; end if;
  v_disp := public.efectivo_esperado(v_t.id);
  if p_monto > v_disp then raise exception 'No hay tanto efectivo en la caja (hay %).', public.din(v_disp) using errcode = 'P0001'; end if;
  insert into public.caja_movimientos (id, turno, ts, concepto, monto, usuario)
  values (v_id, v_t.id, coalesce(to_timestamp(p_ts / 1000.0), now()), btrim(p_concepto), -p_monto, public.mi_nombre());
  perform public.anotar('Retiró ' || public.din(p_monto) || ' de la caja: ' || btrim(p_concepto));
  return jsonb_build_object('id', v_id);
end $$;

create or replace function public.cerrar_caja(p_contado int) returns jsonb
language plpgsql security definer set search_path = public as $$
declare v_t public.caja_turnos; v_esp int; v_u public.perfiles;
begin
  perform public.exigir_rol('admin', 'caja');
  select * into v_t from public.caja_turnos where cierre is null for update;
  if not found then raise exception 'No hay una caja abierta.' using errcode = 'P0001'; end if;
  if p_contado is null or p_contado < 0 then raise exception 'Escribí cuánto efectivo contaste.' using errcode = 'P0001'; end if;
  select * into v_u from public.perfiles where id = auth.uid();
  v_esp := public.efectivo_esperado(v_t.id);
  update public.caja_turnos set cierre = now(), esperado = v_esp, contado = p_contado, cerro_id = v_u.id, cerro = v_u.nombre where id = v_t.id;
  perform public.anotar('Cerró la caja del turno ' || v_t.turno || ': esperado ' || public.din(v_esp) || ', contado ' || public.din(p_contado)
    || case when p_contado <> v_esp then ' (diferencia ' || case when p_contado > v_esp then '+' else '-' end || public.din(abs(p_contado - v_esp)) || ')' else '' end);
  return jsonb_build_object('esperado', v_esp, 'contado', p_contado, 'diferencia', p_contado - v_esp);
end $$;

-- ---------- Ventas ----------

-- p = {id, num, ts (ms), turno, items:[{p, c}], pagos:[{m, monto}], recibido}
-- El precio sale de la base, nunca de la pantalla. Reenviar la misma venta devuelve la guardada.
create or replace function public.crear_venta(p jsonb) returns jsonb
language plpgsql security definer set search_path = public as $$
declare
  v_id uuid := (p ->> 'id')::uuid;
  v_u public.perfiles; v_t public.caja_turnos; v_neg public.negocio;
  v_it jsonb; v_prod public.productos; v_c numeric; v_s int;
  v_total int := 0; v_pagado int := 0; v_ef int := 0; v_recibido int; v_vuelto int; v_num int; v_ts timestamptz; v_pg jsonb;
begin
  perform public.exigir_rol('admin', 'caja');
  if exists (select 1 from public.ventas where id = v_id) then return public.venta_json(v_id); end if;
  select * into v_u from public.perfiles where id = auth.uid();
  select * into v_t from public.caja_turnos where id = (p ->> 'turno')::uuid;
  if not found then raise exception 'Abrí la caja antes de vender.' using errcode = 'P0001'; end if;
  select * into v_neg from public.negocio where id = 1;
  if jsonb_array_length(coalesce(p -> 'items', '[]'::jsonb)) = 0 then raise exception 'El ticket está vacío.' using errcode = 'P0001'; end if;
  v_ts := least(coalesce(to_timestamp(nullif(p ->> 'ts', '')::numeric / 1000.0), now()), now());

  -- 1) total con los precios de la base
  for v_it in select * from jsonb_array_elements(p -> 'items') loop
    select * into v_prod from public.productos where id = (v_it ->> 'p')::uuid;
    if not found or not v_prod.activo then raise exception 'Un producto del ticket ya no está disponible.' using errcode = 'P0001'; end if;
    v_c := case when v_prod.unidad = 'kg' then round((v_it ->> 'c')::numeric, 3) else round((v_it ->> 'c')::numeric) end;
    if not (v_c > 0) then raise exception 'Cantidad inválida en %.', v_prod.nombre using errcode = 'P0001'; end if;
    v_total := v_total + round(v_prod.precio * v_c)::int;
  end loop;

  -- 2) cobro: los medios habilitados y que cierre justo
  for v_pg in select * from jsonb_array_elements(coalesce(p -> 'pagos', '[]'::jsonb)) loop
    if coalesce((v_neg.medios ->> (v_pg ->> 'm'))::boolean, false) is not true then raise exception 'Medio de pago no habilitado.' using errcode = 'P0001'; end if;
    v_pagado := v_pagado + (v_pg ->> 'monto')::int;
    if (v_pg ->> 'm') = 'efectivo' then v_ef := v_ef + (v_pg ->> 'monto')::int; end if;
  end loop;
  if v_pagado < v_total then raise exception 'Falta cobrar %.', public.din(v_total - v_pagado) using errcode = 'P0001'; end if;
  if v_pagado > v_total then raise exception 'El cobro no coincide con el total.' using errcode = 'P0001'; end if;
  v_recibido := case when v_ef > 0 then coalesce((p ->> 'recibido')::int, v_ef) else 0 end;
  if v_ef > 0 and v_recibido < v_ef then raise exception 'El efectivo recibido es menor al cobrado.' using errcode = 'P0001'; end if;
  v_vuelto := case when v_ef > 0 then v_recibido - v_ef else 0 end;

  -- 3) número de ticket: el de la caja si está libre; si no, el siguiente
  v_num := coalesce(nullif((p ->> 'num')::int, 0), nextval('public.venta_numero')::int);
  if exists (select 1 from public.ventas where num = v_num) then v_num := (select max(num) + 1 from public.ventas); end if;

  insert into public.ventas (id, num, ts, turno, cajero_id, cajero, total, recibido, vuelto)
  values (v_id, v_num, v_ts, v_t.id, v_u.id, v_u.nombre, v_total, v_recibido, v_vuelto);

  for v_it in select * from jsonb_array_elements(p -> 'items') loop
    select * into v_prod from public.productos where id = (v_it ->> 'p')::uuid;
    v_c := case when v_prod.unidad = 'kg' then round((v_it ->> 'c')::numeric, 3) else round((v_it ->> 'c')::numeric) end;
    v_s := round(v_prod.precio * v_c)::int;
    insert into public.venta_items (venta, producto, nombre, cant, precio, subtotal, iva, costo) values (v_id, v_prod.id, v_prod.nombre, v_c, v_prod.precio, v_s, v_prod.iva, v_prod.costo);
    perform public.mover_stock(v_prod.id, -v_c, 'venta', 'Ticket ' || lpad(v_num::text, 6, '0'), v_ts);
  end loop;
  for v_pg in select * from jsonb_array_elements(p -> 'pagos') loop
    insert into public.venta_pagos (venta, medio, monto) values (v_id, v_pg ->> 'm', (v_pg ->> 'monto')::int);
  end loop;
  return public.venta_json(v_id);
end $$;

create or replace function public.anular_venta(p_id uuid, p_motivo text) returns void
language plpgsql security definer set search_path = public as $$
declare v public.ventas; i record;
begin
  perform public.exigir_rol('admin');
  select * into v from public.ventas where id = p_id for update;
  if not found or v.estado <> 'ok' then raise exception 'Esta venta ya está anulada.' using errcode = 'P0001'; end if;
  if char_length(btrim(coalesce(p_motivo, ''))) < 2 then raise exception 'Escribí el motivo de la anulación.' using errcode = 'P0001'; end if;
  update public.ventas set estado = 'anulada', anulada_por = public.mi_nombre(), motivo = btrim(p_motivo), actualizado = now() where id = p_id;
  for i in select * from public.venta_items where venta = p_id loop
    perform public.mover_stock(i.producto, i.cant, 'anulacion', 'Anuló ticket ' || lpad(v.num::text, 6, '0'));
  end loop;
  perform public.anotar('Anuló el ticket ' || lpad(v.num::text, 6, '0') || ' (' || public.din(v.total) || '): ' || btrim(p_motivo));
end $$;

-- ---------- Productos y stock (solo administración) ----------

-- p = {id?, nombre, cat, unidad, codigo, plu, costo, precio, iva, minimo, prov, stockInicial, foto}
create or replace function public.guardar_producto(p jsonb) returns jsonb
language plpgsql security definer set search_path = public as $$
declare
  v_id uuid := nullif(p ->> 'id', '')::uuid; v_old public.productos; v_nombre text := btrim(coalesce(p ->> 'nombre', ''));
  v_unidad text := coalesce(p ->> 'unidad', 'u'); v_cod text := btrim(coalesce(p ->> 'codigo', '')); v_plu text := btrim(coalesce(p ->> 'plu', ''));
  v_precio int := round((p ->> 'precio')::numeric); v_costo int := round(coalesce((p ->> 'costo')::numeric, 0)); v_prov uuid := nullif(p ->> 'prov', '')::uuid;
  v_dup text;
begin
  perform public.exigir_rol('admin');
  if char_length(v_nombre) < 2 then raise exception 'Escribí el nombre del producto.' using errcode = 'P0001'; end if;
  if char_length(v_nombre) > 28 then raise exception 'El nombre no puede pasar de 28 letras (para que entre en el ticket).' using errcode = 'P0001'; end if;
  if not (v_precio > 0) then raise exception 'El precio tiene que ser mayor que cero.' using errcode = 'P0001'; end if;
  if v_unidad = 'kg' then v_cod := ''; if v_plu !~ '^[0-9]{5}$' then raise exception 'El PLU de balanza son 5 números.' using errcode = 'P0001'; end if;
  else v_plu := ''; if v_cod <> '' and v_cod !~ '^[0-9]{8,14}$' then raise exception 'El código de barras tiene que tener entre 8 y 14 números.' using errcode = 'P0001'; end if; end if;
  select nombre into v_dup from public.productos where v_cod <> '' and codigo = v_cod and id is distinct from v_id limit 1;
  if v_dup is not null then raise exception 'Ese código ya lo tiene "%".', v_dup using errcode = 'P0001'; end if;
  select nombre into v_dup from public.productos where v_plu <> '' and plu = v_plu and id is distinct from v_id limit 1;
  if v_dup is not null then raise exception 'Ese PLU ya lo tiene "%".', v_dup using errcode = 'P0001'; end if;
  insert into public.categorias (nombre, orden) select p ->> 'cat', coalesce((select max(orden) + 1 from public.categorias), 0) where not exists (select 1 from public.categorias where nombre = p ->> 'cat');

  if v_id is not null then
    select * into v_old from public.productos where id = v_id for update;
    if not found then raise exception 'Producto no encontrado.' using errcode = 'P0001'; end if;
    update public.productos set nombre = v_nombre, cat = p ->> 'cat', unidad = v_unidad, codigo = v_cod, plu = v_plu, costo = v_costo, precio = v_precio,
           iva = coalesce((p ->> 'iva')::int, iva), minimo = coalesce((p ->> 'minimo')::numeric, 0), prov = v_prov, foto = coalesce(p ->> 'foto', foto) where id = v_id;
    perform public.anotar(case when v_old.precio <> v_precio then 'Cambió el precio de ' || v_old.nombre || ': ' || public.din(v_old.precio) || ' → ' || public.din(v_precio) else 'Editó el producto ' || v_old.nombre end);
  else
    insert into public.productos (nombre, cat, unidad, codigo, plu, costo, precio, iva, minimo, prov, stock, foto)
    values (v_nombre, p ->> 'cat', v_unidad, v_cod, v_plu, v_costo, v_precio, coalesce((p ->> 'iva')::int, 22), coalesce((p ->> 'minimo')::numeric, 0), v_prov, coalesce((p ->> 'stockInicial')::numeric, 0), coalesce(p ->> 'foto', ''))
    returning id into v_id;
    perform public.anotar('Creó el producto ' || v_nombre);
  end if;
  if v_cod <> '' then delete from public.codigos_sin_cargar where codigo = v_cod; end if;
  return jsonb_build_object('id', v_id);
end $$;

-- La caja (o administración) escaneó un código que no está cargado: se anota para que administración lo cargue.
create or replace function public.registrar_codigo(p_codigo text, p_ts bigint default null) returns void
language plpgsql security definer set search_path = public as $$
declare
  v_cod text := btrim(coalesce(p_codigo, ''));
  v_ts timestamptz := case when p_ts is null then now() else least(to_timestamp(p_ts / 1000.0), now()) end;
begin
  perform public.exigir_rol('admin', 'caja');
  if v_cod !~ '^[0-9]{8,14}$' then raise exception 'Código de barras inválido.' using errcode = 'P0001'; end if;
  if exists (select 1 from public.productos where codigo = v_cod) then return; end if;
  if (select count(*) from public.codigos_sin_cargar) >= 500 and not exists (select 1 from public.codigos_sin_cargar where codigo = v_cod) then return; end if;
  insert into public.codigos_sin_cargar (codigo, veces, primera, ultima, por) values (v_cod, 1, v_ts, v_ts, public.mi_nombre())
  on conflict (codigo) do update set veces = public.codigos_sin_cargar.veces + 1, ultima = greatest(public.codigos_sin_cargar.ultima, excluded.ultima), por = excluded.por;
end $$;

create or replace function public.descartar_codigo(p_codigo text) returns void
language plpgsql security definer set search_path = public as $$
begin
  perform public.exigir_rol('admin');
  delete from public.codigos_sin_cargar where codigo = btrim(coalesce(p_codigo, ''));
end $$;

create or replace function public.activar_producto(p_id uuid, p_activo boolean) returns void
language plpgsql security definer set search_path = public as $$
declare v_n text;
begin
  perform public.exigir_rol('admin');
  update public.productos set activo = p_activo where id = p_id returning nombre into v_n;
  if v_n is null then raise exception 'Producto no encontrado.' using errcode = 'P0001'; end if;
  perform public.anotar((case when p_activo then 'Reactivó ' else 'Dio de baja ' end) || v_n);
end $$;

create or replace function public.ajustar_stock(p_id uuid, p_delta numeric, p_motivo text) returns void
language plpgsql security definer set search_path = public as $$
declare v_n text;
begin
  perform public.exigir_rol('admin');
  select nombre into v_n from public.productos where id = p_id;
  if v_n is null then raise exception 'Producto no encontrado.' using errcode = 'P0001'; end if;
  if p_delta is null or p_delta = 0 then raise exception 'Escribí cuánto sumar o restar.' using errcode = 'P0001'; end if;
  if char_length(btrim(coalesce(p_motivo, ''))) < 2 then raise exception 'Escribí el motivo.' using errcode = 'P0001'; end if;
  perform public.mover_stock(p_id, p_delta, 'ajuste', btrim(p_motivo));
  perform public.anotar('Ajustó el stock de ' || v_n || ' (' || case when p_delta > 0 then '+' else '' end || trim(trailing '.' from trim(trailing '0' from p_delta::text)) || '): ' || btrim(p_motivo));
end $$;

-- ---------- Proveedores y compras (solo administración) ----------

create or replace function public.guardar_proveedor(p jsonb) returns jsonb
language plpgsql security definer set search_path = public as $$
declare v_id uuid := nullif(p ->> 'id', '')::uuid; v_n text := btrim(coalesce(p ->> 'nombre', ''));
begin
  perform public.exigir_rol('admin');
  if char_length(v_n) < 2 then raise exception 'Escribí el nombre del proveedor.' using errcode = 'P0001'; end if;
  if v_id is null then
    insert into public.proveedores (nombre, contacto, telefono, email, rubro) values (v_n, coalesce(p ->> 'contacto', ''), coalesce(p ->> 'telefono', ''), coalesce(p ->> 'email', ''), coalesce(p ->> 'rubro', '')) returning id into v_id;
    perform public.anotar('Creó el proveedor ' || v_n);
  else
    update public.proveedores set nombre = v_n, contacto = coalesce(p ->> 'contacto', ''), telefono = coalesce(p ->> 'telefono', ''), email = coalesce(p ->> 'email', ''), rubro = coalesce(p ->> 'rubro', '') where id = v_id;
    perform public.anotar('Editó el proveedor ' || v_n);
  end if;
  return jsonb_build_object('id', v_id);
end $$;

-- p = {prov, nota, items:[{p, c, k}]}
create or replace function public.guardar_compra(p jsonb) returns jsonb
language plpgsql security definer set search_path = public as $$
declare v_id uuid; v_it jsonb; v_prod public.productos; v_total int := 0; v_c numeric; v_k int; v_num int; v_prov text;
begin
  perform public.exigir_rol('admin');
  select nombre into v_prov from public.proveedores where id = nullif(p ->> 'prov', '')::uuid;
  if v_prov is null then raise exception 'Elegí el proveedor.' using errcode = 'P0001'; end if;
  if jsonb_array_length(coalesce(p -> 'items', '[]'::jsonb)) = 0 then raise exception 'Agregá al menos un producto.' using errcode = 'P0001'; end if;
  insert into public.compras (prov, nota) values ((p ->> 'prov')::uuid, coalesce(p ->> 'nota', '')) returning id, num into v_id, v_num;
  for v_it in select * from jsonb_array_elements(p -> 'items') loop
    select * into v_prod from public.productos where id = (v_it ->> 'p')::uuid;
    v_c := (v_it ->> 'c')::numeric; v_k := round(coalesce((v_it ->> 'k')::numeric, 0));
    if v_prod.id is null or not (v_c > 0) then continue; end if;
    insert into public.compra_items (compra, producto, nombre, cant, costo) values (v_id, v_prod.id, v_prod.nombre, v_c, v_k);
    v_total := v_total + round(v_c * v_k)::int;
  end loop;
  if v_total = 0 and not exists (select 1 from public.compra_items where compra = v_id) then raise exception 'Agregá al menos un producto.' using errcode = 'P0001'; end if;
  update public.compras set total = v_total where id = v_id;
  perform public.anotar('Registró la compra C-' || lpad(v_num::text, 4, '0') || ' a ' || v_prov || ' por ' || public.din(v_total));
  return jsonb_build_object('id', v_id, 'num', v_num);
end $$;

create or replace function public.recibir_compra(p_id uuid) returns void
language plpgsql security definer set search_path = public as $$
declare v public.compras; i record;
begin
  perform public.exigir_rol('admin');
  select * into v from public.compras where id = p_id for update;
  if not found or v.recibida then raise exception 'Esta compra ya fue recibida.' using errcode = 'P0001'; end if;
  for i in select * from public.compra_items where compra = p_id loop
    perform public.mover_stock(i.producto, i.cant, 'compra', 'Compra C-' || lpad(v.num::text, 4, '0'));
    if i.costo > 0 then update public.productos set costo = i.costo where id = i.producto; end if;
  end loop;
  update public.compras set recibida = true, recibida_ts = now() where id = p_id;
  perform public.anotar('Recibió la compra C-' || lpad(v.num::text, 4, '0') || ' (el stock subió)');
end $$;

create or replace function public.pagar_compra(p_id uuid) returns void
language plpgsql security definer set search_path = public as $$
declare v_num int;
begin
  perform public.exigir_rol('admin');
  update public.compras set pagada = true where id = p_id returning num into v_num;
  if v_num is null then raise exception 'Compra no encontrada.' using errcode = 'P0001'; end if;
  perform public.anotar('Marcó como paga la compra C-' || lpad(v_num::text, 4, '0'));
end $$;

-- ---------- Equipo y horarios ----------

-- Las personas se crean solas al registrarse; administración las aprueba y les da un rol
create or replace function public.guardar_usuario(p jsonb) returns void
language plpgsql security definer set search_path = public as $$
declare v_id uuid := (p ->> 'id')::uuid; v_old public.perfiles; v_rol text := coalesce(p ->> 'rol', 'caja'); v_activo boolean := coalesce((p ->> 'activo')::boolean, false); v_n text := btrim(coalesce(p ->> 'nombre', ''));
begin
  perform public.exigir_rol('admin');
  select * into v_old from public.perfiles where id = v_id for update;
  if not found then raise exception 'Persona no encontrada.' using errcode = 'P0001'; end if;
  if char_length(v_n) < 2 then raise exception 'Escribí el nombre.' using errcode = 'P0001'; end if;
  if v_rol not in ('admin', 'caja') then raise exception 'Rol inválido.' using errcode = 'P0001'; end if;
  if v_id = auth.uid() and (v_rol <> v_old.rol or v_activo <> v_old.activo) then raise exception 'No podés cambiar tu propio rol ni desactivarte.' using errcode = '42501'; end if;
  if v_old.rol = 'admin' and v_old.activo and (v_rol <> 'admin' or not v_activo) and (select count(*) from public.perfiles where rol = 'admin' and activo) < 2 then
    raise exception 'Tiene que quedar al menos una cuenta de administración activa.' using errcode = 'P0001'; end if;
  update public.perfiles set nombre = v_n, rol = v_rol, activo = v_activo where id = v_id;
  perform public.anotar(case when v_activo and not v_old.activo then 'Aprobó a ' when not v_activo and v_old.activo then 'Desactivó a ' when v_rol <> v_old.rol then 'Cambió el rol de ' else 'Editó a ' end || v_n || ' (' || v_rol || ')');
end $$;

create or replace function public.marcar_asistencia() returns jsonb
language plpgsql security definer set search_path = public as $$
declare v_a public.asistencias; v_u public.perfiles;
begin
  perform public.exigir_rol('admin', 'caja');
  select * into v_u from public.perfiles where id = auth.uid();
  select * into v_a from public.asistencias where usuario_id = v_u.id and salida is null order by entrada desc limit 1 for update;
  if found then
    update public.asistencias set salida = now() where id = v_a.id;
    perform public.anotar('Terminó la jornada');
    return jsonb_build_object('estado', 'salida', 'entrada', public.ms(v_a.entrada), 'salida', public.ms(now()));
  end if;
  insert into public.asistencias (usuario_id, nombre) values (v_u.id, v_u.nombre) returning * into v_a;
  perform public.anotar('Empezó la jornada');
  return jsonb_build_object('estado', 'entrada', 'entrada', public.ms(v_a.entrada), 'salida', null);
end $$;

-- ---------- Ajustes del negocio ----------

create or replace function public.guardar_negocio(p jsonb) returns void
language plpgsql security definer set search_path = public as $$
begin
  perform public.exigir_rol('admin');
  update public.negocio set
    nombre = left(coalesce(nullif(btrim(p ->> 'nombre'), ''), nombre), 120), rubro = left(coalesce(p ->> 'rubro', rubro), 120),
    direccion = left(coalesce(p ->> 'direccion', direccion), 120), telefono = left(coalesce(p ->> 'telefono', telefono), 120), rut = left(coalesce(p ->> 'rut', rut), 120),
    pie = left(coalesce(p ->> 'pie', pie), 120), regimen = case when p ->> 'regimen' in ('monotributo', 'iva') then p ->> 'regimen' else regimen end,
    medios = coalesce(p -> 'medios', medios), balanza = coalesce(p -> 'balanza', balanza)
  where id = 1;
  perform public.anotar('Cambió los ajustes del negocio');
end $$;

-- ---------- Permisos: solo personas con sesión, y solo las funciones públicas ----------

revoke execute on all functions in schema public from public, anon, authenticated;
grant execute on function
  public.mi_perfil(), public.snap_base(), public.snap_ventas(bigint, int),
  public.abrir_caja(int), public.egreso_caja(text, int, uuid, bigint), public.cerrar_caja(int),
  public.crear_venta(jsonb), public.anular_venta(uuid, text),
  public.guardar_producto(jsonb), public.activar_producto(uuid, boolean), public.ajustar_stock(uuid, numeric, text),
  public.registrar_codigo(text, bigint), public.descartar_codigo(text),
  public.guardar_proveedor(jsonb), public.guardar_compra(jsonb), public.recibir_compra(uuid), public.pagar_compra(uuid),
  public.guardar_usuario(jsonb), public.marcar_asistencia(), public.guardar_negocio(jsonb)
  to authenticated;

-- Latido: una consulta mínima y pública (solo devuelve la hora) que usa la tarea de respaldos
-- para que Supabase vea actividad y no pause el proyecto. No lee ningún dato del negocio.
create or replace function public.latido() returns timestamptz
language sql stable as $$ select now() $$;
grant execute on function public.latido() to anon, authenticated;
