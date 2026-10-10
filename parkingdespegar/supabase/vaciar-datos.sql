-- ============================================================
-- PARKING DESPEGAR — Borrar los datos de prueba
-- Se corre en Supabase → SQL Editor → Run cuando se quiera empezar
-- de cero (por ejemplo, antes de mostrárselo a la clienta).
-- Borra reservas, pagos, caja, facturas y el registro de cambios,
-- y reinicia los números (PD-1001, factura A-0001).
-- NO borra usuarios, tarifas, datos para la factura ni lugares.
-- ============================================================
truncate public.auditoria, public.facturas, public.caja_movimientos, public.caja_turnos,
         public.pagos, public.pagos_web, public.reservas restart identity cascade;
alter sequence public.reserva_numero restart with 1001;
alter sequence public.factura_numero restart with 1;
