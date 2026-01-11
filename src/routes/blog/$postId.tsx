// routes/blog/$postId.tsx
import { createFileRoute } from "@tanstack/react-router";
import { transformMarkdown } from "@/lib/markdown.server";
import { blogPostQuery } from "@/queries/blogPost";
import BlogPost from "@/sections/BlogPost";

export const Route = createFileRoute("/blog/$postId")({
	loader: async ({ context, params }) => {
		const post = await context.queryClient.ensureQueryData(
			blogPostQuery(params.postId),
		);

		const html = await transformMarkdown({ data: { content: post.body } });

		return {
			html,
			seo: {
				title: post.title ?? params.postId,
				description: post.description,
				tags: post.tags ?? [],
				date: post.date ?? null,
				slug: params.postId,
				image: post.image ?? null,
			},
		};
	},

	head: ({ loaderData, params }) => {
		// Put this somewhere central later (const/env)
		const SITE_URL = "https://leonhardbreuer.de";

		const { seo } = loaderData;
		console.log(seo);

		// canonical should match what you actually serve
		const canonical = `${SITE_URL}/blog/${encodeURIComponent(seo.slug ?? params.postId)}`;

		// OG image: prefer post cover, fallback to some default
		const ogImage = seo.image ?? `${SITE_URL}/og/default.png`;

		const title = seo.title;
		const description = seo.description ?? "";

		return {
			title,
			links: [{ rel: "canonical", href: canonical }],
			meta: [
				{ name: "description", content: description },

				// Open Graph
				{ property: "og:type", content: "article" },
				{ property: "og:title", content: title },
				{ property: "og:description", content: description },
				{ property: "og:url", content: canonical },
				{ property: "og:image", content: ogImage },

				// Twitter
				{ name: "twitter:card", content: "summary_large_image" },
				{ name: "twitter:title", content: title },
				{ name: "twitter:description", content: description },
				{ name: "twitter:image", content: ogImage },

				// nice-to-have: keywords-ish (not super important, but harmless)
				...(seo.tags?.length
					? [{ name: "keywords", content: seo.tags.join(", ") }]
					: []),

				// optional: article tags (some platforms use it)
				...(seo.tags?.length
					? seo.tags.slice(0, 8).map((t: string) => ({
							property: "article:tag",
							content: t,
						}))
					: []),

				// optional: publish date for OG consumers
				...(seo.date
					? [{ property: "article:published_time", content: String(seo.date) }]
					: []),
			],
		};
	},

	component: BlogPost,
});
