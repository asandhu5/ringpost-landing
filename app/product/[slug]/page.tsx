import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check, Minus } from "lucide-react";
import { PRODUCT_ICONS } from "@/components/site/icons";
import { Container, CtaBand, Eyebrow, FaqList, H2, PageHero, ScreenshotFrame, Section, TrialButtons, cx } from "@/components/site/ui";
import { PILLARS, PRODUCTS, productBySlug, productsIn } from "@/lib/content/products";
import { GUARDRAILS } from "@/lib/content/platform";
import { PLANS, planIncludes } from "@/lib/plans";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = productBySlug((await params).slug);
  if (!p) return {};
  return {
    title: p.title,
    description: p.description,
    openGraph: { title: p.title, description: p.description, url: `/product/${p.slug}` },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const product = productBySlug((await params).slug);
  if (!product) notFound();
  const pillar = PILLARS[product.pillar];
  const siblings = productsIn(product.pillar).filter((p) => p.slug !== product.slug);
  const others = PRODUCTS.filter((p) => p.pillar !== product.pillar).slice(0, 3);
  const Icon = PRODUCT_ICONS[product.slug];

  return (
    <>
      <PageHero
        eyebrow={`${pillar.name} · ${product.hero.eyebrow}`}
        title={product.hero.headline}
        lede={product.hero.lede}
        crumbs={[
          { name: "Product", href: "/product" },
          { name: product.name, href: `/product/${product.slug}` },
        ]}
      >
        <TrialButtons />
      </PageHero>

      {product.screenshot && (
        <Section className="!pt-0">
          <Container>
            <ScreenshotFrame {...product.screenshot} />
          </Container>
        </Section>
      )}

      <Section tone="surface">
        <Container>
          <div className="mb-12 flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-line-strong bg-violet/10 text-glow">
              <Icon aria-hidden className="h-5 w-5" />
            </span>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-ink">How it works</p>
          </div>
          <div className="grid gap-x-16 gap-y-12 lg:grid-cols-2">
            {product.sections.map((s) => (
              <div key={s.heading}>
                <h2 className="font-display text-3xl leading-tight text-ink">{s.heading}</h2>
                <p className="mt-3 text-[1.02rem] leading-relaxed text-muted-ink">{s.body}</p>
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
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <Eyebrow>Plans</Eyebrow>
            <H2>Which plans include it.</H2>
            <Link href="/pricing" className="mt-6 inline-flex items-center gap-1.5 text-[15px] font-medium text-glow hover:text-white">
              See pricing <ArrowRight aria-hidden className="h-4 w-4" />
            </Link>
          </div>
          <div className="overflow-x-auto rounded-2xl border border-line">
            <table className="w-full min-w-[520px] border-collapse text-left text-[14.5px]">
              <thead>
                <tr className="border-b border-line bg-surface">
                  <th scope="col" className="px-5 py-3.5 font-medium text-muted-ink">
                    <span className="sr-only">Feature</span>
                  </th>
                  {PLANS.map((p) => (
                    <th key={p.id} scope="col" className="px-5 py-3.5 font-semibold text-ink">
                      {p.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {product.plans.map((row) => (
                  <tr key={row.label}>
                    <th scope="row" className="px-5 py-3.5 font-normal text-muted-ink">
                      {row.label}
                    </th>
                    {PLANS.map((p) => {
                      const has = row.feature === null || planIncludes(p.id, row.feature);
                      return (
                        <td key={p.id} className="px-5 py-3.5">
                          {has ? <Check aria-label="Included" className="h-4 w-4 text-success" /> : <Minus aria-label="Not included" className="h-4 w-4 text-faint" />}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </Section>

      {product.pillar === "answer" && (
        <Section tone="grid">
          <Container>
            <div className="rp-card rounded-3xl p-7 sm:p-10">
              <Eyebrow>Guardrails</Eyebrow>
              <h2 className="max-w-2xl font-display text-4xl leading-tight text-ink">{GUARDRAILS.headline}</h2>
              <ul className="mt-8 grid gap-6 md:grid-cols-2">
                {GUARDRAILS.rules.map((r) => (
                  <li key={r.title}>
                    <h3 className="text-[1.02rem] font-semibold text-ink">{r.title}</h3>
                    <p className="mt-1.5 text-[14.5px] leading-relaxed text-muted-ink">{r.body}</p>
                  </li>
                ))}
              </ul>
            </div>
          </Container>
        </Section>
      )}

      {product.faq && (
        <Section>
          <Container narrow>
            <h2 className="mb-8 font-display text-4xl text-ink">Questions</h2>
            <FaqList items={product.faq} structuredData />
          </Container>
        </Section>
      )}

      <Section className="!pt-0">
        <Container>
          <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.2em] text-faint">Keep exploring</p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[...siblings, ...others].slice(0, 4).map((p) => {
              const I = PRODUCT_ICONS[p.slug];
              return (
                <Link key={p.slug} href={`/product/${p.slug}`} className={cx("rp-card rp-card-hover flex items-start gap-3 rounded-2xl p-5")}>
                  <I aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-glow" />
                  <span>
                    <span className="block text-[14.5px] font-medium text-ink">{p.name}</span>
                    <span className="mt-1 block text-[13px] leading-snug text-muted-ink">{p.summary}</span>
                  </span>
                </Link>
              );
            })}
          </div>
        </Container>
      </Section>

      <CtaBand />
    </>
  );
}
