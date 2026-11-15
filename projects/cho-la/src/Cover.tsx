import React from "react";
import { WarmCover } from "../../../engine/components/warm-art.tsx";
import type { SceneId } from "../../../engine/lib/stage-types.ts";
import { SERIES_NAME } from "./brand.ts";
import type { EpisodeProps } from "./Episode.tsx";

/** Phông đầu tiên của tập (chỗ lạ đang kể), không có thì dùng sân nhà. */
const firstScene = (episode: EpisodeProps["episode"]): SceneId => {
  for (const beat of episode.beats) {
    for (const m of beat.stage ?? []) {
      if (m.scene) return typeof m.scene === "string" ? m.scene : m.scene.id;
    }
  }
  return "yard";
};

/** Ảnh bìa 1080×1920 cho từng tập "Ông Ơi, Chỗ Này Lạ Lắm!": phông chỗ lạ, Cháu đội nón lá cầm điện thoại, Ông cầm chén trà. */
export const Cover: React.FC<EpisodeProps> = ({ episode }) => (
  <WarmCover
    scene={firstScene(episode)}
    series={SERIES_NAME}
    day={episode.day}
    tag={`📍 ${episode.place}`}
    title={episode.title}
    tagline="Chuyện có thật ở Việt Nam"
    cd={{ expr: "smug", arms: "hold", hand: "tea-cup", tilt: -4, talk: 0.4 }}
    tc={{ expr: "happy", arms: "raise", hand: "phone", head: "non-la", tilt: 6, talk: 0.5 }}
  />
);
