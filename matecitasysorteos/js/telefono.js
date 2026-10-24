// Mate · Citas y Sorteos — hero 3D: un celular que rota mientras el scroll
// recorre la app (ronda → cebar → match → sorteo). Mismo patrón de scroll
// nativo que susurros-3d: la escena vive en un canvas "sticky" (ver movil.css
// .hero/.hero__escena) y un ScrollTrigger en modo scrub solo LEE el progreso,
// nunca mueve la página (gsap + ScrollTrigger se cargan antes, como <script>
// clásicos, por eso son globales acá).
import * as THREE from 'three';

const canvas = document.getElementById('telefono-3d');
const fallback = document.getElementById('telefono-fallback');
const reducido = matchMedia('(prefers-reduced-motion: reduce)').matches;

let renderer;
try {
  renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
} catch (e) {
  canvas.hidden = true; fallback.hidden = false;
  throw e;
}

const VERDE_PROFUNDO = 0x053726, VERDE = 0x0a5338, LIMA = 0xe3ef26, BLANCO = 0xffffff;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 50);
camera.position.set(0, 0.15, 5.6);
scene.add(camera);

// ---------- Luces ----------
scene.add(new THREE.AmbientLight(0xbfe08c, 0.55));
const clave = new THREE.DirectionalLight(0xffffff, 1.5);
clave.position.set(2.2, 3, 3.5);
scene.add(clave);
const rebote = new THREE.DirectionalLight(0xcfffb0, 0.5);
rebote.position.set(-2.5, -1, -2);
scene.add(rebote);
const borde = new THREE.PointLight(LIMA, 6, 10, 2);
borde.position.set(-1.6, 1.4, 2.4);
scene.add(borde);

// ---------- Sombra de contacto (plano con degradé radial) ----------
{
  const c = document.createElement('canvas'); c.width = c.height = 128;
  const g = c.getContext('2d');
  const gr = g.createRadialGradient(64, 64, 4, 64, 64, 64);
  gr.addColorStop(0, 'rgba(2,20,13,.45)'); gr.addColorStop(1, 'rgba(2,20,13,0)');
  g.fillStyle = gr; g.fillRect(0, 0, 128, 128);
  const sombra = new THREE.Mesh(
    new THREE.PlaneGeometry(3.4, 3.4),
    new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(c), transparent: true, depthWrite: false })
  );
  sombra.rotation.x = -Math.PI / 2;
  sombra.position.y = -1.78;
  scene.add(sombra);
}

// ---------- Partículas (yerba, flotando) ----------
const N_PART = matchMedia('(pointer: coarse)').matches ? 16 : 26;
const partGeo = new THREE.BufferGeometry();
const partPos = new Float32Array(N_PART * 3);
const partSemilla = new Float32Array(N_PART * 2);
for (let i = 0; i < N_PART; i++) {
  const a = Math.random() * Math.PI * 2, r = 1.6 + Math.random() * 2.2;
  partPos[i * 3] = Math.cos(a) * r;
  partPos[i * 3 + 1] = -1.6 + Math.random() * 3.4;
  partPos[i * 3 + 2] = Math.sin(a) * r - 0.5;
  partSemilla[i * 2] = Math.random() * 10;
  partSemilla[i * 2 + 1] = 0.3 + Math.random() * 0.7;
}
partGeo.setAttribute('position', new THREE.BufferAttribute(partPos, 3));
partGeo.setAttribute('aSem', new THREE.BufferAttribute(partSemilla, 2));
const particulas = new THREE.Points(partGeo, new THREE.ShaderMaterial({
  transparent: true, depthWrite: false,
  uniforms: { uT: { value: 0 }, uColor: { value: new THREE.Color(LIMA) } },
  vertexShader: `attribute vec2 aSem; uniform float uT; varying float vA;
    void main(){
      vec3 p = position;
      float sube = fract((uT * 0.05 + aSem.x) * aSem.y);
      p.y += sube * 2.2 - 1.1;
      p.x += sin(uT * 0.3 + aSem.x) * 0.12;
      vec4 mv = modelViewMatrix * vec4(p, 1.0);
      gl_Position = projectionMatrix * mv;
      gl_PointSize = 60.0 / -mv.z;
      vA = smoothstep(0.0, 0.2, sube) * smoothstep(1.0, 0.75, sube);
    }`,
  fragmentShader: `uniform vec3 uColor; varying float vA;
    void main(){
      float d = length(gl_PointCoord - 0.5);
      float a = smoothstep(0.5, 0.0, d);
      gl_FragColor = vec4(uColor, a * a * vA * 0.75);
    }`,
}));
scene.add(particulas);

