import { GROUPS, typesInGroup, type BusinessType } from "@/lib/content/industries";

/**
 * The ten groups of trades as pages of their own (/industries/<group>): what owners in
 * that group live with, what RingPost does for them across calls, messages, bookings and
 * content, and every trade inside it. The trades themselves come from the product's own
 * business types (data/business-types.json); only the words here are written by hand.
 */
export interface GroupInfo {
  name: string;
  slug: string;
  /** lucide icon name, resolved by the page. */
  icon: "Sparkles" | "Stethoscope" | "Dumbbell" | "UtensilsCrossed" | "Wrench" | "Car" | "Briefcase" | "GraduationCap" | "ShoppingBag" | "BedDouble";
  tone: string;
  tagline: string;
  pain: string;
  does: { title: string; body: string }[];
  /** Post ideas Content Studio makes for this group. */
  content: string[];
  image?: string;
}

const INFO: Record<string, Omit<GroupInfo, "name" | "slug">> = {
  "Beauty and wellness": {
    icon: "Sparkles",
    tone: "#db2777",
    tagline: "Salons, barbers, nails, lashes, spas and med spas.",
    pain: "Your hands are busy with a client when the phone rings, and half your bookings arrive as Instagram DMs at 10 pm.",
    does: [
      { title: "Books while you work", body: "Answers calls and DMs, checks each stylist's real availability and books the right service and length." },
      { title: "Quotes your real prices", body: "Cut, color, balayage, lashes: it answers from your own price list and never guesses." },
      { title: "Fills the gaps", body: "Reminders cut no-shows, and win-back messages bring back clients who haven't been in for a while." },
      { title: "Posts that book chairs", body: "Hair reveals, close-ups and before-and-afters, made about your salon and posted for you." },
    ],
    content: ["Color reveal Reels", "Before and after", "Satisfying close-ups", "This week's openings"],
    image: "/made/ideas/result-closeup.webp",
  },
  Health: {
    icon: "Stethoscope",
    tone: "#0284c7",
    tagline: "Dental, medical, physio, optician, vet and therapy practices.",
    pain: "Reception is juggling check-ins while new patients call, and every missed call is a patient who books somewhere else.",
    does: [
      { title: "New patients, booked", body: "Answers first questions, takes details and books the right appointment type with the right clinician." },
      { title: "Knows what to hand over", body: "Pain, emergencies and anything clinical go straight to your team, never answered by the AI." },
      { title: "Fewer empty slots", body: "Reminders before every visit, and win-back messages for patients who haven't been back in a while." },
      { title: "Calm, trustworthy posts", body: "Meet-the-team, tours of the clinic and helpful tips that make first-timers feel at ease." },
    ],
    content: ["Meet the team", "A calm clinic tour", "Helpful tips", "New patient offers"],
    image: "/made/industries/health-dental.webp",
  },
  Fitness: {
    icon: "Dumbbell",
    tone: "#ea580c",
    tagline: "Gyms, studios, martial arts, dance and personal trainers.",
    pain: "Inquiries arrive at 6 am and 10 pm, when the front desk is empty, and a trial that isn't booked tonight is lost.",
    does: [
      { title: "Trials booked tonight", body: "Answers about memberships, timetables and trials, and books a class or a first session on the spot." },
      { title: "The timetable, answered", body: "What's on, what to bring, how to cancel: from your own timetable and policies." },
      { title: "Members kept", body: "Win-back messages for members who've gone quiet, and reminders that keep classes full." },
      { title: "Energy on every feed", body: "PR moments, class highlights and coach intros, made and posted every week." },
    ],
    content: ["Member wins", "Class highlights", "Coach intros", "Free trial offers"],
    image: "/made/industries/fitness-gym.webp",
  },
  "Food and drink": {
    icon: "UtensilsCrossed",
    tone: "#d97706",
    tagline: "Restaurants, cafés, bakeries, takeaways and caterers.",
    pain: "The phone rings through the dinner rush, and messages about tables and orders sit unread until it's too late.",
    does: [
      { title: "Tables and orders", body: "Takes reservations and order questions by phone, WhatsApp and Instagram, from your real menu and hours." },
      { title: "The menu, answered", body: "Allergens, dietary options and today's specials, from your own menu, never invented." },
      { title: "Busy nights, handled", body: "Large bookings and complaints go to you; everything routine is answered straight away." },
      { title: "Food people stop for", body: "Dish of the day, steam-and-sizzle Reels and weekend specials, posted at the right time." },
    ],
    content: ["Dish of the day", "Behind the pass", "Weekend specials", "New on the menu"],
    image: "/made/restaurant-dish.webp",
  },
  "Home services": {
    icon: "Wrench",
    tone: "#16a34a",
    tagline: "HVAC, plumbers, electricians, cleaners, builders and more.",
    pain: "You're on a job with your hands full. The caller with a burst pipe won't leave a voicemail: they ring the next company.",
    does: [
      { title: "Every lead captured", body: "Answers on the first ring, takes the address and the problem, and books the visit or callback." },
      { title: "Emergencies to you", body: "No heat, a leak, sparks: urgent calls are passed straight to your phone." },
      { title: "Quotes from your rates", body: "Call-out fees, service areas and opening hours, answered from your own information." },
      { title: "Proof of good work", body: "Before-and-after jobs, tips for the season and reviews turned into posts." },
    ],
    content: ["Before and after", "Seasonal tips", "Job of the week", "Five-star reviews"],
    image: "/made/industries/home-plumber.webp",
  },
  Auto: {
    icon: "Car",
    tone: "#475569",
    tagline: "Mechanics, body shops, detailers and car washes.",
    pain: "Customers call to ask \"is my car ready?\" all day, while new jobs wait on hold.",
    does: [
      { title: "Jobs booked in", body: "Inspections, services, repairs and details booked by phone, text or WhatsApp." },
      { title: "Questions handled", body: "Opening hours, prices and what's included, answered from your own information." },
      { title: "Customers who come back", body: "Reminders before each visit, and win-back messages when a customer is due for their next service." },
      { title: "Shine on social", body: "Detailing reveals and workshop clips that show your work." },
    ],
    content: ["Detailing reveals", "In the workshop", "Car care tips", "Seasonal checks"],
    image: "/made/industries/auto-detailing.webp",
  },
  "Professional services": {
    icon: "Briefcase",
    tone: "#4f46e5",
    tagline: "Law firms, accountants, estate agents, insurance and photographers.",
    pain: "A new client calls once. If nobody answers, they call the next firm on the list.",
    does: [
      { title: "Every inquiry taken", body: "Takes the details of each new inquiry and books a consultation with the right person." },
      { title: "Nothing it shouldn't say", body: "It never gives advice: legal, tax or financial questions go to you." },
      { title: "Follow-ups that land", body: "Reminders before consultations and a polite nudge to inquiries that went quiet." },
      { title: "A trusted presence", body: "Clear explainers, team intros and client stories, posted on LinkedIn and beyond." },
    ],
    content: ["Team intros", "Plain-English explainers", "Client stories", "Deadline reminders"],
    image: "/made/industries/pro-office.webp",
  },
  "Education and care": {
    icon: "GraduationCap",
    tone: "#0d9488",
    tagline: "Tutors, driving schools, childcare and pet care.",
    pain: "Parents and pet owners have lots of questions and want an answer now, not tomorrow.",
    does: [
      { title: "Questions answered", body: "Fees, availability, what to bring and how the first session works, from your own information." },
      { title: "Sessions booked", body: "Lessons, visits and grooming slots booked and reminded." },
      { title: "Care handed to you", body: "Anything about a child's or pet's wellbeing goes straight to you." },
      { title: "Warm, friendly posts", body: "Happy moments, progress stories and helpful tips." },
    ],
    content: ["Progress stories", "Happy moments", "Helpful tips", "Open spaces this week"],
    image: "/made/industries/care-grooming.webp",
  },
  Shops: {
    icon: "ShoppingBag",
    tone: "#9333ea",
    tagline: "Boutiques, florists and pharmacies.",
    pain: "\"Do you have it in stock? Are you open?\" The same questions, every hour, on every app.",
    does: [
      { title: "Every question answered", body: "Opening hours, stock questions and orders, by phone, WhatsApp and Instagram." },
      { title: "Orders and collections", body: "Takes orders and books collections or deliveries where you offer them." },
      { title: "Your team freed up", body: "Routine questions are handled; anything sensitive goes to you." },
      { title: "New in, every week", body: "New arrivals, gift ideas and offers, made and posted for you." },
    ],
    content: ["New arrivals", "Gift ideas", "Product flat lays", "Weekend offers"],
    image: "/made/industries/shop-florist.webp",
  },
  "Stays and venues": {
    icon: "BedDouble",
    tone: "#be123c",
    tagline: "Hotels and guest houses, event venues and rentals.",
    pain: "Booking inquiries arrive in every time zone, and a slow reply is a lost booking.",
    does: [
      { title: "Inquiries at any hour", body: "Answers availability, prices and policies day and night, in a friendly voice." },
      { title: "Bookings and viewings", body: "Books stays, viewings and hires, and passes large or special requests to you." },
      { title: "Guests looked after", body: "Check-in details, directions and reminders sent before they arrive." },
      { title: "Somewhere people want to be", body: "Space tours, seasonal moments and guest reviews, posted for you." },
    ],
    content: ["Space tours", "Seasonal moments", "Guest reviews", "Last-minute availability"],
    image: "/made/industries/stay-hotel.webp",
  },
};

export function groupSlug(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export const GROUP_INFO: GroupInfo[] = GROUPS.map((name) => ({ name, slug: groupSlug(name), ...INFO[name]! }));

export function groupBySlug(slug: string): GroupInfo | undefined {
  return GROUP_INFO.find((g) => g.slug === slug);
}

export function groupFor(t: BusinessType): GroupInfo | undefined {
  return GROUP_INFO.find((g) => g.name === t.group);
}

export function tradesIn(g: GroupInfo): BusinessType[] {
  return typesInGroup(g.name);
}
