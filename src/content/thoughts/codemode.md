---
tags: ["AI", "harness engineering"]
title: "Beyond Code Mode"
description: "A design for combining tool discovery, retrieval, and a small query language"
date: "2026-08-09"
---

Ten tools is easy. Hundreds from GitHub, Linear, Slack, a couple of databases, whatever internal APIs you've wrapped in MCP is not.

The obvious approach is to dump every tool definition into the prompt and let the model pick. It works better than it has any right to at small scale, but it has an ugly property: the more capable your agent gets, the more context you burn just *describing* what it can do. MCP makes this painfully visible. One server can expose dozens of methods. Connect four and a real chunk of your context is now schemas for tools that will never be called.

The usual fix is tool discovery. Give the agent a single primitive:

```text
search_tools("GitHub pull requests and GitLab issues")
```

and let the runtime surface only what's relevant. That's a genuine improvement. But I think it stops one layer too early.

## Discovery solves half the problem

Say the agent needs to answer: *find open GitLab issues that correspond to already-merged GitHub PRs.*

Tool discovery hands it `github.list_pull_requests`, `gitlab.list_issues`, and friends. Now the model gets to orchestrate: list PRs, paginate, filter for merged, list issues, inspect references, correlate the two sets, retry whatever 502'd, and hold all the intermediate state in context while it does. That's a lot of machinery for what is conceptually one query.

What the model actually wants to say is something like:

```sql
SELECT pr.number, pr.title, issue.iid, issue.title
FROM github.pull_requests pr
JOIN gitlab.issues issue ON issue.references CONTAINS pr.number
WHERE pr.state = 'merged' AND issue.state = 'open'
LIMIT 50;
```

The agent expresses what data it wants. The runtime figures out how to get it. That split is the whole idea.

## Return resources, not functions

Traditional discovery returns callable functions. A query-oriented system should return a compact description of the *data* behind them:

```text
github.pull_requests
  fields:       number, title, state, merged_at, head_sha
  relations:    repository, commits, linked_issues
  capabilities: filter(state), filter(repository), paginate
```

Smaller than the underlying RPC surface, and the agent no longer has to care about `per_page`, `after_cursor`, `repository_owner`, `project_namespace` and the rest of the connector's private life.

MCP looks like it already gives you this, but it doesn't. A JSON Schema for `list_issues({project_id, state, page})` tells you how to make the call. It says nothing about identity, relationships, which predicates are actually supported server-side, or what pagination costs. MCP schemas describe a *procedure*; a query planner needs *data semantics*. Output schemas help a little, not enough.

So you need another layer: call it a semantic adapter. It maps `listPullRequests` / `getPullRequest` / `searchIssues` onto `github.pull_requests`, and declares identity, field mappings, relations, supported filters, sorting, pagination, freshness, and cost hints.

The first batch of these has to be handwritten. Some of it might eventually be inferred from good MCP schemas, but inferring relational semantics blindly is how you get quietly wrong answers: a field called `id` is not necessarily globally unique, two fields called `repository_id` do not necessarily join, and a parameter called `query` is not necessarily full-text search. The adapter is where you make that explicit instead of hoping.

## Why SQL

GraphQL, Cypher, Datalog, some bespoke JSON DSL: plenty of options. SQL wins here for boring reasons. Models already know it cold, so there's nothing to teach. It's dense, which matters when context efficiency was the point in the first place. And it maps cleanly onto a relational plan.

That last one is the important part. I wouldn't build the runtime around SQL strings. SQL is the frontend; the intermediate representation is the architecture:

```text
SQL → Parser → Typed Query Plan → Planner → Connector Ops → Results
```

with a plan made of `Scan`, `Filter`, `Project`, `Join`, `Aggregate`, `Sort`, `Limit`, `Search`, `Traverse`. Once you own the plan, the planner can decide that GitHub filters PRs by state remotely, that Linear can't filter by GitHub PR number so that join happens locally, and that two scans can run concurrently. The agent never sees any of it.

