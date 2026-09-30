/* ============================================================
   PARKING DESPEGAR — escena 3D atada al scroll
   El cliente llega, deja el auto en el lugar reservado, la
   camioneta naranja del parking lo lleva a la terminal y el
   avión despega. Scroll nativo: la escena solo LEE la posición.

   Etapas (s):
     0  hero — vista general: playa, avenida y aeropuerto
     1  Llegada — el auto entra y el holograma marca su lugar
     2  Entrega — estaciona, baja con la valija y va a la camioneta
     3  Traslado — la camioneta naranja lo deja en la terminal
     4  Despegue — el avión sale por detrás del techo en arco
   ?s=2.5 en la URL fija la etapa (para revisar encuadres).
   ============================================================ */
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { crearMundo, crearPersona, crearAvion, texturaIsotipo, PLANO, COLOR } from './mundo.js';
import { geometriaAuto } from './autos.js';
import { materialHolograma, crearMarcoCajon } from './holograma.js';

/* ---------- utilidades ---------- */
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const lerp = (a, b, t) => a + (b - a) * t;
const tramo = (s, a, b) => clamp((s - a) / (b - a), 0, 1);
const suave = t => t * t * (3 - 2 * t);
const suave2 = t => t * t * t * (t * (t * 6 - 15) + 10);
const entrada = t => t * t;
const salida = t => 1 - (1 - t) * (1 - t);

function soportaWebGL() {
  try {
    const c = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && (c.getContext('webgl2') || c.getContext('webgl')));
  } catch (e) { return false; }
}

function curva(puntos) {
  return new THREE.CatmullRomCurve3(puntos.map(([x, z]) => new THREE.Vector3(x, 0, z)), false, 'centripetal', 0.5);
}

/* u (0–1, por largo de arco) del punto de la curva más cercano a (x, z) */
function uCerca(c, x, z) {
  let mejor = 0, dmin = Infinity;
  const p = new THREE.Vector3();
  for (let i = 0; i <= 600; i++) {
    c.getPointAt(i / 600, p);
    const d = (p.x - x) ** 2 + (p.z - z) ** 2;
    if (d < dmin) { dmin = d; mejor = i / 600; }
  }
  return mejor;
}

const tangente = new THREE.Vector3();
function ubicarEnCurva(obj, c, u, alReves) {
  u = clamp(u, 0, 1);
  c.getPointAt(u, obj.position);
  c.getTangentAt(Math.min(u, 0.9995), tangente);
  if (alReves) tangente.negate();
  obj.rotation.y = Math.atan2(tangente.x, tangente.z);
}

/* ---------- encuadres ----------
   t: punto mirado · yaw: 0 = cámara al sur mirando al norte, + gira al este
   pitch: altura en grados · dist: distancia */
const POSES = {
  general:  { t: [10, 0, -12],   yaw: -36, pitch: 31, dist: 100,
              movil: { t: [0, 0, -7], yaw: -56, pitch: 36, dist: 66 } },
  llegada:  { t: [-0.8, 0.4, 3.4], yaw: 62, pitch: 30, dist: 15 },
  entrega:  { t: [-3.2, 0.4, 4.6], yaw: 24, pitch: 38, dist: 17 },
  terminal: { t: [56, 2, -21],  yaw: 22, pitch: 21, dist: 30 },
};

function mezclarPose(a, b, t) {
  let dy = b.yaw - a.yaw;
  if (dy > 180) dy -= 360; if (dy < -180) dy += 360;
  return {
    t: [lerp(a.t[0], b.t[0], t), lerp(a.t[1], b.t[1], t), lerp(a.t[2], b.t[2], t)],
    yaw: a.yaw + dy * t,
    pitch: lerp(a.pitch, b.pitch, t),
    dist: lerp(a.dist, b.dist, t)
  };
}

