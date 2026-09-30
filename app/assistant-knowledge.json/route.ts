import { allPosts } from "@/lib/blog";
import { CHANNELS, SOCIAL_PLATFORMS } from "@/lib/content/channels";
import { FAQ } from "@/lib/content/faq";
import { DEEP, MODE_LABELS, SOMETHING_ELSE, TYPES, bookingFor, escalationsFor, pluralFor, rulesFor, slugFor } from "@/lib/content/industries";
import { AUTOMATIONS, GUARDRAILS, HOW_IT_WORKS } from "@/lib/content/platform";
import { PILLARS, PRODUCTS } from "@/lib/content/products";
import { FEATURE_LABELS, PLANS, SHOW_AI_VIDEO, TOP_UPS, TRIAL, USAGE_WARNING_PERCENT, plansWithLabel } from "@/lib/plans";
import { COMPANY, LEGAL_LINKS, PUBLISHED_MAILBOXES, SITE } from "@/lib/site";

/**
 * The website assistant's grounding (brief §9.11), generated at build time from the same
 * content modules the pages render, so the assistant can never describe the product
 * differently from the site. The platform API (apps/api website-assistant) fetches this
 * file, fetches the seven legal pages listed in `legalPages` and reads their text, and
 * takes prices from its own copy of plans.ts. Nothing here is hand-written for the model.
 */
export const dynamic = "force-static";

interface KnowledgePage {
  path: string;
  title: string;
  text: string;
}

function productPages(): KnowledgePage[] {
  return PRODUCTS.map((p) => ({
    path: `/product/${p.slug}`,
    title: p.name,
    text: [
      `${p.hero.headline} ${p.hero.lede}`,
      ...p.sections.map((s) => `${s.heading}: ${s.body}${s.points ? ` (${s.points.join("; ")})` : ""}`),
      `Plans: ${p.plans.map((row) => `${row.label}: ${plansWithLabel(row.feature)}`).join(". ")}.`,
      ...(p.faq ?? []).map((f) => `Q: ${f.q} A: ${f.a}`),
    ].join("\n"),
  }));
}

function industryPages(): KnowledgePage[] {
  return [
    ...TYPES.map((t) => ({
      path: `/industries/${slugFor(t)}`,
      title: `AI receptionist for ${pluralFor(t)}`,
      text: [
        `Group: ${t.group}. How it sells: ${t.modes.map((m) => MODE_LABELS[m]).join(", ")}. Also called: ${t.aliases.join(", ") || "none"}.`,
        `Customers ask: ${t.suggestedQuestions.join(" | ")}`,
        `Rules the AI never breaks for this trade: ${rulesFor(t).join(" ") || "the general guardrails only"}`,
        `Always handed to the owner: ${escalationsFor(t).join(", ") || "requests for a person, complaints and refunds, like every business"}.`,
        `Booking: ${bookingFor(t)}`,
        ...(DEEP[t.id] ? DEEP[t.id].handling.map((h) => `${h.q}: ${h.a}`) : []),
      ].join("\n"),
    })),
    { path: `/industries/${SOMETHING_ELSE.slug}`, title: "Something else", text: `Businesses not in the list choose "Something else" and answer three questions: ${SOMETHING_ELSE.questions.join(" ")}` },
  ];
}

