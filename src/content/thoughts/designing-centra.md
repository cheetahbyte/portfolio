---
title: "Designing Centra"
description: "How I created a minimal CMS"
date: "2026-01-11"
tags: ["golang", "cms", "developer"]
---

So I decided to build something that doesn't try to impress me.

Not another dashboard. Not another "platform." Just a tool -- something that does one thing well and then gets out of the way.

Because that was the real problem with everything else: they didn't feel like tools. They felt like environments you had to enter and adapt to. The more I used them, the more it felt like I was working *for* the CMS instead of the other way around.

I didn't want that. I didn't want onboarding. I didn't want to click together schemas. I didn't want to fight abstractions just to render text. I wanted content to behave like code -- because that's what it is.

That's how Centra started.

## What is Centra?

Centra is a minimal headless CMS written in Go. It stores your content, gives it back via API, and gets out of your way. No dashboards, no proprietary modeling, no "content platform" narrative -- just content in, content out.

## The Invisible Tool

The best tools disappear. You don't think about Git when you commit, and you don't think about your compiler when your code builds. They're part of your workflow, not interruptions to it.

Most CMSs aren't like that. They want you in their UI, introduce their own concepts, and constantly remind you they exist. You don't really use them -- you negotiate with them.

Centra takes the opposite approach. Your content already has structure: files, folders, formats. Your frontend already knows how to render it. Git already handles versioning. Centra just serves your content -- quietly, predictably, and intentionally boring.

## Why this matters

Complexity isn't free. Every feature adds friction, every abstraction adds failure points, and every UI slows you down. If your workflow is already centered around code, adding a CMS on top often just creates distance between writing something and shipping it.

Centra removes that distance.

## The trade-off

This approach isn't for everyone. There's no real-time collaboration, no visual editor, no workflow engine. If you need those things, there are tools that do them well.

Centra is built for a simpler workflow: write, commit, deploy, fetch. If that sounds restrictive, it probably is -- but it's also what makes it feel lightweight again.

## A few useful things

Even though Centra stays minimal, it still includes a few quality-of-life features that make working with content smoother.

One example is **$rel**. Instead of hardcoding asset URLs, you can reference files relative to your content. Centra resolves these references server-side, so your content stays portable and environment-agnostic without breaking links.

The content model is just as straightforward. Folders automatically become collections, and Markdown or YAML files expose metadata without any configuration. That metadata is immediately usable for filtering via simple HTTP query parameters -- no schema editors, no syncing, no extra steps.

Under the hood, Centra caches structured content like Markdown and YAML at startup, so responses are fast and predictable. Binary files are streamed on demand, which keeps memory usage low without sacrificing performance. Features like image scaling are built in as well, but without turning the system into a full-blown media pipeline.

## Closing

I don't think CMSs are bad -- they're just built for different problems.

But for writing, versioning, and shipping content without unnecessary friction, they felt like too much. Too many layers, too many decisions, too much distance between writing something and having it live.

So instead of adapting to that, I built something smaller. Something that doesn't try to be the center of my workflow, but instead supports it quietly in the background.

That's [Centra](https://github.com/cheetahbyte/centra).
