/**
 * Sơ đồ "Vì sao tắc kè bò trên trần nhà mà không rơi?" (4 bước):
 *   0  Dưới ngón chân tắc kè có hàng triệu sợi lông bé xíu
 *   1  Đầu mỗi sợi lông tách ra hàng trăm, hàng nghìn tấm đệm bé hơn
 *   2  Tấm đệm áp sát rạt vào mặt tường, sinh ra lực hút rất nhỏ
 *   3  Cả tỉ lực hút nhỏ cộng lại thành lực rất khoẻ, giữ tắc kè cả trên trần nhà
 * Nguồn: UC Berkeley News (2000), Lewis & Clark College, Georgia Tech Agile Systems Lab.
 */
import React from "react";
import type { BoardProps } from "../../../../engine/stage/board.tsx";
import { appearer, Arrow, BLUE, Caption, INK, Label } from "./common.tsx";

const CAPTIONS = ["Dưới ngón chân: hàng triệu sợi lông", "Đầu mỗi sợi lông: rất nhiều tấm đệm", "Đệm áp sát tường: lực hút rất nhỏ", "Cộng lại: giữ chặt cả trên trần nhà"];

const SKIN = "#8CC152";
const CEIL_Y = 70;

/** Tắc kè bò ngược dưới trần (lưng quay xuống), đầu bên phải. */
const Gecko: React.FC<{ x: number; s?: number; sway: number }> = ({ x, s = 1, sway }) => (
  <g transform={`translate(${x} ${CEIL_Y}) scale(${s})`} stroke={INK} strokeWidth="4" strokeLinejoin="round" strokeLinecap="round">
    <path d={`M-70 40 Q-120 ${50 + sway} -150 ${30 + sway}`} fill="none" strokeWidth="12" />
    <path d={`M-70 40 Q-120 ${50 + sway} -150 ${30 + sway}`} fill="none" stroke={SKIN} strokeWidth="6" />
    {/* chân bám trần */}
    {[-50, 40].map((lx) => (
      <g key={lx}>
        <path d={`M${lx} 40 L${lx - 14} 6 M${lx} 40 L${lx + 14} 6`} fill="none" strokeWidth="7" />
        <circle cx={lx - 14} cy={5} r="6" fill={SKIN} />
        <circle cx={lx + 14} cy={5} r="6" fill={SKIN} />
      </g>
    ))}
    <ellipse cx="-10" cy="44" rx="72" ry="22" fill={SKIN} />
    <ellipse cx="82" cy="40" rx="30" ry="18" fill={SKIN} />
    <circle cx="94" cy="46" r="5" fill="#FFD93D" />
    <circle cx="95" cy="47" r="2" fill={INK} stroke="none" />
    {[-40, -10, 20].map((dx) => (
      <circle key={dx} cx={dx} cy={50} r="5" fill="#F2B21B" stroke="none" />
    ))}
  </g>
);

export const W2GeckoBoard: React.FC<BoardProps> = ({ step, stepFrame, frame }) => {
  const appear = appearer(step, stepFrame);
  const hairs = appear(0, 8, 20);
  const pads = appear(1, 0, 20);
  const pull = appear(2, 0, 20);
  const sum = appear(3, 0, 24);
  const sway = Math.sin(frame * 0.15) * 6;

  return (
    <g>
      {/* Trần nhà */}
      <rect x="20" y={CEIL_Y - 14} width="920" height="14" fill="#D9CBB5" stroke={INK} strokeWidth="4" />
      <Gecko x={200} s={1.2} sway={sway} />
      <Label x={200} y={175} text="BÒ NGƯỢC TRÊN TRẦN" opacity={1 - sum} size={20} />

      {/* Kính lúp: ngón chân phóng to */}
      <g stroke={INK} strokeWidth="5">
        <line x1="250" y1="96" x2="392" y2="160" stroke="#9AA6B8" strokeDasharray="8 8" strokeWidth="4" />
        <circle cx="520" cy="200" r="132" fill="#FFFDF6" />
      </g>
      <clipPath id="w2-gecko-lens">
        <circle cx="520" cy="200" r="128" />
      </clipPath>
      <g clipPath="url(#w2-gecko-lens)">
        {/* mặt tường trong kính lúp */}
        <rect x="380" y="70" width="290" height="24" fill="#D9CBB5" stroke={INK} strokeWidth="4" />
        {/* ngón chân */}
        <rect x="400" y="200" width="250" height="90" rx="40" fill={SKIN} stroke={INK} strokeWidth="5" />
        {/* các sợi lông (bước 0) */}
        {Array.from({ length: 22 }, (_, i) => {
          const x = 414 + i * 10.5;
          const top = step >= 2 ? 96 : 140 + Math.sin(i) * 6;
          const y2 = 200 - (200 - top) * hairs;
          return <line key={i} x1={x} y1={200} x2={x} y2={y2} stroke="#5B8C2A" strokeWidth="3" />;
        })}
        {/* tấm đệm ở đầu sợi lông (bước 1) */}
        {pads > 0
          ? Array.from({ length: 22 }, (_, i) => {
              const x = 414 + i * 10.5;
              const top = step >= 2 ? 96 : 140 + Math.sin(i) * 6;
              return (
                <g key={i} opacity={pads}>
                  <line x1={x} y1={top + 8} x2={x - 4} y2={top} stroke="#5B8C2A" strokeWidth="2" />
                  <line x1={x} y1={top + 8} x2={x + 4} y2={top} stroke="#5B8C2A" strokeWidth="2" />
                  <circle cx={x - 4} cy={top} r="3.5" fill="#F2B21B" />
                  <circle cx={x + 4} cy={top} r="3.5" fill="#F2B21B" />
                </g>
              );
            })
          : null}
        {/* lực hút nhỏ (bước 2) */}
        {pull > 0
          ? [0, 1, 2, 3, 4, 5].map((i) => (
              <Arrow key={i} x1={430 + i * 40} y1={130} x2={430 + i * 40} y2={102} color={BLUE} width={3} p={pull} />
            ))
          : null}
      </g>
      <Label x={810} y={190} text="HÀNG TRIỆU" opacity={step === 0 ? hairs : 0} size={26} color="#3E6B17" />
      <Label x={810} y={222} text="SỢI LÔNG LI TI" opacity={step === 0 ? hairs : 0} size={24} color="#3E6B17" />
      <Label x={810} y={190} text="ĐẦU LÔNG TÁCH RA" opacity={step === 1 ? pads : 0} size={24} color="#9A6A00" />
      <Label x={810} y={222} text="NHIỀU TẤM ĐỆM" opacity={step === 1 ? pads : 0} size={24} color="#9A6A00" />
      <Label x={810} y={190} text="ÁP SÁT TƯỜNG" opacity={step === 2 ? pull : 0} size={24} color={BLUE} />
      <Label x={810} y={222} text="LỰC HÚT RẤT NHỎ" opacity={step === 2 ? pull : 0} size={24} color={BLUE} />

      {/* Bước 3: nhiều lực nhỏ cộng lại thành lực khoẻ */}
      <g opacity={sum}>
        <Label x={810} y={190} text="NHIỀU LỰC NHỎ" size={24} color={BLUE} />
        <Label x={810} y={222} text="CỘNG LẠI" size={24} color={BLUE} />
        <Arrow x1={200} y1={260} x2={200} y2={175} color={BLUE} width={12} />
        <Label x={200} y={300} text="RẤT KHOẺ!" size={30} color={BLUE} />
      </g>

      <Caption captions={CAPTIONS} step={step} />
    </g>
  );
};
