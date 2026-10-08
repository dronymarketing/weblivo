// Susurros del Alma — flor de loto 3D en tiempo real.
// El scroll abre la flor y mueve la cámara en espiral (datos exportados de Blender);
// tocar o pasar el mouse por un pétalo lo dobla y rebota con un resorte amortiguado.
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';
import { MeshoptDecoder } from 'three/addons/libs/meshopt_decoder.module.js';

const P = new URLSearchParams(location.search);
const num = (k, d) => (P.has(k) ? parseFloat(P.get(k)) : d);
const V = '?v=8';   // versión de los archivos pesados (subirla cuando cambian)
const AJUSTES = {
  luz: num('luz', 0.775),            // multiplicador de las luces del estudio
  env: num('env', 0.9),          // intensidad del HDRI
  transl: num('transl', 0.68),    // translucidez de los pétalos (en Blender: 0.68)
  base: num('base', 0.9),          // brillo del núcleo en la base
  sat: num('sat', 1.35),           // saturación del pétalo (look Punchy de Blender)
  contraste: num('contraste', 1.29),
  relieve: num('relieve', 0.12),    // relieve de las venas (en Blender son sutiles)
  expo: num('expo', 1.3),
  reflejo: num('reflejo', 1.5),      // brillo de las luces que reflejan las facetas de la roca
  disp: num('disp', 4),          // dispersión del cristal (en Blender: IOR 1.665 / 1.7 / 1.735)
  sombras: num('sombras', 1.075),
  opacidad: num('opacidad', 1),     // pétalos apenas translúcidos (seda): se ven las siluetas de atrás    // sombras suaves entre pétalos (oclusión horneada)
  calidad: P.get('calidad'),     // forzar 'alta' | 'media' | 'baja'
};

const canvas = document.getElementById('flor');
const poster = document.querySelector('.hero-poster');
const debug = document.getElementById('debug');
if (P.has('debug')) debug.hidden = false;
// ?encuadre=blender: mismo encuadre que el render y sin textos encima (para comparar lado a lado)
if (P.has('encuadre')) document.documentElement.classList.add('comparar');

let renderer;
try {
  renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance', preserveDrawingBuffer: P.has('prueba') });
  if (!renderer.capabilities.isWebGL2) throw new Error('sin WebGL2');
} catch (e) {
  canvas.hidden = true; poster.hidden = false;
  throw e;
}
// El mismo manejo de color que el render de Blender: AgX con el look «Punchy» (potencia 1.35 y saturación
// 1.4 sobre la curva de AgX, como el OCIO de Blender). three trae AgX sin looks: se agrega como tone mapping propio.
THREE.ShaderChunk.tonemapping_pars_fragment = THREE.ShaderChunk.tonemapping_pars_fragment.replace(
  'vec3 CustomToneMapping( vec3 color ) { return color; }',
  `vec3 CustomToneMapping( vec3 color ) {
    const mat3 AgXInsetMatrix = mat3( vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ), vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ), vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 ) );
    const mat3 AgXOutsetMatrix = mat3( vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ), vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ), vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 ) );
    const float AgxMinEv = - 12.47393; const float AgxMaxEv = 4.026069;
    color *= toneMappingExposure;
    color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
    color = AgXInsetMatrix * color;
    color = max( color, 1e-10 ); color = log2( color );
    color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
    color = clamp( color, 0.0, 1.0 );
    color = agxDefaultContrastApprox( color );
    // look Punchy
    color = pow( max( color, vec3( 0.0 ) ), vec3( ${num('punchPot', 1.35).toFixed(3)} ) );
    float lumaP = dot( color, vec3( 0.2126, 0.7152, 0.0722 ) );
    color = lumaP + ${num('punchSat', 1.4).toFixed(3)} * ( color - lumaP );
    color = AgXOutsetMatrix * color;
    color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
    color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
    return clamp( color, 0.0, 1.0 );
  }`);
// medido contra los renders, el AgX sin look queda más cerca (ΔE 8.6 contra 9.2): el Punchy queda como opción (?punch)
renderer.toneMapping = P.has('punch') ? THREE.CustomToneMapping : THREE.AgXToneMapping;
renderer.toneMappingExposure = AJUSTES.expo;

const scene = new THREE.Scene();
const FONDO = new THREE.Color('#f6f5fb');
scene.background = FONDO;
const camera = new THREE.PerspectiveCamera(24, 1, 0.05, 60);
scene.add(camera);

// --- Estudio: ciclorama con degradé (también es lo que el cristal refracta) --------------------
const ciclo = new THREE.Mesh(
  new THREE.SphereGeometry(18, 48, 24),
  new THREE.ShaderMaterial({
    side: THREE.BackSide, depthWrite: false,
    uniforms: { cArriba: { value: new THREE.Color('#fdfcff') }, cHorizonte: { value: new THREE.Color('#f1eff8') }, cPiso: { value: new THREE.Color('#e9e6f3') } },
    vertexShader: 'varying vec3 vP; void main(){ vP = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.); }',
    fragmentShader: `varying vec3 vP; uniform vec3 cArriba, cHorizonte, cPiso;
      void main(){ float y = vP.y; vec3 c = y > 0. ? mix(cHorizonte, cArriba, smoothstep(0., .5, y)) : mix(cHorizonte, cPiso, smoothstep(0., -.25, y));
      gl_FragColor = vec4(c, 1.);
      #include <colorspace_fragment>
      }`,
  })
);
scene.add(ciclo);

// --- Calidad automática ------------------------------------------------------------------------
const esMovil = matchMedia('(pointer: coarse)').matches;
let nivel = AJUSTES.calidad || (esMovil ? 'media' : 'alta');
function aplicarCalidad() {
  const dprMax = nivel === 'alta' ? 1.5 : nivel === 'media' ? 1.25 : 1;   // como Noomo
  renderer.setPixelRatio(Math.min(devicePixelRatio, dprMax));
  if (cristal) {
    cristal.material.dispersion = nivel === 'baja' ? 0 : AJUSTES.disp;
    cristal.material.needsUpdate = true;
  }
  redimensionar();
}

// Sin postprocesado (como Noomo): se renderiza directo.

// --- Carga -------------------------------------------------------------------------------------
const loader = new GLTFLoader().setMeshoptDecoder(MeshoptDecoder);
const [gltf, datos, hdr] = await Promise.all([
  loader.loadAsync('assets/flor.glb' + V),
  fetch('assets/escena.json' + V).then((r) => r.json()),
  new RGBELoader().loadAsync('assets/estudio.hdr' + V),
]);
hdr.mapping = THREE.EquirectangularReflectionMapping;
scene.environment = hdr;
scene.environmentIntensity = AJUSTES.env;

