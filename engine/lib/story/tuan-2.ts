/**
 * Tên vai / đạo cụ / phông của các truyện dùng trong cảnh hồi ức tuần 2 (Nói vậy).
 * Mỗi tên có một dòng mô tả: AI viết phần diễn đọc file này để biết có gì dùng được.
 * Hình vẽ nằm ở engine/stage/story/tuan-2.tsx.
 */

/** Vai (role). */
export type RoleTuan2 =
  /** Ngô Quyền: vị tướng Việt, khăn chít đầu thắt nút, râu quai nón ngắn, giáp vảy sáng màu. */
  | "ngo-quyen"
  /** Lưu Hoằng Tháo: tướng Nam Hán, mũ trụ nhọn cắm chỏm lông, giáp tối màu. */
  | "luu-hoang-thao"
  /** Công Minh Nghi: nhạc sư thời xưa, mũ cao đen, râu dài bạc, áo rộng sáng màu. */
  | "cong-minh-nghi"
  /** Con trâu nhân hoá: đầu trâu sẫm, sừng cong to, mõm sáng, đuôi; nét mặt happy/shock thì tai vểnh lên. */
  | "con-trau"
  /** An Dương Vương: nhà vua, mũ miện có tua, râu dài, áo bào sáng có viền. */
  | "an-duong-vuong"
  /** Trọng Thủy: chàng rể trẻ, búi tóc cài trâm, áo sẫm viền sáng, mặt gian. */
  | "trong-thuy";

/** Đạo cụ (prop). */
export type PropTuan2 =
  /** Bãi cọc gỗ đầu bịt sắt cắm dưới lòng sông (đặt sàn, cao ~150). */
  | "bd-stakes"
  /** Một cây cọc đầu bịt sắt cầm tay (extend). */
  | "bd-stake"
  /** Nước triều lên: dải nước phủ cả khung, mặt nước cao ~150 trên sàn (đặt x 0.5, `front: true`, để TRƯỚC thuyền trong mảng items). */
  | "bd-tide"
  /** Thuyền nhẹ của quân Ngô (đặt cùng x với người đứng trong thuyền, `front: true`, sau "bd-tide"). */
  | "bd-boat"
  /** Thân thuyền chiến lớn Nam Hán, mũi hướng trái (cùng x với người, `front: true`). */
  | "bd-warship"
  /** Cột buồm thuyền chiến Nam Hán, cờ "NAM HÁN" (đặt cùng x với "bd-warship", không `front`, nằm sau người). */
  | "bd-sail"
  /** Thuyền chiến mắc cọc, vỡ toác, cọc đâm xuyên (cùng x với người, `front: true`). */
  | "bd-wreck"
  /** Đàn cầm (đàn dây dài), ôm bằng hai tay `hold2`. */
  | "cmn-qin"
  /** Chùm nốt nhạc bay lơ lửng trên cao (đặt sàn, tự vẽ trên cao). */
  | "cmn-notes"
  /** Bóng tiếng kêu có con muỗi và chữ "VO VE..." trên cao. */
  | "cmn-buzz"
  /** Bóng tiếng kêu có đầu con nghé và chữ "NGHÉ Ọ!" trên cao. */
  | "cmn-calf-call"
  /** Nắm cỏ cầm tay (`hold`). */
  | "cmn-grass"
  /** Công chúa Mị Châu đứng (người tĩnh, đặt sàn, quay mặt sang phải). */
  | "adv-mi-chau"
  /** Nỏ thần cầm tay (extend, tư thế `point` là giương nỏ). */
  | "adv-crossbow"
  /** Nỏ thần đặt trên giá gỗ (đặt sàn). */
  | "adv-crossbow-rack"
  /** Lẫy nỏ thần hình móng rùa vàng, cầm tay (`hold` / `raise`). */
  | "adv-trigger"
  /** Quân Triệu Đà kéo đến: mũ, giáo, cờ chữ "TRIỆU" (đặt sàn, to, để không `front`). */
  | "adv-army";

/** Phông (scene). */
export type SceneTuan2 =
  /** Sông Bạch Đằng: núi đá xa, lau sậy hai bờ, lòng sông bùn lúc triều rút (thêm "bd-tide" để làm triều lên). */
  | "bd-river"
  /** Đồng cỏ: đồi xa, cây to bên phải, bờ ruộng. */
  | "cmn-field"
  /** Thành Cổ Loa: luỹ đất nhiều vòng, cổng thành có lầu, cờ. */
  | "adv-citadel";
