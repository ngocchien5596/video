/** Hình dùng chung cho các sơ đồ minh hoạ (vẽ trong khung 960×350 của bảng). */
import React from "react";
import { COLORS, TEXT_FONT } from "../../../../engine/components/brand.ts";

export const INK = COLORS.ink;
export const BLUE = "#3D7BD9";
export const RAINBOW = ["#E5484D", "#F28C38", "#FFD93D", "#3FA34D", "#3D7BD9", "#4B3FA3", "#8E44AD"];

export const clamp01 = (x: number) => Math.max(0, Math.min(1, x));

/**
 * Mức hiện của phần tử thuộc bước k: bước đã qua = 1, bước đang chạy tăng dần
 * (bắt đầu sau `delay` khung, trong `dur` khung), bước chưa tới = 0.
 */
export const appearer = (step: number, stepFrame: number) => (k: number, delay = 0, dur = 14) =>
  step > k ? 1 : step === k ? clamp01((stepFrame - delay) / dur) : 0;

/** Chú thích của bước hiện tại, ở mép trên bảng. */
export const Caption: React.FC<{ captions: string[]; step: number }> = ({ captions, step }) => (
  <text x="480" y="36" textAnchor="middle" fontFamily={TEXT_FONT} fontWeight="900" fontSize="32" fill={INK}>
    {captions[Math.min(step, captions.length - 1)]}
  </text>
);

export const Label: React.FC<{ x: number; y: number; text: string; opacity?: number; size?: number; color?: string }> = ({
  x,
  y,
  text,
  opacity = 1,
  size = 24,
  color = INK,
}) =>
  opacity > 0 ? (
    <text x={x} y={y} textAnchor="middle" fontFamily={TEXT_FONT} fontWeight="900" fontSize={size} fill={color} opacity={opacity}>
      {text}
    </text>
  ) : null;

export const Sun: React.FC<{ x: number; y: number; r?: number; pulse?: number }> = ({ x, y, r = 46, pulse = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${pulse})`}>
    {Array.from({ length: 12 }, (_, i) => {
      const a = (i * Math.PI) / 6;
      return (
        <line
          key={i}
          x1={Math.cos(a) * (r + 8)}
          y1={Math.sin(a) * (r + 8)}
          x2={Math.cos(a) * (r + 24)}
          y2={Math.sin(a) * (r + 24)}
          stroke="#F2B21B"
          strokeWidth="7"
          strokeLinecap="round"
        />
      );
    })}
    <circle r={r} fill="#FFD93D" stroke={INK} strokeWidth="6" />
  </g>
);

/** Mũi tên thẳng; `p` (0..1) là phần đã vẽ, để mũi tên "bay" tới đích. */
export const Arrow: React.FC<{
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color?: string;
  width?: number;
  p?: number;
  dashed?: boolean;
}> = ({ x1, y1, x2, y2, color = BLUE, width = 6, p = 1, dashed }) => {
  if (p <= 0.02) return null;
  const ex = x1 + (x2 - x1) * p;
  const ey = y1 + (y2 - y1) * p;
  const a = Math.atan2(ey - y1, ex - x1);
  const h = width * 2.6;
  const head = (d: number) => `${ex - Math.cos(a + d) * h},${ey - Math.sin(a + d) * h}`;
  return (
    <g stroke={color} fill={color} strokeLinecap="round">
      <line x1={x1} y1={y1} x2={ex} y2={ey} strokeWidth={width} strokeDasharray={dashed ? `${width * 2} ${width * 2}` : undefined} />
      <polygon points={`${ex},${ey} ${head(0.5)} ${head(-0.5)}`} strokeWidth="2" />
    </g>
  );
};

export const CloudShape: React.FC<{ x: number; y: number; s?: number; fill?: string; base?: string }> = ({
  x,
  y,
  s = 1,
  fill = "#FFFFFF",
  base,
}) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    {base ? (
      <defs>
        <linearGradient id={`cloud-${x}-${y}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0.35" stopColor={fill} />
          <stop offset="1" stopColor={base} />
        </linearGradient>
      </defs>
    ) : null}
    <path
      d="M-120 40 Q-140 -10 -90 -22 Q-80 -80 -20 -70 Q20 -110 70 -70 Q130 -76 128 -20 Q160 10 130 40 Z"
      fill={base ? `url(#cloud-${x}-${y})` : fill}
      stroke={INK}
      strokeWidth="6"
      strokeLinejoin="round"
    />
  </g>
);

export const Eye: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse rx="40" ry="24" fill="#FFFFFF" stroke={INK} strokeWidth="5" />
    <circle r="15" fill={BLUE} stroke={INK} strokeWidth="3" />
    <circle r="7" fill={INK} />
    <circle cx="-5" cy="-6" r="4" fill="#FFFFFF" />
  </g>
);

/** Người tí hon (đầu + thân), đứng với chân ở (x, y). */
export const Kid: React.FC<{ x: number; y: number; s?: number; color?: string }> = ({ x, y, s = 1, color = "#FF6B35" }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} stroke={INK} strokeWidth="5" strokeLinecap="round">
    <line x1="-10" y1="0" x2="-4" y2="-34" />
    <line x1="10" y1="0" x2="4" y2="-34" />
    <rect x="-16" y="-74" width="32" height="42" rx="10" fill={color} />
    <circle cx="0" cy="-92" r="18" fill="#F8D2B0" />
  </g>
);

/** Giọt nước. */
export const Drop: React.FC<{ x: number; y: number; s?: number; fill?: string }> = ({ x, y, s = 1, fill = "#7FC8F8" }) => (
  <path
    d="M0 -14 Q11 2 0 10 Q-11 2 0 -14 Z"
    transform={`translate(${x} ${y}) scale(${s})`}
    fill={fill}
    stroke={INK}
    strokeWidth="3"
  />
);
