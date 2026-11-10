/**
 * Sơ đồ "Vì sao chim hồng hạc lại màu hồng?" (4 bước):
 *   0  Hồng hạc ăn tảo và tôm tép nhỏ dưới nước
 *   1  Tảo, tôm tép có nhiều sắc tố, giống chất màu trong cà rốt
 *   2  Ăn vào, sắc tố đi vào bộ lông, lông ngả hồng
 *   3  Bố mẹ mớm sữa nuôi con: màu bị rút bớt, lông nhạt hẳn, có khi gần như trắng
 * Nguồn: Smithsonian's National Zoo (American flamingo), San Diego Zoo (Flamingo).
 */
import React from "react";
import type { BoardProps } from "../../../../engine/stage/board.tsx";
import { appearer, Arrow, Caption, INK, Label } from "./common.tsx";

const CAPTIONS = ["Hồng hạc ăn tảo và tôm tép nhỏ", "Trong đó có sắc tố như cà rốt", "Sắc tố đi vào bộ lông", "Mớm sữa nuôi con: lông bố mẹ nhạt đi"];

const PALE = "#EDE6E2";
const PINK = "#F47FA4";

/** Trộn hai màu hex theo tỉ lệ t (0..1). */
const mix = (a: string, b: string, t: number) => {
  const p = (h: string, i: number) => parseInt(h.slice(1 + i * 2, 3 + i * 2), 16);
  const c = [0, 1, 2].map((i) => Math.round(p(a, i) + (p(b, i) - p(a, i)) * t));
  return `rgb(${c[0]},${c[1]},${c[2]})`;
};

/** Chim hồng hạc đứng, chân chạm đất ở (x, y). */
const Flamingo: React.FC<{ x: number; y: number; s?: number; color: string }> = ({ x, y, s = 1, color }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} strokeLinecap="round" strokeLinejoin="round">
    <line x1="-6" y1="-96" x2="-6" y2="0" stroke={INK} strokeWidth="5" />
    <path d="M10 -96 L16 -52 L-2 -50" fill="none" stroke={INK} strokeWidth="5" />
    <path d="M32 -128 C78 -168 -16 -196 22 -236" fill="none" stroke={INK} strokeWidth="17" />
    <path d="M32 -128 C78 -168 -16 -196 22 -236" fill="none" stroke={color} strokeWidth="10" />
    <ellipse cx="0" cy="-122" rx="50" ry="30" fill={color} stroke={INK} strokeWidth="5" />
    <path d="M-40 -126 Q-6 -150 30 -122 Q-4 -112 -40 -126 Z" fill={INK} opacity="0.18" />
    <circle cx="26" cy="-238" r="14" fill={color} stroke={INK} strokeWidth="4" />
    <circle cx="28" cy="-241" r="3" fill={INK} />
    <path d="M36 -244 L60 -236 L50 -214 L44 -230 Z" fill="#FFFFFF" stroke={INK} strokeWidth="3" />
    <path d="M54 -226 L50 -214 L45 -224 Z" fill={INK} />
  </g>
);

const Shrimp: React.FC<{ x: number; y: number; dot: number }> = ({ x, y, dot }) => (
  <g transform={`translate(${x} ${y})`}>
    <path d="M-14 4 A15 13 0 0 1 14 4" fill="none" stroke={INK} strokeWidth="12" strokeLinecap="round" />
    <path d="M-14 4 A15 13 0 0 1 14 4" fill="none" stroke={mix("#E9DDD3", "#F28C38", dot)} strokeWidth="7" strokeLinecap="round" />
    <path d="M14 4 L22 12 M14 4 L24 2" stroke={INK} strokeWidth="3" />
    <circle cx="-12" cy="-2" r="2.5" fill={INK} />
  </g>
);

const Algae: React.FC<{ x: number; y: number; dot: number }> = ({ x, y, dot }) => (
  <g transform={`translate(${x} ${y})`}>
    <ellipse rx="16" ry="11" fill="#7CC26A" stroke={INK} strokeWidth="3" />
    <circle cx="-5" cy="-1" r="4" fill="#F28C38" opacity={dot} />
    <circle cx="6" cy="2" r="3.5" fill="#E5484D" opacity={dot} />
  </g>
);

