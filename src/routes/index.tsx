import { createFileRoute } from "@tanstack/solid-router";
import { For } from "solid-js";
import { portfolio } from "../data";
import { InlineIcon } from "../icons";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <>
      <article class="letter" aria-label="About Leonhard Breuer">
        <p id="intro">
          <strong>{portfolio.name}.</strong> {portfolio.description.join(" ")}.
        </p>
        <p id="work">
          My work includes{" "}
          <For each={portfolio.works}>
            {(work, i) => (
              <>
                {i() === 0 ? "" : i() === portfolio.works.length - 1 ? ", and " : ", "}
                <a href={work.href} target="_blank" rel="noreferrer">{work.title}</a>
                {", "}{work.description}
              </>
            )}
          </For>.
        </p>
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
    </>
  );
}
