import Link from "next/link";

const links = [
  { href: "/privacy-policy", name: "Privacy Policy" },
  { href: "/legal", name: "Legal" },
];

export function LegalLinks() {
  return (
    <ul className="flex flex-row justify-center gap-3">
      {links.map((link) => (
        <li
          key={link.href}
          className="flex flex-row flex-wrap items-baseline gap-4 text-sm"
        >
          <span className="text-neutral-500 dark:text-neutral-400">
            {link.name}
          </span>
          <Link
            href={link.href}
            className="group inline-flex w-fit items-baseline gap-1 text-sm text-neutral-950 dark:text-neutral-50"
          >
            <span className="underline decoration-[1px] underline-offset-4">
              {link.href}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