// Luces del .blend, pegadas a la cámara (en Blender giraban con la cámara)
const luces = [];
for (const l of datos.lights) {
  const luz = new THREE.PointLight(new THREE.Color(...l.color), (l.energy / 100) * 1.6 * AJUSTES.luz, 0, 2);
  luz.position.set(...l.cam_local); luz.userData.base = (l.energy / 100) * 1.6;
  camera.add(luz); luces.push(luz);
}

const raiz = gltf.scene;
scene.add(raiz);
const porNombre = (n) => raiz.getObjectByProperty('name', n) || raiz.children.find((o) => o.name.startsWith(n));

// Cristal facetado que refracta (transmisión con dispersión = arcoíris en las aristas)
let cristal = null;
raiz.traverse((o) => { if (o.isMesh && o.parent && (o.name.startsWith('Roca') || o.parent.name.startsWith('Roca'))) cristal = o; });
// Valores del material Cristal_Cuarzo del .blend: vidrio con IOR 1.665 / 1.7 / 1.735 (un vidrio por color)
// y absorción lila (0.8, 0.68, 1) con densidad 0.9 → en three: distancia de atenuación ≈ 1.3
cristal.material = new THREE.MeshPhysicalMaterial({
  color: '#ffffff', metalness: 0, roughness: 0.03, transmission: 1, thickness: 1.4, ior: 1.7,
  dispersion: AJUSTES.disp, attenuationColor: new THREE.Color(0.8, 0.68, 1.0), attenuationDistance: num('atenuacion', 1.3),
  specularIntensity: 1, envMapIntensity: 1, flatShading: false,
});
// Facetas sin triángulos degenerados: el biselado de Blender deja triángulos de área ~0 y, con
// flatShading, su normal da NaN en algunos ángulos (pantalla negra). Se descartan y cada cara lleva
// su propia normal fija.
{
  const g = cristal.geometry.index ? cristal.geometry.toNonIndexed() : cristal.geometry;
  const pos = g.attributes.position, out = [];
  const a = new THREE.Vector3(), b = new THREE.Vector3(), c = new THREE.Vector3(), ab = new THREE.Vector3(), ac = new THREE.Vector3();
  let maxArea = 0; const areas = [];
  for (let i = 0; i < pos.count; i += 3) {
    a.fromBufferAttribute(pos, i); b.fromBufferAttribute(pos, i + 1); c.fromBufferAttribute(pos, i + 2);
    const ar = ab.subVectors(b, a).cross(ac.subVectors(c, a)).length(); areas.push(ar); maxArea = Math.max(maxArea, ar);
  }
  for (let i = 0, t = 0; i < pos.count; i += 3, t++) {
    if (areas[t] < maxArea * 1e-4) continue;
    for (let k = 0; k < 3; k++) { a.fromBufferAttribute(pos, i + k); out.push(a.x, a.y, a.z); }
  }
  const limpia = new THREE.BufferGeometry();
  limpia.setAttribute('position', new THREE.Float32BufferAttribute(out, 3));
  limpia.computeVertexNormals();
  console.info('cristal: triángulos', pos.count / 3, '→', out.length / 9);
  cristal.geometry = limpia;
}
const cajaRoca = new THREE.Box3().setFromObject(cristal);
const centroRoca = cajaRoca.getCenter(new THREE.Vector3());
const radioRoca = cajaRoca.getSize(new THREE.Vector3()).length() / 2;
// El archivo comprimido trae la roca con una escala de decuantización (~0.0001): three multiplica el
// grosor de la transmisión por esa escala, así que hay que compensarla o el cristal no refracta.
cristal.updateWorldMatrix(true, false);
const escRoca = cristal.matrixWorld.getMaxScaleOnAxis();
cristal.material.thickness = (radioRoca * 0.9) / escRoca;
// Estudio de reflejos del cristal, igual al de Blender: las luces de área (Softbox, contraluces) y los
// paneles negros van pegados a la cámara, así que lo que reflejan las facetas cambia mientras la cámara
// gira. Se rehace el mapa de reflejos (cubo chico) cuando se mueve la cámara.
const estudio = new THREE.Scene();
estudio.background = new THREE.Color().copy(FONDO).multiplyScalar(0.92);
const rigEstudio = new THREE.Group(); rigEstudio.matrixAutoUpdate = false; estudio.add(rigEstudio);
const cajaCentro = new THREE.Box3().setFromObject(cristal).getCenter(new THREE.Vector3());
const panelesNegros = [];
{
  const plano = (w, h, mat) => new THREE.Mesh(new THREE.PlaneGeometry(w, h), mat);
  for (const l of datos.lights) {
    const brillo = (l.energy / (l.size * l.size)) * 0.01 * AJUSTES.reflejo;
    const m = plano(l.size, l.size, new THREE.MeshBasicMaterial({ color: new THREE.Color(...l.color).multiplyScalar(brillo), side: THREE.DoubleSide }));
    m.position.set(...l.cam_local); m.userData.mira = true; m.userData.color = new THREE.Color(...l.color).multiplyScalar(brillo / AJUSTES.reflejo); rigEstudio.add(m);
  }
  // Paneles negros (Panel_Atras/Der/Izq): en Blender no los ve la cámara, pero sí los reflejos y lo que
  // se ve a través del cristal. Acá: en el estudio de reflejos y, en la escena, solo dentro de la pasada
  // de transmisión (la imagen que el cristal refracta), nunca en la imagen final.
  for (const pn of datos.paneles || []) {
    const col = new THREE.Color(...pn.color);
    const m = plano(pn.size[0], pn.size[1], new THREE.MeshBasicMaterial({ color: col, side: THREE.DoubleSide }));
    m.position.set(...pn.pos); m.quaternion.set(...pn.quat); m.scale.set(...pn.scale); rigEstudio.add(m);
    const u = { uSolo: { value: 0 } };
    const mat = new THREE.MeshBasicMaterial({ color: col, side: THREE.DoubleSide });
    mat.onBeforeCompile = (sh) => { Object.assign(sh.uniforms, u); sh.fragmentShader = sh.fragmentShader.replace('#include <common>', '#include <common>\nuniform float uSolo;').replace('void main() {', 'void main() { if (uSolo < .5) discard;'); };
    mat.onBeforeRender = (r) => { u.uSolo.value = r.getRenderTarget() ? 1 : 0; };
    const v = plano(pn.size[0], pn.size[1], mat);
    v.position.copy(m.position); v.quaternion.copy(m.quaternion); v.scale.copy(m.scale); v.frustumCulled = false;
    camera.add(v); panelesNegros.push(v);
  }
}
const cuboRT = new THREE.WebGLCubeRenderTarget(128, { type: THREE.HalfFloatType });
const cuboCam = new THREE.CubeCamera(0.05, 30, cuboRT);
cuboCam.position.copy(cajaCentro); estudio.add(cuboCam);
const pmrem = new THREE.PMREMGenerator(renderer);
let reflejoRT = null, ultimaCamEstudio = '', saltoEstudio = 0;
function actualizarEstudio(forzar) {
  // en calidad media/baja el mapa de reflejos se rehace cada algunos cuadros (es lo más caro de la roca)
  const cada = nivel === 'alta' ? 1 : nivel === 'media' ? 3 : 6;
  if (!forzar && reflejoRT && (++saltoEstudio % cada)) return;
  const clave = camera.position.toArray().map((x) => x.toFixed(3)).join() + camera.quaternion.toArray().map((x) => x.toFixed(3)).join();
  if (clave === ultimaCamEstudio) return;
  ultimaCamEstudio = clave;
  camera.updateMatrixWorld(); rigEstudio.matrix.copy(camera.matrixWorld); rigEstudio.updateMatrixWorld(true);
  const w = new THREE.Vector3();
  rigEstudio.children.forEach((m) => { if (m.userData.mira) { m.lookAt(cajaCentro); } });
  rigEstudio.updateMatrixWorld(true);
  cuboCam.update(renderer, estudio);
  reflejoRT = pmrem.fromCubemap(cuboRT.texture, reflejoRT);
  if (cristal.material.envMap !== reflejoRT.texture) { cristal.material.envMap = reflejoRT.texture; cristal.material.needsUpdate = true; }
}
// Lo que la transmisión en pantalla no puede hacer (Blender sí, con trazado de rayos): que cada
// faceta tenga su propio tono y que algunas reflejen por dentro los pétalos de arriba. Se imita por
// faceta: la normal de la cara elige un tono lila (de oscuro a claro) y si muestra los pétalos.
const uRoca = {
    uOsc: { value: new THREE.Color(P.get('rocaOsc') ? '#' + P.get('rocaOsc') : '#6f68bd') },
    uCla: { value: new THREE.Color(P.get('rocaCla') ? '#' + P.get('rocaCla') : '#dcd6f8') },
    uInterno: { value: num('interno', 0.3) },
    uLado: { value: num('lado', 0.85) },
    uFacetas: { value: num('facetas', 0.6) },
  };
{
  const u = uRoca;
  cristal.material.onBeforeCompile = (sh) => {
    Object.assign(sh.uniforms, u);
    sh.fragmentShader = sh.fragmentShader
      .replace('#include <common>', '#include <common>\nuniform vec3 uOsc, uCla; uniform float uInterno, uLado, uFacetas;')
      .replace('#include <transmission_fragment>', `#include <transmission_fragment>
      #ifdef USE_TRANSMISSION
      {
        vec3 nW = normalize(cross(dFdx(vWorldPosition), dFdy(vWorldPosition)));
        float h = fract(sin(dot(floor(nW * 3.0 + 0.5), vec3(12.9898, 78.233, 37.719))) * 43758.5453);
        float h2 = fract(h * 7.31 + 0.17);
        vec3 tono = mix(uOsc, uCla, smoothstep(0.0, 1.0, h));
        tono = mix(tono, min(uCla * 1.18, vec3(1.0)), smoothstep(0.45, -0.3, nW.y) * uLado);  // las caras de los costados, más claras (como en Blender)
        totalDiffuse *= tono;
        vec4 cl = projectionMatrix * viewMatrix * vec4(vWorldPosition, 1.0);
        vec2 uvR = cl.xy / cl.w * 0.5 + 0.5 + vec2((h2 - 0.5) * 0.3, 0.1 + 0.2 * h);
        vec3 adentro = textureLod(transmissionSamplerMap, clamp(uvR, 0.001, 0.999), 1.5).rgb;
        float k = smoothstep(0.4, 0.75, h2) * uInterno;
        totalDiffuse = mix(totalDiffuse, adentro * mix(uOsc, vec3(1.0), 0.55), k);
        // facetas internas: el rayo refractado atraviesa caras de adentro (en Blender se ven como zonas
        // claras y oscuras de borde nítido que se mueven con la cámara)
        // celdas irregulares (Voronoi) en una orientación torcida: astillas en ángulo, no una grilla
        const mat3 TORC = mat3(0.64, 0.58, -0.50, -0.70, 0.71, -0.02, 0.34, 0.39, 0.86);
        vec3 rd = TORC * (refract(-v, n, 1.0 / 1.7) * 2.6 + vWorldPosition * 1.3);
        vec3 ci = floor(rd), cf = fract(rd);
        float f1 = 9., f2 = 9.; vec3 id1 = vec3(0.);
        for (int x = -1; x <= 1; x++) for (int y = -1; y <= 1; y++) for (int z = -1; z <= 1; z++) {
          vec3 g = vec3(float(x), float(y), float(z));
          vec3 o = fract(sin(vec3(dot(ci + g, vec3(127.1, 311.7, 74.7)), dot(ci + g, vec3(269.5, 183.3, 246.1)), dot(ci + g, vec3(113.5, 271.9, 124.6)))) * 43758.5453);
          vec3 r = g + o - cf; float d = dot(r, r);
          if (d < f1) { f2 = f1; f1 = d; id1 = ci + g; } else if (d < f2) f2 = d;
        }
        float hc = fract(sin(dot(id1, vec3(41.3, 289.1, 97.7))) * 15731.7);
        float borde = (sqrt(f2) - sqrt(f1)) * 0.5;
        totalDiffuse *= mix(1. - .32 * uFacetas, 1. + .22 * uFacetas, hc);
        totalDiffuse += vec3(1.) * smoothstep(.03, .0, borde) * .3 * uFacetas * hc;
      }
      #endif`);
  };
}
function ubicarPlacas() {}

