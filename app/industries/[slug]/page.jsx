import Link from 'next/link';
import { notFound } from 'next/navigation';
import { industries, services } from '../../../lib/site';
import { pageMeta, graph, breadcrumbSchema, faqSchema, jsonLdProps, abs, ORG_ID } from '../../../lib/seo';
import { PageHero, CTABand, SectionHeading } from '../../../components/Sections';
import FAQ from '../../../components/FAQ';
import Reveal from '../../../components/Reveal';
import Icon from '../../../components/Icons';

export function generateStaticParams() {
  return industries.map((i) => ({ slug: i.slug }));
}

export function generateMetadata({ params }) {
  const industry = industries.find((i) => i.slug === params.slug);
  if (!industry) return {};
  return pageMeta({
    title: industry.metaTitle,
    description: industry.metaDescription,
    path: `/industries/${industry.slug}/`,
  });
}

export default function IndustryDetailPage({ params }) {
  const industry = industries.find((i) => i.slug === params.slug);
  if (!industry) notFound();

  const path = `/industries/${industry.slug}/`;
  const used = services.filter((s) => industry.servicesUsed.includes(s.slug));

  const schema = graph(
    {
      '@type': 'WebPage',
      '@id': `${abs(path)}#webpage`,
      url: abs(path),
      name: industry.metaTitle,
      description: industry.metaDescription,
      about: { '@type': 'Thing', name: industry.title },
      isPartOf: { '@id': `${abs('/')}#website` },
      publisher: { '@id': ORG_ID },
    },
    breadcrumbSchema([
      { name: 'Industries', path: '/industries/' },
      { name: industry.title, path },
    ]),
    faqSchema(industry.faqs, path)
  );

  return (
    <>
      <script {...jsonLdProps(schema)} />

      <nav aria-label="Breadcrumb" className="surface-cream border-b border-ink-100">
        <ol className="container-site flex flex-wrap items-center gap-2 py-4 text-sm text-ink-500">
          <li>
            <Link href="/" className="hover:text-brand-600">
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href="/industries/" className="hover:text-brand-600">
              Industries
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="font-medium text-ink-800" aria-current="page">
            {industry.title}
          </li>
        </ol>
      </nav>

      <PageHero
        ghost={industry.slug.split('-')[0].toUpperCase()}
        eyebrow="Industry"
        title={industry.h1}
        intro={industry.intro}
      />

      <section className="section">
        <div className="container-site">
          <Reveal className="max-w-3xl">
            <h2 className="display text-2xl text-ink-900 sm:text-3xl">
              What makes {industry.title.toLowerCase()} different
            </h2>
            <p className="mt-5 text-[17px] leading-relaxed text-ink-600">{industry.challenge}</p>
          </Reveal>
        </div>
      </section>

      <section className="section bg-ink-50 pt-0 sm:pt-0">
        <div className="container-site pt-20">
          <SectionHeading eyebrow="Our approach" title={`How we run ${industry.title.toLowerCase()}`} />
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {industry.approach.map((item, i) => (
              <Reveal key={item.h3} delay={i * 80}>
                <div className="h-full rounded-3xl border border-ink-100 bg-white p-8">
                  <p className="display text-3xl text-sun-500">{String(i + 1).padStart(2, '0')}</p>
                  <h3 className="display mt-4 text-xl text-ink-900">{item.h3}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-600">{item.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-site">
          <SectionHeading
            eyebrow="Service lines involved"
            title={`Services we typically deploy in ${industry.title.toLowerCase()}`}
            intro="Most engagements combine several of these under a single contract and a single point of accountability."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {used.map((s, i) => (
              <Reveal key={s.slug} delay={i * 70}>
                <Link
                  href={`/services/${s.slug}/`}
                  className="group flex h-full flex-col rounded-3xl border border-ink-100 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-sun-300 hover:shadow-lg"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-400 text-white">
                    <Icon name={s.icon} className="h-5 w-5" />
                  </span>
                  <h3 className="display mt-5 text-base text-ink-900 transition-colors group-hover:text-brand-600">
                    {s.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-600">{s.summary}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <FAQ
        faqs={industry.faqs}
        eyebrow="FAQ"
        title={`${industry.title} — common questions`}
      />

      <CTABand
        title={`Running a ${industry.title.split(' ')[0].toLowerCase()} operation that needs a better logistics partner?`}
        text="Share your volumes, locations and current pain points and we'll come back with a practical proposal."
        buttonLabel="Talk to Our Team"
      />
    </>
  );
}
