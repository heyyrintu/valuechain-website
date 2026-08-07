import { site } from '../lib/site';

export const dynamic = 'force-static';

// app/favicon.ico, app/icon.png and app/apple-icon.png are picked up by Next's
// file conventions and emitted as <link> tags automatically — they are not
// repeated here. This manifest exists for the installable/mobile surface and to
// give the icons a second declared home, which is one of the places Google
// looks when resolving a site icon.
export default function manifest() {
  return {
    name: `${site.shortName} — Integrated Logistics & Supply Chain Solutions`,
    short_name: site.shortName,
    description: site.shortDescription,
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#3f6cc4',
    lang: 'en-IN',
    icons: [
      { src: '/images/icon-96.png', sizes: '96x96', type: 'image/png' },
      { src: '/images/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/images/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
    ],
  };
}
