/**
 * Sơ đồ "Vì sao có sao băng vụt qua bầu trời?" (4 bước):
 *   0  Ngoài vũ trụ có những mẩu đá nhỏ, có mẩu bé như hạt bụi
 *   1  Một mẩu đá lao thật nhanh vào lớp không khí quanh Trái Đất
 *   2  Không khí cản lại, mẩu đá nóng rực; vệt sáng là không khí nóng phát sáng
 *   3  Phần lớn mẩu đá cháy hết trên trời, không kịp rơi xuống đất
 * Nguồn: NASA Space Place (What Is a Meteor Shower?), NASA Science (Meteors and Meteorites – Facts),
 * Chandra X-ray Center (Q&A falling stars), Caltech IPAC Cool Cosmos (What is a shooting star?).
 */
import React from "react";
import type { BoardProps } from "../../../../engine/stage/board.tsx";
import { appearer, Arrow, Caption, INK, Label } from "./common.tsx";

const CAPTIONS = ["Mẩu đá vũ trụ bé xíu", "Lao vào lớp không khí", "Nóng rực, thành vệt sáng", "Cháy hết trên trời!"];

const SPACE_BOTTOM = 225;
const AIR_BOTTOM = 300;

/** Mẩu đá: đa giác méo. */
const Rock: React.FC<{ x: number; y: number; r: number; fill?: string; opacity?: number }> = ({ x, y, r, fill = "#8C8C96", opacity = 1 }) => {
  const k = [1, 0.8, 1.05, 0.75, 0.95, 0.85, 1.1];
  const pts = k
    .map((m, i) => {
      const a = (i * 2 * Math.PI) / k.length;
      return `${x + Math.cos(a) * r * m},${y + Math.sin(a) * r * m}`;
    })
    .join(" ");
  return <polygon points={pts} fill={fill} stroke={INK} strokeWidth={r > 8 ? 4 : 2} strokeLinejoin="round" opacity={opacity} />;
};

const SMALL: [number, number, number][] = [
  [110, 110, 9],
  [190, 175, 5],
  [330, 95, 7],
  [420, 165, 4],
  [520, 105, 10],
  [640, 150, 5],
  [760, 95, 8],
  [860, 160, 4],
  [70, 190, 3],
  [300, 200, 3],
];

const P0 = { x: 230, y: 120 };
const P1 = { x: 520, y: 240 };
const P2 = { x: 620, y: 262 };
const P3 = { x: 720, y: 284 };
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export const MeteorBoard: React.FC<BoardProps> = ({ step, stepFrame, frame }) => {
  const appear = appearer(step, stepFrame);
  const dash = appear(1, 0, 26);
  const heat = appear(2, 0, 30);
  const burn = appear(3, 0, 40);

  let x = P0.x;
  let y = P0.y;
  if (step === 1) {
    x = lerp(P0.x, P1.x, dash);
    y = lerp(P0.y, P1.y, dash);
  } else if (step === 2) {
    x = lerp(P1.x, P2.x, heat);
    y = lerp(P1.y, P2.y, heat);
  } else if (step >= 3) {
    x = lerp(P2.x, P3.x, burn);
    y = lerp(P2.y, P3.y, burn);
  }
  const r = step >= 3 ? 20 * (1 - burn) : 20;
  // Hướng bay để vẽ vệt sáng phía sau.
  const dx = P1.x - P0.x;
  const dy = P1.y - P0.y;
  const len = Math.hypot(dx, dy);
  const ux = dx / len;
  const uy = dy / len;
  const streak = step === 2 ? 60 + heat * 200 : step >= 3 ? 260 * (1 - burn * 0.85) : 0;
  const glow = step === 2 ? heat : step >= 3 ? 1 - burn : 0;
  const flicker = 1 + Math.sin(frame * 0.6) * 0.06;

  return (
    <g>
      {/* Vũ trụ tối, lớp không khí xanh, mặt đất xanh lá. */}
      <rect x="20" y="60" width="920" height={SPACE_BOTTOM - 60} fill="#1B2440" stroke={INK} strokeWidth="5" />
      <rect x="20" y={SPACE_BOTTOM} width="920" height={AIR_BOTTOM - SPACE_BOTTOM} fill="#8FC9F0" stroke={INK} strokeWidth="5" />
      <rect x="20" y={AIR_BOTTOM} width="920" height={345 - AIR_BOTTOM} fill="#9BD37A" stroke={INK} strokeWidth="5" />

      {SMALL.map(([sx, sy, sr], i) => (
        <Rock key={i} x={sx + Math.sin(frame * 0.03 + i) * 3} y={sy} r={sr * 1.6} opacity={step === 0 ? appear(0, i * 2, 12) : 0.7} />
      ))}

      {/* Vệt sáng: không khí nóng phát sáng sau mẩu đá. */}
      {streak > 0 ? (
        <g opacity={glow}>
          <line x1={x} y1={y} x2={x - ux * streak} y2={y - uy * streak} stroke="#FFD93D" strokeWidth={16} strokeLinecap="round" opacity="0.55" />
          <line x1={x} y1={y} x2={x - ux * streak * 0.8} y2={y - uy * streak * 0.8} stroke="#FFFFFF" strokeWidth={6} strokeLinecap="round" />
          <circle cx={x} cy={y} r={30 * flicker} fill="#FFB347" opacity="0.6" />
        </g>
      ) : null}
      {step >= 3 && burn > 0.6
        ? [0, 1, 2, 3, 4].map((i) => (
            <circle key={i} cx={P3.x + Math.cos(i * 1.3) * 26 * burn} cy={P3.y - 8 + Math.sin(i * 1.3) * 14 * burn} r="4" fill="#FFD93D" opacity={(1 - burn) * 2.5} />
          ))
        : null}
      {r > 0.5 ? <Rock x={x} y={y} r={r} fill={step >= 2 ? "#F28C38" : "#8C8C96"} /> : null}

      <Label x={230} y={95} text="ĐÁ VŨ TRỤ" opacity={step === 0 ? appear(0, 4) : 0} size={26} color="#FFD93D" />
      <Label x={640} y={200} text="BÉ NHƯ HẠT BỤI" opacity={step === 0 ? appear(0, 14) : 0} size={24} color="#FFFFFF" />

      <Label x={170} y={272} text="LỚP KHÔNG KHÍ" opacity={step >= 1 ? appear(1, 0) : 0} size={26} color="#1B2440" />
      {step === 1 ? <Arrow x1={300} y1={95} x2={430} y2={150} color="#FFD93D" width={6} p={dash} /> : null}
      <Label x={330} y={185} text="RẤT NHANH" opacity={step === 1 ? dash : 0} size={26} color="#FFD93D" />

      <Label x={800} y={110} text="KHÔNG KHÍ NÓNG" opacity={step === 2 ? heat : 0} size={26} color="#FFD93D" />
      <Label x={800} y={145} text="PHÁT SÁNG" opacity={step === 2 ? heat : 0} size={26} color="#FFD93D" />

      <Label x={480} y={333} text="CHÁY HẾT, KHÔNG RƠI XUỐNG ĐẤT" opacity={step >= 3 ? appear(3, 20) : 0} size={26} color="#1F5E2E" />

      <Caption captions={CAPTIONS} step={step} />
    </g>
  );
};
