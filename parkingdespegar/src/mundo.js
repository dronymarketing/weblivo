/* ============================================================
   MUNDO — la maqueta: suelo, avenida, playa de estacionamiento,
   techado, cerco, oficina, cartel, árboles, aeropuerto y avión.
   Todo lo estático se agrupa por material y se fusiona en una
   sola malla por material: pocas llamadas de dibujo en el celular.
   Unidades: 1 u ≈ 1,2 m. x hacia el este, z hacia el sur.
   ============================================================ */
import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { LOGO_HORIZONTAL, ISOTIPO } from './logos.js';

export const COLOR = {
  fondo:   '#eef3f1',
  suelo:   '#eef3f1',
  pasto:   '#e1efe8',
  playa:   '#e5ebe9',
  calle:   '#dce3e1',
  vereda:  '#f3f6f5',
  linea:   '#ffffff',
  arcilla: '#f5f7f7',
  gris:    '#dde3e4',
  vidrio:  '#b7cdd8',
  naranja: '#ff6712',
  navy:    '#053f5c'
};

/* ---------- Plano de la maqueta ---------- */
export const PLANO = {
  playa:   { x0: -27, x1: 11, z0: -13, z1: 14 },
  porton:  { x0: 3, x1: 9 },
  avenida: { z0: 17, z1: 24 },
  carrilEste: 22.2,   // se maneja por la derecha: hacia el este va el carril sur
  carrilOeste: 18.8,
  cajon:   { ancho: 2.05, fondo: 3.5 },
  filaA:   { z0: -12.2, z1: -8.7 },  // techada, trompa al norte
  filaB1:  { z0: -3.5, z1: 0 },      // trompa al sur
  filaB2:  { z0: 0, z1: 3.5 },       // trompa al norte
  pasillo2: 6.0,
  xCajones: [],
  terminal: { x0: 32, x1: 108, z0: -38, z1: -24 },
  cordon:  { z: -18.9 },
  acceso:  { x: 44.5 },
  pista:   { z: -60, x0: -20, x1: 200 }
};
for (let x = -25.5; x <= 9.6; x += PLANO.cajon.ancho) PLANO.xCajones.push(+x.toFixed(3));

/* Arco del techo de la terminal (como la de Carrasco): alto en el medio, baja a los costados */
export function arco(x) {
  const t = (x - 70) / 44;
  return 2.2 + 11 * Math.max(0, 1 - t * t);
}

function mat(color, extra) {
  return new THREE.MeshStandardMaterial(Object.assign({ color, roughness: 0.92, metalness: 0 }, extra || {}));
}

