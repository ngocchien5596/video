/**
 * Các sơ đồ minh hoạ của series "Ông Ơi, Vì Sao?", dùng trong phần diễn qua kênh `board`:
 *   { board: { id: "sky-blue", step: 2 } }
 * Thêm sơ đồ mới: tạo file trong thư mục này, đăng ký id ở đây, ghi các bước vào docs/bang-minh-hoa.md.
 */
import type { BoardRegistry } from "../../../../engine/stage/board.tsx";
import { CloudsBoard } from "./clouds.tsx";
import { NightBoard } from "./night.tsx";
import { RainBoard } from "./rain.tsx";
import { RainbowBoard } from "./rainbow.tsx";
import { SkyBlueBoard } from "./sky-blue.tsx";
import { SunsetBoard } from "./sunset.tsx";
import { ThunderBoard } from "./thunder.tsx";

export const BOARDS: BoardRegistry = {
  "sky-blue": SkyBlueBoard,
  sunset: SunsetBoard,
  clouds: CloudsBoard,
  rain: RainBoard,
  rainbow: RainbowBoard,
  thunder: ThunderBoard,
  night: NightBoard,
};
