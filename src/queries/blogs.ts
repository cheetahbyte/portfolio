export type BlogListItem = {
	meta: BlogMeta;
	slug: string;
};

export type BlogMeta = {
	id: string;
	title: string;
	description: string;
	date: string;
	tags: string[];
	image?: string;
};

type BlogListResponse = {
	items: BlogListItem[];
};

export async function getBlogs(): Promise<BlogListItem[]> {
	const res = await fetch("https://cms.leonhardbreuer.de/api/blogs");

	if (!res.ok) {
		throw new Error("Failed to load blogs");
	}

	const data = (await res.json()) as BlogListResponse;
	return data.items;
}

export const blogsQuery = {
	queryKey: ["blogs"],
	queryFn: getBlogs,
	staleTime: 1000 * 60 * 5,
};

export interface HomeResponse {
	name: string;
	stack: string[];
	elsewhere: {
		name: string;
		text: string;
		link?: string;
		parts?: string[];
	}[];
	description: [string, string, string];
}

export async function getHome(): Promise<HomeResponse> {
	const res = await fetch("https://cms.leonhardbreuer.de/api/home");

	if (!res.ok) {
		throw new Error("Failed to load home");
	}

	const data = await res.json();
	return data as HomeResponse;
}

export const homeQuery = {
	queryKey: ["home"],
	queryFn: getHome,
	staleTime: 1000 * 60 * 5,
};
