/**
 * Sơ đồ "Vì sao có mùa hè nóng, mùa đông lạnh?" (6 bước):
 *   0  Trục Trái Đất nghiêng khoảng 23,5 độ, suốt năm nghiêng về một phía
 *   1  Nửa bắc chúc về Mặt Trời: nắng thẳng, ngày dài → mùa hè
 *   2  Đèn pin: chiếu thẳng đốm nhỏ mà rực, chiếu xiên loang to mà nhạt
 *   3  Nửa năm sau nửa bắc chếch xa: nắng xiên, ngày ngắn → mùa đông
 *   4  Hai nửa Trái Đất ngược mùa nhau: Việt Nam rét thì Úc nóng
 *   5  Úc đón Giáng sinh giữa mùa hè
 * Nguồn: NASA Space Place (What Causes the Seasons?), NOAA NESDIS, National Weather Service.
 */
import React from "react";
import type { BoardProps } from "../../../../engine/stage/board.tsx";
import { TEXT_FONT } from "../../../../engine/components/brand.ts";
import { appearer, Caption, INK, Sun } from "./common.tsx";
import { Tag } from "./w7-parts.tsx";

const CAPTIONS = [
  "Trục Trái Đất nghiêng 23,5 độ",
  "Nửa bắc chúc về Mặt Trời: HÈ",
  "Chiếu thẳng thì rực, chiếu xiên thì nhạt",
  "Nửa năm sau, nắng xiên: ĐÔNG",
  "Hai nửa Trái Đất ngược mùa nhau",
  "Hai nửa Trái Đất ngược mùa nhau",
];

const RED = "#E5484D";
const HOT = "#F4A261";
const COLD = "#7FC8F8";
const SEA = "#3D7BD9";
const YELLOW = "#FFD84D";
const TILT = -23.5;

const Big: React.FC<{ x: number; y: number; text: string; size: number; color?: string; opacity?: number }> = ({ x, y, text, size, color = INK, opacity = 1 }) => (
  <text x={x} y={y} textAnchor="middle" fontFamily={TEXT_FONT} fontWeight="900" fontSize={size} fill={color} opacity={opacity}>
    {text}
  </text>
);

/** Trái Đất trục nghiêng; tô màu nửa bắc / nửa nam. */
const Earth: React.FC<{ x: number; y: number; r: number; north?: string; south?: string; axisP?: number }> = ({ x, y, r, north = SEA, south = SEA, axisP = 1 }) => (
  <g transform={`translate(${x} ${y}) rotate(${TILT})`}>
    <path d={`M${-r} 0 A${r} ${r} 0 0 1 ${r} 0 Z`} fill={north} />
    <path d={`M${-r} 0 A${r} ${r} 0 0 0 ${r} 0 Z`} fill={south} />
    <path d={`M${-r * 0.5} ${-r * 0.45} q${r * 0.35} ${-r * 0.3} ${r * 0.7} ${-r * 0.05} q${-r * 0.1} ${r * 0.3} ${-r * 0.6} ${r * 0.25} z`} fill="#6DBE45" opacity={0.85} />
    <circle r={r} fill="none" stroke={INK} strokeWidth="6" />
    <line x1={-r} y1={0} x2={r} y2={0} stroke={INK} strokeWidth="3" strokeDasharray="8 7" opacity={0.6} />
    <line x1={0} y1={r + 32} x2={0} y2={r + 32 - (2 * r + 64) * axisP} stroke={RED} strokeWidth="6" strokeLinecap="round" />
  </g>
);

/** Chùm nắng từ Mặt Trời tới một điểm. */
const Rays: React.FC<{ x1: number; y1: number; x2: number; y2: number; frame: number; n?: number; gap?: number }> = ({ x1, y1, x2, y2, frame, n = 3, gap = 26 }) => (
  <g>
    {Array.from({ length: n }, (_, i) => {
      const off = (i - (n - 1) / 2) * gap;
      return (
        <line key={i} x1={x1} y1={y1 + off} x2={x2} y2={y2 + off} stroke="#F2B21B" strokeWidth="7" strokeLinecap="round" strokeDasharray="22 14" strokeDashoffset={-frame * 2} />
      );
    })}
  </g>
);

/** Đèn pin xoay `rot` độ (0 = chiếu thẳng xuống). */
const Torch: React.FC<{ x: number; y: number; rot: number }> = ({ x, y, rot }) => (
  <g transform={`translate(${x} ${y}) rotate(${rot})`}>
    <rect x={-18} y={-70} width={36} height={60} rx={8} fill="#7A8794" stroke={INK} strokeWidth="5" />
    <path d="M-26 -12 L26 -12 L20 12 L-20 12 Z" fill="#B5A898" stroke={INK} strokeWidth="5" strokeLinejoin="round" />
  </g>
);

