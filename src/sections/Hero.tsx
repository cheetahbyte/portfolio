import { useId } from "react";

interface HeroProps {
	name: string;
	description: [string, string, string];
}

export default function Hero({ name, description }: HeroProps) {
	const id = useId();
	return (
		<section id={id}>
			<h1 className="text-3xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
				{name}
				<span className="ml-1 text-neutral-400 dark:text-neutral-500">.</span>
			</h1>

			<p className="mt-3 text-base text-neutral-500 dark:text-neutral-400">
				{description[0]}{" "}
				<span className="rounded bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 text-neutral-700 dark:text-neutral-300">
					{description[1]}
				</span>{" "}
				{description[2]}
			</p>
		</section>
	);
}
