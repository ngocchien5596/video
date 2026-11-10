/** Sơ đồ minh hoạ của tuần 7 (Căn bếp nhà mình). Đăng ký id tại đây; id bắt đầu bằng "w7-". */
import type { BoardRegistry } from "../../../../engine/stage/board.tsx";
import { AppleBoard } from "./w7-apple.tsx";
import { BoilBoard } from "./w7-boil.tsx";
import { BreadBoard } from "./w7-bread.tsx";
import { FridgeBoard } from "./w7-fridge.tsx";
import { OnionBoard } from "./w7-onion.tsx";
import { SodaBoard } from "./w7-soda.tsx";
import { SpoonBoard } from "./w7-spoon.tsx";

export const BOARDS_TUAN_7: BoardRegistry = {
  "w7-onion": OnionBoard,
  "w7-apple": AppleBoard,
  "w7-fridge": FridgeBoard,
  "w7-bread": BreadBoard,
  "w7-spoon": SpoonBoard,
  "w7-boil": BoilBoard,
  "w7-soda": SodaBoard,
};
