/**
 * Sơ đồ "Vì sao cất đồ ăn vào tủ lạnh thì lâu hỏng hơn?" (4 bước):
 *   0  Miếng thịt, kính lúp thấy vài con vi khuẩn bám trên mặt
 *   1  Chỗ ấm: vi khuẩn sinh sôi rất nhanh, thịt đổi màu, có mùi lạ (hỏng)
 *   2  Trong tủ lạnh: hầu hết vi khuẩn lớn rất chậm, đồ ăn giữ được lâu
 *   3  Lạnh không làm chết hết vi khuẩn: thẻ ĂN SỚM NHÉ
 * Nguồn: University of Illinois Extension, Virginia Cooperative Extension, Penn State Extension.
 */
import React from "react";
import type { BoardProps } from "../../../../engine/stage/board.tsx";
import { appearer, BLUE, Caption, INK, Label } from "./common.tsx";
import { SafetyBadge, Tag } from "./w7-parts.tsx";

const CAPTIONS = ["Trên đồ ăn tươi có sẵn vi khuẩn", "Chỗ ấm: vi khuẩn sinh sôi rất nhanh", "Tủ lạnh: vi khuẩn lớn rất chậm", "Vi khuẩn không chết hết: ăn sớm nhé!"];

const GERM = "#5DBB63";

/** Con vi khuẩn hoạt hình (tròn xanh, mắt to); `sleepy` thì nhắm mắt. */
const Germ: React.FC<{ x: number; y: number; s?: number; sleepy?: boolean; wiggle?: number }> = ({ x, y, s = 1, sleepy = false, wiggle = 0 }) => (
  <g transform={`translate(${x} ${y + wiggle}) scale(${s})`}>
    {[0, 60, 120, 180, 240, 300].map((a) => {
      const r = (a * Math.PI) / 180;
      return <line key={a} x1={Math.cos(r) * 12} y1={Math.sin(r) * 12} x2={Math.cos(r) * 19} y2={Math.sin(r) * 19} stroke={INK} strokeWidth="3" strokeLinecap="round" />;
    })}
    <circle r={13} fill={GERM} stroke={INK} strokeWidth="3" />
    {sleepy ? (
      <g stroke={INK} strokeWidth="2.5" strokeLinecap="round">
        <line x1={-7} y1={-2} x2={-2} y2={-2} />
        <line x1={2} y1={-2} x2={7} y2={-2} />
      </g>
    ) : (
      <g fill={INK}>
        <circle cx={-4} cy={-3} r={2.5} />
        <circle cx={4} cy={-3} r={2.5} />
      </g>
    )}
  </g>
);

/** Miếng thịt (hình bầu dục hồng); `spoil` 0..1 ngả màu xám xanh. */
const Meat: React.FC<{ x: number; y: number; spoil?: number }> = ({ x, y, spoil = 0 }) => (
  <g>
    <ellipse cx={x} cy={y + 30} rx={130} ry={22} fill="#FFFFFF" stroke={INK} strokeWidth="5" />
    <path
      d={`M${x - 100} ${y + 10} C${x - 110} ${y - 40} ${x - 30} ${y - 55} ${x + 20} ${y - 45} C${x + 80} ${y - 40} ${x + 110} ${y - 10} ${x + 95} ${y + 18} C${x + 60} ${y + 34} ${x - 70} ${y + 34} ${x - 100} ${y + 10} Z`}
      fill="#E98A8A"
      stroke={INK}
      strokeWidth="5"
    />
    <path
      d={`M${x - 100} ${y + 10} C${x - 110} ${y - 40} ${x - 30} ${y - 55} ${x + 20} ${y - 45} C${x + 80} ${y - 40} ${x + 110} ${y - 10} ${x + 95} ${y + 18} C${x + 60} ${y + 34} ${x - 70} ${y + 34} ${x - 100} ${y + 10} Z`}
      fill="#8FA36B"
      opacity={0.75 * spoil}
    />
    <path d={`M${x - 50} ${y - 20} q30 -14 60 0`} fill="none" stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round" opacity={0.8} />
  </g>
);

