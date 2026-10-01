import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AlertTriangle, Ban, CalendarCheck, Check, MessageSquareText } from "lucide-react";
import { Container, Conversation, Eyebrow, PageHero, Section, TrialButtons } from "@/components/site/ui";
import {
  DEEP,
  MODE_LABELS,
  SOMETHING_ELSE,
  TYPES,
  bookingFor,
  conversationFor,
  escalationsFor,
  isSparse,
  rulesFor,
  shortLabel,
  slugFor,
  typeBySlug,
  pluralFor,
  typesInGroup,
  type BusinessType,
} from "@/lib/content/industries";
import { GUARDRAILS } from "@/lib/content/platform";

export function generateStaticParams() {
  return [...TYPES.map((t) => ({ slug: slugFor(t) })), { slug: SOMETHING_ELSE.slug }];
}

export const dynamicParams = false;

function aliasLine(t: BusinessType): string {
  const a = t.aliases.slice(0, 4);
  if (a.length === 0) return "";
  return a.length === 1 ? a[0] : `${a.slice(0, -1).join(", ")} or ${a[a.length - 1]}`;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  if (slug === SOMETHING_ELSE.slug) {
    return {
      title: "AI receptionist for any local business",
      description: "Not in the list? Answer three questions about how you sell and RingPost sets up its booking and answers around your business.",
      openGraph: { url: `/industries/${slug}` },
    };
  }
  const t = typeBySlug(slug);
  if (!t) return {};
  const title = `AI receptionist for ${pluralFor(t)}`;
  const description = `An AI receptionist for ${pluralFor(t)}${t.aliases.length ? ` (${aliasLine(t)})` : ""}. It answers calls and messages from your own ${t.catalogLabel.toLowerCase()}, knows what to hand to you, and ${bookingFor(t).replace(/^For [^,]+, RingPost /, "").replace(/\.$/, "")}.`;
  return {
    title,
    description,
    openGraph: { title, description, url: `/industries/${slug}` },
    // A trade whose spec has nothing of its own yet is published but not offered to
    // search engines, so no near-duplicate page is indexed (lib/content/industries.ts).
    ...(isSparse(t) ? { robots: { index: false, follow: true } } : {}),
  };
}

