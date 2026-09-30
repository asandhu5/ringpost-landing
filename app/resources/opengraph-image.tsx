import { OG_SIZE, ogImage } from "@/lib/og";

export const alt = "Notes from the front desk";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogImage("Notes from the front desk", "Resources");
}
