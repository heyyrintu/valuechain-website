// Builds the static site from site/ into out/.
//
// site/ holds the design-approved HTML exactly as delivered. This script never
// changes the visual design; it only:
//   - maps each page to a clean, trailing-slash URL (about.html -> /about/)
//   - rewrites internal links and asset paths to absolute ones
//   - replaces <head> with full SEO / social / AI metadata and JSON-LD
//   - adds a <main> landmark, lazy-loads below-the-fold images, wires the form
//   - writes sitemap.xml, robots.txt, llms.txt, llms-full.txt, manifest, 404
//
// No dependencies: `node scripts/build.mjs`.

import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { site, pages, faqs } from './site.config.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const src = join(root, 'site');
const out = join(root, 'out');
const today = new Date().toISOString().slice(0, 10);

rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });
cpSync(join(src, 'assets'), join(out, 'assets'), { recursive: true });

// ── Performance helpers ────────────────────────────────────────────────────
// Self-hosted fonts and the stylesheet are inlined into every page, so the
// first paint needs no extra requests (no render-blocking CSS, no font chain
// through fonts.googleapis.com and fonts.gstatic.com).
const fontFaces = [
  ['Bricolage Grotesque', 'normal', '200 800', 'bricolage-grotesque'],
  ['Instrument Serif', 'italic', '400', 'instrument-serif-italic'],
  ['Geist', 'normal', '100 900', 'geist'],
  ['Geist Mono', 'normal', '500', 'geist-mono-500'],
].map(([family, style, weight, file]) =>
  `@font-face{font-family:'${family}';font-style:${style};font-weight:${weight};font-display:swap;src:url(/assets/fonts/${file}.woff2) format('woff2')}`,
).join('');
const inlineCss = fontFaces + readFileSync(join(src, 'assets/css/site.css'), 'utf8').replace(/\n\s+/g, '\n');

// Intrinsic size of a PNG or WebP, read from the file header, so every <img>
// gets width/height attributes and the browser can reserve its space.
const sizeCache = new Map();
function imageSize(rel) {
  if (sizeCache.has(rel)) return sizeCache.get(rel);
  const file = join(src, rel);
  let size = null;
  if (existsSync(file)) {
    const b = readFileSync(file);
    if (b.toString('ascii', 1, 4) === 'PNG') size = [b.readUInt32BE(16), b.readUInt32BE(20)];
    else if (b.toString('ascii', 8, 12) === 'WEBP') {
      const chunk = b.toString('ascii', 12, 16);
      if (chunk === 'VP8X') size = [1 + b.readUIntLE(24, 3), 1 + b.readUIntLE(27, 3)];
      else if (chunk === 'VP8 ') size = [b.readUInt16LE(26) & 0x3fff, b.readUInt16LE(28) & 0x3fff];
      else if (chunk === 'VP8L') { const v = b.readUInt32LE(21); size = [1 + (v & 0x3fff), 1 + ((v >> 14) & 0x3fff)]; }
    }
  }
  sizeCache.set(rel, size);
  return size;
}

// Adds width/height, a responsive srcset for illustrations that have an
// -800 variant, and loading hints: the nav logo and the first illustration in
// the hero load eagerly (the illustration with high priority), the rest lazily.
function optimiseImages(html) {
  const heroEnd = html.indexOf('</section>');
  let heroDone = false;
  return html.replace(/<img ([^>]*?)src="\/(assets\/[^"]+)"([^>]*)>/g, (m, pre, rel, post, offset) => {
    let attrs = `${pre}src="/${rel}"${post}`;
    const size = imageSize(rel);
    if (size && !/\bwidth=/.test(attrs)) attrs += ` width="${size[0]}" height="${size[1]}"`;
    const small = rel.replace(/\.webp$/, '-800.webp');
    if (small !== rel && existsSync(join(src, small)) && size) {
      attrs += ` srcset="/${small} 800w, /${rel} ${size[0]}w" sizes="(max-width: 900px) 92vw, 640px"`;
    }
    const isHero = rel.startsWith('assets/img/') && offset < heroEnd && !heroDone;
    if (isHero) heroDone = true;
    const eager = isHero || (rel.includes('logo-symbol') && offset < heroEnd);
    attrs += eager ? ` decoding="async"${isHero ? ' fetchpriority="high"' : ''}` : ' loading="lazy" decoding="async"';
    return `<img ${attrs}>`;
  });
}

