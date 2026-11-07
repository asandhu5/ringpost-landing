import { PLANS, TOP_UPS, USAGE_WARNING_PERCENT, YEARLY_BILLING, YEARLY_DISCOUNT, usd } from "@/lib/plans";

/**
 * The one FAQ source. /faq shows every group except "Pricing and billing", which appears
 * only on /pricing (prices are shown nowhere else). The FAQPage structured data is built
 * from the same entries as the visible answers.
 */

export interface FaqItem {
  q: string;
  a: string;
  group: "Getting started" | "Pricing and billing" | "How it works" | "Calls and messages" | "Content and posting" | "Growing your business" | "Your data";
  link?: { href: string; label: string };
}

const planLine = PLANS.map((p) => `${p.name} ${usd(p.monthlyUsd)}`).join(", ");
const staffLine = PLANS.map((p) => `${p.bookableStaff} on ${p.name}`).join(", ");

export const FAQ: FaqItem[] = [
  {
    group: "Pricing and billing",
    q: "What does it cost?",
    a: `Four plans: ${planLine}. ${YEARLY_BILLING ? `Pay monthly, or yearly for ${Math.round(YEARLY_DISCOUNT * 100)}% off.` : "Paid monthly."} No setup fee and no contract. Billed from the day you choose a plan.`,
  },
  {
    group: "Pricing and billing",
    q: "Is there a free trial?",
    a: `No. Instead, plans start low: ${PLANS[0].name} is ${usd(PLANS[0].monthlyUsd)} a month, with no setup fee and no contract. You can sign up and look around the whole dashboard first, and cancel any time.`,
  },
  {
    group: "Pricing and billing",
    q: "What if I go over my allowance?",
    a: `Your service never stops. You're warned at ${USAGE_WARNING_PERCENT}%, and top-ups (from ${usd(Math.min(...TOP_UPS.map((t) => t.priceUsd)))}) are only added when you buy one.`,
  },
  {
    group: "Pricing and billing",
    q: "How many staff can I have?",
    a: `Bookable staff per plan: ${staffLine}. Turning someone off frees their place.`,
  },
  {
    group: "Pricing and billing",
    q: "Can I cancel?",
    a: `Yes, any time, with no fee. Your plan runs to the end of the month${YEARLY_BILLING ? " (or year, if you pay yearly)" : ""} you've paid for and isn't billed again.`,
    link: { href: "/refund-policy", label: "Refund policy" },
  },
  {
    group: "Getting started",
    q: "Do I have to change my phone number?",
    a: "No. Forward your existing number to RingPost, either only the calls you miss or every call, and the dashboard tests the forwarding for you. If you'd rather keep your number for personal use, you can pick a new local number in a few clicks instead.",
    link: { href: "/product/ai-receptionist", label: "AI receptionist" },
  },
  {
    group: "Getting started",
    q: "How long does setup take?",
    a: "Most owners are answering customers the same day. Paste your website and RingPost reads your services, prices and hours; check what it found on the Knowledge page; get or forward a number; then try your AI yourself before any customer does. Connecting WhatsApp, Instagram and Facebook takes a few more minutes each.",
  },
  {
    group: "Getting started",
    q: "Which businesses is it for?",
    a: "Local businesses that run on calls, messages and bookings: salons, clinics, dental practices, gyms, restaurants, trades, garages, offices, groomers, shops, hotels and venues. There are 48 business types, each with its own rules for what to say, what to hand to you and how to book, plus an option for everything else.",
    link: { href: "/industries", label: "Industries" },
  },
  {
    group: "Getting started",
    q: "Do I need to be good with technology?",
    a: "No. Everything is set up from your dashboard with plain buttons and short questions. If you can post on Instagram, you can run RingPost, and the assistant on this site can answer anything you get stuck on.",
  },
  {
    group: "Getting started",
    q: "Can I keep using WhatsApp on my phone?",
    a: "Yes. RingPost connects to the WhatsApp Business app you already use, so you keep your number, your chats and the app on your phone. When you reply from your phone, the AI steps back from that conversation.",
    link: { href: "/channels/whatsapp", label: "WhatsApp" },
  },
  {
    group: "How it works",
    q: "What if it doesn't know the answer?",
    a: "It says so. It never guesses a price, a time or a phone number. The conversation is passed to you under Needs you, and you get an alert, so the customer hears back from a person.",
    link: { href: "/product#guardrails", label: "The guardrails" },
  },
  {
    group: "How it works",
    q: "Where does it get its answers from?",
    a: "From your business: your services and prices, opening hours, staff, policies, offers and the knowledge you add or upload. It uses the same knowledge for calls, messages, captions and review replies, so everything says the same thing.",
    link: { href: "/product/knowledge", label: "Your business knowledge" },
  },
  {
    group: "How it works",
    q: "Will customers know it's an AI?",
    a: "Yes. It introduces itself as your virtual assistant and never claims to be a person. On calls it also says when a call is recorded.",
    link: { href: "/ai-disclosure", label: "Recording and AI" },
  },
  {
    group: "How it works",
    q: "Can I take over a conversation?",
    a: "Any time. Reply from the inbox, or from WhatsApp on your phone, and the AI steps back until you hand it back.",
    link: { href: "/product/inbox", label: "The inbox" },
  },
  {
    group: "How it works",
    q: "Can I use it on my phone?",
    a: "Yes. The dashboard works on any phone, and you can get alerts for the conversations that need you, new bookings and low reviews.",
  },
  {
    group: "Calls and messages",
    q: "Does it work with Instagram and WhatsApp?",
    a: "Yes. Connect Instagram with your Instagram login and Messenger with your Facebook Page. WhatsApp connects to your WhatsApp Business account with a few clicks, and we guide you through it.",
    link: { href: "/channels", label: "All channels" },
  },
  {
    group: "Calls and messages",
    q: "What does a call sound like?",
    a: "A natural voice that answers in your business's name, understands what the caller wants, checks your real availability and books them in. It can pass the call to you or take a message whenever a person is needed.",
    link: { href: "/channels/phone", label: "Phone calls" },
  },
  {
    group: "Calls and messages",
    q: "Can it book appointments into my calendar?",
    a: "Yes. It books into your RingPost calendar and, if you connect it, your Google Calendar, using each staff member's working hours and the length of each service. The customer gets a confirmation and a reminder before the visit.",
    link: { href: "/product/booking", label: "Bookings and calendar" },
  },
  {
    group: "Calls and messages",
    q: "How does email work?",
    a: "Your business gets its own RingPost email address. Customers write to it, or you forward your usual mailbox. Replies go out under your business's name, in the same conversation.",
    link: { href: "/channels/email", label: "Email" },
  },
  {
    group: "Calls and messages",
    q: "What about texts after hours?",
    a: "Customers can text your number any time and get an answer straight away. Marketing messages, like win-back texts, are never sent during quiet hours, and every one has an easy way to stop.",
    link: { href: "/channels/sms", label: "Text messages" },
  },
  {
    group: "Content and posting",
    q: "What can Content Studio make?",
    a: "Images and short videos for your kind of business: a phone photo made into a finished post, a seasonal offer, a menu, a before-and-after, or a short video for Reels and TikTok. Your logo and words are added exactly, and every piece is checked before you see it.",
    link: { href: "/content-studio", label: "Content Studio" },
  },
  {
    group: "Content and posting",
    q: "Can I post my own photos and videos?",
    a: "Yes. Upload from your phone or computer, add a short note, and RingPost writes a caption for each platform. Photos can be up to 20 MB and videos up to 100 MB.",
    link: { href: "/posting#upload", label: "Uploads" },
  },
  {
    group: "Content and posting",
    q: "Does it post without asking?",
    a: "Only if you turn on autopilot. Otherwise every post waits in Approvals, where you can edit the caption, change the platforms or the time, or turn it down.",
    link: { href: "/posting", label: "Posting" },
  },
  {
    group: "Content and posting",
    q: "Which platforms can it post to?",
    a: "Instagram, Facebook, TikTok, YouTube, X, LinkedIn, Threads, Pinterest and Bluesky, from your own connected accounts. Each one gets a caption written for it.",
    link: { href: "/posting", label: "Posting" },
  },
  {
    group: "Growing your business",
    q: "Does it reply to Google reviews and comments?",
    a: "Yes. Google reviews and comments on your posts come into one list, each with a reply drafted in your voice from your own details. You approve it and it's posted where the comment came from. Low ratings are sent to your phone first.",
    link: { href: "/product/reviews", label: "Reviews and comments" },
  },
  {
    group: "Growing your business",
    q: "How does win-back work?",
    a: "RingPost groups customers by their last visit. You pick a group, jot a rough idea, and your AI writes the text from your services and offers. It goes only to customers who agreed to messages, and replies are answered and booked like any other chat.",
    link: { href: "/product/winback", label: "Win-back" },
  },
  {
    group: "Growing your business",
    q: "What does Insights show me?",
    a: "How many people got in touch, how many booked, which channel brought them, how your posts did on each platform and what customers keep asking, each with a short note on what it means and what to do next.",
    link: { href: "/product/insights", label: "Insights" },
  },
  {
    group: "Growing your business",
    q: "What can I ask Talk to AI?",
    a: "Anything about your business, in your own words: how last month went, which posts brought customers, who to win back, or what to do on a quiet day. It answers from your own numbers and ends with one clear next step.",
    link: { href: "/product/advisor", label: "Talk to AI" },
  },
  {
    group: "Your data",
    q: "Who owns my customer data?",
    a: "You do. Your customers' details and conversations are used only to run RingPost for your business. They are never sold, never used to advertise to anyone and never shared with another business on the platform.",
    link: { href: "/privacy", label: "Privacy policy" },
  },
  {
    group: "Your data",
    q: "Is my data secure?",
    a: "Your data travels encrypted, sensitive values such as the access to your connected accounts are stored encrypted, and every business's data is kept separate at the database level, so it can never be reached through another account. Access inside RingPost is restricted, and you can turn on two-step login for your own account.",
    link: { href: "/privacy", label: "Privacy policy" },
  },
  {
    group: "Your data",
    q: "Can I delete my data?",
    a: "Yes. You can delete individual customers from your dashboard, or close your account and have your business's data deleted. The data deletion page explains each step.",
    link: { href: "/data-deletion", label: "Data deletion" },
  },
];

export const PRICING_FAQ = FAQ.filter((f) => f.group === "Pricing and billing");
export const SITE_FAQ = FAQ.filter((f) => f.group !== "Pricing and billing");
