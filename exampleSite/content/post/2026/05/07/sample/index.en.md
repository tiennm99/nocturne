---
title: "A Markdown tour"
date: 2026-05-07T19:00:00+07:00
lastmod: 2026-05-21T08:30:00+07:00
description: "Every bit of Markdown Hugo supports — text, lists, tables, footnotes, alerts — in one post, to see how nocturne presents it."
categories: ["demo"]
tags: ["markdown", "hugo", "theme"]
---

This post is a short walk through Markdown: each section uses one piece of syntax and shows how nocturne renders it. To compare with the source, follow the edit link at the end of the page — it opens this very `index.en.md` on GitHub.

The post is long enough to get a table of contents. On a wide screen it sits beside the text and highlights the section you are reading; on a phone it tucks in above the content.

## Text and links

A plain sentence can hold **bold**, *italics*, ***both at once***, ~~a dropped idea~~ and `inline code` such as `hugo server --buildDrafts`. Keyboard shortcuts use an HTML tag: <kbd>Ctrl</kbd> + <kbd>C</kbd>.

This paragraph carries a `lead` class, added by a Markdown attribute on the line right below it. The theme does not style that class, but it is in the HTML for your own CSS to pick up.
{.lead}

External links such as [Hugo's documentation](https://gohugo.io/documentation/) get `rel="noopener noreferrer"` added. Internal links can point straight at a Markdown file: [the post about images](/post/2026/06/12/hinh-anh/index.md) turns into that post's real URL, and [the line numbers section of the code post](/post/2026/07/03/khoi-code/index.md#line-numbers) keeps its `#line-numbers` fragment. Change your URL scheme later and these links still work.

### A heading with its own class {.special}

The heading above has a `{.special}` attribute. The class is kept and the `id` is still generated, so the table of contents and the `#` that shows on hover keep working.

## Lists and to-dos

An unordered list, nested:

- Content
  - Posts
  - About page
- Look and feel
  - Light and dark modes
  - A typeface that handles Vietnamese well

An ordered list, numbered per level:

1. Create a folder for the post.
2. Write `index.md`, then add the `index.en.md` translation next to it.
   1. Keep the date, category and tags the same.
   2. Translate the title, description and body.
3. Run `hugo server` and read it through once.

A task list:

- [x] Write a draft
- [x] Add images to the bundle
- [ ] Ask a friend to proofread
- [ ] Publish

### Definition lists

Bundle
: A folder holding `index.md` together with the post's images and other files.

Front matter
: The YAML block at the top of the file, where the title, date, tags and categories live.

Render hook
: A small template that decides how Hugo outputs images, links, headings, tables and blockquotes.

## Tables

Colons in the separator row set each column's alignment:

| Syntax (left)  | Result (centre) | Characters (right) |
| :------------- | :-------------: | -----------------: |
| `**bold**`     | **bold**        | 8                  |
| `*italic*`     | *italic*        | 8                  |
| `~~struck~~`   | ~~struck~~      | 10                 |
| `` `code` ``   | `code`          | 6                  |

### A wide table

A table with many columns sits in a horizontally scrolling region, so it never stretches the page on a phone. The region takes focus, so keyboard users can scroll it with the arrow keys.

| Format | Extension | Theme handling | WebP `srcset` | `width` and `height` | Animation | Transparency | Good for |
| :----- | :-------- | :------------- | :-----------: | :------------------: | :-------: | :----------: | :------- |
| JPEG   | `.jpg`, `.jpeg` | Resized   | Yes           | Yes                  | No        | No           | Photos and detailed pictures |
| PNG    | `.png`    | Resized        | Yes           | Yes                  | No        | Yes          | Screenshots and flat artwork |
| WebP   | `.webp`   | Resized        | Yes           | Yes                  | Possible  | Yes          | Most things on today's web |
| SVG    | `.svg`    | Served as is   | No            | No                   | Possible  | Yes          | Icons, diagrams, logos |
| GIF    | `.gif`    | Served as is   | No            | No                   | Yes       | Yes          | Short loops with few colours |

#### When to reach for a table

Tables suit data you compare across rows and columns. For steps done one after another, an ordered list reads better on a narrow screen.

## Quotes

A plain blockquote, no alert styling:

> A day's travel brings a basketful of wisdom.
>
> — Vietnamese proverb

## Alerts

All five GitHub alert types are here. Their default titles follow the page language.

> [!NOTE]
> Background a reader should know, even when skimming.

> [!TIP]
> Run `hugo server --navigateToChanged` and the browser jumps to the page you just edited.

> [!IMPORTANT]
> A translation lives next to the original in the same bundle, named `index.en.md`.

> [!WARNING]
> Hugo does not merge `markup` from a theme, so copy the required config block into your site's `hugo.yaml`.

> [!CAUTION]
> `draft: true` keeps a post out of the build, but the file is still in your repository. If the repository is public, anyone can read it.

Right after `[!TIP]` you can write your own title in place of the default one:

> [!TIP] Keep it short
> An alert works best with a sentence or two. Any longer and it probably wants a section of its own.

## Footnotes

Hugo turns Markdown into HTML with Goldmark[^goldmark]. A footnote can have a name instead of a number[^named], and its text always gathers at the end of the post, with an arrow back to where you were reading.

[^goldmark]: Goldmark is a Markdown parser written in Go that follows the CommonMark spec.
[^named]: The name only exists in the source; on the page, footnotes are still numbered in the order they appear.

## Collapsible content

The site turns on `markup.goldmark.renderer.unsafe`, so hand-written HTML goes straight to the page. A `<details>` tag makes a block that opens and closes without any JavaScript:

<details>
<summary>Why does every post have two files?</summary>

Each post is a bundle. `index.md` is the Vietnamese version, the site's default language; `index.en.md` is the English one. Hugo pairs the two files as translations, and the language picker jumps straight to the matching post.

</details>

Hugo also has a `details` shortcode that does the same job; see [the shortcode post](/post/2026/08/20/shortcodes/index.md).

---

The rule above is three dashes, `---`, on a line of their own between blank lines. This post was edited after it went out, so an updated date shows under the title.
