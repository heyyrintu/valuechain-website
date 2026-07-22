'use client';

import { useState } from 'react';

/**
 * Shows a client's real logo from a local file (src). If that file isn't
 * present yet, it falls back to the bundled styled recreation (fallback),
 * so the logo strip never shows a broken image.
 */
export default function ClientLogo({ name, src, fallback, className = 'max-h-12 w-auto' }) {
  const [current, setCurrent] = useState(src);

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={current}
      alt={name}
      loading="lazy"
      onError={() => {
        if (fallback && current !== fallback) setCurrent(fallback);
      }}
      className={className}
    />
  );
}
