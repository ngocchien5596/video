/**
 * Tên đạo cụ / phông của series "Ông Ơi, Chỗ Này Lạ Lắm!" (Thằng Cháu đi khắp nơi, gặp chuyện lạ, gọi video hỏi Ông).
 * Mỗi tên có một dòng mô tả: AI viết phần diễn đọc file này để biết có gì dùng được.
 * Hình vẽ nằm ở engine/stage/story/cho-la.tsx. Tiền tố `cl-`.
 */

/** Vai (role): chưa có. */
export type RoleChoLa = never;

/** Đạo cụ (prop). */
export type PropChoLa =
  /** Xe máy tay ga nhìn ngang, có người lái đội mũ bảo hiểm (đồ to đặt sàn, đổi x để chạy qua; `scale` 0.8–1). Chữ (text) = màu áo người lái ("do", "xanh", "vang"). */
  | "cl-xe-may"
  /** Cột đèn giao thông ba màu. Chữ (text) = đèn đang sáng: "do" | "vang" | "xanh" | "tat" (mặc định "tat"). Đặt sàn. */
  | "cl-den-giao-thong"
  /** Biển báo tròn trên cột, chữ (text) ghi trong biển (ví dụ "DỐC 12%"). Đặt sàn. */
  | "cl-bien-bao";

/** Phông (scene). */
export type SceneChoLa =
  /** Đà Lạt: con đường dốc leo lên đồi thông, biệt thự mái nhọn, sương mù, vỉa hè lát đá phía trước. */
  | "cl-da-lat-doc"
  /** Đà Lạt: ngã tư nhỏ giữa phố, không có đèn, hàng thông và nhà phố hai bên, vạch qua đường. */
  | "cl-nga-tu";
