/* ============================================================================
   THE FROZEN PORTFOLIO — 3D background scene
   A hand-built, Icecrown-inspired vista: a spiral glacier spire with a glowing
   crown, faceted ice spikes, hanging chains, drifting snow and heavy mist.
   Every mesh, texture and particle is generated in code — no Blizzard assets.
   Loaded lazily by src/frozen.js only when the easter egg is opened and the
   device can run WebGL without prefers-reduced-motion.
   ============================================================================ */
import React, { useRef, useMemo, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import * as THREE from 'three'
import { Canvas, useFrame, useThree } from '@react-three/fiber'

/* deterministic PRNG so the vista is identical on every load */
function mulberry(seed) {
  return function () {
    seed |= 0; seed = (seed + 0x6D2B79F5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function radialGlowTexture(inner = 'rgba(255,255,255,1)', mid = 'rgba(205,225,255,.45)') {
  const c = document.createElement('canvas')
  c.width = c.height = 256
  const x = c.getContext('2d')
  const g = x.createRadialGradient(128, 128, 0, 128, 128, 128)
  g.addColorStop(0, inner)
  g.addColorStop(0.35, mid)
  g.addColorStop(1, 'rgba(160,190,225,0)')
  x.fillStyle = g
  x.fillRect(0, 0, 256, 256)
  const t = new THREE.CanvasTexture(c)
  t.colorSpace = THREE.SRGBColorSpace
  return t
}

/* ---- sky gradient + fog ------------------------------------------------- */
function SceneEnv() {
  const { scene } = useThree()
  useEffect(() => {
    const c = document.createElement('canvas')
    c.width = 2; c.height = 512
    const x = c.getContext('2d')
    const g = x.createLinearGradient(0, 0, 0, 512)
    g.addColorStop(0, '#5D7089')
    g.addColorStop(0.4, '#8496AC')
    g.addColorStop(0.68, '#6C7F94')
    g.addColorStop(1, '#4E5E72')
    x.fillStyle = g
    x.fillRect(0, 0, 2, 512)
    const tex = new THREE.CanvasTexture(c)
    tex.colorSpace = THREE.SRGBColorSpace
    scene.background = tex
    scene.fog = new THREE.Fog(0x7E93A9, 14, 70)
    return () => { tex.dispose(); scene.background = null; scene.fog = null }
  }, [scene])
  return null
}

/* ---- the Frozen Throne itself: a tight spiral of ice slabs ---------------- */
function Spire() {
  const slabs = useMemo(() => {
    const a = []
    for (let i = 0; i < 16; i++) {
      const t = i / 15
      a.push({
        w: 7.2 - 5.4 * t,
        y: 0.9 + i * 0.78,
        ry: i * 0.62,
        rx: Math.sin(i * 0.9) * 0.03,
        jx: Math.sin(i * 1.7) * 0.06,
        jz: Math.cos(i * 1.3) * 0.06,
        c: i % 3 === 0 ? '#8FA9C0' : '#A3B9CD',
      })
    }
    return a
  }, [])
  const glow = useMemo(() => radialGlowTexture(), [])
  const storm = useMemo(() => radialGlowTexture('rgba(235,244,255,.9)', 'rgba(190,210,235,.35)'), [])
  return (
    <group position={[-7, 0, 0]}>
      <mesh position={[0, 0.2, 0]}>
        <boxGeometry args={[9.5, 1.4, 5]} />
        <meshStandardMaterial color="#8CA2B6" roughness={0.6} flatShading />
      </mesh>
      {slabs.map((s, i) => (
        <mesh key={i} position={[s.jx, s.y, s.jz]} rotation={[s.rx, s.ry, 0]}>
          <boxGeometry args={[s.w, 1.42, 3.2]} />
          <meshStandardMaterial color={s.c} roughness={0.36} metalness={0.06} flatShading />
        </mesh>
      ))}
      <mesh position={[0, 14.2, 0]}>
        <coneGeometry args={[1.2, 2.6, 6]} />
        <meshStandardMaterial color="#DDE8F2" roughness={0.3} flatShading />
      </mesh>
      <sprite position={[0, 15.6, -3]} scale={[20, 20, 1]}>
        <spriteMaterial map={storm} transparent opacity={0.8} depthWrite={false} />
      </sprite>
      <sprite position={[0, 15.3, 0]} scale={[8, 8, 1]}>
        <spriteMaterial map={glow} transparent opacity={0.95} depthWrite={false} blending={THREE.AdditiveBlending} />
      </sprite>
      <pointLight position={[0, 14.6, 0]} color="#D6E8FF" intensity={800} distance={80} decay={2} />
    </group>
  )
}

/* ---- surrounding ice spikes ---------------------------------------------- */
function Spikes() {
  const spikes = useMemo(() => {
    const r = mulberry(1337)
    const a = []
    for (let i = 0; i < 28; i++) {
      const side = i % 2 ? 1 : -1
      const x = side * (3 + r() * 14)
      a.push({
        x,
        z: -8 + r() * 10,
        h: 3.4 + r() * 6,
        rad: 0.7 + r() * 1.0,
        tilt: -Math.sign(x) * (0.05 + r() * 0.15),
        ry: r() * Math.PI,
        teal: r() < 0.35,
      })
    }
    return a
  }, [])
  return (
    <group>
      {spikes.map((s, i) => (
        <mesh key={i} position={[s.x, s.h / 2 - 0.5, s.z]} rotation={[0, s.ry, s.tilt]}>
          <coneGeometry args={[s.rad, s.h, 5]} />
          <meshStandardMaterial
            color={s.teal ? '#7FB8AE' : '#9DB4C8'}
            roughness={0.45} metalness={0.05} flatShading />
        </mesh>
      ))}
    </group>
  )
}

/* ---- ground + teal glow patch -------------------------------------------- */
function Ground() {
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.4, 0]}>
        <circleGeometry args={[70, 48]} />
        <meshStandardMaterial color="#71879C" roughness={1} metalness={0} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-7, -0.36, 1]}>
        <circleGeometry args={[8, 32]} />
        <meshStandardMaterial color="#6FA9A0" roughness={0.75} metalness={0.05} transparent opacity={0.6} />
      </mesh>
      <pointLight position={[-9, 1.5, 3]} color="#6FD0BC" intensity={120} distance={24} decay={2} />
    </group>
  )
}

