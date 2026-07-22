'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { nav } from '../lib/site';
import Logo from './Logo';

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isActive = (href) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href.replace(/\/$/, ''));

  return (
    <header
      className={`sticky top-0 z-50 bg-white/90 backdrop-blur-md transition-shadow ${
        scrolled ? 'shadow-[0_1px_0_0_rgba(13,13,16,0.08),0_8px_30px_-12px_rgba(13,13,16,0.15)]' : ''
      }`}
    >
      <div className="container-site flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center" aria-label="Drona Valuechain — home" onClick={() => setOpen(false)}>
          <Logo className="h-10 sm:h-11" />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`group relative px-3.5 py-2 text-sm font-medium transition ${
                isActive(item.href) ? 'text-brand-500' : 'text-ink-900 hover:text-brand-500'
              }`}
            >
              {item.label}
              <span
                className={`absolute inset-x-3.5 -bottom-0.5 h-0.5 origin-left bg-sun-400 transition-transform duration-300 ${
                  isActive(item.href) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                }`}
              />
            </Link>
          ))}
          <Link href="/contact/" className="btn-primary ml-4 !px-6 !py-2.5">
            Get a Quote
          </Link>
        </nav>

        <button
          className="flex h-11 w-11 items-center justify-center rounded-full text-ink-900 hover:bg-ink-50 lg:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      {open && (
        <nav className="border-t border-ink-100 bg-white lg:hidden">
          <div className="container-site flex flex-col py-3">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`rounded-lg px-3 py-3.5 font-display text-base font-semibold ${
                  isActive(item.href) ? 'text-brand-500' : 'text-ink-900 hover:bg-ink-50'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link href="/contact/" onClick={() => setOpen(false)} className="btn-primary my-4">
              Get a Quote
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
