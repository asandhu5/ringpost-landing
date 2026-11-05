import fs from "node:fs";
import path from "node:path";

/**
 * The short videos on the site, each made by Runway from one image (the platform's
 * `pnpm --filter @agos/worker website:videos`), one or more per industry group so the
 * site shows every kind of business. Only files that exist are shown, so nothing on the
 * site is a placeholder.
 */
export interface SiteVideo {
  id: string;
  /** The industry group slug (lib/content/groups.ts). */
  group: string;
  label: string;
  /** A still from the same set, shown next to the video in Content Studio. */
  image?: string;
}

const VIDEOS: SiteVideo[] = [
  { id: "salon-blowdry", group: "beauty-and-wellness", label: "Beauty · the finished look", image: "/made/ideas/result-closeup.webp" },
  { id: "health-dental", group: "health", label: "Health · a confident smile", image: "/made/reception-flowers.webp" },
  { id: "fitness-gym", group: "fitness", label: "Fitness · a new personal best" },
  { id: "food-cafe", group: "food-and-drink", label: "Food and drink · the morning pour", image: "/made/restaurant-dish.webp" },
  { id: "home-plumber", group: "home-services", label: "Home services · job done" },
  { id: "auto-detailing", group: "auto", label: "Auto · the mirror finish" },
  { id: "pro-office", group: "professional-services", label: "Professional services · a warm welcome" },
  { id: "care-grooming", group: "education-and-care", label: "Care · a happy customer" },
  { id: "shop-florist", group: "shops", label: "Shops · made to order", image: "/made/ideas/products-flatlay.webp" },
  { id: "stay-hotel", group: "stays-and-venues", label: "Stays · ready for you", image: "/made/reception-evening.webp" },
  { id: "restaurant-dish", group: "food-and-drink", label: "Food and drink · dish of the day" },
  { id: "barber-fade", group: "beauty-and-wellness", label: "Beauty · the perfect fade" },
];

export function siteVideos(): { src: string; poster: string; label: string; group: string; image?: string }[] {
  return VIDEOS.filter((v) => fs.existsSync(path.join(process.cwd(), "public/made/videos", `${v.id}.mp4`))).map((v) => ({
    src: `/made/videos/${v.id}.mp4`,
    poster: `/made/videos/${v.id}.webp`,
    label: v.label,
    group: v.group,
    image: v.image,
  }));
}
