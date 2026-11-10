/**
 * Danh sách dự án (series) trong repo và đường dẫn của từng dự án.
 *
 * Mỗi dự án là một thư mục projects/<id>/ gồm:
 *   project.json   cấu hình chỉnh tay (tên, số tập, lịch thông báo, gói đăng bài...)
 *   project.mjs    phần code riêng cho công cụ và bot (tên nhịp, chỗ sửa được, gói đăng bài...)
 *   src/           kịch bản (episodes/), composition Remotion, ảnh bìa
 *   docs/          quy tắc series, kịch bản in, lịch sử sửa
 *   tracker.csv    theo dõi tiến độ
 *
 * Công cụ dòng lệnh nhận dự án qua `-p <id>` (hoặc tên ngắn), mặc định là noi-vay.
 */
import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

export const ROOT = path.resolve(import.meta.dirname, "..");
export const DEFAULT_PROJECT = "noi-vay";
const PROJECTS_DIR = path.join(ROOT, "projects");

export const pad2 = (n) => String(n).padStart(2, "0");

export const projectIds = () =>
  readdirSync(PROJECTS_DIR).filter((d) => existsSync(path.join(PROJECTS_DIR, d, "project.json")));

const cache = new Map();

/** Nạp một dự án: cấu hình + phần code riêng + các đường dẫn (tương đối với gốc repo, dạng a/b/c). */
export const loadProject = async (id) => {
  if (cache.has(id)) return cache.get(id);
  const dir = path.join(PROJECTS_DIR, id);
  if (!existsSync(path.join(dir, "project.json"))) {
    throw new Error(`Không có dự án "${id}". Các dự án: ${projectIds().join(", ")}`);
  }
  const json = JSON.parse(readFileSync(path.join(dir, "project.json"), "utf8"));
  const hooks = await import(pathToFileURL(path.join(dir, "project.mjs")).href);
  const rel = `projects/${id}`;
  const dd = (day) => pad2(day);

  const project = {
    ...json,
    ...hooks,
    id,
    dir,
    rel,
    beatOrder: Object.keys(hooks.beats),
    compositionId: (day) => json.composition.replace("{dd}", dd(day)),
    coverId: (day) => json.cover.replace("{dd}", dd(day)),
    /** File nguồn chứa khối makeEpisode của tập (theo tuần / đợt). */
    sourceFile: (week) => `${rel}/${json.source.replace("{week}", week)}`,
    episodesIndex: path.join(dir, "src", "episodes", "index.ts"),
    paths: {
      voiceDir: (day) => `public/voice/${id}/ngay-${dd(day)}`,
      video: (day) => `out/${id}/video/ngay-${dd(day)}.mp4`,
      cover: (day) => `out/${id}/cover/ngay-${dd(day)}.png`,
      srt: (day) => `out/${id}/srt/ngay-${dd(day)}.srt`,
      versions: `out/${id}/versions`,
      botLogs: `out/${id}/bot`,
      history: (day) => `${rel}/docs/lich-su/ngay-${dd(day)}.md`,
      sheets: `${rel}/docs/kich-ban`,
      tracker: `${rel}/tracker.csv`,
    },
  };
  cache.set(id, project);
  return project;
};

export const loadProjects = async () => Promise.all(projectIds().map(loadProject));

/** Tìm dự án theo id hoặc tên ngắn (ví dụ "vs"), null nếu không khớp. */
export const matchProject = (projects, token) =>
  projects.find((p) => p.id === token || p.short === token) ?? null;

/**
 * Tách tham số chọn dự án khỏi dòng lệnh: `-p vi-sao`, `--project vi-sao`, `--project=vi-sao`, `-p vs`.
 * Trả về { id, rest }.
 */
export const takeProjectArg = (args) => {
  const rest = [];
  let token = process.env.PROJECT || DEFAULT_PROJECT;
  for (let i = 0; i < args.length; i++) {
    const a = args[i];
    if (a === "-p" || a === "--project") token = args[++i];
    else if (a.startsWith("--project=")) token = a.slice("--project=".length);
    else rest.push(a);
  }
  const ids = projectIds();
  const byShort = ids.find((id) => {
    try {
      return JSON.parse(readFileSync(path.join(PROJECTS_DIR, id, "project.json"), "utf8")).short === token;
    } catch {
      return false;
    }
  });
  return { id: ids.includes(token) ? token : (byShort ?? token), rest };
};

/** Nạp danh sách tập của dự án (import trực tiếp file TypeScript). */
export const loadEpisodes = async (project, srcRoot = ROOT) => {
  const index = path.join(srcRoot, project.rel, "src", "episodes", "index.ts");
  const mod = await import(pathToFileURL(index).href);
  return { EPISODES: mod.EPISODES, nextTeaser: mod.nextTeaser };
};
