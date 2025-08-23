import { Cake } from "lucide-react"

export default function AgeCard() {
    const date = new Date("06-02-2005")
    const current = new Date()

    return <section
		className={`rounded-2xl bg-[#171717] text-white/90 md:col-start-3 md:row-start-2 col-span-1 p-6`}
	>
        <Cake size="40" className="mb-4"/>
        <h2 className="text-3xl mb-1">{current.getFullYear() - date.getFullYear()}</h2>
        <span className="text-gray-500">years old</span>
	</section>
}