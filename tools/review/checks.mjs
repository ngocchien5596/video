/**
 * Kiểm tự động (không cần AI) theo docs/giong-loi-thoai.md, docs/chuan-dung-canh.md và series bible.
 * Mỗi lỗi: { level: "phải sửa" | "nên sửa", kind, where, code, issue, fix, source: "máy" }.
 */
import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { pad2, ROOT } from "../projects.mjs";
import { reviewConfig } from "./store.mjs";

export const MUST = "phải sửa";
export const SHOULD = "nên sửa";

/** Tốc độ đọc ước tính khi câu chưa có giọng (chữ / giây). */
const WORDS_PER_SECOND = 3.6;

const timing = await import(pathToFileURL(path.join(ROOT, "engine", "lib", "timing.ts")).href);

/** Chữ (âm tiết) trong một câu đọc. */
export const countWords = (text) => text.split(/\s+/).filter((w) => /[\p{L}\p{N}]/u.test(w)).length;

/** Lời đọc thật sự của câu (tts nếu có). */
export const spoken = (line) => line.tts ?? line.text;

/** Duyệt mọi câu: [{ b, l, code, where, line, beat }]. */
export const eachLine = (project, episode) =>
  episode.beats.flatMap((beat, b) =>
    beat.lines.map((line, l) => ({
      b,
      l,
      beat,
      line,
      code: `${b + 1}.${l + 1}`,
      where: `hồi ${b + 1} câu ${l + 1}`,
      beatName: project.beats?.[beat.kind] ?? beat.kind,
    })),
  );

const lookahead = String.raw`(?=[\s,.:;!?…]|$)`;
/** Mở câu kiểu dàn ý / điện báo (giong-loi-thoai.md mục 1). */
const OUTLINE = [
  new RegExp(String.raw`^Đề như sau\s*:`, "iu"),
  new RegExp(String.raw`^Mẹo là${lookahead}`, "iu"),
  new RegExp(String.raw`^Mẹo\s*:`, "iu"),
  new RegExp(String.raw`^Chìa kh(ó|o)a là${lookahead}`, "iu"),
  new RegExp(String.raw`^Chìa kh(ó|o)a\s*:`, "iu"),
  new RegExp(String.raw`^Giờ phóng ra${lookahead}`, "iu"),
  new RegExp(String.raw`^Ý chê[^.!?]*:`, "iu"),
  new RegExp(String.raw`^(Bước|Cách|Ý) (\d+|một|hai|ba|bốn|năm)\s*:`, "iu"),
  new RegExp(String.raw`^(Kết luận|Lưu ý|Ghi nhớ|Đáp án|Bài học|Định nghĩa|Công thức)\s*:`, "iu"),
];

