/**
 * Telegram chỉ cho bot gửi file tối đa 50 MB. Video lớn hơn thì nén một bản riêng để gửi vào chat
 * (bản gốc chất lượng cao vẫn giữ nguyên trong out/<dự án>/versions/ để đăng lên nền tảng).
 */
import { execFile } from "node:child_process";
import { existsSync, mkdirSync, statSync } from "node:fs";
import path from "node:path";
import { promisify } from "node:util";
import { ROOT } from "./config.mjs";

const run = promisify(execFile);
/** Ngưỡng an toàn dưới giới hạn 50 MB của Telegram. */
export const TELEGRAM_MAX_BYTES = 48 * 1024 * 1024;
const TARGET_BYTES = 44 * 1024 * 1024;
const CLI = path.join(ROOT, "node_modules", "@remotion", "cli", "remotion-cli.js");

const ffmpeg = (args) => run(process.execPath, [CLI, "ffmpeg", ...args], { cwd: ROOT, maxBuffer: 64 * 1024 * 1024 });

const durationSeconds = async (file) => {
  try {
    await ffmpeg(["-hide_banner", "-i", file]);
  } catch (e) {
    // ffmpeg không có đầu ra thì báo lỗi, nhưng vẫn in thời lượng ra stderr.
    const m = /Duration: (\d+):(\d+):(\d+(?:\.\d+)?)/.exec(String(e.stderr ?? ""));
    if (m) return Number(m[1]) * 3600 + Number(m[2]) * 60 + Number(m[3]);
  }
  return 60;
};

/**
 * Trả về file nên gửi lên Telegram: chính file gốc nếu đủ nhỏ, không thì một bản nén
 * (out/<...>/telegram/<tên>.mp4) có dung lượng khoảng 44 MB.
 */
export const telegramReadyVideo = async (file) => {
  const size = statSync(file).size;
  if (size <= TELEGRAM_MAX_BYTES) return { file, compressed: false, size };
  const dir = path.join(path.dirname(file), "telegram");
  mkdirSync(dir, { recursive: true });
  const out = path.join(dir, path.basename(file));
  if (!existsSync(out) || statSync(out).mtimeMs < statSync(file).mtimeMs) {
    const seconds = await durationSeconds(file);
    const audioKbps = 128;
    const videoKbps = Math.max(800, Math.floor((TARGET_BYTES * 8) / 1000 / seconds) - audioKbps);
    await ffmpeg([
      "-hide_banner", "-y", "-i", file,
      "-c:v", "libx264", "-preset", "medium",
      "-b:v", `${videoKbps}k`, "-maxrate", `${videoKbps}k`, "-bufsize", `${videoKbps * 2}k`,
      "-c:a", "aac", "-b:a", `${audioKbps}k`,
      "-movflags", "+faststart", out,
    ]);
  }
  return { file: out, compressed: true, size: statSync(out).size };
};
