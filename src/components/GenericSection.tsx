import type { ReactNode } from "react";

type GenericSectionProps = {
  title: string;
  description?: string;
  footer?: ReactNode;
  extra?: ReactNode;
  children?: ReactNode;
};

export function GenericSection({
  title,
  description,
  footer,
  extra,
  children,
}: GenericSectionProps) {
  return (
    <section id={title.toLowerCase().replaceAll(" ", "-")}>
      <div className="mb-3 flex items-baseline gap-2">
        <h2 className="font-display text-xs font-medium uppercase tracking-[0.16em] text-neutral-500 dark:text-neutral-400">
          {title}
        </h2>

        {description ? (
          <p className="text-xs text-neutral-400 dark:text-neutral-500">
            - {description}
          </p>
        ) : null}
      </div>

      {children}

      {footer || extra ? (
        <div className="mt-3 flex items-center justify-between gap-3 text-xs text-neutral-500 dark:text-neutral-400">
          <div className="min-w-0">{extra}</div>
          <div className="shrink-0">{footer}</div>
        </div>
      ) : null}
    </section>
  );
}
