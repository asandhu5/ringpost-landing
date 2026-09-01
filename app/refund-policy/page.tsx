import type { Metadata } from "next";
import { LegalPage } from "@/components/landing/legal-page";
import { SITE, SUPPORT_EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Refund Policy",
  description: `Cancellations and refunds for ${SITE.name}.`,
  robots: { index: true, follow: true },
};

/**
 * ⚠️ A REAL BUSINESS DECISION, NOT A DEFAULT TO LEAVE UNREAD:
 *
 * This takes the common SaaS position — setup fee non-refundable once
 * onboarding work has begun, subscription cancellable any time effective
 * at period end, no prorated refunds mid-period.
 *
 * The alternative worth weighing: a short money-back window (e.g. "full
 * refund within 14 days") materially lowers the perceived risk of a
 * four-figure upfront fee for a first-time client who has never heard of
 * you. That can be the difference between a signature and a "let me think
 * about it". Decide this deliberately.
 */
export default function RefundPolicyPage() {
  return (
    <LegalPage
      title="Refund Policy"
      updated="1 September 2026"
      intro="Short, and meant to be clear. If something here doesn't seem fair in your situation, email us — we'd rather sort it out than hide behind a policy page."
    >
      <h2>The one-time setup fee</h2>
      <p>
        The setup fee pays for real, individual work: configuring your AI
        receptionist on your own services and prices, connecting your channels,
        and getting your account genuinely working.
      </p>
      <ul>
        <li>
          <strong>Before onboarding work begins</strong> — change your mind and
          we&rsquo;ll refund it in full, no questions.
        </li>
        <li>
          <strong>Once onboarding work has begun</strong> — the setup fee is
          non-refundable, because the work it pays for has been done.
        </li>
      </ul>

      <h2>The monthly subscription</h2>
      <ul>
        <li>You can cancel at any time.</li>
        <li>
          Cancellation takes effect at the <strong>end of the billing period
          you&rsquo;ve already paid for</strong> — you keep access until then,
          and you aren&rsquo;t billed again afterwards.
        </li>
        <li>
          We don&rsquo;t refund part-months for time left in a period
          you&rsquo;ve already paid for.
        </li>
      </ul>

      <h2>If we got the billing wrong</h2>
      <p>
        If you were charged after cancelling, charged the wrong amount, or
        charged twice — tell us. We&rsquo;ll investigate and put a genuine
        billing error right promptly. That isn&rsquo;t a goodwill gesture,
        it&rsquo;s just correct.
      </p>

      <h2>If the Service isn&rsquo;t working</h2>
      <p>
        If RingPost isn&rsquo;t doing what it&rsquo;s supposed to for your
        business, raise it with us before cancelling. Most problems are a
        configuration issue we can fix quickly. Where a genuine, sustained
        failure on our side has left you without the Service you paid for,
        we&rsquo;ll discuss a fair credit or refund for the affected period.
      </p>

      <h2>How to cancel or ask for a refund</h2>
      <p>
        Email <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a> with your
        business name and what you&rsquo;d like to do. We aim to reply within
        two business days.
      </p>

      <hr />

      <p>
        Payments are processed by Paddle, our merchant of record. Refunds we
        approve are issued back through Paddle to the original payment method,
        and can take a few business days to appear depending on your bank.
      </p>
    </LegalPage>
  );
}
