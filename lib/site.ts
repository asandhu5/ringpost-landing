/**
 * ─────────────────────────────────────────────────────────────
 *  RINGPOST — SITE CONFIG
 *  The company's public identity lives here, once. The entity name, the published
 *  mailboxes and the canonical host are read by every page, the footer, the legal
 *  pages and the structured data, so they cannot drift apart.
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
 * and working email addresses satisfy every verification requirement that applies.
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
 * Every mailbox the site could publish. Only `confirmed: true` ones appear on /contact,
 * in the footer and in structured data: a published address that bounces fails a
 * verification review and loses real enquiries.
 *
 * admin@ is live on Titan. hello@ and support@ are NOT yet confirmed to receive mail —
 * create them (or aliases of admin@) in Titan, send a test to each, then flip the flag.
 */
export const MAILBOXES = [
  { key: "general", label: "General", address: "hello@ringpost.tech", confirmed: false },
  { key: "support", label: "Support", address: "support@ringpost.tech", confirmed: false },
  { key: "admin", label: "Administration", address: "admin@ringpost.tech", confirmed: true },
] as const;

export const PUBLISHED_MAILBOXES = MAILBOXES.filter((m) => m.confirmed);

/** The best address to show where one address is needed: support if it is live, else admin. */
export const PRIMARY_EMAIL = (MAILBOXES.find((m) => m.key === "support" && m.confirmed) ?? MAILBOXES.find((m) => m.key === "admin")!).address;

/**
 * Named in the seven legal pages, which are published exactly as reviewed and must not
 * be reworded. They still name these two mailboxes, so both MUST be confirmed to receive
 * mail before this site is deployed (see MAILBOXES above).
 */
export const CONTACT_EMAIL = "hello@ringpost.tech";
export const SUPPORT_EMAIL = "support@ringpost.tech";

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

/**
 * ⚠ LEGAL PAGES ONLY. The refund policy renders these figures inside wording that was
 * reviewed and must be published unchanged (brief §9.0). They describe the one-time setup
 * fee and day-60 credit that the product REMOVED on 2026-09-29, so the refund policy and
 * terms now describe a fee that is no longer charged. That wording needs the owner's
 * (and their adviser's) update — see docs/FULL-RUN-REPORT.md in the platform repo.
 *
 * Nothing else on the site may read this. Current prices come from data/plans.json,
 * generated from the product's plans.ts (lib/plans.ts).
 */
export const PRICING = {
  currency: "$",
  setup: { amount: 499 },
  trial: { days: 7 },
  setupCredit: { amount: 249.5, afterDays: 60 },
} as const;
