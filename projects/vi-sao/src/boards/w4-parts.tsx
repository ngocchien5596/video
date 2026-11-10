/** Hình dùng chung cho các sơ đồ tuần 4 (Cơ thể mình): đầu nhìn nghiêng, tia thần kinh, nhãn có nền. */
import React from "react";
import { TEXT_FONT } from "../../../../engine/components/brand.ts";
import { INK } from "./common.tsx";

export const SKIN = "#F8D2B0";
export const SKIN_DARK = "#E9B48C";
export const BRAIN = "#F6A5C0";
export const RED = "#E5484D";
export const NERVE = "#F2B21B";

/** Đầu nhìn nghiêng, mặt quay sang phải. (cx, cy) là tâm đầu. */
export const HeadSide: React.FC<{
  cx: number;
  cy: number;
  /** Mức sáng của não (0..1), để nháy khi nhận tín hiệu. */
  brainGlow?: number;
  showBrain?: boolean;
  /** Vẽ khoang miệng mở (để thấy vòm miệng). */
  mouthOpen?: boolean;
}> = ({ cx, cy, brainGlow = 0, showBrain = true, mouthOpen = false }) => (
  <g>
    {/* Cổ */}
    <rect x={cx - 38} y={cy + 80} width={76} height={50} fill={SKIN} stroke={INK} strokeWidth="6" />
    {/* Đầu + mũi */}
    <path
      d={`M${cx - 92} ${cy}
        C${cx - 92} ${cy - 70} ${cx - 45} ${cy - 105} ${cx + 5} ${cy - 105}
        C${cx + 60} ${cy - 105} ${cx + 95} ${cy - 65} ${cx + 95} ${cy - 15}
        L${cx + 128} ${cy + 22} L${cx + 96} ${cy + 34}
        C${cx + 98} ${cy + 70} ${cx + 70} ${cy + 100} ${cx + 10} ${cy + 100}
        C${cx - 55} ${cy + 100} ${cx - 92} ${cy + 60} ${cx - 92} ${cy} Z`}
      fill={SKIN}
      stroke={INK}
      strokeWidth="6"
      strokeLinejoin="round"
    />
    {/* Tai */}
    <ellipse cx={cx - 30} cy={cy + 5} rx={14} ry={20} fill={SKIN_DARK} stroke={INK} strokeWidth="4" />
    {/* Mắt */}
    <circle cx={cx + 58} cy={cy - 22} r={7} fill={INK} />
    {/* Miệng */}
    {mouthOpen ? (
      <path
        d={`M${cx + 92} ${cy + 52} C${cx + 70} ${cy + 36} ${cx + 30} ${cy + 38} ${cx + 22} ${cy + 58} C${cx + 34} ${cy + 76} ${cx + 72} ${cy + 76} ${cx + 92} ${cy + 64} Z`}
        fill="#7A2E3A"
        stroke={INK}
        strokeWidth="4"
      />
    ) : (
      <path d={`M${cx + 66} ${cy + 62} Q${cx + 80} ${cy + 66} ${cx + 92} ${cy + 60}`} fill="none" stroke={INK} strokeWidth="5" strokeLinecap="round" />
    )}
    {/* Não */}
    {showBrain ? (
      <g>
        <ellipse cx={cx + 5} cy={cy - 50} rx={62} ry={38} fill={BRAIN} stroke={INK} strokeWidth="4" />
        {brainGlow > 0 ? <ellipse cx={cx + 5} cy={cy - 50} rx={72} ry={48} fill="none" stroke={NERVE} strokeWidth="8" opacity={brainGlow} /> : null}
        <path
          d={`M${cx - 35} ${cy - 55} q15 -18 30 0 q15 18 30 0 q12 -14 22 4 M${cx - 25} ${cy - 35} q15 -12 30 0 q15 12 30 0`}
          fill="none"
          stroke="#C2577D"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </g>
    ) : null}
  </g>
);

/** Tia thần kinh (đường gấp khúc màu vàng) từ (x1,y1) tới (x2,y2); `p` là phần đã chạy. */
export const Zigzag: React.FC<{ x1: number; y1: number; x2: number; y2: number; p?: number; color?: string; teeth?: number }> = ({
  x1,
  y1,
  x2,
  y2,
  p = 1,
  color = NERVE,
  teeth = 8,
}) => {
  if (p <= 0.02) return null;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.hypot(dx, dy) || 1;
  const nx = -dy / len;
  const ny = dx / len;
  const n = Math.max(2, Math.round(teeth * p));
  const pts: string[] = [];
  for (let i = 0; i <= n; i++) {
    const t = (i / n) * p;
    const off = i === 0 || i === n ? 0 : (i % 2 ? 1 : -1) * 10;
    pts.push(`${x1 + dx * t + nx * off},${y1 + dy * t + ny * off}`);
  }
  return <polyline points={pts.join(" ")} fill="none" stroke={color} strokeWidth="7" strokeLinejoin="round" strokeLinecap="round" />;
};

/** Nhãn chữ có nền trắng viền mực, đọc rõ trên mọi hình. */
export const Tag: React.FC<{ x: number; y: number; text: string; opacity?: number; size?: number; color?: string; w?: number }> = ({
  x,
  y,
  text,
  opacity = 1,
  size = 24,
  color = INK,
  w,
}) => {
  if (opacity <= 0) return null;
  const width = w ?? text.length * size * 0.72 + 28;
  const h = size + 16;
  return (
    <g opacity={opacity}>
      <rect x={x - width / 2} y={y - h / 2} width={width} height={h} rx={h / 2} fill="#FFFFFF" stroke={INK} strokeWidth="4" />
      <text x={x} y={y + size * 0.36} textAnchor="middle" fontFamily={TEXT_FONT} fontWeight="900" fontSize={size} fill={color}>
        {text}
      </text>
    </g>
  );
};
