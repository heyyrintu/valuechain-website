import fs from 'fs';
import path from 'path';
import { site, services, industries } from '../lib/site';
import { getAllPosts } from '../lib/posts';

export const dynamic = 'force-static';

/**
 * Last-modified date for a route, taken from the mtime of the file that
 * actually renders it.
 *
 * The previous version used `new Date()` for every entry, which told search
 * engines that all pages changed on every rebuild. That is noise: once lastmod
 * is demonstrably unreliable, crawlers stop weighting it. Falling back to the
 * build date only happens if the source file cannot be stat'd.
 */
function lastModified(...relativeSourcePaths) {
  let newest = 0;
  for (const rel of relativeSourcePaths) {
    try {
      const { mtimeMs } = fs.statSync(path.join(process.cwd(), rel));
      if (mtimeMs > newest) newest = mtimeMs;
    } catch {
      // Source file missing or unreadable — skip it.
    }
  }
  return newest ? new Date(newest) : new Date();
}

// The shared data file feeds the service and industry pages, so a copy edit
// there is a genuine content change for every page in those clusters.
const DATA = 'lib/site.js';

export default function sitemap() {
  const staticPages = [
    { path: '/', source: 'app/page.jsx', priority: 1.0, changeFrequency: 'monthly' },
    { path: '/about/', source: 'app/about/page.jsx', priority: 0.7, changeFrequency: 'yearly' },
    { path: '/services/', source: 'app/services/page.jsx', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/industries/', source: 'app/industries/page.jsx', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/clients/', source: 'app/clients/page.jsx', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/blog/', source: 'app/blog/page.jsx', priority: 0.6, changeFrequency: 'weekly' },
    { path: '/contact/', source: 'app/contact/page.jsx', priority: 0.7, changeFrequency: 'yearly' },
  ].map((p) => ({
    url: `${site.url}${p.path}`,
    lastModified: lastModified(p.source, DATA),
    changeFrequency: p.changeFrequency,
    priority: p.priority,
  }));

  // Service and industry detail pages carry the commercial-intent keywords, so
  // they sit at a higher priority than the brand pages.
  const servicePages = services.map((s) => ({
    url: `${site.url}/services/${s.slug}/`,
    lastModified: lastModified('app/services/[slug]/page.jsx', DATA),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const industryPages = industries.map((i) => ({
    url: `${site.url}/industries/${i.slug}/`,
    lastModified: lastModified('app/industries/[slug]/page.jsx', DATA),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const posts = getAllPosts().map((post) => ({
    url: `${site.url}/blog/${post.slug}/`,
    lastModified: new Date(post.date),
    changeFrequency: 'yearly',
    priority: 0.5,
  }));

  return [...staticPages, ...servicePages, ...industryPages, ...posts];
}
