/**
 * Xuất phụ đề nháp .srt để nhập vào CapCut / Premiere.
 *   npm run srt -- 1      -> out/srt/ngay-01.srt
 *   npm run srt -- all
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { EPISODES } from "../src/episodes/index.ts";
import { episodeCues, voiceManifestPath } from "../src/lib/timing.ts";
import { pad2, parseDays } from "./days.mjs";

const NAMES = { CD: "Cụ Đồ", TC: "Thằng Cháu", NARRATOR: "" };

const stamp = (seconds) => {
  const ms = Math.round(seconds * 1000);
  const h = Math.floor(ms / 3600000);
  const m = Math.floor((ms % 3600000) / 60000);
  const s = Math.floor((ms % 60000) / 1000);
  return `${pad2(h)}:${pad2(m)}:${pad2(s)},${String(ms % 1000).padStart(3, "0")}`;
};

const args = process.argv.slice(2);
const days = parseDays(args.length ? args : ["all"]);
const withNames = !args.includes("--no-names");
mkdirSync("out/srt", { recursive: true });

for (const day of days) {
  const episode = EPISODES.find((e) => e.day === day);
  // Có tiếng (npm run voice) thì phụ đề khớp theo tiếng thật.
  const manifest = `public/${voiceManifestPath(day)}`;
  const voice = existsSync(manifest) ? JSON.parse(readFileSync(manifest, "utf8")) : null;
  const body = episodeCues(episode, voice)
    .map((cue, i) => {
      const name = withNames && NAMES[cue.who] ? `${NAMES[cue.who]}: ` : "";
      return `${i + 1}\n${stamp(cue.start)} --> ${stamp(cue.end)}\n${name}${cue.text}\n`;
    })
    .join("\n");
  const file = `out/srt/ngay-${pad2(day)}.srt`;
  writeFileSync(file, body, "utf8");
  console.log(`✔ ${file}`);
}
