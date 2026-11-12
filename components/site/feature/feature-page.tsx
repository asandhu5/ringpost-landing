import Link from "next/link";
import { ArrowRight, ChevronRight, Star } from "lucide-react";
import { ChannelLogo } from "@/components/site/channel-logos";
import { AppChat, PhoneFrame } from "@/components/site/mocks/app-chat";
import { Button } from "@/components/site/ui/button";
import { Faq } from "@/components/site/ui/faq";
import { AREA_TONE, Card, Container, Eyebrow, Section, SectionHeading } from "@/components/site/ui/primitives";
import { RingStill } from "@/components/site/three/ring-still";
import { FEATURES, FEATURE_PATH, type FeatureContent, type FeatureKey } from "@/lib/content/features";
import { PRODUCT_COLUMNS } from "@/lib/nav";
import { plansWithLabel } from "@/lib/plans";
import { ROUTES } from "@/lib/routes";
import { SITE, START_URL } from "@/lib/site";
import { Mini } from "./mini";

const AREA_NAME = { answer: "Answer", create: "Create", grow: "Grow" };

/** The quiet plan line beside the final button: said once per page, never as a badge. */
export function planLine(f: FeatureContent): string {
  if (!f.plan) return "Included in every plan";
  const label = plansWithLabel(f.plan);
  return label.endsWith("plan") ? `Included in the ${label}` : `Included in ${label}`;
}

export function Crumbs({ area, name, path }: { area?: string; name: string; path: string }) {
  const items = [{ name: "Home", href: "/" }, { name, href: path }];
  return (
    <>
      <nav aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-1 text-small text-muted-ink">
          {items.map((c, i) => (
            <li key={c.href} className="flex items-center gap-1">
              {i > 0 && <ChevronRight className="h-3.5 w-3.5" aria-hidden />}
              {i === items.length - 1 ? (
                <span aria-current="page" className="font-medium text-ink">{area ? `${area} · ${c.name}` : c.name}</span>
              ) : (
                <Link href={c.href} className="hover:text-ink">{c.name}</Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: items.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.name, item: `${SITE.url}${c.href === "/" ? "" : c.href}` })) }) }} />
    </>
  );
}

/** 1. The first screen of a feature page: fits one laptop screen, picture included. */
export function FeatureHero({ f, visual }: { f: FeatureContent; visual: React.ReactNode }) {
  return (
    <section className="relative overflow-hidden">
      <div aria-hidden className="rp-hero-wash pointer-events-none absolute inset-0" />
      <div className="relative mx-auto flex min-h-[100svh] w-full max-w-[1240px] flex-col gap-6 px-4 pb-[84px] pt-[calc(var(--header-h)+clamp(0.75rem,2.5svh,1.5rem))] sm:px-6 lg:h-[100svh] lg:max-h-[900px] lg:min-h-[560px] lg:flex-row lg:items-center lg:gap-12 lg:px-10 lg:pb-[76px]">
        <div className="relative z-10 lg:w-[47%] lg:shrink-0">
          <Crumbs area={AREA_NAME[f.area]} name={f.name} path={FEATURE_PATH[f.key]} />
          <Eyebrow area={f.area} className="mt-[clamp(1rem,3.5svh,2.25rem)]">{f.eyebrow}</Eyebrow>
          <h1 className="mt-2.5 font-display text-h1 text-ink">{f.title}</h1>
          <p className="mt-[clamp(0.8rem,2.4svh,1.25rem)] max-w-[32rem] text-body text-muted-ink">{f.promise}</p>
          <div className="mt-[clamp(1.1rem,3.2svh,1.75rem)] flex flex-wrap items-center gap-3">
            <Button href={START_URL}>Get started</Button>
            <Button href="#how-it-works" variant="secondary">See how it works</Button>
          </div>
        </div>
        <div className="relative flex flex-1 items-center justify-center lg:h-full lg:min-h-0 lg:min-w-0">{visual}</div>
      </div>
    </section>
  );
}

