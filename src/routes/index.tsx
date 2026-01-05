import { createFileRoute } from '@tanstack/react-router'
import Home from '@/sections/Home'
import { createServerFn } from '@tanstack/react-start' // Ensure correct import for TanStack Start

export type HomeApiResponse = {
  name: { first: string; last: string }
  keyfacts: Array<string | number>
  rotation: string[]
  technical: { languages: string[]; frameworks: string[]; tools: string[] }
  phrase: string
}

export const getHomeData = createServerFn({ method: 'GET' }).handler(async () => {
  const res = await fetch('https://cms.leonhardbreuer.de/api/home', {
    headers: { accept: 'application/json' },
  })

  if (!res.ok) {
    throw new Error(`Failed to fetch home data: ${res.status}`)
  }

  return (await res.json()) as HomeApiResponse
})

export const Route = createFileRoute('/')({
  loader: async () => {
    return await getHomeData()
  },
  // Add the head property here
  head: () => {
    const title = `Leonhard Breuer | Portfolio`
    const description = "just a simple portfolio"
    const siteUrl = 'https://www.leonhardbreuer.de' // Update to your actual URL
    const ogImage = `/opengraph.png` // Path to your preview image

    return {
      meta: [
        { title },
        { name: 'description', content: description },
        // Open Graph / Facebook
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: siteUrl },
        { property: 'og:title', content: title },
        { property: 'og:description', content: description },
        { property: 'og:image', content: ogImage },
        // Twitter
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:url', content: siteUrl },
        { name: 'twitter:title', content: title },
        { name: 'twitter:description', content: description },
        { name: 'twitter:image', content: ogImage },
      ],
    }
  },
  component: IndexPage,
})

function IndexPage() {
  const data = Route.useLoaderData()
  return <Home data={data} />
}
