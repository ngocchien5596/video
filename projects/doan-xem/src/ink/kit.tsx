/**
 * Bộ vẽ mực cho "Đoán Xem Là Ai": giấy dó, nét mực rung, mảng mực loang, bóng người, đồ vật.
 * Mọi cảnh vẽ trong khung SVG 960×1000 (vùng tranh của cuộn giấy). Nhân vật chỉ là bóng (series bible mục 2).
 */
import React from "react";
import { Easing, interpolate } from "remotion";
import { INK } from "../brand.ts";

export const W = 960;
export const H = 1000;

export const clamp01 = (x: number) => Math.min(1, Math.max(0, x));
/** Tiến độ có gia tốc của đoạn [a, b] trong p. */
export const seg = (p: number, a: number, b: number) =>
  interpolate(p, [a, b], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic) });

/** Bộ lọc dùng chung: nét rung (rough), mực loang (wash), quầng mờ (mist). Đặt một lần trong mỗi SVG cảnh. */
export const InkDefs: React.FC<{ id: string }> = ({ id }) => (
  <defs>
    <filter id={`${id}-rough`} x="-10%" y="-10%" width="120%" height="120%">
      <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves={2} seed={3} result="n" />
      <feDisplacementMap in="SourceGraphic" in2="n" scale={7} xChannelSelector="R" yChannelSelector="G" />
    </filter>
    <filter id={`${id}-wash`} x="-30%" y="-30%" width="160%" height="160%">
      <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves={3} seed={8} result="n" />
      <feDisplacementMap in="SourceGraphic" in2="n" scale={26} xChannelSelector="R" yChannelSelector="G" result="d" />
      <feGaussianBlur in="d" stdDeviation={5} />
    </filter>
    <filter id={`${id}-mist`} x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation={18} />
    </filter>
    <radialGradient id={`${id}-dark`} cx="50%" cy="50%" r="60%">
      <stop offset="0" stopColor={INK.ink} stopOpacity={0.15} />
      <stop offset="0.6" stopColor={INK.ink} stopOpacity={0.6} />
      <stop offset="1" stopColor={INK.ink} stopOpacity={0} />
    </radialGradient>
    <linearGradient id={`${id}-fade`} x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor={INK.ink} stopOpacity={0.75} />
      <stop offset="1" stopColor={INK.ink} stopOpacity={0} />
    </linearGradient>
  </defs>
);

/** Dãy núi mực: mỗi lớp nhạt dần về xa, chân núi tan vào sương. */
export const Mountains: React.FC<{ id: string; baseY: number; layers?: number; tall?: number; drift?: number }> = ({ id, baseY, layers = 3, tall = 1, drift = 0 }) => (
  <g>
    {Array.from({ length: layers }).map((_, k) => {
      const depth = layers - k; // xa trước
      const amp = (120 + depth * 50) * tall;
      const y0 = baseY - depth * 60;
      const off = (k * 173 + drift * (depth * 6)) % 240;
      const pts: string[] = [];
      for (let x = -120; x <= W + 120; x += 60) {
        const h = Math.abs(Math.sin((x + off) / (110 + k * 30))) * amp * (0.55 + 0.45 * Math.sin((x + off * 2) / 230 + k));
        pts.push(`${x},${y0 - h}`);
      }
      return (
        <path
          key={k}
          d={`M-120,${y0 + 200} L${pts.join(" L")} L${W + 120},${y0 + 200} Z`}
          fill={`url(#${id}-fade)`}
          opacity={0.25 + (k / layers) * 0.5}
          filter={`url(#${id}-wash)`}
        />
      );
    })}
  </g>
);

