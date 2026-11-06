import type { ChatLine } from "@/components/site/explainers";

/**
 * What each channel and feature page explains beyond its own copy: a conversation that
 * plays out, how the work flows, and a tour of the real dashboard screens
 * (public/screens, captured from the dashboard with business names removed).
 * Generic on purpose: no business is named, and every line is something the product does.
 */

export interface Explainer {
  demo?: { channel: string; title: string; lede: string; lines: ChatLine[]; caption?: string };
  flow: { title: string; lede: string; steps: { icon: string; title: string; body: string }[] };
  tour: { title: string; lede: string; items: { src: string; title: string; body: string }[] };
}

const INBOX_TOUR = { src: "/screens/inbox-whatsapp.webp", title: "Every chat in one inbox", body: "Each conversation shows the channel, what the customer wanted and what your AI did. Reply yourself and the AI steps back." };
const CALENDAR_TOUR = { src: "/screens/calendar.webp", title: "Bookings land in your calendar", body: "Appointments booked in a chat or on a call appear here straight away, by person and service, and sync with Google Calendar." };
const KNOWLEDGE_TOUR = { src: "/screens/knowledge.webp", title: "It answers from your knowledge", body: "Your prices, hours, services and policies, read from your website or a PDF. Change something here and every channel says it straight away." };

