// Cobalt's ground: value noise sampled per 8 x 16 cell into a character ramp,
// tinted from the glyph tokens, densest toward the side where the work sits.
const RAMP = ' .:-=+*#%';
const CW = 8, CH = 16;

const hash = (x, y) => {
  const h = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
  return h - Math.floor(h);
};
const smooth = (t) => t * t * (3 - 2 * t);
const noise = (x, y) => {
  const xi = Math.floor(x), yi = Math.floor(y), xf = x - xi, yf = y - yi;
  const a = hash(xi, yi), b = hash(xi + 1, yi), c = hash(xi, yi + 1), d = hash(xi + 1, yi + 1);
  const u = smooth(xf), v = smooth(yf);
  return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
};
const fbm = (x, y) => 0.6 * noise(x, y) + 0.3 * noise(x * 2.1, y * 2.1) + 0.1 * noise(x * 4.3, y * 4.3);

// Where each field is allowed to be dense: 0 keeps it empty, 1 lets it run.
const SHAPES = {
  hero: (u, v, wide) => (wide ? Math.min(1, Math.max(0, (u - 0.34) / 0.4)) : Math.min(1, Math.max(0, (v - 0.45) / 0.35))),
  band: (u) => 0.75 + 0.6 * u,
  contact: (u, v) => 1.35 * Math.max(0, (u - 0.45) / 0.55) * Math.min(1, Math.max(0, (v - 0.24) / 0.16)) * (1 - v * 0.5),
};

export function startFields({ reduced }) {
  const fields = [...document.querySelectorAll('canvas[data-field]')].map((canvas) => ({
    canvas, ctx: canvas.getContext('2d'), shape: SHAPES[canvas.dataset.field] || SHAPES.band,
    animate: canvas.dataset.field === 'hero', seen: false, w: 0, h: 0,
  }));
  if (!fields.length) return;

  let colors = [];
  const readColors = () => {
    const cs = getComputedStyle(document.documentElement);
    colors = ['--color-glyph-1', '--color-glyph-2', '--color-glyph-3', '--color-glyph-4', '--color-accent-deep'].map((n) => cs.getPropertyValue(n).trim());
  };

  const size = (f) => {
    const r = f.canvas.getBoundingClientRect();
    const dpr = Math.min(devicePixelRatio || 1, 2);
    f.w = r.width; f.h = r.height;
    f.canvas.width = Math.round(r.width * dpr); f.canvas.height = Math.round(r.height * dpr);
    f.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };

  const draw = (f, t) => {
    const { ctx, w, h } = f;
    if (!w || !h) return;
    ctx.clearRect(0, 0, w, h);
    ctx.font = '500 13px "JetBrains Mono", ui-monospace, monospace';
    ctx.textBaseline = 'top';
    const cols = Math.ceil(w / CW), rows = Math.ceil(h / CH), wide = w > 720;
    const buckets = [[], [], [], [], []];
    for (let j = 0; j < rows; j++) {
      for (let i = 0; i < cols; i++) {
        const u = i / cols, v = j / rows;
        const m = f.shape(u, v, wide);
        if (m <= 0.02) continue;
        const n = fbm(i * 0.07 + t * 0.05, j * 0.14 - t * 0.02) * m;
        if (n < 0.4 || hash(i, j) > 0.55 + n * 0.5) continue;
        const k = Math.min(RAMP.length - 1, 1 + Math.floor((n - 0.4) * 2.2 * RAMP.length));
        const tone = Math.min(4, Math.floor((n - 0.4) * 7.5));
        buckets[tone].push(i, j, k);
      }
    }
    buckets.forEach((b, tone) => {
      ctx.fillStyle = colors[tone];
      for (let p = 0; p < b.length; p += 3) ctx.fillText(RAMP[b[p + 2]], b[p] * CW, b[p + 1] * CH);
    });
    f.canvas.classList.add('is-drawn');
  };

  readColors();
  const io = new IntersectionObserver((es) => es.forEach((e) => {
    const f = fields.find((x) => x.canvas === e.target);
    f.seen = e.isIntersecting;
    if (f.seen && !f.w) { size(f); draw(f, t); }
    if (f.seen) wake();
  }));
  fields.forEach((f) => io.observe(f.canvas));
  new ResizeObserver(() => fields.forEach((f) => { size(f); draw(f, t); })).observe(document.body);

  // The hero field drifts at 15 fps while on screen; the others hold still.
  let t = 7, raf = 0, last = 0;
  const hero = fields.find((f) => f.animate);
  const tick = (now) => {
    raf = 0;
    if (!hero || !hero.seen || reduced.matches) return;
    if (now - last > 66) { t += (now - last) / 1000; last = now; draw(hero, t); }
    raf = requestAnimationFrame(tick);
  };
  const wake = () => { if (!raf && hero?.seen && !reduced.matches) { last = performance.now(); raf = requestAnimationFrame(tick); } };

  addEventListener('modechange', () => { readColors(); fields.forEach((f) => draw(f, t)); });
  document.fonts.ready.then(() => fields.forEach((f) => { size(f); draw(f, t); }));
}