export function crearMundo(escena, calidad) {
  const M = {
    suelo:   mat(COLOR.suelo, { roughness: 1 }),
    pasto:   mat(COLOR.pasto, { roughness: 1 }),
    playa:   mat(COLOR.playa, { roughness: 1 }),
    calle:   mat(COLOR.calle, { roughness: 1 }),
    vereda:  mat(COLOR.vereda, { roughness: 1 }),
    linea:   mat(COLOR.linea, { roughness: 1 }),
    arcilla: mat(COLOR.arcilla),
    copa:    mat('#e9f3ee'),
    gris:    mat(COLOR.gris),
    vidrio:  mat(COLOR.vidrio, { roughness: 0.18, metalness: 0.15 }),
    naranja: mat(COLOR.naranja, { roughness: 0.6 }),
    navy:    mat(COLOR.navy, { roughness: 0.6 })
  };

  // Geometrías por material; al final se fusionan
  const lotes = {};
  function poner(nombreMat, geo, sombra) {
    const k = nombreMat + (sombra === false ? ':s' : '');
    // Todas iguales para poder fusionarlas: sin índice y sin uv (no llevan textura)
    if (geo.index) geo = geo.toNonIndexed();
    geo.deleteAttribute('uv');
    (lotes[k] = lotes[k] || []).push(geo);
  }
  function caja(nm, w, h, d, x, y, z, rotY) {
    const g = new THREE.BoxGeometry(w, h, d);
    if (rotY) g.rotateY(rotY);
    g.translate(x, y + h / 2, z);
    poner(nm, g);
    return g;
  }
  function plano(nm, x0, x1, z0, z1, y) {
    const g = new THREE.PlaneGeometry(x1 - x0, z1 - z0);
    g.rotateX(-Math.PI / 2);
    g.translate((x0 + x1) / 2, y, (z0 + z1) / 2);
    poner(nm, g, false);
  }
  function cilindro(nm, r, h, x, y, z, seg) {
    const g = new THREE.CylinderGeometry(r, r, h, seg || 10);
    g.translate(x, y + h / 2, z);
    poner(nm, g);
  }

  const P = PLANO;

  /* ---------- Suelo ---------- */
  const suelo = new THREE.Mesh(new THREE.PlaneGeometry(900, 900), M.suelo);
  suelo.rotation.x = -Math.PI / 2;
  suelo.receiveShadow = true;
  escena.add(suelo);

  /* ---------- Avenida (Wilson Ferreira Aldunate) ---------- */
  plano('calle', -160, 260, P.avenida.z0, P.avenida.z1, 0.012);
  plano('vereda', -160, 260, 14.6, P.avenida.z0, 0.02);
  plano('pasto', -160, 260, P.avenida.z1, 30, 0.01);
  for (let x = -158; x < 258; x += 4.2) plano('linea', x, x + 2.2, 20.42, 20.58, 0.03);
  plano('linea', -160, 260, 17.35, 17.5, 0.03);
  plano('linea', -160, 260, 23.5, 23.65, 0.03);

  /* ---------- Playa de estacionamiento ---------- */
  plano('playa', P.playa.x0, P.playa.x1, P.playa.z0, P.playa.z1, 0.015);
  // Entrada al portón (sobre la vereda)
  plano('playa', P.porton.x0, P.porton.x1, P.playa.z1, P.avenida.z0, 0.022);

  const lw = 0.09;
  const xs = P.xCajones;
  const bordes = [];
  for (let i = 0; i <= xs.length; i++) {
    const x = i === 0 ? xs[0] - P.cajon.ancho / 2 : xs[i - 1] + P.cajon.ancho / 2;
    bordes.push(x);
  }
  bordes.forEach(x => {
    plano('linea', x - lw / 2, x + lw / 2, P.filaA.z0, P.filaA.z1, 0.03);
    plano('linea', x - lw / 2, x + lw / 2, P.filaB1.z0, P.filaB2.z1, 0.03);
  });
  const xa = bordes[0], xb = bordes[bordes.length - 1];
  plano('linea', xa, xb, P.filaA.z0 - lw, P.filaA.z0, 0.03);
  plano('linea', xa, xb, -lw / 2, lw / 2, 0.03);
  // Flechas de circulación en el pasillo (rayas cortas)
  for (let x = -20; x < 8; x += 7) {
    plano('linea', x, x + 1.6, P.pasillo2 - 0.06, P.pasillo2 + 0.06, 0.03);
    plano('linea', x, x + 1.6, -6.1, -5.98, 0.03);
  }

  /* ---------- Techado sobre la fila A ---------- */
  const tz0 = P.filaA.z0 - 0.6, tz1 = P.filaA.z1 + 0.5, tAlto = 3.4, tCumbre = 4.3;
  for (let x = P.playa.x0 + 0.6; x <= P.playa.x1 - 0.5; x += 6.2) {
    cilindro('gris', 0.09, tAlto, x, 0, tz0 + 0.1, 8);
    cilindro('gris', 0.09, tAlto, x, 0, tz1 - 0.1, 8);
  }
  {
    const largo = P.playa.x1 - P.playa.x0 + 0.4;
    const mitad = (tz1 - tz0) / 2;
    const inclin = Math.atan2(tCumbre - tAlto, mitad);
    const lado = Math.hypot(mitad, tCumbre - tAlto) + 0.15;
    const cx = (P.playa.x0 + P.playa.x1) / 2;
    const zc = (tz0 + tz1) / 2;
    const a = new THREE.BoxGeometry(largo, 0.1, lado);
    a.rotateX(-inclin); a.translate(cx, (tAlto + tCumbre) / 2, zc - mitad / 2);
    const b = new THREE.BoxGeometry(largo, 0.1, lado);
    b.rotateX(inclin); b.translate(cx, (tAlto + tCumbre) / 2, zc + mitad / 2);
    poner('arcilla', a); poner('arcilla', b);
    // Viga de cumbrera
    const v = new THREE.BoxGeometry(largo, 0.12, 0.16); v.translate(cx, tCumbre - 0.06, zc); poner('gris', v);
  }

  /* ---------- Cerco perimetral (cercado) ---------- */
  const cerco = [];
  const altoCerco = 1.55;
  function tramo(x0, z0, x1, z1) {
    const largo = Math.hypot(x1 - x0, z1 - z0);
    const n = Math.max(1, Math.round(largo / 2.6));
    for (let i = 0; i <= n; i++) {
      const t = i / n;
      cilindro('gris', 0.045, altoCerco, x0 + (x1 - x0) * t, 0, z0 + (z1 - z0) * t, 6);
    }
    const ang = Math.atan2(x1 - x0, z1 - z0);
    [0.25, altoCerco - 0.05].forEach(y => {
      const g = new THREE.BoxGeometry(0.05, 0.05, largo);
      g.rotateY(ang); g.translate((x0 + x1) / 2, y, (z0 + z1) / 2);
      poner('gris', g);
    });
    // Malla: panel apenas visible
    const m = new THREE.PlaneGeometry(largo, altoCerco - 0.3);
    m.rotateY(ang + Math.PI / 2); m.translate((x0 + x1) / 2, 0.25 + (altoCerco - 0.3) / 2, (z0 + z1) / 2);
    cerco.push(m);
  }
  const L = P.playa;
  tramo(L.x0, L.z0, L.x1, L.z0);
  tramo(L.x1, L.z0, L.x1, L.z1);
  tramo(L.x1, L.z1, P.porton.x1, L.z1);
  tramo(P.porton.x0, L.z1, L.x0, L.z1);
  tramo(L.x0, L.z1, L.x0, L.z0);
  const malla = new THREE.Mesh(mergeGeometries(cerco), new THREE.MeshStandardMaterial({
    color: '#cfd8da', transparent: true, opacity: 0.22, side: THREE.DoubleSide, depthWrite: false, roughness: 1
  }));
  escena.add(malla);
  // Pilares del portón y barrera naranja (levantada)
  caja('arcilla', 0.4, 2.1, 0.4, P.porton.x0 - 0.2, 0, L.z1);
  caja('arcilla', 0.4, 2.1, 0.4, P.porton.x1 + 0.2, 0, L.z1);
  {
    const g = new THREE.BoxGeometry(0.12, 4.6, 0.12);
    g.translate(0, 2.3, 0); g.rotateZ(-0.12); g.translate(P.porton.x1 + 0.2, 1.1, L.z1 + 0.35);
    poner('naranja', g);
  }

  /* ---------- Oficina (abierta 24 h) ---------- */
  {
    const x0 = -24.5, x1 = -15, z0 = 9.2, z1 = 13.4;
    const cx = (x0 + x1) / 2, cz = (z0 + z1) / 2;
    const cuerpo = new RoundedBoxGeometry(x1 - x0, 3.2, z1 - z0, 2, 0.12);
    cuerpo.translate(cx, 1.6, cz); poner('arcilla', cuerpo);
    caja('naranja', x1 - x0 + 0.05, 0.55, z1 - z0 + 0.05, cx, 2.35, cz);
    caja('vidrio', 3.2, 1.3, 0.06, cx - 1.6, 0.9, z0 - 0.02);
    caja('vidrio', 1.1, 2.1, 0.06, cx + 2.4, 0, z0 - 0.02);
    caja('gris', x1 - x0 + 0.5, 0.14, z1 - z0 + 0.5, cx, 3.2, cz);
  }

  /* ---------- Postes con cámara (monitoreado) ---------- */
  [[L.x0 + 0.5, L.z0 + 0.5], [L.x1 - 0.5, L.z1 - 0.5], [L.x0 + 0.5, L.z1 - 0.5], [L.x1 - 0.5, L.z0 + 0.5]].forEach(([x, z]) => {
    cilindro('gris', 0.07, 4.2, x, 0, z, 8);
    const c = new RoundedBoxGeometry(0.34, 0.26, 0.62, 2, 0.06);
    c.rotateY(Math.atan2(-x - 8, -z)); c.translate(x, 4.2, z);
    poner('arcilla', c);
  });

  /* ---------- Faroles sobre la avenida ---------- */
  for (let x = -60; x < 140; x += 16) {
    cilindro('gris', 0.07, 5.2, x, 0, 16.2, 8);
    const brazo = new THREE.BoxGeometry(0.08, 0.08, 1.6); brazo.translate(x, 5.15, 16.95); poner('gris', brazo);
    const cabeza = new RoundedBoxGeometry(0.5, 0.14, 0.9, 2, 0.05); cabeza.translate(x, 5.05, 17.6); poner('arcilla', cabeza);
  }

  /* ---------- Árboles de arcilla ---------- */
  const semilla = { v: 7 };
  function azar() { semilla.v = (semilla.v * 16807) % 2147483647; return semilla.v / 2147483647; }
  function arbol(x, z, esc) {
    const s = (esc || (0.8 + azar() * 0.5)) * 0.78;
    cilindro('arcilla', 0.12 * s, 1.5 * s, x, 0, z, 7);
    const copa = new THREE.IcosahedronGeometry(1.25 * s, 2);
    copa.scale(1, 1.12, 1);
    copa.translate(x, 1.5 * s + 1.1 * s, z);
    poner('copa', copa);
  }
  for (let x = -70; x < 150; x += 7.5 + azar() * 5) {
    if (x > P.porton.x0 - 3 && x < P.porton.x1 + 3) continue;
    if (x > P.acceso.x - 4 && x < P.acceso.x + 5) continue;
    arbol(x, 15.4 + azar() * 0.6);
    if (azar() > 0.35) arbol(x + 2, 26 + azar() * 4);
  }
  arbol(-13, 11.5, 1.1); arbol(-10.5, 12.6, 0.9);
  for (let z = -10; z < 10; z += 6) { arbol(L.x0 - 3, z); arbol(L.x1 + 3.5, z - 2); }
  for (let x = 20; x < 32; x += 4) arbol(x, -8 + azar() * 6);
  for (let z = -12; z < 12; z += 5.5) { arbol(P.acceso.x - 4, z); arbol(P.acceso.x + 5, z + 2); }

  /* ---------- Aeropuerto ---------- */
  const T = P.terminal;
  // Acceso desde la avenida y calle del cordón frente a la terminal
  plano('calle', P.acceso.x - 2.6, P.acceso.x + 2.6, -16, P.avenida.z0, 0.013);
  plano('calle', T.x0 - 4, T.x1 + 6, -21.4, -16, 0.013);
  for (let z = -14; z < 16; z += 4.2) plano('linea', P.acceso.x - 0.07, P.acceso.x + 0.07, z, z + 2.2, 0.03);
  for (let x = T.x0 - 2; x < T.x1 + 4; x += 4.2) plano('linea', x, x + 2.2, -18.75, -18.62, 0.03);
  // Vereda elevada de la terminal
  caja('vereda', T.x1 - T.x0 + 8, 0.14, 3, (T.x0 + T.x1) / 2, 0, -22.9);
  // Estacionamiento público de enfrente, en gris
  plano('playa', T.x0 + 6, T.x1 - 6, -12, -1, 0.012);
  for (let x = T.x0 + 7; x < T.x1 - 6; x += 2.05) plano('linea', x, x + 0.08, -12, -9, 0.03);

  // Techo en arco
  {
    const largo = 90, prof = 19, cx = 70, cz = (T.z0 + T.z1) / 2 + 1.7;
    const g = new THREE.BoxGeometry(largo, 0.55, prof, 96, 1, 1);
    const p = g.getAttribute('position');
    for (let i = 0; i < p.count; i++) {
      const x = p.getX(i) + cx;
      p.setY(i, p.getY(i) + arco(x));
    }
    g.computeVertexNormals();
    g.translate(cx, 0, cz);
    poner('arcilla', g);
    // Fachada de vidrio (sigue el arco) y muro de atrás
    [[T.z1, 'vidrio'], [T.z0, 'arcilla']].forEach(([z, nm]) => {
      const f = new THREE.PlaneGeometry(76, 1, 80, 1);
      const q = f.getAttribute('position');
      for (let i = 0; i < q.count; i++) {
        const x = q.getX(i) + 70;
        const tope = Math.max(0.2, arco(x) - 0.25);
        q.setY(i, q.getY(i) > 0 ? tope : 0);
      }
      f.computeVertexNormals();
      f.translate(70, 0, z);
      poner(nm, f);
    });
    // Parantes de la fachada
    for (let x = T.x0 + 1; x < T.x1; x += 3.2) {
      const h = Math.max(0.2, arco(x) - 0.2);
      caja('arcilla', 0.14, h, 0.2, x, 0, T.z1 + 0.05);
    }
    // Losa del piso interior (para que no se vea el pasto por el vidrio)
    caja('vereda', 76, 0.1, T.z1 - T.z0, 70, 0, (T.z0 + T.z1) / 2);
  }

  // Torre de control
  {
    const x = 121, z = -29;
    const fuste = new THREE.CylinderGeometry(1.0, 1.35, 17, 20); fuste.translate(x, 8.5, z); poner('arcilla', fuste);
    const base = new THREE.CylinderGeometry(2.2, 2.4, 1.2, 24); base.translate(x, 17.4, z); poner('arcilla', base);
    const cabina = new THREE.CylinderGeometry(2.7, 2.2, 2.4, 24, 1, true); cabina.translate(x, 19.2, z); poner('vidrio', cabina);
    const techo = new THREE.CylinderGeometry(3.0, 3.0, 0.4, 24); techo.translate(x, 20.6, z); poner('arcilla', techo);
    cilindro('gris', 0.06, 3, x, 20.8, z, 6);
  }

  // Pista
  plano('calle', P.pista.x0, P.pista.x1, P.pista.z - 5, P.pista.z + 5, 0.013);
  for (let x = P.pista.x0 + 6; x < P.pista.x1 - 6; x += 9) plano('linea', x, x + 5, P.pista.z - 0.12, P.pista.z + 0.12, 0.03);
  for (let i = -3; i <= 3; i++) plano('linea', P.pista.x0 + 2, P.pista.x0 + 6, P.pista.z + i * 1.2 - 0.3, P.pista.z + i * 1.2 + 0.3, 0.03);
  // Calle de rodaje hacia la terminal
  plano('calle', 20, 120, -47, -42, 0.012);
  plano('calle', 26, 31, -55, -42, 0.012);

  /* ---------- Cartel de Parking Despegar, junto al portón ---------- */
  const cartel = crearCartel(M);
  cartel.position.set(P.porton.x0 - 3.6, 0, 15.6);
  escena.add(cartel);

  /* ---------- Fusión por material ---------- */
  Object.keys(lotes).forEach(k => {
    const [nm, flag] = k.split(':');
    const geo = mergeGeometries(lotes[k], false);
    const malla = new THREE.Mesh(geo, M[nm]);
    malla.receiveShadow = true;
    malla.castShadow = flag !== 's';
    malla.matrixAutoUpdate = false;
    malla.updateMatrix();
    escena.add(malla);
  });

  return { materiales: M };
}

