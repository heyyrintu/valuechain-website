import Link from 'next/link';
import { nav, site, services } from '../lib/site';
import Icon from './Icons';

export default function Footer() {
  return (
    <footer className="surface-cream relative overflow-hidden text-ink-700">
      <div className="grid-texture-light absolute inset-0" aria-hidden="true" />
      <div className="blob left-[-5rem] bottom-[-6rem] h-72 w-72 bg-sun-200/50" aria-hidden="true" />

      {/* Pre-footer CTA */}
      <div className="container-site relative border-b border-brand-100 py-16">
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <h2 className="display max-w-2xl text-3xl text-ink-900 sm:text-5xl">
            Let&apos;s move your business <span className="text-gradient">forward.</span>
          </h2>
          <Link href="/contact/" className="btn-primary shrink-0">
            Start a Conversation
            <Icon name="arrow" className="h-4 w-4" />
          </Link>
        </div>
      </div>

      <div className="container-site relative grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/logo.png" alt="Drona Logitech" className="h-12 w-auto" />
          <p className="mt-5 text-sm leading-relaxed text-ink-600">
            End-to-end supply chain solutions — in-plant services, warehousing,
            inventory, packaging and last-mile delivery under one roof.
          </p>
          <a
            href={site.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex h-10 w-10 items-center justify-center rounded-full border border-brand-200 text-brand-500 transition hover:bg-brand-500 hover:text-white"
            aria-label="LinkedIn"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
            </svg>
          </a>
        </div>

        <div>
          <h3 className="font-display text-sm font-bold uppercase tracking-widest text-ink-900">Explore</h3>
          <ul className="mt-5 space-y-2.5 text-sm">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-ink-600 transition hover:text-brand-500">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-bold uppercase tracking-widest text-ink-900">Services</h3>
          <ul className="mt-5 space-y-2.5 text-sm">
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={`/services/#${s.slug}`} className="text-ink-600 transition hover:text-brand-500">
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-bold uppercase tracking-widest text-ink-900">Contact</h3>
          <ul className="mt-5 space-y-3.5 text-sm text-ink-600">
            <li className="flex items-start gap-2.5">
              <Icon name="pin" className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" />
              {site.address.line1}, {site.address.country}
            </li>
            <li className="flex items-center gap-2.5">
              <Icon name="mail" className="h-4 w-4 shrink-0 text-brand-500" />
              <a href={`mailto:${site.email}`} className="transition hover:text-brand-500">{site.email}</a>
            </li>
            <li className="flex items-center gap-2.5">
              <Icon name="phone" className="h-4 w-4 shrink-0 text-brand-500" />
              <a href={`tel:${site.phone.replace(/\s/g, '')}`} className="transition hover:text-brand-500">{site.phone}</a>
            </li>
          </ul>
        </div>
      </div>

      {/* Giant ghost wordmark */}
      <div className="relative select-none overflow-hidden" aria-hidden="true">
        <p className="display text-ghost-dark -mb-[0.23em] whitespace-nowrap text-center text-[20vw] leading-none">
          DRONA
        </p>
      </div>

      <div className="relative border-t border-brand-100">
        <div className="container-site flex flex-col items-center justify-between gap-2 py-5 text-xs text-ink-500 sm:flex-row">
          <p>© {new Date().getFullYear()} {site.name} All rights reserved.</p>
          <p>CIN: U52109DL2023PTC417213</p>
        </div>
      </div>
    </footer>
  );
}
