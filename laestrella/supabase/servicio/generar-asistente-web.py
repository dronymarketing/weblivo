#!/usr/bin/env python3
"""Copia la lógica de preguntas y respuestas del Worker (worker.js) a js/asistente.js, para que el chat de prueba
del panel conteste EXACTAMENTE igual que el WhatsApp real. Correr desde la raíz del sitio tras tocar worker.js:
    python3 supabase/servicio/generar-asistente-web.py
"""
import re, pathlib
raiz = pathlib.Path(__file__).resolve().parents[2]
w = (raiz / 'supabase/servicio/worker.js').read_text(encoding='utf-8')
a = w.index('/* ---------- Entender la pregunta')
b = w.index('/* ============================================================\n   2) AVISOS A DEUDORES')
trozo = w[a:b].rstrip() + '\n'
salida = ("/* GENERADO desde supabase/servicio/worker.js con generar-asistente-web.py. No se edita a mano.\n"
          "   Es la misma lógica que usa el asistente de WhatsApp: entiende la pregunta y arma la respuesta. */\n"
          "(function () {\n  'use strict';\n  var UY = 3 * 3600000;\n"
          + ''.join(('  ' + l if l.strip() else l) for l in trozo.splitlines(True)) +
          "  window.ASISTENTE = { interpretar: interpretar, responder: responder, normalizar: normalizar };\n})();\n")
(raiz / 'js/asistente.js').write_text(salida, encoding='utf-8')
print('js/asistente.js', len(salida), 'bytes')
