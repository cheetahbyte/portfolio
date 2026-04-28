export type Work = {
  title: string
  description: string
  date: Date
}

export default function WorkItem({ title, description, date }: Work) {
  return (
    <li className="grid grid-cols-[1.1fr_2fr_auto] gap-8 border-t border-neutral-200 py-3 text-sm last:border-b cursor-pointer">
      <h3 className="font-medium leading-6 text-neutral-950">
        {title}
      </h3>

      <p className="leading-6 text-neutral-500">
        {description}
      </p>

      <time className="whitespace-nowrap leading-6 text-xs tabular-nums text-neutral-400">
        {date.getFullYear()}
      </time>
    </li>
  )
}