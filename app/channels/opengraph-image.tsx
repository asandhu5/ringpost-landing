import { OG_SIZE, ogImage } from "@/lib/og";

export const alt = "Every place a customer reaches you, answered";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogImage("Every place a customer reaches you, answered", "Channels");
}
