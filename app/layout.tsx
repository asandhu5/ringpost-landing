import React from "react"
import type { Metadata, Viewport } from 'next'
import { Instrument_Sans, Instrument_Serif, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { SITE } from '@/lib/site'
import { SiteChat } from '@/components/site-chat/site-chat'
import './globals.css'

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: '--font-instrument',
  display: 'swap',
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: '--font-instrument-serif',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: '--font-jetbrains',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: `${SITE.name}: your AI front office. Never miss another customer.`,
    template: `%s · ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  keywords: [
    'AI receptionist',
    'missed call text back',
    'appointment booking',
    'local business',
    'AI front desk',
    'AI front office',
  ],
  openGraph: {
    title: `${SITE.name}: your AI front office`,
    description: SITE.description,
    siteName: SITE.name,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE.name}: your AI front office`,
    description: SITE.description,
  },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  themeColor: '#241d2e',
  width: 'device-width',
  initialScale: 1,
  // Lets the page paint into the notch/home-indicator areas so the
  // dark background runs edge to edge instead of leaving white bars.
  viewportFit: 'cover',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background">
      <body className={`${instrumentSans.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        {children}
        <SiteChat />
        <Analytics />
      </body>
    </html>
  )
}
