import React from "react";
import { StampCard, TitleCard } from "../../../engine/components/Overlays.tsx";
import { EpisodePlayer, type EpisodeLayout } from "../../../engine/EpisodePlayer.tsx";
import type { VoiceTrack } from "../../../engine/lib/types.ts";
import { SERIES_NAME } from "./brand.ts";
import type { NoiVayEpisode } from "./episodes/make.ts";

export type EpisodeProps = {
  episode: NoiVayEpisode;
  /** Câu của ngày mai, null ở tập cuối. */
  next: string | null;
  /** Tiếng thoại từ public/voice/noi-vay/ngay-XX/manifest.json, null khi chưa sinh. Nạp trong calculateMetadata. */
  voice: VoiceTrack | null;
  /** Chỉ để xem trước trong Studio: tô vùng bị nút / chữ của TikTok, Shorts che. */
  safeZones?: boolean;
};

/** Bố cục 6 nhịp của series: hook → đặt câu → hiểu sai → lật nghĩa → ví dụ → punchline. */
const layoutFor = (episode: NoiVayEpisode, next: string | null): EpisodeLayout => ({
  topBar: { label: `${SERIES_NAME} · NGÀY ${episode.day}/30`, title: `“${episode.idiom}”`, showTitleAfter: "title" },
  hook: { beat: "hook", kicker: "BẠN HIỂU ĐÚNG CÂU NÀY CHƯA?", title: `“${episode.idiom}”` },
  cards: [
    {
      beat: "title",
      render: (f) => <TitleCard kicker={`NGÀY ${episode.day}/30`} title={episode.idiom} {...f} />,
    },
    {
      beat: "flip",
      render: (f) => <StampCard stamp="KHÔNG PHẢI VẬY!" label="NGHĨA THẬT" body={episode.meaning} {...f} />,
    },
  ],
  endCard: { question: episode.question, teaser: next ? `Mai là câu: “${next}”` : null },
  sfx: [
    { beat: "title", file: "ding.wav", volume: 0.7 },
    { beat: "flip", file: "record-scratch.wav", volume: 0.8 },
  ],
});

export const EpisodeVideo: React.FC<EpisodeProps> = ({ episode, next, voice, safeZones }) => (
  <EpisodePlayer episode={episode} voice={voice} layout={layoutFor(episode, next)} safeZones={safeZones} />
);
