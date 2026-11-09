# Engineer portfolio design: what the admired sites look like (November 2026)

Research for the antonyperez.com redesign. All sites were fetched and measured on 8 November 2026.

**Method.** Each site was loaded in headless Chromium 154 at 1440×900, light color scheme. From the live page I read computed styles (`getComputedStyle`), `document.fonts`, the `@font-face` rules and the CSS custom properties, and counted which text styles cover the most characters. To name a font that hides behind a hashed or aliased file, I downloaded the file and read its `name` table with fontTools. Star and fork counts come from the GitHub REST API, and Hacker News points from the HN Algolia API, both pulled on 2026-11-08. Award dates and scores come from the award pages themselves. The raw per-site measurements are in `/tmp/opencode/portfolio-refs/data/*.json`.

**Caveats.** Screenshots come from Linux, so local-only fonts render as fallbacks. Iowan Old Style on leerob.com and the system UI fonts on jhey.dev and chronark.com look different on a Mac. Emoji show as boxes. WebGL ran on the CPU (SwiftShader), so 3D sites were slow to render. Anything marked *opinion* is mine, or the named author's, and not a measured fact.

---

## TL;DR

- **The top tier is quiet.** Most of the admired engineer sites open with text: a name, a role, two or three sentences, and links. Nine of the 20 shortlisted sites set their main text in a narrow 600–680 px column. Five of them set the name at body size: 14–17 px on paco.me, jakub.kr, shud.in, samuelkraft.com and emilkowal.ski.
- **Inter is the default typeface, so the difference comes from a second voice.** That voice is either a serif italic (Newsreader, Lora, Libre Baskerville, Tiempos, Iowan, Fraunces) or small uppercase monospace labels (JetBrains Mono, Berkeley Mono, iA Writer, `ui-monospace`).
- **Palettes are warm neutrals with at most one accent.** Emil Kowalski uses Radix Colors "Sand" exactly (`#FDFDFC` / `#21201C` / `#63635E`). Delba and Manu Arora use Tailwind "stone", and Tania Rascia uses cream. 15 of the 20 open in light mode.
- **Proof beats decoration.** The sites carry real numbers inline (★ 8,292, "100k+ installs", "2,760 subscribers", "29k-star create-t3-app"), plus named employers and links to shipped work.
- **What's fading.** No shortlisted homepage uses a bento grid of profile tiles, glass cards, gradient blobs, a fake terminal, a typewriter hero or a preloader, except the 3D pieces where 3D *is* the craft. Even the authors of the most-forked templates have moved to calm text-first sites: chronark.com was rewritten in July 2026, and Manu Arora (Aceternity UI) now runs a metric-led single column.
- **What's rising.** Mono micro-labels with tabular dates, serif accents, OKLCH colors, `light-dark()`, "Now" lines, colophons, case-study writing, and markdown or `llms.txt` copies of the site for AI agents (jakub.kr, brianlovin.com, overreacted.io, chronark.com).
- **What reviewers need.** Recruiters skim. Ladders measured 7.4 s on a résumé's first screen in 2018; interviewing.io found about 30 s per résumé in 2024, mostly spent looking for recognizable names. Hiring engineers want 2–5 deep, shipped projects and a guided tour of the hard parts (Josh Comeau). The first screen has to say who you are, what you do, give one piece of proof and offer a next step.

---

## 1. Summary table (20 shortlisted sites)

⚡ = "wow" outlier, included for contrast. "Fonts" are the families actually loaded and rendered. Palette = background / ink / accent.

