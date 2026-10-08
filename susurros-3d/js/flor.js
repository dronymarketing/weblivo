// Susurros del Alma — flor de loto 3D en tiempo real.
// El scroll abre la flor y mueve la cámara en espiral (datos exportados de Blender);
// tocar o pasar el mouse por un pétalo lo dobla y rebota con un resorte amortiguado.
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';
import { MeshoptDecoder } from 'three/addons/libs/meshopt_decoder.module.js';

const P = new URLSearchParams(location.search);
const num = (k, d) => (P.has(k) ? parseFloat(P.get(k)) : d);
const AJUSTES = {
  luz: num('luz', 1),            // multiplicador de las luces del estudio
  env: num('env', 0.9),          // intensidad del HDRI
  transl: num('transl', 0.68),    // translucidez de los pétalos (en Blender: 0.68)
  base: num('base', 1.6),          // brillo del núcleo en la base
  sat: num('sat', 1.35),           // saturación del pétalo (look Punchy de Blender)
  contraste: num('contraste', 1.25),
  relieve: num('relieve', 0.12),    // relieve de las venas (en Blender son sutiles)
  expo: num('expo', 0.95),
  reflejo: num('reflejo', 4),      // brillo de las luces que reflejan las facetas de la roca
  disp: num('disp', 4),          // dispersión del cristal (en Blender: IOR 1.665 / 1.7 / 1.735)
  sombras: num('sombras', 1),    // sombras suaves entre pétalos (oclusión horneada)
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
renderer.toneMapping = THREE.AgXToneMapping;   // el mismo manejo de color que el render de Blender
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
  loader.loadAsync('assets/flor.glb'),
  fetch('assets/escena.json').then((r) => r.json()),
  new RGBELoader().loadAsync('assets/estudio.hdr'),
]);
hdr.mapping = THREE.EquirectangularReflectionMapping;
scene.environment = hdr;
scene.environmentIntensity = AJUSTES.env;

