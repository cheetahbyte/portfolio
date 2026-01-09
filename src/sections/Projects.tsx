// sections/Projects.tsx

import { useQuery } from "@tanstack/react-query";
import { useStore } from "@tanstack/react-store";
import * as React from "react";
import HeaderBar from "@/components/HeaderBar";
import { ProjectCard } from "@/components/Project";
import { appStore } from "@/lib/store";
import { projectsQuery } from "@/queries/projects";

const Container: React.FC<{ children: React.ReactNode }> = ({ children }) => (
	<div className="max-w-5xl mx-auto w-full animate-in fade-in slide-in-from-bottom-4 duration-700">
		{children}
	</div>
);

export default function Projects() {
	const focusMode = useStore(appStore, (s) => s.focusMode);
	const [searchQuery, setSearchQuery] = React.useState("");

	const {
		data: projects = [],
		isLoading,
		isError,
		error,
	} = useQuery(projectsQuery);

	const filteredProjects = React.useMemo(() => {
		const q = searchQuery.trim().toLowerCase();
		if (!q) return projects;
		return projects.filter((p) => p.name.toLowerCase().includes(q));
	}, [projects, searchQuery]);

	// Loading State
	if (isLoading) {
		return (
			<div className="animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-4xl mx-auto w-full ">
				<h2
					className={`font-sans text-sm border-b pb-2 uppercase tracking-tighter ${
						focusMode ? "border-white/10" : "border-black/10"
					}`}
				>
					Featured Projects
				</h2>
				<div className="mt-6 font-mono text-xs opacity-60">
					Loading projects…
				</div>
			</div>
		);
	}

	// Error State
	if (isError) {
		return (
			<div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
				<h2
					className={`font-sans text-sm border-b pb-2 uppercase tracking-tighter ${
						focusMode ? "border-white/10" : "border-black/10"
					}`}
				>
					Featured Projects
				</h2>
				<div className="mt-6 font-mono text-xs opacity-60 text-red-400">
					Error: {error instanceof Error ? error.message : "Unknown error"}
				</div>
			</div>
		);
	}

	return (
		<Container>
			<HeaderBar
				title="Featured Projects"
				searchQuery={searchQuery}
				setSearchQuery={setSearchQuery}
			/>

			<div className="space-y-1">
				{filteredProjects.length === 0 ? (
					<div className="font-mono text-xs opacity-60">No projects found.</div>
				) : (
					filteredProjects.map((project) => (
						<ProjectCard
							key={project.name}
							project={project}
							focusMode={focusMode}
						/>
					))
				)}
			</div>
		</Container>
	);
}
