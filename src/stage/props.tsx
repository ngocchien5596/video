import React from "react";
import type { PropId } from "../lib/stage-types.ts";
import { COLORS, TEXT_FONT, TITLE_FONT } from "../components/brand.ts";

const INK = COLORS.ink;

/**
 * extend: đồ có cán (quạt, kính lúp), vẽ dọc theo trục +y từ điểm cầm (0,0), xoay theo cẳng tay.
 * upright: đồ đứng thẳng, vẽ với đáy ở (0,0).
 */
export type PropDef = {
  mode: "extend" | "upright";
  draw: (opts: { text?: string; mirrored: boolean }) => React.ReactNode;
};

/** Giữ chữ không bị lật khi nhân vật quay sang trái. */
const Unmirror: React.FC<{ mirrored: boolean; children: React.ReactNode }> = ({ mirrored, children }) =>
  mirrored ? <g transform="scale(-1,1)">{children}</g> : <>{children}</>;

const Mango: React.FC<{ bitten?: boolean }> = ({ bitten }) => (
  <g>
    <path d="M2 -78 Q14 -96 34 -92 Q22 -76 4 -74 Z" fill="#3FA34D" stroke={INK} strokeWidth="5" strokeLinejoin="round" />
    <ellipse cx="0" cy="-38" rx="33" ry="40" fill="#FFB22C" stroke={INK} strokeWidth="6" transform="rotate(-18 0 -38)" />
    <ellipse cx="-10" cy="-52" rx="9" ry="14" fill="#FFE08A" opacity="0.8" transform="rotate(-18 -10 -52)" />
    {bitten ? (
      <path
        d="M30 -62 Q14 -56 18 -40 Q8 -30 22 -18 Q30 -26 34 -40 Z"
        fill="#FFE08A"
        stroke={INK}
        strokeWidth="5"
        strokeLinejoin="round"
      />
    ) : null}
  </g>
);

const Bowl: React.FC<{ y?: number; dirty?: boolean; rice?: boolean }> = ({ y = 0, dirty, rice }) => (
  <g transform={`translate(0 ${y})`}>
    {rice ? <ellipse cx="0" cy="-34" rx="40" ry="18" fill="#FFFFFF" stroke={INK} strokeWidth="5" /> : null}
    <path d="M-48 -32 Q-44 4 0 6 Q44 4 48 -32 Z" fill="#E8F1F8" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
    <path d="M-40 -18 Q0 -10 40 -18" fill="none" stroke="#3D7BD9" strokeWidth="5" />
    {dirty ? (
      <>
        <circle cx="-20" cy="-6" r="4" fill="#8B5A2B" />
        <circle cx="14" cy="-2" r="3" fill="#8B5A2B" />
        <circle cx="26" cy="-12" r="3" fill="#8B5A2B" />
      </>
    ) : null}
  </g>
);

