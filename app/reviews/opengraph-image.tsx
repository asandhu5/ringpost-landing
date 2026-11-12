import { FEATURES } from "@/lib/content/features";
import { OG_SIZE, ogImage } from "@/lib/og";

export const alt = FEATURES.reviews.title;
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogImage(FEATURES.reviews.title, FEATURES.reviews.eyebrow);
}
