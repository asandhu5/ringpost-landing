import type { Feature } from "@/lib/plans";

/**
 * The nine product pages. Every sentence here describes something the product does
 * today, checked against the platform code (file references in comments), and every
 * "which plans" line reads the plan catalog rather than naming a plan by hand.
 *
 * The website assistant is grounded on this same text (app/assistant-knowledge.json).
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
  /** Short line for cards and the nav panel. */
  summary: string;
  /** Page title and the phrase the page is written to rank for. */
  title: string;
  searchPhrase: string;
  description: string;
  hero: { eyebrow: string; headline: string; lede: string };
  sections: ProductSection[];
  /** Feature gates, in the order shown. `null` = on every plan. */
  plans: { label: string; feature: Feature | null }[];
  /** A real dashboard screenshot in /public/screens, when one exists. */
  screenshot?: { src: string; alt: string; caption: string };
  faq?: { q: string; a: string }[];
}

export const PILLARS: Record<Pillar, { name: string; line: string; lede: string }> = {
  answer: {
    name: "Answer",
    line: "It answers everything",
    lede: "Calls, texts, WhatsApp, Instagram, Messenger and email, around the clock, from your own prices and hours. And it books the appointment.",
  },
  grow: {
    name: "Grow",
    line: "Then it goes and gets you more",
    lede: "Fresh posts for your socials, replies to comments, a review request after every visit, campaigns for the occasions that matter, and a way back to customers who drifted away.",
  },
  understand: {
    name: "Understand",
    line: "And it tells you what's happening",
    lede: "Where customers come from, how your reviews and posts are doing, and an advisor that reads your own business data and answers questions about it in plain language.",
  },
};

