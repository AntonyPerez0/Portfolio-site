import { startPreflight } from './preflight.js';
import { startActivity } from './activity.js';

// Light and dark: dark first, the choice remembered.
const root = document.documentElement;
const modeBtn = document.getElementById('mode');
const themeMeta = document.querySelector('meta[name="theme-color"]');
const applyMode = (mode) => {
  root.dataset.mode = mode;
  modeBtn?.setAttribute('aria-label', mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
  themeMeta?.setAttribute('content', mode === 'dark' ? '#16191d' : '#f8f6f1');
};
applyMode(root.dataset.mode === 'light' ? 'light' : 'dark');
modeBtn?.addEventListener('click', () => {
  const next = root.dataset.mode === 'dark' ? 'light' : 'dark';
  try { localStorage.setItem('mode', next); } catch { /* private mode: the switch still works for this visit */ }
  applyMode(next);
});

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

startPreflight();
startActivity('AntonyPerez0');
