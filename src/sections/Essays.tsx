import { Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import EssayItem, { type Essay } from "@/components/EssayItem";
import GenericSection from "./GenericSection";

interface EssaySectionProps {
	essays: Essay[];
}

export default function EssaySection({ essays = [] }: EssaySectionProps) {
	const [showAll, setShowAll] = useState(false);

	const sorted = useMemo(
		() => [...essays].sort((a, b) => b.date.getTime() - a.date.getTime()),
		[essays],
	);

	useEffect(() => console.log(showAll), [showAll]);

	const current = showAll ? sorted : sorted.slice(0, 3);

	return (
		<GenericSection
			title="Writing"
			description="essays, mostly short"
			footer={
				essays.length > 3
					? showAll
						? "show less −"
						: `${essays.length - 3} older essays +`
					: undefined
			}
			onFooterClick={() => {
				console.log("clicked");
				setShowAll((prev) => !prev);
			}}
			extra={
				<p className="text-xs text-neutral-500">
					Subscribe by{" "}
					<a
						href="/essays"
						className="underline underline-offset-4 decoration-[1px]"
					>
						RSS
					</a>
				</p>
			}
		>
			<ul className="divide-y divide-neutral-200">
				{current.map((essay, index) => (
					<EssayItem
						key={`${essay.title}-${essay.date.getTime()}-${index}`}
						{...essay}
					/>
				))}
			</ul>
		</GenericSection>
	);
}
