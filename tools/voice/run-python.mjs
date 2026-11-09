// Chạy script Python trong tools/voice/ bằng Python của repo giọng nói.
// Đổi đường dẫn bằng biến môi trường TTS_ROOT nếu repo nằm chỗ khác.
import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import path from "node:path";

const TTS_ROOT = process.env.TTS_ROOT ?? "D:/Tao_giong_noi_local";
const PYTHON = path.join(TTS_ROOT, "viterbox", "venv", "Scripts", "python.exe");

const [script, ...args] = process.argv.slice(2);
if (!existsSync(PYTHON)) {
  console.error(`Không thấy Python của repo giọng nói: ${PYTHON}\nĐặt TTS_ROOT trỏ tới repo Tao_giong_noi_local.`);
  process.exit(1);
}
const res = spawnSync(PYTHON, ["-X", "utf8", path.join("tools", "voice", script), "--tts-root", TTS_ROOT, ...args], {
  stdio: "inherit",
  env: { ...process.env, PYTHONIOENCODING: "utf-8" },
});
process.exit(res.status ?? 1);
