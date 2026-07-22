import Icon from './Icons';

// ── Signature hero visual: the value chain, alive ──
// Five linked stages on one continuous spine — a packet flows top → bottom,
// lighting each link as it passes. Embodies the brand promise: every link of
// the chain, one accountable partner. Pure CSS/SVG, no JS, static-export safe.

const stages = [
  { icon: 'factory', name: 'In-Plant', role: 'Material flow & line feeding', metric: 'Live' },
  { icon: 'warehouse', name: 'Warehousing', role: 'Receive · store · dispatch', metric: '12 sites' },
  { icon: 'inventory', name: 'Inventory', role: 'Real-time accuracy', metric: '99.9%' },
  { icon: 'package', name: 'Packaging', role: 'Protect · label · palletise', metric: 'Ready' },
  { icon: 'truck', name: 'Last-Mile', role: 'Pan-India delivery', metric: 'On time' },
];

export default function HeroChain() {
  return (
    <div className="relative mx-auto w-full max-w-[30rem]">
      {/* eyebrow rail labels */}
      <div className="mb-5 flex items-center justify-between text-[11px] font-bold uppercase tracking-[0.2em] text-ink-400">
        <span className="inline-flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-sun-500" />
          Goods in
        </span>
        <span className="text-ink-300">one continuous chain</span>
      </div>

      <div className="relative">
        {/* the spine */}
        <div className="chain-spine absolute bottom-7 top-7 w-[3px] -translate-x-1/2 rounded-full" style={{ left: '1.75rem' }} aria-hidden="true" />
        {/* travelling packet */}
        <span className="chain-packet absolute z-20 -translate-x-1/2 -translate-y-1/2" style={{ left: '1.75rem' }} aria-hidden="true">
          <span className="block h-3.5 w-3.5 rounded-full bg-white shadow-[0_0_0_4px_rgba(63,108,196,0.25),0_0_18px_4px_rgba(52,194,110,0.55)]" />
        </span>

        <ul className="relative flex flex-col gap-4">
          {stages.map((s, i) => (
            <li
              key={s.name}
              className="stage-row group relative flex items-center gap-4"
              style={{ '--i': i }}
            >
              {/* node = icon chip sitting on the spine */}
              <span className="stage-node relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-sun-400 via-brand-500 to-grape-600 text-white shadow-lg shadow-brand-500/25">
                <Icon name={s.icon} className="h-6 w-6" />
              </span>

              {/* link card */}
              <div className="stage-card flex flex-1 items-center justify-between gap-3 rounded-2xl border border-ink-100 bg-white/85 px-4 py-3 shadow-[0_14px_40px_-30px_rgba(33,53,90,0.6)] backdrop-blur transition-colors duration-300">
                <div className="min-w-0">
                  <p className="font-display text-sm font-bold leading-none text-ink-900">{s.name}</p>
                  <p className="mt-1.5 truncate text-xs text-ink-500">{s.role}</p>
                </div>
                <span className="shrink-0 rounded-full bg-ink-50 px-2.5 py-1 text-[11px] font-semibold text-ink-600">
                  {s.metric}
                </span>
              </div>
            </li>
          ))}
        </ul>

        {/* delivered proof badge — overlaps bottom-right */}
        <div className="animate-float absolute -bottom-6 -right-3 z-20 rounded-2xl bg-gradient-to-br from-sun-500 via-brand-500 to-grape-600 p-[1.5px] shadow-2xl shadow-brand-500/25">
          <div className="flex items-center gap-3 rounded-[15px] bg-white/95 px-4 py-3 backdrop-blur">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-sun-400 via-brand-500 to-grape-600 text-white">
              <Icon name="shield" className="h-5 w-5" />
            </span>
            <div>
              <p className="font-display text-lg font-bold leading-none text-ink-900">99.4%</p>
              <p className="mt-1 text-[11px] text-ink-500">On-time delivery</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-end text-[11px] font-bold uppercase tracking-[0.2em] text-ink-400">
        <span className="inline-flex items-center gap-2">
          Delivered
          <span className="h-2 w-2 rounded-full bg-grape-500" />
        </span>
      </div>
    </div>
  );
}
