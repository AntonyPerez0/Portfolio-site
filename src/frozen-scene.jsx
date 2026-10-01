/* ============================================================================
   THE FROZEN PORTFOLIO — 3D background scene, v2
   Icecrown-inspired vista rebuilt for fidelity: procedural fBm storm clouds
   on drifting backdrop layers, a noise-displaced rock spire wrapped in a
   helix snow ramp, rim lighting from the crown burst, cracked-ice ground
   with shards, drifting mist sheets, and heavier snow.
   Every mesh, texture and particle is generated in code — no Blizzard assets.
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

/* ---- tiny value-noise / fBm (for clouds and terrain) ---------------------- */
function makeNoise2D(seed) {
  const r = mulberry(seed)
  const base = new Uint8Array(512)
  const p = Array.from({ length: 256 }, (_, i) => i)
  for (let i = 255; i > 0; i--) { const j = (r() * (i + 1)) | 0;[p[i], p[j]] = [p[j], p[i]] }
  for (let i = 0; i < 512; i++) base[i] = p[i & 255]
  const fade = (t) => t * t * (3 - 2 * t)
  function n2(x, y) {
    const X = Math.floor(x), Y = Math.floor(y)
    const xf = x - X, yf = y - Y
    const xi = X & 255, yi = Y & 255
    const aa = base[base[xi] + yi] / 255
    const ba = base[base[xi + 1] + yi] / 255
    const ab = base[base[xi] + yi + 1] / 255
    const bb = base[base[xi + 1] + yi + 1] / 255
    const u = fade(xf), v = fade(yf)
    return aa + (ba - aa) * u + (ab - aa) * v + (aa - ba - ab + bb) * u * v
  }
  return function fbm(x, y, oct = 5, lac = 2.1, gain = 0.52) {
    let a = 0, amp = 0.5, f = 1, norm = 0
    for (let i = 0; i < oct; i++) { a += amp * n2(x * f, y * f); norm += amp; f *= lac; amp *= gain }
    return a / norm
  }
}

function radialGlowTexture(size = 256, inner = 'rgba(255,255,255,1)', mid = 'rgba(210,228,252,.4)') {
  const c = document.createElement('canvas')
  c.width = c.height = size
  const x = c.getContext('2d')
  const g = x.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
  g.addColorStop(0, inner)
  g.addColorStop(0.3, mid)
  g.addColorStop(1, 'rgba(160,190,225,0)')
  x.fillStyle = g
  x.fillRect(0, 0, size, size)
  const t = new THREE.CanvasTexture(c)
  t.colorSpace = THREE.SRGBColorSpace
  return t
}

/* ---- painterly storm clouds (fBm on canvas) ------------------------------- */
function makeCloudTexture(W = 900, H = 560) {
  const c = document.createElement('canvas')
  c.width = W; c.height = H
  const x = c.getContext('2d')
  const img = x.createImageData(W, H)
  const d = img.data
  const fbmA = makeNoise2D(101)
  const fbmB = makeNoise2D(707)
  for (let py = 0; py < H; py++) {
    const ny = py / H
    for (let px = 0; px < W; px++) {
      const nx = px / W
      // clouds fill the whole sky, thinning only near the very bottom
      const shape = fbmA(nx * 3.2, ny * 2.4, 5)
      const wisp = fbmB(nx * 7.5, ny * 4.2, 4)
      const band = 0.3 + 0.7 * Math.min(1, (1 - ny) * 1.7)
      let a = Math.max(0, (shape - 0.38) * 5.5)
      a = Math.min(1, a) * band * (0.5 + 0.62 * wisp)
      // fake lighting: brighter where cloud thickness rises toward upper-left
      const lit = fbmA(nx * 3.2 + 0.035, ny * 2.4 - 0.03, 3)
      const bright = 128 + 108 * lit + 22 * wisp
      const i = (py * W + px) * 4
      d[i] = Math.min(255, bright * 1.08 + 18)
      d[i + 1] = Math.min(255, bright * 1.02)
      d[i + 2] = Math.min(255, bright * 1.14 + 26)
      d[i + 3] = Math.min(235, a * 235)
    }
  }
  x.putImageData(img, 0, 0)
  // punch a glowing hole in the clouds where the crown burst sits
  x.globalCompositeOperation = 'lighter'
  const g = x.createRadialGradient(W * 0.37, H * 0.33, 0, W * 0.37, H * 0.33, W * 0.2)
  g.addColorStop(0, 'rgba(240,247,255,.95)')
  g.addColorStop(0.35, 'rgba(205,225,250,.5)')
  g.addColorStop(1, 'rgba(160,190,225,0)')
  x.fillStyle = g
  x.fillRect(0, 0, W, H)
  x.globalCompositeOperation = 'source-over'
  const t = new THREE.CanvasTexture(c)
  t.colorSpace = THREE.SRGBColorSpace
  t.wrapS = THREE.RepeatWrapping
  return t
}

