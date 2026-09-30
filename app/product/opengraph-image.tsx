import { OG_SIZE, ogImage } from "@/lib/og";

export const alt = "An AI front desk that answers, books, and brings in more";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogImage("An AI front desk that answers, books, and brings in more", "AI Front Desk");
}
