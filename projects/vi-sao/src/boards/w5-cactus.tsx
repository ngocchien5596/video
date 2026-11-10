/**
 * Sơ đồ "Vì sao xương rồng có gai?" (4 bước):
 *   0  Lá to làm cây mất nhiều nước, mà sa mạc rất khô
 *   1  Lá xương rồng biến thành gai rất nhỏ, ít mất nước
 *   2  Gai che bóng, chắn gió khô cho thân, giữ cây khỏi bị con vật ăn
 *   3  Thân xanh làm thay việc của lá: làm thức ăn
 * Nguồn: Duke Gardens (Five Ways Plants Adapt To Heat), National Park Service (Cacti / Desert Succulents – Arches).
 */
import React from "react";
import type { BoardProps } from "../../../../engine/stage/board.tsx";
import { appearer, Arrow, Caption, Drop, INK, Label, Sun } from "./common.tsx";

const CAPTIONS = ["Lá to làm cây mất nhiều nước", "Lá xương rồng biến thành gai", "Gai che bóng, chắn gió khô", "Thân xanh làm thức ăn thay lá"];

const GROUND = 310;
const C = { x: 560 };

const Cactus: React.FC<{ spines: number }> = ({ spines }) => (
  <g stroke={INK} strokeLinejoin="round">
    <path d={`M${C.x - 40} ${GROUND} L${C.x - 40} 110 Q${C.x} 70 ${C.x + 40} 110 L${C.x + 40} ${GROUND} Z`} fill="#4E9F3D" strokeWidth="6" />
    <path d={`M${C.x - 40} 220 L${C.x - 80} 220 Q${C.x - 104} 220 ${C.x - 104} 196 L${C.x - 104} 150 Q${C.x - 88} 128 ${C.x - 72} 150 L${C.x - 72} 190 L${C.x - 40} 190`} fill="#4E9F3D" strokeWidth="6" />
    <path d={`M${C.x + 40} 250 L${C.x + 80} 250 Q${C.x + 104} 250 ${C.x + 104} 226 L${C.x + 104} 170 Q${C.x + 88} 148 ${C.x + 72} 170 L${C.x + 72} 220 L${C.x + 40} 220`} fill="#4E9F3D" strokeWidth="6" />
    <path d={`M${C.x - 14} 100 L${C.x - 14} ${GROUND} M${C.x + 14} 100 L${C.x + 14} ${GROUND}`} stroke="#3B7D2E" strokeWidth="4" />
    {/* Gai */}
    <g opacity={spines} stroke={INK} strokeWidth="3" strokeLinecap="round">
      {[130, 170, 210, 250, 290].map((y) =>
        [-40, 40].map((dx) => <line key={`${y}${dx}`} x1={C.x + dx} y1={y} x2={C.x + dx + (dx < 0 ? -16 : 16)} y2={y - 8} />),
      )}
      {[160, 200].map((y) => (
        <line key={`l${y}`} x1={C.x - 104} y1={y} x2={C.x - 120} y2={y - 8} />
      ))}
      {[190, 230].map((y) => (
        <line key={`r${y}`} x1={C.x + 104} y1={y} x2={C.x + 120} y2={y - 8} />
      ))}
    </g>
  </g>
);

export const W5CactusBoard: React.FC<BoardProps> = ({ step, stepFrame, frame }) => {
  const appear = appearer(step, stepFrame);
  const big = appear(0, 4, 16);
  const spines = appear(1, 6, 24);
  const shade = appear(2, 0, 20);
  const food = appear(3, 0, 20);
  const wind = (frame * 4) % 160;

  return (
    <g>
      <rect x="0" y={GROUND} width="960" height={350 - GROUND} fill="#F1D7A0" />
      <line x1="0" y1={GROUND} x2="960" y2={GROUND} stroke={INK} strokeWidth="5" />
      <Sun x={880} y={100} r={34} />

      {/* Bước 0: cây lá to bên trái, nước bay đi */}
      <g opacity={step === 0 ? big : step === 3 ? 0 : 0.3}>
        <path d={`M170 ${GROUND} L170 200`} stroke="#3FA34D" strokeWidth="8" />
        <path d="M170 200 C90 190 70 110 120 80 C150 120 170 160 170 200 Z" fill="#5DB04A" stroke={INK} strokeWidth="4" />
        <path d="M170 200 C250 190 270 110 220 80 C190 120 170 160 170 200 Z" fill="#5DB04A" stroke={INK} strokeWidth="4" />
        {step === 0
          ? [0, 1, 2, 3].map((i) => {
              const t = ((frame + i * 15) % 60) / 60;
              return <Drop key={i} x={110 + i * 40} y={140 - t * 70} s={1.2} />;
            })
          : null}
      </g>
      <Label x={170} y={300} text="LÁ TO: MẤT NƯỚC" opacity={step === 0 ? big : 0} size={22} />

      {/* Xương rồng */}
      <g opacity={step >= 1 ? 1 : 0.2}>
        <Cactus spines={step >= 1 ? spines : 0} />
      </g>
      <Label x={790} y={300} text="LÁ BIẾN THÀNH GAI" opacity={step === 1 ? spines : 0} size={24} color="#2E7D32" />

      {/* Bước 2: bóng râm, gió khô bị chắn */}
      <g opacity={step === 2 ? shade : 0}>
        <ellipse cx={C.x - 70} cy={GROUND + 10} rx="70" ry="10" fill="#000000" opacity="0.15" />
        {[150, 200, 250].map((y, i) => (
          <path key={y} d={`M${300 + wind * 0.6 + i * 10} ${y} q20 -10 40 0 t40 0`} fill="none" stroke="#9AA5B1" strokeWidth="5" strokeLinecap="round" />
        ))}
        <Label x={790} y={180} text="CHE BÓNG" size={26} />
        <Label x={790} y={216} text="CHẮN GIÓ KHÔ" size={26} />
        <Label x={790} y={252} text="KHÔNG BỊ ĂN" size={22} color="#C0392B" />
      </g>

      {/* Bước 3: thân xanh làm thức ăn */}
      <g opacity={food}>
        <Arrow x1={840} y1={130} x2={C.x + 60} y2={150} color="#F2B21B" width={7} p={food} />
        <Label x={250} y={170} text="THÂN XANH" size={30} color="#2E7D32" />
        <Label x={250} y={208} text="LÀM THỨC ĂN" size={26} />
      </g>

      <Caption captions={CAPTIONS} step={step} />
    </g>
  );
};
