import {
  WebGLRenderer, Scene, PerspectiveCamera, Group, Mesh, PlaneGeometry, MeshBasicMaterial, TextureLoader,
  SRGBColorSpace, EdgesGeometry, LineSegments, LineBasicMaterial, Color, Fog, Raycaster, Vector2, Vector3,
  LineLoop, BufferGeometry, Float32BufferAttribute,
} from 'three';

const PANEL_W = 2.6, PANEL_H = 1.625;
let RADIUS = 3.6;

const cssColor = (name) => {
  const c = document.createElement('canvas').getContext('2d', { willReadFrequently: true });
  c.fillStyle = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  c.fillRect(0, 0, 1, 1);
  const [r, g, b] = c.getImageData(0, 0, 1, 1).data;
  return new Color().setRGB(r / 255, g / 255, b / 255, SRGBColorSpace);
};

// Crop a texture to the panel like object-fit: cover, keeping the top of tall screenshots.
const cover = (tex) => {
  const a = tex.image.width / tex.image.height, p = PANEL_W / PANEL_H;
  if (a > p) { tex.repeat.set(p / a, 1); tex.offset.set((1 - p / a) / 2, 0); }
  else { tex.repeat.set(1, a / p); tex.offset.set(0, 1 - a / p); }
};

export function startGallery({ canvas, reduced }) {
  const hero = canvas.closest('.hero');
  const wrap = canvas.closest('[data-loop]');
  const label = document.getElementById('gallery-label');
  const pauseBtn = hero.querySelector('[data-loop-toggle]');
  const projects = [...document.querySelectorAll('.index__row')].map((row) => {
    const a = row.querySelector('h3 a');
    return { key: row.dataset.shot, name: a.textContent.trim(), href: a.href };
  });

  const renderer = new WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'low-power' });
  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.75));

  const scene = new Scene();
  scene.fog = new Fog(cssColor('--color-paper'), 9, 19);
  const camera = new PerspectiveCamera(34, 1, 0.1, 60);
  const ring = new Group();
  scene.add(ring);

  const loader = new TextureLoader();
  const geo = new PlaneGeometry(PANEL_W, PANEL_H);
  const edges = new EdgesGeometry(geo);
  const lineMat = new LineBasicMaterial({ color: cssColor('--color-muted') });
  const trackMat = new LineBasicMaterial({ color: cssColor('--color-rule-2') });
  const hotMat = new LineBasicMaterial({ color: cssColor('--color-accent') });
  const panels = projects.map((p, i) => {
    const holder = new Group();
    const mat = new MeshBasicMaterial({ color: cssColor('--color-paper-3'), toneMapped: false });
    const mesh = new Mesh(geo, mat);
    const frame = new LineSegments(edges, lineMat);
    frame.position.z = 0.002;
    holder.add(mesh, frame);
    const angle = (i / projects.length) * Math.PI * 2;
    holder.rotation.y = angle;
    holder.userData = { ...p, mesh, frame, lift: 0, angle, base: new Vector3(), normal: new Vector3(Math.sin(angle), 0, Math.cos(angle)) };
    mesh.userData.holder = holder;
    ring.add(holder);
    loader.load(`./work/${p.key}-800.webp`, (tex) => {
      tex.colorSpace = SRGBColorSpace;
      tex.anisotropy = 4;
      cover(tex);
      mat.map = tex;
      mat.color.set(0xffffff);
      mat.needsUpdate = true;
      render();
    });
    return holder;
  });

  // The orbit, drawn as a hairline under the panels.
  const track = new LineLoop(new BufferGeometry(), trackMat);
  ring.add(track);
  const placePanels = () => {
    panels.forEach((h, i) => {
      const a = h.userData.angle;
      h.userData.base.set(Math.sin(a) * RADIUS, (i % 2 ? 0.18 : -0.18), Math.cos(a) * RADIUS);
    });
    const pts = [];
    for (let k = 0; k < 96; k++) { const a = (k / 96) * Math.PI * 2; pts.push(Math.sin(a) * RADIUS * 1.04, -PANEL_H / 2 - 0.45, Math.cos(a) * RADIUS * 1.04); }
    track.geometry.setAttribute('position', new Float32BufferAttribute(pts, 3));
    track.geometry.computeBoundingSphere();
  };

  // Layout: the ring sits right of the text on wide screens, under it on narrow ones.
  let wide = true;
  const layout = () => {
    const w = canvas.clientWidth, h = canvas.clientHeight;
    wide = w > 960;
    camera.aspect = w / h;
    if (wide) {
      // Fit the ring between the text and the right edge, the front panel uncropped.
      camera.position.set(0, 0.6, 11);
      camera.lookAt(0, 0, 0);
      camera.updateProjectionMatrix();
      const cr = canvas.getBoundingClientRect();
      const text = hero.querySelector('.hero__text').getBoundingClientRect();
      const ringZ = -2.6;
      const toWorld = (px, z) => ((px / w) * 2 - 1) * Math.tan((camera.fov * Math.PI) / 360) * (11 - z) * camera.aspect;
      const left = toWorld(text.right - cr.left + 56, ringZ);
      const right = toWorld(w - 40, ringZ);
      RADIUS = Math.min(3.8, Math.max(2.4, (right - left) / 2 - PANEL_W * 0.45));
      ring.position.set((left + right) / 2, -0.15, ringZ);
      ring.rotation.set(0.2, 0, -0.04);
      scene.fog.near = 11; scene.fog.far = 21;
    } else {
      RADIUS = 3.2;
      ring.position.set(0, -2.2, -4.2);
      ring.rotation.set(0.22, 0, 0);
      camera.position.set(0, 0.4, 14);
      camera.lookAt(0, -0.6, 0);
      scene.fog.near = 14; scene.fog.far = 25;
    }
    camera.updateProjectionMatrix();
    renderer.setSize(w, h, false);
    placePanels();
  };

  // Hover and click.
  const ray = new Raycaster();
  const ndc = new Vector2(9, 9);
  const camDir = new Vector3();
  let hot = null;
  const pick = () => {
    ray.setFromCamera(ndc, camera);
    const hits = ray.intersectObjects(panels.map((p) => p.userData.mesh), false);
    camera.getWorldDirection(camDir);
    const n = new Vector3();
    for (const h of hits) {
      n.copy(h.object.userData.holder.userData.normal).applyQuaternion(ring.quaternion);
      if (n.dot(camDir) < -0.15) return h.object.userData.holder;
    }
    return null;
  };
  const setHot = (p) => {
    if (p === hot) return;
    if (hot) hot.userData.frame.material = lineMat;
    hot = p;
    if (hot) hot.userData.frame.material = hotMat;
    wrap.classList.toggle('is-pointing', !!hot);
    if (hot) {
      label.href = hot.userData.href;
      label.querySelector('b').textContent = hot.userData.name;
    }
    label.classList.toggle('is-on', !!hot);
    lifting = true;
    wake();
  };

  const tmp = new Vector3();
  const placeLabel = () => {
    if (!hot) return;
    hot.getWorldPosition(tmp);
    tmp.y += PANEL_H * 0.5 + 0.15;
    tmp.project(camera);
    const x = (tmp.x * 0.5 + 0.5) * canvas.clientWidth, y = (-tmp.y * 0.5 + 0.5) * canvas.clientHeight;
    label.style.transform = `translate3d(${Math.round(x - label.offsetWidth / 2)}px, ${Math.round(y - label.offsetHeight)}px, 0)`;
  };

  // Motion: a slow drift, plus a turn tied to scrolling through the hero.
  const state = { seen: true, held: reduced.matches, hover: false, focus: false };
  let drift = 0, scrollTurn = 0, raf = 0, last = performance.now(), acc = 0, lifting = false;
  const running = () => state.seen && !state.held && !state.hover && !state.focus;

  const update = (dt) => {
    if (running()) drift += dt * 0.07;
    ring.rotation.y = -Math.PI / 2 - 0.3 + drift + scrollTurn;
    let moving = false;
    panels.forEach((p) => {
      const target = p === hot && !reduced.matches ? 0.7 : 0;
      const d = target - p.userData.lift;
      if (Math.abs(d) > 0.002) { p.userData.lift += d * Math.min(1, dt * 9); moving = true; } else p.userData.lift = target;
      p.position.copy(p.userData.base).addScaledVector(p.userData.normal, p.userData.lift);
    });
    return moving;
  };

  const render = () => { renderer.render(scene, camera); placeLabel(); };

  const tick = (now) => {
    raf = 0;
    const dt = Math.min(now - last, 100) / 1000;
    last = now;
    acc += dt;
    if (acc >= 1 / 30) { lifting = update(acc); acc = 0; render(); }
    if (state.seen && (running() || lifting)) raf = requestAnimationFrame(tick);
  };
  const wake = () => { if (!raf && state.seen) { last = performance.now(); raf = requestAnimationFrame(tick); } };
  const sync = () => {
    wrap.classList.toggle('is-running', running());
    if (pauseBtn) pauseBtn.textContent = state.held ? 'Play' : 'Pause';
    wake();
  };

  hero.addEventListener('pointermove', (e) => {
    const r = canvas.getBoundingClientRect();
    ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -(((e.clientY - r.top) / r.height) * 2 - 1));
    if (e.target.closest('.hero__text, .hero__label, .hero__pause')) { if (e.target.closest('.hero__label')) return; setHot(null); state.hover = false; sync(); return; }
    setHot(pick());
    state.hover = !!hot;
    sync();
  }, { passive: true });
  hero.addEventListener('pointerleave', () => { setHot(null); state.hover = false; sync(); });
  canvas.addEventListener('click', () => { if (hot) location.href = hot.userData.href; });
  pauseBtn?.addEventListener('click', () => { state.held = !state.held; sync(); });
  hero.addEventListener('focusin', () => { state.focus = true; sync(); });
  hero.addEventListener('focusout', () => { state.focus = false; sync(); });

  new IntersectionObserver(([e]) => { state.seen = e.isIntersecting; sync(); }).observe(hero);
  addEventListener('scroll', () => {
    const r = hero.getBoundingClientRect();
    scrollTurn = Math.min(Math.max(-r.top / r.height, 0), 1) * (reduced.matches ? 0 : 1.1);
    if (state.seen) { update(0); if (!raf) requestAnimationFrame(render); }
  }, { passive: true });
  new ResizeObserver(() => { layout(); update(0); render(); }).observe(canvas);
  reduced.addEventListener?.('change', (e) => { state.held = e.matches; sync(); });
  addEventListener('modechange', () => {
    scene.fog.color.copy(cssColor('--color-paper'));
    lineMat.color.copy(cssColor('--color-muted'));
    trackMat.color.copy(cssColor('--color-rule-2'));
    hotMat.color.copy(cssColor('--color-accent'));
    render();
  });

  layout();
  update(0);
  render();
  sync();
}
