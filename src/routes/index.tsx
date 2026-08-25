import { createFileRoute, Link } from "@tanstack/solid-router";
import { Elsewhere, GenericSection } from "../sections";
import { WorkList, ThoughtList } from "../components";
import { portfolio } from "../data";
import type { JSX } from "solid-js/jsx-runtime";

export const Route = createFileRoute("/")({ component: Home });

function Home(): JSX.Element {
  return (
    <div class="w-full">
      <section id="hero" class="mb-14 max-sm:mb-12">
        <h1 class="text-2xl/tight font-semibold tracking-[-0.04em]">
          {portfolio.name}
          <span class="ml-1 text-faint">.</span>
        </h1>
        <p class="mt-3 text-base text-muted">
          {portfolio.description[0]}{" "}
          <mark class="rounded-sm bg-mark px-1.5 py-0.5 text-fg">
            {portfolio.description[1]}
          </mark>{" "}
          {portfolio.description[2]}
        </p>
      </section>
      <GenericSection title="Selected Work">
        <WorkList />
      </GenericSection>
      {/*<GenericSection
        title="Writing"
        description="essays, mostly"
        extra={
          <span>
            Read all at <LinkToThoughts />
          </span>
        }
      >
        <ThoughtList />
      </GenericSection>*/}
      <GenericSection title="Stack">
        <ul class="flex flex-wrap gap-2">
          {portfolio.stack.map((item) => (
            <li class="rounded-full border border-line px-2.5 py-1 text-xs text-muted">
              {item}
            </li>
          ))}
        </ul>
      </GenericSection>
      <Elsewhere />
    </div>
  );
}

function LinkToThoughts(): JSX.Element {
  return <Link to="/thoughts">/thoughts</Link>;
}
