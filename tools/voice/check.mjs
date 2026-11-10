// Nghe lại tiếng đã sinh: npm run voice:check -- 1 | tuan-1 | all   (thêm -p vi-sao cho dự án khác)
import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { parseDays } from "../days.mjs";
import { loadProject, takeProjectArg } from "../projects.mjs";

const { id, rest } = takeProjectArg(process.argv.slice(2));
const project = await loadProject(id);
const manifests = parseDays(rest, project)
  .map((d) => `${project.paths.voiceDir(d)}/manifest.json`)
  .filter((m) => existsSync(m));
if (manifests.length === 0) {
  console.error("Chưa có tiếng cho các ngày này (chạy npm run voice trước).");
  process.exit(1);
}
const res = spawnSync(process.execPath, ["tools/voice/run-python.mjs", "check_voice.py", ...manifests], {
  stdio: "inherit",
});
process.exit(res.status ?? 1);
