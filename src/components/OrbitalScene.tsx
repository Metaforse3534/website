import { Canvas, useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

function System() {
  const group = useRef<THREE.Group>(null)
  const points = useMemo(() => Array.from({ length: 80 }, (_, i) => {
    const a = (i / 80) * Math.PI * 2
    return new THREE.Vector3(Math.cos(a) * (2.6 + Math.sin(a * 3) * .25), Math.sin(a) * 1.1, Math.sin(a * 2) * .5)
  }), [])
  const geometry = useMemo(() => new THREE.BufferGeometry().setFromPoints(points), [points])
  useFrame((state, delta) => {
    if (!group.current) return
    group.current.rotation.z += delta * .025
    group.current.rotation.x = -.16 + state.pointer.y * .035
    group.current.rotation.y = state.pointer.x * .055
  })
  return <group ref={group} rotation={[0, 0, -.35]}>
    <lineLoop geometry={geometry}><lineBasicMaterial color="#e9ece8" transparent opacity={.68} /></lineLoop>
    <mesh position={[2.15, .12, .2]}><sphereGeometry args={[.085, 18, 18]} /><meshBasicMaterial color="#b8ff3d" /></mesh>
    <mesh><sphereGeometry args={[.16, 24, 24]} /><meshBasicMaterial color="#f3f4f2" wireframe /></mesh>
  </group>
}

export default function OrbitalScene() {
  return <div className="webgl-stage" aria-hidden="true"><Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 5.8], fov: 47 }} gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}><System /></Canvas></div>
}
