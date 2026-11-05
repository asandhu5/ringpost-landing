import Link from "next/link";
import { ArrowRight, CalendarClock, Captions, Check, CheckCircle2, ImagePlus, Send } from "lucide-react";
import { PostingStudio, SocialPhones } from "@/components/site/posting-studio";
import { ChannelLogo } from "@/components/site/channel-logos";
import { POST_PLATFORMS } from "@/lib/content/platforms";
import { Container, FaqList, Section, StartButtons } from "@/components/site/ui";

export const metadata = {
  title: "Social posting: your content, captions and schedule in one place",
  description: "Preview your videos on Instagram, TikTok and YouTube. Review platform captions, publish now or plan ahead with RingPost.",
};

export default function PostingPage() {
  return <>
    <section className="overflow-hidden bg-[#f0edff] pb-12 pt-28 sm:pt-32">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[.72fr_1.28fr]">
        <div className="mx-auto max-w-2xl text-center lg:text-left">
          <p className="text-xs font-semibold uppercase tracking-[.18em] text-violet-700">RingPost · Social publishing</p>
          <h1 className="mt-4 text-[clamp(2.2rem,4.3vw,3.8rem)] font-semibold leading-[1.06] tracking-[-.04em] text-ink">Your next customer<br/>could be one post away.</h1>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted-ink">Turn your content into a consistent social presence. Review the caption, choose your accounts and publish now—or have the week ready in advance.</p>
          <div className="mt-6 flex justify-center lg:justify-start"><StartButtons/></div>
        </div>
        <div className="mx-auto w-full max-w-[900px]"><SocialPhones/></div>
        </div>
        <p className="mt-8 text-center text-xs text-muted-ink">App-style previews with AI-created business videos. Your posts publish through your own connected accounts.</p>
      </Container>
    </section>

    <Section><Container>
      <div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:gap-16">
        <div><p className="text-xs font-semibold uppercase tracking-wider text-violet-600">Stay visible. Save the admin.</p><h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink">One place to prepare.<br/>More places to be seen.</h2><p className="mt-4 text-sm leading-relaxed text-muted-ink">You should not have to upload the same file and rewrite the same message over and over. Bring a photo or video, then prepare it for the networks your customers use.</p><Link href="/content-studio" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-violet-700">Need content first? Meet Content Studio <ArrowRight size={16}/></Link></div>
        <div className="grid gap-5 sm:grid-cols-2">{[
          {Icon:ImagePlus,title:"Your content, ready to use",body:"Choose from your Media Library or upload your own images and videos. Keep each creative with its caption."},
          {Icon:Captions,title:"A caption for each audience",body:"RingPost writes from your business knowledge. Review the wording, hashtags and call to action before publishing."},
          {Icon:Send,title:"Publish now",body:"An announcement, a new arrival or today's availability: approve your post and send it to selected accounts."},
          {Icon:CalendarClock,title:"Plan ahead",body:"Pick the publishing date and time. Keep approved posts in a schedule instead of remembering every upload."},
        ].map(({Icon,title,body}) => <div key={title} className="rounded-2xl border border-line bg-white p-5"><Icon size={23} className="text-violet-600"/><h3 className="mt-4 text-base font-semibold text-ink">{title}</h3><p className="mt-2 text-sm leading-relaxed text-muted-ink">{body}</p></div>)}</div>
      </div>
      <div className="mt-10 border-t border-line pt-6"><p className="mb-4 text-xs font-medium text-muted-ink">Prepare posts for your connected destinations</p><div className="flex flex-wrap gap-x-5 gap-y-4">{POST_PLATFORMS.map(p => <span key={p.id} className="flex items-center gap-2 text-xs font-medium text-ink"><ChannelLogo id={p.id} size={24}/>{p.name}</span>)}</div></div>
    </Container></Section>

    <Section tone="surface"><Container>
      <div className="mb-8 max-w-2xl"><p className="text-xs font-semibold uppercase tracking-wider text-violet-600">A clearer publishing routine</p><h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink">Choose the message.<br/>Then choose the moment.</h2><p className="mt-4 text-sm leading-relaxed text-muted-ink">Select destinations, review captions and set the timing. RingPost handles delivery after approval, while you carry on running the business.</p></div>
      <PostingStudio/>
    </Container></Section>

    <Section><Container><div className="grid items-center gap-10 lg:grid-cols-2">
      <div className="rounded-3xl border border-line bg-white p-6 shadow-sm"><div className="flex items-center justify-between border-b border-line pb-4"><h3 className="text-sm font-semibold text-ink">Your publishing schedule</h3><CalendarClock size={20} className="text-violet-600"/></div>{[
        {day:"MON",title:"Introduce your business",type:"Image + caption",state:"Ready for review",color:"bg-amber-50 text-amber-700"},
        {day:"WED",title:"Show the work behind it",type:"Video + caption",state:"Scheduled",color:"bg-violet-50 text-violet-700"},
        {day:"FRI",title:"Give customers a next step",type:"Image + caption",state:"Published",color:"bg-emerald-50 text-emerald-700"},
      ].map(x => <div key={x.day} className="flex flex-wrap items-center gap-3 border-b border-line py-5 last:border-0"><span className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-[10px] font-bold text-muted-ink">{x.day}</span><div className="min-w-0 flex-1"><p className="text-sm font-semibold text-ink">{x.title}</p><p className="mt-1 text-xs text-muted-ink">{x.type}</p></div><span className={`rounded-full px-3 py-1 text-[10px] font-semibold ${x.color}`}>{x.state}</span></div>)}</div>
      <div><p className="text-xs font-semibold uppercase tracking-wider text-violet-600">Know what is going out</p><h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink">A schedule you can follow.<br/>Results you can check.</h2><p className="mt-4 text-sm leading-relaxed text-muted-ink">See what needs approval, what is scheduled and what has been delivered. Each destination has its own result, so you can check a problem before trying again.</p><ul className="mt-6 space-y-4">{["Keep creative work and publishing organised","Use approvals or your chosen automation settings","Follow post performance where the platform supports it"].map(t => <li key={t} className="flex items-center gap-3 text-sm text-ink"><CheckCircle2 size={19} className="shrink-0 text-violet-600"/>{t}</li>)}</ul></div>
    </div></Container></Section>

    <Section tone="surface"><Container narrow><h2 className="text-3xl font-semibold text-ink">Before your first post.</h2><div className="mt-7"><FaqList items={[
      {q:"Do I need Content Studio to publish?",a:"No. You can upload your own images and videos, or choose AI-created content from your Media Library. Posting prepares the caption, destinations and publishing time."},
      {q:"Can I review the caption?",a:"Yes. Review and edit captions before approval. Your saved business knowledge helps RingPost write about your actual services and offers."},
      {q:"Will it post to every social account automatically?",a:"You choose the connected destinations and approval settings. Accounts must be connected and support the selected media format before a post can be delivered."},
    ]}/></div><div className="mt-8"><StartButtons/></div></Container></Section>
  </>;
}