export const SeasonsBoard: React.FC<BoardProps> = ({ step, stepFrame, frame }) => {
  const appear = appearer(step, stepFrame);
  const pulse = 1 + 0.04 * Math.sin(frame / 6);

  return (
    <g>
      {/* Bước 0: trục nghiêng 23,5 độ */}
      {step === 0 ? (
        <g>
          <line x1={480} y1={60} x2={480} y2={340} stroke={INK} strokeWidth="4" strokeDasharray="10 10" opacity={0.4} />
          <Earth x={480} y={200} r={108} axisP={appear(0, 0, 20)} />
          <g opacity={appear(0, 25, 14)}>
            <path d="M480 92 A110 110 0 0 0 437 101" fill="none" stroke={INK} strokeWidth="5" />
            <Tag x={300} y={95} text="23,5°" size={34} color={RED} />
          </g>
          <g opacity={appear(0, 60, 14)}>
            <Big x={780} y={150} text="Cả năm vẫn" size={32} />
            <Big x={780} y={195} text="nghiêng một phía" size={32} />
          </g>
        </g>
      ) : null}

      {/* Bước 1: mùa hè, nửa bắc chúc về Mặt Trời */}
      {step === 1 ? (
        <g>
          <Sun x={160} y={195} r={62} pulse={pulse} />
          <Rays x1={250} y1={150} x2={600} y2={150} frame={frame} />
          <Earth x={690} y={200} r={105} north={HOT} />
          <Tag x={860} y={78} text="MÙA HÈ" size={32} color={RED} opacity={appear(1, 20, 14)} />
          <Big x={420} y={300} text="Nắng thẳng, ngày dài" size={32} opacity={appear(1, 40, 14)} />
        </g>
      ) : null}

      {/* Bước 2: đèn pin chiếu thẳng và chiếu xiên */}
      {step === 2 ? (
        <g>
          <line x1={40} y1={285} x2={920} y2={285} stroke={INK} strokeWidth="5" />
          {/* Chiếu thẳng */}
          <path d="M210 112 L270 112 L295 285 L185 285 Z" fill={YELLOW} opacity={0.35} />
          <ellipse cx={240} cy={285} rx={58} ry={14} fill={YELLOW} stroke="#F2B21B" strokeWidth="4" opacity={0.6 + 0.4 * Math.abs(Math.sin(frame / 7))} />
          <Torch x={240} y={112} rot={0} />
          <Big x={240} y={330} text="Thẳng: rực" size={32} color={RED} />
          {/* Chiếu xiên */}
          <g opacity={appear(2, 30, 14)}>
            <path d="M560 125 L590 98 L900 285 L600 285 Z" fill={YELLOW} opacity={0.18} />
            <ellipse cx={750} cy={285} rx={150} ry={14} fill={YELLOW} opacity={0.3} />
            <Torch x={570} y={110} rot={-50} />
            <Big x={750} y={330} text="Xiên: loang, nhạt" size={32} color={SEA} />
          </g>
        </g>
      ) : null}

      {/* Bước 3: mùa đông, nửa bắc chếch xa Mặt Trời */}
      {step === 3 ? (
        <g>
          <Earth x={270} y={200} r={105} north={COLD} />
          <Sun x={800} y={195} r={62} pulse={pulse} />
          <Rays x1={710} y1={245} x2={380} y2={245} frame={-frame} />
          <Tag x={110} y={78} text="MÙA ĐÔNG" size={30} color={SEA} opacity={appear(3, 20, 14)} />
          <Big x={560} y={120} text="Nắng xiên, ngày ngắn" size={32} opacity={appear(3, 40, 14)} />
        </g>
      ) : null}

      {/* Bước 4–5: hai nửa ngược mùa; Úc đón Giáng sinh mùa hè */}
      {step >= 4 ? (
        <g>
          <Earth x={480} y={200} r={112} north={COLD} south={HOT} />
          <circle cx={505} cy={140} r={9} fill={INK} />
          <circle cx={490} cy={262} r={9} fill={INK} />
          <line x1={496} y1={140} x2={330} y2={110} stroke={INK} strokeWidth="4" />
          <line x1={499} y1={262} x2={640} y2={290} stroke={INK} strokeWidth="4" />
          <Tag x={200} y={110} text="Việt Nam: RÉT" size={30} color={SEA} />
          <Tag x={790} y={290} text="Úc: NÓNG" size={30} color={RED} opacity={appear(4, 25, 14)} />
          {step === 5 ? (
            <g opacity={appear(5, 10, 14)}>
              <Big x={790} y={120} text="🎄 Giáng sinh" size={34} />
              <Big x={790} y={170} text="ra biển chơi! 🏖️" size={34} />
            </g>
          ) : null}
        </g>
      ) : null}

      <Caption captions={CAPTIONS} step={step} />
    </g>
  );
};
