import { createFileRoute } from "@tanstack/react-router";
import Hero from "@/sections/Hero";
import WorkSection from "@/sections/Work";
import EssaySection from "@/sections/Essays";
import StackSection from "@/sections/Stack";
import ElsewhereSection from "@/sections/Elsewhere";

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
		const ogImage = `/opengraph.png`; // Path to your preview image

		return {
			meta: [
				{ title },
				{ name: "description", content: description },
				// Open Graph / Facebook
				{ property: "og:type", content: "website" },
				{ property: "og:url", content: siteUrl },
				{ property: "og:title", content: title },
				{ property: "og:description", content: description },
				{ property: "og:image", content: ogImage },
				// Twitter
				{ name: "twitter:card", content: "summary_large_image" },
				{ name: "twitter:url", content: siteUrl },
				{ name: "twitter:title", content: title },
				{ name: "twitter:description", content: description },
				{ name: "twitter:image", content: ogImage },
			],
		};
	},
	component: IndexPage,
});

function IndexPage() {
	return <>
		<Hero/>
		<WorkSection works={[
			{date: new Date(), title: "Centra", description:"Simple fast CMS written in Golang"}
		]}/>
		<EssaySection
  essays={[
    { date: new Date("2024-01-01"), title: "Essay 1", description: "One", readTime: 5 },
    { date: new Date("2024-02-01"), title: "Essay 2", description: "Two", readTime: 6 },
    { date: new Date("2024-03-01"), title: "Essay 3", description: "Three", readTime: 7 },
    { date: new Date("2024-04-01"), title: "Essay 4", description: "Four", readTime: 8 },
    { date: new Date("2024-05-01"), title: "Essay 5", description: "Five", readTime: 9 },
  ]}
/>
		<StackSection stack={["Next.js", "Go", "Postgres", "React", "Typescript"]}/>
		<ElsewhereSection
			links={[
				{
				label: "Email",
				value: "mail [at] leb [dot] re",
				onClick: (event) => {
					event.preventDefault()

					const user = "mail"
					const domain = "leb.re"

					window.location.href = `mailto:${user}@${domain}`
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
				href: "https://read.cv/leonhard",
				},
				{
				label: "Mastodon",
				value: "@leo@hachyderm.io",
				href: "https://hachyderm.io/@leo",
				},
			]}
		/>
	</>;
}
