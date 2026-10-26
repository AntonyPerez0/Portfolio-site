import {
  WebGLRenderer, Scene, PerspectiveCamera, Group, Mesh, PlaneGeometry, InstancedBufferGeometry,
  InstancedBufferAttribute, ShaderMaterial, CanvasTexture, Vector2, Vector3, LineSegments,
  BufferGeometry, Float32BufferAttribute, LineBasicMaterial, Color, SRGBColorSpace,
} from 'three';

// The program the field compiles: the same swap.c the Arena section shows.
const SOURCE = `#include <stdio.h>
void swap(int *a, int *b) { int t = *a; *a = *b; *b = t; }
int main(void) { int x = 4, y = 2; swap(&x, &y); printf("x = %d, y = %d\\n", x, y); return 0; }`;

const STAGES = [
  SOURCE.replace(/\s+/g, ''),                         // source: every character, as typed
  'intvoidreturnswapmainprintfxyabt420',               // tokens: identifiers and literals
  '(){}[]<>/\\|=*&;,+-',                                // syntax tree: structure
  'local.geti32.loadi32.storecall$swapend',            // IR: wasm text mnemonics
  '0123456789abcdef',                                  // wasm: bytes as hex
];
const BOUNDS = [0.2, 0.4, 0.6, 0.8];
const LEN = 17;

const cssColor = (name) => {
  const c = document.createElement('canvas').getContext('2d', { willReadFrequently: true });
  c.fillStyle = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  c.fillRect(0, 0, 1, 1);
  const [r, g, b] = c.getImageData(0, 0, 1, 1).data;
  return new Vector3(r / 255, g / 255, b / 255);
};

async function makeAtlas(chars) {
  const font = '500 76px "JetBrains Mono", ui-monospace, monospace';
  try { await document.fonts.load(font); } catch { /* the fallback mono is fine */ }
  const cols = 16, cw = 64, ch = 128;
  const rows = Math.ceil(chars.length / cols);
  const cv = document.createElement('canvas');
  cv.width = cols * cw; cv.height = rows * ch;
  const ctx = cv.getContext('2d');
  ctx.fillStyle = 'rgb(0 0 0)'; ctx.fillRect(0, 0, cv.width, cv.height);
  ctx.fillStyle = 'rgb(255 255 255)'; ctx.font = font; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  [...chars].forEach((c, i) => ctx.fillText(c, (i % cols) * cw + cw / 2, Math.floor(i / cols) * ch + ch / 2 + 4));
  const tex = new CanvasTexture(cv);
  tex.anisotropy = 4;
  return { tex, cols, rows };
}

const VERT = /* glsl */ `
  attribute vec4 aSeed;
  attribute vec4 aG;
  attribute float aG4;
  attribute float aSpeed;
  uniform float uTime, uLen, uCols, uRows, uAspect, uLens;
  uniform vec2 uCell, uPointer;
  varying vec2 vUv;
  varying float vTone, vAlpha, vLens;
  void main() {
    float u = fract(aSeed.x + uTime * aSpeed);
    float stage = min(floor(u * 5.0), 4.0);
    float g = stage < 0.5 ? aG.x : stage < 1.5 ? aG.y : stage < 2.5 ? aG.z : stage < 3.5 ? aG.w : aG4;
    float order = smoothstep(0.14, 0.74, u);
    float x = (u - 0.5) * uLen;
    float yRaw = (aSeed.y - 0.5) * 2.6 + sin(uTime * 0.6 + aSeed.w * 40.0 + x * 0.5) * 0.18;
    float zRaw = (aSeed.z - 0.5) * 2.6;
    float ySnap = ((floor(aSeed.y * 9.0) + 0.5) / 9.0 - 0.5) * 1.4;
    float zSnap = ((floor(aSeed.z * 4.0) + 0.5) / 4.0 - 0.5) * 1.3;
    vec3 p = vec3(x, mix(yRaw, ySnap, order), mix(zRaw, zSnap, order));
    vec4 clip = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
    vec2 ndc = clip.xy / clip.w;
    float d = distance(ndc * vec2(uAspect, 1.0), uPointer * vec2(uAspect, 1.0));
    float lens = uLens * (1.0 - smoothstep(0.0, 0.32, d));
    float s = 1.0 + lens * 0.9;
    vec3 pos = p + vec3(position.x * uCell.x * s, position.y * uCell.y * s, 0.0);
    vUv = (uv + vec2(mod(g, uCols), uRows - 1.0 - floor(g / uCols))) / vec2(uCols, uRows);
    vTone = clamp(0.12 + 0.88 * order * (0.55 + 0.45 * aSeed.w), 0.0, 1.0);
    vAlpha = smoothstep(0.0, 0.05, u) * (1.0 - smoothstep(0.95, 1.0, u));
    vLens = lens;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const FRAG = /* glsl */ `
  uniform sampler2D uAtlas;
  uniform vec3 uC1, uC2, uC3, uC4, uDeep, uAccent;
  varying vec2 vUv;
  varying float vTone, vAlpha, vLens;
  void main() {
    float a = texture2D(uAtlas, vUv).r;
    if (a < 0.03) discard;
    vec3 c = vTone < 0.34 ? mix(uC1, uC2, vTone / 0.34)
           : vTone < 0.67 ? mix(uC2, uC3, (vTone - 0.34) / 0.33)
           : mix(uC3, uC4, (vTone - 0.67) / 0.33);
    c = mix(c, uDeep, step(0.94, vTone));
    c = mix(c, uAccent, vLens);
    gl_FragColor = vec4(c, a * vAlpha);
  }
