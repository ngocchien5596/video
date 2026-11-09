import type { Episode } from "../lib/types.ts";
import { TUAN_1 } from "./tuan-1.ts";
import { TUAN_2 } from "./tuan-2.ts";
import { TUAN_3 } from "./tuan-3.ts";
import { TUAN_4 } from "./tuan-4.ts";

export const EPISODES: Episode[] = [...TUAN_1, ...TUAN_2, ...TUAN_3, ...TUAN_4];

export const getEpisode = (day: number): Episode => {
  const episode = EPISODES.find((e) => e.day === day);
  if (!episode) {
    throw new Error(`Không có tập ngày ${day}`);
  }
  return episode;
};

/** Câu của ngày hôm sau, dùng cho dòng "Mai là câu: ..." ở cuối video. */
export const nextIdiom = (day: number): string | null =>
  EPISODES.find((e) => e.day === day + 1)?.idiom ?? null;
