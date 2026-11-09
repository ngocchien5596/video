/**
 * Đọc, hiển thị và sửa kịch bản một tập.
 *
 * Mỗi chỗ sửa được có một mã:
 *   3.2   câu thoại thứ 2 của nhịp 3
 *   3.c   mô tả cảnh của nhịp 3
 *   nghia nghĩa thật · hoi câu hỏi cuối video
 * Sửa = tìm chuỗi đúng bằng nội dung cũ trong khối makeEpisode của tập đó (src/episodes/tuan-X.ts)
 * rồi thay bằng nội dung mới, sau đó kiểm tra lại bằng TypeScript.
 */
import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { ROOT } from "./config.mjs";
import { esc } from "./telegram.mjs";

const BEAT_NAMES = {
  hook: "HOOK",
  title: "ĐẶT CÂU",
  misread: "HIỂU SAI",
  flip: "LẬT NGHĨA",
  example: "VÍ DỤ",
  punchline: "PUNCHLINE",
};
const WHO = { CD: "Cụ Đồ", TC: "Cháu", NARRATOR: "Dẫn" };

/** Đọc tập mới nhất từ đĩa (tiến trình con, tránh cache import). */
export const loadEpisode = (day) => {
  const out = execFileSync(process.execPath, [path.join(ROOT, "tools", "bot", "episode-data.mjs"), String(day)], {
    cwd: ROOT,
    encoding: "utf8",
  });
  return JSON.parse(out);
};

/** Danh sách các chỗ trong kịch bản, kèm mã và nội dung hiện tại. */
export const slots = (episode) => {
  const list = [
    { code: "nghia", label: "Nghĩa thật", text: episode.meaning },
    { code: "hoi", label: "Câu hỏi cuối video", text: episode.question },
  ];
  episode.beats.forEach((beat, b) => {
    list.push({ code: `${b + 1}.c`, label: `Cảnh nhịp ${b + 1}`, text: beat.shot });
    beat.lines.forEach((line, l) => {
      list.push({ code: `${b + 1}.${l + 1}`, label: `${WHO[line.who]} (nhịp ${b + 1})`, text: line.text, who: line.who });
    });
  });
  return list;
};

/** Câu tự sinh từ khuôn (không sửa trực tiếp được). */
const isGenerated = (episode, code) => {
  const t = episode.beats[1]?.kind === "title" ? 2 : -1;
  const f = episode.beats[3]?.kind === "flip" ? 4 : -1;
  return code === `${t}.2` || code === `${t}.c` || code === `${f}.1`;
};

/** Kịch bản dạng tin nhắn Telegram (HTML). Trả về mảng vì tin nhắn tối đa 4096 ký tự. */
export const formatScript = (episode, next, header = "") => {
  const parts = [];
  let msg = `${header}<b>NGÀY ${episode.day}/30 · “${esc(episode.idiom)}”</b>\n`;
  msg += `<b>Nghĩa thật</b> <code>nghia</code>: ${esc(episode.meaning)}\n`;
  msg += `<b>Câu hỏi</b> <code>hoi</code>: ${esc(episode.question)}\n`;
  if (next) msg += `<b>Mai là câu:</b> ${esc(next)}\n`;
  msg += episode.beats.some((b) => b.stage?.length)
    ? "🎭 Có phần diễn hoạt hình\n"
    : "🎭 Chưa có phần diễn (video dạng chân dung). Muốn có thì bấm Sửa thoại, nhắn “viết phần diễn”.\n";

  episode.beats.forEach((beat, b) => {
    let block = `\n<b>${b + 1}. ${BEAT_NAMES[beat.kind]}</b>\n<i><code>${b + 1}.c</code> Cảnh: ${esc(beat.shot)}</i>\n`;
    beat.lines.forEach((line, l) => {
      const code = `${b + 1}.${l + 1}`;
      const lock = isGenerated(episode, code) ? " 🔒" : "";
      block += `<code>${code}</code> <b>${WHO[line.who]}:</b> ${esc(line.text)}${lock}\n`;
    });
    if (msg.length + block.length > 3900) {
      parts.push(msg);
      msg = "";
    }
    msg += block;
  });
  msg += `\n🔒 = câu tự sinh từ câu thành ngữ / câu cửa miệng, sửa trong repo.`;
  parts.push(msg);
  return parts;
};

