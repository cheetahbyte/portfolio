import { createFileRoute } from '@tanstack/react-router'
import { blogsQuery } from '@/queries/blogs'
import BlogList from '@/sections/Blog'

export const Route = createFileRoute('/blog/')({
  loader: async ({ context }) => {
    return context.queryClient.ensureQueryData(blogsQuery)
  },
  head: () => {
    const title = 'Blog | Leonhard Breuer'
    const description = 'Exploring software development, creative coding, and technical insights.'
    const siteUrl = 'https://www.leonhardbreuer.de'
    const ogImage = `/opengraph.png`

    return {
      meta: [
        { title },
        { name: 'description', content: description },
        // Open Graph / Facebook
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: `${siteUrl}/blog` },
        { property: 'og:title', content: title },
        { property: 'og:description', content: description },
        { property: 'og:image', content: ogImage },
        // Twitter
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: title },
        { name: 'twitter:description', content: description },
        { name: 'twitter:image', content: ogImage },
      ],
    }
  },
  component: BlogList,
})
