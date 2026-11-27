---
title: "Khối code"
date: 2026-07-03T21:00:00+07:00
description: "Tô màu cú pháp cho Go, Python, Bash, YAML, JavaScript, diff và JSON, cùng số dòng, dòng tô sáng và nút sao chép."
categories: ["demo"]
tags: ["code", "markdown"]
---

Hugo tô màu code ngay lúc build bằng Chroma, nên trang không cần thêm thư viện JavaScript nào cho việc này. Site đặt `markup.highlight.noClasses: false`: Chroma chỉ gắn lớp CSS, còn màu nằm trong `syntax.css` của theme và tự đổi theo chế độ sáng hay tối. Góc trên mỗi khối có nhãn ngôn ngữ và nút **Sao chép**.

## Bảy ngôn ngữ

### Go

```go
package main

import (
	"fmt"
	"time"
)

func main() {
	now := time.Now()
	fmt.Printf("Xin chào từ nocturne lúc %s\n", now.Format("15:04"))
}
```

### Python

```python
from pathlib import Path


def count_posts(root: Path) -> int:
    """Đếm số bài: mỗi bài là một thư mục có index.md."""
    return sum(1 for _ in root.rglob("index.md"))


print(count_posts(Path("content/post")))
```

### Bash

```bash
#!/usr/bin/env bash
set -euo pipefail

# Tạo bundle cho bài mới theo ngày hôm nay
day=$(date +%Y/%m/%d)
hugo new content "post/$day/bai-moi/index.md"
hugo server --buildDrafts
```

### YAML

```yaml
markup:
  highlight:
    noClasses: false   # màu nằm trong syntax.css của theme
params:
  toc:
    enable: true
    minWordCount: 400
```

### JavaScript

```javascript
// Gộp nhiều lần gọi liên tiếp thành một, ví dụ khi người dùng đang gõ
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
  "title": "Khối code",
  "tags": ["code", "markdown"],
  "draft": false,
  "readingTime": 3
}
```

## Số dòng

Thêm thuộc tính ngay sau tên ngôn ngữ trên dòng mở khối. `{linenos=table}` đặt số dòng vào một cột riêng, tách hẳn khỏi phần code:

```go {linenos=table}
func reverse(s string) string {
	r := []rune(s)
	for i, j := 0, len(r)-1; i < j; i, j = i+1, j-1 {
		r[i], r[j] = r[j], r[i]
	}
	return string(r)
}
```

`{linenos=inline}` viết số dòng ngay đầu mỗi dòng code:

```python {linenos=inline}
words = "đêm nay trời nhiều sao".split()
longest = max(words, key=len)
print(longest)
```

`linenostart` chọn số bắt đầu, tiện khi trích một đoạn giữa tệp dài:

```yaml {linenos=table linenostart=42}
pagination:
  pagerSize: 5
  path: page
```

## Tô sáng dòng

`{hl_lines=[2,"4-5"]}` tô sáng dòng 2 và các dòng từ 4 đến 5 để kéo mắt người đọc tới chỗ quan trọng:

```javascript {hl_lines=[2,"4-5"]}
const root = document.documentElement;
const saved = localStorage.getItem("theme");
if (saved) {
  root.dataset.theme = saved;
  console.log(`Giao diện: ${saved}`);
}
```

## Không có ngôn ngữ

Khối không ghi ngôn ngữ hiện chữ đơn cách, không tô màu và không có nhãn, nhưng vẫn có nút sao chép:

```
nocturne/
├── layouts/
├── assets/
└── exampleSite/
```

Khối thụt lề bốn dấu cách là cú pháp code cũ của Markdown, và được đối xử y như vậy:

    hugo version
    hugo env

## Nút sao chép

Nút **Sao chép** chép đúng nội dung code, giữ nguyên các dòng như trong tệp nguồn. Số dòng không bị chép theo, dù chúng nằm ở cột riêng (`table`) hay ngay trong code (`inline`), nên đoạn dán ra chạy được ngay. Sau khi bấm, nút đổi thành **Đã sao chép** trong chốc lát, và trình đọc màn hình cũng đọc lên kết quả.

Nút chỉ hiện khi trình duyệt cho phép ghi vào bộ nhớ tạm, tức là trên HTTPS hoặc `localhost`. Khi in trang, nút sao chép được ẩn đi.