export default async function IndustryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (slug === SOMETHING_ELSE.slug) return <SomethingElse />;
  const t = typeBySlug(slug);
  if (!t) notFound();

  const name = shortLabel(t);
  const plural = pluralFor(t);
  const deep = DEEP[t.id];
  const rules = rulesFor(t);
  const escalations = escalationsFor(t);
  const questions = [...new Set([...(t.template?.knowledgeTitles.filter((k) => k.endsWith("?")) ?? []), ...t.suggestedQuestions])].slice(0, 8);
  const related = typesInGroup(t.group).filter((x) => x.id !== t.id);
  const aliases = aliasLine(t);

  return (
    <>
      <PageHero
        eyebrow={t.group}
        title={<>AI receptionist for {plural}</>}
        lede={
          deep
            ? deep.intro[0]
            : `Calls, texts and messages answered from your own ${t.catalogLabel.toLowerCase()}${t.itemsLabel && t.itemsLabel !== t.catalogLabel ? ` and ${t.itemsLabel.toLowerCase()}` : ""}, with the rules ${plural} need, and bookings made the way your business works.`
        }
        crumbs={[
          { name: "Industries", href: "/industries" },
          { name, href: `/industries/${slug}` },
        ]}
      >
        {deep?.intro[1] && <p className="-mt-3 mb-8 max-w-2xl text-lg leading-relaxed text-muted-ink">{deep.intro[1]}</p>}
        <TrialButtons />
        {aliases && (
          <p className="mt-8 text-[13.5px] text-faint">
            Customers also find {plural} by searching {t.aliases.slice(0, 4).map((a) => `“${a}”`).join(", ")}.
          </p>
        )}
      </PageHero>

      <Section tone="surface">
        <Container className="grid gap-12 lg:grid-cols-2">
          <div>
            <Eyebrow>
              <MessageSquareText aria-hidden className="h-3.5 w-3.5" /> What customers ask
            </Eyebrow>
            <h2 className="font-display text-4xl leading-tight text-ink">The questions {plural} get all day.</h2>
            <ul className="mt-7 flex flex-col divide-y divide-line border-y border-line">
              {questions.map((q) => (
                <li key={q} className="py-3.5 text-[15.5px] text-ink">
                  &ldquo;{q}&rdquo;
                </li>
              ))}
            </ul>
          </div>
          <div>
            <Eyebrow>How it answers</Eyebrow>
            {deep ? (
              <ul className="flex flex-col gap-6">
                {deep.handling.map((h) => (
                  <li key={h.q}>
                    <p className="text-[15.5px] font-medium text-ink">{h.q}</p>
                    <p className="mt-1.5 text-[15px] leading-relaxed text-muted-ink">{h.a}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <ul className="flex flex-col gap-6">
                <li>
                  <p className="text-[15.5px] font-medium text-ink">From your own {t.catalogLabel.toLowerCase()}</p>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-muted-ink">
                    Prices, durations and what&apos;s included come from what you&apos;ve entered or what it read from your website. If something isn&apos;t there, it says it will check rather than guess.
                  </p>
                </li>
                {t.suggestedPolicies.length > 0 && (
                  <li>
                    <p className="text-[15.5px] font-medium text-ink">With your policies</p>
                    <p className="mt-1.5 text-[15px] leading-relaxed text-muted-ink">
                      The Knowledge page suggests the policies {plural} usually need ({t.suggestedPolicies.map((p) => p.toLowerCase()).join(", ")}) and the AI answers from what you write.
                    </p>
                  </li>
                )}
                {t.intakeSuggestions.length > 0 && (
                  <li>
                    <p className="text-[15.5px] font-medium text-ink">Asking what you&apos;d ask</p>
                    <p className="mt-1.5 text-[15px] leading-relaxed text-muted-ink">
                      It finds out {t.intakeSuggestions.map((s) => s.toLowerCase()).join(", ")}, so you have what you need before you pick up the conversation.
                    </p>
                  </li>
                )}
              </ul>
            )}
          </div>
        </Container>
      </Section>

      <Section>
        <Container className="grid gap-4 lg:grid-cols-3">
          <div className="rp-card rounded-3xl p-7">
            <Ban aria-hidden className="h-5 w-5 text-cta" />
            <h2 className="mt-4 text-xl font-semibold text-ink">What it won&apos;t do</h2>
            <ul className="mt-4 flex flex-col gap-3 text-[14.5px] leading-relaxed text-muted-ink">
              {rules.map((r) => (
                <li key={r} className="flex gap-2.5">
                  <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cta" />
                  {r}
                </li>
              ))}
              {GUARDRAILS.rules.slice(0, rules.length > 1 ? 1 : 3).map((g) => (
                <li key={g.title} className="flex gap-2.5">
                  <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cta" />
                  {g.title}.
                </li>
              ))}
            </ul>
          </div>
          <div className="rp-card rounded-3xl p-7">
            <AlertTriangle aria-hidden className="h-5 w-5 text-glow" />
            <h2 className="mt-4 text-xl font-semibold text-ink">What it hands straight to you</h2>
            {escalations.length > 0 ? (
              <>
                <p className="mt-4 text-[14.5px] leading-relaxed text-muted-ink">For {plural}, any mention of these goes to you with an alert:</p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {escalations.map((e) => (
                    <li key={e} className="rounded-full border border-violet/30 bg-violet/10 px-3 py-1 text-[13px] text-glow">
                      {e}
                    </li>
                  ))}
                </ul>
              </>
            ) : null}
            <p className="mt-4 text-[14.5px] leading-relaxed text-muted-ink">
              It also hands over requests for a person, complaints, refunds, and any words you add.
            </p>
          </div>
          <div className="rp-card rounded-3xl p-7">
            <CalendarCheck aria-hidden className="h-5 w-5 text-success" />
            <h2 className="mt-4 text-xl font-semibold text-ink">How booking works</h2>
            <p className="mt-3 text-[13px] text-faint">{t.modes.map((m) => MODE_LABELS[m]).join(", ")}</p>
            <p className="mt-3 text-[14.5px] leading-relaxed text-muted-ink">{bookingFor(t)}</p>
          </div>
        </Container>
      </Section>

      <Section tone="grid">
        <Container className="grid items-start gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <Eyebrow>A conversation</Eyebrow>
            <h2 className="font-display text-4xl leading-tight text-ink">How it goes for {plural}.</h2>
            {t.template?.bannedClaims?.length ? (
              <div className="mt-8">
                <p className="text-[15px] font-medium text-ink">And in your social posts</p>
                <p className="mt-2 text-[14.5px] leading-relaxed text-muted-ink">
                  Posts for {plural} are checked before they go out, and never claim: {t.template.bannedClaims.slice(0, 5).map((c) => `"${c}"`).join(", ")}.
                </p>
              </div>
            ) : null}
          </div>
          <Conversation turns={conversationFor(t)} />
        </Container>
      </Section>

      {related.length > 0 && (
        <Section className="!pt-4">
          <Container>
            <h2 className="mb-5 text-[15px] font-medium text-muted-ink">More in {t.group}</h2>
            <div className="flex flex-wrap gap-2">
              {related.map((r) => (
                <Link key={r.id} href={`/industries/${slugFor(r)}`} className="inline-flex min-h-10 items-center rounded-full border border-line-strong px-4 text-[13.5px] text-muted-ink hover:border-glow/50 hover:text-ink">
                  {shortLabel(r)}
                </Link>
              ))}
              <Link href="/industries" className="inline-flex min-h-10 items-center gap-1.5 rounded-full px-4 text-[13.5px] text-glow hover:text-white">
                All industries
              </Link>
            </div>
          </Container>
        </Section>
      )}

    </>
  );
}

function SomethingElse() {
  return (
    <>
      <PageHero
        eyebrow="Something else"
        title="An AI receptionist for any local business."
        lede="Not in the list? Choose “Something else”, describe your business, and answer three questions."
        crumbs={[
          { name: "Industries", href: "/industries" },
          { name: "Something else", href: `/industries/${SOMETHING_ELSE.slug}` },
        ]}
      >
        <TrialButtons />
      </PageHero>
      <Section tone="surface">
        <Container className="grid gap-12 lg:grid-cols-2">
          <div>
            <Eyebrow>Three questions</Eyebrow>
            <h2 className="font-display text-4xl leading-tight text-ink">Your answers decide how it books.</h2>
            <ul className="mt-7 flex flex-col divide-y divide-line border-y border-line">
              {SOMETHING_ELSE.questions.map((q) => (
                <li key={q} className="py-4 text-[15.5px] text-ink">
                  {q}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-5 text-[15.5px] leading-relaxed text-muted-ink">
            <p>
              <strong className="text-ink">Customers book a time with you</strong>, and it books appointments from your real availability. <strong className="text-ink">You go to the customer</strong>, and it collects the address and the problem before booking a visit. <strong className="text-ink">You sell products</strong>, and it answers about what you stock, delivery and collection.
            </p>
            <p>Everything else works as for any trade: your own information, the same guardrails, and a hand-off to you when needed.</p>
          </div>
        </Container>
      </Section>
      <Section>
        <Container>
          <div className="grid gap-4 md:grid-cols-2">
            {GUARDRAILS.rules.map((r) => (
              <div key={r.title} className="rp-card flex gap-3 rounded-2xl p-6">
                <Check aria-hidden className="mt-1 h-4 w-4 shrink-0 text-success" />
                <div>
                  <h3 className="text-[1.02rem] font-semibold text-ink">{r.title}</h3>
                  <p className="mt-1.5 text-[14.5px] leading-relaxed text-muted-ink">{r.body}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
