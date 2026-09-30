import { OG_SIZE, ogImage } from "@/lib/og";

export const alt = "Data Deletion";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogImage("Data Deletion", "Legal");
}
