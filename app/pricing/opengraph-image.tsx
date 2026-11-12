import { OG_SIZE, ogImage } from "@/lib/og";

export const alt = "Plans from $39 a month.";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogImage("Plans from $39 a month.", "Pricing");
}
