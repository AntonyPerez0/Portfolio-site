<!-- ────────────────────────────────────────────────────────────── -->
<!--                          A N T O N Y   P E R E Z                 -->
<!-- ────────────────────────────────────────────────────────────── -->

<div align="center">

<a href="https://antonyperez.com">
  <img src="https://readme-typing-svg.demolab.com?font=JetBrains+Mono&weight=700&size=30&duration=2600&pause=900&color=5B8CFF&center=true&vCenter=true&width=620&height=70&lines=Documented.+Tested.+Deployed.;antonyperez.com;Software+Engineer+%C2%B7+SF+Bay+Area" alt="Documented. Tested. Deployed." />
</a>

<p>
  <em>The personal portfolio of Antony Perez — a single-page site with an interactive,<br/>physics-simulated 3D conference badge you can grab, swing, and throw.</em>
</p>

<p>
  <a href="https://antonyperez.com"><img src="https://img.shields.io/badge/live_site-antonyperez.com-5B8CFF?style=for-the-badge&labelColor=0B1120" alt="Live site" /></a>
  <a href="#-deploy"><img src="https://img.shields.io/badge/deploy-GitHub_Pages-3DDC97?style=for-the-badge&labelColor=0B1120&logo=githubpages&logoColor=white" alt="GitHub Pages" /></a>
  <a href="#-license"><img src="https://img.shields.io/badge/license-MIT-9D7CFF?style=for-the-badge&labelColor=0B1120" alt="MIT License" /></a>
</p>

<p>
  <img src="https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=black&labelColor=0B1120" alt="React 18" />
  <img src="https://img.shields.io/badge/Vite-5-646CFF?style=flat-square&logo=vite&logoColor=white&labelColor=0B1120" alt="Vite 5" />
  <img src="https://img.shields.io/badge/Three.js-r161-000000?style=flat-square&logo=threedotjs&logoColor=white&labelColor=0B1120" alt="Three.js" />
  <img src="https://img.shields.io/badge/React_Three_Fiber-8-FF69B4?style=flat-square&labelColor=0B1120" alt="React Three Fiber" />
  <img src="https://img.shields.io/badge/Rapier-physics-orange?style=flat-square&labelColor=0B1120" alt="Rapier" />
  <img src="https://img.shields.io/badge/GitHub_Actions-CI%2FCD-2088FF?style=flat-square&logo=githubactions&logoColor=white&labelColor=0B1120" alt="GitHub Actions" />
</p>

</div>

<br/>

> **Documented. Tested. Deployed.** — this site is itself a project. It's built like
> production software: a real component architecture, a CI/CD pipeline, progressive
> enhancement, and a hidden 2006 easter egg for anyone curious enough to scroll to the bottom.

<br/>

## ✦ Highlights

| | Feature |
|:--:|:--|
| 🪪 | **Interactive 3D badge** on a physics-simulated lanyard — grab it, swing it, throw it. Built with React Three Fiber + Rapier rope joints and a flat woven `meshline` strap. |
| 🛡️ | **Progressive enhancement** — a pure-CSS badge renders instantly, then upgrades to the WebGL physics version when the device supports it. No WebGL? The static badge stays. |
| ⌘ | **Command palette** (`⌘K` / `Ctrl-K`) — vanilla-JS, fuzzy-filtered, fully keyboard-navigable: jump to sections, copy email, grab the résumé. |
| 🎨 | **Hand-rolled design system** — bespoke dark theme, gradient accents, scroll-reveal, active-section nav, and a scroll-progress bar. No UI kit. |
| 💿 | **2006 time machine** — one button transforms the whole page into a period-accurate MySpace profile, Top 8 and all. |
| 🚀 | **CI/CD to GitHub Pages** — every push to `main` builds with Vite and deploys automatically via GitHub Actions. |

<br/>

## ✦ Tech Stack

**Core** &nbsp;·&nbsp; React 18 · Vite 5 · vanilla JS · hand-written CSS
**3D / physics** &nbsp;·&nbsp; Three.js · React Three Fiber · @react-three/rapier · meshline
**Tooling & deploy** &nbsp;·&nbsp; GitHub Actions · GitHub Pages

