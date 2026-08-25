import { createFileRoute, Link } from "@tanstack/solid-router";
export const Route = createFileRoute("/legal")({ component: Legal });
function Legal() {
  return (
    <div class="w-full max-w-3xl">
      <h1 class="text-3xl/tight font-semibold tracking-[-0.04em]">
        Legal<span class="ml-1 text-faint">.</span>
      </h1>
      <p class="mt-3 text-base text-muted">
        Information pursuant to sect. 5 German Telemedia Act{" "}
        <mark class="rounded-sm bg-mark px-1.5 py-0.5 text-fg">(TMG)</mark>
      </p>
      <div class="mt-10 grid gap-10 text-sm text-muted">
        <section>
          <label class="mb-1.5 block text-[0.6875rem] uppercase tracking-[0.12em]">
            Address
          </label>
          <p class="leading-normal text-fg">
            Leonhard Breuer
            <br />
            c/o COCENTER
            <br />
            Koppoldstr. 1<br />
            86551 Aichach
          </p>
        </section>
        <section>
          <label class="mb-1.5 block text-[0.6875rem] uppercase tracking-[0.12em]">
            Email
          </label>
          <a class="leading-normal text-fg" href="mailto:mail@leob.re">
            mail [at] leob [dot] re
          </a>
        </section>
      </div>
      <Link
        class="mt-10 inline-block text-sm text-fg underline underline-offset-4"
        to="/"
      >
        Back to Home
      </Link>
    </div>
  );
}