/** Mái ngói cong đầu đao kiểu nhà Việt: thân mái, bờ nóc, hai đầu đao vểnh. */
export const Roof: React.FC<{ id: string; x: number; y: number; w: number; tone?: number }> = ({ id, x, y, w, tone = 1 }) => {
  const h = w * 0.32;
  return (
    <g filter={`url(#${id}-rough)`} opacity={tone}>
      {/* thân nhà */}
      <rect x={x - w * 0.36} y={y + h * 0.55} width={w * 0.72} height={h * 0.95} fill={INK.paperDeep} stroke={INK.ink} strokeWidth={4} />
      {[...Array(5)].map((_, i) => (
        <line key={i} x1={x - w * 0.3 + i * w * 0.15} y1={y + h * 0.6} x2={x - w * 0.3 + i * w * 0.15} y2={y + h * 1.5} stroke={INK.inkSoft} strokeWidth={5} />
      ))}
      {/* mái */}
      <path
        d={`M${x - w * 0.56},${y + h * 0.42} Q${x - w * 0.5},${y + h * 0.62} ${x - w * 0.36},${y + h * 0.6} L${x + w * 0.36},${y + h * 0.6} Q${x + w * 0.5},${y + h * 0.62} ${x + w * 0.56},${y + h * 0.42} L${x + w * 0.42},${y + h * 0.1} L${x - w * 0.42},${y + h * 0.1} Z`}
        fill={INK.ink}
      />
      {/* bờ nóc và đầu đao */}
      <path d={`M${x - w * 0.5},${y + h * 0.06} L${x + w * 0.5},${y + h * 0.06}`} stroke={INK.ink} strokeWidth={10} strokeLinecap="round" />
      <path d={`M${x - w * 0.5},${y + h * 0.06} q-${w * 0.04},-${h * 0.05} -${w * 0.03},-${h * 0.2}`} stroke={INK.ink} strokeWidth={8} fill="none" strokeLinecap="round" />
      <path d={`M${x + w * 0.5},${y + h * 0.06} q${w * 0.04},-${h * 0.05} ${w * 0.03},-${h * 0.2}`} stroke={INK.ink} strokeWidth={8} fill="none" strokeLinecap="round" />
    </g>
  );
};

export type Pose = "stand" | "back" | "walk" | "hunch" | "bust";

/**
 * Bóng người mặc áo giao lĩnh, đội khăn đóng. (x, y) là chân, s là tỉ lệ (s = 1 cao ~360).
 * Không vẽ mặt. `step` 0..1 cho dáng đi.
 */
export const Figure: React.FC<{ id: string; x: number; y: number; s?: number; pose?: Pose; step?: number; color?: string; hold?: "spear" | "bow" | "none"; flip?: boolean }> = ({
  id,
  x,
  y,
  s = 1,
  pose = "back",
  step = 0,
  color = INK.ink,
  hold = "none",
  flip = false,
}) => {
  const swing = pose === "walk" || pose === "hunch" ? Math.sin(step * Math.PI * 2) * 14 : 0;
  const lean = pose === "hunch" ? 10 : 0;
  return (
    <g transform={`translate(${x},${y}) scale(${flip ? -s : s},${s}) rotate(${lean})`} filter={`url(#${id}-rough)`}>
      {/* chân */}
      <path d={`M-14,-70 L${-18 + swing},0 M14,-70 L${18 - swing},0`} stroke={color} strokeWidth={16} strokeLinecap="round" />
      {/* áo dài vạt */}
      <path d="M-46,-80 Q-56,-160 -34,-235 L34,-235 Q56,-160 46,-80 Q0,-66 -46,-80 Z" fill={color} />
      {/* tay áo rộng */}
      <path d={`M-34,-228 Q-70,-190 ${-64 - swing * 0.4},-128 L${-44 - swing * 0.4},-122 Q-46,-180 -26,-210 Z`} fill={color} />
      <path d={`M34,-228 Q70,-190 ${64 + swing * 0.4},-128 L${44 + swing * 0.4},-122 Q46,-180 26,-210 Z`} fill={color} />
      {/* cổ, đầu, khăn đóng */}
      <rect x={-9} y={-252} width={18} height={20} fill={color} />
      <ellipse cx={0} cy={-278} rx={25} ry={29} fill={color} />
      <path d="M-30,-286 Q0,-322 30,-286 Q32,-270 0,-268 Q-32,-270 -30,-286 Z" fill={color} />
      {pose === "bust" ? null : null}
      {hold === "spear" ? (
        <g>
          <line x1={74} y1={-360} x2={66} y2={0} stroke={color} strokeWidth={7} strokeLinecap="round" />
          <path d="M74,-360 l-10,-40 l20,0 Z" fill={color} />
          <path d="M78,-345 q40,8 62,34 q-36,-4 -60,-14 Z" fill={INK.cinnabar} opacity={0.85} />
        </g>
      ) : null}
      {hold === "bow" ? (
        <g>
          <path d="M70,-300 Q120,-190 70,-80" stroke={color} strokeWidth={8} fill="none" strokeLinecap="round" />
          <line x1={70} y1={-300} x2={70} y2={-80} stroke={color} strokeWidth={2} />
        </g>
      ) : null}
    </g>
  );
};

