/**
 * Sơ đồ "Vì sao Mặt Trăng lúc tròn lúc khuyết?" (4 bước):
 *   0  Mặt Trăng không tự sáng: Mặt Trời chiếu sáng một nửa, nửa kia tối
 *   1  Mặt Trăng đi vòng quanh Trái Đất (khoảng một tháng một vòng)
 *   2  Tuỳ vị trí, từ Trái Đất mình thấy phần sáng nhiều hay ít
 *   3  Thấy trọn phần sáng: trăng tròn; thấy một mẩu: trăng khuyết
 * Nguồn: NASA Space Place (Moon Phases), University of Hawaiʻi (Phases of the Moon), NASA Science (Moon Facts).
 */
import React from "react";
import type { BoardProps } from "../../../../engine/stage/board.tsx";
import { appearer, Caption, INK, Label, Sun } from "./common.tsx";

const CAPTIONS = ["Mặt Trời chiếu sáng nửa Mặt Trăng", "Mặt Trăng đi vòng quanh Trái Đất", "Mình thấy phần sáng nhiều hay ít", "Trăng tròn, trăng khuyết"];

const E = { x: 380, y: 200, r: 34 };
const ORBIT = 115;
const MR = 24;
const LIT = "#FFF3B0";
const DARK = "#3A4150";

/** Mặt Trăng nhìn từ ngoài: nửa bên trái (phía Mặt Trời) sáng. */
const MoonTop: React.FC<{ x: number; y: number }> = ({ x, y }) => (
  <g>
    <circle cx={x} cy={y} r={MR} fill={DARK} stroke={INK} strokeWidth="4" />
    <path d={`M${x} ${y - MR} A${MR} ${MR} 0 0 0 ${x} ${y + MR} Z`} fill={LIT} />
    <circle cx={x} cy={y} r={MR} fill="none" stroke={INK} strokeWidth="4" />
  </g>
);

/**
 * Mặt Trăng nhìn từ Trái Đất. `phi` là góc của Mặt Trăng quanh Trái Đất (độ):
 * 0 = phía đối diện Mặt Trời (trăng tròn), 180 = giữa Trái Đất và Mặt Trời (không thấy).
 */
export const MoonPhase: React.FC<{ x: number; y: number; r: number; phi: number }> = ({ x, y, r, phi }) => {
  const a = (phi * Math.PI) / 180;
  const c = Math.cos(a);
  const side = Math.sin(a) >= 0 ? 1 : -1;
  const N = 24;
  const limb: string[] = [];
  const term: string[] = [];
  for (let i = 0; i <= N; i++) {
    const t = -Math.PI / 2 + (i * Math.PI) / N;
    limb.push(`${x + side * r * Math.cos(t)},${y + r * Math.sin(t)}`);
    term.push(`${x - side * c * r * Math.cos(t)},${y + r * Math.sin(t)}`);
  }
  const pts = [...limb, ...term.reverse()].join(" ");
  return (
    <g>
      <circle cx={x} cy={y} r={r} fill={DARK} stroke={INK} strokeWidth="5" />
      <polygon points={pts} fill={LIT} />
      <circle cx={x} cy={y} r={r} fill="none" stroke={INK} strokeWidth="5" />
    </g>
  );
};

export const MoonPhasesBoard: React.FC<BoardProps> = ({ step, stepFrame }) => {
  const appear = appearer(step, stepFrame);
  const orbit = appear(1, 0, 16);
  const view = appear(2, 0, 16);
  const final = appear(3, 0, 16);

  // Góc Mặt Trăng: bước 0 đứng ở trên; bước 1–2 đi vòng (ngược chiều kim đồng hồ); bước 3 dừng ở phía đối diện Mặt Trời.
  const phi = step === 0 ? 90 : step === 3 ? 0 : 90 + (step === 1 ? stepFrame : stepFrame + 90) * 2.2;
  const a = (phi * Math.PI) / 180;
  const mx = E.x + Math.cos(a) * ORBIT;
  const my = E.y - Math.sin(a) * ORBIT;

  return (
    <g>
      <Sun x={70} y={E.y} r={34} />
      {[-60, -20, 20, 60].map((dy) => (
        <line key={dy} x1={130} y1={E.y + dy} x2={230} y2={E.y + dy} stroke="#F2B21B" strokeWidth="5" strokeDasharray="12 9" />
      ))}

      <circle cx={E.x} cy={E.y} r={ORBIT} fill="none" stroke={INK} strokeWidth="4" strokeDasharray="10 9" opacity={orbit * 0.6} />
      {/* Trái Đất */}
      <circle cx={E.x} cy={E.y} r={E.r} fill="#3D7BD9" stroke={INK} strokeWidth="5" />
      <path d={`M${E.x - 18} ${E.y - 12} q14 -12 26 0 q-4 14 -22 10 z`} fill="#6DBE45" />
      <Label x={E.x} y={E.y + E.r + 30} text="TRÁI ĐẤT" size={20} opacity={step >= 1 ? 1 : 0} />

      {/* Đường nhìn từ Trái Đất tới Mặt Trăng */}
      {step >= 2 ? <line x1={E.x} y1={E.y} x2={mx} y2={my} stroke={INK} strokeWidth="3" strokeDasharray="6 6" opacity={view} /> : null}
      <MoonTop x={mx} y={my} />
      <Label x={570} y={95} text="NỬA SÁNG, NỬA TỐI" size={22} opacity={step === 0 ? appear(0, 6) : 0} />

      {/* Bên phải: Mặt Trăng mình nhìn thấy */}
      <g opacity={step === 2 ? view : 0}>
        <Label x={760} y={100} text="MÌNH THẤY:" size={26} />
        <MoonPhase x={760} y={200} r={70} phi={phi} />
      </g>
      <g opacity={final}>
        <MoonPhase x={680} y={180} r={58} phi={0} />
        <Label x={680} y={275} text="TRÒN" size={26} />
        <MoonPhase x={850} y={180} r={58} phi={125} />
        <Label x={850} y={275} text="KHUYẾT" size={26} />
      </g>

      <Caption captions={CAPTIONS} step={step} />
    </g>
  );
};
