// ── SEO / AEO helpers ──
//
// Two jobs live here:
//
//  1. Canonical URLs. Next only emits <link rel="canonical"> when a page sets
//     `alternates.canonical`, so every page calls `canonical()` explicitly.
//     Paths keep their trailing slash to match next.config.mjs `trailingSlash`.
//
//  2. Structured data. Everything is linked by @id into one graph rather than
//     emitted as loose, unrelated blocks. That matters for answer engines:
//     a Service node pointing at the same Organization @id as every other page
//     tells a retrieval system these are facts about one entity, not six.

import { site, services, hasPhone, hasStreetAddress } from './site';

export const ORG_ID = `${site.url}/#organization`;
export const WEBSITE_ID = `${site.url}/#website`;

/** Absolute URL for a site-relative path. */
export function abs(path = '/') {
  return `${site.url}${path.startsWith('/') ? path : `/${path}`}`;
}

/**
 * Canonical metadata fragment. Spread into a page's `metadata` export:
 *   export const metadata = { title: 'X', ...canonical('/x/') }
 */
export function canonical(path = '/') {
  return { alternates: { canonical: abs(path) } };
}

/** PostalAddress, omitting parts that are still unconfirmed. */
function postalAddress() {
  const address = {
    '@type': 'PostalAddress',
    addressLocality: site.address.city,
    addressRegion: site.address.state,
    addressCountry: site.address.countryCode,
  };
  if (hasStreetAddress) address.streetAddress = site.address.street;
  if (site.address.postalCode) address.postalCode = site.address.postalCode;
  return address;
}

/**
 * The root entity. Typed as both Organization and LocalBusiness so it can carry
 * local signals (address, hours) while still reading as a company.
 *
 * `telephone` is emitted only once a real number exists — see lib/site.js.
 */
export function organizationSchema() {
  const org = {
    '@type': ['Organization', 'LocalBusiness'],
    '@id': ORG_ID,
    name: site.name,
    legalName: site.legalName,
    alternateName: site.shortName,
    url: site.url,
    description: site.shortDescription,
    slogan: site.tagline,
    email: site.email,
    logo: {
      '@type': 'ImageObject',
      url: abs('/images/logo.png'),
      caption: `${site.shortName} logo`,
    },
    image: abs('/images/logo.png'),
    foundingDate: String(site.founded),
    address: postalAddress(),
    areaServed: { '@type': 'Country', name: site.areaServed },
    knowsAbout: site.knowsAbout,
    identifier: { '@type': 'PropertyValue', propertyID: 'CIN', value: site.cin },
    sameAs: [site.linkedin, site.x, site.instagram].filter(Boolean),

    // Every service line, expressed as an offer of the organization. This is
    // the block that lets a model answer "what does Drona Valuechain offer?".
    makesOffer: services.map((s) => ({
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        '@id': abs(`/services/${s.slug}/#service`),
        name: s.title,
        description: s.summary,
        url: abs(`/services/${s.slug}/`),
      },
    })),
  };

  if (hasPhone) org.telephone = site.phone;

  return org;
}

export function websiteSchema() {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: site.url,
    name: site.shortName,
    description: site.shortDescription,
    inLanguage: 'en-IN',
    publisher: { '@id': ORG_ID },
  };
}

/**
 * BreadcrumbList. `trail` is an ordered array of { name, path }, excluding the
 * home node which is prepended automatically.
 */
export function breadcrumbSchema(trail = []) {
  const items = [{ name: 'Home', path: '/' }, ...trail];
  return {
    '@type': 'BreadcrumbList',
    '@id': `${abs(items[items.length - 1].path)}#breadcrumb`,
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: abs(item.path),
    })),
  };
}

/**
 * FAQPage. Only call this when the answers are genuinely present in the page's
 * visible content — schema that describes content a user cannot see is a
 * structured-data violation, not a shortcut.
 */
export function faqSchema(faqs, path) {
  return {
    '@type': 'FAQPage',
    '@id': `${abs(path)}#faq`,
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

export function serviceSchema(service) {
  return {
    '@type': 'Service',
    '@id': abs(`/services/${service.slug}/#service`),
    name: service.title,
    description: service.metaDescription,
    serviceType: service.title,
    url: abs(`/services/${service.slug}/`),
    provider: { '@id': ORG_ID },
    areaServed: { '@type': 'Country', name: site.areaServed },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `${service.title} deliverables`,
      itemListElement: service.deliverables.map((d) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: d },
      })),
    },
  };
}

export function blogPostingSchema(post, path) {
  return {
    '@type': 'BlogPosting',
    '@id': `${abs(path)}#article`,
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: 'en-IN',
    url: abs(path),
    mainEntityOfPage: { '@type': 'WebPage', '@id': abs(path) },
    author: { '@type': 'Organization', '@id': ORG_ID, name: post.author },
    publisher: { '@id': ORG_ID },
    image: abs('/images/logo.png'),
    articleSection: post.tag,
  };
}

/** Wraps nodes into a single @graph document. */
export function graph(...nodes) {
  return {
    '@context': 'https://schema.org',
    '@graph': nodes.filter(Boolean),
  };
}

/**
 * Serialises JSON-LD for injection into a <script> tag.
 *
 * The payload is entirely build-time, developer-authored data from lib/site.js
 * — never user input — so this is not an injection sink. `<` is still escaped
 * as a defence in depth: a literal "</script>" appearing inside any string
 * would otherwise close the tag early and break the document.
 */
export function jsonLdProps(data) {
  return {
    type: 'application/ld+json',
    dangerouslySetInnerHTML: { __html: JSON.stringify(data).replace(/</g, '\\u003c') },
  };
}

/**
 * Shared Open Graph / Twitter card image.
 *
 * A committed static asset rather than Next's app/opengraph-image.jsx file
 * convention: that route depends on @vercel/og, which throws "Invalid URL" when
 * the project path contains spaces and fails the export. Regenerate with
 * `scripts/generate-og-image.ps1` if the branding changes.
 */
export const ogImage = {
  url: '/images/og-default.png',
  width: 1200,
  height: 630,
  alt: `${site.shortName} — ${site.tagline}`,
};

/**
 * Standard metadata for a page: title, description, canonical, and OG/Twitter
 * entries carrying the shared card image.
 */
export function pageMeta({ title, description, path }) {
  return {
    title,
    description,
    ...canonical(path),
    openGraph: {
      title,
      description,
      url: abs(path),
      type: 'website',
      images: [ogImage],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage.url],
    },
  };
}
