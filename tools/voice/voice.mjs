/**
 * Sinh tiếng thoại bằng OmniVoice cho các tập:
 *   npm run voice -- 1           -> public/voice/ngay-01/*.wav + manifest.json
 *   npm run voice -- tuan-1
 *   npm run voice -- 1 --force   -> sinh lại cả câu chưa đổi chữ
 * Câu nào không đổi chữ và không đổi giọng mẫu thì giữ file cũ.
 */
import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { EPISODES } from "../../src/episodes/index.ts";
import { episodeSeconds, voiceManifestPath } from "../../src/lib/timing.ts";
import { parseDays } from "../days.mjs";

const args = process.argv.slice(2);
const force = args.includes("--force");
const days = parseDays(args.filter((a) => !a.startsWith("--")));
if (days.length === 0) {
  console.error("Thiếu ngày. Ví dụ: npm run voice -- 1   hoặc   npm run voice -- tuan-1");
  process.exit(1);
}
for (const v of ["voices/cu-do.wav", "voices/thang-chau.wav"]) {
  if (!existsSync(v)) {
    console.error(`Thiếu giọng mẫu ${v}. Chạy npm run voice:design rồi npm run voice:pick.`);
    process.exit(1);
  }
}

const jobs = days.map((day) => {
  const episode = EPISODES.find((e) => e.day === day);
  return {
    day,
    lines: episode.beats.flatMap((beat, b) =>
      beat.lines.map((line, l) => ({ beat: b, line: l, who: line.who, text: line.text })),
    ),
  };
});
mkdirSync("out", { recursive: true });
writeFileSync("out/voice-jobs.json", JSON.stringify(jobs, null, 2), "utf8");

const py = spawnSync(
  process.execPath,
  ["tools/voice/run-python.mjs", "make_voice.py", "--jobs", "out/voice-jobs.json", ...(force ? ["--force"] : [])],
  { stdio: "inherit" },
);
if (py.status !== 0) process.exit(py.status ?? 1);

console.log("\nThời lượng sau khi lồng tiếng:");
for (const day of days) {
  const episode = EPISODES.find((e) => e.day === day);
  const voice = JSON.parse(readFileSync(`public/${voiceManifestPath(day)}`, "utf8"));
  const seconds = episodeSeconds(episode, voice);
  const warn = seconds > 60 ? "  <- quá 60 giây, nên rút gọn thoại" : "";
  console.log(`  Ngày ${day}: ${seconds.toFixed(1)}s${warn}`);
}
