import Link from 'next/link';
import { nav, site, services, hasPhone, formatAddress } from '../lib/site';
import Icon from './Icons';
import Logo from './Logo';

const socials = [
  {
    label: 'LinkedIn',
    href: site.linkedin,
    path: 'M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z',
  },
  {
    label: 'X',
    href: site.x,
    path: 'M18.9 1.15h3.68l-8.04 9.19L24 22.85h-7.41l-5.8-7.58-6.64 7.58H.47l8.6-9.83L0 1.15h7.59l5.24 6.93 6.07-6.93zm-1.29 19.5h2.04L6.49 3.24H4.3l13.31 17.41z',
  },
  {
    label: 'Instagram',
    href: site.instagram,
    path: 'M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16zm0 1.62c-3.15 0-3.52.01-4.76.07-1.15.05-1.77.24-2.19.41-.55.21-.94.47-1.35.88-.41.41-.67.8-.88 1.35-.16.42-.36 1.04-.41 2.19-.06 1.24-.07 1.61-.07 4.76s.01 3.52.07 4.76c.05 1.15.25 1.77.41 2.19.21.55.47.94.88 1.35.41.41.8.67 1.35.88.42.16 1.04.36 2.19.41 1.24.06 1.61.07 4.76.07s3.52-.01 4.76-.07c1.15-.05 1.77-.25 2.19-.41.55-.21.94-.47 1.35-.88.41-.41.67-.8.88-1.35.16-.42.36-1.04.41-2.19.06-1.24.07-1.61.07-4.76s-.01-3.52-.07-4.76c-.05-1.15-.25-1.77-.41-2.19a3.63 3.63 0 0 0-.88-1.35 3.63 3.63 0 0 0-1.35-.88c-.42-.16-1.04-.36-2.19-.41-1.24-.06-1.61-.07-4.76-.07zm0 2.76a5.46 5.46 0 1 0 0 10.92 5.46 5.46 0 0 0 0-10.92zm0 9a3.54 3.54 0 1 1 0-7.08 3.54 3.54 0 0 1 0 7.08zm5.68-9.21a1.27 1.27 0 1 1-2.55 0 1.27 1.27 0 0 1 2.55 0z',
  },
];

export default function Footer() {
  return (
    <footer className="surface-cream relative overflow-hidden text-ink-700">
      {/* slim brand accent — echoes the value-chain gradient */}
      <div className="h-1 w-full bg-gradient-to-r from-sun-400 via-brand-500 to-grape-500" aria-hidden="true" />
      <div className="grid-texture-light absolute inset-0" aria-hidden="true" />

      <div className="container-site relative grid gap-8 py-12 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.3fr] lg:gap-10">
        {/* Brand + CTA */}
        <div>
          <Logo className="h-11" showTagline />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-600">
            End-to-end supply chain solutions under one accountable, technology-driven partner.
          </p>
          <Link href="/contact/" className="btn-primary mt-5 !py-2.5 !text-xs">
            Start a Conversation
            <Icon name="arrow" className="h-4 w-4" />
          </Link>
          <div className="mt-5 flex items-center gap-2.5">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-brand-200 text-brand-500 transition hover:-translate-y-0.5 hover:border-brand-500 hover:bg-brand-500 hover:text-white"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                  <path d={s.path} />
                </svg>
              </a>
            ))}
          </div>
        </div>

        {/* Explore */}
        <div>
          <h3 className="font-display text-xs font-bold uppercase tracking-widest text-ink-900">Explore</h3>
          <ul className="mt-4 space-y-2 text-sm">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-ink-600 transition hover:text-brand-500">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="font-display text-xs font-bold uppercase tracking-widest text-ink-900">Services</h3>
          <ul className="mt-4 space-y-2 text-sm">
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}/`} className="text-ink-600 transition hover:text-brand-500">
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-display text-xs font-bold uppercase tracking-widest text-ink-900">Contact</h3>
          <ul className="mt-4 space-y-3 text-sm text-ink-600">
            <li className="flex items-start gap-2.5">
              <Icon name="pin" className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" />
              {formatAddress()}
            </li>
            <li className="flex items-center gap-2.5">
              <Icon name="mail" className="h-4 w-4 shrink-0 text-brand-500" />
              <a href={`mailto:${site.email}`} className="transition hover:text-brand-500">{site.email}</a>
            </li>
            {/* Rendered only once a real number is configured — see lib/site.js.
                A placeholder number published sitewide is worse than none. */}
            {hasPhone && (
              <li className="flex items-center gap-2.5">
                <Icon name="phone" className="h-4 w-4 shrink-0 text-brand-500" />
                <a href={`tel:${site.phone.replace(/\s/g, '')}`} className="transition hover:text-brand-500">{site.phone}</a>
              </li>
            )}
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative border-t border-brand-100">
        <div className="container-site flex flex-col items-center justify-between gap-2 py-4 text-xs text-ink-500 sm:flex-row">
          <p>© {new Date().getFullYear()} {site.name} · All rights reserved.</p>
          <p>CIN: U52109DL2023PTC417213</p>
        </div>
      </div>
    </footer>
  );
}
