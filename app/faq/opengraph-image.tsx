import { OG_SIZE, ogImage } from "@/lib/og";

export const alt = "Questions, answered straight";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogImage("Questions, answered straight", "FAQ");
}
