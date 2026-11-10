/**
 * Sơ đồ "Vì sao cục đá lại nổi trên nước?" (4 bước):
 *   0  Trong nước, các hạt nước li ti chen chúc, chạy lung tung
 *   1  Khi đông thành đá, chúng xếp hàng ngay ngắn, đứng xa nhau hơn
 *   2  Vẫn chừng ấy nước mà đá chiếm nhiều chỗ hơn: nhẹ hơn nước cùng cỡ
 *   3  Nhẹ hơn thì nổi: cục đá nổi trên mặt cốc
 * Nguồn: Univ. of Alaska Fairbanks Geophysical Institute (Freezing of Water), Ohio State Beyond Penguins (All About Icebergs), Penn State EMS.
 */
import React from "react";
import type { BoardProps } from "../../../../engine/stage/board.tsx";
import { appearer, Caption, INK, Label } from "./common.tsx";

const CAPTIONS = ["Hạt nước chen chúc, chạy lung tung", "Đông lại: xếp hàng, đứng xa nhau", "Đá chiếm nhiều chỗ hơn", "Nhẹ hơn nước: đá nổi!"];

/** Hạt nước: chấm xanh với hai chấm trắng nhỏ. */
const Bit: React.FC<{ x: number; y: number }> = ({ x, y }) => (
  <g transform={`translate(${x} ${y})`}>
    <circle r="12" fill="#3D7BD9" stroke={INK} strokeWidth="3" />
    <circle cx="-9" cy="-8" r="5" fill="#FFFFFF" stroke={INK} strokeWidth="2" />
    <circle cx="9" cy="-8" r="5" fill="#FFFFFF" stroke={INK} strokeWidth="2" />
  </g>
);

const WATER_BOX = { x: 60, y: 120, w: 220, h: 150 };
const ICE_BOX = { x: 380, y: 95, w: 270, h: 200 };
const N = 12;
/** Vị trí chen chúc (nước) – cố định để mỗi lần xuất giống nhau. */
const PACKED: [number, number][] = [
  [30, 30], [70, 26], [112, 34], [156, 28], [196, 36], [44, 70], [90, 76], [134, 66], [178, 78], [30, 112], [102, 116], [164, 114],
];
/** Lưới xếp hàng thưa (đá). */
const LATTICE: [number, number][] = Array.from({ length: N }, (_, i) => {
  const r = Math.floor(i / 4);
  const c = i % 4;
  return [38 + c * 64 + (r % 2) * 18, 40 + r * 60];
});

export const IceBoard: React.FC<BoardProps> = ({ step, stepFrame, frame }) => {
  const appear = appearer(step, stepFrame);
  const water = appear(0, 0, 14);
  const freeze = appear(1, 0, 30);
  const compare = appear(2, 0, 18);
  const float = appear(3, 0, 18);

  return (
    <g>
      {/* Hộp nước: hạt chen chúc, rung lắc */}
      <g opacity={water}>
        <rect x={WATER_BOX.x} y={WATER_BOX.y} width={WATER_BOX.w} height={WATER_BOX.h} rx="14" fill="#BFE3F7" stroke={INK} strokeWidth="5" />
        {PACKED.map(([dx, dy], i) => (
          <Bit key={i} x={WATER_BOX.x + dx + Math.sin(frame * 0.4 + i * 2.1) * 5} y={WATER_BOX.y + dy + Math.cos(frame * 0.35 + i * 1.3) * 5} />
        ))}
        <Label x={WATER_BOX.x + WATER_BOX.w / 2} y={WATER_BOX.y + WATER_BOX.h + 34} text="NƯỚC" size={26} />
      </g>

      {/* Hộp đá: cùng số hạt, xếp hàng thưa, nối tay nhau */}
      <g opacity={freeze}>
        <rect x={ICE_BOX.x} y={ICE_BOX.y} width={ICE_BOX.w} height={ICE_BOX.h} rx="14" fill="#EAF6FF" stroke={INK} strokeWidth="5" />
        {LATTICE.map(([dx, dy], i) => {
          const right = i % 4 < 3 ? LATTICE[i + 1] : null;
          const down = i + 4 < N ? LATTICE[i + 4] : null;
          return (
            <g key={`l${i}`} stroke="#7FA8C9" strokeWidth="4">
              {right ? <line x1={ICE_BOX.x + dx} y1={ICE_BOX.y + dy} x2={ICE_BOX.x + right[0]} y2={ICE_BOX.y + right[1]} /> : null}
              {down ? <line x1={ICE_BOX.x + dx} y1={ICE_BOX.y + dy} x2={ICE_BOX.x + down[0]} y2={ICE_BOX.y + down[1]} /> : null}
            </g>
          );
        })}
        {LATTICE.map(([dx, dy], i) => (
          <Bit key={i} x={ICE_BOX.x + dx} y={ICE_BOX.y + dy} />
        ))}
        <Label x={ICE_BOX.x + ICE_BOX.w / 2} y={ICE_BOX.y + ICE_BOX.h + 34} text="ĐÁ" size={26} />
      </g>
      <path d="M300 195 L360 195" stroke={INK} strokeWidth="6" markerEnd="url(#ice-arrow)" opacity={freeze} />
      <defs>
        <marker id="ice-arrow" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
          <path d="M0 0 L8 4 L0 8 Z" fill={INK} />
        </marker>
      </defs>
      <Label x={330} y={180} text="ĐÔNG" opacity={step === 1 ? freeze : 0} size={20} />

      {/* Bước 2: cùng 12 hạt nhưng đá to hơn */}
      <g opacity={step === 2 ? compare : 0}>
        <Label x={820} y={140} text="CÙNG 12 HẠT" size={26} />
        <Label x={820} y={185} text="ĐÁ TO HƠN" size={28} color="#2C5FAD" />
        <Label x={820} y={230} text="→ NHẸ HƠN" size={26} color="#C0392B" />
        <Label x={820} y={265} text="NƯỚC CÙNG CỠ" size={22} color="#C0392B" />
      </g>

      {/* Bước 3: cốc nước có cục đá nổi */}
      <g opacity={float}>
        <path d="M730 110 L900 110 L885 330 L745 330 Z" fill="#FFFFFF" stroke={INK} strokeWidth="5" strokeLinejoin="round" />
        <path d="M737 170 L893 170 L885 326 L745 326 Z" fill="#7FC8F8" />
        <rect x={775} y={150 + Math.sin(frame * 0.1) * 3} width="60" height="44" rx="8" fill="#EAF6FF" stroke={INK} strokeWidth="4" opacity="0.95" />
        <Label x={815} y={95} text="ĐÁ NỔI!" size={28} color="#2C5FAD" />
      </g>

      <Caption captions={CAPTIONS} step={step} />
    </g>
  );
};
