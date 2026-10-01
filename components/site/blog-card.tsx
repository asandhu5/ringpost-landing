import Link from "next/link";
import { formatDate, type Post } from "@/lib/blog";

export function BlogCard({ post }: { post: Post }) {
  return (
    <Link href={`/resources/blog/${post.slug}`} className="rp-card rp-card-hover group flex flex-col rounded-3xl p-7">
      <p className="text-[13px] text-faint">
        <time dateTime={post.date}>{formatDate(post.date)}</time>, {post.readingMinutes} min read
      </p>
      <h3 className="mt-4 font-display text-[1.9rem] leading-[1.1] text-ink group-hover:text-glow">{post.title}</h3>
      <p className="mt-3 text-[15px] leading-relaxed text-muted-ink">{post.description}</p>
    </Link>
  );
}
