import { PLANS, TOP_UPS, TRIAL, USAGE_WARNING_PERCENT, num, usd } from "@/lib/plans";

/**
 * The one FAQ source. /faq renders all of it, the homepage renders the entries marked
 * `home`, and the FAQPage structured data is generated from the same array, so the
 * visible answer and the marked-up answer can never differ.
 */

export interface FaqItem {
  q: string;
  a: string;
  group: "Getting started" | "Pricing and billing" | "How it works" | "Your data";
  home?: boolean;
  /** A page to read more on. */
  link?: { href: string; label: string };
}

const planLine = PLANS.map((p) => `${p.name} at ${usd(p.monthlyUsd)} a month`).join(", ");

export const FAQ: FaqItem[] = [
  {
    group: "Pricing and billing",
    home: true,
    q: "What does it cost?",
    a: `Three plans: ${planLine}. There's no setup fee and no contract. Every plan starts with a ${TRIAL.days}-day free trial, and you can cancel any time.`,
    link: { href: "/pricing", label: "See what's in each plan" },
  },
  {
    group: "Pricing and billing",
    home: true,
    q: "How does the free trial work?",
    a: `You choose a plan and add a card; nothing is charged today. The trial gives you ${TRIAL.minutesPerDay} calling minutes a day (unused minutes carry over, up to ${TRIAL.maxMinutes}) and ${num(TRIAL.messages)} messages for the week. Cancel before day ${TRIAL.days + 1} and you pay nothing; otherwise your plan starts on day ${TRIAL.days + 1}, month to month.`,
    link: { href: "/pricing", label: "Pricing" },
  },
  {
    group: "Pricing and billing",
    q: "What happens if I go over my allowance?",
    a: `Your service never stops. You get a heads-up at ${USAGE_WARNING_PERCENT}% of an allowance, and top-ups (${TOP_UPS.filter((t) => t.metric === "minutes" || t.metric === "messages")
      .map((t) => `${t.label.toLowerCase()} for ${usd(t.priceUsd)}`)
      .join(", ")}) are only ever added when you click to buy one.`,
    link: { href: "/pricing", label: "Top-ups" },
  },
  {
    group: "Pricing and billing",
    q: "Can I cancel?",
    a: "Yes, any time, from the dashboard. There's no contract and no cancellation fee. Cancelling during the free trial means you're never charged.",
    link: { href: "/refund-policy", label: "Refund policy" },
  },
  {
    group: "Getting started",
    home: true,
    q: "Do I have to change my phone number?",
    a: "No. You can keep your number and forward calls to RingPost (only the calls you miss, or every call); the dashboard shows you the exact code to dial for your phone company and tests that it works. Or pick a new local US or Canadian number.",
    link: { href: "/product/ai-receptionist", label: "AI receptionist" },
  },
  {
    group: "Getting started",
    q: "How long does it take to set up?",
    a: "You can set it up yourself in the dashboard: paste your website so it reads your business, get or forward a number, and try it yourself before any customer does. Connecting WhatsApp and email takes a little longer, because they need details from your own accounts.",
  },
  {
    group: "Getting started",
    q: "Which businesses is it for?",
    a: "Local businesses that live on calls, messages and bookings: salons and clinics, trades and home services, restaurants, gyms, professional services and more. There are 48 business types with their own rules, and a \"something else\" option for everything else.",
    link: { href: "/industries", label: "Industries" },
  },
  {
    group: "How it works",
    home: true,
    q: "What happens if it doesn't know the answer?",
    a: "It says so. It won't guess a price, a time, a phone number or a link. It tells the customer the team will reply, passes the conversation to you and alerts you. The question is also noted so you can add the answer to your Knowledge page.",
    link: { href: "/product", label: "How the guardrails work" },
  },
  {
    group: "How it works",
    home: true,
    q: "Does it work with Instagram and WhatsApp?",
    a: "Yes. RingPost works with Instagram and Facebook Messenger (connect them from the dashboard with your Facebook login) and with WhatsApp (connecting it needs a WhatsApp Business account, and the team walks you through it). It also answers calls, texts and email.",
    link: { href: "/channels", label: "All channels" },
  },
  {
    group: "How it works",
    q: "Will my customers know they're talking to an AI?",
    a: "Yes. Its standard greeting introduces it as your business's virtual assistant, and it never claims to be a person. We don't pretend a machine is a human, and we'd steer you away from any setup that did.",
    link: { href: "/ai-disclosure", label: "Recording & AI disclosure" },
  },
  {
    group: "How it works",
    q: "Can I take over a conversation?",
    a: "Any time. Reply in a thread and the AI stops replying in that conversation until you hand it back, or until a period you choose passes without you replying.",
    link: { href: "/product/inbox", label: "The inbox" },
  },
  {
    group: "How it works",
    home: true,
    q: "Does it post to my socials without asking?",
    a: "Not unless you switch on autopilot. Posts wait for your approval, and you choose to schedule them or post straight away. With autopilot on, posts still have to pass a content check that blocks claims your kind of business must never make.",
    link: { href: "/product/social", label: "Social posts" },
  },
  {
    group: "Your data",
    q: "Who owns my customer data?",
    a: "You do. Your customers, conversations and bookings are processed to run the service for you. The companies involved in running the platform are named in the privacy policy.",
    link: { href: "/privacy", label: "Privacy policy" },
  },
  {
    group: "Your data",
    q: "Can I delete my data?",
    a: "Yes. How to delete your account and your customers' data, and what happens to it, is set out on the data deletion page.",
    link: { href: "/data-deletion", label: "Data deletion" },
  },
];

export const HOME_FAQ = FAQ.filter((f) => f.home);
