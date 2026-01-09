import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { useStore } from "@tanstack/react-store";
import * as React from "react";
import HeaderBar from "@/components/HeaderBar";
import { appStore } from "@/lib/store";
import { blogsQuery } from "@/queries/blogs";

export default function Blog() {
	const focusMode = useStore(appStore, (s) => s.focusMode);
	const { data: blogs = [], isLoading, isError } = useQuery(blogsQuery);
	const [searchQuery, setSearchQuery] = React.useState("");

	const filteredBlogs = React.useMemo(() => {
		const q = searchQuery.trim().toLowerCase();
		if (!q) return blogs;
		return blogs.filter((b) => b.meta.title.toLowerCase().includes(q));
	}, [blogs, searchQuery]);

	const containerClass = focusMode ? "max-w-2xl mx-auto" : "";

	if (isLoading || isError) {
		return (
			<div
				className={`animate-in fade-in slide-in-from-bottom-4 duration-700 ${containerClass}`}
			>
				<h2
					className={`font-mono text-sm border-b pb-2 uppercase tracking-tighter ${focusMode ? "border-white/10" : "border-black/10"}`}
				>
					Technical Logs
				</h2>
				<div className="mt-6 font-mono text-xs opacity-60">
					{isLoading ? "Loading…" : "Failed to load blogs."}
				</div>
			</div>
		);
	}

	return (
		<div
			className={`animate-in fade-in slide-in-from-bottom-4 duration-700 ${containerClass}`}
		>
			<HeaderBar
				title="Technical Logs"
				searchQuery={searchQuery}
				setSearchQuery={setSearchQuery}
			/>

			{/* Blog List */}
			<div className="space-y-12">
				{filteredBlogs.length === 0 ? (
					<div className="font-mono text-xs opacity-60">
						No entries found matching your search.
					</div>
				) : (
					filteredBlogs.map((post, postIdx) => (
						<Link
							preload="intent"
							key={`${post.meta.id ?? postIdx}`}
							to="/blog/$postId"
							params={{ postId: post.meta.id }}
							className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-8 group cursor-pointer"
						>
							{/* Date Column */}
							<span className="font-mono text-xs text-gray-400 shrink-0 tabular-nums">
								{post.meta.date}
							</span>

							{/* Content Column */}
							<div className="flex-1">
								<h3
									className={`text-lg font-semibold transition-colors ${
										focusMode
											? "text-white/80 group-hover:text-white"
											: "group-hover:text-[#0E4D47]"
									}`}
								>
									{post.meta.title}
								</h3>
								{/* Tags */}
								<div className="flex gap-2 mt-2">
									{(post.meta.tags ?? []).map((t, tagIdx) => (
										<span
											key={tagIdx + t}
											className={`text-[10px] uppercase font-mono px-2 py-0.5 rounded transition-colors ${
												focusMode
													? "bg-white/10 text-white/60 group-hover:bg-white/20"
													: "bg-[#0E4D47]/5 text-[#0E4D47] group-hover:bg-[#0E4D47]/10"
											}`}
										>
											{t}
										</span>
									))}
								</div>
							</div>
						</Link>
					))
				)}
			</div>
		</div>
	);
}
