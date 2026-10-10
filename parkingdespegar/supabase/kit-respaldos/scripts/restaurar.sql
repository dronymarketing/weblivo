-- ============================================================
--  PARKING DESPEGAR — Pasos de la restauración (lo llama restaurar.sh)
--  Corre dentro de una sola transacción.
-- ============================================================

set client_min_messages = warning;

-- 1) Proyecto nuevo: se crea la estructura del sistema
select to_regclass('public.reservas') is null as falta_estructura \gset
\if :falta_estructura
  \echo 'La base está vacía: se crea la estructura del sistema.'
  \i :esquema
\endif

-- 2) Se vacía lo que hay ahora
--    Al borrar los usuarios se borran también sus perfiles e identidades.
delete from auth.users;
do $$
begin
  execute (
    select 'truncate ' || string_agg(format('%I.%I', schemaname, tablename), ', ')
           || ' restart identity cascade'
    from pg_tables where schemaname = 'public'
  );
end $$;

-- 3) Se cargan los datos del respaldo
--    (el archivo desactiva los disparadores mientras carga, así no se
--    duplican perfiles ni se anotan cambios que no ocurrieron)
\o /dev/null
\i :datos
\o

-- 4) Control final: si falta lo básico, se cancela todo y la base queda como estaba
do $$
begin
  if (select count(*) from public.tarifas) <> 1
     or (select count(*) from public.empresa) <> 1
     or not exists (select 1 from public.lugares) then
    raise exception 'El respaldo no tiene precios, datos de la empresa o lugares: se cancela y no se cambia nada.';
  end if;
end $$;

-- 5) La API de Supabase vuelve a leer la estructura
notify pgrst, 'reload schema';
\echo 'Datos cargados.'
