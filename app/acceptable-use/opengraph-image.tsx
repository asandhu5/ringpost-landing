import { OG_SIZE, ogImage } from "@/lib/og";

export const alt = "Acceptable Use Policy";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogImage("Acceptable Use Policy", "Legal");
}
