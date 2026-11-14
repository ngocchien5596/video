# Ông Ơi, Chỗ Này Lạ Lắm! · Quy tắc series

Series video ngắn về **những điều lạ có thật ở Việt Nam**: nơi chốn, công trình, quy định, phong tục, ẩm thực, thiên nhiên. Thằng Cháu đi khắp nơi, gặp chuyện lạ là gọi video hỏi Ông. Cụ Đồ kể chuyện ngắn gọn, có số liệu, có bước ngoặt, rồi chốt bằng một thành ngữ.

Series dùng chung nhân vật, giọng đọc và bot với "Nói Vậy Mà Không Phải Vậy" và "Ông Ơi, Vì Sao?". Kênh chung là "Lớp Học Cụ Đồ".

Tài liệu nghiên cứu nằm trong `research_notes/Ông ơi chỗ này lạ lắm/` ở gốc repo:

- `kho-chu-de.md`: 70 chủ đề kèm nguồn, kiểu tương tác và câu hỏi cuối video.
- `phan-tich-video-goc-va-cach-ke.md`: video tham khảo, nguyên lý giữ chân người xem, nguyên lý tương tác, lý do chọn mô típ.
- `thi-truong-va-quy-dinh.md`: kênh tương tự, rủi ro pháp lý, chính sách nền tảng.

## Đối tượng

Người xem từ 13 tuổi trở lên và người lớn. Khi đăng lên YouTube, khai "Không, nội dung này không dành cho trẻ em".

## Mô típ "Cháu đi, Ông kể"

- **Thằng Cháu đứng tại chỗ.** Mỗi tập Cháu ở một nơi khác (phố, đèo, cầu, làng nghề, rừng…), là người dẫn người xem vào câu chuyện.
- **Gọi video cho Ông.** Đặt `call: true` trong phần diễn: Cụ Đồ hiện trong khung điện thoại ở góc trên bên phải, còn Cháu cầm `phone`.
  - Khi đang gọi, đặt `camera: "CD"` thì khung gọi **phóng to** ra giữa màn hình để Ông kể. Đặt `wide` hoặc `TC` thì khung thu về góc.
  - Đặt `call: false` khi muốn tắt máy.
- **Giọng Ông là giọng kể chính, khoảng 60–70% thời lượng.** Trong lúc Ông kể, hình chuyển sang minh hoạ: cảnh nơi chốn, đồ vật chuyển động, thẻ số liệu chữ to (`facts`).
  - Chuyện xưa thì dựng thành cảnh hồi ức TV đen trắng: đặt `memory` cho nhịp.
- **Tránh rập khuôn.** Mỗi tập phải khác nơi chốn, khác câu chuyện, khác kết. YouTube không cho kiếm tiền với "nhân vật bị đặt vào cùng một tình huống với cùng một kết quả".

## Cấu trúc tập: 6 nhịp, dưới 60 giây (khoảng 160–190 chữ)

| Nhịp | Giây | Nội dung | Quy tắc |
| --- | --- | --- | --- |
| 1. Nghịch lý (`hook`) | 0–4 | Thằng Cháu tại chỗ thốt ra câu nghịch lý | Câu đầu phải có điều trái ngược. Hình minh hoạ đúng câu nói. Không chào hỏi, không giới thiệu kênh. |
| 2. Gọi Ông (`call`) | 4–8 | Chuông reo, Ông bắt máy, nói tên nơi và loại trước cách giải thích dễ đoán ("mà không phải vì… đâu") | Mở vòng tò mò: người xem càng muốn biết lý do thật. |
| 3. Đoán sai (`guess`) | 8–16 | Cháu đoán theo kiểu ai cũng nghĩ, hài nhẹ. Ông gạt đi. | Câu đoán phải rõ ràng là sai để không gây hiểu lầm. Người xem thấy mình trong câu đoán, và có thể bình luận sửa cho Cháu. |
| 4. Lý do (`reason`) | 16–28 | Lý do thứ nhất: một con số, một phép so sánh bằng hình | Tối đa 1–2 con số. Mỗi con số có thẻ số liệu. |
| 5. Bước ngoặt (`twist`) | 28–48 | Mở bằng câu kéo lại ("Nhưng lý do lạ nhất lại là…", "Chưa hết đâu…"), rồi lớp bất ngờ thứ hai: mốc thời gian, con người, lịch sử | **Bắt buộc có câu kéo lại**, vì giữa video là chỗ người xem bỏ đi nhiều nhất. Điều bất ngờ nhất đặt ở nhịp này, không dồn lên đầu video. |
| 6. Chốt (`chot`) | 48–56 | Cháu tóm ý bằng một câu dí dỏm nhắc lại hình ảnh ở câu mở đầu. Ông chốt bằng một thành ngữ hợp ý. | Thành ngữ là dấu ấn riêng của kênh, nối với series Nói vậy. |
| Thẻ cuối | tự động | Câu hỏi cho người xem (`question`) và dòng "Chỗ lạ tiếp theo" | |