/* ---------- Texturas con el logo, dibujadas con Path2D ---------- */
function texturaLogo(pathD, vbW, vbH, anchoPx, color, fondo, margen) {
  const m = margen || 0;
  const alto = Math.round(anchoPx * (vbH / vbW) + m * 2);
  const c = document.createElement('canvas');
  c.width = anchoPx + m * 2; c.height = alto;
  const ctx = c.getContext('2d');
  if (fondo) { ctx.fillStyle = fondo; ctx.fillRect(0, 0, c.width, c.height); }
  ctx.translate(m, m);
  const esc = anchoPx / vbW;
  ctx.scale(esc, esc);
  ctx.fillStyle = color;
  ctx.fill(new Path2D(pathD));
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  return t;
}

function crearCartel(M) {
  const g = new THREE.Group();
  const ancho = 5.2, alto = 1.75;
  const panel = new THREE.Mesh(new RoundedBoxGeometry(ancho, alto, 0.22, 2, 0.08), M.naranja);
  panel.position.y = 2.6;
  panel.castShadow = true;
  g.add(panel);
  const tex = texturaLogo(LOGO_HORIZONTAL.d, LOGO_HORIZONTAL.w, LOGO_HORIZONTAL.h, 1024, '#ffffff', null, 0);
  const logo = new THREE.Mesh(
    new THREE.PlaneGeometry(ancho * 0.84, ancho * 0.84 * (LOGO_HORIZONTAL.h / LOGO_HORIZONTAL.w)),
    new THREE.MeshStandardMaterial({ map: tex, transparent: true, roughness: 0.8 })
  );
  logo.position.set(0, 2.6, 0.115);
  g.add(logo);
  [-1.6, 1.6].forEach(x => {
    const pata = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 1.8, 8), M.gris);
    pata.position.set(x, 0.9, 0);
    pata.castShadow = true;
    g.add(pata);
  });
  return g;
}