export const PROPS: Record<PropId, PropDef> = {
  fan: {
    mode: "extend",
    draw: () => (
      <g>
        <line x1="0" y1="-6" x2="0" y2="24" stroke={INK} strokeWidth="12" strokeLinecap="round" />
        <line x1="0" y1="-6" x2="0" y2="24" stroke="#8B5A2B" strokeWidth="6" strokeLinecap="round" />
        <path d="M0 20 L-58 92 A92 92 0 0 0 58 92 Z" fill="#C0392B" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
        {[-40, -20, 0, 20, 40].map((a) => (
          <line
            key={a}
            x1="0"
            y1="20"
            x2={Math.sin((a * Math.PI) / 180) * 90}
            y2={20 + Math.cos((a * Math.PI) / 180) * 90}
            stroke="#FFD93D"
            strokeWidth="3"
          />
        ))}
      </g>
    ),
  },
  magnifier: {
    mode: "extend",
    draw: () => (
      <g>
        <line x1="0" y1="-6" x2="0" y2="42" stroke={INK} strokeWidth="18" strokeLinecap="round" />
        <line x1="0" y1="-6" x2="0" y2="42" stroke="#8B5A2B" strokeWidth="10" strokeLinecap="round" />
        <circle cx="0" cy="76" r="32" fill="#BFE8FF" fillOpacity="0.75" stroke={INK} strokeWidth="9" />
        <path d="M-14 62 Q-6 54 6 56" fill="none" stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round" />
      </g>
    ),
  },
  mango: { mode: "upright", draw: () => <Mango /> },
  "mango-bitten": { mode: "upright", draw: () => <Mango bitten /> },
  "detective-hat": {
    mode: "upright",
    draw: () => (
      <g>
        <ellipse cx="0" cy="-8" rx="104" ry="20" fill="#8B6B43" stroke={INK} strokeWidth="7" />
        <path d="M-78 -12 Q-80 -92 0 -96 Q80 -92 78 -12 Z" fill="#A9845A" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
        <path d="M-76 -34 Q0 -22 76 -34" fill="none" stroke="#5C4128" strokeWidth="12" />
        <path d="M-40 -88 L-30 -60 M0 -94 L0 -60 M40 -88 L30 -60" stroke="#8B6B43" strokeWidth="5" />
        <path d="M0 -96 Q14 -110 8 -120" fill="none" stroke={INK} strokeWidth="6" strokeLinecap="round" />
      </g>
    ),
  },
  backpack: {
    mode: "upright",
    draw: () => (
      <g>
        <rect x="-62" y="-150" width="124" height="150" rx="34" fill="#3D7BD9" stroke={INK} strokeWidth="7" />
        <rect x="-44" y="-70" width="88" height="54" rx="16" fill="#2C5FAD" stroke={INK} strokeWidth="6" />
      </g>
    ),
  },
  sign: {
    mode: "upright",
    draw: ({ text, mirrored }) => (
      <Unmirror mirrored={mirrored}>
        <g>
          <rect x="-112" y="-214" width="224" height="214" rx="10" fill="#F6E7C1" stroke={INK} strokeWidth="7" />
          <text x="0" y="-168" textAnchor="middle" fontFamily={TITLE_FONT} fontSize="46" fill={COLORS.red}>
            TRUY NÃ
          </text>
          <g transform="translate(0 -62) scale(0.95)">
            <Mango />
            <circle cx="-8" cy="-44" r="5" fill={INK} />
            <circle cx="10" cy="-48" r="5" fill={INK} />
            <path d="M-10 -24 Q2 -32 14 -26" fill="none" stroke={INK} strokeWidth="4" strokeLinecap="round" />
          </g>
          <text x="0" y="-22" textAnchor="middle" fontFamily={TEXT_FONT} fontWeight="900" fontSize="26" fill={INK}>
            {text ?? ""}
          </text>
        </g>
      </Unmirror>
    ),
  },
  "rice-cooker": {
    mode: "upright",
    draw: () => (
      <g>
        <rect x="-64" y="-92" width="128" height="92" rx="26" fill="#FDF5F0" stroke={INK} strokeWidth="7" />
        <path d="M-60 -86 Q0 -128 60 -86 Z" fill="#F2B8C6" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
        <rect x="-14" y="-124" width="28" height="12" rx="6" fill={INK} />
        <rect x="-26" y="-56" width="52" height="24" rx="8" fill="#E5484D" stroke={INK} strokeWidth="5" />
        <circle cx="0" cy="-44" r="6" fill="#FFD93D" />
      </g>
    ),
  },
  bowls: {
    mode: "upright",
    draw: () => (
      <g>
        <Bowl y={0} dirty />
        <Bowl y={-26} dirty />
        <Bowl y={-52} dirty />
        <Bowl y={-78} dirty />
      </g>
    ),
  },
  bowl: { mode: "upright", draw: () => <Bowl rice /> },
  book: {
    mode: "upright",
    draw: ({ mirrored }) => (
      <Unmirror mirrored={mirrored}>
        <g>
          <rect x="-56" y="-120" width="112" height="120" rx="8" fill="#3FA34D" stroke={INK} strokeWidth="7" />
          <rect x="-40" y="-100" width="80" height="34" rx="4" fill="#FFF8E7" />
          <text x="0" y="-75" textAnchor="middle" fontFamily={TITLE_FONT} fontSize="24" fill={INK}>
            VỞ BÀI
          </text>
        </g>
      </Unmirror>
    ),
  },
  "rice-tray": {
    mode: "upright",
    draw: () => (
      <g>
        <ellipse cx="0" cy="-10" rx="170" ry="34" fill="#C9302C" stroke={INK} strokeWidth="7" />
        <g transform="translate(-100 -20) scale(0.75)">
          <Bowl rice />
        </g>
        <g transform="translate(100 -20) scale(0.75)">
          <Bowl rice />
        </g>
        <ellipse cx="0" cy="-30" rx="62" ry="20" fill="#FFFFFF" stroke={INK} strokeWidth="6" />
        <ellipse cx="-14" cy="-38" rx="26" ry="12" fill="#3FA34D" />
        <ellipse cx="18" cy="-36" rx="20" ry="10" fill="#E8A33D" />
      </g>
    ),
  },
};
