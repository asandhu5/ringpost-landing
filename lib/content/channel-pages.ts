import { CHANNELS, type Channel } from "@/lib/content/channels";

/**
 * One page per channel (/channels/<id>), 2026-11-04: what the owner gets from it, how it
 * works, what the AI does and what it hands over, and how it is set up. The setup facts
 * come from lib/content/channels.ts (checked against the platform); the words about value
 * are written here. Screens are real conversations from the dashboard (public/screens/channels).
 */
export interface ChannelPage {
  id: string;
  headline: string;
  lede: string;
  benefits: { title: string; body: string }[];
  steps: { title: string; body: string }[];
  stat: { value: string; label: string };
  faq: { q: string; a: string }[];
  screen: { src: string; alt: string };
}

const PAGES: ChannelPage[] = [
  {
    id: "phone",
    headline: "Every call answered. Even the ones you'd miss.",
    lede: "A natural voice answers your business number on the first ring, day and night, quotes your real prices and books the appointment while the caller is still on the line.",
    benefits: [
      { title: "No more voicemail", body: "Callers who would have hung up and rung the next business get an answer and a booking instead." },
      { title: "Booked on the call", body: "It checks live availability for each member of your team and books the right service and length." },
      { title: "Several calls at once", body: "Busy Saturday morning? Every caller is answered, not put on hold." },
      { title: "Urgent calls to you", body: "Emergencies, complaints or anyone who asks for a person are passed to your phone straight away." },
    ],
    steps: [
      { title: "Keep your number", body: "Forward your existing number (only missed calls, or all of them), or pick a new local number." },
      { title: "It answers in your voice", body: "Greets callers with your business name and answers from your own prices, hours and policies." },
      { title: "You see every call", body: "A transcript, the outcome and any booking land in your inbox, with a text-back for anyone it missed." },
    ],
    stat: { value: "24/7", label: "Every call answered, including evenings, weekends and holidays" },
    faq: [
      { q: "Will callers know it's an AI?", a: "Yes. It introduces itself as your virtual assistant and never pretends to be a person." },
      { q: "Can I keep my number?", a: "Yes. Forward your existing number to RingPost, either every call or only the ones you don't pick up." },
      { q: "What if it can't help?", a: "It takes a message, tells the caller someone will call back, and alerts you straight away." },
    ],
    screen: { src: "/screens/channels/phone.webp", alt: "A phone call answered by RingPost, with the transcript of a booking" },
  },
  {
    id: "whatsapp",
    headline: "Reply on WhatsApp in seconds, not hours.",
    lede: "Your customers already message you on WhatsApp. RingPost answers every chat straight away, books appointments and sends reminders, on the app they use most.",
    benefits: [
      { title: "Instant replies", body: "Customers get an answer in seconds, even late at night, so they don't message someone else." },
      { title: "Bookings in the chat", body: "Prices, availability and booking, all without leaving WhatsApp." },
      { title: "Reminders that land", body: "Reminders go where customers actually read them, so fewer appointments are missed." },
      { title: "Keep your phone app", body: "You keep using WhatsApp on your phone. RingPost answers alongside you." },
    ],
    steps: [
      { title: "Connect your number", body: "Link your WhatsApp Business number in a few clicks. We walk you through it." },
      { title: "It answers every chat", body: "From your own prices, hours and policies, in a friendly, natural tone." },
      { title: "Step in any time", body: "Reply yourself from the inbox and the AI steps back until you hand it back." },
    ],
    stat: { value: "Seconds", label: "To answer a WhatsApp message, day or night" },
    faq: [
      { q: "Do I need a WhatsApp Business account?", a: "Yes, a WhatsApp Business number from Meta. We help you connect it." },
      { q: "Can I still use WhatsApp on my phone?", a: "Yes. You keep your phone app; RingPost answers alongside it." },
      { q: "Can it send reminders?", a: "Yes. Booking confirmations and reminders go out on WhatsApp where the customer booked." },
    ],
    screen: { src: "/screens/channels/whatsapp.webp", alt: "A WhatsApp chat where RingPost moves a customer's booking" },
  },
  {
    id: "instagram",
    headline: "Turn Instagram DMs into bookings.",
    lede: "People see your posts, then send a DM to ask the price. RingPost answers every one, day and night, and books them in before they scroll on.",
    benefits: [
      { title: "No DM left on read", body: "Every message gets a helpful answer, even at 11 pm." },
      { title: "From post to booking", body: "Questions about what they saw in your post are answered and booked in the same chat." },
      { title: "Comments answered too", body: "Comments on your posts come to the same place, with a reply drafted for you." },
      { title: "One login", body: "Connect with your Instagram login. No Facebook Page needed." },
    ],
    steps: [
      { title: "Connect Instagram", body: "Sign in with your Instagram professional account from the dashboard." },
      { title: "It answers DMs", body: "Prices, availability and bookings, answered from your own information." },
      { title: "Comments in one place", body: "Comments on your posts arrive with a reply drafted, ready to approve." },
    ],
    stat: { value: "Day and night", label: "Instagram DMs answered while you work or sleep" },
    faq: [
      { q: "Does it need a Facebook Page?", a: "No. Instagram connects with your Instagram login." },
      { q: "Can it answer comments?", a: "Yes. Comments on your posts arrive with a reply drafted for you to approve." },
      { q: "What if a DM needs me?", a: "It tells the customer the team will reply, puts the chat under Needs you and alerts you." },
    ],
    screen: { src: "/screens/channels/instagram.webp", alt: "An Instagram DM where RingPost moves a booking" },
  },
  {
    id: "messenger",
    headline: "Every Facebook message answered and booked.",
    lede: "Messages to your Facebook Page get a fast, friendly answer from your own information, and a booking when they want one.",
    benefits: [
      { title: "Fast replies", body: "A quick answer keeps people on your Page instead of a competitor's." },
      { title: "Bookings in Messenger", body: "Availability and booking, without leaving the conversation." },
      { title: "Same answers everywhere", body: "The same prices and policies as on the phone and WhatsApp." },
      { title: "All in one inbox", body: "Messenger chats sit next to every other channel." },
    ],
    steps: [
      { title: "Connect your Page", body: "Sign in with Facebook and choose your business Page." },
      { title: "It answers messages", body: "From your own prices, hours and policies." },
      { title: "You stay in control", body: "Take over any chat from the inbox, any time." },
    ],
    stat: { value: "One inbox", label: "Messenger alongside calls, WhatsApp, Instagram, texts and email" },
    faq: [
      { q: "What do I need?", a: "A Facebook Page for your business. You connect it with your Facebook login." },
      { q: "Will it post on my Page?", a: "Only if you use Social posting and approve the post, or switch on autopilot." },
      { q: "Can I reply myself?", a: "Yes. Reply from the inbox and the AI steps back on that chat." },
    ],
    screen: { src: "/screens/channels/messenger.webp", alt: "A Facebook Messenger chat booked by RingPost" },
  },
  {
    id: "sms",
    headline: "Texts answered, appointments kept.",
    lede: "Customers text back about times, prices and changes. RingPost answers every text, moves bookings and sends reminders from your business number.",
    benefits: [
      { title: "Answers every text", body: "Opening hours, prices, changes and cancellations, answered straight away." },
      { title: "Missed call? Text back", body: "Anyone whose call was missed gets a text within seconds, so the conversation carries on." },
      { title: "Reminders cut no-shows", body: "A reminder before every visit, and replies to it are handled for you." },
      { title: "The law handled", body: "Opt-out words like STOP are always honoured, by code." },
    ],
    steps: [
      { title: "Comes with your number", body: "Texting works on your RingPost number from day one." },
      { title: "It replies and books", body: "Moves, cancels and books from what's actually free." },
      { title: "Everything recorded", body: "Every text thread in the inbox, marked as handled or waiting for you." },
    ],
    stat: { value: "Seconds", label: "From a missed call to a text back" },
    faq: [
      { q: "Which number do texts come from?", a: "Your RingPost number, so replies come back to your business." },
      { q: "Does it handle STOP?", a: "Yes. Opt-out words are handled by code, never by the AI." },
      { q: "Can it send reminders?", a: "Yes. Reminders go out before every appointment." },
    ],
    screen: { src: "/screens/channels/sms.webp", alt: "A text conversation answered by RingPost" },
  },
  {
    id: "email",
    headline: "Customer emails answered, in the same thread.",
    lede: "Booking requests and questions by email get a proper reply under your business's name, and newsletters and auto-replies are ignored.",
    benefits: [
      { title: "Your own address", body: "Every business gets its own RingPost email address, or forward your usual mailbox." },
      { title: "Replies in the thread", body: "Answers go out under your name and stay in the customer's thread." },
      { title: "Only real customers", body: "Newsletters, receipts and auto-replies are recognised and ignored." },
      { title: "Bookings by email", body: "Moves and new bookings, just like any other chat." },
    ],
    steps: [
      { title: "Use your address", body: "Copy your RingPost address from the dashboard, or forward your mailbox to it." },
      { title: "It answers and books", body: "From your own information, in your tone." },
      { title: "You see every thread", body: "Email sits in the same inbox as everything else." },
    ],
    stat: { value: "Same thread", label: "Replies under your business's name, never a new email" },
    faq: [
      { q: "Do I need a new email address?", a: "No. Forward your usual mailbox, or use the address RingPost gives you." },
      { q: "Will it reply to newsletters?", a: "No. Newsletters and auto-replies are ignored." },
      { q: "Whose name do replies go out under?", a: "Your business's name, in the same thread the customer started." },
    ],
    screen: { src: "/screens/channels/email.webp", alt: "A customer email answered and booked by RingPost" },
  },
];

export const CHANNEL_PAGES = PAGES;

export function channelPage(id: string): (ChannelPage & { channel: Channel }) | undefined {
  const page = PAGES.find((p) => p.id === id);
  const channel = CHANNELS.find((c) => c.id === id);
  return page && channel ? { ...page, channel } : undefined;
}
