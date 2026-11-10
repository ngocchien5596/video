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
| `npm run voice -- 1` | Lồng tiếng Cụ Đồ và Thằng Cháu cho tập 1 bằng OmniVoice (xem mục Lồng tiếng) |
| `npm run voice:check -- 1` | Nghe lại tiếng bằng máy, báo câu đọc sai hoặc nuốt chữ |
| `npm run bot` | Chạy bot Telegram duyệt kịch bản và tạo video (xem mục Bot Telegram) |
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
  runbook.md       Từng bước sản xuất một tập, bảng lệnh, xử lý sự cố
  series-bible.md  Concept, nhân vật, quy tắc nội dung
  quy-trinh.md     Lịch sản xuất hằng tuần, checklist, đăng bài
  kich-ban/        Kịch bản in, sinh tự động
tools/             Script xuất video, ảnh bìa, srt, kịch bản, lồng tiếng (voice/), bot Telegram (bot/)
tracker.csv        Theo dõi trạng thái 30 tập (mở bằng Excel / Google Sheets)
out/               File xuất ra (không đưa vào git)
```

## Quy trình một tập

Hướng dẫn chi tiết từng bước và cách xử lý sự cố: [docs/runbook.md](docs/runbook.md).

1. **Viết / sửa kịch bản** trong `src/episodes/tuan-X.ts`, rồi xem animatic trong Studio.
2. **In kịch bản**: `npm run sheets`, rồi mở `docs/kich-ban/tuan-X.md` khi quay.
3. **Quay và dựng thô** trong CapCut, chỉ giữ hình và tiếng thoại. Xuất ra `public/footage/ngay-01.mp4`.
4. **Gắn footage**: thêm `footage: "footage/ngay-01.mp4"` vào tập đó. Chỉnh `seconds` của từng nhịp cho khớp với footage (xem trong Studio).
5. **Xuất**: `npm run render -- 1` và `npm run cover -- 1`.
6. **Đăng** theo `docs/quy-trinh.md`, rồi cập nhật `tracker.csv`.

Phụ đề trong repo được chia thời gian tự động theo số từ, nên chỉ là bản nháp. Cần khớp từng chữ thì dùng phụ đề tự động của CapCut ở bước 3 và thêm `showSubtitles: false` vào tập đó để tắt phụ đề của repo.

## Lồng tiếng

Tiếng thoại sinh bằng model OmniVoice trong repo `D:Tao_giong_noi_local` (đổi chỗ khác thì đặt biến môi trường `TTS_ROOT`). Chỉ dùng OmniVoice vì giấy phép Apache 2.0 cho phép kiếm tiền; **không dùng Viterbox** (CC BY-NC, cấm thương mại).

1. **Giọng mẫu** nằm ở `voices/cu-do.wav` và `voices/thang-chau.wav`, kèm file `.txt` ghi đúng câu đã đọc. Hai giọng này được tạo từ mô tả (ông già giọng trầm, cậu thiếu niên giọng cao), không nhân bản giọng người thật nào.
   - Muốn đổi giọng: `npm run voice:design` sinh 4 phương án mỗi vai vào `voices/mau/`, nghe rồi chọn bằng `npm run voice:pick -- cu-do 3`.
   - Muốn dùng giọng tự thu: ghi đè hai file `.wav` (5–10 giây, không tạp âm) và sửa file `.txt` cho đúng lời.
2. **Sinh tiếng**: `npm run voice -- tuan-1`. Mỗi câu khoảng 20 giây trên GTX 1660 Super, nên một tuần mất khoảng nửa tiếng. Tắt Remotion Studio khi chạy cho đỡ tốn RAM.
   - Câu không đổi chữ được giữ nguyên, sửa câu nào thì chỉ sinh lại câu đó. `--force` để sinh lại tất cả.
   - Lệnh in tổng thời lượng mỗi tập và cảnh báo nếu quá 60 giây.
3. **Kiểm tra**: `npm run voice:check -- tuan-1` chép lời từng file bằng ASR và báo câu không khớp. Vẫn nên nghe lại cả tập trong Studio.
4. **Xuất**: `npm run render` như bình thường. Tập nào đã có tiếng thì độ dài nhịp tự theo tiếng thật và phụ đề khớp từng câu; tập chưa có tiếng thì giữ nhịp cũ. Tốc độ đọc của từng vai chỉnh ở `SPEAKERS` trong `tools/voice/make_voice.py`.

Tiếng sinh ra nằm trong `public/voice/` và không đưa vào git (chạy lại lệnh là có). Khi đăng, **bật nhãn "nội dung do AI tạo"** trên TikTok và YouTube.

## Bot Telegram

Mỗi ngày lúc 20:00, bot gửi kịch bản của ngày mai vào Telegram kèm 3 nút: **Duyệt**, **Sửa thoại**, **Bỏ qua**.

- **Duyệt:** bot lồng tiếng, kiểm tra tiếng, xuất video và ảnh bìa, gửi lại file mp4, ảnh bìa và gói đăng bài (tiêu đề, mô tả YouTube Shorts, caption TikTok, hashtag, bình luận ghim; lưu ở `out/versions/ngay-XX/vN/dang-bai.txt`), rồi cập nhật `tracker.csv`.
- **Sửa thoại:** nhắn `6.2: nội dung mới` để sửa đúng một câu, hoặc nhắn tự nhiên, ví dụ "câu cuối của cháu cho hài hơn", "thêm một câu ở nhịp 3", "viết phần diễn cho tập này". Bot sửa luôn mô tả cảnh và phần diễn hoạt hình của những câu bị đổi. Với cách nhắn tự nhiên, Claude Code trên máy đọc yêu cầu và đề xuất thay đổi. Bot cho xem bản trước và sau, chỉ sửa `src/episodes/` khi bạn bấm **Áp dụng**.
- **Bỏ qua:** bot nhắc lại sau 2 giờ.

**Cài đặt lần đầu:**
1. Nhắn `/newbot` cho @BotFather trên Telegram để tạo bot và lấy token.
2. Chép `.env.example` thành `.env`, điền `TELEGRAM_BOT_TOKEN`.
3. Chạy thử `npm run bot`, mở bot trong Telegram và gõ `/start`. Chat đầu tiên gõ `/start` sẽ là chat duy nhất điều khiển được bot.
4. Gõ `/batdau 2026-12-01` (ngày đăng tập 1) trong Telegram.
5. Tắt bản chạy thử (Ctrl+C), rồi chạy `npm run bot:install` để bot tự chạy ngầm mỗi khi đăng nhập Windows. Gỡ bằng `npm run bot:uninstall`.

**Lưu lịch sử:**
- Mỗi lần áp dụng sửa kịch bản, bot tự commit git: file kịch bản, kịch bản in, `tracker.csv`, và ghi yêu cầu, tóm tắt, câu cũ, câu mới vào `docs/lich-su/ngay-XX.md`.
- Mỗi lần xuất video, bot commit kịch bản đang dùng, rồi lưu thành phiên bản mới trong `out/versions/ngay-XX/vN/`: `video.mp4`, `cover.png`, `kich-ban.json`, `voice-manifest.json`, `info.json` (có mã commit). Bản cũ không bị ghi đè.
- Gõ `/lichsu 5` để xem các phiên bản của tập 5 và gửi lại bản cũ.
- Gõ `/dangbai 5` để nhận lại gói đăng bài của tập 5. Cấu hình hashtag, giờ đăng ở `bot.config.json` → `publish`.
- Bot chỉ commit trên máy. Đặt `"autoPush": true` trong `bot.config.json` để tự đẩy lên GitHub sau mỗi lần commit.
- `out/versions/` không vào git vì video nặng, nên cần sao lưu thư mục này cùng `out/video/`.

Giờ thông báo và múi giờ nằm trong `bot.config.json`, cũng đổi được bằng `/gio 21:00`. Log của bot ở `out/bot/bot.log`, log tạo từng tập ở `out/bot/ngay-XX.log`. Trạng thái bot ở `.bot/state.json` (không vào git).

Tập nào chưa có phần diễn (`stage`) thì video ra dạng chân dung. Muốn có hoạt hình thì bấm Sửa thoại, nhắn "viết phần diễn". Sau khi áp dụng, bot sinh lại kịch bản in. Nếu câu thành ngữ đổi, bot cập nhật `tracker.csv` và báo tập trước cần tạo lại video, vì dòng "Mai là câu" của tập đó sẽ sai.

## Lưu ý

- Footage và file xuất ra rất nặng nên không đưa vào git. Hãy sao lưu thư mục `public/footage/` lên Google Drive hoặc ổ cứng ngoài.
- Nhạc nền nên chọn trong thư viện của TikTok / YouTube khi đăng, đừng ghép nhạc ngoài vào video để tránh bị tắt tiếng vì bản quyền.
- Remotion miễn phí cho cá nhân và công ty tối đa 3 nhân viên. Xem [giấy phép Remotion](https://remotion.dev/license).
