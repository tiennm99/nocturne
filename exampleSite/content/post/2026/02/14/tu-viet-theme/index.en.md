---
title: "Writing your own Hugo theme"
date: 2026-02-14T21:00:00+07:00
draft: false
tags: ["theme", "hugo", "ghi-chep"]
categories: ["nhat-ky-hugo"]
description: "A month into nocturne: why it is worth building your own, what to keep small, why dark is the default, and what Vietnamese text needs."
---

A month after [the new-year plan](/post/2026/01/10/ke-hoach-dau-nam/index.md), `nocturne` is good enough to write about on itself. This post records the decisions that shaped the theme, so that when I want to add something later, I remember why I left it out in the first place.

## Why build your own

Using a ready-made theme is like renting a furnished flat: you can move in today, but moving a shelf means asking the landlord. Every time Hugo changed something, I had to read someone else's code to find out whether the theme still worked.

Writing your own is slower at first, but afterwards everything has an owner. When a page renders wrong, I know which file to open. When a new Hugo release lands, the list of things that might break is short enough to read in one evening.

There is one more reason: writing a theme makes you actually learn Hugo. Lookup order, page bundles, render hooks, how multilingual sites fit together; you have to touch each of them at least once.

## Keep it small

The rule of thumb: everything added must answer "what does the reader get?". If the answer is "it looks a bit fancier", the answer is usually no.

### No build step

No Node, no bundler, no PostCSS. The CSS is a handful of plain files that Hugo joins, minifies and fingerprints. The JavaScript is small ES modules, one job each: the theme toggle, the copy button on code blocks, the table of contents that tracks your scroll. All of it together is under ten kilobytes before compression.

### Data, not params

The home page is a portfolio, but the personal details are not in `hugo.yaml`. The bio and links live in `data/profile.yaml`, the featured projects in `data/projects.yaml`. The config file is left with the switches that turn features on and off, and it reads at a glance.

### No shortcodes of its own

The theme ships no shortcodes. A shortcode is Hugo-only syntax; once it is in a post, the post is tied to the theme. Whatever Markdown can express, such as captioned images or callout boxes, the theme handles with render hooks, so the content stays plain Markdown.

## Dark by default

I mostly write and read at night, so the dark look is the default, not an afterthought. The moon and sun button in the top corner switches to light, and the choice is remembered for next time.

### No white flash

The hard part of a dark theme is the moment before the CSS applies: the page flashes white, then goes dark. The cure is a tiny script that runs right in `<head>`, before the browser paints anything:

```js
if (localStorage.getItem('theme') === 'light') {
  document.documentElement.setAttribute('data-theme', 'light');
}
```

Because dark is the default, the script only has work to do when the reader has picked light. With JavaScript off, the page is still dark and still readable.

### Colours are tokens

Every colour is a CSS variable in a single file: dark values on `:root`, light values on `:root[data-theme="light"]`. To change the accent colour in both modes, a site overrides a few variables and never touches the theme.

> [!TIP]
> When picking colours for a dark background, avoid pure white for text. A warm, moderately bright grey is far easier on the eyes over a long read.

## Vietnamese typography

The theme puts Vietnamese first, so the text got the most care.

### Fonts with every diacritic

The font stack starts with Inter and Be Vietnam Pro, then falls back to system fonts. Both cover the full Vietnamese alphabet; when neither is installed, modern system fonts render it well too. What you want to avoid is a font missing a few glyphs like "ữ" or "ặ", leaving a single word set in two typefaces.

### Line height

Vietnamese stacks diacritics above and below the letters. A body line height of 1.7 keeps one line's marks from touching the next. Headings use tighter spacing, since the type is larger and the lines are few.

### Anchors and dates

Heading IDs come out as ASCII, so on the Vietnamese page the section "Chữ tiếng Việt" is `#chu-tieng-viet`: short and easy to share. The letter "đ" is dropped rather than turned into "d", so the Vietnamese headings that contain it get a hand-written ID, as in `## Nền tối là mặc định {#nen-toi-la-mac-dinh}`. Dates follow each language's format, so a Vietnamese post shows the date the Vietnamese way rather than "February 14, 2026".

## What's left

There is plenty still to do: the archive page, search, a second language. But the core is solid and, more importantly, I understand every line of it. The rest can wait for later posts.
