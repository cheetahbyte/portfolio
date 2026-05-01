export type Work = {
	title: string;
	description: string;
	date: Date;
	href: string;
};

export default function WorkItem({ title, description, date, href }: Work) {
	return (
		<li className="border-t border-neutral-200 last:border-b">
			<a
				href={href}
				target="_blank"
				rel="noopener noreferrer"
				className="grid grid-cols-[1.1fr_2fr_auto] gap-8 text-sm cursor-pointer hover:bg-neutral-200 transition py-3 px-3"
			>
				<h3 className="font-medium leading-6 text-neutral-950">{title}</h3>

				<p className="leading-6 text-neutral-500">{description}</p>

				<time className="whitespace-nowrap leading-6 text-xs tabular-nums text-neutral-400">
					{date.getFullYear()}
				</time>
			</a>
		</li>
	);
}
