/**
 * Sơ đồ "Vì sao ban đêm trời tối?" (4 bước):
 *   0  Trái Đất luôn tự quay
 *   1  Mỗi ngày quay đủ một vòng
 *   2  Chỗ mình quay về phía mặt trời: ban ngày
 *   3  Chỗ mình quay sang phía bên kia: ban đêm
 * Nguồn: NASA Space Place (What causes the seasons? – Earth spins one turn each day, that is why we have day and night),
 *        NASA Science (Earth facts – one rotation every 23.9 hours).
 */
import React from "react";
import type { BoardProps } from "../../../../engine/stage/board.tsx";
import { appearer, Caption, INK, Label, Sun } from "./common.tsx";

const CAPTIONS = ["Trái Đất luôn tự quay", "Mỗi ngày quay đủ một vòng", "Quay về phía mặt trời: ban ngày", "Quay sang phía bên kia: ban đêm"];

const E = { x: 620, y: 210, r: 105 };

export const NightBoard: React.FC<BoardProps> = ({ step, stepFrame, frame }) => {
  const appear = appearer(step, stepFrame);
  const spin = appear(1, 0, 60);
  // Góc của "chỗ mình" trên Trái Đất (180° = phía mặt trời, bên trái; 0° = phía tối, bên phải).
  const angle =
    step === 0 ? 180 + Math.sin(frame * 0.05) * 20 : step === 1 ? 180 + spin * 360 : step === 2 ? 180 : 180 - appear(3, 0, 30) * 180;
  const a = (angle * Math.PI) / 180;
  const px = E.x + Math.cos(a) * E.r;
  const py = E.y - Math.sin(a) * E.r;
  const day = Math.cos(a) < 0;

  return (
    <g>
      <Sun x={90} y={E.y} r={56} />
      {/* Tia nắng về phía Trái Đất */}
      {[-70, -35, 0, 35, 70].map((dy) => (
        <line key={dy} x1={170} y1={E.y + dy * 0.6} x2={E.x - E.r - 20} y2={E.y + dy} stroke="#F2B21B" strokeWidth="5" strokeDasharray="14 10" opacity="0.8" />
      ))}

      {/* Trái Đất: nửa phải tối */}
      <circle cx={E.x} cy={E.y} r={E.r} fill="#3D7BD9" stroke={INK} strokeWidth="7" />
      <path d={`M${E.x - 50} ${E.y - 60} q40 -30 70 10 q-10 40 -60 30 z M${E.x + 10} ${E.y + 30} q50 -10 60 40 q-40 20 -70 -10 z`} fill="#6DBE45" />
      <path d={`M${E.x} ${E.y - E.r} A${E.r} ${E.r} 0 0 1 ${E.x} ${E.y + E.r} Z`} fill="#0E1B3D" opacity="0.72" />
      <circle cx={E.x} cy={E.y} r={E.r} fill="none" stroke={INK} strokeWidth="7" />

      {/* Mũi tên quay quanh Trái Đất */}
      <path
        d={`M${E.x - 70} ${E.y - E.r - 18} A${E.r + 22} ${E.r + 22} 0 0 1 ${E.x + 70} ${E.y - E.r - 18}`}
        fill="none"
        stroke={INK}
        strokeWidth="5"
        markerEnd="url(#spin-head)"
      />
      <defs>
        <marker id="spin-head" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
          <path d="M0 0 L10 5 L0 10 Z" fill={INK} />
        </marker>
      </defs>

      {/* "Chỗ mình": lá cờ nhỏ trên mặt Trái Đất */}
      <g transform={`translate(${px} ${py}) rotate(${90 - angle})`}>
        <line x1="0" y1="0" x2="0" y2="-34" stroke={INK} strokeWidth="5" />
        <path d="M0 -34 L26 -26 L0 -18 Z" fill="#E5484D" stroke={INK} strokeWidth="3" />
      </g>
      <Label x={px + (day ? -60 : 60)} y={py + 8} text="MÌNH" size={22} color={INK} />

      {/* Nhãn ngày / đêm */}
      <Label x={E.x - 60} y={E.y + E.r + 30} text="NGÀY" opacity={step >= 2 ? 1 : 0} size={26} color="#B5892A" />
      <Label x={E.x + 60} y={E.y + E.r + 30} text="ĐÊM" opacity={step >= 2 ? 1 : 0} size={26} color="#0E1B3D" />
      <Label x={300} y={330} text="MỘT VÒNG = MỘT NGÀY ĐÊM" opacity={step === 1 ? spin : 0} size={22} />

      <Caption captions={CAPTIONS} step={step} />
    </g>
  );
};
