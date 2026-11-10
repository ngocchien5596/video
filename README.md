# Xưởng video ngắn: Cụ Đồ & Thằng Cháu

Repo sản xuất các series video ngắn (TikTok / YouTube Shorts) dùng chung hai nhân vật hoạt hình Cụ Đồ và Thằng Cháu, giọng AI, công cụ xuất video và bot Telegram duyệt kịch bản. Mỗi series là một **dự án** riêng trong `projects/`.

| Dự án | Mã ngắn | Nội dung |
| --- | --- | --- |
| [`projects/noi-vay`](projects/noi-vay) | `nv` | **Nói Vậy Mà Không Phải Vậy**: mỗi ngày một câu thành ngữ, tục ngữ bị Thằng Cháu hiểu theo nghĩa đen |
| [`projects/vi-sao`](projects/vi-sao) | `vs` | **Ông Ơi, Vì Sao?**: câu hỏi "vì sao" của trẻ về thế giới, giải thích đúng khoa học, có nguồn kiểm chứng |

Từ dữ liệu kịch bản, repo sinh ra video hoạt hình có lồng tiếng và phụ đề, ảnh bìa, phụ đề .srt, kịch bản in và gói đăng bài.

## Cài đặt

Cần Node.js 22.18 trở lên.

```bash
npm install
npm run dev          # mở Remotion Studio: mỗi dự án một thư mục (NoiVay, ViSao)
```

## Lệnh thường dùng

Mọi lệnh nhận dự án bằng `-p <id hoặc mã ngắn>`; bỏ trống thì là `noi-vay`. Quên lệnh thì gõ **`npm run lenh`** (trên máy tính) hoặc **`/lenh`** (trong Telegram) để xem danh sách lệnh kèm mục đích.

| Lệnh | Kết quả |
| --- | --- |
| `npm run dev` | Mở Studio, xem và chỉnh từng tập của mọi dự án |
| `npm run render -- 1` | Xuất `out/noi-vay/video/ngay-01.mp4` |
| `npm run render -- -p vs 1` | Xuất `out/vi-sao/video/ngay-01.mp4` + ảnh bìa, lưu thành phiên bản mới trong `out/vi-sao/versions/ngay-01/vN/` (thêm `--no-archive` để không lưu) |
| `npm run render -- tuan-1` | Xuất cả tuần 1 (cũng nhận `1-7`, `1 3 5`, `all`) |
| `npm run cover -- -p vs 1` | Xuất ảnh bìa vào `out/<dự án>/cover/` |
| `npm run srt -- all` | Xuất phụ đề nháp vào `out/<dự án>/srt/` (thêm `--no-names` để bỏ tên người nói) |
| `npm run voice -- -p vs 1` | Lồng tiếng tập 1 bằng OmniVoice (xem mục Lồng tiếng) |
| `npm run voice:check -- -p vs 1` | Nghe lại tiếng bằng máy, báo câu đọc sai hoặc nuốt chữ |
| `npm run sheets -- -p vs` | Sinh lại kịch bản in trong `projects/<dự án>/docs/kich-ban/` |
| `npm run bot` | Chạy bot Telegram cho mọi dự án (xem mục Bot Telegram) |
| `npm run lint` | Kiểm tra code (ESLint + TypeScript) |

## Cấu trúc

```
engine/                Phần dùng chung cho mọi dự án
  stage/               Hoạt hình con rối: nhân vật, cảnh, đạo cụ, hiệu ứng, bảng minh hoạ (board.tsx)
  components/          Font, màu, vùng an toàn, phụ đề, các thẻ chữ (Overlays.tsx)
  lib/                 Kiểu dữ liệu, tính thời gian theo tiếng thật, kiểu của phần diễn
  EpisodePlayer.tsx    Bộ phát một tập: hình + tiếng + thẻ chữ + thẻ cuối + vòng lặp về đầu
projects/<dự án>/      Một series
  project.json         Cấu hình chỉnh tay: tên, mã ngắn, số tập, lịch thông báo, hashtag, giờ đăng
  project.mjs          Phần riêng cho công cụ và bot: tên nhịp, chỗ sửa được, ràng buộc, hướng dẫn cho Claude
  publish.mjs          Mẫu tiêu đề, mô tả, caption, bình luận ghim
  src/episodes/        Kịch bản (tuan-X.ts) và khuôn tập (make.ts)  <- nơi sửa nội dung
  src/Episode.tsx      Bố cục video của series (thẻ nào hiện ở nhịp nào)
  src/Compositions.tsx Đăng ký composition trong Studio
  docs/                Quy tắc series, kịch bản in, lịch sử sửa
  tracker.csv          Theo dõi trạng thái các tập
src/Root.tsx           Gom composition của mọi dự án vào một Studio
tools/                 Lệnh dùng chung: xuất video, srt, kịch bản in, lồng tiếng (voice/), bot (bot/)
tools/projects.mjs     Danh sách dự án và đường dẫn của từng dự án
voices/                Giọng mẫu Cụ Đồ, Thằng Cháu (dùng chung)
public/                sfx/ (dùng chung), voice/<dự án>/ (tiếng sinh ra, không vào git), footage/
out/<dự án>/           File xuất ra: video, cover, srt, versions, log bot (không vào git)
docs/runbook.md        Từng bước sản xuất, bảng lệnh, xử lý sự cố
```

