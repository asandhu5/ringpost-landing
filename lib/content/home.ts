import { ROUTES } from "@/lib/routes";

/**
 * The home page's words. Every claim here is true of the product today (see the truth
 * sheet in docs/PROMPT-WEBSITE-REDESIGN-2026-11-12.md §3). No plan names on this page.
 */
export const HERO = {
  eyebrow: "Your AI business partner",
  headline: ["One AI partner.", "Your whole business."],
  promise: "Tell RingPost about your business once. It answers every call and message, books your customers, makes and posts your content, and helps you grow.",
  primary: "Get started",
  secondary: "See it work",
  /** What the owner tells it: these drift into the ring. */
  inputs: ["Prices", "Opening hours", "Your logo", "Services", "Policies"],
  /** What comes out: at most four, settled around the ring. */
  results: [
    { id: "call", title: "Missed call", body: "Booked Thu 3 pm" },
    { id: "instagram", title: "Instagram DM", body: "Answered, booked" },
    { id: "post", title: "Today's post", body: "Live on 5 apps" },
    { id: "review", title: "Reviews and comments", body: "Answered in your voice" },
  ],
} as const;

export const TELL_ONCE = {
  eyebrow: "Tell it once",
  title: "Five tools want your business details. RingPost needs them once.",
  asks: "Needs your prices, hours and services",
  before: "Today: you explain your business five times",
  after: "With RingPost: you explain it once",
  tools: ["Answering service", "Booking app", "Designer", "Social media manager", "Consultant"],
  core: "Your Business Brain",
  areas: [
    { id: "answer", name: "Answer", line: "Calls and messages" },
    { id: "book", name: "Book", line: "Into your calendar" },
    { id: "create", name: "Create", line: "Images and videos" },
    { id: "post", name: "Post", line: "To every app" },
    { id: "grow", name: "Grow", line: "Reviews, win-back, insights" },
  ],
  steps: [
    { title: "Import your website", body: "Paste the address. It reads your services, prices and hours." },
    { title: "Check what it learned", body: "See it all on one page. Fill any gaps it points out." },
    { title: "Switch on your channels", body: "Pick a phone number. Connect WhatsApp, Instagram and the rest." },
  ],
  note: "Set up in an afternoon, not a month.",
} as const;

export interface InboxThread {
  id: "instagram" | "messenger" | "whatsapp" | "sms" | "email" | "phone";
  /** The channel, in words. */
  label: string;
  short: string;
  who: string;
  /** For a call: the three moments of the call-back. Otherwise the customer's message. */
  customer: string;
  reply: string;
  outcome: string;
  note?: string;
  timeline?: string[];
}

export const INBOX = {
  eyebrow: "Every inbox, answered",
  title: "Calls, Instagram DMs, WhatsApp, Messenger, texts and email. All answered.",
  lede: "Customers write wherever they like. RingPost answers each one in seconds, from your own details, and books them in.",
  proofs: [
    { text: "Answers from your own prices and hours", href: ROUTES.brain },
    { text: "Books into your calendar", href: ROUTES.booking },
    { text: "Step in any time", href: ROUTES.inbox },
  ],
  threads: [
    { id: "instagram", label: "Instagram DM", short: "Instagram", who: "New customer · 9:15 pm", customer: "Hi! How much is a full color, and do you have anything Saturday?", reply: "Hi! A full color starts at $120 and takes about two hours. Saturday I have 10:30 am or 2:00 pm. Which suits you?", outcome: "Booked · Sat 2:00 pm" },
    { id: "messenger", label: "Facebook Messenger", short: "Messenger", who: "New customer · 4:40 pm", customer: "Our boiler just stopped. Can someone come out tonight?", reply: "Sorry to hear that. Yes, the call-out is $89 and I can have someone with you at 6:30 pm tonight. Shall I book it?", outcome: "Booked · Tonight 6:30 pm" },
    { id: "whatsapp", label: "WhatsApp", short: "WhatsApp", who: "New customer · 11:48 pm", customer: "Hi, do you have a table for 4 tomorrow at 8?", reply: "Hi! Yes, we have a table for 4 tomorrow at 8:00 pm. Shall I book it in your name?", outcome: "Booked · Tomorrow 8:00 pm" },
    { id: "sms", label: "Text message", short: "Text", who: "Returning customer · 8:05 am", customer: "Can I move my cleaning to next week?", reply: "Of course. I have Tuesday at 9:00 am or Thursday at 1:30 pm. Which works better?", outcome: "Moved · Tue 9:00 am" },
    { id: "email", label: "Email", short: "Email", who: "New customer · 1:12 pm", customer: "Could I get a price for a full car detail this week?", reply: "Thanks for asking. A full detail is $180 and takes about three hours. Friday at 10:00 am is open. Reply yes and it's yours.", outcome: "Booked · Fri 10:00 am", note: "Replied in the same email thread" },
    { id: "phone", label: "Missed call", short: "Call", who: "New customer · 7:02 am", customer: "", timeline: ["Rang out · 7:02 am", "Called back · 7:03 am", "Booked · 7:05 am"], reply: "Hi, this is the virtual assistant for Golden Hour Hair, returning your call. How can I help?", outcome: "Booked · Thu 3:00 pm" },
  ] as InboxThread[],
} as const;

