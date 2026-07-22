import Link from 'next/link';
import Icon from './Icons';
import Reveal from './Reveal';
import CountUp from './CountUp';

export function PageHero({ eyebrow, title, intro, ghost }) {
  return (
    <section className="surface-cream relative overflow-hidden py-20 sm:py-28">
      <div className="grid-texture-light absolute inset-0" aria-hidden="true" />
      <div className="blob left-[-6rem] top-[-6rem] h-72 w-72 bg-sun-200/60" aria-hidden="true" />
      <div className="blob right-[-4rem] bottom-[-8rem] h-80 w-80 bg-brand-100/70" style={{ animationDelay: '-8s' }} aria-hidden="true" />
      {ghost && (
        <p
          className="display text-ghost-dark pointer-events-none absolute -right-6 top-1/2 hidden -translate-y-1/2 select-none whitespace-nowrap text-[11rem] leading-none lg:block"
          aria-hidden="true"
        >
          {ghost}
        </p>
      )}
      <div className="container-site relative">
        <Reveal className="max-w-3xl">
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          <h1 className="display mt-5 text-4xl leading-[1.05] text-ink-900 sm:text-6xl">{title}</h1>
          {intro && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-600">{intro}</p>}
        </Reveal>
      </div>
    </section>
  );
}

export function SectionHeading({ eyebrow, title, intro, center = false }) {
  return (
    <Reveal className={`max-w-3xl ${center ? 'mx-auto text-center' : ''}`}>
      {eyebrow && <p className={`eyebrow ${center ? 'justify-center' : ''}`}>{eyebrow}</p>}
      <h2 className="display mt-4 text-3xl text-ink-900 sm:text-5xl">{title}</h2>
      {intro && <p className="mt-5 text-lg leading-relaxed text-ink-600">{intro}</p>}
    </Reveal>
  );
}

export function ServiceCard({ service, index = 0, anchor = false }) {
  return (
    <Reveal delay={index * 80} className="h-full">
      <div
        id={anchor ? service.slug : undefined}
        className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-ink-100 bg-white p-8 transition-all duration-300 hover:-translate-y-1.5 hover:border-sun-300 hover:shadow-[0_28px_60px_-26px_rgba(63,108,196,0.3)]"
      >
        <span className="display text-ghost-sun pointer-events-none absolute -right-2 -top-6 select-none text-7xl">
          {String(index + 1).padStart(2, '0')}
        </span>
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-400 text-white shadow-lg shadow-brand-500/30 transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110">
          <Icon name={service.icon} className="h-7 w-7" />
        </span>
        <h3 className="display mt-6 text-xl text-ink-900">{service.title}</h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-600">{service.summary}</p>
        <ul className="mt-5 space-y-2.5 text-sm text-ink-600">
          {service.points.map((p) => (
            <li key={p} className="flex items-start gap-2.5">
              <span className="mt-1.5 h-1.5 w-4 shrink-0 rounded-full bg-sun-400" />
              {p}
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  );
}

export function CTABand({ title, text, buttonLabel = 'Talk to Our Team', href = '/contact/' }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-sun-300 via-sun-400 to-sun-300">
      <p
        className="display pointer-events-none absolute -bottom-10 left-0 select-none whitespace-nowrap text-[10rem] leading-none text-white/25"
        aria-hidden="true"
      >
        DRONA ✦ DRONA ✦ DRONA
      </p>
      <div className="blob right-10 top-[-4rem] h-56 w-56 bg-white/30" aria-hidden="true" />
      <div className="container-site relative flex flex-col items-start justify-between gap-8 py-16 sm:py-20 lg:flex-row lg:items-center">
        <Reveal>
          <h2 className="display max-w-2xl text-3xl text-ink-900 sm:text-4xl">{title}</h2>
          {text && <p className="mt-4 max-w-2xl text-ink-800">{text}</p>}
        </Reveal>
        <Reveal delay={120}>
          <Link
            href={href}
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-brand-500 px-8 py-4 text-sm font-bold text-white shadow-xl shadow-brand-600/30 transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-600"
          >
            {buttonLabel}
            <Icon name="arrow" className="h-4 w-4" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

export function StatStrip({ stats }) {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {stats.map((s, i) => (
        <Reveal key={s.label} delay={i * 90}>
          <div className="group rounded-3xl border border-ink-100 bg-white p-7 text-center shadow-[0_18px_40px_-26px_rgba(63,108,196,0.35)] transition-all duration-300 hover:-translate-y-1 hover:border-sun-300">
            <p className="display text-3xl text-brand-500 sm:text-4xl">
              <CountUp value={s.value} />
            </p>
            <p className="mt-2 text-sm text-ink-600">{s.label}</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
