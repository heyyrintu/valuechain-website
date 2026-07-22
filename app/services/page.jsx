import { services } from '../../lib/site';
import { PageHero, ServiceCard, CTABand, SectionHeading } from '../../components/Sections';
import Reveal from '../../components/Reveal';

export const metadata = {
  title: 'Services',
  description:
    'In-plant services, warehousing & storage, inventory management, packaging solutions and last-mile delivery — integrated logistics services from Drona Valuechain.',
};

const process = [
  { step: '01', title: 'Assess', text: 'We study your current operation, volumes and pain points on the ground.' },
  { step: '02', title: 'Design', text: 'A tailored solution with clear SLAs, staffing plans and technology setup.' },
  { step: '03', title: 'Deploy', text: 'Structured go-live with trained teams, SOPs and safety compliance in place.' },
  { step: '04', title: 'Optimise', text: 'Continuous KPI reviews, data-driven improvements and scale-up support.' },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        ghost="SERVICES"
        eyebrow="Our Services"
        title="One Partner. Every Link of the Chain."
        intro="Five integrated service lines that can run independently or as a single end-to-end program — inside your plant, across the warehouse, and out to the last mile."
      />

      <section className="section">
        <div className="container-site grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <ServiceCard key={s.slug} service={s} index={i} anchor />
          ))}
        </div>
      </section>

      <section className="section bg-ink-50">
        <div className="container-site">
          <SectionHeading eyebrow="How We Engage" title="A Proven 4-Step Process" center />
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {process.map((p, i) => (
              <Reveal key={p.step} delay={i * 90}>
                <div className="h-full rounded-2xl border border-ink-100 bg-white p-8 transition hover:-translate-y-1 hover:shadow-lg">
                  <p className="display text-4xl text-sun-500">{p.step}</p>
                  <h3 className="display mt-4 text-xl text-ink-900">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-600">{p.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTABand
        title="Not sure which service fits your operation?"
        text="Share your requirements and our team will recommend the right mix — no obligation."
        buttonLabel="Request a Consultation"
      />
    </>
  );
}
