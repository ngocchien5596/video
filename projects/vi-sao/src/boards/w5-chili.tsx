/**
 * Sơ đồ "Vì sao quả ớt lại cay?" (4 bước):
 *   0  Trong quả ớt có một chất gây cay
 *   1  Chuột thấy cay nên tránh xa; lỡ ăn thì nhai nát hạt
 *   2  Chim không thấy cay, ăn ớt; hạt qua bụng chim vẫn nguyên
 *   3  Chim bay đi xa, hạt rơi xuống chỗ mới, nảy mầm thành cây ớt con
 * Nguồn: University of Florida News (Tewksbury & Nabhan 2001), Harvard Science in the News (Spicy Chili Peppers).
 */
import React from "react";
import type { BoardProps } from "../../../../engine/stage/board.tsx";
import { appearer, Arrow, Caption, INK, Label } from "./common.tsx";

const CAPTIONS = ["Quả ớt có chất gây cay", "Chuột thấy cay, tránh xa", "Chim không thấy cay!", "Hạt rơi chỗ mới, mọc cây con"];

const GROUND_Y = 300;

/** Quả ớt đỏ, cuống xanh. */
const Chili: React.FC<{ x: number; y: number; s?: number; rot?: number; opacity?: number }> = ({ x, y, s = 1, rot = 0, opacity = 1 }) => (
  <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} opacity={opacity}>
    <path d="M-10 -60 C30 -58 34 -10 14 30 C4 50 -6 62 -14 70 C-10 40 -30 0 -26 -40 C-24 -54 -18 -60 -10 -60 Z" fill="#E5484D" stroke={INK} strokeWidth="5" strokeLinejoin="round" />
    <path d="M-20 -62 C-12 -72 0 -72 6 -62" fill="#3FA34D" stroke={INK} strokeWidth="4" />
    <path d="M-6 -70 C-6 -84 4 -92 12 -94" fill="none" stroke="#3FA34D" strokeWidth="6" strokeLinecap="round" />
    <path d="M-10 -44 C-4 -30 -4 -12 -8 6" fill="none" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" opacity="0.6" />
  </g>
);

/** Hạt ớt: nguyên (tròn dẹt) hay vỡ (mảnh). */
const Seed: React.FC<{ x: number; y: number; broken?: boolean; opacity?: number }> = ({ x, y, broken, opacity = 1 }) =>
  broken ? (
    <g opacity={opacity}>
      <path d={`M${x - 8} ${y} l6 -6 l3 7 Z`} fill="#F5E6A8" stroke={INK} strokeWidth="2" />
      <path d={`M${x + 3} ${y + 2} l7 -4 l-1 8 Z`} fill="#F5E6A8" stroke={INK} strokeWidth="2" />
    </g>
  ) : (
    <ellipse cx={x} cy={y} rx="7" ry="5" fill="#F5E6A8" stroke={INK} strokeWidth="2" opacity={opacity} />
  );

/** Con chuột xám. */
const Mouse: React.FC<{ x: number; y: number; opacity?: number }> = ({ x, y, opacity = 1 }) => (
  <g transform={`translate(${x} ${y})`} opacity={opacity}>
    <path d="M40 10 C70 14 80 -6 96 -14" fill="none" stroke="#C78C8C" strokeWidth="5" strokeLinecap="round" />
    <ellipse cx="0" cy="0" rx="50" ry="30" fill="#A7A7B3" stroke={INK} strokeWidth="5" />
    <circle cx="-40" cy="-30" r="16" fill="#C9C9D3" stroke={INK} strokeWidth="4" />
    <circle cx="-40" cy="-30" r="8" fill="#F2B8C6" />
    <path d="M-44 -6 L-76 6 L-44 14 Z" fill="#A7A7B3" stroke={INK} strokeWidth="4" strokeLinejoin="round" />
    <circle cx="-76" cy="6" r="5" fill="#E5484D" />
    <circle cx="-50" cy="-2" r="4" fill={INK} />
  </g>
);

/** Con chim nhỏ, quay sang trái. */
const Bird: React.FC<{ x: number; y: number; wing: number; opacity?: number }> = ({ x, y, wing, opacity = 1 }) => (
  <g transform={`translate(${x} ${y})`} opacity={opacity}>
    <path d="M44 0 L78 -14 L74 12 Z" fill="#3D7BD9" stroke={INK} strokeWidth="4" strokeLinejoin="round" />
    <ellipse cx="0" cy="0" rx="52" ry="40" fill="#5AA9E6" stroke={INK} strokeWidth="5" />
    <path d={`M-4 -6 C20 ${-30 - wing * 14} 46 ${-20 - wing * 10} 40 4 Z`} fill="#3D7BD9" stroke={INK} strokeWidth="4" />
    <path d="M-48 -12 L-78 -2 L-48 6 Z" fill="#F28C38" stroke={INK} strokeWidth="4" strokeLinejoin="round" />
    <circle cx="-30" cy="-14" r="5" fill={INK} />
  </g>
);

