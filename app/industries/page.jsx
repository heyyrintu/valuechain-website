import { industries } from '../../lib/site';
import { PageHero, CTABand } from '../../components/Sections';

export const metadata = {
  title: 'Industries',
  description:
    'Specialised logistics for pharmaceutical, automotive & engineering, and FMCG & retail sectors — compliant, precise and built for scale.',
};

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        ghost="SECTORS" eyebrow="Industries We Serve"
        title="Sector Expertise That Shows in Execution"
        intro="Regulated goods, precision manufacturing, high-velocity retail — each industry demands different disciplines. We bring them."
      />

      <section className="section">
        <div className="container-site space-y-10">
          {industries.map((ind, i) => (
            <div
              key={ind.slug}
              id={ind.slug}
              className={`grid items-center gap-8 rounded-2xl border border-navy-100 p-8 shadow-sm lg:grid-cols-2 lg:p-12 ${
                i % 2 === 1 ? 'bg-navy-50' : 'bg-white'
              }`}
            >
              <div className={i % 2 === 1 ? 'lg:order-2' : ''}>
                <p className="eyebrow">{String(i + 1).padStart(2, '0')}</p>
                <h2 className="mt-2 text-2xl font-bold text-navy-900 sm:text-3xl">{ind.title}</h2>
                <p className="mt-4 leading-relaxed text-slate-600">{ind.summary}</p>
              </div>
              <ul className={`space-y-3 ${i % 2 === 1 ? 'lg:order-1' : ''}`}>
                {ind.points.map((p) => (
                  <li
                    key={p}
                    className="flex items-start gap-3 rounded-lg bg-white p-4 text-sm font-medium text-navy-800 shadow-sm ring-1 ring-navy-100"
                  >
                    <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-accent-500" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <CTABand
        title="Operating in a different sector?"
        text="Our integrated model adapts. Tell us about your industry and requirements."
      />
    </>
  );
}
