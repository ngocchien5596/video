/**
 * Sơ đồ "Vì sao đom đóm phát sáng?" (4 bước):
 *   0  Ở bụng có chiếc đèn nhỏ chứa hai chất, tự chúng không sáng
 *   1  Như que phát sáng: đom đóm cho khí ôxy vào đèn, xảy ra phản ứng hoá học
 *   2  Phản ứng tạo ra ánh sáng, gần như không toả nóng
 *   3  Nháy đèn theo kiểu riêng để tìm bạn cùng loài
 * Nguồn: Ask Dr. Universe – WSU (What makes fireflies light up at night?), National Park Service (Fireflies, Great Smoky Mountains).
 */
import React from "react";
import type { BoardProps } from "../../../../engine/stage/board.tsx";
import { appearer, Caption, INK, Label } from "./common.tsx";

const CAPTIONS = ["Bụng đom đóm có một chiếc đèn", "Khí ôxy vào: phản ứng hoá học", "Sáng mà gần như không nóng", "Nháy đèn để tìm bạn"];

const GLOW = "#D8F25A";

/** Đom đóm quay sang phải, `light` 0..1 là độ sáng của đèn ở bụng. */
const Firefly: React.FC<{ x: number; y: number; s?: number; light: number }> = ({ x, y, s = 1, light }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} stroke={INK} strokeWidth="4" strokeLinejoin="round">
    {light > 0 ? <circle cx="-62" cy="6" r={40 + light * 30} fill={GLOW} opacity={light * 0.45} stroke="none" /> : null}
    <ellipse cx="-10" cy="-26" rx="46" ry="16" fill="#E9EEF7" opacity="0.85" transform="rotate(-18 -10 -26)" />
    <ellipse cx="-58" cy="6" rx="30" ry="22" fill={light > 0 ? GLOW : "#BFB98A"} />
    <ellipse cx="0" cy="0" rx="40" ry="22" fill="#3A2E28" />
    <circle cx="46" cy="-2" r="16" fill="#E5484D" />
    <circle cx="52" cy="-6" r="4" fill="#FFFFFF" strokeWidth="0" />
    <path d="M56 -14 Q70 -40 86 -36 M50 -16 Q58 -44 72 -46" fill="none" strokeWidth="3" />
  </g>
);

export const W2FireflyBoard: React.FC<BoardProps> = ({ step, stepFrame, frame }) => {
  const appear = appearer(step, stepFrame);
  const zoom = appear(0, 6, 16);
  const oxy = appear(1, 0, 30);
  const bright = appear(2, 0, 16);
  const blink = appear(3, 0, 14);
  const light = step < 2 ? (step === 1 ? oxy * 0.5 : 0) : 1;
  const IN = { x: 650, y: 200, r: 110 };

  // Bước 3: hai bạn đom đóm nháy theo nhịp riêng.
  const on = (k: number) => (Math.floor((frame + k) / 12) % 3 === 0 ? 1 : 0.15);

  return (
    <g>
      <rect x="10" y="56" width="940" height="288" rx="24" fill="#1B2440" />

      <Firefly x={260} y={200} s={1.6} light={step === 3 ? on(0) : light} />

      {/* Kính lúp nhìn vào đèn (bước 0–2) */}
      {step <= 2 ? (
        <g opacity={zoom}>
          <line x1={190} y1={206} x2={IN.x - IN.r} y2={IN.y} stroke="#FFFFFF" strokeWidth="3" strokeDasharray="8 8" />
          <circle cx={IN.x} cy={IN.y} r={IN.r} fill={step === 2 ? "#F4FBC9" : "#3A3F5C"} stroke="#FFFFFF" strokeWidth="6" />
          {/* Hai chất: hình tròn và hình vuông */}
          <circle cx={IN.x - 40} cy={IN.y + 10} r="22" fill="#F2B21B" stroke={INK} strokeWidth="4" />
          <rect x={IN.x + 18} y={IN.y - 12} width="42" height="42" rx="8" fill="#8E44AD" stroke={INK} strokeWidth="4" />
          <Label x={IN.x} y={IN.y - 50} text="HAI CHẤT" opacity={step === 0 ? 1 : 0} size={24} color="#FFFFFF" />
          {/* Bong bóng khí ôxy bay vào */}
          {step >= 1
            ? [0, 1, 2, 3].map((i) => {
                const t = Math.min(1, Math.max(0, oxy * 1.6 - i * 0.2));
                return t > 0 ? (
                  <g key={i} opacity={step === 1 ? 1 : 0.4}>
                    <circle cx={IN.x + 150 - t * 140 + i * 6} cy={IN.y - 70 + i * 40} r="13" fill="#7FC8F8" stroke={INK} strokeWidth="3" />
                  </g>
                ) : null;
              })
            : null}
          {step >= 2 ? <circle cx={IN.x} cy={IN.y} r={IN.r - 8} fill={GLOW} opacity={0.5 * bright} /> : null}
        </g>
      ) : null}

      <Label x={IN.x} y={IN.y + IN.r + 30} text="TỰ NÓ CHƯA SÁNG" opacity={step === 0 ? zoom : 0} size={22} color="#FFFFFF" />
      <Label x={IN.x + 190} y={108} text="KHÍ ÔXY" opacity={step === 1 ? oxy : 0} size={24} color="#7FC8F8" />
      <Label x={IN.x} y={IN.y + IN.r + 30} text="PHẢN ỨNG HOÁ HỌC" opacity={step === 1 ? oxy : 0} size={22} color="#FFFFFF" />

      {/* Bước 2: sáng mà mát (nhiệt kế thấp) */}
      <g opacity={step === 2 ? bright : 0}>
        <rect x="846" y="120" width="26" height="140" rx="13" fill="#FFFFFF" stroke={INK} strokeWidth="4" />
        <circle cx="859" cy="272" r="22" fill="#7FC8F8" stroke={INK} strokeWidth="4" />
        <rect x="852" y="226" width="14" height="40" fill="#7FC8F8" />
        <Label x={IN.x} y={IN.y + IN.r + 30} text="GẦN NHƯ KHÔNG NÓNG" size={22} color={GLOW} />
      </g>

      {/* Bước 3: hai bạn đom đóm nháy đèn đáp lại */}
      <g opacity={blink}>
        <Firefly x={700} y={120} s={0.8} light={on(4)} />
        <Firefly x={820} y={270} s={0.8} light={on(8)} />
        <Label x={620} y={320} text="NHÁY ĐÈN TÌM BẠN" size={28} color={GLOW} />
      </g>

      <Caption captions={CAPTIONS} step={step} />
    </g>
  );
};
