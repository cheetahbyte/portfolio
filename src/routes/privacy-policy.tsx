import { createFileRoute, Link } from "@tanstack/solid-router";
export const Route = createFileRoute("/privacy-policy")({ component: Privacy });
function Privacy() {
  return (
    <div class="w-full">
      <h1 class="text-3xl/tight font-semibold tracking-[-0.04em]">
        Privacy Policy<span class="ml-1 text-faint">.</span>
      </h1>
      <p class="mt-3 text-base text-muted">Coming soon.</p>
      <Link
        class="mt-10 inline-block text-sm text-fg underline underline-offset-4"
        to="/"
      >
        Back to Home
      </Link>
    </div>
  );
}
