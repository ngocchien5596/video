import type { NoiVayEpisode } from "./make.ts";
import { TUAN_1 } from "./tuan-1.ts";
import { TUAN_2 } from "./tuan-2.ts";
import { TUAN_3 } from "./tuan-3.ts";
import { TUAN_4 } from "./tuan-4.ts";

export const EPISODES: NoiVayEpisode[] = [...TUAN_1, ...TUAN_2, ...TUAN_3, ...TUAN_4].sort((a, b) => a.day - b.day);

export const getEpisode = (day: number): NoiVayEpisode => {
  const episode = EPISODES.find((e) => e.day === day);
  if (!episode) {
    throw new Error(`Không có tập ngày ${day}`);
  }
  return episode;
};

/** Chủ kênh 16/11/2026: không công bố trước tập sau (câu hay chủ đề) ở bất cứ đâu: cuối video, mô tả, bình luận ghim. Luôn trả về null. */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const nextTeaser = (_day: number): string | null => null;