## Thêm một dự án mới

1. Chép thư mục `projects/vi-sao` thành `projects/<id-mới>`, đổi `id`, `name`, `short`, `composition`, `cover` trong `project.json` (id composition không được trùng dự án khác).
2. Sửa khuôn tập `src/episodes/make.ts` (các nhịp), `project.mjs` (tên nhịp, chỗ sửa được, ràng buộc), `src/Episode.tsx` (thẻ chữ), `publish.mjs`, `docs/series-bible.md`.
3. Đổi `PROJECT_ID` trong `src/brand.ts`, thêm `<TenDuAnCompositions />` vào `src/Root.tsx`.
4. Bot tự nhận dự án mới khi khởi động lại; công cụ dòng lệnh dùng ngay với `-p <id>`.

## Lồng tiếng

Tiếng thoại sinh bằng model OmniVoice trong repo `D:\Tao_giong_noi_local` (đổi chỗ khác thì đặt biến môi trường `TTS_ROOT`). Chỉ dùng OmniVoice vì giấy phép Apache 2.0 cho phép kiếm tiền; **không dùng Viterbox** (CC BY-NC, cấm thương mại).

1. **Giọng mẫu** nằm ở `voices/cu-do.wav` và `voices/thang-chau.wav`, kèm file `.txt` ghi đúng câu đã đọc. Hai giọng này được tạo từ mô tả (ông già giọng trầm, cậu thiếu niên giọng cao), không nhân bản giọng người thật nào. Mọi dự án dùng chung hai giọng này.
   - Muốn đổi giọng: `npm run voice:design` sinh 4 phương án mỗi vai vào `voices/mau/`, nghe rồi chọn bằng `npm run voice:pick -- cu-do 3`.
2. **Sinh tiếng**: `npm run voice -- -p <dự án> tuan-1`. Mỗi câu khoảng 20 giây trên GTX 1660 Super. Tắt Remotion Studio khi chạy cho đỡ tốn RAM.
   - Câu không đổi chữ được giữ nguyên, sửa câu nào thì chỉ sinh lại câu đó. `--force` để sinh lại tất cả.
   - Lệnh in tổng thời lượng mỗi tập, cảnh báo nếu quá 40 giây (nên cắt) hoặc quá 60 giây (phải cắt).
3. **Kiểm tra**: `npm run voice:check -- -p <dự án> tuan-1` chép lời từng file bằng ASR và báo câu không khớp.
4. **Xuất**: tập đã có tiếng thì độ dài nhịp tự theo tiếng thật và phụ đề khớp từng câu. Tốc độ đọc của từng vai chỉnh ở `SPEAKERS` trong `tools/voice/make_voice.py`.

Khi đăng, **bật nhãn "nội dung do AI tạo"** trên TikTok và YouTube.

## Bot Telegram

Một bot phục vụ mọi dự án. Dự án nào bật lịch (`project.json` → `schedule.enabled`) thì mỗi ngày:

- **Giờ đăng** (`publish.postTime`: Vì sao 11:30, Nói vậy 11:45): bot nhắc đăng tập hôm nay, gửi lại gói đăng bài kèm nút gửi lại video.
- **Giờ duyệt** (`schedule.notifyTime`: Vì sao 20:00, Nói vậy 20:30): bot gửi kịch bản của ngày mai kèm 3 nút **Duyệt**, **Sửa thoại**, **Bỏ qua**.

Mỗi tin ghi rõ dự án nào.

