import type { Moment } from "./stage-types.ts";

/** Ai đang nói: Cụ Đồ, Thằng Cháu, hoặc lời dẫn/chữ trên màn hình. */
export type Speaker = "CD" | "TC" | "NARRATOR";

/** 6 nhịp cố định của mọi tập (xem docs/series-bible.md). */
export type BeatKind =
  | "hook"
  | "title"
  | "misread"
  | "flip"
  | "example"
  | "punchline";

export type Line = {
  who: Speaker;
  text: string;
};

export type Beat = {
  kind: BeatKind;
  /** Độ dài nhịp, tính bằng giây. Chỉnh cho khớp footage sau khi quay. */
  seconds: number;
  /** Mô tả cảnh quay cho người quay/dựng. */
  shot: string;
  lines: Line[];
  /** Kịch bản diễn cho hoạt hình (src/stage). Bỏ trống thì dùng animatic chân dung. */
  stage?: Moment[];
};

export type Episode = {
  day: number;
  week: 1 | 2 | 3 | 4;
  theme: string;
  idiom: string;
  /** Nghĩa thật, hiện trên thẻ "NGHĨA THẬT". */
  meaning: string;
  /** Câu hỏi kéo bình luận, hiện ở cuối video và để ghim. */
  question: string;
  /** Đường dẫn trong public/, ví dụ "footage/ngay-01.mp4". Bỏ trống thì hiện animatic. */
  footage?: string;
  /** false khi đã có phụ đề cháy sẵn trong footage (ví dụ phụ đề tự động của CapCut). */
  showSubtitles?: boolean;
  beats: Beat[];
};

/** Một câu thoại đã có file tiếng (do `npm run voice` sinh ra). */
export type VoiceLine = {
  /** Vị trí trong episode.beats và beat.lines. */
  beat: number;
  line: number;
  /** Đường dẫn trong public/, ví dụ "voice/ngay-01/03-tc.wav". */
  file: string;
  seconds: number;
  /** Chữ lúc sinh tiếng; khác chữ hiện tại nghĩa là cần chạy lại `npm run voice`. */
  text: string;
};

/** Nội dung public/voice/ngay-XX/manifest.json. */
export type VoiceTrack = {
  day: number;
  lines: VoiceLine[];
};
