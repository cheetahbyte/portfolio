import GenericSection from "./GenericSection"
import WorkItem, { type Work } from "@/components/WorkItem"

export default function WorkSection({ works }: { works: Work[] }) {
  return (
    <GenericSection title="Selected Work">
      <ul className="divide-y divide-neutral-200">
        {works.map((w) => (
          <WorkItem key={w.title} {...w} />
        ))}
      </ul>
    </GenericSection>
  )
}