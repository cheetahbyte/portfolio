export function StackItem({ technology }: { technology: string }) {
  return (
    <li className="rounded-full border border-neutral-200 px-2.5 py-1 text-xs text-neutral-600 dark:border-neutral-700 dark:text-neutral-400">
      {technology}
    </li>
  );
}
