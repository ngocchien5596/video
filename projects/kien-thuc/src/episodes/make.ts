import type { Beat, Line } from "../../../../engine/lib/types.ts";
import type { ParchmentEpisode } from "../../../../engine/parchment/ParchmentPlayer.tsx";

export type KienThucEpisode = ParchmentEpisode;

/** Một câu dẫn chuyện của NARRATOR, gồm chữ phụ đề (`text`) và câu chuẩn hóa đọc AI (`tts`). */
export const nar = (text: string, tts?: string): Line => ({
  who: "NARRATOR",
  text,
  ...(tts ? { tts } : {}),
});

type Part = {
  shot: string;
  lines: Line[];
  seconds?: number;
};

export type EpisodeSpec = {
  day: number;
  week: number;
  theme: string;
  title: string;
  hudTitle: string;
  textbook: string;
  era: string;
  question: string;
  sources: { title: string; url: string }[];
  footage?: string;
  showSubtitles?: boolean;
  /** Hồi 1: Bối cảnh lịch sử & Bài toán lớn (~18s). */
  hook: Part;
  /** Hồi 2: Đập bỏ các giải pháp thông thường (~25s). */
  barrier: Part;
  /** Hồi 3: Khoảnh khắc Eureka bằng trực giác (~32s). */
  eureka: Part;
  /** Hồi 4: Liên hệ SGK & Khái quát hóa Định lý (~30s). */
  theorem: Part;
  /** Hồi 5: Biến thể thực chiến đời sống (~22s). */
  realworld: Part;
  /** Hồi 6: Cao trào Vũ trụ & Triết lý kết (~23s). */
  cosmic: Part;
};

/**
 * Dựng một tập "Thiên Đường Kiến Thức" theo chuẩn Công thức 6 Hồi (~150 giây).
 */
export const makeEpisode = (spec: EpisodeSpec): KienThucEpisode => {
  const beats: Beat[] = [
    { ...spec.hook, kind: "hook", seconds: spec.hook.seconds ?? 18 },
    { ...spec.barrier, kind: "barrier", seconds: spec.barrier.seconds ?? 25 },
    { ...spec.eureka, kind: "eureka", seconds: spec.eureka.seconds ?? 32 },
    { ...spec.theorem, kind: "theorem", seconds: spec.theorem.seconds ?? 30 },
    { ...spec.realworld, kind: "realworld", seconds: spec.realworld.seconds ?? 22 },
    { ...spec.cosmic, kind: "cosmic", seconds: spec.cosmic.seconds ?? 23 },
  ];

  return {
    day: spec.day,
    week: spec.week,
    theme: spec.theme,
    title: spec.title,
    hudTitle: spec.hudTitle,
    textbook: spec.textbook,
    era: spec.era,
    question: spec.question,
    sources: spec.sources,
    footage: spec.footage,
    showSubtitles: spec.showSubtitles,
    beats,
  };
};
