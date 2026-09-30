import { OG_SIZE, ogImage } from "@/lib/og";

export const alt = "Talk to RingPost's AI. Right now.";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogImage("Talk to RingPost's AI. Right now.", "Demo");
}
