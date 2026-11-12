import { OG_SIZE, ogImage } from "@/lib/og";

export const alt = "Built for your kind of business";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogImage("Built for your kind of business", "Industries");
}
