# Migrating from hugo-theme-stack

nocturne extracts Stack's information architecture (posts, tags, categories, archive, search, comments) and rewrites the visual layer + asset pipeline. Most posts will render unchanged. This guide covers what to delete, what to add, and where Stack-isms hide.

## What carries over

- Post frontmatter: `title`, `date`, `description`, `tags`, `categories`, `image`, `draft`
- Content path convention `content/post/YYYY/MM/DD/slug/index.md`
- Permalink shape `/:year/:month/:day/:slug/` (use `:slugorcontentbasename` on nocturne: clean ASCII from the file name, `slug:` still wins)
- Tags and categories taxonomies
- Archive page (`content/archives/_index.md`)
- Giscus comment provider

## What changes

### Replace the theme

Remove the Stack submodule:

```bash
git submodule deinit themes/hugo-theme-stack
git rm themes/hugo-theme-stack
```

Then import nocturne as a Hugo Module (see [installation.md](installation.md)).

### Replace `theme:`

```yaml
# was: theme: hugo-theme-stack
module:
  imports:
    - path: github.com/tiennm99/nocturne
```

### Drop these (Stack-only)

- `params.sidebar.*` — nocturne has no sidebar
- `params.widgets.*` — no widget system; portfolio is in homepage hero/projects
- `params.article.headingAnchor` — the heading render hook always adds anchors; to drop them, override `_markup/render-heading.html` in your site
- `params.colorScheme.toggleIcon` — fixed icon
- `params.imageProcessing.*` — nocturne uses Hugo's default image processing
- `params.comments.provider` — only Giscus is supported; no Disqus / Utterances / Waline
- TypeScript build pipeline (`assets/ts/`, `tsconfig.json`) — nocturne ships ES modules directly
- SCSS pipeline (`assets/scss/`) — nocturne uses plain CSS with custom properties

### Param mapping

| Stack | nocturne | Notes |
|---|---|---|
| `params.description` | `params.description` | unchanged |
| `params.sidebar.avatar.src` | `data/profile.yaml: avatar` | now data-driven |
| `params.sidebar.subtitle` | `data/profile.yaml: tagline` | |
| `params.sidebar.emoji` | — | dropped |
| `params.menu.social[].icon` | `data/profile.yaml: links[].icon` | same icon names |
| `params.article.toc` | `params.toc.enable` + per-post `toc:` | |
| `params.search.fuse` | — | replaced by Pagefind (different config; see [config.md](config.md)) |
| `params.colorScheme.default` | — | always dark by default; the light pick from the toggle persists in localStorage |
| `params.dateFormat.published` | — | uses `time.Format ":date_long"` with site language |
| `params.imageProcessing.cover.enabled` | — | dropped; the cover image is used for the OG/Twitter card only, not rendered on the page |

### Content frontmatter

Stack-specific fields ignored without error:

- `image` — Stack used this for sidebar cover; nocturne uses it for OG image only
- `categories[0]` weight quirks — nocturne uses Hugo defaults
- `menu`, `weight` — still respected
- `slug` — still respected

No content rewrite required for typical posts.

## Required additions

Add the [required block from config.md](config.md#required) to your `hugo.yaml`; Hugo does not merge those keys from the theme. It includes `markup.highlight.noClasses: false`, which the theme's syntax colours need.

If your existing permalink scheme differs, **keep it** — the theme works with any permalink shape.

## Build and verify

```bash
hugo --gc --minify
```

Spot-check 5–10 posts in the rendered output. Common surprises:

- **TOC appears unexpectedly**: shown on posts over `params.toc.minWordCount` words (default 400) with at least one heading (see [config.md](config.md#table-of-contents)). Add `toc: false` to opt out.
- **Heading IDs changed**: switching to `autoHeadingIDType: github-ascii` produces different anchor slugs. Old `#lập-trình` becomes `#lap-trinh`. Inbound links from external sites break. Mitigate with redirects, or skip the `autoHeadingIDType` change and accept Vi diacritics in fragment URLs.
- **Search results paths**: rebuild Pagefind index (`npx pagefind --site public`); the old Fuse.js JSON index becomes dead weight.

## Not supported (consider before migrating)

- KaTeX math. A site can add math itself through Goldmark's passthrough extension and its own `head/custom.html` [site hook](customization.md#site-hooks).
- Tag cloud widget
- Image gallery shortcode
- Any Stack-specific shortcode (`gallery`, `keyword`, `bilibili`, etc.)

If you rely on these heavily, add them in your site's `layouts/` or stay on Stack.
