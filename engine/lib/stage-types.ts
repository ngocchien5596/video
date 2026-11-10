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
  | "rice-tray"
  // Đồ ăn, đồ bếp
  | "bowl-empty"
  | "chicken-plate"
  | "drumstick"
  | "bun-plate"
  | "bun"
  | "milk"
  | "cucumber"
  | "candy"
  | "pan"
  | "fridge"
  // Đồ dùng
  | "compass"
  | "alarm-clock"
  | "pillow"
  | "tent"
  | "ball"
  | "broom"
  | "pen"
  | "paper"
  | "plant";

/**
 * Đạo cụ có chữ (`{ id, text }`):
 * sign: dòng chữ dưới tấm truy nã · book: chữ trên bìa · paper: tờ giấy ghi chữ (điểm, nhãn "CỦA CHÁU"...)
 * fridge: chữ trên băng dán chéo · alarm-clock: chữ trên mặt đồng hồ · plant: chữ trên bảng cắm trong chậu
 */

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

/** home: phòng khách · kitchen: bếp có bàn ăn (đồ `on: "table"` đặt trên bàn) · classroom: lớp học · yard: sân ngoài trời · night: sân ban đêm (trăng, sao)
 * · space: ngoài vũ trụ (đứng trên mặt trăng, thấy Trái Đất, sao) · beach: bãi biển (biển, cát) */
export type SceneId = "home" | "kitchen" | "classroom" | "yard" | "night" | "space" | "beach";
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

/**
 * Bảng minh hoạ (sơ đồ khoa học, hình giải thích) hiện ở nửa trên khung hình, không bị máy quay phóng to.
 * `id` là tên sơ đồ do dự án đăng ký (xem projects/<dự án>/src/boards), `step` là bước đang hiện (từ 0).
 */
export type Board = { id: string; step?: number };

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
  /** Hiện / đổi bước bảng minh hoạ; null để cất bảng. */
  board?: Board | null;
  /** true = đổi ngay, không chuyển động (ví dụ đặt nhân vật ngoài khung trước khi đi vào). */
  cut?: boolean;
};
