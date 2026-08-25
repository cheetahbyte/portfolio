import { For } from "solid-js";
import { GenericSection as Section } from "./components";
import { portfolio } from "./data";
export const GenericSection = Section;
export function Elsewhere() {
  return (
    <Section title="Elsewhere">
      <ul class="grid gap-1 text-sm">
        <For each={portfolio.elsewhere}>
          {(link) => (
            <li class="grid grid-cols-[90px_1fr] items-baseline gap-4">
              <span class="text-muted">{link.label}</span>
              <a
                class="inline-flex w-fit gap-1.5 underline decoration-1 underline-offset-4"
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
              >
                {link.value}
                <b class="font-normal text-faint no-underline">↗</b>
              </a>
            </li>
          )}
        </For>
      </ul>
    </Section>
  );
}
