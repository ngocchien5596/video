import React from "react";
import { AbsoluteFill, useVideoConfig } from "remotion";
import { COLORS, outline, TEXT_FONT, TITLE_FONT } from "../../../engine/components/brand.ts";
import { Puppet, PUPPET_H, PUPPET_W } from "../../../engine/stage/Character.tsx";
import { ARM_POSES } from "../../../engine/stage/poses.ts";

const INK = COLORS.ink;
const SKY = "#7FE3FF";

/** Mặt trời có tia sau lưng hai nhân vật. */
const Sun: React.FC<{ cx: number; cy: number; r: number }> = ({ cx, cy, r }) => (
  <g transform={`translate(${cx} ${cy})`}>
    {Array.from({ length: 18 }, (_, i) => {
      const a = (i * Math.PI * 2) / 18;
      const b = a + Math.PI / 18;
      return (
        <path
          key={i}
          d={`M0 0 L${Math.cos(a) * r} ${Math.sin(a) * r} L${Math.cos(b) * r} ${Math.sin(b) * r} Z`}
          fill="#FFFFFF"
          opacity="0.08"
        />
      );
    })}
    <circle r={r * 0.42} fill={COLORS.idiom} opacity="0.95" stroke={INK} strokeWidth="10" />
  </g>
);

const Cloud: React.FC<{ x: number; y: number; s: number }> = ({ x, y, s }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} fill="#FFFFFF" stroke={INK} strokeWidth="6">
    <path d="M-80 20 Q-90 -10 -55 -18 Q-45 -50 -5 -42 Q25 -62 50 -30 Q90 -30 85 10 Q85 25 60 25 L-60 25 Q-80 25 -80 20 Z" />
  </g>
);

const Mark: React.FC<{ x: number; y: number; size: number; rotate: number; color?: string }> = ({ x, y, size, rotate, color = SKY }) => (
  <text
    x={x}
    y={y}
    textAnchor="middle"
    fontFamily={TITLE_FONT}
    fontSize={size}
    fill={color}
    stroke={INK}
    strokeWidth={size / 9}
    paintOrder="stroke"
    transform={`rotate(${rotate} ${x} ${y})`}
  >
    ?
  </text>
);

const Duo: React.FC = () => (
  <svg viewBox="0 0 760 640" width="100%" height="100%">
    <Sun cx={380} cy={330} r={620} />
    <Cloud x={110} y={120} s={0.9} />
    <Cloud x={620} y={300} s={0.7} />
    {/* Cụ Đồ: cầm kính lúp, cười hiền, sẵn sàng giải thích */}
    <g transform="translate(20 70) scale(1.02)">
      <Puppet
        who="CD"
        expr="happy"
        arms={ARM_POSES.raise}
        hand="magnifier"
        head={null}
        face={null}
        back={null}
        talk={0.6}
        blink={false}
        legSwing={0}
        headTilt={-4}
        mirrored={false}
      />
    </g>
    {/* Thằng Cháu: giơ tay hỏi */}
    <g transform={`translate(${760 - 20 - PUPPET_W * 1.02} 70) scale(1.02)`}>
      <Puppet
        who="TC"
        expr="confused"
        arms={ARM_POSES.raise}
        hand={null}
        head={null}
        face={null}
        back={null}
        talk={0.5}
        blink={false}
        legSwing={0}
        headTilt={6}
        mirrored
      />
    </g>
    <Mark x={690} y={120} size={150} rotate={12} />
    <Mark x={560} y={70} size={80} rotate={-14} color={COLORS.idiom} />
    {/* Bóng dưới chân */}
    <ellipse cx="190" cy={70 + PUPPET_H * 1.02 - 8} rx="150" ry="16" fill="#000000" opacity="0.35" />
    <ellipse cx="570" cy={70 + PUPPET_H * 1.02 - 8} rx="130" ry="16" fill="#000000" opacity="0.35" />
  </svg>
);

const Title: React.FC<{ size: number }> = ({ size }) => (
  <div style={{ fontFamily: TITLE_FONT, lineHeight: 0.95, color: COLORS.white }}>
    <div style={{ fontSize: size * 0.85, ...outline(size / 9) }}>ÔNG ƠI,</div>
    <div
      style={{
        display: "inline-block",
        marginTop: size * 0.1,
        padding: `${size * 0.04}px ${size * 0.2}px`,
        fontSize: size * 1.05,
        color: INK,
        backgroundColor: COLORS.idiom,
        border: `${size / 14}px solid ${INK}`,
        borderRadius: size / 6,
        rotate: "-4deg",
      }}
    >
      VÌ SAO?
    </div>
  </div>
);

const Tagline: React.FC<{ size: number }> = ({ size }) => (
  <div style={{ fontFamily: TEXT_FONT, fontWeight: 900, fontSize: size, color: COLORS.white, lineHeight: 1.25, ...outline(size / 6) }}>
    Series giải đáp câu hỏi của bé
  </div>
);

/**
 * Ảnh bìa playlist của series "Ông Ơi, Vì Sao?".
 * Khung ngang (1280×720, YouTube) xếp chữ bên trái, nhân vật bên phải;
 * khung vuông xếp chữ ở trên, nhân vật ở dưới.
 */
export const PlaylistCover: React.FC = () => {
  const { width, height } = useVideoConfig();
  const wide = width > height;
  const bg = "linear-gradient(160deg, #1F6FB2 0%, #154A80 45%, #14121F 100%)";

  if (wide) {
    return (
      <AbsoluteFill style={{ background: bg, flexDirection: "row" }}>
        <div style={{ width: "52%", padding: "70px 0 0 64px", display: "flex", flexDirection: "column", gap: 40 }}>
          <Title size={150} />
          <Tagline size={34} />
        </div>
        <div style={{ width: "48%", height: "100%", display: "flex", alignItems: "flex-end" }}>
          <Duo />
        </div>
      </AbsoluteFill>
    );
  }

  return (
    <AbsoluteFill style={{ background: bg, alignItems: "center", textAlign: "center" }}>
      <div style={{ paddingTop: height * 0.06 }}>
        <Title size={width * 0.14} />
      </div>
      <div style={{ marginTop: height * 0.03 }}>
        <Tagline size={width * 0.036} />
      </div>
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: height * 0.46 }}>
        <Duo />
      </div>
    </AbsoluteFill>
  );
};
