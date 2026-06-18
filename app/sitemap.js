import { site } from '../lib/site';
import { getAllPosts } from '../lib/posts';

export const dynamic = 'force-static';

export default function sitemap() {
  const pages = ['', '/about', '/services', '/industries', '/clients', '/blog', '/contact'].map(
    (p) => ({
      url: `${site.url}${p}/`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: p === '' ? 1 : 0.8,
    })
  );

  const posts = getAllPosts().map((post) => ({
    url: `${site.url}/blog/${post.slug}/`,
    lastModified: new Date(post.date),
    changeFrequency: 'yearly',
    priority: 0.6,
  }));

  return [...pages, ...posts];
}
