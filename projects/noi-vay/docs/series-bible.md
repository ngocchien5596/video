# Series bible: Nói Vậy Mà Không Phải Vậy

Mỗi ngày một video 45–60 giây. Thằng Cháu hiểu sai câu thành ngữ theo nghĩa đen cho thật buồn cười, rồi Cụ Đồ lật lại nghĩa thật và cho một ví dụ đời thường.

## Định dạng

| Hạng mục | Lựa chọn |
| --- | --- |
| Khán giả | 16–35 tuổi: học sinh, sinh viên, dân văn phòng; phụ huynh muốn dạy con tiếng Việt |
| Khung hình | 9:16, 1080×1920, 30fps, phụ đề cháy chữ |
| Độ dài | Dưới 60 giây |
| Lịch đăng | Mỗi ngày 12:00 trên cả YouTube Shorts và TikTok (thử 2–3 tuần, sau đó thử 21:00); giờ đặt trong project.json → publish.postTimes |
| Ảnh bìa | "#X" + câu thành ngữ |

## Nhân vật

- **Cụ Đồ (CĐ):** khăn đóng, áo dài the, quạt giấy, kính tròn nhưng nói chuyện như dân mạng. Câu cửa miệng: *"Ông bà nói vậy, mà không phải vậy!"*
- **Thằng Cháu (TC):** lúc nào cũng hiểu theo nghĩa đen, rất tự tin, hiểu ra rồi vẫn áp dụng sai kiểu mới.

Một người có thể đóng cả hai vai, quay hết cảnh của CĐ trước rồi thay đồ quay vai TC.

## 6 nhịp của mọi tập

| Giây | Nhịp | Nội dung |
| --- | --- | --- |
| 0–3 | Hook | TC làm việc vô lý hoặc nói câu gây sốc. Không chào hỏi, không logo |
| 3–6 | Đặt câu | CĐ hỏi, TC đáp bằng chính câu thành ngữ. Thẻ "#X" hiện lên |
| 6–25 | Hiểu sai | Diễn nghĩa đen, leo thang 2–3 bước, cắt cảnh mỗi 2–3 giây |
| 25–40 | Lật nghĩa | Câu cửa miệng của CĐ, thẻ "NGHĨA THẬT" hiện lên |
| 40–52 | Ví dụ | Tình huống hiện đại (công sở, học đường, mạng xã hội) hoặc một câu chuyện dựng thành cảnh hồi ức (xem bên dưới) |
| 52–60 | Punchline | TC áp dụng sai kiểu mới, thẻ câu hỏi bình luận và "Mai là câu…" |

### Chuẩn dựng nhịp Ví dụ

- **Ví dụ đời thường ngắn** (một câu, tình huống hiện đại): diễn ngay tại cảnh, hai nhân vật giơ biển chữ / đạo cụ như bình thường.
- **Ví dụ kể một câu chuyện** (truyện cổ tích, tích xưa, chuyện ngày xưa, kể dài từ 2 câu trở lên): bắt buộc dựng thành **cảnh hồi ức**.
  - Bật `memory` ở nhịp `example` (kèm nhãn, ví dụ `{ label: "TRUYỆN CỔ TÍCH: THẠCH SANH" }`). Hình tự chuyển sang kiểu TV đen trắng ngày xưa: bật TV lúc vào, sọc quét, nhiễu hạt, tắt TV lúc ra. Thanh tiêu đề và phụ đề giữ màu.
  - Diễn lại **đúng từng ý trong lời kể**, mỗi ý một khoảnh khắc: đổi phông cho đúng nơi chốn (`tavern`, `temple`, `cave`…), hai con rối đóng vai nhân vật trong truyện (`role`), dùng đạo cụ đúng truyện. Không dùng biển chữ thay cho hình nếu đã có đạo cụ vẽ được.
  - Lời kể là giọng Cụ Đồ đọc dẫn; trong hồi ức con rối không mấp máy môi.
  - Hết nhịp, sân khấu tự về đúng cảnh trước hồi ức. Nhịp Punchline vẫn mở bằng một khoảnh khắc `cut` đặt lại cảnh.
  - Thiếu vai / phông / đạo cụ cho câu chuyện mới thì vẽ thêm trong `engine/stage` (`Character.tsx` mục vai, `scenes.tsx`, `props.tsx`) và ghi vào `engine/lib/stage-types.ts`.
- Mẫu chuẩn: tập 1 "Ăn cháo đá bát" (`projects/noi-vay/src/episodes/tuan-1.ts`).

Độ dài từng nhịp có thể đổi theo từng tập (`seconds` trong `projects/noi-vay/src/episodes/`), nhưng thứ tự nhịp thì giữ nguyên.

## Quy tắc nội dung

- Nghĩa thật phải đúng. Tra *Từ điển thành ngữ, tục ngữ Việt Nam* trước khi quay.
- Không chê vùng miền, ngoại hình, nghề nghiệp cụ thể; không chính trị; không nhắm vào ai có thật.
- Không dùng hình ảnh người thật khi chưa được họ đồng ý.
- Dùng giọng đọc AI hoặc hình AI trông như thật thì bật nhãn "nội dung do AI tạo".

## Nhận diện

| Thành phần | Giá trị |
| --- | --- |
| Font tiêu đề | Bangers |
| Font phụ đề | Be Vietnam Pro, đậm 900 |
| Màu câu thành ngữ | Vàng #FFD93D, viền đen #14121F |
| Màu tên CĐ / TC | Vàng #FFD93D / Xanh #7FE3FF |
| Vùng an toàn | Trên 170px, dưới 440px, phải 170px, trái 70px (tránh nút của ứng dụng) |

Mọi giá trị nằm trong `engine/components/brand.ts` (dùng chung mọi dự án). Sửa một chỗ là mọi tập đổi theo.
