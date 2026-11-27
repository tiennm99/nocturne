---
title: "Code blocks"
date: 2026-07-03T21:00:00+07:00
description: "Syntax highlighting for Go, Python, Bash, YAML, JavaScript, diff and JSON, plus line numbers, highlighted lines and a copy button."
categories: ["demo"]
tags: ["code", "markdown"]
---

Hugo highlights code at build time with Chroma, so the page needs no JavaScript library for it. The site sets `markup.highlight.noClasses: false`: Chroma only adds CSS classes, and the colours live in the theme's `syntax.css`, switching with light and dark mode. Each block has a language label and a **Copy** button in its top corner.

## Seven languages

### Go

```go
package main

import (
	"fmt"
	"time"
)

func main() {
	now := time.Now()
	fmt.Printf("Hello from nocturne at %s\n", now.Format("15:04"))
}
```

### Python

```python
from pathlib import Path


def count_posts(root: Path) -> int:
    """Count posts: each post is a folder holding an index.md."""
    return sum(1 for _ in root.rglob("index.md"))


print(count_posts(Path("content/post")))
```

### Bash

```bash
#!/usr/bin/env bash
set -euo pipefail

# Create a bundle for a new post, dated today
day=$(date +%Y/%m/%d)
hugo new content "post/$day/new-post/index.md"
hugo server --buildDrafts
```

### YAML

```yaml
markup:
  highlight:
    noClasses: false   # colours live in the theme's syntax.css
params:
  toc:
    enable: true
    minWordCount: 400
```

### JavaScript

```javascript
// Collapse a burst of calls into one, for example while the user is typing
export function debounce(fn, wait = 200) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), wait);
  };
}
```

### Diff

```diff
 params:
   toc:
-    minWordCount: 400
+    minWordCount: 250
   showWordCount: true
```

### JSON

```json
{
  "title": "Code blocks",
  "tags": ["code", "markdown"],
  "draft": false,
  "readingTime": 3
}
```

## Line numbers

Add attributes after the language name on the opening fence. `{linenos=table}` puts the line numbers in a column of their own, fully apart from the code:

```go {linenos=table}
func reverse(s string) string {
	r := []rune(s)
	for i, j := 0, len(r)-1; i < j; i, j = i+1, j-1 {
		r[i], r[j] = r[j], r[i]
	}
	return string(r)
}
```

`{linenos=inline}` writes the numbers at the start of each line of code:

```python {linenos=inline}
words = "a sky full of stars tonight".split()
longest = max(words, key=len)
print(longest)
```

`linenostart` picks the first number, handy when quoting a few lines from the middle of a long file:

```yaml {linenos=table linenostart=42}
pagination:
  pagerSize: 5
  path: page
```

## Highlighted lines

`{hl_lines=[2,"4-5"]}` highlights line 2 and lines 4 to 5, drawing the reader's eye to what matters:

```javascript {hl_lines=[2,"4-5"]}
const root = document.documentElement;
const saved = localStorage.getItem("theme");
if (saved) {
  root.dataset.theme = saved;
  console.log(`Theme: ${saved}`);
}
```

## No language

A fence without a language shows plain monospace text with no colours and no label, but it still gets a copy button:

```
nocturne/
├── layouts/
├── assets/
└── exampleSite/
```

A block indented by four spaces is Markdown's older code syntax, and it is treated just the same:

    hugo version
    hugo env

## The copy button

The **Copy** button copies the code exactly, keeping the lines as they are in the source. Line numbers are left out, whether they sit in their own column (`table`) or inside the code (`inline`), so whatever you paste runs as is. After a click the button reads **Copied** for a moment, and screen readers announce the result too.

The button only appears when the browser allows writing to the clipboard, which means over HTTPS or on `localhost`. When you print the page, copy buttons are hidden.
