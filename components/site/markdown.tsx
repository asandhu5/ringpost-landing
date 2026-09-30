import Link from "next/link";
import { Fragment } from "react";

/**
 * Renders the Markdown subset the blog posts use: ## / ### headings, paragraphs, - and
 * 1. lists, > quotes, **bold**, _italic_ and [links](/path). Anything else is shown as
 * plain text, never as HTML, so a post can't inject markup.
 */
export function Markdown({ source }: { source: string }) {
  const blocks = source.replace(/\r\n/g, "\n").split(/\n{2,}/);
  return (
    <>
      {blocks.map((block, i) => {
        const text = block.trim();
        if (!text) return null;
        if (text.startsWith("### ")) return <h3 key={i}>{inline(text.slice(4))}</h3>;
        if (text.startsWith("## ")) return <h2 key={i}>{inline(text.slice(3))}</h2>;
        if (text.startsWith("> ")) return <blockquote key={i}>{inline(text.replace(/^> ?/gm, ""))}</blockquote>;
        const lines = text.split("\n");
        if (lines.every((l) => /^- /.test(l))) {
          return (
            <ul key={i}>
              {lines.map((l, j) => (
                <li key={j}>{inline(l.slice(2))}</li>
              ))}
            </ul>
          );
        }
        if (lines.every((l) => /^\d+\. /.test(l))) {
          return (
            <ol key={i}>
              {lines.map((l, j) => (
                <li key={j}>{inline(l.replace(/^\d+\. /, ""))}</li>
              ))}
            </ol>
          );
        }
        return <p key={i}>{inline(lines.join(" "))}</p>;
      })}
    </>
  );
}

function inline(text: string): React.ReactNode {
  const out: React.ReactNode[] = [];
  const re = /\*\*([^*]+)\*\*|_([^_]+)_|\[([^\]]+)\]\(([^)\s]+)\)|`([^`]+)`/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let k = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(<Fragment key={k++}>{text.slice(last, m.index)}</Fragment>);
    if (m[1]) out.push(<strong key={k++}>{m[1]}</strong>);
    else if (m[2]) out.push(<em key={k++}>{m[2]}</em>);
    else if (m[5]) out.push(<code key={k++} className="rounded bg-white/[0.07] px-1.5 py-0.5 font-mono text-[0.9em] text-ink">{m[5]}</code>);
    else if (m[3]) {
      const href = m[4];
      out.push(
        href.startsWith("/") ? (
          <Link key={k++} href={href}>
            {m[3]}
          </Link>
        ) : (
          <a key={k++} href={href} rel="noopener noreferrer">
            {m[3]}
          </a>
        ),
      );
    }
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push(<Fragment key={k++}>{text.slice(last)}</Fragment>);
  return out;
}
