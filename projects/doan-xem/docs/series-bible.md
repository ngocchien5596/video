# Series bible: Đoán Xem Là Ai

Series về nhân vật lịch sử. Mỗi tập kể theo dòng đời của một người, gợi ý đi từ khó tới dễ, tới cuối mới lộ tên.

- Lập 27/11/2026 từ đề xuất của chủ kênh. Chốt theo tập mẫu Nguyễn Du (ngày 1, v1–v2).
- Đã soát với [chuan-dung-canh.md](../../../docs/chuan-dung-canh.md) và [giong-loi-thoai.md](../../../docs/giong-loi-thoai.md).
- Danh sách nhân vật: [danh-sach.md](danh-sach.md).
- Tập mẫu: nghiên cứu [nghien-cuu/ngay-01.md](nghien-cuu/ngay-01.md), kịch bản `src/episodes/dot-1.ts`, ảnh AI [anh-ai/ngay-01.md](anh-ai/ngay-01.md).

Lệnh dùng mã dự án `dx`, ví dụ `npm run review -- -p dx 1`.

## 1. Nhận diện
- **Tên:** "Đoán Xem Là Ai". Tên file, chữ trên hình và bài đăng không có số tập.
- **Người kể:**
  - Một giọng người dẫn (NARRATOR), gọi người xem là "bạn". Không có Cụ Đồ và Thằng Cháu.
  - Giọng mẫu là `voices/doan-xem.wav` kèm lời mẫu `voices/doan-xem.txt`, do chủ kênh gửi. Cài qua `project.json` → `"voices"`.
  - KHÔNG tạo `voices/narrator.wav`, vì sẽ đổi giọng của Kiến Thức.
- **Thời lượng:** nên dưới 2 phút, trên 2 phút 30 giây là phải sửa. Giọng mẫu đọc chậm (~3,4 tiếng/giây), tập mẫu dài 2 phút 23 giây.

### Công thức cố định mỗi tập (bốn nhịp `mo`, `thu`, `chot`, `khep`)
1. **Mơ hồ (`mo`):**
   - Câu mở luôn là "Bạn thử đoán xem đây là ai nhé…".
   - Đầu đời, gia thế, biến cố. Người xem chưa nên đoán ra.
2. **Thu hẹp (`thu`):** có một cú lừa có chủ đích, đẩy người xem đoán nhầm hướng (Nguyễn Du: "nghe giống một vị tướng").
3. **Gần chốt (`chot`):**
   - Câu đầu "Và đây là gợi ý cuối cùng…".
   - Câu gợi ý cuối có `pauseAfter: GUESS_PAUSE`. Đây là khoảng dừng đoán DUY NHẤT trong tập.
   - Sau khoảng dừng, câu kế tiếp lật đáp án: "Đúng rồi đấy! Đó là…".
4. **Khép lại (`khep`):**
   - Cuối đời, rồi câu kết quay về hình ảnh của câu mở (Nguyễn Du: thanh gươm → những câu thơ).
   - Không kêu gọi theo dõi, không hé tập sau.
5. **Câu hỏi cuối (`question`, hiện ở thẻ cuối):**
   - Hỏi về chính nhân vật hay tác phẩm, kéo người xem bình luận (Nguyễn Du: "Câu thơ nào bạn nhớ nhất trong Truyện Kiều?").
   - Câu này thường lộ đáp án. Vì vậy nó chỉ hiện trong video và ở bình luận ghim, không đưa vào tiêu đề hay caption (publish.mjs tự làm).

### Quy tắc lời
- Mỗi gợi ý phải có nguồn đã đọc.
- Giai thoại giữ chữ "tương truyền" hoặc "theo … kể lại".
- Chỗ các nguồn vênh nhau thì nói tránh, ví dụ "chừng mười tuổi".
- Không lộ tên hay tác phẩm trước câu lật đáp án.
- Câu người dẫn không mở bằng "Ông": giọng dễ bị đọc lẫn, `npm run review` sẽ báo phải sửa.

## 2. Bộ nhận diện hình

