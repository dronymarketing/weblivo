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

// Algunos celulares (sobre todo Android) mandan el archivo sin extensión
// en el nombre. Si pasa eso, la deducimos a partir del tipo de archivo
// real (mimetype) para que Windows sepa que es una foto/video.
const EXTENSION_POR_MIME = {
  'image/jpeg': '.jpg',
  'image/jpg': '.jpg',
  'image/png': '.png',
  'image/gif': '.gif',
  'image/webp': '.webp',
  'image/heic': '.heic',
  'image/heif': '.heif',
  'video/mp4': '.mp4',
  'video/quicktime': '.mov',
  'video/webm': '.webm',
  'video/3gpp': '.3gp',
  'video/x-matroska': '.mkv'
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, CARPETA_FOTOS),
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    let ext = path.extname(file.originalname);
    if (!ext) {
      ext = EXTENSION_POR_MIME[file.mimetype] || '';
    }
    const nombreBase = path
      .basename(file.originalname, path.extname(file.originalname))
      .replace(/[^a-zA-Z0-9\-_]/g, '_') || 'archivo';
    cb(null, `${timestamp}-${nombreBase}${ext}`);
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
