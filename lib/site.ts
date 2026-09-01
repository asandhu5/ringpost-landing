/**
 * ─────────────────────────────────────────────────────────────
 *  RINGPOST — SITE CONFIG
 *  Change these two values and every "Book a call" button,
 *  footer link and contact reference on the site updates.
 * ─────────────────────────────────────────────────────────────
 */

/** TODO: replace with your real scheduling link (Cal.com / Calendly / etc.) */
export const BOOKING_URL = "mailto:hello@ringpost.com?subject=Book%20a%20call%20with%20RingPost";

/** TODO: replace with your real inbox */
export const CONTACT_EMAIL = "hello@ringpost.com";

export const SITE = {
  name: "RingPost",
  tagline: "The AI front desk for local business",
  description:
    "RingPost answers every call, text, and message for your local business 24/7, books real appointments into your calendar, and handles your marketing — all from one dashboard.",
  year: new Date().getFullYear(),
} as const;

export const NAV_LINKS = [
  { name: "Features", href: "#features" },
  { name: "How it works", href: "#how-it-works" },
  { name: "Channels", href: "#channels" },
  { name: "Marketing", href: "#marketing" },
  { name: "Trust", href: "#trust" },
] as const;
