/**
 * Sơ đồ "Vì sao ngôi sao lấp lánh?" (4 bước):
 *   0  Ánh sao đi rất xa rồi mới tới lớp không khí quanh Trái Đất
 *   1  Lớp không khí luôn chuyển động, có túi khí nóng, túi khí lạnh
 *   2  Túi khí bẻ cong ánh sao, lúc lệch bên này, lúc lệch bên kia
 *   3  Ánh sao tới mắt lúc nhiều lúc ít: trông như lấp lánh
 * Nguồn: NASA StarChild (Why do stars twinkle?), NASA Imagine the Universe (Ask an Astrophysicist).
 */
import React from "react";
import type { BoardProps } from "../../../../engine/stage/board.tsx";
import { appearer, Caption, clamp01, Eye, INK, Label } from "./common.tsx";

const CAPTIONS = ["Ánh sao đi rất rất xa", "Không khí luôn chuyển động", "Túi khí bẻ cong ánh sao", "Lúc sáng, lúc mờ: lấp lánh!"];

const STAR = { x: 80, y: 190 };
const AIR = { x0: 470, x1: 730 };
const EYE = { x: 880, y: 190 };

/** Ngôi sao năm cánh. */
export const StarShape: React.FC<{ x: number; y: number; r: number; fill?: string; opacity?: number }> = ({ x, y, r, fill = "#FFD93D", opacity = 1 }) => {
  const pts = Array.from({ length: 10 }, (_, i) => {
    const a = -Math.PI / 2 + (i * Math.PI) / 5;
    const rr = i % 2 === 0 ? r : r * 0.45;
    return `${x + Math.cos(a) * rr},${y + Math.sin(a) * rr}`;
  }).join(" ");
  return <polygon points={pts} fill={fill} stroke={INK} strokeWidth="4" strokeLinejoin="round" opacity={opacity} />;
};

/** Túi khí: [x, y gốc, bán kính, nóng?]. */
const POCKETS: [number, number, number, boolean][] = [
  [520, 135, 30, true],
  [600, 170, 40, false],
  [680, 140, 28, true],
  [540, 250, 36, false],
  [660, 270, 34, true],
  [690, 205, 24, false],
];

export const TwinkleBoard: React.FC<BoardProps> = ({ step, stepFrame, frame }) => {
  const appear = appearer(step, stepFrame);
  const travel = appear(0, 4, 40);
  const air = appear(1, 0, 18);
  const bend = appear(2, 0, 14);
  const eye = appear(3, 0, 14);

  // Ánh sao bị lệch lên xuống theo thời gian khi đi qua lớp khí (bước 2 trở đi).
  const wobble = Math.sin(frame * 0.35) * 34 * bend + Math.sin(frame * 0.9) * 10 * bend;
  const midY = STAR.y + wobble;
  const beamEnd = STAR.x + 40 + (AIR.x0 - STAR.x - 40) * travel;
  // Độ sáng sao thấy ở mắt: lúc nhiều lúc ít.
  const seen = 0.55 + 0.45 * Math.abs(Math.cos(frame * 0.35));

  return (
    <g>
      {/* Vũ trụ tối bên trái */}
      <rect x="0" y="60" width={AIR.x0} height="290" rx="20" fill="#14213D" />
      {/* Lớp không khí */}
      <rect x={AIR.x0} y="60" width={AIR.x1 - AIR.x0} height="290" fill="#CDE8F7" opacity={0.35 + air * 0.45} />
      <Label x={(AIR.x0 + AIR.x1) / 2} y={88} text="KHÔNG KHÍ" size={22} color="#2C5FAD" opacity={0.4 + air * 0.6} />

      {/* Túi khí trôi lên xuống */}
      {POCKETS.map(([x, y, r, hot], i) => {
        const dy = Math.sin(frame * 0.06 + i * 1.7) * 18;
        const p = clamp01(air * 1.6 - i * 0.12);
        return p > 0 ? (
          <circle key={i} cx={x} cy={y + dy} r={r * p} fill={hot ? "#FFB38A" : "#8EC5F0"} stroke={INK} strokeWidth="3" opacity="0.75" />
        ) : null;
      })}
      <Label x={235} y={300} color="#FFFFFF" text="TÚI KHÍ NÓNG, LẠNH" opacity={step === 1 ? air : 0} size={22} />

      {/* Ngôi sao và quãng đường dài */}
      <StarShape x={STAR.x} y={STAR.y} r={36} />
      <line x1={STAR.x + 40} y1={STAR.y} x2={beamEnd} y2={STAR.y} stroke="#FFD93D" strokeWidth="7" strokeDasharray="16 10" opacity={travel > 0 ? 1 : 0} />
      <Label x={270} y={250} text="RẤT RẤT XA" opacity={step === 0 ? travel : 0} size={26} color="#FFD93D" />

      {/* Ánh sao bị bẻ cong qua lớp khí */}
      {bend > 0 ? (
        <path
          d={`M${AIR.x0} ${STAR.y} Q${(AIR.x0 + AIR.x1) / 2} ${midY} ${AIR.x1} ${STAR.y + wobble * 0.6} L${EYE.x - 50} ${EYE.y + wobble * 0.25}`}
          fill="none"
          stroke="#F2B21B"
          strokeWidth="7"
          strokeLinecap="round"
          opacity={bend}
        />
      ) : null}
      <Label x={235} y={300} color="#FFFFFF" text="LỆCH BÊN NÀY, BÊN KIA" opacity={step === 2 ? bend : 0} size={22} />

      {/* Mắt và ngôi sao lấp lánh nó thấy */}
      <g opacity={step >= 2 ? Math.max(bend, eye) : 0}>
        <Eye x={EYE.x} y={EYE.y + 40} s={1.1} />
      </g>
      <g opacity={eye}>
        <StarShape x={EYE.x} y={EYE.y - 60} r={20 + 16 * seen} opacity={seen} />
        <Label x={EYE.x - 20} y={330} text="LẤP LÁNH!" size={28} color="#B5892A" />
      </g>

      <Caption captions={CAPTIONS} step={step} />
    </g>
  );
};