// Sombra de contacto suave bajo la roca (más barata que sombras reales)
{
  const c = document.createElement('canvas'); c.width = c.height = 128;
  const g = c.getContext('2d'); const gr = g.createRadialGradient(64, 64, 4, 64, 64, 64);
  gr.addColorStop(0, 'rgba(60,45,110,0.42)'); gr.addColorStop(1, 'rgba(60,45,110,0)');
  g.fillStyle = gr; g.fillRect(0, 0, 128, 128);
  const tam = Math.max(cajaRoca.max.x - cajaRoca.min.x, cajaRoca.max.z - cajaRoca.min.z) * 1.9;
  const sombra = new THREE.Mesh(new THREE.PlaneGeometry(tam, tam), new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(c), transparent: true, depthWrite: false }));
  sombra.rotation.x = -Math.PI / 2; sombra.position.set((cajaRoca.min.x + cajaRoca.max.x) / 2, cajaRoca.min.y + 0.002, (cajaRoca.min.z + cajaRoca.max.z) / 2);
  scene.add(sombra);
}

// Cáliz
raiz.traverse((o) => { if (o.isMesh && (o.name.startsWith('Caliz') || o.parent?.name.startsWith('Caliz'))) o.material = new THREE.MeshPhysicalMaterial({ color: '#ff6a1f', roughness: 0.5, sheen: 1, sheenColor: new THREE.Color('#ffb070'), emissive: new THREE.Color('#ff3a10'), emissiveIntensity: 0.35 }); });