const routeOf = Object.fromEntries(pages.map((p) => [p.file, p.path]));
const abs = (path) => site.url + path;
const esc = (s) =>
  s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// ── Structured data ────────────────────────────────────────────────────────
const orgId = `${site.url}/#organization`;
const webId = `${site.url}/#website`;

const organization = {
  '@type': ['Organization', 'LocalBusiness'],
  '@id': orgId,
  name: site.name,
  legalName: site.legalName,
  alternateName: ['DVPL', 'Drona Valuechain'],
  url: site.url + '/',
  logo: { '@type': 'ImageObject', url: abs('/assets/brand/logo-full.png'), width: 951, height: 739 },
  image: abs('/assets/brand/og-image.png'),
  description: site.description,
  email: site.email,
  telephone: site.phone,
  identifier: { '@type': 'PropertyValue', propertyID: 'CIN', value: site.cin },
  foundingDate: site.foundingDate,
  founder: site.founders.map((f) => ({ '@type': 'Person', name: f.name, jobTitle: f.role })),
  address: {
    '@type': 'PostalAddress',
    streetAddress: site.address.street,
    addressLocality: site.address.locality,
    addressRegion: site.address.region,
    postalCode: site.address.postalCode,
    addressCountry: 'IN',
  },
  geo: { '@type': 'GeoCoordinates', latitude: site.geo.lat, longitude: site.geo.lng },
  areaServed: { '@type': 'Country', name: 'India' },
  priceRange: 'On request',
  knowsAbout: site.knowsAbout,
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'sales',
    email: site.email,
    telephone: site.phone,
    areaServed: 'IN',
    availableLanguage: ['English', 'Hindi'],
  },
  sameAs: site.sameAs,
};

const website = {
  '@type': 'WebSite',
  '@id': webId,
  url: site.url + '/',
  name: site.name,
  description: site.description,
  publisher: { '@id': orgId },
  inLanguage: 'en-IN',
};

function graphFor(page) {
  const url = abs(page.path);
  const nodes = [organization, website];
  nodes.push({
    '@type': page.schemaType || 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name: page.title,
    description: page.description,
    isPartOf: { '@id': webId },
    about: { '@id': orgId },
    inLanguage: 'en-IN',
    dateModified: today,
    primaryImageOfPage: abs(page.image || '/assets/brand/og-image.png'),
    // Points answer engines and voice assistants at the summary copy.
    speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', 'h1 + p', '.g-read'] },
    ...(page.path !== '/' && { breadcrumb: { '@id': `${url}#breadcrumb` } }),
  });
  if (page.path !== '/') {
    const trail = [{ name: 'Home', path: '/' }, ...(page.parents || []), { name: page.name, path: page.path }];
    nodes.push({
      '@type': 'BreadcrumbList',
      '@id': `${url}#breadcrumb`,
      itemListElement: trail.map((t, i) => ({ '@type': 'ListItem', position: i + 1, name: t.name, item: abs(t.path) })),
    });
  }
  for (const s of page.services || []) {
    nodes.push({
      '@type': 'Service',
      name: s.name,
      serviceType: s.name,
      description: s.description,
      provider: { '@id': orgId },
      areaServed: { '@type': 'Country', name: 'India' },
      url: abs(s.path || page.path),
    });
  }
  const qa = faqs[page.file];
  if (qa) {
    nodes.push({
      '@type': 'FAQPage',
      '@id': `${url}#faq`,
      mainEntity: qa.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
    });
  }
  return JSON.stringify({ '@context': 'https://schema.org', '@graph': nodes }).replace(/</g, '\\u003c');
}

