import { site, services, industries, companyFaqs, hasPhone, formatAddress } from '../../lib/site';
import { getAllPosts } from '../../lib/posts';

export const dynamic = 'force-static';

/**
 * /llms.txt — the llmstxt.org convention.
 *
 * A single plain-Markdown file that states what this organisation is and links
 * to the canonical page for each topic, so a model grounding an answer does not
 * have to infer the structure of the site from rendered HTML and navigation.
 *
 * Generated from lib/site.js rather than hand-written, so it cannot drift out
 * of sync with the pages it describes.
 */
export function GET() {
  const lines = [];

  lines.push(`# ${site.name}`);
  lines.push('');
  lines.push(`> ${site.shortDescription}`);
  lines.push('');
  lines.push(
    `${site.shortName} operates as a single accountable partner across the supply chain — inside the plant, inside the warehouse, and out to the last mile. Founded ${site.founded}. Headquartered in ${formatAddress()}. CIN ${site.cin}.`
  );
  lines.push('');

  lines.push('## Key facts');
  lines.push('');
  lines.push(`- Legal name: ${site.legalName}`);
  lines.push(`- Founded: ${site.founded}`);
  lines.push(`- Headquarters: ${formatAddress()}`);
  lines.push(`- Area served: ${site.areaServed}`);
  lines.push(`- Email: ${site.email}`);
  if (hasPhone) lines.push(`- Phone: ${site.phone}`);
  lines.push(`- Hours: ${site.openingHours}`);
  lines.push(`- Website: ${site.url}`);
  lines.push('');

  lines.push('## Services');
  lines.push('');
  for (const s of services) {
    lines.push(`- [${s.title}](${site.url}/services/${s.slug}/): ${s.summary}`);
  }
  lines.push('');

  lines.push('## Industries served');
  lines.push('');
  for (const i of industries) {
    lines.push(`- [${i.title}](${site.url}/industries/${i.slug}/): ${i.summary}`);
  }
  lines.push('');

  lines.push('## Company pages');
  lines.push('');
  lines.push(`- [About](${site.url}/about/): History, mission, values and leadership background.`);
  lines.push(`- [Clients](${site.url}/clients/): Client list, testimonials and case studies.`);
  lines.push(`- [Contact](${site.url}/contact/): Enquiry form and contact details.`);
  lines.push(`- [Blog](${site.url}/blog/): Operational insight and company updates.`);
  lines.push('');

  const posts = getAllPosts();
  if (posts.length) {
    lines.push('## Articles');
    lines.push('');
    for (const p of posts) {
      lines.push(`- [${p.title}](${site.url}/blog/${p.slug}/) (${p.date}): ${p.excerpt}`);
    }
    lines.push('');
  }

  lines.push('## Frequently asked questions');
  lines.push('');
  for (const f of companyFaqs) {
    lines.push(`### ${f.q}`);
    lines.push('');
    lines.push(f.a);
    lines.push('');
  }

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
