import type { BlogMeta } from "./blogs";

export type BlogPostData = {
	body: string;
} & BlogMeta;

export const blogPostQuery = (postId: string) => ({
	queryKey: ["blogPost", postId],
	queryFn: async (): Promise<BlogPostData> => {
		const res = await fetch(
			`https://cms.leonhardbreuer.de/api/blogs/${postId}`,
		);
		if (!res.ok) throw new Error("Failed to load blog post");
		return (await res.json()) as BlogPostData;
	},
	staleTime: 1000 * 60 * 10, // 10 min
});
