/**
 * Tên vai / đạo cụ / phông của các truyện dùng trong cảnh hồi ức tuần 1 (Nói vậy).
 * Mỗi tên có một dòng mô tả: AI viết phần diễn đọc file này để biết có gì dùng được.
 * Hình vẽ nằm ở engine/stage/story/tuan-1.tsx.
 */

/** Vai (role). */
export type RoleTuan1 =
  /** Người qua đường (truyện cười Há miệng chờ sung): đội nón lá sáng, áo nâu sẫm, quần trắng. */
  | "sung-passerby"
  /** Heo anh (Ba chú heo con): đầu heo tai vểnh, mõm to, đội mũ rơm, áo sáng kẻ sọc. */
  | "heo-anh"
  /** Heo út (Ba chú heo con): đầu heo, khăn thợ sẫm buộc đầu, quần yếm sẫm. */
  | "heo-ut"
  /** Sói (Ba chú heo con): đầu sói xám đậm, tai nhọn, mõm dài nhe nanh, áo tối rách gấu. */
  | "soi"
  /** Cậu bé Gióng ba tuổi: đầu trọc để chỏm trái đào, yếm đỏ, quần trắng. */
  | "giong-boy"
  /** Tráng sĩ Gióng: mũ sắt có chóp, áo giáp sắt vảy sáng, khăn đỏ quàng cổ. */
  | "giong-hero"
  /** Bà con làng Gióng (dùng được cho mẹ Gióng): khăn mỏ quạ sẫm, áo tứ thân nâu, yếm trắng. */
  | "giong-villager"
  /** Giặc Ân: mũ nhọn đen có tua, mặt dữ, râu xồm, áo giáp tối. */
  | "giong-enemy";

/** Đạo cụ (prop). */
export type PropTuan1 =
  /** Anh chàng lười nằm ngửa trên manh chiếu, há miệng to (đồ to đặt trên sàn, đầu bên trái; miệng lệch trái tâm ≈ 165px × scale). */
  | "sung-lazy-man"
  /** Anh chàng lười nằm, mồm ngậm quả sung, mặt cau có, bóng thoại "LƯỜI THẾ!" (đặt thay sung-lazy-man, cùng x). */
  | "sung-lazy-angry"
  /** Quả sung nằm dưới đất (nhỏ). */
  | "sung-fig"
  /** Quả sung đang rơi giữa không trung (tự vẽ cao ≈ 330px trên sàn, có vệt rơi). */
  | "sung-fig-fall"
  /** Nhà rơm (Ba chú heo con), đồ to đặt trên sàn. */
  | "heo-straw-house"
  /** Nhà gỗ ván, đồ to đặt trên sàn. */
  | "heo-wood-house"
  /** Nhà gạch có ống khói, đồ to đặt trên sàn. */
  | "heo-brick-house"
  /** Rơm tung toé bay lên (nhà rơm bị thổi bay). */
  | "heo-straw-ruin"
  /** Đống ván gỗ đổ ngổn ngang (nhà gỗ bị thổi đổ). */
  | "heo-wood-ruin"
  /** Bó rơm (cầm tay, `hold2`). */
  | "heo-straw-bundle"
  /** Tấm ván gỗ (cầm tay, `hold`). */
  | "heo-plank"
  /** Chồng gạch (cầm tay, `hold2`). */
  | "heo-brick"
  /** Nong cơm: nong tre tròn to, cơm trắng vun đầy (đặt trên sàn). */
  | "giong-nong-com"
  /** Nong cà: nong tre đựng đầy quả cà tròn sẫm (đặt trên sàn). */
  | "giong-nong-ca"
  /** Thúng gạo bà con mang góp (cầm `hold2`). */
  | "giong-rice-basket"
  /** Ngựa sắt phun lửa, đầu quay sang phải, có giáp phủ kín: đặt `front: true` đúng x con rối (quay mặt sang phải) để trông như đang cưỡi. */
  | "giong-iron-horse"
  /** Roi sắt (cầm tay, có cán). */
  | "giong-iron-rod";

/** Phông (scene). */
export type SceneTuan1 =
  /** Đường làng có cây sung to bên trái (quả mọc chùm trên thân), đồng lúa xa, đường đất. */
  | "sung-tree"
  /** Đồng cỏ đồi xanh, trời quang, mây (Ba chú heo con). */
  | "heo-meadow"
  /** Làng Phù Đổng: luỹ tre, nhà tranh, cây cau, sân đất. */
  | "giong-village"
  /** Bãi chiến trận chân núi: núi xa, khói, cờ giặc đổ, bụi tre. */
  | "giong-battle";
