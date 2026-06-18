# Drona Logitech Website

Corporate website built with Next.js (static export) + Tailwind CSS.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
```

## Build for deployment

```bash
npm run build
```

The static site is generated in the `out/` folder. Upload the **contents** of `out/` to your hosting (cPanel File Manager → public_html, or via FTP). That's the entire deployment.

## Editing content

| What | Where |
|---|---|
| Contact details, services, industries, stats, nav | `lib/site.js` (single source of truth) |
| Page content | `app/<page>/page.jsx` |
| Blog posts | Add a `.md` file in `content/posts/` (copy an existing one as a template), then rebuild |
| Colors/fonts | `tailwind.config.js` |
| Logo | Put `logo.svg`/`logo.png` in `public/images/` and swap the placeholder "D" mark in `components/Header.jsx` and `components/Footer.jsx` |
| Photos | Drop into `public/images/` and reference as `/images/filename.jpg` |

## Contact form

The form currently opens the visitor's email client (mailto fallback). To get submissions delivered to your inbox silently:

1. Create a free access key at https://web3forms.com (takes 1 minute, just needs your email)
2. Paste the key into `WEB3FORMS_ACCESS_KEY` in `components/ContactForm.jsx`
3. Rebuild and redeploy

## TODOs before launch

- [ ] Confirm email, phone, full street address in `lib/site.js`
- [ ] Add real logo to `public/images/` and update Header/Footer
- [ ] Replace leadership placeholders in `app/about/page.jsx`
- [ ] Replace client logo placeholders and testimonials in `app/clients/page.jsx`
- [ ] Add Web3Forms key for the contact form
- [ ] Add real operations photos
