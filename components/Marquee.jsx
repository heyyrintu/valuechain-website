/**
 * Seamless infinite ticker. Content is duplicated and the track slides exactly
 * -50% so the loop has no visible jump. GPU-accelerated via transform.
 */
export default function Marquee({ items, className = '', itemClassName = '' }) {
  const row = [...items, ...items];
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div className="flex w-max animate-marquee items-center will-change-transform">
        {row.map((item, i) => (
          <span key={i} className={`flex items-center whitespace-nowrap px-6 ${itemClassName}`}>
            {item}
            <span className="ml-12 opacity-50" aria-hidden="true">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
