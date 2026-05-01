import hljs from "highlight.js";
import { Marked } from "marked";
import { gfmHeadingId } from "marked-gfm-heading-id";
import { markedHighlight } from "marked-highlight";

const marked = new Marked(
	markedHighlight({
		emptyLangClass: "hljs",
		langPrefix: "hljs language-",
		highlight(code, lang) {
			const language = hljs.getLanguage(lang) ? lang : "plaintext";
			return hljs.highlight(code, { language }).value;
		},
	}),
	gfmHeadingId(),
	{
		renderer: {
			link({ href, title, text }) {
				const isExternal =
					href?.startsWith("http://") || href?.startsWith("https://");
				const attrs = isExternal
					? ` target="_blank" rel="nofollow noopener noreferrer"`
					: "";
				const titleAttr = title ? ` title="${title}"` : "";
				return `<a href="${href}"${titleAttr}${attrs}>${text}</a>`;
			},
		},
	},
);

export function renderMarkdown(content: string): string {
	return marked.parse(content) as string;
}
