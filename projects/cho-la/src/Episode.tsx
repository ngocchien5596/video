import React from "react";
import { EpisodePlayer, type EpisodeLayout } from "../../../engine/EpisodePlayer.tsx";
import type { VoiceTrack } from "../../../engine/lib/types.ts";
import { SERIES_NAME } from "./brand.ts";
import type { ChoLaEpisode } from "./episodes/make.ts";
import { FactCard } from "./FactCard.tsx";

export type EpisodeProps = {
  episode: ChoLaEpisode;
  /** Tiêu đề tập sau, null nếu chưa có. */
  next: string | null;
  /** Tiếng thoại từ public/voice/cho-la/ngay-XX/manifest.json, null khi chưa sinh. */
  voice: VoiceTrack | null;
  safeZones?: boolean;
};

/** Thẻ số liệu: hiện từ câu được chỉ định đến thẻ kế tiếp trong cùng nhịp, hoặc hết nhịp. */
const factCards = (episode: ChoLaEpisode): EpisodeLayout["cards"] =>
  episode.facts.map((fact) => ({
    beat: fact.beat,
    render: (f) => {
      const startFrame = f.lines[fact.line ?? 0]?.startFrame ?? f.startFrame;
      const later = episode.facts
        .filter((o) => o.beat === fact.beat && (o.line ?? 0) > (fact.line ?? 0))
        .map((o) => f.lines[o.line ?? 0]?.startFrame ?? f.endFrame);
      const endFrame = Math.min(f.endFrame, ...later);
      return <FactCard big={fact.big} label={fact.label} startFrame={startFrame} endFrame={endFrame} />;
    },
  }));

/** Bố cục 6 nhịp: nghịch lý → gọi Ông → đoán sai → lý do → bước ngoặt → chốt. */
const layoutFor = (episode: ChoLaEpisode, next: string | null): EpisodeLayout => ({
  topBar: { label: `${SERIES_NAME} · #${episode.day}`, title: episode.title, showTitleAfter: "hook" },
  hook: { beat: "hook", kicker: `📍 ${episode.place.toUpperCase()}`, title: episode.title },
  cards: factCards(episode),
  endCard: { question: episode.question, teaser: next ? `Chỗ lạ tiếp theo: ${next}` : null },
  // Chuông tin nhắn khi Cháu gọi Ông.
  sfx: [{ beat: "call", file: "tin-nhan.wav", volume: 0.8 }],
});

export const EpisodeVideo: React.FC<EpisodeProps> = ({ episode, next, voice, safeZones }) => (
  <EpisodePlayer episode={episode} voice={voice} layout={layoutFor(episode, next)} safeZones={safeZones} />
);
