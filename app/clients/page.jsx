import { PageHero, SectionHeading, CTABand } from '../../components/Sections';
import Icon from '../../components/Icons';

export const metadata = {
  title: 'Clients & Testimonials',
  description:
    'Trusted by manufacturers and distributors across pharma, automotive and consumer sectors. Client testimonials and success stories from Drona Logitech.',
};

// TODO: replace with approved client names/logos and real testimonials
const testimonials = [
  {
    quote:
      'Drona took over our in-plant material handling and the difference was visible within the first month — cleaner flows, fewer line stoppages, full visibility.',
    name: 'Operations Head',
    company: 'Automotive component manufacturer',
  },
  {
    quote:
      'Pan-India pharma distribution with batch-level traceability and zero compliance escalations. Exactly the partner we needed.',
    name: 'Supply Chain Manager',
    company: 'Pharmaceutical distributor',
  },
  {
    quote:
      'One team handling warehousing, packaging and dispatch means one phone call when we need anything. That accountability is rare.',
    name: 'Plant Director',
    company: 'Consumer goods manufacturer',
  },
];

const caseStudies = [
  {
    title: 'In-Plant Transformation for an Automotive OEM Supplier',
    result: 'Streamlined line feeding and kitting; improved material availability at point of use.',
    tags: ['In-Plant', 'Automotive'],
  },
  {
    title: 'Pan-India Pharma Distribution Program',
    result: 'Compliant, batch-traceable deliveries across India with time-definite SLAs.',
    tags: ['Last-Mile', 'Pharma'],
  },
  {
    title: 'Integrated Warehouse + Packaging Operation',
    result: 'Single-partner accountability across storage, repacking and dispatch.',
    tags: ['Warehousing', 'Packaging'],
  },
];

export default function ClientsPage() {
  return (
    <>
      <PageHero
        ghost="CLIENTS" eyebrow="Clients & Testimonials"
        title="Trusted Where It Counts"
        intro="Manufacturers and distributors across pharma, automotive and consumer sectors rely on Drona to keep their supply chains moving."
      />

      {/* Client logo strip — placeholder until approved logos are provided */}
      <section className="section">
        <div className="container-site">
          <SectionHeading eyebrow="Our Clients" title="Companies We Work With" center />
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="flex h-20 items-center justify-center rounded-lg border border-dashed border-navy-200 bg-navy-50 text-xs font-medium text-navy-400"
              >
                Client Logo
              </div>
            ))}
          </div>
          <p className="mt-4 text-center text-xs text-slate-400">
            Client logos will be displayed here once approvals are confirmed.
          </p>
        </div>
      </section>

      <section className="section bg-navy-50">
        <div className="container-site">
          <SectionHeading eyebrow="Testimonials" title="What Our Clients Say" center />
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {testimonials.map((t) => (
              <figure key={t.quote} className="flex flex-col rounded-xl border border-navy-100 bg-white p-7 shadow-sm">
                <Icon name="quote" className="h-8 w-8 text-accent-400" />
                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-slate-600">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-5 border-t border-navy-100 pt-4">
                  <p className="text-sm font-semibold text-navy-900">{t.name}</p>
                  <p className="text-xs text-slate-500">{t.company}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-site">
          <SectionHeading eyebrow="Case Studies" title="Results in the Field" center />
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {caseStudies.map((c) => (
              <div key={c.title} className="flex flex-col rounded-xl border border-navy-100 p-7 shadow-sm">
                <div className="flex flex-wrap gap-2">
                  {c.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-accent-50 px-3 py-1 text-xs font-semibold text-accent-700">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="mt-4 text-lg font-semibold text-navy-900">{c.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{c.result}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABand title="Become our next success story." buttonLabel="Start a Conversation" />
    </>
  );
}
