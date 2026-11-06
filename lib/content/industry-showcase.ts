/**
 * One example for each of the ten kinds of business: the owner's phone photo, the post
 * RingPost makes from it, and a caption. Used on the home page, Content Studio and
 * Posting so every page shows the same businesses. The pictures were made with AI for the
 * website (docs/ASSETS.md); the businesses are invented examples.
 */
export interface IndustryShowcase {
  slug: string;
  group: string;
  business: { name: string; handle: string; color: string };
  title: string;
  before: string;
  after: string;
  caption: string;
}

const img = (id: string) => ({ before: `/made/studio/${id}-phone.webp`, after: `/made/studio/${id}-post.webp` });

export const INDUSTRY_SHOWCASE: IndustryShowcase[] = [
  { slug: "beauty-and-wellness", group: "Beauty and wellness", business: { name: "Studio & Co.", handle: "studioandco", color: "#db2777" }, title: "Fresh balayage", ...img("beauty"), caption: "Soft, sunlit balayage for the new season. A few colour appointments are free this week. Message us to book. #Balayage #HairColour" },
  { slug: "health", group: "Health", business: { name: "Brightside Dental", handle: "brightsidedental", color: "#0284c7" }, title: "A calm first visit", ...img("health"), caption: "Nervous about the dentist? Our rooms are calm and we never rush. New patients welcome, message us for a time that suits you." },
  { slug: "fitness", group: "Fitness", business: { name: "Forge Fitness", handle: "forgefitness", color: "#ea580c" }, title: "6 am, ready for you", ...img("fitness"), caption: "The racks are loaded and the coffee's on. Early classes start at 6 am, all levels welcome. #MorningWorkout #StrengthTraining" },
  { slug: "food-and-drink", group: "Food and drink", business: { name: "Ember Grill", handle: "embergrill", color: "#d97706" }, title: "Friday burger", ...img("burger"), caption: "Friday means the house cheeseburger: aged beef, melted cheddar and fries on the side. Tables free from 7 pm. #Burger #FridayNight" },
  { slug: "home-services", group: "Home services", business: { name: "Clearflow Plumbing", handle: "clearflowplumbing", color: "#16a34a" }, title: "Job done", ...img("home"), caption: "New tap, no drips, no mess left behind. Same-week appointments for repairs and installs. Message us a photo of the job." },
  { slug: "auto", group: "Auto", business: { name: "Mirror Finish", handle: "mirrorfinish", color: "#0f766e" }, title: "Interior detail", ...img("auto"), caption: "Every seam, vent and dial cleaned by hand. A full interior detail takes about three hours. Two Saturday slots left. #CarDetailing" },
  { slug: "professional-services", group: "Professional services", business: { name: "Ledger & Lane", handle: "ledgerandlane", color: "#4f46e5" }, title: "Tax season, sorted", ...img("professional"), caption: "Tax deadline coming up? Bring your paperwork and we'll take it from there. Appointments this week, in person or online." },
  { slug: "education-and-care", group: "Education and care", business: { name: "Pawfect Grooming", handle: "pawfectgrooming", color: "#0d9488" }, title: "Fresh from the groom", ...img("care"), caption: "Fluffed, trimmed and very pleased with himself. Grooming appointments open for next week. #DogGrooming #FreshCut" },
  { slug: "shops", group: "Shops", business: { name: "Bloom & Stem", handle: "bloomandstem", color: "#8a5cf6" }, title: "Peony season", ...img("florist"), caption: "Peony season is here. Soft pink, deep magenta and fresh eucalyptus, wrapped and ready. Same-day collection. #Peonies #FlowerShop" },
  { slug: "stays-and-venues", group: "Stays and venues", business: { name: "The Harbour Rooms", handle: "harbourrooms", color: "#b45309" }, title: "Golden-hour rooms", ...img("stays"), caption: "Coffee in bed and the sun on the water. Midweek stays are quieter, and a little cheaper. Message us to check dates. #WeekendAway" },
];
