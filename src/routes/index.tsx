import { createFileRoute, Link } from "@tanstack/solid-router";
import { For, Show } from "solid-js";
import { formatDate, MarginNote, Signature } from "../components";
import { portfolio, thoughts } from "../data";
import { InlineIcon } from "../icons";

export const Route = createFileRoute("/")({ component: Home });

const latestThoughts = thoughts.slice(0, 3);

function Home() {
  return (
    <>
      <article class="letter" aria-label="About Leonhard Breuer">
        <p id="intro">
          <strong class="icon-label"><InlineIcon name="Wave" />{portfolio.name}.</strong> {portfolio.description.join(" ")}.
        </p>
        <p id="work">
          My side projects are{" "}
          <For each={portfolio.works}>
            {(work, i) => (
              <>
                {i() === 0 ? "" : i() === portfolio.works.length - 1 ? ", and " : ", "}
                <a href={work.href} target="_blank" rel="noreferrer"><MarginNote text={`${new URL(work.href).host}${new URL(work.href).pathname.replace(/\/$/, "")} · ${work.year}`} />{work.title}</a>
                {", "}{work.description}
              </>
            )}
          </For>.
        </p>
        <Show when={latestThoughts.length > 0}>
          <p id="thoughts">
            Lately I wrote{" "}
            <For each={latestThoughts}>
              {(thought, i) => (
                <>
                  {i() === 0 ? "" : i() < latestThoughts.length - 1 ? ", " : latestThoughts.length === 2 ? " and " : ", and "}
                  <Link to="/thoughts/$thoughtId" params={{ thoughtId: thought.id }}><MarginNote text={`${formatDate(thought.date)} · ${thought.readTime} min read`} />{thought.title}</Link>
                </>
              )}
            </For>
            . More in <Link to="/thoughts">thoughts</Link>.
          </p>
        </Show>
        <p id="stack">
          I build with{" "}
          <For each={portfolio.stack}>
            {(item, i) => (
              <>
                {i() === 0 ? "" : i() === portfolio.stack.length - 1 ? ", and " : ", "}
                <a class="icon-label" href={item.href} target="_blank" rel="noreferrer"><InlineIcon name={item.label} />{item.label}</a>
              </>
            )}
          </For>.
        </p>
        <p id="elsewhere">
          You can find me on{" "}
          <For each={portfolio.elsewhere.filter((link) => link.label !== "Email")}>
            {(link, i) => (
              <>
                {i() === 0 ? "" : i() === portfolio.elsewhere.length - 2 ? ", or " : ", "}
                <a class="icon-label" href={link.href} target="_blank" rel="noreferrer"><InlineIcon name={link.label} />{link.label}</a>
              </>
            )}
          </For>.
          <br />Or <a class="icon-label" href={portfolio.elsewhere[0].href}><InlineIcon name="Email" />write a mail</a>.
        </p>
      </article>
      <Signature />
    </>
  );
}
