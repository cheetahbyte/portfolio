import { createFileRoute, Link } from "@tanstack/solid-router";
import { GenericSection, ThoughtList } from "../components";
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
        <ThoughtList all />
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
