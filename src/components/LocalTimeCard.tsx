"use client"
import { Clock } from "lucide-react";
import { useEffect, useState } from "react";

export default function LocalTimeCard() {
	const [time, setTime] = useState(new Date());
	useEffect(() => {
		// Update every second
		const interval = setInterval(() => {
			setTime(new Date());
		}, 1000);

		// Cleanup
		return () => clearInterval(interval);
	}, []);

	return (
		<section
			className={`rounded-2xl bg-[#171717] text-white/90 col-span-1 row-span-1 p-6`}
		>
			<Clock size="40" className="mb-4" />
			<h2 className="text-3xl mb-1">{time.toLocaleTimeString()}</h2>
			<span className="text-gray-500">UTC+2</span>
		</section>
	);
}
