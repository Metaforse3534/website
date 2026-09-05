import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

const earthVertex = `
  varying vec3 vObjectPosition;
  varying vec3 vWorldNormal;
  varying vec3 vWorldPosition;
  void main() {
    vObjectPosition = position;
    vWorldNormal = normalize(mat3(modelMatrix) * normal);
    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
    vWorldPosition = worldPosition.xyz;
    gl_Position = projectionMatrix * viewMatrix * worldPosition;
  }
`

const noiseFunctions = `
  float hash(vec3 p) {
    p = fract(p * 0.3183099 + vec3(.11, .17, .13));
    p *= 17.0;
    return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
  }
  float noise(vec3 p) {
    vec3 i = floor(p);
    vec3 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(mix(mix(hash(i), hash(i + vec3(1,0,0)), f.x),
                   mix(hash(i + vec3(0,1,0)), hash(i + vec3(1,1,0)), f.x), f.y),
               mix(mix(hash(i + vec3(0,0,1)), hash(i + vec3(1,0,1)), f.x),
                   mix(hash(i + vec3(0,1,1)), hash(i + vec3(1,1,1)), f.x), f.y), f.z);
  }
  float fbm(vec3 p) {
    float value = 0.0;
    float amplitude = 0.5;
    for (int i = 0; i < 5; i++) {
      value += amplitude * noise(p);
      p = p * 2.03 + vec3(7.1, 3.4, 5.8);
      amplitude *= 0.5;
    }
    return value;
  }
`

const earthFragment = `
  uniform float uTime;
  varying vec3 vObjectPosition;
  varying vec3 vWorldNormal;
  varying vec3 vWorldPosition;
  ${noiseFunctions}
  void main() {
    vec3 p = normalize(vObjectPosition);
    float terrain = fbm(p * 3.25 + vec3(0.0, uTime * 0.0015, 0.0));
    terrain += noise(p * 13.0) * 0.12;
    float land = smoothstep(0.50, 0.59, terrain);
    float highlands = smoothstep(0.62, 0.74, terrain) * land;
    float ice = smoothstep(0.72, 0.94, abs(p.y));
    vec3 ocean = mix(vec3(0.005, 0.025, 0.045), vec3(0.015, 0.11, 0.17), noise(p * 8.0));
    vec3 ground = mix(vec3(0.055, 0.12, 0.09), vec3(0.24, 0.23, 0.14), highlands);
    vec3 base = mix(ocean, ground, land);
    base = mix(base, vec3(0.68, 0.75, 0.78), ice * 0.82);
    vec3 normal = normalize(vWorldNormal);
    float sun = max(dot(normal, normalize(vec3(-1.7, 0.8, 2.4))), 0.0);
    float night = 1.0 - smoothstep(0.02, 0.3, sun);
    float cityMask = step(0.82, noise(p * 39.0 + vec3(2.0))) * land * night;
    float rim = pow(1.0 - max(dot(normal, normalize(cameraPosition - vWorldPosition)), 0.0), 3.5);
    vec3 color = base * (0.105 + sun * 1.15);
    color += cityMask * vec3(1.0, 0.48, 0.10) * 1.9;
    color += rim * vec3(0.02, 0.20, 0.38) * 1.4;
    gl_FragColor = vec4(color, 1.0);
  }
`

const cloudFragment = `
  uniform float uTime;
  varying vec3 vObjectPosition;
  ${noiseFunctions}
  void main() {
    vec3 p = normalize(vObjectPosition);
    float cloud = fbm(p * 7.0 + vec3(uTime * 0.005, 0.0, 0.0));
    cloud = smoothstep(0.58, 0.74, cloud);
    gl_FragColor = vec4(vec3(0.72, 0.82, 0.86), cloud * 0.34);
  }
`

