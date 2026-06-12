import React, { useRef, useState, useEffect, useMemo } from 'react'
import { createRoot } from 'react-dom/client'
import * as THREE from 'three'
import { Canvas, extend, useThree, useFrame } from '@react-three/fiber'
import { Physics, RigidBody, BallCollider, CuboidCollider, useRopeJoint, useSphericalJoint } from '@react-three/rapier'
import { MeshLineGeometry, MeshLineMaterial } from 'meshline'

extend({ MeshLineGeometry, MeshLineMaterial })

const log = (...a) => console.info('%c[badge]', 'color:#3DDC97;font-family:monospace', ...a)
const logErr = (...a) => console.error('%c[badge]', 'color:#FF6B6B;font-family:monospace', ...a)

/* Where the strap meets the card, in the card's local space.
 * The spherical joint, the metal clamp, and the band's first curve
 * point all share this anchor — that's what keeps the lanyard
 * visually CONNECTED to the badge instead of ending in mid-air. */
const CLIP_Y = 1.26

function Env() {
  const { gl, scene } = useThree()
  useEffect(() => {
    const pmrem = new THREE.PMREMGenerator(gl)
    let mounted = true
    import('three/examples/jsm/environments/RoomEnvironment.js').then(({ RoomEnvironment }) => {
      if (!mounted) return
      scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture
    }).catch(() => {})
    return () => { mounted = false; pmrem.dispose() }
  }, [gl, scene])
  return null
}

function makeBadgeTexture() {
  const svg = `
  <svg width="1024" height="1440" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#141E36" />
        <stop offset="100%" stop-color="#0A101E" />
      </linearGradient>
      <linearGradient id="textGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#5B8CFF" />
        <stop offset="100%" stop-color="#C77CFF" />
      </linearGradient>
      <linearGradient id="strip" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#5B8CFF" />
        <stop offset="55%" stop-color="#9D7CFF" />
        <stop offset="100%" stop-color="#C77CFF" />
      </linearGradient>
    </defs>
    <rect width="1024" height="1440" rx="64" fill="url(#bg)" stroke="#2E3C5C" stroke-width="4" />
    <rect x="0" y="1424" width="1024" height="16" fill="url(#strip)" />
    <rect x="402" y="64" width="220" height="44" rx="22" fill="#070B14" stroke="#3A4A70" stroke-width="3" />
    <text x="92" y="220" font-family="monospace" font-size="30" fill="#8E9AB2" letter-spacing="6">ACCESS // ENGINEERING</text>
    <text x="932" y="220" font-family="monospace" font-size="30" fill="#8E9AB2" text-anchor="end">'26</text>
    <line x1="92" y1="258" x2="932" y2="258" stroke="#2E3C5C" stroke-width="3" />
    <text x="86" y="480" font-family="sans-serif" font-size="168" font-weight="800" fill="#EDF1FA">ANTONY</text>
    <text x="86" y="640" font-family="sans-serif" font-size="168" font-weight="800" fill="#EDF1FA">PEREZ</text>
    <text x="92" y="736" font-family="monospace" font-size="44" font-weight="600" fill="url(#textGrad)" letter-spacing="10">SOFTWARE ENGINEER</text>
    <text x="92" y="856" font-family="monospace" font-size="33" fill="#5E6A83">stack</text>
    <text x="282" y="856" font-family="monospace" font-size="33" fill="#B9C4DA">k8s · react · typescript · CI/CD</text>
    <text x="92" y="920" font-family="monospace" font-size="33" fill="#5E6A83">repo</text>
    <text x="282" y="920" font-family="monospace" font-size="33" fill="#B9C4DA">github.com/AntonyPerez0</text>
    <text x="92" y="984" font-family="monospace" font-size="33" fill="#5E6A83">degree</text>
    <text x="282" y="984" font-family="monospace" font-size="33" fill="#B9C4DA">b.s. computer science 2026</text>
    <text x="92" y="1048" font-family="monospace" font-size="33" fill="#5E6A83">base</text>
    <text x="282" y="1048" font-family="monospace" font-size="33" fill="#B9C4DA">bay area, california</text>
    <g fill="#D7DEF0">
      <rect x="92" y="1196" width="8" height="110"/><rect x="108" y="1196" width="4" height="110"/>
      <rect x="120" y="1196" width="14" height="110"/><rect x="142" y="1196" width="6" height="110"/>
      <rect x="156" y="1196" width="18" height="110"/><rect x="182" y="1196" width="4" height="110"/>
      <rect x="194" y="1196" width="10" height="110"/><rect x="212" y="1196" width="22" height="110"/>
      <rect x="242" y="1196" width="8" height="110"/><rect x="258" y="1196" width="14" height="110"/>
      <rect x="280" y="1196" width="6" height="110"/><rect x="294" y="1196" width="16" height="110"/>
      <rect x="318" y="1196" width="4" height="110"/><rect x="330" y="1196" width="12" height="110"/>
    </g>
    <text x="92" y="1352" font-family="monospace" font-size="26" fill="#5E6A83">ANT-2026-SHIPIT</text>
    <rect x="632" y="1218" width="300" height="76" rx="38" fill="rgba(61,220,151,0.14)" stroke="#3DDC97" stroke-width="3" />
    <text x="668" y="1268" font-family="monospace" font-size="34" font-weight="600" fill="#3DDC97">✓ CI PASSED</text>
  </svg>`
  const dataUri = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg)
  const texture = new THREE.TextureLoader().load(dataUri)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.anisotropy = 16
  return texture
}

