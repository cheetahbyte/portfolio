import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { queryClient } from "@/lib/queryClient";
import { blogsQuery } from "@/queries/blogs";
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
		const essays = await queryClient.ensureQueryData(blogsQuery);
		const projects = await queryClient.ensureQueryData(projectsQuery);
		return { essays, projects };
	},
});

function IndexPage() {
	const { data: essays } = useSuspenseQuery(blogsQuery);
	const { data: projects } = useSuspenseQuery(projectsQuery);

	console.log(essays);
	return (
		<div className="flex flex-col flex-1">
			<Hero />
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
			<StackSection
				stack={["Next.js", "Go", "Postgres", "React", "Typescript"]}
			/>
			<ElsewhereSection
				links={[
					{
						label: "Email",
						value: "mail [at] leob [dot] re",
						onClick: (event) => {
							event.preventDefault();

							const user = "mail";
							const domain = "leob.re";

							window.location.href = `mailto:${user}@${domain}`;
						},
					},
					{
						label: "GitHub",
						value: "cheetahbyte",
						href: "https://github.com/cheetahbyte",
					},
					{
						label: "Discord",
						value: "cheetahbyte",
						href: "https://discord.com/users/545238456645845023",
					},
				]}
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
