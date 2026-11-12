import type { Beat, BeatKind, Episode, Line, VoiceTrack } from "./types.ts";

export const FPS = 30;
export const WIDTH = 1080;
export const HEIGHT = 1920;

/** Số từ tối đa trên một khung phụ đề. */
const MAX_WORDS = 7;

/** Thời lượng (giây) cuối video dành riêng cho thẻ câu hỏi và "Mai là câu: ...", tính cả đoạn nối về đầu. */
export const END_CARD_SECONDS = 2.4;
/** Đoạn cuối cùng: vòng tròn mở ra khung hình đầu tiên, để video lặp lại liền mạch. */
export const LOOP_SECONDS = 0.4;

/** Khi có tiếng: nghỉ trước câu đầu, giữa hai câu, và sau câu cuối của mỗi nhịp. */
const VOICE_LEAD = 0.15;
const VOICE_GAP = 0.2;
const VOICE_TAIL = 0.3;
/** Độ dài tối thiểu của một nhịp có tiếng, khi nhịp không tự đặt minSeconds. */
const DEFAULT_MIN_BEAT_SECONDS = 1.5;

export type Cue = Line & {
  beat: BeatKind;
  /** Giây bắt đầu/kết thúc, tính từ đầu video. */
  start: number;
  end: number;
};

export type TimedBeat = Beat & { start: number; end: number };

/** Một file tiếng đặt trên trục thời gian. */
export type SpokenLine = { file: string; start: number; seconds: number };

/** Thời điểm một câu thoại được nói, để kịch bản diễn bám theo. */
export type LineTime = { beat: number; line: number; start: number; end: number };

export type Timeline = {
  beats: TimedBeat[];
  lines: LineTime[];
  cues: Cue[];
  spoken: SpokenLine[];
  seconds: number;
};

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

/** Chia đoạn [start, start + seconds] cho các cụm phụ đề của một câu, theo số từ. */
const lineCues = (line: Line, beat: BeatKind, start: number, seconds: number): Cue[] => {
  const pieces = chunkText(line.text);
  const weights = pieces.map((p) => Math.max(3, p.split(/\s+/).length));
  const total = weights.reduce((a, b) => a + b, 0);
  let t = start;
  return pieces.map((text, i) => {
    const duration = (seconds * weights[i]) / total;
    const cue = { ...line, text, beat, start: t, end: t + duration };
    t += duration;
    return cue;
  });
};

/** Câu đã có tiếng và tiếng đó sinh từ đúng chữ hiện tại. */
const voiceFor = (voice: VoiceTrack | null | undefined, beat: number, line: number, text: string) =>
  voice?.lines.find((v) => v.beat === beat && v.line === line && v.text === text);

/**
 * Trục thời gian của một tập.
 *
 * - Không có tiếng: mỗi nhịp dài đúng `seconds`, thời gian chia cho các câu theo số từ (bản nháp).
 * - Có tiếng: nhịp nào có đủ tiếng thì dài theo tiếng thật, phụ đề bắt đầu đúng lúc mỗi câu được đọc.
 *   Nhịp còn thiếu tiếng (hoặc chữ đã sửa sau khi sinh) thì giữ cách tính cũ.
 */
export const episodeTimeline = (episode: Episode, voice?: VoiceTrack | null): Timeline => {
  const beats: TimedBeat[] = [];
  const cues: Cue[] = [];
  const spoken: SpokenLine[] = [];
  const lines: LineTime[] = [];
  let t = 0;

  episode.beats.forEach((beat, b) => {
    const start = t;
    const voices = beat.lines.map((line, l) => voiceFor(voice, b, l, line.text));
    // Nhịp cuối chừa thời gian cho thẻ cuối (câu hỏi + câu ngày mai).
    const endCard = b === episode.beats.length - 1 ? END_CARD_SECONDS : 0;

    if (beat.lines.length > 0 && voices.every(Boolean)) {
      let cursor = start + VOICE_LEAD;
      beat.lines.forEach((line, l) => {
        const v = voices[l]!;
        spoken.push({ file: v.file, start: cursor, seconds: v.seconds });
        lines.push({ beat: b, line: l, start: cursor, end: cursor + v.seconds });
        cues.push(...lineCues(line, beat.kind, cursor, v.seconds));
        cursor += v.seconds + (l < beat.lines.length - 1 ? VOICE_GAP : 0);
      });
      const min = beat.minSeconds ?? DEFAULT_MIN_BEAT_SECONDS;
      t = Math.max(start + min, cursor + VOICE_TAIL) + (beat.holdSeconds ?? 0) + endCard;
    } else {
      t = start + beat.seconds + (beat.holdSeconds ?? 0);
      // Chia thời gian cho cả nhịp theo số từ; chừa thẻ cuối ở nhịp cuối.
      const speakSeconds = Math.max(1, beat.seconds - endCard);
      const words = beat.lines.map((line) => Math.max(3, line.text.split(/\s+/).length));
      const total = words.reduce((a, c) => a + c, 0);
      let cursor = start;
      beat.lines.forEach((line, l) => {
        const seconds = (speakSeconds * words[l]) / total;
        cues.push(...lineCues(line, beat.kind, cursor, seconds));
        lines.push({ beat: b, line: l, start: cursor, end: cursor + seconds });
        cursor += seconds;
      });
    }
    beats.push({ ...beat, start, end: t });
  });

  return { beats, lines, cues, spoken, seconds: t };
};

export const timedBeats = (episode: Episode, voice?: VoiceTrack | null) =>
  episodeTimeline(episode, voice).beats;

export const episodeCues = (episode: Episode, voice?: VoiceTrack | null) =>
  episodeTimeline(episode, voice).cues;

export const episodeSeconds = (episode: Episode, voice?: VoiceTrack | null) =>
  episodeTimeline(episode, voice).seconds;

export const episodeFrames = (episode: Episode, voice?: VoiceTrack | null) =>
  Math.round(episodeSeconds(episode, voice) * FPS);

export const findBeat = (episode: Episode, kind: BeatKind) =>
  timedBeats(episode).find((beat) => beat.kind === kind);

export const pad2 = (n: number) => String(n).padStart(2, "0");

/** Thư mục tiếng của một tập, tính trong public/. */
export const voiceDir = (project: string, day: number) => `voice/${project}/ngay-${pad2(day)}`;

/** Đường dẫn manifest tiếng của một tập, tính trong public/. */
export const voiceManifestPath = (project: string, day: number) => `${voiceDir(project, day)}/manifest.json`;