// Luces del .blend, pegadas a la cámara (en Blender giraban con la cámara)
for (const l of datos.lights) {
  const luz = new THREE.PointLight(new THREE.Color(...l.color), (l.energy / 100) * 1.6 * AJUSTES.luz, 0, 2);
  luz.position.set(...l.cam_local);
  camera.add(luz);
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
    m.position.set(...l.cam_local); m.userData.mira = true; rigEstudio.add(m);
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
let reflejoRT = null, ultimaCamEstudio = '';
function actualizarEstudio() {
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
{
  const u = {
    uOsc: { value: new THREE.Color(P.get('rocaOsc') ? '#' + P.get('rocaOsc') : '#6f68bd') },
    uCla: { value: new THREE.Color(P.get('rocaCla') ? '#' + P.get('rocaCla') : '#dcd6f8') },
    uInterno: { value: num('interno', 0.9) },
    uLado: { value: num('lado', 0.85) },
  };
  cristal.material.onBeforeCompile = (sh) => {
    Object.assign(sh.uniforms, u);
    sh.fragmentShader = sh.fragmentShader
      .replace('#include <common>', '#include <common>\nuniform vec3 uOsc, uCla; uniform float uInterno, uLado;')
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
  texLoader.loadAsync('assets/petalos_color.webp'), texLoader.loadAsync('assets/petalos_relieve.webp'),
  texLoader.loadAsync('assets/petalos_ao.png'),
]);
// Oclusión horneada (herramientas/hornear_ao.mjs): una fila por pétalo y pose (1 de cada 2 muestras),
// una columna por vértice; R = cara del frente, G = cara de atrás
mapaAO.flipY = false; mapaAO.generateMipmaps = false; mapaAO.minFilter = mapaAO.magFilter = THREE.NearestFilter;
const AO_PASO = 2, AO_S = Math.ceil(datos.samples.length / AO_PASO);
// Corrección de color medida píxel a píxel contra el render (herramientas/ajuste_color.py), en lineal
const colorM = new THREE.Matrix3();
if (num('colorM', 1)) colorM.set(1.120, 0.047, 0.019, -0.015, 0.864, 0.058, 0.028, 0.143, 1.147);
const uAOComun = { uColorM: { value: colorM }, uAO: { value: mapaAO }, uAOm: { value: 0 }, uAOFuerza: { value: AJUSTES.sombras } };
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
    sheen: 0.08, sheenRoughness: 0.3, sheenColor: new THREE.Color('#ffffff'), envMapIntensity: 1,
  });
  mat.onBeforeCompile = (sh) => {
    Object.assign(sh.uniforms, u);
    sh.vertexShader = sh.vertexShader
      .replace('#include <common>', `#include <common>
        attribute float aV; attribute float aU; varying float vV; varying vec2 vAO; uniform sampler2D uAO; uniform float uAOFila, uAOm; uniform float uBend; uniform vec3 uPivot; uniform vec3 uAxis;
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
        vV = aV;
        { int s0 = int(floor(uAOm)), s1 = min(s0 + 1, ${AO_S - 1}), fila = int(uAOFila);
          vAO = mix(texelFetch(uAO, ivec2(gl_VertexID, fila + s0), 0).rg, texelFetch(uAO, ivec2(gl_VertexID, fila + s1), 0).rg, uAOm - floor(uAOm)); }`);
    sh.fragmentShader = sh.fragmentShader
      .replace('#include <common>', '#include <common>\nvarying float vV; varying vec2 vAO; uniform mat3 uColorM; uniform float uAOFuerza; uniform float uTransl; uniform float uBase; uniform float uSat; uniform float uContraste;')
      .replace('#include <map_fragment>', `
        // en la punta del pétalo el UV se comprime a un punto y el mipmap mezclaría los colores de otros
        // pétalos del atlas: se limita cuánto puede desenfocar
        vec4 sampledDiffuseColor = textureGrad(map, vMapUv, clamp(dFdx(vMapUv), -.003, .003), clamp(dFdy(vMapUv), -.003, .003));
        // look "Punchy" de AgX en Blender: más saturación y contraste en el color del pétalo
        { float lum = dot(sampledDiffuseColor.rgb, vec3(.2126, .7152, .0722));
          sampledDiffuseColor.rgb = max(mix(vec3(lum), sampledDiffuseColor.rgb, uSat), 0.);
          sampledDiffuseColor.rgb = pow(sampledDiffuseColor.rgb, vec3(uContraste));
          sampledDiffuseColor.rgb = max(uColorM * sampledDiffuseColor.rgb, 0.); }
        diffuseColor *= sampledDiffuseColor;`)
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
          float fino = 0.75 + 0.5 * smoothstep(0.3, 1., vV);          // la punta es más fina: deja pasar más luz
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
    ang: 0, vel: 0, giro: 0, velGiro: 0, pivote: new THREE.Vector3(), eje: new THREE.Vector3(), radial: new THREE.Vector3() });
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
  for (const p of petalos) {
    const inf = p.malla.morphTargetInfluences; inf.fill(0); inf[k] = 1 - t; inf[k + 1] = t;
    p.pivote.lerpVectors(p.pivotes[k], p.pivotes[k + 1], t);
    p.radial.lerpVectors(p.puntas[k], p.puntas[k + 1], t).sub(p.pivote); p.radial.y = 0; p.radial.normalize();
    p.eje.crossVectors(UP, p.radial).normalize();
  }
  moverPlacas(f);
  actualizarEstudio();
}

