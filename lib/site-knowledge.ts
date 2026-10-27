import { allPosts } from "@/lib/blog";
import { CHANNELS, SOCIAL_PLATFORMS } from "@/lib/content/channels";
import { FAQ } from "@/lib/content/faq";
import { DEEP, MODE_LABELS, SOMETHING_ELSE, TYPES, bookingFor, escalationsFor, pluralFor, rulesFor, slugFor } from "@/lib/content/industries";
import { AUTOMATIONS, GUARDRAILS, HOW_IT_WORKS } from "@/lib/content/platform";
import { PILLARS, PRODUCTS } from "@/lib/content/products";
import { FEATURE_LABELS, PLANS, SHOW_AI_VIDEO, TOP_UPS, TRIAL, USAGE_WARNING_PERCENT, plansWithLabel } from "@/lib/plans";
import { COMPANY, PRIMARY_EMAIL, SITE } from "@/lib/site";

/**
 * The whole site as plain text, page by page, built from the same content modules the
 * pages render. Zara's knowledge (/assistant-knowledge.json) and /llms-full.txt both read
 * it, so neither can describe the product differently from the site.
 */
export interface KnowledgePage {
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

export function knowledgePages(): KnowledgePage[] {
  return [
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
        ...CHANNELS.map((c) => `${c.name} (available to businesses on every plan). Arrives: ${c.arrives} The AI: ${c.aiDoes} The owner sees: ${c.ownerSees} Setup: ${c.setup}`),
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
            `${p.name}: $${p.monthlyUsd}/month. ${p.tagline} ${p.minutesPerMonth} calling minutes and ${p.messagesPerMonth} messages a month, up to ${p.bookableStaff} bookable staff, call forwarding from the business's own number, ${p.imagesPerDay} AI images a day${p.promptExtrasPerWeek.images ? ` plus ${p.promptExtrasPerWeek.images} more a week on request` : ""}${SHOW_AI_VIDEO ? `, ${p.videos.count} AI video a ${p.videos.per}${p.promptExtrasPerWeek.videos ? ` plus ${p.promptExtrasPerWeek.videos} more a week on request` : ""}` : ""}. Includes: ${p.features.filter((f) => SHOW_AI_VIDEO || f !== "prompt_generation").map((f) => FEATURE_LABELS[f]).join(", ") || "answering every channel, booking, reminders, review requests and daily images"}.`,
        ),
        `Free trial: ${TRIAL.days} days, no card, once per business. It includes a phone number answered by the AI, ${TRIAL.minutes} calling minutes, ${TRIAL.messages} replies across all channels, and ${TRIAL.postsPerPlatform} posts per connected social account using the owner's own photos and videos (captions written by AI). It does NOT include AI-generated images or videos, daily content, Talk to AI, comment replies, campaigns, reviews, insights or win-backs; the owner can see those pages during the trial. Nothing is charged when it ends. When the minutes run out calls ring the owner's own phone; when the messages run out new ones wait for the owner. The number is kept ${TRIAL.numberKeptDays} days after an unpaid trial ends. Choosing a plan (billed that day, then monthly) starts it straight away.`,
        `Going over a monthly allowance never stops the service. A warning comes at ${USAGE_WARNING_PERCENT}%. Top-ups are only added when the owner clicks: ${TOP_UPS.filter((t) => SHOW_AI_VIDEO || t.metric !== "videos").map((t) => `${t.label} $${t.priceUsd}`).join(", ")}.`,
        SHOW_AI_VIDEO ? "" : "AI video generation is not offered on the website at the moment; do not describe video allowances.",
      ].join("\n"),
    },
    { path: "/faq", title: "FAQ", text: FAQ.map((f) => `Q: ${f.q} A: ${f.a}`).join("\n") },
    {
      path: "/about",
      title: "About",
      text: `RingPost is a product of ${COMPANY.legalName}. It does not publish a postal address. Today RingPost does not: offer a chat for a business's own website (don't suggest one); connect WhatsApp without help from the team; provide phone numbers outside the US and Canada; post to Snapchat or Google Business Profile.`,
    },
    {
      path: "/contact",
      title: "Contact",
      text: `To reach a person, use the form on /contact (it goes to the RingPost team) or email ${PRIMARY_EMAIL}. The email address is shown only on /contact.`,
    },
    ...industryPages(),
    { path: "/resources/blog", title: "Blog", text: allPosts().map((p) => `${p.title}: ${p.description} (/resources/blog/${p.slug})`).join("\n") },
    { path: "/call", title: "Talk to Zara", text: "A one-minute voice call with Zara, RingPost's own AI assistant, in the browser, no phone number needed. The server ends the call after 60 seconds. The Zara chat is in the corner of every page." },
  ];
}
