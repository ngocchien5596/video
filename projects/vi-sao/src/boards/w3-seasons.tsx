/**
 * Sơ đồ "Vì sao có mùa hè nóng, mùa đông lạnh?" (4 bước):
 *   0  Trái Đất đi vòng quanh Mặt Trời, trục nghiêng
 *   1  Đi suốt năm, trục vẫn nghiêng về cùng một hướng
 *   2  Nửa phía bắc nghiêng về phía Mặt Trời: nắng chiếu thẳng hơn → mùa hè
 *   3  Nửa năm sau, nửa phía bắc chếch ra xa: nắng xiên hơn → mùa đông
 * Nguồn: NASA Space Place (What Causes the Seasons?), NOAA NESDIS, National Weather Service.
 */
import React from "react";
import type { BoardProps } from "../../../../engine/stage/board.tsx";
import { appearer, Arrow, Caption, clamp01, INK, Label, Sun } from "./common.tsx";

const CAPTIONS = ["Trục Trái Đất nghiêng nghiêng", "Luôn nghiêng về cùng một hướng", "Nửa bắc nghiêng về Mặt Trời: HÈ", "Nửa năm sau, nắng xiên: ĐÔNG"];

const O = { x: 480, y: 195, rx: 340, ry: 100 };
const R = 50;
const TILT = 23;

/** Trái Đất có trục nghiêng; `north` tô màu nửa phía bắc (nóng / lạnh). */
const Earth: React.FC<{ x: number; y: number; north?: string; northOpacity?: number; opacity?: number }> = ({
  x,
  y,
  north,
  northOpacity = 0,
  opacity = 1,
}) => (
  <g transform={`translate(${x} ${y}) rotate(${TILT})`} opacity={opacity}>
    <circle r={R} fill="#3D7BD9" stroke={INK} strokeWidth="6" />
    <path d="M-28 -22 q20 -16 40 0 q-6 20 -34 14 z M4 14 q24 -6 30 16 q-20 12 -34 -4 z" fill="#6DBE45" />
    {north && northOpacity > 0 ? <path d={`M${-R} 0 A${R} ${R} 0 0 1 ${R} 0 Z`} fill={north} opacity={northOpacity} /> : null}
    <line x1={-R} y1="0" x2={R} y2="0" stroke={INK} strokeWidth="3" strokeDasharray="6 5" />
    <line x1="0" y1={-R - 22} x2="0" y2={R + 22} stroke="#E5484D" strokeWidth="6" strokeLinecap="round" />
    <circle r={R} fill="none" stroke={INK} strokeWidth="6" />
  </g>
);

export const SeasonsBoard: React.FC<BoardProps> = ({ step, stepFrame }) => {
  const appear = appearer(step, stepFrame);
  const travel = appear(1, 0, 60);
  const summer = appear(2, 0, 16);
  const winter = appear(3, 0, 16);

  // Bước 0: Trái Đất ở bên trái. Bước 1: đi vòng phía dưới sang bên phải.
  const theta = Math.PI * (1 - travel);
  const ex = O.x + O.rx * Math.cos(theta);
  const ey = O.y + O.ry * Math.sin(theta);
  const left = { x: O.x - O.rx, y: O.y };
  const right = { x: O.x + O.rx, y: O.y };

  return (
    <g>
      <ellipse cx={O.x} cy={O.y} rx={O.rx} ry={O.ry} fill="none" stroke={INK} strokeWidth="4" strokeDasharray="12 10" opacity="0.5" />
      <Sun x={O.x} y={O.y} r={40} />

      {step <= 1 ? (
        <>
          {/* Bóng mờ chỗ xuất phát khi Trái Đất đã đi */}
          {step === 1 ? <Earth x={left.x} y={left.y} opacity={0.3} /> : null}
          <Earth x={ex} y={ey} />
        </>
      ) : (
        <>
          <Earth x={left.x} y={left.y} north="#FF8A3D" northOpacity={summer * 0.75} opacity={step === 3 ? 0.45 : 1} />
          <Earth x={right.x} y={right.y} north="#F2FAFF" northOpacity={winter * 0.9} opacity={step === 2 ? 0.35 : 1} />
        </>
      )}

      {/* Bước 2: nắng chiếu thẳng vào nửa phía bắc bên trái */}
      {[-28, -8].map((dy, i) => (
        <Arrow key={`s${dy}`} x1={O.x - 70} y1={O.y + dy} x2={left.x + 62} y2={left.y + dy - 14} color="#F2B21B" width={6} p={step === 2 ? clamp01(summer * 1.3 - i * 0.2) : 0} />
      ))}
      {/* Bước 3: nắng xiên vào nửa phía bắc bên phải */}
      {[-28, -8].map((dy, i) => (
        <Arrow key={`w${dy}`} x1={O.x + 70} y1={O.y + dy} x2={right.x - 48} y2={right.y + dy - 30} color="#F2B21B" width={5} p={step === 3 ? clamp01(winter * 1.3 - i * 0.2) : 0} dashed />
      ))}

      {/* Nhãn */}
      <Label x={left.x + 10} y={318} text="TRỤC NGHIÊNG" opacity={step === 0 ? appear(0, 6) : 0} size={24} color="#C0392B" />
      <Label x={O.x} y={335} text="VẪN CÙNG MỘT HƯỚNG" opacity={step === 1 ? clamp01(travel * 2 - 1) : 0} size={24} color="#C0392B" />
      <Label x={left.x + 10} y={318} text="MÙA HÈ" opacity={step >= 2 ? summer : 0} size={30} color="#D35400" />
      <Label x={left.x + 10} y={90} text="NỬA BẮC" opacity={step >= 2 ? summer : 0} size={22} />
      <Label x={right.x - 10} y={318} text="MÙA ĐÔNG" opacity={winter} size={30} color="#2C5FAD" />
      <Label x={right.x - 10} y={90} text="NỬA BẮC" opacity={winter} size={22} />

      <Caption captions={CAPTIONS} step={step} />
    </g>
  );
};