/* ---- drifting cloud backdrop ---------------------------------------------- */
function CloudLayer({ texture, z, width, height, opacity, drift }) {
  const mat = useRef()
  useFrame((_, delta) => {
    if (mat.current) {
      mat.current.map.offset.x += drift * delta
      mat.current.needsUpdate = false
    }
  })
  return (
    <mesh position={[0, height * 0.28, z]}>
      <planeGeometry args={[width, height]} />
      <meshBasicMaterial ref={mat} map={texture} transparent opacity={opacity} depthWrite={false} fog={false} />
    </mesh>
  )
}

function SceneEnv() {
  const { scene } = useThree()
  useEffect(() => {
    const c = document.createElement('canvas')
    c.width = 2; c.height = 512
    const x = c.getContext('2d')
    const g = x.createLinearGradient(0, 0, 0, 512)
    /* purple-lavender storm cast like the reference */
    g.addColorStop(0, '#8B8FD0')
    g.addColorStop(0.35, '#A5A5DC')
    g.addColorStop(0.62, '#9BA0CC')
    g.addColorStop(0.85, '#8791B8')
    g.addColorStop(1, '#6B7A9E')
    x.fillStyle = g
    x.fillRect(0, 0, 2, 512)
    const tex = new THREE.CanvasTexture(c)
    tex.colorSpace = THREE.SRGBColorSpace
    scene.background = tex
    scene.fog = new THREE.Fog(0x9BA0CC, 16, 75)
    return () => { tex.dispose(); scene.background = null; scene.fog = null }
  }, [scene])
  return null
}

/* ---- the Frozen Throne: noise-displaced rocky spire ------------------------ */
function spireProfile(t) { /* t: 0 base → 1 summit */
  return 2.9 * Math.pow(1 - t, 1.6) + 0.28 * Math.sin(t * 8.6)
}

