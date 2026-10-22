import { allPosts } from "@/lib/blog";
import { COMPANY, LEGAL_LINKS, SITE } from "@/lib/site";
import { knowledgePages } from "@/lib/site-knowledge";

/**
 * /llms-full.txt: the whole site as plain text, for AI assistants that want to read it in
 * one go. The same page-by-page text Zara uses, with two changes for a public file: the
 * contact email stays on /contact only (owner rule), and lines written as instructions to
 * Zara are left out. Blog posts are included in full.
 */
export const dynamic = "force-static";

/** Lines in Zara's knowledge that are instructions to her, not facts about RingPost. */
const FOR_ZARA_ONLY = /do not describe|don't suggest one/i;

export function GET() {
  const pages = knowledgePages().map((p) => {
    if (p.path === "/contact") return { ...p, text: `To reach a person on the RingPost team, use the form at ${SITE.url}/contact.` };
    if (p.path === "/about") {
      return {
        ...p,
        text: `RingPost is a product of ${COMPANY.legalName}. Today RingPost does not offer a chat widget for a business's own website, provide phone numbers outside the US and Canada, or post to Snapchat or Google Business Profile.`,
      };
    }
    return { ...p, text: p.text.split("\n").filter((line) => line && !FOR_ZARA_ONLY.test(line)).join("\n") };
  });

  const text = [
    `# ${SITE.name}: full site text`,
    "",
    `> Every page of ${SITE.url} as plain text, generated from the site's own content. The short version is ${SITE.url}/llms.txt.`,
    "",
    ...pages.flatMap((p) => [`## ${p.title}`, `${SITE.url}${p.path}`, "", p.text, ""]),
    "## Blog posts",
    "",
    ...allPosts().flatMap((post) => [`### ${post.title}`, `${SITE.url}/resources/blog/${post.slug} (${post.date})`, "", post.body, ""]),
    "## Legal pages",
    ...LEGAL_LINKS.map((l) => `- ${l.name}: ${SITE.url}${l.href}`),
    "",
  ].join("\n");

  return new Response(text, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
