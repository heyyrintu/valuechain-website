# SEO & AEO — how this site is set up and what to do next

Covers three things: what is wired into the codebase, the Google Search Console
setup you have to do by hand, and the items still blocked on information only
you have.

---

## 1. Before you do anything else — two blockers

These are not optimisations. Each is currently missing in a way that costs
ranking, and neither can be fixed from the code alone.

| # | What | Where | Why it matters |
|---|------|-------|----------------|
| 1 | **Phone number is a placeholder** (`+91 0000000000`) | `lib/site.js` → `site.phone` | It is currently suppressed everywhere — footer, contact page, `llms.txt`, and the `telephone` field in structured data all omit it rather than publish a fake. Google Business Profile cannot be verified without a real number, and local pack ranking depends on consistent name/address/phone. |
| 2 | **No street address** | `lib/site.js` → `site.address.street` and `.postalCode` | `LocalBusiness` schema without `streetAddress` is treated as incomplete. "Logistics company near me" and map-pack queries need a real address. |

Fill both in and the phone and address appear automatically everywhere —
rendering, schema, and `llms.txt` are all driven off that one file. No other
edits needed.

The canonical domain is **`dronavaluechain.com`** (apex, no `www`), which matches
the `info@dronavaluechain.com` contact address — so brand, site and email are all
one consistent entity.

---

## 2. What was changed

### Canonical & duplicate control
- `<link rel="canonical">` on every indexable page, absolute, on `dronavaluechain.com`.
- Domain corrected from `www.dronavaluechain.com` → `https://dronavaluechain.com` (`lib/site.js`).
- `www` → apex 301 redirect in `nginx.conf`, so a page is never reachable at two hostnames.
- `metadataBase` set, so every relative URL in metadata resolves absolutely.

### Structured data (`lib/seo.js`)
One linked `@graph` rather than loose blocks — every node points at the same
`@id` for the organisation, so all facts resolve to a single entity:

| Type | Where |
|------|-------|
| `Organization` + `LocalBusiness` | every page (root layout) |
| `WebSite` | every page |
| `BreadcrumbList` | every page except home and 404 |
| `Service` | each of the 6 service pages |
| `FAQPage` | home, services hub, 6 service pages, 3 industry pages |
| `BlogPosting` | each blog post |
| `ContactPage` / `ItemList` / `WebPage` | contact, services hub, industry pages |

All 38 emitted blocks parse as valid JSON.

### New pages — 9 total
- `/services/<slug>/` × 6, from `app/services/[slug]/page.jsx`
- `/industries/<slug>/` × 3, from `app/industries/[slug]/page.jsx`

Content lives in `lib/site.js`, not in the components. Each page carries a
definition block, three long-form sections, deliverables, outcomes, cross-links,
and 3–4 FAQs.

### Internal linking
- Homepage and footer service links repointed from `/services/#slug` fragments
  to the real `/services/<slug>/` URLs. Fragments are not separate pages — those
  links passed no authority to anything.
- Industries hub now links to sector detail pages with keyword-bearing anchor
  text instead of to `/contact/`.
- Service cards link on the heading, so the anchor text is the service name.

### AEO
- **FAQ sections** on 11 pages, rendered as native `<details>`/`<summary>` so
  answers are in the HTML and readable without JavaScript. A JS accordion that
  mounts answers on click would hide the exact content the section exists to expose.
