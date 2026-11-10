import React from "react";
import { AbsoluteFill } from "remotion";
import { COLORS, outline, TEXT_FONT, TITLE_FONT } from "../../../engine/components/brand.ts";
import { SERIES_NAME } from "./brand.ts";
import type { EpisodeProps } from "./Episode.tsx";

/** Ảnh bìa 1080×1920 cho từng tập "Ông Ơi, Vì Sao?". */
export const Cover: React.FC<EpisodeProps> = ({ episode }) => (
  <AbsoluteFill
    style={{
      background: "linear-gradient(165deg, #1F6FB2 0%, #123A63 60%, #14121F 100%)",
      alignItems: "center",
      justifyContent: "center",
      padding: "0 80px",
      textAlign: "center",
    }}
  >
    <div style={{ fontFamily: TITLE_FONT, fontSize: 64, letterSpacing: 3, color: COLORS.white, ...outline(9) }}>
      {SERIES_NAME}
    </div>
    <div
      style={{
        marginTop: 20,
        fontFamily: TITLE_FONT,
        fontSize: 170,
        lineHeight: 1,
        color: "#7FE3FF",
        rotate: "-4deg",
        ...outline(20),
      }}
    >
      CÂU {episode.day}
    </div>
    <div
      style={{
        marginTop: 50,
        padding: "30px 36px",
        backgroundColor: COLORS.idiom,
        border: `10px solid ${COLORS.ink}`,
        borderRadius: 32,
        fontFamily: TITLE_FONT,
        fontSize: 116,
        lineHeight: 1.05,
        color: COLORS.ink,
        rotate: "2deg",
      }}
    >
      {episode.ask}
    </div>
    <div
      style={{
        marginTop: 60,
        fontFamily: TEXT_FONT,
        fontWeight: 900,
        fontSize: 52,
        color: COLORS.white,
        ...outline(10),
      }}
    >
      Giải thích dễ hiểu cho bé {episode.ages}
    </div>
  </AbsoluteFill>
);