function Spire() {
  const geom = useMemo(() => {
    const H = 16
    const g = new THREE.ConeGeometry(2.9, H, 16, 26, false)
    const pos = g.attributes.position
    const nz = makeNoise2D(42)
    for (let i = 0; i < pos.count; i++) {
      const vx = pos.getX(i), vy = pos.getY(i), vz = pos.getZ(i)
      const t = (vy + H / 2) / H
      const a = Math.atan2(vz, vx)
      const cur = Math.sqrt(vx * vx + vz * vz)
      if (cur < 0.001) continue /* apex */
      const ragged = (nz(Math.cos(a) * 2 + 10, Math.sin(a) * 2 + t * 5.5, 3) - 0.5) * 0.72
      const nr = Math.max(0.05, spireProfile(t) + ragged)
      pos.setX(i, Math.cos(a) * nr)
      pos.setZ(i, Math.sin(a) * nr)
      pos.setY(i, vy + (nz(Math.cos(a) * 3, t * 7 + 30, 2) - 0.5) * 0.4)
    }
    const flat = g.toNonIndexed()
    flat.computeVertexNormals()
    return flat
  }, [])
  /* the winding snow ramp — a slim helix tube that actually hugs the cone
   (the cone spans local y -H/2..+H/2, so t is derived from world-local y) */
  const ramp = useMemo(() => {
    const pts = []
    const H = 16
    const y0 = -6.2, y1 = 6.9, turns = 1.35
    for (let i = 0; i <= 48; i++) {
      const k = i / 48
      const y = y0 + k * (y1 - y0)
      const t = (y + H / 2) / H
      const a = -0.9 + k * turns * Math.PI * 2
      const r = spireProfile(t) + 0.18
      pts.push(new THREE.Vector3(Math.cos(a) * r, y, Math.sin(a) * r))
    }
    return new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 84, 0.22, 8, false)
  }, [])
  const glow = useMemo(() => radialGlowTexture(256, 'rgba(255,255,255,1)', 'rgba(214,232,255,.5)'), [])
  const shaft = useMemo(() => {
    /* a soft round glow — the sprite stretches it into an elliptical light
       column, so there are no hard canvas edges */
    return radialGlowTexture(256, 'rgba(238,246,255,.9)', 'rgba(210,230,252,.3)')
  }, [])
  return (
    <group position={[-7, 7.2, 0]}>
      <mesh geometry={geom}>
        <meshStandardMaterial color="#8CA2B8" roughness={0.62} metalness={0.04} flatShading />
      </mesh>
      <mesh geometry={ramp}>
        <meshStandardMaterial color="#A9BDD2" roughness={0.42} metalness={0.02} />
      </mesh>
      {/* boulders rooting the spire (group-local y ≈ -7 puts them on the ground) */}
      {[[-3.1, -6.9, 1.6, 1.5], [2.6, -7.1, 1.1, 1.2], [0.6, -6.85, -2.5, 1.7], [-1.6, -7.05, -1.9, 1.0], [3.4, -6.95, 2.4, 0.8]].map((m, i) => (
        <mesh key={i} position={[m[0], m[1], m[2]]} rotation={[i * 0.7, i * 1.9, i * 0.4]} scale={[1, 0.55, 1]}>
          <icosahedronGeometry args={[m[3], 0]} />
          <meshStandardMaterial color="#7E95AB" roughness={0.66} flatShading />
        </mesh>
      ))}
      {/* summit shards: a jagged crown, clustered tight to the apex */}
      {[[-0.35, 0.3, 0.28, 1.9], [0.42, -0.12, 0.24, 1.6], [0.06, 0.55, 0.2, 1.4], [-0.1, -0.38, 0.16, 1.2], [0.3, 0.15, -0.3, 1.1]].map((s, i) => (
        <mesh key={i} position={[s[0], 8.6 + s[3] / 2, s[1]]} rotation={[0, i * 1.3, s[2] * 0.2]}>
          <coneGeometry args={[0.32, s[3], 5]} />
          <meshStandardMaterial color="#DFE9F3" roughness={0.32} flatShading />
        </mesh>
      ))}
      {/* crown burst: kept fully BEHIND the summit and chains (like the
          reference halo) — additive sprites render after opaque meshes, so
          overlapping them would wash the chains out */}
      <sprite position={[0, 10.6, -6]} scale={[6, 20, 1]}>
        <spriteMaterial map={shaft} transparent opacity={0.4} depthWrite={false} blending={THREE.AdditiveBlending} />
      </sprite>
      <sprite position={[0, 10.8, -7]} scale={[13, 13, 1]}>
        <spriteMaterial map={glow} transparent opacity={0.55} depthWrite={false} blending={THREE.AdditiveBlending} />
      </sprite>
      <sprite position={[0, 10.7, -6.5]} scale={[6, 6, 1]}>
        <spriteMaterial map={glow} transparent opacity={0.85} depthWrite={false} blending={THREE.AdditiveBlending} />
      </sprite>
      <pointLight position={[0, 10.8, 1]} color="#DCEBFF" intensity={750} distance={85} decay={2} />
    </group>
  )
}

