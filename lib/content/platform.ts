/**
 * How the product behaves, written from the code:
 *  - GUARDRAILS: packages/core/src/guardrails/* and engine/conversation-engine.ts
 *  - AUTOMATIONS: apps/worker/src/jobs/* and core/tenant-schedules.ts (business time zone)
 */

export const GUARDRAILS = {
  headline: "It won't make things up about your business.",
  lede: "Every reply is checked against your own data before it's sent. The checks are code, so the AI can't talk its way around them.",
  rules: [
    { title: "No price or time that isn't yours", body: "Every price and time must come from your information or a live lookup." },
    { title: "No booking it didn't make", body: "It can't say booked, moved or cancelled unless that action actually succeeded." },
    { title: "No made-up numbers, emails or links", body: "Contact details must come from your information or the customer's own message." },
    { title: "When unsure, it says so", body: "The customer is told the team will reply, the chat passes to you, and you're alerted." },
  ],
  extras: [
    "On calls, each sentence is checked before it's spoken.",
    "Opt-out words like STOP are handled by code, not the AI.",
    "Every trade adds its own rules and hand-off topics.",
  ],
  fallbackLine: "I want to get this exactly right, so I've passed your message to the team and someone will reply here shortly.",
};

export interface Automation {
  when: string;
  title: string;
  body: string;
}

/** What happens while the owner is busy. Every row is a real worker job. */
export const AUTOMATIONS: Automation[] = [
  { when: "Seconds after a missed call", title: "A text back", body: "From your number, so the caller can carry on by text." },
  { when: "Before every visit", title: "A reminder", body: "On the customer's channel, in your time zone." },
  { when: "After every visit", title: "A review request", body: "Your review link, plus a private way to talk to you." },
  { when: "06:00 daily", title: "Occasion campaigns", body: "Drafted two days before each occasion you choose." },
  { when: "07:00 daily", title: "Fresh images and videos", body: "Made from your services, up to your daily allowance." },
  { when: "Every hour", title: "Scheduled posts watched", body: "A nudge if a post is still waiting for approval." },
  { when: "Every 30 minutes", title: "New comments", body: "Picked up with a reply drafted for you." },
  { when: "Nightly", title: "Google reviews", body: "Fetched with a reply drafted for your approval." },
  { when: "Every six hours", title: "Post performance", body: "Views and engagement updated." },
  { when: "Nightly", title: "Connections checked", body: "You're told if an account needs reconnecting." },
];

export const HOW_IT_WORKS = [
  { step: "1", title: "Import your business", body: "Paste your website or upload a menu. It reads your services, prices and hours." },
  { step: "2", title: "Connect your channels", body: "Get a number or forward yours, then connect Instagram, Messenger, email and your calendar." },
  { step: "3", title: "Try it yourself", body: "Chat with your AI in the dashboard, or text and call your number." },
  { step: "4", title: "It starts answering", body: "Calls and messages are answered, and bookings land on your calendar." },
];

export const PROBLEM = {
  headline: "A missed call is a customer you'll never meet.",
  body: "The phone rings while you're busy. Nobody picks up, and the caller tries the next business on the list.",
};
