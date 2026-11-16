#!/usr/bin/env bash
# ============================================================
#  LA ESTRELLA — Mantener la base activa
#  El plan gratis de Supabase pausa el proyecto después de una semana
#  sin uso. Esto hace una consulta real a la base por la API pública
#  (una función mínima, `latido`, que solo devuelve la hora), así
#  Supabase ve actividad aunque el almacén pase días sin abrir el sistema.
#  No lee ningún dato del negocio.
# ============================================================
set -euo pipefail
cd "$(dirname "$0")/.."

config=_weblivo/laestrella/js/config.js
[[ -f $config ]] || config=sistema/js/config.js
url=$(sed -n "s/^ *url: *'\([^']*\)'.*/\1/p" "$config")
clave=$(sed -n "s/^ *clave: *'\([^']*\)'.*/\1/p" "$config")
[[ -n "$url" && -n "$clave" ]] || { echo "No encontré la dirección o la clave en $config (¿todavía no se conectó el sistema?)" >&2; exit 1; }

curl -fsS --retry 3 --retry-delay 10 -o /dev/null -X POST "$url/rest/v1/rpc/latido" \
  -H "apikey: $clave" -H "Authorization: Bearer $clave" -H "Content-Type: application/json" -d '{}'
echo "La base respondió: sigue activa."
