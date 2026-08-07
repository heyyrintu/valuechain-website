import { site } from '../lib/site';

export const dynamic = 'force-static';

/**
 * The AI crawlers are listed explicitly rather than left to the wildcard.
 *
 * They already fall under `User-Agent: *`, so this changes nothing
 * functionally — it is a deliberate, readable statement that these bots are
 * welcome, and it gives one obvious place to disallow a specific one later if
 * that decision ever changes. For a B2B company that wants to be cited in AI
 * answers, being crawlable by these is the entry ticket.
 *
 *   GPTBot            — OpenAI, trains and grounds ChatGPT
 *   OAI-SearchBot     — OpenAI, powers ChatGPT search results
 *   ChatGPT-User      — OpenAI, fetches a page when a user asks about it live
 *   PerplexityBot     — Perplexity index
 *   ClaudeBot         — Anthropic
 *   Google-Extended   — controls use in Gemini / AI Overviews grounding
 *   Applebot-Extended — Apple Intelligence
 *   Bingbot           — Bing, and by extension Copilot
 */
const AI_CRAWLERS = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'PerplexityBot',
  'ClaudeBot',
  'Claude-Web',
  'Google-Extended',
  'Applebot-Extended',
  'Bingbot',
  'CCBot',
];

export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // Next build artefacts have no standalone value in an index.
        disallow: ['/_next/static/chunks/'],
      },
      ...AI_CRAWLERS.map((userAgent) => ({ userAgent, allow: '/' })),
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
