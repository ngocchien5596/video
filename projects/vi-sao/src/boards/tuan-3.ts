/** Sơ đồ minh hoạ của tuần 3 "Vũ trụ quanh mình". Mô tả các bước: docs/bang-minh-hoa-tuan-3.md. */
import type { BoardRegistry } from "../../../../engine/stage/board.tsx";
import { FloatBoard } from "./w3-float.tsx";
import { MeteorBoard } from "./w3-meteor.tsx";
import { MoonPhasesBoard } from "./w3-moon-phases.tsx";
import { MoonSpotsBoard } from "./w3-moon-spots.tsx";
import { SaturnBoard } from "./w3-saturn.tsx";
import { SeasonsBoard } from "./w3-seasons.tsx";
import { TwinkleBoard } from "./w3-twinkle.tsx";

export const BOARDS_TUAN_3: BoardRegistry = {
  "w3-seasons": SeasonsBoard,
  "w3-twinkle": TwinkleBoard,
  "w3-meteor": MeteorBoard,
  "w3-moon-spots": MoonSpotsBoard,
  "w3-moon-phases": MoonPhasesBoard,
  "w3-float": FloatBoard,
  "w3-saturn": SaturnBoard,
};
