// queries/projects.ts
import { createServerFn } from '@tanstack/react-start'

export type Project = {
  name: string
  tags: Array<string>
  description: string
  link: string
}

export type ProjectsApiResponse = {
  projects: Array<Project>
}

// Keeping the Server Function for the fetch call
export const getProjectData = createServerFn({ method: 'GET' }).handler(async () => {
  const res = await fetch('https://cms.leonhardbreuer.de/api/projects', {
    headers: { accept: 'application/json' },
  })
  if (!res.ok) {
    throw new Error(`Failed to fetch projects data: ${res.status} ${res.statusText}`)
  }
  const data = (await res.json()) as ProjectsApiResponse
  return data.projects // Returning the array directly to match your blog pattern
})

export const projectsQuery = {
  queryKey: ['projects'],
  queryFn: () => getProjectData(),
  staleTime: 1000 * 60 * 5, // 5 minutes
}
