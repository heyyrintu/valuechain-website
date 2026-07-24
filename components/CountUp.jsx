'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Animated counter — progressive enhancement only.
 *
 * The real value is what renders on the server and on first paint, so crawlers,
 * no-JS visitors and reduced-motion users always read the true figure. The
 * count-up is layered on top once we know we can finish it, and can never leave
 * the number stuck at 0.
 *
 * Only a plain quantity is animated: "20+" and "100+" count, while "24/7" and
 * "Pan-India" render verbatim (counting "24/7" would flash a false "0/7").
 */
export default function CountUp({ value, duration = 1600, className = '' }) {
  const match = /^(\d+)(.*)$/.exec(String(value));
  const suffix = match ? match[2] : '';
  // A digit in the suffix means the number isn't a standalone quantity
  // (e.g. "24/7") — show it as-is rather than counting it.
  const target = match && !/\d/.test(suffix) ? parseInt(match[1], 10) : null;

  // Start at the true value: SSR output and first paint are always correct.
  const [display, setDisplay] = useState(target);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    if (target === null) return;
    const el = ref.current;
    if (!el) return;

    const reduceMotion =
      typeof matchMedia !== 'undefined' &&
      matchMedia('(prefers-reduced-motion: reduce)').matches;

    // No animation available or wanted — leave the true value in place.
    if (reduceMotion || typeof IntersectionObserver === 'undefined') return;

    const run = () => {
      if (started.current) return;
      started.current = true;
      const t0 = performance.now();
      const tick = (now) => {
        const p = Math.min((now - t0) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        setDisplay(Math.round(eased * target));
        if (p < 1) requestAnimationFrame(tick);
        else setDisplay(target); // always land exactly on the real number
      };
      requestAnimationFrame(tick);
    };

    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      run();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        run();
      },
      { threshold: 0.4 }
    );
    observer.observe(el);

    // Fail-safe: if the observer never fires, the true value is already shown.
    const fallback = setTimeout(() => observer.disconnect(), 4000);

    return () => {
      observer.disconnect();
      clearTimeout(fallback);
    };
  }, [target, duration]);

  return (
    <span ref={ref} className={className}>
      {target !== null ? (
        <>
          {display}
          {suffix}
        </>
      ) : (
        value
      )}
    </span>
  );
}
