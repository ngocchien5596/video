import React from "react";
import { TEXT_FONT } from "../components/brand.ts";
import { ease, Pop } from "./anim.tsx";
import { INK, LAYOUT, PARCHMENT, STAGE_S, STAGE_TX, STAGE_TY } from "./ParchmentHud.tsx";
import type { Pose } from "./Stickman.tsx";

/** Bộ dụng cụ dựng cảnh dùng chung: toạ độ, đổi tư thế theo câu, thẻ chữ, dấu ✔ ✖, bảng phấn. */
export type Anim = { li: number; lf: number; bf: number; fps: number; frame: number };

export const GROUND = 780;
export const T = { fontFamily: TEXT_FONT, fontWeight: 900 } as const;

/** Đổi tư thế theo câu: câu `li` dùng `poses[li]`, chuyển dần từ tư thế của câu trước trong ~12 khung. */
export const linePose = (li: number, lf: number, poses: Pose[]) => {
  const at = (i: number) => poses[Math.min(poses.length - 1, Math.max(0, i))];
  return { pose: at(li), prevPose: li > 0 ? at(li - 1) : undefined, poseT: ease(lf, 0, 12) };
};

/** Đổi tư thế giữa câu tại khung `at` (chuyển dần trong `dur` khung). */
export const poseAt = (lf: number, at: number, a: Pose, b: Pose, dur = 12) =>
  lf < at ? { pose: a } : { pose: b, prevPose: a, poseT: ease(lf, at, dur) };

/** Vẽ theo toạ độ khung 1080×1920 (huỷ phép phóng của sân khấu). */
export const Screen: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <g transform={`scale(${1 / STAGE_S}) translate(${-STAGE_TX} ${-STAGE_TY})`}>{children}</g>
);

/** Ước lượng bề rộng chữ (đậm 900) theo cỡ chữ. */
const textW = (s: string, size: number) =>
  [...s].reduce((w, ch) => w + (ch === " " ? 0.28 : /[A-ZĐÂÊÔƠƯĂ0-9%?]/.test(ch) ? 0.7 : /[a-zđ]/.test(ch) ? 0.58 : 0.62), 0) * size;

/** Chọn cỡ chữ và ngắt tối đa 2 dòng để vừa `maxW`. */
export const fitText = (s: string, maxW: number, maxSize: number, minSize: number): { size: number; lines: string[] } => {
  const one = Math.min(maxSize, (maxSize * maxW) / textW(s, maxSize));
  if (one >= minSize) return { size: Math.floor(one), lines: [s] };
  const words = s.split(" ");
  let best: string[] = [s];
  let bestW = Infinity;
  for (let i = 1; i < words.length; i++) {
    const a = words.slice(0, i).join(" ");
    const b = words.slice(i).join(" ");
    const w = Math.max(textW(a, 1), textW(b, 1));
    if (w < bestW) {
      bestW = w;
      best = [a, b];
    }
  }
  return { size: Math.floor(Math.max(minSize * 0.85, Math.min(maxSize, maxW / bestW))), lines: best };
};

/** Thẻ chữ dưới sân khấu (toạ độ khung): tiêu đề ngắn + một dòng chính to; bật ra khi đổi nội dung. */
/**
 * Thẻ tóm tắt dưới sân khấu: TẮT (15/11/2026, chủ kênh: phụ đề lời dẫn đã đủ, thêm thẻ thì quá nhiều chữ).
 * Giữ component để các cảnh không phải sửa; đổi SHOW_CARD = true nếu muốn bật lại.
 */
export const SHOW_CARD = false;

