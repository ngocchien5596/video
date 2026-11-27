# Dựng cảnh 3D cho Kiến Thức

Từ 26/11/2026, mọi tập **Kiến Thức mới** dựng cảnh 3D low-poly (three.js), theo lối video tài liệu hoạt hình mà chủ kênh chọn làm mẫu: "What's Actually Inside the Pentagon" (Denis Shmalts). Tập mẫu đầy đủ: tập 16 Lầu Năm Góc, [engine/parchment/ep16.tsx](../../../engine/parchment/ep16.tsx).

Tập cũ giữ cảnh SVG như đã dựng, chỉ chuyển sang 3D khi chủ kênh yêu cầu riêng tập đó. Tập đã đăng thì không sửa.

Khung kênh giữ nguyên: tiêu đề trên, sân khấu bo góc viền đồng, phụ đề dưới, ảnh bìa chữ. Chỉ phần bên trong sân khấu (900×786) là 3D.

Vẫn áp dụng đủ chuẩn chung [docs/chuan-dung-canh.md](../../../docs/chuan-dung-canh.md) và chuẩn lời [docs/giong-loi-thoai.md](../../../docs/giong-loi-thoai.md).

## 1. Phong cách

- **Toàn cảnh từ trên cao**: máy quay bay vòng, chúc xuống chậm. Cảnh toàn phải thấy một dải trời xanh có mây ở trên (đặt máy thấp, nhìn hơi xa) và lớp sương mờ ở xa để tạo chiều sâu. Có tiền cảnh (cây, xe, đường), trung cảnh (vật chính), hậu cảnh (sông, phố xa).
- **Khối low-poly, màu tươi**: mặt phẳng, bóng đổ thật, tường có cửa sổ, cây tròn, xe nhiều màu. Không vẽ chi tiết thừa, nhưng cảnh phải đầy, không để nền trống.
- **Số liệu nổi to** (`BigNum`): chữ trắng viền đậm, bật nảy, đếm dần lên. Chỉ hiện số hoặc chữ **có trong câu đọc** (23.000, 16 tháng, 7 phút, ×2). Không gắn nhãn chữ thừa.
- **Tô sáng vàng** phần đang nói tới: viền, mái, đường đi, kèm số thứ tự nếu câu đang đếm.
- **Cảnh trong nhà hở mái** (`Room`): không có trần, nhìn thấy trời. Sàn gạch ô, tường hai màu, cửa gỗ, đèn tường.
- **Không có Milo trong cảnh 3D** (chủ kênh bỏ bản Milo 3D ngày 26/11/2026 vì xấu). Cảnh 3D chỉ dùng người que.
- **Người que 3D** (`Stick`): đầu tròn to viền đen, mắt chấm, thân áo theo vai (`officer`, `general`, `worker`, `suit`, `seller`), có bước đi, quay đầu, giơ tay cầm đồ.
- **Ký hiệu thay chữ**: đồng hồ kim quay (`Clock`), dấu hỏi đỏ (`Ask`), khung ngắm vệ tinh (`Reticle`).
- **Nhịp hình**: mỗi câu là một cú máy. Câu dài có thể cắt 2–3 cú, cắt bằng một chớp trắng ngắn (`flash`). Không để một hình đứng yên quá ~8 giây.
- **Cảnh cuối khép chuyện**: quay lại hình ảnh lúc mở (ví dụ quầy xúc xích ở tập 16).

## 2. Bộ dựng có sẵn

| File | Dùng để |
|---|---|
| `engine/three/kit3d.tsx` | Máy quay (`CamRig`, `lerpCam`), easing (`sm`, `popIn`), số ngẫu nhiên cố định (`rng`), vật liệu (`lambert`, `windowWall`, `tileFloor`), `Box`, cây (`Trees`), bãi xe (`ParkingLot`), đường (`Road`), người que (`Stick`), bánh xúc xích (`HotDog`), lớp phủ (`BigNum`, `Clock`, `Reticle`, `Ask`, `Sky`) |
| `engine/three/interior.tsx` | Phòng hở mái (`Room`), cửa (`Door`), đèn (`WallLamp`), cờ (`Flag`), bàn (`Desk`), đường dốc (`Ramp`) |
| `engine/three/stage.tsx` | `makeStage3D` (khung sân khấu: trời, ánh sáng, hoà cảnh đầu câu), máy quay `orbit` / `top`, chiếu điểm 3D ra điểm ảnh `P`, dải `BeamRoad` / `BeamY`, vật liệu vàng `goldMat` |
| `engine/three/weapons.tsx` | Đạo cụ dựng theo vật thật: đầu đạn (`Bullet`, có vệt khí, bóng đổ, bản mờ), súng ngắn (`Pistol`, `IN_HAND_Q` để cầm tay), đại bác cổ (`Cannon`), đạn pháo (`Cannonball`), vật liệu kim loại `metal` |
| `engine/three/pentagon.tsx` | Ví dụ một bối cảnh lớn: toà nhà, khung cảnh quanh (`Campus`) |
| `engine/three/prop-sheet.tsx` | Bảng đạo cụ (`PropSheet`): các đạo cụ chính xoay trên bệ, nhìn cận, để soát |
| `engine/parchment/stages3d.ts` | Sổ đăng ký: số tập → sân khấu 3D (`STAGES_3D`) và đạo cụ chính (`PROPS_3D`) |

