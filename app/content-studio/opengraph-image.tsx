import { FEATURES } from "@/lib/content/features";
import { OG_SIZE, ogImage } from "@/lib/og";

export const alt = FEATURES.studio.title;
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogImage(FEATURES.studio.title, FEATURES.studio.eyebrow);
}
