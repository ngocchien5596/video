/** Sơ đồ minh hoạ của tuần 6 "Nước quanh ta". Mô tả các bước: docs/bang-minh-hoa-tuan-6.md. */
import type { BoardRegistry } from "../../../../engine/stage/board.tsx";
import { GlassBoard } from "./w6-glass.tsx";
import { IceBoard } from "./w6-ice.tsx";
import { RaindropBoard } from "./w6-raindrop.tsx";
import { SaltyBoard } from "./w6-salty.tsx";
import { SeaBlueBoard } from "./w6-sea-blue.tsx";
import { ShipBoard } from "./w6-ship.tsx";
import { StriderBoard } from "./w6-strider.tsx";

export const BOARDS_TUAN_6: BoardRegistry = {
  "w6-salty": SaltyBoard,
  "w6-sea-blue": SeaBlueBoard,
  "w6-raindrop": RaindropBoard,
  "w6-strider": StriderBoard,
  "w6-ship": ShipBoard,
  "w6-ice": IceBoard,
  "w6-glass": GlassBoard,
};
