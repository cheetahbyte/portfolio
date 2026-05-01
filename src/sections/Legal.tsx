interface LegalItem {
	link: string;
	name: string;
}

export default function LegalSection({ stack }: { stack: LegalItem[] }) {
	return (
		<ul className="space-y-1 mt-auto flex flex-row gap-3 mb-10 mx-auto">
			{stack.map((s, i) => (
				<li
					key={`${s.name}-${i}`}
					className="items-baseline gap-4 text-sm flex flex-row flex-wrap"
				>
					<span className="text-neutral-500 dark:text-neutral-400">{s.name}</span>

					<a
						href={s.link}
						target={""}
						rel={"noreferrer"}
						className="group inline-flex w-fit items-baseline gap-1 text-sm text-neutral-950 dark:text-neutral-50"
					>
						<span className="underline underline-offset-4 decoration-[1px]">
							{s.link}
						</span>
					</a>
				</li>
			))}
		</ul>
	);
}
