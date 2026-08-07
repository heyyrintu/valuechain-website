import { pageMeta, graph, breadcrumbSchema, jsonLdProps } from '../../lib/seo';
import { PageHero, SectionHeading, CTABand } from '../../components/Sections';
import Icon from '../../components/Icons';
import ClientLogo from '../../components/ClientLogo';

export const metadata = pageMeta({
  title: 'Clients & Testimonials',
  description:
    'Trusted by manufacturers and distributors across pharma, automotive and consumer sectors. Client testimonials and success stories from Drona Valuechain.',
  path: '/clients/',
});

const clientsSchema = graph(breadcrumbSchema([{ name: 'Clients', path: '/clients/' }]));

// `logo` points to the real logo file (drop the official image in public/images/clients/).
// If a file is missing, ClientLogo falls back to the client name as text.
const clients = [
  { name: 'JMC Motor', logo: '/images/clients/jmc-motor.png' },
  { name: 'Ananda Dairy', logo: '/images/clients/ananda-dairy.png' },
  { name: 'Ashok Leyland', logo: '/images/clients/ashok-leyland.png' },
  { name: 'Lifelong Online', logo: '/images/clients/lifelong-online.png' },
  { name: 'Eshopbox', logo: '/images/clients/eshopbox.jpg' },
  { name: 'RedTape', logo: '/images/clients/redtape.png' },
];

// Freshly onboarded partners — highlighted at the top of the page.
const newWins = [
  {
    name: 'JMC Motor',
    sector: 'Automotive',
    win: 'Onboarded as an integrated logistics partner — bringing Drona’s in-plant and supply-chain discipline to their automotive operations.',
  },
  {
    name: 'Ananda Dairy',
    sector: 'Dairy · Transportation',
    win: 'Awarded their transportation mandate — moving temperature-sensitive dairy on time, every time, across the network.',
  },
];

// TODO: replace with approved client testimonials
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
    title: 'Dairy Transportation for Ananda',
    result: 'Trusted with time-critical dairy movement — reliable, temperature-aware transport that keeps product fresh from source to shelf.',
    tags: ['Transportation', 'Dairy'],
  },
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
      <script {...jsonLdProps(clientsSchema)} />
      <PageHero
        ghost="CLIENTS" eyebrow="Clients & Testimonials"
        title="Trusted Where It Counts"
        intro="Manufacturers and distributors across pharma, automotive and consumer sectors rely on Drona to keep their supply chains moving."
      />

      {/* Recently onboarded — the glorify band */}
      <section className="section bg-navy-50">
        <div className="container-site">
          <SectionHeading
            eyebrow="Latest Wins"
            title="Newest Partners on Board"
            intro="We’re proud to welcome two new names to the Drona family — the latest businesses to trust us with their supply chain."
            center
          />
          <div className="mx-auto mt-12 grid max-w-4xl gap-6 sm:grid-cols-2">
            {newWins.map((w) => (
              <div
                key={w.name}
                className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-500 to-brand-400 p-8 text-white shadow-xl shadow-brand-500/25"
              >
                <span className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-xs font-bold uppercase tracking-wider">
                  <Icon name="check" className="h-3.5 w-3.5" />
                  Newly Onboarded
                </span>
                <h3 className="mt-5 font-display text-2xl font-bold">{w.name}</h3>
                <p className="mt-1 text-sm font-semibold text-brand-50">{w.sector}</p>
                <p className="mt-4 leading-relaxed text-brand-50">{w.win}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Client logo strip */}
      <section className="section">
        <div className="container-site">
          <SectionHeading eyebrow="Our Clients" title="Companies We Work With" center />
          <div className="mx-auto mt-12 grid max-w-5xl grid-cols-2 items-stretch gap-4 sm:grid-cols-3">
            {clients.map((c) => (
              <div
                key={c.name}
                className="flex h-32 items-center justify-center rounded-2xl border border-ink-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-lg"
              >
                <ClientLogo
                  name={c.name}
                  src={c.logo}
                  className="max-h-16 w-auto max-w-[80%] object-contain sm:max-h-20"
                />
              </div>
            ))}
          </div>
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
