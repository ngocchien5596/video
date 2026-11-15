# Chuẩn dựng cảnh và nhân vật (áp dụng cho MỌI dự án)

Yêu cầu của chủ kênh (15/11/2026): **nhân vật di chuyển mượt mà, thiết kế đẹp, rõ ràng từng bộ phận; cảnh thiết kế đẹp, bố cục tốt.** Đi cùng chuẩn lời thoại [giong-loi-thoai.md](giong-loi-thoai.md). Mọi cảnh, đạo cụ, phần diễn (`stage`) mới hay sửa đều phải qua mục kiểm cuối trang.

## 1. Khung hình dọc 1080×1920 và vùng an toàn
- Nội dung chính (nhân vật, đạo cụ đang được nói tới, thẻ chữ) nằm trong vùng an toàn: cách mép trên ~180 px (thanh tên tập), cách mép phải ~140 px (nút tim / bình luận của TikTok), cách mép dưới ~380 px (chú thích và nút của nền tảng). Phụ đề nằm ngay trên vùng dưới, không đè lên mặt nhân vật.
- Không để khoảng trống chết lớn: nền phải lấp đầy khung, mảng hình chính chiếm khoảng 55–70% chiều cao vùng an toàn. Không dồn hết nội dung lên nửa trên.
- Không cắt nhân vật nửa người ở mép khung. Khi máy quay zoom vào một người, người kia hoặc ở hẳn trong khung, hoặc ra hẳn ngoài khung (cắt ở vai trở lên là được nếu là cận cảnh có chủ ý).
- Bố cục có điểm nhìn rõ: một thứ nổi bật nhất mỗi lúc (người đang nói hoặc vật đang được nói tới); chữ trên thẻ đủ to để đọc trên điện thoại (chữ thân ≥ 34 px, tiêu đề ≥ 44 px ở khung 1080).

## 2. Nhân vật
- Thiết kế gốc của Cụ Đồ và Thằng Cháu: [projects/CD_TC.png](../projects/CD_TC.png). Cụ Đồ đúng như mẫu (khăn đóng nâu, kính tròn, râu trắng dài, áo dài the nâu, quần trắng, giày vải đen, quạt giấy). Thằng Cháu theo trang phục và nét mặt của mẫu (áo cánh vàng nghệ cúc tàu, quần soóc nâu, dép quai, tóc đen bù xù) nhưng **vẽ ở tuổi thiếu niên khoảng 12–14** cho khớp kịch bản và người xem từ 13 tuổi. Bối cảnh, đạo cụ theo phong cách tranh dân gian Việt hiện đại, ấm áp như mẫu.
- Rõ ràng từng bộ phận: đầu, cổ, thân, hai tay (có bàn tay), hai chân (có bàn chân / giày); viền ngoài đậm, đều để tách khỏi nền; mặt có mắt, lông mày, miệng thể hiện cảm xúc.
- Tỉ lệ nhất quán giữa các cảnh; nhân vật chính đủ lớn để thấy nét mặt (đầu ≥ 110 px ở khung 1080 trong cảnh toàn).
- Cảm xúc khớp lời: nói thì miệng mấp máy, ngạc nhiên thì mắt mở to, lông mày nhướng; chuyển biểu cảm có giai đoạn chuyển (không bật tức thì nếu không phải cú giật mình có chủ ý).
- Luôn "sống": nhịp thở nhẹ, chớp mắt ngẫu nhiên, người nghe có phản ứng nhỏ (gật, nghiêng đầu) khi người kia nói.

## 3. Chuyển động mượt
- Mọi di chuyển, đổi tư thế tay, xoay người, máy quay đều nội suy có gia tốc (ease-in-out hoặc spring), không nhảy khung. Thời lượng tối thiểu: đổi tư thế tay ~8–12 khung (30 fps), đi bộ / di chuyển vị trí ~15+ khung, máy quay zoom / lia ~20+ khung.
- Có đà và dư âm: chuyển động lớn có chút chuẩn bị (anticipation) và lắc nhẹ khi dừng (overshoot nhỏ), không đứng khựng.
- Đi bộ có nhịp bước, thân nhún nhẹ; không trượt như ván trượt.
- Đạo cụ xuất hiện bằng hiệu ứng (bật nảy, mờ dần, vẽ dần), không bật tức thì; biến mất cũng vậy.
- Không để hai chuyển động lớn tranh nhau cùng lúc ở hai chỗ khác nhau của khung.

## 4. Cảnh và màu
- Mỗi cảnh có tiền cảnh, trung cảnh, hậu cảnh tách lớp (nền nhạt / ít chi tiết hơn nhân vật) để tạo chiều sâu.
- Bảng màu hài hòa theo series; nhân vật và vật chính có độ tương phản cao nhất khung hình. Nền tối thì chữ và hình chính phải sáng rõ.
- Hình minh hoạ phải đúng nội dung câu đang nói (vẽ đúng thứ được nhắc tới), không dùng hình chung chung thay thế khi có thể vẽ cụ thể.
- Bản đồ Việt Nam (nếu có) phải có Hoàng Sa, Trường Sa.

## Mục kiểm trước khi duyệt hình
1. Xuất ảnh tĩnh ở đầu, giữa, cuối mỗi nhịp (hoặc xem bản dựng thử): có nhân vật nào bị cắt nửa người, che mặt, đè chữ không?
2. Khung có khoảng trống chết lớn không? Nội dung chính có nằm trong vùng an toàn không?
3. Chữ trên thẻ đọc được trên điện thoại không?
4. Xem chuyển động ở tốc độ thật: có chỗ nào giật, nhảy, trượt, khựng không?
5. Hình có minh hoạ đúng câu đang nói không?
6. Nhân vật có đủ bộ phận, đủ lớn để thấy nét mặt không?
