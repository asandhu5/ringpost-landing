import { PLANS, TOP_UPS, USAGE_WARNING_PERCENT, usd } from "@/lib/plans";

/**
 * The one FAQ source. /faq shows every group except "Pricing and billing", which appears
 * only on /pricing (prices are shown nowhere else). The FAQPage structured data is built
 * from the same entries as the visible answers.
 */

export interface FaqItem {
  q: string;
  a: string;
  group: "Getting started" | "Pricing and billing" | "How it works" | "Your data";
  link?: { href: string; label: string };
}

const planLine = PLANS.map((p) => `${p.name} ${usd(p.monthlyUsd)}`).join(", ");
const staffLine = PLANS.map((p) => `${p.bookableStaff} on ${p.name}`).join(", ");

export const FAQ: FaqItem[] = [
  {
    group: "Pricing and billing",
    q: "What does it cost?",
    a: `Three monthly plans: ${planLine}. No setup fee and no contract. Billed monthly from the day you choose a plan.`,
  },
  {
    group: "Pricing and billing",
    q: "Is there a free trial?",
    a: "No. You can create an account and see the dashboard before you pay. When you choose a plan, your number, connections and AI switch on straight away.",
  },
  {
    group: "Pricing and billing",
    q: "What if I go over my allowance?",
    a: `Your service never stops. You're warned at ${USAGE_WARNING_PERCENT}%, and top-ups (from ${usd(Math.min(...TOP_UPS.map((t) => t.priceUsd)))}) are only added when you buy one.`,
  },
  {
    group: "Pricing and billing",
    q: "How many staff can I have?",
    a: `Bookable staff per plan: ${staffLine}. Turning someone off frees their place.`,
  },
  {
    group: "Pricing and billing",
    q: "Can I cancel?",
    a: "Yes, any time, with no fee. Your plan runs to the end of the month you've paid for and isn't billed again.",
    link: { href: "/refund-policy", label: "Refund policy" },
  },
  {
    group: "Getting started",
    q: "Do I have to change my phone number?",
    a: "No. Forward your number to RingPost (just missed calls, or every call) and the dashboard tests it. Or pick a new local number.",
    link: { href: "/product/ai-receptionist", label: "AI receptionist" },
  },
  {
    group: "Getting started",
    q: "How long does setup take?",
    a: "You can do it yourself: paste your website, get or forward a number, and try your AI before any customer does. WhatsApp takes a little longer.",
  },
  {
    group: "Getting started",
    q: "Which businesses is it for?",
    a: "Local businesses that run on calls, messages and bookings. There are 48 business types with their own rules, plus an option for everything else.",
    link: { href: "/industries", label: "Industries" },
  },
  {
    group: "How it works",
    q: "What if it doesn't know the answer?",
    a: "It says so. It never guesses a price, time or phone number. The chat passes to you and you're alerted.",
    link: { href: "/product#guardrails", label: "The guardrails" },
  },
  {
    group: "How it works",
    q: "Does it work with Instagram and WhatsApp?",
    a: "Yes. Connect Instagram with your Instagram login and Messenger with your Facebook Page. WhatsApp needs a WhatsApp Business account, and we help you connect it.",
    link: { href: "/channels", label: "All channels" },
  },
  {
    group: "How it works",
    q: "How does email work?",
    a: "Your business gets its own RingPost email address. Customers write to it, or you forward your usual mailbox. Replies go out under your business's name.",
    link: { href: "/channels#email", label: "Email" },
  },
  {
    group: "How it works",
    q: "Will customers know it's an AI?",
    a: "Yes. It introduces itself as your virtual assistant and never claims to be a person.",
    link: { href: "/ai-disclosure", label: "AI disclosure" },
  },
  {
    group: "How it works",
    q: "Can I take over a conversation?",
    a: "Any time. Reply and the AI steps back until you hand it back.",
    link: { href: "/product/inbox", label: "The inbox" },
  },
  {
    group: "How it works",
    q: "Does it post without asking?",
    a: "Only if you turn on autopilot. Otherwise every post waits for your approval.",
    link: { href: "/product/social", label: "Social posting" },
  },
  {
    group: "Your data",
    q: "Who owns my customer data?",
    a: "You do. It's used only to run the service for you.",
    link: { href: "/privacy", label: "Privacy policy" },
  },
  {
    group: "Your data",
    q: "Can I delete my data?",
    a: "Yes. The data deletion page explains how.",
    link: { href: "/data-deletion", label: "Data deletion" },
  },
];

export const PRICING_FAQ = FAQ.filter((f) => f.group === "Pricing and billing");
export const SITE_FAQ = FAQ.filter((f) => f.group !== "Pricing and billing");
