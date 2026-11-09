// The Activity section: a year of real GitHub contributions as weekly bars, and the latest push.
// It stays hidden unless the contribution data arrives, so a failed fetch leaves no empty box.
const SVG = 'http://www.w3.org/2000/svg';

const weeks = (days) => {
  const out = [];
  days.forEach((d, i) => {
    const w = Math.floor((i + new Date(days[0].date).getUTCDay()) / 7);
    out[w] ??= { count: 0, from: d.date, to: d.date };
    out[w].count += d.count;
    out[w].to = d.date;
  });
  return out;
};

const ago = (iso) => {
  const s = (Date.parse(iso) - Date.now()) / 1000;
  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
  for (const [unit, n] of [['year', 31536000], ['month', 2592000], ['week', 604800], ['day', 86400], ['hour', 3600], ['minute', 60]]) {
    if (Math.abs(s) >= n) return rtf.format(Math.round(s / n), unit);
  }
  return 'just now';
};

function drawBars(svg, data) {
  const max = Math.max(1, ...data.map((w) => w.count));
  const W = 10, GAP = 3, H = 56;
  svg.setAttribute('viewBox', `0 0 ${data.length * (W + GAP) - GAP} ${H}`);
  svg.setAttribute('preserveAspectRatio', 'none');
  data.forEach((w, i) => {
    const h = w.count ? Math.max(4, Math.round((w.count / max) * H)) : 2;
    const r = document.createElementNS(SVG, 'rect');
    Object.entries({ x: i * (W + GAP), y: H - h, width: W, height: h, rx: 1.5 }).forEach(([k, v]) => r.setAttribute(k, v));
    if (i === data.length - 1) r.classList.add('is-now');
    const t = document.createElementNS(SVG, 'title');
    t.textContent = `${w.count} contribution${w.count === 1 ? '' : 's'}, week of ${w.from}`;
    r.append(t);
    svg.append(r);
  });
}

export async function startActivity(user) {
  const section = document.querySelector('[data-activity]');
  if (!section) return;
  try {
    const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${user}?y=last`);
    if (!res.ok) throw new Error(res.status);
    const data = await res.json();
    const days = data.contributions ?? [];
    if (!days.length) return;
    drawBars(section.querySelector('[data-spark]'), weeks(days));
    const total = data.total?.lastYear ?? days.reduce((n, d) => n + d.count, 0);
    section.querySelector('[data-total]').textContent = total.toLocaleString('en-US');
    section.querySelector('[data-spark]').setAttribute('aria-label', `Weekly GitHub contributions over the last year, ${total} in total`);
    section.hidden = false;
  } catch {
    return;
  }

  try {
    const res = await fetch(`https://api.github.com/users/${user}/repos?sort=pushed&per_page=10&type=owner`);
    if (!res.ok) return;
    const repo = (await res.json()).find((r) => !r.fork && !r.private && r.name.toLowerCase() !== user.toLowerCase());
    if (!repo) return;
    const last = section.querySelector('[data-last]');
    const a = Object.assign(document.createElement('a'), { href: repo.html_url, textContent: repo.name });
    const time = Object.assign(document.createElement('time'), { dateTime: repo.pushed_at, textContent: ago(repo.pushed_at) });
    last.append('Last push to ', a, ', ', time);
    last.hidden = false;
  } catch {
    /* the bars already say enough */
  }
}
