import Link from 'next/link';
import { notFound } from 'next/navigation';
import { services, industries } from '../../../lib/site';
import {
  pageMeta,
  graph,
  breadcrumbSchema,
  serviceSchema,
  faqSchema,
  jsonLdProps,
} from '../../../lib/seo';
import { PageHero, CTABand, SectionHeading } from '../../../components/Sections';
import FAQ from '../../../components/FAQ';
import Reveal from '../../../components/Reveal';
import Icon from '../../../components/Icons';

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }) {
  const service = services.find((s) => s.slug === params.slug);
  if (!service) return {};
  return pageMeta({
    title: service.metaTitle,
    description: service.metaDescription,
    path: `/services/${service.slug}/`,
  });
}

export default function ServiceDetailPage({ params }) {
  const service = services.find((s) => s.slug === params.slug);
  if (!service) notFound();

  const path = `/services/${service.slug}/`;
  const related = services.filter((s) => s.slug !== service.slug);
  const servedIndustries = industries.filter((i) => service.industries.includes(i.slug));

  const schema = graph(
    serviceSchema(service),
    breadcrumbSchema([
      { name: 'Services', path: '/services/' },
      { name: service.title, path },
    ]),
    faqSchema(service.faqs, path)
  );

  return (
    <>
      <script {...jsonLdProps(schema)} />

      {/* Visible breadcrumb — matches the BreadcrumbList schema above. */}
      <nav aria-label="Breadcrumb" className="surface-cream border-b border-ink-100">
        <ol className="container-site flex flex-wrap items-center gap-2 py-4 text-sm text-ink-500">
          <li>
            <Link href="/" className="hover:text-brand-600">
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href="/services/" className="hover:text-brand-600">
              Services
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="font-medium text-ink-800" aria-current="page">
            {service.title}
          </li>
        </ol>
      </nav>

      <PageHero
        ghost={service.title.split(' ')[0].toUpperCase()}
        eyebrow="Service"
        title={service.h1}
        intro={service.intro}
      />

      {/* Definition block. Placed first and written as a self-contained
          paragraph so it can be quoted on its own by an answer engine. */}
      <section className="section">
        <div className="container-site">
          <Reveal className="max-w-3xl rounded-3xl border border-brand-100 bg-brand-50/50 p-8 sm:p-10">
            <p className="eyebrow">In short</p>
            <p className="mt-4 text-lg leading-relaxed text-ink-700">{service.definition}</p>
          </Reveal>
        </div>
      </section>

      <section className="section pt-0">
        <div className="container-site grid gap-14 lg:grid-cols-[minmax(0,1fr)_20rem]">
          <div className="max-w-3xl">
            {service.sections.map((block, i) => (
              <Reveal key={block.h2} delay={i * 70} className="mb-12 last:mb-0">
                <h2 className="display text-2xl text-ink-900 sm:text-3xl">{block.h2}</h2>
                <p className="mt-4 text-[17px] leading-relaxed text-ink-600">{block.body}</p>
              </Reveal>
            ))}
          </div>

          <aside className="space-y-6">
            <Reveal>
              <div className="rounded-3xl border border-ink-100 bg-white p-7 shadow-[0_18px_40px_-30px_rgba(63,108,196,0.4)]">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-400 text-white">
                  <Icon name={service.icon} className="h-6 w-6" />
                </span>
                <h2 className="display mt-5 text-lg text-ink-900">What you get</h2>
                <ul className="mt-4 space-y-3 text-sm text-ink-600">
                  {service.deliverables.map((d) => (
                    <li key={d} className="flex items-start gap-2.5">
                      <span className="mt-1.5 h-1.5 w-4 shrink-0 rounded-full bg-sun-400" />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div className="rounded-3xl border border-ink-100 bg-ink-50 p-7">
                <h2 className="display text-lg text-ink-900">What it changes</h2>
                <ul className="mt-4 space-y-3 text-sm text-ink-600">
                  {service.outcomes.map((o) => (
                    <li key={o} className="flex items-start gap-2.5">
                      <span className="mt-1.5 h-1.5 w-4 shrink-0 rounded-full bg-brand-400" />
                      {o}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </aside>
        </div>
      </section>

      {servedIndustries.length > 0 && (
        <section className="section bg-ink-50">
          <div className="container-site">
            <SectionHeading
              eyebrow="Where we apply it"
              title={`${service.title} by industry`}
              intro="The same service line looks different depending on what you make and who you ship to."
            />
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {servedIndustries.map((ind, i) => (
                <Reveal key={ind.slug} delay={i * 80}>
                  <Link
                    href={`/industries/${ind.slug}/`}
                    className="group flex h-full flex-col rounded-3xl border border-ink-100 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-sun-300 hover:shadow-lg"
                  >
                    <h3 className="display text-lg text-ink-900 transition-colors group-hover:text-brand-600">
                      {ind.title}
                    </h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-600">{ind.summary}</p>
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-600">
                      {ind.title} logistics
                      <Icon name="arrow" className="h-4 w-4" />
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <FAQ
        faqs={service.faqs}
        eyebrow="FAQ"
        title={`${service.title} — common questions`}
        className="section"
      />

      <section className="section bg-ink-50 pt-0">
        <div className="container-site">
          <SectionHeading eyebrow="Also from Drona" title="Other service lines" />
          <div className="mt-10 flex flex-wrap gap-3">
            {related.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}/`}
                className="rounded-full border border-ink-200 bg-white px-5 py-2.5 text-sm font-medium text-ink-700 transition hover:border-brand-400 hover:text-brand-600"
              >
                {s.title}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTABand
        title={`Need ${service.title.toLowerCase()} you can hold to an SLA?`}
        text="Tell us your volumes, locations and current pain points — we'll come back with a practical proposal."
        buttonLabel="Request a Consultation"
      />
    </>
  );
}
