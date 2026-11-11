/**
 * Lưu một lần xuất video thành phiên bản mới, giống hệt cách bot làm (dùng chung cho mọi dự án):
 *   out/<dự án>/versions/ngay-XX/vN/  <tên_tập>.mp4, <tên_tập>.png (không dấu), kich-ban.json, voice-manifest.json, info.json, dang-bai.txt
 *   projects/<dự án>/docs/lich-su/ngay-XX.md  thêm mục "Xuất video vN"
 *   projects/<dự án>/tracker.csv  trang_thai = da-dung
 * Không bao giờ ghi đè phiên bản cũ.
 */
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { episodeSeconds } from "../engine/lib/timing.ts";
import { archiveVersion, logRender } from "./bot/history.mjs";
import { updateTracker } from "./bot/pipeline.mjs";
import { postDate, savePublishKit } from "./bot/publish.mjs";
import { ROOT } from "./projects.mjs";
import { slotsText } from "./schedule.mjs";

const git = (...args) => execFileSync("git", args, { cwd: ROOT, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }).trim();

/** Mã commit hiện tại; thêm "+sửa" nếu file kịch bản của tập còn thay đổi chưa commit. */
const currentCommit = (project, week) => {
  try {
    const head = git("rev-parse", "--short", "HEAD");
    const dirty = git("status", "--porcelain", "--", project.sourceFile(week));
    return dirty ? `${head}+sửa` : head;
  } catch {
    return "?";
  }
};

/** Ngày bắt đầu và giờ đăng: ưu tiên giá trị đặt qua bot (.bot/state.json), sau đó project.json. */
const schedule = (project) => {
  let st = {};
  try {
    st = JSON.parse(readFileSync(path.join(ROOT, ".bot", "state.json"), "utf8")).projects?.[project.id] ?? {};
  } catch {
    /* chưa có trạng thái bot */
  }
  return { startDate: st.startDate || project.schedule?.startDate || null, override: st };
};

/**
 * Lưu tập `episode` vừa xuất thành phiên bản mới.
 * opts.commit: mã commit kịch bản (bot truyền vào); bỏ trống thì lấy HEAD hiện tại.
 */
export const archiveRender = (project, episode, next, opts = {}) => {
  const day = episode.day;
  const video = path.join(ROOT, project.paths.video(day));
  if (!existsSync(video)) throw new Error(`Không thấy video ${project.paths.video(day)}`);
  const manifestFile = path.join(ROOT, project.paths.voiceDir(day), "manifest.json");
  const voice = existsSync(manifestFile) ? JSON.parse(readFileSync(manifestFile, "utf8")) : null;
  const seconds = Math.round(episodeSeconds(episode, voice) * 10) / 10;
  const commit = opts.commit ?? currentCommit(project, episode.week);

  const saved = archiveVersion(project, day, {
    video,
    cover: path.join(ROOT, project.paths.cover(day)),
    episode,
    commit,
    seconds,
    flagged: opts.flagged,
  });
  const { startDate, override } = schedule(project);
  const postTime = slotsText(project, postDate(startDate, day), override);
  const kit = project.buildPublishKit(episode, next, { cfg: { ...project.publish, postTime }, startDate });
  savePublishKit(saved.dir, kit);
  logRender(project, day, project.headline(episode), { version: saved.version, commit, seconds });
  updateTracker(project, day, { trang_thai: "da-dung" });
  return { ...saved, kit, seconds, commit };
};
