import type { ViSaoEpisode } from "./make.ts";
import { TUAN_1 } from "./tuan-1.ts";
import { TUAN_2 } from "./tuan-2.ts";
import { TUAN_3 } from "./tuan-3.ts";
import { TUAN_4 } from "./tuan-4.ts";
import { TUAN_5 } from "./tuan-5.ts";
import { TUAN_6 } from "./tuan-6.ts";
import { TUAN_7 } from "./tuan-7.ts";
import { TUAN_8 } from "./tuan-8.ts";

export const EPISODES: ViSaoEpisode[] = [...TUAN_1, ...TUAN_2, ...TUAN_3, ...TUAN_4, ...TUAN_5, ...TUAN_6, ...TUAN_7, ...TUAN_8].sort((a, b) => a.day - b.day);

/** Chủ kênh 16/11/2026: không công bố trước tập sau (câu hay chủ đề) ở bất cứ đâu: cuối video, mô tả, bình luận ghim. Luôn trả về null. */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const nextTeaser = (_day: number): string | null => null;