/** Thanh gươm: lưỡi thẳng, chắn tay, chuôi quấn, tua màu nhấn. Gốc toạ độ ở giữa thanh. */
export const Sword: React.FC<{ id: string; x: number; y: number; len?: number; angle?: number; accent: string; glint?: number; opacity?: number }> = ({
  id,
  x,
  y,
  len = 560,
  angle = -12,
  accent,
  glint = -1,
  opacity = 1,
}) => {
  const half = len / 2;
  const blade = len * 0.7;
  return (
    <g transform={`translate(${x},${y}) rotate(${angle})`} opacity={opacity}>
      <g filter={`url(#${id}-rough)`}>
        <path d={`M${-half + len * 0.3},-14 L${half - 40},-12 L${half},0 L${half - 40},12 L${-half + len * 0.3},14 Z`} fill="#D9D2C2" stroke={INK.ink} strokeWidth={5} />
        <line x1={-half + len * 0.3} y1={0} x2={half - 30} y2={0} stroke={INK.wash} strokeWidth={3} />
        <rect x={-half + len * 0.27} y={-40} width={22} height={80} rx={6} fill={INK.ink} />
        <rect x={-half + 20} y={-12} width={len * 0.27 - 20} height={24} rx={8} fill={INK.inkSoft} stroke={INK.ink} strokeWidth={4} />
        {[...Array(6)].map((_, i) => (
          <line key={i} x1={-half + 34 + i * ((len * 0.27 - 40) / 6)} y1={-12} x2={-half + 46 + i * ((len * 0.27 - 40) / 6)} y2={12} stroke={INK.ink} strokeWidth={3} />
        ))}
        <circle cx={-half + 14} cy={0} r={14} fill={INK.ink} />
      </g>
      <path d={`M${-half + 4},6 q-20,40 -6,96 M${-half + 4},6 q-34,30 -34,86`} stroke={accent} strokeWidth={6} fill="none" strokeLinecap="round" />
      {glint >= 0 && glint <= 1 ? (
        <rect x={-half + len * 0.3 + glint * blade - 30} y={-14} width={60} height={28} fill="#FFFFFF" opacity={0.7 * Math.sin(glint * Math.PI)} />
      ) : null}
    </g>
  );
};

/** Ngọn bút lông: cán tre, ngòi đen. (x, y) là đầu ngòi. */
export const Brush: React.FC<{ id: string; x: number; y: number; angle?: number; s?: number; opacity?: number }> = ({ id, x, y, angle = 35, s = 1, opacity = 1 }) => (
  <g transform={`translate(${x},${y}) rotate(${angle}) scale(${s})`} opacity={opacity} filter={`url(#${id}-rough)`}>
    <path d="M0,0 Q-14,-30 -10,-70 L10,-70 Q14,-30 0,0 Z" fill={INK.ink} />
    <rect x={-12} y={-90} width={24} height={22} fill={INK.inkSoft} />
    <rect x={-10} y={-380} width={20} height={292} rx={6} fill="#B79A63" stroke={INK.ink} strokeWidth={4} />
    {[-300, -210, -140].map((yy) => (
      <line key={yy} x1={-10} y1={yy} x2={10} y2={yy} stroke={INK.ink} strokeWidth={3} />
    ))}
    <circle cx={0} cy={-392} r={9} fill="none" stroke={INK.ink} strokeWidth={4} />
  </g>
);

