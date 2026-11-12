/**
 * Tên vai / đạo cụ / phông của các truyện dùng trong cảnh hồi ức tuần 4b (Nói vậy).
 * Mỗi tên có một dòng mô tả: AI viết phần diễn đọc file này để biết có gì dùng được.
 * Hình vẽ nằm ở engine/stage/story/tuan-4b.tsx.
 */

/** Vai (role). */
export type RoleTuan4B =
  /** Mùa lũ: bác tài xế chở hàng cứu trợ, mũ lưỡi trai tối màu, khăn quàng cổ, áo khoác sáng. */
  | "lu-tai-xe"
  /** Mùa lũ: bạn trẻ tình nguyện, đội nón lá trắng, áo phông sáng có băng tay tối. */
  | "lu-tinh-nguyen"
  /** Vịt con xấu xí: vịt con lông xám bù xù, mỏ dẹt, mặt rụt rè. */
  | "vit-con-xau"
  /** Vịt con xấu xí: thiên nga trắng muốt, cổ dài cong, mỏ cam có bướu đen, thân lông trắng. */
  | "thien-nga"
  /** Vịt con xấu xí: gà tây đầu trọc, yếm đỏ thõng, đuôi xoè quạt sau lưng (kẻ bắt nạt). */
  | "ga-tay"
  /** Sọ Dừa: cô chị nhà phú ông, búi tóc cao cài trâm, áo sẫm, khuyên tai, mặt kiêu. */
  | "so-dua-co-chi"
  /** Sọ Dừa: cô út hiền lành, tóc vấn khăn sáng, áo yếm sáng. */
  | "so-dua-co-ut"
  /** Sọ Dừa: chàng trai khôi ngô (Sọ Dừa thật), tóc búi gọn, áo the sáng, thắt lưng tối. */
  | "so-dua-chang-trai";

/** Đạo cụ (prop). */
export type PropTuan4B =
  /** Thùng mì gói (ôm `hold2` hoặc đặt sàn). */
  | "lu-mi-goi"
  /** Bọc quần áo cứu trợ (ôm `hold2`). */
  | "lu-quan-ao"
  /** Áo phao sáng có sọc phản quang (ôm `hold2`). */
  | "lu-ao-phao"
  /** Xe tải chở hàng cứu trợ, băng rôn "CỨU TRỢ" (đồ to đặt sàn, đổi x để chạy). */
  | "lu-xe-cuu-tro"
  /** Ti vi cũ trên kệ, màn hình chiếu cảnh mưa lũ (đặt sàn). */
  | "lu-ti-vi"
  /** Vỏ trứng vỡ to (đặt sàn, `front: true` để vịt con như vừa chui ra). */
  | "vit-trung"
  /** Con vịt trắng hung hăng đứng trên sàn (đặt sàn, đổi x để lao tới mổ). */
  | "vit-vit"
  /** Con gà mái hung hăng (đặt sàn). */
  | "vit-ga"
  /** Sọ Dừa: quả dừa tròn có mắt mũi miệng, không chân không tay (đặt sàn). */
  | "so-dua"
  /** Con bò béo tròn đang gặm cỏ (đặt sàn). */
  | "so-dua-bo"
  /** Cây sáo trúc có nốt nhạc bay ra (cầm tay với `arms: "hold"` thì đầu sáo kề miệng như đang thổi). */
  | "so-dua-sao"
  /** Giỏ cơm cô út mang lên đồi (cầm `hold`). */
  | "so-dua-gio-com";

/** Phông (scene). */
export type SceneTuan4B =
  /** Mùa lũ: điểm gom hàng cứu trợ ở phố, biển "ĐIỂM NHẬN HÀNG", chồng thùng hàng. */
  | "lu-diem-gom"
  /** Mùa lũ: làng ngập nước tới cửa sổ, trời mưa xám, đường đê phía trước. */
  | "lu-vung-ngap"
  /** Vịt con xấu xí: sân chuồng nông trại, chuồng gà gỗ, hàng rào, ao nhỏ. */
  | "vit-san-chuong"
  /** Vịt con xấu xí: hồ nước mùa xuân, lau sậy, đàn thiên nga xa xa. */
  | "vit-ho"
  /** Sọ Dừa: đồi cỏ chăn bò, cây to có mắc võng, mây trắng. */
  | "so-dua-doi";
