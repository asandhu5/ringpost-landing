import { GROUP_INFO } from "@/lib/content/groups";
import { LEGAL_LINKS } from "@/lib/site";

/**
 * The site's menus (2026-11-04): Channels, then Content Studio (making and posting), then
 * Grow (reviews, comments, win-back, insights, Talk to AI), then Industries and Pricing.
 * Company and resources live in the footer only.
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

export const CHANNEL_MENU: NavLink[] = [
  { name: "Phone calls", href: "/channels/phone", summary: "Every call answered in a natural voice, and booked.", logo: "phone" },
  { name: "WhatsApp", href: "/channels/whatsapp", summary: "Replies in seconds on the app your customers use most.", logo: "whatsapp" },
  { name: "Instagram", href: "/channels/instagram", summary: "DMs turned into bookings, day and night.", logo: "instagram" },
  { name: "Facebook Messenger", href: "/channels/messenger", summary: "Every Page message answered and booked.", logo: "messenger" },
  { name: "Text messages", href: "/channels/sms", summary: "Texts answered, reminders sent, STOP honoured.", logo: "sms" },
  { name: "Email", href: "/channels/email", summary: "Customer emails answered in the same thread.", logo: "email" },
];

export const CHANNEL_EXTRAS: NavLink[] = [
  { name: "One inbox for everything", href: "/product/inbox", summary: "Every channel in one place. Step in any time.", icon: "Inbox" },
  { name: "Bookings and calendar", href: "/product/booking", summary: "Booked on the call, synced with Google Calendar.", icon: "CalendarCheck" },
  { name: "Your business knowledge", href: "/product/knowledge", summary: "It answers from your own prices, hours and policies.", icon: "BookOpen" },
];

export const CONTENT_MENU: NavLink[] = [
  { name: "Content Studio", href: "/content-studio", summary: "Images and short videos made for your business, every day.", icon: "Sparkles" },
  { name: "Your photos and videos", href: "/product/uploads", summary: "Upload from your phone. It polishes and captions them.", icon: "Camera" },
];

export const GROW_MENU: NavLink[] = [
  { name: "Reviews and comments", href: "/product/reviews", summary: "Google reviews and comments answered, in your voice.", icon: "MessageSquareHeart" },
  { name: "Win-back", href: "/product/winback", summary: "Bring back customers who haven't been in for a while.", icon: "UsersRound" },
  { name: "Insights", href: "/product/insights", summary: "Where customers come from, and what keeps coming up.", icon: "ChartNoAxesCombined" },
  { name: "Talk to AI", href: "/product/advisor", summary: "Ask about your business and get a straight answer.", icon: "Bot" },
];

export const INDUSTRY_MENU: NavLink[] = GROUP_INFO.map((g) => ({ name: g.name, href: `/industries/${g.slug}`, summary: g.tagline, icon: g.icon }));

export const RESOURCES_NAV: NavLink[] = [
  { name: "Blog", href: "/resources/blog", summary: "On missed calls, messaging and what an AI front desk should never say." },
  { name: "FAQ", href: "/faq", summary: "Pricing, channels, your data." },
];

export const COMPANY_NAV: NavLink[] = [
  { name: "About", href: "/about", summary: "What we're building, for whom, and who we are." },
  { name: "Contact", href: "/contact", summary: "Ask our assistant, or reach a person." },
];

export const LEGAL_NAV: NavLink[] = LEGAL_LINKS.map((l) => ({ name: l.name, href: l.href }));

export const POSTING_MENU: NavLink[] = [{ name: "Posting", href: "/posting", summary: "Captions, platforms, post now and scheduling.", icon: "Send" }];
