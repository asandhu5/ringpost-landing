import type { Metadata } from "next";
import { LegalPage } from "@/components/landing/legal-page";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Data Deletion Instructions",
  description: `How businesses and their customers can request deletion of data held by ${SITE.name}.`,
  robots: { index: true, follow: true },
};

export default function DataDeletionPage() {
  return (
    <LegalPage
      title="Data Deletion Instructions"
      updated="30 September 2026"
      intro={`Businesses using ${SITE.name} and customers who have interacted with those businesses can request deletion of personal data. The route differs because the business controls its customers’ data and ${SITE.name} processes that data on the business’s behalf.`}
    >
      <h2>1. If your business uses RingPost</h2>
      <p>
        An owner or authorised account administrator can request deletion through our{" "}
        <a href="/contact">contact page</a>, using the email address associated
        with the account. Write &ldquo;Account data deletion&rdquo; and include your name,
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
        If you cannot reach the business, contact us through our{" "}
        <a href="/contact">contact page</a> and write &ldquo;Customer data
        deletion&rdquo;. Include your name, the business name, the phone number, email address or
        social handle you used, the channel and approximate date of the interaction, and the country
        where you are located. Do not send identity documents unless we specifically ask for them.
        We will identify the relevant business, forward or coordinate the request, and help it fulfil
        its controller obligations.
      </p>

      <h2>3. Removing RingPost from Threads, Facebook or Instagram</h2>
      <p>
        You can also remove RingPost from your account on the platform itself: on Threads, under
        Settings &rarr; Account &rarr; Website permissions; on Facebook or Instagram, under Settings
        &rarr; Business integrations. Meta then tells us, and we delete the access token and the
        profile details we stored for that account, and the replies and comments we read from it.
        A request made this way is confirmed with a code; quote it on our{" "}
        <a href="/contact">contact page</a> if you have a question about it.
      </p>

      <h2>4. What deletion covers</h2>
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

      <h2>5. Timing</h2>
      <p>
        We acknowledge a deletion request within 72 hours. After verification and any required
        instruction from the business controller, we complete deletion from live systems within 30
        days. Residual encrypted backup copies age out under our backup cycle and are not restored
        except for disaster recovery.
      </p>

      <h2>6. Information we may retain</h2>
      <p>
        We may retain invoices, payment records and a minimal record of the request where accounting,
        tax, fraud-prevention, dispute-resolution or other legal obligations require it. Retained
        information is restricted to those purposes, kept only for the legally required period and
        is not used to operate or market the Service.
      </p>

      <h2>7. Questions</h2>
      <p>
        If you are unsure which route applies, use our{" "}
        <a href="/contact">contact page</a> and explain whether you operate a
        RingPost account or contacted a business that uses RingPost.
      </p>
    </LegalPage>
  );
}
