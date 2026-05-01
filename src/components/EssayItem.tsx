import { Link } from "@tanstack/react-router";

export type Essay = {
	title: string;
	description: string;
	date: Date;
	readTime: number;
	href?: string;
};

export default function EssayItem({
	title,
	description,
	date,
	readTime,
	href,
}: Essay) {
	const className =
		"grid grid-cols-[1fr_auto] sm:grid-cols-[1.2fr_1.6fr_auto_auto] gap-4 sm:gap-8 py-2 sm:py-3 px-3 text-sm hover:bg-neutral-200 dark:hover:bg-neutral-800 transition";

	const content = (
		<>
			<h3 className="font-medium leading-6 text-neutral-950 dark:text-neutral-50">{title}</h3>
			<p className="hidden sm:block leading-6 text-neutral-500 dark:text-neutral-400">{description}</p>
			<span className="hidden sm:block whitespace-nowrap leading-6 text-xs text-neutral-500 dark:text-neutral-400">
				{readTime} min
			</span>
			<time className="whitespace-nowrap leading-6 text-xs tabular-nums text-neutral-400 dark:text-neutral-500 self-center">
				{date.toLocaleDateString("en-US", { month: "short", year: "numeric" })}
			</time>
		</>
	);

	return (
		<li className="border-t border-neutral-200 dark:border-neutral-700 last:border-b">
			{href ? (
				<Link to={href} className={`${className} cursor-pointer`}>
					{content}
				</Link>
			) : (
				<div className={className}>{content}</div>
			)}
		</li>
	);
}
