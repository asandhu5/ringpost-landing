import Link from "next/link";
import { ArrowRight, Briefcase, BedDouble, Car, Check, Dumbbell, GraduationCap, ShoppingBag, Sparkles, Stethoscope, UtensilsCrossed, Wrench } from "lucide-react";
import { ChannelLogo } from "@/components/site/channel-logos";
import { InViewGroup } from "@/components/site/motion";
import { Container, PageHero, Section, StartButtons } from "@/components/site/ui";
import { GROUP_INFO, tradesIn, type GroupInfo } from "@/lib/content/groups";
import { escalationsFor, pluralFor, shortLabel, slugFor } from "@/lib/content/industries";

export const GROUP_ICONS = { Sparkles, Stethoscope, Dumbbell, UtensilsCrossed, Wrench, Car, Briefcase, GraduationCap, ShoppingBag, BedDouble };

const ANSWERS_ON = ["phone", "whatsapp", "instagram", "messenger", "sms", "email"];

/** /industries/<group>: what RingPost does for this kind of business, then every trade in it. */
export function GroupPage({ g }: { g: GroupInfo }) {
  const Icon = GROUP_ICONS[g.icon];
  const trades = tradesIn(g);
  const others = GROUP_INFO.filter((x) => x.slug !== g.slug);
  return (
    <>
      <PageHero
        eyebrow={`Industries · ${g.name}`}
        title={<>RingPost for {g.name.toLowerCase()}</>}
        lede={g.pain}
        crumbs={[
          { name: "Industries", href: "/industries" },
          { name: g.name, href: `/industries/${g.slug}` },
        ]}
        aside={
          g.image ? (
            <div className="relative mx-auto w-full max-w-md overflow-hidden rounded-[28px] shadow-[0_30px_70px_-30px_rgba(11,27,43,0.55)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={g.image} alt="" className="h-[clamp(240px,calc(100svh-var(--header-h)-170px),520px)] w-full object-cover" />
              <div className="absolute inset-x-4 bottom-4 flex items-center gap-2 rounded-2xl bg-white/90 p-3 backdrop-blur">
                {ANSWERS_ON.slice(0, 4).map((c) => (
                  <ChannelLogo key={c} id={c} size={28} />
                ))}
                <span className="ml-1 text-[13px] font-semibold text-ink">Answered, day and night</span>
              </div>
            </div>
          ) : (
            <div className="mx-auto flex aspect-square w-full max-w-sm items-center justify-center rounded-[32px]" style={{ background: `linear-gradient(135deg, ${g.tone}22, ${g.tone}08)` }}>
              <Icon className="h-28 w-28" style={{ color: g.tone }} aria-hidden />
            </div>
          )
        }
      >
        <StartButtons />
      </PageHero>

      <Section className="!pt-4">
        <Container>
          <h2 className="font-display text-[clamp(2rem,3.6vw,2.8rem)] text-ink">What RingPost does for you</h2>
          <InViewGroup className="mt-8 grid gap-4 sm:grid-cols-2">
            {g.does.map((d, i) => (
              <article key={d.title} className="rp-card rp-card-hover rounded-3xl p-7">
                <span className="flex h-9 w-9 items-center justify-center rounded-full text-[14px] font-bold text-white" style={{ background: g.tone }}>
                  {i + 1}
                </span>
                <h3 className="mt-4 text-[19px] font-semibold text-ink">{d.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted-ink">{d.body}</p>
              </article>
            ))}
          </InViewGroup>
        </Container>
      </Section>

      <Section tone="surface">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="font-display text-[clamp(2rem,3.6vw,2.8rem)] text-ink">Pick your business</h2>
              <p className="mt-2 text-[16px] text-muted-ink">Each one has its own rules: what never to say, what to hand to you, and how bookings work.</p>
            </div>
          </div>
          <InViewGroup className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {trades.map((t) => {
              const esc = escalationsFor(t);
              return (
                <Link key={t.id} href={`/industries/${slugFor(t)}`} className="rp-card rp-card-hover group flex flex-col rounded-2xl p-6">
                  <h3 className="text-[1.1rem] font-semibold text-ink">{shortLabel(t)}</h3>
                  {t.aliases.length > 0 && <p className="mt-1 text-[13px] text-muted-ink">Also {t.aliases.slice(0, 3).join(", ")}</p>}
                  {esc.length > 0 && (
                    <p className="mt-3 text-[13px] leading-snug text-faint">
                      Hands to you: {esc.slice(0, 3).join(", ")}
                      {esc.length > 3 ? "…" : ""}
                    </p>
                  )}
                  <span className="mt-auto inline-flex items-center gap-1 pt-4 text-[13.5px] font-semibold text-glow group-hover:text-ink">
                    For {pluralFor(t)} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                  </span>
                </Link>
              );
            })}
          </InViewGroup>
        </Container>
      </Section>

      <Section>
        <Container className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-4xl text-ink">Posts made for {g.name.toLowerCase()}</h2>
            <p className="mt-3 text-[16px] leading-relaxed text-muted-ink">Content Studio already knows what works for businesses like yours, and makes it about yours: your services, prices and logo.</p>
            <ul className="mt-6 grid gap-2 sm:grid-cols-2">
              {g.content.map((c) => (
                <li key={c} className="flex items-center gap-2 text-[15px] text-ink">
                  <Check className="h-4 w-4 text-[#16a34a]" aria-hidden /> {c}
                </li>
              ))}
            </ul>
            <Link href="/content-studio" className="mt-6 inline-flex items-center gap-1.5 text-[15px] font-semibold text-glow hover:text-ink">
              See Content Studio <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
          <div>
            <h2 className="font-display text-4xl text-ink">Answered everywhere</h2>
            <p className="mt-3 text-[16px] leading-relaxed text-muted-ink">The same answers on every channel, from one inbox you can step into any time.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              {ANSWERS_ON.map((c) => (
                <ChannelLogo key={c} id={c} size={48} />
              ))}
            </div>
            <Link href="/messages" className="mt-6 inline-flex items-center gap-1.5 text-[15px] font-semibold text-glow hover:text-ink">
              How each channel works <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </Container>
      </Section>

      <Section tone="surface">
        <Container>
          <h2 className="font-display text-3xl text-ink">Other industries</h2>
          <div className="mt-6 flex flex-wrap gap-2">
            {others.map((o) => (
              <Link key={o.slug} href={`/industries/${o.slug}`} className="inline-flex min-h-10 items-center rounded-full border border-line-strong bg-white px-4 text-[14px] text-muted-ink transition-colors hover:border-glow/50 hover:text-ink">
                {o.name}
              </Link>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
