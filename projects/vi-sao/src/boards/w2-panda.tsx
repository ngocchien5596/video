/**
 * Sơ đồ "Vì sao gấu trúc ăn tre gần như cả ngày?" (4 bước):
 *   0  Thức ăn của gấu trúc gần như toàn là tre
 *   1  Bụng giống loài ăn thịt hơn loài ăn cỏ: tiêu hoá tre kém, nhiều phần bị thải ra
 *   2  Tre ít chất bổ: phải ăn rất nhiều tre mỗi ngày
 *   3  Mỗi ngày ít nhất mười hai tiếng để ăn, còn lại phần lớn là ngủ, nghỉ
 * Nguồn: Smithsonian's National Zoo (Giant panda; bamboo article), San Diego Zoo (Giant panda).
 */
import React from "react";
import type { BoardProps } from "../../../../engine/stage/board.tsx";
import { appearer, Arrow, Caption, INK, Label } from "./common.tsx";

const CAPTIONS = ["Gần như chỉ ăn tre", "Bụng tiêu hoá tre kém", "Tre ít chất bổ: phải ăn rất nhiều", "Ăn ít nhất 12 tiếng mỗi ngày"];

const BAMBOO = "#7CB342";

const Bamboo: React.FC<{ x: number; y: number; h?: number; rot?: number }> = ({ x, y, h = 90, rot = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${rot})`} stroke={INK} strokeWidth="3">
    <rect x="-6" y={-h} width="12" height={h} rx="4" fill={BAMBOO} />
    {[0.33, 0.66].map((k) => (
      <line key={k} x1="-6" y1={-h * k} x2="6" y2={-h * k} />
    ))}
    <path d={`M6 ${-h * 0.8} q18 -10 28 -2 q-14 8 -28 2 Z`} fill="#9CCC65" />
  </g>
);

/** Gấu trúc ngồi, tâm thân ở (x, y). */
const Panda: React.FC<{ x: number; y: number; chew: number; belly?: string }> = ({ x, y, chew, belly = "#FFFFFF" }) => (
  <g transform={`translate(${x} ${y})`} stroke={INK} strokeWidth="5" strokeLinejoin="round">
    <ellipse cx="-50" cy="70" rx="30" ry="20" fill={INK} />
    <ellipse cx="50" cy="70" rx="30" ry="20" fill={INK} />
    <ellipse cx="0" cy="20" rx="72" ry="66" fill={belly} />
    <ellipse cx="-62" cy="0" rx="20" ry="36" fill={INK} transform="rotate(20 -62 0)" />
    <ellipse cx="62" cy="0" rx="20" ry="36" fill={INK} transform="rotate(-20 62 0)" />
    <circle cx="-38" cy="-108" r="16" fill={INK} />
    <circle cx="38" cy="-108" r="16" fill={INK} />
    <circle cx="0" cy="-74" r="50" fill="#FFFFFF" />
    <ellipse cx="-20" cy="-80" rx="12" ry="15" fill={INK} transform="rotate(25 -20 -80)" />
    <ellipse cx="20" cy="-80" rx="12" ry="15" fill={INK} transform="rotate(-25 20 -80)" />
    <circle cx="-18" cy="-82" r="3" fill="#FFFFFF" stroke="none" />
    <circle cx="18" cy="-82" r="3" fill="#FFFFFF" stroke="none" />
    <ellipse cx="0" cy="-60" rx="8" ry="5" fill={INK} />
    <path d={`M-10 ${-48 + chew * 3} Q0 ${-42 + chew * 5} 10 ${-48 + chew * 3}`} fill="none" strokeWidth="4" />
  </g>
);

export const W2PandaBoard: React.FC<BoardProps> = ({ step, stepFrame, frame }) => {
  const appear = appearer(step, stepFrame);
  const diet = appear(0, 4, 18);
  const gut = appear(1, 0, 24);
  const pile = appear(2, 0, 24);
  const clock = appear(3, 0, 30);
  const chew = (Math.sin(frame * 0.5) + 1) / 2;
  const PX = 200;
  const PY = 228;

  return (
    <g>
      <Panda x={PX} y={PY} chew={chew} />
      <Bamboo x={PX + 70} y={PY + 40} h={130} rot={-18} />

      {/* Bước 0: bữa ăn gần như toàn tre */}
      <g opacity={step === 0 ? diet : 0}>
        {Array.from({ length: 9 }, (_, i) => (
          <Bamboo key={i} x={470 + i * 34} y={300} h={150 + (i % 3) * 20} />
        ))}
        <circle cx="830" cy="232" r="22" fill="#E57373" stroke={INK} strokeWidth="3" />
        <Label x={600} y={104} text="GẦN NHƯ TOÀN TRE" size={28} color="#33691E" />
        <Label x={830} y={290} text="CHÚT KHÁC" size={20} />
      </g>

      {/* Bước 1: tre đi vào bụng, phần lớn đi ra */}
      <g opacity={step === 1 ? gut : 0}>
        <rect x="430" y="150" width="300" height="110" rx="50" fill="#FFF1E0" stroke={INK} strokeWidth="5" />
        <Label x={580} y={136} text="BỤNG GIỐNG LOÀI ĂN THỊT" size={22} color="#9A3A12" />
        {[0, 1, 2, 3].map((i) => {
          const t = ((frame * 0.012 + i / 4) % 1);
          return <Bamboo key={i} x={400 + t * 380} y={220} h={44} rot={90} />;
        })}
        <Arrow x1={740} y1={205} x2={850} y2={205} color="#8D6E63" width={8} />
        <Label x={580} y={300} text="TIÊU HOÁ KÉM" size={26} color="#9A3A12" />
        <Label x={860} y={250} text="THẢI RA" size={22} color="#8D6E63" />
        <Label x={860} y={276} text="NHIỀU" size={22} color="#8D6E63" />
      </g>

      {/* Bước 2: tre ít chất bổ, phải ăn rất nhiều */}
      <g opacity={step === 2 ? pile : 0}>
        {Array.from({ length: 24 }, (_, i) => (
          <Bamboo key={i} x={470 + (i % 12) * 30 + (i >= 12 ? 14 : 0)} y={i >= 12 ? 330 : 310} h={60 + ((i * 7) % 30)} rot={-70 + ((i * 13) % 40)} />
        ))}
        <Label x={640} y={110} text="ÍT CHẤT BỔ" size={28} color="#33691E" />
        <Label x={640} y={150} text="PHẢI ĂN RẤT NHIỀU" size={28} color="#33691E" />
      </g>

      {/* Bước 3: đồng hồ, ít nhất mười hai tiếng ăn */}
      <g opacity={clock}>
        <circle cx="640" cy="200" r="100" fill="#FFFFFF" stroke={INK} strokeWidth="6" />
        <path
          d={`M640 200 L640 100 A100 100 0 0 1 ${640 + Math.sin(clock * Math.PI) * 100} ${200 - Math.cos(clock * Math.PI) * 100} Z`}
          fill="#AED581"
          stroke={INK}
          strokeWidth="3"
        />
        <circle cx="640" cy="200" r="6" fill={INK} />
        <Label x={590} y={200} text="NGỦ" size={22} color="#4B3FA3" />
        <Label x={690} y={210} text="ĂN" size={26} color="#33691E" />
        <Label x={850} y={180} text="ÍT NHẤT" size={26} color="#33691E" />
        <Label x={850} y={214} text="12 TIẾNG" size={30} color="#33691E" />
      </g>

      <Caption captions={CAPTIONS} step={step} />
    </g>
  );
};
