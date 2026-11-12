import type { ChatApp, ChatLine } from "@/components/site/mocks/app-chat";
import type { DashId } from "@/components/site/mocks/dashboard";
import type { MiniId } from "@/components/site/feature/mini";
import type { Feature as PlanFeature } from "@/lib/plans";
import { ROUTES } from "@/lib/routes";

/**
 * One page per offering. Every page tells its story in the same order (so owners learn
 * where to look) and its words live here, not in the page. Each claim is true of the
 * product today: checked against the dashboard and API on 2026-11-12. Setting names are
 * written exactly as the dashboard shows them.
 */
export type FeatureKey = "calls" | "messages" | "inbox" | "booking" | "brain" | "studio" | "posting" | "reviews" | "winback" | "campaigns" | "insights" | "talk";
export type Area = "answer" | "create" | "grow";

export interface FeatureContent {
  key: FeatureKey;
  area: Area;
  name: string;
  seoTitle: string;
  description: string;
  eyebrow: string;
  title: string;
  promise: string;
  /** The problem, in the owner's own words. One line. */
  problem: string;
  steps: { title: string; you: string; ringpost: string; mini: MiniId }[];
  demo: { title: string; lede: string };
  sees: {
    customer: { kind: "chat"; app: ChatApp; business: string; lines: ChatLine[]; outcome?: string; subject?: string } | { kind: "post"; platform: "instagram" | "facebook"; business: string; image: string; caption: string } | { kind: "review"; stars: number; text: string; reply: string; comment: string; commentReply: string };
    customerNote: string;
    screen: DashId;
    ownerNote: string;
  };
  /** `where` is the exact place in the dashboard. */
  controls: { where: string; what: string }[];
  setup: { path: string[]; text: string }[];
  related: FeatureKey[];
  faq: { q: string; a: string }[];
  /** The plan feature this needs; null means every plan. */
  plan: PlanFeature | null;
}

export const FEATURE_PATH: Record<FeatureKey, string> = { calls: ROUTES.calls, messages: ROUTES.messages, inbox: ROUTES.inbox, booking: ROUTES.booking, brain: ROUTES.brain, studio: ROUTES.studio, posting: ROUTES.posting, reviews: ROUTES.reviews, winback: ROUTES.winback, campaigns: ROUTES.campaigns, insights: ROUTES.insights, talk: ROUTES.talk };

const AUTOPILOT = { where: "Automation → How much your AI does on its own", what: "Autopilot on: it acts. Autopilot off: it asks you first, on the Approvals page." };
const NEEDS_YOU = { where: "Automation → When something needs you", what: "Choose how it reaches you: WhatsApp or a text message." };
const HAND_OVER = { where: "Knowledge → When to hand over to you", what: "List what it should always pass to you, like complaints or anything urgent." };

