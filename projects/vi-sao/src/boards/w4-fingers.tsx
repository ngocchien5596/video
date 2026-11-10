/**
 * Sơ đồ "Vì sao ngâm nước lâu thì ngón tay nhăn nheo?" (4 bước):
 *   0  Da như áo mưa, nước bên ngoài khó lọt vào
 *   1  Dây thần kinh ra lệnh, mạch máu ở đầu ngón co nhỏ lại
 *   2  Đầu ngón bớt đầy, da nhăn lại như nho thành nho khô
 *   3  Các nhà khoa học cho rằng: ngón nhăn cầm đồ ướt chắc hơn
 * Nguồn: West Texas A&M (C. Baird), Binghamton University, UTMB Medical Discovery News.
 */
import React from "react";
import type { BoardProps } from "../../../../engine/stage/board.tsx";
import { appearer, Arrow, BLUE, Caption, Drop, INK, Label } from "./common.tsx";
import { RED, SKIN, Tag, Zigzag } from "./w4-parts.tsx";

const CAPTIONS = ["Da giữ nước bên ngoài khó lọt vào", "Thần kinh ra lệnh: mạch máu co lại", "Đầu ngón bớt đầy, da nhăn lại", "Có thể giúp cầm đồ ướt chắc hơn"];

const FINGER = "M110 150 L470 150 Q560 150 560 215 Q560 280 470 280 L110 280 Z";

export const FingersBoard: React.FC<BoardProps> = ({ step, stepFrame, frame }) => {
  const appear = appearer(step, stepFrame);
  const shield = appear(0, 2, 18);
  const nerve = appear(1, 0, 18);
  const shrink = appear(1, 14, 20);
  const wrinkle = appear(2, 0, 20);
  const grip = appear(3, 0, 18);
  const vesselW = 12 - 7 * shrink;

  return (
    <g>
      {/* Ngón tay nằm ngang, đầu ngón bên phải */}
      <path d={FINGER} fill={SKIN} stroke={INK} strokeWidth="6" strokeLinejoin="round" />
      <ellipse cx={505} cy={156} rx={42} ry={10} fill="#FBE3E6" stroke={INK} strokeWidth="4" />

      {/* Mạch máu trong đầu ngón (co nhỏ lại ở bước 1) */}
      {[190, 215, 240].map((y, i) => (
        <path
          key={y}
          d={`M250 ${y} C330 ${y - 12} 400 ${y + 12} ${490 - i * 6} ${y}`}
          fill="none"
          stroke={RED}
          strokeWidth={vesselW}
          strokeLinecap="round"
          opacity={0.85}
        />
      ))}

      {/* Bước 0: giọt nước bật ra khỏi da */}
      {step === 0
        ? [180, 300, 420].map((x, i) => {
            const t = (frame / 20 + i * 0.33) % 1;
            return (
              <g key={x} opacity={shield}>
                <Drop x={x + 30 * t} y={140 - 70 * Math.sin(t * Math.PI)} s={1.4} />
              </g>
            );
          })
        : null}
      <Tag x={770} y={215} text="DA CHẮN NƯỚC" size={24} opacity={shield * (1 - nerve)} color={BLUE} />

      {/* Bước 1: tín hiệu thần kinh chạy tới đầu ngón */}
      <Zigzag x1={120} y1={265} x2={520} y2={265} p={nerve} teeth={14} />
      <Tag x={770} y={215} text="MẠCH MÁU CO LẠI" size={24} opacity={nerve * (1 - wrinkle)} color={RED} />
      <Label x={160} y={322} text="THẦN KINH" size={22} opacity={nerve * (1 - wrinkle)} color="#B07A00" />

      {/* Bước 2: đầu ngón nhăn lại, so với nho thành nho khô */}
      {wrinkle > 0 ? (
        <g opacity={wrinkle}>
          {[400, 430, 460, 490, 520].map((x) => (
            <path key={x} d={`M${x} 168 q-12 22 0 44 q12 22 0 44`} fill="none" stroke="#C4875A" strokeWidth="5" strokeLinecap="round" />
          ))}
        </g>
      ) : null}
      {wrinkle > 0 && grip < 1 ? (
        <g opacity={wrinkle * (1 - grip)}>
          <circle cx={700} cy={200} r={46} fill="#8E44AD" stroke={INK} strokeWidth="5" />
          <circle cx={686} cy={184} r={10} fill="#C792DF" />
          <Arrow x1={760} y1={200} x2={815} y2={200} color={INK} width={6} />
          <path
            d="M850 172 q14 -8 26 4 q12 -6 18 10 q10 10 -2 22 q4 16 -14 18 q-8 12 -24 2 q-16 4 -18 -12 q-12 -10 0 -22 q-2 -16 14 -22 Z"
            fill="#5B2C6F"
            stroke={INK}
            strokeWidth="5"
          />
          <Label x={700} y={290} text="NHO" size={24} />
          <Label x={870} y={290} text="NHO KHÔ" size={24} />
        </g>
      ) : null}

      {/* Bước 3: ngón nhăn cầm viên bi ướt chắc tay */}
      {grip > 0 ? (
        <g opacity={grip}>
          <circle cx={625} cy={215} r={48} fill="#7FC8F8" stroke={INK} strokeWidth="6" />
          <circle cx={608} cy={196} r={12} fill="#FFFFFF" opacity={0.8} />
          <Drop x={650} y={280} s={1.2} />
          <Tag x={800} y={150} text="CẦM CHẮC HƠN" size={26} />
          <Label x={800} y={215} text="(CÁC NHÀ KHOA HỌC" size={20} />
          <Label x={800} y={242} text="CHO RẰNG)" size={20} />
        </g>
      ) : null}

      <Caption captions={CAPTIONS} step={step} />
    </g>
  );
};
