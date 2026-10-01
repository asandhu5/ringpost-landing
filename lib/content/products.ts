import type { Feature } from "@/lib/plans";

/**
 * The product pages. Every sentence describes something the product does today, checked
 * against the platform code. Copy is deliberately short: one idea per section.
 *
 * `plans` is NOT shown on these pages (plan availability lives on /pricing only); it
 * feeds Zara, the website assistant, through app/assistant-knowledge.json.
 */

export type Pillar = "answer" | "grow" | "understand";

export interface ProductSection {
  heading: string;
  body: string;
  points?: string[];
}

export interface Product {
  slug: string;
  pillar: Pillar;
  name: string;
  /** One line for cards and menus. */
  summary: string;
  /** Page title: the phrase the page is written to rank for. */
  title: string;
  description: string;
  hero: { headline: string; lede: string };
  sections: ProductSection[];
  /** Feature gates for Zara's knowledge. `null` = every plan. Never rendered. */
  plans: { label: string; feature: Feature | null }[];
  /** A real dashboard screenshot in /public/screens, shown when the file exists. */
  screen?: { src: string; alt: string };
  faq?: { q: string; a: string }[];
}

export const PILLARS: Record<Pillar, { name: string; line: string; lede: string }> = {
  answer: {
    name: "Answer",
    line: "It answers everything",
    lede: "Calls, texts, WhatsApp, Instagram, Messenger and email, day and night. It books the appointment too.",
  },
  grow: {
    name: "Grow",
    line: "Then it wins you more",
    lede: "Fresh posts, replies to comments, a review request after every visit, and a way back to customers who drifted.",
  },
  understand: {
    name: "Understand",
    line: "And shows you what's working",
    lede: "Where customers come from, how reviews and posts are doing, and an advisor you can ask anything.",
  },
};

