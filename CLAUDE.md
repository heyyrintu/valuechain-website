# Drona Valuechain website: project guide for Claude Code

Marketing website for **Drona Valuechain Pvt. Ltd. (DVPL)**, a Gurugram-based integrated logistics company built for OEMs and their supplier networks. The design-approved HTML lives in `site/`. `scripts/build.mjs` (no dependencies) adds SEO, AEO, GEO and AIO metadata and writes the deployable site to `out/`. There is no backend.

## Run it

```bash
npm run build      # site/ -> out/
npm run dev        # build, then serve out/ at http://localhost:3000
```

Edit pages in `site/`, never in `out/`. Keep internal links as `name.html`; the build rewrites them to clean URLs (`/about/`, `/services/warehousing/`). Page titles, descriptions, company facts and FAQs for SEO live in `scripts/site.config.mjs`. If you change a visible FAQ, update it there too. See `docs/SEO.md`.

## Structure

```
site/
index.html          Home
about.html          About: vision and mission, at a glance, leadership, engagement steps
services.html       Services: six services (bento), value chain, 3PL/4PL levels, growth areas
warehousing.html    Service detail template (Integrated warehousing)
in-plant-logistics.html, transportation.html, 3pl.html, 4pl.html, aftermarket-logistics.html
                    Service detail pages built from the warehousing template
industries.html     Four sectors + corridors and roadmap
technology.html     IPMS: data flow, stack tabs, benefits, control-tower preview
contact.html        Contact form, Google Maps embed, FAQ
assets/css/site.css Design system: tokens-in-use, glass, motion, noise, responsive rules
assets/img/         Section illustrations (WebP, colour-matched to the cream background)
assets/brand/       Logo symbol, reversed logo (for dark backgrounds), full logo, favicon
```

Every page repeats the same nav, CTA band and footer. If you refactor into a framework (Astro or Next.js recommended), extract these first: `Nav`, `Footer`, `CtaBand`, `Chip`, `SectionHead`, `GlassCard`, `BentoCard`, `Button`.

## Design system

### Colour
| Token | Hex | Use |
|---|---|---|
| ink | `#062b2e` | Text, dark sections, primary button |
| teal | `#0a3d3f` | Brand teal |
| mid | `#087b84` | Accent words (light sections), links |
| cyan | `#00d1d6` | Flow lines, packets, highlights |
| gold | `#c89b4f` | Secondary accent |
| gold-light | `#e6c17a` | Accent words on dark sections |
| muted | `#3f5c5e` | Body copy on light |
| page | `#f6f5ef` | Page background (warm cream) |

### Type (Google Fonts)
- **Bricolage Grotesque** 500–700: headings. Tight tracking (`-0.04em` to `-0.055em`).
- **Instrument Serif italic**: accent words inside headings (solid teal on light, gold on dark). Never use a gradient or colour animation on it.
- **Geist** 400–700: body and UI.
- **Geist Mono** 500: small uppercase labels and chips.

### Surfaces
- `.g-glass`: frosted light glass (blur, white border, soft shadow). `.g-dglass`: the dark-section version.
- Mesh background: blurred colour blobs (`.g-blob .g-b1/.g-b2/.g-b3`) that drift slowly.
- `.g-noise`: page-wide film-grain overlay (last child of the page root). Keep it.
- Standard section padding: `clamp(84px, 9vw, 128px)`. Content width: 1240px max with 24px side padding.

### Components (CSS classes)
- Buttons: `.g-btn.g-pri` (dark pill with gradient arrow circle `.g-arr`), `.g-btn.g-sec.g-glass` (glass pill).
- Cards: `.g-card` adds hover lift, a rotating gradient border and a light sweep.
- Bento grid: `.g-bento` with `.b2/.b3/.b4/.b6` spans on a 6-column grid. It collapses to one column under 900px.
- IPMS tabs: CSS-only radio tabs (`#ipms-1..4`, `.g-tl`, `.g-pane`).
- Responsive helpers: `.g-dsk` (desktop only), `.g-mob` (mobile only), mobile menu `details.g-mnav`.

### Motion rules
- Load: headline words rise from behind a mask (`.g-wl .g-wm > .g-wi`, staggered `animation-delay`), and hero visuals tilt in (`.g-tiltin`).
- Scroll (CSS scroll-driven animations, progressive enhancement): sections and cards `.g-sr`; heading words `.g-wsc` (each heading defines its own `view-timeline-name`); the "read" paragraph `.g-read`; count-ups `.g-count`; line draws `.g-line`; image wipe `.g-wipe`; the scroll-linked marquee `.g-marq2`.
- Ambient: SVG `<animateMotion>` packets and trucks along routes, dashed flow lines `.g-dash`, slow orbit rings `.g-spin`.
- **No blinking or pulsing dots and no colour-shifting text.** The client explicitly rejected these.
- Everything is disabled under `prefers-reduced-motion`. Browsers without scroll-driven animations simply show the final state.

## Content rules (from the DVPL briefs; keep these when editing copy)
- No client names, logos, testimonials, case studies or "trusted by / serving / our clients" claims. DVPL is pre-launch (operations begin November 2026).
- No invented statistics. Figures in use: 55+ years combined advisor experience, 2 launch corridors, 100% leased (asset-light), ~50,000 sq ft base warehouses, and roadmap dates (Nov 2026, Apr 2027, Aug 2027, 2027–2031).
- Do not mention any other Drona group company.
- Calm, factual tone: no exclamation marks or hype words.
- The IPMS console is labelled "Illustrative preview" because its rows and bars are sample UI, not live data. Keep that label.

## Open items / TODO
- [x] Contact form: wired by the build (Web3Forms via `FORM_ACCESS_KEY`, mailto fallback), with validation and a status message.
- [x] Office map: Google Maps embed (keyless `output=embed` URL) for Pioneer Urban Square, Gurugram, with an "Open in Google Maps" link.
- [x] EMS module scope: written as Equipment management (forklifts, tugger trains, vehicles and handling equipment) on Home and Technology. Confirm the wording with DVPL.
- [x] Service pages: all six exist (`/services/<slug>/`) and the "Learn more" cards and footer link to them. The capability-card icons reuse the warehousing set; swap in service-specific icons if the designer supplies them.
- [x] LinkedIn: footer links to https://www.linkedin.com/company/dronavaluechain (also in `sameAs` in `scripts/site.config.mjs`).
- [x] SEO: Open Graph image, sitemap, robots, llms.txt and JSON-LD are generated by `scripts/build.mjs`.
- [ ] Refactor: page markup uses inline styles generated from the design tool. Move repeated patterns into components or classes when porting to a framework.
- [ ] Self-host the fonts for performance (optional).

## Contact details used on the site
Pioneer Urban Square, Gurugram, Haryana 122098 · info@dronavaluechain.com · +91 92892 36626 · CIN U52109DL2023PTC417213 · https://www.linkedin.com/company/dronavaluechain
