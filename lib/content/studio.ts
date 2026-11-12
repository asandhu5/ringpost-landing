/** The Content Studio page's words (the owner's seven-part structure, 2026-11-12). */
export const STUDIO = {
  hero: {
    prompt: "Weekend brunch special, warm morning light, our logo in the corner",
    image: "/showcase/food-post.webp",
    video: "/showcase/food-video.mp4",
    alt: "Warm croissants on a bakery counter in morning light",
    caption: "Weekend brunch is on. Warm from the oven from 8 am, Saturday and Sunday.",
    examples: [
      { src: "/showcase/beauty-post.webp", label: "Salon" },
      { src: "/showcase/auto-post.webp", label: "Car detailing" },
      { src: "/showcase/fitness-post.webp", label: "Gym" },
      { src: "/showcase/shops-post.webp", label: "Florist" },
      { src: "/showcase/health-post.webp", label: "Dental" },
      { src: "/showcase/stays-post.webp", label: "Hotel" },
    ],
  },
  brand: {
    title: "Your brand on everything.",
    lede: "Your logo, your colors, your offer. On every image and every video.",
    frames: ["/showcase/beauty-post.webp", "/showcase/food-post.webp", "/showcase/shops-post.webp", "/showcase/auto-post.webp"],
    layers: [
      { id: "logo", name: "Your logo", line: "Placed in the corner, never stretched." },
      { id: "colors", name: "Your colors", line: "Taken from your logo and your Knowledge page." },
      { id: "offer", name: "Your offer", line: "The words come from your own details." },
    ],
  },
  own: {
    title: "Or use your own photos and videos.",
    lede: "Real work from your phone often does best. Upload it as it is and add a quick note.",
    note: "Peonies are in. Same-day bouquets.",
    caption: "Peonies are back. Same-day delivery on orders before 2 pm.",
    photo: "/showcase/shops-photo.webp",
    roll: ["/showcase/shops-photo.webp", "/showcase/food-photo.webp", "/showcase/beauty-photo.webp", "/showcase/home-photo.webp", "/showcase/auto-photo.webp", "/showcase/fitness-photo.webp"],
    limits: ["Photos up to 20 MB, videos up to 100 MB", "JPEG, PNG, WEBP, HEIC, MP4 and MOV", "Carries on after a dropped signal"],
  },
  daily: {
    title: "Fresh posts every morning.",
    lede: "Choose how much you want. New posts wait in your Media Library each morning, built on the ones your audience responded to. Nothing is posted until you pick it.",
    cadences: [
      { id: "day", name: "1 a day", week: ["i", "i", "i", "i", "i", "i", "i"] },
      { id: "three", name: "3 a week", week: ["i", "", "i", "", "i", "", ""] },
      { id: "mix", name: "2 pictures and 1 video a week", week: ["i", "", "", "v", "", "i", ""] },
    ],
    shots: ["/showcase/beauty-post.webp", "/showcase/food-post.webp", "/showcase/shops-post.webp", "/showcase/fitness-post.webp", "/showcase/auto-post.webp", "/showcase/stays-post.webp", "/showcase/health-post.webp"],
    note: "Holidays and quiet days in your country are taken into account.",
  },
  checked: {
    title: "Checked before you see it.",
    items: [
      { id: "words", t: "The words are right", d: "Words on images come from your own details, and each one is checked before it reaches you." },
      { id: "cost", t: "You see the cost first", d: "The credit cost is shown before anything is made. No surprises." },
      { id: "back", t: "A failed one costs nothing", d: "If something doesn't come out, the credits go straight back." },
    ],
  },
  shapes: {
    title: "The right shape for every app.",
    lede: "One picture, reshaped for each place it goes.",
    image: "/showcase/beauty-post.webp",
    alt: "A salon client's finished balayage",
    list: [
      { id: "square", name: "Square", ratio: "1:1", w: 1, h: 1, apps: ["instagram", "facebook", "linkedin"], where: "Instagram, Facebook and LinkedIn feeds" },
      { id: "portrait", name: "Portrait", ratio: "4:5", w: 4, h: 5, apps: ["instagram", "facebook", "threads"], where: "Instagram and Facebook feeds, Threads" },
      { id: "tall", name: "Tall", ratio: "9:16", w: 9, h: 16, apps: ["instagram", "tiktok", "youtube"], where: "Reels, Stories, TikTok and Shorts" },
      { id: "wide", name: "Wide", ratio: "16:9", w: 16, h: 9, apps: ["youtube", "facebook", "linkedin", "x"], where: "YouTube, Facebook, LinkedIn and X" },
    ],
  },
} as const;
