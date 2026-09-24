/**
 * ─────────────────────────────────────────────────────────────
 *  RINGPOST — SITE CONFIG
 *  Change the values here and every "Book a call" button,
 *  footer link and contact reference on the site updates.
 * ─────────────────────────────────────────────────────────────
 */

/**
 * TODO: replace with a real scheduling link (Cal.com / Calendly / etc.).
 * Until one exists this stays a mailto: so the CTA still does something
 * real rather than dead-ending — but a one-click scheduler converts far
 * better than asking someone to compose an email.
 */
export const BOOKING_URL =
  "mailto:support@ringpost.tech?subject=Book%20a%20call%20with%20RingPost";

/**
 * The operating company. The name is reserved with the SECP (Pakistan) and appears on
 * every legal page and the footer. No registration number is shown until the company
 * is incorporated, and no street address is published.
 */
export const COMPANY = {
  legalName: "RingPost (SMC-Private) Limited",
  city: "Islamabad, Pakistan",
  governingLaw: "Pakistan",
} as const;

/** General enquiries. Deliverable via the verified ringpost.tech domain. */
export const CONTACT_EMAIL = "hello@ringpost.tech";

/** Legal/account/privacy questions — the address named in the legal pages. */
export const SUPPORT_EMAIL = "support@ringpost.tech";

/**
 * Where business owners sign up and log in: the dashboard app, a separate deployment
 * from this marketing site. Set NEXT_PUBLIC_DASHBOARD_URL per environment (it is read at
 * build time); the fallback is the production dashboard.
 */
export const DASHBOARD_URL = (process.env.NEXT_PUBLIC_DASHBOARD_URL || "https://app.ringpost.tech").replace(/\/$/, "");
export const LOGIN_URL = `${DASHBOARD_URL}/login`;
export const SIGNUP_URL = `${DASHBOARD_URL}/signup`;

export const SITE = {
  name: "RingPost",
  tagline: "AI front-desk software for local service businesses",
  description:
    "RingPost answers your calls, texts, WhatsApp, Instagram, Messenger, email and website chat 24/7, books real appointments, replies to reviews, and makes and posts your social content. Built for local service businesses.",
  url: "https://ringpost.tech",
  year: new Date().getFullYear(),
} as const;

export const NAV_LINKS = [
  { name: "Features", href: "#features" },
  { name: "How it works", href: "#how-it-works" },
  { name: "Channels", href: "#channels" },
  { name: "Business tools", href: "#marketing" },
  { name: "Plans", href: "#plans" },
  { name: "FAQ", href: "#faq" },
  { name: "Pricing", href: "/pricing" },
] as const;

/**
 * The locked pricing (2026-09-23). Mirrors packages/core/src/billing/plans.ts in the
 * product repo — change both together. Never say "unlimited": every plan shows its
 * real numbers.
 */
export type PlanId = "front_desk" | "growth" | "command_center";

export interface Plan {
  id: PlanId;
  name: string;
  monthly: number;
  tagline: string;
  minutes: number;
  messages: number;
  images: string;
  videos: string;
  highlight?: boolean;
}

export const PRICING = {
  currency: "$",
  setup: { amount: 499, label: "One-time setup", caption: "Paid once, the same on every plan. Your 7-day free trial starts the moment it is paid." },
  trial: { days: 7, minutesPerDay: 20, maxMinutes: 140, messages: 200 },
  setupCredit: { amount: 249.5, afterDays: 60 },
  plans: [
    {
      id: "front_desk",
      name: "Front Desk",
      monthly: 499,
      tagline: "Every call and message answered, and a steady stream of posts.",
      minutes: 400,
      messages: 1500,
      images: "2 AI images a day",
      videos: "1 AI video a week",
    },
    {
      id: "growth",
      name: "Growth",
      monthly: 999,
      tagline: "Front Desk, plus your own uploads, auto-posting with captions and Talk to AI.",
      minutes: 650,
      messages: 3000,
      images: "4 AI images a day",
      videos: "1 AI video a day",
      highlight: true,
    },
    {
      id: "command_center",
      name: "Command Center",
      monthly: 1399,
      tagline: "The whole front of house: campaigns, reviews, insights and win-backs.",
      minutes: 1000,
      messages: 5000,
      images: "4 AI images a day + 10 extra a week on request",
      videos: "1 AI video a day + 3 extra a week on request",
    },
  ] as Plan[],
  /** Which plan a feature starts on — used for the badges on the homepage. */
  featurePlan: {
    uploads: "Growth",
    autoPosting: "Growth",
    advisor: "Growth",
    commentReplies: "Command Center",
    campaigns: "Command Center",
    insights: "Command Center",
    postInsights: "Command Center",
    reviews: "Command Center",
    winback: "Command Center",
  },
  topUps: [
    { label: "100 extra calling minutes", price: 15 },
    { label: "1,000 extra messages", price: 10 },
    { label: "20 extra images", price: 12 },
    { label: "5 extra videos", price: 18 },
  ],
  comparison: { receptionistMonthly: 2800, averageBookingValue: 150 },
} as const;

export const LEGAL_LINKS = [
  { name: "Privacy", href: "/privacy" },
  { name: "Terms", href: "/terms" },
  { name: "Acceptable use", href: "/acceptable-use" },
  { name: "Data processing", href: "/data-processing" },
  { name: "Recording & AI", href: "/ai-disclosure" },
  { name: "Data deletion", href: "/data-deletion" },
  { name: "Refunds", href: "/refund-policy" },
] as const;
