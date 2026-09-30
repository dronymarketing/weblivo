# Escena 3D — fuentes

`js/escena.js` es un solo archivo empaquetado (Three.js + la escena) para que el
borrador abra también con doble clic, sin servidor. **No se edita a mano**: se
editan estos fuentes y se vuelve a empaquetar.

| Archivo | Qué tiene |
|---|---|
| `escena.js` | Entrada: render, luces, autos estacionados, actores, guion por etapas, cámara y scroll → etapa |
| `mundo.js` | La maqueta: suelo, avenida, playa, techado, cerco, oficina, cartel, árboles, terminal, torre, pista, persona y avión |
| `autos.js` | Arma los autos desde `autos.json` y los pinta en blanco arcilla (o en naranja, la camioneta) |
| `autos.json` | Autos de **Kenney Car Kit (CC0, kenney.nl)** convertidos con `convertir-autos.mjs` |
| `holograma.js` | El lugar reservado: auto translúcido azul con bordes que brillan, como la referencia |
| `logos.js` | Logo horizontal e isotipo en vector, sacados del PDF del branding (cartel y camioneta) |
| `cuadro.html` | Solo la escena, para sacar cuadros con `?s=` |

## Empaquetar

```sh
npm install three@0.180.0 esbuild          # en cualquier carpeta de trabajo
NODE_PATH=<esa carpeta>/node_modules npx esbuild src/escena.js --bundle --minify \
  --format=iife --target=es2018 --legal-comments=none --outfile=js/escena.js
```

Después subir el `?v=` de `js/escena.js` en `index.html`.

## Etapas

`?s=0` a `?s=4` en la URL fija la etapa (0 hero, 1 llegada, 2 entrega,
3 traslado, 4 despegue). Los encuadres están en `POSES` de `escena.js`
(punto mirado, giro, altura y distancia); en celular vertical la cámara se aleja
y la imagen se corre hacia arriba para dejar lugar a la tarjeta.

## Volver a convertir los autos

```sh
npm install @gltf-transform/core pngjs
node src/convertir-autos.mjs src/autos.json "<carpeta de Kenney>/Models/GLB format"
```
