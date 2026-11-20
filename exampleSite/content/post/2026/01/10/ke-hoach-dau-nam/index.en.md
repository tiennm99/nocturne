---
title: "Planning the new year"
date: 2026-01-10T08:00:00+07:00
draft: false
tags: ["ke-hoach", "theme", "hugo"]
categories: ["nhat-ky-hugo"]
description: "Starting the year with a small plan: three goals for six months, one of them a Hugo theme of my own."
---

At the start of each year I write down three things I want done by the end of June. Never more, because a long list never gets finished. This year one of the three is the Hugo theme I mentioned in [my notes from August](/post/2025/08/15/ghi-chu-hugo/index.md): `nocturne`.

## Why write my own

The theme I use works, but it is heavy. It has a slider, animations, and a whole folder of JavaScript I have never opened. Writing my own is the only way to know why each line is there.

## Goals

1. No build step for CSS or JS: just Hugo and the ES modules browsers already understand.
2. Vietnamese first. Other languages are a bonus, not a requirement.
3. The home page is a portfolio; the posts are everything else.

## How I'll know

A goal you cannot check is only a wish, so each one gets a simple test:

- [x] The site runs with `hugo server` and no `npm install`.
- [ ] A long post reads comfortably on a phone, even with JavaScript off.
- [ ] One post in Vietnamese plus an English version, and switching between them never loses your place.

## Not doing

This list matters as much as the one above: no self-hosted comments, no icon library, no CSS framework. When something is needed, write exactly that part.

More once the theme has taken shape.