### Hình và màu
| Yếu tố | Quy tắc cố định |
|---|---|
| Chất liệu | Tranh mực trên giấy dó: nét bút lông, vân giấy, vết ố nhẹ |
| Màu nền chung | Trắng ngà giấy dó, đen mực, đỏ son (dùng cho ấn) |
| Màu nhấn | Mỗi nhân vật một màu (`accent`; Nguyễn Du: `#5FA8A0`, xanh ngọc nhạt). Chỉ đổi màu nhấn, không đổi nền |
| Khung | Cuộn giấy dó có hai trục gỗ, giống nhau mọi tập. Khung cân giữa, lề 60 px mỗi bên |
| Nhân vật | Chỉ vẽ bóng, bóng lưng, bàn tay, đồ vật. Mặt chỉ hiện ở cảnh lật đáp án |
| Vật biểu tượng | Mỗi tập một đồ vật chạy xuyên suốt (Nguyễn Du: gươm, rồi bút) |

Quy định "chỉ vẽ bóng" là ngoại lệ có chủ đích, khác chuẩn "mặt có nét" ở chuan-dung-canh mục 2 (mục đó viết cho Cụ Đồ và Thằng Cháu).

### Dấu hiệu riêng của series
| Yếu tố | Quy tắc cố định |
|---|---|
| Thang gợi ý | Ba chấm tròn ở góc trên bên trái, sáng dần theo ba nhóm |
| Cảnh hỏi | Hết gợi ý cuối thì tranh mờ đi, sang cảnh giấy trống. Chữ lớn "Nhân vật này là ai?" ở trên, đồng hồ đếm ngược 3 giây ở dưới, tiếng tích tắc, nhạc tắt |
| Lật đáp án | Tranh minh hoạ nhân vật (dòng nhỏ "tranh minh hoạ"), ấn đỏ đóng xuống mang tên và tác phẩm / dấu ấn (`known`), tiếng đóng ấn và tiếng thanh la |
| Thẻ cuối | Câu hỏi cuối bằng font có chân, cả ba chấm sáng |
| Ảnh bìa | Cùng bố cục với ảnh bìa các series khác của kênh (Nói vậy, Vì sao, Kiến Thức, Chỗ lạ): nền chuyển màu đỏ son → mực, tên series chữ Bangers viền đen, câu đố `coverTitle` trên khung vàng nghiêng, dòng phụ "Nhân vật lịch sử · <chủ đề>". KHÔNG lộ tên nhân vật (chủ kênh 27/11/2026) |

### Âm thanh: đặc trưng kênh
Mọi đoạn nhạc dùng chung tiếng gảy dây (gần đàn tranh, đàn nguyệt) và **motif 5 nốt ngũ cung của nhạc hiệu**: Sol La Đô Rê Đô … Sol. Chủ kênh duyệt 27/11/2026.

| Đoạn | File | Nhạc |
|---|---|---|
| Mở đầu | `public/sfx/nhac-hieu.wav` | Nhạc hiệu 3 giây |
| Nhóm 1 | `public/music/doan-xem/mo.wav` | Chậm, thưa, ngân trầm, motif hé vài nốt |
| Nhóm 2 | `thu.wav` | Trống trầm và mõ giữ nhịp, đàn hỏi đáp |
| Nhóm 3 | `chot.wav` | Nhịp dồn, câu đàn lặp, căng dần. Tắt hẳn khi đếm ngược |
| Lật đáp án | `lat.wav` | Thanh la, trống, motif đầy đủ, sáng |
| Khép lại | `khep.wav` | Chậm, hơi buồn (Sol Sib Đô Rê Fa), đàn có rung |
| Thẻ cuối | `ket.wav` | Motif chơi chậm lại, khép vòng |

