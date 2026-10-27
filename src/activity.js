// The GitHub tile: the real contribution calendar for the last year, fetched live.
// Without a connection the tile keeps the total printed in the page and the profile link.
export async function startActivity(user) {
  const map = document.querySelector('[data-act-map]');
  const total = document.querySelector('[data-act-total]');
  if (!map) return;
  try {
    const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${user}?y=last`);
    if (!res.ok) throw new Error(res.status);
    const data = await res.json();
    const days = data.contributions || [];
    const first = new Date(days[0]?.date).getDay() || 0;
    const cells = [];
    for (let i = 0; i < first; i++) cells.push('<i data-l="pad" style="visibility:hidden"></i>');
    days.forEach((d) => cells.push(`<i data-l="${d.level}" title="${d.count} on ${d.date}"></i>`));
    map.innerHTML = cells.join('');
    if (total && Number.isFinite(data.total?.lastYear)) total.textContent = data.total.lastYear.toLocaleString('en-US');
    map.setAttribute('aria-label', `Contribution calendar: ${data.total?.lastYear ?? ''} contributions in the last year`);
  } catch {
    map.hidden = true;
  }
}
