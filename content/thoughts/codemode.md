Ten tools is easy. Hundreds from GitHub, Linear, Slack, a couple of databases, whatever internal APIs you have wrapped in MCP is not.

## Discovery solves half the problem

Tool discovery hands an agent the relevant functions. The model still has to orchestrate pagination, filtering, joins, retries, and intermediate state itself.

What it actually wants to express is the data it needs. A compact query runtime can figure out how to get it.

## Return resources, not functions

A query-oriented system should describe the data behind tools: fields, relations, supported filters, pagination, freshness, and cost hints.

MCP schemas describe a procedure. A semantic adapter makes the underlying data explicit instead of hoping the model infers it.

## The real win is context

The raw datasets never need to touch the context window. The model can stay a planner and a reasoning engine instead of becoming a pagination engine and scratch database too.
