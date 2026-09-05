import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

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

function FloatingDataCenter() {
  const station = useRef<THREE.Group>(null)
  useFrame((state, delta) => {
    if (!station.current) return
    station.current.rotation.y += delta * .07
    station.current.rotation.x = -.12 + Math.sin(state.clock.elapsedTime * .2) * .025
  })
  return <group ref={station} rotation={[-.12, .35, .04]}>
    <mesh castShadow><boxGeometry args={[1.18, .42, .64]} /><meshStandardMaterial color="#5d676a" metalness={.92} roughness={.22} /></mesh>
    {[-.38, -.19, 0, .19, .38].map(x => <mesh position={[x, 0, .326]} key={x}><boxGeometry args={[.12, .24, .018]} /><meshStandardMaterial color="#12181a" emissive="#15370d" emissiveIntensity={.38} metalness={.7} roughness={.25} /></mesh>)}
    <mesh position={[-1.25, 0, 0]}><boxGeometry args={[1.18, .025, .68]} /><meshStandardMaterial color="#17344c" emissive="#0b2740" emissiveIntensity={.72} metalness={.42} roughness={.28} /></mesh>
    <mesh position={[1.25, 0, 0]}><boxGeometry args={[1.18, .025, .68]} /><meshStandardMaterial color="#17344c" emissive="#0b2740" emissiveIntensity={.72} metalness={.42} roughness={.28} /></mesh>
    {[-1.7, -1.42, -1.14, -.86, .86, 1.14, 1.42, 1.7].map(x => <mesh position={[x, .016, 0]} key={x}><boxGeometry args={[.012, .015, .66]} /><meshBasicMaterial color="#6c8da1" /></mesh>)}
    <mesh position={[0, .37, 0]}><cylinderGeometry args={[.1, .15, .34, 18]} /><meshStandardMaterial color="#aeb8ba" metalness={.94} roughness={.18} /></mesh>
    <mesh position={[0, .58, 0]} rotation={[Math.PI, 0, 0]}><coneGeometry args={[.22, .12, 28, 1, true]} /><meshStandardMaterial color="#d8dfdf" metalness={.86} roughness={.16} side={THREE.DoubleSide} /></mesh>
    <mesh rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[.76, .012, 10, 120]} /><meshBasicMaterial color="#b8ff3d" transparent opacity={.54} blending={THREE.AdditiveBlending} /></mesh>
    <mesh position={[0, 0, .37]}><sphereGeometry args={[.055, 18, 18]} /><meshBasicMaterial color="#b8ff3d" /></mesh>
    <pointLight position={[0, 0, .5]} color="#b8ff3d" intensity={4.2} distance={3.4} decay={2} />
  </group>
}

function OrbitingUnit({ radius, speed, rotation, phase, compute = false }: { radius: number; speed: number; rotation: [number, number, number]; phase: number; compute?: boolean }) {
  const mover = useRef<THREE.Group>(null)
  useFrame((_, delta) => {
    if (mover.current) mover.current.rotation.z += delta * speed
  })
  return <group rotation={rotation}>
    <mesh><torusGeometry args={[radius, .007, 8, 220]} /><meshBasicMaterial color={compute ? '#b8ff3d' : '#dbe1e0'} transparent opacity={compute ? .42 : .22} /></mesh>
    <group ref={mover} rotation={[0, 0, phase]}>
      <group position={[radius, 0, 0]}>
        <SatelliteModel compute={compute} />
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
  const system = useRef<THREE.Group>(null)
  useFrame((state) => {
    if (system.current) system.current.rotation.y = THREE.MathUtils.lerp(system.current.rotation.y, state.pointer.x * .05, .025)
  })
  return <group ref={system} rotation={[-.08, 0, -.12]}>
    <Stars />
    <ambientLight intensity={.22} />
    <directionalLight position={[-4, 3, 5]} color="#e8f4ff" intensity={3.2} />
    <pointLight position={[4, -2, 3]} color="#b8ff3d" intensity={3} distance={9} decay={2} />
    <FloatingDataCenter />
    <OrbitingUnit radius={2.18} speed={.18} phase={.4} rotation={[.55, .18, .08]} />
    <OrbitingUnit radius={2.55} speed={-.12} phase={2.5} rotation={[-.32, .58, -.25]} />
    <OrbitingUnit radius={2.88} speed={.085} phase={4.2} rotation={[.9, -.26, .38]} compute />
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
