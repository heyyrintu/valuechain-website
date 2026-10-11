# Drona Valuechain website

Marketing site for dronavaluechain.com: 7 pages, a gradient and glass design, and scroll-driven motion. The design-approved HTML lives in `site/`. A small build script with no dependencies adds the SEO, AEO, GEO and AIO layer and writes the deployable site to `out/`.

```bash
npm run build   # site/ -> out/
npm run dev     # build, then serve out/ at http://localhost:3000
```

## Layout

| Path | What |
|---|---|
| `site/*.html`, `site/assets/` | Pages and assets exactly as designed. Edit copy and design here. |
| `scripts/site.config.mjs` | Titles, descriptions, URLs, company facts and FAQs used for meta tags, JSON-LD and llms.txt |
| `scripts/build.mjs` | Build: clean URLs, `<head>`, structured data, sitemap, robots, llms.txt, 404, contact form |
| `nginx.conf`, `Dockerfile` | Production serving, plus 301 redirects from the old website's URLs |
| `docs/SEO.md` | What is optimised and the manual steps after launch |

## URLs

`/`, `/about/`, `/services/`, `/services/warehousing/`, `/services/in-plant-logistics/`, `/services/transportation/`, `/services/3pl/`, `/services/4pl/`, `/services/aftermarket-logistics/`, `/industries/`, `/technology/`, `/contact/`.

To add a page, put the HTML in `site/`, add an entry to `pages` in `scripts/site.config.mjs`, and link to it as `name.html`. The build rewrites the link.

## Contact form

Submissions go to Web3Forms and arrive at the inbox the access key was created for. Put the key in `formAccessKey` in `scripts/site.config.mjs`, or set the `FORM_ACCESS_KEY` environment variable at build time (it takes precedence). Web3Forms keys are public by design: they can only send to their own inbox, so committing one is safe. Without a key, the form opens the visitor's email client with the message filled in. A hidden honeypot field drops bot submissions.

## Deploy

`docker build -t dronavaluechain . && docker run -p 80:80 dronavaluechain`. You can also upload the contents of `out/` to any static host. If you do, recreate the redirects in `nginx.conf` there.
