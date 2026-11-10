import type { ViSaoEpisode } from "./make.ts";
import { TUAN_1 } from "./tuan-1.ts";
import { TUAN_2 } from "./tuan-2.ts";
import { TUAN_3 } from "./tuan-3.ts";
import { TUAN_4 } from "./tuan-4.ts";
import { TUAN_5 } from "./tuan-5.ts";
import { TUAN_6 } from "./tuan-6.ts";
import { TUAN_7 } from "./tuan-7.ts";

export const EPISODES: ViSaoEpisode[] = [...TUAN_1, ...TUAN_2, ...TUAN_3, ...TUAN_4, ...TUAN_5, ...TUAN_6, ...TUAN_7];

/** Câu hỏi của tập sau (hoặc câu hẹn trong tập nếu tập sau chưa viết), cho dòng "Câu hỏi tiếp" ở cuối video. */
export const nextTeaser = (day: number): string | null =>
  EPISODES.find((e) => e.day === day + 1)?.ask ?? EPISODES.find((e) => e.day === day)?.teaser ?? null;