// --- Pétalos: material "real", como el de Blender -------------------------------------------------
// Superficie horneada de Blender (venas y degradés del logo, atlas 4x4: assets/petalos_color) y
// translucidez: en Blender el pétalo es 68 % Translucent BSDF (la luz de atrás lo atraviesa y lo hace
// brillar). Acá se calcula la luz que llega a la cara de atrás (HDRI + luces del estudio) y se suma al frente.
// El doblez al tocarlos se hace en el vertex shader: rota cada vértice alrededor de la bisagra de la base,
// más cuanto más cerca de la punta (como una hoja real).
const texLoader = new THREE.TextureLoader();
const [mapaColor, mapaRelieve, mapaAO] = await Promise.all([
  texLoader.loadAsync('assets/petalos_color.webp' + V), texLoader.loadAsync('assets/petalos_relieve.webp' + V),
  texLoader.loadAsync('assets/petalos_ao.png' + V),
]);
// Oclusión horneada (herramientas/hornear_ao.mjs): una fila por pétalo y pose (1 de cada 2 muestras),
// una columna por vértice; R = cara del frente, G = cara de atrás
mapaAO.flipY = false; mapaAO.generateMipmaps = false; mapaAO.minFilter = mapaAO.magFilter = THREE.NearestFilter;
const AO_PASO = 2, AO_S = Math.ceil(datos.samples.length / AO_PASO);
// Corrección de color medida píxel a píxel contra el render (herramientas/ajuste_color.py), en lineal
const colorM = new THREE.Matrix3();
if (num('colorM', 1)) colorM.set(1.120, 0.047, 0.019, -0.015, 0.864, 0.058, 0.028, 0.143, 1.147);
const uAOComun = { uOpac: { value: AJUSTES.opacidad }, uBorde: { value: num('borde', 0.4) }, uColorM: { value: colorM }, uAO: { value: mapaAO }, uAOm: { value: 0 }, uAOFuerza: { value: AJUSTES.sombras } };
mapaColor.colorSpace = THREE.SRGBColorSpace;
mapaColor.anisotropy = mapaRelieve.anisotropy = renderer.capabilities.getMaxAnisotropy();
const petalos = [];
const N = datos.samples.length;
datos.petals.forEach((info, k) => {
  const nodo = porNombre(info.name);
  let malla = null; nodo.traverse((o) => { if (o.isMesh) malla = o; });
  const geo = malla.geometry;
  // gltfpack guarda los UV cuantizados (enteros): se normalizan a 0..1
  const uv = geo.attributes.uv; const aV = new Float32Array(uv.count), aU = new Float32Array(uv.count);
  let mnx = Infinity, mxx = -Infinity, mny = Infinity, mxy = -Infinity;
  for (let i = 0; i < uv.count; i++) { const x = uv.getX(i), y = uv.getY(i); mnx = Math.min(mnx, x); mxx = Math.max(mxx, x); mny = Math.min(mny, y); mxy = Math.max(mxy, y); }
  for (let i = 0; i < uv.count; i++) { aU[i] = (uv.getX(i) - mnx) / (mxx - mnx); aV[i] = 1 - (uv.getY(i) - mny) / (mxy - mny); }   // glTF guarda V invertido respecto de Blender: 0 = base, 1 = punta
  geo.setAttribute('aV', new THREE.BufferAttribute(aV, 1));
  geo.setAttribute('aU', new THREE.BufferAttribute(aU, 1));
  // UV del atlas horneado: el pétalo k ocupa la celda (k % 4, k / 4), con 3 % de margen (igual que en Blender)
  const uvA = new Float32Array(uv.count * 2), cx = k % 4, cy = Math.floor(k / 4);
  for (let i = 0; i < uv.count; i++) { uvA[i * 2] = (cx + 0.03 + aU[i] * 0.94) * 0.25; uvA[i * 2 + 1] = (cy + 0.03 + aV[i] * 0.94) * 0.25; }
  geo.setAttribute('uv', new THREE.BufferAttribute(uvA, 2));
  geo.deleteAttribute('color');

  const u = { ...uAOComun, uAOFila: { value: k * AO_S }, uBend: { value: 0 }, uPivot: { value: new THREE.Vector3() }, uAxis: { value: new THREE.Vector3(1, 0, 0) }, uTransl: { value: AJUSTES.transl }, uBase: { value: AJUSTES.base }, uSat: { value: AJUSTES.sat }, uContraste: { value: AJUSTES.contraste } };
  const mat = new THREE.MeshPhysicalMaterial({
    map: mapaColor, bumpMap: mapaRelieve, bumpScale: AJUSTES.relieve,
    side: THREE.DoubleSide, roughness: 0.42, metalness: 0, specularIntensity: 0.35,
    transparent: AJUSTES.opacidad < 1,
    sheen: 0.08, sheenRoughness: 0.3, sheenColor: new THREE.Color('#ffffff'), envMapIntensity: 1,
  });
  mat.onBeforeCompile = (sh) => {
    Object.assign(sh.uniforms, u);
    sh.vertexShader = sh.vertexShader
      .replace('#include <common>', `#include <common>
        attribute float aV; attribute float aU; varying float vV; varying float vU; varying vec2 vAO; uniform sampler2D uAO; uniform float uAOFila, uAOm; uniform float uBend; uniform vec3 uPivot; uniform vec3 uAxis;
        vec3 rotEje(vec3 v, vec3 k, float a){ float c = cos(a), s = sin(a); return v*c + cross(k, v)*s + k*dot(k, v)*(1.-c); }`)
      .replace('#include <defaultnormal_vertex>', `
        // al interpolar las muestras, la normal de algún vértice puede pasar por cero: sin esto da NaN
        if (dot(objectNormal, objectNormal) < 1e-10) objectNormal = vec3(0., 0., 1.);
        #include <defaultnormal_vertex>
        float angBend = uBend * pow(clamp(aV, 0., 1.), 1.6);
        transformedNormal = rotEje(transformedNormal, normalize((viewMatrix * vec4(uAxis, 0.)).xyz), angBend);`)
      .replace('#include <project_vertex>', `
        vec4 wp = modelMatrix * vec4(transformed, 1.0);
        wp.xyz = uPivot + rotEje(wp.xyz - uPivot, uAxis, angBend);
        vec4 mvPosition = viewMatrix * wp;
        gl_Position = projectionMatrix * mvPosition;
        vV = aV; vU = aU;
        { int s0 = int(floor(uAOm)), s1 = min(s0 + 1, ${AO_S - 1}), fila = int(uAOFila);
          vAO = mix(texelFetch(uAO, ivec2(gl_VertexID, fila + s0), 0).rg, texelFetch(uAO, ivec2(gl_VertexID, fila + s1), 0).rg, uAOm - floor(uAOm)); }`);
    sh.fragmentShader = sh.fragmentShader
      .replace('#include <common>', '#include <common>\nvarying float vV; varying float vU; varying vec2 vAO; uniform mat3 uColorM; uniform float uAOFuerza; uniform float uBorde; uniform float uOpac; uniform float uTransl; uniform float uBase; uniform float uSat; uniform float uContraste;')
      .replace('#include <map_fragment>', `
        // en la punta del pétalo el UV se comprime a un punto y el mipmap mezclaría los colores de otros
        // pétalos del atlas: se limita cuánto puede desenfocar
        vec4 sampledDiffuseColor = textureGrad(map, vMapUv, clamp(dFdx(vMapUv), -.003, .003), clamp(dFdy(vMapUv), -.003, .003));
        // look "Punchy" de AgX en Blender: más saturación y contraste en el color del pétalo
        { float lum = dot(sampledDiffuseColor.rgb, vec3(.2126, .7152, .0722));
          sampledDiffuseColor.rgb = max(mix(vec3(lum), sampledDiffuseColor.rgb, uSat), 0.);
          sampledDiffuseColor.rgb = pow(sampledDiffuseColor.rgb, vec3(uContraste));
          sampledDiffuseColor.rgb = max(uColorM * sampledDiffuseColor.rgb, 0.); }
        diffuseColor *= sampledDiffuseColor;
        // seda: la base es opaca y hacia la punta deja ver un poco lo que hay detrás
        diffuseColor.a *= mix(1., uOpac, smoothstep(.25, .85, vV));`)
      .replace('#include <emissivemap_fragment>', `#include <emissivemap_fragment>
        // sombras entre pétalos: la de esta cara para la luz directa y la de la cara opuesta para la que lo atraviesa
        float aoF = mix(1., gl_FrontFacing ? vAO.x : vAO.y, uAOFuerza), aoB = mix(1., gl_FrontFacing ? vAO.y : vAO.x, uAOFuerza);
        {
          // translucidez (Translucent BSDF de Blender): luz que llega a la cara de atrás del pétalo
          vec3 nB = -normal, atras = vec3(0.);
          #ifdef USE_ENVMAP
            atras += getIBLIrradiance(nB);
          #endif
          #if NUM_POINT_LIGHTS > 0
            for (int i = 0; i < NUM_POINT_LIGHTS; i++) {
              vec3 lv = pointLights[i].position + vViewPosition; float d = length(lv);
              atras += pointLights[i].color * getDistanceAttenuation(d, pointLights[i].distance, pointLights[i].decay) * max(dot(nB, lv / d), 0.);
            }
          #endif
          // la punta y los bordes son más finos: dejan pasar más luz (como la seda del render)
          float fino = 0.75 + 0.5 * smoothstep(0.3, 1., vV) + uBorde * smoothstep(0.3, 0.5, abs(vU - 0.5));
          totalEmissiveRadiance += diffuseColor.rgb * atras * RECIPROCAL_PI * uTransl * fino * aoB;
          diffuseColor.rgb *= 1. - uTransl;
          // núcleo encendido en la base (Nucleo_Emision del .blend)
          totalEmissiveRadiance += vec3(1., .36, .12) * smoothstep(.22, .0, vV) * uBase;
        }`)
      .replace('#include <aomap_fragment>', `#include <aomap_fragment>
        reflectedLight.directDiffuse *= aoF; reflectedLight.indirectDiffuse *= aoF;
        reflectedLight.indirectSpecular *= aoF; reflectedLight.directSpecular *= mix(1., aoF, .5);`)
      .replace('#include <dithering_fragment>', `#include <dithering_fragment>
        ${P.has('dbgao') ? 'gl_FragColor = vec4(vec3(gl_FrontFacing ? vAO.x : vAO.y), 1.);' : ''}
        ${P.has('dbgv') ? 'gl_FragColor = vec4(vV, vMapUv.x * 4. - floor(vMapUv.x * 4.), vMapUv.y * 4. - floor(vMapUv.y * 4.), 1.);' : ''}`);
  };
  malla.material = mat;

  const origen = new THREE.Vector3(...info.origin);
  const pivotes = info.pivot.map((p) => new THREE.Vector3(...p));
  const puntas = info.tip.map((p) => new THREE.Vector3(...p));
  petalos.push({ nombre: info.name, nodo, malla, u, origen, pivotes, puntas,
    k: petalos.length, ang: 0, vel: 0, meta: 0, puntaActual: new THREE.Vector3(), pivote: new THREE.Vector3(), eje: new THREE.Vector3(), radial: new THREE.Vector3() });
});
const mallas = petalos.map((p) => p.malla);

