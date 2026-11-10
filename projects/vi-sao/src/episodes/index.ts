import type { ViSaoEpisode } from "./make.ts";
import { TUAN_1 } from "./tuan-1.ts";

export const EPISODES: ViSaoEpisode[] = [...TUAN_1];

/** Câu hỏi của tập sau (hoặc câu hẹn trong tập nếu tập sau chưa viết), cho dòng "Câu hỏi tiếp" ở cuối video. */
export const nextTeaser = (day: number): string | null =>
  EPISODES.find((e) => e.day === day + 1)?.ask ?? EPISODES.find((e) => e.day === day)?.teaser ?? null;
