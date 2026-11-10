/**
 * Xuất video hoặc ảnh bìa của một dự án.
 *   npm run render -- 1                 -> out/noi-vay/video/ngay-01.mp4 (dự án mặc định)
 *   npm run render -- -p vi-sao 1       -> out/vi-sao/video/ngay-01.mp4
 *   npm run render -- tuan-1            -> cả tuần 1
 *   npm run cover  -- -p vi-sao all     -> out/vi-sao/cover/ngay-XX.png
 */
import { spawnSync } from "node:child_process";
import { mkdirSync } from "node:fs";
import path from "node:path";
import { parseDays } from "./days.mjs";
import { loadEpisodes, loadProject, takeProjectArg } from "./projects.mjs";

const { id, rest } = takeProjectArg(process.argv.slice(2));
const project = await loadProject(id);
const cover = rest.includes("--cover");
const { EPISODES } = await loadEpisodes(project);
const days = parseDays(rest.filter((a) => a !== "--cover"), EPISODES).filter((d) => EPISODES.some((e) => e.day === d));
if (days.length === 0) {
  console.error("Thiếu ngày (hoặc tập chưa có). Ví dụ: npm run render -- 1   hoặc   npm run render -- -p vi-sao 1");
  process.exit(1);
}

for (const day of days) {
  const compId = cover ? project.coverId(day) : project.compositionId(day);
  const output = cover ? project.paths.cover(day) : project.paths.video(day);
  mkdirSync(path.dirname(output), { recursive: true });
  const cmd = cover
    ? ["remotion", "still", compId, output]
    : ["remotion", "render", compId, output, "--codec=h264", "--crf=18"];
  console.log(`\n▶ [${project.id}] ${compId} -> ${output}`);
  const result = spawnSync(`npx ${cmd.join(" ")}`, { stdio: "inherit", shell: true });
  if (result.status !== 0) {
    console.error(`✖ Lỗi khi xuất ${compId}`);
    process.exit(result.status ?? 1);
  }
}
console.log(`\n✔ Xong ${days.length} file.`);
