import type { Metadata } from "next";
import { LegalPage } from "@/components/landing/legal-page";
import { PRICING, SITE, SUPPORT_EMAIL } from "@/lib/site";

const money = (n: number) => `${PRICING.currency}${n.toLocaleString("en-US", { minimumFractionDigits: n % 1 ? 2 : 0 })}`;

export const metadata: Metadata = {
  title: "Refund Policy",
  description: `Cancellations and refunds for ${SITE.name}.`,
  robots: { index: true, follow: true },
};

/**
 * Matches the pricing locked on 2026-09-23 (lib/site.ts PRICING): full setup refund
 * during the 7-day trial, the day-60 credit after, setup non-refundable once the trial
 * has ended. The product implements exactly this (cancel during trial → cancel + refund).
 */
export default function RefundPolicyPage() {
  return (
    <LegalPage
      title="Refund Policy"
      updated="23 September 2026"
      intro="Short, and meant to be clear. If something here doesn't seem fair in your situation, email us. We'd rather sort it out than hide behind a policy page."
    >
      <h2>How you are billed</h2>
      <p>
        There is a <strong>one-time setup fee</strong> of {money(PRICING.setup.amount)} and then{" "}
        <strong>one monthly plan</strong> (Front Desk, Growth or Command Center), all shown on the{" "}
        <a href="/pricing">pricing page</a>. There is no contract and no minimum term. Top-up packs
        are only charged when you choose to buy one.
      </p>

      <h2>The {PRICING.trial.days}-day free trial</h2>
      <ul>
        <li>
          Your free trial starts the moment the setup fee is paid, and your AI starts answering
          straight away.
        </li>
        <li>
          <strong>Cancel at any time during the trial and the setup fee is refunded in full</strong>,
          automatically, with no questions. Your plan never starts.
        </li>
        <li>
          If you don&rsquo;t cancel, your chosen plan is billed on day 8, on the card you used for
          setup. We remind you a day or two before.
        </li>
      </ul>

      <h2>After the trial</h2>
      <ul>
        <li>
          The setup fee is <strong>not refundable</strong> once the trial has ended: the setup work it
          pays for has been done and delivered.
        </li>
        <li>
          <strong>Day-60 credit:</strong> once you have been on a paid plan for{" "}
          {PRICING.setupCredit.afterDays} days, half of the setup fee ({money(PRICING.setupCredit.amount)}) is
          credited against your next invoice, whichever plan you are on by then.
        </li>
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
        Use the trial: cancel within the {PRICING.trial.days} days and the setup fee comes back in full.
        After that, cancel the monthly plan whenever you like. There is nothing to negotiate and no
        retention call.
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
        During the trial, cancel from <strong>Usage</strong> in your dashboard and the refund is
        automatic. Otherwise, cancel from <strong>Plan &amp; billing</strong>, or email{" "}
        <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a> with your business name and what
        you&rsquo;d like to do. We aim to reply within
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
