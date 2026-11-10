/**
 * Sơ đồ "Vì sao táo cắt ra để lâu bị thâm?" (4 bước):
 *   0  Người lớn cắt táo: dao làm vỡ tế bào ở mặt cắt
 *   1  Enzim vốn nằm yên trong tế bào tràn ra
 *   2  Enzim gặp ôxy trong không khí, biến đổi các chất có sẵn trong táo
 *   3  Sinh ra chất màu nâu (giống sắt bị gỉ); táo thâm vẫn ăn được
 * Nguồn: UW–Madison News (R. Hartel), Tufts Health & Nutrition Letter.
 */
import React from "react";
import type { BoardProps } from "../../../../engine/stage/board.tsx";
import { appearer, Arrow, BLUE, Caption, INK, Label } from "./common.tsx";
import { Bubble, Knife, SafetyBadge, Tag } from "./w7-parts.tsx";

const CAPTIONS = ["Cắt táo: tế bào ở mặt cắt bị vỡ", "Enzim trong tế bào tràn ra", "Enzim gặp ôxy trong không khí", "Sinh ra chất màu nâu: táo thâm"];

const A = { x: 300, y: 205 };
const DOTS = [
  [-50, -40],
  [10, -60],
  [55, -20],
  [-60, 30],
  [40, 50],
  [-10, 70],
  [70, 25],
  [-30, -5],
];

export const AppleBoard: React.FC<BoardProps> = ({ step, stepFrame, frame }) => {
  const appear = appearer(step, stepFrame);
  const cut = appear(0, 2, 18);
  const spill = appear(1, 0, 16);
  const air = appear(2, 0, 24);
  const brown = appear(3, 0, 30);

  return (
    <g>
      {/* Nửa quả táo nhìn từ mặt cắt */}
      <path d={`M${A.x} ${A.y - 100} C${A.x + 60} ${A.y - 140} ${A.x + 140} ${A.y - 100} ${A.x + 135} ${A.y} C${A.x + 130} ${A.y + 90} ${A.x + 60} ${A.y + 130} ${A.x} ${A.y + 115} C${A.x - 60} ${A.y + 130} ${A.x - 130} ${A.y + 90} ${A.x - 135} ${A.y} C${A.x - 140} ${A.y - 100} ${A.x - 60} ${A.y - 140} ${A.x} ${A.y - 100} Z`} fill="#E5484D" stroke={INK} strokeWidth="6" />
      <path d={`M${A.x} ${A.y - 86} C${A.x + 52} ${A.y - 120} ${A.x + 124} ${A.y - 88} ${A.x + 120} ${A.y} C${A.x + 116} ${A.y + 78} ${A.x + 54} ${A.y + 112} ${A.x} ${A.y + 100} C${A.x - 54} ${A.y + 112} ${A.x - 116} ${A.y + 78} ${A.x - 120} ${A.y} C${A.x - 124} ${A.y - 88} ${A.x - 52} ${A.y - 120} ${A.x} ${A.y - 86} Z`} fill="#FFF3C8" />
      {/* Lớp nâu dần lên ở bước 3 */}
      <path
        d={`M${A.x} ${A.y - 86} C${A.x + 52} ${A.y - 120} ${A.x + 124} ${A.y - 88} ${A.x + 120} ${A.y} C${A.x + 116} ${A.y + 78} ${A.x + 54} ${A.y + 112} ${A.x} ${A.y + 100} C${A.x - 54} ${A.y + 112} ${A.x - 116} ${A.y + 78} ${A.x - 120} ${A.y} C${A.x - 124} ${A.y - 88} ${A.x - 52} ${A.y - 120} ${A.x} ${A.y - 86} Z`}
        fill="#A8662D"
        opacity={0.75 * brown}
      />
      <rect x={A.x - 4} y={A.y - 130} width={8} height={34} rx={4} fill="#6B4423" />
      {[-14, 14].map((dx) => (
        <ellipse key={dx} cx={A.x + dx} cy={A.y + 5} rx={7} ry={12} fill="#5B3A1E" />
      ))}

      {/* Bước 0: dao cắt, vết nứt tế bào trên mặt cắt */}
      {step === 0 ? (
        <g opacity={cut}>
          <Knife x={A.x + 150 - 30 * cut} y={A.y - 130} angle={20} s={0.9} />
        </g>
      ) : null}
      {cut > 0 && brown < 1
        ? DOTS.map(([dx, dy], i) => (
            <path key={i} d={`M${A.x + dx - 10} ${A.y + dy} l6 -6 l6 8 l6 -6`} fill="none" stroke="#C9A24A" strokeWidth="3" opacity={cut * (1 - brown)} />
          ))
        : null}
      <SafetyBadge x={720} y={300} text="NGƯỜI LỚN CẦM DAO" opacity={cut * (1 - spill)} />
      <Tag x={720} y={170} text="TẾ BÀO VỠ" size={26} opacity={cut * (1 - spill)} />

      {/* Bước 1: enzim (chấm xanh) tràn ra mặt cắt */}
      {spill > 0
        ? DOTS.map(([dx, dy], i) => (
            <circle key={i} cx={A.x + dx * (0.6 + 0.4 * spill)} cy={A.y + dy * (0.6 + 0.4 * spill)} r={8} fill="#3FA34D" stroke={INK} strokeWidth="2" opacity={spill * (1 - brown)} />
          ))
        : null}
      <Tag x={720} y={170} text="ENZIM TRÀN RA" size={26} color="#2E7D32" opacity={spill * (1 - air)} />

      {/* Bước 2: ôxy từ không khí bay tới */}
      {air > 0 && brown < 1 ? (
        <g opacity={1 - brown}>
          {[0, 1, 2, 3].map((i) => {
            const p = Math.min(1, air * 1.3 - i * 0.1);
            const k = Math.max(0, p);
            const x = 640 + (A.x - 60 + i * 40 - 640) * k;
            const y = 110 + i * 50 + (A.y - 60 + (i % 2) * 70 - (110 + i * 50)) * k + Math.sin(frame / 6 + i) * 5;
            return <Bubble key={i} x={x} y={y} r={20} fill="#BFE3F7" />;
          })}
          <Arrow x1={700} y1={240} x2={600} y2={240} color={BLUE} width={6} p={air} />
          <Tag x={740} y={170} text="ÔXY TRONG KHÔNG KHÍ" size={24} color={BLUE} />
        </g>
      ) : null}

      {/* Bước 3: màu nâu, giống sắt bị gỉ */}
      {brown > 0 ? (
        <g opacity={Math.min(1, brown * 2)}>
          <Tag x={720} y={120} text="CHẤT MÀU NÂU" size={28} color="#8A4B16" />
          <g transform="translate(650 230) rotate(-20)">
            <rect x={0} y={-8} width={110} height={16} rx={4} fill="#B5651D" stroke={INK} strokeWidth="4" />
            <rect x={-12} y={-18} width={14} height={36} rx={3} fill="#9C5A1C" stroke={INK} strokeWidth="4" />
          </g>
          <Label x={820} y={240} text="GIỐNG SẮT GỈ" size={22} />
          <Tag x={720} y={310} text="VẪN ĂN ĐƯỢC" size={24} color="#2E7D32" />
        </g>
      ) : null}

      <Caption captions={CAPTIONS} step={step} />
    </g>
  );
};
