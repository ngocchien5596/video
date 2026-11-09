import React from "react";
import type { FxKind } from "../lib/stage-types.ts";
import { COLORS, TITLE_FONT } from "../components/brand.ts";

const INK = COLORS.ink;

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

/**
 * Vẽ một hiệu ứng tại (x, y) = đỉnh đầu nhân vật.
 * local = số khung hình kể từ lúc hiệu ứng bắt đầu; pop = 0..1 (lò xo).
 */
export const FxShape: React.FC<{ kind: FxKind; text?: string; x: number; y: number; local: number; pop: number; side: 1 | -1 }> = ({
  kind,
  text,
  x,
  y,
  local,
  pop,
  side,
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
          <polygon points={star(130, 74, 12)} fill="#FFD93D" stroke={INK} strokeWidth="9" strokeLinejoin="round" />
          <g transform="rotate(-10)">
            <BigText text={text ?? "BỐP!"} size={78} color={COLORS.red} />
          </g>
        </>,
        0,
        10,
      );
    case "exclaim":
      return g(<BigText text={text ?? "!"} size={170} color="#FFD93D" />, side * 120, -20 + wobble);
    case "surprise":
      return g(<BigText text={text ?? "?!"} size={160} color="#FFD93D" />, side * 120, -20 + wobble);
    case "question":
      return g(
        <g transform={`rotate(${wobble * 2})`}>
          <BigText text={text ?? "?"} size={170} color="#7FE3FF" />
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
              fill="#7FE3FF"
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
              fill="#FF5C8A"
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
              fill="#FFF3A0"
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
        <g stroke={COLORS.red} strokeWidth="12" strokeLinecap="round" fill="none">
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
