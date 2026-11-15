/**
 * Hàm vẽ dùng chung cho đạo cụ, phông, vai (kể cả đồ truyện trong engine/stage/story).
 */
import React from "react";
import { COLORS, TITLE_FONT } from "../components/brand.ts";
import { LINE } from "./village.tsx";

export const INK = COLORS.ink;
/** Viền nâu đậm ấm của cảnh và đạo cụ (đồng bộ bản thiết kế nhân vật mới). Nhân vật vẫn dùng INK. */
export { LINE };

/** Mặt sàn (toạ độ y trên khung 1080×1920). Phụ đề nằm ngay dưới. */
export const FLOOR = 1240;

/**
 * Mặt sàn chung (phông truyện dùng): nền màu `color`, vạch `line` thưa dần về phía trước, ánh nắng ở mép trong,
 * tối dần (nâu ấm, không đen) về phía trước; mép tiếp giáp tường viền nâu đậm.
 */
export const Floor: React.FC<{ color: string; line: string }> = ({ color, line }) => (
  <>
    <defs>
      <linearGradient id="floor-shade" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#FFE9B8" stopOpacity="0.22" />
        <stop offset="0.25" stopColor="#3A2416" stopOpacity="0" />
        <stop offset="1" stopColor="#2A170C" stopOpacity="0.55" />
      </linearGradient>
    </defs>
    <rect x="0" y={FLOOR} width="1080" height={1920 - FLOOR} fill={color} />
    {/* Vạch sàn thưa dần về phía trước (phối cảnh), vài vạch chéo hội tụ về giữa sân khấu */}
    {[0, 1, 2, 3, 4, 5, 6].map((i) => {
      const y = FLOOR + 18 + 14 * i * (i + 1);
      return <line key={i} x1="0" y1={y} x2="1080" y2={y} stroke={line} strokeWidth={2 + i * 0.8} opacity="0.8" />;
    })}
    {[-3, -2, -1, 0, 1, 2, 3].map((i) => (
      <line key={`r${i}`} x1={540 + i * 170} y1={FLOOR} x2={540 + i * 520} y2={1920} stroke={line} strokeWidth="3" opacity="0.45" />
    ))}
    <rect x="0" y={FLOOR} width="1080" height={1920 - FLOOR} fill="url(#floor-shade)" />
    <rect x="0" y={FLOOR - 4} width="1080" height="8" fill={LINE} opacity="0.85" />
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
