import React, { useRef, useState, useEffect, useMemo } from 'react'
import { createRoot } from 'react-dom/client'
import * as THREE from 'three'
import { Canvas, useThree, useFrame } from '@react-three/fiber'
import { Physics, RigidBody, BallCollider, CuboidCollider, useRopeJoint, useSphericalJoint } from '@react-three/rapier'

function Env() {
  const { gl, scene } = useThree()
  useEffect(() => {
    const pmrem = new THREE.PMREMGenerator(gl)
    import('three/examples/jsm/environments/RoomEnvironment.js').then(({ RoomEnvironment }) => {
      scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture
    })
    return () => pmrem.dispose()
  }, [gl, scene])
  return null
}

function Band() {
  const band = useRef(), fixed = useRef(), j1 = useRef(), j2 = useRef(), j3 = useRef(), card = useRef()
  const vec = new THREE.Vector3(), ang = new THREE.Vector3(), rot = new THREE.Vector3()
  const [curve] = useState(() => new THREE.CatmullRomCurve3([new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()]))
  const [dragged, drag] = useState(false)

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1])
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1])
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1])
  useSphericalJoint(j3, card, [[0, 0, 0], [0, 1.45, 0]])

  useFrame((state, delta) => {
    if (dragged) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera)
      card.current?.setNextKinematicTranslation(vec)
    }
    curve.points[0].copy(j3.current.translation())
    curve.points[1].copy(j2.current.translation())
    curve.points[2].copy(j1.current.translation())
    curve.points[3].copy(fixed.current.translation())
    band.current.geometry.setFromPoints(curve.getPoints(32))
  })

  return (
    <group position={[0, 4, 0]}>
      <RigidBody ref={fixed} type="fixed" />
      <RigidBody ref={j1} type="dynamic" colliders={false}><BallCollider args={[0.1]} /></RigidBody>
      <RigidBody ref={j2} type="dynamic" colliders={false}><BallCollider args={[0.1]} /></RigidBody>
      <RigidBody ref={j3} type="dynamic" colliders={false}><BallCollider args={[0.1]} /></RigidBody>
      <RigidBody ref={card} type={dragged ? 'kinematicPosition' : 'dynamic'}>
        <CuboidCollider args={[0.8, 1.125, 0.01]} />
        <mesh onPointerDown={() => drag(true)} onPointerUp={() => drag(false)}>
          <boxGeometry args={[1.6, 2.25, 0.1]} />
          <meshStandardMaterial color="#5B8CFF" />
        </mesh>
      </RigidBody>
      <line ref={band}>
        <bufferGeometry />
        <lineBasicMaterial color="#8FA3FF" />
      </line>
    </group>
  )
}

createRoot(document.getElementById('badge3d')).render(
  <Canvas camera={{ position: [0, 0, 13], fov: 25 }}>
    <ambientLight intensity={Math.PI} />
    <Env />
    <Physics gravity={[0, -40, 0]}>
      <Band />
    </Physics>
  </Canvas>
)