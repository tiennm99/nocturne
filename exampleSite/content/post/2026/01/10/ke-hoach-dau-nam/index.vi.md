---
title: "Lập kế hoạch đầu năm"
date: 2026-01-10T08:00:00+07:00
draft: false
tags: ["ke-hoach", "theme", "hugo"]
categories: ["nhat-ky-hugo"]
description: "Mở đầu năm bằng một kế hoạch nhỏ: ba mục tiêu cho sáu tháng, trong đó có một theme Hugo tự viết."
---

Đầu năm tôi thường viết ra ba việc muốn xong trong sáu tháng đầu. Không nhiều hơn, vì danh sách dài thì chẳng bao giờ hết. Năm nay một trong ba việc đó là theme Hugo đã nhắc đến trong [ghi chú hồi tháng Tám](/post/2025/08/15/ghi-chu-hugo/index.md): `nocturne`.

## Vì sao tự viết

Theme đang dùng vẫn tốt, nhưng nặng. Nó có slider, có hiệu ứng, có cả một thư mục JavaScript mà tôi chưa từng mở. Tự viết là cách duy nhất để biết chắc mỗi dòng có mặt vì lý do gì.

## Mục tiêu

1. Không bước build cho CSS hay JS: chỉ Hugo và những ES module mà trình duyệt hiểu sẵn.
2. Tiếng Việt trước. Ngôn ngữ khác là phần thưởng, không phải điều kiện.
3. Trang chủ là portfolio; bài viết là phần còn lại.

## Cách đo {#cach-do}

Mục tiêu không đo được thì chỉ là mong ước. Nên mỗi mục có một phép thử đơn giản:

- [x] Site chạy được với `hugo server`, không cần `npm install`.
- [ ] Bài viết dài vẫn dễ đọc trên điện thoại, cả khi tắt JavaScript.
- [ ] Viết một bài bằng tiếng Việt và một bản tiếng Anh, chuyển qua lại không lạc trang.

## Không làm

Danh sách này quan trọng ngang danh sách trên: không bình luận tự host, không thư viện icon, không framework CSS. Cần gì thì viết đúng phần đó.

Hẹn bài sau, khi theme đã có hình dạng.
