import { services } from '../lib/site';
import Icon from './Icons';

// ── Horizontal echo of the hero value-chain ──
// The six services as one connected thread — a packet flows left → right,
// lighting each link. Reinforces "every link of the chain, one partner."
// The connecting spine shows on lg+; mobile gets a clean wrapped node row.

export default function ChainRail() {
  return (
    <div className="relative">
      <div className="mb-6 flex items-center justify-between text-[11px] font-bold uppercase tracking-[0.2em] text-ink-400">
        <span className="inline-flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-sun-500" />
          One partner
        </span>
        <span className="inline-flex items-center gap-2">
          End to end
          <span className="h-2 w-2 rounded-full bg-grape-500" />
        </span>
      </div>

      <div className="relative">
        {/* connecting spine + packet — desktop only */}
        <div className="pointer-events-none absolute inset-x-7 top-7 hidden lg:block" aria-hidden="true">
          <div className="chain-rail relative h-[3px] -translate-y-1/2 rounded-full">
            <span className="chain-packet-x absolute top-1/2 -translate-x-1/2 -translate-y-1/2">
              <span className="block h-3.5 w-3.5 rounded-full bg-white shadow-[0_0_0_4px_rgba(63,108,196,0.25),0_0_18px_4px_rgba(52,194,110,0.55)]" />
            </span>
          </div>
        </div>

        <ul className="relative grid grid-cols-3 gap-y-7 sm:grid-cols-6">
          {services.map((s, i) => (
            <li key={s.slug} className="flex flex-col items-center text-center" style={{ '--i': i }}>
              <span className="rail-node flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-sun-400 via-brand-500 to-grape-600 text-white shadow-lg shadow-brand-500/25">
                <Icon name={s.icon} className="h-6 w-6" />
              </span>
              <span className="mt-3 max-w-[7rem] font-display text-xs font-bold leading-tight text-ink-700">
                {s.title}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
