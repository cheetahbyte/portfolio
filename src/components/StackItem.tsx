export interface StackItemProps {
  technology: string
}

export default function StackItem({ technology }: StackItemProps) {
  return (
    <li className="rounded-full border border-neutral-200 dark:border-neutral-700 px-2.5 py-1 text-xs text-neutral-600 dark:text-neutral-400">
      {technology}
    </li>
  )
}
