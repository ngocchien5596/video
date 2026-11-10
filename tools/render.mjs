/**
 * Xuất video hoặc ảnh bìa của một dự án.
 *   npm run render -- 1                 -> out/noi-vay/video/ngay-01.mp4 (dự án mặc định)
 *   npm run render -- -p vi-sao 1       -> out/vi-sao/video/ngay-01.mp4
 *   npm run render -- tuan-1            -> cả tuần 1
 *   npm run cover  -- -p vi-sao all     -> out/vi-sao/cover/ngay-XX.png
 *
 * Xuất video xong thì tự xuất ảnh bìa và lưu thành phiên bản mới (giống bot):
 *   out/<dự án>/versions/ngay-XX/vN/ + ghi lịch sử projects/<dự án>/docs/lich-su/ngay-XX.md
 * Thêm --no-archive để chỉ xuất file, không lưu phiên bản (bot dùng, vì bot tự lưu kèm commit kịch bản).
 */
import { spawnSync } from "node:child_process";
import { mkdirSync } from "node:fs";
import path from "node:path";
import { archiveRender } from "./archive.mjs";
import { parseDays } from "./days.mjs";
import { loadEpisodes, loadProject, takeProjectArg } from "./projects.mjs";

const { id, rest } = takeProjectArg(process.argv.slice(2));
const project = await loadProject(id);
const cover = rest.includes("--cover");
const archive = !cover && !rest.includes("--no-archive");
const { EPISODES, nextTeaser } = await loadEpisodes(project);
const days = parseDays(rest.filter((a) => !a.startsWith("--")), EPISODES).filter((d) => EPISODES.some((e) => e.day === d));
if (days.length === 0) {
  console.error("Thiếu ngày (hoặc tập chưa có). Ví dụ: npm run render -- 1   hoặc   npm run render -- -p vi-sao 1");
  process.exit(1);
}

const run = (compId, output, still) => {
  mkdirSync(path.dirname(output), { recursive: true });
  const cmd = still ? ["remotion", "still", compId, output] : ["remotion", "render", compId, output, "--codec=h264", "--crf=18"];
  console.log(`\n▶ [${project.id}] ${compId} -> ${output}`);
  const result = spawnSync(`npx ${cmd.join(" ")}`, { stdio: "inherit", shell: true });
  if (result.status !== 0) {
    console.error(`✖ Lỗi khi xuất ${compId}`);
    process.exit(result.status ?? 1);
  }
};

for (const day of days) {
  if (cover) {
    run(project.coverId(day), project.paths.cover(day), true);
    continue;
  }
  run(project.compositionId(day), project.paths.video(day), false);
  if (!archive) continue;
  run(project.coverId(day), project.paths.cover(day), true);
  const episode = EPISODES.find((e) => e.day === day);
  const saved = archiveRender(project, episode, nextTeaser(day));
  console.log(
    `💾 Lưu thành v${saved.version}: ${path.relative(process.cwd(), saved.dir).replace(/\\/g, "/")}/ ` +
      `(${saved.seconds}s, kịch bản ${saved.commit}). Lịch sử: ${project.paths.history(day)}`,
  );
}
console.log(`\n✔ Xong ${days.length} tập.`);
