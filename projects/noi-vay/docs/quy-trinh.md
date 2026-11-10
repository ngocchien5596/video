# Quy trình sản xuất và đăng bài

Quay gộp 7 tập một buổi mỗi tuần và luôn giữ sẵn 3 tập dự phòng. Bắt đầu quay trước ngày đăng tập đầu tiên ít nhất 10 ngày.

## Lịch hằng tuần

| Ngày | Việc | Thời gian |
| --- | --- | --- |
| Thứ Hai | Chốt thoại 7 tập của tuần sau trong `projects/noi-vay/src/episodes/`, tra lại nghĩa, chạy `npm run sheets`, chuẩn bị đạo cụ | 2 giờ |
| Thứ Ba | Quay cả 7 tập: hết cảnh vai CĐ trước, rồi thay đồ quay vai TC | 3–4 giờ |
| Thứ Tư – Thứ Năm | Dựng thô trong CapCut, xuất vào `public/footage/`, gắn vào tập, chỉnh nhịp, `npm run render` | 30–40 phút mỗi tập |
| Thứ Sáu | Xem lại trên điện thoại, `npm run cover`, viết caption, hẹn giờ đăng | 1 giờ |
| Mỗi ngày | Trả lời bình luận trong 60 phút đầu sau khi đăng, cập nhật `tracker.csv` | 15 phút |

Cột `trang_thai` trong `tracker.csv` dùng các giá trị: `chua-quay` → `da-quay` → `da-dung` → `da-hen-gio` → `da-dang`.

## Checklist trước khi đăng

- [ ] 3 giây đầu có hành động hoặc câu gây tò mò, không chào hỏi
- [ ] Nghĩa thật đã tra từ điển, câu đầy đủ ghi đúng chính tả
- [ ] Phụ đề không sai chính tả, không bị nút hoặc caption của ứng dụng che
- [ ] Thoại to hơn nhạc nền rõ rệt (nghe thử bằng loa điện thoại)
- [ ] Độ dài dưới 60 giây
- [ ] Ảnh bìa có "NGÀY X/30" và câu thành ngữ
- [ ] Câu hỏi bình luận đã viết sẵn để ghim
- [ ] Không chê vùng miền, ngoại hình, nghề nghiệp cụ thể của ai

## Đăng bài

Đăng cùng một file lên TikTok và YouTube Shorts. File xuất từ repo không có logo TikTok nên YouTube không hạn chế phân phối.

Mẫu caption:

```
Ngày 1/30: "Ăn quả nhớ kẻ trồng cây" mà hiểu thế này thì ông bà khóc òa 😂
Bạn muốn nhớ ơn ai nhất? Comment đi!
#thanhngu #tucngu #tiengviet #hocvui #noivaymakhongphaivay #xuhuong
```

- **Hashtag:** 3–5 tag, gồm 1 tag riêng của series, 2–3 tag chủ đề và 1 tag rộng.
- **Ghim bình luận:** câu hỏi của tập, kèm "Mai là câu: …".
- **Playlist:** tạo playlist "30 ngày thành ngữ" trên cả hai nền tảng ngay từ tập 1.
- **Mùa 2:** gom các câu người xem góp ý trong bình luận từ tuần 3.

## Chỉ số theo dõi

Các ngưỡng dưới đây là số ước lượng từ kinh nghiệm chung với video ngắn, không phải số liệu chính thức của nền tảng.

| Chỉ số | Mức ổn | Nếu thấp hơn |
| --- | --- | --- |
| Còn xem ở giây thứ 3 | Trên 70% | Làm hook mạnh hơn, vào hành động ngay |
| Tỉ lệ xem hết | Trên 40% | Cắt bớt đoạn hiểu sai, rút xuống 40 giây |
| Lưu / lượt xem | Trên 1% | Làm nghĩa thật và ví dụ rõ, dễ nhớ hơn |
| Bình luận / lượt xem | Trên 0,5% | Đổi câu hỏi sang dạng kể chuyện của bản thân |

Sau ngày 7 và ngày 14, so 3 tập tốt nhất với 3 tập kém nhất theo tỉ lệ xem hết, rồi lặp lại kiểu hook nào thắng.
