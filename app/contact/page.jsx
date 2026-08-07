import { site, hasPhone, formatAddress } from '../../lib/site';
import { pageMeta, graph, breadcrumbSchema, jsonLdProps, abs, ORG_ID } from '../../lib/seo';
import { PageHero } from '../../components/Sections';
import Icon from '../../components/Icons';
import ContactForm from '../../components/ContactForm';

export const metadata = pageMeta({
  title: 'Contact Us',
  description: `Get in touch with ${site.shortName} for logistics and supply chain inquiries. Headquartered in ${site.address.city}, ${site.address.country}.`,
  path: '/contact/',
});

const contactSchema = graph(
  {
    '@type': 'ContactPage',
    '@id': `${abs('/contact/')}#webpage`,
    url: abs('/contact/'),
    name: `Contact ${site.shortName}`,
    description: `Contact details and enquiry form for ${site.name}.`,
    mainEntity: { '@id': ORG_ID },
  },
  breadcrumbSchema([{ name: 'Contact', path: '/contact/' }])
);

export default function ContactPage() {
  return (
    <>
      <script {...jsonLdProps(contactSchema)} />
      <PageHero
        ghost="CONTACT" eyebrow="Contact"
        title="Let's Talk Logistics"
        intro="Tell us about your operation — volumes, locations, pain points — and we'll come back with a practical proposal."
      />

      <section className="section">
        <div className="container-site grid gap-12 lg:grid-cols-5">
          <div className="space-y-6 lg:col-span-2">
            <div className="flex items-start gap-4 rounded-xl border border-navy-100 p-6">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-navy-50 text-navy-700">
                <Icon name="pin" className="h-5 w-5" />
              </span>
              <div>
                <h3 className="font-semibold text-navy-900">Head Office</h3>
                <p className="mt-1 text-sm text-slate-600">
                  {formatAddress()}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 rounded-xl border border-navy-100 p-6">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-navy-50 text-navy-700">
                <Icon name="mail" className="h-5 w-5" />
              </span>
              <div>
                <h3 className="font-semibold text-navy-900">Email</h3>
                <a href={`mailto:${site.email}`} className="mt-1 block text-sm text-accent-600 hover:underline">
                  {site.email}
                </a>
              </div>
            </div>
            {hasPhone && (
              <div className="flex items-start gap-4 rounded-xl border border-navy-100 p-6">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-navy-50 text-navy-700">
                  <Icon name="phone" className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-semibold text-navy-900">Phone</h3>
                  <a
                    href={`tel:${site.phone.replace(/\s/g, '')}`}
                    className="mt-1 block text-sm text-accent-600 hover:underline"
                  >
                    {site.phone}
                  </a>
                </div>
              </div>
            )}
            <div className="rounded-3xl bg-gradient-to-br from-brand-500 to-brand-400 p-6 text-white shadow-xl shadow-brand-500/25">
              <h3 className="font-semibold">Business Hours</h3>
              <p className="mt-1 text-sm text-brand-50">
                Operations: 24/7 &nbsp;·&nbsp; Office: Mon–Sat, 9:00–18:00 IST
              </p>
            </div>
          </div>

          <div className="lg:col-span-3">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
