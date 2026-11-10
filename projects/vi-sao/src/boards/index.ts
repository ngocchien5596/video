/**
 * Các sơ đồ minh hoạ của series "Ông Ơi, Vì Sao?", dùng trong phần diễn qua kênh `board`:
 *   { board: { id: "sky-blue", step: 2 } }
 * Thêm sơ đồ mới: tạo file trong thư mục này, đăng ký id ở đây, ghi các bước vào docs/bang-minh-hoa.md.
 */
import type { BoardRegistry } from "../../../../engine/stage/board.tsx";
import { CloudsBoard } from "./clouds.tsx";
import { NightBoard } from "./night.tsx";
import { RainBoard } from "./rain.tsx";
import { W1HailBoard } from "./w1-hail.tsx";
import { SkyBlueBoard } from "./sky-blue.tsx";
import { SunsetBoard } from "./sunset.tsx";
import { ThunderBoard } from "./thunder.tsx";
import { BOARDS_TUAN_2 } from "./tuan-2.ts";
import { BOARDS_TUAN_3 } from "./tuan-3.ts";
import { BOARDS_TUAN_4 } from "./tuan-4.ts";
import { BOARDS_TUAN_5 } from "./tuan-5.ts";
import { BOARDS_TUAN_6 } from "./tuan-6.ts";
import { BOARDS_TUAN_7 } from "./tuan-7.ts";

export const BOARDS: BoardRegistry = {
  "sky-blue": SkyBlueBoard,
  sunset: SunsetBoard,
  clouds: CloudsBoard,
  rain: RainBoard,
  "w1-hail": W1HailBoard,
  thunder: ThunderBoard,
  night: NightBoard,
  ...BOARDS_TUAN_2,
  ...BOARDS_TUAN_3,
  ...BOARDS_TUAN_4,
  ...BOARDS_TUAN_5,
  ...BOARDS_TUAN_6,
  ...BOARDS_TUAN_7,
};
