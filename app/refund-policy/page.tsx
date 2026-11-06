import type { Metadata } from "next";
import { LegalPage } from "@/components/landing/legal-page";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Refund Policy",
  description: `Cancellations and refunds for ${SITE.name}.`,
  robots: { index: true, follow: true },
};

/**
 * Matches the product's billing (packages/core/src/billing/plans.ts): no setup fee;
 * there is no free trial; a plan is billed when it is chosen.
 */
export default function RefundPolicyPage() {
  return (
    <LegalPage
      summary={["You pay for one plan, monthly or yearly, with no setup fee and no long contract.", "Cancel any time: you keep access until the end of the period you've paid for and aren't charged again.", "Unused part-months and unused months of a yearly plan aren't refunded; moving to a smaller plan credits the difference.", "Billing mistakes are put right, and if a real failure on our side left you without the service, we'll discuss a fair credit or refund.", "Your data stays yours for 60 days after you leave so you can export it."]}
      title="Refund Policy"
      updated="7 November 2026"
      intro="Short, and meant to be clear. If something here doesn't seem fair in your situation, tell us. We'd rather sort it out than hide behind a policy page."
    >
      <h2>How you are billed</h2>
      <p>
        You choose <strong>one plan</strong> (Starter, Essential, Growth or Pro), shown on the{" "}
        <a href="/pricing">pricing page</a>, paid <strong>monthly or yearly</strong> (yearly is 20%
        off twelve months). There is no setup fee and no contract beyond the period you paid for.
        Top-up packs are only charged when you choose to buy one.
      </p>

      <h2>Cancelling</h2>
      <ul>
        <li>
          Your plan is billed when you choose it, then monthly or yearly, in advance, as you chose.
          There is no setup fee.
        </li>
        <li>
          You can cancel your plan at any time. Cancellation takes effect at the{" "}
          <strong>end of the month (or year, on yearly billing) you&rsquo;ve already paid for</strong>:
          you keep access until then and aren&rsquo;t billed again. Yearly plans are not refunded
          for the unused months.
        </li>
        <li>
          We don&rsquo;t refund part-months for time left in a period you&rsquo;ve already paid for.
          If you move to a smaller plan, the unused part of the month is credited to your next
          invoice.
        </li>
      </ul>

      <h2>If it does not suit your business</h2>
      <p>
        See the dashboard before you pay, and ask our assistant or the team anything. Once you&rsquo;re
        on a plan, cancel it whenever you like. There is nothing to negotiate and no
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
        Cancel from <strong>Plan &amp; billing</strong> in your dashboard, or reach us through our{" "}
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
