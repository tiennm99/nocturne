---
title: "Hình ảnh trong bài viết"
date: 2026-06-12T20:00:00+07:00
description: "JPG, PNG, WebP, SVG và GIF; ảnh có chú thích, ảnh trong liên kết, ảnh trong static và ảnh từ trang khác — mỗi loại được nocturne xử lý một kiểu."
categories: ["demo"]
tags: ["hinh-anh", "markdown"]
cover:
  image: dem-thanh-pho.jpg
---

![Dải màu ngang chuyển từ xanh đen ở mép trái sang xanh trời nhạt ở mép phải, như bầu trời thành phố lúc chập tối](dem-thanh-pho.jpg)

Ảnh trên là `dem-thanh-pho.jpg` (1600×900), nằm cùng thư mục với bài. Vì là ảnh đầu tiên và ở ngay đầu bài, nó nhiều khả năng là phần tử lớn nhất khi trang vừa hiện, nên theme cho tải ngay với `loading="eager"` và `fetchpriority="high"`. Mọi ảnh phía sau đều tải lười, khi người đọc cuộn tới gần.

Hugo đọc được kích thước ảnh, nên thẻ `<img>` có sẵn `width` và `height`: trình duyệt giữ chỗ từ trước và chữ không bị xô khi ảnh tải xong. Kèm theo là `srcset` gồm các bản WebP rộng 480, 960, 1440 và 1600 điểm ảnh, để trình duyệt chọn bản vừa với màn hình. Bấm vào ảnh sẽ mở tệp gốc.

Ảnh này cũng được khai báo ở `cover.image` trong front matter. Theme không vẽ ảnh bìa phía trên bài; nó dùng ảnh ấy cho thẻ chia sẻ Open Graph khi đường dẫn bài được dán lên mạng xã hội hay ứng dụng nhắn tin.

## Ảnh trong bundle

Ảnh đặt cạnh `index.md` là tài nguyên của trang, chỉ cần gọi bằng tên tệp. Với JPEG, PNG và WebP, theme tạo các bản thu nhỏ lúc build; SVG và GIF được giữ nguyên.

### PNG có thuộc tính

![Khung 16:9 nền chuyển từ xanh đen qua xanh lam sang xanh ngọc, chính giữa là một ô vuông màu than](hoa-van.png)
{#hoa-van .wide}

`hoa-van.png` (1200×675) được xử lý giống ảnh JPG: có kích thước và `srcset` dạng WebP. Dòng `{#hoa-van .wide}` ngay dưới ảnh là thuộc tính Markdown, gắn `id` và lớp thẳng vào thẻ `<img>`. Nhờ vậy có thể [liên kết tới đúng tấm ảnh](#hoa-van), hoặc viết CSS riêng cho lớp `wide`.

### WebP có chú thích

![Nền chuyển màu chéo từ xanh rêu sẫm ở góc dưới trái sang xanh ngọc nhạt ở góc trên phải](binh-minh.webp "Bình minh: ảnh có tiêu đề trong ngoặc kép nên được bọc trong figure, và tiêu đề thành dòng chú thích này.")

Ảnh đứng riêng một đoạn và có tiêu đề sẽ thành `<figure>` với `<figcaption>`. Văn bản thay thế (`alt`) mô tả những gì trong ảnh cho người dùng trình đọc màn hình, còn chú thích là lời bình mà ai cũng thấy; hai thứ này nên bổ sung cho nhau, đừng lặp lại nhau.

### GIF giữ nguyên

![Các dải xanh dọc, từ xanh trời nhạt đến xanh đen, trượt dần sang một bên rồi lặp lại](song.gif)

Hugo không thể thu nhỏ GIF mà vẫn giữ chuyển động, nên `song.gif` được phục vụ đúng như tệp gốc, không `srcset`, không `width` và `height`. Ảnh động vẫn tải lười như mọi ảnh khác.

## Ảnh nằm trong liên kết

[![Mặt la bàn tròn nền tối, viền xanh, kim hình thoi màu xanh và trắng chỉ thẳng lên trên](la-ban.svg)](https://vi.wikipedia.org/wiki/La_b%C3%A0n)

`la-ban.svg` là ảnh vector nên được giữ nguyên: nó sắc nét ở mọi cỡ và không cần bản thu nhỏ nào. Ảnh nằm sẵn trong một liên kết tới Wikipedia, nên theme không bọc thêm liên kết tới tệp gốc — thẻ `<a>` lồng trong thẻ `<a>` là HTML sai.

## Ảnh trong thư mục static

![Màn hình thử sóng: sáu sọc dọc đỏ, xanh lá, vàng, xanh dương, hồng tím và xanh lơ, một vệt cầu vồng chạy chéo qua](/img/tinh-tu-static.png)

Tệp này nằm ở `static/img/tinh-tu-static.png` và được gọi bằng đường dẫn tuyệt đối `/img/tinh-tu-static.png`. Trang demo chạy dưới `/nocturne/` trên GitHub Pages, nên theme tự thêm phần đường dẫn gốc thành `/nocturne/img/tinh-tu-static.png`. Đổi `baseURL` thì ảnh vẫn hiện, không phải sửa bài. Tệp trong `static/` không phải tài nguyên của trang, nên không có bản thu nhỏ.

## Ảnh từ trang khác

![Cũng màn hình thử sóng sáu sọc màu ấy, lần này tải về từ một địa chỉ đầy đủ](https://tiennm99.github.io/nocturne/img/tinh-tu-static.png)

Một URL đầy đủ, bắt đầu bằng `https://`, được giữ nguyên. Theme không tải ảnh từ xa về lúc build, nên không biết kích thước của nó.

### GIF thành video

![Các dải xanh chéo, từ xanh trời nhạt đến gần đen, lần lượt quét qua khung hình rồi lặp lại](https://tiennm99.github.io/nocturne/media/the-gioi-song.gif)

Muốn xử lý ảnh từ xa, site có thể thêm partial `layouts/_partials/image/remote.html`; theme gọi nó cho mọi URL đầy đủ. Partial của trang demo chỉ nhận ra một trường hợp: GIF trong thư mục `/media/` có một tệp MP4 cùng tên. Khi đó ảnh được thay bằng thẻ `<video>` tắt tiếng, phát lặp, chỉ tải khi cuộn tới gần và chỉ chạy khi đang nằm trong màn hình. Tệp MP4 ở đây nặng khoảng 4 KB, so với 23 KB của tệp GIF. Trình duyệt tắt JavaScript vẫn thấy ảnh GIF gốc.

Cách viết partial này có trong [tài liệu tùy biến của theme](https://github.com/tiennm99/nocturne/blob/main/docs/customization.md#remote-images).
