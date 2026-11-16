-- ============================================================
--  LA ESTRELLA — Pasos de la restauración (lo llama restaurar.sh)
--  Corre dentro de una sola transacción.
-- ============================================================

set client_min_messages = warning;

-- 1) Proyecto nuevo: se crea la estructura del sistema
select to_regclass('public.negocio') is null as falta_estructura \gset
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
  if (select count(*) from public.negocio) <> 1 then
    raise exception 'El respaldo no tiene los datos del negocio: se cancela y no se cambia nada.';
  end if;
  if not exists (select 1 from public.perfiles where rol = 'admin' and activo) then
    raise exception 'El respaldo no tiene ninguna cuenta de administración activa: se cancela, porque nadie podría entrar.';
  end if;
  if exists (select 1 from public.perfiles p where not exists (select 1 from auth.users u where u.id = p.id)) then
    raise exception 'Hay personas sin cuenta de ingreso en el respaldo: se cancela y no se cambia nada.';
  end if;
end $$;

-- 5) La API de Supabase vuelve a leer la estructura
notify pgrst, 'reload schema';
\echo 'Datos cargados.'
