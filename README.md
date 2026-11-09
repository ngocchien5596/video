# Nói Vậy Mà Không Phải Vậy

Repo sản xuất cho series 30 video ngắn (TikTok / YouTube Shorts). Mỗi ngày một video 60 giây giải thích hài hước một câu thành ngữ, tục ngữ Việt Nam.

Toàn bộ kịch bản nằm trong `src/episodes/` dưới dạng dữ liệu. Từ dữ liệu đó, repo sinh ra:

- **Animatic** để xem trước nhịp và cảnh của từng tập trước khi quay
- **Video hoàn chỉnh** có phụ đề, thẻ tiêu đề và thẻ "Nghĩa thật" theo cùng nhận diện, ghép lên footage đã quay
- **Ảnh bìa** cho từng tập
- **Phụ đề .srt** để nhập vào CapCut hoặc Premiere
- **Kịch bản in** dạng Markdown để mang đi quay

## Cài đặt

Cần Node.js 22.18 trở lên.

```bash
npm install
npm run dev          # mở Remotion Studio để xem 30 tập
```

## Lệnh thường dùng

| Lệnh | Kết quả |
| --- | --- |
| `npm run dev` | Mở Studio, xem và chỉnh từng tập (các tập nằm trong thư mục Tuan-1 … Tuan-4) |
| `npm run render -- 1` | Xuất `out/video/ngay-01.mp4` |
| `npm run render -- tuan-1` | Xuất cả tuần 1 (cũng nhận `1-7`, `1 3 5`, `all`) |
| `npm run cover -- tuan-1` | Xuất ảnh bìa vào `out/cover/` |
| `npm run srt -- all` | Xuất phụ đề nháp vào `out/srt/` (thêm `--no-names` để bỏ tên người nói) |
| `npm run sheets` | Sinh lại kịch bản in trong `docs/kich-ban/` |
| `npm run lint` | Kiểm tra code (ESLint + TypeScript) |

## Cấu trúc

```
src/
  episodes/        Kịch bản 30 tập: tuan-1.ts … tuan-4.ts  <- nơi sửa nội dung
    make.ts        Khuôn 6 nhịp của một tập (hook, đặt câu, hiểu sai, lật nghĩa, ví dụ, punchline)
  components/      Nhận diện: font, màu, vùng an toàn, phụ đề, thẻ tiêu đề, thẻ cuối
  lib/             Kiểu dữ liệu và tính thời gian phụ đề
  Episode.tsx      Composition video 1080×1920
  Cover.tsx        Ảnh bìa
public/
  sfx/             Hiệu ứng âm thanh (ding, record scratch, whoosh)
  footage/         Footage đã dựng thô của từng tập (không đưa vào git)
docs/
  series-bible.md  Concept, nhân vật, quy tắc nội dung
  quy-trinh.md     Lịch sản xuất hằng tuần, checklist, đăng bài
  kich-ban/        Kịch bản in, sinh tự động
tools/             Script xuất video, ảnh bìa, srt, kịch bản
tracker.csv        Theo dõi trạng thái 30 tập (mở bằng Excel / Google Sheets)
out/               File xuất ra (không đưa vào git)
```

## Quy trình một tập

1. **Viết / sửa kịch bản** trong `src/episodes/tuan-X.ts`, rồi xem animatic trong Studio.
2. **In kịch bản**: `npm run sheets`, rồi mở `docs/kich-ban/tuan-X.md` khi quay.
3. **Quay và dựng thô** trong CapCut, chỉ giữ hình và tiếng thoại. Xuất ra `public/footage/ngay-01.mp4`.
4. **Gắn footage**: thêm `footage: "footage/ngay-01.mp4"` vào tập đó. Chỉnh `seconds` của từng nhịp cho khớp với footage (xem trong Studio).
5. **Xuất**: `npm run render -- 1` và `npm run cover -- 1`.
6. **Đăng** theo `docs/quy-trinh.md`, rồi cập nhật `tracker.csv`.

Phụ đề trong repo được chia thời gian tự động theo số từ, nên chỉ là bản nháp. Cần khớp từng chữ thì dùng phụ đề tự động của CapCut ở bước 3 và thêm `showSubtitles: false` vào tập đó để tắt phụ đề của repo.

## Lưu ý

- Footage và file xuất ra rất nặng nên không đưa vào git. Hãy sao lưu thư mục `public/footage/` lên Google Drive hoặc ổ cứng ngoài.
- Nhạc nền nên chọn trong thư viện của TikTok / YouTube khi đăng, đừng ghép nhạc ngoài vào video để tránh bị tắt tiếng vì bản quyền.
- Remotion miễn phí cho cá nhân và công ty tối đa 3 nhân viên. Xem [giấy phép Remotion](https://remotion.dev/license).
