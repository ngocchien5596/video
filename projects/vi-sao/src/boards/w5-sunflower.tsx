/**
 * Sơ đồ "Vì sao hoa hướng dương quay theo Mặt Trời?" (4 bước):
 *   0  Cây non buổi sáng: ngọn hướng về phía đông, nơi Mặt Trời mọc
 *   1  Ban ngày: ngọn nghiêng dần theo Mặt Trời sang tây
 *   2  Ban đêm: quay ngược về đông chờ bình minh, nhờ "đồng hồ" bên trong
 *   3  Đã nở hoa: đứng yên quay về đông, nắng sớm sưởi ấm, nhiều côn trùng tới
 * Nguồn: Cambridge University Botanic Garden (Sunflower – Plant rhythms trail),
 *        Takács et al. 2022, Frontiers in Plant Science (Mature Sunflower Inflorescences Face Geographical East).
 */
import React from "react";
import type { BoardProps } from "../../../../engine/stage/board.tsx";
import { appearer, Caption, INK, Label, Sun } from "./common.tsx";

const CAPTIONS = ["Sáng: cây non hướng về đông", "Ban ngày: nghiêng theo sang tây", "Ban đêm: quay về đông chờ sáng", "Nở hoa: đứng yên, hướng đông"];

const GROUND = 300;
const P = { x: 480 };

/** Cây hướng dương; `lean` -1 (nghiêng đông, bên trái) .. 1 (nghiêng tây, bên phải). */
const Plant: React.FC<{ lean: number; bloom: boolean }> = ({ lean, bloom }) => {
  const top = { x: P.x + lean * 60, y: GROUND - 175 + Math.abs(lean) * 12 };
  const head = { x: top.x + lean * 22, y: top.y - 6 };
  return (
    <g stroke={INK} strokeLinejoin="round">
      <path d={`M${P.x} ${GROUND} Q${P.x} ${GROUND - 110} ${top.x} ${top.y}`} fill="none" stroke="#3FA34D" strokeWidth="10" />
      <path d={`M${P.x} ${GROUND - 60} q-50 -20 -60 -4 q30 22 60 4 Z M${P.x} ${GROUND - 100} q50 -20 60 -4 q-30 22 -60 4 Z`} fill="#5DB04A" strokeWidth="4" />
      {bloom ? (
        <g transform={`translate(${head.x} ${head.y}) scale(0.8)`}>
          {Array.from({ length: 14 }, (_, i) => (
            <ellipse key={i} cx="0" cy="-44" rx="11" ry="22" fill="#FFD93D" strokeWidth="3" transform={`rotate(${i * (360 / 14)})`} />
          ))}
          {/* Mặt hoa nghiêng về phía đông (bên trái) */}
          <ellipse cx="-6" cy="0" rx="26" ry="32" fill="#7A4A1E" strokeWidth="4" />
        </g>
      ) : (
        <g transform={`translate(${head.x} ${head.y}) rotate(${lean * 40})`}>
          <ellipse cx="0" cy="0" rx="20" ry="24" fill="#5DB04A" strokeWidth="4" />
          <path d="M-14 -14 L0 -30 L14 -14" fill="none" stroke="#2E7D32" strokeWidth="4" />
        </g>
      )}
    </g>
  );
};

const Bee: React.FC<{ x: number; y: number }> = ({ x, y }) => (
  <g transform={`translate(${x} ${y})`} stroke={INK} strokeWidth="3">
    <ellipse cx="-4" cy="-12" rx="9" ry="7" fill="#FFFFFF" opacity="0.9" />
    <ellipse cx="0" cy="0" rx="14" ry="9" fill="#FFD93D" />
    <line x1="-3" y1="-8" x2="-3" y2="8" strokeWidth="4" />
    <line x1="5" y1="-7" x2="5" y2="7" strokeWidth="4" />
  </g>
);

export const W5SunflowerBoard: React.FC<BoardProps> = ({ step, stepFrame, frame }) => {
  const appear = appearer(step, stepFrame);
  const day = appear(1, 0, 70);
  const back = appear(2, 10, 50);
  const night = step === 2 ? Math.min(1, appear(2, 0, 14)) : 0;

  // Mặt Trời đi theo cung từ đông (trái) sang tây (phải).
  const sunT = step === 1 ? day : step === 2 ? 1 : 0;
  const ang = Math.PI * (1 - sunT);
  const sun = { x: 480 + Math.cos(ang) * 360, y: 270 - Math.sin(ang) * 170 - (sunT > 0 && sunT < 1 ? 0 : -10) };
  const lean = step === 0 ? -1 : step === 1 ? -1 + day * 2 : step === 2 ? 1 - back * 2 : -0.4;

  return (
    <g>
      {/* Đêm: phủ nền tối */}
      <rect x="0" y="50" width="960" height={GROUND - 50} fill="#1B2440" opacity={night * 0.85} />
      {night > 0 ? <circle cx="760" cy="110" r="26" fill="#FFF4C2" opacity={night} /> : null}

      {step <= 1 || step === 3 ? <Sun x={step === 3 ? 140 : sun.x} y={step === 3 ? 200 : sun.y} r={30} /> : null}
      {step === 1 ? (
        <path d="M120 270 A360 170 0 0 1 840 270" fill="none" stroke="#F2B21B" strokeWidth="3" strokeDasharray="10 10" />
      ) : null}

      <rect x="0" y={GROUND} width="960" height={350 - GROUND} fill="#8BC34A" />
      <line x1="0" y1={GROUND} x2="960" y2={GROUND} stroke={INK} strokeWidth="5" />
      <Label x={70} y={334} text="ĐÔNG" size={26} />
      <Label x={890} y={334} text="TÂY" size={26} />

      <Plant lean={lean} bloom={step === 3} />

      <Label x={480} y={334} text="ĐỒNG HỒ TRONG CÂY" opacity={night} size={22} color="#FFFFFF" />
      <Label x={250} y={120} text="QUAY VỀ ĐÔNG" opacity={step === 2 ? back : 0} size={26} color="#FFFFFF" />

      {/* Bước 3: nắng sớm sưởi ấm, ong bướm tới */}
      {step === 3 ? (
        <g opacity={appear(3, 6, 16)}>
          <Bee x={330 + Math.sin(frame * 0.12) * 20} y={110 + Math.cos(frame * 0.15) * 10} />
          <Bee x={300 + Math.cos(frame * 0.1) * 18} y={170 + Math.sin(frame * 0.13) * 10} />
          <Label x={740} y={140} text="NẮNG SỚM SƯỞI ẤM" size={26} color="#B5892A" />
          <Label x={740} y={180} text="NHIỀU CÔN TRÙNG TỚI" size={24} />
        </g>
      ) : null}

      <Caption captions={CAPTIONS} step={step} />
    </g>
  );
};
