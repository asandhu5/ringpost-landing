import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

const PAGES = ["", "/pricing", "/privacy", "/terms", "/acceptable-use", "/data-processing", "/ai-disclosure", "/data-deletion", "/refund-policy"];

export default function sitemap(): MetadataRoute.Sitemap {
  return PAGES.map((path) => ({
    url: `${SITE.url}${path}`,
    changeFrequency: path === "" || path === "/pricing" ? "weekly" : "yearly",
    priority: path === "" ? 1 : path === "/pricing" ? 0.8 : 0.3,
  }));
}