export const Card: React.FC<{ title: string; formula: string; p: number; fp?: number; ok?: boolean }> = ({ title, formula, p, fp = 1, ok = true }) => {
  if (!SHOW_CARD) return null;
  const { x, y, w, h } = LAYOUT.card;
  const tt = fitText(title, w - 70, 36, 28);
  const ff = fitText(formula, w - 90, 58, 44);
  const accent = ok ? PARCHMENT.gold : PARCHMENT.red;
  const lineH = ff.size * 1.12;
  const fy = y + 160 - ((ff.lines.length - 1) * lineH) / 2 + ff.size * 0.35;
  return (
    <Screen>
      <Pop p={p} cx={x + w / 2} cy={y + h / 2}>
        <rect x={x + 4} y={y + 8} width={w} height={h} rx={24} fill="rgba(0,0,0,0.35)" />
        <rect x={x} y={y} width={w} height={h} rx={24} fill={PARCHMENT.bgCard} stroke={accent} strokeWidth={4} />
        <text x={x + w / 2} y={y + 56} textAnchor="middle" fill={accent} fontSize={tt.lines.length > 1 ? 28 : tt.size} letterSpacing={1} {...T}>
          {tt.lines.join(" ")}
        </text>
        <line x1={x + 60} y1={y + 78} x2={x + w - 60} y2={y + 78} stroke={accent} strokeWidth={2} opacity={0.45} />
        <Pop p={fp} cx={x + w / 2} cy={y + 160}>
          {ff.lines.map((l, i) => (
            <text key={l} x={x + w / 2} y={fy + i * lineH} textAnchor="middle" fill={PARCHMENT.cream} fontSize={ff.size} {...T}>
              {l}
            </text>
          ))}
        </Pop>
      </Pop>
    </Screen>
  );
};

/** Khung thẻ trống (toạ độ khung) để vẽ hình riêng bên trong. */
export const CardFrame: React.FC<{ p: number; ok?: boolean; children: React.ReactNode }> = ({ p, ok = true, children }) => {
  if (!SHOW_CARD) return null;
  const { x, y, w, h } = LAYOUT.card;
  return (
    <Screen>
      <Pop p={p} cx={x + w / 2} cy={y + h / 2}>
        <rect x={x + 4} y={y + 8} width={w} height={h} rx={24} fill="rgba(0,0,0,0.35)" />
        <rect x={x} y={y} width={w} height={h} rx={24} fill={PARCHMENT.bgCard} stroke={ok ? PARCHMENT.gold : PARCHMENT.red} strokeWidth={4} />
        {children}
      </Pop>
    </Screen>
  );
};

/** Dấu ✖ đỏ đóng lên hình. */
export const Cross: React.FC<{ x: number; y: number; p: number; r?: number; bare?: boolean }> = ({ x, y, p, r = 34, bare = false }) => (
  <Pop p={p} cx={x} cy={y}>
    {bare ? null : <circle cx={x} cy={y} r={r + 10} fill="#FFF3E0" stroke={INK.red} strokeWidth={6} />}
    <path
      d={`M${x - r * 0.55} ${y - r * 0.55} L${x + r * 0.55} ${y + r * 0.55} M${x + r * 0.55} ${y - r * 0.55} L${x - r * 0.55} ${y + r * 0.55}`}
      stroke={INK.red}
      strokeWidth={10}
      strokeLinecap="round"
    />
  </Pop>
);

/** Dấu ✔ xanh. */
export const Check: React.FC<{ x: number; y: number; p: number; r?: number; color?: string }> = ({ x, y, p, r = 30, color = INK.green }) => (
  <Pop p={p} cx={x} cy={y}>
    <path d={`M${x - r * 0.7} ${y} L${x - r * 0.15} ${y + r * 0.55} L${x + r * 0.8} ${y - r * 0.6}`} fill="none" stroke={color} strokeWidth={r * 0.32} strokeLinecap="round" strokeLinejoin="round" />
  </Pop>
);

/** Bảng phấn xanh có khung gỗ; mở ra theo chiều ngang (open 0 → 1). */
export const Chalkboard: React.FC<{ x: number; y: number; w: number; h: number; open?: number }> = ({ x, y, w, h, open = 1 }) => (
  <g transform={`translate(${x + w / 2} 0) scale(${Math.max(0.001, open)} 1) translate(${-(x + w / 2)} 0)`}>
    <rect x={x - 12} y={y - 12} width={w + 24} height={h + 24} rx={14} fill={INK.wood} stroke={INK.line} strokeWidth={4} />
    <rect x={x} y={y} width={w} height={h} rx={6} fill="#2F4A3A" stroke="#1E3326" strokeWidth={3} />
    <rect x={x} y={y} width={w} height={h} rx={6} fill="url(#chalk-smudge)" />
  </g>
);

