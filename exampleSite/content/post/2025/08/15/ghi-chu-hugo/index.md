---
title: "Notes on Hugo and static sites"
date: 2025-08-15T09:00:00+07:00
draft: false
tags: ["hugo", "markdown", "ghi-chep"]
categories: ["nhat-ky-hugo"]
description: "Coming back to Hugo after a long break: the new layout folders, the asset pipeline, render hooks, and a few thoughts on keeping a website small."
---

Hugo is a static site generator written in Go. Coming back to it after a long break, I found a fair amount had changed. These are personal notes, not a tutorial: the things I want to remember before starting on something bigger.

## The new layout convention

Since 0.146, the special folders inside `layouts/` start with an underscore: `_partials`, `_markup`, `_shortcodes`. The underscore keeps them apart from section names, so a section called `partials` can no longer be mistaken for the folder of partials.

### The `_partials` folder

Reusable template pieces live here: the header, the footer, a post card. A section is a kind of content; a partial is just a piece of the page.

### The `_markup` folder

Render hooks for Markdown: headings, links, images, code blocks, tables, blockquotes. Hugo finds them on its own while rendering content; nothing needs registering.

### The `_shortcodes` folder

Exactly what it says. A shortcode placed here in your site overrides the theme's shortcode of the same name.

## The asset pipeline

Hugo needs no external build tool. `resources.Get` picks up a file from `assets/`, `resources.Concat` joins files, `minify` compresses them and `fingerprint` puts a hash in the file name. For a small to medium site, that is the whole pipeline.

```yaml
markup:
  goldmark:
    parser:
      autoHeadingIDType: github-ascii
```

This one setting solves a big problem for anyone writing in Vietnamese: heading IDs come out as plain ASCII, stable and URL-safe. "Thư mục" becomes `#thu-muc` instead of a long run of percent-encoded bytes. Only "đ" is dropped rather than turned into "d"; when it matters, write the ID by hand right after the heading text, as the Vietnamese version of this post does with `{#di-tiep}`.

## Render hooks

Render hooks let you step into Markdown rendering without writing a Goldmark extension. A small template in `_markup/` is enough.

A few things I reach for:

- a `#` anchor link next to each heading;
- `rel="noopener"` on outbound links;
- `srcset`, dimensions and `loading="lazy"` on images, so the page does not jump while it loads.

## Things worth keeping

- Plain Markdown is a long-term asset. Any generator can read it.
- Hugo is rarely what makes a build slow. When it is slow, the culprit is usually image processing or an over-eager resource pipeline.
- A light theme makes a light site. Every byte of CSS and JS travels over the network to the reader.
- Writing your own theme is how you get to understand every line. Ready-made themes are convenient, but they bring a lot you never needed.

## What's next

The project for the coming months: a Hugo theme of my own, small, with no build step and Vietnamese first. It is called `nocturne`. I will write it and keep notes along the way in this series.

The next entry will probably be the actual plan, then the CSS and how to do dark mode without a white flash on first load.