/** Ngọn nến: thân sáp, bấc, lửa lay (alive 1 → 0 thì tắt, còn khói). */
export const Candle: React.FC<{ id: string; x: number; y: number; h?: number; alive: number; frame: number }> = ({ id, x, y, h = 260, alive, frame }) => {
  const sway = Math.sin(frame / 5 + x) * 4;
  const out = 1 - alive;
  return (
    <g>
      <g filter={`url(#${id}-rough)`}>
        <rect x={x - 34} y={y - h} width={68} height={h} rx={10} fill="#F4ECD8" stroke={INK.ink} strokeWidth={5} />
        <path d={`M${x - 34},${y - h + 14} q12,22 4,48`} stroke={INK.wash} strokeWidth={6} fill="none" />
        <ellipse cx={x} cy={y} rx={70} ry={16} fill={INK.ink} />
        <line x1={x} y1={y - h} x2={x} y2={y - h - 22} stroke={INK.ink} strokeWidth={4} />
      </g>
      {alive > 0.01 ? (
        <g opacity={alive}>
          <circle cx={x} cy={y - h - 50} r={70} fill="#F3C86A" opacity={0.25} filter={`url(#${id}-mist)`} />
          <path d={`M${x},${y - h - 18} q-22,-30 ${sway},-80 q22,50 0,80 Z`} fill="#E89A3C" />
          <path d={`M${x},${y - h - 20} q-9,-16 ${sway * 0.6},-40 q9,24 0,40 Z`} fill="#FFF1B8" />
        </g>
      ) : null}
      {out > 0.01 ? (
        <path
          d={`M${x},${y - h - 22} q${-20 + sway},-60 ${10},-120 q${30},-60 ${-6},-150`}
          stroke={INK.wash}
          strokeWidth={8}
          fill="none"
          strokeLinecap="round"
          opacity={0.6 * Math.sin(Math.min(1, out * 1.2) * Math.PI)}
          filter={`url(#${id}-mist)`}
        />
      ) : null}
    </g>
  );
};

/** Lá cờ đuôi nheo trên cán, bay theo gió. */
export const Banner: React.FC<{ x: number; y: number; h: number; frame: number; color: string; phase?: number }> = ({ x, y, h, frame, color, phase = 0 }) => {
  const wv = Math.sin(frame / 6 + phase) * 14;
  return (
    <g>
      <line x1={x} y1={y} x2={x} y2={y - h} stroke={INK.ink} strokeWidth={8} strokeLinecap="round" />
      <path d={`M${x},${y - h} Q${x + 60},${y - h + 10 + wv} ${x + 130},${y - h + 40} Q${x + 70},${y - h + 70 - wv} ${x},${y - h + 110} Z`} fill={color} />
    </g>
  );
};

/** Một "chữ" giả bằng 3–5 nét bút (ngang, sổ, chấm, phẩy, mác) trong ô vuông; không phải chữ thật (series bible mục 3). */
const glyph = (seed: number, size: number) => {
  const r = (k: number) => {
    const v = Math.sin(seed * 12.9898 + k * 78.233) * 43758.5453;
    return v - Math.floor(v);
  };
  const u = 15 * size;
  const parts: string[] = [];
  const n = 3 + Math.floor(r(1) * 3);
  for (let k = 0; k < n; k++) {
    const kind = Math.floor(r(k + 2) * 5);
    const x = (r(k + 10) - 0.5) * u * 1.2;
    const y = (r(k + 20) - 0.5) * u * 1.2;
    if (kind === 0) parts.push(`M${x - u * 0.8},${y} q${u * 0.8},${-u * 0.15} ${u * 1.6},${u * 0.05}`);
    else if (kind === 1) parts.push(`M${x},${y - u * 0.9} q${u * 0.1},${u * 0.9} ${-u * 0.05},${u * 1.8}`);
    else if (kind === 2) parts.push(`M${x},${y} l${u * 0.25},${u * 0.25}`);
    else if (kind === 3) parts.push(`M${x + u * 0.4},${y - u * 0.6} q${-u * 0.3},${u * 0.7} ${-u * 0.9},${u * 1.0}`);
    else parts.push(`M${x - u * 0.3},${y - u * 0.4} q${u * 0.4},${u * 0.7} ${u * 1.0},${u * 0.9}`);
  }
  return parts.join(" ");
};

/** Cột "chữ" giả viết dần từ trên xuống. */
export const FakeColumn: React.FC<{ x: number; y: number; n: number; reveal: number; step?: number; size?: number; color?: string }> = ({ x, y, n, reveal, step = 46, size = 1, color = INK.ink }) => (
  <g>
    {Array.from({ length: n }).map((_, i) => {
      const on = clamp01(reveal * n - i);
      if (on <= 0) return null;
      return (
        <path
          key={i}
          d={glyph(x * 7 + i * 13 + y, size)}
          transform={`translate(${x},${y + i * step})`}
          stroke={color}
          strokeWidth={5.5 * size}
          strokeLinecap="round"
          fill="none"
          opacity={on}
        />
      );
    })}
  </g>
);
