import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { TEXT_FONT } from "../components/brand.ts";

export const PARCHMENT = {
  bgOuter: "#2E1F12",
  bgInner: "#6E4E2E",
  bgCard: "rgba(36, 24, 13, 0.94)",
  cream: "#FFF8E7",
  gold: "#F5C542",
  goldSoft: "rgba(245, 197, 66, 0.22)",
  ink: "#1E140B",
  red: "#FF5A52",
  green: "#5CE08A",
  cyan: "#6AD7FF",
};

/** Mực vẽ trên nền giấy da sáng của sân khấu (nét đậm, tương phản cao). */
export const INK = {
  line: "#3B2614",
  soft: "rgba(59, 38, 20, 0.35)",
  gold: "#A8650A",
  goldFill: "#F2BE4A",
  red: "#C0392B",
  green: "#23864D",
  blue: "#1D6A8C",
  paper: "#F4E4C1",
  paperDark: "#E2C691",
  wood: "#9A6435",
  woodDark: "#6E4423",
};

/**
 * Bố cục khung dọc 1080×1920 (vùng an toàn: trên 180, phải 140, dưới 380):
 * - Tiêu đề: y 166..300
 * - Sân khấu giấy da: x 40..940, y 312..1098 (mặt đất y = 1040)
 * - Thẻ chữ: y 1114..1354
 * - Phụ đề: y 1370..1530
 */
export const LAYOUT = {
  stage: { x: 40, y: 312, w: 900, h: 786 },
  ground: 1040,
  card: { x: 40, y: 1114, w: 900, h: 240 },
  subtitle: { x: 40, y: 1370, w: 900 },
};

/** Bản vẽ cảnh dùng toạ độ gốc (mặt đất y = 780, rộng x 60..910); phóng lên khung: X = TX + S·x, Y = TY + S·y. */
export const STAGE_S = 1.06;
export const STAGE_TX = -23;
export const STAGE_TY = LAYOUT.ground - 780 * STAGE_S;

export type ParchmentHudProps = {
  day: number;
  hudTitle: string;
};

/**
 * Khung Sân khấu Giấy da cổ: nền gỗ tối bao quanh một tấm giấy da sáng (sân khấu) có vân giấy, mép cháy sậm,
 * nắng rọi nhẹ từ trên; dải sàn ở chân sân khấu; khung viền đồng. Tiêu đề to ở trên.
 */
