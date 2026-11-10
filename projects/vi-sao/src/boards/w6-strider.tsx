/**
 * Sơ đồ "Vì sao con nhện nước đi được trên mặt nước?" (4 bước):
 *   0  Các hạt nước ở mặt nước níu chặt nhau thành một lớp màng căng
 *   1  Nhện nước là côn trùng sáu chân, chân dài mảnh dang rộng, chia đều sức nặng
 *   2  Lông tí hon trên chân giữ không khí, đẩy nước ra, không chọc thủng màng
 *   3  Đầu chân làm mặt nước lõm nhẹ; chèo đôi chân giữa như mái chèo mà lướt đi
 * Nguồn: MIT News (walking-on-water mystery, 2003), EarthDate (Walking on Water), National Wildlife Federation (Water Striders).
 */
import React from "react";
import type { BoardProps } from "../../../../engine/stage/board.tsx";
import { appearer, Arrow, Caption, INK, Label } from "./common.tsx";

const CAPTIONS = ["Hạt nước níu nhau ở mặt nước", "Nhẹ, chân dang rộng chia sức nặng", "Lông chân đẩy nước ra", "Chèo chân giữa, lướt đi!"];

const SURF = 230;
const BODY = { x: 470, y: 178 };
/** Đầu chân chạm nước: [x, khớp x, khớp y, là chân giữa?]. */
const LEGS: [number, number, number, boolean][] = [
  [600, 560, 160, false],
  [585, 545, 168, false],
  [720, 560, 120, true],
  [690, 540, 132, true],
  [270, 360, 130, false],
  [300, 380, 140, false],
];

export const StriderBoard: React.FC<BoardProps> = ({ step, stepFrame, frame }) => {
  const appear = appearer(step, stepFrame);
  const film = appear(0, 0, 24);
  const bug = appear(1, 0, 16);
  const zoom = appear(2, 0, 16);
  const row = appear(3, 0, 16);

  const dip = step >= 3 ? 12 * row : step >= 1 ? 6 * bug : 0;
  const stroke = step >= 3 ? Math.sin(frame * 0.18) : 0;
  const glide = step >= 3 ? Math.sin(frame * 0.05) * 16 : 0;
  const tips = LEGS.map(([x, kx, ky, mid]) => ({ x: x + glide + (mid ? stroke * 18 : 0), kx: kx + glide, ky, mid }));

  // Mặt nước: đường cong có chỗ lõm dưới mỗi đầu chân.
  const sorted = step >= 1 ? [...tips].sort((a, b) => a.x - b.x) : [];
  let surf = `M20 ${SURF}`;
  for (const t of sorted) surf += ` L${t.x - 22} ${SURF} Q${t.x} ${SURF + dip * 2} ${t.x + 22} ${SURF}`;
  surf += ` L940 ${SURF}`;

  return (
    <g>
      <rect x="20" y="60" width="920" height="285" rx="24" fill="#EAF7EE" stroke={INK} strokeWidth="5" />
      <path d={`${surf} V321 Q940 345 916 345 H44 Q20 345 20 321 Z`} fill="#5AA9E6" stroke="none" />
      <path d={surf} fill="none" stroke={INK} strokeWidth="5" />

      {/* Bước 0: hạt nước níu tay nhau ở mặt nước. */}
      <g opacity={film}>
        {Array.from({ length: 15 }, (_, i) => {
          const x = 60 + i * 60;
          return (
            <g key={i}>
              {i < 14 ? <line x1={x} y1={SURF + 14} x2={x + 60} y2={SURF + 14} stroke="#FFFFFF" strokeWidth="4" /> : null}
              <circle cx={x} cy={SURF + 14} r="9" fill="#2C5FAD" stroke="#FFFFFF" strokeWidth="3" />
            </g>
          );
        })}
      </g>
      <Label x={200} y={300} text="SỨC CĂNG MẶT NƯỚC" opacity={appear(0, 16)} size={26} color="#FFFFFF" />

      {/* Bước 1: nhện nước sáu chân. */}
      {step >= 1 ? (
        <g opacity={bug} transform={`translate(${glide} 0)`}>
          {tips.map((t, i) => (
            <polyline
              key={i}
              points={`${BODY.x + (t.kx - BODY.x - glide) * 0.3},${BODY.y} ${t.kx - glide},${t.ky} ${t.x - glide},${SURF + dip}`}
              fill="none"
              stroke="#4A3A2A"
              strokeWidth={t.mid ? 6 : 5}
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          ))}
          <ellipse cx={BODY.x} cy={BODY.y} rx="78" ry="16" fill="#6B5440" stroke={INK} strokeWidth="5" />
          <circle cx={BODY.x + 82} cy={BODY.y - 4} r="13" fill="#6B5440" stroke={INK} strokeWidth="4" />
          <circle cx={BODY.x + 88} cy={BODY.y - 8} r="4" fill="#FFFFFF" />
          <path d={`M${BODY.x + 92} ${BODY.y - 12} q20 -16 36 -12 M${BODY.x + 92} ${BODY.y - 8} q22 -6 36 0`} fill="none" stroke="#4A3A2A" strokeWidth="3" strokeLinecap="round" />
        </g>
      ) : null}
      <Label x={250} y={100} text="SÁU CHÂN DÀI" opacity={step >= 1 ? appear(1, 10) : 0} size={26} color="#4A3A2A" />

      {/* Bước 2: kính lúp: lông chân giữ bọt khí. */}
      {step >= 2 ? (
        <g opacity={zoom}>
          <line x1={tips[2].x} y1={SURF - 6} x2={780} y2={200} stroke={INK} strokeWidth="3" strokeDasharray="8 6" />
          <circle cx={830} cy={140} r={78} fill="#FFFFFF" stroke={INK} strokeWidth="5" />
          <rect x={770} y={150} width={120} height={60} fill="#5AA9E6" />
          <rect x={762} y={124} width={136} height={18} rx="9" fill="#6B5440" stroke={INK} strokeWidth="3" />
          {Array.from({ length: 9 }, (_, i) => (
            <g key={i}>
              <line x1={770 + i * 15} y1={142} x2={766 + i * 15} y2={152} stroke={INK} strokeWidth="2.5" />
              <circle cx={768 + i * 15} cy={148} r="5" fill="#FFFFFF" stroke="#2C5FAD" strokeWidth="2" />
            </g>
          ))}
          <line x1={770} y1={152} x2={890} y2={152} stroke={INK} strokeWidth="3" />
        </g>
      ) : null}
      <Label x={790} y={300} text="LÔNG ĐẨY NƯỚC" opacity={step >= 2 ? appear(2, 10) : 0} size={20} color="#FFFFFF" />

      {/* Bước 3: chèo chân giữa. */}
      {step >= 3 ? <Arrow x1={BODY.x - 40 + glide} y1={BODY.y - 40} x2={BODY.x + 60 + glide} y2={BODY.y - 40} color="#E5484D" width={6} p={row} /> : null}
      <Label x={490} y={300} text="CHÈO NHƯ MÁI CHÈO" opacity={step >= 3 ? row : 0} size={24} color="#FFFFFF" />

      <Caption captions={CAPTIONS} step={step} />
    </g>
  );
};
