import { OG_SIZE, ogImage } from "@/lib/og";

export const alt = "Three plans. No setup fee. 7 days free.";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogImage("Three plans. No setup fee. 7 days free.", "Pricing");
}
