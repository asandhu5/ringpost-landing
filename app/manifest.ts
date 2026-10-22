import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

/** Name, colours and icons for "Add to home screen" and browser UI. */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE.name}: ${SITE.tagline}`,
    short_name: SITE.name,
    description: SITE.description,
    start_url: "/",
    display: "browser",
    background_color: "#0a0a0f",
    theme_color: "#0a0a0f",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
