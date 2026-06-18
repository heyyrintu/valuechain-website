'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Animated counter. Parses a leading number from `value` (e.g. "100+" → 100)
 * and counts up when scrolled into view. Non-numeric values render as-is.
 */
export default function CountUp({ value, duration = 1600, className = '' }) {
  const match = /^(\d+)(.*)$/.exec(String(value));
  const target = match ? parseInt(match[1], 10) : null;
  const suffix = match ? match[2] : '';
  const [display, setDisplay] = useState(target !== null ? 0 : value);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    if (target === null) return;
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return;
        started.current = true;
        const t0 = performance.now();
        const tick = (now) => {
          const p = Math.min((now - t0) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          setDisplay(Math.round(eased * target));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        observer.disconnect();
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
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
