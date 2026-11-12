import type { MessageChannel } from "@/components/site/demos/messages-demo";

/** The five apps on /messages, each with its own conversation and the facts to know. */
export const MESSAGE_CHANNELS: MessageChannel[] = [
  {
    id: "whatsapp",
    hash: "whatsapp",
    name: "WhatsApp",
    business: "Golden Hour Hair",
    lines: [
      { from: "customer", text: "Hi, how much is balayage? Anything free Saturday?" },
      { from: "ai", text: "Hi! Balayage is $185 and takes about 3 hours. Saturday I have 10:00 am or 1:30 pm. Would either work?" },
      { from: "customer", text: "1:30 please" },
      { from: "ai", text: "Done. You're booked for Saturday at 1:30 pm. I'll send a reminder the day before." },
    ],
    outcome: "Booked · Sat 1:30 pm",
    facts: ["Keep your number and the WhatsApp Business app on your phone. Nothing to delete.", "Reply to any chat from your phone and the AI steps back.", "Replies go out in the customer's own language."],
  },
  {
    id: "instagram",
    hash: "instagram",
    name: "Instagram DMs",
    business: "goldenhourhair",
    lines: [
      { from: "customer", text: "Love the color in your last post! How much is that?" },
      { from: "ai", text: "Thank you! That's a full color, from $120, about two hours. I have Friday at 2:00 pm free. Want it?" },
      { from: "customer", text: "Yes!" },
      { from: "ai", text: "You're booked for Friday at 2:00 pm. See you then!" },
    ],
    outcome: "Booked · Fri 2:00 pm",
    facts: ["DMs are answered in seconds, day and night.", "Comments on your posts are collected too, in Reviews & Comments.", "Connect by signing in to Instagram on the Connections page."],
  },
  {
    id: "messenger",
    hash: "messenger",
    name: "Messenger",
    business: "Northline Plumbing",
    lines: [
      { from: "customer", text: "Our boiler just stopped. Can someone come out tonight?" },
      { from: "ai", text: "Sorry to hear that. Yes: the call-out is $89 and I can have someone with you at 6:30 pm. Shall I book it?" },
      { from: "customer", text: "Please do." },
      { from: "ai", text: "Booked for 6:30 pm tonight. You'll get a text when we're on the way." },
    ],
    outcome: "Booked · Tonight 6:30 pm",
    facts: ["Every message to your Facebook Page is answered.", "Sign in with the Facebook account that runs your Page.", "Anything urgent or sensitive is passed to you."],
  },
  {
    id: "sms",
    hash: "sms",
    name: "Texts",
    business: "Brightwater Dental",
    lines: [
      { from: "ai", text: "Reminder: your cleaning is tomorrow at 9:00 am. Reply here if you need to move it." },
      { from: "customer", text: "Can I move it to next week?" },
      { from: "ai", text: "Of course. Tuesday at 9:00 am or Thursday at 1:30 pm?" },
      { from: "customer", text: "Tuesday" },
      { from: "ai", text: "Done. Moved to Tuesday at 9:00 am." },
    ],
    outcome: "Moved · Tue 9:00 am",
    facts: ["Customers text your RingPost number and get an answer straight away.", "Appointment reminders are sent by text.", "STOP is always honored: anyone who replies STOP stops getting texts."],
  },
  {
    id: "email",
    hash: "email",
    name: "Email",
    business: "Mirror Finish Detailing",
    subject: "Quote for a full detail",
    lines: [
      { from: "customer", text: "Could I get a price for a full car detail this week?" },
      { from: "ai", text: "Thanks for asking. A full detail is $180 and takes about three hours. Friday at 10:00 am is open. Reply yes and it's yours." },
      { from: "customer", text: "Yes please." },
      { from: "ai", text: "Booked for Friday at 10:00 am. See you then." },
    ],
    outcome: "Booked · Fri 10:00 am",
    facts: ["Replies go out in the same thread, so the conversation stays in one place.", "Forward your Gmail, Outlook or other business email to RingPost.", "You keep a copy of everything in your own inbox."],
  },
];
