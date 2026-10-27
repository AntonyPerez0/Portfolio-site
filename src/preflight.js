// The pre-flight checklist: each item ticks itself when the visitor really does the thing,
// the way SortiePrep lets the simulated jet decide when a step is complete.
const KEY = 'preflight';
const ITEMS = ['open', 'code', 'exp', 'resume'];

const load = () => { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch { return {}; } };
const save = (s) => { try { localStorage.setItem(KEY, JSON.stringify(s)); } catch { /* the list still works for this visit */ } };
const clock = (iso) => new Date(iso).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });

export function startPreflight() {
  let state = load();
  const chip = document.getElementById('pf-chip');
  const count = chip?.querySelector('[data-pf-count]');
  const done = document.querySelector('.checklist__done');

  const render = () => {
    let n = 0;
    ITEMS.forEach((id) => {
      const li = document.querySelector(`[data-pf-item="${id}"]`);
      if (!li) return;
      const at = state[id];
      if (at) n++;
      li.classList.toggle('is-done', !!at);
      li.querySelector('.checklist__state').textContent = at ? clock(at) : 'waiting';
    });
    const clear = n === ITEMS.length;
    if (count) count.textContent = clear ? 'cleared' : `${n} of ${ITEMS.length}`;
    chip?.classList.toggle('is-clear', clear);
    if (done) done.innerHTML = clear ? 'Cleared for contact: <a href="mailto:antonyperez0@yahoo.com">antonyperez0@yahoo.com</a>' : '';
  };

  const tick = (id) => {
    if (state[id]) return;
    state = { ...state, [id]: new Date().toISOString() };
    save(state);
    render();
    // Make the tick visible even when the link opened a new tab.
    const row = document.querySelector(`[data-pf-item="${id}"]`);
    [chip, row].forEach((el) => el?.classList.add('is-flash'));
    setTimeout(() => [chip, row].forEach((el) => el?.classList.remove('is-flash')), 1400);
  };

  document.addEventListener('click', (e) => {
    const a = e.target.closest('[data-pf]');
    if (a) tick(a.dataset.pf);
  });

  const exp = document.getElementById('experience');
  if (exp) {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { tick('exp'); io.disconnect(); } }, { threshold: 0.4 });
    io.observe(exp);
  }

  document.querySelector('[data-pf-reset]')?.addEventListener('click', () => {
    state = {};
    save(state);
    render();
  });

  render();
}
