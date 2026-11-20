---
title: "Shortcode có sẵn của Hugo"
date: 2026-08-20T19:30:00+07:00
description: "figure, details, highlight, qr, param, ref và relref — những shortcode Hugo mang sẵn, chạy được với nocturne mà theme không phải thêm cái nào."
categories: ["demo"]
tags: ["shortcode", "hugo"]
---

Shortcode là một đoạn template nhỏ gọi từ giữa Markdown, viết trong cặp ngoặc `{{</* tên tham-số */>}}`. Hugo mang sẵn một bộ shortcode, và bài này thử lần lượt từng cái. Mỗi mục có đoạn mã nguồn trước, kết quả ngay sau.

Các shortcode nhúng nội dung bên thứ ba (YouTube, Vimeo, X, Instagram) không có mặt ở đây: chúng tải mã từ máy chủ của bên khác ngay khi trang mở, điều mà một trang demo không nên ép người xem nhận.

## Vì sao nocturne không có shortcode riêng

Một bài dùng shortcode riêng của theme sẽ gắn chặt với theme đó: đổi sang theme khác là bản build báo lỗi ngay ở bài ấy, và bạn phải sửa từng tệp. nocturne muốn nội dung của bạn mãi là Markdown thuần, đọc được trên GitHub, trong trình soạn thảo, và dời đi đâu cũng được.

Những gì theme cần làm với nội dung đều đi qua render hook: ảnh có chú thích, hộp thông báo kiểu GitHub, bảng cuộn ngang, liên kết tới tệp `.md`. Bạn viết cú pháp Markdown chuẩn, theme lo phần hiển thị. Nếu thật sự cần một shortcode, hãy đặt nó trong `layouts/_shortcodes/` của site — nó thuộc về nội dung của bạn, không thuộc về theme.

## figure

Ảnh có chú thích và liên kết, viết bằng shortcode thay vì cú pháp ảnh của Markdown:

```markdown
{{</* figure
  src="https://tiennm99.github.io/nocturne/img/tinh-tu-static.png"
  alt="Màn hình thử sóng với sáu sọc màu dọc"
  caption="Màn hình thử sóng, đặt trong thư mục static."
  link="https://en.wikipedia.org/wiki/Test_card"
*/>}}
```

{{< figure
  src="https://tiennm99.github.io/nocturne/img/tinh-tu-static.png"
  alt="Màn hình thử sóng: sáu sọc dọc đỏ, xanh lá, vàng, xanh dương, hồng tím và xanh lơ, một vệt cầu vồng chạy chéo qua"
  caption="Màn hình thử sóng, đặt trong thư mục static. Bấm vào ảnh để đọc về loại hình này (tiếng Anh)."
  link="https://en.wikipedia.org/wiki/Test_card"
>}}

Với ảnh trong bundle, cú pháp Markdown `![alt](anh.jpg "chú thích")` cho ra cùng một `<figure>` mà còn có thêm `srcset`; xem [bài về hình ảnh](/post/2026/06/12/hinh-anh/index.md).

> [!WARNING] Site nằm trong thư mục con
> `figure` tìm `src` trong bundle rồi trong `assets/`, nhưng không thêm đường dẫn gốc cho tệp trong `static/`. Trang demo chạy dưới `/nocturne/`, nên `src="/img/tinh-tu-static.png"` sẽ trỏ ra ngoài site; vì thế ví dụ trên dùng URL đầy đủ. Cú pháp ảnh của Markdown không vướng chuyện này, vì render hook của theme tự thêm đường dẫn gốc.

## details

Khối đóng mở, nội dung bên trong vẫn viết bằng Markdown:

```markdown
{{</* details summary="Xem phần đầu của hugo.yaml" */>}}
...
{{</* /details */>}}
```

{{< details summary="Xem phần đầu của hugo.yaml" >}}
Ba dòng mở đầu `hugo.yaml` của một site tiếng Việt dùng nocturne:

```yaml
theme: nocturne
languageCode: vi
defaultContentLanguage: vi
```

Khối cấu hình bắt buộc đầy đủ có trong [tài liệu cấu hình](https://github.com/tiennm99/nocturne/blob/main/docs/config.md).
{{< /details >}}

Thêm `open=true` để khối mở sẵn khi trang tải.

## highlight

Cùng bộ tô màu với khối code có rào, nhưng tùy chọn được truyền như tham số của shortcode:

```markdown
{{</* highlight go "linenos=inline,hl_lines=3" */>}}
...
{{</* /highlight */>}}
```

{{< highlight go "linenos=inline,hl_lines=3" >}}
func greet(name string) string {
	if name == "" {
		name = "bạn"
	}
	return "Chào " + name
}
{{< /highlight >}}

Trong bài viết, khối code có rào như ` ```go {hl_lines=3} ` gọn hơn; `highlight` hữu ích khi code nằm trong một template hay một shortcode khác.

## qr

Tạo mã QR lúc build, thành một ảnh PNG nằm cùng trang web:

```markdown
{{</* qr text="https://tiennm99.github.io/nocturne/" alt="..." /*/>}}
```

{{< qr text="https://tiennm99.github.io/nocturne/" alt="Mã QR dẫn tới trang demo của nocturne" />}}

Quét mã bằng điện thoại để mở trang demo này.

## param

Đọc một tham số, tìm ở front matter của trang trước rồi mới tới `params` của site:

| Mã nguồn                            | Kết quả                         |
| :---------------------------------- | :------------------------------ |
| `{{</* param "author" */>}}`          | {{< param "author" >}}          |
| `{{</* param "toc.minWordCount" */>}}` | {{< param "toc.minWordCount" >}} |
| `{{</* param "description" */>}}`     | {{< param "description" >}}     |

Dòng cuối là một cái bẫy nhỏ: site có `params.description`, nhưng bài này cũng có `description` trong front matter, nên `param` trả về mô tả của bài. Dấu chấm trong `toc.minWordCount` đi vào tham số lồng nhau.

## ref và relref

Hai shortcode này tìm một trang theo đường dẫn trong `content/` và trả về URL của nó. Nếu trang không tồn tại, bản build báo lỗi, nên liên kết hỏng không thể lọt lên mạng.

- `ref` trả về URL đầy đủ: `{{< ref "/post/2026/07/03/khoi-code" >}}`
- `relref` trả về đường dẫn tương đối với tên miền: `{{< relref "/post/2026/07/03/khoi-code" >}}`

Thường thì chúng nằm trong một liên kết Markdown, có thể kèm mảnh `#` trỏ tới một tiêu đề:

```markdown
[Dạo một vòng Markdown]({{</* relref "/post/2026/05/07/sample" */>}})
[mục Hộp thông báo]({{</* relref "/post/2026/05/07/sample#hop-thong-bao" */>}})
```

Kết quả: [Dạo một vòng Markdown]({{< relref "/post/2026/05/07/sample" >}}) và [mục Hộp thông báo]({{< relref "/post/2026/05/07/sample#hop-thong-bao" >}}) của bài ấy.

Với nocturne, một liên kết Markdown trỏ thẳng tới tệp như `[bài](/post/2026/05/07/sample/index.md)` cũng cho ra đúng URL ấy mà không cần shortcode; `ref` và `relref` vẫn hữu ích khi bạn muốn bản build dừng lại ngay nếu trang đích biến mất.
