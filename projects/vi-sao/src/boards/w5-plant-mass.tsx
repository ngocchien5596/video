/**
 * Sơ đồ "Cây to như thế là lớn lên từ đâu ra?" (4 bước):
 *   0  Lá hút khí cacbonic trong không khí qua lỗ nhỏ trên mặt lá
 *   1  Rễ hút nước từ đất, kèm một chút chất khoáng
 *   2  Nhờ năng lượng ánh nắng, lá ghép khí và nước thành đường
 *   3  Đường nối lại thành thân, lá, rễ mới: cây lớn dần
 * Nguồn: Ask A Biologist – ASU (The Recipe for Plant Growth / What Are Plants Made Of?),
 *        CSU Northridge (Plant Mass: van Helmont's willow, mass comes from carbon dioxide).
 */
import React from "react";
import type { BoardProps } from "../../../../engine/stage/board.tsx";
import { appearer, Arrow, Caption, Drop, INK, Label, Sun } from "./common.tsx";

const CAPTIONS = ["Lá hút khí cacbonic từ không khí", "Rễ hút nước và chút chất khoáng", "Nắng giúp lá làm ra đường", "Đường làm thành thân, lá, rễ mới"];

const GROUND = 300;
const T = { x: 500 };

const Tree: React.FC<{ s: number }> = ({ s }) => (
  <g transform={`translate(${T.x} ${GROUND}) scale(${s})`} stroke={INK} strokeLinejoin="round">
    {/* Rễ */}
    <path d="M0 0 L-40 34 M0 0 L0 40 M0 0 L42 32 M-20 18 L-56 22 M22 16 L60 20" fill="none" stroke="#8A5A2B" strokeWidth="7" strokeLinecap="round" />
    {/* Thân */}
    <path d="M-16 0 L-12 -110 L12 -110 L16 0 Z" fill="#8A5A2B" strokeWidth="5" />
    {/* Tán lá */}
    <circle cx="-50" cy="-130" r="52" fill="#5DB04A" strokeWidth="5" />
    <circle cx="50" cy="-130" r="52" fill="#5DB04A" strokeWidth="5" />
    <circle cx="0" cy="-170" r="60" fill="#6DBE45" strokeWidth="5" />
  </g>
);

const Bubble: React.FC<{ x: number; y: number; o: number }> = ({ x, y, o }) =>
  o > 0 ? (
    <g opacity={o}>
      <circle cx={x} cy={y} r="18" fill="#E6E6E6" stroke={INK} strokeWidth="3" />
      <circle cx={x - 5} cy={y - 4} r="5" fill="#555555" />
      <circle cx={x + 6} cy={y + 4} r="4" fill="#B9B9B9" />
    </g>
  ) : null;

const Sugar: React.FC<{ x: number; y: number; o: number }> = ({ x, y, o }) =>
  o > 0 ? <rect x={x - 11} y={y - 11} width="22" height="22" rx="4" fill="#FFFFFF" stroke={INK} strokeWidth="3" opacity={o} /> : null;

export const W5PlantMassBoard: React.FC<BoardProps> = ({ step, stepFrame, frame }) => {
  const appear = appearer(step, stepFrame);
  const air = appear(0, 0, 40);
  const water = appear(1, 0, 40);
  const sun = appear(2, 0, 24);
  const grow = appear(3, 0, 40);
  const s = 0.95 + grow * 0.12;

  return (
    <g>
      <rect x="0" y={GROUND} width="960" height={350 - GROUND} fill="#D2AE7C" />
      <line x1="0" y1={GROUND} x2="960" y2={GROUND} stroke={INK} strokeWidth="5" />

      <Tree s={s} />

      {/* Bước 0: bong bóng khí cacbonic bay vào lá */}
      {[0, 1, 2].map((i) => {
        const t = Math.max(0, Math.min(1, air * 1.5 - i * 0.25));
        const loop = step > 0 ? 1 : t;
        return <Bubble key={i} x={860 - loop * 230 + Math.sin(frame * 0.1 + i) * 4} y={110 + i * 50} o={step > 0 ? 0.45 : Math.min(1, t * 3)} />;
      })}
      <Label x={820} y={84} text="KHÍ CACBONIC" opacity={step === 0 ? air : 0.5} size={24} />
      <Label x={790} y={258} text="QUA LỖ NHỎ TRÊN LÁ" opacity={step === 0 ? air : 0} size={20} />

      {/* Bước 1: nước đi lên từ rễ */}
      {step >= 1
        ? [0, 1, 2].map((i) => {
            const t = (((frame + i * 20) % 60) / 60) * water;
            return <Drop key={i} x={T.x} y={GROUND + 28 - t * 150} s={1.2} />;
          })
        : null}
      <Label x={T.x - 200} y={GROUND + 34} text="NƯỚC + CHÚT KHOÁNG" opacity={step === 1 ? water : step > 1 ? 0.5 : 0} size={22} />

      {/* Bước 2: nắng chiếu, lá làm ra đường */}
      <g opacity={sun}>
        <Sun x={110} y={110} r={40} />
        <Arrow x1={170} y1={120} x2={400} y2={140} color="#F2B21B" width={7} p={sun} />
      </g>
      {[
        [460, 140],
        [520, 118],
        [555, 165],
        [485, 185],
      ].map(([x, y], i) => (
        <Sugar key={i} x={x} y={y} o={step >= 2 ? Math.min(1, Math.max(0, sun * 2 - i * 0.25)) : 0} />
      ))}
      <Label x={200} y={200} text="ĐƯỜNG" opacity={step === 2 ? sun : 0} size={30} color="#B5892A" />

      {/* Bước 3: cây lớn lên */}
      <Label x={200} y={200} text="CÂY LỚN DẦN" opacity={grow} size={30} color="#2E7D32" />
      <Label x={200} y={236} text="THÂN, LÁ, RỄ MỚI" opacity={grow} size={22} />

      <Caption captions={CAPTIONS} step={step} />
    </g>
  );
};
