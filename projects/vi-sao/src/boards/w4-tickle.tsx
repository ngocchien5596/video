/**
 * Sơ đồ "Vì sao mình không tự cù mình được?" (4 bước):
 *   0  Muốn nhột, cú cù phải bất ngờ
 *   1  Tay mình sắp cù: tiểu não đoán trước cảm giác
 *   2  Tiểu não so cảm giác thật với điều đã đoán: khớp!
 *   3  Khớp thì não tắt bớt cảm giác nhột, chỉ như bị gãi
 * Nguồn: Ask Dr. Universe (WSU), Neuroscience for Kids (Univ. of Washington).
 */
import React from "react";
import type { BoardProps } from "../../../../engine/stage/board.tsx";
import { appearer, Arrow, Caption, INK, Kid, Label } from "./common.tsx";
import { BRAIN, Tag } from "./w4-parts.tsx";

const CAPTIONS = ["Muốn nhột, cú cù phải bất ngờ", "Tay mình sắp cù: tiểu não đoán trước", "Cảm giác thật khớp với điều đã đoán", "Não tắt bớt nhột: chỉ như gãi"];

const CB = { x: 700, y: 222 };

const Card: React.FC<{ x: number; y: number; title: string; opacity: number }> = ({ x, y, title, opacity }) =>
  opacity > 0 ? (
    <g opacity={opacity}>
      <rect x={x - 70} y={y - 46} width={140} height={92} rx={14} fill="#FFFFFF" stroke={INK} strokeWidth="5" />
      <Label x={x} y={y - 14} text={title} size={22} />
      {/* Hình bàn tay cù nhỏ */}
      <g transform={`translate(${x} ${y + 20})`} stroke={INK} strokeWidth="4" strokeLinecap="round">
        <ellipse rx={20} ry={13} fill="#F8D2B0" />
        {[-14, -5, 4, 13].map((dx) => (
          <line key={dx} x1={dx} y1={-10} x2={dx + 4} y2={-22} />
        ))}
      </g>
    </g>
  ) : null;

export const TickleBoard: React.FC<BoardProps> = ({ step, stepFrame, frame }) => {
  const appear = appearer(step, stepFrame);
  const surprise = appear(0, 2, 16);
  const guess = appear(1, 0, 16);
  const match = appear(2, 0, 16);
  const off = appear(3, 0, 24);
  const wiggle = Math.sin(frame / 3) * 6;
  const ticklish = step >= 3 ? 1 - 0.8 * off : 1;

  return (
    <g>
      {/* Bé ở bên trái */}
      <g transform={step === 0 ? `rotate(${wiggle * 0.5} 150 320)` : undefined}>
        <Kid x={150} y={330} s={1.8} />
      </g>

      {/* Bước 0: người khác cù bất ngờ bằng lông vũ */}
      {step === 0 ? (
        <g opacity={surprise}>
          <g transform={`translate(${195 + wiggle} 245) rotate(-30)`}>
            <path d="M0 0 C30 -20 80 -20 120 0 C80 20 30 20 0 0 Z" fill="#FFFFFF" stroke={INK} strokeWidth="4" />
            <line x1={-20} y1={0} x2={120} y2={0} stroke={INK} strokeWidth="4" />
          </g>
          <Label x={290} y={120} text="HA HA HA!" size={38} color="#E5484D" />
          <Tag x={620} y={220} text="BẤT NGỜ = NHỘT" size={32} />
        </g>
      ) : null}

      {/* Não (nhìn nghiêng), tiểu não ở phía sau, dưới */}
      {step >= 1 ? (
        <g opacity={guess}>
          <ellipse cx={790} cy={160} rx={120} ry={78} fill={BRAIN} stroke={INK} strokeWidth="5" />
          <path d="M700 150 q20 -24 40 0 q20 24 40 0 q20 -24 40 0 q14 -16 26 4 M720 190 q20 -18 40 0 q20 18 40 0" fill="none" stroke="#C2577D" strokeWidth="4" strokeLinecap="round" />
          <ellipse cx={CB.x} cy={CB.y} rx={48} ry={30} fill="#8FB8F0" stroke={INK} strokeWidth="5" />
          <Tag x={CB.x + 40} y={300} text="TIỂU NÃO" size={24} />
          {/* Tay của chính bé đưa lên bụng */}
          <g transform="translate(205 225)" stroke={INK} strokeWidth="4" strokeLinecap="round">
            <ellipse rx={20} ry={13} fill="#F8D2B0" />
            {[-14, -5, 4, 13].map((dx) => (
              <line key={dx} x1={dx} y1={-10} x2={dx + 4} y2={-22} />
            ))}
          </g>
          <Label x={215} y={110} text="TAY MÌNH" size={22} opacity={1 - match} />
        </g>
      ) : null}
      {/* Bước 1: tiểu não đoán trước */}
      {step === 1 ? <Tag x={470} y={120} text="SẮP CÙ ĐÂY!" size={26} opacity={guess} /> : null}
      {step === 1 ? <Arrow x1={650} y1={210} x2={260} y2={225} color="#3D7BD9" width={5} p={guess} dashed /> : null}

      {/* Bước 2: so hai cảm giác */}
      <Card x={340} y={190} title="ĐOÁN" opacity={step >= 2 ? match : 0} />
      <Label x={432} y={204} text="=" size={48} opacity={step >= 2 ? match : 0} />
      <Card x={525} y={190} title="THẬT" opacity={step >= 2 ? match : 0} />
      <Tag x={432} y={300} text="KHỚP!" size={28} opacity={step === 2 ? match : 0} color="#3FA34D" />

      {/* Bước 3: thanh "nhột" tụt xuống */}
      {step >= 3 ? (
        <g opacity={Math.min(1, off * 3)}>
          <rect x={300} y={282} width={260} height={30} rx={15} fill="#FFFFFF" stroke={INK} strokeWidth="4" />
          <rect x={304} y={286} width={252 * ticklish} height={22} rx={11} fill="#E5484D" />
          <Label x={260} y={306} text="NHỘT" size={22} />
          <Tag x={430} y={98} text="CHỈ NHƯ GÃI THÔI" size={26} />
        </g>
      ) : null}

      <Caption captions={CAPTIONS} step={step} />
    </g>
  );
};
