/**
 * The six channels, checked against the platform code (2026-10-01):
 *  - phone and SMS: a new number or forwarding, from the dashboard;
 *  - WhatsApp: connected with WhatsApp Business account details (not one-click yet);
 *  - Instagram and Messenger: connect from the dashboard with a Facebook login;
 *  - email: every business gets its own RingPost address (Connections → Email); forward
 *    your mailbox to it or publish it; replies go out under your name and thread;
 *  Website chat isn't offered to businesses and isn't mentioned (owner decision 2026-10-01).
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
  /** false where a business can't turn it on for its own customers today. */
  availableToBusinesses: boolean;
}

export const CHANNELS: Channel[] = [
  {
    id: "phone",
    name: "Phone calls",
    worksWith: "Your business line",
    searchPhrase: "AI that answers your business phone",
    arrives: "Calls to your RingPost number, or your own number forwarded to it.",
    aiDoes: "Answers in a natural voice, books on the call, and texts back anyone it missed.",
    ownerSees: "Every call with what was said and how it ended.",
    setup: "Pick a local US or Canadian number, or forward your own. The dashboard gives you the code and tests it.",
    availableToBusinesses: true,
  },
  {
    id: "sms",
    name: "Text messages",
    worksWith: "SMS",
    searchPhrase: "AI that answers text messages",
    arrives: "Texts to your RingPost number, and replies to reminders.",
    aiDoes: "Answers, books, moves and cancels. Opt-out words like STOP are always honoured.",
    ownerSees: "Every text thread, marked as handled or waiting for you.",
    setup: "Comes with your RingPost number.",
    availableToBusinesses: true,
  },
  {
    id: "whatsapp",
    name: "WhatsApp",
    worksWith: "Works with WhatsApp",
    searchPhrase: "AI that answers WhatsApp",
    arrives: "Messages to your WhatsApp Business number.",
    aiDoes: "The same answers, bookings and hand-offs as every other channel.",
    ownerSees: "WhatsApp chats alongside everything else.",
    setup: "Needs a WhatsApp Business account from Meta. We walk you through connecting it.",
    availableToBusinesses: true,
  },
  {
    id: "instagram",
    name: "Instagram DMs",
    worksWith: "Works with Instagram",
    searchPhrase: "AI that answers Instagram DMs",
    arrives: "Direct messages to your Instagram professional account.",
    aiDoes: "Answers prices and availability, and books without leaving the chat.",
    ownerSees: "Instagram DMs in the inbox, and comments on your posts.",
    setup: "Connect from the dashboard with your Facebook login.",
    availableToBusinesses: true,
  },
  {
    id: "messenger",
    name: "Facebook Messenger",
    worksWith: "Works with Messenger",
    searchPhrase: "AI that answers Facebook Messenger",
    arrives: "Messages to your Facebook Page.",
    aiDoes: "Answers and books, the same as every other channel.",
    ownerSees: "Messenger chats in the inbox.",
    setup: "Connect your Page from the dashboard with your Facebook login.",
    availableToBusinesses: true,
  },
  {
    id: "email",
    name: "Email",
    worksWith: "Your business email",
    searchPhrase: "AI that answers customer emails",
    arrives: "Emails to your business's own RingPost address, or your usual mailbox forwarded to it.",
    aiDoes: "Answers the customer's message and books like any other chat. Newsletters and auto-replies are ignored.",
    ownerSees: "Email threads in the same inbox. Replies go out under your business's name and stay in the same thread.",
    setup: "Copy your address from the dashboard, or forward your mailbox to it. A one-click check confirms it works.",
    availableToBusinesses: true,
  },

];

/** The social platforms RingPost publishes to (packages/core/src/adapters/publishing). */
export const SOCIAL_PLATFORMS = ["Instagram", "Facebook", "TikTok", "YouTube", "X", "LinkedIn", "Threads", "Pinterest"];
