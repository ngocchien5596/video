import React from "react";
import { AbsoluteFill } from "remotion";
import { COLORS, outline, TEXT_FONT, TITLE_FONT } from "../../../engine/components/brand.ts";
import { SERIES_NAME } from "./brand.ts";
import type { EpisodeProps } from "./Episode.tsx";

/**
 * Ảnh bìa 1080×1920 cho từng tập "Đoán Xem Là Ai": cùng bố cục với Nói vậy, Vì sao, Kiến thức, Chỗ lạ
 * (tên series, câu đố trên khung vàng nghiêng, một dòng phụ). Nền đỏ son → mực để nhận ra series.
 * KHÔNG lộ tên nhân vật: dùng coverTitle (câu đố ngắn).
 */
export const Cover: React.FC<EpisodeProps> = ({ episode }) => (
  <AbsoluteFill
    style={{
      background: "linear-gradient(165deg, #A3352B 0%, #5A1E17 55%, #1A130D 100%)",
      alignItems: "center",
      justifyContent: "center",
      padding: "0 80px",
      textAlign: "center",
    }}
  >
    <div style={{ fontFamily: TITLE_FONT, fontSize: 64, letterSpacing: 3, color: COLORS.white, ...outline(9) }}>{SERIES_NAME}</div>
    <div
      style={{
        marginTop: 50,
        padding: "30px 36px",
        backgroundColor: COLORS.idiom,
        border: `10px solid ${COLORS.ink}`,
        borderRadius: 32,
        fontFamily: TITLE_FONT,
        fontSize: 104,
        lineHeight: 1.38,
        textWrap: "balance",
        color: COLORS.ink,
        rotate: "2deg",
      }}
    >
      {episode.coverTitle}
    </div>
    <div style={{ marginTop: 60, fontFamily: TEXT_FONT, fontWeight: 900, fontSize: 52, color: COLORS.white, ...outline(10) }}>
      Nhân vật lịch sử · {episode.theme}
    </div>
  </AbsoluteFill>
);