function CustomerView({ c }: { c: FeatureContent["sees"]["customer"] }) {
  if (c.kind === "chat") return <AppChat app={c.app} business={c.business} lines={c.lines} outcome={c.outcome} subject={c.subject} className="h-full" />;
  if (c.kind === "post")
    return (
      <div className="flex h-full flex-col bg-white text-left">
        <p className="flex items-center gap-2 px-3 py-2.5 text-[13.5px] font-semibold text-ink"><ChannelLogo id={c.platform} size={26} /> {c.business}</p>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={c.image} alt="" className="aspect-square w-full object-cover" loading="lazy" />
        <p className="px-3 py-3 text-[13.5px] leading-snug text-ink"><b className="font-semibold">{c.business.toLowerCase().replace(/[^a-z]/g, "")}</b> {c.caption}</p>
      </div>
    );
  return (
    <div className="flex h-full flex-col justify-center gap-3 bg-white p-4 text-left">
      <p className="flex items-center gap-2 text-[13px] font-semibold text-ink"><ChannelLogo id="google_business_profile" size={24} /> Your review</p>
      <p className="flex gap-0.5" aria-label={`${c.stars} out of 5 stars`}>{[0, 1, 2, 3, 4].map((i) => <Star key={i} className={`h-4 w-4 ${i < c.stars ? "fill-[#f59e0b] text-[#f59e0b]" : "text-line-strong"}`} aria-hidden />)}</p>
      <p className="text-[13.5px] leading-snug text-ink">{c.text}</p>
      <div className="rounded-rp-sm bg-surface-2 p-3">
        <p className="text-[11.5px] font-semibold text-muted-ink">Response from the owner</p>
        <p className="mt-1 text-[13.5px] leading-snug text-ink">{c.reply}</p>
      </div>
      <p className="mt-2 flex items-center gap-2 border-t border-line pt-3 text-[13px] font-semibold text-ink"><ChannelLogo id="instagram" size={24} /> Your comment</p>
      <p className="text-[13.5px] leading-snug text-ink">{c.comment}</p>
      <div className="ml-4 rounded-rp-sm bg-surface-2 p-3">
        <p className="text-[11.5px] font-semibold text-muted-ink">Reply from the business</p>
        <p className="mt-1 text-[13.5px] leading-snug text-ink">{c.commentReply}</p>
      </div>
    </div>
  );
}

