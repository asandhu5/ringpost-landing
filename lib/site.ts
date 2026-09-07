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
 * Where business owners log in. This is the dashboard app (a separate
 * deployment from this marketing site).
 * TODO: confirm once the dashboard is deployed to its real subdomain.
 */
export const DASHBOARD_URL = "https://app.ringpost.tech";
export const LOGIN_URL = `${DASHBOARD_URL}/login`;

export const SITE = {
  name: "RingPost",
  tagline: "The AI front desk for local business",
  description:
    "RingPost answers every call, text, and message for your local business 24/7, books real appointments into your calendar, and handles your marketing — all from one dashboard.",
  url: "https://ringpost.tech",
  year: new Date().getFullYear(),
} as const;

export const NAV_LINKS = [
  { name: "Features", href: "#features" },
  { name: "How it works", href: "#how-it-works" },
  { name: "Channels", href: "#channels" },
  { name: "Marketing", href: "#marketing" },
  { name: "FAQ", href: "#faq" },
] as const;

export const LEGAL_LINKS = [
  { name: "Privacy", href: "/privacy" },
  { name: "Terms", href: "/terms" },
  { name: "Acceptable use", href: "/acceptable-use" },
  { name: "Data processing", href: "/data-processing" },
  { name: "Recording & AI", href: "/ai-disclosure" },
  { name: "Data deletion", href: "/data-deletion" },
  { name: "Refunds", href: "/refund-policy" },
] as const;
