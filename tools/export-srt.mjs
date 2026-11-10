/**
 * Xuất phụ đề nháp .srt để nhập vào CapCut / Premiere.
 *   npm run srt -- 1               -> out/noi-vay/srt/ngay-01.srt
 *   npm run srt -- -p vi-sao all
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { episodeCues } from "../engine/lib/timing.ts";
import { pad2, parseDays } from "./days.mjs";
import { loadEpisodes, loadProject, takeProjectArg } from "./projects.mjs";

const NAMES = { CD: "Cụ Đồ", TC: "Thằng Cháu", NARRATOR: "" };

const stamp = (seconds) => {
  const ms = Math.round(seconds * 1000);
  const h = Math.floor(ms / 3600000);
  const m = Math.floor((ms % 3600000) / 60000);
  const s = Math.floor((ms % 60000) / 1000);
  return `${pad2(h)}:${pad2(m)}:${pad2(s)},${String(ms % 1000).padStart(3, "0")}`;
};

const { id, rest } = takeProjectArg(process.argv.slice(2));
const project = await loadProject(id);
const { EPISODES } = await loadEpisodes(project);
const args = rest.filter((a) => !a.startsWith("--"));
const days = parseDays(args.length ? args : ["all"], EPISODES);
const withNames = !rest.includes("--no-names");

for (const day of days) {
  const episode = EPISODES.find((e) => e.day === day);
  if (!episode) continue;
  // Có tiếng (npm run voice) thì phụ đề khớp theo tiếng thật.
  const manifest = `${project.paths.voiceDir(day)}/manifest.json`;
  const voice = existsSync(manifest) ? JSON.parse(readFileSync(manifest, "utf8")) : null;
  const body = episodeCues(episode, voice)
    .map((cue, i) => {
      const name = withNames && NAMES[cue.who] ? `${NAMES[cue.who]}: ` : "";
      return `${i + 1}\n${stamp(cue.start)} --> ${stamp(cue.end)}\n${name}${cue.text}\n`;
    })
    .join("\n");
  const file = project.paths.srt(day);
  mkdirSync(path.dirname(file), { recursive: true });
  writeFileSync(file, body, "utf8");
  console.log(`✔ ${file}`);
}