/** Parts 2 to 10: the same order on every feature page. `demo` is the page's own centrepiece. */
export function FeatureBody({ f, demo, children }: { f: FeatureContent; demo?: React.ReactNode; children?: React.ReactNode }) {
  const all = PRODUCT_COLUMNS.flatMap((c) => c.links.map((l) => ({ ...l, area: c.area })));
  const related = f.related.map((k) => ({ key: k, f: FEATURES[k], link: all.find((l) => l.href === FEATURE_PATH[k])! }));
  return (
    <>
      {/* 2. The problem */}
      <section className="border-y border-line bg-white py-[clamp(2rem,6svh,3.5rem)]">
        <Container className="flex items-center gap-5">
          <RingStill id={`problem-${f.key}`} className="hidden h-14 w-14 shrink-0 opacity-90 sm:block" />
          <p className="max-w-[46rem] font-display text-[clamp(1.35rem,2.4vw,1.9rem)] leading-[1.15] tracking-[-0.03em] text-ink">&ldquo;{f.problem}&rdquo;</p>
        </Container>
      </section>

      {/* 3. How it works */}
      <Section id="how-it-works">
        <Container>
          <SectionHeading eyebrow="How it works" area={f.area} title="Three steps. Most of them aren't yours." />
          <ol className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-3">
            {f.steps.map((s, i) => (
              <Card as="li" key={s.title} className="flex flex-col p-5">
                <div className="flex items-start justify-between gap-4">
                  <span className={`flex h-9 w-9 items-center justify-center rounded-full text-[15px] font-semibold ${AREA_TONE[f.area].soft} ${AREA_TONE[f.area].text}`}>{i + 1}</span>
                  <Mini id={s.mini} />
                </div>
                <h3 className="mt-4 text-h3 font-semibold text-ink">{s.title}</h3>
                <dl className="mt-3 space-y-2.5 text-small">
                  <div className="flex gap-3"><dt className="w-[72px] shrink-0 font-semibold text-muted-ink">You</dt><dd className="text-ink">{s.you}</dd></div>
                  <div className="flex gap-3"><dt className={`w-[72px] shrink-0 font-semibold ${AREA_TONE[f.area].text}`}>RingPost</dt><dd className="text-ink">{s.ringpost}</dd></div>
                </dl>
              </Card>
            ))}
          </ol>
        </Container>
      </Section>

      {/* 4. The page's own demo */}
      {demo && (
        <Section tone="white" id="demo" fit>
          <Container>
            <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-2">
              <div>
                <Eyebrow area={f.area}>Try it</Eyebrow>
                <h2 className="mt-2 font-display text-h2 text-ink">{f.demo.title}</h2>
              </div>
              <p className="max-w-[30rem] text-body text-muted-ink lg:text-right">{f.demo.lede}</p>
            </div>
            <div className="mt-[clamp(1rem,3svh,2rem)]">{demo}</div>
          </Container>
        </Section>
      )}
      {children}

      {/* 5. What your customer sees */}
      <Section>
        <Container className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[minmax(0,320px)_1fr] lg:gap-16">
          <PhoneFrame className="order-2 mx-auto w-full max-w-[min(290px,calc((100svh-90px)*0.46))] lg:order-1" app={f.sees.customer.kind === "chat" ? f.sees.customer.app : undefined}><CustomerView c={f.sees.customer} /></PhoneFrame>
          <div className="order-1 lg:order-2">
            <SectionHeading eyebrow="Both sides" area={f.area} title="What your customer sees. What you see." />
            <dl className="mt-6 grid grid-cols-1 gap-3">
              <div className="rounded-rp-md border border-line bg-white p-5 shadow-rp-1">
                <dt className="text-small font-semibold text-muted-ink">Your customer</dt>
                <dd className="mt-1 text-body text-ink">{f.sees.customerNote}</dd>
              </div>
              <div className="rounded-rp-md border border-line bg-white p-5 shadow-rp-1">
                <dt className={`text-small font-semibold ${AREA_TONE[f.area].text}`}>You, in your dashboard</dt>
                <dd className="mt-1 text-body text-ink">{f.sees.ownerNote}</dd>
              </div>
            </dl>
          </div>
        </Container>
      </Section>

      {/* 6. Control */}
      <Section tone="white">
        <Container>
          <SectionHeading eyebrow="You're in control" area={f.area} title="Your rules. Changed in one tap." />
          <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {f.controls.map((c) => (
              <Card as="li" key={c.where} className="p-5">
                <p className="inline-flex flex-wrap items-center gap-1 rounded-rp-sm bg-surface-2 px-2.5 py-1.5 text-[13px] font-semibold text-ink">
                  {c.where.split(" → ").map((part, i) => (
                    <span key={i} className="inline-flex items-center gap-1">{i > 0 && <ChevronRight className="h-3 w-3 text-muted-ink" aria-hidden />}{part}</span>
                  ))}
                </p>
                <p className="mt-3 text-small text-muted-ink">{c.what}</p>
              </Card>
            ))}
          </ul>
        </Container>
      </Section>

      {/* 7. Set it up */}
      <Section>
        <Container className="grid grid-cols-1 gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:gap-12">
          <SectionHeading eyebrow="Set it up" area={f.area} title="Step by step, in your dashboard." lede="Each step names the page to open, exactly as it's written in the sidebar." />
          <ol className="space-y-3">
            {f.setup.map((s, i) => (
              <li key={i} className="flex gap-4 rounded-rp-md border border-line bg-white p-4 shadow-rp-1">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ink text-small font-semibold text-white">{i + 1}</span>
                <div className="min-w-0">
                  <p className="flex flex-wrap items-center gap-1.5">
                    {s.path.map((p, j) => (
                      <span key={j} className="inline-flex items-center gap-1.5">
                        {j > 0 && <ArrowRight className="h-3.5 w-3.5 text-muted-ink" aria-hidden />}
                        <span className={`rounded-full px-2.5 py-1 text-[13px] font-semibold ${AREA_TONE[f.area].soft} ${AREA_TONE[f.area].text}`}>{p}</span>
                      </span>
                    ))}
                  </p>
                  <p className="mt-2 text-body text-ink">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      {/* 8. Works together with */}
      <Section tone="white">
        <Container>
          <SectionHeading eyebrow="Works together with" area={f.area} title="One brain behind all of it." />
          <ul className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
            {related.map((r) => (
              <li key={r.key}>
                <Link href={FEATURE_PATH[r.key]} className="group flex h-full flex-col rounded-rp-md border border-line bg-white p-5 shadow-rp-1 transition-[box-shadow,border-color,transform] duration-300 ease-rp hover:-translate-y-0.5 hover:border-primary-line hover:shadow-rp-2">
                  <span className={`text-small font-semibold ${AREA_TONE[r.f.area].text}`}>{AREA_NAME[r.f.area]}</span>
                  <span className="mt-1 text-h3 font-semibold text-ink">{r.f.name}</span>
                  <span className="mt-2 text-small text-muted-ink">{r.link.summary}</span>
                  <span className="mt-auto flex items-center gap-1.5 pt-4 text-small font-semibold text-violet">See how it works <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden /></span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* 9. Questions */}
      <Section>
        <Container className="grid grid-cols-1 gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:gap-12">
          <SectionHeading eyebrow="Questions" area={f.area} title={`About ${f.name === "One inbox" ? "the inbox" : f.name}.`} lede={<>Something else? <Link href={ROUTES.faq} className="font-semibold text-violet underline-offset-4 hover:underline">Read every answer</Link>.</>} />
          <Faq items={f.faq} structuredData />
        </Container>
      </Section>

    </>
  );
}
