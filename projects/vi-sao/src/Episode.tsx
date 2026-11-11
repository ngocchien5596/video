import React from "react";
import { CorrectionCard, NoteCard } from "../../../engine/components/Overlays.tsx";
import { EpisodePlayer, type EpisodeLayout } from "../../../engine/EpisodePlayer.tsx";
import type { VoiceTrack } from "../../../engine/lib/types.ts";
import { BOARDS } from "./boards/index.ts";
import { SERIES_NAME } from "./brand.ts";
import type { ViSaoEpisode } from "./episodes/make.ts";

export type EpisodeProps = {
  episode: ViSaoEpisode;
  /** Câu hỏi của tập sau, null nếu chưa có. */
  next: string | null;
  /** Tiếng thoại từ public/voice/vi-sao/ngay-XX/manifest.json, null khi chưa sinh. */
  voice: VoiceTrack | null;
  /** Chỉ để xem trước trong Studio: tô vùng bị nút / chữ của TikTok, Shorts che. */
  safeZones?: boolean;
};

/** Bố cục 5 nhịp: hỏi → đoán thử → giải thích (bảng minh hoạ) → tóm lại → hỏi tiếp. */
const layoutFor = (episode: ViSaoEpisode, next: string | null): EpisodeLayout => ({
  topBar: { label: `${SERIES_NAME} · #${episode.day}`, title: episode.ask, showTitleAfter: "hook" },
  hook: { beat: "hook", kicker: "CÂU HỎI TƯỞNG DỄ", title: episode.ask },
  cards: [
    {
      beat: "guess",
      // Hiện cách hiểu sai ngay khi Thằng Cháu đoán, đóng dấu khi Cụ Đồ bắt đầu sửa (câu thứ 2).
      render: (f) => (
        <CorrectionCard
          label="NHIỀU NGƯỜI NGHĨ"
          body={episode.myth}
          stamp="CHƯA ĐÚNG!"
          startFrame={f.startFrame}
          endFrame={f.endFrame}
          stampFrame={f.lines[1]?.startFrame ?? f.startFrame + 45}
        />
      ),
    },
    {
      beat: "recap",
      render: (f) => <NoteCard label="TÓM LẠI" body={episode.answer} startFrame={f.startFrame} endFrame={f.endFrame} />,
    },
  ],
  endCard: { question: episode.question, teaser: next ? `Câu hỏi tiếp: ${next}` : null },
  sfx: [
    { beat: "guess", file: "record-scratch.wav", volume: 0.35 },
    { beat: "recap", file: "ding.wav", volume: 0.7 },
  ],
  boards: BOARDS,
});

export const EpisodeVideo: React.FC<EpisodeProps> = ({ episode, next, voice, safeZones }) => (
  <EpisodePlayer episode={episode} voice={voice} layout={layoutFor(episode, next)} safeZones={safeZones} />
);
