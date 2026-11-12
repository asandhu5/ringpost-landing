import type { PreviewMedia, PreviewPlatform } from "@/components/site/phone/apps";

/**
 * The example posts on /posting and /content-studio. Every picture and video was made
 * with AI for this website (see docs/ASSETS.md); the businesses are invented examples,
 * not customers. Captions follow the platform's own style, the way RingPost writes one
 * caption per platform from the same words.
 */
export interface DemoItem {
  id: string;
  label: string;
  source: "studio" | "upload";
  media: PreviewMedia;
  business: { name: string; handle: string; color: string };
  captions: { social: string; short: string; professional: string; shorts: string };
}

export const DEMO_ITEMS: DemoItem[] = [
  {
    id: "bakery",
    label: "Strawberry cream cake",
    source: "studio",
    media: { kind: "image", src: "/made/studio/bakery-post.webp", alt: "A strawberry cream cake on a marble stand by a window" },
    business: { name: "Crumb & Co.", handle: "crumbandco", color: "#e0627a" },
    captions: {
      social: "Fresh strawberries, whipped cream and a sponge baked this morning. Whole cakes for the weekend can be ordered until Thursday. Message us to reserve yours. #Bakery #StrawberryCake #FreshlyBaked",
      short: "Strawberry cream cake, baked this morning. Weekend orders close Thursday.",
      professional: "Celebrating something this weekend? Our strawberry cream cake is baked fresh each morning, and whole cakes can be ordered until Thursday for collection on Saturday.",
      shorts: "Baked this morning: strawberry cream cake. Order by Thursday for the weekend. #Shorts",
    },
  },
  {
    id: "florist",
    label: "Peony bouquet",
    source: "studio",
    media: { kind: "image", src: "/made/studio/florist-post.webp", alt: "A bouquet of peonies and eucalyptus in brown paper, held in a flower shop" },
    business: { name: "Bloom & Stem", handle: "bloomandstem", color: "#8a5cf6" },
    captions: {
      social: "Peony season is here. Soft pink, deep magenta and fresh eucalyptus, wrapped and ready to go. Order by message for same-day collection. #Peonies #FlowerShop #Bouquet",
      short: "Peony season has started. Same-day bouquets, wrapped and ready.",
      professional: "Peony season has started. For office receptions and client gifts, we deliver wrapped bouquets on weekdays. Message us to set up a regular order.",
      shorts: "Peony season is here. Same-day bouquets. #Shorts #Flowers",
    },
  },
  {
    id: "burger",
    label: "House cheeseburger",
    source: "studio",
    media: { kind: "image", src: "/made/studio/burger-post.webp", alt: "A cheeseburger and fries on a wooden table in a warmly lit restaurant" },
    business: { name: "Ember Grill", handle: "embergrill", color: "#d97706" },
    captions: {
      social: "Friday means the house cheeseburger: aged beef, melted cheddar, a toasted bun and fries on the side. Tables free from 7 pm, book by message. #Burger #FridayNight #EmberGrill",
      short: "Friday night, house cheeseburger. Tables free from 7 pm.",
      professional: "Planning a team dinner? Ember Grill takes group bookings for up to 20 people, with our house cheeseburger on every menu. Message us for a table.",
      shorts: "The house cheeseburger, Friday night. #Shorts #Burger",
    },
  },
  {
    id: "salon",
    label: "Blow-dry reveal",
    source: "studio",
    media: { kind: "video", src: "/made/videos/salon-blowdry.mp4", poster: "/made/videos/salon-blowdry.webp", alt: "A blow-dry being finished in a salon" },
    business: { name: "Studio & Co.", handle: "studioandco", color: "#db2777" },
    captions: {
      social: "The finish that makes the week. Blow-dries from Tuesday to Saturday, and this week has a few evening spaces left. Message us to book. #BlowDry #HairSalon #SalonLife",
      short: "A few evening blow-dry spaces left this week.",
      professional: "Big meeting or event this week? Evening blow-dries are available from Tuesday to Saturday. Message us to book a time that works around your day.",
      shorts: "Blow-dry reveal. Evening spaces this week. #Shorts #Hair",
    },
  },
  {
    id: "auto",
    label: "Detailing finish",
    source: "studio",
    media: { kind: "video", src: "/made/videos/auto-detailing.mp4", poster: "/made/videos/auto-detailing.webp", alt: "A car being polished to a mirror finish" },
    business: { name: "Mirror Finish", handle: "mirrorfinish", color: "#0f766e" },
    captions: {
      social: "From the first rinse to the last buff. A full detail takes about four hours, and we have two slots left on Saturday. Message us to book. #CarDetailing #MirrorFinish",
      short: "Full detail, mirror finish. Two Saturday slots left.",
      professional: "Fleet cars looking tired? We detail company vehicles on site, on a schedule that suits your team. Message us for a regular slot.",
      shorts: "Watch the shine come back. #Shorts #CarDetailing",
    },
  },
];

export const POST_TARGETS: { id: PreviewPlatform; name: string; style: keyof DemoItem["captions"]; videoOnly?: boolean; note: string }[] = [
  { id: "instagram", name: "Instagram", style: "social", note: "Feed posts and Reels" },
  { id: "facebook", name: "Facebook", style: "social", note: "Page posts" },
  { id: "tiktok", name: "TikTok", style: "social", videoOnly: true, note: "Videos; you choose who can see each one" },
  { id: "youtube", name: "YouTube", style: "shorts", videoOnly: true, note: "Shorts" },
  { id: "x", name: "X", style: "short", note: "Kept within 280 characters" },
  { id: "linkedin", name: "LinkedIn", style: "professional", note: "Your profile or company page" },
  { id: "threads", name: "Threads", style: "short", note: "Posts with a photo or video" },
  { id: "pinterest", name: "Pinterest", style: "social", note: "Pins" },
  { id: "bluesky", name: "Bluesky", style: "short", note: "Posts with a photo or video" },
];
