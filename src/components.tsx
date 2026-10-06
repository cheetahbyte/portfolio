import { For, Show, onCleanup, onMount, type JSX } from "solid-js";
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
export function formatDate(date: string) {
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

// Text comes from a data attribute via CSS so it stays out of the link's text and accessible name.
export function MarginNote(props: { text: string }) {
  let host!: HTMLSpanElement;
  onMount(() => {
    const link = host.closest("a")!;
    const column = link.closest(".page-column")!;
    const pointer = matchMedia("(hover: hover) and (pointer: fine)");
    let hovering = false;
    const update = () => {
      const active = (hovering && pointer.matches) || link.matches(":focus-visible");
      if (!active) {
        delete host.dataset.placed;
        window.removeEventListener("resize", update);
        window.removeEventListener("scroll", update, true);
        return;
      }
      const line = link.getClientRects()[0];
      const bounds = column.getBoundingClientRect();
      const width = host.offsetWidth;
      const viewport = document.documentElement.clientWidth;
      const left = bounds.right + 40 + width <= viewport - 16 ? bounds.right + 40 : bounds.left - 40 - width >= 16 ? bounds.left - 40 - width : null;
      if (left === null || !line) {
        delete host.dataset.placed;
        return;
      }
      host.style.left = `${left}px`;
      host.style.top = `${line.top + (line.height - host.offsetHeight) / 2}px`;
      host.dataset.placed = "true";
      window.addEventListener("resize", update);
      window.addEventListener("scroll", update, true);
    };
    const enter = () => { hovering = true; update(); };
    const leave = () => { hovering = false; update(); };
    link.addEventListener("mouseenter", enter);
    link.addEventListener("mouseleave", leave);
    link.addEventListener("focus", update);
    link.addEventListener("blur", update);
    onCleanup(() => {
      window.removeEventListener("resize", update);
      window.removeEventListener("scroll", update, true);
      link.removeEventListener("mouseenter", enter);
      link.removeEventListener("mouseleave", leave);
      link.removeEventListener("focus", update);
      link.removeEventListener("blur", update);
    });
  });
  return <span ref={host} class="margin-note" data-note={props.text} aria-hidden="true" />;
}

export function Signature() {
  return (
    <svg class="signature" viewBox="0 0 96 32" fill="none" aria-hidden="true">
      <path
        pathLength="1"
        d="M4 24c6-14 10-20 13-18s-3 18 1 18 7-14 11-14-1 12 3 12 6-9 9-9-2 8 2 8 5-6 8-6 0 5 4 5c6 0 14-7 22-9 6-1.5 9 0 9 2"
      />
    </svg>
  );
}

export function SiteShell(props: { children: JSX.Element }) {
  return (
    <div class="site-shell">
      <a class="skip-link" href="#main">Skip to content</a>
      <main id="main" class="page-column" tabIndex={-1}>
        {props.children}
      </main>
      <footer id="footer" class="page-column site-footer">
        <Link to="/">Leonhard Breuer</Link>
        <nav aria-label="Site">
          <Link to="/thoughts">Thoughts</Link>
          <Link to="/legal">Legal</Link>
        </nav>
      </footer>
    </div>
  );
}
