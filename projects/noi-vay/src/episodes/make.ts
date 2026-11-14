import type { Moment } from "../../../../engine/lib/stage-types.ts";
import type { Beat, Episode, Line, Memory } from "../../../../engine/lib/types.ts";

export const CATCHPHRASE = "Ông bà nói vậy, mà không phải vậy!";

/** Quãng lặng sau nhịp đặt câu: thẻ "BẠN HIỂU ĐÚNG CÂU NÀY CHƯA?" bật lên, đứng yên cho kịp đọc, rồi câu bay lên thanh trên cùng. */
export const IDIOM_REVEAL_SECONDS = 1.8;

/** Một tập "Nói Vậy Mà Không Phải Vậy": thêm câu thành ngữ và nghĩa thật. */
export type NoiVayEpisode = Episode & {
  idiom: string;
  /** Nghĩa thật, hiện trên thẻ "NGHĨA THẬT". */
  meaning: string;
};

export const cd = (text: string): Line => ({ who: "CD", text });
export const tc = (text: string): Line => ({ who: "TC", text });

type Part = {
  shot: string;
  lines: Line[];
  seconds?: number;
  /** Kịch bản diễn của nhịp (xem src/lib/stage-types.ts). */
  stage?: Moment[];
  /**
   * Cảnh hồi ức (TV đen trắng ngày xưa). Chuẩn của series: ví dụ kể một câu chuyện
   * (truyện cổ tích, chuyện ngày xưa, tích cổ) thì bật `memory` và diễn lại đúng câu chuyện bằng vai (`role`), phông, đạo cụ.
   */
  memory?: Memory;
};

export type EpisodeSpec = {
  day: number;
  week: Episode["week"];
  theme: string;
  idiom: string;
  meaning: string;
  question: string;
  footage?: string;
  showSubtitles?: boolean;
  /** 0–3s: câu/hành động gây sốc. */
  hook: Part;
  /** 3–6s: câu Cụ Đồ hỏi, Thằng Cháu đáp bằng chính câu thành ngữ. */
  ask: string;
  /** Câu Thằng Cháu đáp (phải có câu thành ngữ). Bỏ trống: "<câu thành ngữ> ạ!". */
  answer?: string;
  /** 6–25s: diễn nghĩa đen, leo thang 2–3 bước. */
  misread: Part;
  /** 25–40s: lời Cụ Đồ giải thích nghĩa thật, nói sau câu cửa miệng. */
  explain: string;
  flipShot?: string;
  /** Kịch bản diễn cho nhịp đặt câu và lật nghĩa (hai nhịp này dựng tự động). */
  titleStage?: Moment[];
  flipStage?: Moment[];
  /** 40–52s: ví dụ đời thường, hoặc một câu chuyện kể lại (khi đó bật `memory`). */
  example: Part;
  /** 52–60s: Thằng Cháu áp dụng sai kiểu mới. */
  punchline: Part;
};

/**
 * Dựng một tập theo đúng 6 nhịp của series.
 * Mặc định: 3 + 3 + 19 + 15 + 12 + 8 = 60 giây, cộng quãng lặng hiện câu sau nhịp đặt câu.
 */
export const makeEpisode = (spec: EpisodeSpec): NoiVayEpisode => {
  const beats: Beat[] = [
    { ...spec.hook, kind: "hook", seconds: spec.hook.seconds ?? 3 },
    {
      kind: "title",
      seconds: 3,
      minSeconds: 3,
      // Nói xong câu thành ngữ thì lặng một nhịp: thẻ "BẠN HIỂU ĐÚNG CÂU NÀY CHƯA?" hiện lên, rồi câu bay lên thanh trên cùng.
      holdSeconds: IDIOM_REVEAL_SECONDS,
      shot: `Cụ Đồ hỏi, TC đáp; nói xong hiện thẻ "BẠN HIỂU ĐÚNG CÂU NÀY CHƯA?" + câu, âm "ding", rồi câu bay lên góc trên`,
      lines: [cd(spec.ask), tc(spec.answer ?? `${spec.idiom} ạ!`)],
      stage: spec.titleStage,
    },
    { ...spec.misread, kind: "misread", seconds: spec.misread.seconds ?? 19 },
    {
      kind: "flip",
      seconds: 15,
      shot: spec.flipShot ?? "Cụ Đồ gõ quạt lên đầu Thằng Cháu, nhạc dừng một nhịp",
      lines: [cd(CATCHPHRASE), cd(spec.explain)],
      stage: spec.flipStage,
    },
    { ...spec.example, kind: "example", seconds: spec.example.seconds ?? 12 },
    { ...spec.punchline, kind: "punchline", seconds: spec.punchline.seconds ?? 8 },
  ];

  return {
    day: spec.day,
    week: spec.week,
    theme: spec.theme,
    idiom: spec.idiom,
    meaning: spec.meaning,
    question: spec.question,
    footage: spec.footage,
    showSubtitles: spec.showSubtitles,
    beats,
  };
};
