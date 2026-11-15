import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { TEXT_FONT } from "../../../engine/components/brand.ts";
import { HEAD_FONT, paperCard, turmericCard } from "../../../engine/components/warm.ts";

/**
 * Thẻ số liệu chữ to ở góc trên bên trái (chừa góc phải cho khung gọi video của Ông).
 * Mỗi con số trong lời kể hiện thành chữ to trên thẻ vàng nghệ, lời giải thích trên giấy dó bên dưới
 * (khung kịch bản: docs/series-bible.md).
 */
export const FactCard: React.FC<{ big: string; label: string; startFrame: number; endFrame: number }> = ({ big, label, startFrame, endFrame }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  if (frame < startFrame || frame >= endFrame) return null;
  const pop = spring({ frame: frame - startFrame, fps, config: { damping: 11, stiffness: 200 } });
  const note = spring({ frame: frame - startFrame - 6, fps, config: { damping: 14 } });
  const out = interpolate(frame, [endFrame - 6, endFrame], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <div
      style={{
        position: "absolute",
        top: 390,
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
          ...turmericCard(7, 20),
          position: "relative",
          zIndex: 1,
          display: "inline-block",
          padding: "8px 24px 0",
          fontFamily: HEAD_FONT,
          fontWeight: 800,
          fontSize: big.length > 10 ? 72 : 88,
          lineHeight: 1.15,
        }}
      >
        {big}
      </div>
      <div
        style={{
          ...paperCard(5, 20),
          marginTop: -8,
          marginLeft: 18,
          padding: "20px 24px 16px",
          fontFamily: TEXT_FONT,
          fontWeight: 900,
          fontSize: 36,
          lineHeight: 1.25,
          opacity: note,
          translate: `0 ${interpolate(note, [0, 1], [-20, 0])}px`,
        }}
      >
        {label}
      </div>
    </div>
  );
};
