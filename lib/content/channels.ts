/**
 * The seven channels. Checked against the platform code on 2026-09-30:
 *  - phone and SMS: Twilio webhooks, a new number or forwarding from the dashboard;
 *  - WhatsApp: WhatsApp Cloud API or Twilio, connected with WhatsApp Business account
 *    credentials (not a one-click connect today);
 *  - Instagram and Messenger: Meta OAuth connect from the dashboard;
 *  - email: inbound email to the business's RingPost inbox (forwarding is set up with
 *    the team; there is no self-serve step in the dashboard);
 *  - web chat: the engine answers website chat, but there is no chat a business can add
 *    to its OWN website today (the embeddable widget went with apps/site on 2026-09-24).
 *    The copy says so rather than claiming it.
 *
 * Every channel is on every plan (answering is not a gated feature in plans.ts).
 */

export interface Channel {
  id: string;
  name: string;
  /** For headings, per the brand rules: "works with", never "partner". */
  worksWith: string;
  searchPhrase: string;
  arrives: string;
  aiDoes: string;
  ownerSees: string;
  setup: string;
  /** false where a business cannot turn it on for its own customers today. */
  availableToBusinesses: boolean;
}

export const CHANNELS: Channel[] = [
  {
    id: "phone",
    name: "Phone calls",
    worksWith: "Your business phone line",
    searchPhrase: "AI that answers your business phone",
    arrives: "A call to your RingPost number, or to your own number forwarded to it (only the calls you miss, or every call).",
    aiDoes: "Answers in a natural voice, looks up prices, hours and availability as it talks, books during the call, and takes a message or alerts you when a person is needed. A missed call gets a text back from your number within seconds.",
    ownerSees: "The call in your inbox with what was said, the outcome (booked, message taken, passed to you), and a recording if you turned recording on.",
    setup: "Choose a new local US or Canadian number in the dashboard, or keep your own and forward it: the dashboard gives you the exact code to dial for your phone company, and a test to prove it works.",
    availableToBusinesses: true,
  },
  {
    id: "sms",
    name: "Text messages",
    worksWith: "SMS",
    searchPhrase: "AI that answers text messages",
    arrives: "A text to your RingPost number, or a reply to a missed-call text or appointment reminder.",
    aiDoes: "Replies in your business's voice, books, reschedules and cancels, and answers questions from your own information. STOP and similar opt-out words are honoured automatically, never left to the AI.",
    ownerSees: "Every text thread in the inbox, marked as handled by the AI or waiting for you.",
    setup: "Comes with your RingPost number.",
    availableToBusinesses: true,
  },
  {
    id: "whatsapp",
    name: "WhatsApp",
    worksWith: "Works with WhatsApp",
    searchPhrase: "AI that answers WhatsApp",
    arrives: "A WhatsApp message to your business's WhatsApp number.",
    aiDoes: "The same answers, bookings and hand-offs as every other channel, on the app many of your customers already use all day.",
    ownerSees: "WhatsApp conversations alongside everything else in the inbox.",
    setup: "WhatsApp needs a WhatsApp Business account from Meta, and connecting it asks for details from that account. It is not a one-click connect yet; the team walks you through it.",
    availableToBusinesses: true,
  },
  {
    id: "instagram",
    name: "Instagram DMs",
    worksWith: "Works with Instagram",
    searchPhrase: "AI that answers Instagram DMs",
    arrives: "A direct message to your Instagram professional account.",
    aiDoes: "Answers questions about prices, availability and bookings in the DM, so an enquiry from a post turns into a booking without anyone leaving the app.",
    ownerSees: "Instagram DMs in the inbox, and on Growth and above, comments on your posts with replies drafted.",
    setup: "Connect your Instagram professional account from the dashboard with your Facebook login.",
    availableToBusinesses: true,
  },
  {
    id: "messenger",
    name: "Facebook Messenger",
    worksWith: "Works with Messenger",
    searchPhrase: "AI that answers Facebook Messenger",
    arrives: "A message to your Facebook Page.",
    aiDoes: "Answers and books from your Page's inbox, the same way as every other channel.",
    ownerSees: "Messenger conversations in the inbox.",
    setup: "Connect your Facebook Page from the dashboard with your Facebook login.",
    availableToBusinesses: true,
  },
  {
    id: "email",
    name: "Email",
    worksWith: "Your business email",
    searchPhrase: "AI that answers customer emails",
    arrives: "An email sent to your business's RingPost inbox address.",
    aiDoes: "Reads the customer's message (not the whole quoted thread), answers it from your information, and books or passes it to you like any other conversation.",
    ownerSees: "Email conversations in the same inbox as everything else.",
    setup: "Email reaches RingPost through forwarding from your business mailbox. There is no self-serve step for this in the dashboard yet, so the team sets it up with you.",
    availableToBusinesses: true,
  },
  {
    id: "web_chat",
    name: "Website chat",
    worksWith: "Chat on a website",
    searchPhrase: "AI website chat",
    arrives: "A message typed into a chat box on a website.",
    aiDoes: "The same engine, rules and guardrails as every other channel. The assistant on this website is RingPost's own front desk, running on RingPost.",
    ownerSees: "Chat conversations in the inbox. Owners also use it to try their own AI on the Try it yourself page.",
    setup: "A chat you can add to your own website isn't available to install today. Your customers can reach you on the six channels above.",
    availableToBusinesses: false,
  },
];

/** The social platforms RingPost publishes to (packages/core/src/adapters/publishing). */
export const SOCIAL_PLATFORMS = ["Instagram", "Facebook", "TikTok", "YouTube", "X", "LinkedIn", "Threads", "Pinterest"];