function iniciar() {
  const lienzo = document.querySelector('[data-escena]');
  if (!lienzo) return;
  const raiz = document.documentElement;
  if (!soportaWebGL()) { raiz.classList.add('sin-3d'); return; }

  const movil = window.matchMedia('(max-width: 767px)').matches;
  const reducido = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas: lienzo, antialias: true, powerPreference: 'high-performance' });
  } catch (e) { raiz.classList.add('sin-3d'); return; }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, movil ? 1.6 : 1.75));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.NeutralToneMapping;
  renderer.toneMappingExposure = 1.02;

  const escena = new THREE.Scene();
  escena.background = new THREE.Color(COLOR.fondo);
  escena.fog = new THREE.Fog(COLOR.fondo, 80, 260);

  const pmrem = new THREE.PMREMGenerator(renderer);
  escena.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  escena.environmentIntensity = 0.32;

  /* ---------- luz de estudio, suave ---------- */
  const cielo = new THREE.HemisphereLight('#ffffff', '#d3ddda', 1.35);
  escena.add(cielo);
  const sol = new THREE.DirectionalLight('#fffdf8', 2.3);
  const dirSol = new THREE.Vector3(-0.55, 1, 0.42).normalize();
  sol.castShadow = true;
  sol.shadow.mapSize.set(movil ? 1024 : 2048, movil ? 1024 : 2048);
  sol.shadow.bias = -0.0004;
  sol.shadow.normalBias = 0.03;
  sol.shadow.radius = 3;
  const sc = sol.shadow.camera;
  sc.near = 1; sc.far = 220;
  escena.add(sol, sol.target);

  crearMundo(escena);

  /* ---------- autos estacionados (instanciados por modelo) ---------- */
  const P = PLANO;
  const MEZCLA = ['sedan', 'suv', 'sedan-sports', 'hatchback-sports', 'suv-luxury', 'sedan', 'suv'];
  const xCliente = P.xCajones[12];                       // cajón reservado, fila B2
  const zB2 = (P.filaB2.z0 + P.filaB2.z1) / 2;
  const lugares = [];
  let semilla = 11;
  const azar = () => { semilla = (semilla * 16807) % 2147483647; return semilla / 2147483647; };
  const filas = [
    { z: (P.filaA.z0 + P.filaA.z1) / 2, rot: Math.PI, lleno: 0.86 },
    { z: (P.filaB1.z0 + P.filaB1.z1) / 2, rot: 0, lleno: 0.7 },
    { z: zB2, rot: Math.PI, lleno: 0.74 }
  ];
  filas.forEach((f, fi) => {
    P.xCajones.forEach((x, i) => {
      const esCliente = fi === 2 && x === xCliente;
      const vecino = fi === 2 && Math.abs(x - xCliente) < 2.2 && !esCliente;
      if (esCliente) return;
      if (!vecino && azar() > f.lleno) return;
      lugares.push({
        modelo: MEZCLA[Math.floor(azar() * MEZCLA.length)],
        x: x + (azar() - 0.5) * 0.14,
        z: f.z + (azar() - 0.5) * 0.18,
        rot: f.rot + (azar() - 0.5) * 0.05,
        tono: 0.9 + azar() * 0.1
      });
    });
  });
  const porModelo = {};
  lugares.forEach(l => (porModelo[l.modelo] = porModelo[l.modelo] || []).push(l));
  const matAuto = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.6, metalness: 0 });
  const m4 = new THREE.Matrix4(), q = new THREE.Quaternion(), e = new THREE.Euler(), uno = new THREE.Vector3(1, 1, 1);
  const col = new THREE.Color();
  Object.keys(porModelo).forEach(nombre => {
    const lista = porModelo[nombre];
    const im = new THREE.InstancedMesh(geometriaAuto(nombre), matAuto, lista.length);
    lista.forEach((l, i) => {
      q.setFromEuler(e.set(0, l.rot, 0));
      m4.compose(new THREE.Vector3(l.x, 0, l.z), q, uno);
      im.setMatrixAt(i, m4);
      im.setColorAt(i, col.setScalar(l.tono));
    });
    im.castShadow = true;
    im.receiveShadow = true;
    escena.add(im);
  });

  /* ---------- el auto del cliente: blanco con vidrios oscuros ---------- */
  const geoCliente = geometriaAuto('sedan', { vidrio: '#2b3a44', moldura: '#dde2e4', oscuro: '#a9b3b8', stop: '#d8594b' });
  const cliente = new THREE.Mesh(geoCliente, matAuto);
  cliente.castShadow = true; cliente.receiveShadow = true;
  escena.add(cliente);

  /* ---------- holograma del lugar reservado ---------- */
  const holoMat = materialHolograma('#1d78b5', '#8fe3ff');
  const holo = new THREE.Mesh(geoCliente, holoMat);
  holo.position.set(xCliente, 0.02, zB2);
  holo.rotation.y = Math.PI;
  holo.renderOrder = 2;
  escena.add(holo);
  const marco = crearMarcoCajon(P.cajon.ancho - 0.2, P.cajon.fondo - 0.2, '#2a8fd0');
  marco.position.set(xCliente, 0, zB2);
  escena.add(marco);

  /* ---------- la camioneta naranja del parking ---------- */
  const van = new THREE.Mesh(
    geometriaAuto('van', { pintura: COLOR.naranja, vidrio: '#20323d', moldura: '#3b454c', oscuro: '#2a3238', goma: '#3a4247', llanta: '#c9cfd1' }),
    new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.5, metalness: 0 })
  );
  van.castShadow = true; van.receiveShadow = true;
  escena.add(van);
  {
    // Isotipo en los dos costados
    const tex = texturaIsotipo();
    const mt = new THREE.MeshStandardMaterial({ map: tex, transparent: true, roughness: 0.5, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -2 });
    [1, -1].forEach(lado => {
      const d = new THREE.Mesh(new THREE.PlaneGeometry(0.9, 0.9 * 130 / 195.18), mt);
      d.position.set(lado * 0.765, 0.78, -0.35);
      d.rotation.y = lado * Math.PI / 2;
      van.add(d);
    });
  }

  /* ---------- persona con valija ---------- */
  const persona = crearPersona('#f5f7f7');
  persona.visible = false;
  escena.add(persona);

  /* ---------- avión ---------- */
  const avion = crearAvion();
  escena.add(avion);
  const avionQuieto = crearAvion();
  avionQuieto.position.set(58, 1.5 * 0.62 + 0.55, -73);
  avionQuieto.rotation.y = -Math.PI / 2 + 0.5;
  escena.add(avionQuieto);

  /* ---------- tránsito en la avenida ---------- */
  const transito = [];
  [['suv', 1, 0], ['sedan-sports', -1, 40], ['hatchback-sports', 1, 95], ['sedan', -1, 130], ['suv-luxury', 1, 170]].forEach(([m, dir, base]) => {
    const a = new THREE.Mesh(geometriaAuto(m), matAuto);
    a.castShadow = true;
    a.position.z = dir > 0 ? P.carrilEste : P.carrilOeste;
    a.rotation.y = dir > 0 ? Math.PI / 2 : -Math.PI / 2;
    a.userData = { dir, base };
    escena.add(a);
    transito.push(a);
  });

  /* ---------- recorridos ---------- */
  const rutaCliente = curva([
    [-40, P.carrilEste], [-18, P.carrilEste], [-3, P.carrilEste], [3.2, 21.7], [5.6, 19.2],
    [5.9, 15.6], [5.9, 11.2], [5.4, 8.0], [3.6, 6.3], [1.8, 5.9], [0.5, 5.7], [-0.5, 5.0], [xCliente, 3.7],
    [xCliente, 2.6], [xCliente, zB2]
  ]);
  const uLlegada = uCerca(rutaCliente, 2.2, 5.95);
  const uInicio = uCerca(rutaCliente, -30, P.carrilEste);

  const vanX = -7.2, vanZ = 6.2;
  const rutaVan = curva([
    [vanX, vanZ], [-3, 6.2], [2, 6.2], [4.6, 7.3], [5.9, 10.2], [6.0, 13.6], [6.6, 17.4], [9.2, 21.3], [14, P.carrilEste],
    [30, P.carrilEste], [40.5, P.carrilEste], [43.6, 21], [P.acceso.x - 0.9, 17.5], [P.acceso.x - 0.9, 4],
    [P.acceso.x - 0.9, -12.8], [46.2, -16.7], [49.5, -17.6], [55, -17.7], [59, -17.7]
  ]);

  // Baja del lado del conductor, sale del cajón y va a la puerta corrediza (lado derecho = sur)
  const rutaPersona = curva([
    [xCliente - 1.05, zB2 - 0.2], [xCliente - 1.2, 3.9], [-3.1, 7.1], [-4.8, 7.45], [vanX + 0.9, vanZ + 1.2]
  ]);
  const largoPersona = rutaPersona.getLength();

  /* ---------- estado según la etapa s ---------- */
  function actualizarActores(s, tiempo) {
    // Auto del cliente
    let u;
    if (s < 0.15) u = uInicio;
    else if (s < 1) u = lerp(uInicio, uLlegada, suave(tramo(s, 0.15, 1)));
    else u = lerp(uLlegada, 1, salida(tramo(s, 1.0, 1.42)));
    ubicarEnCurva(cliente, rutaCliente, u);

    // Holograma: aparece al llegar, se funde cuando el auto ocupa el lugar
    const holoOn = tramo(s, 0.45, 0.85) * (1 - tramo(s, 1.28, 1.46));
    const pulso = 0.85 + 0.15 * Math.sin(tiempo * 2.6);
    holoMat.uniforms.uOpac.value = holoOn * (reducido ? 1 : pulso);
    holoMat.uniforms.uTiempo.value = tiempo;
    holo.visible = holoOn > 0.001;
    marco.userData.opacidad(holoOn * 0.9);
    marco.visible = holo.visible;

    // Persona: baja, camina a la camioneta y sube
    const aparece = tramo(s, 1.42, 1.52);
    const camina = tramo(s, 1.52, 1.93);
    const sube = tramo(s, 1.93, 2.0);
    persona.visible = aparece > 0 && sube < 1;
    if (persona.visible) {
      ubicarEnCurva(persona, rutaPersona, suave(camina));
      const esc = Math.min(suave(aparece), 1 - suave(sube));
      persona.scale.setScalar(Math.max(0.001, esc));
      const paso = Math.sin(suave(camina) * largoPersona * 3.1);
      const amp = camina > 0 && camina < 1 ? 0.55 : 0;
      persona.userData.piernas[0].rotation.x = paso * amp;
      persona.userData.piernas[1].rotation.x = -paso * amp;
    }

    // Camioneta
    const uv = suave2(tramo(s, 2.04, 2.96));
    ubicarEnCurva(van, rutaVan, uv);

    // Avión: carretea, despega y sube por detrás del techo
    const rueda = tramo(s, 2.98, 3.52);
    const sube2 = tramo(s, 3.5, 4.12);
    let x = lerp(14, 72, entrada(rueda));
    let y = 1.5 * 0.62 + 0.55;
    let pitch = 0;
    if (sube2 > 0) {
      x = 72 + sube2 * 120;
      y += 32 * Math.pow(sube2, 1.35);
      pitch = Math.min(0.2, sube2 * 1.2);
    }
    avion.position.set(x, y, P.pista.z);
    avion.rotation.set(0, 0, pitch);
    avion.userData.tren.scale.setScalar(sube2 > 0.18 ? 0.001 : 1);

    // Tránsito: avanza con el scroll
    transito.forEach(a => {
      const d = a.userData;
      let px = d.base + d.dir * s * 26;
      px = ((px + 80) % 280 + 280) % 280 - 80;
      a.position.x = px;
    });
  }

  /* ---------- cámara ---------- */
  const camara = new THREE.PerspectiveCamera(movil ? 44 : 34, 1, 0.5, 900);
  const vanPos = new THREE.Vector3();

  function pose(s) {
    const general = aspecto < 1 && POSES.general.movil ? POSES.general.movil : POSES.general;
    if (s <= 1) return mezclarPose(general, POSES.llegada, suave2(tramo(s, 0, 1)));
    if (s <= 2) return mezclarPose(POSES.llegada, POSES.entrega, suave2(tramo(s, 1, 2)));
    if (s <= 3) {
      const f = s - 2;
      vanPos.copy(van.position);
      const sigue = { t: [vanPos.x, 0.6, vanPos.z], yaw: lerp(-16, 30, f), pitch: 27, dist: 24 };
      let p = mezclarPose(POSES.entrega, sigue, suave2(tramo(f, 0.0, 0.22)));
      p = mezclarPose(p, POSES.terminal, suave2(tramo(f, 0.8, 1.0)));
      return p;
    }
    // Despegue: la cámara pasa por arriba de la terminal y acompaña al avión
    const f = s - 3;
    const sigue = { t: [avion.position.x - 3, avion.position.y + 1, avion.position.z], yaw: -68, pitch: 11, dist: 38 };
    return mezclarPose(POSES.terminal, sigue, suave2(tramo(f, 0.0, 0.45)));
  }

  let aspecto = 1, alto = 1, ancho = 1;
  const objetivo = new THREE.Vector3();
  function ubicarCamara(s) {
    const p = pose(s);
    // En celular vertical se aleja: el encuadre horizontal es angosto
    const lejos = aspecto < 1 ? 1 + (1 / aspecto - 1) * 0.42 : 1;
    const d = p.dist * lejos;
    const yaw = THREE.MathUtils.degToRad(p.yaw);
    const pitch = THREE.MathUtils.degToRad(p.pitch);
    objetivo.set(p.t[0], p.t[1], p.t[2]);
    camara.position.set(
      objetivo.x + d * Math.sin(yaw) * Math.cos(pitch),
      objetivo.y + d * Math.sin(pitch),
      objetivo.z + d * Math.cos(yaw) * Math.cos(pitch)
    );
    camara.lookAt(objetivo);
    escena.fog.near = d * 1.05;
    escena.fog.far = d * 3.4 + 60;
    // La sombra sigue a lo que se mira
    const r = clamp(d * 0.9, 22, 70);
    sc.left = -r; sc.right = r; sc.top = r; sc.bottom = -r;
    sc.updateProjectionMatrix();
    const paso = (2 * r) / sol.shadow.mapSize.x;
    sol.target.position.set(Math.round(objetivo.x / paso) * paso, 0, Math.round(objetivo.z / paso) * paso);
    sol.position.copy(sol.target.position).addScaledVector(dirSol, 100);
  }

  function medir() {
    ancho = lienzo.clientWidth || window.innerWidth;
    alto = lienzo.clientHeight || window.innerHeight;
    aspecto = ancho / alto;
    renderer.setSize(ancho, alto, false);
    camara.aspect = aspecto;
    // Celular: el texto va abajo, la escena se corre hacia arriba.
    // Escritorio: el texto va a la izquierda, la escena se corre a la derecha.
    if (aspecto < 1) camara.setViewOffset(ancho, alto, 0, alto * 0.13, ancho, alto);
    else camara.setViewOffset(ancho, alto, -ancho * 0.14, alto * 0.02, ancho, alto);
    camara.updateProjectionMatrix();
    pedir();
  }

  /* ---------- scroll → etapa ---------- */
  const pasos = Array.prototype.slice.call(document.querySelectorAll('[data-paso]'));
  const tapa = document.querySelector('.sobre-hero');
  let tramos = [];
  function medirTramos() {
    const vh = window.innerHeight;
    const y0 = window.scrollY || window.pageYOffset;
    tramos = pasos.map(el => {
      const r = el.getBoundingClientRect();
      const top = r.top + y0;
      return { a: top - vh * 0.55, b: top + r.height - vh * 1.15 };
    });
  }
  function etapaDelScroll() {
    const y = window.scrollY || window.pageYOffset;
    let s = 0;
    for (let i = 0; i < tramos.length; i++) {
      const t = tramos[i];
      if (y < t.a) break;
      s = i + tramo(y, t.a, Math.max(t.a + 1, t.b));
    }
    return s;
  }

  const fija = new URLSearchParams(location.search).get('s');
  let forzada = fija !== null ? parseFloat(fija) : null;
  let sMeta = forzada !== null ? forzada : 0;
  let sActual = sMeta;
  let visible = true, pendiente = false, ultimo = performance.now();
  const reloj = new THREE.Clock();

  function pedir() {
    if (pendiente || !visible) return;
    pendiente = true;
    requestAnimationFrame(cuadro);
  }

  function cuadro(ahora) {
    pendiente = false;
    const dt = Math.min(0.1, (ahora - ultimo) / 1000);
    ultimo = ahora;
    sMeta = forzada !== null ? forzada : etapaDelScroll();
    const k = reducido ? 1 : 1 - Math.exp(-dt * 5.5);
    sActual += (sMeta - sActual) * k;
    if (Math.abs(sMeta - sActual) < 0.0004) sActual = sMeta;
    const tiempo = reloj.getElapsedTime();
    actualizarActores(sActual, tiempo);
    ubicarCamara(sActual);
    renderer.render(escena, camara);
    // Sigue pidiendo cuadros mientras hay movimiento o holograma latiendo
    if (sActual !== sMeta || (holo.visible && !reducido)) pedir();
  }

  function alScroll() {
    // Tapado por el contenido de abajo: no se dibuja
    if (tapa) {
      // El nav sólido ya tapa lo que queda arriba: no hace falta seguir dibujando
      const nav = document.querySelector('.nav');
      visible = tapa.getBoundingClientRect().top > (nav ? nav.offsetHeight : 0);
    }
    pedir();
  }

  medir();
  medirTramos();
  window.addEventListener('scroll', alScroll, { passive: true });
  let anchoPrevio = window.innerWidth;
  const alCambiar = () => {
    medirTramos();
    if (window.innerWidth !== anchoPrevio || Math.abs(lienzo.clientHeight - alto) > 4) {
      anchoPrevio = window.innerWidth;
      medir();
    }
    pedir();
  };
  window.addEventListener('resize', alCambiar);
  if ('ResizeObserver' in window) new ResizeObserver(alCambiar).observe(document.body);
  document.addEventListener('visibilitychange', () => { if (!document.hidden) pedir(); });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(alCambiar);

  raiz.classList.add('con-3d');
  pedir();
  window.__pdEscena = { etapa: v => { forzada = sMeta = sActual = v; pedir(); } };
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', iniciar);
else iniciar();