export const ParchmentHud: React.FC<ParchmentHudProps> = ({ day, hudTitle }) => {
  const frame = useCurrentFrame();
  const { x, y, w, h } = LAYOUT.stage;
  const glow = 0.5 + 0.08 * Math.sin(frame * 0.05);

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at 50% 40%, ${PARCHMENT.bgInner} 0%, #4A331D 55%, ${PARCHMENT.bgOuter} 100%)`,
        overflow: "hidden",
      }}
    >
      <svg width={1080} height={1920} style={{ position: "absolute", inset: 0 }}>
        <defs>
          <radialGradient id="paper-grad" cx="50%" cy="38%" r="75%">
            <stop offset="0%" stopColor="#FBF0D6" />
            <stop offset="62%" stopColor="#F0DCB1" />
            <stop offset="100%" stopColor="#D9B983" />
          </radialGradient>
          <radialGradient id="paper-burn" cx="50%" cy="50%" r="72%">
            <stop offset="72%" stopColor="rgba(120,72,30,0)" />
            <stop offset="100%" stopColor="rgba(120,72,30,0.45)" />
          </radialGradient>
          <linearGradient id="paper-light" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(255,250,230,0.55)" />
            <stop offset="45%" stopColor="rgba(255,250,230,0)" />
          </linearGradient>
          <linearGradient id="floor-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#D4AF77" />
            <stop offset="100%" stopColor="#BF955A" />
          </linearGradient>
          <filter id="paper-fiber" x="0" y="0" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.9 0.35" numOctaves={2} seed={7} />
            <feColorMatrix values="0 0 0 0 0.35  0 0 0 0 0.22  0 0 0 0 0.1  0 0 0 0.09 0" />
          </filter>
          <clipPath id="paper-clip">
            <rect x={x} y={y} width={w} height={h} rx={26} />
          </clipPath>
        </defs>

        {/* Bóng đổ của tấm giấy trên nền gỗ */}
        <rect x={x + 6} y={y + 12} width={w} height={h} rx={26} fill="rgba(0,0,0,0.45)" />
        <g clipPath="url(#paper-clip)">
          <rect x={x} y={y} width={w} height={h} fill="url(#paper-grad)" />
          <rect x={x} y={y} width={w} height={h} filter="url(#paper-fiber)" />
          {/* Vết ố cổ */}
          <circle cx={x + 120} cy={y + 140} r={90} fill="rgba(170,110,40,0.06)" />
          <circle cx={x + 760} cy={y + 470} r={130} fill="rgba(170,110,40,0.05)" />
          {/* Nắng rọi từ trên */}
          <ellipse cx={x + w / 2} cy={y + 40} rx={420} ry={260} fill={`rgba(255,246,214,${glow})`} />
          <rect x={x} y={y} width={w} height={h} fill="url(#paper-light)" />
          {/* Sàn sân khấu */}
          <rect x={x} y={LAYOUT.ground} width={w} height={y + h - LAYOUT.ground} fill="url(#floor-grad)" />
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
            <line key={i} x1={x + 60 + i * 115} y1={LAYOUT.ground + 6} x2={x + 30 + i * 115} y2={y + h} stroke="rgba(90,55,25,0.18)" strokeWidth={2} />
          ))}
          <line x1={x} y1={LAYOUT.ground} x2={x + w} y2={LAYOUT.ground} stroke={INK.line} strokeWidth={4} />
          <rect x={x} y={y} width={w} height={h} fill="url(#paper-burn)" />
        </g>
        {/* Khung viền đồng */}
        <rect x={x} y={y} width={w} height={h} rx={26} fill="none" stroke="#C99A4B" strokeWidth={6} />
        <rect x={x + 9} y={y + 9} width={w - 18} height={h - 18} rx={19} fill="none" stroke="rgba(110,68,35,0.45)" strokeWidth={2} />
        {[
          [x, y],
          [x + w, y],
          [x, y + h],
          [x + w, y + h],
        ].map(([cx, cy]) => (
          <g key={`${cx}-${cy}`}>
            <circle cx={cx} cy={cy} r={13} fill="#C99A4B" stroke="#6E4423" strokeWidth={3} />
            <circle cx={cx} cy={cy} r={4} fill="#6E4423" />
          </g>
        ))}

        {/* Hoa văn hai bên dòng tên series */}
        <line x1={150} y1={184} x2={262} y2={184} stroke={PARCHMENT.gold} strokeWidth={2.5} opacity={0.7} />
        <line x1={818} y1={184} x2={930} y2={184} stroke={PARCHMENT.gold} strokeWidth={2.5} opacity={0.7} />
        <circle cx={142} cy={184} r={5} fill={PARCHMENT.gold} />
        <circle cx={938} cy={184} r={5} fill={PARCHMENT.gold} />
      </svg>

      {/* Tiêu đề: tên series + tên tập (chữ to, đọc được trên điện thoại) */}
      <div
        style={{
          position: "absolute",
          top: 168,
          left: 50,
          width: 880,
          height: 136,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          textAlign: "center",
          fontFamily: TEXT_FONT,
        }}
      >
        <div style={{ fontSize: 26, fontWeight: 900, letterSpacing: 3, color: PARCHMENT.gold, lineHeight: 1.1 }}>
          THIÊN ĐƯỜNG KIẾN THỨC · TẬP {day}
        </div>
        <div
          style={{
            marginTop: 8,
            fontSize: hudTitle.length > 28 ? 40 : 46,
            fontWeight: 900,
            color: PARCHMENT.cream,
            textShadow: "0 3px 10px rgba(0,0,0,0.6)",
            lineHeight: 1.12,
          }}
        >
          {hudTitle}
        </div>
      </div>
    </AbsoluteFill>
  );
};