export const CHANNEL_EXPLAINERS: Record<string, Explainer> = {
  phone: {
    demo: {
      channel: "phone",
      title: "Listen in on a call.",
      lede: "A real-sounding voice picks up on the first ring, answers from your prices and books the slot before the caller hangs up.",
      lines: [
        { from: "ai", text: "Thanks for calling, this is your business's virtual assistant. How can I help?" },
        { from: "customer", text: "Hi, do you have anything free on Saturday morning?" },
        { from: "ai", text: "I have 9:30 or 11:15 on Saturday. The appointment takes about an hour. Which suits you?" },
        { from: "customer", text: "11:15 please." },
        { from: "ai", text: "Done. You're booked for Saturday at 11:15, and I've texted you a confirmation." },
        { from: "event", text: "Booked · Saturday 11:15 · confirmation sent" },
      ],
      caption: "Every call ends with a transcript and an outcome in your inbox.",
    },
    flow: {
      title: "What happens on every call.",
      lede: "From the first ring to the booking in your calendar, without you picking up.",
      steps: [
        { icon: "Phone", title: "It answers", body: "On the first ring, day or night, with your business name. Several callers at once." },
        { icon: "BookOpen", title: "It knows your business", body: "Prices, services, hours and policies come from your knowledge, never made up." },
        { icon: "CalendarCheck", title: "It books", body: "Checks live availability for the right person and service, and books it." },
        { icon: "BellRing", title: "Urgent? To you", body: "Emergencies, complaints or 'I want a person' go straight to your phone." },
        { icon: "Inbox", title: "You see it all", body: "Transcript, outcome and a text-back for anyone it couldn't help." },
      ],
    },
    tour: {
      title: "What you see after a call.",
      lede: "Real screens from the RingPost dashboard.",
      items: [
        { src: "/screens/inbox-call.webp", title: "The call, written down", body: "A full transcript with the outcome on top: booked, message taken or passed to you. Call or text them back from your business number." },
        CALENDAR_TOUR,
        KNOWLEDGE_TOUR,
      ],
    },
  },
  whatsapp: {
    demo: {
      channel: "whatsapp",
      title: "A WhatsApp chat, answered in seconds.",
      lede: "Your AI replies on your own WhatsApp number while you keep the app on your phone.",
      lines: [
        { from: "customer", text: "Hi! How much is a full colour, and do you have anything this week?" },
        { from: "ai", text: "Hi! A full colour starts at $95 and takes about two hours. I have Thursday at 2:00 or Friday at 10:30. Want one of those?" },
        { from: "customer", text: "Friday 10:30 👍" },
        { from: "ai", text: "You're booked for Friday at 10:30. I'll send you a reminder the day before. See you then!" },
        { from: "event", text: "Booked · reminder set for Thursday" },
      ],
      caption: "The prices and times come from your own knowledge and calendar.",
    },
    flow: {
      title: "How WhatsApp works with RingPost.",
      lede: "Connect once in about two minutes, then every chat is answered.",
      steps: [
        { icon: "MessageCircle", title: "A customer writes", body: "On your usual business number, any time of day." },
        { icon: "Sparkles", title: "Your AI replies", body: "In seconds, from your prices, hours and services, in a friendly tone." },
        { icon: "CalendarCheck", title: "It books in the chat", body: "Offers real free times and books without leaving WhatsApp." },
        { icon: "UserRound", title: "You can step in", body: "Reply from your phone or the inbox and the AI steps back." },
      ],
    },
    tour: { title: "Where it shows up in your dashboard.", lede: "Real screens from the RingPost dashboard.", items: [INBOX_TOUR, CALENDAR_TOUR, KNOWLEDGE_TOUR] },
  },
  instagram: {
    demo: {
      channel: "instagram",
      title: "DMs that turn into bookings.",
      lede: "Someone sees your post at 11 PM and sends a message. It's answered, and booked, before they scroll on.",
      lines: [
        { from: "customer", text: "Love this look 😍 how much and can I book?" },
        { from: "ai", text: "Thank you! That style is $65 and takes about 45 minutes. I have Tuesday at 4:00 or Wednesday at 12:30." },
        { from: "customer", text: "Wednesday works" },
        { from: "ai", text: "Booked for Wednesday at 12:30. Can I take your phone number for the reminder?" },
        { from: "event", text: "Booked from a DM · linked to your post" },
      ],
    },
    flow: {
      title: "From a post to a booking.",
      lede: "Comments and DMs are answered, and you see which post brought the customer.",
      steps: [
        { icon: "Camera", title: "Your post goes out", body: "Made in Content Studio or uploaded by you, posted from RingPost." },
        { icon: "MessageCircle", title: "People comment and DM", body: "Questions get a reply drafted or sent, in your voice." },
        { icon: "CalendarCheck", title: "DMs become bookings", body: "Prices and free times, right in the chat." },
        { icon: "BarChart3", title: "You see what worked", body: "Views, likes and comments per post, in Insights." },
      ],
    },
    tour: {
      title: "Instagram in your dashboard.",
      lede: "Real screens from the RingPost dashboard.",
      items: [
        { src: "/screens/inbox-instagram.webp", title: "DMs in the inbox", body: "Every Instagram conversation next to your calls and WhatsApp, with what the AI did." },
        { src: "/screens/reviews-comments.webp", title: "Comments with a reply ready", body: "Each comment on your posts, with the commenter's picture and a reply drafted for you to send." },
        { src: "/screens/insights.webp", title: "What your posts did", body: "Views, likes and comments for every post, and which ones brought customers." },
      ],
    },
  },
  messenger: {
    demo: {
      channel: "messenger",
      title: "Your Facebook Page, answered.",
      lede: "Messages to your Page get a real answer in seconds, not a 'we'll get back to you'.",
      lines: [
        { from: "customer", text: "Are you open on Sunday?" },
        { from: "ai", text: "Yes, Sunday 10 AM to 4 PM. Would you like me to book you in?" },
        { from: "customer", text: "Yes please, around 1?" },
        { from: "ai", text: "1:00 PM Sunday is yours. You'll get a confirmation here and by text." },
        { from: "event", text: "Booked · Sunday 1:00 PM" },
      ],
    },
    flow: {
      title: "How Messenger works.",
      lede: "Connect your Page once. Messages and comments are handled from then on.",
      steps: [
        { icon: "MessageCircle", title: "Someone messages your Page", body: "From Facebook, Messenger or an ad." },
        { icon: "Sparkles", title: "It answers right away", body: "From your own knowledge, never made up." },
        { icon: "CalendarCheck", title: "It books or hands over", body: "Books the slot, or tells you when a person is needed." },
        { icon: "Inbox", title: "All in one inbox", body: "Next to every other channel, with the full history." },
      ],
    },
    tour: { title: "Messenger in your dashboard.", lede: "Real screens from the RingPost dashboard.", items: [INBOX_TOUR, { src: "/screens/reviews-comments.webp", title: "Page comments, answered", body: "Comments on your Facebook posts arrive with a reply drafted, ready to send." }, CALENDAR_TOUR] },
  },
  sms: {
    demo: {
      channel: "sms",
      title: "Texts, answered and remembered.",
      lede: "Missed a call? It texts them back. Got a text? It answers and books.",
      lines: [
        { from: "ai", text: "Sorry we missed your call! This is your business. How can we help?" },
        { from: "customer", text: "Wanted to move my appointment to next week" },
        { from: "ai", text: "No problem. I can do Tuesday at 3:00 or Thursday at 5:30. Which is better?" },
        { from: "customer", text: "Thursday" },
        { from: "ai", text: "Moved to Thursday at 5:30. Reply STOP any time to stop texts." },
        { from: "event", text: "Rescheduled · calendar updated" },
      ],
    },
    flow: {
      title: "How texts work.",
      lede: "From your RingPost number, with the rules carriers require already handled.",
      steps: [
        { icon: "Phone", title: "Missed call text-back", body: "Anyone you couldn't answer gets a text within a minute." },
        { icon: "MessageCircle", title: "Texts answered", body: "Questions, bookings and changes, in a natural tone." },
        { icon: "BellRing", title: "Reminders sent", body: "The day before, so fewer people forget." },
        { icon: "CheckCircle2", title: "STOP honoured", body: "Opt-outs are respected automatically, every time." },
      ],
    },
    tour: { title: "Texts in your dashboard.", lede: "Real screens from the RingPost dashboard.", items: [INBOX_TOUR, CALENDAR_TOUR, { src: "/screens/win-back.webp", title: "Bring people back by text", body: "Pick customers who haven't been in for a while; your AI writes the message and only people who agreed to texts get it." }] },
  },
  email: {
    demo: {
      channel: "email",
      title: "Emails answered in the same thread.",
      lede: "Customer emails get a clear, friendly answer from your business address.",
      lines: [
        { from: "customer", text: "Hello, could you send me your prices and whether you take card?" },
        { from: "ai", text: "Hi! Here are our main prices: a consultation is $40, a full session $120. We take card and cash. Would you like to book a time?" },
        { from: "customer", text: "Great, next Monday morning if possible." },
        { from: "ai", text: "You're booked for Monday at 9:30. A confirmation is on its way." },
        { from: "event", text: "Booked from email" },
      ],
    },
    flow: {
      title: "How email works.",
      lede: "Your business gets its own address, or forwards the one it has.",
      steps: [
        { icon: "MessageCircle", title: "An email arrives", body: "At your RingPost address, or forwarded from your own." },
        { icon: "Sparkles", title: "It replies in the thread", body: "Under your business name, from your own knowledge." },
        { icon: "CalendarCheck", title: "It books", body: "Offers times and books, like on every other channel." },
        { icon: "Inbox", title: "Kept with everything else", body: "One customer, one history, whatever channel they used." },
      ],
    },
    tour: { title: "Email in your dashboard.", lede: "Real screens from the RingPost dashboard.", items: [INBOX_TOUR, KNOWLEDGE_TOUR, CALENDAR_TOUR] },
  },
};

