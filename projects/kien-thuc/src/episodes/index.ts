import type { KienThucEpisode } from "./make.ts";
import { TUAN_1 } from "./tuan-1.ts";
import { TUAN_2 } from "./tuan-2.ts";

export const EPISODES: KienThucEpisode[] = [...TUAN_1, ...TUAN_2];

export const getEpisode = (day: number): KienThucEpisode => {
  const episode = EPISODES.find((e) => e.day === day);
  if (!episode) {
    throw new Error(`Không có tập ngày ${day}`);
  }
  return episode;
};

export const nextTeaser = (day: number): string | null =>
  EPISODES.find((e) => e.day === day + 1)?.hudTitle ?? null;
