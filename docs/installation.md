# Installation

nocturne is a [Hugo Module](https://gohugo.io/hugo-modules/). Hugo Modules need [Go](https://go.dev/doc/install) wherever the site builds, locally and in CI.

## Add the module

Turn your site into a module once, then import the theme in your site `hugo.yaml`:

```bash
hugo mod init github.com/<you>/<your-site>
```

```yaml
module:
  imports:
    - path: github.com/tiennm99/nocturne
```

The first build downloads the theme and records its version in `go.mod` and `go.sum`; commit both. There are no tagged releases, so `go.mod` pins a pseudo-version of a `main` commit. To move to the latest `main`:

```bash
hugo mod get -u github.com/tiennm99/nocturne
```

Keep your changes in your site's `layouts/` and `assets/` (see [`customization.md`](customization.md)) instead of editing the theme, so an update does not overwrite them.

## Work on the theme locally

To try theme edits in a site before pushing them, point the module at a local checkout of this repo:

```bash
HUGO_MODULE_REPLACEMENTS="github.com/tiennm99/nocturne -> /path/to/nocturne" hugo server
```

The demo site in `exampleSite/` loads the theme straight from this checkout, so it shows theme edits with no module setup:

```bash
cd exampleSite && hugo server
```

Pushes to `main` rebuild it and deploy it to GitHub Pages (`.github/workflows/pages.yml`).

## Required site config

Hugo merges only `params` and `outputFormats` from the theme, so the rest of the config the theme needs (markup, permalinks, related posts, outputs, language) must be set in your *site* `hugo.yaml`. The block to copy is in [`config.md`](config.md#required).

Drop a `data/profile.yaml` and `data/projects.yaml` next; see [`data-schemas.md`](data-schemas.md).

## Content pages

`/search/` and `/archives/` render only when the site has a section page for them. Create both, with HTML output only so Hugo writes no empty feed for them:

```yaml
# content/search/_index.md
---
title: "Search"
description: "Search all posts."   # optional
outputs: [html]
---
```

```yaml
# content/archives/_index.md
---
title: "Archives"
outputs: [html]
---
```

Add them to the main menu if you want header links (see [`config.md`](config.md#optional)).

## Pagefind search

Pagefind indexes content **after** Hugo builds. The theme assumes you run it as part of your build pipeline — it's not bundled into the layout.

Install Pagefind in your site and run it after Hugo, locally and in CI:

```bash
npm install --save-dev pagefind
npx pagefind --site public
```

`hugo server` does not run Pagefind, so search works locally only after `hugo && npx pagefind --site public --serve`.

If you don't want search at all, set `params.search.enable: false` in your `hugo.yaml` and skip the Pagefind step entirely.

## Verify

After installing, run `hugo server` from your site. You should see:

- Homepage with hero, optional projects grid, recent posts
- the post section list (`/post/`, or whichever section `mainSections` names) with pagination
- `/tags/<slug>/`, `/categories/<slug>/`, `/archives/`
- Single post with reading-time byline, related posts at the bottom
- `<head>` containing OG, Twitter, JSON-LD on posts; `<meta name=generator content="nocturne">`

If something looks off, see [`customization.md`](customization.md) for override patterns, or open an issue at [tiennm99/nocturne](https://github.com/tiennm99/nocturne/issues).
