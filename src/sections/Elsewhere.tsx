import GenericSection from "./GenericSection"

export type ElsewhereLink = {
  label: string
  value: string
  href?: string
    onClick?: React.MouseEventHandler<HTMLAnchorElement>

}

export default function ElsewhereSection({
  links,
}: {
  links: ElsewhereLink[]
}) {
  return (
    <GenericSection title="Elsewhere">
      <ul className="space-y-1">
        {links.map((link) => (
          <li
            key={link.label}
            className="grid grid-cols-[90px_1fr] items-baseline gap-4 text-sm"
          >
            <span className="text-neutral-500 dark:text-neutral-400">{link.label}</span>

            <a
            href={link.href ?? "#"}
            onClick={link.onClick}
            target={link.href?.startsWith("http") ? "_blank" : undefined}
            rel={link.href?.startsWith("http") ? "noreferrer" : undefined}
            className="group inline-flex w-fit items-baseline gap-1 text-sm text-neutral-950 dark:text-neutral-50"
            >
            <span className="underline underline-offset-4 decoration-[1px]">
                {link.value}
            </span>

            {link.href?.startsWith("http") && (
                <span className="text-xs text-neutral-400 dark:text-neutral-500 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                ↗
                </span>
            )}
            </a>
          </li>
        ))}
      </ul>
    </GenericSection>
  )
}