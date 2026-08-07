// Drona Valuechain — logo lockup (swirl mark + wordmark)
export default function Logo({ className = 'h-11', showTagline = false }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      {/* Intrinsic dimensions are declared so the browser can reserve the box
          before the file loads. Without them the header reflows on every cold
          load, which shows up directly as Cumulative Layout Shift. */}
      <img
        src="/images/logo-mark.png"
        alt=""
        aria-hidden="true"
        width={512}
        height={512}
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
