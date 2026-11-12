/**
 * Hàm vẽ dùng chung cho đạo cụ, phông, vai (kể cả đồ truyện trong engine/stage/story).
 */
import React from "react";
import { COLORS, TITLE_FONT } from "../components/brand.ts";

export const INK = COLORS.ink;

/** Mặt sàn (toạ độ y trên khung 1080×1920). Phụ đề nằm ngay dưới. */
export const FLOOR = 1240;

export const Floor: React.FC<{ color: string; line: string }> = ({ color, line }) => (
  <>
    <defs>
      <linearGradient id="floor-shade" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#000000" stopOpacity="0" />
        <stop offset="1" stopColor="#000000" stopOpacity="0.75" />
      </linearGradient>
    </defs>
    <rect x="0" y={FLOOR} width="1080" height={1920 - FLOOR} fill={color} />
    {[0, 1, 2, 3, 4, 5].map((i) => (
      <line key={i} x1="0" y1={FLOOR + 30 + i * 60} x2="1080" y2={FLOOR + 30 + i * 60} stroke={line} strokeWidth="4" />
    ))}
    <rect x="0" y={FLOOR} width="1080" height={1920 - FLOOR} fill="url(#floor-shade)" />
    <rect x="0" y={FLOOR - 6} width="1080" height="12" fill={INK} />
  </>
);

/** Giữ chữ không bị lật khi nhân vật quay sang trái. */
export const Unmirror: React.FC<{ mirrored: boolean; children: React.ReactNode }> = ({ mirrored, children }) =>
  mirrored ? <g transform="scale(-1,1)">{children}</g> : <>{children}</>;

/** Cỡ chữ vừa một khung rộng `width` (ước lượng chữ in hoa rộng ~0,6 cỡ chữ). */
export const fitSize = (text: string, width: number, max: number) => Math.min(max, width / Math.max(1, text.length * 0.6));

/** Chữ nhiều dòng (tách bằng \n), căn giữa quanh (0, cy). */
export const Lines: React.FC<{ text: string; cy: number; width: number; max: number; color?: string; font?: string }> = ({
  text,
  cy,
  width,
  max,
  color = INK,
  font = TITLE_FONT,
}) => {
  const lines = text.split("\n");
  const size = Math.min(...lines.map((l) => fitSize(l, width, max)));
  return (
    <>
      {lines.map((l, i) => (
        <text
          key={i}
          x="0"
          y={cy + (i - (lines.length - 1) / 2) * size * 1.05}
          textAnchor="middle"
          dominantBaseline="middle"
          fontFamily={font}
          fontWeight="900"
          fontSize={size}
          fill={color}
        >
          {l}
        </text>
      ))}
    </>
  );
};

/**
 * extend: đồ có cán (quạt, kính lúp), vẽ dọc theo trục +y từ điểm cầm (0,0), xoay theo cẳng tay.
 * upright: đồ đứng thẳng, vẽ với đáy ở (0,0).
 */
export type PropDef = {
  mode: "extend" | "upright";
  draw: (opts: { text?: string; mirrored: boolean }) => React.ReactNode;
};
