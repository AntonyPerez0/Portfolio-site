import { startActivity } from './activity.js';

// Light and dark: follow the system until the visitor picks one, then remember it.
const root = document.documentElement;
const modeBtn = document.getElementById('mode');
const themeMeta = document.querySelector('meta[name="theme-color"]');
const systemDark = matchMedia('(prefers-color-scheme: dark)');
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const saved = () => { try { return localStorage.getItem('mode'); } catch { return null; } };

const applyMode = (mode) => {
  root.dataset.mode = mode;
  modeBtn?.setAttribute('aria-label', mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
  themeMeta?.setAttribute('content', mode === 'dark' ? '#111110' : '#fdfdfc');
};
applyMode(root.dataset.mode === 'dark' ? 'dark' : 'light');

modeBtn?.addEventListener('click', () => {
  const next = root.dataset.mode === 'dark' ? 'light' : 'dark';
  try { localStorage.setItem('mode', next); } catch { /* private mode: the switch still works for this visit */ }
  if (document.startViewTransition && !reducedMotion.matches) document.startViewTransition(() => applyMode(next));
  else applyMode(next);
});
systemDark.addEventListener('change', (e) => { if (!saved()) applyMode(e.matches ? 'dark' : 'light'); });

// Desktop header: a hairline once the page scrolls under it, and the nav marks the section in view.
const header = document.querySelector('.top');
const onScroll = () => header?.classList.toggle('is-stuck', scrollY > 4);
addEventListener('scroll', onScroll, { passive: true });
onScroll();

const navLinks = [...document.querySelectorAll('.top__nav a[href^="#"]')];
const watched = [document.querySelector('.hero'), ...navLinks.map((a) => document.querySelector(a.hash))].filter(Boolean);
if ('IntersectionObserver' in window && navLinks.length) {
  const spy = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      navLinks.forEach((a) => (a.hash === `#${e.target.id}` ? a.setAttribute('aria-current', 'location') : a.removeAttribute('aria-current')));
    }
  }, { rootMargin: '-45% 0px -50% 0px' });
  watched.forEach((el) => spy.observe(el));
}

// Copy the email address; the button only appears where the clipboard API exists.
document.querySelectorAll('[data-copy]').forEach((btn) => {
  if (!navigator.clipboard) return;
  btn.hidden = false;
  const status = document.querySelector('.contact__status');
  btn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(btn.dataset.copy);
      status.textContent = 'Copied to your clipboard.';
    } catch {
      status.textContent = 'Your browser blocked copying. Select the address instead.';
    }
  });
});

startActivity('AntonyPerez0');
