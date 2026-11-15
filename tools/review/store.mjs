/**
 * Kết quả duyệt cuối tự động: nơi lưu, khoá nội dung (để không chạy lại khi kịch bản không đổi), cách đọc lại.
 * Dùng chung cho `npm run review` (tools/review/review.mjs) và bot Telegram.
 *
 * Khoá = hash khối makeEpisode của tập + phiên bản phần hình (commit gần nhất của engine/ và src/ của dự án,
 * kèm dấu các thay đổi chưa commit) + hash manifest giọng + phiên bản bộ duyệt.
 */
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { readBlock } from "../bot/draft.mjs";
import { pad2, ROOT } from "../projects.mjs";

/** Tăng khi đổi cách kiểm / prompt, để kết quả cũ không bị dùng lại. */
export const REVIEW_VERSION = 1;

const sha = (s) => createHash("sha1").update(s).digest("hex");

/** Thư mục báo cáo của một tập: out/review/<dự án>/ngay-XX/. */
export const reviewDir = (project, day) => path.join(ROOT, "out", "review", project.id, `ngay-${pad2(day)}`);
export const reportJson = (project, day) => path.join(reviewDir(project, day), "bao-cao.json");
export const reportMd = (project, day) => path.join(reviewDir(project, day), "bao-cao.md");

const git = (args) => {
  try {
    return execFileSync("git", args, { cwd: ROOT, encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).trim();
  } catch {
    return "";
  }
};

/** Phiên bản phần hình: commit gần nhất đụng engine/ hoặc src/ của dự án (trừ kịch bản), kèm hash phần sửa chưa commit. */
export const visualRev = (project) => {
  const specs = ["engine", `${project.rel}/src`, `:(exclude)${project.rel}/src/episodes`];
  const commit = git(["log", "-1", "--format=%h", "--", ...specs]) || "nogit";
  const dirty = git(["diff", "HEAD", "--", ...specs]);
  return dirty ? `${commit}+${sha(dirty).slice(0, 8)}` : commit;
};

/** Khoá nội dung của một tập. `episode` cần có day, week. */
export const reviewKey = (project, episode) => {
  const { hash } = readBlock(project, episode.week, episode.day);
  const manifest = path.join(ROOT, "public", "voice", project.id, `ngay-${pad2(episode.day)}`, "manifest.json");
  const voice = existsSync(manifest) ? sha(readFileSync(manifest)).slice(0, 12) : "novoice";
  return { key: `v${REVIEW_VERSION}:${hash.slice(0, 16)}:${visualRev(project)}:${voice}`, scriptHash: hash };
};

/** Báo cáo đã lưu của tập (null nếu chưa có). */
export const readReport = (project, day) => {
  try {
    return JSON.parse(readFileSync(reportJson(project, day), "utf8"));
  } catch {
    return null;
  }
};

/** Báo cáo đã lưu có đúng nội dung hiện tại không. */
export const freshReport = (project, episode) => {
  const report = readReport(project, episode.day);
  if (!report) return null;
  return report.key === reviewKey(project, episode).key ? report : null;
};

/** Cấu hình duyệt của dự án: project.json → "review". */
export const reviewConfig = (project) => ({
  maxSeconds: 180,
  warnSeconds: null,
  minSources: 0,
  frozenDays: [],
  maxWords: 38,
  ...(project.review ?? {}),
});
