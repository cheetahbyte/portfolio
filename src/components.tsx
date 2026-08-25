import { For, Show, type JSX } from "solid-js";
import { Link } from "@tanstack/solid-router";
import { portfolio, thoughts } from "./data";

export function GenericSection(props: {
  title: string;
  description?: string;
  extra?: JSX.Element;
  children: JSX.Element;
}) {
  return (
    <section id={props.title.toLowerCase().replaceAll(" ", "-")} class="mb-10">
      <div class="mb-3 flex items-baseline gap-2">
        <h2 class="text-[0.6875rem] font-semibold uppercase leading-none tracking-[0.16em] text-muted">
          {props.title}
        </h2>
        <Show when={props.description}>
          <span class="text-xs text-faint">— {props.description}</span>
        </Show>
      </div>
      {props.children}
      <Show when={props.extra}>
        <div class="text-xs text-faint">{props.extra}</div>
      </Show>
    </section>
  );
}

export function WorkList() {
  return (
    <ul class="text-[0.9375rem] leading-[1.8]">
      <For each={portfolio.works}>
        {(work) => (
          <li>
            <a href={work.href} target="_blank" rel="noreferrer">
              <strong class="font-semibold">{work.title}</strong> -{" "}
              <span class="text-muted">{work.description}</span>
            </a>
          </li>
        )}
      </For>
    </ul>
  );
}

export function ThoughtList(props: { all?: boolean }) {
  return (
    <ul class={props.all ? "" : "text-[0.9375rem] leading-[1.8]"}>
      <For each={props.all ? thoughts : portfolioThoughts}>
        {(thought) => (
          <li class={props.all ? "border-t border-line last:border-b" : ""}>
            <Link
              class={props.all ? "grid grid-cols-[1.2fr_1.6fr_auto_auto] items-baseline gap-8 px-3 py-2.5 text-sm no-underline transition-colors duration-150 hover:bg-hover max-sm:grid-cols-[1fr_auto] max-sm:gap-3" : ""}
              to="/thoughts/$thoughtId"
              params={{ thoughtId: thought.id }}
            >
              <strong class="font-semibold">{thought.title}</strong>
              <span class="text-muted"><Show when={!props.all}> — </Show>{thought.description}</span>
              <Show when={props.all}>
                <span class="whitespace-nowrap text-xs text-faint tabular-nums max-sm:hidden">{thought.readTime} min</span>
                <time class="whitespace-nowrap text-xs text-faint tabular-nums">{formatDate(thought.date)}</time>
              </Show>
            </Link>
          </li>
        )}
      </For>
    </ul>
  );
}

const portfolioThoughts = thoughts.slice(0, 3);
function formatDate(date: string) {
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

export function SiteShell(props: { children: JSX.Element }) {
  return (
    <div class="relative flex min-h-screen flex-col">
      <ThemeToggle />
      <main class="mx-auto w-full max-w-3xl flex-1 px-8 pt-20 max-sm:px-5 max-sm:pt-8">
        {props.children}
      </main>
      <footer class="mx-auto w-full max-w-5xl px-8 pt-24 pb-10 max-sm:px-5 max-sm:pt-16 max-sm:pb-8">
        <ul class="flex justify-center gap-4 text-sm text-muted">
          <li>
            Privacy Policy{" "}
            <Link
              class="text-fg underline underline-offset-4"
              to="/privacy-policy"
            >
              /privacy-policy
            </Link>
          </li>
          <li>
            Legal{" "}
            <Link class="text-fg underline underline-offset-4" to="/legal">
              /legal
            </Link>
          </li>
        </ul>
      </footer>
    </div>
  );
}

function ThemeToggle() {
  const toggle = () => {
    const dark = document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", dark ? "dark" : "light");
  };
  return (
    <button
      class="fixed top-3 right-4 z-10 cursor-pointer border-0 bg-transparent text-xl text-muted"
      onClick={toggle}
      aria-label="Toggle color theme"
    >
      ◐
    </button>
  );
}
