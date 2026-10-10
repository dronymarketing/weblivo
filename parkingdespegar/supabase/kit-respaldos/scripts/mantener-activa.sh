#!/usr/bin/env bash
# ============================================================
#  PARKING DESPEGAR — Mantener la base activa
#  El plan gratis de Supabase pausa el proyecto después de una semana
#  sin uso. Esto hace una consulta real a la base por la API pública
#  (la misma que usa la web para leer los precios), así Supabase ve
#  actividad aunque el parking pase días sin abrir el sistema.
# ============================================================
set -euo pipefail
cd "$(dirname "$0")/.."

config=_weblivo/parkingdespegar/js/config.js
[[ -f $config ]] || config=sistema/js/config.js
url=$(sed -n "s/^ *url: *'\([^']*\)'.*/\1/p" "$config")
clave=$(sed -n "s/^ *clave: *'\([^']*\)'.*/\1/p" "$config")
[[ -n "$url" && -n "$clave" ]] || { echo "No encontré la dirección o la clave en $config" >&2; exit 1; }

curl -fsS --retry 3 --retry-delay 10 -o /dev/null "$url/rest/v1/tarifas?select=id" -H "apikey: $clave"
echo "La base respondió: sigue activa."
