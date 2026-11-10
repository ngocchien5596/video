/**
 * Sơ đồ "Vì sao mình hắt xì hơi?" (4 bước):
 *   0  Bụi, phấn hoa lọt vào mũi; tế bào thần kinh trong mũi phát hiện
 *   1  Tín hiệu báo lên não, não tự ra lệnh
 *   2  Cơ bụng, cổ họng siết mạnh, đẩy hơi từ phổi ra
 *   3  Hắt xì! Hơi phụt ra qua mũi và miệng, cuốn bụi ra ngoài; nhớ che miệng
 * Nguồn: Ask Dr. Universe (WSU), Cleveland Clinic.
 */
import React from "react";
import type { BoardProps } from "../../../../engine/stage/board.tsx";
import { appearer, Arrow, Caption, INK, Label } from "./common.tsx";
import { HeadSide, Tag, Zigzag } from "./w4-parts.tsx";

const CAPTIONS = ["Bụi, phấn hoa lọt vào mũi", "Thần kinh trong mũi báo lên não", "Cơ siết mạnh, đẩy hơi từ phổi ra", "Hắt xì! Bụi bị thổi bay ra ngoài"];

const H = { x: 250, y: 165 };
const NOSE = { x: 372, y: 190 };
const POLLEN = [
  { x: 820, y: 120 },
  { x: 760, y: 230 },
  { x: 880, y: 200 },
  { x: 700, y: 150 },
  { x: 900, y: 280 },
];

const Pollen: React.FC<{ x: number; y: number }> = ({ x, y }) => (
  <g transform={`translate(${x} ${y})`}>
    <circle r={11} fill="#FFD93D" stroke={INK} strokeWidth="3" />
    <circle cx={-3} cy={-3} r={3} fill="#F2B21B" />
  </g>
);

export const SneezeBoard: React.FC<BoardProps> = ({ step, stepFrame }) => {
  const appear = appearer(step, stepFrame);
  const drift = appear(0, 0, 45);
  const signal = appear(1, 0, 18);
  const push = appear(2, 0, 18);
  const boom = appear(3, 0, 12);
  const squeeze = step === 2 ? 1 - 0.18 * Math.abs(Math.sin(stepFrame / 6)) : 1;

  return (
    <g>
      {/* Thân (áo) và phổi bên trong */}
      <rect x={140} y={290} width={220} height={90} rx={44} fill="#FF6B35" stroke={INK} strokeWidth="6" />
      {[212, 288].map((x) => (
        <g key={x} transform={`translate(${x} 326) scale(1 ${squeeze}) translate(${-x} -326)`}>
          <ellipse cx={x} cy={326} rx={30} ry={22} fill="#F7B2C4" stroke={INK} strokeWidth="4" />
        </g>
      ))}
      <HeadSide cx={H.x} cy={H.y} brainGlow={step === 1 ? signal * (0.5 + 0.5 * Math.sin(stepFrame / 3)) : 0} />
      <Label x={90} y={335} text="PHỔI" size={22} opacity={push * (1 - boom)} />

      {/* Bước 0: hạt bụi, phấn hoa bay vào mũi */}
      {step <= 2
        ? POLLEN.map((p, i) => {
            const t = Math.min(1, drift * 1.2 - i * 0.04);
            const k = Math.max(0, t);
            return <Pollen key={i} x={p.x + (NOSE.x + 24 + i * 16 - p.x) * k} y={p.y + (NOSE.y - 24 + (i % 3) * 22 - p.y) * k} />;
          })
        : null}
      <Tag x={690} y={90} text="BỤI, PHẤN HOA" size={24} opacity={drift * (1 - signal)} />

      {/* Bước 1: tín hiệu từ mũi lên não */}
      <Zigzag x1={NOSE.x - 10} y1={NOSE.y - 4} x2={H.x + 20} y2={H.y - 55} p={signal} teeth={8} />
      <Tag x={660} y={150} text="BÁO LÊN NÃO!" size={26} opacity={signal * (1 - boom)} />

      {/* Bước 2: cơ siết, hơi từ phổi đi lên */}
      <Arrow x1={H.x} y1={300} x2={H.x + 70} y2={H.y + 50} color="#3D7BD9" width={8} p={push} />
      <Tag x={660} y={250} text="CƠ SIẾT, ĐẨY HƠI" size={24} opacity={push * (1 - boom)} />

      {/* Bước 3: HẮT XÌ! */}
      {boom > 0 ? (
        <g>
          {[-40, -15, 10, 35, 60].map((a, i) => {
            const rad = (a * Math.PI) / 180;
            return (
              <line
                key={a}
                x1={NOSE.x + 20}
                y1={NOSE.y + 12}
                x2={NOSE.x + 20 + Math.cos(rad) * 190 * boom}
                y2={NOSE.y + 12 + Math.sin(rad) * 190 * boom}
                stroke="#9CC9F0"
                strokeWidth={10 - i}
                strokeLinecap="round"
              />
            );
          })}
          {POLLEN.map((p, i) => (
            <Pollen key={i} x={NOSE.x + 60 + (p.x - NOSE.x - 60) * boom * 1.05} y={NOSE.y + (p.y - NOSE.y) * boom} />
          ))}
          <Label x={690} y={120} text="HẮT XÌ!" size={56} opacity={boom} color="#C0392B" />
          <Tag x={690} y={315} text="NHỚ CHE MIỆNG NHÉ!" size={24} opacity={boom} />
        </g>
      ) : null}

      <Caption captions={CAPTIONS} step={step} />
    </g>
  );
};