// ---------------------------------------------------------------- sửa file nguồn

const episodeFile = (week) => path.join(ROOT, "src", "episodes", `tuan-${week}.ts`);

/** Vị trí khối makeEpisode({ day: N, ... }) trong file nguồn. */
const episodeBlock = (source, day) => {
  const m = new RegExp(`\\bday:\\s*${day}\\s*,`).exec(source);
  if (!m) throw new Error(`Không tìm thấy tập ${day} trong file nguồn`);
  const start = source.lastIndexOf("makeEpisode(", m.index);
  const nextStart = source.indexOf("makeEpisode(", m.index);
  return { start, end: nextStart < 0 ? source.length : nextStart };
};

const STRING = /"(?:[^"\\\n]|\\.)*"/g;
const parseLiteral = (lit) => {
  try {
    return JSON.parse(lit.replace(/\\'/g, "'"));
  } catch {
    return null;
  }
};

/**
 * Áp dụng các thay đổi [{ code, text }] vào file nguồn của tập.
 * Kiểm tra lại bằng tsc; lỗi thì trả file về như cũ và ném lỗi.
 */
export const applyChanges = (day, changes) => {
  const { episode } = loadEpisode(day);
  const all = slots(episode);
  const file = episodeFile(episode.week);
  const original = readFileSync(file, "utf8");
  let source = original;

  for (const change of changes) {
    const slot = all.find((s) => s.code === change.code);
    if (!slot) throw new Error(`Không có mã ${change.code}`);
    if (isGenerated(episode, change.code)) throw new Error(`${change.code} là câu tự sinh, cần sửa trong repo`);
    const { start, end } = episodeBlock(source, day);
    const block = source.slice(start, end);
    const hits = [...block.matchAll(STRING)].filter((m) => parseLiteral(m[0]) === slot.text);
    if (hits.length === 0) throw new Error(`Không tìm thấy nội dung của ${change.code} trong file nguồn`);
    if (hits.length > 1) throw new Error(`Nội dung của ${change.code} xuất hiện ${hits.length} lần, cần sửa trong repo`);
    const at = start + hits[0].index;
    source = source.slice(0, at) + JSON.stringify(change.text) + source.slice(at + hits[0][0].length);
    slot.text = change.text;
  }

  writeFileSync(file, source, "utf8");
  try {
    execFileSync(process.execPath, [path.join(ROOT, "node_modules", "typescript", "bin", "tsc")], { cwd: ROOT, stdio: "pipe" });
    const after = slots(loadEpisode(day).episode);
    for (const change of changes) {
      if (after.find((s) => s.code === change.code)?.text !== change.text) {
        throw new Error(`Kiểm tra lại ${change.code} không khớp`);
      }
    }
  } catch (err) {
    writeFileSync(file, original, "utf8");
    throw new Error(`Đã hoàn tác vì lỗi: ${err.stdout?.toString() || err.message}`);
  }
};

/** Đọc lệnh sửa trực tiếp: mỗi dòng "3.2: nội dung mới" (hoặc "nghia: ...", "hoi: ..."). */
export const parseDirectEdits = (text) => {
  const lines = text.split(/\r?\n/).filter((l) => l.trim());
  const re = /^\s*(\d+\.(?:\d+|c)|nghia|hoi)\s*[:：=]\s*(.+)$/i;
  if (lines.length === 0 || !lines.every((l) => re.test(l))) return null;
  return lines.map((l) => {
    const [, code, value] = re.exec(l);
    return { code: code.toLowerCase(), text: value.trim() };
  });
};
