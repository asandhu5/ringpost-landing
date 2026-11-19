import { FeatureBody, FeatureHero } from "@/components/site/feature/feature-page";
import { BookingHero } from "@/components/site/feature/heroes";
import { BookingDemo } from "@/components/site/demos/booking-demo";
import { CalendarSync } from "@/components/site/feature/calendar-sync";
import { FEATURES } from "@/lib/content/features";
import { featureMetadata } from "@/lib/feature-meta";

export const metadata = featureMetadata("booking");

export default function Page() {
  const f = FEATURES.booking;
  return (
    <>
      <FeatureHero f={f} visual={<BookingHero />} />
      <CalendarSync />
      <FeatureBody f={f} demo={<BookingDemo />} />
    </>
  );
}
