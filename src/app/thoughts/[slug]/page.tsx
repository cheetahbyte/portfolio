import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";

import type { Thought } from "@/lib/gray";
import { getThoughtBySlug, getThoughtSlugs, getThoughts } from "@/lib/gray";

export async function generateStaticParams() {
  return getThoughtSlugs().map((slug) => ({
    slug,
  }));
}

export function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return params.then(async ({ slug }) => {
    const thought = getThoughtBySlug(slug);

    if (!thought) {
      return {
        title: "Thought not found",
      };
    }

    return {
      title: `${thought.title} - Thoughts`,
      description: `${thought.title} from ${thought.date}`.trim(),
    };
  });
}

export default async function ThoughtPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const thought = getThoughtBySlug(slug);

  if (!thought) {
    notFound();
  }

  const { title, date, content } = thought as Thought;
  const tag = thought.tags?.[0];

  const nearby = getThoughts().filter((item) => item.id !== slug);
  const previous = nearby.length > 0 ? nearby[0] : null;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
      <article>
        <header className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
            {title}
            <span className="ml-1 text-neutral-400 dark:text-neutral-500">
              .
            </span>
          </h1>

          <div className="m-1 flex items-center gap-2 font-display text-xs font-medium uppercase tracking-[0.16em] text-neutral-400 dark:text-neutral-500">
            {date ? <time>{date}</time> : null}
            {tag ? (
              <>
                <span>-</span>
                <span>{tag}</span>
              </>
            ) : null}
          </div>

          <Link
            href="/"
            className="inline-flex items-center gap-1 text-xs text-neutral-400 transition-colors hover:text-neutral-900 dark:hover:text-neutral-100"
          >
            Back
          </Link>
        </header>

        <div className="prose prose-neutral max-w-none text-sm text-neutral-600 prose-a:text-neutral-900 prose-a:underline-offset-2 prose-headings:font-display prose-headings:font-semibold prose-headings:text-neutral-900 dark:prose-invert dark:text-neutral-400 dark:prose-a:text-neutral-100 dark:prose-headings:text-neutral-100">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      </article>

      {previous ? (
        <p className="mt-5 mb-5 text-sm text-neutral-400 dark:text-neutral-500">
          Next up:{" "}
          <Link
            href={`/thoughts/${previous.id}`}
            className="underline decoration-[1px] underline-offset-4 hover:text-neutral-900 dark:hover:text-neutral-100"
          >
            {previous.title}
          </Link>
        </p>
      ) : null}
    </div>
  );
}