/** Vị trí vi khuẩn trên miếng thịt (lệch so với tâm). */
const SPOTS = [
  [-60, -10],
  [10, -30],
  [60, 0],
  [-20, 10],
  [-80, 14],
  [35, 18],
  [80, -20],
  [-40, -30],
  [0, -8],
  [55, -32],
  [-95, -8],
  [90, 12],
];

export const FridgeBoard: React.FC<BoardProps> = ({ step, stepFrame, frame }) => {
  const appear = appearer(step, stepFrame);
  const intro = appear(0, 2, 16);
  const warm = appear(1, 0, 40);
  const cold = appear(2, 0, 16);
  const final = appear(3, 0, 14);
  // Số vi khuẩn bên chỗ ấm tăng dần ở bước 1.
  const warmCount = step === 0 ? 3 : Math.min(SPOTS.length, 3 + Math.floor(warm * 9));
  const L = { x: 240, y: 215 };
  const R = { x: 720, y: 215 };

  return (
    <g>
      {/* Bên trái: chỗ ấm */}
      <Meat x={L.x} y={L.y} spoil={step >= 1 ? warm : 0} />
      {SPOTS.slice(0, warmCount).map(([dx, dy], i) => (
        <Germ key={i} x={L.x + dx} y={L.y + dy} s={0.9} wiggle={step >= 1 ? Math.sin(frame / 4 + i) * 3 : 0} />
      ))}
      <Tag x={L.x} y={110} text="VI KHUẨN" size={24} color="#2E7D32" opacity={step === 0 ? intro : 0} />

      {/* Bước 1: mùi lạ bốc lên, nhãn chỗ ấm */}
      {step >= 1 ? (
        <g opacity={warm}>
          {[-60, 0, 60].map((dx, i) => (
            <path
              key={dx}
              d={`M${L.x + dx} ${L.y - 58} q-10 -12 0 -24 q10 -12 0 -24`}
              fill="none"
              stroke="#8FA36B"
              strokeWidth="5"
              strokeLinecap="round"
              transform={`translate(0 ${-4 * Math.sin(frame / 6 + i)})`}
            />
          ))}
          </g>
      ) : null}
      <Tag x={L.x} y={300} text="CHỖ ẤM: SINH SÔI NHANH" size={22} color="#C0392B" opacity={step === 1 || step === 2 ? warm : 0} />
      <Tag x={L.x} y={88} text="MÙI LẠ, ĐỔI MÀU: HỎNG" size={20} opacity={step === 1 ? warm : 0} />

      {/* Bên phải: tủ lạnh (từ bước 2) */}
      {cold > 0 ? (
        <g opacity={cold}>
          <rect x={R.x - 190} y={70} width={380} height={265} rx={22} fill="#DDF1FB" stroke={INK} strokeWidth="6" />
          <line x1={R.x - 190} y1={258} x2={R.x + 190} y2={258} stroke={INK} strokeWidth="4" />
          <Meat x={R.x} y={R.y} />
          {SPOTS.slice(0, 3).map(([dx, dy], i) => (
            <Germ key={i} x={R.x + dx} y={R.y + dy} s={0.9} sleepy />
          ))}
          {[R.x - 150, R.x + 150].map((x, i) => (
            <text key={x} x={x} y={120 + 6 * Math.sin(frame / 10 + i)} textAnchor="middle" fontSize="34" fill={BLUE}>
              ❄
            </text>
          ))}
          <Label x={R.x + 70} y={150} text="z z z" size={26} color={BLUE} />
          <Label x={R.x} y={110} text="TỦ LẠNH" size={28} color={BLUE} />
        </g>
      ) : null}
      <Tag x={R.x} y={300} text="LẠNH: LỚN RẤT CHẬM" size={22} color={BLUE} opacity={step === 2 ? cold : 0} />

      {/* Bước 3: vi khuẩn vẫn còn, nhắc ăn sớm */}
      <Tag x={R.x} y={300} text="VI KHUẨN VẪN CÒN" size={22} color="#2E7D32" opacity={final} />
      <SafetyBadge x={L.x} y={300} text="ĐỒ TRONG TỦ: ĂN SỚM NHÉ" opacity={final} />

      <Caption captions={CAPTIONS} step={step} />
    </g>
  );
};
