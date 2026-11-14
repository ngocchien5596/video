import type { ChoLaEpisode } from "./make.ts";
import { TUAN_1 } from "./tuan-1.ts";

export const EPISODES: ChoLaEpisode[] = [...TUAN_1];

/** Tiêu đề tập sau (hoặc tiêu đề hẹn trong tập nếu tập sau chưa viết), cho dòng "Chỗ lạ tiếp theo" ở cuối video. */
export const nextTeaser = (day: number): string | null =>
  EPISODES.find((e) => e.day === day + 1)?.title ?? EPISODES.find((e) => e.day === day)?.teaser ?? null;
