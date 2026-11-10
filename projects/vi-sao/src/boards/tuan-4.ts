/** Sơ đồ minh hoạ của tuần 4 (Cơ thể mình). Đăng ký id tại đây; id bắt đầu bằng "w4-". */
import type { BoardRegistry } from "../../../../engine/stage/board.tsx";
import { FingersBoard } from "./w4-fingers.tsx";
import { FreezeBoard } from "./w4-freeze.tsx";
import { GooseBoard } from "./w4-goose.tsx";
import { SneezeBoard } from "./w4-sneeze.tsx";
import { SweatBoard } from "./w4-sweat.tsx";
import { TickleBoard } from "./w4-tickle.tsx";
import { VeinsBoard } from "./w4-veins.tsx";

export const BOARDS_TUAN_4: BoardRegistry = {
  "w4-veins": VeinsBoard,
  "w4-fingers": FingersBoard,
  "w4-sweat": SweatBoard,
  "w4-sneeze": SneezeBoard,
  "w4-freeze": FreezeBoard,
  "w4-goose": GooseBoard,
  "w4-tickle": TickleBoard,
};
