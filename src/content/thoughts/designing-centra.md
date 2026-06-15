---
title: "Designing Centra"
description: "How I created a minimal CMS"
date: "2026-01-11"
tags: ["golang", "cms", "developer"]
---

  So I decided to build something that doesn't try to impress me.

  Not another dashboard. Not another "platform." Just a tool, something that does one thing well and then gets out of the way.

  That was the real problem with everything else: they didn't feel like tools. They felt like environments you had to enter and
  adapt to. The more I used them, the more it felt like I was working *for* the CMS instead of the other way around.

  I didn't want that. I didn't want onboarding. I didn't want to click together schemas. I didn't want to fight abstractions just
  to render text. I wanted content to behave like code, because that's what it is.

  That's how Centra started.

  ## What is Centra?

  Centra is a minimal headless CMS written in Go. It stores your content and gives it back via API. No dashboards, no proprietary
  modeling, no "content platform" narrative. Content in, content out.

  ## The invisible tool

  The best tools disappear. You don't think about Git when you commit, and you don't think about your compiler when your code
  builds. They're part of your workflow, not interruptions to it.

  Most CMSs aren't like that. They want you in their UI, they introduce their own concepts, and they keep reminding you they
  exist. You don't really use them. You negotiate with them.

  Centra takes the opposite approach. Your content already has structure: files, folders, formats. Your frontend already knows how
  to render it. Git already handles versioning. Centra just serves your content, quietly and predictably, and it's boring on
  purpose.

  ## Why this matters

  Complexity isn't free. Every feature adds friction, every abstraction adds a place to fail, every UI slows you down. If your
  workflow is already centered on code, adding a CMS on top often just puts distance between writing something and shipping it.

  Centra removes that distance.

  ## The trade-off

  This approach isn't for everyone. There's no real-time collaboration, no visual editor, no workflow engine. If you need those
  things, there are tools that do them well.

  Centra is built for a simpler loop: write, commit, deploy, fetch. If that sounds restrictive, it probably is. It's also what
  makes it feel lightweight again.

  ## A few useful things

  Even though Centra stays minimal, it has a few quality-of-life features that make working with content smoother.

  One is **$rel**. Instead of hardcoding asset URLs, you reference files relative to your content, and Centra resolves those
  references on the server. Your content stays portable across environments without breaking links.

  The content model is just as plain. Folders become collections automatically, and Markdown or YAML files expose their metadata
  with no configuration. You can filter on that metadata right away through HTTP query parameters, without setting up a schema or
  syncing anything first.

  Under the hood, Centra caches structured content like Markdown and YAML at startup, so responses stay fast and predictable.
  Binary files are streamed on demand, which keeps memory use low. Image scaling is built in too, though it stops well short of
  being a full media pipeline.

  ## Closing

  I don't think CMSs are bad. They're built for different problems.

  But for writing, versioning, and shipping content without all the friction, they felt like too much. Too many layers, too many
  decisions, too much distance between writing something and having it live.

  So instead of adapting to that, I built something smaller. Something that doesn't try to be the center of my workflow but sits
  in the background and supports it.

  That's [Centra](https://github.com/cheetahbyte/centra).