/* ---- surrounding ice spikes ------------------------------------------------ */
function Spikes() {
  const spikes = useMemo(() => {
    const r = mulberry(1337)
    const a = []
    for (let i = 0; i < 34; i++) {
      const side = i % 2 ? 1 : -1
      const far = i % 4 === 0
      const x = side * (3 + r() * 15)
      a.push({
        x,
        z: far ? -10 - r() * 12 : -6 + r() * 9,
        h: (far ? 4.5 : 3) + r() * 6.5,
        rad: 0.7 + r() * 1.1,
        sides: 4 + ((r() * 3) | 0),
        tilt: -Math.sign(x) * (0.04 + r() * 0.15),
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
          <coneGeometry args={[s.rad, s.h, s.sides]} />
          <meshStandardMaterial
            color={s.teal ? '#6FA8A0' : '#8CA4BA'}
            roughness={0.5} metalness={0.04} flatShading />
        </mesh>
      ))}
    </group>
  )
}

/* ---- cracked ice ground + teal patch --------------------------------------- */
function Ground() {
  const geom = useMemo(() => {
    const g = new THREE.PlaneGeometry(110, 70, 56, 36)
    const pos = g.attributes.position
    const nz = makeNoise2D(9)
    for (let i = 0; i < pos.count; i++) {
      const vx = pos.getX(i), vy = pos.getY(i)
      const h = (nz(vx * 0.09 + 20, vy * 0.09 + 20, 4) - 0.5) * 1.7
      pos.setZ(i, h)
    }
    g.computeVertexNormals()
    return g
  }, [])
  const sheets = useMemo(() => {
    const r = mulberry(55)
    const a = []
    for (let i = 0; i < 9; i++) {
      a.push({ x: -26 + r() * 42, y: 0.12 + r() * 0.15, z: -14 + r() * 16, s: 3 + r() * 7, ry: r() * Math.PI })
    }
    return a
  }, [])
  const glow = useMemo(() => radialGlowTexture(256, 'rgba(140,230,210,.55)', 'rgba(110,200,185,.22)'), [])
  return (
    <group>
      <mesh geometry={geom} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
        <meshStandardMaterial color="#64798E" roughness={0.96} metalness={0} />
      </mesh>
      {sheets.map((s, i) => (
        <mesh key={i} rotation={[-Math.PI / 2, 0, s.ry]} position={[s.x, s.y, s.z]}>
          <circleGeometry args={[s.s, 7]} />
          <meshStandardMaterial color="#9DB6C9" roughness={0.35} metalness={0.05} transparent opacity={0.42} />
        </mesh>
      ))}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-7, 0.05, 1.5]}>
        <circleGeometry args={[9, 32]} />
        <meshStandardMaterial color="#57B3A6" roughness={0.7} metalness={0.05} transparent opacity={0.55} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-7, 0.16, 1.5]}>
        <circleGeometry args={[8.5, 32]} />
        <meshBasicMaterial map={glow} transparent opacity={0.6} depthWrite={false} blending={THREE.AdditiveBlending} fog={false} />
      </mesh>
      <pointLight position={[-9, 1.6, 3]} color="#5FD0BC" intensity={150} distance={26} decay={2} />
    </group>
  )
}

/* ---- mist sheets drifting between depth layers ------------------------------ */
function Mist() {
  const tex = useMemo(() => radialGlowTexture(256, 'rgba(225,235,246,.5)', 'rgba(200,215,232,.18)'), [])
  const layers = [
    { z: -2, y: 0.6, w: 70, h: 14, o: 0.16, d: 0.012 },
    { z: -10, y: 1.2, w: 90, h: 18, o: 0.13, d: -0.008 },
    { z: -20, y: 2.2, w: 110, h: 24, o: 0.11, d: 0.006 },
  ]
  const refs = [useRef(), useRef(), useRef()]
  useFrame((_, delta) => {
    refs.forEach((r, i) => { if (r.current) r.current.position.x += layers[i].d * delta * 12 })
  })
  return (
    <group>
      {layers.map((l, i) => (
        <mesh key={i} ref={refs[i]} position={[0, l.y, l.z]}>
          <planeGeometry args={[l.w, l.h]} />
          <meshBasicMaterial map={tex} transparent opacity={l.o} depthWrite={false} fog={false} />
        </mesh>
      ))}
    </group>
  )
}

