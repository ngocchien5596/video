/**
 * Sơ đồ "Vì sao gân xanh trên tay màu xanh mà máu lại đỏ?" (4 bước):
 *   0  Ánh sáng nhiều màu chiếu vào da
 *   1  Ánh đỏ chui sâu, bị da và lớp mỡ hắt tản đi
 *   2  Ánh xanh vào nông, dội ngược ra tới mắt
 *   3  Gân trông xanh giữa làn da sáng, máu bên trong vẫn đỏ sẫm
 * Nguồn: Ask A Biologist (ASU), West Texas A&M (C. Baird).
 */
import React from "react";
import type { BoardProps } from "../../../../engine/stage/board.tsx";
import { appearer, Arrow, BLUE, Caption, Eye, INK, Label, RAINBOW, Sun } from "./common.tsx";
import { RED, SKIN, Tag } from "./w4-parts.tsx";

const CAPTIONS = ["Ánh sáng có đủ các màu", "Ánh đỏ chui sâu, tản đi mất", "Ánh xanh vào nông, dội ra mắt", "Gân trông xanh, máu vẫn đỏ"];

const SKIN_TOP = 150;
const VEIN = { x: 600, y: 215 };
const IN = { x: 420, y: SKIN_TOP };

export const VeinsBoard: React.FC<BoardProps> = ({ step, stepFrame }) => {
  const appear = appearer(step, stepFrame);
  const light = appear(0, 2, 18);
  const red = appear(1, 0, 20);
  const blue = appear(2, 0, 20);
  const look = appear(3, 0, 18);

  return (
    <g>
      {/* Lớp da và lớp mỡ (cắt ngang) */}
      <rect x={0} y={SKIN_TOP} width={960} height={110} fill={SKIN} />
      <rect x={0} y={SKIN_TOP + 110} width={960} height={90} fill="#FCE9C8" />
      <line x1={0} y1={SKIN_TOP} x2={960} y2={SKIN_TOP} stroke={INK} strokeWidth="6" />
      <line x1={0} y1={SKIN_TOP + 110} x2={960} y2={SKIN_TOP + 110} stroke={INK} strokeWidth="3" strokeDasharray="10 8" />
      <Label x={70} y={200} text="DA" size={26} />
      <Label x={80} y={312} text="LỚP MỠ" size={22} />

      {/* Gân: ống chứa máu đỏ sẫm */}
      <ellipse cx={VEIN.x} cy={VEIN.y} rx={95} ry={26} fill="#8B1E2B" stroke={INK} strokeWidth="5" />
      <Label x={VEIN.x} y={VEIN.y + 8} text="GÂN" size={22} color="#FFFFFF" />

      {/* Bước 0: mặt trời chiếu một chùm nhiều màu xuống da */}
      <Sun x={110} y={80} r={28} />
      {[RAINBOW[0], RAINBOW[1], RAINBOW[2], RAINBOW[3], RAINBOW[4]].map((c, i) => (
        <Arrow key={c} x1={136 + i * 2} y1={104 + i * 9} x2={IN.x - 60 + i * 22} y2={IN.y - 6} color={c} width={7} p={light} />
      ))}
      <Label x={620} y={115} text="ĐỦ CÁC MÀU" opacity={light * (1 - red)} size={26} />

      {/* Bước 1: ánh đỏ đi sâu rồi tản ra */}
      {red > 0 ? (
        <g>
          <Arrow x1={IN.x} y1={IN.y + 4} x2={IN.x + 40} y2={300} color={RED} width={7} p={red} />
          {[-1, 0, 1].map((k) => (
            <Arrow key={k} x1={IN.x + 40} y1={300} x2={IN.x + 40 + k * 60} y2={335} color={RED} width={4} p={Math.max(0, red * 2 - 1)} />
          ))}
          <Tag x={300} y={240} text="ĐỎ: VÀO SÂU, TẢN ĐI" size={20} opacity={red * (1 - look)} color={RED} />
        </g>
      ) : null}

      {/* Bước 2: ánh xanh vào nông rồi dội ngược ra mắt */}
      {blue > 0 ? (
        <g>
          <Arrow x1={IN.x + 20} y1={IN.y + 2} x2={VEIN.x - 40} y2={VEIN.y - 30} color={BLUE} width={7} p={Math.min(1, blue * 2)} />
          <Arrow x1={VEIN.x - 40} y1={VEIN.y - 30} x2={820} y2={110} color={BLUE} width={7} p={Math.max(0, blue * 2 - 1)} />
          <Tag x={720} y={300} text="XANH: VÀO NÔNG, DỘI RA" size={20} opacity={blue * (1 - look)} color={BLUE} />
        </g>
      ) : null}
      <Eye x={865} y={90} s={0.9} />

      {/* Bước 3: trên mặt da, chỗ có gân trông xanh; trong gân máu vẫn đỏ sẫm */}
      {look > 0 ? (
        <g opacity={look}>
          <rect x={VEIN.x - 95} y={SKIN_TOP - 3} width={190} height={14} rx={7} fill="#5B7FC4" stroke={INK} strokeWidth="3" />
          <Tag x={VEIN.x - 10} y={110} text="TRÔNG XANH" size={24} color={BLUE} />
          <Tag x={VEIN.x + 70} y={300} text="MÁU VẪN ĐỎ SẪM" size={24} color="#8B1E2B" />
        </g>
      ) : null}

      <Caption captions={CAPTIONS} step={step} />
    </g>
  );
};
