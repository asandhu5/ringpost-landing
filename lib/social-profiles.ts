/** RingPost profile destinations. Override with the account URL when a handle differs. */
export const SOCIAL_PROFILES = [
 { id:"instagram",name:"Instagram",href:process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM_URL || "https://www.instagram.com/ringpost/" },
 { id:"facebook",name:"Facebook",href:process.env.NEXT_PUBLIC_SOCIAL_FACEBOOK_URL || "https://www.facebook.com/ringpost/" },
 { id:"tiktok",name:"TikTok",href:process.env.NEXT_PUBLIC_SOCIAL_TIKTOK_URL || "https://www.tiktok.com/@ringpost" },
 { id:"youtube",name:"YouTube",href:process.env.NEXT_PUBLIC_SOCIAL_YOUTUBE_URL || "https://www.youtube.com/@ringpost" },
 { id:"x",name:"X",href:process.env.NEXT_PUBLIC_SOCIAL_X_URL || "https://x.com/ringpost" },
 { id:"linkedin",name:"LinkedIn",href:process.env.NEXT_PUBLIC_SOCIAL_LINKEDIN_URL || "https://www.linkedin.com/company/ringpost/" },
 { id:"threads",name:"Threads",href:process.env.NEXT_PUBLIC_SOCIAL_THREADS_URL || "https://www.threads.net/@ringpost" },
 { id:"pinterest",name:"Pinterest",href:process.env.NEXT_PUBLIC_SOCIAL_PINTEREST_URL || "https://www.pinterest.com/ringpost/" },
 { id:"bluesky",name:"Bluesky",href:process.env.NEXT_PUBLIC_SOCIAL_BLUESKY_URL || "https://bsky.app/profile/ringpost.bsky.social" },
];
