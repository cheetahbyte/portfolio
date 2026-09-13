export const portfolio = {
  name: 'Leonhard Breuer',
  description: ['Computer science student in Germany, building', 'things', 'for the web'] as const,
  works: [
    { title: 'Kepler', description: 'a native Spotlight alternative for macOS', href: 'https://trykepler.app', year: '2026' },
    { title: 'keinbudget', description: 'an open-source subscription tracker', href: 'https://github.com/cheetahbyte/keinbudget', year: '2026' },
    { title: 'Centra', description: 'the no-bullshit CMS for developers', href: 'https://github.com/cheetahbyte/centra', year: '2026' },
  ],
  stack: [
    { label: 'Next.js', href: 'https://nextjs.org/' },
    { label: 'Go', href: 'https://go.dev/' },
    { label: 'PostgreSQL', href: 'https://www.postgresql.org/' },
    { label: 'React', href: 'https://react.dev/' },
    { label: 'Typescript', href: 'https://www.typescriptlang.org/' },
    { label: 'Tanstack (Start)', href: 'https://tanstack.com/start' },
    { label: 'K8s', href: 'https://kubernetes.io/' },
  ],
  elsewhere: [
    { label: 'Email', value: 'mail [at] leob [dot] re', href: 'mailto:mail@leob.re' },
    { label: 'GitHub', value: 'cheetahbyte', href: 'https://github.com/cheetahbyte/' },
    { label: 'Discord', value: 'cheetahbyte', href: 'https://discord.com/users/545238456645845023' },
    { label: 'LinkedIn', value: 'leonhard-breuer', href: 'https://www.linkedin.com/in/leonhard-breuer/' },
    { label: 'X', value: '@cheetahbyte', href: 'https://x.com/cheetahbyte' },
    { label: 'Bluesky', value: '@leonhardbreuer.de', href: 'https://bsky.app/profile/leonhardbreuer.de' },
  ],
}

export const thoughts = [
  // { id: 'codemode', title: 'Beyond Code Mode', description: 'A design for combining tool discovery, retrieval, and a small query language', date: '2026-08-09', readTime: 6 },
  // { id: 'designing-centra', title: 'Designing Centra', description: 'How I created a minimal CMS', date: '2026-01-11', readTime: 4 },
]

const thoughtFiles = import.meta.glob<string>("../content/thoughts/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
});

export const thoughtMarkdown = {} as Record<string, string>;