- **`/llms.txt`** ([llmstxt.org](https://llmstxt.org)) — generated from
  `lib/site.js`, so it cannot drift from the pages it describes.
- **AI crawlers named explicitly** in `robots.txt`: GPTBot, OAI-SearchBot,
  ChatGPT-User, PerplexityBot, ClaudeBot, Google-Extended, Applebot-Extended,
  Bingbot, CCBot.
- **`max-snippet:-1` and `max-image-preview:large`** so answer engines may quote
  a full passage rather than a truncated one.
- **Entity grounding** — `areaServed`, `knowsAbout`, `legalName`, CIN, and
  `makesOffer` for all six service lines.

### Social
- 1200×630 OG card at `public/images/og-default.png`, wired to `og:image` and
  `twitter:image` on every page; card type raised from `summary` to
  `summary_large_image`.
- Regenerate with `powershell -ExecutionPolicy Bypass -File scripts/generate-og-image.ps1`.

> **Why a committed PNG rather than `app/opengraph-image.jsx`:** that Next file
> convention uses `@vercel/og`, which calls `fileURLToPath()` on its own bundled
> WASM asset. The project path contains spaces (`OneDrive - DRONA LOGITECH
> PRIVATE LIMITED`), which makes that call throw `Invalid URL` and fails the
> whole static export. The card changes only when branding does, so generating
> it once costs nothing per build and removes the failure mode entirely.

### Performance
- Google Fonts `<link>` tags replaced with `next/font` — fonts are now
  self-hosted at build time, removing two DNS + TLS round trips from the
  critical path before any text could paint.
- `width`/`height` on the header logo so the browser reserves the box before the
  file loads (was a Cumulative Layout Shift source on every cold load).

### Sitemap
- 18 URLs (was 9), including all 9 new pages.
- `lastModified` now derives from the **mtime of the source file** that renders
  each route, not `new Date()`. The old behaviour told Google every page changed
  on every rebuild; once `lastmod` is demonstrably unreliable, crawlers stop
  weighting it.
- Priorities re-tiered: home 1.0, services/industries hubs 0.9, detail pages 0.8.

### Also
- RSS feed at `/blog/rss.xml`.
- `formatAddress()` helper — the footer previously read `site.address.line1`,
  which no longer exists and would have rendered `undefined, India`.
- Skip-to-content link, `lang="en-IN"`, `theme-color`.

**Result:** total indexable body copy went from roughly 2,150 words to about
9,300.

---

## 3. Google Search Console — step by step

### 3.1 Create the property

1. Go to [search.google.com/search-console](https://search.google.com/search-console) and sign in with an account you control long-term — not a personal one that leaves with an employee.
2. Click **Add property**.
3. Choose **Domain** (the left option), not URL prefix.

   Use **Domain**. It covers `http`, `https`, apex, `www`, and every subdomain in
   one property. URL-prefix properties treat `https://dronavaluechain.com/` and
   `https://www.dronavaluechain.com/` as separate datasets, which splits your
   reporting in exactly the place the redirect is meant to unify.

4. Enter `dronavaluechain.com` — no protocol, no `www`, no trailing slash.

### 3.2 Verify by DNS

Domain properties verify only by DNS TXT record.

1. Search Console shows a string like `google-site-verification=AbC123...`.
2. In your DNS provider, add a **TXT** record on the root (`@`) with that exact
   value. Leave any existing TXT records alone — adding a second TXT record is
   fine and normal; replacing an SPF record will break your email.
3. TTL: whatever the default is. 3600 is fine.
4. Wait for propagation — usually minutes, occasionally up to a few hours — then
   click **Verify**.
5. Verify with `nslookup -type=TXT dronavaluechain.com` if it fails; if the record
   isn't visible there, it isn't propagated yet.

Do not delete the TXT record afterwards. Google re-checks it, and removing it
un-verifies the property.

### 3.3 Submit the sitemap

1. **Indexing → Sitemaps** in the left sidebar.
2. Enter `sitemap.xml` in the box (just that — the domain is prefilled).
3. **Submit.**
4. Status should reach **Success** with **18 discovered URLs**. "Couldn't fetch"
   usually means the site isn't live yet or `robots.txt` is blocking — recheck
   after deploy rather than resubmitting repeatedly.

### 3.4 Request indexing for the priority pages

Sitemaps get you discovered; manual submission is faster for the pages that
matter. **URL Inspection** at the top, paste the URL, then **Request indexing**.

Do these nine first — they carry the commercial-intent keywords:

```
https://dronavaluechain.com/
https://dronavaluechain.com/services/
https://dronavaluechain.com/services/warehousing/
https://dronavaluechain.com/services/in-plant-services/
https://dronavaluechain.com/services/last-mile-delivery/
https://dronavaluechain.com/industries/pharmaceutical/
https://dronavaluechain.com/industries/automotive/
https://dronavaluechain.com/industries/fmcg-retail/
https://dronavaluechain.com/contact/
```

There is a daily quota of roughly 10–12 manual submissions. Spread the rest over
following days; the sitemap will pick them up regardless.

### 3.5 Settings to configure once

- **Settings → Users and permissions** — add a second owner. If the only owner
  leaves, you lose the property and its history.
- **Settings → Crawl stats** — check for 4xx/5xx spikes after the first crawl.
- Leave international targeting alone; `lang="en-IN"` already signals the market.

### 3.6 What to check, and when

| When | Where | What you're looking for |
|------|-------|------------------------|
| 3–7 days after submitting | Pages report | Pages moving from "Discovered" to "Indexed". Some lag is normal for a new domain. |
| 2 weeks | Pages → "Why pages aren't indexed" | "Crawled – currently not indexed" on a *thin* page is Google's verdict on content depth, not a bug. "Duplicate without user-selected canonical" would mean the canonical tags aren't being honoured — that shouldn't happen now, so investigate if it does. |
| 3–4 weeks | Performance report | First impressions. Expect brand queries ("drona valuechain") first; service and industry queries follow at 2–3 months. |
| Ongoing, monthly | Experience → Core Web Vitals | Needs real traffic before it populates. Until then use [PageSpeed Insights](https://pagespeed.web.dev/). |
| Ongoing | Enhancements → FAQ / Breadcrumbs | Confirms Google parsed the structured data. Absence here after a month means re-test with the Rich Results Test. |

### 3.7 Also worth doing

**Bing Webmaster Tools** ([bing.com/webmasters](https://www.bing.com/webmasters)) —
takes five minutes, imports directly from Search Console, and Bing's index feeds
ChatGPT search and Copilot. For AEO specifically this is not optional.

**Google Business Profile** ([business.google.com](https://business.google.com)) —
blocked on blockers 1 and 2 above. This is the single largest local-visibility
lever for a Gurugram logistics company and it needs a real address and phone.

### 3.8 Validation tools

Run these once the site is live:

| Tool | Checks |
|------|--------|
| [Rich Results Test](https://search.google.com/test/rich-results) | FAQ, Breadcrumb, Organization, Service, BlogPosting eligibility |
| [Schema Markup Validator](https://validator.schema.org/) | Full graph, including types Google doesn't surface |
| [PageSpeed Insights](https://pagespeed.web.dev/) | LCP / INP / CLS, mobile tab first |
| [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/) | OG card. Also forces LinkedIn to re-scrape a cached URL |
| `curl -I https://www.dronavaluechain.com/` | Should return `301` to the apex |

---

## 4. Keyword map — one primary theme per URL

Kept deliberately one-to-one. Two pages targeting the same term compete with
each other and neither wins.

| URL | Primary theme |
|-----|---------------|
| `/` | integrated logistics company india, 3PL |
| `/services/` | logistics services india |
| `/services/in-plant-services/` | in-plant logistics services |
| `/services/warehousing/` | warehousing services gurugram / contract warehousing |
| `/services/inventory-management/` | inventory management services |
| `/services/packaging-solutions/` | industrial & export packaging services |
| `/services/manpower-supply/` | logistics manpower supply / contract staffing |
| `/services/last-mile-delivery/` | last mile delivery india |
| `/industries/pharmaceutical/` | pharmaceutical logistics india |
| `/industries/automotive/` | automotive logistics / JIT line feeding |
| `/industries/fmcg-retail/` | FMCG logistics & distribution |
| `/about/` | brand / company queries |
| `/clients/` | social proof, brand + client-name queries |
| `/contact/` | "logistics company gurugram contact" |

---

## 5. What is still open

Ranked by impact.

1. **The three blockers in §1.** Everything local depends on them.
2. **Blog is nearly empty** — 2 posts, ~230 and ~310 words. This is the main
   organic acquisition surface and it is currently inert. Target 800–1,200 words
   per post, one per topic drawn from the FAQ questions, which are already
   evidence of what people ask.
3. **Case studies are headline-only.** `/clients/` lists four case studies with a
   single sentence each. Numbers, timelines and named outcomes are what make a
   page citable by an answer engine — and quotable by a prospect.
4. **Unverifiable claims.** "20+ years", "100+ team members" carry no
   attributable detail. Models discount unsourced assertions; so do buyers.
5. **No backlinks.** Nothing in this repo affects off-page authority. Directory
   listings (IndiaMART, Justdial, Sulekha), industry associations and client
   press mentions are the realistic starting set for this sector.
6. **Testimonials are anonymous** and marked `TODO` in `app/clients/page.jsx`.
   Attributed quotes carry weight; "Operations Head, automotive component
   manufacturer" does not.

---

## 6. Maintenance

- **Adding a service or industry:** add the object to `lib/site.js`. The detail
  page, hub card, footer link, sitemap entry, `llms.txt` line and schema are all
  generated from it.
- **Adding a blog post:** drop a `.md` file in `content/posts/`. Sitemap, RSS,
  listing page and `BlogPosting` schema follow automatically.
- **Changing branding:** re-run `scripts/generate-og-image.ps1`.
- **Changing the domain:** `site.url` in `lib/site.js`, plus the `server_name`
  and redirect target in `nginx.conf`.
