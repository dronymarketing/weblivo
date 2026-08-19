@echo off
echo Iniciando servidor de fotos de Martina...

start "Servidor de fotos - Martina" cmd /k "cd /d C:\Users\santi\Desktop\weblivo\upload-server && node server.js"

timeout /t 2 /nobreak >nul

start "Tunel publico - Tailscale" cmd /k "tailscale funnel 3000"

echo Listo. Se abrieron 2 ventanas: dejalas abiertas mientras dure el evento.