- Tiếng lẻ: `public/sfx/tich-tac.wav` và `dong-an.wav`.
- Nhạc nền tự hạ còn 35% khi có lời đọc, lên lại ở các quãng nghỉ. Hai đầu mỗi đoạn nhỏ dần, to dần (src/Episode.tsx, `MusicBed`).
- Mọi tập dùng chung bộ nhạc này, không làm nhạc riêng cho từng tập.
- Tạo lại nhạc: `projects/doan-xem/tools/make_music.py`. Tạo lại tiếng lẻ: `make_sfx.py`. Chạy bằng python của repo giọng nói với `-I`.

### Chữ
| Yếu tố | Quy tắc cố định |
|---|---|
| Font | Noto Serif (có chân) cho tên series, tên nhân vật, chữ lớn. Be Vietnam Pro (không chân) cho phụ đề. Không thêm font khác |
| Chữ trên hình | Chỉ những chữ cần thiết: tên đất, năm (`scene.chip`), con số lớn trong câu đọc (`scene.big`), tên lúc lật đáp án. Không gắn nhãn thừa |
| Chữ trong tranh | Chữ trên sách, giấy là chữ giả bằng nét bút (`FakeColumn`). Không vẽ chữ thật, không để AI vẽ chữ |

### Nhịp hình (chuan-dung-canh mục 5)
- Mỗi câu một tranh, hoà tan 0,5 giây giữa hai câu, máy quay zoom chậm trong mỗi câu.
- Hình vẽ sát nghĩa đen câu đọc.

## 3. Nguồn hình: hướng C (đã chốt 27/11/2026)
- Mỗi câu có `scene.ink`: cảnh vẽ bằng code (`src/ink/scenes.tsx`, bộ vẽ ở `src/ink/kit.tsx`).
- Khoảng 3 cảnh lớn mỗi tập dùng ảnh AI do chủ kênh tự tạo:
  - Cảnh mở (phong cảnh, nơi sinh).
  - Một cảnh phong cảnh giữa tập.
  - Chân dung lúc lật đáp án.
- Những câu này có thêm `scene.image` (đường dẫn trong `public/`) và `scene.prompt`. Có file thì player dùng ảnh, chưa có thì vẽ cảnh mực dự phòng.

**Quy tắc prompt ảnh AI** (đầy đủ ở `docs/anh-ai/ngay-XX.md`):
- Mở đầu bằng đoạn khoá phong cách: `Vietnamese ink wash painting on aged rice paper (giấy dó), loose brush strokes, visible paper texture, limited palette of ink black, ivory and cinnabar red, soft vignette, flat 2D illustration, no photorealism`.
- Negative prompt: `text, letters, calligraphy, watermark, signature, Chinese architecture, Japanese clothing, photorealistic`.
- Ghi rõ thời kỳ, trang phục, kiến trúc Việt (khăn đóng, áo giao lĩnh, mái nhà Bắc Bộ cong nhẹ). Tránh mái cong vút kiểu đình chùa Trung Hoa.

**Xử lý ảnh trước khi dùng:**
- Lưu bản gốc vào `out/doan-xem/anh-ai/ngay-XX/goc/`.
- Cắt viền giấy rách, khung thừa và mọi dấu hình mờ (watermark) của công cụ tạo ảnh. Ảnh Nguyễn Du có dấu ✦ ở góc.
- Chân dung: lấy từ đầu tới tay, đổi tỉ lệ 960×1100, để mặt ở nửa trên vì ấn đỏ đóng phía dưới.
- Đặt vào `public/doan-xem/ngay-XX/<tên>.png`, đúng tên trong `scene.image`.

## 4. Quy trình dựng một tập
1. **Tra nguồn:** đọc nguồn thật (không viết từ trí nhớ). Viết `docs/nghien-cuu/ngay-XX.md` gồm:
   - danh sách nguồn đã đọc
   - bảng dòng đời (mốc, nguồn, chỗ các nguồn vênh nhau)
   - thang gợi ý
   - nháp lời
   - mục "còn phải kiểm"
