-- ============================================================
-- PARKING DESPEGAR — Volver a fábrica
-- Se corre en Supabase → SQL Editor → Run.
-- Borra TODO: reservas, pagos, caja, facturas, registro de cambios
-- y TODAS LAS CUENTAS. Vuelve precios, datos para la factura y
-- lugares a los de fábrica, y la numeración a PD-1001 / A-0001.
-- Después, la PRIMERA cuenta que se cree en el panel queda como
-- Administración.
-- ============================================================
update public.tarifas set techado = 490, aire = 390, valet = 450, gracia_horas = 3, minimo_dias = 1 where id = 1;
update public.empresa set razon = 'Parking Despegar', rut = '', direccion = 'Av. Wilson Ferreira Aldunate 5536, Paso de Carrasco', iva = 22 where id = 1;
truncate public.auditoria, public.facturas, public.caja_movimientos, public.caja_turnos,
         public.pagos, public.pagos_web, public.reservas restart identity cascade;
delete from auth.users;
delete from public.lugares;
insert into public.lugares (id, tipo, orden)
  select 'A-' || lpad(n::text, 2, '0'), 'techado', n from generate_series(1, 24) n
  union all
  select 'B-' || lpad(n::text, 2, '0'), 'aire', 100 + n from generate_series(1, 36) n;
alter sequence public.reserva_numero restart with 1001;
alter sequence public.factura_numero restart with 1;
