import React from "react";
import { interpolate } from "remotion";
import type { Board } from "../lib/stage-types.ts";
import type { BoardProps, BoardRegistry } from "./board.tsx";
import type { Change } from "./track.ts";

/**
 * Cảnh chèn toàn khung (Moment.insert): tranh kín 1080×1920 phủ lên sân khấu, kiểu "mỗi câu một hình" của phim tài liệu.
 * - Bật lên / đổi tranh / đổi bước: tranh mới hoà tan trên tranh cũ trong FADE khung.
 * - Tắt (null): tranh mờ dần về sân khấu trong FADE khung.
 * - Trong lúc hiện: phóng to chậm quanh tâm khung (tối đa ZOOM).
 * Vùng an toàn cho nội dung chính: y 300–1300 (trên là thanh tiêu đề, dưới là phụ đề).
 * Tranh nhận cùng props với bảng minh hoạ (BoardProps) nhưng vẽ trong hệ toạ độ 1080×1920.
 */
const FADE = 15;
const ZOOM = 0.06;
/** Số khung để phóng hết ZOOM (≈ 4 giây ở 30 khung/giây). */
const ZOOM_FRAMES = 120;

const same = (a: Board | null, b: Board | null) => Boolean(a && b && a.id === b.id && (a.step ?? 0) === (b.step ?? 0));

const Layer: React.FC<{
  value: Board;
  registry: BoardRegistry;
  frame: number;
  fps: number;
  /** Khung lúc tranh (id này) bắt đầu hiện. */
  openFrame: number;
  /** Khung lúc bước hiện tại bắt đầu. */
  stepStart: number;
  opacity: number;
}> = ({ value, registry, frame, fps, openFrame, stepStart, opacity }) => {
  const Pic = registry[value.id] as React.FC<BoardProps> | undefined;
  if (!Pic || opacity <= 0) return null;
  const k = 1 + ZOOM * Math.min(1, (frame - stepStart) / ZOOM_FRAMES);
  return (
    <g opacity={opacity} transform={`translate(540 860) scale(${k}) translate(-540 -860)`}>
      <Pic step={value.step ?? 0} stepFrame={frame - stepStart} frame={frame - openFrame} fps={fps} />
    </g>
  );
};

export const InsertPanel: React.FC<{
  changes: Change<Board | null>[];
  registry: BoardRegistry;
  frame: number;
  fps: number;
}> = ({ changes, registry, frame, fps }) => {
  const t = frame / fps;
  // Gộp các thay đổi trùng nhau liên tiếp (cùng tranh, cùng bước) để không hoà tan lại vô ích.
  const list: Change<Board | null>[] = [];
  for (const c of changes) {
    const prev = list[list.length - 1];
    if (prev && (same(prev.value, c.value) || (prev.value === null && c.value === null))) continue;
    list.push(c);
  }
  let idx = 0;
  for (let i = 0; i < list.length; i++) if (list[i].time <= t) idx = i;
  const cur = list[idx];
  const curStart = Math.round(Math.max(0, cur.time) * fps);
  const local = frame - curStart;
  const fadeIn = interpolate(local, [0, FADE], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  /** Khung lúc tranh có id này bắt đầu hiện liên tục (để hiệu ứng trong tranh chạy liền qua các bước). */
  const openOf = (i: number) => {
    let j = i;
    while (j > 0 && list[j - 1].value && list[j - 1].value?.id === list[i].value?.id) j--;
    return Math.round(Math.max(0, list[j].time) * fps);
  };

  const prev = idx > 0 ? list[idx - 1] : undefined;
  const prevLayer =
    prev?.value && local < FADE ? (
      <Layer
        value={prev.value}
        registry={registry}
        frame={frame}
        fps={fps}
        openFrame={openOf(idx - 1)}
        stepStart={Math.round(Math.max(0, prev.time) * fps)}
        // Đang tắt hẳn: tranh cũ mờ dần; đang đổi sang tranh khác: tranh cũ giữ nguyên để tranh mới hoà lên trên.
        opacity={cur.value ? 1 : 1 - fadeIn}
      />
    ) : null;

  return (
    <g>
      {prevLayer}
      {cur.value ? (
        <Layer value={cur.value} registry={registry} frame={frame} fps={fps} openFrame={openOf(idx)} stepStart={curStart} opacity={fadeIn} />
      ) : null}
    </g>
  );
};
