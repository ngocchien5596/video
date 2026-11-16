import type { ChoLaEpisode } from "./make.ts";
import { TUAN_1 } from "./tuan-1.ts";

export const EPISODES: ChoLaEpisode[] = [...TUAN_1];

/** Chủ kênh 16/11/2026: không công bố trước tập sau (câu hay chủ đề) ở bất cứ đâu: cuối video, mô tả, bình luận ghim. Luôn trả về null. */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const nextTeaser = (_day: number): string | null => null;
