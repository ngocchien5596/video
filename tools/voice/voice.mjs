/**
 * Sinh tiếng thoại bằng OmniVoice cho các tập của một dự án:
 *   npm run voice -- 1                 -> public/voice/noi-vay/ngay-01/*.wav + manifest.json
 *   npm run voice -- -p vi-sao 1       -> public/voice/vi-sao/ngay-01/...
 *   npm run voice -- tuan-1
 *   npm run voice -- 1 --force         -> sinh lại cả câu chưa đổi chữ
 * Câu nào không đổi chữ và không đổi giọng mẫu thì giữ file cũ.
 */
import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { episodeSeconds } from "../../engine/lib/timing.ts";
import { parseDays } from "../days.mjs";
import { loadEpisodes, loadProject, takeProjectArg } from "../projects.mjs";

const { id, rest } = takeProjectArg(process.argv.slice(2));
const project = await loadProject(id);
const { EPISODES } = await loadEpisodes(project);
const force = rest.includes("--force");
const days = parseDays(rest.filter((a) => !a.startsWith("--")), EPISODES).filter((d) => EPISODES.some((e) => e.day === d));
if (days.length === 0) {
  console.error("Thiếu ngày (hoặc tập chưa có). Ví dụ: npm run voice -- 1   hoặc   npm run voice -- -p vi-sao 1");
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
    dir: project.paths.voiceDir(day),
    lines: episode.beats.flatMap((beat, b) =>
      beat.lines.map((line, l) => ({
        beat: b,
        line: l,
        who: line.who,
        text: line.text,
        ...(line.tts ? { tts: line.tts } : {}),
      })),
    ),
  };
});
const maxSeconds = project.maxSeconds ?? 60;
const warnSeconds = project.warnSeconds ?? 40;
mkdirSync("out", { recursive: true });
const jobsFile = `out/voice-jobs-${project.id}.json`;
writeFileSync(jobsFile, JSON.stringify(jobs, null, 2), "utf8");

const py = spawnSync(
  process.execPath,
  ["tools/voice/run-python.mjs", "make_voice.py", "--jobs", jobsFile, ...(force ? ["--force"] : [])],
  { stdio: "inherit" },
);
if (py.status !== 0) process.exit(py.status ?? 1);

console.log("\nThời lượng sau khi lồng tiếng:");
for (const day of days) {
  const episode = EPISODES.find((e) => e.day === day);
  const voice = JSON.parse(readFileSync(`${project.paths.voiceDir(day)}/manifest.json`, "utf8"));
  const seconds = episodeSeconds(episode, voice);
  const warn =
    seconds > maxSeconds
      ? `  <- quá ${maxSeconds} giây, phải rút gọn thoại`
      : seconds > warnSeconds
        ? `  <- trên ${warnSeconds} giây, nên cắt bớt thoại để giữ người xem`
        : "";
  console.log(`  Ngày ${day}: ${seconds.toFixed(1)}s${warn}`);
}
