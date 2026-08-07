import Reveal from './Reveal';
import { SectionHeading } from './Sections';

/**
 * FAQ block.
 *
 * Deliberately rendered as native <details>/<summary> rather than a JS
 * accordion: the answer text is present in the HTML and readable without
 * scripting, which is what lets crawlers and answer engines extract it. A
 * client-side accordion that mounts answers on click would hide the exact
 * content this section exists to expose.
 *
 * Questions are <h3> so they sit correctly under the section <h2> — answer
 * engines lean on heading text to decide what a passage is answering.
 */
export default function FAQ({
  faqs,
  eyebrow = 'FAQ',
  title = 'Frequently Asked Questions',
  intro,
  className = 'section bg-ink-50',
}) {
  if (!faqs?.length) return null;

  return (
    <section className={className}>
      <div className="container-site">
        <SectionHeading eyebrow={eyebrow} title={title} intro={intro} />

        <div className="mt-12 max-w-3xl divide-y divide-ink-100 border-y border-ink-100">
          {faqs.map((faq, i) => (
            <Reveal key={faq.q} delay={i * 60}>
              <details className="group py-6" open={i === 0}>
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-left [&::-webkit-details-marker]:hidden">
                  <h3 className="font-display text-lg font-semibold leading-snug text-ink-900 transition-colors group-hover:text-brand-600">
                    {faq.q}
                  </h3>
                  <span
                    aria-hidden="true"
                    className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-ink-200 text-ink-500 transition-transform duration-300 group-open:rotate-45 group-hover:border-brand-400 group-hover:text-brand-500"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-ink-600">{faq.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
