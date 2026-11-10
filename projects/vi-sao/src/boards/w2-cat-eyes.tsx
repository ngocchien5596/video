/**
 * Sơ đồ "Vì sao mắt mèo sáng lên trong đêm?" (4 bước):
 *   0  Phía sau mắt mèo có một lớp đặc biệt, biết hắt ánh sáng trở lại
 *   1  Ánh sáng vào mắt, chạm lớp ấy thì bị hắt ngược lại: dùng thêm lần nữa
 *   2  Con ngươi mèo mở to gấp ba con ngươi người; nhìn trong tối giỏi gấp sáu
 *   3  Đèn chiếu vào: lớp ấy hắt ánh sáng ra, mắt mèo trông như sáng xanh hay đỏ
 * Nguồn: San Diego Zoo (Small cats), National Park Service (eyeshine), Ask Extension (Human and cat eyes).
 */
import React from "react";
import type { BoardProps } from "../../../../engine/stage/board.tsx";
import { appearer, Arrow, Caption, INK, Label } from "./common.tsx";

const CAPTIONS = ["Sau mắt mèo: một lớp hắt sáng", "Ánh sáng bị hắt lại, dùng thêm lần nữa", "Con ngươi to: nhìn trong tối giỏi hơn", "Đèn chiếu vào: mắt mèo ánh lên"];

const NIGHT = "#1B2440";
const LIGHT = "#FFE066";
const SHINE = "#7CFC9A";

/** Mắt cắt ngang: tròng mắt ở bên trái, lớp hắt sáng ở mặt sau (bên phải). */
const EyeCut: React.FC<{ cx: number; cy: number; layer: number }> = ({ cx, cy, layer }) => (
  <g>
    <circle cx={cx} cy={cy} r="110" fill="#F7F3E8" stroke={INK} strokeWidth="6" />
    <path d={`M${cx - 104} ${cy - 40} Q${cx - 132} ${cy} ${cx - 104} ${cy + 40}`} fill="#BFE3F7" stroke={INK} strokeWidth="4" />
    <rect x={cx - 112} y={cy - 22} width="14" height="44" fill={INK} />
    <path
      d={`M${cx + 40} ${cy - 100} A110 110 0 0 1 ${cx + 40} ${cy + 100}`}
      fill="none"
      stroke={SHINE}
      strokeWidth="16"
      opacity={0.3 + layer * 0.7}
    />
  </g>
);

const CatFace: React.FC<{ x: number; y: number; glow: number; pupil: number }> = ({ x, y, glow, pupil }) => (
  <g transform={`translate(${x} ${y})`} stroke={INK} strokeWidth="5" strokeLinejoin="round">
    <path d="M-70 -40 L-60 -100 L-20 -66 Z M70 -40 L60 -100 L20 -66 Z" fill="#6D6875" />
    <ellipse cx="0" cy="0" rx="86" ry="72" fill="#6D6875" />
    {[-32, 32].map((ex) => (
      <g key={ex}>
        <ellipse cx={ex} cy="-10" rx="20" ry="16" fill={glow > 0 ? SHINE : "#C9D6A3"} opacity={0.5 + glow * 0.5} />
        <ellipse cx={ex} cy="-10" rx={3 + pupil * 12} ry="15" fill={INK} stroke="none" opacity={1 - glow * 0.7} />
      </g>
    ))}
    <path d="M-8 18 L8 18 L0 28 Z" fill="#F4B6C2" strokeWidth="3" />
  </g>
);

export const W2CatEyesBoard: React.FC<BoardProps> = ({ step, stepFrame, frame }) => {
  const appear = appearer(step, stepFrame);
  const layer = appear(0, 6, 18);
  const ray = appear(1, 0, 30);
  const pupil = appear(2, 0, 24);
  const glow = appear(3, 10, 20);
  const beam = appear(3, 0, 14);
  const E = { cx: 560, cy: 205 };

  return (
    <g>
      <rect x="10" y="56" width="940" height="288" rx="24" fill={NIGHT} />

      {step <= 1 ? (
        <g>
          <EyeCut cx={E.cx} cy={E.cy} layer={layer} />
          <Label x={E.cx + 230} y={E.cy - 20} text="LỚP HẮT SÁNG" opacity={layer} size={24} color={SHINE} />
          <Arrow x1={E.cx + 150} y1={E.cy - 10} x2={E.cx + 112} y2={E.cy} color={SHINE} width={5} p={layer} />
          <Label x={E.cx - 300} y={E.cy + 120} text="MẮT MÈO (CẮT NGANG)" size={20} color="#FFFFFF" />
          {/* Bước 1: tia sáng vào, chạm lớp sau, hắt ngược lại */}
          <Arrow x1={E.cx - 380} y1={E.cy - 30} x2={E.cx + 96} y2={E.cy - 10} color={LIGHT} width={7} p={Math.min(1, ray * 2)} />
          <Arrow x1={E.cx + 96} y1={E.cy + 10} x2={E.cx - 40} y2={E.cy + 30} color={LIGHT} width={7} p={Math.max(0, ray * 2 - 1)} dashed />
          <Label x={210} y={112} text="HẮT LẠI:" opacity={Math.max(0, ray * 2 - 1)} size={24} color={LIGHT} />
          <Label x={210} y={142} text="DÙNG THÊM LẦN NỮA" opacity={Math.max(0, ray * 2 - 1)} size={22} color={LIGHT} />
        </g>
      ) : (
        <g>
          {/* Bước 2: so con ngươi người và mèo */}
          <g opacity={step === 2 ? 1 : 0}>
            <ellipse cx="190" cy="190" rx="60" ry="36" fill="#FFFFFF" stroke={INK} strokeWidth="5" />
            <circle cx="190" cy="190" r="12" fill={INK} />
            <Label x={190} y={260} text="NGƯỜI" size={24} color="#FFFFFF" />
          </g>
          <CatFace x={520} y={210} glow={glow} pupil={step === 2 ? pupil : 1} />
          <g opacity={step === 2 ? pupil : 0}>
            <Label x={800} y={160} text="CON NGƯƠI" size={24} color="#FFFFFF" />
            <Label x={800} y={192} text="TO GẤP 3" size={26} color={LIGHT} />
            <Label x={800} y={244} text="NHÌN TRONG TỐI" size={22} color="#FFFFFF" />
            <Label x={800} y={274} text="GIỎI GẤP 6" size={26} color={LIGHT} />
          </g>
          {/* Bước 3: đèn pin chiếu vào, mắt ánh lên */}
          <g opacity={beam}>
            <rect x="80" y="292" width="90" height="34" rx="8" fill="#9AA6B8" stroke={INK} strokeWidth="4" transform="rotate(-14 125 309)" />
            <path d="M168 286 L440 170 L440 240 Z" fill={LIGHT} opacity={0.35 + Math.sin(frame * 0.3) * 0.05} />
            <Label x={800} y={200} text="ÁNH LÊN" opacity={glow} size={30} color={SHINE} />
            <Label x={800} y={236} text="XANH HAY ĐỎ" opacity={glow} size={22} color="#FFFFFF" />
          </g>
        </g>
      )}

      <Caption captions={CAPTIONS} step={step} />
    </g>
  );
};
