/* ============================================================================
   ANTONY III — THE FROZEN PORTFOLIO · easter-egg controller
   Vanilla JS on purpose: the 3D scene is dynamically imported so this entry
   stays tiny, and the menu still works when WebGL is unavailable or the user
   prefers reduced motion (the static CSS scene takes over).
   ============================================================================ */

const GITHUB = 'https://github.com/AntonyPerez0';
const LINKEDIN = 'https://linkedin.com/in/antonyperez-swe';
const EMAIL = 'antonyperez0@yahoo.com';

const SCREENS = {
  about: {
    title: 'About Me',
    html: `
      <p class="fs-p">Software engineer in the SF Bay Area building full-stack applications —
      and the <b>GitOps infrastructure they ship on</b> — with a CI pipeline proving every commit.</p>
      <dl class="fs-kv">
        <dt>class</dt><dd>Software Engineer · B.S. Computer Science (May 2026)</dd>
        <dt>guild</dt><dd>Clover Network — technical writing &amp; automation that ships</dd>
        <dt>realm</dt><dd>SF Bay Area, California</dd>
        <dt>status</dt><dd>Open to software engineering roles</dd>
      </dl>
      <h3 class="fs-h3">Contact</h3>
      <div class="fs-chipbtns">
        <a href="mailto:${EMAIL}">✉ Email me</a>
        <a href="${GITHUB}" target="_blank" rel="noopener">GitHub ↗</a>
        <a href="${LINKEDIN}" target="_blank" rel="noopener">LinkedIn ↗</a>
        <a href="resume.pdf" download>Résumé ↓</a>
      </div>`,
  },
  projects: {
    title: 'Campaign Missions',
    html: `
      <div class="fs-row"><span class="nm">SortiePrep</span><span class="dsc">DCS cockpit trainer — click the real switches; the aircraft decides when you're done. 100+ monthly visitors.</span><a href="https://sortieprep.com/" target="_blank" rel="noopener">live ↗</a></div>
      <div class="fs-row"><span class="nm">C/C++ Arena</span><span class="dsc">Learn C and C++ with a real Clang 20 compiler running as WebAssembly — 48 modules, 657 drills, zero servers.</span><a href="https://cpparena.com" target="_blank" rel="noopener">live ↗</a></div>
      <div class="fs-row"><span class="nm">Java Arena</span><span class="dsc">The Helsinki MOOC rebuilt: javac 21 and a real JVM running in your browser.</span><a href="${GITHUB}/Java-Arena" target="_blank" rel="noopener">live ↗</a></div>
      <div class="fs-row"><span class="nm">Emulingo</span><span class="dsc">Learn a language by playing Game Boy games — live OCR, translation, TTS and flashcards.</span><a href="${GITHUB}/emulingo" target="_blank" rel="noopener">live ↗</a></div>
      <div class="fs-row"><span class="nm">BuildForge</span><span class="dsc">Second-screen build companion for Diablo IV and WoW Forever — offline PWA, nightly syncs.</span><a href="${GITHUB}/buildforge" target="_blank" rel="noopener">live ↗</a></div>
      <div class="fs-row"><span class="nm">News Dashboard</span><span class="dsc">Ambient fullscreen news for a second monitor — zero API keys, weeks of unattended runtime.</span><a href="https://newsdash.page" target="_blank" rel="noopener">live ↗</a></div>
      <div class="fs-row"><span class="nm">CS2 Pro Configs</span><span class="dsc">620+ pro players' settings as one-click copy-paste console commands, auto-updated weekly.</span><a href="${GITHUB}/cs2-pro-configs" target="_blank" rel="noopener">live ↗</a></div>
      <div class="fs-row"><span class="nm">GitOps Homelab</span><span class="dsc">Production-grade bare-metal Kubernetes — Talos, FluxCD, Falco eBPF, full observability.</span><a href="${GITHUB}/homelab" target="_blank" rel="noopener">github ↗</a></div>
      <div class="fs-row"><span class="nm">DefectPredict</span><span class="dsc">CS capstone — ML that reorders the regression suite to run the riskiest tests first.</span><a href="${GITHUB}" target="_blank" rel="noopener">github ↗</a></div>`,
  },
  xp: {
    title: 'Experience',
    html: `
      <h3 class="fs-h3">Clover Network · Technical Writer</h3>
      <p class="fs-p">Sept 2024 - Present · Sunnyvale, CA. Architected GitHub Actions automation and CI guardrails that
      <b>improved platform integrity by 95%</b>; migrated legacy docs into a git-backed architecture;
      built API integrations for mobile SDKs and core e-commerce modules.</p>
      <h3 class="fs-h3">UL Solutions · Laboratory Technician</h3>
      <p class="fs-p">Apr 2022 - Sept 2024 · Fremont, CA. Ran hardware-software interoperability safety tests for
      <b>Tier-1 enterprise customers</b>; isolated edge-case defects alongside systems engineers, cutting
      product defect rates by <b>15%</b>.</p>`,
  },
  skills: {
    title: 'The Toolbox',
    html: `
      <div class="fs-cols">
        <div class="fs-col"><h4>Languages</h4><ul>
          <li>TypeScript</li><li>JavaScript</li><li>Python</li><li>Java</li><li>Kotlin</li><li>SQL</li>
        </ul></div>
        <div class="fs-col"><h4>Frameworks</h4><ul>
          <li>React</li><li>Node.js · Express</li><li>Three.js · R3F</li><li>Vite</li><li>Tailwind</li>
        </ul></div>
        <div class="fs-col"><h4>DevOps &amp; Testing</h4><ul>
          <li>Kubernetes · Docker</li><li>FluxCD · Kustomize</li><li>GitHub Actions</li><li>Tailscale</li><li>Vitest · JUnit · RTL</li>
        </ul></div>
      </div>`,
  },
  credits: {
    title: 'Credits',
    html: `
      <h3 class="fs-h3">Education</h3>
      <div class="fs-row"><span class="nm">B.S. Computer Science</span><span class="dsc">Western Governors University — completing May 2026</span></div>
      <div class="fs-row"><span class="nm">SWE Apprenticeship</span><span class="dsc">Multiverse — Computer Software Engineering, 2024-2025</span></div>
      <div class="fs-row"><span class="nm">Full-Stack Certificate</span><span class="dsc">Altcademy — Full Stack Web Development, 2024</span></div>
      <h3 class="fs-h3">This Screen</h3>
      <p class="fs-p">Built by hand — a 3D Icecrown-style scene rendered with Three.js and hand-drawn CSS.
      <b>Deployed by pipeline.</b></p>
      <p class="fs-note">A fan-made homage to Warcraft III: The Frozen Throne. No Blizzard assets are used anywhere —
      every pixel here is generated in the browser. Warcraft III is a trademark of Blizzard Entertainment.
      This page is not affiliated with or endorsed by Blizzard.</p>`,
  },
};

