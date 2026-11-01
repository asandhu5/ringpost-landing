import React from "react";
import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { VisitTracker } from "@/components/site/visit-tracker";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { SiteNav } from "@/components/site/nav";
import { SiteFooter } from "@/components/site/footer";
import { ChatWidget } from "@/components/site/chat-widget";
import { PointerGlow, ScrollProgress } from "@/components/site/motion";
import { SITE } from "@/lib/site";
import "./globals.css";

// One typeface, like the dashboard: Inter for text and (heavy, tight) for headings.
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  // "./" resolves to each page's own path, so every page is canonical to itself on the
  // www host. (It used to be "/" here, which made every page claim to be the homepage.)
  alternates: { canonical: "./", types: { "application/rss+xml": [{ url: "/feed.xml", title: `${SITE.name} blog` }] } },
  title: {
    default: `${SITE.name}: your AI business partner. Answers, books, grows.`,
    template: `%s · ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  openGraph: {
    siteName: SITE.name,
    type: "website",
    locale: "en_US",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#f7f8fa",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="bg-base">
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-base">
          Skip to content
        </a>
        <ScrollProgress />
        <PointerGlow />
        <SiteNav />
        <main id="main">{children}</main>
        <SiteFooter />
        <ChatWidget />
        {/* Vercel's free (Hobby) analytics: visitors and pages, and real-visitor page speed.
            Both load from this site's own /_vercel path, which the CSP already allows. */}
        <Analytics />
        <VisitTracker />
        <SpeedInsights />
      </body>
    </html>
  );
}
