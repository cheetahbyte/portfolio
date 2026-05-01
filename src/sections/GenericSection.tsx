import type { ReactNode } from "react";

interface GenericSectionProps {
	title: string;
	description?: string;
	footer?: ReactNode;
	children?: ReactNode;
	onFooterClick?: () => void;
	extra?: ReactNode;
}

export default function GenericSection({
	title,
	description,
	footer,
	children,
	onFooterClick,
	extra,
}: GenericSectionProps) {
	return (
		<section id={title.toLowerCase().replaceAll(" ", "-")}>
			<div className="mb-3 flex items-baseline gap-2">
				<h2 className="font-display text-xs font-medium uppercase tracking-[0.16em] text-neutral-500">
					{title}
				</h2>

				{description && (
					<p className="text-xs text-neutral-400">— {description}</p>
				)}
			</div>

			{children}

			{footer && (
				<div className="mt-3 flex items-center gap-3 text-xs text-neutral-500">
					{/*<div className="h-px flex-1 bg-neutral-200" />*/}

					<button
						type="button"
						onClick={(e) => {
							e.stopPropagation();
							if (onFooterClick) onFooterClick();
						}}
						className="relative z-10 isolate transition hover:text-neutral-900 cursor-pointer ml-auto"
					>
						{footer}
					</button>
				</div>
			)}
			{extra && <>{extra}</>}
		</section>
	);
}
