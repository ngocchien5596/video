import type { Beat, BeatKind, Episode, Line } from "./types.ts";

export const FPS = 30;
export const WIDTH = 1080;
export const HEIGHT = 1920;

/** Số từ tối đa trên một khung phụ đề. */
const MAX_WORDS = 7;

export type Cue = Line & {
  beat: BeatKind;
  /** Giây bắt đầu/kết thúc, tính từ đầu video. */
  start: number;
  end: number;
};

export type TimedBeat = Beat & { start: number; end: number };

export const episodeSeconds = (episode: Episode): number =>
  episode.beats.reduce((sum, beat) => sum + beat.seconds, 0);

export const episodeFrames = (episode: Episode): number =>
  Math.round(episodeSeconds(episode) * FPS);

export const timedBeats = (episode: Episode): TimedBeat[] => {
  let t = 0;
  return episode.beats.map((beat) => {
    const start = t;
    t += beat.seconds;
    return { ...beat, start, end: t };
  });
};

export const findBeat = (episode: Episode, kind: BeatKind) =>
  timedBeats(episode).find((beat) => beat.kind === kind);

/** Cắt một câu dài thành các cụm ngắn, ưu tiên ngắt sau dấu câu. */
export const chunkText = (text: string): string[] => {
  const words = text.trim().split(/\s+/);
  const chunks: string[] = [];
  let current: string[] = [];

  for (const word of words) {
    current.push(word);
    const endsClause = /[,.!?:;…]$/.test(word);
    if (current.length >= MAX_WORDS || (endsClause && current.length >= 3)) {
      chunks.push(current.join(" "));
      current = [];
    }
  }
  if (current.length > 0) {
    // Cụm cuối quá ngắn thì gộp vào cụm trước cho đỡ nháy chữ.
    if (current.length < 3 && chunks.length > 0) {
      chunks[chunks.length - 1] += ` ${current.join(" ")}`;
    } else {
      chunks.push(current.join(" "));
    }
  }
  return chunks;
};

/**
 * Chia thời gian của mỗi nhịp cho các câu thoại theo số từ.
 * Đây là bản nháp; khi có footage thật, chỉnh `seconds` của nhịp
 * hoặc dùng phụ đề tự động của CapCut.
 */
export const episodeCues = (episode: Episode): Cue[] => {
  const cues: Cue[] = [];

  for (const beat of timedBeats(episode)) {
    const pieces = beat.lines.flatMap((line) =>
      chunkText(line.text).map((text) => ({ ...line, text })),
    );
    const weights = pieces.map((p) => Math.max(3, p.text.split(/\s+/).length));
    const total = weights.reduce((a, b) => a + b, 0);
    let t = beat.start;

    pieces.forEach((piece, i) => {
      const duration = (beat.seconds * weights[i]) / total;
      cues.push({ ...piece, beat: beat.kind, start: t, end: t + duration });
      t += duration;
    });
  }
  return cues;
};

export const pad2 = (n: number) => String(n).padStart(2, "0");
