import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";

export type ThoughtMeta = {
  id: string;
  title: string;
  date: string;
  description?: string;
  tags?: string[];
};

export type Thought = ThoughtMeta & {
  content: string;
};

const thoughtsDirectory = path.join(
  process.cwd(),
  "src",
  "content",
  "thoughts",
);

function toSafePostsDir(): string[] {
  if (!fs.existsSync(thoughtsDirectory)) {
    return [];
  }

  return fs
    .readdirSync(thoughtsDirectory)
    .filter((fileName) => fileName.endsWith(".md"));
}

function normalizeText(value: unknown): string {
  if (typeof value === "string") {
    return value;
  }

  return "";
}

function normalizeTags(value: unknown): string[] | undefined {
  if (!Array.isArray(value)) {
    return undefined;
  }

  return value.filter((tag): tag is string => typeof tag === "string");
}

export function getThoughts(): ThoughtMeta[] {
  const fileNames = toSafePostsDir();

  const allThoughts = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, "");
    const fullPath = path.join(thoughtsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const matterResult = matter(fileContents);

    return {
      id,
      title: normalizeText(matterResult.data.title) || id,
      date: normalizeText(matterResult.data.date) || "",
      description: normalizeText(matterResult.data.description) || undefined,
      tags: normalizeTags(matterResult.data.tags),
      ...matterResult.data,
    } as ThoughtMeta;
  });

  return allThoughts.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    }

    if (a.date > b.date) {
      return -1;
    }

    return 0;
  });
}

export function getThoughtSlugs(): string[] {
  return toSafePostsDir().map((fileName) => fileName.replace(/\.md$/, ""));
}

export function getThoughtBySlug(slug: string): Thought | null {
  const safeSlug = slug.replace(/\.md$/, "");
  const fullPath = path.join(thoughtsDirectory, `${safeSlug}.md`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const matterResult = matter(fileContents);

  return {
    id: safeSlug,
    title: normalizeText(matterResult.data.title) || safeSlug,
    date: normalizeText(matterResult.data.date) || "",
    description: normalizeText(matterResult.data.description) || undefined,
    tags: normalizeTags(matterResult.data.tags),
    content: matterResult.content,
    ...(matterResult.data as Record<string, unknown>),
  } as Thought;
}

// Backward-compatible alias for existing import paths
export const getSortedPostsData = getThoughts;