function Band({ maxSpeed = 50, minSpeed = 10 }) {
  const band = useRef(), fixed = useRef(), j1 = useRef(), j2 = useRef(), j3 = useRef(), card = useRef()
  const vec = new THREE.Vector3(), ang = new THREE.Vector3(), rot = new THREE.Vector3(), dir = new THREE.Vector3()
  const clip = new THREE.Vector3(), quat = new THREE.Quaternion()
  const segProps = { type: 'dynamic', canSleep: true, colliders: false, angularDamping: 2, linearDamping: 2 }
  const { width, height } = useThree((s) => s.size)
  /* FIVE control points: clip-on-card → j3 → j2 → j1 → fixed.
   * The extra first point rides the card and closes the gap
   * between the strap and the badge. */
  const [curve] = useState(() => new THREE.CatmullRomCurve3(
    [new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()]
  ))
  const [dragged, drag] = useState(false)
  const [hovered, hover] = useState(false)
  const tex = useMemo(() => makeBadgeTexture(), [])

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1])
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1])
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1])
  /* anchor the joint exactly where the clamp + band meet the card */
  useSphericalJoint(j3, card, [[0, 0, 0], [0, CLIP_Y, 0]])

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? 'grabbing' : 'grab'
      return () => { document.body.style.cursor = 'auto' }
    }
  }, [hovered, dragged])

  useFrame((state, delta) => {
    if (dragged) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera)
      dir.copy(vec).sub(state.camera.position).normalize()
      vec.add(dir.multiplyScalar(state.camera.position.length()))
      ;[card, j1, j2, j3, fixed].forEach((r) => r.current?.wakeUp())
      card.current?.setNextKinematicTranslation({ x: vec.x - dragged.x, y: vec.y - dragged.y, z: vec.z - dragged.z })
    }
    if (fixed.current && card.current && band.current) {
      /* smooth the inner joints so the strap doesn't jitter */
      ;[j1, j2].forEach((ref) => {
        if (!ref.current.lerped) ref.current.lerped = new THREE.Vector3().copy(ref.current.translation())
        const clamped = Math.max(0.1, Math.min(1, ref.current.lerped.distanceTo(ref.current.translation())))
        ref.current.lerped.lerp(ref.current.translation(), delta * (minSpeed + clamped * (maxSpeed - minSpeed)))
      })
      /* first strap point rides the card: rotate the local clip offset
       * by the card's live orientation and add its position, so the
       * band stays glued to the clamp through swings and throws */
      const r = card.current.rotation()
      quat.set(r.x, r.y, r.z, r.w)
      clip.set(0, CLIP_Y, 0).applyQuaternion(quat).add(card.current.translation())
      curve.points[0].copy(clip)
      curve.points[1].copy(j3.current.translation())
      curve.points[2].copy(j2.current.lerped)
      curve.points[3].copy(j1.current.lerped)
      curve.points[4].copy(fixed.current.translation())
      band.current.geometry.setPoints(curve.getPoints(40))
      /* keep the card facing forward */
      ang.copy(card.current.angvel())
      rot.copy(card.current.rotation())
      card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z })
    }
  })

  curve.curveType = 'chordal'

  return (
    <>
      <group position={[0, 4, 0]}>
        <RigidBody ref={fixed} {...segProps} type="fixed" />
        <RigidBody position={[0.5, 0, 0]} ref={j1} {...segProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1, 0, 0]} ref={j2} {...segProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1.5, 0, 0]} ref={j3} {...segProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[2, 0, 0]} ref={card} {...segProps} type={dragged ? 'kinematicPosition' : 'dynamic'}>
          <CuboidCollider args={[0.8, 1.125, 0.01]} />
          <group
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={(e) => { e.target.releasePointerCapture(e.pointerId); drag(false) }}
            onPointerDown={(e) => { e.target.setPointerCapture(e.pointerId); drag(new THREE.Vector3().copy(e.point).sub(vec.copy(card.current.translation()))) }}
          >
            <mesh>
              <planeGeometry args={[1.6, 2.25]} />
              <meshPhysicalMaterial
                map={tex} transparent
                clearcoat={1} clearcoatRoughness={0.18}
                roughness={0.4} metalness={0.35}
                side={THREE.DoubleSide}
              />
            </mesh>
            <mesh position={[0, CLIP_Y - 0.04, 0]}>
              <boxGeometry args={[0.46, 0.2, 0.07]} />
              <meshStandardMaterial color="#AEB9CE" metalness={1} roughness={0.32} />
            </mesh>
          </group>
        </RigidBody>
      </group>

      {/* MOVED OUTSIDE THE GROUP so it shares the same world-space as the physics joints */}
      <mesh ref={band} raycast={() => null}>
        {/* Use onUpdate to safely force buffer initialization on mount */}
        <meshLineGeometry onUpdate={(geom) => geom.setPoints(curve.getPoints(40))} />
        <meshLineMaterial
          color="white"
          depthTest={false}
          resolution={[width, height]}
          transparent={true}
          lineWidth={0.25}
        />
      </mesh>
    </>
  )
}

