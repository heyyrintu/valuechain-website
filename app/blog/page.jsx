import Link from 'next/link';
import { getAllPosts, formatDate } from '../../lib/posts';
import { PageHero } from '../../components/Sections';

export const metadata = {
  title: 'Blog & News',
  description: 'Company updates and logistics insights from the Drona Valuechain team.',
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      <PageHero
        ghost="INSIGHTS" eyebrow="Blog & News"
        title="Insights from the Field"
        intro="Company updates, operational know-how and perspectives on Indian logistics."
      />

      <section className="section">
        <div className="container-site">
          {posts.length === 0 ? (
            <p className="text-center text-slate-500">No posts yet — check back soon.</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}/`}
                  className="group flex flex-col rounded-xl border border-navy-100 p-7 shadow-sm transition hover:shadow-md"
                >
                  <div className="flex items-center gap-3 text-xs">
                    <span className="rounded-full bg-accent-50 px-3 py-1 font-semibold text-accent-700">
                      {post.tag}
                    </span>
                    <time className="text-slate-500">{formatDate(post.date)}</time>
                  </div>
                  <h2 className="mt-4 text-lg font-semibold text-navy-900 group-hover:text-accent-600">
                    {post.title}
                  </h2>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{post.excerpt}</p>
                  <span className="mt-4 text-sm font-semibold text-accent-600">Read more →</span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