export const PRODUCTS: Product[] = [
  // ── ANSWER ────────────────────────────────────────────────────────────────
  {
    slug: "ai-receptionist",
    pillar: "answer",
    name: "AI receptionist",
    summary: "A natural voice answers every call, day or night, and books during the call.",
    title: "AI receptionist that answers every call and books appointments",
    searchPhrase: "AI receptionist",
    description:
      "RingPost's AI receptionist answers your business phone day and night, knows your services, prices and hours, books during the call, texts back missed callers and hands over to you when a person is needed.",
    hero: {
      eyebrow: "AI receptionist",
      headline: "Every call answered. Even the ones you can't reach.",
      lede: "A natural-sounding voice picks up when you can't: during a job, after hours, on the weekend. It knows your services, prices and hours because it reads them from your own business information, and it books the appointment while the caller is still on the line.",
    },
    sections: [
      {
        heading: "It knows your business, not a script",
        body: "Before it says a price, a time or an opening hour, it looks it up in your business information: your services and prices, your hours, your policies, your calendar. If a caller asks something your information doesn't cover, it says it will check and takes a message rather than guessing.",
      },
      {
        heading: "It books during the call",
        body: "It checks your real availability, offers times that are actually free, and books the one the caller picks. The booking is only confirmed to the caller once it has actually been made; a reply that claims a booking the system didn't make is stopped before it's spoken.",
      },
      {
        heading: "Missed calls get a reply in seconds",
        body: "If a call goes unanswered, RingPost texts the caller back from your business number so the conversation carries on by text, where the AI answers like any other message. If you switch on AI callbacks, it can call them back instead. Anyone who has asked not to be contacted is never called or texted back.",
      },
      {
        heading: "It knows when to hand over",
        body: "Some calls need a person. When a caller asks for one, or something is urgent for your kind of business (a gas smell for a plumber, a dental emergency for a clinic), it tells the caller what happens next and alerts you straight away.",
        points: [
          "Keep your own number and forward calls to RingPost, or get a new local number",
          "US and Canadian numbers, searched near your area code",
          "It introduces itself as your virtual assistant and never claims to be human",
        ],
      },
    ],
    plans: [{ label: "Answering calls, booking and missed-call text-back", feature: null }],
    screenshot: { src: "/screens/inbox.png", alt: "The RingPost inbox showing a call handled by the AI", caption: "Calls and messages land in one inbox. Sample data." },
    faq: [
      {
        q: "Can I keep my existing phone number?",
        a: "Yes. You can forward your existing number to RingPost (only the calls you miss, or every call) and the dashboard gives you the exact code to dial for your phone company. Or pick a new local number in the dashboard.",
      },
      {
        q: "Will callers know it's an AI?",
        a: "Its standard greeting introduces it as your business's virtual assistant, and it never claims to be a person, even if asked. That's the honest thing to do and, in many places, a legal requirement.",
      },
    ],
  },
  {
    slug: "inbox",
    pillar: "answer",
    name: "Unified inbox",
    summary: "Every channel in one place, with a clear view of what needs you.",
    title: "One inbox for calls, texts, WhatsApp, Instagram, Messenger and email",
    searchPhrase: "unified inbox for small business",
    description:
      "Phone, SMS, WhatsApp, Instagram, Messenger and email in one inbox. See what the AI is handling and what needs you, and take over any conversation mid-thread.",
    hero: {
      eyebrow: "Inbox",
      headline: "Every conversation. One place. You're always in charge.",
      lede: "Calls, texts, WhatsApp, Instagram and Messenger DMs and email all land in one inbox on your phone or computer. The AI answers them; you can see exactly what it said, and step in whenever you want.",
    },
    sections: [
      {
        heading: "\"Needs you\" is one tap away",
        body: "Conversations the AI has passed to you (a request for a person, something urgent, a question it couldn't answer from your information) are gathered under Needs you, with a count on the tab so nothing waits unseen.",
      },
      {
        heading: "Take over any conversation",
        body: "Reply in any thread and the AI stands down in that conversation. It stays quiet until you hand it back, or until a period you choose in Settings passes without you replying (1 to 48 hours, or never).",
      },
      {
        heading: "Every customer, one record",
        body: "Each customer has one record across channels: their conversations, bookings and how they like to be contacted. Someone who asked not to be contacted is marked and never messaged.",
      },
    ],
    plans: [{ label: "The inbox and taking over conversations", feature: null }],
    screenshot: { src: "/screens/inbox.png", alt: "The RingPost inbox with the Needs you filter", caption: "The inbox, with a hand-back to AI. Sample data." },
  },
  {
    slug: "booking",
    pillar: "answer",
    name: "Booking and calendar",
    summary: "Live availability, two-way Google Calendar sync, and reminders.",
    title: "AI appointment booking with two-way Google Calendar sync",
    searchPhrase: "AI appointment booking",
    description:
      "RingPost books, reschedules and cancels appointments by conversation from your live availability, syncs both ways with Google Calendar and sends a reminder before each visit.",
    hero: {
      eyebrow: "Booking",
      headline: "Booked, moved or cancelled, in the conversation.",
      lede: "Customers book, reschedule and cancel just by asking, on any channel. RingPost only offers times that are genuinely free, and it never tells a customer something is booked, moved or cancelled unless it actually happened.",
    },
    sections: [
      {
        heading: "Two-way Google Calendar sync",
        body: "Connect Google Calendar and every booking RingPost takes appears on it. Your own events (a supplier visit, a school run) block those times, so the AI never offers a slot you've already filled. If Google can't be reached while it's connected, the AI waits rather than offering a time it can't check.",
      },
      {
        heading: "No double-booking",
        body: "Each booking is checked against each staff member's own appointments, including buffers, at the moment it's made. Two customers asking for the same slot at once can't both get it.",
      },
      {
        heading: "Reminders before the visit",
        body: "Each booking gets a reminder before the visit on the customer's own channel, timed in your business's time zone. A reply to the reminder (\"can I move it?\") lands in the same conversation, where the AI can see what it's replying to.",
      },
      {
        heading: "Cancellations stay on the record",
        body: "When a booking is cancelled it disappears from your Google Calendar and stays in your dashboard as a record, so the slot opens up again without losing the history.",
      },
    ],
    plans: [
      { label: "Booking, rescheduling, cancelling and reminders", feature: null },
      { label: "Google Calendar sync", feature: null },
    ],
    screenshot: { src: "/screens/calendar.png", alt: "The RingPost calendar with the week's bookings", caption: "The calendar. Sample data." },
  },
  {
    slug: "knowledge",
    pillar: "answer",
    name: "Business knowledge",
    summary: "Paste your website or upload a menu, and it reads your business.",
    title: "Teach your AI receptionist your business from your website or a PDF",
    searchPhrase: "AI that learns your business",
    description:
      "Paste your website address or upload a PDF such as a menu or price list. RingPost reads your services, prices, hours, policies and FAQs, and flags what's missing for you to fill in.",
    hero: {
      eyebrow: "Knowledge",
      headline: "Paste your website. It reads your business.",
      lede: "Give RingPost your website address, or upload a PDF (a menu, a price list, a brochure). It reads your services and prices, hours, policies and common questions, fills in your Knowledge page, and tells you plainly what it couldn't find.",
    },
    sections: [
      {
        heading: "It reads what's really there",
        body: "Websites built with modern site builders often send almost no text until a browser runs them. RingPost also reads the structured information those pages carry, and follows the site's page list, so it gets more than an empty shell. Scanned PDFs are read page by page, and it's told to transcribe only what's printed.",
      },
      {
        heading: "Gaps are flagged, never filled in",
        body: "If a page couldn't be read, or a file had no prices in it, the Knowledge page says so in plain words and lists what's still missing. It never invents a price or an opening time to fill a gap. An invented price is worse than a missing one.",
      },
      {
        heading: "Your type of business carries its own rules",
        body: "Choose your type of business (48 trades, or \"something else\") and your AI picks up that trade's own rules: what it must never do, what it passes straight to you, and what it should ask a customer.",
        points: ["Services and prices", "Opening hours", "Policies: cancellation, deposits, call-out fees", "Common questions and their answers"],
      },
    ],
    plans: [{ label: "Reading your website and PDFs", feature: null }],
    screenshot: { src: "/screens/knowledge.png", alt: "The RingPost knowledge page", caption: "The Knowledge page. Sample data." },
  },

  // ── GROW ──────────────────────────────────────────────────────────────────
  {
    slug: "social",
    pillar: "grow",
    name: "Social posts",
    summary: "Fresh posts every morning from your own services, published when you approve.",
    title: "AI social media posts for local businesses, made every morning",
    searchPhrase: "AI social media posts for local business",
    description:
      "RingPost makes fresh, on-brand images for your posts every morning from your own services and prices. Approve and publish to Instagram, Facebook and more, reply to comments, and run campaigns for occasions.",
    hero: {
      eyebrow: "Social",
      headline: "Something fresh to post, every morning.",
      lede: "Every morning RingPost makes new on-brand images for your socials from your own services and prices, with your logo, so your feed doesn't go quiet the week you're busiest. Nothing goes out until you say so.",
    },
    sections: [
      {
        heading: "Made from your business, every day",
        body: "Once you switch it on, new images arrive each morning, up to your plan's daily allowance, built from what you actually sell. You can also ask for images whenever you want.",
      },
      {
        heading: "Approve, schedule or post now",
        body: "Posts wait in Approvals. Pick a time (it suggests the next good hour for your kind of business in your time zone) or post straight away. Switch on autopilot and posts can go out on their own, but only after passing the content check that blocks claims your trade must never make, such as \"guaranteed results\".",
        points: ["Instagram and Facebook", "TikTok, YouTube, X, LinkedIn, Threads and Pinterest"],
      },
      {
        heading: "Replies to comments",
        body: "When someone comments on one of your posts, RingPost drafts a reply in your voice for you to approve. Switch on comment autopilot and replies go out straight away. New comments are checked every half hour.",
      },
      {
        heading: "Campaigns for occasions",
        body: "Two days before an occasion you've switched on, a campaign is drafted and waiting, with captions for each platform, so you're never writing a holiday post at midnight.",
      },
      {
        heading: "Your own photos and videos",
        body: "Upload your own photos and videos from your phone, including large videos. RingPost checks each one and polishes your caption, and you approve it before it posts.",
      },
    ],
    plans: [
      { label: "Fresh AI images every day", feature: null },
      { label: "Publishing to your social accounts, autopilot", feature: "auto_posting" },
      { label: "Your own photo and video uploads", feature: "uploads" },
      { label: "Replies to comments", feature: "comment_replies" },
      { label: "Campaigns for occasions", feature: "campaigns" },
    ],
    screenshot: { src: "/screens/approvals.png", alt: "RingPost approvals with schedule and post now", caption: "Approvals: schedule or post now. Sample data." },
  },
  {
    slug: "reviews",
    pillar: "grow",
    name: "Reviews",
    summary: "A review request after every visit, and Google reviews answered.",
    title: "Get more Google reviews and reply to them with AI",
    searchPhrase: "AI review management for local business",
    description:
      "RingPost asks every customer for a review after a completed visit, with a private option to tell you directly, and drafts replies to your Google reviews for you to approve.",
    hero: {
      eyebrow: "Reviews",
      headline: "Every visit ends with an ask. Every review gets an answer.",
      lede: "After a completed visit RingPost thanks the customer and asks for a review, with a link to your public review page and a private way to tell you directly. And every new Google review gets a reply drafted in your voice.",
    },
    sections: [
      {
        heading: "The same ask, to every customer",
        body: "Every completed visit gets the same message: a public review link, and a private feedback link for anyone who'd rather tell you directly. It is never sent only to customers who seem happy. Asking only happy customers for public reviews (\"review gating\") breaks Google's rules, so RingPost doesn't do it, whatever the setting.",
      },
      {
        heading: "Private feedback lands in your inbox",
        body: "Feedback sent through the private link arrives in your inbox like any other message, so you can put things right.",
      },
      {
        heading: "Google reviews read and answered",
        body: "Connect your Google Business Profile and new reviews are fetched every night. RingPost drafts a reply in your voice, and nothing is posted under your name until you've read it and approved it.",
      },
    ],
    plans: [
      { label: "Review requests with a private feedback option", feature: null },
      { label: "Google reviews read, with replies drafted", feature: "reviews" },
    ],
    screenshot: { src: "/screens/reviews.png", alt: "RingPost reviews with a drafted reply", caption: "Reviews and drafted replies. Sample data." },
  },
  {
    slug: "winback",
    pillar: "grow",
    name: "Win-back",
    summary: "Find customers who haven't been back, and bring them in.",
    title: "Win back lapsed customers with AI-written texts",
    searchPhrase: "customer win-back texts",
    description:
      "RingPost finds customers who haven't been back in a while and drafts a text that fits your business. You choose who gets it and press send; only customers who agreed to marketing texts are included.",
    hero: {
      eyebrow: "Win-back",
      headline: "The customers who drifted away, brought back.",
      lede: "RingPost lists the customers who haven't visited in a while (90 days unless you change it), drafts a text from your idea in your own voice, and sends it to the people you pick.",
    },
    sections: [
      {
        heading: "You choose who, and when",
        body: "Nothing goes out by itself. You see the list, the message and who can't receive it and why (no mobile number, hasn't agreed to marketing texts, asked not to be contacted, or already messaged this week), then press send.",
      },
      {
        heading: "Only people who agreed",
        body: "Win-back texts are marketing, so only customers who opted in to marketing texts are included, and anyone who has asked not to be contacted is never selected.",
      },
      {
        heading: "See what came back",
        body: "Your dashboard shows how many win-back messages were sent and how many of those customers came back.",
      },
    ],
    plans: [{ label: "Win-back texts", feature: "winback" }],
  },

  // ── UNDERSTAND ────────────────────────────────────────────────────────────
  {
    slug: "insights",
    pillar: "understand",
    name: "Insights",
    summary: "Where customers come from, how reviews and posts are doing, what keeps coming up.",
    title: "Business insights from your calls, messages, reviews and posts",
    searchPhrase: "small business insights dashboard",
    description:
      "See which channels customers use, your review trend and reply rate, how your posts performed and which win-backs worked, plus weekly patterns from your reviews with the evidence behind each one.",
    hero: {
      eyebrow: "Insights",
      headline: "What's working, in plain numbers.",
      lede: "Which channels your customers use, how your reviews are trending and how fast you answer them, how each post performed, and which win-backs brought people back.",
    },
    sections: [
      {
        heading: "Patterns, with receipts",
        body: "Each week RingPost looks for things that keep coming up in your reviews. It only calls something a pattern once it has come up several times, and every insight links to the exact reviews behind it, so you can check it yourself.",
      },
      {
        heading: "How every post did",
        body: "Views and engagement for each published post, pulled from the platforms every six hours, with a link straight to the post. When a platform doesn't share numbers, it says so rather than showing zeros.",
      },
      {
        heading: "What customers ask that you haven't answered",
        body: "When the AI meets a question your business information doesn't cover, it notes the topic, and your Knowledge page lists these gaps so you can fill them.",
      },
    ],
    plans: [
      { label: "Activity overview and knowledge gaps", feature: null },
      { label: "Business insights", feature: "insights" },
      { label: "Social media post insights", feature: "post_insights" },
    ],
    screenshot: { src: "/screens/home.png", alt: "The RingPost dashboard home", caption: "The dashboard home. Sample data." },
  },
  {
    slug: "advisor",
    pillar: "understand",
    name: "Talk to AI",
    summary: "An advisor that reads your own business data and answers in plain language.",
    title: "Talk to AI: a business advisor that reads your own data",
    searchPhrase: "AI business advisor",
    description:
      "Talk to AI is an advisor for business owners. Ask it about your own business and it answers in plain language from your real conversations, bookings activity, reviews and insights, never from guesswork.",
    hero: {
      eyebrow: "Talk to AI",
      headline: "Ask your business a question. Get a straight answer.",
      lede: "\"Why were last month's reviews worse?\" \"What do people keep asking that we don't answer?\" \"What should I post this week?\" Talk to AI reads your own business data and answers like an advisor who has been paying attention.",
    },
    sections: [
      {
        heading: "Your numbers, not general advice",
        body: "Every figure it's allowed to use comes from a snapshot of your own business taken for that conversation: recent activity, conversations, bookings, reviews and their trend, recurring themes and your current insights. If the data isn't there, it tells you, instead of making up a number.",
      },
      {
        heading: "Separate from your customers",
        body: "Talk to AI is for you, not your customers. It runs separately from the receptionist that talks to them, with its own rules, and nothing you ask it is ever sent to a customer.",
      },
      {
        heading: "Questions owners actually ask",
        body: "What's changed since last month. Which channel brings the most enquiries. What the complaints have in common. What to do about the slow day of the week. It answers in plain language.",
      },
    ],
    plans: [{ label: "Talk to AI", feature: "advisor" }],
    screenshot: { src: "/screens/advisor.png", alt: "Talk to AI answering an owner's question", caption: "Talk to AI. Sample data." },
  },
];

export function productBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function productsIn(pillar: Pillar): Product[] {
  return PRODUCTS.filter((p) => p.pillar === pillar);
}
