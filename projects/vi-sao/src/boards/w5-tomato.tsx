/**
 * Sơ đồ "Vì sao cà chua là quả mà người ta nấu như rau?" (4 bước):
 *   0  Cây cà chua ra hoa nhỏ
 *   1  Bông hoa lớn dần thành quả cà chua
 *   2  Mọc từ hoa và có hạt bên trong: nhà khoa học gọi là quả (dưa chuột cũng vậy)
 *   3  Trong bếp: ăn trong bữa chính, nấu món mặn nên gọi là rau
 * Nguồn: Iowa State University Extension (Is a tomato a fruit or a vegetable?),
 *        University of Maine Cooperative Extension (Ask EFNEP: Is a Tomato a Fruit or a Vegetable?).
 */
import React from "react";
import type { BoardProps } from "../../../../engine/stage/board.tsx";
import { appearer, Arrow, Caption, INK, Label } from "./common.tsx";

const CAPTIONS = ["Cây cà chua ra hoa", "Hoa lớn dần thành quả", "Mọc từ hoa, có hạt: là quả", "Trong bếp: nấu như rau"];

const RED = "#E5484D";

const Flower: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} stroke={INK} strokeWidth="3">
    {Array.from({ length: 5 }, (_, i) => (
      <ellipse key={i} cx="0" cy="-14" rx="7" ry="13" fill="#FFD93D" transform={`rotate(${i * 72})`} />
    ))}
    <circle r="6" fill="#F2B21B" />
  </g>
);

const Tomato: React.FC<{ x: number; y: number; r: number; color?: string }> = ({ x, y, r, color = RED }) => (
  <g transform={`translate(${x} ${y})`} stroke={INK} strokeLinejoin="round">
    <circle r={r} fill={color} strokeWidth="5" />
    <path d={`M0 ${-r} l-14 -6 l10 -2 l4 -10 l4 10 l10 2 z`} fill="#3FA34D" strokeWidth="3" />
    <circle cx={-r * 0.35} cy={-r * 0.35} r={r * 0.15} fill="#FFFFFF" opacity="0.6" strokeWidth="0" />
  </g>
);

/** Quả cà chua bổ đôi, thấy hạt. */
const TomatoHalf: React.FC<{ x: number; y: number }> = ({ x, y }) => (
  <g transform={`translate(${x} ${y})`} stroke={INK}>
    <circle r="62" fill={RED} strokeWidth="5" />
    <circle r="50" fill="#F47C6E" strokeWidth="0" />
    {[0, 120, 240].map((a) => (
      <g key={a} transform={`rotate(${a})`}>
        <ellipse cx="0" cy="-26" rx="18" ry="16" fill="#F9C2A8" strokeWidth="2" />
        {[-7, 0, 7].map((dx) => (
          <ellipse key={dx} cx={dx} cy={-26 + (dx === 0 ? -5 : 3)} rx="3" ry="4.5" fill="#FFF2B3" strokeWidth="1.5" />
        ))}
      </g>
    ))}
  </g>
);

export const W5TomatoBoard: React.FC<BoardProps> = ({ step, stepFrame }) => {
  const appear = appearer(step, stepFrame);
  const bloom = appear(0, 4, 16);
  const grow = appear(1, 0, 30);
  const cut = appear(2, 0, 16);
  const cook = appear(3, 0, 16);

  return (
    <g>
      {/* Cây cà chua */}
      <path d="M150 340 Q140 240 160 130" fill="none" stroke="#3FA34D" strokeWidth="9" />
      <path d="M150 260 q-60 -10 -70 -50 q50 0 70 50 Z M156 200 q60 -14 76 -54 q-54 4 -76 54 Z" fill="#5DB04A" stroke={INK} strokeWidth="4" />
      <path d="M158 150 Q200 140 236 160" fill="none" stroke="#3FA34D" strokeWidth="6" />
      <g opacity={bloom}>
        <Flower x={160} y={126} s={1.1} />
        <Flower x={240} y={170} s={0.9} />
      </g>
      <Label x={110} y={100} text="HOA" opacity={step === 0 ? bloom : 0} size={26} color="#B5892A" />

      {/* Bước 1: hoa thành quả */}
      {step >= 1 ? (
        <>
          <Arrow x1={270} y1={180} x2={330} y2={180} color={INK} width={5} p={grow} />
          <Tomato x={390} y={190} r={14 + grow * 30} color={grow < 0.6 ? "#7CC26A" : RED} />
          <Label x={390} y={268} text="THÀNH QUẢ" opacity={step === 1 ? grow : 0.5} size={24} />
        </>
      ) : null}

      {/* Bước 2: bổ đôi thấy hạt */}
      <g opacity={step >= 2 ? cut : 0}>
        <TomatoHalf x={590} y={180} />
        <Label x={590} y={290} text="CÓ HẠT = QUẢ" size={26} color="#C0392B" />
        <Label x={590} y={322} text="DƯA CHUỘT CŨNG VẬY" opacity={step === 2 ? 1 : 0.5} size={20} />
      </g>

      {/* Bước 3: trong bếp nấu như rau */}
      <g opacity={cook}>
        <path d="M730 170 L910 170 Q900 260 820 262 Q740 260 730 170 Z" fill="#B9C3CF" stroke={INK} strokeWidth="5" />
        <line x1="700" y1="170" x2="940" y2="170" stroke={INK} strokeWidth="6" strokeLinecap="round" />
        <circle cx="790" cy="166" r="16" fill={RED} stroke={INK} strokeWidth="3" />
        <circle cx="830" cy="160" r="14" fill={RED} stroke={INK} strokeWidth="3" />
        <circle cx="866" cy="166" r="15" fill={RED} stroke={INK} strokeWidth="3" />
        <path d="M790 140 q8 -14 0 -26 M830 136 q8 -14 0 -26 M866 140 q8 -14 0 -26" fill="none" stroke="#9AA5B1" strokeWidth="4" strokeLinecap="round" />
        <Label x={820} y={300} text="TRONG BẾP" size={26} />
        <Label x={820} y={332} text="NẤU NHƯ RAU" size={26} color="#2E7D32" />
      </g>

      <Caption captions={CAPTIONS} step={step} />
    </g>
  );
};
