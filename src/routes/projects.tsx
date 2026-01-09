import { createFileRoute } from "@tanstack/react-router";
import { projectsQuery } from "@/queries/projects";
import Projects from "@/sections/Projects";

export const Route = createFileRoute("/projects")({
	loader: async ({ context }) => {
		return context.queryClient.ensureQueryData(projectsQuery);
	},
	// Add the head property here
	head: ({ loaderData }) => {
		const title = `Projects | Leonhard Breuer`;
		const description =
			"A collection of my recent work, experiments, and open-source contributions.";
		const siteUrl = "https://www.leonhardbreuer.de";
		const ogImage = `/opengraph.png`; // Optional: A specific image for the projects page

		return {
			meta: [
				{ title },
				{ name: "description", content: description },
				// Open Graph / Facebook
				{ property: "og:type", content: "website" },
				{ property: "og:url", content: `${siteUrl}/projects` },
				{ property: "og:title", content: title },
				{ property: "og:description", content: description },
				{ property: "og:image", content: ogImage },
				// Twitter
				{ name: "twitter:card", content: "summary_large_image" },
				{ name: "twitter:title", content: title },
				{ name: "twitter:description", content: description },
				{ name: "twitter:image", content: ogImage },
			],
		};
	},
	component: Projects,
});
