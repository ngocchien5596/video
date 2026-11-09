/**
 * Xuất video hoặc ảnh bìa.
 *   npm run render -- 1          -> out/video/ngay-01.mp4
 *   npm run render -- tuan-1     -> cả tuần 1
 *   npm run cover  -- all        -> out/cover/ngay-XX.png
 */
import { spawnSync } from "node:child_process";
import { mkdirSync } from "node:fs";
import { pad2, parseDays } from "./days.mjs";

const args = process.argv.slice(2);
const cover = args.includes("--cover");
const days = parseDays(args.filter((a) => a !== "--cover"));
if (days.length === 0) {
  console.error("Thiếu ngày. Ví dụ: npm run render -- 1   hoặc   npm run render -- tuan-1");
  process.exit(1);
}

mkdirSync(cover ? "out/cover" : "out/video", { recursive: true });

for (const day of days) {
  const id = `${cover ? "Bia" : "Ngay"}-${pad2(day)}`;
  const output = cover ? `out/cover/ngay-${pad2(day)}.png` : `out/video/ngay-${pad2(day)}.mp4`;
  const cmd = cover
    ? ["remotion", "still", id, output]
    : ["remotion", "render", id, output, "--codec=h264", "--crf=18"];
  console.log(`\n▶ ${id} -> ${output}`);
  const result = spawnSync(`npx ${cmd.join(" ")}`, { stdio: "inherit", shell: true });
  if (result.status !== 0) {
    console.error(`✖ Lỗi khi xuất ${id}`);
    process.exit(result.status ?? 1);
  }
}
console.log(`\n✔ Xong ${days.length} file.`);
