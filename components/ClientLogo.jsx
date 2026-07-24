'use client';

import { useState } from 'react';

/**
 * Shows a client's real logo from a local file (src). If that file is missing
 * or fails to decode, it tries the optional `fallback` image once, and finally
 * degrades to the client's name as text — so the strip never shows a broken
 * image icon, even when no fallback file has been added yet.
 */
export default function ClientLogo({ name, src, fallback, className = 'max-h-12 w-auto' }) {
  const [current, setCurrent] = useState(src);
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <span className="text-center font-display text-sm font-bold leading-tight text-ink-500">
        {name}
      </span>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={current}
      alt={name}
      loading="lazy"
      onError={() => {
        if (fallback && current !== fallback) setCurrent(fallback);
        else setFailed(true);
      }}
      className={className}
    />
  );
}
