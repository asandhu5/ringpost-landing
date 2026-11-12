import { Check, RefreshCcw } from "lucide-react";
import { ChannelLogo } from "@/components/site/channel-logos";
import { FeatureBody, FeatureHero } from "@/components/site/feature/feature-page";
import { PostingHero } from "@/components/site/feature/heroes";
import { AppScreen } from "@/components/site/phone/apps";
import { IPhone16ProMax } from "@/components/site/phone/iphone";
import { PostComposer } from "@/components/site/posting/composer";
import { ScheduleWeek, UploadJourney } from "@/components/site/posting/sections";
import { Container, Section, SectionHeading } from "@/components/site/ui/primitives";
import { FEATURES } from "@/lib/content/features";
import { DEMO_ITEMS } from "@/lib/content/posting-demo";
import { featureMetadata } from "@/lib/feature-meta";

export const metadata = featureMetadata("posting");

const post = (id: string) => {
  const item = DEMO_ITEMS.find((i) => i.id === id)!;
  return { media: item.media, business: item.business, caption: item.captions.social };
};

const RESULTS = [
  { id: "instagram", name: "Instagram", state: "Posted" },
  { id: "facebook", name: "Facebook", state: "Posted" },
  { id: "x", name: "X", state: "Posted after a retry" },
  { id: "google_business_profile", name: "Google Business", state: "Posted" },
];

export default function PostingPage() {
  const f = FEATURES.posting;
  const phones = [
    <IPhone16ProMax key="l" width={200}><AppScreen platform="linkedin" post={post("bakery")} /></IPhone16ProMax>,
    <IPhone16ProMax key="i" width={220}><AppScreen platform="instagram" post={post("florist")} /></IPhone16ProMax>,
    <IPhone16ProMax key="t" width={200}><AppScreen platform="tiktok" post={post("salon")} /></IPhone16ProMax>,
  ];
  return (
    <>
      <FeatureHero f={f} visual={<PostingHero phones={phones} />} />
      <FeatureBody f={f} demo={<PostComposer />}>
        <Section>
          <Container>
            <SectionHeading eyebrow="Your week" area="create" title="A week of posts, planned." lede="What has gone out, what is scheduled, and what still needs your yes." />
            <div className="mt-8"><ScheduleWeek /></div>
          </Container>
        </Section>
        <Section tone="white">
          <Container className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
            <div>
              <SectionHeading eyebrow="No guessing" area="create" title="A result for every platform." lede="If one app doesn't take the post, you see exactly which one, and can retry just that one." />
              <ul className="mt-6 grid gap-2">
                {RESULTS.map((r) => (
                  <li key={r.id} className="flex min-h-14 items-center gap-3 rounded-rp-md border border-line bg-white px-4 shadow-rp-1">
                    <ChannelLogo id={r.id} size={30} />
                    <span className="flex-1 text-body font-semibold text-ink">{r.name}</span>
                    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[12.5px] font-semibold ${r.state === "Posted" ? "bg-grow-soft text-grow" : "bg-amber-soft text-amber"}`}>
                      {r.state === "Posted" ? <Check className="h-3.5 w-3.5" strokeWidth={2.5} aria-hidden /> : <RefreshCcw className="h-3.5 w-3.5" aria-hidden />}
                      {r.state}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div id="upload" className="scroll-mt-24">
              <p className="mb-3 text-small font-semibold text-create">From your phone</p>
              <UploadJourney />
            </div>
          </Container>
        </Section>
      </FeatureBody>
    </>
  );
}
