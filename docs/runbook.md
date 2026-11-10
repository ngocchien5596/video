# Runbook: sản xuất một tập từ kịch bản đến lúc đăng

Làm theo đúng thứ tự từ trên xuống. Mọi lệnh chạy trong thư mục `D:\Video` (Git Bash, PowerShell hay terminal của VS Code đều được).

Lịch quay theo tuần, checklist nội dung và cách viết caption nằm ở [quy-trinh.md](quy-trinh.md). Nhân vật và quy tắc nội dung nằm ở [series-bible.md](series-bible.md).

---

## 0. Cài đặt lần đầu (mỗi máy làm một lần)

| Bước | Lệnh / việc | Kiểm tra xong là |
| --- | --- | --- |
| 1 | Cài Node.js 22.18 trở lên | `node -v` in ra v22.18 trở lên |
| 2 | `git clone https://github.com/ngocchien5596/video.git D:\Video` | Có thư mục `D:\Video` |
| 3 | `npm install` | Không báo lỗi đỏ |
| 4 | Có repo giọng nói tại `D:\Tao_giong_noi_local`, gồm `viterbox\venv` (Python 3.12 có PyTorch CUDA) và model OmniVoice trong `OmniVoice\modelOmniLocal` | File `D:\Tao_giong_noi_local\viterbox\venv\Scripts\python.exe` tồn tại |
| 5 | Repo giọng nói nằm chỗ khác thì đặt biến môi trường `TTS_ROOT`, ví dụ `setx TTS_ROOT E:\Tao_giong_noi_local` rồi mở lại terminal | |
| 6 | `npm run lint` | Không báo lỗi |

Giọng mẫu `voices/cu-do.wav` và `voices/thang-chau.wav` đã có sẵn trong git, không cần tạo lại.

---

## 1. Quy trình một tuần

Thay `tuan-1` bằng tuần đang làm. Chỉ làm một tập thì thay bằng số ngày, ví dụ `5`.

### Bước 1. Chốt kịch bản

1. Sửa thoại trong `src/episodes/tuan-X.ts`.
2. Tra lại nghĩa thật (`meaning`) trong từ điển thành ngữ, tục ngữ.
3. Viết thoại để **đọc lên** cho tự nhiên:
   - Số viết bằng chữ ("ba con gà", không viết "3 con gà").
   - Không viết tắt.
   - Câu dài thì thêm dấu phẩy để giọng ngắt nghỉ.
4. Chạy `npm run lint` để bắt lỗi gõ sai cấu trúc.

### Bước 2. Lồng tiếng

Tắt Remotion Studio và các ứng dụng nặng (trình duyệt nhiều tab, game) trước khi chạy, vì máy chỉ có 6GB bộ nhớ card đồ hoạ và RAM còn trống ít.

```bash
npm run voice -- tuan-1
```

- Mất khoảng 20 giây mỗi câu, cả tuần khoảng nửa tiếng. Có thể để chạy rồi làm việc khác.
- Cuối lệnh in thời lượng từng tập. Tập nào bị đánh dấu **quá 60 giây** thì rút gọn thoại rồi chạy lại. Lệnh chỉ sinh lại những câu đã sửa.

### Bước 3. Kiểm tra tiếng

```bash
npm run voice:check -- tuan-1
```

- Câu nào hiện `XEM` là máy nghe ra khác với chữ trong kịch bản. Mở file `.wav` tương ứng trong `public/voice/ngay-XX/` để nghe.
  - Tên file dạng `3-2-cd.wav` nghĩa là nhịp thứ 3, câu thứ 2, Cụ Đồ nói.
- Nếu đọc sai thật thì sửa chữ cho dễ đọc hơn (thêm dấu phẩy, viết lại từ khó) rồi chạy lại Bước 2.
- Máy báo khớp vẫn chưa đủ: vẫn phải tự nghe cả tập ở Bước 4.

### Bước 4. Xem lại trong Studio

```bash
npm run dev
```

Mở tập trong thư mục `Tuan-X` và xem hết từ đầu đến cuối, có bật tiếng. Kiểm tra:

- [ ] Giọng đúng vai, không vấp, không nuốt chữ
- [ ] Phụ đề hiện đúng lúc nhân vật nói
- [ ] Thẻ "NGÀY X/30", "NGHĨA THẬT" và thẻ cuối không che phụ đề
- [ ] Tiếng "ding", record scratch, whoosh không át lời thoại
- [ ] Không có chữ hay hành động quan trọng nằm trong vùng bị nút TikTok / Shorts che: ở bảng Props bên phải, đặt `"safeZones": true` để tô đỏ các vùng đó (chỉ hiện khi xem, video xuất ra không có)
- [ ] Lệnh `npm run voice` không báo "trên 40 giây". Nếu có, nên cắt bớt thoại (qua bot: Sửa thoại, nhắn "rút gọn còn dưới 40 giây")

Xem xong thì **tắt Studio** (Ctrl+C) trước khi xuất video.

