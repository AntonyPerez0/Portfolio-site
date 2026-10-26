# antonyperez.com

The portfolio of Antony Perez, a software engineer in the San Francisco Bay Area.

The hero is a 3D compiler pipeline built with three.js: the characters of a real C program stream from loose source on the left, through tokens, a syntax tree and IR, into ordered WebAssembly bytes on the right. Scrolling moves the camera along the pipeline and the pointer magnifies the characters under it.

## How the pipeline works

- One instanced draw call: every character is a quad, and its position, glyph and colour are computed in the vertex shader from time, so the CPU only updates a handful of uniforms per frame.
- Glyphs come from a texture atlas drawn at runtime in JetBrains Mono.
- It renders at 30 fps at most, stops when the hero is off screen, freezes while you hover or focus the hero, and has a pause button.
- With reduced motion it renders one still frame. Without WebGL 2 a dot grid stands in. The scene is loaded only after the page is usable (about 120 kB gzipped).

## Run it

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build in dist/
```

## Layout

```text
index.html             the whole page
src/main.js            the work preview, copy button, code-to-output connector, WebGL check
src/pipeline.js        the three.js compiler pipeline
src/styles/            tokens.css, base.css and site.css
public/work/           screenshots of each project (WebP, 800 and 1600 px)
public/resume.pdf      the résumé
```

## Deploy

Every push to `main` builds with Vite and publishes `dist/` to GitHub Pages through `.github/workflows/deploy.yml`.

## License

MIT for the code. The résumé, copy and screenshots are © Antony Perez.
