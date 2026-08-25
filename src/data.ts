export const portfolio = {
  name: 'Leonhard Breuer',
  description: ['Computer science student in Germany, building', 'things', 'for the web'] as const,
  works: [
    { title: 'Kepler', description: 'native spotlight-alternative for macos', href: 'https://trykepler.app', year: '2026' },
    { title: 'keinbudget', description: 'Open-Source subscription tracker', href: 'https://github.com/cheetahbyte/keinbudget', year: '2026' },
    { title: 'Centra', description: 'The no-bullshit CMS for developers', href: 'https://github.com/cheetahbyte/centra', year: '2026' },
  ],
  stack: ['Next.js', 'Go', 'PostgreSQL', 'React', 'Typescript', 'Tanstack (Start)', 'K8s'],
  elsewhere: [
    { label: 'Email', value: 'mail [at] leob [dot] re', href: 'mailto:mail@leob.re' },
    { label: 'GitHub', value: 'cheetahbyte', href: 'https://github.com/cheetahbyte/' },
    { label: 'Discord', value: 'cheetahbyte', href: 'https://discord.com/users/545238456645845023' },
    { label: 'LinkedIn', value: 'leonhard-breuer', href: 'https://www.linkedin.com/in/leonhard-breuer/' },
    { label: 'X (Twitter)', value: '@cheetahbyte', href: 'https://x.com/cheetahbyte' },
    { label: 'Bluesky', value: '@leonhardbreuer.de', href: 'https://bsky.app/profile/leonhardbreuer.de' },
  ],
}

export const thoughts = [
  { id: 'codemode', title: 'Beyond Code Mode', description: 'A design for combining tool discovery, retrieval, and a small query language', date: '2026-08-09', readTime: 6 },
  { id: 'designing-centra', title: 'Designing Centra', description: 'How I created a minimal CMS', date: '2026-01-11', readTime: 4 },
]

const thoughtFiles = import.meta.glob<string>("../content/thoughts/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
});

export const thoughtMarkdown = Object.fromEntries(
  Object.entries(thoughtFiles).map(([path, source]) => [
    path.split("/").pop()!.replace(/\.md$/, ""),
    source,
  ]),
) as Record<string, string>;
