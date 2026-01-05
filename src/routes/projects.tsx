// routes/projects.tsx
import { createFileRoute } from '@tanstack/react-router'
import Projects from '@/sections/Projects'
import { projectsQuery } from '@/queries/projects'

export const Route = createFileRoute('/projects')({
  loader: async ({ context }) => {
    return context.queryClient.ensureQueryData(projectsQuery)
  },
  component: Projects,
})
