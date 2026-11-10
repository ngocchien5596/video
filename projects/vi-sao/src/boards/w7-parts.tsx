/** Hình dùng chung cho các sơ đồ tuần 7 (Căn bếp nhà mình): thẻ nhắc an toàn, ngọn lửa, con dao, bong bóng. */
import React from "react";
import { TEXT_FONT } from "../../../../engine/components/brand.ts";
import { INK } from "./common.tsx";

export { Tag } from "./w4-parts.tsx";

/** Thẻ nhắc an toàn màu cam (ví dụ "NGƯỜI LỚN CẦM DAO"), góc dưới bảng. */
export const SafetyBadge: React.FC<{ x: number; y: number; text: string; opacity?: number; size?: number }> = ({
  x,
  y,
  text,
  opacity = 1,
  size = 20,
}) => {
  if (opacity <= 0) return null;
  const w = text.length * size * 0.7 + 60;
  const h = size + 18;
  return (
    <g opacity={opacity}>
      <rect x={x - w / 2} y={y - h / 2} width={w} height={h} rx={10} fill="#FF8A3D" stroke={INK} strokeWidth="4" />
      {/* Dấu chấm than trong vòng tròn */}
      <circle cx={x - w / 2 + 22} cy={y} r={12} fill="#FFFFFF" stroke={INK} strokeWidth="3" />
      <text x={x - w / 2 + 22} y={y + 7} textAnchor="middle" fontFamily={TEXT_FONT} fontWeight="900" fontSize={18} fill={INK}>
        !
      </text>
      <text x={x + 16} y={y + size * 0.36} textAnchor="middle" fontFamily={TEXT_FONT} fontWeight="900" fontSize={size} fill="#FFFFFF">
        {text}
      </text>
    </g>
  );
};

/** Ngọn lửa bếp ở (x, y) là chân lửa; `t` để lửa lay động. */
export const Flame: React.FC<{ x: number; y: number; s?: number; t?: number }> = ({ x, y, s = 1, t = 0 }) => {
  const k = 1 + 0.08 * Math.sin(t / 3);
  return (
    <g transform={`translate(${x} ${y}) scale(${s} ${s * k})`}>
      <path d="M0 0 C-26 0 -30 -28 -14 -48 C-12 -30 -2 -32 0 -62 C10 -40 30 -36 22 -14 C20 -4 12 0 0 0 Z" fill="#FF8A3D" stroke={INK} strokeWidth="4" />
      <path d="M0 -4 C-12 -4 -14 -18 -4 -30 C0 -20 8 -22 8 -12 C8 -6 4 -4 0 -4 Z" fill="#FFD93D" />
    </g>
  );
};

/** Con dao (lưỡi bạc, cán nâu), mũi dao chĩa sang trái; (x, y) là mũi dao. */
export const Knife: React.FC<{ x: number; y: number; angle?: number; s?: number }> = ({ x, y, angle = 0, s = 1 }) => (
  <g transform={`translate(${x} ${y}) rotate(${angle}) scale(${s})`}>
    <path d="M0 0 L120 -22 L120 8 Z" fill="#D9DEE5" stroke={INK} strokeWidth="4" strokeLinejoin="round" />
    <rect x={120} y={-20} width={70} height={24} rx={8} fill="#8B5A2B" stroke={INK} strokeWidth="4" />
  </g>
);

/** Bong bóng khí tròn. */
export const Bubble: React.FC<{ x: number; y: number; r?: number; fill?: string }> = ({ x, y, r = 12, fill = "#FFFFFF" }) => (
  <g>
    <circle cx={x} cy={y} r={r} fill={fill} stroke={INK} strokeWidth="3" />
    <circle cx={x - r * 0.35} cy={y - r * 0.35} r={r * 0.25} fill="#FFFFFF" opacity={0.9} />
  </g>
);