// Vecinos por ángulo alrededor del eje (para que el toque se propague como una ola suave)
const centroFlor = new THREE.Vector3(); petalos.forEach((p) => centroFlor.add(p.pivotes[N - 1])); centroFlor.divideScalar(petalos.length);
for (const p of petalos) {
  const a = Math.atan2(p.puntas[N - 1].z - p.pivotes[N - 1].z, p.puntas[N - 1].x - p.pivotes[N - 1].x);
  p.az = a;
  p.afuera = Math.hypot(p.puntas[N - 1].x - centroFlor.x, p.puntas[N - 1].z - centroFlor.z);   // qué tan de afuera es el pétalo
}
for (const p of petalos) {
  p.vecinos = petalos.filter((q) => q !== p).sort((a, b) => Math.abs(Math.atan2(Math.sin(a.az - p.az), Math.cos(a.az - p.az))) - Math.abs(Math.atan2(Math.sin(b.az - p.az), Math.cos(b.az - p.az)))).slice(0, 2);
}

// --- Placas de vidrio flotando (Card_1..4 del .blend, vidrio esmerilado) -------------------------
const placas = (datos.placas || []).map((pl) => {
  const g = new THREE.BoxGeometry(...pl.size); g.translate(...pl.center);
  // Vidrio esmerilado claro. Sin transmisión real: es más barato y así no refracta los paneles negros
  // del estudio (que solo tiene que ver la roca).
  const m = new THREE.Mesh(g, new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(0.85, 0.84, 0.93), roughness: 0.25, metalness: 0, transparent: true, opacity: num('placas', 0.3),
    clearcoat: 1, clearcoatRoughness: 0.05, specularIntensity: 1, envMapIntensity: num('placasBrillo', 2), depthWrite: false,
  }));
  // como el vidrio real: de frente casi transparente, de canto (y en los bordes) más visible
  const uP = { uCara: { value: num('placasCara', 0.06) }, uCanto: { value: num('placasCanto', 0.4) } };
  m.material.onBeforeCompile = (sh) => {
    Object.assign(sh.uniforms, uP);
    sh.fragmentShader = sh.fragmentShader.replace('#include <common>', '#include <common>\nuniform float uCara, uCanto;')
      .replace('#include <opaque_fragment>', `diffuseColor.a = mix(uCara, uCanto, pow(1. - abs(dot(normalize(normal), normalize(vViewPosition))), 3.));
      #include <opaque_fragment>`);
  };
  m.matrixAutoUpdate = true; scene.add(m);
  return { malla: m, frames: pl.frames };
});
const qP = new THREE.Quaternion(), qP2 = new THREE.Quaternion();
function moverPlacas(f) {
  const i = Math.min(Math.floor(f) - 1, datos.frames - 2), w = f - 1 - i;
  for (const pl of placas) {
    const a = pl.frames[i], b = pl.frames[i + 1];
    pl.malla.position.set(a[0] + (b[0] - a[0]) * w, a[1] + (b[1] - a[1]) * w, a[2] + (b[2] - a[2]) * w);
    qP.set(a[3], a[4], a[5], a[6]); qP2.set(b[3], b[4], b[5], b[6]); pl.malla.quaternion.slerpQuaternions(qP, qP2, w);
    pl.malla.scale.set(a[7], a[8], a[9]);
  }
}

