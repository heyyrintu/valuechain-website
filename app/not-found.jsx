import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="section">
      <div className="container-site flex flex-col items-center py-20 text-center">
        <p className="text-6xl font-bold text-navy-200">404</p>
        <h1 className="mt-4 text-2xl font-bold text-navy-900">Page not found</h1>
        <p className="mt-2 text-slate-600">The page you&apos;re looking for doesn&apos;t exist or has moved.</p>
        <Link href="/" className="btn-primary mt-8">
          Back to Home
        </Link>
      </div>
    </section>
  );
}
