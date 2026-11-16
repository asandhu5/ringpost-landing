/** RingPost's own profiles, shown in the footer and listed as the Organization's sameAs.
 * An env var replaces a link if a handle ever changes. */
export const SOCIAL_PROFILES = [
  { id: "instagram", name: "Instagram", href: process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM_URL || "https://www.instagram.com/ringposttech/" },
  { id: "tiktok", name: "TikTok", href: process.env.NEXT_PUBLIC_SOCIAL_TIKTOK_URL || "https://www.tiktok.com/@ringposttech" },
  { id: "linkedin", name: "LinkedIn", href: process.env.NEXT_PUBLIC_SOCIAL_LINKEDIN_URL || "https://www.linkedin.com/company/ringpost/" },
  { id: "youtube", name: "YouTube", href: process.env.NEXT_PUBLIC_SOCIAL_YOUTUBE_URL || "https://www.youtube.com/@Ringposttech" },
] as const;