Predicate pushdown falls out naturally. Given `WHERE repository = 'foo/bar' AND state = 'open' AND title LIKE '%oauth%'`, if the connector supports the first two, you push those and filter titles locally. This is exactly the mechanical orchestration you don't want a language model re-deriving on every turn.

Owning the planner also means the dialect can stay small: `SELECT / FROM / WHERE / JOIN / GROUP BY / ORDER BY / LIMIT` plus a few aggregates covers most of it. Add agent-specific things only where SQL genuinely lacks an abstraction: `WHERE SEARCH_TEXT(title, body, 'oauth failure')`, maybe `WITH FRESHNESS '5m'`. Driven by real needs, not by the urge to design a language. The best query language here is probably a deliberately boring one.

GraphQL is the obvious alternative and it's lovely when you're querying one coherent graph someone already modelled. Ad-hoc joins across providers discovered at runtime aren't its core abstraction. SQL is worse at deep traversal and better at federated tabular composition. A hybrid could exist eventually; I wouldn't start there.

## The real win is context, again

Schema savings are nice. Intermediate-state compression is better.

Under normal tool calling the model receives 200 pull requests, then 300 issues, and does the correlation itself. A query runtime returns the twelve rows that matched. The raw datasets never touch the context window.

That changes what the model *is*. It stops being planner, API client, pagination engine, join processor, filter engine, scratch database, and reasoning engine all at once, and goes back to being a planner and a reasoning engine. Healthier boundary.

## Not everything is a table

There's an obvious trap: forcing every operation into SQL. Some tools are resources: issues, PRs, messages, users, files, events. Those are query targets. Others are commands: `send_email`, `merge_pull_request`, `restart_server`, `deploy_application`. Those are not.

The default I'd take: **queries read and compose state; tools perform actions.** So the agent runs a `SELECT` to find the urgent open issues, then calls `linear.update_issue(...)` on the specific ones it decided to touch. Convenient security boundary, too: reads run under one permission model, mutations stay explicit and auditable.

This doesn't kill Code Mode either, it just makes it rarer. Downloading an artifact, parsing some proprietary binary format, three APIs with weird branching: code is still the right escape hatch. The layering I like:

1. Query resources when you can
2. Call explicit tools for commands
3. Drop to code for irregular orchestration

Much more constrained than handing the model a general-purpose runtime for every interaction.

## The catalog is the hard part

None of the query machinery is novel. SQL parsing is solved, plans are solved, joins are solved. The difficult bit is building a semantic catalog over genuinely heterogeneous tools, rich enough to plan against, compact enough to hand to an agent during discovery.

The full entry can be verbose runtime-side:

```yaml
resource: github.pull_requests
fields:
  number:    {type: integer}
  title:     {type: string}
  state:     {type: enum, values: [open, closed, merged]}
  merged_at: {type: timestamp}
capabilities:
  filters:    [state, repository]
  sorting:    [created_at, updated_at]
  pagination: cursor
relations:
  repository: github.repositories
  commits:    github.commits
```

while discovery hands the model a projection of maybe four lines.

Current tool calling mostly exposes APIs straight to models. That was the right place to start; I don't think it's where this ends. We built ORMs, search engines, shell pipelines and query languages because doing "call A, extract IDs, paginate B, map X to Y, retry the cursor" by hand is tedious and error-prone. Agents have the same problem, and more tools in the context window is not obviously the answer: sometimes it's fewer, stronger abstractions.

Discovery fixes the capability-context problem. A semantic catalog fixes heterogeneity. A query language fixes composition. A planner fixes orchestration. Explicit tools keep mutations honest, and code stays the escape hatch. Put together you get something that looks less like a few hundred APIs dumped into a prompt and more like an actual computing environment, which I find a lot more interesting than adding tool number 301.