export const W5ChiliBoard: React.FC<BoardProps> = ({ step, stepFrame, frame }) => {
  const appear = appearer(step, stepFrame);
  const hot = appear(0, 6, 16);
  const mouse = appear(1, 0, 16);
  const bird = appear(2, 0, 16);
  const fly = appear(3, 0, 22);
  const sprout = appear(3, 24, 26);
  const wobble = Math.sin(frame * 0.5) * 3;

  return (
    <g>
      <rect x="20" y="60" width="920" height="285" rx="24" fill="#FFF8E7" stroke={INK} strokeWidth="5" />
      <path d={`M20 ${GROUND_Y} H940 V321 Q940 345 916 345 H44 Q20 345 20 321 Z`} fill="#B9DE8F" stroke={INK} strokeWidth="5" />

      {/* Bước 0: quả ớt và những làn "cay". */}
      <Chili x={140} y={180} s={1.15} rot={-12} />
      {[0, 1, 2].map((i) => (
        <path
          key={i}
          d={`M${195 + i * 18} ${150 - i * 12} q10 -14 0 -26 q-10 -12 0 -26`}
          fill="none"
          stroke="#F28C38"
          strokeWidth="5"
          strokeLinecap="round"
          opacity={hot * (0.6 + 0.4 * Math.sin(frame * 0.3 + i))}
        />
      ))}
      <Label x={140} y={333} text="CHẤT CAY" opacity={hot} size={26} color="#B03030" />

      {/* Bước 1: chuột tránh ớt, hạt bị nhai nát. */}
      {step >= 1 ? (
        <g opacity={mouse}>
          <Mouse x={420} y={260 + (step === 1 ? wobble * 0.3 : 0)} />
          <Chili x={330} y={238} s={0.45} rot={-60} />
          <path d="M312 200 L350 238 M350 200 L312 238" stroke="#E5484D" strokeWidth="7" strokeLinecap="round" />
          <Seed x={300} y={290} broken />
          <Seed x={330} y={292} broken />
        </g>
      ) : null}
      <Label x={420} y={175} text="CAY QUÁ!" opacity={step >= 1 ? appear(1, 8) : 0} size={28} color="#E5484D" />
      <Label x={360} y={333} text="NHAI NÁT HẠT" opacity={step >= 1 ? appear(1, 18) : 0} size={22} />

      {/* Bước 2: chim ăn ớt, hạt trong bụng vẫn nguyên. */}
      {step >= 2 ? (
        <g opacity={bird}>
          <Bird x={650} y={190} wing={Math.sin(frame * 0.25)} />
          <Chili x={566} y={196} s={0.38} rot={-80} />
          <circle cx={652} cy={200} r="20" fill="#FFFFFF" stroke={INK} strokeWidth="3" strokeDasharray="5 4" />
          <Seed x={645} y={196} />
          <Seed x={659} y={206} />
        </g>
      ) : null}
      <Label x={650} y={115} text="KHÔNG THẤY CAY" opacity={step >= 2 ? appear(2, 8) : 0} size={26} color="#2C5FAD" />
      <Label x={630} y={278} text="HẠT CÒN NGUYÊN" opacity={step >= 2 ? appear(2, 18) : 0} size={22} />

      {/* Bước 3: hạt rơi chỗ mới, nảy mầm. */}
      {step >= 3 ? (
        <g>
          <Arrow x1={712} y1={170} x2={830} y2={150} color="#2C5FAD" width={5} p={fly} dashed />
          <g transform="translate(875 140) scale(-0.45 0.45)" opacity={fly}>
            <Bird x={0} y={0} wing={Math.sin(frame * 0.6)} />
          </g>
          <Seed x={860} y={170 + fly * 115} opacity={fly < 1 ? 1 : 0} />
          <g opacity={sprout} transform={`translate(860 ${GROUND_Y}) scale(${0.3 + sprout * 0.7})`}>
            <path d="M0 0 C0 -30 -4 -50 0 -70" fill="none" stroke="#3FA34D" strokeWidth="7" strokeLinecap="round" />
            <ellipse cx="-18" cy="-56" rx="18" ry="9" fill="#7DBE4E" stroke={INK} strokeWidth="3" transform="rotate(-25 -18 -56)" />
            <ellipse cx="18" cy="-66" rx="18" ry="9" fill="#7DBE4E" stroke={INK} strokeWidth="3" transform="rotate(25 18 -66)" />
          </g>
        </g>
      ) : null}
      <Label x={860} y={333} text="CÂY ỚT CON" opacity={step >= 3 ? sprout : 0} size={22} color="#1F5E2E" />

      <Caption captions={CAPTIONS} step={step} />
    </g>
  );
};
