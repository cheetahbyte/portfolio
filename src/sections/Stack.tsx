import GenericSection from "./GenericSection"
import StackItem from "@/components/StackItem"

export default function StackSection({ stack }: { stack: string[] }) {
  return (
    <GenericSection title="Stack">
      <ul className="flex flex-wrap gap-2">
        {stack.map((s) => (
          <StackItem key={s} technology={s} />
        ))}
      </ul>
    </GenericSection>
  )
}