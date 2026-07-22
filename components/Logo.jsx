// Drona Valuechain — logo lockup (swirl mark + wordmark)
export default function Logo({ className = 'h-11', showTagline = false }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/logo-mark.svg"
        alt=""
        aria-hidden="true"
        className={`${className} w-auto`}
      />
      <span className="flex flex-col justify-center leading-none">
        <span className="font-display text-lg font-bold tracking-tight text-ink-900 sm:text-xl">
          Drona <span className="text-gradient">Valuechain</span>
        </span>
        {showTagline && (
          <span className="mt-1 text-[11px] font-semibold italic text-brand-500">
            Empowering People
          </span>
        )}
      </span>
    </span>
  );
}
