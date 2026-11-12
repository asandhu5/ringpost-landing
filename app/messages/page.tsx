import { FeatureBody, FeatureHero } from "@/components/site/feature/feature-page";
import { MessagesHero } from "@/components/site/feature/heroes";
import { MessagesDemo } from "@/components/site/demos/messages-demo";
import { MESSAGE_CHANNELS } from "@/lib/content/feature-demos";
import { FEATURES } from "@/lib/content/features";
import { featureMetadata } from "@/lib/feature-meta";

export const metadata = featureMetadata("messages");

export default function Page() {
  const f = FEATURES.messages;
  return (
    <>
      <FeatureHero f={f} visual={<MessagesHero />} />
      <FeatureBody f={f} demo={<MessagesDemo channels={MESSAGE_CHANNELS} />} />
    </>
  );
}