Bối cảnh dùng lại được cho nhiều tập (phố, nhà, phòng học, bầu trời...) thì đặt thành file riêng trong `engine/three/`, không viết chết trong file tập.

## 3. Các bước dựng một tập

1. **Đọc kịch bản**: mỗi câu có trường `shot` mô tả hình. Dàn ý cú máy theo từng câu: máy đặt ở đâu, vật gì hiện ra, số nào nổi lên, cắt cảnh lúc nào (tính theo phần câu `u`).
2. **Viết thẻ đối tượng** cho mọi vật được lời dẫn nhắc tên (viên đạn, khẩu súng, đại bác, máy bay...), ở `projects/kien-thuc/docs/dao-cu/ngay-NN.md`, trước khi dựng. Mỗi thẻ ghi:
   - **Vật thật trông thế nào**: hình khối tổng thể, tỉ lệ các phần, các bộ phận nhận diện, chất liệu và màu. Theo hiểu biết chung về vật, hoặc ảnh, nguồn nếu vật lạ.
   - **Dấu hiệu nhận ra ngay**: 2–3 chi tiết mà thiếu thì người xem không nhận ra vật. Ví dụ: đầu đạn có mũi tròn thon, thân trụ, màu đồng; đại bác có nòng loe miệng, đai, núm đuôi, giá gỗ hai bánh.
   - **Kích thước trong cảnh**: vật to bao nhiêu trên khung hình ở cảnh xa nhất. Không nhỏ hơn khoảng 30 px trên sân khấu 900 px; quá nhỏ thì đổi góc máy, không phóng to sai tỉ lệ một cách lộ liễu.
   - **Không làm**: khối thô thay vật (hộp, ống trụ trơn, quả cầu trơn), quầng sáng to che vật, màu sai chất liệu.
3. **Dựng đạo cụ** theo thẻ: dùng hình tròn xoay (`LatheGeometry`) cho vật tròn xoay (đầu đạn, nòng pháo, chai lọ), ghép nhiều khối cho vật cơ khí; kim loại dùng `metal()` để có độ bóng. Đạo cụ dùng lại được thì đặt ở `engine/three/` (ví dụ `weapons.tsx`).
4. **Soi bảng đạo cụ**: khai báo đạo cụ chính của tập trong `PROPS_3D` (`engine/parchment/stages3d.ts`). `npm run review` sẽ tự chụp `out/review/kien-thuc/ngay-NN/dao-cu.png`; xem nhanh hơn thì chạy `npx remotion still KienThuc-DaoCu-NN <tệp>.png --frame=40`. So từng vật với thẻ: đúng hình dạng, đúng chất liệu, nhìn là nhận ra ngay. Chưa đạt thì sửa đạo cụ trước khi dựng cảnh.
5. **Tạo `engine/parchment/epNN.tsx`**: viết mỗi nhịp một mảng cú máy, mỗi câu một hàm `(t, u) => Shot`, rồi `export const EpNNStage = makeStage3D({ hook: [...], barrier: [...], ... })`.
   - Thời điểm tính theo `u` (0..1 của câu đang đọc), nhờ vậy giọng đọc dài ngắn khác nhau hình vẫn khớp.
   - Vị trí số to lấy bằng `P(cam, [x, y, z])`, để số bám theo vật khi máy quay di chuyển.
6. **Đăng ký** tập trong `engine/parchment/stages3d.ts`.
7. **Kiểm kiểu**: `npx tsc --noEmit -p .`
8. **Dựng thử cả tập, hình nhỏ, không tiếng** (khoảng 2 phút cho một tập 2 phút):
   `npx remotion render KienThuc-NN <thư mục tạm>/pNN.mp4 --scale=0.3 --muted --crf=24`
   Cắt khung 0,6 hình/giây ghép thành ảnh tổng để soi:
   `npx remotion ffmpeg -loglevel error -i pNN.mp4 -r 0.6 <thư mục>/%03d.jpg`
   Rồi chụp **ảnh cỡ thật** (`npx remotion still KienThuc-NN <tệp>.png --frame=<khung>`) ở mỗi câu có đạo cụ chính, xem ở kích thước thật: ảnh tổng nhỏ che mất lỗi hình dạng.