/* ---- chains ------------------------------------------------------------------ */
function Chain({ from, to, count }) {
  const ref = useRef()
  const matrices = useMemo(() => {
    const f = new THREE.Vector3(...from)
    const t = new THREE.Vector3(...to)
    const mid = new THREE.Vector3().add(f).add(t).multiplyScalar(0.5)
    const drop = f.y - t.y
    mid.y = (f.y + t.y) / 2 - Math.max(0.4, drop * 0.12)
    const curve = new THREE.CatmullRomCurve3([f, mid, t])
    const pts = curve.getPoints(count)
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
      <torusGeometry args={[0.42, 0.13, 8, 14]} />
      <meshBasicMaterial color="#0B0C10" />
    </instancedMesh>
  )
}

function Chains() {
  return (
    <group>
      <Chain from={[-10.5, 24, -2]} to={[-8.6, 10.8, -0.5]} count={18} />
      <Chain from={[-3, 25, -6]} to={[-6.2, 12.8, -2]} count={19} />
    </group>
  )
}

/* ---- snow: two parallax layers ------------------------------------------------ */
function Snow() {
  const ref = useRef()
  const N = 1300
  const { positions, speeds } = useMemo(() => {
    const r = mulberry(7)
    const p = new Float32Array(N * 3)
    const s = new Float32Array(N)
    for (let i = 0; i < N; i++) {
      p[i * 3] = -50 + r() * 100
      p[i * 3 + 1] = r() * 30
      p[i * 3 + 2] = -24 + r() * 38
      s[i] = 1.2 + r() * 2.2
    }
    return { positions: p, speeds: s }
  }, [])
  useFrame((state, delta) => {
    const attr = ref.current.geometry.attributes.position
    const t = state.clock.elapsedTime
    for (let i = 0; i < N; i++) {
      let y = attr.getY(i) - speeds[i] * delta
      if (y < 0) y = 28 + Math.random() * 2
      attr.setY(i, y)
      attr.setX(i, attr.getX(i) + Math.sin(t * 0.55 + i * 0.7) * 0.006)
    }
    attr.needsUpdate = true
  })
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.19} color="#EFF4FC" transparent opacity={0.9} sizeAttenuation depthWrite={false} />
    </points>
  )
}

/* ---- camera: locked heroic angle (no mouse parallax) ------------------------ */
function Rig() {
  const { camera } = useThree()
  useEffect(() => {
    camera.position.set(0, 5.2, 27)
    camera.lookAt(-7, 8.2, 0)
  }, [camera])
  return null
}

function Scene() {
  const far = useMemo(() => makeCloudTexture(900, 560), [])
  const near = useMemo(() => makeCloudTexture(700, 440), [])
  return (
    <>
      <SceneEnv />
      <ambientLight intensity={0.35} color="#AFC2D6" />
      <hemisphereLight args={['#A9BCCC', '#4C5E72', 0.55]} />
      {/* rim light from behind the crown */}
      <directionalLight position={[-7, 24, -16]} intensity={2.4} color="#E8F2FF" />
      {/* soft front fill */}
      <directionalLight position={[9, 8, 18]} intensity={0.5} color="#C4D2E2" />
      <CloudLayer texture={far} z={-55} width={190} height={118} opacity={0.96} drift={0.0016} />
      <CloudLayer texture={near} z={-38} width={130} height={82} opacity={0.55} drift={-0.003} />
      <Spire />
      <Spikes />
      <Ground />
      <Mist />
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
      camera={{ fov: 44, position: [0, 5.2, 27], near: 0.1, far: 260 }}
    >
      <Scene />
    </Canvas>
  )
  return () => root.unmount()
}