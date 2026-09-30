/* ============================================================
   HOLOGRAMA — el lugar reservado, como el auto azul translúcido
   de la referencia: relleno apenas visible, bordes que brillan
   (fresnel) y una trama que sube despacio.
   ============================================================ */
import * as THREE from 'three';

export function materialHolograma(color, borde) {
  return new THREE.ShaderMaterial({
    uniforms: {
      uColor: { value: new THREE.Color(color) },
      uBorde: { value: new THREE.Color(borde) },
      uOpac:  { value: 0 },
      uTiempo: { value: 0 }
    },
    vertexShader: /* glsl */`
      varying vec3 vN;
      varying vec3 vV;
      varying float vY;
      void main() {
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        vN = normalize(normalMatrix * normal);
        vV = normalize(-mv.xyz);
        vY = position.y;
        gl_Position = projectionMatrix * mv;
      }`,
    fragmentShader: /* glsl */`
      uniform vec3 uColor;
      uniform vec3 uBorde;
      uniform float uOpac;
      uniform float uTiempo;
      varying vec3 vN;
      varying vec3 vV;
      varying float vY;
      void main() {
        float f = pow(1.0 - abs(dot(normalize(vN), normalize(vV))), 1.8);
        float trama = smoothstep(0.55, 1.0, sin(vY * 30.0 - uTiempo * 2.4));
        float a = (0.2 + 0.62 * f + 0.1 * trama) * uOpac;
        vec3 c = mix(uColor, uBorde, clamp(f * 1.1 + trama * 0.25, 0.0, 1.0));
        gl_FragColor = vec4(c, a);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }`,
    transparent: true,
    depthWrite: false,
    side: THREE.DoubleSide
  });
}

/* Marco del cajón reservado: cuatro filetes en el piso y un relleno suave */
export function crearMarcoCajon(ancho, fondo, color) {
  const g = new THREE.Group();
  const mat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0, depthWrite: false });
  const relleno = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0, depthWrite: false });
  const e = 0.07;
  [[ancho, e, 0, -fondo / 2], [ancho, e, 0, fondo / 2], [e, fondo, -ancho / 2, 0], [e, fondo, ancho / 2, 0]].forEach(([w, d, x, z]) => {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, d), mat);
    m.rotation.x = -Math.PI / 2;
    m.position.set(x, 0.045, z);
    g.add(m);
  });
  const r = new THREE.Mesh(new THREE.PlaneGeometry(ancho - 0.25, fondo - 0.25), relleno);
  r.rotation.x = -Math.PI / 2;
  r.position.y = 0.04;
  g.add(r);
  g.userData.opacidad = (o) => { mat.opacity = o; relleno.opacity = o * 0.22; };
  return g;
}
