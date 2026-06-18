import Link from 'next/link';
import { site, services, industries, stats } from '../lib/site';
import { SectionHeading, CTABand, StatStrip } from '../components/Sections';
import Icon from '../components/Icons';
import Reveal from '../components/Reveal';
import Marquee from '../components/Marquee';

export const metadata = {
  title: `${site.shortName} — Integrated Logistics & Supply Chain Solutions`,
  description: site.description,
};

const whyUs = [
  {
    icon: 'shield',
    title: 'One Accountable Partner',
    text: 'No vendor handovers, no finger-pointing. One team owns your supply chain end to end — and answers for it.',
  },
  {
    icon: 'chart',
    title: 'Technology-Enabled',
    text: 'Real-time tracking, live inventory visibility and data-driven insights across every node of your network.',
  },
  {
    icon: 'clock',
    title: 'Built to Scale',
    text: 'A pan-India network and 24/7 operations that flex with seasonal peaks and rapid growth.',
  },
];

export default function HomePage() {
  return (
    <>
      {/* ───── Hero — bright & animated ───── */}
      <section className="surface-cream relative overflow-hidden">
        <div className="grid-texture-light absolute inset-0" aria-hidden="true" />
        <div className="blob left-[-7rem] top-[-5rem] h-96 w-96 bg-sun-200/70" aria-hidden="true" />
        <div className="blob right-[-6rem] top-32 h-80 w-80 bg-brand-100/80" style={{ animationDelay: '-6s' }} aria-hidden="true" />
        <div className="blob bottom-[-8rem] left-1/3 h-72 w-72 bg-sun-100" style={{ animationDelay: '-11s' }} aria-hidden="true" />

        {/* floating mini-cards */}
        <div className="animate-float pointer-events-none absolute right-[8%] top-24 hidden rounded-2xl border border-sun-200 bg-white/90 px-5 py-4 shadow-xl shadow-sun-400/10 backdrop-blur lg:block">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-sun-400 text-ink-900">
              <Icon name="truck" className="h-5 w-5" />
            </span>
            <div>
              <p className="font-display text-sm font-bold text-ink-900">Shipment #DL-2841</p>
              <p className="text-xs text-ink-500">Out for delivery · On time</p>
            </div>
            <span className="animate-pop ml-2 h-2.5 w-2.5 rounded-full bg-green-500" />
          </div>
        </div>
        <div className="animate-float-slow pointer-events-none absolute right-[22%] top-64 hidden rounded-2xl border border-brand-100 bg-white/90 px-5 py-4 shadow-xl shadow-brand-500/10 backdrop-blur xl:block">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500 text-white">
              <Icon name="inventory" className="h-5 w-5" />
            </span>
            <div>
              <p className="font-display text-sm font-bold text-ink-900">Inventory Accuracy</p>
              <p className="text-xs text-ink-500">Live across 12 sites</p>
            </div>
          </div>
        </div>

        <div className="container-site relative py-24 sm:py-32">
          <Reveal>
            <p className="eyebrow">Integrated &amp; Diversified Logistics · India</p>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="display mt-6 max-w-4xl text-5xl leading-[1.02] text-ink-900 sm:text-7xl">
              We move supply chains <span className="text-gradient">forward.</span>
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-ink-600">{site.description}</p>
          </Reveal>
          <Reveal delay={300}>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/contact/" className="btn-primary">
                Get a Quote
                <Icon name="arrow" className="h-4 w-4" />
              </Link>
              <Link href="/services/" className="btn-secondary">
                Explore Services
              </Link>
            </div>
          </Reveal>
        </div>

        {/* animated delivery route with driving truck */}
        <div className="relative h-20" aria-hidden="true">
          <svg className="absolute inset-x-0 bottom-8 w-full" height="2" preserveAspectRatio="none">
            <line
              x1="0" y1="1" x2="100%" y2="1"
              stroke="#DE1C1C" strokeOpacity="0.35" strokeWidth="2"
              strokeDasharray="10 8" className="animate-dash"
            />
          </svg>
          <span className="absolute bottom-[22px] left-[12%] h-3 w-3 -translate-x-1/2 rounded-full border-2 border-brand-500 bg-white" />
          <span className="absolute bottom-[22px] left-1/2 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-sun-500 bg-white" />
          <span className="absolute bottom-[22px] left-[88%] h-3 w-3 -translate-x-1/2 rounded-full border-2 border-brand-500 bg-white" />
          <span className="animate-drive absolute bottom-7 text-brand-500">
            <Icon name="truck" className="h-9 w-9" />
          </span>
        </div>

        {/* services ticker */}
        <div className="relative border-t border-sun-200 bg-sun-400 py-4">
          <Marquee
            items={services.map((s) => s.title).concat(['Pan-India Network', '24/7 Operations'])}
            itemClassName="display text-sm uppercase tracking-[0.2em] text-ink-900"
          />
        </div>
      </section>

      {/* ───── Stats with animated counters ───── */}
      <section className="section !pb-0">
        <div className="container-site">
          <StatStrip stats={stats} />
        </div>
      </section>

      {/* ───── Services — numbered editorial rows ───── */}
      <section className="section">
        <div className="container-site">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <SectionHeading
              eyebrow="What We Do"
              title={
                <>
                  Every link of the chain.
                  <br />
                  One partner.
                </>
              }
            />
            <Reveal delay={150}>
              <Link href="/services/" className="btn-secondary shrink-0">
                All Services
                <Icon name="arrow" className="h-4 w-4" />
              </Link>
            </Reveal>
          </div>

          <div className="mt-14 border-t border-ink-100">
            {services.map((s, i) => (
              <Reveal key={s.slug} delay={i * 60}>
                <Link
                  href={`/services/#${s.slug}`}
                  className="group grid items-center gap-4 border-b border-ink-100 py-7 transition-all duration-300 hover:bg-sun-50 sm:grid-cols-[5rem_3.5rem_1fr_auto] sm:gap-6 sm:py-8"
                >
                  <span className="display hidden text-2xl text-ink-300 transition group-hover:text-brand-500 sm:block">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-sun-400 text-ink-900 transition-all duration-300 group-hover:rotate-6 group-hover:bg-brand-500 group-hover:text-white">
                    <Icon name={s.icon} className="h-6 w-6" />
                  </span>
                  <span>
                    <span className="display block text-xl text-ink-900 transition group-hover:text-brand-600 sm:text-2xl">
                      {s.title}
                    </span>
                    <span className="mt-1 block max-w-xl text-sm leading-relaxed text-ink-500">
                      {s.summary}
                    </span>
                  </span>
                  <Icon
                    name="arrow"
                    className="hidden h-6 w-6 text-ink-300 transition-all duration-300 group-hover:translate-x-2 group-hover:text-brand-500 sm:block"
                  />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───── Industries — warm cream section ───── */}
      <section className="surface-cream relative overflow-hidden py-20 sm:py-28">
        <div className="grid-texture-light absolute inset-0" aria-hidden="true" />
        <div className="blob right-[-5rem] top-[-5rem] h-72 w-72 bg-brand-100/70" aria-hidden="true" />
        <p
          className="display text-ghost-sun pointer-events-none absolute -top-6 right-0 select-none whitespace-nowrap text-[9rem] leading-none"
          aria-hidden="true"
        >
          INDUSTRIES
        </p>
        <div className="container-site relative">
          <SectionHeading
            eyebrow="Industries"
            title="Specialised where it matters."
            intro="Regulated goods, precision manufacturing, high-velocity retail — each demands different disciplines. We bring them."
          />
          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            {industries.map((ind, i) => (
              <Reveal key={ind.slug} delay={i * 100}>
                <Link
                  href={`/industries/#${ind.slug}`}
                  className="group flex h-full flex-col rounded-3xl border border-sun-200 bg-white p-8 shadow-[0_18px_45px_-28px_rgba(248,144,11,0.5)] transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-300 hover:shadow-[0_28px_60px_-26px_rgba(222,28,28,0.35)]"
                >
                  <span className="display text-ghost-sun text-5xl">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="display mt-5 text-xl text-ink-900 transition group-hover:text-brand-600">{ind.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-600">{ind.summary}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-500">
                    Learn more
                    <Icon name="arrow" className="h-4 w-4 transition group-hover:translate-x-1.5" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───── Why Drona ───── */}
      <section className="section">
        <div className="container-site">
          <SectionHeading
            center
            eyebrow="Why Drona"
            title="Veterans on the ground. Technology in the loop."
            intro={`Founded in ${site.founded} by leaders with 20+ years in logistics, Drona pairs operational discipline with modern digital tools.`}
          />
          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            {whyUs.map((w, i) => (
              <Reveal key={w.title} delay={i * 100}>
                <div className="group h-full rounded-3xl border border-ink-100 bg-white p-8 transition-all duration-300 hover:-translate-y-1.5 hover:border-sun-300 hover:shadow-[0_28px_60px_-26px_rgba(248,144,11,0.45)]">
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-sun-400 to-sun-500 text-ink-900 shadow-lg shadow-sun-400/30 transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110">
                    <Icon name={w.icon} className="h-7 w-7" />
                  </span>
                  <h3 className="display mt-6 text-xl text-ink-900">{w.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-600">{w.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTABand
        title="Ready to streamline your supply chain?"
        text="Tell us about your operation and we'll design an integrated logistics program around it."
      />
    </>
  );
}
