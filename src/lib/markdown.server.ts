import { createServerFn } from "@tanstack/react-start";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeCitation from "rehype-citation";
import rehypeExternalLinks from "rehype-external-links";
import rehypeHighlight from "rehype-highlight";
import rehypeKatex from "rehype-katex";
// Rehype Imports
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import remarkDirective from "remark-directive";
import remarkGemoji from "remark-gemoji";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
// Remark Imports
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import type { Plugin } from "unified";
import { unified } from "unified";
import { visit } from "unist-util-visit";

/**
 * Admonitions Plugin
 */
const remarkAdmonitions: Plugin = () => {
	return (tree: any) => {
		visit(tree, (node) => {
			if (
				node.type === "containerDirective" ||
				node.type === "leafDirective" ||
				node.type === "textDirective"
			) {
				const data = node.data || (node.data = {});
				const tagName = node.type === "textDirective" ? "span" : "div";
				data.hName = tagName;
				data.hProperties = {
					...(node.attributes || {}),
					className: ["admonition", node.name],
				};
			}
		});
	};
};

// Define the input type for our server function
type MarkdownInput = {
	content: string;
	biblio?: string;
};

export const transformMarkdown = createServerFn({ method: "POST" })
	.inputValidator((d: MarkdownInput) => d)
	.handler(async ({ data }) => {
		const { content, biblio } = data;

		const file = await unified()
			.use(remarkParse)
			.use(remarkGfm)
			.use(remarkMath)
			.use(remarkGemoji)
			.use(remarkDirective)
			.use(remarkAdmonitions)
			.use(remarkRehype)
			.use(rehypeSanitize, {
				...defaultSchema,
				attributes: {
					...defaultSchema.attributes,
					"*": ["className", "style"],
					code: ["className"],
					span: ["className"],
					h1: ["id"],
					h2: ["id"],
					h3: ["id"],
					h4: ["id"],
					h5: ["id"],
					h6: ["id"],
				},
			})
			.use(rehypeHighlight, { ignoreMissing: true })
			.use(rehypeKatex)
			.use(rehypeSlug)
			.use(rehypeAutolinkHeadings, {
				behavior: "append",
				properties: { className: ["anchor-link"] },
				content: { type: "text", value: "#" },
			})
			.use(rehypeExternalLinks, {
				target: "_blank",
				rel: ["nofollow", "noopener", "noreferrer"],
			})
			.use(rehypeCitation)
			.use(rehypeStringify)
			.process(content);

		return String(file);
	});
