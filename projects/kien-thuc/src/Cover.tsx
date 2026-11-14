import React from "react";
import { AbsoluteFill } from "remotion";
import { outline, TEXT_FONT, TITLE_FONT } from "../../../engine/components/brand.ts";
import { PARCHMENT } from "../../../engine/parchment/ParchmentHud.tsx";
import { SERIES_NAME } from "./brand.ts";
import type { EpisodeProps } from "./Episode.tsx";

/** Ảnh bìa 1080×1920 phong cách Giấy da cổ (Parchment) cho từng tập "Thiên Đường Kiến Thức". */
export const Cover: React.FC<EpisodeProps> = ({ episode }) => (
  <AbsoluteFill
    style={{
      background: `radial-gradient(circle at 50% 40%, ${PARCHMENT.bgInner} 0%, #563F28 60%, ${PARCHMENT.bgOuter} 100%)`,
      alignItems: "center",
      justifyContent: "center",
      padding: "0 76px",
      textAlign: "center",
    }}
  >
    <div style={{ fontFamily: TITLE_FONT, fontSize: 54, letterSpacing: 3, color: PARCHMENT.gold, ...outline(8) }}>
      🏮 {SERIES_NAME}
    </div>
    <div style={{ marginTop: 22, fontFamily: TEXT_FONT, fontWeight: 900, fontSize: 48, color: PARCHMENT.cream, ...outline(8) }}>
      📐 {episode.era} · {episode.textbook}
    </div>
    <div
      style={{
        marginTop: 42,
        padding: "36px 40px",
        backgroundColor: "#261A0E",
        border: `8px solid ${PARCHMENT.gold}`,
        borderRadius: 32,
        fontFamily: TITLE_FONT,
        fontSize: 92,
        lineHeight: 1.1,
        color: PARCHMENT.cream,
        boxShadow: "0 18px 40px rgba(0,0,0,0.65)",
      }}
    >
      {episode.hudTitle}
    </div>
    <div style={{ marginTop: 52, fontFamily: TEXT_FONT, fontWeight: 900, fontSize: 44, color: PARCHMENT.gold, ...outline(8) }}>
      Tập #{episode.day}: {episode.title}
    </div>
  </AbsoluteFill>
);
