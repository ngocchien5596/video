/** Sơ đồ minh hoạ của tuần 9 (Giao thông quanh ta). Đăng ký id tại đây; id bắt đầu bằng "w9-". */
import type { BoardRegistry } from "../../../../engine/stage/board.tsx";
import { WaterwayBoard } from "./w9-waterway.tsx";

export const BOARDS_TUAN_9: BoardRegistry = {
  "w9-waterway": WaterwayBoard,
};
