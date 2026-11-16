import React from "react";
import type { FxKind } from "../lib/stage-types.ts";
import { TITLE_FONT } from "../components/brand.ts";
import { LINE } from "./village.tsx";

/** Viền nâu đậm, màu vàng nghệ / đỏ son / lam ngọc, đồng bộ phong cách tranh dân gian. */
const INK = LINE;
const RED = "#C8402E";
const GOLD = "#F4C04A";

/** Số khung hình mỗi hiệu ứng hiện trên màn hình. */
export const FX_FRAMES: Record<FxKind, number> = {
  bop: 26,
  exclaim: 36,
  question: 45,
  surprise: 36,
  sweat: 50,
  hearts: 50,
  sparkle: 40,
  anger: 40,
};

const star = (r1: number, r2: number, n: number) =>
  Array.from({ length: n * 2 }, (_, i) => {
    const r = i % 2 === 0 ? r1 : r2;
    const a = (Math.PI * i) / n;
    return `${Math.sin(a) * r},${-Math.cos(a) * r}`;
  }).join(" ");

const BigText: React.FC<{ text: string; size: number; color: string }> = ({ text, size, color }) => (
  <text
    textAnchor="middle"
    dominantBaseline="middle"
    fontFamily={TITLE_FONT}
    fontSize={size}
    fill={color}
    stroke={INK}
    strokeWidth={size / 9}
    paintOrder="stroke"
  >
    {text}
  </text>
);

/** Cỡ chữ to cho hiệu ứng: chữ dài hơn 3 ký tự thì thu nhỏ dần (thấp nhất 84). */
const fitBig = (text: string, max: number) => (text.length <= 3 ? max : Math.max(84, Math.round((max * 3.4) / text.length)));

/** Độ lệch ngang sao cho cả dòng chữ (rộng ≈ 0,62 cỡ chữ mỗi ký tự) nằm trong vùng đang hiện [l, r] của sân khấu, chừa lề. */
const inFrame = (x: number, dx: number, text: string, size: number, view: [number, number]) => {
  const [l, r] = view;
  const pad = (r - l) * 0.05;
  const half = Math.min((text.length * size * 0.62) / 2, (r - l) / 2 - pad);
  const cx = Math.min(r - pad - half, Math.max(l + pad + half, x + dx));
  return cx - x;
};

/**
 * Vẽ một hiệu ứng tại (x, y) = đỉnh đầu nhân vật.
 * local = số khung hình kể từ lúc hiệu ứng bắt đầu; pop = 0..1 (lò xo).
 */
export const FxShape: React.FC<{
  kind: FxKind;
  text?: string;
  x: number;
  y: number;
  local: number;
  pop: number;
  side: 1 | -1;
  /** Vùng ngang của sân khấu đang hiện trong khung (máy quay zoom thì hẹp lại). */
  view?: [number, number];
}> = ({
  kind,
  text,
  x,
  y,
  local,
  pop,
  side,
  view = [0, 1080],
}) => {
  const fade = Math.min(1, (FX_FRAMES[kind] - local) / 6);
  const wobble = Math.sin(local * 0.5) * 6;
  const g = (children: React.ReactNode, dx = 0, dy = 0, s = pop) => (
    <g transform={`translate(${x + dx} ${y + dy}) scale(${s})`} opacity={Math.max(0, fade)}>
      {children}
    </g>
  );

  switch (kind) {
    case "bop":
      return g(
        <>
          <polygon points={star(130, 74, 12)} fill={GOLD} stroke={INK} strokeWidth="9" strokeLinejoin="round" />
          <g transform="rotate(-10)">
            <BigText text={text ?? "BỐP!"} size={78} color={RED} />
          </g>
        </>,
        0,
        10,
      );
    case "exclaim":
    case "surprise": {
      // Chữ dài (ví dụ "CÁ MẬP!") thu nhỏ lại và kéo vào trong khung, không tràn mép.
      const t = text ?? (kind === "exclaim" ? "!" : "?!");
      const size = fitBig(t, kind === "exclaim" ? 170 : 160);
      return g(<BigText text={t} size={size} color={GOLD} />, inFrame(x, side * 120, t, size, view), -20 + wobble - (t.length > 3 ? 70 : 0));
    }
    case "question":
      return g(
        <g transform={`rotate(${wobble * 2})`}>
          <BigText text={text ?? "?"} size={170} color="#8FD0D8" />
        </g>,
        side * 120,
        -30,
      );
    case "sweat":
      return g(
        <>
          {[0, 1].map((i) => (
            <path
              key={i}
              d="M0 -26 Q22 6 0 16 Q-22 6 0 -26 Z"
              fill="#8FD0D8"
              stroke={INK}
              strokeWidth="6"
              transform={`translate(${i * 40} ${i * 50 + local * 1.2})`}
            />
          ))}
        </>,
        side * -140,
        90,
        1,
      );
    case "hearts":
      return g(
        <>
          {[-70, 0, 70].map((dx, i) => (
            <path
              key={dx}
              d="M0 18 C-40 -10 -26 -44 0 -26 C26 -44 40 -10 0 18 Z"
              fill="#E8604A"
              stroke={INK}
              strokeWidth="6"
              transform={`translate(${dx} ${-local * 2.2 - i * 30}) scale(${0.8 + 0.2 * Math.sin(local * 0.4 + i)})`}
            />
          ))}
        </>,
        0,
        -10,
        1,
      );
    case "sparkle":
      return g(
        <>
          {[
            [-120, -20],
            [120, -50],
            [0, -110],
          ].map(([dx, dy], i) => (
            <polygon
              key={i}
              points={star(34, 10, 4)}
              fill="#FFE7A0"
              stroke={INK}
              strokeWidth="5"
              transform={`translate(${dx} ${dy}) scale(${0.6 + 0.5 * Math.abs(Math.sin(local * 0.3 + i))})`}
            />
          ))}
        </>,
        0,
        0,
        1,
      );
    case "anger":
      return g(
        <g stroke={RED} strokeWidth="12" strokeLinecap="round" fill="none">
          <path d="M-30 -10 Q-10 -10 -10 -30" />
          <path d="M30 -10 Q10 -10 10 -30" />
          <path d="M-30 10 Q-10 10 -10 30" />
          <path d="M30 10 Q10 10 10 30" />
        </g>,
        side * 100,
        40,
        pop * (1 + 0.1 * Math.sin(local * 0.8)),
      );
    default:
      return null;
  }
};
