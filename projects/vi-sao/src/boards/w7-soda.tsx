/**
 * Sơ đồ "Vì sao nước ngọt có ga sủi bọt khi mở nắp?" (4 bước):
 *   0  Nhà máy bơm khí cacbonic vào nước, khí tan vào nước
 *   1  Đóng nắp kín: nhiều khí bị ép chặt, áp suất trong chai rất cao
 *   2  Mở nắp: áp suất giảm, nước không giữ nổi nhiều khí nữa
 *   3  Khí thoát ra thành bong bóng, nổi lên, vỡ xèo xèo
 * Nguồn: Ask Dr. Universe (WSU, K. McMahon), Illinois Physics Van (Soda Explosions!, Soda Equilibria).
 */
import React from "react";
import type { BoardProps } from "../../../../engine/stage/board.tsx";
import { appearer, Arrow, Caption, INK, Label } from "./common.tsx";
import { Bubble, Tag } from "./w7-parts.tsx";

const CAPTIONS = ["Bơm khí cacbonic vào nước", "Đóng nắp kín: áp suất rất cao", "Mở nắp: áp suất giảm xuống", "Khí thoát ra thành bong bóng"];

const B = { x: 300, top: 145, bottom: 342, w: 130 };
const DOTS = Array.from({ length: 24 }, (_, i) => [((i * 37) % 100) / 100, ((i * 61) % 100) / 100]);

const Gauge: React.FC<{ x: number; y: number; level: number; opacity: number }> = ({ x, y, level, opacity }) => {
  const a = Math.PI * (1 - level);
  return (
    <g opacity={opacity}>
      <circle cx={x} cy={y} r={56} fill="#FFFFFF" stroke={INK} strokeWidth="6" />
      <path d={`M${x - 42} ${y + 6} A42 42 0 0 1 ${x + 42} ${y + 6}`} fill="none" stroke="#E5E7EB" strokeWidth="10" />
      <path d={`M${x + 18} ${y - 37} A42 42 0 0 1 ${x + 42} ${y + 6}`} fill="none" stroke="#E5484D" strokeWidth="10" />
      <line x1={x} y1={y + 6} x2={x + Math.cos(a) * 40} y2={y + 6 - Math.sin(a) * 40} stroke={INK} strokeWidth="6" strokeLinecap="round" />
      <circle cx={x} cy={y + 6} r={7} fill={INK} />
    </g>
  );
};

export const SodaBoard: React.FC<BoardProps> = ({ step, stepFrame, frame }) => {
  const appear = appearer(step, stepFrame);
  const pump = appear(0, 2, 24);
  const close = appear(1, 0, 14);
  const open = appear(2, 0, 14);
  const fizz = appear(3, 0, 14);
  const level = step >= 2 ? 0.85 - 0.7 * open : step === 1 ? 0.2 + 0.65 * close : 0.2;
  const capLift = open * 12;
  const capSlide = open * 80;
  const squeeze = step === 1 ? 1 - 0.35 * close : 1;
  const left = B.x - B.w / 2;

  return (
    <g>
      {/* Chai */}
      <path
        d={`M${B.x - 26} ${B.top - 50} L${B.x + 26} ${B.top - 50} L${B.x + 26} ${B.top - 20} C${B.x + 60} ${B.top} ${B.x + B.w / 2} ${B.top + 10} ${B.x + B.w / 2} ${B.top + 40}
          L${B.x + B.w / 2} ${B.bottom - 14} Q${B.x + B.w / 2} ${B.bottom} ${B.x + B.w / 2 - 14} ${B.bottom} L${left + 14} ${B.bottom} Q${left} ${B.bottom} ${left} ${B.bottom - 14}
          L${left} ${B.top + 40} C${left} ${B.top + 10} ${B.x - 60} ${B.top} ${B.x - 26} ${B.top - 20} Z`}
        fill="#E3F4E8"
        stroke={INK}
        strokeWidth="6"
        strokeLinejoin="round"
      />
      <rect x={left + 10} y={B.top + 40} width={B.w - 20} height={B.bottom - B.top - 50} rx={8} fill="#F5C27A" opacity={0.75} />
      {/* Nắp: đậy ở bước 1, bật lên ở bước 2 */}
      {step >= 1 ? <rect x={B.x - 32 + capSlide} y={B.top - 66 - capLift} width={64} height={18} rx={5} fill="#E5484D" stroke={INK} strokeWidth="4" opacity={step >= 1 ? close : 0} /> : null}

      {/* Khí tan trong nước (chấm nhỏ) */}
      {step <= 2
        ? DOTS.map(([u, v], i) => {
            const k = Math.max(0, Math.min(1, pump * 1.5 - i * 0.02));
            const cx = B.x + (u - 0.5) * (B.w - 40) * squeeze;
            const cy = B.top + 70 + v * (B.bottom - B.top - 100);
            return <circle key={i} cx={cx} cy={cy} r={4} fill="#6B4E2E" opacity={k} />;
          })
        : null}

      {/* Bước 0: bình khí của nhà máy bơm vào */}
      {step === 0 ? (
        <g opacity={pump}>
          <rect x={620} y={110} width={90} height={190} rx={40} fill="#9CC9F0" stroke={INK} strokeWidth="6" />
          <Label x={665} y={215} text="KHÍ" size={26} />
          <Arrow x1={610} y1={140} x2={B.x + 40} y2={B.top - 30} color="#3D7BD9" width={7} p={pump} />
          <Tag x={760} y={330} text="KHÍ CACBONIC" size={24} />
        </g>
      ) : null}

      {/* Bước 1–2: đồng hồ áp suất */}
      <Gauge x={680} y={180} level={level} opacity={step >= 1 && step <= 2 ? 1 : 0} />
      <Tag x={680} y={290} text="ÁP SUẤT RẤT CAO" size={24} color="#C0392B" opacity={step === 1 ? close : 0} />
      <Tag x={680} y={290} text="ÁP SUẤT GIẢM" size={24} color="#2C5FAD" opacity={step === 2 ? open : 0} />
      {step === 2 ? <Arrow x1={B.x + 30} y1={B.top - 30} x2={B.x + 110} y2={B.top - 30} color={INK} width={5} p={open} /> : null}

      {/* Bước 3: bong bóng nổi lên, xèo xèo */}
      {fizz > 0
        ? Array.from({ length: 10 }, (_, i) => {
            const t = (stepFrame / 28 + i * 0.1) % 1;
            const x = B.x + ((i * 29) % 80) - 40 + Math.sin(frame / 5 + i) * 4;
            const y = B.bottom - 20 - t * (B.bottom - B.top - 10) - (t > 0.8 ? (t - 0.8) * 200 : 0);
            return (
              <g key={i} opacity={fizz * (t > 0.85 ? (1 - t) / 0.15 : 1)}>
                <Bubble x={x} y={y} r={7 + 5 * t} />
              </g>
            );
          })
        : null}
      <Label x={660} y={170} text="XÈO XÈO!" size={52} color="#C26A00" opacity={fizz} />
      <Tag x={660} y={260} text="KHÍ THOÁT RA" size={26} opacity={fizz} />

      <Caption captions={CAPTIONS} step={step} />
    </g>
  );
};