const Carrot: React.FC<{ x: number; y: number }> = ({ x, y }) => (
  <g transform={`translate(${x} ${y}) rotate(-30)`}>
    <path d="M-10 -40 L10 -40 L0 30 Z" fill="#F28C38" stroke={INK} strokeWidth="4" strokeLinejoin="round" />
    <path d="M0 -40 L-10 -62 M0 -40 L0 -66 M0 -40 L10 -62" stroke="#3FA34D" strokeWidth="5" strokeLinecap="round" />
  </g>
);

/** Hồng hạc con: lông tơ xám, đứng ở (x, y). */
const Chick: React.FC<{ x: number; y: number }> = ({ x, y }) => (
  <g transform={`translate(${x} ${y})`} stroke={INK} strokeLinecap="round">
    <line x1="-6" y1="-20" x2="-6" y2="0" strokeWidth="4" />
    <line x1="6" y1="-20" x2="6" y2="0" strokeWidth="4" />
    <ellipse cx="0" cy="-34" rx="22" ry="17" fill="#C9C4C0" strokeWidth="4" />
    <circle cx="-14" cy="-58" r="12" fill="#C9C4C0" strokeWidth="4" />
    <circle cx="-17" cy="-60" r="2.5" fill={INK} stroke="none" />
    <path d="M-26 -58 L-36 -54 L-26 -52 Z" fill="#E9A0B4" strokeWidth="2" />
  </g>
);

const FOOD = [
  { kind: "a", x: 400, y: 300 },
  { kind: "s", x: 450, y: 282 },
  { kind: "a", x: 505, y: 306 },
  { kind: "s", x: 560, y: 290 },
  { kind: "a", x: 615, y: 304 },
];

export const W2FlamingoBoard: React.FC<BoardProps> = ({ step, stepFrame, frame }) => {
  const appear = appearer(step, stepFrame);
  const food = appear(0, 4, 16);
  const dots = appear(1, 0, 20);
  const pink = appear(2, 10, 30);
  const feed = appear(3, 0, 18);
  const fade = appear(3, 16, 40);
  const bob = Math.sin(frame * 0.12) * 3;

  return (
    <g>
      {/* Mặt nước nông */}
      <rect x="340" y="262" width="320" height="76" rx="22" fill="#BFE3F7" stroke={INK} strokeWidth="5" />
      <g opacity={food}>
        {FOOD.map((f, i) =>
          f.kind === "a" ? <Algae key={i} x={f.x} y={f.y + bob} dot={dots} /> : <Shrimp key={i} x={f.x} y={f.y - bob} dot={dots} />,
        )}
      </g>
      <Label x={430} y={250} text="TẢO" opacity={food} size={22} color="#2E7D32" />
      <Label x={580} y={250} text="TÔM TÉP" opacity={food} size={22} color="#9A4A12" />

      {/* Bước 1: sắc tố, giống chất màu cà rốt */}
      <g opacity={dots}>
        <Carrot x={470} y={128} />
        <Label x={590} y={134} text="SẮC TỐ" size={28} color="#D9531E" />
        <Label x={470} y={196} text="GIỐNG CÀ RỐT" size={20} />
      </g>

      {/* Hồng hạc chính: ngả hồng ở bước 2 */}
      <Flamingo x={150} y={332} color={mix(PALE, PINK, pink)} />
      <Arrow x1={360} y1={280} x2={205} y2={210} color="#F28C38" width={7} p={appear(2, 0, 16)} />
      <Label x={325} y={112} text="VÀO BỘ LÔNG" opacity={pink} size={24} color="#C2185B" />

      {/* Bước 3: bố mẹ mớm sữa nuôi con, lông bố mẹ nhạt dần gần như trắng */}
      <g opacity={feed}>
        <Flamingo x={790} y={332} s={0.72} color={mix(PINK, "#FBF3F5", fade)} />
        <Chick x={880} y={322} />
        <Label x={880} y={84} text="MỚM SỮA" size={24} color="#C2185B" />
        <Label x={880} y={114} text="NUÔI CON" size={24} color="#C2185B" />
        <Label x={690} y={200} text="LÔNG NHẠT ĐI" opacity={fade} size={22} />
      </g>

      <Caption captions={CAPTIONS} step={step} />
    </g>
  );
};
