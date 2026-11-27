import type { DoanXemEpisode } from "./make.ts";
import { DOT_1 } from "./dot-1.ts";

export const EPISODES: DoanXemEpisode[] = [...DOT_1];

/** Chủ kênh 16/11/2026: không công bố trước tập sau ở bất cứ đâu. Luôn trả về null. */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const nextTeaser = (_day: number): string | null => null;
