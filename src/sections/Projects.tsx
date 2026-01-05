// sections/Projects.tsx
import * as React from 'react'
import { useStore } from '@tanstack/react-store'
import { useQuery } from '@tanstack/react-query'
import { appStore } from '@/lib/store'
import { projectsQuery } from '@/queries/projects'
import { ProjectCard } from '@/components/Project'

export default function Projects() {
  const focusMode = useStore(appStore, (s) => s.focusMode)
  const [searchQuery, setSearchQuery] = React.useState('')

  const {
    data: projects = [],
    isLoading,
    isError,
    error
  } = useQuery(projectsQuery)

  const filteredProjects = React.useMemo(() => {
    const q = searchQuery.trim().toLowerCase()
    if (!q) return projects
    return projects.filter((p) => p.name.toLowerCase().includes(q))
  }, [projects, searchQuery])

  // Loading State
  if (isLoading) {
    return (
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
        <h2 className={`font-sans text-sm border-b pb-2 uppercase tracking-tighter ${
          focusMode ? 'border-white/10' : 'border-black/10'
        }`}>
          Featured Projects
        </h2>
        <div className="mt-6 font-mono text-xs opacity-60">Loading projects…</div>
      </div>
    )
  }

  // Error State
  if (isError) {
    return (
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
        <h2 className={`font-sans text-sm border-b pb-2 uppercase tracking-tighter ${
          focusMode ? 'border-white/10' : 'border-black/10'
        }`}>
          Featured Projects
        </h2>
        <div className="mt-6 font-mono text-xs opacity-60 text-red-400">
          Error: {error instanceof Error ? error.message : 'Unknown error'}
        </div>
      </div>
    )
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between gap-4 mb-8">
        <h2
          className={`font-sans text-sm border-b pb-2 uppercase tracking-tighter flex-1 ${
            focusMode ? 'border-white/10' : 'border-black/10'
          }`}
        >
          Featured Projects
        </h2>

        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search projects…"
          className={`hidden md:block font-mono text-xs px-3 py-2 rounded border outline-none transition-colors ${
            focusMode
              ? 'bg-white/5 border-white/10 text-white placeholder:text-white/20'
              : 'bg-white border-black/10 text-black placeholder:text-black/30'
          }`}
        />
      </div>

      <div className="space-y-1">
        {filteredProjects.length === 0 ? (
          <div className="font-mono text-xs opacity-60">No projects found.</div>
        ) : (
          filteredProjects.map((project) => (
            <ProjectCard key={project.name} project={project} focusMode={focusMode} />
          ))
        )}
      </div>
    </div>
  )
}