export const FEATURES: Record<FeatureKey, FeatureContent> = {
  calls: {
    key: "calls",
    area: "answer",
    name: "Calls",
    seoTitle: "AI phone answering for local businesses",
    description: "RingPost answers your business phone in a natural voice, day and night, books the appointment on the call and calls back the ones you miss.",
    eyebrow: "Calls",
    title: "Every call answered, even when your hands are full.",
    promise: "RingPost picks up in a natural voice, answers from your own prices and hours, and books the appointment before the caller hangs up.",
    problem: "The phone rings while you're with a customer. By the time you call back, they've booked somewhere else.",
    steps: [
      { title: "A customer calls", you: "Carry on with your work. Answer yourself whenever you like.", ringpost: "Picks up, day or night, and says it's your virtual assistant.", mini: "call" },
      { title: "It answers and books", you: "Nothing. Your prices, hours and team are already in Knowledge.", ringpost: "Answers the question, finds a free time and books, moves or cancels.", mini: "booked" },
      { title: "You see it all", you: "Open the Inbox to read what was said.", ringpost: "Saves the conversation and puts the booking in your calendar.", mini: "checks" },
    ],
    demo: { title: "The call you miss, called back.", lede: "A caller who rings out is called back by your assistant and booked, usually within minutes." },
    sees: {
      customer: { kind: "chat", app: "phone", business: "Mirror Finish Detailing", lines: [{ from: "ai", text: "Thanks for calling Mirror Finish Detailing. I'm the virtual assistant. How can I help?" }, { from: "customer", text: "How much is a full detail for an SUV?" }, { from: "ai", text: "A full detail is $180 and takes about three hours. Thursday at 3:00 pm is free. Shall I book it?" }, { from: "customer", text: "Yes please." }], outcome: "Booked · Thu 3:00 pm" },
      customerNote: "A friendly voice that knows your prices, and says plainly that it's an assistant.",
      screen: "inbox",
      ownerNote: "The call in your Inbox, with what was said and what was booked.",
    },
    controls: [
      { where: "Connections → Phone number", what: "Forward “Only the ones I miss (recommended)” or “Every call”." },
      { where: "Automation → Phone calls", what: "Set the greeting callers hear first." },
      HAND_OVER,
      NEEDS_YOU,
    ],
    setup: [
      { path: ["Connections"], text: "Open Connections and choose a phone number. Search by area code to get a local one. US and Canada numbers." },
      { path: ["Connections", "Phone number"], text: "Keep your existing number by forwarding it, or give out the new one. The dashboard tests the forwarding for you." },
      { path: ["Automation", "Phone calls"], text: "Write the greeting, then call your new number and hear it yourself before any customer does." },
    ],
    related: ["booking", "inbox", "brain"],
    faq: [
      { q: "Do I have to change my phone number?", a: "No. Forward your existing number to RingPost, either only the calls you miss or every call. Or pick a new local number and give that out." },
      { q: "Will callers know it's an AI?", a: "Yes. It introduces itself as your business's virtual assistant and never pretends to be a person. Anyone who asks for you is passed to you." },
      { q: "What happens to a call I miss?", a: "With forwarding set to the calls you miss, an unanswered call goes to RingPost, which answers it. A caller who rang out is called back by the AI." },
      { q: "Are calls recorded?", a: "Callers always hear that the call may be recorded. You choose how long recordings are kept, from 30 days to a year, or switch recording off." },
      { q: "Which countries have phone numbers?", a: "Business phone numbers are available in the US and Canada." },
    ],
    plan: null,
  },
  messages: {
    key: "messages",
    area: "answer",
    name: "Messages",
    seoTitle: "AI replies on WhatsApp, Instagram, Messenger and texts",
    description: "RingPost answers your WhatsApp, Instagram DMs, Facebook Messenger, text messages and email in seconds, in the customer's language, and books them in.",
    eyebrow: "Messages",
    title: "Every message answered in seconds, on every app.",
    promise: "WhatsApp, Instagram DMs, Facebook Messenger, texts and email. RingPost replies from your own details, in the customer's language, and books them in.",
    problem: "Half your bookings arrive as messages at 10 pm, in five different apps.",
    steps: [
      { title: "Connect your apps", you: "Connect each app once, on the Connections page.", ringpost: "Starts listening for new messages on every one.", mini: "switches" },
      { title: "A customer writes", you: "Nothing. You can read along in the Inbox.", ringpost: "Replies in seconds with your real prices and free times.", mini: "bubble" },
      { title: "It books them in", you: "Step in any time by replying yourself.", ringpost: "Books the visit and sends the confirmation in the same chat.", mini: "booked" },
    ],
    demo: { title: "See it in each app.", lede: "Pick an app. Each conversation looks the way your customer sees it, and ends in a booking." },
    sees: {
      customer: { kind: "chat", app: "whatsapp", business: "Golden Hour Hair", lines: [{ from: "customer", text: "Hi, how much is balayage? Anything free Saturday?" }, { from: "ai", text: "Hi! Balayage is $185 and takes about 3 hours. Saturday I have 10:00 am or 1:30 pm." }, { from: "customer", text: "1:30 please" }, { from: "ai", text: "Done. You're booked for Saturday at 1:30 pm. I'll send a reminder the day before." }], outcome: "Booked · Sat 1:30 pm" },
      customerNote: "A quick, helpful reply in the app they already use.",
      screen: "inbox",
      ownerNote: "Every chat in one Inbox, with the channel named on each one.",
    },
    controls: [
      { where: "Automation → How your AI says hello", what: "The first line customers see when they message you." },
      AUTOPILOT,
      HAND_OVER,
      { where: "Inbox → Reply", what: "Type a reply and the AI pauses on that chat until you hand it back." },
    ],
    setup: [
      { path: ["Connections", "WhatsApp Business"], text: "Scan the code with the WhatsApp Business app. You keep your number and the app on your phone." },
      { path: ["Connections", "Connect Instagram"], text: "Sign in to Instagram. DMs and comments start arriving in your Inbox." },
      { path: ["Connections", "Connect Facebook"], text: "Sign in with the Facebook account that runs your Page. That switches on Messenger." },
      { path: ["Connections", "Phone number"], text: "Texts come to your RingPost number. Reminders go out from it, and STOP is always honored." },
      { path: ["Connections", "Email"], text: "Forward your business email (Gmail, Outlook or another provider) to your RingPost address. Replies stay in the same thread." },
    ],
    related: ["inbox", "calls", "booking"],
    faq: [
      { q: "Can I keep using WhatsApp on my phone?", a: "Yes. Keep your number and the WhatsApp Business app on your phone. RingPost answers alongside you, and you can reply to any chat yourself." },
      { q: "What language does it reply in?", a: "The customer's own. It replies in the language they write in." },
      { q: "What if it doesn't know the answer?", a: "It doesn't guess. It tells the customer it will check, and passes the question to you." },
      { q: "How do texts work?", a: "Customers can text your RingPost number and get an answer straight away. Appointment reminders are sent by text, and anyone who replies STOP stops getting them." },
      { q: "How does email work?", a: "Forward your business email to RingPost, or give customers your RingPost address. Replies go out in the same thread, so the conversation stays in one place." },
    ],
    plan: null,
  },
  inbox: {
    key: "inbox",
    area: "answer",
    name: "One inbox",
    seoTitle: "One inbox for every call and message",
    description: "Every call and message from every channel in one list. See what the AI said, step in whenever you like, and hand back when you're done.",
    eyebrow: "One inbox",
    title: "Every conversation in one place. Step in any time.",
    promise: "Calls, WhatsApp, Instagram, Messenger, texts and email in one list. Read what was said, reply yourself, and the AI steps back.",
    problem: "Five apps, five inboxes, and no way to know which customer is still waiting.",
    steps: [
      { title: "Everything lands in one list", you: "Open the Inbox on your laptop or your phone.", ringpost: "Puts every call and message there, with its channel named.", mini: "switches" },
      { title: "“Needs you” comes first", you: "Look at the top of the list.", ringpost: "Marks the few conversations that need a person, and alerts you.", mini: "checks" },
      { title: "Take over, then hand back", you: "Type a reply to take over.", ringpost: "Pauses on that conversation until you hand it back.", mini: "bubble" },
    ],
    demo: { title: "Try taking over.", lede: "Open a conversation, press Take over, and watch the AI step back. Hand it back when you're done." },
    sees: {
      customer: { kind: "chat", app: "instagram", business: "goldenhourhair", lines: [{ from: "customer", text: "Can I speak to the owner about a wedding booking?" }, { from: "ai", text: "Of course. I'm passing this to the owner now. They'll reply here shortly." }, { from: "ai", text: "Hi, it's the owner. Congratulations! How many in the party?" }] },
      customerNote: "One smooth conversation. They never see the hand-over.",
      screen: "inbox",
      ownerNote: "The whole thread, who answered each message, and a place to reply.",
    },
    controls: [
      { where: "Inbox → Needs you", what: "The short list of conversations waiting for a person." },
      { where: "Inbox → Reply", what: "Reply to take over. The AI pauses on that thread until you hand it back." },
      { where: "Automation → How much your AI does on its own", what: "Choose when the AI picks a chat back up, or “Never, I hand back myself”." },
      NEEDS_YOU,
    ],
    setup: [
      { path: ["Connections"], text: "Connect the channels you use. Each one starts appearing in the Inbox." },
      { path: ["Inbox"], text: "Open the Inbox. Pick a channel on the left, or “Needs you” to see what's waiting." },
      { path: ["Automation", "When something needs you"], text: "Choose where alerts reach you, so you hear about it when a customer asks for you." },
    ],
    related: ["messages", "calls", "booking"],
    faq: [
      { q: "Can I take over a conversation?", a: "Yes, any time. Reply in the Inbox and the AI pauses on that conversation until you hand it back." },
      { q: "Can I use it on my phone?", a: "Yes. The dashboard works in any phone browser, with the Inbox one tap away in the bottom bar." },
      { q: "Does it keep phone calls too?", a: "Yes. Calls sit in the same list as messages, with what was said and what was booked." },
      { q: "How do I know when I'm needed?", a: "Conversations that need a person are listed under “Needs you”, and you get an alert by WhatsApp or text message." },
    ],
    plan: null,
  },
  booking: {
    key: "booking",
    area: "answer",
    name: "Bookings & calendar",
    seoTitle: "AI appointment booking for your whole team",
    description: "RingPost books, moves and cancels appointments on the call or in the chat, in a calendar for each person on your team, synced both ways with Google Calendar.",
    eyebrow: "Bookings & calendar",
    title: "Booked on the spot, into the right person's calendar.",
    promise: "RingPost checks who is free, books the right service for the right length, and sends the reminder. Synced both ways with Google Calendar.",
    problem: "Every booking means stopping work to check the diary and text back a time.",
    steps: [
      { title: "Set your team and services", you: "Add each person's hours and what you offer, once.", ringpost: "Works out who is free and how long each service takes.", mini: "checks" },
      { title: "A customer asks for a time", you: "Nothing.", ringpost: "Offers real free times and books the one they choose.", mini: "bubble" },
      { title: "Everyone is reminded", you: "Glance at your calendar.", ringpost: "Confirms with the customer and sends a reminder before the visit.", mini: "booked" },
    ],
    demo: { title: "Book a visit yourself.", lede: "Pick a service and a team member. You'll see the free times your customer would be offered." },
    sees: {
      customer: { kind: "chat", app: "sms", business: "Golden Hour Hair", lines: [{ from: "ai", text: "You're booked: cut and style, Friday at 2:00 pm." }, { from: "ai", text: "Reminder: your appointment is tomorrow at 2:00 pm. Reply here if you need to move it." }, { from: "customer", text: "Can we do 3:00 instead?" }, { from: "ai", text: "Done. Moved to Friday at 3:00 pm. See you then." }], outcome: "Moved · Fri 3:00 pm" },
      customerNote: "A confirmation, a reminder, and an easy way to move the booking.",
      screen: "calendar",
      ownerNote: "A column for each person on your team, with every booking in place.",
    },
    controls: [
      { where: "Knowledge → Your team and their hours", what: "Who works when. Bookings only land inside those hours." },
      { where: "Knowledge → How people book and pay", what: "Your booking rules, deposits and how customers pay." },
      { where: "Connections → Google Calendar", what: "Sync both ways, so time you block in Google is never booked." },
      { where: "Calendar → New booking", what: "Add or move a booking yourself at any time." },
    ],
    setup: [
      { path: ["Knowledge", "Your team and their hours"], text: "Add each person who takes bookings and the hours they work." },
      { path: ["Knowledge", "What you do"], text: "List your services with a price and a length for each." },
      { path: ["Connections"], text: "Connect Google Calendar. Bookings appear there, and your own events block the time here." },
    ],
    related: ["calls", "messages", "brain"],
    faq: [
      { q: "Does it work with my booking tool?", a: "RingPost has its own booking calendar. It does not connect to Vagaro, Fresha, Mindbody, Jobber or OpenTable. If you use one of those, block those hours in Google Calendar and RingPost books around them." },
      { q: "Does it sync with Google Calendar?", a: "Yes, both ways. RingPost bookings appear in Google Calendar, and anything you add in Google blocks that time in RingPost." },
      { q: "Can customers move or cancel?", a: "Yes. They can ask on the phone or in any chat, and RingPost moves or cancels the booking following your rules." },
      { q: "How many team members can take bookings?", a: "It depends on your plan. The pricing page shows the number for each one." },
      { q: "Are reminders sent?", a: "Yes. Customers get a confirmation when they book and a reminder before the visit." },
    ],
    plan: null,
  },
  brain: {
    key: "brain",
    area: "answer",
    name: "Business Brain",
    seoTitle: "Business Brain: tell RingPost about your business once",
    description: "Tell RingPost about your business once: services, prices, hours, team, policies and tone. Calls, messages, posts and Talk to AI all work from it.",
    eyebrow: "Business Brain",
    title: "Tell it once. Everything runs from it.",
    promise: "Your services, prices, hours, team, policies and tone live in one place. Calls, messages, posts and answers all come from it.",
    problem: "You explain your business to the answering service, the booking tool, the designer and the social media person. Again and again.",
    steps: [
      { title: "Import your website", you: "Paste your website address.", ringpost: "Reads your services, prices, hours and answers into Knowledge.", mini: "url" },
      { title: "Check what it learned", you: "Read it through and fix anything.", ringpost: "Shows your progress and points out the gaps worth filling.", mini: "checks" },
      { title: "Change it in one place", you: "Update a price or your hours once.", ringpost: "Uses the new answer on every call, chat and post.", mini: "switches" },
    ],
    demo: { title: "Watch it learn.", lede: "Paste a website address and see the Knowledge page fill itself, find a gap, and pass one change to everything." },
    sees: {
      customer: { kind: "chat", app: "instagram", business: "goldenhourhair", lines: [{ from: "customer", text: "Are you open Sundays? And how much is a cut?" }, { from: "ai", text: "We're open Sunday 10 am to 4 pm. A cut and style is $45 and takes 45 minutes. Want a time?" }] },
      customerNote: "The right answer, first time, because it comes from your own details.",
      screen: "knowledge",
      ownerNote: "The Knowledge page: your progress, each section, and any gap to fill.",
    },
    controls: [
      { where: "Knowledge → Import your business details", what: "Read your website again whenever it changes." },
      { where: "Knowledge → Questions customers ask", what: "Add or edit the answers it gives." },
      { where: "Knowledge → Logo, colors and tone", what: "Your logo, colors and the way you speak, used on every post and reply." },
      HAND_OVER,
    ],
    setup: [
      { path: ["Set up RingPost"], text: "Sign up and choose your type of business. That gives RingPost a sensible starting point." },
      { path: ["Knowledge", "Import your business details"], text: "Paste your website address. The Business Brain fills itself in a minute or two." },
      { path: ["Knowledge", "Your knowledge progress"], text: "Follow the progress bar and fill the gaps it points out." },
    ],
    related: ["calls", "messages", "studio"],
    faq: [
      { q: "Where does it get its answers from?", a: "Only from what you tell it: your website import and the Knowledge page. It quotes your real prices and hours and never makes one up." },
      { q: "What if it doesn't know something?", a: "It says it will check and passes the question to you. Questions customers keep asking show up as gaps to fill." },
      { q: "What does it hold?", a: "About your business, services and prices, opening hours, your team and their hours, how people book and pay, policies, questions customers ask, when to hand over to you, and your logo, colors and tone." },
      { q: "I don't have a website. Can I still use it?", a: "Yes. Type your details into the Knowledge page, one section at a time." },
      { q: "Does it give medical, legal or financial advice?", a: "No. It books, answers from your own answers and takes messages. Anything sensitive is passed to you. It is not a HIPAA-covered service." },
    ],
    plan: null,
  },
  studio: {
    key: "studio",
    area: "create",
    name: "Content Studio",
    seoTitle: "Content Studio: images and short videos in seconds",
    description: "Type an idea or upload a photo. RingPost makes images and short videos for your business with your logo, your offer and a caption in your voice.",
    eyebrow: "Content Studio",
    title: "Type an idea. Get a post.",
    promise: "Images and short videos made for your business, with your logo and your offer, in seconds.",
    problem: "You know you should post. There's never time to make something that looks good.",
    steps: [
      { title: "Give it an idea", you: "Type one line, or upload a photo from your phone.", ringpost: "Shows the credit cost before anything is made.", mini: "prompt" },
      { title: "It makes the post", you: "Wait a few seconds.", ringpost: "Makes the image or video with your logo, offer and a caption.", mini: "upload" },
      { title: "You pick what goes out", you: "Choose the ones you like in your Media Library.", ringpost: "Posts nothing until you pick it.", mini: "approve" },
    ],
    demo: { title: "", lede: "" },
    sees: {
      customer: { kind: "post", platform: "instagram", business: "Golden Hour Hair", image: "/showcase/beauty-post.webp", caption: "Honey balayage, lived-in and glossy. Two chairs free this Saturday." },
      customerNote: "A post that looks like you took the time, in your own colors and voice.",
      screen: "media",
      ownerNote: "Your Media Library: fresh posts each morning, your uploads, and what's been posted.",
    },
    controls: [
      { where: "Automation → Make fresh content for me", what: "Choose how many images and videos arrive each day or week." },
      { where: "Media Library → Create", what: "See the credit cost before you make anything. A failed one gives the credits back." },
      { where: "Knowledge → Logo, colors and tone", what: "The logo, colors and voice used on everything it makes." },
      AUTOPILOT,
    ],
    setup: [
      { path: ["Knowledge", "Logo, colors and tone"], text: "Add your logo and describe your style in a few words." },
      { path: ["Media Library", "Create"], text: "Type one line or upload a photo, and choose an image or a short video." },
      { path: ["Automation", "Make fresh content for me"], text: "Switch on daily content and pick how often. Fresh posts wait in your Media Library each morning." },
    ],
    related: ["posting", "campaigns", "brain"],
    faq: [
      { q: "What can it make?", a: "Images and short videos, from a one-line idea or from your own photo, with your logo, your offer and a caption in your business's voice." },
      { q: "Are the words on images right?", a: "Words on images come from your own details, and each one is checked before you see it." },
      { q: "What are media credits?", a: "Each image or video uses credits from your monthly allowance. You see the cost before anything is made, and a failed one gives the credits back." },
      { q: "Can I use my own photos and videos?", a: "Yes. Upload photos up to 20 MB and videos up to 100 MB (JPEG, PNG, WEBP, HEIC, MP4, MOV). Uploads carry on after a dropped connection." },
      { q: "Does it post without asking?", a: "No. Nothing is posted until you pick it, unless you switch autopilot on." },
      { q: "Does it get better over time?", a: "Yes. RingPost looks at which of your recent posts got the most response, and builds your next captions on what worked." },
    ],
    plan: "auto_posting",
  },
  posting: {
    key: "posting",
    area: "create",
    name: "Posting",
    seoTitle: "Post to Instagram, TikTok, Facebook and more at once",
    description: "Choose a photo or video once. RingPost writes a caption for each platform, shows a preview in every app, and posts now or on schedule.",
    eyebrow: "Posting",
    title: "One post. Every app. The right way for each.",
    promise: "Choose a photo or video once. RingPost writes a caption for each platform and posts it now or on schedule.",
    problem: "Posting the same photo to five apps means five logins, five captions and half an hour you don't have.",
    steps: [
      { title: "Choose what to post", you: "Pick something from your Media Library, or upload it.", ringpost: "Gets it ready in the right shape for each app.", mini: "upload" },
      { title: "Check each app", you: "Look at the preview for each platform.", ringpost: "Writes a caption for each one, in your voice.", mini: "approve" },
      { title: "Post now or later", you: "Post now, or choose a day and time.", ringpost: "Publishes it and tells you the result for every platform.", mini: "checks" },
    ],
    demo: { title: "Build a post.", lede: "Choose the content, switch platforms on and off, and see how each app shows it, with its own caption." },
    sees: {
      customer: { kind: "post", platform: "facebook", business: "Olive & Ember", image: "/made/restaurant-dish.webp", caption: "Tonight's special is on. Tables from 6 pm; message us to book." },
      customerNote: "Your post in their feed, looking right for the app they're in.",
      screen: "approvals",
      ownerNote: "Anything waiting for your OK, with Edit and Approve on each one.",
    },
    controls: [
      { where: "Connections → Social media apps", what: "Choose which accounts RingPost may post to." },
      AUTOPILOT,
      { where: "Approvals", what: "Edit or approve each post before it goes out." },
      { where: "Media Library", what: "See the result for each platform, and retry one that didn't go through." },
    ],
    setup: [
      { path: ["Connections", "Social media apps"], text: "Connect the accounts you post to, starting with Instagram." },
      { path: ["Media Library"], text: "Pick a photo or video, or upload one from your phone." },
      { path: ["Approvals"], text: "Check the caption for each app, then post now or schedule it." },
    ],
    related: ["studio", "campaigns", "reviews"],
    faq: [
      { q: "Which platforms can it post to?", a: "Instagram, Facebook, TikTok, YouTube, X, LinkedIn, Threads, Pinterest, Bluesky and Google Business." },
      { q: "Does every platform get the same caption?", a: "No. RingPost writes a caption for each platform, and you can edit any of them." },
      { q: "What if a post fails on one platform?", a: "You see a result for every platform. If one didn't go through, you can retry just that one." },
      { q: "Can I schedule posts?", a: "Yes. Post now or choose a day and time." },
      { q: "Does it post without asking?", a: "Only if you switch autopilot on. With autopilot off, every post waits for your OK." },
    ],
    plan: "auto_posting",
  },
  reviews: {
    key: "reviews",
    area: "grow",
    name: "Reviews & comments",
    seoTitle: "AI replies to Google reviews and comments",
    description: "RingPost asks for a review after every visit, drafts replies to Google reviews and comments on your posts in your voice, and brings low ratings to you first.",
    eyebrow: "Reviews & comments",
    title: "Every review and comment answered, in your voice.",
    promise: "RingPost asks for a review after each visit, drafts a reply to every review and comment, and brings the tough ones to you first.",
    problem: "Reviews pile up unanswered, and a question in the comments is a customer you never hear from again.",
    steps: [
      { title: "A review or comment arrives", you: "Nothing.", ringpost: "Collects Google reviews and comments on your posts in one place.", mini: "stars" },
      { title: "A reply is drafted", you: "Read the draft. Edit it if you like.", ringpost: "Writes a reply that sounds like you and fits what was said.", mini: "bubble" },
      { title: "You approve", you: "Press Approve.", ringpost: "Posts the reply. Low ratings always wait for you.", mini: "approve" },
    ],
    demo: { title: "See replies being written.", lede: "Comments and reviews arrive, a reply is drafted in your voice, and nothing is posted until you approve." },
    sees: {
      customer: { kind: "review", stars: 2, text: "Good food but we waited 20 minutes past our booking and nobody told us why.", reply: "Thank you for telling us, and sorry for the wait. We've added a second check-in at busy times.", comment: "Love this! Do you take walk-ins on Saturdays?", commentReply: "Thank you! We do when a table is free. Message us and we'll hold one." },
      customerNote: "A calm, personal reply under their review, and an answer under their comment.",
      screen: "reviews",
      ownerNote: "Each review and comment with its drafted reply, ready to edit or approve.",
    },
    controls: [
      { where: "Reviews & Comments", what: "Edit or approve each drafted reply." },
      AUTOPILOT,
      { where: "Connections → Google reviews", what: "Connect your Google Business Profile so reviews arrive." },
      NEEDS_YOU,
    ],
    setup: [
      { path: ["Connections", "Social media apps"], text: "Connect your Google Business Profile and the accounts you post to." },
      { path: ["Reviews & Comments"], text: "Open Reviews & Comments to see what has arrived and the reply drafted for each." },
      { path: ["Automation", "How much your AI does on its own"], text: "Keep autopilot off to approve every reply yourself, or switch it on." },
    ],
    related: ["insights", "winback", "posting"],
    faq: [
      { q: "Does it reply to Google reviews?", a: "Yes. It drafts a reply to each Google review in your voice, and you approve it." },
      { q: "What about a bad review?", a: "Low ratings come to you first. RingPost drafts a calm reply, and nothing goes out until you say so." },
      { q: "Does it ask customers for reviews?", a: "Yes. A review request is sent after every completed visit." },
      { q: "Which comments does it answer?", a: "Comments on your posts on the social accounts you connect. The reply appears under the comment after you approve it." },
    ],
    plan: "reviews",
  },
  winback: {
    key: "winback",
    area: "grow",
    name: "Win-back",
    seoTitle: "Win back customers who stopped coming",
    description: "RingPost sorts quiet customers into groups, writes a friendly message for each group, and you check it and send by email or WhatsApp.",
    eyebrow: "Win-back",
    title: "Bring back the customers who went quiet.",
    promise: "RingPost finds customers who haven't been in for a while, writes a friendly message for each group, and you check it and send.",
    problem: "Regulars drift away quietly, and you only notice when the diary has gaps.",
    steps: [
      { title: "It sorts your customers", you: "Open Win Back.", ringpost: "Groups people by how long it has been since their last visit.", mini: "groups" },
      { title: "It writes the message", you: "Pick a group. Add an offer if you have one.", ringpost: "Writes a friendly message for that group.", mini: "bubble" },
      { title: "You check and send", you: "Read it, choose who gets it, and send.", ringpost: "Sends it, with an easy way to opt out on every message.", mini: "approve" },
    ],
    demo: { title: "Pick a group.", lede: "Choose who to invite back and read the message RingPost would write for them." },
    sees: {
      customer: { kind: "chat", app: "email", business: "Golden Hour Hair", subject: "It's been a while", lines: [{ from: "ai", text: "Hi! It's been a little while since your last visit to Golden Hour Hair. We have a few openings this week and would love to see you. Reply to this email and we'll find you a time." }, { from: "customer", text: "Do you have anything Thursday afternoon?" }, { from: "ai", text: "Yes, Thursday at 3:00 pm is free. Shall I book it?" }] },
      customerNote: "A short, friendly note from a business they already know.",
      screen: "winback",
      ownerNote: "Your groups, the drafted message, and who it will go to.",
    },
    controls: [
      { where: "Win Back → Choose who gets it", what: "Send to a whole group or pick people one by one." },
      { where: "Win Back → Improve with AI", what: "Type what you want to say, even roughly, and have it rewritten." },
      { where: "Win Back → Email or WhatsApp", what: "Email for customers in the US and Canada; WhatsApp for customers elsewhere." },
      { where: "Customers", what: "Only people who agreed to hear from you are included." },
    ],
    setup: [
      { path: ["Win Back"], text: "Open Win Back. Your customers are already sorted into groups." },
      { path: ["Win Back", "Pick a group"], text: "Choose a group, such as Slipping away. The message is written for you." },
      { path: ["Win Back", "Send"], text: "Check the message, choose who gets it, and send." },
    ],
    related: ["insights", "reviews", "campaigns"],
    faq: [
      { q: "Which groups are there?", a: "Slipping away, Lapsed, Long gone, and Asked but never booked: people who got in touch but never came in." },
      { q: "How are messages sent?", a: "By email, or by WhatsApp from your own number. Customers in the US and Canada get email; WhatsApp is for customers elsewhere." },
      { q: "Can people opt out?", a: "Yes. Every email has an unsubscribe link, and every WhatsApp message says how to stop." },
      { q: "Does anything send without me?", a: "No. You check each message and press send." },
    ],
    plan: "winback",
  },
  campaigns: {
    key: "campaigns",
    area: "grow",
    name: "Campaigns",
    seoTitle: "Plan an offer once and post it to every app",
    description: "Describe an offer or an occasion once. RingPost makes the picture and writes a caption for each of your connected apps, ready for your OK.",
    eyebrow: "Campaigns",
    title: "Plan an offer once. See it ready for every app.",
    promise: "Describe your offer in a line. RingPost makes the picture and a caption for each of your apps, and nothing goes out until you approve it.",
    problem: "A good offer takes an evening to turn into posts, so most of them never get announced.",
    steps: [
      { title: "Say what it's about", you: "Name the campaign and describe it in a line or two.", ringpost: "Suggests occasions coming up, like holidays in your country.", mini: "prompt" },
      { title: "Choose the picture", you: "Pick “Make it new with AI” or “Pick from my library”.", ringpost: "Makes the picture and a caption for each connected app.", mini: "upload" },
      { title: "Check and approve", you: "Press “Looks good, send to Approvals”.", ringpost: "Holds everything until you approve and post it.", mini: "approve" },
    ],
    demo: { title: "Plan an offer.", lede: "One line about a quiet Tuesday becomes a picture and a caption for each app, waiting for your OK." },
    sees: {
      customer: { kind: "post", platform: "instagram", business: "Golden Hour Hair", image: "/showcase/beauty-post.webp", caption: "Quiet Tuesday: 20% off color, this Tuesday only. Message us to book." },
      customerNote: "The same offer, wherever they follow you.",
      screen: "campaigns",
      ownerNote: "The campaign with its picture and captions, ready for you to check.",
    },
    controls: [
      { where: "Campaigns → Create campaign", what: "Name it and say what it's about." },
      { where: "Campaigns → Make another version", what: "Not right? Ask for a new picture and captions." },
      { where: "Campaigns → Looks good, send to Approvals", what: "Nothing goes out until you send it to Approvals and post it." },
      { where: "Connections → Social media apps", what: "A caption is written for each app you have connected." },
    ],
    setup: [
      { path: ["Connections", "Social media apps"], text: "Connect at least one account to post to." },
      { path: ["Campaigns", "Create campaign"], text: "Name your campaign and answer “What's this campaign about?”." },
      { path: ["Approvals"], text: "When it looks good, send it to Approvals and post it." },
    ],
    related: ["posting", "studio", "winback"],
    faq: [
      { q: "What does a campaign make?", a: "A picture and a caption for each social app you have connected, all about the one offer or occasion you described." },
      { q: "Can I use my own photo?", a: "Yes. Choose “Pick from my library” instead of “Make it new with AI”." },
      { q: "Does it post straight away?", a: "No. You see the picture and captions first. Nothing goes out until you send them to Approvals and post them." },
      { q: "Does a campaign send messages to customers?", a: "No. Campaigns make posts. To message customers who have gone quiet, use Win-back." },
    ],
    plan: "campaigns",
  },
  insights: {
    key: "insights",
    area: "grow",
    name: "Insights",
    seoTitle: "Business insights in plain words",
    description: "RingPost shows where your customers come from, what they keep asking, and how every post did on each social app, then builds your next posts on what worked.",
    eyebrow: "Insights",
    title: "See what's working, in plain words.",
    promise: "Where customers come from, when you're busiest, what people keep asking, and how every post did on each app. RingPost builds your next posts on the ones that worked.",
    problem: "You're too busy running the business to study it.",
    steps: [
      { title: "It keeps count", you: "Nothing.", ringpost: "Counts every call, message, booking and post as it happens.", mini: "chart" },
      { title: "It reads the numbers", you: "Open Insights.", ringpost: "Shows views, likes, comments and shares for each post, on each app.", mini: "checks" },
      { title: "It learns what works", you: "Carry on. Nothing to set up.", ringpost: "Builds your next posts on the ones your audience responded to.", mini: "booked" },
    ],
    demo: { title: "Read your month.", lede: "Your customers, your busy hours, and how each post did on each app, in plain words." },
    sees: {
      customer: { kind: "chat", app: "whatsapp", business: "Golden Hour Hair", lines: [{ from: "customer", text: "Are you open Sundays?" }, { from: "ai", text: "Yes, Sundays 10 am to 4 pm. Would you like a time?" }] },
      customerNote: "A question many customers ask. Insights counts it for you.",
      screen: "insights",
      ownerNote: "Where customers come from, busiest hours and the questions that keep coming up.",
    },
    controls: [
      { where: "Insights", what: "Open it any time. The numbers keep themselves up to date." },
      { where: "Knowledge → Questions customers ask", what: "Turn a question people keep asking into a ready answer." },
      { where: "Talk to AI", what: "Ask about any number you see." },
    ],
    setup: [
      { path: ["Connections"], text: "Connect your channels and social accounts. Insights fills itself as customers get in touch." },
      { path: ["Insights"], text: "Open Insights to see the charts and the one-line reading for each." },
      { path: ["Knowledge"], text: "Use what you learn: answer the questions people keep asking." },
    ],
    related: ["talk", "reviews", "winback"],
    faq: [
      { q: "What does Insights show?", a: "Where your customers come from by channel, when you're busiest, the questions people keep asking, and how each post did on each social app: views, likes, comments and shares." },
      { q: "Does it learn from what worked?", a: "Yes. RingPost looks at which of your recent posts your audience responded to most, and builds your next captions on those." },
      { q: "Do I need to be good with numbers?", a: "No. Each chart comes with one sentence in plain words." },
      { q: "Where do the numbers come from?", a: "From your own calls, messages, bookings and posts in RingPost." },
      { q: "Can I ask about a number?", a: "Yes. Open Talk to AI and ask in your own words." },
    ],
    plan: "insights",
  },
  talk: {
    key: "talk",
    area: "grow",
    name: "Talk to AI",
    seoTitle: "Talk to AI: ask about your business",
    description: "Ask RingPost about your business in plain words. It answers with the numbers behind it, from your own calls, messages, bookings and posts.",
    eyebrow: "Talk to AI",
    title: "Ask about your business. Get a straight answer.",
    promise: "Ask in plain words: how did last month go, which day is quiet, what are people asking. RingPost answers with the numbers behind it.",
    problem: "The answers are in your own data. There's nobody to ask.",
    steps: [
      { title: "Ask a question", you: "Type it the way you'd ask a person.", ringpost: "Looks through your calls, messages, bookings and posts.", mini: "ask" },
      { title: "Get the answer", you: "Read it.", ringpost: "Answers in plain words, with the numbers behind it.", mini: "chart" },
      { title: "Ask the next one", you: "Follow up with whatever comes to mind.", ringpost: "Keeps the thread, so you don't have to repeat yourself.", mini: "bubble" },
    ],
    demo: { title: "Ask it something.", lede: "Tap a question to see the kind of answer you'd get." },
    sees: {
      customer: { kind: "chat", app: "sms", business: "Golden Hour Hair", lines: [{ from: "customer", text: "Do you have anything Tuesday afternoon?" }, { from: "ai", text: "Yes, Tuesday at 2:00 pm or 3:30 pm. Which would you like?" }] },
      customerNote: "Your customers carry on as normal. Talk to AI is just for you.",
      screen: "talk",
      ownerNote: "Your question, a clear answer, and the numbers behind it.",
    },
    controls: [
      { where: "Talk to AI", what: "Ask anything about your own business." },
      { where: "Insights", what: "See the same numbers as charts." },
      { where: "Knowledge", what: "Act on an answer: fix a gap or add an offer." },
    ],
    setup: [
      { path: ["Talk to AI"], text: "Open Talk to AI in the sidebar." },
      { path: ["Talk to AI", "Ask"], text: "Type a question, or tap one of the suggestions." },
      { path: ["Insights"], text: "Want the full picture? Open Insights for the charts." },
    ],
    related: ["insights", "winback", "brain"],
    faq: [
      { q: "What can I ask?", a: "Anything about your own business: how last month went, which day is quiet, what customers ask most, which posts worked." },
      { q: "Where do the answers come from?", a: "From your own calls, messages, bookings and posts in RingPost. It shows the numbers behind each answer." },
      { q: "Is it the same AI my customers talk to?", a: "No. Customers talk to your assistant on calls and messages. Talk to AI is private, for you." },
      { q: "Does it give financial or legal advice?", a: "No. It tells you what your own numbers say." },
    ],
    plan: "advisor",
  },
};
