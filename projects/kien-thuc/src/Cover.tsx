import React from "react";
import { AbsoluteFill } from "remotion";
import { COLORS, outline, TEXT_FONT, TITLE_FONT } from "../../../engine/components/brand.ts";
import { PARCHMENT } from "../../../engine/parchment/ParchmentHud.tsx";
import { SERIES_NAME } from "./brand.ts";
import type { EpisodeProps } from "./Episode.tsx";

/**
 * Ảnh bìa 1080×1920 cho từng tập "Thiên Đường Kiến Thức".
 * Cùng bố cục đơn giản với ảnh bìa "Nói vậy" và "Vì sao": tên series, tiêu đề trên khung, một dòng phụ.
 * Màu nền nâu giấy da để nhận ra series.
 */
export const Cover: React.FC<EpisodeProps> = ({ episode }) => (
  <AbsoluteFill
    style={{
      background: `linear-gradient(165deg, #8A5A2B 0%, #4A3018 60%, ${PARCHMENT.bgOuter} 100%)`,
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
        marginTop: 50,
        padding: "30px 36px",
        backgroundColor: COLORS.idiom,
        border: `10px solid ${COLORS.ink}`,
        borderRadius: 32,
        fontFamily: TITLE_FONT,
        fontSize: 104,
        // Tiêu đề dài nhiều dòng cần giãn dòng để dấu không chạm dòng trên.
        lineHeight: episode.coverTitle ? 1.38 : 1.05,
        textWrap: episode.coverTitle ? "balance" : undefined,
        color: COLORS.ink,
        rotate: "2deg",
      }}
    >
      {episode.coverTitle ?? episode.hudTitle}
    </div>
    <div
      style={{
        marginTop: 60,
        fontFamily: TEXT_FONT,
        fontWeight: 900,
        fontSize: episode.coverTitle && episode.textbook.length > 30 ? 45 : 52,
        textWrap: episode.coverTitle ? "balance" : undefined,
        color: COLORS.white,
        ...outline(10),
      }}
    >
      {episode.textbook}
    </div>
  </AbsoluteFill>
);
