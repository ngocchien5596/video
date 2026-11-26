# Cảnh chèn toàn khung (hướng 2), 18/11/2026

## Vì sao
Chủ kênh muốn cách dựng cuốn như video tham khảo "Cuộc đời sĩ quan tình báo": mỗi câu một hình kín khung, vẽ sát nghĩa câu, chữ tiếng Việt trong hình, hoà tan 0,5 s, phóng to chậm. Bảng minh hoạ hiện tại chỉ là khung nhỏ 960×350 trên đầu nhân vật.

## Mục tiêu / không làm
- Có: kênh `insert` trong phần diễn; tranh kín khung 1080×1920 do dự án đăng ký; hoà tan vào/ra ~0,5 s; phóng to chậm ~6%; thanh tiêu đề và phụ đề vẫn nằm trên.
- Không: đổi tập cũ (không dùng `insert` thì như cũ); tranh AI; đổi nhân vật.
- Hỏng nếu: chữ trong tranh bị phụ đề / thanh tiêu đề che; chuyển cảnh giật.

## Các cách đã cân nhắc
1. Phóng to bảng nhỏ kín khung: nhanh nhưng vẫn là sơ đồ phẳng. Bỏ.
2. Tranh AI: chủ kênh chưa chọn, cần dịch vụ ngoài. Bỏ.
3. **Kênh `insert` + tranh chèn vẽ bằng mã (chọn)**.

## Thiết kế
- `Moment.insert?: { id, step } | null` (engine/lib/stage-types.ts), có track riêng (engine/stage/track.ts).
- `InsertPanel` (engine/stage/insert.tsx): vẽ trong svg sân khấu, trên nhân vật và bảng; đổi tranh/bước thì tranh mới hoà tan trên tranh cũ 15 khung; tắt thì mờ dần 15 khung; phóng to chậm quanh tâm khung.
- Dự án đăng ký `inserts` (cùng kiểu BoardRegistry, canvas 1080×1920), truyền qua layout → Stage.
- Vùng an toàn của tranh: nội dung chính trong y 300–1300 (trên là thanh tiêu đề, dưới ~1330 là phụ đề).
- Tập mẫu: Vì sao tập 7, 5 câu giải thích → 5 cảnh chèn; câu hỏi của Thằng Cháu giữa chừng quay về sân khấu.
