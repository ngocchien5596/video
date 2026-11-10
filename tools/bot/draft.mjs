/**
 * Bản nháp sửa một tập: thay cả khối makeEpisode({ day: N, ... }) trong file nguồn của dự án
 * (projects/<dự án>/src/episodes/...). Bản nháp được kiểm tra trên một bản sao (.bot/check/, gồm
 * engine/ và projects/<dự án>/src) nên file thật không bị đụng tới cho đến khi người dùng bấm Áp dụng.
 */
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { cpSync, existsSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import { ROOT } from "./config.mjs";

const CHECK_DIR = path.join(ROOT, ".bot", "check");
const hash = (s) => createHash("sha1").update(s).digest("hex");

export const episodeFile = (project, week) => path.join(ROOT, project.sourceFile(week));

/**
 * Tìm khối `makeEpisode( ... )` của một tập: đếm ngoặc, bỏ qua chuỗi và chú thích.
 * Trả về { start, end } với source.slice(start, end) === "makeEpisode({ ... })".
 */
export const findBlock = (source, day) => {
  const m = new RegExp(`\\bday:\\s*${day}\\s*,`).exec(source);
  if (!m) throw new Error(`Không tìm thấy tập ${day} trong file nguồn`);
  const start = source.lastIndexOf("makeEpisode(", m.index);
  if (start < 0) throw new Error(`Không tìm thấy makeEpisode của tập ${day}`);

  let depth = 0;
  for (let i = start + "makeEpisode".length; i < source.length; i++) {
    const c = source[i];
    if (c === "/" && source[i + 1] === "/") {
      i = source.indexOf("\n", i);
      if (i < 0) break;
      continue;
    }
    if (c === "/" && source[i + 1] === "*") {
      i = source.indexOf("*/", i) + 1;
      continue;
    }
    if (c === '"' || c === "'" || c === "`") {
      for (i++; i < source.length && source[i] !== c; i++) if (source[i] === "\\") i++;
      continue;
    }
    if (c === "(" || c === "{" || c === "[") depth++;
    if (c === ")" || c === "}" || c === "]") {
      depth--;
      if (depth === 0) return { start, end: i + 1 };
    }
  }
  throw new Error(`Khối makeEpisode của tập ${day} không cân ngoặc`);
};

export const readBlock = (project, week, day) => {
  const source = readFileSync(episodeFile(project, week), "utf8");
  const { start, end } = findBlock(source, day);
  const block = source.slice(start, end);
  return { source, start, end, block, hash: hash(block) };
};

const loadFrom = (project, day, root) =>
  JSON.parse(
    execFileSync(process.execPath, [path.join(ROOT, "tools", "bot", "episode-data.mjs"), project.id, String(day), root], {
      cwd: ROOT,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    }),
  );

/** Kiểm tra cấu trúc tập sau khi sửa: thứ tự nhịp, chỉ số câu trong phần diễn, chữ không rỗng, ràng buộc của dự án. */
const structuralErrors = (project, before, after) => {
  const errors = [];
  if (after.day !== before.day || after.week !== before.week) errors.push("Không được đổi day / week của tập.");
  const kinds = after.beats.map((b) => b.kind).join(",");
  const expected = project.beatOrder.join(",");
  if (kinds !== expected) errors.push(`Thứ tự nhịp sai: ${kinds} (phải là ${expected})`);
  after.beats.forEach((beat, b) => {
    if (beat.lines.length === 0) errors.push(`Nhịp ${b + 1} không có câu thoại nào.`);
    beat.lines.forEach((l, i) => {
      if (!l.text.trim()) errors.push(`Câu ${b + 1}.${i + 1} rỗng.`);
    });
    for (const m of beat.stage ?? []) {
      if (m.line !== undefined && (m.line < 0 || m.line >= beat.lines.length)) {
        errors.push(`Phần diễn nhịp ${b + 1} trỏ tới câu số ${m.line} (chỉ có ${beat.lines.length} câu, đánh số từ 0).`);
      }
      if (m.at !== undefined && (m.at < 0 || m.at > 1)) errors.push(`Phần diễn nhịp ${b + 1} có at = ${m.at} (phải 0..1).`);
    }
  });
  // Ràng buộc nội dung của dự án (ví dụ phải có đủ nguồn) cũng chặn bản nháp.
  errors.push(...project.validate(after));
  return errors;
};

/**
 * Kiểm tra một khối mới cho tập `day` trên bản sao của engine/ và projects/<dự án>/src.
 * Trả về { ok: true, episode, next } hoặc { ok: false, errors } (lỗi TypeScript / cấu trúc).
 */
export const validateDraft = (project, day, week, newBlock) => {
  const before = loadFrom(project, day, ROOT).episode;
  rmSync(CHECK_DIR, { recursive: true, force: true });
  cpSync(path.join(ROOT, "engine"), path.join(CHECK_DIR, "engine"), { recursive: true });
  cpSync(path.join(ROOT, project.rel, "src"), path.join(CHECK_DIR, project.rel, "src"), { recursive: true });
  writeFileSync(
    path.join(CHECK_DIR, "tsconfig.json"),
    JSON.stringify({ extends: "../../tsconfig.json", include: ["engine", "projects"] }),
  );
  const copy = path.join(CHECK_DIR, project.sourceFile(week));
  const source = readFileSync(copy, "utf8");
  const { start, end } = findBlock(source, day);
  writeFileSync(copy, source.slice(0, start) + newBlock + source.slice(end), "utf8");

  try {
    execFileSync(process.execPath, [path.join(ROOT, "node_modules", "typescript", "bin", "tsc"), "-p", CHECK_DIR], {
      cwd: ROOT,
      stdio: "pipe",
    });
  } catch (err) {
    const msg = (err.stdout?.toString() || err.message).replace(/\.bot[\\/]check[\\/]/g, "");
    return { ok: false, errors: [`Lỗi TypeScript:\n${msg.slice(0, 2500)}`] };
  }

  let loaded;
  try {
    loaded = loadFrom(project, day, CHECK_DIR);
  } catch (err) {
    return { ok: false, errors: [`Không chạy được kịch bản mới: ${err.stderr?.toString() || err.message}`] };
  }
  const errors = structuralErrors(project, before, loaded.episode);
  return errors.length ? { ok: false, errors } : { ok: true, episode: loaded.episode, next: loaded.next };
};

/** Ghi khối mới vào file thật. Từ chối nếu khối cũ đã bị sửa từ lúc tạo bản nháp. */
export const applyDraft = (project, day, week, newBlock, expectedHash) => {
  const cur = readBlock(project, week, day);
  if (cur.hash !== expectedHash) {
    throw new Error("Kịch bản trong repo vừa bị sửa ở chỗ khác. Gõ /tap để tải lại rồi sửa lại.");
  }
  writeFileSync(episodeFile(project, week), cur.source.slice(0, cur.start) + newBlock + cur.source.slice(cur.end), "utf8");
};

/**
 * So khớp câu thoại cũ / mới trong một nhịp theo nội dung (dãy con chung dài nhất), để chèn
 * một câu vào giữa hiện là "thêm 3.3" chứ không phải "đổi 3.3 + thêm 3.4".
 */
const diffLines = (oldLines, newLines, b, labelOf) => {
  const n = oldLines.length;
  const m = newLines.length;
  const L = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));
  for (let i = n - 1; i >= 0; i--)
    for (let j = m - 1; j >= 0; j--)
      L[i][j] = oldLines[i].text === newLines[j].text ? L[i + 1][j + 1] + 1 : Math.max(L[i + 1][j], L[i][j + 1]);

  const out = [];
  const gap = (olds, news) => {
    // Trong một khoảng không khớp: ghép cặp lần lượt thành "đổi", phần dư là thêm / bỏ.
    for (let k = 0; k < Math.max(olds.length, news.length); k++) {
      const o = olds[k];
      const w = news[k];
      if (o && w) out.push({ code: `${b}.${w.j + 1}`, label: labelOf(w.line), kind: "change", old: o.line.text, text: w.line.text });
      else if (w) out.push({ code: `${b}.${w.j + 1}`, label: labelOf(w.line), kind: "add", text: w.line.text });
      else out.push({ code: `${b}.${o.i + 1} cũ`, label: labelOf(o.line), kind: "remove", old: o.line.text });
    }
  };
  let i = 0;
  let j = 0;
  let olds = [];
  let news = [];
  while (i < n || j < m) {
    if (i < n && j < m && oldLines[i].text === newLines[j].text) {
      gap(olds, news);
      olds = [];
      news = [];
      i++;
      j++;
    } else if (j < m && (i >= n || L[i][j + 1] >= L[i + 1][j])) {
      news.push({ j, line: newLines[j] });
      j++;
    } else {
      olds.push({ i, line: oldLines[i] });
      i++;
    }
  }
  gap(olds, news);
  return out;
};

