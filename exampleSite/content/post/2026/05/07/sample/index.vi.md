---
title: "Dạo một vòng Markdown"
date: 2026-05-07T19:00:00+07:00
lastmod: 2026-05-21T08:30:00+07:00
description: "Một bài gom đủ cú pháp Markdown mà Hugo hỗ trợ — chữ, danh sách, bảng, chú thích, hộp thông báo — để xem nocturne trình bày chúng ra sao."
categories: ["demo"]
tags: ["markdown", "hugo", "theme"]
---

Bài này là một chuyến dạo ngắn qua Markdown: mỗi mục dùng một cú pháp và cho thấy nocturne hiển thị nó thế nào. Muốn đối chiếu với mã nguồn, hãy bấm liên kết sửa bài ở cuối trang — nó mở đúng tệp `index.md` này trên GitHub.

Bài đủ dài nên có mục lục. Trên màn hình rộng, mục lục đứng yên bên cạnh và tô sáng phần bạn đang đọc; trên điện thoại, nó nằm gọn phía trên nội dung.

## Chữ và liên kết

Một câu bình thường có thể chứa **chữ đậm**, *chữ nghiêng*, ***cả hai cùng lúc***, ~~một ý đã bỏ~~ và `mã inline` như `hugo server --buildDrafts`. Phím tắt thì viết bằng thẻ HTML: <kbd>Ctrl</kbd> + <kbd>C</kbd>.

Đoạn này được gắn lớp `lead` bằng thuộc tính Markdown đặt ngay ở dòng dưới. Theme không định kiểu cho lớp ấy, nhưng nó vẫn có mặt trong HTML để CSS của riêng bạn bám vào.
{.lead}

