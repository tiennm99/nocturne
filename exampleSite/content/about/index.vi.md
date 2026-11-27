---
title: "Giới thiệu"
description: "Trang demo của nocturne: trang chủ gồm những gì, các bài trình diễn tính năng nằm ở đâu và cách đổi ngôn ngữ, giao diện."
comments: false
toc: false
---

Đây là trang demo của [nocturne](https://github.com/tiennm99/nocturne), một theme Hugo cho blog kèm portfolio cá nhân: ưu tiên tiếng Việt, nền tối mặc định, không cần bước build. Mọi tính năng của theme đều được bật ở đây, và mỗi bài viết trình diễn một vài trong số đó. "Your Name" là một nhân vật giả định; thay bằng tên bạn khi dùng theme.

## Trang chủ gồm những gì

[Trang chủ](/) là portfolio, ghép từ ba phần:

1. **Phần giới thiệu**: tên, dòng mô tả ngắn, ảnh đại diện, tiểu sử và các đường dẫn, lấy từ `data/profile.yaml`.
2. **Dự án nổi bật**: lưới thẻ dự án lấy từ `data/projects.yaml`. Thẻ nào có ảnh, liên kết demo hay thẻ phân loại thì hiện thêm phần đó.
3. **Bài viết gần đây**: năm bài mới nhất trong mục [Bài viết](/post/), kèm liên kết xem tất cả.

## Các bài trình diễn

Bài viết được chia thành ba chuyên mục, mỗi chuyên mục cho thấy một nhóm tính năng:

- [Demo](/categories/demo/) gom các bài kỹ thuật: [một vòng Markdown](/post/2026/05/07/sample/index.md) với bảng, chú thích, hộp lưu ý; [hình ảnh](/post/2026/06/12/hinh-anh/index.md) với `srcset`, chú thích ảnh và video thay GIF; [khối code](/post/2026/07/03/khoi-code/index.md) với tô sáng dòng và nút sao chép; [shortcode](/post/2026/08/20/shortcodes/index.md) có sẵn của Hugo.
- [Nhật ký Hugo](/categories/nhat-ky-hugo/) là một loạt bài: chip chuyên mục ở trên tiêu đề, liên kết bài trước, bài sau chỉ đi trong loạt, và bài liên quan ở cuối trang.
- [Ghi chú](/categories/ghi-chu/) cho thấy các tuỳ chỉnh theo từng bài: [một bài](/post/2025/12/01/cuoi-nam/index.md) tắt bình luận và dùng dòng giấy phép riêng, [một bài khác](/post/2026/03/22/doc-sach-quan-sat/index.md) tắt mục lục và hiện ngày cập nhật.

Ngoài ra còn có [Lưu trữ](/archives/) xếp bài theo năm và tháng, trang [Tìm kiếm](/search/) dùng Pagefind, danh sách [thẻ](/tags/) và [chuyên mục](/categories/).

## Đổi ngôn ngữ và giao diện {#doi-ngon-ngu-va-giao-dien}

Trang có hai ngôn ngữ, tiếng Việt và tiếng Anh. Nút quả địa cầu ở góc trên bên phải mở danh sách các bản dịch của trang đang xem; lựa chọn được ghi nhớ, nên lần sau bạn sẽ được đưa thẳng đến ngôn ngữ đã chọn.

Nút mặt trăng, mặt trời bên cạnh chuyển giữa nền tối và nền sáng. Nền tối là mặc định; nếu bạn chọn nền sáng, trang sẽ nhớ và không nháy màu khi tải lại.

## Tìm hiểu thêm

- Mã nguồn và hướng dẫn cài đặt: [github.com/tiennm99/nocturne](https://github.com/tiennm99/nocturne).
- Tài liệu cấu hình: [docs/config.md](https://github.com/tiennm99/nocturne/blob/main/docs/config.md), tuỳ biến: [docs/customization.md](https://github.com/tiennm99/nocturne/blob/main/docs/customization.md).
- Nội dung của chính trang demo này nằm trong thư mục [exampleSite](https://github.com/tiennm99/nocturne/tree/main/exampleSite); mỗi bài có liên kết "Sửa trang này" dẫn thẳng đến file nguồn.
