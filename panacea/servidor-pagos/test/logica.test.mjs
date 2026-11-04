import test from "node:test";
import assert from "node:assert/strict";
import { validarPedido, aCentavos, partirNombre, telefono, mapearEstado, buscarUrl, nuevoNumero, dinero } from "../src/logica.js";

const datosBien = { nombre: "Ana Pérez", email: "Ana@Correo.com", telefono: "099 123 456", entrega: "Retiro en Pinamar, Canelones", notas: "" };
const pedidoBien = (extra) => Object.assign({ items: [{ id: "te-manzanilla", cantidad: 2 }], datos: datosBien, medio: "Santander" }, extra);

test("el total sale del catálogo, nunca del navegador", () => {
  const r = validarPedido(pedidoBien({ items: [{ id: "te-manzanilla", cantidad: 2, precio: 1 }, { id: "serum-rosas", cantidad: 1 }] }));
  assert.equal(r.ok, true);
  assert.equal(r.pedido.total, 250 * 2 + 780);
});

test("rechaza productos inexistentes, repetidos o con cantidades raras", () => {
  assert.equal(validarPedido(pedidoBien({ items: [{ id: "inventado", cantidad: 1 }] })).ok, false);
  assert.equal(validarPedido(pedidoBien({ items: [{ id: "te-manzanilla", cantidad: 1 }, { id: "te-manzanilla", cantidad: 1 }] })).ok, false);
  assert.equal(validarPedido(pedidoBien({ items: [{ id: "te-manzanilla", cantidad: 0 }] })).ok, false);
  assert.equal(validarPedido(pedidoBien({ items: [{ id: "te-manzanilla", cantidad: 2.5 }] })).ok, false);
  assert.equal(validarPedido(pedidoBien({ items: [{ id: "te-manzanilla", cantidad: 100 }] })).ok, false);
  assert.equal(validarPedido(pedidoBien({ items: [] })).ok, false);
  assert.equal(validarPedido(pedidoBien({ items: "x" })).ok, false);
  assert.equal(validarPedido(pedidoBien({ items: [{ id: "__proto__", cantidad: 1 }] })).ok, false);
});

test("valida los datos del cliente", () => {
  assert.equal(validarPedido(pedidoBien({ datos: { ...datosBien, nombre: "" } })).ok, false);
  assert.equal(validarPedido(pedidoBien({ datos: { ...datosBien, email: "ana@correo" } })).ok, false);
  assert.equal(validarPedido(pedidoBien({ datos: { ...datosBien, telefono: "123" } })).ok, false);
  assert.equal(validarPedido(pedidoBien({ datos: { ...datosBien, entrega: "Drone" } })).ok, false);
  const ok = validarPedido(pedidoBien());
  assert.equal(ok.ok, true);
  assert.equal(ok.pedido.datos.email, "ana@correo.com", "el email se guarda en minúscula");
});

test("solo acepta medios de pago conocidos (Prex todavía no)", () => {
  assert.equal(validarPedido(pedidoBien({ medio: "Prex" })).ok, false);
  assert.equal(validarPedido(pedidoBien({ medio: "Bitcoin" })).ok, false);
  const t = validarPedido(pedidoBien({ medio: "Itaú" }));
  assert.equal(t.pedido.grupo, "transferencia");
  assert.equal(t.pedido.codigo, "ITA");
  assert.equal(validarPedido(pedidoBien({ medio: "Visa" })).pedido.grupo, "tarjeta");
});

test("montos en centavos, sin decimales raros", () => {
  assert.equal(aCentavos(780), 78000);
  assert.equal(aCentavos(12.25), 1225);
});

test("nombre y teléfono", () => {
  assert.deepEqual(partirNombre("Ana María Pérez"), { nombre: "Ana", apellido: "María Pérez" });
  assert.deepEqual(partirNombre("Ana"), { nombre: "Ana", apellido: "" });
  assert.equal(telefono("099 123 456"), "099123456");
  assert.equal(telefono("099 123 456", true), "59899123456");
  assert.equal(telefono("598 99 123 456", true), "59899123456");
});

test("estados de Bamboo → estados de Panacea", () => {
  assert.equal(mapearEstado("APPROVED"), "APROBADO");
  assert.equal(mapearEstado("Approved"), "APROBADO");
  assert.equal(mapearEstado("Rejected"), "RECHAZADO");
  assert.equal(mapearEstado("PENDING"), "PENDIENTE");
  assert.equal(mapearEstado("Canceled"), "CANCELADO");
  assert.equal(mapearEstado("algo raro"), null);
  assert.equal(mapearEstado(undefined), null);
});

test("busca la URL del enlace de pago sin agarrar las de notificación", () => {
  assert.equal(buscarUrl({ paymentUrl: "https://pay.bamboo/x" }), "https://pay.bamboo/x");
  assert.equal(buscarUrl({ data: { checkoutUrl: "https://pay.bamboo/y" } }), "https://pay.bamboo/y");
  assert.equal(buscarUrl({ notificationUrl: "https://miweb/aviso", id: 1 }), null);
  assert.equal(buscarUrl({ Url: "http://inseguro" }), null, "solo https");
  assert.equal(buscarUrl(null), null);
});

test("número de pedido legible y distinto cada vez", () => {
  const a = nuevoNumero(), b = nuevoNumero();
  assert.match(a, /^PAN-[0-9A-Z]{8,}$/);
  assert.notEqual(a, b);
});

test("formato de dinero", () => {
  assert.equal(dinero(1560), "$1.560");
  assert.equal(dinero(780), "$780");
});
