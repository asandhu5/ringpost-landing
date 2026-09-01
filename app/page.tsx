import { Navigation } from "@/components/landing/navigation";
import { HeroSection } from "@/components/landing/hero-section";
import { LiveDemoSection } from "@/components/landing/live-demo-section";
import { FeaturesSection } from "@/components/landing/features-section";
import { HowItWorksSection } from "@/components/landing/how-it-works-section";
import { ChannelsSection } from "@/components/landing/channels-section";
import { MarketingSection } from "@/components/landing/marketing-section";
import { MetricsSection } from "@/components/landing/metrics-section";
import { TrustSection } from "@/components/landing/trust-section";
import { IncludedSection } from "@/components/landing/included-section";
import { VerticalsSection } from "@/components/landing/verticals-section";
import { FaqSection } from "@/components/landing/faq-section";
import { CtaSection } from "@/components/landing/cta-section";
import { FooterSection } from "@/components/landing/footer-section";
import {
  AuroraField,
  CustomCursor,
  Grain,
  ScrollProgress,
} from "@/components/landing/motion/atmosphere";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      {/* Global atmosphere */}
      <AuroraField />
      <ScrollProgress />
      <Grain />
      <CustomCursor />

      <Navigation />

      {/* 1 — the promise */}
      <HeroSection />

      {/* 2 — the proof: a missed call becoming a booking */}
      <LiveDemoSection />

      {/* 3 — what it does */}
      <FeaturesSection />

      {/* 4 — "this is my trade": the generic promise made specific */}
      <VerticalsSection />

      {/* 5 — the complete offer, itemised */}
      <IncludedSection />

      {/* 6 — how it fits into the day */}
      <HowItWorksSection />

      {/* 7 — where customers actually reach you */}
      <ChannelsSection />

      {/* 8 — the growth side */}
      <MarketingSection />

      {/* 9 — always on */}
      <MetricsSection />

      {/* 10 — why the answers can be trusted */}
      <TrustSection />

      {/* 11 — the last objections, answered before the ask */}
      <FaqSection />

      {/* 12 — book a call */}
      <CtaSection />

      <FooterSection />
    </main>
  );
}
