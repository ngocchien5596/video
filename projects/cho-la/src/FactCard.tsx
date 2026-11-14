import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, outline, TEXT_FONT, TITLE_FONT } from "../../../engine/components/brand.ts";

/**
 * Thẻ số liệu chữ to ở góc trên bên trái (chừa góc phải cho khung gọi video của Ông).
 * Mỗi con số trong lời kể hiện thành chữ to để người xem nhớ (khung kịch bản: docs/series-bible.md).
 */
export const FactCard: React.FC<{ big: string; label: string; startFrame: number; endFrame: number }> = ({ big, label, startFrame, endFrame }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  if (frame < startFrame || frame >= endFrame) return null;
  const pop = spring({ frame: frame - startFrame, fps, config: { damping: 11, stiffness: 200 } });
  const out = interpolate(frame, [endFrame - 6, endFrame], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <div
      style={{
        position: "absolute",
        top: 330,
        left: 50,
        width: 620,
        opacity: out,
        transformOrigin: "left top",
        scale: `${interpolate(pop, [0, 1], [0.6, 1])}`,
        rotate: "-2deg",
      }}
    >
      <div
        style={{
          display: "inline-block",
          padding: "6px 22px 2px",
          backgroundColor: COLORS.idiom,
          border: `7px solid ${COLORS.ink}`,
          borderRadius: 18,
          fontFamily: TITLE_FONT,
          fontSize: big.length > 10 ? 76 : 96,
          lineHeight: 1.1,
          color: COLORS.ink,
        }}
      >
        {big}
      </div>
      <div
        style={{
          marginTop: 10,
          fontFamily: TEXT_FONT,
          fontWeight: 900,
          fontSize: 40,
          lineHeight: 1.25,
          color: COLORS.white,
          ...outline(9),
        }}
      >
        {label}
      </div>
    </div>
  );
};
