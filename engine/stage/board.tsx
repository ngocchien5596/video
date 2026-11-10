import React from "react";
import { interpolate, spring } from "remotion";
import { COLORS } from "../components/brand.ts";
import type { Board } from "../lib/stage-types.ts";
import { at, type Change } from "./track.ts";

/**
 * Bảng minh hoạ: khung trắng ở nửa trên màn hình (dưới thanh tiêu đề, trên đầu nhân vật),
 * vẽ sơ đồ do dự án đăng ký. Không bị máy quay phóng to.
 */

/** Toạ độ bảng trên khung 1080×1920 và kích thước vùng vẽ bên trong. */
export const BOARD = { x: 60, y: 290, width: 960, height: 350 };

/** Props một sơ đồ nhận được. Vẽ trong hệ toạ độ BOARD.width × BOARD.height. */
export type BoardProps = {
  /** Bước đang hiện (từ 0). */
  step: number;
  /** Số khung hình kể từ lúc chuyển sang bước hiện tại (để làm hiệu ứng). */
  stepFrame: number;
  /** Số khung hình kể từ lúc bảng hiện lên. */
  frame: number;
  fps: number;
};

export type BoardRegistry = Record<string, React.FC<BoardProps>>;

export const BoardPanel: React.FC<{
  changes: Change<Board | null>[];
  registry: BoardRegistry;
  frame: number;
  fps: number;
}> = ({ changes, registry, frame, fps }) => {
  const t = frame / fps;
  const { cur } = at(changes, t);
  // Tìm lúc bảng bắt đầu hiện (lần đổi gần nhất từ null / bảng khác sang bảng này).
  const idx = changes.indexOf(cur);
  let openIdx = idx;
  while (openIdx > 0 && changes[openIdx - 1].value?.id === cur.value?.id && changes[openIdx - 1].value) openIdx--;
  const board = cur.value;

  // Đang cất bảng: thu nhỏ bảng vừa tắt.
  if (!board) {
    const prev = changes[idx - 1]?.value;
    if (!prev || !registry[prev.id]) return null;
    const local = frame - Math.round(cur.time * fps);
    const out = interpolate(local, [0, 8], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
    if (out <= 0) return null;
    return <Frame scale={out} opacity={out} />;
  }

  const Diagram = registry[board.id];
  if (!Diagram) return null;
  const openFrame = Math.round(Math.max(0, changes[openIdx].time) * fps);
  const stepFrame = frame - Math.round(Math.max(0, cur.time) * fps);
  const pop = spring({ frame: frame - openFrame, fps, config: { damping: 13, stiffness: 180 } });

  return (
    <Frame scale={interpolate(pop, [0, 1], [0.6, 1])} opacity={Math.min(1, pop * 1.5)}>
      <Diagram step={board.step ?? 0} stepFrame={stepFrame} frame={frame - openFrame} fps={fps} />
    </Frame>
  );
};

const Frame: React.FC<{ scale: number; opacity: number; children?: React.ReactNode }> = ({ scale, opacity, children }) => {
  const cx = BOARD.x + BOARD.width / 2;
  const cy = BOARD.y + BOARD.height / 2;
  return (
    <g opacity={opacity} transform={`translate(${cx} ${cy}) scale(${scale}) translate(${-cx} ${-cy})`}>
      <rect
        x={BOARD.x - 10}
        y={BOARD.y - 10}
        width={BOARD.width + 20}
        height={BOARD.height + 20}
        rx="30"
        fill={COLORS.paper}
        stroke={COLORS.ink}
        strokeWidth="10"
      />
      <svg x={BOARD.x} y={BOARD.y} width={BOARD.width} height={BOARD.height} viewBox={`0 0 ${BOARD.width} ${BOARD.height}`}>
        {children}
      </svg>
    </g>
  );
};
