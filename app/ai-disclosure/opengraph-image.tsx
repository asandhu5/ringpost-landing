import { OG_SIZE, ogImage } from "@/lib/og";

export const alt = "Recording & AI Disclosure";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogImage("Recording & AI Disclosure", "Legal");
}