<br/>

## ✦ The Lanyard — how it works

The hero badge is the centerpiece. The strap is **not** a tube — it's a flat,
camera-facing **`meshline` ribbon** with a procedurally generated woven-fabric
texture (nylon base, sewn binding edges, printed wordmark), plus real metal
hardware: a fold-over **crimp barrel** and a **split ring** threaded through the
card's slot.

```text
fixed ──rope── j1 ──rope── j2 ──rope── j3 ──spherical── card
  │            │           │           │                 │
  └────────── Catmull-Rom curve ───────┴── fed into the meshline ribbon every frame
```

A 3-link **Rapier** rope hangs from a fixed point; a spherical joint pins the
badge to the end. Each frame the joint positions feed a Catmull-Rom curve, which
is pushed into the ribbon geometry via `setPoints`. Dragging switches the card to
a kinematic body and uses camera **unprojection** to follow the pointer.

**Tweakables** in [`src/main.jsx`](src/main.jsx):

| Knob | Does |
|:--|:--|
| `lineWidth` on `<meshLineMaterial>` | strap width |
| `repeat={[-3, 1]}` | wordmark repeats down the strap (flip the sign if mirrored) |
| `CLIP_Y` + hardware `position`s | where the strap meets the badge & the metal clip sits |
| `makeStrapTexture()` | the printed text and fabric colors |

<br/>

## ✦ Featured Projects on the Site

| Project | Stack |
|:--|:--|
| **DefectPredict** — AI test-case prioritization (CS capstone) | Python · scikit-learn · FastAPI · Jenkins · Docker · PostgreSQL |
| **GitOps Cloud Infrastructure Home Lab** | Kubernetes · Talos Linux · FluxCD · Kustomize · Tailscale |
| **WGUPS Package Routing** — Data Structures & Algorithms II | Python · custom hash table · greedy search |
| **Full-Stack Inventory App** (team) | Node · Express · Sequelize · Tailwind · Jest |
| **Movie Theater REST API** | Node · Express · Sequelize · SQLite · express-validator |
| **SonarCloud Quality Gate in CI** | GitHub Actions · SonarCloud · Jest · Docker |

<br/>

## ✦ Getting Started

```bash
# clone
git clone https://github.com/AntonyPerez0/<repo>.git
cd <repo>

# install
npm install

# develop  →  http://localhost:5173
npm start

# production build  →  dist/
npm run build
```

> [!TIP]
> Append `?debug` to the URL to render the Rapier physics colliders — handy for
> seeing the joints and rope that drive the badge.

<br/>

## ✦ Project Structure

```text
.
├── index.html              # the whole site (modern view + MySpace mode)
├── src/
│   └── main.jsx            # 3D badge: physics lanyard, mounts into #badge3d
├── public/
│   ├── resume.pdf          # served at /resume.pdf
│   └── favicon.svg
├── .github/workflows/
│   └── deploy.yml          # Vite build → GitHub Pages
└── vite.config.js
```

<br/>

## ✦ Deploy

This repo ships a GitHub Actions workflow that builds and publishes on every push:

1. Push to the **`main`** branch.
2. In the repo: **Settings → Pages → Source → GitHub Actions**.
3. Done — the workflow builds with Vite and deploys `dist/` automatically.

<br/>

## ✦ License

Released under the **MIT License** — use the structure freely. The résumé content,
copy, and personal branding are © Antony Perez.

<br/>

<div align="center">

**Built by hand. Deployed by pipeline.**

<a href="https://antonyperez.com">antonyperez.com</a> &nbsp;·&nbsp;
<a href="https://github.com/AntonyPerez0">GitHub</a> &nbsp;·&nbsp;
<a href="https://linkedin.com/in/antonyperez-swe">LinkedIn</a>

<sub>★ if this gave you an idea for your own portfolio, consider starring the repo.</sub>

</div>