function head(page) {
  const url = abs(page.path);
  const img = abs(page.image || '/assets/brand/og-image.png');
  return `<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(page.title)}</title>
<meta name="description" content="${esc(page.description)}">
<meta name="robots" content="${page.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'}">
${page.noindex ? '' : `<link rel="canonical" href="${url}">\n<link rel="alternate" hreflang="en-IN" href="${url}">\n<link rel="alternate" hreflang="x-default" href="${url}">\n`}<meta name="author" content="${site.legalName}">
<meta name="theme-color" content="#062b2e">
<meta name="format-detection" content="telephone=no">
<meta name="geo.region" content="IN-HR">
<meta name="geo.placename" content="Gurugram">
<meta name="geo.position" content="${site.geo.lat};${site.geo.lng}">
<meta name="ICBM" content="${site.geo.lat}, ${site.geo.lng}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${site.name}">
<meta property="og:locale" content="en_IN">
<meta property="og:title" content="${esc(page.title)}">
<meta property="og:description" content="${esc(page.description)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${img}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="${site.name}: integrated logistics clusters for OEMs">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(page.title)}">
<meta name="twitter:description" content="${esc(page.description)}">
<meta name="twitter:image" content="${img}">
<link rel="icon" type="image/png" href="/assets/brand/favicon.png">
<link rel="apple-touch-icon" href="/assets/brand/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<link rel="alternate" type="text/plain" title="LLM summary" href="/llms.txt">
<link rel="sitemap" type="application/xml" href="/sitemap.xml">
<link rel="preload" href="/assets/fonts/bricolage-grotesque.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/assets/fonts/geist.woff2" as="font" type="font/woff2" crossorigin>
<style>${inlineCss}</style>
<script type="application/ld+json">${graphFor(page)}</script>
</head>`;
}

// ── Contact form ───────────────────────────────────────────────────────────
// Posts to Web3Forms using FORM_ACCESS_KEY (build-time env) or
// site.formAccessKey in site.config.mjs. Web3Forms access keys are public by
// design: they only allow sending to the inbox they were created for. With no
// key, the form falls back to opening the visitor's mail client.
const formKey = process.env.FORM_ACCESS_KEY || site.formAccessKey || '';
const formScript = `<script>
(function(){
  var f=document.getElementById('contact-form'); if(!f) return;
  var KEY=${JSON.stringify(formKey)};
  var st=document.getElementById('form-status');
  function say(t){ st.textContent=t; st.hidden=false; st.style.display="block"; }
  f.addEventListener('submit',function(e){
    e.preventDefault();
    if(!f.reportValidity()) return;
    var d=Object.fromEntries(new FormData(f));
    if(d.botcheck) return;
    var body='Name: '+d.name+'\\nCompany: '+(d.company||'')+'\\nEmail: '+d.email+'\\nPhone: '+(d.phone||'')+'\\nInterest: '+d.interest+'\\n\\n'+(d.message||'');
    if(!KEY){ location.href='mailto:${site.email}?subject='+encodeURIComponent('Enquiry: '+d.interest)+'&body='+encodeURIComponent(body); say('Your email app should open with the message ready to send.'); return; }
    var b=f.querySelector('button[type=submit]'); b.disabled=true; say('Sending...');
    fetch('https://api.web3forms.com/submit',{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},body:JSON.stringify(Object.assign({access_key:KEY,subject:'Website enquiry: '+d.interest+' ('+(d.company||d.name)+')',from_name:'dronavaluechain.com',replyto:d.email},d))})
      .then(function(r){return r.json();})
      .then(function(r){ if(!r.success) throw 0; f.reset(); say('Thank you. We have your message and will reply within one working day.'); })
      .catch(function(){ say('Something went wrong. Please email ${site.email}.'); })
      .finally(function(){ b.disabled=false; });
  });
})();
</script>`;

// SVG <animateMotion> ignores the CSS reduced-motion rule, so pause every
// inline SVG while the visitor asks for reduced motion, and resume if the
// preference is turned off.
const motionScript = `<script>
(function(){
  var mq=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)'); if(!mq) return;
  function apply(){ document.querySelectorAll('svg').forEach(function(s){ if(s.pauseAnimations){ mq.matches?s.pauseAnimations():s.unpauseAnimations(); } }); }
  apply(); (mq.addEventListener?mq.addEventListener('change',apply):mq.addListener(apply));
})();
</script>`;

