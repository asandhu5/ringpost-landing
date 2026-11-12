/**
 * Where each offering lives. Every menu, card and link reads its address from here, so
 * moving a page is a one-line change. Old addresses redirect here (next.config.mjs).
 */
export const ROUTES = {
  calls: "/calls",
  messages: "/messages",
  inbox: "/inbox",
  booking: "/booking",
  brain: "/brain",
  studio: "/content-studio",
  posting: "/posting",
  reviews: "/reviews",
  winback: "/win-back",
  campaigns: "/campaigns",
  insights: "/insights",
  talk: "/talk-to-ai",
  industries: "/industries",
  pricing: "/pricing",
  contact: "/contact",
  about: "/about",
  blog: "/resources/blog",
  faq: "/faq",
} as const;
