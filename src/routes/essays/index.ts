import { createFileRoute } from "@tanstack/react-router";
import { blogsQuery, getBlogs } from "@/queries/blogs";

function escapeXml(value: string) {
	return value
		.replaceAll("&", "&amp;")
		.replaceAll("<", "&lt;")
		.replaceAll(">", "&gt;")
		.replaceAll('"', "&quot;")
		.replaceAll("'", "&apos;");
}

async function getRSS(): Promise<Response> {
	const essays = await getBlogs();

	const items = essays
		.map((essay) => {
			const url = `https://leob.re/essays/${essay.meta.id}`;

			return `
				<item>
					<title>${escapeXml(essay.meta.title)}</title>
					<link>${url}</link>
					<description>${escapeXml(essay.meta.description)}</description>
					<pubDate>${new Date(essay.meta.date).toUTCString()}</pubDate>
					<guid isPermaLink="true">${url}</guid>
				</item>`;
		})
		.join("");

	const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
	<channel>
		<title>Leonhard Breuer's Essays</title>
		<link>https://leob.re</link>
		<description>Latest essays by Leonhard Breuer</description>
		${items}
	</channel>
</rss>`;

	return new Response(rss.trim(), {
		headers: {
			"Content-Type": "application/rss+xml; charset=utf-8",
			"Cache-Control": "public, max-age=3600",
		},
	});
}

export const Route = createFileRoute("/essays/")({
	server: {
		handlers: {
			GET: getRSS,
		},
	},
});
