import { OG_SIZE, ogImage } from "@/lib/og";

export const alt = "Call RingPost's AI from your browser";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogImage("Call RingPost's AI from your browser", "Live call");
}
