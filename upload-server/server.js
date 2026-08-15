// Servidor que recibe las fotos/videos subidos desde la web de Martina
// y los guarda en el disco de esta PC.

const express = require('express');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const CARPETA_FOTOS = 'D:\\FotosCumpleMartina';

if (!fs.existsSync(CARPETA_FOTOS)) {
  fs.mkdirSync(CARPETA_FOTOS, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, CARPETA_FOTOS),
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const nombreLimpio = file.originalname.replace(/[^a-zA-Z0-9.\-_]/g, '_');
    cb(null, `${timestamp}-${nombreLimpio}`);
  }
});

const upload = multer({ storage });
const app = express();

app.use(cors()); // permite que la web (livo.com.uy) le hable a este servidor

app.post('/upload', upload.array('archivos'), (req, res) => {
  const cantidad = req.files ? req.files.length : 0;
  console.log(`Recibidos ${cantidad} archivo(s) - ${new Date().toLocaleTimeString()}`);
  res.status(200).json({ ok: true, recibidos: cantidad });
});

app.get('/', (req, res) => {
  res.send('Servidor de fotos de Martina funcionando correctamente.');
});

app.listen(PORT, () => {
  console.log('==========================================');
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
  console.log(`Guardando fotos en: ${CARPETA_FOTOS}`);
  console.log('Dejá esta ventana abierta mientras dure el evento.');
  console.log('==========================================');
});
