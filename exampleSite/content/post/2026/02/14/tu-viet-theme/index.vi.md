---
title: "Tự viết một theme Hugo"
date: 2026-02-14T21:00:00+07:00
draft: false
tags: ["theme", "hugo", "ghi-chep"]
categories: ["nhat-ky-hugo"]
description: "Sau một tháng viết nocturne: vì sao đáng tự làm, nên giữ những gì thật nhỏ, vì sao nền tối là mặc định và chữ tiếng Việt cần được chăm thế nào."
---

Một tháng sau [bản kế hoạch đầu năm](/post/2026/01/10/ke-hoach-dau-nam/index.md), `nocturne` đã đủ để tôi viết bài trên chính nó. Bài này ghi lại những quyết định đã định hình theme, để sau này khi muốn thêm gì đó, tôi nhớ vì sao lúc đầu mình đã không thêm.

## Vì sao đáng tự làm {#vi-sao-dang-tu-lam}

Dùng theme có sẵn giống thuê một căn hộ đầy đủ nội thất: dọn vào ở ngay, nhưng muốn dời một cái kệ thì phải hỏi chủ nhà. Mỗi lần Hugo đổi gì đó, tôi lại phải đọc mã của người khác để biết theme có còn chạy không.

Tự viết thì chậm hơn lúc đầu, nhưng sau đó mọi thứ đều có chủ. Khi một trang hiển thị sai, tôi biết phải mở file nào. Khi Hugo ra bản mới, danh sách những thứ có thể vỡ ngắn đến mức đọc hết trong một buổi tối.

Còn một lý do nữa: viết theme buộc mình hiểu Hugo thật sự. Lookup order, page bundle, render hook, cách đa ngôn ngữ hoạt động, tất cả đều phải chạm vào ít nhất một lần.

## Giữ cho thật nhỏ

Nguyên tắc chung: mỗi thứ thêm vào phải trả lời được câu hỏi "người đọc được gì?". Nếu câu trả lời là "trông xịn hơn một chút", thường là không.

### Không bước build

Không Node, không bundler, không PostCSS. CSS là vài file thuần được Hugo nối lại, nén và gắn mã băm. JavaScript là ES module nhỏ, mỗi file một việc: nút đổi giao diện, nút sao chép code, mục lục tự đánh dấu khi cuộn. Gộp lại chưa tới mười kilobyte trước khi nén.

### Dữ liệu thay vì tham số

Trang chủ là portfolio, nhưng thông tin cá nhân không nằm trong `hugo.yaml`. Tiểu sử và đường dẫn ở `data/profile.yaml`, dự án nổi bật ở `data/projects.yaml`. File cấu hình chỉ còn những công tắc bật tắt tính năng, đọc là hiểu.

### Không shortcode riêng

Theme không mang theo shortcode nào. Shortcode là cú pháp riêng của Hugo, viết vào bài rồi thì bài bị buộc vào theme. Những gì Markdown làm được, như ảnh có chú thích hay hộp lưu ý, theme xử lý bằng render hook, nên nội dung vẫn là Markdown thuần.

## Nền tối là mặc định {#nen-toi-la-mac-dinh}

Tôi viết và đọc chủ yếu vào buổi tối, nên giao diện tối là mặc định, không phải một tuỳ chọn phụ. Nút mặt trăng, mặt trời ở góc trên chuyển sang nền sáng, và lựa chọn đó được nhớ cho lần sau.

### Không nháy sáng khi tải

Cái khó của giao diện tối là khoảnh khắc trước khi CSS áp dụng: trang loé trắng rồi mới tối lại. Cách chữa là một đoạn script rất ngắn chạy ngay trong `<head>`, trước khi trình duyệt vẽ gì:

```js
if (localStorage.getItem('theme') === 'light') {
  document.documentElement.setAttribute('data-theme', 'light');
}
```

Vì tối là mặc định, script chỉ phải làm việc khi người đọc đã chọn nền sáng. Không có JavaScript thì trang vẫn tối và vẫn đọc được.

### Màu là token

Mọi màu đều là biến CSS trong một file duy nhất: giá trị tối trên `:root`, giá trị sáng trên `:root[data-theme="light"]`. Muốn đổi màu nhấn cho cả hai chế độ, chỉ cần ghi đè vài biến từ site, không phải sửa theme.

> [!TIP]
> Khi chọn màu cho nền tối, đừng dùng trắng tinh cho chữ. Một màu xám ấm, sáng vừa phải đỡ chói hơn nhiều khi đọc lâu.

## Chữ tiếng Việt

Theme ưu tiên tiếng Việt, nên phần chữ được chăm kỹ nhất.

### Phông có đủ dấu {#phong-co-du-dau}

Chuỗi phông bắt đầu bằng Inter và Be Vietnam Pro, rồi lùi về phông hệ thống. Cả hai đều có đủ dấu tiếng Việt; nếu máy không có, phông hệ thống hiện đại cũng hiển thị tốt. Thứ cần tránh là phông thiếu vài ký tự như "ữ" hay "ặ", khiến một chữ lẫn hai kiểu phông.

### Khoảng cách dòng

Tiếng Việt có dấu chồng lên nhau, phía trên và phía dưới chữ. Khoảng cách dòng 1.7 cho thân bài giúp dấu của dòng này không chạm vào dòng kia. Tiêu đề dùng khoảng cách chặt hơn vì chữ to và ít dòng.

### Neo và ngày tháng

ID của heading được sinh dạng ASCII, nên đường dẫn tới mục "Chữ tiếng Việt" là `#chu-tieng-viet`, gọn và dễ chia sẻ. Riêng chữ "đ" bị bỏ hẳn chứ không thành "d", nên những tiêu đề có "đ" trong bài này được đặt ID tay, như `## Nền tối là mặc định {#nen-toi-la-mac-dinh}`. Ngày tháng dùng định dạng của từng ngôn ngữ, nên bài tiếng Việt ghi "14 tháng 2, 2026" thay vì kiểu tiếng Anh.

## Còn lại

Vẫn còn nhiều việc: trang lưu trữ, tìm kiếm, bản tiếng Anh. Nhưng phần lõi đã ổn, và quan trọng hơn, tôi hiểu nó từng dòng. Những phần còn lại để dành cho các bài sau.
