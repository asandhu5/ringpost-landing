/**
 * Content that describes how the product behaves, written from the code:
 *  - GUARDRAILS: packages/core/src/guardrails/* and engine/conversation-engine.ts
 *  - AUTOMATIONS: apps/worker/src/jobs/* and core/tenant-schedules.ts (times are in the
 *    business's own time zone)
 */

export const GUARDRAILS = {
  headline: "It will not make things up about your business.",
  lede: "The fastest way to lose a customer is to quote a price you don't charge or confirm a booking that doesn't exist. Every reply RingPost writes is checked against your own data before it's sent. These checks are code, not instructions to the AI, so the AI can't talk its way around them.",
  rules: [
    {
      title: "No price or time that isn't yours",
      body: "Every price and every time in a reply must appear in your business information or in what a lookup just returned. A customer can suggest a time and hear it back, but if they ask \"is it $40?\" the AI can't just agree.",
    },
    {
      title: "No booking it didn't make",
      body: "It can't tell a customer they're booked, moved or cancelled unless that exact action succeeded in the system in the same turn. A successful booking doesn't license \"I've cancelled it\".",
    },
    {
      title: "No invented phone numbers, emails or links",
      body: "Any phone number, email address or link in a reply must come from your own information, a lookup, or the customer's own message. Never from the AI's memory.",
    },
    {
      title: "When it can't be sure, it says so",
      body: "A reply that fails a check is sent back to be rewritten once. If it still can't produce a verified answer, the customer is told honestly that the team will reply, the conversation is passed to you, and you're alerted.",
    },
  ],
  extras: [
    "On a live call, each sentence is checked before it's spoken.",
    "Opt-out words like STOP are honoured by code, never left to the AI.",
    "Each type of business carries its own lines it never crosses, and its own topics it always hands to you.",
    "A customer who asks for a person, or repeats themselves because the AI isn't getting it, is handed to you.",
  ],
  fallbackLine: "I want to get this exactly right, so I've passed your message to the team and someone will reply here shortly.",
};

export interface Automation {
  when: string;
  title: string;
  body: string;
}

/** What happens while the owner is with a customer. Every row is a real worker job. */
export const AUTOMATIONS: Automation[] = [
  { when: "Seconds after a missed call", title: "The caller gets a text back", body: "From your business number, inviting them to carry on by text, where the AI picks it up. Or an AI callback, if you've switched that on." },
  { when: "Before every visit", title: "A reminder goes out", body: "On the customer's own channel, timed in your time zone. Replies land in the same conversation." },
  { when: "After every completed visit", title: "A review request is sent", body: "The same message to every customer: a public review link and a private way to tell you directly." },
  { when: "Every 30 minutes", title: "Finished visits are marked complete", body: "Using the setting you choose, so review requests go out without you ticking anything off." },
  { when: "06:00 every day", title: "Occasion campaigns are drafted", body: "Two days before each occasion you've switched on, a campaign is waiting, captions and all." },
  { when: "07:00 every day", title: "Fresh images for your posts", body: "New on-brand images from your own services, up to your plan's daily allowance." },
  { when: "Every hour", title: "Scheduled posts are watched", body: "A nudge 12 hours before a post still waiting for approval, then whatever you chose 2 hours before: skip it, tell you, or post it on autopilot if it passes the content check." },
  { when: "Every 30 minutes", title: "New comments are picked up", body: "Comments on your posts, with a reply drafted for you (Growth and above)." },
  { when: "Every night", title: "Google reviews are fetched", body: "New reviews arrive with a reply drafted for your approval (Command Center)." },
  { when: "Every six hours", title: "Post performance is updated", body: "Views and engagement for every post from the last 30 days (Command Center)." },
  { when: "Every Monday", title: "Insights are looked for", body: "Patterns across your reviews, only once something has come up several times, with the evidence attached (Command Center)." },
  { when: "Every night", title: "Your connections are checked", body: "Every connected account is tested, and you're told if one needs reconnecting before a customer notices." },
];

export const HOW_IT_WORKS = [
  { step: "01", title: "Import your business", body: "Paste your website address or upload a menu or price list. RingPost reads your services, prices, hours and policies, and tells you what's missing." },
  { step: "02", title: "Connect your channels", body: "Get a local number or forward your own, then connect Instagram, Messenger and Google Calendar from the dashboard." },
  { step: "03", title: "Check its answers", body: "Pick your type of business, fill any gaps, and try it yourself: chat with your AI in the dashboard, or text and call your number." },
  { step: "04", title: "It starts answering", body: "Calls, texts and messages are answered from that moment, and bookings land on your calendar." },
];

export const PROBLEM = {
  eyebrow: "The problem",
  headline: "A missed call is a customer you'll never meet.",
  body: [
    "The phone rings while you're with a customer, up a ladder, or closed for the night. Nobody picks up. The caller doesn't leave a voicemail; they try the next business on the list.",
    "The same thing happens to the Instagram DM that waits until tomorrow, and the WhatsApp message nobody sees until Sunday. None of it shows up anywhere. It's just work that went somewhere else.",
  ],
};
