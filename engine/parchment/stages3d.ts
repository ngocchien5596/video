/**
 * Sổ đăng ký các tập dựng cảnh 3D (three.js): số tập → sân khấu tạo bởi makeStage3D,
 * và bảng đạo cụ chính của tập (composition KienThuc-DaoCu-NN, tự chụp khi `npm run review`).
 * Tập có tên ở đây thì ParchmentPlayer vẽ sân khấu 3D thay cho cảnh SVG trong scenes.tsx.
 * Quy trình dựng: projects/kien-thuc/docs/dung-canh-3d.md
 */
import type React from "react";
import type { Stage3DProps } from "../three/stage.tsx";
import type { PropItem } from "../three/prop-sheet.tsx";
import { Ep16Stage } from "./ep16.tsx";
import { Ep17Props, Ep17Stage } from "./ep17.tsx";

export const STAGES_3D: Record<number, React.FC<Stage3DProps>> = {
  16: Ep16Stage,
  17: Ep17Stage,
};

/** Đạo cụ chính từng tập (vật được nói tới trong lời dẫn), để soi riêng trước khi duyệt cảnh. */
export const PROPS_3D: Record<number, PropItem[]> = {
  17: Ep17Props,
};
