import data from "@/data/business-types.json";

/**
 * The industry pages, built from packages/db/src/business-types.ts (exported to
 * data/business-types.json by the platform's `pnpm website:export`). The platform has
 * 48 trades plus "Something else", so there are 49 pages.
 *
 * Every page is assembled from that trade's OWN data: its ways of selling, its customers'
 * questions, the lines its AI never crosses, the topics it always hands to the owner,
 * what it asks a customer, its catalogue labels and the words people search for it by.
 * Eight trades are also written by hand (DEEP below). A trade whose spec carries no rules,
 * no hand-off topics and no vertical template has little of its own to say yet; those
 * pages are built but marked noindex until the spec is filled in (see `isSparse`), so
 * the site never ships near-duplicate pages for search engines to judge as doorways.
 */

export type SellingMode = keyof typeof data.sellingModeLabels;

export interface BusinessType {
  id: string;
  label: string;
  group: string;
  verticalId: string;
  modes: SellingMode[];
  aliases: string[];
  catalogLabel: string;
  itemsLabel: string;
  suggestedPolicies: string[];
  suggestedQuestions: string[];
  handoffTopics: string[];
  behaviourRules: string[];
  intakeSuggestions: string[];
  template: {
    id: string;
    escalationKeywords: string[];
    bannedClaims: string[];
    behaviourRules: string[];
    conversationExamples: { customer: string; reply: string }[];
    knowledgeTitles: string[];
  } | null;
}

export const TYPES = data.types as BusinessType[];
export const GROUPS = data.groups;
export const MODE_LABELS = data.sellingModeLabels as Record<SellingMode, string>;
export const BASE_ESCALATIONS = data.baseEscalationKeywords;

export interface Turn {
  from: "customer" | "ai" | "note";
  text: string;
}

export interface DeepContent {
  intro: string[];
  /** How the AI handles this trade's real questions. */
  handling: { q: string; a: string }[];
  booking: string;
  conversation: Turn[];
}