const WHO = { CD: "Cụ Đồ", TC: "Cháu", NARRATOR: "Dẫn" };

/** So sánh hai phiên bản của tập: tiêu đề, các trường riêng, thoại / cảnh đổi, và nhịp nào đổi phần diễn. */
export const diffEpisodes = (project, before, after) => {
  const text = [];
  if (project.headline(before) !== project.headline(after)) {
    text.push({ code: "tieu-de", label: "Tiêu đề tập", kind: "change", old: project.headline(before), text: project.headline(after) });
  }
  const oldFields = project.fields(before);
  for (const f of project.fields(after)) {
    const old = oldFields.find((o) => o.code === f.code)?.text ?? "";
    if (old !== f.text) text.push({ code: f.code, label: f.label, kind: "change", old, text: f.text });
  }
  after.beats.forEach((beat, i) => {
    const old = before.beats[i];
    if (!old) return;
    if (old.shot !== beat.shot) text.push({ code: `${i + 1}.c`, label: `Cảnh nhịp ${i + 1}`, kind: "change", old: old.shot, text: beat.shot });
    text.push(...diffLines(old.lines, beat.lines, i + 1, (l) => `${WHO[l.who]} (nhịp ${i + 1})`));
  });

  const stageBeats = after.beats
    .map((beat, i) => (JSON.stringify(beat.stage ?? []) !== JSON.stringify(before.beats[i]?.stage ?? []) ? i + 1 : null))
    .filter(Boolean);
  return { text, stageBeats };
};

export const cleanupCheck = () => {
  if (existsSync(CHECK_DIR)) rmSync(CHECK_DIR, { recursive: true, force: true });
};
