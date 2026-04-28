export interface StackItemProps {
  technology: string
}

export default function StackItem({ technology }: StackItemProps) {
  return (
    <li className="rounded-full border border-neutral-200 px-2.5 py-1 text-xs text-neutral-600">
      {technology}
    </li>
  )
}