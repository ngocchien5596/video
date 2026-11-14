import type { Moment } from "../../../../engine/lib/stage-types.ts";
import type { Beat, Episode, Line } from "../../../../engine/lib/types.ts";

/** Một nguồn kiểm chứng: tên trang và đường link. */
export type Source = { title: string; url: string };

/** Thẻ số liệu chữ to (góc trên bên trái), hiện từ câu `line` của nhịp `beat` đến hết nhịp hoặc tới thẻ kế tiếp. */
export type Fact = { beat: ChoLaBeat; line?: number; big: string; label: string };

/** Tập này nhắm kéo bình luận hay kéo thả tim (để xếp lịch xen kẽ và đo kết quả). */
export type Interaction = "binh-luan" | "tha-tim";

export type ChoLaBeat = "hook" | "call" | "guess" | "reason" | "twist" | "chot";

/**
 * Một tập "Ông Ơi, Chỗ Này Lạ Lắm!": Thằng Cháu đến một nơi, gặp chuyện lạ, gọi video hỏi Ông.
 * Ông kể (giọng kể là chính), hình minh hoạ toàn màn hình, có bước ngoặt, kết bằng câu chốt và một thành ngữ.
 */
export type ChoLaEpisode = Episode & {
  /** Tiêu đề tập, dạng nghịch lý, cũng là tiêu đề đăng bài. Ví dụ "Thành phố trăm năm không có đèn đỏ". */
  title: string;
  /** Nơi chốn / chủ thể của tập (hiện ở thanh trên). */
  place: string;
  /** Nguồn kiểm chứng, ít nhất 2 nguồn uy tín. */
  sources: Source[];
  /** Câu hỏi cho người xem ở thẻ cuối và bình luận ghim: trả lời được bằng một câu ngắn. */
  question: string;
  interaction: Interaction;
  facts: Fact[];
  /** Tiêu đề tập sau khi tập sau chưa viết. */
  teaser?: string;
};

export const cd = (text: string): Line => ({ who: "CD", text });
export const tc = (text: string): Line => ({ who: "TC", text });

type Part = {
  shot: string;
  lines: Line[];
  seconds?: number;
  /** Kịch bản diễn (engine/lib/stage-types.ts). Kênh `call` bật / tắt khung gọi video của Ông. */
  stage?: Moment[];
  /** Chiếu như cảnh hồi ức TV đen trắng (chuyện xưa). */
  memory?: { label?: string };
};

export type EpisodeSpec = {
  day: number;
  week: number;
  theme: string;
  title: string;
  place: string;
  sources: Source[];
  question: string;
  interaction: Interaction;
  facts?: Fact[];
  teaser?: string;
  /** 0–3s: Thằng Cháu tại chỗ, thốt ra câu nghịch lý. Hình phải minh hoạ đúng câu nói. */
  hook: Part;
  /** 3–6s: chuông gọi, Ông bắt máy, nói tên nơi và loại trước cách giải thích dễ đoán ("mà không phải vì… đâu"). */
  call: Part;
  /** 6–14s: Cháu đoán theo kiểu ai cũng nghĩ (hài, rõ là sai), Ông gạt đi. */
  guess: Part;
  /** 14–26s: lý do thứ nhất, một con số, một phép so sánh bằng hình. Ông kể (khung gọi phóng to) xen hình minh hoạ. */
  reason: Part;
  /** 26–48s: câu kéo lại ("Nhưng lạ nhất lại là…") rồi lớp bất ngờ thứ hai / bước ngoặt thời gian. */
  twist: Part;
  /** 48–56s: Cháu tóm ý bằng câu dí dỏm nhắc lại hình ảnh mở đầu, Ông chốt bằng một thành ngữ. */
  chot: Part;
};

const part = (kind: ChoLaBeat, p: Part, seconds: number): Beat => ({ ...p, kind, seconds: p.seconds ?? seconds });

/**
 * Dựng một tập theo 6 nhịp: nghịch lý → gọi Ông → đoán sai → lý do → bước ngoặt → chốt.
 * Mặc định khi chưa có tiếng: 4 + 4 + 8 + 12 + 20 + 8 = 56 giây (cộng thẻ cuối).
 */
export const makeEpisode = (spec: EpisodeSpec): ChoLaEpisode => ({
  day: spec.day,
  week: spec.week,
  theme: spec.theme,
  title: spec.title,
  place: spec.place,
  sources: spec.sources,
  question: spec.question,
  interaction: spec.interaction,
  facts: spec.facts ?? [],
  teaser: spec.teaser,
  beats: [
    part("hook", spec.hook, 4),
    part("call", spec.call, 4),
    part("guess", spec.guess, 8),
    part("reason", spec.reason, 12),
    part("twist", spec.twist, 20),
    part("chot", spec.chot, 8),
  ],
});