Liên kết ra ngoài như [tài liệu của Hugo](https://gohugo.io/documentation/) tự nhận thêm `rel="noopener noreferrer"`. Liên kết nội bộ có thể trỏ thẳng vào tệp Markdown: [bài về hình ảnh](/post/2026/06/12/hinh-anh/index.md) được đổi thành đường dẫn thật của bài, còn [phần số dòng trong bài khối code](/post/2026/07/03/khoi-code/index.md#so-dong) giữ nguyên cả mảnh `#so-dong`. Sau này có đổi cấu trúc URL, liên kết cũng không gãy.

### Mục con mang lớp riêng {.special}

Tiêu đề phía trên có thuộc tính `{.special}`. Lớp được giữ lại, còn `id` vẫn sinh tự động từ chữ không dấu, nên mục lục và dấu `#` hiện ra khi rê chuột vẫn hoạt động.

## Danh sách và việc cần làm

Danh sách không thứ tự, lồng nhau:

- Nội dung
  - Bài viết
  - Trang giới thiệu
- Giao diện
  - Chế độ sáng và tối
  - Phông chữ đọc tốt tiếng Việt

Danh sách có thứ tự, mỗi cấp đánh số riêng:

1. Tạo thư mục cho bài viết.
2. Viết `index.md`, rồi thêm bản dịch `index.en.md` bên cạnh.
   1. Giữ nguyên ngày, chuyên mục và thẻ.
   2. Dịch tiêu đề, mô tả và nội dung.
3. Chạy `hugo server` và đọc lại một lượt.

Danh sách công việc:

- [x] Viết bản nháp
- [x] Thêm ảnh vào bundle
- [ ] Nhờ một người bạn đọc thử
- [ ] Đăng bài

### Danh sách thuật ngữ

Bundle
: Thư mục chứa `index.md` cùng ảnh và tệp đi kèm của một bài.

Front matter
: Khối YAML ở đầu tệp, nơi khai báo tiêu đề, ngày, thẻ và chuyên mục.

Render hook
: Template nhỏ quyết định cách Hugo xuất ảnh, liên kết, tiêu đề, bảng và trích dẫn.

## Bảng

Dấu hai chấm trong dòng phân cách quyết định căn lề của từng cột:

| Cú pháp (trái) | Kết quả (giữa) | Số ký tự (phải) |
| :------------- | :------------: | --------------: |
| `**đậm**`      | **đậm**        | 7               |
| `*nghiêng*`    | *nghiêng*      | 9               |
| `~~gạch~~`     | ~~gạch~~       | 8               |
| `` `mã` ``     | `mã`           | 4               |

### Bảng rộng

Bảng nhiều cột được bọc trong một vùng cuộn ngang, nên trang không bị kéo giãn trên điện thoại. Vùng cuộn nhận tiêu điểm, nên người dùng bàn phím cũng cuộn được bằng phím mũi tên.

| Định dạng | Phần mở rộng | Theme xử lý | `srcset` WebP | `width` và `height` | Ảnh động | Nền trong suốt | Hợp với |
| :-------- | :----------- | :---------- | :-----------: | :-----------------: | :------: | :------------: | :------ |
| JPEG      | `.jpg`, `.jpeg` | Đổi cỡ      | Có            | Có                  | Không    | Không          | Ảnh chụp, ảnh nhiều chi tiết |
| PNG       | `.png`       | Đổi cỡ      | Có            | Có                  | Không    | Có             | Ảnh chụp màn hình, hình vẽ phẳng |
| WebP      | `.webp`      | Đổi cỡ      | Có            | Có                  | Có thể   | Có             | Hầu hết mọi thứ trên web hiện nay |
| SVG       | `.svg`       | Giữ nguyên  | Không         | Không               | Có thể   | Có             | Biểu tượng, sơ đồ, logo |
| GIF       | `.gif`       | Giữ nguyên  | Không         | Không               | Có       | Có             | Hoạt hình ngắn, vài màu |

#### Khi nào nên dùng bảng

Bảng hợp với dữ liệu so sánh theo hàng và cột. Với một chuỗi bước làm lần lượt, danh sách có thứ tự dễ đọc hơn trên màn hình hẹp.

## Trích dẫn

Một blockquote thường, không có kiểu hộp:

> Đi một ngày đàng, học một sàng khôn.
>
> — Tục ngữ Việt Nam

## Hộp thông báo

Năm kiểu hộp thông báo của GitHub đều có mặt. Tiêu đề mặc định được dịch theo ngôn ngữ của trang.

> [!NOTE]
> Thông tin phụ mà người đọc nên biết, kể cả khi chỉ đọc lướt.

> [!TIP]
> Chạy `hugo server --navigateToChanged` để trình duyệt tự nhảy tới trang vừa sửa.

> [!IMPORTANT]
> Bản dịch nằm cạnh bản gốc trong cùng bundle, với tên tệp `index.en.md`.

> [!WARNING]
> Hugo không gộp `markup` từ theme, nên hãy chép khối cấu hình bắt buộc vào `hugo.yaml` của site.

> [!CAUTION]
> `draft: true` giấu bài khỏi bản build, nhưng tệp vẫn nằm trong kho mã. Kho công khai thì ai cũng đọc được.

Ngay sau `[!TIP]` có thể viết một tiêu đề riêng thay cho tên mặc định:

> [!TIP] Viết ngắn thôi
> Hộp thông báo hiệu quả nhất khi chỉ có một hai câu. Dài hơn thế, có lẽ nó nên là một mục riêng.

## Chú thích cuối trang

Hugo dùng Goldmark để chuyển Markdown thành HTML[^goldmark]. Chú thích có thể đặt tên bằng chữ thay cho số[^ten-goi], và phần nội dung luôn dồn xuống cuối bài, kèm mũi tên quay lại chỗ đang đọc.

[^goldmark]: Goldmark là bộ phân tích Markdown viết bằng Go, tuân theo đặc tả CommonMark.
[^ten-goi]: Tên chỉ dùng trong mã nguồn; trên trang, chú thích vẫn được đánh số theo thứ tự xuất hiện.

## Nội dung thu gọn

Site bật `markup.goldmark.renderer.unsafe`, nên HTML viết tay đi thẳng ra trang. Thẻ `<details>` tạo một khối đóng mở mà không cần JavaScript:

<details>
<summary>Vì sao mỗi bài có hai tệp?</summary>

Mỗi bài là một bundle. `index.md` là bản tiếng Việt, ngôn ngữ mặc định của site; `index.en.md` là bản tiếng Anh. Hugo tự ghép hai tệp thành một cặp bản dịch, và nút chọn ngôn ngữ dẫn thẳng sang bài tương ứng.

</details>

Hugo cũng có shortcode `details` làm cùng việc này; xem [bài về shortcode](/post/2026/08/20/shortcodes/index.md).

---

Đường kẻ ngang phía trên là ba dấu `---` đứng riêng giữa hai dòng trống. Bài được sửa sau ngày đăng, nên dưới tiêu đề có thêm ngày cập nhật.
