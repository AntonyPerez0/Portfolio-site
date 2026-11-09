# antonyperez.com

The portfolio of Antony Perez, a software engineer in the San Francisco Bay Area.

A quiet, text-first design in the style of today's most admired engineer portfolios (see [the research](docs/research/portfolio-design-trends.md)). Phones get one column; from 1024px wide the page becomes a 1200px two-column layout with a sticky header.

- **First screen:** availability, a one-line statement, two sentences of bio and the résumé one click away. On desktop, a Highlights list (one key number per project) and the live GitHub activity sit beside it.
- **Selected work:** five numbered projects, each with a large screenshot on a tinted plate (beside the text on desktop), an outcome line with real numbers, its stack, links, and a "How it works" panel covering the hard parts.
- **More projects, experience, education and toolbox:** a ruled table, two résumé columns and four tool groups on desktop; short rows on phones.
- **Colors and type:** warm neutrals (Radix Sand) with light and dark modes. The page follows the system setting until the visitor picks one. Type is Inter, with Newsreader italic for a few phrases and Geist Mono for labels.

Live details:
- The Activity block draws the last year of real GitHub contributions as weekly bars (github-contributions-api.jogruber.de) and names the latest push (GitHub API). It sits beside the intro on desktop and lower down on phones, and stays hidden if the contribution service is unreachable.
- The footer prints the commit the page was built from.
- `llms.txt` gives AI agents and recruiting tools a plain-text summary of the page.

No framework: one HTML file, about 2 kB of script and one stylesheet.

## Run it

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build in dist/
```

## Layout

```text
index.html             the whole page
src/main.js            light and dark modes, copy-email button
src/activity.js        GitHub contribution bars and latest push
src/styles/            tokens.css, base.css and site.css
public/work/           screenshots of each project (WebP, 800 and 1600 px)
public/resume.pdf      the résumé
public/llms.txt        plain-text summary for AI agents
docs/research/         the design research behind this version
```

## Deploy

Every push to `main` builds with Vite and publishes `dist/` to GitHub Pages through `.github/workflows/deploy.yml`.

## License

MIT for the code. The résumé, copy and screenshots are © Antony Perez.
