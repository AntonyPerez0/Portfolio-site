const fs = require('fs');
const { SitemapStream, streamToPromise } = require('sitemap');
const { Readable } = require('stream');

const links = [
  { url: '/',  changefreq: 'daily', priority: 1.0 },
  { url: '/projects',  changefreq: 'monthly',  priority: 0.8 },
  { url: '/blog',  changefreq: 'weekly',  priority: 0.7 },
  { url: '/contact',  changefreq: 'monthly',  priority: 0.5 },
];

const stream = new SitemapStream({ hostname: 'http://antonyperez.com' });

streamToPromise(Readable.from(links).pipe(stream)).then((data) =>
  fs.writeFileSync('./public/sitemap.xml', data.toString())
);