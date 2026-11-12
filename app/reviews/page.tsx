import { ReviewsDemo } from "@/components/site/demos/grow-demos";
import { FeatureBody, FeatureHero } from "@/components/site/feature/feature-page";
import { ReviewsHero } from "@/components/site/feature/grow-heroes";
import { FEATURES } from "@/lib/content/features";
import { featureMetadata } from "@/lib/feature-meta";

export const metadata = featureMetadata("reviews");

export default function Page() {
  const f = FEATURES.reviews;
  return (
    <>
      <FeatureHero f={f} visual={<ReviewsHero />} />
      <FeatureBody f={f} demo={<ReviewsDemo />} />
    </>
  );
}