// --- Tiempo de animación (cuadro de Blender) -------------------------------------------------------
const UP = new THREE.Vector3(0, 1, 0);
let cuadro = 1;
const qA = new THREE.Quaternion(), qB = new THREE.Quaternion();
function aplicarCuadro(f) {
  // cámara
  const i = Math.min(Math.floor(f) - 1, datos.frames - 2), w = f - 1 - i;
  const a = datos.camera[i], b = datos.camera[i + 1];
  camera.position.set(a[0] + (b[0] - a[0]) * w, a[1] + (b[1] - a[1]) * w, a[2] + (b[2] - a[2]) * w);
  qA.set(a[3], a[4], a[5], a[6]); qB.set(b[3], b[4], b[5], b[6]); camera.quaternion.slerpQuaternions(qA, qB, w);
  // apertura: interpola entre las dos muestras vecinas (morph targets)
  const s = datos.samples;
  let k = 0; while (k < N - 2 && s[k + 1] <= f) k++;
  const t = Math.min(1, Math.max(0, (f - s[k]) / (s[k + 1] - s[k])));
  uAOComun.uAOm.value = Math.min(AO_S - 1, (k + t) / AO_PASO);
  muestraK = k; muestraT = t;
  for (const p of petalos) {
    const inf = p.malla.morphTargetInfluences; inf.fill(0); inf[k] = 1 - t; inf[k + 1] = t;
    p.pivote.lerpVectors(p.pivotes[k], p.pivotes[k + 1], t);
    p.puntaActual.lerpVectors(p.puntas[k], p.puntas[k + 1], t);
    p.radial.copy(p.puntaActual).sub(p.pivote); p.radial.y = 0; p.radial.normalize();
    p.eje.crossVectors(UP, p.radial).normalize();
  }
  moverPlacas(f);
  actualizarEstudio();
}

// --- Tocar los pétalos ---------------------------------------------------------------------------
// Se agarra UN pétalo y sigue al dedo (o al mouse): si lo subís sube, si lo bajás baja. Al soltarlo vuelve a
// su lugar como una hoja: cae, rebota apenas y se queda. Si al moverse toca a otro pétalo, lo empuja en vez de
// atravesarlo (tabla precalculada en herramientas/limites.mjs: cuánto se puede mover cada pétalo en cada
// momento de la apertura antes de tocar a otro, y cuánto tiene que ceder el que toca).
// Si el dedo empieza fuera de los pétalos, la página hace scroll normal.
const LIMS = await fetch('assets/limites.json' + V).then((r) => r.json()).catch(() => null);
const ray = new THREE.Raycaster();
const puntero = new THREE.Vector2();
let agarrado = null, ultX = 0, ultY = 0;
function petaloEn(cx, cy) {
  const r = canvas.getBoundingClientRect();
  puntero.set(((cx - r.left) / r.width) * 2 - 1, -((cy - r.top) / r.height) * 2 + 1);
  ray.setFromCamera(puntero, camera);
  const hit = ray.intersectObjects(mallas, false)[0];
  return hit ? petalos.find((q) => q.malla === hit.object) : null;
}
// punta del pétalo en pantalla (px) si estuviera girado un ángulo th
const vPunta = new THREE.Vector3(), qPunta = new THREE.Quaternion();
function puntaEnPantalla(p, th) {
  vPunta.copy(p.puntaActual).sub(p.pivote).applyQuaternion(qPunta.setFromAxisAngle(p.eje, th)).add(p.pivote).project(camera);
  return [(vPunta.x * 0.5 + 0.5) * canvas.clientWidth, (-vPunta.y * 0.5 + 0.5) * canvas.clientHeight];
}
canvas.addEventListener('pointerdown', (ev) => {
  const p = petaloEn(ev.clientX, ev.clientY);
  if (!p) return;
  agarrado = p; p.meta = p.ang; ultX = ev.clientX; ultY = ev.clientY;
  canvas.setPointerCapture(ev.pointerId);
});
// en el celular: si el dedo empieza sobre un pétalo, ese gesto no hace scroll
canvas.addEventListener('touchstart', (ev) => { if (agarrado) ev.preventDefault(); }, { passive: false });
canvas.addEventListener('pointermove', (ev) => {
  if (!agarrado) { if (ev.pointerType === 'mouse') canvas.style.cursor = petaloEn(ev.clientX, ev.clientY) ? 'grab' : ''; return; }
  // cuánto tiene que girar el pétalo para que su punta acompañe al dedo (sobre la dirección en que puede moverse)
  const p = agarrado, a = puntaEnPantalla(p, p.meta), b = puntaEnPantalla(p, p.meta + 0.02);
  const dx = (b[0] - a[0]) / 0.02, dy = (b[1] - a[1]) / 0.02, d2 = dx * dx + dy * dy;
  if (d2 > 1) p.meta = Math.max(-MAXAGARRE, Math.min(MAXAGARRE, p.meta + ((ev.clientX - ultX) * dx + (ev.clientY - ultY) * dy) / d2));
  ultX = ev.clientX; ultY = ev.clientY;
  canvas.style.cursor = 'grabbing';
});
const soltar = () => { if (agarrado) { agarrado = null; canvas.style.cursor = ''; } };
for (const ev of ['pointerup', 'pointercancel', 'lostpointercapture', 'touchend', 'touchcancel']) canvas.addEventListener(ev, soltar);
addEventListener('pointerup', soltar); addEventListener('blur', soltar);
// (para pruebas) empuje programático
function empujar(p, fuerza) { p.vel += 3 * fuerza; }

