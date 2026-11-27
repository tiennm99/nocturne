# Configuration

Reference for `hugo.yaml` keys that nocturne reads. The theme targets Hugo **0.154.5**, the version Ubuntu 26.04 LTS ships, and keeps working on newer releases. Hugo merges `params` and `outputFormats` from the theme's `hugo.yaml`, so the theme's param defaults apply without copying them. Everything else (markup, permalinks, pagination, taxonomies, related, outputs, language settings) must be set in your *site's* `hugo.yaml`; see [Why theme defaults don't merge](#why-theme-defaults-dont-merge).

## Required

Copy this block into your site `hugo.yaml`:

```yaml
languageCode: en
defaultContentLanguage: en
module:
  imports:
    - path: github.com/tiennm99/nocturne

pagination:
  pagerSize: 10
  path: page

taxonomies:
  category: categories
  tag: tags

permalinks:
  post: /:year/:month/:day/:slugorcontentbasename/   # front matter `slug:` wins over the file name

markup:
  goldmark:
    renderer:
      unsafe: true
    parser:
      autoHeadingIDType: github-ascii  # ASCII slugs for vi diacritics; drops đ/Đ ("Đặc biệt" → #ac-biet)
  highlight:
    noClasses: false               # Chroma emits classes, so assets/css/syntax.css colours code
  tableOfContents:
    startLevel: 2
    endLevel: 4

related:
  threshold: 80
  includeNewer: true
  toLower: true
  indices:
    - name: tags
      weight: 100
    - name: categories
      weight: 60
    - name: date
      weight: 10

outputs:
  home: [html, rss, llmtxt]        # llmtxt adds /llms.txt
```

Every post needs a `date`: a post without one sorts under year 0001 in the archive and the feed. Posts are the regular pages of [`mainSections`](https://gohugo.io/methods/site/mainsections/). Hugo's default is the top-level section with the most pages, which usually needs no setting. Set the top-level key only when another section has more pages than your posts:

```yaml
mainSections: [post]
```

## Theme params

```yaml
params:
  description: "Site description used in <meta>, falls back to site.Title."
  author: "Your Name"       # OG + JSON-LD article author; falls back to data/profile.yaml name.
                            # The {name, email} map form also works: <head> uses its name,
                            # rss.xml its email and name (managingEditor)
  logo: "img/logo.png"      # JSON-LD author/publisher image; default: data/profile.yaml avatar
  favicon: "favicon.svg"    # path under static/ (default favicon.svg); the theme ships none,
                            # so add the file or this 404s. .svg, .png or .ico

  profile:
    url: "https://<you>.example.com/about/"  # JSON-LD author URL and article:author; default: data/profile.yaml url,
                                             # then the site home (JSON-LD only)

  social:
    twitter: "yourhandle"   # adds twitter:site + twitter:creator (no @ prefix)

  og:
    fallbackImage: "img/og-default.png"  # site-wide OG/Twitter image when a post has none
    locale: "vi_VN"         # og:locale (set it per language); default maps vi, en, ja, zh, ko, fr, de, else languageCode

  search:
    enable: true            # header search button + Pagefind UI on /search/

  home:
    recentPostsCount: 5     # how many post-cards on the homepage

  toc:
    enable: true            # site-wide kill switch (per-post `toc: false` still wins)
    minWordCount: 400       # post must exceed this to render TOC

  relatedPostsCount: 3      # number of cards under each post

  rssFullContent: false     # true: each feed item carries the full .Content, not the summary

  footer:
    since: 2020             # copyright reads "© 2020–<this year>"; omitted: this year only
    customText: ""          # extra footer line, rendered as raw HTML

  prefetch:
    enable: false           # Speculation Rules prefetch hints (Chromium); off by default
    rules: ""               # optional JSON to replace the default rules (same-site links under the
                            # base path, except this language's search page)

  prevNextNav:
    enable: true            # prev/next links under posts in site.MainSections (other pages get none)
    taxonomy: categories    # optional: stay within the post's first term of this taxonomy
                            # (a Newsletter post links to Newsletter posts); posts without a term
                            # fall back to the whole section

  categoryChip:
    enable: false           # opt-in: link chip for the post's first term above the title
    taxonomy: categories    # taxonomy to read the term from (default "categories")

  license: "Licensed under [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/)"
                            # optional line in every post footer; Markdown allowed.
                            # Per-post `license: "…"` overrides it, `license: false` hides it

  editURL: "https://github.com/<owner>/<repo>/edit/main/content/"
                            # optional "Edit this page" link in the post footer:
                            # this prefix + the content file's path (.File.Path)

  comments:
    giscus:
      enable: false         # opt-in
      repo: "<owner>/<repo>"
      repoId: "R_kgDO..."
      category: "Announcements"
      categoryId: "DIC_kwDO..."
      mapping: "pathname"   # pathname | url | title | og:title
      strict: "0"
      reactionsEnabled: "1"
      inputPosition: "bottom"  # top | bottom
      theme: "dark"
      lang: "en"
```

Generate Giscus values at [giscus.app](https://giscus.app). Comments render only when `enable`, `repo`, `repoId` and `categoryId` are all set; a missing ID turns them off. The other keys default to the values shown. The site's light/dark toggle drives the Giscus theme at runtime, so a custom `theme` value applies only until the first sync.

### Zero values

Numeric params pass through Hugo's `default`, which treats `0` as unset: `relatedPostsCount: 0`, `home.recentPostsCount: 0` and `toc.minWordCount: 0` fall back to 3, 5 and 400. Use `1` as the lowest value, or override the partial (`_partials/related-posts.html`, `_partials/home/recent-posts.html`) to remove a section. Booleans such as `toc.enable`, `search.enable` and `prevNextNav.enable` do work as `false`.

## Profile and projects

The homepage portfolio reads from data files, **not** `params`:

- `data/profile.yaml` — bio, avatar, links. See [data-schemas.md](data-schemas.md).
- `data/projects.yaml` — featured projects grid. See [data-schemas.md](data-schemas.md).

## Per-post frontmatter

```yaml
---
title: "Tiêu đề bài viết"
date: 2026-05-07T19:00:00+07:00
lastmod: 2026-05-08T10:00:00+07:00  # shows "Cập nhật {date}" if at least 24h newer than date
draft: false
description: "Tóm tắt 1-2 câu (dùng cho meta + post-card)."
tags: ["hugo", "viet"]
categories: ["ghi-chu"]
toc: false        # opt out of TOC for this post (see "Table of contents" below)
comments: false   # opt out of comments for this post (default: enabled if giscus.enable)
license: false    # hide (or replace with a string) params.license for this post
cover:
  image: "img/cover.jpg"  # OG/Twitter card image (preferred)
image: "img/cover.jpg"    # legacy alias for `cover.image`; either works
---
```

## Optional

```yaml
menus:
  main:
    - name: "Bài viết"
      pageRef: /post
      weight: 10
    - name: "Lưu trữ"
      pageRef: /archives
      weight: 20
    - name: "Thẻ"
      pageRef: /tags
      weight: 30
```

`pageRef` entries link to the page's permalink, so they follow the base path and the language. Plain `url:` entries also work.

## Table of contents

A post gets a TOC when all of these hold: `params.toc.enable` is not `false`, the page is a single page, its word count exceeds `params.toc.minWordCount` (default 400), its frontmatter does not say `toc: false`, and its table of contents has at least one entry (a heading in the `markup.tableOfContents` range).

## Word count

`params.showWordCount: true` (default `false`) adds the word count after the reading time in the post byline; see [customization.md](customization.md#show-word-count).

## Languages

A single-language site needs only `languageCode` and `defaultContentLanguage` from the required block (Hugo 0.158 and later also accept `locale`, and the theme reads either). For more than one language, add a `languages:` map to the site config (see [Hugo's multilingual docs](https://gohugo.io/content-management/multilingual/)); the theme then:

- renders a language dropdown in the header that lists only the languages the current page exists in, so an untranslated post shows just its own language;
- remembers the reader's pick in `localStorage` (`lang`) and, on later visits, opens the page's translation in that language when one exists;
- emits `<link rel="alternate" hreflang>` for every translation plus `x-default` pointing at the page's own version in `defaultContentLanguage` (none when the page has no such translation). Paginated pages after the first emit no alternates and never redirect, since the other language's page N may not exist.

A post's translation is a sibling file in its bundle, such as `index.vi.md` next to `index.md`; it is served under `/<lang>/`. A file with no language suffix belongs to `defaultContentLanguage`, which is served at the site root. Each extra language also needs its own `_index.<lang>.md` for the home, `archives` and `search` sections, so its header menu and search page exist.

The theme bundles `i18n/vi.yml` and `i18n/en.yml`. To change a string, or to add another language, put a file with the same keys in the site's `i18n/` (for example `i18n/ja.yml`); site files override the theme's.

## Outputs

- **RSS** — `rss.xml` is Hugo's feed plus `params.rssFullContent`. Feed-only render hooks (`_markup/*.rss.xml`) make image and link URLs absolute, drop the heading `#` anchors and the table wrapper. Pages advertise a feed only when they have posts, so `archives/` and `search/` link none; give their `_index.md` `outputs: [html]` so Hugo does not write an empty `index.xml` either.
- **llms.txt** — the theme defines the `llmtxt` output format (`layouts/home.llmtxt.txt`): site title, description (the home page's `description`, else `params.description`), profile, recent posts and projects, with headings from the `i18n` files. Hugo never merges `outputs` from a theme, so list `llmtxt` in the site's `outputs.home`, as in the required block.
- **robots.txt** — `layouts/robots.txt` allows everything and points at the sitemap. Hugo renders it only when the site sets `enableRobotsTXT: true`.
- **Search** — `/search/?q=<term>` (or `?keyword=<term>`) pre-fills the Pagefind search.

## SEO output

nocturne emits SEO metadata in `_partials/head/seo.html` (called from `head.html`):

- **OpenGraph** — `og:title`, `og:description`, `og:url`, `og:type`, `og:site_name`, `og:locale`, one `og:locale:alternate` per translation, `og:image`. Posts (regular pages in `mainSections`) get `og:type=article` plus `article:published_time`, `article:modified_time`, `article:author` (only when an author profile URL is set), one `article:tag` per tag; other pages are `website`.
- **Twitter Card** — `summary_large_image` for a post or fallback image, `summary` for the avatar fallback or when there is no image; `twitter:site` + `twitter:creator` only when `params.social.twitter` is set.
- **JSON-LD Article schema** — emitted only on posts (regular pages in `mainSections`); covers `headline`, `url`, `datePublished`, `dateModified`, `inLanguage`, `author` and `publisher` (the same Person: name, URL from `params.profile.url`, image from `params.logo`, `sameAs` from the absolute `http(s)` links in `data/profile.yaml`), `image`, `description`, `keywords`.
- **JSON-LD WebSite schema** — `name`, `url` and `inLanguage`, on the home page of the default content language only.
- **OG image** — `_partials/head/image.html` owns the lookup order (post cover, post image, `params.og.fallbackImage`, then the `data/profile.yaml` avatar). Raster images found as resources are resized (fit 1200×1200 JPEG, 600×600 for the avatar) and get `og:image:width`/`og:image:height`.

To override, drop `_partials/head/seo.html` and/or `_partials/head/image.html` into your site `layouts/`.

## Why theme defaults don't merge

Hugo merges a theme's `params` and `outputFormats` into the site config, but not `markup`, `permalinks`, `pagination`, `taxonomies`, `related`, `outputs` or the language settings (`languageCode`, `defaultContentLanguage`). The theme's `hugo.yaml` therefore leaves them all out; the [required block](#required) is the only place they are given, and consumer sites must copy it.

## Theme contract: taxonomies and content

Conventions the theme assumes; deviating from them produces broken links or unstyled output.

- **Taxonomy keys** — the singular keys in `taxonomies:` must be `tag` and `category`; the plural names (`tags`, `categories`) are referenced by name in templates (`.GetTerms "tags"`). Renaming the plural breaks tag rendering. Keep the defaults shown above.
- **Tag titles for Vietnamese diacritics** — `.GetTerms "tags"` returns `LinkTitle`, which falls back to the URL slug if no `_index.md` exists for that term. To display `Ghi chú` instead of `ghi-chu`, create `content/tags/ghi-chu/_index.md` with `title: "Ghi chú"`.
- **`params.search.enable: false`** — removes the header button and the Pagefind UI loader; `/search/` still resolves and shows a "search disabled" notice. If you want it to 404 entirely, also delete `content/search/_index.md` from your site.
- **`profile.bio` is trusted-author input** — see [data-schemas.md](data-schemas.md) for the security note.
