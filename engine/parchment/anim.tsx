/**
 * Tiện ích chuyển động cho sân khấu giấy da: hiện dần, bật ra, vẽ dần đường thẳng, đếm số.
 * Mọi hàm nhận số khung hình kể từ lúc bắt đầu (của nhịp hoặc của câu) để chuyển động bám theo lời kể.
 */
import React from "react";
import { Easing, interpolate, spring } from "remotion";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

/** 0 → 1 trong `dur` khung hình, bắt đầu sau `delay` khung hình (có làm mượt). */
export const ease = (frame: number, delay = 0, dur = 18) =>
  interpolate(frame, [delay, delay + dur], [0, 1], { ...clamp, easing: Easing.out(Easing.cubic) });

/** Lò xo bật ra 0 → 1 (vượt nhẹ quá 1 rồi về). */
export const pop = (frame: number, fps: number, delay = 0) =>
  frame < delay ? 0 : spring({ frame: frame - delay, fps, config: { damping: 10, stiffness: 190 } });

/** Bật ra quanh tâm (cx, cy): phóng to từ 0 kèm hiện dần. */
export const Pop: React.FC<{ p: number; cx: number; cy: number; children: React.ReactNode }> = ({ p, cx, cy, children }) =>
  p <= 0.001 ? null : (
    <g opacity={Math.min(1, p * 1.6)} transform={`translate(${cx} ${cy}) scale(${p}) translate(${-cx} ${-cy})`}>
      {children}
    </g>
  );

/** Hiện dần, kèm trượt lên `dy` px. */
export const Fade: React.FC<{ p: number; dy?: number; children: React.ReactNode }> = ({ p, dy = 0, children }) =>
  p <= 0.001 ? null : (
    <g opacity={p} transform={`translate(0 ${(1 - p) * dy})`}>
      {children}
    </g>
  );

/** Đường thẳng vẽ dần từ (x1, y1) tới (x2, y2) theo tiến độ p. */
export const DrawLine: React.FC<React.SVGProps<SVGLineElement> & { p: number; x1: number; y1: number; x2: number; y2: number }> = ({
  p,
  x1,
  y1,
  x2,
  y2,
  ...rest
}) => (p <= 0.001 ? null : <line x1={x1} y1={y1} x2={x1 + (x2 - x1) * p} y2={y1 + (y2 - y1) * p} {...rest} />);

/** Đường gấp khúc / đa giác vẽ dần theo chiều dài (p: 0 → 1). */
export const DrawPath: React.FC<React.SVGProps<SVGPathElement> & { p: number; length: number }> = ({ p, length, ...rest }) =>
  p <= 0.001 ? null : <path strokeDasharray={`${length * p} ${length}`} {...rest} />;

/** Số đếm dần từ `from` tới `to` (giữ `digits` chữ số thập phân, dấu phẩy kiểu Việt). */
export const countUp = (p: number, to: number, digits = 0, from = 0) =>
  (from + (to - from) * p).toFixed(digits).replace(".", ",");

/** Dao động mượt quanh 0 (dùng cho lắc lư, nhấp nháy). */
export const wave = (frame: number, speed = 0.1, amp = 1, phase = 0) => Math.sin(frame * speed + phase) * amp;