/* Calcomanía del isotipo para la camioneta (blanco sobre transparente) */
export function texturaIsotipo() {
  return texturaLogo(ISOTIPO.d, ISOTIPO.w, ISOTIPO.h, 256, '#ffffff', null, 0);
}

/* ---------- Persona de arcilla con valija ---------- */
export function crearPersona(colorRopa) {
  const g = new THREE.Group();
  const piel = mat('#f5f7f7');
  const ropa = mat(colorRopa || '#f5f7f7');
  const cuerpo = new THREE.Mesh(new THREE.CapsuleGeometry(0.26, 0.55, 4, 10), ropa);
  cuerpo.position.y = 1.02;
  const cabeza = new THREE.Mesh(new THREE.SphereGeometry(0.2, 16, 12), piel);
  cabeza.position.y = 1.62;
  const piernas = [];
  [-0.12, 0.12].forEach(x => {
    const p = new THREE.Group();
    const m = new THREE.Mesh(new THREE.CapsuleGeometry(0.095, 0.5, 3, 8), piel);
    m.position.y = -0.33;
    p.add(m);
    p.position.set(x, 0.66, 0);
    g.add(p);
    piernas.push(p);
  });
  const valija = new THREE.Group();
  const caja = new THREE.Mesh(new RoundedBoxGeometry(0.42, 0.6, 0.24, 2, 0.05), mat(COLOR.navy, { roughness: 0.5 }));
  caja.position.y = 0.36;
  const manija = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.5, 0.04), mat('#9fb3bd'));
  manija.position.set(0, 0.85, -0.06);
  valija.add(caja, manija);
  valija.position.set(0.48, 0, -0.25);
  valija.rotation.x = 0.25;
  g.add(cuerpo, cabeza, valija);
  g.traverse(o => { if (o.isMesh) { o.castShadow = true; } });
  g.userData.piernas = piernas;
  return g;
}