/** Tách câu đọc thành các câu nhỏ theo dấu kết câu. */
const sentences = (text) =>
  text
    .split(/(?<=[.!?…])\s+/u)
    .map((s) => s.replace(/^[\s"“”'‘’(«]+/u, "").trim())
    .filter(Boolean);

const short = (s, n = 80) => (s.length > n ? `${s.slice(0, n - 1)}…` : s);

/** Chữ nước ngoài chưa có cách đọc (gọi python: tts_text + unknown_words như tools/voice/scan-names.mjs). */
export const unknownWordsBatch = (texts) => {
  if (!texts.length) return { words: [], error: null };
  const dir = path.join(ROOT, "out", "review");
  mkdirSync(dir, { recursive: true });
  const tmp = path.join(dir, `.voice-scan-${process.pid}.json`);
  writeFileSync(tmp, JSON.stringify(texts), "utf8");
  const py = `
import json, sys
sys.path.insert(0, ${JSON.stringify(path.join(ROOT, "tools", "voice"))})
sys.stdout.reconfigure(encoding="utf-8")
from make_voice import tts_text
from vi_text import unknown_words
out = []
for t in json.load(open(${JSON.stringify(tmp)}, encoding="utf-8")):
    out.append(sorted(set(unknown_words(tts_text(t)))))
print(json.dumps(out, ensure_ascii=False))
`;
  const r = spawnSync(process.env.PYTHON || "python", ["-c", py], { encoding: "utf8" });
  rmSync(tmp, { force: true });
  if (r.status !== 0) return { words: texts.map(() => []), error: (r.stderr || r.error?.message || "python lỗi").slice(-400) };
  try {
    return { words: JSON.parse(r.stdout.trim().split(/\r?\n/).at(-1)), error: null };
  } catch {
    return { words: texts.map(() => []), error: `Không đọc được kết quả python: ${r.stdout.slice(-200)}` };
  }
};

/** Manifest giọng của tập (null nếu chưa lồng tiếng). */
export const loadVoice = (project, day) => {
  const file = path.join(ROOT, "public", "voice", project.id, `ngay-${pad2(day)}`, "manifest.json");
  if (!existsSync(file)) return null;
  try {
    return JSON.parse(readFileSync(file, "utf8"));
  } catch {
    return null;
  }
};

/**
 * Thời lượng: dùng giây thật của câu đã có giọng (đúng chữ hiện tại), câu chưa có thì ước WORDS_PER_SECOND.
 * Tính bằng episodeTimeline của engine, nên có cả quãng nghỉ, minSeconds, holdSeconds và thẻ cuối.
 */
export const estimateDuration = (project, episode, voice) => {
  const lines = [];
  let voiced = 0;
  let total = 0;
  episode.beats.forEach((beat, b) =>
    beat.lines.forEach((line, l) => {
      total++;
      const real = voice?.lines.find((v) => v.beat === b && v.line === l && v.text === line.text);
      if (real) voiced++;
      lines.push({
        beat: b,
        line: l,
        file: real?.file ?? "",
        text: line.text,
        seconds: real?.seconds ?? Math.max(0.8, countWords(spoken(line)) / WORDS_PER_SECOND),
      });
    }),
  );
  const seconds = timing.episodeTimeline(episode, { day: episode.day, lines }).seconds;
  return { seconds: Math.round(seconds * 10) / 10, voiced, total };
};

/** Trục thời gian thật mà composition dùng (để chọn khung chụp ảnh cảnh). */
export const realTimeline = (episode, voice) => timing.episodeTimeline(episode, voice);
export const FPS = timing.FPS;

/**
 * Chạy mọi kiểm tự động của một tập. `unknown` là danh sách chữ lạ theo từng câu (cùng thứ tự eachLine).
 * Trả về { issues, duration, frozen }.
 */
export const autoChecks = (project, episode, { unknown = [], voice = null } = {}) => {
  const cfg = reviewConfig(project);
  const issues = [];
  const add = (level, kind, where, code, issue, fix) => issues.push({ level, kind, where, code, issue, fix, source: "máy" });

  eachLine(project, episode).forEach(({ line, code, where }, i) => {
    const say = spoken(line);
    const n = countWords(say);
    // Luật 38 chữ tính cho từng câu (ngắt ở . ? !); cả lượt nói dài quá 1,6 lần mức đó thì chỉ nhắc "nên sửa".
    const longest = Math.max(0, ...sentences(say).map((s) => countWords(s)));
    if (longest > cfg.maxWords) {
      add(MUST, "lời", where, code, `Có câu dài ${longest} chữ (tối đa ${cfg.maxWords}): “${short(say)}”`, "Tách làm hai câu, hoặc bỏ bớt ý phụ.");
    } else if (n > cfg.maxWords * 1.6) {
      add(SHOULD, "lời", where, code, `Lượt nói dài ${n} chữ, dễ thành độc thoại: “${short(say)}”`, "Cân nhắc tách thành hai lượt hoặc rút gọn.");
    }
    for (const s of sentences(say)) {
      if (OUTLINE.some((re) => re.test(s))) {
        add(MUST, "lời", where, code, `Mở câu kiểu dàn ý: “${short(s, 60)}”`, "Nói thành câu kể tự nhiên, bắt từ ý vừa nói (xem giong-loi-thoai.md mục 1).");
      } else if (/^[^,.!?:;]{1,30}:\s/u.test(s) && countWords(s.split(":")[0]) <= 4) {
        add(SHOULD, "lời", where, code, `Câu mở bằng nhãn và dấu hai chấm: “${short(s, 60)}”`, "Bỏ dấu hai chấm, nói liền thành câu.");
      }
    }
    if (line.who === "NARRATOR" && /^\s*["“'‘]?Ông(?=[\s,.!?]|$)/u.test(say)) {
      add(MUST, "lời", where, code, `Câu người dẫn bắt đầu bằng “Ông”: “${short(say, 60)}”`, "Đổi chữ mở câu (giọng NARRATOR dễ bị đọc lẫn sang giọng Cụ Đồ).");
    }
    if (/cho\s+mà\s+nghe/iu.test(say)) {
      add(MUST, "lời", where, code, `Có cụm “cho mà nghe”: “${short(say, 60)}”`, "Bỏ cụm này (giống câu mẫu của giọng Cụ Đồ, mô hình dễ đọc lẫn).");
    }
    for (const [label, t] of [
      ["phụ đề", line.text],
      ["lời đọc", line.tts],
    ]) {
      if (t && /[()]/.test(t)) {
        add(MUST, "lời", where, code, `Có ngoặc đơn trong ${label}: “${short(t, 70)}”`, "Bỏ ngoặc, nói liền bằng dấu phẩy.");
      }
    }
    const words = unknown[i] ?? [];
    if (words.length) {
      add(MUST, "lời", where, code, `Chữ nước ngoài chưa có cách đọc: ${words.join(", ")}`, "Phiên âm trong tts, hoặc thêm vào bảng PRONOUNCE (tools/voice/vi_text.py), rồi chạy npm run voice:names.");
    }
  });

  for (const v of voice?.lines ?? []) {
    const line = episode.beats[v.beat]?.lines[v.line];
    if (v.leak?.length && line && v.text === line.text) {
      add(MUST, "lời", `hồi ${v.beat + 1} câu ${v.line + 1}`, `${v.beat + 1}.${v.line + 1}`, `Tiếng đã sinh đọc lẫn câu mẫu giọng: “${v.leak.join("; ")}”`, "Lồng lại câu này (npm run voice), vẫn lẫn thì đổi chữ câu.");
    }
  }

  const duration = estimateDuration(project, episode, voice);
  const how = duration.voiced === duration.total ? "theo giọng thật" : `ước tính, ${duration.voiced}/${duration.total} câu có giọng thật`;
  if (duration.seconds > cfg.maxSeconds) {
    add(MUST, "khác", "cả tập", "", `Dài ${duration.seconds} giây (${how}), vượt giới hạn ${cfg.maxSeconds} giây kể cả thẻ cuối.`, `Rút gọn lời còn dưới ${cfg.maxSeconds} giây.`);
  } else if (cfg.warnSeconds && duration.seconds > cfg.warnSeconds) {
    add(SHOULD, "khác", "cả tập", "", `Dài ${duration.seconds} giây (${how}), trên mức nên có ${cfg.warnSeconds} giây.`, "Cân nhắc cắt bớt ý phụ để giữ người xem.");
  }

  if (!episode.question?.trim()) add(MUST, "khác", "câu hỏi cuối", "hoi", "Thiếu câu hỏi cuối video (question).", "Thêm một câu hỏi dễ trả lời trong bình luận.");
  if (cfg.minSources) {
    const sources = (episode.sources ?? []).filter((s) => /^https?:\/\//.test(s.url ?? "") && s.title?.trim());
    if (sources.length < cfg.minSources) {
      add(MUST, "sự thật", "nguồn", "", `Có ${sources.length} nguồn có link, cần ít nhất ${cfg.minSources}.`, "Bổ sung nguồn kiểm chứng (tên trang + link).");
    }
  }
  for (const p of project.validate?.(episode) ?? []) {
    // Thiếu nguồn / thiếu câu hỏi đã báo ở trên, không báo trùng.
    if (cfg.minSources && /nguồn/i.test(p)) continue;
    if (/question|câu hỏi cuối/i.test(p) && !episode.question?.trim()) continue;
    add(MUST, "khác", "ràng buộc dự án", "", p, "Sửa theo ràng buộc của dự án (project.mjs → validate).");
  }

  const frozen = cfg.frozenDays.includes(episode.day);
  return { issues: frozen ? issues.map(freeze) : issues, duration, frozen };
};

/** Tập đã đăng: chỉ ghi nhận, không đề nghị sửa. */
export const freeze = (issue) => ({ ...issue, level: "ghi nhận", fix: "" });