/* ---- two sagging chains down to the spire --------------------------------- */
function Chain({ from, to, count }) {
  const ref = useRef()
  const matrices = useMemo(() => {
    const f = new THREE.Vector3(...from)
    const t = new THREE.Vector3(...to)
    const mid = new THREE.Vector3().add(f).add(t).multiplyScalar(0.5)
    /* a gentle catenary sag proportional to the drop — never below the anchor */
    const drop = f.y - t.y
    mid.y = (f.y + t.y) / 2 - Math.max(0.4, drop * 0.12)
    const curve = new THREE.CatmullRomCurve3([f, mid, t])
    const pts = curve.getPoints(count) /* count + 1 points */
    const zAxis = new THREE.Vector3(0, 0, 1)
    return pts.map((p, i) => {
      const u = Math.min(i / (count - 1), 1)
      const tangent = curve.getTangentAt(u).normalize()
      const q = new THREE.Quaternion().setFromUnitVectors(zAxis, tangent)
      if (i % 2) q.multiply(new THREE.Quaternion().setFromAxisAngle(tangent, Math.PI / 2))
      return new THREE.Matrix4().compose(p, q, new THREE.Vector3(1, 1, 1))
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(() => {
    matrices.forEach((m, i) => ref.current.setMatrixAt(i, m))
    ref.current.instanceMatrix.needsUpdate = true
  }, [matrices])
  return (
    <instancedMesh ref={ref} args={[null, null, matrices.length]}>
      <torusGeometry args={[0.36, 0.10, 8, 14]} />
      <meshStandardMaterial color="#23272E" roughness={0.5} metalness={0.85} />
    </instancedMesh>
  )
}

function Chains() {
  return (
    <group>
      <Chain from={[-11, 26, -2]} to={[-7, 14.6, 0]} count={17} />
      <Chain from={[-3, 27, -3]} to={[-6.5, 14.2, 0]} count={18} />
    </group>
  )
}

/* ---- drifting snow --------------------------------------------------------- */
function Snow() {
  const ref = useRef()
  const N = 800
  const { positions, speeds } = useMemo(() => {
    const r = mulberry(7)
    const p = new Float32Array(N * 3)
    const s = new Float32Array(N)
    for (let i = 0; i < N; i++) {
      p[i * 3] = -45 + r() * 90
      p[i * 3 + 1] = r() * 28
      p[i * 3 + 2] = -20 + r() * 34
      s[i] = 1.1 + r() * 1.6
    }
    return { positions: p, speeds: s }
  }, [])
  useFrame((state, delta) => {
    const attr = ref.current.geometry.attributes.position
    const t = state.clock.elapsedTime
    for (let i = 0; i < N; i++) {
      let y = attr.getY(i) - speeds[i] * delta
      if (y < 0) y = 26 + Math.random() * 2
      attr.setY(i, y)
      attr.setX(i, attr.getX(i) + Math.sin(t * 0.6 + i) * 0.004)
    }
    attr.needsUpdate = true
  })
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.17} color="#EAF2FB" transparent opacity={0.85} sizeAttenuation depthWrite={false} />
    </points>
  )
}

/* ---- camera: mouse parallax + a slow, cold sway ---------------------------- */
function Rig() {
  const base = useMemo(() => new THREE.Vector3(2.8, 5.6, 22.5), [])
  const look = useMemo(() => new THREE.Vector3(-5.8, 5.6, 0), [])
  const target = useMemo(() => new THREE.Vector3(), [])
  useFrame((state, delta) => {
    const t = state.clock.elapsedTime
    target.set(
      base.x + state.pointer.x * 1.7,
      base.y + state.pointer.y * 0.9 + Math.sin(t * 0.35) * 0.14,
      base.z
    )
    state.camera.position.lerp(target, 1 - Math.pow(0.001, delta))
    state.camera.lookAt(look)
  })
  return null
}

function Scene() {
  return (
    <>
      <SceneEnv />
      <ambientLight intensity={0.5} />
      <directionalLight position={[12, 26, 14]} intensity={1.2} color="#EAF2FF" />
      <Spire />
      <Spikes />
      <Ground />
      <Chains />
      <Snow />
      <Rig />
    </>
  )
}

export function mountScene(container) {
  const root = createRoot(container)
  root.render(
    <Canvas
      dpr={[1, 1.75]}
      gl={{ antialias: true, powerPreference: 'high-performance' }}
      camera={{ fov: 42, position: [2.8, 5.6, 22.5], near: 0.1, far: 220 }}
    >
      <Scene />
    </Canvas>
  )
  return () => root.unmount()
}