export const PRODUCTS: Product[] = [
  // ── ANSWER ────────────────────────────────────────────────────────────────
  {
    slug: "ai-receptionist",
    pillar: "answer",
    name: "AI receptionist",
    summary: "Answers every call, day or night, and books while the caller is on the line.",
    title: "AI receptionist that answers every call and books appointments",
    description: "RingPost's AI receptionist answers your business calls day and night, quotes your real prices and hours, books during the call and texts back anyone it missed.",
    hero: {
      headline: "Every call answered. Even the ones you can't reach.",
      lede: "A natural voice picks up when you can't. It knows your prices and hours, and books the appointment on the call.",
    },
    sections: [
      { heading: "Knows your business", body: "It reads your services, prices, hours and calendar before it answers. If something isn't in your information, it takes a message instead of guessing." },
      { heading: "Books on the call", body: "It offers times that are actually free and confirms a booking only once it's made." },
      { heading: "Texts back missed callers", body: "A missed call gets a text from your number within seconds, and the conversation carries on by text." },
      {
        heading: "Hands over when it should",
        body: "When a caller asks for a person, or something is urgent for your trade, it tells them what happens next and alerts you.",
        points: ["Keep your number and forward it, or get a new local one", "US and Canadian numbers", "Introduces itself as your virtual assistant"],
      },
    ],
    plans: [{ label: "Answering calls, booking and missed-call text-back", feature: null }],
    screen: { src: "/screens/calls.webp", alt: "The RingPost calls page with answered calls and their outcomes" },
    faq: [
      { q: "Can I keep my existing number?", a: "Yes. Forward it to RingPost, only the calls you miss or every call. The dashboard shows the exact code to dial and tests it. Or pick a new local number." },
      { q: "Will callers know it's an AI?", a: "Yes. It introduces itself as your virtual assistant and never claims to be a person." },
    ],
  },
  {
    slug: "inbox",
    pillar: "answer",
    name: "Unified inbox",
    summary: "Every channel in one inbox, with what needs you on top.",
    title: "One inbox for calls, texts, WhatsApp, Instagram, Messenger and email",
    description: "Calls, texts, WhatsApp, Instagram, Messenger and email in one inbox. See what the AI is handling and what needs you, and take over any conversation.",
    hero: {
      headline: "Every conversation in one place.",
      lede: "The AI answers every channel. You see everything it said, and can step in whenever you like.",
    },
    sections: [
      { heading: "What needs you, first", body: "Requests for a person, urgent topics and anything the AI couldn't answer are gathered under Needs you." },
      { heading: "Take over any time", body: "Reply in a conversation and the AI steps back until you hand it back, or until a time you choose." },
      { heading: "One record per customer", body: "Every conversation and booking for a customer in one place, whichever channel they used." },
    ],
    plans: [{ label: "The inbox and taking over conversations", feature: null }],
    screen: { src: "/screens/inbox.webp", alt: "The RingPost inbox with conversations from several channels" },
  },
  {
    slug: "booking",
    pillar: "answer",
    name: "Booking and calendar",
    summary: "Live availability, two-way Google Calendar sync and reminders.",
    title: "AI appointment booking with two-way Google Calendar sync",
    description: "RingPost books, moves and cancels appointments from your live availability, syncs both ways with Google Calendar and sends reminders before each visit.",
    hero: {
      headline: "Booked, moved or cancelled, right in the conversation.",
      lede: "Customers book by asking. RingPost only offers times that are really free, and never claims a booking it didn't make.",
    },
    sections: [
      { heading: "Two-way Google Calendar sync", body: "Bookings appear on your calendar, and your own events block those times." },
      { heading: "No double-booking", body: "Each staff member's appointments are checked at the moment of booking, buffers included." },
      { heading: "Reminders before the visit", body: "Sent on the customer's own channel, in your time zone. Replies land in the same conversation." },
      { heading: "Cancellations kept on record", body: "A cancelled booking leaves your calendar and stays in your dashboard's history." },
    ],
    plans: [
      { label: "Booking, rescheduling, cancelling and reminders", feature: null },
      { label: "Google Calendar sync", feature: null },
    ],
    screen: { src: "/screens/calendar.webp", alt: "The RingPost calendar with a week of bookings" },
  },
  {
    slug: "knowledge",
    pillar: "answer",
    name: "Business knowledge",
    summary: "Paste your website or upload a menu. It reads your business.",
    title: "Teach your AI receptionist your business from your website or a PDF",
    description: "Paste your website or upload a PDF. RingPost reads your services, prices, hours, policies and FAQs, and flags what's missing.",
    hero: {
      headline: "Paste your website. It learns your business.",
      lede: "RingPost reads your site or a PDF, fills in your services, prices, hours and policies, and tells you what's missing.",
    },
    sections: [
      { heading: "Reads what's really there", body: "Modern website builders and scanned menus included. It copies what's written and never invents it." },
      { heading: "Gaps flagged, not filled", body: "Anything it couldn't find is listed for you to add. A missing price beats a made-up one." },
      { heading: "Rules for your trade", body: "Pick your type of business and your AI follows that trade's rules and hand-offs.", points: ["Services and prices", "Opening hours", "Policies", "Common questions"] },
    ],
    plans: [{ label: "Reading your website and PDFs", feature: null }],
    screen: { src: "/screens/knowledge.webp", alt: "The RingPost knowledge page with services and prices" },
  },

  // ── GROW ──────────────────────────────────────────────────────────────────
  {
    slug: "ai-media",
    pillar: "grow",
    name: "AI images and video",
    summary: "On-brand images and short videos, with your real prices and logo.",
    title: "AI images and videos for your business's social media",
    description: "RingPost makes on-brand images and short videos from your own services. Your logo, prices and phone number are added by code and checked, never drawn by the AI.",
    hero: {
      headline: "Posts worth sharing, with the right prices on them.",
      lede: "Type one line, or let RingPost pick from what you sell. You get an image or short video with your logo and real price, checked before you see it.",
    },
    sections: [
      { heading: "One line in, a proper brief out", body: "Your idea becomes a photographer's brief for your kind of business before anything is made." },
      { heading: "Prices added by code", body: "The AI makes the picture. Your logo, price, phone number and offer are printed on afterwards, then read back to check." },
      { heading: "Checked before and after", body: "Every idea is safety-checked first, with your trade as context. Anything that can't be checked is held for you." },
      { heading: "Every morning, or when you ask", body: "Fresh images and videos arrive daily, up to your allowance, and land in your media library first.", points: ["Short videos made from your images", "Sized for every platform", "Your logo, colours and tone"] },
    ],
    plans: [
      { label: "AI images and videos every day, up to your plan's allowance", feature: null },
      { label: "Extra images and videos on request each week", feature: "prompt_generation" },
      { label: "Publishing them to your social accounts", feature: "auto_posting" },
    ],
    screen: { src: "/screens/media.webp", alt: "The RingPost media library with generated images" },
    faq: [
      { q: "Can the AI put the wrong price on an image?", a: "No. Prices come from your own price list and are added by code, then read back to confirm." },
      { q: "Do I have to post everything?", a: "No. Everything goes to your media library first. You choose what to post, and when." },
    ],
  },
  {
    slug: "uploads",
    pillar: "grow",
    name: "Your photos and videos",
    summary: "Upload from your phone. It fixes the format and polishes your caption.",
    title: "Post your own photos and videos, ready for every platform",
    description: "Upload photos up to 20 MB and videos up to 100 MB from your phone. RingPost converts them for every platform, checks them and polishes your caption.",
    hero: {
      headline: "Your real work, posted properly.",
      lede: "Upload straight from your phone and add a quick note. RingPost makes it ready for every platform, with a caption in your voice.",
    },
    sections: [
      { heading: "Straight from your phone", body: "Photos up to 20 MB, videos up to 100 MB. Uploads resume if your connection drops." },
      { heading: "Fixed for every platform", body: "iPhone photos converted and turned upright. Videos made into the format Instagram, Facebook and TikTok accept." },
      { heading: "Your note, polished", body: "A quick note becomes a caption for each platform, written from your words." },
      { heading: "Checked, then approved by you", body: "Every upload is safety-checked. Campaigns use your real photos first." },
    ],
    plans: [
      { label: "Uploading your own photos and videos", feature: "uploads" },
      { label: "Captions polished for each platform", feature: "uploads" },
    ],
    screen: { src: "/screens/uploads.webp", alt: "Uploading photos and videos in the RingPost media library" },
  },
  {
    slug: "social",
    pillar: "grow",
    name: "Social posting",
    summary: "Schedule or post now to eight platforms, with replies to comments.",
    title: "Schedule and publish social media posts, with AI replies to comments",
    description: "Publish to Instagram, Facebook, TikTok, YouTube, X, LinkedIn, Threads and Pinterest. Schedule or post now, reply to comments and run campaigns for occasions.",
    hero: {
      headline: "Your feed, kept busy. You stay in charge.",
      lede: "Approve a post, then schedule it for a good hour or post it now, to eight platforms at once.",
    },
    sections: [
      { heading: "Schedule or post now", body: "It suggests the next good hour for your trade. Nothing posts without approval unless you turn on autopilot.", points: ["Instagram and Facebook", "TikTok, YouTube, X, LinkedIn, Threads and Pinterest"] },
      { heading: "Replies to comments", body: "New comments get a reply drafted in your voice, checked every half hour." },
      { heading: "Campaigns for occasions", body: "Two days before an occasion you've chosen, a campaign is ready with captions for each platform." },
      { heading: "Reminders, not surprises", body: "A post still waiting 12 hours before its time gets you a nudge." },
    ],
    plans: [
      { label: "Publishing to your social accounts, schedule or post now", feature: "auto_posting" },
      { label: "Replies to comments", feature: "comment_replies" },
      { label: "Campaigns for occasions", feature: "campaigns" },
      { label: "How each post performed", feature: "post_insights" },
    ],
    screen: { src: "/screens/approvals.webp", alt: "RingPost approvals with schedule and post now" },
  },
  {
    slug: "reviews",
    pillar: "grow",
    name: "Reviews",
    summary: "A review request after every visit, and Google reviews answered.",
    title: "Get more Google reviews and reply to them with AI",
    description: "RingPost asks every customer for a review after their visit, with a private feedback option, and drafts replies to your Google reviews.",
    hero: {
      headline: "Every visit ends with an ask. Every review gets a reply.",
      lede: "After each visit, customers get your review link and a private way to talk to you. New Google reviews get a reply drafted in your voice.",
    },
    sections: [
      { heading: "The same ask for everyone", body: "Every customer gets the same message. Asking only happy customers breaks Google's rules, so RingPost never does." },
      { heading: "Private feedback, straight to you", body: "Feedback through the private link arrives in your inbox." },
      { heading: "Google reviews answered", body: "New reviews arrive nightly with a reply drafted. Nothing is posted until you approve it." },
    ],
    plans: [
      { label: "Review requests with a private feedback option", feature: null },
      { label: "Google reviews read, with replies drafted", feature: "reviews" },
    ],
    screen: { src: "/screens/reviews.webp", alt: "RingPost reviews with the replies sent" },
  },
  {
    slug: "winback",
    pillar: "grow",
    name: "Win-back",
    summary: "Find customers who haven't been back, and invite them in.",
    title: "Win back lapsed customers with AI-written texts",
    description: "RingPost finds customers who haven't been back and drafts a text in your voice. You choose who gets it; only customers who opted in are included.",
    hero: {
      headline: "Bring back the customers who drifted.",
      lede: "See who hasn't been back in a while, get a text drafted in your voice, and send it to the people you choose.",
    },
    sections: [
      { heading: "You choose who", body: "Nothing sends itself. You see the list and the message, then press send." },
      { heading: "Only people who agreed", body: "Only customers who opted in to marketing texts are included." },
      { heading: "See who came back", body: "Your dashboard shows how many came back after the message." },
    ],
    plans: [{ label: "Win-back texts", feature: "winback" }],
    screen: { src: "/screens/winback.webp", alt: "Choosing customers for a win-back text in RingPost" },
  },

  // ── UNDERSTAND ────────────────────────────────────────────────────────────
  {
    slug: "insights",
    pillar: "understand",
    name: "Insights",
    summary: "Where customers come from, and what keeps coming up.",
    title: "Business insights from your calls, messages, reviews and posts",
    description: "See which channels customers use, your review trend, how posts performed and what keeps coming up in reviews, with the evidence behind it.",
    hero: {
      headline: "What's working, in plain numbers.",
      lede: "Channels, reviews, posts and win-backs in one view, with weekly patterns you can check yourself.",
    },
    sections: [
      { heading: "Patterns with proof", body: "Something only counts as a pattern once it comes up several times, and each one links to the reviews behind it." },
      { heading: "How every post did", body: "Views and engagement for each post, updated every six hours." },
      { heading: "Questions you haven't answered", body: "Topics customers asked about that your information doesn't cover yet." },
    ],
    plans: [
      { label: "Activity overview and knowledge gaps", feature: null },
      { label: "Business insights", feature: "insights" },
      { label: "Social media post insights", feature: "post_insights" },
    ],
    screen: { src: "/screens/home.webp", alt: "The RingPost dashboard overview" },
  },
  {
    slug: "advisor",
    pillar: "understand",
    name: "Talk to AI",
    summary: "An advisor that reads your business data and answers plainly.",
    title: "Talk to AI: a business advisor that reads your own data",
    description: "Ask about your business and get a plain answer from your own conversations, bookings, reviews and insights.",
    hero: {
      headline: "Ask your business a question.",
      lede: "\"Why were last month's reviews worse?\" Talk to AI reads your own data and answers like an advisor who's been paying attention.",
    },
    sections: [
      { heading: "Your numbers, not guesses", body: "It works from your recent activity, bookings, reviews and insights. If the data isn't there, it says so." },
      { heading: "Just for you", body: "It's separate from the AI your customers talk to. Nothing you ask is ever sent to a customer." },
    ],
    plans: [{ label: "Talk to AI", feature: "advisor" }],
    screen: { src: "/screens/advisor.webp", alt: "Talk to AI answering an owner's question" },
  },
];

export function productBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function productsIn(pillar: Pillar): Product[] {
  return PRODUCTS.filter((p) => p.pillar === pillar);
}
