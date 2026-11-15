# Giọng lời dẫn và lời thoại (áp dụng cho MỌI dự án)

Yêu cầu của chủ kênh (14–15/11/2026): lời dẫn và lời nhân vật phải **uyển chuyển, giống ngôn ngữ tự nhiên, dễ hiểu, cuốn hút**. Không được cụt lủn, cứng, "nghe rất AI". Mọi kịch bản mới, mọi lần sửa kịch bản đều phải qua mục kiểm ở cuối trang này.

Series bible của từng dự án nói giọng riêng của nhân vật; trang này là chuẩn chung, bible không được trái với nó. Chuẩn này áp dụng cả cho chữ đăng bài (tiêu đề, mô tả, caption, bình luận ghim), xem thêm [hashtag.md](hashtag.md).

## 1. Nói chứ không viết
- Câu như đang kể cho một người ngồi đối diện: chủ ngữ rõ, động từ mạnh, từ nối tự nhiên ("Thế nhưng", "Vậy mà", "Hóa ra", "Nghe thì vô lý, nhưng…", "Thử tưởng tượng…", "Và đây mới là chỗ thú vị", "Nói gọn lại").
- Không mở câu kiểu dàn ý / điện báo: "Đề như sau:", "Mẹo là…", "Chìa khóa là…", "Giờ phóng ra…", "Ý chê…:".
- Không câu định nghĩa kiểu từ điển. Trước: "Mây là vô số giọt nước li ti, lơ lửng trên trời." Sau: "Mây trông thế thôi, chứ là vô số giọt nước bé tí, lơ lửng trên trời đấy."
- Hạn chế dấu hai chấm, chấm phẩy, gạch ngang giữa câu; không ngoặc đơn. Dùng dấu phẩy, chấm, "?", "!", "…" để giọng AI ngắt nghỉ có cảm xúc.

## 2. Nhịp và mạch
- Xen câu vừa (20–32 chữ) với câu ngắn đắt (3–8 chữ) để nhấn. Không để ba câu liền nhau cùng độ dài, cùng khuôn ("X nên Y", "vì thế", "do đó").
- Có câu hỏi tu từ kéo người xem đi tiếp ("Thế ánh nắng đi đâu? Bị hắt hết lên trên rồi!").
- Câu đầu mỗi nhịp / hồi bắt từ điều vừa nói; cả tập đọc liền phải trôi như một câu chuyện, không như các mục rời.
- Mỗi câu một ý, nhiều nhất một hai con số; số khó thì kèm hình ảnh quen ("cứ một nghìn người mới có một người").

## 3. Dễ hiểu trước, chính xác luôn
- Cách giải thích phải để người xem TỰ KIỂM được: xét từng trường hợp, đếm trên số ván / số người cụ thể, so với đồ vật quen thuộc; công thức để trên thẻ hình, lời đọc nói bằng ý. Không đọc chuỗi phép tính phân số.
- Chỗ người xem hay lầm thì nói thẳng vì sao lầm và khi nào cái lầm ấy mới đúng.
- Có một câu "nói gọn lại" để người xem nhớ.
- Không vì cho hay mà nói quá hay thêm chi tiết không có nguồn; giữ "tương truyền", "theo … kể lại", "khoảng".

## 4. Nhân vật có giọng riêng
- **Cụ Đồ**: ông đồ già miền Bắc, hiền, hóm, cằn nhằn yêu thương. Xưng "ông", gọi "cháu" (Nói vậy được "mày" khi bực thân mật; Vì sao không mắng). Tiểu từ "đấy", "chứ", "à", "hử", "chứ sao", "cái thằng này". Gạt cách hiểu sai đa dạng ("Tội gì mà tội!", "Dễ đâu mà dễ!"), không lặp mãi "Chưa đúng đâu!".
- **Thằng Cháu**: teen lanh, láu, tò mò. Cảm thán, đoán liều, hỏi dồn ("Ơ!", "Chắc là… hả ông?", "Thật ạ?"); đừng hỏi đều đều "Có phải… không ông?". Chút từ giới trẻ khi hợp cảnh, không teen code, không thô tục.
- **Người dẫn (NARRATOR, Kiến thức)**: MC kể chuyện khoa học có duyên, kiểu bình luận viên phim tài liệu; gọi người xem là "bạn", rủ cùng đoán.
- Hai nhân vật không được nói cùng một giọng; tránh câu sáo ("Thật thú vị!", "Hãy cùng tìm hiểu").

## 5. Giới hạn kỹ thuật của giọng AI
- Câu đọc không bắt đầu bằng "Ông" với giọng NARRATOR, và tránh cụm "ông giảng / kể cho mà nghe" (giống câu mẫu của giọng Cụ Đồ, mô hình dễ đọc lẫn).
- Tên riêng, từ mượn nước ngoài: phiên âm bằng âm tiết tiếng Việt cách nhau dấu cách, KHÔNG gạch nối; phụ âm ghép tách ra như người Việt nói ("Xì cốt", "Pờ lu tác"). Cách đọc dùng chung nằm trong bảng `PRONOUNCE` (tools/voice/vi_text.py), máy tự áp khi lồng giọng; viết kịch bản xong chạy `npm run voice:names`, chữ nào chưa có cách đọc thì thêm vào bảng. Chữ cái đọc tên Việt ("chữ en lờ"); ký hiệu, phân số đọc thành lời.
- Mỗi câu ≤ 35–38 chữ. Từ tượng thanh lạ ("Phì phì!") phải nghe thử sau khi lồng giọng.
- Sửa lời một nhịp có `stage` trỏ `line`: giữ số câu, thứ tự, người nói (hoặc sửa đúng chỉ số); câu mới vẫn mang đúng ý mà cảnh diễn theo.

## Mục kiểm trước khi duyệt kịch bản
1. Đọc to cả tập một lượt: chỗ nào vấp, cứng, giống văn viết thì sửa.
2. Có câu nào mở kiểu dàn ý, có chuỗi câu cùng khuôn, có câu nhồi ba con số trở lên không?
3. Các nhịp có câu chuyển nối nhau không?
4. Phần giải thích người xem có tự kiểm lại được không? Có câu "nói gọn lại" không?
5. Hai nhân vật có nghe ra hai người khác nhau không?
6. Sự thật, số liệu, nguồn có còn nguyên sau khi sửa câu chữ không?
7. Tập đã đăng: KHÔNG sửa.