/* ---------- Avión de arcilla (cola naranja de la marca) ---------- */
export function crearAvion() {
  const g = new THREE.Group();
  const blanco = mat('#f7f9f9', { roughness: 0.55 });
  const naranja = mat(COLOR.naranja, { roughness: 0.55 });
  const oscuro = mat('#3b4d58', { roughness: 0.3 });
  // Fuselaje a lo largo de +x
  const fus = new THREE.CapsuleGeometry(1.25, 15, 8, 20);
  fus.rotateZ(Math.PI / 2);
  g.add(new THREE.Mesh(fus, blanco));
  // Nariz un poco aplastada abajo, cola que sube
  const cola = new THREE.ConeGeometry(1.25, 4.2, 20);
  cola.rotateZ(Math.PI / 2); cola.translate(-10.6, 0.35, 0);
  g.add(new THREE.Mesh(cola, blanco));
  // Ventanillas: una franja oscura
  const vent = new THREE.CylinderGeometry(1.262, 1.262, 12, 20, 1, true, Math.PI * 0.3, Math.PI * 0.08);
  vent.rotateZ(Math.PI / 2);
  const franja = new THREE.Mesh(vent, oscuro);
  g.add(franja);
  const franja2 = franja.clone(); franja2.rotation.x = Math.PI * 0.62; g.add(franja2);
  // Alas en flecha
  function ala(envergadura, cuerda, flecha, espesor) {
    const s = new THREE.Shape();
    s.moveTo(0, 0);
    s.lineTo(-flecha, envergadura);
    s.lineTo(-flecha - cuerda * 0.45, envergadura);
    s.lineTo(-cuerda, 0);
    s.lineTo(0, 0);
    const e = new THREE.ExtrudeGeometry(s, { depth: espesor, bevelEnabled: true, bevelThickness: 0.06, bevelSize: 0.06, bevelSegments: 2 });
    e.rotateX(Math.PI / 2);
    return e;
  }
  [1, -1].forEach(lado => {
    const a = ala(9.5, 4.2, 4.6, 0.18);
    if (lado < 0) a.scale(1, 1, -1);
    a.translate(1.8, -0.45, 0);
    g.add(new THREE.Mesh(a, blanco));
    const e = ala(3.4, 2.1, 2.2, 0.1);
    if (lado < 0) e.scale(1, 1, -1);
    e.translate(-9.4, 0.7, 0);
    g.add(new THREE.Mesh(e, blanco));
    // Motor bajo el ala
    const mot = new THREE.CylinderGeometry(0.55, 0.48, 2.2, 16);
    mot.rotateZ(Math.PI / 2);
    mot.translate(1.2, -1.1, lado * 3.4);
    g.add(new THREE.Mesh(mot, blanco));
  });
  // Deriva naranja
  const d = new THREE.Shape();
  d.moveTo(0, 0); d.lineTo(-3.4, 4.2); d.lineTo(-5.2, 4.2); d.lineTo(-4.6, 0); d.lineTo(0, 0);
  const deriva = new THREE.ExtrudeGeometry(d, { depth: 0.16, bevelEnabled: true, bevelThickness: 0.05, bevelSize: 0.05, bevelSegments: 2 });
  deriva.translate(-7.6, 0.9, -0.08);
  g.add(new THREE.Mesh(deriva, naranja));
  // Tren de aterrizaje (se esconde al despegar)
  const tren = new THREE.Group();
  [[4.2, 0], [-1, 1.4], [-1, -1.4]].forEach(([x, z]) => {
    const pata = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 1.1, 6), mat('#cfd6d9'));
    pata.position.set(x, -1.5, z);
    const r = new THREE.Mesh(new THREE.CylinderGeometry(0.34, 0.34, 0.3, 14), mat('#c2c9cc'));
    r.rotation.x = Math.PI / 2; r.position.set(x, -2.05, z);
    tren.add(pata, r);
  });
  g.add(tren);
  g.userData.tren = tren;
  g.traverse(o => { if (o.isMesh) { o.castShadow = true; } });
  g.scale.setScalar(0.62);
  return g;
}