// --- Tocar los pétalos: resorte amortiguado -----------------------------------------------------
const ray = new THREE.Raycaster();
const puntero = new THREE.Vector2(-9, -9);
let ultimoX = 0, ultimoY = 0, ultimoT = 0, ultimoTocado = null;
function alMover(ev) {
  const r = canvas.getBoundingClientRect();
  puntero.set(((ev.clientX - r.left) / r.width) * 2 - 1, -((ev.clientY - r.top) / r.height) * 2 + 1);
  const ahora = performance.now(), dt = Math.max(8, ahora - ultimoT);
  const vel = Math.min(3, Math.hypot(ev.clientX - ultimoX, ev.clientY - ultimoY) / dt);   // px/ms
  const dx = ev.clientX - ultimoX;
  ultimoX = ev.clientX; ultimoY = ev.clientY; ultimoT = ahora;
  ray.setFromCamera(puntero, camera);
  const hit = ray.intersectObjects(mallas, false)[0];
  const p = hit ? petalos.find((q) => q.malla === hit.object) : null;
  if (p && (p !== ultimoTocado || vel > 0.4)) empujar(p, 0.55 + vel * 0.6, dx);
  ultimoTocado = p;
  canvas.style.cursor = p ? 'pointer' : '';
}
function empujar(p, fuerza, dx) {
  p.vel += 3.4 * fuerza;                        // hacia afuera (se abre y vuelve)
  p.velGiro += Math.sign(dx || 1) * 0.6 * fuerza; // se tuerce apenas en el sentido del gesto
  // Para que no se atraviesen: los pétalos que están por fuera en la misma zona se mueven casi igual
  // (como un bloque); los de adentro y los de los costados, menos.
  for (const q of petalos) {
    if (q === p) continue;
    const dAz = Math.abs(Math.atan2(Math.sin(q.az - p.az), Math.cos(q.az - p.az)));
    const cerca = Math.exp(-((dAz / 0.7) ** 2));
    q.vel += 3.4 * fuerza * cerca * (q.afuera >= p.afuera - 0.02 ? 0.9 : 0.35);
  }
}
canvas.addEventListener('pointermove', alMover);
canvas.addEventListener('pointerdown', (ev) => { alMover(ev); });
canvas.addEventListener('pointerleave', () => { ultimoTocado = null; canvas.style.cursor = ''; });

const K = 34, C = 3.6, LIM = 0.35;   // rigidez, amortiguación (sub-crítica → rebota), ángulo máximo
const qTmp = new THREE.Quaternion(), vTmp = new THREE.Vector3();
function fisica(dt) {
  for (const p of petalos) {
    p.vel += (-K * p.ang - C * p.vel) * dt; p.ang += p.vel * dt;
    p.velGiro += (-K * p.giro - C * p.velGiro) * dt; p.giro += p.velGiro * dt;
    p.ang = Math.max(-LIM * 0.4, Math.min(LIM, p.ang)); p.giro = Math.max(-LIM * 0.5, Math.min(LIM * 0.5, p.giro));
    // 35 % del movimiento es giro rígido en la bisagra; el resto, doblez progresivo hacia la punta (shader)
    qTmp.setFromAxisAngle(p.eje, p.ang * 0.35);
    const qRoll = new THREE.Quaternion().setFromAxisAngle(p.radial.clone().applyAxisAngle(p.eje, Math.PI / 2), p.giro * 0.3);
    qTmp.multiply(qRoll);
    p.nodo.quaternion.copy(qTmp);
    vTmp.copy(p.origen).sub(p.pivote).applyQuaternion(qTmp).add(p.pivote);
    p.nodo.position.copy(vTmp);
    p.u.uBend.value = p.ang * 0.65; p.u.uPivot.value.copy(p.pivote); p.u.uAxis.value.copy(p.eje);
  }
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
  const dt = Math.min(reloj.getDelta(), 1 / 30);
  const objetivo = 1 + progreso * (datos.frames - 1);
  cuadro += (objetivo - cuadro) * Math.min(1, dt * 8);     // suaviza el scrub sin tocar el scroll
  aplicarCuadro(cuadro);
  ubicarPlacas();
  fisica(dt);
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
window.__flor = { scene, cristal, petalos, empujar, aplicarCuadro, camera, renderer, setProgreso: (v) => { progreso = v; cuadro = 1 + v * (datos.frames - 1); } };
bucle();
