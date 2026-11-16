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

/** Chủ kênh 16/11/2026: không công bố trước tập sau (câu hay chủ đề) ở bất cứ đâu: cuối video, mô tả, bình luận ghim. Luôn trả về null. */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const nextTeaser = (_day: number): string | null => null;
