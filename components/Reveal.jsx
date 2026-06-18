'use client';

import { useEffect, useRef } from 'react';

/**
 * Scroll-reveal wrapper. Fades/slides children in when they enter the viewport.
 * Fails safe: reveals immediately if already in view, if IntersectionObserver
 * is unavailable, or after a short fallback timeout — content never gets stuck.
 */
export default function Reveal({ children, delay = 0, className = '' }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === 'undefined') {
      el.classList.add('is-visible');
      return;
    }

    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      el.classList.add('is-visible');
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-visible');
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -8% 0px' }
    );
    observer.observe(el);

    const fallback = setTimeout(() => el.classList.add('is-visible'), 1800);

    return () => {
      observer.disconnect();
      clearTimeout(fallback);
    };
  }, []);

  return (
    <div ref={ref} className={`reveal ${className}`} style={delay ? { transitionDelay: `${delay}ms` } : undefined}>
      {children}
    </div>
  );
}
