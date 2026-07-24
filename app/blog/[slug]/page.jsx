import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllPosts, getPost, formatDate } from '../../../lib/posts';

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }) {
  const post = getPost(params.slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { title: post.title, description: post.excerpt, type: 'article' },
  };
}

export default function BlogPostPage({ params }) {
  const post = getPost(params.slug);
  if (!post) notFound();

  return (
    <>
      <section className="surface-cream relative overflow-hidden py-16">
        <div className="grid-texture-light absolute inset-0" aria-hidden="true" />
        <div className="blob right-[-4rem] top-[-4rem] h-64 w-64 bg-sun-200/60" aria-hidden="true" />
        <div className="container-site relative max-w-3xl">
          <Link href="/blog/" className="text-sm font-medium text-brand-500 hover:text-brand-600">
            ← Back to Blog
          </Link>
          <div className="mt-6 flex items-center gap-3 text-xs">
            <span className="rounded-full bg-brand-500 px-3 py-1 font-semibold text-white">{post.tag}</span>
            <time dateTime={post.date} className="text-ink-500">
              {formatDate(post.date)}
            </time>
          </div>
          <h1 className="display mt-4 text-3xl leading-tight text-ink-900 sm:text-4xl">{post.title}</h1>
          <p className="mt-4 text-sm text-ink-500">By {post.author}</p>
        </div>
      </section>

      <article className="section">
        <div
          className="container-site prose-blog max-w-3xl"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
      </article>
    </>
  );
}
