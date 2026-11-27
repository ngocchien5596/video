/**
 * Tạo ảnh AI cho các câu có scene.image của một tập "Đoán Xem Là Ai" (xem make_images.py).
 *   node projects/doan-xem/tools/images.mjs 1 [--n 4] [--only thang-long,chan-dung]
 */
import { spawnSync } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";

const { EPISODES } = await import("../src/episodes/index.ts");
const args = process.argv.slice(2);
const day = Number(args.find((a) => /^\d+$/.test(a)));
const n = args.includes("--n") ? args[args.indexOf("--n") + 1] : "4";
const only = args.includes("--only") ? args[args.indexOf("--only") + 1].split(",") : null;
const ep = EPISODES.find((e) => e.day === day);
if (!ep) {
  console.error("Thiếu tập. Ví dụ: node projects/doan-xem/tools/images.mjs 1");
  process.exit(2);
}
const dd = String(day).padStart(2, "0");
const jobs = ep.beats
  .flatMap((b) => b.lines)
  .filter((l) => l.scene.image && l.scene.prompt)
  .map((l) => ({ name: path.basename(l.scene.image, ".png"), prompt: l.scene.prompt, outDir: `out/doan-xem/anh-ai/ngay-${dd}` }))
  .filter((j) => !only || only.includes(j.name));
mkdirSync("out", { recursive: true });
writeFileSync("out/image-jobs-doan-xem.json", JSON.stringify(jobs, null, 2), "utf8");
const py = path.join(process.env.TTS_ROOT ?? "D:/Tao_giong_noi_local", "viterbox", "venv", "Scripts", "python.exe");
const r = spawnSync(py, ["-X", "utf8", "projects/doan-xem/tools/make_images.py", "--jobs", "out/image-jobs-doan-xem.json", "--n", n], { stdio: "inherit" });
process.exit(r.status ?? 1);
