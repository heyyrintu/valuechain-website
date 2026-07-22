import Link from 'next/link';
import { industries } from '../../lib/site';
import { PageHero, CTABand } from '../../components/Sections';
import Reveal from '../../components/Reveal';
import Marquee from '../../components/Marquee';
import Icon from '../../components/Icons';

export const metadata = {
  title: 'Industries',
  description:
    'Specialised logistics for pharmaceutical, automotive & engineering, and FMCG & retail sectors — compliant, precise and built for scale.',
};

// Per-sector identity — icon, accent, and a floating proof tag
const meta = {
  pharmaceutical: {
    icon: 'shield',
    tag: 'Regulated · Temperature-aware',
    grad: 'from-sun-400 via-sun-500 to-brand-500',
    chip: 'bg-sun-400 text-ink-900',
    accent: 'text-sun-600',
    dot: 'bg-sun-500',
    float: 'GDP-aligned',
  },
  automotive: {
    icon: 'factory',
    tag: 'In-plant · JIT / JIS',
    grad: 'from-brand-400 via-brand-500 to-grape-500',
    chip: 'bg-brand-500 text-white',
    accent: 'text-brand-600',
    dot: 'bg-brand-500',
    float: 'Line-side ready',
  },
  'fmcg-retail': {
    icon: 'package',
    tag: 'High-velocity · Multi-channel',
    grad: 'from-grape-400 via-grape-500 to-magenta',
    chip: 'bg-grape-500 text-white',
    accent: 'text-grape-600',
    dot: 'bg-grape-500',
    float: 'Peak-season scale',
  },
};

const fallback = meta.automotive;

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        ghost="SECTORS"
        eyebrow="Industries We Serve"
        title={
          <>
            Sector expertise that shows in <span className="text-gradient">execution.</span>
          </>
        }
        intro="Regulated goods, precision manufacturing, high-velocity retail — each industry demands different disciplines. We bring them."
      />

      {/* animated capabilities ticker */}
      <div className="relative border-y border-sun-200 bg-sun-400 py-4">
        <Marquee
          items={[
            'Pharmaceutical', 'GDP-aligned Handling', 'Automotive', 'JIT / JIS Line Feeding',
            'FMCG & Retail', 'Multi-channel Distribution', 'Pan-India Reach', 'Cold-chain Discipline',
          ]}
          itemClassName="display text-sm uppercase tracking-[0.2em] text-ink-900"
        />
      </div>

      <section className="section">
        <div className="container-site space-y-12 lg:space-y-16">
          {industries.map((ind, i) => {
            const m = meta[ind.slug] || fallback;
            const flip = i % 2 === 1;
            return (
              <Reveal key={ind.slug}>
                <div
                  id={ind.slug}
                  className="group grid items-stretch gap-6 lg:grid-cols-2 lg:gap-10"
                >
                  {/* ── Visual panel ── */}
                  <div
                    className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${m.grad} p-8 text-white shadow-2xl shadow-brand-500/20 sm:p-10 ${
                      flip ? 'lg:order-2' : ''
                    }`}
                  >
                    {/* drifting accents */}
                    <span className="blob -right-10 -top-10 h-40 w-40 bg-white/20" aria-hidden="true" />
                    <span className="blob -bottom-12 left-1/4 h-36 w-36 bg-white/10" style={{ animationDelay: '-7s' }} aria-hidden="true" />
                    {/* ghost number */}
                    <span className="display pointer-events-none absolute -right-2 bottom-2 select-none text-[8rem] leading-none text-white/15 sm:text-[10rem]">
                      {String(i + 1).padStart(2, '0')}
                    </span>

                    <div className="relative flex h-full flex-col">
                      <span className="animate-float flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15 backdrop-blur transition-transform duration-300 group-hover:scale-110">
                        <Icon name={m.icon} className="h-8 w-8" />
                      </span>
                      <p className="mt-auto pt-16 text-[11px] font-bold uppercase tracking-[0.22em] text-white/80">
                        {m.tag}
                      </p>
                      <h2 className="display mt-2 text-3xl sm:text-4xl">{ind.title}</h2>

                      {/* floating proof tag */}
                      <span className="animate-float-slow absolute right-0 top-1/2 inline-flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-xs font-bold text-ink-900 shadow-xl backdrop-blur">
                        <span className={`h-2 w-2 rounded-full ${m.dot} animate-pop`} />
                        {m.float}
                      </span>
                    </div>
                  </div>

                  {/* ── Content panel ── */}
                  <div
                    className={`flex flex-col justify-center rounded-3xl border border-ink-100 bg-white p-8 shadow-[0_24px_60px_-40px_rgba(33,53,90,0.5)] sm:p-10 ${
                      flip ? 'lg:order-1' : ''
                    }`}
                  >
                    <p className={`text-xs font-bold uppercase tracking-[0.25em] ${m.accent}`}>
                      Sector {String(i + 1).padStart(2, '0')}
                    </p>
                    <p className="mt-4 text-lg leading-relaxed text-ink-600">{ind.summary}</p>

                    <ul className="mt-7 grid gap-3 sm:grid-cols-2">
                      {ind.points.map((p, j) => (
                        <Reveal key={p} delay={120 + j * 90}>
                          <li className="flex items-start gap-3 rounded-2xl bg-ink-50 p-4 text-sm font-medium text-ink-800 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-md">
                            <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${m.chip}`}>
                              <Icon name="arrow" className="h-3 w-3" />
                            </span>
                            {p}
                          </li>
                        </Reveal>
                      ))}
                    </ul>

                    <Link
                      href="/contact/"
                      className={`mt-7 inline-flex items-center gap-2 text-sm font-semibold ${m.accent}`}
                    >
                      Discuss your {ind.title.split(' ')[0].toLowerCase()} requirements
                      <Icon name="arrow" className="h-4 w-4 transition group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      <CTABand
        title="Operating in a different sector?"
        text="Our integrated model adapts. Tell us about your industry and requirements."
      />
    </>
  );
}
