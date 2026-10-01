import type { Metadata } from "next";
import { LegalPage } from "@/components/landing/legal-page";
import { SITE } from "@/lib/site";
import { TRIAL } from "@/lib/plans";

const TRIAL_DAYS = TRIAL.days;

export const metadata: Metadata = {
  title: "Refund Policy",
  description: `Cancellations and refunds for ${SITE.name}.`,
  robots: { index: true, follow: true },
};

/**
 * Matches the product's billing since 2026-09-29 (packages/core/src/billing/plans.ts): no
 * setup fee; the trial starts when a card is saved, cancelling during it charges nothing,
 * and the plan bills on day 8.
 */
export default function RefundPolicyPage() {
  return (
    <LegalPage
      title="Refund Policy"
      updated="30 September 2026"
      intro="Short, and meant to be clear. If something here doesn't seem fair in your situation, tell us. We'd rather sort it out than hide behind a policy page."
    >
      <h2>How you are billed</h2>
      <p>
        There is <strong>one monthly plan</strong> (Front Desk, Growth or Command Center), shown on
        the <a href="/pricing">pricing page</a>. There is no setup fee, no contract and no minimum
        term. Top-up packs are only charged when you choose to buy one.
      </p>

      <h2>The {TRIAL_DAYS}-day free trial</h2>
      <ul>
        <li>
          Your free trial starts when you choose a plan and save a card. Nothing is charged, and
          your AI starts answering straight away.
        </li>
        <li>
          <strong>Cancel at any time during the trial and you are never charged.</strong> Your plan
          never starts.
        </li>
        <li>
          If you don&rsquo;t cancel, your chosen plan is billed on day {TRIAL_DAYS + 1}, on the card
          you saved. We remind you a day or two before.
        </li>
      </ul>

      <h2>After the trial</h2>
      <ul>
        <li>
          You can cancel your plan at any time. Cancellation takes effect at the{" "}
          <strong>end of the month you&rsquo;ve already paid for</strong>: you keep access until then
          and aren&rsquo;t billed again.
        </li>
        <li>
          We don&rsquo;t refund part-months for time left in a period you&rsquo;ve already paid for.
          If you move to a smaller plan, the unused part of the month is credited to your next
          invoice.
        </li>
      </ul>

      <h2>If it does not suit your business</h2>
      <p>
        Use the trial: cancel within the {TRIAL_DAYS} days and you pay nothing. After that, cancel the
        monthly plan whenever you like. There is nothing to negotiate and no retention call.
      </p>

      <h2>What happens to your data if you leave</h2>
      <p>
        It stays yours. Your customer list, conversation history and bookings can be exported to you
        in a machine-readable format, and we will help you do it. Data is kept for{" "}
        <strong>60 days</strong> after your account ends so you have time to complete that export,
        then deleted from live systems. Ask us to delete sooner and we will. Full detail is in the{" "}
        <a href="/data-processing">Data Processing Addendum</a>.
      </p>
      <p>
        Two practical things to arrange before you go: if we provisioned a phone number for you, tell
        us if you want to port it out rather than have it released; and any social or calendar
        account you connected is simply disconnected. Those accounts were always yours.
      </p>

      <h2>If we got the billing wrong</h2>
      <p>
        If you were charged after cancelling, charged the wrong amount, or
        charged twice, tell us. We&rsquo;ll investigate and put a genuine
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
        During the trial, cancel from <strong>Usage</strong> in your dashboard and nothing is ever
        charged. Otherwise, cancel from <strong>Plan &amp; billing</strong>, or reach us through our{" "}
        <a href="/contact">contact page</a> with your business name and what you&rsquo;d like to do. We aim to reply within
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
