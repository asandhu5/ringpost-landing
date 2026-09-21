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
  { name: "FAQ", href: "#faq" },
  { name: "Pricing", href: "/pricing" },
] as const;

export const PRICING = {
  currency: "$",
  setup: { amount: 1699, label: "One-time setup", caption: "Paid once, before anything goes live." },
  monthly: { amount: 899, label: "Then monthly", caption: "Everything below, every month. No free trial, no contract, cancel any time." },
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
