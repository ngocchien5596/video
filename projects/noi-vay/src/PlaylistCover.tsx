import React from "react";
import { AbsoluteFill, useVideoConfig } from "remotion";
import { COLORS, outline, TEXT_FONT, TITLE_FONT } from "../../../engine/components/brand.ts";
import { Puppet, PUPPET_H, PUPPET_W } from "../../../engine/stage/Character.tsx";
import { ARM_POSES } from "../../../engine/stage/poses.ts";

const INK = COLORS.ink;

/** Tia nắng vàng sau lưng hai nhân vật. */
const Burst: React.FC<{ cx: number; cy: number; r: number }> = ({ cx, cy, r }) => (
  <g transform={`translate(${cx} ${cy})`}>
    {Array.from({ length: 18 }, (_, i) => {
      const a = (i * Math.PI * 2) / 18;
      const b = a + Math.PI / 18;
      return (
        <path
          key={i}
          d={`M0 0 L${Math.cos(a) * r} ${Math.sin(a) * r} L${Math.cos(b) * r} ${Math.sin(b) * r} Z`}
          fill="#FFFFFF"
          opacity="0.07"
        />
      );
    })}
    <circle r={r * 0.42} fill={COLORS.idiom} opacity="0.95" stroke={INK} strokeWidth="10" />
  </g>
);

const Duo: React.FC = () => (
  <svg viewBox="0 0 760 640" width="100%" height="100%">
    <Burst cx={380} cy={330} r={620} />
    {/* Cụ Đồ: vung quạt, mặt nghiêm */}
    <g transform="translate(20 70) scale(1.02)">
      <Puppet
        who="CD"
        expr="smug"
        arms={ARM_POSES.raise}
        hand="fan"
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
    {/* Thằng Cháu: ngơ ngác ôm quyển vở */}
    <g transform={`translate(${760 - 20 - PUPPET_W * 1.02} 70) scale(1.02)`}>
      <Puppet
        who="TC"
        expr="confused"
        arms={ARM_POSES.hold2}
        hand={{ id: "book", text: "THÀNH NGỮ" }}
        head={null}
        face={null}
        back={null}
        talk={0.3}
        blink={false}
        legSwing={0}
        headTilt={6}
        mirrored
      />
    </g>
    {/* Dấu hỏi trên đầu Thằng Cháu */}
    <text
      x="690"
      y="120"
      textAnchor="middle"
      fontFamily={TITLE_FONT}
      fontSize="150"
      fill="#7FE3FF"
      stroke={INK}
      strokeWidth="16"
      paintOrder="stroke"
      transform="rotate(12 690 120)"
    >
      ?
    </text>
    {/* Bóng dưới chân */}
    <ellipse cx="190" cy={70 + PUPPET_H * 1.02 - 8} rx="150" ry="16" fill="#000000" opacity="0.35" />
    <ellipse cx="570" cy={70 + PUPPET_H * 1.02 - 8} rx="130" ry="16" fill="#000000" opacity="0.35" />
  </svg>
);

const Title: React.FC<{ size: number }> = ({ size }) => (
  <div style={{ fontFamily: TITLE_FONT, lineHeight: 0.95, color: COLORS.white }}>
    <div style={{ fontSize: size, ...outline(size / 9) }}>NÓI VẬY</div>
    <div style={{ fontSize: size * 0.8, color: COLORS.idiom, ...outline(size / 9) }}>MÀ KHÔNG</div>
    <div
      style={{
        display: "inline-block",
        marginTop: size * 0.12,
        padding: `${size * 0.04}px ${size * 0.18}px`,
        fontSize: size * 0.8,
        color: COLORS.red,
        backgroundColor: "#FFFFFFF2",
        border: `${size / 14}px solid ${COLORS.red}`,
        borderRadius: size / 6,
        rotate: "-5deg",
      }}
    >
      PHẢI VẬY!
    </div>
  </div>
);

const Tagline: React.FC<{ size: number }> = ({ size }) => (
  <div style={{ fontFamily: TEXT_FONT, fontWeight: 900, fontSize: size, color: COLORS.white, lineHeight: 1.25, ...outline(size / 6) }}>
    30 ngày · 30 câu thành ngữ
    <br />
    bị hiểu theo nghĩa đen
  </div>
);

/**
 * Ảnh bìa playlist của cả series.
 * Khung ngang (1280×720, YouTube) xếp chữ bên trái, nhân vật bên phải;
 * khung vuông / dọc xếp chữ ở trên, nhân vật ở dưới.
 */
export const PlaylistCover: React.FC = () => {
  const { width, height } = useVideoConfig();
  const wide = width > height;
  const bg = "linear-gradient(160deg, #3B1F6B 0%, #241A45 45%, #14121F 100%)";

  if (wide) {
    return (
      <AbsoluteFill style={{ background: bg, flexDirection: "row" }}>
        <div style={{ width: "52%", padding: "56px 0 0 64px", display: "flex", flexDirection: "column", gap: 34 }}>
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
      <div style={{ paddingTop: height * 0.05 }}>
        <Title size={width * 0.13} />
      </div>
      <div style={{ marginTop: height * 0.025 }}>
        <Tagline size={width * 0.036} />
      </div>
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: height * 0.46 }}>
        <Duo />
      </div>
    </AbsoluteFill>
  );
};
