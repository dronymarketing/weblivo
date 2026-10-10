#!/usr/bin/env bash
# ============================================================
#  PARKING DESPEGAR — Copia de la base de datos
#  Guarda en respaldos/AAAA-MM-DD_HHhMM/ todo lo que hay en la base
#  (reservas, pagos, caja, facturas, registro, personal y cuentas)
#  y actualiza sistema/ con el código y la documentación de la web.
#
#  Uso:  SUPABASE_DB_URL='postgresql://…' scripts/respaldar.sh [nota]
#  La nota (opcional) se agrega al nombre de la carpeta,
#  por ejemplo «antes-de-restaurar».
# ============================================================
set -euo pipefail

: "${SUPABASE_DB_URL:?Falta SUPABASE_DB_URL (el secreto del repositorio).}"
cd "$(dirname "$0")/.."

ZONA=America/Montevideo
DIAS_A_GUARDAR=30
nota=${1:-}
[[ -z "$nota" || "$nota" =~ ^[a-z0-9-]+$ ]] || { echo "La nota solo puede tener letras, números y guiones." >&2; exit 1; }

ahora=$(TZ=$ZONA date +%Y-%m-%d_%Hh%M)
carpeta="respaldos/${ahora}${nota:+_$nota}"
mkdir -p "$carpeta"
trap '[[ -n "${terminado:-}" ]] || rm -rf "$carpeta"' EXIT   # si algo falla, no queda una copia a medias

# 1) Copia del sistema (si el paso anterior del workflow bajó la web)
if [[ -d _weblivo/parkingdespegar ]]; then
  rm -rf sistema && cp -a _weblivo/parkingdespegar sistema
  version_sistema=$(git -C _weblivo rev-parse --short HEAD)
else
  version_sistema="(sin cambios: se usa la copia anterior de sistema/)"
fi

# 2) Datos: tablas del sistema (public) y cuentas del personal (auth)
supabase db dump --db-url "$SUPABASE_DB_URL" --schema public,auth \
  --data-only --use-copy -f "$carpeta/datos.sql"

# Proyecto recién creado (todavía sin el sistema): no hay nada que guardar
if ! grep -q '^COPY "public"."reservas"' "$carpeta/datos.sql" && [[ "$nota" == antes-de-restaurar ]]; then
  echo "La base está vacía: no hay nada que guardar antes de restaurar."
  exit 0
fi

# 3) Estructura exacta de la base en este momento (para consulta)
supabase db dump --db-url "$SUPABASE_DB_URL" -f "$carpeta/estructura.sql"

# 4) Esquema del sistema con el que se crea una base nueva
[[ -f sistema/supabase/esquema.sql ]] && cp sistema/supabase/esquema.sql "$carpeta/esquema.sql"

# 5) Control: la copia tiene que estar completa
grep -q '^COPY "public"."reservas"' "$carpeta/datos.sql" \
  && grep -q 'PostgreSQL database dump complete' "$carpeta/datos.sql" \
  || { echo "La copia salió incompleta: no se guarda." >&2; exit 1; }

# 6) Resumen legible: cuántas filas tiene cada tabla
{
  echo "Respaldo de Parking Despegar"
  echo "Tomado:  $(TZ=$ZONA date '+%d/%m/%Y %H:%M') (hora de Uruguay)"
  echo "Sistema: versión $version_sistema del repositorio weblivo"
  echo
  echo "Filas por tabla:"
  awk '
    dentro { if ($0 == "\\.") { printf "  %-28s %s\n", tabla, n; dentro = 0 } else n++; next }
    /^COPY "(public"\.|auth"\."users")/ { tabla = $2; gsub(/"/, "", tabla); n = 0; dentro = 1 }
  ' "$carpeta/datos.sql"
} > "$carpeta/resumen.txt"
cat "$carpeta/resumen.txt"

# 7) Se guardan los últimos $DIAS_A_GUARDAR días a la vista.
#    Los anteriores siguen en el historial del repositorio.
limite=$(TZ=$ZONA date -d "$DIAS_A_GUARDAR days ago" +%Y-%m-%d)
for d in respaldos/*/; do
  nombre=$(basename "$d")
  [[ "${nombre:0:10}" < "$limite" ]] && rm -rf "$d" && echo "Se archiva $nombre (queda en el historial)."
done
terminado=1
echo "Listo: $carpeta"
