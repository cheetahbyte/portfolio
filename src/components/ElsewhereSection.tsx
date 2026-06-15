import { GenericSection } from "@/components/GenericSection";

export type ElsewhereLink = {
  label: string;
  value: string;
  href: string;
};

export function ElsewhereSection({ links }: { links: ElsewhereLink[] }) {
  return (
    <GenericSection title="Elsewhere">
      <ul className="space-y-1">
        {links.map((link) => {
          const external = link.href.startsWith("http");

          return (
            <li
              key={link.label}
              className="grid grid-cols-[90px_1fr] items-baseline gap-4 text-sm"
            >
              <span className="text-neutral-500 dark:text-neutral-400">
                {link.label}
              </span>

              <a
                href={link.href}
                target={external ? "_blank" : undefined}
                rel={external ? "noreferrer" : undefined}
                className="group inline-flex w-fit items-baseline gap-1 text-sm text-neutral-950 dark:text-neutral-50"
              >
                <span className="underline decoration-[1px] underline-offset-4">
                  {link.value}
                </span>

                {external ? (
                  <span className="text-xs text-neutral-400 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 dark:text-neutral-500">
                    ↗
                  </span>
                ) : null}
              </a>
            </li>
          );
        })}
      </ul>
    </GenericSection>
  );
}
