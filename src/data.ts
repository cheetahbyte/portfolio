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

const thoughtFiles = import.meta.glob<string>("../content/thoughts/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
});

const posts = Object.entries(thoughtFiles).map(([path, source]) => {
  const id = path.split("/").pop()!.replace(/\.md$/, "");
  const [, frontmatter = "", body = source] = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/) ?? [];
  const fields = Object.fromEntries(
    frontmatter.split(/\r?\n/).flatMap((line) => {
      const match = line.match(/^(\w+):\s*(.*)$/);
      return match ? [[match[1], match[2].trim().replace(/^(["'])(.*)\1$/, "$2")]] : [];
    }),
  );
  for (const key of ["title", "description", "date"]) {
    if (!fields[key]) throw new Error(`content/thoughts/${id}.md is missing "${key}" in its frontmatter`);
  }
  const words = body.split(/\s+/).filter(Boolean).length;
  return {
    meta: { id, title: fields.title, description: fields.description, date: fields.date, readTime: Math.max(1, Math.round(words / 220)) },
    body,
  };
});

export const thoughts = posts.map((post) => post.meta).sort((a, b) => b.date.localeCompare(a.date));

export const thoughtMarkdown = Object.fromEntries(posts.map((post) => [post.meta.id, post.body])) as Record<string, string>;
