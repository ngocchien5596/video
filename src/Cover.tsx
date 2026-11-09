import React from "react";
import { AbsoluteFill } from "remotion";
import { COLORS, outline, SERIES_NAME, TEXT_FONT, TITLE_FONT } from "./components/brand.ts";
import type { EpisodeProps } from "./Episode.tsx";

/** Ảnh bìa 1080×1920 cho từng tập. */
export const Cover: React.FC<EpisodeProps> = ({ episode }) => (
  <AbsoluteFill
    style={{
      background: "linear-gradient(165deg, #3B1F6B 0%, #14121F 75%)",
      alignItems: "center",
      justifyContent: "center",
      padding: "0 80px",
      textAlign: "center",
    }}
  >
    <div style={{ fontFamily: TITLE_FONT, fontSize: 52, letterSpacing: 3, color: COLORS.white, ...outline(8) }}>
      {SERIES_NAME}
    </div>
    <div
      style={{
        marginTop: 30,
        fontFamily: TITLE_FONT,
        fontSize: 190,
        lineHeight: 1,
        color: COLORS.white,
        rotate: "-4deg",
        ...outline(22),
      }}
    >
      NGÀY {episode.day}/30
    </div>
    <div
      style={{
        marginTop: 50,
        padding: "30px 36px",
        backgroundColor: COLORS.idiom,
        border: `10px solid ${COLORS.ink}`,
        borderRadius: 32,
        fontFamily: TITLE_FONT,
        fontSize: 120,
        lineHeight: 1.05,
        color: COLORS.ink,
        rotate: "2deg",
      }}
    >
      {episode.idiom}
    </div>
    <div
      style={{
        marginTop: 60,
        fontFamily: TEXT_FONT,
        fontWeight: 900,
        fontSize: 54,
        color: COLORS.white,
        ...outline(10),
      }}
    >
      Hiểu thế này là ông bà khóc!
    </div>
  </AbsoluteFill>
);