function wireForm(html) {
  const names = { 'g-name': 'name', 'g-company': 'company', 'g-email': 'email', 'g-phone': 'phone', 'g-interest': 'interest', 'g-msg': 'message' };
  const required = new Set(['g-name', 'g-email', 'g-interest']);
  html = html.replace('<form onsubmit="return false"', '<form id="contact-form" novalidate');
  for (const [id, name] of Object.entries(names)) {
    html = html.replace(`id="${id}"`, `id="${id}" name="${name}"${required.has(id) ? ' required' : ''}`);
  }
  // Honeypot: hidden from people, filled by bots; Web3Forms also rejects it.
  html = html.replace(/<form id="contact-form"[^>]*>/, '$&<input type="checkbox" name="botcheck" tabindex="-1" autocomplete="off" aria-hidden="true" style="display: none">');
  html = html.replace(
    'We use these details only to reply to you.</span>',
    'We use these details only to reply to you.<span id="form-status" role="status" aria-live="polite" hidden style="margin-top: 6px; font-weight: 600; color: #087b84"></span></span>',
  );
  return html.replace('</body>', `${formScript}\n</body>`);
}

// ── Page transform ─────────────────────────────────────────────────────────
function transform(html, page) {
  html = html.replace(/<head>[\s\S]*?<\/head>/, head(page));
  html = html.replace('<html lang="en">', '<html lang="en-IN">');
  // Links: about.html -> /about/, keeping any #fragment.
  html = html.replace(/href="([a-z0-9-]+)\.html(#[^"]*)?"/g, (m, f, hash = '') =>
    routeOf[`${f}.html`] ? `href="${routeOf[`${f}.html`]}${hash}"` : m,
  );
  html = html.replace(/(src|href)="assets\//g, '$1="/assets/');
  html = html.replace(/url\((['"]?)assets\//g, 'url($1/assets/');
  // External links open safely.
  html = html.replace(/<a href="(https?:\/\/[^"]+)"(?![^>]*rel=)/g, '<a href="$1" rel="noopener"');
  // Landmark: everything between the nav and the footer is the main content.
  html = html.replace(/<section/, '<main id="main"><section').replace(/<footer/, '</main><footer');
  html = optimiseImages(html);
  if (html.includes('<animate')) html = html.replace('</body>', `${motionScript}\n</body>`);
  if (page.file === 'contact.html') html = wireForm(html);
  return html;
}

const textOf = (html) =>
  html
    .replace(/<(script|style|svg|nav|header|footer)[\s\S]*?<\/\1>/g, ' ')
    .replace(/<\/(h[1-6]|p|li|div|section|summary|details)>/g, '\n')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&').replace(/&nbsp;/g, ' ').replace(/&#39;|&rsquo;/g, "'").replace(/&middot;/g, '·')
    .replace(/[ \t]+/g, ' ')
    .split('\n').map((l) => l.trim()).filter(Boolean)
    .filter((l, i, a) => l !== a[i - 1])
    .join('\n');

const fullText = [];
for (const page of pages) {
  const raw = readFileSync(join(src, page.file), 'utf8');
  const html = transform(raw, page);
  const dir = join(out, page.path);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'index.html'), html);
  const main = html.match(/<main[\s\S]*<\/main>/)?.[0] || '';
  fullText.push(`# ${page.name}\nURL: ${abs(page.path)}\n\n${textOf(main)}`);
}

// ── 404 ────────────────────────────────────────────────────────────────────
{
  const page = { file: '404.html', path: '/404.html', name: 'Page not found', title: `Page not found | ${site.name}`, description: 'The page you are looking for has moved or does not exist.', noindex: true };
  let html = readFileSync(join(src, 'index.html'), 'utf8');
  html = html.replace(
    /<section[\s\S]*<\/section>(?=[\s\S]*<footer)/,
    `<section style="padding: clamp(160px, 18vw, 220px) 24px clamp(84px, 9vw, 128px); text-align: center"><div style="max-width: 720px; margin: 0 auto"><span style="font-family: 'Geist Mono', ui-monospace, monospace; font-size: 12px; letter-spacing: 0.06em; text-transform: uppercase; color: #087b84">Error 404</span><h1 style="margin: 18px 0 0; font-family: 'Bricolage Grotesque', Geist, sans-serif; font-size: clamp(44px, 5.8vw, 82px); line-height: 1.02; font-weight: 600; letter-spacing: -0.05em">This page has <span style="font-family: 'Instrument Serif', Georgia, serif; font-style: italic; font-weight: 400; letter-spacing: -0.01em; color: #087b84">moved.</span></h1><p style="margin: 20px auto 0; max-width: 560px; font-size: 18px; line-height: 1.65; color: #3f5c5e">The page you are looking for does not exist on our new website. Start from the home page or explore our services.</p><div style="margin-top: 30px; display: flex; gap: 12px; justify-content: center; flex-wrap: wrap"><a href="index.html" class="g-btn g-pri">Go to home<span class="g-arr"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#062b2e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"></path></svg></span></a><a href="services.html" class="g-btn g-sec g-glass">Our services</a></div></div></section>`,
  );
  writeFileSync(join(out, '404.html'), transform(html, page));
}

// ── Crawler files ──────────────────────────────────────────────────────────
writeFileSync(
  join(out, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${pages
  .map(
    (p) => `  <url>
    <loc>${abs(p.path)}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${p.changefreq || 'monthly'}</changefreq>
    <priority>${p.priority}</priority>${p.image ? `\n    <image:image><image:loc>${abs(p.image)}</image:loc></image:image>` : ''}
  </url>`,
  )
  .join('\n')}
</urlset>
`,
);

// AI crawlers are named explicitly so the intent (welcome) is obvious and any
// one of them can be disallowed later in one place.
const aiBots = ['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-User', 'Claude-SearchBot', 'anthropic-ai', 'PerplexityBot', 'Perplexity-User', 'Google-Extended', 'Applebot-Extended', 'Bingbot', 'CCBot', 'Meta-ExternalAgent', 'Amazonbot', 'DuckAssistBot', 'cohere-ai', 'MistralAI-User'];
writeFileSync(
  join(out, 'robots.txt'),
  `User-agent: *
Allow: /

${aiBots.map((b) => `User-agent: ${b}\nAllow: /`).join('\n\n')}

Sitemap: ${site.url}/sitemap.xml
`,
);

const llms = `# ${site.name}

> ${site.description}

${site.legalName} (DVPL) is an integrated logistics company headquartered in Gurugram, Haryana, India. It designs and runs warehousing and logistics clusters around OEM plants and their supplier networks, and operates them on its own technology platform, IPMS (Integrated Plant Management System). Operations begin in November 2026.

## Key facts
- Legal name: ${site.legalName} (CIN ${site.cin})
- Headquarters: ${site.address.street}, ${site.address.locality}, ${site.address.region} ${site.address.postalCode}, India
- Contact: ${site.email} · ${site.phone}
- Model: asset-light, 100% leased warehousing; ~50,000 sq ft base warehouses
- Launch: 2 corridors, operations from November 2026; roadmap milestones April 2027, August 2027 and 2027–2031
- Leadership: ${site.founders.map((f) => `${f.name} (${f.role})`).join(', ')}; advisors with 55+ years of combined experience
- Sectors: automotive and auto components, consumer durables, electronics, quick commerce / D2C
- Services: integrated warehousing, in-plant logistics, transportation, 3PL, 4PL, aftermarket and reverse logistics
- Technology: IPMS integrates with client ERP and runs on DVPL's own TMS, WMS, EMS and HRMS

## Pages
${pages.map((p) => `- [${p.name}](${abs(p.path)}): ${p.description}`).join('\n')}

## Frequently asked questions
${Object.values(faqs).flat().filter((v, i, a) => a.findIndex((x) => x[0] === v[0]) === i).map(([q, a]) => `### ${q}\n${a}`).join('\n\n')}

## Optional
- [Full text of every page](${site.url}/llms-full.txt)
`;
writeFileSync(join(out, 'llms.txt'), llms);
writeFileSync(join(out, 'llms-full.txt'), `# ${site.name}: full site text\n\n> ${site.description}\n\n${fullText.join('\n\n---\n\n')}\n`);

writeFileSync(
  join(out, 'site.webmanifest'),
  JSON.stringify(
    {
      name: site.name,
      short_name: 'Drona VC',
      description: site.description,
      start_url: '/',
      display: 'standalone',
      background_color: '#f6f5ef',
      theme_color: '#062b2e',
      icons: [
        { src: '/assets/brand/icon-192.png', sizes: '192x192', type: 'image/png' },
        { src: '/assets/brand/icon-512.png', sizes: '512x512', type: 'image/png' },
      ],
    },
    null,
    2,
  ),
);

// .htaccess for Apache/LiteSpeed hosts (Hostinger). Mirrors nginx.conf: one
// redirect hop to the canonical https apex, old-site URLs, long cache lifetimes
// for static assets, compression and the custom 404 page.
writeFileSync(
  join(out, '.htaccess'),
  `# Generated by scripts/build.mjs. Edit there, not here.
Options -Indexes
DirectoryIndex index.html
ErrorDocument 404 /404.html

<IfModule mod_rewrite.c>
RewriteEngine On

# http:// or www. -> https://dronavaluechain.com in a single 301.
RewriteCond %{HTTPS} !=on [OR]
RewriteCond %{HTTP_HOST} ^www\\. [NC]
RewriteCond %{HTTP_HOST} (^|\\.)dronavaluechain\\.com$ [NC]
RewriteRule ^ https://dronavaluechain.com%{REQUEST_URI} [L,R=301]

# Old website URLs -> closest new page.
RewriteRule ^services/(in-plant-services|manpower-supply)/?$ /services/in-plant-logistics/ [L,R=301]
RewriteRule ^services/(inventory-management|packaging-solutions)/?$ /services/warehousing/ [L,R=301]
RewriteRule ^services/last-mile-delivery/?$ /services/transportation/ [L,R=301]
RewriteRule ^industries/(pharmaceutical|automotive|fmcg-retail)/?$ /industries/ [L,R=301]
RewriteRule ^(blog|clients)(/.*)?$ / [L,R=301]
RewriteRule ^(about|services|industries|technology|contact)\\.html$ /$1/ [L,R=301]
RewriteRule ^(warehousing|in-plant-logistics|transportation|3pl|4pl|aftermarket-logistics)\\.html$ /services/$1/ [L,R=301]
</IfModule>

<IfModule mod_mime.c>
AddType application/manifest+json .webmanifest
AddType font/woff2 .woff2
AddCharset utf-8 .html .txt .xml .webmanifest
</IfModule>

<IfModule mod_deflate.c>
AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css application/javascript application/json application/xml application/manifest+json image/svg+xml
</IfModule>

<IfModule mod_headers.c>
Header always set X-Content-Type-Options "nosniff"
Header always set Referrer-Policy "strict-origin-when-cross-origin"
Header always set X-Frame-Options "SAMEORIGIN"
# Fonts never change under a given name; images rarely do.
<FilesMatch "\\.(woff2)$">
Header set Cache-Control "public, max-age=31536000, immutable"
</FilesMatch>
<FilesMatch "\\.(webp|png|jpe?g|svg|ico)$">
Header set Cache-Control "public, max-age=2592000"
</FilesMatch>
<FilesMatch "\\.(html|xml|txt|webmanifest)$">
Header set Cache-Control "no-cache"
</FilesMatch>
</IfModule>
`,
);

// IndexNow key file (Bing, Yandex, Seznam). Harmless if never pinged.
writeFileSync(join(out, `${site.indexNowKey}.txt`), site.indexNowKey);

console.log(`Built ${pages.length} pages + 404 into out/`);
