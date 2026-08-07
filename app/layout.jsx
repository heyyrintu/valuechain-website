import './globals.css';
import { Inter, Space_Grotesk } from 'next/font/google';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { site } from '../lib/site';
import { graph, organizationSchema, websiteSchema, jsonLdProps, ogImage } from '../lib/seo';

// Self-hosted at build time by next/font. This replaces the two <link> tags to
// fonts.googleapis.com that previously sat in <head> — those cost two extra
// DNS + TLS round trips on the critical path before any text could paint.
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
});

export const metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.shortName} — Integrated Logistics & Supply Chain Solutions`,
    template: `%s | ${site.shortName}`,
  },
  description: site.description,
  applicationName: site.shortName,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  category: 'Logistics',
  keywords: site.knowsAbout,
  // max-image-preview:large is what allows a full-size thumbnail in Google
  // results and AI Overviews; max-snippet:-1 removes the snippet length cap so
  // answer engines may quote a full passage.
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    type: 'website',
    siteName: site.shortName,
    locale: 'en_IN',
    title: `${site.shortName} — Integrated Logistics & Supply Chain Solutions`,
    description: site.description,
    url: site.url,
    images: [ogImage],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${site.shortName} — Integrated Logistics & Supply Chain Solutions`,
    description: site.description,
    images: [ogImage.url],
  },
};

export const viewport = {
  themeColor: '#3f6cc4',
  width: 'device-width',
  initialScale: 1,
};

// One graph for the whole site. Page-level schema (Service, FAQPage,
// BreadcrumbList, BlogPosting) references these @ids rather than restating the
// organisation, so every fact resolves to a single entity.
const siteGraph = graph(organizationSchema(), websiteSchema());

export default function RootLayout({ children }) {
  return (
    <html lang="en-IN" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="flex min-h-screen flex-col bg-white">
        <script {...jsonLdProps(siteGraph)} />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-brand-500 focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
