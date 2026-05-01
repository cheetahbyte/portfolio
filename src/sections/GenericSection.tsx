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

			{(footer || extra) && (
				<div className="mt-3 flex items-center justify-between gap-3 text-xs text-neutral-500">
					<div className="min-w-0">{extra}</div>

					{footer && (
						<button
							type="button"
							onClick={() => {
								console.log("GenericSection: footer clicked");
								onFooterClick?.();
							}}
							className="inline-flex shrink-0 cursor-pointer items-center hover:text-neutral-900"
						>
							{footer}
						</button>
					)}
				</div>
			)}
		</section>
	);
}
