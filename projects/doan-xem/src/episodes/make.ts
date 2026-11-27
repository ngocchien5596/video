import type { Beat, Episode, Line } from "../../../../engine/lib/types.ts";

/** Một nguồn kiểm chứng đã đọc: tên trang và đường link. */
export type Source = { title: string; url: string };

/** Bốn nhịp cố định của mọi tập (docs/series-bible.md, mục 1). */
export type DoanXemBeat = "mo" | "thu" | "chot" | "khep";

/**
 * Hình của một câu. Hướng C (series bible mục 3): phần lặp lại giữa các tập vẽ bằng code,
 * vài cảnh lớn dùng ảnh tạo bằng AI ngoài (`image`), chưa có ảnh thì vẽ cảnh `ink` dự phòng.
 */
export type Scene = {
  /** Cảnh vẽ bằng code (tên trong src/ink/scenes.tsx). */
  ink: string;
  /** Ảnh AI (đường dẫn trong public/, vd "doan-xem/ngay-01/thang-long.png"); có file thì thay cảnh ink. */
  image?: string;
  /** Prompt tạo ảnh (phần sau đoạn khoá phong cách), để người tạo ảnh dùng. */
  prompt?: string;
  /** Chữ nhỏ trên hình: tên đất / năm. Chỉ chữ cần thiết. */
  chip?: string;
  /** Con số lớn trong câu đọc, hiện to trên hình. */
  big?: string;
};

export type DoanXemLine = Line & { scene: Scene };

export type DoanXemEpisode = Omit<Episode, "beats"> & {
  /** Tên nhân vật, chỉ lộ ở cảnh lật đáp án và trong bài đăng. */
  person: string;
  /** Tác phẩm / dấu ấn đi kèm tên ở ấn đỏ (vd "Truyện Kiều"). */
  known: string;
  /** Tiêu đề đăng bài: không lộ tên (vd "Con tể tướng, được tặng gươm báu, lại thành…"). */
  title: string;
  /** Câu đố ngắn trên khung vàng của ảnh bìa (≤ ~45 chữ cái), KHÔNG lộ tên. */
  coverTitle: string;
  /** Màu nhấn riêng của nhân vật (mục 2). */
  accent: string;
  /** Có chân dung thật không; không có thì cảnh lật ghi "tranh minh hoạ". */
  portrait: "minh-hoa" | "anh-that";
  sources: Source[];
  beats: (Omit<Beat, "lines"> & { lines: DoanXemLine[] })[];
};

/** Câu người dẫn kèm hình. */
export const n = (text: string, scene: Scene, extra: Partial<Line> = {}): DoanXemLine => ({ who: "NARRATOR", text, scene, ...extra });

/** Khoảng dừng đoán sau gợi ý cuối, có đồng hồ đếm ngược (mục 1). */
export const GUESS_PAUSE = 3;

type Part = { shot: string; lines: DoanXemLine[]; seconds?: number };

export type EpisodeSpec = {
  day: number;
  week: number;
  theme: string;
  person: string;
  known: string;
  title: string;
  coverTitle: string;
  accent: string;
  portrait: "minh-hoa" | "anh-that";
  sources: Source[];
  question: string;
  /** Nhóm 1: mơ hồ, người xem chưa nên đoán ra. */
  mo: Part;
  /** Nhóm 2: thu hẹp, có một cú lừa có chủ đích. */
  thu: Part;
  /** Nhóm 3: gần chốt. Câu cuối của nhóm là gợi ý cuối, sau đó dừng đoán; câu kế tiếp lật đáp án. */
  chot: Part;
  /** Khép lại: câu kết quay về hình ảnh của câu mở. */
  khep: Part;
};

const part = (kind: DoanXemBeat, p: Part, seconds: number) => ({ ...p, kind, seconds: p.seconds ?? seconds });

export const makeEpisode = (spec: EpisodeSpec): DoanXemEpisode => ({
  day: spec.day,
  week: spec.week,
  theme: spec.theme,
  person: spec.person,
  known: spec.known,
  title: spec.title,
  coverTitle: spec.coverTitle,
  accent: spec.accent,
  portrait: spec.portrait,
  sources: spec.sources,
  question: spec.question,
  beats: [part("mo", spec.mo, 30), part("thu", spec.thu, 30), part("chot", spec.chot, 22), part("khep", spec.khep, 20)],
});

/** Câu lật đáp án: câu ngay sau câu có khoảng dừng đoán, trong nhịp "chot". */
export const revealIndex = (episode: DoanXemEpisode) => {
  const b = episode.beats.findIndex((x) => x.kind === "chot");
  const l = episode.beats[b]?.lines.findIndex((x) => (x.pauseAfter ?? 0) >= GUESS_PAUSE) ?? -1;
  return { beat: b, line: l + 1, guessLine: l };
};
