/** Sơ đồ minh hoạ của tuần 2 "Con vật kỳ lạ". Đăng ký id tại đây; id bắt đầu bằng "w2-". Các bước: docs/bang-minh-hoa-tuan-2.md. */
import type { BoardRegistry } from "../../../../engine/stage/board.tsx";
import { W2CatEyesBoard } from "./w2-cat-eyes.tsx";
import { W2CowBoard } from "./w2-cow.tsx";
import { W2FireflyBoard } from "./w2-firefly.tsx";
import { W2FlamingoBoard } from "./w2-flamingo.tsx";
import { W2GeckoBoard } from "./w2-gecko.tsx";
import { W2OwlBoard } from "./w2-owl.tsx";
import { W2PandaBoard } from "./w2-panda.tsx";

export const BOARDS_TUAN_2: BoardRegistry = {
  "w2-flamingo": W2FlamingoBoard,
  "w2-cow": W2CowBoard,
  "w2-gecko": W2GeckoBoard,
  "w2-panda": W2PandaBoard,
  "w2-owl": W2OwlBoard,
  "w2-cat-eyes": W2CatEyesBoard,
  "w2-firefly": W2FireflyBoard,
};
