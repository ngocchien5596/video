import React from "react";
import { WarmCover } from "../../../engine/components/warm-art.tsx";
import { SERIES_NAME } from "./brand.ts";
import type { EpisodeProps } from "./Episode.tsx";

/** Ảnh bìa 1080×1920 cho từng tập "Ông Ơi, Vì Sao?": câu hỏi trên thẻ vàng nghệ, Cháu giơ tay hỏi, Ông cầm kính lúp. */
export const Cover: React.FC<EpisodeProps> = ({ episode }) => (
  <WarmCover
    scene="yard"
    series={SERIES_NAME}
    day={episode.day}
    title={episode.ask}
    tagline="Người lớn cũng hay trả lời sai"
    cd={{ expr: "happy", arms: "raise", hand: "magnifier", tilt: -4, talk: 0.5 }}
    tc={{ expr: "confused", arms: "raise", tilt: 6, talk: 0.5 }}
  />
);
