/**
 * Nét mặt và kiểu "vai" dùng chung cho con rối (Character.tsx) và các vai truyện (engine/stage/story).
 * Khung vẽ con rối: 360 × 560, quay mặt sang phải, đầu khoảng y 108–290, tâm x = 180,
 * thân y 300–480, hông y 452, vai trước (240, 324), vai sau (120, 324).
 */
import React from "react";
import type { Expr } from "../lib/stage-types.ts";
import { INK } from "./draw.tsx";

export type Look = {
  skin: string;
  sleeve: string;
  legs: string;
  shoe: string;
  /** Độ dày tay (mặc định 22). */
  arm?: number;
};

export type FaceGeo = { eyeL: number; eyeR: number; eyeY: number; browY: number; mouthY: number; browColor: string };

export const Eyes: React.FC<{ expr: Expr; g: FaceGeo; blink: boolean; big: boolean }> = ({ expr, g, blink, big }) => {
  const r = big ? 11 : 7;
  return (
    <>
      {[g.eyeL, g.eyeR].map((x) => {
        if (expr === "happy") {
          return (
            <path
              key={x}
              d={`M${x - 12} ${g.eyeY + 4} Q${x} ${g.eyeY - 12} ${x + 12} ${g.eyeY + 4}`}
              fill="none"
              stroke={INK}
              strokeWidth="6"
              strokeLinecap="round"
            />
          );
        }
        if (expr === "shock") {
          return (
            <g key={x}>
              <circle cx={x} cy={g.eyeY} r={r + 7} fill="#FFFFFF" stroke={INK} strokeWidth="5" />
              <circle cx={x} cy={g.eyeY} r="4" fill={INK} />
            </g>
          );
        }
        if (blink) {
          return (
            <line key={x} x1={x - 10} y1={g.eyeY} x2={x + 10} y2={g.eyeY} stroke={INK} strokeWidth="5" strokeLinecap="round" />
          );
        }
        return (
          <g key={x}>
            <circle cx={x} cy={g.eyeY} r={r} fill={INK} />
            {big ? <circle cx={x + 3} cy={g.eyeY - 4} r="3.5" fill="#FFFFFF" /> : null}
            {expr === "smug" ? (
              <path d={`M${x - 14} ${g.eyeY - 2} L${x + 14} ${g.eyeY - 2}`} stroke={INK} strokeWidth="6" strokeLinecap="round" />
            ) : null}
          </g>
        );
      })}
    </>
  );
};

/** Lông mày: [độ nghiêng trái, độ nghiêng phải, độ nhấc lên]. */
const BROWS: Record<Expr, [number, number, number]> = {
  neutral: [0, 0, 0],
  happy: [-4, 4, 6],
  shock: [-6, 6, 16],
  angry: [10, -10, -2],
  smug: [0, -8, 4],
  confused: [-8, 8, 0],
  sad: [-10, 10, 6],
};

export const Brows: React.FC<{ expr: Expr; g: FaceGeo }> = ({ expr, g }) => {
  const [tl, tr, lift] = BROWS[expr];
  const y = g.browY - lift;
  const confusedR = expr === "confused" ? 10 : 0;
  return (
    <>
      <path
        d={`M${g.eyeL - 16} ${y - tl} Q${g.eyeL} ${y - 8} ${g.eyeL + 14} ${y + tl}`}
        fill="none"
        stroke={g.browColor}
        strokeWidth="7"
        strokeLinecap="round"
      />
      <path
        d={`M${g.eyeR - 14} ${y + tr + confusedR} Q${g.eyeR} ${y - 8 + confusedR} ${g.eyeR + 16} ${y - tr + confusedR}`}
        fill="none"
        stroke={g.browColor}
        strokeWidth="7"
        strokeLinecap="round"
      />
    </>
  );
};

/** Miệng: talk 0..1 là độ mở khi đang nói. */
export const Mouth: React.FC<{ expr: Expr; y: number; talk: number; color: string }> = ({ expr, y, talk, color }) => {
  const x = 180;
  if (talk > 0) {
    const wide = expr === "happy" ? 18 : expr === "angry" ? 17 : 13;
    return <ellipse cx={x} cy={y} rx={wide} ry={4 + talk * 13} fill={color} stroke={INK} strokeWidth="5" />;
  }
  switch (expr) {
    case "happy":
      return <path d={`M${x - 20} ${y - 6} Q${x} ${y + 22} ${x + 20} ${y - 6} Z`} fill={color} stroke={INK} strokeWidth="5" strokeLinejoin="round" />;
    case "shock":
      return <ellipse cx={x} cy={y + 2} rx="12" ry="17" fill={color} stroke={INK} strokeWidth="5" />;
    case "angry":
      return <path d={`M${x - 18} ${y + 8} Q${x} ${y - 10} ${x + 18} ${y + 8} Z`} fill={color} stroke={INK} strokeWidth="5" strokeLinejoin="round" />;
    case "smug":
      return <path d={`M${x - 16} ${y + 2} Q${x + 2} ${y + 8} ${x + 20} ${y - 8}`} fill="none" stroke={INK} strokeWidth="6" strokeLinecap="round" />;
    case "confused":
      return <path d={`M${x - 16} ${y + 2} q8 -8 16 0 t16 0`} fill="none" stroke={INK} strokeWidth="6" strokeLinecap="round" />;
    case "sad":
      return <path d={`M${x - 16} ${y + 8} Q${x} ${y - 6} ${x + 16} ${y + 8}`} fill="none" stroke={INK} strokeWidth="6" strokeLinecap="round" />;
    default:
      return <path d={`M${x - 14} ${y} Q${x} ${y + 10} ${x + 14} ${y}`} fill="none" stroke={INK} strokeWidth="6" strokeLinecap="round" />;
  }
};

/**
 * Một vai trong truyện: màu da / tay / chân / giày, đầu (nhận nét mặt, độ mở miệng, chớp mắt), thân,
 * và độ cao đáy đồ đội đầu (headY). Đầu nên vẽ trong khung y 60–300, thân y 290–480 như các vai mẫu.
 */
export type Role = {
  look: Look;
  Head: React.FC<{ expr: Expr; talk: number; blink: boolean }>;
  Torso: React.FC;
  /** Toạ độ y đáy đồ đội đầu. */
  headY: number;
};
