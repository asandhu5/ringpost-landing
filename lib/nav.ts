import { GROUP_INFO } from "@/lib/content/groups";
import { LEGAL_LINKS } from "@/lib/site";
import { ROUTES } from "@/lib/routes";

/**
 * The site's menus: Product ▾ · Industries ▾ · Pricing · Contact. Company, blog, FAQ and
 * legal pages live in the footer only.
 */
export interface NavLink {
  name: string;
  href: string;
  summary?: string;
  /** A channel or platform id: the menu shows its real logo. */
  logo?: string;
  /** A lucide icon name (see ICONS in components/site/nav.tsx). */
  icon?: string;
}

export const INDUSTRY_MENU: NavLink[] = GROUP_INFO.map((g) => ({ name: g.name, href: `/industries/${g.slug}`, summary: g.tagline, icon: g.icon }));

export const LEGAL_NAV: NavLink[] = LEGAL_LINKS.map((l) => ({ name: l.name, href: l.href }));

/* ── The 2026-11-12 menu: Product ▾ · Industries ▾ · Pricing · Contact ───────────── */

export type ProductArea = "answer" | "create" | "grow";

export interface ProductColumn {
  area: ProductArea;
  title: string;
  blurb: string;
  links: NavLink[];
}

/** One panel, three columns, the same card for every offering. */
export const PRODUCT_COLUMNS: ProductColumn[] = [
  {
    area: "answer",
    title: "Answer",
    blurb: "Every customer gets a reply.",
    links: [
      { name: "Calls", href: ROUTES.calls, summary: "Every call answered. Missed calls called back.", icon: "Phone" },
      { name: "Messages", href: ROUTES.messages, summary: "WhatsApp, Instagram DMs, Messenger, texts, email.", icon: "MessagesSquare" },
      { name: "One inbox", href: ROUTES.inbox, summary: "Every conversation in one place. Step in any time.", icon: "Inbox" },
      { name: "Bookings & calendar", href: ROUTES.booking, summary: "Booked on the spot, synced with Google Calendar.", icon: "CalendarCheck" },
      { name: "Business Brain", href: ROUTES.brain, summary: "Tell it once. Everything runs from it.", icon: "BrainCircuit" },
    ],
  },
  {
    area: "create",
    title: "Create",
    blurb: "Your content, made and posted.",
    links: [
      { name: "Content Studio", href: ROUTES.studio, summary: "Images and short videos from one idea.", icon: "Sparkles" },
      { name: "Posting", href: ROUTES.posting, summary: "One post, the right way for each app.", icon: "Send" },
    ],
  },
  {
    area: "grow",
    title: "Grow",
    blurb: "More customers, coming back.",
    links: [
      { name: "Reviews & comments", href: ROUTES.reviews, summary: "Answered in your voice, after your OK.", icon: "Star" },
      { name: "Win-back", href: ROUTES.winback, summary: "Bring back customers who went quiet.", icon: "RotateCcw" },
      { name: "Campaigns", href: ROUTES.campaigns, summary: "Plan an offer once. Send it everywhere.", icon: "Megaphone" },
      { name: "Insights", href: ROUTES.insights, summary: "What's working, in plain words.", icon: "ChartNoAxesCombined" },
      { name: "Talk to AI", href: ROUTES.talk, summary: "Ask about your business. Get a straight answer.", icon: "Bot" },
    ],
  },
];

export const INDUSTRY_TILES: NavLink[] = GROUP_INFO.map((g) => ({ name: g.name, href: `/industries/${g.slug}`, icon: g.icon }));

export const FOOTER_COMPANY: NavLink[] = [
  { name: "About", href: ROUTES.about },
  { name: "Contact", href: ROUTES.contact },
  { name: "Blog", href: ROUTES.blog },
  { name: "FAQ", href: ROUTES.faq },
  { name: "Pricing", href: ROUTES.pricing },
];
