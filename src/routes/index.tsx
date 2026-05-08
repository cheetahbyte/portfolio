import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { queryClient } from "@/lib/queryClient";
import { blogsQuery, homeQuery } from "@/queries/blogs";
import { projectsQuery } from "@/queries/projects";
import ElsewhereSection from "@/sections/Elsewhere";
import EssaySection from "@/sections/Essays";
import Hero from "@/sections/Hero";
import LegalSection from "@/sections/Legal";
import StackSection from "@/sections/Stack";
import WorkSection from "@/sections/Work";
export type HomeApiResponse = {
	name: { first: string; last: string };
	keyfacts: Array<string | number>;
	rotation: string[];
	technical: { languages: string[]; frameworks: string[]; tools: string[] };
	phrase: string;
};

export const Route = createFileRoute("/")({
	// Add the head property here
	head: () => {
		const title = `Leonhard Breuer | Portfolio`;
		const description = "just a simple portfolio";
		const siteUrl = "https://www.leonhardbreuer.de"; // Update to your actual URL
		//const ogImage = `/opengraph.png`; // Path to your preview image

		return {
			meta: [
				{ title },
				{ name: "description", content: description },
				// Open Graph / Facebook
				{ property: "og:type", content: "website" },
				{ property: "og:url", content: siteUrl },
				{ property: "og:title", content: title },
				{ property: "og:description", content: description },
				//{ property: "og:image", content: ogImage },
				// Twitter
				{ name: "twitter:card", content: "summary_large_image" },
				{ name: "twitter:url", content: siteUrl },
				{ name: "twitter:title", content: title },
				{ name: "twitter:description", content: description },
				//{ name: "twitter:image", content: ogImage },
			],
		};
	},
	component: IndexPage,
	loader: async () => {
		const home = await queryClient.ensureQueryData(homeQuery);
		const essays = await queryClient.ensureQueryData(blogsQuery);
		const projects = await queryClient.ensureQueryData(projectsQuery);
		return { essays, projects, home };
	},
});

function IndexPage() {
	const { data: essays } = useSuspenseQuery(blogsQuery);
	const { data: projects } = useSuspenseQuery(projectsQuery);
	const { data: home } = useSuspenseQuery(homeQuery);

	return (
		<div className="flex flex-col flex-1">
			<Hero name={home.name} description={home.description} />
			<WorkSection
				works={projects.map((p) => ({
					title: p.name,
					description: p.description,
					href: p.link,
					date: new Date(),
				}))}
			/>
			<EssaySection
				essays={essays.map((es) => ({
					...es,
					readTime: 1,
					title: es.meta.title,
					description: es.meta.description,
					date: new Date(es.meta.date),
					href: `/essays/${es.meta.id}`,
				}))}
			/>
			<StackSection stack={home.stack} />
			<ElsewhereSection
				links={home.elsewhere.map((link) => {
					if (link.parts && link.parts.length > 0) {
						const parts = link.parts;
						return {
							label: link.name,
							value: link.text,
							onClick: (event) => {
								event.preventDefault();

								const user = parts[0];
								const domain = parts[1];

								window.location.href = `mailto:${user}@${domain}`;
							},
						};
					} else
						return {
							label: link.name,
							value: link.text,
							href: link.link,
						};
				})}
			/>
			<LegalSection
				stack={[
					{
						link: "/privacy-policy",
						name: "Privacy Policy",
					},
					{
						link: "/legal",
						name: "Legal",
					},
				]}
			/>
		</div>
	);
}