let subOpen = false;
let lastFocus = null;
let sceneTeardown = null;
let sceneLoading = null;

const sub = () => document.getElementById('fsSub');
const subBody = () => document.getElementById('fsSubBody');

function openSub(key, opener) {
  const screen = SCREENS[key];
  if (!screen) return;
  lastFocus = opener || document.activeElement;
  document.getElementById('fsSubTitle').textContent = screen.title;
  subBody().innerHTML = screen.html;
  subBody().scrollTop = 0;
  sub().hidden = false;
  subOpen = true;
  window.__fsSubOpen = true;
  subBody().focus();
}

function closeSub() {
  if (!subOpen) return;
  sub().hidden = true;
  subOpen = false;
  window.__fsSubOpen = false;
  if (lastFocus && lastFocus.focus) lastFocus.focus();
  lastFocus = null;
}

/* focus trap inside the sub-screen dialog */
document.addEventListener('keydown', (e) => {
  if (!subOpen || e.key !== 'Tab') return;
  e.preventDefault(); /* the body div is the only focusable stop by design */
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && subOpen) closeSub();
});

function webglOK() {
  try {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl2') || c.getContext('webgl'));
  } catch (e) { return false; }
}

async function enter() {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (sceneTeardown || sceneLoading || reduced || !webglOK()) return;
  sceneLoading = import('./frozen-scene.jsx');
  try {
    const mod = await sceneLoading;
    const container = document.getElementById('frozenBg');
    if (container) sceneTeardown = mod.mountScene(container);
  } catch (err) {
    console.info('[frozen] 3D scene unavailable — keeping the static sky', err);
  } finally {
    sceneLoading = null;
  }
}

function leave() {
  if (sceneTeardown) { sceneTeardown(); sceneTeardown = null; }
  closeSub();
}

window.addEventListener('fs:mode', (e) => { e.detail.on ? enter() : leave(); });

document.addEventListener('click', (e) => {
  const closer = e.target.closest('[data-fs-close]');
  if (closer) { closeSub(); return; }
  const btn = e.target.closest('[data-fs]');
  if (!btn) return;
  const key = btn.getAttribute('data-fs');
  if (key === 'quit') {
    window.dispatchEvent(new CustomEvent('fs:quit'));
  } else if (SCREENS[key]) {
    openSub(key, btn);
  }
});

/* contact shortcuts while frozen */
document.addEventListener('click', (e) => {
  const el = e.target.closest('.fs-chipbtns a[href^="mailto"]');
  if (!el) return;
  e.preventDefault();
  navigator.clipboard && navigator.clipboard.writeText(EMAIL).then(() => {
    const note = document.createElement('p');
    note.className = 'fs-note';
    note.setAttribute('role', 'status');
    note.textContent = 'email copied to clipboard ✓';
    el.after(note);
    setTimeout(() => note.remove(), 2200);
  }).catch(() => { window.location.href = 'mailto:' + EMAIL; });
});