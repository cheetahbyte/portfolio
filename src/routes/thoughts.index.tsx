import { createFileRoute, Link } from "@tanstack/solid-router";
import { Show } from "solid-js";
import { GenericSection, ThoughtList } from "../components";
import { thoughts } from "../data";
export const Route = createFileRoute("/thoughts/")({ component: Thoughts });
function Thoughts() {
  return (
    <div class="w-full">
      <header class="mb-14">
        <h1 class="text-3xl/tight font-semibold tracking-[-0.04em]">
          Thoughts<span class="ml-1 text-faint">.</span>
        </h1>
        <p class="mt-3 text-base text-muted">Essays and notes, mostly short.</p>
      </header>
      <GenericSection title="Writing">
        <Show
          when={thoughts.length > 0}
          fallback={<p class="text-sm text-faint">Nothing here yet.</p>}
        >
          <ThoughtList all />
        </Show>
      </GenericSection>
      <Link
        class="mt-10 inline-block text-sm text-fg underline underline-offset-4"
        to="/"
      >
        Back to Home
      </Link>
    </div>
  );
}
