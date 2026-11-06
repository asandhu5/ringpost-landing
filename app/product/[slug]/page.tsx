import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";
import { ChannelLogo } from "@/components/site/channel-logos";
import { Screen } from "@/components/site/product-showcase";
import { PRODUCT_ICONS } from "@/components/site/icons";
import { InViewGroup } from "@/components/site/motion";
import { Reveal } from "@/components/site/reveal";
import { Container, Eyebrow, FaqList, H2, JsonLd, PageHero, Section, StartButtons, screenshotExists } from "@/components/site/ui";
import { SITE } from "@/lib/site";
import { ProductVisual } from "@/components/site/visuals";
import { GUARDRAILS } from "@/lib/content/platform";
import { ExplainerSections } from "@/components/site/explainer-sections";
import { PRODUCT_EXPLAINERS } from "@/lib/content/explainers";
import { POST_PLATFORMS } from "@/lib/content/platforms";
import { PRODUCTS, productBySlug } from "@/lib/content/products";
import { ReviewsPage } from "@/components/site/grow/reviews-page";
import { AdvisorPage, InsightsPage, WinbackPage } from "@/components/site/grow/tool-pages";
import { CHANNEL_EXTRAS, CHANNEL_MENU, CONTENT_MENU, GROW_MENU, type NavLink } from "@/lib/nav";

export function generateStaticParams() {
  return PRODUCTS.filter((p) => !p.page).map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = productBySlug((await params).slug);
  if (!p) return {};
  return { title: p.title, description: p.description, openGraph: { title: p.title, description: p.description, url: `/product/${p.slug}` } };
}

/** Which menu a feature belongs to (lib/nav.ts), for its breadcrumb and its neighbours. */
function menuFor(slug: string): { name: string; href: string; links: NavLink[] } {
  const href = `/product/${slug}`;
  if (CONTENT_MENU.some((l) => l.href === href)) return { name: "Content Studio", href: "/content-studio", links: CONTENT_MENU };
  if (GROW_MENU.some((l) => l.href === href)) return { name: "Grow", href: "/grow", links: GROW_MENU };
  return { name: "Channels", href: "/channels", links: [...CHANNEL_EXTRAS, ...CHANNEL_MENU.slice(0, 3)] };
}

/** Pages where the networks themselves are the point: show their real logos. */
const SHOW_PLATFORMS = new Set(["reviews"]);

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const product = productBySlug((await params).slug);
  if (!product) notFound();
  const GrowPage = { reviews: ReviewsPage, winback: WinbackPage, insights: InsightsPage, advisor: AdvisorPage }[product.slug];
  if (GrowPage) {
    const crumbs = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "Grow", item: `${SITE.url}/grow` },
      { "@type": "ListItem", position: 2, name: product.name, item: `${SITE.url}/product/${product.slug}` },
    ] };
    return (
      <>
        <JsonLd data={crumbs} />
        <GrowPage product={product} />
      </>
    );
  }
  const menu = menuFor(product.slug);
  const related = menu.links.filter((l) => l.href !== `/product/${product.slug}`).slice(0, 4);
  const hasShot = Boolean(product.screen && screenshotExists(product.screen.src));
  const Icon = PRODUCT_ICONS[product.slug];

  return (
    <>
      <PageHero
        eyebrow={menu.name}
        title={product.hero.headline}
        lede={product.hero.lede}
        crumbs={[
          { name: menu.name, href: menu.href },
          { name: product.name, href: `/product/${product.slug}` },
        ]}
        aside={hasShot ? <Screen src={product.screen!.src} alt={product.screen!.alt} priority /> : <ProductVisual slug={product.slug} />}
      >
        {SHOW_PLATFORMS.has(product.slug) && (
          <div className="mb-8 flex flex-wrap gap-2">
            {POST_PLATFORMS.map((p) => (
              <ChannelLogo key={p.id} id={p.id} size={34} />
            ))}
          </div>
        )}
        <StartButtons />
      </PageHero>

      <Section id="how-it-works" className="scroll-mt-32 !pt-6">
        <Container>
          <Reveal className="mb-10 flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#5b4ee6]/10 text-[#5b4ee6]">
              <Icon className="h-5 w-5" aria-hidden />
            </span>
            <div>
              <Eyebrow className="!mb-0">{product.name}</Eyebrow>
              <H2>What it does for your business.</H2>
            </div>
          </Reveal>
          <InViewGroup className="grid gap-4 md:grid-cols-2">
            {product.sections.map((s, i) => (
              <article key={s.heading} className="rp-card rp-card-hover flex gap-5 rounded-3xl p-7">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#5b4ee6] text-[14px] font-bold text-white">{i + 1}</span>
                <div>
                  <h3 className="text-[19px] font-semibold leading-snug text-ink">{s.heading}</h3>
                  <p className="mt-2 text-[15.5px] leading-relaxed text-muted-ink">{s.body}</p>
                  {s.points && (
                    <ul className="mt-4 flex flex-col gap-2">
                      {s.points.map((pt) => (
                        <li key={pt} className="flex gap-2.5 text-[15px] text-ink">
                          <Check aria-hidden className="mt-1 h-4 w-4 shrink-0 text-success" />
                          {pt}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </article>
            ))}
          </InViewGroup>
        </Container>
      </Section>

      {PRODUCT_EXPLAINERS[product.slug] && (
        <ExplainerSections ex={PRODUCT_EXPLAINERS[product.slug]} widget={product.slug === "insights" ? "insights" : undefined} />
      )}

      {menu.name === "Channels" && (
        <Section id="guardrails" tone="surface" className="scroll-mt-32">
          <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <h2 className="font-display text-4xl leading-tight text-ink">{GUARDRAILS.headline}</h2>
              <p className="mt-4 text-[16px] leading-relaxed text-muted-ink">{GUARDRAILS.lede}</p>
            </div>
            <InViewGroup as="ul" className="grid gap-x-10 gap-y-6 sm:grid-cols-2">
              {GUARDRAILS.rules.map((r) => (
                <li key={r.title}>
                  <p className="text-[16px] font-medium text-ink">{r.title}</p>
                  <p className="mt-1 text-[14.5px] leading-relaxed text-muted-ink">{r.body}</p>
                </li>
              ))}
            </InViewGroup>
          </Container>
        </Section>
      )}

      {product.faq && (
        <Section id="questions" className="scroll-mt-32">
          <Container narrow>
            <Eyebrow>Questions</Eyebrow>
            <h2 className="mb-8 font-display text-4xl text-ink">{product.name}, answered.</h2>
            <FaqList items={product.faq} structuredData />
          </Container>
        </Section>
      )}

      <Section tone="surface">
        <Container>
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <h2 className="text-[22px] font-bold tracking-tight text-ink">More in {menu.name}</h2>
            <Link href={menu.href} className="inline-flex items-center gap-1.5 text-[14.5px] font-semibold text-glow hover:text-ink">
              See all <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
          <InViewGroup as="ul" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="rp-card rp-card-hover group flex h-full items-start gap-3 rounded-2xl p-5">
                  {l.logo && <ChannelLogo id={l.logo} size={32} />}
                  <span>
                    <span className="block text-[15.5px] font-semibold text-ink group-hover:text-glow">{l.name}</span>
                    <span className="mt-1 block text-[13.5px] leading-snug text-muted-ink">{l.summary}</span>
                  </span>
                </Link>
              </li>
            ))}
          </InViewGroup>
        </Container>
      </Section>
    </>
  );
}
