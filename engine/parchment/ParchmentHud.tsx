import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";

export const PARCHMENT = {
  bgOuter: "#4A3623",
  bgInner: "#75593C",
  bgCard: "rgba(42, 29, 17, 0.78)",
  cream: "#FFF8E7",
  gold: "#F5C542",
  goldSoft: "rgba(245, 197, 66, 0.22)",
  ink: "#1E140B",
  red: "#FF5A52",
  green: "#5CE08A",
  cyan: "#6AD7FF",
};

export type ParchmentHudProps = {
  day: number;
  hudTitle: string;
};

/** Độ hạ của sân khấu so với bản vẽ gốc: mặt đất y = 780 + STAGE_DROP, khung mặt bằng từ 805 + STAGE_DROP. */
export const STAGE_DROP = 80;

/**
 * Khung Sân khấu Giấy da cổ (Parchment Stage 1080×1920):
 * - Tầng 1 (y: 140..295): Đồng hồ quả quýt cổ + Đèn bão "THIÊN ĐƯỜNG KIẾN THỨC" + Tiêu đề bài toán.
 * - Đường mặt đất tại y = 860 (780 + STAGE_DROP) chia Tầng 2A (sân khấu đứng) và Tầng 2B (mặt bằng / bảng công thức).
 * - Ít chữ: chỉ tên series + tiêu đề tập ở trên, phụ đề ở dưới (bỏ nhãn tên phần và đế EVIDENTIA / THEORIA theo góp ý 14/11/2026).
 */
export const ParchmentHud: React.FC<ParchmentHudProps> = ({ day, hudTitle }) => {
  const frame = useCurrentFrame();
  const handAngle = (frame * 2) % 360;
  const lanternGlow = 0.85 + 0.15 * Math.sin(frame * 0.12);

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(circle at 50% 42%, ${PARCHMENT.bgInner} 0%, #5E462E 58%, ${PARCHMENT.bgOuter} 100%)`,
        overflow: "hidden",
      }}
    >
      {/* Lưới tọa độ cổ điển mờ và đường mặt đất cố định */}
      <svg width={1080} height={1920} style={{ position: "absolute", inset: 0 }}>
        <defs>
          <pattern id="parchment-grid" width={60} height={60} patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(255,248,231,0.06)" strokeWidth={1} />
          </pattern>
          <radialGradient id="lantern-halo" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(245,197,66,0.45)" />
            <stop offset="100%" stopColor="rgba(245,197,66,0)" />
          </radialGradient>
        </defs>
        <rect x={44} y={130} width={992} height={1350} fill="url(#parchment-grid)" rx={24} />
        {/* Viền khung giấy cổ trong vùng an toàn */}
        <rect
          x={44}
          y={130}
          width={992}
          height={1350}
          rx={24}
          fill="none"
          stroke="rgba(255,248,231,0.28)"
          strokeWidth={3}
        />
        <rect
          x={54}
          y={140}
          width={972}
          height={1330}
          rx={18}
          fill="none"
          stroke="rgba(245,197,66,0.18)"
          strokeWidth={1.5}
        />

        {/* Đường chân trời / mặt đất */}
        <line x1={64} y1={780 + STAGE_DROP} x2={910} y2={780 + STAGE_DROP} stroke={PARCHMENT.cream} strokeWidth={3.5} opacity={0.75} />
        <line
          x1={64}
          y1={788 + STAGE_DROP}
          x2={910}
          y2={788 + STAGE_DROP}
          stroke={PARCHMENT.gold}
          strokeWidth={1.5}
          strokeDasharray="10 8"
          opacity={0.45}
        />

        {/* Khung viền vùng chiếu Mặt bằng / Bảng công thức ở Tầng 2B (y: 885..1265, x: 68..900) */}
        <rect
          x={68}
          y={805 + STAGE_DROP}
          width={832}
          height={380}
          rx={18}
          fill="rgba(28, 19, 11, 0.42)"
          stroke="rgba(255,248,231,0.22)"
          strokeWidth={2}
        />

        {/* Góc trên trái: Đồng hồ quả quýt cổ (kim nhích nhẹ) */}
        <g transform="translate(108, 192)">
          <circle r={34} fill="#2B1D10" stroke={PARCHMENT.gold} strokeWidth={3.5} />
          <circle r={28} fill="none" stroke={PARCHMENT.cream} strokeWidth={1} strokeDasharray="4 5" />
          <rect x={-7} y={-44} width={14} height={8} rx={3} fill={PARCHMENT.gold} />
          <line x1={0} y1={0} x2={0} y2={-16} stroke={PARCHMENT.cream} strokeWidth={2.5} strokeLinecap="round" />
          <line
            x1={0}
            y1={0}
            x2={19 * Math.sin((handAngle * Math.PI) / 180)}
            y2={-19 * Math.cos((handAngle * Math.PI) / 180)}
            stroke={PARCHMENT.gold}
            strokeWidth={2}
            strokeLinecap="round"
          />
          <circle r={3.5} fill={PARCHMENT.gold} />
        </g>

        {/* Góc trên phải (trong vùng an toàn x <= 900): Đèn bão phát sáng */}
        <g transform="translate(868, 192)">
          <circle r={58 * lanternGlow} fill="url(#lantern-halo)" />
          <path d="M -16 -24 L 16 -24 L 12 -14 L -12 -14 Z" fill={PARCHMENT.gold} />
          <rect x={-14} y={-14} width={28} height={32} rx={8} fill="#FFE27A" stroke={PARCHMENT.cream} strokeWidth={2.5} />
          <path d="M -18 18 L 18 18 L 22 26 L -22 26 Z" fill={PARCHMENT.gold} />
        </g>

      </svg>

      {/* Tầng 1: Tiêu đề thương hiệu & Bài toán */}
      <div
        style={{
          position: "absolute",
          top: 146,
          left: 158,
          width: 668,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            fontSize: 22,
            fontWeight: 800,
            letterSpacing: 2.5,
            color: PARCHMENT.gold,
            textTransform: "uppercase",
          }}
        >
          THIÊN ĐƯỜNG KIẾN THỨC · TẬP #{day}
        </div>
        <div
          style={{
            marginTop: 4,
            fontSize: 32,
            fontWeight: 900,
            color: PARCHMENT.cream,
            textShadow: "0 3px 10px rgba(0,0,0,0.65)",
            lineHeight: 1.15,
          }}
        >
          {hudTitle}
        </div>
      </div>
    </AbsoluteFill>
  );
};