export const PRODUCT_EXPLAINERS: Record<string, Explainer> = {
  inbox: {
    flow: {
      title: "How the inbox works.",
      lede: "One place for every customer, whatever channel they used.",
      steps: [
        { icon: "Inbox", title: "Everything arrives here", body: "Calls, WhatsApp, Instagram, Messenger, texts and email." },
        { icon: "Sparkles", title: "Your AI answers first", body: "And marks what it did: booked, answered or needs you." },
        { icon: "BellRing", title: "What needs you is on top", body: "Urgent chats and handovers come first, with an alert." },
        { icon: "UserRound", title: "Step in any time", body: "Reply yourself and the AI steps back until you hand it back." },
      ],
    },
    tour: { title: "The inbox, for real.", lede: "Real screens from the RingPost dashboard.", items: [INBOX_TOUR, { src: "/screens/inbox-call.webp", title: "Calls with transcripts", body: "Every call written down, with a Call and Text button that use your business number." }, { src: "/screens/inbox-instagram.webp", title: "Instagram next to WhatsApp", body: "No more switching between five apps to see who asked what." }] },
  },
  booking: {
    demo: {
      channel: "whatsapp",
      title: "A booking, start to finish.",
      lede: "It checks who is free, for how long, and books the right service.",
      lines: [
        { from: "customer", text: "Can I book with Sam on Thursday?" },
        { from: "ai", text: "Sam is free Thursday at 10:00 or 2:30. The service takes 45 minutes. Which one?" },
        { from: "customer", text: "2:30" },
        { from: "ai", text: "Booked with Sam, Thursday 2:30. It's in the calendar and I'll remind you the day before." },
        { from: "event", text: "Added to the calendar and Google Calendar" },
      ],
    },
    flow: {
      title: "How booking works.",
      lede: "Set your services, team and hours once. Every channel books from them.",
      steps: [
        { icon: "BookOpen", title: "Your services and team", body: "How long each service takes and who does it." },
        { icon: "Clock", title: "Live free times", body: "From your calendar and Google Calendar, so nothing double-books." },
        { icon: "CalendarCheck", title: "Booked in the chat or call", body: "On every channel, with a confirmation." },
        { icon: "BellRing", title: "Reminders", body: "Sent the day before by text or WhatsApp." },
      ],
    },
    tour: {
      title: "Your calendar.",
      lede: "Real screens from the RingPost dashboard.",
      items: [CALENDAR_TOUR, { src: "/screens/inbox-call.webp", title: "Booked on a call", body: "The call shows the booking it made, so you know exactly what was agreed." }, KNOWLEDGE_TOUR],
    },
  },
  knowledge: {
    flow: {
      title: "How your AI learns your business.",
      lede: "Five short steps, most of them filled in for you.",
      steps: [
        { icon: "Upload", title: "Give it your website or a PDF", body: "It reads every page: services, prices, hours and answers." },
        { icon: "BookOpen", title: "Check what it found", body: "Everything is laid out in five short steps you can edit." },
        { icon: "Sparkles", title: "Fill the gaps it shows", body: "It tells you which questions it couldn't answer last month." },
        { icon: "CheckCircle2", title: "Every channel uses it", body: "Calls, chats, captions and replies all answer from the same facts." },
      ],
    },
    tour: { title: "Knowledge in your dashboard.", lede: "Real screens from the RingPost dashboard.", items: [KNOWLEDGE_TOUR, INBOX_TOUR] },
  },
  uploads: {
    flow: {
      title: "Your own photos and videos, posted properly.",
      lede: "Take it on your phone, upload it, and RingPost does the rest.",
      steps: [
        { icon: "Upload", title: "Upload from your phone", body: "Photos up to 20 MB, videos up to 100 MB. JPEG, PNG, HEIC, MP4 or MOV." },
        { icon: "CheckCircle2", title: "Checked automatically", body: "Size, format and content are checked so each network will accept it." },
        { icon: "PenLine", title: "Captions written", body: "Add a short note; your AI writes a caption that fits each network." },
        { icon: "ThumbsUp", title: "You approve", body: "See exactly how it will look on each network before it goes." },
        { icon: "Send", title: "Now or scheduled", body: "Post straight away or pick a day and time." },
      ],
    },
    tour: {
      title: "Uploading, step by step.",
      lede: "Real screens from the RingPost dashboard.",
      items: [
        { src: "/screens/media-uploads.webp", title: "1. Upload", body: "Drop your photos and videos in, with an optional note. They're checked and ready in seconds." },
        { src: "/screens/approvals.webp", title: "2. Choose where and approve", body: "Pick the networks, see a phone preview for each one and edit the caption if you like." },
        { src: "/screens/preview.webp", title: "3. See it before it goes", body: "Exactly how it will look on Instagram, TikTok, Facebook and the rest." },
      ],
    },
  },
  social: {
    flow: {
      title: "From idea to every network.",
      lede: "Made by AI or uploaded by you, approved by you, posted now or later.",
      steps: [
        { icon: "Wand2", title: "Made or uploaded", body: "Daily content made for your business, or your own photos and videos." },
        { icon: "PenLine", title: "A caption per network", body: "Short for X, hashtags for Instagram, a title for YouTube." },
        { icon: "ThumbsUp", title: "You approve", body: "Nothing goes out without your yes, unless you switch on auto-posting." },
        { icon: "Clock", title: "Now or scheduled", body: "Post at once, or pick the day and time it goes." },
        { icon: "BarChart3", title: "See how it did", body: "Views, likes and comments per post in Insights." },
      ],
    },
    tour: {
      title: "Posting in your dashboard.",
      lede: "Real screens from the RingPost dashboard.",
      items: [
        { src: "/screens/approvals.webp", title: "Approvals", body: "Every post waiting for you, with the networks it's going to and a preview for each." },
        { src: "/screens/campaigns.webp", title: "Campaigns", body: "A short series of posts for an offer or event, planned across the days you choose." },
        { src: "/screens/media.webp", title: "Your Media Library", body: "Everything your AI made and everything you uploaded, ready to post again." },
      ],
    },
  },
  reviews: {
    demo: {
      channel: "review",
      title: "A review, answered in your voice.",
      lede: "Every new Google review and comment gets a reply drafted. You approve it with one tap.",
      lines: [
        { from: "customer", text: "★★★★★ Booked late at night through their chat, got a confirmation straight away. Lovely service!" },
        { from: "ai", text: "Thank you so much! We're glad booking was easy, and we can't wait to see you again soon." },
        { from: "owner", text: "Approved ✓" },
        { from: "event", text: "Reply posted on Google" },
      ],
    },
    flow: {
      title: "How reviews and comments work.",
      lede: "Google reviews and comments on every network, in one list.",
      steps: [
        { icon: "Star", title: "A review or comment arrives", body: "From Google, Instagram, Facebook, TikTok, YouTube and more." },
        { icon: "PenLine", title: "A reply is drafted", body: "In your voice, from what you actually offer, never made up." },
        { icon: "ThumbsUp", title: "You approve or edit", body: "One tap to post it, or change a word first." },
        { icon: "Send", title: "Posted where it came from", body: "The reply appears on Google or the post itself." },
      ],
    },
    tour: {
      title: "Reviews & Comments in your dashboard.",
      lede: "Real screens from the RingPost dashboard.",
      items: [
        { src: "/screens/reviews.webp", title: "Google reviews", body: "Each review with the stars, the reviewer and a reply ready to approve." },
        { src: "/screens/reviews-comments.webp", title: "Comments on your posts", body: "With each commenter's picture, the post they commented on and a reply drafted." },
      ],
    },
  },
  winback: {
    demo: {
      channel: "sms",
      title: "A win-back message that works.",
      lede: "Pick a group, your AI writes it, you check it and send.",
      lines: [
        { from: "ai", text: "Hi Alex, it's been a while! We'd love to see you again. We have free times this week, just reply to book. Reply STOP to opt out." },
        { from: "customer", text: "Oh nice, yes! Anything Friday?" },
        { from: "ai", text: "Friday at 4:00 or 5:30. Which one?" },
        { from: "customer", text: "4:00" },
        { from: "event", text: "Customer won back · booked Friday 4:00" },
      ],
    },
    flow: {
      title: "How win-back works.",
      lede: "Quiet customers, grouped for you, with a message that sounds like you.",
      steps: [
        { icon: "UserRound", title: "Groups made for you", body: "Slipping away, lapsed, long gone, or asked but never booked." },
        { icon: "PenLine", title: "Your AI writes it", body: "From your services and any offer you're running. Never a made-up discount." },
        { icon: "CheckCircle2", title: "Only people who agreed", body: "Customers who opted in to texts. STOP is added automatically." },
        { icon: "CalendarCheck", title: "Replies get booked", body: "Anyone who answers is handled like any other chat." },
        { icon: "BarChart3", title: "See who came back", body: "Sent, replied and booked, counted for you." },
      ],
    },
    tour: { title: "Win-back in your dashboard.", lede: "Real screens from the RingPost dashboard.", items: [{ src: "/screens/win-back.webp", title: "Choose who, write, send", body: "The groups at the top, your message on the left, the people it goes to on the right." }, INBOX_TOUR] },
  },
  insights: {
    flow: {
      title: "What Insights tells you.",
      lede: "Plain answers, not a wall of charts.",
      steps: [
        { icon: "UserRound", title: "Customers and bookings", body: "How many got in touch, how many booked, and who's waiting." },
        { icon: "MessageCircle", title: "What people ask", body: "The questions and requests that keep coming up." },
        { icon: "BarChart3", title: "Where they come from", body: "Calls, WhatsApp, Instagram, your website and more." },
        { icon: "Camera", title: "How your posts did", body: "Views, likes and comments on every network." },
      ],
    },
    tour: { title: "Insights in your dashboard.", lede: "Real screens from the RingPost dashboard.", items: [{ src: "/screens/insights.webp", title: "Customers and conversions", body: "The numbers that matter, with a short note on what each one means and what to do next." }] },
  },
  advisor: {
    demo: {
      channel: "advisor",
      title: "Ask anything about your business.",
      lede: "Talk to AI reads your own bookings, calls, reviews and posts, and answers straight.",
      lines: [
        { from: "customer", text: "How did we do over the last 30 days?" },
        { from: "ai", text: "222 new bookings, up on last month. You missed 99 calls but 78 of them were recovered by text. Reviews average 4.6★." },
        { from: "customer", text: "What should I do this week?" },
        { from: "ai", text: "Most missed calls are Saturday 9–11 AM. Add a team member then, or forward those calls so none are lost." },
      ],
    },
    flow: {
      title: "How Talk to AI works.",
      lede: "Like texting a sharp business partner who has read everything.",
      steps: [
        { icon: "MessageCircle", title: "Ask in plain words", body: "How was last month? Who should I call back? What should I post?" },
        { icon: "BarChart3", title: "It looks at your numbers", body: "Bookings, calls, messages, reviews, posts and win-backs." },
        { icon: "Sparkles", title: "A straight answer", body: "With the numbers behind it and one clear next step." },
      ],
    },
    tour: { title: "Talk to AI in your dashboard.", lede: "Real screens from the RingPost dashboard.", items: [{ src: "/screens/advisor.webp", title: "A conversation about your business", body: "Your chats are saved on the left, so you can come back to an answer later." }] },
  },
};