**Quy tắc chung:**

- Mỗi tập chỉ một câu hỏi lớn.
- Cả tập tối đa 4 con số.
- Cứ 2–3 giây đổi hình hoặc góc máy: chuyển `camera`, cho xe hoặc đồ vật di chuyển, bật hiệu ứng `fx`.
- Câu ngắn, mỗi câu một ý. Số viết bằng chữ số được, khâu lồng tiếng tự đọc thành chữ.

## Kéo tương tác

- **Mỗi tập chọn một kiểu tương tác** (`interaction`): kéo bình luận (`binh-luan`) hoặc kéo thả tim (`tha-tim`). Lịch đăng xếp xen kẽ hai kiểu.
- **Câu hỏi cuối video** phải trả lời được bằng một câu ngắn: họ gì, quê đâu, tin thuyết nào, đầu số mấy, từng gặp chưa. Không hỏi chung chung kiểu "bạn nghĩ sao?".
- **Tập có con số bất ngờ** thì cài câu "đoán xem" ở đầu video và để đáp án ở cuối.
- **Không câu tương tác lộ liễu** ("thả tim nếu…", "bình luận 1 để…"). Không tạo tranh cãi giả, không chê vùng miền.
- **Bình luận ghim** gồm câu hỏi của tập và các nguồn. Trả lời vài bình luận trong giờ đầu sau khi đăng.

## Kiểm chứng (bắt buộc, bot chặn xuất video nếu thiếu)

1. **Ít nhất 2 nguồn uy tín có link** (`sources`): báo lớn, cơ quan nhà nước, viện nghiên cứu, bảo tàng, tổ chức khoa học. Wikipedia chỉ dùng để đối chiếu.
2. **Mọi câu kể phải có trong nguồn.** Mở từng bài để chốt câu chữ trước khi viết.
   - Nguồn nói "dừng đèn đỏ giữa dốc nguy hiểm" thì không tự thêm "nhả phanh là tụt".
   - Nguồn nói "đi chậm, không lấn làn" thì không đổi thành "nhường nhau".
3. **Ghi mốc thời gian cho quy định và số liệu dễ thay đổi.** Nếu các nguồn lệch nhau, nói "khoảng" hoặc "theo báo…". Cách giải thích chưa chắc chắn thì nói "có thuyết cho rằng…".
4. **Người duyệt cuối là người thật.** Đọc kịch bản trên Telegram, mở từng link nguồn, rồi mới bấm Duyệt.

## Điều cấm

- Không chính trị, không biên giới hay biển đảo đang tranh chấp, không tôn giáo nhạy cảm.
- Không tai nạn có người chết cụ thể, không tin đồn.
- **Bản đồ Việt Nam**, kể cả bản đồ vẽ cách điệu, phải thể hiện Hoàng Sa và Trường Sa. Chia sẻ bản đồ sai chủ quyền bị phạt 20–30 triệu đồng (Nghị định 174/2026).
- **Không dựng như bản tin hay phóng sự báo chí** (Nghị định 174/2026 cấm). Không chèn ảnh hay clip của báo, của kênh khác.
- **Không chép kịch bản, nhân vật, câu chốt hay phong cách 3D của video tham khảo.** Chỉ dùng ý tưởng và sự thật đã tự kiểm chứng.
- **Công trình và doanh nghiệp:** vẽ công trình theo lối cách điệu, bỏ logo doanh nghiệp, không nói xấu đơn vị vận hành.

## Minh bạch về AI

- Luôn bật nhãn "nội dung do AI tạo" khi đăng.
- Mô tả video ghi giọng đọc và hình ảnh được tạo với sự hỗ trợ của AI, nội dung đã được người thật đối chiếu nguồn.

## Đồ vẽ sẵn

- Phông và đạo cụ riêng của series có tiền tố `cl-`. Danh sách kèm mô tả nằm trong `engine/lib/story/cho-la.ts`, hình vẽ trong `engine/stage/story/cho-la.tsx`.
- Ngoài ra dùng được mọi phông, đạo cụ chung của engine (ví dụ `phone`, `chicken-plate`…).

## Đo kết quả

- **Biểu đồ giữ chân người xem** (YouTube Studio, TikTok Analytics): chỗ đường biểu đồ tụt mạnh là nhịp cần sửa ở các tập sau.
- **Tỉ lệ người xem còn ở lại sau 3 giây đầu**, để biết câu hook có hiệu quả không.
- **Số bình luận và số lưu trên 1.000 lượt xem**, so giữa hai kiểu tương tác.
- **Đợt thử:** 2 tập đầu so với video Vì sao cùng độ dài. Nếu tốt hơn rõ thì mới làm hàng loạt.
