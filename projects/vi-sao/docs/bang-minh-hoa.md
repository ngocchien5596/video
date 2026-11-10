# Bảng minh hoạ (sơ đồ)

Sơ đồ hiện trong khung trắng ở nửa trên màn hình, đổi bước theo lời Cụ Đồ. Dùng trong phần diễn (`stage`) qua kênh `board`:

```ts
{ line: 0, at: 0.45, board: { id: "sky-blue", step: 1 } }   // hiện / đổi bước
{ line: 0, board: null }                                       // cất bảng
```

Mã nguồn sơ đồ: `projects/vi-sao/src/boards/`. Thêm sơ đồ mới thì tạo file trong thư mục đó, đăng ký id trong `boards/index.ts` và ghi vào bảng dưới.

## Danh sách

### `sky-blue`: Vì sao bầu trời màu xanh

| Bước | Hình | Câu thoại khớp |
| --- | --- | --- |
| 0 | Mặt trời chiếu một tia nắng trắng | "Ánh nắng trông màu trắng" |
| 1 | Tia nắng hoá thành dải bảy màu | "gồm đủ các màu cầu vồng" |
| 2 | Hiện nhiều hạt khí li ti | "đi qua vô số hạt khí li ti" |
| 3 | Mũi tên xanh bắn ra mọi hướng từ hạt khí; đỏ, cam, vàng đi thẳng | "ánh sáng xanh bị hắt văng ra khắp nơi" |
| 4 | Nền chuyển xanh, ánh xanh từ nhiều hướng vào mắt | "nhìn chỗ nào trên trời cũng gặp ánh sáng xanh" |