- **Duyệt:** bot kiểm tra ràng buộc của dự án (ví dụ "Ông Ơi, Vì Sao?" bắt buộc có ít nhất 2 nguồn kiểm chứng), lồng tiếng, kiểm tra tiếng, xuất video và ảnh bìa, gửi lại file mp4, ảnh bìa và gói đăng bài, rồi cập nhật `tracker.csv` của dự án.
- **Sửa thoại:** nhắn `6.2: nội dung mới` để sửa đúng một câu, hoặc nhắn tự nhiên. Claude Code trên máy đọc yêu cầu (theo quy tắc riêng của từng series) và đề xuất bản sửa kèm phần diễn; bot kiểm tra rồi cho xem trước, chỉ sửa file khi bạn bấm **Áp dụng**.
- **Bỏ qua:** bot nhắc lại sau 2 giờ.

**Lệnh** (mã dự án ghi ngay sau lệnh, bỏ trống thì dùng dự án đang chọn):

| Lệnh | Việc |
| --- | --- |
| `/duan vs` | Chọn dự án làm việc (`/duan` để xem danh sách) |
| `/tap vs 1` | Xem và duyệt tập 1 |
| `/batdau vs 2026-12-01` | Đặt ngày đăng tập 1 |
| `/gio vs 20:00` | Đổi giờ gửi kịch bản để duyệt |
| `/giodang vs 11:30` | Đổi giờ nhắc đăng bài |
| `/lichsu vs 1` | Các phiên bản video đã xuất, gửi lại bản cũ |
| `/dangbai vs 1` | Gửi lại gói đăng bài |
| `/trangthai` | Tình hình mọi dự án |
| `/huy` | Thoát chế độ sửa |

**Cài đặt lần đầu:**
1. Nhắn `/newbot` cho @BotFather trên Telegram để tạo bot và lấy token.
2. Chép `.env.example` thành `.env`, điền `TELEGRAM_BOT_TOKEN`.
3. Chạy thử `npm run bot`, mở bot trong Telegram và gõ `/start`. Chat đầu tiên gõ `/start` sẽ là chat duy nhất điều khiển được bot.
4. Gõ `/batdau nv 2026-12-01` (ngày đăng tập 1 của từng dự án).
5. Tắt bản chạy thử (Ctrl+C), rồi chạy `npm run bot:install` để bot tự chạy ngầm mỗi khi đăng nhập Windows. Gỡ bằng `npm run bot:uninstall`.

**Lưu lịch sử:**
- Mỗi lần áp dụng sửa kịch bản, bot tự commit git: file kịch bản, kịch bản in, `tracker.csv`, và ghi yêu cầu, tóm tắt, câu cũ, câu mới vào `projects/<dự án>/docs/lich-su/ngay-XX.md`.
- Mỗi lần xuất video (qua bot, hoặc chạy tay `npm run render`), video được lưu thành phiên bản mới trong `out/<dự án>/versions/ngay-XX/vN/`: video và ảnh bìa đặt tên theo nội dung tập, không dấu (ví dụ `an_qua_nho_ke_trong_cay.mp4` và `an_qua_nho_ke_trong_cay.png`), cùng `kich-ban.json`, `voice-manifest.json`, `info.json` (có mã commit), `dang-bai.txt`. Bản cũ không bị ghi đè.
- Bot chỉ commit trên máy. Đặt `"autoPush": true` trong `bot.config.json` để tự đẩy lên GitHub.
- `out/` không vào git vì video nặng, cần sao lưu riêng.

Cài đặt chung (múi giờ, nhắc lại sau mấy giờ, dự án mặc định) ở `bot.config.json`; lịch và gói đăng bài của từng dự án ở `projects/<dự án>/project.json`. Log bot ở `out/bot/bot.log`, log tạo từng tập ở `out/<dự án>/bot/ngay-XX.log`, trạng thái ở `.bot/state.json` (không vào git).

## Lưu ý

- Footage và file xuất ra rất nặng nên không đưa vào git. Hãy sao lưu `public/footage/` và `out/` lên Google Drive hoặc ổ cứng ngoài.
- Nhạc nền nên chọn trong thư viện của TikTok / YouTube khi đăng, đừng ghép nhạc ngoài vào video để tránh bị tắt tiếng vì bản quyền.
- Remotion miễn phí cho cá nhân và công ty tối đa 3 nhân viên. Xem [giấy phép Remotion](https://remotion.dev/license).
