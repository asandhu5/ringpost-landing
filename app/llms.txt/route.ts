import { allPosts } from "@/lib/blog";
import { CHANNELS } from "@/lib/content/channels";
import { SOMETHING_ELSE, TYPES, isSparse, pluralFor, slugFor } from "@/lib/content/industries";
import { PRODUCTS } from "@/lib/content/products";
import { PLANS } from "@/lib/plans";
import { LEGAL_LINKS, SITE } from "@/lib/site";

/**
 * /llms.txt (llmstxt.org): a short map of the site for AI assistants: what RingPost is,
 * then the pages worth reading, each with one line. Built from the same content modules
 * the pages render, so it never drifts from the site. /llms-full.txt has the full text.
 */
export const dynamic = "force-static";

const list = (items: string[]) => new Intl.ListFormat("en", { type: "conjunction" }).format(items);

/** How each channel reads mid-sentence ("answers phone calls, text messages, ..."). */
const IN_A_SENTENCE: Record<string, string> = {
  phone: "phone calls",
  sms: "text messages",
  whatsapp: "WhatsApp",
  instagram: "Instagram DMs",
  messenger: "Facebook Messenger",
  email: "email",
};

const link = (path: string, title: string, note?: string) => `- [${title}](${SITE.url}${path})${note ? `: ${note}` : ""}`;

export function GET() {
  const channels = CHANNELS.filter((c) => c.availableToBusinesses);
  const channelNames = list(channels.map((c) => IN_A_SENTENCE[c.id] ?? c.name));
  const text = [
    `# ${SITE.name}`,
    "",
    `> ${SITE.description}`,
    "",
    `RingPost is for local businesses such as salons, clinics, restaurants, gyms and trades. It answers ${channelNames} from the business's own information (services, prices, hours and policies), books into the business's calendar, and hands anything it can't handle to the owner. It never invents a price, a time or a booking. It also makes daily images and videos for social media, drafts replies to reviews and comments, and wins back customers who haven't returned.`,
    "",
    `There are three monthly plans (${list(PLANS.map((p) => p.name))}), with no setup fee and no contract. Current prices are on the pricing page.`,
    "",
    "## Product",
    link("/product", "AI Front Desk", "what RingPost does and the checks that stop it making things up"),
    ...PRODUCTS.map((p) => link(`/product/${p.slug}`, p.name, p.summary)),
    "",
    "## Channels and pricing",
    link("/channels", "Channels", `how ${channelNames} work with RingPost`),
    link("/pricing", "Pricing", "plans, what each includes, allowances and top-ups"),
    link("/faq", "FAQ", "common questions about setup, numbers, channels and the AI"),
    link("/call", "Talk to Zara", "a one-minute voice call with RingPost's own AI assistant, in the browser"),
    "",
    "## Industries",
    link("/industries", "All industries", `RingPost is set up for ${TYPES.length} kinds of local business`),
    ...TYPES.filter((t) => !isSparse(t)).map((t) => link(`/industries/${slugFor(t)}`, `AI receptionist for ${pluralFor(t)}`)),
    link(`/industries/${SOMETHING_ELSE.slug}`, "Any other local business"),
    "",
    "## Blog",
    ...allPosts().map((p) => link(`/resources/blog/${p.slug}`, p.title, p.description)),
    "",
    "## Company",
    link("/about", "About"),
    link("/contact", "Contact", "reach the RingPost team"),
    ...LEGAL_LINKS.map((l) => link(l.href, l.name)),
    "",
    "## Optional",
    link("/llms-full.txt", "Full site text", "every page above as plain text, in one file"),
    "",
  ].join("\n");

  return new Response(text, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
