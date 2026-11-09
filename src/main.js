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
