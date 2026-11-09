/**
 * Lưu lịch sử: mọi lần sửa kịch bản (git commit + docs/lich-su/ngay-XX.md) và mọi video đã xuất
 * (out/versions/ngay-XX/vN/ gồm video, ảnh bìa, kịch bản lúc xuất, commit git tương ứng).
 */
import { execFileSync } from "node:child_process";
import { appendFileSync, copyFileSync, existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { ROOT } from "./config.mjs";

const pad2 = (n) => String(n).padStart(2, "0");
const VERSIONS = path.join(ROOT, "out", "versions");
const HISTORY = path.join(ROOT, "docs", "lich-su");

export const stamp = (d = new Date()) =>
  new Intl.DateTimeFormat("sv-SE", {
    timeZone: "Asia/Ho_Chi_Minh",
    dateStyle: "short",
    timeStyle: "short",
  }).format(d);

const git = (...args) => execFileSync("git", args, { cwd: ROOT, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }).trim();

/**
 * Commit đúng các file chỉ định (không đụng tới thay đổi khác đang dở trong repo).
 * Trả về mã commit ngắn, hoặc mã HEAD hiện tại nếu không có gì thay đổi.
 */
export const commitFiles = (files, message) => {
  const rel = files.filter((f) => existsSync(path.join(ROOT, f)));
  try {
    git("add", "--", ...rel);
    const changed = git("diff", "--cached", "--name-only", "--", ...rel);
    if (changed) git("commit", "-m", message, "--only", "--", ...rel);
    return git("rev-parse", "--short", "HEAD");
  } catch (err) {
    throw new Error(`git commit lỗi: ${err.stderr?.toString() || err.message}`);
  }
};

export const push = () => {
  try {
    git("push");
    return true;
  } catch {
    return false;
  }
};

export const historyFile = (day) => `docs/lich-su/ngay-${pad2(day)}.md`;

const ensureHistory = (day, idiom) => {
  mkdirSync(HISTORY, { recursive: true });
  const file = path.join(ROOT, historyFile(day));
  if (!existsSync(file)) {
    writeFileSync(file, `# Lịch sử tập ${day}: “${idiom}”\n\nGhi tự động bởi bot: mỗi lần sửa kịch bản và mỗi lần xuất video.\n`, "utf8");
  }
  return file;
};

/** Ghi một lần sửa kịch bản vào docs/lich-su/ngay-XX.md. */
export const logScriptChange = (day, idiom, { request, summary, diff }) => {
  const file = ensureHistory(day, idiom);
  const lines = diff.text.map((c) => {
    if (c.kind === "add") return `- \`${c.code}\` ${c.label} **(thêm)**: ${c.text}`;
    if (c.kind === "remove") return `- \`${c.code}\` ${c.label} **(bỏ)**: ~~${c.old}~~`;
    return `- \`${c.code}\` ${c.label}: ~~${c.old}~~ → ${c.text}`;
  });
  const stage = diff.stageBeats.length ? `\nPhần diễn đổi ở nhịp ${diff.stageBeats.join(", ")}.\n` : "";
  appendFileSync(
    file,
    `\n## ${stamp()} · Sửa kịch bản\n\n**Yêu cầu:** ${request.replace(/\n/g, " / ")}\n\n` +
      `${summary ? `**Tóm tắt:**\n${summary}\n\n` : ""}**Thay đổi:**\n${lines.join("\n") || "- (không đổi thoại)"}\n${stage}`,
    "utf8",
  );
};

/** Ghi một lần xuất video vào docs/lich-su/ngay-XX.md. */
export const logRender = (day, idiom, { version, commit, seconds }) => {
  const file = ensureHistory(day, idiom);
  appendFileSync(
    file,
    `\n## ${stamp()} · Xuất video v${version}\n\nKịch bản ở commit \`${commit}\`${seconds ? `, dài ${seconds} giây` : ""}. ` +
      `File: \`out/versions/ngay-${pad2(day)}/v${version}/\`.\n`,
    "utf8",
  );
};

/** Danh sách phiên bản video của một tập, cũ trước mới sau. */
export const listVersions = (day) => {
  const dir = path.join(VERSIONS, `ngay-${pad2(day)}`);
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((n) => /^v\d+$/.test(n))
    .map((n) => {
      const vdir = path.join(dir, n);
      const info = existsSync(path.join(vdir, "info.json")) ? JSON.parse(readFileSync(path.join(vdir, "info.json"), "utf8")) : {};
      return { version: Number(n.slice(1)), dir: vdir, video: path.join(vdir, "video.mp4"), cover: path.join(vdir, "cover.png"), ...info };
    })
    .sort((a, b) => a.version - b.version);
};

/** Lưu video vừa xuất thành phiên bản mới (không bao giờ ghi đè bản cũ). */
export const archiveVersion = (day, { video, cover, episode, commit, seconds, flagged }) => {
  const version = (listVersions(day).at(-1)?.version ?? 0) + 1;
  const dir = path.join(VERSIONS, `ngay-${pad2(day)}`, `v${version}`);
  mkdirSync(dir, { recursive: true });
  copyFileSync(video, path.join(dir, "video.mp4"));
  if (existsSync(cover)) copyFileSync(cover, path.join(dir, "cover.png"));
  const manifest = path.join(ROOT, "public", "voice", `ngay-${pad2(day)}`, "manifest.json");
  if (existsSync(manifest)) copyFileSync(manifest, path.join(dir, "voice-manifest.json"));
  writeFileSync(path.join(dir, "kich-ban.json"), JSON.stringify(episode, null, 2), "utf8");
  const info = { createdAt: new Date().toISOString(), time: stamp(), commit, seconds, flagged: flagged?.length ?? 0, idiom: episode.idiom };
  writeFileSync(path.join(dir, "info.json"), JSON.stringify(info, null, 2), "utf8");
  return { version, dir, ...info };
};