// ---------- Geometría: celular redondeado ----------
function formaRedondeada(w, h, r) {
  // Contorno antihorario (CCW): lo que espera ShapeGeometry para un contorno
  // exterior. Trazado en sentido horario, la triangulación sale rota.
  const s = new THREE.Shape();
  const x = -w / 2, y = -h / 2;
  s.moveTo(x + r, y);
  s.lineTo(x + w - r, y); s.quadraticCurveTo(x + w, y, x + w, y + r);
  s.lineTo(x + w, y + h - r); s.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  s.lineTo(x + r, y + h); s.quadraticCurveTo(x, y + h, x, y + h - r);
  s.lineTo(x, y + r); s.quadraticCurveTo(x, y, x + r, y);
  return s;
}

const ANCHO = 1.62, ALTO = 3.3, GROSOR = 0.16;
const grupoTelefono = new THREE.Group();
scene.add(grupoTelefono);

const cuerpo = new THREE.Mesh(
  new THREE.ExtrudeGeometry(formaRedondeada(ANCHO, ALTO, 0.34), { depth: GROSOR, bevelEnabled: true, bevelThickness: 0.02, bevelSize: 0.02, bevelSegments: 4, curveSegments: 16 }),
  new THREE.MeshStandardMaterial({ color: VERDE_PROFUNDO, roughness: 0.35, metalness: 0.25 })
);
cuerpo.position.z = -GROSOR / 2;
grupoTelefono.add(cuerpo);

// pantalla: dos capas superpuestas para hacer crossfade entre fases
function uvNormalizadas(geo) {
  // ShapeGeometry deja los UV iguales a las coordenadas x/y del contorno (sin
  // normalizar a 0..1), así que con una forma centrada en el origen la
  // textura queda mal mapeada (se ve casi toda recortada/estirada). Se
  // recalculan acá a partir del propio bounding box de la geometría.
  geo.computeBoundingBox();
  const bb = geo.boundingBox;
  const pos = geo.attributes.position;
  const uv = new Float32Array(pos.count * 2);
  for (let i = 0; i < pos.count; i++) {
    uv[i * 2] = (pos.getX(i) - bb.min.x) / (bb.max.x - bb.min.x);
    uv[i * 2 + 1] = (pos.getY(i) - bb.min.y) / (bb.max.y - bb.min.y);
  }
  geo.setAttribute('uv', new THREE.BufferAttribute(uv, 2));
}
function crearPantalla() {
  const geo = new THREE.ShapeGeometry(formaRedondeada(ANCHO - 0.12, ALTO - 0.12, 0.26));
  uvNormalizadas(geo);
  return new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ transparent: true, toneMapped: false, side: THREE.DoubleSide }));
}
// GROSOR/2 no alcanza: con bisel (bevelThickness 0.02) el cuerpo sobresale
// hasta GROSOR/2 + 0.02 de punta a punta, y la pantalla quedaba tapada detrás.
const Z_PANTALLA = GROSOR / 2 + 0.03;
const pantallaA = crearPantalla(); pantallaA.position.z = Z_PANTALLA;
const pantallaB = crearPantalla(); pantallaB.position.z = Z_PANTALLA + 0.003; pantallaB.material.opacity = 0;
grupoTelefono.add(pantallaA, pantallaB);

// notch de cámara
const notch = new THREE.Mesh(new THREE.CircleGeometry(0.035, 24), new THREE.MeshBasicMaterial({ color: 0x021510 }));
notch.position.set(0, ALTO / 2 - 0.16, Z_PANTALLA + 0.006);
grupoTelefono.add(notch);

grupoTelefono.scale.setScalar(0.82);

