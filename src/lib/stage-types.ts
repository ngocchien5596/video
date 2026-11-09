/**
 * Kịch bản diễn cho hoạt hình con rối: mỗi nhịp có một danh sách "khoảnh khắc" (Moment),
 * mỗi khoảnh khắc đổi trạng thái sân khấu tại một thời điểm trong câu thoại.
 * Trạng thái được cộng dồn: chỉ ghi những gì thay đổi, phần còn lại giữ nguyên từ trước.
 */

/** Nét mặt. */
export type Expr = "neutral" | "happy" | "shock" | "angry" | "smug" | "confused" | "sad";

/**
 * Tư thế tay (xem src/stage/poses.ts).
 * down: buông · point: chỉ về phía người kia · raise: giơ tay cao · up2: giơ cả hai tay
 * hips: chống nạnh · hold: cầm đồ đưa ra trước · hold2: ôm/cầm đồ bằng hai tay trước ngực
 * shrug: nhún vai · hit: vung tay đánh (quạt) · wave: vẫy tay
 */
export type ArmPose =
  | "down"
  | "point"
  | "raise"
  | "up2"
  | "hips"
  | "hold"
  | "hold2"
  | "shrug"
  | "hit"
  | "wave";

/** Chuyển động cả người. Đổi `x` thì tự đi bộ tới chỗ mới. */
export type Move = "idle" | "bounce" | "jump" | "shake" | "tremble";

export type PropId =
  | "fan"
  | "magnifier"
  | "mango"
  | "mango-bitten"
  | "detective-hat"
  | "backpack"
  | "sign"
  | "rice-cooker"
  | "bowls"
  | "bowl"
  | "book"
  | "rice-tray";

/** Đạo cụ, kèm chữ cho loại có chữ (ví dụ tấm biển). */
export type PropRef = PropId | { id: PropId; text?: string };

export type Pose = {
  expr?: Expr;
  arms?: ArmPose;
  move?: Move;
  /** Vị trí ngang, 0 = mép trái, 1 = mép phải. */
  x?: number;
  /** Đồ cầm trên tay (null để bỏ xuống). */
  hand?: PropRef | null;
  /** Đồ đội trên đầu. */
  head?: PropRef | null;
  /** Đồ dán trên trán / mặt. */
  face?: PropRef | null;
  /** Đồ đeo sau lưng. */
  back?: PropRef | null;
};

/** Đồ vật đặt trên sàn hoặc trên bàn. Cùng `id` mà đổi `x` thì đồ trượt tới chỗ mới. */
export type Item = {
  id: string;
  prop: PropRef;
  x: number;
  on?: "floor" | "table";
  scale?: number;
};

export type SceneId = "home" | "kitchen" | "classroom";
/** Phông cảnh, `text` là chữ trên bảng (lớp học). */
export type SceneRef = SceneId | { id: SceneId; text?: string };

export type FxKind = "bop" | "exclaim" | "question" | "surprise" | "sweat" | "hearts" | "sparkle" | "anger";

export type Fx = {
  kind: FxKind;
  /** Hiện trên đầu nhân vật nào. */
  on: "CD" | "TC";
  /** Chữ thay cho chữ mặc định (ví dụ "BỐP!"). */
  text?: string;
};

export type Camera = "wide" | "CD" | "TC";

export type Moment = {
  /** Câu thoại thứ mấy trong nhịp (từ 0). Bỏ trống = tính từ đầu nhịp. */
  line?: number;
  /** Vị trí trong câu (hoặc trong nhịp nếu không có `line`), 0 = đầu, 1 = cuối. */
  at?: number;
  scene?: SceneRef;
  camera?: Camera;
  cd?: Pose;
  tc?: Pose;
  /** Thay toàn bộ đồ vật trên sân khấu. */
  items?: Item[];
  fx?: Fx | Fx[];
  /** true = đổi ngay, không chuyển động (ví dụ đặt nhân vật ngoài khung trước khi đi vào). */
  cut?: boolean;
};