2. **Kịch bản:**
   - Viết vào `src/episodes/dot-N.ts` bằng `makeEpisode`: bốn nhịp, mỗi câu `n(lời, scene)`.
   - Mỗi câu có `scene.ink`. Có `chip` / `big` khi câu nhắc tên đất, năm, con số.
   - Câu gợi ý cuối có `{ pauseAfter: GUESS_PAUSE }`.
   - Điền `person`, `known`, `title` (tiêu đề đăng bài, không lộ tên), `coverTitle` (câu đố ngắn cho ảnh bìa, khoảng 6–10 chữ, kết bằng "Là ai?", không lộ tên; vd "Con tể tướng được tặng gươm báu. Là ai?"), `accent`, `portrait`, `question`, `sources`.
   - Soát theo giong-loi-thoai.
   - Thêm tập vào `src/episodes/index.ts`, thêm dòng vào `tracker.csv`.
3. **Cảnh mực:** vật biểu tượng, cảnh nào chưa có thì vẽ thêm vào `src/ink/scenes.tsx` rồi đăng ký trong `INK_SCENES`.
4. **Ảnh AI:**
   - Viết `docs/anh-ai/ngay-XX.md` (bảng file, câu, prompt).
   - Chủ kênh tạo ảnh rồi thả vào `public/doan-xem/`.
   - Claude chuyển ảnh vào `ngay-XX/`, xem từng ảnh, xử lý theo mục 3, và báo chỗ sai lịch sử nếu có.
5. **Lồng tiếng và kiểm tiếng:**
   - `npm run voice -- -p dx N`
   - `npm run voice:check -- -p dx N`
   - `npm run voice:pauses -- -p dx N` (bắt ngắt sai chỗ, ngân dài; sinh lại riêng câu lỗi bằng `--redo=2-2`)
6. **Duyệt:** `npm run review -- -p dx N` chụp ảnh từng câu (không AI chấm). Xem thêm các khung đặc biệt: cảnh hỏi, ấn đỏ, thẻ cuối. Phải hết lỗi "phải sửa".
7. **Render** (chỉ khi chủ kênh bảo): `npm run render -- -p dx N`.
   - Video: `out/doan-xem/video/<tên>.mp4`.
   - Ảnh bìa (không lộ tên, cùng kiểu các series khác): `out/doan-xem/cover/`, kèm một bản trong `vK/`. Xem ảnh bìa trước khi giao.
   - Chỉ sửa ảnh bìa (không đổi video): `npm run cover -- -p dx N`. Lệnh này tự chép đè ảnh bìa mới vào bản lưu mới nhất `vK/`, không cần render lại.
   - Bản lưu: `out/doan-xem/versions/ngay-XX/vK/`.
   - Nhật ký render tự ghi vào `docs/lich-su/ngay-XX.md`. Thư mục này chỉ dành cho nhật ký, bài nghiên cứu để ở `nghien-cuu/`.
   - Muốn nghe thử một đoạn trước: `npx remotion render src/index.ts DoanXem-XX out/doan-xem/nghe-thu/<tên>.mp4 --frames=A-B`.
8. **Đăng bài:** gói đăng (publish.mjs) giữ tiêu đề, caption không lộ tên. Bình luận ghim có đáp án, câu hỏi cuối và nguồn.

## 5. Cảnh lật đáp án
- Phần lớn nhân vật không có chân dung đương thời, Nguyễn Du cũng vậy. Khi đó dùng tranh minh hoạ theo phong cách series (`portrait: "minh-hoa"`), video tự ghi "tranh minh hoạ".
- Không tạo gương mặt trông như ảnh thật.
- Nhân vật có chân dung thật thuộc phạm vi công cộng (Yersin, Marie Curie): có thể dùng ảnh (`portrait: "anh-that"`), nhưng phải ghi nguồn ảnh.

## 6. Trước khi nhân ra cả series
1. Tập mẫu Nguyễn Du: xong. Đã chốt nguồn hình, khung, font, màu, ấn, nhạc, cảnh hỏi.
2. Tập thứ hai nên chọn nhân vật khác hẳn, ví dụ một vị tướng thật như Trần Hưng Đạo, để thử bộ nhận diện. Xem vẫn nhận ra cùng series thì mới nhân rộng.
