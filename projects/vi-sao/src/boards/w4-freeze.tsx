/**
 * Sơ đồ "Vì sao ăn kem nhanh lại bị buốt đầu?" (4 bước):
 *   0  Kem lạnh chạm vòm miệng
 *   1  Mạch máu ở vòm miệng thay đổi kích thước rất nhanh
 *   2  Dây thần kinh nhận ra, báo về não
 *   3  Não hiểu là đau → buốt đầu, một lúc là hết; ăn chậm thì đỡ
 * Nguồn: Harvard Health Publishing, Virginia Tech News (K. Rau).
 * Chỉ nói "thay đổi kích thước", vì hai nguồn mô tả co / giãn khác nhau.
 */
import React from "react";
import type { BoardProps } from "../../../../engine/stage/board.tsx";
import { appearer, BLUE, Caption, INK, Label } from "./common.tsx";
import { HeadSide, RED, Tag, Zigzag } from "./w4-parts.tsx";

const CAPTIONS = ["Kem lạnh chạm vòm miệng", "Mạch máu ở đó đổi kích thước rất nhanh", "Dây thần kinh báo về não", "Não thấy đau: buốt đầu, rồi hết nhanh"];

const H = { x: 250, y: 165 };

const Snow: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} stroke={BLUE} strokeWidth="5" strokeLinecap="round">
    {[0, 60, 120].map((a) => (
      <line key={a} x1={-18} y1={0} x2={18} y2={0} transform={`rotate(${a})`} />
    ))}
  </g>
);

export const FreezeBoard: React.FC<BoardProps> = ({ step, stepFrame }) => {
  const appear = appearer(step, stepFrame);
  const touch = appear(0, 2, 18);
  const vessel = appear(1, 0, 14);
  const nerve = appear(2, 0, 18);
  const ouch = appear(3, 0, 12);
  const pulse = step >= 1 ? 6 + 4 * Math.sin(stepFrame / 2.5) : 6;
  const coneX = 480 - 130 * touch;

  return (
    <g>
      <HeadSide cx={H.x} cy={H.y} mouthOpen brainGlow={step >= 2 ? nerve * (0.6 + 0.4 * Math.sin(stepFrame / 3)) : 0} />

      {/* Vòm miệng (viền trên khoang miệng) */}
      <path d={`M${H.x + 30} ${H.y + 44} C${H.x + 50} ${H.y + 32} ${H.x + 76} ${H.y + 34} ${H.x + 92} ${H.y + 48}`} fill="none" stroke="#F49AB0" strokeWidth="7" strokeLinecap="round" />

      {/* Cây kem đưa vào miệng */}
      <g transform={`translate(${coneX} ${H.y + 58})`}>
        <polygon points="10,-16 110,0 10,16" fill="#E8B26A" stroke={INK} strokeWidth="5" strokeLinejoin="round" />
        <circle cx={0} cy={0} r={24} fill="#FFB3C7" stroke={INK} strokeWidth="5" />
      </g>
      {step <= 1 ? (
        <g opacity={touch}>
          <Snow x={430} y={150} s={1} />
          <Tag x={560} y={150} text="LẠNH!" size={26} color={BLUE} opacity={1 - vessel} />
        </g>
      ) : null}

      {/* Bước 1: mạch máu ở vòm miệng to nhỏ liên hồi */}
      {vessel > 0 ? (
        <path
          d={`M${H.x + 28} ${H.y + 30} q12 -8 22 0 q12 8 22 0 q12 -8 22 0`}
          fill="none"
          stroke={RED}
          strokeWidth={pulse}
          strokeLinecap="round"
          opacity={vessel}
        />
      ) : null}
      <Tag x={700} y={150} text="MẠCH MÁU ĐỔI KÍCH THƯỚC" size={22} color={RED} opacity={vessel * (1 - nerve)} />

      {/* Bước 2: dây thần kinh báo về não */}
      <Zigzag x1={H.x + 55} y1={H.y + 22} x2={H.x + 15} y2={H.y - 45} p={nerve} teeth={6} />
      <Tag x={700} y={150} text="THẦN KINH BÁO VỀ NÃO" size={22} opacity={nerve * (1 - ouch)} />

      {/* Bước 3: buốt ở đầu, rồi hết nhanh */}
      {ouch > 0 ? (
        <g>
          <g transform={`translate(${H.x + 125} ${H.y - 58}) scale(${0.6 + 0.4 * ouch})`}>
            <polygon
              points="0,-46 14,-18 46,-26 26,0 48,22 14,20 0,48 -14,20 -48,22 -26,0 -46,-26 -14,-18"
              fill="#FFD93D"
              stroke={INK}
              strokeWidth="5"
            />
          </g>
          <Label x={690} y={150} text="BUỐT ĐẦU!" size={44} color="#C0392B" opacity={ouch} />
          <Tag x={690} y={230} text="MỘT LÚC LÀ HẾT" size={24} opacity={ouch} />
          <Tag x={690} y={295} text="ĂN KEM CHẬM THÔI" size={24} opacity={ouch} color={BLUE} />
        </g>
      ) : null}

      <Caption captions={CAPTIONS} step={step} />
    </g>
  );
};
