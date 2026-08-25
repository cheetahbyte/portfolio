import { createFileRoute, Link, notFound } from "@tanstack/solid-router";
import { parseMarkdown } from "@tanstack/markdown/parser";
import { renderHtml } from "@tanstack/markdown/html";
import { Show } from "solid-js";
import { thoughts, thoughtMarkdown } from "../data";

export const Route = createFileRoute("/thoughts_/$thoughtId")({
  loader: ({ params }) => {
    const source = thoughtMarkdown[params.thoughtId];
    if (!source) throw notFound();

    return {
      id: params.thoughtId,
      document: parseMarkdown(source),
    };
  },
  component: Thought,
});

function Thought() {
  const data = Route.useLoaderData();
  const meta = () => thoughts.find((item) => item.id === data().id);

  return (
    <article class="w-full max-w-[720px]">
      <Link
        class="mb-12 inline-block text-sm text-fg underline underline-offset-4"
        to="/thoughts"
      >
        ← All thoughts
      </Link>
      <Show when={meta()}>
        {(item) => (
          <>
            <header class="border-b border-line pb-8">
              <h1 class="text-3xl/tight font-semibold tracking-[-0.04em]">
                {item().title}
                <span class="ml-1 text-faint">.</span>
              </h1>
              <p class="mt-3 text-muted">{item().description}</p>
              <time class="mt-5 block text-xs text-faint">
                {new Date(`${item().date}T00:00:00`).toLocaleDateString(
                  "en-US",
                  { month: "long", day: "numeric", year: "numeric" },
                )}
              </time>
            </header>
            <div
              class="mt-10 text-[0.9375rem] leading-[1.75] text-muted [&>h2]:mt-10 [&>h2]:mb-3 [&>h2]:text-[1.1rem] [&>h2]:font-normal [&>h2]:tracking-[-0.02em] [&>h2]:text-fg [&>p+p]:mt-4 [&>p:first-child]:text-[1.05rem] [&>p:first-child]:leading-[1.7] [&>p:first-child]:text-fg"
              innerHTML={renderHtml(data().document)}
            />
          </>
        )}
      </Show>
    </article>
  );
}