// ---------- Texturas de pantalla: UI ilustrativa de muestra ----------
const ANCHO_PX = 540, ALTO_PX = Math.round(ANCHO_PX * (ALTO - 0.12) / (ANCHO - 0.12));
function lienzo() {
  const c = document.createElement('canvas'); c.width = ANCHO_PX; c.height = ALTO_PX;
  return [c, c.getContext('2d')];
}
function rr(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}
function fondoBase(ctx) {
  const g = ctx.createLinearGradient(0, 0, 0, ALTO_PX);
  g.addColorStop(0, '#07422e'); g.addColorStop(1, '#042c1f');
  ctx.fillStyle = g; ctx.fillRect(0, 0, ANCHO_PX, ALTO_PX);
  ctx.fillStyle = 'rgba(255,255,255,.78)';
  ctx.font = '600 15px Montserrat, sans-serif';
  ctx.fillText('Mate', 26, 52);
}
function avatar(ctx, cx, cy, r, tono) {
  const g = ctx.createLinearGradient(cx - r, cy - r, cx + r, cy + r);
  g.addColorStop(0, tono[0]); g.addColorStop(1, tono[1]);
  ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.fillStyle = g; ctx.fill();
}
const TONOS = [['#E3EF26', '#8fae1c'], ['#bfe6a0', '#5a9a6a'], ['#f3f0c8', '#cdd77a']];

function frase0() {
  const [c, ctx] = lienzo(); fondoBase(ctx);
  ctx.fillStyle = 'rgba(255,255,255,.6)'; ctx.font = '500 13px Montserrat, sans-serif';
  ctx.fillText('TU RONDA DE HOY · 20 PERFILES', 26, 86);
  const tarjetas = [{ y: 120, esc: 1, rot: -0.03 }, { y: 112, esc: 0.97, rot: 0.025 }, { y: 104, esc: 0.94, rot: 0 }];
  tarjetas.reverse().forEach((t, i) => {
    ctx.save();
    ctx.translate(ANCHO_PX / 2, t.y + 260);
    ctx.rotate(t.rot); ctx.scale(t.esc, t.esc);
    rr(ctx, -210, -210, 420, 460, 28);
    const g = ctx.createLinearGradient(0, -210, 0, 250);
    g.addColorStop(0, '#0e5a3d'); g.addColorStop(1, '#083826');
    ctx.fillStyle = g; ctx.fill();
    if (i === tarjetas.length - 1) {
      avatar(ctx, 0, -70, 90, TONOS[0]);
      ctx.fillStyle = '#fff'; ctx.font = '600 24px Montserrat, sans-serif'; ctx.textAlign = 'center';
      ctx.fillText('Flor, 27', 0, 90);
      ctx.fillStyle = 'rgba(255,255,255,.65)'; ctx.font = '500 15px Montserrat, sans-serif';
      ctx.fillText('A 1 km · yerba suave', 0, 118);
      ctx.textAlign = 'left';
    }
    ctx.restore();
  });
  ctx.save(); ctx.translate(ANCHO_PX / 2, ALTO_PX - 90);
  [-70, 70].forEach((dx, i) => {
    ctx.beginPath(); ctx.arc(dx, 0, 38, 0, Math.PI * 2);
    ctx.fillStyle = i === 1 ? '#E3EF26' : 'rgba(255,255,255,.14)'; ctx.fill();
  });
  ctx.restore();
  return c;
}
function frase1() {
  const c = frase0(); const ctx = c.getContext('2d');
  ctx.save();
  ctx.translate(ANCHO_PX / 2, ALTO_PX / 2 - 40); ctx.rotate(-0.26);
  ctx.strokeStyle = '#E3EF26'; ctx.lineWidth = 7;
  rr(ctx, -150, -46, 300, 92, 18); ctx.stroke();
  ctx.fillStyle = '#E3EF26'; ctx.font = '800 40px Montserrat, sans-serif'; ctx.textAlign = 'center';
  ctx.fillText('CEBADO', 0, 14);
  ctx.textAlign = 'left';
  ctx.restore();
  return c;
}
function frase2() {
  const [c, ctx] = lienzo(); fondoBase(ctx);
  ctx.textAlign = 'center';
  avatar(ctx, ANCHO_PX / 2 - 60, 340, 86, TONOS[0]);
  avatar(ctx, ANCHO_PX / 2 + 60, 340, 86, TONOS[1]);
  ctx.fillStyle = '#E3EF26'; ctx.font = '400 54px Hellowin, serif';
  ctx.fillText('¡Match!', ANCHO_PX / 2, 500);
  ctx.fillStyle = 'rgba(255,255,255,.7)'; ctx.font = '500 16px Montserrat, sans-serif';
  ctx.fillText('Vos y Flor se cebaron', ANCHO_PX / 2, 534);
  rr(ctx, ANCHO_PX / 2 - 120, 590, 240, 64, 32);
  ctx.fillStyle = '#E3EF26'; ctx.fill();
  ctx.fillStyle = '#053726'; ctx.font = '700 18px Montserrat, sans-serif';
  ctx.fillText('Decí algo', ANCHO_PX / 2, 630);
  ctx.textAlign = 'left';
  return c;
}
function frase3() {
  const [c, ctx] = lienzo(); fondoBase(ctx);
  ctx.textAlign = 'center';
  ctx.fillStyle = 'rgba(255,255,255,.6)'; ctx.font = '500 13px Montserrat, sans-serif';
  ctx.fillText('SORTEO DE OCTUBRE', ANCHO_PX / 2, 110);
  rr(ctx, ANCHO_PX / 2 - 190, 150, 380, 300, 22);
  const g = ctx.createLinearGradient(0, 150, 0, 450);
  g.addColorStop(0, '#E3EF26'); g.addColorStop(1, '#aebf1d');
  ctx.fillStyle = g; ctx.fill();
  ctx.fillStyle = '#053726'; ctx.font = '700 22px Montserrat, sans-serif';
  ctx.fillText('TICKET #04821', ANCHO_PX / 2, 230);
  ctx.font = '500 14px Montserrat, sans-serif';
  ctx.fillText('Huella SHA-256 publicada', ANCHO_PX / 2, 400);
  ctx.fillStyle = 'rgba(255,255,255,.75)'; ctx.font = '500 16px Montserrat, sans-serif';
  ctx.fillText('Verificable con drand', ANCHO_PX / 2, 500);
  ctx.textAlign = 'left';
  return c;
}
const texturas = [frase0, frase1, frase2, frase3].map((fn) => {
  const t = new THREE.CanvasTexture(fn());
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
});
pantallaA.material.map = texturas[0];
pantallaB.material.map = texturas[1];