9. **Soi và sửa** theo bảng kiểm dưới đây. Hỏng mục nào thì sửa rồi dựng thử lại, tới khi qua hết.
10. **`npm run review -- -p kt NN`**: lỗi "phải sửa" xử lý hết. Xem ảnh tổng và bảng đạo cụ của bản duyệt.
11. **`npm run render -- -p kt NN`** khi chủ kênh bảo render.

### Bảng kiểm hình (mỗi câu)

- **Đúng đối tượng**: vật được nhắc trong câu có mặt trong hình, đúng vật đó (không thay bằng vật na ná), nhận ra ngay khi xem ở tốc độ thật. Không có vật thừa gây hiểu nhầm.
- **Đúng hành động**: hình làm đúng điều câu nói (rơi thì rơi thẳng, bay ngang thì bay ngang, cùng lúc thì cùng lúc), không làm lộ đáp án trước khi lời dẫn nói ra.
- **Đủ rõ**: vật chính nằm trong khung, không bị khối khác che, đủ to, tương phản với nền (bóng đổ, vệt chuyển động giúp nhìn thấy vật nhỏ).
- **Tỉ lệ hợp lý**: vật cầm tay vừa tay người, vật đặt trên đất thì chạm đất (không lơ lửng, không cắm xuyên), vật đặt trên vật khác thì khớp mặt tiếp xúc.
- **Đẹp**: có trời, chiều sâu (tiền cảnh, hậu cảnh), ánh sáng có bóng, màu hài hoà; không khối thô, không quầng sáng to, không khoảng trống chết.
- **Số và chữ**: chỉ số hoặc chữ có trong câu đọc, không cắt mép, không đè lên vật chính.

Mục hay lỗi:
- **Vật lọt ra ngoài khung**: khung 900×786, góc nhìn 40°. Vật cách máy 34 thì nửa bề ngang khung chỉ khoảng 14 đơn vị.
- **Vật nằm trong khối khác** nên bị che (căn hầm trong khối đất: phải khoét mặt cắt).
- **Bờ đất, cây, tường ở phía máy quay** chắn mất vật chính.
- **Quãng chuyển động quá nhỏ so với khung**: vật rơi 1 m trên quãng bay 40 m thì không nhìn thấy độ rơi, phải thu cảnh hoặc nâng độ cao.
- **Vật nhọn cắm xuyên vật đặt lên** (đỉnh núi nhọn xuyên giá pháo: phải vạt bằng chỗ đặt).
- **Số to bị cắt mép**.
- **Cảnh toàn thiếu trời**.

## 4. Lưu ý kỹ thuật

- **Card đồ hoạ**: WebGL chạy bằng card đồ hoạ. `remotion.config.ts` đặt `setChromiumOpenGlRenderer("angle")`, `tools/review/stills.mjs` truyền `gl: "angle"`. Thiếu dòng này thì cảnh 3D trắng hoặc rất chậm.
- **Không ngẫu nhiên thật**: không dùng `Math.random()`, dùng `rng(seed)` để mỗi lần render ra y hệt. Mọi chuyển động là hàm của khung hình, không giữ trạng thái giữa các khung.
- **Vật liệu**:
  - `lambert(màu)` có bộ nhớ đệm. Không gọi `lambert` với màu đổi liên tục theo khung, vì mỗi màu sinh một vật liệu mới.
  - Màu chuyển dần (tô sáng) thì tạo vật liệu bằng `useMemo` rồi đổi `.color` mỗi khung, như `Pentagon` làm với mái và hành lang.
- **Hình khối nặng** (khối đùn, ống) tạo một lần, ở mức module hoặc qua bộ nhớ đệm, không tạo mới mỗi khung.
- **Vật thể động** (người đi, chấm sáng): dùng mesh thường. `instancedMesh` chỉ dùng cho vật đứng yên số lượng lớn (cây, xe).
- **Bộ nhớ**: máy chỉ còn khoảng 3 GB RAM trống. Không chạy song song hai lần render 3D, hoặc render cùng lúc với tạo giọng.
- **Ảnh bìa** không dùng sân khấu, không bị ảnh hưởng.
