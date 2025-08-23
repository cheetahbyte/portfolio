import { MapPin } from "lucide-react";

export default function LocationCard() {
    return <section
		className={`rounded-2xl bg-[#171717] text-white/90 col-span-1 row-span-1 col-start-1 row-start-2 p-6`}
	>
        <MapPin size="40" className="mb-4"/>
        <h2 className="text-3xl mb-1">Bavaria</h2>
        <span className="text-gray-500">Germany</span>
	</section>
}