/** The eight trades written by hand, chosen for the richest specs. */
export const DEEP: Record<string, DeepContent> = {
  hair_salon: {
    intro: [
      "A salon's phone rings hardest when every chair is full and every hand is busy with colour or scissors. The client who can't get through books with the salon down the road, and the one who messaged on Instagram last night is still waiting.",
      "RingPost answers every call and message from your own service menu, prices and stylists' availability, books the appointment, and sends a reminder before it.",
    ],
    handling: [
      { q: "\"How much is a full head of colour?\"", a: "It gives the price from your own service list. If a price depends on hair length or a consultation, it says so, because it can't state a price that isn't in your list." },
      { q: "\"Can I see Maria on Saturday?\"", a: "It checks that stylist's own diary, not just the salon's, and offers the times she's actually free." },
      { q: "\"I had a reaction to my last colour\"", a: "It doesn't give advice. A salon's AI passes allergic reactions, burns and anything about chemicals straight to you." },
    ],
    booking: "Appointments, booked against each stylist's own calendar, with the service's real duration so a colour and a trim never collide.",
    conversation: [
      { from: "customer", text: "hi do you have anything for a cut and blow dry tomorrow after work?" },
      { from: "ai", text: "We do. Tomorrow there's 5:30 pm with Jess or 6:15 pm with Sam. Which suits you?" },
      { from: "customer", text: "5:30 with jess" },
      { from: "note", text: "Books the appointment, then confirms" },
      { from: "ai", text: "You're booked with Jess tomorrow at 5:30 pm for a cut and blow dry. You'll get a reminder before your visit." },
    ],
  },
  dental: {
    intro: [
      "Dental reception is a juggling act: new-patient enquiries, insurance questions, reschedules, and the patient in pain who needs to be seen today. Miss the call and an anxious patient doesn't always ring back.",
      "RingPost answers from your own treatments, prices and hours, books into your clinicians' diaries, and passes anything clinical straight to your team.",
    ],
    handling: [
      { q: "\"Are you taking new patients?\"", a: "It answers from your own information and books a first visit, collecting what your team needs." },
      { q: "\"My tooth has been hurting since yesterday\"", a: "It never guesses what a symptom might be. Pain, swelling, bleeding and a broken tooth are passed to your team, and it offers the next available appointment." },
      { q: "\"How much will a crown cost?\"", a: "It won't estimate the cost of treatment before a dentist has examined the patient. It can give the price of an examination from your list." },
    ],
    booking: "Appointments with each dentist or hygienist, from their own availability, with a reminder before the visit.",
    conversation: [
      { from: "customer", text: "my tooth has been hurting since yesterday" },
      { from: "ai", text: "That's worth getting looked at rather than waiting. I can't advise on symptoms, but I can find you the next appointment. Would today or tomorrow be better?" },
      { from: "customer", text: "today if possible" },
      { from: "ai", text: "The first opening today is 3:40 pm with Dr Patel. Shall I book it? If the pain gets much worse or there's swelling, please call us straight away." },
    ],
  },
  restaurant: {
    intro: [
      "Service is when the phone rings most and when nobody can answer it. Reservations, \"are you open?\", allergy questions and big-group enquiries all arrive at once, on the phone, on Instagram and on WhatsApp.",
      "RingPost takes reservations from your real table availability, answers from your own menu, and passes allergies, private dining and anything unusual to you.",
    ],
    handling: [
      { q: "\"Table for 4 at 8 on Friday?\"", a: "It checks your real availability for that party size and books it, or offers the nearest times that are free." },
      { q: "\"Is the risotto nut-free?\"", a: "Allergy and food-safety questions are passed to you. It won't reassure a guest about an allergen on its own." },
      { q: "\"Can we book the whole place for a party?\"", a: "Private dining and catering requests go to you as a lead, with the details it gathered." },
    ],
    booking: "Tables and orders: reservations by party size and time, with your own rules for large groups and how long a table is held.",
    conversation: [
      { from: "customer", text: "hey can I get a table for 6 this saturday around 8" },
      { from: "ai", text: "Saturday at 8 is full for six, but I can do 7:15 pm or 9:00 pm. Would either work?" },
      { from: "customer", text: "7:15. one of us has a nut allergy" },
      { from: "ai", text: "Booked: six people, Saturday at 7:15 pm. I've noted the nut allergy for the team, and they'll confirm what's safe on the menu." },
    ],
  },
  plumber: {
    intro: [
      "A plumber's best-paid calls come at the worst times: a burst pipe on a Sunday, a leak under the sink while you're on another job. Whoever answers first usually gets the work.",
      "RingPost answers every call while you're under a sink, gets the address and the problem, gives your call-out fee, books the visit, and treats danger as danger.",
    ],
    handling: [
      { q: "\"How much to fix a leaking pipe?\"", a: "It never quotes a fixed price for a job nobody has seen. It gives your call-out fee or a range from your price list and offers a visit." },
      { q: "\"I can smell gas\"", a: "It tells the caller to get safe and call the emergency services first, and alerts you. Gas leaks, flooding, burning smells, carbon monoxide and no heat are always handed over." },
      { q: "\"Do you cover my area?\"", a: "It answers from the service area you set, and gets the address for the visit." },
    ],
    booking: "Jobs at the customer's place: it collects the address, what the problem is and how urgent it is, then books a visit.",
    conversation: [
      { from: "customer", text: "water leaking under my kitchen sink, can someone come today?" },
      { from: "ai", text: "Sorry to hear that. Is the water still running, or have you been able to turn it off at the stopcock?" },
      { from: "customer", text: "turned it off" },
      { from: "ai", text: "Good. I can't price the repair without someone seeing it, but I can book a visit. What's the address? Today there's a slot between 2 and 4 pm." },
    ],
  },
  auto_repair: {
    intro: [
      "Mechanics get asked the impossible over the phone: \"what's that noise, and how much to fix it?\" A good garage won't answer until it's seen the car, and neither will RingPost.",
      "It books the car in for a service, repair or inspection from your own list, and passes accidents, breakdowns and warranty disputes to you.",
    ],
    handling: [
      { q: "\"How much to fix my brakes?\"", a: "It won't diagnose a fault or quote a repair price without the car being inspected. It can book an inspection and give that price from your list." },
      { q: "\"My car broke down on the motorway\"", a: "Breakdowns and accidents are handed straight to you, with the caller's details." },
      { q: "\"When can I drop it off for a service?\"", a: "It offers real times from your workshop calendar and books it in." },
    ],
    booking: "Appointments for services and repairs, from your own list of services and repairs and your workshop's availability.",
    conversation: [
      { from: "customer", text: "my car is making a grinding noise when I brake. how much will it be?" },
      { from: "ai", text: "I can't say what it is or what it'll cost without a mechanic looking at it, but we can check it. Could you bring it in tomorrow at 9:00 am or 1:30 pm?" },
      { from: "customer", text: "9 works" },
      { from: "ai", text: "Booked for tomorrow at 9:00 am for a brake inspection. If it gets worse before then, it's safer not to drive it." },
    ],
  },
  law_firm: {
    intro: [
      "A law firm's phone carries people at difficult moments: an arrest, a court date, a custody question. They need a calm, accurate first contact and a consultation, not legal advice from a receptionist.",
      "RingPost books consultations from your own fees and availability, never offers an opinion on anyone's case, and hands urgent matters to you at once.",
    ],
    handling: [
      { q: "\"Do I have a case?\"", a: "It never gives legal advice or an opinion on a case. It offers a consultation and gathers what the matter is about." },
      { q: "\"My brother has just been arrested\"", a: "Arrests, court dates, subpoenas, custody, criminal charges, eviction notices and restraining orders are passed to you immediately." },
      { q: "\"How much is a consultation?\"", a: "It gives your consultation fee from your own information, and books one." },
    ],
    booking: "Consultations, with what the matter is about and the best time to reach the person.",
    conversation: [
      { from: "customer", text: "I got an eviction notice today. what can I do?" },
      { from: "ai", text: "I'm sorry, that's stressful. I can't give legal advice, but I've flagged this to the team as urgent so a lawyer can look at it. What's the best number and time to reach you?" },
      { from: "customer", text: "this number, any time today" },
      { from: "ai", text: "Thank you. The team has your details and will call you today. If you'd like, I can also book a consultation." },
    ],
  },
  gym: {
    intro: [
      "A gym's enquiries are about memberships, timetables and trials, and they arrive at 6 am and 10 pm, when the front desk is empty.",
      "RingPost answers from your own membership options and timetable, books classes, trials and sessions, and passes injuries and billing disputes to you.",
    ],
    handling: [
      { q: "\"Is there a free trial?\"", a: "It answers from your own trial and membership policies, then books the visit." },
      { q: "\"I want to cancel my membership\"", a: "Membership cancellations and billing disputes are passed to you, so a person handles them." },
      { q: "\"I hurt my back in class\"", a: "Injuries and medical emergencies are handed over straight away." },
    ],
    booking: "Memberships and courses, plus bookable classes and sessions, from your real timetable.",
    conversation: [
      { from: "customer", text: "do you do a trial? want to try a spin class" },
      { from: "ai", text: "We do. Tomorrow's spin classes are at 7:00 am and 6:30 pm. Shall I book you a trial place?" },
      { from: "customer", text: "6:30 please" },
      { from: "ai", text: "You're booked into tomorrow's 6:30 pm spin class. Bring water and a towel, and arrive ten minutes early to get set up." },
    ],
  },
  veterinary: {
    intro: [
      "A vet's phone carries worried owners, and some calls are emergencies. The front desk needs to book routine visits smoothly and never get an emergency wrong.",
      "RingPost books appointments from your own services and availability, never guesses what's wrong with an animal, and sends emergencies straight to the phone.",
    ],
    handling: [
      { q: "\"My dog ate chocolate, is that bad?\"", a: "It never gives veterinary advice or guesses what's wrong. Poisoning, being hit by a car, not breathing and bleeding are emergencies it hands over straight away." },
      { q: "\"When can I bring my cat in for vaccinations?\"", a: "It offers real appointment times and books the visit." },
      { q: "\"Do you sell flea treatment?\"", a: "It answers from your own products, and it won't advise on doses." },
    ],
    booking: "Appointments, plus products from your own list.",
    conversation: [
      { from: "customer", text: "my dog just ate a bar of dark chocolate" },
      { from: "ai", text: "Please call us now so the team can advise you straight away. I've alerted them that this is urgent." },
      { from: "note", text: "Passed to the team as an emergency" },
    ],
  },
  hvac: {
    intro: [
      "Heating and cooling calls spike exactly when the weather turns and your engineers are already out. A household with no heat in January, or no cooling in a heatwave, calls whoever answers first.",
      "RingPost answers every call, gets the address, the system and what's wrong, gives your call-out fee, books the visit, and treats a gas smell or carbon monoxide as an emergency, not a booking.",
    ],
    handling: [
      { q: "\"My boiler's making a banging noise, how much to fix it?\"", a: "It never quotes a fixed price for a job nobody has seen. It gives your call-out or diagnostic fee from your price list and offers a visit." },
      { q: "\"I think I can smell gas\" / \"the carbon monoxide alarm is going off\"", a: "It tells the caller to get safe and call the emergency services first, and alerts you. Gas leaks, carbon monoxide, burning smells and fire are always handed over." },
      { q: "\"We've got no heat and a baby at home\"", a: "\"No heat\" is one of the topics it passes to you straight away, with the address and details, so you can decide how fast to get there." },
    ],
    booking: "Jobs at the customer's place: it collects the address, what the problem is and how urgent it is, then books a visit for a service, repair or installation quote.",
    conversation: [
      { from: "customer", text: "our furnace stopped working last night. can someone come out?" },
      { from: "ai", text: "Sorry to hear that. Is anyone at home vulnerable to the cold, and can you smell gas or burning at all?" },
      { from: "customer", text: "no smell, just no heat. two kids at home" },
      { from: "note", text: "\"no heat\" is handed to the owner as a priority" },
      { from: "ai", text: "Thanks. I've flagged this to the team as urgent. What's the address? I can't price the repair without an engineer seeing it, but I can book the first visit available." },
    ],
  },
  electrician: {
    intro: [
      "An electrician's phone rings with everything from \"can you fit three sockets?\" to \"there are sparks coming from the fuse box\". The first is a quote; the second is an emergency, and they need very different answers.",
      "RingPost books the quotes and visits from your own prices, and when a caller describes sparks, burning or fire, it tells them to get safe first and alerts you.",
    ],
    handling: [
      { q: "\"How much to rewire a kitchen?\"", a: "It never quotes a fixed price for a job nobody has seen. It gives your call-out fee or a range from your price list and offers a visit to quote properly." },
      { q: "\"There's a burning smell from the consumer unit\"", a: "It tells the caller to get safe and call the emergency services first, and hands it to you. Burning smells, fire and flooding are always handed over." },
      { q: "\"Do you do EV charger installs?\"", a: "It answers from the services you've listed, and if something isn't there, says it will check with you rather than guessing." },
    ],
    booking: "Jobs at the customer's place: the address, what the job is and how urgent it is, then a booked visit or quote.",
    conversation: [
      { from: "customer", text: "half my sockets stopped working and there's a burning smell near the fuse box" },
      { from: "ai", text: "Please don't touch the fuse box. If you can smell burning or see smoke, get everyone out and call the emergency services. I've alerted the team that this is urgent." },
      { from: "note", text: "\"burning smell\" is always handed to the owner" },
      { from: "ai", text: "When it's safe, what's the address? The team will call you back as soon as they can." },
    ],
  },
  locksmith: {
    intro: [
      "A locksmith's calls are often urgent and sometimes sensitive. Someone locked out at night wants a person now; someone reporting a break-in may be shaken. Neither should be left to a script.",
      "RingPost books routine jobs (new locks, spare keys, upgrades) from your own prices, and hands \"locked out\" and \"break-in\" straight to you with the caller's details.",
    ],
    handling: [
      { q: "\"I'm locked out of my house\"", a: "\"Locked out\" goes straight to you as a priority, with the caller's location and number, so a person decides when you can get there." },
      { q: "\"We've had a break-in and need the locks changed\"", a: "\"Break-in\" is handed to you immediately. It doesn't try to handle it alone." },
      { q: "\"How much to change a front door lock?\"", a: "It never quotes a fixed price for a job nobody has seen: it gives your call-out fee or a range from your price list and offers a visit." },
    ],
    booking: "Jobs at the customer's place: the address, what's needed and how urgent it is, then a booked visit.",
    conversation: [
      { from: "customer", text: "locked out of my flat, keys are inside. can you come?" },
      { from: "note", text: "\"locked out\" is always handed to the owner" },
      { from: "ai", text: "I'm sorry, that's stressful. I've passed this to the team as a priority. What's the address, and is this the best number to reach you on?" },
      { from: "customer", text: "yes this number" },
      { from: "ai", text: "Thanks. The team has your details and will call you back as soon as they can." },
    ],
  },
};

