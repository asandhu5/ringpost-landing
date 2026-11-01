"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { API_URL } from "@/lib/site";

/**
 * Counts each page opened on the website for the founder console's "Website visits"
 * (apps/api/src/routes/site-analytics.ts). One small beacon per page, no cookies, and
 * nothing that identifies the visitor.
 */
export function VisitTracker() {
  const pathname = usePathname();
  useEffect(() => {
    if (!pathname) return;
    const body = JSON.stringify({ path: pathname, ref: document.referrer || undefined });
    try {
      if (!navigator.sendBeacon?.(`${API_URL}/public/site-visit`, body)) {
        void fetch(`${API_URL}/public/site-visit`, { method: "POST", body, keepalive: true, mode: "no-cors" });
      }
    } catch {
      // A blocked beacon only means one visit isn't counted.
    }
  }, [pathname]);
  return null;
}