| # | Site | Layout | Fonts (measured) | Palette (bg / ink / accent) | Signature detail | Evidence of acclaim |
|---|---|---|---|---|---|---|
| 1 | [Brittany Chiang](https://brittanychiang.com/) | Two columns: sticky left (48%) with nav, scrolling right | Inter | `#0F172A` / `#E2E8F0`, body `#94A3B8` / teal `#5EEAD4` | 600 px cursor spotlight; hovering one row dims the others | Old v4 repo has [8,292★, 4,193 forks](https://github.com/bchiang7/v4) |
| 2 | [Lee Robinson](https://leerob.com/) | Text column plus a tall illustration | Iowan Old Style (local system font) | `#FFFFFF` / `#282828` / none | Serif only; bio has a "Default / Long" toggle | Former site repo [7,581★](https://github.com/leerob/next-mdx-blog); [HN 132 pts](https://news.ycombinator.com/item?id=44531635) |
| 3 | [Rauno Freiberg](https://rauno.me/) | Horizontally scrolling deck of cards with a minimap | PP Neue Montreal; JetBrains Mono | `#EDEDED` / `#171717` / yellow `#FFFF02` | Horizontal scroll, minimap, manifesto | [Awwwards Honorable Mention, 1 Sep 2025](https://www.awwwards.com/sites/portfolio-2025) |
| 4 | [Paco Coursey](https://paco.me/) | 640 px text in a 1072 px page; three-column index | Söhne, Newsreader Italic, Inter | `#FFFFFF` / `#3A3A3A` / none | Italic serif phrases inside sans paragraphs | [cmdk 13,089★](https://github.com/dip/cmdk), [next-themes 6,351★](https://github.com/pacocoursey/next-themes) |
| 5 | [Emil Kowalski](https://emilkowal.ski/) | 644 px single column | Inter Variable; Tiempos, Heldane; Berkeley Mono | `#FDFDFC` / `#21201C` / none (Radix Sand) | Extreme restraint | [Sonner 13,168★](https://github.com/emilkowalski/sonner); [HN 546 pts](https://news.ycombinator.com/item?id=45139088) |
| 6 | [Josh W. Comeau](https://www.joshwcomeau.com/) | Content site, two-column body | Wotfard; Cartograph CF | sky `#A0D4EE` / `#0A0C10` / `#4242FA`, `#E60067` | Generative-art hero, sound toggle | 279 HN stories, [top 1,075 pts](https://news.ycombinator.com/item?id=29894608) |
| 7 | [Delba de Oliveira](https://delba.dev/) | Two columns: work list and about | Fraunces; Geist Mono | `#FAFAF9` / `#1C1917` / black button | "If you're hiring: Let's talk" in the first lines | Listed in [developer-portfolios](https://github.com/emmabostian/developer-portfolios) |
| 8 | [Anthony Fu](https://antfu.me/) | ~65ch single column | Inter; DM Mono | `#FFFFFF` / `#000`, `#555` / none | Generative branch drawing; inline project chips | [antfu.me repo 1,093★](https://github.com/antfu/antfu.me) |
| 9 | [Jhey Tompkins](https://www.jhey.dev/) | 600 px, everything on one screen | System sans and `ui-monospace` only | `#FFFFFF` / ≈`#474747` / red `#FB2C36` | Live status line, commit hash, viewport readout | Secondary roundups only ([Hostinger](https://www.hostinger.com/tutorials/web-developer-portfolio)) |
| 10 | ⚡ [Bruno Simon](https://bruno-simon.com/) | Full-screen WebGL game | Nunito (UI only) | 3D world | Drive a jeep through the portfolio (three.js r187, WebGPU) | [Awwwards SOTD, 21 Jan 2026 (8.11)](https://www.awwwards.com/sites/brunos-portfolio); [HN 777 pts](https://news.ycombinator.com/item?id=46206531) |
| 11 | [Jakub Krehel](https://jakub.kr/) | 644 px single column | Inter Variable (w450); Libre Baskerville, Heldane; Berkeley Mono | `#FCFCFC` / `#202020` / none | Icon tiles; `llms.txt` and markdown copy | [HN 859 pts](https://news.ycombinator.com/item?id=45010876); [skills 11,785★](https://github.com/jakubkrehel/skills) |
| 12 | [Shu Ding](https://shud.in/) | Italic nav on the left, 672 px text | Inter; Lora Italic; Iosevka | `#FCFCFC` / `#4A515B` / none | Lowercase italic serif nav | [shud.in 217★](https://github.com/shuding/shud.in); [nextra 13,950★](https://github.com/shuding/nextra) |
| 13 | [Andreas Thomas (chronark)](https://chronark.com/) | 620 px single column | System sans; `ui-monospace` | `#FAFAFA` / `#1B1B1F` / none | Dotted leaders running to mono dates | [815★ / 444 forks](https://github.com/chronark/chronark.com) |
| 14 | [Tania Rascia](https://www.taniarascia.com/) | Docs-style sidebar plus main column | Outfit; Google Sans Flex; Google Sans Code | cream `#F8F4E6` / `#1D1D22` / magenta `#B12D6C` | Career-change timeline | [2,137★ / 533 forks](https://github.com/taniarascia/taniarascia.com) |
| 15 | [Shoubhit Dash (nexxel)](https://www.nexxel.dev/) | ~864 px all-mono column | JetBrains Mono (renamed "Nexxel Mono") | `#111111` / `#D1D5DB` / orange `#FF6B35` | Keyboard nav: `[h] [b] [w] [p]` | Created [create-t3-app 29,220★](https://github.com/t3-oss/create-t3-app); [site 280★](https://github.com/nexxeln/nexxel.dev) |
| 16 | [Manu Arora](https://www.manuarora.in/) | 65ch single column | Schibsted Grotesk; `ui-monospace` | `#FAFAF9` / `#57534D` / none | "Reach" metric cards with an "updated" date | Portfolio templates [443★](https://github.com/manuarora700/simple-developer-portfolio-website) and [185★](https://github.com/manuarora700/sidefolio) |
| 17 | [Samuel Kraft](https://samuelkraft.com/) | 640 px column with large media cards | Inter, 14 px throughout | `#FDFDFC` / `#1B1B18` / none (Radix Sand) | Small type, big product shots | [484★](https://github.com/samuelkraft/samuelkraft-next) |
| 18 | ⚡ [Maxime Heckel](https://maximeheckel.com/) | WebGL hero, then work grouped in chapters | Inter Variable; iA Writer Quattro V | `#0046B0` / `#E0EBFD` / none | Blueprint 3D hero with coordinate readouts | [HN 537 pts](https://news.ycombinator.com/item?id=48107997); [blog 747★](https://github.com/MaximeHeckel/blog.maximeheckel.com) |
| 19 | ⚡ [Henry Heffernan](https://henryheffernan.com/) | 3D desk; the CRT holds a working retro OS | (canvas) | Light gray studio | BIOS screen with "START", then a 3D CRT | [2,580★](https://github.com/henryjeff/portfolio-website); [Show HN](https://news.ycombinator.com/item?id=31313187) |
| 20 | [Dillion Verma](https://dillion.io/) | 624 px column with a floating dock | Inter | `#FFFFFF` / `#0A0A0A` / none | macOS-style dock; video project cards | Template [1,533★ / 441 forks](https://github.com/magicuidesign/portfolio) |

---

## 2. Per-site notes

All layout, type and color values below were measured on the live pages; see the URL in each heading and `data/<name>.json`. Screenshots are in `/tmp/opencode/portfolio-refs/`.

### 1. Brittany Chiang · https://brittanychiang.com/ · `brittanychiang.png`, `brittanychiang-full.png`

- **Layout.** A 1280 px container (`max-w-screen-xl`). The left column takes 48% and stays pinned (`lg:sticky lg:top-0 lg:max-h-screen`). It holds the name, role, a one-line pitch, the section nav and the social icons. The right column (607 px measured) scrolls through About, Experience, Projects, Writing and a colophon.
- **First screen.** "Brittany Chiang / Frontend Engineer / I build accessible, pixel-perfect experiences for the web." The right side opens with three bio paragraphs that name her employer (Klaviyo) and a product (Composer).
- **Type.** Inter 3.019 only, read from the font file. The name is 48/48 px, weight 700, tracking −1.2 px; the role is 20 px/500; 67% of the text is 14–16 px; dates are 12 px/600, uppercase, +0.3 px tracking.
- **Color.** Tailwind slate and teal: background `#0F172A`, body `#94A3B8`, headings `#E2E8F0`, tag pills teal `#5EEAD4` on `rgba(45,212,191,.10)`. Dark only (`theme-color #0f172a`).
- **Projects.** Each row has a 16:9 thumbnail (2 of 8 grid columns, 2 px border at 10% white), a title with ↗, two or three lines of description, a metric (★ 719, "100k+ Installs", ★ 8,292) and tech pills. The section ends with "View Full Project Archive →". The ★ 8,292 matches the GitHub API count on 2026-11-08.
- **Experience.** A date column ("2024 — PRESENT") beside "Role · Company ↗", a description, sub-links and pills. The section ends with "View Full Résumé ↗", which opens `/resume.pdf`.
- **Signature.** The cursor spotlight, `radial-gradient(600px circle at x y, rgba(29,78,216,.15), transparent 80%)`. Hovering one row fades the others to 50% (`lg:group-hover/list:opacity-50`). The hovered card gets a `slate-800/50` fill and a 1 px inset highlight, and the nav indicator line grows from 32 to 64 px. A colophon reads "Loosely designed in Figma… All text is set in the Inter typeface." A TARDIS easter egg sits in a corner, and `motion-reduce:transition-none` is set everywhere.
- **Why it reads as expensive.** One typeface, one accent, a strict grid, real numbers, and everything one click from the first screen. The hover states clarify rather than decorate.
- **Acclaim.** The old v4 site is the most-cloned developer portfolio in this sample: [8,292★ / 4,193 forks](https://github.com/bchiang7/v4). Its README has a "Forking this repo (please read!)" section that says "It's always disheartening whenever I find that someone has copied my site". [One Page Love](https://onepagelove.com/brittany-chiang) featured it on 11 Sep 2019. That design used navy `#0a192f`, mint `#64ffda`, Calibre and SF Mono ([variables.js](https://github.com/bchiang7/v4/blob/main/src/styles/variables.js)). The site is also listed in [emmabostian/developer-portfolios](https://github.com/emmabostian/developer-portfolios) (27,610★).

### 2. Lee Robinson · https://leerob.com/ · `leerob.png`

- **Layout.** A text column of about 600 px on the left and a tall rounded illustration card (San Francisco and Iowa skylines) on the right. The column holds "@leerob", a Bio block with a "Default / Long" toggle, a two-column Notes list, and Blogs as rows with a month and year.
- **First screen.** "I'm an engineer and writer. I work on ML at SpaceX (formerly at Cursor)… Previously, I worked at Vercel on Next.js. I've been coding for 15 years and teaching for the second half."
- **Type.** Iowan Old Style through `local()` with fallbacks to Palatino and Georgia, so nothing is downloaded. Body is 17/27.2 px (87% of characters), h1 42.4 px/600, h2 23.2 px/600; small UI text is `ui-sans-serif` 14 px. Caveat is loaded for a handwritten accent. (On Linux the serif renders as a fallback.)
- **Color.** `#FFFFFF`, ink `#282828`, secondary `#676767`. `theme-color` is `#ffffff` in light and `#1b1a19` in dark.
- **Work and experience.** There's no project grid: the writing is the portfolio, and employers are named in the bio sentence.
- **Why it reads as expensive.** It reads like a well-set book page: a serif, generous leading and almost no interface.
- **Acclaim.** His original site repo, renamed to [leerob/next-mdx-blog](https://github.com/leerob/next-mdx-blog) and created 2018-12-16, has 7,581★ / 1,447 forks. HN gave ["Things I learned from 5 years at Vercel"](https://news.ycombinator.com/item?id=44531635) 132 points (2025-07-11). Listed in developer-portfolios.

### 3. Rauno Freiberg · https://rauno.me/ · `rauno.png`

- **Layout.** A horizontally scrolling deck of white cards on `#EDEDED`, with a minimap ruler at the top. The cards are the hero, Devouring Details, Craft, History of Software Design, Projects and Field Notes, followed by social links and a manifesto ("Make it fast. Make it beautiful. … Make it.").
- **First screen.** "Rauno Freiberg is an Estonian interaction designer working with Vercel and Devouring Details" set at 75–85 px in staggered, indented lines over a yellow circle, with a crosshair cursor.
- **Type.** The family is aliased as "X" and served from [`/dd.woff2`](https://rauno.me/dd.woff2); its name table reads PP Neue Montreal Medium (Pangram Pangram). JetBrains Mono is also declared. The spacing tokens step in 8 px: `--space-1 8px` through `--space-11 88px`.
- **Color.** Gray `#EDEDED`, card `#FFFFFF`, ink `#171717`, accent `#FFFF02`. Awwwards lists the palette as `#FFFFFF` and `#FFFF02`.
- **Signature.** Horizontal scroll with the minimap, a hero reveal, and email copy that answers "Copied".
- **Why it reads as expensive.** One bold typographic idea, executed exactly, with a single accent. This is the art-directed end of the clean register, not a résumé template.
- **Acclaim.** [Awwwards Honorable Mention, "Portfolio 2025"](https://www.awwwards.com/sites/portfolio-2025) (1 Sep 2025), whose featured elements are Hero Reveal, Horizontal Scroll and Minimap. [HN 160 pts](https://news.ycombinator.com/item?id=36669249) for "Invisible Details of Interaction Design" (2023). [raunofreiberg/interfaces](https://github.com/raunofreiberg/interfaces) has 1,958★.

### 4. Paco Coursey · https://paco.me/ · `paco.png`

- **Layout.** The page is 1072 px wide with a 640 px content width (`--page-width`, `--content-width`). It holds the name, two sentences, a three-column index (Building / Projects / Writing), a "Now" section and a Connect line.
- **First screen.** "Paco Coursey. *Crafting interfaces*. Building polished software and web experiences… Webmaster at Linear. In the past I've developed the Vercel design system, website, and dashboard."
- **Type.** Söhne (Klim, commercial), read from [its file](https://paco.me/fonts/sohne-subset-0.woff2), sets 80% of the text at 16/28. Newsreader Italic (Google Fonts) is used only for emphasized phrases, and Inter Variable for the name (16 px/500).
- **Color.** White, ink `#3A3A3A`, and Radix gray in display-p3 (`--gray-1: color(display-p3 .988 .988 .988)`). `theme-color` is `#fff` in light and `#1c1c1c` in dark, following the system setting.
- **Work and experience.** Project names (⌘K, Writer, Next Themes) each get a one-line description and a ↗; experience is one sentence.
- **Why it reads as expensive.** The typography does all the work, and leaving out decoration reads as confidence.
- **Acclaim.** His projects: [dip/cmdk 13,089★](https://github.com/dip/cmdk) and [next-themes 6,351★](https://github.com/pacocoursey/next-themes). The archived previous site has [316★](https://github.com/pacocoursey/paco).

### 5. Emil Kowalski · https://emilkowal.ski/ · `emilkowalski.png`

- **Layout.** A single 644 px column: Today → Projects → Writing → More.
- **First screen.** "Emil Kowalski / Design Engineer", then "Today: Currently taking a break from work. In the past, I've worked at Linear and Vercel…", then four projects (aiforui.dev, Sonner, animations.dev, Vaul) with a line each.
- **Type.** Inter Variable 4.001 with the optical-size axis (14–32), 16/24 px; read from [the file](https://emilkowal.ski/_next/static/media/0336a89fb4e7fc1d-s.p.woff2). Tiempos Text italic and Heldane Text (both Klim) supply serif, and Berkeley Mono supplies code.
- **Color.** Exactly [Radix Colors Sand](https://unpkg.com/@radix-ui/colors@3.0.0/sand.css): background `#FDFDFC` (sand-1), text `#21201C` (sand-12), secondary `#63635E` (sand-11). The dark scale runs `#111110` → `#EEEEEC`, and borders are drawn with box-shadow tokens (`0 0 0 1px hsla(0,0%,100%,.08)` in dark).
- **Work and experience.** Four projects and seven posts, each with a one-line description; experience is a single sentence.
- **Why it reads as expensive.** Warm neutrals, even vertical rhythm, and nothing that doesn't earn its place.
- **Acclaim.** [Sonner 13,168★](https://github.com/emilkowalski/sonner), [Vaul 8,695★](https://github.com/emilkowalski/vaul), [skills 54,977★](https://github.com/emilkowalski/skills); ["Purposeful animations" got 546 HN points](https://news.ycombinator.com/item?id=45139088) (2025-09-05).

### 6. Josh W. Comeau · https://www.joshwcomeau.com/ · `joshwcomeau.png`

- **Layout.** A content site: a header (Categories, Courses, Goodies, About, plus search, sound, theme and RSS), an illustrated hero, then a two-column body with articles on the left and categories and popular content on the right.
- **First screen.** A sky-blue cloudscape, a rainbow arc of generative art ("Edit the generative art") and a 3D avatar, above the "ARTICLES AND TUTORIALS" list.
- **Type.** Wotfard (atipo, commercial) at 16/24 for body, Cartograph CF (Connary Fagen, commercial) for code, and Sriracha as an accent. Identified from [this file](https://www.joshwcomeau.com/fonts/wotfard/wotfard-regular-webfont.woff2).
- **Color.** Sky `#A0D4EE` and `#B1DFF6`, ink `#0A0C10`, blue `#4242FA`, and magenta `#E60067` for section labels (16 px/500, uppercase, 2 px tracking). Light and dark are switched through `data-color-mode`.
- **Signature.** A sound-effects toggle and the editable generative hero. Animation uses a "springy" `linear()` easing over 833 ms, and the CSS has 6 view-transition rules and **28 `prefers-reduced-motion` rules**, the most in the sample.
- **Why it reads as expensive.** Custom illustration, type and motion that all serve the teaching. This is a whimsical register earned by years of content, not a junior template.
- **Acclaim.** 279 HN stories link to the domain, the top one at [1,075 pts](https://news.ycombinator.com/item?id=29894608). ["The Future of CSS"](https://news.ycombinator.com/item?id=50175070) reached 636 pts (2026-10-21). He also wrote the hiring-focused e-book [*Building an Effective Dev Portfolio*](https://www.joshwcomeau.com/effective-portfolio/), covered in section 4.3.

### 7. Delba de Oliveira · https://delba.dev/ · `delba.png`, `delba-full.png`

- **Layout.** Two columns about 1024 px wide. The left has a "Portfolio" title, an availability line, a Work list and a Personal list; the right has "About me" with a photo and bio, then links.
- **First screen.** "I'm looking for my next role in **developer education** or **technical video production**. If you're hiring: [Let's talk]". It's the most explicit hire-me opening in the set.
- **Type.** Fraunces Variable (Google Fonts) for everything, 16/28 body; read from [the file](https://delba.dev/_next/static/media/03bda585a99c6450-s.p.ad37b9d9.woff2). Geist Mono is used for code.
- **Color.** Tailwind v4 stone: `#FAFAF9`, text `#44403B`, ink `#1C1917`, muted `#79716B`, and a black button.
- **Work.** A bulleted list with a bold product name and a verb: "Next.js Docs: Built, authored, and maintained."
- **Why it reads as expensive.** A warm serif on stone neutrals, with plain-language proof.
- **Acclaim.** Listed in [developer-portfolios](https://github.com/emmabostian/developer-portfolios); the Vercel work it describes is the proof.

### 8. Anthony Fu · https://antfu.me/ · `antfu.png`

- **Layout.** A single ~65ch column, icon nav at the top right (Blog, Projects, Talks, Sponsors, theme toggle) and a handwritten "af" mark at the top left.
- **First screen.** "Hey! I'm Anthony Fu, a fanatical open sourceror and design engineer." Below it are rows of logo chips: *Working at* Vercel / Nuxt; *Creator of* Vitest, Slidev, VueUse, UnoCSS…; *Core team of* Vue, Nuxt, Vite; *Maintaining* Shiki, Twoslash, ESLint Stylistic.
- **Type.** Inter 16/28 in `#555`, name 36 px/800, plus DM Mono, Roboto Condensed (nav) and Bad Script (signature).
- **Signature.** A generative plum-branch canvas drawn in light gray in the margins, and a dark-mode toggle built on view transitions (6 `view-transition` rules).
- **Why it reads as expensive.** The proof is woven into the bio as logos, so there's nothing to scan past.
- **Acclaim.** [antfu/antfu.me 1,093★ / 276 forks](https://github.com/antfu/antfu.me); [Furifont got 409 HN points](https://news.ycombinator.com/item?id=50100994) (2026-10-15).

### 9. Jhey Tompkins · https://www.jhey.dev/ · `jhey.png`

- **Layout.** A 600 px column that fits on one 900 px screen.
- **First screen.** "Jhey Tompkins" at 72 px, weight 300. Below it, mono labels read "DESIGNER · ENGINEER · TASTEMAKER / BRAND DESIGN STUDIO @ SHOPIFY". The bio links are underlined in red. A LATEST list shows five experiments. A live status area shows location, temperature and local time, "No recent game" and the current Spotify track. The footer reads "© 2026 JHEY · REV B3D54F5 · VIEWPORT 1440×900" with a sound toggle.
- **Type.** No webfonts: `ui-sans-serif` weight 300 at 16/24 for prose and `ui-monospace` 12 px/500 uppercase (+0.06em) for labels, which cover 43% of characters.
- **Color.** White, ink ≈ `lch(30%)` gray, links underlined in `#FB2C36` (Tailwind v4 red-500), and a faint grid on the right. `color-scheme: light dark`.
- **Why it reads as expensive.** Dense information styled like instrument labels, with no font weight to download.
- **Acclaim.** Weak in primary sources: no site repo and no HN posts for the domain. It appears in secondary roundups such as [Hostinger's web-developer portfolio list](https://www.hostinger.com/tutorials/web-developer-portfolio). He has worked at Google and Vercel and is now at Shopify, per the site.

### 10. ⚡ Bruno Simon · https://bruno-simon.com/ · `brunosimon.png`

- **Layout.** A full-screen WebGL world: a loader ring, then a drivable jeep. Projects and social links are objects you drive to. The canvas reports `data-engine="three.js r187 webgpu"`, and the UI font is Nunito.
- **Cost.** On this Raspberry Pi, with CPU WebGL, the scene needed more than 75 s before it accepted input. That isn't a benchmark, but it shows the weight.
- **Why it works.** The medium is the résumé. He teaches Three.js, so the site proves the exact skill he sells.
- **Acclaim.** The 2025 portfolio was an [Awwwards Site of the Day on 21 Jan 2026 (8.11/10)](https://www.awwwards.com/sites/brunos-portfolio) and got [777 HN points](https://news.ycombinator.com/item?id=46206531) (2025-12-09); [folio-2025 has 2,023★](https://github.com/brunosimon/folio-2025). The 2019 version was [Site of the Day on 11 Nov 2019 (8.04)](https://www.awwwards.com/sites/bruno-simon-portfolio) and [Site of the Month for November 2019](https://www.awwwards.com/bruno-simon-portfolio-wins-site-of-the-month-november.html), and [folio-2019 has 4,747★](https://github.com/brunosimon/folio-2019). developer-portfolios lists him as "Three.js Developer".

### 11. Jakub Krehel · https://jakub.kr/ · `jakub.png`, `jakub-full.png`

- **Layout.** A single 644 px column: intro → Projects (44 px icon tiles) → Writing (dated rows) → Notes → Interface Newsletter → footer with an `index.md` link and a signature.
- **First screen.** "Jakub Krehel / Founding Design Engineer at Interfere" on one line, then "I'm currently building the self-healing layer of the internet." The bio has inline icon links (@jakubkrehel, email, GitHub, *ask*, *search*).
- **Type.** Inter Variable at 17/27.6 px, with weight **450** for primary text and 400 for secondary. Libre Baskerville Italic, Heldane (Klim), Open Runde ([file](https://jakub.kr/_next/static/immutable/media/OpenRunde_Medium-s.2v8q9rkvkod7_.woff2)) and Berkeley Mono are also loaded.
- **Color.** Background `#FCFCFC`, ink `#202020`, secondary `#6F6F6F`, tertiary `#838383`, borders `#F6F6F6` and `#E8E8E8`. `theme-color` is `#fcfcfc` in light and `#101010` in dark.
- **Signature.** The newsletter shows its subscriber count ("Join 2,760 other subscribers"). The site is readable by agents: [`/llms.txt`](https://jakub.kr/llms.txt), [`/index.md`](https://jakub.kr/index.md), and a markdown reply to `Accept: text/markdown`.
- **Why it reads as expensive.** The micro-details from his own article: `text-wrap: balance`, tabular numbers, concentric radii, shadows instead of borders and 10% outlines on images ([source](https://jakub.kr/writing/details-that-make-interfaces-feel-better)).
- **Acclaim.** ["What are OKLCH colors?" got 859 HN points](https://news.ycombinator.com/item?id=45010876) (2025-08-25). His repos: [skills 11,785★](https://github.com/jakubkrehel/skills) and [make-interfaces-feel-better 3,958★](https://github.com/jakubkrehel/make-interfaces-feel-better).

### 12. Shu Ding · https://shud.in/ · `shuding.png`

- **Layout.** A left nav column in lowercase italic serif (about / thoughts / projects / guestbook), a hairline rule, then a 672 px text column.
- **First screen.** Three paragraphs: making things at Vercel; a CS degree from Fudan in 2017; Microsoft; then Vercel (ZEIT) from 2018 on Next.js, AI SDK, v0 and open source.
- **Type.** Inter, split into core and extended subsets, at 16/28 with +0.0085em tracking. Lora Italic for the nav, Iosevka for mono, and KaTeX fonts for math.
- **Color.** `#FCFCFC`, text `#4A515B`, nav ink `#1E2125`, muted `#8C95A1`.
- **Acclaim.** [shuding/shud.in 217★](https://github.com/shuding/shud.in); author of [nextra 13,950★](https://github.com/shuding/nextra) and [cobe 6,052★](https://github.com/shuding/cobe).

### 13. Andreas Thomas (chronark) · https://chronark.com/ · `chronark.png`

- **Layout.** A single 620 px column: one sentence ("I'm the CTO and co-founder of unkey.com…"), a WRITING list where dotted leaders run to the dates, footer links (github · x · rss) and a theme toggle.
- **Type.** System `ui-sans-serif` at 14/23.8 in `#55565C`, plus `ui-monospace` at 11–12 px for uppercase labels and dates (+0.08em).
- **Color.** `#FAFAFA`, ink `#1B1B1F`, muted `#8B8B90`. Dark mode is supported.
- **History.** The repo was [rewritten on 2026-07-16 in Astro](https://github.com/chronark/chronark.com/commits/main) and now serves [`/index.md`](https://chronark.com/index.md). Its 444 forks came from the earlier, animated Next.js version.
- **Acclaim.** [chronark/chronark.com 815★ / 444 forks](https://github.com/chronark/chronark.com). More than one fork for every two stars means it was heavily copied.

### 14. Tania Rascia · https://www.taniarascia.com/ · `taniarascia.png`

- **Layout.** A docs-style left sidebar (tania.dev, nav, social icons) and a main column: "Hey, I'm Tania!", **"A brief timeline"**, an illustration, Latest posts with tags, and Shelves.
- **First screen.** A timeline with mono date ranges: "1998–2006 Geocities kid…", "2007–2014 Professional chef…", "2014–2020 Career change: Unpaid intern by day, cook by night, then junior dev to senior engineer", "2021–now Principal software engineer… 177 posts, 40+ publications, 20,000+ stars on GitHub."
- **Type.** Outfit Variable for headings (48 px/700). Body is Google Sans Flex ([file](https://www.taniarascia.com/static/google-sans-flex-latin-slnt-normal-eb80db908bbd7bc81ef5dd4c2ac23b59.woff2)), but the stack lists `-apple-system` first, so Macs show SF. Google Sans Code is used for mono.
- **Color.** Cream `#F8F4E6`, ink `#1D1D22`, magenta `#B12D6C`. Version 7 is plain CSS in one `style.css`, using `color-scheme: light dark` and `light-dark()` ([her post](https://www.taniarascia.com/redesign-version-7/), Dec 2024, "inspired by Docusaurus").
- **Relevance.** The best model here for a non-traditional path.
- **Acclaim.** [2,137★ / 533 forks](https://github.com/taniarascia/taniarascia.com).

### 15. Shoubhit Dash (nexxel) · https://www.nexxel.dev/ · `nexxel.png`, `nexxel-full.png`

- **Layout.** A column about 864 px wide with keyboard-shortcut nav (`[h] home [b] blog [w] work [p] projects`). The sections are blog, work, projects and elsewhere, each with an "all ↗" link.
- **First screen.** "shoubhit dash" (48 px/600, −1.2 px), "software engineer · chennai, india", and a lowercase bio ("i'm a 21 y/o cs undergrad student…").
- **Type.** Everything is "Nexxel Mono", which is [JetBrains Mono 2.211 under another name](https://www.nexxel.dev/fonts/nexxel-mono-core-59d8520253f1.woff2) (OFL), at 16/24.
- **Color.** `#111111`, text `#D1D5DB`, muted `#6A7282` and `#4A5565`, orange `#FF6B35` for the asterisks and links.
- **Work and projects.** Work rows give company, role, dates and one line ("opencode — software engineer · feb 2026 – oct 2026 — worked on coding agents"). Project rows give name, role and a metric ("create-t3-app — creator and maintainer — 24k+ stars, 200+ contributors").
- **Acclaim.** He created [create-t3-app (29,220★ today)](https://github.com/t3-oss/create-t3-app); the site repo has [280★](https://github.com/nexxeln/nexxel.dev).

### 16. Manu Arora · https://www.manuarora.in/ · `manuarora.png`, `manuarora-full.png`

- **Layout.** A single 65ch column: intro; REACH (three metric cards, "Updated Oct 21, 2026"); THINGS I DO (accordions with app-icon tiles); COMPANIES I'VE WORKED WITH (logo grid); WORK WITH ME (calls to action); WRITING; footer.
- **First screen.** "I make videos on YouTube about design engineering… Need a website built? My studio Aceternity does that." Then three metric cards: 33.5K subscribers, 44K followers, and 3M page views a month on Aceternity UI.
- **Type.** Schibsted Grotesk Variable (Google Fonts) at 16/24, with uppercase `ui-monospace` labels at 40% opacity.
- **Color.** Stone: `#FAFAF9`, text `#57534D`, ink `#292524`, with dotted dividers.
- **Signature.** The footer credits his influence ("heavily inspired by Akash Bhadange") and links to the code and a video explaining the build.
- **Insight.** The author of a flashy animated component library chose a calm, metric-led page for himself.
- **Acclaim.** Author of Aceternity UI; his portfolio templates are [simple-developer-portfolio-website (443★ / 184 forks)](https://github.com/manuarora700/simple-developer-portfolio-website) and [sidefolio (185★ / 76 forks)](https://github.com/manuarora700/sidefolio).

### 17. Samuel Kraft · https://samuelkraft.com/ · `samuelkraft.png`, `samuelkraft-full.png`

- **Layout.** A single 640 px column: avatar, name, bio paragraphs and links. Projects are **large media cards**, roughly 16:9 with rounded corners, showing dark product shots and video, each with a title and one line. Posts follow as a list with dates on the right.
- **First screen.** "Design Engineer at Raycast currently working on desktop app builder Glaze. I've worked in design and engineering for 13 years…"
- **Type.** Inter at 14/21, weight 500, for everything: 78% in secondary `#706F6C` and 22% in ink `#1B1B18`.
- **Color.** Radix Sand v0 (`#FDFDFC` / `#1B1B18` / `#706F6C`), with media cards on `#101010`.
- **Relevance.** The best model in the set for visual projects, such as a game or a cockpit trainer.
- **Acclaim.** [samuelkraft-next 484★](https://github.com/samuelkraft/samuelkraft-next); [notion-blog-nextjs 1,020★](https://github.com/samuelkraft/notion-blog-nextjs).

### 18. ⚡ Maxime Heckel · https://maximeheckel.com/ · `maximeheckel.png`

- **Layout.** A full-viewport WebGL hero, then an about section, then a long works index (15,920 px) arranged in themed chapters. Each chapter has a heading and a paragraph followed by two-up media cards captioned with mono dates such as "10.2022". A floating pill nav (Index, About, Work, Contact) blurs what's behind it.
- **First screen.** A blueprint-blue (`#0046B0`) scene: a glass "M" logo on a grid with coordinate and commit-hash readouts, and the caption "THE ONLINE HOME OF MAXIME'S CREATIONS".
- **Type.** Inter Variable (weights 500–560, −0.25 px) plus [iA Writer Quattro V](https://maximeheckel.com/_next/static/immutable/media/iAWriterQuattroV-s.p.1afplhipkjlo0.ttf) for small data labels.
- **Color.** `#0046B0`, text `#E0EBFD`, muted `#ABB5C7`; the site then shifts to near-black.
- **Why it works.** 3D shaders and WebGPU are his specialty, so the hero is itself a work sample. The "View" and "Read study" links lead to case studies.
- **Acclaim.** ["Rendering the Sky, Sunsets, and Planets" got 537 HN points](https://news.ycombinator.com/item?id=48107997) (2026-05-12); [blog repo 747★](https://github.com/MaximeHeckel/blog.maximeheckel.com).

### 19. ⚡ Henry Heffernan · https://henryheffernan.com/ · `henryheffernan.png`

- **First screen.** A BIOS-style box ("Henry Heffernan Portfolio Showcase 2022 — Click start to begin"). After START, a 3D desk with a CRT loads; clicking enters a working retro operating system built as a [separate inner site](https://github.com/henryjeff/portfolio-inner-site).
- **Caveat.** It's gated behind START, so it can't be skimmed, and the title still says 2022.
- **Acclaim.** [henryjeff/portfolio-website 2,580★ / 363 forks](https://github.com/henryjeff/portfolio-website); [Show HN, 29 pts](https://news.ycombinator.com/item?id=31313187) (2022). He later co-wrote Vercel's ["Design Engineering at Vercel"](https://vercel.com/blog/design-engineering-at-vercel) (29 Mar 2024).

### 20. Dillion Verma · https://dillion.io/ · `dillion.png`

- **Layout.** A 624 px column with sections `#hero`, `#about`, `#photos`, `#work`, `#education`, `#projects` (video cards) and `#contact`. A floating dock at the bottom holds icons and the theme toggle.
- **First screen.** "hi, i'm dillion 👋", "Software Engineer turned Entrepreneur…", an avatar, an About paragraph and a photo masonry.
- **Type and color.** Inter; body 14 px in `#737373`, ink `#0A0A0A`, borders `#E5E5E5`.
- **Work.** Experience rows with logo, company, dates and role; Education; Projects with autoplaying video, tags and links.
- **Why it matters.** It's the source of the widely cloned "shadcn + Magic UI" portfolio. Reviewers recognize the dock and the blur-fade as a template.
- **Acclaim.** [magicuidesign/portfolio, formerly dillionverma/portfolio: 1,533★ / 441 forks](https://github.com/magicuidesign/portfolio); [Magic UI 23,153★](https://github.com/magicuidesign/magicui).

### Considered and dropped

- **cassie.codes.** **No longer a portfolio.** The page now says "Thanks for reading. It was a joy to maintain a personal site… it no longer nourishes me" (`extra/cassie.png`).
- **rauchg.com.** A blog index with view counts, not a portfolio ([1,427★](https://github.com/rauchg/blog)).
- **overreacted.io.** A blog ([7,273★](https://github.com/gaearon/overreacted.io)). Its ["Hire Me in Japan"](https://overreacted.io/hire-me-in-japan/) post is still used in section 4.3 as a model hire-me page.
- **kentcdodds.com.** A courses and business site with a 3D-rendered koala hero ([2,502★](https://github.com/kentcdodds/kentcdodds.com)).
- **mxstbr.com.** Now unstyled HTML lists in Times New Roman with default bullets. This "no design" choice only works with a résumé like his: OpenAI, Director of Engineering at Shopify, two acquisitions ([504★](https://github.com/mxstbr/mxstbr.com)).
- **brianlovin.com.** Good, but overlaps with jakub.kr and emilkowal.ski. It serves [`llms.txt`](https://brianlovin.com/llms.txt) and markdown on request ([briOS 2,274★](https://github.com/brianlovin/briOS)).
- **dennissnellenberg.com.** Agency-creative register: a giant marquee name and a photo. [Awwwards Site of the Day, 4 Apr 2022 (7.35)](https://www.awwwards.com/sites/dennis-snellenberg).
- **lynnandtonic.com.** An annually refreshed art piece, now "v.XIX". Its [2025 refresh case study](https://news.ycombinator.com/item?id=47264660) got 24 HN points.
- **jesse-zhou.com.** A 3D ramen shop gated behind START. [Awwwards Honorable Mention, 22 Mar 2022](https://www.awwwards.com/sites/jesses-ramen-portfolio).
- **adhamdannaway.com.** The classic 2010s "designer | <coder>" split-face hero with Facebook and Twitter icons. Kept only as a dated reference (`extra/adhamdannaway.png`).
- **steventey.com, cassidoo.co, nelsonlai.dev ([846★](https://github.com/nelsonlaidev/nelsonlai.dev)), paulstamatiou.com, joshuawootonn.com.** Checked; they follow the patterns already covered. Screenshots are in `extra/`.

---

## 3. What the top tier shares

Counts are over the 20 shortlisted sites. The type figures count only the 17 sites that aren't 3D.

1. **Text-first first screen.** 17 of 20 open with a name, a role and one to three sentences that name the current employer or project, with links. Only the 3D pieces don't.
2. **A narrow measure.** The main text column is 600–680 px on Emil (644), Jakub (644), Samuel (640), Paco (640), Dillion (624), Chronark (620), Jhey (600), Shu Ding (672) and Brittany (607). Body text is 16–17 px with a line-height of 1.5–1.75 on 10 sites: Lee 17/27.2, Jakub 17/27.6, Paco, Antfu, Shu and Delba 16/28, Emil, Josh, nexxel and Manu 16/24.
3. **A quiet scale.** The name is set at body size on Paco (16 px), Jakub (17), Shu (16), Samuel (14) and Emil (16). Hierarchy comes from weight and color, not size.
4. **Inter, plus one second voice.** Inter appears on Brittany, Emil, Jakub, Shu, Samuel, Dillion, Maxime, Antfu and Paco (for the name). The distinctive sites add either:
   - a serif italic: Newsreader (Paco), Lora (Shu), Libre Baskerville or Heldane (Jakub), Tiempos (Emil), Iowan (Lee), Fraunces (Delba); or
   - mono micro-labels: Jhey, Chronark, Manu, Maxime, nexxel, Tania.
5. **Warm neutrals and at most one accent.**
   - Neutrals: Radix Sand (Emil, Samuel), Tailwind stone (Delba, Manu), cream (Tania), `#FCFCFC` / `#202020` (Jakub).
   - Accents, one each where present: teal (Brittany), yellow (Rauno), orange (nexxel), magenta (Tania), red link underline (Jhey).
6. **Light first.** 15 of 20 open in light mode. Brittany and nexxel are dark only, Maxime is blueprint blue, and Bruno and Henry are 3D scenes.
7. **Projects as lists with outcomes, not card walls.**
   - One line per project: Emil, Jakub, Paco, Antfu, nexxel, Delba, Manu.
   - Media-forward lists: Samuel (large cards), Brittany (16:9 thumbnails), Dillion (video).
   - Only Maxime uses a grid, of work-sample videos grouped by theme.
8. **Proof by numbers and names.** ★ 8,292 and "100k+ installs" (Brittany); 2,760 subscribers (Jakub); 33.5K / 44K / 3M (Manu); "24k+ stars, 200+ contributors" (nexxel); "13 years" (Samuel); "15 years" (Lee); "177 posts, 40+ publications, 20,000+ stars" (Tania).
9. **Writing on the homepage.** 11 of 20 list their writing on the homepage, usually as dated rows: Brittany, Lee, Paco, Emil, Josh, Jakub, Chronark, Tania, nexxel, Manu, Samuel.
10. **Small, deliberate details.**
    - Links: ↗ on external links; dotted leaders to dates (Chronark); email copy that answers "Copied" (Rauno).
    - Footer: colophons (Brittany, Manu); signatures (Jakub, Maxime, Jhey).
    - Typography: tabular dates.
11. **Accessibility basics.** 10 of 20 ship `prefers-reduced-motion` rules: Josh 28, Jhey 8, Jakub 4, Brittany 3, Antfu 3, Lee 2, and one each on Paco, Emil, Shu and Maxime. Brittany also has a skip link.

### 3.1 Rising vs dated (late 2026)

| Trend | Verdict | Evidence |
|---|---|---|
| **Bento grid of profile tiles** (about, stack, map, socials) as the homepage | **Fading** for personal sites (*opinion*) | 0 of 20 shortlisted homepages use one; the only grid (Maxime's) shows work samples. [bento.me](https://bento.me/), the best-known bento link-in-bio builder, now redirects to linktr.ee (checked 2026-11-08); a third party dates the shutdown to [13 Feb 2026](https://own.page/blog/bento-alternatives). In Ladders' résumé eye-tracking, the worst layouts were "cluttered… multiple columns, and very little white space" ([Ladders, 2018](https://www.prnewswire.com/news-releases/ladders-updates-popular-recruiter-eye-tracking-study-with-new-key-insights-on-how-job-seekers-can-improve-their-resumes-300744217.html)). |
| **Glassmorphism** cards | **Dated** as a card style | 0 of 20. Blur survives only on one floating element: Maxime's pill nav and Dillion's dock. |
| **Gradient blobs and aurora backgrounds** | **Dated** | 0 of 20. The faint remnant is Brittany's 15%-opacity spotlight, now itself a clone tell. |
| **Fake terminal UI** (prompt, typed commands) | **Dated**; mono *texture* is **rising** | 0 of 20 simulate a shell. nexxel is all-mono with keyboard shortcuts, and Jhey, Chronark, Manu and Maxime use mono labels. One HN commenter's xterm portfolio got interviews but mixed results ([thread](https://news.ycombinator.com/item?id=41656015)). |
| **3D / WebGL hero** | **Acclaimed only when 3D is the job** | Bruno (Site of the Day Jan 2026, HN 777), Maxime (shader specialist) and Henry Heffernan (co-author of Vercel's 2024 design-engineering post) do 3D or interaction work for a living. For anyone else it adds load time and a START gate, and gives a skimming recruiter nothing to read (*opinion*). |
| **Typewriter or rotating-role heroes, skill bars, "Hi 👋 I'm…" plus dock and blur-fade** | **Template tells** (*opinion*) | None of the clean top tier uses them. The dock and blur-fade come from the Magic UI template (441 forks); the split-face hero from the 2010s. |
| **Navy + mint v4 look** (`#0a192f` / `#64ffda`, Calibre / SF Mono) | **Recognized as a clone** | 4,193 forks, and a README pleading for credit. Brittany herself moved to a slate and teal sticky two-column. |
| **Quiet single column, name at body size** | **Rising / dominant** | Emil, Jakub, Paco, Samuel, Shu, Chronark (rewritten 2026-07), Manu, Dillion. |
| **Serif italic accents** | **Rising** | Paco, Jakub, Emil, Shu, Lee, Delba. |
| **OKLCH / lab color, `light-dark()`** | **Rising** | Tailwind v4's lab and oklch output shows up on Lee, Delba, Jhey, Manu, Dillion and nexxel. Tania's v7 uses `light-dark()`. Jakub's OKLCH explainer got 859 HN points. |
| **Live or ambient data** (now playing, local time, commit hash, live star counts) | **Rising, used sparingly** | Jhey; Brittany's star count; Manu's "Updated Oct 21, 2026". |
| **Agent-readable copies** (`llms.txt`, `.md`, `Accept: text/markdown`) | **Emerging** | Found on jakub.kr, brianlovin.com, overreacted.io and chronark.com. The other 12 sites I probed had none. |
| **Purposeful, fast motion** | **Standard** | Emil: UI animations "should generally stay under `300ms`", and never animate keyboard-initiated actions ([post](https://emilkowal.ski/ui/you-dont-need-animations)). Jakub: interruptible transitions, staggered entrances, subtle exits ([post](https://jakub.kr/writing/details-that-make-interfaces-feel-better)). |

### 3.2 What a hiring manager or recruiter needs

**Measured facts.**

- **Ladders, 2018 eye-tracking study.** Recruiters spend about 7.4 s on the initial screen. The best résumés had "simple layouts with clearly marked section and title headers", F- and E-pattern layouts, bold job titles with bulleted accomplishments, and an overview at the top ([press release](https://www.prnewswire.com/news-releases/ladders-updates-popular-recruiter-eye-tracking-study-with-new-key-insights-on-how-job-seekers-can-improve-their-resumes-300744217.html)).
- **interviewing.io, 2024 study of 76 recruiters.** Recruiters "spend an average of 30 seconds", "mainly skimming for recognizable companies and schools". Niche skills such as ML engineering help "to some extent" ([Aline Lerner](https://interviewing.io/blog/why-resume-writing-is-snake-oil)).

**First-party opinions** (labeled as opinion).

- **Josh Comeau.** He was involved in hiring at Khan Academy, Unsplash and Breather, and reviewed more than 200 portfolios ([book page](https://www.joshwcomeau.com/effective-portfolio/), [sample chapter PDF](https://storage.googleapis.com/joshwcomeau/building-an-effective-dev-portfolio-first-chapter.pdf)). His advice:
  - "At least 2. No more than 5." projects. "It's better to have 1 large polished project than 5 small projects." "Most people will only look at 1 or 2." Put the rest behind "view archive".
  - The highest-impact projects solve a "specific niche problem you had", are "alive" with real users, or are open-source contributions.
  - "Guide the reader through… how you ran into technical challenges, and overcame them."
  - Don't include tutorial projects, or the portfolio site itself.
- **Hiring managers on HN.**
  - [2017 thread](https://news.ycombinator.com/item?id=14420802): "Anything that has shipped"; "fit & finish"; "documentation & tests over novelty"; blog posts explaining how the code works put a candidate at the top of the list.
  - [2019 thread](https://news.ycombinator.com/item?id=21191906): say "what YOU contributed"; screening happens in two passes, HR keywords first, then engineers.
  - [2024 thread](https://news.ycombinator.com/item?id=41656015) "Did your personal website help you get hired?" (134 pts): mostly anecdotes that *writing* led to interviews, plus one warning that a recruiting agency flagged sweary content as a risk.
- **Lee Robinson, "Product Engineers" (2023).** They "should have plenty of examples of their work". "Great Product Engineers don't stop at visually complete": what happens offline, on API errors, on touch devices, and what latency do you target ([post](https://leerob.com/product-engineers)).
- **Models of a hire-me page.**
  - Delba opens with role targets and a "Let's talk" button.
  - Dan Abramov's ["Hire Me in Japan"](https://overreacted.io/hire-me-in-japan/) (Nov 2025) states the ask, adds a "Skip to the end" link, then groups past work by period with links to specific merged PRs.
- **Emil Kowalski, "Developing Taste".** "Simply shipping a product that works is no longer enough, everyone can do that, especially now with AI… *Taste* is what matters" ([post](https://emilkowal.ski/ui/developing-taste)).

**Synthesis** (*opinion*). Make the first 900 px pass a 7–30 s skim:

- **who:** your name;
- **what:** your role plus one or two niche keywords, such as "WebAssembly compilers" or "Kubernetes";
- **proof:** a named shipped project with a number;
- **next step:** a résumé link and an email.

Then show 3–5 projects, each with an outcome line and a link to a case study written as a tour of the hard parts. Then an experience timeline that can be read in an F-pattern. Everything else goes on an archive page.

---

## 4. Recipes: three directions for a junior-to-mid engineer

All fonts below are free on [Google Fonts](https://fonts.google.com/) (each family checked through the `css2` API) and on Fontsource npm, e.g. [`@fontsource-variable/inter`](https://www.npmjs.com/package/@fontsource-variable/inter) and [`@fontsource-variable/geist`](https://www.npmjs.com/package/@fontsource-variable/geist). Both work in a plain Vite site with no framework.

### A. "Notebook": single column, light first, warm neutrals

*Built from: Emil Kowalski, Jakub Krehel, Paco Coursey, Samuel Kraft, Shu Ding, Chronark.*

- **Layout.**
  - `max-width: 40rem` (640 px), centered, with 96–128 px of top padding. Optionally pin a left rail of italic serif links, Shu Ding style, at ≥1100 px.
  - Section order:
    1. Name and role on one line
    2. A two-sentence bio naming a current or recent role and a flagship project
    3. Links (Résumé, GitHub, LinkedIn, Email)
    4. Now (one line)
    5. Selected work (4–5 entries)
    6. Experience (compact rows)
    7. Writing / notes
    8. Elsewhere and colophon
- **Type.**
  - Inter Variable at 16–17 px / 1.6, weight 400–450 (Jakub uses 450), with `font-optical-sizing: auto`.
  - Newsreader Italic or Instrument Serif Italic for one to three emphasized phrases only.
  - JetBrains Mono or Geist Mono at 12 px, uppercase, `letter-spacing: .06em`, for labels and dates, with `font-variant-numeric: tabular-nums`.
  - Set the name at body size, weight 500. Headings are 15–16 px/500 in the secondary color.
- **Palette.** [Radix Sand](https://unpkg.com/@radix-ui/colors@3.0.0/sand.css), the exact values Emil uses:

  ```css
  :root { color-scheme: light dark;
    --bg:      light-dark(#fdfdfc, #111110); /* sand-1  */
    --surface: light-dark(#f9f9f8, #191918); /* sand-2  */
    --line:    light-dark(#e9e8e6, #2a2a28); /* sand-4  */
    --muted:   light-dark(#63635e, #b5b3ad); /* sand-11 */
    --ink:     light-dark(#21201c, #eeeeec); /* sand-12 */
    --accent:  light-dark(#b45309, #fbbf24); /* one accent, links/focus only */ }
  ```

- **Spacing.** A 4 px base: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128. Use 48–64 px between list groups and 96 px between sections.
- **Work entries.** Either a 44 px icon tile with name and one-line outcome (Jakub), or a 16:9 media card with a 12 px radius on a dark ground, then a title and one line (Samuel). Each entry links to a case-study page.
- **Motion.**
  - At most one page-enter: opacity, 8 px of `translateY` and 4–8 px of blur, about 600 ms, staggered 80–100 ms (Jakub's recipe).
  - Hover is a 150 ms color change.
  - Nothing animates on keyboard actions.
  - Under `prefers-reduced-motion`, drop the transform and blur and keep the opacity.
- **Details.** `text-wrap: balance` on headings and `pretty` on paragraphs. Shadows instead of borders. A 1 px, 10% outline on images. ↗ on external links. Copy-email feedback. An `llms.txt` and an `index.md` copy.

### B. "Sticky résumé": two columns, the Brittany Chiang lineage

*Built from: Brittany Chiang v5, with Tania Rascia's timeline and Delba's hire-me line.*

- **Layout.**
  - A 1280 px container. The left 48% stays pinned (`position: sticky; top: 0; max-height: 100vh`) and holds the name (48 px/700, −0.025em), the role (20 px/500), a one-line pitch, section nav with indicator lines (32 → 64 px when active), and social icons at the bottom.
  - The right ~52% scrolls through About, Experience, Projects, Writing and the colophon.
  - Experience rows: a 25% date column and 75% for "Role · Company ↗", two or three lines and tag pills. "View full résumé ↗" follows the list.
  - Project rows: a 16:9 thumbnail in 25%, then the title, description, **one metric**, pills, and "View full archive →".
- **Type.** Inter or Geist for everything (Geist avoids the exact Brittany look). Dates in Geist Mono at 12 px, uppercase.
- **Palette.** Brittany's dark tokens, with a different accent so it isn't a clone:

  ```css
  :root { --bg:#0f172a; --text:#94a3b8; --heading:#e2e8f0;
          --card-hover:rgba(30,41,59,.5); --line:rgba(226,232,240,.1);
          --accent:#fbbf24; --pill-bg:rgba(251,191,36,.1); }
  ```

  For a light version, use Tania's cream `#F8F4E6` with ink `#1D1D22` and one saturated accent.
- **Spacing.** A Tailwind-style 4 px grid. Sections 96–144 px apart, rows 48 px apart, cards with 16–24 px of padding.
- **Motion.** Hovering one row dims the others to 50% over 150 ms. The hovered card gets a fill and a 1 px inset top highlight. Arrows nudge 2–4 px. `motion-reduce:transition-none`.
- **Caveat** (*opinion*). This is the most-copied layout in developer portfolios. Skip the cursor spotlight and win on content: real case studies and live demos.

### C. "Instrument": engineering-forward, mono texture

*Built from: nexxel (all-mono, keyboard nav), Jhey (labels, live status line), Maxime Heckel (blueprint data readouts), Rauno (8 px tokens, one bold accent).*

- **Layout.**
  - A 720–880 px main column on a 12-column grid with hairline rules.
  - A header with keyboard shortcuts: `[w] work [p] projects [r] résumé [c] contact`.
  - A hero of one plain sentence, then a single **status line** of real data, e.g. `build ✓ 2h ago · 4 compilers online · cluster 7/7 nodes ready`.
  - Section order: status → selected work (rows of case studies with mono metrics) → experience timeline (mono dates) → notes → contact.
- **Type.** JetBrains Mono Variable (100–800) for nav, labels, metrics and dates, and Inter Variable or Geist for prose. A strict variant can go all-mono like nexxel. Use Geist Pixel at most once, as a wordmark.
- **Palette** (dark first, with a light variant through `light-dark()`):

  ```css
  :root { color-scheme: dark light;
    --bg:light-dark(#fafafa,#0e0f11); --surface:light-dark(#f2f2f3,#16181b);
    --line:light-dark(#e3e4e6,#26292e); --muted:light-dark(#5b616b,#8b929c);
    --ink:light-dark(#111214,#d1d5db); --signal:light-dark(#c2410c,#ff6b35); }
  ```

  The signal color marks live or active state only. Alternatively, a blueprint ground like Maxime's `#0046B0` with ink `#E0EBFD`.
- **Spacing.** An 8 px grid, Rauno's tokens: 8, 16, 24, 32, 40, 48, 56, 64, 72, 80, 88.
- **Motion.** Nothing on load. Instant state changes. One interactive "instrument" per case study, such as a live compile box or a gauge, never on the homepage hero. Honor reduced motion.
- **Risk** (*opinion*). Over-theming. Keep the cockpit metaphor to labels and data, and keep projects as plain rows. Don't build a bento instrument panel.

---

## 5. Recommended direction for this portfolio (*opinion*)

The projects (browser compilers, a cockpit trainer, a live game, a desktop app, a homelab) are unusually concrete and technical. What hiring reviewers say they value most is depth, shipped work and a tour of the hard parts. That points to **Recipe A, the Notebook, with C's mono labels as texture.** Concretely:

1. **First screen.** "Antony Perez — Software engineer, SF Bay Area." Then one sentence: *"I build compilers that run in the browser (C/C++, Java, Rust and Python courses on WebAssembly), a DCS cockpit trainer, and a live Roblox game."* Then an availability line and Résumé · GitHub · Email (Delba's pattern).
2. **Selected work.** At most five entries (Comeau's limit), each with an outcome line, a metric and links (Live · Code · Case study):
   1. **Compiler arenas**, as one entry. The signature interaction is a tiny "Run" box that compiles a hello world in-page: proof instead of decoration.
   2. **SortiePrep**, with a muted video loop on a Samuel Kraft–style media card.
   3. **The Roblox game**. It's "alive", so show visits or concurrent players.
   4. **Job Autopilot**, framed as "a niche problem I had", Comeau's top project category.
   5. **The Kubernetes homelab**, as an architecture diagram plus a few uptime and node numbers.
3. **Case-study pages.** Problem → constraints → architecture diagram → two or three hard parts → results → what I'd do next.
4. **Experience.** A Tania-style "brief timeline" turns lab technician → technical writer → SWE into a story. Use mono dates and keep it readable in an F-pattern.
5. **Drop or demote** the bento grid and anything a skimmer must decode before seeing proof, such as a checklist that gates attention. Keep the cockpit flavor as mono labels and a single status line.
6. **Cheap extras** from section 3.1: `light-dark()` dark mode, `prefers-reduced-motion`, `text-wrap: balance`, tabular dates, and an `llms.txt` with an `index.md` copy.

---

## 6. Screenshot files

All are in `/tmp/opencode/portfolio-refs/`. First screens are 1440×900, captured at 1440×900 with a device scale factor of 1.

**First screens (shortlist, 20).** `brittanychiang.png`, `leerob.png`, `rauno.png`, `paco.png`, `emilkowalski.png`, `joshwcomeau.png`, `delba.png`, `antfu.png`, `jhey.png`, `brunosimon.png`, `jakub.png`, `shuding.png`, `chronark.png`, `taniarascia.png`, `nexxel.png`, `manuarora.png`, `samuelkraft.png`, `maximeheckel.png`, `henryheffernan.png`, `dillion.png`.

- `henryheffernan.png` is taken after clicking START.
- `brunosimon.png` is taken after the loader plus a click, about 2 minutes on CPU WebGL.

**Full pages (6).**

- `brittanychiang-full.png` (1440×3860) and `samuelkraft-full.png` (1440×5167) are stitched from 900 px scroll tiles, so they render as a visitor sees them. Brittany's sticky left column therefore repeats in each tile.
- `jakub-full.png` (1440×2708), `nexxel-full.png` (1440×1820), `delba-full.png` (1425×1333) and `manuarora-full.png` (1440×2501) are single full-page captures.

**Dropped or checked sites.** In `extra/`: `rauchg.png`, `kentcdodds.png`, `overreacted.png`, `mxstbr.png`, `cassie.png` (retirement notice), `brianlovin.png`, `joshuawootonn.png`, `lynnandtonic.png`, `dennissnellenberg.png`, `steventey.png`, `cassidoo.png`, `jessezhou.png` (START gate), `adhamdannaway.png`, `nelsonlai.png`, `paulstamatiou.png`.

**Raw data and tools.**

- `data/<site>.json`: computed styles, loaded fonts, `@font-face` rules, CSS variables, color tallies and the text visible above the fold.
- `shot.mjs`: the capture script.
- `_work/`: the stitching, typography-sampling and font-identification scripts, the HN API dumps, and the Comeau sample chapter.
