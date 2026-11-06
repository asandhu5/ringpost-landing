import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import { ChannelLogo } from "@/components/site/channel-logos";
import { IPhone16ProMax } from "@/components/site/phone/iphone";
import { AppScreen } from "@/components/site/phone/apps";
import { PostComposer } from "@/components/site/posting/composer";
import { ScheduleWeek, UploadJourney } from "@/components/site/posting/sections";
import { Container, FaqList, H2, Lede, Section, StartButtons } from "@/components/site/ui";
import { DEMO_ITEMS, POST_TARGETS } from "@/lib/content/posting-demo";

export const metadata: Metadata = {
  title: "Posting: upload, preview in every app, post now or schedule",
  description:
    "Upload your own photos and videos or use what Content Studio made. See the post in Instagram, Facebook, TikTok, YouTube, X, LinkedIn, Threads, Pinterest and Bluesky, then post now or schedule it.",
  openGraph: { url: "/posting" },
};

const hero = (id: string) => {
  const item = DEMO_ITEMS.find((i) => i.id === id)!;
  return { media: item.media, business: item.business, caption: item.captions.social };
};

const FAQ = [
  { q: "Can I post my own photos and videos?", a: "Yes. Upload from your phone or computer: photos up to 20 MB and videos up to 100 MB, as JPEG, PNG, WEBP, HEIC, MP4 or MOV. Add a short note and RingPost writes the caption for each platform." },
  { q: "Does anything go out without me?", a: "No, unless you switch on autopilot. Every post waits in Approvals, where you can edit the caption, change the platforms or the time, or turn it down." },
  { q: "Which accounts can it post to?", a: "The ones you connect: Instagram, Facebook, TikTok, YouTube, X, LinkedIn (your profile or company page), Threads, Pinterest and Bluesky. Each post goes out from your own account." },
  { q: "What happens if one platform fails?", a: "Each platform has its own result, so a post that went out on Instagram but not on X shows exactly that. You can retry the one that failed after checking the account." },
  { q: "Do I need Content Studio to post?", a: "No. Posting works with your own uploads. Content Studio is there when you want images and videos made for you." },
];

export default function PostingPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pb-10 pt-28 sm:pt-32 lg:pb-16">
        <div aria-hidden className="rp-grid rp-fade-mask pointer-events-none absolute inset-0 opacity-50" />
        <Container className="relative grid items-center gap-12 lg:grid-cols-[1fr_1.05fr]">
          <div>
            <h1 className="text-[clamp(2.5rem,5.4vw,4.3rem)] font-bold leading-[1.02] tracking-[-0.04em] text-ink">
              One post. Every app. Your timing.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-ink sm:text-xl">
              Upload a photo from your phone or pick something Content Studio made. RingPost writes the caption for each platform, shows you exactly how it will look, and posts it now or when you choose.
            </p>
            <StartButtons secondary={{ href: "#try", label: "Try the composer" }} className="mt-8" />
            <ul className="mt-8 flex flex-wrap gap-2" aria-label="Platforms RingPost posts to">
              {POST_TARGETS.map((p) => (
                <li key={p.id} className="flex items-center gap-1.5 rounded-full border border-line bg-white py-1 pl-1 pr-3 text-[13px] font-medium text-ink">
                  <ChannelLogo id={p.id} size={22} />{p.name}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative mx-auto h-[440px] w-full max-w-[400px] sm:h-[600px] sm:max-w-[560px]" aria-label="The same business posting to Instagram, TikTok and LinkedIn">
            <div className="absolute left-0 top-12 w-[44%] -rotate-[7deg]"><IPhone16ProMax width={240}><AppScreen platform="linkedin" post={hero("bakery")} /></IPhone16ProMax></div>
            <div className="absolute right-0 top-12 w-[44%] rotate-[7deg]"><IPhone16ProMax width={240}><AppScreen platform="tiktok" post={hero("salon")} /></IPhone16ProMax></div>
            <div className="absolute left-1/2 top-0 z-10 w-[50%] -translate-x-1/2"><IPhone16ProMax width={270}><AppScreen platform="instagram" post={hero("florist")} /></IPhone16ProMax></div>
          </div>
        </Container>
      </section>

      {/* The composer */}
      <Section id="try" className="scroll-mt-24 !pt-6">
        <Container>
          <div className="mb-8 max-w-2xl">
            <H2>See your post in every app.</H2>
            <Lede className="mt-4">Choose the content and the platforms, then switch apps on the phone to see each version with the caption written for it. Try it with your own photo too.</Lede>
          </div>
          <PostComposer />
        </Container>
      </Section>

      {/* Uploads */}
      <Section id="upload" tone="surface" className="scroll-mt-24">
        <Container className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <H2>Your own photos and videos, posted properly.</H2>
            <Lede className="mt-4">Real work from your phone often does better than anything made up. Upload it as it is and add a quick note. RingPost does the rest.</Lede>
            <ul className="mt-7 flex flex-col gap-3">
              {[
                "Photos up to 20 MB and videos up to 100 MB",
                "JPEG, PNG, WEBP, HEIC, MP4 or MOV, straight from the camera roll",
                "Resumes after a dropped connection, even after closing the page",
                "Your note becomes a caption for each platform, in your voice",
                "Campaigns use your real photos first",
              ].map((t) => (
                <li key={t} className="flex gap-2.5 text-[15.5px] text-ink"><Check className="mt-1 h-4 w-4 shrink-0 text-success" aria-hidden />{t}</li>
              ))}
            </ul>
          </div>
          <UploadJourney />
        </Container>
      </Section>

      {/* The week */}
      <Section>
        <Container>
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-2xl">
              <H2>A week of posts, for every kind of business.</H2>
              <Lede className="mt-4">Salons, clinics, gyms, restaurants, trades, garages, offices, groomers, shops and hotels: what went out, what is booked in and what needs a yes, with every platform it goes to.</Lede>
            </div>
            <Link href="/content-studio" className="text-[15px] font-semibold text-glow hover:text-ink">Where the content comes from</Link>
          </div>
          <ScheduleWeek />
        </Container>
      </Section>

      {/* Each app its own way */}
      <Section tone="surface">
        <Container>
          <div className="mb-8 max-w-2xl">
            <H2>Each app, done its own way.</H2>
            <Lede className="mt-4">One approval, then every platform gets the version that suits it, from your own connected account.</Lede>
          </div>
          <ul className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {POST_TARGETS.map((p) => (
              <li key={p.id} className="flex items-center gap-3.5 bg-white p-5">
                <ChannelLogo id={p.id} size={36} />
                <span><span className="block text-[15.5px] font-semibold text-ink">{p.name}</span><span className="block text-[14px] text-muted-ink">{p.note}</span></span>
              </li>
            ))}
          </ul>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {[
              { t: "A caption per platform", b: "Hashtags where they help, short where it is short, professional on LinkedIn. You can edit any of them." },
              { t: "Post now or schedule", b: "RingPost suggests a good hour for your trade, and nudges you if a post is still waiting 12 hours before its time." },
              { t: "A result for each platform", b: "See exactly where a post went out and where it didn't, then fix and retry just that one." },
            ].map((x) => (
              <div key={x.t}><p className="text-[16px] font-semibold text-ink">{x.t}</p><p className="mt-1.5 text-[15px] leading-relaxed text-muted-ink">{x.b}</p></div>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container narrow>
          <H2>Before your first post.</H2>
          <div className="mt-7"><FaqList items={FAQ} structuredData /></div>
          <StartButtons className="mt-8" />
        </Container>
      </Section>
    </>
  );
}
