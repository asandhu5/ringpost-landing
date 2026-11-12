import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { formatDate, type Post } from "@/lib/blog";

export function BlogCard({ post, featured }: { post: Post; featured?: boolean }) {
  return (
    <Link href={`/resources/blog/${post.slug}`} className={`group flex h-full flex-col rounded-rp-md border bg-white transition-[box-shadow,border-color,transform] duration-300 ease-rp hover:-translate-y-0.5 hover:border-primary-line hover:shadow-rp-2 ${featured ? "border-primary-line bg-[linear-gradient(135deg,#f1eeff_0%,#ffffff_55%)] p-6 shadow-rp-2 sm:p-8" : "border-line p-5 shadow-rp-1"}`}>
      <p className="text-small text-muted-ink">
        {featured && <span className="mr-2 rounded-full bg-violet px-2.5 py-1 text-[12px] font-semibold text-white">Latest</span>}
        <time dateTime={post.date}>{formatDate(post.date)}</time> · {post.readingMinutes} min read
      </p>
      <h3 className={`mt-3 font-display text-ink ${featured ? "max-w-[22ch] text-h2" : "text-[1.35rem] leading-[1.15] tracking-[-0.03em]"}`}>{post.title}</h3>
      <p className={`mt-2.5 text-muted-ink ${featured ? "max-w-[40rem] text-body" : "text-small"}`}>{post.description}</p>
      <span className="mt-auto flex items-center gap-1.5 pt-4 text-small font-semibold text-violet">Read it <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden /></span>
    </Link>
  );
}
