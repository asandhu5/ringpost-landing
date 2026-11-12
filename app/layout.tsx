import React from "react";
import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Schibsted_Grotesk } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { VisitTracker } from "@/components/site/visit-tracker";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";
import { ChatWidget } from "@/components/site/chat-widget";
import { PointerGlow, ScrollProgress } from "@/components/site/motion";
import { SITE } from "@/lib/site";
import "./globals.css";

// Inter for reading, Schibsted Grotesk for headlines: a sturdy, newsy grotesque that
// reads as confident at display sizes without looking like every other SaaS page.
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const display = Schibsted_Grotesk({ subsets: ["latin"], variable: "--font-display-face", display: "swap", weight: ["600", "700", "800"] });
// Mono is only used for small URL labels and code in posts: not preloaded, so it never
// competes with Inter, which every headline waits for.
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", display: "swap", preload: false });

/** The site is hosted on Vercel; its analytics scripts load only on a Vercel build, so a
 * local or preview run never logs a missing-script error. */
const ON_VERCEL = process.env.VERCEL === "1";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  // "./" resolves to each page's own path, so every page is canonical to itself on the
  // www host.
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
    <html lang="en" className="bg-base" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body className={`${inter.variable} ${display.variable} ${jetbrainsMono.variable} font-sans antialiased`} suppressHydrationWarning>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-base">
          Skip to content
        </a>
        <ScrollProgress />
        <PointerGlow />
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <ChatWidget />
        {/* Vercel's free (Hobby) analytics: visitors and pages, and real-visitor page speed.
            Both load from this site's own /_vercel path, which the CSP already allows. */}
        {ON_VERCEL && <Analytics />}
        <VisitTracker />
        {ON_VERCEL && <SpeedInsights />}
      </body>
    </html>
  );
}
