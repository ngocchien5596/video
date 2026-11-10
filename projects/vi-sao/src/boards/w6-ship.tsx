/**
 * Sơ đồ "Tàu bằng sắt nặng thế, sao không chìm?" (4 bước):
 *   0  Tàu đè xuống nước, đẩy nước dạt sang hai bên
 *   1  Nước bị đẩy thì đẩy ngược lại, nâng đáy tàu lên
 *   2  Tàu rỗng ruột, nhiều không khí: nhẹ hơn khối nước to bằng chừng ấy
 *   3  Nước đẩy lên mạnh hơn sức nặng: tàu nổi; cục sắt đặc thì chìm
 * Nguồn: Illinois Physics Van (Why do Ships Float?), Alabama Cooperative Extension (Understanding Buoyancy), Texas A&M Engineering.
 */
import React from "react";
import type { BoardProps } from "../../../../engine/stage/board.tsx";
import { appearer, Arrow, Caption, clamp01, INK, Label } from "./common.tsx";

const CAPTIONS = ["Tàu đè xuống, đẩy nước dạt ra", "Nước đẩy ngược, nâng tàu lên", "Tàu rỗng, đầy không khí", "Tàu nổi, cục sắt đặc chìm"];

const WATER = 200;
const SHIP = { x: 300, w: 320, h: 90 };

export const ShipBoard: React.FC<BoardProps> = ({ step, stepFrame, frame }) => {
  const appear = appearer(step, stepFrame);
  const settle = appear(0, 0, 24);
  const push = appear(1, 0, 18);
  const hollow = appear(2, 0, 18);
  const sink = appear(3, 0, 40);

  // Tàu hạ xuống chạm nước rồi chìm một phần (bước 0), nhấp nhô nhẹ.
  const bob = Math.sin(frame * 0.1) * 3;
  const top = WATER - 50 - (1 - settle) * 60 + bob;
  const hull = `M${SHIP.x - SHIP.w / 2} ${top} L${SHIP.x + SHIP.w / 2} ${top} L${SHIP.x + SHIP.w / 2 - 40} ${top + SHIP.h} L${SHIP.x - SHIP.w / 2 + 40} ${top + SHIP.h} Z`;
  const bottom = top + SHIP.h;

  // Cục sắt đặc chìm dần xuống đáy (bước 3).
  const blockY = WATER - 70 + sink * 150;

  return (
    <g>
      {/* Chậu nước */}
      <rect x="20" y={WATER} width="920" height={350 - WATER} fill="#7FC8F8" />
      <line x1="20" y1={WATER} x2="940" y2={WATER} stroke={INK} strokeWidth="5" />

      {/* Tàu */}
      <path d={hull} fill={hollow > 0 ? "#FFFFFF" : "#7A8794"} stroke={INK} strokeWidth="7" strokeLinejoin="round" />
      {hollow > 0 ? (
        <g opacity={hollow}>
          <path d={hull} fill="#DDF1FB" />
          {[-90, -30, 30, 90].map((dx, i) => (
            <circle key={dx} cx={SHIP.x + dx} cy={top + 68 + (i % 2) * 4} r={9} fill="#FFFFFF" stroke="#7FA8C9" strokeWidth="3" />
          ))}
          <path d={hull} fill="none" stroke="#7A8794" strokeWidth="12" strokeLinejoin="round" />
          <path d={hull} fill="none" stroke={INK} strokeWidth="4" strokeLinejoin="round" />
        </g>
      ) : null}
      <rect x={SHIP.x - 20} y={top - 50} width="40" height="50" fill="#E5484D" stroke={INK} strokeWidth="5" />
      <Label x={SHIP.x} y={top + 40} text="KHÔNG KHÍ" opacity={step === 2 ? hollow : 0} size={24} color="#2C5FAD" />

      {/* Bước 0: nước bị đẩy dạt sang hai bên */}
      {step === 0 ? (
        <>
          <Arrow x1={SHIP.x - 130} y1={WATER + 20} x2={SHIP.x - 230} y2={WATER + 20} color="#2C5FAD" width={6} p={settle} />
          <Arrow x1={SHIP.x + 130} y1={WATER + 20} x2={SHIP.x + 230} y2={WATER + 20} color="#2C5FAD" width={6} p={settle} />
        </>
      ) : null}
      <Label x={SHIP.x} y={335} text="ĐẨY NƯỚC DẠT RA" opacity={step === 0 ? settle : 0} size={24} color="#2C5FAD" />

      {/* Bước 1–3: nước đẩy ngược lên đáy tàu */}
      {[-60, 0, 60].map((dx, i) => (
        <Arrow key={dx} x1={SHIP.x + dx} y1={bottom + 60} x2={SHIP.x + dx} y2={bottom + 8} color="#2C5FAD" width={7} p={step >= 1 ? clamp01(push * 1.4 - i * 0.15) : 0} />
      ))}
      <Label x={560} y={110} text="NƯỚC ĐẨY LÊN" opacity={step === 1 ? push : 0} size={28} color="#2C5FAD" />
      <Label x={560} y={110} text="NHẸ HƠN NƯỚC CÙNG CỠ" opacity={step === 2 ? hollow : 0} size={24} />

      {/* Bước 3: cục sắt đặc chìm */}
      <g opacity={sink > 0 ? 1 : 0}>
        <rect x={760} y={blockY} width="70" height="60" rx="6" fill="#5B6270" stroke={INK} strokeWidth="5" />
        <Label x={795} y={blockY < 200 ? blockY - 14 : 140} text="SẮT ĐẶC: CHÌM" size={22} color="#3B4250" />
        <Label x={560} y={110} text="TÀU: NỔI" size={30} color="#2C5FAD" />
      </g>

      <Caption captions={CAPTIONS} step={step} />
    </g>
  );
};
