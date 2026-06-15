export type Work = {
  title: string;
  description: string;
  href: string;
  year: string;
};

export function WorkItem({ title, description, href, year }: Work) {
  return (
    <li className="border-t border-neutral-200 last:border-b dark:border-neutral-700">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="grid cursor-pointer grid-cols-[1fr_auto] gap-4 px-3 py-2 text-sm transition hover:bg-neutral-200 dark:hover:bg-neutral-800 sm:grid-cols-[1.1fr_2fr_auto] sm:gap-8 sm:py-3"
      >
        <h3 className="font-medium leading-6 text-neutral-950 dark:text-neutral-50">
          {title}
        </h3>
        <p className="hidden leading-6 text-neutral-500 dark:text-neutral-400 sm:block">
          {description}
        </p>
        <time className="self-center whitespace-nowrap text-xs leading-6 tabular-nums text-neutral-400 dark:text-neutral-500">
          {year}
        </time>
      </a>
    </li>
  );
}
