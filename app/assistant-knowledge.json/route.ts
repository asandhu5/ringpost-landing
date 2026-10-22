import { knowledgePages } from "@/lib/site-knowledge";
import { COMPANY, LEGAL_LINKS, SITE } from "@/lib/site";

/**
 * The website assistant's grounding (brief §9.11), generated at build time from the same
 * content modules the pages render, so the assistant can never describe the product
 * differently from the site. The platform API (apps/api website-assistant) fetches this
 * file, fetches the seven legal pages listed in `legalPages` and reads their text, and
 * takes prices from its own copy of plans.ts. Nothing here is hand-written for the model.
 */
export const dynamic = "force-static";

export function GET() {
  const pages = knowledgePages();

  return Response.json({
    version: 1,
    site: SITE.url,
    company: COMPANY.legalName,
    generatedAt: new Date().toISOString(),
    pages,
    legalPages: LEGAL_LINKS.map((l) => ({ path: l.href, title: l.name })),
    links: [...new Set([...pages.map((p) => p.path), ...LEGAL_LINKS.map((l) => l.href), "/industries", "/resources", "/about", "/contact", "/call", "/pricing"])].sort(),
  });
}