export const DAY = {
  title: "One day at your business.",
  moments: [
    { id: "call", time: "7:02 am", hour: 7.03, title: "The call you couldn't take", body: "You're with a customer and the phone rings out. RingPost calls straight back, answers from your real prices and books them in." },
    { id: "dm", time: "9:15 am", hour: 9.25, title: "A price question on Instagram", body: "A DM asks what a full color costs. They get your real price, two open times and a booking." },
    { id: "post", time: "12:30 pm", hour: 12.5, title: "A phone photo becomes today's post", body: "You snap the finished job. RingPost makes the post, writes the caption and has it ready for your OK." },
    { id: "review", time: "3:40 pm", hour: 15.67, title: "A two-star review, answered calmly", body: "RingPost drafts a calm reply that sounds like you. Nothing goes out until you say so." },
    { id: "insight", time: "6:00 pm", hour: 18, title: "Your week, read for you", body: "The quiet days, the questions people keep asking, and what to do about them." },
    { id: "night", time: "11:48 pm", hour: 23.8, title: "A WhatsApp at midnight", body: "Someone asks about prices while you sleep. They're booked before morning." },
  ],
} as const;

/** Ten platforms, each with different content in its own shape. Instagram first.
 * Media here is from the existing showcase set; final per-platform media comes in phase 4. */
export const POST_BAND = {
  eyebrow: "Post everywhere",
  title: "Made once. Posted everywhere, the right way for each app.",
  posts: [
    { platform: "instagram", name: "Instagram", format: "Reel", business: { name: "Golden Hour Hair", handle: "goldenhourhair", color: "#db2777" }, caption: "Honey balayage, lived-in and glossy. Two chairs free this Saturday.", media: { kind: "video", src: "/showcase/beauty-video.mp4", poster: "/showcase/beauty-video.webp", alt: "A salon client's finished balayage" } },
    { platform: "tiktok", name: "TikTok", format: "Video", business: { name: "Ironside Gym", handle: "ironsidegym", color: "#ea580c" }, caption: "6am kettlebells. Three spots left this week. #gymtok", media: { kind: "video", src: "/showcase/fitness-video.mp4", poster: "/showcase/fitness-video.webp", alt: "A kettlebell class at a gym" } },
    { platform: "facebook", name: "Facebook", format: "Post", business: { name: "Olive & Ember", handle: "oliveandember", color: "#b45309" }, caption: "Tonight's special is on. Tables from 6 pm; message us to book.", media: { kind: "image", src: "/made/restaurant-dish.webp", alt: "A restaurant's plated dish" } },
    { platform: "youtube", name: "YouTube", format: "Short", business: { name: "Mirror Finish Detailing", handle: "mirrorfinish", color: "#0f172a" }, caption: "Full exterior detail, back to showroom shine in an afternoon.", media: { kind: "video", src: "/showcase/auto-video.mp4", poster: "/showcase/auto-video.webp", alt: "A car being detailed" } },
    { platform: "linkedin", name: "LinkedIn", format: "Post", business: { name: "Ledger & Lane", handle: "ledger-and-lane", color: "#0a66c2" }, caption: "One habit that saves small businesses hours at tax time: keep receipts in one place, weekly. Book a free 20-minute call.", media: { kind: "image", src: "/showcase/pro-post.webp", alt: "An accountant's desk" } },
    { platform: "x", name: "X", format: "Post", business: { name: "The Linden", handle: "thelinden", color: "#0f766e" }, caption: "Breakfast in bed is on us for weekend stays this month.", media: { kind: "image", src: "/showcase/stays-post.webp", alt: "Breakfast in a boutique hotel room" } },
    { platform: "threads", name: "Threads", format: "Post", business: { name: "Corner Cup", handle: "cornercup", color: "#92400e" }, caption: "New on the counter this week. Come say hi before it's gone.", media: { kind: "image", src: "/made/industries/food-cafe.webp", alt: "A café counter" } },
    { platform: "pinterest", name: "Pinterest", format: "Pin", business: { name: "Stem & Story", handle: "stemandstory", color: "#be185d" }, caption: "Peonies are back. Same-day delivery on orders before 2 pm.", media: { kind: "image", src: "/showcase/shops-post.webp", alt: "A florist's peony bouquet" } },
    { platform: "bluesky", name: "Bluesky", format: "Post", business: { name: "Crumb & Co.", handle: "crumbandco", color: "#a16207" }, caption: "Out of the oven at 7. Butter croissants until they're gone.", media: { kind: "image", src: "/showcase/food-post.webp", alt: "Fresh croissants at a bakery" } },
    { platform: "google_business_profile", name: "Google Business", format: "Update", business: { name: "Northline Plumbing", handle: "northline", color: "#1d4ed8" }, caption: "New basin, new tap, same-day fit. Free quotes this week.", media: { kind: "image", src: "/showcase/home-post.webp", alt: "A newly fitted bathroom basin" } },
  ],
} as const;

