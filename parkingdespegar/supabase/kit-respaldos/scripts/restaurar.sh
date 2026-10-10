#!/usr/bin/env bash
# ============================================================
#  PARKING DESPEGAR — Volver la base al estado de un respaldo
#  Reemplaza reservas, pagos, caja, facturas, registro, precios,
#  lugares, personal y cuentas por los de la carpeta elegida.
#  Todo pasa en una sola transacción: si algo falla, no cambia nada.
#  Si la base está vacía (proyecto nuevo), primero crea la estructura
#  con el esquema.sql guardado en esa misma carpeta.
#
#  Uso:  SUPABASE_DB_URL='postgresql://…' scripts/restaurar.sh respaldos/AAAA-MM-DD_HHhMM
# ============================================================
set -euo pipefail

: "${SUPABASE_DB_URL:?Falta SUPABASE_DB_URL (el secreto del repositorio).}"
cd "$(dirname "$0")/.."

carpeta=${1:?Indicá la carpeta del respaldo, por ejemplo respaldos/2026-10-11_00h00}
falla() { echo "$1 No se cambió nada en la base." >&2; exit 1; }
[[ -f "$carpeta/datos.sql" ]] || falla "No existe $carpeta/datos.sql."
grep -q 'PostgreSQL database dump complete' "$carpeta/datos.sql" || falla "El respaldo está incompleto."
esquema="$carpeta/esquema.sql"
[[ -f "$esquema" ]] || esquema=sistema/supabase/esquema.sql

# De las cuentas (auth) se recuperan solo los usuarios y sus identidades;
# sesiones, registros internos y códigos temporales no hacen falta.
temporal=$(mktemp -d)
trap 'rm -rf "$temporal"' EXIT
awk -v q="'" '
  dentro { if (copiar) print; if ($0 == "\\.") dentro = 0; next }
  /^COPY / {
    copiar = ($2 ~ /^"public"\./ || $2 == "\"auth\".\"users\"" || $2 == "\"auth\".\"identities\"")
    dentro = 1; if (copiar) print; next
  }
  /^SELECT pg_catalog\.setval\(/ { if (index($0, q "\"public\".")) print; next }
  { print }
' "$carpeta/datos.sql" > "$temporal/datos.sql"

# Control antes de tocar nada: cada bloque de datos abre y cierra,
# y están las tablas básicas del sistema.
[[ $(grep -c '^COPY ' "$temporal/datos.sql") == $(grep -c '^\\\.$' "$temporal/datos.sql") ]] || falla "El respaldo tiene un bloque de datos cortado."
for t in '"public"."tarifas"' '"public"."reservas"' '"auth"."users"'; do
  grep -q "^COPY $t " "$temporal/datos.sql" || falla "Al respaldo le falta la tabla $t."
done

psql "$SUPABASE_DB_URL" -X -q --single-transaction \
  -v ON_ERROR_STOP=1 \
  -v esquema="$esquema" \
  -v datos="$temporal/datos.sql" \
  -f scripts/restaurar.sql

echo "Listo: la base quedó como en $carpeta"
