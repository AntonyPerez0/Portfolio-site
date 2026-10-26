
const reduced = matchMedia('(prefers-reduced-motion: reduce)');

// Work index: the sticky preview follows the row under the pointer or keyboard focus.
const rows = [...document.querySelectorAll('.index__row')];
const shots = [...document.querySelectorAll('.preview__shot')];
const show = (row) => {
  const key = row.dataset.shot;
  rows.forEach((r) => r.classList.toggle('is-on', r === row));
  shots.forEach((s) => s.classList.toggle('is-on', s.dataset.shot === key));
};
rows.forEach((row) => {
  row.addEventListener('pointerenter', () => show(row));
  row.addEventListener('focusin', () => show(row));
});
if (rows[0]) rows[0].classList.add('is-on');

// Copy the email address.
document.querySelectorAll('[data-copy]').forEach((btn) => {
  const status = btn.parentElement.querySelector('[role="status"]');
  btn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(btn.dataset.copy);
      status.textContent = 'Address copied to your clipboard.';
    } catch {
      status.textContent = 'Your browser blocked copying. Select the address above instead.';
    }
  });
});

// The hairline elbow joins the printf line to the line it printed.
const mapping = document.querySelector('.mapping');
const drawElbow = () => {
  if (!mapping) return;
  const svg = mapping.querySelector('.mapping__elbow');
  const [from, to] = mapping.querySelectorAll('.mapping__hit');
  if (!svg || !from || !to || getComputedStyle(svg).display === 'none') return;
  const box = svg.getBoundingClientRect();
  const y1 = from.getBoundingClientRect().top + from.offsetHeight / 2 - box.top;
  const y2 = to.getBoundingClientRect().top + to.offsetHeight / 2 - box.top;
  const w = box.width;
  svg.setAttribute('viewBox', `0 0 ${w} ${box.height}`);
  svg.querySelector('path').setAttribute('d', `M0 ${y1} H${w / 2} V${y2} H${w}`);
};
document.fonts.ready.then(drawElbow);
addEventListener('resize', drawElbow, { passive: true });

// The pipeline: only when WebGL is available.
const canvas = document.getElementById('pipeline');
const gl = canvas && document.createElement('canvas').getContext('webgl2');
if (gl) {
  document.documentElement.classList.add('has-gl');
  import('./pipeline.js').then(({ startPipeline }) => startPipeline({ canvas, reduced }));
}
