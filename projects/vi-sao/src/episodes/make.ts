import type { Moment } from "../../../../engine/lib/stage-types.ts";
import type { Beat, Episode, Line } from "../../../../engine/lib/types.ts";

/** Một nguồn kiểm chứng: tên trang và đường link. */
export type Source = { title: string; url: string };

/** Một tập "Ông Ơi, Vì Sao?": một câu hỏi của trẻ, một hiểu lầm phổ biến, một câu trả lời đã kiểm chứng. */
export type ViSaoEpisode = Episode & {
  /** Câu hỏi của tập, cũng là tiêu đề. Ví dụ "Vì sao bầu trời màu xanh?". */
  ask: string;
  /** Cách giải thích sai mà nhiều người hay nói, để bóc ở nhịp "Đoán thử". */
  myth: string;
  /** Câu trả lời trong một câu, hiện ở thẻ "TÓM LẠI" và được Cụ Đồ đọc. */
  answer: string;
  /** Nguồn kiểm chứng, ít nhất 2 nguồn uy tín (cơ quan khoa học, bảo tàng, đại học). */
  sources: Source[];
  /** Lứa tuổi phù hợp, ví dụ "5–9 tuổi". */
  ages: string;
  /** Câu hỏi hẹn tập sau, khi tập sau chưa viết. */
  teaser?: string;
};

export const cd = (text: string): Line => ({ who: "CD", text });
export const tc = (text: string): Line => ({ who: "TC", text });

type Part = {
  shot: string;
  lines: Line[];
  seconds?: number;
  /** Kịch bản diễn của nhịp (xem engine/lib/stage-types.ts). Kênh "board" hiện sơ đồ minh hoạ. */
  stage?: Moment[];
};

export type EpisodeSpec = {
  day: number;
  week: number;
  theme: string;
  ask: string;
  myth: string;
  answer: string;
  sources: Source[];
  ages: string;
  /** Câu hỏi kéo bình luận (hướng tới phụ huynh), hiện ở thẻ cuối và để ghim. */
  question: string;
  teaser?: string;
  footage?: string;
  /** 0–3s: Thằng Cháu hỏi câu "vì sao". */
  hook: Part;
  /** 3–10s: đoán thử theo cách hiểu sai phổ biến, Cụ Đồ bảo chưa đúng và đưa bằng chứng. */
  guess: Part;
  /** 10–35s: Cụ Đồ giải thích từng bước, bảng minh hoạ đi theo từng câu. Mỗi câu một ý. */
  explain: Part;
  /** Phần diễn cho nhịp tóm lại (câu thoại tự sinh từ "answer"). */
  recapStage?: Moment[];
  /** Kết: Thằng Cháu hỏi tiếp câu sau, tạo tò mò cho tập sau. */
  outro: Part;
};

/** "Không khí hắt..." → "không khí hắt..." để ghép sau "Tóm lại, ". */
const lowerFirst = (s: string) => s.charAt(0).toLowerCase() + s.slice(1);

/**
 * Dựng một tập theo 5 nhịp: hỏi → đoán thử → giải thích → tóm lại → hỏi tiếp.
 * Mặc định khi chưa có tiếng: 3 + 7 + 22 + 5 + 6 = 43 giây.
 */
export const makeEpisode = (spec: EpisodeSpec): ViSaoEpisode => {
  const beats: Beat[] = [
    { ...spec.hook, kind: "hook", seconds: spec.hook.seconds ?? 3 },
    { ...spec.guess, kind: "guess", seconds: spec.guess.seconds ?? 7 },
    { ...spec.explain, kind: "explain", seconds: spec.explain.seconds ?? 22 },
    {
      kind: "recap",
      seconds: 5,
      // Đủ thời gian đọc thẻ "TÓM LẠI".
      minSeconds: 3.5,
      shot: `Thẻ "TÓM LẠI" hiện câu trả lời, Cụ Đồ đọc lại một câu`,
      lines: [cd(`Tóm lại, ${lowerFirst(spec.answer)}`)],
      stage: spec.recapStage,
    },
    { ...spec.outro, kind: "outro", seconds: spec.outro.seconds ?? 6 },
  ];

  return {
    day: spec.day,
    week: spec.week,
    theme: spec.theme,
    ask: spec.ask,
    myth: spec.myth,
    answer: spec.answer,
    sources: spec.sources,
    ages: spec.ages,
    question: spec.question,
    teaser: spec.teaser,
    footage: spec.footage,
    beats,
  };
};