/* Catches any render-time crash inside the 3D scene so a failure
 * logs loudly and leaves the static badge visible — instead of
 * silently blanking the column. */
class BadgeBoundary extends React.Component {
  constructor(props) { super(props); this.state = { broken: false } }
  static getDerivedStateFromError() { return { broken: true } }
  componentDidCatch(err) { logErr('crashed while rendering:', err) }
  render() { return this.state.broken ? null : this.props.children }
}

function App({ wrap, debug }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 13], fov: 25 }}
      dpr={[1, 1.5]}
      gl={{ alpha: true, antialias: true }}
      style={{ background: 'transparent', touchAction: 'pan-y' }}
      onCreated={() => {
        wrap.classList.add('live')
        wrap.classList.remove('loading')
        const hint = document.getElementById('badgeHint')
        if (hint) hint.textContent = 'grab the badge · throw it'
        log('live ✓ — grab the badge and throw it')
      }}
    >
      <ambientLight intensity={Math.PI} />
      <Env />
      <Physics debug={debug} interpolate gravity={[0, -40, 0]} timeStep={1 / 60}>
        <Band />
      </Physics>
    </Canvas>
  )
}

/* ════════════════════════════════════════════════════════════
   SELF-HEALING MOUNT
   Works with any combination of old/new index.html markup:
   - new layout:  #badgeWrap > #badge3d (canvas mount) + static badge
   - old layout:  #badge3d is itself the wrapper
   - missing mount: one is created inside the wrapper
   Flags: ?badge=force ignores reduced-motion · ?debug shows colliders
   ════════════════════════════════════════════════════════════ */
function boot() {
  if (window.__badgeMounted) return
  const params = new URLSearchParams(location.search)
  const force = params.get('badge') === 'force'
  const debug = params.has('debug')

  let wrap = document.getElementById('badgeWrap') || document.querySelector('.badge-wrap')
  let mount = document.getElementById('badge3d')

  if (!wrap && !mount) return logErr('no .badge-wrap / #badge3d found in the page — check index.html')
  if (!wrap) wrap = mount.closest('.badge-wrap') || mount
  if (!mount || mount === wrap) {
    if (mount === wrap) log('old-style markup detected — creating a canvas mount inside it')
    mount = document.createElement('div')
    mount.className = 'badge-canvas'
    wrap.appendChild(mount)
  }
  /* guarantee the mount fills the wrapper even if its CSS is missing */
  if (mount !== wrap) {
    Object.assign(mount.style, { position: 'absolute', inset: '0', zIndex: 2 })
  }

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches && !force) {
    return log('prefers-reduced-motion is on — keeping the static badge. Add ?badge=force to the URL to override.')
  }
  try {
    const c = document.createElement('canvas')
    if (!(c.getContext('webgl2') || c.getContext('webgl'))) {
      return logErr('WebGL unavailable — keeping the static badge')
    }
  } catch (e) {
    return logErr('WebGL check failed — keeping the static badge', e)
  }

  try {
    log('mounting 3D physics badge…' + (debug ? ' (debug colliders on)' : ''))
    window.__badgeMounted = true
    createRoot(mount).render(
      <BadgeBoundary>
        <App wrap={wrap} debug={debug} />
      </BadgeBoundary>
    )
  } catch (err) {
    window.__badgeMounted = false
    logErr('failed to mount:', err)
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot)
} else {
  boot()
}