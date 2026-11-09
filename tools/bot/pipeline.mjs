/** Tạo video cho một tập: lồng tiếng → kiểm tra tiếng → xuất mp4 → xuất ảnh bìa. */
import { spawn } from "node:child_process";
import { appendFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { ROOT } from "./config.mjs";

const pad2 = (n) => String(n).padStart(2, "0");

const run = (command, logFile) =>
  new Promise((resolve) => {
    appendFileSync(logFile, `\n$ ${command}\n`);
    const child = spawn(command, { cwd: ROOT, shell: true, env: { ...process.env, FORCE_COLOR: "0" } });
    let out = "";
    const onData = (d) => {
      out += d;
      appendFileSync(logFile, d);
    };
    child.stdout.on("data", onData);
    child.stderr.on("data", onData);
    child.on("close", (code) => resolve({ code, out }));
  });

export const STEPS = ["Lồng tiếng", "Kiểm tra tiếng", "Xuất video", "Xuất ảnh bìa"];

/**
 * Chạy cả quy trình. onStep(i) được gọi khi bắt đầu bước i.
 * Trả về { video, cover, seconds, flagged, log } hoặc ném lỗi kèm đoạn cuối log.
 */
export const produce = async (day, onStep) => {
  const logDir = path.join(ROOT, "out", "bot");
  mkdirSync(logDir, { recursive: true });
  const log = path.join(logDir, `ngay-${pad2(day)}.log`);
  writeFileSync(log, `Tạo video ngày ${day} lúc ${new Date().toISOString()}\n`);

  const fail = (step, res) => {
    const tail = res.out.split(/\r?\n/).filter(Boolean).slice(-8).join("\n");
    const err = new Error(`${STEPS[step]} lỗi (mã ${res.code}).\n${tail}`);
    err.log = log;
    throw err;
  };

  await onStep(0);
  const voice = await run(`npm run voice -- ${day}`, log);
  if (voice.code !== 0) fail(0, voice);
  const seconds = /Ngày \d+: ([\d.]+)s/.exec(voice.out)?.[1];

  await onStep(1);
  const check = await run(`npm run voice:check -- ${day}`, log);
  if (check.code !== 0) fail(1, check);
  // Các câu máy nghe không khớp: dòng "XEM" kèm dòng "viết:" / "nghe:" ngay sau.
  const flagged = [];
  const lines = check.out.split(/\r?\n/);
  lines.forEach((l, i) => {
    const m = /^\s*XEM\s+(\d+)%\s+(\S+)/.exec(l);
    if (m) {
      flagged.push({
        file: m[2],
        score: Number(m[1]),
        heard: (lines[i + 2] ?? "").replace(/^\s*nghe:\s*/, ""),
      });
    }
  });

  await onStep(2);
  const render = await run(`npm run render -- ${day}`, log);
  if (render.code !== 0) fail(2, render);

  await onStep(3);
  const cover = await run(`npm run cover -- ${day}`, log);
  if (cover.code !== 0) fail(3, cover);

  const video = path.join(ROOT, "out", "video", `ngay-${pad2(day)}.mp4`);
  const coverFile = path.join(ROOT, "out", "cover", `ngay-${pad2(day)}.png`);
  if (!existsSync(video)) throw new Error(`Không thấy file ${video}`);
  return { video, cover: coverFile, seconds: seconds ? Number(seconds) : null, flagged, log };
};

/** Cập nhật các cột của một tập trong tracker.csv, ví dụ { trang_thai: "da-dung" }. Giữ BOM và định dạng. */
export const updateTracker = (day, fields) => {
  const file = path.join(ROOT, "tracker.csv");
  if (!existsSync(file)) return;
  const raw = readFileSync(file, "utf8");
  const bom = raw.startsWith("﻿") ? "﻿" : "";
  const eol = raw.includes("\r\n") ? "\r\n" : "\n";
  const rows = raw.slice(bom.length).split(/\r?\n/);
  const header = rows[0].split(",");

  const out = rows.map((line, i) => {
    if (i === 0 || !line.startsWith(`${day},`)) return line;
    // Tách cột, giữ nguyên ô có ngoặc kép.
    const cols = [];
    let cur = "";
    let quoted = false;
    for (const ch of line) {
      if (ch === '"') quoted = !quoted;
      if (ch === "," && !quoted) {
        cols.push(cur);
        cur = "";
      } else cur += ch;
    }
    cols.push(cur);
    for (const [name, value] of Object.entries(fields)) {
      const i = header.indexOf(name);
      if (i >= 0) cols[i] = /[",]/.test(value) || name === "cau" ? `"${String(value).replace(/"/g, '""')}"` : value;
    }
    return cols.join(",");
  });
  writeFileSync(file, bom + out.join(eol), "utf8");
};
