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

`/`, `/about/`, `/services/`, `/services/warehousing/`, `/industries/`, `/technology/`, `/contact/`.

To add a page, put the HTML in `site/`, add an entry to `pages` in `scripts/site.config.mjs`, and link to it as `name.html`. The build rewrites the link.

## Contact form

Set `FORM_ACCESS_KEY` (a free key from https://web3forms.com) at build time, for example `docker build --build-arg FORM_ACCESS_KEY=xxxx .`. Without it, the form opens the visitor's email client with the message filled in.

## Deploy

`docker build -t dronavaluechain . && docker run -p 80:80 dronavaluechain`. You can also upload the contents of `out/` to any static host. If you do, recreate the redirects in `nginx.conf` there.
