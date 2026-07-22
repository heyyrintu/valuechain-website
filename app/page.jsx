import Link from 'next/link';
import { site, services, industries, stats } from '../lib/site';
import { SectionHeading, CTABand, StatStrip } from '../components/Sections';
import Icon from '../components/Icons';
import Reveal from '../components/Reveal';
import Marquee from '../components/Marquee';
import HeroChain from '../components/HeroChain';
import ChainRail from '../components/ChainRail';

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

// Bento layout + colour accent per service tile
const bento = {
  'in-plant-services': {
    variant: 'feature',
    span: 'sm:col-span-2 lg:col-span-1 lg:row-span-2',
    tile: 'bg-sun-50 border-sun-200 hover:border-sun-400',
    icon: 'bg-sun-400 text-ink-900',
    title: 'group-hover:text-sun-600',
    dot: 'bg-sun-500',
    link: 'text-sun-600',
  },
  warehousing: {
    span: 'sm:col-span-2 lg:col-span-2',
    tile: 'bg-brand-50 border-brand-100 hover:border-brand-300',
    icon: 'bg-brand-500 text-white',
    title: 'group-hover:text-brand-600',
    link: 'text-brand-600',
  },
  'inventory-management': {
    span: 'lg:col-span-1',
    tile: 'bg-grape-50 border-grape-100 hover:border-grape-300',
    icon: 'bg-grape-500 text-white',
    title: 'group-hover:text-grape-600',
    link: 'text-grape-600',
  },
  'packaging-solutions': {
    span: 'lg:col-span-1',
    tile: 'bg-teal/10 border-teal/30 hover:border-teal/70',
    icon: 'bg-teal text-white',
    title: 'group-hover:text-brand-600',
    link: 'text-brand-600',
  },
  'manpower-supply': {
    span: 'lg:col-span-1',
    tile: 'bg-magenta/10 border-magenta/30 hover:border-magenta/70',
    icon: 'bg-magenta text-white',
    title: 'group-hover:text-magenta',
    link: 'text-magenta',
  },
  'last-mile-delivery': {
    variant: 'banner',
    span: 'sm:col-span-2 lg:col-span-2',
  },
};

