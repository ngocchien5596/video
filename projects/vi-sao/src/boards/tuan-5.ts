/** Sơ đồ minh hoạ của tuần 5 "Cây cối và trái cây". Đăng ký id tại đây; id bắt đầu bằng "w5-". Các bước: docs/bang-minh-hoa-tuan-5.md. */
import type { BoardRegistry } from "../../../../engine/stage/board.tsx";
import { W5AutumnLeafBoard } from "./w5-autumn-leaf.tsx";
import { W5CactusBoard } from "./w5-cactus.tsx";
import { W5ChiliBoard } from "./w5-chili.tsx";
import { W5FlytrapBoard } from "./w5-flytrap.tsx";
import { W5PlantMassBoard } from "./w5-plant-mass.tsx";
import { W5SunflowerBoard } from "./w5-sunflower.tsx";
import { W5TomatoBoard } from "./w5-tomato.tsx";

export const BOARDS_TUAN_5: BoardRegistry = {
  "w5-flytrap": W5FlytrapBoard,
  "w5-plant-mass": W5PlantMassBoard,
  "w5-autumn-leaf": W5AutumnLeafBoard,
  "w5-sunflower": W5SunflowerBoard,
  "w5-chili": W5ChiliBoard,
  "w5-tomato": W5TomatoBoard,
  "w5-cactus": W5CactusBoard,
};
