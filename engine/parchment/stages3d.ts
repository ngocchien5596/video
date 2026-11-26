/**
 * Sổ đăng ký các tập dựng cảnh 3D (three.js): số tập → sân khấu tạo bởi makeStage3D.
 * Tập có tên ở đây thì ParchmentPlayer vẽ sân khấu 3D thay cho cảnh SVG trong scenes.tsx.
 * Quy trình dựng: projects/kien-thuc/docs/dung-canh-3d.md
 */
import type React from "react";
import type { Stage3DProps } from "../three/stage.tsx";
import { Ep16Stage } from "./ep16.tsx";

export const STAGES_3D: Record<number, React.FC<Stage3DProps>> = {
  16: Ep16Stage,
};
