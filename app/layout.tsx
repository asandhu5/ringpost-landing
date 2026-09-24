import React from "react"
import type { Metadata, Viewport } from 'next'
import { Instrument_Sans, Instrument_Serif, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { PRICING, SITE } from '@/lib/site'
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
  metadataBase: new URL(SITE.url),
  alternates: { canonical: '/' },
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
    'AI phone answering',
    'WhatsApp booking',
    'Instagram DM automation',
    'social media posting for small business',
    'Google review replies',
    'salon booking software',
    'dental receptionist',
  ],
  openGraph: {
    title: `${SITE.name}: your AI front office`,
    description: SITE.description,
    siteName: SITE.name,
    url: SITE.url,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE.name}: your AI front office`,
    description: SITE.description,
  },
  robots: { index: true, follow: true },
}

const STRUCTURED_DATA = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: SITE.name,
  url: SITE.url,
  description: SITE.description,
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web, iOS, Android',
  offers: PRICING.plans.map((plan) => ({
    '@type': 'Offer',
    name: plan.name,
    price: String(plan.monthly),
    priceCurrency: 'USD',
    priceSpecification: { '@type': 'UnitPriceSpecification', price: String(plan.monthly), priceCurrency: 'USD', unitCode: 'MON' },
  })),
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
        <script
          type="application/ld+json"
          // Static, built from our own constants: nothing user-supplied reaches it.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(STRUCTURED_DATA) }}
        />
        <Analytics />
      </body>
    </html>
  )
}