function Stars() {
  const positions = useMemo(() => {
    let seed = 1729
    const random = () => {
      seed = (seed * 16807) % 2147483647
      return (seed - 1) / 2147483646
    }
    const values = new Float32Array(900 * 3)
    for (let index = 0; index < 900; index += 1) {
      const radius = 8 + random() * 11
      const theta = random() * Math.PI * 2
      const phi = Math.acos(2 * random() - 1)
      values[index * 3] = radius * Math.sin(phi) * Math.cos(theta)
      values[index * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      values[index * 3 + 2] = radius * Math.cos(phi)
    }
    return values
  }, [])
  return <points><bufferGeometry><bufferAttribute attach="attributes-position" args={[positions, 3]} /></bufferGeometry><pointsMaterial color="#dfe8e8" size={.018} sizeAttenuation transparent opacity={.72} depthWrite={false} /></points>
}

function SatelliteModel({ compute = false }: { compute?: boolean }) {
  return <group scale={compute ? 1.18 : 1}>
    <mesh castShadow><boxGeometry args={[.24, .18, .32]} /><meshStandardMaterial color="#abb4b7" metalness={.88} roughness={.25} /></mesh>
    <mesh position={[0, .12, 0]}><boxGeometry args={[.15, .08, .18]} /><meshStandardMaterial color="#50595c" metalness={.9} roughness={.2} /></mesh>
    <mesh position={[-.43, 0, 0]}><boxGeometry args={[.58, .018, .22]} /><meshStandardMaterial color="#17344c" emissive="#0b2740" emissiveIntensity={.7} metalness={.4} roughness={.32} /></mesh>
    <mesh position={[.43, 0, 0]}><boxGeometry args={[.58, .018, .22]} /><meshStandardMaterial color="#17344c" emissive="#0b2740" emissiveIntensity={.7} metalness={.4} roughness={.32} /></mesh>
    {[-.55, -.42, -.29, .29, .42, .55].map(x => <mesh position={[x, .011, 0]} key={x}><boxGeometry args={[.008, .012, .21]} /><meshBasicMaterial color="#6c8da1" /></mesh>)}
    <mesh position={[0, -.02, -.22]} rotation={[Math.PI / 2, 0, 0]}><coneGeometry args={[.12, .11, 24, 1, true]} /><meshStandardMaterial color="#d4dcdd" metalness={.8} roughness={.2} side={THREE.DoubleSide} /></mesh>
    <pointLight color="#b8ff3d" intensity={compute ? 2.7 : 1.5} distance={1.4} decay={2} />
    <mesh position={[0, 0, .2]}><sphereGeometry args={[.026, 14, 14]} /><meshBasicMaterial color="#b8ff3d" /></mesh>
    {compute && <><mesh position={[0, .22, 0]}><boxGeometry args={[.2, .18, .26]} /><meshStandardMaterial color="#747e81" metalness={.95} roughness={.18} /></mesh><mesh position={[0, .34, 0]}><sphereGeometry args={[.045, 16, 16]} /><meshBasicMaterial color="#b8ff3d" /></mesh></>}
  </group>
}

function OrbitingUnit({ radius, speed, rotation, phase, compute = false, beam = false }: { radius: number; speed: number; rotation: [number, number, number]; phase: number; compute?: boolean; beam?: boolean }) {
  const mover = useRef<THREE.Group>(null)
  useFrame((_, delta) => {
    if (mover.current) mover.current.rotation.z += delta * speed
  })
  const beamLength = radius - 1.55
  return <group rotation={rotation}>
    <mesh><torusGeometry args={[radius, .007, 8, 220]} /><meshBasicMaterial color={compute ? '#b8ff3d' : '#dbe1e0'} transparent opacity={compute ? .42 : .22} /></mesh>
    <group ref={mover} rotation={[0, 0, phase]}>
      <group position={[radius, 0, 0]}>
        <SatelliteModel compute={compute} />
        {beam && <mesh position={[-beamLength / 2, 0, 0]} rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[.006, .022, beamLength, 10]} /><meshBasicMaterial color="#b8ff3d" transparent opacity={.38} blending={THREE.AdditiveBlending} /></mesh>}
      </group>
    </group>
  </group>
}

function CameraRig() {
  const { camera, pointer } = useThree()
  useFrame(() => {
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, pointer.x * .32, .035)
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, pointer.y * .22 + .08, .035)
    camera.lookAt(0, 0, 0)
  })
  return null
}

function OrbitalSystem() {
  const earth = useRef<THREE.Mesh>(null)
  const clouds = useRef<THREE.Mesh>(null)
  const earthMaterial = useRef<THREE.ShaderMaterial>(null)
  const cloudMaterial = useRef<THREE.ShaderMaterial>(null)
  const system = useRef<THREE.Group>(null)
  useFrame((state, delta) => {
    if (earth.current) earth.current.rotation.y += delta * .035
    if (clouds.current) clouds.current.rotation.y += delta * .052
    if (earthMaterial.current) earthMaterial.current.uniforms.uTime.value = state.clock.elapsedTime
    if (cloudMaterial.current) cloudMaterial.current.uniforms.uTime.value = state.clock.elapsedTime
    if (system.current) system.current.rotation.y = THREE.MathUtils.lerp(system.current.rotation.y, state.pointer.x * .05, .025)
  })
  return <group ref={system} rotation={[-.08, 0, -.12]}>
    <Stars />
    <ambientLight intensity={.22} />
    <directionalLight position={[-4, 3, 5]} color="#e8f4ff" intensity={3.2} />
    <pointLight position={[4, -2, 3]} color="#b8ff3d" intensity={3} distance={9} decay={2} />
    <mesh ref={earth}>
      <sphereGeometry args={[1.45, 96, 96]} />
      <shaderMaterial ref={earthMaterial} vertexShader={earthVertex} fragmentShader={earthFragment} uniforms={{ uTime: { value: 0 } }} />
    </mesh>
    <mesh ref={clouds} scale={1.018}>
      <sphereGeometry args={[1.45, 72, 72]} />
      <shaderMaterial ref={cloudMaterial} vertexShader={earthVertex} fragmentShader={cloudFragment} uniforms={{ uTime: { value: 0 } }} transparent depthWrite={false} />
    </mesh>
    <mesh scale={1.08}><sphereGeometry args={[1.45, 64, 64]} /><meshBasicMaterial color="#2b9dde" transparent opacity={.075} side={THREE.BackSide} blending={THREE.AdditiveBlending} /></mesh>
    <OrbitingUnit radius={2.18} speed={.18} phase={.4} rotation={[.55, .18, .08]} beam />
    <OrbitingUnit radius={2.55} speed={-.12} phase={2.5} rotation={[-.32, .58, -.25]} />
    <OrbitingUnit radius={2.88} speed={.085} phase={4.2} rotation={[.9, -.26, .38]} compute beam />
  </group>
}

export default function OrbitalMissionScene() {
  return <div className="orbital-mission-webgl" aria-hidden="true">
    <Canvas dpr={[1, 1.6]} camera={{ position: [0, .08, 6.55], fov: 43, near: .1, far: 30 }} gl={{ antialias: true, alpha: false, powerPreference: 'high-performance', toneMapping: THREE.ACESFilmicToneMapping, outputColorSpace: THREE.SRGBColorSpace }}>
      <color attach="background" args={['#020304']} />
      <fog attach="fog" args={['#020304', 9, 19]} />
      <CameraRig />
      <OrbitalSystem />
    </Canvas>
  </div>
}