export function typeBySlug(slug: string): BusinessType | undefined {
  return TYPES.find((t) => slugFor(t) === slug);
}

export function slugFor(t: BusinessType): string {
  return t.id.replace(/_/g, "-");
}

/** Everything a page can say that is specific to this trade. */
export function rulesFor(t: BusinessType): string[] {
  return [...new Set([...t.behaviourRules, ...(t.template?.behaviourRules ?? [])])];
}

export function escalationsFor(t: BusinessType): string[] {
  return [...new Set([...t.handoffTopics, ...(t.template?.escalationKeywords ?? [])])];
}

/** A trade with no rules, no hand-off topics and no template of its own. */
export function isSparse(t: BusinessType): boolean {
  return !DEEP[t.id] && rulesFor(t).length === 0 && escalationsFor(t).length === 0 && !t.template;
}

/** The shortest honest name for headings: "Hair salon", "Plumber", "Café or bakery". */
export function shortLabel(t: BusinessType): string {
  return t.label.replace(/\s*\(.*\)\s*/, "");
}


/** How a heading names the trade in the plural ("AI receptionist for plumbers"). */
const PLURAL: Record<string, string> = {
  hair_salon: "hair salons",
  barbershop: "barbershops",
  nail_salon: "nail salons",
  beauty_salon: "beauty salons",
  med_spa: "med spas and aesthetics clinics",
  spa_massage: "spas and massage therapists",
  tattoo: "tattoo and piercing studios",
  dental: "dental clinics",
  medical_clinic: "medical clinics and doctors",
  physiotherapy: "physiotherapists and chiropractors",
  optometrist: "opticians and eye clinics",
  veterinary: "veterinary clinics",
  therapy: "therapists and counsellors",
  gym: "gyms and fitness centres",
  yoga_pilates: "yoga and Pilates studios",
  martial_arts: "martial arts and dance schools",
  personal_trainer: "personal trainers and coaches",
  restaurant: "restaurants",
  cafe_bakery: "cafés and bakeries",
  takeaway: "takeaways and food delivery",
  catering: "caterers and custom cake makers",
  hvac: "heating and air conditioning companies",
  plumber: "plumbers",
  electrician: "electricians",
  cleaning: "cleaning services",
  pest_control: "pest control companies",
  landscaping: "landscapers and gardeners",
  builder: "builders, roofers and renovators",
  locksmith: "locksmiths",
  movers: "movers and removal companies",
  handyman: "handymen and appliance repair",
  auto_repair: "auto repair shops and mechanics",
  auto_detailing: "car detailers and car washes",
  law_firm: "law firms",
  accounting: "accountants and tax preparers",
  real_estate: "real estate agencies",
  insurance_finance: "insurance brokers and financial advisers",
  photography: "photographers and studios",
  tutoring: "tutors and lesson providers",
  driving_school: "driving schools",
  childcare: "daycares and childcare providers",
  pet_grooming: "pet groomers and boarding",
  retail_shop: "shops and boutiques",
  florist: "florists and gift shops",
  pharmacy: "pharmacies",
  hotel: "hotels and guest houses",
  event_venue: "event venues and halls",
  rentals: "car and equipment rental companies",
};

