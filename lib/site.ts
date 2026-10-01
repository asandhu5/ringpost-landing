/**
 * ─────────────────────────────────────────────────────────────
 *  RINGPOST — SITE CONFIG
 *  The company's public identity lives here, once. The entity name, the contact
 *  email and the canonical host are read by every page that needs them, so they
 *  cannot drift apart.
 * ─────────────────────────────────────────────────────────────
 */

/**
 * The operating company. The name must read exactly the same on /about, /contact, the
 * footer, the legal pages and the Organization structured data: a reviewer (Meta
 * Business Verification, Google OAuth) who finds it written two ways has a reason to
 * reject.
 *
 * OWNER TO CONFIRM before this is published: the exact registered form of the name.
 *
 * NO STREET ADDRESS, EVER. The registered address is a residential apartment. It must
 * not appear anywhere on this site, in metadata or in structured data. The entity name
 * and a working email address satisfy every verification requirement that applies.
 */
export const COMPANY = {
  legalName: "RINGPOST (SMC-PRIVATE) LIMITED",
  /**
   * PLACEHOLDER — the owner supplies this when incorporation completes. While it is
   * null nothing is shown. Never invent one or infer one from anywhere.
   */
  registrationNumber: null as string | null,
  city: "Islamabad, Pakistan",
  governingLaw: "Pakistan",
} as const;

/**
 * The one email address the site shows, and only on /contact (owner decision 2026-09-30).
 * admin@ is live on Titan. The legal pages point to /contact instead of naming a mailbox.
 */
export const PRIMARY_EMAIL = "admin@ringpost.tech";

/**
 * Where business owners sign up and log in: the dashboard app, a separate deployment
 * from this marketing site. Set NEXT_PUBLIC_DASHBOARD_URL per environment (it is read at
 * build time); the fallback is the production dashboard.
 */
export const DASHBOARD_URL = (process.env.NEXT_PUBLIC_DASHBOARD_URL || "https://app.ringpost.tech").replace(/\/$/, "");
export const LOGIN_URL = `${DASHBOARD_URL}/login`;
export const SIGNUP_URL = `${DASHBOARD_URL}/signup`;

/** The platform API, which hosts the website assistant (chat and voice). */
export const API_URL = (process.env.NEXT_PUBLIC_RINGPOST_API_URL || process.env.NEXT_PUBLIC_API_URL || "https://api.ringpost.tech").replace(/\/$/, "");

export const SITE = {
  name: "RingPost",
  tagline: "The AI front desk for local businesses",
  description:
    "RingPost is an AI front desk for local businesses. It answers calls, texts, WhatsApp, Instagram, Messenger and email around the clock, books appointments into your calendar, then posts to your socials, replies to comments and asks happy customers for reviews.",
  /**
   * The host the site actually serves. The apex (ringpost.tech) 308-redirects to www,
   * so canonicals, og:url and the sitemap all use www (checked 2026-09-30).
   */
  url: "https://www.ringpost.tech",
  year: new Date().getFullYear(),
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

