---
title: "About"
description: "The nocturne demo: what the home page is made of, where the feature posts are, and how to switch language and theme."
comments: false
toc: false
---

This is the demo site for [nocturne](https://github.com/tiennm99/nocturne), a Hugo theme for a blog with a personal portfolio: Vietnamese first, dark by default, no build step. Every theme feature is switched on here, and each post shows off a few of them. "Your Name" is a stand-in; put your own name there when you use the theme.

## What the home page is made of

The [home page](/) is a portfolio built from three parts:

1. **The intro**: name, tagline, avatar, bio and links, read from `data/profile.yaml`.
2. **Featured projects**: a grid of project cards from `data/projects.yaml`. A card shows an image, a demo link or tags only when the project has them.
3. **Recent posts**: the five newest entries in [Posts](/post/), with a link to the full list.

## Where the features are

Posts fall into three categories, each showing a group of features:

- [Demo](/categories/demo/) holds the technical tours: [a Markdown tour](/post/2026/05/07/sample/index.md) with tables, footnotes and callouts; [images](/post/2026/06/12/hinh-anh/index.md) with `srcset`, captions and a GIF served as video; [code blocks](/post/2026/07/03/khoi-code/index.md) with line highlighting and a copy button; and Hugo's [built-in shortcodes](/post/2026/08/20/shortcodes/index.md).
- [Hugo diary](/categories/nhat-ky-hugo/) is a series: a category chip above the title, previous and next links that stay within the series, and related posts at the end.
- [Notes](/categories/ghi-chu/) shows per-post overrides: [one post](/post/2025/12/01/cuoi-nam/index.md) turns comments off and uses its own license line, [another](/post/2026/03/22/doc-sach-quan-sat/index.md) turns the table of contents off and shows an updated date.

There is also the [Archives](/archives/) page, grouped by year and month, [Search](/search/) powered by Pagefind, and the lists of [tags](/tags/) and [categories](/categories/).

## Switching language and theme

The site comes in Vietnamese and English. The globe button in the top right lists the translations of the page you are on; your pick is remembered, so next time you land straight in that language.

The moon and sun button next to it switches between dark and light. Dark is the default; pick light and the site remembers it, without a flash of the wrong colours on reload.

## Learn more

- Source code and installation: [github.com/tiennm99/nocturne](https://github.com/tiennm99/nocturne).
- Configuration reference: [docs/config.md](https://github.com/tiennm99/nocturne/blob/main/docs/config.md); customization: [docs/customization.md](https://github.com/tiennm99/nocturne/blob/main/docs/customization.md).
- The content of this demo lives in the [exampleSite](https://github.com/tiennm99/nocturne/tree/main/exampleSite) folder; every post has an "Edit this page" link that opens its source file.