export function pluralFor(t: BusinessType): string {
  return PLURAL[t.id] ?? `${shortLabel(t).toLowerCase()} businesses`;
}

const MODE_BOOKING: Record<SellingMode, string> = {
  appointments: "books appointments from your real availability and the service's own duration",
  tables_orders: "takes table reservations by party size and time, and answers questions about your menu and orders",
  jobs_on_site: "books visits to the customer's place, after getting the address, the problem and how urgent it is",
  products: "answers questions about what you sell, stock, delivery and collection from your own product list",
  stays_rentals: "handles stays and rentals by date and number of people, with your check-in, deposit and damage rules",
  consultations: "books consultations, collecting what it's about and the best time to reach the person",
  memberships: "answers questions about memberships, courses, trials and timetables, and books classes and sessions",
};

export function bookingFor(t: BusinessType): string {
  if (DEEP[t.id]) return DEEP[t.id].booking;
  if (t.modes.length === 0) return "You answer three questions (do customers book a time, do you go to them, do you sell products) and RingPost works out how to book from your answers.";
  const parts = t.modes.map((m) => MODE_BOOKING[m]);
  return `For ${pluralFor(t)}, RingPost ${parts.length === 1 ? parts[0] : `${parts.slice(0, -1).join(", ")}, and ${parts[parts.length - 1]}`}.`;
}

