// routes/blog/$postId.tsx
import { createFileRoute } from "@tanstack/react-router";
import { transformMarkdown } from "@/lib/markdown.server";
import { blogPostQuery } from "@/queries/blogPost";
import BlogPost from "@/sections/BlogPost";

export const Route = createFileRoute("/blog/$postId")({
	loader: async ({ context, params }) => {
		// 1. Fetch raw data (cached by QueryClient)
		const post = await context.queryClient.ensureQueryData(
			blogPostQuery(params.postId),
		);

		// 2. Process Markdown to HTML on the server
		const html = await transformMarkdown({ data: { content: post.body } });
		// 3. Return the HTML to the component
		return { html };
	},
	component: BlogPost,
});