// --- Física de hoja: resorte con amortiguación (rebota apenas) + contacto entre pétalos ------------------
const K = 22, C = 2.6, MAXANG = 0.6, MAXAGARRE = 0.45;
let muestraK = 0, muestraT = 0;
function limiteDe(k, dir) {      // dir 0 = hacia abajo (−), 1 = hacia arriba (+)
  if (!LIMS) return dir ? MAXANG : -MAXANG;
  const a = LIMS.lim[muestraK][k][dir], b = LIMS.lim[Math.min(muestraK + 1, LIMS.lim.length - 1)][k][dir];
  return a + (b - a) * muestraT;
}
const qTmp = new THREE.Quaternion(), vTmp = new THREE.Vector3();
function fisica(dt) {
  for (const p of petalos) {
    if (p === agarrado) {
      // sigue al dedo con una pizca de suavidad (la hoja tiene peso)
      const prev = p.ang; p.ang += (p.meta - p.ang) * Math.min(1, dt * 18); p.vel = (p.ang - prev) / Math.max(dt, 1e-3);
    } else {
      p.vel += (-K * p.ang - C * p.vel) * dt; p.ang += p.vel * dt;
    }
    p.ang = Math.max(-MAXANG, Math.min(MAXANG, p.ang));
  }
  // contacto: si el pétalo que movés pasa su límite libre, empuja a los que toca directamente (nada más).
  if (LIMS) {
    const empujados = new Set();
    let frente = agarrado ? [agarrado] : [];       // solo el pétalo que movés empuja; al soltar, todos vuelven libres
    for (let nivel = 0; nivel < 1 && frente.length; nivel++) {
      const siguiente = [];
      for (const p of frente) {
        const dir = p.ang >= 0 ? 1 : 0, lim = limiteDe(p.k, dir), exceso = p.ang - lim;
        if ((dir && exceso <= 0) || (!dir && exceso >= 0)) continue;
        for (const [j, r] of LIMS.contactos[muestraK][p.k][dir]) {
          const q = petalos[j]; if (q === agarrado || q === p || empujados.has(q)) continue;
          const req = Math.max(-1, Math.min(1, r)) * exceso * 0.85;
          if (req > 0 && q.ang < req) { q.ang = Math.min(MAXANG, req); q.vel = Math.max(q.vel, 0); empujados.add(q); siguiente.push(q); }
          else if (req < 0 && q.ang > req) { q.ang = Math.max(-MAXANG, req); q.vel = Math.min(q.vel, 0); empujados.add(q); siguiente.push(q); }
        }
      }
      frente = siguiente;
    }
  }
  for (const p of petalos) {
    // 35 % del movimiento es giro rígido en la bisagra; el resto, doblez progresivo hacia la punta (shader)
    qTmp.setFromAxisAngle(p.eje, p.ang * 0.35);
    p.nodo.quaternion.copy(qTmp);
    vTmp.copy(p.origen).sub(p.pivote).applyQuaternion(qTmp).add(p.pivote);
    p.nodo.position.copy(vTmp);
    p.u.uBend.value = p.ang * 0.65; p.u.uPivot.value.copy(p.pivote); p.u.uAxis.value.copy(p.eje);
  }
}

// --- Inmersión: partículas de luz (bokeh) ------------------------------------------------------------
const INMERSION = !P.has('encuadre') && !P.has('quieto') && !matchMedia('(prefers-reduced-motion: reduce)').matches;
let tiempo = 0;
let particulas = null;
if (INMERSION) {
  const n = esMovil ? 34 : 64;
  const pos = new Float32Array(n * 3), sem = new Float32Array(n * 4), col = new Float32Array(n * 3);
  const paleta = [new THREE.Color('#b9a2ff'), new THREE.Color('#ffc49e'), new THREE.Color('#a9c8ff'), new THREE.Color('#e7dcff')];
  for (let i = 0; i < n; i++) {
    const a = Math.random() * Math.PI * 2, r = 0.45 + Math.random() * 1.3;
    pos[i * 3] = centroFlor.x + Math.cos(a) * r; pos[i * 3 + 1] = centroFlor.y - 0.3 + Math.random() * 1.9; pos[i * 3 + 2] = centroFlor.z + Math.sin(a) * r;
    sem[i * 4] = Math.random(); sem[i * 4 + 1] = 0.6 + Math.random() * 0.8; sem[i * 4 + 2] = Math.random() * 6.28; sem[i * 4 + 3] = Math.random() < 0.2 ? 2.2 + Math.random() * 1.8 : 0.5 + Math.random() * 0.7;   // algunas grandes y muy tenues (bokeh)
    const c = paleta[i % paleta.length]; col.set([c.r, c.g, c.b], i * 3);
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.BufferAttribute(pos, 3)); g.setAttribute('aSem', new THREE.BufferAttribute(sem, 4)); g.setAttribute('aCol', new THREE.BufferAttribute(col, 3));
  particulas = new THREE.Points(g, new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    uniforms: { uT: { value: 0 }, uEsc: { value: 1 } },
    vertexShader: `attribute vec4 aSem; attribute vec3 aCol; uniform float uT, uEsc; varying vec3 vCol; varying float vA;
      void main() {
        vec3 p = position;
        float sube = fract(aSem.x + uT * 0.018 * aSem.y);                       // suben despacio y vuelven a empezar
        p.y += sube * 1.2 - 0.6;
        p.x += sin(uT * 0.35 * aSem.y + aSem.z) * 0.08; p.z += cos(uT * 0.3 * aSem.y + aSem.z) * 0.08;
        vec4 mv = modelViewMatrix * vec4(p, 1.0);
        gl_Position = projectionMatrix * mv;
        gl_PointSize = aSem.w * 0.035 * uEsc / -mv.z;           // ~3 cm de tamaño real
        vA = smoothstep(0., .15, sube) * smoothstep(1., .7, sube) * (0.55 + 0.45 * sin(uT * 1.7 * aSem.y + aSem.z));
        vA /= max(1., aSem.w * 0.8);                                              // las grandes, más tenues
        vCol = aCol;
      }`,
    fragmentShader: `varying vec3 vCol; varying float vA;
      void main() { float d = length(gl_PointCoord - .5); float a = smoothstep(.5, .0, d); a *= a;
        gl_FragColor = vec4(vCol * a * vA * 0.32, 1.0); }`,
  }));
  particulas.frustumCulled = false;
  scene.add(particulas);
}

