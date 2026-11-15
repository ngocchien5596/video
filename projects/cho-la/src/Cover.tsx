import React from "react";
import { AbsoluteFill } from "remotion";
import { COLORS, outline, TEXT_FONT, TITLE_FONT } from "../../../engine/components/brand.ts";
import { SERIES_NAME } from "./brand.ts";
import type { EpisodeProps } from "./Episode.tsx";

/** Ảnh bìa 1080×1920 cho từng tập "Ông Ơi, Chỗ Này Lạ Lắm!": cùng bố cục với Nói vậy, Vì sao, Kiến thức (tên series, số tập, tiêu đề trên khung vàng, dòng phụ). */
export const Cover: React.FC<EpisodeProps> = ({ episode }) => (
  <AbsoluteFill
    style={{
      background: "linear-gradient(165deg, #2F8F6B 0%, #1C4F44 60%, #14121F 100%)",
      alignItems: "center",
      justifyContent: "center",
      padding: "0 80px",
      textAlign: "center",
    }}
  >
    <div style={{ fontFamily: TITLE_FONT, fontSize: 60, letterSpacing: 3, color: COLORS.white, ...outline(9) }}>{SERIES_NAME}</div>
    <div
      style={{
        marginTop: 20,
        fontFamily: TITLE_FONT,
        fontSize: 170,
        lineHeight: 1,
        color: "#FFE27A",
        rotate: "-4deg",
        ...outline(20),
      }}
    >
      #{episode.day}
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
      {episode.title}
    </div>
    <div style={{ marginTop: 60, fontFamily: TEXT_FONT, fontWeight: 900, fontSize: 52, color: COLORS.white, ...outline(10) }}>
      Chuyện có thật ở {episode.place}
    </div>
  </AbsoluteFill>
);
