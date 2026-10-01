import type { Metadata } from "next";
import Link from "next/link";
import { groupAnchor } from "@/components/site/footer";
import { Container, PageHero, Section } from "@/components/site/ui";
import { DEEP, GROUPS, MODE_LABELS, SOMETHING_ELSE, TYPES, escalationsFor, pluralFor, shortLabel, slugFor, typesInGroup } from "@/lib/content/industries";

const DESCRIPTION = `An AI receptionist set up for your kind of business: ${TYPES.length} trades, from hair salons and dental clinics to plumbers, restaurants and law firms, each with its own rules and hand-offs.`;

export const metadata: Metadata = {
  title: "Industries: an AI receptionist for your kind of business",
  description: DESCRIPTION,
  openGraph: { title: "RingPost industries", description: DESCRIPTION, url: "/industries" },
};

export default function IndustriesHub() {
  return (
    <>
      <PageHero
        eyebrow="Industries"
        title="An AI receptionist that knows your trade."
        lede={`Pick your trade and RingPost uses its rules: what never to say, what to hand to you, and how bookings work. ${TYPES.length} trades, plus "something else".`}
      />
      {GROUPS.map((group, gi) => (
        <Section key={group} id={groupAnchor(group)} tone={gi % 2 === 0 ? "surface" : "base"} className="scroll-mt-20 !py-16">
          <Container>
            <h2 className="mb-8 font-display text-[clamp(2rem,3.6vw,2.8rem)] text-ink">{group}</h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {typesInGroup(group).map((t) => {
                const esc = escalationsFor(t);
                return (
                  <Link key={t.id} href={`/industries/${slugFor(t)}`} className="rp-card rp-card-hover group flex flex-col rounded-2xl p-6">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-[1.05rem] font-semibold text-ink">{shortLabel(t)}</h3>
                      {DEEP[t.id] && <span className="rounded-full bg-violet/15 px-2 py-0.5 text-[11.5px] font-medium text-glow">In depth</span>}
                    </div>
                    <p className="mt-2 text-[13px] text-muted-ink">{t.modes.map((m) => MODE_LABELS[m]).join(", ")}</p>
                    {esc.length > 0 && (
                      <p className="mt-3 text-[13px] leading-snug text-faint">
                        Hands to you: {esc.slice(0, 3).join(", ")}
                        {esc.length > 3 ? "…" : ""}
                      </p>
                    )}
                    <span className="mt-auto pt-4 text-[13.5px] font-medium text-glow group-hover:text-white">For {pluralFor(t)}</span>
                  </Link>
                );
              })}
            </div>
          </Container>
        </Section>
      ))}
      <Section>
        <Container>
          <Link href={`/industries/${SOMETHING_ELSE.slug}`} className="rp-card rp-card-hover flex flex-col gap-3 rounded-3xl p-8 sm:flex-row sm:items-center sm:justify-between">
            <span>
              <span className="block font-display text-3xl text-ink">Something else?</span>
              <span className="mt-2 block text-[15px] text-muted-ink">Answer three questions and RingPost works out the rest.</span>
            </span>
          </Link>
        </Container>
      </Section>
    </>
  );
}
