import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";

import { renderMarkdown } from "@/lib/markdown";
import { blogPostQuery } from "@/queries/blogPost";

import "highlight.js/styles/github-dark.css";

const SITE_URL = "https://leob.re";

export const Route = createFileRoute("/essays/$essayKey")({
	loader: async ({ context, params }) => {
		const post = await context.queryClient.ensureQueryData(
			blogPostQuery(params.essayKey),
		);

		const html = renderMarkdown(post.body);

		return {
			html,
			seo: {
				title: post.title ?? params.essayKey,
				description: post.description,
				tags: post.tags ?? [],
				date: post.date ?? null,
				slug: params.essayKey,
				image: post.image ?? null,
			},
		};
	},

	head: ({ loaderData, params }) => {
		const { seo } = loaderData;

		const canonical = `${SITE_URL}/essays/${encodeURIComponent(seo.slug ?? params.essayKey)}`;
		const ogImage = seo.image ?? `${SITE_URL}/og/default.png`;
		const title = seo.title;
		const description = seo.description ?? "";

		return {
			title,
			links: [{ rel: "canonical", href: canonical }],
			meta: [
				{ name: "description", content: description },
				{ property: "og:type", content: "article" },
				{ property: "og:title", content: title },
				{ property: "og:description", content: description },
				{ property: "og:url", content: canonical },
				{ property: "og:image", content: ogImage },
				{ name: "twitter:card", content: "summary_large_image" },
				{ name: "twitter:title", content: title },
				{ name: "twitter:description", content: description },
				{ name: "twitter:image", content: ogImage },
				...(seo.tags?.length
					? [{ name: "keywords", content: seo.tags.join(", ") }]
					: []),
				...(seo.tags?.length
					? seo.tags
							.slice(0, 8)
							.map((t: string) => ({ property: "article:tag", content: t }))
					: []),
				...(seo.date
					? [{ property: "article:published_time", content: String(seo.date) }]
					: []),
			],
		};
	},

	component: EssayPost,
});

function EssayPost() {
	const { essayKey } = Route.useParams();
	const { html } = Route.useLoaderData();
	const { data: post } = useQuery(blogPostQuery(essayKey));

	if (!post) return null;

	return (
		<div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
			<article>
				<header className="mb-8">
					<h1 className="text-3xl font-semibold tracking-tight text-neutral-900">
						{post.title}
						<span className="ml-1 text-neutral-400">.</span>
					</h1>
					<div className="flex items-center gap-2 font-display text-xs font-medium uppercase tracking-[0.16em] text-neutral-400 m-1">
						<time>{post.date}</time>
						{post.tags?.[0] && (
							<>
								<span>—</span>
								<span>{post.tags[0]}</span>
							</>
						)}
					</div>
					<Link
						to="/"
						className="inline-flex items-center gap-1 text-xs text-neutral-400 hover:text-neutral-900 transition-colors"
					>
						<ChevronLeft size={12} /> Back
					</Link>
				</header>

				<div
					className="prose prose-neutral max-w-none text-sm text-neutral-600 dark:text-neutral-400 prose-headings:font-display prose-headings:font-semibold prose-headings:text-neutral-900 dark:prose-headings:text-neutral-100 prose-a:text-neutral-900 dark:prose-a:text-neutral-100 prose-a:underline-offset-2"
					dangerouslySetInnerHTML={{ __html: html }}
				/>
				<p className="text-neutral-400 mt-5 mb-5"></p>
			</article>
		</div>
	);
}
