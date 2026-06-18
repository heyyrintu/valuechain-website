import { site, stats } from '../../lib/site';
import { PageHero, SectionHeading, CTABand, StatStrip } from '../../components/Sections';
import Icon from '../../components/Icons';

export const metadata = {
  title: 'About Us',
  description: `Learn about ${site.name} — founded in ${site.founded} by logistics veterans with 20+ years of experience, delivering integrated supply chain solutions across India.`,
};

const values = [
  {
    icon: 'shield',
    title: 'Integrity',
    text: 'Transparent operations, honest commitments and auditable processes our clients can rely on.',
  },
  {
    icon: 'chart',
    title: 'Excellence',
    text: 'Continuous improvement in every process — measured, reviewed and refined.',
  },
  {
    icon: 'clock',
    title: 'Responsiveness',
    text: '24/7 support and rapid escalation paths, because supply chains never sleep.',
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        ghost="ABOUT" eyebrow="About Us"
        title="Logistics Veterans. Modern Execution."
        intro={`${site.shortName} was founded in ${site.founded} by industry leaders carrying 20+ years of hands-on logistics experience — with one goal: to bring every link of the supply chain together under one accountable partner.`}
      />

      <section className="section">
        <div className="container-site grid items-start gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Our Story"
              title="From Day One, Built for Integration"
            />
            <div className="mt-6 space-y-4 leading-relaxed text-slate-600">
              <p>
                Most companies stitch together separate vendors for warehousing,
                in-plant operations, packaging and distribution — and absorb the
                friction in between. Drona Logitech was created to remove that
                friction entirely.
              </p>
              <p>
                Headquartered in {site.address.city}, we operate as a single
                accountable partner across the full supply chain: inside your
                plant, inside the warehouse, and all the way to the last mile.
                Our teams combine disciplined, process-driven operations with
                modern technology for real-time visibility and data-driven
                decision making.
              </p>
              <p>
                Since inception we have grown rapidly, serving manufacturers and
                distributors across pharmaceuticals, automotive and consumer
                sectors with a pan-India delivery network.
              </p>
            </div>
          </div>
          <div className="space-y-6">
            <div className="rounded-3xl bg-gradient-to-br from-brand-500 to-brand-400 p-8 text-white shadow-xl shadow-brand-500/25">
              <h3 className="text-lg font-semibold">Our Mission</h3>
              <p className="mt-3 leading-relaxed text-brand-50">
                To simplify supply chains by integrating every logistics function
                under one roof — executed with precision, transparency and care.
              </p>
            </div>
            <div className="rounded-xl border border-navy-100 p-8">
              <h3 className="text-lg font-semibold text-navy-900">Our Vision</h3>
              <p className="mt-3 leading-relaxed text-slate-600">
                To be India&apos;s most trusted integrated logistics partner —
                the company manufacturers call first when reliability matters.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-navy-50">
        <div className="container-site">
          <SectionHeading eyebrow="Our Values" title="How We Operate" center />
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {values.map((v) => (
              <div key={v.title} className="rounded-xl border border-navy-100 bg-white p-7 text-center">
                <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent-50 text-accent-600">
                  <Icon name={v.icon} className="h-6 w-6" />
                </span>
                <h3 className="mt-5 text-lg font-semibold text-navy-900">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-site">
          <SectionHeading
            eyebrow="Leadership"
            title="The Team Behind Drona"
            intro="Leadership profiles and photos coming soon. (Placeholder — names, titles and photos will be added here.)"
            center
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-xl border border-dashed border-navy-200 p-8 text-center">
                <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-navy-100 text-2xl font-bold text-navy-400">
                  ?
                </span>
                <p className="mt-4 font-semibold text-navy-900">Leadership Name</p>
                <p className="text-sm text-slate-500">Designation</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-16">
        <div className="container-site">
          <StatStrip stats={stats} />
        </div>
      </section>

      <CTABand title="Want to know how we'd run your supply chain?" />
    </>
  );
}
