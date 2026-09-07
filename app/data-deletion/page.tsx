import type { Metadata } from "next";
import { LegalPage } from "@/components/landing/legal-page";
import { SITE, SUPPORT_EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Data Deletion Instructions",
  description: `How businesses and their customers can request deletion of data held by ${SITE.name}.`,
  robots: { index: true, follow: true },
};

export default function DataDeletionPage() {
  return (
    <LegalPage
      title="Data Deletion Instructions"
      updated="7 September 2026"
      intro={`Businesses using ${SITE.name} and customers who have interacted with those businesses can request deletion of personal data. The route differs because the business controls its customers’ data and ${SITE.name} processes that data on the business’s behalf.`}
    >
      <h2>1. If your business uses RingPost</h2>
      <p>
        An owner or authorised account administrator can request deletion by emailing{" "}
        <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a> from the email address associated
        with the account. Use the subject &ldquo;Account data deletion&rdquo; and include your name,
        business name, account email address and a clear statement that you want the account and its
        data deleted.
      </p>
      <p>
        We may ask you to confirm control of the account before deletion. This protects the business
        and its customers from an unauthorised request.
      </p>

      <h2>2. If you are a customer of a business using RingPost</h2>
      <p>
        Contact the business you called, messaged or booked with and ask it to delete your data. That
        business is the data controller and RingPost is its processor, so the business is responsible
        for deciding and instructing us how to handle the request.
      </p>
      <p>
        If you cannot reach the business, email{" "}
        <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a> with the subject &ldquo;Customer data
        deletion&rdquo;. Include your name, the business name, the phone number, email address or
        social handle you used, the channel and approximate date of the interaction, and the country
        where you are located. Do not send identity documents unless we specifically ask for them.
        We will identify the relevant business, forward or coordinate the request, and help it fulfil
        its controller obligations.
      </p>

      <h2>3. What deletion covers</h2>
      <p>A verified business-account deletion removes:</p>
      <ul>
        <li>the business account and its member access;</li>
        <li>customer records, conversations and message history;</li>
        <li>call recordings and transcripts;</li>
        <li>bookings, appointments and related operational records;</li>
        <li>generated images, videos and other stored media; and</li>
        <li>tokens used to access connected social, messaging and calendar accounts.</li>
      </ul>
      <p>
        A verified end-customer deletion removes that customer&rsquo;s record and the conversations,
        messages, calls and bookings linked to that person within the relevant business account. It
        does not affect records belonging to another customer or business.
      </p>

      <h2>4. Timing</h2>
      <p>
        We acknowledge a deletion request within 72 hours. After verification and any required
        instruction from the business controller, we complete deletion from live systems within 30
        days. Residual encrypted backup copies age out under our backup cycle and are not restored
        except for disaster recovery.
      </p>

      <h2>5. Information we may retain</h2>
      <p>
        We may retain invoices, payment records and a minimal record of the request where accounting,
        tax, fraud-prevention, dispute-resolution or other legal obligations require it. Retained
        information is restricted to those purposes, kept only for the legally required period and
        is not used to operate or market the Service.
      </p>

      <h2>6. Questions</h2>
      <p>
        If you are unsure which route applies, email{" "}
        <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a> and explain whether you operate a
        RingPost account or contacted a business that uses RingPost.
      </p>
    </LegalPage>
  );
}
