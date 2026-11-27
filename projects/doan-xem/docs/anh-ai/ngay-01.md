# Ảnh AI cần tạo: tập Nguyễn Du

Hướng C (series bible mục 3): chỉ 3 cảnh lớn dùng ảnh AI. Chưa có ảnh thì video dùng cảnh mực vẽ bằng code.

**Quy cách**
- Ảnh dọc, tỉ lệ 24:25 (960×1000), hoặc lớn hơn cùng tỉ lệ.
- Đặt đúng tên file vào `D:\Video\public\doan-xem\ngay-01\`. Có file là video tự dùng ảnh.
- Duyệt tay từng ảnh: trang phục, kiến trúc Việt (không lẫn Trung Hoa, Nhật Bản), không có chữ.

**Đoạn khoá phong cách** (đặt đầu mọi prompt)

```
Vietnamese ink wash painting on aged rice paper (giấy dó), loose brush strokes, visible paper texture, limited palette of ink black, ivory and cinnabar red, soft vignette, flat 2D illustration, no photorealism,
```

**Negative prompt**

```
text, letters, calligraphy, watermark, signature, Chinese architecture, Japanese clothing, photorealistic
```

| File | Câu | Prompt (sau đoạn khoá) |
|---|---|---|
| `thang-long.png` | 1. "…sinh ra ở kinh thành Thăng Long…" | a grand 18th century Vietnamese noble residence in Thăng Long, low tiled roofs with curved ridges, wooden pillars, courtyard with lotus pond, seen from above at dawn mist |
| `nui-hong.png` | 7. "…người đi săn ở núi Hồng" | the Hồng Lĩnh mountain range in Hà Tĩnh, Vietnam, layered misty peaks, a lone hunter seen from behind holding a bow, wearing a Vietnamese turban and long tunic, tiny figure in a vast landscape |
| `chan-dung.png` | 14. Lật đáp án | an illustrated portrait of an early 19th century Vietnamese scholar-official in his fifties, thin face, wearing a black Vietnamese turban (khăn đóng) and a dark blue official robe, holding a writing brush, calm melancholic expression, upper body, plain background |

Ảnh chân dung là tranh minh hoạ, vì không có chân dung đương thời. Video tự ghi "tranh minh hoạ" ở cảnh này. Ấn đỏ đóng phía dưới ảnh, từ khoảng y 770 của ảnh trở xuống, nên để mặt và vai ở nửa trên.

## Trạng thái (27/11/2026)
- Đã có cả 3 ảnh, chủ kênh tự tạo. Bản gốc lưu ở `out/doan-xem/anh-ai/ngay-01/goc/`.
- `thang-long.png`, `nui-hong.png`: cắt 32 px viền giấy rách mỗi bên.
- `chan-dung.png`: cắt bỏ khung xám bao ngoài và dấu ✦ hình mờ ở góc, lấy phần nửa trên (đầu tới tay), đổi tỉ lệ 960×1100.
- Còn phải xem: mái nhà trong `thang-long.png` cong vút kiểu đình chùa Trung Hoa hơn nhà Việt thế kỷ 18.
