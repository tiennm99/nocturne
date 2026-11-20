---
title: "Ghi chú về Hugo và trang tĩnh"
date: 2025-08-15T09:00:00+07:00
draft: false
tags: ["hugo", "markdown", "ghi-chep"]
categories: ["nhat-ky-hugo"]
description: "Quay lại với Hugo sau một thời gian dài: quy ước thư mục layout mới, asset pipeline, render hook và vài suy nghĩ về việc giữ một trang web nhỏ."
---

Hugo là một trình tạo trang tĩnh viết bằng Go. Lần này quay lại sau khá lâu, nhiều thứ đã đổi. Đây là ghi chú cá nhân, không phải hướng dẫn: những điều tôi muốn nhớ trước khi bắt tay vào việc lớn hơn.

## Quy ước layout mới

Từ bản 0.146, các thư mục đặc biệt trong `layouts/` mang dấu gạch dưới ở đầu: `_partials`, `_markup`, `_shortcodes`. Dấu gạch dưới tách chúng khỏi tên section, nên một section tên `partials` không còn bị nhầm với thư mục chứa partial.

### Thư mục `_partials`

Chứa các mảnh template dùng lại được: header, footer, thẻ bài viết. Section là một loại nội dung; partial chỉ là một mảnh giao diện.

### Thư mục `_markup`

Chứa render hook cho Markdown: heading, liên kết, hình ảnh, khối code, bảng, blockquote. Hugo tự tìm đến khi render nội dung, không cần khai báo ở đâu cả.

### Thư mục `_shortcodes`

Đúng như tên gọi. Shortcode đặt ở đây trong site sẽ ghi đè shortcode cùng tên của theme.

## Asset pipeline

Hugo không cần công cụ build bên ngoài. `resources.Get` lấy file trong `assets/`, `resources.Concat` nối lại, `minify` nén, `fingerprint` thêm mã băm vào tên file. Với một trang nhỏ đến vừa, chừng ấy là đủ.

```yaml
markup:
  goldmark:
    parser:
      autoHeadingIDType: github-ascii
```

Dòng cấu hình nhỏ này giải quyết một chuyện lớn cho người viết tiếng Việt: ID của heading được sinh ở dạng ASCII, ổn định và an toàn trong URL. "Thư mục" thành `#thu-muc`, không còn chuỗi ký tự mã hoá phần trăm dài ngoằng. Chỉ có chữ "đ" bị bỏ hẳn thay vì thành "d"; khi cần, đặt ID tay ngay sau tiêu đề, như `{#di-tiep}` ở mục cuối bài này.

## Render hook

Render hook cho phép can thiệp vào cách Markdown được render mà không phải viết extension cho Goldmark. Một template nhỏ trong `_markup/` là đủ.

Vài việc hay dùng:

- thêm liên kết neo `#` cạnh heading;
- gắn `rel="noopener"` cho liên kết ra ngoài;
- cho ảnh `srcset`, kích thước và `loading="lazy"` để trang không bị giật khi tải.

## Vài điều giữ lại {#vai-dieu-giu-lai}

- Markdown thuần là tài sản lâu dài. Trình tạo trang nào cũng đọc được nó.
- Hugo hiếm khi là thứ làm build chậm. Nếu chậm, thủ phạm thường là xử lý ảnh hoặc một pipeline tài nguyên quá tay.
- Theme nhẹ thì trang nhẹ. Mỗi byte CSS hay JS đều phải đi qua mạng tới người đọc.
- Tự viết theme là cách hiểu rõ từng dòng. Theme có sẵn tiện thật, nhưng mang theo nhiều thứ mình không cần.

## Đi tiếp {#di-tiep}

Việc cho mấy tháng tới: viết một theme Hugo của riêng mình, nhỏ, không bước build, ưu tiên tiếng Việt. Tên nó là `nocturne`. Tôi sẽ vừa viết vừa ghi lại quá trình trong loạt bài này.

Bài sau có lẽ sẽ là kế hoạch cụ thể, rồi đến phần CSS và cách làm chế độ tối mà không bị nháy sáng ở lần tải đầu.