/**
 * A short worked conversation for a templated trade, built from that trade's own data:
 * one of its customers' real questions, what the AI asks for, and, where the trade has
 * one, a topic it always hands over. Deliberately no prices: an illustration must not put
 * a number in a business's mouth.
 */
export function conversationFor(t: BusinessType): Turn[] {
  if (DEEP[t.id]) return DEEP[t.id].conversation;
  if (t.template?.conversationExamples?.length) {
    const ex = t.template.conversationExamples[0];
    return [
      { from: "customer", text: ex.customer },
      { from: "ai", text: ex.reply },
    ];
  }
  const escalation = escalationsFor(t)[0];
  const q = t.suggestedQuestions[0] ?? "Can I book something this week?";
  const intake = t.intakeSuggestions.map((s) => s.toLowerCase());
  const policy = t.suggestedPolicies[0];
  const turns: Turn[] = [
    { from: "customer", text: q },
    { from: "note", text: `Answers from the business's own ${t.catalogLabel.toLowerCase()}${policy ? ` and ${policy.toLowerCase()} policy` : ""}; if the answer isn't there, it says it will check` },
    { from: "ai", text: intake.length ? `Happy to help with that. So I can get you booked in, could I take ${listOf(intake)}?` : "Happy to help with that. What would you like to book?" },
  ];
  if (escalation) {
    turns.push({ from: "customer", text: `it's urgent: ${escalation}` });
    turns.push({ from: "note", text: `"${escalation}" is always handed to the owner` });
    turns.push({ from: "ai", text: "Thanks for telling me. I've passed this to the team as a priority and they'll be in touch with you shortly." });
  }
  return turns;
}

function listOf(items: string[]): string {
  return items.length === 1 ? items[0] : `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;
}

/** Headline search terms: the label, then the spec's aliases. */
export function searchTerms(t: BusinessType): string[] {
  return [shortLabel(t).toLowerCase(), ...t.aliases];
}

export function typesInGroup(group: string): BusinessType[] {
  return TYPES.filter((t) => t.group === group);
}

/** "Something else": the page for every business not in the list. */
export const SOMETHING_ELSE = {
  slug: "something-else",
  label: "Something else",
  questions: ["Do customers book a time with you?", "Do you go to the customer's place?", "Do you sell products?"],
};
