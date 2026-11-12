import type { Moment } from "./stage-types.ts";

/**
 * Kiểu dữ liệu dùng chung cho mọi dự án (series).
 * Mỗi dự án tự định nghĩa các nhịp (beat kind) và các trường riêng của tập
 * bằng cách mở rộng `Episode` (xem projects/<dự án>/src/episodes/make.ts).
 */

/** Ai đang nói: Cụ Đồ, Thằng Cháu, hoặc lời dẫn/chữ trên màn hình. Nhân vật dùng chung cho mọi dự án. */
export type Speaker = "CD" | "TC" | "NARRATOR";

/** Tên nhịp, do từng dự án đặt (ví dụ "hook", "flip", "explain"). */
export type BeatKind = string;

export type Line = {
  who: Speaker;
  text: string;
};

export type Beat = {
  kind: BeatKind;
  /** Độ dài nhịp (giây) khi chưa có tiếng. Có tiếng thì dài theo tiếng thật. */
  seconds: number;
  /** Độ dài tối thiểu khi có tiếng (ví dụ cho thẻ tiêu đề kịp chạy hiệu ứng). Mặc định 1,5 giây. */
  minSeconds?: number;
  /** Quãng lặng (giây) thêm vào cuối nhịp, sau câu cuối, để thẻ chữ chạy hết hiệu ứng. Có hay chưa có tiếng đều cộng. */
  holdSeconds?: number;
  /** Mô tả cảnh cho người dựng / cho AI viết phần diễn. */
  shot: string;
  lines: Line[];
  /** Kịch bản diễn cho hoạt hình (engine/stage). Bỏ trống thì dùng animatic chân dung. */
  stage?: Moment[];
  /**
   * Cảnh hồi ức: hình chuyển sang kiểu TV đen trắng ngày xưa (bật TV lúc vào, tắt TV lúc ra),
   * nhân vật được đóng vai (`role`), hết nhịp thì sân khấu tự về đúng trạng thái trước nhịp.
   * Dùng cho ví dụ kể chuyện (truyện cổ tích, chuyện ngày xưa, kỷ niệm). Xem engine/stage/memory.tsx.
   */
  memory?: Memory;
};

/** `true` hoặc kèm nhãn nhỏ góc màn hình (ví dụ "TRUYỆN CỔ TÍCH: THẠCH SANH"). */
export type Memory = true | { label?: string };

/** Phần chung của mọi tập. Dự án thêm trường riêng (câu thành ngữ, câu hỏi, nguồn...). */
export type Episode = {
  day: number;
  /** Nhóm tập (tuần / đợt), dùng để chia file nguồn và kịch bản in. */
  week: number;
  theme: string;
  /** Câu hỏi kéo bình luận, hiện ở cuối video và để ghim. */
  question: string;
  /** Đường dẫn trong public/, ví dụ "footage/ngay-01.mp4". Bỏ trống thì hiện hoạt hình. */
  footage?: string;
  /** false khi đã có phụ đề cháy sẵn trong footage. */
  showSubtitles?: boolean;
  beats: Beat[];
};

/** Một câu thoại đã có file tiếng (do `npm run voice` sinh ra). */
export type VoiceLine = {
  /** Vị trí trong episode.beats và beat.lines. */
  beat: number;
  line: number;
  /** Đường dẫn trong public/, ví dụ "voice/noi-vay/ngay-01/3-1-tc.wav". */
  file: string;
  seconds: number;
  /** Chữ lúc sinh tiếng; khác chữ hiện tại nghĩa là cần chạy lại `npm run voice`. */
  text: string;
};

/** Nội dung public/voice/<dự án>/ngay-XX/manifest.json. */
export type VoiceTrack = {
  day: number;
  lines: VoiceLine[];
};
