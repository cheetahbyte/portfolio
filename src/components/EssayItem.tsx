export type Essay = {
  title: string
  description: string
  date: Date
  readTime: number
}

export default function EssayItem({
  title,
  description,
  date,
  readTime,
}: Essay) {
  return (
    <li className="grid grid-cols-[1.2fr_1.6fr_auto_auto] gap-8 border-t border-neutral-200 py-3 text-sm last:border-b cursor-pointer hover:">
      <h3 className="font-medium leading-6 text-neutral-950">
        {title}
      </h3>

      <p className="leading-6 text-neutral-500">
        {description}
      </p>

      <span className="whitespace-nowrap leading-6 text-xs text-neutral-500">
        {readTime} min
      </span>

      <time className="whitespace-nowrap leading-6 text-xs tabular-nums text-neutral-400">
        {date.toLocaleDateString("en-US", {
          month: "short",
          year: "numeric",
        })}
      </time>
    </li>
  )
}