export default function HomePage() {
  return (
    <>
      {/* ───── Hero — bright & animated ───── */}
      <section className="surface-cream relative overflow-hidden">
        <div className="grid-texture-light absolute inset-0" aria-hidden="true" />
        <div className="blob left-[-7rem] top-[-5rem] h-96 w-96 bg-sun-200/70" aria-hidden="true" />
        <div className="blob right-[-6rem] top-32 h-80 w-80 bg-brand-100/80" style={{ animationDelay: '-6s' }} aria-hidden="true" />
        <div className="blob bottom-[-8rem] left-1/3 h-72 w-72 bg-grape-100" style={{ animationDelay: '-11s' }} aria-hidden="true" />

        <div className="container-site relative py-20 sm:py-28">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-10">
            {/* LEFT — copy */}
            <div className="relative z-10">
          <Reveal>
            <span className="inline-flex items-center gap-2.5 rounded-full border border-brand-100 bg-white/70 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-brand-600 shadow-sm backdrop-blur">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sun-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-sun-500" />
              </span>
              Integrated &amp; Diversified Logistics · India
            </span>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="display mt-6 text-5xl leading-[1.03] text-ink-900 sm:text-6xl xl:text-7xl">
              We move supply chains <span className="text-gradient">forward.</span>
            </h1>
          </Reveal>
          <Reveal delay={180}>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-ink-600">{site.description}</p>
          </Reveal>

          {/* Mission callout — gradient-bordered card */}
          <Reveal delay={240}>
            <div className="mt-8 max-w-2xl rounded-2xl bg-gradient-to-r from-sun-400 via-brand-500 to-grape-500 p-[1.5px] shadow-xl shadow-brand-500/10">
              <div className="rounded-[15px] bg-white/85 p-5 backdrop-blur sm:p-6">
                <div className="flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-sun-400 via-brand-500 to-grape-600 text-white shadow-lg shadow-brand-500/25">
                    <Icon name="target" className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-brand-600">
                      Our Mission · {site.tagline}
                    </p>
                    <p className="mt-1.5 font-display text-base font-semibold leading-relaxed text-ink-900 sm:text-lg">
                      {site.mission}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={300}>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/contact/" className="btn-primary">
                Get a Quote
                <Icon name="arrow" className="h-4 w-4" />
              </Link>
              <Link href="/services/" className="btn-secondary">
                Explore Services
              </Link>
            </div>
          </Reveal>

          {/* Industry microline */}
          <Reveal delay={360}>
            <div className="mt-9 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm font-medium text-ink-500">
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-ink-400">Trusted across</span>
              <span className="inline-flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-sun-500" />Pharma</span>
              <span className="text-ink-200">·</span>
              <span className="inline-flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-brand-500" />Automotive</span>
              <span className="text-ink-200">·</span>
              <span className="inline-flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-grape-500" />FMCG &amp; Retail</span>
              <span className="text-ink-200">·</span>
              <span className="inline-flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-magenta" />Engineering</span>
            </div>
          </Reveal>
            </div>

            {/* RIGHT — live value-chain signature */}
            <div className="relative z-10 hidden lg:block">
              <HeroChain />
            </div>
          </div>
        </div>

        {/* services ticker */}
        <div className="relative mt-16 border-t border-sun-200 bg-sun-400 py-4">
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

      {/* ───── Services — bento grid ───── */}
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

          <Reveal delay={120} className="mt-12">
            <ChainRail />
          </Reveal>

          <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:auto-rows-fr lg:grid-cols-3">
            {services.map((s, i) => {
              const m = bento[s.slug] || { span: 'lg:col-span-1', tile: 'bg-ink-50 border-ink-100 hover:border-ink-300', icon: 'bg-brand-500 text-white', title: 'group-hover:text-brand-600', link: 'text-brand-600' };

              if (m.variant === 'banner') {
                return (
                  <Reveal key={s.slug} delay={i * 60} className={`${m.span} h-full`}>
                    <Link
                      href={`/services/#${s.slug}`}
                      className="group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl bg-gradient-to-br from-sun-500 via-brand-500 to-grape-600 p-8 text-white transition-all duration-300 hover:-translate-y-1 sm:p-10"
                    >
                      <span className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/10" aria-hidden="true" />
                      <span className="pointer-events-none absolute right-16 bottom-[-3rem] h-24 w-24 rounded-full bg-white/10" aria-hidden="true" />
                      <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-start gap-5">
                          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/15 text-white backdrop-blur">
                            <Icon name={s.icon} className="h-7 w-7" />
                          </span>
                          <div>
                            <h3 className="display text-2xl">{s.title}</h3>
                            <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/85">{s.summary}</p>
                          </div>
                        </div>
                        <span className="inline-flex shrink-0 items-center gap-2 self-start rounded-full bg-white/15 px-5 py-3 text-sm font-semibold backdrop-blur transition group-hover:bg-white/25 sm:self-auto">
                          Explore
                          <Icon name="arrow" className="h-4 w-4 transition group-hover:translate-x-1" />
                        </span>
                      </div>
                    </Link>
                  </Reveal>
                );
              }

              return (
                <Reveal key={s.slug} delay={i * 60} className={`${m.span} h-full`}>
                  <Link
                    href={`/services/#${s.slug}`}
                    className={`group relative flex h-full flex-col overflow-hidden rounded-3xl border p-7 transition-all duration-300 hover:-translate-y-1.5 ${m.tile}`}
                  >
                    <span className="display pointer-events-none absolute right-5 top-4 select-none text-3xl text-ink-900/10">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className={`flex h-12 w-12 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110 ${m.icon}`}>
                      <Icon name={s.icon} className="h-6 w-6" />
                    </span>
                    <h3 className={`display mt-5 text-xl text-ink-900 transition sm:text-2xl ${m.title}`}>{s.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-600">{s.summary}</p>

                    {m.variant === 'feature' && (
                      <ul className="mt-5 space-y-2.5 text-sm text-ink-600">
                        {s.points.map((p) => (
                          <li key={p} className="flex items-start gap-2.5">
                            <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${m.dot}`} />
                            {p}
                          </li>
                        ))}
                      </ul>
                    )}

                    <span className={`mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-semibold ${m.link}`}>
                      Learn more
                      <Icon name="arrow" className="h-4 w-4 transition group-hover:translate-x-1" />
                    </span>
                  </Link>
                </Reveal>
              );
            })}
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
                  className="group flex h-full flex-col rounded-3xl border border-sun-200 bg-white p-8 shadow-[0_18px_45px_-28px_rgba(52,194,110,0.45)] transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-300 hover:shadow-[0_28px_60px_-26px_rgba(63,108,196,0.35)]"
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
                <div className="group h-full rounded-3xl border border-ink-100 bg-white p-8 transition-all duration-300 hover:-translate-y-1.5 hover:border-sun-300 hover:shadow-[0_28px_60px_-26px_rgba(52,194,110,0.4)]">
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
