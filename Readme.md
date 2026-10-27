# antonyperez.com

The portfolio of Antony Perez, a software engineer in the San Francisco Bay Area.

The hero is a three.js ring of real screenshots of eight projects. It drifts slowly, turns as you scroll, and the panel under the pointer swings forward with a link to the project. Behind it runs a generated character field (value noise drawn into a character ramp on an 8 by 16 grid). The site opens in dark mode, with a light toggle in the header that is remembered.

## How the ring works

- Eight textured planes on a tilted ring, placed from the measured edge of the headline so they never cover it at any width; fog fades the far side.
- It renders at 30 fps at most, stops when the hero is off screen, freezes while you hover or focus the hero, and has a pause button.
- With reduced motion it holds still. Without WebGL 2 two screenshots stand in, tilted in CSS. The scene loads only after the page is usable (about 120 kB gzipped).

## Run it

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build in dist/
```

## Layout

```text
index.html             the whole page
src/main.js            mode toggle, work preview, copy button, code-to-output connector, WebGL check
src/gallery.js         the three.js project ring
src/field.js           the generated character field
src/styles/            tokens.css, base.css and site.css
public/work/           screenshots of each project (WebP, 800 and 1600 px)
public/resume.pdf      the résumé
```

## Deploy

Every push to `main` builds with Vite and publishes `dist/` to GitHub Pages through `.github/workflows/deploy.yml`.

## License

MIT for the code. The résumé, copy and screenshots are © Antony Perez.
