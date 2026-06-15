import Link from "next/link";

export type ThoughtItemProps = {
  title: string;
  description?: string;
  date: string;
  readTime?: number;
  href: string;
};

export function ThoughtItem({
  title,
  description,
  date,
  readTime = 1,
  href,
}: ThoughtItemProps) {
  const formattedDate = date
    ? new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      })
    : "Draft";

  return (
    <li className="border-t border-neutral-200 last:border-b dark:border-neutral-700">
      <Link
        href={href}
        className="grid cursor-pointer grid-cols-[1fr_auto] gap-4 px-3 py-2 text-sm transition hover:bg-neutral-200 dark:hover:bg-neutral-800 sm:grid-cols-[1.2fr_1.6fr_auto_auto] sm:gap-8 sm:py-3"
      >
        <h3 className="font-medium leading-6 text-neutral-950 dark:text-neutral-50">
          {title}
        </h3>
        <p className="hidden leading-6 text-neutral-500 dark:text-neutral-400 sm:block">
          {description ?? "short note"}
        </p>
        <span className="hidden whitespace-nowrap text-xs leading-6 text-neutral-500 dark:text-neutral-400 sm:block">
          {readTime} min
        </span>
        <time className="self-center whitespace-nowrap text-xs leading-6 tabular-nums text-neutral-400 dark:text-neutral-500">
          {formattedDate}
        </time>
      </Link>
    </li>
  );
}
