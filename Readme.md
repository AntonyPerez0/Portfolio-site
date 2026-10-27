# antonyperez.com

The portfolio of Antony Perez, a software engineer in the San Francisco Bay Area.

A dark, instrument-panel bento grid of projects (light mode one click away), with one twist borrowed from SortiePrep, the flight-sim trainer on it: a **pre-flight checklist** for hiring visitors. Its four items (open a project, read some code, check the experience, grab the résumé) tick themselves, with a timestamp, when the visitor actually does each one; the nav counts the progress and a finished list is cleared for contact.

- The GitHub tile shows the real contribution calendar for the last year, fetched live (github-contributions-api.jogruber.de); without a connection it keeps the printed total and the profile link.
- The C sample in the Arena tile compiles with `cc -Wall` and prints exactly the output shown.
- No framework and no 3D: about 2 kB of script and one stylesheet.

## Run it

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build in dist/
```

## Layout

```text
index.html             the whole page
src/main.js            mode toggle and copy button
src/preflight.js       the self-ticking pre-flight checklist
src/activity.js        the live GitHub contribution calendar
src/styles/            tokens.css, base.css and site.css
public/work/           screenshots of each project (WebP, 800 and 1600 px)
public/resume.pdf      the résumé
```

## Deploy

Every push to `main` builds with Vite and publishes `dist/` to GitHub Pages through `.github/workflows/deploy.yml`.

## License

MIT for the code. The résumé, copy and screenshots are © Antony Perez.
