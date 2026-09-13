// Run with the dev server running: node tests/portfolio-smoke.mjs
import assert from 'node:assert/strict';

const origin = process.env.TEST_ORIGIN ?? 'http://127.0.0.1:3000';
const response = await fetch(origin);
assert.equal(response.status, 200);
const html = await response.text();
const article = html.match(/<article\b[^>]*>([\s\S]*?)<\/article>/)?.[1];
assert.ok(article, 'Portfolio letter renders on the server');
const text = article.replace(/<[^>]*>/g, '');
assert.match(text, /Leonhard Breuer\. Computer science student in Germany/);
assert.match(text, /My work includes Kepler, a native Spotlight alternative for macOS, keinbudget, an open-source subscription tracker, and Centra, the no-bullshit CMS for developers\./);
assert.match(text, /GitHub, Discord, LinkedIn, X, or Bluesky\./);
assert.equal((article.match(/<p\b/g) ?? []).length, 4);
assert.match(text, /I build with Next\.js, Go, PostgreSQL, React, Typescript, Tanstack \(Start\), and K8s\./);
const stack = article.match(/<p id="stack"[^>]*>([\s\S]*?)<\/p>/)?.[1];
assert.ok(stack);
for (const url of ['https://nextjs.org/', 'https://go.dev/', 'https://www.postgresql.org/', 'https://react.dev/', 'https://www.typescriptlang.org/', 'https://tanstack.com/start', 'https://kubernetes.io/']) {
  assert.ok(stack.includes(`href="${url}"`), `Stack links to ${url}`);
}
const icons = article.match(/<svg\b[^>]*>/g) ?? [];
assert.equal(icons.length, 13, 'Stack, social, and email icons render');
assert.ok(icons.every((icon) => icon.includes('aria-hidden="true"')), 'Decorative icons stay out of accessible names');
assert.doesNotMatch(article, /<path\s+d=""/);
assert.doesNotMatch(article, /<(?:h[1-6]|button|img)\b/);
assert.doesNotMatch(html, /Toggle color theme|localStorage\.getItem\('theme'\)/);
assert.doesNotMatch(html, /class="page-index"/);
for (const route of ['/legal', '/privacy-policy', '/thoughts']) {
  assert.equal((await fetch(new URL(route, origin))).status, 200, `${route} stays available`);
}
console.log('Portfolio smoke checks passed.');
