import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { formatDate, type Post } from "@/lib/blog";

export function BlogCard({ post }: { post: Post }) {
  return (
    <Link href={`/resources/blog/${post.slug}`} className="rp-card rp-card-hover group flex flex-col rounded-3xl p-7">
      <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-faint">
        <time dateTime={post.date}>{formatDate(post.date)}</time> · {post.readingMinutes} min read
      </p>
      <h3 className="mt-4 font-display text-[1.9rem] leading-[1.1] text-ink">{post.title}</h3>
      <p className="mt-3 text-[15px] leading-relaxed text-muted-ink">{post.description}</p>
      <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-[14px] font-medium text-glow">
        Read <ArrowRight aria-hidden className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}
