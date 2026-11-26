/**
 * Cảnh chèn toàn khung của series "Ông Ơi, Vì Sao?", dùng trong phần diễn qua kênh `insert`:
 *   { insert: { id: "w2-mine-rat", step: 2 } }   ·   { insert: null } để quay về sân khấu
 * Tranh vẽ trên khung 1080×1920, nội dung chính trong y 300–1300 (xem engine/stage/insert.tsx).
 */
import type { BoardRegistry } from "../../../../engine/stage/board.tsx";
import { W2MineRatInsert } from "./w2-mine-rat.tsx";

export const INSERTS: BoardRegistry = {
  "w2-mine-rat": W2MineRatInsert,
};
