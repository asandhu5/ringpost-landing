import { allPosts } from "@/lib/blog";
import { CHANNELS, SOCIAL_PLATFORMS } from "@/lib/content/channels";
import { FAQ } from "@/lib/content/faq";
import { DEEP, MODE_LABELS, SOMETHING_ELSE, TYPES, bookingFor, escalationsFor, pluralFor, rulesFor, slugFor } from "@/lib/content/industries";
import { AUTOMATIONS, GUARDRAILS, HOW_IT_WORKS } from "@/lib/content/platform";
import { PILLARS, PRODUCTS, productHref } from "@/lib/content/products";
import { POST_TARGETS } from "@/lib/content/posting-demo";
import { FEATURE_LABELS, PLANS, SHOW_AI_VIDEO, TOP_UPS, USAGE_WARNING_PERCENT, plansWithLabel } from "@/lib/plans";
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
    path: productHref(p),
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
        `Social publishing (Growth and Pro; Starter and Essential answer calls and messages only): ${SOCIAL_PLATFORMS.join(", ")}.`,
      ].join("\n"),
    },
    {
      path: "/content-studio",
      title: "Content Studio",
      text: [
        "Content Studio turns a phone photo or one line into a finished image or video post. It builds the brief from the business's own knowledge: services and prices, hours and offers, brand voice and words to avoid, logo and colours, up to three reference photos, the website and what customers ask.",
        "Every piece is safety-checked before it is made, then RingPost adds the logo and words (offers, prices, phone number) itself and reads them back to check. Finished pieces land in the Media Library; picking one sends it to Approvals. A failed piece gets its credits back automatically.",
        "Daily content: up to three pictures a day and a 30-second video each week (three ten-second shots), depending on the plan, paid from monthly credits only, never top-ups. Making images and videos comes with Growth and Pro.",
      ].join("\n"),
    },
    {
      path: "/posting",
      title: "Posting and uploads",
      text: [
        `RingPost posts to ${POST_TARGETS.map((t) => `${t.name} (${t.note})`).join(", ")}, from the business's own connected accounts. TikTok and YouTube Shorts take videos only.`,
        "Owners upload their own photos (up to 20 MB) and videos (up to 100 MB) as JPEG, PNG, WEBP, HEIC, MP4 or MOV; uploads resume after a dropped connection, are made ready for every app, safety-checked, and a short note becomes a caption for each platform.",
        "Each platform gets its own caption. Every post waits in Approvals unless autopilot is on; then it is posted now or scheduled. RingPost suggests a good hour for the trade and nudges the owner if a post is still waiting 12 hours before its time. Each platform has its own result, so one that failed can be retried alone.",
      ].join("\n"),
    },
    {
      path: "/pricing",
      title: "Pricing",
      text: [
        "There is no setup fee of any kind.",
        ...PLANS.map(
          (p) =>
            `${p.name}: $${p.monthlyUsd}/month. ${p.tagline} ${p.minutesPerMonth} calling minutes and ${p.messagesPerMonth} messages a month, up to ${p.bookableStaff} bookable staff, call forwarding from the business's own number, ${p.mediaCreditsPerMonth ? `${p.mediaCreditsPerMonth.toLocaleString("en-US")} media credits a month for AI images${SHOW_AI_VIDEO ? " and videos" : ""}` : "no AI images or social posting (calls and messages only)"}. Includes: ${p.features.filter((f) => SHOW_AI_VIDEO || f !== "prompt_generation").map((f) => FEATURE_LABELS[f]).join(", ") || "answering every channel, booking, reminders, review requests and daily images"}.`,
        ),
        "There is no free trial. A business signs up, can look around the whole dashboard, and switches the AI on by choosing a plan, billed that day and then monthly. Plans start with Starter.",
        "Media credits pay for AI images and videos: the owner picks quick image, best image, quick video or cinematic video and sees the price in credits first. Credits for a generation that fails come back automatically. Monthly credits renew with the plan; top-up credits last 90 days.",
        `Going over a monthly allowance for calls or messages never stops the service. A warning comes at ${USAGE_WARNING_PERCENT}%. Top-ups are only added when the owner clicks: ${TOP_UPS.map((t) => `${t.label} $${t.priceUsd}`).join(", ")}.`,
        SHOW_AI_VIDEO ? "" : "AI video generation is not offered on the website at the moment; do not describe video allowances.",
      ].join("\n"),
    },
    { path: "/faq", title: "FAQ", text: FAQ.map((f) => `Q: ${f.q} A: ${f.a}`).join("\n") },
    {
      path: "/about",
      title: "About",
      text: `RingPost is a product of ${COMPANY.legalName}. It does not publish a postal address. Today RingPost does not: offer a chat for a business's own website (don't suggest one); connect WhatsApp without help from the team; provide phone numbers outside the US and Canada; post to Snapchat.`,
    },
    {
      path: "/contact",
      title: "Contact",
      text: `To reach a person, use the form on /contact (it goes to the RingPost team) or email ${PRIMARY_EMAIL}. The email address is shown only on /contact.`,
    },
    ...industryPages(),
    { path: "/resources/blog", title: "Blog", text: allPosts().map((p) => `${p.title}: ${p.description} (/resources/blog/${p.slug})`).join("\n") },
  ];
}