export function GET() {
  const pages: KnowledgePage[] = [
    {
      path: "/",
      title: "Home",
      text: [
        SITE.description,
        ...Object.values(PILLARS).map((p) => `${p.name}: ${p.line}. ${p.lede}`),
        `How it works: ${HOW_IT_WORKS.map((s) => `${s.title}: ${s.body}`).join(" ")}`,
        `What runs automatically: ${AUTOMATIONS.map((a) => `${a.when}: ${a.title}. ${a.body}`).join(" ")}`,
      ].join("\n"),
    },
    {
      path: "/product",
      title: "AI Front Desk and guardrails",
      text: [GUARDRAILS.headline, GUARDRAILS.lede, ...GUARDRAILS.rules.map((r) => `${r.title}: ${r.body}`), ...GUARDRAILS.extras, `When unsure it says: "${GUARDRAILS.fallbackLine}"`].join("\n"),
    },
    ...productPages(),
    {
      path: "/channels",
      title: "Channels",
      text: [
        ...CHANNELS.map((c) => `${c.name} (${c.availableToBusinesses ? "available to businesses on every plan" : "not available for a business's own website today"}). Arrives: ${c.arrives} The AI: ${c.aiDoes} The owner sees: ${c.ownerSees} Setup: ${c.setup}`),
        `Social publishing (Growth and Command Center): ${SOCIAL_PLATFORMS.join(", ")}.`,
      ].join("\n"),
    },
    {
      path: "/pricing",
      title: "Pricing",
      text: [
        "There is no setup fee of any kind.",
        ...PLANS.map(
          (p) =>
            `${p.name}: $${p.monthlyUsd}/month. ${p.tagline} ${p.minutesPerMonth} calling minutes and ${p.messagesPerMonth} messages a month, ${p.imagesPerDay} AI images a day${p.promptExtrasPerWeek.images ? ` plus ${p.promptExtrasPerWeek.images} more a week on request` : ""}. Includes: ${p.features.filter((f) => SHOW_AI_VIDEO || f !== "prompt_generation").map((f) => FEATURE_LABELS[f]).join(", ") || "answering every channel, booking, reminders, review requests and daily images"}.`,
        ),
        `Free trial: ${TRIAL.days} days on every plan, card required, nothing charged at the start. ${TRIAL.minutesPerDay} calling minutes a day (unused carry over, up to ${TRIAL.maxMinutes}) and ${TRIAL.messages} messages for the week. The plan bills on day ${TRIAL.days + 1} unless cancelled. A business that already had a trial starts billed straight away.`,
        `Going over a monthly allowance never stops the service. A warning comes at ${USAGE_WARNING_PERCENT}%. Top-ups are only added when the owner clicks: ${TOP_UPS.filter((t) => SHOW_AI_VIDEO || t.metric !== "videos").map((t) => `${t.label} $${t.priceUsd}`).join(", ")}.`,
        SHOW_AI_VIDEO ? "" : "AI video generation is not offered on the website at the moment; do not describe video allowances.",
      ].join("\n"),
    },
    { path: "/faq", title: "FAQ", text: FAQ.map((f) => `Q: ${f.q} A: ${f.a}`).join("\n") },
    {
      path: "/about",
      title: "About",
      text: `RingPost is a product of ${COMPANY.legalName}. It does not publish a postal address. Today RingPost does not: give businesses a website chat for their own website; connect WhatsApp or email without help from the team; provide phone numbers outside the US and Canada.`,
    },
    {
      path: "/contact",
      title: "Contact",
      text: `To reach a person, use the form on /contact (it goes to the RingPost team) or email ${PUBLISHED_MAILBOXES.map((m) => `${m.address} (${m.label.toLowerCase()})`).join(", ")}.`,
    },
    ...industryPages(),
    { path: "/resources/blog", title: "Blog", text: allPosts().map((p) => `${p.title}: ${p.description} (/resources/blog/${p.slug})`).join("\n") },
    { path: "/resources/case-studies", title: "Case studies", text: "There are no case studies yet. They will be published once real customers agree to be named." },
    { path: "/demo", title: "Demo", text: "Chat with RingPost's assistant or have a one-minute voice call in the browser." },
  ];

  return Response.json({
    version: 1,
    site: SITE.url,
    company: COMPANY.legalName,
    generatedAt: new Date().toISOString(),
    pages,
    legalPages: LEGAL_LINKS.map((l) => ({ path: l.href, title: l.name })),
    links: [...new Set([...pages.map((p) => p.path), ...LEGAL_LINKS.map((l) => l.href), "/industries", "/resources", "/about", "/contact", "/demo", "/pricing"])].sort(),
  });
}