// --- Scroll (nativo) con ScrollTrigger: abre la flor y mueve la cámara ---------------------------
const cards = [...document.querySelectorAll('.card')];
const marca = document.querySelector('.hero-marca');
const pista = document.querySelector('.hero-pista');
const cue = document.querySelector('.scroll-cue');
let progreso = 0;
gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.create({
  trigger: '#hero', start: 'top top', end: 'bottom bottom', scrub: true,
  onUpdate: (st) => { progreso = st.progress; },
});
function actualizarUI() {
  for (const c of cards) c.classList.toggle('visible', progreso >= +c.dataset.desde && progreso < +c.dataset.hasta);
  marca.style.opacity = progreso < 0.12 || progreso > 0.92 ? 1 : 0.0;
  pista.style.opacity = progreso < 0.05 || progreso > 0.93 ? 1 : 0;
  cue.style.opacity = progreso < 0.03 ? 1 : 0;
}

// --- Tamaño ------------------------------------------------------------------------------------
function redimensionar() {
  const w = canvas.clientWidth, h = canvas.clientHeight, asp = w / h;
  renderer.setSize(w, h, false);
  // misma cobertura horizontal que el render en escritorio; en vertical, se acerca un poco menos
  const hcob = asp >= 1 ? datos.hfov : datos.hfov * 0.62;
  camera.fov = THREE.MathUtils.radToDeg(2 * Math.atan(Math.tan(hcob / 2) / asp));
  camera.aspect = asp;
  if (P.has('encuadre')) camera.clearViewOffset(); else camera.setViewOffset(w, h, 0, -h * (asp >= 1 ? 0.07 : 0.05), w, h);
  camera.updateProjectionMatrix();
}
addEventListener('resize', redimensionar);
aplicarCalidad();

// --- Bucle -----------------------------------------------------------------------------------------
let visible = true;
new IntersectionObserver(([e]) => { visible = e.isIntersecting; }).observe(document.getElementById('hero'));
const reloj = new THREE.Clock();
let muestras = [], decidido = !!AJUSTES.calidad;
function bucle() {
  requestAnimationFrame(bucle);
  if (!visible) return;
  const dtReal = Math.min(reloj.getDelta(), 0.5), dt = Math.min(dtReal, 1 / 30);
  const objetivo = 1 + progreso * (datos.frames - 1);
  cuadro += (objetivo - cuadro) * Math.min(1, dt * 8);     // suaviza el scrub sin tocar el scroll
  tiempo += dt;
  aplicarCuadro(cuadro);
  ubicarPlacas();
  // la física avanza en tiempo real aunque el equipo dibuje pocos cuadros (pasos de 1/60 s)
  for (let resto = dtReal; resto > 1e-4; resto -= 1 / 60) fisica(Math.min(resto, 1 / 60));
  if (particulas) { particulas.material.uniforms.uT.value = tiempo; particulas.material.uniforms.uEsc.value = renderer.getPixelRatio() * canvas.clientHeight / (2 * Math.tan(THREE.MathUtils.degToRad(camera.fov) / 2)); }
  actualizarUI();
  renderer.render(scene, camera);
  // calidad automática: mide los primeros ~2 s y baja un nivel si no llega
  if (!decidido) {
    muestras.push(dt);
    if (muestras.length >= 120) {
      const fps = muestras.length / muestras.reduce((a, b) => a + b, 0);
      if (fps < 28 && nivel !== 'baja') { nivel = nivel === 'alta' ? 'media' : 'baja'; aplicarCalidad(); muestras = []; }
      else decidido = true;
    }
  }
  if (!debug.hidden) debug.textContent = `cuadro ${cuadro.toFixed(1)} · calidad ${nivel} · ${(1 / dt).toFixed(0)} fps`;
}
aplicarCuadro(1);
document.documentElement.classList.add('flor-lista');
// Ajuste en vivo (para calibrar contra el render sin recargar): __flor.ajustar({ expo: 1.1, sat: 1.4, ... })
function ajustar(o) {
  Object.assign(AJUSTES, o);
  renderer.toneMappingExposure = AJUSTES.expo;
  scene.environmentIntensity = AJUSTES.env;
  for (const l of luces) l.intensity = l.userData.base * AJUSTES.luz;
  for (const p of petalos) { p.u.uTransl.value = AJUSTES.transl; p.u.uBase.value = AJUSTES.base; p.u.uSat.value = AJUSTES.sat; p.u.uContraste.value = AJUSTES.contraste; p.malla.material.bumpScale = AJUSTES.relieve;
    const tr = AJUSTES.opacidad < 1; if (p.malla.material.transparent !== tr) { p.malla.material.transparent = tr; p.malla.material.needsUpdate = true; } }
  uAOComun.uOpac.value = AJUSTES.opacidad;
  uAOComun.uAOFuerza.value = AJUSTES.sombras;
  if (o.rocaOsc) uRoca.uOsc.value.set(o.rocaOsc); if (o.rocaCla) uRoca.uCla.value.set(o.rocaCla);
  if (o.facetas !== undefined) uRoca.uFacetas.value = o.facetas;
  if (o.interno !== undefined) uRoca.uInterno.value = o.interno; if (o.lado !== undefined) uRoca.uLado.value = o.lado;
  if (o.atenuacion !== undefined) cristal.material.attenuationDistance = o.atenuacion;
  if (o.disp !== undefined) cristal.material.dispersion = o.disp;
  if (o.reflejo !== undefined) { rigEstudio.children.forEach((m) => { if (m.userData.color) m.material.color.copy(m.userData.color).multiplyScalar(AJUSTES.reflejo); }); ultimaCamEstudio = ''; actualizarEstudio(true); }
}
window.__flor = { scene, cristal, petalos, empujar, aplicarCuadro, camera, renderer, ajustar, AJUSTES, setProgreso: (v) => { progreso = v; cuadro = 1 + v * (datos.frames - 1); } };
bucle();