### Bước 5. Xuất file

```bash
npm run render -- tuan-1     # out/video/ngay-XX.mp4
npm run cover  -- tuan-1     # out/cover/ngay-XX.png
npm run srt    -- tuan-1     # out/srt/ngay-XX.srt (chỉ cần khi dựng thêm trong CapCut)
```

Chép file mp4 sang điện thoại và xem một lần trên màn hình thật, bằng loa điện thoại.

### Bước 6. Đăng bài

1. Đăng cùng một file mp4 lên TikTok và YouTube Shorts.
2. **Bật nhãn "nội dung do AI tạo"** trên cả hai nền tảng, vì giọng là giọng AI.
3. Lấy tiêu đề, mô tả YouTube, caption TikTok, hashtag và bình luận ghim trong `out/versions/ngay-XX/vN/dang-bai.txt` (bot gửi sẵn qua Telegram, gõ `/dangbai X` để gửi lại). Muốn tự viết thì xem mẫu ở [quy-trinh.md](quy-trinh.md#đăng-bài).
4. Ghim câu hỏi của tập vào phần bình luận.
5. Cập nhật `tracker.csv`: cột `trang_thai` lần lượt `da-dung` → `da-hen-gio` → `da-dang`, rồi điền link bài đăng.

### Bước 7. Lưu lại

```bash
git add -A
git commit -m "Tuần X: chốt kịch bản và lồng tiếng"
git push
```

Tiếng (`public/voice/`), footage (`public/footage/`) và file xuất (`out/`) không vào git. Muốn giữ bản đã đăng thì chép thư mục `out/video/` lên Google Drive.

---

## 1b. Chạy hằng ngày bằng bot Telegram

Cài bot một lần theo mục "Bot Telegram" trong README. Sau đó mỗi ngày:

1. **20:00**: bot gửi kịch bản ngày mai. Đọc kỹ, nhất là nghĩa thật (`nghia`).
2. Chỗ chưa ổn thì bấm **Sửa thoại** rồi nhắn yêu cầu.
   - Bot gửi bản so sánh trước và sau, bấm **Áp dụng** để sửa. Bot gửi lại kịch bản mới để duyệt tiếp.
   - Cách nhắn chính xác nhất: `6.2: nội dung mới`, mỗi dòng một chỗ.
3. Bấm **Duyệt**. Khoảng 5–10 phút sau, bot gửi về video, ảnh bìa và gói đăng bài: tiêu đề + mô tả YouTube Shorts, caption TikTok, hashtag, bình luận ghim, giờ đăng gợi ý (mỗi phần một khối, bấm vào là sao chép). Bot cũng báo nếu có câu bị đọc sai hoặc video dài quá 60 giây.
4. Xem video trên điện thoại rồi đăng theo Bước 6 ở trên.

Qua bot có thể sửa, thêm, xoá câu, đổi cảnh, viết phần diễn. Mỗi lần sửa mất khoảng một phút vì bot nhờ Claude Code viết lại cả tập, rồi kiểm tra lỗi trên bản sao trước khi cho xem. Không có gì bị sửa khi chưa bấm **Áp dụng**. Phần diễn do bot viết chỉ dùng được đạo cụ và cảnh có sẵn; thiếu thứ gì thì bot dùng đồ gần giống và nói rõ trong tóm tắt.

---

## 2. Bảng lệnh

| Lệnh | Việc |
| --- | --- |
| `npm run dev` | Mở Studio để xem các tập |
| `npm run lint` | Kiểm tra code và kịch bản có gõ sai cấu trúc không |
| `npm run voice -- <ngày>` | Sinh tiếng, chỉ cho những câu chưa có hoặc đã sửa |
| `npm run voice -- <ngày> --force` | Sinh lại tiếng cho tất cả các câu |
| `npm run voice:check -- <ngày>` | Máy nghe lại, báo câu đọc sai |
| `npm run voice:design` | Tạo 4 phương án giọng mẫu mỗi vai vào `voices/mau/` |
| `npm run voice:pick -- cu-do 3` | Chọn phương án 3 làm giọng Cụ Đồ (`thang-chau` cho Thằng Cháu) |
| `npm run render -- <ngày>` | Xuất mp4 |
| `npm run cover -- <ngày>` | Xuất ảnh bìa |
| `npm run srt -- <ngày>` | Xuất phụ đề .srt (`--no-names` để bỏ tên người nói) |
| `npm run sheets` | Sinh lại kịch bản in trong `docs/kich-ban/` |
| `npm run bot` | Chạy bot Telegram ở cửa sổ hiện tại (để thử) |
| `/lichsu 5` (Telegram) | Xem các phiên bản video đã xuất của tập 5, gửi lại bản cũ. Lịch sử sửa kịch bản ở `docs/lich-su/ngay-05.md` |
| `/dangbai 5` (Telegram) | Gửi lại gói đăng bài của tập 5. Giờ đăng, hashtag, câu ghi chú AI sửa trong `bot.config.json` → `publish` |
| `npm run bot:install` / `bot:uninstall` | Cài / gỡ bot chạy ngầm khi đăng nhập Windows |

Cách ghi `<ngày>`: `5`, `1 3 5`, `1-7`, `tuan-2`, `all`.

---

## 3. Việc thỉnh thoảng mới làm

### Đổi giọng một vai

1. Chạy `npm run voice:design`, rồi nghe các file trong `voices/mau/`.
2. Chọn phương án ưng ý: `npm run voice:pick -- thang-chau 4`.
3. Chạy `npm run voice -- all`. Lệnh tự nhận ra giọng mẫu đã đổi và sinh lại mọi câu của vai đó.
4. Commit hai file trong `voices/`.

Dùng giọng tự thu thay cho giọng AI:
- Ghi đè `voices/cu-do.wav` bằng file thu 5–10 giây, phòng yên tĩnh.
- Sửa `voices/cu-do.txt` cho đúng từng chữ đã đọc.
- Chạy lại Bước 2.

**Không** dùng các giọng mẫu trong `D:\Tao_giong_noi_local\wavs` (Doraemon, Nobita, giọng người nổi tiếng), vì dễ bị khiếu nại bản quyền.

### Đổi tốc độ đọc

Sửa `speed` trong `SPEAKERS` ở `tools/voice/make_voice.py`. Hiện tại Cụ Đồ là `1.0`, Thằng Cháu là `1.08`; số lớn hơn là đọc nhanh hơn. Sau đó chạy `npm run voice -- all`.

### Dùng footage quay thật thay cho animatic

1. Xuất footage vào `public/footage/ngay-XX.mp4`.
2. Thêm `footage: "footage/ngay-XX.mp4"` vào tập đó.
3. Chọn một trong hai cách:
   - Footage đã có tiếng người thật: **xoá thư mục `public/voice/ngay-XX/`** để tránh hai lớp tiếng chồng nhau, rồi chỉnh `seconds` của từng nhịp cho khớp footage.
   - Footage không có tiếng: giữ lồng tiếng. Độ dài nhịp sẽ theo tiếng, nên phải dựng footage khớp theo.

---

## 4. Xử lý sự cố

| Hiện tượng | Nguyên nhân | Cách xử lý |
| --- | --- | --- |
| `Không thấy Python của repo giọng nói` | Repo giọng nói không nằm ở `D:\Tao_giong_noi_local` | Đặt `TTS_ROOT` (mục 0, bước 5) |
| `Thiếu giọng mẫu voices/...wav` | Chưa có giọng mẫu | `npm run voice:design` rồi `npm run voice:pick` |
| `CUDA out of memory`, hoặc lệnh voice chạy rất chậm | Card đồ hoạ hoặc RAM đang bị ứng dụng khác chiếm | Tắt Studio, trình duyệt, game rồi chạy lại. Câu đã xong được giữ, không phải làm lại |
| Studio hoặc lệnh render tự tắt giữa chừng | Thiếu RAM | Tắt bớt ứng dụng, mỗi lần chỉ render một tuần |
| Video có tiếng nhưng một nhịp bị câm, phụ đề lệch | Đã sửa chữ trong kịch bản sau khi sinh tiếng. Nhịp đó tự quay về cách chia thời gian cũ và không phát tiếng cũ | Chạy lại `npm run voice -- <ngày>` |
| Một câu đọc sai dù đã sửa chữ | Model khó đọc từ đó | Viết lại câu bằng từ dễ đọc hơn, hoặc tách thành 2 câu ngắn |
| Tập dài hơn 60 giây | Thoại quá dài | Cắt bớt thoại ở nhịp hiểu sai hoặc ví dụ, rồi chạy lại voice |
| `npm run lint` báo lỗi trong `tuan-X.ts` | Thiếu dấu phẩy, ngoặc hoặc dấu nháy | Xem số dòng trong lỗi và sửa ở đó |
| Không nhận được tin nhắn lúc 20:00 | Bot không chạy, hoặc chưa đặt ngày bắt đầu | Gõ `/trangthai` trong Telegram. Bot không trả lời thì xem `out/bot/bot.log` và chạy lại `npm run bot:install` |
| Bot báo "Lỗi khi nhờ Claude hiểu yêu cầu" | Không tìm thấy lệnh `claude`, hoặc Claude Code chưa đăng nhập | Mở terminal gõ `claude` để đăng nhập. Nếu Task Scheduler không tìm thấy thì đặt `CLAUDE_BIN` trong `.env`. Trong lúc chờ, vẫn sửa được bằng cách nhắn `6.2: ...` |
| Bot báo "Không tìm thấy nội dung của ..." khi áp dụng | Kịch bản trong repo vừa bị sửa tay, khác với bản bot đang hiện | Gõ `/tap N` để tải lại kịch bản rồi sửa lại |
| Máy mới không có tiếng | `public/voice/` không có trong git | Chạy `npm run voice -- all` (khoảng 2 tiếng) |