// ---------- Scroll: progreso 0..1 a lo largo del hero ----------
let progreso = 0;
if (window.gsap && window.ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.create({ trigger: '#inicio', start: 'top top', end: 'bottom bottom', scrub: true, onUpdate: (st) => { progreso = st.progress; } });
}

const fases = [...document.querySelectorAll('.hero__fase')];
const cue = document.getElementById('scroll-cue');
function actualizarUI() {
  const f = progreso * 4;
  const actual = Math.min(3, Math.floor(f));
  fases.forEach((el, i) => el.classList.toggle('es-visible', i === actual));
  cue.style.opacity = progreso < 0.04 ? 1 : 0;
}

let idxActual = 0, idxSiguiente = 1;
function actualizarPantalla() {
  const f = Math.min(3.999, Math.max(0, progreso * 4));
  const base = Math.floor(f);
  const mezcla = f - base;
  if (base !== idxActual) {
    idxActual = base; idxSiguiente = Math.min(3, base + 1);
    pantallaA.material.map = texturas[idxActual];
    pantallaB.material.map = texturas[idxSiguiente];
  }
  pantallaB.material.opacity = reducido ? 0 : mezcla;
}

// ---------- Tamaño ----------
function redimensionar() {
  const w = canvas.clientWidth, h = canvas.clientHeight;
  if (!w || !h) return;
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.setSize(w, h, false);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
}
addEventListener('resize', redimensionar);
redimensionar();

// ---------- Bucle ----------
let visible = true;
new IntersectionObserver(([e]) => { visible = e.isIntersecting; }).observe(document.getElementById('inicio'));
const reloj = new THREE.Clock();
const ANG_INICIO = THREE.MathUtils.degToRad(-22);
const ANG_RECORRIDO = THREE.MathUtils.degToRad(380);

function bucle() {
  requestAnimationFrame(bucle);
  if (!visible) return;
  const dt = Math.min(reloj.getDelta(), 1 / 30);
  const t = reloj.elapsedTime;

  if (!reducido) {
    grupoTelefono.rotation.y = ANG_INICIO + progreso * ANG_RECORRIDO;
    grupoTelefono.rotation.x = Math.sin(progreso * Math.PI * 2) * 0.05;
    grupoTelefono.position.y = -0.45 + Math.sin(t * 0.6) * 0.05;
  } else {
    grupoTelefono.rotation.y = ANG_INICIO + 0.35;
    grupoTelefono.position.y = -0.45;
  }
  particulas.material.uniforms.uT.value = t;

  actualizarPantalla();
  actualizarUI();
  renderer.render(scene, camera);
}
redimensionar();
bucle();
