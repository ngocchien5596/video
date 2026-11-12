/**
 * Tên vai / đạo cụ / phông của các truyện dùng trong cảnh hồi ức tuần 2b (Nói vậy).
 * Mỗi tên có một dòng mô tả: AI viết phần diễn đọc file này để biết có gì dùng được.
 * Hình vẽ nằm ở engine/stage/story/tuan-2b.tsx.
 */

/** Vai (role). */
export type RoleTuan2B =
  /** Sơn Tinh: thần núi, mũ hình ba đỉnh núi, áo dài sáng màu thêu hình núi. */
  | "son-tinh"
  /** Thủy Tinh: thần nước, tóc xoăn như sóng dựng ngược, tai vây cá, râu sóng, áo dài tối màu thêu sóng. */
  | "thuy-tinh"
  /** Người khách nước Sở thắng bình rượu: búi tóc cài trâm, râu dài, áo dài sáng màu. */
  | "so-khach-ruou"
  /** Người khách nước Sở vẽ thêm chân cho rắn: trẻ, mũ tròn đen, ria mảnh, áo dài tối màu. */
  | "so-khach-chan"
  /** Anh áo mới (truyện Lợn cưới, áo mới): búi tóc, áo mới trắng thêu hoa chấm đen, cổ áo vàng. */
  | "ao-moi"
  /** Anh đi tìm lợn cưới: khăn quấn đầu, áo nâu sẫm, quần xắn, mồ hôi trên trán. */
  | "tim-lon";

/** Đạo cụ (prop). */
export type PropTuan2B =
  /** Voi chín ngà: con voi to, chín cái ngà xoè ra; đồ đặt sàn, nên `scale` 0.55–0.7. */
  | "st-elephant"
  /** Gà chín cựa: gà trống, chân đầy cựa nhọn; đồ đặt sàn. */
  | "st-rooster"
  /** Ngựa chín hồng mao: con ngựa bờm chín túm; đồ đặt sàn, nên `scale` 0.55–0.7. */
  | "st-horse"
  /** Mị Nương: công chúa đứng cỡ người, quay mặt sang trái, áo tứ thân, tóc dài; đồ đặt sàn. */
  | "st-mi-nuong"
  /** Quả đồi nhỏ để cầm tay (dùng `arms: "up2"`): hiện cao trên đầu người nâng, như bốc đồi. */
  | "st-hill-held"
  /** Quả đồi to có cây, đặt sàn: chồng vài quả thành bức tường núi chặn nước. */
  | "st-hill"
  /** Sóng nước dâng cao, bọt trắng; đồ đặt sàn, nên `front: true`. */
  | "st-wave"
  /** Bình rượu nhỏ kiểu xưa (cầm tay, hoặc đặt sàn `scale` 1.3). */
  | "so-flask"
  /** Que vẽ (cầm tay, có cán). */
  | "so-stick"
  /** Ô đất cát để vẽ, còn trống; đồ đặt sàn. */
  | "so-sand"
  /** Ô đất cát vẽ con rắn (không chân); đồ đặt sàn. */
  | "so-sand-snake"
  /** Ô đất cát vẽ con rắn có bốn chân; đồ đặt sàn. */
  | "so-sand-legs"
  /** Vạt áo mới (cầm tay giơ lên khoe, cùng hoa văn áo vai `ao-moi`). */
  | "ao-moi-flap"
  /** Sợi dây buộc lợn bị đứt (cầm tay). */
  | "pig-rope";

/** Phông (scene). */
export type SceneTuan2B =
  /** Cung điện vua Hùng: cột đỏ, mặt trống đồng trên vách, vua Hùng ngồi ngai trên bệ cao giữa phông. */
  | "hung-palace"
  /** Núi Tản Viên giữa mưa bão: trời tối, mưa xiên, núi bên trái, biển nước bên phải. */
  | "st-mountain"
  /** Sân nhà quan nước Sở ngày xưa: tường gạch xám, mái cong, đèn lồng, nền đất cát. */
  | "so-courtyard"
  /** Cổng nhà quê: rặng tre, cổng tre ở x ≈ 0.62, nhà tranh bên trái, đường đất. */
  | "village-gate";