export const TEASER = {
  eyebrow: "Content Studio",
  title: "Make content in seconds.",
  lede: "Type one line. RingPost makes the image, turns it into a short video and writes the caption, with your logo and your offer on it.",
  prompt: "Saturday color special, warm and bright",
  caption: "Saturday color special. Two chairs free, book by message.",
  image: "/showcase/beauty-post.webp",
  video: "/showcase/beauty-video.mp4",
  alt: "A salon client's glossy new hair color",
} as const;

export const GROW = {
  eyebrow: "Grow",
  title: "Then it helps you grow.",
  tiles: [
    { id: "reviews", name: "Reviews & comments", line: "Answered in your voice, after your OK.", href: ROUTES.reviews },
    { id: "winback", name: "Win-back", line: "Quiet customers, invited back.", href: ROUTES.winback },
    { id: "insights", name: "Insights", line: "Which posts worked on each app, and what to make next.", href: ROUTES.insights },
    { id: "talk", name: "Talk to AI", line: "Ask about your business. Get a straight answer.", href: ROUTES.talk },
  ],
} as const;

export const TRUST = {
  eyebrow: "Before you hand over your phone",
  title: "The straight answers.",
  items: [
    { id: "honest", t: "Always honest", d: "It introduces itself as your virtual assistant and never pretends to be a person. Anyone who asks for you is passed to you." },
    { id: "charge", t: "You stay in charge", d: "Switch autopilot off and every reply, post and review answer waits for your OK. Calls are still answered live." },
    { id: "data", t: "Your customers' data", d: "Delete any customer and their history. Callers hear that calls may be recorded. Leave any time and export your data for 60 days." },
    { id: "where", t: "Where it works", d: "Business phone numbers in the US and Canada. It books into its own calendar, synced both ways with Google Calendar." },
  ],
} as const;

export const HOME_FAQ = [
  { q: "How long does setup take?", a: "An afternoon. Paste your website and RingPost reads your services, prices and hours. Check what it found on the Knowledge page, choose or forward a phone number, then try it yourself before any customer does. Connecting WhatsApp, Instagram and Facebook takes a few more minutes each." },
  { q: "Do I have to change my phone number?", a: "No. Forward your existing number to RingPost, either only the calls you miss or every call. Or pick a new local number in the US or Canada in a few clicks." },
  { q: "Does it work with my calendar and booking tool?", a: "RingPost has its own booking calendar for each person on your team, synced both ways with Google Calendar. It doesn't connect to Vagaro, Fresha, Mindbody, Jobber or OpenTable: block those hours in Google Calendar and RingPost books around them." },
  { q: "Will customers know they're talking to an AI?", a: "Yes. It introduces itself as your business's virtual assistant and never pretends to be a person. Anyone who asks for you is passed to you." },
  { q: "What if it doesn't know the answer?", a: "It doesn't guess. It tells the customer it will check, and passes the question to you. Questions that keep coming up are shown to you as gaps to fill." },
  { q: "Does it post or reply without asking me?", a: "Only if you want it to. With autopilot off, every reply, post and review answer waits for your OK. Phone calls are always answered live." },
  { q: "Can I use it on my phone?", a: "Yes. The dashboard works in any phone browser, with Home, Inbox, Calendar and Approvals one tap away." },
  { q: "Can I cancel?", a: "Yes, any time. Your plan runs to the end of the period you've paid for and isn't billed again." },
];

