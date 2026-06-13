/* ============================================================================
   COMPLETE FILE — replace ALL of src/main.jsx with this.
   The lanyard is a FLAT WOVEN RIBBON (meshline + printed fabric texture),
   with real hardware (a crimp barrel + a split ring threaded through the badge
   slot). No round TubeGeometry anywhere on purpose.
   ============================================================================ */
   import React, { useRef, useState, useEffect, useMemo } from 'react'
   import { createRoot } from 'react-dom/client'
   import * as THREE from 'three'
   import { Canvas, extend, useThree, useFrame } from '@react-three/fiber'
   import { Physics, RigidBody, BallCollider, CuboidCollider, useRopeJoint, useSphericalJoint } from '@react-three/rapier'
   import { MeshLineGeometry, MeshLineMaterial } from 'meshline'
   
   /* meshline renders a flat, camera-facing ribbon. Registering it here is what
      lets us write <meshLineGeometry /> and <meshLineMaterial /> as JSX. */
   extend({ MeshLineGeometry, MeshLineMaterial })
   
   const log = (...a) => console.info('%c[badge]', 'color:#3DDC97;font-family:monospace', ...a)
   const logErr = (...a) => console.error('%c[badge]', 'color:#FF6B6B;font-family:monospace', ...a)
   
   /* The strap's lowest joint is pinned this far above the card centre (the card
      plane is 2.25 tall → half-height 1.125). The gap between this point and the
      card's top edge is where the metal hardware lives. */
   const CLIP_Y = 1.5
   
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
   
   /* ---- badge face (SVG data-URI texture) ---- */
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
       <rect x="402" y="56" width="220" height="46" rx="23" fill="#070B14" stroke="#3A4A70" stroke-width="3" />
       <text x="92" y="232" font-family="monospace" font-size="30" fill="#8E9AB2" letter-spacing="6">ACCESS // ENGINEERING</text>
       <text x="932" y="232" font-family="monospace" font-size="30" fill="#8E9AB2" text-anchor="end">'26</text>
       <line x1="92" y1="270" x2="932" y2="270" stroke="#2E3C5C" stroke-width="3" />
       <text x="86" y="488" font-family="sans-serif" font-size="168" font-weight="800" fill="#EDF1FA">ANTONY</text>
       <text x="86" y="648" font-family="sans-serif" font-size="168" font-weight="800" fill="#EDF1FA">PEREZ</text>
       <text x="92" y="744" font-family="monospace" font-size="44" font-weight="600" fill="url(#textGrad)" letter-spacing="10">SOFTWARE ENGINEER</text>
       <text x="92" y="864" font-family="monospace" font-size="33" fill="#5E6A83">stack</text>
       <text x="282" y="864" font-family="monospace" font-size="33" fill="#B9C4DA">k8s · react · typescript · CI/CD</text>
       <text x="92" y="928" font-family="monospace" font-size="33" fill="#5E6A83">repo</text>
       <text x="282" y="928" font-family="monospace" font-size="33" fill="#B9C4DA">github.com/AntonyPerez0</text>
       <text x="92" y="992" font-family="monospace" font-size="33" fill="#5E6A83">degree</text>
       <text x="282" y="992" font-family="monospace" font-size="33" fill="#B9C4DA">b.s. computer science 2026</text>
       <text x="92" y="1056" font-family="monospace" font-size="33" fill="#5E6A83">base</text>
       <text x="282" y="1056" font-family="monospace" font-size="33" fill="#B9C4DA">bay area, california</text>
       <g fill="#D7DEF0">
         <rect x="92" y="1204" width="8" height="110"/><rect x="108" y="1204" width="4" height="110"/>
         <rect x="120" y="1204" width="14" height="110"/><rect x="142" y="1204" width="6" height="110"/>
         <rect x="156" y="1204" width="18" height="110"/><rect x="182" y="1204" width="4" height="110"/>
         <rect x="194" y="1204" width="10" height="110"/><rect x="212" y="1204" width="22" height="110"/>
         <rect x="242" y="1204" width="8" height="110"/><rect x="258" y="1204" width="14" height="110"/>
         <rect x="280" y="1204" width="6" height="110"/><rect x="294" y="1204" width="16" height="110"/>
         <rect x="318" y="1204" width="4" height="110"/><rect x="330" y="1204" width="12" height="110"/>
       </g>
       <text x="92" y="1360" font-family="monospace" font-size="26" fill="#5E6A83">ANT-2026-SHIPIT</text>
       <rect x="632" y="1226" width="300" height="76" rx="38" fill="rgba(61,220,151,0.14)" stroke="#3DDC97" stroke-width="3" />
       <text x="668" y="1276" font-family="monospace" font-size="34" font-weight="600" fill="#3DDC97">✓ CI PASSED</text>
     </svg>`
     const dataUri = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg)
     const texture = new THREE.TextureLoader().load(dataUri)
     texture.colorSpace = THREE.SRGBColorSpace
     texture.anisotropy = 16
     return texture
   }
   
   /* ---- the WOVEN STRAP texture ----
      One seamless tile, repeated along the ribbon. Slightly lifted base + visible
      sewn binding edges so the full width of the strap reads against a dark page;
      woven ribbing, a top-lit sheen, and a printed wordmark. */
   function makeStrapTexture() {
     const W = 1024, H = 256
     const c = document.createElement('canvas')
     c.width = W; c.height = H
     const x = c.getContext('2d')
   
     // nylon base (lifted a touch so the strap stands out on a dark page)
     x.fillStyle = '#1B2130'
     x.fillRect(0, 0, W, H)
   
     // fine vertical weave threads
     x.globalAlpha = 0.06
     x.strokeStyle = '#A9B8D8'
     x.lineWidth = 1
     for (let i = 4; i < W; i += 6) {
       x.beginPath(); x.moveTo(i, 0); x.lineTo(i, H); x.stroke()
     }
     x.globalAlpha = 1
   
     // top-lit sheen → rounded fabric, not flat paper
     const g = x.createLinearGradient(0, 0, 0, H)
     g.addColorStop(0, 'rgba(255,255,255,0.16)')
     g.addColorStop(0.5, 'rgba(255,255,255,0.0)')
     g.addColorStop(1, 'rgba(0,0,0,0.34)')
     x.fillStyle = g
     x.fillRect(0, 0, W, H)
   
     // sewn binding edges (bright lines that define the strap width)
     x.strokeStyle = 'rgba(225,232,248,0.5)'
     x.lineWidth = 5
     x.beginPath()
     x.moveTo(0, 12); x.lineTo(W, 12)
     x.moveTo(0, H - 12); x.lineTo(W, H - 12)
     x.stroke()
     // dashed stitch just inside the binding
     x.strokeStyle = 'rgba(225,232,248,0.30)'
     x.setLineDash([12, 8]); x.lineWidth = 2
     x.beginPath()
     x.moveTo(0, 30); x.lineTo(W, 30)
     x.moveTo(0, H - 30); x.lineTo(W, H - 30)
     x.stroke()
     x.setLineDash([])
   
     // printed wordmark, centered with padding so tiles join in empty fabric
     x.fillStyle = '#EEF2FB'
     x.textBaseline = 'middle'
     x.textAlign = 'center'
     try { x.letterSpacing = '14px' } catch (e) {}
     x.font = '800 78px Arial, "Helvetica Neue", sans-serif'
     x.fillText('\u25C6   ANTONY PEREZ   \u25C6', W / 2, H / 2 + 2)
   
     const t = new THREE.CanvasTexture(c)
     t.wrapS = THREE.RepeatWrapping
     t.wrapT = THREE.RepeatWrapping
     t.anisotropy = 16
     t.colorSpace = THREE.SRGBColorSpace
     return t
   }
   
   function Band({ maxSpeed = 50, minSpeed = 10 }) {
     const band = useRef(), fixed = useRef(), j1 = useRef(), j2 = useRef(), j3 = useRef(), card = useRef()
     const vec = new THREE.Vector3(), ang = new THREE.Vector3(), rot = new THREE.Vector3(), dir = new THREE.Vector3()
     const segProps = { type: 'dynamic', canSleep: true, colliders: false, angularDamping: 4, linearDamping: 4 }
     const { width, height } = useThree((s) => s.size)
   
     const [curve] = useState(() => {
       const c = new THREE.CatmullRomCurve3([
         new THREE.Vector3(1.5, 0, 0),
         new THREE.Vector3(1.0, 0, 0),
         new THREE.Vector3(0.5, 0, 0),
         new THREE.Vector3(0.0, 0, 0),
       ])
       c.curveType = 'chordal'
       return c
     })
   
     const [dragged, drag] = useState(false)
     const [hovered, hover] = useState(false)
     const tex = useMemo(() => makeBadgeTexture(), [])
     const strapTex = useMemo(() => makeStrapTexture(), [])
   
     useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1])
     useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1])
     useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1])
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
         ;[j1, j2].forEach((ref) => {
           if (!ref.current.lerped) ref.current.lerped = new THREE.Vector3().copy(ref.current.translation())
           const clamped = Math.max(0.1, Math.min(1, ref.current.lerped.distanceTo(ref.current.translation())))
           ref.current.lerped.lerp(ref.current.translation(), delta * (minSpeed + clamped * (maxSpeed - minSpeed)))
         })
         curve.points[0].copy(j3.current.translation())
         curve.points[1].copy(j2.current.lerped)
         curve.points[2].copy(j1.current.lerped)
         curve.points[3].copy(fixed.current.translation())
         band.current.geometry.setPoints(curve.getPoints(32))
         ang.copy(card.current.angvel())
         rot.copy(card.current.rotation())
         card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z })
       }
     })
   
     /* shared metal look for the hardware (a factory so each mesh gets its own
        material element — React can't render the same element instance twice) */
     const metal = () => <meshStandardMaterial color="#C7D0E0" metalness={1} roughness={0.24} />
   
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
   
               {/* ---- LANYARD HARDWARE (the badge hook) ---- */}
               {/* fold-over crimp barrel where the strap ends */}
               <mesh position={[0, 1.46, 0]} rotation={[0, 0, Math.PI / 2]}>
                 <capsuleGeometry args={[0.06, 0.4, 6, 16]} />
                 {metal()}
               </mesh>
               {/* short link from crimp down to the ring */}
               <mesh position={[0, 1.36, 0]}>
                 <boxGeometry args={[0.07, 0.1, 0.06]} />
                 {metal()}
               </mesh>
               {/* split ring threaded through the card's top slot */}
               <mesh position={[0, 1.25, 0]}>
                 <torusGeometry args={[0.085, 0.022, 16, 30]} />
                 {metal()}
               </mesh>
               {/* reinforced slot tab on the card */}
               <mesh position={[0, 1.1, 0.012]}>
                 <boxGeometry args={[0.34, 0.1, 0.02]} />
                 <meshStandardMaterial color="#1B2740" metalness={0.2} roughness={0.6} />
               </mesh>
             </group>
           </RigidBody>
         </group>
   
         {/* THE LANYARD — a flat woven ribbon, outside the offset group so its
             world-space points line up with the physics joints. */}
         <mesh ref={band} raycast={() => null}>
           <meshLineGeometry />
           <meshLineMaterial
             color="white"
             depthTest={false}
             resolution={[width, height]}
             useMap={1}
             map={strapTex}
             repeat={[-3, 1]}
             lineWidth={1.2} /* ← strap width. Was 0.5 (too thin). Nudge to taste. */
           />
         </mesh>
       </>
     )
   }
   
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
      MOUNT — loads for everyone. The only thing that keeps the static
      badge instead is a browser with no WebGL at all.
      Flag: ?debug shows the Rapier colliders / joints.
      ════════════════════════════════════════════════════════════ */
   function boot() {
     if (window.__badgeMounted) return
     const debug = new URLSearchParams(location.search).has('debug')
   
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
     if (mount !== wrap) {
       Object.assign(mount.style, { position: 'absolute', inset: '0', zIndex: 2 })
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