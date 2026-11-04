/* El catálogo del servidor tiene que coincidir con el de la web (js/productos.js):
   si cambia un precio en un lado y no en el otro, el cliente vería un total y se le
   cobraría otro. Este test lo detecta. */
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { CATALOGO } from "../src/logica.js";

test("el catálogo del servidor coincide con js/productos.js", () => {
  const texto = readFileSync(new URL("../../js/productos.js", import.meta.url), "utf8");
  const window = {};
  new Function("window", texto)(window);
  const web = window.PANACEA.productos;

  assert.equal(web.length, Object.keys(CATALOGO).length, "no hay la misma cantidad de productos");
  for (const p of web) {
    assert.ok(CATALOGO[p.id], "el servidor no tiene el producto " + p.id);
    assert.equal(CATALOGO[p.id].precio, p.precio, "precio distinto en " + p.id);
    assert.equal(CATALOGO[p.id].nombre, p.nombre, "nombre distinto en " + p.id);
  }
});
