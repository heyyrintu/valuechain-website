import './globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { site } from '../lib/site';

export const metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.shortName} — Integrated Logistics & Supply Chain Solutions`,
    template: `%s | ${site.shortName}`,
  },
  description: site.description,
  openGraph: {
    type: 'website',
    siteName: site.shortName,
    title: `${site.shortName} — Integrated Logistics & Supply Chain Solutions`,
    description: site.description,
    url: site.url,
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: site.name,
  url: site.url,
  email: site.email,
  logo: `${site.url}/images/logo.png`,
  foundingDate: String(site.founded),
  address: {
    '@type': 'PostalAddress',
    addressLocality: site.address.city,
    addressRegion: site.address.state,
    addressCountry: 'IN',
  },
  sameAs: [site.linkedin],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="flex min-h-screen flex-col bg-white">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