`;

export async function startPipeline({ canvas, reduced }) {
  const hero = canvas.closest('.hero');
  const field = canvas.closest('[data-loop]');
  const pauseBtn = document.querySelector('[data-loop-toggle]');
  const labels = [...document.querySelectorAll('#stages li')];

  const chars = [...new Set(STAGES.join(''))].join('');
  const idx = (c) => chars.indexOf(c);
  const { tex, cols, rows } = await makeAtlas(chars);

  const renderer = new WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'low-power' });
  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.75));

  const scene = new Scene();
  const camera = new PerspectiveCamera(30, 1, 0.1, 100);
  const group = new Group();
  group.rotation.set(0.12, -0.24, 0);
  scene.add(group);

  // Glyphs: one instanced quad per character.
  const small = innerWidth < 640;
  const n = small ? 1500 : 3400;
  const quad = new PlaneGeometry(1, 2);
  const geo = new InstancedBufferGeometry();
  geo.index = quad.index;
  geo.setAttribute('position', quad.getAttribute('position'));
  geo.setAttribute('uv', quad.getAttribute('uv'));
  const seed = new Float32Array(n * 4), gA = new Float32Array(n * 4), g4 = new Float32Array(n), speed = new Float32Array(n);
  const pick = (s) => idx(s[Math.floor(Math.random() * s.length)]);
  for (let i = 0; i < n; i++) {
    seed.set([Math.random(), Math.random(), Math.random(), Math.random()], i * 4);
    gA.set([pick(STAGES[0]), pick(STAGES[1]), pick(STAGES[2]), pick(STAGES[3])], i * 4);
    g4[i] = pick(STAGES[4]);
    speed[i] = 0.011 + Math.random() * 0.006;
  }
  geo.setAttribute('aSeed', new InstancedBufferAttribute(seed, 4));
  geo.setAttribute('aG', new InstancedBufferAttribute(gA, 4));
  geo.setAttribute('aG4', new InstancedBufferAttribute(g4, 1));
  geo.setAttribute('aSpeed', new InstancedBufferAttribute(speed, 1));
  geo.instanceCount = n;

  const pointer = new Vector2(9, 9);
  const uniforms = {
    uTime: { value: 18 }, uLen: { value: LEN }, uCols: { value: cols }, uRows: { value: rows },
    uAspect: { value: 1 }, uLens: { value: 0 }, uCell: { value: new Vector2(0.075, 0.075) }, uPointer: { value: pointer },
    uAtlas: { value: tex },
    uC1: { value: cssColor('--color-glyph-1') }, uC2: { value: cssColor('--color-glyph-2') },
    uC3: { value: cssColor('--color-glyph-3') }, uC4: { value: cssColor('--color-glyph-4') },
    uDeep: { value: cssColor('--color-accent-deep') }, uAccent: { value: cssColor('--color-accent') },
  };
  const mat = new ShaderMaterial({ vertexShader: VERT, fragmentShader: FRAG, uniforms, transparent: true, depthWrite: false });
  const glyphs = new Mesh(geo, mat);
  glyphs.frustumCulled = false;
  group.add(glyphs);

  // Stage gates and two rails: hairlines in the theme's rule colour.
  const rule = cssColor('--color-rule-2');
  const pts = [];
  const H = 1.05, D = 0.85;
  BOUNDS.forEach((b) => {
    const x = (b - 0.5) * LEN;
    const c = [[x, -H, -D], [x, H, -D], [x, H, D], [x, -H, D]];
    for (let i = 0; i < 4; i++) pts.push(...c[i], ...c[(i + 1) % 4]);
  });
  [-D, D].forEach((z) => pts.push(-LEN * 0.32, -H, z, LEN / 2, -H, z));
  const lineGeo = new BufferGeometry();
  lineGeo.setAttribute('position', new Float32BufferAttribute(pts, 3));
  const lines = new LineSegments(lineGeo, new LineBasicMaterial({ color: new Color().setRGB(rule.x, rule.y, rule.z, SRGBColorSpace), transparent: true, opacity: 0.9 }));
  group.add(lines);

  // Camera rig: scroll moves it along the pipeline.
  let progress = 0;
  const placeCamera = () => {
    const w = canvas.clientWidth, h = canvas.clientHeight;
    const narrow = w < 720;
    const z = (narrow ? 24 : 18.5) - progress * 3;
    camera.position.set(0.3 + progress * 3.6, narrow ? 2.4 : 2.1, z);
    camera.lookAt(0.6 + progress * 3.6, narrow ? 4.6 : 2.55, 0);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    uniforms.uAspect.value = w / h;
  };

  const tmp = new Vector3();
  const placeLabels = () => {
    const w = canvas.clientWidth, h = canvas.clientHeight;
    group.updateMatrixWorld();
    labels.forEach((li, i) => {
      tmp.set((i * 0.2 + 0.1 - 0.5) * LEN, -H - 0.2, D).applyMatrix4(group.matrixWorld).project(camera);
      const x = (tmp.x * 0.5 + 0.5) * w, y = (-tmp.y * 0.5 + 0.5) * h;
      const inView = tmp.z < 1 && x > 40 && x < w - 40 && y > 0 && y < h;
      li.style.transform = `translate3d(${Math.round(x - li.offsetWidth / 2)}px, ${Math.round(y)}px, 0)`;
      li.classList.toggle('is-placed', inView);
    });
  };

  const resize = () => {
    renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
    placeCamera();
  };

  const render = () => {
    renderer.render(scene, camera);
    placeLabels();
  };

  // Running state: on screen, not held by the button, not hovered or focused.
  const state = { seen: true, held: reduced.matches, hover: false, focus: false };
  let last = performance.now(), acc = 0, raf = 0;
  const running = () => state.seen && !state.held && !state.hover && !state.focus;
  const tick = (now) => {
    raf = 0;
    const dt = Math.min(now - last, 100);
    last = now;
    acc += dt;
    if (acc >= 33) {
      if (running()) uniforms.uTime.value += acc / 1000;
      acc = 0;
      render();
    }
    if (state.seen && (running() || uniforms.uLens.value > 0)) raf = requestAnimationFrame(tick);
  };
  const wake = () => { if (!raf && state.seen) { last = performance.now(); raf = requestAnimationFrame(tick); } };
  const sync = () => {
    field.classList.toggle('is-running', running());
    if (pauseBtn) pauseBtn.textContent = state.held ? 'Play' : 'Pause';
    wake();
  };

  pauseBtn?.addEventListener('click', () => { state.held = !state.held; sync(); });
  hero.addEventListener('focusin', () => { state.focus = true; sync(); });
  hero.addEventListener('focusout', () => { state.focus = false; sync(); });

  if (!reduced.matches) {
    hero.addEventListener('pointermove', (e) => {
      const r = canvas.getBoundingClientRect();
      pointer.set(((e.clientX - r.left) / r.width) * 2 - 1, -(((e.clientY - r.top) / r.height) * 2 - 1));
      uniforms.uLens.value = 1;
      state.hover = e.pointerType === 'mouse';
      sync();
    }, { passive: true });
    hero.addEventListener('pointerleave', () => { uniforms.uLens.value = 0; state.hover = false; sync(); render(); });
  }

  new IntersectionObserver(([e]) => { state.seen = e.isIntersecting; sync(); }).observe(hero);

  addEventListener('scroll', () => {
    const r = hero.getBoundingClientRect();
    progress = Math.min(Math.max(-r.top / r.height, 0), 1);
    if (state.seen) { placeCamera(); if (!raf) requestAnimationFrame(render); }
  }, { passive: true });

  new ResizeObserver(() => { resize(); render(); }).observe(canvas);
  reduced.addEventListener?.('change', (e) => { state.held = e.matches; sync(); });

  resize();
  render();
  sync();
}
